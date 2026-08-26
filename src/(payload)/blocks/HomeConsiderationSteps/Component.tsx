import PageContainer from '@/components/PageContainer'

interface HomeConsiderationStepsProps {
  title?: string
  steps?: Array<{
    number: string
    title: string
    description: string
    id?: string
  }>
  backgroundColor?: string
  titleColor?: string
  stepNumberColor?: string
  stepTitleColor?: string
  stepDescriptionColor?: string
  dividerColor?: string
}

export const HomeConsiderationSteps = ({
  title = 'Why choose\nAndersen Properties?',
  steps = [
    {
      number: '01',
      title: 'Curated Selection',
      description:
        'We represent only properties that meet our standards for design, craftsmanship, and location — no filler, no volume.',
      id: '1',
    },
    {
      number: '02',
      title: 'Market Intelligence',
      description:
        'Deep knowledge of local development patterns, investment potential, and architectural context across all our markets.',
      id: '2',
    },
    {
      number: '03',
      title: 'White-Glove Service',
      description:
        'From first viewing to final handover, we manage every detail — legal, logistical, and personal.',
      id: '3',
    },
    {
      number: '04',
      title: 'Enduring Value',
      description:
        'Properties chosen for long-term appreciation, architectural merit, and quality of life — not short-term trends.',
      id: '4',
    },
  ],
  backgroundColor = '#111110',
  titleColor = '#ffffff',
  stepNumberColor = '#c8b97a',
  stepTitleColor = '#ffffff',
  stepDescriptionColor = 'rgba(255,255,255,0.4)',
  dividerColor = 'rgba(255,255,255,0.1)',
}: HomeConsiderationStepsProps) => {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor }}>
      <PageContainer>
        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-12 md:mb-20 max-w-xs sm:max-w-sm m-0 whitespace-pre-line"
          style={{ color: titleColor }}
        >
          {title}
        </h2>

        {/* Steps table */}
        <div className="flex flex-col border-t" style={{ borderColor: dividerColor }}>
          {steps.map((step) => (
            <div
              key={step.id || step.number}
              className="grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr_2fr] items-start gap-x-4 gap-y-2 md:gap-12 py-8 md:py-12 border-b"
              style={{ borderColor: dividerColor }}
            >
              {/* Number */}
              <span
                className="text-sm md:text-base tracking-[0.1em] font-light italic pt-1"
                style={{ color: stepNumberColor }}
              >
                {step.number}
              </span>

              {/* Title */}
              <span
                className="text-lg md:text-2xl font-light leading-snug"
                style={{ color: stepTitleColor }}
              >
                {step.title}
              </span>

              {/* Description */}
              <p
                className="col-start-2 md:col-start-3 text-sm font-light leading-relaxed m-0"
                style={{ color: stepDescriptionColor }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
