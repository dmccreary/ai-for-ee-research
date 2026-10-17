// Research Funnel MicroSim
// CANVAS_HEIGHT: 580
// A horizontal six-stage funnel: wide "Research Ideas" on the left narrows to "Published Paper"
// on the right. The learner steps through the stages (Previous / Next, or click a stage) and reads
// the standard research name for each gate, the question the gate asks, why ideas stop there,
// and an EE example. A slider sets how many ideas enter the funnel so the counts are concrete.
// Stage names follow FINER (Hulley et al.), Stage-Gate (Cooper 1990) and the Heilmeier catechism.
// Pass rates are ILLUSTRATIVE, not measured. The sim is static: it redraws only on input.
// When the learner has visited all six stages, two confetti cannons fire once. The draw loop runs
// only while confetti is in the air; Reset clears the visited stages so the learner can repeat it.
// xAPI: the learner's acts are reported through docs/js/lrs-sim.js when it is loaded (see main.html);
// the sim runs unchanged without it (p5.js editor). Evidence: opening a stage (click, Next or Previous),
// the Starting ideas slider, Reset, and time on the page. The confetti is a reward, not evidence.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 80;       // two rows of controls: (2 x 35) + 10
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 170;   // room for "Starting ideas: 200" left of the slider
let defaultTextSize = 16;

// ---------------------------------------------------------------
// Content. pass = fraction of the previous stage that survives the gate (illustrative).
// lines = stage label on wide screens; the narrow layout puts one word on each line.
// ---------------------------------------------------------------
const STAGES = [
  {
    name: 'Research Ideas', key: 'research-ideas', lines: ['Research', 'Ideas'], pass: 1,
    term: 'Ideation (Stage-Gate: Discovery and the idea screen)',
    gate: 'Is this a clear, specific question with a measurable outcome?',
    stop: 'The idea is vague, has no metric, or cannot be answered by an experiment.',
    example: '"Can learned calibration cut comparator offset in a SAR ADC?" passes; "make ADCs better" does not.'
  },
  {
    name: 'Novelty Screen', key: 'not-done-before', lines: ['Novelty', 'Screen'], pass: 0.4,
    term: 'Novelty screen by literature review (FINER: Novel)',
    gate: 'Has someone already done this, or is there a real gap in the literature?',
    stop: 'The idea is already published, only incremental, or a competing group is ahead.',
    example: 'Search IEEE Xplore and Google Scholar for the same circuit, metric, and process node.'
  },
  {
    name: 'Feasible Within Budget', key: 'feasible-within-budget', lines: ['Feasible', 'Within Budget'], pass: 0.6,
    term: 'Feasibility study, or scoping (FINER: Feasible)',
    gate: 'Can we finish with our time, budget, equipment, tools, and skills?',
    stop: 'It needs a tapeout, data, or licenses we cannot get, or it outlasts the project.',
    example: 'A 28 nm tapeout costs more than the grant, so the team plans a SPICE-level study instead.'
  },
  {
    name: 'Funded & Approved', key: 'funded-and-approved', lines: ['Funded &', 'Approved'], pass: 0.5,
    term: 'Proposal and review gate (FINER: Interesting, Ethical, Relevant)',
    gate: 'Who cares, and will the advisor, the funder, and the review board say yes?',
    stop: 'The proposal is not funded, the "so what?" is weak, or approval is denied.',
    example: 'A proposal to NSF or SRC. The Heilmeier questions ask what is new and who cares.'
  },
  {
    name: 'Validated Results', key: 'validated-results', lines: ['Validated', 'Results'], pass: 0.5,
    term: 'Execution and validation (Stage-Gate: Development and Testing)',
    gate: 'Do the experiments support the hypothesis, and can others reproduce them?',
    stop: 'Results are negative, depend on a bug, or vanish under a new corner or dataset.',
    example: 'The offset reduction disappears in Monte Carlo runs across process corners.'
  },
  {
    name: 'Published Paper', key: 'published-paper', lines: ['Published', 'Paper'], pass: 0.7,
    term: 'Dissemination by peer review',
    gate: 'Do reviewers judge the work novel, sound, and clearly written?',
    stop: 'Reviewers reject the paper, or the authors abandon a major revision.',
    example: 'Acceptance at an IEEE journal or conference such as JSSC or ISSCC.'
  }
];

