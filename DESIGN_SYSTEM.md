# KodNest Premium Build System - Design System Documentation

## Overview

KodNest Premium Build System is a comprehensive, production-ready design system built for serious B2C SaaS products. It embodies a philosophy of calm, intentional, coherent, and confident design—never flashy, never loud, never playful.

## Design Philosophy

The system follows these core principles:

- **Calm**: No unnecessary animations, gradients, or visual noise
- **Intentional**: Every design decision serves a purpose
- **Coherent**: Consistent patterns throughout, designed by one mind
- **Confident**: Bold typography and proven patterns, no decoration for decoration's sake

### What We Avoid

- Gradients
- Glassmorphism
- Neon colors
- Animation noise
- Random spacing and sizing
- Decorative fonts
- Playful or hackathon-style design

## Color System

A maximum of 4 colors across the entire system ensures visual coherence and professional presentation.

### Colors

| Variable | Hex Code | Usage |
|----------|----------|-------|
| Background | #F7F6F3 | Page background, neutral surfaces |
| Primary Text | #111111 | Main body text, headings |
| Accent | #8B0000 | Primary actions, highlights, links |
| Success | #4A6B4A | Positive states, confirmations |
| Warning | #8B7535 | Alerts, cautions, pending states |
| Error | #8B0000 | Error states, destructive actions |
| Border | #DEDDD8 | Subtle dividers, input borders |
| White | #FFFFFF | Cards, form backgrounds |

Access colors via CSS variables:
```css
color: var(--color-accent);
background-color: var(--color-white);
border: 1px solid var(--color-border);
```

## Typography

### Typeface Choices

- **Headings**: Georgia, Garamond, or serif fallback
  - Confident, substantial, generous spacing
  - Used for h1–h6 elements
  
- **Body**: System fonts (Apple/Google/Microsoft)
  - Clean, neutral, highly readable
  - Default: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', etc.

### Font Sizes

All sizes follow a predictable scale based on design tokens:

- `--size-xs`: 12px (labels, captions)
- `--size-sm`: 14px (small text)
- `--size-base`: 16px (body text — default)
- `--size-lg`: 18px (emphasized text)
- `--size-xl`: 20px (h5 headings)
- `--size-2xl`: 24px (h4 headings)
- `--size-3xl`: 32px (h3 headings)
- `--size-4xl`: 40px (h2 headings)
- `--size-5xl`: 48px (large headings)
- `--size-6xl`: 56px (h1 headings)

### Line Heights

- `--line-height-tight`: 1.4 (headings)
- `--line-height-normal`: 1.6 (body text)
- `--line-height-relaxed`: 1.8 (extended prose)

### Usage

```jsx
<h1>Large Serif Heading</h1>
<p>Body text at 16–18px with 1.6–1.8 line height</p>
<Input label="Form label" />
```

## Spacing System

A strict 8px base unit scale ensures consistency throughout:

- `--space-1`: 8px
- `--space-2`: 16px
- `--space-3`: 24px
- `--space-4`: 40px
- `--space-5`: 64px

**Never use random values like 13px, 27px, 37px, or 51px.**

Whitespace is a primary design element. Generous spacing communicates calm and confidence.

### CSS Variables

```css
padding: var(--spacing-md);          /* 24px */
margin-bottom: var(--spacing-lg);    /* 40px */
gap: var(--spacing-sm);              /* 16px */
```

## Global Layout Structure

Every page in KodNest follows this structure:

```
[Top Bar]
├─ Left: Project Name
├─ Center: Progress Indicator (Step X / Y)
└─ Right: Status Badge

[Context Header]
├─ Large serif headline
└─ 1-line subtext (clear purpose, no hype)

[Workspace Container]
├─ Primary Workspace (70%)
│  ├─ Cards
│  └─ Content
└─ Secondary Panel (30%)
   ├─ Step explanation
   ├─ Copyable prompt
   └─ Action buttons

[Proof Footer] — persistent
├─ □ UI Built
├─ □ Logic Working
├─ □ Test Passed
└─ □ Deployed
```

### Top Bar

```jsx
<TopBar
  projectName="My Project"
  step={2}
  totalSteps={5}
  status="In Progress"  // "Not Started" | "In Progress" | "Shipped"
/>
```

