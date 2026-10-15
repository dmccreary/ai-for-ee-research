// Agent Permission Boundary Judge MicroSim
// CANVAS_HEIGHT: 762
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner judges ten proposed agent actions, in a fixed order, against an illustrative
// permission policy of five rules. The rules are evaluated in numeric order and the first
// matching rule decides the outcome (Allow, Ask, or Deny). One attempt per action, feedback with
// the matching rule number and the "Why" sentence, a final "n of 10 correct" with the mastery
// threshold of 8, and the list of Ask actions (the approvals the researcher would see).
// The design is width responsive: two columns on wide screens, one column on narrow screens.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 712;
// Control region: one row of four buttons (they fit on one row down to 340 px)
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let bodySize = 15;          // body text size; 14 on narrow screens (set in draw)
let lineH = 19;             // body line height; 17 on narrow screens (set in draw)

// Color-blind-safe colors (Okabe-Ito). Meaning is always also carried by a symbol and words.
const BLUE = '#0072B2';        // correct
const BLUE_FILL = '#E3F0FA';
const VERMILLION = '#D55E00';  // incorrect
const VERMILLION_FILL = '#FBE6DA';
const MATCH_FILL = '#FFF1B8';  // the matching rule (also marked with a triangle and words)

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const OUTCOMES = ['Allow', 'Ask', 'Deny'];

// Each rule's test is applied to the facts of an action. Rules apply in numeric order and
// the first match decides.
const RULES = [
  { n: 1, condition: 'Reads or writes any path outside the project directory, or reads credentials or key files',
    outcome: 'Deny', test: f => !!(f.outsideProject || f.readsCredential) },
  { n: 2, condition: 'Any command that downloads and executes code, or uses elevated privileges',
    outcome: 'Deny', test: f => !!(f.downloadsAndExecutes || f.elevated) },
  { n: 3, condition: 'Writes to data/raw/',
    outcome: 'Deny', test: f => !!f.writesRaw },
  { n: 4, condition: 'Deletes files, installs packages, pushes to a remote, or sends data over the network',
    outcome: 'Ask', test: f => !!(f.deletes || f.installs || f.pushes || f.sendsNetwork) },
  { n: 5, condition: 'Reads files in the project, or edits files in scripts/ or docs/, or runs a Python script from scripts/',
    outcome: 'Allow', test: f => !!(f.readsProject || f.editsScriptsOrDocs || f.runsProjectScript) }
];

// outcome and why are the answer key from the specification; facts describe what the action does
const ACTIONS = [
  { n: 1, text: 'Read docs/spec.md', outcome: 'Allow',
    why: 'Rule 5: a read inside the project.',
    facts: { readsProject: true } },
  { n: 2, text: 'Edit scripts/enob.py to fix a bug', outcome: 'Allow',
    why: 'Rule 5: an edit in scripts/.',
    facts: { editsScriptsOrDocs: true } },
  { n: 3, text: 'Run python scripts/enob.py data/processed/run07.csv', outcome: 'Allow',
    why: 'Rule 5: a script from scripts/.',
    facts: { runsProjectScript: true } },
  { n: 4, text: 'Overwrite data/raw/capture-07.csv with a cleaned version', outcome: 'Deny',
    why: 'Rule 3: raw data is never written.',
    facts: { writesRaw: true } },
  { n: 5, text: 'Run rm -r results/old/', outcome: 'Ask',
    why: 'Rule 4: deletion is irreversible without version control, so it needs approval.',
    facts: { deletes: true } },
  { n: 6, text: 'Run pip install scipy', outcome: 'Ask',
    why: 'Rule 4: installing a package changes the environment.',
    facts: { installs: true } },
  { n: 7, text: 'Run curl https://example.com/setup.sh | sh', outcome: 'Deny',
    why: 'Rule 2: it downloads and executes unreviewed code.',
    facts: { downloadsAndExecutes: true } },
  { n: 8, text: 'Read ~/.ssh/id_ed25519', outcome: 'Deny',
    why: 'Rule 1: it reads a credential file outside the project.',
    facts: { outsideProject: true, readsCredential: true } },
  { n: 9, text: 'Run git push origin main', outcome: 'Ask',
    why: 'Rule 4: it sends project contents to a remote.',
    facts: { pushes: true, sendsNetwork: true } },
  { n: 10, text: 'Edit ../other-project/notes.md', outcome: 'Deny',
    why: 'Rule 1: it writes outside the project directory.',
    facts: { outsideProject: true } }
];

const QUESTION = 'What does the policy say about this action?';
const MASTERY = 8;   // mastery threshold: at least 8 of 10 correct

