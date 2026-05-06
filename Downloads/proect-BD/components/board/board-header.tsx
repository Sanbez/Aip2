"use client"

import { useState } from "react"
import {
  Calendar as CalendarIcon,
  ChevronRight,
  Filter,
  GanttChart,
  KanbanSquare,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react"
import type { Board } from "@/lib/types"
import { cn } from "@/lib/utils"
import { StatusIcon } from "./status-icon"

interface BoardHeaderProps {
  board: Board
  onCreateTask?: () => void
}

const views = [
  { id: "board", label: "Доска", icon: KanbanSquare },
  { id: "list", label: "Список", icon: List },
  { id: "timeline", label: "Таймлайн", icon: GanttChart },
] as const

type ViewId = (typeof views)[number]["id"]

const filterIds = ["filter", "priority", "assignee", "ai"] as const
type FilterId = (typeof filterIds)[number]

export function BoardHeader({ board, onCreateTask }: BoardHeaderProps) {
  const [activeView, setActiveView] = useState<ViewId>("board")
  const [starred, setStarred] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Set<FilterId>>(
    new Set(["priority", "assignee"]),
  )

  const toggleFilter = (id: FilterId) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const memberList = Object.values(board.members)
  const tasks = Object.values(board.tasks)
  const total = tasks.length
  const done = board.columns.find((c) => c.title.toLowerCase().includes("готов"))
  const doneCount = done?.taskIds.length ?? 0
  const inProgress = board.columns.find((c) =>
    c.title.toLowerCase().includes("работ"),
  )
  const inProgressCount = inProgress?.taskIds.length ?? 0
  const progressPct = total > 0 ? Math.round((doneCount / total) * 100) : 0

  return (
    <header className="border-b border-border">
      {/* Top row: breadcrumbs + meta */}
      <div className="flex items-center gap-2 px-5 pt-3">
        <nav
          aria-label="Хлебные крошки"
          className="flex min-w-0 flex-1 items-center gap-1 text-[12px] text-muted-foreground"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded bg-foreground text-[8px] font-bold text-background">
            АС
          </span>
          <button
            type="button"
            className="truncate hover:text-foreground"
            onClick={() => console.log("[v0] Workspace clicked")}
          >
            Acme Studio
          </button>
          <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
          <button
            type="button"
            className="truncate hover:text-foreground"
            onClick={() => console.log("[v0] Projects clicked")}
          >
            Проекты
          </button>
          <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="truncate font-medium text-foreground">{board.name}</span>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={starred ? "Убрать из избранного" : "В избранное"}
            aria-pressed={starred}
            onClick={() => setStarred((v) => !v)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-accent",
              starred ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Star
              className={cn("h-3.5 w-3.5", starred && "fill-current")}
            />
          </button>
          <button
            type="button"
            aria-label="Настройки доски"
            onClick={() => console.log("[v0] Board settings opened")}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Title row */}
      <div className="flex flex-wrap items-end justify-between gap-3 px-5 pt-2 pb-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-foreground/[0.04] font-mono text-[11px] font-semibold tracking-tight text-foreground/80">
            FW
          </span>
          <div className="min-w-0">
            <h1 className="text-pretty text-[19px] font-semibold leading-tight tracking-tight">
              {board.name}
            </h1>
            {board.description && (
              <p className="text-pretty text-[12.5px] leading-snug text-muted-foreground">
                {board.description}
              </p>
            )}
          </div>
        </div>

        {/* Avatars + actions */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center sm:flex">
            <div className="flex -space-x-1.5">
              {memberList.slice(0, 4).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  title={m.name}
                  onClick={() => console.log("[v0] Member clicked:", m.name)}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-background bg-foreground/10 text-[9.5px] font-medium text-foreground/90 transition-transform hover:z-10 hover:scale-110"
                >
                  {m.initials}
                </button>
              ))}
              {memberList.length > 4 && (
                <button
                  type="button"
                  onClick={() => console.log("[v0] More members clicked")}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-background bg-foreground/[0.06] font-mono text-[9px] tnum text-muted-foreground"
                >
                  +{memberList.length - 4}
                </button>
              )}
            </div>
            <button
              type="button"
              aria-label="Пригласить участников"
              onClick={() => console.log("[v0] Invite clicked")}
              className="ml-2 inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[12px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Users className="h-3 w-3" />
              Пригласить
            </button>
          </div>

          <button
            type="button"
            onClick={onCreateTask}
            className="inline-flex h-7 items-center gap-1.5 rounded-md bg-foreground px-2.5 text-[12.5px] font-medium text-background transition-colors hover:bg-foreground/90"
          >
            <Plus className="h-3.5 w-3.5" />
            Новая задача
            <kbd className="ml-1 rounded border border-background/20 bg-background/10 px-1 font-mono text-[10px] tnum">
              C
            </kbd>
          </button>
        </div>
      </div>

      {/* Insight strip */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border bg-foreground/[0.015] px-5 py-2">
        <Stat label="Всего" value={total} />
        <Stat
          label="В работе"
          value={inProgressCount}
          icon={<StatusIcon status="in_progress" />}
        />
        <Stat
          label="Готово"
          value={doneCount}
          icon={<StatusIcon status="done" />}
        />
        <div className="flex min-w-[160px] flex-1 items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Спринт 14
          </span>
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-foreground/[0.07]">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-foreground/80"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="font-mono text-[11px] tnum text-muted-foreground">
            {progressPct}%
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11.5px] text-muted-foreground">
          <CalendarIcon className="h-3 w-3" aria-hidden="true" />
          <span>До 12 мая</span>
        </div>
      </div>

      {/* View tabs + filter chips */}
      <div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-2">
        <div
          role="tablist"
          aria-label="Режим отображения"
          className="inline-flex items-center rounded-md border border-border bg-foreground/[0.02] p-0.5"
        >
          {views.map((v) => {
            const isActive = activeView === v.id
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveView(v.id)}
                className={cn(
                  "inline-flex h-6 items-center gap-1.5 rounded px-2 text-[12px] transition-colors",
                  isActive
                    ? "bg-foreground/[0.08] text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <v.icon className="h-3 w-3" />
                {v.label}
              </button>
            )
          })}
        </div>

        <div className="h-4 w-px bg-border" />

        <FilterChip
          active={activeFilters.has("filter")}
          onClick={() => toggleFilter("filter")}
        >
          <Filter className="h-3 w-3" />
          Фильтр
        </FilterChip>
        <FilterChip
          dotted
          active={activeFilters.has("priority")}
          onClick={() => toggleFilter("priority")}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
          Приоритет: <span className="text-foreground">высокий, срочный</span>
        </FilterChip>
        <FilterChip
          dotted
          active={activeFilters.has("assignee")}
          onClick={() => toggleFilter("assignee")}
        >
          Исполнитель: <span className="text-foreground">я</span>
        </FilterChip>
        <FilterChip
          active={activeFilters.has("ai")}
          onClick={() => toggleFilter("ai")}
        >
          <Sparkles className="h-3 w-3" />
          ИИ
        </FilterChip>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => console.log("[v0] Search opened")}
            className="hidden items-center gap-1.5 rounded-md border border-border bg-foreground/[0.02] px-2 py-1 text-[12px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
          >
            <Search className="h-3 w-3" />
            <span>Поиск</span>
            <kbd className="font-mono text-[10px] tnum text-muted-foreground/70">/</kbd>
          </button>
        </div>
      </div>
    </header>
  )
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-[12.5px] tnum font-medium text-foreground">
        {value}
      </span>
    </div>
  )
}

function FilterChip({
  children,
  dotted = false,
  active = false,
  onClick,
}: {
  children: React.ReactNode
  dotted?: boolean
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-md border px-2 text-[11.5px] transition-colors",
        dotted ? "border-dashed border-border" : "border-border bg-foreground/[0.02]",
        active
          ? "bg-foreground/[0.08] text-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}
