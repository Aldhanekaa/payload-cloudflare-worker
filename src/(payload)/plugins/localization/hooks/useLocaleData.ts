'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@payloadcms/ui'

export type LocaleFieldData = {
  value: string | null
  isLoading: boolean
  error: string | null
}

export type LocaleDataMap = Record<string, LocaleFieldData>

/**
 * useLocaleData — fetch a specific field's value across all given locales
 * by calling the Payload REST API.
 *
 * @param collectionSlug  - e.g. 'posts'
 * @param docId           - document id
 * @param fieldPath       - dot-notation path to the field, e.g. 'title' or 'meta.title'
 * @param localeCodes     - array of locale codes to fetch
 */
export function useLocaleData(
  collectionSlug: string | null,
  docId: string | number | null,
  fieldPath: string,
  localeCodes: string[],
) {
  const { token } = useAuth()
  const [data, setData] = useState<LocaleDataMap>({})
  const [isFetching, setIsFetching] = useState(false)

  const localeKey = localeCodes.join(',')

  const fetchAll = useCallback(async () => {
    const codes = localeKey.split(',').filter(Boolean)
    if (!collectionSlug || !docId || !codes.length) {
      setIsFetching(false)
      return
    }

    setIsFetching(true)

    const results: LocaleDataMap = {}

    await Promise.all(
      codes.map(async (locale) => {
        try {
          const headers: Record<string, string> = {}
          if (token && typeof token === 'string' && token !== 'null' && token !== 'undefined') {
            headers.Authorization = `JWT ${token}`
          }

          const res = await fetch(
            `/api/${collectionSlug}/${docId}?locale=${locale}&depth=0&draft=true&fallback-locale=null`,
            {
              headers,
              credentials: 'include',
            },
          )

          if (!res.ok) {
            results[locale] = {
              value: null,
              isLoading: false,
              error: `HTTP ${res.status}`,
            }
            return
          }

          const doc = await res.json()

          // Resolve nested path e.g. "meta.title"
          const value = resolvePath(doc, fieldPath)

          results[locale] = {
            value: typeof value === 'string' ? value : value != null ? String(value) : null,
            isLoading: false,
            error: null,
          }
        } catch (err) {
          results[locale] = {
            value: null,
            isLoading: false,
            error: String(err),
          }
        }
      }),
    )

    setData(results)
    setIsFetching(false)
  }, [collectionSlug, docId, fieldPath, localeKey, token])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return { data, isFetching, refetch: fetchAll }
}

/** Resolve a dot-notation path from an object */
function resolvePath(obj: Record<string, any>, path: string): unknown {
  return path.split('.').reduce((acc, key) => {
    if (acc == null) return null
    return acc[key]
  }, obj as any)
}
