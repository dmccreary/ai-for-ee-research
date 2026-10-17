// Prompt Component Sorter MicroSim
// CANVAS_HEIGHT: 765
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The assembled prompt is shown with one sentence highlighted at a time. For each
// of ten sentences the learner chooses which component it carries: Clear instruction,
// Constraint, Output format, Role, or Few-shot example. One attempt each, fixed order.
// The end screen shows "n of 10 correct", whether the mastery threshold of 8 was met,
// and a tally of how many sentences carry each component.
// The design is width responsive; on narrow screens the prompt shows a window of
// sentences around the highlighted one.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 680;
// Control region: up to two rows of controls = (2 x 35) + 10 = 80
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let lineH = 20;             // line height for 16 px text

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
// Component labels, in the order given in the specification
const LABELS = ['Clear instruction', 'Constraint', 'Output format', 'Role', 'Few-shot example'];

// label is an index into LABELS
const SENTENCES = [
  { text: 'You are reviewing a paper for a graduate reading group in analog circuit design.',
    label: 3, why: 'It sets a viewpoint and audience and gives the model no new knowledge.' },
  { text: 'Summarize the attached paper\'s contribution.',
    label: 0, why: 'It names one task with a verb that describes an observable action.' },
  { text: 'Use at most 120 words.',
    label: 1, why: 'It limits the length of the answer and does not describe its shape.' },
  { text: 'Use only information that appears in the attached text.',
    label: 1, why: 'It limits the sources the model may use.' },
  { text: 'If a value is not stated, write "not stated" instead of estimating it.',
    label: 1, why: 'It gives a sanctioned way out, so that the model need not invent a value.' },
  { text: 'After the summary, output a table with these columns: Architecture, Process node, Supply voltage, Sampling rate, ENOB, Power.',
    label: 2, why: 'It names the structure and the fields of the result.' },
  { text: 'Give one row for the paper\'s main design.',
    label: 2, why: 'It states how many rows the structure has.' },
  { text: 'Example row: SAR, 65 nm, 1.0 V, 1 MS/s, 9.2, 45 µW.',
    label: 4, why: 'It shows a worked instance of the format with illustrative values.' },
  { text: 'Consider only successive-approximation converters.',
    label: 1, why: 'It limits the scope of the territory the model should consider.' },
  { text: 'Classify the paper as "analog-dominant" or "digital-assisted".',
    label: 0, why: 'It names a second task with an observable result in a fixed set. The chapter advises one task per prompt where possible, so in practice this sentence belongs in a separate prompt.' }
];

const QUESTION = 'Which component of the prompt does this sentence carry?';
const MASTERY = 8;   // mastery requires a score >= 8 of 10
const NONE = 'none'; // value of the placeholder option in the select

