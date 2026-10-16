# The Literature Funnel — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no punctuation marks used as symbols, no logos, no watermark, no readable code, no readable equations, and no legible screens. Papers, BibTeX cards, notebooks, table cells, and cabinets show only unreadable abstract marks: short blurred gray lines, color blocks, tiny empty tick boxes, and generic waveform curves with no axis labels or tick numbers. Logic between search terms is drawn as icons: a small fork for "any of these" and two overlapping circles for "all of these." All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical engineering and computer design
- **Style:** High-quality, polished illustration with soft lighting from the upper left, rich detail, and a consistent line weight. Semi-realistic is welcome: real-looking stacked papers, a card-catalog cabinet, a lab notebook, a magnifying glass. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. People are faceless or softly stylized. Agents are small friendly teal (#1F7A8C) workers or neutral machine icons, never humanoid robots with faces.
- **Palette:** maroon #7A0019 (the human researcher and accountability), gold #FFCC33 (focal points), teal #1F7A8C (agents and automation), signal green #3C8D5A (verified, passed), brick red #C0392B (leaks, risk), charcoal #2A2E3A (structure), off-white #FAF7F2 (background). Never use color alone: pair each with an icon or pattern.

## What to Draw

One poster that reads **left to right as a funnel**: a wide pipeline that narrows into a clean synthesis. It is made of **eight clearly separated panels**. Six tall panels stand in one row across the top, one per stage: search strategy, paper triage, claim extraction, citation chaining, citation verification, and evidence synthesis. Each panel is slightly shorter than the one on its left, trimmed equally from top and bottom, so the row's silhouette narrows like a funnel. Under the row sit two wide panels: where the funnel leaks, and a table of claims tied to sources.

Every panel is a rounded rectangle with a thin colored border and a slightly lighter off-white fill, separated by a clean gutter of at least 0.8% of the image. Nothing may cross a panel border. Keep a 2% outer margin. Do not add a title bar, header, footer, legend, or side panel: the panels are the composition.

Inside the six stage panels, a translucent teal (#1F7A8C) pipeline band runs left to right at the vertical middle of each panel. It is widest in the first panel and narrows panel by panel to a thin clean ribbon in the last. It stops about 1.5% short of each panel edge with a small chevron arrow, and never crosses a border. Tiny paper icons ride the band: dozens in the first panel, fewer in each next one, and a few neat sheets in the last.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| Search Strategy | 2.0% | 17.0% | 2.0% | 68.0% | Blue #2A6F97 |
| Paper Triage | 18.2% | 33.2% | 4.0% | 66.0% | Teal #1F7A8C |
| Claim Extraction | 34.4% | 49.4% | 6.0% | 64.0% | Violet #6C4AB6 |
| Citation Chaining | 50.6% | 65.6% | 8.0% | 62.0% | Deep gold #C99700 |
| Citation Verification | 66.8% | 81.8% | 10.0% | 60.0% | Signal green #3C8D5A |
| Evidence Synthesis | 83.0% | 98.0% | 12.0% | 58.0% | Maroon #7A0019 |
| Where the Funnel Leaks | 2.0% | 49.4% | 71.0% | 98.0% | Brick red #C0392B |
| Claims Tied to Sources | 50.6% | 98.0% | 71.0% | 98.0% | Charcoal #2A2E3A |

### Search Strategy

**Position:** Far-left tall panel, x from 2.0% to 17.0%, y from 2.0% to 68.0%.
**Visual:** At the top, a small map with four database icons pinned on it, drawn as colored cylinders and shelves of different sizes: a publisher platform, a citation index, an open index, and a preprint server (a cylinder with an open-door icon). Dashed lines run from the pins down to the pipeline band. In the middle, the band is at its widest, packed with tiny paper icons pouring in. At the bottom, a query builder: a row of colored puzzle-block terms inside two rounded brackets, with a small fork icon between blocks of one bracket and an overlapping-circles icon between the brackets. Beside it, a lab notebook with a row of date tick marks and short bars, to say every query is logged. A small teal worker figure writes in the notebook.

### Paper Triage

**Position:** Second tall panel, x from 18.2% to 33.2%, y from 4.0% to 66.0%.
**Visual:** On a table at the top, a pile of paper cards on the band. A teal worker figure sorts them into three bins at the bottom: a green bin with a magnifier icon (read closely), a gold bin with a page-flip icon (skim), and a gray bin with an archive-box icon (set aside). The bins hold fewer and fewer cards from left to right. A rubric card stands at the side with five icon rows, each with an empty tick box: a target (relevance), a chip versus a curve (measured or simulated), a small node icon (technology), a calendar (year), and a building (venue). A maroon sleeve hand rests on the green bin, as the human checking the borderline cards.

### Claim Extraction

**Position:** Middle-left tall panel, x from 34.4% to 49.4%, y from 6.0% to 64.0%.
**Visual:** One open paper at the top with several lines highlighted in violet. From it, four small claim cards are lifted out into a neat vertical stack. Each card has a colored value tab, a short unit bar, a tiny pin icon for its location, and either a chip icon or a waveform-curve icon for measured or simulated. A thin violet thread runs from each card back to its highlighted line in the paper. The card stack sits beside the narrower band.

### Citation Chaining

**Position:** Center-right tall panel, x from 50.6% to 65.6%, y from 8.0% to 62.0%.
**Visual:** A small web of about nine paper icons. A gold seed paper sits at the center. Three older papers on the left, drawn paler, are joined by arrows pointing left, which means backward. Three newer papers on the right, drawn brighter, are joined by arrows pointing right, which means forward. One older paper at the far left receives two arrows and wears a small gold star, since it is cited by two of the seed's references. A plain horizontal arrow under the web shows time moving to the right, with no ticks or numerals.

### Citation Verification

**Position:** Right-center tall panel, x from 66.8% to 81.8%, y from 10.0% to 60.0%.
**Visual:** At the top, a card with square-bracket marks stands for a BibTeX entry, with an arrow down to a card-catalog registry cabinet whose drawer is open. A returned record card comes out of the drawer, and two stamps beside it: a signal-green check for a match and a brick-red cross for a mismatch. Below, a clipboard checklist with three ticked boxes. Under that, a maroon sleeve hand holds a magnifier over a paper with one highlighted line, to say the human confirms that the paper supports the sentence. In the lower part of this panel is a cream rounded alcove for Volt.

### Evidence Synthesis

**Position:** Far-right tall panel, x from 83.0% to 98.0%, y from 12.0% to 58.0%.
**Visual:** A woven comparison table: a grid of four rows by four columns, with the column headings drawn as icons for conditions (a chip, a lightning bolt for supply, a node, a clock for rate). Cells are filled with colored dots. Two cells are empty with dashed gold outlines, which stand for gaps. Thin maroon threads run from each row down to a small stack of source papers behind the table. Below, a single clean sheet of paper with neat short lines, tied to the table by a thread, and a maroon pen resting on it.

### Where the Funnel Leaks

**Position:** Bottom-left wide panel, x from 2.0% to 49.4%, y from 71.0% to 98.0%.
**Visual:** Three small vignettes side by side, each a short piece of the same teal pipe with a brick-red (#C0392B) drip falling into a signal-green basin. In the first, the drip is a paper icon falling past a database cylinder, and the basin holds two cylinders and a notebook, to say a second database and a logged query catch it. In the second, the drip is a claim card with a wobbly red value tab, and the basin holds a pin icon and a magnifier over a paper. In the third, the drip is a ghostly BibTeX card with a dashed outline, and the basin holds the registry cabinet with a green check. The three basins are identical in shape, so the pairing reads by icon.

### Claims Tied to Sources

**Position:** Bottom-right wide panel, x from 50.6% to 98.0%, y from 71.0% to 98.0%.
**Visual:** A grid of five rows and three columns drawn as a clean ledger. The left column holds a short value bar and a unit icon for each claim. The middle column holds a page icon with a pin for the source and its location. The right column holds the kind of evidence as an icon: a chip for measured, a waveform curve for simulated. One right-hand cell is empty with a dashed gold outline. Thin lines tie each row across. The ledger has a charcoal frame and a teal header strip with three small icons, with no text.

### Volt the Border Collie cameo (tip pose)

Inside the cream alcove in the lower part of the Citation Verification panel, centered at about 74.3% from left and 51.0% from top, draw Volt at about 6.5% of the image width: a black-and-white border collie with a black back, ears, and tail, a white blaze, muzzle, chest, and paws, bright amber large kind eyes, and one ear semi-folded. Volt wears a maroon (#7A0019) bandana with a small gold (#FFCC33) lightning-bolt emblem and a small gold whistle on a cord. The pose is a tip: one front paw pointing upward toward the clipboard checklist, with a small gold sparkle near the paw. Volt must not touch the panel border and must not cover the stamps, the cabinet, or the checklist.

## Layout Notes

- The eight panels are the whole composition. Do not add a title bar, header, footer, legend, or side panel. Keep a clean gutter of at least 0.8% between panels.
- The top row narrows evenly from left to right: each panel is 2% shorter at the top and 2% shorter at the bottom than the one before. The off-white space above and below the shorter panels stays empty, with only the faint grid.
- The pipeline band is the thread of the story: widest at the left, thinnest at the right, always teal, never crossing a panel border.
- Light from the upper left, consistent line weight, soft shadows. Do not let glows, shadows, or drips spill into the gutters.
- No text, letters, numerals, or punctuation marks anywhere. Use icons only.

## Do Not Include

- Any text, letters, numbers, labels, captions, or question or exclamation marks
- A title, heading, legend, banner, or axis labels
- Readable code, readable equations, or legible screens
- Photorealistic faces or humanoid robots with faces
- Glowing brains, chrome robot hands, or stock-photo clichés
- Brand names, logos, a watermark, or a signature
- More than one Volt

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/the-literature-funnel/the-literature-funnel.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
