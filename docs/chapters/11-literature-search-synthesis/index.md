---
title: "AI-Assisted Literature Search and Synthesis"
description: "Applying agents to the literature workflow: search strategy and keyword generation, scholarly databases and preprint servers, triage and summarization, citation chaining, BibTeX and reference managers, citation verification, and evidence synthesis."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 11:05:40"
version: 1.11
---

# AI-Assisted Literature Search and Synthesis

## Summary

This chapter applies agents to the literature workflow: building a search strategy, generating keywords, triaging and summarizing papers, chaining citations, and managing references. It stresses verifying citations and synthesizing evidence from sources of known quality. After this chapter you can produce an annotated reading list with verified citations.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Search Strategy | 12 |
| Paper Summarization | 13 |
| Literature Review | 6 |
| Keyword Generation | 1 |
| Scholarly Databases | 7 |
| Citation Chaining | 1 |
| BibTeX | 6 |
| Reference Manager | 2 |
| Annotated Bibliography | 1 |
| Paper Triage | 2 |
| Reading List | 1 |
| Research Gap | 3 |
| Related Work | 2 |
| DOI Lookup | 3 |
| Citation Verification | 2 |
| Claim Extraction | 3 |
| Comparison Table | 2 |
| Preprint Server | 5 |
| Source Quality | 2 |
| Evidence Synthesis | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 2: How Language Models Work](../02-how-language-models-work/index.md)
- [Chapter 4: Context Engineering and Advanced Prompting](../04-context-engineering-prompting/index.md)
- [Chapter 5: Markdown Project Files and Version Control](../05-markdown-and-version-control/index.md)
- [Chapter 8: Agents, Tool Use, and Subagents](../08-agents-tool-use-subagents/index.md)

!!! mascot-welcome "The Literature, Without Drowning"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Everyone in a fast field falls behind the literature, and agents can read faster than you can. They also invent references with a straight face. This chapter shows how to use their speed while keeping every citation you rely on checked. Trust, but verify!

## Searching: Strategy, Keywords, and Sources

A **literature review** is a structured account of what is known about a question, built from a systematic search and a critical reading of the sources found. The quality of a review is bounded by the quality of the search that feeds it, and a search is a procedure that can be written down and repeated. A **search strategy** is that written procedure: the question, the concepts it contains, the terms for each concept, the databases searched, the date range, and the filters applied. Writing it down is what separates a literature search from browsing.

The first step is the question, framed as in Chapter 1 with a metric and a threshold. The second is to split the question into its concepts. For the running example, a question about calibration of a SAR ADC has three concepts: the architecture, the converter, and the technique. The third step is **keyword generation**: listing for each concept the terms under which authors might have written about it. This is a task that an assistant does well, because it requires breadth and no verification of facts: synonyms, abbreviations, spelling variants, and neighboring terms. Ask for them, then read the list critically and remove the terms that would pull in a different field.

| Concept | Terms to search |
|---|---|
| Architecture | "successive approximation", "successive-approximation register", SAR |
| Converter | ADC, "analog-to-digital converter", "A/D converter" |
| Technique | calibrat*, "offset correction", "mismatch correction", "foreground calibration" |

*Table 1. Keyword generation for one question: terms for each concept.*

Terms within one concept are joined with OR, because any of them identifies the concept. Concepts are joined with AND, because a paper must be about all of them. Quotation marks match an exact phrase, and an asterisk matches word endings. The resulting query for the example is `("successive approximation" OR SAR) AND (ADC OR "analog-to-digital converter") AND (calibrat* OR "offset correction")`, and the syntax differs slightly between databases, so check each database's help page.

**Scholarly databases** are the indexes in which you run the query. For electrical engineering and computer design the main ones are publisher platforms such as IEEE Xplore and the ACM Digital Library, citation indexes such as Scopus, Web of Science, and Google Scholar, and open indexes such as Semantic Scholar and DBLP. A **preprint server** is a repository where authors post manuscripts before or alongside peer review. arXiv is the large general one, and TechRxiv serves the IEEE community. Preprints give you results months earlier, and they have not been through peer review, which matters for the source-quality question below. Search at least two databases, because their coverage differs, and record for each the query, the date, and the number of results.

