'use client'

import { CITIES, type CityFilter, type ListingType, type PropertyCategory } from './data'

export type FilterState = {
  listingType: ListingType | 'all'
  category: PropertyCategory | 'all'
  city: CityFilter
}

type Props = {
  filters: FilterState
  onChange: (next: FilterState) => void
}

const LISTING_TYPE_FILTERS: { label: string; value: FilterState['listingType'] }[] = [
  { label: 'All', value: 'all' },
  { label: 'Buy', value: 'buy' },
  { label: 'Rent', value: 'rent' },
]

const CATEGORY_FILTERS: { label: string; value: FilterState['category'] }[] = [
  { label: 'All', value: 'all' },
  { label: 'Houses', value: 'Houses' },
  { label: 'Villas', value: 'Villas' },
  { label: 'Apartments', value: 'Apartments' },
  { label: 'Land', value: 'Land' },
]

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="text-[11px] tracking-widest uppercase px-4 py-2 border font-medium cursor-pointer transition-all duration-200"
      style={{
        borderColor: active ? 'rgb(184,154,91)' : 'rgb(229,224,215)',
        backgroundColor: active ? 'rgb(184,154,91)' : 'transparent',
        color: active ? 'rgb(10,10,10)' : 'rgb(165,161,154)',
      }}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="hidden md:block w-px h-6 bg-[#e5e0d7] mx-2" aria-hidden="true" />
}

export default function ListingsFilterBar({ filters, onChange }: Props) {
  return (
    <div
      className="bg-white border-b border-[#e5e0d7] sticky  z-10"
      style={{
        top: '65px',
      }}
    >
      <div className="px-5 md:px-20 max-w-360 mx-auto">
        <div className="flex gap-y-2.5 items-center flex-wrap py-4">
          {/* Listing type */}
          <div className="flex gap-1 mr-5">
            {LISTING_TYPE_FILTERS.map((f) => (
              <FilterButton
                key={f.value}
                active={filters.listingType === f.value}
                onClick={() => onChange({ ...filters, listingType: f.value })}
              >
                {f.label}
              </FilterButton>
            ))}
          </div>

          <Divider />

          {/* Property category */}
          <div className="flex gap-1 mr-5 flex-wrap">
            {CATEGORY_FILTERS.map((f) => (
              <FilterButton
                key={f.value}
                active={filters.category === f.value}
                onClick={() => onChange({ ...filters, category: f.value })}
              >
                {f.label}
              </FilterButton>
            ))}
          </div>

          <Divider />

          {/* City select — pushed to the right */}
          <select
            aria-label="Filter by city"
            value={filters.city}
            onChange={(e) => onChange({ ...filters, city: e.target.value as CityFilter })}
            className="ml-auto border border-[#e5e0d7] bg-transparent text-[11px] tracking-widest text-[#a5a19a] px-3 py-2 uppercase outline-none cursor-pointer"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
