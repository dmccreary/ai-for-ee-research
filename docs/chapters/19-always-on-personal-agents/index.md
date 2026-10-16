---
title: "Always-On Personal Agents for Research"
description: "A survey of always-on personal agents that keep their own cloud computer, sign in to tools for you, and work while you are away: Grok Bot, Dots, Muse, Claude Cowork, OpenClaw, and Hermes Agent, with durable criteria for comparing and selecting them and for auditing their activity."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 11:17:27"
version: 1.11
---

# Always-On Personal Agents for Research

## Summary

This chapter covers a new class of always-on personal agents that keep their own cloud computer, sign in to tools for you, and work while you are away. It examines Grok Bot, Dots, Muse, Claude Cowork, OpenClaw, and Hermes Agent, then the risks and criteria that matter: blast radius, usage metering, data exposure, claim verification, and overnight audits. It also connects the personal knowledge graph from Chapter 6 to agent memory and examines its privacy. After this chapter you can compare and select a personal agent for your research.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Personal Agent | 60 |
| Always-On Agent | 40 |
| Cloud Agent Computer | 26 |
| Self-Hosted Agent | 9 |
| Teachable Routine | 5 |
| Delegated Sign-In | 9 |
| Grok Bot | 4 |
| Dots | 4 |
| Muse | 4 |
| Claude Cowork | 4 |
| OpenClaw | 4 |
| Hermes Agent | 4 |
| Agent Blast Radius | 2 |
| Usage Metering | 2 |
| Agent Comparison Criteria | 3 |
| Vendor Claim Verification | 1 |
| Agent Data Exposure | 2 |
| Overnight Activity Audit | 1 |
| Personal Agent Selection | 1 |
| Knowledge Graph Memory | 1 |
| Personal Knowledge Privacy | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 3: Choosing Models and Writing Clear Prompts](../03-models-and-prompt-basics/index.md)
- [Chapter 6: Knowledge Bases, Personal Knowledge Graphs, and the Anatomy of an Agent Skill](../06-knowledge-bases-skill-anatomy/index.md)
- [Chapter 8: Agents, Tool Use, and Subagents](../08-agents-tool-use-subagents/index.md)
- [Chapter 9: Supervising Agents and Defining Agent Roles](../09-supervising-agents-roles/index.md)
- [Chapter 10: Orchestrating Teams of Planning and Execution Agents](../10-orchestrating-agent-teams/index.md)
- [Chapter 17: Verification and Reproducibility](../17-verification-reproducibility/index.md)
- [Chapter 18: Responsible and Ethical Use of AI](../18-responsible-ethical-use/index.md)

!!! mascot-welcome "An Agent That Works While You Sleep"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The agents in this chapter are the ones that keep working after you close the laptop, with sign-ins to your accounts. That is exactly why they deserve a flock-dog's suspicion. You will leave with criteria that outlast any product name, and a way to audit what happened last night. Trust, but verify!

!!! warning "Read this as a snapshot of October 2026"
    The product facts in this chapter come from the research notes in the [Personal Agents appendix](../../appendices/personal-agents/index.md), gathered on October 15, 2026. Nearly all claims are stated by vendors or reported in the press, and the notes found no independent benchmarks or controlled tests of these products. Prices, tiers, and features changed within weeks of launch. The chapter's purpose is the criteria for comparing agents, which will outlast the facts. Check each vendor's own pages before relying on any detail here.

## What Makes an Agent Personal and Always-On

Chapters 8 to 10 treated agents as tools you start, supervise, and stop. A **personal agent** is an AI agent that is set up once for one person, remembers their context, and carries out multi-step work on their behalf: signing in to services, running routines, and returning with a result or a question. An **always-on agent** is a personal agent that continues to run when you are not present, so that work proceeds overnight, between meetings, or while you are in the lab. The label describes where the process runs and how long it lives, not how capable the model is.

Four properties distinguish the class from the session-based assistants of earlier chapters, and each one changes the risk.

