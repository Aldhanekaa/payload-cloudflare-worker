import type { Metadata } from 'next'
import PortfoliosHero from '@/components/Portfolios/PortfoliosHero'
import PortfoliosGrid from '@/components/Portfolios/PortfoliosGrid'
import { getCachedCollection } from '@/utilities/getCollection'
import type { LocaleCodes } from '@/i18n/localization'
import type { Portfolio } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Portfolios — Andersen Properties',
  description:
    'A record of every development we have curated, delivered, and sold — from active projects open for purchase to completed collections.',
}

type PageProps = {
  params: Promise<{ locale: LocaleCodes }>
}

export default async function PortfoliosPage({ params }: PageProps) {
  const { locale } = await params

  // Fetch all portfolios with city relationship populated (depth=1)
  const result = await getCachedCollection(
    {
      collection: 'portfolios',
      depth: 1,
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
