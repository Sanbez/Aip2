"use client"

import { useMemo } from "react"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { MoreHorizontal, Plus } from "lucide-react"
import type { Board, Column } from "@/lib/types"
import { cn } from "@/lib/utils"
import { TaskCard } from "./task-card"
import { StatusIcon, inferStatus } from "./status-icon"

interface BoardColumnProps {
  column: Column
  board: Board
  onTaskClick: (taskId: string) => void
  onAddTask: (columnId: string) => void
  onDeleteColumn?: (columnId: string) => void
}

export function BoardColumn({
  column,
  board,
  onTaskClick,
  onAddTask,
  onDeleteColumn,
}: BoardColumnProps) {
  const tasks = useMemo(
    () => column.taskIds.map((id) => board.tasks[id]).filter(Boolean),
    [column.taskIds, board.tasks],
  )

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column" },
  })

  const isOverLimit = column.limit !== undefined && tasks.length > column.limit
  const status = inferStatus(column.title)

  return (
    <section
      aria-label={column.title}
      className="flex h-full w-[300px] shrink-0 flex-col"
    >
      {/* Column header */}
      <header
        className={cn(
          "sticky top-0 z-10 flex items-center justify-between gap-2 px-1 pb-2",
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <StatusIcon status={status} emphasis />
          <h2 className="truncate text-[12.5px] font-semibold uppercase tracking-wider text-foreground">
            {column.title}
          </h2>
          <span
            className={cn(
              "rounded-md border border-border bg-foreground/[0.04] px-1.5 py-0.5 font-mono text-[10px] tnum text-muted-foreground",
              isOverLimit && "border-foreground/30 text-foreground",
            )}
          >
            {tasks.length}
            {column.limit !== undefined && (
              <span className="text-muted-foreground/60"> / {column.limit}</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onAddTask(column.id)}
            aria-label={`Добавить задачу в «${column.title}»`}
            className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label={`Удалить колонку «${column.title}»`}
            onClick={() => {
              if (
                onDeleteColumn &&
                window.confirm(`Удалить колонку «${column.title}» со всеми задачами?`)
              ) {
                onDeleteColumn(column.id)
              }
            }}
            className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Tasks droppable area */}
      <div
        ref={setNodeRef}
        className={cn(
          "relative flex flex-1 flex-col gap-2 overflow-y-auto rounded-lg border border-transparent p-1 transition-colors",
          isOver && "border-foreground/15 bg-foreground/[0.025]",
        )}
      >
        <SortableContext
          items={column.taskIds}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              board={board}
              onClick={() => onTaskClick(task.id)}
            />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="m-1 flex flex-1 items-center justify-center rounded-lg border border-dashed border-border px-3 py-10 text-center text-[11.5px] text-muted-foreground">
            Перетащите задачи сюда
          </div>
        )}

        <button
          type="button"
          onClick={() => onAddTask(column.id)}
          className="mt-1 flex h-7 items-center gap-1.5 rounded-md border border-transparent px-2 text-left text-[12px] text-muted-foreground transition-colors hover:border-border hover:bg-foreground/[0.03] hover:text-foreground"
        >
          <Plus className="h-3.5 w-3.5" />
          Новая задача
        </button>
      </div>
    </section>
  )
}
