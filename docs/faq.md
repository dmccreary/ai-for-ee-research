---
title: Frequently Asked Questions
description: Frequently asked questions about AI for EE Research, organized by category and linked to the chapters that answer them.
category_count: 6
question_count: 96
---

# AI for EE Research FAQ

This FAQ answers the questions readers ask most often about the book, its ideas, and how to apply them. Answers link to the chapters, MicroSims, and glossary entries where each topic is developed.

## Getting Started Questions

### What is this book about?

This book is a hands-on guide to using AI tools and agents for the everyday tasks of research in electrical engineering and computer design: literature search, data analysis, brainstorming, coding, and manuscript preparation. Its central idea is a change of role. Instead of doing every task by hand, you become an **orchestrator** who directs a team of agents, checks what they produce, and stays accountable for the science. The book is practical rather than theoretical, and it works from case studies of real work, including an arXiv paper and an intelligent textbook. See the [course description](course-description.md) and [Chapter 1](chapters/01-research-workflows-orchestrator/index.md) for the full picture. For example, instead of running a search by hand, you might direct an agent to propose a search strategy, then verify every citation it returns yourself.

### Who is this book for?

The book is written for graduate students (MS and PhD), postdoctoral researchers, faculty, and practicing engineers in electrical engineering, computer engineering, and computer design. You need graduate standing or equivalent research experience, but you do not need a background in machine learning or prompt engineering. The only ingredients assumed are curiosity and the habit of checking your results. Instructors can also use the book as the text for a course, because every chapter has a quiz and annotated references. The [about page](about.md) describes the audience and the design of the book in more detail.

### What do I need to know before starting?

The course description lists four prerequisites: graduate standing or equivalent research experience, working knowledge of at least one programming language (preferably Python), basic comfort with a command line, a text editor, and Git, and experience writing a technical paper or report. No prior machine learning, prompt engineering, or agent experience is required. If Git is new to you, [Chapter 5](chapters/05-markdown-and-version-control/index.md) introduces commits and branches, and the [glossary](glossary.md) defines terms as they appear. For example, if you can run a Python script from a terminal and commit a file to Git, you are ready for Chapter 1.

### What will I be able to do after finishing the book?

The learning outcomes span all six levels of Bloom's Taxonomy. You will be able to define key terms such as token and context window, explain why fluent output can be false, write a project instruction file, run a literature search that ends in verified citations, have an agent write and debug an analysis script, create a reusable agent skill, and generate an interactive simulation. At the higher levels you will verify results against independent checks, decide when to disclose AI use, and design a team of planning and execution agents. The capstone ties these together. The full list is in the [course description](course-description.md).

### How is the book organized?

The 20 chapters build from foundations to application to trust. Chapters 1 to 4 cover research workflows, how language models work, model choice, and context engineering. Chapters 5 to 7 cover Markdown, version control, knowledge bases, and agent skills. Chapters 8 to 10 cover agents, supervision, and orchestration. Chapters 11 to 16 apply these to literature, data, code, brainstorming, manuscripts, and communication. Chapters 17 to 20 cover verification, responsible use, always-on personal agents, and the capstone. Each concept is introduced after the concepts it depends on. Start at the [chapter list](chapters/index.md). For example, if your immediate need is a manuscript, read Chapters 1 to 4 for the vocabulary and then jump to Chapter 15.

### Do I have to read the chapters in order?

Reading in order is the safest path, because the learning graph arranges the 379 concepts so that each one comes after the concepts it depends on. Chapters 1 to 10 are the foundation, and the later chapters assume them. If you have a specific need, you can jump ahead: Chapter 11 for literature search, Chapter 12 for data analysis, or Chapter 15 for manuscripts. Each chapter lists its prerequisites near the top, so you can see what to read first. The [glossary](glossary.md) helps when you meet a term you have not seen yet.

### What is a MicroSim?

A **MicroSim** is a small, single-concept, embeddable interactive simulation, usually written with p5.js and built-in controls such as sliders and buttons. This book includes dozens of them, from a context-window budget calculator to a critical-path explorer. They let you move a parameter and watch the dependence change, which a static figure cannot show. Chapter 16 explains how to specify one and have an agent build it. Browse the [MicroSim index](sims/index.md) or read [Chapter 16](chapters/16-microsims-communication/index.md).

### Does each chapter have a quiz and references?

Yes. Every one of the 20 chapters has a self-check quiz and an annotated reference list. The quizzes use multiple-choice questions spread across the levels of Bloom's Taxonomy, and the references are curated rather than exhaustive. Both are linked under each chapter in the left-hand navigation, next to the chapter content. Use the quiz after reading a chapter to find the concepts you should revisit. The [chapter list](chapters/index.md) links to all of them.

### Who is Volt, and why does the mascot appear?

Volt is a Border Collie who serves as the book's learning mascot, rounding up the key ideas. Volt appears in short callout boxes at points where a welcome, a tip, a warning, or a moment of encouragement helps, and in a celebration box at the end of each chapter. The mascot never replaces the content. Volt's recurring message is a short one: agents can do a great deal of your research legwork, but you stay accountable for the science, so trust but verify. You meet Volt on the [home page](index.md) and in [Chapter 1](chapters/01-research-workflows-orchestrator/index.md).

### What topics does the book deliberately not cover?

The scope is deliberately about using AI in research, not building it. The course description excludes training or fine-tuning language models, machine learning theory and neural network mathematics, AI hardware and accelerator design, vendor-specific EDA flows, and domain EE theory such as circuit analysis or device physics, which readers bring with them. It also excludes legal advice on copyright and data protection, benchmark rankings of commercial AI products, and any use of AI that replaces the researcher's judgment, authorship, or accountability. See the "Topics Not Covered" list in the [course description](course-description.md).

### Do I need to buy a particular AI product to follow along?

No. The book teaches durable practices rather than a single product, because products change faster than a book can. The techniques work with a chat interface, a hosted API, a command-line coding agent, or a local open-weight model. [Chapter 3](chapters/03-models-and-prompt-basics/index.md) shows how to choose among them for a stated scenario, and [Chapter 19](chapters/19-always-on-personal-agents/index.md) deliberately teaches criteria that outlast product names. Where particular products are discussed, the book labels their claims as vendor-stated and untested by independent parties.

### Where can I find definitions of unfamiliar terms?

The [glossary](glossary.md) defines all 379 concepts in the learning graph. Each entry has a precise definition, an example from research practice, and cross-references to related terms. The definitions follow ISO 11179 style: concise, precise, and non-circular. Every chapter also begins with a list of the concepts it covers, so you can scan the vocabulary before reading. If a term in a quiz or chapter is unfamiliar, look it up in the glossary first.

## Core Concept Questions

### What are the five everyday research tasks the book targets?

