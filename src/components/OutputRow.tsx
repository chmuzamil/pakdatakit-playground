import { CopyButton } from './CopyButton'

interface OutputRowProps {
  label: string
  value: string
  mono?: boolean
  emptyText?: string
}

export function OutputRow({ label, value, mono = true, emptyText = '—' }: OutputRowProps) {
  const display = value || emptyText

  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <span className="shrink-0 text-sm text-text-muted">{label}</span>
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`truncate text-sm text-text-heading ${mono ? 'font-mono' : ''}`}
          title={display}
        >
          {display}
        </span>
        {value && <CopyButton value={value} />}
      </div>
    </div>
  )
}
