"use server"

import { randomBytes } from "crypto"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { logger } from "@/lib/logger"
import { AuditAction, EntityType, Role } from "@/lib/enums"
import {
  createProjectSchema,
  updateProjectSchema,
  addMemberSchema,
  generateInviteSchema,
  removeMemberSchema,
  updateMemberRoleSchema,
  type CreateProjectInput,
  type UpdateProjectInput,
  type AddMemberInput,
  type GenerateInviteInput,
  type RemoveMemberInput,
  type UpdateMemberRoleInput,
} from "./schemas"

type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }

async function requireSession() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")
  return session
}

export async function createProject(
  raw: CreateProjectInput
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    const session = await requireSession()
    const data = createProjectSchema.parse(raw)

    const db = await getDb()

    const result = await db.ds.transaction(async (em) => {
      const projectRepo = em.getRepository("Project")
      const project = projectRepo.create({
        ...data,
        ownerId: session.user.id,
      })
      await projectRepo.save(project)

      const p = project as { id: string; slug: string }

      await em.getRepository("ProjectMember").save(
        em.getRepository("ProjectMember").create({
          projectId: p.id,
          userId: session.user.id,
          role: Role.ADMIN,
        })
      )

      await em.getRepository("AuditLog").save(
        em.getRepository("AuditLog").create({
          action: AuditAction.CREATE,
          entityId: p.id,
          entityType: EntityType.PROJECT,
          newValue: { name: data.name, slug: data.slug },
          performedBy: session.user.id,
        })
      )

      return p
    })

    logger.info({ projectId: result.id }, "Project created")
    revalidatePath("/projects")
    return { success: true, data: result }
  } catch (err) {
    logger.error({ err }, "createProject failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to create project" }
  }
}

export async function updateProject(
  id: string,
  raw: UpdateProjectInput
): Promise<ActionResult<void>> {
  try {
    const session = await requireSession()
    const data = updateProjectSchema.parse(raw)

    const db = await getDb()
    const project = await db.projects.findOneOrFail({ where: { id } })
    if (project.ownerId !== session.user.id) throw new Error("Access denied")

    await db.projects.update({ id }, data)

    revalidatePath(`/projects/${project.slug}`)
    return { success: true, data: undefined }
  } catch (err) {
    logger.error({ err }, "updateProject failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to update project" }
  }
}

export async function addProjectMember(
  raw: AddMemberInput
): Promise<ActionResult<void>> {
  try {
    const session = await requireSession()
    const data = addMemberSchema.parse(raw)

    const db = await getDb()
    const project = await db.projects.findOneOrFail({ where: { id: data.projectId } })
    if (project.ownerId !== session.user.id) throw new Error("Only owner can add members")

    const userToAdd = await db.users.findOneOrFail({ where: { email: data.email } })

    const existing = await db.projectMembers.findOne({
      where: { projectId: data.projectId, userId: userToAdd.id },
    })

    if (existing) {
      await db.projectMembers.update(
        { projectId: data.projectId, userId: userToAdd.id },
        { role: data.role as Role }
      )
    } else {
      await db.projectMembers.save(
        db.projectMembers.create({
          projectId: data.projectId,
          userId: userToAdd.id,
          role: data.role as Role,
        })
      )
    }

    revalidatePath(`/projects/${project.slug}/settings`)
    return { success: true, data: undefined }
  } catch (err) {
    logger.error({ err }, "addProjectMember failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to add member" }
  }
}

export async function generateInviteLink(
  raw: GenerateInviteInput
): Promise<ActionResult<{ token: string }>> {
  try {
    const session = await requireSession()
    const data = generateInviteSchema.parse(raw)

    const db = await getDb()
    const project = await db.projects.findOneOrFail({ where: { id: data.projectId } })

    const callerMember = await db.projectMembers.findOne({
      where: { projectId: data.projectId, userId: session.user.id },
    })
    if (!callerMember || callerMember.role === Role.USER) {
      throw new Error("Only admins and managers can generate invite links")
    }

    const token = randomBytes(32).toString("base64url")
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    await db.invitations.save(
      db.invitations.create({
        token,
        projectId: project.id,
        email: null,
        role: data.role as Role,
        createdBy: session.user.id,
        expiresAt,
        usedAt: null,
        usedById: null,
      })
    )

    revalidatePath(`/projects/${project.slug}/settings`)
    return { success: true, data: { token } }
  } catch (err) {
    logger.error({ err }, "generateInviteLink failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to generate invite link" }
  }
}

