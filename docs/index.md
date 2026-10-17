---
title: AI for EE Research
description: An interactive intelligent textbook for researchers in electrical engineering and computer design. A hands-on guide with practical demonstrations of how AI tools and agents can support everyday research tasks, such as literature searches, data analysis, brainstorming, coding, and manuscript preparation.
image: /img/cover.png
og:image: /img/cover.png
twitter:image: /img/cover.png
hide:
  - toc
---
<style>
.md-content__inner h1 {display: none !important;}
</style>

# AI for EE Research

<figure markdown>
  ![AI for EE Research cover](./img/cover.png){ width="100%" }
</figure>

Welcome to **AI for EE Research**, an interactive intelligent textbook for
researchers in electrical engineering and computer design. It is a hands-on
guide to using AI tools and agents for everyday research tasks: literature
searches, data analysis, brainstorming, coding, and manuscript preparation.

The book's central idea is that your role shifts from *doing* every task by hand
to *orchestrating* a team of agents, while you stay accountable for the science.

[Start with Chapter 1](chapters/01-research-workflows-orchestrator/index.md){ .md-button .md-button--primary }
[Browse the Posters](posters/index.md){ .md-button }
[Try a MicroSim](sims/index.md){ .md-button }

!!! mascot-welcome "Welcome!"
    ![Volt the Border Collie waving welcome](./img/mascot/welcome.png){ class="mascot-admonition-img" }
    I'm Volt, and I'll be rounding up the key ideas as you work through this
    book. Agents can do a great deal of your research legwork, but you stay
    accountable for the science. Trust, but verify!

## Who This Book Is For

Graduate students, postdoctoral researchers, faculty, and practicing engineers
in electrical engineering and computer design who want to use AI responsibly in
their research. You do not need a background in machine learning; you need
curiosity, and the habit of checking your results.

## What's Inside

Use the left-hand navigation or the links below to explore each section.

### Start Here

- **[About This Book](about.md)** — the purpose, audience, and design of the book, and the author behind it.
- **[Course Description](course-description.md)** — the audience, prerequisites, topics, and learning outcomes the whole book is built from.

### Chapters

The core of the book is **[20 chapters](chapters/index.md)** covering 379
concepts, each introduced after the concepts it depends on. Every chapter has
annotated references and a self-check quiz.

- **Foundations (Chapters 1–4)** — [research workflows](chapters/01-research-workflows-orchestrator/index.md), [how language models work](chapters/02-how-language-models-work/index.md), [choosing models and writing prompts](chapters/03-models-and-prompt-basics/index.md), and [context engineering](chapters/04-context-engineering-prompting/index.md).
- **Project knowledge and skills (Chapters 5–7)** — [Markdown and version control](chapters/05-markdown-and-version-control/index.md), [knowledge bases and personal knowledge graphs](chapters/06-knowledge-bases-skill-anatomy/index.md), and [designing and testing agent skills](chapters/07-designing-testing-skills/index.md).
- **Agents and teams (Chapters 8–10)** — [agents and tool use](chapters/08-agents-tool-use-subagents/index.md), [supervising agents](chapters/09-supervising-agents-roles/index.md), and [orchestrating agent teams](chapters/10-orchestrating-agent-teams/index.md).
- **Applying AI to research (Chapters 11–16)** — [literature search](chapters/11-literature-search-synthesis/index.md), [data analysis](chapters/12-data-analysis-scripting/index.md), [simulation and reproducible code](chapters/13-simulation-testing-code/index.md), [brainstorming](chapters/14-brainstorming-problem-framing/index.md), [manuscript preparation](chapters/15-manuscript-preparation/index.md), and [MicroSims for communication](chapters/16-microsims-communication/index.md).
- **Trust and responsibility (Chapters 17–20)** — [verification](chapters/17-verification-reproducibility/index.md), [ethical use](chapters/18-responsible-ethical-use/index.md), [always-on personal agents](chapters/19-always-on-personal-agents/index.md), and the [capstone project](chapters/20-case-studies-capstone/index.md).

