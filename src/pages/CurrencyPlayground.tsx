import { useMemo, useState } from 'react'
import { formatLakh, formatPKR } from 'pakdatakit'
import { Card } from '../components/Card'
import { CodePreview } from '../components/CodePreview'
import { OutputRow } from '../components/OutputRow'
import { PlaygroundShell } from '../components/PlaygroundShell'
import { examples } from '../utils/examples'

export function CurrencyPlayground() {
  const [input, setInput] = useState(String(examples.amount))

  const amount = useMemo(() => {
    const parsed = Number(input.replace(/,/g, ''))
    return Number.isFinite(parsed) ? parsed : NaN
  }, [input])

  const pkr = useMemo(() => {
    if (!input.trim() || Number.isNaN(amount)) return ''
    return formatPKR(amount)
  }, [input, amount])

  const lakh = useMemo(() => {
    if (!input.trim() || Number.isNaN(amount)) return ''
    return formatLakh(amount)
  }, [input, amount])

  const hasError = input.trim() !== '' && Number.isNaN(amount)

  const code = `import { formatPKR, formatLakh } from "pakdatakit";

formatPKR(${Number.isNaN(amount) ? 0 : amount});  // → "${pkr || 'Rs. 0'}"
formatLakh(${Number.isNaN(amount) ? 0 : amount}); // → "${lakh || 'Rs. 0'}"`

  return (
    <PlaygroundShell
      title="Currency Formatter"
      description="Format Pakistani Rupee amounts with comma separators and lakh/crore conventions."
      input={
        <Card title="Input" description="Amount in PKR (numeric).">
          <label htmlFor="amount-input" className="sr-only">
            Amount in PKR
          </label>
          <input
            id="amount-input"
            type="text"
            inputMode="numeric"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="2500000"
            className={`w-full rounded-md border bg-surface px-3 py-2.5 font-mono text-sm text-text-heading outline-none transition-colors placeholder:text-text-muted focus:border-accent ${
              hasError ? 'border-error' : 'border-border'
            }`}
          />
          {hasError ? (
            <p className="mt-2 text-xs text-error">Enter a valid numeric amount.</p>
          ) : (
            <p className="mt-2 text-xs text-text-muted">
              Try: 150000 · 2500000 · 10000000
            </p>
          )}
        </Card>
      }
      output={
        <Card title="Result">
          {!input.trim() ? (
            <p className="text-sm text-text-muted">Enter an amount to format.</p>
          ) : hasError ? (
            <p className="text-sm text-error">Invalid number — check your input.</p>
          ) : (
            <>
              <OutputRow label="formatPKR()" value={pkr} />
              <OutputRow label="formatLakh()" value={lakh} />
            </>
          )}
        </Card>
      }
      code={<CodePreview code={code} />}
    />
  )
}
