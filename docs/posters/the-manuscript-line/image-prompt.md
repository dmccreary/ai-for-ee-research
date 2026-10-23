# The Manuscript Line: Where the Human Stays — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no signs, no logos, no watermark, and no readable code or equations. Manuscripts, papers, stamps, tags, screens, and boxes show only unreadable abstract marks: short gray lines, blocks, and small plain icons. Plots may show curves but no axis labels and no tick numbers. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages and not pixels.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical and computer engineering
- **Style:** High-quality polished illustration with soft lighting, rich detail, and a consistent line weight. Light comes from the upper left. Semi-realistic touches are welcome: a real-looking conveyor, brass rivets, paper stacks, a stamp pad. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. People are faceless or softly stylized, never photoreal faces. Agents are small friendly teal workers or neutral machine icons, never humanoid robots with faces.
- **Palette (always paired with an icon or pattern, never color alone):** maroon #7A0019 for the human researcher and accountability; gold #FFCC33 for the handrail and focal points; teal #1F7A8C for agents and automation; signal green #3C8D5A for verified or passed; brick red #C0392B for errors and risk; charcoal #2A2E3A for the conveyor and structure; off-white #FAF7F2 for the background.

## What to Draw

One poster that reads like a factory assembly line for a paper, in **six clearly separated panels** arranged as two rows of three. The line is read like text: left to right across the top row, then left to right across the bottom row. The paper grows from a bare outline in the first panel to a bound, printed manuscript in the last. Every panel is a rounded rectangle with a thin colored border (the accent color in the table below) and a slightly lighter off-white fill (#FFFDF8), separated from its neighbors by a clean off-white gutter of at least 1.5% of the image (2% between the rows). Nothing in a panel may cross its border, so the conveyor belt enters each panel at its left border and leaves at its right border without crossing it. Keep a 2% outer margin. Do not add a title bar, header, footer, legend, or side panel: the panels are the whole composition.

**Shared scene rules for every panel:** the same conveyor belt in charcoal (#2A2E3A) with brass rollers runs left to right at about 62% of the panel's height. A **gold (#FFCC33) handrail** runs along the top of every panel, at about 12% of the panel's height, on thin gold posts, to mark what stays human. A small friendly **teal (#1F7A8C) agent**, a rounded machine icon with two arms and no face, works the belt in every panel. The manuscript on the belt is a stack of pale pages with unreadable gray marks, and it is a little thicker and more finished in each panel than the one before. Small teal chevrons on the belt show the direction of travel, with no text.

**Human stamps:** at four stations (Outline From Claims, Drafting From Evidence, Co-Author Consistency, and Submit and Respond) a faceless person in a maroon (#7A0019) sweater stands behind the handrail and reaches down with a large rubber stamp onto the manuscript. The four stamp faces are plain icons: a flag (the claim), a magnifier over a curve (the interpretation), a fence or boundary line (the limits), and a pen signature squiggle with a check (the final read). At the two stations Figures and LaTeX and References Checked, no person reaches down. The handrail is still there, and its gold posts stand empty.

**Hazard tags:** three small brick red (#C0392B) tags ride on the belt, each a different typical agent error shown as a plain icon: a changed number (a cell with one mark crossed out and replaced by a longer mark), an invented reference (a book drawn as a faint dotted ghost outline), and an overconfident sentence (a megaphone blowing a big starburst). Each tag is stopped by a different station.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| Outline From Claims (top left) | 2.0% | 33.0% | 2.0% | 49.0% | Teal #1F7A8C |
| Drafting From Evidence (top middle) | 34.5% | 65.5% | 2.0% | 49.0% | Maroon #7A0019 |
| Figures and LaTeX (top right) | 67.0% | 98.0% | 2.0% | 49.0% | Amber gold #E0A800 |
| References Checked (bottom left) | 2.0% | 33.0% | 51.0% | 98.0% | Brick red #C0392B |
| Co-Author Consistency (bottom middle) | 34.5% | 65.5% | 51.0% | 98.0% | Slate blue #5B6C8F |
| Submit and Respond (bottom right) | 67.0% | 98.0% | 51.0% | 98.0% | Signal green #3C8D5A |

### Outline From Claims

**Position:** Top-left panel, x from 2.0% to 33.0%, y from 2.0% to 49.0%.
**Visual:** The belt starts here. On it lies a single bare sheet with a skeleton outline: a column of short horizontal bars of different lengths, each with a small gold dot to its left and a thin thread running to a small icon of a data file, a plot, or a book, to show that each claim is tied to its evidence. Two of the bars have no thread and carry a small dashed brick red circle, marking missing evidence. A teal agent stands at the belt holding the sheet steady. Behind the gold handrail a maroon person stamps the sheet with the flag-faced stamp, and a small gold flag-shaped stamp mark is already printed on the top corner. A stack of notes and a result plot sit in a tray beside the belt. The mood is orderly and beginning.

### Drafting From Evidence

**Position:** Top-middle panel, x from 34.5% to 65.5%, y from 2.0% to 49.0%.
**Visual:** The manuscript is now a thin stack of pages with filled-in paragraphs of unreadable gray lines. A teal agent writes on the page from a tray of claim cards that is clipped beside it. Where a paragraph has no evidence, a small bright gold marker flag is stuck in the margin. A brick red hazard tag with the changed-number icon sits on the belt at the left side of the panel, and a small teal scanner arch straddling the belt has a green light on it; the tag is held at the scanner. Behind the handrail a maroon person stamps a page with the magnifier-and-curve stamp. A small side-by-side pair of page thumbnails with one bar highlighted in red shows the before-and-after number check, with no digits. The mood is productive and watchful.

### Figures and LaTeX

**Position:** Top-right panel, x from 67.0% to 98.0%, y from 2.0% to 49.0%.
**Visual:** The manuscript pages now carry small plots with two curves and no axis labels. A teal agent feeds a small data file from a bin on the left into a machine (a neat boxy gray plotting machine) that prints plots onto a roll of clear film, and a second machine on the right typesets a page, with a small build-log scroll hanging out of it carrying one tiny amber warning triangle. There is no person reaching down at this station; the gold handrail stands over the belt with empty posts. A small curved arrow loops from the data file back to the plotting machine to show that figures are regenerated from data. The mood is mechanical and tidy.

### References Checked

**Position:** Bottom-left panel, x from 2.0% to 33.0%, y from 51.0% to 98.0%.
**Visual:** The manuscript carries a small reference sheet. On the belt rides a brick red tag with the ghost-book icon, an invented reference. At the left side of the panel a teal agent stands at a checking desk with a rubber verifier stamp and a shelf of real books on a wall behind it; the ghost book is dotted and see-through and does not match any real book. A small verified list sits in a tray, each entry marked by a signal green check circle, and one entry in a separate rejected tray is marked by a red cross. There is no person reaching down at this station; the gold handrail stands over the belt with empty posts. The mood is careful and methodical.

### Co-Author Consistency

**Position:** Bottom-middle panel, x from 34.5% to 65.5%, y from 51.0% to 98.0%.
**Visual:** The manuscript is a thick stack. Around a small round table beside the belt, three small faceless co-authors in different sweater colors (maroon, teal-gray, and cream) read the draft, each with a sticky note or pencil. A teal agent beside them holds up a long strip of paper listing small matching symbols, a consistency list, and does not touch the pages. A brick red tag with the megaphone-starburst icon (an overconfident sentence) rides toward the table and is caught by a hand-held magnifier. Behind the handrail a maroon person stamps a page with the fence-and-boundary stamp. The mood is collaborative and a little skeptical.

### Submit and Respond

**Position:** Bottom-right panel, x from 67.0% to 98.0%, y from 51.0% to 98.0%.
**Visual:** The finished manuscript, bound and printed with a plain cover, reaches the end of the belt. At the right of the belt, between about 81% and 90% of the image width, stands a wooden submission box with a slot, holding a folded cover letter made of unreadable marks, with a small disclosure note clipped to it, drawn as a small page with a tiny tool icon and a date icon. Beside the box, a short stack of reviewer-response pages sits on a tray. Behind the handrail a maroon person stamps the cover with the signature-and-check stamp. Volt stands at the end of the line to the right of the submission box (see the cameo section). The mood is accomplished and settled.

### Volt the Border Collie cameo

At the end of the line, to the right of the submission box in the Submit and Respond panel, centered around 94% from the left and 84% from the top of the whole image, draw Volt at about 6.5% of the image width. Volt is a black-and-white border collie with a white blaze down the face, a white chest and paws, and a black coat, large kind eyes, and pricked ears with folded tips. Volt wears a maroon (#7A0019) bandana with a gold (#FFCC33) lightning-bolt emblem and a small gold whistle on a cord around the neck. Volt is in a **celebration pose**: standing on the hind legs with both front paws raised, mouth open in a happy smile, with a few gold sparkles and a small confetti burst above. Volt stands on a cream alcove of floor and must not touch any panel border, must not cover the submission box or the stamp, and must not cross the gutter.

## Layout Notes

- The six panels are the whole composition. Do not add a title bar, header, footer, legend, or side panel.
- The gold handrail, the charcoal belt, and the teal agent appear in every panel at the same height and scale so the line reads as one continuous process. The manuscript grows panel by panel.
- The four maroon stamps are the heart of the picture. They sit behind the handrail so the eye reads them as the human line, above the work.
- No text of any kind. Pages, tags, stamps, and boxes show only plain icons and unreadable marks. Plots have no axis labels.
- Keep line weight, rounding, and shading (light from the upper left) consistent across all panels.
- Keep a clean off-white gutter between all panels. Do not let the belt, tags, stamps, shadows, or glows spill into the gutters.
- The core idea is that an agent can draft and format, while the claims, the interpretation, and the signature are the person's.

## Do Not Include

- Any text, letters, numbers, numerals, labels, or captions
- Readable code, readable equations, or legible screens
- A title, heading, legend, banner, or axis labels
- Photorealistic faces or humanoid robots with faces
- Brand names, logos, a watermark, or a signature
- Any second dog, any gendered description of Volt, or any extra mascot

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/the-manuscript-line/the-manuscript-line.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
