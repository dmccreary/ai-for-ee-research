// Verification Method Matcher MicroSim
// CANVAS_HEIGHT: 710
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner recommends one of five verification methods for each of eight
// illustrative AI-assisted claims. Eight claims in a fixed order, one attempt each,
// the correct method is always revealed with the "Why" sentence, and the final screen
// shows "n of 8 correct", whether the mastery threshold of 7 was met, and the claims
// grouped by method. The design is width responsive; controls wrap onto two rows when narrow.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 630;
// Control region: two rows of controls = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (from the chapter specification and Table 1 of the chapter)
// ---------------------------------------------------------------
// "guards" is the "What it guards against" column of Table 1 in "Kinds of Checks"
const METHODS = [
  { name: 'Known-answer test', guards: 'Implementation errors' },
  { name: 'Independent method', guards: 'Method-specific errors and shared assumptions' },
  { name: 'Primary source check', guards: 'Misquotation, fabrication, outdated facts' },
  { name: 'Cross-model check', guards: 'Gross errors, a screening aid' },
  { name: 'Replication', guards: 'Non-reproducible results' }
];

// method is the index into METHODS of the correct method
const CLAIMS = [
  { id: 1, text: 'A script reports ENOB = 9.4 for capture-07, and you have never validated the script.',
    method: 0, why: 'Run it on a record whose ENOB you know, to check the implementation before trusting any real result.' },
  { id: 2, text: 'A model\'s summary says Paper P reports 9.2 bits of ENOB at 1 MS/s.',
    method: 2, why: 'The claim is about what a paper says, and only the paper can settle it.' },
  { id: 3, text: 'The FFT-based ENOB is 9.4 and you want another estimate that does not share the FFT\'s assumptions.',
    method: 1, why: 'A different method, such as a sine fit, can disagree for different reasons.' },
  { id: 4, text: 'An agent labeled 300 abstracts relevant or not, and you want a cheap screen for likely mislabels before sampling by hand.',
    method: 3, why: 'A second model\'s disagreement points to items worth reading, at very low cost.' },
  { id: 5, text: 'A colleague wants to reuse your figure, and you must confirm it regenerates from raw data on a clean machine.',
    method: 4, why: 'The question is whether the result can be reproduced from the raw inputs and code.' },
  { id: 6, text: 'A model states "the standard requires jitter below 10 ps in section 4.3".',
    method: 2, why: 'A requirement is quoted from a document, and the document must be read.' },
  { id: 7, text: 'You doubt a simulation result because a model-written netlist might misstate a component value.',
    method: 1, why: 'A hand calculation of the expected value is a different route to the same quantity.' },
  { id: 8, text: 'A result must hold for a different batch of devices before you publish a claim.',
    method: 4, why: 'The claim is that the result recurs, which only another run can show.' }
];

const QUESTION = 'What could be wrong with this claim, and which check would reveal it?';
const MASTERY = 7;   // mastery requires at least 7 of 8 correct on the first attempt
const PLACEHOLDER = 'Choose a method';

