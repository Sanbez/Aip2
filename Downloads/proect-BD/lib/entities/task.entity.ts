import { EntitySchema } from "typeorm"
import { TaskStatus, TaskPriority } from "../enums"
import type { User } from "./user.entity"
import type { Project } from "./project.entity"
import type { Comment } from "./comment.entity"

export type Task = {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  orderIndex: number
  dueDate: Date | null
  projectId: string
  assigneeId: string | null
  createdAt: Date
  updatedAt: Date
  project?: Project
  assignee?: User | null
  comments?: Comment[]
}

export const TaskEntity = new EntitySchema<Task>({
  name: "Task",
  tableName: "tasks",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    title: { type: "varchar" },
    description: { type: "text", nullable: true },
    status: { type: "enum", enum: TaskStatus, default: TaskStatus.BACKLOG },
    priority: { type: "enum", enum: TaskPriority, default: TaskPriority.MEDIUM },
    orderIndex: { type: "float", default: 0 },
    dueDate: { type: "timestamp", nullable: true },
    projectId: { type: "uuid" },
    assigneeId: { type: "uuid", nullable: true },
    createdAt: { type: "timestamp", createDate: true },
    updatedAt: { type: "timestamp", updateDate: true },
  },
  relations: {
    project: {
      type: "many-to-one",
      target: "Project",
      joinColumn: { name: "projectId" },
      onDelete: "CASCADE",
    },
    assignee: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "assigneeId" },
      nullable: true,
    },
    comments: {
      type: "one-to-many",
      target: "Comment",
      inverseSide: "task",
    },
  },
  indices: [
    { columns: ["projectId", "status"] },
    { columns: ["projectId", "orderIndex"] },
    { columns: ["assigneeId"] },
    { columns: ["projectId"] },
  ],
})
