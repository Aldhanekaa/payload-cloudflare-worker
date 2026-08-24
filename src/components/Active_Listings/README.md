# Active Listings Components

Professional, reusable components for displaying property listings and detail pages.

## Components

### Image Slider (`ImageSlider.tsx`)

- **Purpose**: Interactive image carousel with thumbnails
- **Features**:
  - Previous/Next navigation buttons
  - Thumbnail preview strip with active state
  - Image counter display
  - Optional badge overlay
  - Keyboard accessible
  - Smooth transitions
- **Usage**:
  ```tsx
  <ImageSlider
    images={[
      { url: 'image1.jpg', alt: 'View 1' },
      { url: 'image2.jpg', alt: 'View 2' },
    ]}
    badge="Exclusive"
  />
  ```

### Breadcrumb (`Breadcrumb.tsx`)

- **Purpose**: Navigation breadcrumb trail
- **Features**:
  - Automatic arrow separators
  - Last item unlinked (current page)
  - Hover states on links
- **Usage**:
  ```tsx
  <Breadcrumb
    items={[{ label: 'Active Listings', href: '/active-listings' }, { label: 'Property Name' }]}
  />
  ```

### Property Header (`PropertyHeader.tsx`)

- **Purpose**: Display property title and key metadata
- **Features**:
  - Category and city badge
  - Listing type tag (Buy/Rent/Both)
  - Large display title
  - Location subtitle
- **Usage**:
  ```tsx
  <PropertyHeader
    category="Houses"
    city="Jakarta"
    listingType="Buy or Rent"
    title="Menteng Heritage Home"
    location="Menteng, Jakarta"
  />
  ```

### Property Stats (`PropertyStats.tsx`)

- **Purpose**: Display key property statistics in a grid
- **Features**:
  - Responsive grid layout
  - Consistent stat card styling
  - Border-collapse design
- **Usage**:
  ```tsx
  <PropertyStats bedrooms={5} bathrooms={6} buildArea="600 m²" landArea="800 m²" yearBuilt={1940} />
  ```

### Property Description (`PropertyDescription.tsx`)

- **Purpose**: Display property description text
- **Features**:
  - Main description paragraph
  - Optional additional note
  - Proper typography hierarchy
- **Usage**:
  ```tsx
  <PropertyDescription
    description="A heritage property..."
    note="Unfurnished — staging available"
  />
  ```

### Property Features (`PropertyFeatures.tsx`)

- **Purpose**: Display property features/amenities list
- **Features**:
  - Auto-fill grid layout
  - Bullet point indicators
  - Card-style feature items
- **Usage**:
  ```tsx
  <PropertyFeatures features={['Heritage Listed', 'Central Location', 'Pool']} />
  ```

### Property Sidebar (`PropertySidebar.tsx`)

- **Purpose**: Sticky sidebar with pricing and CTA
- **Features**:
  - Purchase/Rental tab switcher (if both available)
  - Price display
  - Property summary details
  - CTA buttons (Enquire, Schedule Viewing)
  - Sticky positioning
- **Usage**:
  ```tsx
  <PropertySidebar
    salePrice="IDR 32.0 Billion"
    rentPrice="IDR 130 Juta / month"
    location="Menteng, Jakarta"
    category="Houses"
    beds={5}
    baths={6}
    buildArea="600 m²"
    landArea="800 m²"
  />
  ```

### Back to Listings (`BackToListings.tsx`)

- **Purpose**: Navigation link back to listings page
- **Features**:
  - Arrow icon
  - Border separator above
  - Hover state
- **Usage**:
  ```tsx
  <BackToListings />
  ```

## Page Structure

The active listing detail page (`/active-listings/[id]/page.tsx`) follows this layout:

```
├── Breadcrumb
├── Image Slider
└── Two-column Grid
    ├── Left Column
    │   ├── Property Header
    │   ├── Property Stats
    │   ├── Property Description
    │   └── Property Features
    └── Right Column (Sticky)
        └── Property Sidebar
└── Back to Listings
```

## Data Structure

### `data.ts`

Contains the main listing data for the grid/card view:

- Basic property information
- Pricing
- Location
- Beds/baths/area
- Badge status

### `listing-details-data.ts`

Contains extended data for detail pages:

- Multiple images
- Full description
- Features list
- Land area
- Year built
- Additional notes

## Styling

All components use Tailwind CSS utility classes with the following design system:

### Colors

- Primary Gold: `#b89a5b`
- Black: `#0a0a0a`
- Gray text: `#4b4743`, `#a5a19a`
- Border: `#e5e0d7`
- Background: `#f7f5f0`

### Typography

- Display font: `font-display` (Cormorant Garamond)
- Sans font: `font-sans` (Inter)
- Uppercase labels with tracking: `text-[11px] tracking-[0.12em] uppercase`

### Spacing

- Container max-width: `1440px`
- Horizontal padding: `px-5 md:px-20`
- Consistent vertical rhythm with mb-* utilities

## Accessibility

All components follow accessibility best practices:

- Semantic HTML elements
- ARIA labels on icon buttons
- Keyboard navigation support
- Sufficient color contrast
- Alt text on all images

## Responsive Design

Components are fully responsive with mobile-first approach:

- Single column on mobile, two columns on md+ breakpoints
- Horizontal scroll on thumbnails
- Flexible grid for features
- Stack stats on mobile
