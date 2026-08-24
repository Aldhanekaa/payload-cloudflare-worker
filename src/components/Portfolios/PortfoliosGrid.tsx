'use client'

import { useState, useMemo } from 'react'
import { PORTFOLIOS, type StatusFilter, type CityFilter, type Portfolio } from './portfolios.data'
import PortfolioCard from './PortfolioCard'
import { ENABLE_DUMMY_FALLBACK } from '@/config/fallback'
import type { Portfolio as PayloadPortfolio, Media } from '@/payload-types'

type Props = {
  portfolios: PayloadPortfolio[]
}

// ── Transform CMS data to component format ─────────────────────────────────

function transformPortfolioData(portfolios: PayloadPortfolio[]): Portfolio[] {
  return portfolios.map((p) => {
    const cityData = typeof p.city === 'object' ? p.city : null
    const heroImageData = typeof p.heroImage === 'object' ? (p.heroImage as Media) : null

    return {
      id: String(p.id),
      slug: p.slug || String(p.id),
      status: p.status as Portfolio['status'],
      category: p.category || 'Uncategorized',
      name: p.name,
      location: p.location || '',
      city: cityData?.name || 'Unknown',
      tagline: p.tagline,
      units: p.units,
      completion: p.completion,
      from: p.from,
      image: {
        src: heroImageData?.url || '',
        alt: p.imageAlt || p.name,
      },
    }
  })
}

// ── Status filter tabs config ──────────────────────────────────────────────────

function getStatusFilters(portfolios: Portfolio[]) {
  return [
    { value: 'all' as StatusFilter, label: 'All', count: portfolios.length },
    {
      value: 'active' as StatusFilter,
      label: 'Active',
      count: portfolios.filter((p) => p.status === 'active').length,
    },
    {
      value: 'sold-out' as StatusFilter,
      label: 'Sold Out',
      count: portfolios.filter((p) => p.status === 'sold-out').length,
    },
    {
      value: 'coming-soon' as StatusFilter,
      label: 'Coming Soon',
      count: portfolios.filter((p) => p.status === 'coming-soon').length,
    },
  ]
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function PortfoliosGrid({ portfolios: cmsPortfolios }: Props) {
  // Use CMS data or fallback to dummy data
  const portfolios = useMemo(() => {
    if (cmsPortfolios.length > 0 || !ENABLE_DUMMY_FALLBACK.portfolios) {
      return transformPortfolioData(cmsPortfolios)
    }
    return PORTFOLIOS
  }, [cmsPortfolios])

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [cityFilter, setCityFilter] = useState<CityFilter>('All Cities')

  const statusFilters = useMemo(() => getStatusFilters(portfolios), [portfolios])

  // Extract unique cities from data
  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(portfolios.map((p) => p.city)))
    return ['All Cities', ...uniqueCities.sort()] as CityFilter[]
  }, [portfolios])

  const filtered = useMemo(() => {
    return portfolios.filter((p) => {
      const matchStatus = statusFilter === 'all' || p.status === statusFilter
      const matchCity = cityFilter === 'All Cities' || p.city === cityFilter
      return matchStatus && matchCity
    })
  }, [portfolios, statusFilter, cityFilter])

  return (
    <>
      {/* ── Sticky filter bar ── */}
      <div className="bg-white border-b border-[#e5e0d7] sticky z-10" style={{ top: '65px' }}>
        <div className="max-w-360 mx-auto px-5 md:px-20">
          <div className="flex items-center gap-1 flex-wrap py-4">
            {/* Status tabs */}
            {statusFilters.map((f) => {
              const isActive = statusFilter === f.value
              return (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className="text-[11px] tracking-widest uppercase px-4 py-2 border cursor-pointer font-medium transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-sans, sans-serif)',
                    borderColor: isActive ? 'rgb(184,154,91)' : 'rgb(229,224,215)',
                    backgroundColor: isActive ? 'rgb(184,154,91)' : 'transparent',
                    color: isActive ? 'rgb(10,10,10)' : 'rgb(165,161,154)',
                  }}
                >
                  {f.label} <span style={{ opacity: 0.6 }}>({f.count})</span>
                </button>
              )
            })}

            {/* City select — pushed to the right */}
            <select
              aria-label="Filter by city"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value as CityFilter)}
              className="ml-auto border border-[#e5e0d7] bg-transparent text-[11px] tracking-widest text-[#a5a19a] uppercase px-3 py-2 cursor-pointer outline-none"
              style={{ fontFamily: 'var(--font-sans, sans-serif)' }}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div
        className="max-w-360 mx-auto px-5 md:px-20 pt-12"
        style={{ paddingBottom: 'clamp(80px, 10vw, 120px)' }}
      >
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[#a5a19a] text-sm font-light">
              No projects match the selected filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {filtered.map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
