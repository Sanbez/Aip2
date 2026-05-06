"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { AuditAction, EntityType } from "@/lib/enums"
import { createCommentSchema } from "./schemas"

type Result<T = void> = { success: true; data: T } | { success: false; error: string }

async function requireSession() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")
  return session
}

async function requireTaskAccess(taskId: string, userId: string) {
  const db = await getDb()
  const task = await db.tasks.findOneOrFail({ where: { id: taskId } })
  const member = await db.projectMembers.findOne({
    where: { projectId: task.projectId, userId },
  })
  if (!member) throw new Error("Access denied to task")
  return task
}

export async function createComment(raw: unknown): Promise<Result<{ id: string }>> {
  try {
    const session = await requireSession()
    const data = createCommentSchema.parse(raw)

    await requireTaskAccess(data.taskId, session.user.id)
    const db = await getDb()

    const comment = await db.ds.transaction(async (em) => {
      const commentRepo = em.getRepository("Comment")
      const c = commentRepo.create({
        content: data.content,
        taskId: data.taskId,
        authorId: session.user.id,
        parentId: data.parentId ?? null,
      })
      await commentRepo.save(c)

      await em.getRepository("AuditLog").save(
        em.getRepository("AuditLog").create({
          action: AuditAction.COMMENT_ADD,
          entityId: data.taskId,
          entityType: EntityType.TASK,
          newValue: { commentId: (c as { id: string }).id },
          performedBy: session.user.id,
        })
      )

      return c as { id: string }
    })

    revalidatePath(`/api/tasks/${data.taskId}`)
    return { success: true, data: { id: comment.id } }
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Failed" }
  }
}
