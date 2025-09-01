import Header from '@/components/Header'
import HomeCta from '@/components/HomeCta'

export default async function HomePage() {
  return (
    <>
      <Header />
      <main className="main-wrap">
        <section className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-sm">
          {/* floating decor */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-tr from-fuchsia-400 to-sky-400 opacity-40 blur-2xl floaty" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gradient-to-tr from-rose-300 to-amber-300 opacity-40 blur-2xl floaty" style={{animationDelay:'1.2s'}} />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight gradient-text">
            Welcome to Task Manager
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">
            Capture tasks, set priorities, and stay on track. Sign in and start managing your work in seconds.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="/tasks" className="btn-pop shine-on-hover">Go to Tasks</a>
            <HomeCta />
          </div>

          {/* hero image (optional) */}
          <img
            src="/images/hero.png"
            alt=""
            className="mt-8 rounded-2xl border border-white/20 shadow-md w-full max-w-3xl"
          />
        </section>
      </main>
    </>
  )
}
