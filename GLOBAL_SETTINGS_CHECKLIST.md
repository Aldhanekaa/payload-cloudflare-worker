# Global Settings - Implementation Checklist ✅

Use this checklist to implement the global settings system in your application.

## Phase 1: Verification ✅ (Already Complete)

- [x] Core configuration created (`config.ts`)
- [x] TypeScript types defined (`types.ts`)
- [x] Server utilities created (`server.ts`)
- [x] Client hook created (`useGlobalSettings.tsx`)
- [x] Helper functions implemented
- [x] Components created (AnnouncementBanner, WhatsAppButton)
- [x] Styles created (SCSS modules)
- [x] Documentation written
- [x] Example files created
- [x] All files validated (zero TypeScript errors)

## Phase 2: Initial Setup (To Do)

### 1. Restart Development Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
# or
yarn dev
```

- [ ] Development server restarted
- [ ] No build errors shown

### 2. Access Payload CMS Admin

- [ ] Navigate to `http://localhost:3000/admin` (or your admin URL)
- [ ] Log in with your admin credentials
- [ ] Verify "Global Settings" appears in the sidebar under "Globals"

### 3. Configure Global Settings

#### Contact Information Tab

- [ ] Click on "Global Settings"
- [ ] Go to "Contact Information" tab
- [ ] Fill in WhatsApp details:
  - [ ] Country Code (e.g., `+971`, `+1`, `+44`)
  - [ ] WhatsApp Number (numbers only, e.g., `501234567`)
  - [ ] Display Text (optional, e.g., "Contact us on WhatsApp")
- [ ] Add Schedule Consultation Link (e.g., Calendly URL)
- [ ] Click "Save"

#### Announcements Tab

- [ ] Go to "Announcements" tab
- [ ] Click "Add Announcement"
- [ ] Fill in first announcement:
  - [ ] Check "Active"
  - [ ] Select Priority (high/normal/low)
  - [ ] Enter announcement text
  - [ ] (Optional) Add link with label
  - [ ] (Optional) Set start/end dates
- [ ] Click "Save"

#### Promotions Tab

- [ ] Go to "Promotions" tab
- [ ] (Optional) Add current season promotion link
- [ ] Click "Save"

### 4. Verify API Endpoint

```bash
# Open in browser or use curl
curl http://localhost:3000/api/globals/global-settings
```

- [ ] API returns JSON data
- [ ] WhatsApp data is present
- [ ] Announcements array exists
- [ ] No errors in response

## Phase 3: Integration (To Do)

### 1. Integrate into Root Layout

**Option A: Update Existing Layout**

Find your root layout file and add:

```typescript
import { getGlobalSettings } from '@/(payload)/globals/Global_Settings'
import { getActiveAnnouncements } from '@/(payload)/globals/Global_Settings/types'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'

// Add to your layout component
const settings = await getGlobalSettings()
const announcements = settings ? getActiveAnnouncements(settings.announcements) : []
```

**Option B: Use Example File**

- [ ] Review `src/app/(frontend)/layout.example.tsx`
- [ ] Adapt to your existing layout structure
- [ ] Copy relevant sections

**Your Progress:**

- [ ] Imports added to layout
- [ ] Settings fetched in layout
- [ ] AnnouncementBanner component added
- [ ] WhatsAppButton component added
- [ ] Layout saved and working

### 2. Test Announcement Banner

- [ ] Navigate to your site's homepage
- [ ] Announcement banner appears at the top
- [ ] Banner shows correct priority color:
  - High priority = Red background
  - Normal priority = Blue background
  - Low priority = Green background
- [ ] Link works (if added)
- [ ] Banner is responsive on mobile

### 3. Test WhatsApp Button

- [ ] Floating WhatsApp button appears (bottom right)
- [ ] Button shows WhatsApp icon
- [ ] Clicking button opens WhatsApp:
  - Mobile: Opens WhatsApp app
  - Desktop: Opens WhatsApp Web
- [ ] Pre-filled message appears (if configured)
- [ ] Button is visible but not intrusive

### 4. Test on Different Devices

- [ ] Desktop browser - announcements look good
- [ ] Desktop browser - WhatsApp button positioned correctly
- [ ] Tablet view - responsive layout works
- [ ] Mobile view - announcements stack properly
- [ ] Mobile view - WhatsApp button opens app

## Phase 4: Optional Enhancements (To Do)

### 1. Add to Contact Page

- [ ] Review `src/app/(frontend)/[locale]/contact/page.example.tsx`
- [ ] Create or update contact page
- [ ] Add WhatsApp section
- [ ] Add schedule consultation section
- [ ] Test all links work

### 2. Add to Footer

```typescript
import { getWhatsAppContact } from '@/(payload)/globals/Global_Settings'

const whatsapp = await getWhatsAppContact()
```

- [ ] Add WhatsApp link to footer
- [ ] Add consultation link to footer
- [ ] Style to match footer design

### 3. Customize Styling

