// Paper Section Sorter MicroSim
// CANVAS_HEIGHT: 740
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner classifies ten illustrative sentences from one invented engineering paper into
// one of six sections: Abstract, Introduction, Related work, Method, Results, Discussion.
// Ten sentences in a fixed order, one attempt each. After each submit the sim shows whether
// the choice was correct and the "Why" sentence. After sentence 10 it shows "n of 10 correct",
// whether the mastery threshold of 8 was met, and the sentences grouped by section.
// The total canvas height is fixed; the control region grows by a row when the buttons wrap
// at narrow widths, and the drawing region takes the rest.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth;            // calculated from the container on init and on resize
let canvasWidth = 400;
let canvasHeight = 740;        // fixed total height (iframe height = canvasHeight + 2)
let containerHeight = canvasHeight;
let rowHeight = 36;            // height of one row of buttons in the control region
let controlHeight = rowHeight + 8;              // recomputed by layoutControls()
let drawHeight = canvasHeight - controlHeight;  // recomputed by layoutControls()

let margin = 25;
let sliderLeftMargin = 160;    // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;                  // inner padding of the drawing region

// Color-blind-safe palette (Okabe-Ito); meaning is also carried by symbols and words
const COLOR_CHOICE = '#0072B2';      // blue: the section currently chosen
const COLOR_RIGHT = '#009E73';       // bluish green: correct section (with a check mark)
const COLOR_RIGHT_TEXT = '#00694d';
const COLOR_RIGHT_FILL = '#e3f4ee';
const COLOR_WRONG = '#D55E00';       // vermillion: a wrong pick (with an X)
const COLOR_WRONG_TEXT = '#a34200';
const COLOR_WRONG_FILL = '#fbe6d8';

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const SECTIONS = [
  { name: 'Abstract', question: 'Should I read this?' },
  { name: 'Introduction', question: 'Why does this matter?' },
  { name: 'Related work', question: 'What is already known?' },
  { name: 'Method', question: 'What exactly was done?' },
  { name: 'Results', question: 'What was found?' },
  { name: 'Discussion', question: 'What does it mean, and what are the limits?' }
];

// section is the index into SECTIONS
const SENTENCES = [
  { text: 'Successive-approximation converters dominate low-power sensor interfaces, yet their accuracy is limited by capacitor mismatch.',
    section: 1, why: 'It states the problem and why it matters.' },
  { text: 'Prior calibration schemes either require a dedicated reference or converge slowly [3], [7].',
    section: 2, why: 'It positions earlier work and points to the gap.' },
  { text: 'The comparator offset is measured by shorting its inputs and averaging 256 decisions.',
    section: 3, why: 'It states what was done, in enough detail to reproduce.' },
  { text: 'The calibrated converter reaches an ENOB of 9.4 bits at 1 MS/s.',
    section: 4, why: 'It reports a measured finding.' },
  { text: 'The residual error is consistent with the thermal noise of the comparator, which suggests that a larger input pair would give a further gain.',
    section: 5, why: 'It interprets a result and points to a consequence.' },
  { text: 'Measurements were taken on 12 devices from one wafer at 25 °C with a 4,096-sample record.',
    section: 3, why: 'It describes the experimental setup.' },
  { text: 'We present a foreground offset calibration for SAR ADCs that raises measured ENOB from 8.6 to 9.4 bits at 1 MS/s in 65 nm CMOS using 45 µW.',
    section: 0, why: 'It compresses context, contribution, and key result with numbers into one sentence.' },
  { text: 'Table II lists the ENOB of the 12 devices before and after calibration.',
    section: 4, why: 'It presents the data.' },
  { text: 'The gain is limited to chips with an offset below 15 mV, since larger offsets saturate the correction range.',
    section: 5, why: 'It states a limitation.' },
  { text: 'Section III describes the calibration algorithm and Section IV the measurement setup.',
    section: 1, why: 'It is the roadmap paragraph that ends an introduction.' }
];

const QUESTION = 'Which reader question does this sentence answer?';
const MASTERY = 8;   // mastery requires at least 8 of 10 correct on the first attempt

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let pos = 0;             // index of the current sentence (fixed order 0..9)
let chosen = -1;         // section chosen for the current sentence (-1 = none chosen)
let committed = false;   // has the current choice been submitted?
let answers = [];        // submitted section index for each sentence
let score = 0;           // correct submissions so far
let finished = false;    // summary screen showing
let summaryPage = 0;
let summaryPageCount = 1;
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let sectionButtons = [];
let submitButton;
let nextButton;
let moreButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let s = 0; s < SECTIONS.length; s++) {
    const b = createButton(SECTIONS[s].name);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.attribute('aria-pressed', 'false');
    onActivate(b, () => chooseSection(s));
    sectionButtons.push(b);
  }
  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  onActivate(submitButton, submitChoice);

  nextButton = createButton('Next');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  onActivate(nextButton, nextPressed);

  moreButton = createButton('More Sections');
  moreButton.parent(document.querySelector('main'));
  styleButton(moreButton);
  onActivate(moreButton, nextSummaryPage);

  updateControls();

  describe('Paper Section Sorter. One illustrative sentence from an invented engineering paper ' +
    'is shown at a time with the six sections Abstract, Introduction, Related work, Method, ' +
    'Results, and Discussion and the reader question each answers. Choose a section with the ' +
    'buttons and press Submit. The sim says whether the choice was correct, names the correct ' +
    'section, and gives the reason. After ten sentences it shows the number correct out of 10, ' +
    'whether the mastery threshold of 8 was met, and the sentences grouped by section.');

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
}

