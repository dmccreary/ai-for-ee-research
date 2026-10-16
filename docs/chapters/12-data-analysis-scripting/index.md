---
title: "AI-Assisted Data Analysis and Scripting"
description: "Using AI on the data side of research: data formats, measurement data, cleaning, exploratory analysis and visualization, writing and debugging Python analysis scripts and notebooks, and keeping errors visible instead of hidden."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 11:07:08"
version: 1.11
---

# AI-Assisted Data Analysis and Scripting

## Summary

This chapter applies AI to the data side of research: choosing data formats, cleaning measurement data, exploring and visualizing it, and writing analysis scripts and notebooks in Python. It emphasizes keeping errors visible rather than hidden. After this chapter you can prompt an agent to write, run, and debug an analysis on a real dataset.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Data Formats | 12 |
| CSV and JSON | 1 |
| Measurement Data | 14 |
| Data Cleaning | 9 |
| Exploratory Analysis | 8 |
| Statistical Analysis | 1 |
| Data Visualization | 6 |
| Python | 46 |
| Plotting | 1 |
| Analysis Script | 25 |
| Error Messages | 6 |
| Dependency Management | 3 |
| Notebook Environment | 3 |
| Jupyter Notebook | 2 |
| Notebook to Script | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 5: Markdown Project Files and Version Control](../05-markdown-and-version-control/index.md)
- [Chapter 8: Agents, Tool Use, and Subagents](../08-agents-tool-use-subagents/index.md)

!!! mascot-welcome "Let the Agent Write It, Let the Data Check It"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    An agent will write an analysis script in a minute that would take you an hour. What it cannot know is whether your data are clean or whether the answer is plausible. This chapter is about arranging the work so that wrong results announce themselves. Trust, but verify!

## Data and Its Formats

**Measurement data** are the numbers recorded from an instrument, a simulator, or a sensor: captured ADC codes, waveform samples, sweep results, power readings. They have properties that generic datasets do not. They carry noise and quantization. They depend on instrument settings that must be recorded with them. They can contain artifacts: saturation, dropped samples, a probe that slipped. And they are the one thing in a project that you cannot regenerate with a prompt, so they must be protected.

A **data format** is the file layout in which data are stored. The choice affects what agents and scripts can do with them.

**CSV and JSON** are the two plain-text formats to prefer. CSV, comma-separated values, stores a table with one row per record and one column per quantity. It is simple, readable in any editor, and diffable. Its weakness is that it has no types or units, so the meaning of a column must be recorded elsewhere. JSON stores nested key-value structures, which suits metadata: instrument, settings, date, operator, and units. A reliable pattern is a CSV of values with a JSON sidecar file of the same name that describes them.

| Format | Strength | Weakness | Use for |
|---|---|---|---|
| CSV | Simple, readable, diffable | No units or types; large files are slow | Tables of measured values |
| JSON | Nested, self-describing | Verbose for large arrays | Settings and metadata |
| NumPy `.npy` or HDF5 | Compact, fast, typed arrays | Binary, not diffable | Large waveform records |
| Vendor instrument format | Complete instrument state | Opaque, tool-specific | Archive, then convert to an open format |

*Table 1. Common data formats and what they suit.*

A worked example shows a capture with its sidecar. Everything the analysis needs to interpret the numbers is in the two files, and nothing depends on remembering.

```text
# data/raw/capture-07.csv  (one ADC output code per line)
512
531
...
```

```json
{
  "file": "capture-07.csv",
  "instrument": "bench-ADC-board",
  "sampling_rate_hz": 1000000,
  "input_frequency_hz": 499000,
  "nominal_bits": 10,
  "supply_v": 1.0,
  "captured": "2026-10-09",
  "samples": 4096
}
```

!!! mascot-tip "Raw Is Read-Only, Always"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Put captured files in `data/raw/`, make them read-only, and never write to that directory from a script. Everything downstream is generated into `data/processed/`. Then a bad cleaning step can be rerun from the original, and an agent has a boundary it can obey.

## Cleaning Without Hiding

**Data cleaning** is preparing data for analysis by dealing with missing values, duplicates, unit mismatches, and artifacts. Done carelessly it is the quietest source of wrong results in research, because every choice changes the answer and nothing marks that a choice was made. Three rules keep it honest.

