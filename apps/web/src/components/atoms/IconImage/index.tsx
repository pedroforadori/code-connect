type IconImageProps = {
  src: string
  alt: string
  size?: number
  className?: string
}

export function IconImage({ src, alt, size = 32, className }: IconImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
    />
  )
}