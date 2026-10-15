// Embedding Vector Search Explorer MicroSim
// CANVAS_HEIGHT: 915
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// Six stored passages and three queries are drawn as arrows in an illustrative
// two-dimensional embedding space. For each query the learner predicts the two
// passages vector search returns (top-k with k = 2), in order, and whether the
// second result clears a cosine-similarity threshold of 0.90. After Q3 an
// exploration mode lets the learner drag the query vector and watch the ranking.
// The design is width responsive: plot beside the table when wide, above it when narrow.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 800;
// Control region: up to three rows of controls = (3 x 35) + 10 = 115
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification; illustrative vectors)
// ---------------------------------------------------------------
const PASSAGES = [
  { id: 'D1', title: 'SAR ADC offset calibration', v: [0.95, 0.20] },
  { id: 'D2', title: 'Delta-sigma noise shaping', v: [0.85, 0.35] },
  { id: 'D3', title: 'Transformer accelerator dataflow', v: [0.15, 0.95] },
  { id: 'D4', title: 'Edge-inference quantization', v: [0.30, 0.90] },
  { id: 'D5', title: 'LDO stability compensation', v: [0.70, -0.45] },
  { id: 'D6', title: 'Analog and digital mixed-signal learning', v: [0.60, 0.60] }
];

// top2 holds passage indexes in order; clears says whether the second result is >= 0.90
const QUERIES = [
  { label: 'Q1', text: 'comparator offset in successive approximation converters', v: [0.90, 0.25],
    top2: [0, 1], clears: true,
    why: 'Both retrieved passages point in almost the same direction as the query.' },
  { label: 'Q2', text: 'reducing memory traffic in neural network hardware', v: [0.20, 0.90],
    top2: [2, 3], clears: true,
    why: 'Both neural-hardware passages point nearly along the query.' },
  { label: 'Q3', text: 'keeping a regulator stable under load', v: [0.75, -0.40],
    top2: [4, 0], clears: false,
    why: 'Only D5 is a close match. D1 is returned because top 2 always returns two results, and 0.766 is below the threshold.' }
];

const QUESTION = 'Which two passages will vector search return?';
// Drawing aid only: which side of its arrow each passage label sits on
// (+1 counter-clockwise, -1 clockwise, 0 straight beyond the tip)
const LABEL_SIDE = [-1, 1, 1, -1, 0, 0];
const THRESHOLD = 0.90;  // a result clears the threshold when cos >= 0.90
const K = 2;             // top-k with k = 2
const RANGE = 1.2;       // plot shows -1.2 .. 1.2 on both axes
const NONE = 'none';     // value of the placeholder option in each select

// ---------------------------------------------------------------
// Pure computations
// ---------------------------------------------------------------
// Cosine similarity = (a . b) / (|a| |b|)
function cosineSim(a, b) {
  const dot = a[0] * b[0] + a[1] * b[1];
  return dot / (Math.hypot(a[0], a[1]) * Math.hypot(b[0], b[1]));
}

// Round to 0.001, as the specification reports similarities
function round3(x) {
  return Math.round(x * 1000) / 1000;
}

// Rank all passages for a query vector: descending rounded cosine, ties to the
// lower passage number. Returns [{index, cos, rank, clears}] in rank order.
function rankPassages(q) {
  const rows = PASSAGES.map((p, i) => {
    const c = round3(cosineSim(q, p.v));
    return { index: i, cos: c, clears: c >= THRESHOLD };
  });
  rows.sort((a, b) => (b.cos - a.cos) || (a.index - b.index));
  rows.forEach((r, k) => { r.rank = k + 1; });
  return rows;
}

