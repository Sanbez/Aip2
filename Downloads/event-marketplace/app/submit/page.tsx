"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Upload, Calendar, Clock, MapPin, Users, DollarSign, Tag, Info, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { categories } from "@/lib/events-data"
import { useEvents } from "@/lib/events-context"

export default function SubmitEventPage() {
  const { addEvent } = useEvents()
  const [isFree, setIsFree] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Получаем данные из формы
    const formData = new FormData(e.target as HTMLFormElement)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const fullDescription = formData.get("fullDescription") as string
    const category = selectedCategory
    const tags = (formData.get("tags") as string)?.split(",").map(tag => tag.trim()).filter(tag => tag) || []
    const date = formData.get("date") as string
    const time = formData.get("time") as string
    const location = formData.get("location") as string
    const address = formData.get("address") as string
    const maxAttendees = Number.parseInt(formData.get("maxAttendees") as string)
    const price = isFree ? 0 : Number.parseInt(formData.get("price") as string)
    const organizer = formData.get("organizer") as string

    // Добавляем мероприятие со статусом "pending"
    addEvent({
      title,
      description,
      fullDescription,
      category,
      tags,
      date,
      time,
      location,
      address,
      maxAttendees,
      currentAttendees: 0,
      price,
      isFree,
      organizer,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", // Placeholder изображение
    })

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 animate-in zoom-in-95 fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Заявка отправлена!</h1>
          <p className="text-muted-foreground">
            Ваше мероприятие отправлено на модерацию. После проверки администратором оно появится на сайте. Обычно это
            занимает до 24 часов.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/">
              <Button className="w-full">Вернуться на главную</Button>
            </Link>
            <Button variant="outline" onClick={() => setSubmitted(false)} className="w-full">
              Добавить ещё мероприятие
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Добавить мероприятие</h1>
            <p className="text-sm text-muted-foreground">Заполните информацию о вашем событии</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <section className="space-y-6 p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Основная информация</h2>
            </div>

            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Название мероприятия *</Label>
                <Input id="title" name="title" placeholder="Введите название" className="bg-input border-border" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Краткое описание *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Краткое описание для карточки мероприятия (до 150 символов)"
                  className="bg-input border-border resize-none"
                  rows={2}
                  maxLength={150}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Полное описание *</Label>
                <Textarea
                  id="fullDescription"
                  name="fullDescription"
                  placeholder="Подробное описание мероприятия, программа, что нужно взять с собой и т.д."
                  className="bg-input border-border resize-none"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категория *</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((c) => c !== "Все категории")
                      .map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Теги (через запятую)</Label>
                <Input id="tags" name="tags" placeholder="Например: музыка, рок, живой звук" className="bg-input border-border" />
              </div>
            </div>
          </section>

          {/* Date & Location */}
          <section className="space-y-6 p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Дата и место</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Дата проведения *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="date" name="date" type="date" className="bg-input border-border pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Время начала *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="time" name="time" type="time" className="bg-input border-border pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Название места *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    placeholder="Например: Концертный зал"
                    className="bg-input border-border pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Адрес *</Label>
                <Input id="address" name="address" placeholder="ул. Пушкина, д. 10" className="bg-input border-border" required />
              </div>
            </div>
          </section>

          {/* Capacity & Price */}
          <section className="space-y-6 p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Участники и стоимость</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Максимум участников *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="maxAttendees"
                    name="maxAttendees"
                    type="number"
                    min={1}
                    placeholder="100"
                    className="bg-input border-border pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isFree">Бесплатное мероприятие</Label>
                  <Switch id="isFree" checked={isFree} onCheckedChange={setIsFree} />
                </div>

                {!isFree && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Стоимость билета (₽) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min={0}
                        placeholder="1000"
                        className="bg-input border-border pl-10"
                        required={!isFree}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Image Upload */}
          <section className="space-y-6 p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Изображение</h2>
            </div>

            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium mb-1">Загрузите изображение</p>
              <p className="text-sm text-muted-foreground">PNG, JPG до 5MB. Рекомендуемый размер: 800x600px</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
          </section>

          {/* Organizer Info */}
          <section className="space-y-6 p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Tag className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Организатор</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organizer">Название организатора *</Label>
                <Input
                  id="organizer"
                  name="organizer"
                  placeholder="Название компании или ваше имя"
                  className="bg-input border-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Контакт для связи *</Label>
                <Input
                  id="contact"
                  name="contact"
                  type="text"
                  placeholder="@telegram_username или email@example.com"
                  className="bg-input border-border"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Укажите ваш Telegram или email для связи по вопросам организации мероприятия
                </p>
              </div>
            </div>
          </section>

          {/* Notice */}
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Обратите внимание:</strong> после отправки ваше мероприятие будет
              проверено модератором. Публикация обычно занимает до 24 часов. Мы свяжемся с вами по указанному контакту,
              если потребуется дополнительная информация.
            </p>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full h-12 bg-transparent">
                Отмена
              </Button>
            </Link>
            <Button type="submit" className="flex-1 h-12">
              Отправить на модерацию
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
