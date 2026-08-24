import { useTranslations } from 'next-intl'
import PageContainer from '@/components/PageContainer'

export default function ServicesPath() {
  const t = useTranslations('home-page.path')

  const steps = [
    {
      number: '01',
      title: t('steps.understand.title'),
      description: t('steps.understand.description'),
    },
    {
      number: '02',
      title: t('steps.curate.title'),
      description: t('steps.curate.description'),
    },
    {
      number: '03',
      title: t('steps.experience.title'),
      description: t('steps.experience.description'),
    },
    {
      number: '04',
      title: t('steps.complete.title'),
      description: t('steps.complete.description'),
    },
  ]

  return (
    <section className="bg-[#f7f5f0] py-[clamp(80px,10vw,140px)]">
      <PageContainer>
        {/* Heading */}
        <div className="mb-16">
          <h2
            className="font-normal leading-[1.1] text-[#0a0a0a] m-0"
            style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: 'clamp(32px, 4vw, 52px)',
            }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-0">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-6 left-10 right-10 h-px bg-[#b89a5b] opacity-40 pointer-events-none" />

          {steps.map((step) => (
            <div key={step.number} className="relative pr-0 lg:pr-8">
              {/* Number box */}
              <div className="relative z-10 w-12 h-12 border border-[#b89a5b] flex items-center justify-center mb-7 bg-[#f7f5f0]">
                <span
                  className="text-base font-normal text-[#b89a5b] italic"
                  style={{ fontFamily: 'var(--font-cormorant, serif)' }}
                >
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-[22px] font-medium text-[#0a0a0a] mb-2.5 mt-0"
                style={{ fontFamily: 'var(--font-cormorant, serif)' }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#a5a19a] text-sm font-light leading-[1.7] max-w-65 m-0">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
