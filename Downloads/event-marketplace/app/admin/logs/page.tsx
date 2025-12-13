"use client"

import { useEffect, useState } from "react"
import { useModerationLogs, ModerationLog } from "@/lib/moderation-logs-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Calendar,
  User,
  Search,
  ArrowLeft,
  FileText,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ModerationLogsPage() {
  const { logs, clearOldLogs } = useModerationLogs()
  const { toast } = useToast()

  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterAction, setFilterAction] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Filter and sort logs
  const filterAndSortLogs = () => {
    let filtered = logs

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(log =>
        log.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.moderatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.comment?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by action
    if (filterAction !== "all") {
      filtered = filtered.filter(log => log.action === filterAction)
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime()
      const dateB = new Date(b.timestamp).getTime()
      return sortBy === "newest" ? dateB - dateA : dateA - dateB
    })

    return sorted
  }

  const getActionBadge = (action: ModerationLog["action"]) => {
    const variants: Record<ModerationLog["action"], { variant: any; icon: any; label: string; color: string }> = {
      approve: { variant: "default", icon: CheckCircle, label: "Одобрено", color: "text-green-500" },
      reject: { variant: "destructive", icon: XCircle, label: "Отклонено", color: "text-red-500" },
      delete: { variant: "outline", icon: Trash2, label: "Удалено", color: "text-gray-500" },
      edit: { variant: "secondary", icon: Edit, label: "Изменено", color: "text-blue-500" },
    }
    const { variant, icon: Icon, label, color } = variants[action]
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className={`h-3 w-3 ${color}`} />
        {label}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleClearOldLogs = () => {
    if (confirm("Удалить логи старше 30 дней?")) {
      clearOldLogs(30)
      toast({
        title: "Логи очищены",
        description: "Старые логи успешно удалены",
      })
    }
  }

  const filteredLogs = filterAndSortLogs()

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
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">История модерации</h1>
              <p className="text-muted-foreground">
                Всего записей: {logs.length}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Одобрено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {logs.filter(l => l.action === "approve").length}
                </div>
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Отклонено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {logs.filter(l => l.action === "reject").length}
                </div>
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Удалено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {logs.filter(l => l.action === "delete").length}
                </div>
                <Trash2 className="h-6 w-6 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Изменено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {logs.filter(l => l.action === "edit").length}
                </div>
                <Edit className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по названию, модератору, комментарию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Действие" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все действия</SelectItem>
                  <SelectItem value="approve">Одобрено</SelectItem>
                  <SelectItem value="reject">Отклонено</SelectItem>
                  <SelectItem value="delete">Удалено</SelectItem>
                  <SelectItem value="edit">Изменено</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Сначала новые</SelectItem>
                  <SelectItem value="oldest">Сначала старые</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleClearOldLogs}>
                Очистить старые
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs List */}
        <div className="space-y-3">
          {filteredLogs.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Нет записей в истории</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredLogs.map((log) => (
              <Card key={log.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-base">{log.eventTitle}</CardTitle>
                      <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {log.moderatorName}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(log.timestamp)}
                        </span>
                      </CardDescription>
                    </div>
                    {getActionBadge(log.action)}
                  </div>
                </CardHeader>
                {(log.comment || log.pins) && (
                  <CardContent>
                    <div className="space-y-2">
                      {log.comment && (
                        <div className="p-3 bg-muted rounded-md">
                          <p className="text-xs font-medium mb-1">Комментарий:</p>
                          <p className="text-sm text-muted-foreground">{log.comment}</p>
                        </div>
                      )}
                      {log.pins && (log.pins.isPromo || log.pins.isFeatured || log.pins.isExclusive || log.pins.isNew) && (
                        <div className="flex flex-wrap gap-1.5">
                          {log.pins.isPromo && <Badge variant="destructive">🔥 Промо</Badge>}
                          {log.pins.isFeatured && <Badge variant="secondary">⭐ Избранное</Badge>}
                          {log.pins.isExclusive && <Badge variant="default">💎 Эксклюзив</Badge>}
                          {log.pins.isNew && <Badge variant="outline">✨ Новое</Badge>}
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
