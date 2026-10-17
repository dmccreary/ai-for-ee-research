// MicroSim Suitability Judge
// CANVAS_HEIGHT: 610
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner judges, for each of eight illustrative pieces of research content, whether an
// interactive MicroSim or a static figure or text is the better medium.
// Eight items, one attempt each, in a fixed order. After each submitted judgment the sim says
// "Correct." or "The better medium is <medium>." plus the "Why" sentence. After item 8 it shows
// "n of 8 correct" and whether the mastery threshold of 7 was met.
// The design is width responsive; the buttons reflow onto two rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 530;
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
const MICROSIM = 'MicroSim';
const STATIC = 'Static figure or text';

const CRITERION = 'A MicroSim suits content with a parameter the learner can change, or a ' +
  'process the learner can step through or predict, where seeing the response builds understanding.';

const QUESTION = 'Would a learner understand this better by changing something?';

// Fixed order. medium is the correct answer; why is shown as feedback.
const ITEMS = [
  { id: 1, content: 'How the ENOB of an ADC falls as added noise increases.',
    medium: MICROSIM,
    why: 'It is a dependence on a parameter, and moving the noise slider shows the relationship.' },
  { id: 2, content: 'A die photograph of the fabricated converter.',
    medium: STATIC,
    why: 'It is a single image with no parameter or process.' },
  { id: 3, content: 'How a successive-approximation search converges, bit by bit, to the digital code of an input voltage.',
    medium: MICROSIM,
    why: 'It is a process the learner can step through and predict.' },
  { id: 4, content: 'The bill of materials for the test board.',
    medium: STATIC,
    why: 'It is a reference table with no parameter or process.' },
  { id: 5, content: 'How the choice of window changes spectral leakage when the signal frequency moves away from an exact FFT bin.',
    medium: MICROSIM,
    why: 'It is a dependence on two parameters, and the response is visual.' },
  { id: 6, content: 'The author list and affiliations of the paper.',
    medium: STATIC,
    why: 'It is a fact with no parameter or process.' },
  { id: 7, content: 'The derivation of the Walden figure of merit from its definition.',
    medium: STATIC,
    why: 'It is a short derivation with no parameter, and text with an equation serves it.' },
  { id: 8, content: 'How the spread of residual offset across devices changes as the number of calibration bits increases.',
    medium: MICROSIM,
    why: 'It is a dependence on a parameter, and the distribution changes visibly.' }
];

const MASTERY = 7;   // mastery requires at least 7 of 8 correct on the first (only) attempt

// Color-blind-safe pair (Okabe-Ito blue and a dark vermillion); meaning is also carried by
// the words "Correct." / "The better medium is ..." and by the check and X symbols.
const COLOR_RIGHT = '#0062A0';
const COLOR_WRONG = '#A63D00';

// ---------------------------------------------------------------
// Pure logic (no p5 calls), testable in node
// ---------------------------------------------------------------
function mediumWord(medium) {
  // "MicroSim" or "static figure or text" as it reads inside a sentence
  return medium === MICROSIM ? 'MicroSim' : 'static figure or text';
}

// Judge one submitted choice for the item at index i.
function judge(i, choice) {
  const item = ITEMS[i];
  const correct = choice === item.medium;
  const headline = correct ? 'Correct.' : 'The better medium is ' + mediumWord(item.medium) + '.';
  return { correct: correct, headline: headline, why: item.why };
}

function scoreLine(score) {
  return score + ' of ' + ITEMS.length + ' correct';
}

