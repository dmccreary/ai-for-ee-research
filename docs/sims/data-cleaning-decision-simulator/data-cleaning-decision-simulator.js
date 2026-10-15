// Measurement Data Cleaning Decision Simulator MicroSim
// CANVAS_HEIGHT: 750
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner judges eight anomalies in a synthetic batch of 40 device offset measurements.
// For each anomaly: choose Keep, Exclude with log, Correct and log, or Remeasure, then Submit.
// One attempt per anomaly in a fixed order; the correct action, the "Why" sentence and the
// cleaning log entry are always revealed. The end screen shows "n of 8 correct", whether the
// mastery threshold of 7 was met, and how many rows were kept, excluded, corrected, and remeasured.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 635;
// Control region: up to three rows of buttons at narrow widths = (3 x 35) + 10 = 115
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const TITLE = 'Measurement Data Cleaning Decision Simulator';
const DATA_LABEL = 'Synthetic, invented for this exercise. A batch of 40 devices with offset voltages measured in millivolts.';
const QUESTION = 'What should happen to this data?';

// The four responses to an anomaly (chapter Table 2)
const ACTIONS = ['Keep', 'Exclude with log', 'Correct and log', 'Remeasure'];
const KEEP = 0, EXCLUDE = 1, CORRECT = 2, REMEASURE = 3;
// Wording used in the end-of-run row summary
const ACTION_SUMMARY = ['Kept', 'Excluded with log', 'Corrected and logged', 'Sent for remeasurement'];

// answer is an index into ACTIONS. rows describes which rows the anomaly affects;
// n is null when the specification does not state a row count.
const ANOMALIES = [
  { id: 1,
    anomaly: 'Device 17 reads 12 mV, while the other devices read 0.5 to 2.1 mV.',
    notebook: '"Device 17: probe slipped during measurement, remeasure."',
    answer: EXCLUDE,
    why: 'There is a documented cause, so exclusion is justified and the reason is recorded.',
    log: 'Exclude device 17 (1 row). Reason: probe slipped during measurement (lab notebook).',
    rows: { n: 1, label: 'device 17' } },
  { id: 2,
    anomaly: 'Device 31 reads 6.8 mV, while the other devices read 0.5 to 2.1 mV.',
    notebook: 'No entry.',
    answer: KEEP,
    why: 'There is no documented fault, so the value is data. It is reported and investigated.',
    log: 'Nothing removed. Note: device 31 (6.8 mV) examined; no documented fault; kept, reported, and flagged for investigation.',
    rows: { n: 1, label: 'device 31' } },
  { id: 3,
    anomaly: 'The temperature column reads 0.0 for devices 8 to 12.',
    notebook: '"Logger cable disconnected for devices 8 to 12."',
    answer: REMEASURE,
    why: 'The values are missing and cannot be recovered or inferred.',
    log: 'Remeasure temperature for devices 8 to 12 (5 rows). Reason: logger cable disconnected (lab notebook).',
    rows: { n: 5, label: 'devices 8 to 12' } },
  { id: 4,
    anomaly: 'Rows for devices 22 and 23 appear twice in the merged file.',
    notebook: '"Merged files A and B; overlap at 22 and 23."',
    answer: EXCLUDE,
    why: 'The duplicates are artifacts of the merge, and one copy of each is kept.',
    log: 'Exclude the duplicate rows of devices 22 and 23 (2 rows); one copy of each is kept. Reason: overlap when merging files A and B (lab notebook).',
    rows: { n: 2, label: 'duplicates of devices 22 and 23' } },
  { id: 5,
    anomaly: 'All values in lot B are about one thousand times smaller than in lot A.',
    notebook: '"Lot A exported in mV; lot B exported in V."',
    answer: CORRECT,
    why: 'A documented unit mismatch is converted, and the conversion is recorded.',
    log: 'Correct lot B: multiply every offset by 1000 to convert V to mV; rows: all of lot B. Reason: lot A exported in mV, lot B in V (lab notebook).',
    rows: { n: null, label: 'all rows of lot B' } },
  { id: 6,
    anomaly: 'The value -999 appears in three rows of the offset column.',
    notebook: '"Instrument writes -999 when a reading fails."',
    answer: EXCLUDE,
    why: '-999 is the instrument\'s missing-value code, so those rows have no measurement.',
    log: 'Exclude the 3 rows whose offset is -999. Reason: -999 is the instrument\'s missing-value code for a failed reading (lab notebook).',
    rows: { n: 3, label: 'rows reading -999' } },
  { id: 7,
    anomaly: 'Six devices from one wafer edge read about three times higher than the rest.',
    notebook: 'No entry.',
    answer: KEEP,
    why: 'A systematic spatial pattern is a finding about the process and is not an artifact.',
    log: 'Nothing removed. Note: six wafer-edge devices examined; reported as a spatial pattern in the process.',
    rows: { n: 6, label: 'wafer-edge devices' } },
  { id: 8,
    anomaly: 'In capture 12 the ADC output is the same code for all 4,096 samples.',
    notebook: '"Input cable not connected for capture 12."',
    answer: REMEASURE,
    why: 'The record contains no information about the converter.',
    log: 'Remeasure capture 12 (all 4,096 samples). Reason: input cable not connected (lab notebook).',
    rows: { n: null, label: 'capture 12 (4,096 samples)' } }
];

