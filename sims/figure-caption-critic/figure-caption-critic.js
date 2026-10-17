// Figure Caption Critic MicroSim
// CANVAS_HEIGHT: 860
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner critiques six illustrative figure captions by naming the main defect, or that
// there is none: Vague, Missing conditions, Undefined symbols, Overclaims, or No defect.
// A caption is judged by the first failing property, in that order. Six captions in a fixed
// order, one attempt each. After each submit the sim shows whether the judgment was correct,
// the "Why" sentence, and a suggested corrected caption where there is a defect. After
// caption 6 it shows "n of 6 correct" and whether the mastery threshold of 5 was met.
// The total canvas height is fixed; the control region grows by a row when the buttons wrap
// at narrow widths, and the drawing region takes the rest.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth;            // calculated from the container on init and on resize
let canvasWidth = 400;
let canvasHeight = 860;        // fixed total height (iframe height = canvasHeight + 2)
let containerHeight = canvasHeight;
let rowHeight = 36;            // height of one row of buttons in the control region
let controlHeight = rowHeight + 8;              // recomputed by layoutControls()
let drawHeight = canvasHeight - controlHeight;  // recomputed by layoutControls()

let margin = 25;
let sliderLeftMargin = 160;    // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;                  // inner padding of the drawing region

// Color-blind-safe palette (Okabe-Ito); meaning is also carried by symbols and words
const COLOR_CHOICE = '#0072B2';      // blue: the judgment currently chosen
const COLOR_RIGHT = '#009E73';       // bluish green: correct judgment (with a check mark)
const COLOR_RIGHT_TEXT = '#00694d';
const COLOR_RIGHT_FILL = '#e3f4ee';
const COLOR_WRONG = '#D55E00';       // vermillion: a wrong pick (with an X)
const COLOR_WRONG_TEXT = '#a34200';
const COLOR_WRONG_FILL = '#fbe6d8';

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
// The four caption properties are checked in this order; the first that fails is the
// main defect. The property questions paraphrase the chapter's checklist: what is plotted,
// the conditions, how to read it, and no unsupported claim.
const JUDGMENTS = [
  { name: 'Vague', check: 'Does it say what is plotted against what?' },
  { name: 'Missing conditions', check: 'Does it state the conditions of the data?' },
  { name: 'Undefined symbols', check: 'Are all symbols and markers defined?' },
  { name: 'Overclaims', check: 'Does it claim only what the figure shows?' },
  { name: 'No defect', check: 'None of the four fails.' }
];

// judgment is the index into JUDGMENTS.
// fix is a short corrected caption written for this sim and tagged on screen as a suggestion.
const CAPTIONS = [
  { text: 'Figure 3. ENOB results.',
    judgment: 0,
    why: 'It does not say what is plotted against what, so the reader cannot tell what the figure shows.',
    fix: 'Figure 3. Measured ENOB versus input frequency for 12 devices at 1 MS/s, 1.0 V, and 25 °C.' },
  { text: 'Figure 4. Measured ENOB versus input frequency for 12 devices at 1 MS/s, 1.0 V, and 25 °C. Markers show the mean and error bars show one standard deviation.',
    judgment: 4,
    why: 'It states the quantity, the conditions, and how to read the markers.',
    fix: '' },
  { text: 'Figure 5. Measured ENOB versus input frequency.',
    judgment: 1,
    why: 'The sampling rate, supply, temperature, and number of devices are not stated.',
    fix: 'Figure 5. Measured ENOB versus input frequency for 12 devices at 1 MS/s, 1.0 V, and 25 °C.' },
  { text: 'Figure 6. SNDR versus input frequency at 1 MS/s, 1.0 V, and 25 °C, showing that our design is the best known SAR ADC.',
    judgment: 3,
    why: 'A single figure of SNDR versus frequency cannot establish that the design is the best known.',
    fix: 'Figure 6. Measured SNDR versus input frequency at 1 MS/s, 1.0 V, and 25 °C.' },
  { text: 'Figure 7. FoM_W versus fs for ADC1 to ADC9 (measured, 65 nm).',
    judgment: 2,
    why: 'FoM_W, fs, and ADC1 to ADC9 are not defined in the caption.',
    fix: 'Figure 7. Walden figure of merit FoM_W (energy per conversion step) versus sampling rate fs for the nine converters ADC1 to ADC9 of Table I (measured, 65 nm).' },
  { text: 'Figure 8. Power breakdown of the converter at 1 MS/s and 1.0 V (simulated, typical corner): comparator 38 percent, DAC 27 percent, logic 25 percent, clock 10 percent.',
    judgment: 4,
    why: 'It states the conditions, that the data are simulated, and the breakdown, which sums to 100 percent.',
    fix: '' }
];