// segment fill colors (named colors only); white text is used from index 3 on
const FILLS = ['lightskyblue', 'skyblue', 'deepskyblue', 'dodgerblue', 'royalblue', 'seagreen'];

let selected = 0;             // index of the stage being explained
let visited = [true, false, false, false, false, false];   // stages the learner has opened
let celebrated = false;       // confetti fires once per run through all six stages
let prevButton, nextButton, resetButton, startSlider;

// xAPI handles; lrs stays null when the runtime is absent
let lrs = null, stageEv = [], startEv = null, resetEv = null;
// learning-graph ConceptIDs for each stage (undefined = no matching concept in the graph)
const STAGE_CONCEPT_IDS = [257, 265, 262, undefined, 298, undefined];
const PAGE_CONCEPT_ID = 17;   // Research Pipeline

// confetti cannons (shown after all six stages are visited)
let confetti = [];
let cannonFlash = 0;          // frames left to draw the cannon barrels
const CONFETTI_COLORS = ['red', 'orange', 'gold', 'limegreen', 'dodgerblue', 'mediumorchid', 'hotpink'];

// funnel geometry, recalculated in computeLayout() on every draw
let funnelX0, funnelW, segW, funnelCY, funnelMaxH;
const FUNNEL_MIN_H = 30;      // keeps the smallest stage tall enough to hold its count
let labelTop, labelH, passTop, panelTop;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Row 1: Previous / Next buttons
  prevButton = createButton('Previous');
  prevButton.position(10, drawHeight + 5);
  prevButton.mousePressed(() => selectStage(selected - 1, 'step'));

  nextButton = createButton('Next');
  nextButton.position(90, drawHeight + 5);
  nextButton.mousePressed(() => selectStage(selected + 1, 'step'));

  resetButton = createButton('Reset');
  resetButton.position(145, drawHeight + 5);
  resetButton.mousePressed(() => {
    resetVisits();
    if (lrs) resetEv.press('reset');
  });

  // Row 2: number of ideas that enter the funnel
  startSlider = createSlider(20, 200, 100, 10);
  startSlider.position(sliderLeftMargin, drawHeight + 40);
  startSlider.size(canvasWidth - sliderLeftMargin - margin);
  startSlider.input(() => {
    redraw();
    if (lrs) startEv.input(startSlider.value());
  });
  startSlider.changed(() => { if (lrs) startEv.settle(startSlider.value()); });

  if (window.LRSSim) {
    const pageConcept = LRS.conceptId(PAGE_CONCEPT_ID);
    lrs = LRSSim.create({ name: 'Research Funnel', concept: pageConcept, pageDwell: true,
                          mount: '#xapi-slot', source: 'the Research Funnel MicroSim' });
    STAGES.forEach((st, i) => {
      stageEv[i] = lrs.item('stage-' + st.key, { name: 'Stage ' + (i + 1) + ': ' + st.name,
        concept: STAGE_CONCEPT_IDS[i] ? LRS.conceptId(STAGE_CONCEPT_IDS[i]) : undefined });
    });
    startEv = lrs.slider('starting-ideas-slider', { name: 'Starting Ideas Slider', concept: pageConcept,
      min: 20, max: 200, initial: startSlider.value(), round: 0, deadband: 10 });
    resetEv = lrs.button('reset-control', { name: 'Reset Control', concept: pageConcept });
  }

  updateButtons();
  describe('A horizontal funnel of six stages, wide on the left and narrow on the right: Research Ideas, ' +
    'Not Done Before, Feasible Within Budget, Funded and Approved, Validated Results, and Published Paper. ' +
    'Each stage shows how many of the starting ideas remain. Previous and Next buttons or a click on a stage ' +
    'explain its gate, why ideas stop there, and an example. A slider sets the number of starting ideas. Visiting all six stages fires confetti cannons.');
  noLoop();
}

