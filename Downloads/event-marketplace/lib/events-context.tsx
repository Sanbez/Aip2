"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import { Event, mockEvents } from "./events-data"

export interface EventPins {
  isPromo?: boolean
  isFeatured?: boolean
  isExclusive?: boolean
  isNew?: boolean
}

interface EventsContextType {
  events: Event[]
  addEvent: (event: Omit<Event, 'id' | 'status' | 'createdAt'>) => void
  updateEvent: (id: string, updates: Partial<Event>) => void
  deleteEvent: (id: string) => void
  approveEvent: (id: string, pins: EventPins, comment?: string) => void
  rejectEvent: (id: string, comment: string) => void
  archiveOldEvents: () => void
  getEventsByStatus: (status: Event['status']) => Event[]
  getPendingCount: () => number
  getApprovedCount: () => number
  getRejectedCount: () => number
  getArchivedCount: () => number
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

const STORAGE_KEY = "event-marketplace-events"

// Генерация уникального ID
const generateId = () => `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([])
  const [mounted, setMounted] = useState(false)

  // Загрузка событий из localStorage
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored && stored.length > 0) {
      try {
        const parsedEvents = JSON.parse(stored)
        setEvents(parsedEvents)
      } catch (error) {
        console.error("Error loading events from localStorage:", error)
        // Если ошибка парсинга, используем моки
        setEvents(mockEvents)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEvents))
      }
    } else {
      // Первый запуск - используем mockEvents
      setEvents(mockEvents)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEvents))
    }
  }, [])

  // Сохранение в localStorage при изменении
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
    }
  }, [events, mounted])

  // Добавление нового мероприятия
  const addEvent = useCallback((eventData: Omit<Event, 'id' | 'status' | 'createdAt'>) => {
    const newEvent: Event = {
      ...eventData,
      id: generateId(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      currentAttendees: eventData.currentAttendees || 0,
    }
    setEvents(prev => [...prev, newEvent])
  }, [])

  // Обновление мероприятия
  const updateEvent = useCallback((id: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(event =>
      event.id === id ? { ...event, ...updates } : event
    ))
  }, [])

  // Удаление мероприятия
  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id))
  }, [])

  // Одобрение мероприятия с установкой пинов
  const approveEvent = useCallback((id: string, pins: EventPins, comment?: string) => {
    const moderatorId = localStorage.getItem("userId") || "unknown"
    const moderatorName = localStorage.getItem("userName") || "Администратор"

    setEvents(prev => prev.map(event =>
      event.id === id
        ? {
            ...event,
            status: 'approved' as const,
            ...pins,
            moderationComment: comment,
            moderatedAt: new Date().toISOString(),
            moderatedBy: `${moderatorName} (${moderatorId})`,
          }
        : event
    ))
  }, [])

  // Отклонение мероприятия
  const rejectEvent = useCallback((id: string, comment: string) => {
    const moderatorId = localStorage.getItem("userId") || "unknown"
    const moderatorName = localStorage.getItem("userName") || "Администратор"

    setEvents(prev => prev.map(event =>
      event.id === id
        ? {
            ...event,
            status: 'rejected' as const,
            moderationComment: comment,
            moderatedAt: new Date().toISOString(),
            moderatedBy: `${moderatorName} (${moderatorId})`,
          }
        : event
    ))
  }, [])

  // Архивация прошедших мероприятий
  const archiveOldEvents = useCallback(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0) // Начало текущего дня

    setEvents(prev => prev.map(event => {
      const eventDate = new Date(event.date)
      eventDate.setHours(0, 0, 0, 0)

      // Архивируем только approved события, которые уже прошли
      if (event.status === 'approved' && eventDate < now) {
        return {
          ...event,
          status: 'archived' as const,
          moderatedAt: new Date().toISOString(),
        }
      }
      return event
    }))
  }, [])

  // Получение событий по статусу
  const getEventsByStatus = useCallback((status: Event['status']) => {
    return events.filter(event => event.status === status)
  }, [events])

  // Счетчики по статусам
  const getPendingCount = useCallback(() => {
    return events.filter(event => event.status === 'pending').length
  }, [events])

  const getApprovedCount = useCallback(() => {
    return events.filter(event => event.status === 'approved').length
  }, [events])

  const getRejectedCount = useCallback(() => {
    return events.filter(event => event.status === 'rejected').length
  }, [events])

  const getArchivedCount = useCallback(() => {
    return events.filter(event => event.status === 'archived').length
  }, [events])

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        approveEvent,
        rejectEvent,
        archiveOldEvents,
        getEventsByStatus,
        getPendingCount,
        getApprovedCount,
        getRejectedCount,
        getArchivedCount,
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventsContext)
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider")
  }
  return context
}
