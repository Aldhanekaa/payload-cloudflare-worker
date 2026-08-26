'use client'

import { useState } from 'react'
import PageContainer from '@/components/PageContainer'

interface FAQ {
  question: string
  answer: string
  id?: string
}

interface HomeFAQsProps {
  title?: string
  subtitle?: string
  faqs?: FAQ[]
  backgroundColor?: string
  titleColor?: string
  subtitleColor?: string
  questionColor?: string
  questionHoverColor?: string
  answerColor?: string
  dividerColor?: string
  toggleIconColor?: string
}

export const HomeFAQs = ({
  title = 'Frequently Asked\nQuestions',
  subtitle = 'Answers to common questions about working with Andersen Properties.',
  faqs = [
    {
      question: 'How do you select the listings you represent?',
      answer:
        'We apply rigorous criteria: architectural merit, location quality, build standards, and long-term value. Only properties that meet our standards are accepted into our portfolio.',
      id: '1',
    },
    {
      question: 'Do you offer access to off-market properties?',
      answer:
        'Yes. Through our network of architects, developers, and private sellers, we regularly source properties not publicly listed.',
      id: '2',
    },
    {
      question: 'Which locations do you cover?',
      answer:
        'Our primary markets are Bali, Jakarta, Bandung, Surabaya, and Lombok — with selective representation in other Indonesian cities.',
      id: '3',
    },
    {
      question: 'Do you work with international buyers?',
      answer:
        'Absolutely. We assist international clients with local regulations, legal structures, financing options, and on-ground logistics.',
      id: '4',
    },
    {
      question: 'What post-purchase support do you provide?',
      answer:
        'We coordinate property handover, recommend trusted service providers (management, design, contractors), and remain available for ongoing consultation.',
      id: '5',
    },
  ],
  backgroundColor = '#f5f2eb',
  titleColor = '#1a1a1a',
  subtitleColor = '#888',
  questionColor = '#1a1a1a',
  questionHoverColor = '#a8894a',
  answerColor = '#555',
  dividerColor = '#d6d0c4',
  toggleIconColor = '#888',
}: HomeFAQsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor }}>
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          {/* Left — title + subtitle */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-light leading-[1.1] tracking-tight m-0 whitespace-pre-line"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: titleColor }}
            >
              {title}
            </h2>
            <p className="text-sm font-light leading-relaxed m-0" style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          </div>

          {/* Right — accordion */}
          <div className="flex flex-col divide-y border-t" style={{ borderColor: dividerColor }}>
            {faqs.map((faq, index) => (
              <div key={faq.id || index} className="py-5" style={{ borderColor: dividerColor }}>
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 text-left group"
                  aria-expanded={openIndex === index}
                >
                  <span
                    className="text-sm font-light leading-snug transition-colors duration-200"
                    style={{
                      color: openIndex === index ? questionHoverColor : questionColor,
                    }}
                    onMouseEnter={(e) => {
                      if (openIndex !== index) e.currentTarget.style.color = questionHoverColor
                    }}
                    onMouseLeave={(e) => {
                      if (openIndex !== index) e.currentTarget.style.color = questionColor
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="text-lg leading-none shrink-0 transition-transform duration-300"
                    style={{
                      transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                      color: toggleIconColor,
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
                  <p
                    className="text-sm font-light leading-relaxed pt-4 m-0"
                    style={{ color: answerColor }}
                  >
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
