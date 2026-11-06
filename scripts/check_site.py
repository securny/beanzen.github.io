#!/usr/bin/env python3
"""Check the generated store-facing resources and internal navigation."""
import argparse
import hashlib
import json
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.images = set(), [], []
        self.lang, self.h1, self.title = "", 0, False
        self.canonical, self.alternates = "", {}
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        if tag == "html":
            self.lang = attrs.get("lang", "")
        if tag == "h1":
            self.h1 += 1
        if tag == "title":
            self.title = True
        if tag in ("a", "link") and "href" in attrs:
            self.links.append(attrs["href"])
        if tag in ("img", "script") and "src" in attrs:
            self.links.append(attrs["src"])
        if tag == "img":
            self.images.append(attrs)
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href", "")
        if tag == "link" and attrs.get("rel") == "alternate":
            self.alternates[attrs.get("hreflang")] = attrs.get("href")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("directory", nargs="?", default="_site")
    parser.add_argument("--baseurl", default="")
    args = parser.parse_args()
    root = Path(args.directory).resolve()
    base = args.baseurl.rstrip("/")
    errors = []
    source = Path(__file__).resolve().parents[1]
    locales = json.loads((source / "_data/languages.json").read_text())
    locale_codes = {locale["code"] for locale in locales}
    documents = {}

    def check(condition, message):
        if not condition:
            errors.append(message)

    for path in sorted(root.rglob("*.html")):
        text = path.read_text()
        relative = path.relative_to(root).as_posix()
        document = Document(text)
        documents[relative] = document
        check(document.lang in locale_codes or relative == "404.html", f"{relative}: missing supported html language")
        check(document.h1 == 1 and document.title, f"{relative}: expected one h1 and a title")
        check(document.canonical.startswith("https://beanzen.ru/"), f"{relative}: invalid canonical")
        check(not re.search(r"example\.org|1234793120|emil\.baehr@gmail|yourscreenshot|\{\{|\{%", text),
              f"{relative}: unresolved template or starter content")
        for image in document.images:
            check("alt" in image, f"{relative}: missing image alternative")
        check("mailto:hello@beanzen.ru" in text, f"{relative}: no public contact")

    required = ("", "features/", "scales/", "guide/", "support/", "privacy/", "delete-data/", "terms/")
    for locale in locales:
        lang = locale["code"]
        prefix = locale["prefix"].strip("/")
        prefix = prefix + "/" if prefix else ""
        for route in required:
            relative = prefix + route + "index.html"
            check(relative in documents, f"Missing public page: {relative}")
            if relative not in documents:
                continue
            document = documents[relative]
            check(document.lang == lang, f"{relative}: wrong language")
            for other_locale in locales:
                other = other_locale["code"]
                other_prefix = other_locale["prefix"].strip("/")
                other_prefix = other_prefix + "/" if other_prefix else ""
                url = "https://beanzen.ru" + base + "/" + other_prefix + route
                check(document.alternates.get(other) == url, f"{relative}: wrong {other} alternate")
            text = (root / relative).read_text()
            if route == "privacy/":
                check("Dmitry Berezkin" in text and "Xiaomi" in text and "GitHub" in text,
                      f"{relative}: missing operator or integration disclosure")
                policy_sections = {"about", "local-data", "integrations", "permissions", "website",
                                   "legal-bases", "retention", "international", "rights", "children", "changes"}
                check(policy_sections <= document.ids, f"{relative}: missing privacy sections")
                check("Gmail" in text and ("Russia" in text if lang == "en" else "России" in text),
                      f"{relative}: missing support provider or operator country")
            if route == "delete-data/":
                check("RESET" in text and "Android" in text and "iOS" in text,
                      f"{relative}: missing local deletion instructions")
            if route == "":
                check('href="https://github.com/securny/beanzen/releases"' in text,
                      f"{relative}: missing Android APK download")
                check('class="playStoreLink"' not in text and 'class="appStoreLink"' not in text,
                      f"{relative}: unverified store badge")
                check("brew-image" in document.ids and "assets/share/beanzen-share-espresso.jpg" in text,
                      f"{relative}: missing brew image section or native output")
            if route == "features/":
                for feature in json.loads((source / "_data/features.json").read_text())["items"]:
                    check(feature["id"] in document.ids, f"{relative}: feature missing: {feature['id']}")
                check("assets/share/beanzen-share-filter.jpg" in text,
                      f"{relative}: missing filter brew image")
            if route == "guide/":
                check("share-image" in document.ids, f"{relative}: missing image creation guide")
            if route == "scales/":
                for scale in json.loads((source / "_data/scales.json").read_text())["rows"]:
                    check(scale["id"] in document.ids, f"{relative}: scale missing: {scale['id']}")
            check('BeanZen' not in text, f"{relative}: incorrect public product spelling")

    for relative, document in documents.items():
        page_url = "/" + relative.removesuffix("index.html")
        for href in document.links:
            url = urlsplit(href)
            if url.scheme in ("mailto", "tel", "data") or (url.netloc and url.netloc != "beanzen.ru"):
                continue
            check(bool(href), f"{relative}: empty link")
            target_url = urlsplit(urljoin("https://beanzen.ru" + base + page_url, href))
            target_path = unquote(target_url.path)
            if base:
                check(target_path.startswith(base + "/"), f"{relative}: link escapes baseurl: {href}")
                target_path = target_path.removeprefix(base)
            target = root / target_path.lstrip("/")
            if target.is_dir():
                target /= "index.html"
            check(target.is_file(), f"{relative}: missing target {href}")
            if target_url.fragment and target.is_file() and target.suffix == ".html":
                target_relative = target.relative_to(root).as_posix()
                check(unquote(target_url.fragment) in documents[target_relative].ids,
                      f"{relative}: missing anchor {href}")

    for stylesheet in root.rglob("*.css"):
        css_url = base + "/" + stylesheet.relative_to(root).as_posix()
        for resource in re.findall(r"""url\(["']?([^)"']+)""", stylesheet.read_text()):
            if resource.startswith(("data:", "#")):
                continue
            resource_url = urlsplit(urljoin("https://beanzen.ru" + css_url, resource))
            if resource_url.netloc != "beanzen.ru":
                continue
            resource_path = unquote(resource_url.path).removeprefix(base)
            check((root / resource_path.lstrip("/")).is_file(),
                  f"{stylesheet.name}: missing CSS resource {resource}")

    check((root / "CNAME").read_text().strip() == "beanzen.ru", "CNAME must contain beanzen.ru")
    for private in ("README.md", "PRODUCT.md", "AGENTS.md", "Gemfile", "docs", "scripts", "LICENSE"):
        check(not (root / private).exists(), f"Internal source published: {private}")
    tree = ET.parse(root / "sitemap.xml")
    locations = tree.findall("{*}url/{*}loc")
    check(len(locations) == len(required) * len(locales), "Sitemap should contain all localized public pages")
    provenance = json.loads((source / "docs/screenshot-provenance.json").read_text())
    for screenshot in provenance["selected_screenshots"]:
        path = root / "assets/screenshot" / screenshot["filename"]
        check(path.exists(), f"Missing native screenshot: {path.name}")
        if path.exists():
            check(hashlib.sha256(path.read_bytes()).hexdigest() == screenshot["sha256"],
                  f"Native screenshot differs from source capture: {path.name}")
    # A preserved PNG can still depict the wrong product mode. Check its role,
    # the review bound to its exact bytes, and the actual published image selection.
    # These are metadata/selection checks; visual inspection remains mandatory.
    screens = json.loads((source / "_data/screens.json").read_text())
    main_screen = next((screen for screen in screens if screen["id"] == "main"), {})
    captures = {capture["filename"]: capture for capture in provenance["selected_screenshots"]}
    primary_path = main_screen.get("path", "")
    capture = captures.get(Path(primary_path).name, {})
    check(bool(capture), "Primary screen lacks capture provenance")
    check(capture.get("ui_mode") == "scale", "Primary screen must show ordinary scale mode")
    required_visuals = {"weight_chart", "flow_chart", "brew_controls", "time", "weight", "flow", "dose", "ratio"}
    review = capture.get("visual_review", {})
    check(required_visuals <= set(review.get("visible_features", [])),
          "Primary screen review must confirm both nonempty charts, metrics and scale controls")
    check(bool(capture.get("sha256")) and review.get("image_sha256") == capture.get("sha256"),
          "Primary visual review must match the exact screenshot bytes")
    check(review.get("weight_chart_has_data") is True and review.get("flow_chart_has_data") is True,
          "Primary screen needs nonempty weight and flow charts")
    rejected = {item["sha256"] for item in provenance.get("rejected_primary_screenshots", [])}
    check(capture.get("sha256") not in rejected, "Rejected primary screenshot cannot be reused")
    selected_paths = {"assets/screenshot/" + filename for filename in captures}
    for path in (root / "assets/screenshot").glob("*"):
        if not path.is_file():
            continue
        relative = path.relative_to(root).as_posix()
        check(relative in selected_paths, f"Unreviewed screenshot published: {relative}")
        check(hashlib.sha256(path.read_bytes()).hexdigest() not in rejected,
              f"Rejected primary screenshot published: {relative}")
    for locale in locales:
        prefix = locale["prefix"].strip("/")
        prefix = prefix + "/" if prefix else ""
        home = documents.get(prefix + "index.html")
        expected_src = base + "/" + primary_path
        if home:
            hero_images = [img for img in home.images if "iphoneScreen" in img.get("class", "").split()]
            check(len(hero_images) == 1 and hero_images[0].get("src") == expected_src,
                  f"{prefix}index.html: hero must use the reviewed primary scale screen")
            if hero_images:
                check(hero_images[0].get("width") == str(main_screen.get("width"))
                      and hero_images[0].get("height") == str(main_screen.get("height")),
                      f"{prefix}index.html: primary image dimensions differ from source")
        features = documents.get(prefix + "features/index.html")
        if features:
            check(any(img.get("src") == expected_src for img in features.images),
                  f"{prefix}features/index.html: missing reviewed primary scale screen")
    share_provenance = json.loads((source / "docs/share-image-provenance.json").read_text())
    for output in share_provenance["outputs"]:
        path = root / "assets/share" / output["filename"]
        check(path.is_file(), f"Missing native brew image: {path.name}")
        if path.is_file():
            check(hashlib.sha256(path.read_bytes()).hexdigest() == output["sha256"],
                  f"Brew image differs from native output: {path.name}")
    check(not (root / "assets/screenshot/beanzen-ios.png").exists(), "Superseded screenshot is still published")
    dictionaries = source / "_data/locales"
    english = json.loads((dictionaries / "en.json").read_text())
    for locale in locales:
        translated = json.loads((dictionaries / (locale["code"] + ".json")).read_text())
        check(english.keys() == translated.keys(), "Locale dictionaries have different keys")
        check(len(english["features"]) == len(translated["features"]), "Feature translations are incomplete")
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"OK: {len(documents)} HTML pages; public resources, locale pairs, contact, links and sitemap.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
