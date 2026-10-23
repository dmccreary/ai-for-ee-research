# Vague Prompt, Engineered Context — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no arrows with writing, no signs, no logos, no watermark. Laptop screens, papers, checklists, tables, and charts show only unreadable abstract marks: horizontal bars of different lengths, blurred color blocks, and generic curves. Charts have axis lines but NO axis labels, NO tick numbers, and NO legend. Do not draw question marks, exclamation marks, braces, or any typographic character, because they read as text. Use symbols that carry no characters: check marks, boxes, targets, fences, doors, and loops. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages of width and height, not pixels.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical and computer engineering
- **Style:** High-quality polished illustration with soft lighting from the upper left, rich detail, and a consistent line weight. Semi-realistic is welcome: a real-looking wooden desk, a lit lamp, a modern laptop, a ceramic coffee cup. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. Any agent or model is drawn as a small friendly teal (#1F7A8C) neutral machine icon, never a humanoid robot with a face. No people other than Volt.
- **Palette:** maroon #7A0019 (human judgment), gold #FFCC33 (focal points), teal #1F7A8C (the model and agents), signal green #3C8D5A (passed and verified), brick red #C0392B (failure and risk), charcoal #2A2E3A (structure), off-white #FAF7F2 (background). Never rely on color alone: every meaning below is also carried by an icon or a pattern.

## What to Draw

One poster made of **nine clearly separated rounded panels**: a split screen with the same task, the same model, and the same input file on both sides. The left half is the vague prompt and its consequences, in three stacked panels. The right half is the engineered context, in a two-column grid of six panels.

Every panel is a rounded rectangle with a thin border in its accent color and a slightly lighter fill of that same hue. Panels are separated by a clean off-white gutter of at least 0.8% of the image, with a wider gutter of about 3% down the middle between the left and right halves. Nothing may cross a panel border: no shadow, glow, arrow, or object spills into a gutter. Keep a safe margin of about 2% on every side. Do not add a title bar, header, footer, legend, or side panel: the panels ARE the composition.

**Comparison rule:** the left half is the naive version and the right half is the controlled version. The two input panels (One-Line Prompt and Task and Inputs) share the same camera angle (straight-on, slightly above the desk), the same wooden desk line, the same open laptop of the same size (about 9% of the image width), the same ceramic coffee cup, the same brass desk lamp, and the same measurement-data file icon feeding in from the left. The two output panels (Vague Result and Checked Result) show the same laptop at the same size with results coming out of it. The laptop never gets bigger or smarter on the right. Only what is stacked above it changes.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| One-Line Prompt | 2.0% | 48.5% | 2.0% | 34.0% | Brick red #C0392B |
| Guessed Gaps | 2.0% | 48.5% | 35.0% | 66.0% | Dark gold #B8860B |
| Vague Result | 2.0% | 48.5% | 67.0% | 98.0% | Brick red #C0392B |
| Task and Inputs | 51.5% | 74.3% | 2.0% | 34.0% | Teal #1F7A8C |
| Constraints | 75.2% | 98.0% | 2.0% | 34.0% | Charcoal #2A2E3A |
| Acceptance Criteria | 51.5% | 74.3% | 35.0% | 66.0% | Maroon #7A0019 |
| Output Format | 75.2% | 98.0% | 35.0% | 66.0% | Dark gold #B8860B |
| Prompt Test Plate | 51.5% | 74.3% | 67.0% | 98.0% | Signal green #3C8D5A |
| Checked Result | 75.2% | 98.0% | 67.0% | 98.0% | Signal green #3C8D5A |

### One-Line Prompt

**Position:** Top-left panel, x 2.0% to 48.5%, y 2.0% to 34.0%. Border brick red (#C0392B).
**Visual:** A wooden desk with a lit brass lamp (about 38% to 41% across), a white ceramic coffee cup (about 34% to 37% across), and an open silver laptop (about 22% to 31% across and 12% to 25% down). A measurement-data file, drawn as a page with a small generic waveform and a corner fold (about 8% to 14% across, 12% to 20% down), slides toward the laptop on a thin dotted path. The laptop screen shows exactly one very short dark bar, the whole prompt. Above the laptop floats a small bare speech bubble holding a single short dark bar. Nothing else is stacked above the laptop.

### Guessed Gaps

**Position:** Left panel, second row, x 2.0% to 48.5%, y 35.0% to 66.0%. Border dark gold (#B8860B).
**Visual:** A small teal (#1F7A8C) chip-and-gear machine icon stands at the left end of a winding path, which splits at four successive crossroads. Each crossroads has a different symbol on its sign post, with no letters: a ruler (length), two simple head-and-shoulder silhouettes (audience), a stack of blocks of unequal height (priorities), and a hollow empty slot (what to do when a value is missing). At each crossroads the path branches into two or three trails, and the machine icon's dotted trail takes the widest, most worn trail every time. Small gold dice mark the guessed choices. The off-white ground is a faint grid.

### Vague Result

**Position:** Bottom-left panel, x 2.0% to 48.5%, y 67.0% to 98.0%. Border brick red (#C0392B).
**Visual:** The same laptop, same size, sits at the left (about 6% to 15% across, 82% to 94% down). A wobbly, sprawling gray answer cloud emerges to the right and fills the panel. Inside it: a vague gray chart with axis lines and a smeared, directionless blob instead of a curve; a sloppy paragraph drawn as ragged gray bars of uneven length with a few overlapping lines; and a speech bubble full of loose scribble loops and three dots. A cluster of thin dotted open arcs, plain curved lines with no characters, hovers above it to suggest doubt. The mood is muddy and hesitant, with a muted gray-brown palette and no green anywhere.

### Task and Inputs

**Position:** Top row, left column of the right half, x 51.5% to 74.3%, y 2.0% to 34.0%. Border teal (#1F7A8C).
**Visual:** The same desk line, the same laptop of the same size (about 60% to 69% across, 21% to 31% down), the same coffee cup on the left, the same brass lamp on the right, and the same measurement-data file icon feeding in from the left. Above the laptop, a tidy tower of four stacked tiles rises: from top to bottom, a maroon (#7A0019) badge with a star (the role), a gold (#FFCC33) target with an arrow (the task), a teal file page (the input), and a charcoal tile with a small open dictionary symbol (the definitions of terms). Each tile has a distinct icon and a thin outline, and they interlock like building bricks.

### Constraints

**Position:** Top row, right column of the right half, x 75.2% to 98.0%, y 2.0% to 34.0%. Border charcoal (#2A2E3A).
**Visual:** A low charcoal (#2A2E3A) picket fence surrounds a single document page and a small teal machine icon. Four fence posts carry four plain icons: a document stack (sources), a closed circle boundary (scope), a ruler (length and style), and a small open door with a green check beside the fence (the sanctioned exit for a value not stated). A gold gate latch is open at the door. The fence shape makes the fenced area unmistakable.

### Acceptance Criteria

**Position:** Middle row, left column of the right half, x 51.5% to 74.3%, y 35.0% to 66.0%. Border maroon (#7A0019).
**Visual:** A large cream clipboard (about 53% to 66% across and 37% to 64% down) holds a checklist of four rows. Each row has a square box with a bold green (#3C8D5A) check mark and a short thin gray bar beside it. The clipboard has a maroon top clip. A small cream alcove at the lower right of the panel (about 66.5% to 73.5% across, 48% to 64% down) holds Volt.

### Output Format

**Position:** Middle row, right column of the right half, x 75.2% to 98.0%, y 35.0% to 66.0%. Border dark gold (#B8860B).
**Visual:** A tidy gold-framed template: a table with a solid header bar and three rows of evenly spaced short bars in aligned columns, plus a short numbered-list silhouette made of dots and bars. Below it, a small green (#3C8D5A) sieve gate lets an aligned page pass through, while a wobbly crumpled page is held back by a brick-red (#C0392B) stop bar. The shapes are crisp and square, in contrast to the wobbly left half.

### Prompt Test Plate

**Position:** Bottom row, left column of the right half, x 51.5% to 74.3%, y 67.0% to 98.0%. Border signal green (#3C8D5A).
**Visual:** A charcoal test fixture tray with three slots. Three sample input pages sit above it: an ordinary page with plain bars, a hard page with a tangle of marks, and a page with a blank hollow slot where a value is missing. A small teal chip-and-gear machine icon in the middle carries each page through the same prompt gate. Under each page a green check mark appears in a small circle. A thin circular rerun arrow in gold loops from the right end back to the left end.

### Checked Result

**Position:** Bottom row, right column of the right half, x 75.2% to 98.0%, y 67.0% to 98.0%. Border signal green (#3C8D5A).
**Visual:** The same laptop, same size, at the lower left (about 77% to 86% across, 84% to 95% down), with a clean result fanning out: a crisp chart with two axis lines, a smooth curve, a few clear data dots, and a dashed threshold line (no numbers or labels), a short two-column result table with aligned bars, and a cream sticky note with three bullet dots and a small triangle caution symbol (a plain triangle with no characters) for the limits and assumptions. A green verified stamp, a circle with a bold check, sits at the top right.

### Volt the Border Collie cameo

Inside the cream alcove at the lower right of the Acceptance Criteria panel, around 66.5% to 73.5% across and 48% to 64% down, draw Volt the Border Collie at about 6.5% of the image width in a tip pose: a black-and-white border collie with a white blaze and chest, large kind eyes, a maroon bandana (#7A0019) with a gold lightning-bolt emblem, and a small gold whistle on a cord. Volt sits upright, one paw holding the edge of the clipboard and the other pointing up toward the top check mark, with a small sparkle near the pointing paw. Volt must not cover any check mark or the clipboard clip, and must not touch the panel border.

## Layout Notes

- **No text of any kind in the picture.** No letters, no numerals, no question marks, no braces, no axis labels. Screens, papers, and sticky notes use abstract bars only.
- The left half uses wobbly lines, uneven spacing, and muted gray-brown tones. The right half uses straight, evenly spaced, square shapes, with gold, teal, maroon, and green accents. The shapes alone should tell a student which side is controlled.
- The two input panels and the two output panels use the same desk line, laptop, cup, lamp, and file icon, and keep the laptop at about 9% of the image width in all four.
- Light comes from the upper left with soft shadows to the lower right. Keep line weight, corner rounding, and shading consistent across all panels.
- Keep a clean gutter of at least 0.8% between all panels and about 3% down the middle. Do not let arrows, shadows, or glows spill into the gutters.
- The core idea is that the model did not get smarter on the right: the context did. Make the stacked tiles, the fence, and the checklist the most striking shapes on the right.

## Do Not Include

- Any text, letters, numbers, question marks, braces, labels, or captions
- A title, heading, legend, banner, or axis labels
- Arrows with writing, signs, or readable screens
- Photorealistic people or faces other than Volt, and no humanoid robots
- Brand names, logos, a watermark, or a signature
- A second Volt

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/vague-prompt-engineered-context/vague-prompt-engineered-context.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
