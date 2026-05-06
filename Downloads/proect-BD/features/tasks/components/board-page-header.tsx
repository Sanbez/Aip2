"use client"

import Link from "next/link"
import { useState } from "react"
import { Activity, ChevronRight, Plus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateTaskDialog } from "./create-task-dialog"
import { TaskStatus } from "@/lib/enums"
import type { MemberOption } from "@/features/tasks/types"

type Props = {
  project: { id: string; name: string; slug: string; description: string | null }
  members: MemberOption[]
  taskCount: number
}

function Avatar({ name, avatarUrl }: { name: string | null; avatarUrl: string | null }) {
  const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() ?? "?"
  if (avatarUrl) return <img src={avatarUrl} alt={name ?? ""} className="h-6 w-6 rounded-full object-cover border border-background" />
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-background bg-foreground/10 text-[9px] font-medium">
      {initials}
    </span>
  )
}

export function BoardPageHeader({ project, members, taskCount }: Props) {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <>
      <header className="shrink-0 border-b border-border">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 px-5 pt-3 text-[12px] text-muted-foreground">
          <Link href="/projects" className="hover:text-foreground">Проекты</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="font-medium text-foreground">{project.name}</span>
        </div>

        {/* Title row */}
        <div className="flex flex-wrap items-end justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-foreground/[0.04] font-mono text-[11px] font-semibold uppercase text-foreground/80"
            >
              {project.name.slice(0, 2)}
            </div>
            <div>
              <h1 className="text-[19px] font-semibold leading-tight tracking-tight">{project.name}</h1>
              {project.description && (
                <p className="text-[12.5px] text-muted-foreground">{project.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {members.length > 0 && (
              <div className="flex -space-x-1.5">
                {members.slice(0, 5).map((m) => (
                  <Avatar key={m.id} name={m.name} avatarUrl={m.avatarUrl} />
                ))}
              </div>
            )}
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={`/projects/${project.slug}/activity` as any}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              title="Лог активности"
            >
              <Activity className="h-3.5 w-3.5" />
            </Link>
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={`/projects/${project.slug}/settings` as any}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              title="Настройки проекта"
            >
              <Settings className="h-3.5 w-3.5" />
            </Link>
            <Button size="sm" className="gap-1.5" onClick={() => setCreateOpen(true)}>
              <Plus className="h-3.5 w-3.5" />
              Задача
            </Button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-4 border-t border-border bg-foreground/[0.015] px-5 py-2 text-[11px]">
          <span className="text-muted-foreground">
            Задач: <span className="font-medium text-foreground">{taskCount}</span>
          </span>
          <span className="text-muted-foreground">
            Участников: <span className="font-medium text-foreground">{members.length}</span>
          </span>
        </div>
      </header>

      <CreateTaskDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        projectId={project.id}
        defaultStatus={TaskStatus.TODO}
        members={members}
      />
    </>
  )
}
