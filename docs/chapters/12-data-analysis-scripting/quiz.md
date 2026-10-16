# Quiz: AI-Assisted Data Analysis and Scripting

Test your understanding of measurement data formats, cleaning, exploratory analysis, Python scripts, error messages, and reproducibility with these 10 review questions.

---

#### 1. What is the recommended pattern for storing measurement values together with their metadata?

<div class="upper-alpha" markdown>
1. An image file showing the plotted data
2. A single binary file for both values and metadata
3. A Word document with embedded tables
4. A CSV file for values with a JSON sidecar for metadata
</div>

??? question "Show Answer"
    The correct answer is **D**. CSV stores tabular values in a readable, diffable form, while JSON's nested structure suits metadata such as sampling rate, supply, and date. Binary files are not diffable, and images or Word documents cannot be read by analysis scripts.

    **Concept Tested:** Data Formats

    **See:** ./index.md#data-and-its-formats





---

#### 2. When reading a Python traceback, where should you look first for the cause of the error?

<div class="upper-alpha" markdown>
1. At the very first line of the traceback
2. In the middle of the call stack
3. At the import statements near the top
4. At the bottom, especially the last line and the nearest line in your code
</div>

??? question "Show Answer"
    The correct answer is **D**. The bottom of the traceback names the exception and the failing statement. The entry nearest the bottom that is in your own code is usually where the mistake lives. The top lines show the chain of calls that led there.

    **Concept Tested:** Error Messages

    **See:** ./index.md#reading-error-messages





---

#### 3. Why is it important to keep raw measurement data files read-only?

<div class="upper-alpha" markdown>
1. To prevent the agent from reading them
2. Because raw data cannot be regenerated and must be protected
3. To make the files smaller on disk
4. Because agents cannot read read-only files
</div>

??? question "Show Answer"
    The correct answer is **B**. Raw measurements are the one thing a prompt cannot recreate, so they must be preserved. Read-only status ensures cleaning scripts write to `data/processed/` and never overwrite the original capture.

    **Concept Tested:** Measurement Data

    **See:** ./index.md#data-and-its-formats





---

#### 4. What is the main danger of a catch-all exception handler in an analysis script?

<div class="upper-alpha" markdown>
1. It makes the script run too slowly
2. It prevents the script from loading data
3. It can hide errors and let the script produce wrong results silently
4. It always causes the script to crash
</div>

??? question "Show Answer"
    The correct answer is **C**. A catch-all handler that swallows exceptions can make a script appear to succeed while it uses default values, skips data, or computes incorrectly. Errors should be allowed to stop the script unless they are logged and re-raised.

    **Concept Tested:** Error Messages

    **See:** ./index.md#reading-error-messages





---

#### 5. Why is exploratory analysis performed before computing final statistics?

<div class="upper-alpha" markdown>
1. It catches problems like clipping, short records, and wrong frequencies that would make downstream numbers meaningless
2. It replaces the need for data cleaning
3. It is required by all journals before submission
4. It eliminates the need for uncertainty estimates
</div>

??? question "Show Answer"
    The correct answer is **A**. Exploratory checks such as range, clipping fraction, and spectrum shape reveal data problems early. They do not replace cleaning, journal requirements, or uncertainty analysis.

    **Concept Tested:** Exploratory Analysis

    **See:** ./index.md#exploring-analyzing-and-plotting





---

#### 6. A cleaning script encounters a value that is far from the others but has no documented cause. What should the script do?

<div class="upper-alpha" markdown>
1. Remove it because it is an outlier
2. Keep it, report it, and investigate it
3. Replace it with the mean of the other values
4. Stop and ask for a new measurement
</div>

??? question "Show Answer"
    The correct answer is **B**. An undocumented outlier is information, not necessarily an artifact. It should be kept, reported, and investigated. Removal needs a documented cause such as a known fault or duplicate.

    **Concept Tested:** Data Cleaning

    **See:** ./index.md#cleaning-without-hiding





---

#### 7. A Python script fails with `FileNotFoundError: data/raw/capture-7.csv`, but the directory contains `data/raw/capture-07.csv`. What is the most likely cause?

<div class="upper-alpha" markdown>
1. NumPy is not installed
2. The CSV file is corrupted
3. The script has the wrong filename
4. The script needs more memory
</div>

??? question "Show Answer"
    The correct answer is **C**. The error names a file that does not exist while a similarly named file does, so the path in the script is likely wrong. Module installation, corruption, and memory issues produce different error messages.

    **Concept Tested:** Error Messages

    **See:** ./index.md#reading-error-messages





---

#### 8. A notebook produces results that look correct, but restarting the kernel and running all cells changes the numbers. What does this indicate?

<div class="upper-alpha" markdown>
1. The notebook should be published as-is
2. The code is correct but the kernel is faulty
3. The results are not reproducible from the notebook's code alone
4. The data files have changed
</div>

??? question "Show Answer"
    The correct answer is **C**. Jupyter notebooks can have hidden state from cells run out of order. Restart-and-run-all is the standard reproducibility test, and a changed result means the notebook's visible code does not determine the output.

    **Concept Tested:** Notebook Environment

    **See:** ./index.md#environments-and-notebooks





---

#### 9. A cleaning step removes several data points and improves the headline ENOB. What is the most responsible way to report this?

<div class="upper-alpha" markdown>
1. Report the result both with and without the cleaning step, and document the cause for each removed point
2. Report only the improved result because the cleaning was justified
3. Remove the step from the script to avoid complexity
4. Report only the un-cleaned result to be conservative
</div>

??? question "Show Answer"
    The correct answer is **A**. Transparency about the effect of cleaning and the documented cause for each removal keeps the analysis honest. Reporting only one side, or removing the step, hides the sensitivity of the result to the decision.

    **Concept Tested:** Data Cleaning

    **See:** ./index.md#cleaning-without-hiding





---

#### 10. A script reads ADC codes from a CSV but then raises `TypeError: unsupported operand type(s) for -: 'str' and 'float'`. What is the most likely root cause?

<div class="upper-alpha" markdown>
1. The FFT length is not a power of two
2. The Hann window is missing
3. The sampling rate in the sidecar is wrong
4. The CSV has a header line that was not skipped, so the codes were loaded as strings
</div>

??? question "Show Answer"
    The correct answer is **D**. A string cannot be subtracted from a float, which means the numeric data were read as strings, often because a header row was treated as data. FFT length, window choice, and sampling rate affect the computation but not the data type.

    **Concept Tested:** Analysis Script

    **See:** ./index.md#analysis-scripts-in-python
