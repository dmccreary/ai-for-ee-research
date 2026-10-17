// Data Sensitivity Sorter for AI Tools MicroSim
// CANVAS_HEIGHT: 810
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner judges which class of AI tool each of eight items of research data may be given to,
// under a four-class illustrative data classification (Table 1 of Chapter 18).
// One attempt per item in a fixed order. After each submission the sim shows Correct or the
// item's class and tool class, highlights the class in the classification, and shows the
// "Why" sentence. After item 8 it shows "n of 8 correct", whether the mastery threshold of 7
// was met, and the eight items grouped by class.
// The design is width responsive; controls reflow onto two rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 730;
// Control region: two rows of controls = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let fs = 16;                // base font size; chosen per width by chooseFontSize()
let lineH = 20;             // line height for the base font size
let cardLH = 23;            // line height for the card text (fs + 2)
let contentTop = 46;        // y where content starts below the (possibly wrapped) title

// Color-blind-safe palette (Okabe-Ito blue and vermillion); every color cue is paired
// with a symbol (check mark or X) or a text label.
const COLOR_CORRECT = '#0072B2';
const FILL_CORRECT = '#E3F0FA';
const COLOR_WRONG = '#B34700';   // darkened vermillion for text contrast
const FILL_WRONG = '#FBE9DF';

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification and Table 1)
// ---------------------------------------------------------------
const POLICY_LABEL = 'Illustrative policy';

// Table 1: class, examples, may be given to
const CLASSES = [
  { name: 'Class 0 Public',
    examples: 'Published papers, public datasets, open-source code',
    givenTo: 'Any tool' },
  { name: 'Class 1 Internal',
    examples: 'Lab notes on setup, scripts, draft text without new results',
    givenTo: 'An approved hosted tool, or a local model' },
  { name: 'Class 2 Unpublished',
    examples: 'Unpublished measurements and designs of the group',
    givenTo: "A local model, or a hosted tool with the advisor's written approval" },
  { name: 'Class 3 Obligated',
    examples: 'Data under NDA, export-controlled technical data, personal data of participants, vendor files under license',
    givenTo: 'A local model only, and only if the agreement allows; otherwise no AI tool' }
];

const RULE_NOTE = 'An item that falls in two classes takes the more restrictive one.';

// The four tool classes the learner chooses from; index i is the tool class of data class i
const TOOL_CLASSES = [
  'Any tool',
  'Approved hosted tool or local',
  "Local model, or hosted with the advisor's approval",
  'Local model only, if the agreement allows'
];

// cls is the data class index (0-3), which also indexes the correct tool class
const ITEMS = [
  { id: 1, text: 'A published IEEE paper in PDF form',
    cls: 0, why: 'Class 0: it is public.' },
  { id: 2, text: 'An open-source simulation script from a public repository',
    cls: 0, why: 'Class 0: it is public.' },
  { id: 3, text: 'Your lab-notebook entries about the test bench setup',
    cls: 1, why: 'Class 1: internal, with no new results.' },
  { id: 4, text: 'Your draft Methods section, which has no new results',
    cls: 1, why: 'Class 1: internal draft text.' },
  { id: 5, text: "Unpublished measured ENOB data for your group's chip",
    cls: 2, why: 'Class 2: unpublished results of the group.' },
  { id: 6, text: 'A new circuit netlist that has not been published or filed',
    cls: 2, why: 'Class 2: unpublished design, and disclosure may affect later protection.' },
  { id: 7, text: 'Foundry process design kit model files under NDA',
    cls: 3, why: 'Class 3: vendor files under license and NDA.' },
  { id: 8, text: 'Interview transcripts with identifiable participants from a user study',
    cls: 3, why: 'Class 3: personal data of participants, governed by the consent and ethics approval.' }
];

const TITLE = 'Data Sensitivity Sorter for AI Tools';
const QUESTION = 'Which tools may receive this?';
const MASTERY = 7;   // mastery requires a score >= 7 of 8 on the first attempt
const PLACEHOLDER = 'Choose a tool class...';

// ---------------------------------------------------------------
// Pure logic (no p5 calls; tested in node)
// ---------------------------------------------------------------
function isCorrect(itemIndex, toolIndex) {
  return ITEMS[itemIndex].cls === toolIndex;
}

