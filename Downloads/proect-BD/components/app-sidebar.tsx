"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CheckSquare, ChevronDown, ChevronRight, Layers, LogOut, Plus, Search, Zap } from "lucide-react"
import { signOut } from "next-auth/react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

type Project = { id: string; name: string; slug: string; color: string; taskCount: number }
type User = { id: string; name: string | null; email: string | null; avatarUrl: string | null }

interface AppSidebarProps {
  projects: Project[]
  user: User
}

function Section({
  label,
  children,
  defaultOpen = true,
  action,
}: {
  label: string
  children: React.ReactNode
  defaultOpen?: boolean
  action?: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="px-2 py-1">
      <div className="flex items-center gap-1 px-1.5 py-1">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-1 items-center gap-1 text-[10.5px] font-semibold uppercase tracking-widest text-sidebar-foreground/30 hover:text-sidebar-foreground/55 transition-colors"
        >
          {open
            ? <ChevronDown className="h-2.5 w-2.5" />
            : <ChevronRight className="h-2.5 w-2.5" />}
          {label}
        </button>
        {action}
      </div>
      {open && <div className="mt-0.5 flex flex-col gap-px">{children}</div>}
    </div>
  )
}

export function AppSidebar({ projects, user }: AppSidebarProps) {
  const pathname = usePathname()

  const initials = user.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.slice(0, 2).toUpperCase() ?? "?"

  return (
    <aside className="sidebar-surface hidden w-[248px] shrink-0 flex-col overflow-hidden border-r border-sidebar-border lg:flex">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 pb-3 pt-4">
        <div className="grd-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-lg shadow-md"
          style={{ boxShadow: "0 0 14px oklch(0.67 0.24 285 / 0.4)" }}>
          <Zap className="h-3.5 w-3.5 text-white" />
        </div>
        <p className="flex-1 truncate text-[13.5px] font-semibold tracking-tight text-sidebar-foreground">
          Flowboard
        </p>
      </div>

      {/* Search */}
      <div className="px-3 pb-2.5">
        <button
          type="button"
          className="flex h-8 w-full items-center gap-2.5 rounded-lg border border-sidebar-border bg-sidebar-accent/75 px-2.5 text-[12.5px] text-sidebar-foreground/45 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground/70"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1 text-left">Поиск…</span>
          <kbd className="font-mono text-[10px] tnum text-sidebar-foreground/30">⌘K</kbd>
        </button>
      </div>

      {/* Nav links */}
      <div className="px-2 pb-2 space-y-px">
        <Link
          href="/projects"
          className={cn(
            "flex h-8 w-full items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium transition-all",
            pathname === "/projects"
              ? "bg-sidebar-accent text-sidebar-foreground shadow-sm"
              : "text-sidebar-foreground/55 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground/85",
          )}
        >
          <Layers className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 truncate">Все проекты</span>
          {projects.length > 0 && (
            <span className="rounded-md bg-sidebar-accent px-1.5 py-0.5 font-mono text-[10px] tnum text-sidebar-foreground/45">
              {projects.length}
            </span>
          )}
        </Link>
        <Link
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          href={"/tasks" as any}
          className={cn(
            "flex h-8 w-full items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium transition-all",
            pathname === "/tasks"
              ? "bg-sidebar-accent text-sidebar-foreground shadow-sm"
              : "text-sidebar-foreground/55 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground/85",
          )}
        >
          <CheckSquare className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 truncate">Мои задачи</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-3 my-0.5 h-px bg-sidebar-border" />

      {/* Projects list */}
      <div className="flex-1 overflow-y-auto py-1">
        <Section
          label="Проекты"
          action={
            <Link
              href="/projects"
              aria-label="Создать проект"
              className="rounded-md p-1 text-sidebar-foreground/30 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground/70"
            >
              <Plus className="h-3 w-3" />
            </Link>
          }
        >
          {projects.length === 0 && (
            <p className="px-2 py-2 text-[12px] text-sidebar-foreground/35">Нет проектов</p>
          )}
          {projects.map((p) => {
            const isActive = pathname.startsWith(`/projects/${p.slug}`)
            return (
              <Link
                key={p.id}
                href={`/projects/${p.slug}/board`}
                className={cn(
                  "group flex h-8 w-full items-center gap-2.5 rounded-lg px-2.5 text-[13px] transition-all",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-sidebar-foreground/55 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground/85",
                )}
              >
                <span
                  className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md text-[8px] font-bold uppercase"
                  style={{
                    background: p.color + "22",
                    color: p.color,
                    boxShadow: isActive ? `0 0 8px ${p.color}44` : "none",
                  }}
                >
                  {p.name.slice(0, 2)}
                </span>
                <span className="flex-1 truncate">{p.name}</span>
                <span className="font-mono text-[10px] tnum text-sidebar-foreground/35 group-hover:text-sidebar-foreground/55">
                  {p.taskCount}
                </span>
              </Link>
            )
          })}
        </Section>
      </div>

      {/* User footer */}
      <div className="border-t border-sidebar-border p-2">
        <ThemeToggle
          size="sm"
          className="mb-2 w-full justify-between rounded-lg border-sidebar-border bg-sidebar-accent/80 px-2.5 text-sidebar-foreground hover:bg-sidebar-accent"
        />

        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-sidebar-accent/70">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="" className="h-6 w-6 rounded-full object-cover ring-1 ring-sidebar-border" />
          ) : (
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
              style={{ background: "linear-gradient(135deg, oklch(0.67 0.24 285), oklch(0.60 0.22 240))" }}
            >
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-medium text-sidebar-foreground">{user.name ?? user.email}</p>
            <p className="truncate text-[10.5px] text-sidebar-foreground/35">{user.email}</p>
          </div>
          <button
            type="button"
            title="Выйти"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="rounded-md p-1.5 text-sidebar-foreground/35 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground/70"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