function masteryMet(score) {
  return score >= MASTERY;
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let itemPos = 0;          // index into ITEMS (fixed order)
let selected = null;      // choice made but not yet submitted
let submitted = false;    // has the current item been submitted?
let result = null;        // judge() result for the current item
let score = 0;
let finished = false;
let layoutBottom = 0;     // lowest y used by drawn content (used for layout testing)

// controls
let microsimButton;
let staticButton;
let actionButton;         // Submit / Next Item / See Score

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(286);   // MicroSim
let lrs = null, itemStart = 0;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out.
  // mouseClicked binds the click event, so Enter and Space on a focused button also work.
  microsimButton = createButton(MICROSIM);
  microsimButton.parent(document.querySelector('main'));
  styleButton(microsimButton);
  microsimButton.mouseClicked(() => choose(MICROSIM));

  staticButton = createButton(STATIC);
  staticButton.parent(document.querySelector('main'));
  styleButton(staticButton);
  staticButton.mouseClicked(() => choose(STATIC));

  actionButton = createButton('Submit');
  actionButton.parent(document.querySelector('main'));
  styleButton(actionButton);
  actionButton.mouseClicked(actionPressed);

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'MicroSim Suitability Judge', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the MicroSim Suitability Judge MicroSim', pageDwell: true });
  }
  itemStart = Date.now();

  updateControls();

  describe('MicroSim Suitability Judge. Eight illustrative pieces of research content are shown one ' +
    'at a time, in a fixed order, with the criterion: a MicroSim suits content with a parameter the ' +
    'learner can change, or a process the learner can step through or predict. For each item choose ' +
    'MicroSim or Static figure or text and press Submit. The sim says Correct or names the better ' +
    'medium, and gives the reason. After item 8 it shows the number correct out of 8 and whether the ' +
    'mastery threshold of 7 was met.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Activity logic
// ---------------------------------------------------------------
function choose(medium) {
  if (finished || submitted) return;
  selected = medium;
  updateControls();
  redraw();
}

function actionPressed() {
  if (finished) return;
  if (!submitted) {
    if (selected === null) return;
    // one attempt per item: the judgment is final once submitted
    result = judge(itemPos, selected);
    if (result.correct) score++;
    if (lrs) {
      const it = ITEMS[itemPos];
      lrs.question('q-item-' + it.id, { name: 'Item ' + it.id + ': ' + it.content, concept: PAGE_CONCEPT() })
        .answer({ success: result.correct, response: LRS.slug(selected),
                  durationMs: itemStart ? Date.now() - itemStart : undefined });
    }
    submitted = true;
  } else if (itemPos < ITEMS.length - 1) {
    itemPos++;
    selected = null;
    submitted = false;
    result = null;
    itemStart = Date.now();
  } else {
    finished = true;
  }
  // Submit is disabled on a new item, so move keyboard focus to the first choice
  const hadFocus = document.activeElement === actionButton.elt;
  updateControls();
  if (hadFocus && !finished && !submitted) microsimButton.elt.focus();
  redraw();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  if (finished) {
    microsimButton.hide();
    staticButton.hide();
    actionButton.hide();
    return;
  }
  for (const [b, m] of [[microsimButton, MICROSIM], [staticButton, STATIC]]) {
    const isSel = selected === m;
    b.attribute('aria-pressed', isSel ? 'true' : 'false');
    b.style('font-weight', isSel ? 'bold' : 'normal');
    b.style('outline', isSel ? '3px solid black' : 'none');
    b.style('outline-offset', '1px');
    setEnabled(b, !submitted);
  }
  if (!submitted) {
    actionButton.html('Submit');
    setEnabled(actionButton, selected !== null);
  } else {
    actionButton.html(itemPos === ITEMS.length - 1 ? 'See Score' : 'Next Item');
    setEnabled(actionButton, true);
  }
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the buttons left to right, wrapping onto a second row when needed
function layoutControls() {
  if (finished) return;
  const visible = [microsimButton, staticButton, actionButton];
  const gap = 12;
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
  if (textWidth('MicroSim Suitability Judge') > canvasWidth - 2 * pad) textSize(20);
  text('MicroSim Suitability Judge', canvasWidth / 2, 10);
  textStyle(NORMAL);

  let y = drawCriterion(46);
  if (finished) drawSummary(y);
  else drawItem(y);
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

// The criterion stays visible on every screen
function drawCriterion(y) {
  const innerW = canvasWidth - 2 * pad;
  textSize(16);
  textStyle(NORMAL);
  const lines = wrapText(CRITERION, innerW - 20);
  const boxH = (lines.length + 1) * 20 + 14;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(pad, y, innerW, boxH, 8);
  fill('black');
  textStyle(BOLD);
  drawLines(['Criterion'], pad + 10, y + 7, 20);
  textStyle(NORMAL);
  drawLines(lines, pad + 10, y + 27, 20);
  return y + boxH + 10;
}

function drawItem(y) {
  const innerW = canvasWidth - 2 * pad;
  const item = ITEMS[itemPos];

  // status line
  textSize(16);
  fill('black');
  y = drawLines(['Item ' + (itemPos + 1) + ' of ' + ITEMS.length], pad, y, 20) + 4;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 8;
  textStyle(NORMAL);

  // item card
  textSize(18);
  textStyle(BOLD);
  const cardLines = wrapText(item.content, innerW - 24);
  const cardH = cardLines.length * 23 + 20 + 22;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  textSize(14);
  textStyle(ITALIC);
  fill('dimgray');
  drawLines(['Illustrative'], pad + 12, y + 8, 18);
  textSize(18);
  textStyle(BOLD);
  fill('black');
  drawLines(cardLines, pad + 12, y + 30, 23);
  textStyle(NORMAL);
  y += cardH + 12;

  textSize(16);
  if (!submitted) {
    fill('black');
    const prompt = selected === null
      ? 'Choose MicroSim or Static figure or text with the buttons below, then press Submit. Each item has one attempt.'
      : 'Your choice: ' + selected + '. Press Submit to commit it. You can still change it before you submit.';
    y = drawLines(wrapText(prompt, innerW), pad, y, 20);
  } else {
    fill('black');
    y = drawLines(wrapText('Your judgment: ' + selected, innerW), pad, y, 20) + 4;
    textSize(18);
    textStyle(BOLD);
    fill(result.correct ? COLOR_RIGHT : COLOR_WRONG);
    const mark = result.correct ? '✓ ' : '✗ ';
    y = drawLines(wrapText(mark + result.headline, innerW), pad, y, 24);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    y = drawLines(wrapText(result.why, innerW), pad, y, 20);
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(16);
  fill('black');
  y = drawLines(['All eight items judged'], pad, y, 20) + 6;

  textSize(28);
  textStyle(BOLD);
  y = drawLines([scoreLine(score)], pad, y, 36) + 4;

  textSize(18);
  const met = masteryMet(score);
  fill(met ? COLOR_RIGHT : COLOR_WRONG);
  const msg = met
    ? '✓ The mastery threshold of ' + MASTERY + ' was met.'
    : '✗ The mastery threshold of ' + MASTERY + ' was not met.';
  y = drawLines(wrapText(msg, innerW), pad, y, 24);
  textStyle(NORMAL);
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

// Allow the pure logic to be tested in node; ignored in the browser and the p5.js editor
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ITEMS, MICROSIM, STATIC, MASTERY, CRITERION, QUESTION, judge, scoreLine, masteryMet };
}
