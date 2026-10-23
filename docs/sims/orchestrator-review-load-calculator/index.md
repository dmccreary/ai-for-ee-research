---
title: "Orchestrator Review Load Calculator"
description: "Interactive p5.js MicroSim in which learners calculate the daily review load of an agent team from its size and per-output review times, then size the team or the review fraction to fit an attention budget."
image: /sims/orchestrator-review-load-calculator/orchestrator-review-load-calculator.png
og:image: /sims/orchestrator-review-load-calculator/orchestrator-review-load-calculator.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Orchestrator Review Load Calculator

<iframe src="main.html" height="752px" width="100%" scrolling="no"></iframe>

[Run the Orchestrator Review Load Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Researcher attention, not compute, limits the size of an agent team. This MicroSim turns the chapter's load formula into a planning tool. The daily review load, in minutes, is

\[
L = f\, n_p\, k_p\, r_p + n_e\, k_e\, r_e + c,
\]

where \( f \) is the fraction of planning outputs reviewed, \( n_p \) and \( n_e \) are the numbers of planning and execution agents, \( k_p \) and \( k_e \) are the outputs per agent per day, \( r_p \) and \( r_e \) are the review minutes per output, and \( c \) is the time spent resolving conflicts. The load fits when it is no more than the attention available times 60.

The nine quantities and their ranges are:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Planning agents n_p | 0 | 40 | 1 | 20 | agents |
| Execution agents n_e | 0 | 20 | 1 | 10 | agents |
| Planning outputs per agent per day k_p | 1 | 4 | 1 | 1 | outputs |
| Execution outputs per agent per day k_e | 1 | 4 | 1 | 1 | outputs |
| Review time per planning output r_p | 2 | 15 | 1 | 6 | minutes |
| Review time per execution output r_e | 5 | 30 | 1 | 15 | minutes |
| Conflict resolution c | 0 | 120 | 10 | 30 | minutes per day |
| Attention available | 1 | 8 | 0.5 | 4 | hours per day |
| Fraction of planning outputs reviewed | 0.25 | 1.0 | 0.25 | 1.0 | fraction |

All values are illustrative. The sim opens with the default team and 4 hours of attention, and asks *How many hours of review does this team need each day?* Three challenges follow in a fixed order:

1. What is the daily review load in hours for the default team?
2. With attention fixed at 4 hours, 10 execution agents, and every planning output reviewed, what is the largest number of planning agents that fits?
3. With 20 planning agents and attention fixed at 4 hours, what is the largest fraction of planning outputs, from 0.25, 0.5, 0.75, 1.0, that can be reviewed?

During the challenges the sliders show the challenge's values and are locked, and the quantity you are solving for is shown as **?**. After each challenge ends, the sim shows the worked calculation and a stacked bar that compares the load (planning, execution, and conflict minutes) with a dashed line at the attention available, and states in words whether the load fits. After the third challenge, exploration opens and all nine sliders unlock.

## How to Use

1. Read the challenge and type your answer in the box under the drawing area. Press **Submit** or Enter. If the box does not contain a number, the sim asks for one and does not count the attempt.
2. You have two attempts per challenge. A first wrong answer gives the hint "Check that each term is agents x outputs x minutes." A second wrong answer shows the worked calculation and counts the challenge as missed. The running count *n of 3 correct* is shown at the top.
3. Read the worked calculation and the bar, then press **Next challenge**.
4. After the third challenge, press **Start exploring**. Move any of the nine sliders and watch the bar and the verdict. Halve the review time per planning output (6 to 3), press **Restore defaults**, then halve the review time per execution output (15 to 7 or 8), and compare how much each change saves.

The sliders are native controls that can be reached with the Tab key and moved with the arrow keys.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/orchestrator-review-load-calculator/main.html"
        height="752px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will calculate the daily review load of an agent team from its size and per-output review times, and adjust the team or the review fraction to fit a stated attention budget, in three challenges.

- **Bloom level:** Apply
- **Bloom verb:** calculate

### Grade Level

Graduate students (MS and PhD) in electrical and computer engineering, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration

10-15 minutes

### Prerequisites

Researcher attention, span of control, review checkpoint, and the load formula \( L = n_p k_p r_p + n_e k_e r_e + c \), all from the section "Review, Approval, and Researcher Attention" of [Chapter 10](../../chapters/10-orchestrating-agent-teams/index.md).

### Activities

1. **Calculate** (6 min): Work the three challenges in order. Write each term of the load formula on paper before you submit.
2. **Explore** (5 min): After the challenges, compare halving the review time per planning output with halving it per execution output. Then set your own team size and attention, and find the largest team that fits.
3. **Reflect** (3 min): Write one sentence on why reviewing a sample of the cheapest, most reversible outputs is not the same as skipping review.

### Assessment

- **Evidence of mastery:** for each of the three challenges the learner types a value and submits, and a value is correct when it equals the answer key (5.0 hours, 10 planning agents, a fraction of 0.5). Mastery is 3 of 3 correct.
- Changing the quantities in exploration mode is not evidence.
- Watch for three misconceptions: that review load grows only with the number of execution agents, that more agents always means more done, and that sampling review is the same as skipping review.

## References

1. [Chapter 10: Orchestrating Agent Teams](../../chapters/10-orchestrating-agent-teams/index.md) - the section "Review, Approval, and Researcher Attention" gives the load formula, the 300-minute load of the default team, and the 240-minute load when half of the planning outputs are reviewed.
2. [Span of control](https://en.wikipedia.org/wiki/Span_of_control) - Wikipedia article on the number of subordinates one supervisor can manage effectively.
3. [p5.js reference](https://p5js.org/reference/) - the JavaScript library used to draw the bar and create the sliders.
