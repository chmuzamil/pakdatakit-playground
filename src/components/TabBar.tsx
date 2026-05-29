interface TabBarProps<T extends string> {
  tabs: readonly { id: T; label: string }[]
  active: T
  onChange: (id: T) => void
}

export function TabBar<T extends string>({ tabs, active, onChange }: TabBarProps<T>) {
  return (
    <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-surface p-1">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            active === id
              ? 'bg-accent-muted text-accent'
              : 'text-text-muted hover:text-text-heading'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
