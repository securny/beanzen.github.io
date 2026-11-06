---
name: Beanzen
description: Warm, template-led website for the Beanzen coffee journal.
colors:
  espresso: "#35251d"
  deep-espresso: "#271b15"
  cream: "#faf8f3"
  coffee-accent: "#6b422d"
  muted-text: "#62574e"
  white: "#ffffff"
  header-title: "#f6f0e5"
  hero-description: "#eee4d7"
  hero-detail: "#e6d8c7"
  hero-muted: "#ddcbb6"
  icon-surface: "#eee5d6"
  reading-block: "#eee8dc"
  divider: "#d9ccbb"
  button: "#f1e5d0"
  button-hover: "#fff5e3"
  focus: "#947345"
  selection: "#d9c3a6"
typography:
  app-name:
    fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(3.8rem, 4vw, 5.4rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-.035em"
  hero-description:
    fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(3rem, 3.3vw, 4.2rem)"
    fontWeight: 600
    lineHeight: 1.22
    letterSpacing: "-.025em"
  feature-title:
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.4
  feature-body:
    fontSize: "1.5rem"
    lineHeight: 1.75
  reading-body:
    fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "1.65rem"
    lineHeight: 1.85
  reading-title:
    fontSize: "clamp(3.2rem, 4vw, 4.6rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-.035em"
  button:
    fontSize: "1.6rem"
    fontWeight: 700
rounded:
  action: "8px"
  reading-block: "12px"
  app-icon: "22px"
  hero-bottom: "36px"
spacing:
  inline: "16px"
  section-gap: "32px"
  container-gutter: "28px"
  mobile-gutter: "22px"
components:
  button-primary:
    backgroundColor: "{colors.button}"
    textColor: "{colors.espresso}"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  button-secondary:
    textColor: "#f4e8d8"
    padding: "12px 0"
  feature-icon:
    backgroundColor: "{colors.icon-surface}"
    textColor: "{colors.coffee-accent}"
    rounded: "{rounded.reading-block}"
    padding: "12px"
  contents:
    backgroundColor: "{colors.reading-block}"
    rounded: "{rounded.reading-block}"
    padding: "22px 26px"
  contact-block:
    backgroundColor: "{colors.reading-block}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.reading-block}"
    padding: "24px 28px"
---

# Design System: Beanzen

## Overview

**Creative North Star: "Automatic App Landing Page"**

Beanzen follows emilbaehr/automatic-app-landing-page: a phone preview beside app information, followed by a feature list and direct support/legal navigation. Warm espresso and cream colors extend the original Beanzen app icon. Locally hosted Manrope supports both English and Russian.

Use generous spacing and restrained decoration. Support and legal pages are flat reading surfaces with clear headings, underlined links and compact contents/contact blocks.

**Key Characteristics:**

- Template-led phone preview and app information hero.
- Warm espresso/cream palette and local Manrope.
- Flat, readable support and legal pages.
- Equivalent English/Russian navigation and visible keyboard focus.

## Colors

The palette is warm and quiet, drawn from the original app identity. Frontmatter values are normative literals, not CSS custom properties.

### Primary

- **Coffee accent:** links, feature glyphs and related navigation on light surfaces.
- **Espresso:** hero background and main reading text.

### Neutral

- **Cream:** page background, including support and legal pages.
- **White / header title / hero description:** high-contrast hero title, brand and navigation text.
- **Hero detail / hero muted:** secondary hero copy, platform label and language navigation.
- **Muted text:** feature descriptions, footer and reading-page metadata.
- **Icon surface / reading block:** feature-icon backgrounds and contents/contact blocks.
- **Divider:** light-surface separators; the hero header uses translucent hero-description color.
- **Button / button hover:** primary action fill and hover state.
- **Focus / selection:** keyboard outline and selected text treatment.

Configuration colors flow from `_config.yml` through `main.scss`. Imports run in this order: `base`, `layout`, `github-markdown`, `beanzen`. The final Beanzen overrides win; some override colors are literals rather than configuration variables. Preserve that incumbent hierarchy. Unused template syntax-highlighting colors are not a brand palette.

## Typography

Manrope is hosted at `assets/fonts/manrope-variable.ttf`, with variable weights (200–800) and `font-display: swap`. The root font size is (62.5%); existing rem values therefore correspond to ten-pixel units under default browser settings. Body defaults are (2rem) and (1.65), with explicit component sizes taking precedence.

Use the frontmatter app-name and hero-description roles for the app identity and main proposition. Feature headings are compact and bold; descriptions use a relaxed line height. Reading pages use the reading-body role, with headings inherited from Markdown styling then overridden by Beanzen: second-level headings are (2.4rem), line height (1.35), and third-level headings are (1.85rem). Reading text is capped at (75ch), introductory text at (65ch), and hero detail at (47ch).

At the tablet override the hero description becomes (3rem); at mobile it uses `clamp(2.8rem, 7vw, 3.5rem)`. Mobile app names are (3.8rem), reading titles (3.2rem), and reading body (1.6rem). Preserve these explicit exceptions rather than inventing a new type scale.

## Layout

The inherited container is a centered twelve-column grid, capped at (1170px), with (30px) column gaps and final horizontal gutters (28px). The header row is (96px). The landing hero nests a two-column layout (40% / remaining space), a (6%) column gap, and padding (38px 0 52px): phone left, app information right. The phone preview is (320px × 676px); its screen is a real app image, with a development-build caption.

At (992px) and below, the hero remains two columns with a (32px) gap; the phone becomes (280px) wide and features move from three columns to two. At (700px) and below, gutters become (22px), header/navigation wrap, app information precedes the phone, and features become one column. Mobile hero spacing is (36px 0 30px) with a (42px) gap. Earlier template media queries remain in the inherited stylesheet; the later Beanzen overrides define the final behavior.

Features begin after (72px) on desktop, (56px) at tablet and (42px) on mobile. Reading pages occupy grid columns (2 / 12) with margin (56px auto 24px); mobile uses full width and a (36px) top margin. Contents links and footer navigation wrap without a JavaScript menu.

## Elevation & Depth

The current surfaces are flat. Cream/espresso contrast, quiet borders and the phone frame provide separation. The inherited drop-shadow utility exists in `base.scss`, but the actual hero icon is not wrapped in its shadow class and the action container explicitly removes its inherited filter. Do not promote unused template effects into a new shadow system.

## Shapes

Actions and the skip link have modest rounded corners; feature icons and reading blocks use the reading-block radius. The hero has rounded bottom corners only, reduced to (24px) on mobile. Header icons are (10px) radius on desktop and (8px) on mobile. App icon radius changes with its size: desktop (22px), tablet (18px), mobile (16px). Keep the actual icon and phone assets; do not redraw their identity.

## Components

- **Primary support link:** cream filled, minimum height (50px), inline arrow, frontmatter padding and radius. Hover changes fill. Secondary exploration link is underlined, with no filled container. Mobile action type is (1.45rem).
- **Navigation:** app/support/privacy links plus a separate EN/RU switch. Active links are underlined; active language is also weight (800). Hero links are light; reading-page links use muted text and espresso active states. Mobile moves main navigation to a full-width third row.
- **Phone preview:** black template device frame and real development screenshot; maintain its caption and aspect ratio. Store badges render only when verified URLs are configured.
- **Features:** flat icon-and-text rows, no card shell. Inline stroke SVGs are (24px), stroke width (1.6); the icon holder starts at (48px) and uses the existing warm background.
- **Privacy summary:** horizontal border-separated text/link row; stacks vertically at the tablet breakpoint.
- **Contents / contact block:** light tonal backgrounds, no shadow. Contents links wrap. Mobile contact padding is (20px).
- **Footer:** centered author/contact, wrapping support/legal links and copyright; preserve direct public access.

All keyboard targets use the existing visible focus outline (3px solid focus color, offset 5px). Links underline on hover with an underline offset (5px). The skip link becomes visible on focus. The primary action transitions its background color over (.2s); reduced-motion preference removes transitions and changes smooth scrolling to automatic scrolling. No input, chip or dialog component exists in the current site.

## Do's and Don'ts

### Do:

- **Do** preserve the selected template structure and the original app identity.
- **Do** use the existing Sass cascade and configuration before introducing new styling.
- **Do** keep English and Russian layouts equivalent and let navigation wrap.
- **Do** preserve visible focus, the skip link and reduced-motion behavior.
- **Do** keep store badges conditional on verified configured URLs.

### Don't:

- **Don't** restore the superseded custom chart concept or treat earlier comps as authority.
- **Don't** turn the feature list into elevated cards or add decorative reading-page surfaces.
- **Don't** add invented controls, token scales, store links or external font services.
