---
title: "Knowledge Bases, Personal Knowledge Graphs, and the Anatomy of an Agent Skill"
description: "How to organize research notes, specifications, glossaries, and logs into a knowledge base, turn it into a queryable personal knowledge graph that grounds an agent's answers, and read the parts of an agent skill."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 10:58:17"
version: 1.11
---

# Knowledge Bases, Personal Knowledge Graphs, and the Anatomy of an Agent Skill

## Summary

This chapter extends project files into a working knowledge base: research notes, decision logs, session logs, specifications, glossaries, and cross references. It then shows how to turn that material into a personal knowledge graph, with entities, relationships, a schema, backlinks, agent-assisted entity extraction, and graph queries that ground a model's answers. It closes with the anatomy of an agent skill, including its name, description, instructions, and supporting files. After this chapter you can organize project memory as a queryable graph and read or draft a basic skill.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Glossary File | 60 |
| Research Notes | 105 |
| Specification File | 65 |
| Decision Log | 11 |
| Session Log | 18 |
| Project Memory | 3 |
| Knowledge Base | 59 |
| Cross References | 27 |
| Knowledge Graph | 18 |
| Entity and Relationship | 10 |
| Personal Knowledge Graph | 7 |
| Graph Schema | 2 |
| Backlinks | 1 |
| Entity Extraction | 1 |
| Graph Querying | 2 |
| Graph Retrieval Augmented Generation | 1 |
| Agent Skill | 46 |
| SKILL.md File | 14 |
| Skill Name | 2 |
| Skill Description | 6 |
| Skill Instructions | 1 |
| Skill Triggering | 4 |
| Supporting Files | 4 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 2: How Language Models Work](../02-how-language-models-work/index.md)
- [Chapter 3: Choosing Models and Writing Clear Prompts](../03-models-and-prompt-basics/index.md)
- [Chapter 4: Context Engineering and Advanced Prompting](../04-context-engineering-prompting/index.md)
- [Chapter 5: Markdown Project Files and Version Control](../05-markdown-and-version-control/index.md)

!!! mascot-welcome "Memory That Outlasts the Session"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A model forgets everything between sessions, so the only memory your research has is the memory you write down. This chapter turns your files into a knowledge base an agent can query, and shows you the small file format that packages a repeatable task into a skill. Trust, but verify!

## From Project Files to a Knowledge Base

Chapter 5 gave a project its instruction file. That file says how to work. It does not say what is *known*: which experiments ran, what was decided and why, what each term means, what the specification requires. Without that material every session starts from zero, and the researcher becomes the only memory the project has. A **knowledge base** is the organized collection of such written material for a project or group, kept in plain text so that people and agents read the same files. **Project memory** is the subset of it that an agent loads to continue work: the durable record of what the project is, what has been decided, and what is in progress.

A knowledge base is built from a small number of file types. Each has a distinct job, and the discipline is to keep each one doing only that job.

**Research notes** are the running, dated record of what you read, tried, and thought. They are informal and cheap to write, and they are the raw material for everything else. A good note records the source or experiment, what was observed, and what it suggests, in a few lines. Notes are written once and rarely rewritten; they are a log of thinking, not a polished document.

A **specification file** states what a piece of work must do: its inputs, outputs, constraints, and acceptance criteria, as in the ENOB specification of Chapter 4. Unlike notes, a specification is the *current agreed statement* and is edited in place, with its history in version control. It is the file an agent reads before it writes code or text, and the file against which the result is checked.

A **glossary file** defines the project's terms, one entry per term, so that every collaborator and every agent uses the words the same way. This is the file that implements the domain vocabulary of Chapter 4 once for the whole project. An entry should be short and precise: the term, a one-sentence definition, units where relevant, and the related terms.

A **decision log** records choices made and the reasons, one entry per decision, with the date and the alternatives rejected. Its value is that reasoning decays faster than results. Six months later you will remember that the record length is 4,096 samples, and you will not remember that 8,192 was rejected because of the capture buffer.

A **session log** is the record of one working session with an agent: what was asked, what was produced, what was accepted, and what remains. It is the bridge between sessions. A new session that begins by reading the last session log can continue without you re-explaining anything.

**Cross references** are explicit links from one file to another, such as a note that points to the specification section it affects, or a decision that points to the experiment that motivated it. They are what make a folder of files a connected body of knowledge, and they are the seed of the graph discussed below.

