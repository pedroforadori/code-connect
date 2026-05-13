import { Link } from '@/components/atoms/Link'

type AuthFooterLinkProps = {
  prompt: string
  linkText: string
  linkHref: string
  trailingEmoji?: string
}

export function AuthFooterLink({
  prompt,
  linkText,
  linkHref,
  trailingEmoji,
}: AuthFooterLinkProps) {
  return (
    <div className="text-center text-sm space-y-1">
      <p className="text-content-muted">{prompt}</p>
      <Link to={linkHref} variant="brand">
        {linkText}
        {trailingEmoji && <span className="ml-1">{trailingEmoji}</span>}
      </Link>
    </div>
  )
}