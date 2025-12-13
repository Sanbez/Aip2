"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useEvents } from "@/lib/events-context"
import { useModerationLogs } from "@/lib/moderation-logs-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Archive,
  AlertCircle,
  Eye,
  Trash2,
  Search,
  FileText,
  BarChart3,
  Edit
} from "lucide-react"
import Link from "next/link"
import { Event } from "@/lib/events-data"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const router = useRouter()
  const {
    events,
    getEventsByStatus,
    approveEvent,
    rejectEvent,
    deleteEvent,
    updateEvent,
    getPendingCount,
    getApprovedCount,
    getRejectedCount,
    getArchivedCount,
  } = useEvents()
  const { addLog } = useModerationLogs()
  const { toast } = useToast()

  const [mounted, setMounted] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | null>(null)
  const [moderationComment, setModerationComment] = useState("")
  const [selectedTab, setSelectedTab] = useState("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "title" | "createdAt">("createdAt")
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const [editFormData, setEditFormData] = useState<Partial<Event>>({})

  // Event pins for approval
  const [pins, setPins] = useState({
    isPromo: false,
    isFeatured: false,
    isExclusive: false,
    isNew: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const pendingEvents = getEventsByStatus("pending")
  const approvedEvents = getEventsByStatus("approved")
  const rejectedEvents = getEventsByStatus("rejected")
  const archivedEvents = getEventsByStatus("archived")

  // Filter and sort events
  const filterAndSortEvents = (eventsList: Event[]) => {
    let filtered = eventsList.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
    )

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title)
      } else {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      }
    })

    return filtered
  }

  const handleReviewClick = (event: Event, action: "approve" | "reject") => {
    setSelectedEvent(event)
    setReviewAction(action)
    setModerationComment("")
    setPins({
      isPromo: false,
      isFeatured: false,
      isExclusive: false,
      isNew: false,
    })
    setIsReviewDialogOpen(true)
  }

  const handleReviewSubmit = () => {
    if (!selectedEvent || !reviewAction) return

    const moderatorId = localStorage.getItem("userId") || "unknown"
    const moderatorName = localStorage.getItem("userName") || "Администратор"

    if (reviewAction === "approve") {
      approveEvent(selectedEvent.id, pins, moderationComment || undefined)

      // Add to logs
      addLog({
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        action: "approve",
        moderatorId,
        moderatorName,
        comment: moderationComment || undefined,
        pins: pins,
      })

      toast({
        title: "Мероприятие одобрено",
        description: `"${selectedEvent.title}" успешно опубликовано`,
      })
    } else {
      if (!moderationComment) {
        toast({
          title: "Требуется комментарий",
          description: "Укажите причину отклонения",
          variant: "destructive",
        })
        return
      }
      rejectEvent(selectedEvent.id, moderationComment)

      // Add to logs
      addLog({
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        action: "reject",
        moderatorId,
        moderatorName,
        comment: moderationComment,
      })

      toast({
        title: "Мероприятие отклонено",
        description: `"${selectedEvent.title}" отклонено`,
      })
    }

    setIsReviewDialogOpen(false)
    setSelectedEvent(null)
  }

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (!selectedEvent) return

    const moderatorId = localStorage.getItem("userId") || "unknown"
    const moderatorName = localStorage.getItem("userName") || "Администратор"

    deleteEvent(selectedEvent.id)

    // Add to logs
    addLog({
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      action: "delete",
      moderatorId,
      moderatorName,
      comment: "Мероприятие удалено администратором",
    })

    toast({
      title: "Мероприятие удалено",
      description: `"${selectedEvent.title}" удалено из системы`,
    })

    setIsDeleteDialogOpen(false)
    setSelectedEvent(null)
  }

  const handleEditClick = (event: Event) => {
    setSelectedEvent(event)
    setEditFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      address: event.address,
      date: event.date,
      time: event.time,
      price: event.price,
      isFree: event.isFree,
      maxAttendees: event.maxAttendees,
      category: event.category,
      organizer: event.organizer,
    })
    setIsEditDialogOpen(true)
  }

  const handleEditSubmit = () => {
    if (!selectedEvent) return

    const moderatorId = localStorage.getItem("userId") || "unknown"
    const moderatorName = localStorage.getItem("userName") || "Администратор"

    updateEvent(selectedEvent.id, editFormData)

    // Add to logs
    addLog({
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      action: "edit",
      moderatorId,
      moderatorName,
      comment: "Мероприятие отредактировано администратором",
    })

    toast({
      title: "Изменения сохранены",
      description: `"${selectedEvent.title}" успешно обновлено`,
    })

    setIsEditDialogOpen(false)
    setSelectedEvent(null)
  }

  const handleBulkAction = (action: "approve" | "reject" | "delete") => {
    if (selectedEvents.length === 0) {
      toast({
        title: "Выберите мероприятия",
        description: "Отметьте хотя бы одно мероприятие",
        variant: "destructive",
      })
      return
    }

    const moderatorId = localStorage.getItem("userId") || "unknown"
    const moderatorName = localStorage.getItem("userName") || "Администратор"

    selectedEvents.forEach(eventId => {
      const event = events.find(e => e.id === eventId)
      if (!event) return

      if (action === "approve") {
        approveEvent(eventId, { isNew: true })
        addLog({
          eventId,
          eventTitle: event.title,
          action: "approve",
          moderatorId,
          moderatorName,
          comment: "Массовое одобрение",
          pins: { isNew: true },
        })
      } else if (action === "reject") {
        rejectEvent(eventId, "Массовое отклонение")
        addLog({
          eventId,
          eventTitle: event.title,
          action: "reject",
          moderatorId,
          moderatorName,
          comment: "Массовое отклонение",
        })
      } else if (action === "delete") {
        deleteEvent(eventId)
        addLog({
          eventId,
          eventTitle: event.title,
          action: "delete",
          moderatorId,
          moderatorName,
          comment: "Массовое удаление",
        })
      }
    })

    toast({
      title: "Действие выполнено",
      description: `${selectedEvents.length} мероприятий обработано`,
    })

    setSelectedEvents([])
  }

  const toggleEventSelection = (eventId: string) => {
    setSelectedEvents(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const getStatusBadge = (status: Event["status"]) => {
    const variants: Record<Event["status"], { variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof Clock; label: string }> = {
      pending: { variant: "secondary", icon: Clock, label: "На модерации" },
      approved: { variant: "default", icon: CheckCircle, label: "Опубликовано" },
      rejected: { variant: "destructive", icon: XCircle, label: "Отклонено" },
      archived: { variant: "outline", icon: Archive, label: "В архиве" },
    }
    const { variant, icon: Icon, label } = variants[status]
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    )
  }

  const renderEventCard = (event: Event) => {
    const isSelected = selectedEvents.includes(event.id)

    return (
      <Card key={event.id} className={`${isSelected ? "border-primary" : ""}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleEventSelection(event.id)}
              />
              <div className="flex-1">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription className="mt-1">
                  {event.organizer} • {new Date(event.date).toLocaleDateString("ru-RU")} в {event.time}
                </CardDescription>
              </div>
            </div>
            {getStatusBadge(event.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </p>

            {/* Event pins */}
            {(event.isPromo || event.isFeatured || event.isExclusive || event.isNew) && (
              <div className="flex flex-wrap gap-1.5">
                {event.isPromo && <Badge variant="destructive">🔥 Промо</Badge>}
                {event.isFeatured && <Badge variant="secondary">⭐ Избранное</Badge>}
                {event.isExclusive && <Badge variant="default">💎 Эксклюзив</Badge>}
                {event.isNew && <Badge variant="outline">✨ Новое</Badge>}
              </div>
            )}

            {/* Moderation info */}
            {event.moderationComment && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-xs font-medium mb-1">Комментарий модератора:</p>
                <p className="text-xs text-muted-foreground">{event.moderationComment}</p>
              </div>
            )}

            {event.moderatedBy && (
              <p className="text-xs text-muted-foreground">
                Модератор: {event.moderatedBy}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {event.status === "pending" && (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleReviewClick(event, "approve")}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Одобрить
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleReviewClick(event, "reject")}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Отклонить
                  </Button>
                </>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditClick(event)}
                title="Редактировать"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/event/${event.id}`)}
                title="Просмотр"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDeleteClick(event)}
                title="Удалить"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Панель администратора</h1>
            </div>
            <div className="flex gap-2">
              <Link href="/admin/logs">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  История
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Аналитика
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-muted-foreground">
            Управление и модерация мероприятий
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                На модерации
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{getPendingCount()}</div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Опубликовано
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{getApprovedCount()}</div>
                <CheckCircle className="h-8 w-8 text-green-500" />
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
                <div className="text-3xl font-bold">{getRejectedCount()}</div>
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                В архиве
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{getArchivedCount()}</div>
                <Archive className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по названию, описанию, организатору..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={sortBy} onValueChange={(value: "date" | "title" | "createdAt") => setSortBy(value)}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">По дате создания</SelectItem>
                  <SelectItem value="date">По дате события</SelectItem>
                  <SelectItem value="title">По названию</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk actions */}
            {selectedEvents.length > 0 && (
              <div className="flex items-center gap-2 mt-4 p-3 bg-muted rounded-md">
                <span className="text-sm font-medium">
                  Выбрано: {selectedEvents.length}
                </span>
                <div className="flex gap-2 ml-auto">
                  {selectedTab === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleBulkAction("approve")}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Одобрить все
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleBulkAction("reject")}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Отклонить все
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction("delete")}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Удалить все
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedEvents([])}
                  >
                    Отменить
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Events Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              На модерации ({getPendingCount()})
            </TabsTrigger>
            <TabsTrigger value="approved" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Опубликовано ({getApprovedCount()})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="gap-2">
              <XCircle className="h-4 w-4" />
              Отклонено ({getRejectedCount()})
            </TabsTrigger>
            <TabsTrigger value="archived" className="gap-2">
              <Archive className="h-4 w-4" />
              Архив ({getArchivedCount()})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {filterAndSortEvents(pendingEvents).length === 0 ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="text-center text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Нет мероприятий на модерации</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filterAndSortEvents(pendingEvents).map(renderEventCard)
              )}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {filterAndSortEvents(approvedEvents).length === 0 ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="text-center text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Нет опубликованных мероприятий</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filterAndSortEvents(approvedEvents).map(renderEventCard)
              )}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {filterAndSortEvents(rejectedEvents).length === 0 ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="text-center text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Нет отклоненных мероприятий</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filterAndSortEvents(rejectedEvents).map(renderEventCard)
              )}
            </div>
          </TabsContent>

          <TabsContent value="archived" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {filterAndSortEvents(archivedEvents).length === 0 ? (
                <Card>
                  <CardContent className="py-8">
                    <div className="text-center text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Нет архивных мероприятий</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filterAndSortEvents(archivedEvents).map(renderEventCard)
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Review Dialog */}
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {reviewAction === "approve" ? "Одобрить мероприятие" : "Отклонить мероприятие"}
              </DialogTitle>
              <DialogDescription>
                {selectedEvent?.title}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {reviewAction === "approve" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Добавить метки (опционально)
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isPromo"
                          checked={pins.isPromo}
                          onCheckedChange={(checked) =>
                            setPins({ ...pins, isPromo: checked as boolean })
                          }
                        />
                        <Label htmlFor="isPromo" className="cursor-pointer">
                          🔥 Промо
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isFeatured"
                          checked={pins.isFeatured}
                          onCheckedChange={(checked) =>
                            setPins({ ...pins, isFeatured: checked as boolean })
                          }
                        />
                        <Label htmlFor="isFeatured" className="cursor-pointer">
                          ⭐ Избранное
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isExclusive"
                          checked={pins.isExclusive}
                          onCheckedChange={(checked) =>
                            setPins({ ...pins, isExclusive: checked as boolean })
                          }
                        />
                        <Label htmlFor="isExclusive" className="cursor-pointer">
                          💎 Эксклюзив
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isNew"
                          checked={pins.isNew}
                          onCheckedChange={(checked) =>
                            setPins({ ...pins, isNew: checked as boolean })
                          }
                        />
                        <Label htmlFor="isNew" className="cursor-pointer">
                          ✨ Новое
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="comment">
                  {reviewAction === "approve" ? "Комментарий (опционально)" : "Причина отклонения *"}
                </Label>
                <Textarea
                  id="comment"
                  placeholder={
                    reviewAction === "approve"
                      ? "Добавьте комментарий..."
                      : "Укажите причину отклонения..."
                  }
                  value={moderationComment}
                  onChange={(e) => setModerationComment(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleReviewSubmit}>
                {reviewAction === "approve" ? "Одобрить" : "Отклонить"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Удалить мероприятие?</DialogTitle>
              <DialogDescription>
                Вы уверены, что хотите удалить "{selectedEvent?.title}"? Это действие нельзя отменить.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Отмена
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Удалить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Редактировать мероприятие</DialogTitle>
              <DialogDescription>
                {selectedEvent?.title}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Название *</Label>
                  <Input
                    id="edit-title"
                    value={editFormData.title || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-category">Категория *</Label>
                  <Select
                    value={editFormData.category || ""}
                    onValueChange={(value) => setEditFormData({ ...editFormData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Настольные игры">Настольные игры</SelectItem>
                      <SelectItem value="Покер">Покер</SelectItem>
                      <SelectItem value="Шахматы">Шахматы</SelectItem>
                      <SelectItem value="Концерты">Концерты</SelectItem>
                      <SelectItem value="Спектакли">Спектакли</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-organizer">Организатор *</Label>
                  <Input
                    id="edit-organizer"
                    value={editFormData.organizer || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, organizer: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-location">Локация *</Label>
                  <Input
                    id="edit-location"
                    value={editFormData.location || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-date">Дата *</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editFormData.date || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-time">Время *</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={editFormData.time || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-price">Цена (₽)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editFormData.price || 0}
                    onChange={(e) => setEditFormData({ ...editFormData, price: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-maxAttendees">Макс. участников</Label>
                  <Input
                    id="edit-maxAttendees"
                    type="number"
                    value={editFormData.maxAttendees || 0}
                    onChange={(e) => setEditFormData({ ...editFormData, maxAttendees: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-address">Адрес *</Label>
                <Input
                  id="edit-address"
                  value={editFormData.address || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Описание *</Label>
                <Textarea
                  id="edit-description"
                  value={editFormData.description || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-isFree"
                  checked={editFormData.isFree || false}
                  onCheckedChange={(checked) => setEditFormData({ ...editFormData, isFree: checked as boolean })}
                />
                <Label htmlFor="edit-isFree" className="cursor-pointer">
                  Бесплатное мероприятие
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleEditSubmit}>
                Сохранить изменения
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
