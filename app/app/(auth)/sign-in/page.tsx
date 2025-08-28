import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="grid place-items-center min-h-screen p-6">
      <SignIn />
    </div>
  )
}
