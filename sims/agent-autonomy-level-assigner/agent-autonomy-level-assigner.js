// Agent Autonomy Level Assigner MicroSim
// CANVAS_HEIGHT: 830
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner recommends an autonomy level (0 to 3) for each of eight illustrative research
// tasks from three attributes: reversible, leaves your control (reach), and verifiable quickly.
// One attempt per task in a fixed order. The correct level, the "Why" sentence, and the rule
// that applied are revealed after each attempt. The final screen shows n of 8 correct, whether
// the mastery threshold of 7 was met, and how many tasks fell at each level.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 750;
// Control region: two rows of buttons = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const LEVELS = [
  { n: 0, name: 'Suggest only', may: 'Propose; you perform the action' },
  { n: 1, name: 'Approve each step', may: 'Act after you approve each action' },
  { n: 2, name: 'Act within a boundary', may: 'Act freely inside a defined scope, and stop at gates for your approval' },
  { n: 3, name: 'Act and report', may: 'Act unattended and report afterwards' }
];

const TASKS = [
  { id: 1, task: "Reformat the entries of refs.bib to a venue's style",
    reversible: 'Yes, in version control', leaves: 'No',
    verifiable: 'Yes, the document compiles and entries can be diffed', level: 3,
    why: 'Local, reversible, and verifiable, so it can act and report.' },
  { id: 2, task: 'Draft a related-work paragraph for your paper',
    reversible: 'Yes', leaves: 'No',
    verifiable: 'No, claims need reading the cited papers', level: 2,
    why: 'Local and reversible, but quality needs a human read, so it works within a boundary and stops at a gate.' },
  { id: 3, task: 'Email a summary of the results to a collaborator',
    reversible: 'No', leaves: 'Yes', verifiable: 'No', level: 0,
    why: 'It leaves your control and cannot be checked, so the agent suggests and you send.' },
  { id: 4, task: "Push the analysis branch to the group's shared repository",
    reversible: 'No', leaves: 'Yes',
    verifiable: 'Yes, the diff and test results can be checked', level: 1,
    why: 'It leaves your control, so each step needs your approval, though it is checkable.' },
  { id: 5, task: 'Delete intermediate files under results/tmp/',
    reversible: 'No', leaves: 'No', verifiable: 'Yes, a dry run lists them', level: 1,
    why: 'It is local but cannot be undone, so each step needs approval.' },
  { id: 6, task: 'Run the nightly parameter sweep and save results to a new folder',
    reversible: 'Yes', leaves: 'No', verifiable: 'Yes, a check script validates the output', level: 3,
    why: 'Local, reversible, and verifiable, so it can act and report.' },
  { id: 7, task: 'Refactor an analysis script that has no tests',
    reversible: 'Yes', leaves: 'No', verifiable: 'No', level: 2,
    why: 'Reversible and local, but without tests the result cannot be checked quickly, so a human read is needed.' },
  { id: 8, task: "Submit a job that spends the lab's shared compute quota",
    reversible: 'No', leaves: 'Yes', verifiable: 'Yes, the job\'s parameters can be reviewed', level: 1,
    why: 'It leaves your control, so each step needs approval.' }
];

// The assignment rule, applied in this order (first match wins)
const RULES = [
  { text: 'If Leaves your control is Yes and Verifiable is No, the level is 0.',
    test: (rev, leaves, ver) => leaves && !ver, level: 0 },
  { text: 'If Leaves your control is Yes and Verifiable is Yes, the level is 1.',
    test: (rev, leaves, ver) => leaves && ver, level: 1 },
  { text: 'If Leaves your control is No and Reversible is No, the level is 1.',
    test: (rev, leaves, ver) => !leaves && !rev, level: 1 },
  { text: 'If Leaves your control is No, Reversible is Yes, and Verifiable is No, the level is 2.',
    test: (rev, leaves, ver) => !leaves && rev && !ver, level: 2 },
  { text: 'If Leaves your control is No, Reversible is Yes, and Verifiable is Yes, the level is 3.',
    test: (rev, leaves, ver) => !leaves && rev && ver, level: 3 }
];

const QUESTION = 'How much should the agent do on its own?';
const MASTERY = 7;   // mastery requires at least 7 of 8 correct

function isYes(s) { return s.indexOf('Yes') === 0; }