// Tally of the answer key: how many sentences carry each component
function answerTally() {
  const t = LABELS.map(() => 0);
  for (const s of SENTENCES) t[s.label]++;
  return t;
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let pos = 0;             // highlighted sentence (0..9), fixed order
let committed = false;
let chosen = [];         // learner's label for each answered sentence
let score = 0;
let finished = false;
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let labelSelect;
let submitButton;
let nextButton;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const LABEL_CONCEPT = [53, 59, 58, 54, 55];   // Clear Instructions, Constraints, Output Format, Role Prompting, Few-Shot Examples
let lrs = null, sentenceStart = 0;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  labelSelect = createSelect();
  labelSelect.parent(document.querySelector('main'));
  labelSelect.option('Choose a component', NONE);
  for (let i = 0; i < LABELS.length; i++) labelSelect.option(LABELS[i], String(i));
  styleControl(labelSelect);
  labelSelect.attribute('aria-label', 'Prompt component');
  labelSelect.changed(selectionChanged);

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleControl(submitButton);
  submitButton.mousePressed(submitAnswer);

  nextButton = createButton('Next Sentence');
  nextButton.parent(document.querySelector('main'));
  styleControl(nextButton);
  nextButton.mousePressed(nextPressed);

  labelSelect.selected(NONE);
  updateControls();

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Prompt Component Sorter', concept: LRS.conceptId(51), mount: '#xapi-slot',
                          source: 'the Prompt Component Sorter MicroSim', pageDwell: true });
    sentenceStart = Date.now();
  }

  describe('Prompt Component Sorter. An assembled ten-sentence prompt for summarizing an analog circuit ' +
    'paper is shown with one sentence highlighted and marked with an arrow. Choose the component the ' +
    'highlighted sentence carries from the drop-down list below the drawing: Clear instruction, ' +
    'Constraint, Output format, Role, or Few-shot example, and press Submit. The sim says Correct or ' +
    'names the right component, and gives the reason. Each sentence gets one attempt. After ten ' +
    'sentences it shows the score out of 10, whether mastery (8 of 10) was met, and how many ' +
    'sentences carry each component.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleControl(c) {
  c.style('font-size', '16px');
  c.style('padding', '4px 8px');
  c.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Logic
// ---------------------------------------------------------------
function selectionChanged() {
  updateControls();
  redraw();
}

// One attempt per sentence
function submitAnswer() {
  if (finished || committed || labelSelect.value() === NONE) return;
  const pick = parseInt(labelSelect.value());
  if (lrs) lrs.question('q' + (pos + 1), { name: 'Sentence ' + (pos + 1) + ': ' + SENTENCES[pos].text,
                                           concept: LRS.conceptId(LABEL_CONCEPT[SENTENCES[pos].label]) })
    .answer({ success: pick === SENTENCES[pos].label, response: LRS.slug(LABELS[pick]),
              durationMs: sentenceStart ? Date.now() - sentenceStart : undefined });
  chosen[pos] = pick;
  committed = true;
  if (pick === SENTENCES[pos].label) score++;
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished || !committed) return;
  if (pos < SENTENCES.length - 1) {
    pos++;
    committed = false;
    labelSelect.selected(NONE);
    sentenceStart = Date.now();
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

function updateControls() {
  if (finished) {
    labelSelect.hide();
    submitButton.hide();
    nextButton.hide();
    return;
  }
  labelSelect.show();
  submitButton.show();
  nextButton.show();
  setEnabled(labelSelect, !committed);
  setEnabled(submitButton, !committed && labelSelect.value() !== NONE);
  nextButton.html(pos === SENTENCES.length - 1 ? 'See Score' : 'Next Sentence');
  setEnabled(nextButton, committed);
  layoutControls();
}

function setEnabled(c, on) {
  if (on) c.removeAttribute('disabled');
  else c.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a new row when needed
function layoutControls() {
  if (finished) return;
  const visible = [labelSelect, submitButton, nextButton];
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

  // drawing region background and border
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  // control region background
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);

  // title, shrunk if needed to fit narrow widths
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  fitTextSize('Prompt Component Sorter', canvasWidth - 2 * pad, 24, 18);
  text('Prompt Component Sorter', canvasWidth / 2, 10);
  textStyle(NORMAL);

  drawMain(44);

  if (finished) {
    fill('black');
    noStroke();
    textSize(16);
    drawLines(wrapText('All ten sentences answered. Each answered sentence in the prompt is tagged ' +
      'with its component.', canvasWidth - 20), 10, drawHeight + 10, 20);
  }
}

function fitTextSize(str, maxW, big, small) {
  let s = big;
  textSize(s);
  while (s > small && textWidth(str) > maxW) {
    s--;
    textSize(s);
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
function drawLines(lines, x, y, lh) {
  textAlign(LEFT, TOP);
  for (const ln of lines) {
    noStroke();
    text(ln, x, y);
    y += lh;
  }
  return y;
}

// The tag shown after an answered sentence: the correct label, with a check
// if the learner chose it and an X if not.
function tagFor(i) {
  if (chosen[i] === undefined || (i === pos && !committed && !finished)) return '';
  const ok = chosen[i] === SENTENCES[i].label;
  return '[' + LABELS[SENTENCES[i].label] + (ok ? ' ✓' : ' ✗') + ']';
}

// Measure one sentence block: wrapped lines, tag placement and height
function measureSentence(i, textW) {
  textSize(16);
  textStyle(i === pos && !finished ? BOLD : NORMAL);
  const lines = wrapText(SENTENCES[i].text, textW);
  textStyle(BOLD);
  const tag = tagFor(i);
  let tagOnNewLine = false;
  if (tag) {
    const last = lines[lines.length - 1];
    textStyle(i === pos && !finished ? BOLD : NORMAL);
    const lastW = textWidth(last + ' ');
    textStyle(BOLD);
    if (lastW + textWidth(tag) > textW) tagOnNewLine = true;
  }
  textStyle(NORMAL);
  const n = lines.length + (tagOnNewLine ? 1 : 0);
  return { lines, tag, tagOnNewLine, h: n * lineH + 6 };
}

function drawMain(y) {
  const innerW = canvasWidth - 2 * pad;
  textSize(16);

  // status and labels
  fill('black');
  textStyle(BOLD);
  const status = finished ? 'All 10 sentences answered'
                          : 'Sentence ' + (pos + 1) + ' of 10  |  Correct so far: ' + score;
  y = drawLines(wrapText(status, innerW), pad, y, lineH) + 2;
  textStyle(NORMAL);
  fill('dimgray');
  y = drawLines(wrapText('Prompt adapted from the chapter\'s worked prompt; example values are illustrative.',
    innerW), pad, y, lineH) + 2;

  if (!finished) {
    fill('navy');
    textStyle(ITALIC);
    y = drawLines(wrapText(QUESTION, innerW), pad, y, lineH) + 6;
    textStyle(NORMAL);
  }

  // reserve room at the bottom for feedback (or the end-of-run tally)
  const reserve = finished ? summaryHeight(innerW) : worstFeedbackHeight(innerW);
  const boxTop = y;
  const boxMaxH = drawHeight - pad - reserve - 10 - boxTop;
  y = drawPrompt(boxTop, innerW, boxMaxH) + 10;

  if (finished) y = drawSummary(y, innerW);
  else y = drawFeedback(y, innerW);
  layoutBottom = y;
}

// Draw the assembled prompt. If every sentence fits it is drawn whole; otherwise a
// window of sentences around the highlighted one is drawn with "more" notes.
function drawPrompt(top, innerW, maxH) {
  const gutter = 42;
  const textW = innerW - gutter - 12;
  const blocks = SENTENCES.map((s, i) => measureSentence(i, textW));
  const headerH = 26;
  const total = headerH + blocks.reduce((a, b) => a + b.h, 0) + 8;

  let first = 0, last = SENTENCES.length - 1;
  if (total > maxH) {
    // grow a window from the highlighted sentence (or the top when finished)
    const avail = maxH - headerH - 8 - 2 * lineH;   // room for two "more" lines
    const anchor = finished ? 0 : Math.max(0, pos - 1);
    first = anchor;
    last = anchor;
    let used = blocks[anchor].h;
    let grew = true;
    while (grew) {
      grew = false;
      if (last + 1 < SENTENCES.length && used + blocks[last + 1].h <= avail) {
        last++; used += blocks[last].h; grew = true;
      } else if (first - 1 >= 0 && used + blocks[first - 1].h <= avail) {
        first--; used += blocks[first].h; grew = true;
      }
    }
  }

  // box height
  let h = headerH + 8;
  if (first > 0) h += lineH;
  for (let i = first; i <= last; i++) h += blocks[i].h;
  if (last < SENTENCES.length - 1) h += lineH;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(pad, top, innerW, h, 10);

  noStroke();
  fill('black');
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Assembled prompt', pad + 10, top + 6);
  textStyle(NORMAL);

  let y = top + headerH;
  fill('dimgray');
  if (first > 0) {
    y = drawLines(['… sentence' + (first > 1 ? 's 1–' + first : ' 1') + ' above'], pad + gutter, y, lineH);
  }
  for (let i = first; i <= last; i++) {
    const b = blocks[i];
    const current = i === pos && !finished;
    if (current) {
      fill('lemonchiffon');
      stroke('darkgoldenrod');
      strokeWeight(2);
      rect(pad + 4, y - 2, innerW - 8, b.h, 6);
      strokeWeight(1);
    }
    noStroke();
    // gutter: sentence number, with an arrow on the highlighted sentence
    fill(current ? 'black' : 'dimgray');
    textStyle(current ? BOLD : NORMAL);
    textAlign(LEFT, TOP);
    text((current ? '▶' : '') + (i + 1), pad + 6, y + 1);
    // sentence text
    fill('black');
    textStyle(current ? BOLD : NORMAL);
    const yEnd = drawLines(b.lines, pad + gutter, y + 1, lineH);
    // tag
    if (b.tag) {
      const ok = chosen[i] === SENTENCES[i].label;
      let tx, ty;
      if (b.tagOnNewLine) {
        tx = pad + gutter;
        ty = yEnd;
      } else {
        tx = pad + gutter + textWidth(b.lines[b.lines.length - 1] + ' ');
        ty = yEnd - lineH;
      }
      textStyle(BOLD);
      fill(ok ? 'navy' : 'saddlebrown');
      noStroke();
      text(b.tag, tx, ty);
    }
    textStyle(NORMAL);
    y += b.h;
  }
  fill('dimgray');
  if (last < SENTENCES.length - 1) {
    const a = last + 2;
    y = drawLines(['… sentence' + (a < 10 ? 's ' + a + '–10' : ' 10') + ' below'], pad + gutter, y, lineH);
  }
  return top + h;
}

function worstFeedbackHeight(w) {
  textSize(16);
  let worst = 0;
  for (const s of SENTENCES) {
    const h = wrapText('✗ This sentence is a Few-shot example.', w).length * 24 +
              wrapText(s.why, w).length * lineH;
    worst = Math.max(worst, h);
  }
  // the pre-commit instruction must also fit
  const pre = wrapText('Choose a component from the list below and press Submit. Each sentence ' +
    'gets one attempt.', w).length * lineH;
  return Math.max(worst, pre);
}

function drawFeedback(y, w) {
  textSize(16);
  if (!committed) {
    fill('black');
    return drawLines(wrapText('Choose a component from the list below and press Submit. Each sentence ' +
      'gets one attempt.', w), pad, y, lineH);
  }
  const s = SENTENCES[pos];
  const ok = chosen[pos] === s.label;
  textSize(18);
  textStyle(BOLD);
  fill(ok ? 'navy' : 'saddlebrown');
  const article = /^[AEIOU]/.test(LABELS[s.label]) ? 'an ' : 'a ';
  const verdict = ok ? '✓ Correct: ' + LABELS[s.label] + '.'
                     : '✗ This sentence is ' + article + LABELS[s.label] + '.';
  y = drawLines(wrapText(verdict, w), pad, y, 24);
  textStyle(NORMAL);
  textSize(16);
  fill('black');
  return drawLines(wrapText(s.why, w), pad, y, lineH);
}

function summaryHeight(w) {
  textSize(16);
  return 30 + 2 * lineH + 4 + 24 + LABELS.length * 26 + 4;
}

function drawSummary(y, w) {
  // score
  textSize(24);
  textStyle(BOLD);
  fill('black');
  y = drawLines([score + ' of 10 correct'], pad, y, 30);
  textSize(16);
  const mastered = score >= MASTERY;
  fill(mastered ? 'navy' : 'saddlebrown');
  const m = mastered
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 10 labels match.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of 10 correct labels are needed.';
  y = drawLines(wrapText(m, w).slice(0, 2), pad, y, lineH) + 4;

  // tally of the answer key
  fill('black');
  y = drawLines(['How many sentences carry each component:'], pad, y, 24);
  textStyle(NORMAL);
  const tally = answerTally();
  const maxT = Math.max(...tally);
  textSize(16);
  let labelW = 0;
  for (const l of LABELS) labelW = Math.max(labelW, textWidth(l));
  const barX = pad + labelW + 12;
  const barMax = Math.max(40, w - labelW - 12 - 40);
  for (let i = 0; i < LABELS.length; i++) {
    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    textStyle(tally[i] === maxT ? BOLD : NORMAL);
    text(LABELS[i], pad, y + 11);
    const bw = barMax * tally[i] / maxT;
    fill('steelblue');
    rect(barX, y + 2, bw, 18);
    fill('black');
    text(String(tally[i]), barX + bw + 6, y + 11);
    textStyle(NORMAL);
    y += 26;
  }
  return y;
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
