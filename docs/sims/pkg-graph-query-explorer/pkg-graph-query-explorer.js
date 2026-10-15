// Personal Knowledge Graph Query Explorer
// vis-network graph-model MicroSim (Bloom: Apply, verb: solve)
// Ten entities and twelve typed, directed relationships. For each of five
// questions the learner selects the exact set of entities that answers it.
// CANVAS_HEIGHT: 840
// The iframe height is CANVAS_HEIGHT + 2 = 842 (checked at 360, 400, 450, 740 and 1100 px wide).

// ===========================================
// CONTENT (verbatim from the chapter specification)
// ===========================================

// Entities and their types
const ENTITIES = [
    { id: 'E1', name: 'Run 07',        type: 'Experiment' },
    { id: 'E2', name: 'Run 08',        type: 'Experiment' },
    { id: 'D1', name: 'Dataset A',     type: 'Dataset' },
    { id: 'D2', name: 'Dataset B',     type: 'Dataset' },
    { id: 'S1', name: 'ADC Design v2', type: 'Design' },
    { id: 'S2', name: 'ADC Design v3', type: 'Design' },
    { id: 'P1', name: 'Paper Alpha',   type: 'Paper' },
    { id: 'P2', name: 'Paper Beta',    type: 'Paper' },
    { id: 'C1', name: 'ENOB',          type: 'Concept' },
    { id: 'A1', name: 'Dr. Rivera',    type: 'Person' }
];

// Relationships, each directed from the first entity to the second
const RELATIONSHIPS = [
    { n: 1,  from: 'E1', type: 'TESTED',   to: 'S1' },
    { n: 2,  from: 'E2', type: 'TESTED',   to: 'S2' },
    { n: 3,  from: 'E1', type: 'USED',     to: 'D1' },
    { n: 4,  from: 'E2', type: 'USED',     to: 'D1' },
    { n: 5,  from: 'E2', type: 'USED',     to: 'D2' },
    { n: 6,  from: 'S2', type: 'REVISES',  to: 'S1' },
    { n: 7,  from: 'P1', type: 'REPORTS',  to: 'E1' },
    { n: 8,  from: 'P2', type: 'REPORTS',  to: 'E2' },
    { n: 9,  from: 'P2', type: 'CITES',    to: 'P1' },
    { n: 10, from: 'P1', type: 'ABOUT',    to: 'C1' },
    { n: 11, from: 'P2', type: 'ABOUT',    to: 'C1' },
    { n: 12, from: 'A1', type: 'AUTHORED', to: 'P2' }
];

// Questions in fixed order. `answer` and `why` are verbatim from the spec.
// `start` and `steps` encode the traversal: 'out' follows an edge in its
// stated direction, 'in' follows it against its direction (the "from" side).
const QUESTIONS = [
    {
        text: 'Which experiments used Dataset A?',
        answer: ['Run 07', 'Run 08'],
        why: 'Follow USED edges backward into Dataset A (edges 3 and 4).',
        start: ['D1'],
        steps: [{ rel: 'USED', dir: 'in' }]
    },
    {
        text: 'Which designs were tested in an experiment that used Dataset B?',
        answer: ['ADC Design v3'],
        why: 'Dataset B is used only by Run 08 (edge 5), and Run 08 tested ADC Design v3 (edge 2).',
        start: ['D2'],
        steps: [{ rel: 'USED', dir: 'in' }, { rel: 'TESTED', dir: 'out' }]
    },
    {
        text: 'Which papers report an experiment that tested the design that ADC Design v3 revises?',
        answer: ['Paper Alpha'],
        why: 'ADC Design v3 REVISES ADC Design v2 (edge 6), Run 07 tested ADC Design v2 (edge 1), and Paper Alpha reports Run 07 (edge 7).',
        start: ['S2'],
        steps: [{ rel: 'REVISES', dir: 'out' }, { rel: 'TESTED', dir: 'in' }, { rel: 'REPORTS', dir: 'in' }]
    },
    {
        text: 'Which papers are cited by a paper that Dr. Rivera authored?',
        answer: ['Paper Alpha'],
        why: 'Dr. Rivera authored Paper Beta (edge 12), and Paper Beta cites Paper Alpha (edge 9).',
        start: ['A1'],
        steps: [{ rel: 'AUTHORED', dir: 'out' }, { rel: 'CITES', dir: 'out' }]
    },
    {
        text: 'If Dataset A were found to be corrupted, which papers must be rechecked?',
        answer: ['Paper Alpha', 'Paper Beta'],
        why: 'Dataset A is used by Run 07 and Run 08 (edges 3 and 4), which are reported by Paper Alpha and Paper Beta (edges 7 and 8).',
        start: ['D1'],
        steps: [{ rel: 'USED', dir: 'in' }, { rel: 'REPORTS', dir: 'in' }]
    }
];

