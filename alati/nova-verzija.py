#!/usr/bin/env python3
"""
Postavlja novu oznaku verzije pre objave, da bi se aplikacija svima sama osvežila.

Menja na jednom mestu sve što mora da se slaže:
  - version.json                  (aplikacija ga proverava bez keša)
  - APP_VERSION u index.html      (verzija koju je browser učitao)
  - ?v=... na skriptama u index.html (da browser ne koristi stare fajlove iz keša)

Pokretanje iz korena repozitorijuma:  python3 alati/nova-verzija.py
"""
import datetime, json, pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
index = root / "index.html"
vfile = root / "version.json"

old = json.loads(vfile.read_text())["v"] if vfile.exists() else ""
today = datetime.date.today().strftime("%Y.%m.%d")
n = int(old.rsplit("-", 1)[1]) + 1 if old.startswith(today + "-") else 1
new = f"{today}-{n}"

html = index.read_text()
html, a = re.subn(r'var APP_VERSION = "[^"]*";', f'var APP_VERSION = "{new}";', html)
html, b = re.subn(r'(<script src="[^"/]+\.js)\?v=[^"]*(")', rf'\1?v={new}\2', html)
assert a == 1 and b >= 5, "index.html nema očekivana mesta za verziju"
index.write_text(html)
vfile.write_text(json.dumps({"v": new}) + "\n")
print(f"verzija: {old or '-'} -> {new}")
