---
title: "Numerical Sanity Check Judge"
description: "Judge eight illustrative reported results as Plausible or as failing a sanity check (exceeds a limit, disagrees with a hand calculation, violates scaling, or impossible value), with one attempt each and a mastery threshold of 7 of 8."
image: /sims/numerical-sanity-check-judge/numerical-sanity-check-judge.png
og:image: /sims/numerical-sanity-check-judge/numerical-sanity-check-judge.png
social:
   cards: false
quality_score: 0
status: built
---

# Numerical Sanity Check Judge

<iframe src="main.html" height="722px" width="100%" scrolling="no"></iframe>

[Run the Numerical Sanity Check Judge MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A numerical sanity check cannot prove that a result is right, but it can prove that a result is wrong. This MicroSim asks you to **judge** eight reported results, one at a time and in a fixed order, and to give each one of five verdicts:

| Verdict | What it means |
|---|---|
| Plausible | The result violates none of the checks |
| Exceeds a limit | A definitional or physical limit is broken, such as ENOB above the nominal resolution or efficiency above 100 percent |
| Disagrees with a hand calculation | The result differs from a paper estimate by a factor of 2 or more, such as an RC cutoff that is not near \( 1 / (2\pi R C) \) |
| Violates scaling | A linear system does not double its output when its input is doubled |
| Impossible value | The quantity can never take that value, such as a negative standard deviation |

All eight results are invented for illustration. Three of them are plausible, so that you do not learn to treat every number as suspect. The results include the 17.98-bit ENOB that comes from using 20 log10 on a power ratio and the RC low-pass filter with R = 1 kΩ and C = 100 nF, whose cutoff is 1.59 kHz.

## How to Use

1. Read the reported result in the box. The question on screen is *Is this result plausible, and if not, which check does it fail?*
2. Choose one of the five verdict buttons. The chosen button is marked with a filled circle (◉). You can change your choice until you submit.
3. Press **Submit**. Each result gets one attempt. The sim shows **Correct: <verdict>.** (with a check mark) or **The verdict is <verdict>.** (with a cross), the "Why" sentence, and, when the result has a problem, the quick calculation that exposes it.
4. Press **Next** to continue. After result 8, press **See Score** to see *n of 8 correct* and whether the mastery threshold of 7 was met.
5. Optional: check **Show the checks** to read a one-line hint about each kind of check. Reading the hints is exploration and does not affect the score.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/numerical-sanity-check-judge/main.html"
        height="722px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will judge each of eight reported results as plausible or as violating one of four kinds of sanity check, with at least 7 of 8 judged correctly.

- **Bloom level:** Evaluate
- **Bloom verb:** judge

### Prerequisites

- Numerical sanity check and its four failing kinds (exceeds a limit, disagrees with a hand calculation, violates scaling, impossible value), from the section "Numerical Sanity Checks" in Chapter 13
- The RC low-pass cutoff \( f_c = 1 / (2\pi R C) \) and the ENOB of an ADC

### Duration

10 minutes

### Activities

1. **Judge** (5 min): Work through the eight results with one attempt each. Before you submit, write the quick calculation you would use to test the result.
2. **Review** (5 min): For each result you judged incorrectly, compare your quick calculation with the one the sim showed. Decide which misconception led you astray: trusting a number because it is printed to many digits, calling any surprising result an error, or trusting a result because the simulator is well known.

### Evidence of Mastery

- For each of the eight results the learner commits one of five verdicts. A verdict is correct when it equals the answer key.
- **Mastery:** at least 7 of 8 verdicts correct on the first attempt.
- Reading the hint about each check is exploration and is not evidence.

## References

1. [Chapter 13: Simulation, Testing, and Reproducible Code](../../chapters/13-simulation-testing-code/index.md) - the section "Numerical Sanity Checks" defines the kinds of check, the RC cutoff of 1.59 kHz for 1 kΩ and 100 nF, and the 17.98-bit ENOB that results from using 20 log10 on a power ratio.