const MASTERY = 7;   // mastery requires at least 7 of 8 correct on the first attempt

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let current = 0;         // index of the anomaly on screen (fixed order 0..7)
let selected = -1;       // action chosen but not yet submitted
let committed = false;   // has the current anomaly been submitted?
let choices = [];        // committed action index for each anomaly
let score = 0;           // correct submissions so far
let finished = false;    // end screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let actionButtons = [];
let primaryButton;       // Submit / Next Anomaly / See Score

// ---------------------------------------------------------------
// Pure logic (no drawing) - also used by the node tests
// ---------------------------------------------------------------
function isCorrect(anomalyIndex, actionIndex) {
  return ANOMALIES[anomalyIndex].answer === actionIndex;
}

function feedbackHeadline(anomalyIndex, actionIndex) {
  const right = ACTIONS[ANOMALIES[anomalyIndex].answer];
  return isCorrect(anomalyIndex, actionIndex)
    ? 'Correct: ' + right + '.'
    : 'The better response is ' + right + '.';
}

function scoreLine(n) {
  return n + ' of 8 correct';
}

function masteryMet(n) {
  return n >= MASTERY;
}

// Summary of how many rows the learner's committed actions kept, excluded, corrected and remeasured
function rowSummary(choiceList) {
  const lines = [];
  for (let a = 0; a < ACTIONS.length; a++) {
    let total = 0;
    const counted = [];
    const uncounted = [];
    for (let i = 0; i < ANOMALIES.length; i++) {
      if (choiceList[i] !== a) continue;
      const r = ANOMALIES[i].rows;
      if (r.n === null) uncounted.push(r.label);
      else { total += r.n; counted.push(r.label + ': ' + r.n); }
    }
    let body;
    if (counted.length === 0 && uncounted.length === 0) {
      body = 'none';
    } else {
      const parts = [];
      if (counted.length > 0) {
        parts.push(total + (total === 1 ? ' row' : ' rows') + ' (' + counted.join('; ') + ')');
      }
      if (uncounted.length > 0) parts.push(uncounted.join(' and '));
      body = parts.join(' plus ');
    }
    lines.push({ action: a, text: ACTION_SUMMARY[a] + ': ' + body, total: total, uncounted: uncounted });
  }
  return lines;
}

// ---------------------------------------------------------------
// Setup
// ---------------------------------------------------------------
function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let a = 0; a < ACTIONS.length; a++) {
    const b = createButton(ACTIONS[a]);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.mouseClicked(() => selectAction(a));
    actionButtons.push(b);
  }
  primaryButton = createButton('Submit');
  primaryButton.parent(document.querySelector('main'));
  styleButton(primaryButton);
  primaryButton.style('font-weight', 'bold');
  primaryButton.mouseClicked(primaryPressed);

  updateControls();

  describe('Measurement Data Cleaning Decision Simulator. Eight anomalies from a synthetic batch of ' +
    '40 device offset measurements are shown one at a time with a lab notebook excerpt. For each ' +
    'one, choose Keep, Exclude with log, Correct and log, or Remeasure and press Submit. The sim ' +
    'then states whether the choice was correct, gives the reason, and shows the cleaning log ' +
    'entry. After the eighth anomaly it shows the score out of 8, whether the mastery threshold ' +
    'of 7 was met, and how many rows were kept, excluded, corrected, and sent for remeasurement.');

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
function selectAction(a) {
  if (finished || committed) return;
  selected = a;
  updateControls();
  redraw();
}