A **cloud agent computer** is a machine, in the vendor's data center, assigned to you or your agent, with its own browser, files, and terminal, which keeps running when your own computer is off. It is the reason the agent can work in your absence, and it means your files and sessions live on someone else's hardware. A **self-hosted agent** is the alternative: the agent software runs on a machine you control, a laptop, a server, or your own cloud account. You gain control over where the data go and what the agent can reach, and you take on the setup, security, and maintenance.

**Delegated sign-in** is the agent's ability to log in to websites and services as you, using credentials or sessions you have given it. It lets an agent use tools that have no programming interface, which is its value, and it means the agent holds the keys to your accounts. A **teachable routine** is a task that you show the agent once, which it saves and runs again later without being shown. It is convenient and has a hidden fragility: a routine recorded against a web page may break silently when the page changes.

!!! mascot-thinking "A Long-Lived Principal With Keys"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of what has changed since Chapter 8. A session agent had the permissions you gave it for an afternoon. An always-on agent holds standing access to your accounts, remembers across weeks, and acts when nobody is looking. The same questions apply, but the answers must hold for months, not minutes.

## The Products of 2026

The agents named in this chapter arrived within roughly two months of each other in mid-2026. The summary below is from the appendix, restricted to what bears on research use. Each statement is attributed to the vendor or press source, not independently verified.

**Grok Bot** was announced by SpaceXAI on August 11, 2026, as an early-beta cloud service, and appears to be a joint product of xAI and Cursor. Each user gets a persistent cloud computer with a browser, files, and a terminal. Bots sign in to websites and apps, including those with no API or MCP integration, save routines that you teach them, and keep memory across conversations. Several bots can share a group chat and hand work to each other, with a manager bot delegating to specialists. Analysts have raised the point that isolation is per user and not per bot, so all of a user's bots share one computer with its files, browser, and logins. The notes also record that retention defaults, credential handling, and audit records are undocumented, and that the vendor of one underlying service warns that an hourly routine can use a week of usage in a day.

**Dots** was introduced by OpenAI at its developer conference on September 29, 2026, as a personal agent inside ChatGPT. A dot runs in the background with its own cloud computer and browser, can use the apps already connected to ChatGPT, and can delegate coding to Codex. You can open its computer to watch it, and it can message you with questions. OpenAI states that passwords used for sign-in are not exposed to the underlying model, that background research uses read-only access, and that users can write custom approval rules. Each eligible user has one primary dot at launch, with teams of dots described as planned. The notes record conflicting reports on its price.

**Muse** was launched by Meta on September 8, 2026, in the United States for users aged 18 and over, as an app that also runs inside WhatsApp. It is aimed at everyday tasks. Each user's agent runs in its own cloud virtual machine. A permission layer decides whether each action is allowed, blocked, or sent for approval, each purchase needs approval showing exact details, and the user can watch the agent's browser and read an activity log. Memory is stored as editable text files. Training on user data is on by default, with an opt-out. Its integrations are narrower than those of the developer-oriented tools.

**Claude Cowork** from Anthropic became generally available on April 9, 2026. It is a tab in the Claude desktop application in which the model reads your files, runs multi-step tasks, and uses plugins and MCP connectors. It is included in existing paid Claude plans, and the notes record that agentic tasks use allowances several times faster than ordinary chat. A source from March 2026 reports that scheduled tasks require the computer to be awake with the application open, which made it the least always-on of the commercial products. That may have changed since. Enterprise plans have role-based access control and spend limits, and one source notes that its activity was not yet captured in audit logs.

**OpenClaw** is an MIT-licensed, self-hosted agent that lives in chat applications. You choose the model, including a local one, and model usage is the main cost. Reviews recorded in the notes report runaway loops, malicious skills, and unattended deletions. **Hermes Agent**, from Nous Research and public since February 25, 2026, is also MIT-licensed, runs on a laptop, server, or cloud sandbox, supports many model providers, and has a learning loop that writes its own skills. With both, you manage your own servers, secrets, and security. The press has described Grok Bot as a user-friendly OpenClaw, which captures the trade: hosted and managed, in exchange for openness and control.

