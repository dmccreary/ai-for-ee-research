#!/usr/bin/env python3
"""Scaffold and validate the interactive infographic overlay posters.

Each poster lives in docs/posters/<slug>/ and is authored as:

    data.json        overlay data (grid zones or callout markers + quiz)   [authored]
    image-prompt.md  text-to-image prompt (no text in the image)           [authored]
    index.md         MkDocs page that embeds main.html                     [authored]
    main.html        engine page (grid-diagram.js or diagram.js)           [generated here]
    <slug>.png       artwork; a placeholder is drawn until real art exists [generated here]

Usage (run from the repo root):

    python3 scripts/poster_overlays.py scaffold [slug ...]   # main.html + placeholder PNG
    python3 scripts/poster_overlays.py validate [slug ...]   # lint data.json, prompt, page
    python3 scripts/poster_overlays.py all [slug ...]        # scaffold, then validate
    python3 scripts/poster_overlays.py gallery               # thumbnails + docs/posters/index.md + nav snippet

With no slug, every poster directory under docs/posters/ that has a data.json is used.
`scaffold` never overwrites an existing PNG unless --force is given, so generated art
is safe. A placeholder is recognised by the marker string in its PNG metadata.
"""
from __future__ import annotations

import argparse
import html
import json
import re
import sys
from itertools import combinations
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
POSTERS = ROOT / "docs" / "posters"
PLACEHOLDER_KEY = "poster-placeholder"
W, H = 1920, 1080

GRID_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="schema" content="https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1">
  <title>{title} — Interactive Infographic</title>
  <link rel="stylesheet" href="../../sims/shared-libs/grid-overlay.css">
</head>
<body>

<div id="image-wrapper">
  <!-- image and zone overlay injected by grid-diagram.js -->
</div>

<div id="controls">
  <button class="mode-btn active" id="btn-explore">Explore</button>
  <button class="mode-btn"        id="btn-quiz">Quiz Me</button>
  <span id="quiz-score" style="display:none">
    Score: <strong id="score-val">0</strong> / <strong id="score-total">0</strong>
  </span>
  <span id="edit-badge">EDIT MODE</span>
</div>

<div id="detail-panel">
  <div id="panel-prompt">Click a region of the poster to explore it.</div>
  <div id="panel-content">
    <div id="panel-label"></div>
    <div id="panel-summary"></div>
    <ul id="panel-facts"></ul>
  </div>
</div>

<div id="quiz-question"></div>

<div id="edit-panel">
  <h3>Edit Mode — drag corner handles to calibrate zone boundaries</h3>
  <div id="coord-display">Drag a corner handle to see live coordinates.</div>
  <textarea id="json-output" readonly spellcheck="false"></textarea>
  <div id="edit-actions">
    <button id="copy-json-btn" onclick="sim.copyJSON()">Copy JSON</button>
    <span id="copy-confirm"></span>
  </div>
</div>

<script src="../../sims/shared-libs/grid-diagram.js"></script>
</body>
</html>
"""

CALLOUT_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — Interactive Diagram</title>
  <meta name="schema" content="https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1">
  <link rel="stylesheet" href="../../sims/shared-libs/style.css">
</head>
<body>

<div id="layout">
  <svg id="leaders-svg"></svg>

  <div id="diagram-wrapper">
    <img id="diagram-img" src="{image}" alt="{alt}" draggable="false">
    <div id="markers-layer"></div>
  </div>

  <div id="label-panel">
    <!-- Label rows injected by diagram.js. -->
  </div>
</div>

<div id="controls">
  <button class="mode-btn active" id="btn-explore" onclick="sim.setMode('explore')">Explore</button>
  <button class="mode-btn" id="btn-quiz" onclick="sim.setMode('quiz')">Quiz</button>
  <span id="quiz-score" style="display:none">
    Score: <strong id="score-val">0</strong> / <strong id="score-total">0</strong>
  </span>
</div>

<div id="infobox">
  <div id="infobox-prompt">Hover over a numbered marker or a label to learn about that part of the poster.</div>
  <div id="infobox-content">
    <div id="infobox-label"></div>
    <div id="infobox-desc"></div>
    <div id="infobox-ap-tip"></div>
    <button id="quiz-restart" onclick="sim.restartQuiz()">Try Again</button>
  </div>
</div>

<div id="edit-panel">
  <h3>Edit Mode — drag markers to calibrate positions</h3>
  <div id="coord-display">Drag a marker to see its live coordinates.</div>
  <textarea id="json-output" readonly spellcheck="false"></textarea>
  <div id="edit-actions">
    <button id="copy-json-btn" onclick="sim.copyJSON()">Copy JSON</button>
    <span id="copy-confirm"></span>
  </div>
</div>

<script src="../../sims/shared-libs/diagram.js"></script>
</body>
</html>
"""


