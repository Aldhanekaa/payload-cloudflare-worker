import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import './styles.css'
import HomePageHero from '@/components/Home/home_hero'
import HomeAboutAndersenProperties from '@/components/Home/home_about_andersen_properties'
import HomePath from '@/components/Home/home_path'
import HomeConsiderationSteps from '@/components/Home/home_consideration_steps'
import HomePlaces from '@/components/Home/home_places'
import HomeExpertise from '@/components/Home/home_expertise'
import HomeFAQs from '@/components/Home/home_faqs'
import HomeFeaturedProperties from '@/components/Home/home_featured_properties'
import HomeSignaturedDevelopment from '@/components/Home/home_signature_development'
import HomeJournalSection from '@/components/Home/home_journal_section'
import HomeClientTestimonial from '@/components/Home/home_client_testimonial'
import HomeCTA from '@/components/Home/home_cta'
import { getCachedCollection } from '@/utilities/getCollection'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { LocaleCodes } from '@/i18n/localization'
import type { GlobalSetting, Property, City as PayloadCity, Post, Portfolio } from '@/payload-types'
import { generateLocalizedMeta } from '@/utilities/generateLocalizedMeta'

type PageProps = {
  params: Promise<{ locale: LocaleCodes }>
}

type GlobalSettingsWithSignatureDevelopments = GlobalSetting & {
  signatureDevelopments?: Array<{
    portfolio?: number | Portfolio | null
    id?: string | null
  }> | null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.home' })

  return generateLocalizedMeta({
    title: t('title'),
    description: t('description'),
    path: '',
    locale,
  })
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // Fetch cities with property counts
  const citiesResult = await getCachedCollection(
    {
      collection: 'cities',
      depth: 2,
      limit: 100,
    },
    locale,
  )()

  const cities = citiesResult.docs as PayloadCity[]

  // Fetch featured properties (limit 5)
  const propertiesResult = await getCachedCollection(
    {
      collection: 'properties',
      depth: 1,
      limit: 5,
      where: {
        status: {
          equals: 'active',
        },
      },
      sort: '-createdAt',
    },
    locale,
  )()

  const properties = propertiesResult.docs as Property[]

  // Fetch latest posts (limit 3)
  const postsResult = await getCachedCollection(
    {
      collection: 'posts',
      depth: 1,
      limit: 3,
      where: {
        _status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
    },
    locale,
  )()

  const posts = postsResult.docs as Post[]

  // Fetch homepage global settings for featured signature development.
  const globalSettings =
    ((await getCachedGlobal(
      'global-settings',
      3,
      locale,
    )()) as GlobalSettingsWithSignatureDevelopments) || null

  const featuredSignaturePortfolios =
    globalSettings?.signatureDevelopments
      ?.map((item) => item?.portfolio)
      .filter((portfolio): portfolio is Portfolio =>
        Boolean(portfolio && typeof portfolio === 'object'),
      ) || []

  console.log('featuredSignaturePortfolios', featuredSignaturePortfolios)
  console.log('globalSettings?.signatureDevelopments', globalSettings?.signatureDevelopments)
  console.log('globalSettings', globalSettings)

  console.log('posts', posts)
  return (
    <main>
      <HomePageHero />

      <HomeAboutAndersenProperties />
      <HomeFeaturedProperties properties={properties} />
      <HomeSignaturedDevelopment featuredPortfolios={featuredSignaturePortfolios} />
      <HomeExpertise />
      <HomeConsiderationSteps />
      <HomePlaces cities={cities} />
      <HomeClientTestimonial />

      <HomePath />
      <HomeJournalSection posts={posts} />

      <HomeFAQs />
      <HomeCTA />
    </main>
  )
}
