import Image from 'next/image'
import { useTranslations } from 'next-intl'

// ── Types ──────────────────────────────────────────────────────────────────────

interface ServiceDetailItem {
  id: string
  imageUrl: string
  imageAlt: string
  imageLeft: boolean
  bg: string
}

// ── Data ───────────────────────────────────────────────────────────────────────

const serviceDetailsMeta: ServiceDetailItem[] = [
  {
    id: 'acquisition',
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&h=500&fit=crop&auto=format',
    imageAlt: 'Property Acquisition',
    imageLeft: false,
    bg: '#f7f5f0',
  },
  {
    id: 'sales',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&h=500&fit=crop&auto=format',
    imageAlt: 'Property Sales',
    imageLeft: true,
    bg: '#ffffff',
  },
  {
    id: 'development',
    imageUrl:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=500&fit=crop&auto=format',
    imageAlt: 'Development Advisory',
    imageLeft: false,
    bg: '#f7f5f0',
  },
  {
    id: 'private-search',
    imageUrl:
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=700&h=500&fit=crop&auto=format',
    imageAlt: 'Private Property Search',
    imageLeft: true,
    bg: '#ffffff',
  },
]

// ── Single service block ───────────────────────────────────────────────────────

function ServiceBlock({ service }: { service: ServiceDetailItem }) {
  const t = useTranslations(`services-page.details.${service.id}`)
  const tCommon = useTranslations('services-page.details')

  const contentOrder = service.imageLeft ? 'md:order-last' : 'md:order-first'
  const imageOrder = service.imageLeft ? 'md:order-first' : 'md:order-last'

  // Get items array from translations
  const items = [0, 1, 2, 3, 4, 5].map((i) => t(`items.${i}`))

  return (
    <div
      id={service.id}
      className="border-b border-[#e5e0d7] py-[clamp(64px,8vw,100px)]"
      style={{ backgroundColor: service.bg }}
    >
      <div className="max-w-360 mx-auto px-5 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Text content */}
          <div className={contentOrder}>
            <span
              className="text-[48px] font-light text-[#b89a5b] italic block mb-4 leading-none"
              style={{ fontFamily: 'var(--font-cormorant, serif)' }}
            >
              {t('number')}
            </span>
            <h2
              className="font-normal text-[#0a0a0a] leading-[1.1] mb-5 mt-0"
              style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
              }}
            >
              {t('title')}
            </h2>
            <p className="text-[#a5a19a] text-[15px] leading-[1.75] font-light mb-9 max-w-105">
              {t('description')}
            </p>

            {/* What we cover */}
            <div className="border-t border-[#e5e0d7] pt-6">
              <p className="text-[10px] tracking-[0.16em] uppercase text-[#a5a19a] font-medium mb-4">
                {tCommon('what-we-cover')}
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2.5 text-[#242424] text-sm font-light"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-[#b89a5b] shrink-0"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image */}
          <div
            className={`overflow-hidden rounded-sm bg-[#e5e0d7] aspect-4/3 relative ${imageOrder}`}
          >
            <Image
              src={service.imageUrl}
              alt={service.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ServicesDetail() {
  return (
    <>
      {serviceDetailsMeta.map((service) => (
        <ServiceBlock key={service.id} service={service} />
      ))}
    </>
  )
}
