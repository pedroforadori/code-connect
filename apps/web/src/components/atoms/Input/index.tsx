import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid = false, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          'bg-input-bg border border-input-border rounded-field h-12 px-4 w-full text-input-text placeholder:text-input-text/60 focus:outline-none focus:border-brand transition-colors',
          invalid && 'border-red-500 focus:border-red-500',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'