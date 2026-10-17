// Skill Failure Mode Classifier MicroSim
// CANVAS_HEIGHT: 820
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner attributes each of eight illustrative skill problems, in a fixed order, to one of
// six failure modes: undertriggering, overtriggering, instruction drift, missing dependency,
// stale reference, and scope creep. One attempt per observation, the correct mode and the "Why"
// sentence are always revealed, and the final screen shows "n of 8 correct", whether the mastery
// threshold of 7 was met, and the recommended fix for each mode that was missed.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 740;
// Control region: up to two rows of controls = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let fs = 16;                // current base font size (reduced at narrow widths if needed)
let lh = 20;                // current line height

// Color-blind-safe colors (Okabe-Ito blue and vermillion, darkened for text contrast).
// Every color cue is paired with a symbol and words (check mark / X, "Correct" / "This is").
const OK_STROKE = '#0072B2';
const OK_TEXT = '#005A8C';
const OK_FILL = '#E3F1FA';
const BAD_STROKE = '#D55E00';
const BAD_TEXT = '#A0410D';
const BAD_FILL = '#FBE9DD';

// ---------------------------------------------------------------
// Content
// The six modes and their definitions are from the section "Failure Modes and Maintenance".
// The recommended fixes are drawn from the same chapter (description, short SKILL.md,
// reference documents, README and clean-machine tests, dating references, splitting skills).
// ---------------------------------------------------------------
const MODES = [
  { name: 'Undertriggering',
    def: 'the skill is not used when it should be. The cause is almost always the description.',
    fix: 'Revise the description to name the task, the inputs it recognizes, and the phrasings ' +
      'that call for it, then rerun the should-trigger tests.' },
  { name: 'Overtriggering',
    def: 'the skill loads on requests it cannot handle. The cause is a description that is too broad.',
    fix: 'Narrow the description to the task the skill can handle, and add near-miss requests ' +
      'to the should-not-trigger tests.' },
  { name: 'Instruction drift',
    def: 'the skill loads, but the agent skips or reorders steps. The cause is usually a SKILL.md ' +
      'that is too long or a step that is not checkable.',
    fix: 'Shorten SKILL.md to five to ten numbered, checkable steps, and move long material into ' +
      'reference documents.' },
  { name: 'Missing dependency',
    def: 'a script needs a library, tool, or file that is not present on the machine where the skill runs.',
    fix: 'List the dependencies in the README, and run the test set on a clean machine, not only on yours.' },
  { name: 'Stale reference',
    def: 'a reference document or a hard-coded path is out of date, so the skill gives a confident ' +
      'but obsolete answer.',
    fix: 'Update and date the reference document, rerun the test set, and record in the skill\'s ' +
      'metadata when it was last verified.' },
  { name: 'Scope creep',
    def: 'the skill has accumulated extra jobs and now does none of them reliably.',
    fix: 'Split the skill into single-purpose skills, and let them be composed.' }
];

// mode is the index into MODES (verbatim observations and "Why" sentences from the specification)
const OBSERVATIONS = [
  { id: 1, text: 'The user asked for an ENOB report in plain words and the agent did not use the skill at all.',
    mode: 0, why: 'The skill was not loaded for a request it covers, which points to the description.' },
  { id: 2, text: 'Asked to plot a spectrum, the agent loaded the ENOB skill and produced a report nobody wanted.',
    mode: 1, why: 'The skill loaded for a request it does not cover, which points to a description that is too broad.' },
  { id: 3, text: 'The skill loaded, but the agent never ran the acceptance check in step 4 and reported success.',
    mode: 2, why: 'The skill loaded and a step was skipped, which points to long or uncheckable instructions.' },
  { id: 4, text: 'The skill\'s script fails with "No module named scipy" on a colleague\'s machine.',
    mode: 3, why: 'The script needs a library that is not installed where the skill runs.' },
  { id: 5, text: 'The report compares the result with a 9.0-bit target, but the project\'s target was raised to 9.5 bits last month.',
    mode: 4, why: 'The reference document was not updated when the requirement changed.' },
  { id: 6, text: 'The skill now also converts units, drafts the paper\'s abstract, and files tickets, and its ENOB reports have become unreliable.',
    mode: 5, why: 'The skill has accumulated extra jobs and does none reliably.' },
  { id: 7, text: 'A request that says "check the ENOB of this converter" was ignored, but "give me an ENOB report" works.',
    mode: 0, why: 'The description names only one phrasing of the task, so a covered request was missed.' },
  { id: 8, text: 'After a model update the skill runs, but the agent summarizes the procedure instead of executing steps 2 and 3.',
    mode: 2, why: 'The skill loaded, and the agent departed from the steps, which points to instructions that need to be shorter or checkable.' }
];

