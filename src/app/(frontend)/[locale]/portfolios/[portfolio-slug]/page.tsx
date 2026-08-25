import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/Active_Listings/Breadcrumb'
import { PortfolioImageSlider } from '@/components/Portfolios/PortfolioImageSlider'
import { PortfolioHeader } from '@/components/Portfolios/PortfolioHeader'
import { PortfolioInfoGrid } from '@/components/Portfolios/PortfolioInfoGrid'
import { ProjectHighlights } from '@/components/Portfolios/ProjectHighlights'
import { PortfolioSidebar } from '@/components/Portfolios/PortfolioSidebar'
import { BackToPortfolios } from '@/components/Portfolios/BackToPortfolios'
import { PORTFOLIOS } from '@/components/Portfolios/portfolios.data'
import { PORTFOLIO_DETAILS } from '@/components/Portfolios/portfolio-details-data'
import { getCachedCollection } from '@/utilities/getCollection'
import { ENABLE_DUMMY_FALLBACK } from '@/config/fallback'
import type { LocaleCodes } from '@/i18n/localization'
import type { Portfolio, Media, City } from '@/payload-types'

interface PageProps {
  params: Promise<{
    locale: LocaleCodes
    'portfolio-slug': string
  }>
}

// Helper to format status for display
function formatStatus(status: string): string {
  switch (status) {
    case 'active':
      return 'Active - Available'
    case 'sold-out':
      return 'Sold Out'
    case 'coming-soon':
      return 'Coming Soon'
    default:
      return status
  }
}

export default async function PortfolioPage({ params }: PageProps) {
  const { 'portfolio-slug': slug, locale } = await params

  // Try to fetch from CMS
  const result = await getCachedCollection(
    {
      collection: 'portfolios',
      depth: 1,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    },
    locale,
  )()

  const cmsPortfolio = result.docs[0] as Portfolio | undefined

  // Use CMS data or fallback to dummy data
  let portfolio: (typeof PORTFOLIOS)[0] | null = null
  let details: (typeof PORTFOLIO_DETAILS)[string] | null = null

  if (cmsPortfolio) {
    // Transform CMS data
    const cityData = typeof cmsPortfolio.city === 'object' ? cmsPortfolio.city : null
    const heroImageData =
      typeof cmsPortfolio.heroImage === 'object' ? (cmsPortfolio.heroImage as Media) : null

    portfolio = {
      id: String(cmsPortfolio.id),
      slug: cmsPortfolio.slug || String(cmsPortfolio.id),
      status: cmsPortfolio.status as any,
      category: cmsPortfolio.category || 'Uncategorized',
      name: cmsPortfolio.name,
      location: cmsPortfolio.location || '',
      city: cityData?.name || 'Unknown',
      tagline: cmsPortfolio.tagline,
      units: cmsPortfolio.units,
      completion: cmsPortfolio.completion,
      from: cmsPortfolio.from,
      image: {
        src: heroImageData?.url || '',
        alt: cmsPortfolio.imageAlt || cmsPortfolio.name,
      },
    }

    // Transform detail images
    const detailImages =
      cmsPortfolio.detailImages?.map((img) => {
        const imageData = typeof img.image === 'object' ? (img.image as Media) : null
        return {
          url: imageData?.url || '',
          alt: img.alt || cmsPortfolio.name,
        }
      }) || []

    // Transform highlights
    const highlights = cmsPortfolio.highlights?.map((h) => h.highlight) || []

    details = {
      images: detailImages,
      architect: cmsPortfolio.architect || 'TBD',
      description: cmsPortfolio.description || 'Project details coming soon.',
      highlights: highlights.length > 0 ? highlights : ['More details coming soon'],
    }
  } else if (ENABLE_DUMMY_FALLBACK.portfolios) {
    // Fallback to dummy data
    portfolio = PORTFOLIOS.find((p) => p.slug === slug) || null
    if (portfolio) {
      details = PORTFOLIO_DETAILS[portfolio.id] || {
        images: [{ url: portfolio.image.src, alt: portfolio.image.alt }],
        architect: 'TBD',
        description: 'Project details coming soon.',
        highlights: ['More details coming soon'],
      }
    }
  }

  if (!portfolio || !details) {
    notFound()
  }

  const statusDisplay = formatStatus(portfolio.status)

  return (
    <main className=" ">
      <div className="bg-[#f7f5f0] min-h-screen">
        {/* Breadcrumb */}
        <div className="px-5 md:px-20 max-w-360 mx-auto pt-8 pb-6">
          <Breadcrumb
            items={[{ label: 'Portfolios', href: '/portfolios' }, { label: portfolio.name }]}
          />
        </div>

        {/* Image Slider */}
        <PortfolioImageSlider images={details.images} status={statusDisplay} />

        {/* Main Content */}
        <div className="px-5 md:px-20 max-w-360 mx-auto pt-16 pb-25">
          <div className="grid grid-cols-1! md:grid-cols-[1fr_360px]! gap-16">
            {/* Left Column - Project Details */}
            <div>
              <PortfolioHeader
                category={portfolio.category}
                city={portfolio.city}
                title={portfolio.name}
                tagline={portfolio.tagline}
              />

              <PortfolioInfoGrid
                location={portfolio.location}
                type={portfolio.category}
                units={portfolio.units}
                completion={portfolio.completion}
                architect={details.architect}
              />

              <div className="mb-14">
                <h2 className="font-display text-[22px] font-medium text-[#0a0a0a] mb-4">
                  About this project
                </h2>
                <p className="font-sans text-[15px] leading-[1.85] text-[#4b4743]">
                  {details.description}
                </p>
              </div>

              <ProjectHighlights highlights={details.highlights} />
            </div>

            {/* Right Column - Sidebar */}
            <div>
              <PortfolioSidebar
                startingPrice={portfolio.from}
                status={statusDisplay}
                projectType={portfolio.category}
                location={portfolio.location}
                totalUnits={portfolio.units}
                completion={portfolio.completion}
              />
            </div>
          </div>

          <BackToPortfolios />
        </div>
      </div>
    </main>
  )
}
