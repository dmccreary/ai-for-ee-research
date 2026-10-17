// Agent Loop Stepper MicroSim
// CANVAS_HEIGHT: 845
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner steps through a five-step agent loop that diagnoses a low ENOB result.
// At each step the learner predicts the agent's next action (A, B, or C) before it is shown.
// One attempt per step, fixed order. The sim then reveals the agent's action, shows the model
// emitting the call, the harness running it, and the result being added to the context.
// After step 5 it shows "n of 5 correct" (mastery at 4 or more) and the full loop.
// The design is width responsive: two columns on wide screens, one column on narrow screens.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 765;
// Control region: up to two rows of buttons = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let bodySize = 15;          // body text size; 14 on narrow screens (set in draw)
let lineH = 19;             // body line height; 17 on narrow screens (set in draw)

// Color-blind-safe colors (Okabe-Ito). Meaning is always also carried by a symbol and words.
const BLUE = '#0072B2';        // correct, the agent's action
const BLUE_FILL = '#E3F0FA';
const VERMILLION = '#D55E00';  // incorrect
const VERMILLION_FILL = '#FBE6DA';
const ACTIVE_FILL = '#FFF1B8';  // active stage of the loop (also marked with a triangle)

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const TASK = 'The ENOB of capture-07.csv is 6.1 bits but the converter should give about 9. Find out why.';
const TOOLS = ['read_file', 'run_python', 'list_files'];
const LETTERS = ['A', 'B', 'C'];

// observed: "Result observed so far" at this step
// candidates: Candidate A, B, C; correct: index of the correct candidate
// result: what the correct action returns (it becomes the next step's observed result);
//         null for step 5, which is a final answer and not a tool call
const STEPS = [
  { observed: 'Nothing yet.',
    candidates: ['list_files on the project root',
                 'run_python to recompute ENOB with a different formula',
                 'read_file on the paper draft'],
    correct: 0,
    why: 'The agent knows nothing about the project, so it looks at what exists before acting.',
    result: 'Files: data/raw/capture-07.csv, scripts/enob.py, docs/spec.md.' },
  { observed: 'Files: data/raw/capture-07.csv, scripts/enob.py, docs/spec.md.',
    candidates: ['list_files on data/raw',
                 'read_file scripts/enob.py',
                 'read_file data/raw/capture-07.csv'],
    correct: 1,
    why: 'The result is computed by the script, so the method is the first thing to inspect.',
    result: 'enob.py computes SNDR over all FFT bins, including bin 0 (DC).' },
  { observed: 'enob.py computes SNDR over all FFT bins, including bin 0 (DC).',
    candidates: ['read_file docs/spec.md',
                 'rewrite enob.py without being asked',
                 'run_python to print the DC bin magnitude of capture-07.csv'],
    correct: 2,
    why: 'A hypothesis has appeared (DC counted as noise), and a cheap measurement tests it before anything is changed.',
    result: 'DC bin magnitude is 40 times larger than the next-largest non-signal bin.' },
  { observed: 'DC bin magnitude is 40 times larger than the next-largest non-signal bin.',
    candidates: ['report success',
                 'run_python to compute ENOB with the DC bin excluded, without editing the file',
                 'edit enob.py and overwrite the old result'],
    correct: 1,
    why: 'The agent tests the fix on a copy and compares, so the original file and result stay intact.',
    result: 'ENOB with DC excluded is 9.1 bits.' },
  { observed: 'ENOB with DC excluded is 9.1 bits.',
    candidates: ['silently apply the change to enob.py',
                 'rerun the capture',
                 'report the cause and the evidence, and propose the change for approval'],
    correct: 2,
    why: 'The task was to find why, and a change to the project file is the researcher\'s decision.',
    result: null }
];

// The five stages of one pass through the loop (Table 1 of the chapter)
const STAGES = [
  { name: 'Decide', who: 'Model' },
  { name: 'Call', who: 'Model' },
  { name: 'Run', who: 'Harness' },
  { name: 'Observe', who: 'Harness to model' },
  { name: 'Repeat or stop', who: 'Model' }
];

