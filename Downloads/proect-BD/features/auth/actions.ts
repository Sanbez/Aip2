"use server"

import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { signIn } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { loginSchema, registerSchema } from "./schemas"

export type AuthState = { error: string } | null

export async function login(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Ошибка валидации" }
  }

  try {
    await signIn("credentials", { ...parsed.data, redirectTo: "/projects" })
  } catch (err) {
    if (err instanceof AuthError) return { error: "Неверный email или пароль" }
    throw err
  }
  return null
}

export async function register(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Ошибка валидации" }
  }

  const db = await getDb()
  const existing = await db.users.findOne({ where: { email: parsed.data.email } })
  if (existing) return { error: "Email уже зарегистрирован" }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12)
  await db.users.save(
    db.users.create({ name: parsed.data.name, email: parsed.data.email, passwordHash })
  )

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/projects",
    })
  } catch (err) {
    if (err instanceof AuthError) redirect("/login")
    throw err
  }
  return null
}
