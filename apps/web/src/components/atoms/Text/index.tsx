import { cn } from '@/lib/cn'

type TextProps = {
  tone?: 'primary' | 'secondary' | 'muted'
  className?: string
  children: React.ReactNode
}

export function Text({ tone = 'secondary', className, children }: TextProps) {
  return (
    <p
      className={cn(
        tone === 'primary' && 'text-content-primary',
        tone === 'secondary' && 'text-content-secondary',
        tone === 'muted' && 'text-content-muted',
        className,
      )}
    >
      {children}
    </p>
  )
}