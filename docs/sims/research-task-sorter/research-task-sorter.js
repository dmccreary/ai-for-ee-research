// Research Task Sorter MicroSim
// CANVAS_HEIGHT: 670
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner sorts ten research task cards into three groups:
// "AI drafts, you verify", "You decide, AI assists", and "You do directly".
// One placement per card, no change after commit, immediate feedback with the "Why" sentence,
// a score of n of 10 at the end (mastery at 8 or more), and a reshuffled second run.
// The design is width responsive; controls reflow onto two rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 590;
// Control region: two rows of buttons = (2 x 35) + 10 = 80
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
const GROUPS = [
  { name: 'AI drafts, you verify',
    meaning: 'A model can produce a first version, and you can check the result cheaply' },
  { name: 'You decide, AI assists',
    meaning: 'A model can supply options or analysis; the choice depends on your knowledge and judgment' },
  { name: 'You do directly',
    meaning: 'Responsibility, commitment, or certification that cannot be handed off' }
];

// group is the index into GROUPS
const CARDS = [
  { id: 1, task: 'List 30 candidate search keywords for a literature search on low-power SAR ADCs',
    group: 0, why: 'A poor keyword costs one wasted search, and you see it immediately' },
  { id: 2, task: 'From five summarized papers, choose the two worth reading in full',
    group: 1, why: 'Relevance depends on your question and field knowledge; the model can rank, you choose' },
  { id: 3, task: 'Write a Python script that loads a CSV of measured gain versus frequency and plots it',
    group: 0, why: 'Running it on a file whose contents you know checks the result directly' },
  { id: 4, task: 'Decide whether a 3 dB gap between simulated and measured gain is a model error or a measurement error',
    group: 1, why: 'The model can list hypotheses, but only you know the probe loading, calibration, and bench setup' },
  { id: 5, task: 'Reformat a reference list from BibTeX entries to IEEE style',
    group: 0, why: 'Format conversion is mechanical, and a spot check of the entries confirms it' },
  { id: 6, task: 'Propose five alternative ways to phrase a research question',
    group: 1, why: 'The model widens the options; which framing serves your project is your call' },
  { id: 7, task: 'Commit six months of lab time to one of three candidate hypotheses',
    group: 2, why: 'The commitment of your time and resources is your responsibility, whatever options the model laid out' },
  { id: 8, task: 'Draft an abstract from a table of measured results',
    group: 0, why: 'A first draft is useful, but every number and adjective must be checked against the table' },
  { id: 9, task: 'Decide the author order and who is listed as an author',
    group: 2, why: 'Authorship carries accountability and follows community norms that only the people involved can settle' },
  { id: 10, task: 'Certify before submission that the reported measurements were taken and not generated',
    group: 2, why: 'Certification of the evidence is a personal responsibility that cannot be delegated' }
];

