---
title: "Context Window Budget Calculator"
description: "Calculate the tokens left for a completion from a context window size and the sizes of the system prompt, history, attachment, and latest message, then decide whether a requested completion fits."
image: /sims/context-window-budget-calculator/context-window-budget-calculator.png
og:image: /sims/context-window-budget-calculator/context-window-budget-calculator.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Context Window Budget Calculator

<iframe src="main.html" height="762px" width="100%" scrolling="no"></iframe>

[Run the Context Window Budget Calculator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

The context window is a shared budget: the completion draws from the same pool of tokens as the prompt. This MicroSim asks you to **calculate** how many tokens remain for the answer and to decide whether a requested completion fits, using the rule from the chapter:

Remaining = window - (system prompt + history + attachment + latest message)

When an attachment is given in words, convert it to tokens with words / 0.75. A request fits when the remaining tokens are at least the requested completion. A negative remaining figure means the prompt alone overflows the window.

The MicroSim has two parts:

| Part | What you do |
|---|---|
| Three challenges | Type the tokens remaining and choose "fits" or "does not fit". Each challenge allows two attempts. |
| Exploration mode | Move four sliders (window, system prompt, history, attachment) and watch a stacked bar of the window, the remaining space, and whether a 6,000-token completion fits. |

All window sizes and component sizes are **illustrative**; they are not the limits of any specific model. In the stacked bar each prompt component has its own color and a letter (S, H, A, M), the remaining space is a dashed outline, overflow past the window limit is hatched, and the requested completion is a bracket under the bar.

**Learning objective:** calculate the number of tokens left for a completion from a context window size and the sizes of the prompt components, and state whether a requested completion fits.

## How to Use

1. Read challenge 1. The question on screen is *How many tokens are left for the answer?*
2. Type the tokens remaining in the answer box (commas are allowed, and a negative number means the prompt overflows the window). Choose **fits** or **does not fit** for the requested completion, then press **Submit**. Both answers are checked together.
3. If the answer is wrong on the first attempt, a hint appears: check that the completion shares the window with the prompt, add all four components, then subtract from the window. Try again.
4. After a correct answer, or after a second wrong answer, the worked subtraction and the stacked bar for that challenge appear. A second wrong answer counts the challenge as missed. The running count *Challenges correct: n of 3* is shown at the top.
5. Press **Next Challenge**, and after challenge 3 press **Open Exploration Mode**.
6. In exploration mode, move the four sliders. The latest message is fixed at 400 tokens and the requested completion at 6,000 tokens. Set **Attachment** to 22,000 tokens (two 8,250-word papers) and notice that the decision changes from "fits" to "does not fit" although no single component looks large.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/context-window-budget-calculator/main.html"
        height="762px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective
The learner will calculate the number of tokens left for a completion from a context window size and the sizes of the prompt components, and state whether a requested completion fits.

- **Bloom level:** Apply
- **Bloom verb:** calculate

### Grade Level
Graduate students (MS and PhD) in electrical and computer engineering, plus postdocs and faculty who want practical AI skills for everyday research

### Duration
10-15 minutes

### Prerequisites
- Token, context window, prompt, and completion, from the sections "Tokens and Tokenization" and "The Context Window" in Chapter 2
- The estimate of tokens as words divided by 0.75

### Activities

1. **Challenges** (5-8 min): Work the three challenges in order. Do the subtraction on paper first, then commit the number and the fits decision.
2. **Exploration** (5 min): Start from the default sliders (16,000 tokens remain). Raise the attachment to 22,000 tokens and record the remaining figure and the decision. Then shrink the window to 8,000 tokens and read the overflow amount from the hatched region.
3. **Reflection** (2 min): In one sentence, explain why a prompt that fits can still leave no room for the answer.

### Assessment
- **Evidence of mastery:** for each of the three challenges, the remaining-token figure is exactly equal to the answer key and the fits decision matches. Mastery is 3 of 3 challenges correct.
- Changing the component sliders in exploration mode is exploration and is not evidence of mastery.

### Misconceptions Addressed
- The context window limits only the prompt, so the completion is free.
- Words and tokens are the same unit.
- Content that does not fit is rejected with a visible error, when it may instead be dropped silently.

## References

1. [Chapter 2: How Language Models Work](../../chapters/02-how-language-models-work/index.md) - the sections "Tokens and Tokenization" and "The Context Window" give the words-to-tokens estimate, the remaining-token formula, and the worked example the challenges are based on.
