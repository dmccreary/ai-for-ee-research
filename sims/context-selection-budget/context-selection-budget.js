// Context Selection Budget MicroSim
// CANVAS_HEIGHT: 920
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner gives each of nine candidate context items the verdict Include, Compress, or Omit
// for the task "Check whether the ENOB reported in Section 4 of my draft is consistent with the
// measurement procedure in Section 3." A running total is kept against a context budget of
// 6,500 tokens (8,000-token window minus a 1,500-token completion reserve). One submission is
// accepted when the total is within the budget; the sim then scores the nine verdicts.
// The design is width responsive; the item table switches to a stacked layout at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 840;
// Control region: two rows of controls = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let wideWidth = 600;        // at or above this width the item table uses columns

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification; all numbers are illustrative)
// ---------------------------------------------------------------
const TASK = 'Check whether the ENOB reported in Section 4 of my draft is consistent with the ' +
  'measurement procedure in Section 3.';
const QUESTION = 'Would the answer change if this item were missing?';
const WINDOW_TOKENS = 8000;
const RESERVE_TOKENS = 1500;
const BUDGET = WINDOW_TOKENS - RESERVE_TOKENS;   // 6,500 tokens of context
const MASTERY = 8;                               // at least 8 of 9 correct
const CORRECT_TOTAL_TEXT = 'Correct total: items 1, 2, and 3 as is (3,700) plus items 4, 5, and 6 ' +
  'compressed (650) is 4,350 tokens, within 6,500.';

// compressed: null means "not available"
const ITEMS = [
  { n: 1, item: 'Standing instructions: role, "answer \'not stated\' if unknown", cite section numbers',
    asIs: 400, compressed: null, verdict: 'Include', why: 'Needed in every turn, and small.' },
  { n: 2, item: 'Section 4 of the draft: reported results text',
    asIs: 1500, compressed: null, verdict: 'Include', why: 'The claim being checked.' },
  { n: 3, item: 'Section 3 of the draft: measurement procedure',
    asIs: 1800, compressed: null, verdict: 'Include', why: 'The standard the claim is checked against.' },
  { n: 4, item: 'Raw measurement file of 20,000 samples',
    asIs: 14000, compressed: 200, verdict: 'Compress',
    why: 'The check needs the record length, input frequency, and SNDR, not the samples. ' +
      'A 200-token summary of those carries them.' },
  { n: 5, item: 'Full 40-message earlier conversation about the project',
    asIs: 9000, compressed: 300, verdict: 'Compress',
    why: 'The decisions about window function and record length matter. The rest does not.' },
  { n: 6, item: 'Datasheet page for the test board',
    asIs: 2000, compressed: 150, verdict: 'Compress',
    why: 'Only the table of input amplitude and reference voltage settings matters.' },
  { n: 7, item: 'Full related-work section of the draft',
    asIs: 2500, compressed: null, verdict: 'Omit',
    why: 'The check does not depend on how the work is positioned.' },
  { n: 8, item: 'Reference list of 62 entries',
    asIs: 1200, compressed: null, verdict: 'Omit',
    why: 'Citations do not affect whether the ENOB is consistent.' },
  { n: 9, item: 'An unrelated email from a collaborator pasted earlier in the session',
    asIs: 600, compressed: null, verdict: 'Omit',
    why: 'It is irrelevant, and untrusted text is a risk with no benefit.' }
];
const VERDICTS = ['Include', 'Compress', 'Omit'];

// ---------------------------------------------------------------
// Pure logic (no p5 calls; tested in node)
// ---------------------------------------------------------------
// Tokens one item contributes under a verdict (null verdict = not yet chosen = 0)
function itemTokens(item, verdict) {
  if (verdict === 'Include') return item.asIs;
  if (verdict === 'Compress') return item.compressed;  // only allowed when compressed !== null
  return 0;
}

// Running total = sum of (as is for Include, compressed for Compress, 0 for Omit)
function runningTotal(verdicts) {
  let t = 0;
  for (let i = 0; i < ITEMS.length; i++) t += itemTokens(ITEMS[i], verdicts[i]);
  return t;
}

function compressAllowed(item) {
  return item.compressed !== null;
}

// Submission is accepted when the running total <= the budget
function submissionCheck(verdicts) {
  const total = runningTotal(verdicts);
  if (total > BUDGET) {
    return { accepted: false, total: total,
      message: 'Over budget by ' + fmt(total - BUDGET) + ' tokens. Compress or omit something.' };
  }
  return { accepted: true, total: total, message: '' };
}

