// Agent Failure Log Triage MicroSim
// CANVAS_HEIGHT: 800
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner reads six illustrative excerpts of an agent log and attributes each one to one of
// six failure modes: Premature completion, Hallucinated result, Scope drift, Test weakening,
// Wrong arguments, Runaway loop. One attempt per excerpt in a fixed order. After each attempt
// the correct mode, the "Why" sentence, and the mechanical defense for that mode are shown.
// The final screen shows n of 6 correct and whether the mastery threshold of 5 was met.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 720;
// Control region: two rows of controls = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter)
// ---------------------------------------------------------------
// Definitions from the section "Logging, Failure Modes, and Runaway Agents";
// defenses from Table 2 of the chapter.
const MODES = [
  { name: 'Premature completion',
    def: 'the agent reports success without having run the check that defines success.',
    defense: 'Require check output in the report' },
  { name: 'Hallucinated result',
    def: 'the agent reports a number or file that no tool produced.',
    defense: 'Trace every reported value to a call' },
  { name: 'Scope drift',
    def: 'the agent fixes something nobody asked it to touch.',
    defense: 'Path permissions; review the diff' },
  { name: 'Test weakening',
    def: 'faced with a failing test, the agent edits the test and not the code.',
    defense: 'Protect tests, or review test diffs first' },
  { name: 'Wrong arguments',
    def: 'the agent calls the right tool with the wrong path, parameter, or units.',
    defense: 'Read the first calls of a new workflow' },
  { name: 'Runaway loop',
    def: 'the agent repeats an action without progress.',
    defense: 'Step limit, repeat detector, spending cap' }
];

// Each excerpt is stored as display lines; lines.join(' ') is the excerpt exactly as specified.
// Lines that start with a time stamp are log lines; the others are notes about the log.
const EXCERPTS = [
  { id: 1, mode: 'Hallucinated result',
    lines: ['14:02 tool=run_python args=scripts/enob.py rc=1 stderr="ValueError: need at least 64 samples".',
      '14:02 agent: "All checks pass. The ENOB result is 9.4 bits."'],
    why: 'The only run exited with an error, so no tool produced the value 9.4.' },
  { id: 2, mode: 'Test weakening',
    lines: ['14:10 tool=run_python tests/test_enob.py rc=1 (1 failed).',
      '14:11 tool=edit_file path=tests/test_enob.py (changed expected value 10.0 to 9.0).',
      '14:11 tool=run_python tests/test_enob.py rc=0.'],
    why: 'The failing test was edited until it passed and the code was not changed.' },
  { id: 3, mode: 'Scope drift',
    lines: ['14:20 user request: "fix the typo in the README".',
      '14:21 tool=edit_file path=README.md.',
      '14:22 tool=edit_file path=scripts/enob.py (renamed 14 variables).',
      '14:23 tool=edit_file path=docs/spec.md.'],
    why: 'Edits to files that the request did not mention.' },
  { id: 4, mode: 'Runaway loop',
    lines: ['14:30 tool=read_file path=data/rwa/capture-07.csv result=FileNotFoundError.',
      '14:30 tool=read_file path=data/rwa/capture-07.csv result=FileNotFoundError.',
      '(repeated 31 times)'],
    why: 'The same failing call was repeated with no change and no progress.' },
  { id: 5, mode: 'Premature completion',
    lines: ['14:40 agent: "The conversion is complete."',
      'No tool calls since 14:35.',
      'The acceptance check scripts/check-units.py was never run.'],
    why: 'Success was claimed without running the check that defines it.' },
  { id: 6, mode: 'Wrong arguments',
    lines: ['14:50 tool=run_python args="scripts/enob.py data/raw/capture-07.csv --fs 1000000" rc=0 result="ENOB=6.1".',
      'The record was sampled at 100000 Hz.'],
    why: 'The tool ran with the wrong sampling rate, so the result is wrong without any error.' }
];