function lowerFirst(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

// First feedback sentence for a committed answer
function verdictText(itemIndex, toolIndex) {
  const it = ITEMS[itemIndex];
  if (isCorrect(itemIndex, toolIndex)) return 'Correct. ' + CLASSES[it.cls].name + '.';
  return 'This item is ' + CLASSES[it.cls].name + ', so ' + lowerFirst(TOOL_CLASSES[it.cls]) + '.';
}

// Full feedback: verdict (with the class) and the Why sentence
function feedbackText(itemIndex, toolIndex) {
  return verdictText(itemIndex, toolIndex) + ' ' + ITEMS[itemIndex].why;
}

function scoreLine(score) {
  return score + ' of ' + ITEMS.length + ' correct';
}

function masteryMet(score) {
  return score >= MASTERY;
}

// Item indexes grouped by data class
function itemsByClass() {
  const groups = CLASSES.map(() => []);
  ITEMS.forEach((it, i) => groups[it.cls].push(i));
  return groups;
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let current = 0;         // item index 0..7
let committed = false;   // has the current item been answered?
let chosen = -1;         // tool class index the learner submitted for the current item
let answers = [];        // tool class index submitted for each item
let score = 0;
let finished = false;    // summary screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(319);   // Confidential Data
const ITEM_CONCEPT = (it) => LRS.conceptId(it.cls === 2 ? 320 : 319);   // 320 Unpublished Results
let lrs = null, itemStart = 0;

let toolSelect;
let submitButton;
let nextButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  toolSelect = createSelect();
  toolSelect.parent(document.querySelector('main'));
  toolSelect.option(PLACEHOLDER);
  for (const t of TOOL_CLASSES) toolSelect.option(t);
  toolSelect.style('font-size', '16px');
  toolSelect.style('padding', '3px');
  toolSelect.attribute('aria-label', 'Tool class that may receive this item');
  toolSelect.changed(selectionChanged);

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  submitButton.mouseClicked(submitPressed);

  nextButton = createButton('Next Item');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mouseClicked(nextPressed);

  resetSelect();
  chooseFontSize();
  updateControls();

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Data Sensitivity Sorter for AI Tools', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Data Sensitivity Sorter MicroSim', pageDwell: true });
    itemStart = Date.now();
  }

  describe('Data Sensitivity Sorter for AI Tools. A four-class illustrative data classification ' +
    '(Class 0 Public, Class 1 Internal, Class 2 Unpublished, Class 3 Obligated) is shown with one ' +
    'item of research data at a time. Choose one of four tool classes in the drop-down list and ' +
    'press Submit. Each item has one attempt. The sim then says Correct or names the item\'s class ' +
    'and tool class, highlights the class, and shows the reason. After eight items it shows the ' +
    'score out of 8, whether the mastery threshold of 7 was met, and the items grouped by class.');

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
function resetSelect() {
  toolSelect.elt.options[0].disabled = true; // placeholder cannot be submitted
  toolSelect.elt.selectedIndex = 0;
}

function selectedTool() {
  return TOOL_CLASSES.indexOf(toolSelect.value());
}

function selectionChanged() {
  updateControls();
}

function submitPressed() {
  if (finished || committed) return;
  const t = selectedTool();
  if (t < 0) return;
  chosen = t;
  committed = true;
  answers[current] = t;
  if (lrs) lrs.question('q-item-' + ITEMS[current].id, { name: 'Item ' + ITEMS[current].id + ': ' + ITEMS[current].text, concept: ITEM_CONCEPT(ITEMS[current]) })
    .answer({ success: isCorrect(current, t), response: 'class-' + t,
              durationMs: itemStart ? Date.now() - itemStart : undefined });
  if (isCorrect(current, t)) score++;
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished || !committed) return;
  if (current < ITEMS.length - 1) {
    current++;
    committed = false;
    chosen = -1;
    resetSelect();
    itemStart = Date.now();
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  if (finished) {
    toolSelect.hide();
    submitButton.hide();
    nextButton.hide();
    return;
  }
  setEnabled(toolSelect, !committed);
  setEnabled(submitButton, !committed && selectedTool() >= 0);
  nextButton.html(current === ITEMS.length - 1 ? 'See Score' : 'Next Item');
  setEnabled(nextButton, committed);
  layoutControls();
}

function setEnabled(el, on) {
  if (on) el.removeAttribute('disabled');
  else el.attribute('disabled', '');
}

// Flow the controls left to right, wrapping onto a second row when needed
function layoutControls() {
  if (finished) return;
  toolSelect.style('max-width', (canvasWidth - 20) + 'px');
  const visible = [toolSelect, submitButton, nextButton];
  const gap = 10;
  let x = 10;
  let y = drawHeight + 8;
  for (const el of visible) {
    const w = el.elt.offsetWidth;
    if (x > 10 && x + w > canvasWidth - 10) {
      x = 10;
      y += 35;
    }
    el.position(x, y);
    x += w + gap;
  }
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

  renderContent();
}

