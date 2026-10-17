// Search Query Precision and Recall Explorer MicroSim
// CANVAS_HEIGHT: 856
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// A synthetic corpus of 20 papers (P1 to P20, eight relevant) and three queries A, B, and C.
// For each query the learner reveals the relevant set, marks the relevant returned papers,
// and enters precision and recall to two decimal places (two attempts per query, tolerance 0.01).
// Then the learner chooses the query that suits a stated purpose (one attempt).
// The design is width responsive; the control region wraps its rows at narrow widths.

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 660;
// Control region: rows of native p5.js controls that wrap at narrow widths
let controlHeight = 196;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let layoutBottom = 0;       // lowest y used by drawn content (used for layout testing)

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const CORPUS_SIZE = 20;                       // papers P1 to P20
const RELEVANT = [1, 2, 3, 4, 5, 6, 7, 8];    // P1 to P8 are relevant; P9 to P20 are not
const CORPUS_LABEL = 'synthetic, invented for this exercise';

const QUERIES = [
  { id: 'A',
    description: 'A narrow query using the exact phrase "foreground calibration"',
    returned: [1, 2, 3, 4, 9, 10] },
  { id: 'B',
    description: 'A broad query using OR across many synonyms',
    returned: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
  { id: 'C',
    description: 'A balanced query combining architecture and technique terms',
    returned: [1, 2, 3, 4, 5, 6, 7, 9] }
];

const QUESTION = 'What fraction of the results are relevant, and what fraction of the relevant papers were found?';
const PURPOSE_QUESTION = 'You are starting a literature survey and cannot afford to miss any relevant paper. ' +
  'Which query should you run first?';
const PURPOSE_ANSWER = 'B';
const PURPOSE_REASON = 'Recall is the priority when a missed paper is costly, and the extra irrelevant ' +
  'results can be removed in triage.';
const HINT = 'Count the relevant papers returned and divide by the number returned for precision, ' +
  'and by 8 for recall.';

const TOLERANCE = 0.01;      // a value is correct when within 0.01 of the reference value
const ATTEMPTS_PER_QUERY = 2;
const MASTERY_VALUES = 5;    // mastery: at least 5 of 6 values correct and the choice correct

// ---------------------------------------------------------------
// Pure logic (no p5.js calls; tested in node)
// ---------------------------------------------------------------
function isRelevant(p) {
  return RELEVANT.indexOf(p) >= 0;
}

// Counts for one query: returned, TP, FP, FN
function countsFor(q) {
  let tp = 0, fp = 0;
  for (const p of q.returned) {
    if (isRelevant(p)) tp++; else fp++;
  }
  const fn = RELEVANT.length - tp;
  return { returned: q.returned.length, tp: tp, fp: fp, fn: fn };
}

// Values are displayed (and compared) to two decimal places
function round2(x) {
  return Math.round(x * 100 + 1e-9) / 100;
}

function referenceValues(q) {
  const c = countsFor(q);
  return {
    precision: round2(c.tp / (c.tp + c.fp)),   // precision = TP / (TP + FP)
    recall: round2(c.tp / (c.tp + c.fn))       // recall = TP / (TP + FN)
  };
}

function fmt2(x) {
  return x.toFixed(2);
}

// Parse a typed value; returns a number in [0, 1] or null when the entry is not usable
function parseValue(s) {
  if (s === null || s === undefined) return null;
  const t = String(s).trim();
  if (t === '' || !/^(\d+(\.\d*)?|\.\d+)$/.test(t)) return null;
  const v = Number(t);
  if (!isFinite(v) || v < 0 || v > 1) return null;
  return v;
}

function isClose(v, ref) {
  return Math.abs(v - ref) <= TOLERANCE + 1e-9;
}

function workedCounts(q) {
  const c = countsFor(q);
  const r = referenceValues(q);
  return 'Query ' + q.id + ': ' + c.returned + ' returned. TP = ' + c.tp + ', FP = ' + c.fp + ', FN = ' +
    c.fn + '. Precision = ' + c.tp + ' / (' +
    c.tp + ' + ' + c.fp + ') = ' + fmt2(r.precision) + '. Recall = ' + c.tp + ' / (' + c.tp + ' + ' +
    c.fn + ') = ' + fmt2(r.recall) + '.';
}

// Category of paper p for query q: 'TP', 'FP', 'FN', or '' (not returned and not relevant)
function categoryOf(q, p) {
  const ret = q.returned.indexOf(p) >= 0;
  const rel = isRelevant(p);
  if (ret && rel) return 'TP';
  if (ret) return 'FP';
  if (rel) return 'FN';
  return '';
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let revealed = false;     // has the relevant set been revealed?
let qIndex = 0;           // query being worked (0..2)
let phase = 'queries';    // 'queries' | 'choice' | 'done'
let qState = [];          // per query: attempts, pOk, rOk, pVal, rVal, resolved, solved
let marks = [];           // per query: array of paper numbers the learner marked relevant
let message = '';         // instruction or validation line (not feedback on correctness)
let feedbackLines = [];   // [{text, style}] feedback for the current query
let choice = null;        // 'A' | 'B' | 'C' after the single attempt

// controls
let ctrlBox, markRow, valueRow, choiceRow;
let markLabel, revealButton;
let paperBoxes = [];      // one checkbox per paper (only the returned ones are shown)
let precisionInput, recallInput, precisionMark, recallMark;
let checkButton, nextButton;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(207);   // Search Strategy
let lrs = null, attemptStart = 0;
let choiceSelect, submitButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // ----- Create ALL controls before laying them out -----
  ctrlBox = createDiv('');
  ctrlBox.parent(document.querySelector('main'));
  ctrlBox.style('box-sizing', 'border-box');
  ctrlBox.style('padding', '8px 10px');
  ctrlBox.style('display', 'flex');
  ctrlBox.style('flex-direction', 'column');
  ctrlBox.style('gap', '8px');
  ctrlBox.style('font-size', '16px');
  ctrlBox.style('font-family', 'Arial, Helvetica, sans-serif');

  markRow = makeRow();
  valueRow = makeRow();
  choiceRow = makeRow();

  markLabel = createSpan('');
  markLabel.parent(markRow);
  markLabel.style('font-weight', 'bold');

  revealButton = createButton('Reveal Relevant Set');
  revealButton.parent(markRow);
  styleButton(revealButton);
  revealButton.mousePressed(revealRelevant);

  for (let p = 1; p <= CORPUS_SIZE; p++) {
    const cb = createCheckbox('P' + p, false);
    cb.parent(markRow);
    cb.style('font-size', '16px');
    cb.style('white-space', 'nowrap');
    cb.changed(() => toggleMark(p, cb.checked()));
    paperBoxes.push(cb);
  }

  const pLabel = createSpan('Precision:');
  pLabel.parent(valueRow);
  pLabel.style('font-weight', 'bold');
  precisionInput = createInput('', 'text');
  precisionInput.parent(valueRow);
  styleInput(precisionInput, 'Precision, a decimal between 0 and 1');
  precisionMark = createSpan('');
  precisionMark.parent(valueRow);

  const rLabel = createSpan('Recall:');
  rLabel.parent(valueRow);
  rLabel.style('font-weight', 'bold');
  recallInput = createInput('', 'text');
  recallInput.parent(valueRow);
  styleInput(recallInput, 'Recall, a decimal between 0 and 1');
  recallMark = createSpan('');
  recallMark.parent(valueRow);

  checkButton = createButton('Check Values');
  checkButton.parent(valueRow);
  styleButton(checkButton);
  checkButton.mousePressed(checkValues);

  nextButton = createButton('Next Query');
  nextButton.parent(valueRow);
  styleButton(nextButton);
  nextButton.mousePressed(nextPressed);

  const cLabel = createSpan('Your choice:');
  cLabel.parent(choiceRow);
  cLabel.style('font-weight', 'bold');
  choiceSelect = createSelect();
  choiceSelect.parent(choiceRow);
  choiceSelect.option('Choose a query', '');
  for (const q of QUERIES) choiceSelect.option('Query ' + q.id, q.id);
  choiceSelect.selected('');
  choiceSelect.style('font-size', '16px');
  choiceSelect.attribute('aria-label', 'Choose the query for the stated purpose');
  choiceSelect.changed(updateControls);

  submitButton = createButton('Submit Choice');
  submitButton.parent(choiceRow);
  styleButton(submitButton);
  submitButton.mousePressed(submitChoice);

  // Enter in either field checks the values
  for (const inp of [precisionInput, recallInput]) {
    inp.elt.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); checkValues(); }
    });
  }

  resetState();

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Search Query Precision and Recall Explorer', concept: PAGE_CONCEPT(),
                          mount: '#xapi-slot', source: 'the Search Query Precision and Recall Explorer MicroSim',
                          pageDwell: true });
  }
  attemptStart = Date.now();

  describe('Search Query Precision and Recall Explorer. A synthetic corpus of 20 papers, P1 to P20, ' +
    'is drawn as a grid. The papers returned by the current query have solid borders and the others ' +
    'dashed borders. After the relevant set is revealed, relevant papers carry a star. The learner ' +
    'marks the relevant returned papers with checkboxes, then types precision and recall to two ' +
    'decimal places for queries A, B, and C, with two attempts each. Finally the learner chooses the ' +
    'query for a literature survey that cannot miss any relevant paper, and the sim shows the worked ' +
    'counts, the reason, and the score.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function makeRow() {
  const r = createDiv('');
  r.parent(ctrlBox);
  r.style('display', 'flex');
  r.style('flex-wrap', 'wrap');
  r.style('align-items', 'center');
  r.style('gap', '6px 12px');
  return r;
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

function styleInput(inp, label) {
  inp.style('font-size', '16px');
  inp.style('width', '70px');
  inp.attribute('aria-label', label);
  inp.attribute('inputmode', 'decimal');
  inp.attribute('placeholder', '0.00');
  inp.attribute('autocomplete', 'off');
}

function resetState() {
  revealed = false;
  qIndex = 0;
  phase = 'queries';
  qState = QUERIES.map(() => ({
    attempts: 0, pOk: false, rOk: false, pVal: null, rVal: null, resolved: false, solved: false
  }));
  marks = QUERIES.map(() => []);
  message = 'Press Reveal Relevant Set to see which papers in the corpus are relevant.';
  feedbackLines = [];
  choice = null;
  precisionInput.value('');
  recallInput.value('');
  choiceSelect.selected('');
  updateControls();
  redraw();
}

// ---------------------------------------------------------------
// Actions
// ---------------------------------------------------------------
function revealRelevant() {
  revealed = true;
  attemptStart = Date.now();
  message = 'Mark the returned papers that are relevant, then enter precision and recall to two decimal places.';
  updateControls();
  redraw();
}

function toggleMark(p, on) {
  if (phase !== 'queries' || qState[qIndex].resolved) return;
  const m = marks[qIndex];
  const i = m.indexOf(p);
  if (on && i < 0) m.push(p);
  if (!on && i >= 0) m.splice(i, 1);
  redraw();
}

function checkValues() {
  if (phase !== 'queries' || !revealed) return;
  const st = qState[qIndex];
  if (st.resolved) return;
  const q = QUERIES[qIndex];
  const ref = referenceValues(q);
  const p = st.pOk ? st.pVal : parseValue(precisionInput.value());
  const r = st.rOk ? st.rVal : parseValue(recallInput.value());
  if (p === null || r === null) {
    // not an attempt: the entry cannot be read as a value
    message = 'Enter both values as decimals between 0 and 1, for example 0.25. This did not use an attempt.';
    redraw();
    return;
  }
  st.attempts++;
  st.pVal = p;
  st.rVal = r;
  if (!st.pOk && isClose(p, ref.precision)) st.pOk = true;
  if (!st.rOk && isClose(r, ref.recall)) st.rOk = true;
  if (lrs) {
    lrs.question('q-query-' + q.id.toLowerCase(), { name: 'Precision and recall of Query ' + q.id, concept: PAGE_CONCEPT() })
      .answer({ success: isClose(p, ref.precision) && isClose(r, ref.recall),
                response: 'precision=' + fmt2(p) + ',recall=' + fmt2(r),
                durationMs: Date.now() - attemptStart, extensions: { 'attempt-number': st.attempts } });
    attemptStart = Date.now();
  }

  if (st.pOk && st.rOk) {
    st.resolved = true;
    st.solved = true;
    feedbackLines = [
      { text: '✓ Correct.', style: 'good' },
      { text: workedCounts(q), style: 'plain' }
    ];
    message = '';
  } else if (st.attempts < ATTEMPTS_PER_QUERY) {
    feedbackLines = [
      { text: '✗ Not yet. ' + wrongList(st) + ' (attempt 1 of 2)', style: 'bad' },
      { text: HINT, style: 'plain' }
    ];
    message = '';
  } else {
    st.resolved = true;
    feedbackLines = [
      { text: '✗ Not correct after two attempts (' + wrongNames(st) + '). Worked counts:', style: 'bad' },
      { text: workedCounts(q), style: 'plain' }
    ];
    message = '';
  }
  updateControls();
  redraw();
}

function wrongNames(st) {
  const wrong = [];
  if (!st.pOk) wrong.push('precision');
  if (!st.rOk) wrong.push('recall');
  return wrong.join(' and ');
}

function wrongList(st) {
  const wrong = [];
  if (!st.pOk) wrong.push('precision');
  if (!st.rOk) wrong.push('recall');
  const ok = [];
  if (st.pOk) ok.push('precision');
  if (st.rOk) ok.push('recall');
  let s = 'Check your ' + wrong.join(' and ') + '.';
  if (ok.length) s += ' Your ' + ok[0] + ' is correct.';
  return s;
}

function nextPressed() {
  if (phase !== 'queries' || !qState[qIndex].resolved) return;
  if (qIndex < QUERIES.length - 1) {
    qIndex++;
    attemptStart = Date.now();
    feedbackLines = [];
    message = 'Mark the returned papers that are relevant, then enter precision and recall to two decimal places.';
    precisionInput.value('');
    recallInput.value('');
  } else {
    phase = 'choice';
    attemptStart = Date.now();
    feedbackLines = [];
    message = 'Choose one query and press Submit Choice. You have one attempt.';
  }
  updateControls();
  redraw();
}

function submitChoice() {
  if (phase !== 'choice') return;
  const v = choiceSelect.value();
  if (!v) return;
  choice = v;
  if (lrs) lrs.question('q-purpose', { name: 'Query choice for a survey that cannot miss papers', concept: PAGE_CONCEPT() })
    .answer({ success: v === PURPOSE_ANSWER, response: 'query-' + v.toLowerCase(),
              durationMs: Date.now() - attemptStart });
  phase = 'done';
  message = '';
  updateControls();
  redraw();
}

function valuesCorrect() {
  let n = 0;
  for (const st of qState) {
    if (st.pOk) n++;
    if (st.rOk) n++;
  }
  return n;
}

// ---------------------------------------------------------------
// Controls: show, hide, enable, and relabel to match the state
// ---------------------------------------------------------------
function setEnabled(el, on) {
  if (on) el.removeAttribute('disabled');
  else el.attribute('disabled', '');
}

function setRowVisible(row, on) {
  row.style('display', on ? 'flex' : 'none');
}

function updateControls() {
  const inQueries = phase === 'queries';
  setRowVisible(markRow, inQueries);
  setRowVisible(valueRow, inQueries);
  setRowVisible(choiceRow, !inQueries);

  if (inQueries) {
    const st = qState[qIndex];
    const q = QUERIES[qIndex];
    if (!revealed) {
      markLabel.html('Step 1:');
      revealButton.show();
    } else {
      markLabel.html('Mark the relevant papers returned by query ' + q.id + ':');
      revealButton.hide();
    }
    for (let p = 1; p <= CORPUS_SIZE; p++) {
      const cb = paperBoxes[p - 1];
      const shown = revealed && q.returned.indexOf(p) >= 0;
      cb.style('display', shown ? 'inline-block' : 'none');
      const box = cb.elt.querySelector('input');
      box.checked = marks[qIndex].indexOf(p) >= 0;
      box.disabled = st.resolved;
    }
    const canEnter = revealed && !st.resolved;
    precisionInput.elt.disabled = !canEnter || st.pOk;
    recallInput.elt.disabled = !canEnter || st.rOk;
    if (st.pOk) precisionInput.value(fmt2(st.pVal));
    if (st.rOk) recallInput.value(fmt2(st.rVal));
    precisionMark.html(markText(st, st.pOk));
    recallMark.html(markText(st, st.rOk));
    setEnabled(checkButton, canEnter);
    nextButton.html(qIndex < QUERIES.length - 1 ? 'Next Query' : 'Go to Purpose Question');
    // the Next button takes the place of the Check button once the query is scored
    if (st.resolved) { nextButton.show(); checkButton.hide(); }
    else { nextButton.hide(); checkButton.show(); }
  } else {
    const done = phase === 'done';
    choiceSelect.elt.disabled = done;
    setEnabled(submitButton, !done && choiceSelect.value() !== '');
  }
  layoutControls();
}

function markText(st, ok) {
  if (st.attempts === 0) return '';
  return ok ? '✓' : '✗';
}

function layoutControls() {
  ctrlBox.position(0, drawHeight);
  ctrlBox.style('width', canvasWidth + 'px');
  ctrlBox.style('height', controlHeight + 'px');
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

  const innerW = canvasWidth - 2 * pad;

  // title
  fill('black');
  noStroke();
  textStyle(BOLD);
  textSize(canvasWidth < 560 ? 20 : 24);
  const titleLines = wrapText('Search Query Precision and Recall Explorer', innerW);
  textAlign(CENTER, TOP);
  let y = 8;
  for (const ln of titleLines) {
    text(ln, canvasWidth / 2, y);
    y += canvasWidth < 560 ? 24 : 28;
  }
  textStyle(NORMAL);
  y += 2;

  // corpus label (required by the specification)
  textSize(16);
  fill('dimgray');
  y = drawLines(wrapText('Corpus: 20 papers, P1 to P20 (' + CORPUS_LABEL + ')', innerW), pad, y, 20) + 2;

  // the question on screen
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  if (phase === 'queries') drawQuery(y);
  else drawChoice(y);
}

function drawQuery(y) {
  const innerW = canvasWidth - 2 * pad;
  const q = QUERIES[qIndex];
  const st = qState[qIndex];
  const c = countsFor(q);

  // query panel
  textSize(16);
  textStyle(BOLD);
  const head = wrapText('Query ' + q.id + ' (' + (qIndex + 1) + ' of 3): ' + q.description, innerW - 20);
  textStyle(NORMAL);
  const info1 = 'Papers returned: ' + c.returned + ' of 20. Relevant papers in the corpus: ' +
    (revealed ? RELEVANT.length + ', marked ★.' : 'hidden until you press Reveal Relevant Set.');
  const info1Lines = wrapText(info1, innerW - 20);
  const info2 = (revealed ? 'Marked relevant: ' + marks[qIndex].length + ' of ' + c.returned + '.  ' : '') +
    'Values correct so far: ' + valuesCorrect() + ' of 6.';
  const info2Lines = wrapText(info2, innerW - 20);
  const boxH = (head.length + info1Lines.length + info2Lines.length) * 20 + 14;
  fill('white');
  stroke('navy');
  strokeWeight(1.5);
  rect(pad, y, innerW, boxH, 8);
  strokeWeight(1);
  fill('black');
  textStyle(BOLD);
  let yy = drawLines(head, pad + 10, y + 7, 20);
  textStyle(NORMAL);
  yy = drawLines(info1Lines, pad + 10, yy, 20);
  fill('dimgray');
  drawLines(info2Lines, pad + 10, yy, 20);
  y += boxH + 8;

  // corpus grid
  y = drawGrid(q, st, y) + 6;

  // legend (shapes and glyphs carry the meaning, not color alone)
  textSize(14);
  fill('black');
  let legend = 'Solid box: returned. Dashed box: not returned.';
  if (revealed) legend += ' ★ relevant. ✓ your mark.';
  if (st.resolved) legend += ' TP true positive, FP false positive, FN false negative.';
  y = drawLines(wrapText(legend, innerW), pad, y, 18) + 6;

  // feedback
  textSize(16);
  for (const f of feedbackLines) {
    if (f.style === 'good') { fill('navy'); textStyle(BOLD); }
    else if (f.style === 'bad') { fill('saddlebrown'); textStyle(BOLD); }
    else { fill('black'); textStyle(NORMAL); }
    y = drawLines(wrapText(f.text, innerW), pad, y, 20) + 2;
  }
  textStyle(NORMAL);
  if (message) {
    fill('dimgray');
    y = drawLines(wrapText(message, innerW), pad, y, 20);
  }
  layoutBottom = y;
}

function drawGrid(q, st, y) {
  const innerW = canvasWidth - 2 * pad;
  // 5 wide tiles per row on wide screens, 7 narrow tiles per row on phones
  const cols = innerW >= 560 ? 5 : (innerW >= 320 ? 7 : 5);
  const gap = 6;
  const tileW = (innerW - (cols - 1) * gap) / cols;
  const tileH = innerW >= 560 ? 56 : 44;
  const rows = Math.ceil(CORPUS_SIZE / cols);
  for (let p = 1; p <= CORPUS_SIZE; p++) {
    const col = (p - 1) % cols;
    const row = Math.floor((p - 1) / cols);
    const x = pad + col * (tileW + gap);
    const ty = y + row * (tileH + gap);
    const ret = q.returned.indexOf(p) >= 0;

    if (ret) {
      fill('lightblue');
      stroke('navy');
      strokeWeight(3);
    } else {
      fill('white');
      stroke('gray');
      strokeWeight(1.5);
      drawingContext.setLineDash([5, 4]);
    }
    rect(x, ty, tileW, tileH, 6);
    drawingContext.setLineDash([]);
    strokeWeight(1);

    // paper label
    noStroke();
    fill('black');
    textStyle(BOLD);
    textSize(16);
    textAlign(CENTER, TOP);
    text('P' + p, x + tileW / 2, ty + 5);
    textStyle(NORMAL);

    // second line: learner mark (✓) or, once scored, the category; then the relevant star
    const parts = [];
    const cat = st.resolved ? categoryOf(q, p) : '';
    if (cat) parts.push({ s: cat, c: cat === 'TP' ? 'navy' : 'saddlebrown', bold: true });
    else if (marks[qIndex].indexOf(p) >= 0) parts.push({ s: '✓', c: 'navy', bold: true });
    if (revealed && isRelevant(p)) parts.push({ s: '★', c: 'chocolate', bold: false });
    textSize(15);
    let total = 0;
    for (const pt of parts) {
      textStyle(pt.bold ? BOLD : NORMAL);
      pt.w = textWidth(pt.s);
      total += pt.w;
    }
    total += Math.max(0, parts.length - 1) * 3;
    let gx = x + tileW / 2 - total / 2;
    textAlign(LEFT, TOP);
    for (const pt of parts) {
      textStyle(pt.bold ? BOLD : NORMAL);
      fill(pt.c);
      noStroke();
      text(pt.s, gx, ty + tileH - 21);
      gx += pt.w + 3;
    }
    textStyle(NORMAL);
  }
  return y + rows * tileH + (rows - 1) * gap;
}

function drawChoice(y) {
  const innerW = canvasWidth - 2 * pad;
  textSize(16);

  // purpose question panel
  textStyle(BOLD);
  const pq = wrapText('Purpose question: ' + PURPOSE_QUESTION, innerW - 20);
  textStyle(NORMAL);
  const boxH = pq.length * 20 + 14;
  fill('white');
  stroke('navy');
  strokeWeight(1.5);
  rect(pad, y, innerW, boxH, 8);
  strokeWeight(1);
  fill('black');
  textStyle(BOLD);
  drawLines(pq, pad + 10, y + 7, 20);
  textStyle(NORMAL);
  y += boxH + 10;

  if (phase === 'choice') {
    // the learner's values for each query
    textStyle(BOLD);
    fill('black');
    y = drawLines(['Your values'], pad, y, 20) + 2;
    textStyle(NORMAL);
    for (let i = 0; i < QUERIES.length; i++) {
      const q = QUERIES[i];
      const st = qState[i];
      const line = 'Query ' + q.id + ' (' + q.description + '): precision ' + valueText(st.pVal, st.pOk) +
        ', recall ' + valueText(st.rVal, st.rOk);
      y = drawLines(wrapText(line, innerW), pad, y, 20) + 4;
    }
    fill('dimgray');
    y = drawLines(wrapText('Values correct: ' + valuesCorrect() + ' of 6. ' + message, innerW), pad, y, 20);
    layoutBottom = y;
    return;
  }

  // phase 'done': result of the choice, worked values, reason, score
  const correct = choice === PURPOSE_ANSWER;
  textStyle(BOLD);
  fill(correct ? 'navy' : 'saddlebrown');
  const res = correct
    ? '✓ Correct. Query B.'
    : '✗ Not correct. You chose Query ' + choice + '. The answer is Query B, because it has recall 1.00.';
  y = drawLines(wrapText(res, innerW), pad, y, 20) + 2;
  textStyle(NORMAL);
  fill('black');
  y = drawLines(wrapText('Why: ' + PURPOSE_REASON, innerW), pad, y, 20) + 8;

  textStyle(BOLD);
  y = drawLines(['Worked values'], pad, y, 20) + 2;
  textStyle(NORMAL);
  for (const q of QUERIES) {
    const c = countsFor(q);
    const r = referenceValues(q);
    const line = 'Query ' + q.id + ': ' + c.returned + ' returned, TP ' + c.tp + ', FP ' + c.fp + ', FN ' +
      c.fn + ', precision ' + fmt2(r.precision) + ', recall ' + fmt2(r.recall);
    y = drawLines(wrapText(line, innerW), pad, y, 20) + 2;
  }
  y += 8;

  const n = valuesCorrect();
  textSize(20);
  textStyle(BOLD);
  fill('black');
  y = drawLines(wrapText('Score: ' + n + ' of 6 values correct; choice ' +
    (correct ? 'correct' : 'incorrect') + '.', innerW), pad, y, 26);
  textSize(16);
  const mastered = n >= MASTERY_VALUES && correct;
  fill(mastered ? 'navy' : 'saddlebrown');
  const ms = mastered
    ? '✓ Mastery reached: at least 5 of 6 values correct and the choice correct.'
    : 'Not yet at mastery: mastery needs at least 5 of 6 values correct and the choice correct.';
  y = drawLines(wrapText(ms, innerW), pad, y, 20);
  textStyle(NORMAL);
  layoutBottom = y;
}

function valueText(v, ok) {
  if (v === null) return '(none) ✗';
  return fmt2(v) + (ok ? ' ✓' : ' ✗');
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
