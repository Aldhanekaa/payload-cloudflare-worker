# Payload CMS Custom Components Visual Guide

This guide shows where each custom component appears in the Payload CMS admin panel.

## 🖼️ Admin Panel Layout

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER COMPONENT (Header.tsx)                              │
│  ↑ Dismissible announcement banner (yellow)                 │
├─────────────────────────────────────────────────────────────┤
│  [ICON] Anderson Property  [ACTIONS] View Site | Clear Cache│
│  ↑ Icon.tsx    ↑ Logo area    ↑ Actions.tsx                 │
├─────┬───────────────────────────────────────────────────────┤
│ Nav │ DASHBOARD PAGE                                        │
│ ┌───┤                                                       │
│ │[=]│ BEFOREDASHBOARD COMPONENT (BeforeDashboard.tsx)      │
│ │   │ ↑ Welcome banner with gradient                       │
│ │ B │ ───────────────────────────────────────────────────  │
│ │ E │                                                       │
│ │ F │ [Default Dashboard Content]                          │
│ │ O │                                                       │
│ │ R │ ───────────────────────────────────────────────────  │
│ │ E │ AFTERDASHBOARD COMPONENT (AfterDashboard.tsx)       │
│ │   │ ↑ Quick Stats grid                                   │
│ │ L │                                                       │
│ │ I │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│ │ N │ │Properties│ │  Posts   │ │  Media   │ │Portfolios│   │
│ │ K │ │    —     │ │    —     │ │    —     │ │    —     │   │
│ │ S │ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
│ │   │                                                       │
│ ├───┤                                                       │
│ │   │                                                       │
│ │ N │                                                       │
│ │ A │                                                       │
│ │ V │                                                       │
│ │   │                                                       │
│ │ L │                                                       │
│ │ I │                                                       │
│ │ N │                                                       │
│ │ K │                                                       │
│ │ S │                                                       │
│ │   │                                                       │
│ ├───┤                                                       │
│ │   │                                                       │
│ │ A │                                                       │
│ │ F │                                                       │
│ │ T │                                                       │
│ │ E │                                                       │
│ │ R │                                                       │
│ │   │                                                       │
│ ├───┤                                                       │
│ │ ⚙ │ ← Settings Menu (SettingsMenu.tsx)                   │
│ │ 🚪│ ← Logout Button (LogoutButton.tsx)                   │
│ └───┤                                                       │
└─────┴───────────────────────────────────────────────────────┘
```

## 📍 Component Locations

### Header Area (Top)

```
┌────────────────────────────────────────────────────────┐
│ ℹ️ Welcome! You're managing Anderson Property...    [×]│ ← Header.tsx
├────────────────────────────────────────────────────────┤
│ [Icon] Anderson Property  🌐 View Site | 🔄 Clear Cache│
│   ↑         ↑                    ↑                      │
│ Icon.tsx  Logo.tsx           Actions.tsx               │
└────────────────────────────────────────────────────────┘
```

### Sidebar Navigation

```
┌──────────────────┐
│ MAIN NAVIGATION  │ ← BeforeNavLinks.tsx
├──────────────────┤
│ 📊 Dashboard     │
│ 👥 Users         │
│ 📝 Posts         │ ← Default Nav Links
│ 🏠 Properties    │
│ 📄 Pages         │
├──────────────────┤
│ QUICK LINKS      │ ← AfterNavLinks.tsx
│ 🌐 View Website  │
│ 🏠 Manage Props  │
│ 📝 Manage Posts  │
├──────────────────┤
│      [⚙️]         │ ← Settings Menu Icon
│ [🚪 Logout]      │ ← LogoutButton.tsx
└──────────────────┘
```

### Login Page

```
┌─────────────────────────────┐
│                             │
│ Anderson Property Mgmt      │ ← BeforeLogin.tsx
│ Admin Portal                │
│                             │
├─────────────────────────────┤
│                             │
│    [Login Form]             │ ← Default Payload Login
│    Email: [__________]      │
│    Password: [_______]      │
│    [Login Button]           │
│                             │
├─────────────────────────────┤
│ Need help? Contact admin... │ ← AfterLogin.tsx
└─────────────────────────────┘
```

### Dashboard Content

```
┌─────────────────────────────────────────────────┐
│ Welcome to Anderson Property Management         │ ← BeforeDashboard.tsx
│ Manage your properties, listings, and content   │
├─────────────────────────────────────────────────┤
│                                                 │
│ [Default Dashboard Widgets & Content]          │
│                                                 │
├─────────────────────────────────────────────────┤
│ Quick Stats                                     │ ← AfterDashboard.tsx
│ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ │Properties│ │  Posts   │ │  Media   │        │
│ │    —     │ │    —     │ │    —     │        │
│ └──────────┘ └──────────┘ └──────────┘        │
└─────────────────────────────────────────────────┘
```

### Settings Menu Popup

```
┌─────────────────────────┐
│ 🔄 Clear Cache          │
│ 👥 Manage Users         │ ← SettingsMenu
│ 🌐 View Website         │
├─────────────────────────┤
│ 🔧 System Diagnostics   │ ← SystemActions
│ 📊 Health Check         │
└─────────────────────────┘
     ↑
   [⚙️] Settings Icon