| File type | Job | Edited how | Typical agent use |
|---|---|---|---|
| Research notes | Dated record of reading and experiments | Appended | Searched for what was tried |
| Specification file | Current statement of what work must do | Edited in place | Read before writing code or text |
| Glossary file | Fixed meaning of terms | Edited in place | Loaded as domain vocabulary |
| Decision log | Choices and reasons | Appended | Consulted before revisiting a choice |
| Session log | What happened in one session | Appended | Read to resume work |

*Table 1. The file types of a research knowledge base and the job each one does.*

Short worked examples show the formats. Each is illustrative and uses the running SAR ADC project. A research note is dated and records the source, the observation, and what it suggests:

```markdown
## 2026-10-09: Capture buffer limit
Source: test board user guide, section 4.
Observed: the capture buffer holds at most 4,096 samples at 16 bits.
Suggests: records longer than 4,096 samples need two captures. See decision of 2026-10-12.
```

A glossary entry gives one precise definition per term, with units and related terms, so that an agent reading it cannot choose a different sense:

```markdown
### ENOB
Effective number of bits: (SNDR_dB - 1.76) / 6.02, computed from a coherently
sampled record. Unit: bits. Related: SNDR, SFDR, nominal resolution.
```

A specification file states the current requirement and how it is checked, and a session log records what happened in one sitting, ending with the next step:

```markdown
## Spec 3.2: Record length
Requirement: every ENOB record is 4,096 samples, coherently sampled.
Check: scripts/check-record.py exits with status 0.

## Session 2026-10-12
Asked: implement enob(). Produced: scripts/enob.py and tests. Accepted: all 5 criteria pass.
Open: window function for non-coherent records. Next: write the spec section for it.
```

The decision-log entry below completes the set. Notice that it names the alternative that was rejected and the evidence, so that nobody reopens the question without new information.

```markdown
## 2026-10-12: Record length for ENOB measurements

Decision: use 4,096 samples per record, coherently sampled.
Rejected: 8,192 samples (exceeds the capture buffer of the test board).
Evidence: notes/2026-10-09-capture-buffer.md; spec section 3.2.
Consequence: ENOB resolution in the frequency domain is fs / 4,096.
Revisit if: the capture board is replaced.
```

!!! mascot-tip "Log the Rejected Option"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you record a decision, add one line naming what you did not choose and why. That line is what stops you, a collaborator, or an agent from re-proposing the rejected idea a month later as if it were new.

The value of a knowledge base appears at the moment of use. Instead of pasting five documents into a prompt and hoping you chose well, you tell the agent: "Read the specification, the glossary, and the last two session logs, then continue." The context is assembled from files you have already curated, and you will have applied the selection discipline of Chapter 4 once, in the structure of the files.

## From Files to a Knowledge Graph

A folder of linked files is a good memory for reading. It is a poor one for *asking*. Questions such as "which experiments used the dataset we later found to be corrupted?" require following several links in sequence, and a folder offers nothing to follow them with. A **knowledge graph** is a representation of knowledge as *entities* and typed *relationships* between them, so that a program can traverse the connections to answer such questions.

An **entity** is a distinct thing the project cares about: a paper, an experiment, a dataset, a design, a person, a concept. A **relationship** is a named, directed connection between two entities, such as "Experiment 07 *used* Dataset A" or "Paper Beta *cites* Paper Alpha". The word *typed* matters. A wiki link that means only "is related to" lets you navigate but not compute. A relationship named `USED` or `CITES` tells a program what the link means, and so it can answer questions that depend on the meaning. Dan McCreary's research on personal knowledge graphs, summarized in the [Personal Knowledge Graphs appendix](../../appendices/pkg/index.md), puts the point as a hypothesis from Jim Hendler: a little semantics goes a long way.

A **personal knowledge graph** (PKG) is a knowledge graph of one person's, or one small group's, own notes, papers, experiments, people, and projects. It differs from a folder of notes in exactly two ways: its links are typed, and its entities have types with expected properties. It differs from an enterprise ontology in being built bottom-up and cheaply, usually by the person who uses it.

A **graph schema** is the declared list of entity types and relationship types a graph allows, and the properties each carries. A schema is what keeps the graph from decaying into a wiki. It does not need to be large. The schema for the running project fits in a table:

