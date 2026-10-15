---
title: "AI-Assisted Manuscript Preparation"
description: "Following a paper from structure to submission with AI help: outlining, drafting, revision, author voice, LaTeX, figures and captions, reference formatting, venue requirements, peer review responses, arXiv submission, authorship, and co-author review."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 11:11:29"
version: 1.11
---

# AI-Assisted Manuscript Preparation

## Summary

This chapter follows a paper from structure to submission: outlining, drafting, revision, author voice, LaTeX, figures and captions, reference formatting, venue requirements, peer review responses, and arXiv submission. It also covers authorship and co-author review. After this chapter you can draft a section from notes and revise it into your own voice.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Paper Structure | 15 |
| Abstract Writing | 2 |
| Outline Generation | 9 |
| Drafting | 8 |
| Revision | 7 |
| Author Voice | 1 |
| LaTeX | 6 |
| Figure Preparation | 4 |
| Figure Captions | 1 |
| Reference Formatting | 3 |
| arXiv Submission | 2 |
| Peer Review Response | 1 |
| Technical Editing | 3 |
| Style Consistency | 1 |
| Grammar and Clarity | 1 |
| Authorship | 3 |
| Co-Author Review | 1 |
| Venue Requirements | 3 |
| Cover Letter | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 3: Choosing Models and Writing Clear Prompts](../03-models-and-prompt-basics/index.md)
- [Chapter 4: Context Engineering and Advanced Prompting](../04-context-engineering-prompting/index.md)
- [Chapter 5: Markdown Project Files and Version Control](../05-markdown-and-version-control/index.md)
- [Chapter 6: Knowledge Bases, Personal Knowledge Graphs, and the Anatomy of an Agent Skill](../06-knowledge-bases-skill-anatomy/index.md)
- [Chapter 9: Supervising Agents and Defining Agent Roles](../09-supervising-agents-roles/index.md)
- [Chapter 11: AI-Assisted Literature Search and Synthesis](../11-literature-search-synthesis/index.md)
- [Chapter 12: AI-Assisted Data Analysis and Scripting](../12-data-analysis-scripting/index.md)

!!! mascot-welcome "The Paper Is Yours"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A model can turn notes into prose faster than you can type, and prose that has not passed through your judgment is not your paper. This chapter shows how to let an agent draft and polish while every claim, every number, and the voice stay yours. Trust, but verify!

## Structure, Outline, and Abstract

**Paper structure** is the standard arrangement of a research paper into sections that each answer one reader question. For an engineering paper the arrangement is usually an abstract, an introduction, related work, the method or design, the experiments and results, a discussion, and a conclusion. Readers rely on this: they go to the results for the numbers and to the discussion for the limits. A paper that follows the convention is read faster and judged more fairly.

| Section | The reader's question | Typical contents |
|---|---|---|
| Abstract | Should I read this? | Context, gap, contribution, headline result, significance |
| Introduction | Why does this matter? | Problem, why it is hard, contribution, roadmap |
| Related work | What is already known? | Grouped prior work and the remaining gap |
| Method | What exactly was done? | Design, algorithm, setup, enough to reproduce |
| Results | What was found? | Data, tables, figures, with conditions |
| Discussion | What does it mean, and what are the limits? | Interpretation, limitations, comparison |
| Conclusion | What should I take away? | Summary and future work |

*Table 1. The sections of a typical engineering paper and the question each answers.*

**Outline generation** is producing the skeleton of the paper, section by section, with the claim each paragraph will make. It is the stage at which an agent saves the most effort and the one at which your control matters most, because the outline fixes the argument. A good outline is a list of claims, each tied to the evidence that supports it, such as a result file, a figure, or a reference. Give the agent your notes and results, ask for an outline in which every bullet is a claim and names its evidence, and ask it to mark any bullet for which no evidence was supplied. Those marks are the work still to be done.

**Abstract writing** is the compression of the whole paper into about 150 to 250 words. An abstract has a fixed anatomy, and it is useful to check a draft against it: one sentence of context, one stating the gap or problem, one stating what the paper contributes, one or two giving the key result with its numbers and conditions, and one on significance. The most common defect is a result stated without a number. Write the abstract last, from the finished paper, and make sure every number in it appears in the body.

## Drafting and Revising

