"use client"

import { useEffect, useState, useMemo } from "react"
import { useEvents } from "@/lib/events-context"
import { useModerationLogs } from "@/lib/moderation-logs-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
} from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const { events, getPendingCount, getApprovedCount, getRejectedCount, getArchivedCount } = useEvents()
  const { logs } = useModerationLogs()

  const [mounted, setMounted] = useState(false)
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">("30d")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Analytics calculations
  const analytics = useMemo(() => {
    const now = new Date()
    const getDateDaysAgo = (days: number) => {
      const date = new Date()
      date.setDate(date.getDate() - days)
      return date
    }

    const filterByTimeRange = (items: any[]) => {
      if (timeRange === "all") return items
      const cutoffDate = getDateDaysAgo(timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90)
      return items.filter(item => {
        const itemDate = new Date(item.createdAt || item.timestamp)
        return itemDate >= cutoffDate
      })
    }

    const filteredEvents = filterByTimeRange(events)
    const filteredLogs = filterByTimeRange(logs)

    // Status distribution
    const statusData = [
      { name: "На модерации", value: getPendingCount(), color: "#fbbf24" },
      { name: "Опубликовано", value: getApprovedCount(), color: "#10b981" },
      { name: "Отклонено", value: getRejectedCount(), color: "#ef4444" },
      { name: "В архиве", value: getArchivedCount(), color: "#6b7280" },
    ]

    // Category distribution
    const categoryCount: Record<string, number> = {}
    events.forEach(event => {
      categoryCount[event.category] = (categoryCount[event.category] || 0) + 1
    })
    const categoryData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }))

    // Moderation activity over time (last 30 days)
    const moderationByDay: Record<string, { approved: number; rejected: number; deleted: number }> = {}
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return date.toISOString().split("T")[0]
    })

    last30Days.forEach(day => {
      moderationByDay[day] = { approved: 0, rejected: 0, deleted: 0 }
    })

    logs.forEach(log => {
      const logDate = new Date(log.timestamp).toISOString().split("T")[0]
      if (moderationByDay[logDate]) {
        if (log.action === "approve") moderationByDay[logDate].approved++
        else if (log.action === "reject") moderationByDay[logDate].rejected++
        else if (log.action === "delete") moderationByDay[logDate].deleted++
      }
    })

    const moderationTimelineData = last30Days.map(day => ({
      date: new Date(day).toLocaleDateString("ru-RU", { day: "2-digit", month: "short" }),
      Одобрено: moderationByDay[day].approved,
      Отклонено: moderationByDay[day].rejected,
      Удалено: moderationByDay[day].deleted,
    }))

    // Events by date (upcoming events distribution)
    const eventsByMonth: Record<string, number> = {}
    events.filter(e => e.status === "approved").forEach(event => {
      const eventDate = new Date(event.date)
      const monthKey = eventDate.toLocaleDateString("ru-RU", { month: "short", year: "numeric" })
      eventsByMonth[monthKey] = (eventsByMonth[monthKey] || 0) + 1
    })
    const eventsTimelineData = Object.entries(eventsByMonth)
      .map(([month, count]) => ({ month, count }))
      .slice(0, 12)

    // Top moderators
    const moderatorStats: Record<string, { approved: number; rejected: number; deleted: number }> = {}
    logs.forEach(log => {
      if (!moderatorStats[log.moderatorName]) {
        moderatorStats[log.moderatorName] = { approved: 0, rejected: 0, deleted: 0 }
      }
      if (log.action === "approve") moderatorStats[log.moderatorName].approved++
      else if (log.action === "reject") moderatorStats[log.moderatorName].rejected++
      else if (log.action === "delete") moderatorStats[log.moderatorName].deleted++
    })
    const topModerators = Object.entries(moderatorStats)
      .map(([name, stats]) => ({
        name,
        total: stats.approved + stats.rejected + stats.deleted,
        ...stats,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)

    // Pin usage statistics
    const pinStats = {
      promo: events.filter(e => e.isPromo).length,
      featured: events.filter(e => e.isFeatured).length,
      exclusive: events.filter(e => e.isExclusive).length,
      new: events.filter(e => e.isNew).length,
    }

    // Average moderation time (mock calculation)
    const avgModerationTime = "2.5 часа"

    // Approval rate
    const totalModerated = getApprovedCount() + getRejectedCount()
    const approvalRate = totalModerated > 0 ? ((getApprovedCount() / totalModerated) * 100).toFixed(1) : "0"

    return {
      statusData,
      categoryData,
      moderationTimelineData,
      eventsTimelineData,
      topModerators,
      pinStats,
      avgModerationTime,
      approvalRate,
    }
  }, [events, logs, timeRange, getPendingCount, getApprovedCount, getRejectedCount, getArchivedCount])

  if (!mounted) {
    return null
  }

  const COLORS = ["#fbbf24", "#10b981", "#ef4444", "#6b7280", "#3b82f6", "#8b5cf6", "#ec4899"]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Назад
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Аналитика и статистика</h1>
              <p className="text-muted-foreground">
                Детальный анализ работы платформы
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Процент одобрения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{analytics.approvalRate}%</div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                От общего числа модерированных
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Всего мероприятий
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{events.length}</div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Во всех статусах
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Среднее время модерации
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{analytics.avgModerationTime}</div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                От подачи до решения
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Действий модерации
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{logs.length}</div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Всего записей в логах
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Распределение по статусам</CardTitle>
              <CardDescription>Текущее состояние всех мероприятий</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Популярные категории</CardTitle>
              <CardDescription>Распределение мероприятий по типам</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Moderation Activity Timeline */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Активность модерации (последние 30 дней)</CardTitle>
              <CardDescription>Динамика обработки мероприятий</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.moderationTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Одобрено" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="Отклонено" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="Удалено" stroke="#6b7280" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Moderators */}
          <Card>
            <CardHeader>
              <CardTitle>Топ модераторов</CardTitle>
              <CardDescription>Самые активные администраторы</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topModerators.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Нет данных о модерации
                  </p>
                ) : (
                  analytics.topModerators.map((moderator, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{moderator.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {moderator.total} действий
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <Badge variant="default">✓ {moderator.approved}</Badge>
                        <Badge variant="destructive">✗ {moderator.rejected}</Badge>
                        <Badge variant="outline">🗑 {moderator.deleted}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pin Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Использование меток</CardTitle>
              <CardDescription>Статистика по промо-меткам</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-red-500" />
                    <span className="font-medium">🔥 Промо</span>
                  </div>
                  <Badge variant="destructive">{analytics.pinStats.promo}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">⭐ Избранное</span>
                  </div>
                  <Badge variant="secondary">{analytics.pinStats.featured}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">💎 Эксклюзив</span>
                  </div>
                  <Badge variant="default">{analytics.pinStats.exclusive}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-green-500" />
                    <span className="font-medium">✨ Новое</span>
                  </div>
                  <Badge variant="outline">{analytics.pinStats.new}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>График предстоящих мероприятий</CardTitle>
            <CardDescription>Распределение опубликованных событий по месяцам</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.eventsTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