The book targets literature search, data analysis, brainstorming, scientific coding, and manuscript preparation. Chapter 1 shows them as stages of a pipeline, and the pipeline is only as trustworthy as its weakest stage. A fast literature search does not help if the data analysis hides errors, and a polished manuscript does not rescue an unverified result. Chapters 11 to 15 take the tasks one at a time. Chapter 1 also explains where each task is a good candidate for AI help and where the researcher's direct judgment is still required. Start with [Chapter 1](chapters/01-research-workflows-orchestrator/index.md).

### What does it mean to be the researcher as orchestrator?

It means your role shifts from performing every task personally to directing a team of agents, supplying domain judgment, resolving conflicts between their results, and deciding what is true. You set the question and the acceptance criteria, you place review points where errors would be costly, and you remain accountable for the science. The agents supply speed and volume. The orchestrator idea is the thread running from [Chapter 1](chapters/01-research-workflows-orchestrator/index.md) through the team design of [Chapter 10](chapters/10-orchestrating-agent-teams/index.md) and the capstone.

### What is the difference between an AI assistant and an AI agent?

An **assistant** answers a request and stops, and you act on the answer. An **agent** adds tools and a loop: it decides on an action, calls a tool, observes the result, and repeats until it judges the task done. The loop is the key difference, because the agent takes actions you did not individually approve, and early errors can compound across steps. That is why agents need permissions, logs, and review points that a chat assistant does not. For example, an assistant can suggest a script, while an agent can write the script, run it, read the traceback, and fix it. See [Chapter 1](chapters/01-research-workflows-orchestrator/index.md) and [Chapter 8](chapters/08-agents-tool-use-subagents/index.md).

### What is a large language model, and how does it differ from generative AI in general?

**Generative AI** is the broad category of systems that produce new text, images, code, or other content. A **large language model** is the kind of generative AI that works on text: it turns a prompt into a completion one token at a time. Chapter 1 presents a chain: generative AI contains language models, an assistant wraps a model in an interface, and an agent adds tools and a loop to an assistant. A model optimizes plausibility rather than truth, which is why its output has to be treated as a hypothesis until checked. See [Chapter 1](chapters/01-research-workflows-orchestrator/index.md) and [Chapter 2](chapters/02-how-language-models-work/index.md).

### Why can a language model produce fluent but false statements?

A model is trained to continue text plausibly, and plausibility is not truth. Its training data is broad but not authoritative, and it ends at a knowledge cutoff, so the model can only produce what looks like a likely continuation of your prompt. When it lacks the facts, it still produces fluent text, and that is what a **hallucination** is. Fabricated citations are the model working as designed. The defense is a lookup that you run yourself, not another request to the same model. For example, a citation with a believable author list and journal can still not exist. See [Chapter 2](chapters/02-how-language-models-work/index.md).

### What is a token, and why does it matter to a researcher?

A **token** is the unit of text a model reads and writes, roughly a word or a piece of a word. Tokens matter because they are the unit of both billing and capacity. Every prompt and completion is counted in tokens, which sets the cost of a batch and fills the context window. Technical text costs more tokens per word than ordinary prose, because equations, identifiers, and units split into many pieces. Estimating the token count before running a large job avoids surprises. The [context window budget calculator](sims/context-window-budget-calculator/index.md) lets you try this. See [Chapter 2](chapters/02-how-language-models-work/index.md).

### What is a context window?

The **context window** is the maximum number of tokens a model can consider at once, shared between everything sent in and everything generated back. It holds the system prompt, the conversation history, attached files, tool output, and the completion itself. When a task exceeds it, older material may be dropped, and the overflow can be silent. Everything the model uses must be present in the window, because the model does not remember anything from outside it. Long research tasks therefore need selection, summarization, or splitting. See [Chapter 2](chapters/02-how-language-models-work/index.md) and [Chapter 4](chapters/04-context-engineering-prompting/index.md).

### What is context engineering, and how is it different from prompt engineering?

**Prompt engineering** is writing a good request. **Context engineering** is deciding everything the model sees: the task specification, selected documents, defined domain vocabulary, examples, constraints, and the results of earlier steps. For research tasks, reliability comes less from clever wording than from complete specification, grounded context, checks between steps, and prompts that are tested and versioned. For example, defining what "resolution" means in your measurement setup prevents a silent misreading. [Chapter 3](chapters/03-models-and-prompt-basics/index.md) introduces prompting and [Chapter 4](chapters/04-context-engineering-prompting/index.md) builds the larger discipline.

### What is an agent skill?

An **agent skill** is a directory built around a file named SKILL.md. The file has a name, a description that drives when the skill triggers, instructions, and supporting files such as scripts and reference documents that load only when needed. A skill packages one repeatable task so it is done the same way each time. A skill is worth the effort when the task recurs and the result can be checked. For example, a skill could turn a monthly literature scan into one command. See [Chapter 6](chapters/06-knowledge-bases-skill-anatomy/index.md) for the anatomy and [Chapter 7](chapters/07-designing-testing-skills/index.md) for design and testing.

### Why does the book use Markdown and project instruction files?

Plain text is readable by agents and humans, comparable line by line, searchable, and durable, and **Markdown** adds just enough structure with headings, lists, tables, and code blocks. A **project instruction file** such as AGENTS.md or CLAUDE.md states the project's goals, conventions, and constraints, so an agent reads them before it works. Keeping this knowledge in files under version control means an agent has memory, boundaries, and a means of recovery. An agent is only as reliable as the project it works in. See [Chapter 5](chapters/05-markdown-and-version-control/index.md).

### What is a planning agent, and what is an execution agent?

A **planning agent** explores, decomposes problems, reads literature, and drafts specifications and plans. An **execution agent** carries out a plan: it writes code, runs analyses, builds simulations, and prepares figures and manuscripts. The split matters because plans are cheap to discard, while executions are expensive to check. Making the plan a readable handoff lets you catch a defect before any execution cost is paid. The book's design target is about 20 planning agents and 10 execution agents per researcher. See [Chapter 9](chapters/09-supervising-agents-roles/index.md) and [Chapter 10](chapters/10-orchestrating-agent-teams/index.md). For example, a planning agent drafts three ways to test a hypothesis, and you pick one before an execution agent writes the script.

### Why does the book say 20 planning agents and 10 execution agents?

The ratio reflects the fact that plans are cheap to discard and executions are expensive to check, so you want many exploratory plans for each execution you commit to. Chapter 10 treats 20 to 10 as a design target, not a law. The number of agents is the least important parameter, because dependencies, review cost, and the quality of handoffs set what a team can deliver. Your own attention is the real limit: review load grows with team size, and you should stop adding agents when they add more review than they remove work. See [Chapter 10](chapters/10-orchestrating-agent-teams/index.md).

### What is a personal knowledge graph?

