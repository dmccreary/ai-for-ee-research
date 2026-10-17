---
title: "Citation Verification Judge"
description: "Judge eight model-generated citations as Verified, Wrong details, Unsupported claim, or Fabricated, using the results of four simulated database lookups."
image: /sims/citation-verification-judge/citation-verification-judge.png
og:image: /sims/citation-verification-judge/citation-verification-judge.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Citation Verification Judge

<iframe src="main.html" height="802px" width="100%" scrolling="no"></iframe>

[Run the Citation Verification Judge MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A fabricated citation is the signature hallucination of research use: it is well formed, so it passes a glance. Citations fail in four distinct ways, and this MicroSim asks you to **judge** which one applies to each of eight records, using the evidence of a simulated database lookup rather than the look of the citation.

| Verdict | Meaning |
|---|---|
| Verified | The paper exists, the details match, and the paper supports the claim |
| Wrong details | The paper exists, but year, venue, volume, pages, or an author is wrong |
| Unsupported claim | The paper exists and the details are right, but it does not say what the model claimed |
| Fabricated | No such paper exists |

The verdict follows a fixed order of checks. If the exact title is not found, or the DOI resolves to a different paper, the verdict is Fabricated. Otherwise, if the authors, venue, or year do not match the database, the verdict is Wrong details. Otherwise, if the paper's text does not support the claim, the verdict is Unsupported claim. Otherwise the verdict is Verified.

All eight records are **invented for this exercise**. Authors, titles, claims, and DOIs are not real, and the DOI prefix 10.9999 is not assigned. Each lookup result is marked with a symbol as well as a color: a check mark for yes, an X for no, an exclamation mark for a DOI that resolves to a different paper, and a dash for not applicable.

**Learning objective:** judge each of eight model-generated citations as verified, wrong details, unsupported claim, or fabricated, using the results of a simulated database lookup, with at least 7 of 8 judged correctly.

## How to Use

1. Read record 1: the model's citation and the claim the model attached to it. The question on screen is *Is this citation safe to use as written?*
2. Open the four lookup checks in any order with **Check DOI**, **Check title**, **Check details** (authors, venue, and year), and **Check text** (does the paper's text support the claim). Each button reveals that check's result for the record.
3. Choose a verdict from the list and press **Submit**. You have one attempt per record.
4. Read the feedback. **Correct** shows the verdict and the reason. **Not quite** shows the reason, the correct verdict, and the misconception the record tests. All four lookup results are opened after you submit.
5. Press **Next Record**. After record 8, press **See Score** to see *n of 8 correct*, whether the mastery threshold of 7 was met, and the missed verdicts grouped by the misconception each exposes. On a narrow screen, press **More Missed Records** to page through the list.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/citation-verification-judge/main.html"
        height="802px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective
The learner will judge each of eight model-generated citations as verified, wrong details, unsupported claim, or fabricated, using the results of a simulated database lookup, with at least 7 of 8 judged correctly.

- **Bloom level:** Evaluate
- **Bloom verb:** judge

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research

### Duration
10-15 minutes

### Prerequisites
- Hallucination, fabricated citation, and the four ways a citation can fail, from the section "Hallucination and Fabricated Citations" in Chapter 2

### Activities

1. **Judging** (8 min): Work through the eight records in order. For each record, open the checks, apply the order of checks, and commit a verdict.
2. **Review** (4 min): On the summary screen, read each group of missed verdicts and state which check you skipped or misread.
3. **Transfer** (3 min): Take one citation from a model-generated reference list in your own work and run the four checks yourself with a bibliographic database.

### Assessment
- **Evidence of mastery:** at least 7 of the 8 verdicts equal the answer key on the first attempt.
- Viewing the lookup results is exploration and is not evidence of mastery.

### Misconceptions Addressed
- A citation with a well-formed DOI and a real journal name is real.
- If the paper exists, the claim is supported.
- A wrong year or volume means the paper is fabricated.

## References

1. [Chapter 2: How Language Models Work](../../chapters/02-how-language-models-work/index.md) - the section "Hallucination and Fabricated Citations" defines the four citation outcomes and the lookup procedure this MicroSim simulates.