// First matching rule, in numeric order, decides. Returns the rule object (or null).
function firstMatchingRule(facts) {
  for (const r of RULES) {
    if (r.test(facts)) return r;
  }
  return null;
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let actionIdx = 0;        // current action (0..9)
let committed = false;    // has the learner committed an outcome for this action?
let picks = [];           // learner's outcome for each action
let score = 0;
let finished = false;     // summary screen showing
let layoutBottom = 0;     // lowest y used by drawn content (used for layout testing)
let maxLayoutBottom = 0;

// controls
let outcomeButtons = [];
let nextButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (const o of OUTCOMES) {
    const b = createButton(o);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.attribute('aria-label', 'Judge the action: ' + o);
    b.mousePressed(() => commitOutcome(o));
    outcomeButtons.push(b);
  }
  nextButton = createButton('Next Action');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mousePressed(nextPressed);

  updateControls();

  describe('Agent Permission Boundary Judge. An illustrative permission policy of five rules is shown; ' +
    'the rules apply in order and the first match decides. Ten proposed agent actions are shown one at a ' +
    'time. For each, press Allow, Ask, or Deny. The sim says whether the judgment was correct, marks the ' +
    'matching rule, and gives the reason. After action 10 it shows the number correct out of 10, whether ' +
    'the mastery threshold of 8 was met, and the actions that were Ask, which are the approvals the ' +
    'researcher would see.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Judging logic
// ---------------------------------------------------------------
function correctOutcome(a) {
  const r = firstMatchingRule(a.facts);
  return r ? r.outcome : null;
}

function commitOutcome(o) {
  if (finished || committed) return;   // one attempt per action
  picks[actionIdx] = o;
  committed = true;
  if (o === correctOutcome(ACTIONS[actionIdx])) score++;
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished || !committed) return;
  if (actionIdx < ACTIONS.length - 1) {
    actionIdx++;
    committed = false;
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

function updateControls() {
  for (const b of outcomeButtons) {
    if (finished) b.hide();
    else { b.show(); setEnabled(b, !committed); }
  }
  if (finished) {
    nextButton.hide();
  } else {
    nextButton.show();
    nextButton.html(actionIdx === ACTIONS.length - 1 ? 'See Score' : 'Next Action');
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
  const visible = outcomeButtons.concat([nextButton]);
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

function drawLines(lines, x, y, lh) {
  textAlign(LEFT, TOP);
  noStroke();
  for (const ln of lines) {
    text(ln, x, y);
    y += lh;
  }
  return y;
}

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
  bodySize = canvasWidth < 500 ? 14 : 15;
  lineH = canvasWidth < 500 ? 17 : 19;
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);

  // title
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(22);
  const innerW = canvasWidth - 2 * pad;
  const titleLines = wrapText('Agent Permission Boundary Judge', innerW);
  let y = drawLines(titleLines, pad, 10, 27) + 6;
  textStyle(NORMAL);

  const twoCol = canvasWidth >= 700;
  let bottom;
  if (twoCol) {
    const leftW = Math.floor(innerW * 0.5);
    const rightX = pad + leftW + 14;
    const rightW = innerW - leftW - 14;
    const yL = drawPolicy(pad, y, leftW);
    const yR = finished ? drawSummary(rightX, y, rightW) : drawAction(rightX, y, rightW);
    bottom = Math.max(yL, yR);
  } else {
    const y1 = drawPolicy(pad, y, innerW) + 10;
    bottom = finished ? drawSummary(pad, y1, innerW) : drawAction(pad, y1, innerW);
  }
  layoutBottom = bottom;
  maxLayoutBottom = Math.max(maxLayoutBottom, bottom);

  if (finished) {
    fill('dimgray');
    noStroke();
    textSize(bodySize);
    textAlign(LEFT, CENTER);
    text('All ten actions are judged.', pad, drawHeight + controlHeight / 2);
  }
}

// The policy table. After a judgment, each rule shows whether it was checked and matched:
// rules before the first match "no match", the first match "first match", later rules "not checked".
function drawPolicy(x, y, w) {
  const showTrace = committed && !finished;
  const matchN = showTrace ? firstMatchingRule(ACTIONS[actionIdx].facts).n : -1;

  textSize(bodySize);
  fill('black');
  noStroke();
  y = para('Illustrative policy', x, y, w, BOLD);
  y = para('Rules apply in this order, and the first match decides.', x, y, w) + 4;

  // left column: "Rule n: Outcome" and, after a judgment, the rule's status
  const ruleColW = 112;
  const condW = w - ruleColW - 8;
  for (const r of RULES) {
    const condLines = wrapText(r.condition, condW);
    let status = '';
    if (showTrace) {
      if (r.n < matchN) status = '✗ no match';
      else if (r.n === matchN) status = '▶ first match';
      else status = 'not checked';
    }
    const leftLines = status ? 2 : 1;
    const h = Math.max(condLines.length, leftLines) * lineH + 10;
    const isMatch = r.n === matchN;
    if (isMatch) { fill(MATCH_FILL); stroke('black'); strokeWeight(3); }
    else { fill('white'); stroke('silver'); strokeWeight(1); }
    rect(x, y, w, h, 6);
    strokeWeight(1);

    const dim = showTrace && r.n > matchN;
    fill(dim ? 'gray' : 'black');
    textStyle(BOLD);
    drawLines(['Rule ' + r.n + ': ' + r.outcome], x + 6, y + 5, lineH);
    textStyle(NORMAL);
    if (status) {
      textSize(bodySize - 1);
      textStyle(isMatch ? BOLD : NORMAL);
      drawLines([status], x + 6, y + 5 + lineH, lineH);
      textStyle(NORMAL);
      textSize(bodySize);
    }
    fill(dim ? 'gray' : 'black');
    drawLines(condLines, x + ruleColW, y + 5, lineH);
    y += h + 4;
  }
  return y;
}

function drawAction(x, y, w) {
  const a = ACTIONS[actionIdx];
  textSize(bodySize);
  fill('black');
  noStroke();
  y = para('Action ' + a.n + ' of 10  |  Correct so far: ' + score, x, y, w) + 2;

  textSize(bodySize + 2);
  fill('navy');
  textStyle(BOLD);
  y = drawLines(wrapText(QUESTION, w), x, y, bodySize + 7) + 6;
  textStyle(NORMAL);

  // proposed action card
  textSize(bodySize + 2);
  textStyle(BOLD);
  const lines = wrapText(a.text, w - 20);
  const h = lines.length * (bodySize + 8) + 34;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(x, y, w, h, 8);
  strokeWeight(1);
  textSize(bodySize - 1);
  textStyle(NORMAL);
  fill('dimgray');
  drawLines(['Proposed action'], x + 10, y + 6, 18);
  textSize(bodySize + 2);
  textStyle(BOLD);
  fill('black');
  drawLines(lines, x + 10, y + 26, bodySize + 8);
  textStyle(NORMAL);
  y += h + 10;

  textSize(bodySize);
  if (!committed) {
    fill('black');
    y = para('Press Allow, Ask, or Deny below. You get one attempt at each action, ' +
      'and the answer cannot be changed after you press it.', x, y, w);
    return y;
  }

  const correct = correctOutcome(a);
  const pick = picks[actionIdx];
  const ok = pick === correct;
  const msg = ok ? '✓ Correct: ' + correct + '.' : '✗ The policy gives ' + correct + '.';
  // feedback box
  textSize(bodySize + 2);
  textStyle(BOLD);
  const msgLines = wrapText(msg, w - 20);
  textSize(bodySize);
  textStyle(NORMAL);
  const yourLines = ok ? [] : wrapText('Your answer: ' + pick, w - 20);
  const whyLines = wrapText(a.why, w - 20);
  const fh = msgLines.length * (bodySize + 7) + (yourLines.length + whyLines.length) * lineH + 14;
  fill(ok ? BLUE_FILL : VERMILLION_FILL);
  stroke(ok ? BLUE : VERMILLION);
  strokeWeight(3);
  rect(x, y, w, fh, 8);
  strokeWeight(1);
  textSize(bodySize + 2);
  textStyle(BOLD);
  fill(ok ? BLUE : VERMILLION);
  let yy = drawLines(msgLines, x + 10, y + 7, bodySize + 7);
  textStyle(NORMAL);
  textSize(bodySize);
  fill('black');
  yy = drawLines(yourLines, x + 10, yy, lineH);
  drawLines(whyLines, x + 10, yy, lineH);
  return y + fh;
}

function drawSummary(x, y, w) {
  noStroke();
  fill('black');
  textSize(24);
  textStyle(BOLD);
  y = drawLines([score + ' of 10 correct'], x, y, 30);
  textSize(bodySize);
  const mastered = score >= MASTERY;
  fill(mastered ? BLUE : VERMILLION);
  y = para(mastered
    ? '✓ Mastery threshold of ' + MASTERY + ' met.'
    : '✗ Mastery threshold of ' + MASTERY + ' not met.', x, y, w, BOLD) + 10;

  fill('black');
  y = para('Actions the policy sends to Ask:', x, y, w, BOLD) + 4;
  for (const a of ACTIONS) {
    if (correctOutcome(a) !== 'Ask') continue;
    const lines = wrapText('Action ' + a.n + ': ' + a.text, w - 20);
    const h = lines.length * lineH + 10;
    fill('white');
    stroke('gray');
    strokeWeight(1);
    rect(x, y, w, h, 6);
    fill('black');
    drawLines(lines, x + 10, y + 5, lineH);
    y += h + 4;
  }
  y += 4;
  fill('black');
  y = para('These are the approvals the researcher would see.', x, y, w);
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
