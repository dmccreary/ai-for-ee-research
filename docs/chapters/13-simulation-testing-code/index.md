---
title: "Simulation, Testing, and Reproducible Code"
description: "How to trust AI-written research code: unit tests, code review, debugging, silent errors, numerical sanity checks, simulation scripts and parameter sweeps, circuit and HDL code with testbenches, and reproducible environments with data provenance."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 11:08:42"
version: 1.11
---

# Simulation, Testing, and Reproducible Code

## Summary

This chapter focuses on trusting AI-written research code: unit tests, code review, debugging, silent errors, and numerical sanity checks. It covers simulation scripts, parameter sweeps, signal processing, circuit simulation, HDL code and testbenches, and reproducible environments. After this chapter you can test and document code an agent wrote before relying on its results.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Unit Tests | 7 |
| Code Review | 2 |
| Debugging | 5 |
| Silent Errors | 2 |
| Numerical Sanity Check | 1 |
| Simulation Script | 13 |
| Parameter Sweep | 1 |
| Signal Processing | 1 |
| Circuit Simulation | 1 |
| HDL Code | 2 |
| Testbench Generation | 1 |
| Test Data | 1 |
| Reproducible Environment | 2 |
| Data Provenance | 3 |
| Code Documentation | 1 |
| Refactoring | 1 |
| Performance Profiling | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 4: Context Engineering and Advanced Prompting](../04-context-engineering-prompting/index.md)
- [Chapter 5: Markdown Project Files and Version Control](../05-markdown-and-version-control/index.md)
- [Chapter 12: AI-Assisted Data Analysis and Scripting](../12-data-analysis-scripting/index.md)

!!! mascot-welcome "Code That Runs Is Not Code That Is Right"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    An agent's code almost always runs. The danger is the code that runs and returns a plausible, wrong number. This chapter gives you the tests and sanity checks that turn "it ran" into "it is right". Trust, but verify!

## Why Tests, and Which Ones

The central difficulty with AI-written research code is that it fails quietly. A syntax error announces itself. A unit mistake, a wrong index, or a formula that is nearly right produces a clean run and a number that looks reasonable. **Silent errors** are exactly these: defects that cause no exception and no warning and change the result. Research code is especially exposed because the right answer is not known in advance, so nothing signals that the answer is wrong.

A worked example makes the point. Suppose the signal and noise are powers, and the code converts their ratio to decibels with the voltage formula, `20 * log10(ratio)`, instead of the power formula, `10 * log10(ratio)`. For a power ratio of about 316,000 the correct figure is 55.0 dB. The buggy code returns 110.0 dB. The ENOB formula of Chapter 4 then gives \( (110.0 - 1.76) / 6.02 \approx 18.0 \) bits for a 10-bit converter. The code ran and printed a number to two decimal places. Only a person who knows that a converter cannot exceed its nominal resolution would notice.

Three defenses work together, and none is sufficient alone. *Unit tests* check that code returns known answers on chosen inputs. *Numerical sanity checks* test results against physical and definitional limits. *Code review* has a person or another agent read the code, and especially the diff, for what it does.

A **unit test** is a small automated check that calls one function with a chosen input and compares the output with an expected value. In Python the usual tool is pytest, which runs every function whose name begins with `test_`. A good test of a research function has a known answer, and it is best to build the known answer independently of the code. Before the example: the test generates an ideal 10-bit quantization of a full-scale sine wave, for which the ENOB is, by construction, 10, and checks that the function agrees within 0.1 bit.

```python
import numpy as np
from enob import enob            # the function under test

def ideal_record(n_bits=10, n=4096, cycles=127):
    t = np.arange(n)
    x = 0.5 + 0.5 * np.sin(2 * np.pi * cycles * t / n)   # full-scale sine, 0..1
    return np.round(x * (2**n_bits - 1)).astype(int)

def test_ideal_quantizer_gives_nominal_bits():
    assert abs(enob(ideal_record()) - 10.0) < 0.1

def test_added_noise_lowers_enob():
    rng = np.random.default_rng(1)               # fixed seed: repeatable
    noisy = ideal_record() + rng.normal(0, 2, 4096)   # 2 LSB of noise
    assert 7.0 < enob(noisy) < 7.5

def test_short_record_is_rejected():
    import pytest
    with pytest.raises(ValueError):
        enob(np.arange(10))
```

