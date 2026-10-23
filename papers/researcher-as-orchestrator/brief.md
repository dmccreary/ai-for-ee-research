# Paper Brief: From Researcher to Orchestrator

**Slug:** researcher-as-orchestrator · **Created:** 2026-10-22 · **Status:** packaged
**Readiness score:** 86/100 (start drafting at 80 or above, with no open blockers)

This brief was produced in a batch run of the arxiv-paper-generator skill (v0.01) with no
author available to answer questions. Every answer below was mined from the source
material, and every decision the author did not make is listed under *Assumptions*.
The outline was **not reviewed by the author**.

## Thesis

When AI agents take over a large share of the procedural work of engineering research,
the binding constraint on a researcher's team of agents is the researcher's review
attention, not the number of agents; an orchestration framework that sets each task's
autonomy from the task's effects (reversibility, reach, verifiability), passes work
between agents as reviewable files with a status that no agent may set to "accepted"
for its own work, and sizes the team to a daily review budget makes that constraint
explicit and catches the defects that matter.

Source: the book's stated central idea (docs/index.md, docs/course-description.md:
"from doing every task personally to orchestrating a team of agents ... The researcher
stays accountable for the science"), developed in Chapters 1, 9, 10, 17 and 20.

## Paper type and audience

- **Type:** framework, supported by three case studies (one illustrative, two from real
  project records) = a research paper, not a position paper.
- **Audience / reviewers:** human-AI interaction and human supervisory control
  researchers; researchers and advisors in electrical and computer engineering who use
  agents; builders of agent tooling.
- **Primary venue:** arXiv cs.HC, cross-lists cs.MA and cs.CY. Fallback: TechRxiv (EE
  audience) if arXiv moderation classifies it as a position paper.
- **Eligibility note:** framework + research questions + case-study method + evidence
  from logs and repository records = research paper. The October 2025 CS rule on
  position/review papers should not apply. cs.CY as primary would be the most
  conservative choice (exempt from that rule); see Assumptions.

## Authors

| Order | Full name | Affiliation | Contact | ORCID |
|------:|-----------|-------------|---------|-------|
| 1 | Dan McCreary | Independent Researcher, Minnesota, USA | https://www.linkedin.com/in/danmccreary/ | 0009-0009-3542-8828 |

