"use client"

import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { TaskStatus, TaskPriority } from "@/lib/enums"
import { toast } from "sonner"
import { Send, Trash2 } from "lucide-react"
import { updateTask, deleteTask } from "@/features/tasks/actions"
import { createComment } from "@/features/comments/actions"
import { type MemberOption, COLUMN_LABELS, PRIORITY_LABELS } from "@/features/tasks/types"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { StatusIcon } from "@/components/board/status-icon"

const STATUS_TO_ICON: Record<TaskStatus, string> = {
  BACKLOG: "backlog", TODO: "todo", IN_PROGRESS: "in_progress", REVIEW: "in_review", DONE: "done",
}

type FullTask = {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  dueDate: string | null
  assignee: { id: string; name: string | null; avatarUrl: string | null } | null
  comments: Array<{
    id: string
    content: string
    createdAt: string
    author: { id: string; name: string | null; avatarUrl: string | null }
    replies: Array<{
      id: string
      content: string
      createdAt: string
      author: { id: string; name: string | null; avatarUrl: string | null }
    }>
  }>
}

const STATUSES: TaskStatus[] = [TaskStatus.BACKLOG, TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.REVIEW, TaskStatus.DONE]
const PRIORITIES: TaskPriority[] = [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH, TaskPriority.URGENT]

