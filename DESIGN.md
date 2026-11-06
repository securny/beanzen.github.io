---
name: Beanzen
description: Fully light website for the Beanzen coffee journal.
colors:
  link-blue: "#005fcc"
  action-blue: "#0066cc"
  action-hover: "#0052a3"
  white: "#ffffff"
  native-gray: "#f2f2f7"
  text: "#1c1c1e"
  markdown-heading: "rgba(0, 0, 0, 1)"
  muted-text: "#58585e"
  navigation-text: "#48484a"
  divider: "#d1d1d6"
  focus: "#007aff"
  selection: "#cce5ff"
  scrollbar: "#8e8e93"
  screenshot-border: "rgba(128, 128, 128, .25)"
  section-border: "rgba(128, 128, 128, .3)"
  header-border: "rgba(72, 72, 74, .2)"
typography:
  app-name:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "clamp(3.8rem, 4vw, 5.4rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-.035em"
  hero-description:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "clamp(3rem, 3.3vw, 4.2rem)"
    fontWeight: 600
    lineHeight: 1.22
    letterSpacing: "-.025em"
  section-title:
    fontSize: "clamp(2.8rem, 3vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-.03em"
  feature-title:
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.4
  feature-body:
    fontSize: "1.5rem"
    lineHeight: 1.75
  reading-body:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
    fontSize: "1.65rem"
    lineHeight: 1.85
  reading-title:
    fontSize: "clamp(3.2rem, 4vw, 4.6rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-.035em"
  feature-detail-title:
    fontSize: "2.1rem"
    fontWeight: 600
    lineHeight: 1.25
  button:
    fontSize: "1.6rem"
    fontWeight: 700
  capability:
    fontSize: "1.4rem"
  screen-caption:
    fontSize: "1.35rem"
    lineHeight: 1.6
rounded:
  action: "8px"
  reading-block: "12px"
  app-icon: "22px"
  hero-bottom: "36px"
  hero-screen: "28px"
  gallery-screen: "24px"
spacing:
  inline: "16px"
  section-gap: "32px"
  container-gutter: "28px"
  mobile-gutter: "22px"
  gallery-gap: "48px"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.action}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-secondary:
    textColor: "{colors.link-blue}"
    typography: "{typography.button}"
    padding: "12px 0"
  feature-icon:
    backgroundColor: "{colors.native-gray}"
    textColor: "{colors.link-blue}"
    rounded: "{rounded.reading-block}"
    padding: "12px"
  contents:
    backgroundColor: "{colors.native-gray}"
    rounded: "{rounded.reading-block}"
    padding: "22px 26px"
  contact-block:
    backgroundColor: "{colors.native-gray}"
    textColor: "{colors.text}"
    rounded: "{rounded.reading-block}"
    padding: "24px 28px"
  scale-search:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
    typography: "{typography.reading-body}"
    rounded: "{rounded.action}"
    padding: "12px 16px"
---

# Design System: Beanzen

## Overview

**Creative North Star: "Beanzen brewing interface"**

Beanzen is a standalone Jekyll site: an authentic application preview beside app information, flat feature summaries, and straightforward reading pages. The approved variant 1 is fully light: white and native gray surfaces, dark text, and blue links/actions. The original app icon remains the identity asset; its brown artwork does not define a brown website palette.

Locally hosted Manrope serves English and Russian. Preserve the Beanzen layout, Jekyll/Sass structure and retained MIT attribution while extending the same readable visual language to detailed features, scale compatibility and the brewing guide. Real native application captures supply product evidence, rather than generated app UI or decorative phone hardware.

**Key Characteristics:**

- Fully light native palette, including the header and hero.
- Main brewing interface as the primary product image.
- Flat reading pages, quiet dividers and blue interactive cues.
- Actual iOS main-screen captures with internal source provenance.
- Equivalent English/Russian navigation and visible keyboard focus.

## Colors

The frontmatter records actual configuration and Sass literals; it does not introduce CSS custom properties or a new scale.

### Primary

- **Link blue:** links, feature glyphs and the search caret.
- **Action blue / action hover:** filled APK download action and its hover state.
- **Focus:** shared visible keyboard outline.

### Neutral

- **White:** document and reading-page background, skip link, search field and primary-action text.
- **Native gray:** fully light hero, feature-icon holders and contents/contact blocks.
- **Text:** home headings, identity and main reading copy.
- **Markdown heading:** inherited black reading-page headings; this existing cascade difference is recorded, not a request to restyle them.
- **Muted text:** descriptions, captions, footer, status text and reading-page navigation.
- **Navigation text:** default home-header links; active links use Text.
- **Divider / header border / section border:** privacy/read-page separators, home-header separator and catalog groups respectively.
- **Screenshot border:** quiet boundary around raw native captures.
- **Selection / scrollbar:** selection background and scroll thumb. Selection text uses Text.

