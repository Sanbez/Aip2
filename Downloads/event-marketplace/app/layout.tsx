import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { CityProvider } from "@/lib/city-context"
import { EventsProvider } from "@/lib/events-context"
import { AdminProvider } from "@/lib/admin-context"
import { ModerationLogsProvider } from "@/lib/moderation-logs-context"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "City Offline - Афиша мероприятий",
  description: "Маркетплейс мероприятий вашего города",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CityProvider>
            <AdminProvider>
              <ModerationLogsProvider>
                <EventsProvider>
                  {children}
                </EventsProvider>
              </ModerationLogsProvider>
            </AdminProvider>
          </CityProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
