"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { MapPin, ChevronDown, User, LogIn, Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useCity, cities } from "@/lib/city-context"
import { useAdmin } from "@/lib/admin-context"

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/afisha", label: "Афиша" },
  { href: "/favorites", label: "Избранное" },
  { href: "/tickets", label: "Добавить мероприятие" },
]

export function Header() {
  const [mounted, setMounted] = useState(false)
  const { selectedCity, setSelectedCity } = useCity()
  const { isAdmin } = useAdmin()
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    // Check for auth status
    const authStatus = localStorage.getItem("isLoggedIn")
    if (authStatus === "true") {
      setIsLoggedIn(true)
    }

    // Load Telegram Login Widget script
    const script = document.createElement("script")
    script.src = "https://telegram.org/js/telegram-widget.js?22"
    script.async = true
    document.body.appendChild(script)

    // Telegram callback function
    const handleTelegramAuth = (user: { id: string; first_name: string; last_name?: string; photo_url?: string }) => {
      console.log("Logged in as", user)
      setIsLoggedIn(true)
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userName", `${user.first_name}${user.last_name ? " " + user.last_name : ""}`)
      localStorage.setItem("userId", user.id)
      localStorage.setItem("userPhoto", user.photo_url || "")
      setIsAuthDialogOpen(false)
    }

    // Expose to window for Telegram widget
    ;(window as Window & { onTelegramAuth?: typeof handleTelegramAuth }).onTelegramAuth = handleTelegramAuth

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userName")
    localStorage.removeItem("userId")
    localStorage.removeItem("userPhoto")
  }

  const getUserName = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userName") || "Пользователь"
    }
    return "Пользователь"
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-foreground">
                City Offline
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* City Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span className="hidden sm:inline">{selectedCity}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {cities.map((city) => (
                    <DropdownMenuItem
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className={cn(
                        "cursor-pointer",
                        selectedCity === city && "bg-accent"
                      )}
                    >
                      {city}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              {/* Auth Button / User Menu */}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-1.5">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{getUserName()}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="font-semibold text-primary">
                            🛡️ Админ-панель
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Профиль</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/tickets">Добавить мероприятие</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favorites">Избранное</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Настройки</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsAuthDialogOpen(true)}
                  className="gap-1.5"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Войти</span>
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-2">
                {isAdmin && isLoggedIn && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-bold text-primary hover:bg-accent rounded-md transition-colors"
                  >
                    🛡️ Админ-панель
                  </Link>
                )}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/submit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                >
                  Добавить событие
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Auth Dialog */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Вход в аккаунт</DialogTitle>
            <DialogDescription>
              Войдите через Telegram, чтобы регистрироваться на мероприятия и сохранять избранное
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-sm text-muted-foreground text-center">
                Используйте Telegram для быстрого и безопасного входа
              </p>
              {/* Telegram Login Widget */}
              <div id="telegram-login-container" className="flex justify-center">
                <script
                  async
                  src="https://telegram.org/js/telegram-widget.js?22"
                  data-telegram-login="YOUR_BOT_USERNAME"
                  data-size="large"
                  data-onauth="onTelegramAuth(user)"
                  data-request-access="write"
                />
                <div className="text-center p-4 border border-border rounded-lg bg-muted/50">
                  <p className="text-sm font-medium mb-2">Войти через Telegram</p>
                  <p className="text-xs text-muted-foreground">
                    Для работы авторизации необходимо настроить Telegram бота
                  </p>
                  <Button
                    onClick={() => {
                      // Симуляция Telegram входа для демонстрации
                      const demoUser = {
                        id: Math.random().toString(),
                        first_name: "Пользователь",
                        last_name: "Telegram",
                        photo_url: ""
                      }
                      const win = window as Window & { onTelegramAuth?: (user: typeof demoUser) => void }
                      win.onTelegramAuth?.(demoUser)
                    }}
                    className="mt-3"
                  >
                    Войти через Telegram (Демо)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
