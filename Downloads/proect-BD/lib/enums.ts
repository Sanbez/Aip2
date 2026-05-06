export enum Role {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
}

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  DONE = "DONE",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum AuditAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  ASSIGN = "ASSIGN",
  STATUS_CHANGE = "STATUS_CHANGE",
  COMMENT_ADD = "COMMENT_ADD",
}

export enum EntityType {
  TASK = "TASK",
  PROJECT = "PROJECT",
  COMMENT = "COMMENT",
  MEMBER = "MEMBER",
}
