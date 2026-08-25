import type { Metadata } from 'next'
import ListingsHero from '@/components/Active_Listings/listings_hero'
import ListingsGrid from '@/components/Active_Listings/listings_grid'
import { getCachedCollection } from '@/utilities/getCollection'
import type { LocaleCodes } from '@/i18n/localization'
import type { Property } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Active Listings | Andersen Properties',
  description:
    "Every property personally selected for architectural quality, location, and long-term value across Indonesia's key markets.",
}

type PageProps = {
  params: Promise<{ locale: LocaleCodes }>
}

export default async function ActiveListingsPage({ params }: PageProps) {
  const { locale } = await params

  // Fetch all properties with city relationship populated (depth=1)
  const result = await getCachedCollection(
    {
      collection: 'properties',
      depth: 1,
      limit: 100,
      sort: '-createdAt',
    },
    locale,
  )()

  const properties = result.docs as Property[]

  return (
    <main className=" ">
      <div className="bg-[#f7f5f0] min-h-screen">
        <ListingsHero />
        <ListingsGrid properties={properties} />
      </div>
    </main>
  )
}
