// AI Use Disclosure Decision Helper MicroSim
// CANVAS_HEIGHT: 780
// Use this CANVAS_HEIGHT (+2 for the border) for all the iframe heights that embed this MicroSim
// The learner applies a five-rule illustrative lab disclosure policy to eight scenarios of AI use.
// For each scenario the learner chooses one of four actions and submits it (one attempt each,
// fixed order). The sim then shows Correct or the action the policy gives, the matching rule,
// and the "Why" sentence. After scenario 8 it shows "n of 8 correct", whether the mastery
// threshold of 7 was met, and a draft disclosure statement assembled from the scenarios that
// required disclosure in the paper.
// The design is width responsive; controls reflow onto two rows at narrow widths.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// Fixed top drawing region. No controls are placed here.
let drawHeight = 700;
// Control region: two rows of controls = (2 x 35) + 10 = 80
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160; // standard variable name; this MicroSim has no sliders
let defaultTextSize = 16;
let pad = 12;               // inner padding of the drawing region
let fs = 16;                // base font size; chosen per width by chooseFontSize()
let lineH = 20;             // line height for the base font size
let cardLH = 23;            // line height for the card text (fs + 2)
let contentTop = 46;        // y where content starts below the (possibly wrapped) title

// Color-blind-safe palette (Okabe-Ito blue and vermillion); every color cue is paired
// with a symbol (check mark or X) or a text label.
const COLOR_CORRECT = '#0072B2';
const FILL_CORRECT = '#E3F0FA';
const COLOR_WRONG = '#B34700';   // darkened vermillion for text contrast
const FILL_WRONG = '#FBE9DF';
const COLOR_RULE = '#0072B2';

// ---------------------------------------------------------------
// Content (verbatim from the chapter specification)
// ---------------------------------------------------------------
const POLICY_LABEL = "Illustrative lab policy, not a real venue's policy";

const RULES = [
  'Text drafted or substantially rewritten by an AI tool that appears in a submitted manuscript is disclosed in the paper.',
  'AI use to generate or analyze data, code, or figures that contribute to reported results is disclosed in the paper, with the tool and version.',
  'Grammar, spelling, and formatting assistance does not need to be disclosed.',
  'AI use for brainstorming or literature search that does not appear in the paper is recorded in the project log only.',
  'An AI system is never listed as an author.'
];

const ACTIONS = [
  'Disclose in the paper',
  'Record in the project log only',
  'No disclosure needed',
  'Not permitted'
];
const DISCLOSE = 0; // index of "Disclose in the paper"

// action is the index into ACTIONS; rule is the rule number (1-5) named in the Why column.
// draft is the sentence this scenario contributes to the draft disclosure statement
// (only scenarios whose action is "Disclose in the paper" have one).
const SCENARIOS = [
  { id: 1, text: 'An agent rewrote two paragraphs of the Discussion.',
    action: 0, rule: 1, why: 'Rule 1: substantially rewritten text in the manuscript.',
    draft: 'An AI agent [tool name, model version, date of use] rewrote two paragraphs of the Discussion.' },
  { id: 2, text: 'An AI tool fixed spelling and grammar in the abstract.',
    action: 2, rule: 3, why: 'Rule 3: grammar and spelling assistance.' },
  { id: 3, text: 'An agent wrote the analysis script that produced Table II.',
    action: 0, rule: 2, why: 'Rule 2: code that contributes to reported results.',
    draft: 'An AI agent [tool name, model version, date of use] wrote the analysis script that produced Table II.' },
  { id: 4, text: 'An assistant suggested synonyms for search keywords, and you then ran the search yourself.',
    action: 1, rule: 4, why: 'Rule 4: it does not appear in the paper.' },
  { id: 5, text: 'A student wants to list the AI assistant as a co-author because it wrote the related-work section.',
    action: 3, rule: 5, why: 'Rule 5: an AI system is never an author, and the drafted text is disclosed under rule 1.' },
  { id: 6, text: 'An AI tool generated a figure of ENOB trends from the CSV file.',
    action: 0, rule: 2, why: 'Rule 2: a figure that contributes to reported results.',
    draft: 'An AI tool [tool name, model version, date of use] generated the figure of ENOB trends from the CSV file.' },
  { id: 7, text: 'An assistant proposed three research ideas, you chose one and developed it yourself, and no AI text appears in the paper.',
    action: 1, rule: 4, why: 'Rule 4: brainstorming that does not appear in the paper.' },
  { id: 8, text: "An AI tool converted the reference list to the venue's required format.",
    action: 2, rule: 3, why: 'Rule 3: formatting assistance.' }
];

const TITLE = 'AI Use Disclosure Decision Helper';
const QUESTION = 'What does the policy require here?';
const MASTERY = 7;   // mastery requires a score >= 7 of 8 on the first attempt
const PLACEHOLDER = 'Choose an action...';

