// Citation Verification Judge MicroSim
// CANVAS_HEIGHT: 800
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner judges eight model-generated citations as Verified, Wrong details, Unsupported
// claim, or Fabricated, using the results of four simulated database lookups.
// Eight records in a fixed order, one attempt each, feedback with the "Why" sentence and the
// misconception each record tests, and a final score with a mastery threshold of 7 of 8.
// All records are invented for this exercise.
// The design is width responsive; controls reflow onto extra rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 670;
// Control region: up to three rows of controls = (3 x 38) + 16 = 130
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region

// Okabe-Ito color-blind-safe colors, always paired with a symbol
const PASS = '#0072B2';   // check mark
const FAIL = '#D55E00';   // ballot x
const WARN = '#E69F00';   // exclamation mark
const NA = 'dimgray';     // dash

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification; invented for this exercise)
// ---------------------------------------------------------------
const INVENTED_NOTE = 'Invented for this exercise: authors, titles, claims, DOIs and lookup ' +
  'results are not real. The DOI prefix 10.9999 is not assigned.';
const QUESTION = 'Is this citation safe to use as written?';
const VERDICTS = ['Verified', 'Wrong details', 'Unsupported claim', 'Fabricated'];
const MASTERY = 7;

const CHECK_NAMES = [
  'DOI resolves?',
  'Exact title found in database?',
  'Authors, venue and year match database?',
  'Paper\'s text supports the claim?'
];
const CHECK_BUTTONS = ['Check DOI', 'Check title', 'Check details', 'Check text'];

const MISCONCEPTIONS = [
  'A citation with a well-formed DOI and a real journal name is real.',
  'If the paper exists, the claim is supported.',
  'A wrong year or volume means the paper is fabricated.'
];

