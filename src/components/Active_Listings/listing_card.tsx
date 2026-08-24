'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Listing } from './data'

function ArrowIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path
        d="M6 1L9 4M9 4L6 7M9 4H1"
        stroke="#A5A19A"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BadgeTag({ label, variant }: { label: string; variant: 'dark' | 'gold' | 'rent' }) {
  const styles: Record<typeof variant, string> = {
    dark: 'bg-[#0a0a0a] text-white',
    gold: 'bg-[#b89a5b] text-[#0a0a0a] font-semibold',
    rent: 'bg-[#242424] text-[#b89a5b] border border-[#b89a5b]/30',
  }
  return (
    <span className={`text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 ${styles[variant]}`}>
      {label}
    </span>
  )
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const [hovered, setHovered] = useState(false)

  const showSale = listing.listingType === 'buy' || listing.listingType === 'both'
  const showRent = listing.listingType === 'rent' || listing.listingType === 'both'

  return (
    <Link
      href={`/active-listings/${listing.slug}`}
      className="block no-underline bg-white cursor-pointer transition-shadow duration-300 shadow-[0_1px_4px_rgba(10,10,10,0.04)] hover:shadow-[0_4px_20px_rgba(10,10,10,0.1)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-16/10 bg-[#e5e0d7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.image}
          alt={listing.imageAlt}
          style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          className="w-full h-full object-cover block transition-transform duration-600"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-400"
          style={{ backgroundColor: 'rgba(10,10,10,0.35)', opacity: hovered ? 1 : 0 }}
        >
          <span
            className="text-white text-[11px] tracking-[0.16em] uppercase font-medium border-b border-white/40 pb-0.75 transition-transform duration-400"
            style={{ transform: hovered ? 'translateY(0)' : 'translateY(8px)' }}
          >
            View Property
          </span>
        </div>

        {/* Listing type + badge tags */}
        <div className="absolute top-3.5 left-3.5 flex gap-1.5 flex-wrap">
          <div className="flex gap-1">
            {showSale && <BadgeTag label="For Sale" variant="dark" />}
            {showRent && <BadgeTag label="For Rent" variant="rent" />}
          </div>
          {listing.badge && <BadgeTag label={listing.badge} variant="gold" />}
        </div>
      </div>

      {/* Content */}
      <div className="px-5.5 pt-5 pb-6">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="text-[20px] font-medium text-[#0a0a0a] leading-[1.2]"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            {listing.name}
          </h3>
          <div className="w-7.5 h-7.5 border border-[#e5e0d7] rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-transparent transition-colors duration-200">
            <ArrowIcon />
          </div>
        </div>

        {/* Location */}
        <p className="text-[#a5a19a] text-[13px] mb-3.5">{listing.location}</p>

        {/* Stats */}
        <div className="flex flex-wrap mb-4">
          <span className="text-[#a5a19a] text-[12px]">{listing.category}</span>
          <span className="text-[#e5e0d7] mx-3.5">·</span>
          <span className="text-[#a5a19a] text-[12px]">{listing.beds} bed</span>
          <span className="text-[#e5e0d7] mx-3.5">·</span>
          <span className="text-[#a5a19a] text-[12px]">{listing.baths} bath</span>
          <span className="text-[#e5e0d7] mx-3.5">·</span>
          <span className="text-[#a5a19a] text-[12px]">{listing.area}</span>
        </div>

        {/* Prices */}
        <div className="flex gap-3 flex-wrap border-t border-[#f0ede7] pt-3.5">
          {showSale && listing.salePrice && (
            <div>
              <div className="text-[10px] tracking-[0.12em] uppercase text-[#a5a19a] mb-0.5">
                For Sale
              </div>
              <div className="text-[15px] font-medium text-[#0a0a0a]">{listing.salePrice}</div>
            </div>
          )}
          {showRent && listing.rentPrice && (
            <div className={showSale && listing.salePrice ? 'border-l border-[#e5e0d7] pl-3' : ''}>
              <div className="text-[10px] tracking-[0.12em] uppercase text-[#b89a5b] mb-0.5">
                For Rent
              </div>
              <div className="text-[15px] font-medium text-[#0a0a0a]">{listing.rentPrice}</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
