import { useMemo, useState } from 'react'
import { formatAddress, parseAddress } from 'pakdatakit'
import { Card } from '../components/Card'
import { CodePreview } from '../components/CodePreview'
import { OutputRow } from '../components/OutputRow'
import { PlaygroundShell } from '../components/PlaygroundShell'
import { escapeForCode, examples, textareaClassName } from '../utils/examples'

const addressFields = [
  'street',
  'area',
  'city',
  'district',
  'province',
  'postalCode',
] as const

export function AddressPlayground() {
  const [input, setInput] = useState<string>(examples.address)

  const parsed = useMemo(() => {
    if (!input.trim()) return null
    return parseAddress(input)
  }, [input])

  const formatted = useMemo(() => {
    if (!parsed || !input.trim()) return ''
    return formatAddress(parsed)
  }, [parsed, input])

  const code = `import { parseAddress, formatAddress } from "pakdatakit";

const parsed = parseAddress("${escapeForCode(input || examples.address)}");
formatAddress(parsed); // → "${escapeForCode(formatted || '')}"`

  return (
    <PlaygroundShell
      title="Address Parser"
      description="Parse free-form Pakistani addresses into structured components and format them back."
      input={
        <Card title="Input" description="Comma-separated mailing address.">
          <label htmlFor="address-input" className="sr-only">
            Address
          </label>
          <textarea
            id="address-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="House 12, Gulberg III, Lahore, Punjab 54660"
            className={textareaClassName}
          />
          <p className="mt-2 text-xs text-text-muted">
            Try: House 12, Gulberg III, Lahore, Punjab 54660 · Street 5, 60000
          </p>
        </Card>
      }
      output={
        <Card title="Result">
          {!input.trim() || !parsed ? (
            <p className="text-sm text-text-muted">Enter an address to parse.</p>
          ) : (
            <>
              {addressFields.map((field) => (
                <OutputRow
                  key={field}
                  label={field}
                  value={parsed[field] ?? ''}
                  mono={field === 'postalCode'}
                />
              ))}
              <OutputRow label="formatAddress()" value={formatted} mono={false} />
            </>
          )}
        </Card>
      }
      code={<CodePreview code={code} />}
    />
  )
}
