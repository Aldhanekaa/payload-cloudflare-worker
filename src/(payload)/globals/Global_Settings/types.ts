export interface WhatsAppContact {
  countryCode: string
  number: string
  displayText?: string
}

export interface Announcement {
  isActive?: boolean
  priority?: 'high' | 'normal' | 'low'
  announcement: string
  announcementLink?: {
    type: 'reference' | 'custom'
    reference?: {
      relationTo: string
      value: string | number
    }
    url?: string
    label?: string
    newTab?: boolean
    appearance?: 'default' | 'outline'
  }
  startDate?: string
  endDate?: string
  id?: string
}

export interface GlobalSettings {
  whatsapp: WhatsAppContact
  scheduleConsultationLink?: string
  announcements?: Announcement[]
  currentSeasonPromotionLink?: {
    type: 'reference' | 'custom'
    reference?: {
      relationTo: string
      value: string | number
    }
    url?: string
    label?: string
    newTab?: boolean
    appearance?: 'default' | 'outline'
  }
  updatedAt: string
  createdAt: string
}

/**
 * Helper function to get the full WhatsApp URL
 */
export function getWhatsAppUrl(whatsapp: WhatsAppContact, message?: string): string {
  const phoneNumber = `${whatsapp.countryCode}${whatsapp.number}`.replace(/[^0-9+]/g, '')
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${phoneNumber}${encodedMessage}`
}

/**
 * Helper function to get active announcements
 */
export function getActiveAnnouncements(announcements?: Announcement[]): Announcement[] {
  if (!announcements) return []

  const now = new Date()

  return announcements.filter((announcement) => {
    // Check if announcement is active
    if (announcement.isActive === false) return false

    // Check start date
    if (announcement.startDate && new Date(announcement.startDate) > now) return false

    // Check end date
    if (announcement.endDate && new Date(announcement.endDate) < now) return false

    return true
  })
}

/**
 * Helper function to sort announcements by priority
 */
export function sortAnnouncementsByPriority(announcements: Announcement[]): Announcement[] {
  const priorityOrder = { high: 0, normal: 1, low: 2 }

  return [...announcements].sort((a, b) => {
    const priorityA = priorityOrder[a.priority || 'normal']
    const priorityB = priorityOrder[b.priority || 'normal']
    return priorityA - priorityB
  })
}
