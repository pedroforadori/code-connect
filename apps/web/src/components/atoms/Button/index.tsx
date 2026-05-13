import { type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary'
  fullWidth?: boolean
  rightIcon?: ReactNode
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-field h-12 px-6 font-semibold transition-colors disabled:opacity-50 cursor-pointer',
        variant === 'primary' && 'bg-brand hover:bg-brand-hover text-brand-ink',
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
      {rightIcon}
    </button>
  )
}