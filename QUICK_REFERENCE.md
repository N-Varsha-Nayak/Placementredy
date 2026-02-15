# KodNest Premium Build System - Quick Reference

## Quick Start

```jsx
// Import design system CSS (already in index.css)
// Import components
import { TopBar, ContextHeader, WorkspaceContainer, ProofFooter, PanelSection, PromptBox } from './components/Layout';
import { Button, Card, Input, Alert } from './components/Components';

// Basic page structure
export default function MyPage() {
  return (
    <div className="app">
      <TopBar projectName="My App" step={1} totalSteps={3} status="In Progress" />
      <ContextHeader title="Page Title" subtitle="1-line description" />
      <WorkspaceContainer 
        primaryContent={<Card><p>Main content</p></Card>}
        secondaryContent={<PanelSection title="Info"><p>Secondary info</p></PanelSection>}
      />
      <ProofFooter />
    </div>
  );
}
```

## Components Cheat Sheet

### Layout Components

```jsx
<TopBar projectName="X" step={1} totalSteps={5} status="In Progress" />

<ContextHeader title="Title" subtitle="Subtitle" />

<WorkspaceContainer 
  primaryContent={<div>70% width</div>}
  secondaryContent={<div>30% width</div>}
/>

<PanelSection title="Section Title">
  Content here
</PanelSection>

<PromptBox prompt="Text to copy" />

<ProofFooter items={[{id: 'item1', label: 'Item 1'}]} />
```

### UI Components

```jsx
// Buttons
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>

// Forms
<Input label="Label" type="email" placeholder="user@example.com" helpText="Help text" />
<Input label="Label" error="Error message" />
<Textarea label="Label" placeholder="..." />
<Select label="Label" options={[{value: 'a', label: 'A'}]} />

// Content
<Card title="Title" subtitle="Subtitle">
  <p>Content</p>
</Card>

<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>

// Messaging
<Alert type="success" title="Title">Message</Alert>
<Alert type="warning" title="Title">Message</Alert>
<Alert type="error" title="Title">Message</Alert>
<Alert type="info" title="Title">Message</Alert>

// Progress
<Progress value={65} max={100} />

// Divider
<Divider />

// Text utilities
<Text variant="muted">Muted text</Text>
<Text variant="accent">Accent text</Text>
```

## CSS Variables

### Colors

```css
--color-background: #F7F6F3
--color-text-primary: #111111
--color-text-secondary: #666666
--color-text-tertiary: #999999
--color-accent: #8B0000
--color-accent-light: #A84040
--color-success: #4A6B4A
--color-warning: #8B7535
--color-error: #8B0000
--color-border: #DEDDD8
--color-white: #FFFFFF
```

### Spacing (8px scale)

```css
--spacing-xs: 8px    (--space-1)
--spacing-sm: 16px   (--space-2)
--spacing-md: 24px   (--space-3)
--spacing-lg: 40px   (--space-4)
--spacing-xl: 64px   (--space-5)
```

### Fonts & Sizes

```css
--font-serif: Georgia, Garamond, serif
--font-sans: System fonts stack

--size-xs: 12px
--size-sm: 14px
--size-base: 16px
--size-lg: 18px
--size-2xl: 24px
--size-3xl: 32px
--size-4xl: 40px
--size-5xl: 48px
--size-6xl: 56px
```

### Line Heights & Transitions

```css
--line-height-tight: 1.4
--line-height-normal: 1.6
--line-height-relaxed: 1.8

--transition-fast: 150ms ease-in-out
--transition-normal: 200ms ease-in-out
--transition-slow: 300ms ease-in-out
```

### Border & Shadow

```css
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 2px 4px rgba(0, 0, 0, 0.08)
--shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.1)
```

## CSS Classes

### Utilities

```css
.text-center
.text-right
.text-muted
.text-accent
.text-success
.text-warning
.text-error
.font-bold
.font-semibold
```

### Button Styles

```css
.btn
.btn-primary
.btn-secondary
.btn-tertiary
.btn-sm
.btn-lg
```

### Form Styles

```css
.form-group
.form-label
.form-input
.form-textarea
.form-select
.form-help
.form-error
.with-error
```

### Card Styles

```css
.card
.card-header
.card-title
.card-subtitle
.card-body
.card-footer
```

## Styling Examples

### Direct CSS

```css
/* Using variables */
.my-element {
  padding: var(--spacing-md);
  font-size: var(--size-base);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-white);
  transition: all var(--transition-normal);
}

.my-element:hover {
  border-color: var(--color-accent);
}
```

### Inline Styles (React)

```jsx
<div style={{
  padding: 'var(--spacing-md)',
  gap: 'var(--spacing-sm)',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
}}>
  Content
</div>
```

## Status Badges

```jsx
<div className="status-badge not-started">Not Started</div>
<div className="status-badge in-progress">In Progress</div>
<div className="status-badge shipped">Shipped</div>
```

## Layout Classes

```css
.app              /* Main container */
.app-header       /* Top section */
.app-content      /* Main content area */
.app-footer       /* Bottom section */

.top-bar          /* Project name + progress + status */
.context-header   /* Page title + subtitle */
.workspace-container   /* Primary + Secondary layout */
.primary-workspace     /* 70% width main content */
.secondary-panel       /* 30% width sidebar */
.proof-footer     /* Checklist at bottom */
```

## Responsive Breakpoints

- **Desktop**: 1200px+ (70/30 split)
- **Tablet**: 768px–1200px (stacked)
- **Mobile**: below 768px (single column)

Media queries use `@media (max-width: 768px)` etc.

## Do's & Don'ts

### DO ✓

- Use CSS variables for all colors, spacing, fonts
- Follow the 8px spacing scale
- Keep transitions at 150–200ms
- Use max 4 colors total
- Create generous whitespace
- Make errors helpful and clear
- Use serif fonts for headings
- Test responsive layouts

### DON'T ✗

- Don't use random pixel values (13px, 27px, etc.)
- Don't add gradients
- Don't use glassmorphism
- Don't add excessive animations
- Don't mix fonts unnecessarily
- Don't create neon or harsh colors
- Don't blame users in errors
- Don't overcrowd the UI

## File Locations

| File | Purpose |
|------|---------|
| `/src/design-system/tokens.css` | Design variables |
| `/src/design-system/base.css` | Global & typography |
| `/src/design-system/components.css` | Component styles |
| `/src/design-system/layout.css` | Layout structure |
| `/src/components/Layout.jsx` | Layout components |
| `/src/components/Components.jsx` | UI components |
| `/src/index.css` | Imports all DS CSS |
| `DESIGN_SYSTEM.md` | Full documentation |
| `QUICK_REFERENCE.md` | This file |

## Next Steps

1. Review `DESIGN_SYSTEM.md` for full documentation
2. Check `DesignSystemShowcase.jsx` component for examples
3. Build pages using the component structure
4. Maintain consistency with design tokens
5. Never hardcode colors or spacing values

---

**Everything follows the rhythm of the 8px spacing scale and the palette of 4 colors. Keep it calm. Keep it coherent. Keep it confident.**
