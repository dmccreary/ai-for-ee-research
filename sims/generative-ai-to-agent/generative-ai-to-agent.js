// From Generative AI to Agent
// vis-network graph-model MicroSim (Bloom: Understand, verb: explain)
// Four terms in a chain joined by three links; the learner explains what
// each link adds by choosing one of four options per link.
// CANVAS_HEIGHT: 760
// The iframe height is CANVAS_HEIGHT + 2 = 762 (tested at 400, 560, 859, 860 and 1000 px wide).

// ===========================================
// CONTENT (verbatim from the chapter specification)
// ===========================================

const NODES = [
    { id: 1, name: 'Generative AI', label: 'Generative\nAI',
      definition: 'Models that learn the structure of data and produce new content of the same kind (text, code, or images)' },
    { id: 2, name: 'Large Language Model', label: 'Large\nLanguage\nModel',
      definition: 'A generative model trained on very large text and code collections to predict the next token' },
    { id: 3, name: 'AI Assistant', label: 'AI\nAssistant',
      definition: 'An application that puts a language model behind a conversational interface, where you drive and each reply is one turn' },
    { id: 4, name: 'AI Agent', label: 'AI\nAgent',
      definition: 'A system that uses a language model to choose actions, calls tools, observes the results, and repeats toward a goal' }
];

// Each link: one correct option and three distractors, each distractor with its feedback sentence.
const LINKS = [
    {
        from: 1, to: 2,
        correct: 'Specializes in language: it is trained to predict the next token of text and code',
        distractors: [
            { text: 'Adds a chat window',
              feedback: 'A chat window belongs to an assistant, which comes next in the chain' },
            { text: 'Adds tools it can call',
              feedback: 'Tools belong to agents, which come last in the chain' },
            { text: 'Adds a loop that repeats until a goal is met',
              feedback: 'A repeating loop is what turns an assistant into an agent' }
        ]
    },
    {
        from: 2, to: 3,
        correct: 'Adds a conversational interface with instructions, history, and turn-by-turn replies',
        distractors: [
            { text: 'Adds permission to run code on your computer',
              feedback: 'Running code is a tool, which defines agents' },
            { text: 'Adds more training data',
              feedback: 'Training data shapes the model itself, not the application wrapped around it' },
            { text: 'Adds the ability to schedule itself without being asked',
              feedback: 'Acting without being asked is a feature of always-on agents, not of assistants' }
        ]
    },
    {
        from: 3, to: 4,
        correct: 'Adds tools and a loop: it acts, observes the result, and chooses the next step',
        distractors: [
            { text: 'Adds a larger vocabulary',
              feedback: 'Vocabulary is a property of the underlying model, which is the same in both' },
            { text: 'Adds a different training objective',
              feedback: 'Both use the same kind of model; the difference is in how it is used' },
            { text: 'Adds a friendlier tone',
              feedback: 'Tone is a style setting; it has nothing to do with taking actions' }
        ]
    }
];

const QUESTION = 'What does the second term add to the first?';

// ===========================================
// COLORS (Okabe-Ito color-blind-safe palette; never red/green)
// ===========================================
const colors = {
    node:       { background: '#eef6fc', border: '#0072b2', font: '#1a1a1a' },
    nodeOpen:   { background: '#0072b2', border: '#003f73', font: '#ffffff' },
    edgeOpen:   '#8a8a8a',   // not answered, not current (dashed)
    edgeCurrent:'#0072b2',   // the link being answered (thick)
    edgeCorrect:'#0072b2',   // answered correctly (check glyph)
    edgeWrong:  '#d55e00'    // answered incorrectly (X glyph, dashed)
};

// ===========================================
// STATE
// ===========================================
let nodes, edges, network;
let openNodeId = null;
let currentLink = 0;        // index of the link being answered (0..2), 3 when finished
let results = [];           // per link: null | { chosenIndex, correct }
let shuffled = [];          // per link: array of { text, isCorrect, feedback }
let selectedIndex = null;   // index into shuffled[currentLink] before commit

// ===========================================
// UTILITIES
// ===========================================
function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function nodeName(id) {
    return NODES.find(n => n.id === id).name;
}

function el(id) {
    return document.getElementById(id);
}

function buildShuffledOptions() {
    shuffled = LINKS.map(link => shuffle([
        { text: link.correct, isCorrect: true, feedback: null },
        ...link.distractors.map(d => ({ text: d.text, isCorrect: false, feedback: d.feedback }))
    ]));
}

// ===========================================
// NETWORK
// ===========================================
function nodeStyle(id) {
    const c = (id === openNodeId) ? colors.nodeOpen : colors.node;
    const link = LINKS[currentLink];
    const onCurrentLink = link && (link.from === id || link.to === id);
    return {
        id: id,
        color: {
            background: c.background,
            border: c.border,
            highlight: { background: c.background, border: c.border },
            hover: { background: c.background, border: c.border }
        },
        borderWidth: onCurrentLink ? 4 : 2,
        font: { color: c.font }
    };
}

function edgeStyle(i) {
    const r = results[i];
    const n = i + 1;
    if (r) {
        const ok = r.correct;
        return {
            id: i,
            label: ok ? `${n} ✓` : `${n} ✗`,
            title: ok ? `Link ${n}: answered correctly` : `Link ${n}: answered incorrectly`,
            color: { color: ok ? colors.edgeCorrect : colors.edgeWrong },
            width: 4,
            dashes: ok ? false : [8, 5],
            font: { color: ok ? '#003f73' : '#8a3c00', bold: true }
        };
    }
    if (i === currentLink) {
        return {
            id: i,
            label: `${n} ?`,
            title: `Link ${n}: current link`,
            color: { color: colors.edgeCurrent },
            width: 5,
            dashes: false,
            font: { color: '#003f73' }
        };
    }
    return {
        id: i,
        label: `${n}`,
        title: `Link ${n}: locked until link ${n - 1} is answered`,
        color: { color: colors.edgeOpen },
        width: 2,
        dashes: [5, 5],
        font: { color: '#555555' }
    };
}

function refreshGraph() {
    if (!nodes) return;
    nodes.update(NODES.map(n => nodeStyle(n.id)));
    edges.update(LINKS.map((_, i) => edgeStyle(i)));
}

// Fit the row of nodes to the graph width, tighter than network.fit(),
// and keep it above the navigation buttons in the bottom 88 px.
function fitGraph() {
    if (!network) return;
    const box = el('network');
    const W = box.clientWidth, H = box.clientHeight;
    if (W === 0 || H === 0) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    NODES.forEach(n => {
        const b = network.getBoundingBox(n.id);
        minX = Math.min(minX, b.left);  maxX = Math.max(maxX, b.right);
        minY = Math.min(minY, b.top);   maxY = Math.max(maxY, b.bottom);
    });
    minY -= 34;                       // room for the link labels above the curves
    maxY += 6;
    const navReserve = 88;
    const availH = Math.max(H - navReserve, 40);
    const scale = Math.min((W - 14) / (maxX - minX), (availH - 8) / (maxY - minY), 1.25);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2 + (H / 2 - availH / 2) / scale;
    network.moveTo({ position: { x: cx, y: cy }, scale: scale, animation: false });
}

function initializeNetwork() {
    // Four nodes in a row. Small alternating y-offsets give the edge labels
    // enough angle to render reliably (vis-network horizontal-label bug).
    const xs = [-318, -106, 106, 318];
    const ys = [0, 10, 0, 10];
    nodes = new vis.DataSet(NODES.map((n, i) => Object.assign({
        label: n.label, x: xs[i], y: ys[i]
    }, nodeStyle(n.id))));
    edges = new vis.DataSet(LINKS.map((l, i) => Object.assign({
        from: l.from, to: l.to
    }, edgeStyle(i))));

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: false,
            zoomView: false,          // never capture mouse-wheel scroll
            dragView: false,          // no drag-to-pan inside the textbook page
            dragNodes: false,
            navigationButtons: true,
            hover: true,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'box',
            margin: 6,
            widthConstraint: { minimum: 128 },
            font: { size: 26, face: 'Arial', multi: false },
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 },
            chosen: false
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1.1 } },
            smooth: { type: 'curvedCW', roundness: 0.12 },
            font: { size: 24, face: 'Arial', align: 'top', strokeWidth: 5, strokeColor: '#ffffff' },
            chosen: false
        }
    };

    network = new vis.Network(el('network'), { nodes, edges }, options);

    network.once('afterDrawing', fitGraph);

    network.on('click', params => {
        if (params.nodes.length > 0) {
            openNode(params.nodes[0]);
        }
    });

    network.on('hoverNode', () => { el('network').style.cursor = 'pointer'; });
    network.on('blurNode', () => { el('network').style.cursor = 'default'; });

    // Keep the chain fitted when the iframe width changes.
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
function openNode(id) {
    openNodeId = id;
    const n = NODES.find(x => x.id === id);
    el('definition').innerHTML = '';
    const strong = document.createElement('strong');
    strong.textContent = n.name + ': ';
    el('definition').appendChild(strong);
    el('definition').appendChild(document.createTextNode(n.definition + '.'));
    document.querySelectorAll('.node-btn').forEach(b => {
        b.setAttribute('aria-pressed', String(Number(b.dataset.node) === id));
    });
    refreshGraph();
}

