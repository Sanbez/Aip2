/**
 * Calculates the number of days until an event and returns a localized string
 * @param eventDate - The date of the event in ISO format (YYYY-MM-DD)
 * @returns Localized string describing days until the event
 */
export function getDaysUntil(eventDate: string): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const date = new Date(eventDate)
  date.setHours(0, 0, 0, 0)
  const diffTime = date.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Сегодня"
  if (diffDays === 1) return "Завтра"
  if (diffDays < 0) return "Прошло"

  return `${formatDaysPlural(diffDays)}`
}

/**
 * Formats days with correct Russian plural form
 * @param days - Number of days
 * @returns Formatted string with correct plural form
 */
export function formatDaysPlural(days: number): string {
  const lastDigit = days % 10
  const lastTwoDigits = days % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `Через ${days} дней`
  }
  if (lastDigit === 1) {
    return `Через ${days} день`
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `Через ${days} дня`
  }
  return `Через ${days} дней`
}

/**
 * Formats a date to Russian locale string
 * @param dateString - The date string in ISO format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }
): string {
  return new Date(dateString).toLocaleDateString("ru-RU", options)
}

/**
 * Formats a price to Russian locale string
 * @param price - The price number
 * @returns Formatted price string with currency
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString("ru-RU")} ₽`
}

/**
 * Generate a unique ID
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 */
export function generateId(prefix: string = "id"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}
