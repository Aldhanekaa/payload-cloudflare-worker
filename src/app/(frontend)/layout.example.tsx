/**
 * EXAMPLE: Root Layout with Global Settings Integration
 *
 * This example shows how to integrate WhatsApp button and announcements
 * into your application's root layout.
 *
 * To use this:
 * 1. Review the implementation
 * 2. Adapt it to your existing layout structure
 * 3. Import the components and server functions as shown
 */

import { getGlobalSettings } from '@/(payload)/globals/Global_Settings'
import { getActiveAnnouncements } from '@/(payload)/globals/Global_Settings/types'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch global settings
  const settings = await getGlobalSettings()

  // Get only active announcements (filtered by date and isActive flag)
  const activeAnnouncements = settings ? getActiveAnnouncements(settings.announcements) : []

  return (
    <html lang="en">
      <body>
        {/* Display announcement banner if there are active announcements */}
        {activeAnnouncements.length > 0 && (
          <AnnouncementBanner
            announcements={activeAnnouncements}
            showAll={false} // Only show highest priority announcement
          />
        )}

        {/* Your main content */}
        <main>{children}</main>

        {/* Floating WhatsApp button (bottom right corner) */}
        {settings?.whatsapp && (
          <WhatsAppButton
            whatsapp={settings.whatsapp}
            variant="floating"
            message="Hello! I'm interested in learning more about your properties."
          />
        )}
      </body>
    </html>
  )
}
