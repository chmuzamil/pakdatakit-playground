import { useMemo, useState } from 'react'
import { getBankFromIBAN, validateIBAN } from 'pakdatakit'
import { Card } from '../components/Card'
import { CodePreview } from '../components/CodePreview'
import { OutputRow } from '../components/OutputRow'
import { PlaygroundShell } from '../components/PlaygroundShell'
import { ResultBadge } from '../components/ResultBadge'
import { escapeForCode, examples, monoInputClassName } from '../utils/examples'

export function IBANPlayground() {
  const [input, setInput] = useState<string>(examples.iban)

  const isValid = useMemo(() => {
    if (!input.trim()) return false
    return validateIBAN(input)
  }, [input])

  const bank = useMemo(() => {
    if (!input.trim()) return null
    return getBankFromIBAN(input)
  }, [input])

  const code = `import { validateIBAN, getBankFromIBAN } from "pakdatakit";

validateIBAN("${escapeForCode(input || examples.iban)}");     // → ${isValid}
getBankFromIBAN("${escapeForCode(input || examples.iban)}"); // → ${bank ? `"${bank}"` : 'null'}`

  return (
    <PlaygroundShell
      title="IBAN Validator"
      description="Validate Pakistani IBANs with mod-97 checksum and detect the issuing bank."
      input={
        <Card title="Input" description="24-character PK IBAN, with or without spaces.">
          <label htmlFor="iban-input" className="sr-only">
            IBAN
          </label>
          <input
            id="iban-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder="PK36SCBL0000001123456702"
            spellCheck={false}
            className={monoInputClassName}
          />
          <p className="mt-2 text-xs text-text-muted">
            Try: PK36SCBL0000001123456702 · PK36 SCBL 0000 0011 2345 6702
          </p>
        </Card>
      }
      output={
        <Card title="Result">
          {!input.trim() ? (
            <p className="text-sm text-text-muted">Enter an IBAN to validate.</p>
          ) : (
            <>
              <div className="mb-4">
                <ResultBadge valid={isValid} />
              </div>
              <OutputRow label="Bank" value={bank ?? ''} mono={false} emptyText="Unknown bank" />
            </>
          )}
        </Card>
      }
      code={<CodePreview code={code} />}
    />
  )
}
