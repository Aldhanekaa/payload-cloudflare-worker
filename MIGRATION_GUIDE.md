# CMS Migration Guide

This guide explains the recent changes to fetch data from the CMS (Payload) collections instead of hardcoded dummy data.

## What Changed

### 1. Portfolios Page (`/portfolios`)

- **Before**: Used hardcoded data from `portfolios.data.ts`
- **After**: Fetches from `portfolios` collection in CMS using `getCachedCollection`
- **Fallback**: If no CMS data exists and fallback is enabled, uses dummy data

### 2. Active Listings Page (`/active-listings`)

- **Before**: Used hardcoded data from `data.ts`
- **After**: Fetches from `properties` collection in CMS using `getCachedCollection`
- **Fallback**: If no CMS data exists and fallback is enabled, uses dummy data

### 3. Dynamic Portfolio Page (`/portfolios/[portfolio-slug]`)

- **Before**: Found portfolio by slug from hardcoded data
- **After**: Queries CMS by slug, falls back to dummy data if not found and fallback enabled

### 4. Dynamic Active Listing Page (`/active-listings/[active-listing-slug]`)

- **Before**: Found property by ID from hardcoded data
- **After**: Queries CMS by slug, falls back to dummy data if not found and fallback enabled

## Fallback Configuration

The fallback feature is controlled by `/src/config/fallback.ts`:

\`\`\`typescript
export const ENABLE_DUMMY_FALLBACK = {
portfolios: true, // Enable fallback for portfolios
properties: true, // Enable fallback for active listings (properties)
} as const
\`\`\`

### How to Disable Fallback

Once you've migrated all data to the CMS, disable the fallback:

\`\`\`typescript
export const ENABLE_DUMMY_FALLBACK = {
portfolios: false, // Disable - show 404 if not in CMS
properties: false, // Disable - show 404 if not in CMS
} as const
\`\`\`

**Important**: When fallback is disabled:

- Pages will only show CMS data
- If no data exists in CMS, the page will return 404
- This is the recommended setting for production

## Data Transformation

The code automatically transforms CMS data to match the component's expected format:

### Portfolios

- `Portfolio` (Payload type) → `Portfolio` (component type)
- Handles relationship fields (city, heroImage)
- Maps status values correctly
- Transforms detail images and highlights

### Properties

- `Property` (Payload type) → `Listing` (component type)
- Maps category values: `houses` → `Houses`, `villas` → `Villas`, etc.
- Capitalizes badge values: `exclusive` → `Exclusive`
- Handles relationship fields (city, heroImage)
- Transforms detail images and features

## CMS Collections Required

### Portfolios Collection

Required fields:

- `name` - Portfolio name
- `slug` - URL-friendly slug (auto-generated from name)
- `tagline` - Short tagline
- `status` - active | sold-out | coming-soon
- `category` - Category text (e.g., "Villa Collection")
- `city` - Relationship to cities collection
- `location` - Specific location text
- `units` - Number of units
- `completion` - Completion date text (e.g., "Q3 2026")
- `from` - Starting price text (e.g., "IDR 35 Billion")
- `heroImage` - Main image
- `imageAlt` - Alt text for hero image
- `architect` - Architect name
- `description` - Full description
- `detailImages` - Array of images for detail page
- `highlights` - Array of highlight strings

### Properties Collection

Required fields:

- `name` - Property name
- `slug` - URL-friendly slug (auto-generated from name)
- `listingType` - buy | rent | both
- `category` - houses | villas | apartments | land
- `badge` - exclusive | new | price-reduced (optional)
- `city` - Relationship to cities collection
- `location` - Specific location text
- `beds` - Number of bedrooms
- `baths` - Number of bathrooms
- `area` - Build area text (e.g., "620 m²")
- `salePrice` - Sale price display text (optional)
- `salePriceValue` - Numeric value for sorting (optional)
- `rentPrice` - Rent price display text (optional)
- `rentPriceValue` - Numeric value for sorting (optional)
- `heroImage` - Main image
- `imageAlt` - Alt text for hero image
- `landArea` - Land area text
- `yearBuilt` - Year built
- `description` - Full description
- `note` - Additional note (optional)
- `detailImages` - Array of images for detail page
- `features` - Array of feature strings

### Cities Collection

Required fields:

- `name` - City name (e.g., "Bali", "Jakarta")

## Testing the Integration

### 1. With Empty CMS (Fallback Enabled)

- Visit `/portfolios` - Should show dummy data
- Visit `/active-listings` - Should show dummy data
- All filtering and sorting should work

### 2. With CMS Data (Fallback Enabled)

- Add some portfolios/properties in CMS admin
- Visit pages - Should show CMS data
- If CMS is empty, falls back to dummy data

### 3. Production Mode (Fallback Disabled)

- Set both fallback flags to `false`
- Visit pages without CMS data - Should show 404
- Visit pages with CMS data - Should show CMS data

## Caching Behavior

- **Development**: Cache is disabled for immediate feedback
- **Production**: Cache is enabled with 60-second revalidation
- **Cache tags**: `collection_portfolios_[locale]`, `collection_properties_[locale]`

You can manually revalidate cache by using Payload's revalidation hooks or by restarting the application.

## Migration Checklist

- [ ] Create all required collections in Payload CMS
- [ ] Add cities to the cities collection
- [ ] Migrate portfolio data from `portfolios.data.ts` to CMS
- [ ] Migrate property data from `data.ts` to CMS
- [ ] Migrate detail data from `portfolio-details-data.ts` and `listing-details-data.ts`
- [ ] Test all pages with CMS data
- [ ] Verify filtering and sorting works correctly
- [ ] Disable fallback in `src/config/fallback.ts`
- [ ] Test 404 behavior with fallback disabled
- [ ] Deploy to production

## Troubleshooting

### Images Not Showing

- Verify `heroImage` relationship is populated correctly
- Check that media collection has valid URLs
- Ensure `depth: 1` is set in getCachedCollection calls

### City Names Not Appearing

- Verify cities collection has entries
- Check that portfolio/property has city relationship set
- Ensure `depth: 1` is set to populate relationships

### Filtering Not Working

- Check that status/category values in CMS match expected values
- Verify city names match exactly (case-sensitive)

### Cache Not Updating

- In development, cache is disabled automatically
- In production, wait 60 seconds or restart the app
- Use revalidation tags to clear specific caches
