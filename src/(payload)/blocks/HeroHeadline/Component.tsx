import PageContainer from '@/components/PageContainer'

interface HeroHeadlineProps {
  headline?: string
  subheadline?: string
  backgroundColor?: string
  textColor?: string
}

export const HeroHeadline = ({
  headline = 'Welcome',
  subheadline = '',
  backgroundColor = '#D7F205',
  textColor = '#fff',
}: HeroHeadlineProps) => {
  return (
    <section className="w-full relative py-10" style={{ backgroundColor }}>
      <PageContainer>
        <h1 className="text-3xl lg:text-5xl font-bold" style={{ color: textColor }}>
          {headline}
        </h1>
        {subheadline && (
          <h2 className="text-xl lg:text-3xl mt-4" style={{ color: textColor }}>
            {subheadline}
          </h2>
        )}
      </PageContainer>
    </section>
  )
}
