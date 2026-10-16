# The Autonomy Dial — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no signs with writing, no logos, no watermark, and no readable code or equations. The dial has notches with small icons and no numbers. The gauges have colored arcs and needles and no tick numbers. Screens, papers, logs, and calendars show only unreadable abstract marks such as blurred gray lines and plain color blocks. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages and will still line up.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid.
- **Audience:** Graduate students, postdocs, and faculty in electrical engineering and computer design.
- **Style:** High-quality, polished, semi-realistic illustration with soft lighting from the upper left, rich detail, and a consistent line weight. Saturated but professional colors. Faceless or softly stylized people, never photoreal faces. Agents are small friendly teal workers with oval heads and no faces, never humanoid robots with faces. No glowing brains, no chrome robot hands, no stock-photo clichés.
- **Palette:** maroon #7A0019 for the researcher; gold #FFCC33 for focal points and approval gates; teal #1F7A8C for the agent and automation; signal green #3C8D5A for verified or safe; brick red #C0392B for risk; amber #B9770E for caution; charcoal #2A2E3A for structure. Always pair color with an icon or pattern, never color alone.

## What to Draw

A poster made of **nine clearly separated panels**: one wide dial panel across the top, then **four equal vertical columns**, each column made of a tall scene panel above a shorter gauge panel. Every panel is a rounded rectangle with a thin colored border and a slightly lighter off-white fill, separated from its neighbors by a clean gutter of at least 0.8% of the image so the panels read as distinct regions. Nothing in a panel may cross its border. Keep a safe margin of about 2% on every side. Do not add a title bar, header, footer, legend, or side panel: the panels are the whole composition.

