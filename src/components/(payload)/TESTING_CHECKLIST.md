# Payload CMS Custom Components Testing Checklist

Use this checklist to verify all custom components are working correctly.

## 🚀 Pre-Testing Setup

- [ ] Development server is running (`npm run dev`)
- [ ] Admin panel is accessible at `/admin`
- [ ] You're logged in as an admin user
- [ ] Browser console is open (F12) to check for errors

## 📝 Component Testing

### 1. Logo & Icon (Graphics)

**Logo.tsx**

- [ ] Logo appears in the header (top-left area)
- [ ] Logo appears on login page
- [ ] Logo scales correctly (not too large/small)
- [ ] Logo alt text is appropriate
- [ ] Logo file path is correct

**Icon.tsx**

- [ ] Icon appears in collapsed sidebar
- [ ] Icon appears on mobile view
- [ ] Icon is properly sized (32x32px or similar)
- [ ] Icon is centered in its container

**How to Test**:

1. View admin panel on desktop
2. Collapse sidebar (if possible)
3. Resize browser to mobile width
4. Log out and check login page

---

### 2. Header Components

**Header.tsx** (Announcement Banner)

- [ ] Yellow banner appears at very top of admin
- [ ] Banner text is visible and readable
- [ ] Close button (×) is visible
- [ ] Clicking × dismisses the banner
- [ ] Banner doesn't reappear on page refresh (should reappear - this is expected)
- [ ] Banner doesn't interfere with other content

**How to Test**:

1. Load admin panel
2. Look for yellow banner at top
3. Click the × button
4. Verify banner disappears
5. Refresh page (banner should reappear - this is normal)

---

### 3. Actions (Header Buttons)

**Actions.tsx**

- [ ] "View Site" button appears in header (top-right area)
- [ ] "Clear Cache" button appears in header
- [ ] Buttons have proper styling (background, border)
- [ ] Hover states work (background changes)
- [ ] "View Site" opens website in new tab
- [ ] "Clear Cache" shows confirmation alert
- [ ] Clicking "Clear Cache" shows success message
- [ ] Icons (🌐, 🔄) display correctly

**How to Test**:

1. Look at top-right of admin header
2. Hover over each button
3. Click "View Site" → should open `/` in new tab
4. Click "Clear Cache" → should show alert

---

### 4. Navigation Components

**BeforeNavLinks.tsx**

- [ ] "MAIN NAVIGATION" label appears above nav links
- [ ] Label is properly styled (small, uppercase, bold)
- [ ] Label has proper spacing/padding
- [ ] Border appears below label (if styled)

**AfterNavLinks.tsx**

- [ ] "Quick Links" section appears below nav links
- [ ] "View Website" link is visible
- [ ] "Manage Properties" link is visible
- [ ] "Manage Posts" link is visible
- [ ] All links have proper icons (🌐, 🏠, 📝)
- [ ] Links are clickable
- [ ] Links navigate to correct pages
- [ ] Hover states work

**How to Test**:

1. Open sidebar (if collapsed)
2. Scroll through navigation
3. Find section header above links
4. Find Quick Links section below links
5. Click each quick link
6. Verify navigation works

---

### 5. Dashboard Components

**BeforeDashboard.tsx** (Welcome Banner)

- [ ] Purple gradient banner appears on dashboard
- [ ] "Welcome to Anderson Property Management" text visible
- [ ] Description text is visible and readable
- [ ] Banner has proper padding and spacing
- [ ] Gradient colors render correctly
- [ ] Text color contrasts well with background

**AfterDashboard.tsx** (Stats Grid)

- [ ] "Quick Stats" header appears below dashboard
- [ ] Stats grid displays correctly
- [ ] 4 stat cards are visible (Properties, Posts, Media, Portfolios)
- [ ] Cards have proper spacing (gap between them)
- [ ] Cards have background and border
- [ ] Card labels are readable
- [ ] Counts display (even if showing "—")
- [ ] Grid is responsive (wraps on small screens)

**How to Test**:

1. Navigate to Dashboard (`/admin`)
2. Look for welcome banner at top
3. Scroll down past default dashboard content
4. Find Quick Stats section
5. Resize browser to test responsive grid

---

### 6. Login Components

**BeforeLogin.tsx**

- [ ] "Anderson Property Management" header visible
- [ ] "Admin Portal" subtitle visible
- [ ] Text is centered
- [ ] Proper spacing above login form
- [ ] Text is readable

**AfterLogin.tsx**

- [ ] Help text appears below login form
- [ ] Text is centered and readable
- [ ] Proper spacing below login form

**How to Test**:

1. Log out of admin panel
2. Visit `/admin` (should redirect to login)
3. Check for custom header above form
4. Check for help text below form
5. Verify spacing looks good

---

### 7. Settings Menu

**SettingsMenu.tsx**

- [ ] Gear icon (⚙️) appears above logout button
- [ ] Clicking gear icon opens popup menu
- [ ] Menu displays both component groups
- [ ] **Group 1** (SettingsMenu):
  - [ ] "🔄 Clear Cache" option visible
  - [ ] "👥 Manage Users" option visible
  - [ ] "🌐 View Website" option visible
