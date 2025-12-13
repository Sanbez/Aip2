import { Badge } from "@/components/ui/badge"
import { Flame, Star, Gem, Sparkles } from "lucide-react"
import { Event } from "@/lib/events-data"

interface EventPinsBadgesProps {
  event: Event
}

export function EventPinsBadges({ event }: EventPinsBadgesProps) {
  const hasPins = event.isPromo || event.isFeatured || event.isExclusive || event.isNew

  if (!hasPins) {
    return <span className="text-muted-foreground text-sm">—</span>
  }

  return (
    <div className="flex flex-wrap gap-1">
      {event.isPromo && (
        <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
          <Flame className="w-3 h-3 mr-1" />
          Промо
        </Badge>
      )}
      {event.isFeatured && (
        <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-0">
          <Star className="w-3 h-3 mr-1" />
          Featured
        </Badge>
      )}
      {event.isExclusive && (
        <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0">
          <Gem className="w-3 h-3 mr-1" />
          Exclusive
        </Badge>
      )}
      {event.isNew && (
        <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">
          <Sparkles className="w-3 h-3 mr-1" />
          New
        </Badge>
      )}
    </div>
  )
}
