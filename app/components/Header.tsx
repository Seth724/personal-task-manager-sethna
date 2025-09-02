
"use client"
import ThemeToggle from "@/components/ThemeToggle"
import Link from "next/link"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="gradient-ring card-neo flex items-center justify-between px-3 py-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-fuchsia-500 to-sky-500 shadow-md" />
            <span className="font-semibold tracking-tight">Task Manager</span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className={pathname === "/" ? "nav-chip text-xs sm:text-sm" : "nav-chip-ghost text-xs sm:text-sm"}
            >
              Home
            </Link>
            <Link
              href="/tasks"
              className={
                pathname?.startsWith("/tasks") ? "nav-chip text-xs sm:text-sm" : "nav-chip-ghost text-xs sm:text-sm"
              }
            >
              Tasks
            </Link>
            <ThemeToggle />
            <SignedIn>
              <div className="ml-1 rounded-xl bg-white/40 dark:bg-white/5 px-1 sm:px-2 py-1">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  )
}