The second test shows a useful habit: the expected range follows from a hand calculation (noise of 2 LSB with quantization noise of 0.29 LSB lowers the ENOB by about 2.8 bits). The test therefore encodes understanding, and not just whatever the code currently returns.

!!! mascot-tip "Ask the Agent for the Tests First"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before an agent writes the function, have it write the tests from your acceptance criteria, and read them. A test file is shorter than the code and exposes the agent's understanding of the problem. If a test encodes the wrong expectation, you will find it in two minutes instead of after a week of results.

## Numerical Sanity Checks

A **numerical sanity check** tests a result against something that must be true regardless of the details of the computation. It does not prove that a value is right. It can prove that it is wrong, which is often all you need. Five kinds of check cover most research code.

- *Definitional limits*: an ADC's ENOB cannot exceed its nominal resolution by more than a small margin, and a probability lies between 0 and 1.
- *Physical limits*: efficiency is at most 100 percent, power dissipated in a passive circuit is not negative, and a causal system does not respond before its input.
- *Hand calculation*: an order-of-magnitude result that you can compute on paper. For an RC low-pass filter the cutoff is \( f_c = 1 / (2\pi R C) \). With R = 1 kΩ and C = 100 nF that is about 1.59 kHz, so a simulation that reports 15.9 kHz has a unit or parameter error.
- *Scaling*: a linear system doubles its output when the input is doubled, and a quantity that should scale as the square of amplitude should quadruple.
- *Limit cases*: a zero input produces zero output, and a very large resistor draws almost no current.

#### Diagram: Numerical Sanity Check Judge

<details markdown="1">
<summary>Numerical Sanity Check Judge</summary>
Type: microsim
**sim-id:** numerical-sanity-check-judge<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge each of eight reported results as plausible or as violating one of four kinds of sanity check, with at least 7 of 8 judged correctly.

**Prerequisites:** numerical sanity check and its four failing kinds (exceeds a limit, disagrees with a hand calculation, violates scaling, impossible value), all defined in the section "Numerical Sanity Checks" above.

**Evidence of Mastery:** For each of eight results the learner commits one of five verdicts. A verdict is correct when it equals the verdict in Content. Mastery is at least 7 of 8 correct on the first attempt. Reading the hint about each check is exploration and is not evidence.

**Misconceptions:** (1) A result printed to many digits is precise and therefore right. (2) A result that is merely different from expectation is an error. (3) A simulation result can be trusted because the simulator is well known.

**Instructional Rationale:** Evaluate-level work needs the learner to apply criteria to a result and name which criterion it fails. Three of the items are plausible, so that the learner does not treat every result as suspect.

**Content:**

All results are invented for illustration and labeled "illustrative".

| # | Reported result | Correct verdict | Why (shown as feedback) |
|---|---|---|---|
| 1 | A 10-bit ADC is reported to have an ENOB of 17.98 bits. | Exceeds a limit | ENOB cannot exceed the nominal resolution by more than a small margin. This is the 10 versus 20 log10 error. |
| 2 | A 10-bit ADC is reported to have an ENOB of 9.2 bits at 1 MS/s. | Plausible | It is below the nominal resolution by a typical amount. |
| 3 | A low-dropout regulator is reported to have a power efficiency of 104 percent. | Exceeds a limit | Efficiency cannot exceed 100 percent. |
| 4 | An RC low-pass filter with R = 1 kΩ and C = 100 nF is simulated and the -3 dB frequency is 1.59 kHz. | Plausible | It agrees with 1 / (2 pi R C) = 1.59 kHz. |
| 5 | An RC low-pass filter with R = 1 kΩ and C = 100 nF is simulated and the -3 dB frequency is 15.9 kHz. | Disagrees with a hand calculation | It is ten times the hand calculation of 1.59 kHz, which suggests a wrong parameter or unit. |
| 6 | A sweep of 64 points reports 64 different supply power values, all between 41 and 49 µW. | Plausible | The values are positive, bounded, and vary with the swept parameter as expected. |
| 7 | A linear filter gives an output of 0.05 V for a 0.1 V input and 0.15 V for a 0.2 V input. | Violates scaling | Doubling the input of a linear system must double the output, which would be 0.10 V. |
| 8 | The noise standard deviation of a record is reported as -0.8 LSB. | Impossible value | A standard deviation is never negative. |

