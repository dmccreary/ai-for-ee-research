---
title: Instructor's Guide
description: How to teach with AI for EE Research — course planning, pacing, tools and data policy, chapters, MicroSims, posters, quizzes, references, the capstone, licensing, customization, and learning analytics.
---

# Instructor's Guide

Welcome to the instructor's guide for *AI for EE Research: From Researcher to Orchestrator*. This guide explains every part of the textbook, how to use each part in a graduate course, seminar, or workshop series, and how to adapt the book for your own students. No prior knowledge of web publishing or learning analytics is assumed. Each technical term is defined before it is used.

The book is written for graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, and for postdocs and faculty who want practical AI skills for everyday research. You may be teaching it as a for-credit course, running it as a lab-group reading series, or working through it yourself before you introduce it to your group. The guide covers all three.

## About This Intelligent Textbook

### What Is an Intelligent Textbook?

An **intelligent textbook** is a digital textbook that goes beyond static text and images. It includes interactive simulations, self-check quizzes, a searchable glossary, and a structured map of how concepts depend on each other. The aim is to let students practice the judgments a subject requires, not only read about them.

### The Five Levels of Intelligent Textbooks

Intelligent textbooks are grouped into five levels by how interactive and adaptive they are:

<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/book-levels/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

| Level | Name | Description | Example Features |
|-------|------|-------------|------------------|
| **Level 1** | Static Digital | A PDF or basic web version of a print textbook | Text and images only, no interactivity |
| **Level 2** | Interactive | Adds simulations, quizzes, and searchable glossaries | MicroSims, self-check quizzes, concept search |
| **Level 3** | Adaptive | Adjusts content based on student performance | Personalized learning paths, difficulty adjustment |
| **Level 4** | AI-Assisted | Includes an AI tutor that answers student questions | Chatbot integration, automated feedback |
| **Level 5** | Fully Adaptive AI | Learns from student interactions and optimizes the experience | Real-time content generation, predictive analytics |