A **personal knowledge graph** represents one researcher's notes, papers, experiments, people, and projects as entities joined by typed, directed relationships, governed by a small schema. Unlike a folder of files, it can answer multi-hop questions, such as which papers support the claim behind a given experiment, by following relationships rather than matching text similarity. An agent can build it through entity extraction, but the extracted links must be reviewed. It can also ground an agent's answers as memory that you own. See [Chapter 6](chapters/06-knowledge-bases-skill-anatomy/index.md) and the [appendix on personal knowledge graphs](appendices/pkg/index.md).

### What is the difference between verification and validation?

**Verification** asks whether the work was done right: does the code compute what it was meant to compute, and does the citation exist? **Validation** asks whether it was the right work: does the model or result represent the real situation? Both can fail independently, so a correct implementation of the wrong model passes verification and fails validation. Chapter 17 argues that verification is not a stage at the end but a set of independent checks, records, and habits throughout. See [Chapter 17](chapters/17-verification-reproducibility/index.md). For example, a correct filter implementation that models the wrong sensor passes verification and fails validation.

### What is human in the loop, and where should the human review?

**Human in the loop** means a person reviews or approves an agent's work at defined points. Chapter 1 puts review where an action is irreversible, leaves your control, or becomes a reported result. Examples include deleting data, sending an email, spending money, or putting a number into a draft. Reviewing everything defeats the purpose of delegation, and reviewing nothing removes accountability. The skill is placing a small number of approval gates where they prevent the most damage. See [Chapter 1](chapters/01-research-workflows-orchestrator/index.md) and [Chapter 10](chapters/10-orchestrating-agent-teams/index.md).

### What is the Model Context Protocol (MCP)?

The **Model Context Protocol** is a standard way to connect an agent to external systems such as databases, research data sources, and APIs through servers that expose tools. Instead of building a custom integration for each system, you connect an MCP server and the agent can call its tools. Because these tools reach real systems, the book recommends least-privilege credentials, so a server that only needs to read a database is not given write access. See [Chapter 8](chapters/08-agents-tool-use-subagents/index.md). For example, a database server might expose a read-only query tool, so the agent can look up measurements but cannot change them.

### What is an always-on personal agent?

An **always-on personal agent** keeps its own cloud computer or runs on your own host, signs in to tools on your behalf, remembers context across sessions, and works while you are away. It differs from a session-based assistant in standing access and unattended work. Chapter 19 surveys Grok Bot, Dots, Muse, Claude Cowork, OpenClaw, and Hermes Agent, but its emphasis is on criteria that outlast the products. The three risks that most distinguish the class are blast radius, usage metering, and data exposure. See [Chapter 19](chapters/19-always-on-personal-agents/index.md) and [the software appendix](appendices/personal-agent-software/index.md).

### Why does the book insist that AI is not an author?

Authorship requires accountability, and a model cannot take responsibility for a claim, answer a reviewer, or correct the record. Chapter 15 therefore treats AI as a tool whose use is disclosed, not as a co-author. Chapter 18 adds that disclosure follows venue and institutional policy, and that a log kept as you work makes the statement accurate. The humans on the paper remain answerable for every number, citation, and figure. See [Chapter 15](chapters/15-manuscript-preparation/index.md) and [Chapter 18](chapters/18-responsible-ethical-use/index.md).

### What is iterative refinement, and how do I do it productively?

**Iterative refinement** is the loop of running a prompt, reading the result against your acceptance criteria, changing one thing, and running again. Nearly every prompt reaches its final form this way. Two habits make it productive. Change one component at a time, so you know which change caused an improvement, and keep each version, so you can return to one that worked. For example, if a summary keeps omitting units, add a single constraint requiring units and rerun before touching the role or the examples. Version control makes the history cheap to keep. See [Chapter 4](chapters/04-context-engineering-prompting/index.md) and [Chapter 5](chapters/05-markdown-and-version-control/index.md).

### What is a reviewer agent, and can it replace my own review?

A **reviewer agent** checks another agent's output against stated criteria and reports defects. It earns its keep because it works from the criteria rather than from the producer's intentions, and it can run on a different model, which gives some independence. It does not replace a human or a script. A reviewer shares the weaknesses of language models in general, so it complements tests and your own sampling instead of substituting for them. For example, a reviewer can flag a missing unit in every table of a draft, while you still spot-check the numbers against the data. See [Chapter 9](chapters/09-supervising-agents-roles/index.md) and [Chapter 10](chapters/10-orchestrating-agent-teams/index.md).

### What is a cloud agent computer, and how does it differ from a self-hosted agent?

A **cloud agent computer** is a machine in the vendor's data center, assigned to you or your agent, with its own browser, files, and terminal. It keeps running when your own computer is off, which is why the agent can work in your absence. It also means your files and sessions live on someone else's hardware. A **self-hosted agent** runs on a machine you control, such as a laptop, a server, or your own cloud account. You gain control over where the data go, and you take on the work of setup, security, and upkeep. For example, a group that handles vendor files under NDA may prefer self-hosting for that reason. See [Chapter 19](chapters/19-always-on-personal-agents/index.md).

### What is a session log, and why should I keep one?

A **session log** is a dated record of what was done, decided, and left open in a working session with an agent. A model has no memory of its own, so memory is implemented as files, and the session log is the bridge between sessions: the next session loads it and resumes where the last one ended. Chapter 6 lists it alongside research notes, specifications, glossaries, and decision logs, each with one job. For example, an entry might record that a capture buffer limit was found and which specification it changes. Because the log is a file, you can read it, correct it, and put it under version control. See [Chapter 6](chapters/06-knowledge-bases-skill-anatomy/index.md) and [Chapter 8](chapters/08-agents-tool-use-subagents/index.md).

### What are few-shot examples, and when should I use them?

**Few-shot examples** are sample inputs and the outputs you want, placed in the prompt so the model can copy the format and the kind of judgment. They communicate what is hard to describe in words, such as how terse a summary should be or which defects count as serious. They cost context, so use as many as you need and no more, and make sure they cover the cases the model might get wrong. For example, two sample paper summaries in your preferred structure will usually shape the output better than a paragraph of description. Roles set viewpoint, and constraints bound sources, scope, and length. See [Chapter 3](chapters/03-models-and-prompt-basics/index.md) and [Chapter 4](chapters/04-context-engineering-prompting/index.md).

## Technical Detail Questions

### What does temperature do, and does a low temperature make answers more correct?

**Temperature** reshapes the probabilities a model assigns to its next token without changing their ranking. A low temperature makes output more repeatable and a high temperature makes it more varied. It does not make the output more correct: a model that is confidently wrong at temperature zero will repeat the same wrong answer every time. Use low temperature when you want repeatable, comparable runs, and treat correctness as a separate question that only a check can answer. See [Chapter 2](chapters/02-how-language-models-work/index.md). For example, running the same prompt five times at low temperature gives nearly identical text, and all five can contain the same error.

### What is a system prompt, and is it a security boundary?

