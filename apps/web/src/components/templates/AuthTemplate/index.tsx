type AuthTemplateProps = {
  bannerSrc: string
  bannerAlt?: string
  children: React.ReactNode
}

function WatermarkSymbol({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute h-121.5 w-101.75 opacity-30 overflow-hidden pointer-events-none ${className ?? ''}`}
    >
      <div className="absolute top-[25.85%] right-[44.09%] bottom-0 left-0">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/watermark-a.svg" />
      </div>
      <div className="absolute top-0 right-[0.02%] bottom-[25.85%] left-[44.09%]">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/watermark-b.svg" />
      </div>
    </div>
  )
}

export function AuthTemplate({ bannerSrc, bannerAlt = '', children }: AuthTemplateProps) {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 bg-app-bg overflow-hidden">
      <WatermarkSymbol className="bottom-0 right-35.5" />
      <WatermarkSymbol className="top-0 left-35.5" />

      <div className="relative z-10 w-full max-w-230 bg-card rounded-card shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-[340px_1fr]">
        <aside className="relative hidden md:block">
          <picture>
            <source srcSet={bannerSrc.replace(/\.png$/, '.webp')} type="image/webp" />
            <img
              src={bannerSrc}
              alt={bannerAlt}
              className="absolute inset-0 w-full h-full object-cover block"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </aside>
        <section className="p-12">{children}</section>
      </div>
    </main>
  )
}