import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import type { StaticImageData } from 'next/image'
import PageContainer from '@/components/PageContainer'

interface Feature1Props {
  title?: string
  description?: string
  secondaryColor: string
  media?: MediaType | string
  staticImage?: StaticImageData
  imgClassName?: string
  buttonPrimary?: {
    label: string
    href: string
  }
  buttonSecondary?: {
    label: string
    href: string
  }
}

export const Feature1 = ({
  title = 'Blocks built with Shadcn & Tailwind',
  description = 'Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
  media,
  staticImage,
  imgClassName,
  buttonPrimary = {
    label: 'Get Started',
    href: 'https://shadcnblocks.com',
  },
  buttonSecondary = {
    label: 'Learn More',
    href: 'https://shadcnblocks.com',
  },
  secondaryColor,
}: Feature1Props) => {
  return (
    <section className="py-32">
      <PageContainer>
        <div className="grid items-center gap-8 md:gap-16 lg:grid-cols-2">
          {(media || staticImage) && (
            <Media
              imgClassName={imgClassName || 'max-h-96 w-full rounded-md object-cover'}
              resource={media}
              src={staticImage}
            />
          )}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1
              className="my-6 mt-0 text-4xl font-semibold text-balance lg:text-5xl"
              style={secondaryColor ? { color: secondaryColor } : undefined}
            >
              {title}
            </h1>
            <p
              className="mb-8 max-w-xl text-muted-foreground lg:text-lg"
              style={secondaryColor ? { color: secondaryColor } : undefined}
            >
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild>
                <a href={buttonPrimary.href} target="_blank">
                  {buttonPrimary.label}
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                style={
                  secondaryColor
                    ? { borderColor: secondaryColor, color: secondaryColor }
                    : undefined
                }
              >
                <a href={buttonSecondary.href} target="_blank">
                  {buttonSecondary.label}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
