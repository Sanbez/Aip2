"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Plus } from "lucide-react"
import type { TaskStatus } from "@/lib/enums"
import { cn } from "@/lib/utils"
import { type KanbanTask, COLUMN_LABELS } from "@/features/tasks/types"
import { StatusIcon } from "@/components/board/status-icon"
import { TaskCard } from "./task-card"

const STATUS_TO_ICON: Record<TaskStatus, string> = {
  BACKLOG: "backlog",
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  REVIEW: "in_review",
  DONE: "done",
}

const STATUS_ACCENT: Record<TaskStatus, string> = {
  BACKLOG:     "oklch(0.52 0.006 265)",
  TODO:        "oklch(0.62 0.22 240)",
  IN_PROGRESS: "oklch(0.67 0.24 285)",
  REVIEW:      "oklch(0.78 0.14 75)",
  DONE:        "oklch(0.72 0.16 145)",
}

type Props = {
  status: TaskStatus
  tasks: KanbanTask[]
  onTaskClick: (id: string) => void
  onAddTask: (status: TaskStatus) => void
}

export function KanbanColumn({ status, tasks, onTaskClick, onAddTask }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status, data: { type: "column", status } })
  const accent = STATUS_ACCENT[status]

  return (
    <section aria-label={COLUMN_LABELS[status]} className="flex h-full w-[300px] shrink-0 flex-col">
      {/* Column header */}
      <header
        className="sticky top-0 z-10 mb-2.5 flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 backdrop-blur-md"
        style={{
          background: `linear-gradient(135deg, ${accent}14, ${accent}06)`,
          border: `1px solid ${accent}22`,
          boxShadow: `0 2px 12px ${accent}0a`,
        }}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: accent, boxShadow: `0 0 8px ${accent}, 0 0 16px ${accent}66` }}
          />
          <StatusIcon status={STATUS_TO_ICON[status] as Parameters<typeof StatusIcon>[0]["status"]} emphasis />
          <h2 className="truncate text-[11.5px] font-semibold uppercase tracking-widest"
            style={{ color: accent }}>
            {COLUMN_LABELS[status]}
          </h2>
          <span
            className="rounded-lg px-1.5 py-0.5 font-mono text-[10px] tnum font-bold"
            style={{ background: accent + "20", color: accent }}
          >
            {tasks.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onAddTask(status)}
          className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground/60 transition-all hover:text-foreground"
          style={{ background: "var(--accent)" }}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </header>

      {/* Cards area */}
      <div
        ref={setNodeRef}
        className={cn(
          "relative flex flex-1 flex-col gap-2 overflow-y-auto rounded-xl p-2 transition-all duration-200",
        )}
        style={{
          background: isOver
            ? `linear-gradient(180deg, ${accent}0c, ${accent}04)`
            : "oklch(from var(--foreground) l c h / 0.025)",
          border: isOver
            ? `1px solid ${accent}30`
            : "1px solid var(--border)",
          boxShadow: isOver
            ? `inset 0 0 24px ${accent}12, 0 0 0 1px ${accent}20`
            : "none",
        }}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task.id)} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="m-1 flex flex-1 items-center justify-center rounded-xl border border-dashed px-3 py-10 text-center text-[11.5px] text-muted-foreground/40"
            style={{ borderColor: `${accent}18` }}>
            Перетащи задачу сюда
          </div>
        )}

        <button
          type="button"
          onClick={() => onAddTask(status)}
          className="mt-1 flex h-8 items-center gap-1.5 rounded-xl border border-transparent px-2 text-[12px] text-muted-foreground/40 transition-all hover:text-foreground/70"
          style={{
            ":hover": { background: "var(--accent)", borderColor: "var(--border)" }
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = "var(--accent)"
            ;(e.currentTarget as HTMLElement).style.borderColor = "var(--border)"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = "transparent"
            ;(e.currentTarget as HTMLElement).style.borderColor = "transparent"
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          Новая задача
        </button>
      </div>
    </section>
  )
}