const QUESTION = 'Who should do this task: the model, you assisted, or only you?';
const MASTERY = 8;   // mastery requires a score >= 8 of 10

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let order = [];          // shuffled card indexes for this run
let cardPos = 0;         // position in order (0..9)
let committed = false;   // has the current card been placed?
let chosenGroup = -1;    // group the learner picked for the current card
let placedCounts = [0, 0, 0];
let runScore = 0;        // correct placements so far in this run
let missed = [];         // [{card, chosen}] for this run
let runHistory = [];     // scores of completed runs
let runNumber = 1;
let finished = false;    // summary screen showing
let summaryPage = 0;
let summaryPageCount = 1;
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let groupButtons = [];
let nextButton;
let moreButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let g = 0; g < GROUPS.length; g++) {
    const b = createButton(GROUPS[g].name);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.mousePressed(() => placeCard(g));
    groupButtons.push(b);
  }
  nextButton = createButton('Next Card');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mousePressed(nextPressed);

  moreButton = createButton('More Missed Cards');
  moreButton.parent(document.querySelector('main'));
  styleButton(moreButton);
  moreButton.mousePressed(nextSummaryPage);

  startRun();

  describe('Research Task Sorter. One research task card is shown at a time with three group ' +
    'definitions: AI drafts, you verify; You decide, AI assists; and You do directly. Press the ' +
    'button for a group to commit the placement. The sim then says Correct or Not quite, gives the ' +
    'reason, and names the correct group. After ten cards it shows the score out of 10, whether ' +
    'mastery (8 of 10) was reached, and the cards that were placed incorrectly. Run Again reshuffles ' +
    'the cards and keeps earlier scores on screen.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Run logic
// ---------------------------------------------------------------
function shuffledOrder() {
  const a = [];
  for (let i = 0; i < CARDS.length; i++) a.push(i);
  for (let i = a.length - 1; i > 0; i--) {   // Fisher-Yates shuffle
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function startRun() {
  order = shuffledOrder();
  cardPos = 0;
  committed = false;
  chosenGroup = -1;
  placedCounts = [0, 0, 0];
  runScore = 0;
  missed = [];
  finished = false;
  summaryPage = 0;
  summaryPageCount = 1;
  updateControls();
  redraw();
}

function currentCard() {
  return CARDS[order[cardPos]];
}

// Commit a placement: one placement per card, no change after commit
function placeCard(g) {
  if (finished || committed) return;
  const card = currentCard();
  chosenGroup = g;
  committed = true;
  placedCounts[g]++;
  if (g === card.group) {
    runScore++;
  } else {
    missed.push({ card: card, chosen: g });
  }
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished) {          // button reads "Run Again"
    runNumber++;
    startRun();
    return;
  }
  if (!committed) return;
  if (cardPos < CARDS.length - 1) {
    cardPos++;
    committed = false;
    chosenGroup = -1;
  } else {
    finished = true;
    runHistory.push(runScore);
    summaryPage = 0;
  }
  updateControls();
  redraw();
}

function nextSummaryPage() {
  summaryPage = (summaryPage + 1) % summaryPageCount;
  redraw();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  for (const b of groupButtons) {
    if (finished) {
      b.hide();
    } else {
      b.show();
      setEnabled(b, !committed);
    }
  }
  if (finished) {
    nextButton.html('Run Again');
    setEnabled(nextButton, true);
  } else {
    nextButton.html(cardPos === CARDS.length - 1 ? 'See Score' : 'Next Card');
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

// Flow the visible buttons left to right, wrapping onto a second row when needed
function layoutControls() {
  const visible = [];
  if (!finished) for (const b of groupButtons) visible.push(b);
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
  text('Research Task Sorter', canvasWidth / 2, 10);
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
  const shown = runHistory.slice(-6);
  const first = runHistory.length - shown.length + 1;
  const parts = shown.map((s, i) => 'Run ' + (first + i) + ': ' + s + ' of 10');
  return 'Scores by run: ' + parts.join(', ');
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const card = currentCard();

  // status line
  textSize(16);
  fill('black');
  let status = 'Run ' + runNumber + '  |  Card ' + (cardPos + 1) + ' of 10  |  Correct so far: ' + runScore;
  if (runHistory.length > 0) {
    // compact, bounded list of earlier scores so the status stays at most two lines
    status += '  |  Earlier runs: ' + runHistory.slice(-5).join(', ') + ' of 10';
  }
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 4;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 8;
  textStyle(NORMAL);

  // task card
  textSize(18);
  textStyle(BOLD);
  const cardLines = wrapText(card.task, innerW - 24);
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

  // three group definitions (fixed order)
  textSize(16);
  for (let g = 0; g < GROUPS.length; g++) {
    const isAnswer = committed && g === card.group;
    const isWrongPick = committed && g === chosenGroup && g !== card.group;
    let marker = '';
    if (isAnswer) marker = '✓ ';     // check mark
    if (isWrongPick) marker = '✗ ';  // ballot x

    textStyle(NORMAL);
    const countStr = 'Placed: ' + placedCounts[g];
    const countW = textWidth(countStr);
    const defLines = wrapText(GROUPS[g].meaning, innerW - 20);
    const boxH = (defLines.length + 1) * 20 + 12;

    if (isAnswer) { fill('honeydew'); stroke('seagreen'); strokeWeight(3); }
    else if (isWrongPick) { fill('mistyrose'); stroke('firebrick'); strokeWeight(3); }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(pad, y, innerW, boxH, 8);
    strokeWeight(1);

    // group name (bold) and placement count (right)
    fill('black');
    textStyle(BOLD);
    noStroke();
    textAlign(LEFT, TOP);
    text(marker + GROUPS[g].name, pad + 10, y + 6);
    textStyle(NORMAL);
    fill('dimgray');
    noStroke();
    textAlign(RIGHT, TOP);
    text(countStr, pad + innerW - 10, y + 6);
    // definition
    fill('black');
    drawLines(defLines, pad + 10, y + 26, 20);
    y += boxH + 6;
  }
  y += 4;

  // feedback
  if (!committed) {
    fill('black');
    textSize(16);
    y = drawLines(wrapText('Choose a group with the buttons below. Each card gets one placement, ' +
      'and it cannot be changed after you commit it.', innerW), pad, y, 20);
  } else {
    const correct = chosenGroup === card.group;
    textSize(18);
    textStyle(BOLD);
    fill(correct ? 'seagreen' : 'firebrick');
    y = drawLines([correct ? '✓ Correct' : '✗ Not quite'], pad, y, 24);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    y = drawLines(wrapText('Why: ' + card.why + '.', innerW), pad, y, 20);
    if (!correct) {
      textStyle(BOLD);
      y = drawLines(wrapText('Correct group: ' + GROUPS[card.group].name, innerW), pad, y, 20);
      textStyle(NORMAL);
    }
  }
  layoutBottom = y;
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
  y = drawLines([runScore + ' of 10 correct'], pad, y, 30);
  textSize(16);
  const mastered = runScore >= MASTERY;
  fill(mastered ? 'seagreen' : 'firebrick');
  const masteryStr = mastered
    ? '✓ Mastery reached: at least ' + MASTERY + ' of 10 placements match the answer key.'
    : 'Not yet at mastery: ' + MASTERY + ' of 10 correct placements are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 4;
  textStyle(NORMAL);

  // score of every run stays visible
  fill('black');
  y = drawLines(wrapText(historyText(), innerW), pad, y, 20) + 8;

  // missed cards list
  textStyle(BOLD);
  y = drawLines(['Cards placed incorrectly: ' + missed.length], pad, y, 20) + 4;
  textStyle(NORMAL);

  if (missed.length === 0) {
    y = drawLines(wrapText('None. Every placement matched the answer key.', innerW), pad, y, 20);
    summaryPageCount = 1;
    layoutBottom = y;
    syncMoreButton();
    return;
  }

  // measure every missed item at the current width, then split into pages
  const items = missed.map(m => {
    textStyle(BOLD);
    const taskLines = wrapText(m.card.task, innerW - 20);
    textStyle(NORMAL);
    const detailLines = wrapText('Your pick: ' + GROUPS[m.chosen].name +
      '. Correct group: ' + GROUPS[m.card.group].name + '. Why: ' + m.card.why + '.', innerW - 20);
    return { taskLines, detailLines, h: (taskLines.length + detailLines.length) * 20 + 16 };
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
    stroke('firebrick');
    strokeWeight(1);
    rect(pad, y, innerW, it.h, 8);
    fill('black');
    textStyle(BOLD);
    let yy = drawLines(it.taskLines, pad + 10, y + 8, 20);
    textStyle(NORMAL);
    drawLines(it.detailLines, pad + 10, yy, 20);
    y += it.h + 6;
  }
  layoutBottom = y;

  if (summaryPageCount > 1) {
    fill('dimgray');
    textSize(16);
    noStroke();
    textAlign(LEFT, TOP);
    text('Missed cards: page ' + (summaryPage + 1) + ' of ' + summaryPageCount,
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
