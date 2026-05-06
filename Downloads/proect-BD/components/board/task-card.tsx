"use client"

import { useRef } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  Calendar,
  CheckSquare2,
  GripVertical,
  MessageSquare,
  Paperclip,
} from "lucide-react"
import type { Task, Board } from "@/lib/types"
import { cn } from "@/lib/utils"
import {
  formatDueDate,
  labelChipClasses,
  labelDotClasses,
} from "./label-utils"
import { PriorityIcon } from "./priority-icon"
import { StatusIcon, inferStatus } from "./status-icon"

interface TaskCardProps {
  task: Task
  board: Board
  onClick?: () => void
  isOverlay?: boolean
}

export function TaskCard({ task, board, onClick, isOverlay = false }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "task", columnId: task.columnId },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Track pointer to distinguish click vs drag.
  const pointerStart = useRef<{ x: number; y: number; t: number } | null>(null)

  const due = formatDueDate(task.dueDate)
  const labels = task.labels.map((id) => board.labels[id]).filter(Boolean)
  const assignees = task.assigneeIds.map((id) => board.members[id]).filter(Boolean)
  const column = board.columns.find((c) => c.id === task.columnId)
  const status = inferStatus(column?.title ?? "todo")
  const checklistPct = task.checklist
    ? Math.round((task.checklist.done / task.checklist.total) * 100)
    : 0

  return (
    <article
      ref={setNodeRef}
      style={style}
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
        const dt = Date.now() - start.t
        if (dx < 5 && dy < 5 && dt < 400) {
          onClick?.()
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Открыть ${task.key}: ${task.title}`}
      className={cn(
        "group relative cursor-grab select-none rounded-lg border border-border bg-card text-left",
        "shadow-[0_1px_0_oklch(1_0_0_/_0.04),0_1px_2px_oklch(0_0_0_/_0.4)]",
        "transition-all duration-150",
        "hover:border-foreground/15 hover:bg-card/90",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "active:cursor-grabbing",
        isDragging && "opacity-30",
        isOverlay && "rotate-1 scale-[1.02] border-foreground/30 shadow-2xl",
      )}
    >
      {/* Drag handle hint, visible on hover */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 hidden -translate-x-full pl-1 pr-1 text-muted-foreground/40 group-hover:block"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </span>

      <div className="px-3 pt-2.5 pb-2.5">
        {/* Top row: priority + ID + assignees */}
        <div className="mb-1.5 flex items-center gap-1.5">
          <PriorityIcon priority={task.priority} />
          <span className="font-mono text-[10.5px] tnum text-muted-foreground">
            {task.key}
          </span>
          <div className="ml-auto flex items-center gap-1">
            {assignees.length > 0 && (
              <div className="flex -space-x-1">
                {assignees.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    title={m.name}
                    className="flex h-5 w-5 items-center justify-center rounded-full border border-card bg-foreground/10 text-[9px] font-medium text-foreground/90"
                  >
                    {m.initials}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-pretty text-[13px] font-medium leading-snug text-card-foreground">
          {task.title}
        </h3>

        {/* Description preview */}
        {task.description && (
          <p className="mt-1 line-clamp-2 text-[11.5px] leading-snug text-muted-foreground">
            {task.description}
          </p>
        )}

        {/* Labels */}
        {labels.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {labels.map((l) => (
              <span
                key={l.id}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-1.5 py-px text-[10px] font-medium",
                  labelChipClasses[l.color],
                )}
              >
                <span
                  className={cn(
                    "h-1 w-1 rounded-full",
                    labelDotClasses[l.color],
                  )}
                />
                {l.name}
              </span>
            ))}
          </div>
        )}

        {/* Checklist progress bar */}
        {task.checklist && (
          <div className="mt-2.5 flex items-center gap-2">
            <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-foreground/[0.07]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-foreground/70"
                style={{ width: `${checklistPct}%` }}
              />
            </div>
            <span className="font-mono text-[10px] tnum text-muted-foreground">
              {task.checklist.done}/{task.checklist.total}
            </span>
          </div>
        )}

        {/* Footer: status + meta */}
        <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span
            className="inline-flex items-center gap-1"
            title={column?.title}
          >
            <StatusIcon status={status} />
            <span className="text-[10.5px]">{column?.title}</span>
          </span>

          <span className="ml-auto flex items-center gap-2.5">
            {due.label && (
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  due.tone === "overdue" && "text-foreground",
                  due.tone === "soon" && "text-foreground/80",
                )}
                title={`Срок: ${due.label}`}
              >
                <Calendar className="h-3 w-3" />
                <span className="tnum">{due.label}</span>
              </span>
            )}
            {task.checklist && (
              <span className="inline-flex items-center gap-0.5">
                <CheckSquare2 className="h-3 w-3" />
              </span>
            )}
            {task.commentsCount > 0 && (
              <span className="inline-flex items-center gap-0.5">
                <MessageSquare className="h-3 w-3" />
                <span className="tnum">{task.commentsCount}</span>
              </span>
            )}
            {task.attachmentsCount > 0 && (
              <span className="inline-flex items-center gap-0.5">
                <Paperclip className="h-3 w-3" />
                <span className="tnum">{task.attachmentsCount}</span>
              </span>
            )}
          </span>
        </div>
      </div>
    </article>
  )
}
