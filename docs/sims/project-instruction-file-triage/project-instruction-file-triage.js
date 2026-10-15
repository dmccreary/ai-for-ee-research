// Project Instruction File Triage MicroSim
// CANVAS_HEIGHT: 780
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner judges each of eleven lines of an illustrative draft instruction file as a
// Goal, a Convention, a Constraint, or Does not belong. One attempt per line in a fixed
// order. After each submission the sim shows "Correct: <label>." or "This line is <label>."
// with the "Why" sentence and highlights the next line. The end screen shows "n of 11 correct",
// the mastery threshold (9), and where each line that does not belong should live instead.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 700;
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
// ---------------------------------------------------------------
const LABELS = ['Goal', 'Convention', 'Constraint', 'Does not belong'];

// label is the index into LABELS
const LINES = [
  { text: "The project's goal is to show whether a 10-bit SAR ADC in 65 nm reaches ENOB of at least 9.5 at 1 MS/s below 50 µW.",
    label: 0, why: 'It states what the project is for and what success means.' },
  { text: 'Name scripts in lowercase with hyphens, for example enob-sweep.py.',
    label: 1, why: "It states how work is done, so that output matches the project's style." },
  { text: 'Never modify files under data/raw/.',
    label: 2, why: 'It is a boundary that can be checked with a diff.' },
  { text: 'Use NumPy and SciPy only, and do not add new dependencies without asking.',
    label: 2, why: 'It limits what the agent may do and requires approval.' },
  { text: 'Write commit messages in the imperative mood, with a subject line of at most 72 characters.',
    label: 1, why: 'It states a working practice that makes the history uniform.' },
  { text: "Yesterday's run crashed at corner ss_0p9v; I think it was a license server problem.",
    label: 3, why: 'It is a transient debugging note and will be stale. A log or notes file is the right place.',
    belongs: 'A log or notes file. A debugging note is transient and goes stale.' },
  { text: 'Report ENOB in bits with one decimal place, and state the input frequency and record length.',
    label: 1, why: 'It fixes units and reporting form for every result.' },
  { text: 'Do not run simulations expected to take more than 30 minutes without confirming with me.',
    label: 2, why: 'It requires human approval for a costly action.' },
  { text: 'Success means all acceptance criteria in docs/spec.md pass.',
    label: 0, why: 'It defines done, in a checkable way, by pointing at the criteria.' },
  { text: 'Be smart, be careful, and do an excellent job.',
    label: 3, why: 'It is not actionable or checkable and spends context on every turn.',
    belongs: 'Nowhere. Delete it; a rule worth keeping must be specific and checkable.' },
  { text: 'The cluster scheduler API key is: a 32-character key.',
    label: 3, why: 'A secret in a committed file leaks. Keys belong in an environment variable or a secrets manager.',
    belongs: 'An environment variable or a secrets manager, never a committed file.' }
];

const QUESTION = 'Is this line a goal, a convention, a constraint, or not worth putting in the file?';
const MASTERY = 9;   // mastery requires at least 9 of 11 correct

// ---------------------------------------------------------------
// Pure logic (no p5 calls) - also exported for node tests
// ---------------------------------------------------------------
function feedbackHeadline(lineIdx, chosen) {
  const ln = LINES[lineIdx];
  return chosen === ln.label
    ? 'Correct: ' + LABELS[ln.label] + '.'
    : 'This line is ' + LABELS[ln.label] + '.';
}

function isMastered(score) {
  return score >= MASTERY;
}

function scoreLine(score) {
  return score + ' of ' + LINES.length + ' correct';
}

function doesNotBelongLines() {
  const out = [];
  for (let i = 0; i < LINES.length; i++) if (LINES[i].label === 3) out.push(i);
  return out;
}

// Export the pure logic for node tests (ignored in the browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LABELS, LINES, QUESTION, MASTERY, feedbackHeadline, isMastered,
    scoreLine, doesNotBelongLines };
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let pos = 0;             // highlighted line (0..10); 11 when every line is judged
let selected = -1;       // label selected for the highlighted line, -1 = none
let results = [];        // per line: the label the learner committed
let lastJudged = -1;     // index of the most recently judged line (for feedback)
let finished = false;    // end screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let labelButtons = [];
let submitButton;
let scoreButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let k = 0; k < LABELS.length; k++) {
    const b = createButton(LABELS[k]);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.mouseClicked(() => selectLabel(k));
    labelButtons.push(b);
  }
  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  submitButton.mouseClicked(submitLabel);

  scoreButton = createButton('See Score');
  scoreButton.parent(document.querySelector('main'));
  styleButton(scoreButton);
  scoreButton.mouseClicked(showScore);

  updateControls();

  describe('Project Instruction File Triage. An illustrative draft instruction file for a SAR ADC ' +
    'project is shown as eleven numbered lines, with one line highlighted. Select Goal, Convention, ' +
    'Constraint, or Does not belong for the highlighted line and press Submit. Each line has one ' +
    'attempt. The sim then says Correct with the label, or names the correct label, gives the reason, ' +
    'marks the line with a check mark or an X, and highlights the next line. After line 11 it shows ' +
    'the score out of 11, whether the mastery threshold of 9 was met, and where each line that does ' +
    'not belong should live instead.');

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
function selectLabel(k) {
  if (finished || pos >= LINES.length) return;
  selected = k;
  updateControls();
  redraw();
}

