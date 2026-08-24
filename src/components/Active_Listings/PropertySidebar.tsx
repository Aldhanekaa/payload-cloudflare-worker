'use client'

import { useState } from 'react'
import { cn } from '@/utilities/cn'

interface PropertySidebarProps {
  salePrice?: string
  rentPrice?: string
  location: string
  category: string
  beds: number
  baths: number
  buildArea: string
  landArea: string
}

export function PropertySidebar({
  salePrice,
  rentPrice,
  location,
  category,
  beds,
  baths,
  buildArea,
  landArea,
}: PropertySidebarProps) {
  const [activeTab, setActiveTab] = useState<'purchase' | 'rental'>(
    salePrice ? 'purchase' : 'rental',
  )

  const hasBothOptions = salePrice && rentPrice

  return (
    <div className="sticky top-30 bg-[#0a0a0a] p-10">
      {/* Tabs */}
      {hasBothOptions && (
        <div className="flex mb-7 border-b border-white/10">
          <button
            onClick={() => setActiveTab('purchase')}
            className={cn(
              'flex-1 px-0 py-2.5 border-0 border-b-2 cursor-pointer bg-transparent font-sans text-[10px] tracking-[0.14em] uppercase font-medium -mb-px transition-colors',
              activeTab === 'purchase'
                ? 'border-b-[#b89a5b] text-[#b89a5b]'
                : 'border-b-transparent text-white/40 hover:text-white/60',
            )}
          >
            Purchase
          </button>
          <button
            onClick={() => setActiveTab('rental')}
            className={cn(
              'flex-1 px-0 py-2.5 border-0 border-b-2 cursor-pointer bg-transparent font-sans text-[10px] tracking-[0.14em] uppercase font-medium -mb-px transition-colors',
              activeTab === 'rental'
                ? 'border-b-[#b89a5b] text-[#b89a5b]'
                : 'border-b-transparent text-white/40 hover:text-white/60',
            )}
          >
            Rental
          </button>
        </div>
      )}

      {/* Price Display */}
      <div className="mb-8">
        <div className="font-sans text-[10px] tracking-[0.12em] uppercase text-white/40 mb-2">
          {activeTab === 'purchase' ? 'Purchase Price' : 'Monthly Rent'}
        </div>
        <div className="font-display text-[28px] text-white font-normal tracking-[-0.01em]">
          {activeTab === 'purchase' ? salePrice : rentPrice}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/8 mb-8" />

      {/* Property Details */}
      <div className="flex flex-col gap-3.5 mb-9">
        <div className="flex justify-between items-baseline gap-3">
          <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-white/35 shrink-0">
            Location
          </span>
          <span className="font-sans text-[13px] text-white/80 text-right">{location}</span>
        </div>
        <div className="flex justify-between items-baseline gap-3">
          <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-white/35 shrink-0">
            Category
          </span>
          <span className="font-sans text-[13px] text-white/80 text-right">{category}</span>
        </div>
        <div className="flex justify-between items-baseline gap-3">
          <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-white/35 shrink-0">
            Bedrooms
          </span>
          <span className="font-sans text-[13px] text-white/80 text-right">
            {beds} beds · {baths} baths
          </span>
        </div>
        <div className="flex justify-between items-baseline gap-3">
          <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-white/35 shrink-0">
            Build Area
          </span>
          <span className="font-sans text-[13px] text-white/80 text-right">{buildArea}</span>
        </div>
        <div className="flex justify-between items-baseline gap-3">
          <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-white/35 shrink-0">
            Land Area
          </span>
          <span className="font-sans text-[13px] text-white/80 text-right">{landArea}</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3">
        <button className="w-full px-0 py-4 bg-[#b89a5b] border-0 text-[#0a0a0a] font-sans text-[11px] tracking-[0.14em] uppercase font-semibold cursor-pointer transition-colors hover:bg-[#a68a4b]">
          Enquire About This Property
        </button>
        <button className="w-full px-0 py-4 bg-transparent border border-white/20 text-white/70 font-sans text-[11px] tracking-[0.14em] uppercase font-medium cursor-pointer transition-all hover:border-white/40 hover:text-white/90">
          Schedule a Viewing
        </button>
      </div>

      <p className="font-sans text-[11px] text-white/25 mt-5 leading-[1.6] text-center">
        All enquiries handled with full discretion by your dedicated Andersen advisor.
      </p>
    </div>
  )
}
