import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Settings } from "lucide-react"
import { auth } from "@/lib/auth"
import { getProjectSettings } from "@/features/projects/queries"
import { MembersPanel } from "@/features/projects/components/members-panel"
import { Role } from "@/lib/enums"

export default async function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const project = await getProjectSettings(slug, session.user.id)
  if (!project) notFound()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="shrink-0 border-b border-border px-6 py-4">
        <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
          <Link href="/projects" className="hover:text-foreground transition-colors">Проекты</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href={`/projects/${slug}/board`} className="hover:text-foreground transition-colors">
            {project.name}
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground">Настройки</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-[19px] font-semibold tracking-tight">Настройки проекта</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-8">
          <MembersPanel
            projectId={project.id}
            projectSlug={slug}
            ownerId={project.ownerId}
            callerId={session.user.id}
            callerRole={project.callerRole as Role}
            members={project.members.map((m) => ({
              ...m,
              joinedAt: m.joinedAt as unknown as Date,
              role: m.role as Role,
              user: m.user
                ? {
                    id: m.user.id,
                    name: m.user.name,
                    email: m.user.email ?? "",
                    avatarUrl: m.user.avatarUrl,
                  }
                : null,
            }))}
            activeInvitations={project.activeInvitations.map((inv) => ({
              ...inv,
              role: inv.role as Role,
              expiresAt: inv.expiresAt as unknown as Date,
            }))}
          />
        </div>
      </div>
    </div>
  )
}
