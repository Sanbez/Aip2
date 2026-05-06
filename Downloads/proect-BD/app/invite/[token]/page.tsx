import { redirect } from "next/navigation"
import Link from "next/link"
import { Users, Zap } from "lucide-react"
import { auth } from "@/lib/auth"
import { getInvitationByToken } from "@/features/projects/queries"
import { AcceptButton } from "./accept-button"
import { Role } from "@/lib/enums"
import { Button } from "@/components/ui/button"

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Администратор",
  MANAGER: "Менеджер",
  USER: "Участник",
}

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const session = await auth()

  const invitation = await getInvitationByToken(token)

  return (
    <div className="dashboard-bg dot-grid flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl shadow-md"
            style={{ background: "linear-gradient(135deg, oklch(0.67 0.24 285), oklch(0.60 0.22 240))" }}
          >
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-[16px] font-semibold tracking-tight">Flowboard</span>
        </div>

        <div className="card-gradient-border rounded-2xl p-8 text-center">
          {!invitation ? (
            <>
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <Users className="h-7 w-7" />
                </div>
              </div>
              <h1 className="text-[22px] font-bold">Ссылка недействительна</h1>
              <p className="mt-2 text-[13px] text-muted-foreground">
                Приглашение истекло или уже было использовано.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/projects">Перейти к проектам</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 flex justify-center">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl text-[18px] font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${invitation.project.color}, ${invitation.project.color}aa)`,
                  }}
                >
                  {invitation.project.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <h1 className="text-[22px] font-bold">Приглашение в проект</h1>
              <p className="mt-1 text-[14px] font-medium text-foreground/80">
                {invitation.project.name}
              </p>
              <p className="mt-3 text-[13px] text-muted-foreground">
                Вас приглашают присоединиться как{" "}
                <span className="font-medium text-foreground">
                  {ROLE_LABELS[invitation.role as Role]}
                </span>
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Действует до{" "}
                {new Date(invitation.expiresAt).toLocaleDateString("ru", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <div className="mt-6 space-y-2">
                {session?.user ? (
                  <AcceptButton token={token} />
                ) : (
                  <>
                    <p className="mb-3 text-[12px] text-muted-foreground">
                      Войдите в аккаунт, чтобы принять приглашение
                    </p>
                    <Button asChild className="w-full">
                      <Link href={`/login?callbackUrl=/invite/${token}`}>Войти</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/register?callbackUrl=/invite/${token}`}>Создать аккаунт</Link>
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
