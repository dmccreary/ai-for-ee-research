---
title: "Paper Section Sorter"
description: "Classify ten illustrative sentences from one invented engineering paper into Abstract, Introduction, Related work, Method, Results, or Discussion by the reader question each answers."
image: /sims/paper-section-sorter/paper-section-sorter.png
og:image: /sims/paper-section-sorter/paper-section-sorter.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Paper Section Sorter

<iframe src="main.html" height="742px" width="100%" scrolling="no"></iframe>

[Run the Paper Section Sorter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Readers rely on the standard structure of a research paper: they go to the results for the numbers and to the discussion for the limits. Each section answers one reader question, and a sentence belongs in the section whose question it answers. This MicroSim asks you to **classify** ten sentences from one invented paper on offset calibration for a SAR ADC into one of six sections:

| Section | The reader's question |
|---|---|
| Abstract | Should I read this? |
| Introduction | Why does this matter? |
| Related work | What is already known? |
| Method | What exactly was done? |
| Results | What was found? |
| Discussion | What does it mean, and what are the limits? |

All ten sentences and their values are invented for illustration and are labeled "illustrative" on screen. Because they come from one paper, you can compare how the same numbers and ideas appear in different sections. Watch for three traps: a sentence with a number is not always a result, a contribution statement can appear outside the abstract, and a limitation belongs in the discussion.

## How to Use

1. Read the sentence in the dark-blue box. The question on screen is *Which reader question does this sentence answer?* The six sections and their reader questions are listed below the sentence.
2. Press the button for the section you choose. The choice is highlighted in the button row and marked with an arrow in the list, and you can change it until you submit.
3. Press **Submit**. Each sentence gets one attempt, and the choice cannot be changed after you submit.
4. Read the feedback. A correct choice shows **Correct: &lt;section&gt;.** and an incorrect one shows **This belongs in &lt;section&gt;.**, followed by the reason. The correct section is outlined and marked with a check mark, and a wrong pick is marked with an X.
5. Press **Next** to go to the next sentence. The ten sentences come in a fixed order.
6. After sentence 10, press **See Score**. The summary shows *n of 10 correct*, whether the mastery threshold of 8 was met, and all ten sentences grouped by section, each marked with a check mark (classified correctly) or an X (classified incorrectly, with the section you chose). If the groups do not fit on one screen, press **More Sections** to page through them.

All buttons can be reached with the Tab key and pressed with Enter or Space.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/paper-section-sorter/main.html"
        height="742px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will classify each of ten sentences from an engineering paper into the section where it belongs, with at least 8 of 10 classified correctly.

### Bloom Level and Verb

Understand (L2): **classify**

### Prerequisites

- The sections of a paper and the reader question each answers, from the section "Structure, Outline, and Abstract" in Chapter 15

### Evidence of Mastery

- For each of ten sentences the learner commits one of six sections. A classification is correct when it equals the answer key.
- Mastery is at least 8 of 10 correct on the first attempt.
- Reading the table of sections is exploration and is not evidence.

## References

1. [Chapter 15: Manuscript Preparation](../../chapters/15-manuscript-preparation/index.md) - the section "Structure, Outline, and Abstract" defines the sections of a paper, the reader question each answers, and the anatomy of an abstract.
