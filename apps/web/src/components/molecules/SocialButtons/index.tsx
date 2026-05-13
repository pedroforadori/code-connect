import { SocialButton } from '@/components/molecules/SocialButton'

type SocialProvider = {
  id: string
  iconSrc: string
  label: string
  onClick?: () => void
}

type SocialButtonsProps = {
  providers: SocialProvider[]
}

export function SocialButtons({ providers }: SocialButtonsProps) {
  return (
    <div className="flex gap-4">
      {providers.map((provider) => (
        <SocialButton
          key={provider.id}
          iconSrc={provider.iconSrc}
          label={provider.label}
          onClick={provider.onClick}
        />
      ))}
    </div>
  )
}