import { useEffect, useMemo, useState } from 'react'
import QRCode from 'qrcode'
import { createRaastP2PQr, parseRaastQr } from 'pakdatakit'
import { Card } from '../components/Card'
import { CodePreview } from '../components/CodePreview'
import { CopyButton } from '../components/CopyButton'
import { OutputRow } from '../components/OutputRow'
import { PlaygroundShell } from '../components/PlaygroundShell'
import { ResultBadge } from '../components/ResultBadge'
import { TabBar } from '../components/TabBar'
import {
  escapeForCode,
  examples,
  inputClassName,
  monoInputClassName,
  textareaClassName,
} from '../utils/examples'

const tabs = [
  { id: 'create', label: 'Create P2P QR' },
  { id: 'parse', label: 'Read a QR payload' },
] as const

type Tab = (typeof tabs)[number]['id']

function useQrImage(payload: string | null): string | null {
  const [image, setImage] = useState<{ payload: string; url: string } | null>(null)
  useEffect(() => {
    if (!payload) return
    let cancelled = false
    QRCode.toDataURL(payload, { margin: 1, width: 240, errorCorrectionLevel: 'M' })
      .then((url) => {
        if (!cancelled) setImage({ payload, url })
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [payload])
  // Only show the image rendered for the current payload.
  return image && image.payload === payload ? image.url : null
}

export function RaastPlayground() {
  const [tab, setTab] = useState<Tab>('create')
  const [iban, setIban] = useState<string>(examples.iban)
  const [amount, setAmount] = useState('1500')
  const [validDays, setValidDays] = useState('30')
  const [particulars, setParticulars] = useState('')
  const [toParse, setToParse] = useState('')

  // QR codes with an amount must expire; this one stops working at 23:59 on the last day.
  const expiresAt = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + Number(validDays))
    date.setHours(23, 59, 0, 0)
    return date
  }, [validDays])

  const created = useMemo(() => {
    try {
      const value = amount.trim() ? Number(amount) : undefined
      return {
        payload: createRaastP2PQr({
          iban,
          ...(value !== undefined ? { amount: value, expiresAt } : {}),
          ...(particulars.trim() ? { particulars: particulars.trim() } : {}),
        }),
        error: null,
      }
    } catch (error) {
      return { payload: null, error: (error as Error).message }
    }
  }, [iban, amount, expiresAt, particulars])

  const parseInput = tab === 'parse' ? toParse : (created.payload ?? '')
  const parsed = useMemo(() => (parseInput.trim() ? parseRaastQr(parseInput) : null), [parseInput])
  const image = useQrImage(tab === 'create' ? created.payload : null)

  const code =
    tab === 'create'
      ? `import { createRaastP2PQr } from "pakdatakit";

createRaastP2PQr({
  iban: "${escapeForCode(iban)}",${amount.trim() ? `\n  amount: ${amount},\n  expiresAt: new Date(${expiresAt.getFullYear()}, ${expiresAt.getMonth()}, ${expiresAt.getDate()}, 23, 59),` : ''}${particulars.trim() ? `\n  particulars: "${escapeForCode(particulars.trim())}",` : ''}
});
// → "${created.payload ?? ''}"`
      : `import { parseRaastQr } from "pakdatakit";

parseRaastQr(payload);
// → ${parsed ? `{ kind: "${parsed.kind}", crcValid: ${parsed.crcValid}, iban: ${parsed.iban ? `"${parsed.iban}"` : 'null'}, amount: ${parsed.amount}${parsed.expiresAt ? `, expiresAt: "${parsed.expiresAt}"` : ''} }` : 'null'}`

  return (
    <PlaygroundShell
      title="Raast QR"
      description="Create and read payment QR codes following the State Bank of Pakistan's QR standard."
      input={
        <>
          <TabBar tabs={tabs} active={tab} onChange={setTab} />
          {tab === 'create' ? (
            <Card title="Payee" description="Person-to-person Raast QR for an IBAN.">
              <div className="space-y-3">
                <input
                  aria-label="IBAN"
                  type="text"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  placeholder="PK36SCBL0000001123456702"
                  spellCheck={false}
                  className={monoInputClassName}
                />
                <input
                  aria-label="Amount in PKR"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount in PKR (optional)"
                  className={monoInputClassName}
                />
                {amount.trim() && (
                  <label className="flex items-center gap-3 text-sm text-text-muted">
                    <span className="shrink-0">Valid for</span>
                    <select
                      aria-label="Valid for"
                      value={validDays}
                      onChange={(e) => setValidDays(e.target.value)}
                      className={inputClassName}
                    >
                      <option value="1">1 day</option>
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                    </select>
                  </label>
                )}
                <input
                  aria-label="Description"
                  type="text"
                  value={particulars}
                  maxLength={30}
                  onChange={(e) => setParticulars(e.target.value)}
                  placeholder="Description (optional)"
                  className={inputClassName}
                />
              </div>
            </Card>
          ) : (
            <Card
              title="QR payload"
              description="Paste the text decoded from a Raast or Pakistan QR code."
            >
              <textarea
                aria-label="QR payload"
                value={toParse}
                onChange={(e) => setToParse(e.target.value)}
                placeholder="000202010211020230…"
                spellCheck={false}
                className={textareaClassName}
              />
              {created.payload && (
                <button
                  type="button"
                  onClick={() => setToParse(created.payload ?? '')}
                  className="mt-2 text-xs text-accent hover:underline"
                >
                  Use the QR from the Create tab
                </button>
              )}
            </Card>
          )}
        </>
      }
      output={
        <Card title="Result">
          {tab === 'create' && created.error ? (
            <p className="text-sm text-error">{created.error}</p>
          ) : !parseInput.trim() ? (
            <p className="text-sm text-text-muted">Paste a payload to read it.</p>
          ) : (
            <>
              {tab === 'create' && image && (
                <div className="mb-4 flex flex-col items-center gap-2">
                  <img
                    src={image}
                    alt="Raast QR code"
                    width={240}
                    height={240}
                    className="rounded-md bg-white p-2"
                  />
                  <CopyButton value={created.payload ?? ''} label="Copy payload" />
                </div>
              )}
              <div className="mb-4">
                <ResultBadge
                  valid={parsed?.crcValid ?? false}
                  validLabel="Checksum OK"
                  invalidLabel={parsed ? 'Checksum mismatch' : 'Not a Pakistan QR'}
                />
              </div>
              <OutputRow
                label="Kind"
                value={parsed ? (parsed.kind === 'p2p' ? 'Person to person' : 'Merchant') : ''}
                mono={false}
              />
              <OutputRow label="IBAN" value={parsed?.iban ?? ''} />
              <OutputRow label="Amount" value={parsed?.amount != null ? String(parsed.amount) : ''} />
              {parsed?.expiresAt && (
                <OutputRow label="Expires" value={parsed.expiresAt.replace('T', ' ')} />
              )}
              {parsed?.merchantName && (
                <OutputRow label="Merchant" value={parsed.merchantName} mono={false} />
              )}
              {parsed?.particulars && (
                <OutputRow label="Description" value={parsed.particulars} mono={false} />
              )}
            </>
          )}
        </Card>
      }
      code={<CodePreview code={code} />}
    />
  )
}
