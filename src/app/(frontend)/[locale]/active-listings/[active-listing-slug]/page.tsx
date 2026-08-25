import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/Active_Listings/Breadcrumb'
import { ImageSlider } from '@/components/Active_Listings/ImageSlider'
import { PropertyHeader } from '@/components/Active_Listings/PropertyHeader'
import { PropertyStats } from '@/components/Active_Listings/PropertyStats'
import { PropertyDescription } from '@/components/Active_Listings/PropertyDescription'
import { PropertyFeatures } from '@/components/Active_Listings/PropertyFeatures'
import { PropertySidebar } from '@/components/Active_Listings/PropertySidebar'
import { BackToListings } from '@/components/Active_Listings/BackToListings'
import { LISTINGS } from '@/components/Active_Listings/data'
import { LISTING_DETAILS } from '@/components/Active_Listings/listing-details-data'
import { getCachedCollection } from '@/utilities/getCollection'
import { ENABLE_DUMMY_FALLBACK } from '@/config/fallback'
import type { LocaleCodes } from '@/i18n/localization'
import type { Media } from '@/payload-types'
import { generateLocalizedMeta } from '@/utilities/generateLocalizedMeta'
import { JsonLd } from '@/components/JsonLd'
import { getServerSideURL } from '@/utilities/getURL'

interface PageProps {
  params: Promise<{
    locale: LocaleCodes
    'active-listing-slug': string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'active-listing-slug': slug, locale } = await params

  const result = await getCachedCollection(
    {
      collection: 'properties',
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    },
    locale,
  )()

  const cmsProperty = result.docs[0] as any

  let title = cmsProperty?.meta?.title || cmsProperty?.title
  let description = cmsProperty?.meta?.description || cmsProperty?.description
  let image: string | Media | null = cmsProperty?.meta?.image || null

  if (!image && cmsProperty?.images?.[0]?.image) {
    const firstImg = cmsProperty.images[0].image
    image = typeof firstImg === 'object' ? (firstImg as Media) : null
  }

  if (!title && ENABLE_DUMMY_FALLBACK.properties) {
    const dummyListing = LISTINGS.find((l) => l.slug === slug || l.id === slug)
    if (dummyListing) {
      title = dummyListing.name
      image = dummyListing.image
      const details = LISTING_DETAILS[dummyListing.id]
      description = details?.description || `Exclusive property in ${dummyListing.location}`
    }
  }

  return generateLocalizedMeta({
    title: title ? `${title} — Active Listings` : 'Active Listing',
    description: description || 'Exclusive property in Indonesia by Andersen Properties.',
    path: `/active-listings/${slug}`,
    locale,
    image,
  })
}

