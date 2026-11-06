# Beanzen website

Jekyll website for **Beanzen**, developed by **Dmitry Berezkin**. English at `/`, Russian at `/ru/`. Public support contact: **hello@beanzen.ru**. Domain: **beanzen.ru**.

Standalone Jekyll site. It uses adapted source styles from Automatic App Landing Page, with attribution in [docs/credits.md](docs/credits.md) and [LICENSE](LICENSE). There is no external theme dependency. See [the template audit](docs/template-audit.md).

## Run locally

Use Ruby 3.3 (see `.ruby-version`):

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Open http://127.0.0.1:4000. Preview a project path with:

```sh
bundle exec jekyll serve --baseurl /beanzen.github.io
```

To verify the site:

```sh
JEKYLL_ENV=production bundle exec jekyll build
python3 scripts/check_site.py _site
```

Jekyll 3.10 is compatible with GitHub Pages. The site uses no custom plugins or client-side metadata fetches, analytics, cookies or remote fonts. Core content, navigation and the phone preview work with JavaScript disabled.

## Publish on GitHub Pages

1. Push this source to `main` of `securny/beanzen.github.io`.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**. The included workflow builds and checks the site before deployment. Pull requests build and check without deploying.
3. In **Settings → Pages → Custom domain**, save **beanzen.ru**. The root `CNAME` is already set to `beanzen.ru`; with an Actions deployment the repository setting is still required.
4. Configure the apex domain with your DNS provider. Use the records in [GitHub's current custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), or an ALIAS/ANAME to `securny.github.io`. A file named CNAME does not configure DNS.
5. Once the certificate is issued, enable **Enforce HTTPS** in Pages settings. Verify the public URLs below without signing into GitHub.

Set the custom domain on GitHub before changing DNS. For the GitHub project URL without a custom domain, change `url` to `https://securny.github.io`, `baseurl` to `/beanzen.github.io`, and remove the custom-domain setting and CNAME. All internal links and CSS resources respect `baseurl`.

### Retry a failed deployment

The workflow retains the `github-pages` build artifact for **1 day**. Retrying only the deploy job requires that artifact to still exist. If GitHub reports “No artifacts named github-pages” after an artifact expired or was deleted, choose **Re-run all jobs** so the build uploads a fresh artifact, or start a new run with **Run workflow**. Retrying only failed jobs does not rebuild a previously successful build.

## URLs for store submissions

| Purpose | English | Russian |
|---|---|---|
| Marketing | https://beanzen.ru/ | https://beanzen.ru/ru/ |
| Features | https://beanzen.ru/features/ | https://beanzen.ru/ru/features/ |
| Supported scales | https://beanzen.ru/scales/ | https://beanzen.ru/ru/scales/ |
| Brewing guide | https://beanzen.ru/guide/ | https://beanzen.ru/ru/guide/ |
| Support | https://beanzen.ru/support/ | https://beanzen.ru/ru/support/ |
| Privacy Policy | https://beanzen.ru/privacy/ | https://beanzen.ru/ru/privacy/ |
| Data deletion instructions | https://beanzen.ru/delete-data/ | https://beanzen.ru/ru/delete-data/ |
| Terms of Use | https://beanzen.ru/terms/ | https://beanzen.ru/ru/terms/ |

**The website is the web portion of a submission, not a guarantee of approval.** See [the store submission checklist](docs/store-submission.md) for app, console, privacy and launch checks that remain outside this repository.

## Edit content

- `_config.yml`: developer, contact, domain and download links.
- `_sass/colors.scss`: the Beanzen light palette.
- `_data/locales/en.json`, `ru.json`: localized navigation, home page and feature list.
- `_pages/*.md`, `_pages/ru/*.md`: support and policy content. Use the same `key` on equivalent pages and explicit `permalink` values.
- `_sass/beanzen.scss`: Beanzen adaptation over the original template styles.
- `_data/features.json`: bilingual detailed descriptions and implementation evidence.
- `_data/scales.json`: model names, individual adapter capabilities and scoped hardware observations. Audit and sources: `docs/scale-audit.md` and `docs/scale-evidence.json`.
- `_data/screens.json`: the single primary screenshot selection (`id: main`), dimensions, localized captions and alt text. The hero and main feature share this record.
- `assets/screenshot/`: six unchanged native iOS captures from the actual authorized iPhone journal. `docs/screenshot-provenance.json` records source commit, version, measurement provenance, simulator/harness limits, exact-byte visual review and SHA-256 hashes. No Android or live Bluetooth capture is claimed.
- `_sass/catalog.scss`: responsive catalog, guide and screenshot presentation.
- `assets/share/` and `_data/share_images.json`: unchanged native brew-image JPEGs and translated alternatives; provenance in `docs/share-image-provenance.json`.
- `_sass/share.scss` and `_includes/share-image.html`: the prominent brew-image section after the home hero.

The Android action uses `android_download_link`, currently the public GitHub Releases page. It is labelled Download APK, not Google Play. Store badges stay hidden until `appstore_link` and/or `playstore_link` contain verified public listing URLs. No third-party app ID is shipped. To enable Apple's Smart App Banner, fill `ios_app_id` with Beanzen's numeric ID and set `enable_smart_app_banner: true`.

### Add a language

1. Copy `_data/locales/en.json` to a new locale and translate all values.
2. Add its code, native name, short label and URL prefix to `_data/languages.json`.
3. Add a home page with `layout: default`, `key: home`, `lang: <code>`, and an explicit localized permalink.
4. Copy all content pages (including Features, Scales and Guide), keeping each `key`, and set the new `lang` and `permalink`. Translate the feature catalog, scale notes, screen captions and alt text as well as Markdown copy.
5. Build and run the checks. Language links and SEO alternates match pages by their stable keys, preserving the current document.

English is the default and `x-default` language. There are no automatic language redirects. Privacy, support and deletion pages remain directly addressable.

## Privacy content maintenance

The owner confirmed developer Dmitry Berezkin (individual hobby creator, Russia), Gmail for hello@beanzen.ru, a general audience, local storage and no Beanzen accounts, servers, analytics, advertising or subscriptions. The policy also documents optional Xiaomi authentication, local GaggiMate HTTP/WebSocket traffic, protected scale tokens, photos, imports, user-initiated image sharing, operating-system backups, support email and GitHub Pages hosting. Both translations include conditional regional rights, developer-held support data legal bases, international processing, security, retention and deletion. Source coverage and remaining release duties are documented in `docs/privacy-review.md`.

If these practices change, update both policy translations, the effective date in `_config.yml`, in-app disclosures and both store privacy declarations together. Implement the published support-mail retention practice: keep messages only as needed to resolve the request and related follow-up, then delete unless law requires retention.

Asset and template provenance is recorded in [docs/credits.md](docs/credits.md).

## Content evidence

Descriptions are audited against app main `90110460fc5b03d1e8ef9f9ca7ff1ab5fd2d434a` (26.10.21). A serializer for brew-profile export exists in the code but has no production UI caller; do not advertise file export or a complete journal backup. Sharing currently creates brew images. Scale adapters are cross-platform implementation evidence, not a claim that all models and commands have been tested on both operating systems. Keep evidence scoped to the named model, firmware, app, platform and operation.

Public copy uses short, complete sentences with one idea each. Omit process notes and screenshot-authenticity disclaimers from marketing pages. Keep provenance in internal documentation. Keep equipment limitations and legal disclosures accurate.

The owner selected the fully light native palette: white/light gray, dark text, blue accents. The briefly considered graphite hero was rejected.


Primary screenshot acceptance and the correction of the missing flow chart are documented in [docs/screenshot-review.md](docs/screenshot-review.md). Read [AGENTS.md](AGENTS.md) before capture or product-image changes. The site check rejects the old machine-mode image, a primary capture without reviewed weight/flow charts, and mismatches between the hero and primary feature selection. These checks enforce recorded review evidence; they do not replace inspection of actual pixels.
