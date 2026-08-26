import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface HomeClientTestimonialProps {
  quote?: string
  attribution?: string
  ctaLabel?: string
  ctaHref?: string
  image?: MediaType | string
  backgroundColor?: string
  quoteColor?: string
  attributionColor?: string
  ctaColor?: string
  ruleColor?: string
}

export const HomeClientTestimonial = ({
  quote = 'Working with Andersen Properties was a revelation. They understood exactly what we were looking for and introduced us to properties we would never have found on our own. The entire process — from viewing to closing — was handled with exceptional care and professionalism.',
  attribution = 'Michael Chen, Jakarta',
  ctaLabel = 'Read More Client Stories',
  ctaHref = '/client-stories',
  image,
  backgroundColor = '#ffffff',
  quoteColor = '#0a0a0a',
  attributionColor = '#a5a19a',
  ctaColor = '#b89a5b',
  ruleColor = '#b89a5b',
}: HomeClientTestimonialProps) => {
  return (
    <section className="py-[clamp(80px,10vw,140px)]" style={{ backgroundColor }}>
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left — image, 4:5 aspect ratio */}
          <div className="overflow-hidden rounded-sm bg-[#e5e0d7] aspect-[4/5]">
            {image && (
              <Media
                resource={image}
                imgClassName="w-full h-full object-cover block"
                size="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>

          {/* Right — quote */}
          <div>
            {/* Gold rule */}
            <div className="w-10 h-[2px] mb-10" style={{ backgroundColor: ruleColor }} />

            {/* Quote */}
            <blockquote
              className="not-italic m-0 mb-9 font-normal leading-[1.4] text-[clamp(22px,3vw,34px)]"
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontStyle: 'italic',
                color: quoteColor,
              }}
            >
              &ldquo;{quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <cite className="not-italic">
              <span
                className="block text-[10px] tracking-[0.16em] uppercase font-medium mb-6"
                style={{ color: attributionColor }}
              >
                {attribution}
              </span>
            </cite>

            {/* CTA */}
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase font-medium no-underline transition-[gap] duration-200 hover:gap-3"
                style={{ color: ctaColor }}
              >
                {ctaLabel}
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
                  <path
                    d="M7.5 1L11 4.5M11 4.5L7.5 8M11 4.5H1"
                    stroke={ctaColor}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
