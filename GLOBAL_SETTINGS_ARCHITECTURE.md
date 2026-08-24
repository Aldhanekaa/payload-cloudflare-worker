# Global Settings Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Payload CMS Admin                         │
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐         │
│  │  Contact    │  │ Announcements│  │  Promotions    │         │
│  │  Info Tab   │  │     Tab      │  │      Tab       │         │
│  └─────────────┘  └──────────────┘  └────────────────┘         │
│         │                 │                    │                  │
│         └─────────────────┴────────────────────┘                  │
│                           ▼                                       │
│              ┌────────────────────────┐                          │
│              │  Global Settings DB    │                          │
│              └────────────────────────┘                          │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ API: /api/globals/global-settings
                            │
        ┌───────────────────┴───────────────────┐
        │                                       │
        ▼                                       ▼
┌───────────────┐                      ┌───────────────┐
│  Server Side  │                      │  Client Side  │
└───────────────┘                      └───────────────┘
        │                                       │
        ▼                                       ▼
┌─────────────────────────┐         ┌──────────────────────────┐
│ server.ts utilities:    │         │ useGlobalSettings() hook │
│ • getGlobalSettings()   │         │ • Auto-fetch on mount    │
│ • getWhatsAppContact()  │         │ • Loading states         │
│ • getActiveAnnouncements│         │ • Error handling         │
└─────────────────────────┘         └──────────────────────────┘
        │                                       │
        │                                       │
        ▼                                       ▼
┌────────────────────────────────────────────────────────────────┐
│                      Your Application                           │
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │ Server Component │  │ Client Component │                   │
│  │                  │  │                  │                   │
│  │ async function   │  │ 'use client'     │                   │
│  │ Page() {         │  │ function() {     │                   │
│  │   const settings │  │   const { ... }  │                   │
│  │   = await get... │  │   = useGlobal... │                   │
│  │ }                │  │ }                │                   │
│  └──────────────────┘  └──────────────────┘                   │
│           │                      │                              │
│           └──────────┬───────────┘                              │
│                      ▼                                          │
│           ┌─────────────────────┐                              │
│           │  React Components   │                              │
│           └─────────────────────┘                              │
│                      │                                          │
│         ┌────────────┴────────────┐                            │
│         ▼                         ▼                            │
│  ┌───────────────┐       ┌──────────────┐                     │
│  │ Announcement  │       │   WhatsApp   │                     │
│  │    Banner     │       │    Button    │                     │
│  └───────────────┘       └──────────────┘                     │
└────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Server-Side Rendering (SSR)

```
1. Page Request
   └─> Server Component executes
       └─> getGlobalSettings() called
           └─> Direct database query via Payload
               └─> Returns settings object
                   └─> Component renders with data
                       └─> HTML sent to client
```

### Client-Side Rendering (CSR)

```
1. Component Mounts
   └─> useGlobalSettings() hook executes
       └─> useEffect triggers
           └─> fetch('/api/globals/global-settings')
               └─> Payload REST API responds
                   └─> State updated with settings
                       └─> Component re-renders
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      AnnouncementBanner                          │
│                                                                   │
│  Props: { announcements: Announcement[], showAll?: boolean }    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  1. sortAnnouncementsByPriority()                       │   │
│  │  2. Filter active (isActive, date range)               │   │
│  │  3. Map announcements to styled divs                    │   │
│  │     • High priority → Red background                    │   │
│  │     • Normal → Blue background                          │   │
│  │     • Low → Green background                            │   │
│  │  4. Render links (internal/external)                    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        WhatsAppButton                            │
│                                                                   │
│  Props: { whatsapp, message?, variant?, showText? }             │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  1. getWhatsAppUrl(whatsapp, message)                  │   │
│  │     → https://wa.me/+countrycode+number?text=...       │   │
│  │  2. Render based on variant:                            │   │
│  │     • floating → Fixed position, round button           │   │
│  │     • inline → Full button with text                    │   │
│  │     • icon → Icon only, minimal                         │   │
│  │  3. WhatsApp icon SVG                                   │   │
│  │  4. Optional display text                               │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## File Dependency Graph

```
payload.config.ts
    │
    └─> imports GlobalSettings from config.ts
            │
            └─> uses link field from fields/link.ts
                    │
    Database        │
    Schema          ▼
    Created   ┌──────────────┐
              │   config.ts  │
              └──────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
  ┌─────────┐  ┌─────────┐  ┌────────┐
  │types.ts │  │server.ts│  │hook.tsx│
  └─────────┘  └─────────┘  └────────┘
        │           │           │
        └───────────┴───────────┘
                    │
                    ▼
              ┌──────────┐
              │ index.ts │ ← Central export
              └──────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌────────────────┐    ┌─────────────────┐
│ Components     │    │ Your App        │
│ • Announcement │    │ • Layouts       │
│ • WhatsApp     │    │ • Pages         │
└────────────────┘    └─────────────────┘
```

## Helper Functions Flow

### getWhatsAppUrl()

```
Input: { countryCode: '+971', number: '501234567' }, message: 'Hello'
    │
    ├─> Clean phone: '+971501234567'
    ├─> Encode message: 'Hello' → 'Hello'
    └─> Build URL: 'https://wa.me/+971501234567?text=Hello'

