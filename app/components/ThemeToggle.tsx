'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { SunMedium, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={[
        // track
        'relative h-8 w-14 rounded-full transition-all',
        isDark
          ? 'bg-zinc-700 ring-1 ring-white/15'
          : 'bg-indigo-500 ring-1 ring-black/10',
        'shadow-inner'
      ].join(' ')}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* knob */}
      <span
        className={[
          'absolute top-1 left-1 h-6 w-6 rounded-full bg-white text-zinc-900 grid place-items-center shadow',
          'transition-transform duration-300',
          isDark ? 'translate-x-6' : 'translate-x-0'
        ].join(' ')}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
      </span>
    </button>
  )
}
