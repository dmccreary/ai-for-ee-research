# Code That Runs, Code That Is Right — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no signs, no logos, no watermark, and no readable code or equations. Screens, terminals, editor windows, notebooks, and papers show only unreadable abstract marks: soft blurred lines, color blocks, and generic waveforms. Meter dials and plots may show needles, curves, and tick marks, but the ticks carry no digits and no axis labels. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages and not pixels.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical engineering and computer design
- **Style:** High-quality polished illustration with soft lighting, rich detail, and a consistent line weight. Light comes from the upper left. Semi-realistic is welcome: a real-looking lab bench, a laptop, an analog meter, a notebook, a handheld calculator. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. People are faceless or softly stylized, never photoreal faces.
- **Palette (always paired with an icon or pattern, never color alone):** maroon #7A0019 for the human researcher and accountability; gold #FFCC33 for focal points and highlights; teal #1F7A8C for the agent and automation; signal green #3C8D5A for verified or passed; brick red #C0392B for failure and risk; charcoal #2A2E3A for structure; off-white #FAF7F2 for the background.

## What to Draw

One poster split into a **left half and a right half** that tell one story with one script and one input signal. The **left half is the risky, naive version**: the code ran and the number was trusted. The **right half is the controlled version**: the same script, but its answer was checked against something computed independently. **Use the same camera angle, the same scale, the same objects, and the same background on both sides** so students compare at a glance. The same editor window with unreadable marks, the same desk, and the same ADC-style waveform (a smooth sine-like trace with a stair-stepped, quantized look, no axis numbers) appear on both sides.

