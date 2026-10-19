// Agent Knowledge Graph Update Architecture - vis-network
// CANVAS_HEIGHT: 530
//
// Four levels of agents, each owning its own small knowledge graph
// (an agent node plus Annual Budget, AI Usage Policy and NSF Grant Award nodes).
// Three buttons send knowledge updates through the levels:
//   Budget Information     - top-down
//   NSF Grant Award        - bottom-up
//   AI Usage Policy Change - starts at the CSE level and goes both ways
// Nothing moves until the learner presses a button.

document.addEventListener('DOMContentLoaded', function () {

    // ---------------------------------------------------------------
    // Data
    // ---------------------------------------------------------------
    const LANE_PITCH = 104;          // vertical distance between level centers
    const LANE_HALF = 50;            // half height of a level band

    // Top to bottom. "short" is used in the status messages.
    const LANES = [
        { id: 'U', band: 'UNIVERSITY', short: 'University', agent: 'University of Minnesota\nAgents', fill: '#6b0016',
          tip: 'University of Minnesota agents: manage university-wide knowledge such as the annual budget and campus policies.' },
        { id: 'C', band: 'COLLEGE', short: 'CSE', agent: 'College of Science and\nEngineering (CSE) Agents', fill: '#8a1c33',
          tip: 'College of Science and Engineering (CSE) agents: manage college-level budgets, awards and AI usage policy.' },
        { id: 'E', band: 'DEPARTMENT', short: 'EECD', agent: 'EECD Department\nAgents', fill: '#a3374c',
          tip: 'Electrical Engineering and Computer Design (EECD) department agents: manage department-level knowledge.' },
        { id: 'R', band: 'RESEARCHER', short: 'Researcher', agent: 'Personal Researcher\nAgents', fill: '#b34a5d',
          tip: 'Personal researcher agents: controlled by each researcher; hold that researcher\'s own knowledge graph.' }
    ];
    LANES.forEach(function (l, i) { l.y = i * LANE_PITCH; });

    // The three kinds of knowledge node in every level.
    const TOPICS = [
        { k: 'B', title: 'Annual Budget',   init: 'FY2026',           done: 'FY2027 ✔',
          x: 290, dy: -26, border: '#1565c0', tint: '#bbdefb' },
        { k: 'P', title: 'AI Usage Policy', init: 'Claude Desktop ✗', done: 'Claude Desktop ✔',
          x: 530, dy: 26,  border: '#7b1fa2', tint: '#e1bee7' },
        { k: 'N', title: 'NSF Grant Award', init: '0 awards',         done: '1 award ✔',
          x: 770, dy: 0,   border: '#9a5b00', tint: '#ffe3a3' }
    ];
    const TOPIC = {};
    TOPICS.forEach(function (t) { TOPIC[t.k] = t; });

    const AGENT_X = 110;
    const NSF_X = 935;

    // ---------------------------------------------------------------
    // Events: each step is a list of hops that play at the same time.
    // A hop moves a message from one node to another; if "update" is true
    // the destination knowledge node is updated when the message arrives.
    // ---------------------------------------------------------------
    const EVENTS = {
        budget: {
            color: '#1565c0',
            topic: 'B',
            steps: [
                { text: 'The University agent receives the new annual budget and updates its Annual Budget node.',
                  hops: [{ from: 'A_U', to: 'U_B', update: true }] },
                { text: 'The University agent sends the budget down to the CSE agent.',
                  hops: [{ from: 'A_U', to: 'A_C' }] },
                { text: 'The CSE agent updates its Annual Budget node.',
                  hops: [{ from: 'A_C', to: 'C_B', update: true }] },
                { text: 'The CSE agent sends the budget down to the EECD department agent.',
                  hops: [{ from: 'A_C', to: 'A_E' }] },
                { text: 'The EECD agent updates its Annual Budget node.',
                  hops: [{ from: 'A_E', to: 'E_B', update: true }] },
                { text: 'The EECD agent sends the budget down to the personal researcher agents.',
                  hops: [{ from: 'A_E', to: 'A_R' }] },
                { text: 'The researcher agent updates its Annual Budget node.',
                  hops: [{ from: 'A_R', to: 'R_B', update: true }] }
            ],
            done: 'Done: the Annual Budget node was updated at all four levels, flowing top-down.'
        },
        nsf: {
            color: '#9a5b00',
            topic: 'N',
            steps: [
                { text: 'NSF notifies the researcher that the grant was awarded. The researcher agent updates its NSF Grant Award node.',
                  hops: [{ from: 'X', to: 'R_N', update: true }] },
                { text: 'The researcher agent reports the award up to the EECD department agent.',
                  hops: [{ from: 'A_R', to: 'A_E' }] },
                { text: 'The EECD agent updates its NSF Grant Award node.',
                  hops: [{ from: 'A_E', to: 'E_N', update: true }] },
                { text: 'The EECD agent reports the award up to the CSE agent.',
                  hops: [{ from: 'A_E', to: 'A_C' }] },
                { text: 'The CSE agent updates its NSF Grant Award node.',
                  hops: [{ from: 'A_C', to: 'C_N', update: true }] },
                { text: 'The CSE agent reports the award up to the University agent.',
                  hops: [{ from: 'A_C', to: 'A_U' }] },
                { text: 'The University agent updates its NSF Grant Award node.',
                  hops: [{ from: 'A_U', to: 'U_N', update: true }] }
            ],
            done: 'Done: the NSF Grant Award node was updated at all four levels, flowing bottom-up.'
        },
        policy: {
            color: '#7b1fa2',
            topic: 'P',
            steps: [
                { text: 'The CSE agent records the policy change: researchers may now use Claude Desktop.',
                  hops: [{ from: 'A_C', to: 'C_P', update: true }] },
                { text: 'The CSE agent sends the change both up to the University and down to the EECD department.',
                  hops: [{ from: 'A_C', to: 'A_U' }, { from: 'A_C', to: 'A_E' }] },
                { text: 'The University and EECD agents each update their AI Usage Policy node.',
                  hops: [{ from: 'A_U', to: 'U_P', update: true }, { from: 'A_E', to: 'E_P', update: true }] },
                { text: 'The EECD agent passes the change down to the personal researcher agents.',
                  hops: [{ from: 'A_E', to: 'A_R' }] },
                { text: 'The researcher agent updates its AI Usage Policy node: Claude Desktop is allowed.',
                  hops: [{ from: 'A_R', to: 'R_P', update: true }] }
            ],
            done: 'Done: the policy started at the CSE level and reached the university above and the researchers below.'
        }
    };

    const HOP_MS = 800;      // time for one message to travel
    const PULSE_MS = 600;    // ring pulse after a node updates

    // ---------------------------------------------------------------
    // Build the vis-network nodes and edges
    // ---------------------------------------------------------------
    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();

    function knowledgeLabel(topic, status) {
        return '*' + topic.title + '*\n' + status;
    }

    LANES.forEach(function (lane) {
        nodes.add({
            id: 'A_' + lane.id, label: lane.agent, x: AGENT_X, y: lane.y,
            shape: 'box', margin: 7, borderWidth: 2,
            widthConstraint: { minimum: 190, maximum: 190 },
            color: { background: lane.fill, border: '#2b0008' },
            font: { color: '#ffffff', size: 14, face: 'Arial', bold: { color: '#ffffff' } },
            title: lane.tip, fixed: true
        });
        TOPICS.forEach(function (t) {
            const id = lane.id + '_' + t.k;
            nodes.add({
                id: id, label: knowledgeLabel(t, t.init), x: t.x, y: lane.y + t.dy,
                shape: 'box', margin: 6, borderWidth: 2,
                widthConstraint: { minimum: 140, maximum: 140 },
                color: { background: '#ffffff', border: t.border },
                font: { multi: 'md', size: 13, face: 'Arial', color: '#1a1a1a', bold: { size: 13, face: 'Arial', color: '#1a1a1a' } },
                title: lane.short + ' knowledge node: ' + t.title, fixed: true
            });
            edges.add({ id: 'e_' + id, from: 'A_' + lane.id, to: id,
                        color: { color: '#9fb2c0' }, width: 1, smooth: false });
        });
    });

    // The four agents talk to the agent above and below them.
    for (let i = 0; i < LANES.length - 1; i++) {
        edges.add({ id: 'a_' + i, from: 'A_' + LANES[i].id, to: 'A_' + LANES[i + 1].id,
                    arrows: { to: { enabled: true, scaleFactor: 0.6 }, from: { enabled: true, scaleFactor: 0.6 } },
                    color: { color: '#546e7a' }, width: 2, smooth: false });
    }

    // NSF is outside the university; it notifies the researcher.
    const rLane = LANES[LANES.length - 1];
    nodes.add({
        id: 'X', label: '*NSF*\n(sponsor)', x: NSF_X, y: rLane.y,
        shape: 'box', margin: 6, borderWidth: 2, borderDashes: [4, 3],
        widthConstraint: { minimum: 84, maximum: 84 },
        color: { background: '#fff8e1', border: '#9a5b00' },
        font: { multi: 'md', size: 13, face: 'Arial', color: '#1a1a1a', bold: { size: 13, face: 'Arial', color: '#1a1a1a' } },
        title: 'National Science Foundation: the external sponsor that awards the grant.', fixed: true
    });
    edges.add({ id: 'e_X', from: 'X', to: 'R_N', arrows: { to: { enabled: true, scaleFactor: 0.6 } },
                dashes: true, color: { color: '#9a5b00' }, width: 1.5, smooth: false });

    // Invisible corner nodes so network.fit() frames the level bands, not just the nodes.
    const topY = LANES[0].y - LANE_HALF - 4;
    const botY = rLane.y + LANE_HALF + 4;
    ['tl', 'br'].forEach(function (c) {
        nodes.add({
            id: 'pad_' + c, label: '', shape: 'dot', size: 1,
            x: c === 'tl' ? -26 : NSF_X + 66, y: c === 'tl' ? topY : botY,
            color: { background: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)' },
            borderWidth: 0, fixed: true, chosen: false, font: { size: 0 }
        });
    });

    // ---------------------------------------------------------------
    // Network
    // ---------------------------------------------------------------
    const container = document.getElementById('network');
    const network = new vis.Network(container, { nodes: nodes, edges: edges }, {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            dragNodes: false, dragView: false, zoomView: false,   // never hijack page scrolling in an iframe
            selectable: false, hover: true, tooltipDelay: 150
        },
        nodes: { chosen: false },
        edges: { chosen: false }
    });

    const BAND_X = -20;
    const BAND_W = NSF_X + 66 - BAND_X;

    // Draw the four level bands behind the graph.
    network.on('beforeDrawing', function (ctx) {
        LANES.forEach(function (lane, i) {
            const top = lane.y - LANE_HALF;
            ctx.beginPath();
            roundRect(ctx, BAND_X, top, BAND_W, LANE_HALF * 2, 8);
            ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.85)' : 'rgba(225,238,252,0.9)';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#a9bfd8';
            ctx.stroke();
            ctx.font = 'bold 11px Arial';
            ctx.fillStyle = '#37474f';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(lane.band, BAND_X + 8, top + 5);
        });
    });

    function roundRect(ctx, x, y, w, h, r) {
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    // ---------------------------------------------------------------
    // Animation of messages (drawn on top of the graph)
    // ---------------------------------------------------------------
    let activeHops = [];      // [{from, to, color, start}]
    let pulses = [];          // [{id, color, start}]
    let rafId = null;

    // Point where the line between two node centers leaves the node's box.
    function edgePoint(fromId, toId) {
        const p = network.getPositions([fromId, toId]);
        const bb = network.getBoundingBox(fromId);
        const hw = (bb.right - bb.left) / 2 + 2;
        const hh = (bb.bottom - bb.top) / 2 + 2;
        const dx = p[toId].x - p[fromId].x;
        const dy = p[toId].y - p[fromId].y;
        const sx = dx === 0 ? Infinity : hw / Math.abs(dx);
        const sy = dy === 0 ? Infinity : hh / Math.abs(dy);
        const s = Math.min(sx, sy, 1);
        return { x: p[fromId].x + dx * s, y: p[fromId].y + dy * s };
    }

    network.on('afterDrawing', function (ctx) {
        const now = performance.now();

        activeHops.forEach(function (h) {
            const t = Math.min(1, (now - h.start) / HOP_MS);
            const a = edgePoint(h.from, h.to);
            const b = edgePoint(h.to, h.from);
            const x = a.x + (b.x - a.x) * t;
            const y = a.y + (b.y - a.y) * t;
            ctx.lineCap = 'round';
            ctx.strokeStyle = h.color;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, Math.PI * 2);
            ctx.fillStyle = h.color;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
        });

        pulses.forEach(function (p) {
            const t = Math.min(1, (now - p.start) / PULSE_MS);
            const bb = network.getBoundingBox(p.id);
            ctx.globalAlpha = 1 - t;
            ctx.lineWidth = 3;
            ctx.strokeStyle = p.color;
            ctx.beginPath();
            roundRect(ctx, bb.left - 3 - 6 * t, bb.top - 3 - 6 * t,
                      (bb.right - bb.left) + 6 + 12 * t, (bb.bottom - bb.top) + 6 + 12 * t, 8);
            ctx.stroke();
            ctx.globalAlpha = 1;
        });
    });

    function tick() {
        const now = performance.now();
        pulses = pulses.filter(function (p) { return now - p.start < PULSE_MS; });
        network.redraw();
        if (activeHops.length || pulses.length) {
            rafId = requestAnimationFrame(tick);
        } else {
            rafId = null;
        }
    }

    function startLoop() {
        if (rafId === null) { rafId = requestAnimationFrame(tick); }
    }

    // ---------------------------------------------------------------
    // Playing an event
    // ---------------------------------------------------------------
    const statusEl = document.getElementById('status');
    const buttons = {
        budget: document.getElementById('btn-budget'),
        nsf: document.getElementById('btn-nsf'),
        policy: document.getElementById('btn-policy')
    };
    const resetBtn = document.getElementById('btn-reset');
    let runToken = 0;          // changes on every run/reset so stale timers stop

    function setStatus(text) { statusEl.textContent = text; }

    function setBusy(busy) {
        Object.keys(buttons).forEach(function (k) { buttons[k].disabled = busy; });
    }

    function updateNode(id, ev) {
        const topic = TOPIC[ev.topic];
        nodes.update({
            id: id,
            label: knowledgeLabel(topic, topic.done),
            color: { background: topic.tint, border: topic.border },
            borderWidth: 3
        });
        pulses.push({ id: id, color: ev.color, start: performance.now() });
    }

    function playStep(ev, index, token, total) {
        if (token !== runToken) { return; }
        if (index >= ev.steps.length) {
            setStatus(ev.done);
            setBusy(false);
            return;
        }
        const step = ev.steps[index];
        setStatus('Step ' + (index + 1) + ' of ' + total + ': ' + step.text);
        const start = performance.now();
        activeHops = step.hops.map(function (h) {
            return { from: h.from, to: h.to, color: ev.color, start: start };
        });
        startLoop();
        setTimeout(function () {
            if (token !== runToken) { return; }
            step.hops.forEach(function (h) { if (h.update) { updateNode(h.to, ev); } });
            activeHops = [];
            startLoop();
            setTimeout(function () { playStep(ev, index + 1, token, total); }, 450);
        }, HOP_MS);
    }

    function runEvent(name) {
        const ev = EVENTS[name];
        runToken++;
        setBusy(true);
        playStep(ev, 0, runToken, ev.steps.length);
    }

    function resetAll() {
        runToken++;
        activeHops = [];
        pulses = [];
        LANES.forEach(function (lane) {
            TOPICS.forEach(function (t) {
                nodes.update({
                    id: lane.id + '_' + t.k,
                    label: knowledgeLabel(t, t.init),
                    color: { background: '#ffffff', border: t.border },
                    borderWidth: 2
                });
            });
        });
        setBusy(false);
        setStatus('Press a button to send a knowledge update through the four agent levels.');
        network.redraw();
    }

    buttons.budget.addEventListener('click', function () { runEvent('budget'); });
    buttons.nsf.addEventListener('click', function () { runEvent('nsf'); });
    buttons.policy.addEventListener('click', function () { runEvent('policy'); });
    resetBtn.addEventListener('click', resetAll);

    function fitGraph() {
        network.redraw();
        network.fit({ animation: false });
    }
    window.addEventListener('resize', fitGraph);
    setTimeout(fitGraph, 50);
    setTimeout(fitGraph, 400);
});
