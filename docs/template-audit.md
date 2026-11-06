# Jekyll template audit

Checked 2026-11-06 against emilbaehr/automatic-app-landing-page, master.

## Dependency

There is no `theme`, `remote_theme` or theme gem. The repository builds independently with Jekyll. It contains adapted source files copied from the original template.

## Retained code

- `_sass/base.scss` supplies resets and the rem baseline. Before cleanup it matched upstream except for trailing whitespace.
- `_sass/layout.scss` supplies the grid, navigation, flex layout, app-information and footer rules. Before cleanup it matched upstream except for whitespace. Current rules are still used beneath Beanzen's responsive overrides.
- `_sass/github-markdown.scss` matches upstream. Reading pages still use its typography and list styles.
- Page layouts and includes have been rewritten for Beanzen, localization, feature and scale catalogs, support and privacy.

## Removed

The attribution comment and old visual settings were removed from `_config.yml`. Beanzen's fixed palette lives in `_sass/colors.scss`. Unused phone frames, masks, header art, video-preview styles and the empty store-metadata include were removed. Store badge assets remain for future verified store URLs.

## Decision

Keep the working base styles. There is no external theme to disconnect. A full CSS rewrite would require replacing code that is still active. Preserve the MIT copyright notice in LICENSE and source attribution in docs/credits.md.
