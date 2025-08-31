'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'

export default function HomeCta() {
  return (
    <div className="flex flex-wrap gap-3">
      <SignedOut>
        <SignInButton mode="modal" forceRedirectUrl="/tasks">
            <Button size="sm">Sign in</Button>
        </SignInButton>

        <SignUpButton mode="modal" forceRedirectUrl="/tasks">
            <Button variant="outline" size="sm">Sign up</Button>
        </SignUpButton>
      </SignedOut>
    </div>
  )
}
