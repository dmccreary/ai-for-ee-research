// Research Task Decomposition Builder MicroSim
// CANVAS_HEIGHT: 860
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner builds one ordered list of subtasks for the goal "Compare the measured and
// simulated ENOB of two ADC designs" from eight shuffled candidate cards (six correct subtasks
// S1-S6 and two distractors D1, D2), then submits it. The sim checks membership and the
// prerequisite order, reports every problem with its Why sentence, allows two submissions,
// and then reveals the answer with the reason for every card.
// The design is width responsive; controls reflow onto two rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 780;
// Control region: two rows of controls = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let wideWidth = 860;        // at or above this width the cards and the sequence sit side by side

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const GOAL = 'Compare the measured and simulated ENOB of two ADC designs.';
const QUESTION = 'Which of these are well-formed subtasks for this goal, and in what order?';
const VALID_MESSAGE = 'Valid: six subtasks, every prerequisite in place.';
const MAX_SUBMISSIONS = 2;

const SUBTASKS = [
  { id: 'S1', text: 'Define the ENOB measurement procedure: input frequency, amplitude, and record length',
    inAnswer: true, prereq: [],
    why: 'Both simulation and measurement must use the same procedure, so it comes first' },
  { id: 'S2', text: 'Simulate both designs using the procedure',
    inAnswer: true, prereq: ['S1'], why: 'Needs the procedure from S1' },
  { id: 'S3', text: 'Measure both fabricated chips using the procedure',
    inAnswer: true, prereq: ['S1'], why: 'Needs the procedure from S1; independent of S2' },
  { id: 'S4', text: 'Compute ENOB from each simulated output record',
    inAnswer: true, prereq: ['S2'], why: 'Needs the simulated records from S2' },
  { id: 'S5', text: 'Compute ENOB from each measured output record',
    inAnswer: true, prereq: ['S3'], why: 'Needs the measured records from S3' },
  { id: 'S6', text: 'Compare simulated and measured ENOB and explain the differences',
    inAnswer: true, prereq: ['S4', 'S5'], why: 'Needs both sets of ENOB values' },
  { id: 'D1', text: 'Do the research on the ADC',
    inAnswer: false, prereq: [],
    why: 'Not a subtask: it has no checkable output and no defined scope' },
  { id: 'D2', text: 'Improve the ADC until its ENOB reaches 9.5 bits',
    inAnswer: false, prereq: [],
    why: 'Out of scope: the goal is to compare ENOB, not to change the design' }
];
const LETTERS = 'ABCDEFGH';

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let deck = [];            // deck[slot] = index into SUBTASKS; slot 0..7 is shown as card A..H
let sequence = [];        // the learner's ordered list, as card slots
let submissions = 0;      // counted submissions in this attempt (an empty one is not counted)
let lastCheck = null;     // result of the most recent Check Order
let revealed = false;     // answer and reasons shown; editing locked
let resultText = '';      // "Correct within n submission(s)" or "Not yet correct"
let attempt = 1;
let history = [];         // results of earlier attempts
let infoPage = 0;
let infoPageCount = 1;
let layoutBottom = 0;     // lowest y used by drawn content (used for layout testing)
let infoTop = 0;          // top of the feedback area (used for layout testing)

