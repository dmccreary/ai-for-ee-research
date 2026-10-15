// Falsifiable Hypothesis Sorter MicroSim
// CANVAS_HEIGHT: 680
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner classifies eight illustrative statements as "falsifiable" or "not falsifiable".
// Fixed order, one attempt per statement, the correct classification and the "Why" sentence
// are always revealed after the attempt, and the final screen shows "n of 8 correct"
// with whether the mastery threshold of 7 was met.
// The design is width responsive; the control row wraps when the container is narrow.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let canvasHeight = 680;       // fixed total height of the canvas (iframe height = 682)
let controlHeight = 50;       // one row of buttons; recomputed if the buttons wrap
let drawHeight = canvasHeight - controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const FALSIFIABLE = 'Falsifiable';
const NOT_FALSIFIABLE = 'Not falsifiable';

// missing: the element the "Why" sentence names as missing (not-falsifiable statements only)
const STATEMENTS = [
  { id: 1,
    text: 'A 10-bit SAR ADC with foreground offset calibration reaches an ENOB of at least 9.5 bits at 1 MS/s in 65 nm CMOS while drawing under 50 µW.',
    answer: FALSIFIABLE,
    why: 'It names a metric, a threshold, and the conditions, and a measurement could contradict it.',
    missing: '' },
  { id: 2,
    text: 'Calibration makes the ADC better.',
    answer: NOT_FALSIFIABLE,
    why: 'It has no metric and no threshold, so no result can contradict it.',
    missing: 'a metric and a threshold' },
  { id: 3,
    text: 'The ADC will perform well under suitable conditions.',
    answer: NOT_FALSIFIABLE,
    why: 'The conditions are unspecified, so any failure can be blamed on unsuitable conditions.',
    missing: 'the conditions under which it is tested' },
  { id: 4,
    text: 'Either the offset improves or it does not.',
    answer: NOT_FALSIFIABLE,
    why: 'It is true whatever happens, so it says nothing about the circuit.',
    missing: 'a possible outcome that would contradict it (it is true under every outcome)' },
  { id: 5,
    text: 'Adding a 4-bit redundant capacitor array reduces the standard deviation of DNL by at least 30 percent relative to the baseline layout in a 200-run Monte Carlo simulation.',
    answer: FALSIFIABLE,
    why: 'It names the change, the size of the effect, the baseline, and the test.',
    missing: '' },
  { id: 6,
    text: 'Machine learning will eventually make analog design obsolete.',
    answer: NOT_FALSIFIABLE,
    why: 'It has no time bound and no measurable criterion, so no observation could contradict it.',
    missing: 'a time bound and a measurable criterion' },
  { id: 7,
    text: 'A surrogate model trained on 5,000 simulated samples predicts the op-amp gain within 1 dB on held-out designs.',
    answer: FALSIFIABLE,
    why: 'It names the training size, the tolerance, and a held-out test.',
    missing: '' },
  { id: 8,
    text: 'Any result that disagrees with the theory was caused by measurement error.',
    answer: NOT_FALSIFIABLE,
    why: 'It explains away every disagreement in advance, so no result can count against the theory.',
    missing: 'a possible result that could count against it (it explains away every disagreement)' }
];

const QUESTION = 'Could any measurement show this to be wrong?';
const MASTERY = 7;   // mastery requires at least 7 of 8 correct on the first attempt

// Checklist of properties (from the Rules of the specification)
const CHECKLIST_HEAD = 'A falsifiable statement names:';
const CHECKLIST = [
  'a measurable quantity,',
  'a threshold, or a direction and size of effect, and',
  'the conditions under which it is tested,'
];
const CHECKLIST_THEN = 'so that some possible observation would contradict it.';
const CHECKLIST_FOOT = 'A statement missing any of these, or that is true under every outcome, is not falsifiable.';

// ---------------------------------------------------------------
// Pure logic (no p5 calls; testable in node)
// ---------------------------------------------------------------
function isCorrect(statement, choice) {
  return choice === statement.answer;
}

// Feedback headline: "Correct." or "This statement is <classification>."
function feedbackHeadline(statement, choice) {
  if (isCorrect(statement, choice)) return 'Correct.';
  return 'This statement is ' + statement.answer.toLowerCase() + '.';
}

