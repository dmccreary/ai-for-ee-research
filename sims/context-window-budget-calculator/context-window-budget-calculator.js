// Context Window Budget Calculator MicroSim
// CANVAS_HEIGHT: 760
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner calculates the tokens left for a completion from a window size and the sizes of
// the prompt components, and decides whether a requested completion fits.
// Three challenges in a fixed order, two attempts each, then an exploration mode with four
// sliders and a stacked bar of the window. All numbers are illustrative.
// The design is width responsive; controls reflow onto extra rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 620;
// Control region: four slider rows in exploration mode = 4 x 32 + 12 = 140
let controlHeight = 140;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 210;  // room for the slider label and value at the left
let defaultTextSize = 16;
let pad = 12;                // inner padding of the drawing region

// Okabe-Ito color-blind-safe palette; each segment also carries a letter (S, H, A, M)
const SEG = [
  { key: 'S', name: 'System prompt',  color: '#0072B2', ink: 'white' },
  { key: 'H', name: 'History',        color: '#E69F00', ink: 'black' },
  { key: 'A', name: 'Attachment',     color: '#009E73', ink: 'white' },
  { key: 'M', name: 'Latest message', color: '#CC79A7', ink: 'black' }
];

// ---------------------------------------------------------------
// Content (from the chapter specification; all numbers illustrative)
// ---------------------------------------------------------------
const ILLUSTRATIVE_NOTE = 'Illustrative: the window sizes used here are not the limits of any specific model.';
const QUESTION = 'How many tokens are left for the answer?';

// attachmentWords is the word count when the attachment is given in words
const CHALLENGES = [
  { window: 32000, system: 600, history: 4000,
    attachmentText: '8,250 words', attachmentWords: 8250,
    message: 400, requested: 6000,
    why: '8,250 words / 0.75 = 11,000 tokens. 600 + 4,000 + 11,000 + 400 = 16,000 used. ' +
         '32,000 - 16,000 = 16,000 remain, which is at least 6,000.' },
  { window: 32000, system: 600, history: 4000,
    attachmentText: 'two papers of 8,250 words each', attachmentWords: 16500,
    message: 400, requested: 6000,
    why: 'Two papers are 22,000 tokens. 600 + 4,000 + 22,000 + 400 = 27,000 used. ' +
         '32,000 - 27,000 = 5,000 remain, which is less than 6,000.' },
  { window: 8000, system: 500, history: 1500,
    attachmentText: '8,250 words', attachmentWords: 8250,
    message: 300, requested: 1000,
    why: '11,000 + 500 + 1,500 + 300 = 13,300 used, which exceeds 8,000 by 5,300. ' +
         'The prompt alone does not fit: at least 5,300 tokens must be dropped before the prompt ' +
         'fits, and 6,300 before a 1,000-token completion also fits.' }
];

const HINT_FIRST = 'Check that the completion shares the window with the prompt. ' +
  'Add all four components, then subtract from the window.';

// Exploration mode: the latest message and the requested completion are held fixed
const EXPLORE_MESSAGE = 400;
const EXPLORE_REQUESTED = 6000;

// ---------------------------------------------------------------
// Pure logic (exact integer arithmetic)
// ---------------------------------------------------------------
// Attachment tokens = words / 0.75, computed as words * 4 / 3 to stay exact
function wordsToTokens(words) {
  return Math.round(words * 4 / 3);
}

function attachmentTokens(ch) {
  return wordsToTokens(ch.attachmentWords);
}

// Remaining = window - (system + history + attachment + latest message)
function remainingTokens(window, system, history, attachment, message) {
  return window - (system + history + attachment + message);
}

// A request fits when remaining >= requested; a negative remaining never fits
function fits(remaining, requested) {
  return remaining >= 0 && remaining >= requested;
}

function challengeAnswer(ch) {
  const att = attachmentTokens(ch);
  const rem = remainingTokens(ch.window, ch.system, ch.history, att, ch.message);
  return { attachment: att, remaining: rem, fits: fits(rem, ch.requested) };
}

