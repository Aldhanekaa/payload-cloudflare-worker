import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import CtaBg from '@/assets/ANDERSEN_PROPERTIES_DEFAULT_IMG.avif'
import PageContainer from '@/components/PageContainer'

export default function ServicesCTA() {
  const t = useTranslations('home-page.cta')

  return (
    <section id="consultation" className="relative overflow-hidden bg-[#0a0a0a]">
      {/* Background image */}
      <Image
        src={CtaBg}
        alt=""
        fill
        className="object-cover object-center opacity-25"
        sizes="100vw"
        aria-hidden="true"
      />

      {/* Content */}
      <PageContainer className="relative z-10 py-[clamp(80px,12vw,160px)] text-center">
        {/* Eyebrow */}
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#b89a5b] font-medium mb-6">
          {t('eyebrow')}
        </p>

        {/* Headline */}
        <h2
          className="font-normal text-white leading-[1.08] tracking-[-0.01em] max-w-180 mx-auto mb-6 mt-0"
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(36px, 5.5vw, 72px)',
          }}
        >
          {t('title')}
        </h2>

        {/* Subtext */}
        <p className="text-white/55 text-base leading-[1.7] font-light max-w-110 mx-auto mb-13">
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="bg-[#b89a5b] hover:bg-[#a5894f] text-[#0a0a0a] text-[11px] tracking-[0.14em] uppercase font-semibold px-9 py-4 no-underline transition-colors duration-200 inline-block"
          >
            {t('cta-primary')}
          </Link>
          <Link
            href="https://wa.me/62000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/25 hover:border-white/50 text-white/80 hover:text-white text-[11px] tracking-[0.14em] uppercase font-medium px-9 py-4 no-underline transition-all duration-200 inline-flex items-center gap-2"
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
            {t('cta-secondary')}
          </Link>
        </div>
      </PageContainer>
    </section>
  )
}
