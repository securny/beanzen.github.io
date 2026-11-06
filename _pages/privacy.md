---
layout: page
title: "Privacy Policy"
intro: "How Beanzen handles your information, on your device and when you choose to use an integration."
description: "How Beanzen handles your information, on your device and when you choose to use an integration."
lang: en
key: privacy
permalink: /privacy/
policy: true
sections:
  - id: about
    title: "Who is responsible"
  - id: local-data
    title: "Data on your device"
  - id: integrations
    title: "Connections and sharing"
  - id: permissions
    title: "Permissions"
  - id: website
    title: "Support and the website"
  - id: legal-bases
    title: "Purposes and legal bases"
  - id: retention
    title: "Storage and deletion"
  - id: international
    title: "International processing"
  - id: rights
    title: "Your rights"
  - id: children
    title: "Children"
  - id: changes
    title: "Policy updates"
---
{% assign locale = site.data.languages | where: 'code', page.lang | first %}{% assign prefix = locale.prefix | default: '' %}

## Who is responsible {#about}

**{{ site.your_name }}**, an individual based in **Russia**, develops Beanzen and is responsible for the personal information handled by the developer under this policy. Beanzen is a hobby project. This policy covers the Beanzen application for iOS and Android and **beanzen.ru**.

For support and privacy requests, write to **[{{ site.email_address }}](mailto:{{ site.email_address }}?subject=Beanzen%20privacy%20request)**.

Beanzen has no Beanzen accounts, developer-operated app servers, cloud synchronization, analytics, advertising or subscriptions. Your coffee journal stays on your device. The developer does not automatically receive your journal, photos, scale measurements or Xiaomi credentials. Optional connections, sharing, website hosting and support email involve the recipients described below.

## Data on your device {#local-data}

Beanzen processes the data you enter, select, import or receive from your equipment:

- **Brew records:** dates, time, weight, flow, dose, ratio, temperature, recipes, ratings, notes and other recorded measurements.
- **Your coffee journal:** coffee, water, grinder, brewer and scale details, photographs and preferences.
- **Connections:** nearby Bluetooth device names and identifiers, local machine addresses, equipment measurements, connection settings and a saved Hoto scale token if you use that integration.
- **Import files:** the Beanconqueror folder or ZIP file you select and its supported records and images.
- **Record metadata:** the app version and platform saved with a brew.

These data let Beanzen display measurements, connect equipment, organize your journal, import records and create brew images. Processing and storage take place locally unless you choose a feature that sends data as described in the next section. No journal upload is required to use Beanzen.

## Connections and sharing {#integrations}

### Bluetooth scales

Beanzen scans for compatible nearby scales and exchanges supported commands and measurements with the scale you connect. This uses the scale's name, Bluetooth identifier, weight, timer and other supported readings. Beanzen does not use Bluetooth scanning to track your physical location.

### GaggiMate and your local network

If you configure a GaggiMate-equipped machine, Beanzen connects to the address you provide on your local network. It exchanges the machine status and brew measurements needed for the integration. This integration uses **unencrypted local HTTP and WebSocket connections**. Use a trusted network. The connection does not send your journal to a Beanzen server.

### Optional Hoto / Xiaomi sign-in

Some Hoto scales need a Xiaomi device token. If you use this setup, Beanzen sends the sign-in information and verification codes you enter directly to Xiaomi's authentication services over HTTPS. It then requests the Xiaomi account, session, home and device information needed to find your scale and obtain its token. Xiaomi also receives network information, including your IP address.