function fmt3(x) {
  return x.toFixed(3);
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let qPos = 0;             // current query (0..2), fixed order
let committed = false;
let answer = null;        // {first, second, clears}
let score = 0;
let exploring = false;    // exploration opens after Q3
let exploreQ = [0.75, -0.40];
let dragging = false;
let plot = { x: 0, y: 0, s: 300 };  // plot square: left, top, size
let layoutBottom = 0;     // lowest y used by drawn content (used for layout testing)

// controls
let firstSelect;
let secondSelect;
let markSelect;
let submitButton;
let nextButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  firstSelect = createSelect();
  firstSelect.parent(document.querySelector('main'));
  firstSelect.option('First result', NONE);
  for (let i = 0; i < PASSAGES.length; i++) firstSelect.option('First: ' + PASSAGES[i].id, String(i));
  styleControl(firstSelect);
  firstSelect.attribute('aria-label', 'First retrieved passage');
  firstSelect.changed(selectionChanged);

  secondSelect = createSelect();
  secondSelect.parent(document.querySelector('main'));
  secondSelect.option('Second result', NONE);
  for (let i = 0; i < PASSAGES.length; i++) secondSelect.option('Second: ' + PASSAGES[i].id, String(i));
  styleControl(secondSelect);
  secondSelect.attribute('aria-label', 'Second retrieved passage');
  secondSelect.changed(selectionChanged);

  markSelect = createSelect();
  markSelect.parent(document.querySelector('main'));
  markSelect.option('Threshold mark', NONE);
  markSelect.option('clears threshold', 'clears');
  markSelect.option('below threshold', 'below');
  styleControl(markSelect);
  markSelect.attribute('aria-label', 'Threshold mark for the second result');
  markSelect.changed(selectionChanged);

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleControl(submitButton);
  submitButton.mousePressed(submitAnswer);

  nextButton = createButton('Next Query');
  nextButton.parent(document.querySelector('main'));
  styleControl(nextButton);
  nextButton.mousePressed(nextPressed);

  resetSelects();
  updateControls();

  describe('Embedding Vector Search Explorer. A two-dimensional plot shows six stored passages, D1 to ' +
    'D6, as blue arrows from the origin and the current query as an orange arrow. The vectors are ' +
    'illustrative, not output of a real embedding model. For each of three queries choose the first ' +
    'and second passage you expect vector search to return and whether the second clears a cosine ' +
    'similarity threshold of 0.90, then press Submit. A table then shows the cosine similarity and ' +
    'rank of every passage. After the third query, drag the query arrow, or use the arrow keys, ' +
    'to watch the ranking update.');

  noLoop(); // redraw only when the state changes
}