const QUESTION = 'Could a reader understand this figure from the caption alone?';
const MASTERY = 5;   // mastery requires at least 5 of 6 correct on the first attempt

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let pos = 0;             // index of the current caption (fixed order 0..5)
let chosen = -1;         // judgment chosen for the current caption (-1 = none chosen)
let committed = false;   // has the current choice been submitted?
let answers = [];        // submitted judgment index for each caption
let score = 0;           // correct submissions so far
let finished = false;    // summary screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let judgmentButtons = [];
let submitButton;
let nextButton;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(274);   // Figure Captions
let lrs = null, capStart = 0;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let j = 0; j < JUDGMENTS.length; j++) {
    const b = createButton(JUDGMENTS[j].name);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.attribute('aria-pressed', 'false');
    onActivate(b, () => chooseJudgment(j));
    judgmentButtons.push(b);
  }
  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  onActivate(submitButton, submitChoice);

  nextButton = createButton('Next');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  onActivate(nextButton, nextPressed);

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Figure Caption Critic', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Figure Caption Critic MicroSim', pageDwell: true });
  }
  capStart = Date.now();

  updateControls();

  describe('Figure Caption Critic. One illustrative figure caption is shown at a time with a ' +
    'checklist of four caption properties checked in order: Vague, Missing conditions, ' +
    'Undefined symbols, and Overclaims, plus No defect. Choose a judgment with the buttons and ' +
    'press Submit. The sim says whether the judgment was correct, names the main issue, gives ' +
    'the reason, and offers a suggested corrected caption where there is a defect. After six ' +
    'captions it shows the number correct out of 6 and whether the mastery threshold of 5 was met.');

  noLoop(); // nothing animates; redraw only when the state changes
}

// Run fn on a mouse click, a tap, or Enter/Space when the button has keyboard focus.
// (p5's mousePressed() listens for pointer presses only, so keyboard users could not activate it.)
function onActivate(b, fn) {
  b.elt.addEventListener('click', fn);
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 8px');
  b.style('white-space', 'nowrap');
  b.style('border-radius', '4px');
  b.style('cursor', 'pointer');
  b.style('background', '#f4f4f4');
  b.style('color', 'black');
  b.style('border', '2px solid #767676');
}

// ---------------------------------------------------------------
// Activity logic
// ---------------------------------------------------------------
function chooseJudgment(j) {
  if (finished || committed) return;
  chosen = j;
  updateControls();
  redraw();
}

// One attempt per caption: the submitted judgment cannot be changed
function submitChoice() {
  if (finished || committed || chosen < 0) return;
  if (lrs) {
    // keyed by the figure number printed in the caption ("Figure 3."), never by position
    const cap = CAPTIONS[pos];
    const fig = (cap.text.match(/^Figure (\d+)/) || [])[1] || String(pos + 1);
    lrs.question('q-figure-' + fig, { name: cap.text, concept: PAGE_CONCEPT() })
      .answer({ success: chosen === cap.judgment, response: LRS.slug(JUDGMENTS[chosen].name),
                durationMs: capStart ? Date.now() - capStart : undefined });
  }
  committed = true;
  answers[pos] = chosen;
  if (chosen === CAPTIONS[pos].judgment) score++;
  updateControls();
  redraw();
  // the pressed button is now disabled, so move keyboard focus to the next step
  nextButton.elt.focus({ preventScroll: true });
}

function nextPressed() {
  if (finished || !committed) return;
  if (pos < CAPTIONS.length - 1) {
    pos++;
    chosen = -1;
    committed = false;
    capStart = Date.now();
  } else {
    finished = true;
  }
  updateControls();
  redraw();
  if (!finished) judgmentButtons[0].elt.focus({ preventScroll: true });
}