!!! mascot-tip "Log the Query Like an Experiment"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Save every query with the database, the date, and the result count in a file in your project. When a reviewer asks how you found the related work, or when you rerun the search in six months to find what is new, that file is the whole answer.

Two numbers describe how well a query performs. **Precision** is the fraction of the results returned that are relevant, and **recall** is the fraction of all the relevant papers that were returned. With \( TP \) relevant results returned, \( FP \) irrelevant ones returned, and \( FN \) relevant ones missed,

\[
\text{precision} = \frac{TP}{TP + FP}, \qquad \text{recall} = \frac{TP}{TP + FN}.
\]

Broadening a query raises recall and lowers precision, and narrowing does the opposite. A scoping search, where missing a key paper is costly, should favor recall. A search for a short list of the best papers on a subtopic can favor precision.

#### Diagram: Search Query Precision and Recall Explorer

<details markdown="1">
<summary>Search Query Precision and Recall Explorer</summary>
Type: microsim
**sim-id:** search-precision-recall-explorer<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/search-microsims/tree/main/docs/sims/keyword-search-flow<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the precision and recall of three search queries run on a corpus of twenty papers with eight known relevant papers, and choose the query that suits a stated purpose.

**Prerequisites:** search strategy, precision, recall, true positive, false positive, and false negative, all defined in the section "Searching: Strategy, Keywords, and Sources" above.

**Evidence of Mastery:** For each of three queries the learner enters precision and recall, each to two decimal places, and then chooses the query for a stated purpose. A value is correct when it is within 0.01 of the value in Content. The choice is correct when it equals the answer in Content. Mastery is at least 5 of 6 values correct and the choice correct. Browsing the corpus is exploration and is not evidence.

**Misconceptions:** (1) A query that returns many results is a good query. (2) High precision means the search found everything relevant. (3) Precision and recall always move together.

**Instructional Rationale:** Apply-level work needs the learner to compute the two measures on concrete result sets and then use them in a decision. A query with high recall and low precision, and one with the reverse, make the trade-off visible in numbers.

**Content:**

The corpus is synthetic and labeled "synthetic, invented for this exercise". It has 20 papers, P1 to P20. The relevant papers are P1, P2, P3, P4, P5, P6, P7, and P8. The other twelve, P9 to P20, are not relevant.

| Query | Description | Papers returned |
|---|---|---|
| A | A narrow query using the exact phrase "foreground calibration" | P1, P2, P3, P4, P9, P10 |
| B | A broad query using OR across many synonyms | P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16 |
| C | A balanced query combining architecture and technique terms | P1, P2, P3, P4, P5, P6, P7, P9 |

Reference values:

| Query | Returned | TP | FP | FN | Precision | Recall |
|---|---|---|---|---|---|---|
| A | 6 | 4 | 2 | 4 | 0.67 | 0.50 |
| B | 16 | 8 | 8 | 0 | 0.50 | 1.00 |
| C | 8 | 7 | 1 | 1 | 0.88 | 0.88 |

Purpose question: "You are starting a literature survey and cannot afford to miss any relevant paper. Which query should you run first?" The correct answer is Query B, because it has recall 1.00, and the reason shown is "Recall is the priority when a missed paper is costly, and the extra irrelevant results can be removed in triage."

**Provenance:** The definitions of precision and recall are from the section "Searching: Strategy, Keywords, and Sources" of this chapter. The corpus and queries are synthetic and invented for this exercise.

**Rules:** Precision = TP / (TP + FP) and recall = TP / (TP + FN). Values are displayed to two decimal places. Returned papers are counted from the sets above. A relevant paper is one of P1 to P8.

**Learner Activity:**

1. The learner sees the 20 papers with the relevant set hidden, and query A's result set.
2. The learner marks which returned papers are relevant after the relevant set is revealed, then enters precision and recall.
3. The learner repeats for queries B and C.
4. The learner chooses the query for the stated purpose and submits. The sim shows the worked values and the reason.

**Feedback:** Three queries, two attempts each for the numbers, then one attempt for the choice. Correct: "Correct." plus the worked counts. Incorrect on the first attempt: "Count the relevant papers returned and divide by the number returned for precision, and by 8 for recall." Incorrect on the second attempt: the worked counts are shown. The correct choice is revealed after the single attempt.

