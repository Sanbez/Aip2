import { redirect } from "next/navigation"
import Link from "next/link"
import { CheckSquare, Calendar, AlertCircle } from "lucide-react"
import { auth } from "@/lib/auth"
import { getMyTasks } from "@/features/tasks/queries"
import { TaskStatus, TaskPriority } from "@/lib/enums"

const STATUS_LABELS: Record<TaskStatus, string> = {
  BACKLOG: "Бэклог",
  TODO: "К выполнению",
  IN_PROGRESS: "В работе",
  REVIEW: "Проверка",
  DONE: "Готово",
}

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  LOW: "text-blue-400",
  MEDIUM: "text-yellow-400",
  HIGH: "text-orange-400",
  URGENT: "text-red-500",
}

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  LOW: "Низкий",
  MEDIUM: "Средний",
  HIGH: "Высокий",
  URGENT: "Срочно",
}

function isOverdue(dueDate: Date | null) {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

export default async function MyTasksPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const tasks = await getMyTasks(session.user.id)

  const activeTasks = tasks.filter((t) => t.status !== TaskStatus.DONE)
  const doneTasks = tasks.filter((t) => t.status === TaskStatus.DONE)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <header className="shrink-0 border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-[19px] font-semibold tracking-tight">Мои задачи</h1>
        </div>
        <div className="mt-1 flex gap-4 text-[12px] text-muted-foreground">
          <span>Активных: <span className="font-medium text-foreground">{activeTasks.length}</span></span>
          <span>Выполнено: <span className="font-medium text-foreground">{doneTasks.length}</span></span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 py-6 space-y-6">
          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <CheckSquare className="mb-4 h-12 w-12 text-muted-foreground/30" />
              <p className="text-[15px] font-medium text-muted-foreground">Нет назначенных задач</p>
              <p className="mt-1 text-[13px] text-muted-foreground/60">
                Задачи появятся здесь, когда вас назначат исполнителем
              </p>
            </div>
          )}

          {activeTasks.length > 0 && (
            <section>
              <h2 className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Активные
              </h2>
              <div className="space-y-2">
                {activeTasks.map((task) => {
                  const overdue = isOverdue(task.dueDate)
                  return (
                    <Link
                      key={task.id}
                      href={`/projects/${task.project.slug}/board`}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:bg-card hover:shadow-sm"
                    >
                      <div
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: task.project.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-[13px] font-medium">{task.title}</p>
                        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span>{task.project.name}</span>
                          <span>·</span>
                          <span>{STATUS_LABELS[task.status]}</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {task.dueDate && (
                          <span className={`flex items-center gap-1 text-[11px] ${overdue ? "text-destructive" : "text-muted-foreground"}`}>
                            {overdue && <AlertCircle className="h-3 w-3" />}
                            <Calendar className="h-3 w-3" />
                            {new Date(task.dueDate).toLocaleDateString("ru", { day: "numeric", month: "short" })}
                          </span>
                        )}
                        <span className={`text-[11px] font-medium ${PRIORITY_COLORS[task.priority]}`}>
                          {PRIORITY_LABELS[task.priority]}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}

          {doneTasks.length > 0 && (
            <section>
              <h2 className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Выполнено
              </h2>
              <div className="space-y-2 opacity-60">
                {doneTasks.map((task) => (
                  <Link
                    key={task.id}
                    href={`/projects/${task.project.slug}/board`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:bg-card"
                  >
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: task.project.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[13px] font-medium line-through text-muted-foreground">{task.title}</p>
                      <p className="text-[11px] text-muted-foreground">{task.project.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