// ---------------------------------------------------------------
// Pure logic (no p5 calls; tested in node)
// ---------------------------------------------------------------
function isCorrect(scenarioIndex, actionIndex) {
  return SCENARIOS[scenarioIndex].action === actionIndex;
}

// First feedback sentence for a committed answer
function verdictText(scenarioIndex, actionIndex) {
  const s = SCENARIOS[scenarioIndex];
  return isCorrect(scenarioIndex, actionIndex) ? 'Correct.' : 'The policy gives ' + ACTIONS[s.action] + '.';
}

// Full feedback: verdict, rule number, and the Why sentence (which begins with the rule number)
function feedbackText(scenarioIndex, actionIndex) {
  return verdictText(scenarioIndex, actionIndex) + ' ' + SCENARIOS[scenarioIndex].why;
}

function scoreLine(score) {
  return score + ' of ' + SCENARIOS.length + ' correct';
}

function masteryMet(score) {
  return score >= MASTERY;
}

// Draft disclosure statement assembled from the scenarios whose action is "Disclose in the paper"
function draftStatementSentences() {
  const parts = ['Use of AI tools.'];
  for (const s of SCENARIOS) {
    if (s.action === DISCLOSE) parts.push(s.draft);
  }
  parts.push('[Describe how the authors checked each of these items.]');
  parts.push('The authors take responsibility for the content.');
  return parts;
}

// ---------------------------------------------------------------
// State
// ---------------------------------------------------------------
let current = 0;         // scenario index 0..7
let committed = false;   // has the current scenario been answered?
let chosen = -1;         // action index the learner submitted for the current scenario
let answers = [];        // action index submitted for each scenario
let score = 0;
let finished = false;    // summary screen showing
let layoutBottom = 0;    // lowest y used by drawn content (used for layout testing)

// controls
let actionSelect;
let submitButton;
let nextButton;