// Color-blind-safe pair (blue / orange); every color cue also has a symbol and words
const OK_STROKE = 'royalblue';
const OK_FILL = 'lavender';
const OK_TEXT = 'navy';
const BAD_STROKE = 'darkorange';
const BAD_FILL = 'papayawhip';
const BAD_TEXT = 'saddlebrown';

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let claimPos = 0;        // index of the current claim (fixed order 0..7)
let committed = false;   // has the current claim been submitted?
let chosen = -1;         // method index chosen for the current claim
let picks = [];          // committed method index for each claim in this run
let runScore = 0;        // correct answers so far in this run
let runHistory = [];     // scores of completed runs
let runNumber = 1;
let finished = false;    // summary screen showing
let summaryPage = 0;
let summaryPageCount = 1;
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let methodSelect;
let submitButton;
let nextButton;
let moreButton;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(297);   // Verification
// Concept ConceptID of each method (index into METHODS). Known-answer test has no concept in the
// learning graph, so it stays unmapped (null) and its claims emit with no concept.
const METHOD_CONCEPT = [null, 299, 300, 301, 303];  // Independent Check, Primary Source Check, Cross Model Check, Result Replication
let lrs = null, claimStart = 0;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  methodSelect = createSelect();
  methodSelect.parent(document.querySelector('main'));
  methodSelect.option(PLACEHOLDER, '');
  for (let m = 0; m < METHODS.length; m++) methodSelect.option(METHODS[m].name, String(m));
  methodSelect.style('font-size', '16px');
  methodSelect.style('padding', '3px 4px');
  methodSelect.attribute('aria-label', 'Verification method');
  methodSelect.changed(methodChanged);

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  onActivate(submitButton, submitPressed);

  nextButton = createButton('Next Claim');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  onActivate(nextButton, nextPressed);

  moreButton = createButton('Next Page');
  moreButton.parent(document.querySelector('main'));
  styleButton(moreButton);
  onActivate(moreButton, nextSummaryPage);

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Verification Method Matcher', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Verification Method Matcher MicroSim', pageDwell: true });
  }

  startRun();

  describe('Verification Method Matcher. Eight illustrative claims are shown one at a time in a ' +
    'fixed order, with a table of five verification methods and what each guards against: ' +
    'known-answer test, independent method, primary source check, cross-model check, and replication. ' +
    'Choose a method in the drop-down list and press Submit. Each claim gets one attempt. The sim says ' +
    'whether the choice was correct, names the better-fitting method, and gives the reason. After claim 8 ' +
    'it shows the score out of 8, whether the mastery threshold of 7 was met, and the claims grouped by method.');

  noLoop(); // nothing animates; redraw only when the state changes
}

