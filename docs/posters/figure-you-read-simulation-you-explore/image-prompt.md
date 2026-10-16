# A Figure You Read, a Simulation You Explore — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no signs, no logos, no watermark, and no readable code or equations. Journal pages show only unreadable abstract gray lines and blocks. Plots may show curves, but they have no axis labels and no tick numbers. Screens, readouts, browser frames, and specification cards show only plain icons, bars, and unreadable marks. Sliders have no numbers beside them. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages and not pixels.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical engineering and computer design
- **Style:** High-quality polished illustration with soft lighting, rich detail, and a consistent line weight. Light comes from the upper left. Semi-realistic touches are welcome: a real-looking journal page on a wooden desk, a wide monitor, a laptop. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. People are faceless or softly stylized, never photoreal faces. Agents are small friendly teal workers or neutral machine icons, never humanoid robots with faces.
- **Palette (always paired with an icon or pattern, never color alone):** maroon #7A0019 for the human reader and researcher; gold #FFCC33 for the shared-source thread and focal points; teal #1F7A8C for agents and automation; signal green #3C8D5A for verified or approved; brick red #C0392B for failure and risk; charcoal #2A2E3A for structure; off-white #FAF7F2 for the background.

## What to Draw

One poster built on a single result shown two ways. It is made of **seven clearly separated panels**. Every panel is a rounded rectangle with a thin colored border (the accent color in the table below) and a slightly lighter off-white fill (#FFFDF8), separated from its neighbors by a clean off-white gutter of at least 0.8% of the image. A wider gutter, about 3%, runs down the middle between the left and right halves of the upper two rows. Nothing in a panel may cross its border. Keep a 2% outer margin. Do not add a title bar, header, footer, legend, or side panel: the panels are the whole composition.

**Comparison rule:** the left half is the printed page and the right half is the screen. The two top panels show the **same plot**: two smooth curves, one maroon (#7A0019) and one teal (#1F7A8C), with a pale gray plot frame and no axis labels, drawn at the same size, the same angle, and on the same desk surface, so students compare them at a glance. The two middle panels use the same desk, the same lamp position, and a seated reader in a maroon sweater in the same pose and scale on both sides.

**Gold thread rule:** the shared source is shown by a motif and not by a line that crosses the poster. Inside each of the top four panels, a short gold (#FFCC33) thread with a small diamond knot at its end ends at the bottom center of the panel, never touching the border. The bottom-left panel holds the data file and script where those threads originate. The thread never crosses a gutter.

- **Top row:** a journal page on the left and a wide screen on the right, both showing the same plot.
- **Middle row:** a reader tracing a curve with a finger on the left, and a hand pulling a slider on the right.
- **Bottom row:** a data file and script, an agent building from a specification card, and an embedded simulation in two places.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| A Figure on a Page (top left) | 2.0% | 48.5% | 2.0% | 42.0% | Charcoal #2A2E3A |
| A MicroSim With Sliders (top right) | 51.5% | 98.0% | 2.0% | 42.0% | Teal #1F7A8C |
| The Reader's Question (middle left) | 2.0% | 48.5% | 44.0% | 74.0% | Maroon #7A0019 |
| Moving the Parameter (middle right) | 51.5% | 98.0% | 44.0% | 74.0% | Amber gold #E0A800 |
| One Source, Two Outputs (bottom left) | 2.0% | 33.0% | 76.0% | 98.0% | Gold #FFCC33 |
| Specification to MicroSim (bottom middle) | 34.5% | 65.5% | 76.0% | 98.0% | Slate blue #5B6C8F |
| Embedded Anywhere (bottom right) | 67.0% | 98.0% | 76.0% | 98.0% | Signal green #3C8D5A |

### A Figure on a Page

**Position:** Top-left panel, x from 2.0% to 48.5%, y from 2.0% to 42.0%.
**Visual:** A single journal page lying flat on a pale wooden desk, seen from slightly above and in front. The page has two columns of unreadable gray text lines, with a clean rectangular plot in the middle of the upper column. The plot shows two smooth curves, one maroon (#7A0019) and one teal (#1F7A8C), in a pale gray frame with faint gridlines and no axis labels and no tick numbers. Under the plot, three short lines of unreadable caption marks. A small hand-drawn margin note in pencil, a few unreadable squiggles and a small circle around one point on the maroon curve, sits at the page's edge. A pencil lies across the lower corner of the page. At the bottom center of the panel, a short gold thread ends in a small diamond knot, a short distance above the panel border. The mood is quiet and fixed: one case, printed.

### The Reader's Question

**Position:** Middle-left panel, x from 2.0% to 48.5%, y from 44.0% to 74.0%.
**Visual:** A faceless reader in a maroon (#7A0019) sweater, shown from three-quarters behind, sits at the same desk with the same page in front of them, tracing the maroon curve on the page with one finger. Above the reader's head, a soft cloud-shaped thought bubble holds three faint dashed copies of the curve at different heights and shapes, with a small gold lightbulb icon glowing at its top, to say "what if the parameter were different". The desk lamp is at the upper left. A coffee cup and a closed laptop sit on the desk. The mood is curious and a little stuck.

### A MicroSim With Sliders

**Position:** Top-right panel, x from 51.5% to 98.0%, y from 2.0% to 42.0%.
**Visual:** A wide monitor on a stand, seen from the same angle as the page on the left, standing on the same pale wooden desk surface. The screen shows the same plot: the same two curves in maroon and teal, in a pale gray frame with no axis labels. Beneath the plot, on the screen, are two real slider controls drawn as horizontal tracks with round gold (#FFCC33) knobs, one near the left and one near the middle, and a small round button. Next to the plot a slim bar graph readout shows one long gray bar and one shorter blue bar, with no digits. A teal glow outlines the screen. At the bottom center of the panel, a short gold thread ends in a small diamond knot, a short distance above the panel border. The mood is bright and interactive.

### Moving the Parameter

**Position:** Middle-right panel, x from 51.5% to 98.0%, y from 44.0% to 74.0%.
**Visual:** The same reader in a maroon sweater, in the same pose and scale as in the panel on the left, seated at the same desk with the same lamp, now with a hand pulling a round gold slider knob along its track on the screen's lower edge. Behind the hand the two curves are drawn in motion: ghosted copies of the maroon curve fan out at a few earlier positions, showing the change. A second slider sits beside the first. A small readout panel, a rounded box with a short bar and a tiny needle (no digits), shows a value shifting, with two small curved arrows beside it. In the right side of the panel, leave a clear cream rounded alcove, about 10% of the image width and 16% of the image height, for Volt (see the cameo section). The mood is lively and exploratory.

### One Source, Two Outputs

**Position:** Bottom-left panel, x from 2.0% to 33.0%, y from 76.0% to 98.0%.
**Visual:** In the center of the panel, a data file drawn as a small stack of spreadsheet sheets with unreadable gray rows, and next to it a script drawn as a scroll with a small gear. A gold (#FFCC33) thread leaves the top of each and joins into one thicker gold thread with a diamond knot at the top of the panel, to show one shared source. Two tiny thumbnails sit at the ends of the thread: a miniature printed page with a plot on the left, and a miniature screen with a plot and two sliders on the right, both with the same maroon and teal curves. A tiny signal green (#3C8D5A) check circle floats near the knot. The mood is tidy and traceable.

### Specification to MicroSim

**Position:** Bottom-middle panel, x from 34.5% to 65.5%, y from 76.0% to 98.0%.
**Visual:** A small workbench on which a friendly teal (#1F7A8C) agent, a rounded machine icon with two arms and no face, stands behind a large specification card. The card is a tall white rectangle with a short list of plain icons in rows: a target (objective), a tick-box (evidence), a table grid (content), a ruler (rules), a hand (activity), and a speech bubble with only a dot (feedback). The agent feeds the card into a compact gray machine whose output slot produces a small screen with two sliders and a plot. At the right, a faceless hand in a maroon (#7A0019) sleeve holds a magnifier over the new screen while a round green stamp, held in the other hand and not yet pressed, hovers above it. The mood is purposeful and careful.

### Embedded Anywhere

**Position:** Bottom-right panel, x from 67.0% to 98.0%, y from 76.0% to 98.0%.
**Visual:** Two small browser-frame windows side by side, each with a rounded top bar with three plain dots and no address text. The left window is a lab website, made of a header bar, two photo blocks, and a text column of unreadable gray lines, with the same small simulation (a plot with two curves and two sliders) embedded in its center. The right window is a paper's supplementary page, shown as a white page with a small journal-article icon at its top and the same small simulation embedded at its center. A thin signal green (#3C8D5A) frame line outlines the embedded simulation in both. A tiny slide-deck icon and a tiny course-page icon sit at the lower edge. The mood is reuse without change.

### Volt the Border Collie cameo

Inside the cream alcove on the right side of the Moving the Parameter panel, beside the sliders, centered around 93% from the left and 59% from the top of the whole image, draw Volt at about 6.5% of the image width. Volt is a black-and-white border collie with a white blaze down the face, a white chest and paws, and a black coat, large kind eyes, and pricked ears with folded tips. Volt wears a maroon (#7A0019) bandana with a gold (#FFCC33) lightning-bolt emblem and a small gold whistle on a cord around the neck. Volt is in a **welcome pose**: sitting upright, one front paw raised in a friendly wave, mouth open in a warm smile, looking toward the viewer, with a tiny gold sparkle beside the raised paw. Volt must not touch any panel border, must not cover the sliders or the readout, and must not cross the gutter.

## Layout Notes

- The seven panels are the whole composition. Do not add a title bar, header, footer, legend, or side panel.
- The page and the screen at the top share the same plot, desk, angle, and scale. The reader in the middle row has the same pose and scale on both sides. The only difference is that the right side can be moved.
- No text of any kind. Pages, screens, cards, and browser frames show only plain icons and unreadable marks. Plots and sliders carry no numbers.
- Keep line weight, rounding, and shading (light from the upper left) consistent across all panels.
- Keep a clean off-white gutter of at least 0.8% between all panels. Do not let threads, shadows, or glows spill into the gutters.
- The core idea is that a reader can look at one case in a figure or ask "what if" in a simulation. The gold sliders on the right and the fixed page on the left should be the first things the eye compares.

## Do Not Include

- Any text, letters, numbers, numerals, labels, or captions
- Readable code, readable equations, or legible screens
- A title, heading, legend, banner, or axis labels
- Photorealistic faces or humanoid robots with faces
- Brand names, logos, a watermark, or a signature
- Any second dog, any gendered description of Volt, or any extra mascot

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/figure-you-read-simulation-you-explore/figure-you-read-simulation-you-explore.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