A **system prompt** is standing instruction text that sets a model's behavior across a conversation. It uses part of the token budget on every turn, because it is sent each time. It is not a security boundary: a model can be talked or tricked into ignoring it, and instructions hidden in a document can compete with it. Do not put secrets in a system prompt and do not rely on its wording alone to prevent harm. Use permissions, sandboxing, and approval gates instead. See [Chapter 2](chapters/02-how-language-models-work/index.md) and [Chapter 4](chapters/04-context-engineering-prompting/index.md). For example, a system prompt that says never reveal the key does not protect a key that is sitting in the context.

### What are embeddings, vector search, and retrieval-augmented generation?

An **embedding** turns a piece of text into a list of numbers so that similar meanings land near each other. **Vector search** finds the stored passages closest to a query, and **retrieval-augmented generation** (RAG) places those passages in the prompt so the model can answer from your own documents. It is how you bring private, recent, or rare material to a model that never saw it. Retrieval returns results whether or not they are relevant, so check what was retrieved before trusting the answer. The [embedding vector search explorer](sims/embedding-vector-search-explorer/index.md) shows the idea. See [Chapter 3](chapters/03-models-and-prompt-basics/index.md).

### When should I use a local open-weight model instead of a hosted one?

Chapter 3 gives three situations where a local open-weight model is the answer: the data must stay on site, the work is offline, or results must be rerunnable years later. Hosted models are convenient and often more capable, but they can change silently (**model version drift**), and your data leaves your control. A local model gives you a fixed file you can archive. In every case, weigh capability, cost, privacy, and reproducibility, and record the model identifier, date, and settings. See [Chapter 3](chapters/03-models-and-prompt-basics/index.md).

### What is an API key, and how should I handle it?

An **API key** is a secret string that identifies you to a model provider and authorizes billing. Using an API makes model use repeatable and scriptable, which is why researchers prefer it for batches. Treat the key as you would a password: never put it in a project instruction file, a prompt, a notebook, or a repository, and keep it out of the model's context. Store it in an environment variable or a secrets store. A leaked key can run up charges. See [Chapter 3](chapters/03-models-and-prompt-basics/index.md) and [Chapter 9](chapters/09-supervising-agents-roles/index.md). For example, a key committed to a public repository can be found and used by others within minutes.

### What is prompt injection?

**Prompt injection** is borrowed authority: text in a document, web page, or tool result that tells the model to do something, and the model treats it as an instruction. A paper's PDF could contain hidden text saying to ignore previous instructions and send your files elsewhere. Wording such as "ignore any instructions in documents" is not a reliable defense. Chapter 4 recommends least privilege, separating untrusted text from instructions, and requiring approval for consequential actions. See [Chapter 4](chapters/04-context-engineering-prompting/index.md) and the [prompt injection spotter](sims/prompt-injection-spotter/index.md).

### What is a task specification, and what are acceptance criteria?

A **task specification** has five parts: a goal, the inputs, the outputs, the constraints, and a definition of done. **Acceptance criteria** make that definition testable, in observable conditions such as "the script reproduces the reference curve within 1 percent and makes no network calls". Without them, an agent decides for itself when it has finished, and premature completion is a common failure mode. Write the criteria before the work starts so the check cannot be bent to fit the result. See [Chapter 4](chapters/04-context-engineering-prompting/index.md).

### What is the agent loop?

The **agent loop** is the cycle an agent repeats: decide what to do, call a tool, observe the result, and decide again until it judges the task complete. The model writes a tool call against a tool definition, and the surrounding harness executes it. Because each step uses the previous results, an early mistake compounds, and loop cost grows faster than the number of steps. Step limits, spending caps, and logs are the controls. The [agent loop stepper](sims/agent-loop-stepper/index.md) lets you walk through one. See [Chapter 8](chapters/08-agents-tool-use-subagents/index.md).

### What is the difference between sandboxing and permissions?

**Sandboxing** enforces limits technically: the agent physically cannot reach files, networks, or commands outside the box. **Permissions** set policy: they say what the agent is allowed to do and what needs your approval. **Permission modes** are presets of those policies. Chapter 8 stresses that none of them should be bypassed for convenience, since the point of each is that a mistaken or manipulated agent stays bounded. Version control is the safety net underneath all three. See [Chapter 8](chapters/08-agents-tool-use-subagents/index.md). For example, a sandbox can make a data directory unreachable, while a permission rule can require approval before any file is deleted.

### What is a subagent, and why use one?

A **subagent** is an agent started by another agent to do a bounded piece of work with its own isolated context. Subagents let work run in parallel and keep a long investigation from filling the main agent's context window. The cost is extra tokens, and their results must be checked like any other output. Context isolation also helps with privacy, because a subagent sees only what it was given. See [Chapter 8](chapters/08-agents-tool-use-subagents/index.md) and [Chapter 9](chapters/09-supervising-agents-roles/index.md). For example, a subagent can read forty papers and return a one-page table, so the main context never holds the full text.

### What is progressive disclosure in a skill?

**Progressive disclosure** means a skill loads only what it needs, when it needs it. The short description is always visible to the agent so it can decide whether the skill applies. The full instructions load when the skill triggers. Reference documents and scripts load only when the instructions point to them. This keeps the context window free for the actual task and lets a skill hold a lot of knowledge without paying for it on every turn. See [Chapter 7](chapters/07-designing-testing-skills/index.md). For example, a literature skill might keep its search-syntax reference in a separate file that loads only when the agent writes a query.

### What is the difference between precision and recall in a literature search?

**Precision** is the fraction of returned papers that are relevant, and **recall** is the fraction of all relevant papers that were returned. They trade off: a broad query raises recall and lowers precision. Chapter 11 advises that a scoping search should favor recall, since a missed paper is harder to notice than an irrelevant one that you can discard at triage. For example, if a query returns 40 papers and 10 are relevant out of 20 that exist, precision is 25 percent and recall is 50 percent. Try the [search precision and recall explorer](sims/search-precision-recall-explorer/index.md). See [Chapter 11](chapters/11-literature-search-synthesis/index.md).

### What is citation chaining?

**Citation chaining** follows the citation links of a known paper to find related work. Backward chaining reads a paper's reference list for earlier work. Forward chaining finds the later papers that cite it. Together they find what keyword search misses, such as papers that use different terminology for the same idea. Because agents can fabricate references, every paper you add through chaining should be looked up by DOI or in a database before you cite it. See [Chapter 11](chapters/11-literature-search-synthesis/index.md) and the [citation chaining explorer](sims/citation-chaining-explorer/index.md). For example, a 2019 paper's reference list can lead you to a 2012 paper that uses different terms for the same method.

### What is a silent error in simulation or analysis code?

A **silent error** is a bug that runs cleanly and returns a wrong number, so no traceback warns you. Chapter 13 gives a concrete case: using 10 log10 where 20 log10 was needed turned a 10-bit converter into an apparent 18-bit one. Because an agent tests what it imagined, silent errors survive its own tests. The defenses are known-answer unit tests built independently of the code, and numerical sanity checks against physical limits and hand calculations. See [Chapter 13](chapters/13-simulation-testing-code/index.md) and the [numerical sanity check judge](sims/numerical-sanity-check-judge/index.md).