type Props = {
  taskId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  members: MemberOption[]
  projectId: string
  onTaskUpdated?: (taskId: string, patch: Partial<{ priority: TaskPriority; status: TaskStatus; assigneeId: string | null; assignee: { id: string; name: string | null; avatarUrl: string | null } | null; commentCount: number }>) => void
  onTaskCommented?: (taskId: string, nextCommentCount: number) => void
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

export function TaskDetailSheet({ taskId, open, onOpenChange, members, projectId, onTaskUpdated, onTaskCommented }: Props) {
  const router = useRouter()
  const [task, setTask] = useState<FullTask | null>(null)
  const [loading, setLoading] = useState(false)
  const [editingTitle, setEditingTitle] = useState(false)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [commentPending, setCommentPending] = useState(false)
  const [, startTransition] = useTransition()

  async function loadTask(id: string) {
    const response = await fetch(`/api/tasks/${id}`, { cache: "no-store" })
    if (!response.ok) throw new Error("Не удалось загрузить задачу")
    return response.json() as Promise<FullTask>
  }

  useEffect(() => {
    if (!open || !taskId) { setTask(null); return }
    setLoading(true)
    loadTask(taskId)
      .then((data) => { setTask(data); setTitle(data.title) })
      .catch(() => toast.error("Не удалось загрузить задачу"))
      .finally(() => setLoading(false))
  }, [open, taskId])

  async function handleUpdateField(field: Partial<{ status: TaskStatus; priority: TaskPriority; assigneeId: string | null }>) {
    if (!task) return
    const result = await updateTask({ id: task.id, ...field })
    if (result.success) {
      // Build assignee patch if assigneeId changed
      let assigneePatch: { assignee: FullTask["assignee"] } | undefined
      if ("assigneeId" in field) {
        if (field.assigneeId === null) {
          assigneePatch = { assignee: null }
        } else {
          const m = members.find((m) => m.id === field.assigneeId)
          assigneePatch = { assignee: m ? { id: m.id, name: m.name, avatarUrl: m.avatarUrl } : null }
        }
      }
      const patch = { ...field, ...(assigneePatch ?? {}) }
      setTask((prev) => prev ? { ...prev, ...patch } : prev)
      onTaskUpdated?.(task.id, patch)
      router.refresh()
    } else {
      toast.error(result.error)
    }
  }

  async function handleSaveTitle() {
    if (!task || title === task.title) { setEditingTitle(false); return }
    const result = await updateTask({ id: task.id, title })
    if (result.success) { setTask((prev) => prev ? { ...prev, title } : prev); router.refresh() }
    else toast.error(result.error)
    setEditingTitle(false)
  }

  async function handleDeleteTask() {
    if (!task || !confirm("Удалить задачу?")) return
    const result = await deleteTask({ id: task.id })
    if (result.success) { toast.success("Задача удалена"); onOpenChange(false); router.refresh() }
    else toast.error(result.error)
  }

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault()
    if (!task || !comment.trim() || commentPending) return
    setCommentPending(true)
    const result = await createComment({ taskId: task.id, content: comment.trim() })
    if (result.success) {
      setComment("")
      try {
        const nextTask = await loadTask(task.id)
        setTask(nextTask)
        onTaskCommented?.(task.id, nextTask.comments.length)
        toast.success("Комментарий добавлен")
      } catch {
        toast.error("Комментарий добавлен, но не удалось обновить задачу")
      }
    } else {
      toast.error(result.error)
    }
    setCommentPending(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col overflow-hidden bg-background p-0 sm:max-w-xl">
        {/* Always-present title for screen readers (Radix accessibility requirement) */}
        <SheetTitle className="sr-only">{task?.title ?? "Детали задачи"}</SheetTitle>

        {loading && (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            Загрузка…
          </div>
        )}

        {task && !loading && (
          <>
            <SheetHeader className="border-b border-border px-6 py-4 text-left">
              <div className="flex items-center gap-2">
                <StatusIcon
                  status={STATUS_TO_ICON[task.status] as Parameters<typeof StatusIcon>[0]["status"]}
                  className="shrink-0"
                />
                <SheetTitle
                  aria-hidden
                  className={editingTitle ? "hidden" : "flex-1 cursor-pointer text-pretty text-[18px] font-semibold leading-tight"}
                  onClick={() => setEditingTitle(true)}
                >
                  {task.title}
                </SheetTitle>
                {editingTitle && (
                  <Textarea
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSaveTitle}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSaveTitle())}
                    className="flex-1 resize-none text-[18px] font-semibold"
                    rows={2}
                  />
                )}
                <button onClick={handleDeleteTask} className="ml-auto text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </SheetHeader>

            <div className="flex flex-1 flex-col overflow-y-auto">
              {/* Properties */}
              <div className="space-y-3 px-6 py-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Статус</p>
                    <Select
                      value={task.status}
                      onValueChange={(v) => handleUpdateField({ status: v as TaskStatus })}
                    >
                      <SelectTrigger className="h-8 text-[13px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>{COLUMN_LABELS[s]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Приоритет</p>
                    <Select
                      value={task.priority}
                      onValueChange={(v) => handleUpdateField({ priority: v as TaskPriority })}
                    >
                      <SelectTrigger className="h-8 text-[13px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PRIORITIES.map((p) => (
                          <SelectItem key={p} value={p}>{PRIORITY_LABELS[p]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {members.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Исполнитель</p>
                    <Select
                      value={task.assignee?.id ?? "__none"}
                      onValueChange={(v) =>
                        handleUpdateField({ assigneeId: v === "__none" ? null : v })
                      }
                    >
                      <SelectTrigger className="h-8 text-[13px]">
                        <SelectValue placeholder="Не назначен" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none">Не назначен</SelectItem>
                        {members.map((m) => (
                          <SelectItem key={m.id} value={m.id}>{m.name ?? m.email}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {task.description && (
                  <div className="space-y-1">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Описание</p>
                    <p className="text-[13px] leading-relaxed text-foreground/80">{task.description}</p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Comments */}
              <div className="flex flex-1 flex-col gap-3 px-6 py-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Комментарии ({task.comments.length})
                </p>

                <div className="flex-1 space-y-3">
                  {task.comments.length === 0 && (
                    <p className="text-[13px] text-muted-foreground">Нет комментариев. Будьте первым!</p>
                  )}
                  {task.comments.map((c) => (
                    <div key={c.id} className="flex gap-2.5">
                      <Avatar name={c.author.name} avatarUrl={c.author.avatarUrl} />
                      <div className="flex-1 rounded-lg border border-border bg-card/50 px-3 py-2">
                        <p className="text-[12px] font-medium">{c.author.name ?? "Пользователь"}</p>
                        <p className="mt-0.5 text-[13px] leading-relaxed">{c.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddComment} className="flex gap-2">
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Написать комментарий…"
                    className="resize-none"
                    rows={2}
                    disabled={commentPending}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleAddComment(e as unknown as React.FormEvent)
                      }
                    }}
                  />
                  <Button type="submit" size="icon" variant="outline" className="self-end" disabled={commentPending}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
