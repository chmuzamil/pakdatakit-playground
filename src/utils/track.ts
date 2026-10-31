import { navSections } from './nav'

// Custom events go to the self-hosted Umami (t.chaudhery.com); page views stay on
// Vercel Analytics. Event data is only ever a tool slug or package name from a fixed
// list, never anything the visitor typed.
type EventName = 'tool_run' | 'code_copy' | 'npm_click' | 'pub_click'

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void }
  }
}

const tools = new Set(
  navSections.flatMap((section) => section.items.map((item) => item.to.slice(1))),
)

/** The tool slug for a route, e.g. "cnic" for /cnic; undefined for unknown routes. */
export function toolFor(pathname: string): string | undefined {
  const slug = pathname.slice(1)
  return tools.has(slug) ? slug : undefined
}

export function track(event: EventName, data?: Record<string, string>) {
  try {
    window.umami?.track(event, data)
  } catch {
    // The tracker may be blocked or not loaded yet; analytics must never break the page.
  }
}
