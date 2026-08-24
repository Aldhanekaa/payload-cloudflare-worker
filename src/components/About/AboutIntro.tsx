import { useTranslations } from 'next-intl'
import PageContainer from '@/components/PageContainer'

export default function AboutIntro() {
  const t = useTranslations('about-page.intro')

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
            {t('headline')}
          </h2>

          {/* Right — body copy */}
          <div>
            <p className="text-[#242424] text-[17px] leading-[1.75] font-light mb-5">
              {t('paragraph1')}
            </p>
            <p className="text-[#a5a19a] text-[15px] leading-[1.75] font-light m-0">
              {t('paragraph2')}
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
