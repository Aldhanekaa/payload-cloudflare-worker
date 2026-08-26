import Link from 'next/link'
import PageContainer from '@/components/PageContainer'

interface HomeAboutProps {
  headline?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  stats?: Array<{
    value: string
    label: string
    id?: string
  }>
  backgroundColor?: string
  headlineColor?: string
  descriptionColor?: string
  ctaColor?: string
  dividerColor?: string
  statValueColor?: string
  statLabelColor?: string
}

export const HomeAbout = ({
  headline = 'About Andersen\nProperties',
  description = "We represent a new standard in Indonesian luxury real estate — one built on curation, intelligence, and integrity. Our portfolio focuses exclusively on contemporary architecture and design-forward properties across the country's most compelling markets.",
  ctaLabel = 'Learn More About Us',
  ctaHref = '/about',
  stats = [
    { value: '12+', label: 'Years of Experience', id: '1' },
    { value: '150+', label: 'Properties Sold', id: '2' },
    { value: '8', label: 'Key Markets', id: '3' },
  ],
  backgroundColor = '#f5f2eb',
  headlineColor = '#1a1a1a',
  descriptionColor = '#555',
  ctaColor = '#a8894a',
  dividerColor = '#d6d0c4',
  statValueColor = '#1a1a1a',
  statLabelColor = '#888',
}: HomeAboutProps) => {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor }}>
      <PageContainer>
        {/* Top: headline + description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-28">
          {/* Left — headline */}
          <div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight m-0 whitespace-pre-line"
              style={{ color: headlineColor }}
            >
              {headline}
            </h2>
          </div>

          {/* Right — description + CTA */}
          <div className="flex flex-col justify-center gap-6">
            <p
              className="text-sm sm:text-base font-light leading-relaxed m-0"
              style={{ color: descriptionColor }}
            >
              {description}
            </p>
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium no-underline hover:opacity-70 transition-opacity duration-200 w-fit"
                style={{ color: ctaColor }}
              >
                {ctaLabel} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ backgroundColor: dividerColor }} />

        {/* Bottom: stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 pt-12 md:pt-16">
          {stats.map((stat, index) => (
            <div
              key={stat.id || index}
              className={`flex flex-col gap-2 py-4 sm:py-0 ${
                index !== 0 ? 'sm:border-l sm:pl-10' : ''
              } ${index !== stats.length - 1 ? 'border-b sm:border-b-0 sm:pr-10' : ''}`}
              style={{
                borderColor: dividerColor,
              }}
            >
              <span
                className="text-5xl sm:text-6xl font-light leading-none tracking-tight"
                style={{ color: statValueColor }}
              >
                {stat.value}
              </span>
              <span
                className="text-[10px] tracking-[0.2em] uppercase font-light"
                style={{ color: statLabelColor }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
