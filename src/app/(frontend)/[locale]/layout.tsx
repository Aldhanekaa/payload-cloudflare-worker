import React from 'react'
import './styles.css'

import { NextIntlClientProvider } from 'next-intl'
import localization from '@/i18n/localization'
import { routing } from '@/i18n/routing'

import { TypedLocale } from 'payload'

import { getMessages } from 'next-intl/server'

import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { cormorant_garamond, inter } from '@/app/fonts'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getGlobalSettings } from '@/(payload)/globals/Global_Settings'
import { getActiveAnnouncements } from '@/(payload)/globals/Global_Settings/types'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}) {
  const { locale } = await params
  const currentLocale = localization.locales.find((location) => location.code === locale)
  // const direction = currentLocale?.rtl ? 'rtl' : 'ltr'

  const messages = await getMessages()

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const { isEnabled } = await draftMode()

  // Fetch global settings
  const settings = await getGlobalSettings()

  // Get only active announcements (filtered by date and isActive flag)
  const activeAnnouncements = settings ? getActiveAnnouncements(settings.announcements) : []

  return (
    <html lang="en">
      <body className={`${cormorant_garamond.variable} ${inter.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {/* Display announcement banner if there are active announcements */}
          {activeAnnouncements.length > 0 && (
            <AnnouncementBanner
              announcements={activeAnnouncements}
              showAll={false} // Only show highest priority announcement
            />
          )}

          <Navbar />
          <main>{children}</main>
          <Footer />

          {/* Floating WhatsApp button (bottom right corner) */}
          {settings?.whatsapp && (
            <WhatsAppButton
              whatsapp={settings.whatsapp}
              variant="floating"
              message="Hello! I'm interested in learning more about your properties."
            />
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
