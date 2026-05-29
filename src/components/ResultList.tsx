import { CopyButton } from './CopyButton'

interface ResultListProps {
  label: string
  items: string[]
  emptyText?: string
  maxHeight?: string
}

export function ResultList({
  label,
  items,
  emptyText = 'No matches found.',
  maxHeight = 'max-h-48',
}: ResultListProps) {
  return (
    <div className="border-b border-border py-3 last:border-b-0">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-text-muted">
          {label} ({items.length})
        </span>
        {items.length > 0 && <CopyButton value={items.join(', ')} label="Copy all" />}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-text-muted">{emptyText}</p>
      ) : (
        <ul className={`${maxHeight} space-y-1 overflow-y-auto`}>
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center justify-between rounded px-2 py-1 text-sm text-text-heading hover:bg-surface"
            >
              <span>{item}</span>
              <CopyButton value={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
