# Global Settings - Start Here 📚

## 🎯 Quick Navigation

**New to this feature?** → Start with [Quick Reference](./GLOBAL_SETTINGS_QUICK_REFERENCE.md)

**Ready to implement?** → Follow the [Checklist](./GLOBAL_SETTINGS_CHECKLIST.md)

**Need details?** → Read the [Complete Guide](./GLOBAL_SETTINGS_GUIDE.md)

**Want to understand the system?** → Check [Architecture](./GLOBAL_SETTINGS_ARCHITECTURE.md)

**Implementation overview?** → See [Implementation Complete](./GLOBAL_SETTINGS_IMPLEMENTATION_COMPLETE.md)

---

## 📋 What This Feature Provides

A complete global settings system for your Payload CMS application with:

✅ **WhatsApp Contact** - Country code, phone number, and display text  
✅ **Announcements** - Priority-based site announcements with scheduling  
✅ **Consultation Booking** - External scheduling link integration  
✅ **React Components** - Ready-to-use UI components  
✅ **TypeScript Support** - Full type safety throughout  
✅ **Documentation** - Comprehensive guides and examples

---

## 🚀 Getting Started (5 Minutes)

### 1. Restart Your Dev Server

```bash
npm run dev
```

### 2. Open Payload CMS

Navigate to: `http://localhost:3000/admin` → **Globals** → **Global Settings**

### 3. Add Your Settings

**Contact Information Tab:**

- WhatsApp country code: `+971` (or your country)
- WhatsApp number: `501234567` (your number)
- Display text: `Contact us on WhatsApp`
- Consultation link: `https://calendly.com/your-link`

**Announcements Tab:**

- Click "Add Announcement"
- Set priority, text, and optional link
- Save

### 4. Add to Your Layout

```typescript
import { getGlobalSettings } from '@/(payload)/globals/Global_Settings'
import { getActiveAnnouncements } from '@/(payload)/globals/Global_Settings/types'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export default async function RootLayout({ children }) {
  const settings = await getGlobalSettings()
  const announcements = settings ? getActiveAnnouncements(settings.announcements) : []

  return (
    <html>
      <body>
        {announcements.length > 0 && (
          <AnnouncementBanner announcements={announcements} />
        )}
        {children}
        {settings?.whatsapp && (
          <WhatsAppButton whatsapp={settings.whatsapp} variant="floating" />
        )}
      </body>
    </html>
  )
}
```

### 5. Test It

- Visit your homepage
- See the announcement banner at the top
- See the floating WhatsApp button (bottom right)
- Click the WhatsApp button to test

**Done! You're using global settings.** 🎉

---

## 📁 File Structure

```
✅ Core Configuration
├── src/(payload)/globals/Global_Settings/
│   ├── config.ts              # Payload CMS configuration
│   ├── types.ts               # TypeScript types + helpers
│   ├── server.ts              # Server-side utilities
│   ├── useGlobalSettings.tsx  # Client-side hook
│   ├── seed.ts                # Sample data seeding
│   └── index.ts               # Central exports

✅ UI Components
├── src/components/AnnouncementBanner/
│   ├── index.tsx              # Announcement banner component
│   └── styles.module.scss     # Banner styles
└── src/components/WhatsAppButton/
    ├── index.tsx              # WhatsApp button component
    └── styles.module.scss     # Button styles

✅ Examples
├── src/app/(frontend)/layout.example.tsx
├── src/app/(frontend)/[locale]/contact/page.example.tsx
└── src/components/GlobalSettingsExample/ClientExample.tsx

✅ Documentation
├── GLOBAL_SETTINGS_QUICK_REFERENCE.md         # Quick start
├── GLOBAL_SETTINGS_GUIDE.md                   # Complete guide
├── GLOBAL_SETTINGS_ARCHITECTURE.md            # System design
├── GLOBAL_SETTINGS_IMPLEMENTATION_COMPLETE.md # Summary
├── GLOBAL_SETTINGS_CHECKLIST.md               # Implementation steps
└── GLOBAL_SETTINGS_README.md                  # This file
```

---

## 🎨 What You Can Do

### Display Announcements

```typescript
<AnnouncementBanner announcements={announcements} />
```

- Priority-based color coding (high=red, normal=blue, low=green)
- Automatic date filtering
- Optional links with multiple styles

### Add WhatsApp Contact

```typescript
<WhatsAppButton whatsapp={whatsapp} variant="floating" />
```

- Three variants: floating, inline, icon
- Pre-filled messages
- WhatsApp brand styling

### Schedule Consultations

```typescript
{settings?.scheduleConsultationLink && (
  <a href={settings.scheduleConsultationLink}>Book Now</a>
)}
```

---

## 📖 Documentation Files

| Document                    | Purpose                   | When to Use                |
| --------------------------- | ------------------------- | -------------------------- |
| **Quick Reference**         | Common tasks and examples | Need a quick code snippet  |
| **Complete Guide**          | Detailed explanations     | Learning the system        |
| **Architecture**            | System design and flow    | Understanding internals    |
| **Implementation Complete** | Feature summary           | Overview of what was built |
| **Checklist**               | Step-by-step setup        | Implementing in your app   |
| **This File (README)**      | Starting point            | First time here            |

---

## 🔧 Common Use Cases

### 1. Display Urgent Announcement

1. Go to Payload CMS → Global Settings → Announcements
2. Add announcement with **High Priority**
3. Set dates (optional)
4. Announcement appears in red banner

### 2. Add WhatsApp to Footer

```typescript
const whatsapp = await getWhatsAppContact()
```

Display in footer with custom styling

### 3. Create Contact Page

See `contact/page.example.tsx` for full implementation

### 4. Client-Side Updates

```typescript
const { settings } = useGlobalSettings()
```

Use in interactive components

---

## ✅ Verification

All files have been:

- ✅ Created and organized
- ✅ Type-checked (zero errors)
- ✅ Documented with examples
- ✅ Tested for correctness

---

## 🎯 Next Steps

1. **Follow the [Checklist](./GLOBAL_SETTINGS_CHECKLIST.md)** for implementation
2. **Configure settings** in Payload CMS
3. **Add components** to your layout
4. **Customize styles** to match your brand
5. **Test on different devices**

---

## 💡 Key Features

- **Type-Safe**: Full TypeScript support
- **Server & Client**: Works with both rendering methods
- **Flexible**: Easy to customize and extend
- **Production-Ready**: Validated and tested
- **Well-Documented**: Multiple guides and examples

---

## 🆘 Need Help?

1. Check the **Quick Reference** for common tasks
2. Read the **Complete Guide** for detailed info
3. Review **example files** for implementation patterns
4. Check the **Checklist** if something's not working

---

## 🎉 You're Ready!

Everything is set up and ready to use. Start with the [Checklist](./GLOBAL_SETTINGS_CHECKLIST.md) to begin implementation.

**Happy coding!** 🚀