// ===========================================
// EXERCISE
// ===========================================
function renderLink() {
    const done = currentLink >= LINKS.length;
    const idx = done ? LINKS.length - 1 : currentLink;
    const link = LINKS[idx];
    const result = results[idx];

    el('link-step').textContent = `Link ${idx + 1} of ${LINKS.length}:`;
    el('link-nodes').textContent = `${nodeName(link.from)} → ${nodeName(link.to)}`;
    el('link-question').textContent = QUESTION;

    // Options
    const box = el('options');
    box.innerHTML = '';
    shuffled[idx].forEach((opt, i) => {
        const label = document.createElement('label');
        label.className = 'option';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'link-option';
        input.value = String(i);
        const span = document.createElement('span');
        span.textContent = opt.text;
        label.appendChild(input);
        label.appendChild(span);

        if (result) {
            // Committed: lock and mark with glyph + text (not color alone)
            input.disabled = true;
            input.checked = (i === result.chosenIndex);
            label.classList.add('locked');
            if (opt.isCorrect) {
                label.classList.add('is-correct');
                addTag(span, '✓ Correct option', 'tag-correct');
            } else if (i === result.chosenIndex) {
                label.classList.add('is-wrong');
                addTag(span, '✗ Your choice', 'tag-wrong');
            }
        } else {
            input.checked = (i === selectedIndex);
            if (i === selectedIndex) label.classList.add('selected');
            input.addEventListener('change', () => selectOption(i));
            input.addEventListener('keydown', e => {
                if (e.key === 'Enter' && selectedIndex !== null) {
                    e.preventDefault();
                    commit();
                }
            });
        }
        box.appendChild(label);
    });

    // Feedback
    const fb = el('feedback');
    fb.innerHTML = '';
    if (result) {
        const correctOpt = LINKS[idx].correct;
        const div = document.createElement('div');
        if (result.correct) {
            div.className = 'fb';
            div.textContent = `✓ Correct. ${correctOpt}.`;
        } else {
            div.className = 'fb fb-wrong';
            const chosen = shuffled[idx][result.chosenIndex];
            div.textContent = `✗ ${chosen.feedback}. Correct option: ${correctOpt}.`;
        }
        fb.appendChild(div);
        if (done) {
            const n = countCorrect();
            const fin = document.createElement('div');
            fin.className = 'fb-final';
            fin.textContent = (n === LINKS.length)
                ? `Final score: ${n} of 3 correct. Mastery: you explained what all three links add.`
                : `Final score: ${n} of 3 correct. Mastery needs 3 of 3; press Restart to try again.`;
            fb.appendChild(fin);
        }
    }

    // Controls
    el('commit-btn').style.display = result ? 'none' : '';
    el('commit-btn').disabled = (selectedIndex === null);
    el('next-btn').style.display = (result && !done) ? '' : 'none';
    el('score').textContent = `Score: ${countCorrect()} of 3 correct`;

    refreshGraph();
}

function addTag(span, text, cls) {
    const tag = document.createElement('span');
    tag.className = 'tag ' + cls;
    tag.textContent = '(' + text + ')';
    span.appendChild(document.createTextNode(' '));
    span.appendChild(tag);
}

