"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { categories } from "@/lib/events-data"
import { DateCalendar } from "@/components/date-calendar"
import { cn } from "@/lib/utils"

interface SearchFiltersProps {
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onPriceTypeChange: (value: string) => void
  onAttendeesChange: (value: string) => void
  onDateSelect?: (date: string | null) => void
  searchValue: string
  selectedCategory: string
  priceType: string
  attendeesFilter: string
  selectedDate?: string | null
  eventDates?: string[]
}

export function SearchFilters({
  onSearchChange,
  onCategoryChange,
  onPriceTypeChange,
  onAttendeesChange,
  onDateSelect,
  searchValue,
  selectedCategory,
  priceType,
  attendeesFilter,
  selectedDate,
  eventDates = [],
}: SearchFiltersProps) {
  const hasActiveFilters =
    selectedCategory !== "Все категории" || priceType !== "all" || attendeesFilter !== "all"

  const clearFilters = () => {
    onCategoryChange("Все категории")
    onPriceTypeChange("all")
    onAttendeesChange("all")
    onSearchChange("")
    if (onDateSelect) onDateSelect(null)
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Поиск мероприятий..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-14 pl-12 pr-4 text-lg bg-card border-border rounded-xl focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Active Filters Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Активные фильтры:</span>
          {selectedCategory !== "Все категории" && (
            <Badge variant="secondary" className="gap-1">
              {selectedCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onCategoryChange("Все категории")} />
            </Badge>
          )}
          {priceType !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {priceType === "free" ? "Бесплатные" : "Платные"}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onPriceTypeChange("all")} />
            </Badge>
          )}
          {attendeesFilter !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {attendeesFilter === "small"
                ? "До 50 человек"
                : attendeesFilter === "medium"
                  ? "50-500 человек"
                  : "Более 500 человек"}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onAttendeesChange("all")} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            Сбросить все
          </Button>
        </div>
      )}

      {/* Expanded Filters - Always visible */}
      <div className="space-y-6 p-6 bg-card rounded-xl border border-border">
          {/* Date Calendar */}
          {onDateSelect && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground text-center block">Выберите дату</label>
              <DateCalendar
                selectedDate={selectedDate || null}
                onDateSelect={onDateSelect}
                eventDates={eventDates}
              />
            </div>
          )}

          {/* Other Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category */}
            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-foreground text-center">Категория</label>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="bg-input border-border w-full max-w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Type Buttons */}
            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-foreground text-center">Тип мероприятия</label>
              <div className="flex gap-2 flex-wrap justify-center">
                <Button
                  variant={priceType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPriceTypeChange("all")}
                  className="min-w-[80px]"
                >
                  Все
                </Button>
                <Button
                  variant={priceType === "free" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPriceTypeChange("free")}
                  className="min-w-[80px]"
                >
                  Бесплатные
                </Button>
                <Button
                  variant={priceType === "paid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPriceTypeChange("paid")}
                  className="min-w-[80px]"
                >
                  Платные
                </Button>
              </div>
            </div>

            {/* Attendees */}
            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-foreground text-center">Количество участников</label>
              <Select value={attendeesFilter} onValueChange={onAttendeesChange}>
                <SelectTrigger className="bg-input border-border w-full max-w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Любое количество</SelectItem>
                  <SelectItem value="small">До 50 человек</SelectItem>
                  <SelectItem value="medium">50-500 человек</SelectItem>
                  <SelectItem value="large">Более 500 человек</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
    </div>
  )
}