**This textbook is a Level 2 intelligent textbook.** It has 50 MicroSims, 20 chapter quizzes, a 379-term glossary, and an interactive learning graph. It also lays groundwork for Level 3: 47 of its MicroSims are instrumented to record learning events in a standard format (see [Analytics and Learning Records](#analytics-and-learning-records)), although the book does not yet adapt itself to each learner.

### What Makes This Textbook Different

- **The researcher as orchestrator.** The book is organized around one idea: the researcher's job is shifting from doing every task personally to directing a team of roughly 20 planning agents and 10 execution agents, while staying accountable for the science.
- **Verification on every page.** Every chapter trains students to check AI output before trusting it: citations against primary sources, numbers against sanity checks, code against tests. The book's catchphrase is "Trust, but verify!"
- **Two concrete building blocks.** Students learn to capture project knowledge in plain Markdown files and to turn repeatable research tasks into tested **agent skills**, which are packaged instructions an AI agent can load and follow as a single command.
- **Practice, not only reading.** 50 MicroSims and 25 interactive infographic posters let students sort, judge, calculate, and explore. Most of them train decisions, such as whether a citation is real or whether an agent should be allowed to act without approval.
- **A learning graph** maps all 379 concepts and the 670 dependencies between them, so every concept is introduced after its prerequisites.
- **Volt the Border Collie**, a mascot character (a "pedagogical agent"), guides students through each chapter with insights, tips, warnings, and encouragement.
- **Free and open.** The book is licensed under Creative Commons for non-commercial use. There are no paywalls or access codes.

## Planning Your Course

### Prerequisites

The [course description](../../course-description.md) assumes students have:

- Graduate standing, or equivalent research experience, in electrical engineering, computer engineering, or a related field
- Working knowledge of at least one programming language, preferably Python
- Basic comfort with a command line, a text editor, and Git
- Experience writing a technical paper or report

No prior machine learning, prompt engineering, or agent experience is required. The book does not teach model training, machine learning theory, or EE domain theory. It assumes students bring their own research problems and domain knowledge.

If some students are new to Git or the command line, schedule a short lab session before Chapter 5. Chapter 5 teaches the Git practices the rest of the book relies on, but it moves quickly for someone who has never opened a terminal.

### Tools and Accounts Students Will Need

The tools students need grow as the book progresses.

| Chapters | What students need |
|----------|-------------------|
| 1–4 | A chat interface to at least one large language model. API access (programmatic access to a model from a script) is useful from Chapter 3 onward, where students price a batch job. |
| 5–7 | Git, a GitHub account, a text editor, and an **AI coding agent**: a tool that reads project files and runs commands on the student's behalf, such as Claude Code or OpenAI Codex. Agents read the project instruction files (`AGENTS.md`, `CLAUDE.md`) taught in Chapter 5. |
| 8–15 | The same coding agent, plus Python with the usual scientific libraries for Chapters 12–13. |
| 16–20 | A browser for MicroSims. Chapter 19's always-on personal agents are best demonstrated by the instructor rather than required of every student. |

Before the term starts, decide three things:

1. **Which tools are approved.** Many universities license specific AI tools with data-protection terms that consumer accounts lack. Check what your institution provides before you ask students to sign up for anything.
2. **Who pays.** Paid subscriptions and API usage cost money. Chapter 3 shows how to estimate the cost of a batch from token counts. Set a per-student budget, or provide shared credits, so that no student is disadvantaged by the tool they can afford.
3. **What data may go where.** See the next section.

### Setting a Course AI-Use and Data Policy

A course that teaches AI use needs its own written policy on day one. Base it on [Chapter 18: Responsible and Ethical Use of AI](../../chapters/18-responsible-ethical-use/index.md) and your institution's rules, and cover at least:

- **Data classes.** Which kinds of data students may send to which tools. Unpublished results, collaborators' data, data under a non-disclosure agreement, export-controlled designs, and personal data about human subjects usually belong in the most restricted class. The [Data Sensitivity Sorter](../../sims/data-sensitivity-sorter/index.md) MicroSim is a good first-week exercise for this.
- **Disclosure.** Ask for a short AI-use disclosure statement on every assignment, in the form Chapter 18 teaches.
- **Evidence of verification.** Ask students to keep agent logs or a decision log, and to show at least one independent check for each AI-assisted result they submit.
- **Authorship.** The researcher stays accountable. AI output a student submits is the student's responsibility, including any fabricated citation it contains.

### Suggested Pacing

The book has 20 chapters in five parts:

| Part | Chapters | Topic Area |
|------|----------|-----------|
| 1. Foundations | 1–4 | Research workflows and the orchestrator idea, how language models work, choosing models and writing prompts, context engineering |
| 2. Memory and skills | 5–7 | Markdown project files and Git, knowledge bases and personal knowledge graphs, designing and testing agent skills |
| 3. Agents and teams | 8–10 | Agents and tool use, supervising agents and defining roles, orchestrating planning and execution agents |
| 4. Research tasks | 11–15 | Literature search, data analysis, simulation and testing, brainstorming and problem framing, manuscript preparation |
| 5. Communicate and trust | 16–20 | MicroSims and research communication, verification and reproducibility, responsible use, always-on personal agents, case studies and capstone |

Most chapters run 4,000 to 5,000 words including their MicroSim specifications. Chapter 1 is about twice that length, because it introduces the vocabulary the rest of the book uses.

A 15-week semester fits the book well, with capstone milestones placed so that each one uses what the class has just learned:

| Week | Chapters | Capstone milestone |
|------|----------|--------------------|
| 1 | 1 | Each student picks a small, real research task from their own work |
| 2 | 2–3 | |
| 3 | 4 | Research question with a metric, a threshold, and acceptance criteria |
| 4 | 5 | Version-controlled repository with a project instruction file |
| 5 | 6 | Knowledge base and decision log |
| 6 | 7 | One tested agent skill |
| 7 | 8 | |
| 8 | 9–10 | One-page agent team design with roles, autonomy levels, and review points |
| 9 | 11 | Annotated reading list with verified citations |
| 10 | 12–13 | Analysis or simulation code with tests |
| 11 | 14 | |
| 12 | 15 | Draft paper section in the student's own voice |
| 13 | 16–17 | Reproducibility package checked on a clean machine |
| 14 | 18–19 | Data classification and disclosure statement |
| 15 | 20 | Capstone presentations |

For a **10-week quarter**, cover one part every two weeks and drop Chapter 19 or assign it as reading. For a **five-session workshop**, give one session to each part, demonstrate the MicroSims live, and replace the capstone with a single skill that each participant builds for their own work.

## Using the Chapters

### What Each Chapter Contains

Every chapter follows the same structure:

1. **Front matter.** Metadata at the top of the file (title, description, version). Students don't see it; the website builder and search engines use it.
2. **Summary.** A short overview of what the chapter covers and what students will be able to do afterward.
3. **Concepts Covered.** A table of the learning-graph concepts the chapter teaches, each with a **Concept Impact Score**. The score measures how much of the rest of the learning graph builds on that concept, directly or through other concepts. A high score marks a foundational concept that deserves extra class time.
4. **Prerequisites.** Links to the earlier chapters the chapter depends on.
5. **Welcome from Volt.** A short opening that tells students why the chapter matters to their research.
6. **Main content.** The instruction itself, with worked examples drawn from EE research, tables, equations, and embedded MicroSims.
7. **Volt's admonitions.** Colored callout boxes that highlight key ideas, practical tips, common mistakes, and encouragement on harder passages.
8. **Summary and Key Takeaways.** A bulleted list of the points to carry forward, followed by a closing celebration from Volt.
9. **Annotated References** and **Quiz.** Each chapter has a separate references page and a separate quiz page, listed under the chapter in the left navigation.

The chapters do not include end-of-chapter exercises. The MicroSims, the quizzes, and the capstone milestones fill that role. Add your own discussion questions where your students need them.

### Suggested Class Use

- **Before class.** Assign the chapter and ask students to run its MicroSims, which are interleaved with the reading. Ask them to bring one question and one place where they would want to verify the chapter's advice on their own work.
- **During class.** Do live demonstrations with a real agent on a real task from the chapter. The most useful demonstrations include a failure: a fabricated citation, a script that runs but gives the wrong answer, or a prompt that the model misreads. Then have students apply the chapter to their own research task in pairs.
- **After class.** Assign the quiz as a self-check and the week's capstone milestone as the graded work.

## Using the MicroSims

### What Is a MicroSim?

A **MicroSim** (short for "micro-simulation") is a small, interactive program that runs directly in a web browser. Students install nothing; any modern browser (Chrome, Firefox, Safari, Edge) will do.

Most MicroSims in this book train judgment rather than simulate physics. They present a realistic research scenario, ask the student to make a decision, and then explain the right answer and why. The list of all 50 is on the [MicroSims page](../../sims/index.md).

### How MicroSims Are Embedded

MicroSims appear inside chapter pages as rectangular interactive areas. They are embedded with an **iframe**, a web feature that displays one web page inside another. Below each one is a link to open it fullscreen, which is the better choice on a projector.

Just above each MicroSim in a chapter is a collapsible block labeled with the MicroSim's name. Click it to see the full specification: the learning objective, the scenario content and where it came from, the rules, the learner activity, the feedback, and the starting state. These specifications are useful for lesson planning and for understanding why the MicroSim asks what it asks.

### Kinds of MicroSims

| Kind | What students do | Examples |
|------|------------------|----------|
| Sorters | Place items into categories | [Research Task Sorter](../../sims/research-task-sorter/index.md), [Prompt Component Sorter](../../sims/prompt-component-sorter/index.md), [Falsifiable Hypothesis Sorter](../../sims/falsifiable-hypothesis-sorter/index.md) |
| Judges and spotters | Decide whether something is acceptable, and why | [Citation Verification Judge](../../sims/citation-verification-judge/index.md), [Agent Permission Boundary Judge](../../sims/agent-permission-boundary-judge/index.md), [Sycophancy Spotter](../../sims/sycophancy-spotter/index.md) |
| Calculators | Change inputs and watch a budget or load respond | [Context Window Budget Calculator](../../sims/context-window-budget-calculator/index.md), [Orchestrator Review Load Calculator](../../sims/orchestrator-review-load-calculator/index.md) |
| Explorers | Adjust a parameter and observe a model's behavior | [Temperature Next-Token Explorer](../../sims/temperature-next-token-explorer/index.md), [Search Precision and Recall Explorer](../../sims/search-precision-recall-explorer/index.md) |
| Builders and steppers | Assemble a plan or step through a process | [Research Task Decomposition Builder](../../sims/research-task-decomposition-builder/index.md), [Agent Loop Stepper](../../sims/agent-loop-stepper/index.md) |
| Graphs | Explore connected entities | [Learning Graph Viewer](../../sims/graph-viewer/index.md), [Citation Chaining Explorer](../../sims/citation-chaining-explorer/index.md), [Personal Knowledge Graph Query Explorer](../../sims/pkg-graph-query-explorer/index.md) |

The MicroSims are built with four JavaScript libraries. 41 use **p5.js**, a library for interactive drawings with sliders and buttons. 7 use **vis-network**, a library for network diagrams. One uses **Chart.js** for charts ([Projecting AI Task Completion to 2030](../../sims/projecting-ai/index.md)) and one uses **Mermaid** for flow diagrams ([Research Workflow Handoffs](../../sims/research-workflow-handoffs/index.md)). You don't need to know any of these libraries to use the MicroSims in class.

### Lesson Plans

Each MicroSim's own page (reach it from the MicroSims list) has a **Lesson Plan** section with a learning objective, the Bloom's Taxonomy level it targets, the intended audience, a suggested duration, prerequisites, activities, and an assessment. Most of the lesson plans that state a Bloom level target Analyze or Evaluate, the levels the quizzes cover least.

### Tips for Using MicroSims in Class

1. **Ask for predictions first.** Before revealing an answer, have students commit to theirs and say why. The explanations are more useful to a student who has just been wrong.
2. **Argue the hard items.** In the judge and sorter MicroSims, some items are deliberately borderline. Pause on an item the class splits on and have each side make its case before you reveal the answer.
3. **Connect to the student's own work.** After a MicroSim, ask students to find one example of the same judgment in their own research.
4. **Let students explore on their own.** After a demonstration, give students five to ten minutes on their own devices. Use the MicroSim's restart control, or reload the page, to run it again.
5. **Plan for an internet connection.** MicroSims load from the published website. If your room has unreliable internet, build a local copy of the site (see [Customizing Your Own Copy](#customizing-your-own-copy)).

!!! tip "Embed MicroSims in Your LMS or Course Page"
    You can add any MicroSim to any web page you control, such as a Canvas or Moodle page, a Google Site, or a plain HTML file, by pasting one iframe:

    ```html
    <iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/YOUR-MICROSIM-NAME/main.html"
        width="100%" height="600px" scrolling="no">
    </iframe>
    ```

    Replace `YOUR-MICROSIM-NAME` with the folder name of any MicroSim from the [MicroSims list](../../sims/index.md), such as `citation-verification-judge`. MicroSims differ in height, so copy the exact code from the **Iframe Embed Code** section on the MicroSim's own page.

## Using the Infographic Posters

The [Posters](../../posters/index.md) section has 25 full-width interactive infographics. Most set a risky way of working beside a controlled one, so the difference is visible at a glance: "The Real Citation and the Fluent Fake", "Verified Is Not Validated", "Where Does Your Data Go?". Students hover over or click a region to read what it shows, then switch to **Quiz** mode to test themselves.

Posters work well as the first slide of a class, as a prompt for a five-minute discussion, or as a review before a quiz. Several posters, such as "Meet Your Agent Team" and "Five Personal Agents, Side by Side", summarize material from the appendices.

## Using the Slide Decks

The [Slides](../../slides/index.md) section has two decks built with MARP, a tool that turns Markdown files into presentations:

- **Overview (Static)** is a 20-slide tour of the whole book: the orchestrator idea, the five parts, and the key takeaways of all 20 chapters. Use it on the first day of class.
- **Overview (MicroSims)** is a talk on AI for research productivity that embeds live MicroSims and posters. Use it to introduce the course to a department or a lab group.

## Using the Glossary

The [Glossary](../../glossary.md) defines all 379 concepts in the learning graph, one term per concept, in alphabetical order. Definitions follow the ISO 11179 standard for good definitions: precise, concise, distinct from one another, and never circular. Every entry includes a short example, and most include "See also" links to related terms.

Students can find a term by clicking **Glossary** in the left navigation and using the browser's find command (Ctrl+F on Windows and Linux, Cmd+F on Mac), or by using the search bar at the top of any page.

Ways to use the glossary in class:

- **Vocabulary preview.** Before a chapter, have students read the glossary entries for the concepts in its Concepts Covered table.
- **Definitions in their own words.** After a chapter, have students write their own definitions and compare them with the glossary. Differences often expose a misunderstanding.
- **Shared language for a lab.** Research groups adopting agents often use the same words for different things. The glossary gives the group a common vocabulary for terms such as *subagent*, *skill*, and *approval gate*.

## Using the Quizzes

### How the Quizzes Work

Each chapter has a quiz page with 10 multiple-choice questions, 200 in all. Students open a quiz from the **Quiz** link under each chapter in the left navigation. Each question has a collapsible **Show Answer** block that reveals the correct answer, an explanation of the choices, the concept being tested, and a link back to the section of the chapter that teaches it.

The quizzes are self-check tools. They are not graded automatically and do not record scores. Use them for formative assessment, meaning feedback during learning, rather than for grades.

Ways to use the quizzes:

- **Exit ticket.** Use a few questions at the end of class as a quick check for understanding.
- **Diagnostic.** Give the quiz before the chapter to find out what students already know.
- **Re-teaching guide.** The "See" link in each answer points to the section to revisit.
- **Question bank.** All 200 questions are also in one machine-readable file, [quiz-bank.json](../quiz-bank.json), which is a convenient starting point for building your own exams or importing questions into your learning management system. The questions are openly licensed (see [Understanding the License](#understanding-the-license)).

### Bloom's Taxonomy Levels

**Bloom's Taxonomy** is a framework that classifies thinking skills from simple to complex. The 2001 revision, which this book uses, has six levels:

| Level | Name | What It Means | Example Verbs |
|-------|------|---------------|---------------|
| L1 | Remember | Recall facts and definitions | Define, list, name |
| L2 | Understand | Explain ideas in your own words | Explain, describe, summarize |
| L3 | Apply | Use a procedure in a new situation | Calculate, write, use |
| L4 | Analyze | Break material into parts and see how they relate | Distinguish, compare, trace |
| L5 | Evaluate | Make judgments against criteria | Verify, judge, critique |
| L6 | Create | Put parts together into something new | Design, build, develop |

The [quiz generation report](../quiz-generation-report.md) shows the quiz questions spread across the first four levels: 31.5% Remember, 31.5% Understand, 27% Apply, and 10% Analyze. The higher levels are assessed elsewhere. The judge MicroSims target Evaluate, and the capstone project targets Create. A complete assessment plan uses all three: quizzes for vocabulary and mechanics, MicroSims for judgment, and the capstone for synthesis.

## Using the Annotated References

Each chapter has an **Annotated References** page with 10 curated sources, 200 in all. Each entry gives the title, a link where one exists, and a short note on why the source is useful and how it connects to the chapter. The sources mix Wikipedia articles (stable and accessible), textbooks known for clear explanations, foundational research papers on arXiv, and official documentation from AI tool vendors.

### A Note About Link Rot

**Link rot** is when a web link stops working because the page has been moved, renamed, or deleted. Wikipedia and arXiv links are very stable. Vendor documentation is not: AI companies reorganize their documentation sites often. If you or your students find a broken link:

1. Search for the article title on the source website.
2. Look for an archived copy on the [Wayback Machine](https://web.archive.org/).
3. Report the broken link (see [Feedback](#feedback)).

## Using the Appendices

The [Appendices](../../appendices/index.md) hold reference material that supports several chapters:

- **[Agent Personas](../../appendices/agent-personas/index.md)** describes seven sample agents a researcher might direct, from Ada the chief of staff to specialists for grant writing, budgets, and conferences. Use them as models when students write the team design for their capstone.
- **[Personal Agent Software](../../appendices/personal-agent-software/index.md)** collects research notes on the always-on personal agents surveyed in Chapter 19.
- **[Agent Email](../../appendices/agent-email.md)** collects research notes on whether personal agents can have their own email address or text-messaging channel.
- **[Personal Knowledge Graphs](../../appendices/pkg/index.md)** summarizes the author's earlier research on personal knowledge graphs and on integrating them into an organization, background for Chapters 6 and 19.

The two personal-agent appendices are dated research notes, built mostly from vendor announcements and press coverage rather than independent tests. Present them to students that way.

!!! warning "Check Chapter 19 Before You Teach It"
    Personal agent products change monthly. Chapter 19 teaches durable criteria for choosing and supervising any personal agent: where it runs, what it can reach, how approvals work, what it costs, and what happens to research data. The product details are a snapshot. Before teaching the chapter, check the current state of each product and tell students which details have changed.

## The Capstone Project

The capstone, described in [Chapter 20](../../chapters/20-case-studies-capstone/index.md#the-capstone-project), asks each student to plan and run a real research task from their own work with a coordinated team of agents, then present the verified results with an honest account of where human judgment was needed. Its eight deliverables are a question with acceptance criteria, a version-controlled project with memory, a team design, at least one tested skill, verified results, a reproducibility package, a responsible-use statement, and an account of judgment.

Chapter 20 includes a rubric with seven criteria and leaves the weights to you. Three suggestions from teaching this kind of project:

- **Keep the task small.** A good capstone task is one the student could finish by hand in about a week. The point is the process, not the size of the result.
- **Stage it across the term.** Each deliverable maps to earlier chapters. The milestones in the [pacing table](#suggested-pacing) let students build the capstone one piece at a time instead of all at the end.
- **Require a rejected output.** Ask each student to show at least one agent output they rejected and explain why. It is the most direct evidence that the student is judging the work rather than accepting it.

### A Sample Skill-Creation Prompt

[Sample Skill Creation Prompt](./sample-skill-prompt.md) shows a prompt the author used to have an agent build a skill that produces an arXiv paper as LaTeX source with a PDF build process. The prompt points the agent at sample papers, tells it to keep asking clarifying questions until it has enough material, and asks it to create a 1-to-100 scoring rubric for judging whether a paper is ready. Show it alongside [Chapter 7](../../chapters/07-designing-testing-skills/index.md), then have students write a prompt of the same shape for a repeatable task from their own research.

## The Learning Graph

### What Is a Learning Graph?

A **learning graph** is a map of how the concepts in a book depend on each other. It is a **directed acyclic graph (DAG)**: a network in which each arrow points from a concept to a concept it depends on, and in which no chain of arrows ever loops back to where it started. This book's graph has 379 concepts, 670 dependencies, and 17 taxonomy categories, such as Prompting and Context Engineering, Agent Skills, and Verification and Reproducibility.

The [Learning Graph Viewer](../../sims/graph-viewer/index.md) shows the whole graph. You can search for a concept, filter by category, and see how each concept connects to the others. The [Learning Graph introduction](../index.md) explains how the graph was built from the course description.

### How Instructors Can Use the Learning Graph

- **Check prerequisites.** Before teaching a concept, confirm that students have covered the concepts it depends on.
- **Diagnose gaps.** When a student struggles with a concept, follow its dependencies back to find the missing foundation.
- **Map your curriculum.** Compare the [concept list](../concept-list.md) with your existing syllabus to find what each covers that the other does not.
- **Reorder with care.** If you teach chapters in a different order, use the graph to check that you haven't moved a concept ahead of one of its prerequisites.

## Volt: The Book's Pedagogical Agent

### What Is a Pedagogical Agent?

A **pedagogical agent** is a character that appears throughout a textbook to guide students. Research on pedagogical agents finds that a well-used character can raise student engagement and students' sense of how much they learned, an effect known as the **persona effect**.

This book's agent is **Volt**, a black-and-white Border Collie with a maroon bandana and a gold whistle. Border Collies herd, and Volt treats AI agents the same way: as a flock to be directed and checked, never trusted blindly. Volt is patient, precise, curious, and dry-witted, and often closes with a concrete question such as "How would you check that?" Volt has no gender; the book refers to Volt by name or as *they*.

### How Volt Appears

Volt appears in colored callout boxes, called **admonitions**, inside the chapters. There are seven kinds:

| Kind | Color | Purpose | How often |
|------|-------|---------|-----------|
| Welcome | Maroon | Tells students why the chapter matters | Once, at the start of every chapter |
| Thinking | Gold | Highlights a key idea or mental model | 1 to 4 per chapter |
| Tip | Teal | Shares a practical shortcut | Where the material calls for one |
| Warning | Red | Flags a common mistake | Where the material calls for one |
| Encourage | Blue | Supports students on a hard passage | Where students may struggle |
| Celebration | Purple | Marks what students can now do | At most once, at the end of a chapter |
| Neutral | Gray | A general aside | Rarely |

The number of Volt admonitions in a chapter scales with the number of concepts it covers, and two admonitions never appear back to back. Each one carries a message the surrounding text does not, so none of them are decorative. The [Mascot Rendering Test](../mascot-test.md) page shows every kind.

This instructor's guide and other instructor-facing pages do not use Volt.

### Tips for Instructors

- **Use the thinking admonitions as discussion prompts.** They mark the ideas the chapter considers most important.
- **Point students to the warning admonitions before assignments.** They name the mistakes students are most likely to make.
- **Use "Trust, but verify!" as a class norm.** When a student reports an AI result, ask Volt's question: "Who checked the output?"

## Feedback

### Reporting Problems and Suggestions

This book is an open-source project hosted on **GitHub**, a website where software and writing projects are developed in the open. You don't need to know programming to report a problem.

A **GitHub Issue** is like a support ticket: a numbered, public report of a problem or a suggestion that the author and others can discuss. To submit one:

1. Go to the book's repository at [github.com/dmccreary/ai-for-ee-research](https://github.com/dmccreary/ai-for-ee-research).
2. Click the **Issues** tab, then the green **New issue** button.
3. Give the issue a clear title, such as "Broken link in Chapter 11 references" or "Suggestion: MicroSim for parameter sweeps".
4. In the description, say which page has the problem, what you expected to see, what you saw instead, and your browser and device if they matter.
5. Click **Submit new issue**.

You need a free GitHub account to submit an issue. If you would rather not create one, use the [Contact](../../contact.md) page.

Feedback that helps most:

- **Errors.** Factual mistakes, typos, and broken formatting
- **Broken links**
- **MicroSim bugs.** Simulations that don't load or that behave unexpectedly
- **Outdated tool details.** AI products change quickly, and reports of what has changed are especially welcome
- **Accessibility problems.** Content that is hard to read or navigate for students with disabilities
- **Teaching reports.** What worked and what didn't when you taught a chapter

## Understanding the License

### What Is a Creative Commons License?

A **license** is a legal document that says what others may do with a work. A **Creative Commons (CC) license** is a standard, widely used license for educational and creative work that states those permissions in plain terms.

### This Textbook's License

This textbook uses the **CC BY-NC-SA 4.0** license:

| Code | Full Name | What It Means |
|------|-----------|---------------|
| **CC** | Creative Commons | A standard open license |
| **BY** | Attribution | You must credit the original author |
| **NC** | NonCommercial | You may not use the material for commercial purposes |
| **SA** | ShareAlike | If you adapt the material, you must share your version under the same license |
| **4.0** | Version 4.0 | The current version of the license |

### What You Can Do

- **Copy** the whole book or individual chapters for your students
- **Share** the book with colleagues, students, and lab members
- **Print** chapters for classroom use
- **Adapt** the content: add your own examples, remove sections, or reorder chapters
- **Translate** the content into other languages
- **Build a derivative course**, such as a version focused on your own subfield

### What You Cannot Do

- **Sell** the book or charge students for access to it
- **Remove the attribution** to the original author, Dan McCreary
- **Change the license** of a version you adapt and share: it must stay CC BY-NC-SA 4.0
- **Present it as your own work**

For the full terms, see the [License](../../license.md) page. Commercial rights are reserved by the author; the License page explains how to ask about commercial use.

## Customizing Your Own Copy

You can publish your own version of the book, for example with examples from your subfield, a different chapter order, or your institution's AI-use policy added. This section walks through the steps.

### Key Technical Terms

- **Repository (repo).** A folder on GitHub that holds all of a project's files and their history.
- **Git.** A version-control tool that tracks every change to a set of files. Chapter 5 of this book teaches it.
- **Fork.** A complete copy of someone else's repository in your own GitHub account.
- **Clone.** A complete copy of a repository on your own computer.
- **Markdown.** A plain-text formatting language. `**bold**` makes **bold**, `# Heading` makes a heading, and `-` starts a bullet point. Every page of this book is a Markdown file.
- **MkDocs.** The program that turns the book's Markdown files into a website. The book uses the **Material for MkDocs** theme.
- **mkdocs.yml.** The main configuration file for the website. It sets the title, the navigation menu, and which features are on.

### Step 1: Fork or Clone the Repository

If you don't have a GitHub account, create a free one at [github.com](https://github.com).

**Option A: Fork (stays on GitHub).** Go to [github.com/dmccreary/ai-for-ee-research](https://github.com/dmccreary/ai-for-ee-research) and click **Fork** in the upper-right corner. This puts a copy in your account that you can edit in the browser.

**Option B: Clone (works on your computer).** Install Git from [git-scm.com](https://git-scm.com/), open a terminal, and run:

```bash
git clone https://github.com/dmccreary/ai-for-ee-research.git
```

### Step 2: Make Your Changes

All content is in the `docs/` folder as Markdown (`.md`) files, which you can edit in any text editor. Chapters are in `docs/chapters/`, one folder per chapter. MicroSims are in `docs/sims/`, one folder per MicroSim.

If you use an AI agent to help edit, have it read `AGENTS.md` and `CONTENT-GENERATION-GUIDE.md` in the repository first. They hold the rules the book was written to, including the formatting rules that keep pages from breaking.

**Title and author.** Edit these lines near the top of `mkdocs.yml`:

```yaml
site_name: 'Your Course Title'
site_description: 'Your description here'
site_author: 'Your Name'
site_url: 'https://YOUR-USERNAME.github.io/ai-for-ee-research/'
```

**Colors.** The book uses University of Minnesota maroon and gold. Material for MkDocs has no built-in maroon or gold, so `mkdocs.yml` sets the palette to `custom` and the actual colors live at the top of `docs/css/extra.css`:

```css
[data-md-color-primary="custom"] {
  --md-primary-fg-color:        #7A0019;   /* change to your primary color */
  --md-primary-fg-color--light: #9E2A3F;
  --md-primary-fg-color--dark:  #5B0013;
}
```

The accent color is set in the same block, and Volt's callout colors are in `docs/css/mascot.css`.

**Logo.** The header logo is Volt's neutral pose, set by `logo: img/mascot/neutral.png` in the `theme:` section of `mkdocs.yml`. Point it at your own image, about 128 by 128 pixels in PNG format.

**Navigation.** The left-hand menu is the `nav:` section of `mkdocs.yml`. A page that is not listed there does not appear in the menu.

### Step 3: Preview Your Changes

1. Install Python 3.8 or newer from [python.org](https://www.python.org/).
2. Install MkDocs and the Material theme:

    ```bash
    pip install mkdocs mkdocs-material
    ```

3. In the project folder, start the preview server:

    ```bash
    mkdocs serve
    ```

4. Open `http://127.0.0.1:8000/ai-for-ee-research/` in your browser.

The preview server watches for changes. When you save a Markdown file, the page refreshes in the browser. A local preview also serves the MicroSims, which is useful in a room with unreliable internet.

### Step 4: Publish Your Version

To publish your version as a free website on GitHub Pages, run:

```bash
mkdocs gh-deploy
```

This builds the site and publishes it at `https://YOUR-USERNAME.github.io/ai-for-ee-research/`. It usually takes a minute or two to appear.

## Analytics and Learning Records

### Web Analytics

**Web analytics** measures how visitors use a website: which pages they visit, how long they stay, and where they come from. For a course, it shows which chapters students actually read and which MicroSims they open.

The published book does not currently include web analytics. To add **Google Analytics**, Google's free analytics service, to your own copy:

1. Sign in at [analytics.google.com](https://analytics.google.com/) and create a new **property**, Google's term for a tracked website.
2. Copy the **Measurement ID** Google gives you. It looks like `G-XXXXXXXXXX`.
3. At the bottom of `mkdocs.yml`, uncomment the analytics block and add your ID:

    ```yaml
    extra:
      analytics:
        provider: google
        property: G-XXXXXXXXXX
    ```

4. Rebuild and publish the site. Data usually starts to appear within a day or two.

What you can learn from it:

- **Which chapters and MicroSims get the most and least use**, which shows where students may be skipping content
- **Time on page**, where a long time can mean engagement or confusion
- **Devices**, such as how many students read on phones
- **Site searches**, which show the terms students look for

### xAPI Learning Records

**xAPI** (the Experience API, also called Tin Can) is a standard format for recording specific learning activities, not just page views. An xAPI record is a short statement of the form *actor, verb, object*, such as "a learner answered item 3 of the Prompt Component Sorter correctly". A **Learning Record Store (LRS)** is a database that collects and stores these statements.

47 of this book's 50 MicroSims are instrumented to produce xAPI statements. By default each MicroSim produces one compact summary statement per session rather than a statement for every click. As published, the book is not connected to an LRS, so the statements are built in the student's browser and go nowhere else. Connecting an LRS is a step for a technical team, and the settings for the whole book live in `docs/js/lrs-config.js`.

You can see what a MicroSim records without any of that setup. Add `?xapi=teaching` to the end of a MicroSim's address, for example:

```
https://dmccreary.github.io/ai-for-ee-research/sims/prompt-component-sorter/?xapi=teaching
```

The MicroSim then shows a panel with each statement as it is produced. This makes a good live demonstration for Chapter 18's discussion of what data tools collect about their users.

### Privacy and Regulatory Considerations

Before collecting learning data that identifies individual students, check the rules that apply to you:

- **FERPA** (Family Educational Rights and Privacy Act) is the U.S. federal law that protects student education records. It applies to graduate students as well as undergraduates.
- **GDPR** (General Data Protection Regulation) is the European Union's data-protection law. It applies if any of your students are in the EU.
- **State and institutional rules.** Many U.S. states and most universities add their own student-privacy requirements.
- **Research ethics review.** If you plan to publish findings based on your students' learning data, you will usually need approval from your Institutional Review Board (IRB) before you collect it.

The safest default is aggregate, anonymous measurement: Google Analytics counts page views, not named students. If you want records for individual students through xAPI, talk to your institution's data privacy officer first.

### Building a Progress Dashboard

With an LRS connected, it becomes possible to build a dashboard of student progress: which chapters each student has completed, MicroSim results over time, and which concepts need re-teaching. Building one takes programming and careful attention to privacy, and it is beyond the scope of this guide. Because the book and its learning graph are open, all the data structures needed for such a dashboard are available to build on.
