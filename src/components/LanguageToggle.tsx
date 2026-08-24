'use client'

import { usePathname, useRouter } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import localization, { type LocaleCodes } from '@/i18n/localization'
import { useTransition } from 'react'

interface LanguageToggleProps {
  className?: string
  activeClassName?: string
  inactiveClassName?: string
}

export default function LanguageToggle({
  className = 'text-white/60 text-[11px] tracking-[0.12em] bg-transparent border-none cursor-pointer p-0',
  activeClassName = 'text-primary',
  inactiveClassName = 'text-white/60 hover:text-white/80 transition-colors duration-200',
}: LanguageToggleProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const [isPending, startTransition] = useTransition()

  const currentLocale = (params.locale as LocaleCodes) || localization.defaultLocale

  const handleLocaleChange = (newLocale: LocaleCodes) => {
    if (newLocale === currentLocale) return

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: newLocale },
      )
    })
  }

  return (
    <div className={className} style={{ fontFamily: 'var(--font-inter, sans-serif)' }}>
      {localization.locales.map((locale, index) => (
        <span key={locale.code}>
          <button
            onClick={() => handleLocaleChange(locale.code as LocaleCodes)}
            className={`bg-transparent border-none cursor-pointer p-0 ${
              currentLocale === locale.code ? activeClassName : inactiveClassName
            } ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
            disabled={isPending}
            aria-label={`Switch to ${locale.label}`}
            aria-current={currentLocale === locale.code ? 'true' : undefined}
          >
            {locale.code.toUpperCase()}
          </button>
          {index < localization.locales.length - 1 && <span className="text-white/60"> / </span>}
        </span>
      ))}
    </div>
  )
}
