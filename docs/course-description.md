---
title: Course Description for AI for EE Research
description: A detailed course description for AI for EE Research including overview, topics covered and learning objectives in the format of the 2001 Bloom Taxonomy
quality_score: 97
---

# AI for EE Research

**Title:** AI for EE Research: From Researcher to Orchestrator

**Target Audience:** Graduate students (MS and PhD) in electrical engineering,
computer engineering, and computer design, plus postdocs and faculty who want
practical AI skills for everyday research

**Prerequisites:**

- Graduate standing (or equivalent research experience) in electrical
  engineering, computer engineering, or a related field
- Working knowledge of at least one programming language, preferably Python
- Basic comfort with a command line, a text editor, and Git
- Experience writing a technical paper or report
- No prior machine learning, prompt engineering, or agent experience required

## Course Overview

Graduate research in electrical engineering and computer design is a pipeline
of repeatable tasks: finding and reading literature, brainstorming and
scoping a problem, writing analysis and simulation code, processing data, and
preparing figures and manuscripts. Generative AI tools and agents can now take
a substantial share of each of these tasks, but only for researchers who know
how to direct them, check their output, and take responsibility for the
results.

This course is a hands-on guide to that skill. Its central idea is a change
in the researcher's role: from doing every task personally to *orchestrating a
team of agents*. In the vision developed throughout the book, each researcher
coordinates roughly **20 planning agents**, which explore literature,
decompose problems, and draft specifications, and **10 execution agents**,
which write code, run analyses, build simulations, and prepare figures and
manuscripts. The researcher's job is to set direction, supply domain judgment,
resolve conflicts between agents, and decide what is true. The researcher stays
accountable for the science.

The course is practical rather than theoretical. Students learn the two
building blocks that make agents reliable in a research setting: plain
**Markdown files** that capture a project's goals, conventions, and
constraints, and reusable **agent skills** that turn a repeatable research task
into a single, testable command. Throughout, the course works from **case
studies of real work**, including AI-generated interactive simulations
(MicroSims), intelligent textbooks, and a full paper prepared for arXiv with AI
agents, and it treats effective, creative, responsible, and ethical use as
equal goals.

The course also teaches **personal knowledge graphs**: a researcher's own
notes, papers, experiments, people, and projects, represented as linked
entities and relationships rather than as a folder of files. A personal
knowledge graph gives agents a structured, queryable memory of the researcher's
work, and the course shows how to build one with an agent, query it, use it to
ground a model's answers, and decide what an agent may be allowed to see.

The course also surveys the new class of **always-on personal agents** that
arrived in 2026, because researchers will meet them in their own labs whether
or not a course introduces them. These are hosted or self-hosted agents that
keep their own cloud computer, sign in to tools on the user's behalf, remember
context across sessions, and work while the researcher is away. As of this
writing the survey covers SpaceXAI's **Grok Bot**, OpenAI's **Dots**, Meta's
**Muse**, Anthropic's **Claude Cowork**, and the open-source **OpenClaw** and
**Hermes Agent**. The goal is not to rank products, which change monthly, but
to give researchers durable criteria for choosing and supervising any of them:
where the agent runs, what it can reach, how permissions and approvals work,
what it costs, and what happens to research data. The current research notes
are collected in the appendix [Personal Agents](appendices/personal-agents/index.md).

## Main Topics Covered

1. The research workflow and where AI helps: literature search, data analysis,
   brainstorming, coding, and manuscript preparation
2. How large language models work, at the level a researcher needs: tokens,
   context windows, hallucination, model selection, and cost
3. Prompting and context engineering for research tasks
4. Markdown as a project knowledge format: project instruction files, notes,
   specifications, and conventions that agents read before they work
5. Agent skills: designing, writing, testing, and sharing reusable skills for
   repeatable research tasks
6. Agents and tool use: file access, shell commands, web search, subagents,
   hooks, and connecting to external tools and data
7. Planning agents and execution agents: dividing work, handoffs, and
   coordination
8. Orchestration: the researcher as the coordinator of 20 planning agents and
   10 execution agents
9. AI-assisted literature search, reading, and synthesis
10. AI-assisted data analysis and scientific coding, including scripts for
    simulation, signal processing, and plotting
11. AI-assisted brainstorming, problem framing, and hypothesis development
12. AI-assisted manuscript preparation: structure, LaTeX, figures,
    references, and arXiv submission
13. Interactive simulations (MicroSims) and intelligent textbooks as ways to
    communicate and teach research results
14. Verification, validation, and reproducibility of AI-assisted work
15. Responsible and ethical use: citation, disclosure, privacy, intellectual
    property, bias, and academic integrity
16. Case studies of AI-assisted research and publication workflows, including
    the MicroSims arXiv paper and intelligent textbook projects
17. Personal agents: always-on hosted and self-hosted agents such as Grok Bot,
    Dots, Muse, Claude Cowork, OpenClaw, and Hermes Agent, including their
    architectures, permission and approval models, multi-agent features,
    pricing, and data-handling trade-offs
