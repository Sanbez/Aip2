"use client"

import { useState, useActionState } from "react"
import { useFormStatus } from "react-dom"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createProject } from "@/features/projects/actions"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Создаём…" : "Создать проект"}
    </Button>
  )
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 32)
}

export function CreateProjectDialog({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [slugEdited, setSlugEdited] = useState(false)

  const [state, formAction] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      return createProject({
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        description: (formData.get("description") as string) || undefined,
      })
    },
    null,
  )

  useEffect(() => {
    if (!slugEdited) setSlug(slugify(name))
  }, [name, slugEdited])

  useEffect(() => {
    if (state && "success" in state && state.success) {
      toast.success("Проект создан")
      setOpen(false)
      setName("")
      setSlug("")
      setSlugEdited(false)
      router.refresh()
      router.push(`/projects/${state.data.slug}/board`)
    } else if (state && "error" in state && state.error) {
      toast.error(state.error)
    }
  }, [state, router])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Новый проект</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="proj-name">Название *</Label>
            <Input
              id="proj-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Мой проект"
              autoFocus
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="proj-slug">URL-идентификатор</Label>
            <Input
              id="proj-slug"
              name="slug"
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugEdited(true) }}
              placeholder="my-project"
              pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
              required
            />
            <p className="text-[11px] text-muted-foreground">
              /projects/<span className="font-mono font-medium">{slug || "..."}</span>
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="proj-desc">Описание</Label>
            <Textarea
              id="proj-desc"
              name="description"
              placeholder="Кратко о проекте…"
              className="resize-none"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
