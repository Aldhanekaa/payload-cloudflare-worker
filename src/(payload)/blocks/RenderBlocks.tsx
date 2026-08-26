import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/(payload)/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/(payload)/blocks/CallToAction/Component'
import { ContentBlock } from '@/(payload)/blocks/Content/Component'
import { MediaBlock } from '@/(payload)/blocks/MediaBlock/Component'
import { Feature1 } from '@/(payload)/blocks/Features/Feature1/Component'
import { Feature2 } from '@/(payload)/blocks/Features/Feature2/Component'
import { HeroHeadline } from '@/(payload)/blocks/HeroHeadline/Component'
import { Steps } from '@/(payload)/blocks/Steps/Component'
import { FormBlock } from '@/(payload)/blocks/Form'
// import { HomeHero } from '@/(payload)/blocks/HomeHero'
// import { HomeAbout } from '@/(payload)/blocks/HomeAbout'
// import { HomeSignatureDevelopment } from '@/(payload)/blocks/HomeSignatureDevelopment'
// import { HomeConsiderationSteps } from '@/(payload)/blocks/HomeConsiderationSteps'
// import { HomeClientTestimonial } from '@/(payload)/blocks/HomeClientTestimonial'
// import { HomeExpertise } from '@/(payload)/blocks/Expertise'
// import { Path } from '@/(payload)/blocks/Path'
// import { HomeFAQs } from '@/(payload)/blocks/FAQs'
// import { AndersenCTA } from '@/(payload)/blocks/CTA'
// import { HomeFeaturedProperties } from '@/(payload)/blocks/HomeFeaturedProperties'
// import { HomePlaces } from '@/(payload)/blocks/HomePlaces'
// import { HomeJournalSection } from '@/(payload)/blocks/HomeJournalSection'

const blockComponents: Record<string, React.FC<any>> = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  feature1: Feature1,
  feature2: Feature2,
  heroHeadline: HeroHeadline,
  steps: Steps,
  formBlock: FormBlock,
  // homeHero: HomeHero,
  // homeAbout: HomeAbout,
  // homeFeaturedProperties: HomeFeaturedProperties,
  // homeSignatureDevelopment: HomeSignatureDevelopment,
  // homeConsiderationSteps: HomeConsiderationSteps,
  // homePlaces: HomePlaces,
  // homeClientTestimonial: HomeClientTestimonial,
  // expertise: HomeExpertise,
  // path: Path,
  // faqs: HomeFAQs,
  // andersen_cta: AndersenCTA,

  // homeJournalSection: HomeJournalSection,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index} data-better-editor-id={block.id}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
