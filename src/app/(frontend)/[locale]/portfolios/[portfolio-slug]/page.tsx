import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
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
import type { Portfolio, Media, City, PortfolioCategory } from '@/payload-types'
import { generateLocalizedMeta } from '@/utilities/generateLocalizedMeta'
import { JsonLd } from '@/components/JsonLd'
import { getServerSideURL } from '@/utilities/getURL'

interface PageProps {
  params: Promise<{
    locale: LocaleCodes
    'portfolio-slug': string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { 'portfolio-slug': slug, locale } = await params

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

  const cmsPortfolio = result.docs[0] as any

  let title = cmsPortfolio?.meta?.title || cmsPortfolio?.name
  let description =
    cmsPortfolio?.meta?.description || cmsPortfolio?.description || cmsPortfolio?.tagline
  let image: number | string | Media | null =
    cmsPortfolio?.meta?.image || cmsPortfolio?.heroImage || null

  if (!title && ENABLE_DUMMY_FALLBACK.portfolios) {
    const dummyPortfolio = PORTFOLIOS.find((p) => p.slug === slug)
    if (dummyPortfolio) {
      title = dummyPortfolio.name
      description = dummyPortfolio.tagline
      image = dummyPortfolio.image.src
    }
  }

  return generateLocalizedMeta({
    title: title ? `${title} — Portfolios` : 'Portfolio',
    description: description || 'Curated development portfolio by Andersen Properties.',
    path: `/portfolios/${slug}`,
    locale,
    image,
  })
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
      depth: 3,
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
    const categoryData =
      typeof cmsPortfolio.category === 'object'
        ? (cmsPortfolio.category as PortfolioCategory)
        : null
    const heroImageData =
      typeof cmsPortfolio.heroImage === 'object' ? (cmsPortfolio.heroImage as Media) : null

    portfolio = {
      id: String(cmsPortfolio.id),
      slug: cmsPortfolio.slug || String(cmsPortfolio.id),
      status: cmsPortfolio.status as any,
      category: categoryData?.name || 'Uncategorized',
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
  const enquiryLink = cmsPortfolio?.enquiryLink
  const waitlistLink = cmsPortfolio?.waitlistLink

  const serverUrl = getServerSideURL()
  const pageUrl = `${serverUrl}/${locale}/portfolios/${slug}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${serverUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolios',
        item: `${serverUrl}/${locale}/portfolios`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: portfolio.name,
        item: pageUrl,
      },
    ],
  }

  return (
    <main className=" pt-30 ">
      <JsonLd data={breadcrumbJsonLd} />
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
                enquiryLink={enquiryLink}
                waitlistLink={waitlistLink}
                brochureLink={cmsPortfolio.brochureLink}
              />
            </div>
          </div>

          <BackToPortfolios />
        </div>
      </div>
    </main>
  )
}
