import Image from 'next/image'
import Link from 'next/link'
import PageContainer from '@/components/PageContainer'
import TestimonialImg from '@/assets/ANDERSEN_PROPERTIES_DEFAULT_IMG.avif'

export default function HomeClientTestimonial() {
  return (
    <section className="bg-white py-[clamp(80px,10vw,140px)]">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left — image, 4:5 aspect ratio */}
          <div className="overflow-hidden rounded-sm bg-[#e5e0d7] aspect-[4/5]">
            <Image
              src={TestimonialImg}
              alt="Elegant residential interior"
              width={800}
              height={1000}
              className="w-full h-full object-cover block"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right — quote */}
          <div>
            {/* Gold rule */}
            <div className="w-10 h-[2px] bg-[#b89a5b] mb-10" />

            {/* Quote */}
            <blockquote
              className="not-italic m-0 mb-9 text-[#0a0a0a] font-normal leading-[1.4] text-[clamp(22px,3vw,34px)]"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontStyle: 'italic' }}
            >
              &ldquo;Andersen understood that we were not simply looking for a house. We were
              looking for a place that felt right for the way our family lives.&rdquo;
            </blockquote>

            {/* Attribution */}
            <cite className="not-italic">
              <span className="block text-[10px] tracking-[0.16em] uppercase text-[#a5a19a] font-medium mb-6">
                Private Client, Jakarta
              </span>
            </cite>

            {/* CTA */}
            <Link
              href="/client-stories"
              className="inline-flex items-center gap-2 text-[#b89a5b] text-[11px] tracking-[0.1em] uppercase font-medium no-underline transition-[gap] duration-200 hover:gap-3"
            >
              Read Client Stories
              <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true">
                <path
                  d="M7.5 1L11 4.5M11 4.5L7.5 8M11 4.5H1"
                  stroke="#B89A5B"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
