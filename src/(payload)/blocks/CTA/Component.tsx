import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface HomeCTAProps {
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
  backgroundImage?: MediaType | string
  backgroundColor?: string
  imageOpacity?: string
  eyebrowColor?: string
  titleColor?: string
  subtitleColor?: string
  ctaPrimaryBgColor?: string
  ctaPrimaryHoverBgColor?: string
  ctaPrimaryTextColor?: string
  ctaSecondaryBorderColor?: string
  ctaSecondaryHoverBorderColor?: string
  ctaSecondaryTextColor?: string
  ctaSecondaryHoverTextColor?: string
}

export const HomeCTA = ({
  eyebrow = 'Get Started',
  title = 'Ready to find your\nnext property?',
  subtitle = 'Schedule a private consultation to discuss your vision, explore our portfolio, and begin your property journey with Andersen.',
  ctaPrimary = { label: 'Schedule a Consultation', href: '/contact' },
  ctaSecondary = { label: 'Chat on WhatsApp', href: 'https://wa.me/62812345678' },
  backgroundImage,
  backgroundColor = '#0a0a0a',
  imageOpacity = '0.25',
  eyebrowColor = '#b89a5b',
  titleColor = '#ffffff',
  subtitleColor = 'rgba(255,255,255,0.55)',
  ctaPrimaryBgColor = '#b89a5b',
  ctaPrimaryHoverBgColor = '#a5894f',
  ctaPrimaryTextColor = '#0a0a0a',
  ctaSecondaryBorderColor = 'rgba(255,255,255,0.25)',
  ctaSecondaryHoverBorderColor = 'rgba(255,255,255,0.5)',
  ctaSecondaryTextColor = 'rgba(255,255,255,0.8)',
  ctaSecondaryHoverTextColor = '#ffffff',
}: HomeCTAProps) => {
  return (
    <section id="consultation" className="relative overflow-hidden" style={{ backgroundColor }}>
      {/* Background image */}
      {backgroundImage && (
        <div style={{ opacity: imageOpacity }}>
          <Media
            resource={backgroundImage}
            imgClassName="object-cover object-center"
            fill
            size="100vw"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Content */}
      <PageContainer className="relative z-10 py-[clamp(80px,12vw,160px)] text-center">
        {/* Eyebrow */}
        <p
          className="text-[10px] tracking-[0.22em] uppercase font-medium mb-6"
          style={{ color: eyebrowColor }}
        >
          {eyebrow}
        </p>

        {/* Headline */}
        <h2
          className="font-normal leading-[1.08] tracking-[-0.01em] max-w-180 mx-auto mb-6 mt-0 whitespace-pre-line"
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            color: titleColor,
          }}
        >
          {title}
        </h2>

        {/* Subtext */}
        <p
          className="text-base leading-[1.7] font-light max-w-110 mx-auto mb-13"
          style={{ color: subtitleColor }}
        >
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {ctaPrimary && (
            <Link
              href={ctaPrimary.href}
              className="text-[11px] tracking-[0.14em] uppercase font-semibold px-9 py-4 no-underline transition-colors duration-200 inline-block"
              style={{ backgroundColor: ctaPrimaryBgColor, color: ctaPrimaryTextColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ctaPrimaryHoverBgColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ctaPrimaryBgColor
              }}
            >
              {ctaPrimary.label}
            </Link>
          )}
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border text-[11px] tracking-[0.14em] uppercase font-medium px-9 py-4 no-underline transition-all duration-200 inline-flex items-center gap-2"
              style={{
                borderColor: ctaSecondaryBorderColor,
                color: ctaSecondaryTextColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ctaSecondaryHoverBorderColor
                e.currentTarget.style.color = ctaSecondaryHoverTextColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = ctaSecondaryBorderColor
                e.currentTarget.style.color = ctaSecondaryTextColor
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      </PageContainer>
    </section>
  )
}
