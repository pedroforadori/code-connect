import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    return (
      <span className="inline-flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={cn(
            'w-4 h-4 rounded accent-brand cursor-pointer',
            className,
          )}
          {...props}
        />
        {label && (
          <label htmlFor={id} className="text-sm text-content-secondary cursor-pointer select-none">
            {label}
          </label>
        )}
      </span>
    )
  },
)

Checkbox.displayName = 'Checkbox'