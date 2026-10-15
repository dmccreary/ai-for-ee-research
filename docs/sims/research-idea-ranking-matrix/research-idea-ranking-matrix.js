// Research Idea Ranking Matrix MicroSim
// CANVAS_HEIGHT: 850
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner calculates weighted scores S = sum of (weight x score) for four illustrative
// research ideas under two weighting profiles, answers five questions in a fixed order
// (two attempts for numbers, one for choices), and then explores their own weights.
// Weights are kept in whole twentieths (steps of 0.05) so every score is computed exactly.
// The design is width responsive; controls wrap and the sliders use one or two columns.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let canvasHeight = 850;       // fixed total height of the canvas (iframe height = 852)
let controlHeight = 50;       // recomputed from the number of control rows
let drawHeight = canvasHeight - controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150;   // room for the "Feasibility: 0.10" label left of each slider
let defaultTextSize = 16;
let pad = 12;                 // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification; all illustrative)
// ---------------------------------------------------------------
const CRITERIA = ['Impact', 'Feasibility', 'Novelty', 'Low risk'];

// s: scores from 1 to 5 (5 is best; "Low risk" is higher for lower risk)
const IDEAS = [
  { code: 'I1', name: 'Foreground calibration of comparator offset', s: [3, 5, 2, 5] },
  { code: 'I2', name: 'Learned redundancy to reduce mismatch', s: [4, 2, 5, 2] },
  { code: 'I3', name: 'New capacitor array layout', s: [3, 4, 3, 4] },
  { code: 'I4', name: 'Time-interleaved SAR with background calibration', s: [5, 2, 4, 2] }
];

// w20: weights in twentieths (0.05 steps); P1 = 0.3, 0.1, 0.4, 0.2 and P2 = 0.2, 0.5, 0.1, 0.2
const PROFILES = [
  { code: 'P1', name: 'Exploratory thesis', w20: [6, 2, 8, 4] },
  { code: 'P2', name: 'Deadline in three months', w20: [4, 10, 2, 4] }
];

// type 'number' (two attempts, tolerance 0.05) or 'choice' (one attempt)
// profiles: which profile rows are highlighted while the question is open
const QUESTIONS = [
  { q: 'What is the weighted score of I4 under P1?', type: 'number', answer: 3.7, profiles: [0],
    why: '5 x 0.3 + 2 x 0.1 + 4 x 0.4 + 2 x 0.2 = 1.5 + 0.2 + 1.6 + 0.4 = 3.7.' },
  { q: 'What is the weighted score of I1 under P2?', type: 'number', answer: 4.3, profiles: [1],
    why: '3 x 0.2 + 5 x 0.5 + 2 x 0.1 + 5 x 0.2 = 0.6 + 2.5 + 0.2 + 1.0 = 4.3.' },
  { q: 'Which idea ranks first under P1?', type: 'choice', options: ['I1', 'I2', 'I3', 'I4'],
    answer: 'I2', profiles: [0], why: 'Its score of 3.8 is the highest under P1.' },
  { q: 'Which idea ranks first under P2?', type: 'choice', options: ['I1', 'I2', 'I3', 'I4'],
    answer: 'I1', profiles: [1], why: 'Its score of 4.3 is the highest under P2.' },
  { q: 'Is there an idea that ranks first under both profiles?', type: 'choice', options: ['Yes', 'No'],
    answer: 'No', profiles: [0, 1],
    why: 'I2 leads under P1 and I1 leads under P2, so the weights decide the choice.' }
];

const GUIDING_QUESTION = 'Which idea wins when novelty matters most?';
const HINT = 'Multiply each score by its weight and add the four products.';
const TOLERANCE = 0.05;
const NUMERIC_ATTEMPTS = 2;
const MASTERY = 5;   // mastery is 5 of 5 correct

// ---------------------------------------------------------------
// Pure logic (no p5 calls; testable in node)
// ---------------------------------------------------------------
// Weighted score in twentieths: S x 20 = sum of w20_i x s_i (an exact integer)
function score20(idea, w20) {
  let t = 0;
  for (let i = 0; i < 4; i++) t += w20[i] * idea.s[i];
  return t;
}

