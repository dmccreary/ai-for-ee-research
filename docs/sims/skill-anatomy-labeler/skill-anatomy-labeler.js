// Skill Anatomy Labeler MicroSim
// CANVAS_HEIGHT: 790
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner labels eight lines or files of the enob-report skill as
// Skill name, Skill description, Skill instructions, or Supporting file.
// One attempt per item in a fixed order, feedback with the "Why" sentence,
// and a final score of n of 8 correct (mastery at 7 or more).
// Width responsive: the directory tree sits beside SKILL.md on wide screens
// and above it on narrow ones.

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 740;
// Control region: one row of controls (a second row is used only on very narrow screens)
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const LABELS = ['Skill name', 'Skill description', 'Skill instructions', 'Supporting file'];

const ITEMS = [
  { n: 1, shown: 'name: enob-report', label: 'Skill name',
    why: 'It is the short identifier of the capability.' },
  { n: 2, shown: 'description: Compute ENOB from a coherently sampled ADC record and write a one-page report. Use when the user asks for ENOB, SNDR, or an ADC characterization summary.',
    label: 'Skill description',
    why: 'It states what the skill does and when to use it, which is what the agent reads to decide to load it.' },
  { n: 3, shown: '1. Read the record file the user names. If none is named, ask for it.', label: 'Skill instructions',
    why: 'It is a step of the procedure that is followed once the skill is loaded.' },
  { n: 4, shown: 'Never edit files in data/raw/.', label: 'Skill instructions',
    why: 'It is a constraint in the body of SKILL.md.' },
  { n: 5, shown: 'scripts/enob.py', label: 'Supporting file',
    why: 'It is a script the instructions tell the agent to run, and it lives outside SKILL.md.' },
  { n: 6, shown: 'references/targets.md', label: 'Supporting file',
    why: 'It is a reference document opened only when the instructions point to it.' },
  { n: 7, shown: 'templates/report.md', label: 'Supporting file',
    why: 'It is a template the agent fills in, kept outside SKILL.md.' },
  { n: 8, shown: '3. Compare the result with the target in references/targets.md.', label: 'Skill instructions',
    why: 'It is a procedural step that points to a supporting file.' }
];

// The skill directory tree, as in the chapter. Segments tagged with an item number can be highlighted.
const TREE_LINES = [
  [{ t: 'enob-report/' }],
  [{ t: '├──' }, { t: 'SKILL.md' }],
  [{ t: '├──' }, { t: 'scripts/enob.py', item: 5 }],
  [{ t: '├──' }, { t: 'references/targets.md', item: 6 }],
  [{ t: '└──' }, { t: 'templates/report.md', item: 7 }]
];

// SKILL.md, as in the chapter. An empty array is a blank line.
const SKILL_LINES = [
  [{ t: '---' }],
  [{ t: ITEMS[0].shown, item: 1 }],
  [{ t: ITEMS[1].shown, item: 2 }],
  [{ t: '---' }],
  [],
  [{ t: '# ENOB Report' }],
  [],
  [{ t: ITEMS[2].shown, item: 3 }],
  [{ t: '2. Run scripts/enob.py with the sampling rate and the nominal bits.' }],
  [{ t: ITEMS[7].shown, item: 8 }],
  [{ t: '4. Write the report using templates/report.md.' }],
  [],
  [{ t: ITEMS[3].shown, item: 4 }, { t: 'Report ENOB in bits to one decimal.' }]
];

const QUESTION = 'Which part of the skill is this?';
const MASTERY = 7;   // mastery threshold: at least 7 of 8 correct

// ---------------------------------------------------------------
// Pure logic (also exercised by the node tests)
// ---------------------------------------------------------------
function isCorrectLabel(itemIndex, label) {
  return ITEMS[itemIndex].label === label;
}

function feedbackHeadline(itemIndex, label) {
  const correctLabel = ITEMS[itemIndex].label;
  return isCorrectLabel(itemIndex, label)
    ? 'Correct: ' + correctLabel + '.'
    : 'This is a ' + correctLabel + '.';
}

