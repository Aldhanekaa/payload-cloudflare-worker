import { getPayload } from 'payload'
import config from '@/payload.config'
import type { GlobalSettings } from './types'

/**
 * Server-side function to fetch global settings
 * Can be used in Server Components and API routes
 */
export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({
      slug: 'global-settings',
    })
    return settings as GlobalSettings
  } catch (error) {
    console.error('Error fetching global settings:', error)
    return null
  }
}
