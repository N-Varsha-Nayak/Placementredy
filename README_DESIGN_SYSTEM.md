# KodNest Premium Build System

A production-ready design system for serious B2C SaaS products. Not flashy. Not loud. Calm, intentional, coherent, and confident.

## Design Philosophy

- **Calm**: No unnecessary animations, gradients, or visual noise
- **Intentional**: Every design decision serves a purpose
- **Coherent**: Consistent patterns throughout, designed by one mind
- **Confident**: Bold typography and proven patterns

### Core Constraints

- ✗ No gradients
- ✗ No glassmorphism  
- ✗ No neon colors
- ✗ No animation noise
- ✓ Maximum 4 colors across entire system
- ✓ Strict 8px spacing scale
- ✓ Clear typography hierarchy
- ✓ Predictable interaction patterns

## Quick Navigation

### For Getting Started
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** — Component cheat sheet, CSS variables, code examples
- **[DesignSystemShowcase.jsx](src/components/DesignSystemShowcase.jsx)** — Interactive demo of all components

### For In-Depth Understanding
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** — Complete documentation with philosophy, guidelines, and best practices
- **[IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md)** — Checklist to ensure consistency when building features

### Source Files
- **[/src/design-system/](src/design-system/)** — Design tokens, base styles, component styles, layout
- **[/src/components/](src/components/)** — Reusable React components

## File Structure

```
/
├── DESIGN_SYSTEM.md                   # Full documentation (read this first)
├── QUICK_REFERENCE.md                 # Quick cheat sheet
├── IMPLEMENTATION_CHECKLIST.md        # Review checklist
├── README.md                          # This file
│
└── src/
    ├── design-system/
    │   ├── tokens.css                 # Design variables
    │   ├── base.css                   # Typography & global styles
    │   ├── components.css             # Component styles
    │   └── layout.css                 # Layout structure
    │
    ├── components/
    │   ├── Layout.jsx                 # TopBar, ContextHeader, WorkspaceContainer, etc.
    │   ├── Components.jsx             # Button, Input, Card, Alert, Badge, etc.
    │   └── DesignSystemShowcase.jsx   # Demo/showcase component
    │
    ├── App.jsx                        # Main app (uses DesignSystemShowcase)
    ├── App.css                        # App-specific styles (minimal)
    ├── index.css                      # Imports all design system CSS
    └── main.jsx                       # React entry point
```

## Color System

**Maximum 4 colors across entire system:**

| Name | Hex | Usage |
|------|-----|-------|
| Background | #F7F6F3 | Page background |
| Text | #111111 | Primary text |
| Accent | #8B0000 | Actions, links, highlights |
| Success | #4A6B4A | Positive feedback |
| Warning | #8B7535 | Alerts, cautions |
| Error | #8B0000 | Errors, destructive |

Access via CSS: `color: var(--color-accent);`

## Spacing System

**Strict 8px base unit scale:**

```
8px   → var(--spacing-xs)  or var(--space-1)
16px  → var(--spacing-sm)  or var(--space-2)
24px  → var(--spacing-md)  or var(--space-3)
40px  → var(--spacing-lg)  or var(--space-4)
64px  → var(--spacing-xl)  or var(--space-5)
```

**Never use:** 13px, 27px, 37px, 51px, or other random values.

## Typography

**Headings**: Serif (Georgia, Garamond)  
**Body**: Sans-serif (system fonts)

| Level | Family | Size | Weight |
|-------|--------|------|--------|
| h1 | Serif | 56px | 700 |
| h2 | Serif | 48px | 700 |
| h3 | Serif | 40px | 700 |
| h4 | Serif | 24px | 700 |
| h5 | Sans | 20px | 600 |
| h6 | Sans | 16px | 600 |
| body | Sans | 16px | 400 |
| small | Sans | 14px | 400 |

Line heights: `1.4` (headings), `1.6` (body), `1.8` (prose)

## Global Layout

Every page follows this structure:

```
┌─────────────────────────────────────────────┐
│ TOP BAR: [Project]    [Progress]    [Status]│
├─────────────────────────────────────────────┤
│ CONTEXT HEADER: Large Title + Subtitle      │
├──────────────────────┬──────────────────────┤
│                      │                      │
│  PRIMARY WORKSPACE   │  SECONDARY PANEL     │
│      (70%)           │       (30%)          │
│                      │                      │
│  • Cards             │  • Explanation       │
│  • Content           │  • Prompt box        │
│  • Forms             │  • Action buttons    │
│                      │                      │
├──────────────────────┴──────────────────────┤
│ PROOF FOOTER: □ UI Built □ Logic ...       │
└─────────────────────────────────────────────┘
```

## Components Overview

### Layout Components

- **TopBar** — Project name, progress indicator, status badge
- **ContextHeader** — Page title and description
- **WorkspaceContainer** — Primary (70%) + Secondary (30%) layout
- **PanelSection** — Sidebar section with title
- **PromptBox** — Copyable text block
- **ProofFooter** — Persistent checklist at bottom

### UI Components

- **Button** — Primary, secondary, tertiary; small, medium, large
- **Input** — Text input with label, help text, error state
- **Textarea** — Multi-line input
- **Select** — Dropdown selector
- **Card** — Content container with title, subtitle, body, footer
- **Badge** — Small status indicator
- **Alert** — Success, warning, error, info messaging
- **Progress** — Visual progress bar
- **Divider** — Subtle horizontal line

