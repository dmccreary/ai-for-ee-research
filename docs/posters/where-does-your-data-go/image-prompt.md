# Where Does Your Data Go? — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no signs, no logos, no watermark, no readable code, no readable equations, and no legible screens. Laptops, documents, policy sheets, server racks, and dials show only unreadable abstract marks: blurred lines, color blocks, plain geometric symbols. Clock faces and meter dials have hands and plain tick marks but no numerals. Check boxes and traffic-light symbols are plain shapes. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages and not pixels.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical and computer engineering
- **Style:** High-quality polished illustration with soft lighting, rich detail, and a consistent line weight. Light comes from the upper left. Semi-realistic is welcome: a real-looking lab room, a laptop, a server rack, a data center. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. People are faceless or softly stylized, never photoreal faces.
- **Palette** (always paired with an icon or pattern, never color alone): maroon #7A0019 for the researcher and accountability; gold #FFCC33 for focal points; teal #1F7A8C for agents and automation; signal green #3C8D5A for allowed or verified; brick red #C0392B for risk; charcoal #2A2E3A for structure.

## What to Draw

One poster split into a **left half (a hosted model)** and a **right half (a model you run yourself)**, made of **eight clearly separated panels**. Every panel is a rounded rectangle with a thin colored border and a slightly lighter fill, separated from its neighbors by a clean off-white gutter of at least 0.8% of the image width. Nothing in a panel may cross its border. Keep a 2% outer margin. Do not add a title bar, header, footer, legend, or side panel: the panels are the whole composition.

- **Top row, left half (hosted):** two panels. A researcher's lab with a pipe of documents leaving through an open window, and beside it the far end of the pipe at a cloud data center.
- **Top row, right half (self-hosted):** two panels. The same lab with a dashed boundary around it and a server rack in the corner, and beside it a close-up of the upkeep that comes with the rack.
- **Bottom row:** a three-lane traffic-light sorter in three panels on the left, and one large policy sheet panel at the right.

**Comparison rule:** the left lab and the right lab use the same camera angle, the same scale, the same room, the same desk, the same laptop, the same window, and the same shelf. Only what happens to the documents differs. A wider gutter of about 3% runs down the middle of the top row between the two halves.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| Out Through the Window (top left, large) | 2.0% | 32.0% | 2.0% | 52.0% | Blue #2F6DB5 |
| The Cloud End (top, end of left half) | 33.5% | 48.5% | 2.0% | 52.0% | Purple #6C5B9E |
| Inside the Lab Boundary (top right, large) | 51.5% | 81.0% | 2.0% | 52.0% | Teal #1F7A8C |
| You Maintain It (top far right) | 82.5% | 98.0% | 2.0% | 52.0% | Amber #D98E04 |
| Green Lane (bottom, first lane) | 2.0% | 21.0% | 54.0% | 98.0% | Signal green #3C8D5A |
| Yellow Lane (bottom, second lane) | 22.5% | 41.5% | 54.0% | 98.0% | Yellow #E0A800 |
| Red Lane (bottom, third lane) | 43.0% | 62.0% | 54.0% | 98.0% | Crimson #A32035 |
| The Lab Policy Sheet (bottom right, wide) | 63.5% | 98.0% | 54.0% | 98.0% | Maroon #7A0019 |

### Out Through the Window