function finalScoreLine(nCorrect) {
  return nCorrect + ' of 8 correct. ' + (nCorrect >= MASTERY
    ? 'Mastery threshold of ' + MASTERY + ' met.'
    : 'Mastery threshold of ' + MASTERY + ' not met.');
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let current = 0;          // index of the highlighted item (0..7)
let answers = [];         // per item: null | { label, correct }
let layoutBottom = 0;     // lowest y used by drawn content (used for layout testing)

// controls
let labelSelect;
let submitButton;
let nextButton;
let restartButton;

const PLACEHOLDER = 'none';

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  labelSelect = createSelect();
  labelSelect.parent(document.querySelector('main'));
  labelSelect.option('Choose a label…', PLACEHOLDER);
  for (const l of LABELS) labelSelect.option(l, l);
  labelSelect.elt.options[0].disabled = true;
  labelSelect.elt.setAttribute('aria-label', 'Label for the highlighted item');
  labelSelect.style('font-size', '16px');
  labelSelect.style('padding', '4px');
  labelSelect.changed(() => { updateControls(); redraw(); });

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  submitButton.mousePressed(submitLabel);

  nextButton = createButton('Next item');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mousePressed(nextItem);

  restartButton = createButton('Start over');
  restartButton.parent(document.querySelector('main'));
  styleButton(restartButton);
  restartButton.mousePressed(restartPressed);

  restart();

  describe('Skill Anatomy Labeler. The enob-report skill is shown as a directory tree and the ' +
    'full SKILL.md file. One of eight lines or files is highlighted at a time. Choose its label ' +
    'from the menu: Skill name, Skill description, Skill instructions, or Supporting file, and ' +
    'press Submit. The sim says whether the label was correct, names the correct label, and ' +
    'explains why, then highlights the next item. After item 8 it shows the score out of 8 and ' +
    'whether the mastery threshold of 7 was met.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 12px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Activity logic
// ---------------------------------------------------------------
function restart() {
  current = 0;
  answers = ITEMS.map(() => null);
  labelSelect.elt.value = PLACEHOLDER;
  updateControls();
  redraw();
}

// Start over from the button: keyboard focus returns to the label menu
// (not done on page load, so the embedded sim never steals focus)
function restartPressed() {
  restart();
  labelSelect.elt.focus();
}

function chosenLabel() {
  const v = labelSelect.elt.value;
  return v === PLACEHOLDER ? null : v;
}

// One attempt per item: the label is locked once submitted
function submitLabel() {
  if (answers[current]) return;
  const label = chosenLabel();
  if (!label) return;
  answers[current] = { label: label, correct: isCorrectLabel(current, label) };
  updateControls();
  redraw();
  const focusTarget = (current < ITEMS.length - 1) ? nextButton : restartButton;
  focusTarget.elt.focus();
}

function nextItem() {
  if (!answers[current] || current >= ITEMS.length - 1) return;
  current++;
  labelSelect.elt.value = PLACEHOLDER;
  updateControls();
  redraw();
  labelSelect.elt.focus();
}

function countCorrect() {
  return answers.filter(a => a && a.correct).length;
}

function isFinished() {
  return current === ITEMS.length - 1 && !!answers[current];
}

// Enable, disable, show and hide the controls to match the state
function updateControls() {
  const answered = !!answers[current];
  setEnabled(labelSelect, !answered);
  setEnabled(submitButton, !answered && chosenLabel() !== null);
  // Submit is replaced by Next item (or Start over) once the item is answered
  if (answered) submitButton.hide(); else submitButton.show();
  if (answered && !isFinished()) nextButton.show(); else nextButton.hide();
  if (isFinished()) restartButton.show(); else restartButton.hide();
  layoutControls();
}

function setEnabled(c, on) {
  if (on) c.removeAttribute('disabled');
  else c.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a second row when needed
function layoutControls() {
  const visible = [labelSelect];
  if (submitButton.elt.style.display !== 'none') visible.push(submitButton);
  if (nextButton.elt.style.display !== 'none') visible.push(nextButton);
  if (restartButton.elt.style.display !== 'none') visible.push(restartButton);
  const gap = 10;
  let x = 10;
  let y = drawHeight + 10;
  for (const c of visible) {
    const w = c.elt.offsetWidth;
    if (x > 10 && x + w > canvasWidth - 10) {
      x = 10;
      y += 38;
    }
    c.position(x, y);
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

  // title
  fill('black');
  noStroke();
  textFont('sans-serif');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(24);
  text('Skill Anatomy Labeler', canvasWidth / 2, 10);
  textStyle(NORMAL);

  const innerW = canvasWidth - 2 * pad;
  let y = 44;

  // the question on screen
  textSize(18);
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 23);
  textStyle(NORMAL);

  // status line
  textSize(16);
  fill('black');
  const status = 'Item ' + (current + 1) + ' of 8  |  Correct so far: ' + countCorrect();
  y = drawLines(wrapText(status, innerW), pad, y + 2, 20) + 8;

  // the skill: directory tree and SKILL.md
  y = drawSkill(y, innerW) + 10;

  // feedback
  drawFeedback(y, innerW);
}

// Monospace size for the file contents: smaller only on narrow screens
function monoSize() {
  if (canvasWidth >= 900) return 16;
  return canvasWidth >= 700 ? 15 : 13;
}

// Draw the directory tree and SKILL.md panels; returns the y below them
function drawSkill(y, innerW) {
  const ms = monoSize();
  const lh = ms + (canvasWidth >= 600 ? 6 : 4);
  const blankH = canvasWidth >= 600 ? 8 : 6;
  const gutter = 18;      // room for the item marker
  const headerH = 26;

  textFont('monospace');
  textSize(ms);
  let treeTextW = 0;
  for (const line of TREE_LINES) {
    treeTextW = max(treeTextW, textWidth(line.map(s => s.t).join(' ')));
  }
  const treeW = ceil(treeTextW) + gutter + 24;
  const sideBySide = innerW - treeW - 10 >= 400;

  let treeX = pad, treeY = y, skillX, skillY, skillW;
  if (sideBySide) {
    skillX = pad + treeW + 10;
    skillY = y;
    skillW = innerW - treeW - 10;
  } else {
    skillX = pad;
    skillW = innerW;
  }
  const treePanelW = sideBySide ? treeW : innerW;

  // tree panel
  textFont('monospace');
  textSize(ms);
  const treeRows = layoutLines(TREE_LINES, treeX + gutter + 8, treeX + treePanelW - 8, lh, blankH);
  const treeH = headerH + treeRows.height + 12;
  drawPanel(treeX, treeY, treePanelW, treeH, 'Skill directory');
  drawRows(treeRows, treeY + headerH + 4, treeX + 4, lh, ms);

  if (!sideBySide) skillY = treeY + treeH + 8;

  // SKILL.md panel
  textFont('monospace');
  textSize(ms);
  const skillRows = layoutLines(SKILL_LINES, skillX + gutter + 8, skillX + skillW - 8, lh, blankH);
  const skillH = headerH + skillRows.height + 12;
  drawPanel(skillX, skillY, skillW, skillH, 'SKILL.md');
  drawRows(skillRows, skillY + headerH + 4, skillX + 4, lh, ms);

  textFont('sans-serif');
  return sideBySide ? y + max(treeH, skillH) : skillY + skillH;
}

function drawPanel(x, y, w, h, title) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x, y, w, h, 8);
  fill('#e8eef5');
  noStroke();
  rect(x + 1, y + 1, w - 2, 24, 8, 8, 0, 0);
  fill('black');
  textFont('sans-serif');
  textStyle(BOLD);
  textSize(15);
  textAlign(LEFT, TOP);
  text(title, x + 10, y + 5);
  textStyle(NORMAL);
}

// Word-wrap tagged lines. Returns { rows: [{y, pieces:[{x, w, t, item}]}], height }
// with y relative to the top of the block. Wrapped lines are indented by two characters.
function layoutLines(lines, x0, xMax, lh, blankH) {
  const rows = [];
  const spaceW = textWidth(' ');
  let y = 0;
  for (const line of lines) {
    if (line.length === 0) { y += blankH; continue; }
    const words = [];
    for (const seg of line) {
      for (const w of seg.t.split(' ')) if (w.length) words.push({ t: w, item: seg.item });
    }
    let row = { y: y, pieces: [] };
    let x = x0;
    for (const w of words) {
      const ww = textWidth(w.t);
      if (row.pieces.length > 0 && x + ww > xMax) {
        rows.push(row);
        y += lh;
        row = { y: y, pieces: [] };
        x = x0 + 2 * spaceW;
      }
      row.pieces.push({ x: x, w: ww, t: w.t, item: w.item });
      x += ww + spaceW;
    }
    rows.push(row);
    y += lh;
  }
  return { rows: rows, height: y };
}

// Draw the laid-out rows, highlighting the current item
function drawRows(block, top, gutterX, lh, ms) {
  textFont('monospace');   // the same font the rows were measured with
  textSize(ms);
  const item = ITEMS[current].n;
  const ans = answers[current];
  let markerDrawn = false;

  // highlight boxes first, so the text is drawn on top
  for (const row of block.rows) {
    const hp = row.pieces.filter(p => p.item === item);
    if (hp.length === 0) continue;
    const x1 = hp[0].x - 4;
    const x2 = hp[hp.length - 1].x + hp[hp.length - 1].w + 4;
    const ry = top + row.y - 2;
    if (!ans) { fill('#fff3b0'); stroke('#8a6d00'); }
    else if (ans.correct) { fill('#dcecf8'); stroke('#0072b2'); }
    else { fill('#fde3cf'); stroke('#d55e00'); drawingContext.setLineDash([6, 4]); }
    strokeWeight(2);
    rect(x1, ry, x2 - x1, lh, 4);
    drawingContext.setLineDash([]);
    strokeWeight(1);
    if (!markerDrawn) {
      // marker in the gutter: a pointer, not color alone
      fill('#1a1a1a');
      noStroke();
      textAlign(LEFT, TOP);
      textFont('sans-serif');
      text('▶', gutterX, top + row.y);
      textFont('monospace');
      markerDrawn = true;
    }
  }

  // text
  noStroke();
  textAlign(LEFT, TOP);
  for (const row of block.rows) {
    for (const p of row.pieces) {
      fill(p.item === item ? '#000000' : '#2b2b2b');
      textStyle(p.item === item ? BOLD : NORMAL);
      text(p.t, p.x, top + row.y);
    }
  }
  textStyle(NORMAL);
  textFont('sans-serif');
}

function drawFeedback(y, innerW) {
  const ans = answers[current];
  textFont('sans-serif');
  textSize(16);
  if (!ans) {
    fill('black');
    y = drawLines(wrapText('Choose a label for the highlighted item from the menu below, then press ' +
      'Submit. Each item gets one attempt.', innerW), pad, y, 21);
    layoutBottom = y;
    return;
  }
  // result headline with a glyph as well as a color
  textStyle(BOLD);
  textSize(18);
  fill(ans.correct ? '#005a8c' : '#a04400');
  const glyph = ans.correct ? '✓ ' : '✗ ';
  y = drawLines(wrapText(glyph + feedbackHeadline(current, ans.label), innerW), pad, y, 24);
  textStyle(NORMAL);
  textSize(16);
  fill('black');
  y = drawLines(wrapText(ITEMS[current].why, innerW), pad, y, 21);
  if (isFinished()) {
    y += 6;
    textStyle(BOLD);
    textSize(18);
    y = drawLines(wrapText('Final score: ' + finalScoreLine(countCorrect()), innerW), pad, y, 24);
    textStyle(NORMAL);
  }
  layoutBottom = y;
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
function drawLines(lines, x, y, lineH) {
  textAlign(LEFT, TOP);
  for (const ln of lines) {
    noStroke();
    text(ln, x, y);
    y += lineH;
  }
  return y;
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

if (typeof module !== 'undefined') {
  module.exports = { LABELS, ITEMS, TREE_LINES, SKILL_LINES, MASTERY,
                     isCorrectLabel, feedbackHeadline, finalScoreLine };
}
