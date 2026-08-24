# Payload CMS Custom Root Components

This folder contains all custom root components for the Payload CMS admin panel. These components allow you to white-label and customize the admin experience.

## Components Overview

### 🎨 Graphics Components

#### `Logo.tsx`

The full logo displayed in contexts like the Login view.

- **Location**: Login page, large displays
- **Usage**: Replace `/logo.svg` with your actual logo path

#### `Icon.tsx`

The simplified icon used in the Nav component.

- **Location**: Navigation sidebar, small displays
- **Usage**: Replace `/icon.svg` with your actual icon path

---

### 🧭 Navigation Components

#### `BeforeNavLinks.tsx`

Injected into the Nav before the navigation links.

- **Purpose**: Add section headers or separators
- **Current**: Displays "Main Navigation" label

#### `AfterNavLinks.tsx`

Injected into the Nav after the navigation links.

- **Purpose**: Add quick links, resources, or utilities
- **Current**: Displays Quick Links section with:
  - View Website
  - Manage Properties
  - Manage Posts

---

### 📊 Dashboard Components

#### `BeforeDashboard.tsx`

Injected before the dashboard content.

- **Purpose**: Welcome messages, announcements, or alerts
- **Current**: Welcome banner with gradient background

#### `AfterDashboard.tsx`

Injected after the dashboard content.

- **Purpose**: Additional stats, widgets, or information
- **Current**: Quick Stats grid showing collection counts

---

### 🔐 Login Components

#### `BeforeLogin.tsx`

Injected before the login form.

- **Purpose**: Branding, welcome message, or instructions
- **Current**: "Anderson Property Management - Admin Portal" header

#### `AfterLogin.tsx`

Injected after the login form.

- **Purpose**: Help text, support links, or additional info
- **Current**: Help text and contact information

---

### 🎯 Action Components

#### `Actions.tsx`

Rendered in the admin panel header.

- **Purpose**: Global actions available throughout the admin
- **Current**:
  - View Site button (opens website in new tab)
  - Clear Cache button (with confirmation)

#### `SettingsMenu.tsx`

Popup menu accessible via gear icon above logout.

- **Purpose**: Administrative settings and utilities
- **Current Components**:
  - `SettingsMenu`: Clear cache, manage users, view website
  - `SystemActions`: System diagnostics, health check

---

### 🚪 Utility Components

#### `LogoutButton.tsx`

Custom logout button in the sidebar.

- **Purpose**: Replace default logout with custom styling/behavior
- **Current**: Red button with confirmation dialog

#### `Header.tsx`

Injected above the Payload header.

- **Purpose**: Announcements, alerts, or important notices
- **Current**: Yellow info banner (dismissible)

---

## Configuration

All components are configured in `src/payload.config.ts`:

```typescript
admin: {
  components: {
    graphics: {
      Logo: '@/components/(payload)/Logo',
      Icon: '@/components/(payload)/Icon',
    },
    beforeNavLinks: ['@/components/(payload)/BeforeNavLinks'],
    afterNavLinks: ['@/components/(payload)/AfterNavLinks'],
    beforeDashboard: ['@/components/(payload)/BeforeDashboard'],
    afterDashboard: ['@/components/(payload)/AfterDashboard'],
    beforeLogin: ['@/components/(payload)/BeforeLogin'],
    afterLogin: ['@/components/(payload)/AfterLogin'],
    header: ['@/components/(payload)/Header'],
    actions: ['@/components/(payload)/Actions'],
    settingsMenu: [
      '@/components/(payload)/SettingsMenu#SettingsMenu',
      '@/components/(payload)/SettingsMenu#SystemActions',
    ],
    logout: {
      Button: '@/components/(payload)/LogoutButton',
    },
  },
}
```

## Customization Guide

### Updating Graphics

1. **Logo**: Update `Logo.tsx` to point to your logo file

   ```tsx
   <img src="/your-logo.svg" alt="Your Brand" />
   ```

2. **Icon**: Update `Icon.tsx` to point to your icon file
   ```tsx
   <img src="/your-icon.svg" alt="Icon" />
   ```

### Customizing Colors & Styles

All components use Payload's CSS variables for consistency:

- `var(--theme-elevation-50)` - Lightest background
- `var(--theme-elevation-100)` - Light background
- `var(--theme-elevation-200)` - Borders
- `var(--theme-elevation-300)` - Hover states
- `var(--theme-error-500)` - Error/danger color
- `var(--theme-error-600)` - Error/danger hover

### Adding New Actions

Edit `Actions.tsx` to add more header buttons:

```tsx
<button onClick={handleYourAction}>
  <span>🎯</span>
  <span>Your Action</span>
</button>
```

### Extending Settings Menu

Edit `SettingsMenu.tsx` to add more menu items:

```tsx
<PopupList.Button onClick={handleAction}>🔧 Your Setting</PopupList.Button>
```

### Adding Quick Links

Edit `AfterNavLinks.tsx` to add more navigation shortcuts:

```tsx
<Link href="/admin/collections/your-collection">🔗 Your Collection</Link>
```

## Component Types

All components are React Server Components with `'use client'` directive since they need client-side interactivity. They follow Payload's conventions:

- **Array components**: `beforeDashboard`, `afterDashboard`, `actions`, etc. - can have multiple components
- **Single components**: `Logo`, `Icon`, `Nav` - single component only
- **Object components**: `logout.Button`, `graphics.Logo` - nested configuration

## Best Practices

1. **Use Payload UI Components**: Import from `@payloadcms/ui` for consistency
2. **Respect CSS Variables**: Use Payload's theme variables for styling
3. **Client Components**: Always add `'use client'` directive for interactive components
4. **Accessibility**: Include proper ARIA labels and semantic HTML
5. **Responsive Design**: Test components on mobile and desktop views

## Testing

After updating components:

1. Restart your development server
2. Visit `/admin` to see changes
3. Test on mobile view (toggle in dev tools)
4. Test all interactive elements (buttons, links, etc.)

## Documentation

For more information, see [Payload CMS Custom Components Documentation](https://payloadcms.com/docs/custom-components/root-components).
