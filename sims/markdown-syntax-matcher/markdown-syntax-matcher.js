// Markdown Syntax Matcher MicroSim
// CANVAS_HEIGHT: 760
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// For each of eight described rendered results the learner chooses which of three
// Markdown sources produces it, then submits. One attempt per item, fixed item order,
// option order shuffled per item at load. After submission the correct option is revealed
// with the "Why" sentence and a rendered preview (CommonMark + GFM tables) of the chosen
// and the correct source. The end screen shows "n of 8 correct", the mastery threshold (7),
// and the misconceptions behind the missed items.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 680;
// Control region: up to two rows of buttons = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// In "why", {A} {B} {C} stand for the spec's option letters; they are replaced by the
// letters the options carry on screen after shuffling, so the letter of the correct
// option carries no information.
// ---------------------------------------------------------------
const CODE_LINE = 'enob = (sndr_db - 1.76) / 6.02';

const ITEMS = [
  { result: 'A level-2 heading with the text "Measurement setup"',
    options: { A: '##Measurement setup', B: '## Measurement setup', C: '**Measurement setup**' },
    correct: 'B',
    why: 'A heading needs a space after the hashes. {A} has none, and {C} makes bold text, not a heading.',
    misconception: 1 },
  { result: 'A bulleted list of three items: ENOB, SNDR, SFDR',
    options: { A: '-ENOB\n-SNDR\n-SFDR', B: 'ENOB, SNDR, SFDR', C: '- ENOB\n- SNDR\n- SFDR' },
    correct: 'C',
    why: 'A list marker must be followed by a space. {A} has none, and {B} is a single line of text.',
    misconception: 2 },
  { result: 'A numbered list of three steps: Bias, Calibrate, Measure',
    options: { A: '1.Bias\n2.Calibrate\n3.Measure', B: '1. Bias\n2. Calibrate\n3. Measure',
      C: '(1) Bias\n(2) Calibrate\n(3) Measure' },
    correct: 'B',
    why: 'A numbered item is a number, a period, and a space. {A} has no space, and {C} is not list syntax.',
    misconception: 2 },
  { result: 'The variable name fs shown as inline code',
    options: { A: "'fs'", B: '"fs"', C: '`fs`' },
    correct: 'C',
    why: 'Code uses backticks. Single and double quotes are ordinary characters.',
    misconception: 4 },
  { result: 'A multi-line block of Python code with the language named',
    options: { A: "'''python\n" + CODE_LINE + "\n'''", B: '```python\n' + CODE_LINE + '\n```',
      C: '"""python\n' + CODE_LINE + '\n"""' },
    correct: 'B',
    why: 'A fenced block uses three backticks. Quote characters are not fences.',
    misconception: 4 },
  { result: 'The word "datasheet" as a link to https://example.com/ds.pdf',
    options: { A: '(datasheet)[https://example.com/ds.pdf]', B: '<datasheet>https://example.com/ds.pdf',
      C: '[datasheet](https://example.com/ds.pdf)' },
    correct: 'C',
    why: 'A link is square brackets for the text, then parentheses for the address, in that order.',
    misconception: 0 },
  { result: 'A table of two columns, Quantity and Value, with one data row: ENOB and 9.2',
    options: { A: 'Quantity, Value\nENOB, 9.2', B: '| Quantity | Value |\n| ENOB | 9.2 |',
      C: '| Quantity | Value |\n|---|---|\n| ENOB | 9.2 |' },
    correct: 'C',
    why: 'A table needs a header row followed by a separator row of hyphens. Without it the text renders as a paragraph.',
    misconception: 3 },
  { result: 'The word ENOB in bold',
    options: { A: '*ENOB', B: '!ENOB!', C: '**ENOB**' },
    correct: 'C',
    why: 'Bold wraps the text in double asterisks on both sides. {A} has no closing marker, and {B} is not Markdown syntax.',
    misconception: 0 }
];

// Misconceptions from the specification, numbered as in the spec
const MISCONCEPTIONS = {
  1: 'A heading needs no space after the hash characters.',
  2: 'A list item needs no space after the marker.',
  3: 'A table works without a separator row.',
  4: 'Quotation marks or single quotes make code.'
};

