"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Trash2, Share2, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { mockEvents, type Event } from "@/lib/events-data"
import { Badge } from "@/components/ui/badge"

// Mock favorite events (первые 4 события из списка)
const initialFavorites = mockEvents.slice(0, 4)

export default function FavoritesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<Event[]>(initialFavorites)

  const removeFromFavorites = (eventId: string) => {
    setFavorites((prev) => prev.filter((e) => e.id !== eventId))
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Избранное</h1>
            <p className="text-sm text-muted-foreground">{favorites.length} мероприятий</p>
          </div>
        </div>
        {favorites.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {favorites.map((event) => (
              <div
                key={event.id}
                className="group rounded-xl bg-card border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2">{event.category}</Badge>
                    <h3 className="text-lg font-bold text-white">{event.title}</h3>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/event/${event.id}`)
                      }}
                    >
                      <Share2 className="w-4 h-4 text-white" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-red-500/80"
                      onClick={() => removeFromFavorites(event.id)}
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.date)} в {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.currentAttendees} / {event.maxAttendees} участников</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="font-bold text-foreground">
                      {event.isFree ? (
                        <span className="text-green-600">Бесплатно</span>
                      ) : (
                        <span>{event.price} ₽</span>
                      )}
                    </div>
                    <Button onClick={() => router.push(`/event/${event.id}`)}>
                      Подробнее
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Список пуст</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Добавляйте мероприятия в избранное, чтобы не потерять их и быстро находить интересные события
            </p>
            <Link href="/">
              <Button>Перейти к мероприятиям</Button>
            </Link>
          </div>
        )}

        {/* Quick Stats */}
        {favorites.length > 0 && (
          <div className="mt-12 p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Ваши предпочтения</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-foreground">{favorites.length}</div>
                <div className="text-sm text-muted-foreground">В избранном</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-foreground">
                  {favorites.filter((e) => e.isFree).length}
                </div>
                <div className="text-sm text-muted-foreground">Бесплатных</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-foreground">
                  {new Set(favorites.map((e) => e.category)).size}
                </div>
                <div className="text-sm text-muted-foreground">Категорий</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-foreground">
                  {favorites.reduce((sum, e) => sum + (e.isFree ? 0 : e.price), 0)} ₽
                </div>
                <div className="text-sm text-muted-foreground">Общая стоимость</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
