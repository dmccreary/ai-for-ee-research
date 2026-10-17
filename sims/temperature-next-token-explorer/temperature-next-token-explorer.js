// Temperature Next-Token Explorer MicroSim
// CANVAS_HEIGHT: 720
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner predicts whether the probability of a candidate token rises, falls, or stays the
// same when the temperature changes, then reveals the new softmax distribution.
// Three predictions in a fixed order, one attempt each, then an exploration mode with a
// temperature slider and a reproducible "draw 10 samples" button (seed 42).
// The design is width responsive; controls reflow onto extra rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 630;
// Control region: two rows of controls = (2 x 38) + 14 = 90
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;
let pad = 12;                // inner padding of the drawing region

// Okabe-Ito color-blind-safe colors; the asked-about token also gets a text tag and outline
const BAR_COLOR = '#0072B2';
const ASKED_COLOR = '#E69F00';
const GOOD = '#0072B2';
const BAD = '#D55E00';

// ---------------------------------------------------------------
// Content (from the chapter specification; illustrative, not output of a real model)
// ---------------------------------------------------------------
const ILLUSTRATIVE_NOTE = 'Illustrative, not output of a real model: the prompt, the candidate ' +
  'tokens and their scores are invented. Percentages are computed from the formula.';
const PROMPT_TEXT = 'The measured ENOB of the converter is';

const CANDIDATES = [
  { token: ' 9',     z: 2.0 },
  { token: ' 10',    z: 1.0 },
  { token: ' 8',     z: 0.0 },
  { token: ' about', z: -1.0 },
  { token: ' lower', z: -2.0 }
];

const PREDICTIONS = [
  { fromT: 1.0, toT: 0.5, tokenIdx: 0, answer: 'rises',
    question: 'If temperature drops to 0.5, what happens to the probability of the top token?',
    why: 'Lower temperature sharpens the distribution toward the highest score: 63.6% becomes 86.5%.' },
  { fromT: 1.0, toT: 2.0, tokenIdx: 0, answer: 'falls',
    question: 'If temperature rises to 2.0, what happens to the probability of the top token?',
    why: 'Higher temperature flattens the distribution: 63.6% becomes 42.9%, yet " 9" is still ranked first.' },
  { fromT: 1.0, toT: 2.0, tokenIdx: 4, answer: 'rises',
    question: 'If temperature rises to 2.0, what happens to the probability of the lowest-ranked token?',
    why: 'Flattening moves probability toward low-scoring tokens: 1.2% becomes 5.8%, yet it is still the least likely.' }
];

const SEED = 42;
const N_SAMPLES = 10;

// ---------------------------------------------------------------
// Pure logic
// ---------------------------------------------------------------
// p_i = exp(z_i / T) / sum_j exp(z_j / T), over the five candidates only
function softmax(scores, T) {
  const t = Math.max(0.1, T);           // minimum temperature 0.1 avoids division by zero
  const m = Math.max(...scores);         // subtract the max for numerical stability
  const e = scores.map(z => Math.exp((z - m) / t));
  const s = e.reduce((a, b) => a + b, 0);
  return e.map(v => v / s);
}

function probsAt(T) {
  return softmax(CANDIDATES.map(c => c.z), T);
}

// Percent rounded to 0.1 for display
function pct(p) {
  return (Math.round(p * 1000) / 10).toFixed(1);
}

// "rises", "falls" or "stays the same", computed from the formula
function changeDirection(tokenIdx, fromT, toT) {
  const a = probsAt(fromT)[tokenIdx];
  const b = probsAt(toT)[tokenIdx];
  if (Math.abs(b - a) < 1e-12) return 'stays the same';
  return b > a ? 'rises' : 'falls';
}

// Small seeded PRNG (mulberry32) so the draws are reproducible
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Draw n token indexes from the distribution at T, always starting from seed 42
function drawSamples(T, n) {
  const rng = mulberry32(SEED);
  const p = probsAt(T);
  const out = [];
  for (let k = 0; k < n; k++) {
    const u = rng();
    let acc = 0;
    let idx = p.length - 1;
    for (let i = 0; i < p.length; i++) {
      acc += p[i];
      if (u < acc) { idx = i; break; }
    }
    out.push(idx);
  }
  return out;
}

