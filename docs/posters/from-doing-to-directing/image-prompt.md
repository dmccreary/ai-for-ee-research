# From Doing Everything to Directing Everything — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no signs with writing, no logos, no watermark, and no readable code or equations. Screens, notebooks, calendars, clipboards, papers, and spines show only unreadable abstract marks: blurred lines, plain color blocks, and generic waveforms with no axis numbers or tick labels. The calendar has blank squares and the clock has tick marks only. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages and will still line up.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid.
- **Audience:** Graduate students, postdocs, and faculty in electrical and computer engineering.
- **Style:** High-quality, polished, semi-realistic illustration with soft lighting from the upper left, rich detail, and a consistent line weight. Real-looking oscilloscopes, laptops, printed papers, and lab benches. Saturated but professional colors. Faceless or softly stylized people, never photoreal faces. No glowing brains, no chrome robot hands, no stock-photo clichés.
- **Palette:** maroon #7A0019 for the researcher and accountability; gold #FFCC33 for focal points; teal #1F7A8C for agents and automation; signal green #3C8D5A for verified or controlled; brick red #C0392B for overload and risk; charcoal #2A2E3A for structure. Always pair a color with an icon or pattern, never color alone.

## What to Draw

One poster split into a **left half (the risky, naive version: doing everything)** and a **right half (the controlled version: directing everything)**, plus one full-width panel along the bottom. The poster is made of **seven clearly separated panels**. Every panel is a rounded rectangle with a thin colored border and a slightly lighter off-white fill, separated from its neighbors by a clean gutter of at least 0.8% of the image so the panels read as distinct regions. A wider gutter, about 3%, runs down the middle between the left and right halves. Nothing in a panel may cross its border.

**Comparison rule:** the left and right halves use the same camera angle, the same scale, the same room, and the same objects in matching rows, so a student can compare them at a glance. The two bench panels in the middle row are drawn as the same room (same desk, same oscilloscope position, same lamp, same window, same chair position), and differ only in clutter, lighting mood, and what the researcher is doing.