Verdict options: Plausible, Exceeds a limit, Disagrees with a hand calculation, Violates scaling, Impossible value.

**Provenance:** The five kinds of check and the RC formula are from the section "Numerical Sanity Checks" of this chapter. The results are invented for illustration.

**Rules:** Each result has exactly one correct verdict. A result is Plausible when it violates none of the five kinds of check. The RC cutoff is f_c = 1 / (2 pi R C), and the result is judged to disagree when it differs from the hand value by a factor of 2 or more.

**Learner Activity:**

1. The learner reads result 1.
2. The learner chooses one of the five verdicts and submits.
3. The sim shows whether it was correct, the "Why" sentence, and the quick calculation that exposes the problem if there is one.
4. After result 8, the sim shows the count correct.

**Feedback:** Eight results, one attempt each, in a fixed order. Correct: "Correct: <verdict>." plus the "Why" sentence. Incorrect: "The verdict is <verdict>." plus the "Why" sentence. The correct verdict is always revealed after the single attempt. A final score "n of 8 correct" is shown with whether the mastery threshold of 7 was met.

**Starting State:** Result 1 is shown with five verdicts and none chosen. The question on screen is "Is this result plausible, and if not, which check does it fail?"

**Chapter Anchors:** The chapter states the five kinds of check, the RC cutoff of 1.59 kHz for 1 kΩ and 100 nF, and the 17.98-bit ENOB that results from using 20 log10 on a power ratio.
</details>

<iframe src="../../sims/numerical-sanity-check-judge/main.html" height="722px" width="100%" scrolling="no"></iframe>

*MicroSim: Numerical Sanity Check Judge. [Open it fullscreen](../../sims/numerical-sanity-check-judge/main.html).*

## Debugging and Code Review

**Debugging** is finding and fixing the cause of a defect. A reliable procedure has four steps: reproduce the failure reliably, isolate it to the smallest input and the smallest piece of code that still fails, form a hypothesis about the cause and test it, and fix it with a new test that fails before the fix and passes after. An agent is good at the mechanical part of this. Your job is to insist on the test, because an agent that "fixes" a bug without a failing test has no evidence that the bug was the thing it changed. Version control helps here, since the Git history can show which commit made the result change.

**Code review** is the reading of code and its changes by someone other than the author. Reviewing an agent's code is easiest as a review of its diff. Look first at what the change touches, then at numbers and constants, then at deleted lines, and last at the logic. Four questions cover most defects: does it do what the specification says, what happens on the boundary input, is every unit stated, and is there anything in the diff you were not asking for? A second agent can do a first pass against a checklist. Treat its findings as leads and not as a verdict.

## Simulation Code

A **simulation script** is a program that sets up a model, runs it, and records the outputs, whether the model is a Python system model or a driver for a circuit simulator. It has a standard shape: read parameters, build the model, run, validate the output, and write results with their parameters. Keeping the parameters in a file, not scattered in code, is the habit that makes later changes safe.

A **parameter sweep** repeats a simulation over a grid of parameter values to see how a result depends on them. Sweeps are where agents are most useful and where cost grows fastest. Four parameters at eight values each is \( 8^4 = 4{,}096 \) runs. At 30 seconds per run that is about 34 hours sequentially, or about 4 hours on eight cores. Before launching, estimate the cost, run a coarse grid first, and make the sweep resumable by writing each result as it finishes with its parameters.

**Signal processing** code, such as filtering, FFTs, and windowing, is a frequent source of silent errors because the result depends on subtle choices: the window, the number of samples per cycle, whether the input is coherent. The remedy is the known-answer test: a synthetic sine at a known frequency and amplitude must appear at the expected bin with the expected magnitude.

**Circuit simulation** is the use of a simulator such as ngspice to compute a circuit's behavior from a netlist, and it is a task where an agent can write a netlist in seconds. A netlist is easy to write plausibly and wrongly. The standard remedies are a lint pass for floating nodes and missing end cards, attention to unit suffixes (in SPICE, `M` means milli and `MEG` means mega), and, above all, a hand calculation to compare with the simulated result, as with the RC filter.

