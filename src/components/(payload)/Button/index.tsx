import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

export type Props = {
  appearance?: 'default' | 'primary' | 'secondary'
  className?: string
  el?: 'a' | 'button' | 'link'
  form?: string
  href?: string
  label?: string
  newTab?: boolean | null
  onClick?: () => void
}

const appearanceStyles = {
  primary:
    'bg-black text-white hover:bg-white hover:text-black hover:shadow-[inset_0_0_0_1px_black] focus:bg-white focus:text-black focus:shadow-[inset_0_0_0_1px_black]',
  secondary:
    'bg-white shadow-[inset_0_0_0_1px_black] hover:bg-black hover:text-white hover:shadow-[inset_0_0_0_1px_black] focus:bg-black focus:text-white focus:shadow-[inset_0_0_0_1px_black]',
  default: 'p-0 -ml-2',
}

export const Button: React.FC<Props> = ({
  appearance = 'default',
  className: classNameFromProps,
  el = 'button',
  form,
  href,
  label,
  newTab,
  onClick,
}) => {
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const baseStyles =
    'cursor-pointer inline-flex relative no-underline px-[18px] py-3 mb-4 items-center justify-center'
  const className = cn(baseStyles, appearanceStyles[appearance], classNameFromProps)

  const content = (
    <div className="flex items-center justify-center">
      <span className="flex items-center font-medium uppercase tracking-wide text-sm">{label}</span>
    </div>
  )

  if (el === 'link') {
    return (
      <Link {...newTabProps} className={className} href={href || ''}>
        {content}
      </Link>
    )
  }

  if (el === 'a') {
    return (
      <a {...newTabProps} className={className} href={href} onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={className} form={form} onClick={onClick}>
      {content}
    </button>
  )
}
