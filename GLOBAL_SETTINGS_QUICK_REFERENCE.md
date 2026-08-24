# Global Settings - Quick Reference

## 📦 What's Included

✅ **WhatsApp Contact** - Country code + phone number + display text  
✅ **Announcements** - Array with text, links, priority, and scheduling  
✅ **Schedule Consultation Link** - External booking link (Calendly, etc.)  
✅ **Promotions** - Seasonal promotion links

## 🚀 Quick Start

### 1. Access Settings in Payload CMS

Navigate to: **Globals** → **Global Settings**

### 2. Server-Side Usage

```typescript
import {
  getGlobalSettings,
  getWhatsAppContact,
  getActiveAnnouncements,
} from '@/(payload)/globals/Global_Settings'

// Get all settings
const settings = await getGlobalSettings()

// Get specific data
const whatsapp = await getWhatsAppContact()
const announcements = await getActiveAnnouncements()
```

### 3. Client-Side Usage

```typescript
'use client'
import { useGlobalSettings } from '@/(payload)/globals/Global_Settings'

const { settings, loading, error } = useGlobalSettings()
```

## 🎨 Ready-to-Use Components

### Announcement Banner

```typescript
import { AnnouncementBanner } from '@/components/AnnouncementBanner'

<AnnouncementBanner announcements={announcements} />
```

### WhatsApp Button

```typescript
import { WhatsAppButton } from '@/components/WhatsAppButton'

// Floating button
<WhatsAppButton whatsapp={whatsapp} variant="floating" />

// Inline button
<WhatsAppButton whatsapp={whatsapp} variant="inline" showText={true} />

// Icon only
<WhatsAppButton whatsapp={whatsapp} variant="icon" />
```

## 🔧 Helper Functions

```typescript
import {
  getWhatsAppUrl,
  getActiveAnnouncements,
  sortAnnouncementsByPriority,
} from '@/(payload)/globals/Global_Settings/types'

// Generate WhatsApp URL
const url = getWhatsAppUrl(whatsapp, 'Hello!')

// Filter active announcements
const active = getActiveAnnouncements(allAnnouncements)

// Sort by priority (high → normal → low)
const sorted = sortAnnouncementsByPriority(announcements)
```

## 📝 Data Structure

### WhatsApp

```typescript
{
  countryCode: '+1',
  number: '1234567890',
  displayText: 'Contact us on WhatsApp'
}
```

### Announcement

```typescript
{
  isActive: true,
  priority: 'high' | 'normal' | 'low',
  announcement: 'Your text here',
  announcementLink: {
    url: 'https://...',
    label: 'Learn More',
    newTab: true
  },
  startDate: '2024-01-01T00:00:00Z',
  endDate: '2024-12-31T23:59:59Z'
}
```

## 📂 File Structure

```
src/
├── (payload)/
│   └── globals/
│       └── Global_Settings/
│           ├── config.ts              # Payload config
│           ├── types.ts               # TypeScript types + helpers
│           ├── server.ts              # Server-side utilities
│           ├── useGlobalSettings.tsx  # Client hook
│           └── index.ts               # Exports
└── components/
    ├── AnnouncementBanner/
    │   ├── index.tsx
    │   └── styles.module.scss
    └── WhatsAppButton/
        ├── index.tsx
        └── styles.module.scss
```

## 🎯 Priority Colors

- **High**: Red background (#dc2626)
- **Normal**: Blue background (#2563eb)
- **Low**: Green background (#059669)

## 📱 API Endpoint

```
GET /api/globals/global-settings
```

## ✨ Key Features

- ✅ Type-safe TypeScript definitions
- ✅ Server & client-side utilities
- ✅ Automatic date filtering for announcements
- ✅ Priority-based sorting
- ✅ WhatsApp URL generation with pre-filled messages
- ✅ Responsive design components
- ✅ Validation for phone numbers and URLs

---

For detailed documentation, see [GLOBAL_SETTINGS_GUIDE.md](./GLOBAL_SETTINGS_GUIDE.md)
