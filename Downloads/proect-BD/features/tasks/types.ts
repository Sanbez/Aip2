import { TaskStatus, TaskPriority } from "@/lib/enums"

export type KanbanTask = {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  orderIndex: number
  dueDate: Date | null
  assignee: { id: string; name: string | null; avatarUrl: string | null } | null
  commentCount: number
}

export type MemberOption = {
  id: string
  name: string | null
  email: string
  avatarUrl: string | null
}

export const COLUMN_ORDER: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.REVIEW,
  TaskStatus.DONE,
]

export const COLUMN_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "Бэклог",
  [TaskStatus.TODO]: "К выполнению",
  [TaskStatus.IN_PROGRESS]: "В работе",
  [TaskStatus.REVIEW]: "Ревью",
  [TaskStatus.DONE]: "Готово",
}

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "Низкий",
  [TaskPriority.MEDIUM]: "Средний",
  [TaskPriority.HIGH]: "Высокий",
  [TaskPriority.URGENT]: "Срочный",
}
