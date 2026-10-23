import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { navGroupFor } from '../utils/nav'

interface PlaygroundShellProps {
  title: string
  description: string
  input: ReactNode
  output: ReactNode
  code: ReactNode
}

export function PlaygroundShell({
  title,
  description,
  input,
  output,
  code,
}: PlaygroundShellProps) {
  const group = navGroupFor(useLocation().pathname)

  useEffect(() => {
    document.title = `${title} · PakDataKit Playground`
  }, [title])

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-border bg-gradient-to-b from-accent/[0.07] to-transparent">
        <div className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
          {group && (
            <p className="text-xs font-semibold tracking-wider text-brand uppercase">{group}</p>
          )}
          <h1
            tabIndex={-1}
            className="mt-1.5 text-2xl font-semibold tracking-tight text-balance text-text-heading focus:outline-none sm:text-3xl"
          >
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-pretty text-text-muted">{description}</p>
        </div>
      </header>

      {/* minmax(0, …) columns and min-w-0 let wide content (code, payloads) scroll
          inside its own box instead of widening the page. */}
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-start gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8 lg:px-10 lg:py-8">
        <div className="flex min-w-0 flex-col gap-4">{input}</div>
        <div className="flex min-w-0 flex-col gap-4 [&>section]:border-accent/30 [&>section]:shadow-[0_0_0_1px_var(--color-accent-muted)]">
          {output}
          {code}
        </div>
      </div>
    </div>
  )
}
