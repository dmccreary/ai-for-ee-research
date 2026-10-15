---
title: "Personal Knowledge Graph Query Explorer"
description: "Interactive vis-network MicroSim in which learners solve five questions about a twelve-edge personal knowledge graph by following typed, directed relationships and selecting the exact set of entities that answers each question."
social:
   cards: false
quality_score: 0
status: built
---

# Personal Knowledge Graph Query Explorer

<iframe src="main.html" height="842px" width="100%" scrolling="no"></iframe>

[Run the Personal Knowledge Graph Query Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

A folder of notes lets you find a note you already know exists. A typed graph lets you derive a fact that no single note states, by chaining relationships. This MicroSim shows a small, illustrative personal knowledge graph for an ADC research project: ten entities of six types (Experiment, Dataset, Design, Paper, Concept, Person) joined by twelve typed, directed relationships such as `USED`, `TESTED`, `REVISES`, `REPORTS`, `CITES`, `ABOUT`, and `AUTHORED`. The entities and links are invented for illustration.

The question on screen is *Which entities answer this, by following the relationships?* Five questions follow in a fixed order. They rise from one hop ("Which experiments used Dataset A?") to three hops ("Which papers report an experiment that tested the design that ADC Design v3 revises?"). For each one you select the set of entities that answers it and submit. An answer counts as correct only if your set equals the answer set exactly, with no missing and no extra entities.

After each submission the sim highlights the path that produces the answer set in thick blue edges, labels each edge on the path with its number and type, and shows the reason, for example *Dr. Rivera authored Paper Beta (edge 12), and Paper Beta cites Paper Alpha (edge 9).*

## How to Use

1. Explore the graph. Each node shows its name and its entity type. Arrows point from the first entity to the second. Hover over an edge to read its type, or hover over a node (or move the keyboard focus to its button) to read all of its incoming and outgoing relationships. Exploring is not scored.
2. Read the question in the exercise panel.
3. Select the entities that answer it. Click a node in the graph, or press the matching entity button. A selected entity shows a check mark (✓). Click it again to remove it.
4. Press **Submit**. You get one attempt per question. The sim says **Correct** or **Incorrect**, gives the correct answer set when you missed, highlights the path, and shows the reason. In the graph and on the buttons, ✓ marks a correct pick, ✗ marks an entity that is not in the answer, and ★ marks an answer you missed.
5. Press **Next question** to continue.
6. After question 5 the panel shows your score as *n of 5 correct* and whether you met the mastery threshold of 4. Press **Start over** to try the five questions again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/pkg-graph-query-explorer/main.html"
        height="842px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will solve five questions about a twelve-edge personal knowledge graph by following typed, directed relationships, and give each answer as the exact set of entities, with at least 4 of 5 correct (Bloom: Apply, verb: solve).

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10-15 minutes

### Prerequisites

Entity, relationship, typed relationship, graph schema, backlink, and graph querying, all defined in the section "From Files to a Knowledge Graph" of [Chapter 6](../../chapters/06-knowledge-bases-skill-anatomy/index.md).

### Activities

1. **Exploration** (3 min): Hover over the nodes and edges. For each relationship type, say in words what it means and which direction it points (for example, a Paper `REPORTS` an Experiment).
2. **Guided Practice** (7 min): Answer the five questions in order. Before you select, trace the path with your finger from the entity named in the question, one hop at a time, and say whether each hop follows an edge in its direction or against it. After each submission, compare your path with the highlighted one.
3. **Assessment** (5 min): Without the sim, write the chain of relationships that answers question 5, and explain why Paper Beta must be rechecked even though it never names Dataset A.

### Assessment

- **Evidence of mastery:** for each of the five questions the learner selects the set of entities that answers it and submits. An answer is correct when the selected set equals the answer set exactly. Mastery is at least 4 of 5 correct on the first attempt.
- Hovering over edges to read their types is exploration and is not evidence.
- Watch for three misconceptions: that a relationship can be followed in either direction with the same meaning, that a question needing more than one hop cannot be answered from the graph, and that a paper not directly linked to a dataset is unaffected by that dataset.

## References

1. [Chapter 6: Knowledge Bases, Personal Knowledge Graphs, and the Anatomy of an Agent Skill](../../chapters/06-knowledge-bases-skill-anatomy/index.md) - the section "From Files to a Knowledge Graph" defines entities, typed relationships, the graph schema, and graph querying, and is the source of the traversal procedure used here.
2. [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) - the JavaScript network library used to draw the graph.
