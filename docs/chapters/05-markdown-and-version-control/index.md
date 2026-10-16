---
title: "Markdown Project Files and Version Control"
description: "Plain text and Markdown as the shared format for humans and agents, project instruction files such as AGENTS.md and CLAUDE.md, and Git version control with commits, branches, and diff review for a project an agent can work in safely."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 09:26:27"
version: 1.11
---

# Markdown Project Files and Version Control

## Summary

This chapter introduces Markdown as the shared format that humans and agents both read, and the project instruction files, such as AGENTS.md and CLAUDE.md, that capture a project's goals, conventions, and constraints. It then covers Git, commits, branches, and naming conventions that keep that knowledge trustworthy over time. After this chapter you can set up a version-controlled project that an agent can work in safely.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Plain Text | 401 |
| Markdown | 349 |
| Markdown Syntax | 48 |
| Headings | 1 |
| Lists and Tables | 3 |
| Code Blocks | 1 |
| YAML Frontmatter | 15 |
| Project Instruction File | 13 |
| AGENTS.md File | 1 |
| CLAUDE.md File | 1 |
| Project Goals | 1 |
| Project Conventions | 5 |
| Project Constraints | 1 |
| Version Control | 20 |
| Git | 9 |
| Git Commit | 5 |
| GitHub Repository | 3 |
| Branch | 1 |
| Diff Review | 3 |
| File Organization | 7 |
| Naming Conventions | 1 |
| Documentation as Code | 4 |
| Prompt Versioning | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 3: Choosing Models and Writing Clear Prompts](../03-models-and-prompt-basics/index.md)
- [Chapter 4: Context Engineering and Advanced Prompting](../04-context-engineering-prompting/index.md)

!!! mascot-welcome "Give Your Agents a Place to Work"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Agents are only as good as the project they are dropped into. In this chapter you will build the plain files and the version history that let an agent learn your goals on arrival and let you undo anything it does. Trust, but verify!

## Plain Text

**Plain text** is a file that contains only characters, with no embedded formatting, objects, or binary structure, so that any editor can open it and any program can read it. Source code, CSV data, configuration files, and LaTeX sources are all plain text. A word-processor document, a spreadsheet, and a PDF are not: each is a binary container whose content requires a particular program to extract.

For work with agents, plain text has four properties that no richer format matches.

- *Readable by anything.* A language model reads text natively, and a file in plain text enters the context window as itself, with no conversion step that might drop a table or a footnote.
- *Comparable line by line.* Because the content is lines of characters, two versions can be compared to show exactly what changed, which is the basis of version control later in this chapter.
- *Searchable and scriptable.* Tools such as `grep` find every occurrence of a term, and a short script can rewrite many files at once.
- *Durable.* A text file written today will be readable in thirty years. A file in a proprietary format may not be.

| Format | Agent reads it directly | Line-by-line diff | Survives tool changes |
|---|---|---|---|
| Plain text, Markdown, LaTeX, CSV | Yes | Yes | Yes |
| Word document | After conversion | No | Partly |
| PDF | After extraction, layout may be lost | No | Yes |
| Spreadsheet | After export | No | Partly |
| Jupyter notebook | Yes (JSON) | Noisy | Partly |

*Table 1. How common research file formats serve an agent and a version history.*

The practical rule that follows is to keep the *source* of your project in plain text, and to treat rich formats as outputs generated from it. Your paper is LaTeX or Markdown, your data are CSV, and the PDF is what you produce for a reader.

!!! mascot-thinking "The Source Is the Plain Text"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Ask of any file in your project: if this binary file were lost, could it be regenerated from text? If yes, the text is the source and the binary is a build product. If not, you have a single point of failure that no agent and no version history can reason about.

## Markdown

**Markdown** is a plain-text format with a small set of conventions for marking structure: headings, lists, emphasis, links, tables, and code. The source stays readable as it is, and a renderer converts it to formatted HTML or a document. It has become the default format for notes, documentation, and instructions to agents, for a simple reason: it is plain text that carries just enough structure for a human to scan and a model to parse.

