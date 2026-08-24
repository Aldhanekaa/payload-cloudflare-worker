import { useTranslations } from 'next-intl'
import PageContainer from '@/components/PageContainer'

export default function AboutPrinciples() {
  const t = useTranslations('about-page.principles')

  const principles = [
    {
      key: 'curation',
      title: t('items.curation.title'),
      description: t('items.curation.description'),
    },
    {
      key: 'relationships',
      title: t('items.relationships.title'),
      description: t('items.relationships.description'),
    },
    {
      key: 'local',
      title: t('items.local.title'),
      description: t('items.local.description'),
    },
    {
      key: 'confidence',
      title: t('items.confidence.title'),
      description: t('items.confidence.description'),
    },
  ]

  return (
    <section className="py-[clamp(64px,8vw,100px)] bg-[#f7f5f0] border-t border-[#e5e0d7]">
      <PageContainer>
        {/* Header */}
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#b89a5b] font-medium mb-3">
          {t('eyebrow')}
        </p>
        <h2
          className="font-normal text-[#0a0a0a] leading-[1.1] mb-14 max-w-100 mt-0"
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
          }}
        >
          {t('title')}
        </h2>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => {
            const isLast = index === principles.length - 1
            return (
              <div
                key={principle.key}
                className={`p-8 border-t-2 border-t-[#b89a5b] ${!isLast ? 'border-r border-r-[#e5e0d7]' : ''}`}
              >
                <h3
                  className="text-xl font-medium text-[#0a0a0a] mb-3 mt-0 leading-[1.2]"
                  style={{ fontFamily: 'var(--font-cormorant, serif)' }}
                >
                  {principle.title}
                </h3>
                <p className="text-[#a5a19a] text-sm leading-[1.7] font-light m-0">
                  {principle.description}
                </p>
              </div>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
