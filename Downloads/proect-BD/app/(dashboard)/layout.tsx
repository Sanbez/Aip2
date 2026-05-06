import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getProjectsForUser } from "@/features/projects/queries"
import { AppSidebar } from "@/components/app-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const projects = await getProjectsForUser(session.user.id)

  return (
    <div className="dashboard-bg dot-grid flex h-svh w-full overflow-hidden">
      <AppSidebar
        projects={projects.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          color: p.color,
          taskCount: p._count.tasks,
        }))}
        user={{
          id: session.user.id,
          name: session.user.name ?? null,
          email: session.user.email ?? null,
          avatarUrl: session.user.image ?? null,
        }}
      />
      <main className="dashboard-main flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  )
}
