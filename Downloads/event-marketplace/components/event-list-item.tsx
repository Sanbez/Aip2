"use client"

import { Clock, Users, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/events-data"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface EventListItemProps {
  event: Event
  onDetailsClick: (event: Event) => void
  delay?: number
}

export function EventListItem({ event, onDetailsClick, delay = 0 }: EventListItemProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getLevel = () => {
    const attendancePercent = Math.round((event.currentAttendees / event.maxAttendees) * 100)
    if (attendancePercent >= 90) return "Популярное"
    if (attendancePercent >= 70) return "Востребованное"
    return "Доступное"
  }

  return (
    <div
      ref={ref}
      className="group relative flex flex-col sm:flex-row gap-4 rounded-xl overflow-hidden bg-card border border-border p-4 cursor-pointer hover:border-primary/50 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
        transitionDelay: `${delay}ms`,
      }}
      onClick={() => onDetailsClick(event)}
    >
      {/* Image */}
      <div className="relative w-full sm:w-48 h-32 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {event.isFree && (
          <Badge className="absolute top-2 left-2 bg-green-500 text-white">
            Бесплатно
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold text-foreground line-clamp-1">
              {event.title}
            </h3>
            <Badge variant="outline" className="flex-shrink-0">
              {event.category}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span className="truncate max-w-[200px]">{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{event.currentAttendees}/{event.maxAttendees} · {getLevel()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <span className="text-lg font-bold text-foreground">
            {event.isFree ? "Бесплатно" : `${event.price.toLocaleString("ru-RU")} руб.`}
          </span>
          <Button
            variant="default"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onDetailsClick(event)
            }}
          >
            Подробнее
          </Button>
        </div>
      </div>
    </div>
  )
}