| Entity type | Typical properties | Relationships it takes part in |
|---|---|---|
| Paper | title, year, DOI | `CITES` (Paper to Paper), `REPORTS` (Paper to Experiment), `ABOUT` (Paper to Concept), `AUTHORED` (Person to Paper) |
| Experiment | date, settings | `TESTED` (Experiment to Design), `USED` (Experiment to Dataset) |
| Dataset | name, path, checksum | incoming `USED` |
| Design | version, process node | `REVISES` (Design to Design) |
| Concept | name, definition | incoming `ABOUT` |
| Person | name, role | `AUTHORED` |

*Table 2. A graph schema for the research project: entity types and the relationships they take part in.*

Two practical features of personal graphs deserve a name. **Backlinks** are the automatic reverse of a link: if Note A links to Concept ENOB, then ENOB's page shows that Note A refers to it. Backlinks are what turn one-way notes into a web, because from any concept you can see everything that mentions it, without having remembered to link back. The rule of thumb from the PKG research is that roughly 60 percent of a graph's value is in its nodes and 40 percent in its relationships, so adding links to existing notes is worth the effort.

**Entity extraction** is the identification of entities and relationships in free text, and it is where an agent earns its place in building the graph. Given a research note, an agent can propose "this note mentions Dataset A, Experiment 07, and the concept ENOB, and says Experiment 07 used Dataset A." You review the proposed entities and links, accept the correct ones, and fix the rest. This is the supervised pattern of Chapter 1 applied to knowledge: the agent proposes, you decide. A worked example: from the note line "Run 08 reused Dataset A and added a new capture, Dataset B, for the v3 design", an agent might propose the triples (Run 08, USED, Dataset A), (Run 08, USED, Dataset B), and (Run 08, TESTED, ADC Design v3). The first two are stated. The third is inferred from "for the v3 design" and should be confirmed against the experiment record before it is accepted. Extraction is wrong in characteristic ways. It invents plausible entities, merges two distinct things with the same name, and misses implicit relationships, so a human review of each batch is not optional.

!!! mascot-thinking "Typed Links Make the Notes Computable"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice the shift. A folder lets you *find* a note you already know exists. A typed graph lets you *derive* a fact no single note states, by chaining relationships. The question moves from "where did I write that?" to "what follows from what I know?"

**Graph querying** is the retrieval of answers from a graph by following relationships. In a graph database such as Neo4j the query language Cypher expresses a path as a pattern. Before the example, read the notation: parentheses are nodes, square brackets are relationships, and an arrow gives the direction. The query below asks for every paper that reports an experiment that used a given dataset.

```cypher
MATCH (p:Paper)-[:REPORTS]->(e:Experiment)-[:USED]->(d:Dataset {name: "Dataset A"})
RETURN p.title, e.name
```

You do not need a graph database to benefit. A graph can live in your Markdown files as typed links in the frontmatter of each note, and a short script can read them and answer the same question. What matters is that the relationships are explicit and typed, not what stores them.

#### Diagram: Personal Knowledge Graph Query Explorer

<details markdown="1">
<summary>Personal Knowledge Graph Query Explorer</summary>
Type: graph-model
**sim-id:** pkg-graph-query-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/infographics/tree/main/docs/sims/learning-path-explorer<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** solve<br/>
**Learning Objective:** The learner will solve five questions about a twelve-edge personal knowledge graph by following typed, directed relationships, and give each answer as the exact set of entities, with at least 4 of 5 correct.

**Prerequisites:** entity, relationship, typed relationship, graph schema, backlink, and graph querying, all defined in the section "From Files to a Knowledge Graph" above.

**Evidence of Mastery:** For each of five questions the learner selects the set of entities that answer it and submits. An answer is correct when the selected set equals the answer set in Content exactly. Mastery is at least 4 of 5 correct on the first attempt. Hovering over edges to read their types is exploration and is not evidence.

**Misconceptions:** (1) A relationship can be followed in either direction with the same meaning. (2) A question that needs more than one hop cannot be answered from the graph. (3) A paper that is not directly linked to a dataset is unaffected by that dataset.

**Instructional Rationale:** Apply-level work needs the learner to carry out the traversal procedure on a concrete graph. The questions rise from one hop to three, so the learner practices chaining relationships, which is the property that makes a graph more than a folder.

**Content:**

The graph is invented for illustration and labeled "illustrative" in the sim. Entities and their types:

| ID | Entity | Type |
|---|---|---|
| E1 | Run 07 | Experiment |
| E2 | Run 08 | Experiment |
| D1 | Dataset A | Dataset |
| D2 | Dataset B | Dataset |
| S1 | ADC Design v2 | Design |
| S2 | ADC Design v3 | Design |
| P1 | Paper Alpha | Paper |
| P2 | Paper Beta | Paper |
| C1 | ENOB | Concept |
| A1 | Dr. Rivera | Person |

Relationships, each directed from the first entity to the second:

| # | From | Relationship | To |
|---|---|---|---|
| 1 | Run 07 | TESTED | ADC Design v2 |
| 2 | Run 08 | TESTED | ADC Design v3 |
| 3 | Run 07 | USED | Dataset A |
| 4 | Run 08 | USED | Dataset A |
| 5 | Run 08 | USED | Dataset B |
| 6 | ADC Design v3 | REVISES | ADC Design v2 |
| 7 | Paper Alpha | REPORTS | Run 07 |
| 8 | Paper Beta | REPORTS | Run 08 |
| 9 | Paper Beta | CITES | Paper Alpha |
| 10 | Paper Alpha | ABOUT | ENOB |
| 11 | Paper Beta | ABOUT | ENOB |
| 12 | Dr. Rivera | AUTHORED | Paper Beta |

Questions, in this order:

| # | Question | Answer set | Why (shown as feedback) |
|---|---|---|---|
| 1 | Which experiments used Dataset A? | Run 07, Run 08 | Follow USED edges backward into Dataset A (edges 3 and 4). |
| 2 | Which designs were tested in an experiment that used Dataset B? | ADC Design v3 | Dataset B is used only by Run 08 (edge 5), and Run 08 tested ADC Design v3 (edge 2). |
| 3 | Which papers report an experiment that tested the design that ADC Design v3 revises? | Paper Alpha | ADC Design v3 REVISES ADC Design v2 (edge 6), Run 07 tested ADC Design v2 (edge 1), and Paper Alpha reports Run 07 (edge 7). |
| 4 | Which papers are cited by a paper that Dr. Rivera authored? | Paper Alpha | Dr. Rivera authored Paper Beta (edge 12), and Paper Beta cites Paper Alpha (edge 9). |
| 5 | If Dataset A were found to be corrupted, which papers must be rechecked? | Paper Alpha, Paper Beta | Dataset A is used by Run 07 and Run 08 (edges 3 and 4), which are reported by Paper Alpha and Paper Beta (edges 7 and 8). |

**Provenance:** The traversal procedure and the schema are from the section "From Files to a Knowledge Graph" of this chapter. The entities, names, and relationships are invented for illustration.

**Rules:** An answer set is computed by following edges only in their stated direction, or against it where the question asks for the "from" side. Each question has exactly one answer set, given above. A selection is correct only if it equals the answer set, with no missing and no extra entities.

**Learner Activity:**

1. The learner sees the graph and question 1.
2. The learner clicks the entities that answer the question and submits.
3. The sim highlights the path that produces the correct answer set and shows the "Why" sentence, then advances.
4. After question 5, the sim shows the count correct. The learner should notice that question 5 needs a path of two hops and has two answers.

**Feedback:** Five questions, one attempt each, in a fixed order. Correct: "Correct." plus the "Why" sentence and the highlighted path. Incorrect: the correct answer set, the highlighted path, and the "Why" sentence. The correct set is always revealed after the single attempt. A final score "n of 5 correct" is shown, with whether the mastery threshold of 4 was met.

**Starting State:** The full graph is shown with edge types visible on hover and question 1 posed. The question on screen is "Which entities answer this, by following the relationships?"

**Chapter Anchors:** The chapter states that typed, directed relationships let a program answer multi-hop questions, and that the PKG research rule of thumb is about 60 percent of value in nodes and 40 percent in relationships.
</details>

### Grounding a Model With the Graph

**Graph retrieval-augmented generation** (graph RAG) is retrieval-augmented generation, as introduced in Chapter 3, where the retrieved material is a *subgraph* of facts selected by following relationships, not a set of text passages ranked by similarity. The question is mapped to entities in the graph, the neighbourhood of those entities is collected, and the resulting facts are placed in the prompt with an instruction to answer from them.

The advantage over passage retrieval is on multi-hop questions. A vector search for "which papers need rechecking if Dataset A is corrupted?" finds passages that mention Dataset A and misses the paper that reports an experiment that used it, because that paper never names the dataset. Following the relationships finds it. A worked example: the question is converted to the entity "Dataset A", the traversal collects two experiments and two papers, and the prompt receives four lines such as "Run 07 USED Dataset A; Paper Alpha REPORTS Run 07", with the instruction "answer only from these facts; if they are insufficient, say so". The model's answer is then both grounded and checkable against named links.