### Infographic Posters

The **[Poster Gallery](posters/index.md)** turns the book's biggest ideas into
20 full-width interactive infographics. Most set a risky way of working beside a
controlled one so the difference is visible at a glance. Hover or click a region
to read what it shows, then switch to **Quiz** mode to test yourself. The
original concepts and their sources are in [Infographic Poster Ideas](posters/poster-ideas.md).

<div class="grid cards poster-grid" markdown>

-   [![From Doing Everything to Directing Everything](./posters/from-doing-to-directing/from-doing-to-directing-thumb.jpg)](posters/from-doing-to-directing/index.md)

    **[From Doing Everything to Directing Everything](posters/from-doing-to-directing/index.md)**

    Your job moves from doing every task by hand to directing a team of agents.

-   [![The Real Citation and the Fluent Fake](./posters/real-citation-fluent-fake/real-citation-fluent-fake-thumb.jpg)](posters/real-citation-fluent-fake/index.md)

    **[The Real Citation and the Fluent Fake](posters/real-citation-fluent-fake/index.md)**

    A model writes a fabricated reference as fluently as a real one, so every citation needs checking.

-   [![The Autonomy Dial](./posters/the-autonomy-dial/the-autonomy-dial-thumb.jpg)](posters/the-autonomy-dial/index.md)

    **[The Autonomy Dial](posters/the-autonomy-dial/index.md)**

    Decide how much freedom each agent gets, and what it must ask you first.

-   [![Verified Is Not Validated](./posters/verified-is-not-validated/verified-is-not-validated-thumb.jpg)](posters/verified-is-not-validated/index.md)

    **[Verified Is Not Validated](posters/verified-is-not-validated/index.md)**

    Code that matches its spec can still be the wrong model of the physical world.

</div>

[See all 20 posters](posters/index.md){ .md-button }

### MicroSims

The **[MicroSims](sims/index.md)** section holds 45 interactive simulations that
let you practice each chapter's ideas: sort, predict, calculate, and judge. Each
one focuses on a single concept and is embedded in its chapter. Good places to
start are the [Agent Loop Stepper](sims/agent-loop-stepper/index.md), the
[Context Window Budget Calculator](sims/context-window-budget-calculator/index.md),
and the [Citation Verification Judge](sims/citation-verification-judge/index.md).

### Learning Graph

The **[Learning Graph](learning-graph/index.md)** maps how the book's 379
concepts depend on each other. Explore it in the
[interactive Learning Graph Viewer](sims/graph-viewer/index.md), or read the
[concept list](learning-graph/concept-list.md), [taxonomy](learning-graph/concept-taxonomy.md),
and [quality analysis](learning-graph/quality-metrics.md) behind it.

### Appendices

The **[Appendices](appendices/index.md)** hold supporting research that is not
yet part of a chapter: [Personal Agents](appendices/personal-agents/index.md), a
comparison of always-on personal AI agents, and
[Personal Knowledge Graphs](appendices/pkg/index.md), a summary of research on
integrating personal knowledge graphs securely into an organization.

### Reference

- **[Glossary](glossary.md)** — definitions of the book's key terms.
- **[References](references.md)** — the book's bibliography.
- **[License](license.md)** — Creative Commons BY-NC-SA 4.0, free for non-commercial use.
- **[Contact](contact.md)** — questions, corrections, and suggestions.

## How to Use This Book

1. **Read in order.** Early chapters build the foundations; later chapters build on them.
2. **Practice with the MicroSims** embedded in each chapter, or browse the full [MicroSim list](sims/index.md).
3. **Check yourself** with the quiz at the end of each chapter.
4. **Review with the posters** when you want a one-page picture of an idea.
5. **Look up unfamiliar terms** in the [Glossary](glossary.md).

!!! mascot-celebration "Ready to begin?"
    ![Volt the Border Collie celebrating](./img/mascot/celebration.png){ class="mascot-admonition-img" }
    Pick a chapter, run a MicroSim, and see how much legwork you can hand off.
    I'll be right here to help you check it.
