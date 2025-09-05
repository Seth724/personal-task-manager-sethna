import Header from "@/components/Header"
import HomeCta from "@/components/HomeCta"
import ContactSection from "../components/ContactForm"


export default async function HomePage() {
  return (
    <>
      <Header />
      <main className="main-wrap">
        <section className="hero-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="hero-content space-y-8">
              {/* Floating decorative elements */}
              <div className="hero-bg-decoration -left-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-tr from-fuchsia-400 to-sky-400 blur-3xl floaty" />
              <div
                className="hero-bg-decoration -bottom-20 -left-10 h-60 w-60 rounded-full bg-gradient-to-tr from-rose-300 to-amber-300 blur-3xl floaty"
                style={{ animationDelay: "1.2s" }}
              />

              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight gradient-text text-balance">
                  Master Your Tasks
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                  Transform chaos into clarity. Capture every task, set smart priorities, and achieve your goals with
                  our intuitive task management platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <HomeCta />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white dark:border-gray-800"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 border-2 border-white dark:border-gray-800"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <span>Join 10,000+ productive users</span>
                </div>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground">Smart Organization</h3>
                  <p className="text-sm text-muted-foreground">
                    Intelligent task categorization and priority management
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">Instant sync across all your devices</p>
                </div>
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground">Goal Focused</h3>
                  <p className="text-sm text-muted-foreground">Track progress and celebrate achievements</p>
                </div>
              </div>
            </div>

            {/* Right side - Video */}
            <div className="relative lg:order-last">
              <div className="video-container aspect-video">
                <video className="w-full h-full object-cover rounded-2xl" autoPlay muted loop playsInline>
                  <source src="/placeholder.mp4" type="video/mp4" />
                  {/* Fallback for browsers that don't support video */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold">Task Management Demo</p>
                      <p className="text-sm opacity-80">See how easy it is to stay organized</p>
                    </div>
                  </div>
                </video>
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">1,247 Tasks</p>
                    <p className="text-xs text-muted-foreground">Completed this month</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    ⚡
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">98% Faster</p>
                    <p className="text-xs text-muted-foreground">Than traditional methods</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 space-y-16">
          {/* Trust indicators */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-8">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="h-8 w-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded">Apple</div>
              <div className="h-8 w-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded">Google</div>
              <div className="h-8 w-28 bg-gradient-to-r from-gray-300 to-gray-400 rounded">Microsoft</div>
              <div className="h-8 w-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded">Amazon</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="gradient-ring card-neo p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Ready to Transform Your Productivity?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already revolutionized their workflow with our task management
              platform.
            </p>
            <HomeCta />
          </div>
        </section>
        <ContactSection />
        
      </main>
    </>
  )
}