- **Left**: Project name in serif, confident
- **Center**: Progress indicator (optional)
- **Right**: Status badge with appropriate color

### Context Header

```jsx
<ContextHeader
  title="Build Your Dashboard"
  subtitle="Design the visual layout and primary interactions"
/>
```

- **Title**: Large serif, 48–56px
- **Subtitle**: 1-line explanation, no marketing language
- Purpose: Orient the user, not impress

### Primary Workspace (70%)

Contains the main product interaction:
- Clean cards with consistent 24px padding
- Predictable component layout
- Max text width: 720px for readability
- Overflow: scrollable independently

### Secondary Panel (30%)

**Always include:**

1. **Step Explanation** (short, 2–3 sentences)
2. **Copyable Prompt Box** (monospace, copiable)
3. **Action Buttons** (Copy, Build in Lovable, It Worked, Error, Add Screenshot)

```jsx
<SecondaryPanel>
  <PanelSection title="Step Explanation">
    <p>Explain what the user needs to do...</p>
  </PanelSection>
  
  <PanelSection title="Copyable Prompt">
    <PromptBox prompt="Your prompt text here" />
  </PanelSection>
  
  <div className="panel-buttons">
    <Button variant="primary">Build in Lovable</Button>
    <Button variant="secondary">It Worked</Button>
  </div>
</SecondaryPanel>
```

### Proof Footer

Persistent checklist at the bottom. Each item requires user proof input (screenshot, confirmation, etc.):

```jsx
<ProofFooter
  items={[
    { id: 'ui-built', label: 'UI Built' },
    { id: 'logic-working', label: 'Logic Working' },
    { id: 'test-passed', label: 'Test Passed' },
    { id: 'deployed', label: 'Deployed' },
  ]}
/>
```

## Components

### Buttons

Three variants, consistent interaction:

```jsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="tertiary">Tertiary Action</Button>
<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="lg">Large</Button>
<Button variant="primary" disabled>Disabled</Button>
```

