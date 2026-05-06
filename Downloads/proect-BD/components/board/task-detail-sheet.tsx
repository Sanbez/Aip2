"use client"

import { Calendar, Tag, User, GitBranch, Hash, Clock, Flag } from "lucide-react"
import type { Board, Task } from "@/lib/types"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  formatDueDate,
  labelChipClasses,
  labelDotClasses,
  priorityConfig,
} from "./label-utils"
import { PriorityIcon } from "./priority-icon"
import { StatusIcon, inferStatus } from "./status-icon"

interface TaskDetailSheetProps {
  task: Task | null
  board: Board
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskDetailSheet({
  task,
  board,
  open,
  onOpenChange,
}: TaskDetailSheetProps) {
  if (!task) return null

  const labels = task.labels.map((id) => board.labels[id]).filter(Boolean)
  const assignees = task.assigneeIds.map((id) => board.members[id]).filter(Boolean)
  const due = formatDueDate(task.dueDate)
  const priority = priorityConfig[task.priority]
  const column = board.columns.find((c) => c.id === task.columnId)
  const status = inferStatus(column?.title ?? "todo")
  const checklistPct = task.checklist
    ? Math.round((task.checklist.done / task.checklist.total) * 100)
    : 0

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto bg-background p-0 sm:max-w-xl">
        <SheetHeader className="border-b border-border px-6 py-4 text-left">
          <div className="flex items-center gap-2 text-[11px]">
            <Hash className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono tnum text-muted-foreground">{task.key}</span>
            {column && (
              <>
                <span className="text-muted-foreground/60">·</span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-foreground/[0.04] px-1.5 py-0.5">
                  <StatusIcon status={status} />
                  <span className="font-medium">{column.title}</span>
                </span>
              </>
            )}
            <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="tnum">2 ч назад</span>
            </span>
          </div>
          <SheetTitle className="text-pretty text-[20px] font-semibold leading-tight tracking-tight">
            {task.title}
          </SheetTitle>
          {task.description && (
            <SheetDescription className="text-pretty text-[13px] leading-relaxed">
              {task.description}
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_220px]">
          {/* Main */}
          <div className="space-y-6">
            {task.checklist && (
              <section aria-labelledby="checklist-heading">
                <div className="mb-2 flex items-center justify-between">
                  <h3
                    id="checklist-heading"
                    className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    Чек-лист
                  </h3>
                  <span className="font-mono text-[11px] tnum text-muted-foreground">
                    {task.checklist.done}/{task.checklist.total} · {checklistPct}%
                  </span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-foreground/[0.07]">
                  <div
                    className="h-full rounded-full bg-foreground/80 transition-all"
                    style={{ width: `${checklistPct}%` }}
                  />
                </div>
              </section>
            )}

            <section aria-labelledby="activity-heading">
              <h3
                id="activity-heading"
                className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
              >
                Активность
              </h3>
              <div className="space-y-3">
                {assignees[0] && (
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-[10px] font-medium">
                      {assignees[0].initials}
                    </div>
                    <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-3">
                      <p className="text-[11.5px] text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {assignees[0].name}
                        </span>
                        {" · "}комментарий, 2 ч назад
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed">
                        Поднимаю приоритет — это блокирует следующий релиз.
                        Возьму после дизайн-ревью.
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                    Я
                  </div>
                  <div className="flex-1 rounded-lg border border-border bg-card p-2">
                    <textarea
                      placeholder="Оставьте комментарий…"
                      rows={2}
                      className="w-full resize-none border-0 bg-transparent p-1 text-[13px] outline-none placeholder:text-muted-foreground"
                    />
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <Button variant="ghost" size="sm" className="h-7 text-[12px]">
                        Отмена
                      </Button>
                      <Button size="sm" className="h-7 text-[12px]">
                        Отправить
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 text-[12px]">
            <DetailRow icon={GitBranch} label="Статус">
              <span className="inline-flex items-center gap-1.5">
                <StatusIcon status={status} />
                <span className="text-foreground">{column?.title}</span>
              </span>
            </DetailRow>

            <DetailRow icon={Flag} label="Приоритет">
              <span className="inline-flex items-center gap-1.5">
                <PriorityIcon priority={task.priority} />
                <span className={cn("text-foreground", priority.tone)}>
                  {priority.label}
                </span>
              </span>
            </DetailRow>

            <Separator />

            <DetailRow icon={User} label="Исполнители">
              {assignees.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                  {assignees.map((m) => (
                    <div key={m.id} className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10 text-[9px] font-medium">
                        {m.initials}
                      </div>
                      <span className="truncate text-[12px] text-foreground/90">
                        {m.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground">Не назначен</span>
              )}
            </DetailRow>

            <DetailRow icon={Tag} label="Лейблы">
              {labels.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {labels.map((l) => (
                    <span
                      key={l.id}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-[10px] font-medium",
                        labelChipClasses[l.color],
                      )}
                    >
                      <span className={cn("h-1 w-1 rounded-full", labelDotClasses[l.color])} />
                      {l.name}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground">Нет</span>
              )}
            </DetailRow>

            <Separator />

            <DetailRow icon={Calendar} label="Срок">
              <span
                className={cn(
                  "tnum",
                  due.tone === "default" && "text-muted-foreground",
                  due.tone !== "default" && "text-foreground",
                )}
              >
                {due.label || "Нет даты"}
              </span>
            </DetailRow>

            <DetailRow icon={Hash} label="ID">
              <span className="font-mono text-[11px] tnum text-muted-foreground">
                {task.key}
              </span>
            </DetailRow>
          </aside>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface DetailRowProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
  priority?: never
}

function DetailRow({ icon: Icon, label, children }: DetailRowProps) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-start gap-2">
      <div className="flex items-center gap-1.5 pt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" aria-hidden="true" />
        {label}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  )
}
