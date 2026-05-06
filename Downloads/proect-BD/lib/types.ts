export type Priority = "low" | "medium" | "high" | "urgent"

export type LabelColor = "indigo" | "amber" | "emerald" | "rose" | "slate" | "sky"

export interface Label {
  id: string
  name: string
  color: LabelColor
}

export interface Member {
  id: string
  name: string
  initials: string
  role?: string
}

export interface Task {
  id: string
  key: string // e.g. "FB-12"
  title: string
  description?: string
  columnId: string
  priority: Priority
  labels: string[] // Label ids
  assigneeIds: string[] // Member ids
  dueDate?: string // ISO
  commentsCount: number
  attachmentsCount: number
  checklist?: { total: number; done: number }
  createdAt: string
}

export interface Column {
  id: string
  title: string
  taskIds: string[]
  limit?: number
}

export interface Board {
  id: string
  name: string
  description?: string
  columns: Column[]
  tasks: Record<string, Task>
  labels: Record<string, Label>
  members: Record<string, Member>
}
