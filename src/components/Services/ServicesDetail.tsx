import Image from 'next/image'

// ── Types ──────────────────────────────────────────────────────────────────────

interface ServiceDetailItem {
  id: string
  number: string
  title: string
  description: string
  coverItems: string[]
  imageUrl: string
  imageAlt: string
  /** When true, image appears on the left and content on the right (desktop) */
  imageLeft: boolean
  bg: string
}

// ── Data ───────────────────────────────────────────────────────────────────────

const serviceDetails: ServiceDetailItem[] = [
  {
    id: 'acquisition',
    number: '01',
    title: 'Property Acquisition',
    description:
      'Whether you are purchasing your first home in Indonesia or adding to an existing portfolio, our acquisition service provides end-to-end guidance. We begin with a thorough understanding of your requirements and conclude with the keys in hand.',
    coverItems: [
      'Initial brief and requirements',
      'Market assessment and shortlisting',
      'Private viewings and site visits',
      'Offer strategy and negotiation',
      'Due diligence coordination',
      'Legal completion and handover',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&h=500&fit=crop&auto=format',
    imageAlt: 'Property Acquisition',
    imageLeft: false,
    bg: '#f7f5f0',
  },
  {
    id: 'sales',
    number: '02',
    title: 'Property Sales',
    description:
      'We represent a limited number of exceptional properties for sale at any one time, ensuring each receives the attention and presentation it deserves. Our approach is deliberate, targeted, and discreet.',
    coverItems: [
      'Property assessment and positioning',
      'Architectural photography and editorial presentation',
      'Targeted buyer outreach',
      'Private viewings and open days',
      'Offer management and negotiation',
      'Transaction support through to settlement',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&h=500&fit=crop&auto=format',
    imageAlt: 'Property Sales',
    imageLeft: true,
    bg: '#ffffff',
  },
  {
    id: 'development',
    number: '03',
    title: 'Development Advisory',
    description:
      'We work with landowners, architects, and developers to refine the commercial and design proposition of a project from its earliest stages. Our market intelligence ensures each development is positioned for enduring success.',
    coverItems: [
      'Site assessment and feasibility',
      'Market research and competitor analysis',
      'Product design and unit mix advisory',
      'Pricing strategy and revenue modelling',
      'Sales strategy and launch planning',
      'Ongoing sales management',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=500&fit=crop&auto=format',
    imageAlt: 'Development Advisory',
    imageLeft: false,
    bg: '#f7f5f0',
  },
  {
    id: 'private-search',
    number: '04',
    title: 'Private Property Search',
    description:
      'A completely confidential service for clients seeking a specific type of property. We conduct a structured search across both listed and unlisted opportunities, presenting only those that genuinely meet your criteria.',
    coverItems: [
      'Private briefing and criteria definition',
      'Structured market search',
      'Off-market relationship outreach',
      'Curated shortlist presentation',
      'Coordinated viewings',
      'Acquisition support if required',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=700&h=500&fit=crop&auto=format',
    imageAlt: 'Private Property Search',
    imageLeft: true,
    bg: '#ffffff',
  },
]

// ── Single service block ───────────────────────────────────────────────────────

function ServiceBlock({ service }: { service: ServiceDetailItem }) {
  const contentOrder = service.imageLeft ? 'md:order-last' : 'md:order-first'
  const imageOrder = service.imageLeft ? 'md:order-first' : 'md:order-last'

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
              {service.number}
            </span>
            <h2
              className="font-normal text-[#0a0a0a] leading-[1.1] mb-5 mt-0"
              style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
              }}
            >
              {service.title}
            </h2>
            <p className="text-[#a5a19a] text-[15px] leading-[1.75] font-light mb-9 max-w-105">
              {service.description}
            </p>

            {/* What we cover */}
            <div className="border-t border-[#e5e0d7] pt-6">
              <p className="text-[10px] tracking-[0.16em] uppercase text-[#a5a19a] font-medium mb-4">
                What we cover
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {service.coverItems.map((item) => (
                  <li
                    key={item}
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
      {serviceDetails.map((service) => (
        <ServiceBlock key={service.id} service={service} />
      ))}
    </>
  )
}
