// Failure Case Root Cause Analyzer MicroSim
// CANVAS_HEIGHT: 830
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner reads six illustrative failure cases in a fixed order and, for each one, commits one
// of six root causes. One attempt per case. After each submission the sim says whether the choice
// was correct, always reveals the correct cause, the control that would have caught the failure,
// and the "Why" sentence. After case 6 it shows "n of 6 correct", whether the mastery threshold
// of 5 was met, and a table of the six causes with their controls.
// The design is width responsive; controls reflow onto two rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 750;
// Control region: two rows of controls = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let twoColumnWidth = 600;   // at or above this inner width the root causes sit in two columns

// Color-blind-safe colors (Okabe-Ito blue and vermillion). Meaning is also carried by the
// check and cross symbols and by the words "Correct" and "The root cause is".
const OK_STROKE = '#0072B2';
const OK_FILL = '#E3F0F9';
const BAD_STROKE = '#D55E00';
const BAD_FILL = '#FBE8DC';

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const QUESTION = 'What was missing that let this through?';
const CAUSES = [
  'Missing sanity check',
  'Unverified model claim',
  'Unreviewed diff',
  'Environment drift',
  'Scope too broad',
  'Untraceable claim'
];

// cause is the index into CAUSES
const CASES = [
  { text: 'A 10 versus 20 log10 error gave a 10-bit ADC an ENOB of about 18 bits, and it was noticed only when the figure was plotted.',
    cause: 0,
    control: 'A numerical check against the nominal resolution (Chapter 13)',
    why: 'The result exceeded a definitional limit, which a check would have flagged at once.' },
  { text: 'A literature summary cited a paper for a claim that it does not make.',
    cause: 1,
    control: 'A primary source check with the location of the claim (Chapters 11 and 17)',
    why: 'The claim was never compared with the paper.' },
  { text: 'An agent\'s edit to a results paragraph changed a measured value from 9.2 to 9.6 bits while its summary said "fixed wording".',
    cause: 2,
    control: 'Diff review and a number check (Chapters 5 and 15)',
    why: 'The change was visible in the diff and was not read.' },
  { text: 'An analysis script that worked in March fails in October after a library update.',
    cause: 3,
    control: 'A pinned environment and a rerun of known-answer tests (Chapter 13)',
    why: 'The environment was not recorded or pinned.' },
  { text: 'A single skill that did analysis, wrote text, and filed tickets became unreliable at all three.',
    cause: 4,
    control: 'Single-purpose skills with their own tests (Chapter 7)',
    why: 'The skill had accumulated jobs without tests for each.' },
  { text: 'The abstract and a figure caption quote different improvement figures, and neither names a source.',
    cause: 5,
    control: 'A claim-to-source table with measured, cited, or expected labels (Chapters 11 and 15)',
    why: 'The numbers were not tied to evidence.' }
];

const MASTERY = 5;   // mastery requires at least 5 of 6 correct on the first (only) attempt

// ---------------------------------------------------------------
// Pure logic (no drawing): the answer key and the score
// ---------------------------------------------------------------
function isCorrect(caseIndex, choice) {
  return CASES[caseIndex].cause === choice;
}

// Feedback headline for one committed choice
function feedbackTitle(caseIndex, choice) {
  const cause = CAUSES[CASES[caseIndex].cause];
  return isCorrect(caseIndex, choice) ? 'Correct: ' + cause + '.' : 'The root cause is ' + cause + '.';
}

// Score line and mastery statement for a list of committed choices (one per case)
function scoreOf(choices) {
  let n = 0;
  for (let i = 0; i < choices.length; i++) if (isCorrect(i, choices[i])) n++;
  return n;
}

function scoreLine(n) {
  return n + ' of ' + CASES.length + ' correct';
}

