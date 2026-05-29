import { useMemo, useState } from 'react'
import { validateCNIC } from 'pakdatakit'
import { Card } from '../components/Card'
import { CodePreview } from '../components/CodePreview'
import { OutputRow } from '../components/OutputRow'
import { PlaygroundShell } from '../components/PlaygroundShell'
import { ResultBadge } from '../components/ResultBadge'
import { escapeForCode, examples, formatCNIC } from '../utils/examples'

export function CNICPlayground() {
  const [input, setInput] = useState<string>(examples.cnic)

  const isValid = useMemo(() => {
    if (!input.trim()) return false
    return validateCNIC(input)
  }, [input])

  const formatted = useMemo(() => {
    if (!input.trim()) return ''
    return isValid ? formatCNIC(input) : ''
  }, [input, isValid])

  const code = `import { validateCNIC } from "pakdatakit";

validateCNIC("${escapeForCode(input || examples.cnic)}"); // → ${isValid}`

  return (
    <PlaygroundShell
      title="CNIC Validator"
      description="Validate Pakistani CNIC numbers. Accepts formats with or without dashes."
      input={
        <Card title="Input" description="13-digit CNIC with optional separators.">
          <label htmlFor="cnic-input" className="sr-only">
            CNIC number
          </label>
          <input
            id="cnic-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="35202-1234567-1"
            spellCheck={false}
            className="w-full rounded-md border border-border bg-surface px-3 py-2.5 font-mono text-sm text-text-heading outline-none transition-colors placeholder:text-text-muted focus:border-accent"
          />
          <p className="mt-2 text-xs text-text-muted">
            Try: 35202-1234567-1 · 3520212345671
          </p>
        </Card>
      }
      output={
        <Card title="Result">
          {!input.trim() ? (
            <p className="text-sm text-text-muted">Enter a CNIC to validate.</p>
          ) : (
            <>
              <div className="mb-4">
                <ResultBadge valid={isValid} />
              </div>
              <OutputRow
                label="Formatted"
                value={formatted}
                emptyText={isValid ? '' : 'Invalid CNIC'}
              />
            </>
          )}
        </Card>
      }
      code={<CodePreview code={code} />}
    />
  )
}
