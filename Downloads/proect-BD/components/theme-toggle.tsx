"use client"

import { useEffect, useState } from "react"
import { MoonStar, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
  size?: "default" | "sm"
}

export function ThemeToggle({
  className,
  showLabel = true,
  size = "default",
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme !== "light" : true
  const label = isDark ? "Темная тема" : "Светлая тема"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-2.5 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur-md transition-colors hover:bg-background/95 hover:text-foreground",
        size === "default" ? "h-10" : "h-9 text-[13px]",
        className,
      )}
      aria-label={mounted ? `Включить ${isDark ? "светлую" : "темную"} тему` : "Переключить тему"}
      title={mounted ? `Включить ${isDark ? "светлую" : "темную"} тему` : "Переключить тему"}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-primary/12 text-primary transition-colors",
          size === "default" ? "h-7 w-7" : "h-6 w-6",
        )}
      >
        {isDark ? <MoonStar className="h-3.5 w-3.5" /> : <SunMedium className="h-3.5 w-3.5" />}
      </span>
      {showLabel && <span>{mounted ? label : "Тема"}</span>}
    </button>
  )
}
