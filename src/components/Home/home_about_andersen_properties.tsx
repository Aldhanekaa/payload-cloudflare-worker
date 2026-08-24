import Link from 'next/link'
import { useTranslations } from 'next-intl'
import PageContainer from '@/components/PageContainer'

export default function HomeAboutAndersenProperties() {
  const t = useTranslations('home-page.about')

  const stats = [
    { value: '12+', label: t('stats.years') },
    { value: '150+', label: t('stats.properties') },
    { value: '8', label: t('stats.markets') },
  ]

  return (
    <section className="bg-[#f5f2eb] py-20 md:py-28">
      <PageContainer>
        {/* Top: headline + description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-28">
          {/* Left — headline */}
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-[#1a1a1a] m-0">
              {t('headline')}
            </h2>
          </div>

          {/* Right — description + CTA */}
          <div className="flex flex-col justify-center gap-6">
            <p className="text-[#555] text-sm sm:text-base font-light leading-relaxed m-0">
              {t('description')}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[#a8894a] text-[11px] tracking-[0.2em] uppercase font-medium no-underline hover:opacity-70 transition-opacity duration-200 w-fit"
            >
              {t('cta')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#d6d0c4]" />

        {/* Bottom: stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 pt-12 md:pt-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-2 py-4 sm:py-0 ${
                index !== 0 ? 'sm:border-l sm:border-[#c8c0b0] sm:pl-10' : ''
              } ${index !== stats.length - 1 ? 'border-b border-[#d6d0c4] sm:border-b-0 sm:pr-10' : ''}`}
            >
              <span className="text-5xl sm:text-6xl font-light text-[#1a1a1a] leading-none tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#888] font-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