// Use the DOM click event (not p5 mousePressed, which listens for pointer down)
// so the buttons also work from the keyboard with Enter or Space.
function onActivate(b, handler) {
  b.elt.addEventListener('click', handler);
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Run logic
// ---------------------------------------------------------------
function startRun() {
  claimPos = 0;
  committed = false;
  chosen = -1;
  picks = [];
  runScore = 0;
  finished = false;
  summaryPage = 0;
  summaryPageCount = 1;
  claimStart = Date.now();
  methodSelect.selected('');
  updateControls();
  redraw();
}

function currentClaim() {
  return CLAIMS[claimPos];
}

function methodChanged() {
  if (finished || committed) return;
  const v = methodSelect.value();
  chosen = (v === '') ? -1 : parseInt(v, 10);
  updateControls();
  redraw();
}

// Commit the chosen method: one attempt per claim, no change after submit
function commitChoice(m) {
  if (finished || committed || m < 0 || m >= METHODS.length) return false;
  chosen = m;
  committed = true;
  picks[claimPos] = m;
  if (m === currentClaim().method) runScore++;
  return true;
}

function submitPressed() {
  if (commitChoice(chosen)) {
    if (lrs) {
      const cl = currentClaim(), cid = METHOD_CONCEPT[cl.method];
      if (cid === null) console.warn('[verification-method-matcher] no concept mapped for "' + METHODS[cl.method].name + '"');
      lrs.question('q-claim-' + cl.id, { name: 'Claim ' + cl.id + ': ' + cl.text,
                                         concept: cid === null ? undefined : LRS.conceptId(cid) })
        .answer({ success: chosen === cl.method, response: LRS.slug(METHODS[chosen].name),
                  durationMs: Date.now() - claimStart, extensions: { 'run-number': runNumber } });
    }
    updateControls();
    redraw();
  }
}

function nextPressed() {
  if (finished) {          // button reads "Start Over"
    runNumber++;
    startRun();
    return;
  }
  if (!committed) return;
  if (claimPos < CLAIMS.length - 1) {
    claimPos++;
    claimStart = Date.now();
    committed = false;
    chosen = -1;
    methodSelect.selected('');
  } else {
    finished = true;
    runHistory.push(runScore);
    summaryPage = 0;
  }
  updateControls();
  redraw();
}

function masteryMet(score) {
  return score >= MASTERY;
}

// Feedback headline for a committed choice (texts from the specification)
function feedbackHeadline(claim, m) {
  if (m === claim.method) return 'Correct: ' + METHODS[claim.method].name + '.';
  return 'The better fit is ' + METHODS[claim.method].name + '.';
}

function scoreLine(score) {
  return score + ' of ' + CLAIMS.length + ' correct';
}

function nextSummaryPage() {
  summaryPage = (summaryPage + 1) % summaryPageCount;
  redraw();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  if (finished) {
    methodSelect.hide();
    submitButton.hide();
    nextButton.html('Start Over');
    setEnabled(nextButton, true);
  } else {
    methodSelect.show();
    submitButton.show();
    setEnabled(methodSelect, !committed);
    setEnabled(submitButton, !committed && chosen >= 0);
    nextButton.html(claimPos === CLAIMS.length - 1 ? 'See Score' : 'Next Claim');
    setEnabled(nextButton, committed);
  }
  if (finished && summaryPageCount > 1) moreButton.show();
  else moreButton.hide();
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a second row when needed
function layoutControls() {
  const visible = [];
  if (!finished) { visible.push(methodSelect); visible.push(submitButton); }
  if (finished && summaryPageCount > 1) visible.push(moreButton);
  visible.push(nextButton);
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
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(24);
  text('Verification Method Matcher', canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (finished) drawSummary(44);
  else drawPlay(44);
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

function historyText() {
  if (runHistory.length === 0) return '';
  const shown = runHistory.slice(-5);
  const first = runHistory.length - shown.length + 1;
  const parts = shown.map((s, i) => 'Run ' + (first + i) + ': ' + s + ' of 8');
  return 'Scores by run: ' + parts.join(', ');
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const claim = currentClaim();

  // status line
  textSize(16);
  fill('black');
  const status = 'Run ' + runNumber + ' | Correct so far: ' + runScore;
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 2;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  // claim card
  textSize(18);
  textStyle(BOLD);
  const claimLines = wrapText(claim.text, innerW - 24);
  const cardH = 24 + claimLines.length * 23 + 10;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  textSize(16);
  textStyle(NORMAL);
  fill('dimgray');
  drawLines(['Claim ' + claim.id + ' of 8 (illustrative)'], pad + 12, y + 6, 20);
  textSize(18);
  textStyle(BOLD);
  fill('black');
  drawLines(claimLines, pad + 12, y + 28, 23);
  textStyle(NORMAL);
  y += cardH + 8;

  // table of the five methods and what each guards against
  textSize(16);
  textStyle(BOLD);
  fill('black');
  y = drawLines(['Methods and what each guards against'], pad, y, 20) + 2;
  for (let m = 0; m < METHODS.length; m++) {
    const isAnswer = committed && m === claim.method;
    const isWrongPick = committed && m === chosen && m !== claim.method;
    const isSelected = !committed && m === chosen;
    let marker = '';
    let tag = '';
    if (isAnswer) { marker = '✓ '; tag = m === chosen ? ' (your choice, correct)' : ' (better fit)'; }
    if (isWrongPick) { marker = '✗ '; tag = ' (your choice)'; }
    if (isSelected) { marker = '▸ '; tag = ' (selected)'; }

    textStyle(BOLD);
    const nameStr = marker + METHODS[m].name + tag + ':';
    textStyle(NORMAL);
    const rowLines = wrapRichRow(nameStr, METHODS[m].guards, innerW - 20);
    const rowH = rowLines.length * 20 + 6;

    if (isAnswer) { fill(OK_FILL); stroke(OK_STROKE); strokeWeight(3); }
    else if (isWrongPick) { fill(BAD_FILL); stroke(BAD_STROKE); strokeWeight(3); }
    else if (isSelected) { fill('white'); stroke('dimgray'); strokeWeight(2); }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(pad, y, innerW, rowH, 6);
    strokeWeight(1);
    drawRichRow(rowLines, pad + 10, y + 3);
    y += rowH + 3;
  }
  y += 4;

  // feedback
  if (!committed) {
    fill('black');
    textSize(16);
    y = drawLines(wrapText('Choose a method below and press Submit. One attempt per claim; ' +
      'it cannot be changed after you submit.', innerW), pad, y, 20);
  } else {
    const correct = chosen === claim.method;
    textSize(18);
    textStyle(BOLD);
    fill(correct ? OK_TEXT : BAD_TEXT);
    y = drawLines(wrapText((correct ? '✓ ' : '✗ ') + feedbackHeadline(claim, chosen), innerW), pad, y, 23);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    y = drawLines(wrapText('Why: ' + claim.why, innerW), pad, y, 20);
  }
  layoutBottom = y;
}

// A table row is a bold method name followed by the plain "guards against" text.
// Returns lines as arrays of {s, bold} segments.
function wrapRichRow(boldStr, plainStr, maxW) {
  const words = [];
  for (const w of boldStr.split(' ')) words.push({ s: w, bold: true });
  for (const w of plainStr.split(' ')) words.push({ s: w, bold: false });
  const lines = [];
  let line = [];
  let lineW = 0;
  for (const w of words) {
    textStyle(w.bold ? BOLD : NORMAL);
    const ww = textWidth(w.s);
    const sp = line.length ? textWidth(' ') : 0;
    if (line.length && lineW + sp + ww > maxW) {
      lines.push(line);
      line = [];
      lineW = 0;
    }
    line.push(w);
    lineW += (line.length > 1 ? textWidth(' ') : 0) + ww;
  }
  if (line.length) lines.push(line);
  textStyle(NORMAL);
  return lines;
}

function drawRichRow(lines, x, y) {
  textAlign(LEFT, TOP);
  noStroke();
  fill('black');
  for (const line of lines) {
    let xx = x;
    for (let i = 0; i < line.length; i++) {
      const w = line[i];
      textStyle(w.bold ? BOLD : NORMAL);
      const s = (i < line.length - 1) ? w.s + ' ' : w.s;
      noStroke();
      text(s, xx, y);
      xx += textWidth(s);
    }
    y += 20;
  }
  textStyle(NORMAL);
}

// Claims grouped by their correct method, in method order
function groupsByMethod() {
  return METHODS.map((meth, m) => ({
    method: m,
    claims: CLAIMS.filter(c => c.method === m)
  }));
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(16);
  fill('black');
  y = drawLines(['Run ' + runNumber + ' complete'], pad, y, 20) + 2;

  // score
  textSize(24);
  textStyle(BOLD);
  fill('black');
  y = drawLines([scoreLine(runScore)], pad, y, 30);
  textSize(16);
  const mastered = masteryMet(runScore);
  fill(mastered ? OK_TEXT : BAD_TEXT);
  const masteryStr = mastered
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 8 correct.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of 8 correct are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 2;
  textStyle(NORMAL);

  fill('black');
  y = drawLines(wrapText(historyText(), innerW), pad, y, 20) + 6;

  textStyle(BOLD);
  y = drawLines(['Claims grouped by method'], pad, y, 20) + 4;
  textStyle(NORMAL);

  // measure each method group at the current width, then split groups into pages
  const groups = groupsByMethod().map(g => {
    const items = g.claims.map(c => {
      const pick = picks[c.id - 1];
      const ok = pick === c.method;
      const prefix = (ok ? '✓ ' : '✗ ') + 'Claim ' + c.id +
        (ok ? ' (you chose it): ' : ' (you chose ' + METHODS[pick].name + '): ');
      return { ok, lines: wrapText(prefix + c.text, innerW - 20) };
    });
    let h = 28;
    for (const it of items) h += it.lines.length * 20 + 4;
    return { method: g.method, items, h: h + 6 };
  });
  const footerH = 24;
  const avail = drawHeight - y - footerH - 4;
  const pages = [];
  let cur = [];
  let used = 0;
  for (const g of groups) {
    if (cur.length > 0 && used + g.h > avail) {
      pages.push(cur);
      cur = [];
      used = 0;
    }
    cur.push(g);
    used += g.h + 6;
  }
  if (cur.length > 0) pages.push(cur);
  summaryPageCount = pages.length;
  if (summaryPage >= summaryPageCount) summaryPage = 0;

  for (const g of pages[summaryPage]) {
    fill('white');
    stroke('silver');
    strokeWeight(1);
    rect(pad, y, innerW, g.h, 8);
    fill('black');
    textStyle(BOLD);
    drawLines([METHODS[g.method].name], pad + 10, y + 6, 20);
    textStyle(NORMAL);
    let yy = y + 28;
    for (const it of g.items) {
      fill(it.ok ? OK_TEXT : BAD_TEXT);
      yy = drawLines(it.lines, pad + 10, yy, 20) + 4;
    }
    y += g.h + 6;
  }
  layoutBottom = y;

  if (summaryPageCount > 1) {
    fill('dimgray');
    textSize(16);
    noStroke();
    textAlign(LEFT, TOP);
    text('Methods: page ' + (summaryPage + 1) + ' of ' + summaryPageCount,
      pad, drawHeight - footerH);
  }
  syncMoreButton();
}

// The page count is known only after measuring text, so show/hide the Next Page button here
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
