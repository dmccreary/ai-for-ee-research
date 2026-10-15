// Python Traceback Reader MicroSim
// CANVAS_HEIGHT: 760
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner examines five illustrative Python tracebacks, each condensed to the file, line,
// function, and message, and chooses one of three diagnoses. Option order is shuffled
// independently for each learner (each page load) and for each traceback. One attempt per
// traceback in a fixed order; the correct diagnosis, the "Why" sentence, and a highlight of the
// deciding part of the traceback are always revealed. The end screen shows "n of 5 correct" and
// whether the mastery threshold of 4 was met.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 680;
// Control region: up to two rows of buttons at narrow widths = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// Each condensed traceback is stored as its location part and its exception part.
// The specification's condensed form is location + ': ' + exception.
// options are in the specification's order A, B, C; answer indexes that order.
// highlight lists the parts of the traceback that determine the cause.
// ---------------------------------------------------------------
const TITLE = 'Python Traceback Reader';
const QUESTION = 'What does this error tell you about the cause?';
const ILLUSTRATIVE = 'Illustrative traceback, invented for this exercise';

const TRACEBACKS = [
  { id: 1,
    location: 'File "scripts/enob.py", line 12, in load_codes',
    exception: 'FileNotFoundError: [Errno 2] No such file or directory: \'data/raw/capture-7.csv\'',
    options: ['The file path is wrong; the file is named capture-07.csv',
              'The CSV file is corrupted',
              'NumPy is not installed'],
    answer: 0,
    why: 'The message names a file that does not exist, and the data directory holds capture-07.csv.',
    highlight: [{ part: 'exception', text: 'No such file or directory: \'data/raw/capture-7.csv\'' }] },
  { id: 2,
    location: 'File "scripts/enob.py", line 8, in load_codes',
    exception: 'ValueError: record too short: 12 samples',
    options: ['A bug in np.loadtxt',
              'The input record is too short, and the script rejected it as designed',
              'The window function is wrong'],
    answer: 1,
    why: 'The script raised this error deliberately, so the input is the problem and not the code.',
    highlight: [{ part: 'exception', text: 'record too short: 12 samples' }] },
  { id: 3,
    location: 'File "scripts/plot.py", line 1, in <module>',
    exception: 'ModuleNotFoundError: No module named \'scipy\'',
    options: ['The environment does not have scipy installed',
              'The script has a typo in a variable name',
              'The data file is empty'],
    answer: 0,
    why: 'The import failed before any other code ran, which points to the environment.',
    highlight: [{ part: 'location', text: 'line 1, in <module>' },
                { part: 'exception', text: 'No module named \'scipy\'' }] },
  { id: 4,
    location: 'File "scripts/enob.py", line 17, in enob',
    exception: 'IndexError: index 4096 is out of bounds for axis 0 with size 4096',
    options: ['The CSV has too many columns',
              'An off-by-one in an index or slice that reaches one past the end',
              'The sampling rate is wrong'],
    answer: 1,
    why: 'An index equal to the array size is one past the last valid index, which is 4095.',
    highlight: [{ part: 'exception', text: 'index 4096 is out of bounds for axis 0 with size 4096' }] },
  { id: 5,
    location: 'File "scripts/enob.py", line 14, in enob',
    exception: 'TypeError: unsupported operand type(s) for -: \'str\' and \'float\'',
    options: ['The data were loaded as text because a header line was not skipped',
              'The FFT length is not a power of two',
              'The Hann window is missing'],
    answer: 0,
    why: 'A string cannot be subtracted from a float, which suggests the codes were read as strings, often because of a header row.',
    highlight: [{ part: 'exception', text: 'unsupported operand type(s) for -: \'str\' and \'float\'' }] }
];

