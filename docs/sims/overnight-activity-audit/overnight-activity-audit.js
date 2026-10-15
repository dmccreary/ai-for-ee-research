// Overnight Activity Audit MicroSim
// CANVAS_HEIGHT: 700
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner audits ten lines of an illustrative overnight log from an always-on agent
// against a stated task with Allowed and Not-allowed lists, flagging each line "in scope"
// or "out of scope". One attempt per line in a fixed order, the correct classification is
// always revealed, out-of-scope lines name the control that would have prevented them, and
// the end screen shows "n of 10 correct" (mastery at 9) and a morning report.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let canvasHeight = 700;
let containerHeight = canvasHeight;
// Control region: up to two rows of buttons = (2 x 35) + 10 = 80.
// On the morning-report screen there are no controls and the draw region takes the full height.
let controlHeight = 80;
let drawHeight = canvasHeight - controlHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const TASK = 'Each night, search arXiv for new papers on SAR ADC calibration and append their ' +
  'titles to docs/reading-queue.md.';
const ALLOWED = 'web search, fetching public web pages, and writing to docs/reading-queue.md.';
const NOT_ALLOWED = 'reading or writing any other file, signing in to any service, sending ' +
  'messages, installing software, or purchases.';
const LOG_LABEL = 'illustrative log';

const IN = 'in scope';
const OUT = 'out of scope';

// control: for out-of-scope lines, the control (permission rule, sandbox, or approval gate)
// that would have prevented the action, with a short reason
const LOG = [
  { id: 1, time: '01:00', action: 'web_search: "SAR ADC calibration" arXiv',
    answer: IN, why: 'Web search is allowed.' },
  { id: 2, time: '01:02', action: 'web_fetch: arxiv.org/abs/ listing page',
    answer: IN, why: 'Fetching a public page is allowed.' },
  { id: 3, time: '01:04', action: 'write_file: docs/reading-queue.md (+6 lines)',
    answer: IN, why: 'The one file the task may write.' },
  { id: 4, time: '01:05', action: 'read_file: data/raw/capture-07.csv',
    answer: OUT, why: 'Reading any other file is not allowed, even if it is harmless.',
    control: 'sandbox', how: 'the agent can see only docs/reading-queue.md' },
  { id: 5, time: '01:06', action: 'sign_in: publisher site using a stored credential',
    answer: OUT, why: 'Signing in to a service is not allowed.',
    control: 'permission rule', how: 'sign_in is denied for this task' },
  { id: 6, time: '01:08', action: 'web_fetch: blog.example.net/post',
    answer: IN, why: 'Fetching a public page is allowed.' },
  { id: 7, time: '01:09', action: 'send_message: lab chat channel, "found 6 new papers"',
    answer: OUT, why: 'Sending messages is not allowed.',
    control: 'approval gate', how: 'an outward message waits for your yes' },
  { id: 8, time: '01:10', action: 'write_file: docs/reading-queue.md (+2 lines)',
    answer: IN, why: 'The one file the task may write.' },
  { id: 9, time: '01:15', action: 'install_package: pdf-tools',
    answer: OUT, why: 'Installing software is not allowed.',
    control: 'sandbox', how: 'the agent cannot install software' },
  { id: 10, time: '01:20', action: 'add_to_cart: "Conference proceedings, 45 dollars"',
    answer: OUT, why: 'Purchases are not allowed, and this one leaves your control.',
    control: 'approval gate', how: 'a purchase waits for your yes' }
];

const PROMPT = 'Did the agent stay inside the task?';
const MASTERY = 9;               // mastery requires a score >= 9 of 10
const N_LINES = LOG.length;      // 10

// ---------------------------------------------------------------
// Pure logic (no p5 calls; testable outside the browser)
// ---------------------------------------------------------------
function isCorrect(line, classification) {
  return classification === line.answer;
}

function feedbackHeadline(line, classification) {
  return isCorrect(line, classification) ? 'Correct.' : 'This line is ' + line.answer + '.';
}

function controlSentence(line) {
  if (line.answer !== OUT) return '';
  return 'Control that would have prevented it: ' + line.control + ' (' + line.how + ').';
}

function scoreLine(score) {
  return score + ' of ' + N_LINES + ' correct';
}

function masteryMet(score) {
  return score >= MASTERY;
}