**Drafting** is writing the first version of a section. A dependable method for working with an agent is to draft from claims, not from a topic. For each paragraph, supply the claim, the evidence, and the intended reader, and instruct the agent to use only the supplied material and to insert a marker such as `[NO EVIDENCE]` wherever it would have to assert something not supplied. The marker is what keeps a fluent draft from smuggling in claims you cannot support.

**Revision** is the repeated improvement of a draft, and it benefits most from a human eye on the argument and a machine's help on the sentences. The sequence that works is to revise the structure first (order of sections and paragraphs), then the argument within paragraphs, then the sentences, and last the surface. A model asked to "improve this" at the start works on the surface and leaves a structural problem in place.

**Author voice** is the consistent personality and phrasing of your writing, and it is what makes a paper read as written by one person. Left alone, models drift toward a generic register: long lists of three, stock transitions, and claims of significance larger than the evidence. Three practices protect your voice. Draft the sections that carry the argument yourself, such as the introduction and discussion, and use the agent for the more routine ones. When you ask for edits, supply a paragraph of your own earlier writing as a style sample and an instruction to edit and not to rewrite. And read the result aloud. If a sentence sounds like no one you know, change it.

Revision by an agent has a specific hazard, which is that numbers and claims change without notice while the prose improves. The check is mechanical and cheap. The script below, with its logic explained first, extracts every number from the text before and after an edit and reports any number that appears in only one of them. The regular expression matches optional signs, digits, decimal points, and thousands separators.

```python
import re, sys

def numbers(text):
    return set(re.findall(r"[-+]?\d[\d,]*\.?\d*", text))

before = open(sys.argv[1]).read()
after = open(sys.argv[2]).read()
b, a = numbers(before), numbers(after)
print("only in original:", sorted(b - a))
print("only in revision:", sorted(a - b))
```

Run on a revised paragraph, it takes a second and flags a changed ENOB figure that no amount of reading fluent prose would have caught. A clean report does not prove that the claims are unchanged, since a qualifier could have been deleted, but a report with differences is always worth reading.

!!! mascot-tip "Edit, Do Not Rewrite, and Diff the Numbers"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Tell the agent to preserve every number, unit, and claim, and to change only the wording. Then run the number check and read `git diff` on the paper source. A revision that changes a number or removes a qualifier is not a revision.

#### Diagram: Paper Section Sorter

<details markdown="1">
<summary>Paper Section Sorter</summary>
Type: microsim
**sim-id:** paper-section-sorter<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of ten sentences from an engineering paper into the section where it belongs, with at least 8 of 10 classified correctly.

**Prerequisites:** the sections of a paper and the reader question each answers, defined in the section "Structure, Outline, and Abstract" above.

**Evidence of Mastery:** For each of ten sentences the learner commits one of six sections. A classification is correct when it equals the answer in Content. Mastery is at least 8 of 10 correct on the first attempt. Reading the table of sections is exploration and is not evidence.

**Misconceptions:** (1) Any sentence with a number is a result. (2) A contribution statement belongs only in the abstract. (3) A limitation belongs in the conclusion and not in the discussion.

**Instructional Rationale:** Understand-level classification needs the learner to explain a sentence's function by the reader question it answers. The sentences are drawn from one invented paper so that the sections can be compared in context.

**Content:**

All sentences are invented for illustration and labeled "illustrative". The six sections are Abstract, Introduction, Related work, Method, Results, and Discussion.

| # | Sentence | Correct section | Why (shown as feedback) |
|---|---|---|---|
| 1 | Successive-approximation converters dominate low-power sensor interfaces, yet their accuracy is limited by capacitor mismatch. | Introduction | It states the problem and why it matters. |
| 2 | Prior calibration schemes either require a dedicated reference or converge slowly [3], [7]. | Related work | It positions earlier work and points to the gap. |
| 3 | The comparator offset is measured by shorting its inputs and averaging 256 decisions. | Method | It states what was done, in enough detail to reproduce. |
| 4 | The calibrated converter reaches an ENOB of 9.4 bits at 1 MS/s. | Results | It reports a measured finding. |
| 5 | The residual error is consistent with the thermal noise of the comparator, which suggests that a larger input pair would give a further gain. | Discussion | It interprets a result and points to a consequence. |
| 6 | Measurements were taken on 12 devices from one wafer at 25 °C with a 4,096-sample record. | Method | It describes the experimental setup. |
| 7 | We present a foreground offset calibration for SAR ADCs that raises measured ENOB from 8.6 to 9.4 bits at 1 MS/s in 65 nm CMOS using 45 µW. | Abstract | It compresses context, contribution, and key result with numbers into one sentence. |
| 8 | Table II lists the ENOB of the 12 devices before and after calibration. | Results | It presents the data. |
| 9 | The gain is limited to chips with an offset below 15 mV, since larger offsets saturate the correction range. | Discussion | It states a limitation. |
| 10 | Section III describes the calibration algorithm and Section IV the measurement setup. | Introduction | It is the roadmap paragraph that ends an introduction. |

