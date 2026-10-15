// Task Dependency Critical Path Scheduler
// vis-network graph-model MicroSim (Bloom: Apply, verb: calculate)
// Nine tasks with durations and prerequisites; the learner calculates earliest
// finish, the critical path, slack, the project duration, and the new duration
// after T3 is shortened. Five questions, one attempt each, fixed order.
// CANVAS_HEIGHT: 760
// The iframe height is CANVAS_HEIGHT + 2 = 762.

// ===========================================
// CONTENT (verbatim from the chapter specification, Table 1)
// Durations are whole hours and are illustrative.
// ===========================================
const TASKS = [
    { id: 'T1', name: 'Literature survey',           duration: 3, needs: [] },
    { id: 'T2', name: 'Measurement procedure draft', duration: 2, needs: ['T1'] },
    { id: 'T3', name: 'ENOB script',                 duration: 3, needs: ['T2'] },
    { id: 'T4', name: 'Test suite',                  duration: 2, needs: ['T2'] },
    { id: 'T5', name: 'Simulation run',              duration: 4, needs: ['T3', 'T4'] },
    { id: 'T6', name: 'Analysis',                    duration: 2, needs: ['T5'] },
    { id: 'T7', name: 'Figures',                     duration: 1, needs: ['T6'] },
    { id: 'T8', name: 'Report draft',                duration: 3, needs: ['T6'] },
    { id: 'T9', name: 'Final assembly',              duration: 1, needs: ['T7', 'T8'] }
];

const QUESTIONS = [
    { kind: 'number',
      text: 'What is the earliest finish time of T5, in hours?',
      answer: 12, answerText: '12 hours',
      why: 'T3 finishes at 8 and T4 at 7. T5 starts at the later, 8, and runs 4 hours.',
      highlight: ['T3', 'T4', 'T5'] },
    { kind: 'tasks',
      text: 'Which tasks form the critical path?',
      answer: ['T1', 'T2', 'T3', 'T5', 'T6', 'T8', 'T9'], answerText: 'T1, T2, T3, T5, T6, T8, T9',
      why: 'The longest chain is 3 + 2 + 3 + 4 + 2 + 3 + 1 = 18 hours.',
      highlight: ['T1', 'T2', 'T3', 'T5', 'T6', 'T8', 'T9'] },
    { kind: 'number',
      text: 'What is the slack of T4, in hours?',
      answer: 1, answerText: '1 hour',
      why: 'T4 could finish at 8 without delaying T5, which starts at 8. T4 finishes at 7, so its slack is 1 hour.',
      highlight: ['T4', 'T5'] },
    { kind: 'number',
      text: 'What is the project duration, in hours?',
      answer: 18, answerText: '18 hours',
      why: 'T9 starts when T8 finishes at 17, and takes 1 hour.',
      highlight: ['T8', 'T9'] },
    { kind: 'number',
      text: 'If T3 is reduced from 3 hours to 1 hour, what is the new project duration, in hours?',
      answer: 17, answerText: '17 hours',
      why: 'T3 then finishes at 6, but T4 finishes at 7, so T5 starts at 7 and the project ends at 17.',
      highlight: ['T3', 'T4', 'T5'] }
];

const START_QUESTION = 'When can T5 finish?';
const RULE_LINE = 'Earliest start = the latest earliest finish of a task’s prerequisites, or 0 if none.';
const MASTERY = 4;          // at least 4 of 5 correct on the first attempt
const T3_REDUCED = 1;       // question 5: T3 reduced from 3 hours to 1 hour

