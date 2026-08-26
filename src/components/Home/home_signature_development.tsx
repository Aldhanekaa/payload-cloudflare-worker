'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import PageContainer from '../PageContainer'
import HeroImg from '@/assets/ANDERSEN_PROPERTIES_HERO.avif'
import type { Media, Portfolio, PortfolioCategory } from '@/payload-types'

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

type HomeSignatureDevelopmentProps = {
  featuredPortfolios?: Portfolio[] | null
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function HomeSignatureDevelopment({
  featuredPortfolios,
}: HomeSignatureDevelopmentProps = {}) {
  const t = useTranslations('home-page.signature-development')
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultFeatured: FeaturedProperty = {
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

  const featuredItems = useMemo<FeaturedProperty[]>(() => {
    if (!featuredPortfolios || featuredPortfolios.length === 0) {
      return [defaultFeatured]
    }

    return featuredPortfolios.map((portfolio) => {
      const heroImage =
        portfolio && typeof portfolio.heroImage === 'object' ? (portfolio.heroImage as Media) : null
      const categoryData =
        typeof portfolio.category === 'object' ? (portfolio.category as PortfolioCategory) : null

      return {
        eyebrow: t('eyebrow'),
        title: portfolio.name,
        description: portfolio.description || t('description'),
        stats: [
          { label: t('stats.location'), value: portfolio.location || '-' },
          { label: t('stats.property-type'), value: categoryData?.name || '-' },
          { label: t('stats.residences'), value: `${portfolio.units} Units` },
          { label: t('stats.completion'), value: portfolio.completion || '-' },
          { label: t('stats.starting-price'), value: portfolio.from || '-' },
        ],
        ctaLabel: t('cta'),
        ctaHref: `/portfolios/${portfolio.slug}`,
        image: {
          src: heroImage?.url || HeroImg,
          alt: portfolio.imageAlt || portfolio.name,
        },
      }
    })
  }, [defaultFeatured, featuredPortfolios, t])

  useEffect(() => {
    setActiveIndex(0)
  }, [featuredItems.length])

  useEffect(() => {
    if (featuredItems.length <= 1) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % featuredItems.length)
    }, 10000)

    return () => window.clearInterval(intervalId)
  }, [activeIndex, featuredItems.length])

  const p = featuredItems[activeIndex] || defaultFeatured

  const goToPrevious = () => {
    setActiveIndex((previousIndex) =>
      previousIndex === 0 ? featuredItems.length - 1 : previousIndex - 1,
    )
  }

  const goToNext = () => {
    setActiveIndex((previousIndex) => (previousIndex + 1) % featuredItems.length)
  }

  return (
    <section className="bg-[#0e0e0e] overflow-hidden">
      <PageContainer className="py-0! px-0! sm:px-0! md:px-0!">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ── Image — breaks out to the left ──────────────────────────── */}
          <div
            key={`signature-image-${activeIndex}`}
            className="
              animate-signature-swap
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
          <div
            key={`signature-content-${activeIndex}`}
            className="animate-signature-swap flex items-center order-first lg:order-last py-16 px-4 sm:px-6 md:px-12 lg:pl-16 xl:pl-20"
          >
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

              {featuredItems.length > 1 && (
                <div
                  className="mt-10 flex items-center gap-5"
                  aria-label="Signature developments carousel"
                >
                  <div className="h-px flex-1 bg-white/15" aria-hidden="true">
                    <div
                      key={`signature-progress-${activeIndex}`}
                      className="animate-signature-progress h-full origin-left bg-primary"
                    />
                  </div>

                  <span className="text-white/40 text-[10px] tracking-[0.2em] tabular-nums">
                    {String(activeIndex + 1).padStart(2, '0')} /{' '}
                    {String(featuredItems.length).padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={goToPrevious}
                      aria-label="Previous signature development"
                      className="flex size-9 items-center justify-center border border-white/20 text-white transition-colors hover:border-primary hover:text-primary"
                    >
                      <ChevronLeft size={16} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      aria-label="Next signature development"
                      className="flex size-9 items-center justify-center border border-white/20 text-white transition-colors hover:border-primary hover:text-primary"
                    >
                      <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
