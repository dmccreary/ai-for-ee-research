# The Real Citation and the Fluent Fake — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no arrows with writing, no signs, no logos, no watermark. Reference cards, book spines, papers, database results, and laptop screens show only unreadable abstract marks: thick and thin horizontal bars standing in for title, author, venue, and year lines, plus blurred color blocks. No readable DOI, no readable equation, no readable code. Check marks, magnifiers, chain-link symbols, and stamps are allowed because they carry no characters. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1920 × 1080 px, landscape, 16:9 ratio. If the model cannot produce this exact size, generate at any 16:9 size, because the overlay uses percentages of width and height, not pixels.
- **Background:** Warm off-white (#FAF7F2) with a very faint blueprint grid
- **Audience:** Graduate students, postdocs, and faculty in electrical engineering and computer design
- **Style:** High-quality polished illustration with soft lighting from the upper left, rich detail, and a consistent line weight. Semi-realistic is welcome: a real-looking wooden desk, a lit lamp, a library shelf, paper with texture. Saturated but professional colors. No glowing brains, no chrome robot hands, no stock-photo clichés. People are not needed. Any agent or model is drawn as a small friendly teal (#1F7A8C) neutral machine icon, never a humanoid robot with a face.
- **Palette:** maroon #7A0019 (human judgment), gold #FFCC33 (focal points and the lookup thread), teal #1F7A8C (the model), signal green #3C8D5A (verified), brick red #C0392B (failure), charcoal #2A2E3A (structure), off-white #FAF7F2 (background). Never rely on color alone: every meaning below is also carried by an icon, a stamp shape, or a pattern.

## What to Draw

One poster made of **nine clearly separated rounded panels**, arranged as a split screen on top and a strip of three failure cards along the bottom.

1. **Top, left half:** two stacked panels about 46.5% wide, showing the careless version: a fluent reference nobody has checked, and the trap of asking the model to check itself.
2. **Top, right half:** a wide panel for the same reference after it has been checked, and beneath it three narrow panels, one per check.
3. **Bottom strip:** three equal failure cards across the full width.

Every panel is a rounded rectangle with a thin border in its accent color and a slightly lighter fill of that same hue. Panels are separated by a clean off-white gutter of at least 0.8% of the image, with a wider gutter of about 3% down the middle between the left and right halves. Nothing may cross a panel border: no shadow, glow, thread, or object spills into a gutter. Keep a safe margin of about 2% on every side. Do not add a title bar, header, footer, legend, or side panel: the panels ARE the composition.

**Comparison rule:** the left half is the risky version and the right half is the controlled version. The two top scenes use the same camera angle (straight-on, slightly above the desk), the same scale, the same desk, the same lamp, the same coffee cup, the same laptop position, the same reference card in the same position, and the same shelf backdrop position, so a student compares them at a glance.

### Region map (each panel is an interactive region)

| Panel | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| Fluent Reference | 2.0% | 48.5% | 2.0% | 35.0% | Brick red #C0392B |
| Asking the Model Again | 2.0% | 48.5% | 36.0% | 69.5% | Teal #1F7A8C |
| Same Card, Checked | 51.5% | 98.0% | 2.0% | 35.0% | Signal green #3C8D5A |
| Does It Exist | 51.5% | 66.5% | 36.0% | 69.5% | Dark gold #B8860B |
| Do Details Match | 67.3% | 82.3% | 36.0% | 69.5% | Maroon #7A0019 |
| Does It Support the Claim | 83.1% | 98.0% | 36.0% | 69.5% | Charcoal #2A2E3A |
| Fabricated | 2.0% | 33.2% | 70.5% | 98.0% | Brick red #C0392B |
| Wrong Details | 34.0% | 66.0% | 70.5% | 98.0% | Dark gold #B8860B |
| Unsupported Claim | 66.8% | 98.0% | 70.5% | 98.0% | Maroon #7A0019 |

### Fluent Reference

**Position:** Top-left panel, x 2.0% to 48.5%, y 2.0% to 35.0%. Border brick red (#C0392B).
**Visual:** A tidy wooden desk seen straight on. Behind it, a library shelf is painted as a flat, one-tone backdrop of closely packed unreadable spines with no depth, no shadows between the books, and nothing behind them, like wallpaper. On the desk, from left to right: a white coffee cup (about 4% to 7.5% across), a cream reference card (about 9.5% to 26.5% across and 12% to 28% down) showing a thick title bar, two thinner author and venue bars, and a short year mark, a lit brass desk lamp (about 28% to 31.5% across), and an open laptop (about 31% to 40% across) whose screen shows a teal chat bubble pattern. A pale gray, dotted-outline check mark hovers above the card's top-right corner, drawn gray because nobody has checked. A cream alcove, a rounded pocket about 7% wide, sits at the lower right (about 41% to 47.5% across and 18% to 33% down) and holds Volt.

### Asking the Model Again

**Position:** Left panel, second row, x 2.0% to 48.5%, y 36.0% to 69.5%. Border teal (#1F7A8C).
**Visual:** The same flat painted shelf backdrop at the top of the panel. In the foreground a large open laptop, centered at about 25% across, with a screen showing a chat. A stack of three identical reference cards slides from the left into a teal chat bubble. A second teal bubble of exactly the same shade, size, and shape sits on the right of the screen and holds a large confident check mark. A thick teal circular arrow starts at the right bubble and curves back into the left bubble, so the question and the answer visibly come from the same teal source. A small teal chip-and-gear machine icon sits at the center of the loop. There is no magnifier, no stamp, and no outside object anywhere in this panel.

### Same Card, Checked

**Position:** Top-right panel, x 51.5% to 98.0%, y 2.0% to 35.0%. Border signal green (#3C8D5A).
**Visual:** The same desk, same lamp, same coffee cup (about 53.5% to 57% across), and the same cream reference card in the same position (about 59% to 76% across, same vertical position) as on the left. The shelf behind is now a real shelf with depth, soft shadows between books, and one volume pulled halfway out. A magnifying glass hovers over the card's title, author, and year bars. A solid gold (#FFCC33) thread leaves the card and runs to the open laptop (about 80.5% to 89.5% across), whose screen now shows a generic lookup page with a green-highlighted result row, and to a real paper lying open on the desk in the same pocket position as the left alcove (about 90% to 96.5% across, 18% to 33% down). A solid green (#3C8D5A) verified stamp, a circle with a bold check, sits at the card's top-right corner, where the gray check was on the left. The alcove is present but empty of Volt.

### Does It Exist

**Position:** Right panel, second row, left column, x 51.5% to 66.5%, y 36.0% to 69.5%. Border dark gold (#B8860B).
**Visual:** A close view of a laptop screen with a search bar and a short list of result rows. One row is highlighted with a gold bar and a small green check at the right, and a second small card shows the matching page of a publisher. A gold chain-link symbol on a luggage-style tag hangs from the top left corner of the panel (the tag shape is shared with the two panels to the right). No letters.

### Do Details Match

**Position:** Right panel, second row, middle column, x 67.3% to 82.3%, y 36.0% to 69.5%. Border maroon (#7A0019).
**Visual:** Two cards side by side: the model's reference card on the left, the database record on the right. Three horizontal bars on each card are linked pairwise by short gold connectors, one for the author line, one for the venue line, and one for the year mark. Each pair has a small green dot at the connector. A magnifier sits over the connectors. A maroon luggage-style tag with a tiny person silhouette and a calendar page hangs from the top left corner of the panel.

### Does It Support the Claim

**Position:** Right panel, second row, right column, x 83.1% to 98.0%, y 36.0% to 69.5%. Border charcoal (#2A2E3A).
**Visual:** An open paper with two columns of gray text lines and one small unreadable figure. One sentence line is highlighted by a gold (#FFCC33) highlighter swipe, with a highlighter pen lying beside it. A small teal speech bubble above the page (the claim) is joined by a short gold thread to the highlighted line. A small green verified stamp sits at the page corner. A charcoal luggage-style tag with a highlighter and a sentence line hangs from the top left corner of the panel.

### Fabricated

**Position:** Bottom strip, left card, x 2.0% to 33.2%, y 70.5% to 98.0%. Border brick red (#C0392B).
**Visual:** The reference card, with the same typography as elsewhere, drawn with a dashed outline and a fill that dissolves downward into dotted lines, as if it is being erased. Behind it a book shelf shows an empty slot where the volume should be, and a magnifying glass over the slot shows nothing but plain wall. A broken chain-link icon in brick red sits at the top left corner, with a clearly separated gap between the links. Nothing real stands behind the card.

### Wrong Details

**Position:** Bottom strip, middle card, x 34.0% to 66.0%, y 70.5% to 98.0%. Border dark gold (#B8860B).
**Visual:** The reference card on the left and a real paper on the right, side by side. Three pairs of bars are connected by connectors: the author and title pairs line up and carry green dots, while the year and venue pairs are shifted out of line and carry a brick-red dot and a crossed connector. A small pencil, in a corrective pose, rests at the card edge. A puzzle-edge icon with mismatched tabs sits in the top left corner.

### Unsupported Claim

**Position:** Bottom strip, right card, x 66.8% to 98.0%, y 70.5% to 98.0%. Border maroon (#7A0019).
**Visual:** A real paper page open on the right with all details matching, with a highlighter swipe on a sentence that is visibly different in shape and length from the teal claim bubble at the upper left. A dotted gold thread leaves the claim bubble and ends in the air above a blank part of the page, with no highlighted line to catch it. A chain-link icon with one loose end hangs in the top left corner.

### Volt the Border Collie cameo

Inside the cream alcove at the lower right of the Fluent Reference panel, around 41% to 47.5% across and 18% to 33% down, draw Volt the Border Collie at about 6.5% of the image width in a warning pose: a black-and-white border collie with a white blaze and chest, large kind eyes, a maroon bandana (#7A0019) with a gold lightning-bolt emblem, and a small gold whistle on a cord. Volt stands upright with one paw raised flat in a polite stop gesture toward the gray check mark and the reference card, with a slightly raised brow. Volt must not cover the card, the laptop, or the gray check, and must not touch the panel border.

## Layout Notes

- **No text of any kind in the picture.** Replace every title, author, venue, year, and DOI with abstract bars and blocks. A chat window shows only bubble shapes.
- The three luggage-style tags (chain link, person and calendar, highlighter on a sentence) appear ONLY on the right half. They are the visual cue that the right half contains checks the left half lacks.
- The reference card has identical typography and proportions in all seven places it appears. The model's source color is always teal and the verified color is always signal green.
- Light comes from the upper left with soft shadows to the lower right. Keep line weight, corner rounding, and shading consistent across all panels. Both top scenes use the same camera angle and scale.
- Keep a clean gutter of at least 0.8% between all panels and about 3% down the middle. Do not let threads, shadows, or glows spill into the gutters.
- The core idea is that fluency is not evidence. Make the gray unearned check on the left and the solid green stamp on the right the most striking marks in the top row.

## Do Not Include

- Any text, letters, numbers, labels, captions, or readable DOIs
- A title, heading, legend, banner, or caption strip
- Arrows with writing, signs, or readable screens
- Photorealistic people or faces other than Volt, and no humanoid robots
- Brand names, publisher logos, a watermark, or a signature
- A second Volt

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/real-citation-fluent-fake/real-citation-fluent-fake.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its panel, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
