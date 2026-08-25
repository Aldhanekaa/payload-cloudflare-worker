import type { Metadata } from 'next'
import InsightsHero from '@/components/Insights/InsightsHero'
import InsightsGrid from '@/components/Insights/InsightsGrid'
import { getCachedCollection } from '@/utilities/getCollection'
import type { LocaleCodes } from '@/i18n/localization'
import type { Post } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Insights — Andersen Properties',
  description:
    'Architecture, market intelligence, and considered perspectives from the Andersen Properties team.',
}

type PageProps = {
  params: Promise<{ locale: LocaleCodes }>
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
