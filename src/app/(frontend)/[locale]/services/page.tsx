import type { Metadata } from 'next'
import ServicesHero from '@/components/Services/ServicesHero'
import ServicesDetail from '@/components/Services/ServicesDetail'
import ServicesPath from '@/components/Services/ServicesPath'
import ServicesExpertise from '@/components/Services/ServicesExpertise'
import ServicesFAQs from '@/components/Services/ServicesFAQs'
import ServicesCTA from '@/components/Services/ServicesCTA'

export const metadata: Metadata = {
  title: 'Services — Andersen Properties',
  description:
    'Four distinct services covering every aspect of property — acquisition, sales, development advisory, and private property search.',
}

export default function ServicesPage() {
  return (
    <main className="  bg-[#f7f5f0]">
      <ServicesHero />
      <ServicesDetail />
      <ServicesPath />
      <ServicesExpertise />
      <ServicesFAQs />
      <ServicesCTA />
    </main>
  )
}
