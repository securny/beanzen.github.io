---
layout: page
title: "Brewing guide"
intro: "A practical walkthrough from your first connection to a saved brew. Button labels follow the English app interface."
lang: en
key: guide
permalink: /guide/
---

## 1. Connect your scale {#connect}

Check the [model catalog]({{ '/scales/' | relative_url }}) first: weight, tare and the scale’s own timer are separate capabilities. Turn the scale on, enable Bluetooth and keep it near your phone. Close other apps connected to the scale; many scales accept only one connection.

Open Beanzen, grant Bluetooth or Nearby Devices access when asked, then tap **FIND**. Choose your scale if a list appears. If it is not found, restart the scale and check the app’s permissions in your phone settings. On Android, available permission prompts depend on the OS version.

**HOTO:** this model may require Xiaomi sign-in to retrieve its device token. Use the Xiaomi account and region where the scale is registered. Beanzen itself has no account. See [Hoto setup]({{ '/support/#hoto' | relative_url }}) and the [privacy policy]({{ '/privacy/#integrations' | relative_url }}).

## 2. Set up your brew {#prepare}

Place your brewing vessel on the scale and tap **TARE** if your model supports the command; otherwise use the scale’s own tare button. Tap the dose value to enter your coffee dose, or use **DOSE** to measure it with the scale. The dose is needed for a meaningful brew ratio.

Choose the coffee, grinder, brewer and water you want to associate with the record. You can also add or edit these details later in history. For espresso the scale usually weighs the cup and beverage; for filter coffee, the equipment placement determines what the measured weight represents.

## 3. Record the brew {#record}

Tap **START**. Follow weight, calculated flow rate, ratio and time. **PAUSE** pauses the app timer; **GO ON** continues it. **FINISH** ends the recording. The scale timer can have different capabilities from the app timer — check your model before relying on synchronization.

The automatic start and stop options reduce manual actions when enabled. Auto-stop detects sustained negative weight after you remove the cup, rather than a target beverage weight. It requires a shown weight of at least 20 g and removal for about five seconds. It does not stop the machine or pump.

**HOLD** freezes displayed weight, flow and ratio so you can read them while moving the cup. **LIVE** returns to live readings. It does not command the scale’s display, is unavailable for GaggiMate sessions, and cannot begin after the cup is already removed. Automatic removal handling is suppressed during HOLD.

See [automatic behavior]({{ '/features/#automatic' | relative_url }}) for the distinctions between app detection and a scale’s own automatic modes.

## 4. Find and describe your brew {#journal}

Open history with the list control or by swiping from the brewing screen. Finished recordings appear in the journal; very short or empty attempts may not be saved. Open a brew to review its curves, inspect values along the chart, and add notes, a rating, photos and equipment details.

Use the history filters for **All**, **Brews**, **Coffee** or **Gear**, and search to find an earlier record. Coffee, grinder, brewer and water records keep reusable information in one place. You can add up to ten photos to each supported record.

Enter beverage TDS only if you have measured it with a suitable instrument; Beanzen does not measure TDS through the phone. The extraction calculation uses your entered TDS, dose and beverage weight.

## 5. Connect a GaggiMate machine {#machine}

Add the GaggiMate integration to the machine’s brewer record and provide its local address. Your phone and machine must be reachable on the same local network. Allow local-network access when requested. Guest-network isolation or a VPN can prevent a connection.

Beanzen records the measurement channels made available by the machine, such as pressure, temperature and flow, and displays their charts. The machine controls its session; this integration is not a remote recipe editor or pump controller. Available channels depend on firmware. Local HTTP and WebSocket connections should be used on a trusted network.

## 6. Import and share {#files}

To bring in Beanconqueror data, open **History → + → Import from Beanconqueror** and select the exported folder or ZIP with its related files. Review the import preview before proceeding. Repeated imports add new records; the **Override** option can replace matching information, so read the preview carefully.

Use the brew’s sharing action to create an image and choose a destination through the system share sheet. Saved images are useful for keeping a visual reference, but are not a full backup of the database, photos and settings. The current interface has no user command for a complete file or profile export.

## 7. Keep control of your data {#data}

Beanzen stores its journal locally. It has no Beanzen accounts, developer-operated sync servers, analytics, advertising or subscriptions. Optional Xiaomi and GaggiMate connections have their own data flows. Device backups depend on your OS settings.

Before deleting the app or clearing its storage, check any backup you intend to rely on and save the images or notes you need. Recovery is not guaranteed. Read [data deletion]({{ '/delete-data/' | relative_url }}) for local records, Hoto tokens, shared files and device backups.

Need help? Email [hello@beanzen.ru](mailto:hello@beanzen.ru) with your app version, OS version, scale model and firmware, and the steps that led to the problem.
