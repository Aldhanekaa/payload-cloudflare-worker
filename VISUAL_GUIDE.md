# Enhanced Sidebar - Visual Guide

## 🎨 What Your Sidebar Looks Like

```
┌─────┬──────────────────────────────────────────────┐
│     │                                              │
│  🏠 │  Dashboard                                   │
│     │                                              │
├─────┼──────────────────────────────────────────────┤
│     │                                              │
│  📄 │  Content                                     │
│  *  │    ├─ Pages                                 │
│     │    ├─ Posts                                 │
│     │    ├─ Categories                            │
│     │    └─ Media                                 │
│     │                                              │
├─────┼──────────────────────────────────────────────┤
│     │                                              │
│  🏢 │  Properties                                  │
│     │    Quick Links                              │
│     │    ├─ All Properties                        │
│     │    Properties                               │
│     │    ├─ Properties            [123]           │
│     │    ├─ Property Types                        │
│     │    ├─ Property Categories                   │
│     │    ├─ Cities                                │
│     │    └─ Portfolios                            │
│     │                                              │
├─────┼──────────────────────────────────────────────┤
│     │                                              │
│  🤖 │  FIRST Robotics                             │
│     │    Quick Access                             │
│     │    ├─ Seasons Overview                      │
│     │    Management                               │
│     │    ├─ Seasons                               │
│     │    ├─ Events                                │
│     │    ├─ Students                              │
│     │    ├─ Teams                                 │
│     │    ├─ Student Registrations  [5]            │
│     │    ├─ Team Registrations     [3]            │
│     │    ├─ Season Games                          │
│     │    ├─ Leadership Awards                     │
│     │    └─ Schools                               │
│     │                                              │
├─────┼──────────────────────────────────────────────┤
│     │                                              │
│  👥 │  Community                                   │
│     │    ├─ Testimonials                          │
│     │    └─ Partners                              │
│     │                                              │
├─────┤                                              │
│     │                                              │
│     │                                              │
│     │                                              │
├─────┤                                              │
│     │                                              │
│  ⚙️ │  Settings                                    │
│     │    └─ Users                                 │
│     │                                              │
├─────┤                                              │
│     │                                              │
│  🚪 │  [Logout Button]                            │
│     │                                              │
└─────┴──────────────────────────────────────────────┘
  ↑                    ↑
  Tab Bar          Navigation Panel
  (Always           (Shows when
  visible)          tab is active)
```

## 🔍 Tab States

### Active Tab

```
┌─────┐
│  📄 │  ← Highlighted background
│  *  │  ← Left blue indicator bar
└─────┘
```

### Inactive Tab

```
┌─────┐
│  🏢 │  ← Gray background
│     │  ← No indicator
└─────┘
```

### Tab with Badge

```
┌─────┐
│  🤖 │  ← Icon
│ [5] │  ← Badge count (blue)
└─────┘
```

## 🏷️ Badge Colors

```
[5]   ← Default (Gray)   - Information
[5]   ← Primary (Blue)   - Important
[5]   ← Success (Green)  - Positive
[5]   ← Warning (Orange) - Attention
[5]   ← Error (Red)      - Critical
```

## 📱 Responsive Behavior

### Desktop (> 1024px)

```
┌─────┬──────────────────────┐
│ Tab │   Navigation         │
│ Bar │   Content            │
│     │   (Full width)       │
└─────┴──────────────────────┘
```

### Tablet (768px - 1024px)

```
┌─────┬──────────────┐
│ Tab │ Navigation   │
│ Bar │ Content      │
│     │ (Compressed) │
└─────┴──────────────┘
```

### Mobile (< 768px)

```
┌─────┐
│ Tab │  ← Collapsible
│ Bar │
└─────┘
   ↓ (Tap to expand)
┌──────────────────┐
│   Navigation     │
│   Content        │
└──────────────────┘
```

## 🎯 Navigation Hierarchy

```
Tab Level (Vertical Bar)
  └─ Group Level (Bold text)
      └─ Item Level (Regular text)
          └─ Badge (Count or status)
```

### Example:

```
🤖 FIRST Robotics (Tab)
  └─ Quick Access (Group)
      └─ Seasons Overview (Item)
  └─ Management (Group)
      └─ Students (Item)
      └─ Student Registrations [5] (Item with badge)
```

## 🖱️ Interaction Patterns

### Tab Click Behavior

**Regular Tab** (type: 'tab')

```
Click → Opens navigation panel
Click again → No action (stays open)
```

**Link Tab** (type: 'link')

```
Click → Navigates to href
Panel → Does not open
```

**Tab with href** (hybrid)

```
Click → Navigates AND opens panel
Cmd/Ctrl+Click → Opens in new tab
```

### Navigation Item Click

**Collection**

```
Click → Navigate to collection list
```

**Custom Link**

```
Click → Navigate to href
External → Opens in new tab
```

## 📊 Badge Update Cycle

```
Page Load
  ↓
Fetch Collection Counts
  ↓
Display Badges
  ↓
[Optional] Polling/WebSocket
  ↓
Update Badges (Real-time)
```

## 🎨 Color Scheme

### Light Mode

```
Background:     #FFFFFF
Tab Bar:        #F7F7F7
Active Tab:     #E6F0FF
Text:           #1A1A1A
Badge Primary:  #0066CC
```

### Dark Mode

```
Background:     #1A1A1A
Tab Bar:        #2A2A2A
Active Tab:     #1E3A5F
Text:           #FFFFFF
Badge Primary:  #4D9FFF
```

## 🔄 State Flow Diagram

```
┌──────────────┐
│ User Loads   │
│ Admin Panel  │
└──────┬───────┘
       ↓
┌──────────────┐
│ Initialize   │
│ Sidebar      │
└──────┬───────┘
       ↓
┌──────────────┐
│ Render Tabs  │
│ (6 tabs)     │
└──────┬───────┘
       ↓
┌──────────────┐
│ User Clicks  │
│ Tab          │
└──────┬───────┘
       ↓
┌──────────────┐    ┌──────────────┐
│ Show Panel   │───→│ Fetch Badges │
└──────────────┘    └──────┬───────┘
                            ↓
                    ┌──────────────┐
                    │ Display      │
                    │ Collections  │
                    └──────────────┘
```

## 🎯 Quick Visual Reference

| Feature         | Visual Indicator                 |
| --------------- | -------------------------------- |
| Active Tab      | Blue left border + highlight     |
| Inactive Tab    | Gray background                  |
| Badge Count     | Small colored circle with number |
| Group Header    | Bold text                        |
| Collection Item | Regular text with icon           |
| Quick Link      | Text with arrow icon             |
| External Link   | Text with external icon          |
| Current Page    | Blue highlight on item           |
| Logout Button   | Icon at bottom of tab bar        |

## 📐 Dimensions

```
Tab Bar Width:     60px (collapsed) / 240px (expanded)
Tab Icon Size:     20px × 20px
Badge Size:        16px diameter (min)
Group Padding:     12px vertical
Item Height:       32px
Item Padding:      8px horizontal
```

## 🌟 Keyboard Navigation

```
Tab Key       → Move between tabs
Enter/Space   → Activate tab
Arrow Keys    → Navigate items within panel
Escape        → Close panel (mobile)
```

---

This visual guide helps you understand how the enhanced sidebar appears and behaves in your Payload CMS admin panel.