The scale token is saved locally in **Keychain on iOS** or **encrypted preferences on Android**. Your Xiaomi password is not saved as a persistent Beanzen setting. The developer does not receive your password, codes, account information or token. Xiaomi handles its service data under the [Xiaomi Privacy Policy](https://privacy.mi.com/all/en_US/) and any notice for the service you use.

This sign-in is optional. It is not needed for scales that do not require Xiaomi authentication. Clearing the token in Beanzen does not delete your Xiaomi account or information held by Xiaomi.

### Photos, imports and brew images

Beanzen reads the photos and import files you select. A brew image is generated **on your device** from a cover photo and the sections you enable: coffee, brewer, grinder, water, tasting rating and brew parameters. Beanzen does not send the image to an AI or remote image-generation service.

The generated JPEG is stored temporarily in the app's cache. Saving or sharing it happens at your request through the operating system. The destination you select receives the image and the information visible in it. Review the preview before sharing. A saved image or a recipient's copy is separate from your Beanzen journal and is handled by that app, service or recipient.

### Backups and platform diagnostics

Your operating system or backup provider may include app data in a device backup, depending on your settings. The operating system or app store may also process crash reports and diagnostics under its own settings and policies. Beanzen does not operate these services and does not include an analytics or advertising SDK. Consult your platform's privacy and backup controls for these copies and reports.

## Permissions {#permissions}

Beanzen requests access when it is needed for a feature:

- **Bluetooth / Nearby devices:** find and connect to compatible scales.
- **Local network:** connect to a machine you configure, such as GaggiMate.
- **Camera:** take a photo when you choose to add one.
- **Photos and files:** select images or import files and save or share a generated image using system controls.

You can decline access or revoke it in your device settings. The corresponding feature may then be unavailable. Permission does not authorize advertising, location tracking or an upload of your journal to the developer.

## Support and the website {#website}

### Support email

If you write to {{ site.email_address }}, the developer receives your email address, the sender name and message headers supplied by your email service, your message and any attachments. This information is used to reply, investigate the issue you describe and handle privacy requests. Send only what is needed. Do not send passwords, verification codes or scale tokens.

Support mail is handled through **Google's Gmail service**. Google processes mail and related service information under its terms and [Google Privacy Policy](https://policies.google.com/privacy). Your own mail provider also handles the message you send. Your journal is not sent to support unless you choose to include information from it.

### Website hosting and external links

**GitHub Pages** hosts this site. GitHub records visitors' IP addresses for security purposes. See [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection) and the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) for its processing and retention practices.

This website adds no analytics, advertising trackers, cookies or browser storage. Fonts, icons and images are hosted with the site. Following a download or other external link takes you to that provider, whose privacy practices apply there.

## Purposes and legal bases {#legal-bases}

For personal information received by the developer, including support correspondence, the following legal bases apply where the relevant law recognizes them:

- Handling ordinary support messages relies on the legitimate interest in answering questions and resolving reported problems. This is limited to the information needed for that purpose and is subject to your applicable right to object.
- Handling a statutory privacy request or retaining information required by law relies on the relevant legal obligation.
You choose whether to use optional connections and sharing. Where processing relies on your consent, you may withdraw it without affecting earlier lawful processing.

A system permission controls device access. It does not replace any separate consent required by law. You do not have to send a support message or use an optional integration to use the local journal. Without information necessary for a request or connection, that request or connection may not be possible.

Beanzen does not sell personal information, share it for cross-context behavioral advertising, use it for targeted advertising or make automated decisions with legal or similarly significant effects. The app does not build advertising profiles.

## Storage, security and deletion {#retention}

**Local records and photos** remain until you delete them or clear the app's local data. **Saved scale tokens** remain until cleared. On iOS, Keychain entries can survive uninstalling an app. Generated images in the app's temporary cache are cleared by the app's cache cleanup; copies saved to Photos, sent elsewhere or included in backups are separate.

**Support correspondence** is kept while needed to resolve your request and related follow-up. It is then deleted unless a legal obligation or the establishment, exercise or defense of a legal claim requires retention. Any such retained information is limited to that purpose. You can request deletion at {{ site.email_address }}.

**Provider-held data**, including GitHub security logs, Xiaomi service records and device backups, follow that provider's retention rules. The developer cannot delete those records for you.

See **[Delete Beanzen data]({{ prefix | append: '/delete-data/' | relative_url }})** for deleting local data and clearing a Hoto token. There is no Beanzen account to delete or developer-hosted journal to erase. Uninstalling the app does not remove images you saved or sent, system backups, support messages or credentials that remain in the platform's protected storage.

Beanzen uses app-local storage, platform-protected token storage and HTTPS for Xiaomi authentication. Website connections use HTTPS. GaggiMate's unencrypted local connection is described above. Protect your device and backups with the security controls provided by your platform. No storage or transmission method can guarantee absolute security.

## International processing {#international}

The developer handles support requests from **Russia**. If you contact support from another country, the information in your email is made available to the developer there. Gmail, GitHub and Xiaomi may process information in other countries under their respective policies. Google's and GitHub's services include processing in the United States; Xiaomi's processing locations depend on the service and region you select. The laws in those countries may differ from those in your country.

Your local journal is not transferred to the developer merely because you install or use Beanzen. Transfers arise from the optional services, hosting, email or sharing described in this policy. The linked provider policies explain their processing locations and applicable transfer safeguards. Contact {{ site.email_address }} for questions about information held by the developer and any safeguards applicable to your request.

## Your rights and choices {#rights}

You can review and edit your local records, revoke permissions, stop using optional connections and [delete local data]({{ prefix | append: '/delete-data/' | relative_url }}). The developer cannot remotely access, correct or erase a journal stored only on your device.

Depending on the law that applies to you, you may have rights to confirmation and information about processing, access or a copy, correction, deletion, restriction, objection and portability. You may withdraw consent where processing relies on it. These rights can have legal limits and exceptions.

To make a request about information the developer holds, including support correspondence, email **{{ site.email_address }}**. Describe your request and use the address associated with the correspondence where possible. Only information reasonably necessary to verify and fulfill the request will be requested. Requests are handled within the time required by applicable law. If a request cannot be fulfilled, the reason and any available appeal route will be explained. You will not be unlawfully discriminated against for exercising your rights.

- **EEA, United Kingdom and Switzerland:** where the relevant law applies, you may also complain to your data protection authority. See the [EEA authorities](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en), [UK ICO](https://ico.org.uk/make-a-complaint/) or [Swiss FDPIC](https://www.edoeb.admin.ch/en).
- **United States:** where state law applies, rights may include knowing the categories, sources, purposes and recipients of personal information, accessing, correcting, deleting or obtaining a copy. An authorized agent may submit a request where permitted. To appeal a decision where an appeal right applies, reply to the decision or email {{ site.email_address }}. Beanzen does not sell information or use advertising-related sharing or targeted advertising.
- **Brazil:** where the LGPD applies, rights include confirmation, access, correction, applicable anonymization, blocking, deletion or portability, information about sharing and consent, and revocation of consent. You may raise a complaint with the [ANPD](https://www.gov.br/anpd/pt-br).
- **Canada:** where applicable, you may request access and correction, challenge our privacy practices and withdraw consent, subject to legal restrictions. Any effect on a requested service will be explained. You may contact the relevant federal or provincial privacy authority, including the [Office of the Privacy Commissioner of Canada](https://www.priv.gc.ca/en/).
- **Russia and other countries:** applicable law may give you rights to information, access, correction, blocking or deletion, withdrawal of consent and a complaint to a supervisory authority or court. In Russia, the relevant supervisory authority is Roskomnadzor. Contact {{ site.email_address }} to exercise rights concerning information held by the developer.

These regional descriptions do not limit rights available under other applicable laws. Providers such as Xiaomi, Google and GitHub handle requests concerning information they hold through their own privacy channels.

## Children {#children}

Beanzen is intended for a general audience and is not directed at children. The developer does not knowingly solicit personal information from children. A parent or guardian who believes a child has sent personal information to support can contact {{ site.email_address }} to request its review and deletion, subject to applicable law.

## Changes to this policy {#changes}

This page shows the effective date of the policy. If data practices change, the policy will be updated. Notice or consent will be provided where required by applicable law.
