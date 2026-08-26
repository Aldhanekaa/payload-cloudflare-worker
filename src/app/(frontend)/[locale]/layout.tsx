import React from 'react'
import type { Metadata } from 'next'
import './styles.css'

import { NextIntlClientProvider } from 'next-intl'
import localization from '@/i18n/localization'
import { routing } from '@/i18n/routing'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { cormorant_garamond, inter } from '@/app/fonts'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getGlobalSettings } from '@/(payload)/globals/Global_Settings'
import { getActiveAnnouncements } from '@/(payload)/globals/Global_Settings/types'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { getServerSideURL } from '@/utilities/getURL'
import JoinUrl from '@/utilities/joinUrl'
import { JsonLd } from '@/components/JsonLd'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo' })

  const serverUrl = getServerSideURL()
  const canonicalUrl = JoinUrl(`/${locale}`)
  const enUrl = JoinUrl('/en')
  const idUrl = JoinUrl('/id')

  return {
    metadataBase: new URL(serverUrl),
    title: {
      template: t('titleTemplate'),
      default: t('defaultTitle'),
    },
    description: t('defaultDescription'),
    keywords: t('defaultKeywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        id: idUrl,
        'x-default': idUrl,
      },
    },
    openGraph: {
      siteName: t('siteName'),
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      alternateLocale: locale === 'id' ? ['en_US'] : ['id_ID'],
      type: 'website',
      images: [
        {
          url: `${serverUrl}/website-template-OG.webp`,
          width: 1200,
          height: 630,
          alt: t('siteName'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@andersenprop',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
  }
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

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()
  const { isEnabled } = await draftMode()

  // Fetch global settings
  const settings = await getGlobalSettings()

  // Get only active announcements (filtered by date and isActive flag)
  const activeAnnouncements = settings ? getActiveAnnouncements(settings.announcements) : []

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Andersen Properties',
    url: getServerSideURL(),
    logo: `${getServerSideURL()}/logo.png`,
    description:
      'Exceptional properties and thoughtfully designed developments across Indonesia selected for architecture, location, and lasting value.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
    },
  }

  return (
    <html lang={locale}>
      <body className={`${cormorant_garamond.variable} ${inter.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationJsonLd} />

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
          {/* {settings?.whatsapp && (
            <WhatsAppButton
              whatsapp={settings.whatsapp}
              variant="floating"
              message="Hello! I'm interested in learning more about your properties."
            />
          )} */}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