function styleControl(c) {
  c.style('font-size', '16px');
  c.style('padding', '4px 8px');
  c.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Quiz logic
// ---------------------------------------------------------------
function resetSelects() {
  firstSelect.selected(NONE);
  secondSelect.selected(NONE);
  markSelect.selected(NONE);
}

function selectionChanged() {
  updateControls();
  redraw();
}

function allChosen() {
  return firstSelect.value() !== NONE && secondSelect.value() !== NONE && markSelect.value() !== NONE;
}

function sameTwice() {
  return firstSelect.value() !== NONE && firstSelect.value() === secondSelect.value();
}

function isCorrect(q, a) {
  return a.first === q.top2[0] && a.second === q.top2[1] && a.clears === q.clears;
}

// One attempt per query
function submitAnswer() {
  if (exploring || committed || !allChosen() || sameTwice()) return;
  answer = {
    first: parseInt(firstSelect.value()),
    second: parseInt(secondSelect.value()),
    clears: markSelect.value() === 'clears'
  };
  committed = true;
  if (isCorrect(QUERIES[qPos], answer)) score++;
  updateControls();
  redraw();
}

function nextPressed() {
  if (exploring || !committed) return;
  if (qPos < QUERIES.length - 1) {
    qPos++;
    committed = false;
    answer = null;
    resetSelects();
  } else {
    exploring = true;              // exploration opens after Q3
    exploreQ = QUERIES[qPos].v.slice();
  }
  updateControls();
  redraw();
}

function updateControls() {
  const quizControls = [firstSelect, secondSelect, markSelect, submitButton, nextButton];
  if (exploring) {
    for (const c of quizControls) c.hide();
  } else {
    for (const c of quizControls) c.show();
    setEnabled(firstSelect, !committed);
    setEnabled(secondSelect, !committed);
    setEnabled(markSelect, !committed);
    setEnabled(submitButton, !committed && allChosen() && !sameTwice());
    nextButton.html(qPos === QUERIES.length - 1 ? 'Open Exploration' : 'Next Query');
    setEnabled(nextButton, committed);
  }
  layoutControls();
}

function setEnabled(c, on) {
  if (on) c.removeAttribute('disabled');
  else c.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a new row when needed
function layoutControls() {
  if (exploring) return;
  const visible = [firstSelect, secondSelect, markSelect, submitButton, nextButton];
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
// Exploration input: drag inside the plot, or arrow keys
// ---------------------------------------------------------------
function insidePlot(mx, my) {
  return mx >= plot.x && mx <= plot.x + plot.s && my >= plot.y && my <= plot.y + plot.s;
}

function setQueryFromMouse() {
  const half = plot.s / 2;
  const sc = (half - 6) / RANGE;
  let qx = (mouseX - (plot.x + half)) / sc;
  let qy = ((plot.y + half) - mouseY) / sc;
  qx = constrain(qx, -RANGE, RANGE);
  qy = constrain(qy, -RANGE, RANGE);
  if (Math.hypot(qx, qy) < 0.05) return; // a zero-length query has no direction
  exploreQ = [round2(qx), round2(qy)];
  redraw();
}

function round2(x) {
  return Math.round(x * 100) / 100;
}

function mousePressed() {
  if (!exploring || !insidePlot(mouseX, mouseY)) return;
  dragging = true;
  setQueryFromMouse();
  return false;
}

function mouseDragged() {
  if (!dragging) return;
  setQueryFromMouse();
  return false;
}

function mouseReleased() {
  dragging = false;
}

function keyPressed() {
  if (!exploring) return;
  const step = 0.05;
  let dx = 0, dy = 0;
  if (keyCode === LEFT_ARROW) dx = -step;
  else if (keyCode === RIGHT_ARROW) dx = step;
  else if (keyCode === UP_ARROW) dy = step;
  else if (keyCode === DOWN_ARROW) dy = -step;
  else return;
  const nx = round2(constrain(exploreQ[0] + dx, -RANGE, RANGE));
  const ny = round2(constrain(exploreQ[1] + dy, -RANGE, RANGE));
  if (Math.hypot(nx, ny) >= 0.05) exploreQ = [nx, ny];
  redraw();
  return false;
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
  fitTextSize('Embedding Vector Search Explorer', canvasWidth - 2 * pad, 24, 18);
  text('Embedding Vector Search Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);

  drawMain(44);

  if (exploring) {
    fill('black');
    noStroke();
    textSize(16);
    drawLines(wrapText('Exploration: drag inside the plot, or use the arrow keys, to move the ' +
      'orange query vector. Moving it is exploration and is not scored.', canvasWidth - 20),
      10, drawHeight + 10, 20);
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
function drawLines(lines, x, y, lineH) {
  textAlign(LEFT, TOP);
  for (const ln of lines) {
    noStroke();
    text(ln, x, y);
    y += lineH;
  }
  return y;
}

function currentQueryVector() {
  return exploring ? exploreQ : QUERIES[qPos].v;
}

// Is the ranking visible? Not before the learner commits (starting state has no ranking).
function rankingVisible() {
  return exploring || committed;
}

function drawMain(y) {
  const innerW = canvasWidth - 2 * pad;
  textSize(16);

  // illustrative label and status
  fill('dimgray');
  y = drawLines(wrapText('Illustrative, not output of a real embedding model. Real embeddings have ' +
    'hundreds to thousands of dimensions and no named axes.', innerW), pad, y, 20) + 2;
  fill('black');
  let status;
  if (exploring) status = 'Quiz complete: ' + score + ' of 3 correct (mastery is 3 of 3)  |  Exploration';
  else status = 'Query ' + (qPos + 1) + ' of 3  |  Correct so far: ' + score;
  textStyle(BOLD);
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 2;
  textStyle(NORMAL);

  // question and query text
  const q = currentQueryVector();
  if (!exploring) {
    fill('navy');
    textStyle(ITALIC);
    y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 2;
    textStyle(NORMAL);
    fill('black');
    textStyle(BOLD);
    const qq = QUERIES[qPos];
    y = drawLines(wrapText(qq.label + ': ' + qq.text + '   q = (' + qq.v[0].toFixed(2) + ', ' +
      qq.v[1].toFixed(2) + ')', innerW), pad, y, 20) + 6;
    textStyle(NORMAL);
  } else {
    fill('black');
    textStyle(BOLD);
    y = drawLines(wrapText('Your query vector q = (' + q[0].toFixed(2) + ', ' + q[1].toFixed(2) + ')',
      innerW), pad, y, 20) + 6;
    textStyle(NORMAL);
  }

  const ranking = rankPassages(q);
  const wide = canvasWidth >= 860;
  if (wide) {
    // plot on the left, table and feedback on the right
    const s = Math.min(drawHeight - y - pad, Math.floor(innerW * 0.5));
    plot = { x: pad, y: y, s: s };
    drawPlot(q, ranking);
    const px = pad + s + 16;
    const pw = canvasWidth - px - pad;
    let yy = drawTable(ranking, px, y, pw) + 10;
    yy = drawFeedback(ranking, px, yy, pw);
    layoutBottom = Math.max(y + s, yy);
  } else {
    // plot above the table; the plot takes the room left after the tallest
    // table-plus-feedback combination, so the layout does not jump between states
    const reserve = Math.max(
      tableHeight(innerW, false) + 10 + preFeedbackHeight(innerW),
      tableHeight(innerW, true) + 10 + worstFeedbackHeight(innerW));
    const s = Math.max(200, Math.min(innerW, 420, drawHeight - y - reserve - 10 - pad));
    plot = { x: pad + (innerW - s) / 2, y: y, s: s };
    drawPlot(q, ranking);
    let yy = drawTable(ranking, pad, y + s + 10, innerW) + 10;
    yy = drawFeedback(ranking, pad, yy, innerW);
    layoutBottom = yy;
  }
}

// Map a data-space vector to canvas coordinates
function toCanvas(v) {
  const half = plot.s / 2;
  const sc = (half - 6) / RANGE;
  return [plot.x + half + v[0] * sc, plot.y + half - v[1] * sc];
}

function drawPlot(q, ranking) {
  const half = plot.s / 2;
  const sc = (half - 6) / RANGE;
  const ox = plot.x + half, oy = plot.y + half;

  // plot frame
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(plot.x, plot.y, plot.s, plot.s);

  // unit circle and axes
  noFill();
  stroke('gainsboro');
  circle(ox, oy, 2 * sc);
  stroke('darkgray');
  line(plot.x, oy, plot.x + plot.s, oy);
  line(ox, plot.y, ox, plot.y + plot.s);
  // ticks at +/- 1
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(CENTER, TOP);
  text('1', ox + sc, oy + 3);
  text('-1', ox - sc, oy + 3);
  textAlign(LEFT, CENTER);
  text('1', ox + 4, oy - sc);
  text('-1', ox + 4, oy + sc);

  // axis names (illustrative)
  textSize(16);
  fill('dimgray');
  textAlign(LEFT, BOTTOM);
  text('analog–digital axis →', plot.x + 6, plot.y + plot.s - 4);
  textAlign(RIGHT, TOP);
  text('↑ learning axis', ox - 6, plot.y + 4);

  // threshold cone around the query (only once the ranking is visible)
  const qAng = Math.atan2(q[1], q[0]);
  if (rankingVisible()) {
    const halfAngle = Math.acos(THRESHOLD);
    const r = sc * RANGE;
    const cone = color('orange');
    cone.setAlpha(45);
    fill(cone);
    noStroke();
    // canvas y is flipped, so negate the angles
    arc(ox, oy, 2 * r, 2 * r, -(qAng + halfAngle), -(qAng - halfAngle), PIE);
    fill('saddlebrown');
    textSize(14);
    const la = qAng - halfAngle * 0.55;
    const lp = [ox + Math.cos(la) * r * 0.93, oy - Math.sin(la) * r * 0.93];
    textAlign(CENTER, CENTER);
    text('cos ≥ 0.90', lp[0], lp[1]);
  }

  // passage arrows
  const rankOf = {};
  for (const r of ranking) rankOf[r.index] = r.rank;
  for (let i = 0; i < PASSAGES.length; i++) {
    const p = PASSAGES[i];
    const returned = rankingVisible() && rankOf[i] <= K;
    const tip = toCanvas(p.v);
    drawArrow(ox, oy, tip[0], tip[1], returned ? 'navy' : 'steelblue', returned ? 4 : 2);
    // label beyond the tip, pushed sideways for passages whose arrows are close together
    const ang = Math.atan2(p.v[1], p.v[0]) + LABEL_SIDE[i] * 0.45;
    const lx = tip[0] + Math.cos(ang) * 18;
    const ly = tip[1] - Math.sin(ang) * 18;
    noStroke();
    fill(returned ? 'navy' : 'steelblue');
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(p.id + (returned ? ' #' + rankOf[i] : ''), lx, ly);
    textStyle(NORMAL);
  }

  // query arrow (dashed, orange) drawn on top
  const qt = toCanvas(q);
  drawArrow(ox, oy, qt[0], qt[1], 'darkorange', 3, true);
  // query label: beside the shaft, on the clockwise side
  const mx = ox + (qt[0] - ox) * 0.6, my = oy + (qt[1] - oy) * 0.6;
  const nx = Math.sin(qAng), ny = Math.cos(qAng); // unit normal in canvas coordinates
  noStroke();
  fill('saddlebrown');
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(exploring ? 'query' : QUERIES[qPos].label, mx + nx * 16, my + ny * 16);
  textStyle(NORMAL);
}

function drawArrow(x1, y1, x2, y2, col, w, dashed) {
  stroke(col);
  strokeWeight(w);
  if (dashed) drawingContext.setLineDash([8, 5]);
  line(x1, y1, x2, y2);
  drawingContext.setLineDash([]);
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hl = 10 + w;
  fill(col);
  noStroke();
  triangle(x2, y2,
    x2 - hl * Math.cos(ang - 0.4), y2 - hl * Math.sin(ang - 0.4),
    x2 - hl * Math.cos(ang + 0.4), y2 - hl * Math.sin(ang + 0.4));
  strokeWeight(1);
}


// Table layout for a panel width. Before the commit the table lists ID and title.
// After the commit it adds rank, cosine and threshold columns; the title column is
// kept only when every title fits on one line, otherwise it is dropped (narrow screens).
function tableLayout(w, visible) {
  textSize(16);
  if (!visible) {
    const idW = 44, cosW = 44;
    const titleW = w - idW - cosW;
    const rowH = PASSAGES.map(p => wrapText(p.title, titleW - 8).length * 19 + 8);
    return { visible, idW, cosW, markW: 0, titleW, showTitle: true, rowH };
  }
  const idW = 72, cosW = 66, markW = 92;
  const titleW = w - idW - cosW - markW;
  const showTitle = PASSAGES.every(p => textWidth(p.title) <= titleW - 16);
  const rowH = PASSAGES.map(() => 27);
  return { visible, idW, cosW, markW, titleW: showTitle ? titleW : 0, showTitle, rowH };
}

function tableHeight(w, visible) {
  return 24 + tableLayout(w, visible).rowH.reduce((a, b) => a + b, 0);
}

// Table of passages. Before the commit: D1..D6 with no values (no ranking).
// After the commit, and in exploration: rows in rank order with cosine values.
function drawTable(ranking, x, y, w) {
  const visible = rankingVisible();
  const L = tableLayout(w, visible);
  const rows = visible ? ranking : PASSAGES.map((p, i) => ({ index: i }));
  const xTitle = x + L.idW;
  const xCos = x + L.idW + L.titleW;
  const xMark = xCos + L.cosW;
  const width = visible && !L.showTitle ? L.idW + L.cosW + L.markW : w;

  // header
  textSize(16);
  textStyle(BOLD);
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  text(visible ? 'Rank' : 'ID', x + 4, y + 2);
  if (L.showTitle) text('Passage title', xTitle + 4, y + 2);
  text('cos', xCos + 4, y + 2);
  if (visible) text('≥ 0.90?', xMark + 4, y + 2);
  textStyle(NORMAL);
  y += 24;

  for (const r of rows) {
    const p = PASSAGES[r.index];
    const h = L.rowH[r.index];
    const returned = visible && r.rank <= K;
    if (returned) { fill('lightcyan'); stroke('steelblue'); strokeWeight(2); }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(x, y, width, h);
    strokeWeight(1);
    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textStyle(returned ? BOLD : NORMAL);
    text(visible ? '#' + r.rank + ' ' + p.id : p.id, x + 4, y + 5);
    textStyle(NORMAL);
    if (L.showTitle) drawLines(wrapText(p.title, L.titleW - 8), xTitle + 4, y + 5, 19);
    noStroke();
    if (visible) {
      fill('black');
      text(fmt3(r.cos), xCos + 4, y + 5);
      fill(r.clears ? 'navy' : 'saddlebrown');
      text(r.clears ? '✓ clears' : '✗ below', xMark + 4, y + 5);
    } else {
      fill('dimgray');
      text('?', xCos + 4, y + 5);
    }
    y += h;
  }
  return y;
}

function correctRankingText(ranking) {
  const r1 = ranking[0], r2 = ranking[1];
  return 'Correct ranking: ' + PASSAGES[r1.index].id + ' (' + fmt3(r1.cos) + ') then ' +
    PASSAGES[r2.index].id + ' (' + fmt3(r2.cos) + '). The second result ' +
    (r2.clears ? 'clears' : 'is below') + ' the 0.90 threshold.';
}

const PRE_TEXT = 'Choose the first and second results, in order, and a threshold mark for the ' +
  'second, then press Submit. One attempt per query.';

function preFeedbackHeight(w) {
  textSize(16);
  return wrapText(PRE_TEXT, w).length * 20 + 4 + 20;  // room for the "two different" note
}

// Height of the longest post-commit feedback block at width w (reserves space when narrow)
function worstFeedbackHeight(w) {
  let worst = 0;
  textSize(16);
  for (const qq of QUERIES) {
    const ranking = rankPassages(qq.v);
    textStyle(BOLD);
    const n = wrapText(correctRankingText(ranking), w).length;
    textStyle(NORMAL);
    const h = 24 + (n + wrapText(qq.why, w).length) * 20;
    worst = Math.max(worst, h);
  }
  return worst;
}

function drawFeedback(ranking, x, y, w) {
  textSize(16);
  if (exploring) {
    const r1 = ranking[0], r2 = ranking[1];
    fill('black');
    textStyle(BOLD);
    y = drawLines(wrapText('Returned (top 2): ' + PASSAGES[r1.index].id + ' (' + fmt3(r1.cos) + ') then ' +
      PASSAGES[r2.index].id + ' (' + fmt3(r2.cos) + ').', w), x, y, 20);
    textStyle(NORMAL);
    fill(r2.clears ? 'navy' : 'saddlebrown');
    y = drawLines(wrapText(r2.clears ? '✓ The second result clears the 0.90 threshold.'
                                     : '✗ The second result is below the 0.90 threshold.', w), x, y, 20) + 4;
    fill('dimgray');
    y = drawLines(wrapText('Try moving the query far from every passage. How many results come back?', w),
      x, y, 20);
    return y;
  }
  const qq = QUERIES[qPos];
  if (!committed) {
    fill('black');
    y = drawLines(wrapText(PRE_TEXT, w), x, y, 20);
    if (sameTwice()) {
      fill('saddlebrown');
      y = drawLines(wrapText('Choose two different passages.', w),
        x, y + 4, 20);
    }
    return y;
  }
  const ok = isCorrect(qq, answer);
  textSize(18);
  textStyle(BOLD);
  if (ok) {
    fill('navy');
    y = drawLines(['✓ Correct: ' + PASSAGES[qq.top2[0]].id + ' then ' + PASSAGES[qq.top2[1]].id + '.'],
      x, y, 24);
    textStyle(NORMAL);
    textSize(16);
  } else {
    fill('saddlebrown');
    y = drawLines(['✗ Not quite.'], x, y, 24);
    textSize(16);
    fill('black');
    y = drawLines(wrapText(correctRankingText(ranking), w), x, y, 20);
    textStyle(NORMAL);
  }
  fill('black');
  y = drawLines(wrapText(qq.why, w), x, y, 20);
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