**Provenance:** The sections and their questions are from the section "Structure, Outline, and Abstract" of this chapter. The sentences and values are invented for illustration.

**Rules:** Each sentence has exactly one correct section. A sentence is classified by the reader question it answers.

**Learner Activity:**

1. The learner reads sentence 1.
2. The learner chooses one of the six sections and submits.
3. The sim shows whether it was correct and the "Why" sentence.
4. After sentence 10, the sim shows the count correct and the sentences grouped by section.

**Feedback:** Ten sentences, one attempt each, in a fixed order. Correct: "Correct: <section>." plus the "Why" sentence. Incorrect: "This belongs in <section>." plus the "Why" sentence. The correct section is always revealed after the single attempt. A final score "n of 10 correct" is shown with whether the mastery threshold of 8 was met.

**Starting State:** Sentence 1 is shown with six sections and none chosen. The question on screen is "Which reader question does this sentence answer?"

**Chapter Anchors:** The chapter lists the sections and the reader question each answers, states that an abstract compresses context, gap, contribution, and result, and that the introduction ends with a roadmap.
</details>

<iframe src="../../sims/paper-section-sorter/main.html" height="742px" width="100%" scrolling="no"></iframe>

*MicroSim: Paper Section Sorter. [Open it fullscreen](../../sims/paper-section-sorter/main.html).*

## Figures, LaTeX, and References

**LaTeX** is the typesetting system that most engineering venues use, and it is plain text. That makes it a good fit for the version-controlled project of Chapter 5 and for agents, which write LaTeX fluently. The cautions are practical. An agent may use packages your venue's template does not allow, produce markup that compiles with warnings, or silently alter a macro. Keep the venue's class file and template unchanged, compile after every substantial edit, and read the log for warnings, since a wrong cross-reference shows up there as `??` in the output.

**Figure preparation** is making the figures that carry the results, and the standards are those of Chapter 12: labeled axes with units, a legible size at the column width, visible spread, and a consistent style across figures. Generate every figure from a script that reads the processed data, so that the figure can be regenerated when the data change. A figure drawn by hand in an editor cannot be reproduced and tends to go stale.

**Figure captions** are the text that makes a figure readable without searching the body for its context. A good caption states what is plotted, the conditions under which the data were obtained, how to read any markers or error bars, and, where it helps, the one observation the reader should take. The standard to apply is that the figure and caption together can be understood without the body text.

#### Diagram: Figure Caption Critic

<details markdown="1">
<summary>Figure Caption Critic</summary>
Type: microsim
**sim-id:** figure-caption-critic<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** critique<br/>
**Learning Objective:** The learner will critique each of six figure captions by naming its main defect, or that it has none, with at least 5 of 6 judged correctly.

**Prerequisites:** figure caption and the four properties of a good caption (what is plotted, conditions, how to read it, no unsupported claim), all defined in the section "Figures, LaTeX, and References" above.

**Evidence of Mastery:** For each of six captions the learner commits one of five judgments. A judgment is correct when it equals the answer in Content. Mastery is at least 5 of 6 correct on the first attempt. Reading the checklist is exploration and is not evidence.

**Misconceptions:** (1) A short caption is a good caption. (2) A caption can rely on the body text for its conditions. (3) A caption should state the paper's main claim.

**Instructional Rationale:** Evaluate-level work needs the learner to apply a checklist to a caption and name the failing criterion. One item has a caption that is long but has no defect, and one has a short caption that fails, so that length is not a cue.

**Content:**

All captions are invented for illustration and labeled "illustrative". Judgment options: Vague, Missing conditions, Undefined symbols, Overclaims, No defect.

