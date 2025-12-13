"use client"

import { EventCard } from "./event-card"
import { EventsTable } from "./events-table"
import type { Event } from "@/lib/events-data"

interface EventsGridProps {
  events: Event[]
  onEventClick: (event: Event) => void
  viewMode?: "grid" | "list"
}

export function EventsGrid({ events, onEventClick, viewMode = "grid" }: EventsGridProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Мероприятия не найдены</h3>
        <p className="text-muted-foreground max-w-md">Попробуйте изменить параметры поиска или сбросить фильтры</p>
      </div>
    )
  }

  if (viewMode === "list") {
    return <EventsTable events={events} onEventClick={onEventClick} />
  }

  // Все события отображаются в обычном размере в сетке
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {events.map((event, index) => (
        <EventCard
          key={event.id}
          event={event}
          onDetailsClick={onEventClick}
          delay={50 * (index % 10)}
        />
      ))}
    </div>
  )
}
