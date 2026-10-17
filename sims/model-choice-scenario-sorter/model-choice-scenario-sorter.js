// Model Choice Scenario Sorter MicroSim
// CANVAS_HEIGHT: 775
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner recommends one of three access paths (Chat interface, Hosted API,
// Local open-weight model) for each of eight illustrative research scenarios and
// names the single deciding factor. Only the access path is scored.
// Eight scenarios, one attempt each, fixed order. Final score "n of 8 correct",
// mastery at 6 or more, and the misconception exposed by each missed scenario.
// The design is width responsive; controls reflow onto up to three rows.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 660;
// Control region: up to three rows of controls = (3 x 35) + 10 = 115
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const PATHS = [
  { name: 'Chat interface',
    meaning: 'hosted model used through a web or desktop application' },
  { name: 'Hosted API',
    meaning: 'hosted model called from a script' },
  { name: 'Local open-weight model',
    meaning: 'a downloadable model run on hardware the researcher controls' }
];

const FACTORS = [
  'Privacy or data policy',
  'Scale and automation',
  'Reproducibility over time',
  'Capability and effort'
];

// path and factor are indexes into PATHS and FACTORS
const SCENARIOS = [
  { id: 1, text: 'You spend 30 minutes exploring the vocabulary of an unfamiliar topic, with no files and no data.',
    path: 0, factor: 3,
    why: 'An interactive, one-off exploration needs no scripting, no pinned version, and no data handling.' },
  { id: 2, text: 'You must classify 5,000 public abstracts into four categories overnight and save the labels to a file.',
    path: 1, factor: 1,
    why: 'A scripted loop over many inputs needs an API. The data are public, and the cost is a small multiple of the worked example in the chapter.' },
  { id: 3, text: 'You must analyze measured data from an unpublished chip, and the sponsor\'s agreement forbids sending it off-site.',
    path: 2, factor: 0,
    why: 'The data cannot leave the site, so only a model running on controlled hardware is permitted.' },
  { id: 4, text: 'You want a reworded version of one paragraph of your own draft paper.',
    path: 0, factor: 3,
    why: 'A single short text with no data issue is the simplest possible use.' },
  { id: 5, text: 'A nightly job flags regressions in simulation logs, and the same job must be re-runnable with the identical model in three years.',
    path: 2, factor: 2,
    why: 'Hosted models drift and are retired. Weights you hold can be archived and rerun.' },
  { id: 6, text: 'You want help checking a multi-step derivation of a transfer function, once, from a public textbook problem.',
    path: 0, factor: 3,
    why: 'A one-off, checkable task with no data policy issue is served by the interactive tool, using a capable model.' },
  { id: 7, text: 'A lab pipeline must summarize 200 new papers each week and write each summary to a file with the citation.',
    path: 1, factor: 1,
    why: 'A recurring batch with file output needs a scriptable interface. The papers are public.' },
  { id: 8, text: 'A measurement workstation in an RF shielded room has no network connection and you want to parse its logs.',
    path: 2, factor: 0,
    why: 'With no network, a hosted model is not reachable, so only a local model can run there.' }
];

// Misconceptions from the specification. A missed scenario exposes the
// misconception that matches the access path the learner over-applied:
// a wrong pick of Local -> (1), of Hosted API -> (2), of Chat interface -> (3).
const MISCONCEPTIONS = [
  '(3) A chat interface is adequate for any task because the model is the same.',      // wrong pick: Chat interface
  '(2) The strongest hosted model is the right choice for every task.',                  // wrong pick: Hosted API
  '(1) A local model is always the safest or cheapest choice.'                           // wrong pick: Local open-weight model
];

const QUESTION = 'Which access path would you recommend, and why?';
const MASTERY = 6;   // mastery requires a score >= 6 of 8
const NONE = 'none'; // value of the placeholder option in each select

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let pos = 0;              // index of the current scenario (0..7), fixed order
let committed = false;    // has the current scenario been answered?
let chosenPath = -1;
let chosenFactor = -1;
let score = 0;
let missed = [];          // [{scenario, chosenPath}]
let finished = false;     // summary screen showing
let summaryPage = 0;
let summaryPageCount = 1;
let layoutBottom = 0;     // lowest y used by drawn content (used for layout testing)

// controls
let pathSelect;
let factorSelect;
let submitButton;
let nextButton;
let moreButton;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(33);   // Model Selection
let lrs = null, scStart = 0;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  pathSelect = createSelect();
  pathSelect.parent(document.querySelector('main'));
  pathSelect.option('Choose an access path', NONE);
  for (let i = 0; i < PATHS.length; i++) pathSelect.option(PATHS[i].name, String(i));
  styleControl(pathSelect);
  pathSelect.attribute('aria-label', 'Access path');
  pathSelect.changed(selectionChanged);

  factorSelect = createSelect();
  factorSelect.parent(document.querySelector('main'));
  factorSelect.option('Choose the deciding factor', NONE);
  for (let i = 0; i < FACTORS.length; i++) factorSelect.option(FACTORS[i], String(i));
  styleControl(factorSelect);
  factorSelect.attribute('aria-label', 'Deciding factor');
  factorSelect.changed(selectionChanged);

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleControl(submitButton);
  submitButton.mousePressed(submitAnswer);

  nextButton = createButton('Next Scenario');
  nextButton.parent(document.querySelector('main'));
  styleControl(nextButton);
  nextButton.mousePressed(nextPressed);

  moreButton = createButton('More Missed Scenarios');
  moreButton.parent(document.querySelector('main'));
  styleControl(moreButton);
  moreButton.mousePressed(nextSummaryPage);

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Model Choice Scenario Sorter', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Model Choice Scenario Sorter MicroSim', pageDwell: true });
  }
  scStart = Date.now();

  resetSelects();
  updateControls();

  describe('Model Choice Scenario Sorter. Eight illustrative research scenarios are shown one at a ' +
    'time with the three access paths: Chat interface, Hosted API, and Local open-weight model. ' +
    'Choose an access path and the deciding factor from the two drop-down lists below the drawing, ' +
    'then press Submit. The sim says Correct or names the better fit, and gives the reason. ' +
    'Each scenario gets one attempt. After eight scenarios it shows the score out of 8, whether ' +
    'mastery (6 of 8) was met, and the misconception exposed by each missed scenario.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleControl(c) {
  c.style('font-size', '16px');
  c.style('padding', '4px 8px');
  c.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Logic
// ---------------------------------------------------------------
function resetSelects() {
  pathSelect.selected(NONE);
  factorSelect.selected(NONE);
}

function selectionChanged() {
  updateControls();
  redraw();
}

function bothChosen() {
  return pathSelect.value() !== NONE && factorSelect.value() !== NONE;
}

// One attempt per scenario. The score counts only the access path.
function submitAnswer() {
  if (finished || committed || !bothChosen()) return;
  const sc = SCENARIOS[pos];
  chosenPath = parseInt(pathSelect.value());
  chosenFactor = parseInt(factorSelect.value());
  committed = true;
  if (lrs) {
    // only the access path is scored (see header); the deciding factor rides along as an extension
    lrs.question('q-scenario-' + sc.id, { name: 'Scenario ' + sc.id + ': ' + sc.text, concept: PAGE_CONCEPT() })
      .answer({ success: chosenPath === sc.path, response: LRS.slug(PATHS[chosenPath].name),
                durationMs: scStart ? Date.now() - scStart : undefined,
                extensions: { 'deciding-factor': LRS.slug(FACTORS[chosenFactor]) } });
  }
  if (chosenPath === sc.path) {
    score++;
  } else {
    missed.push({ scenario: sc, chosenPath: chosenPath });
  }
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished || !committed) return;
  if (pos < SCENARIOS.length - 1) {
    pos++;
    committed = false;
    chosenPath = -1;
    chosenFactor = -1;
    scStart = Date.now();
    resetSelects();
  } else {
    finished = true;
    summaryPage = 0;
  }
  updateControls();
  redraw();
}

