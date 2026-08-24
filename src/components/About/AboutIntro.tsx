import PageContainer from '@/components/PageContainer'

export default function AboutIntro() {
  return (
    <section className="py-[clamp(64px,8vw,100px)] bg-white">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 items-start">
          {/* Left — headline */}
          <h2
            className="font-normal text-[#0a0a0a] leading-[1.1] m-0"
            style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
            }}
          >
            A different kind of property firm.
          </h2>

          {/* Right — body copy */}
          <div>
            <p className="text-[#242424] text-[17px] leading-[1.75] font-light mb-5">
              Andersen Properties was founded in 2013 with a straightforward belief: that the
              property market in Indonesia deserved a firm that prioritised quality over quantity,
              and the client&apos;s interests above its own transaction count.
            </p>
            <p className="text-[#a5a19a] text-[15px] leading-[1.75] font-light m-0">
              We are a small, deliberately sized team working across eight key markets in Indonesia.
              We do not handle every type of property. We focus on the exceptional — homes defined
              by thoughtful architecture, careful construction, and a genuine sense of place.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