// Returns the index of the first rule that applies to a task
function ruleIndexFor(t) {
  const rev = isYes(t.reversible), leaves = isYes(t.leaves), ver = isYes(t.verifiable);
  for (let i = 0; i < RULES.length; i++) {
    if (RULES[i].test(rev, leaves, ver)) return i;
  }
  return -1;
}

function computeLevel(t) {
  const i = ruleIndexFor(t);
  return i < 0 ? -1 : RULES[i].level;
}

// The table and the rule must agree; report any disagreement in the console
function checkAnswerKey() {
  let ok = true;
  for (const t of TASKS) {
    if (computeLevel(t) !== t.level) {
      ok = false;
      console.error('Task ' + t.id + ': table says level ' + t.level + ', rule gives ' + computeLevel(t));
    }
  }
  return ok;
}

function masteryMet(score) { return score >= MASTERY; }

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let taskPos = 0;         // 0..7, fixed order
let selected = -1;       // level chosen but not yet submitted
let submitted = false;   // has the current task been answered?
let score = 0;
let answers = [];        // level submitted for each task
let finished = false;
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let levelButtons = [];
let submitButton;
let nextButton;
let startOverButton;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(158);   // Agent Autonomy
let lrs = null, taskStart = 0;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let n = 0; n < LEVELS.length; n++) {
    const b = createButton('Level ' + n);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.attribute('aria-label', 'Level ' + n + ': ' + LEVELS[n].name);
    b.attribute('aria-pressed', 'false');
    onActivate(b, () => chooseLevel(n));
    levelButtons.push(b);
  }
  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  onActivate(submitButton, submitPressed);

  nextButton = createButton('Next Task');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  onActivate(nextButton, nextPressed);

  startOverButton = createButton('Start Over');
  startOverButton.parent(document.querySelector('main'));
  styleButton(startOverButton);
  onActivate(startOverButton, startOver);

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Agent Autonomy Level Assigner', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Agent Autonomy Level Assigner MicroSim', pageDwell: true });
  }

  checkAnswerKey();
  startOver();

  describe('Agent Autonomy Level Assigner. One illustrative research task is shown at a time with ' +
    'three attributes: whether it is reversible, whether it leaves your control, and whether it is ' +
    'verifiable quickly. Choose Level 0 Suggest only, Level 1 Approve each step, Level 2 Act within ' +
    'a boundary, or Level 3 Act and report, then press Submit. The sim says whether the level is ' +
    'correct, gives the reason and the rule that applied. After eight tasks it shows the score out ' +
    'of 8, whether the mastery threshold of 7 was met, and how many tasks fell at each level.');

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
  taskPos = 0;
  selected = -1;
  submitted = false;
  score = 0;
  answers = [];
  finished = false;
  taskStart = Date.now();
  updateControls();
  redraw();
}

function currentTask() {
  return TASKS[taskPos];
}

// Choosing a level does not commit it; Submit does
function chooseLevel(n) {
  if (finished || submitted) return;
  selected = n;
  updateControls();
  redraw();
}

