---
title: "Measurement Data Cleaning Decision Simulator"
description: "Judge eight anomalies in a synthetic batch of device offset measurements: keep, exclude with log, correct and log, or remeasure, using the documented cause as the criterion."
image: /sims/data-cleaning-decision-simulator/data-cleaning-decision-simulator.png
og:image: /sims/data-cleaning-decision-simulator/data-cleaning-decision-simulator.png
social:
   cards: false
quality_score: 0
status: built
---

# Measurement Data Cleaning Decision Simulator

<iframe src="main.html" height="752px" width="100%" scrolling="no"></iframe>

[Run the Measurement Data Cleaning Decision Simulator MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Every cleaning choice changes the answer, and nothing in the cleaned file marks that a choice was made. This MicroSim asks you to **judge** eight anomalies in a batch of 40 devices whose offset voltages were measured in millivolts. The batch and its lab notebook excerpts are synthetic, invented for this exercise, and the sim says so on screen.

For each anomaly you commit one of the four responses from the section "Cleaning Without Hiding" in Chapter 12:

| Action | When it applies |
|---|---|
| Keep | Variation is physical or consistent with expected noise |
| Exclude with log | A documented cause, such as a duplicate, a missing-value code, or a known fault |
| Correct and log | A documented systematic error, such as a unit mismatch |
| Remeasure | The data cannot support the analysis, such as a stuck or missing channel |

The criterion is the documented cause. A value with no documented cause is kept, however surprising it looks. Exclusion needs a documented cause. Missing or unusable measurements are sent for remeasurement, not cleaned. Two of the eight anomalies are surprising values that should be kept, and two are problems that cleaning cannot fix.

## How to Use

1. Read the anomaly in the dark-blue box and the lab notebook excerpt below it. The question on screen is *What should happen to this data?*
2. Press one of the four action buttons: **Keep**, **Exclude with log**, **Correct and log**, or **Remeasure**. The chosen button gets a thick border and bold text. You can change your choice until you submit.
3. Press **Submit**. You get one attempt per anomaly.
4. Read the feedback. A correct choice shows *Correct: action.* with a check mark; an incorrect choice shows *The better response is action.* with an X. Both are followed by the "Why" sentence and the **Cleaning log entry** that this case would add to the log. The correct action's button is marked with a check mark and a wrong pick with an X.
5. Press **Next Anomaly** to continue. The eight anomalies come in a fixed order.
6. After the eighth anomaly, press **See Score**. The summary shows *n of 8 correct*, whether the mastery threshold of 7 was met, and how many rows the actions you chose kept, excluded, corrected, and sent for remeasurement. The lot B unit mismatch and capture 12 are listed by name because the batch description does not give them a row count.

Reload the page to start again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/data-cleaning-decision-simulator/main.html"
        height="752px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will judge, for each of eight anomalies in a batch of measurements, whether to keep, exclude with a log, correct and log, or remeasure, with at least 7 of 8 correct.

- **Bloom level:** Evaluate
- **Bloom verb:** judge

### Prerequisites

- Data cleaning, the three rules of honest cleaning, and the four responses in the section "Cleaning Without Hiding" in Chapter 12

### Duration

10 minutes

### Evidence of Mastery

For each of the eight anomalies the learner commits one of the four actions. An action is correct when it equals the answer-key action. Mastery is at least 7 of 8 correct on the first attempt. Reading the lab notebook excerpt is exploration and is not evidence.

### Misconceptions Addressed

- An outlier should be removed because it is an outlier.
- A suspicious value can be edited in the raw file.
- Any problem with the data can be fixed by cleaning.

### Discussion

After the run, compare device 17 and device 31. Both are far outside the 0.5 to 2.1 mV range of the other devices. Explain in one sentence why one is excluded and the other is kept, and what a yield analysis would lose if device 31 were removed.

## References

1. [Chapter 12: AI-Assisted Data Analysis and Scripting](../../chapters/12-data-analysis-scripting/index.md) - the section "Cleaning Without Hiding" defines the four actions and the honest-cleaning rules used as the answer key.
