// Sycophancy Spotter MicroSim
// CANVAS_HEIGHT: 650
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner classifies the model's reply in each of six illustrative researcher-model
// exchanges as "sycophantic" or "calibrated". Six exchanges in a fixed order, one attempt
// each, the correct classification is always revealed with the "Why" sentence, and the
// final screen shows "n of 6 correct" and whether the mastery threshold of 5 was met.
// The design is width responsive; controls wrap onto two rows when narrow.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 570;
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
// Definitions are the Rules of the specification
const CLASSES = [
  { name: 'Sycophantic', word: 'sycophantic',
    rule: 'Agrees with, validates, or reverses to match the researcher\'s stated view without new evidence.' },
  { name: 'Calibrated', word: 'calibrated',
    rule: 'Changes only for supplied evidence, or states what it cannot establish and what would.' }
];

// answer is the index into CLASSES
const EXCHANGES = [
  { id: 1,
    researcher: '"I think this 10-bit ADC has an ENOB of 11 bits."',
    modelLabel: 'Model:',
    model: '"You\'re right, 11 bits is achievable here."',
    answer: 0, why: 'It agrees with an impossible claim for a nominal 10-bit converter without any evidence.' },
  { id: 2,
    researcher: '"Are you sure? I think the notch is at 60 Hz."',
    modelLabel: 'Model (earlier answer, from pasted text: 50 Hz):',
    model: '"You may be right, I apologize. The notch is at 60 Hz."',
    answer: 0, why: 'It reverses an evidenced answer when no new evidence was given.' },
  { id: 3,
    researcher: '"The datasheet text I pasted says 50 Hz."',
    modelLabel: 'Model:',
    model: '"Thank you. The pasted text states 50 Hz, so my earlier value of 60 Hz was wrong."',
    answer: 1, why: 'It updates because evidence was supplied and cites it.' },
  { id: 4,
    researcher: '"I\'m sure my calibration scheme is novel."',
    modelLabel: 'Model:',
    model: '"It does appear novel, and I can\'t think of anything similar."',
    answer: 0, why: 'It validates a novelty claim from memory without a search and without caveats.' },
  { id: 5,
    researcher: '"Is my method novel?"',
    modelLabel: 'Model:',
    model: '"I can\'t establish novelty from memory. Two approaches I know of are close, and here is ' +
      'how yours differs. A search would need to check these."',
    answer: 1, why: 'It declines to certify, states what it knows, and names the check.' },
  { id: 6,
    researcher: '"Please just confirm the result is right."',
    modelLabel: 'Model:',
    model: '"I can\'t confirm that from the numbers alone. Two checks that would: a known-answer test ' +
      'and an independent method."',
    answer: 1, why: 'It declines to certify and proposes checks that could.' }
];

const QUESTION = 'Did the reply follow the evidence or the researcher?';
const MASTERY = 5;   // mastery requires at least 5 of 6 correct on the first attempt

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
let pos = 0;             // index of the current exchange (fixed order 0..5)
let committed = false;   // has the current exchange been classified?
let chosen = -1;         // class index chosen for the current exchange
let runScore = 0;        // correct classifications so far in this run
let runHistory = [];     // scores of completed runs
let runNumber = 1;
let finished = false;    // summary screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let classButtons = [];

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(306);   // Sycophancy
let lrs = null, exStart = 0;
let nextButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let c = 0; c < CLASSES.length; c++) {
    const b = createButton(CLASSES[c].name);
    b.parent(document.querySelector('main'));
    styleButton(b);
    onActivate(b, () => classifyPressed(c));
    classButtons.push(b);
  }
  nextButton = createButton('Next Exchange');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  onActivate(nextButton, nextPressed);

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Sycophancy Spotter', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Sycophancy Spotter MicroSim', pageDwell: true });
  }

  startRun();

  describe('Sycophancy Spotter. Six illustrative exchanges between a researcher and a model are ' +
    'shown one at a time in a fixed order, with definitions of a sycophantic reply and a calibrated ' +
    'reply. Press Sycophantic or Calibrated to classify the model reply. Each exchange gets one ' +
    'attempt. The sim says whether the classification was correct, names the correct one, and gives ' +
    'the reason. After exchange 6 it shows the score out of 6 and whether the mastery threshold of 5 was met.');

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
  pos = 0;
  committed = false;
  chosen = -1;
  runScore = 0;
  finished = false;
  exStart = Date.now();
  updateControls();
  redraw();
}

function currentExchange() {
  return EXCHANGES[pos];
}

// Commit a classification: one attempt per exchange, no change after commit
function commitChoice(c) {
  if (finished || committed || c < 0 || c >= CLASSES.length) return false;
  chosen = c;
  committed = true;
  if (c === currentExchange().answer) runScore++;
  return true;
}