function selectOption(i) {
    if (results[currentLink]) return;   // no change after commit
    selectedIndex = i;
    document.querySelectorAll('#options .option').forEach((lab, k) => {
        lab.classList.toggle('selected', k === i);
    });
    el('commit-btn').disabled = false;
}

function countCorrect() {
    return results.filter(r => r && r.correct).length;
}

function commit() {
    if (currentLink >= LINKS.length) return;
    if (results[currentLink] || selectedIndex === null) return;   // one commit per link
    const opt = shuffled[currentLink][selectedIndex];
    results[currentLink] = { chosenIndex: selectedIndex, correct: opt.isCorrect };
    selectedIndex = null;
    if (currentLink === LINKS.length - 1) {
        currentLink = LINKS.length;   // finished
    }
    renderLink();
    // Move keyboard focus to the next useful control
    const next = el('next-btn');
    (next.style.display === 'none' ? el('restart-btn') : next).focus();
}

function nextLink() {
    // A link can only be answered after the previous one has been answered.
    if (!results[currentLink]) return;
    currentLink++;
    selectedIndex = null;
    renderLink();
    const first = document.querySelector('#options input');
    if (first) first.focus();
}

function restart() {
    currentLink = 0;
    results = LINKS.map(() => null);
    selectedIndex = null;
    buildShuffledOptions();   // reshuffle option order on every run
    renderLink();
}

// ===========================================
// STARTUP
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    results = LINKS.map(() => null);
    buildShuffledOptions();
    initializeNetwork();
    renderLink();

    el('commit-btn').addEventListener('click', commit);
    el('next-btn').addEventListener('click', nextLink);
    el('restart-btn').addEventListener('click', restart);
    document.querySelectorAll('.node-btn').forEach(b => {
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => openNode(Number(b.dataset.node)));
    });
});

// ===========================================
// xAPI (docs/js/lrs-sim.js). Without the runtime the sim runs unchanged.
// ===========================================
(function () {
    if (!window.LRSSim) return;
    // Node ids 1..4 are the book's concepts 9..12 (Generative AI, LLM, AI Assistant, AI Agent).
    const NODE_KEY = { 1: 'generative-ai', 2: 'large-language-model', 3: 'ai-assistant', 4: 'ai-agent' };
    const NODE_CONCEPT = { 1: 9, 2: 10, 3: 11, 4: 12 };
    const lrs = LRSSim.create({ name: 'From Generative AI to Agent', concept: LRS.conceptId(12),
                                mount: '#xapi-slot', source: 'the From Generative AI to Agent MicroSim',
                                pageDwell: true });
    const nodeItems = {}, attempts = {};
    function nodeItem(id) {
        return nodeItems[id] || (nodeItems[id] = lrs.item('node-' + NODE_KEY[id],
            { name: NODES.find(n => n.id === id).name, concept: LRS.conceptId(NODE_CONCEPT[id]) }));
    }
    let shownAt = Date.now();

    const origOpen = openNode;
    openNode = function (id) {
        const changed = id !== openNodeId;
        origOpen(id);
        if (changed) nodeItem(id).study('click');
    };

    // Each link asks what its second term adds to the first: it tests the second term's concept.
    const origCommit = commit;
    commit = function () {
        const i = currentLink, had = !!results[i];
        const chosen = (i < LINKS.length && selectedIndex !== null) ? shuffled[i][selectedIndex] : null;
        origCommit();
        if (!had && chosen && results[i]) {
            const to = LINKS[i].to, key = 'q-link-' + NODE_KEY[to];
            attempts[key] = (attempts[key] || 0) + 1;
            lrs.question(key, { name: NODES.find(n => n.id === LINKS[i].from).name + ' to ' +
                                      NODES.find(n => n.id === to).name,
                                concept: LRS.conceptId(NODE_CONCEPT[to]) })
               .answer({ success: results[i].correct, response: LRS.slug(chosen.text).slice(0, 80),
                         durationMs: Date.now() - shownAt, extensions: { 'attempt-number': attempts[key] } });
        }
    };
    const origNext = nextLink;
    nextLink = function () { origNext(); shownAt = Date.now(); };
    const origRestart = restart;
    restart = function () { origRestart(); shownAt = Date.now(); };
})();
