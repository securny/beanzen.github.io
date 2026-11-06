# Beanzen design check — 2026-11-06

Official Impeccable 4.8.0. Independent visual assessment and technical/browser assessment ran in separate contexts. The visual reviewer did not read detector output. Browser evidence used installed Chrome through Playwright; no persistent browser overlay is left running.

## Scope

English and Russian home, features, scale catalog and guide. Keep the owner-approved light palette and original icon. Main brewing screen takes priority. Public copy uses natural short sentences. Screenshots use the actual authorized iPhone journal; no raw database or photos directory is published.

## Initial assessments

- Visual review: **31/40** across all ten Nielsen heuristics.
- Technical audit: **16/20** across accessibility, performance, theming, responsive design and implementation integrity.
- Deterministic homepage scan: one typography advisory, no blocking structural finding. Four browser overlays surfaced nine single-word-ending advisories in total; these are optional typography findings, not accessibility failures.
- No dark theme was required by the brief.

These are the initial scores. Confirmation checked the listed fixes; it did not assign a new whole-site score.

## Material findings and confirmation

| Finding | Correction | Confirmation |
|---|---|---|
| P1: main screen buried on mobile | Put screenshot before supporting copy and before feature descriptions | Home image begins at y164 instead of y742 at390×844; features image at y606 instead of y2490 |
| P2: scale lookup follows long preamble | Move search first; collapse index and timer notes | Search at y359; first model at y620, previously y1429 |
| P2: model search matches unrelated caveats | Match explicit model names and known aliases | Pearl returns only Acaia Pearl; KT630B and CK811 aliases still work |
| P2: lazy images resize their figures | Stable width100%, max300px and real image dimensions | Fresh load/decode geometry verified stable |
| P2: enlarged Russian text and hidden skip link overflow | Wrap long headings; hide skip link by its own height | Same200% text-size stress test and keyboard focus check pass |

Both independent reviewers confirmed their material findings resolved. Optional paragraph rag improvements use text-wrap:pretty. The unnecessary download-source note was removed.

## Additional verification

- 32 final route/viewport combinations at390 and1440px: no horizontal overflow, missing images, request/page errors or automated axe A/AA violations.
- Supplemental initial audit at768 and992px, keyboard skip/focus, synthesized touch, no-JavaScript catalog and200% text-size stress.
- All26 models remain available without JavaScript. Search has labelled input, live count and actionable empty state.
- Six legal/deletion pages unchanged. All scale capabilities and original hardware evidence unchanged.
- All six published screenshot hashes match unchanged native captures. Direct iPhone capture and recording playback are distinguished in provenance.

Tests use emulated browser states. They are not a physical Safari/screen-reader audit or a complete WCAG conformance claim.

Questions skipped: the owner already supplied the palette, copy rules, main-screen priority and authorization to complete the corrections.


## Brew-image and feature-icon extension — 2026-11-06

Preserved the approved fully light palette and main brewing hero. Added a native brew-image section immediately after the hero and a filter image in the feature catalog. All 24 feature descriptions use the shared inline SVG system, including the six existing homepage symbols. No external asset requests or icon library were introduced.

Rendered the changed home, feature, guide and privacy routes in EN/RU at 390, 768 and 1440px (24 route/viewport combinations). No horizontal overflow, browser page errors or axe WCAG 2 A/AA and 2.1 A/AA violations remained. Inspected desktop/mobile screenshots directly. Confirmed links from hero to the image section and from there to the relevant guide anchor. New JPEGs decoded at their declared 1080 × 1080 dimensions. Fixed a discovered language-control label mismatch by including the visible EN/RU abbreviation in its accessible name. Jekyll/static resource checks passed both at the domain root and a nonempty baseurl.

This is a bounded verification of the extension, not a new whole-site critique score or a store-approval guarantee. Source manifests preserve hashes of every published native screenshot and brew-image JPEG. Browser screenshots and runtime logs remain local review artifacts and are not published.
