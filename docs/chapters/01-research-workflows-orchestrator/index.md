---
title: "Research Workflows and the Researcher as Orchestrator"
description: "How AI tools and agents fit into the everyday research workflow of electrical and computer engineers, the core vocabulary of generative AI, and the researcher's role as orchestrator of agent teams."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 08:18:44"
version: 1.11
---

# Research Workflows and the Researcher as Orchestrator

## Summary

This chapter maps the pipeline of repeatable tasks that make up graduate research in electrical engineering and computer design: literature search, data analysis, brainstorming, coding, and manuscript preparation. It introduces the core vocabulary of generative AI and agents and the book's central idea, the researcher as orchestrator. After this chapter you can describe where AI helps in your own workflow and where your direct judgment is still required.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Research Workflow | 1144 |
| Literature Search | 44 |
| Data Analysis | 62 |
| Brainstorming | 19 |
| Scientific Coding | 40 |
| Manuscript Preparation | 56 |
| Research Question | 459 |
| Research Productivity | 6 |
| Generative AI | 2929 |
| Large Language Model | 2928 |
| AI Assistant | 916 |
| AI Agent | 837 |
| Agentic Research | 19 |
| Human in the Loop | 56 |
| Researcher as Orchestrator | 6 |
| Task Decomposition | 212 |
| Research Pipeline | 13 |
| Reproducibility | 5 |
| Research Group | 6 |
| Electrical Engineering Research | 93 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

