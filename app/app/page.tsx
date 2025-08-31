// app/page.tsx
import Header from '@/components/Header'
import HomeCta from '@/components/HomeCta'

export default async function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="mb-3 text-3xl font-bold">Welcome to Task Manager</h1>
        <p className="mb-8 text-muted-foreground">
          Capture tasks, set priorities, and stay on track.
        </p>
        <HomeCta /> {/* shows "Go to Tasks" if signed in, Sign in/Sign up if signed out */}
      </main>
    </>
  )
}



