import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface HomeSignatureDevelopmentProps {
  eyebrow?: string
  title?: string
  description?: string
  stats?: Array<{
    label: string
    value: string
    id?: string
  }>
  ctaLabel?: string
  ctaHref?: string
  image?: MediaType | string
  backgroundColor?: string
  eyebrowColor?: string
  titleColor?: string
  descriptionColor?: string
  statLabelColor?: string
  statValueColor?: string
  dividerColor?: string
  ctaBorderColor?: string
  ctaTextColor?: string
  ctaHoverBgColor?: string
  ctaHoverTextColor?: string
}

export const HomeSignatureDevelopment = ({
  eyebrow = 'Signature Development',
  title = 'Andersen Residences\nNo. 01',
  description = 'Our first proprietary development: a collection of six architect-designed villas in Seminyak, redefining modern tropical living with considered materials and refined spatial planning.',
  stats = [
    { label: 'Location', value: 'Seminyak, Bali', id: '1' },
    { label: 'Property Type', value: 'Private Villas', id: '2' },
    { label: 'Residences', value: '6 Units', id: '3' },
    { label: 'Completion', value: 'Q2 2026', id: '4' },
    { label: 'Starting Price', value: 'IDR 18.5 Billion', id: '5' },
  ],
  ctaLabel = 'Explore the Development',
  ctaHref = '/properties/andersen-residences-01',
  image,
  backgroundColor = '#0e0e0e',
  eyebrowColor = '#D7F205',
  titleColor = '#ffffff',
  descriptionColor = 'rgba(255,255,255,0.6)',
  statLabelColor = 'rgba(255,255,255,0.4)',
  statValueColor = 'rgba(255,255,255,0.9)',
  dividerColor = 'rgba(255,255,255,0.1)',
  ctaBorderColor = 'rgba(208,186,122,0.7)',
  ctaTextColor = '#D7F205',
  ctaHoverBgColor = '#D7F205',
  ctaHoverTextColor = '#ffffff',
}: HomeSignatureDevelopmentProps) => {
  return (
    <section className="overflow-hidden" style={{ backgroundColor }}>
      <PageContainer className="py-0! px-0! sm:px-0! md:px-0!">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div
            className="
              relative w-full aspect-4/3
              lg:aspect-auto lg:min-h-150
              order-last lg:order-first
              lg:-ml-4 xl:ml-0
              lg:w-[calc(50vw)]
              lg:justify-self-end
            "
          >
            <div className="relative h-full w-full lg:absolute lg:inset-y-0 lg:right-0">
              {image && (
                <Media
                  resource={image}
                  imgClassName="object-cover object-center"
                  fill
                  size="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex items-center order-first lg:order-last py-16 px-4 sm:px-6 md:px-12 lg:pl-16 xl:pl-20">
            <div className="w-full">
              {/* Eyebrow */}
              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-5"
                style={{ color: eyebrowColor }}
              >
                {eyebrow}
              </p>

              {/* Title */}
              <h2
                className="font-light text-4xl sm:text-5xl leading-[1.1] mb-6 whitespace-pre-line"
                style={{ color: titleColor }}
              >
                {title}
              </h2>

              {/* Description */}
              <p
                className="text-sm leading-relaxed max-w-sm mb-10"
                style={{ color: descriptionColor }}
              >
                {description}
              </p>

              {/* Stats */}
              <dl className="border-t divide-y mb-10" style={{ borderColor: dividerColor }}>
                {stats.map((stat) => (
                  <div
                    key={stat.id || stat.label}
                    className="flex items-center justify-between py-3 gap-4"
                    style={{ borderColor: dividerColor }}
                  >
                    <dt
                      className="text-[10px] tracking-[0.2em] uppercase shrink-0"
                      style={{ color: statLabelColor }}
                    >
                      {stat.label}
                    </dt>
                    <dd className="text-sm text-right" style={{ color: statValueColor }}>
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* CTA */}
              {ctaLabel && ctaHref && (
                <Link
                  href={ctaHref}
                  className="
                    inline-block border
                    px-7 py-3
                    text-[10px] tracking-[0.2em] uppercase
                    transition-colors duration-200
                  "
                  style={{
                    borderColor: ctaBorderColor,
                    color: ctaTextColor,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = ctaHoverBgColor
                    e.currentTarget.style.color = ctaHoverTextColor
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = ctaTextColor
                  }}
                >
                  {ctaLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
