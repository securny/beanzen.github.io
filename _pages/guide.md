---
layout: page
title: "Brewing guide"
intro: "Connect a scale, record a brew and keep its details."
lang: en
key: guide
permalink: /guide/
---

## 1. Connect your scale {#connect}

Find your model in the [scale catalog]({{ '/scales/' | relative_url }}).

1. Turn on the scale and Bluetooth.
2. Close other apps connected to the scale.
3. Open Beanzen and allow Bluetooth or Nearby Devices access.
4. Tap **FIND**. Select your scale if prompted.

If the scale is not found, restart it and check permissions in your phone settings.

**HOTO:** use the Xiaomi account and region where your scale is registered. See [Hoto setup]({{ '/support/#hoto' | relative_url }}).

## 2. Set up your brew {#prepare}

Place your brewing vessel on the scale. Tap **TARE**, or use the scale’s tare button if the app command is unavailable.

Tap the dose in the header to enter the coffee weight. Use **DOSE** to weigh it instead. Beanzen uses the dose to calculate the brew ratio.

Select your coffee, grinder, brewer and water. You can add these details later in History.

For espresso, weigh the cup and beverage. For filter coffee, the measured weight depends on where you place the brewer.

## 3. Record the brew {#record}

Tap **START**. Follow weight, flow, ratio and time.

- **PAUSE** pauses the app timer.
- **GO ON** resumes it.
- **FINISH** ends the brew.
- **HOLD** freezes readings in the app.
- **LIVE** returns to current readings.

The scale timer has its own capabilities. Check your model before relying on synchronization.

Auto-stop pauses the timer when you remove the cup. It requires at least 20 g and negative weight for five seconds. It does not stop the machine.

HOLD is unavailable after cup removal and in GaggiMate mode. Auto-stop is disabled during HOLD. See [automatic controls]({{ '/features/#automatic' | relative_url }}).

## 4. Open your journal {#journal}

Tap the list control or swipe from the brewing screen to History. Open a brew to view its charts or add notes, ratings and photos. Very short or empty sessions may not be saved.

Use search or the **All**, **Brews**, **Coffee** and **Gear** filters to find records. Each supported record holds up to 10 photos.

To calculate extraction yield, enter the dose, beverage weight and measured TDS. Measure TDS with a refractometer.

## 5. Connect GaggiMate {#machine}

Add a GaggiMate part to your brewer. Enter its local address. Enable **Use for brewing**.

Connect the phone and machine to the same local network. Allow local-network access when asked. A VPN or guest-network isolation can block the connection.

Beanzen records the channels your machine provides. The machine starts and ends the shot. Beanzen does not control the pump or edit recipes.

Use a trusted network for the local HTTP and WebSocket connections.

## 6. Import and share {#files}

Open **History → + → Import from Beanconqueror**. Select the export folder or ZIP with its related files.

Review the import preview. Repeated imports can add records. **Override** replaces matching records.

Use the brew’s share action to send an image. Choose the destination in the system share sheet. An image is not a full backup of your journal, photos and settings.

## 7. Keep your data {#data}

The journal stays on your device. Device backups depend on your OS settings. Beanzen has no complete journal file export.

Before deleting the app, save the images or notes you need. Check any device backup you plan to use. See [data deletion]({{ '/delete-data/' | relative_url }}).

For help, email [hello@beanzen.ru](mailto:hello@beanzen.ru). Include the app version, OS version, scale model, firmware and steps that led to the problem.
