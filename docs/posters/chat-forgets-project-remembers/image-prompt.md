# The Chat That Forgets, the Project That Remembers — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no arrows with writing, no signs, no logos, no watermark. The calendar tiles are blank: no day numbers, no month names, no weekday letters. File tabs, drawers, notes, and screens carry only plain icons and abstract bars, never characters. Do not draw hash signs, at signs, braces, or any typographic mark that reads as text. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages of width and height, not pixels.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical and computer engineering
- **Style:** High-quality polished illustration with soft lighting from the upper left, rich detail, and a consistent line weight. Semi-realistic is welcome: a real-looking steel filing cabinet, paper with texture, a spiral lab notebook. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. Any agent or model is drawn as a small friendly teal (#1F7A8C) neutral machine icon, never a humanoid robot with a face. No people other than Volt.
- **Palette:** maroon #7A0019 (human judgment and the instruction file), gold #FFCC33 (focal points, commits, and the first document), teal #1F7A8C (the model and agents), signal green #3C8D5A (kept and verified), brick red #C0392B (loss and failure), charcoal #2A2E3A (structure), off-white #FAF7F2 (background). Never rely on color alone: loss is also shown by smoke puffs and crossing strokes, and success by solid nodes, tabs, and check marks.

## What to Draw

One poster made of **eight clearly separated rounded panels**: a split screen with a calendar strip across the whole top that shows time passing across both halves. The left half is the chat that forgets. The right half is the project that remembers.

1. **Top, one full-width calendar strip,** about 96% wide and 8.5% tall.
2. **Left half, three stacked panels,** each about 46.5% wide: three chats, the same mistake again, and a bare timeline.
3. **Right half, a grid of four panels:** one wide panel on the top row, two narrower panels side by side in the middle row, and one wide panel on the bottom row.

Every panel is a rounded rectangle with a thin border in its accent color and a slightly lighter fill of that same hue. Panels are separated by a clean off-white gutter of at least 0.8% of the image, with a wider gutter of about 3% down the middle between the left and right halves. Nothing may cross a panel border: no shadow, glow, arrow, smoke, or object spills into a gutter. Keep a safe margin of about 2% on every side. Do not add a title bar, header, footer, legend, or side panel: the panels ARE the composition.

**Comparison rule:** the left half is the risky version and the right half is the controlled version. The two top panels both show three sessions, built from the same bubble shapes, the same bubble colors, and the same question bubble in each. On the left every session ends in a puff of smoke. On the right every session begins by reaching up to the same document and ends in a solid green dot. The right-hand sessions are drawn smaller to make room for the document. The two bottom panels share the same horizontal timeline at the same scale and height: bare on the left, filled with commits on the right.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| Days Go By | 2.0% | 98.0% | 2.0% | 10.5% | Dark gold #B8860B |
| Three Chats, Three Resets | 2.0% | 48.5% | 11.5% | 44.5% | Brick red #C0392B |
| The Same Mistake Again | 2.0% | 48.5% | 45.5% | 75.5% | Brick red #C0392B |
| Nothing to Roll Back To | 2.0% | 48.5% | 76.5% | 98.0% | Brick red #C0392B |
| The Instruction File | 51.5% | 98.0% | 11.5% | 44.5% | Maroon #7A0019 |
| Project Layout | 51.5% | 74.5% | 45.5% | 75.5% | Teal #1F7A8C |
| Plain Text Files | 75.5% | 98.0% | 45.5% | 75.5% | Charcoal #2A2E3A |
| Commit History | 51.5% | 98.0% | 76.5% | 98.0% | Signal green #3C8D5A |

### Days Go By

**Position:** Top strip across the full width, x 2.0% to 98.0%, y 2.0% to 10.5%. Border dark gold (#B8860B).
**Visual:** A calendar rendered as a long row of about twenty-four blank rounded square tiles, evenly spaced, with no numerals or letters. Every seventh tile is slightly tinted to hint at a weekend. A small gold marker token sits on one tile at the far left and a faint dotted path steps across the tiles to the far right, showing time passing. Two or three tiles have a tiny page-flip corner. Around the middle, a single tile near the center gutter carries a small gear icon in teal, the sign that a hosted model was updated. The tiles run as one continuous strip across both halves.

### Three Chats, Three Resets

**Position:** Left panel, top row, x 2.0% to 48.5%, y 11.5% to 44.5%. Border brick red (#C0392B).
**Visual:** Three conversation columns side by side over the left 40% of the panel (columns at about 4% to 15%, 16.5% to 27.5%, and 29% to 40% across), each about 11% wide, with the same layout and the same bubble shapes. In each column, a cream question bubble with two short bars sits at the top, and below it a teal (#1F7A8C) reply bubble with the same bars and a small bright ruler icon marking the same assumption. At the bottom of each column the conversation ends in a gray puff of smoke with a brick-red outline. A tiny blank calendar tile at the top of each column shows that the three chats happened on different days. There is no document, no folder, and no cabinet.

### The Same Mistake Again

**Position:** Left panel, middle row, x 2.0% to 48.5%, y 45.5% to 75.5%. Border brick red (#C0392B).
**Visual:** Three identical frames in a row. Each frame holds the same cream question bubble, the same teal chip-and-gear machine icon, and the same curved arrow that veers off a straight path to the same wrong spot, a pencil touching a page. In each frame a yellow sticky note with two short bars is stuck on the upper left, and each note is crossed out with two heavy brick-red diagonal strokes (no letters). Between the frames, small gray circular arrows show the loop of repeating. The frames look deliberately photocopied from one another.

### Nothing to Roll Back To

**Position:** Left panel, bottom row, x 2.0% to 48.5%, y 76.5% to 98.0%. Border brick red (#C0392B).
**Visual:** A single flat horizontal timeline drawn as a thin gray line across the panel at mid height. Where commits should be, there are only small gray smoke puffs and three empty dashed circles. A backward-pointing rewind arrow curves from the right end toward the left and ends against a brick-red (#C0392B) stop bar before reaching anything. There are no gold nodes, no branches, and no markers.

### The Instruction File

**Position:** Right panel, top row, x 51.5% to 98.0%, y 11.5% to 44.5%. Border maroon (#7A0019).
**Visual:** A large upright cream document with a thick gold (#FFCC33) edge stands at the center top of the panel (about 60% to 72% across and 13% to 31% down), held in a small steel holder. Three colored tabs stick out of its right edge, each with a plain icon: a gold target (goals), a teal ruler (conventions), and a charcoal fence with a stop bar (constraints). The page shows a few bars and bullet dots with no readable marks. Below it, a row of three small session strips (at about 56% to 66%, 67% to 77%, and 78% to 88% across, and 34% to 43% down) repeats the left panel's bubble shapes at a smaller size: the same cream question bubble and a teal reply bubble that now carries a green check. Each strip begins with a thin gold arrow rising from it to the document and ends in a solid green dot, not in smoke. A cream alcove, a rounded pocket about 7% wide, sits at the lower right of the panel (about 90.5% to 97.5% across and 28% to 43% down) and holds Volt.

### Project Layout

**Position:** Right panel, middle row, left column, x 51.5% to 74.5%, y 45.5% to 75.5%. Border teal (#1F7A8C).
**Visual:** A tidy gray steel filing cabinet with four labeled-by-icon drawers, drawn in a simple front view. Top to bottom the drawer icons are a page (docs), a speech bubble (prompts), a gear (scripts), and a stack of disks (data). The data drawer is pulled open and shows two folders: one with a closed padlock icon, read-only, and one without. A small chart-card icon on top of the cabinet marks results. The gold-edged instruction file leans against the top of the cabinet, and a short pointer arrow runs from a small second tag beside it to that file, showing one file importing the other.

### Plain Text Files

**Position:** Right panel, middle row, right column, x 75.5% to 98.0%, y 45.5% to 75.5%. Border charcoal (#2A2E3A).
**Visual:** Three flat documents lie side by side on a pale table: a Markdown page with a heading bar, bullet dots, a small grid for a table, and a rounded code block; a spiral lab notebook with stacked cell blocks; and a script page with indented bars and a small play triangle. A magnifier hovers over a line, and a small two-page diff icon with one highlighted line sits beside them. To the right, a gray sealed box with a padlock stands for a binary container that needs a program to open. It looks inert and closed beside the open teal and gold documents.

### Commit History

**Position:** Right panel, bottom row, x 51.5% to 98.0%, y 76.5% to 98.0%. Border signal green (#3C8D5A).
**Visual:** The same horizontal timeline as on the left at the same height, now filled with a row of solid gold (#FFCC33) commit nodes joined by a line. One node near the left has a counterclockwise ring arrow around it, the rollback point. A branch curves up from the main line, carries three teal nodes and a tiny teal chip icon (an agent experiment), then curves back down into a merge node with a green ring, with a magnifier hovering over the junction to show review before merge. Short ticks below the line hint at dates but carry no digits.

### Volt the Border Collie cameo

Inside the cream alcove at the lower right of the Instruction File panel, around 90.5% to 97.5% across and 28% to 43% down, draw Volt the Border Collie at about 6.5% of the image width in a welcome pose: a black-and-white border collie with a white blaze and chest, large kind eyes, a maroon bandana (#7A0019) with a gold lightning-bolt emblem, and a small gold whistle on a cord. Volt sits upright with a warm smile and one front paw extended to the left, pointing at the gold-edged document, and the other paw resting down. Volt must not cover the tabs or the document, and must not touch the panel border.

## Layout Notes

- **No text of any kind in the picture.** The calendar tiles are blank. No labels on drawers, tabs, or folders. Use icons only.
- The top strip of blank tiles unifies both halves. The left half shows time passing with nothing kept: smoke, crossed-out notes, a bare line. The right half shows time passing with everything kept: a document, a cabinet, plain files, a history.
- The three sessions on the right use the same bubble shapes as the left, only smaller, so the comparison reads at a glance. Only the beginning and ending change.
- Light comes from the upper left with soft shadows to the lower right. Keep line weight, corner rounding, and shading consistent across all panels.
- Keep a clean gutter of at least 0.8% between all panels and about 3% down the middle. Do not let smoke, arrows, shadows, or glows spill into the gutters.
- The core idea is that an agent starts every session with no memory, and a project file is what it reads first. Make the gold-edged document and the gold commit nodes the most striking marks on the right.

## Do Not Include

- Any text, letters, numbers, labels, calendar numerals, or captions
- A title, heading, legend, banner, or month names
- Arrows with writing, signs, or readable screens
- Photorealistic people or faces other than Volt, and no humanoid robots
- Brand names, logos, a watermark, or a signature
- A second Volt

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/chat-forgets-project-remembers/chat-forgets-project-remembers.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
