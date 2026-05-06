import { EntitySchema } from "typeorm"
import { Role } from "../enums"

export type Invitation = {
  id: string
  token: string
  projectId: string
  email: string | null
  role: Role
  createdBy: string
  expiresAt: Date
  usedAt: Date | null
  usedById: string | null
}

export const InvitationEntity = new EntitySchema<Invitation>({
  name: "Invitation",
  tableName: "invitations",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    token: { type: "varchar", unique: true },
    projectId: { type: "uuid" },
    email: { type: "varchar", nullable: true },
    role: { type: "enum", enum: Role, default: Role.USER },
    createdBy: { type: "uuid" },
    expiresAt: { type: "timestamp" },
    usedAt: { type: "timestamp", nullable: true },
    usedById: { type: "uuid", nullable: true },
  },
  indices: [
    { columns: ["token"] },
    { columns: ["projectId"] },
  ],
})
