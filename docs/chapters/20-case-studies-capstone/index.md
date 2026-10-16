---
title: "Case Studies and Capstone Project"
description: "Applying the whole toolkit to real work: the MicroSims arXiv paper, the intelligent textbook project and the skill pipeline behind it, what failed and what was learned, and closing with agent team design, workflow documentation, the capstone project, and an adoption plan."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 11:18:57"
version: 1.11
---

# Case Studies and Capstone Project

## Summary

This chapter applies the whole toolkit to real work: the MicroSims arXiv paper, the intelligent textbook project, and the skill pipelines behind them, including what failed and what was learned. It closes with team design, workflow documentation, the capstone project, and an adoption plan. After this chapter you can plan and run an end-to-end research task with a coordinated agent team.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Case Study | 12 |
| MicroSims Paper | 1 |
| Skill Pipeline | 3 |
| Intelligent Textbook Project | 2 |
| Textbook Workflow | 1 |
| Lessons Learned | 1 |
| Failure Case | 1 |
| Workflow Documentation | 3 |
| Agent Team Design | 3 |
| Capstone Project | 2 |
| Personal Skill Library | 2 |
| Group Workflow | 2 |
| Presentation of Results | 1 |
| Adoption Plan | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 5: Markdown Project Files and Version Control](../05-markdown-and-version-control/index.md)
- [Chapter 7: Designing, Testing, and Sharing Agent Skills](../07-designing-testing-skills/index.md)
- [Chapter 9: Supervising Agents and Defining Agent Roles](../09-supervising-agents-roles/index.md)
- [Chapter 10: Orchestrating Teams of Planning and Execution Agents](../10-orchestrating-agent-teams/index.md)
- [Chapter 15: AI-Assisted Manuscript Preparation](../15-manuscript-preparation/index.md)
- [Chapter 16: MicroSims and Research Communication](../16-microsims-communication/index.md)
- [Chapter 17: Verification and Reproducibility](../17-verification-reproducibility/index.md)
- [Chapter 18: Responsible and Ethical Use of AI](../18-responsible-ethical-use/index.md)

!!! mascot-welcome "Now Run the Whole Flock"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    You have the parts: a question, a project, skills, agents, checks, and a policy. This chapter shows them working together on real projects, including what went wrong, and ends with a capstone in which you do it yourself. Trust, but verify!

## Learning From Cases

A **case study** is a detailed account of a real project that is analyzed for what it teaches. Its value in this book is that it shows the techniques under real conditions: incomplete specifications, tools that fail, deadlines, and decisions made with partial information. The cases below are drawn from the author's own work, and the facts stated are from the project files. A fair case study includes the failures, and so does this one.

## Case Study: The MicroSims Paper

The first case is a paper written about MicroSims, the small AI-generated interactive simulations of Chapter 16. Its working title is "MicroSims: A Framework for AI-Generated, Scalable Educational Simulations with Universal Embedding and Adaptive Learning Support", and it is intended for posting to arXiv. The paper's source is a LaTeX project with a main file and eleven section files: abstract, introduction, related work, definition, design framework, technical architecture, metadata, workflow, effectiveness, discussion, and conclusion.

The workflow illustrates several chapters of this book.

- **Source material first.** The paper is not written from nothing. Its status file maps each section to an existing documentation chapter in the MicroSims repository, with word counts, and the remaining work is described as extracting and reformatting roughly 19,000 words of existing text into LaTeX with an academic tone. This is the drafting-from-claims method of Chapter 15 on a large scale.
- **Structure before prose.** The abstract, introduction, related work, and conclusion were completed first. The other sections existed as structure with placeholders for the content to be extracted. The status file lists each as complete or as having open items, which is the progress tracking of Chapter 10.
- **Build as a checked step.** A build script compiles the paper to PDF, and successive PDF versions were kept as the draft evolved. The figures follow a stated policy, PNG only, with a status file recording which of the planned figures are finished.
- **Submission packaging.** A separate source file and a zip archive exist for the arXiv submission, which is the packaging step of Chapter 15.

The case also carries a lesson about claims. In the working files the abstract states that simulations can improve conceptual understanding by up to 30 to 40 percent, drawing on physics-education studies and meta-analyses, while the effectiveness figure is described as showing *expected* benefits in different ranges. A reviewer will ask which numbers are measured, which are cited from other studies, and which are projections. The question for the author, and for any agent drafting such a section, is the claim-to-source table of Chapter 11: every number in the abstract traced to a source and labeled as measured, cited, or expected.