The conventions are called **Markdown syntax**, and there are a handful that cover nearly all use. Four are worth learning first, and each deserves a precise definition.

**Headings** mark the section structure. One to six leading hash characters set the level, followed by a space and the title: `# Title`, `## Section`, `### Subsection`. For an agent, headings are the table of contents it uses to navigate a long file, so a consistent hierarchy matters.

**Lists and tables** hold enumerations and comparisons. A bullet list uses a hyphen and a space at the start of each line. A numbered list uses a number, a period, and a space. A table separates columns with vertical bars and requires a header row followed by a separator row of hyphens. In many renderers a list must be preceded by a blank line, and omitting it is the single most common reason a list renders as a paragraph.

**Code blocks** hold literal text that must not be interpreted: commands, code, data, or the content of a configuration file. Three backticks on a line of their own begin and end a fenced block, and a word after the opening fence, such as `python`, names the language. Inline code uses single backticks, as in `fs`.

**Links and emphasis** complete the working set: `[text](url)` makes a link, `**text**` makes bold, and `*text*` makes italic.

A short example shows the source. It is wrapped in a four-backtick fence so that the three-backtick code block inside it is displayed literally.

````markdown
## Measurement setup

The converter was driven at the following settings:

- Sampling rate: 1 MS/s
- Input frequency: 499 kHz
- Record length: 4,096 samples

| Quantity | Value |
|----------|-------|
| ENOB     | 9.2 bits |
| Power    | 45 µW |

The analysis script is `enob.py`:

```python
enob = (sndr_db - 1.76) / 6.02
```
````

Every element in that source has a visible counterpart in the rendered page: a section heading, a bulleted list of three settings, a two-column table with a header, a line of inline code, and a code block with highlighting. The first MicroSim practices the writing direction, which is the one you need when an agent asks you for a file or when you correct what it produced.

#### Diagram: Markdown Syntax Matcher

<details markdown="1">
<summary>Markdown Syntax Matcher</summary>
Type: microsim
**sim-id:** markdown-syntax-matcher<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** use<br/>
**Learning Objective:** The learner will use Markdown syntax for headings, lists, tables, code, links, and emphasis by choosing, for each of eight described rendered results, the source text that produces it, with at least 7 of 8 correct.

**Prerequisites:** headings, lists and tables, code blocks, links, emphasis, and the blank line before a list, all defined in the section "Markdown" above.

**Evidence of Mastery:** For each of eight rendered results the learner commits one of three source options. A choice is correct when it is the option marked correct in Content. Mastery is at least 7 of 8 correct on the first attempt. Viewing the rendered preview of an option after the answer is revealed is exploration and is not evidence.

**Misconceptions:** (1) A heading needs no space after the hash characters. (2) A list item needs no space after the marker. (3) A table works without a separator row. (4) Quotation marks or single quotes make code.

**Instructional Rationale:** Apply-level work needs the learner to produce the correct syntax for a stated outcome. Distractors are the common near-miss errors, so that each wrong option corresponds to a documented misconception, and the rendered preview shows the consequence of each.

**Content:**

The rules follow the CommonMark specification with the GitHub Flavored Markdown table extension. Each item states the rendered result the learner must produce, and three candidate sources.

