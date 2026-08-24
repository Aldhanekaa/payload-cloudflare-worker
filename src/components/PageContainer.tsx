import { CSSProperties } from 'react'

export default function PageContainer({
  children,
  className,
  style,
}: {
  className?: string
  children: React.ReactNode
  style?: CSSProperties
}) {
  return (
    <div className={`max-w-360 mx-auto px-5 md:px-20 ${className ?? ''}`} style={style}>
      {children}
    </div>
  )
}