18. Personal knowledge graphs: representing a researcher's notes, papers, and
    projects as entities and relationships, building them with agents, querying
    them, using them as grounded agent memory, and protecting their privacy

## Topics Not Covered

- Training, fine-tuning, or building large language models from scratch
- Machine learning theory, deep learning architectures, and neural network
  mathematics
- AI hardware design, accelerators, and chip architecture for AI workloads
- Vendor-specific electronic design automation (EDA) flows and tool tutorials
- Domain-specific EE theory such as circuit analysis, device physics, or
  quantum electronics (the course assumes students bring this knowledge)
- Legal advice on copyright, patent, and data-protection law
- Comparative benchmarking and rankings of commercial AI products
- Using AI to replace the researcher's judgment, authorship, or accountability

## Learning Outcomes

After completing this course, students will be able to:

### Remember
*Retrieving, recognizing, and recalling relevant knowledge from long-term memory.*

- Define the key terms: token, context window, prompt, agent, subagent, skill,
  tool call, hallucination, and orchestration
- List the five everyday research tasks this course targets: literature search,
  data analysis, brainstorming, coding, and manuscript preparation
- Recall the purpose of a project instruction file and the typical sections it
  contains
- Identify the parts of an agent skill: name, description, instructions, and
  supporting files
- Name common failure modes of AI output, including fabricated citations,
  silent errors in code, and overconfident summaries
- State the difference between a planning agent and an execution agent
- Name the major personal agent products (Grok Bot, Dots, Muse, Claude Cowork,
  OpenClaw, and Hermes Agent) and the vendor or project behind each

### Understand
*Constructing meaning from instructional messages, including oral, written, and graphic communication.*

- Explain why a language model can produce fluent but false statements
- Describe how context window limits affect long research tasks
- Explain why Markdown is a good format for knowledge that both humans and
  agents read
- Summarize how an agent differs from a chatbot, and how tool use extends what
  it can do
- Describe how an always-on personal agent differs from a session-based
  assistant, including where it runs, how it signs in to tools, and how it
  keeps memory between sessions
- Explain how a personal knowledge graph differs from a folder of notes, and
  how entities, relationships, and backlinks make a researcher's knowledge
  queryable by an agent
- Explain how splitting work between planning and execution agents reduces
  errors and cost
- Describe the researcher's responsibilities when AI contributes to a result,
  including citation and disclosure

### Apply
*Carrying out or using a procedure in a given situation.*

- Write a project instruction file that gives an agent the goals, conventions,
  and constraints of a research project
- Use an AI tool to run a literature search and produce an annotated reading
  list with verified citations
- Prompt an agent to write, run, and debug an analysis script on a real
  dataset
- Create a reusable agent skill that automates one repeatable task from their
  own research workflow
- Use an agent to draft a manuscript section from notes, then revise it into
  their own voice
- Generate an interactive simulation that illustrates a concept from their
  research
- Build a personal knowledge graph from their own research notes and papers
  using an agent for entity extraction, then query it to ground an agent's
  answers

### Analyze
*Breaking material into constituent parts and determining how the parts relate to one another and to an overall structure or purpose.*

- Decompose a research project into tasks suited to planning agents and tasks
  suited to execution agents
- Compare the output of several agents on the same task and identify where
  and why they disagree
- Trace an error in AI-generated code or a claim in AI-generated text back to
  its source
- Distinguish tasks that benefit from AI assistance from tasks that require
  the researcher's direct work
- Analyze a case study of an AI-assisted research project and map its
  workflow, handoffs, and review points
- Compare personal agents on architecture, permission and approval model,
  multi-agent support, integrations, and cost, separating vendor claims from
  independently tested behavior

### Evaluate
*Making judgments based on criteria and standards through checking and critiquing.*

- Verify AI-generated citations, numerical results, and code against
  primary sources and independent tests
- Judge whether an AI-assisted result meets the standard for reproducibility
  in their field
- Assess a skill or agent workflow for reliability, cost, and risk before
  relying on it
- Critique an AI-assisted manuscript for accuracy, originality, and proper
  attribution
- Decide when and how to disclose AI assistance to a venue, advisor, or
  collaborator under ethical and institutional guidelines
- Assess the security and data-handling risks of giving a personal agent
  access to research accounts, unpublished data, and licensed tools before
  adopting it
- Decide which parts of a personal knowledge graph an agent may read, and
  assess the privacy risk of exposing unpublished results through it

### Create
*Putting elements together to form a coherent or functional whole; reorganizing elements into a new pattern or structure.*

- Design an orchestrated team of planning and execution agents for a
  research project, with defined roles, handoffs, and review checkpoints
- Build a personal library of agent skills and project instruction files for
  their research group
- Produce a complete, verified research artifact with agent assistance, such
  as a literature review, an analysis notebook, or a draft paper
- Develop a responsible-use policy for AI in their lab or research group
- **Capstone project:** plan and run an end-to-end research task with a
  coordinated team of agents, document the workflow, and present the verified
  results along with an honest account of where human judgment was required