# --------------------------------------------------------------------------- helpers


def poster_dirs(slugs: list[str]) -> list[Path]:
    if slugs:
        return [POSTERS / s for s in slugs]
    return sorted(p.parent for p in POSTERS.glob("*/data.json"))


def load(d: Path) -> dict:
    return json.loads((d / "data.json").read_text())


def is_callout(data: dict) -> bool:
    return "callouts" in data


def hex_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def font(size: int, bold: bool = False):
    from PIL import ImageFont

    for path in (
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
    ):
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default(size)


def wrap(draw, text: str, fnt, max_w: int) -> list[str]:
    lines: list[str] = []
    cur = ""
    for word in text.split():
        trial = f"{cur} {word}".strip()
        if draw.textlength(trial, font=fnt) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def is_placeholder(png: Path) -> bool:
    from PIL import Image

    try:
        with Image.open(png) as im:
            return im.info.get("Comment", "") == PLACEHOLDER_KEY or im.info.get(PLACEHOLDER_KEY) == "1"
    except Exception:
        return False


# --------------------------------------------------------------------------- scaffold


def draw_placeholder(data: dict, out: Path) -> None:
    from PIL import Image, ImageDraw
    from PIL.PngImagePlugin import PngInfo

    im = Image.new("RGB", (W, H), "#FBF6EC")
    dr = ImageDraw.Draw(im, "RGBA")
    for x in range(0, W, 64):
        dr.line([(x, 0), (x, H)], fill=(120, 140, 170, 40), width=1)
    for y in range(0, H, 64):
        dr.line([(0, y), (W, y)], fill=(120, 140, 170, 40), width=1)

    f_label = font(34, bold=True)
    f_small = font(26)

    if is_callout(data):
        for c in data["callouts"]:
            cx, cy = c["x"] / 100 * W, c["y"] / 100 * H
            r = 20
            col = hex_rgb(c.get("color", "#E07B39"))
            dr.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col + (60,), outline=col + (255,), width=3)
    else:
        for z in data["zones"]:
            x1, y1, x2, y2 = (z["x1"] / 100 * W, z["y1"] / 100 * H, z["x2"] / 100 * W, z["y2"] / 100 * H)
            col = hex_rgb(z.get("color", "#1389A6"))
            dr.rectangle([x1, y1, x2, y2], fill=col + (46,), outline=col + (255,), width=4)
            lines = wrap(dr, z["label"], f_label, int(x2 - x1) - 24)
            total = len(lines) * 40
            ty = (y1 + y2) / 2 - total / 2
            for ln in lines:
                tw = dr.textlength(ln, font=f_label)
                dr.text(((x1 + x2) / 2 - tw / 2, ty), ln, font=f_label, fill=(30, 30, 40, 255))
                ty += 40

    banner = "PLACEHOLDER ART  -  generate the real poster from image-prompt.md and save it over this file"
    tw = dr.textlength(banner, font=f_small)
    dr.rectangle([W / 2 - tw / 2 - 20, H - 70, W / 2 + tw / 2 + 20, H - 22], fill=(30, 30, 40, 220))
    dr.text((W / 2 - tw / 2, H - 62), banner, font=f_small, fill=(255, 255, 255, 255))

    meta = PngInfo()
    meta.add_text("Comment", PLACEHOLDER_KEY)
    im.save(out, "PNG", optimize=True, pnginfo=meta)