Keep a safe margin of about 2% on every side. Do not add a title bar, header, footer, legend, or side panel: the panels are the whole composition. The researcher is the same faceless figure in every panel: a softly stylized person in a maroon (#7A0019) sweater, shown without facial features.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| Five Tasks, One Pair of Hands | 2.0% | 48.5% | 2.0% | 29.0% | Brick red #C0392B |
| The Agent Teams | 51.5% | 98.0% | 2.0% | 29.0% | Teal #1F7A8C |
| The Soloist's Bench | 2.0% | 48.5% | 31.0% | 61.0% | Amber #B9770E |
| The Orchestrator's Bench | 51.5% | 98.0% | 31.0% | 61.0% | Signal green #3C8D5A |
| The Crossed-Out Calendar | 2.0% | 48.5% | 63.0% | 78.0% | Brown #8C5A3C |
| Four Jobs That Stay With You | 51.5% | 98.0% | 63.0% | 78.0% | Gold #FFCC33 |
| The Thread of Accountability | 2.0% | 98.0% | 80.0% | 98.0% | Maroon #7A0019 |

### Five Tasks, One Pair of Hands

**Position:** Top-left panel, x from 2.0% to 48.5%, y from 2.0% to 29.0%. Brick red (#C0392B) border.
**Visual:** On the far left of the panel stands one small faceless maroon figure with both hands raised slightly. Five thin brick-red arrows fan out from the figure to five small desk stations arranged in an arc across the panel, so the person must reach each one in turn. The stations, from top to bottom around the arc: (1) a stack of printed papers with a yellow highlighter and a magnifying glass; (2) a small analog-to-digital converter evaluation board wired to a laptop that shows a blurred spectrum with one tall spike and no axis numbers; (3) a sheet of paper with three loose block-diagram sketches made of plain boxes and arrows, and a pencil; (4) a laptop showing colored blurred code lines; (5) a two-column paper draft with gray placeholder text bars and one figure box. Each station sits on its own small desk tile with a soft shadow. The mood is warm but overloaded.

### The Agent Teams

**Position:** Top-right panel, x from 51.5% to 98.0%, y from 2.0% to 29.0%. Teal (#1F7A8C) border.
**Visual:** A wide charcoal-framed wall display fills the panel and shows a fan of small agent workstations in two tiers. On the **upper tier**, about twenty small, lighter-teal (#1F7A8C, lighter tint) planner figures arranged in two rows of ten, each at a small desk holding a rolled map, an outline sheet, or a checklist. On the **lower tier**, ten sturdier, darker-teal figures with small tool belts, each at a bench with a laptop, a probe, a chart, or a printed figure. The agents have simple oval heads with no faces and no humanoid-robot features. Thin teal lines connect upper-tier planners to lower-tier builders, with small cream task cards riding along them. Both tiers face the viewer, light from the upper left, and the lower tier is visibly fewer and larger than the upper tier.

### The Soloist's Bench

**Position:** Middle-left panel, x from 2.0% to 48.5%, y from 31.0% to 61.0%. Amber (#B9770E) border.
**Visual:** A researcher's bench seen from a slightly raised front-left angle. The faceless maroon figure sits in the chair at the center-left, shoulders hunched, one hand on a laptop mouse. On the desk: an oscilloscope on the right showing a blurred green trace with no numbers; an open laptop with three half-written script windows as colored blurred bars; a leaning stack of printed papers; a cold mug of coffee with no steam; a dim desk lamp. Behind the desk, a window shows a dark blue night sky with a crescent moon, and a pinboard with loose sheets. The same room, desk, oscilloscope, lamp, window, and chair appear in the Orchestrator's Bench panel at the same positions and scale. The mood is warm, late, and cluttered.

### The Orchestrator's Bench

**Position:** Middle-right panel, x from 51.5% to 98.0%, y from 31.0% to 61.0%. Signal green (#3C8D5A) border.
**Visual:** The same room, desk, oscilloscope position, lamp, window, and chair as the Soloist's Bench, seen from the same angle and at the same scale, but tidy. The chair is pushed in. The faceless maroon figure stands beside the desk at the position the chair occupied on the left, holding a single clipboard in one hand and a pen in the other, looking at one page. On the desk: the oscilloscope with the same blurred trace, a laptop showing one open document with a single highlighted row, a neat stack of papers, and an empty mug on a coaster. The same night window and crescent moon appear, and the same pinboard hangs behind the desk, now with a few sheets pinned neatly in a grid. The mood is calm and in control.

### The Crossed-Out Calendar

**Position:** Lower-left panel, x from 2.0% to 48.5%, y from 63.0% to 78.0%. Brown (#8C5A3C) border.
**Visual:** A wall calendar grid with blank squares, every square crossed by a bold brick-red diagonal slash, hangs at the left. A nearly empty hourglass stands at the center, its sand almost all in the lower bulb, and a round wall clock with tick marks and no numerals sits at the right. Beside the calendar, a small stack of yellow sticky notes and a cold mug. The panel is wide and short, so arrange the three objects in a row with generous spacing. The mood is time running out.

### Four Jobs That Stay With You

**Position:** Lower-right panel, x from 51.5% to 98.0%, y from 63.0% to 78.0%. Gold (#FFCC33) border.
**Visual:** Four rounded-square gold (#FFCC33) tiles in a single row, each with a simple charcoal icon and no text. Tile 1: a signpost with two arrows (set direction). Tile 2: a magnifying glass over a clean waveform (supply domain judgment). Tile 3: two overlapping sheets with one mismatched row circled (resolve conflicts). Tile 4: a gold seal with a check mark stamped on a page (decide what is true). Thin charcoal dividers or even gaps separate the tiles. The row matches the Crossed-Out Calendar panel in height so the two bottom-middle panels read as a pair.

### The Thread of Accountability

**Position:** Full-width bottom panel, x from 2.0% to 98.0%, y from 80.0% to 98.0%. Maroon (#7A0019) border.
**Visual:** A single maroon (#7A0019) thread runs unbroken from the left edge of the panel to the right edge. At the far left it is held by a tiny faceless maroon figure beside a small cluttered desk icon. At the far right it ends in a signature line on a document, with a gold (#FFCC33) seal and a pen resting on it; the signature is an unreadable scribble. Along the thread, between the two ends, a small teal agent-team icon sits just above the line without interrupting it. In the horizontal center, a small cream alcove holds Volt (see below). The thread must be visibly continuous, with no gaps or knots that suggest it breaks.

### Volt the Border Collie cameo (thinking pose)

Exactly one cameo, at about 6.5% of the image width, centered at about 50% from left and 90% from top, sitting in the cream alcove in the middle of The Thread of Accountability panel. Volt is a black-and-white border collie with a black back, ears, and tail, a white blaze, chest, muzzle, and paws, large kind amber eyes, one ear semi-folded, a maroon (#7A0019) bandana with a small gold (#FFCC33) lightning-bolt emblem, and a small gold whistle on a cord around the neck. Volt sits in a thinking pose with the head tilted, one raised paw near the chin, and the other paw resting lightly on the maroon thread. Volt must not touch the panel border and must not cover the thread's ends or the signature.

## Layout Notes

- The seven panels are the whole composition. Do not add a title bar, header, footer, legend, or side panel.
- No text anywhere: calendar squares are blank, the clock has tick marks only, and all papers and screens show unreadable marks.
- Same room, same angle, same scale, and same object positions in the two bench panels. Only clutter, lighting mood, and the researcher's activity differ.
- Keep a clean gutter of at least 0.8% between panels, a wider gutter of about 3% between the left and right halves, and no shadows, glows, or arrows spilling into gutters.
- Keep line weight, rounding, and shading (light from the upper left) consistent across all panels.
- Color is always paired with an icon or shape: the maroon thread carries a pen and a signature, teal carries small agent figures, and the gold tiles carry icons.
- The key idea is that the work changes from doing to directing, while the maroon thread of accountability stays unbroken. Make the thread the most continuous element on the poster.

## Do Not Include

- Any text, letters, numbers, labels, captions, or calendar numerals
- A title, heading, legend, banner, or axis labels
- Readable code, equations, or screen content
- Photorealistic faces, or humanoid robots with faces
- Brand names, logos, a watermark, or a signature that can be read

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/from-doing-to-directing/from-doing-to-directing.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