| # | Rendered result to produce | Option A | Option B | Option C | Correct | Why (shown as feedback) |
|---|---|---|---|---|---|---|
| 1 | A level-2 heading with the text "Measurement setup" | `##Measurement setup` | `## Measurement setup` | `**Measurement setup**` | B | A heading needs a space after the hashes. A has none, and C makes bold text, not a heading. |
| 2 | A bulleted list of three items: ENOB, SNDR, SFDR | `-ENOB` then `-SNDR` then `-SFDR` | `ENOB, SNDR, SFDR` | `- ENOB` then `- SNDR` then `- SFDR` | C | A list marker must be followed by a space. A has none, and B is a single line of text. |
| 3 | A numbered list of three steps: Bias, Calibrate, Measure | `1.Bias` then `2.Calibrate` then `3.Measure` | `1. Bias` then `2. Calibrate` then `3. Measure` | `(1) Bias` then `(2) Calibrate` then `(3) Measure` | B | A numbered item is a number, a period, and a space. A has no space, and C is not list syntax. |
| 4 | The variable name fs shown as inline code | `'fs'` | `"fs"` | `` `fs` `` | C | Code uses backticks. Single and double quotes are ordinary characters. |
| 5 | A multi-line block of Python code with the language named | `'''python` then the code then `'''` | `` ```python `` then the code then `` ``` `` | `"""python` then the code then `"""` | B | A fenced block uses three backticks. Quote characters are not fences. |
| 6 | The word "datasheet" as a link to https://example.com/ds.pdf | `(datasheet)[https://example.com/ds.pdf]` | `<datasheet>https://example.com/ds.pdf` | `[datasheet](https://example.com/ds.pdf)` | C | A link is square brackets for the text, then parentheses for the address, in that order. |
| 7 | A table of two columns, Quantity and Value, with one data row: ENOB and 9.2 | The header row `Quantity, Value` then the row `ENOB, 9.2` | The header row `\| Quantity \| Value \|` then the row `\| ENOB \| 9.2 \|` with no separator row | The header row `\| Quantity \| Value \|` then the separator row `\|---\|---\|` then the row `\| ENOB \| 9.2 \|` | C | A table needs a header row followed by a separator row of hyphens. Without it the text renders as a paragraph. |
| 8 | The word ENOB in bold | `*ENOB` | `!ENOB!` | `**ENOB**` | C | Bold wraps the text in double asterisks on both sides. A has no closing marker, and B is not Markdown syntax. |

**Provenance:** The syntax rules are from the section "Markdown" of this chapter and agree with the CommonMark specification and the GitHub Flavored Markdown table extension. The example words are illustrative, and the URL is a reserved documentation address.

**Rules:** Each item has exactly one correct option. The sim must shuffle the option order independently for each learner, so that the position of the correct option carries no information, and must not reveal the Correct column before the answer is committed. The rendered preview of each option is produced by a Markdown renderer that follows the rules above.

**Learner Activity:**

1. The learner reads the description of the rendered result for item 1.
2. The learner chooses one of the three source options and submits.
3. The sim reveals the correct option, shows the rendered preview of the chosen option next to the preview of the correct one, and shows the "Why" sentence.
4. After item 8, the sim shows the count correct and the misconceptions for the items missed. The learner should notice that most wrong options differ from the correct one by a single missing space or character.

**Feedback:** Eight items, one attempt each, in a fixed order. Correct: "Correct." plus the "Why" sentence. Incorrect: the "Why" sentence plus the rendered previews. The correct option is always revealed after the single attempt. A final score "n of 8 correct" is shown with whether the mastery threshold of 7 was met.

**Starting State:** Item 1 is shown with three unselected options. The question on screen is "Which source produces this result?"

**Chapter Anchors:** The chapter states that a heading is hashes, a space, and a title, that a bullet item is a hyphen and a space, that a numbered item is a number, a period, and a space, that a table needs a header row and a separator row, that code uses backticks, and that a list needs a blank line before it.
</details>

<iframe src="../../sims/markdown-syntax-matcher/main.html" height="762px" width="100%" scrolling="no"></iframe>

*MicroSim: Markdown Syntax Matcher. [Open it fullscreen](../../sims/markdown-syntax-matcher/main.html).*

### YAML Frontmatter

Markdown is mostly free-form, and software often needs to know *about* a document: its title, date, status, or the tools that produced it. **YAML frontmatter** is a block of key-value metadata at the very top of a Markdown file, enclosed between two lines of three hyphens. It is the standard way for a document to carry machine-readable properties without disturbing the human-readable text below it.

```yaml
---
title: "ENOB Measurement Procedure"
status: draft
owner: your-name
date: "2026-10-15"
---
```