def scaffold(d: Path, force: bool) -> list[str]:
    msgs: list[str] = []
    data = load(d)
    slug = d.name

    tpl = CALLOUT_TEMPLATE if is_callout(data) else GRID_TEMPLATE
    main = tpl.format(
        title=html.escape(data["title"]),
        image=html.escape(data["image"]),
        alt=html.escape(data.get("alt") or data["title"]),
    )
    (d / "main.html").write_text(main)
    msgs.append("main.html written")

    png = d / data["image"]
    if force or not png.exists() or is_placeholder(png):
        draw_placeholder(data, png)
        msgs.append(f"placeholder {png.name} drawn")
    else:
        msgs.append(f"kept existing {png.name} (real art)")
    return msgs


# --------------------------------------------------------------------------- validate


def check_grid(data: dict, err: list[str], warn: list[str]) -> None:
    zones = data.get("zones", [])
    if data.get("layout") != "grid":
        err.append('layout must be "grid"')
    if data.get("showLabels") is not True:
        err.append("showLabels must be true (images carry no text)")
    if not 3 <= len(zones) <= 10:
        err.append(f"expected 3-10 zones, found {len(zones)}")
    ids = [z.get("id") for z in zones]
    if len(set(ids)) != len(ids):
        err.append("duplicate zone ids")
    for z in zones:
        zid = z.get("id", "?")
        for k in ("id", "label", "color", "x1", "y1", "x2", "y2", "summary", "facts"):
            if k not in z:
                err.append(f"zone {zid}: missing {k}")
        if any(k not in z for k in ("x1", "y1", "x2", "y2")):
            continue
        if not (0 <= z["x1"] < z["x2"] <= 100 and 0 <= z["y1"] < z["y2"] <= 100):
            err.append(f"zone {zid}: bounds out of range or inverted")
        if z["x2"] - z["x1"] < 6 or z["y2"] - z["y1"] < 6:
            warn.append(f"zone {zid}: smaller than 6% in a dimension (hard to click)")
        if not re.fullmatch(r"#[0-9A-Fa-f]{6}", str(z.get("color", ""))):
            err.append(f"zone {zid}: color must be #RRGGBB")
        facts = z.get("facts", [])
        if not 3 <= len(facts) <= 5:
            warn.append(f"zone {zid}: {len(facts)} facts (aim for 3-5)")
        if len(z.get("summary", "")) > 260:
            warn.append(f"zone {zid}: summary over 260 chars")
        for f_ in facts:
            if len(f_) > 260:
                warn.append(f"zone {zid}: a fact is over 260 chars")
    for a, b in combinations(zones, 2):
        try:
            ox = min(a["x2"], b["x2"]) - max(a["x1"], b["x1"])
            oy = min(a["y2"], b["y2"]) - max(a["y1"], b["y1"])
        except KeyError:
            continue
        if ox > 0.6 and oy > 0.6:
            err.append(f"zones {a['id']} and {b['id']} overlap by {ox:.1f}% x {oy:.1f}%")
    quiz = data.get("quiz", [])
    if not 6 <= len(quiz) <= 12:
        err.append(f"expected 6-12 quiz questions, found {len(quiz)}")
    covered = {q.get("correct_zone") for q in quiz}
    for q in quiz:
        if q.get("correct_zone") not in ids:
            err.append(f"quiz: unknown correct_zone {q.get('correct_zone')!r}")
        if not q.get("explanation"):
            warn.append("quiz: a question has no explanation")
        lab = next((z["label"] for z in zones if z.get("id") == q.get("correct_zone")), None)
        if lab and lab.lower() in q.get("question", "").lower():
            warn.append(f"quiz question gives away its answer label {lab!r}")
    for zid in ids:
        if zid not in covered:
            err.append(f"zone {zid} is never the answer to a quiz question")
    if len({q.get("question") for q in quiz}) != len(quiz):
        err.append("duplicate quiz questions")