First, *cleaning is a script, not an edit*. The raw file is never changed. A script reads it, applies named steps, and writes a new file. Second, *every change is logged*: how many rows were dropped, which, and why. Third, *remove only for a documented cause*. A point is removed because the notebook says the probe slipped, not because it is inconvenient. A point that is merely an outlier is information about the distribution, and removing it is a claim about the system.

A worked example with illustrative numbers: a batch of 40 devices has measured offsets between 0.5 and 2.1 mV, with one device at 12 mV and one at 6.8 mV. The 12 mV device has a lab-notebook entry reading "probe slipped, remeasure". Excluding it is justified, and the exclusion is recorded with the reason. The 6.8 mV device has no such entry and is a valid part. It stays in the data, is reported, and is investigated, because a real tail in the distribution is exactly what a yield analysis is meant to find.

| Action | When it applies | What to record |
|---|---|---|
| Keep | Variation is physical or consistent with expected noise | Nothing, or a note that it was examined |
| Exclude with log | A documented cause, such as a duplicate, a missing-value code, or a known fault | Row identifiers, count, and reason |
| Correct and log | A documented systematic error, such as a unit mismatch | The conversion, its justification, and the rows |
| Remeasure | The data cannot support the analysis, such as a stuck or missing channel | Which measurements and why |

*Table 2. Four responses to an anomaly, and what to record for each.*

#### Diagram: Measurement Data Cleaning Decision Simulator

<details markdown="1">
<summary>Measurement Data Cleaning Decision Simulator</summary>
Type: microsim
**sim-id:** data-cleaning-decision-simulator<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, for each of eight anomalies in a batch of measurements, whether to keep, exclude with a log, correct and log, or remeasure, with at least 7 of 8 correct.

**Prerequisites:** data cleaning, the three rules of honest cleaning, and the four responses in the section "Cleaning Without Hiding" above.

**Evidence of Mastery:** For each of eight anomalies the learner commits one of four actions. An action is correct when it equals the action in Content. Mastery is at least 7 of 8 correct on the first attempt. Reading the lab notebook excerpt is exploration and is not evidence.

**Misconceptions:** (1) An outlier should be removed because it is an outlier. (2) A suspicious value can be edited in the raw file. (3) Any problem with the data can be fixed by cleaning.

**Instructional Rationale:** Evaluate-level work needs the learner to apply a stated criterion, the documented cause, to concrete cases. The cases include two where the right answer is to keep a surprising value and two where cleaning is the wrong response.

**Content:**

The batch is synthetic, labeled "synthetic, invented for this exercise". It is 40 devices with offset voltages measured in millivolts, and the lab notebook is available for each anomaly.

| # | Anomaly | Notebook excerpt | Correct action | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | Device 17 reads 12 mV, while the other devices read 0.5 to 2.1 mV. | "Device 17: probe slipped during measurement, remeasure." | Exclude with log | There is a documented cause, so exclusion is justified and the reason is recorded. |
| 2 | Device 31 reads 6.8 mV, while the other devices read 0.5 to 2.1 mV. | No entry. | Keep | There is no documented fault, so the value is data. It is reported and investigated. |
| 3 | The temperature column reads 0.0 for devices 8 to 12. | "Logger cable disconnected for devices 8 to 12." | Remeasure | The values are missing and cannot be recovered or inferred. |
| 4 | Rows for devices 22 and 23 appear twice in the merged file. | "Merged files A and B; overlap at 22 and 23." | Exclude with log | The duplicates are artifacts of the merge, and one copy of each is kept. |
| 5 | All values in lot B are about one thousand times smaller than in lot A. | "Lot A exported in mV; lot B exported in V." | Correct and log | A documented unit mismatch is converted, and the conversion is recorded. |
| 6 | The value -999 appears in three rows of the offset column. | "Instrument writes -999 when a reading fails." | Exclude with log | -999 is the instrument's missing-value code, so those rows have no measurement. |
| 7 | Six devices from one wafer edge read about three times higher than the rest. | No entry. | Keep | A systematic spatial pattern is a finding about the process and is not an artifact. |
| 8 | In capture 12 the ADC output is the same code for all 4,096 samples. | "Input cable not connected for capture 12." | Remeasure | The record contains no information about the converter. |

