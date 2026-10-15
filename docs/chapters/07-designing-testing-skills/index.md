---
title: "Designing, Testing, and Sharing Agent Skills"
description: "The full life of an agent skill: choosing a scope, writing a single-purpose skill with progressive disclosure, testing and evaluating it, versioning and sharing it, composing skills into pipelines, and maintaining a skill library."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 10:59:51"
version: 1.11
---

# Designing, Testing, and Sharing Agent Skills

## Summary

This chapter covers the full life of a skill: choosing a scope, writing single-purpose skills, testing and evaluating them, versioning, sharing, installing, and maintaining them. It ends with a research skill template. After this chapter you can turn a repeatable task from your own workflow into a skill that a colleague can install and trust.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Reference Documents | 2 |
| Progressive Disclosure | 1 |
| Skill Scope | 9 |
| Single Purpose Skill | 8 |
| Skill Testing | 5 |
| Skill Evaluation | 1 |
| Skill Versioning | 2 |
| Skill Library | 5 |
| Skill Sharing | 2 |
| Skill Installation | 1 |
| Slash Command | 1 |
| Skill Composition | 4 |
| Skill Metadata | 1 |
| Skill Failure Modes | 3 |
| Skill Maintenance | 1 |
| Skill Examples | 4 |
| Research Skill Template | 3 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 2: How Language Models Work](../02-how-language-models-work/index.md)
- [Chapter 3: Choosing Models and Writing Clear Prompts](../03-models-and-prompt-basics/index.md)
- [Chapter 4: Context Engineering and Advanced Prompting](../04-context-engineering-prompting/index.md)
- [Chapter 5: Markdown Project Files and Version Control](../05-markdown-and-version-control/index.md)
- [Chapter 6: Knowledge Bases, Personal Knowledge Graphs, and the Anatomy of an Agent Skill](../06-knowledge-bases-skill-anatomy/index.md)

!!! mascot-welcome "From a File You Read to a Tool You Trust"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Reading a skill is easy. Trusting one is the hard part, and it comes from design choices and tests you run before anyone else relies on it. By the end you will have a procedure for turning a task you repeat into a skill a colleague can install without asking you how it works. Trust, but verify!

## Scoping a Skill

The most consequential decision in a skill's life is made before any instruction is written: what it is for. **Skill scope** is the boundary of the task a skill covers, stated by what it takes as input, what it produces, and what it explicitly does not do. A **single-purpose skill** is a skill whose scope is one task with one kind of output. The recommendation of this chapter is to make skills single-purpose, and the reason is practical rather than aesthetic.

A skill that does one thing has a description that can be precise, so it triggers on the right requests. It has instructions short enough that the agent follows all of them. It has an output that can be checked against one set of acceptance criteria. And when it fails, the failure points to one place. A skill that "handles all the analysis for the project" fails all four ways at once: the description is vague, the instructions are long and the agent skips steps, the output is many things, and a failure could be anywhere.

A useful test of scope is the one-sentence rule. Write the skill's purpose as a single sentence of the form "Given X, produce Y, checked by Z." If you need the word "and" to join two different outputs, you probably have two skills. If you cannot name Z, you have not yet defined how anyone would know the skill worked.

| Too broad | Single purpose | One-sentence form |
|---|---|---|
| "Help with my ADC project" | `enob-report` | Given a coherently sampled record, produce a one-page ENOB report, checked by the five acceptance criteria. |
| "Do the literature work" | `citation-verify` | Given a list of citations, produce a table of verified, corrected, or unverifiable entries, checked by a database lookup per entry. |
| "Prepare the paper" | `figure-caption-check` | Given a figure and its caption, produce a list of missing caption elements, checked against the venue's checklist. |

*Table 1. Broad requests narrowed into single-purpose skills.*

!!! mascot-warning "The Skill That Does Everything"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is growing one skill by adding "while you are at it" steps until it does five jobs. It happens because adding a step is cheaper than creating a skill. The result triggers unreliably and fails in ways you cannot localize. When a skill needs a second output, split it, and let the two be composed.

## Writing the Skill: Progressive Disclosure and Reference Documents

A skill's text competes for the same context window as everything else, and the agent's attention is finite. **Progressive disclosure** is the design principle that makes a skill's content available in layers, so that only as much is loaded as the task needs. There are three layers. The *metadata*, that is the name and description, is always in context. The *instructions* in SKILL.md are loaded when the skill triggers. The *supporting files* are loaded only when an instruction points to them. A skill with a long reference table, a large template, and a library script pays for none of them until the step that uses them.