Static-site generators, note-taking tools, and agent frameworks read this block. The frontmatter is also where an agent skill declares its name and description, which Chapter 6 develops. YAML has one rule that catches nearly everyone: a value that contains a colon must be wrapped in double quotes. An unquoted `title: Kinematics: where is the hand?` is invalid, and a tool may silently print the block as text or drop it. Quote every title, description, and date as a habit.

## Project Instruction Files

An agent that opens a project for the first time knows nothing about it. A **project instruction file** is a Markdown file at the root of a project that an agent reads automatically at the start of a session, so that the project's goals, conventions, and constraints are present in the context before the first request. It is context engineering done once and reused every time.

Two file names are in common use, and the distinction is mostly about which tool reads which file. The **AGENTS.md file** is a tool-neutral convention, read by a growing set of coding agents, for general instructions to any agent working in the project. The **CLAUDE.md file** is the file name read by Claude Code. The two are not in conflict. A frequent arrangement, and the one used by this book's own repository, is to put the instructions in `AGENTS.md` and have `CLAUDE.md` contain a single line, `@AGENTS.md`, which imports it, so that every tool reads one source of truth.

A useful instruction file has three kinds of content, and keeping them distinct makes the file easier to maintain and for an agent to follow.

**Project goals** state what the project is for and what success means. They give the agent the stopping rule that Chapter 1 asked you to write for every question. **Project conventions** state how work is done here: naming, formats, units, commit style, where files go, and which tools to use. They make the agent's output look like your own. **Project constraints** state what must not happen: files that must not be edited, actions that require approval, dependencies that may not be added, and data that must not leave the machine. A constraint is a boundary, and it is the section you will most wish you had written after an agent crosses one.

A compact worked example for the running SAR ADC project follows. Every value is illustrative.

```markdown
# AGENTS.md

## Goal
Show whether a 10-bit SAR ADC in 65 nm reaches ENOB >= 9.5 at 1 MS/s
below 50 uW. Success means all acceptance criteria in docs/spec.md pass.

## Conventions
- Scripts: Python 3, NumPy and SciPy only. File names are lowercase with hyphens.
- Report ENOB in bits to one decimal, with input frequency and record length.
- Commit messages: imperative mood, subject line at most 72 characters.

## Constraints
- Never modify files under data/raw/.
- Do not add dependencies without asking.
- Ask before running any job expected to take more than 30 minutes.
```

Notice what the file leaves out. It does not say "be careful" or "do excellent work", which are not actionable. It does not contain yesterday's debugging notes, which will be stale by next week and which belong in a log. And it contains no secret. An instruction file is committed to a repository and read by an agent, so a password or API key placed in it is a leak.

!!! mascot-tip "Keep the File Short and Testable"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Read each line and ask whether you could check it. "Do not edit data/raw" can be checked with a diff. "Write clean code" cannot. A file of twenty checkable lines is followed more reliably than a file of two hundred hopeful ones, and it costs less context on every turn.

#### Diagram: Project Instruction File Triage

<details markdown="1">
<summary>Project Instruction File Triage</summary>
Type: microsim
**sim-id:** project-instruction-file-triage<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge each of eleven lines of a draft instruction file as a goal, a convention, a constraint, or not belonging in the file, with at least 9 of 11 judged correctly.

**Prerequisites:** project instruction file, project goals, project conventions, and project constraints, all defined in the section "Project Instruction Files" above.

**Evidence of Mastery:** For each of eleven lines the learner commits one of four labels. A label is correct when it equals the label in Content. Mastery is at least 9 of 11 correct on the first attempt. Reading the draft file as a whole is exploration and is not evidence.

**Misconceptions:** (1) Anything useful to say to an agent belongs in the instruction file. (2) A vague exhortation such as "be careful" is a constraint. (3) A credential in a private repository is safe to include.

**Instructional Rationale:** Evaluate-level work needs the learner to apply criteria, durable, checkable, safe, to each candidate line. Three categories of lines that do not belong are included so that "keep it" is not the default answer.

**Content:**

The draft file shown is for the illustrative SAR ADC project. The four labels are Goal, Convention, Constraint, and Does not belong.