const QUESTION = 'Which source produces this result?';
const MASTERY = 7;           // mastery requires at least 7 of 8 correct
const LETTERS = ['A', 'B', 'C'];

// ---------------------------------------------------------------
// Pure logic (no p5 calls) - also exported for node tests
// ---------------------------------------------------------------

// Fisher-Yates shuffle of the spec letters; returns e.g. ['C','A','B']
// meaning position A on screen shows spec option C, and so on.
function shuffledKeys(rand) {
  const a = LETTERS.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// screen letter shown for a spec letter, given the order array
function screenLetter(order, specKey) {
  return LETTERS[order.indexOf(specKey)];
}

// "Why" sentence with the spec letters replaced by the on-screen letters
function whyText(item, order) {
  return item.why.replace(/\{([ABC])\}/g, (m, k) => screenLetter(order, k));
}

function isMastered(score) {
  return score >= MASTERY;
}

function scoreLine(score) {
  return score + ' of ' + ITEMS.length + ' correct';
}

// Group the missed items by misconception for the end screen.
// Returns [{misconception: n or 0, items: [itemNumbers], text}]
function missedSummary(missedIdx) {
  const groups = [];
  for (let n = 1; n <= 4; n++) {
    const items = missedIdx.filter(i => ITEMS[i].misconception === n).map(i => i + 1);
    if (items.length) groups.push({ misconception: n, items, text: MISCONCEPTIONS[n] });
  }
  // items without a listed misconception: give the rule from the "Why" sentence
  for (const i of missedIdx) {
    if (ITEMS[i].misconception === 0) {
      groups.push({ misconception: 0, items: [i + 1],
        text: ITEMS[i].why.replace(/\{([ABC])\}[^.]*\./g, '').trim() });
    }
  }
  return groups;
}

// ---------------------------------------------------------------
// Minimal Markdown renderer (CommonMark + GFM table extension), limited to the
// constructs used by the eight items: ATX headings, bullet and ordered lists,
// fenced code blocks, GFM tables, paragraphs (soft line breaks render as spaces),
// and inline code spans, strong, emphasis, links and raw HTML tags.
// Returns a list of blocks; inline content is a list of runs {t, s, href}.
// ---------------------------------------------------------------
const RE_FENCE = /^ {0,3}(`{3,}|~{3,})([^`]*)$/;
const RE_ATX = /^ {0,3}(#{1,6})(?:[ \t]+(.*?))?(?:[ \t]+#+)?[ \t]*$/;
const RE_BULLET = /^ {0,3}([-+*])[ \t]+(.*)$/;
const RE_ORDERED = /^ {0,3}(\d{1,9})([.)])[ \t]+(.*)$/;
const RE_DELIM_ROW = /^ {0,3}\|?[ \t]*:?-+:?[ \t]*(\|[ \t]*:?-+:?[ \t]*)*\|?[ \t]*$/;

function splitRow(line) {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map(c => c.trim());
}

function isTableStart(lines, i) {
  if (i + 1 >= lines.length) return false;
  if (lines[i].indexOf('|') < 0) return false;
  if (!RE_DELIM_ROW.test(lines[i + 1]) || lines[i + 1].indexOf('-') < 0) return false;
  // GFM: the header row must have the same number of cells as the delimiter row
  return splitRow(lines[i]).length === splitRow(lines[i + 1]).length;
}

function startsBlock(lines, i) {
  const l = lines[i];
  return RE_FENCE.test(l) || RE_ATX.test(l) || RE_BULLET.test(l) ||
    (RE_ORDERED.test(l) && RE_ORDERED.exec(l)[1] === '1') || isTableStart(lines, i);
}