**Starting State:** The corpus is shown with query A's results highlighted. The question on screen is "What fraction of the results are relevant, and what fraction of the relevant papers were found?"

**Chapter Anchors:** The chapter states the two formulas and that broadening a query raises recall and lowers precision. The chapter does not state the corpus numbers.
</details>

<iframe src="../../sims/search-precision-recall-explorer/main.html" height="858px" width="100%" scrolling="no"></iframe>

*MicroSim: Search Query Precision and Recall Explorer. [Open it fullscreen](../../sims/search-precision-recall-explorer/main.html).*

## Triage, Summarization, and Claim Extraction

A successful search returns more papers than you can read. **Paper triage** is the fast sorting of results into those to read closely, those to skim, and those to set aside, using only the title, abstract, and figures. An agent can do first-pass triage from a rubric you supply: relevance to the question, whether the work is measured or simulated, the process node or technology, the year, and the venue. The rubric matters more than the model. A triage prompt that says only "rate relevance from 1 to 5" returns inconsistent scores, and one that names the criteria and requires a one-line reason for each is auditable.

**Paper summarization** is producing a short account of a paper. It is among the strongest uses of a language model, and it has one characteristic failure: the summary may be built from the abstract and the model's expectations about the field, and not from the paper's body. A summary that sounds right can state a result the paper does not contain. The defenses are those of Chapter 4: supply the full text, ask for a structured summary with the section for each statement, and spot-check.

**Claim extraction** makes this concrete. It is the extraction of specific, checkable statements from a paper, each with its supporting evidence and location. Instead of "what is the paper about?", the task is "list each quantitative claim, with the value, units, conditions, and the sentence and table it comes from." A worked example for one paper, with illustrative values:

| Claim | Value | Conditions | Where stated |
|---|---|---|---|
| ENOB | 9.2 bits | 1 MS/s, input at Nyquist, 1.0 V supply | Section IV, Table II |
| Power | 45 µW | Same as above | Section IV, Table II |
| Process | 65 nm CMOS | Not applicable | Section II |
| Measured or simulated | Measured | 12 samples of the chip | Section IV |

*Table 2. Extracted claims, each with conditions and a location.*

Each row can be checked in under a minute by going to the stated location. This is the output to ask agents for, because it converts a summary you would have to trust into a set of facts you can confirm.

!!! mascot-warning "A Summary of a Paper You Did Not Read"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is citing a paper from a model-written summary. It happens because the summary reads like the paper. It may have been built from the abstract and the model's priors. Before you cite a claim, open the paper and find the sentence, and ask the agent for the location with every claim so that this takes seconds.

## Following Citations

**Citation chaining** is finding papers by following the citation links of a paper you already have. *Backward* chaining follows a paper's reference list to the work it builds on. *Forward* chaining follows the papers that cite it, which are found in the citation indexes, to the work that builds on it. Chaining finds papers that keyword searches miss, because it follows influence and not vocabulary. A paper cited by many of your seed papers' references is usually foundational, and a recent paper that cites several of your seeds is usually relevant to the current state of the art.

#### Diagram: Citation Chaining Explorer

<details markdown="1">
<summary>Citation Chaining Explorer</summary>
Type: graph-model
**sim-id:** citation-chaining-explorer<br/>
**Library:** vis-network<br/>
**Status:** Built<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** solve<br/>
**Learning Objective:** The learner will solve five citation-chaining questions on a graph of eight papers by following references backward and citations forward, with at least 4 of 5 correct.

**Prerequisites:** citation chaining, backward chaining, forward chaining, and the meaning of a citation edge, all defined in the section "Following Citations" above.

**Evidence of Mastery:** For each of five questions the learner selects the set of papers that answer it and submits. An answer is correct when the selected set equals the answer in Content exactly. Mastery is at least 4 of 5 correct on the first attempt. Dragging nodes and reading paper details is exploration and is not evidence.

**Misconceptions:** (1) Forward and backward chaining find the same papers. (2) Only papers with matching keywords are relevant. (3) The most recent paper is the most foundational.

**Instructional Rationale:** Apply-level work needs the learner to carry out the two chaining procedures on a concrete graph. The final questions combine the two directions, which is how the technique is used in practice.

