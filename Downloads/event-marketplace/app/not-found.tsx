import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-black text-primary/20">404</h1>
          <h2 className="text-2xl font-bold text-foreground">Страница не найдена</h2>
          <p className="text-muted-foreground">
            К сожалению, запрашиваемая страница не существует или была удалена.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              На главную
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/afisha">
              <Search className="w-4 h-4" />
              Афиша мероприятий
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
