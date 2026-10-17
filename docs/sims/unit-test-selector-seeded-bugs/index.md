---
title: "Unit Test Selector for Seeded Bugs"
description: "Select at most four of eight candidate unit tests for a buggy sndr_db() function and run them to see which of three seeded bugs your selection exposes and which stay hidden."
image: /sims/unit-test-selector-seeded-bugs/unit-test-selector-seeded-bugs.png
og:image: /sims/unit-test-selector-seeded-bugs/unit-test-selector-seeded-bugs.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Unit Test Selector for Seeded Bugs

<iframe src="main.html" height="762px" width="100%" scrolling="no"></iframe>

[Run the Unit Test Selector for Seeded Bugs MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A test that passes does not prove that a function is correct. It only shows that the function gives the right answer on the input you chose. This MicroSim asks you to **apply** the idea of a known-answer test to a small Python function with three seeded bugs.

The specification says: "Return 10 times the base-10 logarithm of signal power divided by noise power. Raise ValueError if either power is not positive." The buggy implementation is:

`def sndr_db(signal, noise): return 20 * np.log10(signal / noise)`

| Bug | Description |
|---|---|
| A | Uses 20 times the logarithm instead of 10 times. |
| B | Does not raise ValueError when the noise power is 0. |
| C | Does not raise ValueError when the signal power is negative or 0. |

You may run at most four of the eight candidate tests, so you have to choose each test for what it would reveal. Bug A is the same 10 versus 20 log10 silent error as the chapter's worked example; bugs B and C hide behind boundary inputs that typical values never reach. The sim does not run real Python: it simulates the buggy function's behavior from the specification table.

## How to Use

1. Read the eight candidate tests and their expected results under the specification, and the three bugs. The question on screen is *Which tests would reveal what is wrong?* Use the **Show** menu to read the specification and the buggy implementation. On a wide screen the table and the code are shown together.
2. Check up to four tests (**Test 1** to **Test 8**). Selected rows are tinted and marked ☑.
3. Press **Run**. If more than four tests are checked, the sim refuses with *Choose at most four tests.*
4. Read the run results: each selected test is marked ✓ PASS or ✗ FAIL on the buggy code with its "Why" sentence, followed by **Bugs exposed: … Bugs hidden: …**. The first run is the one that counts as evidence, and the sim keeps it on screen.
5. Change the selection and run again as often as you like. From the second run on, choose **Show minimum set** to see the minimum set and the reason each test exposes its bug.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/unit-test-selector-seeded-bugs/main.html"
        height="762px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will apply the idea of a known-answer test by selecting, from eight candidate unit tests, a set of at most four that exposes all three seeded bugs in a function.

- **Bloom level:** Apply
- **Bloom verb:** apply

### Prerequisites

- Unit test, known-answer test, silent error, and boundary input, from the sections "Why Tests, and Which Ones" and "Debugging and Code Review" in Chapter 13

### Duration

10 minutes

### Activities

1. **Predict** (3 min): Before checking any box, write next to each bug the input that would make the buggy code disagree with the specification.
2. **Select and run** (4 min): Choose at most four tests and press Run. Record which bugs your first run exposed.
3. **Reflect** (3 min): Run again with a different selection, then open the minimum set. Explain why test 2 can never expose a bug, and why typical values such as tests 1, 5, 6 and 7 cannot expose bugs B and C.

### Evidence of Mastery

- The learner selects up to four tests and presses Run. The selection is correct when every one of the three bugs is exposed by at least one selected test and no more than four tests are selected.
- **Mastery:** a correct selection on the first run, which needs one of tests 1, 5, 6, 7 (bug A), test 3 (bug B), and one of tests 4, 8 (bug C).
- Reading the function source is exploration and is not evidence.

## References

1. [Chapter 13: Simulation, Testing, and Reproducible Code](../../chapters/13-simulation-testing-code/index.md) - the sections "Why Tests, and Which Ones" and "Debugging and Code Review" define unit tests, known-answer tests, silent errors and boundary inputs, and the worked example of the 10 versus 20 log10 error.
