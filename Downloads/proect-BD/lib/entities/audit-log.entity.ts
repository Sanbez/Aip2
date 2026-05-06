import { EntitySchema } from "typeorm"
import { AuditAction, EntityType } from "../enums"
import type { User } from "./user.entity"

export type AuditLog = {
  id: string
  action: AuditAction
  entityId: string
  entityType: EntityType
  oldValue: Record<string, unknown> | null
  newValue: Record<string, unknown> | null
  performedBy: string
  timestamp: Date
  performer?: User
}

export const AuditLogEntity = new EntitySchema<AuditLog>({
  name: "AuditLog",
  tableName: "audit_logs",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    action: { type: "enum", enum: AuditAction },
    entityId: { type: "uuid" },
    entityType: { type: "enum", enum: EntityType },
    oldValue: { type: "jsonb", nullable: true },
    newValue: { type: "jsonb", nullable: true },
    performedBy: { type: "uuid" },
    timestamp: { type: "timestamp", createDate: true },
  },
  relations: {
    performer: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "performedBy" },
    },
  },
  indices: [
    { columns: ["entityId", "entityType"] },
    { columns: ["performedBy"] },
    { columns: ["timestamp"] },
  ],
})
