'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import FooterLogo from '@/assets/Square_Andersen_Properties_Logo.svg'

// ── Link columns data ──────────────────────────────────────────────────────────

const columns = [
  {
    heading: 'Navigation',
    links: [
      { label: 'Active Listings', href: '/active-listings' },
      { label: 'Portfolios', href: '/portfolios' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    heading: 'Property Types',
    links: [
      { label: 'Houses', href: '/active-listings' },
      { label: 'Villas', href: '/active-listings' },
      { label: 'Apartments', href: '/active-listings' },
      { label: 'Land', href: '/active-listings' },
      { label: 'Off-Market Search', href: '/services' },
    ],
  },
  {
    heading: 'Locations',
    links: [
      { label: 'Bali', href: '/active-listings' },
      { label: 'Jakarta', href: '/active-listings' },
      { label: 'Bandung', href: '/active-listings' },
      { label: 'Surabaya', href: '/active-listings' },
      { label: 'Lombok', href: '/active-listings' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'andersenproperties.id', href: '/' },
      { label: 'hello@andersenproperties.id', href: '/' },
      { label: '+62 812 3456 7890', href: '/' },
      { label: 'Instagram', href: '/' },
      { label: 'LinkedIn', href: '/' },
    ],
  },
]

// ── Component ──────────────────────────────────────────────────────────────────

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire up to email service
    setEmail('')
  }

  return (
    <footer
      className="bg-black border-t border-white/6"
      style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
    >
      {/* ── Main content ── */}
      <div className="max-w-360 mx-auto px-5 md:px-20 pt-20 pb-15">
        {/* Top row: logo + newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pb-16 border-b border-white/6 items-end">
          {/* Logo + tagline */}
          <div>
            <div className="mb-5">
              <Image
                src={FooterLogo}
                alt="Andersen Properties"
                height={72}
                className="w-auto h-18 block"
              />
            </div>
            <p className="text-white/38 text-sm leading-[1.7] font-light max-w-80 m-0">
              A trusted curator, developer, and advisor for exceptional residential properties
              across Indonesia.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-white/40 font-medium mb-4">
              Property insights by email
            </p>
            <form onSubmit={handleSubscribe} className="flex max-w-95">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address for newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/6 border border-r-0 border-white/10 text-white text-[13px] px-4 py-3 outline-none placeholder:text-white/30"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              />
              <button
                type="submit"
                className="bg-primary text-black text-[10px] tracking-[0.12em] uppercase font-semibold px-5 py-3 whitespace-nowrap cursor-pointer border-none hover:bg-primary-400 transition-colors duration-200"
                style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-[10px] tracking-[0.18em] uppercase text-white/35 font-medium mb-5">
                {col.heading}
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 text-[13px] no-underline font-light hover:text-white/80 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/6">
        <div className="max-w-360 mx-auto px-5 md:px-20 py-6 flex items-center justify-between flex-wrap gap-4">
          {/* Legal links */}
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-white/25 text-xs">
              © 2025 Andersen Properties. All rights reserved.
            </span>
            <Link
              href="#"
              className="text-white/30 text-[11px] no-underline hover:text-white/60 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-white/30 text-[11px] no-underline hover:text-white/60 transition-colors duration-200"
            >
              Terms of Use
            </Link>
          </div>

          {/* AP monogram */}
          <div
            className="text-primary text-[13px] tracking-[0.18em] font-medium border border-primary/35 px-3 py-1.5"
            style={{ fontFamily: 'var(--font-cormorant, serif)' }}
          >
            AP
          </div>
        </div>
      </div>
    </footer>
  )
}