| | Grok Bot | Dots | Muse | Claude Cowork | OpenClaw / Hermes Agent |
|---|---|---|---|---|---|
| Runs where | Vendor cloud computer shared by your bots | Own cloud computer and browser | Dedicated cloud VM per user | Mostly local, with connectors | Your laptop, server, or cloud |
| Always-on | Yes | Yes | Yes | Needed the computer awake (March 2026 source) | Yes, if you host it |
| Multi-agent | Yes, manager and specialists | One dot now, teams planned | One agent | Single session | Build your own |
| Model | Undisclosed | Vendor's own | Vendor's own | Claude | Any |
| Open source | No | No | No | No | Yes (MIT) |

*Table 1. A condensed comparison drawn from the appendix, vendor-stated as of October 15, 2026.*

## Risks That Define the Criteria

The six products differ in many details, and the details will change. What persists are the questions a researcher should ask of any such agent. Each is introduced by the risk behind it.

**Agent blast radius** is the extent of what an agent can read, change, or send if it is compromised, misdirected by injected text, or simply wrong. It is set by the access the agent holds and by how that access is partitioned. A design in which all of a user's bots share one computer and one set of logins has a blast radius equal to everything that computer can reach, and a single bad action by one bot is an action by all of them. The remedies are those of Chapter 8 and Chapter 9: least privilege, separate accounts or machines for separate risks, and approval for consequential actions.

**Usage metering** is how a product counts and bills what the agent consumes. Agentic work uses far more tokens than chat, as the loop arithmetic of Chapter 9 showed, and a routine that runs hourly multiplies it. Allowances that are unpublished or shared across products make cost hard to predict. Ask how usage is counted, what the cap is, what happens at the cap, and whether you can see consumption as it accrues.

**Agent data exposure** is what happens to the data you give the agent: whether it is used for training, how long it is kept, who can see it, where it is processed, and whether memory can be inspected and deleted. Defaults differ. At least one of the products trains on user data by default with an opt-out. The data classification of Chapter 18 applies directly: unpublished results and obligated data do not go to a hosted agent without the approvals that class requires.

**Vendor claim verification** is the practice of testing a claim before relying on it, which here matters more than usual because the evidence base is vendor statements. The method is the verification of Chapter 17 applied to a product: find the vendor's documentation for the claim, then test it hands-on with synthetic data and a throwaway account. For a claim such as "the agent asks before sensitive actions", create a harmless sensitive action and see whether it asks. For "passwords are not exposed to the model", read what the vendor documents about how, and test what the agent can and cannot see.

A last criterion belongs to the researcher's own side of the arrangement. An **overnight activity audit** is the review, each morning, of what the agent did while you were away. It is the audit trail of Chapter 17 and the log review of Chapter 9, practised as a routine. The questions are: what did it do, was each action within the task it was given, what did it spend, and did anything leave your control? An agent whose activity you cannot review is one you should not leave alone with anything that matters.

!!! mascot-warning "Shared Logins Share Failures"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is giving a multi-agent product the sign-ins to everything on the grounds that the helpers are all yours. The danger is that one agent that reads a hostile page or makes one bad judgment acts with every credential on the shared computer. Give each agent the least access its job needs, use a separate account where you can, and keep research-critical accounts out of reach.

The following MicroSim practices the translation from a worry to the criterion that addresses it, which is the skill that survives the next product launch.

#### Diagram: Personal Agent Comparison Criteria Matcher

<details markdown="1">
<summary>Personal Agent Comparison Criteria Matcher</summary>
Type: microsim
**sim-id:** agent-comparison-criteria-matcher<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/ai-persona-testing/tree/main/docs/sims/agent-autonomy-boundary<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of eight questions about a personal agent under the comparison criterion it addresses, with at least 7 of 8 correct.

**Prerequisites:** agent blast radius, usage metering, agent data exposure, vendor claim verification, overnight activity audit, cloud agent computer, self-hosted agent, and the approval model, all defined in the sections "What Makes an Agent Personal and Always-On" and "Risks That Define the Criteria" above.

**Evidence of Mastery:** For each of eight questions the learner commits one of eight criteria. A classification is correct when it equals the answer in Content. Mastery is at least 7 of 8 correct on the first attempt. Reading the list of criteria is exploration and is not evidence.

