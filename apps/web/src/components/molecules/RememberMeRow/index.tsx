import { Checkbox } from '@/components/atoms/Checkbox'
import { Link } from '@/components/atoms/Link'

type RememberMeRowProps = {
  rememberProps: React.InputHTMLAttributes<HTMLInputElement>
  forgotHref: string
}

export function RememberMeRow({ rememberProps, forgotHref }: RememberMeRowProps) {
  return (
    <div className="flex items-center justify-between">
      <Checkbox id="remember" label="Lembrar-me" {...rememberProps} />
      <Link to={forgotHref} variant="muted-underline" className="text-sm">
        Esqueci a senha
      </Link>
    </div>
  )
}