# Day Shift, Night Shift — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no signs, no logos, no watermark, no readable code, no readable equations, and no legible screens. Monitors, logs, clipboards, and notebooks show only unreadable abstract marks: blurred lines, color blocks, plain geometric symbols. Clock faces have hands and plain tick marks but no numerals. Gauges have a needle and plain ticks but no numerals. Check marks, a raised-hand shape, and a stop bar are plain symbols and are allowed. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages and not pixels.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical engineering and computer design
- **Style:** High-quality polished illustration with soft lighting, rich detail, and a consistent line weight. Light comes from the upper left in the day scenes. Semi-realistic is welcome: a real-looking lab desk, monitor, shelf, and window. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. People are faceless or softly stylized, never photoreal faces. Agents are small friendly teal (#1F7A8C) workers or neutral machine icons, never humanoid robots with faces.
- **Palette** (always paired with an icon or pattern, never color alone): maroon #7A0019 for the researcher and accountability; gold #FFCC33 for focal points; teal #1F7A8C for agents and automation; signal green #3C8D5A for approved; brick red #C0392B for risk; charcoal #2A2E3A for structure.

## What to Draw

One poster split into a **left half (the day shift)** and a **right half (the night shift and the morning after)**, made of **seven clearly separated panels**. Every panel is a rounded rectangle with a thin colored border and a slightly lighter fill, separated from its neighbors by a clean off-white gutter of at least 0.8% of the image width. Nothing in a panel may cross its border. Keep a 2% outer margin. Do not add a title bar, header, footer, legend, or side panel: the panels are the whole composition.

- **Left half:** a large bright lab scene on top, and a smaller panel beneath it about approval requests.
- **Right half:** a dark lab scene on top, a row of three small criteria panels in the middle, and a wide morning audit strip at the bottom.

**Comparison rule:** the day lab and the night lab are the same room, drawn from the same camera angle at the same scale: the same desk, chair, monitor, shelf, window, and wall clock. The day panel shows a little extra floor along its bottom edge, which the night panel crops. A wider gutter of about 3% runs down the middle between the two halves.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| Day Shift Lab (left, large) | 2.0% | 48.5% | 2.0% | 62.0% | Gold #D9A400 |
| Approval Requests (left, bottom) | 2.0% | 48.5% | 64.0% | 98.0% | Maroon #7A0019 |
| Night Shift Lab (right, large) | 51.5% | 98.0% | 2.0% | 50.0% | Deep blue #1F4E6B |
| Reach and Control (right, middle left) | 51.5% | 66.0% | 52.0% | 73.0% | Blue #2F6DB5 |
| Cost and Data (right, middle center) | 67.5% | 82.0% | 52.0% | 73.0% | Amber #D98E04 |
| Proof and Record (right, middle right) | 83.5% | 98.0% | 52.0% | 73.0% | Signal green #3C8D5A |
| Morning Audit (right, bottom) | 51.5% | 98.0% | 75.0% | 98.0% | Brick red #C0392B |

### Day Shift Lab

**Position:** Large left panel, x from 2.0% to 48.5%, y from 2.0% to 62.0%.
**Visual:** A gold (#D9A400) border. A bright, sunlit research lab. At the left, a tall window with warm yellow daylight and a sun low in a clear sky. At the center, a wooden desk with a large monitor. A faceless researcher in a maroon (#7A0019) sweater sits in a chair seen three-quarter from behind, one hand on the mouse. The monitor shows three tidy tiles side by side, and in each tile one small friendly teal (#1F7A8C) worker figure does a different task, with abstract marks only. A small clipboard-with-hand badge in the monitor corner shows an approval request waiting. On the back wall are a shelf with notebooks and a wall clock with hands and plain ticks. Every action in the scene is visible and calm. A rug and a little extra floor run along the bottom edge.

### Approval Requests

**Position:** Bottom-left panel, x from 2.0% to 48.5%, y from 64.0% to 98.0%.
**Visual:** A maroon (#7A0019) border. On the left, a large cream clipboard holds three stacked request cards. The top card carries a green check, the middle card carries a gold raised-hand shape, and the bottom card carries a red stop bar. A maroon sleeve and hand hold a pen above the middle card. On the right, a simple gate diagram with three lanes: the first lane lets a small teal worker pass under a green arrow, the second lane shows the worker stopped at a gold barrier with a hand shape, and the third lane shows a closed red barrier with a stop bar. All marks are plain shapes with no words.

### Night Shift Lab

**Position:** Large right panel, x from 51.5% to 98.0%, y from 2.0% to 50.0%.
**Visual:** A deep blue (#1F4E6B) border. The same room, desk, chair, monitor, shelf, window, and wall clock as the Day Shift Lab, same camera and scale, but at night with the lights off. The window shows a dark navy sky with a crescent moon and a few stars. The chair is pushed back and empty. The monitor on the desk is dark. In the right corner of the room a tall translucent cabinet shaped like a cloud glows teal (#1F7A8C), and inside it four tiny friendly teal worker figures move around, each doing one job: one carries an envelope, one pushes a sweep of dots across a plain waveform with no axis numbers, one attaches a tag to a small ticket card, and one writes on a page. A faint teal light spreads across the nearby floor but stays inside the panel. The wall clock still shows only hands and ticks, and a small crescent moon icon rests above it.

### Reach and Control

**Position:** Right-middle panel, left, x from 51.5% to 66.0%, y from 52.0% to 73.0%.
**Visual:** A blue (#2F6DB5) border. Three round teal-rimmed dots, arranged in a small triangle, each holding a plain white pictogram. The first dot shows a cloud, a laptop, and a server box in a small row to stand for where the agent runs. The second dot shows three concentric rings spreading outward from a small spark to stand for blast radius. The third dot shows a gate with a hand shape to stand for the approval model. Thin gray lines join the three dots.

### Cost and Data

**Position:** Right-middle panel, center, x from 67.5% to 82.0%, y from 52.0% to 73.0%.
**Visual:** An amber (#D98E04) border. Three round teal-rimmed dots in a small triangle. The first dot shows a round gauge with a needle and plain ticks and no numerals, for usage metering. The second dot shows a document with an open padlock and an eye shape, for data exposure. The third dot shows a short stack of cards with a small bookmark, for memory. Thin gray lines join the dots.

### Proof and Record

**Position:** Right-middle panel, right, x from 83.5% to 98.0%, y from 52.0% to 73.0%.
**Visual:** A signal-green (#3C8D5A) border. Two round teal-rimmed dots side by side. The first dot shows a magnifier held over a round seal with a check, for claim verification. The second dot shows a rolled log scroll with short lines and a small clock hand, for the activity audit. A thin gray line joins the two dots. Eight dots in total across the three criteria panels read as one ring of eight criteria.

### Morning Audit

**Position:** Wide bottom-right panel, x from 51.5% to 98.0%, y from 75.0% to 98.0%.
**Visual:** A brick-red (#C0392B) border. A bright morning scene. At the left, a faceless researcher in a maroon sweater sits at a small desk with a steaming coffee mug, leaning toward a long scroll. The scroll runs horizontally across the middle of the panel as a log: a strip of many short rows. Most rows carry a small green check. A few rows carry a gold diamond with a dot to mark something unexpected. One row is circled in thick brick red with a small flag. A window with soft sunrise light sits at the upper left. At the right end, in a cream alcove about 8% wide, Volt stands beside the log (see the cameo below).

### Volt the Border Collie cameo

Inside the cream alcove at the right end of the Morning Audit panel, centered at about 92.0% from the left and 87.0% from the top, draw Volt at about 6.5% of the image width in a warning pose. Volt is a black-and-white border collie with a black back, ears, and tail and a white blaze, chest, muzzle, and paws; large kind amber eyes with one ear semi-folded; a maroon (#7A0019) bandana with a small gold lightning bolt; and a small gold whistle on a cord around the neck. Volt faces the log with one front paw raised in a calm stop gesture and the gold whistle held between the teeth, ready to blow at the circled row. Volt must not cover the log, the circled row, or the panel border.

## Layout Notes

- The seven panels are the whole composition. Do not add a title bar, header, footer, legend, or side panel.
- Keep a clean off-white gutter of at least 0.8% between all panels, and a wider gutter (about 3%) down the middle between the left half and the right half. Do not let light, glows, or shadows spill into the gutters.
- The Day Shift Lab and the Night Shift Lab must be the same room at the same scale. Only the light, the empty chair, the dark monitor, the moon, and the glowing teal cloud cabinet differ.
- Teal always means agents. Green means approved. Gold diamonds mean unexpected. Red means risk. Pair every color with a symbol.
- Keep line weight, rounding, and lighting consistent. No text of any kind anywhere in the image.

## Do Not Include

- Any text, letters, numbers, labels, or captions
- A title, heading, legend, or banner
- Numerals on clocks, gauges, or screens
- Readable code, readable equations, or legible screens and logs
- Photorealistic faces, humanoid robots with faces, or glowing brains
- Brand names, logos, a watermark, or a signature

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/day-shift-night-shift/day-shift-night-shift.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