const QUESTION = 'Which failure mode explains this?';
const PLACEHOLDER = 'Choose a failure mode...';
const MASTERY = 7;   // mastery requires at least 7 of 8 correct on the first attempt

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let pos = 0;             // index of the current observation (fixed order, 0..7)
let selected = -1;       // mode selected but not yet submitted
let committed = false;   // has the current observation been submitted?
let score = 0;           // correct answers so far
let results = [];        // results[i] = the submitted mode index for observation i
let finished = false;    // summary screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let modeSelect;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(132);   // Skill Failure Modes
let lrs = null, obsStart = 0;
let actionButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  modeSelect = createSelect();
  modeSelect.parent(document.querySelector('main'));
  modeSelect.option(PLACEHOLDER);
  for (const m of MODES) modeSelect.option(m.name);
  modeSelect.disable(PLACEHOLDER);
  modeSelect.selected(PLACEHOLDER);
  modeSelect.style('font-size', '16px');
  modeSelect.style('padding', '3px 4px');
  modeSelect.attribute('aria-label', 'Failure mode');
  modeSelect.changed(modeChanged);

  actionButton = createButton('Submit');
  actionButton.parent(document.querySelector('main'));
  actionButton.style('font-size', '16px');
  actionButton.style('padding', '4px 10px');
  actionButton.style('white-space', 'nowrap');
  actionButton.mouseClicked(actionPressed);

  updateControls();

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Skill Failure Mode Classifier', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Skill Failure Mode Classifier MicroSim', pageDwell: true });
  }
  obsStart = Date.now();

  describe('Skill Failure Mode Classifier. One of eight illustrative observations of a misbehaving ' +
    'agent skill is shown with the six failure modes and their definitions. Choose a mode in the ' +
    'drop-down list and press Submit. The sim says whether the choice was correct, names the correct ' +
    'mode, and gives the reason. After eight observations it shows n of 8 correct, whether the ' +
    'mastery threshold of 7 was met, and the recommended fix for each mode that was missed.');

  noLoop(); // nothing animates; redraw only when the state changes
}

// ---------------------------------------------------------------
// Activity logic
// ---------------------------------------------------------------
function modeChanged() {
  if (finished || committed) return;
  selected = MODES.findIndex(m => m.name === modeSelect.value());
  updateControls();
  redraw();
}

