'use client'
import Link from 'next/link'
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="max-w-4xl mx-auto p-4 flex items-center justify-between border-b">
      <Link href="/tasks" className="font-semibold">Task Manager</Link>
      <nav className="flex items-center gap-3">
        <SignedOut>
          <Link href="/sign-in" className="underline">Sign in</Link>
          <Link href="/sign-up" className="underline">Sign up</Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
      </nav>
    </header>
  )
}
