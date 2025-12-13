"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { mockEvents, type Event } from "@/lib/events-data"
import { Badge } from "@/components/ui/badge"

const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
]

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

export default function AfishaPage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)) // December 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  const days = useMemo(() => {
    const result = []
    for (let i = 0; i < startOffset; i++) {
      result.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      result.push(i)
    }
    return result
  }, [startOffset, daysInMonth])

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockEvents.filter((event) => event.date === dateStr)
  }

  const eventsForSelectedDate = useMemo(() => {
    if (!selectedDate) return []
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    return mockEvents.filter((event) => event.date === dateStr)
  }, [selectedDate])

  const upcomingEvents = useMemo(() => {
    const now = new Date()
    return mockEvents
      .filter((event) => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)
  }, [])

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(year, month, day))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Афиша</h1>
            <p className="text-sm text-muted-foreground">Календарь мероприятий города</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {months[month]} {year}
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />
                  }

                  const dayEvents = getEventsForDay(day)
                  const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month
                  const hasEvents = dayEvents.length > 0

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`aspect-square rounded-lg p-1 transition-colors relative ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : hasEvents
                            ? "bg-primary/10 hover:bg-primary/20"
                            : "hover:bg-muted"
                      }`}
                    >
                      <span className="text-sm font-medium">{day}</span>
                      {hasEvents && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                          {dayEvents.slice(0, 3).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSelected ? "bg-primary-foreground" : "bg-primary"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Selected Date Events */}
            {selectedDate && (
              <div className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {selectedDate.getDate()} {months[selectedDate.getMonth()]}
                </h3>
                {eventsForSelectedDate.length > 0 ? (
                  <div className="space-y-3">
                    {eventsForSelectedDate.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => router.push(`/event/${event.id}`)}
                        className="w-full p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-foreground">{event.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                              <span>{event.time}</span>
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <Badge variant={event.isFree ? "secondary" : "default"}>
                            {event.isFree ? "Бесплатно" : `${event.price} ₽`}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Нет мероприятий на эту дату</p>
                )}
              </div>
            )}
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Ближайшие события</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => router.push(`/event/${event.id}`)}
                    className="w-full text-left group"
                  >
                    <div className="flex gap-3">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {event.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "short",
                          })}
                          {" · "}
                          {event.time}
                        </p>
                        <Badge variant="outline" className="mt-1">
                          {event.category}
                        </Badge>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Статистика</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Всего мероприятий</span>
                  <span className="font-semibold text-foreground">{mockEvents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">В этом месяце</span>
                  <span className="font-semibold text-foreground">
                    {mockEvents.filter((e) => {
                      const d = new Date(e.date)
                      return d.getMonth() === month && d.getFullYear() === year
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Бесплатных</span>
                  <span className="font-semibold text-foreground">
                    {mockEvents.filter((e) => e.isFree).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
