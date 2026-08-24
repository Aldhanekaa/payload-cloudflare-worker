'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import PageContainer from '@/components/PageContainer'
import { ENABLE_DUMMY_FALLBACK } from '@/config/fallback'
import type { City, Media } from '@/payload-types'

// ── Types ──────────────────────────────────────────────────────────────────────

type Place = {
  name: string
  properties: number
  description: string
  href: string
  imageUrl: string
  imageAlt: string
}

type Props = {
  cities: City[]
}

// ── Dummy Data ───────────────────────────────────────────────────────────────────────

const PLACES: Place[] = [
  {
    name: 'Bali',
    properties: 48,
    description: 'Tropical modernism, cultural depth, and a thriving luxury property market.',
    href: '/locations/bali',
    imageUrl:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=800&fit=crop&auto=format',
    imageAlt: 'Bali, Indonesia',
  },
  {
    name: 'Jakarta',
    properties: 34,
    description:
      "Indonesia's capital: prestige addresses, architectural innovation, and strong investment returns.",
    href: '/locations/jakarta',
    imageUrl:
      'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=600&h=800&fit=crop&auto=format',
    imageAlt: 'Jakarta, Indonesia',
  },
  {
    name: 'Bandung',
    properties: 19,
    description:
      'Cool highland living with an established design community and exceptional residential character.',
    href: '/locations/bandung',
    imageUrl:
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&h=800&fit=crop&auto=format',
    imageAlt: 'Bandung, Indonesia',
  },
  {
    name: 'Surabaya',
    properties: 22,
    description:
      "East Java's business hub — a growing market for refined urban and suburban residences.",
    href: '/locations/surabaya',
    imageUrl:
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&h=800&fit=crop&auto=format',
    imageAlt: 'Surabaya, Indonesia',
  },
  {
    name: 'Lombok',
    properties: 14,
    description:
      'Unhurried coastal living, exceptional natural settings, and emerging world-class development.',
    href: '/locations/lombok',
    imageUrl:
      'https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&h=800&fit=crop&auto=format',
    imageAlt: 'Lombok, Indonesia',
  },
]

// ── Transform CMS data to component format ─────────────────────────────────

function transformCityData(cities: City[]): Place[] {
  return cities.map((city) => {
    const mediaData = typeof city.media === 'object' ? (city.media as Media) : null

    // Count properties from join field
    const propertyCount = Array.isArray(city.properties) ? city.properties.length : 0

    return {
      name: city.name,
      properties: propertyCount,
      description: `Explore ${propertyCount} curated properties in ${city.name}.`,
      href: `/locations/${city.name.toLowerCase()}`,
      imageUrl: mediaData?.url || '',
      imageAlt: `${city.name}, ${city.country || 'Indonesia'}`,
    }
  })
}

// ── Arrow SVG ──────────────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path
        d="M6 1L9 4M9 4L6 7M9 4H1"
        stroke="#B89A5B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Place card ─────────────────────────────────────────────────────────────────

function PlaceCard({ place }: { place: Place }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden rounded-sm aspect-2/3 cursor-pointer bg-[#0a0a0a] w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <Image
        src={place.imageUrl}
        alt={place.imageAlt}
        fill
        className="object-cover transition-transform duration-700"
        style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        sizes="(max-width: 768px) 42vw, 20vw"
      />

      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.15) 55%, transparent 100%)',
        }}
      />

      {/* Description tooltip — slides down from top on hover */}
      <div
        className="absolute top-0 left-0 right-0 p-5 bg-[rgba(10,10,10,0.6)] transition-all duration-400"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        <p className="text-white/75 text-[13px] leading-[1.6] font-light m-0">
          {place.description}
        </p>
      </div>

      {/* Bottom content — always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3
          className="text-white text-[22px] font-medium mb-1 mt-0 leading-tight"
          style={{ fontFamily: 'var(--font-cormorant, serif)' }}
        >
          {place.name}
        </h3>
        <p className="text-white/55 text-xs mb-2.5">{place.properties} properties</p>
        <Link
          href={place.href}
          className="text-[#b89a5b] text-[10px] tracking-[0.14em] uppercase no-underline font-medium inline-flex items-center gap-1.5"
        >
          Explore location
          <ArrowIcon />
        </Link>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function HomePlaces({ cities: cmsCities }: Props) {
  // Use CMS data or fallback to dummy data
  const places = useMemo(() => {
    if (cmsCities.length > 0 || !ENABLE_DUMMY_FALLBACK.properties) {
      return transformCityData(cmsCities)
    }
    return PLACES
  }, [cmsCities])

  return (
    <section className="bg-[#f7f5f0] py-[clamp(80px,10vw,140px)]">
      <PageContainer>
        {/* Heading */}
        <div className="mb-14">
          <h2
            className="font-normal text-[#0a0a0a] leading-[1.1] m-0"
            style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: 'clamp(32px, 4vw, 52px)',
            }}
          >
            Find your place in Indonesia.
          </h2>
        </div>

        {/* Cards — vertical stack on mobile, horizontal scroll on md+ */}
        <div className="flex flex-col md:flex-row md:overflow-x-auto gap-4 md:pb-2 snap-y md:snap-x snap-mandatory md:snap-none scrollbar-hide">
          {places.map((place) => (
            <div
              key={place.name}
              className="snap-start w-full md:w-auto md:shrink-0 md:flex-none"
              style={{ minWidth: 'clamp(220px, 18vw, 260px)' }}
            >
              <PlaceCard place={place} />
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