function primaryPressed() {
  if (finished) return;
  if (!committed) {
    if (selected < 0) return;
    // one attempt: commit the choice
    committed = true;
    choices[current] = selected;
    if (isCorrect(current, selected)) score++;
  } else if (current < ANOMALIES.length - 1) {
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

// Enable, disable, label and style the controls to match the state
function updateControls() {
  const answer = ANOMALIES[current].answer;
  for (let a = 0; a < ACTIONS.length; a++) {
    const b = actionButtons[a];
    if (finished) { b.hide(); continue; }
    b.show();
    let label = ACTIONS[a];
    if (committed && a === answer) label = '✓ ' + label;
    else if (committed && a === selected) label = '✗ ' + label;
    b.html(label);
    setEnabled(b, !committed);
    const isPicked = a === selected;
    b.attribute('aria-pressed', isPicked ? 'true' : 'false');
    // selected: thick border and bold text, not just color
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
      primaryButton.html(current === ANOMALIES.length - 1 ? 'See Score' : 'Next Anomaly');
      setEnabled(primaryButton, true);
    }
  }
  layoutControls();
}

// Flow the visible buttons left to right, wrapping onto another row when needed
function layoutControls() {
  if (finished) return;
  const visible = actionButtons.concat([primaryButton]);
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

  const innerW = canvasWidth - 2 * pad;

  // title (wraps at narrow widths)
  fill('black');
  noStroke();
  textStyle(BOLD);
  textSize(22);
  textAlign(CENTER, TOP);
  let y = 10;
  for (const ln of wrapText(TITLE, innerW)) {
    noStroke();
    text(ln, canvasWidth / 2, y);
    y += 28;
  }
  textStyle(NORMAL);
  y += 2;

  // synthetic-data label
  textSize(16);
  textStyle(ITALIC);
  fill('dimgray');
  y = drawLines(wrapText(DATA_LABEL, innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  if (finished) drawSummary(y, innerW);
  else drawAnomaly(y, innerW);
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

// A titled box with wrapped body text; returns the y below the box
function drawBox(x, y, w, heading, body, bodyStyle, fillColor, strokeColor, weight) {
  textSize(16);
  textStyle(bodyStyle);
  const lines = wrapText(body, w - 24);
  const h = 8 + 22 + lines.length * 20 + 8;
  fill(fillColor);
  stroke(strokeColor);
  strokeWeight(weight);
  rect(x, y, w, h, 8);
  strokeWeight(1);
  fill('black');
  noStroke();
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(heading, x + 12, y + 8);
  textStyle(bodyStyle);
  drawLines(lines, x + 12, y + 30, 20);
  textStyle(NORMAL);
  return y + h;
}

function drawAnomaly(y, innerW) {
  const item = ANOMALIES[current];

  // status line
  textSize(16);
  fill('black');
  y = drawLines(wrapText('Anomaly ' + (current + 1) + ' of 8  |  Correct so far: ' + score, innerW),
    pad, y, 20) + 4;

  // question
  textStyle(BOLD);
  fill('navy');
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 8;
  textStyle(NORMAL);

  // anomaly and notebook excerpt
  y = drawBox(pad, y, innerW, 'Anomaly ' + item.id, item.anomaly, NORMAL, 'white', 'navy', 2) + 8;
  y = drawBox(pad, y, innerW, 'Lab notebook excerpt', item.notebook, ITALIC, 'ivory', 'darkkhaki', 1) + 10;

  textSize(16);
  if (!committed) {
    fill('black');
    const msg = selected < 0
      ? 'Choose one of the four actions below, then press Submit. You get one attempt.'
      : 'Your choice: ' + ACTIONS[selected] + '. Press Submit to commit it, or choose another action first.';
    y = drawLines(wrapText(msg, innerW), pad, y, 20);
  } else {
    const right = isCorrect(current, selected);
    textSize(18);
    textStyle(BOLD);
    fill(right ? 'navy' : 'saddlebrown');
    y = drawLines(wrapText((right ? '✓ ' : '✗ ') + feedbackHeadline(current, selected), innerW),
      pad, y, 24);
    textSize(16);
    textStyle(NORMAL);
    fill('black');
    if (!right) {
      y = drawLines(wrapText('Your choice: ' + ACTIONS[selected] + '.', innerW), pad, y, 20);
    }
    y = drawLines(wrapText(item.why, innerW), pad, y, 20) + 8;
    y = drawBox(pad, y, innerW, 'Cleaning log entry', item.log, NORMAL, 'white', 'silver', 1);
  }
  layoutBottom = y;
}

function drawSummary(y, innerW) {
  textSize(16);
  fill('black');
  y = drawLines(['All eight anomalies judged'], pad, y, 20) + 4;

  textSize(26);
  textStyle(BOLD);
  y = drawLines([scoreLine(score)], pad, y, 32);
  textSize(16);
  const met = masteryMet(score);
  fill(met ? 'navy' : 'saddlebrown');
  const masteryStr = met
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 8 correct on the first attempt.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of 8 correct on the first attempt are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 12;

  fill('black');
  y = drawLines(wrapText('Rows affected by the actions you chose:', innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  for (const line of rowSummary(choices)) {
    y = drawBox(pad, y, innerW, ACTION_SUMMARY[line.action],
      line.text.substring(ACTION_SUMMARY[line.action].length + 2), NORMAL, 'white', 'silver', 1) + 6;
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
