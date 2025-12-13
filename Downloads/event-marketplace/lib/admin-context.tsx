"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AdminContextType {
  isAdmin: boolean
  checkIsAdmin: (userId: string) => boolean
  adminUserIds: string[]
  addAdmin: (userId: string) => void
  removeAdmin: (userId: string) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const ADMIN_STORAGE_KEY = "event-marketplace-admins"

// Список ID администраторов по умолчанию (можно добавить свой ID)
const DEFAULT_ADMINS = ["demo_admin_1", "demo_admin_2"]

export function AdminProvider({ children }: { children: ReactNode }) {
  const [adminUserIds, setAdminUserIds] = useState<string[]>(DEFAULT_ADMINS)
  const [isAdmin, setIsAdmin] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Загрузка списка администраторов из localStorage
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY)
    if (stored) {
      try {
        const parsedAdmins = JSON.parse(stored)
        setAdminUserIds(parsedAdmins)
      } catch (error) {
        console.error("Error loading admin list:", error)
        setAdminUserIds(DEFAULT_ADMINS)
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(DEFAULT_ADMINS))
      }
    } else {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(DEFAULT_ADMINS))
    }

    // Все пользователи теперь имеют права администратора
    setIsAdmin(true)
  }, [])

  // Сохранение списка администраторов при изменении
  useEffect(() => {
    if (mounted && adminUserIds.length > 0) {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUserIds))
    }
  }, [adminUserIds, mounted])

  // Проверка является ли пользователь администратором
  const checkIsAdmin = (userId: string): boolean => {
    return adminUserIds.includes(userId)
  }

  // Добавление администратора
  const addAdmin = (userId: string) => {
    if (!adminUserIds.includes(userId)) {
      setAdminUserIds(prev => [...prev, userId])
    }
  }

  // Удаление администратора
  const removeAdmin = (userId: string) => {
    setAdminUserIds(prev => prev.filter(id => id !== userId))

    // Если удаляем текущего пользователя
    const currentUserId = localStorage.getItem("userId")
    if (currentUserId === userId) {
      setIsAdmin(false)
    }
  }

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        checkIsAdmin,
        adminUserIds,
        addAdmin,
        removeAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