!!! mascot-welcome "Welcome, and Meet Your Guide"
    ![Volt the Border Collie waving hello](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Hello, I'm Volt, a border collie, and I will be your guide through this book. Border collies are patient and precise, and I always want to know how a result could be checked. Trust, but verify! Here is exactly what I do in every chapter:

    1. **Welcome:** I open a chapter and tell you why it is worth your time.
    2. **Think:** I mark an idea worth pausing on, one that should change how you think.
    3. **Tip:** I hand you a shortcut you can use right away.
    4. **Warn:** I flag a trap that catches many researchers, along with the way out.
    5. **Encourage:** I tell you when a topic is genuinely hard and how to approach it.
    6. **Celebrate:** I close a chapter by naming what you can now do.

    If I'm not doing one of those six things, I'm not in the chapter.

## Research as a Workflow

A research career is often described in terms of insight, but the day-to-day reality of a graduate student, postdoc, or faculty member is dominated by procedure. A question is chosen, literature is read, an experiment or simulation is designed, data are collected and cleaned, results are analyzed, and a manuscript is written, revised, and submitted. Each of these activities has inputs, outputs, and recognizable quality criteria. The **research workflow** is this sequence of repeatable activities by which a research question is turned into a validated, communicated result. Naming it matters because anything that can be described as a procedure with checkable outputs can, at least in part, be delegated, and it is precisely this procedural layer that generative AI and agents now handle with useful competence.

Two properties of a workflow make it the right unit of analysis for this book. First, a workflow has *stages*, and each stage consumes the output of the stage before it. Second, a workflow has *handoffs*, the points at which one activity ends and another begins, and handoffs are where quality is either confirmed or silently lost. When you work alone and by hand, you carry the handoffs in your head. When part of the workflow is performed by an AI system, the handoffs become explicit artifacts: a file, a prompt, a log, a table of results. Making them explicit is the first practical skill this course teaches.

Real workflows are not straight lines. Analysis that produces a surprising number sends you back to re-examine the measurement, a reviewer's comment sends you back to the analysis, and a new paper in the literature sends you back to the question. These loops are where much of the time in research is actually spent, and they matter for AI use in a specific way: every loop is another chance for a model to introduce an error, and another place where a stale artifact can be mistaken for a current one. A workable discipline is to give every handoff artifact a name, a date, and a note of which earlier artifact it was derived from, so that when a loop is traversed the downstream artifacts known to be stale can be identified at once. In the running example, a change to the record length in the measurement procedure invalidates every ENOB value computed under the old procedure, and the naming convention is what lets you list them.

To keep the discussion concrete, this chapter uses one running example, which is illustrative and not drawn from any published study. A doctoral student is designing a low-power successive-approximation-register (SAR) analog-to-digital converter (ADC) for battery-powered sensor nodes, and must show whether the design meets a resolution target. Table 1 follows that project through the workflow.

| Stage | Input | Output | Typical handoff artifact |
|-------|-------|--------|--------------------------|
| Find what is known | A topic and a gap in understanding | Annotated list of relevant papers | Reading list with citations |
| Frame the question | Reading list and a design goal | One falsifiable research question | Question statement |
| Build and measure | Question and a design | Simulated and measured output records | Netlists, scripts, raw data files |
| Analyze | Raw data files | Quantified results with uncertainty | Result tables and plots |
| Communicate | Result tables and plots | A paper, thesis chapter, or talk | Manuscript source and figures |

*Table 1. The running example's workflow, with the artifact passed between stages.*

#### Diagram: Research Workflow Handoffs

<details markdown="1">
<summary>Research Workflow Handoffs</summary>
Type: microsim
**sim-id:** research-workflow-handoffs<br/>
**Library:** Mermaid<br/>
**Status:** Built<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** describe<br/>
**Learning Objective:** The learner will describe the input, output, and handoff artifact of each of the five stages of the running example's research workflow.

**Prerequisites:** the definitions of research workflow, stage, and handoff given above.

**Content:** The diagram shows the start box "Topic and a gap in understanding", the five stages of Table 1 in order, and the end box "Paper, thesis chapter, or talk". Each arrow is labeled with the handoff artifact from the last column of Table 1.

**Learner Activity:**

1. The learner hovers over a box or an arrow to read its input, output, and handoff artifact.
2. The learner clicks each of the seven boxes. Clicked boxes get a green outline, and a counter shows progress.
3. When all seven boxes have been clicked, a confetti cannon fires. It does not fire earlier.

**Chapter Anchors:** The chapter states five stages, the artifact passed between each pair of stages, and the idea that handoffs are where quality is confirmed or silently lost.
</details>

<iframe src="../../sims/research-workflow-handoffs/main.html" height="640px" width="100%" scrolling="no"></iframe>

*Figure 1. The same workflow as a diagram. Hover over a box or arrow for details, then click all seven boxes.*

!!! mascot-thinking "A Workflow Is a Chain of Evidence"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that every stage trusts the one before it. An error in the reading list or in a raw data file does not stay put; it travels to the paper. Ask of every stage: what would reveal a mistake here, before the next stage inherits it?

## Framing the Research Question

Every downstream activity in the workflow is bounded by the **research question**: a precise, answerable statement of what the researcher wants to find out. A good question has four properties. It is *specific*, naming the system and the quantity of interest. It is *measurable*, so that a result can be compared with a number. It is *bounded*, limited to conditions that can actually be tested. And it is *falsifiable*, so that a plausible experiment could show it to be wrong.

The reason this matters more with AI than without it is that generative systems respond fluently to almost any input. A vague question does not produce a visibly vague answer; it produces a confident, well-organized answer to a question you did not quite ask. Precision in the question is therefore the cheapest quality control available.

| Weak question | Why it fails | Stronger question |
|---------------|--------------|-------------------|
| "Make the ADC better." | No quantity, no threshold, no condition | "Can a 10-bit charge-redistribution SAR ADC in a 65 nm process reach an effective number of bits (ENOB) of at least 9.5 at 1 MS/s while drawing less than 50 µW?" |
| "Is machine learning useful for circuit design?" | Unbounded; no test could end the argument | "Does a surrogate model trained on 5,000 simulated samples predict the op-amp gain within 1 dB on held-out designs?" |
| "Study noise in the amplifier." | Names a topic, not a question | "Is the input-referred noise of the low-noise amplifier below 2 nV/√Hz between 1 and 10 MHz at room temperature?" |

*Table 2. Weak and strong forms of the same research intent. All values are illustrative.*

A worked example shows the effect on an agent. Suppose you ask an assistant, "Help me evaluate my ADC." It may produce a plausible list of metrics, a generic evaluation plan, and a recommendation to simulate corners. None of it is wrong, and none of it tells you whether your design met anything. Given the strong version of the question in the first row of Table 2, the same assistant can state the evidence required (a measured ENOB with a stated input frequency and record length), propose the analysis, and tell you when the target has been missed. The question supplied the stopping rule.

The same technique works in reverse: ask an assistant to attack your question rather than answer it. A prompt such as "List the ways this question could be answered yes without the design being useful, and the ways it could be answered no for reasons unrelated to the design" tends to expose hidden conditions, such as the input amplitude, the temperature, or the process corner, that the question left unstated. In the ADC example it exposes that an ENOB of at least 9.5 bits is meaningless without a stated input frequency and amplitude, which sends you back to add them. The assistant is useful here as an adversary, not as an oracle.

!!! mascot-tip "Write the Stopping Rule First"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you open any AI tool, write your question as one sentence containing a metric and a threshold. If an agent cannot tell when it is done, neither can you.

## The Setting: Electrical Engineering Research

**Electrical engineering research** is the investigation of circuits, devices, signals, systems, and the computation that runs on them, using theory, simulation, fabrication, and measurement together. Several features of the field shape how AI helps and where it is dangerous.

First, the work is quantitative and the quantities have physical meaning. A number carries units, a measurement condition, and an uncertainty, and a plausible-looking number with the wrong units is worse than no number. Second, the field is tool-dense: circuit simulators, hardware description languages, layout and verification tools, signal analyzers, and a long tail of scripts glue them together, so much of the daily work is writing and debugging code. Third, cycles are slow and expensive. A fabrication run can take months and cost real money, so an error caught in simulation is cheap and the same error caught after tape-out may be unrecoverable. Fourth, the evidence is partly physical: a measurement taken on a bench cannot be regenerated by a model, and a model must never be allowed to stand in for it.

These features make the field both a good fit and a hazardous one for AI assistance. They make it a good fit because so much of the work is structured, scripted, and checkable against physical law. They make it hazardous because the cost of an undetected error is high and the evidence is often irreproducible without the original hardware.

The ADC example gives a feel for the arithmetic you will routinely ask an agent to perform and must be able to check. The effective number of bits relates a measured signal-to-noise-and-distortion ratio (SNDR), expressed in decibels, to an equivalent ideal resolution:

\[
\text{ENOB} = \frac{\text{SNDR}_{\text{dB}} - 1.76}{6.02}
\]

Suppose a bench measurement of the example converter gives an SNDR of 57.5 dB. Then ENOB = (57.5 − 1.76) / 6.02 = 55.74 / 6.02 ≈ 9.26 bits. Against the question in Table 2, which required at least 9.5 bits, the design does not yet meet its target. The number is small, the units are explicit, and the conclusion follows directly. This is the style of claim the rest of the book teaches you to delegate drafting of, and never to accept unchecked.

| Feature of EE research | Where AI helps | Where it is hazardous |
|------------------------|----------------|-----------------------|
| Quantitative results with units | Unit conversion, formula implementation, plotting | Silent unit or scaling errors that look plausible |
| Tool-dense workflows | Writing and debugging scripts and netlists | Code that runs but computes the wrong thing |
| Slow, costly fabrication | Exploring many designs in simulation first | Over-trusting simulation that was never validated against hardware |
| Physical evidence | Drafting analysis of measured data you supply | Any output presented as a measurement that was not measured |

*Table 3. Where the field's features create both opportunity and risk.*

## The Five Everyday Research Tasks

Across fields and career stages, the procedural work of research reduces to five recurring tasks. This book is organized around them, and each later part of the course returns to one in depth. The sections below define each task and show one concrete place where an AI system fits.

### Literature Search

**Literature search** is the systematic discovery of prior work relevant to a question, including the choice of search terms, the databases to query, and the triage of results. Its output is a set of sources the researcher is prepared to cite and defend. AI changes the first half of the task most: generating alternative terminology, expanding abbreviations, and summarizing abstracts. It does not change the second half, which is deciding what is relevant and ensuring the citations are real.

As a worked example, you might ask an assistant to propose search strings for the ADC question. Before the example, note what the prompt contains: a role, the research question, the target databases, and the output format. Specifying all four makes the output directly usable.

```text
You are helping with a literature search in analog circuit design.
Question: Can a 10-bit charge-redistribution SAR ADC in 65 nm reach an
ENOB of at least 9.5 at 1 MS/s below 50 microwatts?
Give 10 Boolean search strings for IEEE Xplore, each using different
terminology (for example "successive approximation" and "SAR"). Return
a table with columns: string, what it targets.
```

The returned strings are hypotheses about vocabulary, not results. You run them, and you judge which sources are worth reading.

The second half of the task needs a deliberate habit. Each source an assistant mentions should be located in a bibliographic database by title or DOI before it is read, and a source you cannot locate is treated as nonexistent regardless of how plausible it sounds. Once a verified source is in hand, its reference list and the papers that cite it are the most reliable way to widen the search, a technique called citation chaining that later chapters automate. The AI contribution is speed in the first pass; the verification step is what makes the pass trustworthy.

### Data Analysis

**Data analysis** is the transformation of raw measurements or simulation output into quantified evidence, usually by cleaning, transforming, visualizing, and testing. In electrical engineering it often means spectral analysis of sampled signals, statistical characterization of noise and mismatch, and comparison of measured results against models. It is the place where agents most often produce silent errors, because an analysis script nearly always runs and produces a number.

A worked example makes the point. To measure ENOB, the converter is driven with a sine wave, a record of N = 4096 output samples is captured at a sampling rate of 1 MS/s, and an FFT is computed. For the spectrum to show a single clean tone, the input frequency should be *coherent*: an integer number of cycles M in the record, with M and N sharing no common factor. Choosing M = 1021 gives an input frequency of

\[
f_{\text{in}} = \frac{M}{N} f_s = \frac{1021}{4096} \times 1\,\text{MS/s} \approx 249.27\ \text{kHz}.
\]

An agent asked to "compute the ENOB from this record" may apply a window function to a record that was already coherent, which spreads signal energy and lowers the apparent SNDR by an amount that depends on the window. The script runs, the number looks reasonable, and the result is wrong by a fraction of a bit. Catching it requires knowing that a coherent record needs no window. That knowledge is yours, and it is exactly the kind of domain judgment that cannot be delegated.

| Analysis step | What an agent can do | What you must check |
|---------------|---------------------|---------------------|
| Load and clean the record | Parse files, handle missing samples | That the sampling rate and units were read correctly |
| Transform | Write and run the FFT | Windowing and coherence assumptions |
| Quantify | Compute SNDR and ENOB | The formula, the signal bin, and the noise bins included |
| Visualize | Produce plots | Axis units, scales, and that the plot shows the data and not a smoothed version |

*Table 4. Division of labor for the spectral analysis of an ADC record.*

A single ENOB value is also an incomplete result. Repeated measurements of the same converter under nominally identical conditions vary, and a claim such as "ENOB = 9.26" means little without a statement of spread. With eight repeated records and a sample standard deviation of 0.05 bits (illustrative), the reported figure becomes 9.26 ± 0.05 bits, and the 9.5-bit target is missed by roughly five standard deviations, a stronger statement than a single number could support. An agent asked only for "the ENOB" will usually return one value. Asking explicitly for the number of records, the mean, and the spread is a small change in the request that changes the quality of the evidence.

### Brainstorming

**Brainstorming** is the generation and early filtering of candidate ideas, framings, and approaches before commitment. Generative models are well suited to it because breadth is cheap and a poor suggestion costs only the seconds spent rejecting it. A worked example: asked for alternative architectures that could meet the ADC target, an assistant might list a pipelined converter, a delta-sigma modulator, a time-interleaved SAR, and a hybrid. Your task is to apply what you know about the power budget, the process, and the bandwidth to discard most of them. The assistant widened the set; you chose within it.

Two modes are worth separating, because they need different prompts. *Divergent* prompts ask for breadth and suspend judgment: "list ten architectures that could, in principle, reach this resolution at this power, including unconventional ones." *Convergent* prompts apply constraints and ask for ranking with reasons: "rank these against a 50 µW budget, a 65 nm process, and a six-month schedule, and state what you assumed." Running them in that order, in separate prompts, keeps the model from discarding options prematurely. A familiar hazard is *anchoring*: the first idea an assistant offers tends to shape the rest of the session, including your own thinking. Write down your own three candidates before you ask, and then compare, so that the model's list tests your thinking instead of replacing it.

### Scientific Coding

**Scientific coding** is the writing of programs to model, simulate, and analyze physical systems. For many researchers it consumes more hours than any other task, and it is the task for which AI assistants are most mature. The central practical technique is to give generated code a *test oracle*, a case whose correct answer you know independently.

For the ADC analysis, a perfect quantizer provides one. An ideal N-bit converter driven by a full-scale sine wave has \( \text{SNDR} = 6.02N + 1.76 \) dB, so an ideal 10-bit quantizer should yield 6.02 × 10 + 1.76 = 61.96 dB. If a generated analysis script, fed the output of an ideal 10-bit quantizer, reports 58 dB or 66 dB, the script is wrong, whatever it appears to do. The test costs a few lines and removes a large class of silent errors.

A test oracle is one of three habits that together make generated code trustworthy. The second is *boundary testing*: feeding the script a record of all zeros, a record with a single sample, and a record of the wrong length, and confirming that it fails loudly instead of returning a number. The third is *reading the code before running it on real data*, because AI-written scripts often contain defensible-looking choices, such as a default window, a hard-coded sampling rate, or an off-by-one error when excluding the DC bin, that change a result by a fraction of a bit and are visible only in the source. These checks take minutes. They are also the habits that carry over unchanged when the code is written by an agent that ran it itself, a case [Chapter 13](../13-simulation-testing-code/index.md) treats at length.

### Manuscript Preparation

**Manuscript preparation** is the conversion of results into a paper, thesis chapter, or report: structuring the argument, drafting text, producing figures, formatting references, and satisfying the requirements of a venue. It is the stage where AI help is most visible, because fluent drafting is what language models do best, and the stage where the stakes of an unchecked error are highest, because the text will carry your name.

Consider a worked example. You supply a results table in which the measured ENOB is 9.26 bits, and ask an assistant to draft the abstract. The draft states that the converter "achieves nearly 10-bit resolution." The statement is a rounding-up of a number that fell short of the 9.5-bit target in your own question. It reads well and is unsupported. Every number and every adjective in AI-drafted text is a claim you are about to sign.

| Manuscript stage | AI can help with | Stays with you |
|------------------|------------------|----------------|
| Structure and outline | Proposing sections for the venue's format | Deciding what the central claim is |
| Drafting | First-pass prose from your notes and tables | Checking each number and each claim against the data |
| Figures | Plot scripts and caption drafts | Confirming that each figure shows what its caption says |
| References | Formatting and consistency | Confirming each cited source exists and says what is claimed |
| Submission | Checklists against venue requirements | Authorship decisions and disclosure of AI use |

*Table 5. Where the work divides in manuscript preparation.*

A practical technique for the drafting row is a *claim audit*. Extract every sentence of the draft that contains a number, a comparison, or a causal verb such as "achieves", "reduces", or "because", and write each as a row of a table with its source: a cell in the results table, a figure, or a cited paper. A claim with no source is either cut or sent back to the analysis. In the abstract example, the audit lists "nearly 10-bit resolution" against the source "9.26 bits", and the mismatch is visible at once. Two further matters sit with you alone: whether and how to disclose AI assistance, which venues and institutions increasingly specify in their policies, and the author list, which carries accountability that a tool cannot hold. Both are developed in [Chapter 15](../15-manuscript-preparation/index.md) and [Chapter 18](../18-responsible-ethical-use/index.md).

### Summary Across the Five Tasks

Table 6 summarizes the pattern: in every task, the agent proposes and the researcher decides. The next section builds that pattern into an interactive exercise.

| Task | Typical AI contribution | Typical researcher contribution |
|------|-------------------------|---------------------------------|
| Literature search | Terminology, summaries, candidate lists | Relevance judgment, citation verification |
| Data analysis | Scripts and first-pass statistics | Domain checks on assumptions and results |
| Brainstorming | Breadth of candidate ideas | Selection grounded in constraints |
| Scientific coding | Code and tests | Test oracles, review, ownership |
| Manuscript preparation | Drafts and formatting | Claims, accuracy, authorship |

*Table 6. A one-line summary of each task.*

Before the next exercise, three terms need to be fixed, because the activity asks you to place each task in one of three groups. A task is **AI drafts, you verify** when a model can produce a first version and you can check the result cheaply. A task is **You decide, AI assists** when the model can supply options or analysis but the choice depends on knowledge and judgment that is yours. A task is **You do directly** when responsibility, commitment, or certification cannot be handed off at all.

#### Diagram: Research Task Sorter

<details markdown="1">
<summary>Research Task Sorter</summary>
Type: microsim
**sim-id:** research-task-sorter<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/3d-printing-course/tree/main/docs/sims/ai-in-am-pipeline<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** differentiate<br/>
**Learning Objective:** The learner will differentiate ten research tasks into "AI drafts, you verify", "You decide, AI assists", and "You do directly", matching the answer key in at least 8 of 10 tasks.

**Prerequisites:** the five everyday research tasks (literature search, data analysis, brainstorming, scientific coding, manuscript preparation) and the three groups "AI drafts, you verify", "You decide, AI assists", and "You do directly", all defined in the section "The Five Everyday Research Tasks" above.

**Evidence of Mastery:** The learner places each of ten task cards into exactly one of three groups and commits the placement. A placement is correct when it matches the Group column of the Content table. Mastery is 8 of 10 placements correct on the first run. Reading a task's hint and reviewing the answer key after the run are exploration, not evidence.

**Misconceptions:** (1) AI output that reads fluently can be accepted without checking. (2) Any task that involves a decision is one the model should make. (3) Tasks involving certification or accountability can be delegated if the model is good enough.

**Instructional Rationale:** Differentiating requires the learner to separate tasks by the kind of check or judgment they need, not by how technical they sound. A forced three-way placement with a one-sentence reason after each commit makes the criteria explicit, and the second run on a shuffled order shows whether the criteria transferred.

**Content:**

The three groups, in this order:

| Group | Meaning |
|---|---|
| AI drafts, you verify | A model can produce a first version, and you can check the result cheaply |
| You decide, AI assists | A model can supply options or analysis; the choice depends on your knowledge and judgment |
| You do directly | Responsibility, commitment, or certification that cannot be handed off |

The ten task cards:

| # | Task shown to the learner | Group | Why (shown as feedback) |
|---|---|---|---|
| 1 | List 30 candidate search keywords for a literature search on low-power SAR ADCs | AI drafts, you verify | A poor keyword costs one wasted search, and you see it immediately |
| 2 | From five summarized papers, choose the two worth reading in full | You decide, AI assists | Relevance depends on your question and field knowledge; the model can rank, you choose |
| 3 | Write a Python script that loads a CSV of measured gain versus frequency and plots it | AI drafts, you verify | Running it on a file whose contents you know checks the result directly |
| 4 | Decide whether a 3 dB gap between simulated and measured gain is a model error or a measurement error | You decide, AI assists | The model can list hypotheses, but only you know the probe loading, calibration, and bench setup |
| 5 | Reformat a reference list from BibTeX entries to IEEE style | AI drafts, you verify | Format conversion is mechanical, and a spot check of the entries confirms it |
| 6 | Propose five alternative ways to phrase a research question | You decide, AI assists | The model widens the options; which framing serves your project is your call |
| 7 | Commit six months of lab time to one of three candidate hypotheses | You do directly | The commitment of your time and resources is your responsibility, whatever options the model laid out |
| 8 | Draft an abstract from a table of measured results | AI drafts, you verify | A first draft is useful, but every number and adjective must be checked against the table |
| 9 | Decide the author order and who is listed as an author | You do directly | Authorship carries accountability and follows community norms that only the people involved can settle |
| 10 | Certify before submission that the reported measurements were taken and not generated | You do directly | Certification of the evidence is a personal responsibility that cannot be delegated |

**Provenance:** Task cards and answer key are original to this chapter and match the sections "The Five Everyday Research Tasks" and the three group definitions above. The values mentioned (30 keywords, 5 papers, 3 dB, six months, 3 hypotheses) are illustrative.

**Rules:** Each card is placed in exactly one group. The score counts placements that match the Group column. Mastery requires a score >= 8 of 10. Card order is shuffled on every run; the three group definitions never change order.

**Learner Activity:**

1. The learner sees one task card at a time and reads the three group definitions.
2. The learner places the card in one group and commits the placement. The sim immediately shows whether it matched and the "Why" sentence.
3. After all ten cards, the learner sees the score and the list of cards placed incorrectly, each with its "Why" sentence.
4. The learner can start another run. Card order is shuffled, and the score of each run is kept on screen so the learner can see whether it improved.

**Feedback:** Ten cards, one placement per card, no change after commit. A matching placement shows "Correct" and the Why sentence. A non-matching placement shows "Not quite" and the Why sentence, followed by the correct group. The final score shows "n of 10 correct", and mastery is stated when n >= 8. The correct group of every card is revealed during the run, after each commit.

**Starting State:** The first card is shown, with the three groups visible and empty. The question on screen is "Who should do this task: the model, you assisted, or only you?"

**Chapter Anchors:** The chapter states ten task cards, three groups, five everyday research tasks, and a mastery score of 8 of 10.
</details>

<iframe src="../../sims/research-task-sorter/main.html" height="672px" width="100%" scrolling="no"></iframe>

*Figure 2. Sort each of the ten task cards into one of the three groups and read the reason after every placement.*

## The Research Pipeline, Productivity, and Reproducibility

The five tasks are not independent. A **research pipeline** is the chaining of tasks so that the output of each becomes the input of the next, usually with loops: analysis sends you back to the question, and writing sends you back to analysis. Seeing the work as a pipeline has a practical consequence. The overall trustworthiness of a pipeline is bounded by its weakest stage, and the weakest stage is often the least glamorous. In the running example, a mis-specified record length at the measurement stage would corrupt the analysis, the figures, and the abstract, and no amount of polish downstream would repair it.

A short calculation shows how errors compound. Suppose, illustratively, that each of the five stages has a 90% chance of being free of consequential error. The chance that the whole pipeline is clean is 0.9⁵ ≈ 0.59, so roughly four runs in ten would carry some error to the end. Raising any single stage to 99% helps only a little, while a verification step at each handoff attacks the product directly. This is the quantitative reason the book spends as much effort on checking as on generating.

The reason to bring AI into a pipeline is **research productivity**: the quantity of validated research output produced per unit of researcher time. The word *validated* is doing the work. A worked example, with illustrative numbers, shows why. A manual literature review of a subtopic takes 40 hours. With an assistant, the first pass takes 12 hours, and 4 further hours are spent verifying citations and reading the key sources. The productivity ratio is 40 / (12 + 4) = 2.5. If verification is skipped, the apparent ratio is 40 / 12 ≈ 3.3, but that figure is counterfeit: the missing 4 hours would have caught the fabricated or misattributed sources, and a single one of them in a submitted paper costs far more than the saving. Honest productivity accounting includes verification time.

Productivity has a second axis that the ratio hides: what the freed time is spent on. Hours recovered from a literature sweep are valuable only if they go to work that needs you, such as reading the three key papers closely, designing a better experiment, or talking to a collaborator. Used to produce more unverified output, the same hours raise the throughput of the pipeline while lowering the quality of what comes out of it.

**Reproducibility** is the property that another researcher, or you in six months, can regenerate a reported result from recorded inputs, code, and environment. Reproducibility is a long-standing norm of experimental science. AI adds new inputs that must be recorded, because the output of a model depends on them: the prompt, the name and version of the model, and the settings used. A model that is silently updated can give a different answer to the same prompt next month.

The following record shows one way to capture these inputs. The `model` and `version` fields identify the system, `temperature` is a setting that controls how random the output is (0 is the most deterministic), and `input_files` names the data the output was derived from.

```yaml
date: 2026-10-15
task: draft search strings for ADC literature search
model: example-assistant
version: 2026-09-snapshot
temperature: 0
prompt_file: prompts/adc-search-strings-v1.txt
input_files: []
output_file: outputs/adc-search-strings-v1.md
reviewed_by: researcher initials, date
```

A few lines like these, kept next to the output, turn an undocumented conversation into a reproducible step. Later chapters build this habit into project files and logs, and [Chapter 17](../17-verification-reproducibility/index.md) develops verification in depth.

The practical test of reproducibility is blunt: delete the output and regenerate it from the recorded inputs on a clean checkout. For AI-assisted steps there is a second, honest limit. Many hosted models cannot be made fully deterministic, and a retired model version cannot be re-run at all. The remedy is to record the *output* alongside the inputs, to treat the model as the source of a candidate and not as a step that must be reproduced bit for bit, and to keep the analysis and computation that follow it fully scripted.

A **research group** is the lab or team within which most of this work happens: an advisor, students, postdocs, and collaborators who share tools, conventions, and a reputation. The unit of adoption for AI is increasingly the group, not the individual. Consider a six-person group in which each member uses a different assistant with different habits. Results are formatted differently, prompts are not shared, and a new student cannot learn the group's practices because there are none. The same group, with a short shared instruction file and a one-page policy on disclosure, gets consistent output and a way to onboard. [Chapter 5](../05-markdown-and-version-control/index.md) shows how to write that file, and [Chapter 18](../18-responsible-ethical-use/index.md) covers group policy.

Group-level choices include which assistants are approved, where instruction files and prompts live in version control, who reviews AI-assisted contributions before they merge into shared results, and how new members learn the conventions. Advisors carry a particular responsibility, because a group's norms about checking are set by what the advisor visibly checks.

## The Vocabulary of Generative AI

The tasks above were described in terms of AI systems without defining them. This section fixes the vocabulary, building from the broadest term to the most specific, because the distinctions among them determine how much you must supervise.

### Generative AI

**Generative AI** is the class of machine learning models that learn the statistical structure of a body of data and use it to produce new samples of the same kind: text, source code, images, audio, or structured data such as circuit netlists. It is contrasted with *discriminative* models, which map an input to a label or a number.

A worked example separates the two. A discriminative model shown a schematic might answer "this is a common-source amplifier", a label drawn from a fixed set. A generative model, given a request for a common-source amplifier with a specified gain, produces a candidate netlist: new text that did not exist before. The second capability is what makes generative systems useful as drafting tools, and it is also what makes them dangerous, because a generated artifact is a plausible sample and not a derivation.

Two consequences follow for how you use it. First, generation is *sampling*: the model draws from a probability distribution over possible outputs, so the same request can return different artifacts, and a setting called *temperature* controls how widely it draws. Second, because correctness is not part of the generation process, correctness must be supplied by a separate test. Electrical engineering is unusually well placed for this, since many generated artifacts can be mechanically checked: a netlist can be simulated, a testbench can be run against a known-good design, a script can be executed on a case with a known answer. The productive pattern is *generate and test*: let the model produce candidates cheaply, and let simulation or measurement decide which survive. Where no test exists, as with a literature summary or an argument, the burden of checking falls on your own reading.

| | Discriminative model | Generative model |
|---|----------------------|------------------|
| Output | A label or a value | New content of the same kind as the training data |
| Example in EE | Classify a waveform as clipped or clean | Draft a testbench or a netlist |
| Typical failure | Wrong label | A plausible but wrong artifact |
| How you check it | Compare with ground truth | Execute, simulate, or inspect it |

*Table 7. Discriminative and generative models.*

### Large Language Models

A **large language model (LLM)** is a neural network trained on very large collections of text and source code to predict the next unit of text, called a *token*, given the preceding tokens. A token is a fragment of text, often a word or part of a word. Repeated prediction, one token after another, produces sentences, programs, and tables. The word *large* refers to the scale of both the training data and the number of learned parameters, and scale is what gave these models their breadth.

A simplified illustration, with invented probabilities, shows the mechanism. Given the prefix "The input impedance of an ideal operational amplifier is", a model assigns a probability to each candidate next token and then selects among them.

| Candidate next token | Illustrative probability |
|----------------------|--------------------------|
| "infinite" | 0.78 |
| "very" | 0.11 |
| "high" | 0.07 |
| "zero" | 0.01 |
| anything else | 0.03 |

*Table 8. Illustrative next-token probabilities (invented for exposition).*

The model is not looking up a fact. It is reproducing the pattern of text it has seen, and when the pattern is dense and consistent, as it is for this textbook fact, the output is right. When the pattern is thin or contradictory, the same mechanism produces fluent text that is false. This failure is called **hallucination**.

!!! mascot-warning "Fluent Does Not Mean True"
    ![Volt raising a warning paw](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A model will happily invent a citation with realistic authors, a plausible journal, and a DOI that goes nowhere. Look up every reference you intend to cite, by its DOI or title, in a database you trust, before it goes into a draft.

[Chapter 2](../02-how-language-models-work/index.md) explains tokens, context windows, and the causes of hallucination in detail. For now, the working rule is that an LLM is a pattern generator whose outputs are hypotheses until checked.

Three limits of a language model are worth carrying into every later chapter. It has a *knowledge cutoff*: it has seen nothing published after its training data was assembled, so recent papers, new device families, and updated standards may be absent or wrong. It has a *context window*: it can attend to only a limited amount of text at once, so a long thesis chapter pasted in whole may be partly ignored. And it is *not deterministic* by default: the same prompt can return different answers on different days. A worked case illustrates the first. Asked for the quiescent current of a specific voltage regulator by part number, a model may return a confident figure that is plausible for the device class and wrong for the part. The remedy is to supply the datasheet and ask the model to answer only from it, which turns recall into reading and lets you check the answer against a page.

### AI Assistants

An **AI assistant** is an application that places an LLM behind a conversational interface. You send a request, optionally with files or pasted text, and the assistant returns a reply, one turn at a time. It carries the conversation history so that follow-ups make sense, and it follows instructions given at the start of the session. What defines an assistant is that you drive: each action in the world is taken by you.

The debugging example makes this concrete. A script fails with an error message. You paste the script and the error into an assistant, which explains the likely cause and returns a corrected version. You copy the fix into your editor, run it yourself, observe the new result, and report back. The assistant never ran the code and never saw the outcome except through your description. This is powerful and cheap to supervise: the assistant cannot do anything you did not do.

Several features of assistants matter in research use. A *system prompt* or custom-instruction field lets you set standing context, such as your field, preferred units, and the rule that every claim must carry a source, so that you do not retype it. *Conversation history* means the assistant can build on earlier turns, but it also means that early mistakes persist and that a long session can drift. Most assistants accept files or pasted text, which turns them into readers of your own material. Vendors can also give them tools such as web search or a code interpreter, which blurs the line toward agents; the practical test is whether the system chooses and takes actions in sequence without you prompting each one. For the purposes of this book, an assistant is the right tool when the task is a single, reviewable transformation: explain this, rewrite that, draft this section, convert this format. It is the wrong tool when the task needs many steps whose intermediate results you do not want to relay by hand.

### AI Agents

An **AI agent** is a system that uses an LLM to decide which actions to take, invokes tools to take them, observes the results, and repeats until a goal is reached or it stops to ask. Four elements define one: a *goal*, a set of *tools* it can call (such as reading files, running code, or searching the web), a *loop* that alternates deciding and acting, and some form of *memory* of what has happened.

Return to the same failing script. An agent given the goal "make the test pass" opens the file, runs the test, reads the error, edits the code, reruns the test, and repeats until the test passes or a limit is reached, reporting what it did. You did not copy anything or run anything. That saves your time, and it changes the risk. The agent took actions, including modifying files, that you did not individually approve, and the success it reports is only as trustworthy as the test it was told to satisfy.

Tools are the point of leverage and the point of risk. A file-reading tool lets an agent work from your actual project instead of a description of it; a code-execution tool lets it test its own work; a web tool lets it retrieve sources. Each tool also defines what can go wrong: a shell tool can delete files, and a network tool can send data out of your institution. Limits therefore attach to tools, not to the model: which directories an agent can write to, which commands it may run, and how many steps it may take before it must stop and report. [Chapter 8](../08-agents-tool-use-subagents/index.md) treats these controls in detail.

| | AI assistant | AI agent |
|---|--------------|----------|
| Who takes actions in the world | You | The system, through tools |
| Unit of work | One reply to one request | A multi-step task toward a goal |
| What you review | The reply, before you use it | The plan, the actions taken, and the final result |
| Main risk | Accepting a wrong reply | Actions with side effects you did not see |
| Typical supervision | Read and apply | Set limits, log, and check afterward |

*Table 9. Assistant and agent compared.*

!!! mascot-thinking "The Difference Is Who Closes the Loop"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    An assistant answers and waits for you to act. An agent acts, looks at what happened, and acts again. Think of it like this: every step an agent takes without you is a step you must be able to audit afterward.

Before the next exercise, note the chain of terms the chapter has built: generative AI is the broad class, an LLM is a generative model specialized for language, an assistant wraps an LLM in a conversational interface, and an agent adds tools and a loop to an assistant.

#### Diagram: From Generative AI to Agent

<details markdown="1">
<summary>From Generative AI to Agent</summary>
Type: graph-model
**sim-id:** generative-ai-to-agent<br/>
**Library:** vis-network<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/ai-strategy-for-education/tree/main/docs/sims/ai-agent-anatomy<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain what capability each of three links in the chain from generative AI to AI agent adds, by selecting the correct capability for all three links.

**Prerequisites:** generative AI, large language model, AI assistant, AI agent, tool, loop (all defined in the section "The Vocabulary of Generative AI" above).

**Evidence of Mastery:** For each of three links, the learner chooses the one capability that the link adds from four options and commits the choice. A choice is correct when it matches the Correct option in the Content table. Mastery is 3 of 3 correct, counting the first commit on each link. Opening a node to read its definition is exploration, not evidence.

**Misconceptions:** (1) An assistant and an agent are the same thing with different branding. (2) A larger model is what turns an assistant into an agent. (3) An agent is simply a chatbot with a friendlier tone or a longer memory.

**Instructional Rationale:** An Understand objective is met when the learner can say what changes between two things, not just recite each. Each link asks "what does the next term add?", and the learner predicts before the correct capability is revealed.

**Content:**

The four nodes, in order along the chain:

| Order | Node | Definition shown when the node is opened |
|---|---|---|
| 1 | Generative AI | Models that learn the structure of data and produce new content of the same kind (text, code, or images) |
| 2 | Large Language Model | A generative model trained on very large text and code collections to predict the next token |
| 3 | AI Assistant | An application that puts a language model behind a conversational interface, where you drive and each reply is one turn |
| 4 | AI Agent | A system that uses a language model to choose actions, calls tools, observes the results, and repeats toward a goal |

The three links, each with four options:

| Link | Correct option | Distractor 1 | Distractor 2 | Distractor 3 |
|---|---|---|---|---|
| Generative AI to Large Language Model | Specializes in language: it is trained to predict the next token of text and code | Adds a chat window | Adds tools it can call | Adds a loop that repeats until a goal is met |
| Large Language Model to AI Assistant | Adds a conversational interface with instructions, history, and turn-by-turn replies | Adds permission to run code on your computer | Adds more training data | Adds the ability to schedule itself without being asked |
| AI Assistant to AI Agent | Adds tools and a loop: it acts, observes the result, and chooses the next step | Adds a larger vocabulary | Adds a different training objective | Adds a friendlier tone |

Feedback for each distractor (shown when it is chosen):

| Link | Distractor | Feedback |
|---|---|---|
| Generative AI to Large Language Model | Adds a chat window | A chat window belongs to an assistant, which comes next in the chain |
| Generative AI to Large Language Model | Adds tools it can call | Tools belong to agents, which come last in the chain |
| Generative AI to Large Language Model | Adds a loop that repeats until a goal is met | A repeating loop is what turns an assistant into an agent |
| Large Language Model to AI Assistant | Adds permission to run code on your computer | Running code is a tool, which defines agents |
| Large Language Model to AI Assistant | Adds more training data | Training data shapes the model itself, not the application wrapped around it |
| Large Language Model to AI Assistant | Adds the ability to schedule itself without being asked | Acting without being asked is a feature of always-on agents, not of assistants |
| AI Assistant to AI Agent | Adds a larger vocabulary | Vocabulary is a property of the underlying model, which is the same in both |
| AI Assistant to AI Agent | Adds a different training objective | Both use the same kind of model; the difference is in how it is used |
| AI Assistant to AI Agent | Adds a friendlier tone | Tone is a style setting; it has nothing to do with taking actions |

**Provenance:** Definitions and distractors are original to this chapter and match the definitions in "The Vocabulary of Generative AI".

**Rules:** The chain has four nodes and three links, always in the order listed. The order of the four options for each link is shuffled on each run. Each link is answered once, in chain order, and a link cannot be answered until the previous link has been answered. Mastery requires 3 of 3 correct on the first commit.

**Learner Activity:**

1. The learner opens any of the four nodes to read its definition. This is exploration and is not scored.
2. The learner starts the exercise at the first link. The sim shows the two nodes the link connects and asks "What does the second term add to the first?"
3. The learner selects one of four options and commits. The sim shows the feedback and, if the choice was wrong, the correct option.
4. The learner proceeds to the next link until all three are answered, then sees the score.
5. The learner may restart. Option order is reshuffled.

**Feedback:** Three links, fixed order, one commit per link per run, no change after commit. A correct commit shows "Correct" and the correct option. An incorrect commit shows the feedback from the table for the chosen distractor, followed by the correct option. The final score shows "n of 3 correct", and mastery is stated when n = 3. Correct options are revealed after each commit.

**Starting State:** The four nodes are shown in a row, connected by three links, none yet answered. The question on screen is "What changes at each step from generative AI to an AI agent?"

**Chapter Anchors:** The chapter states four terms and three links, and states that an agent adds tools and a loop to an assistant.
</details>

<iframe src="../../sims/generative-ai-to-agent/main.html" height="762px" width="100%" scrolling="no"></iframe>

*Figure 3. Open each node to read its definition, then answer what each of the three links adds.*

### Agentic Research

**Agentic research** is research conducted by delegating multi-step tasks to AI agents, with the researcher setting goals, defining limits, and verifying results. It is the combination of the task vocabulary and the agent vocabulary of this chapter: the five tasks, performed in part by systems that act.

A worked example shows the scale of the change. Before leaving for the evening, you give an agent the goal "find, deduplicate, and summarize every paper from the last three years on SAR ADCs below 100 µW", with the instruction to record each source's DOI and to flag anything it could not verify. In the morning you do not receive an answer. You receive a draft annotated list, a log of what was searched, and a list of items marked unverified. The remaining work, deciding which items matter and checking the flagged ones, is faster and better directed than starting from nothing.

Two cautions keep the example honest. The agent's list is a *search result*, not a literature review: its coverage depends on the databases it could reach and the terms it chose, and a gap in the list is invisible unless you probe for it with a second, differently phrased sweep or with a known paper that should have appeared. And the log is only evidence of what the agent says it did; sampling a few entries and reproducing them yourself is how you establish that the log can be trusted. A newer class of *always-on* personal agents extends this pattern to agents that keep their own cloud computer and work continuously; [Chapter 19](../19-always-on-personal-agents/index.md) and the [Personal Agents appendix](../../appendices/personal-agents/index.md) cover them and the questions they raise.

## Directing Agents Responsibly

Using agents well is a skill with two halves: dividing the work so that each part can be handed off and checked, and placing yourself in the work at the points where your judgment matters most. The next two concepts are those halves.

### Task Decomposition

**Task decomposition** is the breaking of a goal into subtasks small enough to specify, delegate, and verify, together with the dependencies among them. A subtask is well formed when it has a clear input, a limited scope, an output you can check, and a known place in the order of work. Decomposition is the most transferable skill in this book, because it determines what you can safely hand to an agent and what you cannot.

A worked example uses the running project. The goal is to compare the measured and simulated ENOB of two ADC designs. Stated that way, it is not a task an agent can be given, because it does not say what to do first. Decomposed, it becomes six subtasks, shown with their prerequisites in Table 10.

| ID | Subtask | Output you can check | Prerequisite |
|----|---------|----------------------|--------------|
| S1 | Define the ENOB measurement procedure: input frequency, amplitude, and record length | A one-page procedure | none |
| S2 | Simulate both designs using the procedure | Two simulated output records | S1 |
| S3 | Measure both fabricated chips using the procedure | Two measured output records | S1 |
| S4 | Compute ENOB from each simulated record | Two simulated ENOB values | S2 |
| S5 | Compute ENOB from each measured record | Two measured ENOB values | S3 |
| S6 | Compare simulated and measured ENOB and explain differences | A comparison table and a short explanation | S4, S5 |

*Table 10. The ADC comparison goal decomposed into six subtasks.*

Two properties are worth noticing. S2 and S3 can proceed in either order or in parallel, because both depend only on S1. And each subtask names an output you can inspect, which is what lets you hand it to an agent and later verify it without redoing it.

The criteria for a well-formed subtask can be applied as a checklist. Does it have a stated input? Does it produce an artifact you could inspect, not just an activity? Is its scope small enough that a failure is easy to localize? Are its prerequisites explicit? And can it be accepted or rejected without redoing it? A subtask that fails the second question, such as "think about the measurement", is an intention and not a task. A subtask that fails the third, such as "build the whole analysis toolchain", hides several tasks inside one and makes failure ambiguous. Decomposition also exposes *hidden dependencies*: in the example, nobody can compute a measured ENOB before the chips are measured, and nothing can be measured before the procedure fixes the record length. Discovering that on paper costs minutes; discovering it in the lab costs a fabrication cycle.

!!! mascot-encourage "If Decomposition Feels Vague, That Is Normal"
    ![Volt offering encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Most people write a first breakdown that is either too coarse to delegate or too fine to bother with, and that is how everyone starts. Work backward from the deliverable: ask what the last step must receive, then what produces that, and repeat until each piece has a checkable output.

The exercise below uses the same goal. You are given eight candidate subtasks, of which six are correct and two are not, and must put the correct ones in a valid order.

#### Diagram: Research Task Decomposition Builder

<details markdown="1">
<summary>Research Task Decomposition Builder</summary>
Type: microsim
**sim-id:** research-task-decomposition-builder<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** apply<br/>
**Learning Objective:** The learner will apply the criteria of a checkable output and a valid order to select six well-formed subtasks from eight candidates and sequence them so every prerequisite precedes its dependent.

**Prerequisites:** task decomposition, subtask, prerequisite, checkable output, effective number of bits (ENOB) (all defined in the sections "Task Decomposition" and "The Setting: Electrical Engineering Research" above).

**Evidence of Mastery:** The learner builds one ordered list from the eight candidates and submits it. The submission is correct when (a) it contains exactly the six subtasks S1 to S6 and neither distractor, and (b) for every subtask in the list, all of its prerequisites appear earlier in the list. Mastery is a correct submission within two submissions. Moving cards before submitting is exploration, not evidence.

**Misconceptions:** (1) A goal such as "do the research" is a subtask. (2) Every subtask must follow a single fixed sequence, when S2 and S3 are independent. (3) A subtask that improves the design belongs in a comparison of measured and simulated ENOB.

**Instructional Rationale:** Apply-level skill is shown by using a stated criterion on a new case. The learner applies two criteria, checkable output and prerequisite order, to a concrete goal and gets a specific reason for each error, so the criteria become something to use rather than recite.

**Content:**

The goal shown to the learner: "Compare the measured and simulated ENOB of two ADC designs."

The eight candidate subtasks, shown in a shuffled order:

| ID | Candidate subtask | In the answer? | Prerequisites | Why (shown as feedback) |
|---|---|---|---|---|
| S1 | Define the ENOB measurement procedure: input frequency, amplitude, and record length | Yes | none | Both simulation and measurement must use the same procedure, so it comes first |
| S2 | Simulate both designs using the procedure | Yes | S1 | Needs the procedure from S1 |
| S3 | Measure both fabricated chips using the procedure | Yes | S1 | Needs the procedure from S1; independent of S2 |
| S4 | Compute ENOB from each simulated output record | Yes | S2 | Needs the simulated records from S2 |
| S5 | Compute ENOB from each measured output record | Yes | S3 | Needs the measured records from S3 |
| S6 | Compare simulated and measured ENOB and explain the differences | Yes | S4, S5 | Needs both sets of ENOB values |
| D1 | Do the research on the ADC | No | not applicable | Not a subtask: it has no checkable output and no defined scope |
| D2 | Improve the ADC until its ENOB reaches 9.5 bits | No | not applicable | Out of scope: the goal is to compare ENOB, not to change the design |

**Provenance:** The goal, subtasks, and prerequisites are the six subtasks in Table 10 of this chapter. The two distractors are original to this exercise. The subtask descriptions are illustrative.

**Rules:** A submission is valid when all six of S1 to S6 are present and no distractor is present. The prerequisite rule is evaluated for every subtask: each prerequisite in its Prerequisites column must appear at an earlier position. S2 and S3 may appear in either order. S4 must appear after S2, and S5 after S3. S6 must appear after both S4 and S5. An empty submission is rejected, and a submission with fewer than six cards is reported as incomplete.

**Learner Activity:**

1. The learner reads the goal and the eight candidate cards.
2. The learner selects the cards that are valid subtasks and arranges them in an order. Cards can be added, removed, and reordered freely.
3. The learner submits the list. The sim checks the Rules and reports every problem found, each with its Why sentence.
4. The learner revises and submits again, once more at most. After a correct submission, or after the second submission, the answer and reasons for every card are revealed.

**Feedback:** Two submissions allowed. A correct submission shows "Valid: six subtasks, every prerequisite in place." An incorrect submission lists each problem: a distractor included (with its Why sentence), a required subtask missing, or an ordering violation (naming the card and the prerequisite it precedes). The full answer and reasons are shown after a correct submission or after the second submission, whichever comes first. The result shown is "Correct within n submission(s)" or "Not yet correct".

**Starting State:** The eight cards are laid out unselected and unordered. The question on screen is "Which of these are well-formed subtasks for this goal, and in what order?"

**Chapter Anchors:** The chapter states that the goal decomposes into six subtasks S1 to S6, that S2 and S3 depend only on S1, and that S6 depends on S4 and S5.
</details>

<iframe src="../../sims/research-task-decomposition-builder/main.html" height="862px" width="100%" scrolling="no"></iframe>

*Figure 4. Select the six well-formed subtasks and put them in an order where every prerequisite comes first.*

### Human in the Loop

**Human in the loop** is a design in which a person reviews, approves, or steers an automated process at defined points, retaining the ability to stop it. It is not a single setting. Systems differ in *where* the human sits and *how often* they must act.

| Position | What the human does | Suitable when |
|----------|---------------------|---------------|
| In the loop | Approves each consequential action before it runs | Actions are irreversible or leave your control |
| On the loop | Monitors a log and can interrupt | Actions are reversible and the volume is high |
| Out of the loop | Reviews only the final result | The output is cheap to check and the process cannot cause harm |

*Table 11. Three positions of a person relative to an automated process.*

Choosing the position is a judgment about cost. Three questions settle most cases. Is the action reversible? Does the output leave your control, by being sent, published, or used to commit resources? And does the output become a reported result, so that an error in it propagates into your claims? If the answer to any is yes, a review point belongs before the output is used. If none is, the process can usually run with lighter supervision.

A worked example applies the questions to an analysis agent working on your measured data. Suppose the agent proposes to overwrite the raw measurement files with cleaned versions. The action is irreversible, so the question is settled: stop and require approval, and better still, instruct the agent to write cleaned data to a new file so the original is never at risk. Now suppose the agent proposes to rename a column in a copy of the file. The action is reversible, the copy stays with you, and the change is trivially visible. No approval is needed, and asking for one would only teach you to click through requests.

A known weakness of review is *automation bias*: the tendency to accept the output of an automated system with less scrutiny than the same output from a person, particularly when the system has been right many times before. A reviewer who has approved fifty correct outputs approves the fifty-first by habit. Designs that counter it ask the reviewer to do something that cannot be done by habit: state the expected value before seeing the output, check a random sample against the source rather than the first few items, or write a short reason for approval. Review that has become a click is a loop in name only.

!!! mascot-tip "Ask the Question Every Time"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before accepting any output, ask, "How would you check that?" If the honest answer is "I wouldn't", it is not ready to use. If you can name the check and it is cheap, run it.

The exercise below gives you eight steps an agent might take in an analysis workflow and asks you to judge which of them need your review before the output is used.

#### Diagram: Review Checkpoint Judge

<details markdown="1">
<summary>Review Checkpoint Judge</summary>
Type: microsim
**sim-id:** review-checkpoint-judge<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/theory-of-knowledge/tree/main/docs/sims/research-ethics-checkpoints<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, for each of eight agent steps in an analysis workflow, whether a human review checkpoint is required before its output is used, agreeing with the answer key on at least 7 of 8 steps.

**Prerequisites:** human in the loop, reversible and irreversible actions, output that leaves your control, output that becomes a reported result (all defined in the section "Human in the Loop" above).

**Evidence of Mastery:** For each of eight agent steps, the learner commits one of two judgments, "Review required" or "No review needed", and selects the main reason from three offered reasons. A step is correct when the judgment matches the Review column of the Content table. Mastery is 7 of 8 judgments correct on the first run. Reading the three questions listed in the Rules is exploration, not evidence.

**Misconceptions:** (1) Every agent action needs review, so review is never a choice. (2) A step that looks harmless needs no review even when it is irreversible. (3) A step that only drafts something is safe to send without review.

**Instructional Rationale:** Evaluating requires judging against criteria and justifying the judgment. The learner applies three explicit criteria to eight cases and must pick the reason for the judgment, which separates a correct guess from a correct decision.

**Content:**

The three criteria (shown at all times):

| Criterion | Question |
|---|---|
| Reversibility | Is the action irreversible? |
| Outward effect | Does the output leave your control by being sent, published, or used to commit resources? |
| Reported result | Does the output become a result you will report? |

A step requires review when at least one criterion applies.

The eight agent steps:

| # | Agent step shown to the learner | Review | Main reason | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | The agent lists 20 candidate keywords for a literature search | No review needed | No criterion applies | A poor keyword only wastes one search, and you see it at once |
| 2 | The agent reports "Smith 2021 shows 12-bit ENOB at 40 µW" with a citation | Review required | Reported result | The claim and the citation may be fabricated, and would enter your paper |
| 3 | The agent renames a column header in a copy of the data file | No review needed | No criterion applies | The change is reversible, the original is preserved, and it is easy to see |
| 4 | The agent runs a script that overwrites the raw measurement files | Review required | Reversibility | Raw data lost this way cannot be recovered |
| 5 | The agent computes ENOB = 10.3 from your data and says it will go in the abstract | Review required | Reported result | A number entering a manuscript must be checked independently |
| 6 | The agent sends an email asking a collaborator for a dataset | Review required | Outward effect | Sending cannot be undone and the message speaks for you |
| 7 | The agent drafts the same email and leaves it unsent in the drafts folder | No review needed | No criterion applies | Nothing leaves your control until you send it |
| 8 | The agent changes a simulation parameter on a scratch branch under version control | No review needed | No criterion applies | The change is reversible and isolated from the main work |

**Provenance:** The criteria are the three questions in the section "Human in the Loop". The steps and answer key are original to this chapter. The values mentioned (20 keywords, 12-bit, 40 µW, ENOB = 10.3) are illustrative.

**Rules:** A step is "Review required" when at least one of the three criteria applies, and "No review needed" when none applies. The score counts steps where the judgment matches the Review column. The reason offered for each step is one of "Reversibility", "Outward effect", or "Reported result", plus "No criterion applies" for steps that need no review. Mastery requires a score >= 7 of 8. Step order is shuffled on each run.

**Learner Activity:**

1. The learner sees the three criteria and one agent step at a time.
2. The learner judges the step "Review required" or "No review needed" and selects the main reason. The learner commits both.
3. The sim shows whether the judgment matched, the Why sentence, and the correct reason.
4. After eight steps, the learner sees the score and the steps judged incorrectly with their Why sentences.
5. The learner may run again with a reshuffled order.

**Feedback:** Eight steps, one commit per step, no change after commit. A correct judgment with the correct reason shows "Correct". A correct judgment with the wrong reason shows "Right decision, different reason" and the correct reason. An incorrect judgment shows "Not quite", the Why sentence, and the correct judgment. The score counts judgments only, and is shown as "n of 8". Answers are revealed after each commit.

**Starting State:** The three criteria are shown, and the first step is shown with neither judgment selected. The question on screen is "Does this output need your review before it is used?"

**Chapter Anchors:** The chapter states three criteria (reversibility, outward effect, reported result), eight steps, four steps that require review, and four that do not.
</details>

<iframe src="../../sims/review-checkpoint-judge/main.html" height="742px" width="100%" scrolling="no"></iframe>

*Figure 5. Judge whether each agent step needs your review, and name the main reason.*

### The Researcher as Orchestrator

The **researcher as orchestrator** is the organizing idea of this book: instead of performing every task personally, the researcher directs a team of agents, sets direction, supplies domain judgment, resolves conflicts among them, and decides what is true. The model developed in later chapters assigns roughly 20 planning agents, which explore, decompose, and specify, and 10 execution agents, which write code, run analyses, and prepare figures. The numbers are a design target, not a law; they express the idea that planning is cheap to parallelize and execution needs closer supervision.

In the running example, the orchestrator's day might look like this. Several planning agents each take a different part of the ADC comparison: one surveys architectures, one drafts the measurement procedure (S1), one proposes how to estimate uncertainty. You read their outputs, resolve a disagreement between two of them about record length by reasoning from the converter's bandwidth, and approve the procedure. Execution agents then run the simulations (S2), compute simulated ENOB (S4), and, when the chips are measured, the measured ENOB (S5). You are not typing the scripts. You are choosing what gets run, checking what comes back against the test oracle from the coding section, and signing the result. The work has not become easier so much as it has moved: from production to direction and verification.

The orchestrator's scarcest resource is attention, not typing speed. Each additional agent adds output to review, so the useful size of a team is set by how much you can verify, not by how many agents you can launch. Chapters 9 and 10 develop roles, handoffs, and the supervision techniques that keep a team of this kind honest.

## Summary and Key Takeaways

Research in electrical engineering is a workflow of repeatable tasks with checkable outputs, and AI systems now absorb a substantial share of the procedural layer. The researcher's job is to supply what the workflow cannot: the question, the domain judgment, and the accountability.

The main points to carry forward:

- **The workflow** consists of five everyday tasks (literature search, data analysis, brainstorming, scientific coding, manuscript preparation) chained into a pipeline whose trustworthiness is bounded by its weakest stage.
- **A precise research question** with a metric and a threshold is the cheapest quality control available when using AI.
- **Generative AI, large language models, assistants, and agents** form a chain; an agent adds tools and a loop to an assistant, and with them, actions you did not individually approve.
- **LLM output is a hypothesis until checked**, because fluent text can be false.
- **Productivity must include verification time**, and reproducibility now includes recording prompts, models, and settings.
- **Task decomposition** into subtasks with checkable outputs is what makes delegation safe.
- **Human review belongs** where an action is irreversible, leaves your control, or becomes a reported result.
- **The researcher as orchestrator** directs and verifies; accountability for the science stays with you.

!!! mascot-celebration "You Have the Map"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now name the five research tasks, tell an assistant from an agent by who closes the loop, and decide where a human review point belongs. That is the vocabulary and the habit of checking that the rest of this book builds on.

The next chapter looks inside the models themselves, so that the failure modes introduced here, hallucination in particular, become something you can reason about rather than something that surprises you. Round up the evidence, and bring the question you would most like an agent to help with.
