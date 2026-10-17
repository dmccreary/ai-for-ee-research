// Review Checkpoint Judge MicroSim
// CANVAS_HEIGHT: 740
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner judges eight agent steps from an analysis workflow, one at a time in a shuffled
// order. For each step the learner commits a judgment ("Review required" or "No review needed")
// together with the main reason, chosen from the three criteria or "No criterion applies".
// One commit per step, no change after commit, feedback with the Why sentence, a score of
// n of 8 (judgments only, mastery at 7 or more), and a reshuffled second run.
// The design is width responsive; controls reflow onto two rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 660;
// Control region: two rows of controls = (2 x 35) + 10 = 80
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
const CRITERIA = [
  { name: 'Reversibility', question: 'Is the action irreversible?' },
  { name: 'Outward effect',
    question: 'Does the output leave your control by being sent, published, or used to commit resources?' },
  { name: 'Reported result', question: 'Does the output become a result you will report?' }
];
const RULE = 'A step requires review when at least one criterion applies.';

// The four reasons offered in the drop-down list (index 3 means no criterion applies)
const REASONS = ['Reversibility', 'Outward effect', 'Reported result', 'No criterion applies'];
const NO_CRITERION = 3;

const JUDGMENTS = ['Review required', 'No review needed'];

// review: true = "Review required"; reason: index into REASONS
const STEPS = [
  { id: 1, text: 'The agent lists 20 candidate keywords for a literature search',
    review: false, reason: 3,
    why: 'A poor keyword only wastes one search, and you see it at once' },
  { id: 2, text: 'The agent reports "Smith 2021 shows 12-bit ENOB at 40 µW" with a citation',
    review: true, reason: 2,
    why: 'The claim and the citation may be fabricated, and would enter your paper' },
  { id: 3, text: 'The agent renames a column header in a copy of the data file',
    review: false, reason: 3,
    why: 'The change is reversible, the original is preserved, and it is easy to see' },
  { id: 4, text: 'The agent runs a script that overwrites the raw measurement files',
    review: true, reason: 0,
    why: 'Raw data lost this way cannot be recovered' },
  { id: 5, text: 'The agent computes ENOB = 10.3 from your data and says it will go in the abstract',
    review: true, reason: 2,
    why: 'A number entering a manuscript must be checked independently' },
  { id: 6, text: 'The agent sends an email asking a collaborator for a dataset',
    review: true, reason: 1,
    why: 'Sending cannot be undone and the message speaks for you' },
  { id: 7, text: 'The agent drafts the same email and leaves it unsent in the drafts folder',
    review: false, reason: 3,
    why: 'Nothing leaves your control until you send it' },
  { id: 8, text: 'The agent changes a simulation parameter on a scratch branch under version control',
    review: false, reason: 3,
    why: 'The change is reversible and isolated from the main work' }
];

