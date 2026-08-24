'use client'

import { useState } from 'react'
import PageContainer from '@/components/PageContainer'

const faqs = [
  {
    question: 'How does Andersen Properties select its listings?',
    answer:
      'Every property we represent is personally evaluated against a set of criteria covering architecture, build quality, location fundamentals, and long-term value. We only take on listings we would confidently recommend to our own network.',
  },
  {
    question: 'Can you help with an off-market property search?',
    answer:
      'Yes. A significant portion of the properties we facilitate never appear on public listings. If you have specific requirements, our advisors can conduct a discreet search through our private network.',
  },
  {
    question: 'Which locations do you currently serve?',
    answer:
      'We operate across eight key Indonesian markets, including Bali, Jakarta, Lombok, and Labuan Bajo, with a focus on areas experiencing sustained demand from both local and international buyers.',
  },
  {
    question: 'Do you assist international buyers?',
    answer:
      'Absolutely. We regularly work with buyers based outside Indonesia and can guide you through foreign ownership structures, nominee arrangements, and the legal framework applicable to your situation.',
  },
  {
    question: 'What support is provided during the transaction?',
    answer:
      'From the initial search through to handover, your dedicated advisor coordinates due diligence, legal review, notarial services, and any post-purchase requirements — so you have a single point of contact throughout.',
  },
]

export default function ServicesFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-[#f5f2eb] py-20 md:py-28">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          {/* Left — title + subtitle */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-light leading-[1.1] tracking-tight text-[#1a1a1a] m-0"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Frequently asked.
            </h2>
            <p className="text-[#888] text-sm font-light leading-relaxed m-0">
              Not finding an answer? Reach us directly for a private conversation.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="flex flex-col divide-y divide-[#d6d0c4] border-t border-[#d6d0c4]">
            {faqs.map((faq, index) => (
              <div key={index} className="py-5">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 text-left group"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-[#1a1a1a] text-sm font-light leading-snug group-hover:text-[#a8894a] transition-colors duration-200">
                    {faq.question}
                  </span>
                  <span
                    className="text-[#888] text-lg leading-none shrink-0 transition-transform duration-300"
                    style={{
                      transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: openIndex === index ? '400px' : '0px',
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <p className="text-[#555] text-sm font-light leading-relaxed pt-4 m-0">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
