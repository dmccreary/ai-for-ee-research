# Concept Taxonomy

The 350 concepts in the *AI for EE Research* learning graph are organized into
15 categories. Each concept has exactly one primary category, identified by a
3-6 letter **TaxonomyID** that is used in `learning-graph.csv` and as the group
key in `learning-graph.json`. The categories follow the course's teaching
order: foundations first, then how models work, then the Markdown and skill
building blocks, then agents and orchestration, then the five research tasks,
and finally verification, ethics, and the capstone.

No category holds more than 10% of the concepts, well under the 30% ceiling.

## Categories

### FOUND — Foundations of AI-Assisted Research

Concepts 1-20. The research workflow, the five target tasks, the core
vocabulary of generative AI and agents, and the central idea of the researcher
as orchestrator.

### LLM — How Language Models Work

Concepts 21-50. Tokens, context windows, prompts and completions, training
data, hallucination, model selection and cost, retrieval, and the interfaces
researchers use to reach a model.

### PROMPT — Prompting and Context Engineering

Concepts 51-80. Writing clear instructions, output formats and acceptance
criteria, choosing and compressing context, grounding, prompt libraries,
testing, and multi-step prompting.

### MDKB — Markdown and Project Knowledge

Concepts 81-110. Markdown syntax, project instruction files such as
`AGENTS.md` and `CLAUDE.md`, notes, specifications, logs, knowledge bases, and
the Git practices that keep them reliable.

### SKILL — Agent Skills

Concepts 111-135. Designing, writing, scoping, testing, versioning, sharing,
and maintaining reusable agent skills for repeatable research tasks.

### AGENT — Agents and Tool Use

Concepts 136-170. The agent loop, tool calls, file access, shell commands,
code execution, permissions, subagents, hooks, external data, autonomy, and
agent failure modes.

### ORCH — Agent Teams and Orchestration

Concepts 171-205. Planning and execution agents, roles, handoffs, task
queues, review checkpoints, delegation, and the 20-planning-agent,
10-execution-agent orchestration model.

### LIT — Literature Search and Synthesis

Concepts 206-225. Search strategy, paper triage and summarization, citation
chaining, reference management, citation verification, and evidence synthesis.

### DATA — Data Analysis and Scientific Coding

Concepts 226-255. Data cleaning, analysis scripts, plotting, testing and
debugging, simulation and signal-processing code, HDL, and reproducible
environments.

### BRAIN — Brainstorming and Problem Framing

Concepts 256-265. Framing problems, generating and ranking ideas, developing
hypotheses, designing experiments, and checking novelty.

### MANU — Manuscript Preparation

Concepts 266-284. Paper structure, drafting and revision, author voice,
LaTeX, figures, references, arXiv submission, peer review response, and
authorship.

### COMM — MicroSims and Research Communication

Concepts 285-296. Slide decks, MicroSims, interactive simulations,
intelligent textbooks, learning graphs, and teaching from research.

### VERIF — Verification and Reproducibility

Concepts 297-312. Verification and validation, independent and cross-model
checks, result replication, sycophancy and overconfidence, audit trails, and
error tracing.

### ETHIC — Responsible and Ethical Use

Concepts 313-336. Academic integrity, citation and disclosure of AI use,
privacy, intellectual property, bias, institutional and journal policy,
accountability, and over-reliance.

### CASE — Case Studies and Capstone

Concepts 337-350. The MicroSims arXiv paper, the intelligent textbook
project, lessons learned, agent team design, and the capstone project.

## TaxonomyID Reference

| TaxonomyID | Category Name | Concept ID Range |
|------------|---------------|------------------|
| FOUND | Foundations of AI-Assisted Research | 1-20 |
| LLM | How Language Models Work | 21-50 |
| PROMPT | Prompting and Context Engineering | 51-80 |
| MDKB | Markdown and Project Knowledge | 81-110 |
| SKILL | Agent Skills | 111-135 |
| AGENT | Agents and Tool Use | 136-170 |
| ORCH | Agent Teams and Orchestration | 171-205 |
| LIT | Literature Search and Synthesis | 206-225 |
| DATA | Data Analysis and Scientific Coding | 226-255 |
| BRAIN | Brainstorming and Problem Framing | 256-265 |
| MANU | Manuscript Preparation | 266-284 |
| COMM | MicroSims and Research Communication | 285-296 |
| VERIF | Verification and Reproducibility | 297-312 |
| ETHIC | Responsible and Ethical Use | 313-336 |
| CASE | Case Studies and Capstone | 337-350 |
