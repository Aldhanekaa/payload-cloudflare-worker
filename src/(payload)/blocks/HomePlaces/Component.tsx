import { getCachedCollection } from '@/utilities/getCollection'
import type { City } from '@/payload-types'
import { HomePlacesClient } from './Client'

interface HomePlacesProps {
  title?: string
  propertiesLabel?: string
  exploreLocationLabel?: string
  dataSource?: 'auto' | 'manual'
  cities?: (string | City)[]
  limit?: number
}

export const HomePlaces = async ({
  dataSource = 'auto',
  cities: manualCities,
  limit = 100,
  ...rest
}: HomePlacesProps) => {
  let cities: City[] = []

  if (dataSource === 'auto') {
    // Auto-query all cities
    const result = await getCachedCollection(
      {
        collection: 'cities',
        depth: 1,
        limit,
      },
      'en', // Default locale
    )()
    cities = result.docs as City[]
  } else if (manualCities && manualCities.length > 0) {
    // Use manually selected cities
    cities = manualCities.filter((c): c is City => typeof c === 'object') as City[]
  }

  return <HomePlacesClient cities={cities} {...rest} />
}
