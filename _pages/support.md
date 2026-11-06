---
layout: page
title: "Beanzen support"
intro: "Connection problems, app questions and feedback."
description: "Connection problems, app questions and feedback."
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
{% assign locale = site.data.languages | where: 'code', page.lang | first %}{% assign prefix = locale.prefix | default: '' %}

## Contact the developer {#contact}

<div class="contactBlock">
<p><strong>{{ site.your_name }}</strong><br><a href="mailto:{{ site.email_address }}?subject=Beanzen%20support">{{ site.email_address }}</a></p>
<p>Write in English or Russian.</p>
</div>

Describe the problem and how to reproduce it. Include your Beanzen version, OS version, equipment model and firmware. Attach a screenshot if it helps.

Remove personal information from logs. Never send passwords, verification codes or Xiaomi tokens. Read the [Privacy Policy]({{ prefix | append: '/privacy/' | relative_url }}) for how we handle support messages.

## Connect a Bluetooth scale {#scales}

1. Turn on the scale and Bluetooth.
2. Allow Bluetooth or Nearby Devices access.
3. Close other apps connected to the scale.
4. Tap **FIND** in Beanzen.

If the scale is not found, restart it and check app permissions. Check your model in the [scale catalog]({{ prefix | append: '/scales/' | relative_url }}).

## Hoto / Xiaomi setup {#hoto}

When Beanzen asks for Xiaomi sign-in, use the account and region where your Hoto scale is registered. Complete Xiaomi’s verification.

If the token stops working, press and hold **RESET** on the brewing screen. This clears saved Hoto tokens. Sign in again to reconnect.

## Connect GaggiMate {#machine}

Connect the phone and machine to the same local network. Check the machine’s local address and the app’s local-network permission. A VPN or guest-network isolation can block the connection.

Use a trusted network for local HTTP and WebSocket connections. Available measurements depend on the machine and firmware.

## History and files {#history}

The journal stays on your device. Shared brew images are not a full backup. Check your device backup before deleting the app or clearing its storage.

For Beanconqueror imports, select the export folder or ZIP with its photos. If import fails, send the error message and file format. Send journal data only if needed and you choose to share it.

## Privacy and deletion {#privacy}

Follow [Delete Beanzen data]({{ prefix | append: '/delete-data/' | relative_url }}) to remove records, tokens and saved copies.

For support-message deletion, email [{{ site.email_address }}](mailto:{{ site.email_address }}?subject=Beanzen%20privacy%20request).

See the [brewing guide]({{ prefix | append: '/guide/' | relative_url }}) for setup and the [feature list]({{ prefix | append: '/features/' | relative_url }}) for individual functions.
