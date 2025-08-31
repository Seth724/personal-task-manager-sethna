// 'use client'

// import { Button } from '@/components/ui/button'
// import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'
// import Link from 'next/link'

// export default function HomeCta() {
//   return (
//     <div className="flex flex-wrap gap-3">
//       <SignedIn>
//         <Link href="/tasks"><Button>Go to Tasks</Button></Link>
//       </SignedIn>

//       <SignedOut>
//         <SignInButton redirectUrl="/tasks" mode="modal">
//           <Button>Sign in</Button>
//         </SignInButton>
//         <SignUpButton redirectUrl="/tasks" mode="modal">
//           <Button variant="outline">Sign up</Button>
//         </SignUpButton>
//       </SignedOut>
//     </div>
//   )
// }

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs'

export default function HomeCta() {
  return (
    <div className="flex flex-wrap gap-3">
      {/* <SignedIn>
        <Button asChild>
          <Link href="/tasks">Go to Tasks</Link>
        </Button>
      </SignedIn> */}

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