**Content:**

The papers are invented and labeled "illustrative". An edge "X cites Y" points from X to Y.

| Paper | Year | Role |
|---|---|---|
| S | 2022 | Seed paper |
| A | 2018 | Cited by S |
| B | 2019 | Cited by S |
| C | 2020 | Cited by S |
| F | 2017 | Cited by B and by C |
| D | 2023 | Cites S |
| E | 2024 | Cites S and C |
| G | 2025 | Cites D |

Edges: S cites A, S cites B, S cites C, B cites F, C cites F, D cites S, E cites S, E cites C, G cites D.

| # | Question | Answer set | Why (shown as feedback) |
|---|---|---|---|
| 1 | Which papers are found by backward chaining one step from S? | A, B, C | These are the papers S cites. |
| 2 | Which papers are found by forward chaining one step from S? | D, E | These are the papers that cite S. |
| 3 | Which paper is cited by two of S's references? | F | B and C both cite F, so F is likely foundational. |
| 4 | Which paper is found by forward chaining two steps from S? | G | G cites D, and D cites S. |
| 5 | Which paper cites both S and C? | E | E cites S and also C, so it is closely tied to this line of work. |

**Provenance:** The chaining procedures are from the section "Following Citations" of this chapter. The papers, years, and edges are invented for illustration.

**Rules:** Backward chaining follows an edge from the citing paper to the cited paper. Forward chaining follows an edge from the cited paper back to the citing paper. An answer set excludes the seed paper S.

**Learner Activity:**

1. The learner sees the graph with S highlighted and question 1.
2. The learner selects the papers that answer the question and submits.
3. The sim highlights the edges followed and shows the "Why" sentence, then shows the next question.
4. After question 5, the sim shows the count correct. The learner should notice that forward chaining reaches newer papers and backward chaining reaches older ones.

**Feedback:** Five questions, one attempt each, in a fixed order. Correct: "Correct." plus the "Why" sentence. Incorrect: the correct set and the "Why" sentence. The correct set is always revealed after the single attempt. A final score "n of 5 correct" is shown with whether the mastery threshold of 4 was met.

**Starting State:** The graph is shown with S highlighted and the direction of each citation edge visible. The question on screen is "Which papers does this procedure find?"

**Chapter Anchors:** The chapter states that backward chaining follows references to earlier work and forward chaining follows citations to later work, and that a paper cited by several references of a seed paper is likely foundational.
</details>

<iframe src="../../sims/citation-chaining-explorer/main.html" height="802px" width="100%" scrolling="no"></iframe>

*MicroSim: Citation Chaining Explorer. [Open it fullscreen](../../sims/citation-chaining-explorer/main.html).*

## References, Verification, and Quality

A **reference manager** is a program that stores bibliographic records, attaches PDFs, and formats citations for a document. Zotero, Mendeley, and JabRef are common examples. The record format that matters most in engineering is **BibTeX**, a plain-text format for bibliographic entries that LaTeX uses to build reference lists. Each entry has a type, a key, and fields. The entry below is the book's primary reference, which is the first entry on the References page.

```bibtex
@inproceedings{ketter2008advocate,
  author    = {Ketter, Wolfgang and Batchu, Arun and Berosik, Gary and McCreary, Dan},
  title     = {A semantic web architecture for advocate agents to determine preferences and facilitate decision making},
  booktitle = {Proceedings of the 10th International Conference on Electronic Commerce (ICEC '08)},
  year      = {2008},
  doi       = {10.1145/1409540.1409554}
}
```

Because BibTeX is plain text, it fits the version-controlled project of Chapter 5, and an agent can edit it. It is also where fabricated references enter a manuscript, since a model can write a perfectly formatted entry for a paper that does not exist.

**DOI lookup** is the retrieval of a paper's metadata from its digital object identifier by asking a registry. The DOI resolver at doi.org redirects to the publisher's page, and the Crossref registry returns the record as data. **Citation verification** is the use of that lookup, and of a title search, to confirm that each entry exists and that its authors, venue, year, and title match, as in the four-outcome classification of Chapter 2. A short script that reads a BibTeX file, resolves every DOI, and flags entries with no DOI or a mismatch automates most of the check, and an agent can write it. The one step that cannot be automated is confirming that the paper supports the sentence it is cited for.

