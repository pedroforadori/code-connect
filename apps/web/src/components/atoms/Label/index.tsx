import { cn } from '@/lib/cn'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn('block text-sm font-medium text-content-secondary mb-2', className)}
      {...props}
    >
      {children}
    </label>
  )
}