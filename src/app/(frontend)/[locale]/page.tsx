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

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main>
      <HomePageHero />

      <HomeAboutAndersenProperties />
      <HomeFeaturedProperties />
      <HomeSignaturedDevelopment />
      <HomeExpertise />
      <HomeConsiderationSteps />
      <HomePlaces />
      <HomeClientTestimonial />

      <HomePath />
      <HomeJournalSection />

      <HomeFAQs />
      <HomeCTA />
    </main>
  )
}
