"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  Camera,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Ticket,
  Heart,
  Star,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Мок данные профиля
const mockUser = {
  id: "u1",
  name: "Алексей Иванов",
  telegramId: "@alexey_ivanov",
  city: "Москва",
  bio: "Любитель настольных игр и джазовой музыки. Организатор локальных турниров по шахматам.",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  joinDate: "2024-03-15",
  stats: {
    eventsAttended: 24,
    eventsOrganized: 3,
    favoritesCount: 12,
    reviewsCount: 8,
  },
  achievements: [
    { id: "a1", title: "Первопроходец", description: "Посетил первое мероприятие", icon: "star" },
    { id: "a2", title: "Завсегдатай", description: "Посетил 10+ мероприятий", icon: "award" },
    { id: "a3", title: "Организатор", description: "Создал первое мероприятие", icon: "calendar" },
  ],
  interests: ["Настольные игры", "Шахматы", "Джаз", "Театр"],
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: mockUser.name,
    city: mockUser.city,
    bio: mockUser.bio,
  })

  const handleSave = () => {
    // В реальном приложении здесь был бы API запрос
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: mockUser.name,
      city: mockUser.city,
      bio: mockUser.bio,
    })
    setIsEditing(false)
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

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Профиль</h1>
              <p className="text-sm text-muted-foreground">Управление аккаунтом</p>
            </div>
          </div>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Редактировать
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Отмена
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Сохранить
              </Button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="text-2xl">
                  {mockUser.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">О себе</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="bg-input border-border resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{mockUser.name}</h2>
                    <p className="text-muted-foreground mt-1">{mockUser.bio}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    На платформе с {formatDate(mockUser.joinDate)}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10">
              <Ticket className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{mockUser.stats.eventsAttended}</div>
            <div className="text-sm text-muted-foreground">Посещено</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{mockUser.stats.eventsOrganized}</div>
            <div className="text-sm text-muted-foreground">Организовано</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{mockUser.stats.favoritesCount}</div>
            <div className="text-sm text-muted-foreground">В избранном</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{mockUser.stats.reviewsCount}</div>
            <div className="text-sm text-muted-foreground">Отзывов</div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Информация</h3>
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="city">Город</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                <span>{mockUser.telegramId}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>{mockUser.city}</span>
              </div>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Достижения</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {mockUser.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 rounded-lg bg-muted/50 text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/favorites">
            <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Избранное</span>
              </div>
            </div>
          </Link>
          <Link href="/tickets">
            <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3">
                <Ticket className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Мои билеты</span>
              </div>
            </div>
          </Link>
          <Link href="/settings">
            <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Настройки</span>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
