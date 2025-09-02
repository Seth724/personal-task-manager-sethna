
"use client"
import Footer from "@/components/Footer"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type React from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <Footer />
    </NextThemesProvider>
  )
}