const QUESTION = 'Does this output need your review before it is used?';
const MASTERY = 7;   // mastery requires a score >= 7 of 8

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let order = [];          // shuffled step indexes for this run
let stepPos = 0;         // position in order (0..7)
let committed = false;   // has the current step been judged?
let chosenReview = null; // learner's judgment for the current step (true / false)
let chosenReason = -1;   // learner's reason for the current step
let blocked = false;     // a commit was attempted without a reason
let runScore = 0;        // correct judgments so far in this run
let missed = [];         // [{step, review, reason}] for this run
let runHistory = [];     // scores of completed runs
let runNumber = 1;
let finished = false;    // summary screen showing
let summaryPage = 0;
let summaryPageCount = 1;
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let reasonSelect;
let reviewButton;
let noReviewButton;
let nextButton;
let moreButton;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
let lrs = null, stepStart = 0;   // concept: Review Checkpoint (193)

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  reasonSelect = createSelect();
  reasonSelect.parent(document.querySelector('main'));
  reasonSelect.option('Choose the main reason', '-1');
  for (let r = 0; r < REASONS.length; r++) reasonSelect.option(REASONS[r], String(r));
  reasonSelect.selected('-1');
  reasonSelect.style('font-size', '16px');
  reasonSelect.style('padding', '3px');
  reasonSelect.changed(reasonChanged);

  reviewButton = makeButton('Review required', () => commitJudgment(true));
  noReviewButton = makeButton('No review needed', () => commitJudgment(false));
  nextButton = makeButton('Next Step', nextPressed);
  moreButton = makeButton('More Missed Steps', nextSummaryPage);

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Review Checkpoint Judge', concept: LRS.conceptId(193), mount: '#xapi-slot',
                          source: 'the Review Checkpoint Judge MicroSim', pageDwell: true });
  }

  startRun();

  describe('Review Checkpoint Judge. The three review criteria are always shown: Reversibility, ' +
    'is the action irreversible? Outward effect, does the output leave your control by being ' +
    'sent, published, or used to commit resources? Reported result, does the output become a ' +
    'result you will report? A step requires review when at least one criterion applies. One ' +
    'agent step is shown at a time with the question: Does this output need your review before ' +
    'it is used? Choose the main reason in the drop-down list, then press Review required or No ' +
    'review needed to commit both. The sim says Correct, Right decision, different reason, or Not ' +
    'quite, and shows the Why sentence. After eight steps it shows the score out of 8, whether ' +
    'mastery (7 of 8) was reached, and the steps judged incorrectly. Run Again reshuffles the steps.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function makeButton(label, handler) {
  const b = createButton(label);
  b.parent(document.querySelector('main'));
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
  b.mousePressed(handler);
  return b;
}

