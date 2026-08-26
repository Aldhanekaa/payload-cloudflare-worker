import PageContainer from '@/components/PageContainer'

interface PathProps {
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
  stepNumberBorderColor?: string
  stepTitleColor?: string
  stepDescriptionColor?: string
  connectorColor?: string
}

export const Path = ({
  title = 'Our Path to Your\nPerfect Property',
  steps = [
    {
      number: '01',
      title: 'Understand',
      description:
        'We begin by understanding your vision, priorities, and long-term goals — no generic questionnaires.',
      id: '1',
    },
    {
      number: '02',
      title: 'Curate',
      description:
        'Using our network and market intelligence, we assemble a shortlist tailored to your criteria.',
      id: '2',
    },
    {
      number: '03',
      title: 'Experience',
      description:
        "Private viewings coordinated around your schedule, with full context on each property's story and potential.",
      id: '3',
    },
    {
      number: '04',
      title: 'Complete',
      description:
        'End-to-end transaction support: legal review, negotiation, and post-close coordination.',
      id: '4',
    },
  ],
  backgroundColor = '#f7f5f0',
  titleColor = '#0a0a0a',
  stepNumberColor = '#b89a5b',
  stepNumberBorderColor = '#b89a5b',
  stepTitleColor = '#0a0a0a',
  stepDescriptionColor = '#a5a19a',
  connectorColor = '#b89a5b',
}: HomePathProps) => {
  return (
    <section className="py-[clamp(80px,10vw,140px)]" style={{ backgroundColor }}>
      <PageContainer>
        <div className="mb-16">
          <h2
            className="font-normal leading-[1.1] m-0 whitespace-pre-line"
            style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              color: titleColor,
            }}
          >
            {title}
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-0">
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-6 left-10 right-10 h-px opacity-40 pointer-events-none"
            style={{ backgroundColor: connectorColor }}
          />

          {steps.map((step) => (
            <div key={step.id || step.number} className="relative pr-0 lg:pr-8">
              <div
                className="relative z-10 w-12 h-12 border flex items-center justify-center mb-7"
                style={{
                  borderColor: stepNumberBorderColor,
                  backgroundColor,
                }}
              >
                <span
                  className="text-base font-normal italic"
                  style={{
                    fontFamily: 'var(--font-cormorant, serif)',
                    color: stepNumberColor,
                  }}
                >
                  {step.number}
                </span>
              </div>

              <h3
                className="text-[22px] font-medium mb-2.5 mt-0"
                style={{
                  fontFamily: 'var(--font-cormorant, serif)',
                  color: stepTitleColor,
                }}
              >
                {step.title}
              </h3>

              <p
                className="text-sm font-light leading-[1.7] max-w-65 m-0"
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
