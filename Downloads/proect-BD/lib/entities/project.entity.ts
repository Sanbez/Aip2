import { EntitySchema } from "typeorm"
import type { User } from "./user.entity"

export type Project = {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
  owner?: User
}

export const ProjectEntity = new EntitySchema<Project>({
  name: "Project",
  tableName: "projects",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    name: { type: "varchar" },
    slug: { type: "varchar", unique: true },
    description: { type: "varchar", nullable: true },
    color: { type: "varchar", default: "#6366f1" },
    ownerId: { type: "uuid" },
    createdAt: { type: "timestamp", createDate: true },
    updatedAt: { type: "timestamp", updateDate: true },
  },
  relations: {
    owner: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "ownerId" },
      eager: false,
    },
  },
  indices: [
    { columns: ["ownerId"] },
    { columns: ["slug"] },
  ],
})
