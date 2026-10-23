export type NavIcon =
  | 'id'
  | 'tax'
  | 'form'
  | 'phone'
  | 'message'
  | 'map'
  | 'postal'
  | 'address'
  | 'currency'
  | 'bank'
  | 'qr'
  | 'text'
  | 'calendar'
  | 'star'
  | 'dice'
  | 'flutter'

export interface NavItem {
  to: string
  label: string
  icon: NavIcon
}

export const navSections: readonly { label: string; items: readonly NavItem[] }[] = [
  {
    label: 'Identity',
    items: [
      { to: '/cnic', label: 'CNIC Validator & Info', icon: 'id' },
      { to: '/tax', label: 'NTN & STRN', icon: 'tax' },
      { to: '/forms', label: 'Form Inputs', icon: 'form' },
    ],
  },
  {
    label: 'Phone & Messaging',
    items: [
      { to: '/phone', label: 'Phone Analyzer', icon: 'phone' },
      { to: '/numbers', label: 'Landline & UAN', icon: 'phone' },
      { to: '/whatsapp', label: 'WhatsApp Link', icon: 'message' },
    ],
  },
  {
    label: 'Geography',
    items: [
      { to: '/geo', label: 'Geo Lookup', icon: 'map' },
      { to: '/postal', label: 'Postal Codes', icon: 'postal' },
      { to: '/address', label: 'Address Parser', icon: 'address' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { to: '/currency', label: 'Currency & Words', icon: 'currency' },
      { to: '/iban', label: 'IBAN Validator', icon: 'bank' },
      { to: '/raast', label: 'Raast QR & Checker', icon: 'qr' },
    ],
  },
  {
    label: 'Locale',
    items: [
      { to: '/text', label: 'Text Utils', icon: 'text' },
      { to: '/hijri', label: 'Hijri Calendar', icon: 'calendar' },
      { to: '/holidays', label: 'Public Holidays', icon: 'star' },
    ],
  },
  {
    label: 'Tools & Platforms',
    items: [
      { to: '/faker', label: 'Mock Data (Faker)', icon: 'dice' },
      { to: '/flutter', label: 'Flutter & Dart', icon: 'flutter' },
    ],
  },
]

/** The nav group a route belongs to, e.g. "Finance" for /raast. */
export function navGroupFor(pathname: string): string | undefined {
  return navSections.find((section) => section.items.some((item) => item.to === pathname))
    ?.label
}
