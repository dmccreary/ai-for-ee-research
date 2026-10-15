---
title: "Verification Method Matcher"
description: 'Recommend which of five verification methods (known-answer test, independent method, primary source check, cross-model check, replication) best fits each of eight illustrative AI-assisted claims, with feedback on every choice.'
social:
   cards: false
quality_score: 0
status: built
---

# Verification Method Matcher

<iframe src="main.html" height="712px" width="100%" scrolling="no"></iframe>

[Run the Verification Method Matcher MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A check is only as useful as the kind of error it can catch. This MicroSim asks you to **recommend** a verification method for each of eight claims or situations that come up in AI-assisted EE research. Each claim could be wrong in a different way, so no single favorite method scores well. The five methods come from the section "Kinds of Checks" in Chapter 17:

| Method | What it guards against |
|---|---|
| Known-answer test | Implementation errors |
| Independent method | Method-specific errors and shared assumptions |
| Primary source check | Misquotation, fabrication, outdated facts |
| Cross-model check | Gross errors, a screening aid |
| Replication | Non-reproducible results |

All eight claims are invented for illustration and are labeled "illustrative" on screen. Each claim has exactly one correct method, chosen by what the claim could be wrong about: an implementation, a method, a quotation, a screening question, or recurrence.

## How to Use

1. Read the claim in the dark-blue box. The question on screen is *What could be wrong with this claim, and which check would reveal it?* The table below the claim lists the five methods and what each one guards against.
2. Choose a method in the drop-down list below the drawing area. The chosen row is marked with ▸ and "(selected)". Press **Submit**. You get one attempt per claim, and the answer cannot be changed after you submit it.
3. Read the feedback. A correct choice shows **✓ Correct: *method*.** and an incorrect one shows **✗ The better fit is *method*.**, each followed by the "Why" sentence. The correct method is always revealed: its row is outlined and marked with ✓, and a wrong choice is marked with ✗.
4. Press **Next Claim** to continue. The claims appear in a fixed order from 1 to 8.
5. After claim 8, press **See Score**. The summary shows *n of 8 correct*, whether the mastery threshold of 7 was met, and all eight claims grouped by their correct method, each marked ✓ or ✗ with the method you chose. If the groups do not fit on one screen, press **Next Page**.
6. Press **Start Over** to play the claims again. Every run's score stays on screen, but only the first run counts as evidence of mastery.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/verification-method-matcher/main.html"
        height="712px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will recommend which of five verification methods best fits each of eight AI-assisted claims, with at least 7 of 8 matching the answer key.

- **Bloom level:** Evaluate
- **Bloom verb:** recommend

### Grade Level

Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research

### Duration

10-15 minutes

### Prerequisites

- Known-answer test, independent method, primary source check, cross-model check, and replication, all defined in the section "Kinds of Checks" in Chapter 17
- The idea that an independent check has different failure causes from the thing it checks

### Activities

1. **Exploration** (3 min): Read the table of the five methods and what each guards against. Reading the table is exploration, not evidence of mastery.
2. **Assessment** (5 min): Work through the eight claims in order, one attempt each, and record the first-run score.
3. **Discussion** (5 min): On the summary screen, look at the claims grouped by method. For any miss, use the "Why" sentence to name what the claim could have been wrong about. Discuss why asking the same model again is not an independent check, and why a cross-model check flags claims rather than proving them.

### Assessment

- **Evidence of mastery:** for each of the eight claims the learner commits one of the five methods. A method is correct when it equals the answer key. Mastery is at least 7 of 8 correct on the first attempt.
- Reading the table of methods is exploration and is not evidence.

### Common Misconceptions

1. Asking the same model again is an independent check.
2. A cross-model check proves a claim.
3. A single check method suits every claim.

## References

1. [Chapter 17: Verification and Reproducibility](../../chapters/17-verification-reproducibility/index.md) - the section "Kinds of Checks" defines the five methods and is the source of Table 1, whose "What it guards against" column appears in this MicroSim.
