---
hide:
    toc
---
# AI for EE Research Productivity

---
## About Dan McCreary

- BA in Physics/Computer Science from Carleton College in 1982
- MSEE in Electrical Engineering/Computer Science from the University of Minnesota in 1983
- DSP design at Bell Laboratories
- Supercomputing software (Unix)
- Worked for Steve Jobs at NeXT Computer
- Founded Integrity Solutions (software services)
- Data exchange standards for State of Minnesota
- NoSQL Conferences and NoSQL textbook
- Distinguished Engineer at UGH/Optum
- Head of AI for TigerGraph (Silicon Valley)
- Knowledge representation strategies for education
- Using GenAI to create MicroSims and Intelligent Textbooks

*The key to artificial intelligent is knowledge representation*

---
## The Seed Email

![Seed Email](./seed-email.png){ width="300px" align="right"}

Prof. Katie Zhao and I are organizing a monthly departmental workshop on AI for Research Productivity. Our goal is to build a community where graduate students can exchange ideas and explore how to use AI effectively, creatively, responsibly, and ethically in research.

Would you be available to give a 40-minute presentation at our upcoming workshop?


---

## My Response

### Title: From Researcher to Orchestrator: Managing a Team of AI Agents for Research

### Abstract:
What if every researcher managed a team of 30 AI agents? In this hands-on talk I will describe a working model of research productivity in which each researcher coordinates 20 planning agents (which explore literature, decompose problems, and draft specifications) and 10 execution agents (which write code, run analyses, build simulations, and prepare figures and manuscripts). The researcher’s job shifts from doing every task to setting direction, supplying domain judgment, and reviewing results.

I will make this concrete with case studies from my own work, including interactive simulations and a full arXiv paper produced with AI agents, and a live demonstration of the two practical building blocks students asked about: plain Markdown files that capture a project’s goals and conventions, and reusable agent skills that turn a repeatable research task into a one-line command. We will also discuss how to keep this work responsible and ethical: verifying outputs, citing sources, and keeping the human accountable for the science.

---

## The Problem: Research Funnel

<iframe src="../../sims/research-funnel/main.html" height="582px" width="100%"></iframe>

---

## The Solution: Researcher as Orchestrator

<iframe src="../../posters/twenty-planners-ten-doers/main.html" height="900px" width="100%" scrolling="no"></iframe>

---
## What Does Dan Use His Agents For?

1. Generation of interactive intelligent textbooks from a course description (10,000 hour task in 10 hours)
2. Generating simulations that live within these textbooks (MicroSims)
3. Generating reports, presentations and papers
4. Helping my mentorship program
5. Helping build my Coding Club hand-on kits (Smart Clock)
6. Promoting books, microsims and interactive infographic posters
7. Scheduling and calendaring

---
## Using Agent Personas to Divide Tasks






---
## How Much Does it Cost Per Month?

<iframe src="../../posters/dans-desktop/main.html" height="750px" width="100%" scrolling="no"></iframe>



---
## Number One Question: Communication

How do you efficiency get all your Bots to communicate together as well as communicate with
the agents in your department and at the University of Minnesota?


---

## The Key: Personal Knowledge Graph

A central "ground truth" data structure to keep your content aligned with your goals

![](./dans-pkg.png)
---
## Generating a Publishing Quality Paper

![](./microsims-paper.png){ width="300px" align="right"}

- Ask your GenAI tool what the best practices are
    - Length of paper
    - Typical outline
    - How many figures
    - How many references
    - Provide a template
    - Create a `build.sh` script
    - `build.sh` produces a `main.pdf`

---
## Sample GitHub Repo