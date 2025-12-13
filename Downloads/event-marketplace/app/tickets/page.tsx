"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Header } from "@/components/header"
import { useEvents } from "@/lib/events-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  CalendarIcon,
  MapPin,
  Clock,
  Users,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle2,
  Send,
  Info,
  Tag
} from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/events-data"
import { toast } from "sonner"

const eventSchema = z.object({
  title: z.string().min(5, "Название должно содержать минимум 5 символов").max(100, "Максимум 100 символов"),
  description: z.string().min(20, "Описание должно содержать минимум 20 символов").max(500, "Максимум 500 символов"),
  fullDescription: z.string().min(50, "Полное описание должно содержать минимум 50 символов").max(2000, "Максимум 2000 символов"),
  category: z.string().min(1, "Выберите категорию"),
  location: z.string().min(3, "Укажите место проведения"),
  address: z.string().min(5, "Укажите полный адрес"),
  date: z.date({ required_error: "Выберите дату мероприятия" }),
  time: z.string().min(1, "Укажите время начала"),
  maxAttendees: z.number().min(1, "Минимум 1 участник").max(10000, "Максимум 10000 участников"),
  price: z.number().min(0, "Цена не может быть отрицательной"),
  isFree: z.boolean(),
  organizerName: z.string().min(2, "Укажите имя организатора").max(100, "Максимум 100 символов"),
  telegramContact: z.string()
    .min(1, "Укажите Telegram для связи")
    .regex(/^@?[a-zA-Z0-9_]{5,32}$/, "Введите корректный Telegram username (например: @username)"),
  tags: z.string().optional(),
  imageUrl: z.string().url("Введите корректный URL изображения").optional().or(z.literal("")),
})

type EventFormData = z.infer<typeof eventSchema>

