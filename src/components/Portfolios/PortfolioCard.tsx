'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Portfolio } from './portfolios.data'

// ── Badge config ───────────────────────────────────────────────────────────────

const BADGE: Record<Portfolio['status'], { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-primary text-black',
  },
  'sold-out': {
    label: 'Sold Out',
    className: 'bg-white/8 text-white/40',
  },
  'coming-soon': {
    label: 'Coming Soon',
    className: 'bg-primary/15 text-primary',
  },
}

// ── Arrow SVG ──────────────────────────────────────────────────────────────────

function ArrowSvg() {
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

// ── Component ──────────────────────────────────────────────────────────────────

export default function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  const [hovered, setHovered] = useState(false)
  const badge = BADGE[portfolio.status]
  const isActive = portfolio.status === 'active' || portfolio.status === 'coming-soon'

  return (
    <Link
      href={`/portfolios/${portfolio.slug}`}
      className="block no-underline cursor-pointer"
      style={{ fontFamily: 'var(--font-sans, sans-serif)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-4/3 bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portfolio.image.src}
          alt={portfolio.image.alt}
          className="w-full h-full object-cover block transition-transform duration-700"
          style={{
            transform: hovered && isActive ? 'scale(1.05)' : 'scale(1)',
            opacity: portfolio.status === 'sold-out' ? 0.55 : 1,
          }}
        />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`text-[9px] tracking-[0.12em] uppercase font-semibold px-2.5 py-1 ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Hover overlay — only for non-sold-out */}
        {isActive && (
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-400"
            style={{ backgroundColor: 'rgba(10,10,10,0.4)', opacity: hovered ? 1 : 0 }}
          >
            <span className="text-white text-[11px] tracking-[0.16em] uppercase font-medium border-b border-white/40 pb-0.75">
              View Project
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="pt-6 pb-2 border-b border-[#e5e0d7]">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-primary font-medium mb-1.5">
              {portfolio.category}
            </p>
            <h3
              className="text-[22px] font-medium text-[#0a0a0a] leading-[1.15] m-0"
              style={{ fontFamily: 'var(--font-cormorant, serif)' }}
            >
              {portfolio.name}
            </h3>
          </div>
          {/* Arrow button — only for linkable projects */}
          {isActive && (
            <div
              className="w-7.5 h-7.5 border border-[#e5e0d7] rounded-full flex items-center justify-center shrink-0 mt-5 bg-transparent transition-colors duration-200"
              style={{
                borderColor: hovered ? 'rgb(184,154,91)' : 'rgb(229,224,215)',
                backgroundColor: hovered ? 'rgb(184,154,91)' : 'transparent',
              }}
            >
              <ArrowSvg />
            </div>
          )}
        </div>

        <p className="text-[#a5a19a] text-[13px] mb-3">{portfolio.location}</p>
        <p className="text-[#a5a19a] text-sm leading-[1.65] font-light mb-4">{portfolio.tagline}</p>

        {/* Stats */}
        <div className="flex gap-6 flex-wrap pb-5">
          {[
            { label: 'Units', value: String(portfolio.units) },
            { label: 'Completion', value: portfolio.completion },
            { label: 'From', value: portfolio.from },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-[10px] tracking-[0.12em] uppercase text-[#a5a19a] mb-0.5">
                {stat.label}
              </div>
              <div className="text-[13px] text-[#242424] font-medium">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}
