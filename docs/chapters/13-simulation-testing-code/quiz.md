# Quiz: Simulation, Testing, and Reproducible Code

Test your understanding of silent errors, unit tests, sanity checks, debugging, simulation scripts, HDL testbenches, and reproducibility with these 10 review questions.

---


#### 1. What is the term for a code defect that produces no error message or warning but changes the computed result?

<div class="upper-alpha" markdown>
1. Silent error
2. Syntax error
3. Runtime error
4. Handled exception
</div>

??? question "Show Answer"
    The correct answer is **A**. Silent errors run cleanly and return plausible wrong numbers, such as the 10 versus 20 log10 mistake that made a 10-bit converter appear to have 18-bit ENOB. Syntax and runtime errors announce themselves, and handled exceptions are explicitly caught.

    **Concept Tested:** Silent Errors

    **See:** ./index.md#why-tests-and-which-ones





---


#### 2. What is a small automated check that calls one function with chosen inputs and compares the output to an expected value?

<div class="upper-alpha" markdown>
1. Numerical sanity check
2. Code review
3. Parameter sweep
4. Unit test
</div>

??? question "Show Answer"
    The correct answer is **D**. A unit test exercises a single function with known inputs and checks the output, usually with a tool like pytest. Sanity checks validate results against physical or definitional limits, and parameter sweeps explore behavior across many inputs.

    **Concept Tested:** Unit Tests

    **See:** ./index.md#why-tests-and-which-ones





---


#### 3. Why should unit tests use known answers built independently of the code under test?

<div class="upper-alpha" markdown>
1. To make the tests run faster
2. To ensure the test does not share the same misunderstanding as the code
3. To avoid the need for code review
4. Because agents cannot write tests
</div>

??? question "Show Answer"
    The correct answer is **B**. If the test is derived from the same reasoning as the code, both can repeat the same error and pass together. An independent known answer catches the code's mistakes. Tests do not replace review, and agents can write tests.

    **Concept Tested:** Unit Tests

    **See:** ./index.md#why-tests-and-which-ones





---


#### 4. What is the main danger of asking the same agent to write both the code and its tests in one step?

<div class="upper-alpha" markdown>
1. The tests will be too difficult to read
2. The tests will run too slowly
3. A misreading of the specification can appear in both and pass unnoticed
4. The agent will refuse to write tests
</div>

??? question "Show Answer"
    The correct answer is **C**. When one agent writes both, a misunderstanding of the specification can be embedded in the code and the test simultaneously, so the test passes for the wrong reason. Independent expected values, such as hand calculations, prevent this.

    **Concept Tested:** Code Review

    **See:** ./index.md#why-tests-and-which-ones





---


#### 5. Why is a hand calculation a valuable numerical sanity check?

<div class="upper-alpha" markdown>
1. It provides an independent expected value from outside the code
2. It replaces the need for unit tests
3. It is always more accurate than the simulation
4. It can only be performed after running the simulation
</div>

??? question "Show Answer"
    The correct answer is **A**. A hand calculation gives an order-of-magnitude or exact expected value that does not depend on the program. Sanity checks complement, not replace, unit tests, and they are most useful when done before or alongside the simulation.

    **Concept Tested:** Numerical Sanity Check

    **See:** ./index.md#numerical-sanity-checks





---


#### 6. An agent reports an ENOB of 18 bits for a 10-bit ADC. Which kind of sanity check does this violate?

<div class="upper-alpha" markdown>
1. Scaling
2. Definitional limit
3. Limit case
4. Physical limit
</div>

??? question "Show Answer"
    The correct answer is **B**. ENOB cannot exceed the nominal resolution of the converter by more than a small margin, so 18 bits for a 10-bit ADC violates a definitional limit. Scaling checks how output changes with input, and limit cases check extreme inputs.

    **Concept Tested:** Numerical Sanity Check

    **See:** ./index.md#numerical-sanity-checks





---


#### 7. Before launching a parameter sweep with four parameters at eight values each, what should the researcher do first?

<div class="upper-alpha" markdown>
1. Run the full sweep immediately to save time
2. Skip the coarse grid because agents are efficient
3. Estimate the cost and run a coarse grid first
4. Use the strongest model for every point
</div>

??? question "Show Answer"
    The correct answer is **C**. A four-parameter sweep at eight values each is 4096 runs, so estimating cost and running a coarse grid first prevents wasted compute. The model strength is not the first concern, and skipping exploration is risky.

    **Concept Tested:** Parameter Sweep

    **See:** ./index.md#simulation-code





---


#### 8. An agent-generated HDL testbench passes. What is the most important additional check to increase confidence?

<div class="upper-alpha" markdown>
1. Run the testbench on a faster simulator
2. Increase the clock frequency in the testbench
3. Trust the pass because the agent wrote both design and test
4. Review the testbench coverage against the specification, with expected values computed independently
</div>

??? question "Show Answer"
    The correct answer is **D**. An agent writes tests for the cases it imagined, which may not cover the specification. Reviewing coverage and using independently computed expected values catches gaps and shared misunderstandings. Speed and clock frequency are secondary.

    **Concept Tested:** Testbench Generation

    **See:** ./index.md#simulation-code





---


#### 9. A script runs cleanly and returns a number, but a numerical sanity check shows the result is impossible. What does this demonstrate?

<div class="upper-alpha" markdown>
1. The code has a silent error
2. The sanity check is wrong because the code ran
3. The environment is not reproducible
4. The unit tests are too strict
</div>

??? question "Show Answer"
    The correct answer is **A**. A clean run does not guarantee a correct result. Sanity checks are designed to catch silent errors by comparing results with external truth. Reproducibility and test strictness are separate issues.

    **Concept Tested:** Silent Errors

    **See:** ./index.md#why-tests-and-which-ones





---


#### 10. A researcher refactors an agent-written function to make it clearer. What is the essential prerequisite before refactoring?

<div class="upper-alpha" markdown>
1. The code must be moved to a Jupyter notebook
2. The researcher must profile the function first
3. The agent must approve the changes
4. Tests must exist so that behavior-preservation can be verified
</div>

??? question "Show Answer"
    The correct answer is **D**. Refactoring changes structure without changing behavior, so tests are the definition of "without changing behavior." They should be run before and after. Notebooks, profiling, and agent approval are not prerequisites for safe refactoring.

    **Concept Tested:** Refactoring

    **See:** ./index.md#reproducible-code