**Comparison rule:** the four columns read left to right from the cautious end of the dial (suggest only) to the trusting end (act and report). They use the same camera angle, the same scale, and the same cast: the same faceless maroon (#7A0019) researcher and the same small teal (#1F7A8C) agent appear in every scene panel, drawn at the same size. The four gauge panels are identical in layout, size, and icons, and differ only in where the needles point.

**Gauge convention (important):** each gauge panel holds three half-circle gauges in a row, each with a red-to-amber-to-green arc running left to right and a charcoal needle. A needle pointing to the green right end always means safe: easy to undo (first gauge, a circular undo arrow icon), the result stays local (second gauge, a box with an arrow that stays inside it), and quick to check (third gauge, a magnifying glass with a check mark). A needle pointing to the red left end means danger.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| The Autonomy Dial | 2.0% | 98.0% | 2.0% | 24.0% | Charcoal #2A2E3A |
| Level 0: Suggest Only | 2.0% | 25.1% | 26.0% | 70.0% | Brick red #C0392B |
| Level 0 Gauges | 2.0% | 25.1% | 72.0% | 98.0% | Brick red #C0392B |
| Level 1: Approve Each Step | 26.3% | 49.4% | 26.0% | 70.0% | Amber #B9770E |
| Level 1 Gauges | 26.3% | 49.4% | 72.0% | 98.0% | Amber #B9770E |
| Level 2: Act Within a Boundary | 50.6% | 73.7% | 26.0% | 70.0% | Teal #1F7A8C |
| Level 2 Gauges | 50.6% | 73.7% | 72.0% | 98.0% | Teal #1F7A8C |
| Level 3: Act and Report | 74.9% | 98.0% | 26.0% | 70.0% | Signal green #3C8D5A |
| Level 3 Gauges | 74.9% | 98.0% | 72.0% | 98.0% | Signal green #3C8D5A |

### The Autonomy Dial

**Position:** Wide top panel, x from 2.0% to 98.0%, y from 2.0% to 24.0%. Charcoal (#2A2E3A) border.
**Visual:** A large semicircular dial, about 20% of the image width, centered at about 36% from left. Its arc is divided into four equal notches colored, from left to right, brick red (#C0392B), amber (#B9770E), teal (#1F7A8C), and signal green (#3C8D5A). Each notch carries a plain icon and no number: an open hand with a speech bubble (suggest), a barrier gate (approve), a fenced square (boundary), and a crescent moon with a clock (unattended). The needle is a charcoal pointer drawn in a neutral position, pointing straight up between the second and third notches, so the overlay can highlight each level. To the left of the dial stands the small teal agent, looking at the dial. To the right of the dial, at about 52% to 72% from left, three round badges in a row show the three task properties: a circular undo arrow, a box with an arrow leaving it, and a magnifying glass with a check mark, each in a charcoal outline on a gold (#FFCC33) disc. At the far right of the panel is a small cream alcove for Volt.

### Level 0: Suggest Only

**Position:** Column 1 scene, x from 2.0% to 25.1%, y from 26.0% to 70.0%. Brick red (#C0392B) border.
**Visual:** An office desk seen from a slightly raised front angle. The maroon researcher sits at a laptop with both hands on the keyboard. The small teal agent stands beside the desk, holding up a draft card with gray abstract lines and a small envelope icon, offering it, with its own hands clearly not touching the laptop. On the laptop screen, a blurred envelope with an arrow leaving toward a far-off faceless collaborator figure at the panel's right edge. A small icon of a hand with a pause mark floats near the agent. The mood is careful and hands-on.

### Level 0 Gauges

**Position:** Column 1 gauge strip, x from 2.0% to 25.1%, y from 72.0% to 98.0%. Brick red (#C0392B) border.
**Visual:** Three identical half-circle gauges in a row. All three needles point to the red left end: not easy to undo, the result leaves your control, and hard to check.

### Level 1: Approve Each Step

**Position:** Column 2 scene, x from 26.3% to 49.4%, y from 26.0% to 70.0%. Amber (#B9770E) border.
**Visual:** The same camera angle and scale. The small teal agent stands at a gold (#FFCC33) barrier gate, like a short turnstile arm, holding an action card with a simple branching line icon (a repository branch) pointing toward a small server rack on the far side of the gate. The maroon researcher stands beside the gate with one hand on the gate's lever, and a small stand next to them holds a green check tile and a red cross tile with no text. The gate arm is down. The mood is deliberate: nothing passes without a yes.

### Level 1 Gauges

**Position:** Column 2 gauge strip, x from 26.3% to 49.4%, y from 72.0% to 98.0%. Amber (#B9770E) border.
**Visual:** Three identical half-circle gauges in a row. The first two needles point to the red left end (cannot be undone, leaves your control). The third needle points to the green right end (quick to check).

### Level 2: Act Within a Boundary

**Position:** Column 3 scene, x from 50.6% to 73.7%, y from 26.0% to 70.0%. Teal (#1F7A8C) border.
**Visual:** The same camera angle and scale. A square fenced yard drawn with a dashed teal line. Inside it the small teal agent works at a desk with several document drafts, each a sheet of gray abstract lines, spread in front of it. One side of the fence has a gold (#FFCC33) archway gate. The maroon researcher stands just outside the gate with a pen, reading one page the agent has handed through. The agent stays inside the dashed line. The mood is free but contained.

### Level 2 Gauges

**Position:** Column 3 gauge strip, x from 50.6% to 73.7%, y from 72.0% to 98.0%. Teal (#1F7A8C) border.
**Visual:** Three identical half-circle gauges in a row. The first two needles point to the green right end (easy to undo, stays local). The third needle points to the red left end (hard to check without a human read).

### Level 3: Act and Report

**Position:** Column 4 scene, x from 74.9% to 98.0%, y from 26.0% to 70.0%. Signal green (#3C8D5A) border.
**Visual:** The same camera angle and scale, at night. A crescent moon and a round clock with tick marks and no numerals hang in the upper corner. The small teal agent works alone at a bench where rows of small waveform thumbnails stack up on a shelf, as if a nightly parameter sweep is running. A long log scroll made of gray lines unrolls from the bench across the foreground and curls into a spiral, filling much of the lower part of the panel. A small round budget gauge with a red limit marker and a stop button sits on the bench. In the upper-left corner the maroon researcher sleeps in a small bed with a blanket, drawn faceless and softly stylized. The mood is quiet and trusting, with limits in plain view.

### Level 3 Gauges

**Position:** Column 4 gauge strip, x from 74.9% to 98.0%, y from 72.0% to 98.0%. Signal green (#3C8D5A) border.
**Visual:** Three identical half-circle gauges in a row. All three needles point to the green right end: easy to undo, stays local, and quick to check.

### Volt the Border Collie cameo (neutral pose)

Exactly one cameo, at about 6.5% of the image width, centered at about 92% from left and 13% from top, in the cream alcove at the right end of The Autonomy Dial panel. Volt is a black-and-white border collie with a black back, ears, and tail, a white blaze, chest, muzzle, and paws, large kind amber eyes, one ear semi-folded, a maroon (#7A0019) bandana with a small gold (#FFCC33) lightning-bolt emblem, and a small gold whistle on a cord around the neck. Volt sits upright in a neutral pose, facing the viewer with a calm, attentive look, tail resting. Volt must not touch the panel border and must not cover the three badges.

## Layout Notes

- The nine panels are the whole composition. Do not add a title bar, header, footer, legend, or side panel.
- No text anywhere. The dial uses icons, the gauges use arcs and needles, and the logs use blurred gray lines.
- All four scene panels use the same camera angle, scale, and cast. All four gauge panels are identical except for the needle positions.
- Keep a clean gutter of at least 0.8% between panels, with no shadows, glows, or arrows spilling into gutters.
- Keep line weight, rounding, and shading (light from the upper left) consistent across all panels.
- Color is always paired with an icon or shape: brick red with the hand and pause mark, amber with the barrier gate, teal with the fence, and green with the moon, clock, and log scroll.
- The key idea is that autonomy is earned task by task. Make the progression from a closed hand-off at the left to an open, logged, limited night shift at the right clear at a glance.

## Do Not Include

- Any text, letters, numbers, labels, captions, or numerals on the dial or gauges
- A title, heading, legend, banner, or axis labels
- Readable code, equations, or log lines
- Photorealistic faces, or humanoid robots with faces
- Brand names, logos, a watermark, or a signature

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/the-autonomy-dial/the-autonomy-dial.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
