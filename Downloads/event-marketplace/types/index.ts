// Event types
export interface Participant {
  id: string
  name: string
  avatar: string
}

export interface Host {
  id: string
  name: string
  avatar: string
  description: string
  eventsHosted: number
}

export type EventStatus = "pending" | "approved" | "rejected" | "archived"

export interface Event {
  id: string
  title: string
  description: string
  fullDescription: string
  image: string
  images?: string[]
  price: number
  isFree: boolean
  maxAttendees: number
  currentAttendees: number
  date: string
  time: string
  location: string
  address: string
  category: string
  organizer: string
  status: EventStatus
  tags: string[]
  // Pins
  isPromo?: boolean
  isFeatured?: boolean
  isExclusive?: boolean
  isNew?: boolean
  // Moderation metadata
  moderationComment?: string
  createdAt?: string
  moderatedAt?: string
  moderatedBy?: string
  host?: Host
  participants?: Participant[]
}

export interface EventPins {
  isPromo?: boolean
  isFeatured?: boolean
  isExclusive?: boolean
  isNew?: boolean
}

// Moderation types
export interface ModerationLog {
  id: string
  eventId: string
  eventTitle: string
  action: "approve" | "reject" | "delete" | "edit"
  moderatorId: string
  moderatorName: string
  comment?: string
  pins?: EventPins
  timestamp: string
}

// City types
export interface CityData {
  nominative: string
  short: "полна" | "полон" | "полно"
}

// Telegram auth types
export interface TelegramUser {
  id: string
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date?: number
  hash?: string
}

// Filter types
export type ViewMode = "grid" | "list"
export type SortOption = "date" | "price-asc" | "price-desc" | "popularity" | "name"
export type FilterChip = "all" | "promo" | "sports" | "board" | "theater" | "concerts"
export type PriceType = "all" | "free" | "paid"
export type AttendeesFilter = "all" | "small" | "medium" | "large"