**The Fully Light Rule.** Keep both header and hero light; neither the rejected brown palette nor the briefly selected graphite hero has visual authority.

`_sass/colors.scss` defines palette variables. `main.scss` imports `colors`, `base`, `layout`, `github-markdown`, `beanzen`, then `catalog` and `share`; later literal overrides win. The white base topbar is superseded by a transparent header over the native-gray hero. Retained drop-shadow and syntax-highlight styles do not form a new brand palette. Markdown headings retain their inherited opaque-black color, while body copy uses Text.

## Typography

Manrope is hosted at `assets/fonts/manrope-variable.ttf`, with weights (200–800) and `font-display: swap`. The root size is (62.5%); one rem corresponds to (10px) under default browser settings. Body defaults are (2rem) and line height (1.65), with component overrides taking precedence. Frontmatter roles preserve observed sizes rather than implying a uniform type scale.

App name and hero proposition use the app-name and hero-description roles. The hero detail is (1.75rem), line height (1.7), capped at (47ch). Compact feature summaries use the feature-title/body roles. Reading pages use reading-body; second-level headings are (2.4rem), line height (1.35), and ordinary third-level headings are (1.85rem). Detailed feature headings use feature-detail-title. Reading text is capped at (75ch), introductory copy at (65ch); wide feature/catalog pages deliberately remove the page cap.

At tablet width the hero proposition becomes (3rem), supporting detail (1.6rem) and header links (1.4rem). On mobile the proposition is `clamp(2.8rem, 7vw, 3.5rem)`, app name (3.8rem), reading title (3.2rem), reading body (1.6rem), reading second-level headings (2.25rem), and action labels (1.45rem). The hero has no caption. Gallery captions use screen-caption. Preserve these explicit differences.

## Layout

The inherited centered twelve-column grid is capped at (1170px), with (30px) column gaps and final horizontal gutters (28px). Header height is (96px). The hero nests columns (40% / remaining space), gap (6%), padding (38px 0 52px): screenshot left, app information right. The final raw preview width is (296px), with natural image height and no caption.

At (992px) and below the hero stays in two columns with a (32px) gap; the screenshot is (270px) wide and feature summaries become two columns. At (700px) and below gutters become (22px); header links wrap into a full-width row; the main screenshot precedes app information; feature summaries become one column. Mobile hero padding is (36px 0 30px), gap (42px), preview width `min(280px, 100%)`. The unused phone frames and video-preview rules have been removed.

Feature summaries begin after (72px), tablet (56px), mobile (42px). Home expansion sections use top spacing (64px), mobile (48px). The screenshot gallery has three columns with gap (48px), tablet gap (24px), then one column with gap (36px). Gallery figures have width (100%) capped at (300px), stable before image decoding.

Reading pages span columns (2 / 12), margin (56px auto 24px); mobile uses full width and top margin (36px). Wide feature/catalog pages span all columns. Feature text with a capture uses `minmax(0, 1fr) 260px`, gap (72px); tablet uses (220px), gap (36px); mobile stacks with gap (12px) and the screenshot first. Feature text caps at (70ch). Catalog capabilities use seven columns, then four at tablet, three on mobile, with gap (12px 20px). Search caps at (600px) and appears before results. Model names and explicit aliases are searchable. The model index and timer notes use native details controls. No JavaScript menu is required.

## Elevation & Depth

Surfaces are flat. Native-gray tonal areas, fine borders and whitespace separate content. There is no active card-shadow system: inherited drop-shadow utilities are not applied to the hero icon, and the action container removes its filter. The native screenshot is presented without the old device-frame overlay. Do not promote unused template effects into design tokens.

## Shapes

Actions, search and skip link use the action radius. Feature-icon holders and contents/contact blocks use the reading-block radius. The hero rounds only its bottom corners, reduced to (24px) on mobile. Header icons use (10px), mobile (8px); the large app icon uses app-icon, tablet (18px), mobile (16px).

Raw hero screenshots use hero-screen, gallery screenshots gallery-screen, with the screenshot-border. The earlier tablet screenshot radius (26px) remains in `beanzen.scss` but is superseded by the final hero-screen rule in `catalog.scss`. Preserve the real icon and image aspect ratios.

## Components

