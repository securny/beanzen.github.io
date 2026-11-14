---
layout: page
title: "Example: inline coffee profile"
intro: "Sample data for scanner testing. This is not a real product or a roaster recommendation."
lang: en
key: roaster_inline_example
noindex: true
permalink: /roasters/examples/inline-profile/
---

{% assign profile = site.data.roaster_inline_example %}
{% assign coffee = profile.coffee | first %}
{% assign bag = coffee.bags | first %}

## {{ coffee.name }}

**{{ coffee.roaster }}**

- Origin: Brazil, Cerrado
- Processing: natural
- Roast: medium-light
- Bag weight: {{ coffee.bags[0].weight }} g
- Roast date: {{ bag.roastDate }}
- Bag code: {{ bag.code }}

## Recipes

{% for recipe in profile.recipes %}
- **{{ recipe.name }}**: {{ recipe.dose }} g / {{ recipe.finalWeight }} g, {{ recipe.brewTemperature }} °C, {{ recipe.brewTime }} s.
{% endfor %}

## Scan the QR

Open the Beanzen scanner and point the camera at the QR. The code is enough: this example does not require label text or a Data Matrix code.

<img src="{{ '/assets/roasters/inline-profile-qr.png' | relative_url }}" width="360" height="360" alt="QR: https://beanzen.ru/roasters/examples/inline-profile/" style="max-width:100%;height:auto">

[https://beanzen.ru/roasters/examples/inline-profile/](https://beanzen.ru/roasters/examples/inline-profile/)

[Roaster integration guide]({{ '/roasters/' | relative_url }})

{% include roaster-inline-profile.html %}
