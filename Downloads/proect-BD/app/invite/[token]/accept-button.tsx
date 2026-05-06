"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { acceptInvitation } from "@/features/projects/actions"
import { Button } from "@/components/ui/button"

export function AcceptButton({ token }: { token: string }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function handleAccept() {
    setPending(true)
    const result = await acceptInvitation(token)
    if (result.success) {
      toast.success("Добро пожаловать в проект!")
      router.push(`/projects/${result.data.slug}/board`)
    } else {
      toast.error(result.error)
      setPending(false)
    }
  }

  return (
    <Button onClick={handleAccept} disabled={pending} className="w-full gap-2">
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      Принять приглашение
    </Button>
  )
}
