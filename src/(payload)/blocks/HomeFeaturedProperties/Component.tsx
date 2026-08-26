import { getCachedCollection } from '@/utilities/getCollection'
import type { Property as PayloadProperty } from '@/payload-types'
import { HomeFeaturedPropertiesClient } from './Client'

interface HomeFeaturedPropertiesProps {
  eyebrow?: string
  title?: string
  viewAllLabel?: string
  viewAllHref?: string
  viewPropertyLabel?: string
  bedLabel?: string
  noPropertiesMessage?: string
  filters?: {
    allLabel?: string
    housesLabel?: string
    villasLabel?: string
    apartmentsLabel?: string
    landLabel?: string
  }
  dataSource?: 'auto' | 'manual'
  properties?: (string | PayloadProperty)[]
  limit?: number
}

export const HomeFeaturedProperties = async ({
  dataSource = 'auto',
  properties: manualProperties,
  limit = 5,
  ...rest
}: HomeFeaturedPropertiesProps) => {
  let properties: PayloadProperty[] = []

  if (dataSource === 'auto') {
    // Auto-query the latest active properties
    const result = await getCachedCollection(
      {
        collection: 'properties',
        depth: 1,
        limit,
        where: {
          status: {
            equals: 'active',
          },
        },
        sort: '-createdAt',
      },
      'en', // Default locale, adjust as needed
    )()
    properties = result.docs as PayloadProperty[]
  } else if (manualProperties && manualProperties.length > 0) {
    // Use manually selected properties
    properties = manualProperties.filter(
      (p): p is PayloadProperty => typeof p === 'object',
    ) as PayloadProperty[]
  }

  return <HomeFeaturedPropertiesClient properties={properties} {...rest} />
}
