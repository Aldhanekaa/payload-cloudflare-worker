import Image from 'next/image'
import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import type { Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'

interface HomeHeroProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  ctaPrimary?: {
    label: string
    href: string
  }
  ctaSecondary?: {
    label: string
    href: string
  }
  scrollIndicator?: string
  backgroundImage?: Media | string
  backgroundColor?: string
  overlayOpacity?: string
  textColor?: string
  eyebrowColor?: string
  ctaPrimaryBgColor?: string
  ctaPrimaryTextColor?: string
  ctaSecondaryBorderColor?: string
  ctaSecondaryTextColor?: string
}

export const HomeHero = ({
  eyebrow = "Indonesia's Premier Real Estate",
  title = 'Contemporary Living,\nRefined by Design',
  subtitle = "Curated properties across Indonesia's most desirable locations — from modernist villas in Bali to architectural residences in Jakarta.",
  ctaPrimary = { label: 'View Active Listings', href: '/active-listings' },
  ctaSecondary = { label: 'Speak with an Advisor', href: 'https://wa.me/62812345678' },
  scrollIndicator = 'Scroll to explore',
  backgroundImage,
  backgroundColor = '#000000',
  overlayOpacity = '0.48',
  textColor = '#ffffff',
  eyebrowColor = '#D7F205',
  ctaPrimaryBgColor = '#D7F205',
  ctaPrimaryTextColor = '#0a0a0a',
  ctaSecondaryBorderColor = 'rgba(255,255,255,0.4)',
  ctaSecondaryTextColor = '#ffffff',
}: HomeHeroProps) => {
  return (
    <section className="relative h-screen min-h-150 overflow-hidden" style={{ backgroundColor }}>
      {/* Background image */}
      {backgroundImage && (
        <MediaComponent
          resource={backgroundImage}
          imgClassName="object-cover object-center"
          fill
          priority
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(10,10,10,${overlayOpacity})` }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-360 mx-auto px-5 md:px-20 pt-20 h-full flex flex-col justify-center">
        {/* Eyebrow */}
        <p
          className="text-[11px] tracking-[0.22em] uppercase font-medium mb-6"
          style={{ color: eyebrowColor }}
        >
          {eyebrow}
        </p>

        {/* Headline */}
        <h1
          className="font-normal leading-[1.08] tracking-[-0.01em] max-w-170 mb-7 mt-0 whitespace-pre-line"
          style={{ fontSize: 'clamp(44px, 6vw, 80px)', color: textColor }}
        >
          {title}
        </h1>

        {/* Subheading */}
        <p
          className="text-base leading-[1.7] max-w-110 mb-11 font-light"
          style={{ color: textColor, opacity: 0.72 }}
        >
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex gap-3.5 flex-wrap">
          {ctaPrimary && (
            <Link
              href={ctaPrimary.href}
              className="inline-block text-[11px] tracking-[0.14em] font-semibold py-3.5 px-8 no-underline uppercase hover:opacity-80 transition-opacity duration-200"
              style={{ backgroundColor: ctaPrimaryBgColor, color: ctaPrimaryTextColor }}
            >
              {ctaPrimary.label}
            </Link>
          )}
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              className="inline-block border text-[11px] tracking-[0.14em] font-medium py-3.5 px-8 no-underline uppercase hover:opacity-80 transition-opacity duration-200"
              style={{ borderColor: ctaSecondaryBorderColor, color: ctaSecondaryTextColor }}
            >
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      {scrollIndicator && (
        <div className="absolute bottom-10 left-10 z-10 flex items-center gap-2.5">
          <div className="w-px h-10 bg-white/30 relative overflow-hidden">
            <div className="absolute left-0 w-full bg-primary animate-scroll-down" />
          </div>
          <span
            className="text-[10px] tracking-[0.18em] uppercase"
            style={{ color: textColor, opacity: 0.4 }}
          >
            {scrollIndicator}
          </span>
        </div>
      )}
    </section>
  )
}
