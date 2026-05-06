import { EntitySchema } from "typeorm"
import { Role } from "../enums"
import type { User } from "./user.entity"
import type { Project } from "./project.entity"

export type ProjectMember = {
  id: string
  projectId: string
  userId: string
  role: Role
  joinedAt: Date
  project?: Project
  user?: User
}

export const ProjectMemberEntity = new EntitySchema<ProjectMember>({
  name: "ProjectMember",
  tableName: "project_members",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    projectId: { type: "uuid" },
    userId: { type: "uuid" },
    role: { type: "enum", enum: Role, default: Role.USER },
    joinedAt: { type: "timestamp", createDate: true },
  },
  relations: {
    project: {
      type: "many-to-one",
      target: "Project",
      joinColumn: { name: "projectId" },
      onDelete: "CASCADE",
    },
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "userId" },
      onDelete: "CASCADE",
    },
  },
  uniques: [{ columns: ["projectId", "userId"] }],
  indices: [
    { columns: ["projectId"] },
    { columns: ["userId"] },
  ],
})
