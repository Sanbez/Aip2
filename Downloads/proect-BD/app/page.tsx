import Link from "next/link"
import { redirect } from "next/navigation"
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Layers3,
  Sparkles,
  Users2,
  Zap,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"

const featurePills = ["Канбан-доска", "Командная работа", "Комментарии", "Дедлайны"]

const highlights = [
  {
    icon: Layers3,
    title: "Прозрачный рабочий поток",
    description: "Видно, кто чем занят, что блокирует команду и куда двигаться дальше.",
  },
  {
    icon: Users2,
    title: "Удобно для команды",
    description: "Обсуждайте задачи, назначайте ответственных и держите контекст в одном месте.",
  },
  {
    icon: Clock3,
    title: "Быстрый старт",
    description: "Создайте проект за минуту и сразу переходите к работе без перегруженного интерфейса.",
  },
]

const boardColumns = [
  {
    title: "Backlog",
    count: 8,
    badgeClassName: "bg-muted text-muted-foreground",
    tasks: [
      { title: "Интервью пользователей", meta: "Research" },
      { title: "Новый onboarding", meta: "Product" },
    ],
  },
  {
    title: "In Progress",
    count: 3,
    badgeClassName: "bg-primary/12 text-primary",
    tasks: [
      { title: "Личный кабинет", meta: "Frontend" },
      { title: "API для комментариев", meta: "Backend" },
    ],
  },
  {
    title: "Review",
    count: 2,
    badgeClassName: "bg-status-amber/15 text-status-amber",
    tasks: [
      { title: "Дизайн-система", meta: "UI" },
      { title: "Роли в проекте", meta: "Access" },
    ],
  },
]

export default async function RootPage() {
  const session = await auth()
  if (session?.user) redirect("/projects")

  return (
    <div className="flex min-h-screen">
      <div className="hero-panel relative hidden w-[480px] shrink-0 flex-col overflow-hidden lg:flex">
        <div className="orb-violet absolute -top-32 -left-24 opacity-80" />
        <div className="orb-indigo absolute bottom-0 right-0 translate-x-1/3 translate-y-1/4 opacity-60" />
        <div className="dot-grid absolute inset-0 opacity-60" />

        <div className="relative z-10 flex flex-1 flex-col px-12 py-10">
          <div className="flex items-center gap-2.5">
            <div className="grd-primary flex h-8 w-8 items-center justify-center rounded-lg shadow-lg shadow-violet-500/30">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-[15px] font-semibold text-white/90">Flowboard</span>
          </div>

          <div className="mt-auto">
            <h1 className="text-4xl font-bold leading-tight text-white">
              Управляй проектами
              <br />
              <span className="text-gradient">без лишнего шума</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              Всё, что нужно команде для планирования, досок и ежедневной работы, собрано в одном спокойном интерфейсе.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {featurePills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/60"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <p className="relative mt-10 text-[11px] text-white/25">
            © {new Date().getFullYear()} Flowboard
          </p>
        </div>
      </div>

      <main className="app-bg relative flex flex-1 overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40" />

        <div className="relative z-10 flex w-full flex-col px-6 py-6 lg:px-10 lg:py-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="grd-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-semibold">Flowboard</span>
            </div>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-6xl flex-1 items-center py-8">
            <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,420px)]">
              <section className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-1.5 text-[12px] text-muted-foreground shadow-sm backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  Работайте с задачами быстрее и спокойнее
                </div>

                <h2 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  Главная рабочая доска для проектов, задач и командного ритма
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Flowboard помогает держать фокус: меньше лишних переходов, больше ясности по задачам, срокам и статусам.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/register"
                    className="btn-gradient inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-white"
                  >
                    Создать аккаунт
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-xl border-border/70 bg-background/70 px-5 backdrop-blur-sm"
                  >
                    <Link href="/login">Войти</Link>
                  </Button>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {highlights.map(({ icon: Icon, title, description }) => (
                    <div
                      key={title}
                      className="glass rounded-2xl border border-border/60 p-4 shadow-[var(--elev-shadow)]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {["Быстрая регистрация", "GitHub-вход", "Готово для команды"].map((item) => (
                    <div key={item} className="inline-flex items-center gap-2 rounded-full bg-background/55 px-3 py-1.5">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <aside className="relative">
                <div className="absolute inset-6 rounded-[32px] bg-primary/12 blur-3xl" />
                <div className="glass card-gradient-border card-glow relative overflow-hidden rounded-[28px] p-4 shadow-[var(--elev-shadow)]">
                  <div className="flex items-center justify-between border-b border-border/60 pb-4">
                    <div>
                      <p className="text-sm font-semibold">Продуктовый спринт</p>
                      <p className="mt-1 text-xs text-muted-foreground">12 задач в работе, 4 участника</p>
                    </div>
                    <div className="rounded-full bg-primary/12 px-3 py-1 text-[11px] font-medium text-primary">
                      Sprint 08
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {boardColumns.map((column) => (
                      <div key={column.title} className="rounded-2xl border border-border/60 bg-background/55 p-3 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{column.title}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${column.badgeClassName}`}>
                            {column.count}
                          </span>
                        </div>

                        <div className="mt-3 space-y-2">
                          {column.tasks.map((task) => (
                            <div key={task.title} className="rounded-xl border border-border/60 bg-card/80 px-3 py-2.5">
                              <p className="text-sm font-medium">{task.title}</p>
                              <p className="mt-1 text-[12px] text-muted-foreground">{task.meta}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
