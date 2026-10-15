// Numerical Sanity Check Judge MicroSim
// CANVAS_HEIGHT: 720
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner judges eight illustrative reported results as Plausible or as failing one
// of four sanity checks. One attempt per result, fixed order, the correct verdict is always
// revealed with the "Why" sentence and the quick calculation, and a final score n of 8 is
// shown with whether the mastery threshold of 7 was met.
// The total canvas height is fixed; the control region grows to more rows at narrow widths
// and the drawing region takes the rest.

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let canvasHeight = 720;               // fixed total height (iframe height - 2)
let controlHeight = 150;              // recomputed by layoutControls(): rows x 35 + 10
let drawHeight = canvasHeight - controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const VERDICTS = [
  'Plausible',
  'Exceeds a limit',
  'Disagrees with a hand calculation',
  'Violates scaling',
  'Impossible value'
];

// verdict is an index into VERDICTS.
// calc is the quick calculation that exposes the problem (only for results that have one).
const RESULTS = [
  { text: 'A 10-bit ADC is reported to have an ENOB of 17.98 bits.',
    verdict: 1,
    why: 'ENOB cannot exceed the nominal resolution by more than a small margin. This is the 10 versus 20 log10 error.',
    calc: 'Quick check: a 10-bit ADC reaches at most about 10 bits, and 17.98 is almost 8 bits more. ' +
          'Using 20 log10 on a power ratio doubles the dB figure: (110.0 - 1.76) / 6.02 = 17.98 bits, ' +
          'while 10 log10 gives 55.0 dB and (55.0 - 1.76) / 6.02 = 8.84 bits.' },
  { text: 'A 10-bit ADC is reported to have an ENOB of 9.2 bits at 1 MS/s.',
    verdict: 0,
    why: 'It is below the nominal resolution by a typical amount.',
    calc: '' },
  { text: 'A low-dropout regulator is reported to have a power efficiency of 104 percent.',
    verdict: 1,
    why: 'Efficiency cannot exceed 100 percent.',
    calc: 'Quick check: efficiency = P_out / P_in. 104 percent would mean the regulator delivers ' +
          '4 percent more power than it draws.' },
  { text: 'An RC low-pass filter with R = 1 kΩ and C = 100 nF is simulated and the -3 dB frequency is 1.59 kHz.',
    verdict: 0,
    why: 'It agrees with 1 / (2 pi R C) = 1.59 kHz.',
    calc: '' },
  { text: 'An RC low-pass filter with R = 1 kΩ and C = 100 nF is simulated and the -3 dB frequency is 15.9 kHz.',
    verdict: 2,
    why: 'It is ten times the hand calculation of 1.59 kHz, which suggests a wrong parameter or unit.',
    calc: 'Quick check: f_c = 1 / (2 pi x 1 kΩ x 100 nF) = 1 / (2 pi x 0.1 ms) = 1.59 kHz. ' +
          '15.9 kHz / 1.59 kHz = 10, beyond the factor of 2 that counts as disagreement.' },
  { text: 'A sweep of 64 points reports 64 different supply power values, all between 41 and 49 µW.',
    verdict: 0,
    why: 'The values are positive, bounded, and vary with the swept parameter as expected.',
    calc: '' },
  { text: 'A linear filter gives an output of 0.05 V for a 0.1 V input and 0.15 V for a 0.2 V input.',
    verdict: 3,
    why: 'Doubling the input of a linear system must double the output, which would be 0.10 V.',
    calc: 'Quick check: the gain is 0.05 / 0.1 = 0.5 at the first input and 0.15 / 0.2 = 0.75 at the second. ' +
          'A linear system has one gain, so 0.2 V must give 0.5 x 0.2 = 0.10 V.' },
  { text: 'The noise standard deviation of a record is reported as -0.8 LSB.',
    verdict: 4,
    why: 'A standard deviation is never negative.',
    calc: 'Quick check: a standard deviation is the square root of a variance, which is a mean of squares, ' +
          'so it is 0 or positive. A value of -0.8 LSB cannot occur.' }
];

// Hint about each check (exploration only, not evidence of mastery)
const CHECK_HINTS = [
  'Plausible: violates none of the checks.',
  'Exceeds a limit: breaks a definitional or physical limit, such as nominal ENOB or 100 percent efficiency.',
  'Disagrees with a hand calculation: off from a paper estimate by a factor of 2 or more.',
  'Violates scaling: a linear output does not double when its input doubles.',
  'Impossible value: a value the quantity can never take.'
];

const QUESTION = 'Is this result plausible, and if not, which check does it fail?';
const MASTERY = 7;   // mastery requires at least 7 of 8 correct

// ---------------------------------------------------------------
// Pure logic (no p5 calls; tested in node)
// ---------------------------------------------------------------
function isCorrect(resultIndex, verdictIndex) {
  return RESULTS[resultIndex].verdict === verdictIndex;
}

// The feedback headline for a committed verdict
function feedbackHeadline(resultIndex, verdictIndex) {
  const answer = VERDICTS[RESULTS[resultIndex].verdict];
  return isCorrect(resultIndex, verdictIndex) ? 'Correct: ' + answer + '.' : 'The verdict is ' + answer + '.';
}