**Provenance:** The four actions and the honest-cleaning rules are from the section "Cleaning Without Hiding" of this chapter. The batch and the notebook excerpts are synthetic.

**Rules:** Each anomaly has exactly one correct action. Exclusion requires a documented cause. A value with no documented cause is kept. Missing or unusable measurements require remeasurement and are not cleaned.

**Learner Activity:**

1. The learner reads anomaly 1 with its notebook excerpt.
2. The learner chooses one of the four actions and submits.
3. The sim shows whether it was correct and the "Why" sentence, and what would be recorded in the cleaning log.
4. After anomaly 8, the sim shows the count correct and a summary of how many rows were kept, excluded, corrected, and sent for remeasurement.

**Feedback:** Eight anomalies, one attempt each, in a fixed order. Correct: "Correct: <action>." plus the "Why" sentence. Incorrect: "The better response is <action>." plus the "Why" sentence. The correct action is always revealed after the single attempt. A final score "n of 8 correct" is shown with whether the mastery threshold of 7 was met.

**Starting State:** Anomaly 1 is shown with the four actions and no choice made. The question on screen is "What should happen to this data?"

**Chapter Anchors:** The chapter states four actions (keep, exclude with log, correct and log, remeasure), that removal needs a documented cause, that an undocumented outlier is kept and investigated, and that raw files are never edited.
</details>

<iframe src="../../sims/data-cleaning-decision-simulator/main.html" height="752px" width="100%" scrolling="no"></iframe>

*MicroSim: Measurement Data Cleaning Decision Simulator. [Open it fullscreen](../../sims/data-cleaning-decision-simulator/main.html).*

## Exploring, Analyzing, and Plotting

**Exploratory analysis** is looking at the data before computing anything on it: its size, ranges, distributions, and shape. For a captured ADC record that means the number of samples, the minimum and maximum code, the fraction of samples at full scale, a plot of the codes against time, and a plot of the spectrum. These steps are cheap, and they catch the problems that make a downstream number meaningless: a clipped waveform, a record that is too short, a signal at the wrong frequency.

**Statistical analysis** is the quantification of what the data show and how sure you can be. For measurements the basics are enough to start: the mean and standard deviation across repeated runs, a confidence interval, and the number of independent samples behind a claim. State the sample size beside every statistic. A mean of nine chips and a mean of three hundred are different claims, and an agent will happily write both in the same sentence.

**Data visualization** is the graphical display of data, and **plotting** is the act of producing a plot, in Python typically with the Matplotlib library. A plot that supports a claim has labeled axes with units, a legend where there is more than one series, a visible indication of uncertainty or spread, and the raw data shown and not only a fit. When an agent writes the plot, read it as a reviewer would: are the units on the axes, is the scale honest, is anything cropped, and does it show what the text says it shows?

!!! mascot-warning "Cleaning That Improves the Result"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is a cleaning step that happens to make the number better. It happens because an agent asked to "get a clean result" has an incentive to remove what hurts it. Whenever a cleaning step changes a headline number, report the result both with and without it, and ask what documented cause justified the step.

## Analysis Scripts in Python

**Python** is the language in which most research analysis is now written, and an agent writes it fluently. An **analysis script** is a program that reads data, applies a defined procedure, and writes results, and it is the unit of reproducible analysis: the script, run on the raw data, produces the figure and the table. Analysis that exists only as a sequence of manual steps cannot be repeated.

Before the example, the key ideas of the code in plain terms. The script loads codes from a file. It computes the fraction of samples at the minimum or maximum code, which signals clipping. It windows the record with a Hann window, a smooth taper that reduces spectral leakage when the signal is not exactly periodic in the record. It computes the power spectrum, excludes the DC bin explicitly, takes the fundamental as the largest remaining bin and its neighbors, treats everything else as noise and distortion, and converts the ratio to ENOB with the formula of Chapter 4. Notice that failures are loud: a short record raises an error, and clipping is printed.