function parseMarkdown(src) {
  const lines = src.split('\n');
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') { i++; continue; }
    let m;
    if ((m = RE_FENCE.exec(line))) {
      const fence = m[1];
      const lang = m[2].trim().split(/\s+/)[0] || '';
      const body = [];
      i++;
      while (i < lines.length) {
        const close = /^ {0,3}(`{3,}|~{3,})[ \t]*$/.exec(lines[i]);
        if (close && close[1][0] === fence[0] && close[1].length >= fence.length) { i++; break; }
        body.push(lines[i]);
        i++;
      }
      blocks.push({ type: 'code', lang, text: body.join('\n') });
      continue;
    }
    if ((m = RE_ATX.exec(line))) {
      blocks.push({ type: 'heading', level: m[1].length, inlines: parseInline(m[2] || '') });
      i++;
      continue;
    }
    if (isTableStart(lines, i)) {
      const header = splitRow(lines[i]).map(parseInline);
      const n = header.length;
      const rows = [];
      i += 2;
      while (i < lines.length && lines[i].trim() !== '' && !startsBlock(lines, i)) {
        const cells = splitRow(lines[i]);
        while (cells.length < n) cells.push('');
        rows.push(cells.slice(0, n).map(parseInline));
        i++;
      }
      blocks.push({ type: 'table', header, rows });
      continue;
    }
    if (RE_BULLET.test(line) || RE_ORDERED.test(line)) {
      const ordered = !RE_BULLET.test(line);
      const re = ordered ? RE_ORDERED : RE_BULLET;
      const start = ordered ? parseInt(RE_ORDERED.exec(line)[1], 10) : 1;
      const items = [];
      while (i < lines.length && re.test(lines[i])) {
        const mm = re.exec(lines[i]);
        items.push(parseInline(ordered ? mm[3] : mm[2]));
        i++;
      }
      blocks.push({ type: ordered ? 'ol' : 'ul', start, items });
      continue;
    }
    // paragraph: consecutive lines until a blank line or a block that can interrupt it
    const para = [line.trim()];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !startsBlock(lines, i)) {
      para.push(lines[i].trim());
      i++;
    }
    // soft line breaks render as a space
    blocks.push({ type: 'para', inlines: parseInline(para.join(' ')) });
  }
  return blocks;
}

function parseInline(s) {
  const runs = [];
  let buf = '';
  const flush = () => { if (buf) { runs.push({ t: 'text', s: buf }); buf = ''; } };
  let i = 0;
  while (i < s.length) {
    const rest = s.slice(i);
    let m;
    // code span: a run of backticks closed by an equal run
    if ((m = /^(`+)([\s\S]*?[^`])\1(?!`)/.exec(rest))) {
      flush();
      let c = m[2];
      if (c.length > 2 && c[0] === ' ' && c[c.length - 1] === ' ') c = c.slice(1, -1);
      runs.push({ t: 'code', s: c });
      i += m[0].length;
      continue;
    }
    // raw HTML open or closing tag: rendered by the browser as an (invisible) element
    if ((m = /^<\/?[A-Za-z][A-Za-z0-9-]*(?:\s+[A-Za-z_:][\w.:-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*\s*\/?>/.exec(rest))) {
      flush();
      runs.push({ t: 'html', s: m[0] });
      i += m[0].length;
      continue;
    }
    // link: [text](destination)
    if ((m = /^\[([^\]]*)\]\(([^)\s]*)\)/.exec(rest))) {
      flush();
      runs.push({ t: 'link', s: m[1], href: m[2] });
      i += m[0].length;
      continue;
    }
    // strong: **text** (no whitespace just inside the markers)
    if ((m = /^\*\*(\S(?:[\s\S]*?\S)?)\*\*/.exec(rest))) {
      flush();
      runs.push({ t: 'strong', s: m[1] });
      i += m[0].length;
      continue;
    }
    // emphasis: *text*
    if ((m = /^\*(\S(?:[^*]*?\S)?)\*/.exec(rest))) {
      flush();
      runs.push({ t: 'em', s: m[1] });
      i += m[0].length;
      continue;
    }
    buf += s[i];
    i++;
  }
  flush();
  return runs;
}