### What is a falsifiable hypothesis?

A **falsifiable hypothesis** states a change, an effect size, and conditions, so that some result could show it wrong. "Adding a guard ring improves the design" cannot be wrong; "adding a guard ring reduces substrate noise coupling by at least 6 dB between 1 and 100 MHz" can. Chapter 14 also asks you to fix the variables, the baseline, and the support criterion before seeing the data. Try sorting examples with the [falsifiable hypothesis sorter](sims/falsifiable-hypothesis-sorter/index.md). See [Chapter 14](chapters/14-brainstorming-problem-framing/index.md).

### What is a reproducibility package?

A **reproducibility package** gives someone else everything needed to rerun your work: the code, the data or its provenance, the environment, the prompts, the model identifier and settings, and a run manifest tying each result to the code and data that made it. Chapter 17 uses a clean-room run, rerunning from scratch on a fresh machine, as the test. With AI assistance, reproducibility also means recording the prompts, models, and settings, since hosted models change. See [Chapter 17](chapters/17-verification-reproducibility/index.md) and [Chapter 13](chapters/13-simulation-testing-code/index.md). For example, a folder with the code, a lock file of dependencies, the raw data, the prompts, and a README with the exact commands.

### What is sycophancy in a language model?

**Sycophancy** is a model's tendency to agree with you rather than with the evidence. If you state a belief, the model often finds support for it. It undermines checks, because a model asked "is my result right?" may say yes. Chapter 17 recommends neutral and flipped framings, explicit evidence requirements, and requests for alternatives. Chapter 14 uses a devil's advocate prompt to counter the same tendency when judging ideas. See [Chapter 17](chapters/17-verification-reproducibility/index.md) and the [sycophancy spotter](sims/sycophancy-spotter/index.md). For example, asking whether your result is correct tends to get a yes, while asking for the strongest argument against it gets a more useful answer.

### Why do summaries of papers need a spot check?

Paper summarization is among the strongest uses of a language model, and it has one characteristic failure: the summary may be built from the abstract and the model's expectations about the field rather than from the paper's body. A summary that sounds right can state a result the paper does not contain. The defenses are to supply the full text, ask for a structured summary with the section for each statement, and spot-check. For example, pick three numbers from a summary and find each one in the paper's tables. Claims should be extracted with their locations so you can verify them. See [Chapter 11](chapters/11-literature-search-synthesis/index.md) and [Chapter 4](chapters/04-context-engineering-prompting/index.md).

### What should a handoff between two agents contain?

Chapter 9 lists six things: the goal, the inputs, the constraints, the acceptance criteria, the work done, and the open questions. Chapter 10 turns this into a **handoff protocol**: one file format, one location, and a small fixed set of status values. A minimal protocol uses five statuses: queued, running, needs-review, accepted, and rejected. An agent never marks its own work accepted, which keeps the approval with a reviewer or with you. For example, a planning agent's plan file could end at needs-review, and the execution agent starts only after you move it to accepted. See [Chapter 10](chapters/10-orchestrating-agent-teams/index.md) and [Chapter 9](chapters/09-supervising-agents-roles/index.md).

## Common Challenge Questions

### How do I tell whether an AI-generated citation is real?

Treat every citation as unverified until you have looked it up yourself. Chapter 2 asks you to sort each one into four classes: verified, wrong detail, unsupported, or fabricated. Look the DOI up in a bibliographic database, confirm that the authors, title, and venue match, and then confirm that the paper actually supports the claim attached to it. Keep verified entries in BibTeX under version control and never hand-type them. Agreement from a second model is not verification. Practice with the [citation verification judge](sims/citation-verification-judge/index.md). See [Chapter 11](chapters/11-literature-search-synthesis/index.md).

### My agent says the task is done, but I do not trust it. What should I do?

Premature completion is a documented agent failure mode, so distrust is reasonable. Give the agent acceptance criteria before it starts, then run the checks yourself or with an independent script: known-answer tests, the diff of what changed, and the log of what it ran. Read the log for the failure patterns of Chapter 9, which include hallucinated results, scope drift, test weakening, and wrong arguments. If a test now passes, check that the test was not edited to pass. See [Chapter 9](chapters/09-supervising-agents-roles/index.md) and [Chapter 5](chapters/05-markdown-and-version-control/index.md). For example, if a failing test suddenly passes, open the diff and check whether the test itself was edited.

### My long task keeps losing information partway through. Why?

Probably the context window overflowed. Because the window is a shared budget for the prompt and the completion, a long task can silently push out earlier material, including your own instructions. Chapter 4 offers remedies: select only the relevant material, summarize for a purpose and spot-check the numbers, ground claims in quotations that can be found, and split the job into a chain with a checked result at each step. Writing intermediate results to files lets a fresh context pick up where the last one stopped. Use the [context selection budget](sims/context-selection-budget/index.md) to practice. See [Chapter 4](chapters/04-context-engineering-prompting/index.md). For example, a forty-page spec pasted in full leaves little room for the agent's work, whereas the three relevant sections leave plenty.

### Why does my agent's analysis code run without errors but give a suspicious answer?

Code that runs is not code that is right. Check it first on a known-answer record, where you can compute the correct result by hand. Then compare against definitional and physical limits, scaling behavior, and limit cases. Chapter 12 also warns that a catch-all error handler that hides exceptions is a defect, and that a script should fail loudly and print the quantities it used. Read tracebacks from the bottom. If the answer still looks wrong, reduce the problem until the first divergence is visible. See [Chapter 12](chapters/12-data-analysis-scripting/index.md) and [Chapter 13](chapters/13-simulation-testing-code/index.md).

### Why did my prompt work yesterday but not today?

Hosted models change: a provider can update the model behind a name, which is **model version drift**. Sampling randomness can also change a result between runs. Record the model identifier, the date, the settings, and the exact prompt for every result that matters, and keep prompts under version control. For anything that must be rerun years later, a local open-weight model gives you a fixed file. Prompt tests, run again after any change, turn a surprise into a failing test. See [Chapter 3](chapters/03-models-and-prompt-basics/index.md) and [Chapter 4](chapters/04-context-engineering-prompting/index.md). For example, record the model identifier and the date next to each figure in your lab notebook.

### My skill never triggers, or it triggers at the wrong time. How do I fix it?

Chapter 7 names the skill failure modes: undertriggering, overtriggering, instruction drift, a missing dependency, a stale reference, and scope creep. Each points to a different fix. Because the description drives triggering, rewrite it so it says exactly when to use the skill and when not to. Test with prompts that should fire it and near misses that should not. If one skill does several jobs, split it into single-purpose skills. Rerun the tests whenever the model, the tools, or the skill change. The [skill description trigger tester](sims/skill-description-trigger-tester/index.md) helps. See [Chapter 7](chapters/07-designing-testing-skills/index.md).

