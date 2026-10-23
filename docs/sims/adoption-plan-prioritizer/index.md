---
title: "Adoption Plan Prioritizer"
description: "Arrange six steps for adopting AI research practices in a group into an order that respects their dependencies, then see the first violated dependency with its reason, both valid orders, and the dependency graph."
image: /sims/adoption-plan-prioritizer/adoption-plan-prioritizer.png
og:image: /sims/adoption-plan-prioritizer/adoption-plan-prioritizer.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Adoption Plan Prioritizer

<iframe src="main.html" height="852px" width="100%" scrolling="no"></iframe>

[Run the Adoption Plan Prioritizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

An **adoption plan** is the staged introduction of AI research practices into a research group or a personal workflow. The sequence matters, because several steps are prerequisites for the safe use of the later ones. This MicroSim asks you to **prioritize** six steps:

| Step | Description |
|---|---|
| A | Write the lab AI use policy, with the data classes and permitted tools (Chapter 18). |
| B | Set up a shared repository with an instruction file and a project knowledge base (Chapters 5 and 6). |
| C | Pilot one skill on one repeatable task at autonomy level 1 or 2, such as citation verification (Chapters 7, 9, and 11). |
| D | Add verification checks and a reproducibility package to the pilot (Chapters 13 and 17). |
| E | Scale to a small agent team on one project, with review gates (Chapter 10). |
| F | Review the metrics at 90 days, such as time saved, review load, and errors that escaped, and decide what to expand or stop. |

An order is valid when A comes before C, B before C, C before D, D before E, and E before F. A and B may be in either order, so there are two valid orders. When an order is invalid, the sim names the first violated dependency: reading your sequence from the top, the first step that comes before one of its prerequisites (if step C comes before both A and B, A is named).

**Learning objective:** prioritize six adoption steps for a research group into an order that respects their dependencies, and state the dependency that justifies each constraint.

## How to Use

1. The six steps start in a scrambled order. The question on screen is *Which steps must come first, and why?*
2. Pick a step in the drop-down list below the drawing. The list shows each step's current position, for example **Step C (#4)**, and the picked step is outlined in dark blue.
3. Press **Earlier** or **Later** to move the picked step up or down one position. All controls work with the Tab key and Enter or Space.
4. Press **Submit Order**. The sim reports **Valid order.** with the list of dependencies and their reasons, or **Invalid: C needs A first.** (for example) with the reason for that dependency. It then shows both valid orders and the dependency graph; the broken dependency is drawn as a dashed arrow marked with a cross.
5. On a narrow screen the feedback opens on its own page; press **Next Page** to read more and to return to the steps.
6. Only the first submission counts as evidence. You may rearrange the steps and submit again afterward; later submissions are marked as practice, and the status line keeps the result of the first one.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/adoption-plan-prioritizer/main.html"
        height="852px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Graduate students (MS and PhD) in electrical and computer engineering, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10 minutes

### Prerequisites
- Lab AI policy, project instruction file, pilot skill, verification checks, review gates, and agent team, from earlier chapters
- The section "Adopting These Practices" in Chapter 20

### Learning Objective
The learner will prioritize six adoption steps for a research group into an order that respects their dependencies, and state the dependency that justifies each constraint.

- **Bloom level:** Evaluate
- **Bloom verb:** prioritize

### Activities

1. **Prioritize** (5 min): Before moving anything, decide which steps must come before the pilot and which must wait for it. Arrange the steps and submit once.
2. **Justify** (5 min): Read the reason for each dependency. Explain why A and B may be swapped without effect, and why scaling to a team is not the first step after a pilot.

### Evidence of Mastery
- The learner arranges six steps in a sequence and submits. The order is correct when every dependency holds (A before C, B before C, C before D, D before E, E before F).
- **Mastery:** a valid order on the first submission. The status line shows whether the first submission was valid.
- Reading the step descriptions, and later practice submissions, are exploration and are not evidence.

## References

1. [Chapter 20: Case Studies and Capstone Project](../../chapters/20-case-studies-capstone/index.md) - the section "Adopting These Practices" is the source of the six steps and their dependencies.
