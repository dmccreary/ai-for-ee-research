# Verified Is Not Validated — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no signs, no logos, no watermark, no readable code, no readable equations, and no legible screens. Blueprints, checklists, notebooks, datasheets, and screens show only unreadable abstract marks: blurred lines, color blocks, plain geometric symbols, and generic waveforms with no axis labels or tick numbers. Check marks and one red question mark are plain symbols and are allowed. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages and not pixels.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical engineering and computer design
- **Style:** High-quality polished illustration with soft lighting, rich detail, and a consistent line weight. Light comes from the upper left. Semi-realistic is welcome: a real-looking oscilloscope bench, a probe station, a printed circuit board, a laptop. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. People are faceless or softly stylized, never photoreal faces.
- **Palette** (always paired with an icon or pattern, never color alone): maroon #7A0019 for the human researcher and accountability; gold #FFCC33 for focal points; teal #1F7A8C for agents and automation; signal green #3C8D5A for verified or passed; brick red #C0392B for failure and risk; charcoal #2A2E3A for structure.

## What to Draw

One poster made of **eight clearly separated panels** in three rows. Every panel is a rounded rectangle with a thin colored border and a slightly lighter fill than the background, separated from its neighbors by a clean off-white gutter of at least 0.8% of the image width. Nothing in a panel may cross its border. Keep a 2% outer margin. Do not add a title bar, header, footer, legend, or side panel: the panels are the whole composition.

- **Top row, left half (verification: was it built right?):** two panels. A calm scene of an inspector checking a finished board and its code against a blueprint, and beside it a tall clipboard with every line ticked green.
- **Top row, right half (validation: was it the right thing?):** two panels. A real bench with a probe, a blueprint with a red question mark, and a drawn field sensor; and beside it a screen where two waveforms disagree.
- **Middle band, full width:** one wide panel in which a small flaw on a green-ticked blueprint is carried through design, code, and build to the finished board.
- **Bottom row:** three equal-weight panels, one for each kind of check: two different routes to one answer, the original document, and two different models compared.

The left top half is calm and tidy; the right top half is a real, slightly messy bench. A wider gutter of about 3% runs down the middle of the top row between the verification half and the validation half.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| Verification Checkpoint (top left) | 2.0% | 31.0% | 2.0% | 36.0% | Signal green #3C8D5A |
| The Green Checklist (top, end of left half) | 32.5% | 48.5% | 2.0% | 36.0% | Charcoal #2A2E3A |
| Validation Checkpoint (top right, wide) | 51.5% | 80.5% | 2.0% | 36.0% | Maroon #7A0019 |
| Waveforms That Disagree (top far right) | 82.0% | 98.0% | 2.0% | 36.0% | Brick red #C0392B |
| The Flaw That Travels (middle band) | 2.0% | 98.0% | 38.0% | 62.0% | Gold #D9A400 |
| Independent Check (bottom left) | 2.0% | 32.5% | 64.0% | 98.0% | Teal #1F7A8C |
| Primary Source Check (bottom middle) | 34.0% | 66.0% | 64.0% | 98.0% | Violet #7A5AA6 |
| Cross-Model Check (bottom right) | 67.5% | 98.0% | 64.0% | 98.0% | Blue #2F6DB5 |

### Verification Checkpoint