| # | Line in the draft file | Correct label | Why (shown as feedback) |
|---|---|---|---|
| 1 | The project's goal is to show whether a 10-bit SAR ADC in 65 nm reaches ENOB of at least 9.5 at 1 MS/s below 50 µW. | Goal | It states what the project is for and what success means. |
| 2 | Name scripts in lowercase with hyphens, for example enob-sweep.py. | Convention | It states how work is done, so that output matches the project's style. |
| 3 | Never modify files under data/raw/. | Constraint | It is a boundary that can be checked with a diff. |
| 4 | Use NumPy and SciPy only, and do not add new dependencies without asking. | Constraint | It limits what the agent may do and requires approval. |
| 5 | Write commit messages in the imperative mood, with a subject line of at most 72 characters. | Convention | It states a working practice that makes the history uniform. |
| 6 | Yesterday's run crashed at corner ss_0p9v; I think it was a license server problem. | Does not belong | It is a transient debugging note and will be stale. A log or notes file is the right place. |
| 7 | Report ENOB in bits with one decimal place, and state the input frequency and record length. | Convention | It fixes units and reporting form for every result. |
| 8 | Do not run simulations expected to take more than 30 minutes without confirming with me. | Constraint | It requires human approval for a costly action. |
| 9 | Success means all acceptance criteria in docs/spec.md pass. | Goal | It defines done, in a checkable way, by pointing at the criteria. |
| 10 | Be smart, be careful, and do an excellent job. | Does not belong | It is not actionable or checkable and spends context on every turn. |
| 11 | The cluster scheduler API key is: a 32-character key. | Does not belong | A secret in a committed file leaks. Keys belong in an environment variable or a secrets manager. |

**Provenance:** The three kinds of content and the exclusions are from the section "Project Instruction Files" of this chapter. All lines are invented for illustration, and the sim labels them "illustrative draft".

**Rules:** Each line has exactly one correct label. A line is a Goal when it states a purpose or a success condition, a Convention when it states how routine work is done, a Constraint when it limits or requires approval for an action, and Does not belong when it is transient, non-actionable, or a secret.

**Learner Activity:**

1. The learner sees the draft file with line 1 highlighted.
2. The learner chooses one of the four labels for the highlighted line and submits.
3. The sim shows whether the label was correct and the "Why" sentence, and highlights the next line.
4. After line 11, the sim shows the count correct. For each line labeled Does not belong, it names where the content should live instead. The learner should notice that three of the eleven lines should be removed.

**Feedback:** Eleven lines, one attempt each, in a fixed order. Correct: "Correct: <label>." plus the "Why" sentence. Incorrect: "This line is <label>." plus the "Why" sentence. The correct label is always revealed after the single attempt. A final score "n of 11 correct" is shown with whether the mastery threshold of 9 was met.

**Starting State:** The draft file is shown with line 1 highlighted. The question on screen is "Is this line a goal, a convention, a constraint, or not worth putting in the file?"

**Chapter Anchors:** The chapter states that an instruction file has goals, conventions, and constraints, that it should leave out vague exhortations, transient notes, and secrets, and that a line should be checkable.
</details>

<iframe src="../../sims/project-instruction-file-triage/main.html" height="782px" width="100%" scrolling="no"></iframe>

*MicroSim: Project Instruction File Triage. [Open it fullscreen](../../sims/project-instruction-file-triage/main.html).*

## Organizing a Project for Agents and People

**File organization** is the arrangement of a project's files into directories with a predictable purpose. A consistent layout lets an agent find things without being told where, and lets you find your own work after a year. The layout below is a reasonable starting point for a research project, and the exact names matter less than using the same names across your projects.

```text
sar-adc-project/
├── AGENTS.md          instructions for agents
├── CLAUDE.md          one line: @AGENTS.md
├── README.md          what this is, how to run it
├── docs/              specification, decisions, notes
├── prompts/           reusable prompts, one file each
├── scripts/           analysis and simulation code
├── data/
│   ├── raw/           as measured, never edited
│   └── processed/     generated from raw by scripts
└── results/           tables and figures, generated
```

