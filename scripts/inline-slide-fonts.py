#!/usr/bin/env python3
"""Make MARP slide decks render offline by embedding their web fonts.

MARP's `gaia` theme always emits
    @import "https://fonts.bunny.net/css?family=Lato:400,900|Roboto+Mono:400,700&display=swap";
so a deck exported with `marp-cli --html` falls back to system fonts without
internet access. This script replaces that import with the @font-face rules in
docs/slides/fonts/fonts.css, embedding each vendored .woff2 as a data URI so
slides.html stays a single self-contained file (it also works from file://,
where browsers restrict loading fonts from other files).

Run it after every marp-cli rebuild. It is safe to re-run.

    python3 scripts/inline-slide-fonts.py                     # every docs/slides/*/slides.html
    python3 scripts/inline-slide-fonts.py docs/slides/overview/slides.html
"""
import base64
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS_DIR = ROOT / 'docs' / 'slides' / 'fonts'

# Families and weights vendored in docs/slides/fonts/, as they appear in the
# bunny.net `family=` parameter.
VENDORED = {'Lato:400,900', 'Roboto+Mono:400,700'}

BUNNY_IMPORT = re.compile(
    r'@import\s+(?:url\()?["\']?(https://fonts\.bunny\.net/css\?[^"\')]*)["\']?\)?\s*;'
)


def embedded_font_css():
    """fonts.css, minified, with each url(x.woff2) replaced by a data URI."""
    css = (FONTS_DIR / 'fonts.css').read_text()
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([{}:;,])\s*', r'\1', css).strip()

    def to_data_uri(match):
        data = (FONTS_DIR / match.group(1)).read_bytes()
        return 'url(data:font/woff2;base64,' + base64.b64encode(data).decode('ascii') + ')'

    return re.sub(r'url\(([\w.-]+\.woff2)\)', to_data_uri, css)


def requested_families(url):
    match = re.search(r'family=([^&]*)', url)
    return set(match.group(1).split('|')) if match else set()


def main():
    args = sys.argv[1:]
    decks = [pathlib.Path(a) for a in args] or sorted((ROOT / 'docs' / 'slides').glob('*/slides.html'))
    font_css = None
    for deck in decks:
        html = deck.read_text()
        imports = BUNNY_IMPORT.findall(html)
        if not imports:
            print(f'{deck}: no remote font import, nothing to do')
            continue
        missing = set().union(*map(requested_families, imports)) - VENDORED
        if missing:
            print(f'{deck}: SKIPPED, fonts not vendored in {FONTS_DIR}: {", ".join(sorted(missing))}')
            continue
        if '</head>' not in html:
            print(f'{deck}: SKIPPED, no </head> to add the font styles to')
            continue
        font_css = font_css or embedded_font_css()
        # @font-face is global, so a separate <style> works and leaves the
        # theme stylesheet's @import ordering untouched.
        html = BUNNY_IMPORT.sub('', html)
        html = html.replace('</head>', f'<style>{font_css}</style></head>', 1)
        deck.write_text(html)
        print(f'{deck}: embedded Lato and Roboto Mono')


if __name__ == '__main__':
    main()
