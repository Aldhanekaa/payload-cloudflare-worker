import { useTranslations } from 'next-intl'
import PageContainer from '@/components/PageContainer'

export default function HomeConsiderationSteps() {
  const t = useTranslations('home-page.consideration-steps')

  const steps = [
    {
      number: '01',
      title: t('steps.curated.title'),
      description: t('steps.curated.description'),
    },
    {
      number: '02',
      title: t('steps.intelligence.title'),
      description: t('steps.intelligence.description'),
    },
    {
      number: '03',
      title: t('steps.service.title'),
      description: t('steps.service.description'),
    },
    {
      number: '04',
      title: t('steps.value.title'),
      description: t('steps.value.description'),
    },
  ]

  return (
    <section className="bg-[#111110] py-20 md:py-28">
      <PageContainer>
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-white mb-12 md:mb-20 max-w-xs sm:max-w-sm m-0">
          {t('title')}
        </h2>

        {/* Steps table */}
        <div className="flex flex-col border-t border-white/10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr_2fr] items-start gap-x-4 gap-y-2 md:gap-12 py-8 md:py-12 border-b border-white/10"
            >
              {/* Number */}
              <span className="text-sm md:text-base tracking-[0.1em] text-[#c8b97a] font-light italic pt-1">
                {step.number}
              </span>

              {/* Title */}
              <span className="text-white text-lg md:text-2xl font-light leading-snug">
                {step.title}
              </span>

              {/* Description — full width under number+title on mobile, own column on md+ */}
              <p className="col-start-2 md:col-start-3 text-white/40 text-sm font-light leading-relaxed m-0">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
