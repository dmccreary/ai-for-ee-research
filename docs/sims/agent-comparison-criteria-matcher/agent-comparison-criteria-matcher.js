// Personal Agent Comparison Criteria Matcher MicroSim
// CANVAS_HEIGHT: 560
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner classifies eight questions about a personal agent under the comparison
// criterion each one tests. The eight criteria are shown as buttons in an order shuffled
// once per learner; correctness is checked by criterion name, never by button position.
// One attempt per question, fixed question order, the correct criterion is always revealed,
// and the end screen shows "n of 8 correct" (mastery at 7) and a one-line test per criterion.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let canvasHeight = 560;
let containerHeight = canvasHeight;
// The control region holds the criterion buttons in a grid (2, 3 or 4 columns by width)
// plus one row for Submit and Next. Its height is recomputed in layoutControls().
let controlHeight = 204;
let drawHeight = canvasHeight - controlHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const CRITERIA = [
  'Where it runs',
  'Blast radius',
  'Approval model',
  'Usage metering',
  'Data exposure',
  'Memory',
  'Claim verification',
  'Activity audit'
];

// Fixed question order. answer is the criterion name (not a position).
const QUESTIONS = [
  { id: 1, text: 'Does the agent run on my laptop, in the vendor\'s cloud, or on a server I manage?',
    answer: 'Where it runs', why: 'It asks about the location of the computation and the data.' },
  { id: 2, text: 'If one agent is compromised, can it reach the files and logins of my other agents?',
    answer: 'Blast radius', why: 'It asks how far a failure can spread.' },
  { id: 3, text: 'Which actions does it take alone, which does it ask me about, and can I add my own rules?',
    answer: 'Approval model', why: 'It asks about the policy that decides what needs a human.' },
  { id: 4, text: 'What does my bill look like if an hourly routine runs all week?',
    answer: 'Usage metering', why: 'It asks how consumption is counted and capped.' },
  { id: 5, text: 'Are my inputs used for training by default, and for how long are they kept?',
    answer: 'Data exposure', why: 'It asks what happens to the data given to the agent.' },
  { id: 6, text: 'Can I see and edit what the agent remembers between sessions?',
    answer: 'Memory', why: 'It asks about the inspectability and control of persisted context.' },
  { id: 7, text: 'Has anyone other than the vendor tested the claim that it does what is advertised?',
    answer: 'Claim verification', why: 'It asks for independent evidence behind a claim.' },
  { id: 8, text: 'What record of last night\'s actions will I have in the morning?',
    answer: 'Activity audit', why: 'It asks about the log available for review.' }
];

// One-line test per criterion, shown on the end screen (Learner Activity step 4)
const TESTS = [
  { criterion: 'Where it runs',
    test: 'Ask where its files are stored, then see if a task runs with your laptop closed.' },
  { criterion: 'Blast radius',
    test: 'Have one agent save a test file and see whether a second agent can read it.' },
  { criterion: 'Approval model',
    test: 'Ask it to do a harmless sensitive action and see whether it stops to ask you.' },
  { criterion: 'Usage metering',
    test: 'Run an hourly routine for one day and read the usage meter before and after.' },
  { criterion: 'Data exposure',
    test: 'Find the training and retention settings and note what is on by default.' },
  { criterion: 'Memory',
    test: 'Tell it a made-up fact, then find, edit, and delete it in its memory.' },
  { criterion: 'Claim verification',
    test: 'Pick one advertised claim and test it with synthetic data in a throwaway account.' },
  { criterion: 'Activity audit',
    test: 'Leave a small task running overnight and check that the morning log lists every action.' }
];

const PROMPT = 'Which criterion does this question test?';
const MASTERY = 7;                 // mastery requires a score >= 7 of 8
const N_Q = QUESTIONS.length;      // 8

