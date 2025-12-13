"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, Clock, Users, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/events-data"

interface EventsCarouselProps {
  events: Event[]
  onEventClick: (event: Event) => void
}

export function EventsCarousel({ events, onEventClick }: EventsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const getDaysUntil = (event: Event) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const eventDate = new Date(event.date)
    eventDate.setHours(0, 0, 0, 0)
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Сегодня"
    if (diffDays === 1) return "Завтра"
    if (diffDays < 0) return "Прошло"

    const lastDigit = diffDays % 10
    const lastTwoDigits = diffDays % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${diffDays} дней`
    }
    if (lastDigit === 1) {
      return `${diffDays} день`
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${diffDays} дня`
    }
    return `${diffDays} дней`
  }

  if (events.length === 0) return null

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Рекомендуем</h2>
          <p className="text-muted-foreground mt-1">Популярные мероприятия недели</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full border-border hover:bg-accent bg-transparent"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full border-border hover:bg-accent"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="flex-shrink-0 w-[calc((100%-72px)/6)] min-w-[160px] cursor-pointer group"
            onClick={() => onEventClick(event)}
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
              {/* Background Image */}
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

              {/* Promo Badge */}
              {event.isPromo && (
                <Badge className="absolute top-2 left-2 bg-orange-500 text-white border-0 gap-1 text-[10px] px-1.5 py-0.5">
                  <Flame className="w-2.5 h-2.5" />
                  Промо
                </Badge>
              )}

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                {/* Title */}
                <h3 className="text-white text-sm font-bold mb-2 line-clamp-2">
                  {event.title}
                </h3>

                {/* Info Items */}
                <div className="space-y-1 text-white/90 text-[11px] mb-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-white/70" />
                    <span>{getDaysUntil(event)} · {event.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-white/70" />
                      <span>{event.currentAttendees}/{event.maxAttendees}</span>
                    </div>
                    <span className="font-semibold text-white text-[11px]">
                      {event.isFree ? "Бесплатно" : `${event.price.toLocaleString("ru-RU")} ₽`}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-7 bg-white text-black border-white hover:bg-white/90 transition-all duration-300 text-[11px]"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEventClick(event)
                  }}
                >
                  Подробнее
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