- [ ] **Group 2** (SystemActions):
  - [ ] "🔧 System Diagnostics" option visible
  - [ ] "📊 Health Check" option visible
- [ ] All menu items are clickable
- [ ] "Clear Cache" shows confirmation
- [ ] "Manage Users" navigates correctly
- [ ] "View Website" opens in new tab
- [ ] "System Diagnostics" shows alert
- [ ] "Health Check" opens endpoint
- [ ] Menu closes after clicking item
- [ ] Menu can be closed by clicking outside

**How to Test**:

1. Look for gear icon in sidebar (above logout)
2. Click the gear icon
3. Verify popup menu appears
4. Test each menu item
5. Verify actions work correctly

---

### 8. Logout Button

**LogoutButton.tsx**

- [ ] Red logout button appears at bottom of sidebar
- [ ] Button has proper styling (red background)
- [ ] Button has logout icon (🚪)
- [ ] Button text says "Logout"
- [ ] Hover state works (darker red)
- [ ] Clicking button shows confirmation dialog
- [ ] Confirming logs user out
- [ ] Canceling keeps user logged in

**How to Test**:

1. Find logout button at bottom of sidebar
2. Hover over button (should turn darker)
3. Click button
4. Click "Cancel" in confirmation → should stay logged in
5. Click button again
6. Click "OK" in confirmation → should log out

---

## 🎨 Styling & Theme Testing

### Light/Dark Mode

- [ ] All components render in light mode
- [ ] All components render in dark mode (if supported)
- [ ] Text is readable in both modes
- [ ] Colors adapt to theme
- [ ] CSS variables work correctly

### Responsive Design

- [ ] Components work on desktop (1920px)
- [ ] Components work on laptop (1366px)
- [ ] Components work on tablet (768px)
- [ ] Components work on mobile (375px)
- [ ] Sidebar collapses on mobile
- [ ] Quick Stats grid wraps on small screens
- [ ] Header actions stack if needed

### Browser Compatibility

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] No console errors in any browser

**How to Test**:

1. Toggle theme (if Payload supports it)
2. Resize browser to different widths
3. Test in different browsers
4. Check console for errors

---

## 🔧 Functionality Testing

### Interactive Elements

- [ ] All buttons are clickable
- [ ] All links navigate correctly
- [ ] Hover states work
- [ ] Focus states work (keyboard navigation)
- [ ] Confirmations show for destructive actions

### Navigation

- [ ] Quick links navigate to correct pages
- [ ] "View Site" opens correct URL
- [ ] Settings menu items navigate correctly
- [ ] All internal links use Payload's router

### Performance

- [ ] Components load quickly
- [ ] No layout shift when components render
- [ ] Images load properly
- [ ] No console warnings or errors

**How to Test**:

1. Navigate through admin panel
2. Click all interactive elements
3. Use Tab key to test keyboard nav
4. Check console for errors/warnings

---

## 🐛 Error Scenarios

### Missing Logo Files

- [ ] If logo.svg missing, component handles gracefully
- [ ] If icon.svg missing, component handles gracefully
- [ ] Alt text displays if images fail

### Empty Collections

- [ ] Stats grid shows "—" when collection count unavailable
- [ ] No JavaScript errors with empty collections

### Network Errors

- [ ] Components still render if API calls fail
- [ ] Error handling works for async operations

**How to Test**:

1. Temporarily rename logo files
2. Check what happens
3. Restore files
4. Test with no collections
5. Test with network throttling

---

## 📊 Final Verification

### Visual Polish

- [ ] No overlapping content
- [ ] Proper spacing throughout
- [ ] Consistent font sizes
- [ ] Consistent colors
- [ ] Icons display correctly
- [ ] No visual glitches

### User Experience

- [ ] Components enhance admin experience
- [ ] Nothing feels broken or out of place
- [ ] Branding is consistent
- [ ] Information is clear and helpful

### Code Quality

- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] No console errors
- [ ] No console warnings
- [ ] Clean browser network tab

**How to Test**:

1. Run `npm run build` (should succeed)
2. Check browser console (should be clean)
3. Review visual appearance
4. Get feedback from team

---

## ✅ Sign-Off Checklist

After completing all tests above:

- [ ] All components render correctly
- [ ] All interactive features work
- [ ] No console errors
- [ ] Responsive on all screen sizes
- [ ] Tested in multiple browsers
- [ ] Logo/icon files added and working
- [ ] Branding text customized
- [ ] Team has reviewed and approved
- [ ] Ready for production

---

## 📝 Notes

Use this section to note any issues found:

```
Issue:
Component:
Expected:
Actual:
Browser:
Screenshot:
```

---

## 🎉 Testing Complete!

If all items are checked, your Payload CMS custom components are ready to use!

**Date Tested**: _______________  
**Tested By**: _______________  
**Environment**: Development / Staging / Production  
**Result**: ✅ Pass / ❌ Fail

**Notes**:
