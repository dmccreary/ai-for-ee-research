// Citation Chaining Explorer
// vis-network graph-model MicroSim (Bloom: Apply, verb: solve)
// Eight illustrative papers joined by citation edges. An edge "X cites Y" points from X to Y.
// The learner answers five chaining questions in a fixed order, one attempt each,
// by selecting the set of papers that answers each question.
// CANVAS_HEIGHT: 800
// The iframe height is CANVAS_HEIGHT + 2 = 802 (tested at 360, 400, 600, 859, 860 and 1000 px wide).

// ===========================================
// CONTENT (verbatim from the chapter specification)
// ===========================================

const PAPERS = [
    { id: 'S', year: 2022, role: 'Seed paper' },
    { id: 'A', year: 2018, role: 'Cited by S' },
    { id: 'B', year: 2019, role: 'Cited by S' },
    { id: 'C', year: 2020, role: 'Cited by S' },
    { id: 'F', year: 2017, role: 'Cited by B and by C' },
    { id: 'D', year: 2023, role: 'Cites S' },
    { id: 'E', year: 2024, role: 'Cites S and C' },
    { id: 'G', year: 2025, role: 'Cites D' }
];

// Each edge [X, Y] means "X cites Y" and is drawn as an arrow from X to Y.
const CITES = [
    ['S', 'A'], ['S', 'B'], ['S', 'C'],
    ['B', 'F'], ['C', 'F'],
    ['D', 'S'], ['E', 'S'], ['E', 'C'],
    ['G', 'D']
];

const SEED = 'S';

// Five questions in a fixed order. "followed" lists the edges the procedure follows,
// which are highlighted after the learner submits.
const QUESTIONS = [
    { text: 'Which papers are found by backward chaining one step from S?',
      answer: ['A', 'B', 'C'],
      why: 'These are the papers S cites.',
      followed: [['S', 'A'], ['S', 'B'], ['S', 'C']] },
    { text: 'Which papers are found by forward chaining one step from S?',
      answer: ['D', 'E'],
      why: 'These are the papers that cite S.',
      followed: [['D', 'S'], ['E', 'S']] },
    { text: 'Which paper is cited by two of S\'s references?',
      answer: ['F'],
      why: 'B and C both cite F, so F is likely foundational.',
      followed: [['S', 'B'], ['S', 'C'], ['B', 'F'], ['C', 'F']] },
    { text: 'Which paper is found by forward chaining two steps from S?',
      answer: ['G'],
      why: 'G cites D, and D cites S.',
      followed: [['D', 'S'], ['G', 'D']] },
    { text: 'Which paper cites both S and C?',
      answer: ['E'],
      why: 'E cites S and also C, so it is closely tied to this line of work.',
      followed: [['E', 'S'], ['E', 'C']] }
];

const MAIN_QUESTION = 'Which papers does this procedure find?';
const MASTERY = 4;   // mastery: at least 4 of 5 correct on the first (only) attempt

// Answer choices: every paper except the seed (an answer set excludes S)
const CHOICES = PAPERS.map(p => p.id).filter(id => id !== SEED).sort();

// ===========================================
// PURE LOGIC (no DOM; tested in node)
// ===========================================

// Backward chaining: follow an edge from the citing paper to the cited paper.
function citedBy(x) {
    return CITES.filter(e => e[0] === x).map(e => e[1]);
}

// Forward chaining: follow an edge from the cited paper back to the citing paper.
function citing(y) {
    return CITES.filter(e => e[1] === y).map(e => e[0]);
}

function sameSet(a, b) {
    const sa = Array.from(new Set(a)).sort();
    const sb = Array.from(new Set(b)).sort();
    return sa.length === sb.length && sa.every((v, i) => v === sb[i]);
}

function paper(id) {
    return PAPERS.find(p => p.id === id);
}

function edgeId(e) {
    return e[0] + '>' + e[1];
}

// ===========================================
// COLORS (Okabe-Ito color-blind-safe palette)
// ===========================================
const colors = {
    node:       { background: '#eef6fc', border: '#0072b2', font: '#1a1a1a' },
    seed:       { background: '#0072b2', border: '#003f73', font: '#ffffff' },
    selected:   { background: '#fff3d6', border: '#e69f00' },
    answer:     { background: '#d6eaf8', border: '#003f73' },
    wrong:      { background: '#fdf0e1', border: '#d55e00' },
    edge:       '#7a7a7a',
    edgeFollow: '#d55e00'
};

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let openPaperId = null;
let qIndex = 0;          // question being answered (0..4); 5 when finished
let selected = [];       // ids selected for the current question
let results = [];        // per question: { chosen: [...], correct: bool }