## Case Study: The Intelligent Textbook Project

The second case is this book. It is an intelligent textbook in the sense of Chapter 16, built by a chain of skills, and its repository records the order in its contributor instructions. A **skill pipeline** is that kind of chain, in which each skill reads the files that the previous one wrote. The **textbook workflow** has these stages, and each produces a file that can be inspected.

| Stage | Skill | Output | Check |
|---|---|---|---|
| 1 | Course description analyzer | `docs/course-description.md` with a score | Completeness against required elements |
| 2 | Learning graph generator | Concept list and dependency graph (379 concepts here) | Edge direction, cycle check, quality metrics |
| 3 | Chapter structure designer | Twenty chapter outlines with concept impact scores | Dependency order of chapters |
| 4 | Chapter content generator | Chapter text with MicroSim specifications | Concept coverage, mascot rules, strict site build |
| 5 | MicroSim generator | Interactive sims in `docs/sims/` | Review against each specification, then status |
| 6 | Glossary, FAQ, quiz, and reference generators | Supporting pages | Consistency with chapter content |

*Table 1. The textbook workflow as a skill pipeline. Each stage hands a file to the next.*

The pipeline shows the principles of the earlier chapters at work. Each skill is single-purpose (Chapter 7). The handoffs are files in a version-controlled repository (Chapters 5 and 10). The project instruction file states conventions and constraints, such as never starting the documentation server and never advancing a simulation's status to approved (Chapter 5). The status field on each simulation's page encodes the autonomy boundary: agents may mark a simulation scaffolded, built, or instrumented, and only the human author marks it approved (Chapters 9 and 16). And a learning graph, a dependency-ordered DAG of concepts, determines both the order of chapters and how much space each concept receives (Chapter 16).

!!! mascot-thinking "The Pipeline Is the Documentation"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that nothing in this workflow depends on one person remembering what was done. Every stage leaves a file, every file has a check, and the order of the stages is itself written down. That is what lets another researcher run it, or an agent resume it, in a month.

## Lessons Learned and Failure Cases

**Lessons learned** are the generalizations drawn from a project's experience, recorded so that the next project starts ahead. A **failure case** is a specific instance in which something went wrong, described with its cause, how it was found, and what changed. They are the most valuable output of a case study and the part most often left out. A record that contains only successes teaches nothing about where the controls are needed.

The generation of this book produced several failure cases of its own, and each was caught by one of the controls in this book.

- **A wrong number in an acceptance criterion.** A draft criterion for the ENOB function in Chapter 4 stated that adding noise of 2 LSB to an ideal 10-bit record would lower the result by between 1.0 and 1.5 bits. Working the arithmetic by hand showed a drop of about 2.8 bits, leaving a result near 7.2, and the criterion was corrected. A number written by a model had been plausible and wrong, and a hand calculation caught it, which is the sanity check of Chapter 13.
- **Malformed markup that rendered without error.** Several chapter drafts left stray closing tags after note blocks. The site could still be built, and the defect was found because a validation script counted opening and closing tags, a mechanical check in place of a careful reading.
- **Shorter chapters than the budget.** The chapter generator sets a word target for each concept from its importance score, and several chapters were written well below the summed targets. The decision recorded was to accept shorter chapters with worked examples and specified simulations, and not to pad with restatement. It is a legitimate trade-off, and it should be visible, which is why it is written here.
- **Interactive elements specified but not built.** The chapters contain specifications for many simulations. Until they are built, verified, and reviewed, the pages show specifications only, and the status field says so. The honest state of the work is part of its documentation.

#### Diagram: Failure Case Root Cause Analyzer

<details markdown="1">
<summary>Failure Case Root Cause Analyzer</summary>
Type: microsim
**sim-id:** failure-case-root-cause-analyzer<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** attribute<br/>
**Learning Objective:** The learner will attribute each of six failure cases to its root cause and to the control that would have caught it, with at least 5 of 6 attributed correctly.

**Prerequisites:** the controls of earlier chapters: numerical sanity checks, primary source checks, diff review, pinned environments, single-purpose skills, and claim-to-source tracing, referenced in the section "Lessons Learned and Failure Cases" above.

**Evidence of Mastery:** For each of six failure cases the learner commits one of six root causes, and the sim shows the control. A choice is correct when it equals the cause in Content. Mastery is at least 5 of 6 correct on the first attempt. Reading the list of controls is exploration and is not evidence.

