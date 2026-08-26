'use client'

import Link from 'next/link'

interface PortfolioSidebarProps {
  startingPrice: string
  status: string
  projectType: string
  location: string
  totalUnits: number
  completion: string
  enquiryLink?: string | null
  waitlistLink?: string | null
}

export function PortfolioSidebar({
  startingPrice,
  status,
  projectType,
  location,
  totalUnits,
  completion,
  enquiryLink,
  waitlistLink,
}: PortfolioSidebarProps) {
  const isSoldOut = status === 'Sold Out'

  return (
    <div className="sticky top-30 bg-[#0a0a0a] p-10">
      {/* Price Section */}
      <div className="mb-8">
        <div className="font-sans text-[10px] tracking-[0.14em] uppercase text-white/40 mb-2">
          Starting Price
        </div>
        <div className="font-display text-[30px] text-white font-normal mb-1.5 tracking-[-0.01em]">
          {startingPrice}
        </div>
        <div
          className={`font-sans text-[11px] tracking-[0.06em] ${
            isSoldOut ? 'text-[#6b7280]' : 'text-[#b89a5b]'
          }`}
        >
          {status}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/8 mb-8" />

      {/* Project Details */}
      <div className="flex flex-col gap-3.5 mb-9">
        <div className="flex justify-between items-baseline gap-3">
          <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-white/35 shrink-0">
            Project Type
          </span>
          <span className="font-sans text-[13px] text-white/80 text-right">{projectType}</span>
        </div>
        <div className="flex justify-between items-baseline gap-3">
          <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-white/35 shrink-0">
            Location
          </span>
          <span className="font-sans text-[13px] text-white/80 text-right">{location}</span>
        </div>
        <div className="flex justify-between items-baseline gap-3">
          <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-white/35 shrink-0">
            Total Residences
          </span>
          <span className="font-sans text-[13px] text-white/80 text-right">{totalUnits} units</span>
        </div>
        <div className="flex justify-between items-baseline gap-3">
          <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-white/35 shrink-0">
            Completion
          </span>
          <span className="font-sans text-[13px] text-white/80 text-right">{completion}</span>
        </div>
      </div>

      {isSoldOut ? (
        <div className="border border-white/10 p-4 text-center">
          <p className="font-sans text-[12px] leading-[1.6] text-white/40">
            This project is fully sold. Contact us to be notified of similar upcoming developments.
          </p>
          {waitlistLink ? (
            <Link
              href={waitlistLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 border border-white/20 bg-transparent px-5 py-3 font-sans text-[10px] tracking-[0.12em] uppercase text-white/60 transition-colors hover:border-white/40 hover:text-white/90"
            >
              Join Waitlist
            </Link>
          ) : (
            <button className="mt-4 border border-white/20 bg-transparent px-5 py-3 font-sans text-[10px] tracking-[0.12em] uppercase text-white/60 transition-colors hover:border-white/40 hover:text-white/90">
              Join Waitlist
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {enquiryLink ? (
            <Link
              href={enquiryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-0 py-4 bg-[#b89a5b] border-0 text-[#0a0a0a] font-sans text-[11px] tracking-[0.14em] uppercase font-semibold cursor-pointer transition-colors hover:bg-[#a68a4b] text-center"
            >
              Enquire Now
            </Link>
          ) : (
            <button className="w-full px-0 py-4 bg-[#b89a5b] border-0 text-[#0a0a0a] font-sans text-[11px] tracking-[0.14em] uppercase font-semibold cursor-pointer transition-colors hover:bg-[#a68a4b]">
              Enquire Now
            </button>
          )}
          <button className="w-full px-0 py-4 bg-transparent border border-white/20 text-white/70 font-sans text-[11px] tracking-[0.14em] uppercase font-medium cursor-pointer transition-all hover:border-white/40 hover:text-white/90">
            Download Brochure
          </button>
        </div>
      )}

      <p className="font-sans text-[11px] text-white/25 mt-5 leading-[1.6] text-center">
        All enquiries handled personally by your Andersen advisor.
      </p>
    </div>
  )
}