function scoreLine(n) {
  return n + ' of ' + STATEMENTS.length + ' correct';
}

function masteryMet(n) {
  return n >= MASTERY;
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let pos = 0;             // index of the current statement (0..7), fixed order
let committed = false;   // has the current statement been answered?
let choices = [];        // learner's choice for each answered statement
let score = 0;           // correct answers so far
let finished = false;    // final score screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let falsifiableButton;
let notFalsifiableButton;
let nextButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  falsifiableButton = createButton(FALSIFIABLE);
  falsifiableButton.parent(document.querySelector('main'));
  styleButton(falsifiableButton);
  falsifiableButton.mouseClicked(() => answer(FALSIFIABLE));

  notFalsifiableButton = createButton(NOT_FALSIFIABLE);
  notFalsifiableButton.parent(document.querySelector('main'));
  styleButton(notFalsifiableButton);
  notFalsifiableButton.mouseClicked(() => answer(NOT_FALSIFIABLE));

  nextButton = createButton('Next');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mouseClicked(nextPressed);

  updateControls();

  describe('Falsifiable Hypothesis Sorter. Eight illustrative research statements are shown one at a ' +
    'time in a fixed order with the question: Could any measurement show this to be wrong? Press ' +
    'Falsifiable or Not falsifiable to commit one answer. The sim then says Correct or names the ' +
    'correct classification, gives the reason, and for a not-falsifiable statement names what is ' +
    'missing. After statement 8 it shows the number correct out of 8 and whether the mastery ' +
    'threshold of 7 was met.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 12px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------
// One attempt per statement: the answer is committed at once
function answer(choice) {
  if (finished || committed) return;
  choices[pos] = choice;
  committed = true;
  if (isCorrect(STATEMENTS[pos], choice)) score++;
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished || !committed) return;
  if (pos < STATEMENTS.length - 1) {
    pos++;
    committed = false;
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

function updateControls() {
  if (finished) {
    falsifiableButton.hide();
    notFalsifiableButton.hide();
    nextButton.hide();
  } else {
    falsifiableButton.show();
    notFalsifiableButton.show();
    nextButton.show();
    setEnabled(falsifiableButton, !committed);
    setEnabled(notFalsifiableButton, !committed);
    nextButton.html(pos === STATEMENTS.length - 1 ? 'See Score' : 'Next');
    setEnabled(nextButton, committed);
  }
  layoutControls();
}

// Flow the buttons left to right, wrapping onto a second row when needed.
// The control region grows to fit and the drawing region shrinks by the same amount,
// so the total canvas height (and the iframe height) never changes.
function layoutControls() {
  const visible = finished ? [] : [falsifiableButton, notFalsifiableButton, nextButton];
  const gap = 10;
  let x = 10;
  let rows = 1;
  const widths = visible.map(b => b.elt.offsetWidth);
  for (const w of widths) {
    if (x > 10 && x + w > canvasWidth - 10) { x = 10; rows++; }
    x += w + gap;
  }
  controlHeight = rows * 35 + 15;
  drawHeight = canvasHeight - controlHeight;

  x = 10;
  let y = drawHeight + 8;
  for (let i = 0; i < visible.length; i++) {
    const w = widths[i];
    if (x > 10 && x + w > canvasWidth - 10) { x = 10; y += 35; }
    visible[i].position(x, y);
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
  text('Falsifiable Hypothesis Sorter', canvasWidth / 2, 10);
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

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const st = STATEMENTS[pos];

  // status line
  textSize(16);
  fill('dimgray');
  y = drawLines(wrapText('Statement ' + (pos + 1) + ' of ' + STATEMENTS.length +
    '  |  Statements are illustrative', innerW), pad, y, 20) + 4;

  // question
  fill('navy');
  textStyle(ITALIC);
  textSize(18);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 22) + 8;
  textStyle(NORMAL);

  // statement card
  textSize(18);
  const cardLines = wrapText(st.text, innerW - 24);
  const cardH = cardLines.length * 23 + 18;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  fill('black');
  drawLines(cardLines, pad + 12, y + 10, 23);
  y += cardH + 10;

  // checklist of properties
  textSize(16);
  const itemLines = CHECKLIST.map((c, i) => wrapText((i + 1) + '. ' + c, innerW - 40));
  const thenLines = wrapText(CHECKLIST_THEN, innerW - 20);
  const footLines = wrapText(CHECKLIST_FOOT, innerW - 20);
  let nItemLines = 0;
  for (const l of itemLines) nItemLines += l.length;
  const boxH = 8 + 20 + (nItemLines + thenLines.length) * 20 + 4 + footLines.length * 20 + 8;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(pad, y, innerW, boxH, 8);
  fill('black');
  textStyle(BOLD);
  let yy = drawLines([CHECKLIST_HEAD], pad + 10, y + 8, 20);
  textStyle(NORMAL);
  for (const l of itemLines) yy = drawLines(l, pad + 26, yy, 20);
  yy = drawLines(thenLines, pad + 10, yy, 20);
  fill('dimgray');
  drawLines(footLines, pad + 10, yy + 4, 20);
  y += boxH + 10;

  // feedback
  if (!committed) {
    fill('black');
    textSize(16);
    y = drawLines(wrapText('Choose Falsifiable or Not falsifiable with the buttons below. ' +
      'Each statement gets one attempt.', innerW), pad, y, 20);
  } else {
    const choice = choices[pos];
    const correct = isCorrect(st, choice);
    // feedback panel: blue with a check mark when correct, orange with an X when not
    textSize(16);
    const whyLines = wrapText('Why: ' + st.why, innerW - 20);
    const missLines = st.missing ? wrapText('Missing: ' + st.missing + '.', innerW - 20) : [];
    textSize(18);
    textStyle(BOLD);
    const headLines = wrapText((correct ? '✓ ' : '✗ ') + feedbackHeadline(st, choice), innerW - 20);
    textStyle(NORMAL);
    const fbH = 8 + headLines.length * 24 + (whyLines.length + missLines.length) * 20 + 8;
    if (correct) { fill('azure'); stroke('steelblue'); }
    else { fill('papayawhip'); stroke('darkorange'); }
    strokeWeight(3);
    rect(pad, y, innerW, fbH, 8);
    strokeWeight(1);
    textSize(18);
    textStyle(BOLD);
    fill(correct ? 'navy' : 'saddlebrown');
    let fy = drawLines(headLines, pad + 10, y + 8, 24);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    fy = drawLines(whyLines, pad + 10, fy, 20);
    if (missLines.length) {
      textStyle(BOLD);
      fy = drawLines(missLines, pad + 10, fy, 20);
      textStyle(NORMAL);
    }
    y += fbH;
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(28);
  textStyle(BOLD);
  fill('black');
  y = drawLines([scoreLine(score)], pad, y + 4, 34);
  textSize(16);
  const met = masteryMet(score);
  fill(met ? 'navy' : 'saddlebrown');
  const masteryStr = met
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 8 correct.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of 8 correct are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 10;
  textStyle(NORMAL);

  fill('black');
  textStyle(BOLD);
  y = drawLines(wrapText('Correct classification of each statement', innerW), pad, y, 20) + 4;
  textStyle(NORMAL);

  for (let i = 0; i < STATEMENTS.length; i++) {
    const st = STATEMENTS[i];
    const ok = isCorrect(st, choices[i]);
    const line = (ok ? '✓ ' : '✗ ') + st.id + '. ' + st.answer +
      (ok ? ' (correct)' : ' (you chose ' + choices[i].toLowerCase() + ')');
    const lines = wrapText(line, innerW - 20);
    const h = lines.length * 20 + 10;
    if (ok) { fill('azure'); stroke('steelblue'); }
    else { fill('papayawhip'); stroke('darkorange'); }
    rect(pad, y, innerW, h, 6);
    fill('black');
    drawLines(lines, pad + 10, y + 5, 20);
    y += h + 4;
  }
  fill('dimgray');
  y = drawLines(wrapText('Statements are illustrative. Reload the page to try again.', innerW), pad, y + 4, 20);
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

// Export the pure logic for testing in node (ignored in the browser and the p5.js editor)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STATEMENTS, MASTERY, FALSIFIABLE, NOT_FALSIFIABLE, isCorrect,
    feedbackHeadline, scoreLine, masteryMet };
}