**AnnouncementBanner Styles:**

- [ ] Open `src/components/AnnouncementBanner/styles.module.scss`
- [ ] Adjust colors to match brand
- [ ] Modify padding/spacing
- [ ] Update typography

**WhatsAppButton Styles:**

- [ ] Open `src/components/WhatsAppButton/styles.module.scss`
- [ ] Adjust button size
- [ ] Modify position (if using floating variant)
- [ ] Update hover effects
- [ ] Change colors (keep WhatsApp green or match brand)

### 4. Seed Sample Data (Optional)

```bash
# In your seed route or script, add:
import { seedGlobalSettings } from '@/(payload)/globals/Global_Settings/seed'
await seedGlobalSettings()
```

- [ ] Import seed function
- [ ] Run seed script
- [ ] Verify data in Payload CMS
- [ ] Update sample data for your region

### 5. Multi-language Support (If needed)

- [ ] Add locale-specific announcements
- [ ] Translate WhatsApp display text
- [ ] Update helper functions for i18n

## Phase 5: Production Readiness (To Do)

### 1. Update Settings for Production

- [ ] Replace sample phone number with real number
- [ ] Update consultation link to real URL
- [ ] Create real announcements
- [ ] Remove or disable test announcements
- [ ] Verify all links are correct

### 2. Test in Production Mode

```bash
npm run build
npm run start
```

- [ ] Build completes without errors
- [ ] Settings load correctly in production
- [ ] Announcements display properly
- [ ] WhatsApp links work in production
- [ ] No console errors

### 3. Performance Check

- [ ] Page load time acceptable
- [ ] No layout shift when announcements load
- [ ] WhatsApp button doesn't block content
- [ ] Mobile performance is good

### 4. Security Review

- [ ] No sensitive data in global settings
- [ ] Phone number is meant to be public
- [ ] Links are validated and safe
- [ ] Admin access is properly restricted

### 5. Analytics (Optional)

- [ ] Track WhatsApp button clicks
- [ ] Track announcement link clicks
- [ ] Track consultation booking clicks
- [ ] Monitor announcement engagement

## Phase 6: Maintenance (Ongoing)

### Regular Tasks

- [ ] Update announcements as needed
- [ ] Check announcement dates (remove expired)
- [ ] Monitor WhatsApp message volume
- [ ] Update consultation link if booking system changes
- [ ] Review and archive old announcements

### Monthly Review

- [ ] Check which announcements performed best
- [ ] Update priority levels based on importance
- [ ] Refresh seasonal promotions
- [ ] Verify all links still work

### Documentation

- [ ] Train team on updating settings
- [ ] Document announcement best practices
- [ ] Create style guide for announcements
- [ ] Share Quick Reference with team

## Troubleshooting Checklist

### Issue: Settings Not Showing

- [ ] Check if dev server is running
- [ ] Verify settings saved in Payload CMS
- [ ] Check browser console for errors
- [ ] Verify API endpoint returns data
- [ ] Clear browser cache and reload

### Issue: WhatsApp Link Not Working

- [ ] Verify country code has + symbol
- [ ] Check phone number has no spaces or special characters
- [ ] Test link format: `https://wa.me/+countrycodenumber`
- [ ] Try on different device (mobile vs desktop)

### Issue: Announcements Not Filtering

- [ ] Check `isActive` is true
- [ ] Verify start date is in the past (or null)
- [ ] Verify end date is in the future (or null)
- [ ] Check timezone settings

### Issue: Styling Problems

- [ ] Verify SCSS modules are imported
- [ ] Check for CSS conflicts with global styles
- [ ] Inspect element in browser DevTools
- [ ] Test on different browsers

## Success Criteria

Your implementation is complete when:

- [x] ✅ All files created and validated
- [ ] ✅ Settings configured in Payload CMS
- [ ] ✅ Announcement banner displays on site
- [ ] ✅ WhatsApp button works correctly
- [ ] ✅ Mobile responsive design verified
- [ ] ✅ All links tested and working
- [ ] ✅ Production-ready settings configured
- [ ] ✅ Team trained on updating settings

## Resources

- **Complete Guide**: `GLOBAL_SETTINGS_GUIDE.md`
- **Quick Reference**: `GLOBAL_SETTINGS_QUICK_REFERENCE.md`
- **Architecture**: `GLOBAL_SETTINGS_ARCHITECTURE.md`
- **Implementation Summary**: `GLOBAL_SETTINGS_IMPLEMENTATION_COMPLETE.md`

---

## Need Help?

Refer to the documentation files included in this implementation:

1. Start with **GLOBAL_SETTINGS_QUICK_REFERENCE.md** for common tasks
2. Read **GLOBAL_SETTINGS_GUIDE.md** for detailed explanations
3. Check **GLOBAL_SETTINGS_ARCHITECTURE.md** for technical details
4. Review example files for implementation patterns

**Your global settings system is ready to go! Start with Phase 2 and work through each section.** 🚀