| # | Caption | Correct judgment | Why (shown as feedback) |
|---|---|---|---|
| 1 | Figure 3. ENOB results. | Vague | It does not say what is plotted against what, so the reader cannot tell what the figure shows. |
| 2 | Figure 4. Measured ENOB versus input frequency for 12 devices at 1 MS/s, 1.0 V, and 25 °C. Markers show the mean and error bars show one standard deviation. | No defect | It states the quantity, the conditions, and how to read the markers. |
| 3 | Figure 5. Measured ENOB versus input frequency. | Missing conditions | The sampling rate, supply, temperature, and number of devices are not stated. |
| 4 | Figure 6. SNDR versus input frequency at 1 MS/s, 1.0 V, and 25 °C, showing that our design is the best known SAR ADC. | Overclaims | A single figure of SNDR versus frequency cannot establish that the design is the best known. |
| 5 | Figure 7. FoM_W versus fs for ADC1 to ADC9 (measured, 65 nm). | Undefined symbols | FoM_W, fs, and ADC1 to ADC9 are not defined in the caption. |
| 6 | Figure 8. Power breakdown of the converter at 1 MS/s and 1.0 V (simulated, typical corner): comparator 38 percent, DAC 27 percent, logic 25 percent, clock 10 percent. | No defect | It states the conditions, that the data are simulated, and the breakdown, which sums to 100 percent. |

**Provenance:** The caption properties are from the section "Figures, LaTeX, and References" of this chapter. The captions and values are invented for illustration.

**Rules:** Each caption has exactly one correct judgment. A caption is judged by the first failing property, in this order: Vague, Missing conditions, Undefined symbols, Overclaims. A caption with none of these defects is judged No defect.

**Learner Activity:**

1. The learner reads caption 1 and the checklist.
2. The learner chooses one of the five judgments and submits.
3. The sim shows whether it was correct and the "Why" sentence, and offers a corrected caption where there is a defect.
4. After caption 6, the sim shows the count correct.

**Feedback:** Six captions, one attempt each, in a fixed order. Correct: "Correct: <judgment>." plus the "Why" sentence. Incorrect: "The main issue is <judgment>." plus the "Why" sentence. The correct judgment is always revealed after the single attempt. A final score "n of 6 correct" is shown with whether the mastery threshold of 5 was met.

**Starting State:** Caption 1 is shown with five judgments. The question on screen is "Could a reader understand this figure from the caption alone?"

**Chapter Anchors:** The chapter states that a caption says what is plotted, the conditions, how to read the markers, and the observation to take, and that figure and caption together should be understandable without the body.
</details>

<iframe src="../../sims/figure-caption-critic/main.html" height="862px" width="100%" scrolling="no"></iframe>

*MicroSim: Figure Caption Critic. [Open it fullscreen](../../sims/figure-caption-critic/main.html).*

**Reference formatting** is producing the reference list in the style a venue requires. With BibTeX and a venue's style file the formatting is automatic, so the job is to keep the BibTeX entries correct and complete: verified as in Chapter 11, with the venue name, year, volume, pages, and DOI present. Never let an agent retype a reference by hand into the text, since that is where fabricated and corrupted entries enter.

**Venue requirements** are the rules a particular journal or conference sets: the template, the page limit, whether review is anonymous, the reference style, the required statements such as data availability, ethics, and use of AI tools, and the file formats for submission. Read them before drafting, not after. A common and avoidable waste is a paper written to one length and then cut to another, and an agent can check a manuscript against a pasted copy of the requirements.

## Editing, Consistency, and Co-Authors

**Technical editing** is the line-by-line check for correctness of terminology, symbols, units, and cross-references. **Style consistency** is the uniform treatment of the same thing throughout the paper: one abbreviation for each term, one convention for units and number formatting, one notation for each symbol, one spelling variant. **Grammar and clarity** are the sentence-level correctness and readability of the prose. These three are tasks in which an agent is strong and in which you should still ask for a list of proposed changes and not a silent rewrite, so that each change can be accepted or rejected in the diff. A useful instruction is "list inconsistencies in notation and terminology and propose one resolution for each, without editing the text".