const MASTERY = 4;   // mastery threshold: at least 4 of 5 correct

// ===========================================
// PURE LOGIC (also exercised by the node tests)
// ===========================================
function entityById(id) {
    return ENTITIES.find(e => e.id === id);
}

function entityByName(name) {
    return ENTITIES.find(e => e.name === name);
}

// Follow the question's steps from its start set.
// Returns the answer ids and the numbers of the edges on the path.
function traverse(q) {
    let frontier = new Set(q.start);
    const pathEdges = [];
    const pathNodes = new Set(q.start);
    for (const step of q.steps) {
        const next = new Set();
        for (const r of RELATIONSHIPS) {
            if (r.type !== step.rel) continue;
            if (step.dir === 'out' && frontier.has(r.from)) {
                next.add(r.to);
                pathEdges.push(r.n);
            } else if (step.dir === 'in' && frontier.has(r.to)) {
                next.add(r.from);
                pathEdges.push(r.n);
            }
        }
        next.forEach(id => pathNodes.add(id));
        frontier = next;
    }
    return { answerIds: Array.from(frontier), pathEdges: pathEdges, pathNodes: Array.from(pathNodes) };
}

// The spec's answer set as entity ids
function answerIds(q) {
    return q.answer.map(name => entityByName(name).id);
}

// A selection is correct only if it equals the answer set exactly
function isCorrectSelection(selectedIds, q) {
    const ans = new Set(answerIds(q));
    const sel = new Set(selectedIds);
    if (ans.size !== sel.size) return false;
    for (const id of sel) if (!ans.has(id)) return false;
    return true;
}

function masteryMet(nCorrect) {
    return nCorrect >= MASTERY;
}

// ===========================================
// COLORS (Okabe-Ito color-blind-safe palette)
// ===========================================
const TYPE_STYLE = {
    Experiment: { background: '#fbe3b0', border: '#b07a00', shape: 'ellipse' },
    Dataset:    { background: '#cfe8f7', border: '#2f8fc4', shape: 'box' },
    Design:     { background: '#c6ebdd', border: '#007a5a', shape: 'box' },
    Paper:      { background: '#faf6c2', border: '#8f8600', shape: 'box' },
    Concept:    { background: '#f2d7e7', border: '#a8558a', shape: 'ellipse' },
    Person:     { background: '#e4e4e4', border: '#666666', shape: 'box' }
};
const SELECT_BORDER = '#003f73';   // selected / answer (navy, solid or dashed)
const WRONG_BORDER  = '#d55e00';   // selected but not in the answer (vermillion, dashed)
const EDGE_IDLE     = '#6b6b6b';
const EDGE_FADED    = '#b5b5b5';
const EDGE_PATH     = '#0072b2';

// Node positions: one layout for wide graph areas, one for tall ones.
// Small y (or x) offsets keep labeled edges off the perfect horizontal,
// which avoids the vis-network edge-label rendering bug.
const POS_WIDE = {
    A1: [-370, -215], C1: [-400, 15],
    P2: [-180, -110], P1: [-180, 125],
    E2: [80, -135],   E1: [80, 150],
    D2: [295, -40],   D1: [295, 65],
    S2: [500, -160],  S1: [500, 175]
};
const POS_TALL = {
    A1: [-200, -350], C1: [170, -340],
    P2: [-150, -190], P1: [150, -165],
    E2: [-150, 0],    E1: [150, 20],
    D2: [-330, 165],  D1: [0, 165],
    S2: [-170, 340],  S1: [170, 355]
};

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let currentQ = 0;          // index of the question on screen (0..4)
let selected = new Set();  // entity ids selected for the current question
let results = [];          // per question: null | { selectedIds, correct }
let hoveredEdge = null;
let currentLayout = 'wide';

function el(id) {
    return document.getElementById(id);
}

// ===========================================
// NETWORK STYLING
// ===========================================
function revealState(id) {
    const r = results[currentQ];
    if (!r) return selected.has(id) ? 'selected' : 'none';
    const inAns = answerIds(QUESTIONS[currentQ]).includes(id);
    const wasSel = r.selectedIds.includes(id);
    if (inAns && wasSel) return 'correct';
    if (inAns && !wasSel) return 'missed';
    if (!inAns && wasSel) return 'wrong';
    return 'none';
}

