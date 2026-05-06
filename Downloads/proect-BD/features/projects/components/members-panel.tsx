"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Copy, Link2, Loader2, Plus, Shield, Trash2, UserMinus } from "lucide-react"
import { Role } from "@/lib/enums"
import {
  addProjectMember,
  generateInviteLink,
  removeMember,
  revokeInvitation,
  updateMemberRole,
} from "@/features/projects/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(() => execCopy(text))
  }
  return execCopy(text)
}

function execCopy(text: string): Promise<void> {
  const el = document.createElement("textarea")
  el.value = text
  el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0"
  document.body.appendChild(el)
  el.focus()
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
  return Promise.resolve()
}

const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Администратор",
  MANAGER: "Менеджер",
  USER: "Участник",
}

const ROLE_COLORS: Record<Role, string> = {
  ADMIN: "bg-red-500/10 text-red-500 border-red-500/20",
  MANAGER: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  USER: "bg-foreground/5 text-muted-foreground border-border",
}

type Member = {
  id: string
  userId: string
  role: Role
  joinedAt: Date
  user: { id: string; name: string | null; email: string; avatarUrl: string | null } | null
}

type ActiveInvitation = {
  id: string
  token: string
  role: Role
  expiresAt: Date
}

type Props = {
  projectId: string
  projectSlug: string
  ownerId: string
  callerId: string
  callerRole: Role
  members: Member[]
  activeInvitations: ActiveInvitation[]
}

function Avatar({ name, avatarUrl, size = 8 }: { name: string | null; avatarUrl: string | null; size?: number }) {
  const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() ?? "?"
  const cls = `h-${size} w-${size} rounded-full`
  if (avatarUrl) return <img src={avatarUrl} alt={name ?? ""} className={`${cls} object-cover`} />
  return (
    <span className={`flex ${cls} items-center justify-center bg-foreground/10 text-[11px] font-medium`}>
      {initials}
    </span>
  )
}

