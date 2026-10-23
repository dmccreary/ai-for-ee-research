---
title: "Temperature Next-Token Explorer"
description: "Predict whether the probability of the top-ranked and the lowest-ranked candidate token rises or falls when the sampling temperature changes, then reveal the new distribution and draw reproducible samples."
image: /sims/temperature-next-token-explorer/temperature-next-token-explorer.png
og:image: /sims/temperature-next-token-explorer/temperature-next-token-explorer.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Temperature Next-Token Explorer

<iframe src="main.html" height="722px" width="100%" scrolling="no"></iframe>

[Run the Temperature Next-Token Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

At each step a language model scores every candidate token and converts the scores into probabilities. **Temperature** reshapes those probabilities before one token is chosen:

p<sub>i</sub> = exp(z<sub>i</sub> / T) / &Sigma;<sub>j</sub> exp(z<sub>j</sub> / T)

This MicroSim shows five candidate next tokens for the illustrative prompt "The measured ENOB of the converter is", with scores 2.0, 1.0, 0.0, -1.0, and -2.0. The prompt, tokens, and scores are **illustrative, not output of a real model**; the percentages are computed from the formula over these five candidates only.

| Temperature | " 9" | " 10" | " 8" | " about" | " lower" |
|---|---|---|---|---|---|
| 0.5 | 86.5% | 11.7% | 1.6% | 0.2% | 0.0% |
| 1.0 | 63.6% | 23.4% | 8.6% | 3.2% | 1.2% |
| 2.0 | 42.9% | 26.0% | 15.8% | 9.6% | 5.8% |

You **infer** the direction of change before you see it. Three predictions ask whether a token's probability rises, falls, or stays the same when the temperature changes. After the predictions, an exploration mode offers a temperature slider (0.1 to 2.0) and a **Draw 10 Samples** button. The draws are synthetic and use a fixed seed of 42, so the same temperature always gives the same ten draws.

The token being asked about is drawn in a different color, outlined, and tagged "asked". After a reveal, a dashed outline on each bar shows the probability before the change.

**Learning objective:** infer, before it is revealed, whether the probability of the top-ranked and of the lowest-ranked candidate token rises or falls when the temperature is raised or lowered.

## How to Use

1. Read the distribution at temperature 1.0 and prediction 1: *If temperature drops to 0.5, what happens to the probability of the top token?*
2. Choose **rises**, **falls**, or **stays the same** from the list, then press **Reveal**. You have one attempt per prediction.
3. The chart changes to the new temperature. Correct answers show the old and new percentages. Incorrect answers show the correct answer, the reason, and the revealed numbers. The running count *Predictions correct: n of 3* is shown at the top.
4. Press **Next Prediction**. Each prediction starts again from temperature 1.0.
5. After prediction 3, press **Open Exploration Mode**. Drag the temperature slider across the full range and press **Draw 10 Samples** at several temperatures. Notice that the ranking never changes, and that the same ten draws become more varied as the temperature rises.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/temperature-next-token-explorer/main.html"
        height="722px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective
The learner will infer, before it is revealed, whether the probability of the top-ranked and of the lowest-ranked candidate token rises or falls when the temperature is raised or lowered.

- **Bloom level:** Understand
- **Bloom verb:** infer

### Grade Level
Graduate students (MS and PhD) in electrical and computer engineering, plus postdocs and faculty who want practical AI skills for everyday research

### Duration
10 minutes

### Prerequisites
- Token, probability distribution, and temperature with the formula p<sub>i</sub> = exp(z<sub>i</sub>/T) / &Sigma;<sub>j</sub> exp(z<sub>j</sub>/T), from the section "Temperature and Sampling" in Chapter 2

### Activities

1. **Predictions** (4 min): Commit each of the three predictions before revealing it. Write a one-line reason for each prediction first.
2. **Exploration** (4 min): Set the temperature to 0.1, 1.0, and 2.0 and press **Draw 10 Samples** at each. Record how many of the ten draws are the top token " 9" at each temperature.
3. **Reflection** (2 min): Explain in one sentence why low temperature makes an answer more repeatable but not more correct.

### Assessment
- **Evidence of mastery:** each of the three predictions ("rises", "falls", or "stays the same") is committed before the new distribution is shown and matches the change computed from the formula. Mastery is 3 of 3 correct.
- Dragging the temperature control freely is exploration and is not evidence of mastery.

### Misconceptions Addressed
- Low temperature makes the model more accurate.
- Temperature changes which token ranks first.
- At high temperature every token becomes equally likely.

## References

1. [Chapter 2: How Language Models Work](../../chapters/02-how-language-models-work/index.md) - the section "Temperature and Sampling" gives the softmax-with-temperature formula and the worked example of how temperature changes the odds but not the ranking.
