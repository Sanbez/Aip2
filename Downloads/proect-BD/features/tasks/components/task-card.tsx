"use client"

import { useRef } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { MessageSquare, Calendar, AlertCircle } from "lucide-react"
import type { TaskPriority } from "@/lib/enums"
import { cn } from "@/lib/utils"
import { type KanbanTask } from "@/features/tasks/types"

const PRIORITY_CONFIG: Record<TaskPriority, { bar: string; badge: string }> = {
  LOW:    { bar: "oklch(0.55 0.006 265)", badge: "oklch(0.55 0.006 265 / 0.15)" },
  MEDIUM: { bar: "oklch(0.78 0.14 75)",  badge: "oklch(0.78 0.14 75 / 0.15)" },
  HIGH:   { bar: "oklch(0.67 0.24 285)", badge: "oklch(0.67 0.24 285 / 0.15)" },
  URGENT: { bar: "oklch(0.62 0.22 25)",  badge: "oklch(0.62 0.22 25 / 0.15)" },
}

function PriorityBar({ priority }: { priority: TaskPriority }) {
  const { bar } = PRIORITY_CONFIG[priority]
  return (
    <div
      className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl"
      style={{
        background: bar,
        boxShadow: `0 0 8px ${bar}`,
      }}
    />
  )
}

function Avatar({ name, avatarUrl }: { name: string | null; avatarUrl: string | null }) {
  const initials = name
    ? name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?"
  if (avatarUrl) {
    return <img src={avatarUrl} alt={name ?? ""} className="h-5 w-5 rounded-full object-cover ring-1 ring-white/10" />
  }
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold text-white"
      style={{ background: "linear-gradient(135deg, oklch(0.67 0.24 285), oklch(0.60 0.22 240))" }}>
      {initials}
    </span>
  )
}

interface TaskCardProps {
  task: KanbanTask
  onClick?: () => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "task", status: task.status },
  })

  const style = { transform: CSS.Transform.toString(transform), transition }
  const pointerStart = useRef<{ x: number; y: number; t: number } | null>(null)

  const dueStr = task.dueDate
    ? new Intl.DateTimeFormat("ru", { day: "numeric", month: "short" }).format(new Date(task.dueDate))
    : null
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date()
  const { bar } = PRIORITY_CONFIG[task.priority]

  return (
    <article
      ref={setNodeRef}
      style={{
        ...style,
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 8px oklch(0 0 0 / 0.2), inset 0 1px 0 oklch(1 0 0 / 0.04)",
      }}
      {...attributes}
      {...listeners}
      onPointerDown={(e) => {
        pointerStart.current = { x: e.clientX, y: e.clientY, t: Date.now() }
        listeners?.onPointerDown?.(e)
      }}
      onPointerUp={(e) => {
        const start = pointerStart.current
        pointerStart.current = null
        if (!start || isDragging) return
        const dx = Math.abs(e.clientX - start.x)
        const dy = Math.abs(e.clientY - start.y)
        if (dx < 5 && dy < 5 && Date.now() - start.t < 400) onClick?.()
      }}
      className={cn(
        "group relative cursor-pointer select-none overflow-hidden rounded-xl pl-4 pr-3 py-3",
        "transition-all duration-200",
        isDragging && "opacity-30 scale-95",
      )}
    >
      {/* Hover glow from priority color */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ boxShadow: `inset 0 0 20px ${bar}0a, 0 4px 20px oklch(0 0 0 / 0.3), 0 0 0 1px ${bar}18` }}
      />

      <PriorityBar priority={task.priority} />

      <p className="text-[13px] font-medium leading-snug text-foreground/90 relative z-10">{task.title}</p>

      <div className="mt-2.5 flex items-center gap-1.5 relative z-10">
        {task.commentCount > 0 && (
          <span className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] text-muted-foreground"
            style={{ background: "var(--accent)" }}>
            <MessageSquare className="h-2.5 w-2.5" />
            {task.commentCount}
          </span>
        )}
        {dueStr && (
          <span className={cn(
            "flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-medium",
          )}
            style={{
              background: isOverdue ? "oklch(0.62 0.22 25 / 0.15)" : "var(--accent)",
              color: isOverdue ? "oklch(0.62 0.22 25)" : "var(--muted-foreground)",
              border: isOverdue ? "1px solid oklch(0.62 0.22 25 / 0.3)" : "none",
            }}>
            {isOverdue ? <AlertCircle className="h-2.5 w-2.5" /> : <Calendar className="h-2.5 w-2.5" />}
            {dueStr}
          </span>
        )}
        {task.assignee && (
          <span className="ml-auto">
            <Avatar name={task.assignee.name} avatarUrl={task.assignee.avatarUrl} />
          </span>
        )}
      </div>
    </article>
  )
}

export function TaskCardOverlay({ task }: { task: KanbanTask }) {
  return (
    <article
      className="relative w-[300px] rotate-2 cursor-grabbing overflow-hidden rounded-xl pl-4 pr-3 py-3 backdrop-blur-sm"
      style={{
        background: "var(--card)",
        border: "1px solid oklch(0.67 0.24 285 / 0.4)",
        boxShadow: "0 20px 60px oklch(0 0 0 / 0.5), 0 0 30px oklch(0.67 0.24 285 / 0.2)",
      }}
    >
      <div
        className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl"
        style={{ background: PRIORITY_CONFIG[task.priority].bar }}
      />
      <p className="text-[13px] font-medium leading-snug text-foreground/90">{task.title}</p>
    </article>
  )
}