**Position:** Top-left panel, x from 2.0% to 31.0%, y from 2.0% to 36.0%.
**Visual:** A clean, calm scene with a green (#3C8D5A) border. On the left, a drafting table holds a large blueprint sheet with neat blue lines and a few component symbols, all drawn as unreadable marks. In the middle, a finished printed circuit board (dark green with gold pads and a few chips) rests on a small mat. On the right, a laptop shows blurred lines of code with no readable characters. A faceless inspector in a maroon (#7A0019) lab coat, seen three-quarter from behind, holds a magnifier in one hand and runs a finger down the blueprint with the other, comparing it with the board. Soft light from the upper left. Everything is tidy, ordered, and quiet.

### The Green Checklist

**Position:** Top panel, right end of the left half, x from 32.5% to 48.5%, y from 2.0% to 36.0%.
**Visual:** A charcoal (#2A2E3A) border. One tall cream clipboard fills the panel with eight rows. Each row has a short gray bar (an unreadable line of writing) and a bold signal-green (#3C8D5A) check mark in a rounded box. All eight rows are ticked. A small green seal with a check at the bottom of the clipboard completes the look. Nothing is red or unfinished. The feeling is complete and satisfied.

### Validation Checkpoint

**Position:** Top panel, left end of the right half, x from 51.5% to 80.5%, y from 2.0% to 36.0%.
**Visual:** A maroon (#7A0019) border. Same camera angle and scale as the Verification Checkpoint, but a real working bench. In the cream alcove at the lower left (about x 52.4% to 60.2%, y 17% to 35%) Volt stands. In the upper middle, a blueprint sheet pinned to a wall, with a large red (#C0392B) question mark drawn over it. In the upper right, a small round inset of a field scene: a slim weather-resistant sensor on a pole in open ground under a pale sky, drawn as a simple illustration. Across the lower middle and right, a bench holds an oscilloscope, a probe station with a probe touching the same dark-green circuit board with gold pads, and a few loose cables. The oscilloscope screen shows only a blurred generic trace. The bench is slightly cluttered and lived-in.

### Waveforms That Disagree

**Position:** Top panel, far right, x from 82.0% to 98.0%, y from 2.0% to 36.0%.
**Visual:** A brick-red (#C0392B) border. A tall dark-charcoal screen fills most of the panel. Two smooth waveforms cross it: a clean teal (#1F7A8C) curve for the simulation and a gold (#FFCC33) curve, slightly distorted, for the measurement. They start together on the left and drift visibly apart on the right. A thin red double-headed arrow spans the gap between them. No axes, no grid numbers, no labels. A small gold caution triangle sits at the top corner, containing only a plain bar-and-dot symbol.

### The Flaw That Travels

**Position:** Wide middle band, x from 2.0% to 98.0%, y from 38.0% to 62.0%.
**Visual:** A gold (#D9A400) border. A left-to-right flow in four steps joined by one continuous thick dashed brick-red arrow. At the far left, a blueprint sheet with a green tick in the corner; on the sheet one component symbol is drawn slightly wrong and is ringed by a small red circle. A small red diamond token with a notch represents the flaw and rides the arrow. Step two is a design drawing with a green tick. Step three is a laptop with blurred code and a green tick. Step four, at the far right, is the finished board with a large green verified seal, and the red diamond token glows at the center of the board. The arrow never breaks and the token never disappears. All the ticks are green and confident, and only the small red token tells the truth.

### Independent Check

**Position:** Bottom-left panel, x from 2.0% to 32.5%, y from 64.0% to 98.0%.
**Visual:** A teal (#1F7A8C) border. Two clearly different routes lead from the left side to one gold target ring at the right. The upper route is a conveyor passing a small gear and a script page. The lower route is a hand-drawn curve with a compass and a calculator, drawn without readable keys. The two routes use different shapes, so their obstacles differ. Both end on the same gold target. Between them, a small balance scale shows that the two results match.

### Primary Source Check

**Position:** Bottom-middle panel, x from 34.0% to 66.0%, y from 64.0% to 98.0%.
**Visual:** A violet (#7A5AA6) border. In the center, a fanned stack of three original documents: a journal paper, a datasheet, and a standards booklet, each a cream page with blurred lines. A large magnifier hovers over a highlighted gold-yellow stripe on the top page. On the left, a faded, slightly crumpled summary sheet with a dashed arrow leading from it back to the original stack. A small gold pin marks the exact passage. Everything on the originals is crisp, and the summary is soft and pale.

### Cross-Model Check

**Position:** Bottom-right panel, x from 67.5% to 98.0%, y from 64.0% to 98.0%.
**Visual:** A blue (#2F6DB5) border. Two clearly different machine icons side by side, drawn as friendly teal (#1F7A8C) devices: one is a rounded square with two small indicator lights, the other is an octagon with a ring. Each releases a speech-bubble shape holding unreadable abstract marks. In the bubbles, most marks line up, but one mark differs, and a small gold flag is planted on the difference. A feather-light check sits beside the matching marks and a small gold magnifier points at the flag, showing that agreement is weak evidence and disagreement tells you where to look.

### Volt the Border Collie cameo

Inside the cream alcove at the lower left of the Validation Checkpoint panel, centered at about 56.3% from the left and 26.5% from the top, draw Volt at about 6.5% of the image width in a thinking pose. Volt is a black-and-white border collie with a black back, ears, and tail and a white blaze, chest, muzzle, and paws; large kind amber eyes with one ear semi-folded; a maroon (#7A0019) bandana with a small gold lightning bolt; and a small gold whistle on a cord around the neck. Volt sits, head tilted, one paw raised to the chin, looking up at the red question mark over the blueprint. Volt must not cover the blueprint, the question mark, the bench, or the panel border.

## Layout Notes

- The eight panels are the whole composition. Do not add a title bar, header, footer, legend, or side panel.
- Keep a clean off-white gutter of at least 0.8% between all panels, and a wider gutter (about 3%) down the middle of the top row between the verification half and the validation half. Do not let arrows, glows, or shadows spill into the gutters.
- Keep the same board, the same blueprint, and the same camera angle and scale in the Verification Checkpoint and Validation Checkpoint panels, so a student sees the same object in two different settings.
- The core idea is that a full set of green ticks does not prove the right thing was built. Make the single small red flaw in the middle band the most striking small detail.
- Use green for ticks and verified items, red for the flaw and the gap, teal for automation. Pair every color with a symbol or shape.
- Keep line weight, rounding, and lighting (from the upper left) consistent. No text of any kind anywhere in the image.

## Do Not Include

- Any text, letters, numbers, labels, or captions
- A title, heading, legend, or banner
- Readable code, readable equations, axis labels, or tick numbers
- Signs or screens with legible words
- Photorealistic faces, humanoid robots with faces, or glowing brains
- Brand names, logos, a watermark, or a signature

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/verified-is-not-validated/verified-is-not-validated.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
