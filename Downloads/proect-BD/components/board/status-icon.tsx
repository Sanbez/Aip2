import { cn } from "@/lib/utils"

export type ColumnStatus = "backlog" | "todo" | "in_progress" | "in_review" | "done"

export function inferStatus(title: string): ColumnStatus {
  const t = title.toLowerCase()
  if (t.includes("backlog")) return "backlog"
  if (t.includes("review")) return "in_review"
  if (t.includes("progress") || t.includes("doing")) return "in_progress"
  if (t.includes("done") || t.includes("complete")) return "done"
  return "todo"
}

interface StatusIconProps {
  status: ColumnStatus
  className?: string
  /** Use slightly larger stroke for column headers */
  emphasis?: boolean
}

/**
 * Linear-inspired monochrome status glyphs.
 * Backlog: dashed ring. Todo: empty ring. In progress: 25% wedge.
 * In review: 75% wedge. Done: filled ring with check.
 */
export function StatusIcon({ status, className, emphasis = false }: StatusIconProps) {
  const stroke = emphasis ? 1.75 : 1.5
  const size = emphasis ? 14 : 12

  if (status === "backlog") {
    return (
      <svg
        viewBox="0 0 14 14"
        width={size}
        height={size}
        className={cn("text-muted-foreground", className)}
        aria-hidden="true"
      >
        <circle
          cx="7"
          cy="7"
          r="5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray="2 2"
        />
      </svg>
    )
  }

  if (status === "todo") {
    return (
      <svg
        viewBox="0 0 14 14"
        width={size}
        height={size}
        className={cn("text-muted-foreground", className)}
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth={stroke} />
      </svg>
    )
  }

  if (status === "in_progress") {
    return (
      <svg
        viewBox="0 0 14 14"
        width={size}
        height={size}
        className={cn("text-foreground", className)}
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth={stroke} />
        {/* 25% wedge */}
        <path d="M7 7 L7 1.5 A5.5 5.5 0 0 1 12.5 7 Z" fill="currentColor" />
      </svg>
    )
  }

  if (status === "in_review") {
    return (
      <svg
        viewBox="0 0 14 14"
        width={size}
        height={size}
        className={cn("text-foreground", className)}
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" strokeWidth={stroke} />
        {/* 75% wedge */}
        <path d="M7 7 L7 1.5 A5.5 5.5 0 1 1 1.5 7 Z" fill="currentColor" />
      </svg>
    )
  }

  // done
  return (
    <svg
      viewBox="0 0 14 14"
      width={size}
      height={size}
      className={cn("text-foreground", className)}
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="6" fill="currentColor" />
      <path
        d="M4.5 7.2 L6.3 9 L9.7 5.4"
        fill="none"
        stroke="var(--background)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