## Usage Example

```jsx
import {
  TopBar,
  ContextHeader,
  WorkspaceContainer,
  PanelSection,
  PromptBox,
  ProofFooter,
} from './components/Layout';

import { Button, Card, Input, Alert } from './components/Components';

export default function MyPage() {
  return (
    <div className="app">
      <TopBar
        projectName="My App"
        step={1}
        totalSteps={3}
        status="In Progress"
      />

      <ContextHeader
        title="Build the Dashboard"
        subtitle="Design and implement the main interface"
      />

      <WorkspaceContainer
        primaryContent={
          <Card title="Main Content">
            <Input label="Email" type="email" />
            <Button variant="primary">Submit</Button>
          </Card>
        }
        secondaryContent={
          <>
            <PanelSection title="Instructions">
              <p>Follow these steps to complete this task.</p>
            </PanelSection>
            <PanelSection title="Copyable Prompt">
              <PromptBox prompt="Your AI prompt text" />
            </PanelSection>
            <div style={{ display: 'flex', gap: 'var(--spacing-xs)', flexDirection: 'column' }}>
              <Button variant="primary">Build in Lovable</Button>
              <Button variant="secondary">It Worked</Button>
            </div>
          </>
        }
      />

      <ProofFooter />
    </div>
  );
}
```

## Key Features

✓ **Consistent** — All elements follow the same design language  
✓ **Predictable** — Similar components behave similarly  
✓ **Accessible** — Proper focus states, color contrast  
✓ **Responsive** — Adapts from mobile to desktop  
✓ **Variable-driven** — All styles use CSS custom properties  
✓ **Lightweight** — Minimal CSS, no heavy framework  
✓ **Production-ready** — Built for serious products  

## Interaction Patterns

### Buttons
- Hover: Smooth color transition (200ms)
- Focus: 2px outline in accent color
- Active: Subtle 1px downward movement
- Disabled: 50% opacity, not-allowed cursor

### Form Inputs
- Default: 1px border, subtle gray
- Hover: Lighter gray border
- Focus: Sharp accent color border, no outline
- Error: Red border + error text
- Placeholder: Tertiary gray text

### Cards
- Border: 1px subtle gray, no shadow
- Padding: 24px
- Hover: Slightly lighter border
- Radius: 8px

### All Transitions
- Duration: 150ms (fast), 200ms (normal), 300ms (slow)
- Easing: `ease-in-out` (no bounce)
- No parallax, no excessive motion

## Best Practices

1. **Always use CSS variables** for colors, spacing, sizes
2. **Stick to the 8px scale** for all spacing
3. **Limit to 4 colors** across your pages
4. **Use serif for headings**, sans-serif for body
5. **Keep interactions calm** — no bounce, parallax, or noise
6. **Test on mobile** — responsive is required
7. **Provide helpful errors** — never blame the user
8. **Maintain focus states** — accessibility matters
9. **Check visual consistency** — does it feel like one design?
10. **Reference the checklist** — before shipping features

## Documentation Guide

| Document | Purpose | When to Use |
|----------|---------|------------|
| **QUICK_REFERENCE.md** | Component cheat sheet | Building components quickly |
| **DESIGN_SYSTEM.md** | Complete guide | Understanding design philosophy |
| **IMPLEMENTATION_CHECKLIST.md** | Quality review | Before shipping features |
| **DesignSystemShowcase.jsx** | Live demo | Seeing components in action |

## Customization

To customize the design system:

1. **Update colors** → Edit `/src/design-system/tokens.css` (CSS variables section)
2. **Change spacing** → Modify `--space-*` values
3. **Update typography** → Change `--font-*` and `--size-*` variables
4. **Create components** → Add to `/src/design-system/components.css` matching existing patterns

All changes propagate automatically through CSS inheritance.

## Support Resources

- **Interactive Demo** — Run the app and view `DesignSystemShowcase.jsx`
- **Full Documentation** — See `DESIGN_SYSTEM.md`
- **Component Examples** — Check `DesignSystemShowcase.jsx` source
- **Quick Reference** — Use `QUICK_REFERENCE.md` for cheat sheet
- **Implementation Help** — Refer to `IMPLEMENTATION_CHECKLIST.md`

## Development Workflow

1. **Start a new page** → Copy the structure from `DesignSystemShowcase.jsx`
2. **Use existing components** → Import from `./components/Layout.jsx` and `./components/Components.jsx`
3. **Style consistently** → Reference CSS variables, never hardcode values
4. **Test responsiveness** → Resize browser to mobile width
5. **Review visually** → Compare with other pages for consistency
6. **Check the checklist** → Run through `IMPLEMENTATION_CHECKLIST.md` before shipping

## Version

**KodNest Premium Build System v1.0.0**

---

## Summary

This is a **complete, production-ready design system** for serious B2C SaaS products. It provides:

✓ All necessary components
✓ Consistent design language
✓ CSS variables for easy customization
✓ Responsive layout structure
✓ Accessibility best practices
✓ Comprehensive documentation
✓ Implementation guidelines

**Everything is designed with intention. Built for clarity. Ready for implementation.**

Start with the [QUICK_REFERENCE.md](QUICK_REFERENCE.md), review the [DesignSystemShowcase.jsx](src/components/DesignSystemShowcase.jsx), then dive into [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for the complete guide.

---

**Built once, used everywhere. One mind, one system.**
