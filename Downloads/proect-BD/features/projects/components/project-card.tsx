import Link from "next/link"
import { CheckSquare, Users, ArrowRight } from "lucide-react"

type Props = {
  project: {
    id: string
    name: string
    slug: string
    description: string | null
    color: string
    _count: { tasks: number; members: number }
    owner: { id: string; name: string | null; avatarUrl: string | null }
  }
}

export function ProjectCard({ project }: Props) {
  const initials = project.name.slice(0, 2).toUpperCase()

  return (
    <Link
      href={`/projects/${project.slug}/board`}
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--elev-shadow)",
      }}
    >
      {/* Gradient border top glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${project.color}22, transparent 60%)`,
        }}
      />

      {/* Bottom purple ambient glow */}
      <div
        className="absolute bottom-0 left-[15%] right-[15%] h-[50%] pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${project.color}55, ${project.color}22 40%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Color accent line top */}
      <div
        className="h-[2px] w-full shrink-0 relative z-10"
        style={{
          background: `linear-gradient(90deg, ${project.color}, ${project.color}44, transparent)`,
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col gap-4 p-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold uppercase transition-transform duration-200 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${project.color}30, ${project.color}12)`,
              color: project.color,
              border: `1px solid ${project.color}28`,
              boxShadow: `0 0 20px ${project.color}20, inset 0 1px 0 ${project.color}18`,
            }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[14px] font-semibold leading-snug tracking-tight">
              {project.name}
            </h3>
            {project.description ? (
              <p className="mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            ) : (
              <p className="mt-0.5 text-[12px] italic text-muted-foreground/40">Нет описания</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-auto flex items-center gap-0 rounded-xl px-3 py-2.5"
          style={{
            background: "oklch(from var(--foreground) l c h / 0.04)",
            border: "1px solid var(--border)",
          }}
        >
          <span className="flex flex-1 items-center gap-1.5 text-[11.5px] text-muted-foreground">
            <CheckSquare className="h-3 w-3" style={{ color: project.color + "cc" }} />
            <span className="tnum font-medium text-foreground/75">{project._count.tasks}</span>
            <span className="text-muted-foreground/50">задач</span>
          </span>
          <div className="mx-2 h-3 w-px bg-border" />
          <span className="flex flex-1 items-center gap-1.5 text-[11.5px] text-muted-foreground">
            <Users className="h-3 w-3" />
            <span className="tnum font-medium text-foreground/75">{project._count.members}</span>
            <span className="text-muted-foreground/50">участников</span>
          </span>
          <div className="mx-2 h-3 w-px bg-border" />
          <span className="flex items-center gap-1 text-[11.5px] font-medium text-muted-foreground/50 transition-colors duration-150 group-hover:text-primary">
            Доска
            <ArrowRight className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
