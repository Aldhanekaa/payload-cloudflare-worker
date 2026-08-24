# Portfolio Components

Professional, reusable components for displaying portfolio projects and detail pages.

## Components

### Portfolio Image Slider (`PortfolioImageSlider.tsx`)

- **Purpose**: Interactive image carousel with status badge for portfolio projects
- **Features**:
  - Previous/Next navigation buttons
  - Thumbnail preview strip with active state highlighting
  - Image counter display
  - Status badge overlay (Active, Sold Out, Coming Soon)
  - Larger thumbnails (120x80px) than listings
  - Smooth transitions
- **Usage**:
  ```tsx
  <PortfolioImageSlider
    images={[
      { url: 'image1.jpg', alt: 'View 1' },
      { url: 'image2.jpg', alt: 'View 2' },
    ]}
    status="Active - Available"
  />
  ```

### Portfolio Header (`PortfolioHeader.tsx`)

- **Purpose**: Display portfolio title, category, and tagline
- **Features**:
  - Category and city badge
  - Large display title
  - Italic tagline quote
- **Usage**:
  ```tsx
  <PortfolioHeader
    category="Villa Collection"
    city="Bali"
    title="Andersen Residences No. 01"
    tagline="Contemporary tropical living, distilled."
  />
  ```

### Portfolio Info Grid (`PortfolioInfoGrid.tsx`)

- **Purpose**: Display key portfolio information in a grid
- **Features**:
  - Responsive grid layout
  - Consistent info card styling
  - Border-collapse design
  - Includes architect field
- **Usage**:
  ```tsx
  <PortfolioInfoGrid
    location="Seminyak, Bali"
    type="Villa Collection"
    units={12}
    completion="Q3 2026"
    architect="Studio Kali Architecture"
  />
  ```

### Project Highlights (`ProjectHighlights.tsx`)

- **Purpose**: Display numbered list of project highlights
- **Features**:
  - Numbered items (01, 02, etc.)
  - Border-separated list
  - Clean typography
- **Usage**:
  ```tsx
  <ProjectHighlights
    highlights={[
      'Natural stone and reclaimed timber',
      'Individually designed floor plans',
      'Private pools and garden pavilions',
    ]}
  />
  ```

### Portfolio Sidebar (`PortfolioSidebar.tsx`)

- **Purpose**: Sticky sidebar with pricing and project info
- **Features**:
  - Starting price display
  - Status indicator
  - Project summary details
  - CTA buttons (Enquire Now, Download Brochure)
  - Sticky positioning
- **Usage**:
  ```tsx
  <PortfolioSidebar
    startingPrice="IDR 35 Billion"
    status="Active - Available"
    projectType="Villa Collection"
    location="Seminyak, Bali"
    totalUnits={12}
    completion="Q3 2026"
  />
  ```

### Back to Portfolios (`BackToPortfolios.tsx`)

- **Purpose**: Navigation link back to portfolios page
- **Features**:
  - Arrow icon
  - Border separator above
  - Hover state
- **Usage**:
  ```tsx
  <BackToPortfolios />
  ```

## Shared Components

The portfolio detail page also uses the **Breadcrumb** component from Active Listings for navigation consistency.

## Page Structure

The portfolio detail page (`/portfolios/[slug]/page.tsx`) follows this layout:

```
├── Breadcrumb
├── Portfolio Image Slider (Full Width)
└── Two-column Grid
    ├── Left Column
    │   ├── Portfolio Header
    │   ├── Portfolio Info Grid
    │   ├── About This Project
    │   └── Project Highlights
    └── Right Column (Sticky)
        └── Portfolio Sidebar
└── Back to Portfolios
```

## Data Structure

### `portfolios.data.ts`

Contains the main portfolio data for the grid/card view:

- Basic project information
- Pricing
- Location
- Units and completion date
- Status (active, sold-out, coming-soon)

### `portfolio-details-data.ts`

Contains extended data for detail pages:

- Multiple images
- Full description
- Project highlights list
- Architect information

## Styling

All components use Tailwind CSS utility classes with the following design system:

### Colors

- Primary Gold: `#b89a5b`
- Black: `#0a0a0a`
- Gray text: `#4b4743`, `#a5a19a`, `#6b6360`
- Border: `#e5e0d7`
- Background: `#f7f5f0`

### Typography

- Display font: `font-display` (Cormorant Garamond)
- Sans font: `font-sans` (Inter)
- Uppercase labels with tracking: `text-[11px] tracking-[0.12em] uppercase`
- Italic taglines for quotes

### Spacing

- Container max-width: `1440px`
- Horizontal padding: `px-5 md:px-20`
- Consistent vertical rhythm with mb-* utilities

## Differences from Active Listings

1. **Image Slider**: Uses status badge instead of badge prop, larger thumbnails
2. **Header**: Includes tagline quote, different title size
3. **Info Grid**: Includes architect field, different layout
4. **Highlights**: Numbered list format instead of bullet points
5. **Sidebar**: Simpler structure focused on project info

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
- Flexible grid for info cards
- Stack info on mobile