function el(id) {
    return document.getElementById(id);
}

// ===========================================
// NETWORK
// ===========================================
// Columns run from older (left) to newer (right). Small y offsets keep edges off the horizontal.
const POS = {
    F: { x: -270, y: 50 },
    A: { x: -130, y: -130 },
    B: { x: -130, y: -10 },
    C: { x: -130, y: 115 },
    S: { x: 10,   y: 20 },
    D: { x: 150,  y: -95 },
    E: { x: 150,  y: 125 },
    G: { x: 290,  y: -45 }
};

function currentView() {
    // Which question's marks to show in the graph
    if (qIndex >= QUESTIONS.length) return { q: QUESTIONS.length - 1, result: results[QUESTIONS.length - 1] };
    return { q: qIndex, result: results[qIndex] };
}

function nodeStyle(id) {
    const p = paper(id);
    const view = currentView();
    const q = QUESTIONS[view.q];
    let c = (id === SEED) ? colors.seed : colors.node;
    let prefix = '';
    let borderWidth = (id === SEED) ? 4 : 2;
    let dashes = false;
    if (id !== SEED) {
        if (view.result) {
            const inAnswer = q.answer.indexOf(id) >= 0;
            const picked = view.result.chosen.indexOf(id) >= 0;
            if (inAnswer) { c = Object.assign({}, colors.node, colors.answer); prefix = '✓ '; borderWidth = 4; }
            else if (picked) { c = Object.assign({}, colors.node, colors.wrong); prefix = '✗ '; borderWidth = 3; dashes = [6, 4]; }
        } else if (selected.indexOf(id) >= 0) {
            c = Object.assign({}, colors.node, colors.selected);
            prefix = '● ';
            borderWidth = 3;
        }
    }
    if (id === openPaperId) borderWidth += 2;
    const label = prefix + (id === SEED ? 'S (seed)' : id) + '\n' + p.year;
    return {
        id: id,
        label: label,
        color: {
            background: c.background,
            border: c.border,
            highlight: { background: c.background, border: c.border },
            hover: { background: c.background, border: c.border }
        },
        borderWidth: borderWidth,
        shapeProperties: { borderDashes: dashes },
        font: { color: c.font }
    };
}

function edgeStyle(e) {
    const view = currentView();
    const followed = view.result &&
        QUESTIONS[view.q].followed.some(f => f[0] === e[0] && f[1] === e[1]);
    return {
        id: edgeId(e),
        color: { color: followed ? colors.edgeFollow : colors.edge },
        width: followed ? 5 : 1.5,
        title: e[0] + ' cites ' + e[1] + (followed ? ' (followed for this answer)' : '')
    };
}

function refreshGraph() {
    if (!nodes) return;
    nodes.update(PAPERS.map(p => nodeStyle(p.id)));
    edges.update(CITES.map(edgeStyle));
}

// Fit the graph to its box, leaving room for the legend at the top and the
// navigation buttons at the bottom.
function fitGraph() {
    if (!network) return;
    const box = el('network');
    const W = box.clientWidth, H = box.clientHeight;
    if (W === 0 || H === 0) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    PAPERS.forEach(p => {
        const b = network.getBoundingBox(p.id);
        minX = Math.min(minX, b.left);  maxX = Math.max(maxX, b.right);
        minY = Math.min(minY, b.top);   maxY = Math.max(maxY, b.bottom);
    });
    const topReserve = W < 520 ? 66 : 58;   // legend
    const bottomReserve = 80;               // two rows of navigation buttons
    const availH = Math.max(H - topReserve - bottomReserve, 40);
    const scale = Math.min((W - 16) / (maxX - minX), (availH - 6) / (maxY - minY), 1.4);
    const cx = (minX + maxX) / 2;
    // shift so the content is centered in the band between the reserves
    const cy = (minY + maxY) / 2 - ((topReserve - bottomReserve) / 2) / scale;
    network.moveTo({ position: { x: cx, y: cy }, scale: scale, animation: false });
}

function initializeNetwork() {
    nodes = new vis.DataSet(PAPERS.map(p => Object.assign({
        x: POS[p.id].x, y: POS[p.id].y
    }, nodeStyle(p.id))));
    edges = new vis.DataSet(CITES.map(e => Object.assign({
        from: e[0], to: e[1]
    }, edgeStyle(e))));

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: false,          // never capture mouse-wheel scroll
            dragView: false,          // no drag-to-pan inside the textbook page
            dragNodes: true,          // dragging papers is exploration
            navigationButtons: true,
            hover: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'box',
            margin: 8,
            widthConstraint: { minimum: 70 },
            font: { size: 26, face: 'Arial', multi: false, align: 'center' },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 },
            chosen: false
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1.0 } },
            smooth: { enabled: false },
            chosen: false
        }
    };

    network = new vis.Network(el('network'), { nodes, edges }, options);

    network.once('afterDrawing', fitGraph);

    network.on('click', params => {
        if (params.nodes.length > 0) openPaper(params.nodes[0]);
    });
    network.on('hoverNode', () => { el('network').style.cursor = 'pointer'; });
    network.on('blurNode', () => { el('network').style.cursor = 'default'; });

    // Keep the graph fitted when the iframe width changes.
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
// EXPLORATION (not scored)
// ===========================================
function openPaper(id) {
    openPaperId = id;
    const p = paper(id);
    const cites = citedBy(id);
    const citedByList = citing(id);
    const box = el('definition');
    box.innerHTML = '';
    const strong = document.createElement('strong');
    strong.textContent = 'Paper ' + id + ' (' + p.year + ', illustrative): ';
    box.appendChild(strong);
    box.appendChild(document.createTextNode(
        p.role + '. Cites: ' + (cites.length ? cites.join(', ') : 'none in this graph') +
        '. Cited by: ' + (citedByList.length ? citedByList.join(', ') : 'none in this graph') + '.'));
    document.querySelectorAll('.node-btn').forEach(b => {
        b.setAttribute('aria-pressed', String(b.dataset.node === id));
    });
    refreshGraph();
}

// ===========================================
// QUESTIONS
// ===========================================
function render() {
    const done = qIndex >= QUESTIONS.length;
    const idx = done ? QUESTIONS.length - 1 : qIndex;
    const q = QUESTIONS[idx];
    const result = results[idx];

    el('q-step').textContent = 'Question ' + (idx + 1) + ' of ' + QUESTIONS.length;
    el('q-text').textContent = q.text;

    // Choices
    const row = el('choice-row');
    row.innerHTML = '';
    CHOICES.forEach(id => {
        const label = document.createElement('label');
        label.className = 'choice';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = id;
        const span = document.createElement('span');
        span.textContent = id + ' (' + paper(id).year + ')';
        label.appendChild(input);
        label.appendChild(span);
        if (result) {
            input.disabled = true;
            input.checked = result.chosen.indexOf(id) >= 0;
            label.classList.add('locked');
            const inAnswer = q.answer.indexOf(id) >= 0;
            if (inAnswer) {
                label.classList.add('is-answer');
                span.textContent = '✓ ' + span.textContent;
            } else if (input.checked) {
                label.classList.add('is-wrong');
                span.textContent = '✗ ' + span.textContent;
            }
        } else {
            input.checked = selected.indexOf(id) >= 0;
            if (input.checked) label.classList.add('selected');
            input.addEventListener('change', () => toggleChoice(id, input.checked, label));
            input.addEventListener('keydown', e => {
                if (e.key === 'Enter' && selected.length > 0) {
                    e.preventDefault();
                    submit();
                }
            });
        }
        row.appendChild(label);
    });

    // Feedback
    const fb = el('feedback');
    fb.innerHTML = '';
    if (result) {
        const div = document.createElement('div');
        if (result.correct) {
            div.className = 'fb';
            div.textContent = '✓ Correct. ' + q.why;
        } else {
            div.className = 'fb fb-wrong';
            const chosen = result.chosen.slice().sort().join(', ');
            div.textContent = '✗ Not correct. You selected ' + chosen + '. The correct set is ' +
                q.answer.join(', ') + '. ' + q.why;
        }
        fb.appendChild(div);
        const edgesDiv = document.createElement('div');
        edgesDiv.className = 'fb-edges';
        edgesDiv.textContent = 'Edges followed (thick in the graph): ' +
            q.followed.map(f => f[0] + ' cites ' + f[1]).join('; ') + '.';
        fb.appendChild(edgesDiv);
        if (done) {
            const n = countCorrect();
            const fin = document.createElement('div');
            fin.className = 'fb-final';
            fin.textContent = n + ' of 5 correct. ' + (n >= MASTERY
                ? 'The mastery threshold of 4 was met.'
                : 'The mastery threshold of 4 was not met.');
            fb.appendChild(fin);
            const notice = document.createElement('div');
            notice.className = 'fb-notice';
            notice.textContent = 'Compare the years of the papers that forward chaining reached with those that backward chaining reached.';
            fb.appendChild(notice);
        }
    }

    // Controls
    el('submit-btn').style.display = result ? 'none' : '';
    el('submit-btn').disabled = selected.length === 0;
    el('next-btn').style.display = (result && !done) ? '' : 'none';
    el('score').textContent = 'Score: ' + countCorrect() + ' of 5 correct';

    refreshGraph();
}

function toggleChoice(id, on, label) {
    if (results[qIndex]) return;   // no change after submit
    const i = selected.indexOf(id);
    if (on && i < 0) selected.push(id);
    if (!on && i >= 0) selected.splice(i, 1);
    label.classList.toggle('selected', on);
    el('submit-btn').disabled = selected.length === 0;
    refreshGraph();
}

function countCorrect() {
    return results.filter(r => r && r.correct).length;
}

function submit() {
    if (qIndex >= QUESTIONS.length) return;
    if (results[qIndex] || selected.length === 0) return;   // one attempt per question
    const q = QUESTIONS[qIndex];
    results[qIndex] = { chosen: selected.slice(), correct: sameSet(selected, q.answer) };
    selected = [];
    if (qIndex === QUESTIONS.length - 1) qIndex = QUESTIONS.length;   // finished
    render();
    if (el('next-btn').style.display !== 'none') el('next-btn').focus();
}

function nextQuestion() {
    if (qIndex >= QUESTIONS.length || !results[qIndex]) return;
    qIndex++;
    selected = [];
    render();
    const first = document.querySelector('#choice-row input');
    if (first) first.focus();
}

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    el('main-question').textContent = MAIN_QUESTION;
    initializeNetwork();
    document.querySelectorAll('.node-btn').forEach(b => {
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => openPaper(b.dataset.node));
    });
    el('submit-btn').addEventListener('click', submit);
    el('next-btn').addEventListener('click', nextQuestion);
    render();
});

// ===========================================
// xAPI (docs/js/lrs-sim.js). Without the runtime the sim runs unchanged.
// ===========================================
(function () {
    if (!window.LRSSim) return;
    const CONCEPT = LRS.conceptId(209);   // Citation Chaining
    const lrs = LRSSim.create({ name: 'Citation Chaining Explorer', concept: CONCEPT, mount: '#xapi-slot',
                                source: 'the Citation Chaining Explorer MicroSim', pageDwell: true });
    // Question keys name what is asked, not the position (questions are in a fixed order).
    const QKEYS = ['q-backward-one-step', 'q-forward-one-step', 'q-shared-reference',
                   'q-forward-two-steps', 'q-cites-seed-and-c'];
    const papers = {};
    function paperItem(id) {
        return papers[id] || (papers[id] = lrs.item('paper-' + LRS.slug(id),
            { name: 'Paper ' + id, concept: CONCEPT }));
    }
    let shownAt = Date.now();
    const origOpen = openPaper;
    openPaper = function (id) {
        const changed = id !== openPaperId;
        origOpen(id);
        if (changed) paperItem(id).study('click');
    };
    const origSubmit = submit;
    submit = function () {
        const i = qIndex, chosen = selected.slice();
        const had = !!results[i];
        origSubmit();
        if (!had && results[i] && i < QKEYS.length) {
            const r = results[i];
            lrs.question(QKEYS[i], { name: QUESTIONS[i].text, concept: CONCEPT }).answer({
                success: r.correct, response: chosen.slice().sort().join(','),
                durationMs: Date.now() - shownAt
            });
        }
    };
    const origNext = nextQuestion;
    nextQuestion = function () { origNext(); shownAt = Date.now(); };
})();
