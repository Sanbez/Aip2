import { DataSource } from "typeorm"
import { AppDataSource } from "./data-source"
import {
  UserEntity,
  ProjectEntity,
  ProjectMemberEntity,
  TaskEntity,
  CommentEntity,
  AuditLogEntity,
  InvitationEntity,
} from "./entities"

declare global {
  // eslint-disable-next-line no-var
  var _dsPromise: Promise<DataSource> | undefined
}

function getDataSource(): Promise<DataSource> {
  if (!global._dsPromise) {
    global._dsPromise = AppDataSource.isInitialized
      ? Promise.resolve(AppDataSource)
      : AppDataSource.initialize()
  }
  return global._dsPromise
}

export async function getDb() {
  const ds = await getDataSource()
  return {
    users: ds.getRepository(UserEntity),
    projects: ds.getRepository(ProjectEntity),
    projectMembers: ds.getRepository(ProjectMemberEntity),
    tasks: ds.getRepository(TaskEntity),
    comments: ds.getRepository(CommentEntity),
    auditLogs: ds.getRepository(AuditLogEntity),
    invitations: ds.getRepository(InvitationEntity),
    ds,
  }
}
