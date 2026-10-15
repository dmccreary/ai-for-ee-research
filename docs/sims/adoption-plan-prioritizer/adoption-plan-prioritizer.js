// Adoption Plan Prioritizer MicroSim
// CANVAS_HEIGHT: 850
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner arranges six adoption steps (A to F), shown in a scrambled order, into a sequence
// and submits it. The order is valid when A < C, B < C, C < D, D < E, and E < F. The sim reports
// "Valid order." with the dependency list, or names the first violated dependency with its reason,
// and then shows both valid orders and the dependency graph. Only the first submission counts as
// evidence of mastery; the learner may rearrange and submit again afterward for practice.
// The design is width responsive; controls reflow onto two rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 770;
// Control region: two rows of controls = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let wideWidth = 700;        // at or above this width the steps and the feedback sit side by side

// Color-blind-safe colors (Okabe-Ito blue and vermillion). Meaning is also carried by the
// check and cross symbols, the words "Valid" and "Invalid", and a dashed line in the graph.
const OK_STROKE = '#0072B2';
const OK_FILL = '#E3F0F9';
const BAD_STROKE = '#D55E00';
const BAD_FILL = '#FBE8DC';

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const QUESTION = 'Which steps must come first, and why?';

const STEPS = {
  A: 'Write the lab AI use policy, with the data classes and permitted tools (Chapter 18).',
  B: 'Set up a shared repository with an instruction file and a project knowledge base (Chapters 5 and 6).',
  C: 'Pilot one skill on one repeatable task at autonomy level 1 or 2, such as citation verification (Chapters 7, 9, and 11).',
  D: 'Add verification checks and a reproducibility package to the pilot (Chapters 13 and 17).',
  E: 'Scale to a small agent team on one project, with review gates (Chapter 10).',
  F: 'Review the metrics at 90 days, such as time saved, review load, and errors that escaped, and decide what to expand or stop.'
};
const STEP_IDS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Dependencies in the order listed in the specification, each with its reason
const DEPS = [
  { before: 'A', after: 'C',
    reason: 'A pilot touches real data, so the data classes and permitted tools must be decided first.' },
  { before: 'B', after: 'C',
    reason: 'A pilot needs the instruction file and the repository to be reproducible and reversible.' },
  { before: 'C', after: 'D',
    reason: 'The checks and package are designed on a concrete, working task.' },
  { before: 'D', after: 'E',
    reason: 'A team multiplies output, so the checks must already exist.' },
  { before: 'E', after: 'F',
    reason: 'The review decides on the team\'s results.' }
];

const VALID_ORDERS = [['A', 'B', 'C', 'D', 'E', 'F'], ['B', 'A', 'C', 'D', 'E', 'F']];

// ---------------------------------------------------------------
// Pure logic (no drawing): checking an order against the Rules
// ---------------------------------------------------------------
// Returns the first violated dependency, or null when the order is valid.
// "First" means: reading the sequence from position 1, the first step that comes before one
// of its prerequisites; when a step has two missing prerequisites (C), A is named before B.
function firstViolation(order) {
  for (let p = 0; p < order.length; p++) {
    for (const d of DEPS) {
      if (d.after === order[p] && order.indexOf(d.before) > p) return d;
    }
  }
  return null;
}

function isValidOrder(order) {
  return firstViolation(order) === null;
}