export async function acceptInvitation(
  token: string
): Promise<ActionResult<{ slug: string }>> {
  try {
    const session = await requireSession()
    const db = await getDb()

    const invitation = await db.invitations.findOne({ where: { token } })
    if (!invitation) throw new Error("Приглашение не найдено")
    if (invitation.usedAt) throw new Error("Приглашение уже использовано")
    if (invitation.expiresAt < new Date()) throw new Error("Срок приглашения истёк")

    const project = await db.projects.findOneOrFail({ where: { id: invitation.projectId } })

    const existing = await db.projectMembers.findOne({
      where: { projectId: invitation.projectId, userId: session.user.id },
    })

    if (!existing) {
      await db.ds.transaction(async (em) => {
        await em.getRepository("ProjectMember").save(
          em.getRepository("ProjectMember").create({
            projectId: invitation.projectId,
            userId: session.user.id,
            role: invitation.role,
          })
        )
        await em.getRepository("Invitation").update(
          { token },
          { usedAt: new Date(), usedById: session.user.id }
        )
        await em.getRepository("AuditLog").save(
          em.getRepository("AuditLog").create({
            action: AuditAction.ASSIGN,
            entityId: invitation.projectId,
            entityType: EntityType.MEMBER,
            newValue: { userId: session.user.id, role: invitation.role },
            performedBy: session.user.id,
          })
        )
      })
    } else {
      await db.invitations.update({ token }, { usedAt: new Date(), usedById: session.user.id })
    }

    revalidatePath(`/projects/${project.slug}/board`)
    return { success: true, data: { slug: project.slug } }
  } catch (err) {
    logger.error({ err }, "acceptInvitation failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to accept invitation" }
  }
}

export async function removeMember(
  raw: RemoveMemberInput
): Promise<ActionResult<void>> {
  try {
    const session = await requireSession()
    const data = removeMemberSchema.parse(raw)

    const db = await getDb()
    const project = await db.projects.findOneOrFail({ where: { id: data.projectId } })

    const callerMember = await db.projectMembers.findOne({
      where: { projectId: data.projectId, userId: session.user.id },
    })
    if (!callerMember || callerMember.role === Role.USER) {
      throw new Error("Only admins can remove members")
    }
    if (data.userId === project.ownerId) throw new Error("Cannot remove the project owner")

    await db.projectMembers.delete({ projectId: data.projectId, userId: data.userId })

    revalidatePath(`/projects/${project.slug}/settings`)
    return { success: true, data: undefined }
  } catch (err) {
    logger.error({ err }, "removeMember failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to remove member" }
  }
}

export async function updateMemberRole(
  raw: UpdateMemberRoleInput
): Promise<ActionResult<void>> {
  try {
    const session = await requireSession()
    const data = updateMemberRoleSchema.parse(raw)

    const db = await getDb()
    const project = await db.projects.findOneOrFail({ where: { id: data.projectId } })

    if (project.ownerId !== session.user.id) throw new Error("Only owner can change roles")
    if (data.userId === project.ownerId) throw new Error("Cannot change owner's role")

    await db.projectMembers.update(
      { projectId: data.projectId, userId: data.userId },
      { role: data.role as Role }
    )

    revalidatePath(`/projects/${project.slug}/settings`)
    return { success: true, data: undefined }
  } catch (err) {
    logger.error({ err }, "updateMemberRole failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to update role" }
  }
}

export async function revokeInvitation(
  invitationId: string
): Promise<ActionResult<void>> {
  try {
    const session = await requireSession()
    const db = await getDb()

    const invitation = await db.invitations.findOne({ where: { id: invitationId } })
    if (!invitation) throw new Error("Invitation not found")

    const project = await db.projects.findOneOrFail({ where: { id: invitation.projectId } })

    const callerMember = await db.projectMembers.findOne({
      where: { projectId: invitation.projectId, userId: session.user.id },
    })
    if (!callerMember || callerMember.role === Role.USER) {
      throw new Error("Only admins can revoke invitations")
    }

    await db.invitations.delete({ id: invitationId })

    revalidatePath(`/projects/${project.slug}/settings`)
    return { success: true, data: undefined }
  } catch (err) {
    logger.error({ err }, "revokeInvitation failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to revoke invitation" }
  }
}