**Misconceptions:** (1) A comparison is about features and price only. (2) A vendor's statement about safety is itself the verification. (3) Where an agent runs is the same as what it can reach.

**Instructional Rationale:** Understand-level classification needs the learner to explain what a question is really asking. The criteria are durable across products, so the skill transfers to agents that do not exist yet.

**Content:**

The eight criteria are: Where it runs, Blast radius, Approval model, Usage metering, Data exposure, Memory, Claim verification, and Activity audit.

| # | Question a researcher should ask | Correct criterion | Why (shown as feedback) |
|---|---|---|---|
| 1 | Does the agent run on my laptop, in the vendor's cloud, or on a server I manage? | Where it runs | It asks about the location of the computation and the data. |
| 2 | If one agent is compromised, can it reach the files and logins of my other agents? | Blast radius | It asks how far a failure can spread. |
| 3 | Which actions does it take alone, which does it ask me about, and can I add my own rules? | Approval model | It asks about the policy that decides what needs a human. |
| 4 | What does my bill look like if an hourly routine runs all week? | Usage metering | It asks how consumption is counted and capped. |
| 5 | Are my inputs used for training by default, and for how long are they kept? | Data exposure | It asks what happens to the data given to the agent. |
| 6 | Can I see and edit what the agent remembers between sessions? | Memory | It asks about the inspectability and control of persisted context. |
| 7 | Has anyone other than the vendor tested the claim that it does what is advertised? | Claim verification | It asks for independent evidence behind a claim. |
| 8 | What record of last night's actions will I have in the morning? | Activity audit | It asks about the log available for review. |

**Provenance:** The criteria are from the section "Risks That Define the Criteria" of this chapter. The questions are invented for illustration and do not describe any one product.

**Rules:** Each question maps to exactly one criterion. The sim must shuffle the order of the criteria for each learner.

**Learner Activity:**

1. The learner reads question 1 and the eight criteria.
2. The learner chooses one criterion and submits.
3. The sim shows whether it was correct and the "Why" sentence.
4. After question 8, the sim shows the count correct and a one-line test for each criterion that the learner could run on a real product.

**Feedback:** Eight questions, one attempt each, in a fixed order. Correct: "Correct: <criterion>." plus the "Why" sentence. Incorrect: "This asks about <criterion>." plus the "Why" sentence. The correct criterion is always revealed after the single attempt. A final score "n of 8 correct" is shown with whether the mastery threshold of 7 was met.

**Starting State:** Question 1 is shown with the eight criteria and none chosen. The question on screen is "Which criterion does this question test?"

**Chapter Anchors:** The chapter states criteria for where an agent runs, its blast radius, its approval model, usage metering, data exposure, memory, verification of vendor claims, and overnight activity audit.
</details>

<iframe src="../../sims/agent-comparison-criteria-matcher/main.html" height="562px" width="100%" scrolling="no"></iframe>

*MicroSim: Personal Agent Comparison Criteria Matcher. [Open it fullscreen](../../sims/agent-comparison-criteria-matcher/main.html).*

## Memory, the Knowledge Graph, and Privacy

An always-on agent is only as useful as what it remembers. **Knowledge graph memory** is the use of a personal knowledge graph, as built in Chapter 6, as the persistent memory of an agent: its entities and typed relationships supply the facts, projects, papers, experiments, and people, and the agent queries it instead of relying on whatever a vendor's memory feature retained. The arrangement has three advantages for a researcher. The memory is *yours*: it lives in files you control, under version control, and it survives a change of agent or vendor. It is *inspectable*: you can read and correct it, which cannot be said of an opaque store. And it is *structured*: the agent can answer multi-hop questions, such as which results depend on a dataset that has been withdrawn, by following relationships, as in the graph RAG of Chapter 6.