// controls
let cardSelect;
let toggleButton;         // "Add Card" or "Remove Card" for the selected card
let earlierButton;
let checkButton;
let startOverButton;
let nextPageButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  cardSelect = createSelect();
  cardSelect.parent(document.querySelector('main'));
  cardSelect.option('Pick a card', '-1');
  for (let s = 0; s < 8; s++) cardSelect.option('Card ' + LETTERS[s], String(s));
  cardSelect.selected('-1');
  cardSelect.style('font-size', '16px');
  cardSelect.style('padding', '3px');
  cardSelect.style('width', '120px');
  cardSelect.changed(selectionChanged);

  toggleButton = makeButton('Add Card', toggleSelected);
  earlierButton = makeButton('Move Earlier', moveEarlier);
  checkButton = makeButton('Check Order', checkOrder);
  startOverButton = makeButton('Start Over', startOver);
  nextPageButton = makeButton('Next Page', nextInfoPage);

  newAttempt();

  describe('Research Task Decomposition Builder. The goal is: ' + GOAL + ' Eight candidate ' +
    'subtask cards, labeled A to H in shuffled order, are listed. Choose a card in the drop-down ' +
    'list and press Add Card to append it to your sequence, Remove Card to take it out, or Move ' +
    'Earlier to move it up one position. Press Check Order to submit. The sim reports every ' +
    'problem: a card that does not belong, a missing subtask, or a card placed before its ' +
    'prerequisite, each with a reason. Two submissions are allowed; then the answer and the ' +
    'reason for every card are shown.');

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
// Attempt logic
// ---------------------------------------------------------------
function shuffledDeck() {
  const a = [];
  for (let i = 0; i < SUBTASKS.length; i++) a.push(i);
  for (let i = a.length - 1; i > 0; i--) {   // Fisher-Yates shuffle
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// Starting state: eight cards unselected and unordered, two fresh submissions
function newAttempt() {
  deck = shuffledDeck();
  sequence = [];
  submissions = 0;
  lastCheck = null;
  revealed = false;
  resultText = '';
  infoPage = 0;
  cardSelect.selected('-1');
  updateControls();
  redraw();
}

// Before the answer is revealed, Start Over empties the sequence and keeps the submission count.
// After the answer is revealed, it starts a new attempt with reshuffled cards.
function startOver() {
  if (revealed) {
    attempt++;
    newAttempt();
    return;
  }
  sequence = [];
  infoPage = 0;
  cardSelect.selected('-1');
  updateControls();
  redraw();
}

function selectedSlot() {
  return parseInt(cardSelect.value(), 10);
}

function selectionChanged() {
  infoPage = 0;     // any edit returns a narrow screen to the card view
  updateControls();
  redraw();
}

// Add the selected card to the end of the sequence, or remove it if it is already there
function toggleSelected() {
  if (revealed) return;
  const s = selectedSlot();
  if (s < 0) return;
  const pos = sequence.indexOf(s);
  if (pos >= 0) sequence.splice(pos, 1);
  else sequence.push(s);
  infoPage = 0;
  updateControls();
  redraw();
}

// Move the selected card one position earlier in the sequence
function moveEarlier() {
  if (revealed) return;
  const s = selectedSlot();
  const pos = sequence.indexOf(s);
  if (pos <= 0) return;
  sequence[pos] = sequence[pos - 1];
  sequence[pos - 1] = s;
  infoPage = 0;
  updateControls();
  redraw();
}

function slotOf(id) {
  for (let s = 0; s < deck.length; s++) if (SUBTASKS[deck[s]].id === id) return s;
  return -1;
}

function cardName(slot) {
  return 'Card ' + LETTERS[slot];
}

// Append the card letter to every subtask id in a Why sentence, e.g. "S2" -> "S2 (Card F)"
function whyWithCards(why) {
  return why.replace(/S([1-6])/g, (m) => m + ' (' + cardName(slotOf(m)) + ')');
}

// Check the Rules and list every problem found
function evaluate(seq) {
  const problems = [];
  if (seq.length < 6) {
    problems.push({ kind: 'incomplete',
      title: '✗ Incomplete',
      body: 'The sequence has ' + seq.length + (seq.length === 1 ? ' card' : ' cards') +
        '. A complete decomposition of this goal has six subtasks.' });
  }
  // distractors included
  for (const s of seq) {
    const t = SUBTASKS[deck[s]];
    if (!t.inAnswer) {
      problems.push({ kind: 'distractor',
        title: '✗ ' + cardName(s) + ' does not belong in the sequence',
        body: '"' + t.text + '." Why: ' + t.why + '.' });
    }
  }
  // required subtasks missing
  for (let i = 0; i < SUBTASKS.length; i++) {
    const t = SUBTASKS[i];
    if (!t.inAnswer) continue;
    const s = slotOf(t.id);
    if (seq.indexOf(s) < 0) {
      problems.push({ kind: 'missing',
        title: '✗ Missing required subtask: ' + cardName(s),
        body: '"' + t.text + '."' });
    }
  }
  // ordering violations: each prerequisite present in the list must appear earlier
  for (let p = 0; p < seq.length; p++) {
    const t = SUBTASKS[deck[seq[p]]];
    if (!t.inAnswer) continue;
    for (const pid of t.prereq) {
      const ps = slotOf(pid);
      const q = seq.indexOf(ps);
      if (q > p) {
        problems.push({ kind: 'order',
          title: '✗ Order: ' + cardName(seq[p]) + ' comes before its prerequisite ' + cardName(ps),
          body: cardName(seq[p]) + ' is at position ' + (p + 1) + ' and ' + cardName(ps) +
            ' is at position ' + (q + 1) + '. Why: ' + whyWithCards(t.why) + '.' });
      }
    }
  }
  return problems;
}

function checkOrder() {
  if (revealed) return;
  infoPage = 0;
  if (sequence.length === 0) {
    lastCheck = { rejected: true };   // an empty submission is rejected and not counted
    updateControls();
    redraw();
    return;
  }
  submissions++;
  const problems = evaluate(sequence);
  lastCheck = { rejected: false, submission: submissions, problems: problems,
    correct: problems.length === 0, seq: sequence.slice() };
  if (lastCheck.correct || submissions >= MAX_SUBMISSIONS) {
    revealed = true;
    resultText = lastCheck.correct
      ? 'Correct within ' + submissions + (submissions === 1 ? ' submission' : ' submissions')
      : 'Not yet correct';
    history.push(resultText);
  }
  // on a narrow screen, jump from the card view to the first page of feedback
  infoPage = (canvasWidth < wideWidth && !revealed) ? 1 : 0;
  updateControls();
  redraw();
}

function nextInfoPage() {
  infoPage = (infoPage + 1) % infoPageCount;
  redraw();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  // drop-down labels show the position of each card already in the sequence
  for (let s = 0; s < 8; s++) {
    const pos = sequence.indexOf(s);
    cardSelect.elt.options[s + 1].text = cardName(s) + (pos >= 0 ? ' (#' + (pos + 1) + ')' : '');
  }
  const editors = [cardSelect, toggleButton, earlierButton, checkButton];
  for (const c of editors) {
    if (revealed) c.hide(); else c.show();
  }
  if (!revealed) {
    const s = selectedSlot();
    const pos = s >= 0 ? sequence.indexOf(s) : -1;
    toggleButton.html(pos >= 0 ? 'Remove Card' : 'Add Card');
    setEnabled(toggleButton, s >= 0);
    setEnabled(earlierButton, pos > 0);
    setEnabled(checkButton, true);
  }
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a second row when needed
function layoutControls() {
  const visible = [];
  if (!revealed) visible.push(cardSelect, toggleButton, earlierButton, checkButton);
  visible.push(startOverButton);
  if (infoPageCount > 1) visible.push(nextPageButton);
  nextPageButton.style('display', infoPageCount > 1 ? 'inline-block' : 'none');
  const gap = 10;
  let x = 10;
  let y = drawHeight + 8;
  for (const c of visible) {
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

  // drawing region background and border
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  // control region background
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);

  const innerW = canvasWidth - 2 * pad;

  // title (wraps onto two lines at narrow widths)
  fill('black');
  textSize(24);
  textStyle(BOLD);
  let y = 8;
  for (const ln of wrapText('Research Task Decomposition Builder', innerW)) {
    noStroke();
    textAlign(CENTER, TOP);
    text(ln, canvasWidth / 2, y);
    y += 30;
  }
  textStyle(NORMAL);
  y += 2;

  // question
  textSize(16);
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 6;
  textStyle(NORMAL);

  // goal box
  textStyle(BOLD);
  const goalLines = wrapText('Goal: ' + GOAL, innerW - 20);
  const goalH = goalLines.length * 20 + 12;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, goalH, 8);
  strokeWeight(1);
  fill('black');
  drawLines(goalLines, pad + 10, y + 6, 20);
  textStyle(NORMAL);
  y += goalH + 6;

  // status line
  fill('dimgray');
  let status = 'Submissions used: ' + submissions + ' of ' + MAX_SUBMISSIONS;
  if (attempt > 1) status += '  |  Attempt ' + attempt;
  if (history.length > 0) status += '  |  Results: ' + history.slice(-2).join('; ');
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 6;

  if (revealed) {
    // editing is locked: show the submitted sequence compactly and give the rest to the answer
    y = drawCompactSequence(lastCheck.seq, 'Your submitted sequence: ', y, innerW) + 6;
    infoTop = y;
    drawPaged(buildInfoBlocks(), y, innerW, 0);
  } else if (canvasWidth >= wideWidth) {
    // two columns: candidate cards on the left, the numbered sequence on the right,
    // then the feedback below in two columns
    const colW = (innerW - pad) / 2;
    const yCards = drawCards(pad, y, colW);
    const ySeq = drawSequenceList(pad + colW + pad, y, colW);
    y = max(yCards, ySeq) + 6;
    infoTop = y;
    drawPaged(buildInfoBlocks(), y, innerW, 0);
  } else {
    drawNarrow(y, innerW);
  }
}

// Narrow screens: page 0 is the card view; later pages hold the feedback on the last submission
function drawNarrow(panelTop, innerW) {
  const hasFeedback = lastCheck !== null && !lastCheck.rejected;
  const fb = hasFeedback ? buildInfoBlocks() : [];
  if (infoPage === 0 || !hasFeedback) {
    let y = drawCards(pad, panelTop, innerW) + 2;
    y = drawCompactSequence(sequence, 'My sequence: ', y + 2, innerW) + 6;
    infoTop = y;
    let note;
    if (lastCheck === null) note = { kind: 'note', title: '', body: HINT };
    else if (lastCheck.rejected) note = REJECTED_BLOCK;
    else note = { kind: fb[0].kind, title: fb[0].title, body: 'Press Next Page to read the feedback.' };
    layoutBottom = drawPaged([note], y, innerW, -1);
    // count the card view plus the feedback pages
    const fbPages = hasFeedback ? measurePages(fb, panelTop, innerW, 1) : [];
    setPageCount(hasFeedback ? 1 + fbPages.length : 1);
  } else {
    infoTop = panelTop;
    drawPaged(fb, panelTop, innerW, 1);
  }
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

// The eight candidate cards in shuffled order; returns the y below the last card
function drawCards(x, y, w) {
  const gutter = 52;
  const sel = selectedSlot();
  textSize(16);
  for (let s = 0; s < deck.length; s++) {
    const t = SUBTASKS[deck[s]];
    const pos = sequence.indexOf(s);
    textStyle(NORMAL);
    const lines = wrapText(t.text, w - gutter - 10);
    const h = lines.length * 20 + 8;

    // a card already in the sequence is shaded and shows its position number
    if (pos >= 0) fill('lavender'); else fill('white');
    if (s === sel) { stroke('navy'); strokeWeight(3); }
    else { stroke(pos >= 0 ? 'slateblue' : 'silver'); strokeWeight(1); }
    rect(x, y, w, h, 6);
    strokeWeight(1);

    fill('black');
    textStyle(BOLD);
    noStroke();
    textAlign(LEFT, TOP);
    text(LETTERS[s], x + 8, y + 4);
    if (pos >= 0) {
      fill('slateblue');
      noStroke();
      text('#' + (pos + 1), x + 24, y + 4);
    }
    textStyle(NORMAL);
    fill('black');
    drawLines(lines, x + gutter, y + 4, 20);
    y += h + 3;
  }
  return y;
}

// Numbered list with the full card text (wide layout)
function drawSequenceList(x, y, w) {
  textSize(16);
  textStyle(BOLD);
  fill('black');
  y = drawLines(['My sequence'], x, y, 22);
  textStyle(NORMAL);
  if (sequence.length === 0) {
    fill('dimgray');
    return drawLines(wrapText('Empty. Add cards from the list on the left.', w), x, y, 20);
  }
  for (let p = 0; p < sequence.length; p++) {
    const s = sequence[p];
    const label = (p + 1) + '. ' + cardName(s) + ': ';
    textStyle(BOLD);
    const labelW = textWidth('8. Card H: ');
    textStyle(NORMAL);
    const lines = wrapText(SUBTASKS[deck[s]].text, w - labelW - 6);
    const h = lines.length * 20 + 8;
    fill('white');
    stroke(s === selectedSlot() ? 'navy' : 'slateblue');
    strokeWeight(s === selectedSlot() ? 3 : 1);
    rect(x, y, w, h, 6);
    strokeWeight(1);
    fill('black');
    textStyle(BOLD);
    noStroke();
    textAlign(LEFT, TOP);
    text(label, x + 6, y + 4);
    textStyle(NORMAL);
    drawLines(lines, x + 6 + labelW, y + 4, 20);
    y += h + 4;
  }
  return y;
}

// The sequence as a single wrapped line: "1. Card C, 2. Card A, ..."
function drawCompactSequence(seq, prefix, y, w) {
  textSize(16);
  fill('black');
  // a non-breaking space keeps each number with its card letter when the line wraps
  const items = seq.map((s, p) => (p + 1) + '.\u00a0' + LETTERS[s]);
  const str = prefix + (items.length ? items.join(', ') : 'empty');
  textStyle(BOLD);
  y = drawLines(wrapText(str, w), pad, y, 20);
  textStyle(NORMAL);
  return y;
}

// ---------------------------------------------------------------
// Feedback and answer area (paged when it does not fit)
// ---------------------------------------------------------------
const HINT = 'Pick a card and press Add Card to put it at the end of your sequence. To reorder, ' +
  'pick a card in the sequence and press Move Earlier, or remove it and add it again. ' +
  'Check Order submits; two submissions are allowed.';
const REJECTED_BLOCK = { kind: 'bad', title: '✗ Rejected: the sequence is empty',
  body: 'Add cards before pressing Check Order. An empty sequence does not use a submission.' };

function buildInfoBlocks() {
  const blocks = [];
  if (lastCheck === null) {
    blocks.push({ kind: 'note', title: 'How to build your sequence', body: HINT });
    return blocks;
  }
  if (lastCheck.rejected) {
    blocks.push(REJECTED_BLOCK);
    blocks.push({ kind: 'note', title: 'How to build your sequence', body: HINT });
    return blocks;
  }
  const n = lastCheck.problems.length;
  if (lastCheck.correct) {
    blocks.push({ kind: 'ok', title: '✓ ' + VALID_MESSAGE, body: 'Result: ' + resultText + '.' });
  } else if (!revealed) {
    blocks.push({ kind: 'bad',
      title: '✗ Submission ' + lastCheck.submission + ' of ' + MAX_SUBMISSIONS + ': not yet valid',
      body: n + (n === 1 ? ' problem' : ' problems') + ' found. Revise the sequence and press ' +
        'Check Order again; one submission is left.' });
  } else {
    blocks.push({ kind: 'bad',
      title: '✗ Submission ' + lastCheck.submission + ' of ' + MAX_SUBMISSIONS + ': not valid',
      body: 'Result: ' + resultText + '. ' + n + (n === 1 ? ' problem' : ' problems') +
        ' found. The answer is shown after the problems.' });
  }
  for (const p of lastCheck.problems) blocks.push({ kind: 'bad', title: p.title, body: p.body });

  if (revealed) {
    blocks.push({ kind: 'note', title: 'Answer: the six subtasks in a valid order',
      body: 'S2 and S3 may appear in either order. S4 must appear after S2, and S5 after S3. ' +
        'S6 must appear after both S4 and S5.' });
    for (const t of SUBTASKS) {
      const s = slotOf(t.id);
      if (t.inAnswer) {
        const pre = t.prereq.length ? t.prereq.join(', ') : 'none';
        blocks.push({ kind: 'answer',
          title: '✓ Step ' + t.id.slice(1) + ': ' + t.id + ', ' + cardName(s),
          body: '"' + t.text + '." Prerequisites: ' + pre + '. Why: ' + t.why + '.' });
      } else {
        blocks.push({ kind: 'distractor',
          title: '✗ Not in the answer: ' + t.id + ', ' + cardName(s),
          body: '"' + t.text + '." Why: ' + t.why + '.' });
      }
    }
  }
  return blocks;
}

// Two columns of feedback at wide widths, one column at narrow widths
function columnsFor() {
  return canvasWidth >= wideWidth ? 2 : 1;
}

// Wrap and measure every block at the column width; returns the pages that fit below y
function measurePages(blocks, y, innerW, reserveFooter) {
  const cols = columnsFor();
  const colW = cols === 2 ? (innerW - pad) / 2 : innerW;
  textSize(16);
  for (const b of blocks) {
    textStyle(BOLD);
    b.titleLines = b.title ? wrapText(b.title, colW - 20) : [];
    textStyle(NORMAL);
    b.bodyLines = wrapText(b.body, colW - 20);
    b.h = (b.titleLines.length + b.bodyLines.length) * 20 + 12;
  }
  const footerH = 24;
  const avail = drawHeight - y - 6;
  let pages = paginate(blocks, reserveFooter ? avail - footerH : avail, cols);
  if (!reserveFooter && pages.length > 1) pages = paginate(blocks, avail - footerH, cols);
  return pages;
}

function setPageCount(n) {
  const oldCount = infoPageCount;
  infoPageCount = n;
  if (infoPage >= infoPageCount) infoPage = 0;
  if (oldCount !== infoPageCount) layoutControls();
}

// Draw one page of blocks starting at y. pageOffset is the number of non-feedback pages in
// front of the feedback pages (1 for the narrow card view, 0 otherwise, -1 to draw all
// blocks without paging). Returns the lowest y drawn.
function drawPaged(blocks, y, innerW, pageOffset) {
  const cols = pageOffset < 0 ? 1 : columnsFor();
  const colW = cols === 2 ? (innerW - pad) / 2 : innerW;
  const pages = measurePages(blocks, y, innerW, pageOffset > 0);
  let page;
  if (pageOffset < 0) {
    page = [blocks];
  } else {
    setPageCount(pages.length + pageOffset);
    page = pages[Math.max(0, infoPage - pageOffset)];
  }

  let bottom = y;
  for (let c = 0; c < page.length; c++) {
    const x = pad + c * (colW + pad);
    let yy = y;
    for (const b of page[c]) {
      if (b.kind === 'ok' || b.kind === 'answer') { fill('honeydew'); stroke('seagreen'); }
      else if (b.kind === 'bad' || b.kind === 'distractor') { fill('mistyrose'); stroke('firebrick'); }
      else { fill('white'); stroke('silver'); }
      strokeWeight(b.kind === 'note' ? 1 : 2);
      rect(x, yy, colW, b.h, 8);
      strokeWeight(1);
      fill('black');
      textStyle(BOLD);
      const ty = drawLines(b.titleLines, x + 10, yy + 6, 20);
      textStyle(NORMAL);
      drawLines(b.bodyLines, x + 10, ty, 20);
      yy += b.h + 6;
    }
    bottom = max(bottom, yy);
  }
  layoutBottom = bottom;

  if (pageOffset >= 0 && infoPageCount > 1) {
    const last = infoPage === infoPageCount - 1;
    const more = (last && pageOffset > 0) ? 'Next Page returns to the cards' :
      (last ? 'Next Page returns to page 1' : 'press Next Page for more');
    fill('dimgray');
    textSize(16);
    noStroke();
    textAlign(LEFT, TOP);
    text('Page ' + (infoPage + 1) + ' of ' + infoPageCount + ': ' + more, pad, drawHeight - 24);
  }
  return bottom;
}

// Fill column 1 top to bottom, then column 2, then start a new page
function paginate(blocks, avail, cols) {
  const pages = [];
  let page = [[]];
  let used = 0;
  for (const b of blocks) {
    const col = page[page.length - 1];
    if (col.length > 0 && used + b.h > avail) {
      if (page.length < cols) {
        page.push([]);
      } else {
        pages.push(page);
        page = [[]];
      }
      used = 0;
    }
    page[page.length - 1].push(b);
    used += b.h + 6;
  }
  pages.push(page);
  return pages;
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
