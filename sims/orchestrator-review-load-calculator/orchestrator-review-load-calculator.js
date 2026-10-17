// Orchestrator Review Load Calculator MicroSim
// CANVAS_HEIGHT: 750
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner calculates the daily review load of an agent team,
// L = fraction x n_p x k_p x r_p + n_e x k_e x r_e + c (minutes),
// in three challenges (two attempts each), then explores all nine quantities.
// The canvas height is fixed; the control region has 3 slider columns on wide
// screens and 2 on narrow ones, and the drawing region takes the rest.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let canvasHeight = 750;       // fixed total height (drawing + controls)
let controlHeight = 283;      // recalculated by layoutControls() from the slider columns
let drawHeight = canvasHeight - controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 10;    // sliders sit under their labels in a grid
let defaultTextSize = 16;
let pad = 12;                 // inner padding of the drawing region
let layoutBottom = 0;         // lowest y used by drawn content (used for layout testing)

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification; values are illustrative)
// ---------------------------------------------------------------
const QUANTITIES = [
  { key: 'np',   name: 'Planning agents n_p', short: 'n_p planning agents', min: 0, max: 40, step: 1, def: 20, unit: 'agents', shortUnit: '' },
  { key: 'ne',   name: 'Execution agents n_e', short: 'n_e execution agents', min: 0, max: 20, step: 1, def: 10, unit: 'agents', shortUnit: '' },
  { key: 'kp',   name: 'Planning outputs per agent per day k_p', short: 'k_p plan outputs/day', min: 1, max: 4, step: 1, def: 1, unit: 'outputs', shortUnit: '' },
  { key: 'ke',   name: 'Execution outputs per agent per day k_e', short: 'k_e exec outputs/day', min: 1, max: 4, step: 1, def: 1, unit: 'outputs', shortUnit: '' },
  { key: 'rp',   name: 'Review time per planning output r_p', short: 'r_p plan review', min: 2, max: 15, step: 1, def: 6, unit: 'minutes', shortUnit: 'min' },
  { key: 're',   name: 'Review time per execution output r_e', short: 'r_e exec review', min: 5, max: 30, step: 1, def: 15, unit: 'minutes', shortUnit: 'min' },
  { key: 'c',    name: 'Conflict resolution c', short: 'c conflicts', min: 0, max: 120, step: 10, def: 30, unit: 'minutes per day', shortUnit: 'min/day' },
  { key: 'att',  name: 'Attention available', short: 'Attention', min: 1, max: 8, step: 0.5, def: 4, unit: 'hours per day', shortUnit: 'h/day' },
  { key: 'frac', name: 'Fraction of planning outputs reviewed', short: 'Fraction reviewed', min: 0.25, max: 1.0, step: 0.25, def: 1.0, unit: '', shortUnit: '' }
];

const START_QUESTION = 'How many hours of review does this team need each day?';

// Challenges, in this order. All use the default values except where stated.
const CHALLENGES = [
  { text: 'What is the daily review load in hours for the default team?',
    set: {}, unknown: 'load', answer: 5.0, answerText: '5.0',
    why: '20 x 1 x 6 = 120, plus 10 x 1 x 15 = 150, plus 30 is 300 minutes, which is 5.0 hours.' },
  { text: 'With attention fixed at 4 hours, 10 execution agents, and every planning output reviewed, what is the largest number of planning agents that fits?',
    set: { att: 4, ne: 10, frac: 1.0 }, unknown: 'np', answer: 10, answerText: '10',
    why: '240 minutes minus 150 minus 30 leaves 60 minutes, and 60 / 6 = 10 planning agents.' },
  { text: 'With 20 planning agents and attention fixed at 4 hours, what is the largest fraction of planning outputs, from 0.25, 0.5, 0.75, 1.0, that can be reviewed?',
    set: { np: 20, att: 4 }, unknown: 'frac', answer: 0.5, answerText: '0.5',
    why: 'At 0.5 the load is 60 + 150 + 30 = 240 minutes, which equals 4 hours. At 0.75 it is 270 minutes, which exceeds it.' }
];

const FIRST_MISS_HINT = 'Check that each term is agents x outputs x minutes.';
const MAX_ATTEMPTS = 2;