The poster is made of **seven clearly separated panels**. Every panel is a rounded rectangle with a thin colored border (the accent color in the table below) and a slightly lighter off-white fill (#FFFDF8), separated from its neighbors by a clean off-white gutter of at least 0.8% of the image. A wider gutter, about 3%, runs down the middle between the two halves. Nothing in a panel may cross its border. Keep a 2% outer margin. Do not add a title bar, header, footer, legend, or side panel: the panels are the whole composition.

- **Left half, three panels stacked in one column:** the script finishes, a plausible number is displayed, and a hidden crack runs under it.
- **Right half, two wide panels on top and two small panels beneath:** a hand calculation, a balance whose two pans disagree, a planted bug in a small test inset, and a new test case added.

Use teal (#1F7A8C) for everything the agent did, maroon (#7A0019) for everything the person did, and brick red (#C0392B) for the failure and the tag. Keep Volt clear of every panel border and every important detail.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| Run Finished, No Error (left, top) | 2.0% | 48.5% | 2.0% | 32.5% | Teal #1F7A8C |
| A Plausible Number (left, middle) | 2.0% | 48.5% | 34.5% | 65.5% | Amber gold #E0A800 |
| The Silent Error (left, bottom) | 2.0% | 48.5% | 67.5% | 98.0% | Brick red #C0392B |
| Hand Calculation (right, top) | 51.5% | 98.0% | 2.0% | 32.5% | Maroon #7A0019 |
| The Numbers Disagree (right, middle) | 51.5% | 98.0% | 34.5% | 65.5% | Charcoal #2A2E3A |
| Seeded Bug (right, bottom left) | 51.5% | 74.0% | 67.5% | 98.0% | Slate blue #5B6C8F |
| Test Case Added (right, bottom right) | 75.5% | 98.0% | 67.5% | 98.0% | Signal green #3C8D5A |

### Run Finished, No Error

**Position:** Top-left panel, x from 2.0% to 48.5%, y from 2.0% to 32.5%.
**Visual:** A tidy desk seen from slightly above and to the front. On the left, a smooth ADC-style waveform ribbon (a sine-like trace with a stair-stepped look, in charcoal #2A2E3A, no axis numbers) flows in from the panel's left edge toward a laptop. On the laptop screen sits a code editor window made of unreadable abstract marks: short horizontal lines in muted teal, grey, and cream, with indentation but no letters. Beside the laptop is a small terminal window whose frame glows a soft signal green (#3C8D5A) to say "completed", with a neat cluster of unreadable abstract marks and a small round green dot icon. A small teal (#1F7A8C) agent figure, a friendly round machine icon with two simple arms and no face, stands on the desk edge holding up a thumbs-up-shaped gear icon. The mood is calm and finished. The same laptop, desk, editor window, and waveform ribbon appear on the right half, drawn at the same size and angle.

### A Plausible Number

**Position:** Middle-left panel, x from 2.0% to 48.5%, y from 34.5% to 65.5%.
**Visual:** One large analog panel meter, centered, on a short wooden plinth. The dial is warm cream with a bold gold (#FFCC33) arc, many unlabeled tick marks, and a thin charcoal needle sitting confidently in the upper-right region of the arc, far past a faint dashed marker that shows where a physical maximum would be (the dashed marker is a plain tick with a small ruler icon, no numerals). A soft gold highlight glows around the needle tip. A strip of unreadable abstract marks beneath the dial suggests a printed digital readout with many digits (blurred blocks, not numerals). The meter looks authoritative and handsome. Everything about it is polished. A teal gear-and-checkmark badge sits in the lower-left corner of the panel. The same dial style appears again, smaller, on the right half.

### The Silent Error

**Position:** Bottom-left panel, x from 2.0% to 48.5%, y from 67.5% to 98.0%.
**Visual:** A close-up of the base of the same plinth from the panel above. A thin hairline crack in brick red (#C0392B) runs diagonally through the plinth, with a few small crumbs of plaster. A round magnifying glass in a charcoal frame is held over the crack by a faceless gloved hand drawn as a simple sleeve and mitten, and inside the lens two small rulers are stacked: one with ten evenly spaced ticks and one with twenty, the longer one overshooting the shorter one (ticks only, no numerals). Next to the crack, two matching sheets of unreadable paper, one labeled by a tiny code-brackets icon and one by a tiny test-tube icon, are stamped with the same small brick red smudge, to show that the code and its test share the same misreading. A tiny cobweb in one corner suggests nothing has looked here for a while. The mood is quiet and a little unsettling, but not alarming.

### Hand Calculation

**Position:** Top-right panel, x from 51.5% to 98.0%, y from 2.0% to 32.5%.
**Visual:** The same desk, laptop, editor window with unreadable marks, and ADC-style waveform ribbon as the top-left panel, now with a researcher seated at the bench beside it. The researcher is a faceless, softly stylized figure in a maroon (#7A0019) sweater, shown from three-quarters behind, writing in an open lab notebook whose page shows unreadable pencil marks and a small sketch of a sine wave. A handheld calculator with blank unreadable keys and a small pencil lie on the bench. A thin gold (#FFCC33) line connects the notebook to a small icon of a ruler, to say "computed independently of the script". In the right side of the panel, leave a clear cream rounded alcove, about 10% of the image width and 16% of the image height, for Volt (see the cameo section). The mood is calm and careful.

### The Numbers Disagree

**Position:** Middle-right panel, x from 51.5% to 98.0%, y from 34.5% to 65.5%.
**Visual:** A classic brass comparison balance, centered, with two pans on a beam over a charcoal base. On the left pan sits a miniature of the same analog meter from the left half, the needle pushed far to the right. On the right pan sits a small stack of paper with a pencil, the hand-calculated value. The beam is clearly tilted, the left pan low and the right pan high, so the two clearly do not match, and a small brick red (#C0392B) lightning-crack icon sits on the pivot. A brick red tag on a string hangs from the left pan, shaped like a flag with a plain warning-triangle icon (no text). At the far right of the panel, a faceless person in maroon leans in with a small magnifier to look at both pans. The same desk surface, angle, and background as the other panels. The mood is serious and focused.

### Seeded Bug

**Position:** Lower-right area, left tile, x from 51.5% to 74.0%, y from 67.5% to 98.0%.
**Visual:** A small inset window with a rounded charcoal frame showing a short test file made of unreadable abstract marks (short colored lines, no letters). In the file, one line is highlighted by a thin slate-blue (#5B6C8F) rounded bracket, with a tiny cartoon beetle icon in brick red (#C0392B) sitting on it, to show a bug planted on purpose. Below the file, a row of three round test lamps: the first two glow signal green with a check icon, and the third glows brick red with a cross icon, showing that a test fails when the planted bug is present. A small teal arrow loops from the beetle to the red lamp. The mood is playful but precise. Keep this tile uncluttered.

### Test Case Added

**Position:** Lower-right area, right tile, x from 75.5% to 98.0%, y from 67.5% to 98.0%.
**Visual:** The same laptop and editor window seen from the same angle as the other panels, now wearing a brick red (#C0392B) tag tied to its corner. Beside it, a new small sheet of paper labeled only by a tiny test-tube icon is being clipped onto a stack of existing test sheets with a signal green (#3C8D5A) binder clip. On the new sheet an unreadable pencil sketch shows a small sine wave and a short horizontal band marking an expected range (no numerals). A gold (#FFCC33) sparkle marks the new sheet. A small seed icon (a plain round seed with a tiny sprout) sits at the corner to suggest a fixed random seed. The mood is constructive and settled.

### Volt the Border Collie cameo

Inside the cream alcove on the right side of the Hand Calculation panel, centered around 92% from the left and 19% from the top of the whole image, draw Volt at about 6.5% of the image width. Volt is a black-and-white border collie with a white blaze down the face, a white chest and paws, and a black coat, large kind eyes, and pricked ears with the tips folded over. Volt wears a maroon (#7A0019) bandana with a gold (#FFCC33) lightning-bolt emblem and a small gold whistle on a cord around the neck. Volt is in a **tip pose**: sitting upright, one paw raised in a small pointing gesture, the other paw resting on a small handheld calculator with blank keys, with a small gold sparkle near the raised paw. Volt must not touch any panel border, must not cover the notebook or the researcher, and must not cross the gutter.

## Layout Notes

- The seven panels are the whole composition. Do not add a title bar, header, footer, legend, or side panel.
- Left half = naive and trusting. Right half = controlled and checked. The same desk, laptop, editor window, waveform ribbon, and meter style appear on both sides at the same scale and angle so the two stories compare at a glance.
- No text of any kind. Screens, terminals, notebooks, and papers show only unreadable abstract marks. Ticks on dials and plots have no digits.
- Keep line weight, rounding, and shading (light from the upper left) consistent across all panels.
- Keep a clean off-white gutter of at least 0.8% between all panels, and a wider gutter (about 3%) down the middle. Do not let arrows, shadows, glows, cracks, or tags spill into the gutters.
- The core idea is that no error message does not mean no error. The brick red crack on the left and the tilted balance on the right should be the most striking details.

## Do Not Include

- Any text, letters, numbers, numerals, labels, or captions
- Readable code, readable equations, or legible screens
- A title, heading, legend, banner, or axis labels
- Photorealistic faces or humanoid robots with faces
- Brand names, logos, a watermark, or a signature
- Any second dog, any gendered description of Volt, or any extra mascot

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/code-that-runs-code-that-is-right/code-that-runs-code-that-is-right.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