// ===========================================
// SCHEDULING RULES (pure functions, testable in node)
// Earliest start = max earliest finish of prerequisites, or 0 if none.
// Earliest finish = earliest start + duration.
// Project duration = max earliest finish over all tasks.
// Latest finish = the latest a task can finish without delaying the project
// (min latest start of its successors, or the project duration if none).
// Slack = latest finish - earliest finish. Critical when slack is 0.
// ===========================================
function computeSchedule(tasks, durationOverrides) {
    const over = durationOverrides || {};
    const dur = {};
    tasks.forEach(t => { dur[t.id] = (over[t.id] !== undefined) ? over[t.id] : t.duration; });

    // Forward pass (tasks are listed in dependency order)
    const es = {}, ef = {};
    tasks.forEach(t => {
        es[t.id] = t.needs.length ? Math.max(...t.needs.map(p => ef[p])) : 0;
        ef[t.id] = es[t.id] + dur[t.id];
    });
    const projectDuration = Math.max(...tasks.map(t => ef[t.id]));

    // Backward pass
    const lf = {};
    for (let i = tasks.length - 1; i >= 0; i--) {
        const t = tasks[i];
        const succ = tasks.filter(s => s.needs.includes(t.id));
        lf[t.id] = succ.length ? Math.min(...succ.map(s => lf[s.id] - dur[s.id])) : projectDuration;
    }
    const slack = {};
    tasks.forEach(t => { slack[t.id] = lf[t.id] - ef[t.id]; });
    const critical = tasks.filter(t => slack[t.id] === 0).map(t => t.id);
    return { dur, es, ef, lf, slack, critical, projectDuration };
}

function parseHours(str) {
    const s = String(str).trim();
    if (!/^-?\d+(\.\d+)?$/.test(s)) return null;
    return Number(s);
}

function sameSet(a, b) {
    if (a.length !== b.length) return false;
    const sb = new Set(b);
    return a.every(x => sb.has(x));
}

// Allow node-based testing of the pure logic
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TASKS, QUESTIONS, computeSchedule, parseHours, sameSet };
}