// ---------------------------------------------------------------
// Pure calculation functions (exact arithmetic, testable in node)
// Load in minutes = fraction x n_p x k_p x r_p + n_e x k_e x r_e + c.
// The fraction is a multiple of 0.25, so the load is kept in quarter-minutes.
// The load fits when load <= attention x 60.
// ---------------------------------------------------------------
function loadTerms(v) {
  const q = Math.round(v.frac * 4);                 // fraction in quarters (1..4)
  const planQ = q * v.np * v.kp * v.rp;              // planning term, quarter-minutes
  const exec = v.ne * v.ke * v.re;                   // execution term, minutes
  const loadQ = planQ + 4 * (exec + v.c);            // total load, quarter-minutes
  return { planning: planQ / 4, execution: exec, conflicts: v.c, load: loadQ / 4,
           loadQ: loadQ, attentionMin: v.att * 60, fits: loadQ <= v.att * 240 };
}

function parseAnswer(str) {
  const s = String(str).trim();
  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  return Number(s);
}

function isCorrect(challenge, value) {
  return value !== null && Math.abs(value - challenge.answer) < 1e-9;
}

function defaults() {
  const v = {};
  QUANTITIES.forEach(q => { v[q.key] = q.def; });
  return v;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUANTITIES, CHALLENGES, loadTerms, parseAnswer, isCorrect, defaults };
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let stage = 0;              // 0..2 = challenge index, 3 = exploration
let attempts = 0;           // attempts used on the current challenge
let resolved = false;       // current challenge answered correctly or missed
let outcome = '';           // '', 'hint', 'correct', 'missed'
let invalidNote = false;    // last submission was not a number (not counted)
let results = [];           // per challenge: true (correct) / false (missed)

// controls
let answerInput, submitButton, nextButton, restoreButton;
let sliders = {};
let sliderCols = 2;
let cellW = 190;
let rowH = 46;                // height of one slider row (label + slider)

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(198);   // Researcher Attention
const CHALLENGE_KEYS = ['q-default-load-hours', 'q-max-planning-agents', 'q-max-fraction-reviewed'];
const SLIDER_KEYS = { np: 'planning-agents-slider', ne: 'execution-agents-slider',
  kp: 'planning-outputs-slider', ke: 'execution-outputs-slider', rp: 'planning-review-time-slider',
  re: 'execution-review-time-slider', c: 'conflict-resolution-slider', att: 'attention-slider',
  frac: 'fraction-reviewed-slider' };
