

# Skill Compass

**Version:** 1.0
**Design Language:** Modern SaaS Dashboard
**Theme:** Dark + Glassmorphism + Minimal
**Design Tool:** Stitch (Antigravity 2.0)
**Frontend:** React + Tailwind CSS + Framer Motion

---

# 1. Design Philosophy

Skill Compass should feel like a premium developer tool rather than a traditional educational platform.

The interface should communicate:

* Professionalism
* Simplicity
* Intelligence
* Trust
* Speed

Every screen should focus on helping users understand their career status without overwhelming them.

The UI should follow the principle:

> **"Show only what matters, beautifully."**

---

# 2. Design Inspiration

The overall design language is inspired by:

* Linear
* Vercel
* Raycast
* Notion
* Apple Human Interface Guidelines
* Stripe Dashboard
* Arc Browser
* GitHub Dark Theme

---

# 3. Design Principles

### Minimal First

Remove unnecessary UI.

Every component should have a purpose.

---

### Content First

The user's data is the hero.

Decorations should never distract.

---

### Soft Depth

Use glassmorphism subtly.

Never make the interface look blurry or difficult to read.

---

### Consistency

Spacing

Typography

Animations

Buttons

Cards

Forms

Icons

Everything should follow one unified system.

---

### Responsive by Default

Desktop

Tablet

Mobile

Every page must work beautifully.

---

# 4. Theme

## Primary Theme

Dark Mode Only (MVP)

Future

Light Mode

---

## Mood

Modern

Premium

Elegant

Professional

Minimal

---

# 5. Color Palette

## Background

```text
#0A0A0A
```

---

## Surface

```text
rgba(255,255,255,0.06)
```

Glass Card

---

## Primary

```text
#4F8CFF
```

---

## Secondary

```text
#8B5CF6
```

---

## Success

```text
#22C55E
```

---

## Warning

```text
#F59E0B
```

---

## Danger

```text
#EF4444
```

---

## Text Primary

```text
#FFFFFF
```

---

## Text Secondary

```text
#A1A1AA
```

---

## Border

```text
rgba(255,255,255,.08)
```

---

# 6. Glassmorphism Rules

Glass effect should be subtle.

Card Style

```css
background: rgba(255,255,255,.06);

backdrop-filter: blur(18px);

border:1px solid rgba(255,255,255,.08);

box-shadow:
0 8px 32px rgba(0,0,0,.35);
```

Never use heavy blur.

Never stack multiple glass layers.

---

# 7. Typography

Font Family

```text
Inter
```

Fallback

```text
system-ui
```

---

Heading

700

Large

---

Subheading

600

---

Body

400

---

Caption

400

Small

Muted

---

Never use more than three font weights.

---

# 8. Grid System

Base

8px

Spacing

```text
4

8

12

16

24

32

48

64
```

Never use random spacing.

---

# 9. Border Radius

Buttons

12px

Cards

20px

Inputs

12px

Dialogs

24px

Charts

20px

---

# 10. Shadows

Use soft shadows only.

Avoid material design shadows.

```css
0 8px 24px rgba(0,0,0,.35)
```

---

# 11. Icons

Library

Lucide React

Icon Size

20px

24px

32px

Never mix icon libraries.

---

# 12. Buttons

Primary

Filled

Blue

Rounded

---

Secondary

Glass

Border

---

Danger

Red

---

Ghost

Transparent

---

Button height

48px

---

# 13. Inputs

Rounded

Glass Surface

Floating Label (optional)

Focus State

Blue Border

Subtle Glow

Validation

Red Border

Error Message Below

---

# 14. Cards

Cards are the core UI component.

Every dashboard element should be a reusable card.

Card contains

Title

Description

Content

Optional Action

---

# 15. Navigation

Desktop

Left Sidebar

Top Navigation

Content Area

---

Sidebar Width

280px

Collapsed

80px

---

Navigation Items

Dashboard

Analysis

History

Recommendations

Evidence

AI Assistant

Profile

Settings

---

# 16. Dashboard Layout

```
----------------------------------------------------

Sidebar

----------------------------------------------------

Top Navigation

----------------------------------------------------

Score Cards

----------------------------------------------------

Charts

----------------------------------------------------

Recommendations

----------------------------------------------------

Evidence

----------------------------------------------------

History

----------------------------------------------------
```

The dashboard should prioritize the user's **Market Relevance Score**, making it the first metric visible upon login.

