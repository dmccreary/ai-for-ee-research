# References: Verification and Reproducibility

1. [Verification and validation](https://en.wikipedia.org/wiki/Verification_and_validation) - Wikipedia - Explains how verification (built the product right) differs from validation (built the right product) across engineering, software, and quality management. Directly supports the chapter's opening distinction and its checks against specifications.

2. [Reproducibility](https://en.wikipedia.org/wiki/Reproducibility) - Wikipedia - Covers reproducibility as a principle of the scientific method, with terminology, history, and reproducible research practices. Relevant to result replication and reproducibility packages, and distinguishes reproducing from replicating a result.

3. [Audit trail](https://en.wikipedia.org/wiki/Audit_trail) - Wikipedia - Defines an audit trail as a chronological record of events affecting an operation, with uses in finance, clinical research, and regulation. Grounds the chapter's audit trail concept and what a good record must capture.

4. Test-Driven Development: By Example (1st Edition) - Kent Beck - Addison-Wesley - Beck popularized writing the failing test first and the red-green-refactor cycle, shown through a fully worked example built in small steps. This clarifies the chapter's test-driven research: fix success criteria before seeing results.

5. Verification and Validation in Computational Science and Engineering (1st Edition) - Patrick J. Roache - Hermosa Publishers - Roache is widely credited with the compact framing that verification means solving the equations right while validation means solving the right equations. A clear, modest foundation for separating checking implementation from checking fit to reality.

6. [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548) - arXiv (Sharma et al., Anthropic) - Shows that leading AI assistants tell users what they want to hear and that preference training may reward it. Gives empirical evidence for the chapter's sycophancy countermeasures, such as neutral framing and premise flipping.

7. [Language Models (Mostly) Know What They Know](https://arxiv.org/abs/2207.05221) - arXiv (Kadavath et al.) - Studies how well language models judge the correctness of their own answers and how calibration varies with scale and format. Useful for uncertainty awareness and for why self-reported confidence needs independent checking.

8. [Ten Simple Rules for Reproducible Computational Research](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003285) - PLOS Computational Biology (Sandve et al.) - Ten practical rules, including recording how every result was produced, versioning scripts, and archiving exact program versions. A concrete checklist for building the chapter's reproducibility package and audit trail.

9. [Guide for Reproducible Research](https://book.the-turing-way.org/reproducible-research/reproducible-research) - The Turing Way - Community handbook chapter on tools and practices for making analyses rerunnable, covering code, data, environments, and documentation. Supports the clean-room run test and peer verification of a reproducibility package.

10. [Define success criteria and build evaluations](https://platform.claude.com/docs/en/docs/test-and-evaluate/develop-tests) - Claude Platform Docs (Anthropic) - Shows how to write measurable success criteria before building, then automate evaluations with code examples such as exact match and LLM-graded checks. Practical guidance for test-driven research and acceptance criteria with model output.
