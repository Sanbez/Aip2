"use client"

import { useState, useTransition } from "react"
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
import { TaskStatus, TaskPriority } from "@/lib/enums"
import { moveTask } from "@/features/tasks/actions"
import { type KanbanTask, type MemberOption, COLUMN_ORDER } from "@/features/tasks/types"
import { KanbanColumn } from "./kanban-column"
import { TaskCardOverlay } from "./task-card"
import { TaskDetailSheet } from "./task-detail-sheet"
import { CreateTaskDialog } from "./create-task-dialog"

type Props = {
  initialColumns: Record<TaskStatus, KanbanTask[]>
  projectId: string
  projectSlug: string
  members: MemberOption[]
}

export function KanbanBoard({ initialColumns, projectId, projectSlug, members }: Props) {
  const [columns, setColumns] = useState(initialColumns)
  const [activeTask, setActiveTask] = useState<KanbanTask | null>(null)
  const [openTaskId, setOpenTaskId] = useState<string | null>(null)
  const [createInStatus, setCreateInStatus] = useState<TaskStatus | null>(null)
  const [, startTransition] = useTransition()

  function handleTaskUpdated(
    taskId: string,
    patch: Partial<
      Pick<KanbanTask, "priority" | "status" | "commentCount"> & {
        assigneeId: string | null
        assignee: KanbanTask["assignee"]
      }
    >
  ) {
    setColumns((prev) => {
      const next = { ...prev }
      for (const status of COLUMN_ORDER) {
        const idx = next[status].findIndex((t) => t.id === taskId)
        if (idx === -1) continue
        const updated = { ...next[status][idx], ...patch }
        // If status changed, move the task
        if (patch.status && patch.status !== status) {
          next[status] = next[status].filter((t) => t.id !== taskId)
          next[patch.status] = [...(next[patch.status] ?? []), updated]
        } else {
          next[status] = next[status].map((t) => t.id === taskId ? updated : t)
        }
        break
      }
      return next
    })
  }

  function handleTaskCommented(taskId: string, nextCommentCount: number) {
    handleTaskUpdated(taskId, { commentCount: nextCommentCount })
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function findTask(id: string): KanbanTask | undefined {
    for (const status of COLUMN_ORDER) {
      const found = columns[status].find((t) => t.id === id)
      if (found) return found
    }
  }

  function findColumnForTask(id: string): TaskStatus | undefined {
    for (const status of COLUMN_ORDER) {
      if (columns[status].some((t) => t.id === id)) return status
    }
  }

  function handleDragStart({ active }: DragStartEvent) {
    setActiveTask(findTask(String(active.id)) ?? null)
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    if (!over) return
    const activeId = String(active.id)
    const overId = String(over.id)
    if (activeId === overId) return

    const activeStatus = findColumnForTask(activeId)
    // overId is either a TaskStatus (column drop) or a task id
    const overStatus = COLUMN_ORDER.includes(overId as TaskStatus)
      ? (overId as TaskStatus)
      : findColumnForTask(overId)

    if (!activeStatus || !overStatus || activeStatus === overStatus) return

    setColumns((prev) => {
      const activeCol = prev[activeStatus].filter((t) => t.id !== activeId)
      const movedTask = prev[activeStatus].find((t) => t.id === activeId)!
      const overCol = [...prev[overStatus]]
      const overIdx = overCol.findIndex((t) => t.id === overId)
      overCol.splice(overIdx >= 0 ? overIdx : overCol.length, 0, {
        ...movedTask,
        status: overStatus,
      })
      return { ...prev, [activeStatus]: activeCol, [overStatus]: overCol }
    })
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveTask(null)
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)
    const finalStatus = findColumnForTask(activeId)
    if (!finalStatus) return

    let finalTasks = columns[finalStatus]

    // Reorder within same column
    if (finalTasks.some((t) => t.id === overId) && activeId !== overId) {
      const oldIdx = finalTasks.findIndex((t) => t.id === activeId)
      const newIdx = finalTasks.findIndex((t) => t.id === overId)
      const reordered = arrayMove(finalTasks, oldIdx, newIdx)
      setColumns((prev) => ({ ...prev, [finalStatus]: reordered }))
      finalTasks = reordered
    }

    const taskIdx = finalTasks.findIndex((t) => t.id === activeId)
    const newOrderIndex = (taskIdx + 1) * 1000

    startTransition(() => {
      void moveTask({ id: activeId, status: finalStatus, orderIndex: newOrderIndex })
    })
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-1 gap-4 overflow-x-auto overflow-y-hidden px-6 py-4">
          {COLUMN_ORDER.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={columns[status]}
              onTaskClick={setOpenTaskId}
              onAddTask={(s) => setCreateInStatus(s)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCardOverlay task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

      <TaskDetailSheet
        taskId={openTaskId}
        open={!!openTaskId}
        onOpenChange={(open) => !open && setOpenTaskId(null)}
        members={members}
        projectId={projectId}
        onTaskUpdated={handleTaskUpdated}
        onTaskCommented={handleTaskCommented}
      />

      <CreateTaskDialog
        open={!!createInStatus}
        onOpenChange={(open) => !open && setCreateInStatus(null)}
        projectId={projectId}
        defaultStatus={createInStatus ?? TaskStatus.BACKLOG}
        members={members}
      />
    </>
  )
}