```python
import numpy as np

def load_codes(path, n_bits):
    codes = np.loadtxt(path, dtype=int)
    if codes.size < 64:
        raise ValueError(f"record too short: {codes.size} samples")
    clipped = np.mean((codes <= 0) | (codes >= 2**n_bits - 1))
    print(f"samples={codes.size}  clipped={clipped:.4%}")
    return codes, clipped

def enob(codes):
    x = codes - codes.mean()
    spec = np.abs(np.fft.rfft(x * np.hanning(x.size))) ** 2
    spec[0] = 0.0                      # exclude DC explicitly
    k = int(np.argmax(spec))
    lo, hi = max(k - 3, 1), k + 4      # fundamental plus leakage bins
    signal = spec[lo:hi].sum()
    noise = spec.sum() - signal        # noise and distortion
    sndr_db = 10 * np.log10(signal / noise)
    return (sndr_db - 1.76) / 6.02
```

To have an agent write something like this, give it the specification and acceptance criteria of Chapter 4, point it at one raw file and its sidecar, require loud failure, and ask it to print the quantities it used. Then run it on the synthetic known-answer record from the acceptance criteria before you run it on real data. A script that cannot reproduce a known answer is not ready for an unknown one.

## Reading Error Messages

An **error message** is the program's report that something went wrong. In Python it appears as a traceback: a stack of lines, each naming a file, a line number, and the function being executed, ending with the exception type and a message. Read it from the bottom. The last line names the kind of failure and the reason. The line just above it shows the statement that failed. The lines above that show the chain of calls that led there, and the entry nearest the bottom that is in *your* code is where to look first.

Error messages are the most useful information an agent has, and agents sometimes hide them: a `try` block that catches every exception and carries on, a default value substituted silently, a warning filtered out. These make a script appear to work while it computes the wrong thing. A rule that serves well is to let the script fail, and to treat any catch-all handler an agent adds as a defect to remove unless it logs the error and stops.

#### Diagram: Python Traceback Reader

<details markdown="1">
<summary>Python Traceback Reader</summary>
Type: microsim
**sim-id:** python-traceback-reader<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** examine<br/>
**Learning Objective:** The learner will examine five Python tracebacks and identify the cause of each from the exception type, message, and failing line, with at least 4 of 5 correct.

**Prerequisites:** error message, traceback, exception type, and the rule of reading a traceback from the bottom, all defined in the section "Reading Error Messages" above.

**Evidence of Mastery:** For each of five tracebacks the learner chooses one of three diagnoses. A diagnosis is correct when it equals the answer in Content. Mastery is at least 4 of 5 correct on the first attempt. Expanding the full traceback is exploration and is not evidence.

**Misconceptions:** (1) The first line of a traceback shows the problem. (2) A ValueError that the code raised on purpose is a bug in the code. (3) Every error is a code defect.

**Instructional Rationale:** Analyze-level work needs the learner to attribute an error to its source from the evidence in the traceback. Options include a plausible but wrong cause for each item, so that the learner must read the message and not only the exception type.

**Content:**

Each traceback is invented and labeled "illustrative".

| # | Traceback (condensed) | Option A | Option B | Option C | Correct | Why (shown as feedback) |
|---|---|---|---|---|---|---|
| 1 | File "scripts/enob.py", line 12, in load_codes: FileNotFoundError: [Errno 2] No such file or directory: 'data/raw/capture-7.csv' | The file path is wrong; the file is named capture-07.csv | The CSV file is corrupted | NumPy is not installed | A | The message names a file that does not exist, and the data directory holds capture-07.csv. |
| 2 | File "scripts/enob.py", line 8, in load_codes: ValueError: record too short: 12 samples | A bug in np.loadtxt | The input record is too short, and the script rejected it as designed | The window function is wrong | B | The script raised this error deliberately, so the input is the problem and not the code. |
| 3 | File "scripts/plot.py", line 1, in <module>: ModuleNotFoundError: No module named 'scipy' | The environment does not have scipy installed | The script has a typo in a variable name | The data file is empty | A | The import failed before any other code ran, which points to the environment. |
| 4 | File "scripts/enob.py", line 17, in enob: IndexError: index 4096 is out of bounds for axis 0 with size 4096 | The CSV has too many columns | An off-by-one in an index or slice that reaches one past the end | The sampling rate is wrong | B | An index equal to the array size is one past the last valid index, which is 4095. |
| 5 | File "scripts/enob.py", line 14, in enob: TypeError: unsupported operand type(s) for -: 'str' and 'float' | The data were loaded as text because a header line was not skipped | The FFT length is not a power of two | The Hann window is missing | A | A string cannot be subtracted from a float, which suggests the codes were read as strings, often because of a header row. |

