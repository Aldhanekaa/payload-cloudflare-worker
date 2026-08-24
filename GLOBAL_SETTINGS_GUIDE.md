# Global Settings Configuration Guide

This guide explains how to use the Global Settings feature in your Payload CMS application.

## Overview

Global Settings provide a centralized configuration for:

- **WhatsApp Contact**: Country code, phone number, and display text
- **Announcements**: Site-wide announcements with links and scheduling
- **Schedule Consultation Link**: External booking link (Calendly, Cal.com, etc.)
- **Promotions**: Seasonal promotion links

## Table of Contents

1. [Configuration Structure](#configuration-structure)
2. [Managing Settings in Payload CMS](#managing-settings-in-payload-cms)
3. [Server-Side Usage](#server-side-usage)
4. [Client-Side Usage](#client-side-usage)
5. [Example Components](#example-components)
6. [Helper Functions](#helper-functions)

## Configuration Structure

### WhatsApp Contact

```typescript
{
  whatsapp: {
    countryCode: '+1',      // Must include + symbol
    number: '1234567890',   // Numbers only, no spaces or special characters
    displayText: 'Contact us on WhatsApp' // Optional display text
  }
}
```

### Announcements

```typescript
{
  announcements: [
    {
      isActive: true, // Enable/disable the announcement
      priority: 'high' | 'normal' | 'low', // Priority level
      announcement: 'Your announcement text here',
      announcementLink: {
        // Optional link
        type: 'custom' | 'reference',
        url: 'https://example.com', // For custom links
        label: 'Learn More',
        newTab: true,
        appearance: 'default' | 'outline',
      },
      startDate: '2024-01-01T00:00:00Z', // Optional: when to start showing
      endDate: '2024-12-31T23:59:59Z', // Optional: when to stop showing
    },
  ]
}
```

### Schedule Consultation Link

```typescript
{
  scheduleConsultationLink: 'https://calendly.com/your-link'
}
```

## Managing Settings in Payload CMS

1. Log into your Payload CMS admin panel
2. Navigate to **Globals** → **Global Settings**
3. You'll see three tabs:
   - **Contact Information**: WhatsApp and consultation scheduling
   - **Announcements**: Manage site announcements
   - **Promotions**: Seasonal promotion links

### Adding an Announcement

1. Go to the **Announcements** tab
2. Click **Add Announcement**
3. Fill in:
   - **Active**: Check to enable
   - **Priority**: High (red), Normal (blue), or Low (green)
   - **Announcement Text**: Your message
   - **Link** (optional): Add a call-to-action link
   - **Start/End Date** (optional): Schedule when to display

## Server-Side Usage

### Fetching Global Settings

```typescript
import { getGlobalSettings } from '@/(payload)/globals/Global_Settings'

export default async function Page() {
  const settings = await getGlobalSettings()

  return (
    <div>
      <p>WhatsApp: {settings?.whatsapp.countryCode}{settings?.whatsapp.number}</p>
    </div>
  )
}
```

### Fetching Specific Data

```typescript
import {
  getWhatsAppContact,
  getActiveAnnouncements,
  getScheduleConsultationLink
} from '@/(payload)/globals/Global_Settings'

export default async function Layout() {
  const whatsapp = await getWhatsAppContact()
  const announcements = await getActiveAnnouncements()
  const consultationLink = await getScheduleConsultationLink()

  return (
    <>
      {announcements.length > 0 && (
        <AnnouncementBanner announcements={announcements} />
      )}
      {/* ... rest of layout */}
    </>
  )
}
```

## Client-Side Usage

### Using the Hook

```typescript
'use client'

import { useGlobalSettings } from '@/(payload)/globals/Global_Settings'

export function MyComponent() {
  const { settings, loading, error } = useGlobalSettings()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading settings</div>
  if (!settings) return null

  return (
    <div>
      <p>WhatsApp: {settings.whatsapp.displayText}</p>
    </div>
  )
}
```

## Example Components

### Announcement Banner

Display active announcements at the top of your site:

```typescript
import { getActiveAnnouncements } from '@/(payload)/globals/Global_Settings'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'

export default async function Layout({ children }) {
  const announcements = await getActiveAnnouncements()

  return (
    <>
      <AnnouncementBanner announcements={announcements} />
      {children}
    </>
  )
}
```

### WhatsApp Button

Add a floating WhatsApp button:

```typescript
import { getWhatsAppContact } from '@/(payload)/globals/Global_Settings'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export default async function Page() {
  const whatsapp = await getWhatsAppContact()

  if (!whatsapp) return null

  return (
    <WhatsAppButton
      whatsapp={whatsapp}
      variant="floating"
      message="Hi! I'd like to inquire about your properties."
    />
  )
}
```

### WhatsApp Button Variants

```typescript
// Floating button (fixed position, bottom right)
<WhatsAppButton whatsapp={whatsapp} variant="floating" />

// Inline button with text
<WhatsAppButton whatsapp={whatsapp} variant="inline" showText={true} />

// Icon only
<WhatsAppButton whatsapp={whatsapp} variant="icon" />
```

### Schedule Consultation Button

```typescript
import { getScheduleConsultationLink } from '@/(payload)/globals/Global_Settings'

export default async function ContactSection() {
  const consultationLink = await getScheduleConsultationLink()

  return (
    <div>
      {consultationLink && (
        <a
          href={consultationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Schedule a Consultation
        </a>
      )}
    </div>
  )
}
```

## Helper Functions

### Get WhatsApp URL

```typescript
import { getWhatsAppUrl } from '@/(payload)/globals/Global_Settings'

const whatsapp = { countryCode: '+1', number: '1234567890' }
const url = getWhatsAppUrl(whatsapp, 'Hello! I have a question.')
// Returns: https://wa.me/+11234567890?text=Hello!%20I%20have%20a%20question.
```

### Filter Active Announcements

```typescript
import { getActiveAnnouncements } from '@/(payload)/globals/Global_Settings/types'

const allAnnouncements = [...] // your announcements
const activeOnly = getActiveAnnouncements(allAnnouncements)
// Returns only announcements that are active and within date range
```

### Sort by Priority

```typescript
import { sortAnnouncementsByPriority } from '@/(payload)/globals/Global_Settings/types'

const announcements = [...] // your announcements
const sorted = sortAnnouncementsByPriority(announcements)
// Returns announcements sorted: high → normal → low
```

## Type Definitions

All TypeScript types are exported from the Global Settings module:

```typescript
import type {
  GlobalSettingsType,
  WhatsAppContact,
  Announcement,
} from '@/(payload)/globals/Global_Settings'
```

## Best Practices

1. **Cache Settings**: Global settings don't change frequently, consider caching them
2. **Error Handling**: Always check if settings exist before using them
3. **Announcements**: Use start/end dates for temporary announcements
4. **Priority Levels**:
   - High: Critical announcements (red background)
   - Normal: General announcements (blue background)
   - Low: Minor updates (green background)
5. **WhatsApp Messages**: Customize the pre-filled message for different contexts

## Example: Complete Implementation

```typescript
// app/layout.tsx
import { getGlobalSettings } from '@/(payload)/globals/Global_Settings'
import { getActiveAnnouncements } from '@/(payload)/globals/Global_Settings/types'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export default async function RootLayout({ children }) {
  const settings = await getGlobalSettings()
  const activeAnnouncements = settings
    ? getActiveAnnouncements(settings.announcements)
    : []

  return (
    <html>
      <body>
        {activeAnnouncements.length > 0 && (
          <AnnouncementBanner announcements={activeAnnouncements} />
        )}

        <main>{children}</main>

        {settings?.whatsapp && (
          <WhatsAppButton
            whatsapp={settings.whatsapp}
            variant="floating"
            message="Hello! I'm interested in learning more about your services."
          />
        )}
      </body>
    </html>
  )
}
```

## API Endpoints

The global settings are available via REST API:

```bash
GET /api/globals/global-settings
```

This endpoint is used by the `useGlobalSettings` hook for client-side fetching.

## Troubleshooting

**Q: Announcements not showing?**

- Check that `isActive` is true
- Verify start/end dates are correct
- Ensure the announcement text is not empty

**Q: WhatsApp link not working?**

- Verify country code includes the + symbol
- Check that phone number contains only digits
- Test the generated URL manually

**Q: Settings not updating?**

- Clear your browser cache
- Restart the development server
- Check Payload CMS admin panel for the latest values

## Migration from Old Settings

If you have existing global settings, you'll need to:

1. Back up your current settings
2. Update to the new structure
3. Test all components using global settings
4. Update any hardcoded contact information to use the new system

---

For more information, see the [Payload CMS Globals documentation](https://payloadcms.com/docs/configuration/globals).