export default async function ActiveListingPage({ params }: PageProps) {
  const { 'active-listing-slug': slug, locale } = await params

  // Try to fetch from CMS
  const result = await getCachedCollection(
    {
      collection: 'properties',
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    },
    locale,
  )()

  const cmsProperty = result.docs[0] as any // Use 'any' until types are regenerated

  // Use CMS data or fallback to dummy data
  let listing: (typeof LISTINGS)[0] | null = null
  let details: (typeof LISTING_DETAILS)[string] | null = null

  if (cmsProperty) {
    // Transform CMS data
    const cityData = typeof cmsProperty.city === 'object' ? cmsProperty.city : null
    const firstImage = cmsProperty.images?.[0]
    const imageData =
      firstImage && typeof firstImage.image === 'object' ? (firstImage.image as Media) : null

    // Get property type name
    const propertyTypeData =
      typeof cmsProperty.propertyType === 'object' ? cmsProperty.propertyType : null
    const category = propertyTypeData?.name || 'Property'

    // Map listingType: sale → buy (for component compatibility)
    const listingTypeMap: Record<string, (typeof LISTINGS)[0]['listingType']> = {
      sale: 'buy',
      rent: 'rent',
      both: 'both',
    }

    // Format build area
    const buildAreaText = cmsProperty.buildArea ? `${cmsProperty.buildArea} m²` : '0 m²'

    listing = {
      id: String(cmsProperty.id),
      slug: cmsProperty.slug || String(cmsProperty.id),
      name: cmsProperty.title || '',
      location: cmsProperty.location || '',
      city: (cityData?.name as any) || 'Bali',
      category: category as any,
      beds: cmsProperty.bedrooms || 0,
      baths: cmsProperty.bathrooms || 0,
      area: buildAreaText,
      listingType: listingTypeMap[cmsProperty.listingType] || 'buy',
      salePrice: cmsProperty.purchasePrice,
      rentPrice: cmsProperty.rentalPrice,
      badge: undefined,
      image: imageData?.url || '',
      imageAlt: firstImage?.caption || cmsProperty.title || '',
      salePriceValue: null,
      rentPriceValue: null,
    }

    // Transform detail images from images array
    const detailImages =
      cmsProperty.images?.map((img: any) => {
        const imgData = typeof img.image === 'object' ? (img.image as Media) : null
        return {
          url: imgData?.url || '',
          alt: img.caption || cmsProperty.title || '',
        }
      }) || []

    // Transform features
    const features = cmsProperty.features?.map((f: any) => f.feature) || []

    // Format land area
    const landAreaText = cmsProperty.landArea ? `${cmsProperty.landArea} m²` : '500 m²'

    // Transform dataPoints
    const dataPoints =
      cmsProperty.dataPoints?.map((dp: any) => ({
        name: dp.dataName,
        value: dp.dataDetail,
      })) || []

    details = {
      images: detailImages,
      landArea: landAreaText,
      yearBuilt: cmsProperty.yearBuilt || 2020,
      description: cmsProperty.description || 'Beautiful property in a prime location.',
      note: '', // No note field in current schema
      features: features.length > 0 ? features : ['Modern Design', 'Prime Location'],
      dataPoints: dataPoints,
    }
  } else if (ENABLE_DUMMY_FALLBACK.properties) {
    // Fallback to dummy data (using slug for dummy data)
    listing = LISTINGS.find((l) => l.slug === slug || l.id === slug) || null
    if (listing) {
      details = LISTING_DETAILS[listing.id] || {
        images: [{ url: listing.image, alt: listing.imageAlt }],
        landArea: '500 m²',
        yearBuilt: 2020,
        description: 'Beautiful property in a prime location.',
        note: 'Unfurnished',
        features: ['Modern Design', 'Prime Location', 'High Quality Finishes'],
        dataPoints: [],
      }
    }
  }

  if (!listing || !details) {
    notFound()
  }

  const listingTypeText =
    listing.listingType === 'both' ? 'Buy or Rent' : listing.listingType === 'buy' ? 'Buy' : 'Rent'

  const serverUrl = getServerSideURL()
  const pageUrl = `${serverUrl}/${locale}/active-listings/${slug}`

  const propertyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.name,
    description: details.description,
    url: pageUrl,
    image: details.images.map((img) => img.url).filter(Boolean),
    offers: {
      '@type': 'Offer',
      price: listing.salePrice || listing.rentPrice || 'Contact for Price',
      priceCurrency: 'IDR',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${serverUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Active Listings',
        item: `${serverUrl}/${locale}/active-listings`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: listing.name,
        item: pageUrl,
      },
    ],
  }

  return (
    <main className=" ">
      <JsonLd data={[propertyJsonLd, breadcrumbJsonLd]} />
      <div className="bg-[#f7f5f0] min-h-screen">
        {/* Breadcrumb */}
        <div className="px-5 md:px-20 max-w-360 mx-auto pt-8 pb-6">
          <Breadcrumb
            items={[
              { label: 'Active Listings', href: '/active-listings' },
              { label: listing.name },
            ]}
          />
        </div>

        {/* Image Slider */}
        <ImageSlider images={details.images} badge={listing.badge} />

        {/* Main Content */}
        <div className="px-5 md:px-20 max-w-360 mx-auto pt-14 pb-25">
          <div className="grid grid-cols-1! md:grid-cols-[1fr_360px]! gap-16">
            {/* Left Column - Property Details */}
            <div>
              <PropertyHeader
                category={listing.category}
                city={listing.city}
                listingType={listingTypeText}
                title={listing.name}
                location={listing.location}
              />

              <PropertyStats
                bedrooms={listing.beds}
                bathrooms={listing.baths}
                buildArea={listing.area}
                landArea={details.landArea}
                yearBuilt={details.yearBuilt}
                dataPoints={details.dataPoints}
              />

              <PropertyDescription description={details.description} note={details.note} />

              <PropertyFeatures features={details.features} />
            </div>

            {/* Right Column - Sidebar */}
            <div>
              <PropertySidebar
                salePrice={listing.salePrice}
                rentPrice={listing.rentPrice}
                location={listing.location}
                category={listing.category}
                beds={listing.beds}
                baths={listing.baths}
                buildArea={listing.area}
                landArea={details.landArea}
              />
            </div>
          </div>

          <BackToListings />
        </div>
      </div>
    </main>
  )
}
