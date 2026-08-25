import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ServicesHero from '@/components/Services/ServicesHero'
import ServicesDetail from '@/components/Services/ServicesDetail'
import ServicesPath from '@/components/Services/ServicesPath'
import ServicesExpertise from '@/components/Services/ServicesExpertise'
import ServicesFAQs from '@/components/Services/ServicesFAQs'
import ServicesCTA from '@/components/Services/ServicesCTA'
import type { LocaleCodes } from '@/i18n/localization'
import { generateLocalizedMeta } from '@/utilities/generateLocalizedMeta'
import { JsonLd } from '@/components/JsonLd'
import { getServerSideURL } from '@/utilities/getURL'

type PageProps = {
  params: Promise<{ locale: LocaleCodes }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.services' })

  return generateLocalizedMeta({
    title: t('title'),
    description: t('description'),
    path: '/services',
    locale,
  })
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params
  const serverUrl = getServerSideURL()

  const servicesJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Property Acquisition',
      description:
        'End-to-end guidance for clients purchasing property in Indonesia, from brief through to keys in hand.',
      provider: {
        '@type': 'RealEstateAgent',
        name: 'Andersen Properties',
        url: serverUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Property Sales',
      description: 'A deliberate, targeted approach to representing exceptional properties for sale.',
      provider: {
        '@type': 'RealEstateAgent',
        name: 'Andersen Properties',
        url: serverUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Development Advisory',
      description: 'Market intelligence and design thinking for developers at every stage of a project.',
      provider: {
        '@type': 'RealEstateAgent',
        name: 'Andersen Properties',
        url: serverUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Private Property Search',
      description:
        'A confidential service for clients seeking specific properties, including off-market opportunities.',
      provider: {
        '@type': 'RealEstateAgent',
        name: 'Andersen Properties',
        url: serverUrl,
      },
    },
  ]

  return (
    <main className="bg-[#f7f5f0]">
      <JsonLd data={servicesJsonLd} />
      <ServicesHero />
      <ServicesDetail />
      <ServicesPath />
      <ServicesExpertise />
      <ServicesFAQs />
      <ServicesCTA />
    </main>
  )
}
