import type { LabelColor, Priority } from "@/lib/types"

/**
 * Monochrome label chips. Differentiated by tone (foreground intensity)
 * and a small leading dot — all in white-on-dark variations.
 */
export const labelChipClasses: Record<LabelColor, string> = {
  indigo:
    "bg-foreground/[0.07] text-foreground/90 border-foreground/10",
  amber:
    "bg-foreground/[0.05] text-foreground/80 border-foreground/10",
  emerald:
    "bg-foreground/[0.05] text-foreground/80 border-foreground/10",
  rose:
    "bg-foreground/[0.07] text-foreground/90 border-foreground/10",
  slate:
    "bg-foreground/[0.04] text-muted-foreground border-foreground/10",
  sky:
    "bg-foreground/[0.05] text-foreground/80 border-foreground/10",
}

/** Tiny leading dot intensity per label "color" — kept monochrome. */
export const labelDotClasses: Record<LabelColor, string> = {
  indigo: "bg-foreground",
  amber: "bg-foreground/80",
  emerald: "bg-foreground/65",
  rose: "bg-foreground/55",
  slate: "bg-muted-foreground",
  sky: "bg-foreground/45",
}

export const priorityConfig: Record<
  Priority,
  { label: string; tone: string }
> = {
  urgent: { label: "Срочный", tone: "text-foreground" },
  high: { label: "Высокий", tone: "text-foreground" },
  medium: { label: "Средний", tone: "text-foreground/80" },
  low: { label: "Низкий", tone: "text-muted-foreground" },
}

export function formatDueDate(iso?: string): {
  label: string
  tone: "default" | "soon" | "overdue"
} {
  if (!iso) return { label: "", tone: "default" }
  const due = new Date(iso)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffDays = Math.round(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  )
  const fmt = new Intl.DateTimeFormat("ru-RU", {
    month: "short",
    day: "numeric",
  }).format(due)
  if (diffDays < 0) return { label: fmt, tone: "overdue" }
  if (diffDays === 0) return { label: "Сегодня", tone: "soon" }
  if (diffDays === 1) return { label: "Завтра", tone: "soon" }
  if (diffDays <= 3) return { label: fmt, tone: "soon" }
  return { label: fmt, tone: "default" }
}
