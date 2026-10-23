---
title: Research Funnel
description: A horizontal six-stage funnel that follows research ideas from Research Ideas to Published Paper, naming each gate with its standard research term and showing how many ideas survive.
image: /sims/research-funnel/research-funnel.png
og:image: /sims/research-funnel/research-funnel.png
twitter:image: /sims/research-funnel/research-funnel.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Research Funnel

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the Research Funnel MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Most research ideas never become papers. This MicroSim draws that attrition as a horizontal funnel that is widest at **Research Ideas** on the left and narrowest at **Published Paper** on the right. Each of the six stages sits behind a gate, and a gate is a question that an idea must answer well enough to move on.

| # | Stage | Standard research term | Gate question |
|---|-------|------------------------|---------------|
| 1 | Research Ideas | Ideation; Stage-Gate *Discovery* and idea screen | Is this a clear, specific question with a measurable outcome? |
| 2 | Not Done Before | Novelty screen by literature review; FINER *Novel* | Has someone already done this, or is there a real gap? |
| 3 | Feasible Within Budget | Feasibility study, or scoping; FINER *Feasible* | Can we finish with our time, budget, equipment, and skills? |
| 4 | Funded & Approved | Proposal and review gate; FINER *Interesting*, *Ethical*, *Relevant* | Who cares, and will the advisor, funder, and review board say yes? |
| 5 | Validated Results | Execution and validation; Stage-Gate *Development* and *Testing* | Do the experiments support the hypothesis, and can others reproduce them? |
| 6 | Published Paper | Dissemination by peer review | Do reviewers judge the work novel, sound, and clearly written? |

The stage names come from three published frameworks. The **FINER** criteria (Feasible, Interesting, Novel, Ethical, Relevant) are the standard checklist for judging a research question (Hulley et al.). **Stage-Gate** splits development into work stages separated by go, kill, hold, or recycle gates (Cooper, 1990). The **Heilmeier catechism** is the set of questions DARPA program managers ask of a proposal, including *What is new?* and *Who cares?*

**Learning objective:** explain the sequence of gates a research idea passes between ideation and publication, using the standard name for each gate, by stepping through the funnel.

!!! note "The numbers are illustrative"
    The pass rates (100%, 40%, 60%, 50%, 50%, 70%) are invented to show the shape of a funnel. They are not measured. Real pass rates differ by field, lab, and funder. The height of the funnel is proportional to the surviving ideas, with a minimum height so the last stage stays visible.

## How to Use

1. Read the funnel from left to right. The number in each segment is how many of your starting ideas survive to that stage.
2. Press **Next** and **Previous**, or click a segment, its label, or its pass rate, to select a stage. The selected stage is outlined and its label is bold.
3. Read the panel under the funnel: the research term for the gate, how many ideas remain, the gate question, why ideas stop there, and an EE example.
4. Move the **Starting ideas** slider (20 to 200) to see how the counts change. A funnel that begins with 20 ideas ends with about one published paper.
5. Visit all six stages. The counter beside the buttons shows **Visited n of 6**, and when the sixth stage is opened two confetti cannons fire from the lower corners. Confetti fires once per run, and the message "All six gates visited. Well done!" stays at the bottom of the drawing region.
6. Press **Reset** to return to stage 1 with only that stage counted as visited, so you can run through the funnel again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/research-funnel/main.html"
        height="582px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Graduate students (MS and PhD) in electrical and computer engineering, plus postdocs and faculty.

### Bloom Level
Understand (verb: **explain**)

### Duration
10-15 minutes

### Prerequisites
- Familiarity with the idea of a literature review, a research proposal, and peer review

### Activities
1. **Predict** (3 min): before you press Next, write down the gate you expect between Research Ideas and Published Paper and where you think the largest share of ideas is lost.
2. **Step through** (5 min): press **Next** to visit each stage and compare the real gate names with your prediction. Visiting all six stages fires the confetti cannons.
3. **Apply to your own idea** (5 min): choose one idea you are considering and answer each gate question for it in one sentence. Mark the first gate where you cannot answer.

### Assessment
- The learner can list the six stages in order and give the standard research term for at least four of the gates.
- The learner can name the gate at which a described failure (for example, "a tapeout we cannot afford") would stop an idea.

## References

1. Hulley, S. B., Cummings, S. R., Browner, W. S., Grady, D. G., and Newman, T. B. *Designing Clinical Research*, 4th ed. Lippincott Williams & Wilkins, 2013. The source of the FINER criteria.
2. Cooper, R. G. "Stage-Gate Systems: A New Tool for Managing New Products." *Business Horizons* 33(3), 1990, pp. 44-54. The Stage-Gate process of work stages and go/kill gates.
3. DARPA. *The Heilmeier Catechism.* The questions asked of a research proposal, including what is new and who cares.
4. Ioannidis, J. P. A. "Why Most Published Research Findings Are False." *PLoS Medicine* 2(8), 2005, e124. Why results often fail the validation gate.
5. [Chapter 14: Brainstorming and Problem Framing](../../chapters/14-brainstorming-problem-framing/index.md) - judging feasibility, ranking, and novelty of research ideas.
