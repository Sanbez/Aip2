"use client"

import { useState, useEffect } from "react"
import { Home, Calendar, PlusCircle, Settings, User, Heart, Ticket, LogIn, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: "Главная", href: "/" },
  { icon: Calendar, label: "Афиша", href: "/afisha" },
  { icon: Heart, label: "Избранное", href: "/favorites" },
  { icon: Ticket, label: "Мои билеты", href: "/tickets" },
  { icon: PlusCircle, label: "Добавить событие", href: "/submit" },
  { icon: User, label: "Профиль", href: "/profile" },
  { icon: Settings, label: "Настройки", href: "/settings" },
]

export function SlidingSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [mouseNearEdge, setMouseNearEdge] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = 60
      if (e.clientX <= threshold) {
        setMouseNearEdge(true)
      } else if (e.clientX > 280) {
        setMouseNearEdge(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (mouseNearEdge) {
      setIsExpanded(true)
    } else {
      const timer = setTimeout(() => setIsExpanded(false), 300)
      return () => clearTimeout(timer)
    }
  }, [mouseNearEdge])

  return (
    <>
      {/* Trigger zone indicator */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-1 bg-foreground/10 z-50 transition-opacity duration-300",
          isExpanded ? "opacity-0" : "opacity-100",
        )}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300 ease-out",
          isExpanded ? "w-64 translate-x-0" : "w-64 -translate-x-full",
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setMouseNearEdge(false)}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-sidebar-foreground">City Offline</h1>
            <p className="text-sm text-muted-foreground mt-1">Афиша вашего города</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors group"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border pt-4 space-y-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full group"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
              <span className="font-medium">
                {mounted ? (theme === "dark" ? "Светлая тема" : "Тёмная тема") : "Тема"}
              </span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full group">
              <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Войти</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  )
}