// Score each verdict against the Correct verdict column, independent of the total
function scoreVerdicts(verdicts) {
  let correct = 0;
  const perItem = ITEMS.map((it, i) => {
    const ok = verdicts[i] === it.verdict;
    if (ok) correct++;
    return ok;
  });
  return { correct: correct, perItem: perItem };
}

// The correct total: every item with its Correct verdict
function correctTotal() {
  return runningTotal(ITEMS.map(it => it.verdict));
}

// For one wrong verdict: did it drop a needed item, and what would the total be with every
// other item at its correct verdict?
function choiceEffect(i, verdict) {
  const it = ITEMS[i];
  const extra = itemTokens(it, verdict) - itemTokens(it, it.verdict);
  const whatIf = correctTotal() + extra;
  return {
    droppedNeeded: verdict === 'Omit' && it.verdict !== 'Omit',
    extra: extra,
    whatIfTotal: whatIf,
    overBy: Math.max(0, whatIf - BUDGET)
  };
}

function fmt(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let verdicts = [null, null, null, null, null, null, null, null, null];
let selected = 0;          // index of the item the buttons act on
let refusal = '';          // refusal message from the last rejected Submit
let submitted = false;     // the one accepted submission has been made
let result = null;         // { correct, perItem, total }
let resultPage = 0;
let resultPageCount = 1;
let layoutBottom = 0;      // lowest y used by drawn content (used for layout testing)

// ---- xAPI (docs/js/lrs-sim.js). Without it (p5.js editor) the sim still runs, silently. ----
const PAGE_CONCEPT = () => LRS.conceptId(66);   // Context Selection
let lrs = null, startedAt = 0;

// controls
let itemSelect;
let verdictButtons = [];
let submitButton;
let nextPageButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  itemSelect = createSelect();
  itemSelect.parent(document.querySelector('main'));
  for (let i = 0; i < ITEMS.length; i++) itemSelect.option('Item ' + ITEMS[i].n, String(i));
  itemSelect.selected('0');
  itemSelect.style('font-size', '16px');
  itemSelect.style('padding', '3px');
  itemSelect.changed(() => {
    selected = parseInt(itemSelect.value(), 10);
    updateControls();
    redraw();
  });

  for (const v of VERDICTS) {
    verdictButtons.push(makeButton(v, () => setVerdict(v)));
  }
  submitButton = makeButton('Submit', submitPressed);
  nextPageButton = makeButton('Next Page', () => {
    resultPage = (resultPage + 1) % resultPageCount;
    redraw();
  });

  updateControls();

  if (window.LRSSim) {
    lrs = LRSSim.create({ name: 'Context Selection Budget', concept: PAGE_CONCEPT(), mount: '#xapi-slot',
                          source: 'the Context Selection Budget MicroSim', pageDwell: true });
    startedAt = Date.now();
  }

  describe('Context Selection Budget. The task is: ' + TASK + ' Nine candidate context items are ' +
    'listed with their size as is and, for three of them, a compressed size. Choose an item in the ' +
    'drop-down list and press Include, Compress, or Omit. A running total is kept against a context ' +
    'budget of 6,500 tokens, which is an 8,000-token window minus a 1,500-token completion reserve. ' +
    'Submit is refused while the total is over budget. After the one accepted submission the sim ' +
    'shows the score out of 9, the correct verdict and reason for every item, and the correct ' +
    'total of 4,350 tokens. All numbers are illustrative.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function makeButton(label, handler) {
  const b = createButton(label);
  b.parent(document.querySelector('main'));
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
  b.mouseClicked(handler); // click also fires for Enter and Space, so keyboard users can press it
  return b;
}

function setVerdict(v) {
  if (submitted) return;
  const it = ITEMS[selected];
  if (v === 'Compress' && !compressAllowed(it)) return;
  verdicts[selected] = v;
  refusal = '';
  // move on to the next item so the learner can work down the list
  if (selected < ITEMS.length - 1) {
    selected++;
    itemSelect.selected(String(selected));
  }
  updateControls();
  redraw();
}

function allChosen() {
  return verdicts.every(v => v !== null);
}

function submitPressed() {
  if (submitted || !allChosen()) return;
  const check = submissionCheck(verdicts);
  if (!check.accepted) {
    refusal = check.message;
    redraw();
    return;
  }
  const s = scoreVerdicts(verdicts);
  result = { correct: s.correct, perItem: s.perItem, total: check.total };
  if (lrs) {
    const dur = startedAt ? Date.now() - startedAt : undefined;
    ITEMS.forEach((it, i) => {
      lrs.question('q-item-' + it.n, { name: 'Item ' + it.n + ': ' + it.item, concept: PAGE_CONCEPT() })
        .answer({ success: s.perItem[i], response: LRS.slug(verdicts[i]), durationMs: dur,
                  extensions: { 'total-tokens': check.total } });
    });
  }
  submitted = true;
  refusal = '';
  resultPage = 0;
  updateControls();
  redraw();
}

// Enable, disable, show and hide the controls to match the state
function updateControls() {
  const editors = [itemSelect].concat(verdictButtons, [submitButton]);
  for (const c of editors) {
    if (submitted) c.hide(); else c.show();
  }
  if (!submitted) {
    setEnabled(verdictButtons[1], compressAllowed(ITEMS[selected]));
    setEnabled(submitButton, allChosen());
  }
  if (submitted && resultPageCount > 1) nextPageButton.show();
  else nextPageButton.hide();
  layoutControls();
}

function setEnabled(b, on) {
  if (on) b.removeAttribute('disabled');
  else b.attribute('disabled', '');
}

// Flow the visible controls left to right, wrapping onto a second row when needed
function layoutControls() {
  const visible = [];
  if (!submitted) visible.push(itemSelect, ...verdictButtons, submitButton);
  else if (resultPageCount > 1) visible.push(nextPageButton);
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
const VERDICT_COLOR = { Include: 'steelblue', Compress: 'darkorange', Omit: 'dimgray' };

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
  text('Context Selection Budget', canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (submitted) drawResults(44);
  else drawPlay(44);
}

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

function drawLines(lines, x, y, lineH) {
  textAlign(LEFT, TOP);
  for (const ln of lines) {
    noStroke();
    text(ln, x, y);
    y += lineH;
  }
  return y;
}

// Task box, budget statement, and the running-total meter. Returns the y below them.
function drawHeader(y, total) {
  const innerW = canvasWidth - 2 * pad;
  textSize(16);
  // task box
  textStyle(BOLD);
  const taskLines = wrapText('Task: "' + TASK + '"', innerW - 16);
  const boxH = taskLines.length * 20 + 10;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, boxH, 8);
  strokeWeight(1);
  fill('black');
  drawLines(taskLines, pad + 8, y + 5, 20);
  textStyle(NORMAL);
  y += boxH + 4;

  fill('black');
  y = drawLines(wrapText('Context budget 6,500 tokens = 8,000-token window minus a 1,500-token ' +
    'completion reserve. All numbers are illustrative.', innerW), pad, y, 20) + 2;

  // meter: scale 0 .. 8,000 (the whole window); the reserve is shown hatched
  const mx = pad, mw = innerW, mh = 18;
  const scale = mw / WINDOW_TOKENS;
  const over = total > BUDGET;
  textStyle(BOLD);
  noStroke();
  fill(over ? 'saddlebrown' : 'black');
  const status = 'Running total: ' + fmt(total) + ' of ' + fmt(BUDGET) + ' tokens  ' +
    (over ? '✗ OVER BUDGET by ' + fmt(total - BUDGET) : '✓ within budget');
  y = drawLines(wrapText(status, innerW), pad, y, 20) + 2;
  textStyle(NORMAL);

  fill('white');
  stroke('gray');
  rect(mx, y, BUDGET * scale, mh);
  // hatched completion reserve
  fill('gainsboro');
  rect(mx + BUDGET * scale, y, RESERVE_TOKENS * scale, mh);
  stroke('darkgray');
  for (let hx = mx + BUDGET * scale + 4; hx < mx + mw; hx += 7) {
    line(hx, y + mh, Math.min(hx + 8, mx + mw), y);
  }
  // filled portion
  noStroke();
  fill(over ? 'saddlebrown' : 'steelblue');
  rect(mx, y + 4, Math.min(total, WINDOW_TOKENS) * scale, mh - 8);
  // budget limit marker
  stroke('black');
  strokeWeight(2);
  line(mx + BUDGET * scale, y - 3, mx + BUDGET * scale, y + mh + 3);
  strokeWeight(1);
  y += mh + 2;
  textSize(14);
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  text(total > WINDOW_TOKENS ? '0 (bar off scale ▶)' : '0', mx, y);
  textAlign(RIGHT, TOP);
  text('budget 6,500', mx + BUDGET * scale - 4, y);
  if (mw > 520) {
    textAlign(RIGHT, TOP);
    text('reserve to 8,000', mx + mw, y);
  }
  textSize(16);
  return y + 19;
}

function verdictLabel(i) {
  const v = verdicts[i];
  if (v === null) return 'no verdict';
  return v + ' (' + fmt(itemTokens(ITEMS[i], v)) + ')';
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const total = runningTotal(verdicts);
  y = drawHeader(y, total);

  // question
  fill('navy');
  textStyle(ITALIC);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 20) + 4;
  textStyle(NORMAL);

  const wide = canvasWidth >= wideWidth;
  textSize(16);
  // column positions for the wide layout (right edges for the two size columns)
  const cVerdict = pad + innerW - 150;
  const cComp = cVerdict - 14;
  const cAsIs = cComp - 104;
  const cItem = pad + 30;
  const itemW = wide ? cAsIs - cItem - 66 : innerW - 30 - 8;

  if (wide) {
    textStyle(BOLD);
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    text('#', pad + 6, y);
    text('Item', cItem, y);
    textAlign(RIGHT, TOP);
    text('As is', cAsIs, y);
    text('Compressed', cComp, y);
    textAlign(LEFT, TOP);
    text('Your verdict', cVerdict, y);
    textStyle(NORMAL);
    y += 21;
  }

  for (let i = 0; i < ITEMS.length; i++) {
    const it = ITEMS[i];
    const lines = wrapText(it.item, itemW);
    const rowH = wide ? lines.length * 20 + 6 : (lines.length + 1) * 20 + 6;
    const isSel = i === selected;

    fill(isSel ? 'lightyellow' : 'white');
    stroke(isSel ? 'black' : 'silver');
    strokeWeight(isSel ? 2 : 1);
    rect(pad, y, innerW, rowH, 6);
    strokeWeight(1);

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text((isSel ? '▶' : '') + it.n, pad + 4, y + 3);
    textStyle(NORMAL);
    drawLines(lines, cItem, y + 3, 20);

    if (wide) {
      fill('black');
      noStroke();
      textAlign(RIGHT, TOP);
      text(fmt(it.asIs), cAsIs, y + 3);
      text(it.compressed === null ? 'n/a' : fmt(it.compressed), cComp, y + 3);
      drawVerdictTag(i, cVerdict, y + 3);
    } else {
      // one line: sizes as is / compressed, then the verdict
      const sizeStr = fmt(it.asIs) + ' / ' + (it.compressed === null ? 'n/a' : fmt(it.compressed));
      fill('dimgray');
      noStroke();
      textAlign(LEFT, TOP);
      text(sizeStr, cItem, y + 3 + lines.length * 20);
      drawVerdictTag(i, cItem + Math.max(110, textWidth(sizeStr) + 14), y + 3 + lines.length * 20);
    }
    y += rowH + 2;
  }
  if (!wide) {
    fill('dimgray');
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Sizes in tokens: as is / if compressed', pad, y);
    textSize(16);
    y += 18;
  }
  y += 2;

  // hint or refusal
  textSize(16);
  if (refusal) {
    fill('saddlebrown');
    textStyle(BOLD);
    y = drawLines(wrapText('✗ ' + refusal, innerW), pad, y, 20);
    textStyle(NORMAL);
  } else {
    fill('black');
    const remaining = verdicts.filter(v => v === null).length;
    const hint = remaining > 0
      ? 'Pick an item, then Include, Compress, or Omit. Submit is enabled when all nine items ' +
        'have a verdict (' + remaining + ' left).'
      : 'All nine items have a verdict. Change any of them, or press Submit. One submission is scored.';
    y = drawLines(wrapText(hint, innerW), pad, y, 20);
  }
  layoutBottom = y;
}

