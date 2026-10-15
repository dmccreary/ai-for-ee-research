---
title: "Falsifiable Hypothesis Sorter"
description: 'Classify eight illustrative EE research statements as "falsifiable" or "not falsifiable", with one attempt each, the reason after every answer, and a final score out of 8.'
social:
   cards: false
quality_score: 0
status: built
---

# Falsifiable Hypothesis Sorter

<iframe src="main.html" height="682px" width="100%" scrolling="no"></iframe>

[Run the Falsifiable Hypothesis Sorter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A research hypothesis has a form that an experiment could show to be wrong: under stated conditions, a stated change produces a stated effect of at least a stated size. This MicroSim asks you to **distinguish** falsifiable hypotheses from statements that no experiment could contradict.

The sim shows eight statements, one at a time, in a fixed order. All of them are invented for illustration. For each one you answer the question *Could any measurement show this to be wrong?* by choosing **Falsifiable** or **Not falsifiable**. A checklist on screen restates the rule: a falsifiable statement names a measurable quantity, a threshold or a direction and size of effect, and the conditions under which it is tested, so that some possible observation would contradict it. A statement missing any of these, or that is true under every outcome, is not falsifiable.

The not-falsifiable statements fail in different ways. Some have no metric, some leave the conditions open, one is true whatever happens, and one explains away every disagreement in advance. No single cue, such as the presence of a number or a technical tone, is enough to sort them.

**Learning objective:** distinguish falsifiable hypotheses from statements that no experiment could contradict, among eight statements, with at least 7 of 8 classified correctly.

## How to Use

1. Read the statement in the dark-blue box and the question above it: *Could any measurement show this to be wrong?*
2. Press **Falsifiable** or **Not falsifiable**. Each statement gets one attempt, and the answer is committed at once.
3. Read the feedback. A correct answer shows **Correct.** with a check mark and the "Why" sentence. An incorrect answer shows **This statement is falsifiable.** or **This statement is not falsifiable.** with an X and the "Why" sentence. For a not-falsifiable statement the feedback also names what is missing.
4. Press **Next** to go to the next statement. After statement 8, press **See Score**.
5. The final screen shows *n of 8 correct*, whether you met the mastery threshold of 7, and the correct classification of every statement. Reload the page to start again.

Feedback uses a symbol and words as well as color: a check mark for correct and an X for incorrect.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/falsifiable-hypothesis-sorter/main.html"
        height="682px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective
The learner will distinguish falsifiable hypotheses from statements that no experiment could contradict, among eight statements, with at least 7 of 8 classified correctly.

### Bloom Level
Analyze (verb: **distinguish**)

### Duration
10 minutes

### Prerequisites
- The terms hypothesis, falsifiable, metric, and condition, from the section "From Idea to Hypothesis and Experiment" in Chapter 14 and from Chapter 1

### Activities
1. Classify all eight statements in order, one attempt each.
2. For each statement you missed, use the checklist to name the element (metric, threshold or effect size, or conditions) that is present or missing, or say why the statement is true under every outcome.
3. Rewrite statement 2, "Calibration makes the ADC better", as a falsifiable hypothesis by adding a metric, a threshold, and conditions.

### Evidence of Mastery
- For each of eight statements the learner commits "falsifiable" or "not falsifiable". A classification is correct when it equals the answer key.
- Mastery is at least 7 of 8 correct on the first attempt.
- Reading the checklist of properties is exploration and is not evidence.

## References

1. [Chapter 14: Brainstorming and Problem Framing](../../chapters/14-brainstorming-problem-framing/index.md) - the section "From Idea to Hypothesis and Experiment" defines the form of a research hypothesis used in this MicroSim.
