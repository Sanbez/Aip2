import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Activity } from "lucide-react"
import { auth } from "@/lib/auth"
import { getProjectBySlug } from "@/features/projects/queries"
import { getProjectActivityLog } from "@/features/audit/queries"
import { AuditAction, EntityType } from "@/lib/enums"

const ACTION_LABELS: Record<AuditAction, string> = {
  CREATE: "создал(а)",
  UPDATE: "обновил(а)",
  DELETE: "удалил(а)",
  ASSIGN: "назначил(а)",
  STATUS_CHANGE: "изменил(а) статус",
  COMMENT_ADD: "прокомментировал(а)",
}

const ACTION_COLORS: Record<AuditAction, string> = {
  CREATE: "bg-green-500/15 text-green-500",
  UPDATE: "bg-blue-500/15 text-blue-500",
  DELETE: "bg-red-500/15 text-red-500",
  ASSIGN: "bg-purple-500/15 text-purple-500",
  STATUS_CHANGE: "bg-yellow-500/15 text-yellow-600",
  COMMENT_ADD: "bg-foreground/10 text-muted-foreground",
}

const ENTITY_LABELS: Record<EntityType, string> = {
  TASK: "задачу",
  PROJECT: "проект",
  COMMENT: "комментарий",
  MEMBER: "участника",
}

function Avatar({ name, avatarUrl }: { name: string | null; avatarUrl: string | null }) {
  const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() ?? "?"
  if (avatarUrl) return <img src={avatarUrl} alt={name ?? ""} className="h-7 w-7 rounded-full object-cover" />
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/10 text-[10px] font-medium">
      {initials}
    </span>
  )
}

function timeAgo(date: Date) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000
  if (diff < 60) return "только что"
  if (diff < 3600) return `${Math.floor(diff / 60)} мин назад`
  if (diff < 86400) return `${Math.floor(diff / 3600)} ч назад`
  return new Date(date).toLocaleDateString("ru", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const project = await getProjectBySlug(slug, session.user.id)
  if (!project) notFound()

  const logs = await getProjectActivityLog(project.id)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <header className="shrink-0 border-b border-border px-6 py-4">
        <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
          <Link href="/projects" className="hover:text-foreground transition-colors">Проекты</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href={`/projects/${slug}/board`} className="hover:text-foreground transition-colors">
            {project.name}
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground">Активность</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-[19px] font-semibold tracking-tight">Лог активности</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-6">
          {logs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Activity className="mb-4 h-12 w-12 text-muted-foreground/30" />
              <p className="text-[14px] text-muted-foreground">Активности ещё нет</p>
            </div>
          )}

          <div className="relative space-y-0">
            {logs.map((log, i) => {
              const performer = log.performer as unknown as { id: string; name: string | null; avatarUrl: string | null } | null
              const newVal = log.newValue as Record<string, unknown> | null
              const oldVal = log.oldValue as Record<string, unknown> | null

              return (
                <div key={log.id} className="flex gap-3 py-3">
                  {/* Timeline line */}
                  <div className="relative flex flex-col items-center">
                    <Avatar name={performer?.name ?? null} avatarUrl={performer?.avatarUrl ?? null} />
                    {i < logs.length - 1 && (
                      <div className="mt-2 w-px flex-1 bg-border" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex flex-wrap items-center gap-1.5 text-[12.5px]">
                      <span className="font-medium">{performer?.name ?? "Пользователь"}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${ACTION_COLORS[log.action]}`}>
                        {ACTION_LABELS[log.action]}
                      </span>
                      <span className="text-muted-foreground">{ENTITY_LABELS[log.entityType]}</span>
                      <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                        {timeAgo(log.timestamp)}
                      </span>
                    </div>

                    {/* Show relevant change details */}
                    {log.action === AuditAction.STATUS_CHANGE && !!oldVal && !!newVal && (
                      <p className="mt-1 text-[12px] text-muted-foreground">
                        <span className="line-through">{String(oldVal.status ?? "")}</span>
                        {" → "}
                        <span className="font-medium text-foreground">{String(newVal.status ?? "")}</span>
                      </p>
                    )}
                    {log.action === AuditAction.CREATE && !!newVal?.title && (
                      <p className="mt-1 text-[12px] font-medium text-foreground">{String(newVal.title)}</p>
                    )}
                    {log.action === AuditAction.UPDATE && !!newVal?.title && (
                      <p className="mt-1 text-[12px] font-medium text-foreground">{String(newVal.title)}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