const FIRST_QUESTION = 'What should the agent do first?';
const NEXT_QUESTION = 'What should the agent do next?';
const MASTERY = 4;        // mastery requires at least 4 of 5 correct
const PHASE_MS = 900;     // time between the stages of the reveal

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let stepIdx = 0;          // current step (0..4)
let committed = false;    // has the learner committed a prediction for this step?
let picks = [];           // learner's pick at each step (index 0..2)
let score = 0;
let finished = false;     // summary screen showing
let revealStart = 0;      // millis() when the current step was committed
let layoutBottom = 0;     // lowest y used by drawn content (used for layout testing)
let maxLayoutBottom = 0;

// controls
let choiceButtons = [];
let nextButton;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(136);   // Agent Loop
let lrs = null, stepStart = Date.now();

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let i = 0; i < 3; i++) {
    const b = createButton('Choose ' + LETTERS[i]);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.attribute('aria-label', 'Predict candidate ' + LETTERS[i] + ' as the agent\'s next action');
    b.mousePressed(() => commitPick(i));
    choiceButtons.push(b);
  }
  nextButton = createButton('Next Step');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mousePressed(nextPressed);

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Agent Loop Stepper', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Agent Loop Stepper MicroSim', pageDwell: true });
  }

  updateControls();

  describe('Agent Loop Stepper. A task asks why a converter ENOB result is 6.1 bits instead of about 9. ' +
    'At each of five steps the learner reads the results observed so far and predicts the agent\'s next ' +
    'action from three candidates by pressing Choose A, Choose B, or Choose C. The sim then reveals the ' +
    'agent\'s action and the reason, shows the model emitting the tool call, the harness running it, and ' +
    'the result being added to the context. After step 5 it shows the number correct out of 5 and the ' +
    'full loop as a list of calls and results.');

  noLoop(); // redraw only on state changes; loop() runs only during the short reveal sequence
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Step logic
// ---------------------------------------------------------------
function commitPick(i) {
  if (finished || committed) return;   // one attempt per step
  if (lrs) lrs.question('q-step-' + (stepIdx + 1), { name: 'Step ' + (stepIdx + 1) + ': predict the agent\'s next action',
      concept: PAGE_CONCEPT() })
    .answer({ success: i === STEPS[stepIdx].correct, response: 'candidate-' + LETTERS[i].toLowerCase(),
              durationMs: Date.now() - stepStart });
  picks[stepIdx] = i;
  committed = true;
  if (i === STEPS[stepIdx].correct) score++;
  revealStart = millis();
  updateControls();
  loop();   // animate the call / run / observe sequence
}