def check_callout(data: dict, err: list[str], warn: list[str]) -> None:
    cs = data.get("callouts", [])
    if data.get("layout") != "top-bottom":
        err.append('layout must be "top-bottom" for callout posters')
    if data.get("orientation") != "landscape":
        err.append('orientation must be "landscape"')
    if not 7 <= len(cs) <= 12:
        err.append(f"expected 7-12 callouts, found {len(cs)}")
    if [c.get("id") for c in cs] != list(range(1, len(cs) + 1)):
        err.append("callout ids must be 1..N in array order")
    for c in cs:
        cid = c.get("id", "?")
        for k in ("id", "label", "x", "y", "radius", "color", "hint", "description", "panel"):
            if k not in c:
                err.append(f"callout {cid}: missing {k}")
        if "x" in c and "y" in c and not (0 <= c["x"] <= 100 and 0 <= c["y"] <= 100):
            err.append(f"callout {cid}: x/y out of range")
        if c.get("panel") not in ("top", "bottom"):
            err.append(f"callout {cid}: panel must be top or bottom")
        if c.get("label", "").lower() in c.get("hint", "").lower() and c.get("label"):
            warn.append(f"callout {cid}: hint contains its own label")
        if len(c.get("description", "")) > 420:
            warn.append(f"callout {cid}: description over 420 chars")
    for a, b in combinations(cs, 2):
        try:
            if abs(a["x"] - b["x"]) < 4.5 and abs(a["y"] - b["y"]) < 4.5:
                warn.append(f"callouts {a['id']} and {b['id']} are within 4.5% of each other")
        except KeyError:
            pass
    top = [c for c in cs if c.get("panel") == "top"]
    bot = [c for c in cs if c.get("panel") == "bottom"]
    if top and bot:
        try:
            if max(c["y"] for c in top) > min(c["y"] for c in bot) + 0.01:
                warn.append("panel assignment is not by proximity: a top marker sits below a bottom marker")
            if abs(len(top) - len(bot)) > 1:
                warn.append("top/bottom label strips are unbalanced (aim for a median split)")
            for name, grp in (("top", top), ("bottom", bot)):
                xs = [c["x"] for c in grp]
                if xs != sorted(xs):
                    warn.append(f"{name} callouts are not ordered left-to-right by x in the array")
        except KeyError:
            pass


FM = re.compile(r"\A---\n(.*?)\n---\n", re.S)


def check_page(d: Path, data: dict, err: list[str], warn: list[str]) -> None:
    idx = d / "index.md"
    if not idx.exists():
        err.append("index.md missing")
        return
    text = idx.read_text()
    m = FM.match(text)
    if not m:
        err.append("index.md: no YAML frontmatter")
        return
    fm, body = m.group(1), text[m.end():]
    try:
        import yaml  # PyYAML ships with the mkdocs env

        meta = yaml.safe_load(fm)
        if not isinstance(meta, dict):
            err.append("index.md frontmatter is not a YAML mapping")
        else:
            want = f"posters/{d.name}/{d.name}.png"
            if meta.get("image") != want:
                err.append(f"index.md frontmatter image must be {want!r} (social previews)")
    except ImportError:
        warn.append("PyYAML not installed; frontmatter YAML and image: not checked")
    except Exception as e:  # noqa: BLE001
        err.append(f"index.md frontmatter is not valid YAML (quote titles/descriptions containing ': '): {str(e).splitlines()[0]}")
    if f"]({'./' + d.name}.png)" not in body and f"]({d.name}.png)" not in body:
        warn.append("index.md does not embed the full-size poster image")
    for k in ("title:", "description:", "status:", "hide:"):
        if k not in fm:
            err.append(f"index.md frontmatter missing {k}")
    if re.search(r"^status:\s*(scaffold|built|approved)\s*$", fm, re.M) is None:
        err.append("index.md status must be scaffold, built, or approved")
    t = re.search(r"^title:\s*(.+)$", fm, re.M)
    if t and t.group(1).strip().strip("\"'") != data["title"]:
        warn.append("index.md title differs from data.json title")
    if re.search(r"^# ", body, re.M):
        err.append("index.md body has an H1 (title belongs in frontmatter only)")
    if "main.html" not in body or "<iframe" not in body:
        err.append("index.md must embed ./main.html in an iframe")
    if "main.html?edit=true" not in body:
        warn.append("index.md has no calibration-mode link")
    lines = body.splitlines()
    for i, ln in enumerate(lines[1:], start=1):
        if re.match(r"\s*(?:[-*]|\d+\.)\s", ln) and lines[i - 1].strip() and not re.match(r"\s*(?:[-*]|\d+\.)\s", lines[i - 1]) and not lines[i - 1].startswith("    "):
            err.append(f"index.md line {i + 1 + text[:m.end()].count(chr(10))}: list without a blank line before it")
            break
    for link in re.findall(r"\]\((\.\./[^)#]+)", body):
        if not (d / link).resolve().exists():
            err.append(f"index.md broken link: {link}")
    if not re.search(r"chapters/\d\d-", body):
        warn.append("index.md links to no chapter")
    items = [c["label"] for c in data.get("callouts", [])] or [z["label"] for z in data.get("zones", [])]
    for lab in items:
        if lab not in body:
            warn.append(f"index.md does not list {lab!r}")
    if re.search(r"\bVolt\b[^.\n]{0,40}\b(he|his|him|she|her)\b", body):
        err.append("index.md uses gendered pronouns for Volt")


