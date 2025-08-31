// 'use client'
// import Link from 'next/link'
// import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'

// export default function Header() {
//   return (
//     <header className="max-w-4xl mx-auto p-4 flex items-center justify-between border-b">
//       <Link href="/tasks" className="font-semibold">Task Manager</Link>
//       <nav className="flex items-center gap-3">
//         <SignedOut>
//           <Link href="/sign-in" className="underline">Sign in</Link>
//           <Link href="/sign-up" className="underline">Sign up</Link>
//         </SignedOut>
//         <SignedIn>
//           <UserButton afterSignOutUrl="/sign-in" />
//         </SignedIn>
//       </nav>
//     </header>
//   )
// }

// 'use client'

// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

// export default function Header() {
//   return (
//     <header className="border-b bg-background">
//       <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
//         <Link href="/" className="font-semibold">Task Manager</Link>

//         <nav className="flex items-center gap-2">
//           <Link href="/"><Button variant="ghost" size="sm">Home</Button></Link>
//           <Link href="/tasks"><Button variant="ghost" size="sm">Tasks</Button></Link>

//           <SignedOut>
//             <SignInButton redirectUrl="/tasks" mode="modal">
//               <Button size="sm">Sign in</Button>
//             </SignInButton>
//           </SignedOut>

//           <SignedIn>
//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>
//         </nav>
//       </div>
//     </header>
//   )
// }

// 'use client'

// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

// export default function Header() {
//   return (
//     <header className="border-b bg-background">
//       <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
//         <Button asChild variant="ghost" className="font-semibold px-0">
//           <Link href="/">Task Manager</Link>
//         </Button>

//         <nav className="flex items-center gap-2">
//           <Button asChild variant="ghost" size="sm">
//             <Link href="/">Home</Link>
//           </Button>

//           <Button asChild variant="ghost" size="sm">
//             <Link href="/tasks">Tasks</Link>
//           </Button>

//           <SignedOut>
//             <SignInButton mode="modal" forceRedirectUrl="/tasks">
//                 <Button size="sm">Sign in</Button>
//             </SignInButton>

//             <SignUpButton mode="modal" forceRedirectUrl="/tasks">
//                 <Button variant="outline" size="sm">Sign up</Button>
//             </SignUpButton>
//           </SignedOut>

//           <SignedIn>
//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>
//         </nav>
//       </div>
//     </header>
//   )
// }


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