- **Primary APK action:** blue fill, white text, inline stroke arrow, minimum height (50px), gap (16px), frontmatter padding and radius. It links to `https://github.com/securny/beanzen/releases`; label the distribution APK. Hover uses action-hover. This is the download action; support remains a direct navigation destination.
- **Secondary exploration link:** underlined blue link with no filled container; leads to the brew-image section immediately after the hero. Public App Store and Google Play badges remain conditional on verified configured URLs; both are currently absent.
- **Navigation:** Features, Scales, Guide and Support plus separate EN/RU navigation. Current page is underlined; current language is also weight (800). Home defaults use Navigation text; reading pages use Muted text. Hover/current states use Text. Language links target equivalent pages.
- **Native captures:** six unchanged PNGs from the authorized actual iPhone journal. The regular disconnected main screen is a direct physical iPhone capture (1290 × 2796). Other screens are native simulator captures (1206 × 2622). The primary main screen uses unchanged production BrewView linked into a native capture harness, in ordinary scale mode with both weight and flow charts. All279 original Bookoo samples go through production weight/flow algorithms; the simulator connection and clock are injected. Native raw weight is46.2g, dose20.4g, time27.9s; stored final weight remains46.1g. It is not a physical live Bluetooth capture. Original journal coffee names and photos are preserved. Private fields were removed only from the screenshot working copy. Source evidence lives in `docs/screenshot-provenance.json`; raw database/photos are never site assets.
- **Feature summaries and detail:** flat icon/text rows, then anchor-indexed groups with (24) detailed feature descriptions and optional native screenshots. Inline SVGs are (24px), stroke width (1.6); summary icon holders use (48px) basis and padding (12px). Do not put the rows into card shells.
- **Scale catalog:** (26) entries across (19) implemented protocol families, separated by fine rules. Each entry states evidence scope, caveats and seven individual capabilities in a definition grid. Protocol implementation is distinct from physical model/platform/command testing. Search is progressively revealed by JavaScript, matches model names and aliases, filters entries and their index links, and announces the remaining count; without JavaScript all entries remain readable.
- **Reading surfaces:** the guide is plain ordered explanatory content. Contents and contact blocks use native-gray fill and no shadow; contents links wrap. Contact padding becomes (20px) on mobile. Privacy summary is a horizontal border-separated row, stacked at tablet width.
- **Footer:** centered author/contact, wrapping direct support/legal links and copyright. Public support, privacy, deletion and terms remain available without an account.

**The Native Evidence Rule.** Use only documented application captures. Keep source, platform, recording and sample-metadata evidence in internal documentation; do not fabricate product UI or device validation.

All keyboard targets use a visible outline (3px solid Focus, offset 5px). Links underline on hover with offset (5px), except the filled primary action. The skip link appears on focus. The primary background transition is (.2s); reduced-motion preference disables transitions and changes smooth anchor scrolling to automatic. No chip, dialog, card or other input component is currently implemented beyond catalog search.

## Do's and Don'ts

### Do:

- **Do** preserve the current Beanzen layout, original app icon and local Manrope.
- **Do** use the existing configuration and Sass cascade, including final catalog overrides.
- **Do** keep English and Russian layouts equivalent and allow navigation to wrap.
- **Do** preserve visible focus, the skip link, meaningful alt text and reduced-motion behavior.
- **Do** keep screenshot provenance accurate in docs/screenshot-provenance.json. Use short captions only when they help identify the screen or mode.
- **Do** keep APK download, support and conditional store badges distinct.

### Don't:

- **Don't** restore the rejected brown/cream palette or the superseded graphite header/hero.
- **Don't** restore the old phone-frame overlay, generated app UI, July development screenshot or rejected composition comps.
- **Don't** turn flat feature/catalog sections into elevated cards or add decorative reading-page surfaces.
- **Don't** invent token scales, model validation, store URLs, Android captures or profile-export controls.

## Copy and screenshot priorities

Use short, natural sentences. One sentence carries one idea. Remove repeated instructions and editorial process notes. Keep hardware limitations and legal disclosures. The main brewing screen leads the hero and feature page. Show ordinary scale brewing with both graphs first, then standard scale setup; keep GaggiMate views attached to that feature. History and catalog screens support that primary interface. Screenshot capture details belong in docs, not marketing captions.

## Verified design corrections

Impeccable 4.8 reviewed the surface independently for visual hierarchy and technical behavior. Mobile main-screen placement, catalog lookup order, model-name search, lazy-figure stability and enlarged-text wrapping were corrected. Offscreen skip-link hiding now uses its own height. Keep copy concise and reserve screenshot provenance for docs. See docs/design-audit.md for scoped evidence.


## Brew-image feature and detailed icons

The first home section after the main-interface hero is the brew-image feature (`#brew-image`). Desktop pairs the title and concise steps with a square native JPEG; mobile orders title, image, then steps. Use unchanged app-generated bytes at 1080 × 1080, a maximum display width of 520px, natural square aspect ratio and no phone frame. Its full-size link has a descriptive accessible name. A second filter-brew JPEG appears in the detailed journal feature. Keep output provenance in docs/share-image-provenance.json.

Every detailed feature reuses the homepage's 48px native-gray icon holder, 24px blue inline SVG and 1.6px stroke. The icon column is 48px, separated from the text by 16px. Text wraps independently. Icons are decorative; headings retain stable anchors and accessible names. No external icon requests or additional library are needed.