function scoreLine(nCorrect) {
  return nCorrect + ' of ' + RESULTS.length + ' correct';
}

function masteryMet(nCorrect) {
  return nCorrect >= MASTERY;
}

// RC rule: the result disagrees with the hand value when it differs by a factor of 2 or more
function rcCutoffHz(R, C) {
  return 1 / (2 * Math.PI * R * C);
}
function disagreesWithHand(reported, hand) {
  return Math.max(reported / hand, hand / reported) >= 2;
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let current = 0;         // index of the result on screen (0..7)
let chosen = -1;         // verdict picked but not yet submitted
let committed = false;   // has the current result been judged?
let outcomes = [];       // true/false per judged result
let finished = false;    // score screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let verdictButtons = [];
let submitButton;
let nextButton;
let checksBox;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let v = 0; v < VERDICTS.length; v++) {
    const b = createButton('');
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.mouseClicked(() => chooseVerdict(v));
    verdictButtons.push(b);
  }
  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  submitButton.mouseClicked(submitVerdict);

  nextButton = createButton('Next');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mouseClicked(nextResult);

  checksBox = createCheckbox(' Show the checks', false);
  checksBox.parent(document.querySelector('main'));
  checksBox.style('font-size', '16px');
  checksBox.changed(() => redraw());

  // absolute positioning first so offsetWidth measures the control, not the page width
  for (const c of allControls()) c.position(0, 0);

  updateControls();

  describe('Numerical Sanity Check Judge. Eight illustrative reported results are shown one at a ' +
    'time. For each, choose one of five verdicts: Plausible, Exceeds a limit, Disagrees with a hand ' +
    'calculation, Violates scaling, or Impossible value, then press Submit. Each result gets ' +
    'one attempt. The sim says whether the verdict was correct, reveals the correct verdict, the reason, ' +
    'and a quick calculation. After result 8 it shows the score out of 8 and whether the mastery ' +
    'threshold of 7 was met.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function allControls() {
  return verdictButtons.concat([submitButton, nextButton, checksBox]);
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Actions
// ---------------------------------------------------------------
function chooseVerdict(v) {
  if (finished || committed) return;
  chosen = v;
  updateControls();
  redraw();
}

function submitVerdict() {
  if (finished || committed || chosen < 0) return;
  committed = true;
  outcomes.push(isCorrect(current, chosen));
  checksBox.checked(false); // make room for the feedback
  updateControls();
  redraw();
}

function nextResult() {
  if (!committed) return;
  if (current < RESULTS.length - 1) {
    current++;
    chosen = -1;
    committed = false;
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

function correctCount() {
  return outcomes.filter(x => x).length;
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  for (let v = 0; v < VERDICTS.length; v++) {
    const b = verdictButtons[v];
    // the radio symbol is a non-color cue for the chosen verdict
    b.html((v === chosen ? '◉ ' : '○ ') + VERDICTS[v]);
    b.attribute('aria-pressed', v === chosen ? 'true' : 'false');
    b.style('background-color', v === chosen ? 'lightsteelblue' : '');
    b.style('font-weight', v === chosen ? 'bold' : 'normal');
    setEnabled(b, !committed);
    if (finished) b.hide(); else b.show();
  }
  setEnabled(submitButton, !committed && chosen >= 0);
  nextButton.html(current === RESULTS.length - 1 ? 'See Score' : 'Next');
  setEnabled(nextButton, committed);
  if (finished) {
    submitButton.hide();
    nextButton.hide();
    checksBox.hide();
  }
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the verdict buttons left to right, wrapping as needed, then put
// Submit, Next and the checkbox on the following row(s).
// The control region height follows the number of rows; the drawing region takes the rest.
function layoutControls() {
  const gap = 10;
  let rows = 1;
  let x = 10;
  let y = 0;
  const placed = [];
  function place(c, newRow) {
    const w = c.elt.offsetWidth;
    if (x > 10 && (newRow || x + w > canvasWidth - 10)) {
      x = 10;
      y += 35;
      rows++;
    }
    placed.push([c, x, y]);
    x += w + gap;
  }
  if (!finished) {
    for (const b of verdictButtons) place(b, false);
    place(submitButton, true);
    place(nextButton, false);
    place(checksBox, false);
  } else {
    rows = 1;
  }
  controlHeight = rows * 35 + 10;
  drawHeight = canvasHeight - controlHeight;
  for (const [c, cx, cy] of placed) {
    // checkbox text is shorter than a button; nudge it to line up with button text
    const dy = (c === checksBox) ? 6 : 0;
    c.position(cx, drawHeight + 6 + cy + dy);
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
  // title, reduced to fit narrow widths
  const title = 'Numerical Sanity Check Judge';
  let ts = 24;
  textSize(ts);
  while (ts > 18 && textWidth(title) > canvasWidth - 2 * pad) { ts--; textSize(ts); }
  text(title, canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (finished) drawScore(46);
  else drawResult(46);
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

function drawResult(y) {
  const innerW = canvasWidth - 2 * pad;
  const r = RESULTS[current];

  // status line
  textSize(16);
  fill('black');
  const status = 'Result ' + (current + 1) + ' of ' + RESULTS.length +
    '  |  Correct so far: ' + correctCount() + ' of ' + outcomes.length;
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 4;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 8;
  textStyle(NORMAL);

  // result card
  textSize(18);
  textStyle(BOLD);
  const cardLines = wrapText(r.text, innerW - 24);
  const cardH = cardLines.length * 23 + 18 + 22;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  fill('dimgray');
  textStyle(NORMAL);
  textSize(16);
  drawLines(['Reported result (illustrative)'], pad + 12, y + 8, 20);
  fill('black');
  textSize(18);
  textStyle(BOLD);
  drawLines(cardLines, pad + 12, y + 30, 23);
  textStyle(NORMAL);
  y += cardH + 10;

  textSize(16);
  if (!committed) {
    fill('black');
    if (checksBox.checked()) {
      y = drawHints(y, innerW);
    } else {
      const pick = chosen < 0 ? 'Your verdict: none chosen yet.'
        : 'Your verdict: ' + VERDICTS[chosen] + '. Press Submit to commit it.';
      y = drawLines(wrapText(pick, innerW), pad, y, 20) + 6;
      y = drawLines(wrapText('Choose one of the five verdicts with the buttons below, then press ' +
        'Submit. Each result gets one attempt.', innerW), pad, y, 20);
    }
  } else if (checksBox.checked()) {
    y = drawHints(y, innerW);
  } else {
    y = drawFeedback(y, innerW, r);
  }
  layoutBottom = y;
}

function drawHints(y, innerW) {
  textSize(16);
  const blocks = CHECK_HINTS.map(h => wrapText(h, innerW - 20));
  let h = 10;
  for (const b of blocks) h += b.length * 20 + 4;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(pad, y, innerW, h, 8);
  fill('black');
  let yy = y + 8;
  for (const b of blocks) yy = drawLines(b, pad + 10, yy, 20) + 4;
  return y + h;
}

function drawFeedback(y, innerW, r) {
  const ok = isCorrect(current, chosen);
  // panel border color plus a check or cross symbol (non-color cue)
  textSize(16);
  const head = (ok ? '✓ ' : '✗ ') + feedbackHeadline(current, chosen);
  textSize(18);
  textStyle(BOLD);
  const headLines = wrapText(head, innerW - 20);
  textStyle(NORMAL);
  textSize(16);
  const mine = ok ? [] : wrapText('Your verdict: ' + VERDICTS[chosen] + '.', innerW - 20);
  const whyLines = wrapText('Why: ' + r.why, innerW - 20);
  const calcLines = r.calc ? wrapText(r.calc, innerW - 20) : [];
  const h = headLines.length * 24 + (mine.length + whyLines.length + calcLines.length) * 20 +
    (calcLines.length ? 6 : 0) + 16;

  fill('white');
  stroke(ok ? 'royalblue' : 'darkorange');
  strokeWeight(3);
  rect(pad, y, innerW, h, 8);
  strokeWeight(1);

  let yy = y + 8;
  textSize(18);
  textStyle(BOLD);
  fill(ok ? 'navy' : 'saddlebrown');
  yy = drawLines(headLines, pad + 10, yy, 24);
  textStyle(NORMAL);
  textSize(16);
  fill('black');
  yy = drawLines(mine, pad + 10, yy, 20);
  yy = drawLines(whyLines, pad + 10, yy, 20);
  if (calcLines.length) {
    yy += 6;
    fill('darkslategray');
    yy = drawLines(calcLines, pad + 10, yy, 20);
  }
  return y + h;
}

function drawScore(y) {
  const innerW = canvasWidth - 2 * pad;
  const n = correctCount();

  textSize(16);
  fill('black');
  y = drawLines(['All eight results judged.'], pad, y, 20) + 10;

  textSize(28);
  textStyle(BOLD);
  y = drawLines([scoreLine(n)], pad, y, 36);
  textSize(18);
  const met = masteryMet(n);
  fill(met ? 'navy' : 'saddlebrown');
  const mStr = met
    ? '✓ Mastery threshold of ' + MASTERY + ' met.'
    : '✗ Mastery threshold of ' + MASTERY + ' not met.';
  y = drawLines(wrapText(mStr, innerW), pad, y, 24) + 10;
  textStyle(NORMAL);

  textSize(16);
  fill('black');
  const right = [];
  const wrong = [];
  outcomes.forEach((ok, i) => (ok ? right : wrong).push(i + 1));
  y = drawLines(wrapText('Judged correctly: ' + (right.length ? 'results ' + right.join(', ') : 'none') + '.',
    innerW), pad, y, 20);
  y = drawLines(wrapText('Judged incorrectly: ' + (wrong.length ? 'results ' + wrong.join(', ') : 'none') + '.',
    innerW), pad, y, 20);
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
  module.exports = { VERDICTS, RESULTS, MASTERY, isCorrect, feedbackHeadline, scoreLine,
    masteryMet, rcCutoffHz, disagreesWithHand };
}
