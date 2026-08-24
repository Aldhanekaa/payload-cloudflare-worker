import { useTranslations } from 'next-intl'
import PageContainer from '@/components/PageContainer'

export default function ServicesHero() {
  const t = useTranslations('services-page.hero')

  return (
    <div
      className="bg-[#0a0a0a]"
      style={{
        paddingTop: 'clamp(60px, 8vw, 100px)',
        paddingBottom: 'clamp(48px, 6vw, 72px)',
      }}
    >
      <PageContainer>
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#b89a5b] font-medium mb-4">
          {t('eyebrow')}
        </p>
        <h1
          className="text-white font-normal leading-[1.08] tracking-[-0.01em] max-w-150 mb-4 mt-0"
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(36px, 5vw, 64px)',
          }}
        >
          {t('title')}
        </h1>
        <p className="text-white/50 text-[15px] leading-[1.7] font-light max-w-110 m-0">
          {t('description')}
        </p>
      </PageContainer>
    </div>
  )
}
