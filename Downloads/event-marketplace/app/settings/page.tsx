"use client"

import { useState } from "react"
import {
  Settings,
  Bell,
  Moon,
  Sun,
  Shield,
  LogOut,
  Trash2,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    telegram: true,
    push: true,
    newEvents: true,
    reminders: true,
    promotions: false,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showAttendedEvents: true,
    showFavorites: false,
  })

  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("ru")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Page Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Настройки</h1>
            <p className="text-sm text-muted-foreground">Управление аккаунтом и предпочтениями</p>
          </div>
        </div>
        {/* Appearance */}
        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sun className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Внешний вид</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Тема оформления</Label>
                <p className="text-sm text-muted-foreground">Выберите светлую или тёмную тему</p>
              </div>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      Светлая
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      Тёмная
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Системная
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Язык</Label>
                <p className="text-sm text-muted-foreground">Выберите язык интерфейса</p>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="kk">Қазақша</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Уведомления</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Способы уведомлений
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                  <div>
                    <Label className="text-base">Telegram уведомления</Label>
                    <p className="text-sm text-muted-foreground">Получать в Telegram</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.telegram}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, telegram: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <Label className="text-base">Push уведомления</Label>
                    <p className="text-sm text-muted-foreground">В браузере</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Типы уведомлений
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Новые мероприятия</Label>
                  <p className="text-sm text-muted-foreground">В избранных категориях</p>
                </div>
                <Switch
                  checked={notifications.newEvents}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newEvents: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Напоминания</Label>
                  <p className="text-sm text-muted-foreground">О предстоящих событиях</p>
                </div>
                <Switch
                  checked={notifications.reminders}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, reminders: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Акции и предложения</Label>
                  <p className="text-sm text-muted-foreground">Скидки и специальные предложения</p>
                </div>
                <Switch
                  checked={notifications.promotions}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, promotions: checked })
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Конфиденциальность</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Публичный профиль</Label>
                <p className="text-sm text-muted-foreground">Другие пользователи могут видеть ваш профиль</p>
              </div>
              <Switch
                checked={privacy.profilePublic}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, profilePublic: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Показывать посещённые события</Label>
                <p className="text-sm text-muted-foreground">В вашем публичном профиле</p>
              </div>
              <Switch
                checked={privacy.showAttendedEvents}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, showAttendedEvents: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Показывать избранное</Label>
                <p className="text-sm text-muted-foreground">Ваш список избранных мероприятий</p>
              </div>
              <Switch
                checked={privacy.showFavorites}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, showFavorites: checked })
                }
              />
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Безопасность</h2>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              <div>
                <Label className="text-base font-medium text-foreground">Вход через Telegram</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Ваш аккаунт защищен авторизацией через Telegram. Для изменения способа входа обратитесь в поддержку.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="p-6 rounded-xl bg-card border border-destructive/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Опасная зона</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Выйти из аккаунта</Label>
                <p className="text-sm text-muted-foreground">Выйти со всех устройств</p>
              </div>
              <Button variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base text-destructive">Удалить аккаунт</Label>
                  <p className="text-sm text-muted-foreground">
                    Все данные будут удалены безвозвратно
                  </p>
                </div>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
