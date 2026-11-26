---
layout: page
title: "For coffee roasters"
intro: "Let customers scan a bag and get its coffee details and brewing recipes."
lang: en
key: roasters
permalink: /roasters/
---

You can embed the data in your coffee page or serve it from a separate JSON file or API. With either method, the bag’s QR code can point to your existing coffee, lot or bag page.

## 1. Embed the data in your page

1. [Open the coffee profile builder]({{ '/roasters/profile-builder/' | relative_url }}), enter your coffee details and add brewing recipes.
2. Select **Generate HTML**, then **Copy HTML**.
3. Paste the HTML block into the source of the page linked from the bag’s QR code. If a developer manages your site, send them the block.

The builder puts the data in a `<script>` tag with the type `application/json`. See below if you want to write the block by hand.

## 2. Use a separate API or JSON file

Return the complete coffee profile in a single response with `Content-Type: application/json`. Use either of these methods to declare the profile URL.

### An HTML `<link>` tag

Add the tag to the `<head>` of the page linked from the QR code.

~~~html
<link rel="https://beanzen.ru/rel/brew-profile"
      href="https://your-roastery.example/profiles/coffee.json"
      type="application/json">
~~~

### An HTTP `Link` header

Add the header to the page response or a redirect in the QR code’s redirect chain.

~~~http
Link: <https://your-roastery.example/profiles/coffee.json>; rel="https://beanzen.ru/rel/brew-profile"; type="application/json"
~~~

Include all parameters your API needs in the profile URL. Serve the page and profile over HTTPS. Beanzen looks for the HTTP `Link` header first, then the HTML `<link>` tag, then the embedded `<script>`.

## Try the example

[Open the inline-profile example]({{ '/roasters/examples/inline-profile/' | relative_url }}). It contains one sample coffee, one sample bag and two complete recipes.

Open the example on a computer and scan its QR with Beanzen. The app should show **Beanzen Demo Coffee**, a **250 g** bag and the roast date **2026-11-01**. The profile includes **Demo V60** and **Demo French press**. Receiving recipes and storing or running them are separate app capabilities.

## Write the embedded block by hand

The builder uses `brew-profile 0.5`, a JSON format for coffee details and recipes. If you prepare the profile by hand, put it in one block in the source HTML of the coffee page.

~~~html
<script id="beanzen-brew-profile" type="application/json">
{
  "schemaVersion": "0.5",
  "coffee": [{
    "id": "019a55b0-0000-7000-8000-000000000001",
    "roaster": "Example Roaster",
    "name": "Example lot",
    "beans": [{"country": "KE", "processing": "washed"}]
  }]
}
</script>
~~~

Include one coffee and all of its linked recipes. Include bag details only when they describe that individual bag. A product's standard package size does not identify a particular bag. Use stable UUIDv7 identifiers for the coffee and recipes.

Serialize the JSON and escape every `<` as `\u003c` before embedding it. Do not include customer details, private keys or raw Data Matrix marking data. Keep the profile in the initial HTML, without an iframe or a JavaScript fetch.

For integration questions, email [hello@beanzen.ru](mailto:hello@beanzen.ru).
