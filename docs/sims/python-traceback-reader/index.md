---
title: "Python Traceback Reader"
description: "Examine five illustrative Python tracebacks and identify the cause of each from the exception type, the message, and the failing line, reading from the bottom."
image: /sims/python-traceback-reader/python-traceback-reader.png
og:image: /sims/python-traceback-reader/python-traceback-reader.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Python Traceback Reader

<iframe src="main.html" height="762px" width="100%" scrolling="no"></iframe>

[Run the Python Traceback Reader MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A Python traceback is read from the bottom. The last line names the kind of failure and the reason, the line above it shows where it happened, and the entry nearest the bottom that is in *your* code is where to look first. This MicroSim asks you to **examine** five illustrative tracebacks, each condensed to the file, line, function, and exception message, and to choose the diagnosis that the evidence supports.

Each traceback comes with three diagnoses. One is correct, and the others are plausible causes that the message rules out, so you must read the message and not only the exception type. The tracebacks, file names, and messages are invented for illustration and are labeled "Illustrative" on screen. The order of the three diagnoses is shuffled separately for each traceback every time the page loads, so two learners side by side will see different letters for the same answer.

After each submission the sim reveals the correct diagnosis and the reason, and highlights the part of the traceback that determines the cause with a gold background and an underline.

## How to Use

1. Read the traceback in the gray monospaced box and the three diagnoses below it. The question on screen is *What does this error tell you about the cause?*
2. Press **Diagnosis A**, **Diagnosis B**, or **Diagnosis C**. The chosen diagnosis is outlined and tagged *Your choice*. You can change your choice until you submit.
3. Press **Submit**. You get one attempt per traceback.
4. Read the feedback. A correct choice shows *Correct.* with a check mark; an incorrect choice shows the correct diagnosis with an X. Both are followed by the "Why" sentence. The correct diagnosis is tagged *Correct diagnosis* with a solid outline, and a wrong pick is tagged *Your choice* with a dashed outline.
5. Press **Next Traceback** to continue. The five tracebacks come in a fixed order.
6. After the fifth traceback, press **See Score** to see *n of 5 correct* and whether the mastery threshold of 4 was met.

Reload the page to start again; the diagnoses are reshuffled on each load.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/python-traceback-reader/main.html"
        height="762px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will examine five Python tracebacks and identify the cause of each from the exception type, message, and failing line, with at least 4 of 5 correct.

- **Bloom level:** Analyze
- **Bloom verb:** examine

### Prerequisites

- Error message, traceback, exception type, and the rule of reading a traceback from the bottom, from the section "Reading Error Messages" in Chapter 12

### Duration

10 minutes

### Evidence of Mastery

For each of the five tracebacks the learner chooses one of three diagnoses. A diagnosis is correct when it equals the answer-key diagnosis. Mastery is at least 4 of 5 correct on the first attempt.

### Misconceptions Addressed

- The first line of a traceback shows the problem.
- A ValueError that the code raised on purpose is a bug in the code.
- Every error is a code defect.

### Discussion

Sort the five causes into three groups: a problem with the input data, a problem with the environment, and a defect in the code. Which tracebacks point away from the code, and what in the message tells you so?

## References

1. [Chapter 12: AI-Assisted Data Analysis and Scripting](../../chapters/12-data-analysis-scripting/index.md) - the section "Reading Error Messages" states the reading rule and is the source of the answer key.
