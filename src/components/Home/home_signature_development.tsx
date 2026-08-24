import Image from 'next/image'
import Link from 'next/link'
import PageContainer from '../PageContainer'
import HeroImg from '@/assets/ANDERSEN_PROPERTIES_HERO.avif'

// ── Types ──────────────────────────────────────────────────────────────────────

type PropertyStat = {
  label: string
  value: string
}

type FeaturedProperty = {
  eyebrow: string
  title: string
  description: string
  stats: PropertyStat[]
  ctaLabel: string
  ctaHref: string
  image: {
    src: Parameters<typeof Image>[0]['src']
    alt: string
  }
}

// ── Placeholder data (replace with Payload fetch) ─────────────────────────────

const FEATURED: FeaturedProperty = {
  eyebrow: 'Signature Development',
  title: 'Andersen Residences\nNo. 01',
  description:
    'A limited collection of contemporary tropical homes shaped by natural materials, considered proportions, and seamless indoor–outdoor living.',
  stats: [
    { label: 'Location', value: 'Seminyak, Bali' },
    { label: 'Property Type', value: 'Tropical Villa Collection' },
    { label: 'Residences', value: '12 Exclusive Homes' },
    { label: 'Completion', value: 'Q3 2026' },
    { label: 'Starting Price', value: 'IDR 35 Billion' },
  ],
  ctaLabel: 'Explore the Development',
  ctaHref: '/properties/andersen-residences-01',
  image: {
    src: HeroImg,
    alt: 'Andersen Residences No. 01 — Seminyak, Bali',
  },
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function HomeSignatureDevelopment() {
  const p = FEATURED

  return (
    <section className="bg-[#0e0e0e] overflow-hidden">
      {/*
        Layout strategy:
        - PageContainer centres and pads the content as usual.
        - Inside it we use a two-column grid: [image] [content].
        - The image column escapes the container to the left using a
          negative left margin equal to PageContainer's own padding,
          so it bleeds to the viewport edge while the right (content)
          column stays perfectly aligned with the container.
        - On mobile: single column, image drops below (order-last).
      */}
      <PageContainer className="py-0! px-0! sm:px-0! md:px-0!">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ── Image — breaks out to the left ──────────────────────────── */}
          <div
            className="
              relative w-full aspect-4/3
              lg:aspect-auto lg:min-h-150
              order-last lg:order-first
              lg:-ml-4 xl:ml-0
              lg:w-[calc(50vw)]
              lg:justify-self-end
            "
            style={
              {
                // On xl the container is capped at 1280px and centred.
                // The image left edge must reach the viewport left edge,
                // so we pull it left by (viewport - 1280px) / 2 + container-left-padding.
                // We express this purely with Tailwind on the wrapper below.
              }
            }
          >
            {/*
              This inner wrapper is what actually bleeds.
              On lg+ it stretches from the viewport left edge to the centre
              of the container by using a negative left offset.
            */}
            <div className="relative h-full w-full lg:absolute lg:inset-y-0 lg:right-0 ">
              <Image
                src={p.image.src}
                alt={p.image.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* ── Content — aligned to container ──────────────────────────── */}
          <div className="flex items-center order-first lg:order-last py-16 px-4 sm:px-6 md:px-12 lg:pl-16 xl:pl-20">
            <div className="w-full">
              {/* Eyebrow */}
              <p className="text-primary text-[10px] tracking-[0.25em] uppercase mb-5">
                {p.eyebrow}
              </p>

              {/* Title */}
              <h2 className="text-white font-light text-4xl sm:text-5xl leading-[1.1] mb-6 whitespace-pre-line">
                {p.title}
              </h2>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-10">
                {p.description}
              </p>

              {/* Stats */}
              <dl className="border-t border-white/10 divide-y divide-white/10 mb-10">
                {p.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-3 gap-4">
                    <dt className="text-white/40 text-[10px] tracking-[0.2em] uppercase shrink-0">
                      {stat.label}
                    </dt>
                    <dd className="text-white/90 text-sm text-right">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              {/* CTA */}
              <Link
                href={p.ctaHref}
                className="
                  inline-block border border-primary/70
                  px-7 py-3
                  text-primary text-[10px] tracking-[0.2em] uppercase
                  hover:bg-primary hover:text-white
                  transition-colors duration-200
                "
              >
                {p.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
