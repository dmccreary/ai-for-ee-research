---
title: "Citation Chaining Explorer"
description: "Interactive vis-network MicroSim in which learners solve five citation-chaining questions on a graph of eight illustrative papers by following references backward and citations forward."
image: /sims/citation-chaining-explorer/citation-chaining-explorer.png
og:image: /sims/citation-chaining-explorer/citation-chaining-explorer.png
social:
   cards: false
quality_score: 0
status: built
---

# Citation Chaining Explorer

<iframe src="main.html" height="802px" width="100%" scrolling="no"></iframe>

[Run the Citation Chaining Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

**Citation chaining** is finding papers by following the citation links of a paper you already have. *Backward* chaining follows a paper's reference list to the earlier work it builds on. *Forward* chaining follows the papers that cite it to the later work that builds on it.

The graph shows eight papers. They are **illustrative**: the papers, years, and links are invented for this exercise. An arrow from X to Y means **X cites Y**. The seed paper S (2022) is highlighted, older papers sit on the left, and newer papers sit on the right.

| Paper | Year | Role |
|---|---|---|
| S | 2022 | Seed paper |
| A | 2018 | Cited by S |
| B | 2019 | Cited by S |
| C | 2020 | Cited by S |
| F | 2017 | Cited by B and by C |
| D | 2023 | Cites S |
| E | 2024 | Cites S and C |
| G | 2025 | Cites D |

You answer five questions in a fixed order. The question on screen is *Which papers does this procedure find?* Each question names a procedure, such as backward chaining one step from S, and you select the set of papers it finds. The seed paper S is never part of an answer. After each answer the sim highlights the edges the procedure follows and explains why.

## How to Use

1. Click any paper in the graph, or use the **Paper details** buttons, to read its year, role, the papers it cites, and the papers that cite it. You can also drag papers to see the links more clearly. This is exploration and is not scored.
2. Read the question in the right-hand panel (below the graph on narrow screens).
3. Check every paper that answers the question. Your selections are marked in the graph with a dot (●). Then press **Submit answer** (or press Enter on a checkbox). Each question has **one attempt**.
4. Read the feedback. A correct answer shows "Correct." and the reason. An incorrect answer shows the correct set and the reason. In both cases the correct papers are marked with a check mark (✓), a wrong pick with an X (✗) and a dashed border, and the edges the procedure follows are drawn thick.
5. Press **Next question** to continue. After question 5 the panel shows your score as *n of 5 correct* and whether you met the mastery threshold of 4. Compare the years of the papers each direction of chaining reached.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/citation-chaining-explorer/main.html"
        height="802px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will solve five citation-chaining questions on a graph of eight papers by following references backward and citations forward, with at least 4 of 5 correct (Bloom: Apply, verb: solve).

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10 minutes

### Prerequisites

Citation chaining, backward chaining, forward chaining, and the meaning of a citation edge, all defined in the section "Following Citations" of [Chapter 11](../../chapters/11-literature-search-synthesis/index.md).

### Activities

1. **Exploration** (3 min): Open the details of S and of two other papers. For each, say which papers backward chaining and forward chaining would reach in one step. This step is not scored.
2. **Guided Practice** (5 min): Answer the five questions in order. Before submitting each answer, trace the arrows with your finger in the direction the procedure follows: along the arrow for backward chaining, against the arrow for forward chaining.
3. **Assessment** (2 min): After question 5, compare the years of the papers found by forward chaining with those found by backward chaining, and write one sentence explaining the difference.

### Assessment

- **Evidence of mastery:** at least 4 of 5 questions correct on the first attempt, where an answer is correct only when the selected set equals the answer set exactly.
- Dragging papers and reading paper details is exploration and is not evidence.
- Watch for three misconceptions: that forward and backward chaining find the same papers, that only papers with matching keywords are relevant, and that the most recent paper is the most foundational.

## References

1. [Chapter 11: AI-Assisted Literature Search and Synthesis](../../chapters/11-literature-search-synthesis/index.md) - the section "Following Citations" defines backward and forward chaining and states that a paper cited by several references of a seed paper is likely foundational. The papers in this MicroSim are invented for illustration.
2. [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) - the JavaScript network library used to draw the citation graph.