**Reference documents** are the supporting files that hold the knowledge a skill needs but that is too long or too specialized for SKILL.md: a venue's formatting rules, a table of measurement targets, a style guide, a data dictionary. The instruction should name the file and say when to read it: "If the target venue is IEEE, read references/ieee-checklist.md." That sentence is the entire cost of making a large body of knowledge available.

Three habits keep a skill's text effective:

- *Write the description last, and test it.* The description decides triggering, so it should name the task, the inputs it recognizes, and the situations that call for it.
- *Keep SKILL.md short.* A procedure of five to ten numbered steps, with the constraints stated once. If it grows beyond a page, move material to a reference document.
- *Prefer a script to prose for exact work.* If a step is a computation, such as the ENOB formula, put it in a tested script the skill runs, rather than asking the model to do arithmetic from a description.

## Testing and Evaluating a Skill

A skill is a prompt with a name, and like any prompt it needs tests. **Skill testing** is running a skill on a fixed set of requests and checking the results against stated expectations. A skill needs two kinds of test, because it can fail in two distinct ways: it can be used when it should not be, or not used when it should.

*Trigger tests* check the description. Write a short list of realistic requests that should load the skill and a list that should not, including near misses that share vocabulary with the skill but ask for something else. *Behavior tests* check the output. Give the skill representative inputs, including an edge case and a case where the correct output is "cannot do this", and check each output against the skill's acceptance criteria from the specification.

**Skill evaluation** goes one step further: it measures. Because model output varies from run to run, a single success proves little. Evaluation runs each test several times, records the pass rate, and compares versions or compares the skill against doing the same task with no skill at all. A skill that improves the pass rate on your test set from 40 percent to 90 percent has earned its place. A skill that makes no measurable difference is overhead that costs context.

A worked example: for the `enob-report` skill, five trigger tests and five behavior tests are written. Two of the behavior tests are synthetic records with known ENOB values (an ideal 10-bit quantizer, and the same record with added noise), so the expected number is known in advance. The tests run three times each against version 1.0 of the skill and again against version 1.1. The results are tabulated, and a change is accepted only if the pass rate does not fall on any test.

!!! mascot-tip "Write the Should-Not-Trigger Tests First"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Everyone tests that a skill fires when asked. Few test that it stays quiet when it should. Write four near-miss requests that share a keyword with your skill but ask for something different, and make sure none triggers it. That single list catches most description problems.

#### Diagram: Skill Description Trigger Tester

<details markdown="1">
<summary>Skill Description Trigger Tester</summary>
Type: microsim
**sim-id:** skill-description-trigger-tester<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish, for each of eight user requests, whether a stated skill description should trigger the skill or not, with at least 7 of 8 correct.

**Prerequisites:** skill description, skill triggering, single-purpose skill, and trigger tests, all defined in the sections "Scoping a Skill" and "Testing and Evaluating a Skill" above and in Chapter 6.

**Evidence of Mastery:** For each of eight requests the learner commits "should trigger" or "should not trigger". A choice is correct when it equals the answer in Content. Mastery is at least 7 of 8 correct on the first attempt. Reading the skill description is exploration and is not evidence.

**Misconceptions:** (1) Any request that shares a keyword with the description should trigger the skill. (2) A request that is about the same files but for a different task should trigger it. (3) A skill should trigger on any request that mentions its domain.

**Instructional Rationale:** Analyze-level work needs the learner to separate the task a request asks for from the vocabulary it uses. Near-miss requests that share keywords force a judgment on the task and not on surface features.

**Content:**

The skill description shown is: "Check a SPICE netlist for floating nodes, a missing .end card, and unit suffix errors. Use when the user asks to lint, check, or validate a .sp or .cir netlist file."

| # | User request | Correct answer | Why (shown as feedback) |
|---|---|---|---|
| 1 | Lint circuits/ldo.sp for floating nodes. | Should trigger | It asks for the checking task the description names. |
| 2 | Is there anything wrong with this netlist? (a .cir file is attached) | Should trigger | It asks for a check of a .cir netlist, which the description covers. |
| 3 | Run the transient simulation of ldo.sp and plot Vout. | Should not trigger | It asks for simulation and plotting. It mentions the same file but not the checking task. |
| 4 | Write a netlist for a two-stage op-amp. | Should not trigger | It asks for a netlist to be generated, not checked. |
| 5 | Validate that every .sp file under circuits/ ends with a .end card. | Should trigger | It asks for validation of a property the description names. |
| 6 | Explain what a floating node is. | Should not trigger | It is a concept question and does not ask for a file to be checked. |
| 7 | Check my Verilog testbench for syntax errors. | Should not trigger | It asks for a check, but of a different language than the description covers. |
| 8 | My 1M resistor behaves like one milliohm. Check the units in ldo.sp. | Should trigger | It asks for a check of unit suffixes in a .sp file. In SPICE, M means milli and MEG means mega. |

