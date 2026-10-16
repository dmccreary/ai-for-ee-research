# References: Simulation, Testing, and Reproducible Code

1. [Unit testing](https://en.wikipedia.org/wiki/Unit_testing) - Wikipedia - Covers automated tests of individual functions, test cases, assertions, and frameworks. Directly supports the chapter's known-answer unit tests, with a worked example and a discussion of limitations that matches the "passing is not proof" warning.

2. [Debugging](https://en.wikipedia.org/wiki/Debugging) - Wikipedia - Surveys the process of finding and fixing defects, including reproduction, tools, and techniques. Relevant to the chapter's reproduce, isolate, hypothesize, and fix procedure, and to the role of debuggers and logging.

3. [Reproducibility](https://en.wikipedia.org/wiki/Reproducibility) - Wikipedia - Defines reproducibility and replication, and covers computational reproducibility and failed replications. Frames why the chapter insists on pinned environments, seeded random numbers, and recorded provenance for every result.

4. Working Effectively with Legacy Code (1st Edition) - Michael C. Feathers - Prentice Hall - Feathers defines legacy code as code without tests and introduces characterization tests that pin down current behavior before changes. This clarifies the chapter's rule that refactoring is only safe once tests exist.

5. Why Programs Fail: A Guide to Systematic Debugging (2nd Edition) - Andreas Zeller - Morgan Kaufmann - Zeller, who originated delta debugging, presents debugging as a scientific method with a hypothesis-and-experiment loop and automated isolation of failure-inducing input. This sharpens the chapter's reproduce-isolate-fix procedure.

6. [Get Started - pytest documentation](https://docs.pytest.org/en/stable/getting-started.html) - pytest.org - Official introduction to writing and running tests, asserting that exceptions are raised, and comparing floats with tolerances. Its short worked examples mirror the chapter's ENOB tests and the pytest.raises check.

7. [Hypothesis documentation](https://hypothesis.readthedocs.io/en/latest/) - Hypothesis project - Documents property-based testing in Python, where the library generates inputs to falsify stated properties. Useful for sanity checks such as scaling and limit cases, with tutorials and how-to guides for numerical code.

8. [Best Practices for Scientific Computing](https://arxiv.org/abs/1210.0530) - arXiv (Wilson et al.) - A research-backed set of practices for scientists writing code, covering testing, version control, documentation, and automation. Supports the chapter's habits of tests, small functions, and recorded workflows for research software.

9. [Ten Simple Rules for Reproducible Computational Research](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003285) - PLOS Computational Biology - Sandve and colleagues give ten concrete rules: track how every result was produced, version custom scripts, record versions, and archive raw data. A direct source for the run-manifest and provenance practice.

10. [The Python Profilers](https://docs.python.org/3/library/profile.html) - Python documentation - Official reference for profile and cProfile, with usage examples and report interpretation using pstats. Supports the chapter's rule to measure where a program spends its time before optimizing.