**Personal knowledge privacy** is the control of what an agent may read from that graph, and what it may learn. The personal knowledge graph research that this book draws on makes the point in its own terms: a graph of personal and work knowledge raises ownership questions, and sharing needs role-based access, with permissions granted to roles and named subgraphs and not to individuals. Applied here, the graph is partitioned into subgraphs by the data classes of Chapter 18, and each agent is given read access to the subgraphs its job needs. A literature agent reads the paper and concept subgraph. It does not read the subgraph of unpublished measurements. A writing agent reads the claims and results it is drafting from. None needs the contracts, credentials, or participant data.

Two rules follow. Keep the master graph where you control it and give agents *views* of it, so that the agent's memory is a copy that can be discarded. And treat what an agent writes into memory as a proposal that you review, as with entity extraction in Chapter 6, because a wrong or injected statement stored as memory persists and reappears in later sessions.

## Selecting an Agent

**Personal agent selection** is the decision to adopt a particular agent, or to adopt none, for a stated use. The path from criteria to a decision is a short procedure.

1. *State the use.* Write the specific task, the data classes involved, and the harm if it goes wrong. A nightly literature sweep over public sources is a different decision from an agent with access to simulation results and licensed tools.
2. *Weigh the criteria for that use.* Not every criterion matters equally. For a task on public data, usage metering and reliability may dominate. For any task near unpublished or obligated data, where it runs and data exposure decide the outcome, and the answer may be a self-hosted agent or no agent.
3. *Check reach against your tools.* Research workflows in electrical engineering often depend on long simulations, licensed design tools, and lab instruments. Establish by test, not by assumption, whether the agent can reach them at all, and whether the license terms allow it.
4. *Verify the claims that matter.* Test the approval, isolation, and data-handling claims with synthetic material and a throwaway account.
5. *Start small and supervise.* Begin with a narrow, reversible task at a low autonomy level from Chapter 9, review the overnight audit for two weeks, and widen scope only on evidence.

The notes record unresolved questions that should shape this procedure: which of these agents can reach long simulations, licensed EDA tools, and lab data; what each does with sensitive or unpublished data; and how a group should audit overnight activity. These are the questions to put to any product.

## Auditing Overnight Activity

An overnight activity audit is a practical skill. The log of an always-on agent is a list of timestamped actions, and the task is to compare each with the task the agent was given. The second MicroSim practises this on an invented log.

#### Diagram: Overnight Activity Audit

<details markdown="1">
<summary>Overnight Activity Audit</summary>
Type: microsim
**sim-id:** overnight-activity-audit<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** examine<br/>
**Learning Objective:** The learner will examine ten lines of an agent's overnight activity log against a stated task and permission list, and flag each as in scope or out of scope, with at least 9 of 10 correct.

**Prerequisites:** overnight activity audit, agent blast radius, and least privilege, defined in the section "Risks That Define the Criteria" above and in Chapter 9.

**Evidence of Mastery:** For each of ten log lines the learner commits "in scope" or "out of scope". A classification is correct when it equals the answer in Content. Mastery is at least 9 of 10 correct on the first attempt. Reading the task statement is exploration and is not evidence.

**Misconceptions:** (1) An action that looks helpful is in scope. (2) Reading a file is harmless. (3) An action that is allowed by the platform is allowed by the task.

**Instructional Rationale:** Analyze-level work needs the learner to compare each action with an explicit boundary. Some out-of-scope actions look benign, such as reading a file, so that scope and not apparent harm is the criterion.

**Content:**

The task and permissions shown to the learner are: "Each night, search arXiv for new papers on SAR ADC calibration and append their titles to docs/reading-queue.md. Allowed: web search, fetching public web pages, and writing to docs/reading-queue.md. Not allowed: reading or writing any other file, signing in to any service, sending messages, installing software, or purchases." The log is invented and labeled "illustrative log".

