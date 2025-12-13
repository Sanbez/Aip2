"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"

export interface ModerationLog {
  id: string
  eventId: string
  eventTitle: string
  action: "approve" | "reject" | "delete" | "edit"
  moderatorId: string
  moderatorName: string
  comment?: string
  pins?: {
    isPromo?: boolean
    isFeatured?: boolean
    isExclusive?: boolean
    isNew?: boolean
  }
  timestamp: string
}

interface ModerationLogsContextType {
  logs: ModerationLog[]
  addLog: (log: Omit<ModerationLog, "id" | "timestamp">) => void
  getLogsByEventId: (eventId: string) => ModerationLog[]
  getLogsByModerator: (moderatorId: string) => ModerationLog[]
  getRecentLogs: (limit?: number) => ModerationLog[]
  clearOldLogs: (daysToKeep?: number) => void
}

const ModerationLogsContext = createContext<ModerationLogsContextType | undefined>(undefined)

const STORAGE_KEY = "event-marketplace-moderation-logs"

// Генерация уникального ID
const generateId = () => `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

export function ModerationLogsProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<ModerationLog[]>([])
  const [mounted, setMounted] = useState(false)

  // Загрузка логов из localStorage
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsedLogs = JSON.parse(stored)
        setLogs(parsedLogs)
      } catch (error) {
        console.error("Error loading moderation logs:", error)
        setLogs([])
      }
    }
  }, [])

  // Сохранение в localStorage при изменении
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
    }
  }, [logs, mounted])

  // Добавление нового лога
  const addLog = useCallback((logData: Omit<ModerationLog, "id" | "timestamp">) => {
    const newLog: ModerationLog = {
      ...logData,
      id: generateId(),
      timestamp: new Date().toISOString(),
    }
    setLogs(prev => [newLog, ...prev]) // Новые логи в начале
  }, [])

  // Получение логов по ID мероприятия
  const getLogsByEventId = useCallback((eventId: string) => {
    return logs.filter(log => log.eventId === eventId)
  }, [logs])

  // Получение логов по модератору
  const getLogsByModerator = useCallback((moderatorId: string) => {
    return logs.filter(log => log.moderatorId === moderatorId)
  }, [logs])

  // Получение недавних логов
  const getRecentLogs = useCallback((limit: number = 50) => {
    return logs.slice(0, limit)
  }, [logs])

  // Очистка старых логов
  const clearOldLogs = useCallback((daysToKeep: number = 30) => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

    setLogs(prev => prev.filter(log => {
      const logDate = new Date(log.timestamp)
      return logDate >= cutoffDate
    }))
  }, [])

  return (
    <ModerationLogsContext.Provider
      value={{
        logs,
        addLog,
        getLogsByEventId,
        getLogsByModerator,
        getRecentLogs,
        clearOldLogs,
      }}
    >
      {children}
    </ModerationLogsContext.Provider>
  )
}

export function useModerationLogs() {
  const context = useContext(ModerationLogsContext)
  if (context === undefined) {
    throw new Error("useModerationLogs must be used within a ModerationLogsProvider")
  }
  return context
}
