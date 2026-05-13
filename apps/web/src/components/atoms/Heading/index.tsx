import { cn } from '@/lib/cn'

type HeadingProps = {
  as?: 'h1' | 'h2'
  className?: string
  children: React.ReactNode
}

export function Heading({ as: Tag = 'h1', className, children }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'font-bold text-content-primary',
        Tag === 'h1' && 'text-3xl',
        Tag === 'h2' && 'text-xl',
        className,
      )}
    >
      {children}
    </Tag>
  )
}