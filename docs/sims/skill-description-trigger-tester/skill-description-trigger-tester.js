// Skill Description Trigger Tester MicroSim
// CANVAS_HEIGHT: 615
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner reads one illustrative skill description and decides, for eight user requests
// in a fixed order, whether an agent should load the skill ("Should trigger") or not
// ("Should not trigger"). One attempt per request, the correct answer and the "Why" sentence
// are always revealed, and the final score is "n of 8 correct" with a mastery threshold of 7.
// The design is width responsive; text shrinks slightly at narrow widths so nothing is clipped.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 535;
// Control region: up to two rows of buttons = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let fs = 16;                // current base font size (reduced at narrow widths if needed)
let lh = 20;                // current line height

// Color-blind-safe colors (Okabe-Ito blue and vermillion, darkened for text contrast).
// Every color cue is paired with a symbol and words (check mark / X, "Correct" / "Correct answer").
const OK_STROKE = '#0072B2';
const OK_TEXT = '#005A8C';
const OK_FILL = '#E3F1FA';
const BAD_STROKE = '#D55E00';
const BAD_TEXT = '#A0410D';
const BAD_FILL = '#FBE9DD';

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const DESCRIPTION = 'Check a SPICE netlist for floating nodes, a missing .end card, and unit suffix ' +
  'errors. Use when the user asks to lint, check, or validate a .sp or .cir netlist file.';

const ANSWERS = ['Should trigger', 'Should not trigger'];

// answer: 0 = Should trigger, 1 = Should not trigger
// shared: the keyword a "should not trigger" request shares with the description (used in the summary)
const REQUESTS = [
  { id: 1, text: 'Lint circuits/ldo.sp for floating nodes.', answer: 0,
    why: 'It asks for the checking task the description names.' },
  { id: 2, text: 'Is there anything wrong with this netlist? (a .cir file is attached)', answer: 0,
    why: 'It asks for a check of a .cir netlist, which the description covers.' },
  { id: 3, text: 'Run the transient simulation of ldo.sp and plot Vout.', answer: 1,
    why: 'It asks for simulation and plotting. It mentions the same file but not the checking task.',
    shared: '.sp file (ldo.sp)' },
  { id: 4, text: 'Write a netlist for a two-stage op-amp.', answer: 1,
    why: 'It asks for a netlist to be generated, not checked.',
    shared: 'netlist' },
  { id: 5, text: 'Validate that every .sp file under circuits/ ends with a .end card.', answer: 0,
    why: 'It asks for validation of a property the description names.' },
  { id: 6, text: 'Explain what a floating node is.', answer: 1,
    why: 'It is a concept question and does not ask for a file to be checked.',
    shared: 'floating node' },
  { id: 7, text: 'Check my Verilog testbench for syntax errors.', answer: 1,
    why: 'It asks for a check, but of a different language than the description covers.',
    shared: 'check, errors' },
  { id: 8, text: 'My 1M resistor behaves like one milliohm. Check the units in ldo.sp.', answer: 0,
    why: 'It asks for a check of unit suffixes in a .sp file. In SPICE, M means milli and MEG means mega.' }
];

const QUESTION = 'Would an agent load this skill for this request?';
const MASTERY = 7;   // mastery requires at least 7 of 8 correct on the first attempt

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let pos = 0;             // index of the current request (fixed order, 0..7)
let selected = -1;       // answer selected but not yet submitted
let committed = false;   // has the current request been submitted?
let score = 0;           // correct answers so far
let results = [];        // results[i] = the submitted answer index for request i
let finished = false;    // summary screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let answerButtons = [];
let actionButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let a = 0; a < ANSWERS.length; a++) {
    const b = createButton(ANSWERS[a]);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.mouseClicked(() => selectAnswer(a));
    answerButtons.push(b);
  }
  actionButton = createButton('Submit');
  actionButton.parent(document.querySelector('main'));
  styleButton(actionButton);
  actionButton.mouseClicked(actionPressed);

  updateControls();

  describe('Skill Description Trigger Tester. An illustrative skill description for checking SPICE ' +
    'netlists is shown with one of eight user requests. Choose Should trigger or Should not trigger ' +
    'and press Submit. The sim says whether the answer was correct, shows the correct answer and the ' +
    'reason, and moves to the next request. After eight requests it shows n of 8 correct, whether ' +
    'the mastery threshold of 7 was met, and the requests that share a keyword with the description ' +
    'but should not trigger.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
  b.style('border', '1px solid #767676');
  b.style('border-radius', '4px');
}

// ---------------------------------------------------------------
// Activity logic
// ---------------------------------------------------------------
function selectAnswer(a) {
  if (finished || committed) return;
  selected = a;
  updateControls();
  redraw();
}

