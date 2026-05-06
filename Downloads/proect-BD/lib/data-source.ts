import { DataSource } from "typeorm"
import {
  UserEntity,
  ProjectEntity,
  ProjectMemberEntity,
  TaskEntity,
  CommentEntity,
  AuditLogEntity,
  InvitationEntity,
} from "./entities"

function parseDbUrl(raw: string) {
  const clean = raw.replace(/\?.*$/, "")
  const u = new URL(clean)
  return {
    host: u.hostname,
    port: u.port ? parseInt(u.port) : 5432,
    database: u.pathname.slice(1),
    username: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
  }
}

const conn = parseDbUrl(process.env.DATABASE_URL!)

export const AppDataSource = new DataSource({
  type: "postgres",
  ...conn,
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  entities: [
    UserEntity,
    ProjectEntity,
    ProjectMemberEntity,
    TaskEntity,
    CommentEntity,
    AuditLogEntity,
    InvitationEntity,
  ],
})