### What should I do when two agents give different answers to the same question?

Treat disagreement as information. Chapter 17 says agreement between models is weak evidence, but disagreement is a flag worth tracing. Compare the two outputs to find where they first diverge, then check that point against a primary source or an independent calculation. Chapter 10 recommends tracing a conflict to its first divergence, and keeping separate outputs for each agent so neither overwrites the other. Do not settle it by asking one agent to judge the other without evidence. See [Chapter 17](chapters/17-verification-reproducibility/index.md) and [Chapter 10](chapters/10-orchestrating-agent-teams/index.md). For example, if two agents report different bandwidths, check the measurement setting and the formula each one used.

### How can I stop an agent from running up costs?

Chapter 9 recommends step limits, spending caps, and context resets, because the cost of a loop grows faster than the number of steps. Estimate the cost of a whole batch before running it, not just one call, and price the entire loop including retries and subagents. For scheduled or background tasks, give narrow scope and limits before they run unattended. Always-on agents add usage metering as a distinguishing risk, so check how a product bills before granting standing access. See [Chapter 9](chapters/09-supervising-agents-roles/index.md) and [Chapter 19](chapters/19-always-on-personal-agents/index.md). For example, set a ceiling of fifty steps and a daily spending limit before launching an overnight run.

### How do I clean data without hiding problems?

Keep the raw files read-only and do all cleaning in a logged script, so every change is visible and reversible. Removing a point needs a documented cause, because outliers are information, not noise. Record the measurement settings alongside the data, preferably in a sidecar file next to a CSV or JSON. Explore the data before computing anything, which catches clipping, short records, and wrong frequencies. The [data cleaning decision simulator](sims/data-cleaning-decision-simulator/index.md) practices these choices. See [Chapter 12](chapters/12-data-analysis-scripting/index.md).

### Will using AI weaken my own research skills?

It can, which Chapter 18 calls over-reliance and skill atrophy. The countermeasures are to do core work yourself, to draft the argument-bearing sections of a paper in your own words, and to explain what you accept from an agent before you accept it. If you cannot explain a result, you cannot defend it, and accountability stays with you. Treat the agent as a source of volume and range, and keep the choices that matter. See [Chapter 18](chapters/18-responsible-ethical-use/index.md) and [Chapter 15](chapters/15-manuscript-preparation/index.md). For example, derive a result by hand once before asking an agent to automate it.

### Can I paste unpublished results or confidential data into a hosted AI tool?

Chapter 18 warns that unpublished results pasted into a hosted tool are disclosed to a third party. Participants' data and vendor files under NDA carry the same concern. The practical answer is a small data classification that maps each class to the tools allowed for it, for example open data to any tool and confidential data to a local model only. Check your institution's and funder's policy first. The [data sensitivity sorter](sims/data-sensitivity-sorter/index.md) practices classifying. See [Chapter 18](chapters/18-responsible-ethical-use/index.md).

### How do I handle a reviewer comment when an AI helped draft my reply?

You answer for every word. Chapter 15 says to write a response that claims only what changed: never state a change you did not make, and check the revised manuscript against the reply. Check that numbers match the new results, since silent changes are a known risk of AI revision. Disclose AI assistance as the venue requires. See [Chapter 15](chapters/15-manuscript-preparation/index.md) and [Chapter 18](chapters/18-responsible-ethical-use/index.md).

### Why is generating ideas and judging them in the same pass a mistake?

**Idea generation** has two phases that are best kept apart. The divergent phase aims at quantity and range with no judgment. The convergent phase evaluates and selects. Mixing them hurts both: judging ideas while generating them stops the supply, and generating while judging blurs the criteria. Chapter 14 also warns that a model tends to agree with you, so ask for a table with assumptions and failure conditions, add a devil's advocate prompt, and check any analogy's mapping. For example, ask for twenty approaches first, then rank them in a separate pass with weights you chose. See [Chapter 14](chapters/14-brainstorming-problem-framing/index.md).

### Why can a ranking of research ideas change when I change my priorities?

A ranking is a weighted sum, so the weights are the decision. If you weight feasibility heavily, a safe incremental idea wins; if you weight novelty heavily, a risky one wins. Chapter 14 asks you to make the weights explicit and to compute how the ranking moves when they change, so the choice is yours rather than hidden in the agent's answer. A novelty claim rests on a search, not on the model's impression. For example, an idea that ranks first at equal weights may drop to third when novelty counts double. Use the [research idea ranking matrix](sims/research-idea-ranking-matrix/index.md). See [Chapter 14](chapters/14-brainstorming-problem-framing/index.md).

### Why do I need to identify the failure that a log line shows?

Logs make agent work auditable, and each failure mode leaves a recognizable trace. Chapter 9 names premature completion, hallucinated results, scope drift, test weakening, wrong arguments, and runaway loops, and each has a mechanical defense. For example, a test that suddenly passes after the agent edited the test file is test weakening, and the defense is to make tests read-only to the agent. A loop that repeats the same call is a runaway, and a step limit stops it. Reading logs against this list is faster than reading everything. Try the [agent failure log triage](sims/agent-failure-log-triage/index.md). See [Chapter 9](chapters/09-supervising-agents-roles/index.md).

### How do I judge whether an AI-assisted result is trustworthy enough to publish?

Chapter 17 frames this as meeting the standard of your field with evidence. Ask whether the work was done right (verification) and whether it was the right work (validation). Check the result with an independent method, a primary source, or a known-answer test. Look for model behaviors that undermine checks, such as overconfidence and sycophancy. Confirm that someone else can rerun it from your reproducibility package in a clean-room run. If a number cannot be traced upstream to its source and downstream to every result that uses it, it is not ready. For example, a figure that regenerates from raw data in one command is much easier to defend. See [Chapter 17](chapters/17-verification-reproducibility/index.md).

## Best Practice Questions

### How should I write a research question when working with AI?

State it with a metric and a threshold. Chapter 1 calls a precise research question the cheapest quality control available, because it gives both you and the agent a way to tell whether an answer is good. For example, "improve ADC performance" is vague, while "raise the effective number of bits above 9.5 at 100 MHz input" can be checked. A precise question also drives the acceptance criteria you write for each task. See [Chapter 1](chapters/01-research-workflows-orchestrator/index.md) and [Chapter 4](chapters/04-context-engineering-prompting/index.md).

### What should go in a project instruction file such as AGENTS.md?

Chapter 5 says it states goals, conventions, and constraints, in lines you could check. Goals tell the agent what the project is for, conventions cover naming, layout, and style, and constraints list what the agent must not do, such as editing raw data. Keep it short, make each line checkable, and do not put secrets in it. Review changes to it like code, since it governs an agent's behavior. Keep raw data and generated results in separate directories so the boundary is clear. See [Chapter 5](chapters/05-markdown-and-version-control/index.md).

