---
layout: page
title: "Пример: встроенный профиль кофе"
intro: "Тестовые данные для проверки сканирования. Это не настоящий товар и не рекомендация обжарщика."
lang: ru
key: roaster_inline_example
noindex: true
permalink: /ru/roasters/examples/inline-profile/
---

{% assign profile = site.data.roaster_inline_example %}
{% assign coffee = profile.coffee | first %}
{% assign bag = coffee.bags | first %}

## {{ coffee.name }}

**{{ coffee.roaster }}**

- Происхождение: Бразилия, Серрадо
- Обработка: натуральная
- Обжарка: medium-light
- Масса пачки: {{ coffee.bags[0].weight }} g
- Дата обжарки: {{ bag.roastDate }}
- Код пачки: {{ bag.code }}

## Рецепты

{% for recipe in profile.recipes %}
- **{{ recipe.name }}**: {{ recipe.dose }} g / {{ recipe.finalWeight }} g, {{ recipe.brewTemperature }} °C, {{ recipe.brewTime }} s.
{% endfor %}

## Отсканируйте QR

Откройте сканер Beanzen и наведите камеру на QR. Достаточно кода: текст и Data Matrix для этого примера не нужны.

<img src="{{ '/assets/roasters/inline-profile-qr.png' | relative_url }}" width="360" height="360" alt="QR: https://beanzen.ru/roasters/examples/inline-profile/" style="max-width:100%;height:auto">

[https://beanzen.ru/roasters/examples/inline-profile/](https://beanzen.ru/roasters/examples/inline-profile/)

[Инструкция для обжарщиков]({{ '/ru/roasters/' | relative_url }})

{% include roaster-inline-profile.html %}