// ---------------------------------------------------------------
// Pure logic (no p5 calls; testable outside the browser)
// ---------------------------------------------------------------
// Fisher-Yates shuffle of 0..n-1 using the supplied random function
function shuffledOrder(n, rng) {
  const a = [];
  for (let i = 0; i < n; i++) a.push(i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// Criterion name shown on button position i for a given shuffled order
function criterionAtButton(order, i) {
  return CRITERIA[order[i]];
}

// A classification is correct when the chosen criterion name equals the answer
function isCorrect(question, criterionName) {
  return criterionName === question.answer;
}

function feedbackHeadline(question, criterionName) {
  return isCorrect(question, criterionName)
    ? 'Correct: ' + question.answer + '.'
    : 'This asks about ' + question.answer + '.';
}

function scoreLine(score) {
  return score + ' of ' + N_Q + ' correct';
}

function masteryMet(score) {
  return score >= MASTERY;
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let criteriaOrder = [];  // shuffled once per learner (page load)
let qPos = 0;            // position in QUESTIONS (0..7)
let chosen = -1;         // index into CRITERIA of the current choice, -1 for none
let committed = false;   // has the current question been submitted?
let score = 0;           // correct first attempts so far
let finished = false;    // end screen showing
let testPage = 0;        // page of the one-line tests on the end screen
let testPageCount = 1;
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let criterionButtons = []; // criterionButtons[i] shows CRITERIA[criteriaOrder[i]]
let submitButton;
let nextButton;
let moreButton;

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(365);   // Agent Comparison Criteria
// Concept each question is evidence for (the criterion it tests); 365 where the book has no finer concept.
const Q_CONCEPT = () => ({ 1: LRS.conceptId(365), 2: LRS.conceptId(363), 3: LRS.conceptId(365),
  4: LRS.conceptId(364), 5: LRS.conceptId(367), 6: LRS.conceptId(150), 7: LRS.conceptId(366),
  8: LRS.conceptId(368) });
let lrs = null, qConcepts = null, qStart = Date.now();

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // shuffle the criteria once for this learner
  criteriaOrder = shuffledOrder(CRITERIA.length, Math.random);

  // Create ALL controls before laying them out
  for (let i = 0; i < criteriaOrder.length; i++) {
    const c = criteriaOrder[i];
    const b = createButton(CRITERIA[c]);
    b.parent(document.querySelector('main'));
    b.style('font-size', '16px');
    b.style('padding', '2px 2px');
    b.style('white-space', 'nowrap');
    b.mouseClicked(() => chooseCriterion(c)); // click also fires for Enter and Space
    criterionButtons.push(b);
  }
  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleActionButton(submitButton);
  submitButton.mouseClicked(submitChoice);

  nextButton = createButton('Next Question');
  nextButton.parent(document.querySelector('main'));
  styleActionButton(nextButton);
  nextButton.mouseClicked(nextPressed);

  moreButton = createButton('More Tests');
  moreButton.parent(document.querySelector('main'));
  styleActionButton(moreButton);
  moreButton.mouseClicked(nextTestPage);

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Personal Agent Comparison Criteria Matcher', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Personal Agent Comparison Criteria Matcher MicroSim', pageDwell: true });
    qConcepts = Q_CONCEPT();
  }

  updateControls();

  describe('Personal Agent Comparison Criteria Matcher. Eight questions a researcher might ask ' +
    'about a personal agent are shown one at a time, with eight comparison criteria as buttons: ' +
    'Where it runs, Blast radius, Approval model, Usage metering, Data exposure, Memory, Claim ' +
    'verification, and Activity audit, in a shuffled order. Choose a criterion and press Submit. ' +
    'Each question has one attempt; the sim says whether you were correct, names the correct ' +
    'criterion, and explains why. After question 8 it shows the score out of 8, whether the ' +
    'mastery threshold of 7 was met, and a one-line test for each criterion.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleActionButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '2px 12px');
  b.style('white-space', 'nowrap');
}

// ---------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------
function chooseCriterion(c) {
  if (finished || committed) return;
  chosen = c;
  updateControls();
  redraw();
}

