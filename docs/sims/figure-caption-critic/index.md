---
title: "Figure Caption Critic"
description: 'Critique six illustrative figure captions by naming the first failing property (Vague, Missing conditions, Undefined symbols, Overclaims) or judging that the caption has no defect.'
social:
   cards: false
quality_score: 0
status: built
---

# Figure Caption Critic

<iframe src="main.html" height="862px" width="100%" scrolling="no"></iframe>

[Run the Figure Caption Critic MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A good figure caption makes the figure readable without searching the body text for context. It states what is plotted, the conditions under which the data were obtained, how to read any markers or error bars, and makes no claim the figure cannot support. This MicroSim asks you to **critique** six captions against that checklist and name the main defect, or judge that there is none.

The checklist is applied in a fixed order, and the first property that fails is the main defect:

| Order | Judgment | Property checked |
|---|---|---|
| 1 | Vague | Does it say what is plotted against what? |
| 2 | Missing conditions | Does it state the conditions of the data? |
| 3 | Undefined symbols | Are all symbols and markers defined? |
| 4 | Overclaims | Does it claim only what the figure shows? |
| | No defect | None of the four fails. |

All six captions and their values are invented for illustration and are labeled "illustrative" on screen. Length is not a cue: one long caption has no defect, and one short caption fails. When a caption has a defect, the sim offers a short corrected caption, marked as a suggestion with a dashed border. The suggested captions were written for this sim and are illustrative too.

## How to Use

1. Read the caption in the dark-blue box and the checklist below it. The question on screen is *Could a reader understand this figure from the caption alone?*
2. Press the button for the judgment you choose. The choice is highlighted in the button row and marked with an arrow in the checklist, and you can change it until you submit.
3. Press **Submit**. Each caption gets one attempt, and the judgment cannot be changed after you submit.
4. Read the feedback. A correct judgment shows **Correct: &lt;judgment&gt;.** and an incorrect one shows **The main issue is &lt;judgment&gt;.**, followed by the reason. The correct judgment is outlined and marked with a check mark, and a wrong pick is marked with an X. Where the caption has a defect, a suggested corrected caption appears below the reason.
5. Press **Next** to go to the next caption. The six captions come in a fixed order.
6. After caption 6, press **See Score**. The summary shows *n of 6 correct* and whether the mastery threshold of 5 was met.

All buttons can be reached with the Tab key and pressed with Enter or Space.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/figure-caption-critic/main.html"
        height="862px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will critique each of six figure captions by naming its main defect, or that it has none, with at least 5 of 6 judged correctly.

### Bloom Level and Verb

Evaluate (L5): **critique**

### Prerequisites

- Figure caption and the four properties of a good caption (what is plotted, conditions, how to read it, no unsupported claim), from the section "Figures, LaTeX, and References" in Chapter 15

### Evidence of Mastery

- For each of six captions the learner commits one of five judgments. A judgment is correct when it equals the answer key.
- Mastery is at least 5 of 6 correct on the first attempt.
- Reading the checklist is exploration and is not evidence.

## References

1. [Chapter 15: Manuscript Preparation](../../chapters/15-manuscript-preparation/index.md) - the section "Figures, LaTeX, and References" defines figure captions and the properties of a good caption.