function draw() {
  updateCanvasSize();
  computeLayout();

  // Drawing region: aliceblue with silver border. Control region: white.
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth - 1, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth - 1, controlHeight);

  // Title is drawn before the funnel
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(24);
  text('Research Funnel', canvasWidth / 2, 10);
  textStyle(NORMAL);

  drawFunnel();
  drawStageLabels();
  drawPassRates();
  drawDetailPanel();
  drawControlLabels();
  updateAndDrawConfetti();
}

// ---------------------------------------------------------------
// Layout
// ---------------------------------------------------------------
function narrowLayout() {
  return canvasWidth < 640;
}

function computeLayout() {
  funnelX0 = margin;
  funnelW = canvasWidth - 2 * margin;
  segW = funnelW / STAGES.length;
  funnelMaxH = 120;
  funnelCY = 48 + funnelMaxH / 2 + 4;       // vertical center of the funnel
  labelTop = funnelCY + funnelMaxH / 2 + 8;
  labelH = narrowLayout() ? 48 : 40;
  passTop = labelTop + labelH + 2;
  panelTop = passTop + 26;
}

function cumulative(i) {
  let c = 1;
  for (let k = 1; k <= i; k++) c *= STAGES[k].pass;
  return c;
}

// full height of the funnel at the left edge of stage i (i = STAGES.length is the right end)
function funnelHeightAt(i) {
  const idx = min(i, STAGES.length - 1);
  return FUNNEL_MIN_H + (funnelMaxH - FUNNEL_MIN_H) * cumulative(idx);
}

// ---------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------
function drawFunnel() {
  const n = STAGES.length;
  for (let i = 0; i < n; i++) {
    const xl = funnelX0 + i * segW;
    const xr = xl + segW;
    const hl = funnelHeightAt(i) / 2;
    const hr = (i < n - 1 ? funnelHeightAt(i + 1) : funnelHeightAt(i)) / 2;

    // segment
    fill(FILLS[i]);
    if (i === selected) {
      stroke('navy');
      strokeWeight(4);
    } else {
      stroke('white');
      strokeWeight(2);
    }
    quad(xl, funnelCY - hl, xr, funnelCY - hr, xr, funnelCY + hr, xl, funnelCY + hl);

    // surviving count in the middle of the segment
    const count = Math.round(startSlider.value() * cumulative(i));
    noStroke();
    fill(i >= 3 ? 'white' : 'black');
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(narrowLayout() ? 18 : 22);
    text(count, (xl + xr) / 2, funnelCY);
    textStyle(NORMAL);
  }
  strokeWeight(1);
}

function drawStageLabels() {
  const size = constrain(segW / 7.5, 11, 16);
  const lineH = size + 2;
  textSize(size);
  textAlign(CENTER, TOP);
  noStroke();
  for (let i = 0; i < STAGES.length; i++) {
    const lines = narrowLayout() ? STAGES[i].lines.join(' ').split(' ') : STAGES[i].lines;
    const cx = funnelX0 + (i + 0.5) * segW;
    textStyle(i === selected ? BOLD : NORMAL);
    fill(i === selected ? 'navy' : 'black');
    for (let k = 0; k < lines.length; k++) {
      text(lines[k], cx, labelTop + k * lineH);
    }
  }
  textStyle(NORMAL);
}

function drawPassRates() {
  const size = constrain(segW / 8, 11, 15);
  textSize(size);
  textAlign(CENTER, TOP);
  noStroke();
  fill('dimgray');
  for (let i = 0; i < STAGES.length; i++) {
    const cx = funnelX0 + (i + 0.5) * segW;
    text(i === 0 ? 'Enter' : Math.round(STAGES[i].pass * 100) + '% pass', cx, passTop);
  }
}