function nextSummaryPage() {
  summaryPage = (summaryPage + 1) % summaryPageCount;
  redraw();
}

// Enable, disable, show and hide the controls to match the state
function updateControls() {
  if (finished) {
    pathSelect.hide();
    factorSelect.hide();
    submitButton.hide();
    nextButton.hide();
  } else {
    pathSelect.show();
    factorSelect.show();
    submitButton.show();
    nextButton.show();
    setEnabled(pathSelect, !committed);
    setEnabled(factorSelect, !committed);
    setEnabled(submitButton, !committed && bothChosen());
    nextButton.html(pos === SCENARIOS.length - 1 ? 'See Score' : 'Next Scenario');
    setEnabled(nextButton, committed);
  }
  if (finished && summaryPageCount > 1) moreButton.show();
  else moreButton.hide();
  layoutControls();
}

function setEnabled(c, on) {
  if (on) c.removeAttribute('disabled');
  else c.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a new row when needed
function layoutControls() {
  const visible = [];
  if (!finished) {
    visible.push(pathSelect, factorSelect, submitButton, nextButton);
  } else if (summaryPageCount > 1) {
    visible.push(moreButton);
  }
  const gap = 10;
  let x = 10;
  let y = drawHeight + 8;
  for (const c of visible) {
    const w = c.elt.offsetWidth;
    if (x > 10 && x + w > canvasWidth - 10) {
      x = 10;
      y += 35;
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

  // title, shrunk if needed to fit narrow widths
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  fitTextSize('Model Choice Scenario Sorter', canvasWidth - 2 * pad, 24, 18);
  text('Model Choice Scenario Sorter', canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (finished) drawSummary(44);
  else drawPlay(44);
}

function fitTextSize(str, maxW, big, small) {
  let s = big;
  textSize(s);
  while (s > small && textWidth(str) > maxW) {
    s--;
    textSize(s);
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
function drawLines(lines, x, y, lineH) {
  textAlign(LEFT, TOP);
  for (const ln of lines) {
    noStroke();
    text(ln, x, y);
    y += lineH;
  }
  return y;
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const sc = SCENARIOS[pos];

  // status line with the illustrative label
  textSize(16);
  fill('dimgray');
  y = drawLines(wrapText('Illustrative scenarios  |  Scenario ' + (pos + 1) + ' of 8  |  Correct so far: ' +
    score, innerW), pad, y, 20) + 2;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 8;
  textStyle(NORMAL);

  // scenario card
  textSize(18);
  textStyle(BOLD);
  const cardLines = wrapText(sc.text, innerW - 24);
  const cardH = cardLines.length * 23 + 18;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  fill('black');
  drawLines(cardLines, pad + 12, y + 10, 23);
  textStyle(NORMAL);
  y += cardH + 10;

  // the three access paths: side by side when wide, stacked when narrow
  textSize(16);
  y = drawPaths(y, sc, innerW) + 6;

  // feedback
  if (!committed) {
    fill('black');
    textSize(16);
    y = drawLines(wrapText('Choose an access path and the deciding factor from the lists below, then ' +
      'press Submit. Each scenario gets one attempt. Only the access path is scored.', innerW), pad, y, 20);
  } else {
    const correct = chosenPath === sc.path;
    textSize(18);
    textStyle(BOLD);
    fill(correct ? 'navy' : 'saddlebrown');
    const verdict = correct ? '✓ Correct: ' + PATHS[sc.path].name + '.'
                            : '✗ The better fit is ' + PATHS[sc.path].name + '.';
    y = drawLines(wrapText(verdict, innerW), pad, y, 24);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    y = drawLines(wrapText(sc.why, innerW), pad, y, 20) + 4;
    // factor feedback (not scored)
    fill('dimgray');
    let fText;
    if (chosenFactor === sc.factor) {
      fText = 'Deciding factor (not scored): you named ' + FACTORS[chosenFactor] + ', which matches.';
    } else {
      fText = 'Deciding factor (not scored): you named ' + FACTORS[chosenFactor] +
        '; the deciding factor here is ' + FACTORS[sc.factor] + '.';
    }
    y = drawLines(wrapText(fText, innerW), pad, y, 20);
  }
  layoutBottom = y;
}

// Draw the three access-path boxes. After a commit the correct path is marked
// with a check and a thick blue border; a wrong pick with an X and an orange border.
function drawPaths(y, sc, innerW) {
  const sideBySide = canvasWidth >= 700;
  const gap = 8;
  const boxW = sideBySide ? (innerW - 2 * gap) / 3 : innerW;
  // measure
  const boxes = PATHS.map((p, i) => {
    const lines = wrapText(p.meaning, boxW - 20);
    return { lines: lines, h: (lines.length + 1) * 20 + 12 };
  });
  const rowH = Math.max(...boxes.map(b => b.h));
  for (let i = 0; i < PATHS.length; i++) {
    const isAnswer = committed && i === sc.path;
    const isWrongPick = committed && i === chosenPath && i !== sc.path;
    let marker = '';
    if (isAnswer) marker = '✓ ';
    if (isWrongPick) marker = '✗ ';
    const bx = sideBySide ? pad + i * (boxW + gap) : pad;
    const bh = sideBySide ? rowH : boxes[i].h;

    if (isAnswer) { fill('lightcyan'); stroke('steelblue'); strokeWeight(3); }
    else if (isWrongPick) { fill('linen'); stroke('darkorange'); strokeWeight(3); }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(bx, y, boxW, bh, 8);
    strokeWeight(1);

    fill('black');
    textStyle(BOLD);
    noStroke();
    textAlign(LEFT, TOP);
    text(marker + PATHS[i].name, bx + 10, y + 6);
    textStyle(NORMAL);
    drawLines(boxes[i].lines, bx + 10, y + 26, 20);
    if (!sideBySide) y += bh + 6;
  }
  if (sideBySide) y += rowH + 6;
  return y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(16);
  fill('dimgray');
  y = drawLines(['Illustrative scenarios  |  All 8 answered'], pad, y, 20) + 2;

  // score
  textSize(24);
  textStyle(BOLD);
  fill('black');
  y = drawLines([score + ' of 8 correct'], pad, y, 30);
  textSize(16);
  const mastered = score >= MASTERY;
  fill(mastered ? 'navy' : 'saddlebrown');
  const masteryStr = mastered
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 8 recommendations match.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of 8 correct recommendations are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 8;
  textStyle(NORMAL);

  // missed scenarios list
  fill('black');
  textStyle(BOLD);
  y = drawLines(['Missed scenarios: ' + missed.length], pad, y, 20) + 4;
  textStyle(NORMAL);

  if (missed.length === 0) {
    y = drawLines(wrapText('None. Every recommendation matched the reasoning in the chapter.', innerW),
      pad, y, 20);
    summaryPageCount = 1;
    layoutBottom = y;
    syncMoreButton();
    return;
  }

  // measure every missed item at the current width, then split into pages
  const items = missed.map(m => {
    textStyle(BOLD);
    const headLines = wrapText('Scenario ' + m.scenario.id + ': ' + m.scenario.text, innerW - 20);
    textStyle(NORMAL);
    const detailLines = wrapText('You chose ' + PATHS[m.chosenPath].name + '; the better fit is ' +
      PATHS[m.scenario.path].name + '.', innerW - 20);
    const misLines = wrapText('Misconception it exposes: ' + MISCONCEPTIONS[m.chosenPath], innerW - 20);
    return { headLines, detailLines, misLines,
      h: (headLines.length + detailLines.length + misLines.length) * 20 + 16 };
  });
  const footerH = 26;
  const avail = drawHeight - y - footerH - 6;
  const pages = [];
  let cur = [];
  let used = 0;
  for (const it of items) {
    if (cur.length > 0 && used + it.h > avail) {
      pages.push(cur);
      cur = [];
      used = 0;
    }
    cur.push(it);
    used += it.h + 6;
  }
  if (cur.length > 0) pages.push(cur);
  summaryPageCount = pages.length;
  if (summaryPage >= summaryPageCount) summaryPage = 0;

  for (const it of pages[summaryPage]) {
    fill('white');
    stroke('darkorange');
    strokeWeight(1);
    rect(pad, y, innerW, it.h, 8);
    fill('black');
    textStyle(BOLD);
    let yy = drawLines(it.headLines, pad + 10, y + 8, 20);
    textStyle(NORMAL);
    yy = drawLines(it.detailLines, pad + 10, yy, 20);
    fill('saddlebrown');
    drawLines(it.misLines, pad + 10, yy, 20);
    y += it.h + 6;
  }
  layoutBottom = y;

  if (summaryPageCount > 1) {
    fill('dimgray');
    textSize(16);
    noStroke();
    textAlign(LEFT, TOP);
    text('Missed scenarios: page ' + (summaryPage + 1) + ' of ' + summaryPageCount,
      pad, drawHeight - footerH);
  }
  syncMoreButton();
}

// The page count is known only after measuring text, so show/hide the More button here
function syncMoreButton() {
  const shouldShow = finished && summaryPageCount > 1;
  const isShown = moreButton.elt.style.display !== 'none';
  if (shouldShow !== isShown) {
    if (shouldShow) moreButton.show(); else moreButton.hide();
    layoutControls();
  }
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
