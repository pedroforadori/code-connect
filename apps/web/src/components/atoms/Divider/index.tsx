import { cn } from '@/lib/cn'

type DividerProps = {
  label?: string
  className?: string
}

export function Divider({ label, className }: DividerProps) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <span className="flex-1 h-px bg-divider" />
        <span className="text-xs text-content-muted whitespace-nowrap">{label}</span>
        <span className="flex-1 h-px bg-divider" />
      </div>
    )
  }

  return <hr className={cn('border-0 h-px bg-divider', className)} />
}