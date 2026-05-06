"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { TaskStatus, TaskPriority } from "@/lib/enums"
import { toast } from "sonner"
import { createTask } from "@/features/tasks/actions"
import { type MemberOption, COLUMN_LABELS, PRIORITY_LABELS } from "@/features/tasks/types"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Создаём…" : "Создать задачу"}
    </Button>
  )
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  defaultStatus: TaskStatus
  members: MemberOption[]
}

const STATUSES: TaskStatus[] = [TaskStatus.BACKLOG, TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.REVIEW, TaskStatus.DONE]
const PRIORITIES: TaskPriority[] = [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH, TaskPriority.URGENT]

export function CreateTaskDialog({ open, onOpenChange, projectId, defaultStatus, members }: Props) {
  const [state, formAction] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      const result = await createTask({
        title: formData.get("title") as string,
        projectId,
        status: (formData.get("status") as TaskStatus) ?? defaultStatus,
        priority: (formData.get("priority") as TaskPriority) ?? "MEDIUM",
        assigneeId: (formData.get("assigneeId") as string) || undefined,
        description: (formData.get("description") as string) || undefined,
      })
      return result
    },
    null,
  )

  useEffect(() => {
    if (state && "success" in state && state.success) {
      toast.success("Задача создана")
      onOpenChange(false)
    } else if (state && "error" in state && state.error) {
      toast.error(state.error)
    }
  }, [state, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Новая задача</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Название *</Label>
            <Input id="title" name="title" placeholder="Что нужно сделать?" autoFocus required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="status">Статус</Label>
              <Select name="status" defaultValue={defaultStatus}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{COLUMN_LABELS[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="priority">Приоритет</Label>
              <Select name="priority" defaultValue="MEDIUM">
                <SelectTrigger id="priority">
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
            <div className="space-y-1.5">
              <Label htmlFor="assigneeId">Исполнитель</Label>
              <Select name="assigneeId">
                <SelectTrigger id="assigneeId">
                  <SelectValue placeholder="Не назначен" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name ?? m.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Детали задачи…"
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