function classifyPressed(c) {
  if (commitChoice(c)) {
    if (lrs) lrs.question('q-exchange-' + currentExchange().id, { name: 'Exchange ' + currentExchange().id + ': ' + currentExchange().model,
                                                                  concept: PAGE_CONCEPT() })
      .answer({ success: c === currentExchange().answer, response: CLASSES[c].word,
                durationMs: Date.now() - exStart, extensions: { 'run-number': runNumber } });
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
  if (pos < EXCHANGES.length - 1) {
    pos++;
    exStart = Date.now();
    committed = false;
    chosen = -1;
  } else {
    finished = true;
    runHistory.push(runScore);
  }
  updateControls();
  redraw();
}

function masteryMet(score) {
  return score >= MASTERY;
}

// Feedback headline for a committed choice (texts from the specification)
function feedbackHeadline(ex, c) {
  if (c === ex.answer) return 'Correct.';
  return 'This reply is ' + CLASSES[ex.answer].word + '.';
}

function scoreLine(score) {
  return score + ' of ' + EXCHANGES.length + ' correct';
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  for (const b of classButtons) {
    if (finished) {
      b.hide();
    } else {
      b.show();
      setEnabled(b, !committed);
    }
  }
  if (finished) {
    nextButton.html('Start Over');
    setEnabled(nextButton, true);
  } else {
    nextButton.html(pos === EXCHANGES.length - 1 ? 'See Score' : 'Next Exchange');
    setEnabled(nextButton, committed);
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
  if (!finished) for (const b of classButtons) visible.push(b);
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
  text('Sycophancy Spotter', canvasWidth / 2, 10);
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
  const parts = shown.map((s, i) => 'Run ' + (first + i) + ': ' + s + ' of 6');
  return 'Scores by run: ' + parts.join(', ');
}

// One speaker box: bold speaker label followed by the quoted words on the same lines
function speakerHeight(label, words, w) {
  return wrapRichRow(label, words, w - 20).length * 20 + 10;
}

function drawSpeaker(label, words, x, y, w, boxFill, boxStroke) {
  textSize(16);
  const lines = wrapRichRow(label, words, w - 20);
  const h = lines.length * 20 + 10;
  fill(boxFill);
  stroke(boxStroke);
  strokeWeight(1);
  rect(x, y, w, h, 8);
  drawRichRow(lines, x + 10, y + 5);
  return y + h;
}

// A row is a bold label followed by plain text; returns lines of {s, bold} segments
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
    lineW += (line.length ? textWidth(' ') : 0) + ww;
    line.push(w);
  }
  if (line.length) lines.push(line);
  textStyle(NORMAL);
  return lines;
}

function drawRichRow(lines, x, y) {
  textAlign(LEFT, TOP);
  fill('black');
  for (const line of lines) {
    let xx = x;
    for (let i = 0; i < line.length; i++) {
      const w = line[i];
      textStyle(w.bold ? BOLD : NORMAL);
      const str = (i < line.length - 1) ? w.s + ' ' : w.s;
      noStroke();
      text(str, xx, y);
      xx += textWidth(str);
    }
    y += 20;
  }
  textStyle(NORMAL);
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const ex = currentExchange();

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

  // exchange card holding the two speaker boxes
  const cardTop = y;
  textSize(16);
  const boxW = innerW - 24;
  const cardH = 28 + speakerHeight('Researcher:', ex.researcher, boxW) + 6 +
    speakerHeight(ex.modelLabel, ex.model, boxW) + 10;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, cardTop, innerW, cardH, 10);
  strokeWeight(1);
  fill('dimgray');
  textStyle(NORMAL);
  drawLines(['Exchange ' + ex.id + ' of 6 (illustrative)'], pad + 12, cardTop + 6, 20);
  let yy = cardTop + 28;
  yy = drawSpeaker('Researcher:', ex.researcher, pad + 12, yy, boxW, 'whitesmoke', 'silver') + 6;
  drawSpeaker(ex.modelLabel, ex.model, pad + 12, yy, boxW, 'azure', 'steelblue');
  y = cardTop + cardH + 8;

  // the two definitions (fixed order)
  textSize(16);
  for (let c = 0; c < CLASSES.length; c++) {
    const isAnswer = committed && c === ex.answer;
    const isWrongPick = committed && c === chosen && c !== ex.answer;
    let marker = '';
    let tag = '';
    if (isAnswer) { marker = '✓ '; tag = c === chosen ? ' (your choice, correct)' : ' (correct)'; }
    if (isWrongPick) { marker = '✗ '; tag = ' (your choice)'; }

    const rowLines = wrapRichRow(marker + CLASSES[c].name + tag + ':', CLASSES[c].rule, innerW - 20);
    const boxH = rowLines.length * 20 + 10;

    if (isAnswer) { fill(OK_FILL); stroke(OK_STROKE); strokeWeight(3); }
    else if (isWrongPick) { fill(BAD_FILL); stroke(BAD_STROKE); strokeWeight(3); }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(pad, y, innerW, boxH, 8);
    strokeWeight(1);
    drawRichRow(rowLines, pad + 10, y + 5);
    y += boxH + 5;
  }
  y += 4;

  // feedback
  if (!committed) {
    fill('black');
    textSize(16);
    y = drawLines(wrapText('Press Sycophantic or Calibrated below. One attempt per exchange; ' +
      'it cannot be changed after you press.', innerW), pad, y, 20);
  } else {
    const correct = chosen === ex.answer;
    textSize(18);
    textStyle(BOLD);
    fill(correct ? OK_TEXT : BAD_TEXT);
    y = drawLines(wrapText((correct ? '✓ ' : '✗ ') + feedbackHeadline(ex, chosen), innerW), pad, y, 23);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    y = drawLines(wrapText('Why: ' + ex.why, innerW), pad, y, 20);
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(16);
  fill('black');
  y = drawLines(['Run ' + runNumber + ' complete'], pad, y, 20) + 4;

  // score
  textSize(24);
  textStyle(BOLD);
  fill('black');
  y = drawLines([scoreLine(runScore)], pad, y, 30) + 2;
  textSize(16);
  const mastered = masteryMet(runScore);
  fill(mastered ? OK_TEXT : BAD_TEXT);
  const masteryStr = mastered
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 6 correct.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of 6 correct are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  fill('black');
  y = drawLines(wrapText(historyText(), innerW), pad, y, 20);
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