// One-decimal display of a score given in twentieths (round half up)
function fmtScore(num20) {
  return (Math.ceil(num20 / 2) / 10).toFixed(1);
}

function fmtWeight(w20) {
  return (w20 / 20).toFixed(2);
}

// Ranking with competition ranks (1, 1, 3, ...); ties are reported as tied
function ranking(w20) {
  const rows = IDEAS.map(idea => ({ idea: idea, num20: score20(idea, w20) }));
  rows.sort((a, b) => b.num20 - a.num20);
  for (let i = 0; i < rows.length; i++) {
    rows[i].rank = (i > 0 && rows[i].num20 === rows[i - 1].num20) ? rows[i - 1].rank : i + 1;
  }
  for (const r of rows) r.tied = rows.filter(o => o.num20 === r.num20).length > 1;
  return rows;
}

// Parse a typed number; accepts a comma as the decimal mark. NaN when not a number.
function parseAnswer(str) {
  const t = String(str).trim().replace(',', '.');
  if (!/^[-+]?(\d+\.?\d*|\.\d+)$/.test(t)) return NaN;
  return parseFloat(t);
}

// A number is correct when it is within 0.05 of the answer (small epsilon for float error)
function numberCorrect(value, answer) {
  return Math.abs(value - answer) <= TOLERANCE + 1e-9;
}

function sumW20(w20) {
  return w20[0] + w20[1] + w20[2] + w20[3];
}

