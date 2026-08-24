import { getPayload } from 'payload'
import config from '@payload-config'
import type { GlobalSettings } from './types'

/**
 * Server-side function to fetch global settings
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

/**
 * Server-side function to get WhatsApp contact info
 */
export async function getWhatsAppContact() {
  const settings = await getGlobalSettings()
  return settings?.whatsapp || null
}

/**
 * Server-side function to get active announcements
 */
export async function getActiveAnnouncements() {
  const settings = await getGlobalSettings()
  if (!settings?.announcements) return []

  const now = new Date()

  return settings.announcements.filter((announcement) => {
    if (announcement.isActive === false) return false
    if (announcement.startDate && new Date(announcement.startDate) > now) return false
    if (announcement.endDate && new Date(announcement.endDate) < now) return false
    return true
  })
}

/**
 * Server-side function to get schedule consultation link
 */
export async function getScheduleConsultationLink() {
  const settings = await getGlobalSettings()
  return settings?.scheduleConsultationLink || null
}