// The out-of-scope lines of the log, in log order, for the morning report
function morningReport() {
  return LOG.filter(l => l.answer === OUT);
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let linePos = 0;         // position in LOG (0..9)
let chosen = '';         // IN, OUT, or '' for none
let committed = false;   // has the current line been submitted?
let score = 0;           // correct first attempts so far
let finished = false;    // morning report showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let inButton;
let outButton;
let submitButton;
let nextButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  inButton = createButton('In scope');
  inButton.parent(document.querySelector('main'));
  styleButton(inButton);
  inButton.mouseClicked(() => choose(IN)); // click also fires for Enter and Space

  outButton = createButton('Out of scope');
  outButton.parent(document.querySelector('main'));
  styleButton(outButton);
  outButton.mouseClicked(() => choose(OUT));

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  submitButton.mouseClicked(submitChoice);

  nextButton = createButton('Next Line');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mouseClicked(nextPressed);

  updateControls();

  describe('Overnight Activity Audit. The task given to an always-on agent is shown with its ' +
    'Allowed and Not allowed lists, followed by one line at a time from an illustrative overnight ' +
    'log. For each of ten lines choose In scope or Out of scope and press Submit. The sim says ' +
    'whether you were correct, explains why, and for an out-of-scope action names the control ' +
    'that would have prevented it: a permission rule, a sandbox, or an approval gate. After line ' +
    '10 it shows the score out of 10, whether the mastery threshold of 9 was met, and a morning ' +
    'report of the out-of-scope actions.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 12px');
  b.style('white-space', 'nowrap');
  b.style('border-radius', '6px');
}

// ---------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------
function choose(c) {
  if (finished || committed) return;
  chosen = c;
  updateControls();
  redraw();
}

function submitChoice() {
  if (finished || committed || chosen === '') return;
  committed = true;
  if (isCorrect(LOG[linePos], chosen)) score++;
  updateControls();
  redraw();
  nextButton.elt.focus();
}

function nextPressed() {
  if (finished || !committed) return;
  if (linePos < N_LINES - 1) {
    linePos++;
    committed = false;
    chosen = '';
    updateControls();
    redraw();
    inButton.elt.focus();
  } else {
    finished = true;
    updateControls();
    redraw();
  }
}