The separation of `raw` from `processed` and from `results` is the most valuable single rule. Raw data are read-only inputs. Everything downstream is generated by scripts, so it can be regenerated and checked, and an agent that is told "never modify data/raw" has a clear boundary to respect.

**Naming conventions** are the rules for what files are called. The aim is names that sort sensibly, contain no characters that break a shell, and say what is inside. A small set of rules covers most needs: lowercase words separated by hyphens, no spaces, dates in the ISO order year-month-day so that they sort chronologically, and a numeric prefix when order matters.

| Instead of | Use | Reason |
|---|---|---|
| `Final results (new) v2.xlsx` | `results/enob-sweep-2026-10-15.csv` | No spaces, no "final", sorts by date |
| `Notes 10-15.md` | `docs/notes-2026-10-15.md` | Date sorts correctly |
| `Script.PY` | `scripts/enob-sweep.py` | Lowercase, descriptive |
| `fig1.png` | `results/fig-enob-vs-fin.png` | Says what it shows |

*Table 2. Naming habits that help people, scripts, and agents.*

**Documentation as code** is the practice of keeping documentation in the same repository as the work, in plain text, under the same version control and review as the code. The specification, the decisions log, and the README live next to the scripts they describe, are changed in the same commit as the change they document, and are checked by the same process. The benefit is that documentation cannot silently drift away from the project, because a change to one shows up in the same diff as a change to the other. It is also what lets an agent read the project's documentation as part of its context and update it when it changes the code.

## Version Control

**Version control** is a system that records every change to a set of files, with who made it, when, and why, so that any earlier state can be recovered and any two states compared. For research this is not an optional engineering nicety. It is the answer to the questions "what exactly produced this figure?", "what did the agent change?", and "how do I get back to the version that worked?".

**Git** is the version-control system in near-universal use. It stores the history of a project in a hidden directory inside the project, called a repository, so that every copy of the project carries its full history. The vocabulary is small. Before the commands below, four terms need defining.

A **Git commit** is a saved snapshot of the project's tracked files, with a message describing the change. A commit is the unit of history: small, named, and recoverable. A **branch** is a movable label for a line of commits, which lets you try a change in isolation without disturbing the main line, and merge it back only if it works. A **GitHub repository** is a copy of a Git repository hosted on the GitHub service, which provides a shared remote, a backup, and the review and collaboration tools built around it. **Diff review** is reading the exact line-by-line changes between two states before accepting them.

The commands below are the working loop. Each comment states what the command does.

```bash
git status                                      # which files changed, which are new
git diff                                        # exactly what changed, line by line
git add docs/spec.md scripts/enob.py            # choose files for the next snapshot
git commit -m "Add ENOB function and acceptance tests"   # save the snapshot
git switch -c experiment/hann-window            # create a branch and move onto it
git push                                        # copy the commits to the hosted repository
```

The loop is simple, and its power is in the habit. Commit small, coherent changes with a message saying what and why, in the imperative mood ("Add", "Fix", "Rename"), and keep the subject line to about 72 characters so that it is readable in a log. Many small commits can be reviewed and undone individually. One large commit at the end of a week cannot.

!!! mascot-tip "Commit Before You Hand the Keys to an Agent"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you ask an agent to change files, make sure your working tree is clean, with everything committed. Then the agent's changes are the only changes in `git diff`, and a single command discards them if you do not like what they did.

Git's usefulness for AI-assisted work is concentrated in diff review. When an agent edits your files, the output you must verify is not the agent's description of what it did but the diff. A unified diff marks removed lines with a minus sign and added lines with a plus sign. The example below, with illustrative content, shows an agent asked only to fix a typo in a results paragraph.

```diff
 ## Results
-The measured ENOB is 9.2 bits at 1 MS/s, with an input frequency of 499 kHz.
+The measured ENOB is 9.6 bits at 1 MS/s, with an input frequency of 499 kHz.
 
 ## Discussion
-The converter meets the target of 9.5 bits only at the typical corner.
+The converter meets the target of 9.5 bits.
```

