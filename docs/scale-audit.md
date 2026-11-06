# Beanzen scale source audit

{"adapters": 19, "catalogRecords": 26, "catalogHardwareVerifiedFlags": 5, "expandedNamedVariants": 34, "assumedRelatedVariants": 2}

34 named variants include hardware models, open-source firmware/projects and the unidentified DSD TECH protocol. Two Felicita relatives are explicitly assumed. This is not 34 tested commercial models. Alias names and DIY firmware variants do not add to the count.

## Public claims to keep scoped

- Catalog has 26 entries / 19 adapters. Five hardwareVerified flags are old snapshots; BOOKOO Ultra and both DiFluid records have later evidence.
- BOOKOO Ultra: Beanzen iOS weight/timer/buttons checked 2026-10-05; tare not checked; Mini not checked. Hardware timer cannot resume via Start.
- Acaia Pearl new revision: explicit Beanzen iOS and Android evidence; other Acaia models and old service revision remain protocol-only.
- DiFluid Microbalance: explicit Beanzen Android weight/tare evidence 2026-09-01 after malformed advertising recovery. Later CoffeeScale docs state both Microbalance and Ti physically tested. Do not extrapolate to Beanzen Ti, iOS, or all timer functions.
- DiFluid Reset is nil. Resume preserves scale-display time but does not continue the scale timer, per physical CoffeeScale test 2026-10-07.
- Felicita Arc has implemented protocol. Incline/Parallel are assumed related models, not confirmed compatibility. Current adapter is unverified physically.
- Varia: incoming button events exist; outgoing hardware timer commands do not. Eclair timer commands intentionally omitted because firmware opcode meanings conflict.
- HOTO: Xiaomi authentication/device token required for that optional device path; no Beanzen account is required.
- LFSmart/Futula/LEFU/CK811 names are OEM aliases; DSD TECH is a Bluetooth module identity, not an established scale model.

## Adapter matrix

Y = implemented in source; not a hardware-test claim. Columns: weight / app tare / scale timer Start / Pause / Reset / read timer / physical button events.

| Adapter | W | Tare | Start | Pause | Reset | Read | Buttons |
|---|---|---|---|---|---|---|---|
| AcaiaScale | Y | Y | Y | Y | Y | Y | Y |
| BookooScale | Y | Y | Y | Y | Y | Y | Y |
| DecentScale | Y | Y | Y | Y | Y | Y | Y |
| DiFluidScale | Y | Y | Y | Y | — | Y | — |
| DiyCoffeeScale | Y | — | — | — | — | — | — |
| EclairScale | Y | Y | — | — | — | — | — |
| EurekaPrecisaScale | Y | Y | Y | Y | Y | Y | — |
| FelicitaScale | Y | Y | Y | Y | Y | — | — |
| HotoScale | Y | Y | — | — | — | — | — |
| IKapeScale | Y | Y | — | — | — | — | — |
| InsmartScale | Y | Y | — | — | — | — | — |
| KP2048B | Y | Y | — | — | — | — | — |
| LFSmartScale | Y | Y | — | — | — | — | — |
| SkaleIIScale | Y | Y | — | — | — | — | — |
| TencentScale | Y | Y | — | — | — | — | — |
| TimemoreBlackMirrorScale | Y | Y | Y | Y | Y | — | — |
| TimemoreDot | Y | Y | Y | Y | Y | Y | — |
| VariaAkuScale | Y | Y | — | — | — | — | Y |
| WeighMyBruScale | Y | Y | Y | Y | Y | — | — |

## Sources and reproducibility

- BeanZen `Sources/BeanZen/Resources/scales.json`: catalog date 2026-09-25; adapter/model mappings and catalog flags.
- BeanZen `Sources/BeanZen/Scales/ScaleAdapter.swift`: nil defaults and Start-based default Resume; per-adapter method refs are embedded in JSON.
- CoffeeScale `Scales/Bookoo/Bookoo_spec.md` §§9.2,11: physical iPhone evidence, Mini caveat, Ultra resume limit and untested tare.
- CoffeeScale `Scales/DiFluid/DiFluid_spec.md` final §14 supersedes stale adapter header and earlier unresolved Android discussion.
- CoffeeScale `docs/appstore/store-listing-1.42.md` lines 12–18,32: both-model physical test statement and timer resume limit.
- CoffeeScale `Scales/Acaia/Acaia_spec.md` lines 393–396,527–531,604–605: Android checklist and new-revision-only boundary.
- CoffeeScale `plans/2026-09-05-scale-button-events.md` line 218: Beanzen iPhone Pearl 21/21 button events; line 261: later CoffeeScale phase fix was ported but Beanzen hardware scenario was not rerun.
- CoffeeScale `Scales/Felicita/Felicita_spec.md` first 24 lines: related-model support is explicitly an assumption.
- CoffeeScaleIOSApp `coffeescaleapp.github.io/_config.yml` line 40: historical site aliases and tested list; do not reuse its stale 17-model total.

Source commits: BeanZen 90110460fc5b03d1e8ef9f9ca7ff1ab5fd2d434a; CoffeeScale 29fd14a09e06a3b9435b2396624ac2357d4b87ad. No app/site repository edits were made.
