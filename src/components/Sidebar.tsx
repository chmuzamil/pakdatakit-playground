import { NavLink } from 'react-router-dom'

const navSections = [
  {
    label: 'Identity',
    items: [{ to: '/cnic', label: 'CNIC Validator', icon: IdIcon }],
  },
  {
    label: 'Phone & Messaging',
    items: [
      { to: '/phone', label: 'Phone Analyzer', icon: PhoneIcon },
      { to: '/whatsapp', label: 'WhatsApp Link', icon: MessageIcon },
    ],
  },
  {
    label: 'Geography',
    items: [
      { to: '/geo', label: 'Geo Lookup', icon: MapIcon },
      { to: '/postal', label: 'Postal Codes', icon: PostalIcon },
      { to: '/address', label: 'Address Parser', icon: AddressIcon },
    ],
  },
  {
    label: 'Finance',
    items: [
      { to: '/currency', label: 'Currency Formatter', icon: CurrencyIcon },
      { to: '/iban', label: 'IBAN Validator', icon: BankIcon },
    ],
  },
  {
    label: 'Locale',
    items: [
      { to: '/text', label: 'Text Utils', icon: TextIcon },
      { to: '/hijri', label: 'Hijri Calendar', icon: CalendarIcon },
    ],
  },
] as const

export function Sidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-border bg-surface-raised lg:w-64 lg:border-r lg:border-b-0">
      <div className="border-b border-border px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-muted text-accent">
            <span className="font-mono text-sm font-bold">PK</span>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-text-heading">PakDataKit</p>
            <p className="text-xs text-text-muted">Playground</p>
          </div>
        </div>
      </div>

      <nav className="flex gap-4 overflow-x-auto p-3 lg:block lg:overflow-y-auto lg:overflow-x-visible lg:p-2">
        {navSections.map((section) => (
          <div key={section.label} className="shrink-0 lg:mb-4 lg:last:mb-0">
            <p className="mb-1 hidden px-3 text-[10px] font-semibold tracking-wider text-text-muted uppercase lg:block">
              {section.label}
            </p>
            <div className="flex gap-1 lg:flex-col">
              {section.items.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-accent-muted font-medium text-accent'
                        : 'text-text-muted hover:bg-surface-overlay hover:text-text-heading'
                    }`
                  }
                >
                  <Icon />
                  <span className="whitespace-nowrap">{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto hidden border-t border-border p-4 lg:block">
        <p className="text-xs leading-relaxed text-text-muted">
          Live demo for the{' '}
          <code className="rounded bg-surface-overlay px-1 py-0.5 font-mono text-[11px] text-accent">
            pakdatakit
          </code>{' '}
          npm package — 10 modules, 30+ utilities.
        </p>
      </div>
    </aside>
  )
}

function IdIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
      <path d="M15 10h4M15 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function PostalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function AddressIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" />
      <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function CurrencyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BankIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function TextIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7V4h16v3M9 20h6M12 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