// Enable, disable, show, hide, and mark the controls to match the state
function updateControls() {
  for (let j = 0; j < judgmentButtons.length; j++) {
    const b = judgmentButtons[j];
    if (finished) { b.hide(); continue; }
    b.show();
    setEnabled(b, !committed);
    const isChosen = j === chosen;
    b.attribute('aria-pressed', isChosen ? 'true' : 'false');
    if (isChosen) {
      b.style('background', COLOR_CHOICE);
      b.style('color', 'white');
      b.style('border', '2px solid #003f63');
      b.style('font-weight', 'bold');
    } else {
      b.style('background', '#f4f4f4');
      b.style('color', 'black');
      b.style('border', '2px solid #767676');
      b.style('font-weight', 'normal');
    }
  }
  if (finished) {
    submitButton.hide();
    nextButton.hide();
  } else {
    submitButton.show();
    nextButton.show();
    setEnabled(submitButton, chosen >= 0 && !committed);
    setEnabled(nextButton, committed);
    nextButton.html(pos === CAPTIONS.length - 1 ? 'See Score' : 'Next');
  }
  layoutControls();
}

function setEnabled(b, on) {
  if (on) {
    b.removeAttribute('disabled');
    b.style('opacity', '1');
    b.style('cursor', 'pointer');
  } else {
    b.attribute('disabled', '');
    b.style('opacity', '0.55');
    b.style('cursor', 'default');
  }
}

// Flow the visible buttons left to right, wrapping onto new rows when needed.
// The number of rows sets controlHeight; the drawing region takes the rest of the fixed height.
function layoutControls() {
  const visible = [];
  if (!finished) {
    for (const b of judgmentButtons) visible.push(b);
    visible.push(submitButton);
    visible.push(nextButton);
  }
  const gap = 6;
  const places = [];
  let x = 10;
  let row = 0;
  for (const b of visible) {
    const w = b.elt.offsetWidth;
    if (x > 10 && x + w > canvasWidth - 10) {
      x = 10;
      row++;
    }
    places.push({ b, x, row });
    x += w + gap;
  }
  const rows = Math.max(1, row + 1);
  controlHeight = rows * rowHeight + 8;
  drawHeight = canvasHeight - controlHeight;
  for (const p of places) p.b.position(p.x, drawHeight + 8 + p.row * rowHeight);
}

