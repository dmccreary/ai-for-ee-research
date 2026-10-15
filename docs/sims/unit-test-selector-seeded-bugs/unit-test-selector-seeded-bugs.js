// Unit Test Selector for Seeded Bugs MicroSim
// CANVAS_HEIGHT: 760
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner selects at most four of eight candidate unit tests for a buggy sndr_db()
// function and presses Run. The sim evaluates the buggy function on each selected test
// (simulated in JavaScript; no learner code is executed), reports which tests pass and fail,
// which of the three seeded bugs are exposed and which stay hidden, and the "Why" sentence for
// each selected test. The first run is the one that counts as evidence. From the second run
// on, the sim reveals the minimum set and the reason each test exposes its bug.
// A Show menu switches the panel between the tests, the function and bugs, the run results
// and the minimum set, so the sim fits a fixed-height iframe at phone widths.
// The total canvas height is fixed; the control region grows to more rows at narrow widths.

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let canvasHeight = 760;               // fixed total height (iframe height - 2)
let controlHeight = 115;              // recomputed by layoutControls(): rows x 35 + 10
let drawHeight = canvasHeight - controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const SPEC_TEXT = 'Specification: "Return 10 times the base-10 logarithm of signal power divided by ' +
  'noise power. Raise ValueError if either power is not positive."';
const BUGGY_CODE = 'def sndr_db(signal, noise): return 20 * np.log10(signal / noise)';

const BUGS = [
  { id: 'A', text: 'Uses 20 times the logarithm instead of 10 times.' },
  { id: 'B', text: 'Does not raise ValueError when the noise power is 0.' },
  { id: 'C', text: 'Does not raise ValueError when the signal power is negative or 0.' }
];

// expected: { raises: true } or { value, tol }. bug: the bug the test exposes ('' for none).
const TESTS = [
  { n: 1, call: 'sndr_db(100, 1)',  signal: 100,  noise: 1, expText: '20.0 dB',
    expected: { value: 20.0, tol: 1e-9 }, bug: 'A', why: 'The buggy code returns 40.0.' },
  { n: 2, call: 'sndr_db(1, 1)',    signal: 1,    noise: 1, expText: '0.0 dB',
    expected: { value: 0.0, tol: 1e-9 }, bug: '', why: 'log10(1) is 0, so every version returns 0.0.' },
  { n: 3, call: 'sndr_db(10, 0)',   signal: 10,   noise: 0, expText: 'raises ValueError',
    expected: { raises: true }, bug: 'B', why: 'The buggy code does not raise ValueError for a zero noise power.' },
  { n: 4, call: 'sndr_db(-5, 1)',   signal: -5,   noise: 1, expText: 'raises ValueError',
    expected: { raises: true }, bug: 'C', why: 'The buggy code returns NaN and does not raise ValueError.' },
  { n: 5, call: 'sndr_db(1000, 1)', signal: 1000, noise: 1, expText: '30.0 dB',
    expected: { value: 30.0, tol: 1e-9 }, bug: 'A', why: 'The buggy code returns 60.0.' },
  { n: 6, call: 'sndr_db(2, 1)',    signal: 2,    noise: 1, expText: '3.01 dB, within 0.01',
    expected: { value: 3.01, tol: 0.01 }, bug: 'A', why: 'The buggy code returns 6.02.' },
  { n: 7, call: 'sndr_db(4, 1)',    signal: 4,    noise: 1, expText: '6.02 dB, within 0.01',
    expected: { value: 6.02, tol: 0.01 }, bug: 'A', why: 'The buggy code returns 12.04.' },
  { n: 8, call: 'sndr_db(0, 1)',    signal: 0,    noise: 1, expText: 'raises ValueError',
    expected: { raises: true }, bug: 'C', why: 'The buggy code returns negative infinity and does not raise ValueError.' }
];

const QUESTION = 'Which tests would reveal what is wrong?';
const MAX_TESTS = 4;
const REFUSAL = 'Choose at most four tests.';
const MIN_SET_TEXT = 'Minimum set: three tests, one of tests 1, 5, 6, 7 (bug A), test 3 (bug B), and ' +
  'one of tests 4, 8 (bug C). Tests 1, 3 and 4 are one example.';

