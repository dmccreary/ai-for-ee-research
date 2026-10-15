// Prompt Chain Builder MicroSim
// CANVAS_HEIGHT: 840
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner arranges six prompt-chain step cards (shown in a scrambled order and labeled
// Card A to F) into an order that respects their dependencies, and picks one of three candidate
// acceptance checks for each step (options shown in a shuffled order). Submit marks the order
// valid or names the first violated dependency, and shows the testable check and Why sentence
// for each step. Reset starts again; only the first submission counts as evidence.
// The design is width responsive; controls reflow onto two rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 760;
// Control region: two rows of controls = (2 x 35) + 10 = 80
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
const GOAL = 'Produce a verified comparison table of five SAR ADC papers by Walden figure of merit.';
const QUESTION = 'In what order can these steps run, and how would you know each one worked?';
const FOM_NOTE = 'FoM = P / (2^ENOB × fs), with P in W and fs in Hz, giving J per conversion step. ' +
  'The test row values (9.0 ENOB, 50 µW, 1 MS/s) are illustrative.';
const CHECKS_MASTERY = 5;   // a valid order and at least 5 of 6 checks correct

// after: the steps this one must come after. testable: the option marked testable (always B).
const STEPS = [
  { id: 'S1', text: 'Extract ENOB, power, and sampling rate from one paper, with the supporting ' +
      'sentence for each', after: [],
    options: { A: 'The extraction looks complete',
      B: 'Every value has a quoted supporting sentence or the string "not stated"',
      C: 'The values are plausible' },
    testable: 'B',
    why: 'A check must be decidable by a script or a second reader. B can be tested line by line.' },
  { id: 'S2', text: 'Check that every extracted value appears in the paper text', after: ['S1'],
    options: { A: 'The values seem consistent',
      B: 'A script finds each extracted number as a string in the paper text',
      C: 'The model confirms it checked' },
    testable: 'B',
    why: 'A string search is independent of the model that extracted the values.' },
  { id: 'S3', text: 'Normalize units to microwatts, megasamples per second, and bits', after: ['S2'],
    options: { A: 'Units were handled sensibly',
      B: 'All values are in the three target units and a unit-conversion test case passes',
      C: 'The numbers look the right size' },
    testable: 'B',
    why: 'A conversion test case fixes the expected result.' },
  { id: 'S4', text: 'Compute the figure of merit for each paper', after: ['S3'],
    options: { A: 'The figures of merit look reasonable',
      B: 'The computed value for a test row of 9.0 ENOB, 50 µW, and 1 MS/s equals ' +
        '50e-6 / (2^9 × 1e6) J per conversion step, about 0.098 pJ',
      C: 'The model explains its calculation' },
    testable: 'B',
    why: 'A known-answer row tests the arithmetic.' },
  { id: 'S5', text: 'Assemble the table sorted by figure of merit', after: ['S4', 'S6'],
    options: { A: 'The table reads well',
      B: 'Rows are sorted by ascending figure of merit and all five papers are present or listed ' +
        'as missing',
      C: 'The table is formatted nicely' },
    testable: 'B',
    why: 'Order and completeness can be checked mechanically.' },
  { id: 'S6', text: 'List the papers with missing values separately', after: ['S2'],
    options: { A: 'Missing papers are mentioned',
      B: 'Every paper with a "not stated" value appears in the list, and no paper with all ' +
        'values appears',
      C: 'The list is short' },
    testable: 'B',
    why: 'Membership can be compared with the S2 results.' }
];
const LETTERS = 'ABCDEF';

// ---------------------------------------------------------------
// Pure logic (no p5 calls; tested in node)
// ---------------------------------------------------------------
// Walden figure of merit, J per conversion step (P in W, fs in Hz)
function waldenFoM(powerW, enob, fsHz) {
  return powerW / (Math.pow(2, enob) * fsHz);
}

// order: array of step ids. Returns null when every dependency holds, otherwise the first
// violation found scanning the order from the top: { step, needs }.
function firstViolation(order) {
  for (let p = 0; p < order.length; p++) {
    const step = STEPS.find(s => s.id === order[p]);
    for (const dep of step.after) {
      if (order.indexOf(dep) > p) return { step: step.id, needs: dep };
    }
  }
  return null;
}

function isValidOrder(order) {
  return firstViolation(order) === null;
}

// checks: map step id -> chosen option letter ('A', 'B', 'C')
function countCorrectChecks(checks) {
  let n = 0;
  for (const s of STEPS) if (checks[s.id] === s.testable) n++;
  return n;
}

function scoreSubmission(order, checks) {
  const v = firstViolation(order);
  const n = countCorrectChecks(checks);
  return { valid: v === null, violation: v, checks: n,
    mastered: v === null && n >= CHECKS_MASTERY };
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {   // Fisher-Yates shuffle
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let order = [];           // learner's sequence of step ids, top runs first
let cardLetter = {};      // step id -> card letter (A..F, from the scrambled starting order)
let optionOrder = {};     // step id -> shuffled option letters; display position 1..3
let checks = {};          // step id -> chosen option letter
let selectedId = '';      // step id of the card the controls act on
let submitted = false;
let lastResult = null;
let firstResult = null;   // the first submission is the evidence
let attempt = 1;
let resultPage = 0;
let resultPageCount = 1;
let layoutBottom = 0;     // lowest y used by drawn content (used for layout testing)

// controls
let cardSelect;
let upButton;
let downButton;
let checkSelect;
let submitButton;
let resetButton;
let nextPageButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  cardSelect = createSelect();
  cardSelect.parent(document.querySelector('main'));
  for (let i = 0; i < 6; i++) cardSelect.option('Card ' + LETTERS[i], LETTERS[i]);
  styleSelect(cardSelect);
  cardSelect.changed(() => {
    selectedId = idOfLetter(cardSelect.value());
    updateControls();
    redraw();
  });

  upButton = makeButton('Move Up', () => moveSelected(-1));
  downButton = makeButton('Move Down', () => moveSelected(1));

  checkSelect = createSelect();
  checkSelect.parent(document.querySelector('main'));
  checkSelect.option('Choose a check', '0');
  for (let k = 1; k <= 3; k++) checkSelect.option('Check ' + k, String(k));
  styleSelect(checkSelect);
  checkSelect.changed(() => {
    const k = parseInt(checkSelect.value(), 10);
    if (submitted || !selectedId) return;
    if (k === 0) delete checks[selectedId];
    else checks[selectedId] = optionOrder[selectedId][k - 1];
    updateControls();
    redraw();
  });

  submitButton = makeButton('Submit', submitPressed);
  resetButton = makeButton('Reset', resetPressed);
  nextPageButton = makeButton('Next Page', () => {
    resultPage = (resultPage + 1) % resultPageCount;
    redraw();
  });

  newAttempt();

  describe('Prompt Chain Builder. The goal is: ' + GOAL + ' Six step cards, labeled Card A to F, ' +
    'start in a scrambled order. Choose a card in the first drop-down list and press Move Up or ' +
    'Move Down to change its place in the chain. Use the second drop-down list to choose one of ' +
    'three candidate acceptance checks for that card. Submit marks the order valid or names the ' +
    'first step that needs another step first, and shows the testable check and the reason for ' +
    'every step. Reset starts again; only the first submission counts as evidence.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleSelect(s) {
  s.style('font-size', '16px');
  s.style('padding', '3px');
}

function makeButton(label, handler) {
  const b = createButton(label);
  b.parent(document.querySelector('main'));
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
  b.mouseClicked(handler); // click also fires for Enter and Space, so keyboard users can press it
  return b;
}

function idOfLetter(letter) {
  for (const id in cardLetter) if (cardLetter[id] === letter) return id;
  return '';
}

function stepById(id) {
  return STEPS.find(s => s.id === id);
}

// Starting state: six cards in a scrambled (not already valid) order, no checks selected
function newAttempt() {
  do {
    order = shuffle(STEPS.map(s => s.id));
  } while (isValidOrder(order));
  cardLetter = {};
  for (let i = 0; i < order.length; i++) cardLetter[order[i]] = LETTERS[i];
  optionOrder = {};
  for (const s of STEPS) optionOrder[s.id] = shuffle(['A', 'B', 'C']);
  checks = {};
  selectedId = order[0];
  cardSelect.selected('A');
  submitted = false;
  lastResult = null;
  resultPage = 0;
  resultPageCount = 1;
  updateControls();
  redraw();
}

function resetPressed() {
  if (submitted || firstResult) attempt++;
  newAttempt();
}

function moveSelected(dir) {
  if (submitted) return;
  const p = order.indexOf(selectedId);
  const q = p + dir;
  if (p < 0 || q < 0 || q >= order.length) return;
  order[p] = order[q];
  order[q] = selectedId;
  updateControls();
  redraw();
}

function allChecksChosen() {
  return STEPS.every(s => checks[s.id]);
}

function submitPressed() {
  if (submitted || !allChecksChosen()) return;
  lastResult = scoreSubmission(order, checks);
  lastResult.order = order.slice();
  if (!firstResult) firstResult = lastResult;
  submitted = true;
  resultPage = 0;
  updateControls();
  redraw();
}

// Enable, disable, show and hide the controls to match the state
function updateControls() {
  // card list labels show each card's current position in the chain
  for (let i = 0; i < 6; i++) {
    const id = idOfLetter(LETTERS[i]);
    cardSelect.elt.options[i].text = 'Card ' + LETTERS[i] + ' (#' + (order.indexOf(id) + 1) + ')';
  }
  const editors = [cardSelect, upButton, downButton, checkSelect, submitButton];
  for (const c of editors) {
    if (submitted) c.hide(); else c.show();
  }
  if (!submitted) {
    const p = order.indexOf(selectedId);
    setEnabled(upButton, p > 0);
    setEnabled(downButton, p >= 0 && p < order.length - 1);
    const chosen = checks[selectedId];
    checkSelect.selected(chosen ? String(optionOrder[selectedId].indexOf(chosen) + 1) : '0');
    setEnabled(submitButton, allChecksChosen());
  }
  if (submitted && resultPageCount > 1) nextPageButton.show();
  else nextPageButton.hide();
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a second row when needed
function layoutControls() {
  const visible = [];
  if (!submitted) visible.push(cardSelect, upButton, downButton, checkSelect, submitButton);
  else if (resultPageCount > 1) visible.push(nextPageButton);
  visible.push(resetButton);
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

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);

  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(24);
  text('Prompt Chain Builder', canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (submitted) drawResults(44);
  else drawPlay(44);
}

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

function drawLines(lines, x, y, lineH) {
  textAlign(LEFT, TOP);
  for (const ln of lines) {
    noStroke();
    text(ln, x, y);
    y += lineH;
  }
  return y;
}

// Shorten a string with an ellipsis so it fits in maxW
function fitText(str, maxW) {
  if (textWidth(str) <= maxW) return str;
  let s = str;
  while (s.length > 1 && textWidth(s + '…') > maxW) s = s.slice(0, -1);
  return s.trimEnd() + '…';
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  textSize(16);

  // goal box
  textStyle(BOLD);
  const goalLines = wrapText('Goal: "' + GOAL + '"', innerW - 16);
  const gh = goalLines.length * 20 + 10;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, gh, 8);
  strokeWeight(1);
  fill('black');
  drawLines(goalLines, pad + 8, y + 5, 20);
  textStyle(NORMAL);
  y += gh + 4;

  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 4;
  textStyle(NORMAL);

  fill('black');
  textStyle(BOLD);
  const narrow = innerW < 560;
  y = drawLines(wrapText(narrow ? 'Your chain (step 1 runs first; right: chosen check):'
    : 'Your chain (step 1 runs first):', innerW), pad, y, 20) + 2;
  textStyle(NORMAL);

  // one line per card in the current order; the selected card's full text is in the panel below
  const checkColW = narrow ? 44 : 100;
  for (let p = 0; p < order.length; p++) {
    const id = order[p];
    const isSel = id === selectedId;
    const rowH = 24;
    fill(isSel ? 'lightyellow' : 'white');
    stroke(isSel ? 'black' : 'silver');
    strokeWeight(isSel ? 2 : 1);
    rect(pad, y, innerW, rowH, 5);
    strokeWeight(1);
    noStroke();
    fill('black');
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    const label = (isSel ? '▶' : '') + (p + 1) + '. Card ' + cardLetter[id] + ':';
    text(label, pad + 5, y + 3);
    const lw = textWidth(label) + 8;
    textStyle(NORMAL);
    text(fitText(stepById(id).text, innerW - lw - checkColW - 10), pad + 5 + lw, y + 3);
    const chosen = checks[id];
    textAlign(RIGHT, TOP);
    if (chosen) {
      fill('black');
      textStyle(BOLD);
      text((narrow ? '● ' : '● Check ') + (optionOrder[id].indexOf(chosen) + 1), pad + innerW - 6, y + 3);
    } else {
      fill('gray');
      textStyle(ITALIC);
      text(narrow ? '○ –' : '○ no check', pad + innerW - 6, y + 3);
    }
    textStyle(NORMAL);
    y += rowH + 2;
  }
  y += 6;

  // detail panel for the selected card: full step text and its three candidate checks
  const step = stepById(selectedId);
  const headLines = wrapText('Card ' + cardLetter[selectedId] + ': ' + step.text, innerW - 20);
  const optBlocks = optionOrder[selectedId].map((letter, k) => {
    return { letter, lines: wrapText('Check ' + (k + 1) + ': ' + step.options[letter], innerW - 52) };
  });
  let panelH = headLines.length * 20 + 30;
  for (const ob of optBlocks) panelH += ob.lines.length * 20 + 10;
  fill('white');
  stroke('slategray');
  rect(pad, y, innerW, panelH, 8);
  fill('black');
  textStyle(BOLD);
  let yy = drawLines(headLines, pad + 10, y + 6, 20);
  textStyle(NORMAL);
  fill('dimgray');
  yy = drawLines(['Candidate acceptance checks (choose one):'], pad + 10, yy, 20) + 2;
  for (const ob of optBlocks) {
    const isChosen = checks[selectedId] === ob.letter;
    const h = ob.lines.length * 20 + 6;
    fill(isChosen ? 'lavender' : 'whitesmoke');
    stroke(isChosen ? 'navy' : 'gainsboro');
    strokeWeight(isChosen ? 2 : 1);
    rect(pad + 8, yy, innerW - 16, h, 5);
    strokeWeight(1);
    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    text(isChosen ? '●' : '○', pad + 14, yy + 3);
    if (isChosen) textStyle(BOLD);
    drawLines(ob.lines, pad + 36, yy + 3, 20);
    textStyle(NORMAL);
    yy += h + 4;
  }
  y += panelH + 6;

  textSize(14);
  fill('dimgray');
  y = drawLines(wrapText(FOM_NOTE, innerW), pad, y, 17) + 4;
  textSize(16);

  fill('black');
  const missing = STEPS.filter(s => !checks[s.id]).length;
  const hint = missing > 0
    ? 'Pick a card, move it, and choose its check. Submit is enabled when all six cards have ' +
      'a check (' + missing + ' left).'
    : 'All six cards have a check. Adjust the order or the checks, or press Submit.';
  y = drawLines(wrapText(hint, innerW), pad, y, 20);
  if (firstResult) {
    fill('dimgray');
    y = drawLines(wrapText('Attempt ' + attempt + ' is practice: only the first submission counts ' +
      'as evidence.', innerW), pad, y, 20);
  }
  layoutBottom = y;
}

function stepName(id) {
  return id + ' (Card ' + cardLetter[id] + ')';
}

function scoreLine(r) {
  return 'Order valid: ' + (r.valid ? 'yes' : 'no') + '; checks: ' + r.checks + ' of 6';
}

function drawResults(y) {
  const innerW = canvasWidth - 2 * pad;
  const r = lastResult;
  textSize(16);

  // order verdict
  textSize(18);
  textStyle(BOLD);
  fill(r.valid ? 'mediumblue' : 'saddlebrown');
  const orderMsg = r.valid
    ? '✓ Valid order.'
    : '✗ Invalid: ' + stepName(r.violation.step) + ' needs ' + stepName(r.violation.needs) + ' first.';
  y = drawLines(wrapText(orderMsg, innerW), pad, y, 24);
  textSize(16);
  textStyle(NORMAL);
  fill('black');
  y = drawLines(wrapText('Your order: ' + r.order.map(stepName).join(', '), innerW), pad, y, 20) + 2;

  textStyle(BOLD);
  y = drawLines(wrapText(scoreLine(r), innerW), pad, y, 20);
  fill(r.mastered ? 'mediumblue' : 'saddlebrown');
  y = drawLines(wrapText(r.mastered
    ? '✓ Mastery condition met: a valid order and at least 5 of 6 checks correct.'
    : '✗ Mastery condition not met: it needs a valid order and at least 5 of 6 checks correct.',
    innerW), pad, y, 20);
  textStyle(NORMAL);
  fill('dimgray');
  const evid = (r === firstResult)
    ? 'This is your first submission, which counts as evidence. Press Reset to try again.'
    : 'Practice attempt ' + attempt + '. First submission (the evidence): ' + scoreLine(firstResult) +
      (firstResult.mastered ? ', mastery met.' : ', mastery not met.');
  y = drawLines(wrapText(evid, innerW), pad, y, 20) + 6;

  // per-step check feedback, S1..S6, paged to fit
  const items = STEPS.map(s => {
    const ok = checks[s.id] === s.testable;
    textStyle(BOLD);
    const head = wrapText((ok ? '✓ Correct check - ' : '✗ Incorrect check - ') + stepName(s.id) +
      ': ' + s.text, innerW - 20);
    textStyle(NORMAL);
    let detail = '';
    // option letters (A, B, C as in the chapter's table) are revealed only after submission
    if (!ok) detail += 'Your check (' + checks[s.id] + '): ' + s.options[checks[s.id]] + '. ';
    detail += 'Testable check (' + s.testable + '): ' + s.options[s.testable] + '. Why: ' + s.why;
    const detailLines = wrapText(detail, innerW - 20);
    return { ok, head, detailLines, h: (head.length + detailLines.length) * 20 + 14 };
  });
  const footerH = 24;
  const noteLines = (() => { textSize(14); const l = wrapText(FOM_NOTE, innerW); textSize(16); return l; })();
  const noteH = noteLines.length * 17 + 4;
  const avail = drawHeight - y - footerH - noteH - 4;
  const pages = [];
  let cur = [], used = 0;
  for (const it of items) {
    if (cur.length > 0 && used + it.h > avail) {
      pages.push(cur);
      cur = [];
      used = 0;
    }
    cur.push(it);
    used += it.h + 5;
  }
  if (cur.length > 0) pages.push(cur);
  if (pages.length !== resultPageCount) {
    resultPageCount = pages.length;
    if (resultPage >= resultPageCount) resultPage = 0;
    updateControls();
  }
  for (const it of pages[resultPage]) {
    fill(it.ok ? 'white' : 'linen');
    stroke(it.ok ? 'mediumblue' : 'saddlebrown');
    strokeWeight(it.ok ? 1 : 2);
    rect(pad, y, innerW, it.h, 8);
    strokeWeight(1);
    fill(it.ok ? 'mediumblue' : 'saddlebrown');
    textStyle(BOLD);
    let yy = drawLines(it.head, pad + 10, y + 7, 20);
    textStyle(NORMAL);
    fill('black');
    drawLines(it.detailLines, pad + 10, yy, 20);
    y += it.h + 5;
  }
  textSize(14);
  fill('dimgray');
  y = drawLines(noteLines, pad, y + 2, 17);
  textSize(16);
  layoutBottom = y;

  if (resultPageCount > 1) {
    fill('dimgray');
    noStroke();
    textAlign(LEFT, TOP);
    text('Check feedback: page ' + (resultPage + 1) + ' of ' + resultPageCount +
      ' (press Next Page)', pad, drawHeight - footerH);
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

// Export the pure logic for testing in node; ignored in the browser and the p5.js editor
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STEPS, firstViolation, isValidOrder, countCorrectChecks, scoreSubmission,
    waldenFoM, shuffle };
}
