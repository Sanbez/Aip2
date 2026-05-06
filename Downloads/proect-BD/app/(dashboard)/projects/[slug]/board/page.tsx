import { notFound, redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getProjectBySlug } from "@/features/projects/queries"
import { getKanbanBoard } from "@/features/tasks/queries"
import { KanbanBoard } from "@/features/tasks/components/kanban-board"
import { BoardPageHeader } from "@/features/tasks/components/board-page-header"

export default async function BoardPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const project = await getProjectBySlug(slug, session.user.id)
  if (!project) notFound()

  const columns = await getKanbanBoard(project.id)

  const members = project.members
    .filter((m) => m.user && m.user.email)
    .map((m) => ({
      id: m.user!.id,
      name: m.user!.name,
      email: m.user!.email as string,
      avatarUrl: m.user!.avatarUrl,
    }))

  return (
    <div className="flex h-full min-h-0 flex-col">
      <BoardPageHeader project={project} members={members} taskCount={project._count.tasks} />
      <KanbanBoard
        initialColumns={columns}
        projectId={project.id}
        projectSlug={slug}
        members={members}
      />
    </div>
  )
}
