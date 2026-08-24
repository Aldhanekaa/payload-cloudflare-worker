import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
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
import type { LocaleCodes } from '@/i18n/localization'
import type { Property, City as PayloadCity, Post } from '@/payload-types'

type PageProps = {
  params: Promise<{ locale: LocaleCodes }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // Fetch cities with property counts
  const citiesResult = await getCachedCollection(
    {
      collection: 'cities',
      depth: 1,
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

  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main>
      <HomePageHero />

      <HomeAboutAndersenProperties />
      <HomeFeaturedProperties properties={properties} />
      <HomeSignaturedDevelopment />
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