function weightsValid(w20) {
  return sumW20(w20) === 20 && w20.every(w => w >= 0 && w <= 20);
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let phase = 'quiz';       // 'quiz' or 'explore'
let qIndex = 0;           // current question (0..4), fixed order
let attempts = 0;         // attempts used on the current question
let resolved = false;     // current question finished (correct or revealed)
let feedback = '';        // '', 'hint', 'correct', 'reveal'
let lastAnswer = '';      // learner's last submitted answer (as displayed)
let notice = '';          // input problem message (not counted as an attempt)
let correctCount = 0;
let layoutBottom = 0;     // lowest y used by drawn content (used for layout testing)
let sliderRowsY = [];     // y of each slider label (for drawing labels in the control region)

// controls
let answerInput;
let choiceSelect;
let submitButton;
let nextButton;
let weightSliders = [];

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  answerInput = createInput('');
  answerInput.parent(document.querySelector('main'));
  answerInput.attribute('inputmode', 'decimal');
  answerInput.attribute('aria-label', 'Your answer (a number)');
  answerInput.attribute('autocomplete', 'off');
  answerInput.style('font-size', '16px');
  answerInput.style('width', '80px');
  answerInput.style('padding', '3px 6px');
  answerInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter') submitAnswer(); });

  choiceSelect = createSelect();
  choiceSelect.parent(document.querySelector('main'));
  choiceSelect.attribute('aria-label', 'Your answer (a choice)');
  choiceSelect.style('font-size', '16px');
  choiceSelect.style('padding', '3px');

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  submitButton.mouseClicked(submitAnswer);

  nextButton = createButton('Next Question');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mouseClicked(nextPressed);

  for (let i = 0; i < 4; i++) {
    // exploration starts from profile P1; steps of 0.05 between 0.0 and 1.0
    const s = createSlider(0, 1, PROFILES[0].w20[i] / 20, 0.05);
    s.parent(document.querySelector('main'));
    s.attribute('aria-label', CRITERIA[i] + ' weight');
    s.input(() => redraw());
    weightSliders.push(s);
  }

  startQuestion();

  describe('Research Idea Ranking Matrix. A table gives illustrative scores from 1 to 5 for four ' +
    'research ideas on impact, feasibility, novelty, and low risk, and two weighting profiles: P1 ' +
    'Exploratory thesis and P2 Deadline in three months. Five questions in a fixed order ask for ' +
    'weighted scores and for the idea that ranks first. Number answers get two attempts and are ' +
    'correct within 0.05; choices get one attempt. After each question the worked calculation and ' +
    'the ranking under both profiles are shown, with a running count out of 5. After question 5, ' +
    'four sliders let the learner set their own weights, which must sum to 1.00, and watch the ' +
    'ranking change.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 12px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------
function startQuestion() {
  const Q = QUESTIONS[qIndex];
  attempts = 0;
  resolved = false;
  feedback = '';
  lastAnswer = '';
  notice = '';
  answerInput.value('');
  if (Q.type === 'choice') {
    choiceSelect.elt.innerHTML = '';
    choiceSelect.option('Choose an answer', '');
    for (const o of Q.options) choiceSelect.option(o, o);
    choiceSelect.selected('');
  }
  updateControls();
  redraw();
  const focusEl = Q.type === 'number' ? answerInput.elt : choiceSelect.elt;
  if (qIndex > 0) focusEl.focus();
}

function submitAnswer() {
  if (phase !== 'quiz' || resolved) return;
  const Q = QUESTIONS[qIndex];
  notice = '';
  if (Q.type === 'number') {
    const v = parseAnswer(answerInput.value());
    if (isNaN(v)) {
      notice = 'Enter a number, such as 2.5.';
      redraw();
      return;
    }
    attempts++;
    lastAnswer = String(answerInput.value()).trim();
    if (numberCorrect(v, Q.answer)) {
      feedback = 'correct';
      correctCount++;
      resolved = true;
    } else if (attempts < NUMERIC_ATTEMPTS) {
      feedback = 'hint';
      answerInput.elt.select();
    } else {
      feedback = 'reveal';
      resolved = true;
    }
  } else {
    const c = choiceSelect.value();
    if (!c) {
      notice = 'Choose an answer first.';
      redraw();
      return;
    }
    attempts++;
    lastAnswer = c;
    if (c === Q.answer) {
      feedback = 'correct';
      correctCount++;
    } else {
      feedback = 'reveal';
    }
    resolved = true;
  }
  updateControls();
  redraw();
  if (resolved) nextButton.elt.focus();
}

function nextPressed() {
  if (phase !== 'quiz' || !resolved) return;
  if (qIndex < QUESTIONS.length - 1) {
    qIndex++;
    startQuestion();
  } else {
    phase = 'explore';
    updateControls();
    redraw();
    weightSliders[0].elt.focus();
  }
}

function setEnabled(el, on) {
  if (on) el.removeAttribute('disabled');
  else el.attribute('disabled', '');
}

function currentW20() {
  return weightSliders.map(s => Math.round(s.value() * 20));
}

function updateControls() {
  if (phase === 'quiz') {
    const Q = QUESTIONS[qIndex];
    if (Q.type === 'number') { answerInput.show(); choiceSelect.hide(); }
    else { answerInput.hide(); choiceSelect.show(); }
    setEnabled(answerInput, !resolved);
    setEnabled(choiceSelect, !resolved);
    setEnabled(submitButton, !resolved);
    submitButton.show();
    nextButton.show();
    nextButton.html(qIndex === QUESTIONS.length - 1 ? 'Explore Weights' : 'Next Question');
    setEnabled(nextButton, resolved);
    for (const s of weightSliders) s.hide();
  } else {
    answerInput.hide();
    choiceSelect.hide();
    submitButton.hide();
    nextButton.hide();
    for (const s of weightSliders) s.show();
  }
  layoutControls();
}

// Lay out the controls. The control region grows with the number of rows and the drawing
// region shrinks by the same amount, so the canvas (and iframe) height never changes.
function layoutControls() {
  if (phase === 'quiz') {
    const Q = QUESTIONS[qIndex];
    const field = Q.type === 'number' ? answerInput : choiceSelect;
    const labelW = 80;   // room for the drawn "Answer:" label
    const items = [field, submitButton, nextButton];
    const widths = items.map(b => b.elt.offsetWidth);
    // first pass: count rows
    let x = 10 + labelW, rows = 1;
    for (const w of widths) {
      if (x > 10 + labelW && x + w > canvasWidth - 10) { x = 10; rows++; }
      x += w + 10;
    }
    controlHeight = rows * 38 + 12;
    drawHeight = canvasHeight - controlHeight;
    // second pass: place
    x = 10 + labelW;
    let y = drawHeight + 8;
    for (let i = 0; i < items.length; i++) {
      if (x > 10 + labelW && x + widths[i] > canvasWidth - 10) { x = 10; y += 38; }
      items[i].position(x, y);
      x += widths[i] + 10;
    }
  } else {
    const cols = canvasWidth >= 580 ? 2 : 1;
    const rows = 4 / cols;
    controlHeight = rows * 38 + 12;
    drawHeight = canvasHeight - controlHeight;
    const colW = (canvasWidth - 10) / cols;
    sliderRowsY = [];
    for (let i = 0; i < 4; i++) {
      const col = cols === 2 ? i % 2 : 0;
      const row = cols === 2 ? Math.floor(i / 2) : i;
      const x0 = 10 + col * colW;
      const y = drawHeight + 10 + row * 38;
      weightSliders[i].position(x0 + sliderLeftMargin, y);
      weightSliders[i].size(Math.max(80, colW - sliderLeftMargin - margin));
      sliderRowsY.push({ x: x0, y: y + 10 });
    }
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
  text('Research Idea Ranking Matrix', canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (phase === 'quiz') drawQuiz(44);
  else drawExplore(44);
  drawControlLabels();
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

// The score matrix plus the weight rows. highlight: profile indexes to mark;
// mine: the learner's weights in twentieths (exploration) or null.
function drawMatrix(y, highlight, mine) {
  const innerW = canvasWidth - 2 * pad;
  const wide = innerW >= 620;
  const colW = wide ? 100 : Math.floor((innerW - 44) / 4);
  const nameW = innerW - 4 * colW;
  const x0 = pad;
  const colX = i => x0 + nameW + i * colW + colW / 2;
  const rowH = 22;

  // header text size shrinks only if "Feasibility" would not fit the column
  textStyle(BOLD);
  let hs = 16;
  textSize(hs);
  while (hs > 13 && textWidth('Feasibility') > colW - 6) { hs--; textSize(hs); }

  // header row
  fill('lavender');
  stroke('silver');
  rect(x0, y, innerW, rowH + 4);
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  text(wide ? 'Idea (illustrative scores, 1 to 5)' : 'Idea', x0 + 6, y + rowH / 2 + 2);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < 4; i++) { noStroke(); text(CRITERIA[i], colX(i), y + rowH / 2 + 2); }
  textStyle(NORMAL);
  y += rowH + 4;

  // idea rows
  textSize(16);
  for (const idea of IDEAS) {
    const label = wide ? wrapText(idea.code + ': ' + idea.name, nameW - 12) : [idea.code];
    const h = Math.max(rowH, label.length * 20 + 4);
    fill('white');
    stroke('silver');
    rect(x0, y, innerW, h);
    fill('black');
    drawLines(label, x0 + 6, y + (h - label.length * 20) / 2 + 1, 20);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < 4; i++) { noStroke(); text(idea.s[i], colX(i), y + h / 2 + 1); }
    y += h;
  }

  // weights header
  fill('lavender');
  stroke('silver');
  rect(x0, y, innerW, rowH);
  fill('black');
  textStyle(BOLD);
  noStroke();
  textAlign(LEFT, CENTER);
  text('Weights (each profile sums to 1.0)', x0 + 6, y + rowH / 2 + 1);
  textStyle(NORMAL);
  y += rowH;

  const weightRows = PROFILES.map((p, k) => ({
    label: wide ? p.code + ': ' + p.name : p.code, w20: p.w20, mark: highlight.indexOf(k) >= 0 }));
  if (mine) weightRows.push({ label: wide ? 'Your weights' : 'You', w20: mine, mark: true, mine: true });
  for (const r of weightRows) {
    if (r.mark) { fill('lightyellow'); stroke('navy'); strokeWeight(2); }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(x0, y, innerW, rowH + 2);
    strokeWeight(1);
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    if (r.mark) textStyle(BOLD);
    text((r.mark ? '▶ ' : '') + r.label, x0 + 6, y + rowH / 2 + 2);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < 4; i++) {
      noStroke();
      text(r.mine ? fmtWeight(r.w20[i]) : String(r.w20[i] / 20), colX(i), y + rowH / 2 + 2);
    }
    textStyle(NORMAL);
    y += rowH + 2;
  }

  // key for narrow layouts: full idea and profile names
  if (!wide) {
    y += 4;
    textSize(15);
    fill('black');
    for (const idea of IDEAS) {
      y = drawLines(wrapText(idea.code + ': ' + idea.name, innerW - 4), x0 + 2, y, 18);
    }
    y = drawLines(wrapText(PROFILES.map(p => p.code + ': ' + p.name).join('.  ') +
      '.  Ideas and scores are illustrative.', innerW - 4), x0 + 2, y, 18);
    textSize(16);
  }
  return y;
}

// Ranked list with bars for one set of weights, drawn in a column
function drawRankColumn(x, y, w, title, w20) {
  textSize(16);
  textStyle(BOLD);
  fill('black');
  y = drawLines(wrapText(title, w), x, y, 20);
  textStyle(NORMAL);
  const rows = ranking(w20);
  const labelW = textWidth('1 (tied). I4  0.0') + 8;
  const barMax = Math.max(20, w - labelW - 4);
  for (const r of rows) {
    const label = r.rank + (r.tied ? ' (tied)' : '') + '. ' + r.idea.code + '  ' + fmtScore(r.num20);
    if (r.rank === 1) textStyle(BOLD);
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    text(label, x, y + 1);
    textStyle(NORMAL);
    const bw = barMax * (r.num20 / 20) / 5;
    fill(r.rank === 1 ? 'steelblue' : 'lightsteelblue');
    stroke('navy');
    rect(x + labelW, y + 3, bw, 15);
    y += 22;
  }
  return y;
}

function drawRankings(y, sets) {
  const innerW = canvasWidth - 2 * pad;
  const gap = 16;
  const colW = (innerW - gap * (sets.length - 1)) / sets.length;
  let bottom = y;
  for (let k = 0; k < sets.length; k++) {
    const b = drawRankColumn(pad + k * (colW + gap), y, colW, sets[k].title, sets[k].w20);
    bottom = Math.max(bottom, b);
  }
  return bottom;
}

function drawQuiz(y) {
  const innerW = canvasWidth - 2 * pad;
  const Q = QUESTIONS[qIndex];

  // status line with the running count
  textSize(16);
  fill('dimgray');
  y = drawLines(wrapText('Question ' + (qIndex + 1) + ' of 5  |  ' + correctCount + ' of 5 correct' +
    (innerW >= 620 ? '  |  Ideas and scores are illustrative' : ''), innerW), pad, y, 20) + 2;

  // guiding question
  fill('navy');
  textStyle(ITALIC);
  textSize(18);
  y = drawLines(wrapText(GUIDING_QUESTION, innerW), pad, y, 22) + 6;
  textStyle(NORMAL);

  y = drawMatrix(y, Q.profiles, null) + 8;

  // question box
  textSize(18);
  textStyle(BOLD);
  const qLines = wrapText('Question ' + (qIndex + 1) + ': ' + Q.q, innerW - 20);
  textStyle(NORMAL);
  textSize(16);
  let sub;
  if (Q.type === 'number') {
    sub = 'Type a number and press Submit. Attempt ' +
      Math.min(attempts + 1, NUMERIC_ATTEMPTS) + ' of ' + NUMERIC_ATTEMPTS + '.';
    if (resolved) sub = 'Attempts used: ' + attempts + ' of ' + NUMERIC_ATTEMPTS + '.';
  } else {
    sub = resolved ? 'One attempt used.' : 'Choose an answer and press Submit. One attempt.';
  }
  const subLines = wrapText(sub, innerW - 20);
  const noteLines = notice ? wrapText(notice, innerW - 20) : [];
  const qH = 8 + qLines.length * 23 + (subLines.length + noteLines.length) * 20 + 8;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, qH, 8);
  strokeWeight(1);
  textSize(18);
  textStyle(BOLD);
  fill('black');
  let qy = drawLines(qLines, pad + 10, y + 8, 23);
  textStyle(NORMAL);
  textSize(16);
  fill('dimgray');
  qy = drawLines(subLines, pad + 10, qy, 20);
  if (noteLines.length) { fill('saddlebrown'); drawLines(noteLines, pad + 10, qy, 20); }
  y += qH + 8;

  // feedback panel
  if (feedback) {
    let head, body;
    const you = (Q.type === 'number' ? 'You entered ' : 'You chose ') + lastAnswer + '.';
    if (feedback === 'correct') { head = '✓ Correct.'; body = [Q.why]; }
    else if (feedback === 'hint') { head = '✗ ' + HINT; body = [you + ' Try once more.']; }
    else { head = '✗ The answer is ' + (Q.type === 'number' ? Q.answer.toFixed(1) : Q.answer) + '.';
      body = [you + ' ' + Q.why]; }
    textSize(18);
    textStyle(BOLD);
    const headLines = wrapText(head, innerW - 20);
    textStyle(NORMAL);
    textSize(16);
    let bodyLines = [];
    for (const b of body) bodyLines = bodyLines.concat(wrapText(b, innerW - 20));
    const fbH = 8 + headLines.length * 23 + bodyLines.length * 20 + 8;
    const good = feedback === 'correct';
    if (good) { fill('azure'); stroke('steelblue'); }
    else { fill('papayawhip'); stroke('darkorange'); }
    strokeWeight(3);
    rect(pad, y, innerW, fbH, 8);
    strokeWeight(1);
    textSize(18);
    textStyle(BOLD);
    fill(good ? 'navy' : 'saddlebrown');
    let fy = drawLines(headLines, pad + 10, y + 8, 23);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    drawLines(bodyLines, pad + 10, fy, 20);
    y += fbH + 8;
  }

  // full ranking under both profiles once the question is finished
  if (resolved) {
    y = drawRankings(y, PROFILES.map(p => ({ title: 'Ranking under ' + p.code, w20: p.w20 })));
  }
  layoutBottom = y;
}

function drawExplore(y) {
  const innerW = canvasWidth - 2 * pad;
  const mine = currentW20();

  // final score
  textSize(18);
  textStyle(BOLD);
  const met = correctCount >= MASTERY;
  fill(met ? 'navy' : 'saddlebrown');
  y = drawLines(wrapText(correctCount + ' of 5 correct. ' + (met
    ? '✓ Mastery reached (5 of 5).'
    : '✗ Mastery needs 5 of 5.'), innerW), pad, y, 23) + 2;
  textStyle(NORMAL);
  textSize(16);
  fill('black');
  y = drawLines(wrapText('Exploration: set your own weights with the sliders and watch the ranking. ' +
    'Try moving a little weight between two criteria.' +
    (innerW >= 620 ? ' Ideas and scores are illustrative.' : ''), innerW), pad, y, 20) + 6;

  y = drawMatrix(y, [], mine) + 8;

  // sum of the weights must be 1.00
  const sum = sumW20(mine);
  const valid = weightsValid(mine);
  textSize(16);
  textStyle(BOLD);
  let msg;
  if (valid) {
    msg = '✓ Sum of your weights: 1.00. The weights are valid.';
  } else {
    const diff = sum - 20;
    msg = '✗ Sum of your weights: ' + fmtWeight(sum) + '. The sum must be 1.00: ' +
      (diff > 0 ? 'lower' : 'raise') + ' the weights by ' + fmtWeight(Math.abs(diff)) + ' in total.';
  }
  fill(valid ? 'navy' : 'saddlebrown');
  y = drawLines(wrapText(msg, innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  if (valid) {
    y = drawRankings(y, [{ title: 'Ranking under your weights', w20: mine }]);
  } else {
    fill('dimgray');
    y = drawLines(wrapText('The ranking is paused until the weights sum to 1.00.', innerW), pad, y, 20);
  }
  layoutBottom = y;
}

// Slider labels and values, drawn in the control region to the left of each slider
function drawControlLabels() {
  if (phase === 'quiz') {
    fill('black');
    noStroke();
    textSize(16);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text('Answer:', 10, drawHeight + 8 + 15);
    textStyle(NORMAL);
    return;
  }
  const mine = currentW20();
  textSize(16);
  for (let i = 0; i < 4; i++) {
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text(CRITERIA[i] + ':', sliderRowsY[i].x, sliderRowsY[i].y);
    textStyle(NORMAL);
    text(fmtWeight(mine[i]), sliderRowsY[i].x + 104, sliderRowsY[i].y);
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

// Export the pure logic for testing in node (ignored in the browser and the p5.js editor)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { IDEAS, PROFILES, QUESTIONS, CRITERIA, HINT, TOLERANCE, score20, fmtScore,
    ranking, parseAnswer, numberCorrect, weightsValid, sumW20 };
}
