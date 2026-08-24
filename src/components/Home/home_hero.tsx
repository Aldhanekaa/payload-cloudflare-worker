import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import HeroImg from '@/assets/ANDERSEN_PROPERTIES_HERO.avif'

export default function HomePageHero() {
  const t = useTranslations('home-page.hero')

  return (
    <section className="relative h-screen min-h-150 overflow-hidden bg-black">
      {/* Background image */}
      <Image
        src={HeroImg}
        alt="Contemporary tropical luxury residence in Indonesia"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay — rgba(10,10,10,0.48) */}
      <div className="absolute inset-0 bg-black/48" />

      {/* Content */}
      <div className="relative z-10 max-w-360 mx-auto px-5 md:px-20 pt-20 h-full flex flex-col justify-center">
        {/* Eyebrow */}
        <p className="text-primary text-[11px] tracking-[0.22em] uppercase font-medium mb-6">
          {t('eyebrow')}
        </p>

        {/* Headline */}
        <h1
          className="text-white font-normal leading-[1.08] tracking-[-0.01em] max-w-170 mb-7 mt-0"
          style={{ fontSize: 'clamp(44px, 6vw, 80px)' }}
        >
          {t('title')}
        </h1>

        {/* Subheading */}
        <p className="text-white/72 text-base leading-[1.7] max-w-110 mb-11 font-light">
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div className="flex gap-3.5 flex-wrap">
          <Link
            href="/active-listings"
            className="inline-block bg-primary text-[#0a0a0a] text-[11px] tracking-[0.14em] font-semibold py-3.5 px-8 no-underline uppercase hover:bg-primary-400 transition-colors duration-200"
          >
            {t('cta-primary')}
          </Link>
          <Link
            href="/services"
            className="inline-block border border-white/40 text-white text-[11px] tracking-[0.14em] font-medium py-3.5 px-8 no-underline uppercase hover:border-white/70 transition-colors duration-200"
          >
            {t('cta-secondary')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-10 z-10 flex items-center gap-2.5">
        {/* Animated vertical line */}
        <div className="w-px h-10 bg-white/30 relative overflow-hidden">
          <div className="absolute left-0 w-full bg-primary animate-scroll-down" />
        </div>
        <span className="text-white/40 text-[10px] tracking-[0.18em] uppercase">
          {t('scroll-indicator')}
        </span>
      </div>
    </section>
  )
}