function setup() {
  updateCanvasSize(); // get the container width first
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // Create ALL controls before laying them out
  actionSelect = createSelect();
  actionSelect.parent(document.querySelector('main'));
  actionSelect.option(PLACEHOLDER);
  for (const a of ACTIONS) actionSelect.option(a);
  actionSelect.style('font-size', '16px');
  actionSelect.style('padding', '3px');
  actionSelect.attribute('aria-label', 'Action the policy requires');
  actionSelect.changed(selectionChanged);

  submitButton = createButton('Submit');
  submitButton.parent(document.querySelector('main'));
  styleButton(submitButton);
  submitButton.mouseClicked(submitPressed);

  nextButton = createButton('Next Scenario');
  nextButton.parent(document.querySelector('main'));
  styleButton(nextButton);
  nextButton.mouseClicked(nextPressed);

  resetSelect();
  chooseFontSize();
  updateControls();

  describe('AI Use Disclosure Decision Helper. A five-rule illustrative lab disclosure policy is ' +
    'shown with one scenario of AI use at a time. Choose one of four actions in the drop-down list ' +
    '(Disclose in the paper, Record in the project log only, No disclosure needed, Not permitted) ' +
    'and press Submit. Each scenario has one attempt. The sim then says Correct or names the action ' +
    'the policy gives, highlights the matching rule, and shows the reason. After eight scenarios it ' +
    'shows the score out of 8, whether the mastery threshold of 7 was met, and a draft disclosure ' +
    'statement built from the scenarios that required disclosure.');

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
function resetSelect() {
  actionSelect.elt.options[0].disabled = true; // placeholder cannot be submitted
  actionSelect.elt.selectedIndex = 0;
}

function selectedAction() {
  return ACTIONS.indexOf(actionSelect.value());
}

function selectionChanged() {
  updateControls();
}

function submitPressed() {
  if (finished || committed) return;
  const a = selectedAction();
  if (a < 0) return;
  chosen = a;
  committed = true;
  answers[current] = a;
  if (isCorrect(current, a)) score++;
  updateControls();
  redraw();
}

function nextPressed() {
  if (finished || !committed) return;
  if (current < SCENARIOS.length - 1) {
    current++;
    committed = false;
    chosen = -1;
    resetSelect();
  } else {
    finished = true;
  }
  updateControls();
  redraw();
}

// Enable, disable, show, hide and relabel the controls to match the state
function updateControls() {
  if (finished) {
    actionSelect.hide();
    submitButton.hide();
    nextButton.hide();
    return;
  }
  setEnabled(actionSelect, !committed);
  setEnabled(submitButton, !committed && selectedAction() >= 0);
  nextButton.html(current === SCENARIOS.length - 1 ? 'See Score' : 'Next Scenario');
  setEnabled(nextButton, committed);
  layoutControls();
}

function setEnabled(el, on) {
  if (on) el.removeAttribute('disabled');
  else el.attribute('disabled', '');
}

// Flow the controls left to right, wrapping onto a second row when needed
function layoutControls() {
  if (finished) return;
  actionSelect.style('max-width', (canvasWidth - 20) + 'px');
  const visible = [actionSelect, submitButton, nextButton];
  const gap = 10;
  let x = 10;
  let y = drawHeight + 8;
  for (const el of visible) {
    const w = el.elt.offsetWidth;
    if (x > 10 && x + w > canvasWidth - 10) {
      x = 10;
      y += 35;
    }
    el.position(x, y);
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

  renderContent();
}

// Title (wrapped when the canvas is narrow), then the play or summary screen
function renderContent() {
  fill('black');
  noStroke();
  textStyle(BOLD);
  textSize(Math.min(24, fs + 6));
  const titleLines = wrapText(TITLE, canvasWidth - 20);
  textAlign(CENTER, TOP);
  let ty = 10;
  for (const ln of titleLines) {
    text(ln, canvasWidth / 2, ty);
    ty += Math.min(24, fs + 6) + 4;
  }
  textStyle(NORMAL);
  contentTop = ty + 8;
  if (finished) drawSummary(contentTop);
  else drawPlay(contentTop);
}

// Set the base font size and the line heights that depend on it
function setFont(size) {
  fs = size;
  lineH = Math.round(size * 1.25);
  cardLH = Math.round((size + 2) * 1.28);
}

// Pick the largest base font size (18 down to 14; 13 only as a last resort on very
// narrow phones) at which every screen state fits in the drawing region at the current width. Each state is rendered once
// and repainted by the next draw, so nothing is left on screen.
function chooseFontSize() {
  const saved = { current, committed, chosen, finished, score };
  const N = SCENARIOS.length;
  for (const size of [18, 17, 16, 15, 14, 13]) {
    setFont(size);
    let worst = 0;
    finished = false;
    for (let i = 0; i < N; i++) {
      current = i;
      const key = SCENARIOS[i].action;
      for (const st of [-1, key, (key + 1) % 4]) {
        committed = st >= 0;
        chosen = st;
        renderContent();
        worst = Math.max(worst, layoutBottom);
      }
    }
    finished = true;
    score = 0; // the not-met mastery sentence is the longer one
    renderContent();
    worst = Math.max(worst, layoutBottom);
    current = saved.current; committed = saved.committed; chosen = saved.chosen;
    finished = saved.finished; score = saved.score;
    if (worst <= drawHeight - 8) break;
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
function drawLines(lines, x, y, lh) {
  textAlign(LEFT, TOP);
  noStroke();
  for (const ln of lines) {
    text(ln, x, y);
    y += lh;
  }
  return y;
}

// The policy panel: label, five rules; the matching rule is outlined after a commit
function drawPolicy(y, highlightRule) {
  const innerW = canvasWidth - 2 * pad;
  // measure
  textSize(fs);
  textStyle(BOLD);
  const numW = textWidth('▶ Rule 5') + 10;  // width of the "Rule n" column
  textStyle(NORMAL);
  const ruleLines = RULES.map(r => wrapText(r, innerW - numW - 20));
  textStyle(ITALIC);
  const labelLines = wrapText(POLICY_LABEL, innerW - 20);
  textStyle(NORMAL);
  let h = 8 + lineH + labelLines.length * lineH + 6;
  for (const rl of ruleLines) h += rl.length * lineH + 8;
  h += 2;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(pad, y, innerW, h, 10);

  let yy = y + 8;
  fill('black');
  textStyle(BOLD);
  yy = drawLines(['Lab AI disclosure policy'], pad + 10, yy, lineH);
  textStyle(ITALIC);
  fill('dimgray');
  yy = drawLines(labelLines, pad + 10, yy, lineH) + 6;
  textStyle(NORMAL);

  for (let i = 0; i < RULES.length; i++) {
    const rh = ruleLines[i].length * lineH;
    const isMatch = highlightRule === i + 1;
    if (isMatch) {
      fill(FILL_CORRECT);
      stroke(COLOR_RULE);
      strokeWeight(3);
      rect(pad + 4, yy - 4, innerW - 8, rh + 8, 6);
      strokeWeight(1);
    }
    textStyle(BOLD);
    fill(isMatch ? COLOR_RULE : 'black');
    drawLines([(isMatch ? '▶ ' : '') + 'Rule ' + (i + 1)], pad + 10, yy, lineH);
    textStyle(NORMAL);
    fill('black');
    drawLines(ruleLines[i], pad + 10 + numW, yy, lineH);
    yy += rh + 8;
  }
  return y + h;
}

function drawPlay(y) {
  const innerW = canvasWidth - 2 * pad;
  const s = SCENARIOS[current];

  // policy (always visible)
  y = drawPolicy(y, committed ? s.rule : 0) + 10;

  // status line
  textSize(fs);
  fill('black');
  y = drawLines(wrapText('Scenario ' + (current + 1) + ' of ' + SCENARIOS.length +
    '  |  Correct so far: ' + score, innerW), pad, y, lineH) + 4;

  // scenario card
  textSize(fs + 2);
  textStyle(BOLD);
  const cardLines = wrapText(s.text, innerW - 24);
  const cardH = cardLines.length * cardLH + 18;
  fill('white');
  stroke('navy');
  strokeWeight(2);
  rect(pad, y, innerW, cardH, 10);
  strokeWeight(1);
  fill('black');
  drawLines(cardLines, pad + 12, y + 10, cardLH);
  textStyle(NORMAL);
  y += cardH + 8;

  // question
  textSize(fs);
  fill('navy');
  textStyle(BOLD);
  y = drawLines(wrapText(QUESTION, innerW), pad, y, lineH) + 6;
  textStyle(NORMAL);

  // feedback
  if (!committed) {
    fill('black');
    y = drawLines(wrapText('Choose an action from the list below and press Submit. ' +
      'Each scenario has one attempt.', innerW), pad, y, lineH);
  } else {
    const ok = isCorrect(current, chosen);
    const col = ok ? COLOR_CORRECT : COLOR_WRONG;
    textSize(fs);
    textStyle(BOLD);
    const vLines = wrapText((ok ? '✓ ' : '✗ ') + verdictText(current, chosen), innerW - 20);
    textStyle(NORMAL);
    const wLines = wrapText(s.why, innerW - 20);
    const boxH = (vLines.length + wLines.length) * lineH + 16;
    fill(ok ? FILL_CORRECT : FILL_WRONG);
    stroke(col);
    strokeWeight(2);
    rect(pad, y, innerW, boxH, 8);
    strokeWeight(1);
    textStyle(BOLD);
    fill(col);
    let yy = drawLines(vLines, pad + 10, y + 8, lineH);
    textStyle(NORMAL);
    fill('black');
    drawLines(wLines, pad + 10, yy, lineH);
    y += boxH;
  }
  layoutBottom = y;
}

function drawSummary(y) {
  const innerW = canvasWidth - 2 * pad;

  textSize(fs);
  fill('black');
  y = drawLines(['All ' + SCENARIOS.length + ' scenarios answered'], pad, y, lineH) + 4;

  // score
  textSize(fs + 8);
  textStyle(BOLD);
  y = drawLines([scoreLine(score)], pad, y, fs + 14);
  textSize(fs);
  const ok = masteryMet(score);
  fill(ok ? COLOR_CORRECT : COLOR_WRONG);
  const masteryStr = ok
    ? '✓ Mastery threshold met: at least ' + MASTERY + ' of ' + SCENARIOS.length + ' correct on the first attempt.'
    : '✗ Mastery threshold not met: ' + MASTERY + ' of ' + SCENARIOS.length + ' correct on the first attempt are needed.';
  y = drawLines(wrapText(masteryStr, innerW), pad, y, lineH) + 12;
  textStyle(NORMAL);

  // draft disclosure statement
  fill('black');
  textStyle(BOLD);
  y = drawLines(wrapText('Draft disclosure statement (from the scenarios that required disclosure in the paper: ' +
    SCENARIOS.filter(sc => sc.action === DISCLOSE).map(sc => sc.id).join(', ') + ')', innerW), pad, y, lineH) + 4;
  textStyle(NORMAL);

  const paragraph = draftStatementSentences().join(' ');
  const bodyLines = wrapText(paragraph, innerW - 24);
  const boxH = bodyLines.length * lineH + 20;
  fill('white');
  stroke('dimgray');
  strokeWeight(1);
  drawingContext.setLineDash([6, 4]); // dashed border marks it as a draft
  rect(pad, y, innerW, boxH, 8);
  drawingContext.setLineDash([]);
  fill('black');
  drawLines(bodyLines, pad + 12, y + 10, lineH);
  y += boxH + 8;

  fill('dimgray');
  textStyle(ITALIC);
  y = drawLines(wrapText('Illustrative draft, not legal advice. It follows the illustrative lab policy, ' +
    "not a real venue's policy. Fill in the tool, version, and date from your project log, and " +
    "check your venue's and institution's current rules at submission.", innerW), pad, y, lineH);
  textStyle(NORMAL);
  layoutBottom = y;

  // control region note (no controls remain on the summary screen)
  fill('dimgray');
  noStroke();
  textAlign(LEFT, CENTER);
  text('Reload the page to start again.', 10, drawHeight + controlHeight / 2);
}

// These two functions must be present for width responsive MicroSims
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  chooseFontSize();
  layoutControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
