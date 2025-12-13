"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Города с формами для слогана "X полна событий"
// nominative (именительный) - кто? что? - Москва
// short (краткая форма прилагательного) - полон/полна/полно
export const cityData: Record<string, { nominative: string; short: "полна" | "полон" | "полно" }> = {
  "Анапа": { nominative: "Анапа", short: "полна" },
  "Москва": { nominative: "Москва", short: "полна" },
  "Санкт-Петербург": { nominative: "Санкт-Петербург", short: "полон" },
  "Новосибирск": { nominative: "Новосибирск", short: "полон" },
  "Екатеринбург": { nominative: "Екатеринбург", short: "полон" },
  "Казань": { nominative: "Казань", short: "полна" },
  "Нижний Новгород": { nominative: "Нижний Новгород", short: "полон" },
  "Челябинск": { nominative: "Челябинск", short: "полон" },
  "Самара": { nominative: "Самара", short: "полна" },
  "Уфа": { nominative: "Уфа", short: "полна" },
  "Ростов-на-Дону": { nominative: "Ростов-на-Дону", short: "полон" },
}

export const cities = Object.keys(cityData)

interface CityContextType {
  selectedCity: string
  setSelectedCity: (city: string) => void
}

const CityContext = createContext<CityContextType | undefined>(undefined)

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCityState] = useState("Анапа")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCity = localStorage.getItem("selectedCity")
    if (savedCity && cities.includes(savedCity)) {
      setSelectedCityState(savedCity)
    }
  }, [])

  const setSelectedCity = (city: string) => {
    setSelectedCityState(city)
    localStorage.setItem("selectedCity", city)
  }

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCity() {
  const context = useContext(CityContext)
  if (context === undefined) {
    throw new Error("useCity must be used within a CityProvider")
  }
  return context
}
