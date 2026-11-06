# Primary screenshot correction — 2026-11-06

## Failure

The old primary PNG showed a genuine Bookoo weight record through the GaggiMate replay route. Production BrewView suppresses the separate flow chart in machine mode and uses that area for machine channels. The selected record had no machine channels. The result was native and used real measurements, but it failed the ordinary-scale scenario required for the main product image.

The old site check passed this known-wrong artifact. It checked capture hashes and publication integrity, not suitability for the advertised task. Layout and accessibility checks addressed other questions. Capture provenance already identified the mode; the final product review failed to act on that evidence.

## Acceptance

- Ordinary scale mode, not machine mode.
- Both nonempty weight and flow charts visible at once.
- Time, weight, flow, dose and ratio metrics visible.
- Ordinary scale controls consistent with the shown brewing state.
- Actual authorized measurement samples, unmodified production views and calculations.
- No source-image editing, synthetic measurement arrays or claim of physical live BLE capture.
- Original-image and desktop/mobile rendered review tied to exact PNG bytes.

The hero and primary feature image now share one data record. CI checks the selected capture's scale mode, reviewed widgets, nonempty-chart confirmations, hash-bound review and actual HTML image selection. It rejects the retired image by hash even if renamed and refuses screenshot files outside the selected provenance list. These checks enforce recorded evidence and selection; they do not perform computer vision or replace visual judgment.

## Future procedure

AGENTS.md records the scenario-first capture and review procedure. Read production visibility conditions before capturing. Verify each required product feature explicitly, rather than treating native rendering or a green technical audit as a blanket approval. Inspect both the original and the page at representative sizes. When a regression is fixed, demonstrate a failing check on the previous bad case before accepting the replacement.

Absolute absence of future errors cannot be promised. These controls target the actual failure observed here and make its repetition detectable.


## Related icon correction

The shared Bluetooth glyph had extra, inconsistent segments and did not read as the familiar Bluetooth symbol. Replace its geometry once in the shared include and inspect both the homepage and detailed feature at actual size. This is another content/meaning defect: valid SVG markup and accessibility checks do not establish recognizability. The future review procedure must include the expected meaning of visible graphics as well as layout.


## Verified replacement

Primary agent separately inspected the complete exported XCTest PNG47ad65371b6ff2a312eb64b3cad8dc03287cbd3aadd081271ad2ad2047c50ceb. Both nonempty charts, a g/s flow axis, the five metrics and normal paused scale controls are visible. The isolated harness links the byte-identical existing production framework and feeds279 original samples; it does not set chart arrays. Runtime verification records160 weight points and28 flow bars,19 nonzero. The header's46.2g is the original last raw measurement; the saved journal final_weight remains46.1g. No value was altered to force equality. See main-screen-capture.json for source hashes and the exact injection boundary.

The guard accepted the replacement and refused five negative cases: machine mode; missing flow-chart acceptance; an empty flow-chart confirmation; the old bad PNG renamed with its updated hashes; and a hero selecting a different image. The correctly restored site then passed. The old integrity-only check had accepted the original bad screenshot. This demonstrates a change in what is checked, rather than merely recording another green build.


## Render and publication checks

Desktop, tablet and phone views at1440/768/390px were checked in both languages. The hero and primary feature load the same reviewed PNG and declared dimensions. The whole primary image is visible without cropping; both charts remain visible. No horizontal overflow or browser page errors were found. The corrected Bluetooth symbol was inspected at actual size in both its home summary and detailed feature. Root and nonempty-baseurl Jekyll checks pass. Original hashes bind visual review to the exact deployed asset; publishing is verified separately after Pages completes.
