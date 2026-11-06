# BeanZen website

Jekyll website for **BeanZen**, developed by **Dmitry Berezkin**. English at `/`, Russian at `/ru/`. Public support contact: **hello@beanzen.ru**. Domain: **beanzen.ru**.

Based on [Automatic App Landing Page](https://github.com/emilbaehr/automatic-app-landing-page) by Emil Baehr. The template's phone preview, application hero, feature section, Sass structure and Markdown pages are retained and adapted. Its MIT license is preserved in [LICENSE](LICENSE).

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

The workflow retains the `github-pages` build artifact for **30 days**. Retrying only the deploy job requires that artifact to still exist. If GitHub reports “No artifacts named github-pages” after an artifact expired or was deleted, choose **Re-run all jobs** so the build uploads a fresh artifact, or start a new run with **Run workflow**. Retrying only failed jobs does not rebuild a previously successful build.

## URLs for store submissions

| Purpose | English | Russian |
|---|---|---|
| Marketing | https://beanzen.ru/ | https://beanzen.ru/ru/ |
| Support | https://beanzen.ru/support/ | https://beanzen.ru/ru/support/ |
| Privacy Policy | https://beanzen.ru/privacy/ | https://beanzen.ru/ru/privacy/ |
| Data deletion instructions | https://beanzen.ru/delete-data/ | https://beanzen.ru/ru/delete-data/ |
| Terms of Use | https://beanzen.ru/terms/ | https://beanzen.ru/ru/terms/ |

**The website is the web portion of a submission, not a guarantee of approval.** See [the store submission checklist](docs/store-submission.md) for app, console, privacy and launch checks that remain outside this repository.

## Edit content

- `_config.yml`: developer, contact, domain, template colors, phone frame, screenshot and store links.
- `_data/locales/en.json`, `ru.json`: localized navigation, home page and feature list.
- `_pages/*.md`, `_pages/ru/*.md`: support and policy content. Use the same `key` on equivalent pages and explicit `permalink` values.
- `_sass/beanzen.scss`: BeanZen adaptation over the original template styles.
- `assets/screenshot/beanzen-ios.png`: a real development screenshot from the app repository; the caption identifies it as a development build. Replace it with a current release screenshot before a launch campaign if the interface changes.

Store badges stay hidden until `appstore_link` and/or `playstore_link` contain verified public listing URLs. No third-party app ID is shipped. To enable Apple's Smart App Banner, fill `ios_app_id` with BeanZen's numeric ID and set `enable_smart_app_banner: true`.

### Add a language

1. Copy `_data/locales/en.json` to a new locale and translate all values.
2. Add its code, native name, short label and URL prefix to `_data/languages.json`.
3. Add a home page with `layout: default`, `key: home`, `lang: <code>`, and an explicit localized permalink.
4. Copy each Markdown page, keeping its `key`, translating the text and setting the new `lang` and `permalink`.
5. Build and run the checks. Language links and SEO alternates match pages by their stable keys, preserving the current document.

English is the default and `x-default` language. There are no automatic language redirects. Privacy, support and deletion pages remain directly addressable.

## Privacy content maintenance

The owner confirmed local storage and no BeanZen accounts, servers, analytics, advertising or subscriptions. The policy also documents optional Xiaomi authentication, local GaggiMate HTTP/WebSocket traffic, protected scale tokens, photos, import/export, operating-system backups, support email and GitHub Pages hosting.

If these practices change, update both policy translations, the effective date in `_config.yml`, in-app disclosures and both store privacy declarations together. Implement the published support-mail retention practice: keep messages only as needed to resolve the request and related follow-up, then delete unless law requires retention.

Asset and template provenance is recorded in [docs/credits.md](docs/credits.md).
