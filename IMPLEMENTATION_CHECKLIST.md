# KodNest Premium Build System - Implementation Checklist

Use this checklist when building new components, features, or pages to ensure consistency with the design system.

## ✓ Color & Visual

- [ ] Using only colors from the defined palette (#F7F6F3, #111111, #8B0000, #4A6B4A, #8B7535, #DEDDD8, #FFFFFF)
- [ ] All colors referenced via CSS variables (`--color-*`)
- [ ] No gradients used
- [ ] No glassmorphism effects
- [ ] No neon or harsh colors
- [ ] No drop shadows (using subtle borders instead)
- [ ] Borders are 1px or 2px only
- [ ] Border radius is 4px, 6px, or 8px (from `--radius-*`)

## ✓ Typography

- [ ] Headings (h1–h6) use serif font (`--font-serif`)
- [ ] Body text uses sans-serif font (`--font-sans`)
- [ ] Font sizes from the defined scale (`--size-xs` through `--size-6xl`)
- [ ] No decorative fonts used
- [ ] Line heights are 1.4, 1.6, or 1.8 (from `--line-height-*`)
- [ ] Text blocks have max-width of 720px for readability
- [ ] Letter spacing is normal (0) or wide (0.02em)
- [ ] No random font weights (use 400, 600, 700)

## ✓ Spacing

- [ ] All spacing uses the 8px scale (`--space-1` through `--space-5`)
- [ ] No random pixel values (13px, 27px, 37px, etc.)
- [ ] Consistent padding across all components
- [ ] Generous whitespace used intentionally
- [ ] Gap between flex/grid items from spacing scale
- [ ] Margins follow spacing scale
- [ ] Top bar height is 64px
- [ ] Primary workspace is 70%, secondary is 30%

## ✓ Components

- [ ] Buttons use defined variants (primary, secondary, tertiary)
- [ ] Button hover states include smooth transition (150–200ms)
- [ ] All form inputs have clear focus states
- [ ] Form inputs have proper error styling
- [ ] Cards have 1px border + 24px padding
- [ ] Cards use consistent border color (`--color-border`)
- [ ] Alert components include type indicator (success, warning, error, info)
- [ ] Badges use appropriate variant colors
- [ ] Progress bars use accent color

## ✓ Interactions & Animations

- [ ] All transitions use defined durations (150ms, 200ms, or 300ms)
- [ ] All transitions use `ease-in-out` easing
- [ ] No bounce animations
- [ ] No parallax effects
- [ ] No unnecessary animations or motion
- [ ] Respects `prefers-reduced-motion` setting
- [ ] Hover effects are subtle (color shift or border change)
- [ ] Focus states have 2px outline in accent color
- [ ] Active states have minimal feedback (no exaggerated movement)

## ✓ Forms & Inputs

- [ ] Input elements have 16px padding
- [ ] Input border is 1px solid in border color
- [ ] Input focus shows accent color border
- [ ] Input error state uses error color
- [ ] Help text is small (--size-sm) and secondary color
- [ ] Error text is small (--size-sm) and error color
- [ ] Labels are bold and primary text color
- [ ] Required fields are marked with asterisk
- [ ] Placeholder text is tertiary color

## ✓ Layout & Structure

- [ ] Pages follow the global structure (Top Bar → Context Header → Workspace → Footer)
- [ ] Top bar shows project name, progress indicator, status badge
- [ ] Context header has large serif title + 1-line subtitle
- [ ] Primary workspace contains main content
- [ ] Secondary panel includes: explanation, prompt box, action buttons
- [ ] Proof footer shows checklist at bottom
- [ ] Layout is responsive (stacks on tablets, single column on mobile)
- [ ] Scrollable areas have subtle scrollbars

## ✓ Error & Empty States

- [ ] Errors explain what went wrong
- [ ] Errors include how to fix the issue
- [ ] Errors never blame the user
- [ ] Errors use appropriate alert styling
- [ ] Empty states provide guidance/next action
- [ ] Empty states include action button
- [ ] Empty state messages are encouraging, not dead

## ✓ Accessibility

- [ ] Focus states are clearly visible
- [ ] Focus outline is 2px in accent color
- [ ] Color is not the only indicator (use icons, text)
- [ ] Text contrast meets WCAG AA standards
- [ ] Form labels are associated with inputs
- [ ] Error messages are tied to form fields
- [ ] Buttons have clear, descriptive text
- [ ] Images/icons have alt text or aria-label

## ✓ Code Quality

- [ ] All colors use CSS variables
- [ ] All spacing uses CSS variables
- [ ] All font sizes use CSS variables
- [ ] All transitions use CSS variables
- [ ] No hardcoded colors or pixel values
- [ ] Component imports are clean and organized
- [ ] Classes follow BEM convention where applicable
- [ ] Responsive breakpoints are consistent

## ✓ Design Consistency

- [ ] Design feels cohesive (one mind designed it)
- [ ] No visual drift across components
- [ ] Consistent hover behavior across similar elements
- [ ] Consistent border styling
- [ ] Consistent padding across card-like elements
- [ ] Consistent button sizing
- [ ] Consistent alert styling
- [ ] Spacing feels intentional and calm

## ✓ Performance

- [ ] Minimal animations (no bouncing, parallax)
- [ ] Transitions use CSS (not JavaScript)
- [ ] No unnecessary re-renders
- [ ] No custom fonts if system fonts work
- [ ] Optimized images (no uncompressed assets)
- [ ] No inline styles where classes work

## ✓ Mobile Responsiveness

- [ ] Layout stacks appropriately on mobile
- [ ] Touch targets are at least 44px × 44px
- [ ] Text is readable on small screens
- [ ] Inputs are mobile-friendly
- [ ] Buttons adapt to screen size
- [ ] Secondary panel adapts/hides on mobile
- [ ] Proof footer adapts to single column

## ✓ Browser Support

- [ ] Works in modern browsers (Chrome, Firefox, Safari, Edge)
- [ ] CSS variables are supported
- [ ] Grid/Flex layout works correctly
- [ ] Transitions work smoothly
- [ ] Focus states visible in all browsers
- [ ] No deprecated CSS properties

## Example: New Component Checklist

When creating a new component:

```jsx
// ✓ Import variables
import { spacing, colors } from './tokens';

// ✓ Component template
export const MyComponent = ({ title, children }) => {
  return (
    <div className="my-component">
      {/* ✓ Serif for headings */}
      <h3 className="my-component-title">{title}</h3>
      {/* ✓ Body text with proper spacing */}
      <div className="my-component-content">
        {children}
      </div>
    </div>
  );
};

// ✓ CSS using variables
.my-component {
  padding: var(--spacing-md);           /* 24px */
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);      /* 8px */
  background-color: var(--color-white);
  transition: all var(--transition-normal); /* 200ms ease-in-out */
}

.my-component-title {
  font-family: var(--font-serif);
  font-size: var(--size-2xl);          /* 24px */
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);     /* 16px */
}

.my-component:hover {
  border-color: var(--color-accent);
}
```

## Review Checklist

Before shipping features:

- [ ] Page follows global layout structure
- [ ] All colors from palette (4 max)
- [ ] All spacing from 8px scale
- [ ] All fonts from defined set
- [ ] Transitions are smooth and purposeful
- [ ] Focus states are visible
- [ ] Error states are helpful
- [ ] Responsive on all breakpoints
- [ ] Code uses CSS variables throughout
- [ ] No visual drift from other pages
- [ ] Design system documentation updated

## Questions to Ask

When reviewing a design or implementation:

1. **Is every color from our palette?** If not, add it to tokens.
2. **Is every spacing value from our 8px scale?** If not, adjust to nearest scale value.
3. **Does this feel like it was designed by one person?** If not, check for inconsistencies.
4. **Would this still look good without any animations?** If not, simplify.
5. **Is the hierarchy clear without relying on color?** If not, improve contrast/size.
6. **Can I understand the error or empty state?** If not, it needs clearer copy.
7. **Can a user focus through the interface with the keyboard?** If not, add focus states.
8. **Does this match other similar components?** If not, standardize.

---

**Consistency over cleverness. Calm over flash. This checklist ensures every piece feels like one cohesive system.**
