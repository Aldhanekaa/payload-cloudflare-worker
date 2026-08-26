import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PortfoliosHero from '@/components/Portfolios/PortfoliosHero'
import PortfoliosGrid from '@/components/Portfolios/PortfoliosGrid'
import { getCachedCollection } from '@/utilities/getCollection'
import type { LocaleCodes } from '@/i18n/localization'
import type { Portfolio } from '@/payload-types'
import { generateLocalizedMeta } from '@/utilities/generateLocalizedMeta'

type PageProps = {
  params: Promise<{ locale: LocaleCodes }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.portfolios' })

  return generateLocalizedMeta({
    title: t('title'),
    description: t('description'),
    path: '/portfolios',
    locale,
  })
}

export default async function PortfoliosPage({ params }: PageProps) {
  const { locale } = await params

  // Fetch all portfolios with city relationship populated (depth=1)
  const result = await getCachedCollection(
    {
      collection: 'portfolios',
      depth: 3,
      limit: 100,
      sort: '-createdAt',
    },
    locale,
  )()

  const portfolios = result.docs as Portfolio[]

  return (
    <main className="  bg-[#f7f5f0] min-h-screen">
      <PortfoliosHero portfolios={portfolios} />
      <PortfoliosGrid portfolios={portfolios} />
    </main>
  )
}
