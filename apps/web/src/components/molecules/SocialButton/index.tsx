import { IconImage } from '@/components/atoms/IconImage'
import { cn } from '@/lib/cn'

type SocialButtonProps = {
  iconSrc: string
  label: string
  onClick?: () => void
  className?: string
}

export function SocialButton({ iconSrc, label, onClick, className }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 flex flex-col items-center justify-center gap-2 bg-input-bg border border-input-border rounded-field h-20 hover:border-brand transition-colors cursor-pointer',
        className,
      )}
    >
      <IconImage src={iconSrc} alt={label} size={28} />
      <span className="text-xs text-content-secondary">{label}</span>
    </button>
  )
}