| # | Time | Logged action | Correct classification | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | 01:00 | web_search: "SAR ADC calibration" arXiv | In scope | Web search is allowed. |
| 2 | 01:02 | web_fetch: arxiv.org/abs/ listing page | In scope | Fetching a public page is allowed. |
| 3 | 01:04 | write_file: docs/reading-queue.md (+6 lines) | In scope | The one file the task may write. |
| 4 | 01:05 | read_file: data/raw/capture-07.csv | Out of scope | Reading any other file is not allowed, even if it is harmless. |
| 5 | 01:06 | sign_in: publisher site using a stored credential | Out of scope | Signing in to a service is not allowed. |
| 6 | 01:08 | web_fetch: blog.example.net/post | In scope | Fetching a public page is allowed. |
| 7 | 01:09 | send_message: lab chat channel, "found 6 new papers" | Out of scope | Sending messages is not allowed. |
| 8 | 01:10 | write_file: docs/reading-queue.md (+2 lines) | In scope | The one file the task may write. |
| 9 | 01:15 | install_package: pdf-tools | Out of scope | Installing software is not allowed. |
| 10 | 01:20 | add_to_cart: "Conference proceedings, 45 dollars" | Out of scope | Purchases are not allowed, and this one leaves your control. |

**Provenance:** The audit procedure is from the sections "Risks That Define the Criteria" and "Auditing Overnight Activity" of this chapter. The task and log are invented for illustration.

**Rules:** An action is in scope when it is covered by the Allowed list for the task and out of scope otherwise. Each line has exactly one correct classification.

**Learner Activity:**

1. The learner reads the task, the allowed and not-allowed lists, and log line 1.
2. The learner chooses "in scope" or "out of scope" and submits.
3. The sim shows whether it was correct and the "Why" sentence, and for an out-of-scope action names the control (permission rule, sandbox, or approval gate) that would have prevented it.
4. After line 10, the sim shows the count correct and the out-of-scope actions as a morning report.

**Feedback:** Ten lines, one attempt each, in a fixed order. Correct: "Correct." plus the "Why" sentence. Incorrect: "This line is <classification>." plus the "Why" sentence. The correct classification is always revealed after the single attempt. A final score "n of 10 correct" is shown with whether the mastery threshold of 9 was met.

**Starting State:** The task statement and log line 1 are shown. The question on screen is "Did the agent stay inside the task?"

**Chapter Anchors:** The chapter states that an audit compares each action with the task given, asks whether anything left your control, and that an agent whose activity cannot be reviewed should not be left alone with anything that matters.
</details>

<iframe src="../../sims/overnight-activity-audit/main.html" height="702px" width="100%" scrolling="no"></iframe>

*MicroSim: Overnight Activity Audit. [Open it fullscreen](../../sims/overnight-activity-audit/main.html).*

!!! mascot-tip "Test With a Throwaway Account"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before an always-on agent touches anything real, give it a fresh account with synthetic data and a task whose correct result you know. Plant one trap, such as a harmless action that should need approval, and see whether the agent stops. A product that passes this has earned a second, slightly larger trial.

## Summary and Key Takeaways

Always-on personal agents extend the supervision problem of the earlier chapters to standing access and unattended work. The products will change before the book does. The criteria, the data classes, the approval and audit habits, and a memory you own are what carry over.

The main points to carry forward:

- **A personal, always-on agent** has a cloud computer or your own host, **delegated sign-in**, memory, and **teachable routines**, and works when you are away.
- **Grok Bot, Dots, Muse, Claude Cowork, OpenClaw, and Hermes Agent** differ in where they run, how they ask for approval, how many agents they support, and what they cost. Almost all claims are vendor-stated and untested by independent parties.
- **Blast radius, usage metering, and data exposure** are the three risks that most distinguish the class. **Vendor claim verification** and **overnight activity audits** are your counter-measures.
- **Agent comparison criteria** such as where it runs, blast radius, approval model, metering, data exposure, memory, claim verification, and audit are durable across products.
- **Knowledge graph memory** keeps the agent's memory in your files. **Personal knowledge privacy** partitions the graph by data class and gives agents views, not the master.
- **Personal agent selection** follows the use: state it, weigh criteria, check reach, verify claims, and start small.

!!! mascot-celebration "Criteria That Outlast the Product Names"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now translate a worry about an always-on agent into the criterion that answers it, partition a knowledge graph so that an agent sees only what its job needs, and audit a night's log against a task. Those are the skills that will apply to whatever launches next month.

The final chapter pulls the whole book together in case studies and a capstone project. Round up everything you have built so far, and bring it.

[See Annotated References](./references.md)
