import type { ReactNode } from 'react'

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
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-border px-6 py-5 lg:px-8">
        <h1 className="text-xl font-semibold text-text-heading">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-text-muted">{description}</p>
      </header>

      <div className="grid flex-1 gap-6 p-6 lg:grid-cols-2 lg:p-8">
        <div className="flex flex-col gap-4">{input}</div>
        <div className="flex flex-col gap-4">
          {output}
          {code}
        </div>
      </div>
    </div>
  )
}