function submitLabel() {
  if (finished || pos >= LINES.length || selected < 0) return;
  results[pos] = selected;
  lastJudged = pos;
  pos++;            // highlight the next line
  selected = -1;
  updateControls();
  redraw();
  if (pos >= LINES.length) scoreButton.elt.focus();
}

function showScore() {
  if (pos < LINES.length) return;
  finished = true;
  updateControls();
  redraw();
}

function scoreSoFar() {
  let n = 0;
  for (let i = 0; i < results.length; i++) if (results[i] === LINES[i].label) n++;
  return n;
}

// Enable, disable, show, hide the controls to match the state
function updateControls() {
  const judging = !finished && pos < LINES.length;
  for (let k = 0; k < labelButtons.length; k++) {
    const b = labelButtons[k];
    if (!judging) { b.hide(); continue; }
    b.show();
    const on = k === selected;
    b.attribute('aria-pressed', on ? 'true' : 'false');
    b.style('font-weight', on ? 'bold' : 'normal');
    b.style('outline', on ? '3px solid black' : 'none');
  }
  if (judging) {
    submitButton.show();
    setEnabled(submitButton, selected >= 0);
    scoreButton.hide();
  } else {
    submitButton.hide();
    if (finished) scoreButton.hide(); else scoreButton.show();
  }
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the visible buttons left to right, wrapping onto a second row when needed
function layoutControls() {
  const visible = [];
  if (!finished && pos < LINES.length) {
    for (const b of labelButtons) visible.push(b);
    visible.push(submitButton);
  } else if (!finished) {
    visible.push(scoreButton);
  }
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

// Shorten a string to one line ending in an ellipsis
function truncate(str, maxW) {
  if (textWidth(str) <= maxW) return str;
  let k = str.length;
  while (k > 1 && textWidth(str.slice(0, k) + '…') > maxW) k--;
  return str.slice(0, k).trimEnd() + '…';
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
  text('Project Instruction File Triage', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(16);

  if (finished) drawSummary(44);
  else drawJudging(44);
}

// Measure (and optionally draw) the feedback box for the most recently judged line
function feedbackBox(x, y, w, doDraw) {
  if (lastJudged < 0) return 0;
  const ln = LINES[lastJudged];
  const chosen = results[lastJudged];
  const correct = chosen === ln.label;
  textSize(16);
  textStyle(NORMAL);
  const headLines = wrapText('Feedback on line ' + (lastJudged + 1) +
    (correct ? '' : ' (you chose ' + LABELS[chosen] + ')'), w - 20);
  textStyle(BOLD);
  textSize(18);
  const verdictLines = wrapText((correct ? '✓ ' : '✗ ') + feedbackHeadline(lastJudged, chosen), w - 20);
  textStyle(NORMAL);
  textSize(16);
  const whyLines = wrapText(ln.why, w - 20);
  const h = headLines.length * 20 + verdictLines.length * 24 + whyLines.length * 20 + 16;
  if (doDraw) {
    fill('white');
    stroke(correct ? 'royalblue' : 'darkorange');
    strokeWeight(2);
    rect(x, y, w, h, 8);
    strokeWeight(1);
    fill('dimgray');
    textSize(16);
    let yy = drawLines(headLines, x + 10, y + 8, 20);
    textStyle(BOLD);
    textSize(18);
    fill(correct ? 'navy' : 'saddlebrown');
    yy = drawLines(verdictLines, x + 10, yy, 24);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    drawLines(whyLines, x + 10, yy, 20);
  }
  return h;
}

function drawJudging(y) {
  const innerW = canvasWidth - 2 * pad;

  // status line
  textSize(16);
  textStyle(NORMAL);
  fill('black');
  const lineStr = pos < LINES.length ? 'Line ' + (pos + 1) + ' of ' + LINES.length : 'All 11 lines judged';
  y = drawLines(wrapText(lineStr + '  |  Correct so far: ' + scoreSoFar(), innerW), pad, y, 20) + 4;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  // prompt below the file panel
  let prompt;
  if (pos >= LINES.length) prompt = 'Every line has been judged. Press See Score.';
  else if (selected < 0) prompt = 'Select a label below, then press Submit. One attempt per line.';
  else prompt = 'Selected: ' + LABELS[selected] + '. Press Submit to commit it.';
  textSize(16);
  const promptLines = wrapText(prompt, innerW);

  // space left for the file panel
  const fbH = feedbackBox(pad, 0, innerW, false);
  const reserved = promptLines.length * 20 + 8 + (fbH > 0 ? fbH + 8 : 0);
  const panelBudget = drawHeight - 8 - y - reserved;

  // draft file panel
  const gutter = 52;
  const textW = innerW - gutter - 12;
  const headerStr = 'SAR ADC project instruction file (illustrative draft)';
  textStyle(BOLD);
  const headerLines = wrapText(headerStr, innerW - 20);
  textStyle(NORMAL);
  let wrapped = LINES.map(ln => wrapText(ln.text, textW));
  const fullH = headerLines.length * 20 + 14 + wrapped.reduce((a, l) => a + l.length * 20 + 6, 0) + 6;
  let compact = fullH > panelBudget;
  if (compact) {
    // keep the highlighted line in full; shorten the others to one line
    wrapped = LINES.map((ln, i) => i === pos ? wrapText(ln.text, textW) : [truncate(ln.text, textW)]);
  }
  const panelH = headerLines.length * 20 + 14 + wrapped.reduce((a, l) => a + l.length * 20 + 6, 0) + 6;

  fill('white');
  stroke('gray');
  strokeWeight(1);
  rect(pad, y, innerW, panelH, 6);
  fill('black');
  textStyle(BOLD);
  let yy = drawLines(headerLines, pad + 10, y + 7, 20);
  textStyle(NORMAL);
  stroke('silver');
  line(pad, yy + 3, pad + innerW, yy + 3);
  yy += 8;

  for (let i = 0; i < LINES.length; i++) {
    const lh = wrapped[i].length * 20 + 6;
    const judged = i < results.length;
    const isCurrent = i === pos;
    const right = judged && results[i] === LINES[i].label;
    if (isCurrent) {
      fill('lightyellow');
      stroke('black');
      strokeWeight(2);
      rect(pad + 4, yy - 1, innerW - 8, lh, 4);
      strokeWeight(1);
    }
    // gutter: mark and line number
    noStroke();
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    if (isCurrent) { fill('black'); text('▶', pad + 8, yy + 2); }
    else if (judged) {
      fill(right ? 'royalblue' : 'saddlebrown');
      text(right ? '✓' : '✗', pad + 8, yy + 2);
    }
    fill(isCurrent ? 'black' : 'dimgray');
    textAlign(RIGHT, TOP);
    text(String(i + 1), pad + gutter - 8, yy + 2);
    textStyle(NORMAL);
    fill(judged ? 'dimgray' : 'black');
    if (isCurrent) { fill('black'); textStyle(BOLD); }
    drawLines(wrapped[i], pad + gutter, yy + 2, 20);
    textStyle(NORMAL);
    yy += lh;
  }
  y += panelH + 8;

  // prompt
  fill('black');
  textSize(16);
  y = drawLines(promptLines, pad, y, 20) + 8;

  // feedback on the most recent line
  if (fbH > 0) {
    feedbackBox(pad, y, innerW, true);
    y += fbH;
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;
  const score = scoreSoFar();

  textSize(16);
  fill('black');
  y = drawLines(['All ' + LINES.length + ' lines judged'], pad, y, 20) + 4;

  textSize(24);
  textStyle(BOLD);
  y = drawLines([scoreLine(score)], pad, y, 30);
  textSize(16);
  const mastered = isMastered(score);
  fill(mastered ? 'navy' : 'saddlebrown');
  const masteryStr = mastered
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of ' + LINES.length + ' correct.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of ' + LINES.length + ' correct are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  const missed = [];
  for (let i = 0; i < LINES.length; i++) if (results[i] !== LINES[i].label) missed.push(i + 1);
  fill('black');
  y = drawLines(wrapText('Lines judged incorrectly: ' + (missed.length ? missed.join(', ') : 'none'),
    innerW), pad, y, 20) + 10;

  textStyle(BOLD);
  y = drawLines(wrapText('Lines that do not belong, and where the content should live instead:', innerW),
    pad, y, 20) + 6;
  textStyle(NORMAL);

  for (const i of doesNotBelongLines()) {
    textStyle(BOLD);
    const tLines = wrapText('Line ' + (i + 1) + ': ' + LINES[i].text, innerW - 20);
    textStyle(NORMAL);
    const bLines = wrapText('Where it should live: ' + LINES[i].belongs, innerW - 20);
    const h = (tLines.length + bLines.length) * 20 + 16;
    fill('white');
    stroke('gray');
    strokeWeight(1);
    rect(pad, y, innerW, h, 8);
    fill('black');
    textStyle(BOLD);
    let yy = drawLines(tLines, pad + 10, y + 8, 20);
    textStyle(NORMAL);
    drawLines(bLines, pad + 10, yy, 20);
    y += h + 6;
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