// ===========================================
// BROWSER PART
// ===========================================
if (typeof document !== 'undefined') {

// Okabe-Ito color-blind-safe colors; every color cue has a text or shape cue too
const colors = {
    nodeBg: '#ffffff', nodeBorder: '#5b7a99',
    pickBg: '#cfe6f7', pickBorder: '#0072b2',
    critBg: '#fdebd3', critBorder: '#d55e00',
    hiBorder: '#0072b2',
    edge: '#7a7a7a', edgeCrit: '#d55e00'
};

// Top-to-bottom layout. Pairs sit side by side; single tasks are offset a
// few units so no labeled edge is perfectly straight (vis-network label bug).
const POS = {
    T1: { x: 0,    y: 0 },
    T2: { x: 6,    y: 105 },
    T3: { x: -128, y: 210 },
    T4: { x: 128,  y: 216 },
    T5: { x: 0,    y: 320 },
    T6: { x: 6,    y: 425 },
    T7: { x: -128, y: 530 },
    T8: { x: 128,  y: 536 },
    T9: { x: 0,    y: 640 }
};

const EDGES = [];
TASKS.forEach(t => t.needs.forEach(p => EDGES.push({ id: p + '-' + t.id, from: p, to: t.id })));

// ---------- state ----------
let qIndex = 0;              // current question (0..4)
let answered = 0;            // questions submitted so far
let results = [];            // per question: { correct }
let picks = new Set();       // question 2 selection
let t3Explore = T3_REDUCED;  // T3 duration after question 5
let nodes, edges, network;

function el(id) { return document.getElementById(id); }
function task(id) { return TASKS.find(t => t.id === id); }

// What the graph shows depends on how many questions have been answered
function view() {
    const overrides = (answered >= 5) ? { T3: t3Explore } : {};
    const sched = computeSchedule(TASKS, overrides);
    let timesFor = new Set();
    if (answered >= 2) TASKS.forEach(t => timesFor.add(t.id));
    else if (answered >= 1) ['T1', 'T2', 'T3', 'T4', 'T5'].forEach(id => timesFor.add(id));  // forward pass to T5
    const showCritical = answered >= 2;
    const showSlack = answered >= 3;
    const q = QUESTIONS[Math.min(qIndex, QUESTIONS.length - 1)];
    const highlight = new Set(results[qIndex] ? q.highlight : []);
    return { sched, timesFor, showCritical, showSlack, highlight };
}

function nodeLabel(t, v) {
    const s = v.sched;
    const d = s.dur[t.id];
    const hi = v.highlight.has(t.id) ? '▶ ' : '';
    const picked = (qIndex === 1 && !results[1] && picks.has(t.id)) ? '✓ ' : '';
    let line1 = `<b>${hi}${picked}${t.id} ${t.name}</b>`;
    let line2 = (d === t.duration) ? `${d} h` : `${d} h (was ${t.duration} h)`;
    if (v.timesFor.has(t.id)) line2 += ` · start ${s.es[t.id]} · finish ${s.ef[t.id]}`;
    const lines = [line1, line2];
    const isCrit = s.slack[t.id] === 0;
    if (v.showCritical && isCrit) {
        lines.push(v.showSlack ? '<b>★ critical</b> · slack 0' : '<b>★ critical</b>');
    } else if (v.showSlack) {
        lines.push(`slack ${s.slack[t.id]}`);
    }
    return lines.join('\n');
}

function nodeStyle(t, v) {
    const isCrit = v.showCritical && v.sched.slack[t.id] === 0;
    const isPicked = qIndex === 1 && !results[1] && picks.has(t.id);
    const isHi = v.highlight.has(t.id);
    let bg = colors.nodeBg, border = colors.nodeBorder, width = 2;
    if (isPicked) { bg = colors.pickBg; border = colors.pickBorder; width = 3; }
    if (isCrit)   { bg = colors.critBg; border = colors.critBorder; width = 4; }
    if (isHi)     { border = colors.hiBorder; width = 5; }
    return {
        id: t.id,
        label: nodeLabel(t, v),
        color: {
            background: bg, border: border,
            highlight: { background: bg, border: border },
            hover: { background: bg, border: border }
        },
        borderWidth: width,
        shapeProperties: { borderDashes: isHi ? [7, 4] : false }
    };
}

function edgeStyle(e, v) {
    const s = v.sched;
    // An arrow is critical when both ends are critical and the handoff is immediate
    const crit = v.showCritical && s.slack[e.from] === 0 && s.slack[e.to] === 0 &&
                 s.ef[e.from] === s.es[e.to];
    return {
        id: e.id,
        label: 'needed by',
        title: `${e.to} needs the output of ${e.from}`,
        color: { color: crit ? colors.edgeCrit : colors.edge },
        width: crit ? 5 : (v.showCritical ? 1.5 : 2),
        dashes: (v.showCritical && !crit) ? [6, 4] : false
    };
}

function refreshGraph() {
    if (!nodes) return;
    const v = view();
    nodes.update(TASKS.map(t => nodeStyle(t, v)));
    edges.update(EDGES.map(e => edgeStyle(e, v)));
    el('legend-times').hidden = v.timesFor.size === 0;
    el('legend-critical').hidden = !v.showCritical;
    el('legend-hi').hidden = v.highlight.size === 0;
}

// Fit the graph to the box, leaving room for the navigation buttons at the bottom
function fitGraph() {
    if (!network) return;
    const box = el('network');
    const W = box.clientWidth, H = box.clientHeight;
    if (W === 0 || H === 0) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    TASKS.forEach(t => {
        const b = network.getBoundingBox(t.id);
        minX = Math.min(minX, b.left);  maxX = Math.max(maxX, b.right);
        minY = Math.min(minY, b.top);   maxY = Math.max(maxY, b.bottom);
    });
    minY -= 6; maxY += 6;
    const navReserve = 44;
    const availH = Math.max(H - navReserve, 40);
    const scale = Math.min((W - 12) / (maxX - minX), (availH - 6) / (maxY - minY), 1.15);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2 + (H / 2 - availH / 2) / scale;
    network.moveTo({ position: { x: cx, y: cy }, scale: scale, animation: false });
}

function initializeNetwork() {
    const v = view();
    nodes = new vis.DataSet(TASKS.map(t => Object.assign({ x: POS[t.id].x, y: POS[t.id].y }, nodeStyle(t, v))));
    edges = new vis.DataSet(EDGES.map(e => Object.assign({ from: e.from, to: e.to }, edgeStyle(e, v))));

    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            zoomView: false,          // never capture mouse-wheel scroll
            dragView: false,          // no drag-to-pan inside the textbook page
            dragNodes: true,          // exploration: learners may drag tasks
            navigationButtons: true,
            hover: true,
            selectConnectedEdges: false,
            keyboard: { enabled: false }
        },
        nodes: {
            shape: 'box',
            margin: { top: 6, bottom: 6, left: 8, right: 8 },
            font: { size: 17, face: 'Arial', color: '#1a1a1a', multi: 'html', bold: { size: 17 } },
            chosen: false
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.9 } },
            smooth: false,
            font: { size: 13, face: 'Arial', color: '#555555', strokeWidth: 4, strokeColor: '#ffffff', align: 'horizontal' },
            chosen: false
        }
    };

    network = new vis.Network(el('network'), { nodes, edges }, options);
    network.once('afterDrawing', fitGraph);

    network.on('click', params => {
        if (params.nodes.length > 0) showDetail(params.nodes[0]);
    });
    network.on('hoverNode', () => { el('network').style.cursor = 'pointer'; });
    network.on('blurNode', () => { el('network').style.cursor = 'default'; });

    if (window.ResizeObserver) {
        new ResizeObserver(() => { network.redraw(); fitGraph(); }).observe(el('network'));
    } else {
        window.addEventListener('resize', fitGraph);
    }
}