The same caution as in Chapter 4 applies. The graph is only as good as its entities and relationships, an agent-extracted link that nobody reviewed can be wrong, and a graph that exposes private results to a tool must be governed. Chapter 19 returns to the privacy of a personal knowledge graph that an always-on agent can read.

## The Anatomy of an Agent Skill

Everything so far organizes what is known. The remainder of the chapter concerns what is *done repeatedly*. An **agent skill** is a packaged, reusable capability for an agent: a directory containing instructions, and optionally scripts and reference files, that teaches the agent how to carry out one kind of task the same way each time. A prompt you saved is a skill's ancestor. A skill adds a name, a description the agent can use to decide when it applies, and supporting material loaded only when needed.

The skill's central file is **SKILL.md**, a Markdown file with YAML frontmatter followed by instructions. Its parts have specific jobs.

The **skill name** is a short identifier, in lowercase with hyphens, that names the capability and typically matches the directory name. It is also how you invoke the skill explicitly.

The **skill description** is a one- or two-sentence statement of what the skill does and *when to use it*. It is the most important line in the file, for a reason that comes from how skills are loaded. An agent keeps only the names and descriptions of its available skills in context. It reads the full instructions only when it decides a skill applies.

**Skill triggering** is that decision: the agent compares the user's request with the descriptions of the available skills and loads the matching skill's instructions. A skill with a vague description, such as "helps with data", will trigger on the wrong requests or not at all. A skill whose description names the task and the situations that call for it will trigger reliably.

**Skill instructions** are the body of SKILL.md: the numbered procedure, the constraints, and the output format that the agent follows once the skill is loaded. They apply the techniques of Chapters 3 and 4, written once.

**Supporting files** are the other files in the skill directory: scripts the agent runs, reference documents it reads when needed, and templates it fills in. Keeping them outside SKILL.md keeps the always-loaded text small, because the agent opens a supporting file only when the instructions point to it.

A complete minimal skill for the running project, with illustrative content, has this layout and main file.

```text
enob-report/
├── SKILL.md
├── scripts/enob.py
├── references/targets.md
└── templates/report.md
```

```markdown
---
name: enob-report
description: Compute ENOB from a coherently sampled ADC record and write a one-page report. Use when the user asks for ENOB, SNDR, or an ADC characterization summary.
---

# ENOB Report

1. Read the record file the user names. If none is named, ask for it.
2. Run scripts/enob.py with the sampling rate and the nominal bits.
3. Compare the result with the target in references/targets.md.
4. Write the report using templates/report.md.

Never edit files in data/raw/. Report ENOB in bits to one decimal.
```

Triggering is easiest to understand with examples. Given the description above, the agent compares each request with it. "What is the ENOB of capture-07.csv?" matches the named task and the cue "ENOB", so the skill loads. "Give me an ADC characterization summary for the new board" matches the cue "characterization summary", so it loads. "Plot the spectrum of capture-07.csv" mentions the same file but asks for a different task, so it should not load, and a description that read "helps with ADC data" would have loaded it wrongly. "Draft the related-work paragraph" has nothing in common with the description, so it does not load.

Read the file as a reader would. The frontmatter is between the two lines of three hyphens and contains exactly two fields. The description does both jobs, saying what the skill does and when to use it. The body is short and procedural, and it points to the script, the reference, and the template by path.

!!! mascot-warning "A Vague Description Never Triggers"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is a well-written skill with a description such as "analysis helper". The agent sees only the description when choosing, so the skill is skipped, or fires on requests it cannot handle. State the task and the cues in the description, test it with five realistic requests, and rewrite it until it fires on the right ones.

#### Diagram: Skill Anatomy Labeler

<details markdown="1">
<summary>Skill Anatomy Labeler</summary>
Type: microsim
**sim-id:** skill-anatomy-labeler<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Remember<br/>
**Bloom Verb:** identify<br/>
**Learning Objective:** The learner will identify, for each of eight lines or files of a skill, whether it is the skill name, the skill description, skill instructions, or a supporting file, with at least 7 of 8 correct.

**Prerequisites:** skill name, skill description, skill instructions, supporting files, and SKILL.md, all defined in the section "The Anatomy of an Agent Skill" above.