const LETTERS = ['A', 'B', 'C'];
const MASTERY = 4;   // mastery requires at least 4 of 5 correct on the first attempt

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
// orders[i][p] = specification option index shown at display position p for traceback i.
// Shuffled once per learner (page load), independently for each traceback.
let orders = [];
let current = 0;         // index of the traceback on screen (fixed order 0..4)
let selected = -1;       // display position chosen but not yet submitted
let committed = false;   // has the current traceback been submitted?
let results = [];        // true/false for each submitted traceback
let score = 0;
let finished = false;
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let optionButtons = [];
let primaryButton;       // Submit / Next Traceback / See Score

// ---------------------------------------------------------------
// Pure logic (no drawing) - also used by the node tests
// ---------------------------------------------------------------
function shuffledIndexes(n, rand) {
  const a = [];
  for (let i = 0; i < n; i++) a.push(i);
  for (let i = a.length - 1; i > 0; i--) {   // Fisher-Yates shuffle
    const j = Math.floor(rand() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function makeOrders(rand) {
  return TRACEBACKS.map(tb => shuffledIndexes(tb.options.length, rand));
}

// Display position at which the correct diagnosis appears
function correctPosition(tbIndex, order) {
  return order.indexOf(TRACEBACKS[tbIndex].answer);
}

function isCorrectChoice(tbIndex, order, displayPos) {
  return order[displayPos] === TRACEBACKS[tbIndex].answer;
}

function scoreLine(n) {
  return n + ' of 5 correct';
}

function masteryMet(n) {
  return n >= MASTERY;
}

// Character ranges [start, end) to highlight within a traceback line
function highlightRanges(tb, part) {
  const line = tb[part];
  const ranges = [];
  for (const h of tb.highlight) {
    if (h.part !== part) continue;
    const s = line.indexOf(h.text);
    if (s >= 0) ranges.push([s, s + h.text.length]);
  }
  return ranges;
}

// Wrap a monospaced string to maxCols columns, preferring breaks at spaces.
// Returns [{text, start}] where start is the offset of the piece in the original string.
function wrapMono(str, maxCols) {
  const out = [];
  let start = 0;
  maxCols = Math.max(8, maxCols);
  while (str.length - start > maxCols) {
    const seg = str.substring(start, start + maxCols + 1);
    let brk = seg.lastIndexOf(' ');
    if (brk > 0) {
      out.push({ text: str.substring(start, start + brk), start: start });
      start = start + brk + 1;
    } else {
      out.push({ text: str.substring(start, start + maxCols), start: start });
      start = start + maxCols;
    }
  }
  out.push({ text: str.substring(start), start: start });
  return out;
}

// ---------------------------------------------------------------
// Setup
// ---------------------------------------------------------------
function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // option order is shuffled independently for this learner and for each traceback
  orders = makeOrders(Math.random);

  // Create ALL controls before laying them out
  for (let p = 0; p < LETTERS.length; p++) {
    const b = createButton('Diagnosis ' + LETTERS[p]);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.mouseClicked(() => selectOption(p));
    optionButtons.push(b);
  }
  primaryButton = createButton('Submit');
  primaryButton.parent(document.querySelector('main'));
  styleButton(primaryButton);
  primaryButton.style('font-weight', 'bold');
  primaryButton.mouseClicked(primaryPressed);

  updateControls();

  describe('Python Traceback Reader. Five illustrative Python tracebacks are shown one at a time, ' +
    'each condensed to the file, line, function, and exception message, with three possible ' +
    'diagnoses labeled A, B and C. Choose a diagnosis with the buttons and press Submit. The sim ' +
    'then reveals the correct diagnosis and the reason, and highlights the part of the traceback ' +
    'that determines it. After the fifth traceback it shows the score out of 5 and whether the ' +
    'mastery threshold of 4 was met.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------
function selectOption(p) {
  if (finished || committed) return;
  selected = p;
  updateControls();
  redraw();
}

function primaryPressed() {
  if (finished) return;
  if (!committed) {
    if (selected < 0) return;
    committed = true;  // one attempt
    const ok = isCorrectChoice(current, orders[current], selected);
    results[current] = ok;
    if (ok) score++;
  } else if (current < TRACEBACKS.length - 1) {
    current++;
    selected = -1;
    committed = false;
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

function updateControls() {
  const tb = TRACEBACKS[current];
  const order = orders[current];
  const rightPos = correctPosition(current, order);
  for (let p = 0; p < LETTERS.length; p++) {
    const b = optionButtons[p];
    if (finished) { b.hide(); continue; }
    b.show();
    let label = 'Diagnosis ' + LETTERS[p];
    if (committed && p === rightPos) label = '✓ ' + label;
    else if (committed && p === selected) label = '✗ ' + label;
    b.html(label);
    b.attribute('aria-label', label + ': ' + tb.options[order[p]]);
    setEnabled(b, !committed);
    const isPicked = p === selected;
    b.attribute('aria-pressed', isPicked ? 'true' : 'false');
    b.style('border', isPicked ? '3px solid navy' : '1px solid gray');
    b.style('background-color', isPicked ? 'lightsteelblue' : 'whitesmoke');
    b.style('font-weight', isPicked ? 'bold' : 'normal');
    b.style('color', 'black');
  }
  if (finished) {
    primaryButton.hide();
  } else {
    primaryButton.show();
    if (!committed) {
      primaryButton.html('Submit');
      setEnabled(primaryButton, selected >= 0);
    } else {
      primaryButton.html(current === TRACEBACKS.length - 1 ? 'See Score' : 'Next Traceback');
      setEnabled(primaryButton, true);
    }
  }
  layoutControls();
}

// Flow the visible buttons left to right, wrapping onto another row when needed
function layoutControls() {
  if (finished) return;
  const visible = optionButtons.concat([primaryButton]);
  const gap = 10;
  let x = 10;
  let y = drawHeight + 8;
  for (const b of visible) {
    const w = b.elt.offsetWidth;
    if (x > 10 && x + w > canvasWidth - 10) {
      x = 10;
      y += 35;
    }
    b.position(x, y);
    x += w + gap;
  }
}

// ---------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------
function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);

  const innerW = canvasWidth - 2 * pad;

  textFont('sans-serif');
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(24);
  text(TITLE, canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (finished) drawSummary(46, innerW);
  else drawTraceback(46, innerW);
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

function drawLines(lines, x, y, lineH) {
  textAlign(LEFT, TOP);
  for (const ln of lines) {
    noStroke();
    text(ln, x, y);
    y += lineH;
  }
  return y;
}

// Monospaced traceback block; after submission the deciding parts are highlighted
// with a gold background AND an underline (a cue that does not rely on color).
function drawCodeBlock(tb, x, y, w) {
  textFont('monospace');
  textSize(16);
  textStyle(NORMAL);
  const charW = textWidth('M');
  const innerPad = 10;
  const cols = Math.floor((w - 2 * innerPad) / charW);
  const lineH = 21;
  const pieces = [];
  for (const part of ['location', 'exception']) {
    const ranges = committed ? highlightRanges(tb, part) : [];
    for (const piece of wrapMono(tb[part], cols)) {
      pieces.push({ text: piece.text, start: piece.start, ranges: ranges });
    }
  }
  const h = pieces.length * lineH + 2 * innerPad;
  fill('whitesmoke');
  stroke('gray');
  strokeWeight(1);
  rect(x, y, w, h, 6);

  let yy = y + innerPad;
  for (const pc of pieces) {
    const x0 = x + innerPad;
    for (const r of pc.ranges) {
      const s = Math.max(r[0], pc.start);
      const e = Math.min(r[1], pc.start + pc.text.length);
      if (e > s) {
        noStroke();
        fill('gold');
        rect(x0 + (s - pc.start) * charW, yy - 1, (e - s) * charW, lineH - 1);
        stroke('black');
        strokeWeight(2);
        line(x0 + (s - pc.start) * charW, yy + lineH - 3, x0 + (e - pc.start) * charW, yy + lineH - 3);
        strokeWeight(1);
      }
    }
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    text(pc.text, x0, yy);
    yy += lineH;
  }
  textFont('sans-serif');
  return y + h;
}

function drawTraceback(y, innerW) {
  const tb = TRACEBACKS[current];
  const order = orders[current];
  const rightPos = correctPosition(current, order);

  textSize(16);
  fill('black');
  y = drawLines(wrapText('Traceback ' + (current + 1) + ' of 5  |  Correct so far: ' + score, innerW),
    pad, y, 20) + 4;

  textStyle(BOLD);
  fill('navy');
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 6;
  textStyle(ITALIC);
  fill('dimgray');
  y = drawLines(wrapText(ILLUSTRATIVE, innerW), pad, y, 20) + 4;
  textStyle(NORMAL);

  y = drawCodeBlock(tb, pad, y, innerW) + 4;
  if (committed) {
    textSize(16);
    fill('black');
    y = drawLines(wrapText('Highlighted and underlined: the part that determines the cause.', innerW),
      pad, y, 20);
  }
  y += 6;

  // three diagnoses in this learner's shuffled order
  textSize(16);
  for (let p = 0; p < LETTERS.length; p++) {
    const isRight = committed && p === rightPos;
    const isWrongPick = committed && p === selected && p !== rightPos;
    const isPicked = !committed && p === selected;
    let tag = '';
    if (isRight) tag = '✓ Correct diagnosis';
    else if (isWrongPick) tag = '✗ Your choice';
    else if (isPicked) tag = 'Your choice';

    textStyle(NORMAL);
    const bodyLines = wrapText(tb.options[order[p]], innerW - 24);
    const headH = 22;
    const boxH = 6 + headH + bodyLines.length * 20 + 6;
    if (isRight) { fill('white'); stroke('navy'); strokeWeight(3); }
    else if (isWrongPick) {
      fill('white'); stroke('saddlebrown'); strokeWeight(3);
      drawingContext.setLineDash([8, 5]);
    }
    else if (isPicked) { fill('lavender'); stroke('navy'); strokeWeight(3); }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(pad, y, innerW, boxH, 8);
    drawingContext.setLineDash([]);
    strokeWeight(1);

    noStroke();
    fill('black');
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Diagnosis ' + LETTERS[p], pad + 12, y + 6);
    if (tag) {
      fill(isWrongPick ? 'saddlebrown' : 'navy');
      textAlign(RIGHT, TOP);
      text(tag, pad + innerW - 12, y + 6);
    }
    textStyle(NORMAL);
    fill('black');
    drawLines(bodyLines, pad + 12, y + 6 + headH, 20);
    y += boxH + 6;
  }
  y += 2;

  textSize(16);
  if (!committed) {
    fill('black');
    const msg = selected < 0
      ? 'Choose one of the three diagnoses with the buttons below, then press Submit. You get one attempt.'
      : 'Your choice: Diagnosis ' + LETTERS[selected] + '. Press Submit to commit it, or choose another first.';
    y = drawLines(wrapText(msg, innerW), pad, y, 20);
  } else {
    const ok = results[current];
    textSize(18);
    textStyle(BOLD);
    fill(ok ? 'navy' : 'saddlebrown');
    const head = ok
      ? '✓ Correct.'
      : '✗ The correct diagnosis is ' + LETTERS[rightPos] + ': ' + tb.options[tb.answer] + '.';
    y = drawLines(wrapText(head, innerW), pad, y, 23);
    textSize(16);
    textStyle(NORMAL);
    fill('black');
    y = drawLines(wrapText(tb.why, innerW), pad, y, 20);
  }
  layoutBottom = y;
}

function drawSummary(y, innerW) {
  textSize(16);
  fill('black');
  y = drawLines(['All five tracebacks examined'], pad, y, 20) + 6;
  textSize(28);
  textStyle(BOLD);
  y = drawLines([scoreLine(score)], pad, y, 36);
  textSize(16);
  const met = masteryMet(score);
  fill(met ? 'navy' : 'saddlebrown');
  const msg = met
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 5 correct on the first attempt.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of 5 correct on the first attempt are needed.';
  y = drawLines(wrapText(msg, innerW), pad, y, 20);
  textStyle(NORMAL);
  layoutBottom = y;
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
