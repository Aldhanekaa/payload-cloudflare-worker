# Quick Start Guide

## 🚀 Getting Started

The portfolios and active listings pages now fetch data from your CMS. Here's how to get everything working:

## Step 1: Configure Fallback (Already Done)

The fallback is currently **ENABLED** to allow you to test gradually:

```typescript
// src/config/fallback.ts
export const ENABLE_DUMMY_FALLBACK = {
  portfolios: true, // ✅ Enabled
  properties: true, // ✅ Enabled
}
```

This means:

- ✅ Pages work immediately with dummy data
- ✅ CMS data will be used when available
- ✅ You can migrate data gradually

## Step 2: Generate Updated Types

Run this command to update TypeScript types based on your updated collection schemas:

```bash
npm run payload generate:types
```

This updates `src/payload-types.ts` to match the Properties collection changes.

## Step 3: Add Data to CMS

### Required Collections

1. **Cities** (Already exists)
   - Add cities like "Bali", "Jakarta", "Bandung", "Lombok"

2. **Property Types** (Create entries)
   - Villa
   - House
   - Apartment
   - Land

3. **Property Categories** (Optional - Create entries)
   - Luxury
   - Beachfront
   - Investment
   - Budget

### Add Portfolios

Visit `/admin/collections/portfolios` and create portfolios with:

- Name (e.g., "Andersen Residences No. 01")
- Slug (auto-generated)
- Tagline
- Status (active/sold-out/coming-soon)
- Category text (e.g., "Villa Collection")
- City (relationship)
- Location text
- Units, Completion, Starting Price
- Hero Image
- Details tab: Architect, Description, Detail Images, Highlights

### Add Properties

Visit `/admin/collections/properties` and create properties with:

- Title (e.g., "The Aruna Residence")
- Slug (auto-generated)
- Listing Type (sale/rent/both)
- Property Type (relationship - Villa/House/etc.)
- Category (relationship - optional)
- Status (active/inactive)
- City (relationship)
- Location text
- Bedrooms, Bathrooms, Build Area (m²), Land Area (m²)
- Purchase Price and/or Rental Price
- Images (array - first image is the hero)
- Details tab: Description, Year Built, Features

## Step 4: Test the Pages

### With Dummy Data (Current State)

```
Visit: http://localhost:3000/portfolios
Visit: http://localhost:3000/active-listings
```

Should show dummy data ✅

### With CMS Data (After adding entries)

```
Visit: http://localhost:3000/portfolios
Visit: http://localhost:3000/active-listings
```

Should show your CMS data ✅

## Step 5: Disable Fallback (Production)

Once all data is migrated:

```typescript
// src/config/fallback.ts
export const ENABLE_DUMMY_FALLBACK = {
  portfolios: false, // ❌ Disabled
  properties: false, // ❌ Disabled
}
```

Now:

- ✅ Only CMS data is shown
- ✅ Missing data returns 404
- ✅ Production ready

## Common Issues & Solutions

### Issue: "No data showing"

**Solution**: Check fallback is enabled and dummy data exists

### Issue: "TypeScript errors"

**Solution**: Run `npm run payload generate:types`

### Issue: "Images not showing"

**Solution**:

- Ensure images are uploaded to media collection
- Check relationship depth is set to 1-2
- Verify image URLs in CMS admin

### Issue: "City names not showing"

**Solution**:

- Add cities to cities collection
- Set city relationship on portfolios/properties
- Check relationship depth

### Issue: "Filters not working"

**Solution**:

- Ensure status/category values match exactly
- City names are case-sensitive
- Check data is being fetched from CMS

## File Locations

```
Configuration:
└─ src/config/fallback.ts              ← Toggle fallback here

Pages (Server Components):
├─ src/app/(frontend)/[locale]/
│  ├─ portfolios/
│  │  ├─ page.tsx                     ← List page
│  │  └─ [portfolio-slug]/page.tsx    ← Detail page
│  └─ active-listings/
│     ├─ page.tsx                     ← List page
│     └─ [active-listing-slug]/page.tsx ← Detail page

Components (Client Components):
├─ src/components/Portfolios/
│  ├─ PortfoliosHero.tsx
│  └─ PortfoliosGrid.tsx
└─ src/components/Active_Listings/
   └─ listings_grid.tsx

Collections:
├─ src/(payload)/collections/
│  ├─ Portfolios/index.ts
│  ├─ Properties/index.ts
│  └─ Cities/index.ts

Documentation:
├─ QUICK_START.md          ← This file
├─ TASK_COMPLETED.md       ← Full summary
├─ MIGRATION_GUIDE.md      ← Detailed guide
└─ IMPLEMENTATION_SUMMARY.md ← Technical details
```

## Quick Commands

```bash
# Generate types after schema changes
npm run payload generate:types

# Start dev server
npm run dev

# Build for production
npm run build

# Access CMS admin
# Visit: http://localhost:3000/admin
```

## Summary

✅ **Currently**: Fallback enabled, both CMS and dummy data work
✅ **Goal**: Add CMS data, test, then disable fallback
✅ **Production**: Fallback disabled, CMS-only mode

Need help? Check the detailed guides:

- `MIGRATION_GUIDE.md` for step-by-step migration
- `IMPLEMENTATION_SUMMARY.md` for technical details
- `TASK_COMPLETED.md` for complete summary
