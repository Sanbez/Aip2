"use client"

import { Clock, Users, MapPin, Flame, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { Event } from "@/lib/events-data"
import { cn } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface EventCardFeaturedProps {
  event: Event
  onDetailsClick: (event: Event) => void
  priority?: boolean
  delay?: number
}

export function EventCardFeatured({ event, onDetailsClick, priority = false, delay = 0 }: EventCardFeaturedProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })
  const attendancePercent = Math.round((event.currentAttendees / event.maxAttendees) * 100)

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
      return `Через ${diffDays} дней`
    }
    if (lastDigit === 1) {
      return `Через ${diffDays} день`
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `Через ${diffDays} дня`
    }
    return `Через ${diffDays} дней`
  }

  const formatDate = () => {
    return new Date(event.date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    })
  }

  return (
    <div
      ref={ref}
      className={cn(
        "group relative rounded-3xl overflow-hidden cursor-pointer",
        "bg-gradient-to-br from-card to-card/80",
        "border border-border/50 hover:border-primary/30",
        "shadow-lg hover:shadow-2xl hover:shadow-primary/10",
        "transition-all duration-700",
        priority ? "min-h-[420px]" : "min-h-[380px]"
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
        transitionDelay: `${delay}ms`,
      }}
      onClick={() => onDetailsClick(event)}
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Multi-layer Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
        <div className="flex flex-wrap gap-2">
          {event.isPromo && (
            <Badge className="bg-orange-500 text-white border-0 gap-1.5 px-3 py-1.5 text-sm font-semibold shadow-lg">
              <Flame className="w-4 h-4" />
              Промо
            </Badge>
          )}
          {attendancePercent >= 80 && (
            <Badge className="bg-red-500/90 text-white border-0 gap-1.5 px-3 py-1.5 text-sm font-semibold shadow-lg backdrop-blur-sm">
              <TrendingUp className="w-4 h-4" />
              Популярное
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0 px-3 py-1.5">
            {event.category}
          </Badge>
        </div>

        {/* Price Tag */}
        <div className={cn(
          "px-4 py-2 rounded-full font-bold text-lg shadow-lg",
          event.isFree
            ? "bg-green-500 text-white"
            : "bg-white/95 text-foreground backdrop-blur-sm"
        )}>
          {event.isFree ? "Бесплатно" : `${event.price.toLocaleString("ru-RU")} ₽`}
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-10">
        {/* Title & Description */}
        <div className="mb-4">
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 line-clamp-2 drop-shadow-lg">
            {event.title}
          </h3>
          <p className="text-white/80 text-sm md:text-base line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-foreground bg-white rounded-xl px-3 py-2 shadow-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-medium">{formatDate()}</span>
              <span className="text-muted-foreground ml-1">· {event.time}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-foreground bg-white rounded-xl px-3 py-2 shadow-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{getDaysUntil()}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground bg-white rounded-xl px-3 py-2 shadow-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground bg-white rounded-xl px-3 py-2 shadow-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              <span className="font-medium">{event.currentAttendees}</span>
              <span className="text-muted-foreground">/{event.maxAttendees}</span>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/70 mb-1">
            <span>Заполненность</span>
            <span className={cn(
              attendancePercent >= 90 ? "text-red-400" : attendancePercent >= 70 ? "text-yellow-400" : "text-green-400"
            )}>
              {attendancePercent}%
            </span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                attendancePercent >= 90 ? "bg-red-500" : attendancePercent >= 70 ? "bg-yellow-500" : "bg-green-500"
              )}
              style={{ width: `${attendancePercent}%` }}
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between gap-4">
          {/* Participants Preview */}
          {event.participants && event.participants.length > 0 && (
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {event.participants.slice(0, 4).map((participant) => (
                  <Avatar key={participant.id} className="w-8 h-8 border-2 border-black/50">
                    <AvatarImage src={participant.avatar} alt={participant.name} />
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {participant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {event.currentAttendees > 4 && (
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border-2 border-black/50 flex items-center justify-center">
                    <span className="text-xs text-white font-medium">+{event.currentAttendees - 4}</span>
                  </div>
                )}
              </div>
              <span className="ml-3 text-sm text-white/70">уже идут</span>
            </div>
          )}

          {/* CTA Button */}
          <Button
            size="lg"
            className={cn(
              "rounded-full font-semibold shadow-lg",
              "bg-white text-black hover:bg-white/90",
              "transition-all duration-300 hover:scale-105"
            )}
            onClick={(e) => {
              e.stopPropagation()
              onDetailsClick(event)
            }}
          >
            Подробнее
          </Button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
      </div>
    </div>
  )
}