(Name, affiliation, contact URL and ORCID are from the user's request. The location
"Minnesota, USA" is from the author's global profile; remove it if not wanted.)

## Problem and gap

- Researchers adopted AI tools faster than they learned practices for them: Wiley's
  August 2025 survey of 2,430 researchers found 84% use AI (57% in 2024), 57% cite a
  lack of guidelines and training as a barrier, and concern about inaccuracies rose
  from 51% to 64% (Wiley press release, 7 Oct 2025; also cited in docs/about.md).
- Multi-agent frameworks (AutoGen, MetaGPT, ChatDev, CAMEL) and AI-scientist systems
  (AI Scientist, Coscientist, Agent Laboratory, Co-Scientist) focus on agent-agent
  coordination or full autonomy. They do not model the human reviewer's attention as
  the limiting resource, and their handoffs are conversations rather than reviewable
  files.
- Levels-of-automation and supervisory-control research (Sheridan and Verplank;
  Parasuraman, Sheridan and Wickens; fan-out models of Crandall et al. and Cummings
  and Mitchell) gives the right concepts but predates agents that produce asynchronous
  textual and code artifacts whose cost is verification, not teleoperation.
- Recent agent autonomy levels (Feng, McDonald and Zhang 2025) classify by user role
  but give no rule for assigning a level to a task, and no team-sizing model.

## Contributions

1. An orchestration framework for research agent teams: roles (planning, execution,
   reviewer, domain specializations, human orchestrator), a four-level autonomy scale,
   and a task-effect assignment rule over reversibility, reach and verifiability, shown
   to be complete and monotone.
2. A file-based handoff protocol with five statuses and a separation-of-acceptance
   invariant (no producer may accept its own output), plus a provenance rule for
   reported numbers added after the case analysis.
3. An attention-budget model of review load that yields the span of control, explains
   the book's 20-planner/10-executor ratio as a consequence of review costs rather than
   a constant, and relates it to fan-out in human supervisory control.
4. A three-case evaluation: an illustrative EE characterization task (ADC effective
   number of bits) and two real AI-assisted publication pipelines (the 20-chapter
   textbook and the MicroSims arXiv paper), with a cross-case analysis of 13 recorded
   defects and the control that caught each (or failed to).

## Core contribution details

From Chapters 9 and 10 (docs/chapters/09-supervising-agents-roles,
docs/chapters/10-orchestrating-agent-teams):

- Autonomy levels 0 Suggest only, 1 Approve each step, 2 Act within a boundary (gates),
  3 Act and report. Assignment rule from three task properties.
- Failure modes: premature completion, hallucinated result, scope drift, test
  weakening, wrong arguments, runaway loop; each with a log signature and a mechanical
  defense.
- Roles: planning, execution, reviewer, literature, analysis, coding, writing agents;
  planner-executor pattern; context isolation; handoff artifact contents.
- Handoff protocol statuses queued, running, needs-review, accepted, rejected; "an agent
  never marks its own work accepted"; shared workspace with per-agent outputs.
- Review load L = n_p k_p r_p + n_e k_e r_e + c; span of control = attention budget /
  review cost per agent; scaling limited by attention, dependencies, coordination.
- Critical path example T1-T9 (21 h of work, 18 h critical path).
- Verification (Chapter 17): independent, primary-source, cross-model, known-answer,
  replication; stakes-proportional minimum checks.
- Design decisions and rejected alternatives: capability-based autonomy (rejected),
  conversation-based handoffs (rejected), fully autonomous orchestrator (rejected for
  accountability and physical evidence), reviewer agents as replacement for humans
  (rejected; complement only), full human review of every output (rejected in favour of
  risk-weighted sampling).

## Evidence

| Evidence | Kind | Source |
|----------|------|--------|
| ADC ENOB characterization task, decomposition, autonomy assignment, review load, critical path | worked example (illustrative, labelled) | Ch. 1, 9, 10, 13, 17 |
| Textbook skill pipeline: 6 stages, 379 concepts / 670 edges / 17 categories, 20 chapters, 200 quiz items, 379 glossary entries, 50 sims with status (47 instrumented, 3 built, 0 approved) | case study, repository data | docs/learning-graph/*, docs/sims/*/index.md, docs/chapters/* |
| Chapter word budgets vs prose words for 20 chapters | case study, logged data | logs/chapter-content-generator-2026-10-15.md |
| Session timing (ch1 7m18s; ch2-5 9m43s; ch6-20 21m56s) and its logging gaps | case study, logs | logs/ch-*.md |
| 40 sims built by 19 parallel agents; 2 spec corrections; open items (unspecified text, spec revealing answers) | case study, logs | logs/chapter-content-generator-2026-10-15.md (Session 4) |
| Quiz stage: 3h38m30s session, subagent stopped after ch7 with empty report, hard-coded 82/100 score that persists in published report | case study, logs (failure) | logs/devin-slow-quiz-generation.md, docs/learning-graph/quiz-generation-report.md |
| Defects caught: ENOB criterion (hand calc), stray tags (script), short chapters (decision record), unbuilt sims (status) | case study | docs/chapters/20-case-studies-capstone/index.md |
| MicroSims paper: 11 section files, source map of ~19,000 words, 23 commits 17 Oct-24 Nov 2025, five retained PDF drafts, section renamed "Expected Benefits", posted 25 Nov 2025 (42 pp, 4 figs) | case study, repository + arXiv record | ~/projects/microsims/paper (read only), arXiv:2511.19864 |
| Researcher AI adoption | cited data | Wiley 2025; Van Noorden and Perkel 2023 |
| Fabricated citations 55% (GPT-3.5) / 18% (GPT-4) | cited data | Walters and Wilder 2023 |
| Multi-agent failure taxonomy (1,600+ traces, 14 modes) | cited data | Cemri et al. 2025 |

## Prior work to engage

| Work / strand | How this paper differs | Verified? |
|---------------|------------------------|-----------|
| LLM agents and multi-agent frameworks (ReAct, AutoGen, MetaGPT, ChatDev, CAMEL, HuggingGPT, surveys by Wang et al. and Xi et al., Anthropic engineering notes) | models the human reviewer as the bottleneck; file handoffs instead of conversations | yes (Crossref/DataCite/web) |
| AI systems that automate science (AI Scientist, Coscientist, ChemCrow, Agent Laboratory, Co-Scientist; critique by Messeri and Crockett) | keeps the researcher accountable; evidence that is physical cannot be generated | yes |
| LLMs for hardware/EDA (Thakur et al., Chip-Chat, VerilogEval, ChipNeMo) | workflow-level supervision rather than model capability on RTL | yes |
| Levels of automation and supervisory control (Sheridan and Verplank; Parasuraman et al.; Crandall et al.; Cummings and Mitchell; Horvitz; Amershi et al.; Shneiderman; Feng et al. 2025; Mitchell et al. 2025; Chan et al. 2024) | an assignment rule from task effects; review budget as fan-out for asynchronous artifacts | yes |
| Automation bias, LLM failure modes, verification and reproducibility (Parasuraman and Manzey; Goddard et al.; Ji et al.; Walters and Wilder; Sharma et al.; Greshake et al.; Liu et al.; Zheng et al.; Cemri et al.; Zhong et al.; Sandve et al.; Wilson et al.; Oberkampf and Roy) | turns these into controls placed at handoffs | yes |
| Publication policy (arXiv, Thorp 2023, Nature editorial 2023, EC living guidelines 2025) | accountability argument for the human gate | yes |

## Known limitations

- The cases are the author's own projects (author bias); two are content-production
  pipelines rather than laboratory research with physical measurement; the EE case is
  illustrative.
- Review-time parameters and the 20:10 ratio are design targets with illustrative
  values; none was measured.
- Task attributes are treated as binary; real reversibility and verifiability are graded.
- The logs are incomplete (narrated rather than mechanical timestamps) and one log
  contains an unsupported number, which limits what can be measured.
- The field and products change monthly; the framework is meant to be product-neutral.
- One orchestrator; group dynamics and multiple reviewers are not modelled.

## Figures plan

| # | Figure | Method | Source data or asset |
|---|--------|--------|----------------------|
| 1 | Framework overview: orchestrator, planning team, execution team, reviewer/scripts, handoff files with statuses, approval gate | TikZ | Ch. 9-10 |
| 2 | Autonomy assignment decision tree over reach, reversibility, verifiability | TikZ | Ch. 9 Table 1 and rule |
| 3 | Review load vs team size under three review regimes, with attention budget line | matplotlib | Eq. (review load), illustrative parameters from Ch. 10 |
| 4 | ADC characterization task graph with critical path | TikZ | Ch. 10 Table 1 (illustrative) |
| 5 | Textbook skill pipeline with artifacts, checks and where each defect was caught | TikZ | Ch. 20 Table 1, logs |
| 6 | Chapter word budget ranges vs written prose words, 20 chapters | matplotlib | logs/chapter-content-generator-2026-10-15.md |

## Source material map

| Source file | Feeds section(s) |
|-------------|------------------|
| docs/index.md, docs/course-description.md, docs/about.md | Introduction (thesis, stakes) |
| docs/chapters/01-research-workflows-orchestrator | Introduction, Framework (vocabulary, pipeline reliability), Case A |
| docs/chapters/09-supervising-agents-roles | Framework (autonomy, roles, failure modes) |
| docs/chapters/10-orchestrating-agent-teams | Framework (handoffs, review load, critical path, scaling), Case A |
| docs/chapters/07-designing-testing-skills | Framework (skills as single-purpose stages), Case B |
| docs/chapters/17-verification-reproducibility | Framework (checks), Discussion |
| docs/chapters/20-case-studies-capstone | Cases B and C, cross-case defects |
| AGENTS.md (book repo) | Case B (instruction file, status rule) |
| logs/*.md (book repo) | Case B data, Figure 6 |
| docs/learning-graph/*, docs/sims/*/index.md | Case B counts |
| ~/projects/microsims/paper (README, STATUS, sections, git log) + arXiv:2511.19864 | Case C |
| docs/chapters/*/references.md | starting reference pool (all re-verified) |

## Logistics

- **Target length:** 14-18 pages planned; the built paper is 26 pages including about 4.5 pages of references · **License:** CC BY 4.0 (from the user) · **Version:** 0.01
- **AI-use disclosure:** Claude Opus 5.5 (Anthropic) in Claude Code, running the
  arxiv-paper-generator skill: drafted the text from the book and repositories,
  generated figure scripts and TikZ, retrieved and formatted bibliographic metadata.

## Readiness breakdown

| # | Criterion | Projected | Max | Why |
|---|-----------|----------:|----:|-----|
| 1 | Title | 5 | 5 | Specific title available from the book's subtitle plus the contribution |
| 2 | Authors | 3 | 3 | Full name, independent researcher, URL, ORCID given |
| 3 | Abstract | 7 | 7 | All five moves supported by the content |
| 4 | Introduction | 8 | 8 | Stakes (cited survey), gap, 4 contributions, roadmap |
| 5 | Related work | 7 | 7 | 5 strands, 30+ verified sources |
| 6 | Core contribution | 9 | 10 | Chapters 9-10 give levels, rule, protocol, equation; formalization adds rigour |
| 7 | Evidence | 5 | 8 | Two real cases with logged data plus one illustrative; no controlled measurement; author-built |
| 8 | Discussion and limitations | 4 | 4 | Real limitations known |
| 9 | Conclusion | 3 | 3 | Concrete future work available |
| 10 | References | 9 | 10 | 40+ verified; recency high |
| 11 | Figures | 7 | 8 | 6 planned, 1 from real data |
| 12 | Tables and formal elements | 4 | 4 | Equations, decision rule, listing, booktabs tables |
| 13 | Claim support | 3 | 3 | Every number traceable to logs or citations |
| 14-17 | Build, package, metadata, writing | 18 | 20 | Writing risk: book-to-paper condensation |
| | **Total** | **86** | **100** | |

No blocker is filled by an assumption: the thesis, contributions, framework details and
evidence all come from the book and project records. The assumptions below are
editorial choices (which argument, which category) that the author can reverse.

## Assumptions (made without the author; confirm each)

- **Which argument.** The paper makes the book's orchestration argument (Chapters 1, 9,
  10, 17, 20). It leaves out the personal-agent survey (Ch. 19), personal knowledge
  graphs (Ch. 6, appendix), and the didactic chapters on prompting and Markdown.
- **Paper type and framing.** Framework + three case studies, framed as a research
  paper with research questions, so that it is eligible for arXiv CS.
- **Title and slug.** "From Researcher to Orchestrator: Attention-Bounded Supervision of
  AI Agent Teams in Engineering Research"; slug `researcher-as-orchestrator`.
- **Category.** Primary cs.HC, cross-lists cs.MA and cs.CY. If the author prefers the
  safest route past the CS position-paper rule, make cs.CY primary.
- **Contact.** The LinkedIn URL is used as the contact; no e-mail address is printed.
- **Formal extensions.** The autonomy rule is written as a function and shown to be
  monotone; the review-load equation is extended with a sampling fraction and an escape
  model; the 2:1 ratio is derived from review costs. These are the paper's own
  formalization of the book's material and are labelled as models, not measurements.
- **Using the quiz-stage log.** The self-critical session log
  (logs/devin-slow-quiz-generation.md) is used as evidence of a failure, including that
  its 82/100 score was hard-coded. The agent environment is not named in the paper.
- **Using the MicroSims repository.** Facts about the MicroSims paper come from the
  read-only repository and the public arXiv record; co-authors Valerie Lockhart and
  Troy A. Peterson are acknowledged by name.
- **Acknowledgments.** No funding statement or personal thanks were invented.

## Open questions

None that block drafting. For the author before submission: confirm the assumptions
above; confirm whether any funding or employer statement is needed; proofread every
number in Section 5 against the logs.

## Outline

**Final title:** From Researcher to Orchestrator: Attention-Bounded Supervision of AI
Agent Teams in Engineering Research

**Abstract sketch:** Researchers in electrical and computer engineering now delegate
literature search, coding, analysis and drafting to AI agents, but the practices for
supervising teams of agents lag adoption. Existing multi-agent frameworks optimize
agent-agent coordination and treat the human as optional. We present an orchestration
framework in which autonomy is assigned per task from its reversibility, reach and
verifiability, work moves between agents as files under a status protocol that forbids
self-acceptance, and team size is bounded by a review-attention budget. We apply it to an
illustrative ADC characterization task and to two AI-assisted publication projects whose
logs and repositories record 13 defects; mechanical checks caught every mechanically
checkable defect, and one quality score that no computation produced escaped every control. The ratio of
planning to execution agents follows from review costs, not a rule. Implication: measure
review load and escape rate before scaling a team.

**Sections:**
1. Abstract.
2. Introduction: stakes (adoption outpacing practice), gap, 4 contributions, roadmap.
3. Background and Related Work: agents and multi-agent frameworks; AI for science
   automation; LLMs in EDA; levels of automation and supervisory control; automation
   bias, LLM failure modes and verification. Summary table comparing approaches.
4. The Orchestration Framework: definitions; roles; autonomy levels and assignment rule
   (with monotonicity); failure modes and controls; handoff protocol and provenance rule;
   attention budget, span of control, ratio, escape model; dependencies and critical path;
   design rationale and rejected alternatives.
5. Case-Study Evaluation: method (RQ1-RQ3, data, coding); Case A illustrative ADC ENOB
   task; Case B textbook pipeline; Case C MicroSims paper; cross-case defect analysis.
6. Discussion: implications for researchers, advisors and groups, tool builders, venues;
   Limitations (7).
7. Conclusion and Future Work: 5 concrete directions.
Acknowledgments and AI disclosure.

**Figures:** see Figures plan (6). **Tables:** autonomy levels; roles; failure modes
and controls; related-work comparison; Case A autonomy assignment; Case B pipeline
stages and counts; cross-case defect log.

**Target length:** 14-18 pages. **Outline reviewed by the author:** No (batch run).