def check_prompt(d: Path, data: dict, err: list[str], warn: list[str]) -> None:
    p = d / "image-prompt.md"
    if not p.exists():
        err.append("image-prompt.md missing")
        return
    text = p.read_text()
    low = text.lower()
    words = len(text.split())
    if words < 900:
        err.append(f"image-prompt.md is only {words} words (need 900+)")
    if "1920" not in text or "1080" not in text:
        err.append("image-prompt.md must state 1920 × 1080")
    if "no text" not in low:
        err.append('image-prompt.md must state the "no text" rule')
    if "volt" not in low:
        warn.append("image-prompt.md has no Volt cameo")
    items = [c["label"] for c in data.get("callouts", [])] or [z["label"] for z in data.get("zones", [])]
    for lab in items:
        if lab.lower() not in low:
            err.append(f"image-prompt.md never mentions {lab!r}")
    if "hex" not in low and "#" not in text:
        warn.append("image-prompt.md gives no hex colors")


def validate(d: Path) -> tuple[list[str], list[str]]:
    err: list[str] = []
    warn: list[str] = []
    if not (d / "data.json").exists():
        return ["data.json missing"], warn
    try:
        data = load(d)
    except json.JSONDecodeError as e:
        return [f"data.json invalid JSON: {e}"], warn
    for k in ("title", "image"):
        if k not in data:
            err.append(f"data.json missing {k}")
    if data.get("image") != f"{d.name}.png":
        err.append(f'image must be "{d.name}.png"')
    (check_callout if is_callout(data) else check_grid)(data, err, warn)
    check_page(d, data, err, warn)
    check_prompt(d, data, err, warn)
    if not (d / "main.html").exists():
        err.append("main.html missing (run scaffold)")
    if not (d / f"{d.name}.png").exists():
        err.append(f"{d.name}.png missing (run scaffold)")
    return err, warn


# --------------------------------------------------------------------------- gallery

ORDER = [
    "from-doing-to-directing",
    "the-window-that-fills-up",
    "real-citation-fluent-fake",
    "vague-prompt-engineered-context",
    "chat-forgets-project-remembers",
    "folder-of-files-graph-of-knowledge",
    "inside-an-agent-skill",
    "agent-loop-inside-its-sandbox",
    "the-autonomy-dial",
    "twenty-planners-ten-doers",
    "the-literature-funnel",
    "cleaning-without-hiding",
    "code-that-runs-code-that-is-right",
    "hunch-to-falsifiable-hypothesis",
    "the-manuscript-line",
    "figure-you-read-simulation-you-explore",
    "verified-is-not-validated",
    "where-does-your-data-go",
    "day-shift-night-shift",
    "the-paper-behind-the-book",
]


def frontmatter_field(d: Path, key: str) -> str:
    m = FM.match((d / "index.md").read_text())
    if not m:
        return ""
    f = re.search(rf"^{key}:\s*(.+)$", m.group(1), re.M)
    return f.group(1).strip().strip("\"'") if f else ""