export function MembersPanel({
  projectId,
  projectSlug,
  ownerId,
  callerId,
  callerRole,
  members,
  activeInvitations,
}: Props) {
  const router = useRouter()
  const [, startTransition] = useTransition()

  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<Role>(Role.USER)
  const [inviting, setInviting] = useState(false)

  const [linkRole, setLinkRole] = useState<Role>(Role.USER)
  const [generatingLink, setGeneratingLink] = useState(false)

  const canManage = callerRole === Role.ADMIN || callerRole === Role.MANAGER
  const isOwner = callerId === ownerId

  async function handleInviteByEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!inviteEmail.trim() || inviting) return
    setInviting(true)
    const result = await addProjectMember({ projectId, email: inviteEmail.trim(), role: inviteRole })
    if (result.success) {
      toast.success("Участник добавлен")
      setInviteEmail("")
      startTransition(() => router.refresh())
    } else {
      toast.error(result.error)
    }
    setInviting(false)
  }

  async function handleGenerateLink() {
    if (generatingLink) return
    setGeneratingLink(true)
    const result = await generateInviteLink({ projectId, role: linkRole })
    if (result.success) {
      const url = `${window.location.origin}/invite/${result.data.token}`
      try {
        await copyToClipboard(url)
        toast.success("Ссылка скопирована в буфер обмена")
      } catch {
        toast.success(`Ссылка создана: ${url}`)
      }
      startTransition(() => router.refresh())
    } else {
      toast.error(result.error)
    }
    setGeneratingLink(false)
  }

  async function handleCopyLink(token: string) {
    const url = `${window.location.origin}/invite/${token}`
    await copyToClipboard(url)
    toast.success("Ссылка скопирована")
  }

  async function handleRemoveMember(userId: string, userName: string | null) {
    if (!confirm(`Удалить ${userName ?? "участника"} из проекта?`)) return
    const result = await removeMember({ projectId, userId })
    if (result.success) {
      toast.success("Участник удалён")
      startTransition(() => router.refresh())
    } else {
      toast.error(result.error)
    }
  }

  async function handleRoleChange(userId: string, role: Role) {
    const result = await updateMemberRole({ projectId, userId, role })
    if (result.success) {
      toast.success("Роль обновлена")
      startTransition(() => router.refresh())
    } else {
      toast.error(result.error)
    }
  }

  async function handleRevokeInvitation(invitationId: string) {
    const result = await revokeInvitation(invitationId)
    if (result.success) {
      toast.success("Приглашение отозвано")
      startTransition(() => router.refresh())
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Members list */}
      <section>
        <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
          Участники · {members.length}
        </h2>
        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
          {members.map((m) => {
            const isCurrentOwner = m.userId === ownerId
            const canEditThisMember = isOwner && !isCurrentOwner
            const canRemoveThisMember = canManage && !isCurrentOwner && m.userId !== callerId

            return (
              <div key={m.id} className="flex items-center gap-3 bg-card/40 px-4 py-3">
                <Avatar name={m.user?.name ?? null} avatarUrl={m.user?.avatarUrl ?? null} />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium">
                    {m.user?.name ?? m.user?.email ?? "Пользователь"}
                    {isCurrentOwner && (
                      <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Shield className="h-3 w-3" /> Владелец
                      </span>
                    )}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">{m.user?.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  {canEditThisMember ? (
                    <Select
                      value={m.role}
                      onValueChange={(v) => handleRoleChange(m.userId, v as Role)}
                    >
                      <SelectTrigger className="h-7 w-36 text-[12px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Role).map((r) => (
                          <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${ROLE_COLORS[m.role]}`}>
                      {ROLE_LABELS[m.role]}
                    </span>
                  )}
                  {canRemoveThisMember && (
                    <button
                      onClick={() => handleRemoveMember(m.userId, m.user?.name ?? null)}
                      className="rounded-md p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Удалить участника"
                    >
                      <UserMinus className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {canManage && (
        <>
          <Separator />

          {/* Invite by email */}
          <section>
            <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
              Пригласить по email
            </h2>
            <p className="mb-4 text-[12px] text-muted-foreground">
              Пользователь должен быть зарегистрирован в системе.
            </p>
            <form onSubmit={handleInviteByEmail} className="flex gap-2">
              <Input
                type="email"
                placeholder="email@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 h-9 text-[13px]"
                disabled={inviting}
              />
              <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as Role)}>
                <SelectTrigger className="h-9 w-36 text-[13px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Role).map((r) => (
                    <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit" size="sm" className="h-9 gap-1.5" disabled={inviting || !inviteEmail.trim()}>
                {inviting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                Добавить
              </Button>
            </form>
          </section>

          <Separator />

          {/* Invite link */}
          <section>
            <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
              Пригласительная ссылка
            </h2>
            <p className="mb-4 text-[12px] text-muted-foreground">
              Ссылка действует 7 дней. Любой, у кого есть ссылка, сможет вступить в проект.
            </p>
            <div className="flex gap-2">
              <Select value={linkRole} onValueChange={(v) => setLinkRole(v as Role)}>
                <SelectTrigger className="h-9 w-36 text-[13px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Role).map((r) => (
                    <SelectItem key={r} value={r}>{ROLE_LABELS[r]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5"
                onClick={handleGenerateLink}
                disabled={generatingLink}
              >
                {generatingLink
                  ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  : <Link2 className="h-3.5 w-3.5" />}
                Создать и скопировать ссылку
              </Button>
            </div>

            {/* Active invitations */}
            {activeInvitations.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-[11px] font-medium text-muted-foreground">Активные ссылки</p>
                {activeInvitations.map((inv) => {
                  const daysLeft = Math.ceil((inv.expiresAt.getTime() - Date.now()) / 86400000)
                  return (
                    <div key={inv.id} className="flex items-center gap-2 rounded-lg border border-border bg-card/40 px-3 py-2">
                      <Link2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${ROLE_COLORS[inv.role]}`}>
                        {ROLE_LABELS[inv.role]}
                      </span>
                      <span className="flex-1 truncate font-mono text-[11px] text-muted-foreground">
                        /invite/{inv.token.slice(0, 16)}…
                      </span>
                      <span className="text-[11px] text-muted-foreground shrink-0">
                        {daysLeft}д
                      </span>
                      <button
                        onClick={() => handleCopyLink(inv.token)}
                        className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
                        title="Скопировать ссылку"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleRevokeInvitation(inv.id)}
                        className="rounded p-1 text-muted-foreground hover:text-destructive transition-colors"
                        title="Отозвать ссылку"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}
