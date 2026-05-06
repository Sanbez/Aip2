import { EntitySchema } from "typeorm"
import type { User } from "./user.entity"
import type { Task } from "./task.entity"

export type Comment = {
  id: string
  content: string
  taskId: string
  authorId: string
  parentId: string | null
  createdAt: Date
  updatedAt: Date
  task?: Task
  author?: User
  parent?: Comment | null
  replies?: Comment[]
}

export const CommentEntity = new EntitySchema<Comment>({
  name: "Comment",
  tableName: "comments",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    content: { type: "text" },
    taskId: { type: "uuid" },
    authorId: { type: "uuid" },
    parentId: { type: "uuid", nullable: true },
    createdAt: { type: "timestamp", createDate: true },
    updatedAt: { type: "timestamp", updateDate: true },
  },
  relations: {
    task: {
      type: "many-to-one",
      target: "Task",
      joinColumn: { name: "taskId" },
      onDelete: "CASCADE",
    },
    author: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "authorId" },
      onDelete: "CASCADE",
    },
    parent: {
      type: "many-to-one",
      target: "Comment",
      joinColumn: { name: "parentId" },
      nullable: true,
    },
    replies: {
      type: "one-to-many",
      target: "Comment",
      inverseSide: "parent",
    },
  },
  indices: [
    { columns: ["taskId"] },
    { columns: ["authorId"] },
    { columns: ["parentId"] },
  ],
})
