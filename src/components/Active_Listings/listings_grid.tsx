'use client'

import { useMemo, useState } from 'react'
import { LISTINGS, type Listing, type Badge } from './data'
import ListingsFilterBar, { type FilterState } from './listings_filter_bar'
import ListingCard from './listing_card'
import { ENABLE_DUMMY_FALLBACK } from '@/config/fallback'
import type { Property, Media } from '@/payload-types'

type SortOption = 'Default' | 'Price: Low to High' | 'Price: High to Low' | 'Newest First'

const SORT_OPTIONS: SortOption[] = [
  'Default',
  'Price: Low to High',
  'Price: High to Low',
  'Newest First',
]

type Props = {
  properties: Property[]
}

// ── Transform CMS data to component format ─────────────────────────────────

function transformPropertyData(properties: Property[]): Listing[] {
  return properties.map((p: any) => {
    const cityData = typeof p.city === 'object' ? p.city : null
    const firstImage = p.images?.[0]
    const imageData =
      firstImage && typeof firstImage.image === 'object' ? (firstImage.image as Media) : null

    // Get property type name
    const propertyTypeData = typeof p.propertyType === 'object' ? p.propertyType : null
    const category = propertyTypeData?.name || 'Property'

    // Map listingType: sale → buy (for component compatibility)
    const listingTypeMap: Record<string, Listing['listingType']> = {
      sale: 'buy',
      rent: 'rent',
      both: 'both',
    }

    // Format build area
    const buildAreaText = p.buildArea ? `${p.buildArea} m²` : '0 m²'

    // Extract numeric values for sorting
    const extractPriceValue = (priceStr: string | undefined): number | null => {
      if (!priceStr) return null
      const match = priceStr.match(/[\d.,]+/)
      if (!match) return null
      const numStr = match[0].replace(/,/g, '')
      return parseFloat(numStr)
    }

    return {
      id: String(p.id),
      slug: p.slug || String(p.id),
      name: p.title || '',
      location: p.location,
      city: cityData?.name || 'Bali',
      category: category,
      beds: p.bedrooms || 0,
      baths: p.bathrooms || 0,
      area: buildAreaText,
      listingType: listingTypeMap[p.listingType] || 'buy',
      salePrice: p.purchasePrice,
      rentPrice: p.rentalPrice,
      badge: undefined as Badge | undefined,
      image: imageData?.url || '',
      imageAlt: firstImage?.caption || p.title || '',
      salePriceValue: extractPriceValue(p.purchasePrice),
      rentPriceValue: extractPriceValue(p.rentalPrice),
    }
  })
}

export default function ListingsGrid({ properties: cmsProperties }: Props) {
  // Use CMS data or fallback to dummy data
  const listings = useMemo(() => {
    if (cmsProperties.length > 0 || !ENABLE_DUMMY_FALLBACK.properties) {
      return transformPropertyData(cmsProperties)
    }
    return LISTINGS
  }, [cmsProperties])

  // Extract unique cities and categories from the listings data
  const availableCities = useMemo(() => {
    const cities = new Set<string>()
    listings.forEach((listing) => {
      if (listing.city) cities.add(listing.city)
    })
    return ['All Cities', ...Array.from(cities).sort()]
  }, [listings])

  const availableCategories = useMemo(() => {
    const categories = new Set<string>()
    listings.forEach((listing) => {
      if (listing.category) categories.add(listing.category)
    })
    return ['all', ...Array.from(categories).sort()]
  }, [listings])

  const [filters, setFilters] = useState<FilterState>({
    listingType: 'all',
    category: 'all',
    city: 'All Cities',
  })
  const [sort, setSort] = useState<SortOption>('Default')

  const filtered = useMemo(() => {
    let result = [...listings]

    // Listing type filter — 'both' listings always match buy or rent
    if (filters.listingType !== 'all') {
      result = result.filter(
        (l) => l.listingType === filters.listingType || l.listingType === 'both',
      )
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter((l) => l.category === filters.category)
    }

    // City filter
    if (filters.city !== 'All Cities') {
      result = result.filter((l) => l.city === filters.city)
    }

    // Sort
    if (sort === 'Price: Low to High') {
      result.sort((a, b) => {
        const aVal = a.salePriceValue ?? a.rentPriceValue ?? Infinity
        const bVal = b.salePriceValue ?? b.rentPriceValue ?? Infinity
        return aVal - bVal
      })
    } else if (sort === 'Price: High to Low') {
      result.sort((a, b) => {
        const aVal = a.salePriceValue ?? a.rentPriceValue ?? -Infinity
        const bVal = b.salePriceValue ?? b.rentPriceValue ?? -Infinity
        return bVal - aVal
      })
    } else if (sort === 'Newest First') {
      result.sort((a, b) => Number(b.id) - Number(a.id))
    }

    return result
  }, [listings, filters, sort])

  return (
    <>
      {/* Sticky filter bar */}
      <ListingsFilterBar
        filters={filters}
        onChange={setFilters}
        availableCities={availableCities}
        availableCategories={availableCategories}
      />

      <div className="px-5 md:px-20 max-w-360 mx-auto">
        {/* Results bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-9 pb-5">
          <p className="text-[#a5a19a] text-[13px]">
            <span className="text-[#0a0a0a] font-medium">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'property' : 'properties'} found
          </p>

          <select
            aria-label="Sort listings"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="border border-[#e5e0d7] bg-transparent text-[11px] tracking-widest text-[#a5a19a] px-3 py-1.75 outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="pb-[clamp(80px,10vw,120px)]">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <p className="text-[#a5a19a] text-sm mb-2">No properties match your filters.</p>
              <button
                onClick={() =>
                  setFilters({ listingType: 'all', category: 'all', city: 'All Cities' })
                }
                className="text-[#b89a5b] text-[11px] tracking-widest uppercase underline underline-offset-4 cursor-pointer bg-transparent border-none mt-1"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
