'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import NavbarLogo from '@/assets/Horizontal_Andersen_Properties_Logo.svg'
import FooterLogo from '@/assets/Square_Andersen_Properties_Logo.svg'

// ── Nav links ──────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Active Listings', href: '/active-listings' },
  { label: 'Portfolios', href: '/portfolios' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
]

const MOBILE_NAV_LINKS = [{ label: 'Home', href: '/' }, ...NAV_LINKS]

// ── Component ──────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mount guard so the overlay is in the DOM before animating in
  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      {/* ── Desktop / tablet header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-100 bg-black border-b border-white/6 transition-colors duration-400"
        style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
      >
        <div className="max-w-360 mx-auto px-5 md:px-20 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline shrink-0">
            <Image
              src={NavbarLogo}
              alt="Andersen Properties"
              height={26}
              className="h-6.5 w-auto block"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/75 text-[11px] tracking-[0.12em] no-underline font-medium uppercase border-b border-transparent pb-0.5 hover:text-white hover:border-white/40 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions — visible on tablet (md+); on desktop the nav sits between logo and these */}
          <div className="hidden md:flex items-center gap-5">
            {/* Language toggle */}
            <button
              aria-label="Toggle language"
              className="text-white/60 text-[11px] tracking-[0.12em] bg-transparent border-none cursor-pointer p-0"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              <span className="text-primary">EN</span>
              {' / '}
              <span className="text-white/60">ID</span>
            </button>

            {/* Search */}
            <button
              aria-label="Search"
              className="bg-transparent border-none cursor-pointer p-1 text-white/60 hover:text-white transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                <path
                  d="M11 11L14.5 14.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* CTA */}
            <Link
              href="/active-listings"
              className="border border-primary text-primary text-[10px] tracking-[0.14em] px-4 py-2 no-underline uppercase font-medium bg-transparent hover:bg-primary hover:text-black transition-colors duration-200"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              Private Consultation
            </Link>

            {/* Hamburger — tablet & lg (md to xl), hidden on desktop */}
            <button
              className="xl:hidden relative bg-transparent border-none cursor-pointer text-white p-1 w-8 h-8 flex items-center justify-center"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span
                className="absolute block h-px w-5 bg-white origin-center transition-all duration-300 ease-in-out"
                style={{
                  top: '50%',
                  transform: menuOpen
                    ? 'translateY(-50%) rotate(45deg)'
                    : 'translateY(calc(-50% - 5px))',
                }}
              />
              <span
                className="absolute block h-px w-5 bg-white origin-center transition-all duration-300 ease-in-out"
                style={{
                  top: '50%',
                  transform: 'translateY(-50%)',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="absolute block h-px w-5 bg-white origin-center transition-all duration-300 ease-in-out"
                style={{
                  top: '50%',
                  transform: menuOpen
                    ? 'translateY(-50%) rotate(-45deg)'
                    : 'translateY(calc(-50% + 5px))',
                }}
              />
            </button>
          </div>

          {/* Mobile-only hamburger (below md) — morphs into X when open */}
          <button
            className="md:hidden relative bg-transparent border-none cursor-pointer text-white p-1 w-8 h-8 flex items-center justify-center"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {/* Bar 1 */}
            <span
              className="absolute block h-px w-5 bg-white origin-center transition-all duration-300 ease-in-out"
              style={{
                top: '50%',
                transform: menuOpen
                  ? 'translateY(-50%) rotate(45deg)'
                  : 'translateY(calc(-50% - 5px))',
              }}
            />
            {/* Bar 2 — fades out */}
            <span
              className="absolute block h-px w-5 bg-white origin-center transition-all duration-300 ease-in-out"
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            {/* Bar 3 */}
            <span
              className="absolute block h-px w-5 bg-white origin-center transition-all duration-300 ease-in-out"
              style={{
                top: '50%',
                transform: menuOpen
                  ? 'translateY(-50%) rotate(-45deg)'
                  : 'translateY(calc(-50% + 5px))',
              }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      {/* Always mounted after first render so CSS transitions work on close */}
      {mounted && (
        <div
          aria-hidden={!menuOpen}
          className="fixed inset-0 z-99 flex flex-col px-8 pt-24 pb-12 transition-all duration-500 ease-in-out"
          style={{
            fontFamily: 'var(--font-inter, sans-serif)',
            backgroundColor: 'rgb(10, 10, 10)',
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? 'auto' : 'none',
            transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
          }}
        >
          {/* Vertical logo */}
          <div
            className="mb-10 transition-all duration-500 ease-in-out"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
              transitionDelay: menuOpen ? '100ms' : '0ms',
            }}
          >
            <Image
              src={FooterLogo}
              alt="Andersen Properties"
              height={80}
              className="h-20 w-auto block"
            />
          </div>

          {/* Mobile nav links — staggered entrance */}
          <nav className="flex flex-col gap-0" aria-label="Mobile navigation">
            {MOBILE_NAV_LINKS.map((link, i) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white text-4xl font-normal no-underline tracking-[0.02em] leading-[1.1] border-b border-white/8 py-5 block hover:text-white/70 transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-cormorant, serif)',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 400ms ease, transform 400ms ease',
                  transitionDelay: menuOpen ? `${120 + i * 50}ms` : '0ms',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile bottom actions */}
          <div
            className="mt-8 flex items-center gap-6 transition-all duration-500 ease-in-out"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(8px)',
              transitionDelay: menuOpen ? `${120 + MOBILE_NAV_LINKS.length * 50}ms` : '0ms',
            }}
          >
            <button
              aria-label="Toggle language"
              className="text-white/50 text-[11px] tracking-[0.12em] bg-transparent border-none cursor-pointer"
              style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
            >
              <span className="text-primary">EN</span>
              {' / '}
              <span className="text-white/50">ID</span>
            </button>
            <Link
              href="/active-listings"
              onClick={() => setMenuOpen(false)}
              className="border border-primary text-primary text-[10px] tracking-[0.14em] px-5 py-2.5 no-underline uppercase hover:bg-primary hover:text-black transition-colors duration-200"
            >
              Private Consultation
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