// checks: the four lookup results, verbatim. The flags drive the order-of-checks rule.
// misconception: index into MISCONCEPTIONS for the misconception this record tests
const RECORDS = [
  { cite: 'Brandt, K. and Osei, M. (2020). "Bootstrapped Sampling Switches for Low-Voltage ADCs." IEEE TCAS-I, 67(4). DOI 10.9999/tcasi.2020.0411',
    short: 'Brandt and Osei (2020)',
    claim: 'Bootstrapped switches reduce signal-dependent sampling distortion.',
    checks: ['Yes', 'Yes', 'Yes', 'Yes'],
    titleFound: true, doiOtherPaper: false, detailsMatch: true, textSupports: true,
    verdict: 'Verified', why: 'All four checks pass.', misconception: 0 },
  { cite: 'Vasquez, L. (2018). "Dynamic Comparator Offset Calibration with Charge Pumps." IEEE JSSC, 53(2). DOI 10.9999/jssc.2018.0208',
    short: 'Vasquez (2018)',
    claim: 'A charge-pump calibration removes comparator offset to below 1 mV.',
    checks: ['Yes', 'Yes', 'Yes', 'Yes'],
    titleFound: true, doiOtherPaper: false, detailsMatch: true, textSupports: true,
    verdict: 'Verified', why: 'All four checks pass.', misconception: 0 },
  { cite: 'Nakamura, H. and Reyes, P. (2017). "Split-Capacitor DAC Linearity Analysis." IEEE JSSC, 52(9). DOI 10.9999/jssc.2017.0912',
    short: 'Nakamura and Reyes (2017)',
    claim: 'Split-capacitor arrays reduce DAC area.',
    checks: ['Yes', 'Yes', 'No: the database lists the year as 2016 and the venue as ISSCC', 'Yes'],
    titleFound: true, doiOtherPaper: false, detailsMatch: false, textSupports: true,
    verdict: 'Wrong details',
    why: 'The paper exists and supports the claim, but year and venue must be corrected before it is cited.',
    misconception: 2 },
  { cite: 'Oyelaran, T. (2021). "Noise Shaping in Hybrid SAR-Delta-Sigma Converters." IEEE TCAS-II, 68(1). DOI 10.9999/tcasii.2021.0105',
    short: 'Oyelaran (2021)',
    claim: 'Hybrid converters trade conversion speed for resolution.',
    checks: ['Yes', 'Yes', 'No: the database lists a different second author and volume 68(2)', 'Yes'],
    titleFound: true, doiOtherPaper: false, detailsMatch: false, textSupports: true,
    verdict: 'Wrong details',
    why: 'The paper exists and supports the claim, but an author and the issue number are wrong.',
    misconception: 2 },
  { cite: 'Lindqvist, A. and Okafor, N. (2019). "Charge-Redistribution SAR ADC Calibration Using Sparse Foreground Estimation." IEEE JSSC, 54(7). DOI 10.9999/jssc.2019.0714',
    short: 'Lindqvist and Okafor (2019)',
    claim: 'Foreground calibration achieves 10-bit ENOB at 1 MS/s.',
    checks: ['Yes', 'Yes', 'Yes', 'No: the paper reports 8.2 ENOB and does not discuss 1 MS/s'],
    titleFound: true, doiOtherPaper: false, detailsMatch: true, textSupports: false,
    verdict: 'Unsupported claim',
    why: 'The paper exists with correct details, but it does not say what the model claims.',
    misconception: 1 },
  { cite: 'Hartmann, E. (2022). "Ring Oscillator Jitter in 65 nm CMOS." IEEE TCAS-I, 69(6). DOI 10.9999/tcasi.2022.0620',
    short: 'Hartmann (2022)',
    claim: 'Ring oscillator jitter grows with supply noise.',
    checks: ['Yes', 'Yes', 'Yes', 'No: the paper studies thermal noise only and states supply noise is out of scope'],
    titleFound: true, doiOtherPaper: false, detailsMatch: true, textSupports: false,
    verdict: 'Unsupported claim',
    why: 'The record is genuine, but the sentence it supports is not in it.',
    misconception: 1 },
  { cite: 'Dubois, C. and Lin, W. (2021). "Time-Interleaved ADC Mismatch Estimation Without Calibration Signals." IEEE JSSC, 56(11). DOI 10.9999/jssc.2021.1109',
    short: 'Dubois and Lin (2021)',
    claim: 'Mismatch can be estimated blind with under 20 ms of data.',
    checks: ['No', 'No', 'Not applicable: no record found', 'Not applicable'],
    titleFound: false, doiOtherPaper: false, detailsMatch: null, textSupports: null,
    verdict: 'Fabricated',
    why: 'The venue and volume exist, but the title and DOI do not. Well-formed structure is not evidence of existence.',
    misconception: 0 },
  { cite: 'Fofanah, S. (2020). "Process Variation Models for Sub-10 nm FinFETs." IEEE TED, 67(3). DOI 10.9999/ted.2020.0305',
    short: 'Fofanah (2020)',
    claim: 'Corner models understate FinFET threshold spread.',
    checks: ['Yes, but it resolves to a paper titled "Antenna Gain Measurement in Anechoic Chambers"', 'No',
             'Not applicable: the DOI belongs to another paper', 'Not applicable'],
    titleFound: false, doiOtherPaper: true, detailsMatch: null, textSupports: null,
    verdict: 'Fabricated',
    why: 'A DOI that resolves to a different paper does not make this record real. The title appears nowhere in the database.',
    misconception: 0 }
];

// ---------------------------------------------------------------
// Pure logic
// ---------------------------------------------------------------
// The verdict follows a fixed order of checks
function verdictFromChecks(r) {
  if (!r.titleFound || r.doiOtherPaper) return 'Fabricated';
  if (!r.detailsMatch) return 'Wrong details';
  if (!r.textSupports) return 'Unsupported claim';
  return 'Verified';
}

