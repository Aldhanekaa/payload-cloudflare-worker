'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import PageContainer from '@/components/PageContainer'

export default function ServicesFAQs() {
  const t = useTranslations('home-page.faqs')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: t('questions.select-listings.q'),
      answer: t('questions.select-listings.a'),
    },
    {
      question: t('questions.off-market.q'),
      answer: t('questions.off-market.a'),
    },
    {
      question: t('questions.locations.q'),
      answer: t('questions.locations.a'),
    },
    {
      question: t('questions.international.q'),
      answer: t('questions.international.a'),
    },
    {
      question: t('questions.support.q'),
      answer: t('questions.support.a'),
    },
  ]

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
              {t('title')}
            </h2>
            <p className="text-[#888] text-sm font-light leading-relaxed m-0">{t('subtitle')}</p>
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
