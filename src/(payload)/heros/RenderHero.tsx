import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/(payload)/heros/HighImpact'
import { LowImpactHero } from '@/(payload)/heros/LowImpact'
import { MediumImpactHero } from '@/(payload)/heros/MediumImpact'
// import BgPattern1 from './BgPattern1'
// import BgPattern2 from './BgPattern2'
// import BgPattern3 from './BgPattern3'

const heroes: Record<string, React.FC<Page['hero']>> = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  // bgPattern1: BgPattern1,
  // bgPattern2: BgPattern2,
  // bgPattern3: BgPattern3,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
