# Privacy policy review — 2026-11-06

This is internal release documentation, excluded from the published website. It describes the scope of the website work, not a certificate of worldwide compliance or a completed binary/console audit.

## Confirmed facts

The owner confirms Dmitry Berezkin, individual hobby creator in Russia, hello@beanzen.ru, Gmail as the mail provider, a general audience (not child-directed), and no Beanzen accounts, developer-operated app servers, cloud synchronization, analytics, advertising or subscriptions. The owner will make the mailbox functional before submission and explicitly requests operational public wording. No invented street address, representative, DPO, retention period or provider contract appears in the notice.

## Data-flow coverage

| Flow | Published disclosure | Evidence |
|---|---|---|
| Journal, photos, scale readings | Local storage; no automatic upload to the developer | App source and owner confirmation |
| Bluetooth | Scale names/identifiers, supported commands and measurements; no location tracking | Bluetooth adapters and permissions |
| Hoto / Xiaomi | Optional credentials/codes sent to Xiaomi over HTTPS; account/session/home/device information and scale token; protected local token storage; password not persisted as a setting | Xiaomi authentication and token store implementation |
| GaggiMate | User-entered local address and machine measurements/status; HTTP/WS without encryption | Local transport implementation |
| Beanconqueror | Selected folder/ZIP processed locally | Import UI and importer |
| Brew image | Photo plus enabled Coffee/Brewer/Grinder/Water/Tasting/Brew sections; local JPEG cache; user-initiated OS sharing; separate recipient copies | Native generator, two unchanged app outputs, docs/share-image-provenance.json |
| Cache deletion | App clears share cache; no invented fixed deletion time | ShareFiles.clear(), ShareRender.swift and ContentView.swift callers |
| Backups/diagnostics | Platform/provider settings and policies; separate from developer servers | Platform integration and manifest |
| Support | Sender/contact, headers, message and attachments; Gmail; purpose-limited retention and applicable legal exceptions | Owner-confirmed contact/provider and ordinary email behavior |
| Website | GitHub Pages security IP handling; no added tracking, analytics, cookies or browser storage | Site source and GitHub docs |

EN and RU retain stable anchors and cover purposes, recipients, permissions, storage, deletion, security, international processing, applicable legal bases for developer-held data, conditional regional rights, children, contact and policy updates. The owner confirms Russia only; CoffeeScale's exact postal address and contact were not copied.

## Primary reference sources

- [Google Play User Data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en): public HTML notice, app/store access, actual data handling, security, retention and deletion.
- [Google Data safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en): audit the release and third-party flows; local storage alone does not settle all answers.
- [Apple review guidelines 5.1](https://developer.apple.com/app-store/review/guidelines/#privacy) and [App Privacy details](https://developer.apple.com/app-store/app-privacy-details/): in-app and listing policy, permission and collection disclosures.
- [GDPR](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=oj%3AJOL_2016_119_R_0001), [EDPB transparency guidance](https://www.edpb.europa.eu/system/files/2023-09/wp260rev01_en.pdf), [European Commission legal bases](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/legal-grounds-processing-data_en), and [ICO privacy information](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/).
- [California Attorney General CCPA](https://oag.ca.gov/privacy/ccpa), [Brazil ANPD rights](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares), and [Canada OPC consent](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/): regional descriptions apply conditionally; they do not assert that statutory thresholds or territorial scope are always met.
- [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection), [GitHub privacy](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement), [Google privacy](https://policies.google.com/privacy), [Xiaomi privacy](https://privacy.mi.com/all/en_US/): provider processing and international operations; no unsupported statement that Beanzen has signed specific safeguards.
- [Owner's CoffeeScale reference](https://github.com/securny/coffeescaleapp.github.io/blob/main/_pages/privacypolicy.md): topic outline and historical identity only. Its unrelated boilerplate and conflicting no-data/credential claims were not copied.

## Release work outside this repository

1. Add an accessible in-app privacy link to https://beanzen.ru/privacy/ and localized equivalent. Read-only source search found no production policy link. Fastlane metadata still contains example.org URLs and starter text; replace those in the app release task.
2. Complete App Privacy and Data safety for the exact binaries, dependencies and optional Xiaomi behavior. Do not automatically reuse DATA_NOT_COLLECTED or a blanket encrypted-transit answer. GaggiMate is local HTTP/WS; assess the actual payload and store requirements.
3. Verify runtime permission purposes, any required prominent disclosure/consent, privacy manifests/required-reason APIs, audience answers, review access and screenshots. No new consent flow was asserted in the public notice.
4. Configure and monitor the stated mailbox before submission. Implement the published purpose-limited retention and rights-request practices. The site opens a mail composer, not a backend form.
5. Assess applicable Russian personal-data duties (including collection/localization, notification and cross-border rules where relevant), the actual Gmail/provider arrangement and transfer mechanism, and EU/UK representation if applicable. A policy cannot implement those operational/legal obligations. Hobby status does not automatically exempt public services from every privacy law.
6. Maintain provider-held data distinctions and local deletion instructions. Do not promise that uninstall removes iOS Keychain, backups, shared copies or support mail.

The website task does not modify the app, console entries, mail infrastructure or legal/provider arrangements. Store approval and worldwide availability remain decisions of the stores and applicable authorities.
