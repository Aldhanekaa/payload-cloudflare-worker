import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutHero from '@/components/About/AboutHero'
import AboutIntro from '@/components/About/AboutIntro'
import AboutPrinciples from '@/components/About/AboutPrinciples'
import AboutTeam from '@/components/About/AboutTeam'
import HomeConsiderationSteps from '@/components/Home/home_consideration_steps'
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
  const t = await getTranslations({ locale, namespace: 'seo.about' })

  return generateLocalizedMeta({
    title: t('title'),
    description: t('description'),
    path: '/about',
    locale,
  })
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  const serverUrl = getServerSideURL()

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Andersen Properties',
    url: `${serverUrl}/${locale}/about`,
    description:
      'Built on considered advice and earned trust. Learn about the people and principles behind Andersen Properties.',
    publisher: {
      '@type': 'RealEstateAgent',
      name: 'Andersen Properties',
      url: serverUrl,
    },
  }

  return (
    <main className="bg-[#f7f5f0]">
      <JsonLd data={aboutJsonLd} />
      <AboutHero />
      <AboutIntro />
      <AboutPrinciples />
      <AboutTeam />
      <HomeConsiderationSteps />
      <ServicesCTA />
    </main>
  )
}
