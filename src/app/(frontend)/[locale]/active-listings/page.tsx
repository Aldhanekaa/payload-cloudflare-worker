import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ListingsHero from '@/components/Active_Listings/listings_hero'
import ListingsGrid from '@/components/Active_Listings/listings_grid'
import { getCachedCollection } from '@/utilities/getCollection'
import type { LocaleCodes } from '@/i18n/localization'
import type { Property } from '@/payload-types'
import { generateLocalizedMeta } from '@/utilities/generateLocalizedMeta'

type PageProps = {
  params: Promise<{ locale: LocaleCodes }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.activeListings' })

  return generateLocalizedMeta({
    title: t('title'),
    description: t('description'),
    path: '/active-listings',
    locale,
  })
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