function masteryMet(n) {
  return n >= MASTERY;
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let caseIndex = 0;       // 0..5, fixed order
let committed = false;   // has the current case been answered?
let choices = [];        // committed choice for each answered case
let finished = false;    // summary screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let causeSelect;
let submitButton;
let nextButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  causeSelect = createSelect();
  causeSelect.parent(document.querySelector('main'));
  causeSelect.option('Choose a root cause', '-1');
  for (let c = 0; c < CAUSES.length; c++) causeSelect.option((c + 1) + '. ' + CAUSES[c], String(c));
  causeSelect.selected('-1');
  causeSelect.style('font-size', '16px');
  causeSelect.style('padding', '3px');
  causeSelect.changed(selectionChanged);

  submitButton = makeButton('Submit', submitChoice);
  nextButton = makeButton('Next Case', nextPressed);

  updateControls();

  describe('Failure Case Root Cause Analyzer. Six illustrative failure cases are shown one at a ' +
    'time in a fixed order, with the question: ' + QUESTION + ' Six root causes are listed: ' +
    CAUSES.join(', ') + '. Choose one in the drop-down list and press Submit. Each case has one ' +
    'attempt. The sim then says Correct, or names the root cause, and shows the control that would ' +
    'have caught the failure and why. After case 6 it shows the number correct out of 6, whether ' +
    'the mastery threshold of 5 was met, and a table of the six causes with their controls.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function makeButton(label, handler) {
  const b = createButton(label);
  b.parent(document.querySelector('main'));
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
  // a native click event fires for the mouse and for Enter or Space on a focused button
  // (p5's mousePressed listens to mousedown only, which the keyboard never sends)
  b.elt.addEventListener('click', handler);
  return b;
}

// ---------------------------------------------------------------
// Activity logic
// ---------------------------------------------------------------
function selectedCause() {
  return parseInt(causeSelect.value(), 10);
}

function selectionChanged() {
  updateControls();
  redraw();
}

// Commit the choice: one attempt per case, no change after submitting
function submitChoice() {
  if (finished || committed) return;
  const c = selectedCause();
  if (c < 0) return;
  choices.push(c);
  committed = true;
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished || !committed) return;
  if (caseIndex < CASES.length - 1) {
    caseIndex++;
    committed = false;
    causeSelect.selected('-1');
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  if (finished) {
    causeSelect.hide();
    submitButton.hide();
    nextButton.hide();
    return;
  }
  causeSelect.show();
  submitButton.show();
  nextButton.show();
  setEnabled(causeSelect, !committed);
  setEnabled(submitButton, !committed && selectedCause() >= 0);
  nextButton.html(caseIndex === CASES.length - 1 ? 'See Score' : 'Next Case');
  setEnabled(nextButton, committed);
  layoutControls();
}

function setEnabled(c, on) {
  if (on) c.removeAttribute('disabled');
  else c.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a second row when needed
function layoutControls() {
  if (finished) return;
  const visible = [causeSelect, submitButton, nextButton];
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

  const innerW = canvasWidth - 2 * pad;

  // title (wraps onto two lines at narrow widths)
  fill('black');
  textSize(24);
  textStyle(BOLD);
  let y = 8;
  y = drawLines(wrapText('Failure Case Root Cause Analyzer', innerW), pad, y, 30, CENTER);
  textStyle(NORMAL);
  y += 4;

  if (finished) drawSummary(y, innerW);
  else drawPlay(y, innerW);
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

// Draw wrapped lines; returns the y below the last line. align CENTER centers on the canvas.
function drawLines(lines, x, y, lineH, align) {
  noStroke();
  if (align === CENTER) textAlign(CENTER, TOP);
  else textAlign(LEFT, TOP);
  for (const ln of lines) {
    text(ln, align === CENTER ? canvasWidth / 2 : x, y);
    y += lineH;
  }
  return y;
}

function drawPlay(y, innerW) {
  const cs = CASES[caseIndex];

  // status line
  textSize(16);
  fill('dimgray');
  const status = 'Case ' + (caseIndex + 1) + ' of ' + CASES.length +
    '  |  Correct so far: ' + scoreOf(choices);
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 6;

  // case card with the "illustrative" label
  textSize(16);
  textStyle(BOLD);
  const headLines = wrapText('Failure case ' + (caseIndex + 1) + ' (illustrative)', innerW - 24);
  textStyle(NORMAL);
  textSize(18);
  const caseLines = wrapText(cs.text, innerW - 24);
  const cardH = headLines.length * 20 + caseLines.length * 24 + 20;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  textSize(16);
  textStyle(BOLD);
  fill('dimgray');
  let yy = drawLines(headLines, pad + 12, y + 8, 20) + 2;
  textStyle(NORMAL);
  textSize(18);
  fill('black');
  drawLines(caseLines, pad + 12, yy, 24);
  y += cardH + 10;

  // question
  textSize(18);
  textStyle(BOLDITALIC);
  fill('navy');
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 24) + 4;
  textStyle(NORMAL);

  // six root causes
  y = drawCauses(y, innerW) + 8;

  // feedback
  textSize(16);
  if (!committed) {
    fill('black');
    y = drawLines(wrapText('Choose a root cause in the drop-down list below and press Submit. ' +
      'Each case has one attempt, and the choice cannot be changed after you submit it.', innerW),
      pad, y, 20);
  } else {
    const choice = choices[caseIndex];
    const ok = isCorrect(caseIndex, choice);
    textStyle(BOLD);
    const titleLines = wrapText((ok ? '✓ ' : '✗ ') + feedbackTitle(caseIndex, choice), innerW - 20);
    const controlLines = wrapText('Control that would have caught it: ' + cs.control + '.', innerW - 20);
    textStyle(NORMAL);
    const whyLines = wrapText('Why: ' + cs.why, innerW - 20);
    const boxH = (titleLines.length + controlLines.length + whyLines.length) * 20 + 18;
    fill(ok ? OK_FILL : BAD_FILL);
    stroke(ok ? OK_STROKE : BAD_STROKE);
    strokeWeight(2);
    rect(pad, y, innerW, boxH, 8);
    strokeWeight(1);
    fill('black');
    textStyle(BOLD);
    yy = drawLines(titleLines, pad + 10, y + 6, 20) + 3;
    yy = drawLines(controlLines, pad + 10, yy, 20) + 3;
    textStyle(NORMAL);
    drawLines(whyLines, pad + 10, yy, 20);
    y += boxH;
  }
  layoutBottom = y;
}

// The six root causes as numbered boxes; before Submit the picked one is outlined,
// after Submit the correct cause is marked with a check and a wrong pick with a cross
function drawCauses(y, innerW) {
  const cols = innerW >= twoColumnWidth ? 2 : 1;
  const colW = cols === 2 ? (innerW - pad) / 2 : innerW;
  const rows = Math.ceil(CAUSES.length / cols);
  const picked = committed ? choices[caseIndex] : selectedCause();
  const answer = CASES[caseIndex].cause;
  textSize(16);

  // wrap every label, then give each row the height of its tallest box
  const labels = [];
  const rowLines = new Array(rows).fill(1);
  for (let c = 0; c < CAUSES.length; c++) {
    let marker = '';
    if (committed && c === answer) marker = '✓ ';
    else if (c === picked) marker = committed ? '✗ ' : '▶ ';
    let label = marker + (c + 1) + '. ' + CAUSES[c];
    if (committed && c === picked) label += ' (your choice)';
    textStyle(c === picked || (committed && c === answer) ? BOLD : NORMAL);
    labels.push(wrapText(label, colW - 20));
    rowLines[c % rows] = Math.max(rowLines[c % rows], labels[c].length);
  }
  const rowTop = [y];
  for (let r = 0; r < rows; r++) rowTop.push(rowTop[r] + rowLines[r] * 20 + 8 + 4);

  for (let c = 0; c < CAUSES.length; c++) {
    // fill column 1 top to bottom, then column 2
    const col = Math.floor(c / rows);
    const row = c % rows;
    const x = pad + col * (colW + pad);
    const by = rowTop[row];
    const boxH = rowLines[row] * 20 + 8;
    if (committed && c === answer) {
      fill(OK_FILL); stroke(OK_STROKE); strokeWeight(3);
    } else if (committed && c === picked) {
      fill(BAD_FILL); stroke(BAD_STROKE); strokeWeight(3);
    } else if (!committed && c === picked) {
      fill('white'); stroke('navy'); strokeWeight(3);
    } else {
      fill('white'); stroke('silver'); strokeWeight(1);
    }
    rect(x, by, colW, boxH, 6);
    strokeWeight(1);
    fill('black');
    textStyle(c === picked || (committed && c === answer) ? BOLD : NORMAL);
    drawLines(labels[c], x + 10, by + 4, 20);
    textStyle(NORMAL);
  }
  return rowTop[rows] - 4;
}

function drawSummary(y, innerW) {
  const n = scoreOf(choices);

  textSize(26);
  textStyle(BOLD);
  fill('black');
  y = drawLines([scoreLine(n)], pad, y, 32);
  textSize(16);
  const met = masteryMet(n);
  fill(met ? OK_STROKE : BAD_STROKE);
  const mastery = met
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 6 correct on the first attempt.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of 6 correct are needed.';
  y = drawLines(wrapText(mastery, innerW), pad, y, 20) + 8;
  textStyle(NORMAL);

  // table of the six causes with their controls
  fill('black');
  textStyle(BOLD);
  y = drawLines(wrapText('The six root causes and the controls that catch them', innerW), pad, y, 20) + 4;
  textStyle(NORMAL);

  const wide = innerW >= twoColumnWidth;
  const caseW = wide ? 78 : 52;
  const causeW = wide ? 200 : innerW - caseW;
  const ctrlX = wide ? pad + caseW + causeW : pad + caseW;
  const ctrlW = wide ? innerW - caseW - causeW : innerW - caseW;

  if (wide) {
    // header row
    fill('lavender');
    stroke('silver');
    rect(pad, y, innerW, 26);
    fill('black');
    noStroke();
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Case', pad + 8, y + 4);
    text('Root cause', pad + caseW + 8, y + 4);
    text('Control that would have caught it', ctrlX + 8, y + 4);
    textStyle(NORMAL);
    y += 26;
  }

  for (let i = 0; i < CASES.length; i++) {
    const cs = CASES[i];
    const ok = isCorrect(i, choices[i]);
    textStyle(BOLD);
    const causeLines = wrapText(CAUSES[cs.cause], causeW - 16);
    textStyle(NORMAL);
    const ctrlLines = wrapText(cs.control, ctrlW - 16);
    const rowH = wide
      ? Math.max(causeLines.length, ctrlLines.length) * 20 + 10
      : (causeLines.length + ctrlLines.length) * 20 + 10;
    fill(i % 2 === 0 ? 'white' : 'ghostwhite');
    stroke('silver');
    rect(pad, y, innerW, rowH);
    // case number and the learner's result (symbol and color)
    fill(ok ? OK_STROKE : BAD_STROKE);
    noStroke();
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text((ok ? '✓ ' : '✗ ') + (i + 1), pad + 8, y + 5);
    fill('black');
    if (wide) {
      drawLines(causeLines, pad + caseW + 8, y + 5, 20);
      textStyle(NORMAL);
      drawLines(ctrlLines, ctrlX + 8, y + 5, 20);
    } else {
      const yy = drawLines(causeLines, pad + caseW, y + 5, 20);
      textStyle(NORMAL);
      drawLines(ctrlLines, pad + caseW, yy, 20);
    }
    y += rowH;
  }
  y += 6;
  fill('dimgray');
  textSize(16);
  y = drawLines(wrapText('✓ correct, ✗ missed. All six cases are illustrative. ' +
    'Reload the page to start again.', innerW), pad, y, 20);
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