**Position:** Top-left panel, x from 2.0% to 32.0%, y from 2.0% to 52.0%.
**Visual:** A blue (#2F6DB5) border. A side view of a research lab room in warm light: a wooden desk at the lower left (about x 3% to 11%) with an open laptop, a shelf with notebooks on the back wall, and a window in the upper middle-right (about x 20% to 27%, y 8% to 28%) with its lower sash pushed up wide open. A thick transparent glass pipe runs from the laptop, rises along the back wall well above Volt's head, passes out through the open window, and bends to the right toward the panel edge, ending in an arrowhead about 1.5% inside the border. Inside the pipe, four small document icons travel in a line: a clean public paper with a tiny green dot, a draft manuscript with a tiny gold dot, a sheet of unpublished measurements with a tiny gold dot, and a collaborator's confidential spec with a tiny red dot. Each icon shows unreadable lines. Volt stands in the room between the desk and the open window (see the cameo below). Outside the window, a pale sky and the first hint of the pipe bending toward a distant cloud.

### The Cloud End

**Position:** Top panel, end of the left half, x from 33.5% to 48.5%, y from 2.0% to 52.0%.
**Visual:** A purple (#6C5B9E) border. A tall panel with a pale-sky gradient. A fat cloud shape sits at the top, and under it a long low data-center building with rows of lit rack windows. The glass pipe from the previous panel enters at the left edge, about 1.5% inside the border, and ends in a funnel at the building. Two icons stand in front of the building: a large clock face with only hands and plain tick marks to stand for how long inputs are kept, and a ledger scroll covered in unreadable lines to stand for a log. A small stack of documents feeds into a rounded teal model icon to stand for training. Everything is drawn from the same cool purple-gray palette.

### Inside the Lab Boundary

**Position:** Top panel, left end of the right half, x from 51.5% to 81.0%, y from 2.0% to 52.0%.
**Visual:** A teal (#1F7A8C) border. The same room, desk, laptop, shelf, and window as the Out Through the Window panel, same camera angle and scale, but the window is closed. A short teal cable runs from the laptop along the floor to a black server rack with small green indicator lights standing in the corner of the room. The four document icons (public paper, draft manuscript, unpublished measurements, confidential spec) sit on and around the desk and rack. A bold dashed charcoal rectangle encloses the laptop, desk, rack, and documents, with its dashes stopping before the panel border. A small shield icon with a check sits on the rack. Nothing runs through the window.

### You Maintain It

**Position:** Top panel, far right, x from 82.5% to 98.0%, y from 2.0% to 52.0%.
**Visual:** An amber (#D98E04) border. A tall close-up of the rack's surroundings: at the top, a large cooling fan with visible blades; in the middle, a round power meter with a needle and plain tick marks and no numerals; below it, a bundle of cables with a small padlock; at the bottom, a large steel wrench and a small toolbox. A small coiled cable tied with a cord and a tiny cloud-with-slash icon hint at keeping things local. The mood is practical and workmanlike, not alarming.

### Green Lane

**Position:** Bottom-left lane, x from 2.0% to 21.0%, y from 54.0% to 98.0%.
**Visual:** A signal-green (#3C8D5A) border. A vertical lane with a large round green light at the top containing a plain white check mark. Beneath it, a short conveyor lane carries a public paper icon, a small stack of open-source code pages, and a dataset icon, all open and unlocked, rolling out toward an open gate on the bottom edge. Soft green glow stays within the panel.

### Yellow Lane

**Position:** Bottom, second lane, x from 22.5% to 41.5%, y from 54.0% to 98.0%.
**Visual:** A yellow (#E0A800) border. A vertical lane with a large round yellow light at the top containing a plain raised-hand shape. Beneath it, the conveyor carries a lab notebook, a draft with no new results, a sheet of unpublished measurements, and a circuit netlist. At the bottom, the lane splits at a small fork into two gates: one with a small advisor-stamp icon and one with a small local-rack icon. The documents wait at the fork.

### Red Lane

**Position:** Bottom, third lane, x from 43.0% to 62.0%, y from 54.0% to 98.0%.
**Visual:** A crimson (#A32035) border. A vertical lane with a large round red light at the top containing a plain stop-bar shape. Beneath it, the conveyor carries a sealed vendor file with a padlock, a folder of participant transcripts with a padlock, and a technical drawing with a padlock. At the bottom, a closed gate with a bar and a small dashed rectangle that stands for the lab boundary. Nothing leaves.

### The Lab Policy Sheet

**Position:** Bottom-right wide panel, x from 63.5% to 98.0%, y from 54.0% to 98.0%.
**Visual:** A maroon (#7A0019) border. A large cream page, drawn slightly tilted, fills the center of the panel. It has eight numbered-looking rows, each with a plain checkbox at the left and a short gray bar at the right, drawn as unreadable lines with no digits. Three of the rows carry green checks. A tiny maroon pen rests against the page. At the bottom left, a small repository folder icon with a branch symbol shows that the page lives with the code. A gold ribbon at the top corner marks it as the take-home.

### Volt the Border Collie cameo

Inside the Out Through the Window panel, standing on the floor between the desk and the open window at about 16% from the left and 38% from the top, draw Volt at about 6.5% of the image width in a warning pose. Volt is a black-and-white border collie with a black back, ears, and tail and a white blaze, chest, muzzle, and paws; large kind amber eyes with one ear semi-folded; a maroon (#7A0019) bandana with a small gold lightning bolt; and a small gold whistle on a cord around the neck. Volt faces the open window with one front paw raised in a calm stop gesture and the whistle held between the teeth, ready to blow. Volt must not cover the laptop, the pipe, the document icons, or the panel border.

## Layout Notes

- The eight panels are the whole composition. Do not add a title bar, header, footer, legend, or side panel.
- Keep a clean off-white gutter of at least 0.8% between all panels, and a wider gutter (about 3%) down the middle of the top row between the hosted half and the self-hosted half. Do not let pipes, glows, or shadows spill into the gutters.
- Out Through the Window and Inside the Lab Boundary must be the same lab: same desk, laptop, shelf, window, and lighting, drawn from the same camera at the same scale. Only the pipe, the open window, the rack, and the dashed boundary differ.
- Pair every light color with a symbol: check, raised hand, or stop bar. Do not rely on color alone.
- Keep line weight, rounding, and lighting (from the upper left) consistent. No text of any kind anywhere in the image.

## Do Not Include

- Any text, letters, numbers, labels, or captions
- A title, heading, legend, or banner
- Readable code, readable equations, or legible screens and sheets
- Photorealistic faces, humanoid robots with faces, or glowing brains
- Brand names, logos, a watermark, or a signature

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/where-does-your-data-go/where-does-your-data-go.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
