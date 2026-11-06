# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Jekyll on GitHub Pages, explicitly requested by the owner. English is the primary language. The architecture must support additional languages without unsupported Jekyll plugins.

## Users

Beanzen mobile app users seeking product information, support, privacy information, and control over their data. Store reviewers must be able to access these resources publicly.

## Product Purpose

Provide the website portion of an App Store and Google Play submission, with accurate product information and accessible contact and privacy resources.

## Capabilities and Constraints

The website repository is https://github.com/securny/beanzen.github.io and is deployed on beanzen.ru. Its default Pages project path is /beanzen.github.io. Do not change the mobile app or unrelated projects. Do not invent store links, reviews, downloads, pricing, or operator contact details.

## Evidence on Hand

Read-only inspection of /Users/berezkin/development/BeanZen shows local brew records and photos, Bluetooth scales, GaggiMate local-network connectivity, optional Xiaomi authentication to retrieve Hoto device tokens, Beanconqueror imports and user-initiated brew-image sharing. These are repository observations, not a completed release privacy audit. The existing app icon is available in Darwin/Assets.xcassets/AppIcon.appiconset/AppIcon~ios-marketing.png. Current native iOS captures are now available with source provenance; no Android capture or public store URLs are claimed.

## Open Decisions

The owner confirms developer Dmitry Berezkin, public contact hello@beanzen.ru, custom domain beanzen.ru (CNAME required), English and Russian versions, and a local app with no Beanzen accounts, servers, analytics, advertising, or subscriptions. Design is delegated, preserving the app identity, and the owner explicitly chooses an image mockup before implementation. No fixed support-correspondence retention period was specified; state purpose-limited retention rather than inventing a fixed time or statutory exception.

## Product Principles

- Describe the actual app and its integrations.
- Make privacy and support directly reachable without an account or JavaScript.
- Keep translations at stable, equivalent URLs.
- Preserve existing Beanzen identity assets.

## Template commitment

The owner subsequently selects emilbaehr/automatic-app-landing-page. Its phone preview, app information hero, feature list, Sass structure, Markdown subpages, and configurable theme are now the visual and implementation authority, replacing the earlier custom chart concept. Preserve its MIT license.

## Product Name

The product name is **Beanzen**, with a lowercase z. Use this spelling in all website copy, metadata, translations and future content. Existing filesystem paths and application identifiers retain their actual spelling.

## Approved expansion (2026-11-06)

Add equivalent English/Russian detailed feature, scale compatibility and brewing guide pages. Use current native screenshots with source provenance kept internally. Android downloads link to https://github.com/securny/beanzen/releases, labelled APK. Distinguish protocol implementation from model/platform/command hardware tests. Do not advertise the unused profile serializer as a user-facing export.

The owner rejected the brown/cream palette and finally selected variant 1: a fully light native palette with white and light-gray surfaces, dark text and blue accents. The briefly selected graphite header/hero is superseded. Keep the chosen upstream template structure, the app icon and Jekyll/GitHub Pages compatibility. Pages artifact retention remains one day.

## Copy and template cleanup (2026-11-06)

The owner requests natural, simple language with one idea per sentence. Apply infostyle to public product copy. Remove screenshot-authenticity captions and other process commentary. Keep factual equipment limitations. The MAIN brewing screen must lead the site, because it is the primary interface. The primary capture must show ordinary scale mode with nonempty weight and flow charts. Machine mode belongs only to the GaggiMate feature. No synthetic app UI or physical live Bluetooth claim.

The owner authorizes removal of template branding and unused configuration/assets. The site has no external Jekyll theme dependency. Retain working local CSS and the MIT notice for copied code. Palette variables now live in _sass/colors.scss. See docs/template-audit.md.

## Actual journal captures

The owner explicitly authorized read-only download of the paired iPhone journal and use of its actual coffee/brew records for screenshots. The raw journal/photos stay private and are not website assets. Replace all prepared-sample screenshots. The primary main capture feeds the279 original Bookoo weight/time samples into the unchanged production BrewView/session/flow algorithms using a separate native harness. It shows ordinary scale mode with both charts. The dose is20.4g and the raw header weight46.2g; the saved record final weight is46.1g. Simulator transport and clock state are injected; no physical live Bluetooth connection is claimed. The standard idle main screenshot is directly from iPhone. Keep that distinction in source provenance.


## Brew images and privacy (2026-11-06)

A brew image is a key acquisition feature. Show it immediately after the main-interface hero, with an unchanged native JPEG made from the authorized actual journal. The image combines a cover photo with selected Coffee, Brewer, Grinder, Water, Tasting and Brew sections. It contains no measurement chart. The guide must follow the shipped History → brew → Share image → sections → Share flow. A cover photo is required; empty sections are unavailable. Keep capture provenance in docs, never public process captions.

Detailed feature descriptions use the same inline SVG icon system as the homepage. Give every feature an appropriate icon. Keep icons decorative and the heading as its accessible name.

The owner confirms Russia as the country of the individual creator Dmitry Berezkin, general audience (not child-directed), and Gmail for hello@beanzen.ru. Public copy presents the support contact as operational. International policy coverage must disclose actual processing and conditional statutory rights without promising universal legal compliance. In-app links, console labels and operational duties remain separate from the website.


## Primary screenshot acceptance

The main screenshot must show ordinary scale mode, both nonempty weight and flow charts, the five metrics and ordinary scale controls. _data/screens.json[id=main] supplies both hero and feature capture; do not configure a second path. Capture provenance and exact-byte visual review are required. Known wrong GaggiMate playback bytes must not be published, even under another filename. See AGENTS.md and docs/screenshot-review.md.