function drawDetailPanel() {
  const s = STAGES[selected];
  const bodySize = canvasWidth >= 640 ? 16 : (canvasWidth >= 480 ? 15 : 13);
  const lineH = bodySize + 5;
  const px = margin;
  const pw = canvasWidth - 2 * margin;
  const ph = drawHeight - 26 - panelTop;
  const inner = 12;

  // panel
  fill('white');
  stroke('navy');
  strokeWeight(selected === STAGES.length - 1 ? 2 : 1);
  rect(px, panelTop, pw, ph, 10);
  strokeWeight(1);

  let y = panelTop + inner - 2;
  noStroke();
  textAlign(LEFT, TOP);

  // heading and research term
  textStyle(BOLD);
  textSize(bodySize + 3);
  fill('navy');
  text((selected + 1) + '. ' + s.name, px + inner, y);
  y += bodySize + 8;
  textStyle(NORMAL);
  textSize(bodySize);
  fill('dimgray');
  y = drawFlow('Research term:', s.term, px + inner, y, pw - 2 * inner, lineH, 'dimgray') ;

  // counts
  const total = startSlider.value();
  const count = Math.round(total * cumulative(selected));
  const countText = selected === 0
    ? 'All ' + total + ' ideas enter the funnel.'
    : count + ' of ' + total + ' ideas remain after this gate (' + Math.round(s.pass * 100) + '% of the previous stage).';
  y = drawFlow('Survivors:', countText, px + inner, y, pw - 2 * inner, lineH, 'black');
  y = drawFlow('Gate question:', s.gate, px + inner, y, pw - 2 * inner, lineH, 'black');
  y = drawFlow('Ideas stop here when:', s.stop, px + inner, y, pw - 2 * inner, lineH, 'black');
  drawFlow('EE example:', s.example, px + inner, y, pw - 2 * inner, lineH, 'black');

  // footer note
  textSize(13);
  textAlign(LEFT, TOP);
  noStroke();
  if (allVisited()) {
    fill('seagreen');
    textStyle(BOLD);
    textSize(canvasWidth >= 480 ? 15 : 13);
    text('All six gates visited. Well done!', margin, drawHeight - 20);
    textStyle(NORMAL);
  } else {
    fill('dimgray');
    text('Pass rates are illustrative, not measured.', margin, drawHeight - 20);
  }
}

// Word-wrapped paragraph that starts with a bold label; returns the y for the next paragraph.
function drawFlow(label, body, x, y, maxW, lineH, bodyColor) {
  const tokens = [];
  label.split(' ').forEach(t => tokens.push({ t: t, bold: true }));
  body.split(' ').forEach(t => tokens.push({ t: t, bold: false }));
  let cx = x;
  let cy = y;
  noStroke();
  textAlign(LEFT, TOP);
  for (const tok of tokens) {
    textStyle(tok.bold ? BOLD : NORMAL);
    const w = textWidth(tok.t);
    if (cx > x && cx + w > x + maxW) {
      cx = x;
      cy += lineH;
    }
    fill(tok.bold ? 'navy' : bodyColor);
    text(tok.t, cx, cy);
    textStyle(NORMAL);
    cx += w + textWidth(' ');
  }
  textStyle(NORMAL);
  return cy + lineH;
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  text('Visited ' + visitCount() + ' of ' + STAGES.length, 215, drawHeight + 18);
  text('Starting ideas: ' + startSlider.value(), 10, drawHeight + 52);
}

// ---------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------
// how = 'click' (funnel segment) or 'step' (Previous/Next); it is passed only for the learner's own acts
function selectStage(i, how) {
  const next = constrain(i, 0, STAGES.length - 1);
  const changed = next !== selected;
  selected = next;
  visited[selected] = true;
  if (changed && how && lrs) stageEv[selected].study(how);   // re-clicking the open stage is not new evidence
  if (allVisited() && !celebrated) {
    celebrated = true;
    fireConfetti();
  }
  updateButtons();
  redraw();
}