// Symbol and color for a lookup result string
function resultStyle(s) {
  if (s === 'Yes') return { sym: '✓', col: PASS };
  if (s.startsWith('Yes, but')) return { sym: '!', col: WARN };
  if (s === 'No' || s.startsWith('No:')) return { sym: '✗', col: FAIL };
  return { sym: '–', col: NA };
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let recIndex = 0;
let opened = [false, false, false, false];
let submitted = false;
let chosen = '';
let correctCount = 0;
let missed = [];          // [{ index, chosen }]
let finished = false;
let showNeedChoice = false;
let summaryPage = 0;
let summaryPageCount = 1;
let layoutBottom = 0;     // lowest y used by drawn content (used for layout testing)

// controls
let checkButtons = [];
let verdictSelect, submitButton, nextButton, moreButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  for (let k = 0; k < 4; k++) {
    const b = createButton(CHECK_BUTTONS[k]);
    b.parent(document.querySelector('main'));
    styleButton(b);
    b.attribute('aria-label', 'Open lookup check: ' + CHECK_NAMES[k]);
    b.mousePressed(() => openCheck(k));
    checkButtons.push(b);
  }

  verdictSelect = createSelect();
  verdictSelect.parent(document.querySelector('main'));
  verdictSelect.option('Choose a verdict', '');
  for (const v of VERDICTS) verdictSelect.option(v, v);
  verdictSelect.selected('');
  verdictSelect.attribute('aria-label', 'Your verdict');
  verdictSelect.style('font-size', '16px');
  verdictSelect.changed(() => { showNeedChoice = false; redraw(); });

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  submitButton.mousePressed(submitVerdict);

  nextButton = createButton('Next Record');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mousePressed(nextPressed);

  moreButton = createButton('More Missed Records');
  moreButton.parent(document.querySelector('main'));
  styleButton(moreButton);
  moreButton.mousePressed(() => {
    summaryPage = (summaryPage + 1) % summaryPageCount;
    redraw();
  });

  updateControls();

  describe('Citation Verification Judge. Eight invented citation records are shown one at a time, ' +
    'each with the claim the model attached to it. Four lookup checks (DOI, title, authors venue ' +
    'and year, and the paper\'s text) start closed; press a Check button to reveal each result. ' +
    'Choose Verified, Wrong details, Unsupported claim, or Fabricated and press Submit for ' +
    'feedback. After record 8 the score out of 8, the mastery threshold of 7, and the missed ' +
    'verdicts grouped by misconception are shown.');

  noLoop(); // nothing animates; redraw only when the state changes
}

function styleButton(b) {
  b.style('font-size', '16px');
  b.style('padding', '4px 10px');
  b.style('white-space', 'nowrap');
}

function setEnabled(el, on) {
  if (on) el.removeAttribute('disabled');
  else el.attribute('disabled', '');
}

// ---------------------------------------------------------------
// Record logic
// ---------------------------------------------------------------
function openCheck(k) {
  if (finished || submitted) return;
  opened[k] = true;
  updateControls();
  redraw();
}

function submitVerdict() {
  if (finished || submitted) return;
  const v = verdictSelect.value();
  if (v === '') {          // nothing chosen yet; this does not use the single attempt
    showNeedChoice = true;
    redraw();
    return;
  }
  chosen = v;
  submitted = true;
  const rec = RECORDS[recIndex];
  if (chosen === rec.verdict) correctCount++;
  else missed.push({ index: recIndex, chosen: chosen });
  opened = [true, true, true, true]; // show all lookup evidence alongside the feedback
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished || !submitted) return;
  if (recIndex < RECORDS.length - 1) {
    recIndex++;
    opened = [false, false, false, false];
    submitted = false;
    chosen = '';
    verdictSelect.selected('');
  } else {
    finished = true;
    summaryPage = 0;
  }
  showNeedChoice = false;
  updateControls();
  redraw();
}

function updateControls() {
  for (let k = 0; k < 4; k++) {
    if (finished) checkButtons[k].hide();
    else {
      checkButtons[k].show();
      setEnabled(checkButtons[k], !submitted && !opened[k]);
    }
  }
  for (const c of [verdictSelect, submitButton, nextButton]) {
    if (finished) c.hide(); else c.show();
  }
  if (!finished) {
    setEnabled(verdictSelect, !submitted);
    setEnabled(submitButton, !submitted);
    setEnabled(nextButton, submitted);
    nextButton.html(recIndex === RECORDS.length - 1 ? 'See Score' : 'Next Record');
  }
  if (finished && summaryPageCount > 1) moreButton.show();
  else moreButton.hide();
  layoutControls();
}

