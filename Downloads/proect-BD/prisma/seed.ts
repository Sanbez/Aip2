import { AppDataSource } from "../lib/data-source"
import { UserEntity } from "../lib/entities/user.entity"
import { ProjectEntity } from "../lib/entities/project.entity"
import { ProjectMemberEntity } from "../lib/entities/project-member.entity"
import { TaskEntity } from "../lib/entities/task.entity"
import { CommentEntity } from "../lib/entities/comment.entity"
import { Role, TaskStatus, TaskPriority } from "../lib/enums"
import bcrypt from "bcryptjs"

async function main() {
  await AppDataSource.initialize()
  console.log("🌱 Seeding demo data…")

  const passwordHash = await bcrypt.hash("password123", 12)

  const userRepo = AppDataSource.getRepository(UserEntity)
  const projectRepo = AppDataSource.getRepository(ProjectEntity)
  const memberRepo = AppDataSource.getRepository(ProjectMemberEntity)
  const taskRepo = AppDataSource.getRepository(TaskEntity)
  const commentRepo = AppDataSource.getRepository(CommentEntity)

  let admin = await userRepo.findOne({ where: { email: "admin@flowboard.dev" } })
  if (!admin) {
    admin = await userRepo.save(
      userRepo.create({
        name: "Алим Администратор",
        email: "admin@flowboard.dev",
        passwordHash,
        role: Role.ADMIN,
      })
    )
  }

  let dev = await userRepo.findOne({ where: { email: "dev@flowboard.dev" } })
  if (!dev) {
    dev = await userRepo.save(
      userRepo.create({
        name: "Разработчик",
        email: "dev@flowboard.dev",
        passwordHash,
        role: Role.USER,
      })
    )
  }

  const existing = await projectRepo.findOne({ where: { slug: "flowboard-demo" } })
  if (existing) {
    console.log("✅ Demo data already exists, skipping.")
    await AppDataSource.destroy()
    return
  }

  const project = await projectRepo.save(
    projectRepo.create({
      name: "Flowboard Demo",
      slug: "flowboard-demo",
      description: "Демо-проект для знакомства с Flowboard",
      color: "#6366f1",
      ownerId: admin.id,
    })
  )

  await memberRepo.save([
    memberRepo.create({ projectId: project.id, userId: admin.id, role: Role.ADMIN }),
    memberRepo.create({ projectId: project.id, userId: dev.id, role: Role.USER }),
  ])

  const taskDefs: Array<{
    title: string
    description?: string
    status: TaskStatus
    priority: TaskPriority
    orderIndex: number
    assigneeId?: string
  }> = [
    { title: "Настроить CI/CD pipeline", status: TaskStatus.DONE, priority: TaskPriority.HIGH, orderIndex: 1000, assigneeId: dev.id },
    { title: "Написать README проекта", status: TaskStatus.DONE, priority: TaskPriority.MEDIUM, orderIndex: 2000, assigneeId: admin.id },
    { title: "Разработать схему БД", status: TaskStatus.DONE, priority: TaskPriority.URGENT, orderIndex: 3000, assigneeId: admin.id },
    { title: "Реализовать аутентификацию", description: "NextAuth v5 с Credentials и GitHub провайдерами", status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH, orderIndex: 1000, assigneeId: admin.id },
    { title: "Канбан-доска с DnD", description: "Перетаскивание задач между колонками с сохранением в БД", status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH, orderIndex: 2000, assigneeId: dev.id },
    { title: "Дизайн страницы профиля", status: TaskStatus.TODO, priority: TaskPriority.MEDIUM, orderIndex: 1000 },
    { title: "Уведомления по email", status: TaskStatus.TODO, priority: TaskPriority.LOW, orderIndex: 2000 },
    { title: "Мобильная версия", status: TaskStatus.TODO, priority: TaskPriority.MEDIUM, orderIndex: 3000 },
    { title: "Интеграция с GitHub Issues", status: TaskStatus.BACKLOG, priority: TaskPriority.LOW, orderIndex: 1000 },
    { title: "Экспорт в CSV", status: TaskStatus.BACKLOG, priority: TaskPriority.LOW, orderIndex: 2000 },
    { title: "Тёмная/светлая тема", status: TaskStatus.REVIEW, priority: TaskPriority.MEDIUM, orderIndex: 1000, assigneeId: dev.id },
    { title: "Оптимизация запросов к БД", status: TaskStatus.REVIEW, priority: TaskPriority.HIGH, orderIndex: 2000, assigneeId: admin.id },
  ]

  for (const def of taskDefs) {
    const task = await taskRepo.save(
      taskRepo.create({
        ...def,
        projectId: project.id,
        assigneeId: def.assigneeId ?? null,
        description: def.description ?? null,
      })
    )

    if (def.title === "Канбан-доска с DnD") {
      await commentRepo.save([
        commentRepo.create({
          content: "Использую @dnd-kit — отличная библиотека, поддерживает touch events",
          taskId: task.id,
          authorId: dev.id,
          parentId: null,
        }),
        commentRepo.create({
          content: "Обязательно добавь оптимистичные обновления для плавного UX",
          taskId: task.id,
          authorId: admin.id,
          parentId: null,
        }),
      ])
    }
  }

  console.log("✅ Seed complete!")
  console.log("   Email: admin@flowboard.dev")
  console.log("   Password: password123")

  await AppDataSource.destroy()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
