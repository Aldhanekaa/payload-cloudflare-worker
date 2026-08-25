'use client'

import React, { useCallback } from 'react'
import { useConfig, useLocale } from '@payloadcms/ui'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Globe } from 'lucide-react'
import './styles.css'

export type LocaleSelectorBarProps = {
  hasAutotranslate?: boolean
}

/**
 * LocaleSelectorBar — sticky bar at the top of every collection document edit view.
 * Shows locale pills. Clicking a pill updates the ?locale= query parameter so Payload
 * reloads the document in the chosen locale.
 */
export function LocaleSelectorBar({ hasAutotranslate }: LocaleSelectorBarProps) {
  const { config } = useConfig()
  const currentLocale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const locales = config.localization
    ? Array.isArray(config.localization.locales)
      ? config.localization.locales
      : []
    : []

  const handleLocaleSwitch = useCallback(
    (localeCode: string) => {
      if (localeCode === currentLocale?.code) return
      const params = new URLSearchParams(searchParams.toString())
      params.set('locale', localeCode)
      router.push(`${pathname}?${params.toString()}`)
    },
    [currentLocale?.code, pathname, router, searchParams],
  )

  if (!locales.length) return null

  return (
    <div className="loc-bar" aria-label="Locale selector">
      <Globe size={13} style={{ opacity: 0.4 }} />
      <span className="loc-bar__label">Locale</span>
      {(locales as any[]).map((locale) => {
        const code: string =
          typeof locale === 'string' ? locale : ((locale as any).code ?? String(locale))
        const label: string =
          typeof locale === 'string'
            ? locale.toUpperCase()
            : String((locale as any).label ?? (locale as any).code ?? locale).toUpperCase()

        const isActive = currentLocale?.code === code

        return (
          <button
            key={code}
            type="button"
            className={`loc-bar__pill${isActive ? ' loc-bar__pill--active' : ''}`}
            onClick={() => handleLocaleSwitch(code)}
            aria-label={`Switch to ${label} locale`}
            aria-pressed={isActive}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default LocaleSelectorBar