function actionPressed() {
  if (finished) return;
  if (!committed) {
    // Submit: one attempt per request, committed at once
    if (selected < 0) return;
    committed = true;
    results[pos] = selected;
    if (selected === REQUESTS[pos].answer) score++;
  } else if (pos < REQUESTS.length - 1) {
    pos++;
    committed = false;
    selected = -1;
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  for (let a = 0; a < answerButtons.length; a++) {
    const b = answerButtons[a];
    if (finished) { b.hide(); continue; }
    b.show();
    setEnabled(b, !committed);
    const on = a === selected;
    // selection cue that does not rely on color: thick border and bold label, plus aria-pressed
    b.style('border', on ? '3px solid black' : '1px solid #767676');
    b.style('font-weight', on ? 'bold' : 'normal');
    b.attribute('aria-pressed', on ? 'true' : 'false');
  }
  if (finished) {
    actionButton.hide();
  } else {
    actionButton.show();
    if (!committed) {
      actionButton.html('Submit');
      setEnabled(actionButton, selected >= 0);
    } else {
      actionButton.html(pos === REQUESTS.length - 1 ? 'See Score' : 'Next Request');
      setEnabled(actionButton, true);
    }
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
  const visible = answerButtons.concat([actionButton]);
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
  // Draw at the normal text size; if the content does not fit at this width,
  // repaint with a slightly smaller size (never below 14 px).
  for (const s of [16, 15, 14]) {
    fs = s;
    lh = Math.round(s * 1.25);
    paint();
    if (layoutBottom <= drawHeight - 4) break;
  }
}

function paint() {
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
  textSize(fs + 6);
  text('Skill Description Trigger Tester', canvasWidth / 2, 10);
  textStyle(NORMAL);

  let y = 10 + fs + 14;
  if (finished) drawSummary(y);
  else drawPlay(y);

  if (finished) {
    fill('dimgray');
    noStroke();
    textSize(fs);
    textAlign(LEFT, TOP);
    drawLines(wrapText('All 8 requests answered. Reload the page to start over.',
      canvasWidth - 2 * pad), pad, drawHeight + 12, lh);
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
  const req = REQUESTS[pos];

  // skill description box (always visible)
  textSize(fs);
  textStyle(BOLD);
  const labelLines = wrapText('Skill description (illustrative):', innerW - 20);
  textStyle(NORMAL);
  const descLines = wrapText('"' + DESCRIPTION + '"', innerW - 20);
  const descH = (labelLines.length + descLines.length) * lh + 14;
  fill('white');
  stroke('gray');
  strokeWeight(1);
  rect(pad, y, innerW, descH, 8);
  fill('black');
  textStyle(BOLD);
  let yy = drawLines(labelLines, pad + 10, y + 7, lh);
  textStyle(NORMAL);
  drawLines(descLines, pad + 10, yy, lh);
  y += descH + 8;

  // status line
  fill('black');
  y = drawLines(wrapText('Request ' + (pos + 1) + ' of 8  |  Correct so far: ' + score, innerW),
    pad, y, lh) + 2;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, lh) + 6;
  textStyle(NORMAL);

  // request card
  textSize(fs + 2);
  textStyle(BOLD);
  const cardLines = wrapText(req.id + '. ' + req.text, innerW - 24);
  const cardLh = lh + 3;
  const cardH = cardLines.length * cardLh + 18;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  fill('black');
  drawLines(cardLines, pad + 12, y + 10, cardLh);
  textStyle(NORMAL);
  y += cardH + 10;

  // feedback area
  textSize(fs);
  if (!committed) {
    fill('black');
    let msg;
    if (selected < 0) {
      msg = 'Choose Should trigger or Should not trigger below, then press Submit. ' +
        'Each request gets one attempt.';
    } else {
      msg = 'Your choice: ' + ANSWERS[selected] + '. Press Submit to commit it, ' +
        'or pick the other answer first.';
    }
    y = drawLines(wrapText(msg, innerW), pad, y, lh);
  } else {
    const correct = results[pos] === req.answer;
    textStyle(BOLD);
    const head = correct
      ? '✓ Correct.'
      : '✗ Correct answer: ' + ANSWERS[req.answer] + '. (You chose ' + ANSWERS[results[pos]] + '.)';
    const headLines = wrapText(head, innerW - 20);
    textStyle(NORMAL);
    const whyLines = wrapText('Why: ' + req.why, innerW - 20);
    const boxH = (headLines.length + whyLines.length) * lh + 14;
    fill(correct ? OK_FILL : BAD_FILL);
    stroke(correct ? OK_STROKE : BAD_STROKE);
    strokeWeight(2);
    rect(pad, y, innerW, boxH, 8);
    strokeWeight(1);
    fill(correct ? OK_TEXT : BAD_TEXT);
    textStyle(BOLD);
    let fy = drawLines(headLines, pad + 10, y + 7, lh);
    textStyle(NORMAL);
    fill('black');
    drawLines(whyLines, pad + 10, fy, lh);
    y += boxH;
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  // score
  textSize(fs + 8);
  textStyle(BOLD);
  fill('black');
  y = drawLines([score + ' of 8 correct'], pad, y, fs + 14);
  textSize(fs);
  const mastered = score >= MASTERY;
  fill(mastered ? OK_TEXT : BAD_TEXT);
  const masteryStr = mastered
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 8 correct.'
    : '✗ Mastery threshold not met: at least ' + MASTERY + ' of 8 correct are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, lh) + 10;
  textStyle(NORMAL);

  // near-miss list: requests that share a keyword with the description but should not trigger
  fill('black');
  textStyle(BOLD);
  y = drawLines(wrapText('Requests that share a keyword with the description but should not trigger:',
    innerW), pad, y, lh) + 4;
  textStyle(NORMAL);

  for (const r of REQUESTS) {
    if (r.answer !== 1) continue;
    textStyle(BOLD);
    const tLines = wrapText(r.id + '. ' + r.text, innerW - 20);
    textStyle(NORMAL);
    const dLines = wrapText('Shared keyword: ' + r.shared + '. ' + r.why, innerW - 20);
    const h = (tLines.length + dLines.length) * lh + 12;
    fill('white');
    stroke('gray');
    strokeWeight(1);
    rect(pad, y, innerW, h, 8);
    fill('black');
    textStyle(BOLD);
    let yy = drawLines(tLines, pad + 10, y + 6, lh);
    textStyle(NORMAL);
    drawLines(dLines, pad + 10, yy, lh);
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
