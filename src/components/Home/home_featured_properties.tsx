'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import PageContainer from '@/components/PageContainer'
import DefaultImg from '@/assets/ANDERSEN_PROPERTIES_DEFAULT_IMG.avif'
import { ENABLE_DUMMY_FALLBACK } from '@/config/fallback'
import type { Property as PayloadProperty, Media } from '@/payload-types'

// ── Types ──────────────────────────────────────────────────────────────────────

type Property = {
  id: string
  slug: string
  badge?: string
  name: string
  location: string
  type: string
  beds: number
  area: string
  price: string
  tag: 'all' | 'houses' | 'villas' | 'apartments' | 'land'
  href: string
  image: {
    src: Parameters<typeof Image>[0]['src']
    alt: string
  }
}

type Props = {
  properties: PayloadProperty[]
}

// ── Transform CMS data to component format ─────────────────────────────────

function transformPropertyData(properties: PayloadProperty[]): Property[] {
  return properties.map((p: any) => {
    const firstImage = p.images?.[0]
    const imageData =
      firstImage && typeof firstImage.image === 'object' ? (firstImage.image as Media) : null

    // Get property type name
    const propertyTypeData = typeof p.propertyType === 'object' ? p.propertyType : null
    const typeName = propertyTypeData?.name || 'Property'

    // Map property type to tag
    const typeToTag: Record<string, Property['tag']> = {
      Houses: 'houses',
      Villas: 'villas',
      Apartments: 'apartments',
      Land: 'land',
    }
    const tag = typeToTag[typeName] || 'all'

    // Format build area
    const buildAreaText = p.buildArea ? `${p.buildArea} m²` : '0 m²'

    // Get city name
    const cityData = typeof p.city === 'object' ? p.city : null
    const cityName = cityData?.name || ''

    return {
      id: String(p.id),
      slug: p.slug || String(p.id),
      badge: undefined, // No badge field in current schema
      name: p.title || '',
      location: p.location ? `${p.location}, ${cityName}` : cityName,
      type: typeName,
      beds: p.bedrooms || 0,
      area: buildAreaText,
      price: p.purchasePrice || p.rentalPrice || 'Price on request',
      tag,
      href: `/active-listings/${p.slug || p.id}`,
      image: {
        src: imageData?.url || DefaultImg,
        alt: firstImage?.caption || p.title || '',
      },
    }
  })
}

// ── Placeholder data ───────────────────────────────────────────────────────────

const PROPERTIES: Property[] = [
  {
    id: '1',
    badge: 'Exclusive',
    name: 'The Aruna Residence',
    location: 'Uluwatu, Bali',
    type: 'Villas',
    beds: 5,
    area: '620 m²',
    price: 'IDR 28.5 Billion',
    tag: 'villas',
    href: '/active-listings/1',
    image: { src: DefaultImg, alt: 'The Aruna Residence, Uluwatu, Bali' },
  },
  {
    id: '2',
    badge: 'New',
    name: 'Senopati Courtyard House',
    location: 'South Jakarta',
    type: 'Houses',
    beds: 4,
    area: '380 m²',
    price: 'IDR 18.2 Billion',
    tag: 'houses',
    href: '/active-listings/2',
    image: { src: DefaultImg, alt: 'Senopati Courtyard House, South Jakarta' },
  },
  {
    id: '3',
    badge: 'Exclusive',
    name: 'The Terraces at Canggu',
    location: 'Canggu, Bali',
    type: 'Villas',
    beds: 3,
    area: '280 m²',
    price: 'Price on request',
    tag: 'villas',
    href: '/active-listings/3',
    image: { src: DefaultImg, alt: 'The Terraces at Canggu, Canggu, Bali' },
  },
  {
    id: '4',
    name: 'Dago Hills Residence',
    location: 'Bandung',
    type: 'Houses',
    beds: 5,
    area: '450 m²',
    price: 'IDR 14.8 Billion',
    tag: 'houses',
    href: '/active-listings/4',
    image: { src: DefaultImg, alt: 'Dago Hills Residence, Bandung' },
  },
  {
    id: '5',
    name: 'Surabaya Garden Estate',
    location: 'Surabaya',
    type: 'Houses',
    beds: 6,
    area: '780 m²',
    price: 'IDR 22.0 Billion',
    tag: 'houses',
    href: '/active-listings/5',
    image: { src: DefaultImg, alt: 'Surabaya Garden Estate, Surabaya' },
  },
]

const FILTERS: { label: string; value: Property['tag'] }[] = [
  { label: 'All', value: 'all' },
  { label: 'Houses', value: 'houses' },
  { label: 'Villas', value: 'villas' },
  { label: 'Apartments', value: 'apartments' },
  { label: 'Land', value: 'land' },
]

// ── Arrow SVG (matches Figma exactly) ─────────────────────────────────────────