### How should I use Git when an agent edits my project?

Commit before you start so you have a recovery point, and make small, named commits so each change is recoverable. Use a branch for agent work, and review the diff before you accept anything: the diff is the check on what an agent actually did. Chapter 5 also recommends versioning your prompts so each result ties to the prompt that produced it. Pushing to a GitHub repository backs the work up and supports review. See [Chapter 5](chapters/05-markdown-and-version-control/index.md).

### How do I decide how much autonomy to give an agent?

Chapter 9 describes autonomy as a dial set per task, not by how capable the model seems. Three questions set it: is the action reversible, how far does it reach, and can the result be verified? A read-only literature scan can run with high autonomy. An email to a collaborator or an overwrite of raw data should need approval. Try the [agent autonomy level assigner](sims/agent-autonomy-level-assigner/index.md) and the [permission boundary judge](sims/agent-permission-boundary-judge/index.md). See [Chapter 9](chapters/09-supervising-agents-roles/index.md). For example, a nightly web search is reversible and low reach, so it can run with little supervision.

### How do I write a role for an agent?

Write it like a job description with a stopping rule. Chapter 9 lists roles such as planning, execution, reviewer, literature, analysis, coding, and writing agents. A good role says what the agent does, what inputs it takes, what it produces, what it must not touch, and when it stops and reports. Make handoffs files, so information is not lost or leaked between agents, and keep each agent's context isolated. See [Chapter 9](chapters/09-supervising-agents-roles/index.md) and [Chapter 10](chapters/10-orchestrating-agent-teams/index.md). For example, a reviewer role might read only the output folder, apply a five-item checklist, and stop after writing a report.

### How do I set up a search strategy for a literature review?

Write it down as a repeatable procedure. Chapter 11 recommends listing the research question, the databases and preprint servers to search, the keywords (an agent can help generate them for breadth), and the dates. Log each query, database, and date so someone else can repeat it. Search more than one source and record whether each is peer reviewed. Triage with a rubric, extract claims with their locations, and chain citations in both directions. See [Chapter 11](chapters/11-literature-search-synthesis/index.md). For example, a log entry such as database, query string, date, and number of hits lets a collaborator repeat the search exactly.

### How do I test an analysis script before trusting it?

Run it first on a known-answer record, one where you can compute the right result independently. Write unit tests before the code when you can, and build the expected values separately from the code under test. Have the script print the quantities it used and fail loudly. Finish with a restart-and-run-all of any notebook, which is the test that results do not depend on hidden state. See [Chapter 12](chapters/12-data-analysis-scripting/index.md), [Chapter 13](chapters/13-simulation-testing-code/index.md), and the [unit test selector](sims/unit-test-selector-seeded-bugs/index.md). For example, generate a sine wave of known amplitude and check that the script reports that amplitude.

### How do I keep my own voice when AI helps draft a paper?

Chapter 15 gives four practices. Draft the argument-bearing sections yourself, and let the agent draft from claims you have evidenced. Supply samples of your own writing as a style guide. Read the result aloud. Run a number check on every revision so no figure changes silently. Write the abstract last, with numbers. Request proposed changes rather than silent rewrites, and regenerate every figure from data and every reference from verified BibTeX. See [Chapter 15](chapters/15-manuscript-preparation/index.md).

### How should I disclose AI use in a paper?

Follow the venue's and your institution's policy, which differs from place to place. Chapter 18 recommends keeping a log as you work, so the disclosure is accurate rather than reconstructed from memory. State which tools you used, what for, and which parts you verified. AI is not listed as an author, because authorship carries accountability a model cannot take. The [AI use disclosure decision helper](sims/ai-use-disclosure-decision-helper/index.md) walks through scenarios. See [Chapter 18](chapters/18-responsible-ethical-use/index.md).

### How do I choose among AI models for a task?

Treat it as a constrained trade-off among capability, cost, latency, privacy, and reproducibility. Chapter 2 notes that size, reasoning, and modality are trade-offs to match to a task, and that your own small benchmark beats a public score. Write down the task, build a handful of test cases with known answers, try two or three models, and price the whole batch. Record the choice. The [model choice scenario sorter](sims/model-choice-scenario-sorter/index.md) practices this. See [Chapter 3](chapters/03-models-and-prompt-basics/index.md).

### How do I write a lab AI policy?

Chapter 18 recommends a one-page file in the repository that is reviewed regularly. The example in the chapter has sections for purpose and scope, accountability, data classes and the tools permitted for each, and disclosure. Add the review schedule, who approves exceptions, and what to do when something goes wrong. Keeping it in version control means that the policy has a history, and new students can read it on their first day. See [Chapter 18](chapters/18-responsible-ethical-use/index.md) and [Chapter 20](chapters/20-case-studies-capstone/index.md).

### What does responsible AI use look like in a research group?

Chapter 18 summarizes it as the same research integrity as before, applied to a tool that produces output fast enough to make lapses easy. In practice it means accountability that cannot be delegated, disclosure of AI use, protection of data entrusted to you, respect for ownership and licenses, checks for bias, and keeping your own skill. For example, a group might classify data into classes, allow only a local model for confidential data, keep an AI-use log, and review the policy each term. Put it in a one-page file in the repository so every member sees it. See [Chapter 18](chapters/18-responsible-ethical-use/index.md) and the [data sensitivity sorter](sims/data-sensitivity-sorter/index.md).

### How should I organize files so an agent can work safely in my project?

Make the layout predictable and the boundaries clear. Chapter 5 recommends naming conventions, documentation kept in the same history as the work, and a separation between raw data and generated results, so an agent has an obvious line it must not cross. Keep source in plain text, record conventions in the instruction file, and commit early. For example, a data directory for raw measurements that is read-only to the agent, a results directory the agent may write to, and a notes directory for decisions. See [Chapter 5](chapters/05-markdown-and-version-control/index.md) and [Chapter 12](chapters/12-data-analysis-scripting/index.md).

### How do I prepare a figure and caption for a manuscript with AI help?

Generate figures from source and data so they can be regenerated, not edited by hand. Chapter 15 asks that a caption stand alone with its figure, naming what is plotted, the units, the conditions, and the takeaway. Use LaTeX for consistent figures and references, and run a number check on any revised text. For example, if a plot of ENOB against input frequency changes after a rerun, the caption numbers must change with it. The [figure caption critic](sims/figure-caption-critic/index.md) practices judging a caption against a checklist. See [Chapter 15](chapters/15-manuscript-preparation/index.md).

### How do I decide between a chat interface and the command line?

Chapter 2 says chat interfaces suit exploration and command lines suit repeatable, file-touching, reproducible work. If you are trying out an idea or asking a question, chat is quick. If the task will run again, touch files, or need a record of exactly what was run, use a command-line tool or API so the prompt, model, and settings can be saved. For example, a one-off question about a datasheet fits chat, while a nightly literature scan belongs in a script. See [Chapter 2](chapters/02-how-language-models-work/index.md) and [Chapter 8](chapters/08-agents-tool-use-subagents/index.md).