// ---------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------
function draw() {
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
  text('Figure Caption Critic', canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (finished) drawSummary(44);
  else drawPlay(44);
}

// Word-wrap a string to a maximum width using the current text settings.
// The first line may be shorter (firstW) when it follows a bold label on the same line.
function wrapText(str, maxW, firstW) {
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    const limit = (lines.length === 0 && firstW !== undefined) ? firstW : maxW;
    if (textWidth(test) > limit && (line || lines.length === 0 && firstW !== undefined)) {
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
  noStroke();
  for (const ln of lines) {
    text(ln, x, y);
    y += lineH;
  }
  return y;
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const cap = CAPTIONS[pos];
  const narrow = canvasWidth < 480;

  // status line
  textSize(16);
  fill('black');
  const status = 'Caption ' + (pos + 1) + ' of 6  |  Correct so far: ' + score;
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 2;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 8;
  textStyle(NORMAL);

  // caption card
  const capSize = narrow ? 16 : 18;
  const capLineH = narrow ? 21 : 23;
  textSize(capSize);
  textStyle(BOLD);
  const capLines = wrapText(cap.text, innerW - 24);
  const cardH = 20 + capLines.length * capLineH + 16;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  textStyle(NORMAL);
  textSize(16);
  fill('dimgray');
  drawLines(['Caption ' + (pos + 1) + ' (illustrative)'], pad + 12, y + 8, 20);
  textSize(capSize);
  textStyle(BOLD);
  fill('black');
  drawLines(capLines, pad + 12, y + 30, capLineH);
  textStyle(NORMAL);
  y += cardH + 10;

  // checklist, in the order the properties are checked
  textSize(16);
  textStyle(BOLD);
  fill('black');
  y = drawLines(wrapText('Checklist, in order. The first property that fails is the main defect:',
    innerW), pad, y, 20) + 4;
  let nameW = 0;
  for (const j of JUDGMENTS) nameW = max(nameW, textWidth((JUDGMENTS.indexOf(j) + 1) + '. ' + j.name));
  textStyle(NORMAL);
  let longestQ = 0;
  for (const j of JUDGMENTS) longestQ = max(longestQ, textWidth(j.check));
  const markW = 22;
  const nameX = pad + 8 + markW;
  const colW = pad + innerW - 8 - (nameX + nameW + 14);
  // Wide: judgments in one column and property questions aligned in a second column.
  // Narrow: each question follows its judgment name and wraps under it to save height.
  const columns = colW >= longestQ;
  for (let j = 0; j < JUDGMENTS.length; j++) {
    const isAnswer = committed && j === cap.judgment;
    const isWrongPick = committed && j === chosen && j !== cap.judgment;
    const isPending = !committed && j === chosen;
    const label = j < 4 ? (j + 1) + '. ' + JUDGMENTS[j].name : JUDGMENTS[j].name;
    textStyle(BOLD);
    const ownNameW = textWidth(label);
    textStyle(NORMAL);
    const qX = columns ? nameX + nameW + 14 : nameX;
    const qW = pad + innerW - 8 - qX;
    const qFirstX = columns ? qX : nameX + ownNameW + textWidth(' ');
    const qLines = columns
      ? wrapText(JUDGMENTS[j].check, qW)
      : wrapText(JUDGMENTS[j].check, qW, pad + innerW - 8 - qFirstX);
    const rowH = qLines.length * 20 + (narrow ? 6 : 8);
    let mark = '';
    if (isAnswer) { fill(COLOR_RIGHT_FILL); stroke(COLOR_RIGHT); strokeWeight(3); mark = '✓'; }
    else if (isWrongPick) { fill(COLOR_WRONG_FILL); stroke(COLOR_WRONG); strokeWeight(3); mark = '✗'; }
    else if (isPending) { fill('white'); stroke(COLOR_CHOICE); strokeWeight(3); mark = '▶'; }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(pad, y, innerW, rowH, 6);
    strokeWeight(1);
    noStroke();
    textStyle(BOLD);
    fill(isAnswer ? COLOR_RIGHT_TEXT : isWrongPick ? COLOR_WRONG_TEXT : isPending ? COLOR_CHOICE : 'black');
    textAlign(LEFT, TOP);
    if (mark) text(mark, pad + 8, y + 4);
    fill('black');
    text(label, nameX, y + 4);
    textStyle(NORMAL);
    for (let k = 0; k < qLines.length; k++) {
      text(qLines[k], k === 0 ? qFirstX : qX, y + 4 + k * 20);
    }
    y += rowH + (narrow ? 3 : 4);
  }
  y += 6;

  // feedback
  textSize(16);
  fill('black');
  if (!committed) {
    let msg;
    if (chosen < 0) {
      msg = 'Choose a judgment with the buttons below, then press Submit. ' +
        'Each caption gets one attempt.';
    } else {
      msg = 'Your choice: ' + JUDGMENTS[chosen].name + '. Press Submit to commit it, ' +
        'or choose a different judgment first.';
    }
    y = drawLines(wrapText(msg, innerW), pad, y, 20);
  } else {
    const correct = chosen === cap.judgment;
    const head = correct
      ? '✓ Correct: ' + JUDGMENTS[cap.judgment].name + '.'
      : '✗ The main issue is ' + JUDGMENTS[cap.judgment].name + '.';
    textSize(18);
    textStyle(BOLD);
    fill(correct ? COLOR_RIGHT_TEXT : COLOR_WRONG_TEXT);
    y = drawLines(wrapText(head, innerW), pad, y, 24);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    y = drawLines(wrapText(cap.why, innerW), pad, y, 20) + 6;

    // a suggested corrected caption where there is a defect
    if (cap.fix) {
      textStyle(BOLD);
      const headLines = wrapText('Suggested corrected caption (illustrative):', innerW - 20);
      textStyle(NORMAL);
      const fixLines = wrapText(cap.fix, innerW - 20);
      const boxH = 8 + headLines.length * 20 + fixLines.length * 20 + 8;
      fill('white');
      stroke(COLOR_CHOICE);
      strokeWeight(1);
      drawingContext.setLineDash([6, 4]);   // dashed border marks it as a suggestion
      rect(pad, y, innerW, boxH, 8);
      drawingContext.setLineDash([]);
      noStroke();
      textStyle(BOLD);
      fill(COLOR_CHOICE);
      const fy = drawLines(headLines, pad + 10, y + 8, 20);
      textStyle(NORMAL);
      fill('black');
      drawLines(fixLines, pad + 10, fy, 20);
      y += boxH;
    }
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(16);
  fill('black');
  y = drawLines(['All 6 captions judged'], pad, y, 20) + 4;

  // score and mastery
  textSize(24);
  textStyle(BOLD);
  y = drawLines([score + ' of 6 correct'], pad, y, 30);
  textSize(16);
  const mastered = score >= MASTERY;
  fill(mastered ? COLOR_RIGHT_TEXT : COLOR_WRONG_TEXT);
  const masteryStr = mastered
    ? '✓ Mastery threshold of ' + MASTERY + ' met.'
    : 'Mastery threshold of ' + MASTERY + ' not met.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20);
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
