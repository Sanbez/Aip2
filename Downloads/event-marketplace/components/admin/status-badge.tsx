import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, XCircle, Archive } from "lucide-react"
import { Event } from "@/lib/events-data"

interface StatusBadgeProps {
  status: Event['status']
}

const statusConfig = {
  pending: {
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-300",
    label: "На модерации",
    icon: Clock,
  },
  approved: {
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-300",
    label: "Опубликовано",
    icon: CheckCircle,
  },
  rejected: {
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-300",
    label: "Отклонено",
    icon: XCircle,
  },
  archived: {
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 border-gray-300",
    label: "Архив",
    icon: Archive,
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge className={`${config.color} border`} variant="outline">
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  )
}