def gallery() -> None:
    from PIL import Image

    dirs = [POSTERS / s for s in ORDER if (POSTERS / s / "data.json").exists()]
    extra = [d for d in poster_dirs([]) if d.name not in ORDER]
    dirs += extra
    cards: list[str] = []
    nav: list[str] = []
    for d in dirs:
        data = load(d)
        png = d / data["image"]
        thumb = d / f"{d.name}-thumb.jpg"
        with Image.open(png) as im:
            im = im.convert("RGB")
            im.thumbnail((900, 600))
            im.save(thumb, "JPEG", quality=82, optimize=True)
        title = frontmatter_field(d, "title") or data["title"]
        desc = frontmatter_field(d, "description")
        kind = "Callout" if is_callout(data) else "Grid"
        n = len(data.get("callouts") or data.get("zones") or [])
        unit = "markers" if is_callout(data) else "regions"
        cards.append(
            f"-   [![{title}](./{d.name}/{d.name}-thumb.jpg)](./{d.name}/index.md)\n\n"
            f"    **[{title}](./{d.name}/index.md)**\n\n"
            f"    {desc} *{kind} overlay, {n} {unit}.*\n"
        )
        nav.append(f"      - {title if ':' not in title else json.dumps(title)}: posters/{d.name}/index.md")
    body = (
        "---\n"
        "title: Interactive Infographic Posters\n"
        "description: Twenty full-width interactive infographic posters, most built as side-by-side comparisons, that teach the judgment behind AI-assisted electrical engineering research.\n"
        "hide:\n  - toc\n---\n\n"
        "# Interactive Infographic Posters\n\n"
        "These posters turn the book's biggest ideas into full-width, classroom-ready pictures. Most set a risky way of working beside a controlled one, so the difference is visible at a glance. "
        "Open a poster, hover over or click a region to read what it shows, then switch to **Quiz** mode to test yourself.\n\n"
        "The original concepts and their sources are in [Infographic Poster Ideas](./poster-ideas.md).\n\n"
        '<div class="grid cards poster-grid" markdown>\n\n'
        + "\n".join(cards)
        + "\n</div>\n"
    )
    (POSTERS / "index.md").write_text(body)
    print(f"gallery: {len(dirs)} thumbnails and docs/posters/index.md written")
    print("\nPaste under `Posters:` in mkdocs.yml nav:\n")
    print("  - Posters:\n      - Poster Gallery: posters/index.md\n      - Infographic Poster Ideas: posters/poster-ideas.md")
    print("\n".join(nav))


# --------------------------------------------------------------------------- main


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("cmd", choices=["scaffold", "validate", "all", "gallery"])
    ap.add_argument("slugs", nargs="*")
    ap.add_argument("--force", action="store_true", help="redraw placeholder even over real art")
    ap.add_argument("--quiet", action="store_true", help="only print problems")
    a = ap.parse_args()

    if a.cmd == "gallery":
        gallery()
        return 0
    dirs = poster_dirs(a.slugs)
    if not dirs:
        print("no posters found")
        return 1
    bad = 0
    for d in dirs:
        if not d.is_dir():
            print(f"[{d.name}] directory not found")
            bad += 1
            continue
        if a.cmd in ("scaffold", "all"):
            try:
                for m in scaffold(d, a.force):
                    if not a.quiet:
                        print(f"[{d.name}] {m}")
            except Exception as e:  # noqa: BLE001
                print(f"[{d.name}] scaffold failed: {e}")
                bad += 1
                continue
        if a.cmd in ("validate", "all"):
            err, warn = validate(d)
            status = "FAIL" if err else "ok"
            if err or warn or not a.quiet:
                print(f"[{d.name}] {status}  ({len(err)} errors, {len(warn)} warnings)")
            for e in err:
                print(f"    ERROR   {e}")
            for w in warn:
                print(f"    warning {w}")
            bad += bool(err)
    print(f"\n{len(dirs)} poster(s) checked, {bad} with errors")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
