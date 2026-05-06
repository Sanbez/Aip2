import { getDb } from "@/lib/db"
import type { EntityType } from "@/lib/enums"

export async function getAuditLogs({
  entityId,
  entityType,
  limit = 50,
}: {
  entityId?: string
  entityType?: EntityType
  limit?: number
}) {
  const db = await getDb()

  const qb = db.auditLogs
    .createQueryBuilder("log")
    .leftJoin("log.performer", "performer")
    .addSelect(["performer.id", "performer.name", "performer.avatarUrl"])
    .orderBy("log.timestamp", "DESC")
    .take(limit)

  if (entityId) qb.andWhere("log.entityId = :entityId", { entityId })
  if (entityType) qb.andWhere("log.entityType = :entityType", { entityType })

  return qb.getMany()
}

export async function getProjectActivityLog(projectId: string, limit = 60) {
  const db = await getDb()

  const taskIds = await db.tasks
    .find({ where: { projectId }, select: { id: true } })
    .then((rows) => rows.map((r) => r.id))

  const entityIds = [projectId, ...taskIds]
  if (entityIds.length === 0) return []

  return db.auditLogs
    .createQueryBuilder("log")
    .leftJoin("log.performer", "performer")
    .addSelect(["performer.id", "performer.name", "performer.avatarUrl"])
    .where("log.entityId IN (:...ids)", { ids: entityIds })
    .orderBy("log.timestamp", "DESC")
    .take(limit)
    .getMany()
}
