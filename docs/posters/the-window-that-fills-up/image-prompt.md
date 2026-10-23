# The Window That Fills Up — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no callout lines, no arrows with writing, no signs, no logos, no watermark. The three tubes carry no numbers and no tick labels. The ruler has plain tick marks and no digits. The two small gauges have plain unmarked dials. Screens, papers, and chat bubbles show only unreadable abstract marks: short blurred lines, color blocks, and generic squiggles. Token counts, the 32,000-token window, and every other figure from the concept appear ONLY in the interactive data file. All names, descriptions, and the title are added later by an interactive HTML overlay. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages of width and height, not pixels.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical and computer engineering
- **Style:** High-quality polished illustration with soft lighting from the upper left, rich detail, and a consistent line weight. Semi-realistic glass and brushed-metal surfaces are welcome. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. Agents and models are drawn as neutral machine icons, never as humanoid robots with faces.
- **Palette:** maroon #7A0019 (the researcher's documents), gold #FFCC33 (focal points), teal #1F7A8C (conversation and model), signal green #3C8D5A (free room, healthy), brick red #C0392B (loss and failure), charcoal #2A2E3A (structure and standing instructions), off-white #FAF7F2 (background). Never rely on color alone: every state below is also marked by an icon or a pattern.

## What to Draw

One wide poster that reads as **three horizontal glass tubes stacked one above another**, each filled from left to right with colored blocks. Each tube is a long window onto a context window: the blocks are the pieces of a prompt, and the empty stretch at the right end of the tube is the room left for the model's answer. The model sits at the right end of every tube, fed by it. The three tubes are the same length, the same height, the same glass, and the same camera angle, so the eye compares them directly. The story reads top to bottom: comfortable, then crowded, then silent loss.