// ---------------------------------------------------------------
// Activity logic
// ---------------------------------------------------------------
function chooseSection(s) {
  if (finished || committed) return;
  chosen = s;
  updateControls();
  redraw();
}

// One attempt per sentence: the submitted choice cannot be changed
function submitChoice() {
  if (finished || committed || chosen < 0) return;
  committed = true;
  answers[pos] = chosen;
  if (chosen === SENTENCES[pos].section) score++;
  updateControls();
  redraw();
  // the pressed button is now disabled, so move keyboard focus to the next step
  nextButton.elt.focus({ preventScroll: true });
}

function nextPressed() {
  if (finished || !committed) return;
  if (pos < SENTENCES.length - 1) {
    pos++;
    chosen = -1;
    committed = false;
  } else {
    finished = true;
    summaryPage = 0;
  }
  updateControls();
  redraw();
  // keep keyboard focus on a usable control after the pressed one is disabled or hidden
  if (!finished) sectionButtons[0].elt.focus({ preventScroll: true });
  else if (summaryPageCount > 1) moreButton.elt.focus({ preventScroll: true });
}

function nextSummaryPage() {
  summaryPage = (summaryPage + 1) % summaryPageCount;
  redraw();
}

// Enable, disable, show, hide, and mark the controls to match the state
function updateControls() {
  for (let s = 0; s < sectionButtons.length; s++) {
    const b = sectionButtons[s];
    if (finished) { b.hide(); continue; }
    b.show();
    setEnabled(b, !committed);
    const isChosen = s === chosen;
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
    nextButton.html(pos === SENTENCES.length - 1 ? 'See Score' : 'Next');
  }
  for (const b of [submitButton, nextButton, moreButton]) {
    b.style('background', '#f4f4f4');
    b.style('color', 'black');
    b.style('border', '2px solid #767676');
  }
  if (finished && summaryPageCount > 1) moreButton.show();
  else moreButton.hide();
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
    for (const b of sectionButtons) visible.push(b);
    visible.push(submitButton);
    visible.push(nextButton);
  } else if (summaryPageCount > 1) {
    visible.push(moreButton);
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
  text('Paper Section Sorter', canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (finished) drawSummary(44);
  else drawPlay(44);
}

// Word-wrap a string to a maximum width using the current text settings
function wrapText(str, maxW, firstW) {
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    // the first line may be shorter (firstW) when it follows a bold label
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
  const sent = SENTENCES[pos];

  // status line
  textSize(16);
  fill('black');
  const status = 'Sentence ' + (pos + 1) + ' of 10  |  Correct so far: ' + score;
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 2;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 8;
  textStyle(NORMAL);

  // sentence card
  const narrow = canvasWidth < 480;
  const sentSize = narrow ? 16 : 18;
  const sentLineH = narrow ? 21 : 23;
  textSize(sentSize);
  textStyle(BOLD);
  const sentLines = wrapText(sent.text, innerW - 24);
  const cardH = 20 + sentLines.length * sentLineH + 16;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  textStyle(NORMAL);
  textSize(16);
  fill('dimgray');
  drawLines(['Sentence ' + (pos + 1) + ' (illustrative)'], pad + 12, y + 8, 20);
  textSize(sentSize);
  textStyle(BOLD);
  fill('black');
  drawLines(sentLines, pad + 12, y + 30, sentLineH);
  textStyle(NORMAL);
  y += cardH + 10;

  // the six sections and the reader question each answers
  textSize(16);
  textStyle(BOLD);
  fill('black');
  y = drawLines(wrapText('The six sections and the reader question each answers:', innerW), pad, y, 20) + 4;
  let nameW = 0;
  for (const s of SECTIONS) nameW = max(nameW, textWidth(s.name));
  textStyle(NORMAL);
  let longestQ = 0;
  for (const s of SECTIONS) longestQ = max(longestQ, textWidth(s.question));
  const markW = 22;
  const nameX = pad + 8 + markW;
  const colW = pad + innerW - 8 - (nameX + nameW + 14);
  // Wide: names in one column and questions aligned in a second column.
  // Narrow: each question follows its section name and wraps under it to save height.
  const columns = colW >= longestQ;
  for (let s = 0; s < SECTIONS.length; s++) {
    const isAnswer = committed && s === sent.section;
    const isWrongPick = committed && s === chosen && s !== sent.section;
    const isPending = !committed && s === chosen;
    textStyle(BOLD);
    const ownNameW = textWidth(SECTIONS[s].name);
    textStyle(NORMAL);
    const qX = columns ? nameX + nameW + 14 : nameX;
    const qW = pad + innerW - 8 - qX;
    const qFirstX = columns ? qX : nameX + ownNameW + textWidth(' ');
    const qLines = columns
      ? wrapText(SECTIONS[s].question, qW)
      : wrapText(SECTIONS[s].question, qW, pad + innerW - 8 - qFirstX);
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
    text(SECTIONS[s].name, nameX, y + 4);
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
      msg = 'Choose a section with the buttons below, then press Submit. ' +
        'Each sentence gets one attempt.';
    } else {
      msg = 'Your choice: ' + SECTIONS[chosen].name + '. Press Submit to commit it, ' +
        'or choose a different section first.';
    }
    y = drawLines(wrapText(msg, innerW), pad, y, 20);
  } else {
    const correct = chosen === sent.section;
    const head = correct
      ? '✓ Correct: ' + SECTIONS[sent.section].name + '.'
      : '✗ This belongs in ' + SECTIONS[sent.section].name + '.';
    textSize(18);
    textStyle(BOLD);
    fill(correct ? COLOR_RIGHT_TEXT : COLOR_WRONG_TEXT);
    y = drawLines(wrapText(head, innerW), pad, y, 24);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    y = drawLines(wrapText(sent.why, innerW), pad, y, 20);
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(16);
  fill('black');
  y = drawLines(['All 10 sentences classified'], pad, y, 20) + 2;

  // score and mastery
  textSize(24);
  textStyle(BOLD);
  y = drawLines([score + ' of 10 correct'], pad, y, 30);
  textSize(16);
  const mastered = score >= MASTERY;
  fill(mastered ? COLOR_RIGHT_TEXT : COLOR_WRONG_TEXT);
  const masteryStr = mastered
    ? '✓ Mastery threshold of ' + MASTERY + ' met.'
    : 'Mastery threshold of ' + MASTERY + ' not met.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 8;

  fill('black');
  y = drawLines(wrapText('The sentences grouped by section (✓ = you classified it correctly, ✗ = you did not):',
    innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  // measure each section block at the current width, then split into pages
  const blocks = [];
  for (let s = 0; s < SECTIONS.length; s++) {
    const items = [];
    for (let i = 0; i < SENTENCES.length; i++) {
      if (SENTENCES[i].section !== s) continue;
      const ok = answers[i] === s;
      let str = (ok ? '✓ ' : '✗ ') + (i + 1) + '. ' + SENTENCES[i].text;
      if (!ok) str += ' (You chose ' + SECTIONS[answers[i]].name + '.)';
      textStyle(NORMAL);
      items.push({ ok, lines: wrapText(str, innerW - 20) });
    }
    textStyle(BOLD);
    const headLines = wrapText(SECTIONS[s].name + ': ' + SECTIONS[s].question, innerW - 20);
    textStyle(NORMAL);
    let h = 6 + headLines.length * 20 + 4 + 6;
    for (const it of items) h += it.lines.length * 20 + 4;
    blocks.push({ s, headLines, items, h });
  }
  const footerH = 26;
  const avail = drawHeight - y - footerH - 6; // keep a gap above the page footer
  const pages = [];
  let cur = [];
  let used = 0;
  for (const bl of blocks) {
    if (cur.length > 0 && used + bl.h > avail) {
      pages.push(cur);
      cur = [];
      used = 0;
    }
    cur.push(bl);
    used += bl.h + 6;
  }
  if (cur.length > 0) pages.push(cur);
  summaryPageCount = pages.length;
  if (summaryPage >= summaryPageCount) summaryPage = 0;

  for (const bl of pages[summaryPage]) {
    fill('white');
    stroke('silver');
    strokeWeight(1);
    rect(pad, y, innerW, bl.h, 8);
    noStroke();
    fill('navy');
    textStyle(BOLD);
    let yy = drawLines(bl.headLines, pad + 10, y + 6, 20) + 4;
    textStyle(NORMAL);
    for (const it of bl.items) {
      fill(it.ok ? 'black' : COLOR_WRONG_TEXT);
      yy = drawLines(it.lines, pad + 10, yy, 20) + 4;
    }
    y += bl.h + 6;
  }
  layoutBottom = y;

  if (summaryPageCount > 1) {
    fill('dimgray');
    textSize(16);
    noStroke();
    textAlign(LEFT, TOP);
    text('Sections: page ' + (summaryPage + 1) + ' of ' + summaryPageCount, pad, drawHeight - footerH + 2);
  }
  syncMoreButton();
}

// The page count is known only after measuring text, so show or hide the More button here
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
