import { getDb } from "@/lib/db"

export async function getProjectsForUser(userId: string) {
  const db = await getDb()

  const members = await db.projectMembers.find({
    where: { userId },
    relations: { project: { owner: true } },
  })

  const projects = await Promise.all(
    members.map(async (m) => {
      const project = m.project!
      const [taskCount, memberCount] = await Promise.all([
        db.tasks.countBy({ projectId: project.id }),
        db.projectMembers.countBy({ projectId: project.id }),
      ])
      const o = project.owner
      return {
        ...project,
        owner: o ? { id: o.id, name: o.name, avatarUrl: o.avatarUrl } : { id: "", name: null, avatarUrl: null },
        _count: { tasks: taskCount, members: memberCount },
      }
    })
  )

  return projects.sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  )
}

export async function getProjectSettings(slug: string, userId: string) {
  const db = await getDb()

  const project = await db.projects.findOne({
    where: { slug },
    relations: { owner: true },
  })
  if (!project) return null

  const callerMember = await db.projectMembers.findOne({
    where: { projectId: project.id, userId },
  })
  if (!callerMember) return null

  const members = await db.projectMembers.find({
    where: { projectId: project.id },
    relations: { user: true },
    order: { joinedAt: "ASC" },
  })

  const invitations = await db.invitations.find({
    where: { projectId: project.id },
    order: { expiresAt: "DESC" },
  })

  const activeInvitations = invitations.filter(
    (inv) => !inv.usedAt && inv.expiresAt > new Date()
  )

  return {
    ...project,
    callerRole: callerMember.role,
    members: members.map((m) => ({
      id: m.id,
      userId: m.userId,
      role: m.role,
      joinedAt: m.joinedAt,
      user: m.user
        ? { id: m.user.id, name: m.user.name, email: m.user.email, avatarUrl: m.user.avatarUrl }
        : null,
    })),
    activeInvitations: activeInvitations.map((inv) => ({
      id: inv.id,
      token: inv.token,
      role: inv.role,
      expiresAt: inv.expiresAt,
    })),
  }
}

export async function getInvitationByToken(token: string) {
  const db = await getDb()
  const invitation = await db.invitations.findOne({ where: { token } })
  if (!invitation) return null
  if (invitation.usedAt || invitation.expiresAt < new Date()) return null

  const project = await db.projects.findOne({ where: { id: invitation.projectId } })
  if (!project) return null

  return {
    token: invitation.token,
    role: invitation.role,
    expiresAt: invitation.expiresAt,
    project: { id: project.id, name: project.name, slug: project.slug, color: project.color },
  }
}

export async function getProjectBySlug(slug: string, userId: string) {
  const db = await getDb()

  const project = await db.projects.findOne({
    where: { slug },
    relations: { owner: true },
  })
  if (!project) return null

  const members = await db.projectMembers.find({
    where: { projectId: project.id },
    relations: { user: true },
  })

  const isMember = members.some((m) => m.userId === userId)
  if (!isMember) return null

  const taskCount = await db.tasks.countBy({ projectId: project.id })

  return {
    ...project,
    members,
    _count: { tasks: taskCount },
  }
}