**Authorship** is the question of who is credited for the work and who is accountable for it. The widely used criteria require substantial contribution, drafting or critical revision, approval of the final version, and accountability for the work. Those criteria cannot be satisfied by a language model, and major publishers, including IEEE and ACM, state that AI systems may not be listed as authors and that substantive use of AI tools must be disclosed. Policies change, so read the current policy of your venue. Chapter 18 treats disclosure in detail.

**Co-author review** is the circulation of the draft to the people who share responsibility for it. Send them a version that is complete enough to read, with the claims, the evidence, and the open questions marked, and ask for specific things: check the numbers in Table II, confirm the description of the method, read Section 5 for fairness to prior work. Every co-author should know which parts were drafted with AI assistance.

## Submission and Response

**arXiv submission** is the posting of a manuscript to the arXiv preprint server, which makes a paper available before or alongside peer review. The practical points are these. You submit the LaTeX source and its figures, and arXiv compiles it, so the source must build cleanly from a clean directory. Include the compiled bibliography file (the `.bbl`), since arXiv's guidance is to submit that file and not to rely on BibTeX running during processing. Choose the subject category with care, and check the current submission guidelines, including the endorsement rules for first-time submitters. Check the compiled PDF that arXiv produces before announcing, because it is the version readers get.

A **cover letter** accompanies a journal submission and is short: the title and the contribution in a few sentences, why the work fits the venue, confirmation that it is not under consideration elsewhere, and any required declarations. An agent drafts it adequately from the abstract and the venue's scope statement. Check that it claims nothing the paper does not.

A **peer review response** is the reply to reviewers' comments, normally a point-by-point document. Each reviewer comment is quoted, followed by your response and, where the paper changed, the location of the change. An agent is useful for organizing the comments into a table and drafting a first response. Three rules apply. Never claim a change that was not made. Answer the comment actually asked, not a nearby easier one. And decide yourself where to disagree: a polite, evidenced disagreement is acceptable, and an agent will tend to accommodate every comment whether or not it is right.

| Reviewer comment | Response | Change | Location |
|---|---|---|---|
| R1.2: ENOB is measured on one chip only. | We now report 12 devices, with mean and standard deviation. | Added Table III | Section V-B |
| R2.4: The comparison omits the work of [14]. | We agree and have added it with matching conditions. | Added row to Table IV | Section VI |
| R2.5: The method should be tested at 125 °C. | We could not test at this temperature with our setup and state this as a limitation. | Added a sentence | Section VII |

*Table 2. A fragment of a response matrix, with illustrative content.*

!!! mascot-warning "Accommodating Every Comment"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is letting an agent draft a response that agrees with every reviewer comment. It happens because the model is inclined to please, and the draft reads as gracious. Decide your position on each comment first, then ask for wording. A reviewer who sees a claimed change that is missing from the paper will stop trusting the rest.

## Summary and Key Takeaways

A manuscript is the point where all the earlier verification meets a reader, and the practices of this chapter keep AI assistance from eroding it. Draft from evidenced claims, protect your voice and your numbers, regenerate every figure from data, verify every reference, and keep to the venue's rules.

The main points to carry forward:

- **Paper structure** answers one reader question per section, and an **outline** of evidenced claims fixes the argument. Write the **abstract** last, with numbers.
- **Drafting from claims** with a no-evidence marker, and **revising** from structure to surface, keep unsupported claims out.
- **Author voice** is protected by drafting argument-bearing sections yourself, supplying style samples, and reading aloud. A number check on every revision catches silent changes.
- **LaTeX, figures, and captions** are generated from source and data. A caption stands alone with its figure.
- **Reference formatting** relies on verified BibTeX and never on hand-typed entries.
- **Venue requirements** are read first. **Technical editing, style consistency, and grammar** are done through proposed changes, not silent rewrites.
- **Authorship** requires accountability that a model cannot take, so AI is disclosed and is not an author.
- **arXiv submission, cover letters, and peer review responses** have specific forms. Never claim an unmade change.

!!! mascot-celebration "A Draft That Is Still Yours"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now place a sentence in its section, build an abstract with numbers, check a revision for changed numbers, judge a figure caption against a checklist, and write a response that claims only what changed. The agent supplies speed, and you supply the claims.

The next chapter turns a result into something readers can interact with: simulations, slides, and teaching materials. Round up the one result you would most like others to understand, and bring it.
