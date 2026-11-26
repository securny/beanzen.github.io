#!/usr/bin/env python3
"""Refresh the builder's localized labels and profile codes from the app's catalogs."""
import argparse
import json
from pathlib import Path

CATALOGS = {
    "roast": "roasts",
    "scoreSystem": "cupping-systems",
    "country": "countries",
    "processing": "processings",
    "variety": "varieties",
}

site = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("app", type=Path, help="Path to the BeanZen app checkout")
resources = parser.parse_args().app / "Sources" / "BeanZen" / "Resources"
languages = [item["code"] for item in json.loads((site / "_data/languages.json").read_text())]
catalogs = {language: {} for language in languages}

for field, filename in CATALOGS.items():
    entries = json.loads((resources / f"{filename}.json").read_text())["entries"]
    for language in languages:
        catalogs[language][field] = {
            entry["id"]: entry["labels"].get(language) or entry["labels"].get("en") or entry["id"]
            for entry in entries
        }

(site / "_data/profile_catalogs.json").write_text(
    json.dumps(catalogs, ensure_ascii=False, indent=2) + "\n"
)
