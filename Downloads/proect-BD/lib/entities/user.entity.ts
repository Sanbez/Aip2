import { EntitySchema } from "typeorm"
import { Role } from "../enums"

export type User = {
  id: string
  email: string
  emailVerified: Date | null
  name: string | null
  avatarUrl: string | null
  passwordHash: string | null
  role: Role
  createdAt: Date
  updatedAt: Date
}

export const UserEntity = new EntitySchema<User>({
  name: "User",
  tableName: "users",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    email: { type: "varchar", unique: true },
    emailVerified: { type: "timestamp", nullable: true },
    name: { type: "varchar", nullable: true },
    avatarUrl: { type: "varchar", nullable: true },
    passwordHash: { type: "varchar", nullable: true },
    role: { type: "enum", enum: Role, default: Role.USER },
    createdAt: { type: "timestamp", createDate: true },
    updatedAt: { type: "timestamp", updateDate: true },
  },
  indices: [{ columns: ["email"] }],
})