The agent's summary might read "Fixed typographic issues". The diff shows that a measured value changed from 9.2 to 9.6 and a qualification was deleted, which turns a failed target into a met one. No agent summary would have told you so. A diff costs thirty seconds to read, and it is the most effective single control you have.

!!! mascot-warning "The Summary Is Not the Change"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is accepting an agent's own description of its edits. It happens because the description is fluent and short, and the diff is neither. Read `git diff` before every commit, look at numbers and deleted lines first, and reject any hunk you cannot account for.

The same reasoning applies to the prompts you wrote in Chapters 3 and 4. **Prompt versioning** is keeping each prompt as a file in the repository and recording changes to it in commits, so that every result can be tied to the exact prompt that produced it. Store prompts in a `prompts/` directory, one per file, with a header recording the model, settings, and date they were tested with. When you produce a result, record the short commit identifier in the output, which you can obtain with `git rev-parse --short HEAD`. Months later, the result, the prompt, the script, and the data are all recoverable at that commit.

The reused MicroSim below traces a complete feature-branch workflow, which is the pattern for letting an agent work on a branch and reviewing its commits before they join the main line.

#### Diagram: Feature-Branch Git Workflow

<iframe src="https://dmccreary.github.io/information-systems/sims/git-feature-branch-workflow/main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run the Feature-Branch Git Workflow MicroSim fullscreen](https://dmccreary.github.io/information-systems/sims/git-feature-branch-workflow/main.html){ .md-button }

<details markdown="1">
<summary>Feature-Branch Git Workflow (reused MicroSim)</summary>
Type: graph-model
**sim-id:** git-feature-branch-workflow<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/information-systems/sims/git-feature-branch-workflow/<br/>
**Source Repo:** https://github.com/dmccreary/information-systems/tree/main/docs/sims/git-feature-branch-workflow<br/>
**Bloom Level:** Remember<br/>
**Bloom Verb:** identify<br/>
**Learning Objective:** The learner will identify the commits, pull request, code review, merge, and deployment steps of a feature-branch Git workflow.

Reused from the MicroSim catalog (WHAT match score 0.76).
</details>

!!! mascot-encourage "Git Has a Steep First Week"
    ![Volt encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If Git's vocabulary feels like a lot, that is normal, and most researchers get confused about branches at first. You already keep dated copies of files named "final" and "final2". Begin with only `status`, `diff`, `add`, and `commit`, and add branches when you first want to try something you might throw away.

## Summary and Key Takeaways

An agent is only as reliable as the project it works in. Plain-text files, a short and checkable instruction file, a predictable layout, and a version history give both you and the agent the memory, the boundaries, and the means of recovery that safe delegation needs.

The main points to carry forward:

- **Plain text** is readable by agents, comparable line by line, searchable, and durable. Keep your source in it.
- **Markdown** adds just enough structure with headings, lists, tables, and code blocks, and its syntax is a handful of precise rules.
- **YAML frontmatter** carries machine-readable metadata, and every value containing a colon must be quoted.
- **A project instruction file** (AGENTS.md, CLAUDE.md) states goals, conventions, and constraints, in lines you could check, and contains no secrets.
- **File organization and naming conventions** make a project predictable, and separating raw data from generated results gives agents a clear boundary.
- **Documentation as code** keeps the explanation in the same history as the work.
- **Git commits and branches** record small, named, recoverable changes, and a GitHub repository backs them up and supports review.
- **Diff review** is the check on what an agent actually did, and **prompt versioning** ties each result to the prompt that made it.

!!! mascot-celebration "A Project an Agent Can Work In"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now write Markdown with correct headings, lists, tables, and code, set up a project with an AGENTS.md of goals, conventions, and constraints, and review a diff before accepting an agent's work. That is a workspace in which delegation is reversible.

The next chapter builds the reusable pieces that sit on top of this foundation: knowledge bases, personal knowledge graphs, and the anatomy of an agent skill. Round up your files, commit them, and bring the project you would like an agent to work in.

[See Annotated References](./references.md)