**Styles:**
- Primary: Solid deep red (#8B0000), white text
- Secondary: Outlined, red border, transparent background
- Tertiary: Ghost, no border, subtle text
- All: 150–200ms hover transition, no bounce

**Sizes:**
- `sm`: Small padding, reduced font
- `md`: Default (16px font, 16px h-padding)
- `lg`: Larger padding, 18px font

### Inputs & Forms

Clean form components with clear focus states:

```jsx
<Input
  label="Email Address"
  type="email"
  placeholder="user@example.com"
  helpText="We'll never share your email"
/>

<Input
  label="Required Field"
  required
  error="This field is required"
/>

<Textarea
  label="Description"
  placeholder="Enter details..."
  helpText="Be descriptive"
/>

<Select
  label="Choose Option"
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
/>
```

**Styles:**
- Border: 1px solid, 6px radius
- Focus: Deep red border outline
- Error: Red border + error text
- Padding: 16px
- Font: 16px sans-serif

### Cards

Container for organized content:

```jsx
<Card
  title="Card Title"
  subtitle="Optional subtitle"
  footer={<Button>Action</Button>}
>
  <p>Content goes here</p>
</Card>
```

**Styles:**
- 1px border, subtle color
- 24px padding
- No drop shadows (subtle border only)
- Rounded: 8px

### Badges & Status

Small visual indicators:

```jsx
<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="accent">Accent</Badge>
```

### Alerts

Contextual messaging:

```jsx
<Alert type="success" title="Success!" >
  Your changes have been saved.
</Alert>

<Alert type="warning" title="Warning">
  Please review this carefully.
</Alert>

<Alert type="error" title="Error">
  Something went wrong. Please try again.
</Alert>

<Alert type="info" title="Info">
  This is informational.
</Alert>
```

### Progress

Visual progress tracking:

```jsx
<Progress value={65} max={100} />
```

## Interaction Rules

### Transitions

All transitions follow predictable timing:

- Fast changes: `150ms ease-in-out`
- Normal changes: `200ms ease-in-out`
- Slow fades: `300ms ease-in-out`

**CSS Variables:**
```css
--transition-fast: 150ms ease-in-out;
--transition-normal: 200ms ease-in-out;
--transition-slow: 300ms ease-in-out;
```

**Rules:**
- No bounce or playful easing
- No parallax
- No excessive motion
- Respects `prefers-reduced-motion`

### Hover & Focus

- **Hover**: Subtle color shift, border change, or slight lift
- **Focus**: 2px solid outline in accent color + 2px offset
- **Active**: Minimal visual feedback (translateY 1px)

### Disabled States

- Opacity: 0.5
- Cursor: not-allowed
- No interaction feedback

## Error & Empty States

### Errors

Always explain **what went wrong** and **how to fix it**:

```jsx
<Alert type="error" title="Email Already in Use">
  This email is already associated with an account. 
  Try logging in or <a href="/reset">reset your password</a>.
</Alert>
```

**Never** blame the user. **Always** provide next steps.

### Empty States

Provide guidance, never feel dead:

```jsx
<Card>
  <h3>No projects yet</h3>
  <p>Create your first project to get started.</p>
  <Button variant="primary">New Project</Button>
</Card>
```

## Responsive Design

The system is fully responsive:

- **Desktop** (1200px+): Full layout with 70/30 split
- **Tablet** (768px–1200px): Stacked layout
- **Mobile** (below 768px): Single column, optimized spacing

Responsive breakpoints are built into component CSS.

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

import {
  Button,
  Input,
  Card,
  Alert,
} from './components/Components';

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
        subtitle="Design and implement the main dashboard interface"
      />
      
      <WorkspaceContainer
        primaryContent={
          <Card title="Main Content">
            <p>Your UI goes here</p>
          </Card>
        }
        secondaryContent={
          <>
            <PanelSection title="Instructions">
              <p>Follow these steps...</p>
            </PanelSection>
            <PanelSection title="Prompt">
              <PromptBox prompt="Your AI prompt..." />
            </PanelSection>
          </>
        }
      />
      
      <ProofFooter />
    </div>
  );
}
```

## Design Tokens Reference

All tokens are CSS custom properties (variables) defined in `tokens.css`:

### Colors

```css
--color-background: #F7F6F3
--color-text-primary: #111111
--color-text-secondary: #666666
--color-accent: #8B0000
--color-success: #4A6B4A
--color-warning: #8B7535
--color-error: #8B0000
--color-border: #DEDDD8
--color-white: #FFFFFF
```

### Spacing

```css
--space-1: 8px
--space-2: 16px
--space-3: 24px
--space-4: 40px
--space-5: 64px
```

### Typography

```css
--font-serif: 'Georgia', 'Garamond', serif
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
--size-base: 16px
--line-height-normal: 1.6
```

### Radius & Shadows

```css
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 2px 4px rgba(0, 0, 0, 0.08)
```

## File Structure

```
/src
├── design-system/
│   ├── tokens.css          # Design variables (colors, spacing, etc.)
│   ├── base.css            # Global styles, typography
│   ├── components.css      # Component styles
│   └── layout.css          # Layout & structure
├── components/
│   ├── Layout.jsx          # Structural components
│   ├── Components.jsx      # UI components
│   └── DesignSystemShowcase.jsx  # Demo page
├── App.jsx
├── App.css
└── index.css               # Imports all design system CSS
```

## Customization

To customize the design system:

1. **Update colors**: Edit `tokens.css` CSS variables
2. **Adjust spacing**: Modify `--space-*` values
3. **Change typography**: Update `--font-*` and `--size-*`
4. **Create new components**: Add to `components.css` with consistent styling

All changes propagate automatically due to CSS variable inheritance.

## Best Practices

1. **Use variables**: Always reference CSS variables, never hardcode values
2. **Maintain spacing**: Use the 8px scale consistently
3. **Color consistency**: Limit to the defined color palette
4. **Responsive first**: Build for mobile, enhance for larger screens
5. **Accessibility**: Ensure focus states and color contrast (WCAG AA)
6. **Performance**: Minimize animations, use CSS over JavaScript for transitions
7. **Coherence**: If it feels different, it probably should match the system

## Version

KodNest Premium Build System v1.0.0

---

**Designed with intention. Built for clarity. Used with confidence.**
