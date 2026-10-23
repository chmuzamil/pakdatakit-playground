import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  // After switching tools, move focus to the new page's heading so screen
  // readers announce it (skipped on the first load).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    mainRef.current?.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true })
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="flex min-h-full flex-col lg:flex-row lg:items-start">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 font-medium text-surface focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to tool
      </a>
      <Sidebar />
      <main
        ref={mainRef}
        id="main"
        tabIndex={-1}
        className="min-h-dvh min-w-0 flex-1 overflow-x-clip bg-surface focus:outline-none"
      >
        <Outlet />
      </main>
    </div>
  )
}