**HDL code** is code in a hardware description language such as Verilog or VHDL. An agent can write it, and it is the area where a model's training data is thinnest and its errors most subtle, such as latches inferred by accident or mismatched widths. A **testbench** is the HDL code that drives a design with inputs and checks its outputs. **Testbench generation** by an agent saves work, with one important caveat. An agent writes tests for the cases it imagined, so a testbench is only as complete as the agent's reading of the specification. Make it self-checking, with expected values computed independently, and review its coverage against the specification, not against the design.

!!! mascot-warning "The Test That Mirrors the Code"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is asking the same agent to write the code and its tests in one step. It happens because the agent derives both from the same understanding, so a misreading appears in both and the test passes. Give the tests an independent source of truth: a hand calculation, a published value, or your own reading of the specification.

#### Diagram: Unit Test Selector for Seeded Bugs

<details markdown="1">
<summary>Unit Test Selector for Seeded Bugs</summary>
Type: microsim
**sim-id:** unit-test-selector-seeded-bugs<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** apply<br/>
**Learning Objective:** The learner will apply the idea of a known-answer test by selecting, from eight candidate unit tests, a set of at most four that exposes all three seeded bugs in a function.

**Prerequisites:** unit test, known-answer test, silent error, and boundary input, all defined in the sections "Why Tests, and Which Ones" and "Debugging and Code Review" above.

**Evidence of Mastery:** The learner selects up to four tests and presses Run. The selection is correct when every one of the three bugs is exposed by at least one selected test and no more than four tests are selected. Mastery is a correct selection on the first run. Reading the function source is exploration and is not evidence.

**Misconceptions:** (1) A test that passes proves the function is correct. (2) More tests are always better than well-chosen ones. (3) Tests of typical values catch boundary bugs.

**Instructional Rationale:** Apply-level work needs the learner to use the known-answer idea on a concrete function. The limit of four tests forces the learner to choose tests for what they would reveal and not to pick them all.

**Content:**

The function under test, written in Python with NumPy, computes a signal-to-noise-and-distortion ratio in decibels from signal and noise powers, and its specification states: "Return 10 times the base-10 logarithm of signal power divided by noise power. Raise ValueError if either power is not positive." The buggy implementation is:

`def sndr_db(signal, noise): return 20 * np.log10(signal / noise)`

It has three seeded bugs, which the sim labels as follows.

| Bug | Description |
|---|---|
| A | Uses 20 times the logarithm instead of 10 times. |
| B | Does not raise ValueError when the noise power is 0. |
| C | Does not raise ValueError when the signal power is negative or 0. |

Candidate tests, each with the expected result under the specification and the bug it exposes:

| # | Test call | Expected under the specification | Exposes bug | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | sndr_db(100, 1) | 20.0 dB | A | The buggy code returns 40.0. |
| 2 | sndr_db(1, 1) | 0.0 dB | none | log10(1) is 0, so every version returns 0.0. |
| 3 | sndr_db(10, 0) | raises ValueError | B | The buggy code does not raise ValueError for a zero noise power. |
| 4 | sndr_db(-5, 1) | raises ValueError | C | The buggy code returns NaN and does not raise ValueError. |
| 5 | sndr_db(1000, 1) | 30.0 dB | A | The buggy code returns 60.0. |
| 6 | sndr_db(2, 1) | 3.01 dB, within 0.01 | A | The buggy code returns 6.02. |
| 7 | sndr_db(4, 1) | 6.02 dB, within 0.01 | A | The buggy code returns 12.04. |
| 8 | sndr_db(0, 1) | raises ValueError | C | The buggy code returns negative infinity and does not raise ValueError. |

**Provenance:** The function and specification are invented for this exercise and mirror the dB error of the chapter's worked example.

**Rules:** A bug is exposed by a test when the buggy implementation's result differs from the expected result. The three bugs are exposed only by the tests listed against them. A selection exposes all three bugs when it contains at least one of tests 1, 5, 6, 7 (bug A), test 3 (bug B), and at least one of tests 4, 8 (bug C). The minimum correct selection has three tests.

**Learner Activity:**

1. The learner reads the specification and the buggy implementation, and the eight candidate tests with their expected results.
2. The learner selects up to four tests and presses Run.
3. The sim runs the selected tests against the buggy function and reports which pass and which fail, and which bugs remain hidden.
4. The learner may change the selection and run again. The sim then reveals the minimum set and the reason each test exposes its bug.

