# Store submission and launch checklist

Checked against official store documentation on **2026-11-01**. This repository supplies the website portion of a submission. Publishing the website does not complete the app binary, console declarations, developer verification, or store review.

## Public resources prepared

| Resource | URL | Purpose |
|---|---|---|
| Product page | https://beanzen.ru/ | App Store Marketing URL; Play website |
| Support | https://beanzen.ru/support/ | App Store Support URL; real developer contact and troubleshooting |
| Privacy Policy | https://beanzen.ru/privacy/ | Privacy Policy URL in both consoles and in-app links |
| Data controls | https://beanzen.ru/delete-data/ | Local data removal and support-mail deletion instructions |
| Terms | https://beanzen.ru/terms/ | General usage terms; no subscription flow |

Each has a Russian equivalent under `/ru/`. The pages are static HTML, have no login requirement, and remain usable without JavaScript. They identify BeanZen, Dmitry Berezkin and hello@beanzen.ru.

The policy describes locally stored records and photos, permissions, optional Xiaomi authentication and protected Hoto tokens, local GaggiMate connections, imports/exports, backups, support correspondence, and website hosting. This addresses the categories of disclosure required by the [Google Play User Data policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en).

## Before using the URLs

- [ ] Push the source and complete a successful Pages deployment.
- [ ] Select GitHub Actions in repository Pages settings, set the custom domain to `beanzen.ru`, configure DNS, and enable HTTPS. The `CNAME` file alone does not complete the domain setup. [GitHub instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
- [ ] Open every resource above from an unauthenticated browser and a mobile connection. Confirm that redirects, HTTPS and the Russian equivalents work publicly.
- [ ] Verify that hello@beanzen.ru receives mail and is monitored. The site opens a mail composer; it does not send messages or provide a server-side form.
- [ ] Follow the published support-retention practice: use messages only for handling the request and follow-up; delete them once no longer needed unless legal retention applies.
- [ ] Check the privacy text against the exact release, its dependencies, Xiaomi flow, platform backup behavior and diagnostics. Update both translations and the effective date if behavior changes.

## App Store Connect

- [ ] Set **Support URL** to `https://beanzen.ru/support/`. Apple requires a working support destination with real contact information. The page provides a named developer and email. Supply any additional legally required contact details for the countries where you distribute the app. [Apple field reference](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/).
- [ ] Set **Privacy Policy URL** to `https://beanzen.ru/privacy/`. Add an easily accessible policy link inside the mobile app as well. [App Review Guidelines, 5.1.1](https://developer.apple.com/app-store/review/guidelines/#privacy).
- [ ] Optionally set **Marketing URL** to `https://beanzen.ru/`.
- [ ] Complete **App Privacy** for the release, including relevant third-party processing. Do not copy a “Data Not Collected” answer solely because the developer has no server. Consider Xiaomi authentication separately using Apple's collection and optional-disclosure definitions. [Apple App Privacy details](https://developer.apple.com/app-store/app-privacy-details/).
- [ ] Check privacy manifests, required-reason APIs, permission descriptions and encryption/export-compliance answers in the app release.
- [ ] Supply accurate release screenshots, description, age rating and review notes. Explain how to review hardware-dependent features and optional Xiaomi sign-in; provide the access or demonstration material the reviewer needs.
- [ ] Complete developer identity, distribution agreements and territory-specific trader details in the console.

There is no BeanZen account creation in the confirmed app, so an in-app BeanZen account deletion flow is not applicable. If account creation is introduced, implement deletion inside the app before release; a website instruction alone is insufficient. [Apple account-deletion guidance](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion).

## Google Play Console

- [ ] Set the **Privacy Policy URL** to `https://beanzen.ru/privacy/`; also provide the policy inside the app.
- [ ] Use **hello@beanzen.ru** as the support email and `https://beanzen.ru/` as the developer website where requested.
- [ ] Complete **Data safety** for the exact binary and all dependencies. Review off-device Xiaomi authentication, device identifiers and any applicable exceptions; local-only journal storage does not by itself determine every answer. Do not automatically declare all transmission encrypted: the GaggiMate integration uses local HTTP/WebSocket traffic. Evaluate which traffic falls within the questionnaire's scope. [Google Data safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en).
- [ ] Answer the account-creation questions according to the actual app: there are no BeanZen accounts. Do not describe a nonexistent account deletion service. The website's `/delete-data/` resource explains local data controls.
- [ ] If account creation is added later, provide both in-app deletion initiation and a functional external deletion pathway for the account and associated data. [Google account deletion policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en#account_deletion).
- [ ] Complete App access, Ads, Target audience and content, content rating, developer verification, and required release/testing steps. Describe hardware dependencies for review.
- [ ] Verify current Android target API, permission and signing requirements for the submitted binary.

The owner confirms no advertising or subscriptions. No advertising domain file, subscription cancellation workflow or fabricated payment terms are added.

## Items found in the mobile repository

Read-only inspection of `/Users/berezkin/development/BeanZen` found these starter values:

| File | Existing value | Replace before submission |
|---|---|---|
| `Darwin/fastlane/metadata/en-US/privacy_url.txt` | `https://example.org/privacy/` | `https://beanzen.ru/privacy/` |
| `Darwin/fastlane/metadata/en-US/support_url.txt` | `https://example.org/support/` | `https://beanzen.ru/support/` |
| `Darwin/fastlane/metadata/en-US/software_url.txt` | `https://example.org/app/` | `https://beanzen.ru/` |
| `Darwin/fastlane/metadata/en-US/description.txt` | Skip starter description | Actual BeanZen release description |
| `Darwin/fastlane/metadata/en-US/subtitle.txt` | Skip starter subtitle | Actual BeanZen subtitle |
| `Darwin/fastlane/metadata/app_privacy_details.json` | `DATA_NOT_COLLECTED` | Verify against all release flows before use |

The mobile repository was not modified by this website task. Verify the in-app policy entry point separately.

## Website maintenance

Run `JEKYLL_ENV=production bundle exec jekyll build` and `python3 scripts/check_site.py _site`. The check covers the required pages, contact identity, locale counterparts, internal links and anchors, generated metadata, sitemap and CNAME.

App Store and Google Play badges are intentionally hidden until their real public URLs are entered in `_config.yml`. Replace the development-build preview with a current screenshot when available. Keep the template MIT notice and asset licenses.
