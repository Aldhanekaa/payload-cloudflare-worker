import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import InsightsHero from '@/components/Insights/InsightsHero'
import InsightsGrid from '@/components/Insights/InsightsGrid'
import { getCachedCollection } from '@/utilities/getCollection'
import type { LocaleCodes } from '@/i18n/localization'
import type { Post } from '@/payload-types'
import { generateLocalizedMeta } from '@/utilities/generateLocalizedMeta'

type PageProps = {
  params: Promise<{ locale: LocaleCodes }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.insights' })

  return generateLocalizedMeta({
    title: t('title'),
    description: t('description'),
    path: '/insights',
    locale,
  })
}

export default async function InsightsPage({ params }: PageProps) {
  const { locale } = await params

  // Fetch all posts with categories and hero image populated (depth=1)
  const result = await getCachedCollection(
    {
      collection: 'posts',
      depth: 1,
      limit: 100,
      sort: '-publishedAt',
    },
    locale,
  )()

  const posts = result.docs as Post[]

  return (
    <main className="  bg-[#f7f5f0] min-h-screen">
      <InsightsHero />
      <InsightsGrid posts={posts} />
    </main>
  )
}