const GLYPH = { selected: '✓ ', correct: '✓ ', missed: '★ ', wrong: '✗ ', none: '' };

function nodeStyle(id) {
    const e = entityById(id);
    const t = TYPE_STYLE[e.type];
    const state = revealState(id);
    let border = t.border, width = 2, dashes = false;
    if (state === 'selected' || state === 'correct') { border = SELECT_BORDER; width = 6; }
    if (state === 'missed') { border = SELECT_BORDER; width = 6; dashes = [6, 4]; }
    if (state === 'wrong')  { border = WRONG_BORDER;  width = 5; dashes = [6, 4]; }
    const name = GLYPH[state] + e.name;
    return {
        id: id,
        label: `<b>${name}</b>\n<i>${e.type}</i>`,
        shape: t.shape,
        color: {
            background: t.background,
            border: border,
            highlight: { background: t.background, border: border },
            hover: { background: t.background, border: border }
        },
        borderWidth: width,
        shapeProperties: { borderDashes: dashes }
    };
}

// Near-horizontal edges carry their label just above the line, so a long
// label such as "8 REPORTS" does not sit on top of the arrowhead;
// steeper edges keep a horizontal label beside the line.
function labelAlign(r) {
    const pos = positionsFor(currentLayout);
    const dx = Math.abs(pos[r.to][0] - pos[r.from][0]);
    const dy = Math.abs(pos[r.to][1] - pos[r.from][1]);
    return dy < 0.5 * dx ? 'top' : 'horizontal';
}

function edgeStyle(r) {
    const done = !!results[currentQ];
    const onPath = done && traverse(QUESTIONS[currentQ]).pathEdges.includes(r.n);
    const align = labelAlign(r);
    if (onPath) {
        return {
            id: r.n, label: `${r.n} ${r.type}`,
            color: { color: EDGE_PATH, highlight: EDGE_PATH, hover: EDGE_PATH },
            width: 5, dashes: false,
            font: { color: '#003f73', bold: true, align: align }
        };
    }
    const showType = (hoveredEdge === r.n);
    const c = done ? EDGE_FADED : EDGE_IDLE;
    return {
        id: r.n, label: showType ? `${r.n} ${r.type}` : `${r.n}`,
        color: { color: c, highlight: c, hover: c },
        width: showType ? 3 : 1.5, dashes: false,
        font: { color: showType ? '#1a1a1a' : '#555555', bold: showType, align: align }
    };
}

function refreshGraph() {
    if (!nodes) return;
    nodes.update(ENTITIES.map(e => nodeStyle(e.id)));
    edges.update(RELATIONSHIPS.map(r => edgeStyle(r)));
}

function positionsFor(layout) {
    return layout === 'tall' ? POS_TALL : POS_WIDE;
}

// The tall arrangement is used in narrow pages (graph above the panel) and
// in wide pages (graph beside the panel); the wide one in between.
// It depends on the page width only, so the graph never rearranges itself
// when the feedback text changes the graph's height.
function layoutForWidth(w) {
    return (w < 600 || w >= 1000) ? 'tall' : 'wide';
}

// Fit the drawing to the graph area (no mouse-wheel zoom in the page).
function fitGraph() {
    if (!network) return;
    const box = el('network');
    const W = box.clientWidth, H = box.clientHeight;
    if (W === 0 || H === 0) return;
    const want = layoutForWidth(window.innerWidth);
    if (want !== currentLayout) {
        currentLayout = want;
        const pos = positionsFor(want);
        ENTITIES.forEach(e => network.moveNode(e.id, pos[e.id][0], pos[e.id][1]));
        refreshGraph();   // label alignment depends on the arrangement
    }
    // Node sizes come from the last drawing; centers from the current positions,
    // so the bounds are right even straight after the nodes were moved.
    const pos = positionsFor(currentLayout);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    ENTITIES.forEach(e => {
        const b = network.getBoundingBox(e.id);
        const hw = (b.right - b.left) / 2, hh = (b.bottom - b.top) / 2;
        const [x, y] = pos[e.id];
        minX = Math.min(minX, x - hw);  maxX = Math.max(maxX, x + hw);
        minY = Math.min(minY, y - hh);  maxY = Math.max(maxY, y + hh);
    });
    minX -= 8; maxX += 8; minY -= 8; maxY += 22;   // room for the "illustrative" tag
    const scale = Math.min((W - 8) / (maxX - minX), (H - 8) / (maxY - minY), 1.3);
    network.moveTo({
        position: { x: (minX + maxX) / 2, y: (minY + maxY) / 2 },
        scale: scale,
        animation: false
    });
}

