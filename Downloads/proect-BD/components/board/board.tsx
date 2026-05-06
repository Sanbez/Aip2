"use client"

import { useMemo, useState } from "react"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { Plus } from "lucide-react"
import type { Board as BoardType } from "@/lib/types"
import { mockBoard } from "@/lib/mock-data"
import { BoardHeader } from "./board-header"
import { BoardColumn } from "./board-column"
import { TaskCard } from "./task-card"
import { TaskDetailSheet } from "./task-detail-sheet"

export function Board() {
  const [board, setBoard] = useState<BoardType>(mockBoard)
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
  const [openTaskId, setOpenTaskId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const activeTask = activeTaskId ? board.tasks[activeTaskId] : null
  const openTask = openTaskId ? board.tasks[openTaskId] : null

  function findColumnIdByTaskId(taskId: string): string | undefined {
    return board.columns.find((col) => col.taskIds.includes(taskId))?.id
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveTaskId(String(event.active.id))
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)
    if (activeId === overId) return

    const activeColumnId = findColumnIdByTaskId(activeId)
    const overData = over.data.current as { type?: string } | undefined
    const overColumnId =
      overData?.type === "column" ? overId : findColumnIdByTaskId(overId)

    if (!activeColumnId || !overColumnId) return
    if (activeColumnId === overColumnId) return

    setBoard((prev) => {
      const newColumns = prev.columns.map((col) => {
        if (col.id === activeColumnId) {
          return { ...col, taskIds: col.taskIds.filter((id) => id !== activeId) }
        }
        if (col.id === overColumnId) {
          const overIndex =
            overData?.type === "column"
              ? col.taskIds.length
              : col.taskIds.indexOf(overId)
          const newTaskIds = [...col.taskIds]
          const insertAt = overIndex === -1 ? newTaskIds.length : overIndex
          newTaskIds.splice(insertAt, 0, activeId)
          return { ...col, taskIds: newTaskIds }
        }
        return col
      })

      return {
        ...prev,
        columns: newColumns,
        tasks: {
          ...prev.tasks,
          [activeId]: { ...prev.tasks[activeId], columnId: overColumnId },
        },
      }
    })
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveTaskId(null)
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)
    if (activeId === overId) return

    const overData = over.data.current as { type?: string } | undefined
    const activeColumnId = findColumnIdByTaskId(activeId)
    if (!activeColumnId) return

    if (overData?.type === "task") {
      const overColumnId = findColumnIdByTaskId(overId)
      if (overColumnId && overColumnId === activeColumnId) {
        setBoard((prev) => {
          const col = prev.columns.find((c) => c.id === activeColumnId)
          if (!col) return prev
          const oldIndex = col.taskIds.indexOf(activeId)
          const newIndex = col.taskIds.indexOf(overId)
          if (oldIndex === -1 || newIndex === -1) return prev
          const newTaskIds = arrayMove(col.taskIds, oldIndex, newIndex)
          return {
            ...prev,
            columns: prev.columns.map((c) =>
              c.id === activeColumnId ? { ...c, taskIds: newTaskIds } : c,
            ),
          }
        })
      }
    }
  }

  function handleAddTask(columnId: string) {
    const id = `t-${Date.now()}`
    const number = Object.keys(board.tasks).length + 200
    const newTask = {
      id,
      key: `FB-${number}`,
      title: "Новая задача",
      columnId,
      priority: "medium" as const,
      labels: [],
      assigneeIds: [],
      commentsCount: 0,
      attachmentsCount: 0,
      createdAt: new Date().toISOString(),
    }
    setBoard((prev) => ({
      ...prev,
      tasks: { ...prev.tasks, [id]: newTask },
      columns: prev.columns.map((c) =>
        c.id === columnId ? { ...c, taskIds: [...c.taskIds, id] } : c,
      ),
    }))
    setOpenTaskId(id)
  }

  function handleAddColumn() {
    const id = `c-${Date.now()}`
    const title = window.prompt("Название колонки", "Новая колонка")
    if (!title) return
    setBoard((prev) => ({
      ...prev,
      columns: [...prev.columns, { id, title, taskIds: [] }],
    }))
  }

  function handleDeleteColumn(columnId: string) {
    setBoard((prev) => {
      const col = prev.columns.find((c) => c.id === columnId)
      if (!col) return prev
      const newTasks = { ...prev.tasks }
      col.taskIds.forEach((id) => delete newTasks[id])
      return {
        ...prev,
        columns: prev.columns.filter((c) => c.id !== columnId),
        tasks: newTasks,
      }
    })
  }

  const columns = useMemo(() => board.columns, [board.columns])

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <BoardHeader board={board} onCreateTask={() => handleAddTask(columns[0].id)} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="board-scroll relative flex flex-1 gap-5 overflow-x-auto overflow-y-hidden px-5 py-4">
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              board={board}
              onTaskClick={(taskId) => setOpenTaskId(taskId)}
              onAddTask={handleAddTask}
              onDeleteColumn={handleDeleteColumn}
            />
          ))}

          {/* Add column */}
          <button
            type="button"
            onClick={handleAddColumn}
            className="flex h-9 w-[300px] shrink-0 items-center justify-center gap-1.5 rounded-md border border-dashed border-border text-[12px] text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-foreground/[0.03] hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            Добавить колонку
          </button>
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} board={board} isOverlay /> : null}
        </DragOverlay>
      </DndContext>

      <TaskDetailSheet
        task={openTask}
        board={board}
        open={!!openTaskId}
        onOpenChange={(open) => {
          if (!open) setOpenTaskId(null)
        }}
      />
    </div>
  )
}
