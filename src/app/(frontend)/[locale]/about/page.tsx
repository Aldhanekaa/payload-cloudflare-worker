import type { Metadata } from 'next'
import AboutHero from '@/components/About/AboutHero'
import AboutIntro from '@/components/About/AboutIntro'
import AboutPrinciples from '@/components/About/AboutPrinciples'
import AboutTeam from '@/components/About/AboutTeam'
import HomeConsiderationSteps from '@/components/Home/home_consideration_steps'
import ServicesCTA from '@/components/Services/ServicesCTA'

export const metadata: Metadata = {
  title: 'About — Andersen Properties',
  description:
    'Built on considered advice and earned trust. Learn about the people and principles behind Andersen Properties.',
}

export default function AboutPage() {
  return (
    <main className="  bg-[#f7f5f0]">
      <AboutHero />
      <AboutIntro />
      <AboutPrinciples />
      <AboutTeam />
      <HomeConsiderationSteps />
      <ServicesCTA />
    </main>
  )
}