// The feedback headline, verbatim in form from the specification
function resultTitle(order) {
  const v = firstViolation(order);
  return v === null ? 'Valid order.' : 'Invalid: ' + v.after + ' needs ' + v.before + ' first.';
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let order = [];            // the learner's sequence of step ids
let submissions = 0;       // number of submissions so far
let firstResult = null;    // { valid } for the first submission: the only one that counts as evidence
let lastResult = null;     // { order, violation, n } for the most recent submission
let infoPage = 0;          // page of the feedback area (narrow screens: page 0 is the step view)
let infoPageCount = 1;
let layoutBottom = 0;      // lowest y used by drawn content (used for layout testing)

// controls
let stepSelect;
let earlierButton;
let laterButton;
let submitButton;
let nextPageButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  stepSelect = createSelect();
  stepSelect.parent(document.querySelector('main'));
  stepSelect.option('Pick a step', '-1');
  for (const id of STEP_IDS) stepSelect.option('Step ' + id, id);
  stepSelect.selected('-1');
  stepSelect.style('font-size', '16px');
  stepSelect.style('padding', '3px');
  stepSelect.attribute('aria-label', 'Pick a step to move');
  stepSelect.changed(selectionChanged);

  earlierButton = makeButton('Earlier', moveEarlier, 'Move the picked step one position earlier');
  laterButton = makeButton('Later', moveLater, 'Move the picked step one position later');
  submitButton = makeButton('Submit Order', submitOrder, 'Submit the sequence');
  nextPageButton = makeButton('Next Page', nextInfoPage, 'Show the next page');

  order = scrambledOrder();
  updateControls();

  describe('Adoption Plan Prioritizer. Six adoption steps for a research group, labeled A to F, ' +
    'are listed in a scrambled order with the question: ' + QUESTION + ' Pick a step in the ' +
    'drop-down list and press Earlier or Later to move it. Press Submit Order to check the ' +
    'sequence. The sim reports Valid order with the list of dependencies, or names the first ' +
    'violated dependency, such as C needs A first, with its reason. It then shows both valid ' +
    'orders and a dependency graph: A and B point to C, C to D, D to E, and E to F. Only the ' +
    'first submission counts as evidence; you may rearrange and submit again afterward.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function makeButton(label, handler, aria) {
  const b = createButton(label);
  b.parent(document.querySelector('main'));
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
  b.attribute('aria-label', aria);
  b.attribute('title', aria);
  // a native click event fires for the mouse and for Enter or Space on a focused button
  // (p5's mousePressed listens to mousedown only, which the keyboard never sends)
  b.elt.addEventListener('click', handler);
  return b;
}

// ---------------------------------------------------------------
// Activity logic
// ---------------------------------------------------------------
// Starting state: a scrambled order that is not already valid
function scrambledOrder() {
  let a;
  do {
    a = STEP_IDS.slice();
    for (let i = a.length - 1; i > 0; i--) {   // Fisher-Yates shuffle
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
  } while (isValidOrder(a));
  return a;
}

function selectedStep() {
  const v = stepSelect.value();
  return v === '-1' ? null : v;
}

function selectionChanged() {
  infoPage = 0;     // picking a step returns a narrow screen to the step view
  updateControls();
  redraw();
}

function moveBy(delta) {
  const s = selectedStep();
  if (s === null) return;
  const p = order.indexOf(s);
  const q = p + delta;
  if (q < 0 || q >= order.length) return;
  order[p] = order[q];
  order[q] = s;
  infoPage = 0;
  updateControls();
  redraw();
}

function moveEarlier() { moveBy(-1); }
function moveLater() { moveBy(1); }

function submitOrder() {
  submissions++;
  const v = firstViolation(order);
  lastResult = { order: order.slice(), violation: v, n: submissions };
  if (firstResult === null) firstResult = { valid: v === null };
  // on a narrow screen, jump from the step view to the first page of feedback
  infoPage = canvasWidth < wideWidth ? 1 : 0;
  updateControls();
  redraw();
}

function nextInfoPage() {
  infoPage = (infoPage + 1) % infoPageCount;
  redraw();
}

// Enable, disable and relabel the controls to match the state
function updateControls() {
  // drop-down labels show the position of each step in the sequence
  for (let i = 0; i < STEP_IDS.length; i++) {
    const id = STEP_IDS[i];
    stepSelect.elt.options[i + 1].text = 'Step ' + id + ' (#' + (order.indexOf(id) + 1) + ')';
  }
  const s = selectedStep();
  const p = s === null ? -1 : order.indexOf(s);
  setEnabled(earlierButton, p > 0);
  setEnabled(laterButton, p >= 0 && p < order.length - 1);
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a second row when needed
function layoutControls() {
  const visible = [stepSelect, earlierButton, laterButton, submitButton];
  if (infoPageCount > 1) visible.push(nextPageButton);
  nextPageButton.style('display', infoPageCount > 1 ? 'inline-block' : 'none');
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

  const innerW = canvasWidth - 2 * pad;

  // title (wraps onto two lines at narrow widths)
  fill('black');
  textSize(24);
  textStyle(BOLD);
  let y = drawLines(wrapText('Adoption Plan Prioritizer', innerW), pad, 8, 30, CENTER) + 2;
  textStyle(NORMAL);

  // question
  textSize(18);
  textStyle(BOLDITALIC);
  fill('navy');
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 24) + 2;
  textStyle(NORMAL);

  // status line
  textSize(16);
  fill('dimgray');
  y = drawLines(wrapText(statusText(), innerW), pad, y, 20) + 6;

  if (canvasWidth >= wideWidth) {
    // two columns: the sequence on the left, the feedback on the right
    const colW = (innerW - pad) / 2;
    const ySteps = drawSteps(pad, y, colW);
    const yInfo = drawPaged(buildInfoBlocks(), pad + colW + pad, y, colW, 0);
    layoutBottom = max(ySteps, yInfo);
  } else {
    drawNarrow(y, innerW);
  }
}

function statusText() {
  let s = 'Submissions: ' + submissions;
  if (firstResult === null) s += '  |  The first submission counts as evidence';
  else s += '  |  First submission: ' + (firstResult.valid ? 'valid (mastery shown)' : 'invalid (mastery not shown)');
  return s;
}

// Narrow screens: page 0 is the step view; later pages hold the feedback
function drawNarrow(top, innerW) {
  const hasFeedback = lastResult !== null;
  const fb = buildInfoBlocks();
  if (infoPage === 0 || !hasFeedback) {
    let y = drawSteps(pad, top, innerW) + 2;
    let note;
    if (!hasFeedback) {
      note = { kind: 'note', title: '', body: HINT_SHORT };
    } else {
      note = { kind: fb[0].kind, title: fb[0].title,
        body: 'Press Next Page to read the reason, both valid orders, and the dependency graph.' };
    }
    layoutBottom = drawPaged([note], pad, y, innerW, -1);
    const fbPages = hasFeedback ? measurePages(fb, top, innerW, true) : [];
    setPageCount(hasFeedback ? 1 + fbPages.length : 1);
  } else {
    layoutBottom = drawPaged(fb, pad, top, innerW, 1);
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

// Draw wrapped lines; returns the y below the last line. align CENTER centers on the canvas.
function drawLines(lines, x, y, lineH, align) {
  noStroke();
  if (align === CENTER) textAlign(CENTER, TOP);
  else textAlign(LEFT, TOP);
  for (const ln of lines) {
    text(ln, align === CENTER ? canvasWidth / 2 : x, y);
    y += lineH;
  }
  return y;
}

// The learner's sequence: position number, step letter, and the full step text
function drawSteps(x, y, w) {
  const gutter = w >= 400 ? 64 : 50;
  const sel = selectedStep();
  textSize(16);
  textStyle(BOLD);
  fill('black');
  y = drawLines(['Your sequence (first to last)'], x, y, 22);
  textStyle(NORMAL);
  for (let p = 0; p < order.length; p++) {
    const id = order[p];
    const lines = wrapText(STEPS[id], w - gutter - 10);
    const h = lines.length * 20 + 10;
    fill('white');
    if (id === sel) { stroke('navy'); strokeWeight(3); }
    else { stroke('silver'); strokeWeight(1); }
    rect(x, y, w, h, 6);
    strokeWeight(1);
    // position number and step letter
    fill('dimgray');
    noStroke();
    textAlign(LEFT, TOP);
    text((p + 1) + '.', x + 8, y + 5);
    fill(id === sel ? 'navy' : 'black');
    textStyle(BOLD);
    textSize(18);
    // the picked step has a thick outline; at wide widths it is also marked with an arrow
    text((id === sel && gutter === 64 ? '▶' : '') + id, x + (gutter === 64 ? 28 : 24), y + 4);
    textSize(16);
    textStyle(NORMAL);
    fill('black');
    drawLines(lines, x + gutter, y + 5, 20);
    y += h + 4;
  }
  return y;
}

// ---------------------------------------------------------------
// Feedback area (paged when it does not fit)
// ---------------------------------------------------------------
const HINT = 'Pick a step in the drop-down list below, then press Earlier or Later to move it. ' +
  'Press Submit Order when the sequence is ready. Only the first submission counts as evidence.';

const HINT_SHORT = 'Pick a step below, then press Earlier or Later to move it. ' +
  'Press Submit Order when the sequence is ready.';

function buildInfoBlocks() {
  const blocks = [];
  if (lastResult === null) {
    blocks.push({ kind: 'note', title: 'How to arrange the steps', body: HINT });
    return blocks;
  }
  const v = lastResult.violation;
  const counts = lastResult.n === 1
    ? 'Submission 1: this one counts as evidence.'
    : 'Submission ' + lastResult.n + ': practice. Only the first submission counts as evidence.';
  const submitted = 'Submitted order: ' + lastResult.order.join(', ') + '.';
  if (v === null) {
    blocks.push({ kind: 'ok', title: '✓ ' + resultTitle(lastResult.order),
      body: counts + ' ' + submitted });
    blocks.push({ kind: 'note', title: 'The dependencies, each with its reason', body: '' });
    for (const d of DEPS) {
      blocks.push({ kind: 'ok', title: '✓ ' + d.before + ' before ' + d.after, body: d.reason });
    }
  } else {
    blocks.push({ kind: 'bad', title: '✗ ' + resultTitle(lastResult.order),
      body: 'Reason: ' + v.reason + ' ' + counts + ' ' + submitted });
  }
  blocks.push({ kind: 'note', title: 'Both valid orders',
    body: VALID_ORDERS[0].join(', ') + '   and   ' + VALID_ORDERS[1].join(', ') +
      '. A and B may be in either order.' });
  blocks.push({ kind: 'graph', title: 'Dependency graph',
    body: 'An arrow from one step to another means the first must come earlier.' +
      (v === null ? '' : ' The dashed arrow marked ✗ is the dependency your order broke.'),
    violation: v });
  return blocks;
}

const GRAPH_H = 128;   // height of the drawing inside a graph block

// Wrap and measure every block at the column width; returns the pages that fit below y
function measurePages(blocks, y, w, reserveFooter) {
  textSize(16);
  for (const b of blocks) {
    textStyle(BOLD);
    b.titleLines = b.title ? wrapText(b.title, w - 20) : [];
    textStyle(NORMAL);
    b.bodyLines = b.body ? wrapText(b.body, w - 20) : [];
    b.h = (b.titleLines.length + b.bodyLines.length) * 20 + 12 + (b.kind === 'graph' ? GRAPH_H : 0);
  }
  const footerH = 24;
  const avail = drawHeight - y - 6;
  let pages = paginate(blocks, reserveFooter ? avail - footerH : avail);
  if (!reserveFooter && pages.length > 1) pages = paginate(blocks, avail - footerH);
  return pages;
}

function paginate(blocks, avail) {
  const pages = [];
  let page = [];
  let used = 0;
  for (const b of blocks) {
    if (page.length > 0 && used + b.h > avail) {
      pages.push(page);
      page = [];
      used = 0;
    }
    page.push(b);
    used += b.h + 6;
  }
  pages.push(page);
  return pages;
}

function setPageCount(n) {
  const oldCount = infoPageCount;
  infoPageCount = n;
  if (infoPage >= infoPageCount) infoPage = 0;
  if (oldCount !== infoPageCount) layoutControls();
}

// Draw one page of blocks at (x, y) with width w. pageOffset is the number of non-feedback
// pages in front of the feedback pages (1 for the narrow step view, 0 otherwise, -1 to draw
// all blocks without paging). Returns the lowest y drawn.
function drawPaged(blocks, x, y, w, pageOffset) {
  const pages = measurePages(blocks, y, w, pageOffset > 0);
  let page;
  if (pageOffset < 0) {
    page = blocks;
  } else {
    setPageCount(pages.length + pageOffset);
    page = pages[Math.max(0, infoPage - pageOffset)];
  }

  for (const b of page) {
    if (b.kind === 'ok') { fill(OK_FILL); stroke(OK_STROKE); }
    else if (b.kind === 'bad') { fill(BAD_FILL); stroke(BAD_STROKE); }
    else { fill('white'); stroke('silver'); }
    strokeWeight(b.kind === 'ok' || b.kind === 'bad' ? 2 : 1);
    rect(x, y, w, b.h, 8);
    strokeWeight(1);
    fill('black');
    textStyle(BOLD);
    let ty = drawLines(b.titleLines, x + 10, y + 6, 20);
    textStyle(NORMAL);
    if (b.kind === 'graph') {
      drawGraph(x + 10, ty, w - 20, GRAPH_H, b.violation);
      ty += GRAPH_H;
      fill('black');
    }
    drawLines(b.bodyLines, x + 10, ty, 20);
    y += b.h + 6;
  }

  if (pageOffset >= 0 && infoPageCount > 1) {
    const last = infoPage === infoPageCount - 1;
    const more = (last && pageOffset > 0) ? 'Next Page returns to the steps' :
      (last ? 'Next Page returns to page 1' : 'press Next Page for more');
    fill('dimgray');
    textSize(16);
    noStroke();
    textAlign(LEFT, TOP);
    text('Page ' + (infoPage + 1) + ' of ' + infoPageCount + ': ' + more, x, drawHeight - 24);
  }
  return y;
}

// Dependency graph: A and B point to C, then C to D, D to E, E to F.
// The violated dependency, if any, is drawn dashed and thicker with a cross mark.
function drawGraph(x, y, w, h, violation) {
  const r = 18;
  const step = (w - 2 * r) / 4;
  const pos = {
    A: { x: x + r, y: y + h * 0.25 },
    B: { x: x + r, y: y + h * 0.75 },
    C: { x: x + r + step, y: y + h * 0.5 },
    D: { x: x + r + 2 * step, y: y + h * 0.5 },
    E: { x: x + r + 3 * step, y: y + h * 0.5 },
    F: { x: x + r + 4 * step, y: y + h * 0.5 }
  };
  for (const d of DEPS) {
    const broken = violation !== null && violation !== undefined &&
      d.before === violation.before && d.after === violation.after;
    drawArrow(pos[d.before], pos[d.after], r, broken);
  }
  for (const id of STEP_IDS) {
    const p = pos[id];
    fill('white');
    stroke('navy');
    strokeWeight(2);
    circle(p.x, p.y, 2 * r);
    strokeWeight(1);
    fill('navy');
    noStroke();
    textStyle(BOLD);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(id, p.x, p.y + 1);
    textSize(16);
    textStyle(NORMAL);
  }
}

function drawArrow(a, b, r, broken) {
  const ang = atan2(b.y - a.y, b.x - a.x);
  const x1 = a.x + r * cos(ang);
  const y1 = a.y + r * sin(ang);
  const x2 = b.x - r * cos(ang);
  const y2 = b.y - r * sin(ang);
  const col = broken ? BAD_STROKE : 'navy';
  stroke(col);
  strokeWeight(broken ? 4 : 2);
  if (broken) drawingContext.setLineDash([7, 5]);
  line(x1, y1, x2 - 8 * cos(ang), y2 - 8 * sin(ang));
  drawingContext.setLineDash([]);
  // arrowhead
  fill(col);
  noStroke();
  push();
  translate(x2, y2);
  rotate(ang);
  triangle(0, 0, -12, -6, -12, 6);
  pop();
  if (broken) {
    // cross mark at the middle of the broken arrow
    fill(BAD_STROKE);
    noStroke();
    textStyle(BOLD);
    textSize(18);
    textAlign(CENTER, BOTTOM);
    text('✗', (x1 + x2) / 2, (y1 + y2) / 2 - 4);
    textSize(16);
    textStyle(NORMAL);
  }
  strokeWeight(1);
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