// ---------------------------------------------------------------
// Pure logic (no p5 calls; tested in node)
// ---------------------------------------------------------------

// Simulated behavior of the buggy implementation, from the specification table.
// It has no raise statement, so it never raises ValueError. Its value is 20 log10(signal / noise).
function runBuggy(test) {
  if (test.noise === 0) {
    // Python stops on the division by zero; the point for the test is that no ValueError is raised
    return { raisesValueError: false, value: null, text: 'no ValueError' };
  }
  const v = 20 * Math.log10(test.signal / test.noise);
  let text;
  if (Number.isNaN(v)) text = 'NaN, no ValueError';
  else if (v === -Infinity) text = '-inf, no ValueError';
  else text = 'returns ' + formatDb(v);
  return { raisesValueError: false, value: v, text: text };
}

// 40 -> "40.0", 6.0206 -> "6.02", 12.0412 -> "12.04"
function formatDb(v) {
  let s = (Math.round(v * 100) / 100).toFixed(2);
  if (s.endsWith('0')) s = s.slice(0, -1);
  return s;
}

// A test passes when the buggy result agrees with the expected result under the specification
function testPasses(test) {
  const r = runBuggy(test);
  if (test.expected.raises) return r.raisesValueError;
  return r.value !== null && Number.isFinite(r.value) &&
    Math.abs(r.value - test.expected.value) <= test.expected.tol + 1e-12;
}

// Run a selection (array of test numbers 1..8). Returns null when refused (more than four).
function runSelection(nums) {
  if (nums.length > MAX_TESTS) return null;
  const results = nums.map(n => {
    const t = TESTS[n - 1];
    return { n: n, pass: testPasses(t), out: runBuggy(t).text };
  });
  const exposedSet = new Set();
  for (const r of results) {
    const bug = TESTS[r.n - 1].bug;
    if (!r.pass && bug) exposedSet.add(bug); // a failing test exposes the bug listed against it
  }
  const exposed = BUGS.map(b => b.id).filter(id => exposedSet.has(id));
  const hidden = BUGS.map(b => b.id).filter(id => !exposedSet.has(id));
  return { tests: nums.slice(), results, exposed, hidden,
    correct: hidden.length === 0 && nums.length <= MAX_TESTS };
}

function listText(arr) {
  return arr.length ? arr.join(', ') : 'none';
}

function bugsLine(run) {
  return 'Bugs exposed: ' + listText(run.exposed) + '. Bugs hidden: ' + listText(run.hidden) + '.';
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let runCount = 0;        // number of accepted runs
let lastRun = null;      // result of the most recent accepted run
let firstRun = null;     // the run that counts as evidence
let refused = false;     // the last Run press was refused (more than four tests)
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// views chosen with the Show menu
const VIEWS = ['Show tests', 'Show function and bugs', 'Show run results', 'Show minimum set'];

// controls
let testBoxes = [];
let runButton;
let viewSelect;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let i = 0; i < TESTS.length; i++) {
    const cb = createCheckbox(' Test ' + TESTS[i].n, false);
    cb.parent(document.querySelector('main'));
    cb.style('font-size', '16px');
    cb.changed(selectionChanged);
    testBoxes.push(cb);
  }
  runButton = createButton('Run');
  runButton.parent(document.querySelector('main'));
  runButton.style('font-size', '16px');
  runButton.style('padding', '4px 14px');
  runButton.mouseClicked(runPressed);

  viewSelect = createSelect();
  viewSelect.parent(document.querySelector('main'));
  for (const v of VIEWS) viewSelect.option(v);
  viewSelect.selected(VIEWS[0]);
  viewSelect.style('font-size', '16px');
  viewSelect.attribute('aria-label', 'Choose what the panel shows');
  viewSelect.changed(() => redraw());

  // absolute positioning first so offsetWidth measures the control, not the page width
  for (const c of allControls()) c.position(0, 0);

  updateControls();

  describe('Unit Test Selector for Seeded Bugs. A table lists eight candidate unit tests of a ' +
    'Python function sndr_db with their expected results, and the three seeded bugs A, B and C. ' +
    'The Show menu switches to the specification and buggy implementation, the run results, or the ' +
    'minimum set. Select up to four tests with the checkboxes and press Run. The sim reports which ' +
    'tests pass and fail on the buggy code, which bugs are exposed and which stay hidden, and why. ' +
    'More than four tests are refused. After a second run the minimum set is revealed.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function allControls() {
  return testBoxes.concat([runButton, viewSelect]);
}

