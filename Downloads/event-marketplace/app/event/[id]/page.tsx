"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Clock, Users, Calendar, Tag, Building, Share2, Heart, ChevronLeft, ChevronRight, Award, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEvents } from "@/lib/events-context"
import { cn } from "@/lib/utils"

export default function EventPage() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { events } = useEvents()

  const event = events.find((e) => e.id === params.id)

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Мероприятие не найдено</h1>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться назад
          </Button>
        </div>
      </div>
    )
  }

  const attendancePercent = Math.round((event.currentAttendees / event.maxAttendees) * 100)
  const images = event.images?.length ? event.images : [event.image]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-foreground truncate">{event.title}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Images and Controls */}
          <div className="lg:w-1/2 p-4 lg:p-6 space-y-4">
            {/* Main Image with Navigation */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Price Badge */}
              <Badge
                className={cn(
                  "absolute top-3 left-3 text-sm px-3 py-1",
                  event.isFree ? "bg-primary text-primary-foreground" : "bg-background/90 text-foreground backdrop-blur-sm",
                )}
              >
                {event.isFree ? "Бесплатно" : `${event.price.toLocaleString("ru-RU")} ₽`}
              </Badge>

              {/* Promo Badge */}
              {event.isPromo && (
                <Badge className="absolute top-3 right-12 bg-orange-500 text-white border-0 gap-1">
                  <Flame className="w-3 h-3" />
                  Промо
                </Badge>
              )}

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Image Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-colors",
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Participants Section */}
            {event.participants && event.participants.length > 0 && (
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground text-sm">Кто идёт</h4>
                  <span className="text-xs text-muted-foreground">{event.currentAttendees}/{event.maxAttendees}</span>
                </div>

                {/* Attendance Progress */}
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      attendancePercent >= 90 ? "bg-destructive" : attendancePercent >= 70 ? "bg-chart-4" : "bg-primary",
                    )}
                    style={{ width: `${attendancePercent}%` }}
                  />
                </div>

                {/* Participant Avatars */}
                <div className="flex flex-wrap gap-2">
                  {event.participants.map((participant) => (
                    <button
                      key={participant.id}
                      className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-background hover:bg-accent transition-colors"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback className="text-xs">{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">{participant.name}</span>
                    </button>
                  ))}
                  {event.currentAttendees > event.participants.length && (
                    <div className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-background">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">+{event.currentAttendees - event.participants.length}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Host Section */}
            {event.host && (
              <div className="p-4 rounded-xl bg-muted/50">
                <h4 className="font-semibold text-foreground text-sm mb-3">Ведущий</h4>
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={event.host.avatar} alt={event.host.name} />
                    <AvatarFallback>{event.host.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{event.host.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{event.host.description}</p>
                    <div className="flex items-center gap-1 mt-1.5 text-xs text-primary">
                      <Award className="w-3.5 h-3.5" />
                      <span>{event.host.eventsHosted} мероприятий проведено</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Info and Description */}
          <div className="lg:w-1/2 p-4 lg:p-6 lg:border-l border-border space-y-5">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold text-foreground">{event.title}</h2>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="outline" size="icon" className="rounded-full bg-transparent h-9 w-9">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-transparent h-9 w-9">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{event.category}</Badge>
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-muted-foreground">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Date/Time Alert */}
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Clock className="w-4 h-4" />
                <span>{getDaysUntil()}</span>
                <span className="text-muted-foreground">·</span>
                <span>{event.time}</span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Дата</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(event.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Users className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Участники</p>
                  <p className="text-sm font-medium text-foreground">
                    {event.currentAttendees}/{event.maxAttendees}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Описание</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{event.fullDescription}</p>
            </div>

            {/* Location Details */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Building className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{event.location}</p>
                <p className="text-sm text-muted-foreground">{event.address}</p>
                <p className="text-sm text-muted-foreground mt-1">Организатор: {event.organizer}</p>
              </div>
            </div>

            {/* Action Button */}
            <Button size="lg" className="w-full text-lg h-14">
              {event.isFree ? "Зарегистрироваться" : "Забронировать место"}
            </Button>
            {!event.isFree && (
              <p className="text-sm text-muted-foreground text-center">
                Оплата {event.price.toLocaleString("ru-RU")} ₽ производится на месте при входе на мероприятие
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