// Title (wrapped when the canvas is narrow), then the play or summary screen
function renderContent() {
  fill('black');
  noStroke();
  textStyle(BOLD);
  textSize(Math.min(24, fs + 6));
  const titleLines = wrapText(TITLE, canvasWidth - 20);
  textAlign(CENTER, TOP);
  let ty = 10;
  for (const ln of titleLines) {
    text(ln, canvasWidth / 2, ty);
    ty += Math.min(24, fs + 6) + 4;
  }
  textStyle(NORMAL);
  contentTop = ty + 8;
  if (finished) drawSummary(contentTop);
  else drawPlay(contentTop);
}

// Set the base font size and the line heights that depend on it
function setFont(size) {
  fs = size;
  lineH = Math.round(size * 1.25);
  cardLH = Math.round((size + 2) * 1.28);
}

// Pick the largest base font size (18 down to 14; 13 only as a last resort on very
// narrow phones) at which every screen state fits in the drawing region at the current width. Each state is rendered once
// and repainted by the next draw, so nothing is left on screen.
function chooseFontSize() {
  const saved = { current, committed, chosen, finished, score };
  const N = ITEMS.length;
  for (const size of [18, 17, 16, 15, 14, 13]) {
    setFont(size);
    let worst = 0;
    finished = false;
    for (let i = 0; i < N; i++) {
      current = i;
      const key = ITEMS[i].cls;
      for (const st of [-1, key, (key + 1) % 4]) {
        committed = st >= 0;
        chosen = st;
        renderContent();
        worst = Math.max(worst, layoutBottom);
      }
    }
    finished = true;
    score = 0; // the not-met mastery sentence is the longer one
    renderContent();
    worst = Math.max(worst, layoutBottom);
    current = saved.current; committed = saved.committed; chosen = saved.chosen;
    finished = saved.finished; score = saved.score;
    if (worst <= drawHeight - 8) break;
  }
}