function nextPressed() {
  if (finished || !committed) return;
  if (stepIdx < STEPS.length - 1) {
    stepIdx++;
    committed = false;
    stepStart = Date.now();
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

// Reveal phase: 1 = Call, 2 = Run, 3 = Observe, 4 = Repeat or stop.
// Step 5 is a final answer: no tool runs, so it goes from Call straight to Stop.
function currentPhase() {
  if (!committed) return 0;
  const k = Math.floor((millis() - revealStart) / PHASE_MS) + 1;
  const isFinal = STEPS[stepIdx].result === null;
  if (isFinal) return k >= 2 ? 4 : 1;
  return Math.min(k, 4);
}

function updateControls() {
  for (const b of choiceButtons) {
    if (finished) b.hide();
    else { b.show(); setEnabled(b, !committed); }
  }
  if (finished) {
    nextButton.hide();
  } else {
    nextButton.show();
    nextButton.html(stepIdx === STEPS.length - 1 ? 'See Full Loop' : 'Next Step');
    setEnabled(nextButton, committed);
  }
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the visible buttons left to right, wrapping onto a second row when needed
function layoutControls() {
  if (finished) return;
  const visible = choiceButtons.concat([nextButton]);
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
// Drawing helpers
// ---------------------------------------------------------------
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
function drawLines(lines, x, y, lh) {
  textAlign(LEFT, TOP);
  noStroke();
  for (const ln of lines) {
    text(ln, x, y);
    y += lh;
  }
  return y;
}

// Wrap and draw a paragraph; returns the y below it
function para(str, x, y, w, style) {
  textStyle(style || NORMAL);
  const y2 = drawLines(wrapText(str, w), x, y, lineH);
  textStyle(NORMAL);
  return y2;
}

// ---------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------
function draw() {
  updateCanvasSize();
  // narrow screens use slightly smaller body text so the content fits the fixed height
  bodySize = canvasWidth < 600 ? 14 : 15;
  lineH = canvasWidth < 600 ? 17 : 19;
  // drawing region background and border
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  // control region background
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);

  // title and the "illustrative" label
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(22);
  text('Agent Loop Stepper', pad, 10);
  textStyle(NORMAL);
  textSize(bodySize);
  fill('dimgray');
  const tag = '[Illustrative data]';
  textAlign(RIGHT, TOP);
  text(tag, canvasWidth - pad, 15);

  let y = 42;
  y = drawTask(y) + 8;
  if (!finished) y = drawStages(y) + 8;  // the summary lists the whole loop instead

  if (finished) drawSummary(y);
  else drawPlay(y);

  if (finished) {
    fill('dimgray');
    noStroke();
    textSize(bodySize);
    textAlign(LEFT, CENTER);
    text('All five steps are done.', pad, drawHeight + controlHeight / 2);
  }

  // stop animating once the reveal sequence has finished
  if (committed && millis() - revealStart > 4 * PHASE_MS) noLoop();
}

function drawTask(y) {
  const innerW = canvasWidth - 2 * pad;
  textSize(bodySize);
  textStyle(BOLD);
  const taskLines = wrapText('Task: ' + TASK, innerW - 20);
  textStyle(NORMAL);
  const toolLines = wrapText('Tools available: ' + TOOLS.join(', '), innerW - 20);
  const h = (taskLines.length + toolLines.length) * lineH + 14;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, h, 8);
  strokeWeight(1);
  fill('black');
  textStyle(BOLD);
  let yy = drawLines(taskLines, pad + 10, y + 7, lineH);
  textStyle(NORMAL);
  drawLines(toolLines, pad + 10, yy, lineH);
  return y + h;
}

// The five stages of the loop as a strip of boxes. The active stage has a thick border,
// a fill, and a triangle marker; skipped stages (final answer) are labelled "skipped".
function drawStages(y) {
  const innerW = canvasWidth - 2 * pad;
  const gap = 6;
  const boxW = (innerW - gap * (STAGES.length - 1)) / STAGES.length;
  const phase = finished ? -1 : currentPhase();
  const isFinal = !finished && STEPS[stepIdx].result === null;
  textSize(bodySize - 1);

  // measure the tallest box
  const boxes = STAGES.map((s, i) => {
    textStyle(BOLD);
    // the active stage carries a triangle marker, included before wrapping so it never overflows
    const nameLines = wrapText((i === phase ? '\u25B6' : '') + (i + 1) + ' ' + s.name, boxW - 8);
    textStyle(NORMAL);
    let whoText = s.who;
    if (isFinal && committed && (i === 2 || i === 3)) whoText = 'skipped';
    const whoLines = wrapText(whoText, boxW - 8);
    return { nameLines, whoLines };
  });
  let maxLines = 0;
  for (const b of boxes) maxLines = Math.max(maxLines, b.nameLines.length + b.whoLines.length);
  const lh = bodySize + 2;
  const h = maxLines * lh + 10;

  for (let i = 0; i < STAGES.length; i++) {
    const x = pad + i * (boxW + gap);
    const active = i === phase;
    const isHarness = STAGES[i].who !== 'Model';
    if (active) { fill(ACTIVE_FILL); stroke('black'); strokeWeight(3); }
    else { fill(isHarness ? 'whitesmoke' : 'white'); stroke('gray'); strokeWeight(1); }
    rect(x, y, boxW, h, 6);
    strokeWeight(1);
    fill('black');
    textStyle(BOLD);
    let yy = drawLines(boxes[i].nameLines, x + 4, y + 5, lh);
    textStyle(NORMAL);
    fill(isHarness ? 'saddlebrown' : 'navy');
    drawLines(boxes[i].whoLines, x + 4, yy, lh);
  }
  return y + h;
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const twoCol = canvasWidth >= 700;
  let bottom;
  if (twoCol) {
    const leftW = Math.floor(innerW * 0.40);
    const rightX = pad + leftW + 14;
    const rightW = innerW - leftW - 14;
    const yLeft = drawContext(pad, y, leftW);
    const yRight = drawDecision(rightX, y, rightW);
    bottom = Math.max(yLeft, yRight);
  } else {
    const y1 = drawDecision(pad, y, innerW) + 8;
    bottom = drawContext(pad, y1, innerW);
  }
  layoutBottom = bottom;
  maxLayoutBottom = Math.max(maxLayoutBottom, bottom);
}

// The context: every call and result added so far
function drawContext(x, y, w) {
  const phase = currentPhase();
  const entries = [];
  for (let i = 0; i < stepIdx; i++) entries.push({ i, isNew: false });
  if (committed && phase >= 3 && STEPS[stepIdx].result !== null) entries.push({ i: stepIdx, isNew: true });

  textSize(bodySize);
  // measure
  // narrow screens name only the tool of each call; the full calls are listed in the summary
  const compact = canvasWidth < 700;
  const items = entries.map(e => {
    const call = STEPS[e.i].candidates[STEPS[e.i].correct];
    const callText = compact ? call.split(' ')[0] : call;
    textStyle(BOLD);
    const callLines = wrapText('Call ' + (e.i + 1) + ': ' + callText + (e.isNew ? '  [new]' : ''), w - 16);
    textStyle(NORMAL);
    const resLines = wrapText('Result: ' + STEPS[e.i].result, w - 16);
    return { callLines, resLines, isNew: e.isNew };
  });
  let h = 30;
  if (items.length === 0) h += lineH;
  for (const it of items) h += (it.callLines.length + it.resLines.length) * lineH + 6;
  h += 4;

  fill('white');
  stroke('gray');
  strokeWeight(1);
  rect(x, y, w, h, 8);
  fill('black');
  textStyle(BOLD);
  noStroke();
  textAlign(LEFT, TOP);
  text('Context: calls and results so far', x + 8, y + 7);
  textStyle(NORMAL);
  let yy = y + 30;
  if (items.length === 0) {
    fill('dimgray');
    yy = drawLines([STEPS[0].observed], x + 8, yy, lineH);
  }
  for (const it of items) {
    if (it.isNew) {
      // highlight the entry the harness just added
      fill(ACTIVE_FILL);
      noStroke();
      rect(x + 4, yy - 2, w - 8, (it.callLines.length + it.resLines.length) * lineH + 4, 4);
    }
    fill('black');
    textStyle(BOLD);
    yy = drawLines(it.callLines, x + 8, yy, lineH);
    textStyle(NORMAL);
    fill('black');
    yy = drawLines(it.resLines, x + 8, yy, lineH) + 6;
  }
  return y + h;
}

// The current step: question, three candidates, feedback, and the reveal sequence
function drawDecision(x, y, w) {
  const step = STEPS[stepIdx];
  const pick = picks[stepIdx];
  textSize(bodySize);
  fill('black');
  noStroke();
  y = para('Step ' + (stepIdx + 1) + ' of 5  |  Correct so far: ' + score, x, y, w);

  textSize(bodySize + 2);
  fill('navy');
  textStyle(BOLD);
  y = drawLines(wrapText(stepIdx === 0 ? FIRST_QUESTION : NEXT_QUESTION, w), x, y + 2, bodySize + 7) + 4;
  textStyle(NORMAL);
  textSize(bodySize);

  // candidates
  for (let c = 0; c < 3; c++) {
    const isAnswer = committed && c === step.correct;
    const isPick = committed && c === pick;
    let note = '';
    if (isAnswer && isPick) note = '✓ Your prediction and the agent\'s action';
    else if (isAnswer) note = '✓ The agent\'s action';
    else if (isPick) note = '✗ Your prediction';
    const lines = wrapText(LETTERS[c] + '.  ' + step.candidates[c], w - 16);
    const h = (lines.length + (note ? 1 : 0)) * lineH + 10;

    if (isAnswer) { fill(BLUE_FILL); stroke(BLUE); strokeWeight(3); }
    else if (isPick) { fill(VERMILLION_FILL); stroke(VERMILLION); strokeWeight(3); }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(x, y, w, h, 6);
    strokeWeight(1);
    fill('black');
    let yy = drawLines(lines, x + 8, y + 5, lineH);
    if (note) {
      textStyle(BOLD);
      fill(isAnswer ? BLUE : VERMILLION);
      drawLines([note], x + 8, yy, lineH);
      textStyle(NORMAL);
    }
    y += h + 5;
  }
  y += 3;

  if (!committed) {
    fill('black');
    y = para('Read the task and the context, then press Choose A, Choose B, or Choose C. ' +
      'You get one attempt at each step.', x, y, w);
    return y;
  }

  // feedback
  const correct = pick === step.correct;
  textSize(bodySize + 2);
  fill(correct ? BLUE : VERMILLION);
  textStyle(BOLD);
  if (correct) {
    y = drawLines(['✓ Correct.'], x, y, bodySize + 7);
  } else {
    y = drawLines(wrapText('✗ The agent\'s action is ' + LETTERS[step.correct] + '.', w), x, y, bodySize + 7);
  }
  textStyle(NORMAL);
  textSize(bodySize);
  fill('black');
  y = para(step.why, x, y, w) + 4;

  // reveal sequence: call, run, observe, repeat or stop
  const phase = currentPhase();
  const isFinal = step.result === null;
  const lines = [];
  if (isFinal) {
    lines.push('▶ Call: the model emits a final answer, not a tool call, so the harness has nothing to run.');
    if (phase >= 4) lines.push('▶ Stop: the task is complete, so the loop ends.');
  } else {
    lines.push('▶ Call: the model emits the tool call. The model itself runs nothing.');
    if (phase >= 2) lines.push('▶ Run: the harness executes the call.');
    if (phase >= 3) lines.push('▶ Observe: the harness adds the result to the context.');
    if (phase >= 4) lines.push('▶ Repeat: the model goes back to Decide with the new result.');
  }
  fill('saddlebrown');
  // wide screens keep the whole sequence; narrow screens show only the current stage
  const shown = canvasWidth >= 700 ? lines : lines.slice(-1);
  for (const ln of shown) y = para(ln, x, y, w);
  return y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;
  noStroke();
  fill('black');
  textSize(24);
  textStyle(BOLD);
  y = drawLines([score + ' of 5 correct'], pad, y, 30);
  textSize(bodySize);
  const mastered = score >= MASTERY;
  fill(mastered ? BLUE : VERMILLION);
  y = para(mastered
    ? '✓ Mastery reached: at least ' + MASTERY + ' of 5 predictions were correct.'
    : '✗ Not yet at mastery: ' + MASTERY + ' of 5 correct predictions are needed.',
    pad, y, innerW, BOLD) + 6;

  fill('black');
  y = para('The full loop: calls and results', pad, y, innerW, BOLD) + 4;

  const twoCol = canvasWidth >= 700;
  const colW = twoCol ? (innerW - 10) / 2 : innerW;
  let colY = [y, y];
  for (let i = 0; i < STEPS.length; i++) {
    const col = twoCol ? (i < 3 ? 0 : 1) : 0;
    const x = pad + col * (colW + 10);
    const step = STEPS[i];
    const ok = picks[i] === step.correct;
    textStyle(BOLD);
    const head = wrapText('Step ' + (i + 1) + '  ' + (ok ? '✓' : '✗') +
      ' You predicted ' + LETTERS[picks[i]], colW - 16);
    const callLines = wrapText((step.result === null ? 'Final answer: ' : 'Call: ') +
      step.candidates[step.correct], colW - 16);
    textStyle(NORMAL);
    const resLines = wrapText(step.result === null ? 'Result: none; the loop stops.' : 'Result: ' + step.result, colW - 16);
    const h = (head.length + callLines.length + resLines.length) * lineH + 10;
    let yy = colY[col];
    fill('white');
    stroke(ok ? BLUE : VERMILLION);
    strokeWeight(ok ? 1 : 2);
    rect(x, yy, colW, h, 6);
    strokeWeight(1);
    fill(ok ? BLUE : VERMILLION);
    textStyle(BOLD);
    let ty = drawLines(head, x + 8, yy + 5, lineH);
    fill('black');
    ty = drawLines(callLines, x + 8, ty, lineH);
    textStyle(NORMAL);
    drawLines(resLines, x + 8, ty, lineH);
    colY[col] = yy + h + 6;
  }
  layoutBottom = Math.max(colY[0], colY[1]);
  maxLayoutBottom = Math.max(maxLayoutBottom, layoutBottom);
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
