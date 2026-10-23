# arXiv Submission Metadata: researcher-as-orchestrator

Paste these into the arXiv submission form. They must match the PDF exactly.

**Title:** From Researcher to Orchestrator: Attention-Bounded Supervision of AI Agent Teams in Engineering Research

**Authors:** Dan McCreary

**Primary category:** cs.HC

**Cross-list categories:** cs.MA, cs.CY

**Comments:** 26 pages, 6 figures, 7 tables

**License:** CC BY 4.0 (Creative Commons Attribution 4.0 International)

**MSC / ACM class:** H.1.2; I.2.11

**Journal-ref / DOI:** none (not yet published; this is a research paper, not a position or review paper)

## Abstract (plain text, at most 1,920 characters)

Researchers in electrical and computer engineering increasingly delegate literature search, coding, data analysis and drafting to AI agents, yet practices for supervising several agents at once lag behind adoption, and the researcher remains accountable for every claim. Existing multi-agent frameworks and levels-of-automation models do not tell a researcher how much autonomy to grant a task, how work should pass between agents, or how many agents one person can supervise. This paper presents an orchestration framework that answers these questions. Each task's autonomy level is set from three properties of its effects (reversibility, reach and verifiability) by a rule that is complete and monotone. Work passes between agents as version-controlled files that no agent may mark as accepted when it produced them, and every reported number must name the computation that produced it. A review-load model bounds team size by the researcher's daily attention and shows that the ratio of planning to execution agents follows from their review costs rather than being fixed. We apply the framework to an illustrative analog-to-digital converter characterization task and to two AI-assisted publication projects, a 20-chapter textbook and an arXiv paper, whose logs and repositories record 13 defects. Mechanical checks caught every defect for which one existed, errors of meaning were caught only when someone recomputed or read the work, and a quality score that no computation had produced escaped every control and was published. The results suggest measuring review load and escaped defects before enlarging an agent team.

(1,628 characters, 244 words.)

## Category rationale

- **cs.HC (primary).** The core contribution is a model of human supervision of AI
  agents: an autonomy assignment rule, a separation-of-acceptance protocol, and a
  review-attention budget that plays the role of fan-out in human supervisory control.
  Human-computer interaction reviewers are the right judges of that.
- **cs.MA (cross-list).** The framework organizes teams of planning, execution and
  reviewer agents and relates to multi-agent LLM frameworks.
- **cs.CY (cross-list).** The paper addresses research integrity, accountability and
  disclosure of AI use in science.
- **Position/review-paper rule (since 31 Oct 2025).** The paper is framed and written as
  a research paper: it states research questions (RQ1 to RQ3), a multiple-case method, and
  evidence from repository records and logs, including a coded table of 13 defects. It is
  not a survey or an opinion piece, so the rule that CS position and review papers must
  first pass peer review should not apply. If moderators judge otherwise, two options:
  make **cs.CY** the primary category (research on technology's impact on society is
  exempt), or post to **TechRxiv**, which suits the electrical-engineering audience.
- **Endorsement.** If the author has not submitted to cs.HC before, arXiv may ask for an
  endorsement from an established cs.HC author.

## Pre-submission checklist

- [x] `./build.sh arxiv` passes the clean-folder test compile (Tectonic). arXiv itself
      compiles with pdfLaTeX, which was not available locally; the source is ASCII-only
      and uses no engine-specific packages.
- [x] `score_paper.py`: every script-visible hard gate passes (see quality-report.md)
- [x] Every reference verified (52 DOIs resolved; 11 web or book sources checked by hand)
- [x] Title, authors and abstract above match the PDF
- [x] License: CC BY 4.0, as the author requested
- [ ] Author has proofread the PDF, including every number taken from the project logs
- [ ] Endorsement obtained, if this is a first submission to cs.HC
