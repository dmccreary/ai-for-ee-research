---
title: "Prompt Chain Builder"
description: "Arrange six prompt-chain steps for a verified Walden figure-of-merit table into an order that respects their dependencies, and choose a testable acceptance check for each step."
social:
   cards: false
quality_score: 0
status: built
---

# Prompt Chain Builder

<iframe src="main.html" height="842px" width="100%" scrolling="no"></iframe>

[Run the Prompt Chain Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

**Prompt chaining** breaks a long task into separate prompts, where the output of one becomes the input of the next, with a check between them. This MicroSim asks you to **implement** a six-step chain for the goal:

> "Produce a verified comparison table of five SAR ADC papers by Walden figure of merit."

The Walden figure of merit is

\[
\text{FoM} = \frac{P}{2^{\text{ENOB}} \cdot f_s},
\]

with \( P \) in watts and \( f_s \) in hertz, giving energy per conversion step in joules, so lower is better.

You do two things. First, arrange the six step cards into an order in which every step comes after the steps it needs. The order is partly forced and partly free: one step can sit in more than one place, so there are three valid orders, not one. Second, choose one of three candidate acceptance checks for each step. Only one check per step is testable, meaning a script or a second reader could decide it. The options are shown in a shuffled order, so their position carries no information. The test row values in one of the checks (9.0 ENOB, 50 µW, 1 MS/s) are illustrative.

**Learning objective:** implement a six-step prompt chain by placing the steps in an order that respects their dependencies and choosing a testable acceptance check for each step, with a valid order and at least 5 of 6 testable checks.

## How to Use

1. Read the goal. The six cards, labeled **Card A** to **Card F**, start in a scrambled order under *Your chain*; step 1 runs first. The question on screen is *In what order can these steps run, and how would you know each one worked?*
2. Choose a card in the first drop-down list. The selected card is outlined and marked with ▶, and its full text and its three candidate checks appear in the panel below.
3. Press **Move Up** or **Move Down** to change the card's place in the chain. The drop-down list shows each card's current position, such as *Card C (#3)*.
4. Use the second drop-down list to choose **Check 1**, **Check 2**, or **Check 3** for the selected card. The chosen check is outlined and marked with ●, and the chain shows which check each card has.
5. When all six cards have a check, press **Submit**. The sim says *Valid order.* or names the first violated dependency in the form *Invalid: &lt;step&gt; needs &lt;step&gt; first.*, where steps are named S1 to S6 with their card letters. It shows the score *Order valid: yes or no; checks: n of 6*, whether you met the mastery condition, and, for each step, whether your check was correct, the testable check, and the reason. Press **Next Page** to see the rest of the steps.
6. Press **Reset** to try again with a new scramble. Only the first submission counts as evidence; its result stays on screen during later attempts.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/prompt-chain-builder/main.html"
        height="842px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
15 minutes

### Prerequisites
- Prompt chaining, from the section "Multi-Step Prompts and Prompt Chaining" in Chapter 4
- Acceptance criteria, from the section "Task Specification and Acceptance Criteria" in Chapter 4
- Source grounding, from the section "Managing the Context Window" in Chapter 4

### Learning Objective
Implement a six-step prompt chain by placing the steps in an order that respects their dependencies and choosing a testable acceptance check for each step, with a valid order and at least 5 of 6 testable checks.

- **Bloom level:** Apply
- **Bloom verb:** implement

### Activities

1. **Exploration** (5 min): Read each card and write down which other card's output it needs. Notice which card could run in more than one place.
2. **Guided Practice** (5 min): Build the chain, choose the checks, and submit. For each check you missed, say why it could not be decided by a script or a second reader.
3. **Transfer** (5 min): Press **Reset** and build a different valid order. Then verify the known-answer check by hand: 50e-6 / (2^9 × 1e6) is about 9.8e-14 J, or 0.098 pJ per conversion step.

### Evidence of Mastery
- You order the six step cards and, for each step, select one of three candidate checks. The order is correct when every step comes after every step it depends on. A check is correct when it is the testable option.
- **Mastery:** a valid order and at least 5 of 6 checks correct on the first submission.
- Reading the step descriptions is exploration and is not evidence.

## References

1. [Chapter 4: Context Engineering and Advanced Prompting](../../chapters/04-context-engineering-prompting/index.md) - the section "Multi-Step Prompts and Prompt Chaining" lists the six steps of the chain and gives the Walden figure of merit.