function selectedNums() {
  const nums = [];
  testBoxes.forEach((cb, i) => { if (cb.checked()) nums.push(TESTS[i].n); });
  return nums;
}

function selectionChanged() {
  refused = false;
  updateControls();
  redraw();
}

function runPressed() {
  const nums = selectedNums();
  if (nums.length === 0) return;
  const run = runSelection(nums);
  if (run === null) {
    refused = true;           // "Choose at most four tests."
  } else {
    refused = false;
    runCount++;
    lastRun = run;
    if (firstRun === null) firstRun = run;
    viewSelect.selected(VIEWS[2]); // show the run results
  }
  updateControls();
  redraw();
}

function updateControls() {
  if (selectedNums().length === 0) runButton.attribute('disabled', '');
  else runButton.removeAttribute('disabled');
  layoutControls();
}

// Flow the checkboxes, the Run button and the Show menu left to right, wrapping as needed.
// The control region height follows the number of rows; the drawing region takes the rest.
function layoutControls() {
  const gap = 14;
  let rows = 1;
  let x = 10;
  let y = 0;
  const placed = [];
  for (const c of allControls()) {
    const w = c.elt.offsetWidth;
    if (x > 10 && x + w > canvasWidth - 10) {
      x = 10;
      y += 35;
      rows++;
    }
    placed.push([c, x, y]);
    x += w + gap;
  }
  controlHeight = rows * 35 + 10;
  drawHeight = canvasHeight - controlHeight;
  for (const [c, cx, cy] of placed) {
    let dy = 0;
    if (testBoxes.includes(c)) dy = 6;   // line checkbox text up with button text
    if (c === viewSelect) dy = 3;
    c.position(cx, drawHeight + 6 + cy + dy);
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

  // title, reduced to fit narrow widths
  bodyFont();
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  const title = 'Unit Test Selector for Seeded Bugs';
  let ts = 24;
  textSize(ts);
  while (ts > 18 && textWidth(title) > innerW) { ts--; textSize(ts); }
  text(title, canvasWidth / 2, 10);
  textStyle(NORMAL);

  let y = 42;

  // question
  textSize(16);
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 2;
  textStyle(NORMAL);

  // selection status and refusal (visible in every view)
  const n = selectedNums().length;
  fill('black');
  let status = 'Selected: ' + n + ' of at most ' + MAX_TESTS + '  |  Runs: ' + runCount;
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 2;
  if (refused) {
    textStyle(BOLD);
    fill('saddlebrown');
    y = drawLines(wrapText('✗ ' + REFUSAL, innerW), pad, y, 20) + 2;
    textStyle(NORMAL);
  }
  y += 4;

  const view = VIEWS.indexOf(viewSelect.value());
  if (view === 1) y = drawFunctionPanel(y, innerW);
  else if (view === 2) y = drawResultsPanel(y, innerW);
  else if (view === 3) y = drawMinimumSetPanel(y, innerW);
  else y = drawTestTable(y, innerW);

  // At wide widths the test table also fits below the other views
  if (view !== 0) {
    const tableBottom = drawTestTable(y + 8, innerW, true);
    if (tableBottom <= drawHeight - 6) y = drawTestTable(y + 8, innerW);
  }
  layoutBottom = y;
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

function codeFont() { textFont('monospace'); }
function bodyFont() { textFont('sans-serif'); }

// White panel with a border; returns nothing
function panel(y, innerW, h, borderColor, weight) {
  fill('white');
  stroke(borderColor);
  strokeWeight(weight);
  rect(pad, y, innerW, h, 8);
  strokeWeight(1);
  noStroke();
}

// Specification, buggy implementation and the three labeled bugs
function drawFunctionPanel(y, innerW) {
  const w = innerW - 20;
  textSize(16);
  bodyFont();
  const specLines = wrapText(SPEC_TEXT, w);
  codeFont();
  const codeLines = wrapText(BUGGY_CODE, w - 12);
  bodyFont();
  const bugLines = BUGS.map(b => wrapText('Bug ' + b.id + ': ' + b.text, w));
  let h = 10 + specLines.length * 20 + 8 + 20 + codeLines.length * 20 + 14 + 20 + 8;
  for (const bl of bugLines) h += bl.length * 20;

  panel(y, innerW, h, 'silver', 1);
  let yy = y + 10;
  fill('black');
  yy = drawLines(specLines, pad + 10, yy, 20) + 8;
  textStyle(BOLD);
  yy = drawLines(['Buggy implementation:'], pad + 10, yy, 20);
  textStyle(NORMAL);
  fill('whitesmoke');
  stroke('gainsboro');
  rect(pad + 8, yy, innerW - 16, codeLines.length * 20 + 6, 4);
  fill('black');
  codeFont();
  yy = drawLines(codeLines, pad + 14, yy + 3, 20) + 11;
  bodyFont();
  textStyle(BOLD);
  yy = drawLines(['The three seeded bugs:'], pad + 10, yy, 20);
  textStyle(NORMAL);
  for (const bl of bugLines) yy = drawLines(bl, pad + 10, yy, 20);
  return y + h;
}

// The eight candidate tests with their expected results, plus the bug labels.
// Selected rows carry a checked-box symbol and a tint; tests in the last run show
// PASS or FAIL with a check or cross symbol (color is never the only cue).
function drawTestTable(y, innerW, measureOnly) {
  const sel = selectedNums();
  const ran = lastRun ? lastRun.tests : [];
  textSize(16);
  bodyFont();
  const wMark = textWidth('☑ 8') + 12;
  codeFont();
  const wCall = textWidth('sndr_db(1000, 1)') + 12;
  bodyFont();
  const wideRes = textWidth('✗ FAIL') + 8;
  const x0 = pad + 8;
  const usable = innerW - 16;
  // result column shows the word at wide widths and the symbol alone at narrow widths
  let wRes = wideRes;
  let useWord = true;
  if (wMark + wCall + textWidth('3.01 dB, within 0.01') + 12 + wRes > usable) {
    useWord = false;
    wRes = textWidth('✗') + 8;
  }
  const wExp = usable - wMark - wCall - wRes;
  const expLines = TESTS.map(t => wrapText(t.expText, wExp - 8));
  const rowH = TESTS.map((t, i) => expLines[i].length * 20 + 6);

  let bugLines = BUGS.map(b => wrapText('Bug ' + b.id + ': ' + b.text, innerW - 20));
  let bugTitle = 'The three seeded bugs:';
  const legend = useWord ? [] : wrapText('Result: ✓ passed on the buggy code, ✗ failed.', innerW - 20);
  const tableH = 30 + 4 + rowH.reduce((a, b) => a + b, 0) + 8 + legend.length * 20 + 6 + 20 + 8;
  let h = tableH;
  for (const bl of bugLines) h += bl.length * 20;
  // At the narrowest widths the full bug list may not fit; point to the Show menu instead
  if (!measureOnly && y + h > drawHeight - 6) {
    bugTitle = 'Seeded bugs A, B and C:';
    bugLines = [wrapText('choose Show function and bugs to read them.', innerW - 20)];
    h = tableH + bugLines[0].length * 20;
  }
  if (measureOnly) return y + h;

  panel(y, innerW, h, 'silver', 1);

  // header
  let yy = y + 8;
  fill('black');
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('#', x0, yy);
  text('Test call', x0 + wMark, yy);
  text('Expected', x0 + wMark + wCall, yy);
  if (lastRun) text(useWord ? 'Result' : '', x0 + wMark + wCall + wExp, yy);
  textStyle(NORMAL);
  yy += 26;
  stroke('silver');
  line(pad + 4, yy, pad + innerW - 4, yy);
  noStroke();
  yy += 4;

  TESTS.forEach((t, i) => {
    const isSel = sel.includes(t.n);
    if (isSel) {
      fill('lightyellow');
      rect(pad + 2, yy - 2, innerW - 4, rowH[i], 4);
    }
    fill('black');
    bodyFont();
    textStyle(isSel ? BOLD : NORMAL);
    text((isSel ? '☑ ' : '☐ ') + t.n, x0, yy + 1);
    textStyle(NORMAL);
    codeFont();
    text(t.call, x0 + wMark, yy + 1);
    bodyFont();
    drawLines(expLines[i], x0 + wMark + wCall, yy + 1, 20);
    if (ran.includes(t.n)) {
      const pass = lastRun.results.find(r => r.n === t.n).pass;
      fill(pass ? 'navy' : 'saddlebrown');
      textStyle(BOLD);
      const mark = pass ? '✓' : '✗';
      text(useWord ? mark + (pass ? ' PASS' : ' FAIL') : mark, x0 + wMark + wCall + wExp, yy + 1);
      textStyle(NORMAL);
    }
    yy += rowH[i];
  });
  yy += 4;
  fill('dimgray');
  yy = drawLines(legend, pad + 10, yy, 20);
  yy += 4;
  stroke('silver');
  line(pad + 4, yy, pad + innerW - 4, yy);
  noStroke();
  yy += 6;
  fill('black');
  textStyle(BOLD);
  yy = drawLines([bugTitle], pad + 10, yy, 20);
  textStyle(NORMAL);
  for (const bl of bugLines) yy = drawLines(bl, pad + 10, yy, 20);
  y += h;

  // At wide widths there is room to keep the specification and the buggy code in view too
  const extra = specAndCodeHeight(innerW);
  if (y + 8 + extra <= drawHeight - 6) y = drawSpecAndCode(y + 8, innerW);
  return y;
}

function specAndCodeHeight(innerW) {
  const w = innerW - 20;
  textSize(16);
  bodyFont();
  const specLines = wrapText(SPEC_TEXT, w);
  codeFont();
  const codeLines = wrapText(BUGGY_CODE, w - 12);
  bodyFont();
  return 10 + specLines.length * 20 + 8 + 20 + codeLines.length * 20 + 6 + 12;
}

// Specification and buggy implementation only (the bugs are already listed above it)
function drawSpecAndCode(y, innerW) {
  const w = innerW - 20;
  const h = specAndCodeHeight(innerW);
  textSize(16);
  bodyFont();
  const specLines = wrapText(SPEC_TEXT, w);
  codeFont();
  const codeLines = wrapText(BUGGY_CODE, w - 12);
  bodyFont();
  panel(y, innerW, h, 'silver', 1);
  let yy = y + 10;
  fill('black');
  yy = drawLines(specLines, pad + 10, yy, 20) + 8;
  textStyle(BOLD);
  yy = drawLines(['Buggy implementation:'], pad + 10, yy, 20);
  textStyle(NORMAL);
  fill('whitesmoke');
  stroke('gainsboro');
  rect(pad + 8, yy, innerW - 16, codeLines.length * 20 + 6, 4);
  fill('black');
  codeFont();
  drawLines(codeLines, pad + 14, yy + 3, 20);
  bodyFont();
  return y + h;
}

// Results of the last run: pass/fail of each selected test with its Why sentence,
// the exposed and hidden bugs, and the first-run evidence line
function drawResultsPanel(y, innerW) {
  textSize(16);
  bodyFont();
  const w = innerW - 20;
  if (!lastRun) {
    const msg = wrapText('No run yet. Select up to four tests with the checkboxes below and press ' +
      'Run. The first run counts as evidence.', w);
    panel(y, innerW, msg.length * 20 + 20, 'silver', 1);
    fill('black');
    return drawLines(msg, pad + 10, y + 10, 20) + 10;
  }
  const run = lastRun;
  const failed = run.results.filter(r => !r.pass).map(r => r.n);
  const passed = run.results.filter(r => r.pass).map(r => r.n);
  const head = wrapText('Run ' + runCount + ': tests ' + run.tests.join(', ') + '. Failed: ' +
    listText(failed) + '. Passed: ' + listText(passed) + '.', w);
  textStyle(BOLD);
  const ok = run.hidden.length === 0;
  const bugs = wrapText((ok ? '✓ ' : '✗ ') + bugsLine(run), w);
  textStyle(NORMAL);
  const whys = run.results.map(r => wrapText('Test ' + r.n + (r.pass ? ' ✓ PASS: ' : ' ✗ FAIL: ') +
    TESTS[r.n - 1].why, w));
  const firstTxt = firstRun.correct
    ? 'First run (counts as evidence): all three bugs exposed with ' + firstRun.tests.length +
      ' tests. Correct selection.'
    : 'First run (counts as evidence): bugs hidden: ' + listText(firstRun.hidden) +
      '. Not a correct selection.';
  const first = wrapText(firstTxt, w);
  const more = runCount >= 2
    ? wrapText('The minimum set is now revealed: choose Show minimum set.', w)
    : wrapText('Change the selection and run again to reveal the minimum set.', w);
  let h = 10 + (head.length + bugs.length) * 20 + 8 + 8 + first.length * 20 + 8 + more.length * 20 + 10;
  for (const wl of whys) h += wl.length * 20;

  panel(y, innerW, h, ok ? 'royalblue' : 'darkorange', 3);
  let yy = y + 10;
  fill('black');
  yy = drawLines(head, pad + 10, yy, 20);
  textStyle(BOLD);
  fill(ok ? 'navy' : 'saddlebrown');
  yy = drawLines(bugs, pad + 10, yy, 20) + 8;
  textStyle(NORMAL);
  run.results.forEach((r, i) => {
    fill(r.pass ? 'navy' : 'saddlebrown');
    yy = drawLines(whys[i], pad + 10, yy, 20);
  });
  yy += 8;
  fill('black');
  yy = drawLines(first, pad + 10, yy, 20) + 8;
  fill('dimgray');
  yy = drawLines(more, pad + 10, yy, 20);
  return y + h;
}

// Minimum set and the reason each test exposes its bug (revealed from the second run on)
function drawMinimumSetPanel(y, innerW) {
  textSize(16);
  bodyFont();
  const w = innerW - 20;
  if (runCount < 2) {
    const msg = wrapText('The minimum set is revealed after you change the selection and run again ' +
      '(runs so far: ' + runCount + ').', w);
    panel(y, innerW, msg.length * 20 + 20, 'silver', 1);
    fill('black');
    return drawLines(msg, pad + 10, y + 10, 20) + 10;
  }
  textStyle(BOLD);
  const minLines = wrapText(MIN_SET_TEXT, w);
  textStyle(NORMAL);
  const reasons = TESTS.map(t => wrapText('Test ' + t.n + ' (' + (t.bug ? 'bug ' + t.bug : 'no bug') +
    '): ' + t.why, w));
  let h = 10 + minLines.length * 20 + 8 + 20;
  for (const r of reasons) h += r.length * 20;
  h += 10;

  panel(y, innerW, h, 'silver', 1);
  let yy = y + 10;
  fill('black');
  textStyle(BOLD);
  yy = drawLines(minLines, pad + 10, yy, 20) + 8;
  yy = drawLines(['Why each test exposes its bug:'], pad + 10, yy, 20);
  textStyle(NORMAL);
  for (const r of reasons) yy = drawLines(r, pad + 10, yy, 20);
  return y + h;
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
  module.exports = { TESTS, BUGS, MAX_TESTS, REFUSAL, runBuggy, testPasses, runSelection, bugsLine,
    formatDb };
}
