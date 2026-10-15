/* Research Workflow Handoffs: hover info panel + confetti cannon that fires
   only after the learner has clicked ALL of the boxes.
   Requires nodeInfo and edgeInfo (defined in main.html) and canvas-confetti. */

const infoDisplay = document.getElementById('info-display');
const defaultContent = '<p class="info-placeholder">Hover over a box to see its input, output, and handoff artifact.</p>';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- xAPI evidence (guarded: the sim runs unchanged without the runtime) ----
// Learning-graph ConceptIDs (docs/learning-graph/learning-graph.csv). Start/end boxes and
// "Build and measure" have no matching concept in the book, so they stay unmapped.
const NODE_KEY = {
    Topic: 'topic-and-gap', Find: 'find-what-is-known', Frame: 'frame-the-question',
    Build: 'build-and-measure', Analyze: 'analyze', Communicate: 'communicate',
    Result: 'communicated-result'
};
const NODE_CONCEPT = { Find: 2, Frame: 7, Analyze: 3, Communicate: 6 };
const HANDOFF_CONCEPT = 1;   // Research Workflow: the section that defines handoffs
let lrs = null;
if (window.LRSSim) {
    lrs = LRSSim.create({
        name: 'Research Workflow Handoffs',
        concept: LRS.conceptId(1),
        pageDwell: true,
        source: 'the Research Workflow Handoffs MicroSim',
        mount: 'body'
    });
}
const xItems = {};
function xItem(key, name, conceptNum) {
    if (!lrs) return null;
    if (!xItems[key]) {
        if (conceptNum === undefined) console.warn('[research-workflow-handoffs] no concept mapped for "' + key + '"');
        xItems[key] = lrs.item(key, {
            name: name,
            concept: conceptNum === undefined ? undefined : LRS.conceptId(conceptNum)
        });
    }
    return xItems[key];
}

function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function showNodeInfo(nodeId) {
    const info = nodeInfo[nodeId];
    if (!info) return;
    infoDisplay.innerHTML =
        '<div class="info-title" style="color:' + info.color + '">' + esc(info.title) + '</div>' +
        '<div class="info-content">' +
        '<div class="info-row"><b>Input:</b> ' + esc(info.input) + '</div>' +
        '<div class="info-row"><b>Output:</b> ' + esc(info.output) + '</div>' +
        '<div class="info-row"><b>Handoff artifact:</b> ' + esc(info.artifact) + '</div>' +
        '<div class="info-row">' + esc(info.note) + '</div>' +
        '</div>';
}

function showEdgeInfo(label) {
    infoDisplay.innerHTML =
        '<div class="info-title">Handoff artifact</div>' +
        '<div class="info-content"><div class="info-row"><b>' + esc(label) + '</b></div>' +
        '<div class="info-row">' + esc(edgeInfo[label]) + '</div></div>';
}

function clearInfo() {
    infoDisplay.innerHTML = defaultContent;
}

const clicked = new Set();
let cannonFired = false;
const progressEl = document.getElementById('progress');

function totalBoxes() {
    return Object.keys(nodeInfo).length;
}

function updateProgress() {
    const n = clicked.size, total = totalBoxes();
    if (n === total) {
        progressEl.textContent = 'All ' + total + ' boxes clicked!';
    } else {
        progressEl.textContent = n + ' of ' + total + ' boxes clicked.';
    }
}

/** Fire confetti cannons from both bottom corners of the diagram. */
function fireCannon() {
    if (reducedMotion || typeof confetti !== 'function') return;
    const colors = ['#1b6ca8', '#2a7f62', '#ffcc33', '#a23b72', '#5b4b9a', '#7a0019'];
    const base = { colors: colors, startVelocity: 60, ticks: 260, particleCount: 120, spread: 65 };
    confetti(Object.assign({}, base, { angle: 60, origin: { x: 0, y: 0.95 } }));
    confetti(Object.assign({}, base, { angle: 120, origin: { x: 1, y: 0.95 } }));
    setTimeout(() => {
        confetti(Object.assign({}, base, { angle: 90, origin: { x: 0.5, y: 1 }, startVelocity: 70 }));
    }, 250);
}