// ---------- exploration: task details (not scored) ----------
let detailId = null;

function showDetail(id) {
    detailId = id || null;
    el('detail-select').value = id || '';
    if (!id) return;
    const t = task(id);
    const v = view();
    const s = v.sched;
    const d = s.dur[id];
    let txt = `${t.id} ${t.name}: ${d} ${d === 1 ? 'hour' : 'hours'} (illustrative). `;
    txt += t.needs.length ? `Needs ${t.needs.join(' and ')}.` : 'Needs no other task.';
    if (v.timesFor.has(id)) txt += ` Earliest start ${s.es[id]} h, earliest finish ${s.ef[id]} h.`;
    if (v.showSlack) txt += ` Slack ${s.slack[id]} h${s.slack[id] === 0 ? ', on the critical path' : ''}.`;
    else if (v.showCritical && s.slack[id] === 0) txt += ' On the critical path.';
    el('detail').textContent = txt;
}

// ---------- questions ----------
function renderQuestion() {
    const q = QUESTIONS[qIndex];
    const r = results[qIndex];
    const finished = answered >= QUESTIONS.length;

    el('q-step').textContent = `Question ${qIndex + 1} of ${QUESTIONS.length}`;
    el('q-text').textContent = q.text;
    el('main-question').textContent = answered === 0 ? START_QUESTION : RULE_LINE;

    // input area
    el('number-row').hidden = q.kind !== 'number';
    el('task-picks').hidden = q.kind !== 'tasks';
    const input = el('answer-input');
    input.disabled = !!r;
    document.querySelectorAll('.pick-btn').forEach(b => {
        b.disabled = !!r;
        b.setAttribute('aria-pressed', String(picks.has(b.dataset.task)));
    });
    el('t3-row').hidden = !(qIndex === 4 && r);

    // buttons
    el('submit-btn').hidden = !!r;
    el('next-btn').hidden = !r || finished;

    // feedback
    const fb = el('feedback');
    fb.innerHTML = '';
    if (r) {
        addFb(fb, r.correct ? `✓ Correct. ${q.why}` : `✗ Incorrect. The answer is ${q.answerText}. ${q.why}`,
              r.correct ? 'fb' : 'fb fb-wrong');
        if (finished) {
            const n = countCorrect();
            const met = n >= MASTERY;
            addFb(fb, `${n} of 5 correct. ` + (met
                ? `✓ Mastery threshold of ${MASTERY} met.`
                : `✗ Mastery threshold of ${MASTERY} not met. Press Restart to try again.`), 'fb fb-final fb-note');
            addFb(fb, 'Notice: cutting 2 hours from T3, a critical task, saved only 1 hour (18 to 17), ' +
                      'because the path through T4 became critical. Move the T3 slider to explore.', 'fb fb-note');
        }
    }
    el('score').textContent = `Score: ${countCorrect()} of 5 correct` + (finished ? '' : ` (answered ${answered} of 5)`);
    updateT3Line();
    refreshGraph();
    if (detailId) showDetail(detailId);
}

function addFb(box, text, cls) {
    const div = document.createElement('div');
    div.className = cls;
    div.textContent = text;
    box.appendChild(div);
}