// ===========================================
// HOVER INFORMATION (exploration, not scored)
// ===========================================
function nodeInfoText(id) {
    const e = entityById(id);
    const out = RELATIONSHIPS.filter(r => r.from === id)
        .map(r => `${r.type} → ${entityById(r.to).name} (edge ${r.n})`);
    const inc = RELATIONSHIPS.filter(r => r.to === id)
        .map(r => `${entityById(r.from).name} ${r.type} → (edge ${r.n})`);
    let s = `<b>${e.name}</b> (${e.type}).`;
    if (out.length) s += ` Outgoing: ${out.join('; ')}.`;
    if (inc.length) s += ` Incoming: ${inc.join('; ')}.`;
    return s;
}

function edgeInfoText(n) {
    const r = RELATIONSHIPS.find(x => x.n === n);
    return `<b>Edge ${r.n}:</b> ${entityById(r.from).name} <b>${r.type}</b> → ${entityById(r.to).name}`;
}

// Show the info box over the half of the graph away from the item
function showInfo(html, domY) {
    const box = el('hover-info');
    const H = el('network').clientHeight;
    box.innerHTML = html;
    box.classList.remove('at-top', 'at-bottom');
    box.classList.add(domY > H / 2 ? 'at-top' : 'at-bottom');
    box.classList.add('show');
}

function hideInfo() {
    el('hover-info').classList.remove('show');
}

function showNodeInfo(id) {
    if (!network) return;
    const p = network.canvasToDOM(network.getPosition(id));
    showInfo(nodeInfoText(id), p.y);
}

// ===========================================
// NETWORK SETUP
// ===========================================
function initializeNetwork() {
    currentLayout = layoutForWidth(window.innerWidth);
    const pos = positionsFor(currentLayout);
    nodes = new vis.DataSet(ENTITIES.map(e => Object.assign(
        { x: pos[e.id][0], y: pos[e.id][1] }, nodeStyle(e.id))));
    edges = new vis.DataSet(RELATIONSHIPS.map(r => Object.assign(
        { from: r.from, to: r.to }, edgeStyle(r))));

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: false,          // never capture mouse-wheel scroll
            dragView: false,          // no drag-to-pan inside the textbook page
            dragNodes: false,
            hover: true,
            hoverConnectedEdges: false,
            keyboard: { enabled: false },
            tooltipDelay: 100
        },
        nodes: {
            margin: 7,
            widthConstraint: { minimum: 112 },
            font: { size: 17, face: 'Arial', color: '#1a1a1a', multi: 'html',
                    ital: { size: 14, color: '#333333' } },
            chosen: false
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: false,
            hoverWidth: 0,
            font: { size: 15, face: 'Arial', strokeWidth: 5, strokeColor: '#ffffff' },
            chosen: false
        }
    };

    network = new vis.Network(el('network'), { nodes, edges }, options);
    network.once('afterDrawing', fitGraph);

    // Clicking a node toggles it in the selection (before submit only)
    network.on('click', params => {
        if (params.nodes.length > 0) toggleEntity(params.nodes[0]);
    });

    network.on('hoverNode', params => {
        el('network').style.cursor = results[currentQ] ? 'default' : 'pointer';
        showNodeInfo(params.node);
    });
    network.on('blurNode', () => {
        el('network').style.cursor = 'default';
        hideInfo();
    });
    network.on('hoverEdge', params => {
        hoveredEdge = params.edge;
        const r = RELATIONSHIPS.find(x => x.n === params.edge);
        const a = network.canvasToDOM(network.getPosition(r.from));
        const b = network.canvasToDOM(network.getPosition(r.to));
        showInfo(edgeInfoText(params.edge), (a.y + b.y) / 2);
        refreshGraph();
    });
    network.on('blurEdge', () => {
        hoveredEdge = null;
        hideInfo();
        refreshGraph();
    });

    // Refit when the iframe size changes
    if (window.ResizeObserver) {
        new ResizeObserver(() => {
            network.redraw();
            fitGraph();
        }).observe(el('network'));
    } else {
        window.addEventListener('resize', fitGraph);
    }
}