**Provenance:** The trigger concept is from Chapter 6 and the section "Testing and Evaluating a Skill" of this chapter. The description and requests are invented for illustration, and the sim labels them "illustrative".

**Rules:** A request should trigger the skill when it asks for a task and an input type that the description names. Shared vocabulary alone does not make a request trigger. Each request has exactly one correct answer.

**Learner Activity:**

1. The learner reads the skill description and request 1.
2. The learner chooses "should trigger" or "should not trigger" and submits.
3. The sim shows whether it was correct and the "Why" sentence, then shows the next request.
4. After request 8, the sim shows the count correct and lists the requests that share a keyword with the description but should not trigger.

**Feedback:** Eight requests, one attempt each, in a fixed order. Correct: "Correct." plus the "Why" sentence. Incorrect: the correct answer plus the "Why" sentence. The correct answer is always revealed after the single attempt. A final score "n of 8 correct" is shown with whether the mastery threshold of 7 was met.

**Starting State:** The description and request 1 are shown with no choice made. The question on screen is "Would an agent load this skill for this request?"

**Chapter Anchors:** The chapter states that triggering is a comparison of the request with the description, that a skill needs tests for both firing and staying quiet, and that near-miss requests that share a keyword are the most useful trigger tests.
</details>

<iframe src="../../sims/skill-description-trigger-tester/main.html" height="617px" width="100%" scrolling="no"></iframe>

*MicroSim: Skill Description Trigger Tester. [Open it fullscreen](../../sims/skill-description-trigger-tester/main.html).*

## Failure Modes and Maintenance

Skills fail in a small number of recurring ways. **Skill failure modes** are those characteristic patterns, and knowing them lets you diagnose a misbehaving skill by symptom instead of by guesswork. The most common are listed here.

- *Undertriggering*: the skill is not used when it should be. The cause is almost always the description.
- *Overtriggering*: the skill loads on requests it cannot handle. The cause is a description that is too broad.
- *Instruction drift*: the skill loads, but the agent skips or reorders steps. The cause is usually a SKILL.md that is too long or a step that is not checkable.
- *Missing dependency*: a script needs a library, tool, or file that is not present on the machine where the skill runs.
- *Stale reference*: a reference document or a hard-coded path is out of date, so the skill gives a confident but obsolete answer.
- *Scope creep*: the skill has accumulated extra jobs and now does none of them reliably.

**Skill maintenance** is the continuing work of keeping a skill correct as its surroundings change: models update, tools change versions, venues revise requirements, and your own conventions evolve. A skill with no maintenance decays quietly, because nothing breaks loudly. The remedy is routine: rerun the test set whenever the model, the tools, or the skill changes; date every reference document; and record in the skill's metadata when it was last verified.

#### Diagram: Skill Failure Mode Classifier

<details markdown="1">
<summary>Skill Failure Mode Classifier</summary>
Type: microsim
**sim-id:** skill-failure-mode-classifier<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** attribute<br/>
**Learning Objective:** The learner will attribute each of eight observed skill problems to one of six failure modes, with at least 7 of 8 correct.

**Prerequisites:** the six skill failure modes (undertriggering, overtriggering, instruction drift, missing dependency, stale reference, scope creep), all defined in the section "Failure Modes and Maintenance" above.

**Evidence of Mastery:** For each of eight observations the learner commits one of six failure modes. A choice is correct when it equals the answer in Content. Mastery is at least 7 of 8 correct on the first attempt. Reading the definitions list is exploration and is not evidence.

**Misconceptions:** (1) Any skill problem is a problem with the model. (2) A skill that gives a wrong answer must have bad instructions. (3) A skill that does not run has failed to trigger.

**Instructional Rationale:** Analyze-level work needs the learner to trace a symptom to its cause. The observations share surface features, such as "it gave the wrong result", so the learner must reason from what changed or what was skipped.

**Content:**