// Word-wrap a string to a maximum width using the current text settings
function wrapText(str, maxW) {
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
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

// Draw wrapped lines; returns the y below the last line
function drawLines(lines, x, y, lh) {
  textAlign(LEFT, TOP);
  noStroke();
  for (const ln of lines) {
    text(ln, x, y);
    y += lh;
  }
  return y;
}

// The classification panel (Table 1); the item's class is outlined after a commit
function drawClassification(y, highlightClass) {
  const innerW = canvasWidth - 2 * pad;
  textSize(fs);

  // measure
  textStyle(BOLD);
  const headLines = wrapText('Data classification (' + POLICY_LABEL.toLowerCase() + ')', innerW - 20);
  textStyle(NORMAL);
  const bodies = CLASSES.map(c =>
    wrapText('Examples: ' + c.examples + '. May be given to: ' + c.givenTo + '.', innerW - 30));
  textStyle(ITALIC);
  const noteLines = wrapText(RULE_NOTE, innerW - 20);
  textStyle(NORMAL);
  let h = 8 + headLines.length * lineH + 6;
  for (const b of bodies) h += (b.length + 1) * lineH + 10;
  h += noteLines.length * lineH + 8;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(pad, y, innerW, h, 10);

  let yy = y + 8;
  fill('black');
  textStyle(BOLD);
  yy = drawLines(headLines, pad + 10, yy, lineH) + 6;

  for (let c = 0; c < CLASSES.length; c++) {
    const bh = (bodies[c].length + 1) * lineH;
    const isMatch = highlightClass === c;
    if (isMatch) {
      fill(FILL_CORRECT);
      stroke(COLOR_CORRECT);
      strokeWeight(3);
      rect(pad + 4, yy - 4, innerW - 8, bh + 8, 6);
      strokeWeight(1);
    }
    textStyle(BOLD);
    fill(isMatch ? COLOR_CORRECT : 'black');
    drawLines([(isMatch ? '▶ ' : '') + CLASSES[c].name + (isMatch ? ' (this item)' : '')], pad + 10, yy, lineH);
    textStyle(NORMAL);
    fill('black');
    drawLines(bodies[c], pad + 20, yy + lineH, lineH);
    yy += bh + 10;
  }
  textStyle(ITALIC);
  fill('dimgray');
  drawLines(noteLines, pad + 10, yy, lineH);
  textStyle(NORMAL);
  return y + h;
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const it = ITEMS[current];

  // classification (always visible)
  y = drawClassification(y, committed ? it.cls : -1) + 10;

  // status line
  textSize(fs);
  fill('black');
  y = drawLines(wrapText('Item ' + (current + 1) + ' of ' + ITEMS.length +
    '  |  Correct so far: ' + score, innerW), pad, y, lineH) + 4;

  // item card
  textSize(fs + 2);
  textStyle(BOLD);
  const cardLines = wrapText(it.text, innerW - 24);
  const cardH = cardLines.length * cardLH + 18;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  fill('black');
  drawLines(cardLines, pad + 12, y + 10, cardLH);
  textStyle(NORMAL);
  y += cardH + 8;

  // question
  textSize(fs);
  fill('navy');
  textStyle(BOLD);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, lineH) + 6;
  textStyle(NORMAL);

  // feedback
  if (!committed) {
    fill('black');
    y = drawLines(wrapText('Choose a tool class from the list below and press Submit. ' +
      'Each item has one attempt.', innerW), pad, y, lineH);
  } else {
    const ok = isCorrect(current, chosen);
    const col = ok ? COLOR_CORRECT : COLOR_WRONG;
    textStyle(BOLD);
    const vLines = wrapText((ok ? '✓ ' : '✗ ') + verdictText(current, chosen), innerW - 20);
    textStyle(NORMAL);
    const wLines = wrapText(it.why, innerW - 20);
    const boxH = (vLines.length + wLines.length) * lineH + 16;
    fill(ok ? FILL_CORRECT : FILL_WRONG);
    stroke(col);
    strokeWeight(2);
    rect(pad, y, innerW, boxH, 8);
    strokeWeight(1);
    textStyle(BOLD);
    fill(col);
    let yy = drawLines(vLines, pad + 10, y + 8, lineH);
    textStyle(NORMAL);
    fill('black');
    drawLines(wLines, pad + 10, yy, lineH);
    y += boxH;
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(fs);
  fill('black');
  y = drawLines(['All ' + ITEMS.length + ' items answered'], pad, y, lineH) + 4;

  // score
  textSize(fs + 8);
  textStyle(BOLD);
  y = drawLines([scoreLine(score)], pad, y, fs + 14);
  textSize(fs);
  const ok = masteryMet(score);
  fill(ok ? COLOR_CORRECT : COLOR_WRONG);
  const masteryStr = ok
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of ' + ITEMS.length + ' correct on the first attempt.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of ' + ITEMS.length + ' correct on the first attempt are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, lineH) + 10;
  textStyle(NORMAL);

  // items grouped by class
  fill('black');
  textStyle(BOLD);
  y = drawLines(['Items grouped by class'], pad, y, lineH) + 2;
  textStyle(NORMAL);
  fill('dimgray');
  y = drawLines(wrapText('✓ = your answer matched, ✗ = your answer did not match', innerW), pad, y, lineH) + 6;

  const groups = itemsByClass();
  for (let c = 0; c < CLASSES.length; c++) {
    textStyle(BOLD);
    const headLines = wrapText(CLASSES[c].name + ': ' + TOOL_CLASSES[c], innerW - 20);
    textStyle(NORMAL);
    const itemLines = groups[c].map(i => wrapText((answers[i] === ITEMS[i].cls ? '✓ ' : '✗ ') +
      ITEMS[i].id + '. ' + ITEMS[i].text, innerW - 30));
    let bh = headLines.length * lineH + 12;
    for (const il of itemLines) bh += il.length * lineH;
    fill('white');
    stroke('silver');
    strokeWeight(1);
    rect(pad, y, innerW, bh, 8);
    fill('black');
    textStyle(BOLD);
    let yy = drawLines(headLines, pad + 10, y + 6, lineH);
    textStyle(NORMAL);
    for (let k = 0; k < itemLines.length; k++) {
      const i = groups[c][k];
      fill(answers[i] === ITEMS[i].cls ? 'black' : COLOR_WRONG);
      yy = drawLines(itemLines[k], pad + 20, yy, lineH);
    }
    y += bh + 6;
  }
  layoutBottom = y;

  // control region note (no controls remain on the summary screen)
  fill('dimgray');
  noStroke();
  textAlign(LEFT, CENTER);
  text('Reload the page to start again.', 10, drawHeight + controlHeight / 2);
}

// These two functions must be present for width responsive MicroSims
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  chooseFontSize();
  layoutControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