// Accepts "16000", "16,000", "-5,300", " 5 000 " and a typographic minus sign
function parseTokenAnswer(str) {
  const s = String(str).replace(/[\s,]/g, '').replace(/−/g, '-');
  if (!/^-?\d+$/.test(s)) return null;
  return parseInt(s, 10);
}

function fmt(n) {
  return n.toLocaleString('en-US');
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let mode = 'challenge';   // 'challenge' or 'explore'
let chIndex = 0;          // 0..2
let attempt = 1;          // 1 or 2
let resolved = false;     // challenge answered correctly or missed
let lastResult = '';      // '', 'invalid', 'wrong1', 'correct', 'missed'
let correctCount = 0;
let layoutBottom = 0;     // lowest y used by drawn content (used for layout testing)

// controls
// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(23);   // Context Window
let lrs = null, challengeStart = 0;

let answerInput, fitSelect, submitButton, nextButton;
let windowSlider, systemSlider, historySlider, attachSlider;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  answerInput = createInput('', 'text');
  answerInput.parent(document.querySelector('main'));
  answerInput.attribute('placeholder', 'tokens remaining');
  answerInput.attribute('aria-label', 'Tokens remaining for the completion');
  answerInput.style('font-size', '16px');
  answerInput.style('width', '150px');
  answerInput.elt.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitAnswer(); });

  fitSelect = createSelect();
  fitSelect.parent(document.querySelector('main'));
  fitSelect.option('Choose: fits?', '');
  fitSelect.option('fits', 'fits');
  fitSelect.option('does not fit', 'does not fit');
  fitSelect.selected('');
  fitSelect.attribute('aria-label', 'Does the requested completion fit?');
  fitSelect.style('font-size', '16px');

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  submitButton.mousePressed(submitAnswer);

  nextButton = createButton('Next Challenge');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mousePressed(nextPressed);

  windowSlider = makeSlider(8000, 128000, 32000, 8000, 'Window size in tokens');
  systemSlider = makeSlider(0, 2000, 600, 100, 'System prompt in tokens');
  historySlider = makeSlider(0, 20000, 4000, 500, 'History in tokens');
  attachSlider = makeSlider(0, 40000, 11000, 500, 'Attachment in tokens');

  updateControls();

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Context Window Budget Calculator', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Context Window Budget Calculator MicroSim', pageDwell: true });
    challengeStart = Date.now();
    // Attachment has no matching learning-graph concept, so that slider is left unmapped.
    const hook = (sl, key, name, mn, mx, init, step, concept) => {
      const ev = lrs.slider(key, { name: name, concept: concept, min: mn, max: mx, initial: init, deadband: step });
      sl.input(() => { redraw(); ev.input(sl.value()); });   // keep the sim's own redraw
      sl.changed(() => ev.settle(sl.value()));
    };
    hook(windowSlider, 'window-size-slider', 'Window Size Slider', 8000, 128000, 32000, 8000, LRS.conceptId(23));
    hook(systemSlider, 'system-prompt-slider', 'System Prompt Slider', 0, 2000, 600, 100, LRS.conceptId(27));
    hook(historySlider, 'history-slider', 'History Slider', 0, 20000, 4000, 500, LRS.conceptId(68));
    hook(attachSlider, 'attachment-slider', 'Attachment Slider', 0, 40000, 11000, 500, undefined);
  }

  describe('Context Window Budget Calculator. Three challenges in a fixed order each list a window ' +
    'size, a system prompt, a history, an attachment, a latest message and a requested completion. ' +
    'Type the tokens remaining, choose fits or does not fit, and press Submit. Each challenge allows ' +
    'two attempts and then shows the worked subtraction and a stacked bar of the window. After the ' +
    'three challenges, exploration mode offers four sliders and a stacked bar that shows the remaining ' +
    'space and whether a 6,000-token completion fits.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

function makeSlider(mn, mx, val, step, label) {
  const s = createSlider(mn, mx, val, step);
  s.parent(document.querySelector('main'));
  s.attribute('aria-label', label);
  s.input(() => redraw());
  return s;
}

// ---------------------------------------------------------------
// Challenge logic
// ---------------------------------------------------------------
function submitAnswer() {
  if (mode !== 'challenge' || resolved) return;
  const typed = parseTokenAnswer(answerInput.value());
  const choice = fitSelect.value();
  if (typed === null || choice === '') {
    lastResult = 'invalid';   // does not use up an attempt
    redraw();
    return;
  }
  const ans = challengeAnswer(CHALLENGES[chIndex]);
  const choiceFits = choice === 'fits';
  const correct = typed === ans.remaining && choiceFits === ans.fits;
  if (lrs) lrs.question('q' + (chIndex + 1), { name: 'Challenge ' + (chIndex + 1) + ': tokens remaining and whether the completion fits', concept: PAGE_CONCEPT() })
    .answer({ success: correct, response: typed + ' ' + LRS.slug(choice),
              durationMs: challengeStart ? Date.now() - challengeStart : undefined,
              extensions: { 'attempt-number': attempt } });
  if (correct) {
    correctCount++;
    resolved = true;
    lastResult = 'correct';
  } else if (attempt === 1) {
    attempt = 2;
    lastResult = 'wrong1';
  } else {
    resolved = true;
    lastResult = 'missed';
  }
  updateControls();
  redraw();
}

function nextPressed() {
  if (mode !== 'challenge' || !resolved) return;
  if (chIndex < CHALLENGES.length - 1) {
    chIndex++;
    attempt = 1;
    resolved = false;
    lastResult = '';
    challengeStart = Date.now();
    answerInput.value('');
    fitSelect.selected('');
  } else {
    mode = 'explore';
  }
  updateControls();
  redraw();
}

function setEnabled(el, on) {
  if (on) el.removeAttribute('disabled');
  else el.attribute('disabled', '');
}

function updateControls() {
  const inChallenge = mode === 'challenge';
  for (const c of [answerInput, fitSelect, submitButton, nextButton]) {
    if (inChallenge) c.show(); else c.hide();
  }
  for (const s of [windowSlider, systemSlider, historySlider, attachSlider]) {
    if (inChallenge) s.hide(); else s.show();
  }
  if (inChallenge) {
    setEnabled(answerInput, !resolved);
    setEnabled(fitSelect, !resolved);
    setEnabled(submitButton, !resolved);
    setEnabled(nextButton, resolved);
    nextButton.html(chIndex === CHALLENGES.length - 1 ? 'Open Exploration Mode' : 'Next Challenge');
  }
  layoutControls();
}

// Flow the challenge controls left to right, wrapping when needed; sliders get one row each
function layoutControls() {
  if (mode === 'challenge') {
    const gap = 10;
    let x = 10;
    let y = drawHeight + 12;
    for (const c of [answerInput, fitSelect, submitButton, nextButton]) {
      const w = c.elt.offsetWidth;
      if (x > 10 && x + w > canvasWidth - 10) {
        x = 10;
        y += 38;
      }
      c.position(x, y);
      x += w + gap;
    }
  } else {
    const sliders = [windowSlider, systemSlider, historySlider, attachSlider];
    const left = sliderLabelWidth();
    for (let i = 0; i < sliders.length; i++) {
      sliders[i].position(left, drawHeight + 10 + i * 32);
      sliders[i].size(max(80, canvasWidth - left - margin));
    }
  }
}

// Narrow screens get a smaller label column so the sliders keep a usable width
function sliderLabelWidth() {
  return canvasWidth < 520 ? 175 : sliderLeftMargin;
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
  let ts = 24;  // shrink the title on narrow screens so it never clips
  textSize(ts);
  while (ts > 16 && textWidth('Context Window Budget Calculator') > canvasWidth - 16) textSize(--ts);
  text('Context Window Budget Calculator', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // illustrative label
  textSize(15);
  textStyle(ITALIC);
  fill('dimgray');
  let y = drawLines(wrapText(ILLUSTRATIVE_NOTE, canvasWidth - 2 * pad), pad, 42, 19) + 4;
  textStyle(NORMAL);

  if (mode === 'challenge') drawChallenge(y);
  else drawExplore(y);
}

function drawChallenge(y) {
  const innerW = canvasWidth - 2 * pad;
  const ch = CHALLENGES[chIndex];

  textSize(16);
  fill('black');
  const status = 'Challenge ' + (chIndex + 1) + ' of 3  |  Attempt ' + attempt + ' of 2  |  ' +
    'Challenges correct: ' + correctCount + ' of 3';
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 6;

  // component table
  const rows = [
    ['Window', fmt(ch.window) + ' tokens'],
    ['System prompt', fmt(ch.system) + ' tokens'],
    ['History', fmt(ch.history) + ' tokens'],
    ['Attachment', ch.attachmentText],
    ['Latest message', fmt(ch.message) + ' tokens'],
    ['Completion requested', fmt(ch.requested) + ' tokens']
  ];
  const twoCols = innerW >= 620;
  const colW = twoCols ? innerW / 2 : innerW;
  textSize(16);
  textStyle(BOLD);
  const labelCol = textWidth('Completion requested:') + 10;
  textStyle(NORMAL);
  const valW = colW - 24 - labelCol;
  const cells = rows.map(r => wrapText(r[1], valW));
  const nRows = twoCols ? 3 : 6;
  const rowHs = [];
  for (let r = 0; r < nRows; r++) {
    let n = twoCols ? Math.max(cells[r].length, cells[r + 3].length) : cells[r].length;
    rowHs.push(n * 20 + 4);
  }
  const boxH = rowHs.reduce((a, b) => a + b, 0) + 12;
  fill('white');
  stroke('navy');
  strokeWeight(1.5);
  rect(pad, y, innerW, boxH, 8);
  noStroke();
  for (let i = 0; i < rows.length; i++) {
    const col = twoCols ? Math.floor(i / 3) : 0;
    const r = twoCols ? i % 3 : i;
    const x0 = pad + 12 + col * colW;
    let yy = y + 8;
    for (let k = 0; k < r; k++) yy += rowHs[k];
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    fill('black');
    text(rows[i][0] + ':', x0, yy);
    textStyle(NORMAL);
    drawLines(cells[i], x0 + labelCol, yy, 20);
  }
  y += boxH + 10;

  // question
  textSize(19);
  textStyle(BOLD);
  fill('navy');
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 24);
  textStyle(NORMAL);
  textSize(16);
  fill('black');
  if (!resolved) {
    y = drawLines(wrapText('Type the tokens remaining, choose "fits" or "does not fit" for the ' +
      'requested completion, then press Submit.', innerW), pad, y + 2, 20) + 6;
  } else {
    y += 6;
  }

  // feedback
  const ans = challengeAnswer(ch);
  if (lastResult === 'invalid') {
    fill('#D55E00');
    y = drawLines(wrapText('Enter a whole number of tokens and choose "fits" or "does not fit" ' +
      'before you submit. This did not use an attempt.', innerW), pad, y, 20);
  } else if (lastResult === 'wrong1') {
    textStyle(BOLD);
    fill('#D55E00');
    y = drawLines(['✗ Not yet. Attempt 2 of 2.'], pad, y, 22);
    textStyle(NORMAL);
    fill('black');
    y = drawLines(wrapText(HINT_FIRST, innerW), pad, y, 20);
  } else if (lastResult === 'correct' || lastResult === 'missed') {
    textStyle(BOLD);
    textSize(17);
    if (lastResult === 'correct') {
      fill('#0072B2');
      y = drawLines(wrapText('✓ Correct: ' + fmt(ans.remaining) + ' tokens remain.', innerW), pad, y, 22);
    } else {
      fill('#D55E00');
      y = drawLines(wrapText('✗ Missed after two attempts. Answer: ' + fmt(ans.remaining) +
        ' tokens remain; ' + (ans.fits ? 'fits' : 'does not fit') + '.', innerW), pad, y, 22);
    }
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    y = drawLines(wrapText(ch.why, innerW), pad, y + 2, 20) + 8;
    y = drawBudgetBar(pad, y, innerW, [ch.system, ch.history, ans.attachment, ch.message],
      ch.window, ch.requested);
  }
  layoutBottom = y;
}

function drawExplore(y) {
  const innerW = canvasWidth - 2 * pad;
  const w = windowSlider.value();
  const sys = systemSlider.value();
  const hist = historySlider.value();
  const att = attachSlider.value();
  const rem = remainingTokens(w, sys, hist, att, EXPLORE_MESSAGE);
  const used = sys + hist + att + EXPLORE_MESSAGE;
  const ok = fits(rem, EXPLORE_REQUESTED);

  textSize(16);
  fill('black');
  textStyle(BOLD);
  y = drawLines(wrapText('Exploration mode  |  Challenges correct: ' + correctCount + ' of 3' +
    (correctCount === 3 ? ' (mastery reached)' : ' (mastery is 3 of 3)'), innerW), pad, y, 20) + 4;
  textStyle(NORMAL);
  y = drawLines(wrapText('Move the four sliders. The latest message is fixed at ' + fmt(EXPLORE_MESSAGE) +
    ' tokens and the requested completion is ' + fmt(EXPLORE_REQUESTED) + ' tokens.', innerW), pad, y, 20) + 4;
  fill('navy');
  y = drawLines(wrapText('Remaining = window - (system + history + attachment + latest message)',
    innerW), pad, y, 20) + 10;

  y = drawBudgetBar(pad, y, innerW, [sys, hist, att, EXPLORE_MESSAGE], w, EXPLORE_REQUESTED) + 6;

  textSize(17);
  fill('black');
  y = drawLines(wrapText('Used: ' + fmt(used) + ' tokens   Remaining: ' + fmt(rem) + ' tokens',
    innerW), pad, y, 22) + 2;
  textStyle(BOLD);
  fill(ok ? '#0072B2' : '#D55E00');
  y = drawLines(wrapText(ok
    ? '✓ Fits: a ' + fmt(EXPLORE_REQUESTED) + '-token completion fits.'
    : '✗ Does not fit: a ' + fmt(EXPLORE_REQUESTED) + '-token completion does not fit.',
    innerW), pad, y, 22);
  textStyle(NORMAL);
  textSize(16);
  fill('black');
  if (rem < 0) {
    y = drawLines(wrapText('The prompt alone overflows the window by ' + fmt(-rem) + ' tokens.',
      innerW), pad, y, 20);
  }
  fill('dimgray');
  y = drawLines(wrapText('Try this: set Attachment to 22,000 tokens, the size of two 8,250-word ' +
    'papers, and watch the decision change.', innerW), pad, y + 6, 20);
  layoutBottom = y;

  // slider labels in the control region
  const labels = [['Window', w], ['System prompt', sys], ['History', hist], ['Attachment', att]];
  textSize(16);
  textAlign(LEFT, CENTER);
  fill('black');
  noStroke();
  for (let i = 0; i < labels.length; i++) {
    text(labels[i][0] + ': ' + fmt(labels[i][1]), 10, drawHeight + 20 + i * 32);
  }
}

// Stacked bar of the window: four prompt segments, remaining space or overflow, and the
// requested completion drawn as a bracket below the bar. Returns the y below the legend.
function drawBudgetBar(x, y, w, parts, window, requested) {
  const used = parts.reduce((a, b) => a + b, 0);
  const rem = window - used;
  const scaleMax = Math.max(window, used, used + requested);
  const sc = w / scaleMax;
  const barH = 34;
  const top = y + 20;

  // window outline and limit label
  textSize(14);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  const winX = x + window * sc;
  const winLabel = 'Window ' + fmt(window);
  text(winLabel, Math.min(Math.max(x, winX - textWidth(winLabel) / 2), x + w - textWidth(winLabel)), y);
  fill('white');
  stroke('dimgray');
  strokeWeight(1);
  drawingContext.setLineDash([5, 4]);
  rect(x, top, window * sc, barH);
  drawingContext.setLineDash([]);

  // prompt segments
  let cx = x;
  for (let i = 0; i < parts.length; i++) {
    const sw = parts[i] * sc;
    if (sw <= 0) continue;
    fill(SEG[i].color);
    stroke('white');
    strokeWeight(1);
    rect(cx, top, sw, barH);
    if (sw >= 16) {
      noStroke();
      fill(SEG[i].ink);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text(SEG[i].key, cx + sw / 2, top + barH / 2);
      textStyle(NORMAL);
    }
    cx += sw;
  }

  // overflow hatching beyond the window limit
  if (used > window) {
    stroke('black');
    strokeWeight(1);
    const x0 = winX, x1 = x + used * sc;
    for (let hx = x0 - barH; hx < x1; hx += 8) {
      const a = Math.max(hx, x0), b = Math.min(hx + barH, x1);
      if (b <= a) continue;
      line(a, top + barH - (a - hx), b, top + barH - (b - hx));
    }
  }

  // window limit line
  stroke('black');
  strokeWeight(3);
  line(winX, top - 4, winX, top + barH + 4);

  // remaining space label inside the bar
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  fill('black');
  if (rem > 0) {
    const rw = rem * sc;
    const lab = 'Remaining ' + fmt(rem);
    if (textWidth(lab) + 6 < rw) text(lab, x + used * sc + rw / 2, top + barH / 2);
  }

  // requested completion bracket below the bar, starting where the prompt ends
  const ry = top + barH + 8;
  const rx0 = x + used * sc;
  const rx1 = rx0 + requested * sc;
  stroke('#56B4E9');
  strokeWeight(3);
  line(rx0, ry + 6, rx1, ry + 6);
  line(rx0, ry, rx0, ry + 12);
  line(rx1, ry, rx1, ry + 12);
  noStroke();
  fill('black');
  textSize(14);
  const reqLab = 'Requested completion ' + fmt(requested) + (fits(rem, requested) ? ' (fits)' : ' (does not fit)');
  const lw = textWidth(reqLab);
  textAlign(LEFT, TOP);
  let lx = Math.min(Math.max(x, (rx0 + rx1) / 2 - lw / 2), x + w - lw);
  text(reqLab, lx, ry + 14);
  let yy = ry + 34;

  if (used > window) {
    fill('black');
    textAlign(LEFT, TOP);
    text('Hatched: overflow of ' + fmt(used - window) + ' tokens past the window limit', x, yy);
    yy += 18;
  }

  // legend: swatch, letter and value for each segment
  textSize(14);
  let lx2 = x;
  let ly = yy + 2;
  for (let i = 0; i < parts.length; i++) {
    const label = SEG[i].name + ' ' + fmt(parts[i]);
    const itemW = 22 + textWidth(label) + 14;
    if (lx2 > x && lx2 + itemW > x + w) {
      lx2 = x;
      ly += 20;
    }
    fill(SEG[i].color);
    noStroke();
    rect(lx2, ly, 16, 16);
    fill(SEG[i].ink);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(SEG[i].key, lx2 + 8, ly + 8);
    textStyle(NORMAL);
    fill('black');
    textAlign(LEFT, TOP);
    text(label, lx2 + 20, ly + 1);
    lx2 += itemW;
  }
  return ly + 22;
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
  noStroke();
  for (const ln of lines) {
    text(ln, x, y);
    y += lineH;
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