| # | Observation | Correct failure mode | Why (shown as feedback) |
|---|---|---|---|
| 1 | The user asked for an ENOB report in plain words and the agent did not use the skill at all. | Undertriggering | The skill was not loaded for a request it covers, which points to the description. |
| 2 | Asked to plot a spectrum, the agent loaded the ENOB skill and produced a report nobody wanted. | Overtriggering | The skill loaded for a request it does not cover, which points to a description that is too broad. |
| 3 | The skill loaded, but the agent never ran the acceptance check in step 4 and reported success. | Instruction drift | The skill loaded and a step was skipped, which points to long or uncheckable instructions. |
| 4 | The skill's script fails with "No module named scipy" on a colleague's machine. | Missing dependency | The script needs a library that is not installed where the skill runs. |
| 5 | The report compares the result with a 9.0-bit target, but the project's target was raised to 9.5 bits last month. | Stale reference | The reference document was not updated when the requirement changed. |
| 6 | The skill now also converts units, drafts the paper's abstract, and files tickets, and its ENOB reports have become unreliable. | Scope creep | The skill has accumulated extra jobs and does none reliably. |
| 7 | A request that says "check the ENOB of this converter" was ignored, but "give me an ENOB report" works. | Undertriggering | The description names only one phrasing of the task, so a covered request was missed. |
| 8 | After a model update the skill runs, but the agent summarizes the procedure instead of executing steps 2 and 3. | Instruction drift | The skill loaded, and the agent departed from the steps, which points to instructions that need to be shorter or checkable. |

**Provenance:** The six failure modes are from the section "Failure Modes and Maintenance" of this chapter. The observations are invented for illustration, and the sim labels them "illustrative".

**Rules:** Each observation has exactly one correct mode. A mode is chosen from the symptom of what did not happen (not loaded, loaded wrongly, step skipped, cannot run, outdated content, too many jobs).

**Learner Activity:**

1. The learner reads observation 1 and the six failure modes.
2. The learner chooses one mode and submits.
3. The sim shows whether it was correct and the "Why" sentence, then moves to the next observation.
4. After observation 8, the sim shows the count correct and the recommended fix for each mode that was missed.

**Feedback:** Eight observations, one attempt each, in a fixed order. Correct: "Correct: <mode>." plus the "Why" sentence. Incorrect: "This is <mode>." plus the "Why" sentence. The correct mode is always revealed after the single attempt. A final score "n of 8 correct" is shown with whether the mastery threshold of 7 was met.

**Starting State:** Observation 1 is shown with the six modes listed and none chosen. The question on screen is "Which failure mode explains this?"

**Chapter Anchors:** The chapter lists six failure modes and states that undertriggering and overtriggering trace to the description, that instruction drift traces to long or uncheckable instructions, and that stale references and missing dependencies cause confident but wrong or failed output.
</details>

<iframe src="../../sims/skill-failure-mode-classifier/main.html" height="822px" width="100%" scrolling="no"></iframe>

*MicroSim: Skill Failure Mode Classifier. [Open it fullscreen](../../sims/skill-failure-mode-classifier/main.html).*

## Versioning, Sharing, and Installing

A skill is a directory of text files, so everything from Chapter 5 applies: it belongs in a Git repository, with commits that say what changed and why. **Skill versioning** is giving each released state of a skill an identifier, such as a semantic version number, so that users can tell which one they have and a result can be tied to the version that produced it. Increment the major number when a change alters the skill's output format or behavior in a way that could break a user's pipeline, and the minor and patch numbers for additions and fixes. Keep a short changelog in the repository.

**Skill metadata** is the descriptive information about a skill beyond its name and description: its version, author, license, the date it was last verified, and the tools or models it was tested with. Some packaging tools validate frontmatter strictly and reject unknown top-level keys, so it is safest to place custom fields under a single `metadata` map instead of adding new top-level keys.

```yaml
---
name: enob-report
description: Compute ENOB from a coherently sampled ADC record and write a one-page report. Use when the user asks for ENOB, SNDR, or an ADC characterization summary.
metadata:
  version: "1.1.0"
  last_verified: "2026-10-15"
  tested_with: "NumPy 2.x"
---
```

**Skill sharing** is making a skill available to colleagues, and the simplest reliable channel is the Git repository that already holds it. A **skill library** is a collection of skills kept together, usually one repository with one directory per skill, with a README listing what each does. **Skill installation** is placing a skill where the agent looks for skills, and for most agents this means copying or linking the skill directory into a known skills folder, either per project or per user. One workable arrangement, used by the author of this book, is a single library repository cloned once, with the user's skills folder holding symbolic links to the directories inside it, so that a `git pull` updates every skill at once.