function roundT(v) {
  return Math.round(v * 10) / 10;
}

function quoted(i) {
  return '"' + CANDIDATES[i].token + '"';
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let mode = 'predict';    // 'predict' or 'explore'
let predIndex = 0;       // 0..2
let revealed = false;
let chosen = '';         // learner's committed prediction
let correctCount = 0;
let showNeedChoice = false;
let samples = null;      // { T, idx: [...] } from the last draw
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let predSelect, revealButton, nextButton, tempSlider, drawButton;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(28);   // Temperature
let lrs = null, tempEv = null, drawEv = null, predStart = 0;
// stable fragment per prediction, from what it asks (token rank and target temperature)
function predKey(item) {
  return 'q-' + (item.tokenIdx === 0 ? 'top' : 'lowest') + '-token-at-t' + item.toT.toFixed(1).replace('.', '-');
}

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  predSelect = createSelect();
  predSelect.parent(document.querySelector('main'));
  predSelect.option('Choose a prediction', '');
  predSelect.option('rises', 'rises');
  predSelect.option('falls', 'falls');
  predSelect.option('stays the same', 'stays the same');
  predSelect.selected('');
  predSelect.attribute('aria-label', 'Your prediction');
  predSelect.style('font-size', '16px');
  predSelect.changed(() => { showNeedChoice = false; redraw(); });

  revealButton = createButton('Reveal');
  revealButton.parent(document.querySelector('main'));
  styleButton(revealButton);
  revealButton.mousePressed(revealPressed);

  nextButton = createButton('Next Prediction');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mousePressed(nextPressed);

  tempSlider = createSlider(0.1, 2.0, 1.0, 0.1);
  tempSlider.parent(document.querySelector('main'));
  tempSlider.attribute('aria-label', 'Temperature');
  tempSlider.input(() => redraw());

  drawButton = createButton('Draw 10 Samples');
  drawButton.parent(document.querySelector('main'));
  styleButton(drawButton);
  drawButton.mousePressed(drawPressed);

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Temperature Next-Token Explorer', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Temperature Next-Token Explorer MicroSim', pageDwell: true });
    tempEv = lrs.slider('temperature-slider', { name: 'Temperature Slider', concept: PAGE_CONCEPT(),
      min: 0.1, max: 2.0, initial: Number(tempSlider.elt.value), round: 1 });
    drawEv = lrs.button('draw-samples-button', { name: 'Draw 10 Samples Button', concept: PAGE_CONCEPT() });
    // plain DOM listeners beside the sim's own .input() handler (p5 element hooks replace, not chain)
    tempSlider.elt.addEventListener('input', () => tempEv.input(Number(tempSlider.elt.value)));
    tempSlider.elt.addEventListener('change', () => tempEv.settle(Number(tempSlider.elt.value)));
    predStart = Date.now();
  }

  updateControls();

  describe('Temperature Next-Token Explorer. A bar chart shows the probability of five candidate ' +
    'next tokens for the illustrative prompt "The measured ENOB of the converter is" at the current ' +
    'temperature. Three predictions ask whether a token\'s probability rises, falls, or stays the ' +
    'same when the temperature changes; choose an answer and press Reveal to see the new ' +
    'distribution and feedback. Afterwards a temperature slider and a Draw 10 Samples button show ' +
    'synthetic draws with a fixed seed of 42.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

function setEnabled(el, on) {
  if (on) el.removeAttribute('disabled');
  else el.attribute('disabled', '');
}

// ---------------------------------------------------------------
// Prediction logic
// ---------------------------------------------------------------
function revealPressed() {
  if (mode !== 'predict' || revealed) return;
  const v = predSelect.value();
  if (v === '') {          // nothing chosen yet; this does not use the single attempt
    showNeedChoice = true;
    redraw();
    return;
  }
  const item = PREDICTIONS[predIndex];
  chosen = v;
  if (lrs) {
    lrs.question(predKey(item), { name: item.question, concept: PAGE_CONCEPT() })
      .answer({ success: v === changeDirection(item.tokenIdx, item.fromT, item.toT), response: LRS.slug(v),
                durationMs: predStart ? Date.now() - predStart : undefined });
  }
  revealed = true;
  if (chosen === changeDirection(item.tokenIdx, item.fromT, item.toT)) correctCount++;
  updateControls();
  redraw();
}

function nextPressed() {
  if (mode !== 'predict' || !revealed) return;
  if (predIndex < PREDICTIONS.length - 1) {
    predIndex++;            // each prediction starts again from temperature 1.0
    revealed = false;
    chosen = '';
    predStart = Date.now();
    predSelect.selected('');
  } else {
    mode = 'explore';
    tempSlider.value(1.0);
  }
  showNeedChoice = false;
  updateControls();
  redraw();
}

function drawPressed() {
  if (drawEv) drawEv.press('draw-samples');
  const T = roundT(tempSlider.value());
  samples = { T: T, idx: drawSamples(T, N_SAMPLES) };
  redraw();
}

function currentT() {
  if (mode === 'explore') return roundT(tempSlider.value());
  const item = PREDICTIONS[predIndex];
  return revealed ? item.toT : item.fromT;
}

function updateControls() {
  const predicting = mode === 'predict';
  for (const c of [predSelect, revealButton, nextButton]) {
    if (predicting) c.show(); else c.hide();
  }
  for (const c of [tempSlider, drawButton]) {
    if (predicting) c.hide(); else c.show();
  }
  if (predicting) {
    setEnabled(predSelect, !revealed);
    setEnabled(revealButton, !revealed);
    setEnabled(nextButton, revealed);
    nextButton.html(predIndex === PREDICTIONS.length - 1 ? 'Open Exploration Mode' : 'Next Prediction');
  }
  layoutControls();
}

function layoutControls() {
  if (mode === 'predict') {
    const gap = 10;
    let x = 10;
    let y = drawHeight + 12;
    for (const c of [predSelect, revealButton, nextButton]) {
      const w = c.elt.offsetWidth;
      if (x > 10 && x + w > canvasWidth - 10) {
        x = 10;
        y += 38;
      }
      c.position(x, y);
      x += w + gap;
    }
  } else {
    drawButton.position(10, drawHeight + 12);
    tempSlider.position(sliderLeftMargin, drawHeight + 56);
    tempSlider.size(max(80, canvasWidth - sliderLeftMargin - margin));
  }
}

// ---------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------
function draw() {
  updateCanvasSize();
  const innerW = canvasWidth - 2 * pad;

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
  while (ts > 16 && textWidth('Temperature Next-Token Explorer') > canvasWidth - 16) textSize(--ts);
  text('Temperature Next-Token Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // illustrative label
  textSize(15);
  textStyle(ITALIC);
  fill('dimgray');
  let y = drawLines(wrapText(ILLUSTRATIVE_NOTE, innerW), pad, 42, 19) + 6;
  textStyle(NORMAL);

  // prompt box
  textSize(16);
  const pLines = wrapText('Prompt: "' + PROMPT_TEXT + '"  ... next token?', innerW - 20);
  fill('white');
  stroke('navy');
  strokeWeight(1.5);
  rect(pad, y, innerW, pLines.length * 20 + 12, 8);
  fill('black');
  drawLines(pLines, pad + 10, y + 6, 20);
  y += pLines.length * 20 + 20;

  // status and temperature
  const T = currentT();
  if (mode === 'predict') {
    y = drawLines(wrapText('Prediction ' + (predIndex + 1) + ' of 3  |  Predictions correct: ' +
      correctCount + ' of 3', innerW), pad, y, 20) + 2;
  } else {
    y = drawLines(wrapText('Exploration mode  |  Predictions correct: ' + correctCount + ' of 3' +
      (correctCount === 3 ? ' (mastery reached)' : ' (mastery is 3 of 3)'), innerW), pad, y, 20) + 2;
  }
  textStyle(BOLD);
  textSize(18);
  let tLine = 'Temperature T = ' + T.toFixed(1);
  if (mode === 'predict' && revealed) tLine += '  (was ' + PREDICTIONS[predIndex].fromT.toFixed(1) + ')';
  y = drawLines([tLine], pad, y + 2, 24) + 4;
  textStyle(NORMAL);

  // bar chart
  const asked = mode === 'predict' ? PREDICTIONS[predIndex].tokenIdx : -1;
  const oldP = (mode === 'predict' && revealed) ? probsAt(PREDICTIONS[predIndex].fromT) : null;
  y = drawChart(pad, y, innerW, probsAt(T), oldP, asked) + 8;

  if (mode === 'predict') y = drawPredictionText(y, innerW);
  else y = drawExploreText(y, innerW);
  layoutBottom = y;

  // slider label in the control region
  if (mode === 'explore') {
    fill('black');
    noStroke();
    textSize(16);
    textAlign(LEFT, CENTER);
    text('Temperature: ' + roundT(tempSlider.value()).toFixed(1), 10, drawHeight + 64);
  }
}

// Horizontal bars, one per candidate in rank order. Returns the y below the chart.
function drawChart(x, y, w, p, oldP, asked) {
  textSize(16);
  const labelW = Math.max(...CANDIDATES.map((c, i) =>
    textWidth((i + 1) + '. "' + c.token + '"  z = ' + c.z.toFixed(1)))) + 14;
  const barX = x + labelW;
  const barW = w - labelW - 4;
  const rowH = 30;
  const bh = 20;

  // light gridlines at 0, 25, 50, 75, 100 percent
  stroke('gainsboro');
  strokeWeight(1);
  for (let g = 0; g <= 4; g++) {
    const gx = barX + barW * g / 4;
    line(gx, y, gx, y + rowH * CANDIDATES.length);
  }

  for (let i = 0; i < CANDIDATES.length; i++) {
    const ry = y + i * rowH;
    const isAsked = i === asked;
    // label: rank, token, score
    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    textStyle(isAsked ? BOLD : NORMAL);
    text((i + 1) + '. "' + CANDIDATES[i].token + '"  z = ' + CANDIDATES[i].z.toFixed(1), x, ry + rowH / 2);
    textStyle(NORMAL);

    // bar
    const bw = Math.max(1, barW * p[i]);
    fill(isAsked ? ASKED_COLOR : BAR_COLOR);
    stroke(isAsked ? 'black' : BAR_COLOR);
    strokeWeight(isAsked ? 2 : 1);
    rect(barX, ry + (rowH - bh) / 2, bw, bh);

    // dashed outline of the previous value after a reveal
    if (oldP) {
      noFill();
      stroke('black');
      strokeWeight(1.5);
      drawingContext.setLineDash([4, 3]);
      rect(barX, ry + (rowH - bh) / 2 - 2, Math.max(1, barW * oldP[i]), bh + 4);
      drawingContext.setLineDash([]);
    }

    // percent label: right of the bar, or inside it when there is no room
    let lab = pct(p[i]) + '%';
    if (oldP) lab += ' (was ' + pct(oldP[i]) + '%)';
    if (isAsked) lab += '  ◀ asked';
    noStroke();
    textSize(15);
    const lw = textWidth(lab);
    const ex = barX + Math.max(bw, oldP ? barW * oldP[i] : 0);
    if (ex + 6 + lw <= x + w) {
      fill('black');
      textAlign(LEFT, CENTER);
      text(lab, ex + 6, ry + rowH / 2);
    } else {
      // inside the bar, right aligned, on a white tag so it stays readable
      fill('white');
      rect(x + w - lw - 10, ry + 5, lw + 8, rowH - 10, 3);
      fill('black');
      textAlign(RIGHT, CENTER);
      text(lab, x + w - 6, ry + rowH / 2);
    }
    textSize(16);
  }
  // axis labels
  noStroke();
  fill('dimgray');
  textSize(13);
  textAlign(CENTER, TOP);
  const ay = y + rowH * CANDIDATES.length + 2;
  for (let g = 0; g <= 4; g++) {
    const gx = barX + barW * g / 4;
    textAlign(g === 0 ? LEFT : (g === 4 ? RIGHT : CENTER), TOP);
    text((g * 25) + '%', gx, ay);
  }
  return ay + 16;
}

function drawPredictionText(y, innerW) {
  const item = PREDICTIONS[predIndex];
  textSize(18);
  textStyle(BOLD);
  fill('navy');
  y = drawLines(wrapText(item.question, innerW), pad, y, 23) + 4;
  textStyle(NORMAL);
  textSize(16);
  fill('black');

  if (!revealed) {
    y = drawLines(wrapText('Choose "rises", "falls", or "stays the same" below, then press Reveal. ' +
      'You have one attempt.', innerW), pad, y, 20);
    if (showNeedChoice) {
      fill(BAD);
      y = drawLines(wrapText('Choose a prediction before you press Reveal.', innerW), pad, y + 4, 20);
    }
    return y;
  }

  const oldPct = pct(probsAt(item.fromT)[item.tokenIdx]);
  const newPct = pct(probsAt(item.toT)[item.tokenIdx]);
  const answer = changeDirection(item.tokenIdx, item.fromT, item.toT);
  textStyle(BOLD);
  if (chosen === answer) {
    fill(GOOD);
    y = drawLines(wrapText('✓ Correct: ' + quoted(item.tokenIdx) + ' goes from ' + oldPct +
      '% to ' + newPct + '%.', innerW), pad, y, 21);
    textStyle(NORMAL);
  } else {
    fill(BAD);
    y = drawLines(wrapText('✗ Not quite. You chose "' + chosen + '"; the answer is "' + answer + '".',
      innerW), pad, y, 21);
    textStyle(NORMAL);
    fill('black');
    y = drawLines(wrapText(item.why, innerW), pad, y, 20);
    y = drawLines(wrapText('Revealed: ' + quoted(item.tokenIdx) + ' is ' + oldPct + '% at T = ' +
      item.fromT.toFixed(1) + ' and ' + newPct + '% at T = ' + item.toT.toFixed(1) + '.', innerW), pad, y, 20);
  }
  return y;
}

function drawExploreText(y, innerW) {
  textSize(16);
  fill('black');
  y = drawLines(wrapText('Drag the temperature slider across the full range and press ' +
    '"Draw 10 Samples" to see how many of 10 draws are the top token " 9".', innerW), pad, y, 20) + 6;
  if (samples) {
    const T = roundT(tempSlider.value());
    const top = samples.idx.filter(i => i === 0).length;
    const distinct = new Set(samples.idx).size;
    textStyle(BOLD);
    y = drawLines(wrapText('Synthetic draws (seed 42) at T = ' + samples.T.toFixed(1) + ':', innerW), pad, y, 20);
    textStyle(NORMAL);
    y = drawLines(wrapText(samples.idx.map(i => '"' + CANDIDATES[i].token + '"').join(', '), innerW),
      pad, y, 20);
    y = drawLines(wrapText('Top token " 9": ' + top + ' of 10 draws.  Distinct tokens drawn: ' +
      distinct + '.', innerW), pad, y, 20);
    if (Math.abs(samples.T - T) > 1e-9) {
      fill('dimgray');
      y = drawLines(wrapText('The temperature has changed since this draw; press "Draw 10 Samples" again.',
        innerW), pad, y, 20);
    }
  }
  return y;
}

// Word-wrap a string to a maximum width using the current text settings
function wrapText(str, maxW) {
  // keep a quoted candidate token such as " 9" on one line (no-break space inside the quotes)
  str = str.replace(/" (9|10|8|about|lower)"/g, '" $1"');
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
