import * as React from 'react'
import { cn } from '@/utilities/ui'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number
}> = ({ children, className, width }) => {
  return (
    <div className={cn('w-full', className)} style={{ width: width ? `${width}%` : undefined }}>
      {children}
    </div>
  )
}
