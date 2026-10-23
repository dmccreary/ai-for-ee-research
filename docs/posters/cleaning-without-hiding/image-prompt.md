# Cleaning Without Hiding — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no punctuation marks used as symbols, no logos, no watermark, no readable code, no readable equations, and no legible screens. Plots may show points and curves, but they have NO axis labels and NO tick numbers; axes are plain lines. Notebooks, the cleaning log, file icons, trays, and the instrument display show only unreadable abstract marks: blurred gray lines, color blocks, plain dots, and generic waveforms. Count bubbles contain small clusters of dots, never digits. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical and computer engineering
- **Style:** High-quality, polished illustration with soft lighting from the upper left, rich detail, and a consistent line weight. Semi-realistic is welcome: a real-looking oscilloscope bench, a probe station, a laptop, a lab notebook, a glass pipe, a matte black enclosure. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. People are faceless or softly stylized. Agents are small friendly teal (#1F7A8C) workers or neutral machine icons, never humanoid robots with faces.
- **Palette:** maroon #7A0019 (the human researcher and accountability), gold #FFCC33 (focal points and flags), teal #1F7A8C (agents and automation), signal green #3C8D5A (verified, logged), brick red #C0392B (discarded data, risk), charcoal #2A2E3A (structure), off-white #FAF7F2 (background). Never use color alone: pair each with an icon or pattern.

## What to Draw

One poster with a **wide shared strip across the top** and a **left half and right half** below it, made of **seven clearly separated panels**. One raw capture feeds two cleaning paths. The left half is the risky, silent path. The right half is the controlled, logged path. **Use the same camera angle, the same scale, the same objects, and the same background on both halves**, so that a student compares the two at a glance: the same small copy of the raw scatter enters both paths, the plot at the end is the same size and shape on both sides, and the same file icon appears on both sides.

Every panel is a rounded rectangle with a thin colored border and a slightly lighter off-white fill, separated by a clean gutter of at least 0.8% of the image, and about 3% between the left and right halves and between the rows. Nothing may cross a panel border. Keep a 2% outer margin. Do not add a title bar, header, footer, legend, or side panel: the panels are the composition.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| The Raw Capture | 2.0% | 98.0% | 2.0% | 24.0% | Charcoal #2A2E3A |
| Silent Cleanup | 2.0% | 48.5% | 27.0% | 63.5% | Brick red #C0392B |
| The Unearned Polish | 2.0% | 32.5% | 66.5% | 98.0% | Burnt orange #A04000 |
| Original Overwritten | 34.0% | 48.5% | 66.5% | 98.0% | Dark red #7B241C |
| Logged Cleanup | 51.5% | 98.0% | 27.0% | 63.5% | Teal #1F7A8C |
| A Plot With Its Ghosts | 51.5% | 82.0% | 66.5% | 98.0% | Signal green #3C8D5A |
| Raw File, Locked | 83.5% | 98.0% | 66.5% | 98.0% | Maroon #7A0019 |

### The Raw Capture

**Position:** Wide top strip, x from 2.0% to 98.0%, y from 2.0% to 24.0%.
**Visual:** Three scenes in one strip. On the left, a bench with an oscilloscope showing an unreadable waveform, a small probe station with a probe resting on a board, and an ADC test board with a ribbon cable. In the center, a large scatter plot of noisy points rising along a gentle trend, with plain axis lines and no labels or ticks. Two clear outliers sit far from the cloud (one very far, one moderately far), and a hatched vertical block of empty hollow circles marks missing values. On the right, an open lab notebook with a pencil, one gold sticky note, and a small file card of short colored key-and-value bars standing for the JSON sidecar. Two chevron arrows at the bottom edge of the strip, inside the border, point down: a brick-red one near the left quarter and a signal-green one near the right quarter, to show that this same capture goes down both paths.

### Silent Cleanup

**Position:** Left middle panel, x from 2.0% to 48.5%, y from 27.0% to 63.5%.
**Visual:** Reading left to right. At the left, a small copy of the same noisy scatter from the strip above, with the same outliers and the same missing-value block. A thick gray arrow leads into a matte black box with a sealed lid, no windows, and a faint gray mist around it. From the box's right side, a neat thin line of tidy dots exits toward the next panel below. Under the box, a floor drain with a metal grate: brick-red (#C0392B) discarded dots, including both outliers, fall into it in a swirl. A small teal worker figure stands by the box with a finger to its lips, to say it keeps quiet. In the lower right of this panel is a cream alcove for Volt, near the drain.

### The Unearned Polish

**Position:** Lower-left panel, x from 2.0% to 32.5%, y from 66.5% to 98.0%.
**Visual:** A framed plot of the cleaned data: a smooth, handsome cloud of dots hugging a clean fitted curve, with plain axis lines and no labels or ticks. A gold (#FFCC33) award rosette with two ribbon tails is pinned to the upper-right corner of the frame, with a hairline brick-red crack running through the rosette, to say nobody earned it. There are no faint marks, no ghosts, and no count bubble anywhere. This plot is the same size, shape, and position as the plot in A Plot With Its Ghosts.

### Original Overwritten

**Position:** Lower-left panel, narrow, x from 34.0% to 48.5%, y from 66.5% to 98.0%.
**Visual:** A single large file icon, the same file icon that appears in Raw File, Locked, drawn with its dots fading. A brick-red pencil hovers over it, and a looping arrow curves out of the file and back into the same file, which says it was saved over itself. Beside it, an empty shelf slot with a dashed outline where a backup would sit, with nothing in it, and a small crossed-out copy icon. The file has no lock and no sidecar card next to it.

### Logged Cleanup

**Position:** Right middle panel, x from 51.5% to 98.0%, y from 27.0% to 63.5%.
**Visual:** Reading left to right, with the same camera and scale as Silent Cleanup. At the left, the same small copy of the raw scatter, with the same outliers and missing block. A thick gray arrow leads into a clear glass pipe that runs across the panel and has three visible stations. Station one is a sieve that removes the hollow missing-value circles into a first tray marked by a hatched-block icon. Station two is a notebook icon, matching the notebook above; it removes the single outlier that has a documented cause into a second tray with a notebook icon, while the other, moderately far outlier passes through untouched and wears a gold ring flag. Station three is a small ruler and scale icon that converts one group of dots from a smaller to a larger size. Each tray holds the removed dots in brick red, and each has a small count bubble containing a cluster of dots. A cleaning-log scroll hangs beside the pipe with three rows, each with the same icon as its station and a short bar. At the right, a neat output line of dots, including the gold-flagged outlier, leaves toward the panel below. A small teal worker figure watches the pipe with a clipboard.

### A Plot With Its Ghosts

**Position:** Lower-right panel, x from 51.5% to 82.0%, y from 66.5% to 98.0%.
**Visual:** The same plot as in The Unearned Polish: the same size, the same frame, a similar smooth cloud and fitted curve. The differences are the honest additions. The removed points remain visible as small, pale gray ghost dots drawn as dashed circles at their original positions, including the far outlier. The kept outlier wears its gold ring flag. A small round count bubble holds a cluster of dots. There is no award ribbon.

### Raw File, Locked

**Position:** Lower-right panel, narrow, x from 83.5% to 98.0%, y from 66.5% to 98.0%.
**Visual:** A sturdy steel lockbox with a padlock in front holds the same large file icon as in Original Overwritten, intact, with its dots full and bright. The file's sidecar card, a small card of short key-and-value bars, is tucked beside it. A small shield with an eye icon on the box lid stands for read-only. A teal arrow leaves the box toward the top of the panel and points to the left, to show everything downstream is generated from it. The box sits on a shelf with a faint outline of a second, empty folder labeled only by a gear icon for processed output.

### Volt the Border Collie cameo (warning pose)

Inside the cream alcove in the lower right of the Silent Cleanup panel, near the drain, centered at about 39.0% from left and 54.5% from top, draw Volt at about 6.5% of the image width: a black-and-white border collie with a black back, ears, and tail, a white blaze, muzzle, chest, and paws, bright amber large kind eyes, and one ear semi-folded. Volt wears a maroon (#7A0019) bandana with a small gold (#FFCC33) lightning-bolt emblem and a small gold whistle on a cord. The pose is a friendly warning: both front paws raised in a gentle "stop, be careful" gesture, with a concerned but caring expression, facing the drain. Beside Volt, draw a plain empty amber caution triangle with no symbol inside. Volt must not touch the panel border and must not cover the drain or the black box.

## Layout Notes

- The seven panels are the whole composition. Do not add a title bar, header, footer, legend, or side panel. Keep a clean gutter of at least 0.8% between all panels, about 3% between the halves and between the rows.
- The left and right halves must match: same small raw scatter, same plot size, same file icon, same background. The only change is whether the cleaning is hidden or visible.
- Make the glass pipe with its trays the most striking element of the right half, and the closed black box with its drain the most striking element of the left half.
- Discarded data is always brick red, kept data is dark charcoal, and flagged data wears a gold ring, so a student can follow a point across the panels.
- Light from the upper left, consistent line weight, soft shadows. Do not let drips, glows, or shadows spill into the gutters.
- No text, letters, numerals, or punctuation marks anywhere. Use icons only.

## Do Not Include

- Any text, letters, numbers, labels, captions, or question or exclamation marks
- A title, heading, legend, banner, axis labels, or tick numbers
- Readable code, readable equations, or legible screens
- Photorealistic faces or humanoid robots with faces
- Glowing brains, chrome robot hands, or stock-photo clichés
- Brand names, logos, a watermark, or a signature
- More than one Volt

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/cleaning-without-hiding/cleaning-without-hiding.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
