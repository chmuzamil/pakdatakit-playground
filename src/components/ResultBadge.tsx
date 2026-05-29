interface ResultBadgeProps {
  valid: boolean
  validLabel?: string
  invalidLabel?: string
}

export function ResultBadge({
  valid,
  validLabel = 'Valid',
  invalidLabel = 'Invalid',
}: ResultBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase ${
        valid
          ? 'border border-success/30 bg-success-muted text-success'
          : 'border border-error/30 bg-error-muted text-error'
      }`}
    >
      {valid ? validLabel : invalidLabel}
    </span>
  )
}