## Advanced Topic Questions

### How do I know when adding more agents stops paying off?

Chapter 10 gives three limits: your attention, task dependencies, and coordination cost. Review load grows with team size, so estimate how many outputs per day you must check and fit that to the time you have. Task dependencies set the critical path, and parallelism cannot shorten it. Stop adding agents when they add more review than they remove work. The [orchestrator review load calculator](sims/orchestrator-review-load-calculator/index.md) and [task dependency critical path](sims/task-dependency-critical-path/index.md) let you try the arithmetic. See [Chapter 10](chapters/10-orchestrating-agent-teams/index.md).

### How do I design a team of agents for my own project?

Start from the research question and its acceptance criteria. Break the work into tasks with owners, outputs, and checks, and map the dependencies to find the critical path. Assign planning and execution roles, define handoffs as files, and put review checkpoints and human approval gates where actions are irreversible or outward-bound. Write each agent's specification so it is reproducible, review the plan before execution, and revise it as you learn. Chapter 20's capstone asks you to do this end to end. See [Chapter 10](chapters/10-orchestrating-agent-teams/index.md) and [Chapter 20](chapters/20-case-studies-capstone/index.md). For example, a small team might have one planning agent for literature, one for data analysis, and one execution agent for the figures.

### How should I evaluate a personal agent product that I might adopt?

Use the durable criteria of Chapter 19 rather than a ranking. Ask where it runs, what its blast radius is, how its approval model works, how it meters usage, what data it exposes, where its memory lives, and which of its claims have been verified independently, since almost all are vendor-stated. Check its reach before you grant it, start small, and audit its overnight activity against the task you gave it. Keep memory in files you own. The [agent comparison criteria matcher](sims/agent-comparison-criteria-matcher/index.md) and [overnight activity audit](sims/overnight-activity-audit/index.md) practice this. See [Chapter 19](chapters/19-always-on-personal-agents/index.md). For example, ask what happens to your files if you cancel the subscription, and who can read the agent's memory.

### How much of my knowledge graph should an agent be allowed to read?

Only what its job needs. Chapter 19 recommends partitioning the graph by data class and giving each agent a view, not the master copy. A literature agent may need public papers and notes, while a manuscript agent may need results, and neither needs confidential vendor data. Keep the graph in files you own so the agent's memory is portable and auditable. This is least privilege applied to memory. See [Chapter 19](chapters/19-always-on-personal-agents/index.md), [Chapter 6](chapters/06-knowledge-bases-skill-anatomy/index.md), and the [knowledge graph appendix](appendices/pkg/index.md).

### What makes a verification check independent?

An **independent check** has different failure causes from the thing it checks. Rerunning the same code or asking the same model to confirm its own answer shares the original's flaws, so it proves little. Chapter 17 lists checks that are independent: known-answer tests built separately from the code, a different method for the same quantity, a primary source check, and a cross-model check where disagreement is a flag. Choose the check by what it guards against. See [Chapter 17](chapters/17-verification-reproducibility/index.md) and the [verification method matcher](sims/verification-method-matcher/index.md). For example, a known-answer test computed by hand shares no failure cause with the script it checks.

### How do I turn a research result into an interactive MicroSim?

Chapter 16 says to work specification first: write the evidence of mastery, the content, and the rules, then search for similar sims, generate, verify, and approve. A MicroSim suits a dependence or a process, not a single fact, so decide what parameter the reader should move. The agent writes the p5.js code with built-in controls, you check it against your own calculation, and only a human marks it approved. Embed it with an iframe and a relative path so decks, pages, and papers can reuse it. See [Chapter 16](chapters/16-microsims-communication/index.md), the [MicroSim index](sims/index.md), and the [MicroSim suitability judge](sims/microsim-suitability-judge/index.md). For example, a slider for oversampling ratio that moves the noise floor of a converter shows a dependence that a static plot cannot.

### What does the capstone project ask me to do?

The capstone is an end-to-end research task that you plan and run with a coordinated team of agents. Chapter 20 says to write the criteria in advance, verify the results, build a reproducibility package, disclose AI use, and give an honest account of where human judgment decided the outcome. The case studies of the MicroSims paper and the intelligent textbook project show the pattern: start from source material, hand files between single-purpose stages, check each handoff, and record failures. See [Chapter 20](chapters/20-case-studies-capstone/index.md). For example, a capstone might build a verified literature review on a topic from your own thesis.

### How can I introduce these practices into my research group?

Chapter 20 gives an ordering: policy, repository, pilot, checks, then team. Start with a one-page lab AI policy and a shared repository with an instruction file. Pilot on one task whose result can be checked, add independent checks, and then build a shared skill library and a documented group workflow. Decide at 90 days by measured results, not enthusiasm. The [adoption plan prioritizer](sims/adoption-plan-prioritizer/index.md) helps order the steps. See [Chapter 20](chapters/20-case-studies-capstone/index.md) and [Chapter 18](chapters/18-responsible-ethical-use/index.md).

### Is agreement between two models good evidence that an answer is right?

Not strongly. Chapter 17 says agreement in a cross-model check is weak evidence, because models share training data and tendencies, so they can be wrong in the same way. Disagreement, in contrast, is a flag worth tracing. A reviewer on a different model gives some independence but does not replace a known-answer test, a different method for the same quantity, or a primary source. For example, two models can both repeat the same fabricated citation. Choose the check by what it guards against. See [Chapter 17](chapters/17-verification-reproducibility/index.md) and the [verification method matcher](sims/verification-method-matcher/index.md).

### Why does the cost of an agent loop grow faster than its number of steps?

Each step in an agent loop carries the earlier steps in its context, so every new call re-reads more and costs more tokens than the last. Retries, tool output, and subagents add further volume. Chapter 9 therefore recommends step limits, spending caps, and context resets rather than trusting a rough per-step figure. For example, a thirty-step run does not cost thirty times a one-step run; it costs far more, because the thirtieth call includes the whole history. See [Chapter 9](chapters/09-supervising-agents-roles/index.md), [Chapter 8](chapters/08-agents-tool-use-subagents/index.md), and the [context window budget calculator](sims/context-window-budget-calculator/index.md).

### How would I design a skill pipeline like the one behind this book?

Chapter 20 describes the intelligent textbook project as a **skill pipeline**: single-purpose stages that hand files to one another, with a check at each handoff and a status field acting as the autonomy boundary. To design your own, pick a repeatable job with checkable outputs, split it into stages that each have one input and one output file, write a skill for each stage, and define the status values that gate the next stage. Record failures with cause, detection, control, and change. For example, a literature pipeline could go from search strategy to candidate list to verified references to annotated reading list. See [Chapter 20](chapters/20-case-studies-capstone/index.md) and [Chapter 7](chapters/07-designing-testing-skills/index.md).