**Provenance:** The reading rule is from the section "Reading Error Messages" of this chapter. The tracebacks, file names, and messages are invented for illustration.

**Rules:** Each traceback has exactly one correct diagnosis, given above. The sim must shuffle the option order independently for each learner.

**Learner Activity:**

1. The learner sees traceback 1, condensed to the file, line, function, and message.
2. The learner chooses one of the three diagnoses and submits.
3. The sim reveals the correct diagnosis and the "Why" sentence, and highlights the part of the traceback that determines it.
4. After traceback 5, the sim shows the count correct.

**Feedback:** Five tracebacks, one attempt each, in a fixed order. Correct: "Correct." plus the "Why" sentence. Incorrect: the correct diagnosis and the "Why" sentence. The correct answer is always revealed after the single attempt. A final score "n of 5 correct" is shown with whether the mastery threshold of 4 was met.

**Starting State:** Traceback 1 is shown with three diagnoses and none chosen. The question on screen is "What does this error tell you about the cause?"

**Chapter Anchors:** The chapter states that a traceback is read from the bottom, that the last line names the failure, that the nearest line of your own code is where to look first, and that a deliberately raised error points to the input.
</details>

<iframe src="../../sims/python-traceback-reader/main.html" height="762px" width="100%" scrolling="no"></iframe>

*MicroSim: Python Traceback Reader. [Open it fullscreen](../../sims/python-traceback-reader/main.html).*

## Environments and Notebooks

**Dependency management** is recording and controlling the libraries a script needs, so that it runs the same way tomorrow and on another machine. The minimum is a virtual environment, an isolated set of installed packages for one project, and a file listing the packages and their versions, for example a `requirements.txt` generated with `pip freeze`. Without this, a script that worked in March fails in October because a library changed, and the failure looks like a bug in your analysis.

A **notebook environment** is an interactive document that mixes code, results, and text, with the code run in cells. A **Jupyter notebook** is the standard form: a file of cells that run in a live session. Notebooks are excellent for exploration, because you see each result as you build it. They have two weaknesses that matter for research. The state of a session depends on the order in which cells were run, so a notebook can show results that its own code cannot reproduce. And the file format mixes code and output, which makes diffs hard to read.

**Notebook to script** is the move from exploration to reproducibility: once the analysis is settled, the code is extracted from the notebook into a script or module, which is then run from the top on the raw data. A reliable check before you trust any notebook is to restart the kernel and run all cells in order. If the results change, the notebook was lying. A good habit is to keep the notebook as the narrative and figure producer, with real logic in tested functions in a script that the notebook imports.

## Summary and Key Takeaways

An agent changes how fast analysis code is written and nothing about what makes an analysis trustworthy. The practices are those of a careful experimentalist: record the context of every number, protect the raw data, make every change visible, check the code on a known answer, and let errors stop the work.

The main points to carry forward:

- **Measurement data** need their settings recorded. Prefer **CSV and JSON** with a sidecar, and keep raw files read-only.
- **Data cleaning** is a logged script, and removal needs a documented cause. Outliers are information.
- **Exploratory analysis** comes before computation and catches clipping, short records, and wrong frequencies.
- **Statistics and plots** state sample size, units, and spread, and show the raw data.
- **An analysis script** fails loudly, prints the quantities it used, and is checked on a known-answer record first.
- **Error messages** are read from the bottom, and a catch-all handler that hides them is a defect.
- **Dependency management** and a **notebook-to-script** discipline make results reproducible, and restart-and-run-all is the test.

!!! mascot-celebration "An Analysis That Argues Back"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now keep raw data untouched, clean with a logged and justified script, read a traceback from the bottom, and test an analysis script on a known answer before real data. That makes wrong results visible, which is the point.

The next chapter extends the same discipline to code that simulates and tests circuits and systems, where silent errors are the main danger. Round up one script an agent has written for you, and bring it.

[See Annotated References](./references.md)
