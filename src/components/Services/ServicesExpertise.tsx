'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import PageContainer from '@/components/PageContainer'

// ── Arrow SVG ──────────────────────────────────────────────────────────────────

function LearnMoreArrow() {
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

// ── Service card ───────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  hasBorderLeft,
}: {
  service: { icon: React.ReactNode; title: string; description: string; href: string }
  hasBorderLeft: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const t = useTranslations('home-page.expertise')

  return (
    <div
      className={`p-9 transition-colors duration-300 ${hasBorderLeft ? 'border-l border-[#e5e0d7]' : ''}`}
      style={{
        borderTop: `2px solid ${hovered ? 'rgb(184,154,91)' : 'rgb(229,224,215)'}`,
        transition: 'border-top-color 0.3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon */}
      <div className="text-[#a5a19a] mb-5">{service.icon}</div>

      {/* Title */}
      <h3
        className="text-xl font-medium text-[#0a0a0a] mb-3 leading-[1.2] mt-0"
        style={{ fontFamily: 'var(--font-cormorant, serif)' }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-[#a5a19a] text-sm leading-[1.7] font-light mb-5">{service.description}</p>

      {/* Learn more */}
      <Link
        href={service.href}
        className="text-[#b89a5b] text-[11px] tracking-widest uppercase no-underline font-medium inline-flex items-center gap-1.5 hover:gap-3 transition-all duration-200"
      >
        {t('learn-more')}
        <LearnMoreArrow />
      </Link>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ServicesExpertise() {
  const t = useTranslations('home-page.expertise')

  const services = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M4 22V12L14 4L24 12V22"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="10" y="16" width="8" height="6" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
      title: t('services.acquisition.title'),
      description: t('services.acquisition.description'),
      href: '#acquisition',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.2" />
          <path d="M14 8V14L18 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
      title: t('services.sales.title'),
      description: t('services.sales.description'),
      href: '#sales',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path
            d="M4 24L4 16M10 24V12M16 24V8M22 24V4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: t('services.development.title'),
      description: t('services.development.description'),
      href: '#development',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" />
          <path d="M18 18L24 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
      title: t('services.private-search.title'),
      description: t('services.private-search.description'),
      href: '#private-search',
    },
  ]

  return (
    <section id="services" className="bg-[#f7f5f0] py-[clamp(80px,10vw,140px)]">
      <PageContainer>
        {/* Header */}
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#b89a5b] font-medium mb-3">
            {t('eyebrow')}
          </p>
          <h2
            className="font-normal text-[#0a0a0a] leading-[1.1] max-w-130 m-0"
            style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: 'clamp(32px, 4vw, 52px)',
            }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} hasBorderLeft={index > 0} />
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
