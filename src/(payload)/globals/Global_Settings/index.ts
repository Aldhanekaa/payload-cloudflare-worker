// Export only types and client-side utilities
// DO NOT export GlobalSettings config as it contains server-side hooks
// export { GlobalSettings } from './config'
export type { GlobalSettings as GlobalSettingsType, WhatsAppContact, Announcement } from './types'
export { getWhatsAppUrl, getActiveAnnouncements, sortAnnouncementsByPriority } from './types'
export { useGlobalSettings } from './useGlobalSettings'
// Server functions should be imported directly, not from this barrel export
export { getGlobalSettings } from './getGlobalSettings'
