import RichText from '@/components/RichText'
import PageContainer from '@/components/PageContainer'

interface StepsProps {
  badgeColor?: string
  steps?: {
    content?: any
    id?: string
  }[]
}

export const Steps = ({ steps, badgeColor = '#D7F205' }: StepsProps) => {
  if (!steps || steps.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <style>
        {`
          .step-badge-connector::after {
            background-color: var(--badge-color, #D7F205);
          }
        `}
      </style>
      <PageContainer>
        <div className="grid gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={step.id || index} className="flex gap-4 md:gap-6">
              <div
                className="flex-shrink-0 relative step-badge-connector after:absolute after:left-0 after:right-0 after:top-10 after:w-[3px] after:h-5/6 after:mx-auto after:my-4"
                style={
                  { '--badge-color': badgeColor } as React.CSSProperties & {
                    '--badge-color': string
                  }
                }
              >
                <div
                  className="flex items-center justify-center h-10 w-10 rounded-full font-bold text-lg text-secondary"
                  style={{ backgroundColor: badgeColor }}
                >
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                {step.content && <RichText data={step.content} enableGutter={false} />}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
