import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-d1-sqlite'

const PROPERTY_TYPES = [
  'House',
  'Villa',
  'Apartment',
  'Land',
  'Penthouse',
  'Townhouse',
  'Commercial',
]

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const name of PROPERTY_TYPES) {
    // Skip if already exists to make this idempotent
    const existing = await payload.find({
      collection: 'property-types',
      where: { name: { equals: name } },
      limit: 1,
      req,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'property-types',
        data: { name },
        req,
      })
    }
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  for (const name of PROPERTY_TYPES) {
    const existing = await payload.find({
      collection: 'property-types',
      where: { name: { equals: name } },
      limit: 1,
      req,
    })

    if (existing.totalDocs > 0) {
      await payload.delete({
        collection: 'property-types',
        id: existing.docs[0].id,
        req,
      })
    }
  }
}