export default function AddEventPage() {
  const { addEvent } = useEvents()
  const [date, setDate] = useState<Date>()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      isFree: false,
      price: 0,
      maxAttendees: 50,
    }
  })

  const watchIsFree = watch("isFree")

  const onSubmit = async (data: EventFormData) => {
    try {
      console.log("Submitted event data:", data)

      // ДОБАВЛЯЕМ СОБЫТИЕ В КОНТЕКСТ!
      addEvent({
        title: data.title,
        description: data.description,
        fullDescription: data.fullDescription,
        category: data.category,
        tags: data.tags?.split(',').map(t => t.trim()).filter(t => t) || [],
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.time,
        location: data.location,
        address: data.address,
        maxAttendees: data.maxAttendees,
        currentAttendees: 0,
        price: data.isFree ? 0 : data.price,
        isFree: data.isFree,
        organizer: data.organizerName,
        image: data.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      })

      console.log("✅ Event added to context with status: pending")

      setIsSubmitted(true)
      toast.success("Мероприятие отправлено на модерацию!", {
        description: "Вы получите уведомление после проверки администратором"
      })

      reset()
      setDate(undefined)

      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error("Error submitting event:", error)
      toast.error("Произошла ошибка при отправке", {
        description: "Пожалуйста, попробуйте еще раз"
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Добавить мероприятие</h1>
            <p className="text-muted-foreground">
              Заполните форму для публикации вашего мероприятия на платформе
            </p>
          </div>

          <Alert className="border-primary/50 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              <strong className="font-semibold">Правила публикации мероприятий:</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Мероприятие должно быть легальным и соответствовать законодательству РФ</li>
                <li>Запрещены мероприятия с пропагандой насилия, дискриминации или незаконной деятельности</li>
                <li>Все данные должны быть достоверными и актуальными</li>
                <li>Описание должно быть информативным и не содержать спам</li>
                <li>Изображения должны соответствовать содержанию мероприятия</li>
                <li>Обязательно укажите корректные контактные данные для связи</li>
              </ul>
            </AlertDescription>
          </Alert>

          {isSubmitted && (
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950/30">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Мероприятие успешно отправлено на модерацию! Мы проверим его в ближайшее время.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Основная информация
                </CardTitle>
                <CardDescription>Расскажите о вашем мероприятии</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Название мероприятия *</Label>
                  <Input
                    id="title"
                    placeholder="Например: Турнир по настольным играм"
                    {...register("title")}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Категория *</Label>
                  <Select onValueChange={(value) => setValue("category", value)}>
                    <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== "Все категории").map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Краткое описание *</Label>
                  <Textarea
                    id="description"
                    placeholder="Краткое описание в 1-2 предложения (до 500 символов)"
                    rows={3}
                    {...register("description")}
                    className={errors.description ? "border-destructive" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullDescription">Полное описание *</Label>
                  <Textarea
                    id="fullDescription"
                    placeholder="Подробное описание мероприятия, программа, особенности (до 2000 символов)"
                    rows={6}
                    {...register("fullDescription")}
                    className={errors.fullDescription ? "border-destructive" : ""}
                  />
                  {errors.fullDescription && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullDescription.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">
                    <Tag className="w-4 h-4 inline mr-1" />
                    Теги (опционально)
                  </Label>
                  <Input
                    id="tags"
                    placeholder="Например: настолки, D&D, фэнтези (через запятую)"
                    {...register("tags")}
                  />
                  <p className="text-xs text-muted-foreground">
                    Теги помогут пользователям найти ваше мероприятие
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Место и время
                </CardTitle>
                <CardDescription>Где и когда пройдет мероприятие</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Место проведения *</Label>
                    <Input
                      id="location"
                      placeholder="Например: Клуб 'Dice & Dragons'"
                      {...register("location")}
                      className={errors.location ? "border-destructive" : ""}
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.location.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес *</Label>
                    <Input
                      id="address"
                      placeholder="Например: ул. Ленина, 25"
                      {...register("address")}
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Дата мероприятия *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                            errors.date && "border-destructive"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => {
                            setDate(newDate)
                            if (newDate) setValue("date", newDate)
                          }}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Время начала *
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      {...register("time")}
                      className={errors.time ? "border-destructive" : ""}
                    />
                    {errors.time && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.time.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Участники и стоимость
                </CardTitle>
                <CardDescription>Укажите детали о количестве участников и цене</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees">Максимум участников *</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      min="1"
                      placeholder="50"
                      {...register("maxAttendees", { valueAsNumber: true })}
                      className={errors.maxAttendees ? "border-destructive" : ""}
                    />
                    {errors.maxAttendees && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.maxAttendees.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="price">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Стоимость *
                      </Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isFree"
                          {...register("isFree")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setValue("price", 0)
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="isFree" className="font-normal cursor-pointer">
                          Бесплатно
                        </Label>
                      </div>
                    </div>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      placeholder="0"
                      disabled={watchIsFree}
                      {...register("price", { valueAsNumber: true })}
                      className={errors.price ? "border-destructive" : ""}
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Контактная информация организатора
                </CardTitle>
                <CardDescription>Как с вами можно связаться</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizerName">Имя организатора *</Label>
                    <Input
                      id="organizerName"
                      placeholder="Иван Иванов"
                      {...register("organizerName")}
                      className={errors.organizerName ? "border-destructive" : ""}
                    />
                    {errors.organizerName && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.organizerName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telegramContact">Telegram для связи *</Label>
                    <Input
                      id="telegramContact"
                      placeholder="@username"
                      {...register("telegramContact")}
                      className={errors.telegramContact ? "border-destructive" : ""}
                    />
                    {errors.telegramContact && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.telegramContact.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Изображение (опционально)</CardTitle>
                <CardDescription>Добавьте ссылку на изображение мероприятия</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  {...register("imageUrl")}
                  className={errors.imageUrl ? "border-destructive" : ""}
                />
                {errors.imageUrl && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.imageUrl.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Рекомендуемый размер: 1200x630 пикселей
                </p>
              </CardContent>
            </Card>

            <Separator />

            <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/30">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                <strong className="font-semibold">Модерация:</strong> Ваше мероприятие будет проверено
                администратором перед публикацией. Обычно проверка занимает от 1 до 24 часов. Вы получите
                уведомление о результатах модерации на указанный Telegram.
              </AlertDescription>
            </Alert>

            <div className="flex gap-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Отправить на модерацию
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  reset()
                  setDate(undefined)
                }}
              >
                Очистить форму
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