// ---------------------------------------------------------------
// Run logic
// ---------------------------------------------------------------
function shuffledOrder() {
  const a = [];
  for (let i = 0; i < STEPS.length; i++) a.push(i);
  for (let i = a.length - 1; i > 0; i--) {   // Fisher-Yates shuffle
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// Starting state: first step shown, neither judgment selected, no reason chosen
function startRun() {
  order = shuffledOrder();
  stepPos = 0;
  runScore = 0;
  missed = [];
  finished = false;
  summaryPage = 0;
  summaryPageCount = 1;
  resetStep();
  updateControls();
  redraw();
}

function resetStep() {
  committed = false;
  chosenReview = null;
  chosenReason = -1;
  blocked = false;
  reasonSelect.selected('-1');
  stepStart = Date.now();
}

function currentStep() {
  return STEPS[order[stepPos]];
}

function reasonChanged() {
  if (committed) return;
  blocked = false;
  redraw();
}

// Commit the judgment and the reason together: one commit per step, no change after commit
function commitJudgment(review) {
  if (finished || committed) return;
  const r = parseInt(reasonSelect.value(), 10);
  if (isNaN(r) || r < 0) {      // no reason chosen: block the commit, the step is not consumed
    blocked = true;
    redraw();
    return;
  }
  const step = currentStep();
  blocked = false;
  committed = true;
  chosenReview = review;
  chosenReason = r;
  if (lrs) lrs.question('q-step-' + step.id, { name: 'Step ' + step.id + ': ' + step.text, concept: LRS.conceptId(193) })
    .answer({ success: review === step.review,
              response: (review ? 'review-required' : 'no-review-needed') + ':' + LRS.slug(REASONS[r]),
              durationMs: stepStart ? Date.now() - stepStart : undefined,
              extensions: { 'run-number': runNumber, 'reason-matches-key': r === step.reason } });
  if (review === step.review) {
    runScore++;                 // the score counts judgments only
  } else {
    missed.push({ step: step, review: review, reason: r });
  }
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished) {          // button reads "Run Again"
    runNumber++;
    startRun();
    return;
  }
  if (!committed) return;
  if (stepPos < STEPS.length - 1) {
    stepPos++;
    resetStep();
  } else {
    finished = true;
    runHistory.push(runScore);
    summaryPage = 0;
  }
  updateControls();
  redraw();
}

function nextSummaryPage() {
  summaryPage = (summaryPage + 1) % summaryPageCount;
  redraw();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  for (const c of [reasonSelect, reviewButton, noReviewButton]) {
    if (finished) {
      c.hide();
    } else {
      c.show();
      setEnabled(c, !committed);
    }
  }
  if (finished) {
    nextButton.html('Run Again');
    setEnabled(nextButton, true);
  } else {
    nextButton.html(stepPos === STEPS.length - 1 ? 'See Score' : 'Next Step');
    setEnabled(nextButton, committed);
  }
  if (finished && summaryPageCount > 1) moreButton.show();
  else moreButton.hide();
  layoutControls();
}

function setEnabled(c, on) {
  if (on) c.removeAttribute('disabled');
  else c.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a second row when needed
function layoutControls() {
  const visible = [];
  if (!finished) visible.push(reasonSelect, reviewButton, noReviewButton);
  if (finished && summaryPageCount > 1) visible.push(moreButton);
  visible.push(nextButton);
  // On very narrow screens the greedy flow needs three rows; then pair the drop-down list with
  // the Next button on row 1 and put the two judgment buttons together on row 2.
  if (flowControls(visible, false) > 2 && !finished) {
    flowControls([reasonSelect, nextButton, reviewButton, noReviewButton], true);
  }
}

// Place controls left to right from drawHeight + 8, wrapping when a row is full.
// forcePairs puts a row break after every second control. Returns the number of rows used.
function flowControls(list, forcePairs) {
  const gap = 10;
  let x = 10;
  let y = drawHeight + 8;
  let rows = 1;
  for (let i = 0; i < list.length; i++) {
    const c = list[i];
    const w = c.elt.offsetWidth;
    const pairBreak = forcePairs && i > 0 && i % 2 === 0;
    if (x > 10 && (pairBreak || x + w > canvasWidth - 10)) {
      x = 10;
      y += 35;
      rows++;
    }
    c.position(x, y);
    x += w + gap;
  }
  return rows;
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
  text('Review Checkpoint Judge', canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (finished) drawSummary(44);
  else drawPlay(44);
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

function historyText() {
  if (runHistory.length === 0) return '';
  const shown = runHistory.slice(-6);
  const first = runHistory.length - shown.length + 1;
  const parts = shown.map((s, i) => 'Run ' + (first + i) + ': ' + s + ' of 8');
  return 'Scores by run: ' + parts.join(', ');
}

function judgmentName(review) {
  return review ? JUDGMENTS[0] : JUDGMENTS[1];
}

// The three criteria and the rule, shown at all times while judging.
// After a commit, the criterion that is the main reason is marked.
function drawCriteria(y, innerW) {
  const step = currentStep();
  textSize(16);
  const boxX = pad;
  const textW = innerW - 20;

  // measure
  const rows = CRITERIA.map((c, i) => {
    textStyle(BOLD);
    const mark = (committed && step.reason === i) ? '✓ Main reason: ' : '';
    const nameStr = mark + c.name;
    const nameW = textWidth(nameStr + ': ');
    textStyle(NORMAL);
    // name on its own line when the question would be squeezed too narrow
    const inline = nameW < textW * 0.45;
    const qLines = wrapText(c.question, inline ? textW - nameW : textW);
    return { nameStr, nameW, inline, qLines, isMain: committed && step.reason === i };
  });
  textStyle(ITALIC);
  const ruleLines = wrapText(RULE, textW);
  textStyle(NORMAL);
  let h = 6 + 22;   // heading
  for (const r of rows) h += (r.inline ? r.qLines.length : r.qLines.length + 1) * 20 + 6;
  h += ruleLines.length * 20 + 6;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(boxX, y, innerW, h, 8);

  let yy = y + 6;
  fill('black');
  textStyle(BOLD);
  yy = drawLines(['The three criteria'], boxX + 10, yy, 22);
  for (const r of rows) {
    if (r.isMain) {
      // highlight band for the main reason (marked in words as well as color)
      const rowH = (r.inline ? r.qLines.length : r.qLines.length + 1) * 20 + 2;
      fill('honeydew');
      stroke('seagreen');
      strokeWeight(2);
      rect(boxX + 4, yy - 2, innerW - 8, rowH, 6);
      strokeWeight(1);
    }
    fill(r.isMain ? 'darkgreen' : 'navy');
    textStyle(BOLD);
    noStroke();
    textAlign(LEFT, TOP);
    text(r.nameStr + ':', boxX + 10, yy);
    textStyle(NORMAL);
    fill('black');
    if (r.inline) {
      yy = drawLines(r.qLines, boxX + 10 + r.nameW, yy, 20) + 6;
    } else {
      yy = drawLines(r.qLines, boxX + 10, yy + 20, 20) + 6;
    }
  }
  fill('black');
  textStyle(ITALIC);
  yy = drawLines(ruleLines, boxX + 10, yy, 20);
  textStyle(NORMAL);
  return y + h;
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const step = currentStep();

  // status line
  textSize(16);
  fill('black');
  let status = 'Run ' + runNumber + '  |  Step ' + (stepPos + 1) + ' of 8  |  Correct judgments so far: ' +
    runScore;
  if (runHistory.length > 0) {
    status += '  |  Earlier runs: ' + runHistory.slice(-5).join(', ') + ' of 8';
  }
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 4;

  // criteria (always visible)
  y = drawCriteria(y, innerW) + 8;

  // question
  textSize(16);
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  // agent step card
  textSize(18);
  textStyle(BOLD);
  const cardLines = wrapText(step.text, innerW - 24);
  const cardH = cardLines.length * 23 + 20 + 18;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  textSize(16);
  textStyle(NORMAL);
  fill('dimgray');
  drawLines(['Agent step'], pad + 12, y + 8, 20);
  textSize(18);
  textStyle(BOLD);
  fill('black');
  drawLines(cardLines, pad + 12, y + 30, 23);
  textStyle(NORMAL);
  y += cardH + 10;

  textSize(16);
  if (!committed) {
    if (blocked) {
      textStyle(BOLD);
      fill('firebrick');
      y = drawLines(wrapText('! Choose the main reason in the drop-down list first. Your judgment ' +
        'was not recorded.', innerW), pad, y, 20) + 4;
      textStyle(NORMAL);
    }
    fill('black');
    y = drawLines(wrapText('Choose the main reason in the drop-down list, then press Review ' +
      'required or No review needed. The judgment and the reason are committed together and ' +
      'cannot be changed.', innerW), pad, y, 20);
  } else {
    const judgmentRight = chosenReview === step.review;
    const reasonRight = chosenReason === step.reason;
    let verdict, verdictColor;
    if (judgmentRight && reasonRight) { verdict = '✓ Correct'; verdictColor = 'seagreen'; }
    else if (judgmentRight) { verdict = '✓ Right decision, different reason'; verdictColor = 'saddlebrown'; }
    else { verdict = '✗ Not quite'; verdictColor = 'firebrick'; }

    textSize(18);
    textStyle(BOLD);
    fill(verdictColor);
    y = drawLines(wrapText(verdict, innerW), pad, y, 24);
    textSize(16);
    textStyle(NORMAL);
    fill('black');
    y = drawLines(wrapText('Your answer: ' + judgmentName(chosenReview) + '; main reason: ' +
      REASONS[chosenReason] + '.', innerW), pad, y, 20);
    if (judgmentRight && !reasonRight) {
      textStyle(BOLD);
      y = drawLines(wrapText('Correct reason: ' + REASONS[step.reason], innerW), pad, y, 20);
      textStyle(NORMAL);
    } else if (!judgmentRight) {
      textStyle(BOLD);
      y = drawLines(wrapText('Correct judgment: ' + judgmentName(step.review) +
        '; main reason: ' + REASONS[step.reason], innerW), pad, y, 20);
      textStyle(NORMAL);
    }
    y = drawLines(wrapText('Why: ' + step.why + '.', innerW), pad, y, 20);
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(16);
  fill('black');
  y = drawLines(['Run ' + runNumber + ' complete'], pad, y, 20) + 2;

  // score (judgments only)
  textSize(24);
  textStyle(BOLD);
  fill('black');
  y = drawLines([runScore + ' of 8'], pad, y, 30);
  textSize(16);
  textStyle(NORMAL);
  y = drawLines(wrapText('The score counts judgments that match the answer key.', innerW), pad, y, 20);
  textStyle(BOLD);
  const mastered = runScore >= MASTERY;
  fill(mastered ? 'seagreen' : 'firebrick');
  const masteryStr = mastered
    ? '✓ Mastery reached: at least ' + MASTERY + ' of 8 judgments match the answer key.'
    : '✗ Not yet at mastery: ' + MASTERY + ' of 8 correct judgments are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 4;
  textStyle(NORMAL);

  // score of every run stays visible
  fill('black');
  y = drawLines(wrapText(historyText(), innerW), pad, y, 20) + 8;

  // steps judged incorrectly
  textStyle(BOLD);
  y = drawLines(['Steps judged incorrectly: ' + missed.length], pad, y, 20) + 4;
  textStyle(NORMAL);

  if (missed.length === 0) {
    y = drawLines(wrapText('None. Every judgment matched the answer key.', innerW), pad, y, 20);
    summaryPageCount = 1;
    layoutBottom = y;
    syncMoreButton();
    return;
  }

  // measure every missed item at the current width, then split into pages
  const items = missed.map(m => {
    textStyle(BOLD);
    const stepLines = wrapText(m.step.text, innerW - 20);
    textStyle(NORMAL);
    const detailLines = wrapText('Your judgment: ' + judgmentName(m.review) +
      '. Correct judgment: ' + judgmentName(m.step.review) + '. Why: ' + m.step.why + '.', innerW - 20);
    return { stepLines, detailLines, h: (stepLines.length + detailLines.length) * 20 + 16 };
  });
  const footerH = 26;
  const avail = drawHeight - y - footerH - 6;
  const pages = [];
  let cur = [];
  let used = 0;
  for (const it of items) {
    if (cur.length > 0 && used + it.h > avail) {
      pages.push(cur);
      cur = [];
      used = 0;
    }
    cur.push(it);
    used += it.h + 6;
  }
  if (cur.length > 0) pages.push(cur);
  summaryPageCount = pages.length;
  if (summaryPage >= summaryPageCount) summaryPage = 0;

  for (const it of pages[summaryPage]) {
    fill('white');
    stroke('firebrick');
    strokeWeight(1);
    rect(pad, y, innerW, it.h, 8);
    fill('black');
    textStyle(BOLD);
    const yy = drawLines(it.stepLines, pad + 10, y + 8, 20);
    textStyle(NORMAL);
    drawLines(it.detailLines, pad + 10, yy, 20);
    y += it.h + 6;
  }
  layoutBottom = y;

  if (summaryPageCount > 1) {
    fill('dimgray');
    textSize(16);
    noStroke();
    textAlign(LEFT, TOP);
    text('Missed steps: page ' + (summaryPage + 1) + ' of ' + summaryPageCount,
      pad, drawHeight - footerH);
  }
  syncMoreButton();
}

// The page count is known only after measuring text, so show/hide the More button here
function syncMoreButton() {
  const shouldShow = finished && summaryPageCount > 1;
  const isShown = moreButton.elt.style.display !== 'none';
  if (shouldShow !== isShown) {
    if (shouldShow) moreButton.show(); else moreButton.hide();
    layoutControls();
  }
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