Each tube is a rounded rectangle of pale translucent blue-gray glass (#DCE6EA) with a charcoal (#2A2E3A) outline, a soft white highlight along its upper edge, and slim metal end caps. The tubes are about 16% of the image height tall. The block colors are the same in all three tubes:

- standing instruction block: charcoal (#2A2E3A), very thin, with a small shield mark
- conversation history block: teal (#1F7A8C), medium width, with tiny stacked speech-bubble marks
- paper block: maroon (#7A0019), wide, with short page-like lines and one small equation squiggle
- question block: gold (#FFCC33), very thin
- free room for the answer: a dashed pale-green (#3C8D5A) outline with nothing inside

Widths are roughly to scale for a 32,000-token window, but the two thin blocks are drawn a little wider than scale so they stay visible. Keep a safe margin of about 2% on every side. Do not add a title bar, header, footer, or legend.

### Marker map (each point is an interactive callout)

| # | Callout | x (from left) | y (from top) | Accent color |
|---|---|---|---|---|
| 1 | System Prompt | 10% | 20% | Charcoal #2A2E3A |
| 2 | Conversation History | 15% | 20% | Teal #1F7A8C |
| 3 | The Paper Block | 30% | 20% | Maroon #7A0019 |
| 4 | Budget Ruler | 45% | 33% | Gold #FFCC33 |
| 5 | Room for the Answer | 58% | 20% | Signal green #3C8D5A |
| 6 | Token Meter | 88% | 35% | Dark gold #B8860B |
| 7 | Silent Overflow | 6% | 80% | Brick red #C0392B |
| 8 | Middle Gets Overlooked | 41% | 50% | Burnt orange #E67E22 |
| 9 | The Second Paste | 52% | 50% | Maroon #7A0019 |
| 10 | Cut-Off Answer | 69% | 50% | Brick red #C0392B |
| 11 | Model Working Unaware | 88% | 80% | Teal #1F7A8C |

### System Prompt

**Position:** Left end of the top tube, centered at 10% from left and 20% from top. The block fills the first 2% of the tube width.
**Visual:** A very thin charcoal (#2A2E3A) block with a tiny white shield mark, the first block inside the top tube. Its edges are crisp and solid.

### Conversation History

**Position:** Top tube, immediately right of the system block, centered at 15% from left and 20% from top, about 8% wide.
**Visual:** A medium teal (#1F7A8C) block marked with three tiny stacked speech-bubble outlines in lighter teal. Solid, fully opaque.

### The Paper Block

**Position:** Top tube, centered at 30% from left and 20% from top, about 22% wide.
**Visual:** A wide maroon (#7A0019) block showing short pale page lines, a small unreadable figure rectangle, and one squiggly equation mark. A thin gold edge sits on its upper left. Beside it a very thin gold question block closes the contents.

### Budget Ruler

**Position:** A long flat measuring stick laid just below the top tube, from 10% to 73% across, centered vertically at 33% from top, so it spans the whole interior length of the tube.
**Visual:** A gold (#FFCC33) wooden-and-metal ruler with evenly spaced plain tick marks and no digits. Its left end is held by Volt. A thin bracket-like pair of end stops shows that it measures the whole tube.

### Room for the Answer

**Position:** The empty right part of the top tube, centered at 58% from left and 20% from top, running from about 43% to 73% across.
**Visual:** A dashed pale-green (#3C8D5A) outline of empty room inside the glass, with a faint green sheen and a small clean tick mark in a green circle on the tube's end cap. No blocks inside.

### Token Meter

**Position:** Right side, in the gap between the top and middle tubes, centered at 88% from left and 35% from top, occupying about 80% to 96% across and 29% to 41% down.
**Visual:** Two small matching sheets of paper side by side, each with a round gauge above it. The left sheet shows plain flowing lines of prose and its gauge needle sits low. The right sheet shows dense equation squiggles, small code-like brackets, and tiny part-number blocks, and its gauge needle sits high. Both gauges are plain dials with unmarked ticks. The dials are gold (#B8860B) and charcoal.

### Silent Overflow

**Position:** Left end of the bottom tube, centered at 6% from left and 80% from top, spanning 2.5% to 8.5% across and 72% to 95% down.
**Visual:** Two ghosted, semi-transparent blocks, one thin charcoal block with a shield mark and one teal block with speech-bubble marks, drawn as faint dashed outlines. They have slid off the left end of the bottom tube and tilt as they fall toward a round metal drain grate at the lower left (about 3% to 9% across and 90% to 95% down). A few faint motion lines show them sliding. A small brick-red (#C0392B) circle with a diagonal bar sits on the end cap. Nothing is shown breaking: the loss is quiet.

### Middle Gets Overlooked

**Position:** Across the two maroon blocks in the middle tube, centered at 41% from left and 50% from top, where the blocks meet. The glow spans about 19% to 63% across.
**Visual:** A soft heat-map glow laid over the two maroon paper blocks as one continuous gradient. It is bright amber (#E67E22) near the start of the first block and near the end of the second block, and fades to a dim muted maroon at the junction in the center. No numbers, no scale bar. It reads as a schematic, not data.

### The Second Paste

**Position:** The second maroon block in the middle tube, centered at 52% from left and 50% from top, about 22% wide, running from about 41% to 63% across.
**Visual:** An identical twin of the first maroon paper block, with the same page lines, equation squiggle, and gold edge. A tiny gold paste-arrow icon floats just above it, pointing down onto the block. Next to it the thin gold question block closes the contents.

### Cut-Off Answer

**Position:** Open right end of the middle tube, centered at 69% from left and 50% from top, spanning about 64% to 73% across.
**Visual:** A pale-green (#3C8D5A) speech bubble that begins right after the question block and reaches the end of the tube, where its right edge is torn into a jagged line. A small half-sentence of unreadable gray marks trails off into the tear. A small gold gauge dial on the end cap is half full. The room left is clearly smaller than in the top tube.

### Model Working Unaware

**Position:** Right end of the bottom tube, centered at 88% from left and 80% from top, spanning 82% to 94% across and 72% to 88% down.
**Visual:** A neutral teal (#1F7A8C) rounded machine icon, a chip-and-gear shape, with a steady green lamp lit and a small gear turning. It looks calm and busy. The model icons at the right ends of the top and middle tubes are drawn identically, so only the tube contents differ.

### Bottom tube contents

**Position:** Inside the bottom tube, from 9% to 73% across and 72% to 88% down.
**Visual:** The tube is completely full: three medium teal history blocks, two wide maroon paper blocks, and a thin gold question block, with no dashed free room at all. The two oldest blocks, which belong at the left end, are NOT inside the tube. They appear only as the ghosted blocks described under Silent Overflow.

### Volt the Border Collie cameo

At about 2.5% to 9% across and 29% to 42% down, in the cream space to the left of the ruler between the top and middle tubes, draw Volt the Border Collie at about 6.5% of the image width in a tip pose: a black-and-white border collie with a white blaze and chest, large kind eyes, a maroon bandana (#7A0019) with a gold lightning-bolt emblem, and a small gold whistle on a cord. Volt sits upright and holds the left end of the gold ruler with one paw while the other paw points along it, with a small sparkle near the pointing paw. Volt must not cover the thin blocks, the badges, or the ruler's ticks, and must not touch the tube.

## Layout Notes

- **No text of any kind in the picture.** No digits on the ruler, no numbers on the gauges, no letters on the blocks or papers. Marks on screens, papers, and bubbles are unreadable abstract squiggles only.
- The three tubes share one length, one height, one camera angle, and one block palette. Only their contents differ. Space between tubes is about 14% of the image height for the top-to-middle gap and the middle-to-bottom gap, so markers and the Token Meter have clean cream room.
- Light comes from the upper left, with soft shadows to the lower right. Keep line weight and corner rounding consistent across all tubes.
- A small row badge sits at the left of each tube, always paired with an icon: a green circle with a tick for the top tube, a half-filled gold dial for the middle tube, and a brick-red circle with a diagonal bar for the bottom tube. These badges must be drawn as plain symbols and never as letters.
- Keep each marker position clear of line work so a numbered dot can sit on it.
- The scene stays an abstract diagram of a budget, with no people other than Volt.

## Do Not Include

- Any text, letters, numbers, labels, captions, or readable code or equations
- A title, heading, legend, banner, or unit scale
- Arrows with writing, signs, or readable screens
- Humanoid robots, faces on machines, or photorealistic people
- Brand names, product logos, a watermark, or a signature
- Any second Volt, or Volt crossing a tube

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/the-window-that-fills-up/the-window-that-fills-up.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag each marker onto its feature, and copy the updated `x` and `y` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