**Source quality** is the trustworthiness of a source as evidence. It is not a single score. For engineering results, the questions that matter are whether the paper is peer reviewed or a preprint, whether the results are measured on silicon or only simulated, whether the experimental conditions are stated completely, whether data or code are available, and whether independent groups have replicated or cited the result as confirmed. A preprint can be excellent and a journal paper can be weak. What matters is to record what kind of source each claim rests on, so that your synthesis can state it.

## Synthesis

A **comparison table** puts the extracted claims of several papers side by side, with a row per paper and a column per attribute, with the conditions in the columns. It is the working tool of synthesis. Its columns are the attributes on which the papers can be compared: architecture, process, supply, sampling rate, ENOB, power, and whether measured. Empty cells are informative. A cell that is blank for most papers shows what the field has not measured.

**Evidence synthesis** is the combination of findings from several sources into a statement about what is known, with the strength of the evidence. For engineering literature the central care is to compare like with like. Two papers that report ENOB at different input frequencies, supply voltages, or process nodes are not comparable by their headline numbers, and averaging them produces a number that describes neither. A comparison table with conditions as columns makes such mismatches visible, and a synthesis states them.

A **research gap** is a question the literature does not answer, or answers only under conditions that do not cover yours. Gaps are found by reading the comparison table: a combination of attributes with no entries, a result reported only in simulation, a claim supported by a single group. **Related work** is the section of a paper that positions your contribution against the literature, and a good one follows from the comparison table. It groups papers by approach, states what each achieves under what conditions, and ends with the gap. An **annotated bibliography** is a reference list with a short note for each entry on what it claims, the quality of the evidence, and its relevance. A **reading list** is the prioritized subset to read in full, in order.

!!! mascot-thinking "The Table Is the Argument"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that once the claims sit in a table with conditions, much of the synthesis is already done. You see which results can be compared, where the field agrees, and which cells are empty. A related-work section written from that table has a spine, and one written from memory has a list.

## Putting It Together: A Literature Pipeline

The pieces form a pipeline that fits the planning and execution model of Chapter 10. Each stage has an output you can check.

1. *Question and strategy*: you write the question and the concepts, and an agent generates terms. You approve the strategy. Output: `search-strategy.md`.
2. *Search*: an agent runs the queries and records each query, database, date, and count. Output: a results file of BibTeX.
3. *Triage*: an agent applies your rubric to each result with a one-line reason. Output: a sorted list. You review the borderline cases.
4. *Extraction*: an agent extracts claims with locations from the papers you chose. Output: a comparison table.
5. *Verification*: a script resolves every DOI and flags mismatches, and you confirm that each cited claim is in the paper.
6. *Synthesis*: a writing agent drafts the related-work section from the table, and you revise it in your own voice (Chapter 15).

## Summary and Key Takeaways

AI assistance changes the speed of every stage of the literature workflow and none of the standards. A written search strategy, verified references, and claims tied to locations are what turn faster reading into trustworthy synthesis.

The main points to carry forward:

- **A search strategy** is a written, repeatable procedure. Use **keyword generation** for breadth, and log queries, databases, and dates.
- **Precision and recall** trade off, and a scoping search should favor recall.
- **Scholarly databases and preprint servers** differ in coverage and in peer review, so search more than one and record the source type.
- **Triage by rubric, structured summarization, and claim extraction with locations** make agent output auditable.
- **Citation chaining**, backward and forward, finds what keyword search misses.
- **BibTeX in version control, DOI lookup, and citation verification** guard the reference list against fabricated entries.
- **Source quality** is recorded per claim. **Comparison tables** put conditions in columns so that **evidence synthesis** compares like with like and shows **research gaps**.

!!! mascot-celebration "A Reading List You Can Stand Behind"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now write a search strategy, compute the precision and recall of a query, chain citations in both directions, and build a comparison table in which every claim has a location and every reference has been looked up. That is an annotated reading list with verified citations.

The next chapter turns from papers to data, where the same discipline of keeping errors visible applies to the numbers you measure yourself. Round up one dataset, and bring it.

[See Annotated References](./references.md)