// Enable, disable, show, hide, relabel and restyle the controls to match the state
function updateControls() {
  if (finished) {
    for (const b of [inButton, outButton, submitButton, nextButton]) b.hide();
    layoutControls();
    return;
  }
  const line = LOG[linePos];
  const pairs = [[inButton, IN, 'In scope'], [outButton, OUT, 'Out of scope']];
  for (const [b, value, label] of pairs) {
    b.show();
    let prefix = '';
    let bg = 'white', fg = 'black', border = '2px solid gray', weight = 'normal';
    if (!committed) {
      setEnabled(b, true);
      if (value === chosen) {
        prefix = '● ';               // filled circle: chosen
        bg = 'navy'; fg = 'white'; border = '2px solid navy';
      }
    } else {
      setEnabled(b, false);
      if (value === line.answer) {
        prefix = '✓ ';               // check mark: correct classification
        bg = 'lightblue'; border = '3px solid mediumblue';
      } else if (value === chosen) {
        prefix = '✗ ';               // ballot x: wrong pick
        bg = 'moccasin'; border = '3px dashed darkorange';
      } else {
        bg = 'whitesmoke'; fg = 'dimgray'; border = '2px solid silver';
      }
    }
    b.html(prefix + label);
    b.style('background-color', bg);
    b.style('color', fg);
    b.style('border', border);
    b.style('font-weight', weight);
    b.attribute('aria-pressed', value === chosen ? 'true' : 'false');
  }
  submitButton.show();
  nextButton.show();
  setEnabled(submitButton, !committed && chosen !== '');
  setEnabled(nextButton, committed);
  nextButton.html(linePos === N_LINES - 1 ? 'See Morning Report' : 'Next Line');
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the visible buttons left to right, wrapping onto a second row when needed
function layoutControls() {
  if (finished) {
    controlHeight = 0;
    drawHeight = canvasHeight;
    return;
  }
  controlHeight = 80;
  drawHeight = canvasHeight - controlHeight;
  const gap = 10;
  let x = 10;
  let y = drawHeight + 8;
  for (const b of [inButton, outButton, submitButton, nextButton]) {
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
  if (controlHeight > 0) {
    fill('white');
    rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);
  }

  // title
  fill('black');
  noStroke();
  textFont('Arial');
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(24);
  text('Overnight Activity Audit', canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (finished) drawSummary(44);
  else drawPlay(44);
}

// Word-wrap a string to a maximum width using the current text settings
function wrapText(str, maxW, firstMaxW) {
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    const limit = (lines.length === 0 && firstMaxW !== undefined) ? firstMaxW : maxW;
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

// A bold label followed by normal text on the same first line, wrapped to width w.
// Returns the height used; draws only when doDraw is true.
function labeledParagraph(label, body, x, y, w, lineH, doDraw) {
  textStyle(BOLD);
  const lw = textWidth(label + ' ');
  textStyle(NORMAL);
  const lines = wrapText(body, w, w - lw);
  if (doDraw) {
    noStroke();
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(label, x, y);
    textStyle(NORMAL);
    text(lines[0], x + lw, y);
    for (let i = 1; i < lines.length; i++) text(lines[i], x, y + i * lineH);
  }
  return lines.length * lineH;
}

// The task panel: task statement with its Allowed and Not allowed lists (verbatim)
function drawTaskPanel(y) {
  const innerW = canvasWidth - 2 * pad;
  const w = innerW - 20;
  textSize(16);
  const h1 = labeledParagraph('Task:', TASK, 0, 0, w, 20, false);
  const h2 = labeledParagraph('✓ Allowed:', ALLOWED, 0, 0, w, 20, false);
  const h3 = labeledParagraph('✗ Not allowed:', NOT_ALLOWED, 0, 0, w, 20, false);
  const boxH = h1 + h2 + h3 + 6 + 6 + 14;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(pad, y, innerW, boxH, 8);
  let yy = y + 7;
  fill('black');
  labeledParagraph('Task:', TASK, pad + 10, yy, w, 20, true);
  yy += h1 + 6;
  fill('mediumblue');
  labeledParagraph('✓ Allowed:', ALLOWED, pad + 10, yy, w, 20, true);
  yy += h2 + 6;
  fill('saddlebrown');
  labeledParagraph('✗ Not allowed:', NOT_ALLOWED, pad + 10, yy, w, 20, true);
  fill('black');
  return y + boxH;
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const line = LOG[linePos];

  // status line
  textSize(16);
  fill('black');
  y = drawLines(wrapText('Line ' + (linePos + 1) + ' of ' + N_LINES + '  |  Correct so far: ' + score,
    innerW), pad, y, 20) + 6;

  y = drawTaskPanel(y) + 8;

  // the current log line, labeled as an illustrative log
  textSize(16);
  textStyle(ITALIC);
  const head = 'From the ' + LOG_LABEL + ', line ' + line.id + ' of ' + N_LINES + ':';
  const headLines = wrapText(head, innerW - 24);
  textStyle(NORMAL);
  textFont('monospace');
  textSize(16);
  const logLines = wrapText(line.time + '  ' + line.action, innerW - 24);
  textFont('Arial');
  const boxH = headLines.length * 20 + logLines.length * 21 + 18;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, boxH, 10);
  strokeWeight(1);
  fill('dimgray');
  textStyle(ITALIC);
  let yy = drawLines(headLines, pad + 12, y + 7, 20) + 2;
  textStyle(NORMAL);
  fill('black');
  textFont('monospace');
  drawLines(logLines, pad + 12, yy, 21);
  textFont('Arial');
  y += boxH + 8;

  // the question on screen
  textSize(18);
  textStyle(ITALIC);
  fill('navy');
  y = drawLines(wrapText(PROMPT, innerW), pad, y, 24) + 4;
  textStyle(NORMAL);

  // instructions or feedback
  textSize(16);
  if (!committed) {
    fill('black');
    const msg = (chosen === '')
      ? 'Choose In scope or Out of scope below, then press Submit. Each line gets one attempt.'
      : 'Your choice: ' + chosen + '. Press Submit to commit it, or choose the other option first.';
    y = drawLines(wrapText(msg, innerW), pad, y, 20);
  } else {
    const correct = isCorrect(line, chosen);
    textSize(18);
    textStyle(BOLD);
    fill(correct ? 'mediumblue' : 'saddlebrown');
    y = drawLines(wrapText((correct ? '✓ ' : '✗ ') + feedbackHeadline(line, chosen),
      innerW), pad, y, 24);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    y = drawLines(wrapText('Why: ' + line.why, innerW), pad, y, 20);
    if (line.answer === OUT) {
      y = drawLines(wrapText(controlSentence(line), innerW), pad, y + 2, 20);
    }
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(16);
  fill('black');
  y = drawLines(['All ' + N_LINES + ' log lines audited'], pad, y, 20) + 2;

  // score line
  textSize(26);
  textStyle(BOLD);
  y = drawLines([scoreLine(score)], pad, y, 32);
  textSize(16);
  const met = masteryMet(score);
  fill(met ? 'mediumblue' : 'saddlebrown');
  const masteryStr = met
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of ' + N_LINES + ' correct.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of ' + N_LINES + ' correct are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 10;
  textStyle(NORMAL);

  // morning report
  const report = morningReport();
  fill('black');
  textSize(18);
  textStyle(BOLD);
  y = drawLines(wrapText('Morning report: ' + report.length + ' out-of-scope actions in the ' +
    LOG_LABEL, innerW), pad, y, 24) + 6;
  textStyle(NORMAL);
  textSize(16);

  for (const l of report) {
    textFont('monospace');
    const actLines = wrapText(l.time + '  ' + l.action, innerW - 20);
    textFont('Arial');
    const ctlLines = wrapText('Prevented by: ' + l.control, innerW - 20);
    const h = actLines.length * 21 + ctlLines.length * 20 + 12;
    fill('white');
    stroke('darkorange');
    strokeWeight(1);
    rect(pad, y, innerW, h, 8);
    fill('black');
    textFont('monospace');
    let yy = drawLines(actLines, pad + 10, y + 6, 21);
    textFont('Arial');
    fill('saddlebrown');
    drawLines(ctlLines, pad + 10, yy, 20);
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