**Misconceptions:** (1) A failure is caused by the model, and so there is nothing to change in the workflow. (2) The visible symptom is the root cause. (3) More careful reading would have caught each failure.

**Instructional Rationale:** Analyze-level work needs the learner to look past the symptom to the missing control. Each case is matched to a control from an earlier chapter so that the learner connects a failure to the practice that prevents it.

**Content:**

All cases are invented or adapted for illustration and labeled "illustrative". Root cause options: Missing sanity check, Unverified model claim, Unreviewed diff, Environment drift, Scope too broad, Untraceable claim.

| # | Failure case | Correct root cause | Control that would have caught it | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | A 10 versus 20 log10 error gave a 10-bit ADC an ENOB of about 18 bits, and it was noticed only when the figure was plotted. | Missing sanity check | A numerical check against the nominal resolution (Chapter 13) | The result exceeded a definitional limit, which a check would have flagged at once. |
| 2 | A literature summary cited a paper for a claim that it does not make. | Unverified model claim | A primary source check with the location of the claim (Chapters 11 and 17) | The claim was never compared with the paper. |
| 3 | An agent's edit to a results paragraph changed a measured value from 9.2 to 9.6 bits while its summary said "fixed wording". | Unreviewed diff | Diff review and a number check (Chapters 5 and 15) | The change was visible in the diff and was not read. |
| 4 | An analysis script that worked in March fails in October after a library update. | Environment drift | A pinned environment and a rerun of known-answer tests (Chapter 13) | The environment was not recorded or pinned. |
| 5 | A single skill that did analysis, wrote text, and filed tickets became unreliable at all three. | Scope too broad | Single-purpose skills with their own tests (Chapter 7) | The skill had accumulated jobs without tests for each. |
| 6 | The abstract and a figure caption quote different improvement figures, and neither names a source. | Untraceable claim | A claim-to-source table with measured, cited, or expected labels (Chapters 11 and 15) | The numbers were not tied to evidence. |

**Provenance:** The controls are from the chapters named in the table. The cases are adapted from the failure cases of this chapter and from earlier chapters, and are labeled "illustrative".

**Rules:** Each case has exactly one correct root cause, given above, and exactly one control that would have caught it.

**Learner Activity:**

1. The learner reads failure case 1.
2. The learner chooses one of the six root causes and submits.
3. The sim shows whether it was correct, the control that would have caught it, and the "Why" sentence.
4. After case 6, the sim shows the count correct and a table of the six causes with their controls.

**Feedback:** Six cases, one attempt each, in a fixed order. Correct: "Correct: <cause>." plus the control and the "Why" sentence. Incorrect: "The root cause is <cause>." plus the control and the "Why" sentence. The correct cause is always revealed after the single attempt. A final score "n of 6 correct" is shown with whether the mastery threshold of 5 was met.

**Starting State:** Failure case 1 is shown with six root causes. The question on screen is "What was missing that let this through?"

**Chapter Anchors:** The chapter lists failure cases including a wrong acceptance-criterion number caught by hand calculation, malformed markup caught by a validation script, and shorter chapters than the budget, and states that a record of only successes shows no place for controls.
</details>

<iframe src="../../sims/failure-case-root-cause-analyzer/main.html" height="832px" width="100%" scrolling="no"></iframe>

*MicroSim: Failure Case Root Cause Analyzer. [Open it fullscreen](../../sims/failure-case-root-cause-analyzer/main.html).*

!!! mascot-warning "The Record With No Failures"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is documenting only what worked. It happens because failures are embarrassing and the project moved on. The next person then repeats them without knowing where the controls belong. Write each failure case in five lines: what happened, how it was found, the root cause, the control, and what changed.

## Documenting, Designing, and Sharing

**Workflow documentation** is the written description of how a piece of work is done: the stages, their inputs and outputs, who or what performs each, the checks, and the versions of the tools. It is the artifact that turns a personal practice into one that a group can run. A README at the root of the project with a stage table like Table 1, the commands to run, and the expected outputs serves for most projects.

**Agent team design** is the specification of the team for a project: the roles, their autonomy levels, the handoffs, and the review points, using the vocabulary of Chapters 9 and 10. A design that fits on one page is a design that can be reviewed. A fragment for a project that surveys prior work and then characterizes a design:

| Role | Purpose | Autonomy | Output | Review point |
|---|---|---|---|---|
| Literature planner | Search strategy and reading list | 2 | `reading-list.md` | You approve the strategy |
| Claim extractor | Claims with locations | 2 | `comparison-table.md` | Spot-check 20 percent against sources |
| Coding agent | Analysis script and tests | 2 | `scripts/`, `tests/` | Diff review; tests pass |
| Analysis agent | Run on raw data | 3 | `results/`, manifests | Known-answer test; sanity checks |
| Reviewer agent | Check against acceptance criteria | 3 | Defect list | You read the list |
| Writing agent | Draft sections from claims | 1 | `paper/` | Number check; your revision |

*Table 2. A one-page agent team design. The levels refer to the scale of Chapter 9.*

A **personal skill library** is your own collection of skills, kept in a repository you control, built up from the repeatable tasks of your own work, as in Chapter 7. It is the most durable asset that comes out of learning to use agents: models change every few months, and your skills and instruction files carry forward. A **group workflow** extends it to a research group: a shared skills library, a common instruction file and lab policy, the shared data classification of Chapter 18, and a convention for the audit trail, so that a new member can start with the group's practices and a result can be reviewed by someone who did not produce it.

## The Capstone Project

The **capstone project** is the end-to-end exercise for the book. You plan and run a real research task, small enough to finish and real enough to need checking, with a coordinated team of agents, and you present the verified results together with an honest account of where human judgment was needed. The task should be one from your own work, for example a literature-backed comparison of design approaches, an analysis of a measurement dataset with a reproducibility package, or a short paper section with a MicroSim.

The deliverables are these.

1. *Question and criteria.* A research question with a metric and a threshold, and the acceptance criteria written before the work (Chapters 1 and 4).
2. *Project and memory.* A version-controlled repository with an instruction file, a knowledge base, and a decision log (Chapters 5 and 6).
3. *Team design.* The one-page design of the agents, roles, autonomy levels, and review points (Chapters 9 and 10).
4. *Skills.* At least one skill that you wrote and tested for a repeatable step (Chapter 7).
5. *Results and verification.* The results, each with an independent check and a sanity check, and the failures and corrections recorded (Chapters 12, 13, and 17).
6. *Reproducibility package.* Enough that a colleague can regenerate the result on a clean machine (Chapter 17).
7. *Responsible use.* A data classification, a disclosure statement, and a note on what was kept from agents (Chapter 18).
8. *Account of judgment.* A short, honest section on where human judgment changed the outcome, including at least one agent output that you rejected and why.

**Presentation of results** is the communication of the capstone to a reader or an audience. Present the question, the method, the verified results with their uncertainty, the checks performed, and the limits. Include the failure cases. An audience that sees where the process nearly went wrong learns more, and trusts the result more, than one shown only a polished outcome. Use what Chapter 16 offered: a short deck with one message, and an interactive element where the result is a dependence.

| Criterion | What an evaluator looks for |
|---|---|
| Question and criteria | Specific, measurable, with criteria written in advance |
| Team design | Roles, autonomy levels, and gates justified by risk |
| Verification | Independent checks, sanity checks, and traceable claims |
| Reproducibility | A clean-machine run reproduces the results |
| Responsible use | Classification, disclosure, and permissions followed |
| Judgment | Honest account, including rejected output |
| Communication | Clear, with limits and failures stated |

*Table 3. A capstone rubric. Weights are for the instructor or group to set.*