function visitCount() {
  return visited.filter(v => v).length;
}

function allVisited() {
  return visitCount() === STAGES.length;
}

// Reset returns to stage 1 with only that stage visited and no confetti in the air
function resetVisits() {
  visited = [true, false, false, false, false, false];
  celebrated = false;
  confetti = [];
  cannonFlash = 0;
  selected = 0;
  updateButtons();
  noLoop();
  redraw();
}

// ---------------------------------------------------------------
// Confetti cannons: one in each lower corner of the drawing region
// ---------------------------------------------------------------
const CANNON_ANGLE = 1.15;    // barrel angle above horizontal, in radians (about 66 degrees)

function fireConfetti() {
  confetti = [];
  cannonFlash = 45;
  // launch speed scales with the drawing height so confetti reaches the top of the funnel
  const speed = drawHeight / 26;
  for (let side = 0; side < 2; side++) {
    const dir = side === 0 ? 1 : -1;          // left cannon fires right, right cannon fires left
    const x0 = side === 0 ? 10 : canvasWidth - 10;
    for (let k = 0; k < 90; k++) {
      const a = CANNON_ANGLE + random(-0.35, 0.35);
      const v = speed * random(0.55, 1.15);
      confetti.push({
        x: x0, y: drawHeight - 8,
        vx: dir * v * cos(a), vy: -v * sin(a),
        w: random(6, 11), h: random(3, 6),
        rot: random(TWO_PI), rotSpeed: random(-0.3, 0.3),
        color: random(CONFETTI_COLORS),
        flutter: random(TWO_PI)               // phase for the side-to-side sway while falling
      });
    }
  }
  loop();                                     // the only time the draw loop runs
}

function updateAndDrawConfetti() {
  if (cannonFlash > 0) {
    drawCannon(10, 1);
    drawCannon(canvasWidth - 10, -1);
    cannonFlash--;
  }
  noStroke();
  for (const p of confetti) {
    p.vy += 0.3;                              // gravity
    p.vx *= 0.985;                            // air drag
    p.vy *= 0.985;
    p.x += p.vx + sin(frameCount * 0.15 + p.flutter) * 0.6;
    p.y += p.vy;
    p.rot += p.rotSpeed;
    push();
    translate(p.x, p.y);
    rotate(p.rot);
    fill(p.color);
    rect(-p.w / 2, -p.h / 2, p.w, p.h);
    pop();
  }
  // confetti is removed when it reaches the bottom of the drawing region
  confetti = confetti.filter(p => p.y < drawHeight - 2);
  if (confetti.length === 0 && cannonFlash === 0) {
    noLoop();
  }
}

// A cannon is a barrel (rotated rectangle) on a round base in the corner
function drawCannon(x, dir) {
  push();
  translate(x, drawHeight - 8);
  stroke('black');
  strokeWeight(1);
  fill('dimgray');
  push();
  rotate(dir === 1 ? -CANNON_ANGLE : -(PI - CANNON_ANGLE));   // barrel points up and toward the center
  rect(0, -7, 34, 14, 3);
  fill('gold');
  rect(30, -9, 6, 18, 2);                     // barrel mouth
  pop();
  fill('black');
  circle(0, 0, 22);
  pop();
}

function updateButtons() {
  prevButton.elt.disabled = (selected === 0);
  nextButton.elt.disabled = (selected === STAGES.length - 1);
}

// clicking a funnel segment, its label, or its pass rate selects that stage
function mousePressed() {
  if (mouseX >= funnelX0 && mouseX <= funnelX0 + funnelW &&
      mouseY >= 40 && mouseY <= passTop + 20) {
    selectStage(floor((mouseX - funnelX0) / segW), 'click');
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    containerWidth = container.offsetWidth;
    canvasWidth = containerWidth;
    if (typeof startSlider !== 'undefined') {
      startSlider.size(canvasWidth - sliderLeftMargin - margin);
    }
  }
}