Output: 'https://wa.me/+971501234567?text=Hello'
```

### getActiveAnnouncements()

```
Input: Array of announcements
    │
    ├─> Filter isActive === true
    ├─> Filter startDate <= now (or null)
    ├─> Filter endDate >= now (or null)
    │
Output: Filtered active announcements
```

### sortAnnouncementsByPriority()

```
Input: Announcements with mixed priorities
    │
    ├─> Map priorities: { high: 0, normal: 1, low: 2 }
    ├─> Sort by numeric priority
    │
Output: [high announcements, normal announcements, low announcements]
```

## API Endpoints

```
GET /api/globals/global-settings
    │
    ├─> Authentication check (optional)
    ├─> Query Payload database
    ├─> Return JSON response
    │
    └─> Response format:
        {
          whatsapp: { countryCode, number, displayText },
          scheduleConsultationLink: "https://...",
          announcements: [...],
          currentSeasonPromotionLink: {...}
        }
```

## Database Schema

```
Collection: globals
Document: global-settings

{
  "_id": "global-settings",
  "whatsapp": {
    "countryCode": String (required),
    "number": String (required, validated),
    "displayText": String (optional)
  },
  "scheduleConsultationLink": String (optional, URL validated),
  "announcements": [
    {
      "id": String (auto-generated),
      "isActive": Boolean (default: true),
      "priority": Enum('high', 'normal', 'low'),
      "announcement": String (required),
      "announcementLink": {
        "type": Enum('reference', 'custom'),
        "reference": ObjectReference (pages, posts),
        "url": String,
        "label": String,
        "newTab": Boolean,
        "appearance": Enum('default', 'outline')
      },
      "startDate": Date (optional),
      "endDate": Date (optional)
    }
  ],
  "currentSeasonPromotionLink": {
    "type": Enum('reference', 'custom'),
    "reference": ObjectReference,
    "url": String,
    "label": String,
    "newTab": Boolean,
    "appearance": Enum('default', 'outline')
  },
  "createdAt": Date,
  "updatedAt": Date
}
```

## Integration Points

### 1. Root Layout Integration

```typescript
Layout (Server Component)
    │
    ├─> getGlobalSettings()
    │   └─> Returns settings from DB
    │
    ├─> getActiveAnnouncements(settings.announcements)
    │   └─> Filters by date & active status
    │
    └─> Render:
        ├─> <AnnouncementBanner announcements={active} />
        └─> <WhatsAppButton whatsapp={settings.whatsapp} />
```

### 2. Contact Page Integration

```typescript
ContactPage (Server Component)
    │
    ├─> getGlobalSettings()
    │
    └─> Render:
        ├─> WhatsApp contact section
        ├─> Schedule consultation button
        └─> Contact form
```

### 3. Client Component Integration

```typescript
ClientComponent
    │
    ├─> useGlobalSettings() hook
    │   ├─> useState for settings, loading, error
    │   ├─> useEffect to fetch
    │   └─> Updates state on response
    │
    └─> Render based on state:
        ├─> loading → Show loader
        ├─> error → Show error message
        └─> success → Render with settings data
```

## Styling Architecture

```
Global Settings Components
    │
    ├─> AnnouncementBanner
    │   └─> styles.module.scss
    │       ├─> .announcementBanner (container)
    │       ├─> .announcement (item)
    │       ├─> .priority-high (red gradient)
    │       ├─> .priority-normal (blue gradient)
    │       ├─> .priority-low (green gradient)
    │       ├─> .content (flex layout)
    │       ├─> .text (typography)
    │       ├─> .link (CTA button)
    │       └─> Media queries (responsive)
    │
    └─> WhatsAppButton
        └─> styles.module.scss
            ├─> .whatsappButton (base)
            ├─> .floating (fixed position)
            ├─> .inline (default)
            ├─> .icon (minimal)
            ├─> WhatsApp brand colors (#25d366)
            └─> Hover/active states
```

## Security Considerations

```
┌─────────────────────────────────────┐
│         Security Layers             │
├─────────────────────────────────────┤
│ 1. Payload CMS Access Control       │
│    └─> Admin-only write access      │
│                                     │
│ 2. Phone Number Validation          │
│    └─> Regex check for digits only  │
│                                     │
│ 3. URL Validation                   │
│    └─> Valid URL format check       │
│                                     │
│ 4. Public Read Access               │
│    └─> Settings readable by all     │
│                                     │
│ 5. No Sensitive Data Storage        │
│    └─> Only public contact info     │
└─────────────────────────────────────┘
```

## Performance Optimization

```
Server-Side
    │
    ├─> Static at build time (if using generateStaticParams)
    ├─> Cached by Next.js
    └─> Single DB query per page load

Client-Side
    │
    ├─> Fetched once on mount
    ├─> Can implement caching (localStorage, SWR, React Query)
    └─> Minimal bundle size

Payload CMS
    │
    ├─> Indexed database queries
    ├─> RESTful API caching headers
    └─> Optimized JSON responses
```

---

This architecture provides a scalable, maintainable, and type-safe solution for managing global site settings. All components are loosely coupled and can be extended or modified independently.
