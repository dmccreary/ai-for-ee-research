# Quiz: Markdown Project Files and Version Control

Test your understanding of plain text, Markdown syntax, project instruction files, file organization, and Git version control.

---

#### 1. What is plain text?

<div class="upper-alpha" markdown>
1. Any file that can be opened in a web browser
2. A document saved as a PDF
3. A file containing only characters, with no embedded formatting or binary structure
4. A Microsoft Word file exported to .txt
</div>

??? question "Show Answer"
    The correct answer is **C**. Plain text contains only characters, so any editor or program can read it and two versions can be compared line by line. PDFs and Word files are binary containers that need conversion, and browser readability is not the defining property.

    **Concept Tested:** Plain Text

    **See:** [Plain Text](./index.md#plain-text)





---

#### 2. Why is Markdown a good shared format for humans and agents?

<div class="upper-alpha" markdown>
1. It is plain text that adds just enough structure for a human to scan and a model to parse.
2. It is a binary format that preserves exact fonts and colors.
3. It can only be read by specialized Markdown editors.
4. It automatically runs code embedded in documents.
</div>

??? question "Show Answer"
    The correct answer is **A**. Markdown is plain text with lightweight syntax for headings, lists, tables, code, links, and emphasis. It stays human-readable in source form and is easy for agents to process. It is not binary, not editor-locked, and does not execute code.

    **Concept Tested:** Markdown

    **See:** [Markdown](./index.md#markdown)





---

#### 3. What is YAML frontmatter?

<div class="upper-alpha" markdown>
1. The main body text of a Markdown file
2. A block of key-value metadata at the top of a Markdown file, enclosed in triple hyphens
3. A separate file that holds all project metadata
4. A Git command for tracking file changes
</div>

??? question "Show Answer"
    The correct answer is **B**. YAML frontmatter sits at the very top of a Markdown file between two `---` lines and carries machine-readable properties such as title, status, owner, and date. Static-site generators and agents often read it, and values containing colons should be quoted.

    **Concept Tested:** YAML Frontmatter

    **See:** [YAML Frontmatter](./index.md#yaml-frontmatter)





---

#### 4. Which three kinds of content belong in a project instruction file such as AGENTS.md?

<div class="upper-alpha" markdown>
1. Project goals, project conventions, and project constraints
2. Secrets, API keys, and passwords
3. Yesterday's debugging notes and transient observations
4. Vague encouragements such as "be careful" and "do excellent work"
</div>

??? question "Show Answer"
    The correct answer is **A**. A useful instruction file states what the project is for, how work is done, and what must not happen. It should not contain secrets, stale notes, or uncheckable exhortations, because all of those either leak, become stale, or waste context on every turn.

    **Concept Tested:** Project Instruction File

    **See:** [Project Instruction Files](./index.md#project-instruction-files)





---

#### 5. Which of the following lines is best classified as a project constraint?

<div class="upper-alpha" markdown>
1. "The goal is to reach ENOB >= 9.5 bits."
2. "Name scripts in lowercase with hyphens."
3. "Report ENOB with one decimal place."
4. "Never modify files under data/raw/."
</div>

??? question "Show Answer"
    The correct answer is **D**. A constraint is a boundary that limits what an agent may do; it can be checked with a diff. The goal is a purpose statement, and the other two lines are conventions about how work is done.

    **Concept Tested:** Project Constraints

    **See:** [Project Instruction Files](./index.md#project-instruction-files)





---

#### 6. Which file name best follows the naming conventions in the chapter?

<div class="upper-alpha" markdown>
1. `Final results (new) v2.xlsx`
2. `results/enob-sweep-2026-10-15.csv`
3. `Notes 10-15.md`
4. `Script.PY`
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter recommends lowercase, hyphen-separated words, descriptive names, and ISO-order dates so files sort chronologically. The other options use spaces, mixed case, ambiguous "final" labels, or non-sortable date formats.

    **Concept Tested:** Naming Conventions

    **See:** [Organizing a Project for Agents and People](./index.md#organizing-a-project-for-agents-and-people)





---

#### 7. What is a Git commit?

<div class="upper-alpha" markdown>
1. A request to download the latest version from a remote server
2. A copy of the repository on GitHub
3. A saved snapshot of the project's tracked files, with a message describing the change
4. A list of all branches in the project
</div>

??? question "Show Answer"
    The correct answer is **C**. A commit records a snapshot of tracked files along with a message, making that state named and recoverable. A GitHub repository is a hosted copy, a pull or fetch downloads changes, and branches are separate lines of commits.

    **Concept Tested:** Git Commit

    **See:** [Version Control](./index.md#version-control)





---

#### 8. What is the recommended practice before asking an agent to change files in a project?

<div class="upper-alpha" markdown>
1. Delete all previous commits to start fresh
2. Hide the .git directory so the agent cannot see the history
3. Make sure the working tree has uncommitted changes
4. Commit the current state so the agent's changes appear clearly in the diff
</div>

??? question "Show Answer"
    The correct answer is **D**. Committing before delegation makes the agent's edits the only uncommitted changes, so `git diff` shows exactly what the agent did and a single command can discard them if needed. Deleting history or hiding Git defeats version control, and uncommitted prior changes blur the picture.

    **Concept Tested:** Version Control

    **See:** [Version Control](./index.md#version-control)





---

#### 9. The diff of an agent's edit changes a measured ENOB from 9.2 to 9.6 bits and removes the qualifier "only at the typical corner." What should you conclude?

<div class="upper-alpha" markdown>
1. The agent likely made a meaningful change to a reported result and its interpretation; review it carefully before accepting.
2. The edit is purely typographic and can be accepted as-is.
3. The diff is unreliable and should be ignored in favor of the agent's summary.
4. The change is correct because larger ENOB values are always better.
</div>

??? question "Show Answer"
    The correct answer is **A**. The diff shows both a numeric change and the deletion of a qualification that turns a failing target into a passing one. Diffs reveal what summaries hide. You should not accept such changes without checking against the source data and the original wording.

    **Concept Tested:** Diff Review

    **See:** [Version Control](./index.md#version-control)





---

#### 10. Where should a note like "Yesterday's run crashed at corner ss_0p9v; likely a license server problem" live instead of AGENTS.md?

<div class="upper-alpha" markdown>
1. In the project goals section of AGENTS.md
2. In a session log or notes file, because it is transient
3. In the YAML frontmatter of the README
4. As a project constraint
</div>

??? question "Show Answer"
    The correct answer is **B**. Transient debugging notes become stale quickly and do not belong in a standing instruction file. A session log or dated notes file is the right place. Goals and constraints are durable, and frontmatter is for metadata, not narrative debugging notes.

    **Concept Tested:** Project Instruction File

    **See:** [Project Instruction Files](./index.md#project-instruction-files)
