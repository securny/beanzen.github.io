# Beanzen website

Read PRODUCT.md and DESIGN.md before changing the site. Work in this repository. The mobile app source is read-only for website tasks.

## Product screenshots

Before capturing or selecting an image, state the scenario, application mode and features it must show. An image can be native and use real data while still depicting the wrong scenario.

The primary screenshot must show the ordinary **scale** brewing mode with both a nonempty weight chart and a nonempty flow chart, the time/weight/flow/dose/ratio metrics and ordinary scale controls. GaggiMate belongs only to its explicitly named feature. Do not substitute its replay mode for the normal scale interface.

Use _data/screens.json[id=main] as the single source for the hero and primary feature screenshot. Do not add an independent hero path or duplicate alt text in configuration or locale dictionaries.

For every replacement:

1. Read the relevant production UI conditions. Confirm which mode makes the required widgets visible.
2. Use native production views and actual authorized measurements. Never draw, composite or invent missing charts. Record any simulator state injection or replay separately from physical-device capture.
3. Inspect the complete original image, then its rendered desktop and mobile presentation. Explicitly confirm each required widget and its data. A file hash, successful build, accessibility scan or attractive layout does not establish product correctness.
4. Record the reviewed image hash, mode, data source and visible features in docs/screenshot-provenance.json. Re-review when the bytes change. Keep private inputs, tokens and raw databases out of the repository.
5. Run the site checks. Prove that the previously rejected screenshot is refused. Do not change acceptance criteria just to get a green result.
6. Verify the public image URL and bytes after Pages deployment before reporting it published.

Keep provenance and review notes in excluded source docs. Public copy should describe the product plainly, without process or authenticity disclaimers.

## Shared icons

Keep conventional symbols recognizable. Do not invent extra strokes for Bluetooth or other familiar controls. Inspect icons at their actual rendered size in every placement that shares the SVG include, including the homepage and detailed features. A valid SVG and a passing accessibility scan do not prove that the drawing communicates the intended meaning.

## Completion claims

Report what each check actually proves. Separate functional/product review from layout/accessibility and deployment verification. Do not claim that technical checks guarantee screenshot correctness, worldwide legal compliance or store approval. When a fact or check is missing, resolve it or state the limit.

Run bundle exec jekyll build and python3 scripts/check_site.py _site. Keep Pages artifact retention at one day. Commit and push completed changes when the user's existing publication authorization applies.