// One attempt per task
function submitPressed() {
  if (finished || submitted || selected < 0) return;
  if (lrs) lrs.question('q-task-' + currentTask().id, { name: 'Task ' + currentTask().id + ': ' + currentTask().task, concept: PAGE_CONCEPT() })
    .answer({ success: selected === currentTask().level, response: 'level-' + selected,
              durationMs: taskStart ? Date.now() - taskStart : undefined });
  submitted = true;
  answers.push(selected);
  if (selected === currentTask().level) score++;
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished || !submitted) return;
  if (taskPos < TASKS.length - 1) {
    taskPos++;
    selected = -1;
    submitted = false;
    taskStart = Date.now();
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  for (let n = 0; n < levelButtons.length; n++) {
    const b = levelButtons[n];
    if (finished) { b.hide(); continue; }
    b.show();
    setEnabled(b, !submitted);
    const on = n === selected;
    b.attribute('aria-pressed', on ? 'true' : 'false');
    b.style('font-weight', on ? 'bold' : 'normal');
    b.style('outline', on ? '3px solid black' : 'none');
    b.style('outline-offset', '1px');
  }
  if (finished) {
    submitButton.hide();
    nextButton.hide();
    startOverButton.show();
  } else {
    submitButton.show();
    nextButton.show();
    startOverButton.hide();
    setEnabled(submitButton, !submitted && selected >= 0);
    nextButton.html(taskPos === TASKS.length - 1 ? 'See Score' : 'Next Task');
    setEnabled(nextButton, submitted);
  }
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the visible buttons left to right, wrapping onto a second row when needed
function layoutControls() {
  const visible = [];
  if (finished) {
    visible.push(startOverButton);
  } else {
    for (const b of levelButtons) visible.push(b);
    visible.push(submitButton);
    visible.push(nextButton);
  }
  const gap = 10;
  let x = 10;
  let y = drawHeight + 8;
  for (let i = 0; i < visible.length; i++) {
    const b = visible[i];
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
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(24);
  const title = 'Agent Autonomy Level Assigner';
  // shrink the title only when it would not fit on a narrow screen
  if (textWidth(title) > canvasWidth - 20) textSize(24 * (canvasWidth - 20) / textWidth(title));
  text(title, canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (finished) drawSummary(46);
  else drawPlay(46);
}

// Word-wrap a string; the first line may have a different width than the rest
function wrapText(str, maxW, firstW) {
  if (firstW === undefined) firstW = maxW;
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const limit = lines.length === 0 ? firstW : maxW;
    const test = line ? line + ' ' + w : w;
    if (textWidth(test) > limit) {
      if (line) { lines.push(line); line = w; }
      else if (lines.length === 0 && firstW < maxW) { lines.push(''); line = w; } // start below the label
      else line = test;   // a single word longer than the line: keep it whole
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

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const t = currentTask();

  // status line
  textSize(16);
  fill('black');
  noStroke();
  y = drawLines(wrapText('Task ' + t.id + ' of 8 (illustrative)  |  Correct so far: ' + score,
    innerW), pad, y, 20) + 2;

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 8;
  textStyle(NORMAL);

  // task card: measure first, then draw
  const cardW = innerW - 24;
  textSize(18);
  textStyle(BOLD);
  const taskLines = wrapText(t.task, cardW);
  textStyle(NORMAL);
  const attrs = [['Reversible?', t.reversible], ['Leaves your control?', t.leaves],
    ['Verifiable quickly?', t.verifiable]];
  textSize(16);
  let attrH = 0;
  for (const a of attrs) {
    textStyle(BOLD);
    const lw = textWidth(a[0] + ' ');
    textStyle(NORMAL);
    attrH += wrapText(a[1], cardW, cardW - lw).length * 20 + 4;
  }
  const cardH = taskLines.length * 23 + 8 + attrH + 16;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  textSize(18);
  textStyle(BOLD);
  fill('black');
  let yy = drawLines(taskLines, pad + 12, y + 10, 23) + 6;
  textStyle(NORMAL);
  for (const a of attrs) {
    yy = drawLabeled(a[0], a[1], pad + 12, yy, cardW, 20) + 4;
  }
  y += cardH + 10;

  // the four levels: a 2 x 2 grid on wide screens, one column on narrow screens
  textSize(16);
  fill('black');
  noStroke();
  textStyle(BOLD);
  y = drawLines(wrapText('The four levels and what the agent may do:', innerW), pad, y, 20) + 4;
  textStyle(NORMAL);
  const cols = innerW >= 620 ? 2 : 1;
  const gap = 8;
  const boxW = (innerW - (cols - 1) * gap) / cols;
  const boxes = LEVELS.map(L => {
    const isAnswer = submitted && L.n === t.level;
    const isWrongPick = submitted && L.n === selected && L.n !== t.level;
    const isSelected = !submitted && L.n === selected;
    let tag = '';
    if (isAnswer) tag = (L.n === selected ? '✓ Your choice, the rule\'s level' : '✓ The rule\'s level');
    else if (isWrongPick) tag = '✗ Your choice';
    else if (isSelected) tag = '▶ Selected';
    const label = 'Level ' + L.n + ': ' + L.name + '.';
    textStyle(BOLD);
    const labelW = textWidth(label + ' ');
    const tagLines = tag ? wrapText(tag, boxW - 20) : [];
    const tagW = tag ? textWidth(tag) : 0;
    textStyle(NORMAL);
    const mayLines = wrapText(L.may, boxW - 20, boxW - 20 - labelW);
    const last = mayLines[mayLines.length - 1];
    const lastW = (mayLines.length === 1 ? labelW : 0) + textWidth(last);
    // the tag sits at the right end of the last line when it fits, otherwise on its own line
    const tagInline = tag && lastW + 16 + tagW <= boxW - 20;
    const h = (mayLines.length + (tagInline ? 0 : tagLines.length)) * 20 + 14;
    return { L, isAnswer, isWrongPick, isSelected, label, mayLines, tagLines, tagInline, h };
  });
  for (let r = 0; r < LEVELS.length / cols; r++) {
    const row = boxes.slice(r * cols, r * cols + cols);
    const rowH = Math.max(...row.map(b => b.h));
    for (let c = 0; c < row.length; c++) {
      const b = row[c];
      const bx = pad + c * (boxW + gap);
      if (b.isAnswer) { fill('lavender'); stroke('royalblue'); strokeWeight(4); }
      else if (b.isWrongPick) { fill('papayawhip'); stroke('darkorange'); strokeWeight(4); }
      else if (b.isSelected) { fill('white'); stroke('black'); strokeWeight(3); }
      else { fill('white'); stroke('silver'); strokeWeight(1); }
      rect(bx, y, boxW, rowH, 8);
      strokeWeight(1);
      const by = drawLabeled(b.label, b.L.may, bx + 10, y + 7, boxW - 20, 20);
      if (b.tagLines.length) {
        textStyle(BOLD);
        fill(b.isAnswer ? 'navy' : (b.isWrongPick ? 'saddlebrown' : 'black'));
        if (b.tagInline) {
          noStroke();
          textAlign(RIGHT, TOP);
          text(b.tagLines[0], bx + boxW - 10, by - 20);
          textAlign(LEFT, TOP);
        } else {
          drawLines(b.tagLines, bx + 10, by, 20);
        }
        textStyle(NORMAL);
      }
    }
    y += rowH + gap;
  }
  y += 2;

  // feedback
  textSize(16);
  fill('black');
  if (!submitted) {
    const msg = selected < 0
      ? 'Choose a level with the buttons below, then press Submit. Each task gets one attempt.'
      : 'Level ' + selected + ' is selected. Press Submit to commit it, or choose another level.';
    y = drawLines(wrapText(msg, innerW), pad, y, 20);
  } else {
    const correct = selected === t.level;
    textSize(18);
    textStyle(BOLD);
    fill(correct ? 'navy' : 'saddlebrown');
    const head = correct ? '✓ Correct: level ' + t.level + '.' : '✗ The rule gives level ' + t.level + '.';
    y = drawLines(wrapText(head, innerW), pad, y, 24);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    y = drawLines(wrapText(t.why, innerW), pad, y, 20) + 4;
    y = drawLabeled('Rule applied:', RULES[ruleIndexFor(t)].text, pad, y, innerW, 20);
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(16);
  fill('black');
  noStroke();
  y = drawLines(['All eight tasks answered.'], pad, y, 20) + 4;

  // score
  textSize(24);
  textStyle(BOLD);
  y = drawLines([score + ' of 8 correct'], pad, y, 30);
  textSize(16);
  const met = masteryMet(score);
  fill(met ? 'navy' : 'saddlebrown');
  const masteryStr = met
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 8 correct.'
    : '✗ Mastery threshold not met: at least ' + MASTERY + ' of 8 correct are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 12;
  textStyle(NORMAL);

  // how many tasks fell at each level (by the rule)
  fill('black');
  textStyle(BOLD);
  y = drawLines(wrapText('How many tasks fell at each level:', innerW), pad, y, 20) + 6;
  textStyle(NORMAL);
  for (const L of LEVELS) {
    const ids = TASKS.filter(t => t.level === L.n).map(t => t.id);
    const count = ids.length + (ids.length === 1 ? ' task' : ' tasks');
    const which = ' (task' + (ids.length === 1 ? ' ' : 's ') + ids.join(', ') + ')';
    const label = 'Level ' + L.n + ', ' + L.name + ':';
    textStyle(BOLD);
    const labelW = textWidth(label + ' ');
    textStyle(NORMAL);
    const lines = wrapText(count + which, innerW - 20, innerW - 20 - labelW);
    const h = lines.length * 20 + 12;
    fill('white');
    stroke('silver');
    rect(pad, y, innerW, h, 8);
    y = drawLabeled(label, count + which, pad + 10, y + 6, innerW - 20, 20) + 12;
  }
  y += 6;
  fill('black');
  noStroke();
  textSize(16);
  y = drawLines(wrapText('Press Start Over to try the eight tasks again in the same order.', innerW),
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

// Allow the answer key and rules to be tested in Node.js; ignored in the browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TASKS, LEVELS, RULES, MASTERY, computeLevel, ruleIndexFor, checkAnswerKey, masteryMet };
}