/** Record a click on a box; fire the cannon only when every box has been clicked. */
function registerClick(nodeId, node) {
    clicked.add(nodeId);
    node.classList.add('clicked');
    // Mermaid's classDef styles use !important, so set the outline inline.
    node.querySelectorAll('rect, path, polygon').forEach(shape => {
        shape.style.setProperty('stroke', '#1a7f37', 'important');
        shape.style.setProperty('stroke-width', '5px', 'important');
    });
    node.setAttribute('aria-pressed', 'true');
    updateProgress();
    if (clicked.size === totalBoxes() && !cannonFired) {
        // Fires once, when the last unclicked box is clicked.
        cannonFired = true;
        fireCannon();
    }
}

function addTooltipTitle(el, text) {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    t.textContent = text;
    el.insertBefore(t, el.firstChild);
}

function setupNodeInteractions() {
    document.querySelectorAll('.node').forEach(node => {
        // Mermaid v11 ids look like "mermaid-<ts>-flowchart-<NodeId>-<index>".
        const nodeId = (node.id.match(/flowchart-(.+)-\d+$/) || [])[1];
        const info = nodeId && nodeInfo[nodeId];
        if (!info) return;

        node.setAttribute('tabindex', '0');
        node.setAttribute('role', 'button');
        node.setAttribute('aria-pressed', 'false');
        node.setAttribute('aria-label', info.title + '. Input: ' + info.input + '. Output: ' + info.output + '.');
        addTooltipTitle(node, info.title + ': ' + info.input + ' → ' + info.output);

        // xAPI: hover >= HOVER_MS is an inspection; a click or Enter on the same visit is
        // the designed act and replaces the pending hover (one engagement, not two).
        const xi = xItem(NODE_KEY[nodeId], info.title, NODE_CONCEPT[nodeId]);
        let hoverAt = null;

        node.addEventListener('mouseenter', () => { hoverAt = Date.now(); showNodeInfo(nodeId); });
        node.addEventListener('mouseleave', () => {
            clearInfo();
            if (xi && hoverAt !== null && Date.now() - hoverAt >= LRSSim.HOVER_MS) {
                xi.study('hover', Date.now() - hoverAt);
            }
            hoverAt = null;
        });
        node.addEventListener('focus', () => showNodeInfo(nodeId));
        node.addEventListener('blur', clearInfo);
        node.addEventListener('click', () => {
            showNodeInfo(nodeId);
            registerClick(nodeId, node);
            if (xi) xi.study('click', hoverAt === null ? undefined : Date.now() - hoverAt);
            hoverAt = null;
        });
        node.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showNodeInfo(nodeId);
                registerClick(nodeId, node);
                if (xi) xi.study('keyboard');
            }
        });
    });

    document.querySelectorAll('.edgeLabel').forEach(el => {
        const label = el.textContent.trim();
        if (!edgeInfo[label]) return;
        addTooltipTitle(el, edgeInfo[label]);
        el.addEventListener('mouseenter', () => showEdgeInfo(label));
        el.addEventListener('mouseleave', clearInfo);

        // xAPI: only the outermost .edgeLabel (Mermaid nests two), so one hover is one visit.
        if (el.parentElement && el.parentElement.closest('.edgeLabel')) return;
        const xi = xItem('handoff-' + (window.LRS ? LRS.slug(label) : label), 'Handoff artifact: ' + label, HANDOFF_CONCEPT);
        if (!xi) return;
        let hoverAt = null;
        el.addEventListener('mouseenter', () => { hoverAt = Date.now(); });
        el.addEventListener('mouseleave', () => {
            if (hoverAt !== null && Date.now() - hoverAt >= LRSSim.HOVER_MS) {
                xi.study('hover', Date.now() - hoverAt);
            }
            hoverAt = null;
        });
    });
}

/** Poll until Mermaid has rendered, then wire up interactions. */
function waitForMermaid() {
    const svg = document.querySelector('.mermaid svg');
    if (svg && document.querySelectorAll('.node').length > 0) {
        setupNodeInteractions();
    } else {
        setTimeout(waitForMermaid, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(waitForMermaid, 100));
} else {
    setTimeout(waitForMermaid, 100);
}

updateProgress();