**Feedback:** The learner may run any number of times, and the first run is the one that counts as evidence. After each run: "Bugs exposed: <list>. Bugs hidden: <list>." If more than four tests are selected the sim refuses with "Choose at most four tests." The "Why" sentence for each selected test is shown after the run.

**Starting State:** The eight tests are shown with none selected. The question on screen is "Which tests would reveal what is wrong?"

**Chapter Anchors:** The chapter states that the 10 versus 20 log10 error is a silent error, that a test needs an independently known answer, and that boundary inputs expose bugs that typical values hide.
</details>

<iframe src="../../sims/unit-test-selector-seeded-bugs/main.html" height="762px" width="100%" scrolling="no"></iframe>

*MicroSim: Unit Test Selector for Seeded Bugs. [Open it fullscreen](../../sims/unit-test-selector-seeded-bugs/main.html).*

## Reproducible Code

**Test data** are the inputs used to exercise code. Three kinds are valuable: *synthetic* data with a known answer, such as the ideal quantizer record; *edge cases*, such as an empty record, a constant record, or a record at full scale; and a small *golden file*, a real captured record whose correct result was verified independently and is stored with the tests, so that a change that alters the result is caught.

A **reproducible environment** is a recorded and recoverable set of conditions under which code ran: the language version, the library versions, the tool versions (including the simulator and its version), the operating system if it matters, and the random seeds. Pin library versions in a requirements file, seed every random number generator, and record the simulator version in the output. For work that must be reproduced years later, a container image captures the environment more completely.

**Data provenance** is the record of where a result came from: which input files, which code version, which parameters, which environment, and when. A simple and effective form is a run manifest written beside each result.

```json
{
  "result": "results/enob-sweep-2026-10-15.csv",
  "inputs": ["data/raw/capture-07.csv"],
  "code_commit": "5cc5016",
  "parameters": {"window": "hann", "fundamental_bins": 7},
  "environment": "requirements.txt@5cc5016",
  "seed": 1,
  "run_at": "2026-10-15T11:40:00"
}
```

**Code documentation** is the written explanation of what code does, for the next reader. For research functions the part that matters most is the contract: what the inputs are, in what units, what is returned, what raises an error, and the equation or source it implements. An agent writes serviceable docstrings quickly, and you should check that the units and the formula it states are the ones the code uses.

**Refactoring** is changing the structure of code without changing its behavior, to make it clearer or easier to extend. It is a safe task for an agent only when tests already exist, because the tests are the definition of "without changing behavior". Run the tests before and after, and review the diff. **Performance profiling** is measuring where a program spends its time, usually with a profiler such as Python's `cProfile`, before optimizing. Intuition about the bottleneck is frequently wrong, and an agent's guess is no better. Profile first, change the dominant cost, and rerun the tests.

!!! mascot-thinking "Plausible Is Not a Property of the Number"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that every check in this chapter compares a result with something outside the code that produced it: a known answer, a physical limit, a hand calculation. A number cannot vouch for itself. Verification always needs a second source that does not share the first one's mistakes.

## Summary and Key Takeaways

Code from an agent is a hypothesis about how to compute a result, and the practices of this chapter are how you test that hypothesis. They are inexpensive when built in at the start and very expensive to retrofit after a number has appeared in a draft.

The main points to carry forward:

- **Silent errors** run cleanly and return wrong numbers. A 10 versus 20 log10 mistake turned a 10-bit converter into an 18-bit one.
- **Unit tests** use known answers built independently of the code, and are best written before the code.
- **Numerical sanity checks** compare results with definitional and physical limits, hand calculations, scaling, and limit cases.
- **Debugging** reproduces, isolates, hypothesizes, and fixes with a failing test, and **code review** reads the diff.
- **Simulation scripts and parameter sweeps** keep parameters in files, estimate cost first, and write results as they finish.
- **Signal processing, circuit simulation, HDL code, and testbenches** each need an independent check, because an agent tests what it imagined.
- **Test data, reproducible environments, and data provenance** make a result recoverable, and **documentation, refactoring, and profiling** keep code maintainable.

!!! mascot-celebration "Code You Can Defend"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now write a known-answer unit test, name the sanity check that a bad result fails, pick tests that expose seeded bugs, and write a run manifest that ties a result to its code and data. That is the evidence that lets an AI-written script into a paper.

The next chapter moves from verifying results to producing ideas, using agents as thinking partners without surrendering your judgment. Round up a half-formed research topic, and bring it.
