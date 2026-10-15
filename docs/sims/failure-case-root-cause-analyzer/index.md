---
title: "Failure Case Root Cause Analyzer"
description: "Attribute six illustrative research failure cases to one of six root causes, then see the control from an earlier chapter that would have caught each one, with a score of n of 6 and a mastery threshold of 5."
image: /sims/failure-case-root-cause-analyzer/failure-case-root-cause-analyzer.png
og:image: /sims/failure-case-root-cause-analyzer/failure-case-root-cause-analyzer.png
social:
   cards: false
quality_score: 0
status: built
---

# Failure Case Root Cause Analyzer

<iframe src="main.html" height="832px" width="100%" scrolling="no"></iframe>

[Run the Failure Case Root Cause Analyzer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A **failure case** is a specific instance in which something went wrong, described with its cause, how it was found, and what changed. The visible symptom is rarely the root cause. This MicroSim asks you to **attribute** six failure cases to the missing practice that let each one through, and connects each one to the control from an earlier chapter that would have caught it.

The six root causes are:

| Root cause | Control that would have caught it |
|---|---|
| Missing sanity check | A numerical check against the nominal resolution (Chapter 13) |
| Unverified model claim | A primary source check with the location of the claim (Chapters 11 and 17) |
| Unreviewed diff | Diff review and a number check (Chapters 5 and 15) |
| Environment drift | A pinned environment and a rerun of known-answer tests (Chapter 13) |
| Scope too broad | Single-purpose skills with their own tests (Chapter 7) |
| Untraceable claim | A claim-to-source table with measured, cited, or expected labels (Chapters 11 and 15) |

Each failure case has exactly one correct root cause and exactly one control. All six cases are invented or adapted for illustration and are labeled "illustrative" on screen. They come in a fixed order, and each case gets one attempt.

**Learning objective:** attribute each of six failure cases to its root cause and to the control that would have caught it, with at least 5 of 6 attributed correctly.

## How to Use

1. Read failure case 1 in the dark-blue box. The question on screen is *What was missing that let this through?*
2. Choose one of the six root causes in the drop-down list below the drawing. The cause you pick is outlined and marked with an arrow in the list on screen.
3. Press **Submit**. The choice is committed and cannot be changed.
4. Read the feedback. A correct choice shows **Correct:** and the cause; an incorrect choice shows **The root cause is** and the correct cause. Both show the control that would have caught the failure and the "Why" sentence. In the list, the correct cause is marked with a check and a wrong pick with a cross.
5. Press **Next Case** to continue. After case 6, press **See Score** to see *n of 6 correct*, whether the mastery threshold of 5 was met, and a table of the six causes with their controls. Reload the page to start again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/failure-case-root-cause-analyzer/main.html"
        height="832px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10 minutes

### Prerequisites
- The controls of earlier chapters: numerical sanity checks, primary source checks, diff review, pinned environments, single-purpose skills, and claim-to-source tracing
- The section "Lessons Learned and Failure Cases" in Chapter 20

### Learning Objective
The learner will attribute each of six failure cases to its root cause and to the control that would have caught it, with at least 5 of 6 attributed correctly.

- **Bloom level:** Analyze
- **Bloom verb:** attribute

### Activities

1. **Attribution** (5 min): Work through the six cases once, in order. For each case, look past the symptom and ask which practice was missing.
2. **Discussion** (5 min): For each miss, read the "Why" sentence and name the chapter whose control applies. Discuss why "the model made a mistake" and "read more carefully" are not root causes: each failure has a control that would have caught it mechanically.

### Evidence of Mastery
- For each of six failure cases the learner commits one of six root causes, and the sim shows the control. A choice is correct when it equals the cause in the answer key.
- **Mastery:** at least 5 of 6 correct on the first attempt. Each case has one attempt, so the final score line, *n of 6 correct*, is the evidence.
- Reading the list of controls is exploration and is not evidence.

## References

1. [Chapter 20: Case Studies and Capstone Project](../../chapters/20-case-studies-capstone/index.md) - the section "Lessons Learned and Failure Cases" defines failure cases and is the source of the six cases, their root causes, and their controls.
