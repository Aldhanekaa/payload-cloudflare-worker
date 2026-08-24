/**
 * Seed Script for Global Settings
 *
 * This script populates the global settings with sample data.
 * Run this after setting up the Global Settings configuration.
 *
 * Usage:
 * - Import and call this function from your main seed script
 * - Or use it as reference for manually entering data in Payload CMS
 */

import { getPayload } from 'payload'
import config from '@payload-config'

export async function seedGlobalSettings() {
  const payload = await getPayload({ config })

  console.log('Seeding Global Settings...')

  try {
    const globalSettings = await payload.updateGlobal({
      slug: 'global-settings',
      data: {
        // WhatsApp Contact Information
        whatsapp: {
          countryCode: '+971', // UAE country code (change to your country)
          number: '501234567', // Replace with your actual WhatsApp number
          displayText: 'Contact us on WhatsApp',
        },

        // Schedule Consultation Link (replace with your actual link)
        scheduleConsultationLink: 'https://calendly.com/your-company/consultation',

        // Sample Announcements
        announcements: [
          {
            isActive: true,
            priority: 'high',
            announcement:
              '🎉 Grand Opening Sale! Get 20% off on all property consultations this month.',
            announcementLink: {
              type: 'custom',
              url: '/promotions',
              label: 'View Offer',
              newTab: false,
              appearance: 'default',
            },
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          },
          {
            isActive: true,
            priority: 'normal',
            announcement:
              'New luxury properties available in Downtown Dubai. Schedule a viewing today!',
            announcementLink: {
              type: 'custom',
              url: '/active-listings',
              label: 'Browse Properties',
              newTab: false,
              appearance: 'outline',
            },
          },
          {
            isActive: false, // This announcement is disabled
            priority: 'low',
            announcement: 'Join our newsletter for exclusive property deals and market insights.',
            announcementLink: {
              type: 'custom',
              url: '/newsletter',
              label: 'Subscribe Now',
              newTab: false,
              appearance: 'default',
            },
          },
        ],

        // Current Season Promotion Link (optional)
        currentSeasonPromotionLink: {
          type: 'custom',
          url: '/summer-promotion',
          label: 'Summer Special Offers - Learn More',
          newTab: false,
          appearance: 'default',
        },
      },
    })

    console.log('✅ Global Settings seeded successfully!')
    return globalSettings
  } catch (error) {
    console.error('❌ Error seeding Global Settings:', error)
    throw error
  }
}

/**
 * Sample data templates for different regions
 */
export const sampleDataByRegion = {
  UAE: {
    whatsapp: {
      countryCode: '+971',
      number: '501234567',
      displayText: 'تواصل معنا على واتساب / Contact us on WhatsApp',
    },
  },
  USA: {
    whatsapp: {
      countryCode: '+1',
      number: '5551234567',
      displayText: 'Text us on WhatsApp',
    },
  },
  UK: {
    whatsapp: {
      countryCode: '+44',
      number: '7700900000',
      displayText: 'Message us on WhatsApp',
    },
  },
  Singapore: {
    whatsapp: {
      countryCode: '+65',
      number: '81234567',
      displayText: 'WhatsApp Us',
    },
  },
}

// Example function to update just the WhatsApp settings
export async function updateWhatsAppSettings(
  countryCode: string,
  number: string,
  displayText?: string,
) {
  const payload = await getPayload({ config })

  return await payload.updateGlobal({
    slug: 'global-settings',
    data: {
      whatsapp: {
        countryCode,
        number,
        displayText,
      },
    },
  })
}

// Example function to add a new announcement
export async function addAnnouncement(announcementData: {
  announcement: string
  priority?: 'high' | 'normal' | 'low'
  linkUrl?: string
  linkLabel?: string
  startDate?: string
  endDate?: string
}) {
  const payload = await getPayload({ config })

  // Get current settings
  const currentSettings = await payload.findGlobal({
    slug: 'global-settings',
  })

  const newAnnouncement = {
    isActive: true,
    priority: announcementData.priority || 'normal',
    announcement: announcementData.announcement,
    announcementLink: announcementData.linkUrl
      ? {
          type: 'custom' as const,
          url: announcementData.linkUrl,
          label: announcementData.linkLabel || 'Learn More',
          newTab: false,
          appearance: 'default' as const,
        }
      : undefined,
    startDate: announcementData.startDate,
    endDate: announcementData.endDate,
  }

  // Add to existing announcements
  const updatedAnnouncements = [...(currentSettings.announcements || []), newAnnouncement]

  return await payload.updateGlobal({
    slug: 'global-settings',
    data: {
      announcements: updatedAnnouncements,
    },
  })
}
