"use client"

import { Clock, Users, MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Event } from "@/lib/events-data"

interface EventsTableProps {
  events: Event[]
  onEventClick: (event: Event) => void
}

export function EventsTable({ events, onEventClick }: EventsTableProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    })
  }

  const getAttendanceStatus = (current: number, max: number) => {
    const percent = Math.round((current / max) * 100)
    if (percent >= 90) return { label: "Почти заполнено", variant: "destructive" as const }
    if (percent >= 70) return { label: "Востребовано", variant: "default" as const }
    return { label: "Доступно", variant: "secondary" as const }
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px]">Мероприятие</TableHead>
            <TableHead>Дата и время</TableHead>
            <TableHead>Место</TableHead>
            <TableHead>Участники</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead className="text-right">Действие</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => {
            const status = getAttendanceStatus(event.currentAttendees, event.maxAttendees)
            return (
              <TableRow
                key={event.id}
                className="cursor-pointer"
                onClick={() => onEventClick(event)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground truncate max-w-[180px]">
                          {event.title}
                        </span>
                        {event.isPromo && (
                          <Badge variant="default" className="bg-orange-500 text-xs">
                            Promo
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground max-w-[150px]">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-foreground font-medium">
                        {event.currentAttendees}/{event.maxAttendees}
                      </span>
                    </div>
                    <Badge variant={status.variant} className="text-xs w-fit">
                      {status.label}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-foreground">
                    {event.isFree ? (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                        Бесплатно
                      </Badge>
                    ) : (
                      `${event.price.toLocaleString("ru-RU")} ₽`
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick(event)
                    }}
                  >
                    Подробнее
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