// ===========================================
// EXERCISE
// ===========================================
function buildEntityButtons() {
    const box = el('entities');
    box.innerHTML = '';
    ENTITIES.forEach(e => {
        const b = document.createElement('button');
        b.className = 'ent-btn';
        b.dataset.id = e.id;
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => toggleEntity(e.id));
        // Keyboard and pointer exploration: show the entity's relationships
        b.addEventListener('focus', () => showNodeInfo(e.id));
        b.addEventListener('blur', hideInfo);
        b.addEventListener('mouseenter', () => showNodeInfo(e.id));
        b.addEventListener('mouseleave', hideInfo);
        box.appendChild(b);
    });
}

function toggleEntity(id) {
    if (results[currentQ]) return;   // one attempt: no change after submit
    if (selected.has(id)) selected.delete(id); else selected.add(id);
    render();
}

function countCorrect() {
    return results.filter(r => r && r.correct).length;
}

function render() {
    const q = QUESTIONS[currentQ];
    const result = results[currentQ];
    const last = currentQ === QUESTIONS.length - 1;

    el('q-step').textContent = `Question ${currentQ + 1} of ${QUESTIONS.length}`;
    el('q-text').textContent = q.text;

    // Entity buttons mirror the node states, with glyphs (not color alone)
    document.querySelectorAll('.ent-btn').forEach(b => {
        const id = b.dataset.id;
        const state = revealState(id);
        b.textContent = GLYPH[state] + entityById(id).name;
        b.setAttribute('aria-pressed', String(result ? result.selectedIds.includes(id) : selected.has(id)));
        b.disabled = !!result;
        b.classList.toggle('is-correct', state === 'correct');
        b.classList.toggle('is-missed', state === 'missed');
        b.classList.toggle('is-wrong', state === 'wrong');
        const status = { correct: ', correct pick', missed: ', in the answer, not selected',
                         wrong: ', not in the answer', selected: ', selected', none: '' }[state];
        b.setAttribute('aria-label', entityById(id).name + ' (' + entityById(id).type + ')' + status);
    });

    // Feedback
    const fb = el('feedback');
    fb.innerHTML = '';
    if (result) {
        const div = document.createElement('div');
        if (result.correct) {
            div.className = 'fb';
            div.textContent = `✓ Correct. ${q.why}`;
        } else {
            div.className = 'fb fb-wrong';
            div.textContent = `✗ Incorrect. The correct answer set is: ${q.answer.join(', ')}. ${q.why}`;
        }
        fb.appendChild(div);
        if (last) {
            const n = countCorrect();
            const fin = document.createElement('div');
            fin.className = 'fb-final';
            fin.textContent = `${n} of 5 correct. ` + (masteryMet(n)
                ? `Mastery threshold of ${MASTERY} met.`
                : `Mastery threshold of ${MASTERY} not met.`) +
                ' Notice that question 5 needs a path of two hops and has two answers.';
            fb.appendChild(fin);
        }
    }

    // Controls
    el('submit-btn').style.display = result ? 'none' : '';
    el('submit-btn').disabled = selected.size === 0;
    el('next-btn').style.display = (result && !last) ? '' : 'none';
    el('restart-btn').style.display = (result && last) ? '' : 'none';
    el('score').textContent = `Score: ${countCorrect()} of 5 correct`;

    refreshGraph();
}

function submit() {
    if (results[currentQ] || selected.size === 0) return;
    const ids = Array.from(selected);
    results[currentQ] = { selectedIds: ids, correct: isCorrectSelection(ids, QUESTIONS[currentQ]) };
    render();
    const next = el('next-btn');
    (next.style.display === 'none' ? el('restart-btn') : next).focus();
}

function nextQuestion() {
    if (!results[currentQ] || currentQ >= QUESTIONS.length - 1) return;
    currentQ++;
    selected = new Set();
    render();
    const first = document.querySelector('.ent-btn');
    if (first) first.focus();
}

function restart() {
    currentQ = 0;
    selected = new Set();
    results = QUESTIONS.map(() => null);
    render();
}

// ===========================================
// STARTUP (browser only; node tests import the pure logic above)
// ===========================================
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        results = QUESTIONS.map(() => null);
        buildEntityButtons();
        initializeNetwork();
        render();
        el('submit-btn').addEventListener('click', submit);
        el('next-btn').addEventListener('click', nextQuestion);
        el('restart-btn').addEventListener('click', restart);
    });
}

if (typeof module !== 'undefined') {
    module.exports = { ENTITIES, RELATIONSHIPS, QUESTIONS, MASTERY, traverse, answerIds,
                       isCorrectSelection, masteryMet, entityByName };
}