const QUESTION = 'What went wrong here?';
const MASTERY = 5;   // mastery requires at least 5 of 6 correct

function modeByName(name) { return MODES.find(m => m.name === name); }
function isCorrect(excerpt, choice) { return choice === excerpt.mode; }
function masteryMet(score) { return score >= MASTERY; }
function isLogLine(s) { return /^\d\d:\d\d /.test(s); }

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let pos = 0;             // 0..5, fixed order
let submitted = false;
let chosen = '';         // mode name chosen in the drop-down
let score = 0;
let finished = false;
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let modeSelect;
let submitButton;
let nextButton;
let startOverButton;

const PLACEHOLDER = 'Choose a failure mode';

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(161);   // Agent Failure Modes
const EXCERPT_CONCEPT = (id) => LRS.conceptId(id === 4 ? 162 : 161);   // excerpt 4 is a Runaway Agent
let lrs = null, excerptStart = 0;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  modeSelect = createSelect();
  modeSelect.parent(document.querySelector('main'));
  modeSelect.option(PLACEHOLDER, '');
  for (const m of MODES) modeSelect.option(m.name);
  modeSelect.style('font-size', '16px');
  modeSelect.style('padding', '3px');
  modeSelect.attribute('aria-label', 'Failure mode');
  modeSelect.changed(modeChanged);

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  onActivate(submitButton, submitPressed);

  nextButton = createButton('Next Excerpt');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  onActivate(nextButton, nextPressed);

  startOverButton = createButton('Start Over');
  startOverButton.parent(document.querySelector('main'));
  styleButton(startOverButton);
  onActivate(startOverButton, startOver);

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Agent Failure Log Triage', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Agent Failure Log Triage MicroSim', pageDwell: true });
  }

  startOver();

  describe('Agent Failure Log Triage. One illustrative agent log excerpt is shown at a time with ' +
    'the six failure modes listed: Premature completion, Hallucinated result, Scope drift, Test ' +
    'weakening, Wrong arguments, and Runaway loop. Choose a mode in the drop-down and press Submit. ' +
    'The sim says whether the choice is correct, gives the reason, and names the mechanical defense ' +
    'for that mode. After six excerpts it shows the score out of 6 and whether the mastery ' +
    'threshold of 5 was met.');

  noLoop(); // nothing animates; redraw only when the state changes
}

