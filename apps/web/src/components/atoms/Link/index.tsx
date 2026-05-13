import { Link as RouterLink } from 'react-router-dom'
import { cn } from '@/lib/cn'

type LinkProps = {
  to: string
  variant?: 'plain' | 'brand' | 'muted-underline'
  external?: boolean
  className?: string
  children: React.ReactNode
}

export function Link({
  to,
  variant = 'plain',
  external = false,
  className,
  children,
}: LinkProps) {
  const classes = cn(
    'transition-colors',
    variant === 'brand' && 'text-content-link font-semibold hover:underline',
    variant === 'muted-underline' && 'text-content-secondary underline hover:text-content-primary',
    variant === 'plain' && 'text-content-secondary hover:text-content-primary',
    className,
  )

  if (external) {
    return (
      <a href={to} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <RouterLink to={to} className={classes}>
      {children}
    </RouterLink>
  )
}