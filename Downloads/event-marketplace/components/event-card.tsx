"use client"

import { Clock, Users, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/events-data"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface EventCardProps {
  event: Event
  onDetailsClick: (event: Event) => void
  delay?: number
}

export function EventCard({ event, onDetailsClick, delay = 0 }: EventCardProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })
  const getDaysUntil = () => {
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

  return (
    <div
      ref={ref}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
        transitionDelay: `${delay}ms`,
      }}
      onClick={() => onDetailsClick(event)}
    >
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
        <Badge className="absolute top-3 left-3 bg-orange-500 text-white border-0 gap-1">
          <Flame className="w-3 h-3" />
          Промо
        </Badge>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {/* Title */}
        <h3 className="text-white text-xl font-bold mb-3 line-clamp-2">
          {event.title}
        </h3>

        {/* Info Items */}
        <div className="space-y-1.5 text-white/90 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-white/70" />
            <span>{getDaysUntil()} · {event.time}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-white/70" />
              <span>{event.currentAttendees}/{event.maxAttendees}</span>
            </div>
            <span className="font-semibold text-white">
              {event.isFree ? "Бесплатно" : `${event.price.toLocaleString("ru-RU")} ₽`}
            </span>
          </div>
        </div>

        {/* Button */}
        <Button
          variant="outline"
          className="w-full bg-white text-black border-white hover:bg-white/90 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation()
            onDetailsClick(event)
          }}
        >
          Узнать подробнее
        </Button>
      </div>
    </div>
  )
}
