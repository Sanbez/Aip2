"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { logger } from "@/lib/logger"
import { AuditAction, EntityType } from "@/lib/enums"
import {
  createTaskSchema,
  updateTaskSchema,
  moveTaskSchema,
  deleteTaskSchema,
  type CreateTaskInput,
  type UpdateTaskInput,
  type MoveTaskInput,
} from "./schemas"

type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }

async function requireSession() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")
  return session
}

async function requireProjectMember(projectId: string, userId: string) {
  const db = await getDb()
  const member = await db.projectMembers.findOne({
    where: { projectId, userId },
  })
  if (!member) throw new Error("Access denied to project")
  return member
}

export async function createTask(
  raw: CreateTaskInput
): Promise<ActionResult<{ id: string; title: string }>> {
  try {
    const session = await requireSession()
    const data = createTaskSchema.parse(raw)
    await requireProjectMember(data.projectId, session.user.id)

    const db = await getDb()

    const maxResult = await db.tasks
      .createQueryBuilder("task")
      .select("MAX(task.orderIndex)", "max")
      .where("task.projectId = :projectId AND task.status = :status", {
        projectId: data.projectId,
        status: data.status,
      })
      .getRawOne<{ max: number | null }>()

    const orderIndex = (maxResult?.max ?? 0) + 1000

    const task = await db.ds.transaction(async (em) => {
      const taskRepo = em.getRepository("Task")
      const created = taskRepo.create({
        title: data.title,
        description: data.description ?? null,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate ?? null,
        orderIndex,
        projectId: data.projectId,
        assigneeId: data.assigneeId ?? null,
      })
      await taskRepo.save(created)

      await em.getRepository("AuditLog").save(
        em.getRepository("AuditLog").create({
          action: AuditAction.CREATE,
          entityId: (created as { id: string }).id,
          entityType: EntityType.TASK,
          newValue: { title: data.title, status: data.status, priority: data.priority },
          performedBy: session.user.id,
        })
      )

      return created as { id: string; title: string }
    })

    logger.info({ taskId: task.id, userId: session.user.id }, "Task created")
    revalidatePath(`/projects/${data.projectId}/board`)
    return { success: true, data: { id: task.id, title: task.title } }
  } catch (err) {
    logger.error({ err }, "createTask failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to create task" }
  }
}

export async function updateTask(
  raw: UpdateTaskInput
): Promise<ActionResult<{ id: string }>> {
  try {
    const session = await requireSession()
    const data = updateTaskSchema.parse(raw)
    const { id, ...fields } = data

    const db = await getDb()
    const existing = await db.tasks.findOneOrFail({ where: { id } })
    await requireProjectMember(existing.projectId, session.user.id)

    await db.ds.transaction(async (em) => {
      await em.getRepository("Task").update({ id }, fields)

      await em.getRepository("AuditLog").save(
        em.getRepository("AuditLog").create({
          action: AuditAction.UPDATE,
          entityId: id,
          entityType: EntityType.TASK,
          oldValue: { status: existing.status, priority: existing.priority, title: existing.title },
          newValue: fields,
          performedBy: session.user.id,
        })
      )
    })

    revalidatePath(`/projects/${existing.projectId}/board`)
    return { success: true, data: { id } }
  } catch (err) {
    logger.error({ err }, "updateTask failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to update task" }
  }
}

export async function moveTask(raw: MoveTaskInput): Promise<ActionResult<void>> {
  try {
    const session = await requireSession()
    const data = moveTaskSchema.parse(raw)

    const db = await getDb()
    const existing = await db.tasks.findOneOrFail({ where: { id: data.id } })
    await requireProjectMember(existing.projectId, session.user.id)

    await db.ds.transaction(async (em) => {
      await em.getRepository("Task").update(
        { id: data.id },
        { status: data.status, orderIndex: data.orderIndex }
      )

      if (existing.status !== data.status) {
        await em.getRepository("AuditLog").save(
          em.getRepository("AuditLog").create({
            action: AuditAction.STATUS_CHANGE,
            entityId: data.id,
            entityType: EntityType.TASK,
            oldValue: { status: existing.status },
            newValue: { status: data.status },
            performedBy: session.user.id,
          })
        )
      }
    })

    revalidatePath(`/projects/${existing.projectId}/board`)
    return { success: true, data: undefined }
  } catch (err) {
    logger.error({ err }, "moveTask failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to move task" }
  }
}

export async function deleteTask(raw: unknown): Promise<ActionResult<void>> {
  try {
    const session = await requireSession()
    const { id } = deleteTaskSchema.parse(raw)

    const db = await getDb()
    const existing = await db.tasks.findOneOrFail({ where: { id } })
    await requireProjectMember(existing.projectId, session.user.id)

    await db.ds.transaction(async (em) => {
      await em.getRepository("Task").delete({ id })
      await em.getRepository("AuditLog").save(
        em.getRepository("AuditLog").create({
          action: AuditAction.DELETE,
          entityId: id,
          entityType: EntityType.TASK,
          performedBy: session.user.id,
        })
      )
    })

    revalidatePath(`/projects/${existing.projectId}/board`)
    return { success: true, data: undefined }
  } catch (err) {
    logger.error({ err }, "deleteTask failed")
    return { success: false, error: err instanceof Error ? err.message : "Failed to delete task" }
  }
}