// Use the click event so the buttons work with the mouse and with Enter or Space from the keyboard
function onActivate(b, fn) {
  b.elt.addEventListener('click', fn);
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Activity logic
// ---------------------------------------------------------------
function startOver() {
  pos = 0;
  submitted = false;
  chosen = '';
  score = 0;
  finished = false;
  excerptStart = Date.now();
  modeSelect.elt.value = '';
  updateControls();
  redraw();
}

function currentExcerpt() {
  return EXCERPTS[pos];
}

// Choosing in the drop-down does not commit; Submit does
function modeChanged() {
  if (finished || submitted) return;
  chosen = modeSelect.elt.value;
  updateControls();
  redraw();
}

// One attempt per excerpt
function submitPressed() {
  if (finished || submitted || !chosen) return;
  if (lrs) lrs.question('q-excerpt-' + currentExcerpt().id, { name: 'Excerpt ' + currentExcerpt().id,
      concept: EXCERPT_CONCEPT(currentExcerpt().id) })
    .answer({ success: isCorrect(currentExcerpt(), chosen), response: LRS.slug(chosen),
              durationMs: excerptStart ? Date.now() - excerptStart : undefined });
  submitted = true;
  if (isCorrect(currentExcerpt(), chosen)) score++;
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished || !submitted) return;
  if (pos < EXCERPTS.length - 1) {
    pos++;
    submitted = false;
    chosen = '';
    excerptStart = Date.now();
    modeSelect.elt.value = '';
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  if (finished) {
    modeSelect.hide();
    submitButton.hide();
    nextButton.hide();
    startOverButton.show();
  } else {
    modeSelect.show();
    submitButton.show();
    nextButton.show();
    startOverButton.hide();
    setEnabled(modeSelect, !submitted);
    setEnabled(submitButton, !submitted && chosen !== '');
    nextButton.html(pos === EXCERPTS.length - 1 ? 'See Score' : 'Next Excerpt');
    setEnabled(nextButton, submitted);
  }
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a second row when needed
function layoutControls() {
  const visible = finished ? [startOverButton] : [modeSelect, submitButton, nextButton];
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
  textFont('Arial');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(24);
  const title = 'Agent Failure Log Triage';
  // shrink the title only when it would not fit on a narrow screen
  if (textWidth(title) > canvasWidth - 20) textSize(24 * (canvasWidth - 20) / textWidth(title));
  text(title, canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (finished) drawSummary(46);
  else drawPlay(46);
}

// Word-wrap a string; the first line may have a different width than the rest.
// A single word longer than a line is broken into pieces (needed for long log tokens).
function wrapText(str, maxW, firstW) {
  if (firstW === undefined) firstW = maxW;
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (let w of words) {
    let limit = lines.length === 0 ? firstW : maxW;
    const test = line ? line + ' ' + w : w;
    if (textWidth(test) <= limit) { line = test; continue; }
    if (line) { lines.push(line); line = ''; }
    else if (lines.length === 0 && firstW < maxW) { lines.push(''); }
    limit = maxW;
    while (textWidth(w) > limit) {        // break an over-long word
      let k = w.length - 1;
      while (k > 1 && textWidth(w.slice(0, k)) > limit) k--;
      lines.push(w.slice(0, k));
      w = w.slice(k);
    }
    line = w;
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

// Draw "Label value..." with a bold label and the value wrapping under it; returns new y
function drawLabeled(label, value, x, y, w, lineH) {
  textSize(16);
  textStyle(BOLD);
  const labelW = textWidth(label + ' ');
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(label, x, y);
  textStyle(NORMAL);
  const lines = wrapText(value, w, w - labelW);
  for (let i = 0; i < lines.length; i++) {
    noStroke();
    text(lines[i], i === 0 ? x + labelW : x, y + i * lineH);
  }
  return y + lines.length * lineH;
}

// Measure the log excerpt as [{lines, mono}] at the given width
function layoutExcerpt(ex, w) {
  const blocks = [];
  for (const s of ex.lines) {
    const mono = isLogLine(s);
    if (mono) { textFont('monospace'); textStyle(NORMAL); }
    else { textFont('Arial'); textStyle(ITALIC); }
    textSize(16);
    blocks.push({ mono, lines: wrapText(s, mono ? w - 14 : w) });
  }
  textFont('Arial');
  textStyle(NORMAL);
  return blocks;
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const ex = currentExcerpt();

  // status line
  textSize(16);
  fill('black');
  noStroke();
  y = drawLines(wrapText('Excerpt ' + ex.id + ' of 6  |  Correct so far: ' + score, innerW), pad, y, 20) + 2;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 8;
  textStyle(NORMAL);

  // log excerpt box
  const logW = innerW - 24;
  const blocks = layoutExcerpt(ex, logW);
  let logH = 24 + 8;  // header
  for (const b of blocks) logH += b.lines.length * 20 + 4;
  logH += 8;
  fill('white');
  stroke('dimgray');
  strokeWeight(2);
  rect(pad, y, innerW, logH, 6);
  strokeWeight(1);
  textFont('Arial');
  textSize(16);
  textStyle(BOLD);
  fill('dimgray');
  noStroke();
  textAlign(LEFT, TOP);
  text('Agent log (illustrative)', pad + 12, y + 8);
  textStyle(NORMAL);
  let yy = y + 32;
  for (const b of blocks) {
    if (b.mono) { textFont('monospace'); textStyle(NORMAL); fill('black'); }
    else { textFont('Arial'); textStyle(ITALIC); fill('dimgray'); }
    textSize(16);
    for (let i = 0; i < b.lines.length; i++) {
      noStroke();
      // continuation lines of a log entry are indented
      text(b.lines[i], pad + 12 + (b.mono && i > 0 ? 14 : 0), yy);
      yy += 20;
    }
    yy += 4;
  }
  textFont('Arial');
  textStyle(NORMAL);
  y += logH + 10;

  // the six failure modes. Full boxes (name and definition) are used when they fit together
  // with the feedback; on narrow screens after Submit the list falls back to names only.
  fill('black');
  noStroke();
  textSize(16);
  textStyle(BOLD);
  y = drawLines(wrapText('The six failure modes:', innerW), pad, y, 20) + 4;
  textStyle(NORMAL);
  let list = buildModeBoxes(ex, innerW, false);
  if (y + list.totalH + 4 + feedbackHeight(ex, innerW) > drawHeight - 6) {
    list = buildModeBoxes(ex, innerW, true);
  }
  const gap = list.gap;
  for (let r = 0; r < Math.ceil(MODES.length / list.cols); r++) {
    const row = list.boxes.slice(r * list.cols, r * list.cols + list.cols);
    const rowH = Math.max(...row.map(b => b.h));
    for (let c = 0; c < row.length; c++) {
      const b = row[c];
      const bx = pad + c * (list.boxW + gap);
      if (b.isAnswer) { fill('lavender'); stroke('royalblue'); strokeWeight(4); }
      else if (b.isWrongPick) { fill('papayawhip'); stroke('darkorange'); strokeWeight(4); }
      else if (b.isSelected) { fill('white'); stroke('black'); strokeWeight(3); }
      else { fill('white'); stroke('silver'); strokeWeight(1); }
      rect(bx, y, list.boxW, rowH, 8);
      strokeWeight(1);
      let by;
      if (list.compact) {
        fill('black');
        textStyle(BOLD);
        by = drawLines(b.nameLines, bx + 10, y + 5, 20);
        textStyle(NORMAL);
      } else {
        by = drawLabeled(b.label, b.m.def, bx + 10, y + 5, list.boxW - 20, 20);
      }
      if (b.tag) {
        textStyle(BOLD);
        fill(b.isAnswer ? 'navy' : (b.isWrongPick ? 'saddlebrown' : 'black'));
        noStroke();
        if (b.tagInline) {
          textAlign(RIGHT, TOP);
          text(b.tag, bx + list.boxW - 10, by - 20);
          textAlign(LEFT, TOP);
        } else {
          drawLines(b.tagLines, bx + 10, by, 20);
        }
        textStyle(NORMAL);
      }
    }
    y += rowH + gap;
  }
  y += 4;

  // feedback
  y = drawFeedback(ex, innerW, y);
  layoutBottom = y;
}

// Measure the six mode boxes. compact = names only (used when space is short).
function buildModeBoxes(ex, innerW, compact) {
  const cols = compact ? (innerW >= 620 ? 3 : 2) : (innerW >= 620 ? 2 : 1);
  const gap = 6;
  const boxW = (innerW - (cols - 1) * gap) / cols;
  textSize(16);
  const boxes = MODES.map(m => {
    const isAnswer = submitted && m.name === ex.mode;
    const isWrongPick = submitted && m.name === chosen && m.name !== ex.mode;
    const isSelected = !submitted && m.name === chosen;
    let tag = '';
    if (isAnswer) tag = (m.name === chosen ? '✓ Your choice, correct' : '✓ Correct mode');
    else if (isWrongPick) tag = '✗ Your choice';
    else if (isSelected) tag = '▶ Selected';
    const label = m.name + ':';
    textStyle(BOLD);
    const labelW = textWidth(label + ' ');
    const tagW = tag ? textWidth(tag) : 0;
    const tagLines = tag ? wrapText(tag, boxW - 20) : [];
    const nameLines = wrapText(m.name, boxW - 20);
    textStyle(NORMAL);
    let textLines, lastW;
    if (compact) {
      textLines = nameLines.length;
      lastW = Infinity;   // in the compact list the tag always gets its own line
    } else {
      const defLines = wrapText(m.def, boxW - 20, boxW - 20 - labelW);
      textLines = defLines.length;
      lastW = (defLines.length === 1 ? labelW : 0) + textWidth(defLines[defLines.length - 1]);
    }
    // the tag sits at the right end of the last line when it fits, otherwise on its own line(s)
    const tagInline = tag !== '' && lastW + 16 + tagW <= boxW - 20;
    const h = (textLines + (tag && !tagInline ? tagLines.length : 0)) * 20 + 10;
    return { m, isAnswer, isWrongPick, isSelected, tag, tagLines, tagInline, label, nameLines, h };
  });
  let totalH = 0;
  for (let r = 0; r < Math.ceil(MODES.length / cols); r++) {
    totalH += Math.max(...boxes.slice(r * cols, r * cols + cols).map(b => b.h)) + gap;
  }
  return { compact, cols, gap, boxW, boxes, totalH };
}

// The feedback lines under the mode list as [{text, size, bold, color, lineH, label}]
function feedbackParts(ex) {
  if (!submitted) {
    const msg = chosen === ''
      ? 'Choose a failure mode in the drop-down below, then press Submit. Each excerpt gets one attempt.'
      : chosen + ' is selected. Press Submit to commit it, or choose another mode.';
    return [{ text: msg, size: 16, bold: false, color: 'black', lineH: 20 }];
  }
  const correct = isCorrect(ex, chosen);
  return [
    { text: correct ? '✓ Correct: ' + ex.mode + '.' : '✗ This is ' + ex.mode + '.',
      size: 18, bold: true, color: correct ? 'navy' : 'saddlebrown', lineH: 24 },
    { text: ex.why, size: 16, bold: false, color: 'black', lineH: 20, after: 4 },
    { label: 'Mechanical defense:', text: modeByName(ex.mode).defense + '.', size: 16, lineH: 20 }
  ];
}

function feedbackHeight(ex, innerW) {
  let h = 0;
  for (const p of feedbackParts(ex)) {
    textSize(p.size);
    if (p.label) {
      textStyle(BOLD);
      const lw = textWidth(p.label + ' ');
      textStyle(NORMAL);
      h += wrapText(p.text, innerW, innerW - lw).length * p.lineH;
    } else {
      textStyle(p.bold ? BOLD : NORMAL);
      h += wrapText(p.text, innerW).length * p.lineH + (p.after || 0);
    }
  }
  textStyle(NORMAL);
  textSize(16);
  return h;
}

function drawFeedback(ex, innerW, y) {
  for (const p of feedbackParts(ex)) {
    if (p.label) {
      y = drawLabeled(p.label, p.text, pad, y, innerW, p.lineH);
    } else {
      textSize(p.size);
      textStyle(p.bold ? BOLD : NORMAL);
      fill(p.color);
      y = drawLines(wrapText(p.text, innerW), pad, y, p.lineH) + (p.after || 0);
    }
  }
  textStyle(NORMAL);
  textSize(16);
  return y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(16);
  fill('black');
  noStroke();
  y = drawLines(['All six excerpts answered.'], pad, y, 20) + 4;

  // score
  textSize(24);
  textStyle(BOLD);
  y = drawLines([score + ' of 6 correct'], pad, y, 30);
  textSize(16);
  const met = masteryMet(score);
  fill(met ? 'navy' : 'saddlebrown');
  const masteryStr = met
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 6 correct.'
    : '✗ Mastery threshold not met: at least ' + MASTERY + ' of 6 correct are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 12;
  textStyle(NORMAL);

  fill('black');
  y = drawLines(wrapText('Press Start Over to read the six excerpts again in the same order.', innerW),
    pad, y, 20);
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

// Allow the answer key to be tested in Node.js; ignored in the browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MODES, EXCERPTS, MASTERY, isCorrect, masteryMet, modeByName, isLogLine };
}
