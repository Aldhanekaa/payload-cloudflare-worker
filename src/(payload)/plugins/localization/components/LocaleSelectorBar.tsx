'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useConfig, useLocale, useDocumentInfo, useAuth } from '@payloadcms/ui'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Globe, CheckCircle2 } from 'lucide-react'
import type { Field } from 'payload'
import './styles.css'

export type LocaleSelectorBarProps = {
  hasAutotranslate?: boolean
}

/** Helper to recursively find all field paths marked with localized: true */
function getLocalizedFieldPaths(fields: any[], parentPath = ''): string[] {
  let paths: string[] = []
  if (!Array.isArray(fields)) return paths

  for (const field of fields) {
    if (field.type === 'tabs' && 'tabs' in field) {
      for (const tab of field.tabs) {
        paths = paths.concat(getLocalizedFieldPaths(tab.fields, parentPath))
      }
    } else if ('fields' in field && Array.isArray((field as any).fields)) {
      const nestedPath =
        'name' in field && field.name
          ? parentPath
            ? `${parentPath}.${field.name}`
            : field.name
          : parentPath
      paths = paths.concat(getLocalizedFieldPaths((field as any).fields, nestedPath))
    } else if ('name' in field && field.name && (field as any).localized) {
      const fieldPath = parentPath ? `${parentPath}.${field.name}` : field.name
      paths.push(fieldPath)
    }
  }
  return paths
}

/** Resolve dot-notation field path */
function resolveValue(obj: any, path: string): any {
  if (!obj) return null
  return path.split('.').reduce((acc, key) => (acc != null ? acc[key] : null), obj)
}

/** Check if value is non-empty */
function isNonEmpty(val: any): boolean {
  if (val == null) return false
  if (typeof val === 'string') return val.trim().length > 0
  if (Array.isArray(val)) return val.length > 0
  if (typeof val === 'object') return Object.keys(val).length > 0
  return true
}

export function LocaleSelectorBar({ hasAutotranslate }: LocaleSelectorBarProps) {
  const { config } = useConfig()
  const currentLocale = useLocale()
  const { id, collectionSlug } = useDocumentInfo()
  const { token } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [progressMap, setProgressMap] = useState<Record<string, number>>({})

  // Locales list
  const locales = useMemo(() => {
    return config.localization && Array.isArray(config.localization.locales)
      ? config.localization.locales
      : []
  }, [config.localization])

  // Get current collection config and localized field paths
  const collection = useMemo(() => {
    return (config.collections ?? []).find((c) => c.slug === collectionSlug)
  }, [config.collections, collectionSlug])

  const localizedPaths = useMemo(() => {
    return collection ? getLocalizedFieldPaths(collection.fields) : []
  }, [collection])

  // Calculate translation progress across all locales
  useEffect(() => {
    if (!id || !collectionSlug || !locales.length || !localizedPaths.length) return

    let isMounted = true

    const fetchProgress = async () => {
      const results: Record<string, number> = {}

      await Promise.all(
        locales.map(async (localeItem) => {
          const code = typeof localeItem === 'string' ? localeItem : (localeItem as any).code
          try {
            const headers: Record<string, string> = {}
            if (token) headers.Authorization = `JWT ${token}`

            const res = await fetch(
              `/api/${collectionSlug}/${id}?locale=${code}&depth=0&draft=true&fallback-locale=null`,
              { headers, credentials: 'include' },
            )

            if (!res.ok) {
              results[code] = 0
              return
            }

            const doc = await res.json()
            let filledCount = 0
            for (const path of localizedPaths) {
              const val = resolveValue(doc, path)
              if (isNonEmpty(val)) filledCount++
            }

            results[code] = Math.round((filledCount / localizedPaths.length) * 100)
          } catch {
            results[code] = 0
          }
        }),
      )

      if (isMounted) {
        setProgressMap(results)
      }
    }

    fetchProgress()

    return () => {
      isMounted = false
    }
  }, [id, collectionSlug, locales, localizedPaths, token])

  // Determine currently active locale code safely from URL query param or useLocale()
  const activeLocaleCode = useMemo(() => {
    const fromUrl = searchParams.get('locale')
    if (fromUrl) return fromUrl
    if (typeof currentLocale === 'string') return currentLocale
    return (currentLocale as any)?.code ?? (config.localization as any)?.defaultLocale ?? 'id'
  }, [searchParams, currentLocale, config.localization])

  // Switch handler — only switches when selecting a locale OTHER than the current selected locale
  const handleLocaleSwitch = useCallback(
    (targetCode: string) => {
      console.log('targetCode', targetCode)
      // Do nothing if user clicks the currently active locale
      if (targetCode === activeLocaleCode) return

      const params = new URLSearchParams(searchParams.toString())
      params.set('locale', targetCode)
      router.push(`${pathname}?${params.toString()}`)
    },
    [activeLocaleCode, pathname, router, searchParams],
  )

  if (!locales.length) return null

  return (
    <div className="loc-bar" aria-label="Locale selector and progress bar">
      <div className="loc-bar__left">
        <Globe size={13} style={{ opacity: 0.5 }} />
        <span className="loc-bar__label">Translation Progress</span>
      </div>

      <div className="loc-bar__right">
        {(locales as any[]).map((localeItem) => {
          const code: string =
            typeof localeItem === 'string'
              ? localeItem
              : ((localeItem as any).code ?? String(localeItem))
          const label: string =
            typeof localeItem === 'string'
              ? localeItem.toUpperCase()
              : String(
                  (localeItem as any).label ?? (localeItem as any).code ?? localeItem,
                ).toUpperCase()

          const isActive = activeLocaleCode === code
          const progress = progressMap[code]

          return (
            <button
              key={code}
              type="button"
              className={`loc-bar__pill${isActive ? ' loc-bar__pill--active' : ''}`}
              onClick={() => handleLocaleSwitch(code)}
              aria-label={`Switch to ${label} locale`}
              aria-pressed={isActive}
            >
              {isActive && <span className="loc-bar__active-dot" title="Current Active Locale" />}
              <span>{label}</span>
              {progress !== undefined && localizedPaths.length > 0 && (
                <span
                  className={`loc-bar__progress-badge ${
                    progress === 100
                      ? 'loc-bar__progress-badge--complete'
                      : progress > 0
                        ? 'loc-bar__progress-badge--partial'
                        : ''
                  }`}
                >
                  {progress === 100 ? <CheckCircle2 size={10} style={{ marginRight: 2 }} /> : null}
                  {progress}%
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default LocaleSelectorBar
