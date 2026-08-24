import PageContainer from '@/components/PageContainer'

const principles = [
  {
    title: 'Rigorous Curation',
    description:
      'We decline the majority of properties presented to us. Only those that meet our criteria for architecture, location, and quality reach our clients.',
  },
  {
    title: 'Genuine Relationships',
    description:
      'We operate through relationships, not transactions. The connections we build with clients, agents, and developers are the foundation of what we do.',
  },
  {
    title: 'Local Depth',
    description:
      "Indonesia is our home market. We have invested years understanding its cities, regulations, and communities — so our clients don't have to start from zero.",
  },
  {
    title: 'Quiet Confidence',
    description:
      'We do not shout. We present clearly, advise honestly, and trust that the quality of our work speaks for itself.',
  },
]

export default function AboutPrinciples() {
  return (
    <section className="py-[clamp(64px,8vw,100px)] bg-[#f7f5f0] border-t border-[#e5e0d7]">
      <PageContainer>
        {/* Header */}
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#b89a5b] font-medium mb-3">
          What We Stand For
        </p>
        <h2
          className="font-normal text-[#0a0a0a] leading-[1.1] mb-14 max-w-100 mt-0"
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
          }}
        >
          Four principles that shape everything.
        </h2>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => {
            const isLast = index === principles.length - 1
            return (
              <div
                key={principle.title}
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
