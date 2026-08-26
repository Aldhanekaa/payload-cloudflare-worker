'use client'

import Link from 'next/link'
import { useState } from 'react'
import PageContainer from '@/components/PageContainer'

interface Service {
  title: string
  description: string
  href: string
  id?: string
}

interface HomeExpertiseProps {
  eyebrow?: string
  title?: string
  services?: Service[]
  learnMoreLabel?: string
  backgroundColor?: string
  eyebrowColor?: string
  titleColor?: string
  serviceTitleColor?: string
  serviceDescriptionColor?: string
  learnMoreColor?: string
  iconColor?: string
  cardBorderColor?: string
  cardBorderHoverColor?: string
}

// Icon components (simplified)
function ServiceIcon({ color = '#A5A19A' }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M4 22V12L14 4L24 12V22"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="10" y="16" width="8" height="6" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}

function LearnMoreArrow({ stroke = '#B89A5B' }: { stroke?: string }) {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path
        d="M6 1L9 4M9 4L6 7M9 4H1"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ServiceCard({
  service,
  hasBorderLeft,
  learnMoreLabel,
  colors,
}: {
  service: Service
  hasBorderLeft: boolean
  learnMoreLabel: string
  colors: {
    serviceTitleColor: string
    serviceDescriptionColor: string
    learnMoreColor: string
    iconColor: string
    cardBorderColor: string
    cardBorderHoverColor: string
  }
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`p-9 transition-colors duration-300 ${hasBorderLeft ? 'border-l' : ''}`}
      style={{
        borderTop: `2px solid ${hovered ? colors.cardBorderHoverColor : colors.cardBorderColor}`,
        borderLeftColor: hasBorderLeft ? colors.cardBorderColor : 'transparent',
        transition: 'border-top-color 0.3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ color: colors.iconColor }} className="mb-5">
        <ServiceIcon color={colors.iconColor} />
      </div>

      <h3
        className="text-xl font-medium mb-3 leading-[1.2] mt-0"
        style={{ fontFamily: 'var(--font-cormorant, serif)', color: colors.serviceTitleColor }}
      >
        {service.title}
      </h3>

      <p
        className="text-sm leading-[1.7] font-light mb-5"
        style={{ color: colors.serviceDescriptionColor }}
      >
        {service.description}
      </p>

      <Link
        href={service.href}
        className="text-[11px] tracking-widest uppercase no-underline font-medium inline-flex items-center gap-1.5 hover:gap-3 transition-all duration-200"
        style={{ color: colors.learnMoreColor }}
      >
        {learnMoreLabel}
        <LearnMoreArrow stroke={colors.learnMoreColor} />
      </Link>
    </div>
  )
}

export const HomeExpertise = ({
  eyebrow = 'Our Expertise',
  title = 'Comprehensive service across every stage of your property journey',
  services = [
    {
      title: 'Property Acquisition',
      description:
        'End-to-end buyer representation: from market mapping and due diligence to negotiation and transaction close.',
      href: '#acquisition',
      id: '1',
    },
    {
      title: 'Sales & Marketing',
      description:
        'Tailored campaigns for exceptional properties — strategic positioning, bespoke assets, and targeted outreach.',
      href: '#sales',
      id: '2',
    },
    {
      title: 'Development Consulting',
      description:
        'Advisory for land assembly, concept development, and go-to-market strategy for residential projects.',
      href: '#development',
      id: '3',
    },
    {
      title: 'Private Property Search',
      description:
        'Confidential, off-market sourcing for clients seeking properties not publicly listed.',
      href: '#private-search',
      id: '4',
    },
  ],
  learnMoreLabel = 'Learn More',
  backgroundColor = '#f7f5f0',
  eyebrowColor = '#b89a5b',
  titleColor = '#0a0a0a',
  serviceTitleColor = '#0a0a0a',
  serviceDescriptionColor = '#a5a19a',
  learnMoreColor = '#b89a5b',
  iconColor = '#a5a19a',
  cardBorderColor = '#e5e0d7',
  cardBorderHoverColor = '#b89a5b',
}: HomeExpertiseProps) => {
  return (
    <section id="services" className="py-[clamp(80px,10vw,140px)]" style={{ backgroundColor }}>
      <PageContainer>
        <div className="mb-16">
          <p
            className="text-[10px] tracking-[0.22em] uppercase font-medium mb-3"
            style={{ color: eyebrowColor }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-normal leading-[1.1] max-w-130 m-0"
            style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              color: titleColor,
            }}
          >
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id || index}
              service={service}
              hasBorderLeft={index > 0}
              learnMoreLabel={learnMoreLabel}
              colors={{
                serviceTitleColor,
                serviceDescriptionColor,
                learnMoreColor,
                iconColor,
                cardBorderColor,
                cardBorderHoverColor,
              }}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
