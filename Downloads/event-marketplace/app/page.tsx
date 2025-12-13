"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { SearchFilters } from "@/components/search-filters"
import { EventsCarousel } from "@/components/events-carousel"
import { EventsGrid } from "@/components/events-grid"
import { EventCardFeatured } from "@/components/event-card-featured"
import { type Event } from "@/lib/events-data"
import { useEvents } from "@/lib/events-context"
import { Sparkles, LayoutGrid, List, ArrowUpDown, Flame, Dumbbell, Gamepad2, Theater, Music } from "lucide-react"
import { useCity, cityData } from "@/lib/city-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ViewMode = "grid" | "list"
type SortOption = "date" | "price-asc" | "price-desc" | "popularity" | "name"
type FilterChip = "all" | "promo" | "sports" | "board" | "theater" | "concerts"

const sortLabels: Record<SortOption, string> = {
  "date": "По дате",
  "price-asc": "По цене (сначала дешевые)",
  "price-desc": "По цене (сначала дорогие)",
  "popularity": "По популярности",
  "name": "По названию",
}

const filterChips: { id: FilterChip; label: string; icon: React.ReactNode; categories?: string[] }[] = [
  { id: "all", label: "Все", icon: null },
  { id: "promo", label: "Промо", icon: <Flame className="w-4 h-4" /> },
  { id: "sports", label: "Спортивные", icon: <Dumbbell className="w-4 h-4" />, categories: ["Покер", "Шахматы"] },
  { id: "board", label: "Настолки", icon: <Gamepad2 className="w-4 h-4" />, categories: ["Настольные игры"] },
  { id: "theater", label: "Театры", icon: <Theater className="w-4 h-4" />, categories: ["Спектакли"] },
  { id: "concerts", label: "Концерты", icon: <Music className="w-4 h-4" />, categories: ["Концерты"] },
]

