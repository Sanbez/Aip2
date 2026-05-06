"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { Zap } from "lucide-react"
import { register } from "@/features/auth/actions"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-gradient w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
    >
      {pending ? "Создаём аккаунт…" : "Создать аккаунт"}
    </button>
  )
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(register, null)

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
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
              Начни работать<br />
              <span className="text-gradient">прямо сейчас</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              Создай аккаунт бесплатно и начни управлять проектами с командой.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Бесплатно", "Без ограничений", "Командный доступ", "Быстрый старт"].map((f) => (
                <span key={f}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/60">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <p className="relative mt-10 text-[11px] text-white/25">© {new Date().getFullYear()} Flowboard</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="app-bg relative flex flex-1 items-center justify-center px-6 py-12">
        <div className="absolute right-6 top-6 z-10">
          <ThemeToggle size="sm" />
        </div>
        <div className="w-full max-w-[360px]">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="grd-primary flex h-7 w-7 items-center justify-center rounded-lg">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold">Flowboard</span>
          </div>

          <h2 className="text-xl font-semibold tracking-tight">Создать аккаунт</h2>
          <p className="mt-1 text-sm text-muted-foreground">Начни управлять проектами</p>

          <form action={formAction} className="mt-8 space-y-4">
            {state?.error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/8 px-3.5 py-2.5 text-sm text-destructive">
                {state.error}
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-[13px]">Имя</Label>
              <Input id="name" name="name" placeholder="Иван Иванов" required
                className="bg-secondary/40 border-border/60 focus:border-primary/60" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[13px]">Email</Label>
              <Input id="email" name="email" type="email" placeholder="name@company.com" required
                className="bg-secondary/40 border-border/60 focus:border-primary/60" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-[13px]">Пароль</Label>
              <Input id="password" name="password" type="password" placeholder="Минимум 8 символов" required
                className="bg-secondary/40 border-border/60 focus:border-primary/60" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-[13px]">Подтверди пароль</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required
                className="bg-secondary/40 border-border/60 focus:border-primary/60" />
            </div>
            <SubmitButton />
          </form>

          <p className="mt-6 text-center text-[12px] text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80 underline underline-offset-4">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