// Verdict word plus a colored tag; the word carries the meaning, the color is a second cue
function drawVerdictTag(i, x, y) {
  const v = verdicts[i];
  textAlign(LEFT, TOP);
  if (v === null) {
    fill('gray');
    noStroke();
    textStyle(ITALIC);
    text('no verdict', x, y);
    textStyle(NORMAL);
    return;
  }
  fill(VERDICT_COLOR[v]);
  noStroke();
  rect(x, y + 2, 12, 14, 2);
  fill('black');
  textStyle(BOLD);
  text(verdictLabel(i), x + 18, y);
  textStyle(NORMAL);
}

function drawResults(y) {
  const innerW = canvasWidth - 2 * pad;
  textSize(16);

  // score and totals
  textSize(24);
  textStyle(BOLD);
  fill('black');
  y = drawLines([result.correct + ' of 9 correct'], pad, y, 30);
  textSize(16);
  const mastered = result.correct >= MASTERY && result.total <= BUDGET;
  fill(mastered ? 'mediumblue' : 'saddlebrown');
  const mStr = mastered
    ? '✓ Mastery met: at least 8 of 9 verdicts correct, with the total within the budget.'
    : '✗ Mastery not met: it needs at least 8 of 9 verdicts correct, with the total within the budget.';
  y = drawLines(wrapText(mStr, innerW), pad, y, 20) + 2;
  textStyle(NORMAL);
  fill('black');
  y = drawLines(wrapText('Your final total: ' + fmt(result.total) + ' tokens, within the budget of ' +
    fmt(BUDGET) + '. All numbers are illustrative.', innerW), pad, y, 20);
  y = drawLines(wrapText(CORRECT_TOTAL_TEXT, innerW), pad, y, 20) + 8;

  // per-item feedback cards, paged to fit the drawing region
  const items = ITEMS.map((it, i) => {
    const ok = result.perItem[i];
    textStyle(BOLD);
    const head = wrapText((ok ? '✓ Correct' : '✗ Incorrect') + ' - Item ' + it.n + ': ' + it.item, innerW - 20);
    textStyle(NORMAL);
    let detail = 'Your verdict: ' + verdicts[i] + '. Correct verdict: ' + it.verdict + '. Why: ' + it.why;
    if (!ok) {
      const e = choiceEffect(i, verdicts[i]);
      if (e.droppedNeeded) {
        detail += ' This choice dropped a needed item.';
      } else if (e.extra > 0) {
        detail += ' This choice adds ' + fmt(e.extra) + ' tokens: with every other item correct, the ' +
          'total would be ' + fmt(e.whatIfTotal) +
          (e.overBy > 0 ? ', over the budget by ' + fmt(e.overBy) + '.' : ', still within the budget.');
      }
    }
    const detailLines = wrapText(detail, innerW - 20);
    return { ok, head, detailLines, h: (head.length + detailLines.length) * 20 + 14 };
  });
  const footerH = 24;
  const avail = drawHeight - y - footerH - 4;
  const pages = [];
  let cur = [], used = 0;
  for (const it of items) {
    if (cur.length > 0 && used + it.h > avail) {
      pages.push(cur);
      cur = [];
      used = 0;
    }
    cur.push(it);
    used += it.h + 5;
  }
  if (cur.length > 0) pages.push(cur);
  if (pages.length !== resultPageCount) {
    resultPageCount = pages.length;
    if (resultPage >= resultPageCount) resultPage = 0;
    updateControls();
  }

  for (const it of pages[resultPage]) {
    fill(it.ok ? 'white' : 'linen');
    stroke(it.ok ? 'mediumblue' : 'saddlebrown');
    strokeWeight(it.ok ? 1 : 2);
    rect(pad, y, innerW, it.h, 8);
    strokeWeight(1);
    fill(it.ok ? 'mediumblue' : 'saddlebrown');
    textStyle(BOLD);
    let yy = drawLines(it.head, pad + 10, y + 7, 20);
    textStyle(NORMAL);
    fill('black');
    drawLines(it.detailLines, pad + 10, yy, 20);
    y += it.h + 5;
  }
  layoutBottom = y;

  if (resultPageCount > 1) {
    fill('dimgray');
    noStroke();
    textAlign(LEFT, TOP);
    text('Item feedback: page ' + (resultPage + 1) + ' of ' + resultPageCount +
      ' (press Next Page)', pad, drawHeight - footerH);
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

// Export the pure logic for testing in node; ignored in the browser and the p5.js editor
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ITEMS, BUDGET, runningTotal, submissionCheck, scoreVerdicts, correctTotal,
    choiceEffect, compressAllowed };
}
