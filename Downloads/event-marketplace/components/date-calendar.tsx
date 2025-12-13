"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DateCalendarProps {
  selectedDate: string | null
  onDateSelect: (date: string | null) => void
  eventDates: string[]
}

const DAYS_TO_SHOW = 30
const RUSSIAN_MONTHS = [
  "янв", "фев", "мар", "апр", "май", "июн",
  "июл", "авг", "сен", "окт", "ноя", "дек"
]
const RUSSIAN_WEEKDAYS = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]

export function DateCalendar({ selectedDate, onDateSelect, eventDates }: DateCalendarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const dates = Array.from({ length: DAYS_TO_SHOW }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  const formatDateString = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const hasEvents = (date: Date) => {
    return eventDates.includes(formatDateString(date))
  }

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const scrollEl = scrollRef.current
    if (scrollEl) {
      scrollEl.addEventListener("scroll", checkScroll)
      return () => scrollEl.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (date: Date) => {
    return selectedDate === formatDateString(date)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative flex items-center gap-2">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 h-8 w-8 rounded-full border border-border bg-card",
            !canScrollLeft && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Scrollable Date Container */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* "All" button */}
          <button
            onClick={() => onDateSelect(null)}
            className={cn(
              "shrink-0 flex flex-col items-center justify-center px-3 py-1.5 rounded-lg border transition-all",
              "hover:border-primary/50 hover:bg-primary/5",
              selectedDate === null
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground"
            )}
          >
            <span className="text-[10px] font-medium uppercase">Все</span>
            <span className="text-sm font-bold">даты</span>
          </button>

          {dates.map((date) => {
            const dateStr = formatDateString(date)
            const hasEvent = hasEvents(date)
            const selected = isSelected(date)
            const today = isToday(date)

            return (
              <button
                key={dateStr}
                onClick={() => onDateSelect(selected ? null : dateStr)}
                className={cn(
                  "shrink-0 flex flex-col items-center justify-center w-12 py-1.5 rounded-lg border transition-all",
                  "hover:border-primary/50 hover:bg-primary/5",
                  selected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card",
                  !hasEvent && !selected && "opacity-50"
                )}
              >
                <span className={cn(
                  "text-[10px] uppercase",
                  selected ? "text-primary" : "text-muted-foreground"
                )}>
                  {RUSSIAN_WEEKDAYS[date.getDay()]}
                </span>
                <span className={cn(
                  "text-sm font-bold",
                  selected ? "text-primary" : "text-foreground"
                )}>
                  {date.getDate()}
                </span>
                <span className={cn(
                  "text-[10px]",
                  selected ? "text-primary" : "text-muted-foreground"
                )}>
                  {RUSSIAN_MONTHS[date.getMonth()]}
                </span>
                {hasEvent && (
                  <div className={cn(
                    "w-1 h-1 rounded-full mt-0.5",
                    selected ? "bg-primary" : "bg-primary/60"
                  )} />
                )}
                {today && !selected && (
                  <div className="absolute -bottom-0.5 w-4 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            )
          })}
        </div>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 h-8 w-8 rounded-full border border-border bg-card",
            !canScrollRight && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="mt-3 text-center">
          <span className="text-sm text-muted-foreground">
            Мероприятия на{" "}
            <span className="font-medium text-foreground">
              {new Date(selectedDate).toLocaleDateString("ru-RU", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </span>
          </span>
        </div>
      )}
    </div>
  )
}