// Check buttons on the first row(s); verdict, Submit and Next on the following row(s)
function layoutControls() {
  const gap = 10;
  let y = drawHeight + 12;
  const rows = finished
    ? [[moreButton]]
    : [checkButtons, [verdictSelect, submitButton, nextButton]];
  for (const group of rows) {
    let x = 10;
    for (const c of group) {
      if (c.elt.style.display === 'none') continue;
      const w = c.elt.offsetWidth;
      if (x > 10 && x + w > canvasWidth - 10) {
        x = 10;
        y += 38;
      }
      c.position(x, y);
      x += w + gap;
    }
    y += 38;
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
  let ts = 24;  // shrink the title on narrow screens so it never clips
  textSize(ts);
  while (ts > 16 && textWidth('Citation Verification Judge') > canvasWidth - 16) textSize(--ts);
  text('Citation Verification Judge', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // invented-data label
  textSize(15);
  textStyle(ITALIC);
  fill('dimgray');
  let y = drawLines(wrapText(INVENTED_NOTE, canvasWidth - 2 * pad), pad, 42, 19) + 6;
  textStyle(NORMAL);

  if (finished) drawSummary(y);
  else drawRecord(y);
}

function drawRecord(y) {
  const innerW = canvasWidth - 2 * pad;
  const rec = RECORDS[recIndex];

  textSize(16);
  fill('black');
  y = drawLines(wrapText('Record ' + (recIndex + 1) + ' of 8  |  Correct so far: ' + correctCount,
    innerW), pad, y, 20) + 4;

  // citation card
  textStyle(BOLD);  // the citation is drawn bold, so wrap it with the bold font
  const citeLines = wrapText(rec.cite, innerW - 20);
  textStyle(ITALIC);
  const claimLines = wrapText('Claim the model attached: ' + rec.claim, innerW - 20);
  textStyle(NORMAL);
  const cardH = (citeLines.length + claimLines.length) * 20 + 22;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 8);
  strokeWeight(1);
  fill('black');
  textStyle(BOLD);
  let yy = drawLines(citeLines, pad + 10, y + 8, 20) + 6;
  textStyle(ITALIC);
  drawLines(claimLines, pad + 10, yy, 20);
  textStyle(NORMAL);
  y += cardH + 8;

  // four lookup checks
  textStyle(BOLD);
  y = drawLines(['Simulated database lookup'], pad, y, 20) + 2;
  textStyle(NORMAL);
  for (let k = 0; k < 4; k++) {
    let lines;
    let st = null;
    textStyle(BOLD);
    if (opened[k]) {
      st = resultStyle(rec.checks[k]);
      lines = wrapText(CHECK_NAMES[k] + ' ' + rec.checks[k], innerW - 46);
    } else {
      lines = wrapText(CHECK_NAMES[k] + ' Closed: press "' + CHECK_BUTTONS[k] + '".', innerW - 46);
    }
    textStyle(NORMAL);
    const h = lines.length * 20 + 8;
    fill(opened[k] ? 'white' : 'whitesmoke');
    stroke(opened[k] ? st.col : 'silver');
    strokeWeight(opened[k] ? 2 : 1);
    rect(pad, y, innerW, h, 6);
    strokeWeight(1);
    // symbol badge
    noStroke();
    if (opened[k]) {
      fill(st.col);
      circle(pad + 16, y + 14, 22);
      fill(st.col === WARN ? 'black' : 'white');
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text(st.sym, pad + 16, y + 15);
    } else {
      fill('dimgray');
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text('?', pad + 16, y + 15);
    }
    textStyle(NORMAL);
    fill(opened[k] ? 'black' : 'dimgray');
    // check name in bold on the first line, then the result
    drawCheckLines(lines, CHECK_NAMES[k], pad + 34, y + 4);
    y += h + 4;
  }
  y += 4;

  // question
  textSize(18);
  textStyle(BOLD);
  fill('navy');
  y = drawLines(wrapText(QUESTION, innerW), pad, y, 23) + 2;
  textStyle(NORMAL);
  textSize(16);
  fill('black');

  if (!submitted) {
    y = drawLines(wrapText('Open any of the four checks, choose a verdict, then press Submit. ' +
      'One attempt per record.', innerW), pad, y, 20);
    if (showNeedChoice) {
      fill(FAIL);
      y = drawLines(wrapText('Choose a verdict before you press Submit.', innerW), pad, y + 2, 20);
    }
  } else {
    const correct = chosen === rec.verdict;
    textStyle(BOLD);
    fill(correct ? PASS : FAIL);
    if (correct) {
      y = drawLines(wrapText('✓ Correct: ' + rec.verdict + '.', innerW), pad, y, 21);
      textStyle(NORMAL);
      fill('black');
      y = drawLines(wrapText(rec.why, innerW), pad, y, 20);
    } else {
      y = drawLines(wrapText('✗ Not quite. ' + rec.why, innerW), pad, y, 21);
      textStyle(NORMAL);
      fill('black');
      y = drawLines(wrapText('You chose ' + chosen + '. Correct verdict: ' + rec.verdict + '.', innerW),
        pad, y, 20);
      y = drawLines(wrapText('Misconception this record tests: "' +
        MISCONCEPTIONS[rec.misconception] + '"', innerW), pad, y, 20);
    }
  }
  layoutBottom = y;
}

// The words of the check name are drawn bold, the result in normal weight.
// Lines were wrapped with the bold font, so mixed-weight lines never run past the box.
function drawCheckLines(lines, name, x, y) {
  textAlign(LEFT, TOP);
  let boldLeft = name.split(' ').length;
  for (const ln of lines) {
    let cx = x;
    for (const w of ln.split(' ')) {
      textStyle(boldLeft > 0 ? BOLD : NORMAL);
      text(w, cx, y);
      cx += textWidth(w + ' ');
      boldLeft--;
    }
    y += 20;
  }
  textStyle(NORMAL);
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;
  textSize(26);
  textStyle(BOLD);
  fill('black');
  y = drawLines([correctCount + ' of 8 correct'], pad, y + 4, 32);
  textSize(17);
  const met = correctCount >= MASTERY;
  fill(met ? PASS : FAIL);
  y = drawLines(wrapText(met
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of 8 verdicts correct on the first attempt.'
    : '✗ Mastery threshold not met: at least ' + MASTERY + ' of 8 correct verdicts are needed.',
    innerW), pad, y, 22) + 8;
  textStyle(NORMAL);
  textSize(16);
  fill('black');

  if (missed.length === 0) {
    y = drawLines(wrapText('No missed verdicts. Every verdict matched the lookup evidence.', innerW), pad, y, 20);
    summaryPageCount = 1;
    layoutBottom = y;
    syncMoreButton();
    return;
  }

  textStyle(BOLD);
  y = drawLines(wrapText('Missed verdicts, grouped by the misconception each exposes:', innerW), pad, y, 20) + 4;
  textStyle(NORMAL);

  // build blocks: a header per misconception followed by its missed records
  const blocks = [];
  for (let m = 0; m < MISCONCEPTIONS.length; m++) {
    const items = missed.filter(x => RECORDS[x.index].misconception === m);
    if (items.length === 0) continue;
    textStyle(BOLD);
    const head = wrapText('Misconception: "' + MISCONCEPTIONS[m] + '"', innerW - 20);
    textStyle(NORMAL);
    const lines = [];
    for (const it of items) {
      const r = RECORDS[it.index];
      for (const ln of wrapText('Record ' + (it.index + 1) + ', ' + r.short + ': you chose ' + it.chosen +
        '; correct verdict ' + r.verdict + '.', innerW - 20)) lines.push(ln);
    }
    blocks.push({ head, lines, h: (head.length + lines.length) * 20 + 16 });
  }

  // split blocks into pages that fit the drawing region
  const footerH = 26;
  const avail = drawHeight - y - footerH - 6;
  const pages = [];
  let cur = [];
  let used = 0;
  for (const b of blocks) {
    if (cur.length > 0 && used + b.h > avail) {
      pages.push(cur);
      cur = [];
      used = 0;
    }
    cur.push(b);
    used += b.h + 6;
  }
  if (cur.length > 0) pages.push(cur);
  summaryPageCount = pages.length;
  if (summaryPage >= summaryPageCount) summaryPage = 0;

  for (const b of pages[summaryPage]) {
    fill('white');
    stroke(FAIL);
    strokeWeight(1);
    rect(pad, y, innerW, b.h, 8);
    noStroke();
    fill('black');
    textStyle(BOLD);
    let yy = drawLines(b.head, pad + 10, y + 8, 20);
    textStyle(NORMAL);
    drawLines(b.lines, pad + 10, yy, 20);
    y += b.h + 6;
  }
  layoutBottom = y;
  if (summaryPageCount > 1) {
    fill('dimgray');
    textAlign(LEFT, TOP);
    text('Missed verdicts: page ' + (summaryPage + 1) + ' of ' + summaryPageCount, pad, drawHeight - footerH);
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
  noStroke();
  for (const ln of lines) {
    text(ln, x, y);
    y += lineH;
  }
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
