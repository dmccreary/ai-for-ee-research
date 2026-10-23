---
title: "Agent Knowledge Graph Update Architecture"
description: "Interactive vis-network MicroSim showing how knowledge updates flow between four levels of agents (researcher, department, college, university), each of which owns its own knowledge graph."
image: /sims/agent-knowledge-graph-updates/agent-knowledge-graph-updates.png
og:image: /sims/agent-knowledge-graph-updates/agent-knowledge-graph-updates.png
twitter:image: /sims/agent-knowledge-graph-updates/agent-knowledge-graph-updates.png
social:
   cards: false
quality_score: 0
status: built
---

# Agent Knowledge Graph Update Architecture

<iframe src="main.html" height="532px" width="100%" scrolling="no"></iframe>

[Run the Agent Knowledge Graph Update Architecture MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Agents communicate through four levels, and each level controls its own knowledge graph:

1. **Personal Researcher Agents** at the bottom, controlled by each researcher.
2. **ECE Department Agents**, managed by the Electrical and Computer Engineering department.
3. **College of Science and Engineering (CSE) Agents**.
4. **University of Minnesota Agents** at the top.

Every level holds the same three knowledge nodes: **Annual Budget**, **AI Usage Policy**, and **NSF Grant Award**. Because each level owns its own copy, a fact is only true at a level once that level's agent has updated its node. Three buttons send an update through the levels so you can see which agent hands the fact to which, and in what order the nodes change.

| Button | Direction | What happens |
|---|---|---|
| **Budget Information** | Top-down | A new annual budget is issued at the University level. Each agent updates its Annual Budget node and passes the budget to the agent below. |
| **NSF Grant Award** | Bottom-up | NSF notifies a researcher that a grant was awarded. The researcher agent updates its node and reports upward, so each level's NSF Grant Award node changes. |
| **AI Usage Policy Change** | Both ways from CSE | The CSE agent adopts a policy that allows researchers to use Claude Desktop. It informs the University above and the ECE department below, and the change reaches the researcher agents. |

## How to Use

1. Read the starting state. Every node shows its old value: `FY2026`, `Claude Desktop ✗`, and `0 awards`. Nothing moves until you press a button.
2. Press **Budget Information**, **NSF Grant Award**, or **AI Usage Policy Change**.
3. Watch the colored message travel between agents. The status line under the graph says which step is happening, such as "Step 3 of 7".
4. When a message reaches a knowledge node, the node pulses and changes to its new value (`FY2027 ✔`, `Claude Desktop ✔`, `1 award ✔`).
5. Press **Reset** to return every node to its starting value, then try another button. The three event buttons are disabled while an update is running.
6. Hover over any node for a short description of what it holds.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/agent-knowledge-graph-updates/main.html"
        height="532px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will explain how a knowledge update travels through a four-level agent hierarchy and which agents must update their own knowledge graph for the fact to become true at every level (Bloom: Understand, verb: explain).

### Grade Level

Graduate students (MS and PhD) in electrical and computer engineering, plus postdocs and faculty (AI for EE Research).

### Duration

10-15 minutes

### Prerequisites

- What an AI agent is and what a knowledge base is (see [Chapter 6](../../chapters/06-knowledge-bases-skill-anatomy/index.md) and [Chapter 8](../../chapters/08-agents-tool-use-subagents/index.md)).
- Awareness that a university has several organizational levels (department, college, university).

### Activities

1. **Exploration** (5 min): Press each of the three buttons in turn, pressing **Reset** between them. Before each press, predict which nodes will change and in what order, then compare your prediction with the run.
2. **Guided Practice** (5 min): For each event, name the agent that originates the update and the agents that only relay it. In the policy event, explain why the CSE agent sends the change in two directions.
3. **Assessment** (5 min): Without the sim, sketch a fourth event of your own (for example, a new data-retention rule from the University). State where it starts, which direction it flows, and which node each agent must update.

### Assessment

- A learner who has met the objective can say that each level updates its own knowledge graph, so one message must be relayed by every agent between the source and the destination.
- They can identify that Budget Information starts at the top, NSF Grant Award starts at the bottom, and the AI Usage Policy Change starts in the middle and fans out in both directions.
- Watch for the misconception that a change at one level is automatically visible at the others. In this architecture a level's graph stays out of date until its agent updates it.

## References

1. [Chapter 8: Agents, Tool Use, and Subagents](../../chapters/08-agents-tool-use-subagents/index.md) - describes how agents pass work and information to other agents.
2. [Chapter 6: Knowledge Bases and Skill Anatomy](../../chapters/06-knowledge-bases-skill-anatomy/index.md) - describes the knowledge bases that each agent in this sim keeps up to date.
3. [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) - the JavaScript network library used to draw the graph.