---

# 17. Landing Page

Sections

Hero

Features

How it Works

Testimonials (optional)

FAQ

Footer

CTA

---

Hero Layout

Left

Headline

Subheading

Buttons

Right

3D Dashboard Mockup

Glass Cards

Animated Illustration

---

# 18. Authentication Pages

Centered Card

Glass Effect

Logo

Heading

Inputs

Social Login

CTA

Minimal Footer

---

# 19. Dashboard Components

Score Card

Trend Card

Recommendation Card

Skill Card

Chart Card

History Card

Evidence Card

Activity Card

---

# 20. Charts

Library

Recharts

Charts

Line

Bar

Pie

Area

All charts

Glass Card

Rounded

Animated

Responsive

---

# 21. Tables

Rounded

Hover Effect

Alternating Row Background (optional)

Sticky Header

Pagination

Search

---

# 22. AI Chat Interface

Floating Chat Button

Modern Conversation UI

Markdown Support

Code Blocks

Suggested Questions

Typing Indicator

Streaming Responses

---

# 23. Animations

Library

Framer Motion

Animation Duration

150–300ms

Allowed

Fade

Slide

Scale

Hover

Expand

Collapse

Avoid

Bounce

Elastic

Flash

Heavy Parallax

---

# 24. Micro Interactions

Hover Elevation

Button Ripple (subtle)

Card Glow

Smooth Loading

Progress Animation

Score Count Up

Skeleton Loading

---

# 25. Loading States

Skeleton UI

Progress Bar

Spinner (minimal)

Avoid blank screens.

---

# 26. Empty States

Every empty page should include:

Illustration

Message

Action Button

Example

"No reports yet"

↓

"Run your first Skill Analysis"

---

# 27. Notifications

Toast

Top Right

Auto Dismiss

Success

Green

Warning

Orange

Error

Red

Info

Blue

---

# 28. Modals

Blur Background

Glass Card

Rounded

Animated

Close Button

Escape Key Support

---

# 29. Responsive Breakpoints

```text
Mobile

<640

Tablet

640–1024

Desktop

1024+

Large Desktop

1440+
```

---

# 30. Accessibility

WCAG AA Contrast

Keyboard Navigation

ARIA Labels

Visible Focus States

Semantic HTML

Screen Reader Friendly

---

# 31. UI Components Library

Reusable components:

* Button
* Input
* Select
* Textarea
* Checkbox
* Radio
* Switch
* Badge
* Avatar
* Card
* Modal
* Drawer
* Sidebar
* Navbar
* Tabs
* Accordion
* Tooltip
* Toast
* Progress
* Skeleton
* Chart Card
* Data Table
* Pagination
* Search Bar
* Empty State
* Loading State
* Error State

All components must support dark mode and be designed for reuse.

---

# 32. Motion Guidelines

Hover

1.02 Scale

Cards

Lift 4px

Buttons

Soft Glow

Transitions

200ms ease

Never over-animate.

Motion should reinforce usability, not distract from it.

---

# 33. AI Design Rules (Stitch + Antigravity 2.0)

All generated UI must adhere to these constraints:

* Production-ready React components only.
* Tailwind CSS exclusively for styling.
* Component-driven architecture.
* Mobile-first responsive layouts.
* Follow the established design tokens (colors, spacing, typography).
* Use reusable UI primitives instead of page-specific implementations.
* Ensure accessibility (keyboard navigation, focus states, ARIA labels).
* Keep glassmorphism subtle and readable.
* Use Framer Motion only for meaningful transitions.
* Validate visual consistency before merging any UI changes.

---

# 34. Definition of Done (UI)

A screen is complete only if:

* Pixel-perfect alignment.
* Responsive on all breakpoints.
* Accessible (WCAG AA where practical).
* Uses only approved design tokens.
* Reuses existing components where possible.
* Passes visual QA.
* Smooth animations without jank.
* No layout shifts.
* Consistent spacing and typography.
* Tested in Chrome, Edge, and Firefox.

---

# 35. Design Vision

Skill Compass should feel like a modern AI operating system for career growth—not just another dashboard.

Users should experience:

* Clarity instead of complexity.
* Confidence instead of uncertainty.
* Actionable insights instead of raw data.
* A premium product that developers, students, and professionals enjoy using every day.

The interface should quietly communicate intelligence, trust, and precision while allowing the user's progress and career journey to remain the focal point.
