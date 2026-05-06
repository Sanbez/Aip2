import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getProjectsForUser } from "@/features/projects/queries"
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog"
import { ProjectCard } from "@/features/projects/components/project-card"
import { Plus, Layers } from "lucide-react"

export default async function ProjectsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const projects = await getProjectsForUser(session.user.id)

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      {/* Page header */}
      <div className="border-b border-border/50 bg-white/[0.01] px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Проекты</h1>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              {projects.length === 0
                ? "Создай первый проект чтобы начать"
                : `${projects.length} ${projects.length === 1 ? "проект" : projects.length < 5 ? "проекта" : "проектов"}`}
            </p>
          </div>
          <CreateProjectDialog>
            <button className="btn-gradient flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-white">
              <Plus className="h-3.5 w-3.5" />
              Новый проект
            </button>
          </CreateProjectDialog>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.07] py-28 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03]">
              <Layers className="h-6 w-6 text-muted-foreground/40" />
            </div>
            <h2 className="text-[15px] font-semibold">Нет проектов</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Создай первый проект и начни управлять задачами
            </p>
            <CreateProjectDialog>
              <button className="btn-gradient mt-6 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white">
                <Plus className="h-3.5 w-3.5" />
                Создать проект
              </button>
            </CreateProjectDialog>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