A **slash command** is an explicit way to invoke a skill by typing its name preceded by a slash, such as `/enob-report`, instead of relying on the agent to decide from the description. Explicit invocation is useful for skills that take action, for skills you want to run at a moment of your choosing, and as a fallback while you are still tuning a description.

Before you share a skill, ask what a new user needs that you carry in your head. Provide a README with a one-paragraph purpose, the install steps, an example request, an example of correct output, and the dependencies. Run the test set on a clean machine, not only on yours, because missing dependencies show up only there.

## Composing Skills and Studying Examples

**Skill composition** is combining single-purpose skills into a larger workflow, where each skill's output is the next skill's input. Composition is the reason to keep skills small. A pipeline of five skills, each with its own tests, is easier to debug than one skill that does the same five things, because a failure is localized to the step whose acceptance check fails.

This book is itself the product of a composed skill chain. Its repository's contributor instructions list the order: validate the course description, generate the concept graph, design the chapter structure, write the chapters, build the interactive simulations, and then generate the glossary, FAQ, quizzes, and references. Each step reads the files the previous step wrote, which is the handoff discipline of Chapter 1 with the artifact being a file in the repository.

The best way to learn skill design is to read working skills. Look at three properties in each example you read:

- *Description*: does it name the task and the situations that call for it?
- *Procedure*: are the steps numbered, short, and checkable?
- *Boundaries*: does it say what it will not do and where it stops?

!!! mascot-thinking "A Pipeline Is Skills Joined by Files"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice why composing by files works. Each file is an artifact you can open, diff, and test. A skill that hands its work to the next by a file leaves you a checkpoint between every pair of steps, which is exactly where Chapter 9 will ask you to put review.

## A Research Skill Template

The template below collects the chapter into a starting point. It is a structure, not a rule: delete sections that a particular skill does not need, and keep it short.

```markdown
---
name: <task-in-lowercase-with-hyphens>
description: <What it does, in one sentence. Use when <the situations and phrasings that call for it>.>
metadata:
  version: "0.1.0"
  last_verified: "<YYYY-MM-DD>"
---

# <Skill title>

## Purpose
Given <input>, produce <output>, checked by <acceptance check>.

## Inputs
- <required input and its format>
- Ask the user if <input> is missing; do not guess.

## Procedure
1. <Step with a checkable result.>
2. Run scripts/<name>.py with <arguments>.
3. If <condition>, read references/<name>.md.

## Output
<Exact format: file name, columns, or fields.>

## Acceptance checks
- <Testable condition 1>
- <Testable condition 2>

## Never
- <Boundary: files not to edit, actions needing approval.>

## When it cannot do the task
State what is missing and stop. Do not produce a partial result that looks complete.
```

## Summary and Key Takeaways

A skill is worth the effort when a task recurs and when the result can be checked. The practices that make one trustworthy are not exotic: a narrow scope, a precise description, short instructions backed by scripts and references, tests for both firing and staying quiet, versions, and routine maintenance.

The main points to carry forward:

- **Skill scope** is set by a one-sentence rule, and a **single-purpose skill** triggers, executes, and fails more predictably.
- **Progressive disclosure** loads the description always, the instructions on triggering, and **reference documents** only when pointed to.
- **Skill testing** needs trigger tests, including near misses, and behavior tests with known answers. **Skill evaluation** measures pass rate over repeated runs against versions and against no skill.
- **Skill failure modes** are undertriggering, overtriggering, instruction drift, missing dependency, stale reference, and scope creep, and each points to a different fix.
- **Versioning, metadata, sharing, installation, and slash commands** make a skill portable. A Git repository is the simplest library.
- **Skill composition** joins single-purpose skills by files, leaving a checkpoint between steps.
- **Maintenance** is routine: rerun the tests whenever the model, tools, or skill change.

!!! mascot-celebration "A Skill Others Can Trust"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now scope a skill to one checkable task, write a description that triggers correctly, test it for both firing and staying quiet, and diagnose a misbehaving skill by its failure mode. That is a repeatable task turned into something a colleague can install.

The next chapter gives skills something to act with. Tools, files, shell commands, and subagents are what turn a procedure into an agent that does work. Round up your first skill, and bring it along.
