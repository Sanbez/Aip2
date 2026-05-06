import type { Priority } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PriorityIconProps {
  priority: Priority
  className?: string
}

/** Linear-style monochrome priority bars (3 bars of increasing height). */
export function PriorityIcon({ priority, className }: PriorityIconProps) {
  if (priority === "urgent") {
    return (
      <svg
        viewBox="0 0 14 14"
        width="14"
        height="14"
        className={cn("text-foreground", className)}
        aria-hidden="true"
      >
        <rect x="6" y="2" width="2" height="7" rx="1" fill="currentColor" />
        <rect x="6" y="10.5" width="2" height="2" rx="1" fill="currentColor" />
      </svg>
    )
  }

  const active = priority === "high" ? 3 : priority === "medium" ? 2 : 1
  return (
    <svg
      viewBox="0 0 14 14"
      width="14"
      height="14"
      className={cn("text-muted-foreground", className)}
      aria-hidden="true"
    >
      <rect x="2" y="9" width="2.5" height="3.5" rx="0.6" fill={active >= 1 ? "currentColor" : "oklch(1 0 0 / 0.18)"} />
      <rect x="5.75" y="6" width="2.5" height="6.5" rx="0.6" fill={active >= 2 ? "currentColor" : "oklch(1 0 0 / 0.18)"} />
      <rect x="9.5" y="3" width="2.5" height="9.5" rx="0.6" fill={active >= 3 ? "currentColor" : "oklch(1 0 0 / 0.18)"} />
    </svg>
  )
}

export const priorityLabel: Record<Priority, string> = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
}
