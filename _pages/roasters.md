---
layout: page
title: "For coffee roasters"
intro: "Let customers scan a bag and get its coffee details and brewing recipes."
lang: en
key: roasters
permalink: /roasters/
---

## Start with a coffee page

The QR on a bag can link to your existing coffee, lot or bag page. Add a **brew-profile 0.5** document to that page. Beanzen reads it when the customer scans the QR. Your page still opens normally in a browser.

You can embed the document in the page HTML. You do not need a new API or a separate JSON endpoint.

## Try the example

[Open the inline-profile example]({{ '/roasters/examples/inline-profile/' | relative_url }}). It contains one sample coffee, one sample bag and two complete recipes.

Open the example on a computer and scan its QR with Beanzen. The app should show **Beanzen Demo Coffee**, a **250 g** bag and the roast date **2026-11-01**. The profile includes **Demo V60** and **Demo French press**. Receiving recipes and storing or running them are separate app capabilities.

## Add your own profile

Place one block in the original HTML of the relevant coffee page:

```html
<script id="beanzen-brew-profile" type="application/json">
  ...your complete brew-profile 0.5 document...
</script>
```

Include one coffee and all of its linked recipes. Include bag details only when they describe that individual bag. A product's standard package size does not identify a particular bag. Use stable UUIDv7 identifiers for the coffee and recipes.

Serialize the JSON and escape every `<` as `\u003c` before embedding it. Do not include customer details, private keys or raw Data Matrix marking data. Keep the profile in the initial HTML, without an iframe or a JavaScript fetch.

An existing JSON service can instead be declared with an HTML link:

```html
<link rel="https://beanzen.ru/rel/brew-profile"
      href="https://your-roastery.com/profiles/coffee.json"
      type="application/json">
```

The address must contain the complete request. Beanzen does not add parameters. Serve the page and profile over HTTPS.

For integration questions, email [hello@beanzen.ru](mailto:hello@beanzen.ru).