!!! mascot-encourage "A Capstone Feels Large Until It Is Staged"
    ![Volt encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If the list of deliverables looks like more than a semester, that reaction is normal. You have already built each piece in earlier chapters. Pick a task that you could finish by hand in a week, run it through the stages one at a time, and let each stage's output be the next stage's input.

## Adopting These Practices

An **adoption plan** is the staged introduction of these practices into a research group or a personal workflow. The sequence matters, because several steps are prerequisites for the safe use of the later ones. The next MicroSim practices that reasoning on six steps.

#### Diagram: Adoption Plan Prioritizer

<details markdown="1">
<summary>Adoption Plan Prioritizer</summary>
Type: microsim
**sim-id:** adoption-plan-prioritizer<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** prioritize<br/>
**Learning Objective:** The learner will prioritize six adoption steps for a research group into an order that respects their dependencies, and state the dependency that justifies each constraint.

**Prerequisites:** lab AI policy, project instruction file, pilot skill, verification checks, review gates, and agent team, defined in earlier chapters and in the section "Adopting These Practices" above.

**Evidence of Mastery:** The learner arranges six steps in a sequence and submits. The order is correct when every dependency in Rules holds. For each violated dependency the learner is shown the reason, and mastery is a valid order on the first submission. Reading the step descriptions is exploration and is not evidence.

**Misconceptions:** (1) Start with the most capable agents and add controls later. (2) Policy can be written after the pilot. (3) Scaling is the first step after a pilot.

**Instructional Rationale:** Evaluate-level work needs the learner to justify an ordering by the prerequisite relation. Two steps may be swapped without effect, which tests understanding of the dependencies and not memory of a sequence.

**Content:**

| Step | Description |
|---|---|
| A | Write the lab AI use policy, with the data classes and permitted tools (Chapter 18). |
| B | Set up a shared repository with an instruction file and a project knowledge base (Chapters 5 and 6). |
| C | Pilot one skill on one repeatable task at autonomy level 1 or 2, such as citation verification (Chapters 7, 9, and 11). |
| D | Add verification checks and a reproducibility package to the pilot (Chapters 13 and 17). |
| E | Scale to a small agent team on one project, with review gates (Chapter 10). |
| F | Review the metrics at 90 days, such as time saved, review load, and errors that escaped, and decide what to expand or stop. |

Dependencies, each with its reason:

| Dependency | Reason (shown as feedback) |
|---|---|
| A before C | A pilot touches real data, so the data classes and permitted tools must be decided first. |
| B before C | A pilot needs the instruction file and the repository to be reproducible and reversible. |
| C before D | The checks and package are designed on a concrete, working task. |
| D before E | A team multiplies output, so the checks must already exist. |
| E before F | The review decides on the team's results. |

**Provenance:** The steps and dependencies are from the section "Adopting These Practices" of this chapter and the chapters named in each step.

**Rules:** An order is valid when A < C, B < C, C < D, D < E, and E < F, where < means "comes earlier". A and B may be in either order. The valid orders are A, B, C, D, E, F and B, A, C, D, E, F.

**Learner Activity:**

1. The learner sees the six steps in a scrambled order.
2. The learner arranges them into a sequence and submits.
3. The sim reports the order as valid, or names the first violated dependency and shows its reason.
4. The sim then shows both valid orders and the dependency graph.

**Feedback:** One submission counts as evidence, and the learner may try again afterward. Valid: "Valid order." plus the dependency list. Invalid: "Invalid: <step> needs <step> first." plus the reason for that dependency.

**Starting State:** The six steps are shown in a scrambled order. The question on screen is "Which steps must come first, and why?"

**Chapter Anchors:** The chapter states that policy and repository come before the pilot, that checks are added before a team is scaled, and that a 90-day review decides what to expand or stop.
</details>

<iframe src="../../sims/adoption-plan-prioritizer/main.html" height="852px" width="100%" scrolling="no"></iframe>

*MicroSim: Adoption Plan Prioritizer. [Open it fullscreen](../../sims/adoption-plan-prioritizer/main.html).*

A reasonable adoption plan names the owner of each step, a date, and the measure that will show whether it worked. Three measures are enough to begin with: the time saved on the pilot task, the review time the pilot required, and the number of errors found after acceptance. If the third number is not falling, the controls are not yet adequate, and the team should not grow.

## Summary and Key Takeaways

The cases show a consistent pattern. Work that went well started from source material and structure, handed files between single-purpose stages, put a check at each handoff, and recorded failures. The capstone asks you to do the same, on your own question, and to say honestly what you did and what the agents did.

The main points to carry forward:

- **A case study** is useful when it includes failures, and a **failure case** is recorded with cause, detection, control, and change.
- **The MicroSims paper** shows drafting from source material, structure before prose, a build as a check, and the need to label claims as measured, cited, or expected.
- **The intelligent textbook project** is a **skill pipeline** whose stages hand files to one another, with a status field as the autonomy boundary.
- **Workflow documentation, agent team design, a personal skill library, and a group workflow** make a personal practice shareable.
- **The capstone** is an end-to-end task with criteria written in advance, verification, a reproducibility package, a disclosure, and an honest account of human judgment.
- **An adoption plan** orders policy, repository, pilot, checks, and team, and decides at 90 days by measured results.

!!! mascot-celebration "From Researcher to Orchestrator"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now specify a question and its acceptance criteria, design a small team of agents with defined autonomy and review points, verify and reproduce what they produce, disclose how you used them, and say honestly where your judgment decided the outcome. That is the whole shift this book set out to teach, and the work is yours.

Round up your evidence, and keep checking. The agents will keep getting better, and the question of what is true will stay with you.

[See Annotated References](./references.md)
