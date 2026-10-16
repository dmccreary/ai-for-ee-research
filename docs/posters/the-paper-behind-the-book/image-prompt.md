# The Paper Behind the Book — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no callout lines, no signs, no logos, no watermark, no readable code, no readable equations, and no legible screens or pages. Workshops, documents, outlines, screens, terminals, calculators, and plots show only unreadable abstract marks: blurred lines, color blocks, plain geometric symbols, and generic curves with no axis labels or tick numbers. Check marks, flags, and arrows are plain symbols and are allowed. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages and not pixels.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical engineering and computer design
- **Style:** High-quality polished illustration with soft lighting, rich detail, and a consistent line weight. Light comes from the upper left. Semi-realistic is welcome: real-looking paper, folders, a laptop, a small terminal. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. People are faceless or softly stylized, never photoreal faces. Agents, if shown, are small friendly teal (#1F7A8C) workers or neutral machine icons, never humanoid robots with faces.
- **Palette** (always paired with an icon or pattern, never color alone): maroon #7A0019 for the human author and accountability; gold #FFCC33 for focal points; teal #1F7A8C for agents and automation; signal green #3C8D5A for verified or passed; brick red #C0392B for failure and risk; charcoal #2A2E3A for structure.

## What to Draw

A **single wide scene in three horizontal bands**, with no panel borders and no title.

- **Top band, about y 4% to 30%:** the skill pipeline. Six small workshops stand in a row, each drawn as a little building with a pitched roof and a door. A thick dashed teal arrow runs from each workshop to the next, and a small page icon with a folded corner rides each arrow to show that a file is handed on. Each workshop has a tiny green check badge on its door.
- **Middle band, about y 34% to 66%:** a long, gently curving road across the full width, in warm gray with a pale center line. It runs from a pile of source documents on the far left to a submission box on the far right, with milestones along it.
- **Bottom band, about y 70% to 97%:** four small failure-case scenes in rounded cream cards, each a self-contained vignette, separated by gutters of at least 2% of the image width.

Keep a 2% outer margin. Leave clear space around every marker position so that a numbered dot can sit on its feature. Nothing in one scene may cross into a neighboring scene.

### Marker map (each point is an interactive callout)

| # | Subject | x (from left) | y (from top) |
|---|---|---|---|
| 1 | Course Description | 9% | 17% |
| 2 | Learning Graph | 25% | 17% |
| 3 | Chapter Structure | 41% | 17% |
| 4 | Chapter Content | 57% | 17% |
| 5 | MicroSims | 73% | 17% |
| 6 | Supporting Pages | 89% | 17% |
| 7 | Source Material and Structure | 8% | 52% |
| 8 | Wrong Number Caught | 14% | 84% |
| 9 | Claim Table | 30% | 48% |
| 10 | Stray Markup Caught | 38% | 84% |
| 11 | Short Chapters Accepted | 62% | 84% |
| 12 | Unbuilt Sims Marked | 86% | 84% |

### Course Description

**Position:** First workshop, centered at 9% from left, 17% from top, spanning about x 3% to 15%.
**Visual:** A brown (#8E5A3C) roofed workshop. In its window, a clipboard with a column of short lines and a small round gauge with a needle and plain ticks, no numerals. A green check badge hangs on its door.

### Learning Graph

**Position:** Second workshop, centered at 25% from left, 17% from top, spanning about x 19% to 31%.
**Visual:** A blue (#2F6DB5) roofed workshop. Its window shows about nine dots joined by thin arrows in a layered graph, flowing left to right with no loops. A green check badge hangs on its door.

### Chapter Structure

**Position:** Third workshop, centered at 41% from left, 17% from top, spanning about x 35% to 47%.
**Visual:** A violet (#7A5AA6) roofed workshop. Its window shows four stacked rectangular outline blocks of different heights, like a table of contents drawn as blocks, with a tiny ladder-like dependency line beside them. A green check badge hangs on its door.

### Chapter Content

**Position:** Fourth workshop, centered at 57% from left, 17% from top, spanning about x 51% to 63%.
**Visual:** A brick-red (#C0392B) roofed workshop. In its window, a tall page of gray text bars with a small window-shaped inset to the right, holding a tiny slider and curve to stand for a simulation specification. A green check badge hangs on its door.

### MicroSims

**Position:** Fifth workshop, centered at 73% from left, 17% from top, spanning about x 67% to 79%.
**Visual:** A teal (#1F7A8C) roofed workshop. On its front screen, a small horizontal slider and a smooth curve with no axis numbers. Four tiny status dots sit above the door: red, orange, teal, and green, the last one held slightly apart. A green check badge hangs on its door.

### Supporting Pages

**Position:** Sixth workshop, centered at 89% from left, 17% from top, spanning about x 83% to 95%.
**Visual:** A green (#3C8D5A) roofed workshop. On its counter, a small fan of four cards in different tints, drawn as a glossary card, a question card, a quiz card, and a book card, with unreadable marks. A green check badge hangs on its door.

### Source Material and Structure

**Position:** Left end of the road, centered at 8% from left, 52% from top, a pile occupying about x 3% to 13% and y 43% to 60%. A half-built page outline stands just to its right at about x 14% to 25%.
**Visual:** A tall, untidy pile of cream papers, folders, and bound reports in warm browns, tied with a cord at the top, resting on the start of the road. Just to the right, an upright page outline in charcoal: four solid filled blocks at the top and bottom of the outline for the early sections, and about seven dashed empty placeholders between them.

### Claim Table

**Position:** Centered at 30% from left, 48% from top, a small card about x 26% to 34% and y 41% to 53%, standing above a small signpost on the road.
**Visual:** A small cream card in a gold (#D9A400) frame with three narrow columns, each topped with a different tag icon: a ruler for measured, a bookmark for cited, and a dashed forward arrow for expected. Beside the columns, one short solid bar stands for a number. No digits and no letters.

### Wrong Number Caught

**Position:** First failure card, centered at 14% from left, 84% from top, spanning about x 3% to 25% and y 71% to 97%.
**Visual:** A cream card with a thin brick-red (#C0392B) border. A pencil and a small hand calculator with unmarked keys lie on a sheet. On the sheet, a short red bar is crossed out and a longer green bar is drawn beside it as the corrected value. A small wrong red spark rests beside the crossed-out bar.

### Stray Markup Caught

**Position:** Second failure card, centered at 38% from left, 84% from top, spanning about x 27% to 49% and y 71% to 97%.
**Visual:** A cream card with a thin violet (#7A5AA6) border. A document page with a few tiny red angled-bracket shapes stuck on its edge. A small handheld tally counter scans the page with a thin teal beam, and two little counters sit beside it, one with a different count than the other, until a green check is shown on the matching pair.

### Short Chapters Accepted

**Position:** Third failure card, centered at 62% from left, 84% from top, spanning about x 51% to 73% and y 71% to 97%.
**Visual:** A cream card with a thin teal (#1F7A8C) border. A tall bookshelf outline drawn in dashed lines to show the original target, with a short stack of solid pages and a small worked-example icon placed in it. A small green check sits beside the short stack. A crumpled heap of extra pages is crossed out with a red bar to show that padding was refused.

### Unbuilt Sims Marked

**Position:** Fourth failure card, centered at 86% from left, 84% from top, spanning about x 75% to 97% and y 71% to 97%.
**Visual:** A cream card with a thin blue (#2F6DB5) border. A row of four small browser-window outlines: three drawn with dashed outlines and a small red flag beside them, and one drawn solid with an orange badge. One more solid window at the end carries a green badge held by a faceless maroon (#7A0019) hand to show that only the human author approves.

### Road milestones (no markers)

Along the road, between the markers, draw the rest of the path with plain, unmarked art: at about x 42% to 54%, a page whose gray bars are filling in as colored blocks; at about x 56% to 68%, a small terminal box with a gear and a page of PDF-like gray bars emerging from it; at about x 70% to 80%, three framed plot thumbnails with a small stamp icon to stand for a figure policy; and at about x 88% to 97%, a sealed package with a ribbon and an arrow dropping into an open submission slot. The road is at about y 51% to 61%.

### Volt the Border Collie cameo

At the finish of the road, on a small cream grass patch above the road centered at about 83.5% from the left and 41% from the top, draw Volt at about 6.5% of the image width in a celebration pose. Volt is a black-and-white border collie with a black back, ears, and tail and a white blaze, chest, muzzle, and paws; large kind amber eyes with one ear semi-folded; a maroon (#7A0019) bandana with a small gold lightning bolt; and a small gold whistle on a cord around the neck. Volt rears up on the hind legs with both front paws raised and a joyful open mouth, the whistle swinging, with a few small gold confetti pieces. Volt must not cover the plot thumbnails, the submission box, the road, or any marker position.

## Layout Notes

- The three bands are the whole composition. Do not add a title bar, header, footer, legend, or side panel.
- The top markers (1 to 6) sit on the workshops at about 17% from the top. The lower markers sit on the road scenes and the failure cards. Keep at least 4.5% of space between any two marker positions.
- The color coding must be clear: green for checks and passed, red for failures, teal for automation, gold for the claim table.
- Keep line weight, shading direction (light from the upper left), and corner rounding consistent in all three bands.
- The core idea is that the pipeline is the documentation: every stage leaves a file and every file has a check. Make the file arrows and green check badges clear.
- No text of any kind anywhere in the image.

## Do Not Include

- Any text, letters, numbers, labels, or captions
- A title, heading, legend, or banner
- Readable code, readable equations, axis labels, or tick numbers
- Signs or screens with legible words
- Photorealistic faces, humanoid robots with faces, or glowing brains
- Brand names, logos, a watermark, or a signature

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/the-paper-behind-the-book/the-paper-behind-the-book.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag each marker onto its feature, and copy the updated `x` and `y` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