```

## 🎯 Component Interaction Points

### 1. Logo & Icon

- **Logo.tsx**: Displays in header and login page
- **Icon.tsx**: Displays in collapsed sidebar and mobile nav

### 2. Actions

- **Location**: Top-right of admin header (next to user menu)
- **Purpose**: Quick access to common tasks
- **Buttons**: View Site, Clear Cache

### 3. Navigation Sections

- **BeforeNavLinks**: Above all nav items (section header)
- **Default Nav**: Collections, globals (Payload default)
- **AfterNavLinks**: Below all nav items (quick links)

### 4. Dashboard Sections

- **BeforeDashboard**: First thing users see on dashboard
- **Default Content**: Payload's built-in dashboard widgets
- **AfterDashboard**: Additional stats/info below default content

### 5. Login Sections

- **BeforeLogin**: Branding before login form
- **Login Form**: Payload's default form
- **AfterLogin**: Help text/links after form

### 6. Settings & Logout

- **Settings Menu**: Gear icon above logout
- **Logout Button**: Bottom of sidebar

## 🔧 Customization Points

### Quick Updates

1. **Change welcome message**: Edit `BeforeDashboard.tsx`
2. **Add quick links**: Edit `AfterNavLinks.tsx`
3. **Update branding**: Replace logo files and update `Logo.tsx` / `Icon.tsx`
4. **Modify header actions**: Edit `Actions.tsx`
5. **Add settings**: Edit `SettingsMenu.tsx`

### Color Scheme

All components use Payload CSS variables:

- Background: `var(--theme-elevation-X)` where X is 50, 100, 200, etc.
- Danger/Error: `var(--theme-error-500)`
- Text: Inherits from parent (theme-aware)

### Interactive Elements

- All buttons have hover states
- Links use Payload's `Link` component
- Modals use native `confirm()` dialogs
- Settings use `PopupList` from `@payloadcms/ui`

## 📐 Layout Hierarchy

```
Admin Panel
├── Header (Custom)
│   └── Header.tsx
├── Main Header Bar
│   ├── Logo (Custom - Logo.tsx)
│   ├── Icon (Custom - Icon.tsx)
│   └── Actions (Custom - Actions.tsx)
├── Sidebar
│   ├── Before Nav Links (Custom - BeforeNavLinks.tsx)
│   ├── Nav Links (Default)
│   ├── After Nav Links (Custom - AfterNavLinks.tsx)
│   ├── Settings Menu (Custom - SettingsMenu.tsx)
│   └── Logout Button (Custom - LogoutButton.tsx)
└── Main Content Area
    └── Dashboard
        ├── Before Dashboard (Custom - BeforeDashboard.tsx)
        ├── Dashboard Content (Default)
        └── After Dashboard (Custom - AfterDashboard.tsx)

Login Page
├── Before Login (Custom - BeforeLogin.tsx)
├── Login Form (Default)
└── After Login (Custom - AfterLogin.tsx)
```

## 🎨 Visual Styling Reference

### Component Colors

- **Header**: Yellow (`#fef3c7`) with brown text (`#92400e`)
- **BeforeDashboard**: Purple gradient (`#667eea` to `#764ba2`)
- **Actions**: Light background with subtle border
- **Logout**: Red (`var(--theme-error-500)`)

### Typography

- Headers: Bold, various sizes (1.25rem - 1.75rem)
- Body: 0.875rem (14px)
- Labels: 0.75rem (12px), uppercase

### Spacing

- Padding: 0.5rem - 1.5rem
- Gaps: 0.5rem - 1rem
- Margins: 0.5rem - 2rem

## 🚀 Usage Examples

### Adding a New Quick Link

```tsx
// In AfterNavLinks.tsx
<Link href="/admin/collections/testimonials">⭐ Manage Testimonials</Link>
```

### Adding a New Action Button

```tsx
// In Actions.tsx
<button onClick={() => window.open('/admin/reports')}>
  <span>📊</span>
  <span>Reports</span>
</button>
```

### Adding a Settings Menu Item

```tsx
// In SettingsMenu.tsx
<PopupList.Button onClick={() => console.log('Export')}>💾 Export Data</PopupList.Button>
```

### Changing Dashboard Message

```tsx
// In BeforeDashboard.tsx
<h2>Welcome Back, Administrator!</h2>
<p>You have X new properties pending review.</p>
```

## 📱 Responsive Behavior

All components adapt to screen size:

- **Desktop**: Full layout with sidebar
- **Tablet**: Collapsible sidebar (Icon shows instead of Logo)
- **Mobile**: Hamburger menu, stacked layout

## ✅ Component Checklist

- [x] Logo - Full branding for header/login
- [x] Icon - Simplified icon for sidebar
- [x] Actions - Header action buttons
- [x] Header - Announcement banner
- [x] Before Nav Links - Navigation section header
- [x] After Nav Links - Quick links section
- [x] Before Dashboard - Welcome message
- [x] After Dashboard - Statistics grid
- [x] Before Login - Login page branding
- [x] After Login - Help text
- [x] Settings Menu - Administrative settings
- [x] Logout Button - Custom logout with confirm

All components are implemented and configured! 🎉
