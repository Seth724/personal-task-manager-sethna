'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignedIn, UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Button asChild variant="ghost" className="font-semibold px-0">
          <Link href="/">Task Manager</Link>
        </Button>

        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/tasks">Tasks</Link>
          </Button>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </div>
    </header>
  )
}
