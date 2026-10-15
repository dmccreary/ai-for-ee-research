---
title: "Sycophancy Spotter"
description: 'Classify the model reply in each of six illustrative researcher-model exchanges as sycophantic or calibrated, and get the reason after every choice.'
social:
   cards: false
quality_score: 0
status: built
---

# Sycophancy Spotter

<iframe src="main.html" height="652px" width="100%" scrolling="no"></iframe>

[Run the Sycophancy Spotter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

**Sycophancy** is a model's tendency to agree with the user, to tell them what they appear to want to hear, and to change an answer under pushback even when no new evidence has been given. A change of answer is a warning unless the pushback contained evidence. This MicroSim asks you to **distinguish** replies that follow the researcher from replies that follow the evidence, across six short exchanges written in several tones, so that tone alone is not a cue.

The two classifications shown on screen are:

| Classification | Rule |
|---|---|
| Sycophantic | Agrees with, validates, or reverses to match the researcher's stated view without new evidence. |
| Calibrated | Changes only for supplied evidence, or states what it cannot establish and what would. |

All six exchanges are invented for illustration and are labeled "illustrative" on screen. Each exchange has exactly one correct classification.

## How to Use

1. Read the exchange in the dark-blue box: what the researcher said, then the model's reply. The question on screen is *Did the reply follow the evidence or the researcher?*
2. Press **Sycophantic** or **Calibrated**. Pressing the button submits your answer. You get one attempt per exchange, and it cannot be changed.
3. Read the feedback. A correct answer shows **✓ Correct.** and an incorrect one shows **✗ This reply is *sycophantic*** (or ***calibrated***), each followed by the "Why" sentence. The correct classification is always revealed: its definition box is outlined and marked with ✓, and a wrong choice is marked with ✗.
4. Press **Next Exchange** to continue. The exchanges appear in a fixed order from 1 to 6.
5. After exchange 6, press **See Score**. The summary shows *n of 6 correct* and whether the mastery threshold of 5 was met.
6. Press **Start Over** to play the exchanges again. Every run's score stays on screen, but only the first run counts as evidence of mastery.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/sycophancy-spotter/main.html"
        height="652px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will distinguish, among six exchanges between a researcher and a model, the replies that are sycophantic from those that are calibrated, with at least 5 of 6 classified correctly.

- **Bloom level:** Analyze
- **Bloom verb:** distinguish

### Grade Level

Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research

### Duration

10 minutes

### Prerequisites

- Sycophancy, overconfidence, uncertainty awareness, and the countermeasures, all defined in the section "Behaviors of Models That Undermine Checks" in Chapter 17

### Activities

1. **Exploration** (2 min): Read the two definitions on screen. Reading the definitions is exploration, not evidence of mastery.
2. **Assessment** (4 min): Classify the six exchanges in order, one attempt each, and record the first-run score.
3. **Discussion** (4 min): Compare exchanges 2 and 3, which concern the same 50 Hz notch. Explain why one reply is sycophantic and the other calibrated, using the presence or absence of new evidence. Then compare exchanges 4 and 5 and discuss why declining to certify novelty is not unhelpful.

### Assessment

- **Evidence of mastery:** for each of the six exchanges the learner commits "sycophantic" or "calibrated". A classification is correct when it equals the answer key. Mastery is at least 5 of 6 correct on the first attempt.
- Reading the definitions is exploration and is not evidence.

### Common Misconceptions

1. A model that changes its answer is being responsive.
2. A polite and agreeable reply is a good reply.
3. A model that declines to confirm is being unhelpful.

## References

1. [Chapter 17: Verification and Reproducibility](../../chapters/17-verification-reproducibility/index.md) - the section "Behaviors of Models That Undermine Checks" defines sycophancy, overconfidence, and uncertainty awareness and gives the countermeasures used in this MicroSim.
