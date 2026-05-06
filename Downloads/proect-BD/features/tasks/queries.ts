import { getDb } from "@/lib/db"
import { TaskStatus } from "@/lib/enums"
import type { KanbanTask } from "./types"

export async function getKanbanBoard(projectId: string): Promise<Record<TaskStatus, KanbanTask[]>> {
  const db = await getDb()

  // loadRelationCountAndMap injects commentCount at runtime; cast to include it
  const rows = await db.tasks
    .createQueryBuilder("task")
    .leftJoin("task.assignee", "assignee")
    .addSelect(["assignee.id", "assignee.name", "assignee.avatarUrl"])
    .loadRelationCountAndMap("task.commentCount", "task.comments")
    .where("task.projectId = :projectId", { projectId })
    .orderBy("task.orderIndex", "ASC")
    .getMany() as unknown as Array<{
      id: string
      title: string
      status: TaskStatus
      priority: KanbanTask["priority"]
      orderIndex: number
      dueDate: Date | null
      assignee: KanbanTask["assignee"]
      commentCount: number
    }>

  const columns = Object.values(TaskStatus).reduce<Record<TaskStatus, KanbanTask[]>>(
    (acc, status) => { acc[status] = []; return acc },
    {} as Record<TaskStatus, KanbanTask[]>
  )

  for (const row of rows) {
    columns[row.status]?.push({
      id: row.id,
      title: row.title,
      status: row.status,
      priority: row.priority,
      orderIndex: row.orderIndex,
      dueDate: row.dueDate,
      assignee: row.assignee,
      commentCount: row.commentCount ?? 0,
    })
  }

  return columns
}

export async function getTaskById(id: string) {
  const db = await getDb()
  return db.tasks.findOne({
    where: { id },
    relations: { assignee: true },
  })
}

export async function getMyTasks(userId: string) {
  const db = await getDb()

  const tasks = await db.tasks
    .createQueryBuilder("task")
    .leftJoin("task.project", "project")
    .addSelect(["project.id", "project.name", "project.slug", "project.color"])
    .loadRelationCountAndMap("task.commentCount", "task.comments")
    .where("task.assigneeId = :userId", { userId })
    .orderBy("task.dueDate", "ASC", "NULLS LAST")
    .addOrderBy("task.priority", "DESC")
    .getMany() as unknown as Array<{
      id: string
      title: string
      status: TaskStatus
      priority: KanbanTask["priority"]
      dueDate: Date | null
      commentCount: number
      project: { id: string; name: string; slug: string; color: string }
    }>

  return tasks
}
