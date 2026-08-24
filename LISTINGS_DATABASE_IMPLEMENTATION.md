# Listings Grid - Database Implementation

## Overview

The listings grid has been updated to be fully database-driven with intelligent fallback to dummy data when no database records exist.

## Key Changes

### 1. Slug-Based Navigation

- **Listing Cards**: Now use `slug` field instead of `id` for navigation
- **Detail Page**: Already configured to use slug parameter
- **URL Structure**: `/active-listings/{slug}` instead of `/active-listings/{id}`

### 2. Dynamic Filter Options

- **Cities**: Extracted from actual property data in database
- **Categories**: Extracted from actual property types in database
- **Fallback**: Uses dummy data filters when no database records exist

### 3. Data Transformation

- Properties from database are transformed to match the component's expected format
- Slug field is added (uses `slug` from database or falls back to `id`)
- Price values are extracted for sorting functionality
- City and property type relationships are properly resolved

### 4. Updated Files

#### `src/components/Active_Listings/listings_grid.tsx`

- Added `slug` field to transformed data
- Dynamic extraction of available cities and categories from listings
- Proper price value extraction for sorting
- Passes dynamic filter options to filter bar

#### `src/components/Active_Listings/listings_filter_bar.tsx`

- Accepts `availableCities` and `availableCategories` as props
- Renders filter buttons dynamically based on available data
- More flexible type definitions (uses `string` instead of strict union types)

#### `src/components/Active_Listings/listing_card.tsx`

- Updated to use `listing.slug` for navigation instead of `listing.id`

#### `src/components/Active_Listings/data.ts`

- Updated `Listing` type to include `slug` field
- Made `city` and `category` more flexible (string instead of strict types)
- Added slug to all dummy data listings

#### `src/app/(frontend)/[locale]/active-listings/[active-listing-slug]/page.tsx`

- Updated fallback logic to search by `slug` instead of `id`
- Added `slug` field to CMS property transformation

## How It Works

### Database Mode

When properties exist in the database:

1. Properties are fetched with depth=1 to include relationships (city, propertyType)
2. Data is transformed to match component format
3. Filters are generated from actual data (unique cities and categories)
4. Navigation uses slug field from database

### Fallback Mode

When no properties exist in database AND `ENABLE_DUMMY_FALLBACK.properties` is `true`:

1. Dummy data is used (12 sample properties)
2. Fixed filter options from dummy data
3. Navigation uses slug field from dummy data

### Configuration

Fallback behavior is controlled in `src/config/fallback.ts`:

```typescript
export const ENABLE_DUMMY_FALLBACK = {
  properties: true, // Set to false to require database data
  portfolios: true,
  posts: true,
}
```

## Benefits

1. **SEO Friendly**: URLs use human-readable slugs instead of numeric IDs
2. **Dynamic Filters**: Filter options automatically adjust based on available data
3. **Graceful Fallback**: Development can continue even without database data
4. **Type Safe**: Proper TypeScript types throughout
5. **Scalable**: Automatically handles new cities and property types from database

## Testing

### With Database Data

1. Add properties in Payload CMS admin
2. Ensure each has a slug, city, and property type
3. Visit `/active-listings` - filters will show actual data
4. Click on a property - URL will use the slug

### With Fallback Data

1. Set `ENABLE_DUMMY_FALLBACK.properties = true`
2. Remove all properties from database
3. Visit `/active-listings` - will show 12 dummy properties
4. Filters will show: Bali, Jakarta, Bandung, Surabaya, Lombok cities
5. Categories will show: Houses, Villas, Apartments, Land

## Next Steps

Consider adding:

- Badge system in database (new field in Properties collection)
- Featured/exclusive property flags
- Search functionality
- Price range filters
- More filter options (bedrooms, bathrooms, etc.)