export default function HomePage() {
  const router = useRouter()
  const { selectedCity } = useCity()
  const { events } = useEvents()
  const [searchValue, setSearchValue] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Все категории")
  const [priceType, setPriceType] = useState("all")
  const [attendeesFilter, setAttendeesFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortOption, setSortOption] = useState<SortOption>("date")
  const [activeChip, setActiveChip] = useState<FilterChip>("all")

  const handleEventClick = (event: Event) => {
    router.push(`/event/${event.id}`)
  }

  // Only show approved events to regular users
  const approvedEvents = useMemo(() => {
    return events.filter(event => event.status === 'approved')
  }, [events])

  // Get all event dates for calendar
  const eventDates = useMemo(() => {
    return [...new Set(approvedEvents.map((event) => event.date))]
  }, [approvedEvents])

  const filteredEvents = useMemo(() => {
    const filtered = approvedEvents.filter((event) => {
      // Date filter
      if (selectedDate && event.date !== selectedDate) {
        return false
      }

      // Chip filter
      if (activeChip !== "all") {
        const chipConfig = filterChips.find(c => c.id === activeChip)
        if (activeChip === "promo") {
          if (!event.isPromo) return false
        } else if (chipConfig?.categories) {
          if (!chipConfig.categories.includes(event.category)) return false
        }
      }

      // Search filter
      if (searchValue) {
        const searchLower = searchValue.toLowerCase()
        const matchesSearch =
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.category.toLowerCase().includes(searchLower) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategory !== "Все категории" && event.category !== selectedCategory) {
        return false
      }

      // Price type filter
      if (priceType === "free" && !event.isFree) {
        return false
      }
      if (priceType === "paid" && event.isFree) {
        return false
      }

      // Attendees filter
      if (attendeesFilter !== "all") {
        if (attendeesFilter === "small" && event.maxAttendees > 50) return false
        if (attendeesFilter === "medium" && (event.maxAttendees < 50 || event.maxAttendees > 500)) return false
        if (attendeesFilter === "large" && event.maxAttendees < 500) return false
      }

      return true
    })

    // Sort filtered events by selected sort option (без приоритета для промо)
    return filtered.sort((a, b) => {
      switch (sortOption) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "price-asc":
          return (a.isFree ? 0 : a.price) - (b.isFree ? 0 : b.price)
        case "price-desc":
          return (b.isFree ? 0 : b.price) - (a.isFree ? 0 : a.price)
        case "popularity":
          return b.currentAttendees - a.currentAttendees
        case "name":
          return a.title.localeCompare(b.title, "ru")
        default:
          return 0
      }
    })
  }, [approvedEvents, searchValue, selectedCategory, priceType, attendeesFilter, selectedDate, sortOption, activeChip])

  // Get featured events for carousel (top 10 by attendance)
  const featuredEvents = useMemo(() => {
    return [...approvedEvents].sort((a, b) => b.currentAttendees - a.currentAttendees).slice(0, 10)
  }, [approvedEvents])

  // Get promo and hot events for large cards section
  const promoAndHotEvents = useMemo(() => {
    return approvedEvents.filter((event) => {
      const isHot = (event.currentAttendees / event.maxAttendees) >= 0.8
      return event.isPromo || isHot
    })
  }, [approvedEvents])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Header />

      {/* Main Content */}
      <main className="px-4 lg:px-8 relative z-10">
        {/* Hero Section - Enhanced */}
        <section className="relative py-12 px-4 lg:px-8 min-h-[600px]">
          <div className="max-w-7xl mx-auto text-center space-y-6 relative">
            {/* Scattered Colorful Info Cards - Small and on edges */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Purple Card - Top Left */}
              <div
                className="absolute top-1 left-1 md:top-2 md:left-2 w-28 md:w-32 p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg shadow-purple-500/20 hover:scale-110 transition-all duration-300 pointer-events-auto animate-float cursor-pointer"
                style={{ '--rotate': '-6deg' } as React.CSSProperties}
              >
                <div className="flex flex-col items-center gap-1.5 text-white">
                  <Sparkles className="w-4 h-4" />
                  <p className="font-semibold text-[10px] md:text-xs text-center leading-tight">Мероприятия рядом с вами</p>
                </div>
              </div>

              {/* Blue Card - Top Right */}
              <div
                className="absolute top-1 right-1 md:top-2 md:right-2 w-28 md:w-32 p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/20 hover:scale-110 transition-all duration-300 pointer-events-auto animate-float animation-delay-1000 cursor-pointer"
                style={{ '--rotate': '6deg' } as React.CSSProperties}
              >
                <div className="flex flex-col items-center gap-1.5 text-white">
                  <Sparkles className="w-4 h-4" />
                  <p className="font-semibold text-[10px] md:text-xs text-center leading-tight">Найди интересную компанию</p>
                </div>
              </div>

              {/* Pink Card - Bottom Left */}
              <div
                className="absolute bottom-1 left-1 md:bottom-2 md:left-2 w-28 md:w-32 p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/20 hover:scale-110 transition-all duration-300 pointer-events-auto animate-float animation-delay-2000 cursor-pointer"
                style={{ '--rotate': '3deg' } as React.CSSProperties}
              >
                <div className="flex flex-col items-center gap-1.5 text-white">
                  <Sparkles className="w-4 h-4" />
                  <p className="font-semibold text-[10px] md:text-xs text-center leading-tight">Найди вторую половинку</p>
                </div>
              </div>

              {/* Green Card - Bottom Right */}
              <div
                className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-28 md:w-32 p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20 hover:scale-110 transition-all duration-300 pointer-events-auto animate-float animation-delay-3000 cursor-pointer"
                style={{ '--rotate': '-3deg' } as React.CSSProperties}
              >
                <div className="flex flex-col items-center gap-1.5 text-white">
                  <Sparkles className="w-4 h-4" />
                  <p className="font-semibold text-[10px] md:text-xs text-center leading-tight">Открой для себя что-то новое</p>
                </div>
              </div>
            </div>

            {/* Main Title with Gradient */}
            <div className="relative z-10 py-8 px-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {selectedCity}
                </span>{" "}
                <span className="block mt-2">{cityData[selectedCity]?.short || "полон"} событий — выбери своё</span>
              </h1>

              {/* Search & Filters with Date Calendar inside */}
              <div className="pt-6">
                <SearchFilters
                  searchValue={searchValue}
                  selectedCategory={selectedCategory}
                  priceType={priceType}
                  attendeesFilter={attendeesFilter}
                  selectedDate={selectedDate}
                  eventDates={eventDates}
                  onSearchChange={setSearchValue}
                  onCategoryChange={setSelectedCategory}
                  onPriceTypeChange={setPriceType}
                  onAttendeesChange={setAttendeesFilter}
                  onDateSelect={setSelectedDate}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid - Main Content */}
        <section className="py-6 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Filter Chips */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {filterChips.map((chip) => (
                <Button
                  key={chip.id}
                  variant={activeChip === chip.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveChip(chip.id)}
                  className={cn(
                    "rounded-full gap-2 whitespace-nowrap transition-all duration-300",
                    activeChip === chip.id
                      ? chip.id === "promo"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30"
                        : "shadow-lg"
                      : "hover:scale-105"
                  )}
                >
                  {chip.icon}
                  {chip.label}
                </Button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-1">Все мероприятия</h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {filteredEvents.length}
                  </span>
                  мероприятий найдено
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      <span className="hidden sm:inline">{sortLabels[sortOption]}</span>
                      <span className="sm:hidden">Сортировка</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setSortOption(option)}
                        className={sortOption === option ? "bg-accent" : ""}
                      >
                        {sortLabels[option]}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <EventsGrid events={filteredEvents} onEventClick={handleEventClick} viewMode={viewMode} />
          </div>
        </section>

        {/* Featured Carousel */}
        <section className="py-8 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <EventsCarousel events={featuredEvents} onEventClick={handleEventClick} />
          </div>
        </section>

        {/* Promo and Hot Events - Large Cards */}
        {promoAndHotEvents.length > 0 && (
          <section className="py-8 px-4 lg:px-8 pb-20">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-2">Горячие предложения</h2>
                <p className="text-muted-foreground">Популярные и эксклюзивные мероприятия</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promoAndHotEvents.map((event, index) => (
                  <EventCardFeatured
                    key={event.id}
                    event={event}
                    onDetailsClick={handleEventClick}
                    priority={index === 0}
                    delay={index * 100}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