let lrs = null, restoreBtnEv = null, challengeStart = 0;
const sliderEv = {};
// (re)create a slider's handle at its current value; call after the sim moves a slider in code
function makeSliderEv(q) {
  if (!lrs) return;
  sliderEv[q.key] = lrs.slider(SLIDER_KEYS[q.key], { name: q.name + ' Slider', concept: PAGE_CONCEPT(),
    min: q.min, max: q.max, initial: Number(sliders[q.key].value()), deadband: q.step,
    round: q.step < 1 ? 2 : 0 });
}

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  answerInput = createInput('');
  answerInput.parent(document.querySelector('main'));
  answerInput.attribute('inputmode', 'decimal');
  answerInput.attribute('aria-label', 'Your answer');
  answerInput.attribute('placeholder', 'answer');
  answerInput.style('font-size', '16px');
  answerInput.style('width', '90px');
  answerInput.style('padding', '3px 6px');
  answerInput.elt.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); submitAnswer(); }
  });

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  submitButton.mousePressed(submitAnswer);

  nextButton = createButton('Next challenge');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mousePressed(nextPressed);

  restoreButton = createButton('Restore defaults');
  restoreButton.parent(document.querySelector('main'));
  styleButton(restoreButton);
  restoreButton.mousePressed(restoreDefaults);

  for (const q of QUANTITIES) {
    const s = createSlider(q.min, q.max, q.def, q.step);
    s.parent(document.querySelector('main'));
    s.attribute('aria-label', q.name);
    s.input(() => { redraw(); if (lrs && sliderEv[q.key]) sliderEv[q.key].input(Number(s.value())); });
    s.changed(() => { if (lrs && sliderEv[q.key]) sliderEv[q.key].settle(Number(s.value())); });
    sliders[q.key] = s;
  }

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Orchestrator Review Load Calculator', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Orchestrator Review Load Calculator MicroSim', pageDwell: true });
    restoreBtnEv = lrs.button('restore-defaults-button', { name: 'Restore Defaults Button', concept: PAGE_CONCEPT() });
  }

  startChallenge(0);

  describe('Orchestrator Review Load Calculator. Nine quantities describe an agent team: planning and ' +
    'execution agents, outputs per agent per day, review minutes per output, conflict-resolution minutes, ' +
    'attention available in hours, and the fraction of planning outputs reviewed. The daily review load is ' +
    'L = fraction x n_p x k_p x r_p + n_e x k_e x r_e + c minutes. Three challenges, two attempts each, ask ' +
    'for the load in hours, the largest number of planning agents that fits in 4 hours, and the largest ' +
    'fraction of planning outputs that can be reviewed. A stacked bar compares the load with the attention ' +
    'available and says in words whether it fits. After the challenges the sliders unlock for exploration.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Challenge logic
// ---------------------------------------------------------------
function challengeValues(i) {
  const v = defaults();
  Object.assign(v, CHALLENGES[i].set);
  const u = CHALLENGES[i].unknown;
  if (u !== 'load' && resolved) v[u] = CHALLENGES[i].answer;   // revealed after the challenge ends
  return v;
}

// The values that drive the bar and the worked calculation
function currentValues() {
  if (stage < CHALLENGES.length) return challengeValues(stage);
  const v = {};
  for (const q of QUANTITIES) v[q.key] = Number(sliders[q.key].value());
  return v;
}

function startChallenge(i) {
  stage = i;
  attempts = 0;
  resolved = false;
  outcome = '';
  invalidNote = false;
  answerInput.value('');
  challengeStart = Date.now();
  syncSliders();
  updateControls();
  redraw();
}

function submitAnswer() {
  if (stage >= CHALLENGES.length || resolved) return;
  const ch = CHALLENGES[stage];
  const val = parseAnswer(answerInput.value());
  if (val === null) {                 // not counted as an attempt
    invalidNote = true;
    redraw();
    return;
  }
  invalidNote = false;
  attempts++;
  if (lrs) lrs.question(CHALLENGE_KEYS[stage], { name: 'Challenge ' + (stage + 1) + ': ' + ch.text, concept: PAGE_CONCEPT() })
    .answer({ success: isCorrect(ch, val), response: String(val),
              durationMs: challengeStart ? Date.now() - challengeStart : undefined,
              extensions: { 'attempt-number': attempts } });
  if (isCorrect(ch, val)) {
    resolved = true;
    outcome = 'correct';
    results[stage] = true;
  } else if (attempts >= MAX_ATTEMPTS) {
    resolved = true;
    outcome = 'missed';
    results[stage] = false;
  } else {
    outcome = 'hint';
  }
  syncSliders();
  updateControls();
  redraw();
  if (resolved) nextButton.elt.focus();
}

function nextPressed() {
  if (!resolved) return;
  if (stage < CHALLENGES.length - 1) {
    startChallenge(stage + 1);
    answerInput.elt.focus();
  } else {
    // exploration opens with the default values
    stage = CHALLENGES.length;
    for (const q of QUANTITIES) sliders[q.key].value(q.def);
    if (lrs) QUANTITIES.forEach(makeSliderEv);   // sliders were moved in code
    syncSliders();
    updateControls();
    redraw();
    sliders.np.elt.focus();
  }
}

function restoreDefaults() {
  if (lrs) restoreBtnEv.press('restore');
  for (const q of QUANTITIES) sliders[q.key].value(q.def);
  if (lrs) QUANTITIES.forEach(makeSliderEv);   // sliders were moved in code
  redraw();
}

function countCorrect() {
  return results.filter(r => r === true).length;
}

// During the challenges the sliders show the challenge values and are locked;
// the unknown quantity's slider is hidden until the challenge ends.
function syncSliders() {
  const exploring = stage >= CHALLENGES.length;
  for (const q of QUANTITIES) {
    const s = sliders[q.key];
    if (exploring) {
      s.removeAttribute('disabled');
      s.show();
    } else {
      const v = challengeValues(stage);
      s.value(v[q.key]);
      s.attribute('disabled', '');
      const hidden = CHALLENGES[stage].unknown === q.key && !resolved;
      if (hidden) s.hide(); else s.show();
    }
  }
}

function updateControls() {
  const exploring = stage >= CHALLENGES.length;
  if (exploring) {
    answerInput.hide();
    submitButton.hide();
    nextButton.hide();
    restoreButton.show();
  } else {
    answerInput.show();
    submitButton.show();
    restoreButton.hide();
    if (resolved) {
      nextButton.show();
      nextButton.html(stage === CHALLENGES.length - 1 ? 'Start exploring' : 'Next challenge');
      answerInput.attribute('disabled', '');
      submitButton.attribute('disabled', '');
    } else {
      nextButton.hide();
      answerInput.removeAttribute('disabled');
      submitButton.removeAttribute('disabled');
    }
  }
  layoutControls();
}

// Answer row on top; the nine sliders in a grid of 3 (wide) or 2 (narrow) columns
function layoutControls() {
  sliderCols = canvasWidth >= 860 ? 3 : 2;
  const rows = Math.ceil(QUANTITIES.length / sliderCols);
  rowH = canvasWidth < 560 ? 40 : 46;
  controlHeight = 45 + rows * rowH + 8;
  drawHeight = canvasHeight - controlHeight;

  // row 1: answer box and buttons (or Restore defaults in exploration)
  let x = 10;
  const y = drawHeight + 8;
  for (const el of [answerInput, submitButton, nextButton, restoreButton]) {
    if (el.elt.style.display === 'none') continue;
    el.position(x, y);
    x += el.elt.offsetWidth + 10;
  }

  // slider grid
  cellW = Math.floor((canvasWidth - 20) / sliderCols);
  QUANTITIES.forEach((q, i) => {
    const col = i % sliderCols;
    const row = Math.floor(i / sliderCols);
    const s = sliders[q.key];
    s.position(sliderLeftMargin + col * cellW, drawHeight + 45 + row * rowH + 18);
    s.size(cellW - 20);
  });
}

// ---------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------
function fmtNum(x) {
  // exact display: at most 2 decimals are ever needed for quarter-minute values
  return String(Math.round(x * 100) / 100);
}

function fmtHours(min) {
  const h = min / 60;
  const r3 = Math.round(h * 1000) / 1000;
  return (Math.abs(r3 - h) < 1e-12) ? String(r3) : '≈ ' + h.toFixed(2);
}

function valueText(q, v, short) {
  const s = (q.key === 'frac') ? v.toFixed(2) : fmtNum(v);
  let unit = short ? q.shortUnit : q.unit;
  if (v === 1 && (unit === 'agents' || unit === 'outputs' || unit === 'minutes')) unit = unit.slice(0, -1);
  return unit ? s + ' ' + unit : s;
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
  textSize(canvasWidth < 480 ? 19 : 22);
  text('Orchestrator Review Load Calculator', canvasWidth / 2, 8);
  textStyle(NORMAL);

  let y = 38;
  if (stage < CHALLENGES.length) y = drawChallenge(y);
  else y = drawExploration(y);
  y = drawBar(y + 4);
  layoutBottom = y;

  drawSliderLabels();
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
  noStroke();
  for (const ln of lines) {
    text(ln, x, y);
    y += lineH;
  }
  return y;
}

function para(str, y, size, color, style) {
  if (canvasWidth < 560) size -= 1;   // slightly smaller text on narrow screens
  textSize(size);
  textStyle(style || NORMAL);
  fill(color);
  const lh = Math.round(size * 1.3);
  y = drawLines(wrapText(str, canvasWidth - 2 * pad), pad, y, lh);
  textStyle(NORMAL);
  return y;
}

function statusLine() {
  const n = countCorrect();
  if (stage < CHALLENGES.length) {
    return 'Challenge ' + (stage + 1) + ' of 3  |  ' + n + ' of 3 correct  |  attempt ' +
      Math.min(attempts + (resolved ? 0 : 1), MAX_ATTEMPTS) + ' of 2  |  values are illustrative';
  }
  return 'Exploration  |  challenges: ' + n + ' of 3 correct  |  values are illustrative';
}

function formulaLine() {
  return 'L = fraction x n_p x k_p x r_p + n_e x k_e x r_e + c (minutes). It fits when L <= attention x 60.';
}

// Worked calculation with the current numbers
function workedLine(v) {
  const t = loadTerms(v);
  const plan = (v.frac === 1 ? '' : v.frac + ' x ') + v.np + ' x ' + v.kp + ' x ' + v.rp;
  return 'L = ' + plan + ' + ' + v.ne + ' x ' + v.ke + ' x ' + v.re + ' + ' + v.c +
    ' = ' + fmtNum(t.planning) + ' + ' + fmtNum(t.execution) + ' + ' + fmtNum(t.conflicts) +
    ' = ' + fmtNum(t.load) + ' minutes ' + (fmtHours(t.load).startsWith('\u2248') ? '' : '= ') +
    fmtHours(t.load) + ' hours.';
}

function drawChallenge(y) {
  const ch = CHALLENGES[stage];
  y = para(statusLine(), y, 15, 'dimgray') + 4;
  if (stage === 0) y = para(START_QUESTION, y, 17, 'navy', ITALIC) + 2;
  y = para(ch.text, y, 17, 'black', BOLD) + 4;
  if (!resolved) y = para(formulaLine(), y, 15, 'black') + 6;

  // feedback
  if (invalidNote) {
    y = para('Type a number, for example 2.5, then press Submit. This was not counted as an attempt.', y, 16, 'saddlebrown');
  }
  if (outcome === 'hint') {
    y = para('✗ ' + FIRST_MISS_HINT + ' One attempt left.', y, 16, 'saddlebrown', BOLD);
  } else if (outcome === 'correct') {
    y = para('✓ Correct. ' + ch.why, y, 16, 'navy', BOLD);
  } else if (outcome === 'missed') {
    y = para('✗ Missed (counts as missed). The answer is ' + ch.answerText + '. ' + ch.why, y, 16, 'saddlebrown', BOLD);
  } else if (!invalidNote) {
    y = para('Type your answer below and press Submit. You have two attempts. The sliders show this ' +
      'challenge\u2019s values and unlock after the three challenges.', y, 16, 'black');
  }
  if (resolved) {
    y = para(workedLine(currentValues()), y + 2, 15, 'black');
    if (stage === CHALLENGES.length - 1) {
      const n = countCorrect();
      y = para(n + ' of 3 correct. ' + (n === 3 ? '✓ Mastery reached (3 of 3).' :
        'Mastery needs 3 of 3.') + ' Press Start exploring to change all nine quantities.', y + 2, 16, 'black', BOLD);
    }
  }
  return y;
}

function drawExploration(y) {
  y = para(statusLine(), y, 15, 'dimgray') + 4;
  y = para('Exploration: change any of the nine quantities and watch the bar. Try halving the review time per ' +
    'planning output (6 to 3), then restore the defaults and halve the review time per execution output ' +
    '(15 to 7 or 8). Which saves more?', y, 16, 'black') + 4;
  y = para(formulaLine(), y, 15, 'black') + 4;
  y = para(workedLine(currentValues()), y, 15, 'black', BOLD);
  return y;
}

// Stacked bar of the load against a dashed attention line, with the result in words
function drawBar(y) {
  const v = currentValues();
  const t = loadTerms(v);
  const showLoad = !(stage < CHALLENGES.length && !resolved);
  const x0 = pad + 4;
  const w = canvasWidth - 2 * pad - 8;
  const barH = 28;
  const top = y + 42;

  // axis maximum in whole hours
  const maxMin = Math.max(showLoad ? t.load : 0, t.attentionMin) * 1.12;
  const maxH = Math.max(1, Math.ceil(maxMin / 60));
  const sx = m => x0 + (m / (maxH * 60)) * w;

  // header line: attention
  textSize(15);
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('Review load vs. attention available', x0, y);
  textStyle(NORMAL);

  // bar background
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(x0, top, w, barH);

  if (showLoad) {
    const segs = [
      { v: t.planning, color: 'steelblue', name: 'planning' },
      { v: t.execution, color: 'darkorange', name: 'execution' },
      { v: t.conflicts, color: 'gray', name: 'conflicts' }
    ];
    let cx = 0;
    for (const s of segs) {
      if (s.v <= 0) continue;
      const xa = sx(cx), xb = sx(cx + s.v);
      fill(s.color);
      stroke('white');
      strokeWeight(2);
      rect(xa, top, xb - xa, barH);
      // label inside the segment when it fits (second cue besides color)
      textSize(14);
      const lbl = fmtNum(s.v);
      if (xb - xa > textWidth(lbl) + 6) {
        fill(s.color === 'darkorange' ? 'black' : 'white');
        noStroke();
        textAlign(CENTER, CENTER);
        text(lbl, (xa + xb) / 2, top + barH / 2);
      }
      cx += s.v;
    }
  } else {
    fill('dimgray');
    noStroke();
    textSize(15);
    textAlign(CENTER, CENTER);
    text('? load shown after you submit', x0 + w / 2, top + barH / 2);
  }

  // attention line (dashed) and label
  const ax = sx(t.attentionMin);
  stroke('black');
  strokeWeight(3);
  drawingContext.setLineDash([6, 4]);
  line(ax, top - 6, ax, top + barH + 6);
  drawingContext.setLineDash([]);
  noStroke();
  fill('black');
  textSize(14);
  const attLbl = 'attention ' + fmtNum(v.att) + ' h = ' + fmtNum(t.attentionMin) + ' min';
  const aw = textWidth(attLbl);
  textAlign(LEFT, BOTTOM);
  // label beside the line, never across it
  text(attLbl, (ax - aw - 8 >= x0) ? ax - aw - 8 : Math.min(ax + 8, x0 + w - aw), top - 4);

  // axis ticks in hours
  textSize(13);
  fill('dimgray');
  const stepH = maxH <= 10 ? 1 : (maxH <= 24 ? 2 : (maxH <= 50 ? 5 : 10));
  textAlign(CENTER, TOP);
  for (let h = 0; h <= maxH; h += stepH) {
    stroke('silver');
    strokeWeight(1);
    line(sx(h * 60), top + barH, sx(h * 60), top + barH + 4);
    noStroke();
    text(h + ' h', sx(h * 60), top + barH + 5);
  }
  y = top + barH + 22;

  // legend and verdict in words
  textSize(15);
  textAlign(LEFT, TOP);
  noStroke();
  if (showLoad) {
    const items = [['steelblue', 'planning ' + fmtNum(t.planning)],
                   ['darkorange', 'execution ' + fmtNum(t.execution)],
                   ['gray', 'conflicts ' + fmtNum(t.conflicts) + ' min']];
    let lx = x0;
    for (const it of items) {
      const iw = 18 + textWidth(it[1]) + 14;
      if (lx > x0 && lx + iw > x0 + w) { lx = x0; y += 20; }
      fill(it[0]);
      rect(lx, y + 2, 13, 13);
      fill('black');
      text(it[1], lx + 18, y);
      lx += iw;
    }
    y += 22;
    const verdict = t.fits
      ? '✓ Fits: load ' + fmtNum(t.load) + ' min (' + fmtHours(t.load) + ' h) <= attention ' + fmtNum(t.attentionMin) + ' min.'
      : '✗ Does not fit: load ' + fmtNum(t.load) + ' min (' + fmtHours(t.load) + ' h) > attention ' +
        fmtNum(t.attentionMin) + ' min, over by ' + fmtNum(t.load - t.attentionMin) + ' min.';
    y = para(verdict, y, 16, t.fits ? 'navy' : 'saddlebrown', BOLD);
  }
  return y;
}

// Labels above each slider in the control region
function drawSliderLabels() {
  const v = currentValues();
  const exploring = stage >= CHALLENGES.length;
  QUANTITIES.forEach((q, i) => {
    const col = i % sliderCols;
    const row = Math.floor(i / sliderCols);
    const x = sliderLeftMargin + col * cellW;
    const y = drawHeight + 45 + row * rowH + 1;
    const unknown = !exploring && CHALLENGES[stage].unknown === q.key && !resolved;
    const maxW = cellW - 12;
    let size = 15;
    let label = q.name + ': ' + (unknown ? '? (your answer)' : valueText(q, v[q.key], false));
    textSize(size);
    if (textWidth(label) > maxW) label = q.short + ': ' + (unknown ? '?' : valueText(q, v[q.key], true));
    while (textWidth(label) > maxW && size > 12) { size--; textSize(size); }
    noStroke();
    fill(unknown ? 'saddlebrown' : 'black');
    textAlign(LEFT, TOP);
    textStyle(unknown ? BOLD : NORMAL);
    text(label, x, y);
    textStyle(NORMAL);
  });
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
