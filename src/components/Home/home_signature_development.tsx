import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
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

// ── Component ──────────────────────────────────────────────────────────────────

export default function HomeSignatureDevelopment() {
  const t = useTranslations('home-page.signature-development')

  const FEATURED: FeaturedProperty = {
    eyebrow: t('eyebrow'),
    title: t('title'),
    description: t('description'),
    stats: [
      { label: t('stats.location'), value: t('values.location') },
      { label: t('stats.property-type'), value: t('values.property-type') },
      { label: t('stats.residences'), value: t('values.residences') },
      { label: t('stats.completion'), value: t('values.completion') },
      { label: t('stats.starting-price'), value: t('values.starting-price') },
    ],
    ctaLabel: t('cta'),
    ctaHref: '/properties/andersen-residences-01',
    image: {
      src: HeroImg,
      alt: 'Andersen Residences No. 01 — Seminyak, Bali',
    },
  }

  const p = FEATURED

  return (
    <section className="bg-[#0e0e0e] overflow-hidden">
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
          >
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