function submitChoice() {
  if (finished || committed || chosen < 0) return;
  if (lrs) lrs.question('q-question-' + QUESTIONS[qPos].id, { name: 'Question ' + QUESTIONS[qPos].id + ': ' + QUESTIONS[qPos].text,
      concept: qConcepts[QUESTIONS[qPos].id] })
    .answer({ success: isCorrect(QUESTIONS[qPos], CRITERIA[chosen]), response: LRS.slug(CRITERIA[chosen]),
              durationMs: Date.now() - qStart });
  committed = true;
  if (isCorrect(QUESTIONS[qPos], CRITERIA[chosen])) score++;
  updateControls();
  redraw();
  nextButton.elt.focus();
}

function nextPressed() {
  if (finished || !committed) return;
  if (qPos < N_Q - 1) {
    qPos++;
    committed = false;
    chosen = -1;
    qStart = Date.now();
    updateControls();
    redraw();
    criterionButtons[0].elt.focus();
  } else {
    finished = true;
    testPage = 0;
    updateControls();
    redraw();
  }
}

function nextTestPage() {
  testPage = (testPage + 1) % testPageCount;
  redraw();
}

// Enable, disable, show, hide, relabel and restyle the controls to match the state
function updateControls() {
  const q = QUESTIONS[qPos];
  for (let i = 0; i < criterionButtons.length; i++) {
    const b = criterionButtons[i];
    const c = criteriaOrder[i];
    if (finished) { b.hide(); continue; }
    b.show();
    let prefix = '';
    let bg = 'white', fg = 'black', border = '2px solid gray', weight = 'normal';
    if (!committed) {
      setEnabled(b, true);
      if (c === chosen) {
        prefix = '● ';               // filled circle: chosen
        bg = 'navy'; fg = 'white'; border = '2px solid navy';
      }
    } else {
      setEnabled(b, false);
      if (CRITERIA[c] === q.answer) {
        prefix = '✓ ';               // check mark: correct criterion
        bg = 'lightblue'; border = '3px solid mediumblue';
      } else if (c === chosen) {
        prefix = '✗ ';               // ballot x: wrong pick
        bg = 'moccasin'; border = '3px dashed darkorange';
      } else {
        bg = 'whitesmoke'; fg = 'dimgray'; border = '2px solid silver';
      }
    }
    b.html(prefix + CRITERIA[c]);
    b.style('background-color', bg);
    b.style('color', fg);
    b.style('border', border);
    b.style('font-weight', weight);
    b.style('border-radius', '6px');
    b.attribute('aria-pressed', (c === chosen) ? 'true' : 'false');
  }

  if (finished) {
    submitButton.hide();
    nextButton.hide();
  } else {
    submitButton.show();
    nextButton.show();
    setEnabled(submitButton, !committed && chosen >= 0);
    setEnabled(nextButton, committed);
    nextButton.html(qPos === N_Q - 1 ? 'See Score' : 'Next Question');
  }
  if (finished && testPageCount > 1) moreButton.show();
  else moreButton.hide();
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

function gridColumns() {
  if (canvasWidth >= 700) return 4;
  if (canvasWidth >= 540) return 3;
  return 2;
}

// Criterion buttons in a grid; Submit and Next in a row below. The draw region takes
// whatever height the controls do not need, so the total canvas height stays fixed.
function layoutControls() {
  const gap = 6;
  const bh = 32;
  const rowStep = bh + 6;
  if (finished) {
    controlHeight = 50;
    drawHeight = canvasHeight - controlHeight;
    moreButton.position(10, drawHeight + 9);
    return;
  }
  const cols = gridColumns();
  const rows = Math.ceil(criterionButtons.length / cols);
  controlHeight = rows * rowStep + rowStep + 14;
  drawHeight = canvasHeight - controlHeight;
  const bw = Math.floor((canvasWidth - 20 - (cols - 1) * gap) / cols);
  const y0 = drawHeight + 8;
  for (let i = 0; i < criterionButtons.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    criterionButtons[i].size(bw, bh);
    criterionButtons[i].position(10 + col * (bw + gap), y0 + row * rowStep);
  }
  const ay = y0 + rows * rowStep + 2;
  submitButton.position(10, ay);
  nextButton.position(10 + submitButton.elt.offsetWidth + 12, ay);
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
  textSize(canvasWidth < 420 ? 20 : 24);
  const title = canvasWidth < 420 ? 'Agent Criteria Matcher' : 'Personal Agent Comparison Criteria Matcher';
  text(title, canvasWidth / 2, 10);
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

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const q = QUESTIONS[qPos];

  // status line
  textSize(16);
  fill('black');
  y = drawLines(wrapText('Question ' + (qPos + 1) + ' of ' + N_Q + '  |  Correct so far: ' + score,
    innerW), pad, y, 20) + 6;

  // question card
  textSize(18);
  textStyle(BOLD);
  const qLines = wrapText(q.text, innerW - 24);
  const cardH = qLines.length * 23 + 18;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  fill('black');
  drawLines(qLines, pad + 12, y + 10, 23);
  textStyle(NORMAL);
  y += cardH + 10;

  // the question on screen
  textSize(18);
  textStyle(ITALIC);
  fill('navy');
  y = drawLines(wrapText(PROMPT, innerW), pad, y, 24) + 6;
  textStyle(NORMAL);

  // instructions or feedback
  textSize(16);
  if (!committed) {
    fill('black');
    const msg = (chosen < 0)
      ? 'Choose one of the eight criteria below, then press Submit. Each question gets one attempt.'
      : 'Your choice: ' + CRITERIA[chosen] + '. Press Submit to commit it, or choose another criterion first.';
    y = drawLines(wrapText(msg, innerW), pad, y, 20);
  } else {
    const correct = isCorrect(q, CRITERIA[chosen]);
    textSize(18);
    textStyle(BOLD);
    fill(correct ? 'mediumblue' : 'saddlebrown');
    y = drawLines(wrapText((correct ? '✓ ' : '✗ ') + feedbackHeadline(q, CRITERIA[chosen]),
      innerW), pad, y, 24);
    textStyle(NORMAL);
    textSize(16);
    fill('black');
    y = drawLines(wrapText('Why: ' + q.why, innerW), pad, y, 20);
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(16);
  fill('black');
  y = drawLines(['All ' + N_Q + ' questions answered'], pad, y, 20) + 2;

  // score line
  textSize(26);
  textStyle(BOLD);
  y = drawLines([scoreLine(score)], pad, y, 32);
  textSize(16);
  const met = masteryMet(score);
  fill(met ? 'mediumblue' : 'saddlebrown');
  const masteryStr = met
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of ' + N_Q + ' correct.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of ' + N_Q + ' correct are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, 20) + 10;

  // one-line tests
  fill('black');
  textStyle(BOLD);
  y = drawLines(wrapText('A one-line test for each criterion that you could run on a real product:',
    innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  // measure every test at this width, then split into pages that fit
  const itemGap = 8;
  const heights = TESTS.map(t =>
    labeledParagraph(t.criterion + ':', t.test, pad + 10, 0, innerW - 20, 20, false) + 10);
  const footerH = 24;
  const avail = drawHeight - y - footerH - 4;
  const pages = [];
  let cur = [];
  let used = 0;
  for (let i = 0; i < TESTS.length; i++) {
    if (cur.length > 0 && used + heights[i] > avail) {
      pages.push(cur);
      cur = [];
      used = 0;
    }
    cur.push(i);
    used += heights[i] + itemGap;
  }
  if (cur.length > 0) pages.push(cur);
  testPageCount = pages.length;
  if (testPage >= testPageCount) testPage = 0;

  for (const i of pages[testPage]) {
    fill('white');
    stroke('silver');
    strokeWeight(1);
    rect(pad, y, innerW, heights[i], 8);
    fill('black');
    labeledParagraph(TESTS[i].criterion + ':', TESTS[i].test, pad + 10, y + 5, innerW - 20, 20, true);
    y += heights[i] + itemGap;
  }
  layoutBottom = y;

  if (testPageCount > 1) {
    fill('dimgray');
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text('Tests: page ' + (testPage + 1) + ' of ' + testPageCount, pad, drawHeight - footerH);
  }
  syncMoreButton();
}

// The page count is known only after measuring text, so show/hide the More button here
function syncMoreButton() {
  const shouldShow = finished && testPageCount > 1;
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