function ArrowSvg({ stroke = '#A5A19A' }: { stroke?: string }) {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
      <path
        d="M6.5 1L10 4.5M10 4.5L6.5 8M10 4.5H1"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Property card ──────────────────────────────────────────────────────────────

function PropertyCard({
  property,
  aspectRatio = 'aspect-4/3',
  titleSize = 'text-2xl',
}: {
  property: Property
  /** Tailwind aspect-ratio class for the image wrapper */
  aspectRatio?: string
  /** Tailwind text-size class for the title */
  titleSize?: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={property.href}
      className="block no-underline cursor-pointer font-sans"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image wrapper */}
      <div className={`relative overflow-hidden rounded-md bg-[#e5e0d7] mb-4.5 ${aspectRatio}`}>
        <Image
          src={property.image.src}
          alt={property.image.alt}
          fill
          className="object-cover object-center transition-transform duration-600"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-400"
          style={{
            backgroundColor: 'rgba(10,10,10,0.48)',
            opacity: hovered ? 1 : 0,
          }}
        >
          <span
            className="text-white text-xs tracking-[0.16em] uppercase font-medium border-b border-white/40 pb-1 transition-transform duration-400"
            style={{ transform: hovered ? 'translateY(0)' : 'translateY(12px)' }}
          >
            View Property
          </span>
        </div>

        {/* Badge */}
        {property.badge && (
          <div className="absolute top-4 left-4 bg-primary text-[#0a0a0a] text-[9px] tracking-[0.14em] uppercase font-semibold px-2.5 py-1">
            {property.badge}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        {/* Name row */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3
              className={`font-medium text-[#0a0a0a] mb-0.5 relative inline-block ${titleSize}`}
              style={{ fontFamily: 'var(--font-display, serif)' }}
            >
              {property.name}
              {/* Gold underline slide on hover */}
              <span
                className="absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-400"
                style={{ width: hovered ? '100%' : '0%' }}
              />
            </h3>
          </div>
          {/* Arrow button */}
          <button
            aria-label={`View ${property.name}`}
            className="w-8 h-8 border rounded-full flex items-center justify-center bg-transparent cursor-pointer shrink-0 ml-2 mt-0.5 transition-colors duration-200"
            style={{
              borderColor: hovered ? 'rgb(184,154,91)' : 'rgb(229,224,215)',
              backgroundColor: hovered ? 'rgb(184,154,91)' : 'transparent',
            }}
          >
            <ArrowSvg stroke={hovered ? '#fff' : '#A5A19A'} />
          </button>
        </div>

        {/* Location */}
        <p className="text-[#a5a19a] text-[13px] mb-2.5">{property.location}</p>

        {/* Stats */}
        <div className="flex gap-4 flex-wrap">
          <span className="text-[#a5a19a] text-xs">{property.type}</span>
          <span className="text-[#e5e0d7]">·</span>
          <span className="text-[#a5a19a] text-xs">{property.beds} bed</span>
          <span className="text-[#e5e0d7]">·</span>
          <span className="text-[#a5a19a] text-xs">{property.area}</span>
        </div>

        {/* Price */}
        <p className="mt-2.5 text-sm font-medium text-[#242424] tracking-[0.01em]">
          {property.price}
        </p>
      </div>
    </Link>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function HomeFeaturedProperties({ properties: cmsProperties }: Props) {
  // Use CMS data or fallback to dummy data
  const allProperties = useMemo(() => {
    if (cmsProperties.length > 0 || !ENABLE_DUMMY_FALLBACK.properties) {
      return transformPropertyData(cmsProperties)
    }
    return PROPERTIES
  }, [cmsProperties])

  const [activeFilter, setActiveFilter] = useState<Property['tag']>('all')

  const filtered =
    activeFilter === 'all' ? allProperties : allProperties.filter((p) => p.tag === activeFilter)

  const [p1, p2, p3, p4, p5] = filtered

  return (
    <section className="bg-white py-20 md:py-28">
      <PageContainer>
        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-3">
              Curated Residences
            </p>
            <h2
              className="font-normal text-[#0a0a0a] leading-[1.1] m-0"
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(32px, 4vw, 52px)',
              }}
            >
              Featured Properties
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className="text-[11px] tracking-widest uppercase px-4.5 py-2 border cursor-pointer font-medium transition-colors duration-200"
                style={{
                  borderColor: activeFilter === f.value ? 'rgb(184,154,91)' : 'rgb(229,224,215)',
                  backgroundColor: activeFilter === f.value ? 'rgb(184,154,91)' : 'transparent',
                  color: activeFilter === f.value ? 'rgb(10,10,10)' : 'rgb(165,161,154)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        {filtered.length === 0 ? (
          <p className="text-[#a5a19a] text-sm py-24 text-center">
            No properties in this category yet.
          </p>
        ) : (
          <>
            {/* ── Row 1: p1 (large, 4/3) + right column [p2, p3] (3/2 each) ── */}
            <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8 items-start mb-8">
              {/* p1 — large left */}
              {p1 && <PropertyCard property={p1} aspectRatio="aspect-4/3" titleSize="text-2xl" />}

              {/* Right column: p2 + p3 stacked */}
              <div className="flex flex-col gap-8">
                {p2 && <PropertyCard property={p2} aspectRatio="aspect-3/2" titleSize="text-xl" />}
                {p3 && <PropertyCard property={p3} aspectRatio="aspect-3/2" titleSize="text-xl" />}
              </div>
            </div>

            {/* ── Row 2: p4 + p5 equal columns ── */}
            {(p4 || p5) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {p4 && <PropertyCard property={p4} aspectRatio="aspect-3/2" titleSize="text-xl" />}
                {p5 && <PropertyCard property={p5} aspectRatio="aspect-3/2" titleSize="text-xl" />}
              </div>
            )}

            {/* ── Footer ── */}
            <div className="text-center mt-16 border-t border-[#e5e0d7] pt-12">
              <Link
                href="/active-listings"
                className="text-black text-xs tracking-[0.12em] uppercase no-underline font-medium inline-flex items-center gap-2.5 border-b border-[#0a0a0a] pb-0.75 hover:opacity-60 transition-opacity duration-200"
              >
                View All Active Listings
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                  <path
                    d="M9 1L13 5M13 5L9 9M13 5H1"
                    stroke="#0A0A0A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </>
        )}
      </PageContainer>
    </section>
  )
}