**Evidence of Mastery:** For each of eight items the learner commits one of four labels. A label is correct when it equals the label in Content. Mastery is at least 7 of 8 correct on the first attempt. Viewing the whole SKILL.md and directory tree is exploration and is not evidence.

**Misconceptions:** (1) The description only says what the skill does and not when to use it. (2) Scripts and templates are part of SKILL.md. (3) The name and the description are the same thing.

**Instructional Rationale:** Remember-level recognition is the base for later design work. Labeling items in a single realistic skill ties each term to a concrete example.

**Content:**

The skill is the `enob-report` skill shown in the chapter. The four labels are Skill name, Skill description, Skill instructions, and Supporting file.

| # | Item shown | Correct label | Why (shown as feedback) |
|---|---|---|---|
| 1 | name: enob-report | Skill name | It is the short identifier of the capability. |
| 2 | description: Compute ENOB from a coherently sampled ADC record and write a one-page report. Use when the user asks for ENOB, SNDR, or an ADC characterization summary. | Skill description | It states what the skill does and when to use it, which is what the agent reads to decide to load it. |
| 3 | 1. Read the record file the user names. If none is named, ask for it. | Skill instructions | It is a step of the procedure that is followed once the skill is loaded. |
| 4 | Never edit files in data/raw/. | Skill instructions | It is a constraint in the body of SKILL.md. |
| 5 | scripts/enob.py | Supporting file | It is a script the instructions tell the agent to run, and it lives outside SKILL.md. |
| 6 | references/targets.md | Supporting file | It is a reference document opened only when the instructions point to it. |
| 7 | templates/report.md | Supporting file | It is a template the agent fills in, kept outside SKILL.md. |
| 8 | 3. Compare the result with the target in references/targets.md. | Skill instructions | It is a procedural step that points to a supporting file. |

**Provenance:** The skill and its parts are from the section "The Anatomy of an Agent Skill" of this chapter. The file contents are illustrative.

**Rules:** Each item has exactly one correct label. A line inside SKILL.md below the frontmatter is Skill instructions. A path to a file other than SKILL.md is a Supporting file.

**Learner Activity:**

1. The learner sees the skill directory tree and SKILL.md with item 1 highlighted.
2. The learner chooses one of the four labels and submits.
3. The sim shows whether it was correct and the "Why" sentence, then highlights the next item.
4. After item 8, the sim shows the count correct.

**Feedback:** Eight items, one attempt each, in a fixed order. Correct: "Correct: <label>." plus the "Why" sentence. Incorrect: "This is a <label>." plus the "Why" sentence. The correct label is always revealed after the single attempt. A final score "n of 8 correct" is shown, with whether the mastery threshold of 7 was met.

**Starting State:** The directory tree and SKILL.md are shown with item 1 highlighted. The question on screen is "Which part of the skill is this?"

**Chapter Anchors:** The chapter states that SKILL.md has YAML frontmatter with a name and a description, that the description says what the skill does and when to use it, that instructions are the body, and that scripts, references, and templates are supporting files opened only when pointed to.
</details>

## Summary and Key Takeaways

A research project that lasts needs memory that does not live in anyone's head or in a chat window. Plain files of defined types form a knowledge base. Typed links turn it into a graph that can be queried and used to ground an agent. And a skill packages one repeatable task so that it is done the same way, loaded only when it applies.

The main points to carry forward:

- **A knowledge base** is built from research notes, specifications, glossaries, decision logs, and session logs, each with one job, joined by cross references.
- **Project memory** is the part an agent loads to resume work, and a session log is the bridge between sessions.
- **A knowledge graph** stores entities and typed, directed relationships, and **a personal knowledge graph** applies this to one researcher's own material, governed by a small schema.
- **Backlinks** and **entity extraction** make the graph cheap to grow, and extracted links must be reviewed.
- **Graph querying and graph RAG** answer multi-hop questions that text similarity misses.
- **An agent skill** is a directory built around SKILL.md: a name, a description that drives triggering, instructions, and supporting files loaded on demand.

!!! mascot-celebration "Your Project Can Remember"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now sort project material into notes, specifications, glossary, decisions, and logs, answer a multi-hop question by following typed relationships, and name the four parts of a skill. That is the memory and the packaging the rest of the book builds on.

The next chapter takes the skill from a file you can read to one you can design, test, and share. Round up a task you do at least once a month, and bring it.
