import PageContainer from '@/components/PageContainer'

const steps = [
  {
    number: '01',
    title: 'Understand',
    description: 'We begin with your goals, lifestyle, location, and investment priorities.',
  },
  {
    number: '02',
    title: 'Curate',
    description: 'We prepare a focused selection of suitable opportunities.',
  },
  {
    number: '03',
    title: 'Experience',
    description: 'We arrange private viewings and provide clear property insight.',
  },
  {
    number: '04',
    title: 'Complete',
    description: 'We support negotiation, due diligence, and a smooth transaction.',
  },
]

export default function ServicesPath() {
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
            A clear path to the right property.
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
