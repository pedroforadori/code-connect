type AuthTemplateProps = {
  bannerSrc: string
  bannerAlt?: string
  children: React.ReactNode
}

export function AuthTemplate({ bannerSrc, bannerAlt = '', children }: AuthTemplateProps) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-app-bg">
      <div className="w-full max-w-[920px] bg-card rounded-card shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-[340px_1fr]">
        <aside className="hidden md:block">
          <img src={bannerSrc} alt={bannerAlt} className="w-full h-full object-cover" />
        </aside>
        <section className="p-12">{children}</section>
      </div>
    </main>
  )
}