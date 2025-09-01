'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'

export default function HomeCta() {
  return (
    <div className="flex flex-wrap gap-3">

      <SignedOut>
        <SignInButton mode="modal" forceRedirectUrl="/tasks">
          <button className="btn-primary text-sm">Sign in</button>
        </SignInButton>
        <SignUpButton mode="modal" forceRedirectUrl="/tasks">
          <button className="btn-outline-gradient text-sm">Sign up</button>
        </SignUpButton>
      </SignedOut>


    </div>
  )
}
