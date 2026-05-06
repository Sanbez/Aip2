import { z } from "zod"
import { TaskStatus, TaskPriority } from "@/lib/enums"

export const createTaskSchema = z.object({
  title: z.string().min(1, "Название обязательно").max(255),
  description: z.string().max(10_000).optional(),
  projectId: z.string().uuid("Некорректный ID проекта"),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.BACKLOG),
  priority: z.nativeEnum(TaskPriority).default(TaskPriority.MEDIUM),
  assigneeId: z.string().uuid().nullable().optional(),
  dueDate: z.coerce.date().optional(),
  orderIndex: z.number().optional().default(0),
})

export const updateTaskSchema = createTaskSchema.partial().extend({
  id: z.string().uuid(),
})

export const moveTaskSchema = z.object({
  id: z.string().uuid(),
  status: z.nativeEnum(TaskStatus),
  orderIndex: z.number(),
})

export const deleteTaskSchema = z.object({
  id: z.string().uuid(),
})

export type CreateTaskInput = z.input<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
export type MoveTaskInput = z.infer<typeof moveTaskSchema>