// Export the pure logic for node tests (ignored in the browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ITEMS, MISCONCEPTIONS, MASTERY, QUESTION, shuffledKeys, screenLetter,
    whyText, isMastered, scoreLine, missedSummary, parseMarkdown, parseInline };
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let orders = [];         // per item: spec letters in on-screen order
let itemPos = 0;         // current item (0..7)
let selected = -1;       // on-screen position selected (0..2), -1 = none
let committed = false;   // has the current item been submitted?
let results = [];        // per item: true/false once submitted
let finished = false;    // end screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let optionButtons = [];
let submitButton;
let nextButton;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(83);   // Markdown Syntax
let lrs = null, itemStart = 0;
// stable fragment name per item, looked up by the item's own text (not by position)
const XAPI_KEYS = {
  'A level-2 heading with the text "Measurement setup"': 'heading',
  'A bulleted list of three items: ENOB, SNDR, SFDR': 'bulleted-list',
  'A numbered list of three steps: Bias, Calibrate, Measure': 'numbered-list',
  'The variable name fs shown as inline code': 'inline-code',
  'A multi-line block of Python code with the language named': 'code-block',
  'The word "datasheet" as a link to https://example.com/ds.pdf': 'link',
  'A table of two columns, Quantity and Value, with one data row: ENOB and 9.2': 'table',
  'The word ENOB in bold': 'bold'
};

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let p = 0; p < 3; p++) {
    const b = createButton('Option ' + LETTERS[p]);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.mouseClicked(() => selectOption(p));
    optionButtons.push(b);
  }
  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  submitButton.mouseClicked(submitAnswer);

  nextButton = createButton('Next Item');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mouseClicked(nextPressed);

  // option order shuffled independently for each item and each learner (page load)
  orders = ITEMS.map(() => shuffledKeys(Math.random));
  results = [];
  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Markdown Syntax Matcher', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Markdown Syntax Matcher MicroSim', pageDwell: true });
  }
  itemStart = Date.now();
  updateControls();

  describe('Markdown Syntax Matcher. Eight items in a fixed order. Each item describes a rendered ' +
    'result, such as a level-2 heading or a two-column table, and shows three candidate Markdown ' +
    'sources as literal text, labeled A, B and C. Press Option A, B or C to select a source, then ' +
    'press Submit. Each item has one attempt. The sim then marks the correct option with a check ' +
    'mark, marks a wrong choice with an X, gives the reason, and draws the rendered preview of the ' +
    'chosen source and of the correct source. After item 8 it shows the score out of 8, whether the ' +
    'mastery threshold of 7 was met, and the misconceptions behind the missed items.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------
function selectOption(p) {
  if (finished || committed) return;
  selected = p;
  updateControls();
  redraw();
}

function submitAnswer() {
  if (finished || committed || selected < 0) return;
  committed = true;
  const specKey = orders[itemPos][selected];
  results[itemPos] = specKey === ITEMS[itemPos].correct;
  if (lrs) {
    const it = ITEMS[itemPos];
    const key = XAPI_KEYS[it.result];
    if (key) {
      lrs.question('q-' + key, { name: it.result, concept: PAGE_CONCEPT() })
        .answer({ success: results[itemPos], response: 'option-' + specKey.toLowerCase(),
                  durationMs: itemStart ? Date.now() - itemStart : undefined });
    } else console.warn('[markdown-syntax-matcher] no xAPI key for item "' + it.result + '"');
  }
  updateControls();
  redraw();
}

function nextPressed() {
  if (!committed || finished) return;
  if (itemPos < ITEMS.length - 1) {
    itemPos++;
    committed = false;
    selected = -1;
    itemStart = Date.now();
  } else {
    finished = true;
  }
  updateControls();
  redraw();
  // keep keyboard focus on a visible control
  if (!finished && optionButtons[0]) optionButtons[0].elt.focus();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  for (let p = 0; p < 3; p++) {
    const b = optionButtons[p];
    if (finished) { b.hide(); continue; }
    b.show();
    setEnabled(b, !committed);
    const on = p === selected;
    b.attribute('aria-pressed', on ? 'true' : 'false');
    b.style('font-weight', on ? 'bold' : 'normal');
    b.style('outline', on ? '3px solid black' : 'none');
  }
  if (finished) {
    submitButton.hide();
    nextButton.hide();
  } else {
    submitButton.show();
    setEnabled(submitButton, !committed && selected >= 0);
    nextButton.show();
    nextButton.html(itemPos === ITEMS.length - 1 ? 'See Score' : 'Next Item');
    setEnabled(nextButton, committed);
  }
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the visible buttons left to right, wrapping onto a second row when needed
function layoutControls() {
  if (finished) return;
  const visible = optionButtons.concat([submitButton, nextButton]);
  const gap = 10;
  let x = 10;
  let y = drawHeight + 8;
  for (const b of visible) {
    const w = b.elt.offsetWidth;
    if (x > 10 && x + w > canvasWidth - 10) {
      x = 10;
      y += 35;
    }
    b.position(x, y);
    x += w + gap;
  }
}

// ---------------------------------------------------------------
// Drawing helpers
// ---------------------------------------------------------------
const SANS = 'sans-serif';
const MONO = 'monospace';

function setFont(family, size, style) {
  textFont(family);
  textSize(size);
  textStyle(style || NORMAL);
}

// Word-wrap a string to a maximum width using the current text settings;
// words wider than the line are broken by character.
function wrapText(str, maxW) {
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (let w of words) {
    while (textWidth(w) > maxW && w.length > 1) {
      // break an over-long word
      if (line) { lines.push(line); line = ''; }
      let k = w.length - 1;
      while (k > 1 && textWidth(w.slice(0, k)) > maxW) k--;
      lines.push(w.slice(0, k));
      w = w.slice(k);
    }
    const test = line ? line + ' ' + w : w;
    if (line && textWidth(test) > maxW) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Break a monospace source line by character so that it fits maxW
function wrapChars(str, maxW) {
  if (str === '') return [''];
  const out = [];
  let s = str;
  while (s.length > 0) {
    let k = s.length;
    while (k > 1 && textWidth(s.slice(0, k)) > maxW) k--;
    out.push(s.slice(0, k));
    s = s.slice(k);
  }
  return out;
}

function drawLines(lines, x, y, lineH) {
  textAlign(LEFT, TOP);
  for (const ln of lines) {
    noStroke();
    text(ln, x, y);
    y += lineH;
  }
  return y;
}

// ---------------------------------------------------------------
// Rendering Markdown blocks onto the canvas
// Every layout function returns the height used; when doDraw is false it only measures.
// ---------------------------------------------------------------
function runFont(t, size) {
  if (t === 'code') setFont(MONO, size - 1, NORMAL);
  else if (t === 'strong') setFont(SANS, size, BOLD);
  else if (t === 'em') setFont(SANS, size, ITALIC);
  else setFont(SANS, size, NORMAL);
}

// Lay out inline runs with word wrapping. baseBold makes every run bold (headings, table headers).
function layoutInline(runs, x, y, w, size, lineH, doDraw, baseBold) {
  // flatten the runs into words and spaces, keeping the run type of each word
  const toks = [];
  for (const r of runs) {
    if (r.t === 'html') continue;          // raw HTML tags are not displayed
    const parts = r.s.split(' ');
    for (let k = 0; k < parts.length; k++) {
      if (k > 0) toks.push({ space: true });
      if (parts[k] !== '') toks.push({ t: r.t, s: parts[k] });
    }
  }
  let cx = 0;
  let cy = 0;
  let pendingSpace = false;
  for (const tk of toks) {
    if (tk.space) { pendingSpace = cx > 0; continue; }
    const t = baseBold && tk.t === 'text' ? 'strong' : tk.t;
    runFont(t, size);
    const spaceW = pendingSpace ? textWidth(' ') : 0;
    pendingSpace = false;
    const pieces = textWidth(tk.s) > w - 6 ? wrapChars(tk.s, w - 6) : [tk.s];
    for (let pi = 0; pi < pieces.length; pi++) {
      const piece = pieces[pi];
      const pw = textWidth(piece) + (t === 'code' ? 6 : 0);
      const sp = pi === 0 ? spaceW : 0;
      if (cx > 0 && cx + sp + pw > w) {
        cx = 0;
        cy += lineH;
      } else {
        cx += sp;
      }
      if (doDraw) {
        const px = x + cx;
        const py = y + cy;
        textAlign(LEFT, TOP);
        if (t === 'code') {
          fill('gainsboro');
          noStroke();
          rect(px, py + 1, pw, lineH - 3, 3);
          fill('black');
          noStroke();
          text(piece, px + 3, py + 2);
        } else if (t === 'link') {
          fill('mediumblue');
          noStroke();
          text(piece, px, py);
          stroke('mediumblue');
          strokeWeight(1);
          line(px, py + size + 1, px + pw, py + size + 1);
          noStroke();
        } else {
          fill('black');
          noStroke();
          text(piece, px, py);
        }
      }
      cx += pw;
    }
  }
  return cy + lineH;
}

function plainText(runs) {
  return runs.filter(r => r.t !== 'html').map(r => r.s).join('');
}

function layoutBlocks(blocks, x, y, w, doDraw) {
  let h = 0;
  for (let b = 0; b < blocks.length; b++) {
    const blk = blocks[b];
    if (b > 0) h += 8;
    if (blk.type === 'heading') {
      const size = Math.max(16, 30 - 4 * blk.level);   // h2 = 22 px
      h += layoutInline(blk.inlines, x, y + h, w, size, size + 6, doDraw, true);
      if (doDraw) {
        stroke('silver');
        strokeWeight(1);
        line(x, y + h + 1, x + w, y + h + 1);
        noStroke();
      }
      h += 4;
    } else if (blk.type === 'para') {
      h += layoutInline(blk.inlines, x, y + h, w, 16, 20, doDraw, false);
    } else if (blk.type === 'ul' || blk.type === 'ol') {
      const indent = 28;
      for (let k = 0; k < blk.items.length; k++) {
        if (doDraw) {
          setFont(SANS, 16, NORMAL);
          fill('black');
          noStroke();
          textAlign(RIGHT, TOP);
          const marker = blk.type === 'ul' ? '•' : (blk.start + k) + '.';
          text(marker, x + indent - 8, y + h);
        }
        h += layoutInline(blk.items[k], x + indent, y + h, w - indent, 16, 20, doDraw, false) + 2;
      }
    } else if (blk.type === 'code') {
      setFont(MONO, 15, NORMAL);
      const lines = [];
      for (const ln of blk.text.split('\n')) for (const p of wrapChars(ln, w - 16)) lines.push(p);
      const boxH = lines.length * 19 + 12;
      if (doDraw) {
        fill('whitesmoke');
        stroke('silver');
        strokeWeight(1);
        rect(x, y + h, w, boxH, 4);
        fill('black');
        setFont(MONO, 15, NORMAL);
        drawLines(lines, x + 8, y + h + 6, 19);
      }
      h += boxH;
    } else if (blk.type === 'table') {
      const cols = blk.header.length;
      const cellPad = 8;
      // natural column widths
      const colW = [];
      for (let c = 0; c < cols; c++) {
        setFont(SANS, 16, BOLD);
        let mw = textWidth(plainText(blk.header[c]));
        setFont(SANS, 16, NORMAL);
        for (const r of blk.rows) mw = Math.max(mw, textWidth(plainText(r[c])));
        colW.push(mw + 2 * cellPad);
      }
      const total = colW.reduce((a, v) => a + v, 0);
      if (total > w) for (let c = 0; c < cols; c++) colW[c] = w / cols;
      const allRows = [blk.header].concat(blk.rows);
      for (let r = 0; r < allRows.length; r++) {
        // row height = tallest cell
        let rh = 0;
        for (let c = 0; c < cols; c++) {
          rh = Math.max(rh, layoutInline(allRows[r][c], 0, 0, colW[c] - 2 * cellPad, 16, 20, false, r === 0));
        }
        rh += 10;
        if (doDraw) {
          let cx = x;
          for (let c = 0; c < cols; c++) {
            fill(r === 0 ? 'gainsboro' : 'white');
            stroke('gray');
            strokeWeight(1);
            rect(cx, y + h, colW[c], rh);
            layoutInline(allRows[r][c], cx + cellPad, y + h + 5, colW[c] - 2 * cellPad, 16, 20, true, r === 0);
            cx += colW[c];
          }
        }
        h += rh;
      }
    }
  }
  setFont(SANS, 16, NORMAL);
  return h;
}

// ---------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------
function draw() {
  updateCanvasSize();

  // drawing region background and border
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  // control region background
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);

  // title
  setFont(SANS, 24, BOLD);
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  text('Markdown Syntax Matcher', canvasWidth / 2, 10);
  setFont(SANS, 16, NORMAL);

  if (finished) drawSummary(44);
  else drawItem(44);
}

function scoreSoFar() {
  return results.filter(r => r === true).length;
}

// Height of one option box at the current width
function optionLines(src, w) {
  setFont(MONO, 16, NORMAL);
  const lines = [];
  for (const ln of src.split('\n')) for (const p of wrapChars(ln, w)) lines.push(p);
  return lines;
}

function drawItem(y) {
  const innerW = canvasWidth - 2 * pad;
  const item = ITEMS[itemPos];
  const order = orders[itemPos];
  const correctPos = order.indexOf(item.correct);

  // status line
  setFont(SANS, 16, NORMAL);
  fill('black');
  y = drawLines(wrapText('Item ' + (itemPos + 1) + ' of ' + ITEMS.length +
    '  |  Correct so far: ' + scoreSoFar(), innerW), pad, y, 20) + 4;

  // question
  fill('navy');
  setFont(SANS, 16, ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 6;

  // rendered result to produce
  setFont(SANS, 18, BOLD);
  const resLines = wrapText('Rendered result: ' + item.result, innerW - 24);
  const resH = resLines.length * 23 + 16;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, resH, 10);
  strokeWeight(1);
  fill('black');
  drawLines(resLines, pad + 12, y + 8, 23);
  y += resH + 8;

  // three source options, shown as literal text in on-screen order
  const gutter = 56;
  for (let p = 0; p < 3; p++) {
    const specKey = order[p];
    const lines = optionLines(item.options[specKey], innerW - gutter - 10);
    const boxH = lines.length * 20 + 14;
    const isCorrect = committed && p === correctPos;
    const isWrongPick = committed && p === selected && p !== correctPos;
    const isSelected = !committed && p === selected;

    if (isCorrect) { fill('white'); stroke('royalblue'); strokeWeight(4); }
    else if (isWrongPick) { fill('white'); stroke('darkorange'); strokeWeight(4); }
    else if (isSelected) { fill('lightyellow'); stroke('black'); strokeWeight(3); }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(pad, y, innerW, boxH, 8);
    strokeWeight(1);

    // gutter: status symbol and on-screen letter
    let sym = '';
    if (isCorrect) sym = '✓';        // check mark
    else if (isWrongPick) sym = '✗'; // ballot x
    else if (isSelected) sym = '▶';  // pointer
    setFont(SANS, 18, BOLD);
    noStroke();
    fill(isCorrect ? 'royalblue' : (isWrongPick ? 'saddlebrown' : 'black'));
    textAlign(LEFT, TOP);
    text(sym, pad + 8, y + 7);
    fill('black');
    text(LETTERS[p], pad + 30, y + 7);

    // literal source text
    setFont(MONO, 16, NORMAL);
    fill('black');
    drawLines(lines, pad + gutter, y + 8, 20);
    y += boxH + 6;
  }
  setFont(SANS, 16, NORMAL);
  y += 2;

  if (!committed) {
    fill('black');
    const msg = selected < 0
      ? 'Select a source with Option A, B or C below, then press Submit. Each item has one attempt.'
      : 'Selected: Option ' + LETTERS[selected] + '. Press Submit to commit, or select another option.';
    y = drawLines(wrapText(msg, innerW), pad, y, 20);
    layoutBottom = y;
    return;
  }

  // feedback after the single attempt
  const correct = results[itemPos];
  const why = whyText(item, order);
  if (correct) {
    setFont(SANS, 18, BOLD);
    fill('navy');
    y = drawLines(['✓ Correct.'], pad, y, 24);
  }
  setFont(SANS, 16, NORMAL);
  fill('black');
  y = drawLines(wrapText(why, innerW), pad, y, 20) + 6;

  // rendered previews: the chosen option next to the correct one
  const panels = correct
    ? [{ label: 'Option ' + LETTERS[correctPos] + ' renders as:', key: item.correct, color: 'royalblue' }]
    : [{ label: '✗ Your choice, ' + LETTERS[selected] + ', renders as:', key: order[selected], color: 'darkorange' },
       { label: '✓ Correct option, ' + LETTERS[correctPos] + ', renders as:', key: item.correct, color: 'royalblue' }];
  const gap = 10;
  const pw = (innerW - gap * (panels.length - 1)) / panels.length;
  // measure all panels so that they share one height
  let maxH = 0;
  const measured = panels.map(pn => {
    setFont(SANS, 16, BOLD);
    const labelLines = wrapText(pn.label, pw - 16);
    const blocks = parseMarkdown(item.options[pn.key]);
    const bodyH = layoutBlocks(blocks, 0, 0, pw - 16, false);
    const h = labelLines.length * 20 + 8 + bodyH + 16;
    maxH = Math.max(maxH, h);
    return { labelLines, blocks };
  });
  for (let k = 0; k < panels.length; k++) {
    const px = pad + k * (pw + gap);
    fill('white');
    stroke(panels[k].color);
    strokeWeight(2);
    rect(px, y, pw, maxH, 8);
    strokeWeight(1);
    setFont(SANS, 16, BOLD);
    fill('black');
    const ly = drawLines(measured[k].labelLines, px + 8, y + 6, 20);
    layoutBlocks(measured[k].blocks, px + 8, ly + 6, pw - 16, true);
  }
  y += maxH;
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;
  const score = scoreSoFar();

  setFont(SANS, 16, NORMAL);
  fill('black');
  y = drawLines(['All ' + ITEMS.length + ' items answered'], pad, y, 20) + 4;

  setFont(SANS, 24, BOLD);
  y = drawLines([scoreLine(score)], pad, y, 30);
  setFont(SANS, 16, BOLD);
  const mastered = isMastered(score);
  fill(mastered ? 'navy' : 'saddlebrown');
  const masteryStr = mastered
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of ' + ITEMS.length + ' correct.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of ' + ITEMS.length + ' correct are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 10;

  const missedIdx = [];
  for (let i = 0; i < ITEMS.length; i++) if (!results[i]) missedIdx.push(i);

  fill('black');
  setFont(SANS, 16, BOLD);
  if (missedIdx.length === 0) {
    y = drawLines(wrapText('No items missed.', innerW), pad, y, 20);
    layoutBottom = y;
    return;
  }
  y = drawLines(wrapText('Misconceptions behind the items you missed:', innerW), pad, y, 20) + 6;

  for (const g of missedSummary(missedIdx)) {
    const itemsStr = (g.items.length > 1 ? 'Items ' : 'Item ') + g.items.join(', ');
    const head = g.misconception > 0
      ? itemsStr + ', misconception:'
      : itemsStr + ', the rule:';
    setFont(SANS, 16, BOLD);
    const headLines = wrapText(head, innerW - 20);
    setFont(SANS, 16, NORMAL);
    const bodyText = g.misconception > 0 ? '"' + g.text + '"' : g.text;
    const bodyLines = wrapText(bodyText, innerW - 20);
    const boxH = (headLines.length + bodyLines.length) * 20 + 14;
    fill('white');
    stroke('darkorange');
    strokeWeight(1);
    rect(pad, y, innerW, boxH, 8);
    fill('black');
    setFont(SANS, 16, BOLD);
    let yy = drawLines(headLines, pad + 10, y + 7, 20);
    setFont(SANS, 16, NORMAL);
    drawLines(bodyLines, pad + 10, yy, 20);
    y += boxH + 6;
  }
  layoutBottom = y;
}

// These two functions must be present for width responsive MicroSims
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  layoutControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