function actionPressed() {
  if (finished) return;
  if (!committed) {
    // Submit: one attempt per observation, committed at once
    if (selected < 0) return;
    committed = true;
    results[pos] = selected;
    if (lrs) lrs.question('q-observation-' + OBSERVATIONS[pos].id, { name: 'Observation ' + OBSERVATIONS[pos].id + ': ' + OBSERVATIONS[pos].text,
                                                                      concept: PAGE_CONCEPT() })
      .answer({ success: selected === OBSERVATIONS[pos].mode, response: LRS.slug(MODES[selected].name),
                durationMs: Date.now() - obsStart });
    if (selected === OBSERVATIONS[pos].mode) score++;
  } else if (pos < OBSERVATIONS.length - 1) {
    pos++;
    obsStart = Date.now();
    committed = false;
    selected = -1;
    modeSelect.selected(PLACEHOLDER);
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
    actionButton.hide();
    return;
  }
  modeSelect.show();
  modeSelect.elt.disabled = committed;
  actionButton.show();
  if (!committed) {
    actionButton.html('Submit');
    setEnabled(actionButton, selected >= 0);
  } else {
    actionButton.html(pos === OBSERVATIONS.length - 1 ? 'See Score' : 'Next Observation');
    setEnabled(actionButton, true);
  }
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Place the drop-down and the button on one row, wrapping the button when the width is narrow
function layoutControls() {
  if (finished) return;
  const gap = 10;
  let x = 10;
  let y = drawHeight + 8;
  for (const c of [modeSelect, actionButton]) {
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
  // Draw at the normal text size; if the content does not fit at this width,
  // repaint with a slightly smaller size (never below 14 px).
  for (const s of [16, 15, 14]) {
    fs = s;
    lh = Math.round(s * 1.25);
    paint();
    if (layoutBottom <= drawHeight - 4) break;
  }
}

function paint() {
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
  textSize(fs + 6);
  text('Skill Failure Mode Classifier', canvasWidth / 2, 10);
  textStyle(NORMAL);

  const y = 10 + fs + 14;
  if (finished) drawSummary(y);
  else drawPlay(y);

  if (finished) {
    fill('dimgray');
    noStroke();
    textSize(fs);
    drawLines(wrapText('All 8 observations answered. Reload the page to start over.',
      canvasWidth - 2 * pad), pad, drawHeight + 12, lh);
  }
}

// Word-wrap a string to a maximum width using the current text settings.
// firstW (optional) is the width available on the first line.
function wrapText(str, maxW, firstW) {
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    const limit = lines.length === 0 && firstW !== undefined ? firstW : maxW;
    if (line && textWidth(test) > limit) {
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

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const obs = OBSERVATIONS[pos];

  // status line and provenance label
  textSize(fs);
  fill('black');
  y = drawLines(wrapText('Observation ' + (pos + 1) + ' of 8  |  Correct so far: ' + score +
    '  |  Observations are illustrative', innerW), pad, y, lh) + 2;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, lh) + 6;
  textStyle(NORMAL);

  // observation card
  textSize(fs + 2);
  textStyle(BOLD);
  const cardLines = wrapText(obs.id + '. ' + obs.text, innerW - 24);
  const cardLh = lh + 3;
  const cardH = cardLines.length * cardLh + 18;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  fill('black');
  drawLines(cardLines, pad + 12, y + 10, cardLh);
  textStyle(NORMAL);
  y += cardH + 10;

  // the six failure modes with their definitions
  textSize(fs);
  textStyle(BOLD);
  fill('black');
  y = drawLines(['The six failure modes'], pad, y, lh) + 2;
  for (let m = 0; m < MODES.length; m++) {
    const isAnswer = committed && m === obs.mode;
    const isWrongPick = committed && m === results[pos] && m !== obs.mode;
    const isSelected = !committed && m === selected;
    let marker = '';
    if (isAnswer) marker = '✓ ';
    else if (isWrongPick) marker = '✗ ';
    else if (isSelected) marker = '▶ ';

    // bold "name:" prefix followed by the definition, wrapped as one paragraph
    textStyle(BOLD);
    const prefix = marker + MODES[m].name + ': ';
    const prefixW = textWidth(prefix);
    textStyle(NORMAL);
    const boxInner = innerW - 16;
    const defLines = wrapText(MODES[m].def, boxInner, Math.max(40, boxInner - prefixW));
    const boxH = defLines.length * lh + 8;

    if (isAnswer) { fill(OK_FILL); stroke(OK_STROKE); strokeWeight(3); }
    else if (isWrongPick) { fill(BAD_FILL); stroke(BAD_STROKE); strokeWeight(3); }
    else if (isSelected) { fill('white'); stroke('black'); strokeWeight(3); }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(pad, y, innerW, boxH, 6);
    strokeWeight(1);

    noStroke();
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    fill(isAnswer ? OK_TEXT : (isWrongPick ? BAD_TEXT : 'black'));
    text(prefix, pad + 8, y + 4);
    textStyle(NORMAL);
    fill('black');
    for (let i = 0; i < defLines.length; i++) {
      text(defLines[i], pad + 8 + (i === 0 ? prefixW : 0), y + 4 + i * lh);
    }
    y += boxH + 4;
  }
  y += 6;

  // feedback area
  if (!committed) {
    fill('black');
    const msg = selected < 0
      ? 'Choose one mode in the list below, then press Submit. Each observation gets one attempt.'
      : 'Your choice: ' + MODES[selected].name + '. Press Submit to commit it.';
    y = drawLines(wrapText(msg, innerW), pad, y, lh);
  } else {
    const correct = results[pos] === obs.mode;
    textStyle(BOLD);
    const head = correct
      ? '✓ Correct: ' + MODES[obs.mode].name + '.'
      : '✗ This is ' + MODES[obs.mode].name + '. (You chose ' + MODES[results[pos]].name + '.)';
    const headLines = wrapText(head, innerW - 20);
    textStyle(NORMAL);
    const whyLines = wrapText('Why: ' + obs.why, innerW - 20);
    const boxH = (headLines.length + whyLines.length) * lh + 14;
    fill(correct ? OK_FILL : BAD_FILL);
    stroke(correct ? OK_STROKE : BAD_STROKE);
    strokeWeight(2);
    rect(pad, y, innerW, boxH, 8);
    strokeWeight(1);
    fill(correct ? OK_TEXT : BAD_TEXT);
    textStyle(BOLD);
    const fy = drawLines(headLines, pad + 10, y + 7, lh);
    textStyle(NORMAL);
    fill('black');
    drawLines(whyLines, pad + 10, fy, lh);
    y += boxH;
  }
  layoutBottom = y;
}

// Modes the learner missed: the correct mode of every observation answered incorrectly,
// in the order of the MODES list, each with the observation numbers that were missed.
function missedModes() {
  const out = [];
  for (let m = 0; m < MODES.length; m++) {
    const ids = [];
    for (let i = 0; i < OBSERVATIONS.length; i++) {
      if (OBSERVATIONS[i].mode === m && results[i] !== undefined && results[i] !== m) {
        ids.push(OBSERVATIONS[i].id);
      }
    }
    if (ids.length > 0) out.push({ mode: m, ids: ids });
  }
  return out;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  // score
  textSize(fs + 8);
  textStyle(BOLD);
  fill('black');
  y = drawLines([score + ' of 8 correct'], pad, y, fs + 14);
  textSize(fs);
  const mastered = score >= MASTERY;
  fill(mastered ? OK_TEXT : BAD_TEXT);
  const masteryStr = mastered
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 8 correct.'
    : '✗ Mastery threshold not met: at least ' + MASTERY + ' of 8 correct are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, lh) + 10;
  textStyle(NORMAL);

  const missed = missedModes();
  fill('black');
  textStyle(BOLD);
  y = drawLines(wrapText('Recommended fix for each mode you missed:', innerW), pad, y, lh) + 4;
  textStyle(NORMAL);

  if (missed.length === 0) {
    y = drawLines(wrapText('None. Every observation was attributed to the correct mode.', innerW),
      pad, y, lh);
    layoutBottom = y;
    return;
  }

  for (const mm of missed) {
    textStyle(BOLD);
    const label = MODES[mm.mode].name + ' (missed observation' + (mm.ids.length > 1 ? 's ' : ' ') +
      mm.ids.join(' and ') + ')';
    const tLines = wrapText(label, innerW - 20);
    textStyle(NORMAL);
    const dLines = wrapText('Fix: ' + MODES[mm.mode].fix, innerW - 20);
    const h = (tLines.length + dLines.length) * lh + 12;
    fill('white');
    stroke(BAD_STROKE);
    strokeWeight(1);
    rect(pad, y, innerW, h, 8);
    fill('black');
    textStyle(BOLD);
    const yy = drawLines(tLines, pad + 10, y + 6, lh);
    textStyle(NORMAL);
    drawLines(dLines, pad + 10, yy, lh);
    y += h + 6;
  }
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
