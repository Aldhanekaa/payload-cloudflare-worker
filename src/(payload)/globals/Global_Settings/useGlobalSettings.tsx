'use client'

import { useEffect, useState } from 'react'
import type { GlobalSettings } from './types'

/**
 * Client-side hook to fetch global settings
 */
export function useGlobalSettings() {
  const [settings, setSettings] = useState<GlobalSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch('/api/globals/global-settings')
        if (!response.ok) {
          throw new Error('Failed to fetch global settings')
        }
        const data = await response.json()
        setSettings(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return { settings, loading, error }
}