function showHint(text) {
    const fb = el('feedback');
    fb.innerHTML = '';
    addFb(fb, text, 'fb fb-note');
}

function countCorrect() {
    return results.filter(r => r && r.correct).length;
}

function submit() {
    if (qIndex >= QUESTIONS.length || results[qIndex]) return;   // one attempt per question
    const q = QUESTIONS[qIndex];
    let correct;
    if (q.kind === 'number') {
        const val = parseHours(el('answer-input').value);
        if (val === null) {   // not an attempt: ask for a number
            showHint('Enter a number of hours, for example 5, then press Submit.');
            el('answer-input').focus();
            return;
        }
        correct = val === q.answer;
    } else {
        if (picks.size === 0) {
            showHint('Select the tasks on the critical path with the T1 to T9 buttons, then press Submit.');
            return;
        }
        correct = sameSet([...picks], q.answer);
    }
    results[qIndex] = { correct };
    answered = qIndex + 1;
    if (qIndex === 4) t3Explore = T3_REDUCED;   // show the schedule with T3 = 1 hour
    renderQuestion();
    const next = el('next-btn');
    (next.hidden ? el('restart-btn') : next).focus();
}

function nextQuestion() {
    if (!results[qIndex] || qIndex >= QUESTIONS.length - 1) return;
    qIndex++;
    el('answer-input').value = '';
    renderQuestion();
    const q = QUESTIONS[qIndex];
    if (q.kind === 'number') el('answer-input').focus();
    else document.querySelector('.pick-btn').focus();
}

function restart() {
    qIndex = 0;
    answered = 0;
    results = QUESTIONS.map(() => null);
    picks = new Set();
    t3Explore = T3_REDUCED;
    el('t3-slider').value = String(T3_REDUCED);
    el('answer-input').value = '';
    detailId = null;
    el('detail-select').value = '';
    el('detail').textContent = 'Click a task in the graph, or choose one above, to read its details.';
    renderQuestion();
    if (nodes) {
        nodes.update(TASKS.map(t => ({ id: t.id, x: POS[t.id].x, y: POS[t.id].y })));
        fitGraph();
    }
}

function updateT3Line() {
    if (!(qIndex === 4 && results[4])) return;
    const s = computeSchedule(TASKS, { T3: t3Explore });
    el('t3-value').textContent = `${t3Explore} h`;
    let line = el('t3-result');
    if (!line) {
        line = document.createElement('div');
        line.id = 't3-result';
        line.className = 'fb fb-note';
        line.setAttribute('aria-live', 'polite');
    }
    line.textContent = `With T3 = ${t3Explore} h: project duration ${s.projectDuration} h. ` +
                       `Critical path: ${s.critical.join(', ')}.`;
    el('feedback').appendChild(line);
}

// ---------- startup ----------
document.addEventListener('DOMContentLoaded', function () {
    results = QUESTIONS.map(() => null);

    // T1..T9 toggle buttons for question 2
    const pickBox = el('task-picks');
    TASKS.forEach(t => {
        const b = document.createElement('button');
        b.className = 'pick-btn';
        b.dataset.task = t.id;
        b.textContent = t.id;
        b.title = t.name;
        b.setAttribute('aria-label', `${t.id} ${t.name}`);
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => {
            if (results[1]) return;
            if (picks.has(t.id)) picks.delete(t.id); else picks.add(t.id);
            b.setAttribute('aria-pressed', String(picks.has(t.id)));
            refreshGraph();
        });
        pickBox.appendChild(b);
    });

    // task details select
    const sel = el('detail-select');
    TASKS.forEach(t => {
        const o = document.createElement('option');
        o.value = t.id;
        o.textContent = `${t.id} ${t.name}`;
        sel.appendChild(o);
    });
    sel.addEventListener('change', () => showDetail(sel.value));

    initializeNetwork();
    renderQuestion();

    el('submit-btn').addEventListener('click', submit);
    el('next-btn').addEventListener('click', nextQuestion);
    el('restart-btn').addEventListener('click', restart);
    el('answer-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); submit(); }
    });
    el('t3-slider').addEventListener('input', () => {
        t3Explore = Number(el('t3-slider').value);
        renderQuestion();
    });
});

}
