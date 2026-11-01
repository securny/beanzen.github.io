---
layout: page
title: "BeanZen support"
intro: "Questions about a brew, a connection, or your data? You can contact the developer directly."
description: "Questions about a brew, a connection, or your data? You can contact the developer directly."
lang: en
key: support
permalink: /support/
sections:
  - id: contact
    title: "Contact"
  - id: scales
    title: "Connect a scale"
  - id: hoto
    title: "Hoto / Xiaomi"
  - id: machine
    title: "GaggiMate"
  - id: history
    title: "History and files"
  - id: privacy
    title: "Privacy and deletion"
---
## Contact the developer {#contact}

<div class="contactBlock">
<p><strong>{{ site.your_name }}</strong><br><a href="mailto:{{ site.email_address }}?subject=BeanZen%20support">{{ site.email_address }}</a></p>
<p>Use this address for app issues, feedback, feature requests and privacy questions. English and Russian are welcome.</p>
</div>

To help investigate an issue, include your BeanZen version, iOS or Android version, equipment model and firmware if relevant, and the steps that led to the problem. Attach a screenshot only if you are comfortable sharing its contents.

Never send passwords, verification codes or Xiaomi device tokens. Remove personal information from logs before sending them. Read our [Privacy Policy]({{ prefix | append: '/privacy/' | relative_url }}) for how support correspondence is handled.

## Connect a Bluetooth scale {#scales}

1. Turn on your scale, enable Bluetooth, and keep the scale near your phone.
2. Allow BeanZen to use Bluetooth or Nearby devices when your phone asks.
3. Close other apps that might already be connected to the scale. Many scales allow only one active connection.
4. Use **FIND** in BeanZen and select your scale if prompted.

If the scale is not found, restart it and check permissions in your phone settings. Compatibility depends on the exact model and firmware. Contact support with those details if you are unsure.

## Hoto / Xiaomi setup {#hoto}

Some Hoto scales need a token associated with your Xiaomi account. Use the Xiaomi sign-in flow in BeanZen when requested, with the account and region where your scale is registered. Complete any verification requested by Xiaomi.

This optional connection communicates with Xiaomi and is described in the [Privacy Policy]({{ prefix | append: '/privacy/' | relative_url }}#integrations). If a saved token no longer works, you can clear it by pressing and holding **RESET** on the brewing screen. This clears saved Hoto tokens and may require signing in again.

## Connect a GaggiMate machine {#machine}

Your phone and GaggiMate-equipped machine must be on a local network where they can reach each other. Check the machine's local address and the local-network permission in your phone settings. A guest network, VPN or network isolation can prevent a connection.

Supported measurements depend on your machine and firmware. The integration uses local HTTP and WebSocket connections; use a trusted network.

## History, photos and files {#history}

Brew records are stored locally. Before removing the app or clearing its storage, export anything you want to keep. An exported brewing profile may not include every local item, photo or setting; check the exported files before relying on them.

When importing from Beanconqueror, select the export file and any associated photo files requested by the import flow. If an import fails, tell support the format and error message without sending private journal content unless needed and you choose to share it.

## Privacy and deleting data {#privacy}

BeanZen has no BeanZen account or developer-hosted coffee journal. To remove records, saved tokens, exported files or device backups, follow **[Delete BeanZen data]({{ prefix | append: '/delete-data/' | relative_url }})**.

For a request concerning an email you sent to support, write to [{{ site.email_address }}](mailto:{{ site.email_address }}?subject=BeanZen%20privacy%20request).
