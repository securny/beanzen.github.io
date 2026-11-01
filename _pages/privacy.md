---
layout: page
title: "Privacy Policy"
intro: "How BeanZen handles your information, on your device and when you choose to use an integration."
description: "How BeanZen handles your information, on your device and when you choose to use an integration."
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
  - id: retention
    title: "Retention and deletion"
  - id: website
    title: "This website"
  - id: rights
    title: "Your choices"
---
## Who is responsible {#about}

BeanZen is developed by **{{ site.your_name }}**. This policy covers the BeanZen mobile application for iOS and Android and the website at **beanzen.ru**.

For privacy questions and requests, contact **[{{ site.email_address }}](mailto:{{ site.email_address }}?subject=BeanZen%20privacy%20request)**.

BeanZen has no BeanZen accounts, developer-operated servers, advertising, analytics, or subscriptions. Your brewing history is stored locally. Some optional features communicate with your equipment or a third-party service, as described below.

## Data on your device {#local-data}

BeanZen processes and stores the information you choose to record, including:

- Brew dates, timing, weight, flow rate, ratios, recipes, ratings, tasting notes and other brewing parameters.
- Coffee, water, grinder, brewer and scale details you add to your records.
- Photos you take or select, and information imported from files you choose.
- Bluetooth device names and identifiers, local machine addresses, connection preferences and supported equipment measurements.
- The application version and platform saved with a brew record.

This information is used to display live measurements, save and organize your coffee journal, connect your equipment, and create files or images that you choose to export or share. It is not automatically uploaded to the developer.

## Connections and sharing {#integrations}

### Bluetooth scales

BeanZen scans for and connects to compatible nearby scales to receive measurements and send supported scale commands. This involves device names, Bluetooth identifiers, weight, timing and other supported scale data. Bluetooth scanning is not used to determine your physical location.

### GaggiMate and your local network

If you configure a GaggiMate-equipped espresso machine, BeanZen connects to the machine address you provide on your local network. It exchanges the measurements and status needed for the integration. The current integration uses local HTTP and WebSocket connections, which are not encrypted. Use it on a network you trust. This connection does not send your brew history to a BeanZen server.

### Optional Hoto / Xiaomi sign-in

Some Hoto scales require a device token from Xiaomi. If you choose this setup, BeanZen processes the Xiaomi sign-in information and verification codes you enter and communicates with Xiaomi's authentication and device APIs over HTTPS. The process can access your Xiaomi account identifier, session information, home and device lists, and the token needed to connect to your scale. Xiaomi also receives network information such as your IP address.

The scale token is saved locally using the platform's protected credential storage: Keychain on iOS and encrypted preferences on Android. Your Xiaomi password is not saved as a persistent BeanZen setting. Xiaomi account authentication and device information are handled by Xiaomi under the [Xiaomi Privacy Policy](https://privacy.mi.com/all/en_US/). BeanZen does not create or manage a Xiaomi account for you.

This sign-in is optional and is not required for scales that do not need Xiaomi authentication.

### Import, export and sharing

BeanZen reads only the import files or photos that you select. Exported files and images are sent to the destination you choose through the system file picker or share sheet. The receiving app or service applies its own privacy practices. Exported content can include your notes, photos, equipment information and brew records; review it before sharing.

### Device backups and diagnostic information

Your operating system or backup service may include application data in backups, depending on your device settings. Such backups are managed by you and the platform provider, not by a BeanZen cloud service. Operating systems and app stores may also collect crash or diagnostic information under their own settings and policies. BeanZen does not include an analytics or advertising SDK.

## Permissions {#permissions}

- **Bluetooth / Nearby devices:** find and connect to a compatible coffee scale.
- **Local network:** connect to a machine you configure, such as GaggiMate.
- **Camera:** take a photo for a coffee or equipment record when you choose.
- **Photos and files:** select images or import files; save or share an image or export when requested.

You can decline or revoke permissions in your device settings. The corresponding feature may then be unavailable. BeanZen does not use these permissions for advertising or location tracking.

## Retention and deletion {#retention}

Local journal records and photos remain on your device until you delete them or remove the application's local data. Stored scale tokens remain until you clear them; on iOS, protected credentials can survive uninstalling an app. Copies you export, save to Photos, share, or include in a device backup are separate and must be removed at their own location.

See **[Delete BeanZen data]({{ prefix | append: '/delete-data/' | relative_url }})** for the available steps, including clearing saved Hoto tokens. There is no BeanZen account to delete and no developer-hosted copy of your coffee journal to erase.

If you email support, we receive your email address, message, and anything you attach. We use this information only to handle and reply to your request, through our email provider. Do not send passwords, verification codes or scale tokens. Support correspondence is kept only as long as necessary to resolve your request and related follow-up, then deleted unless retention is required by law. You can request deletion by emailing {{ site.email_address }}.

We do not sell your personal information or share it for advertising.

## This website {#website}

This website is hosted on **GitHub Pages**. GitHub logs visitors' IP addresses for security purposes. See [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection) and the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) for its processing and retention practices.

The website does not add analytics, advertising trackers, cookies, or browser storage. Fonts, icons, device frames and screenshots are served with the site. Opening an email link uses your email application; sending a message is your choice.

Xiaomi, your operating system, GitHub and your chosen sharing or backup providers may process information in countries other than your own under their respective privacy policies.

## Your choices and privacy requests {#rights}

You can review and change your local records, revoke permissions, avoid optional integrations, and [delete local data]({{ prefix | append: '/delete-data/' | relative_url }}). Depending on your location, you may have rights to access, correct, delete or restrict the processing of personal information, object to processing, or complain to a data protection authority. Contact {{ site.email_address }} to exercise rights relating to information the developer holds, such as support correspondence. We cannot access or remotely erase data stored only on your device.

BeanZen is a coffee brewing tool and is not directed at children. We do not knowingly ask children to provide personal information. A parent or guardian can contact us about information sent to support.

If the app's data practices change, this policy will be updated with a new effective date. Material changes requiring a notice or consent will be communicated as required.
