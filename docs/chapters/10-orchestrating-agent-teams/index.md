---
title: "Orchestrating Teams of Planning and Execution Agents"
description: "How a researcher coordinates a team of agents: work breakdown, task queues and dependencies, handoff protocols, review checkpoints and approval gates, span of control, and the limits of the 20-planning-agent, 10-execution-agent model."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 11:04:20"
version: 1.11
---

# Orchestrating Teams of Planning and Execution Agents

## Summary

This chapter develops orchestration: breaking work into tasks, queuing and prioritizing them, defining handoff protocols, and placing review checkpoints and human approval gates. It explains span of control, delegation, and the 20-planning-agent, 10-execution-agent model. After this chapter you can design a coordinated agent team and judge when scaling it stops paying off.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Agent Team | 29 |
| Orchestration | 8 |
| Orchestrator | 7 |
| Planning Agent Team | 5 |
| Execution Agent Team | 5 |
| Agent Ratio | 4 |
| Work Breakdown | 19 |
| Task Queue | 3 |
| Task Dependencies | 13 |
| Handoff Protocol | 1 |
| Shared Workspace | 4 |
| Conflict Resolution | 1 |
| Review Checkpoint | 12 |
| Human Approval Gate | 5 |
| Progress Tracking | 2 |
| Status Reporting | 1 |
| Task Prioritization | 2 |
| Researcher Attention | 3 |
| Delegation | 3 |
| Span of Control | 2 |
| Agent Specification | 4 |
| Plan Review | 2 |
| Plan Revision | 1 |
| Cost and Benefit | 2 |
| Scaling Agent Teams | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 4: Context Engineering and Advanced Prompting](../04-context-engineering-prompting/index.md)
- [Chapter 6: Knowledge Bases, Personal Knowledge Graphs, and the Anatomy of an Agent Skill](../06-knowledge-bases-skill-anatomy/index.md)
- [Chapter 8: Agents, Tool Use, and Subagents](../08-agents-tool-use-subagents/index.md)
- [Chapter 9: Supervising Agents and Defining Agent Roles](../09-supervising-agents-roles/index.md)

!!! mascot-welcome "Conducting, Not Typing"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Launching thirty agents is easy. Knowing what they should do, in what order, and how you will review thirty outputs is the actual work. This chapter gives you the arithmetic and the structure to do it. Trust, but verify!

## The Team and the Orchestrator

An **agent team** is a set of agents with defined roles that work toward one shared goal through explicit handoffs. **Orchestration** is the coordination of that work: deciding what is done, by which agent, in what order, with what checks, and what happens when something goes wrong. The **orchestrator** is whoever performs this coordination. In this book it is the researcher, who may be helped by an orchestrating agent that keeps the queue and drafts status reports, but who remains accountable for the result.

The book's working model divides the team into two groups. A **planning agent team** is a group of planning agents that explore, decompose, and specify: they survey literature, propose approaches, draft specifications and acceptance criteria, and critique each other's plans. An **execution agent team** is a group of execution agents that carry out specified tasks: they write code, run simulations and analyses, and prepare figures and text. The **agent ratio** is the number of agents in each group. The model used throughout this book is roughly 20 planning agents to 10 execution agents.

The reason for the two-to-one ratio is a property of the outputs, not a rule of nature. Planning output is cheap and reversible: a plan that turns out to be wrong costs a few minutes of reading and is discarded. It is therefore sensible to produce many plans in parallel and let you choose. Execution output changes files, consumes compute, and must be verified, and each unit of it costs more of your attention to check. So the execution side is kept smaller. The numbers are a design target and not a law. They should move with how much attention you have and how checkable your tasks are, as the arithmetic later in the chapter shows.

!!! mascot-thinking "Attention Is the Scarce Resource"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that nothing in the team's size is limited by compute or by the number of agents you may launch. The limit is the number of outputs you can responsibly read in a day. Everything in orchestration is a way of spending that attention where it prevents the most damage.

## Breaking Work Down

**Work breakdown** is the decomposition of a goal into tasks that are small enough to specify and to check, as in the task decomposition of Chapter 1. Each task in a breakdown should have an owner role, an input, an output, and an acceptance check. **Task dependencies** are the relations among tasks that say which must finish before another can start, because one needs the other's output. A **task queue** is the ordered list of tasks waiting to be done, with their status, usually kept as a plain file in the project so that agents and the researcher read the same record.

Dependencies determine how much a team can parallelize. A worked example uses nine tasks from the running ADC project, with illustrative durations in hours. Each task and its prerequisites:

| Task | Name | Duration (h) | Needs |
|---|---|---|---|
| T1 | Literature survey | 3 | none |
| T2 | Measurement procedure draft | 2 | T1 |
| T3 | ENOB script | 3 | T2 |
| T4 | Test suite | 2 | T2 |
| T5 | Simulation run | 4 | T3, T4 |
| T6 | Analysis | 2 | T5 |
| T7 | Figures | 1 | T6 |
| T8 | Report draft | 3 | T6 |
| T9 | Final assembly | 1 | T7, T8 |

*Table 1. A task queue with durations and dependencies.*

The tasks add up to 21 hours of work. With as many agents as you like, the project still cannot finish before the longest chain of dependent tasks, called the **critical path**. Here the chain T1, T2, T3, T5, T6, T8, T9 takes 3 + 2 + 3 + 4 + 2 + 3 + 1 = 18 hours. The test suite T4 can slip by one hour without delaying anything, and the figures T7 by two hours. Adding agents cannot shorten 18 hours. Only shortening a task on the critical path can, and even then the next-longest chain takes over: reducing T3 from 3 hours to 1 hour moves the finish to 17 hours, not 16, because the path through T4 then becomes critical.

#### Diagram: Task Dependency Critical Path Scheduler

<details markdown="1">
<summary>Task Dependency Critical Path Scheduler</summary>
Type: graph-model
**sim-id:** task-dependency-critical-path<br/>
**Library:** vis-network<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/statistics-course/tree/main/docs/sims/view-task-graph<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the earliest finish time, the critical path, and the slack of tasks in a nine-task dependency graph, and recalculate the project duration after one duration changes, with at least 4 of 5 answers correct.

**Prerequisites:** task dependencies, task queue, critical path, earliest finish, and slack, all defined in the section "Breaking Work Down" above.

**Evidence of Mastery:** For each of five questions the learner enters a value or selects a path. An answer is correct when it equals the answer in Content. Mastery is at least 4 of 5 correct on the first attempt. Dragging nodes or reading a task's details is exploration and is not evidence.

**Misconceptions:** (1) The project duration is the sum of all task durations. (2) Adding agents shortens any schedule. (3) Shortening a critical task always shortens the project by the same amount.

**Instructional Rationale:** Apply-level work needs the learner to carry out the forward-pass calculation on a real graph and then see how changing one duration moves the critical path.

**Content:**

The tasks, durations in hours, and prerequisites are those in the chapter's Table 1: T1 (3, none), T2 (2, T1), T3 (3, T2), T4 (2, T2), T5 (4, T3 and T4), T6 (2, T5), T7 (1, T6), T8 (3, T6), T9 (1, T7 and T8). The numbers are illustrative and labeled "illustrative" in the sim.

| # | Question | Answer | Why (shown as feedback) |
|---|---|---|---|
| 1 | What is the earliest finish time of T5, in hours? | 12 | T3 finishes at 8 and T4 at 7. T5 starts at the later, 8, and runs 4 hours. |
| 2 | Which tasks form the critical path? | T1, T2, T3, T5, T6, T8, T9 | The longest chain is 3 + 2 + 3 + 4 + 2 + 3 + 1 = 18 hours. |
| 3 | What is the slack of T4, in hours? | 1 | T4 could finish at 8 without delaying T5, which starts at 8. T4 finishes at 7, so its slack is 1 hour. |
| 4 | What is the project duration, in hours? | 18 | T9 starts when T8 finishes at 17, and takes 1 hour. |
| 5 | If T3 is reduced from 3 hours to 1 hour, what is the new project duration, in hours? | 17 | T3 then finishes at 6, but T4 finishes at 7, so T5 starts at 7 and the project ends at 17. |

**Provenance:** The method and the task table are from the section "Breaking Work Down" of this chapter. The durations are invented for illustration.

**Rules:** Earliest start of a task = the maximum earliest finish of its prerequisites, or 0 if none. Earliest finish = earliest start + duration. The project duration is the maximum earliest finish over all tasks. A task is on the critical path when its slack is 0, where slack = latest finish - earliest finish and the latest finish does not delay the project duration. Durations are whole hours.

**Learner Activity:**

1. The learner sees the graph with durations on the nodes and question 1.
2. The learner enters the number or selects the tasks and submits.
3. The sim shows the correct answer and highlights the relevant tasks and the forward pass of earliest start and finish times.
4. For question 5, the sim lets the learner change T3's duration and shows the new critical path.
5. After question 5, the sim shows the count correct. The learner should notice that cutting 2 hours from a critical task saved only 1 hour.

**Feedback:** Five questions, one attempt each, in a fixed order. Correct: "Correct." plus the "Why" sentence. Incorrect: the correct answer and the "Why" sentence. The correct answer is always revealed after the single attempt. A final score "n of 5 correct" is shown with whether the mastery threshold of 4 was met.

**Starting State:** The graph is shown with durations on the nodes and no times computed. The question on screen is "When can T5 finish?"

**Chapter Anchors:** The chapter's task table lists nine tasks totalling 21 hours, a critical path of 18 hours through T1, T2, T3, T5, T6, T8, and T9, and a project duration of 17 hours if T3 is reduced to 1 hour.
</details>

<iframe src="../../sims/task-dependency-critical-path/main.html" height="762px" width="100%" scrolling="no"></iframe>

*MicroSim: Task Dependency Critical Path Scheduler. [Open it fullscreen](../../sims/task-dependency-critical-path/main.html).*

## Handoffs, Shared Workspaces, and Conflicts

A **handoff protocol** is the agreed form in which work passes from one agent to the next. Chapter 9 listed what a handoff must contain: the goal, the inputs, the constraints, the acceptance criteria, the work done, and the open questions. The protocol makes this uniform: one file format, one location, and a small fixed set of status values. A minimal protocol uses five statuses: `queued`, `running`, `needs-review`, `accepted`, and `rejected`. An agent never marks its own work `accepted`. That status belongs to a reviewer agent, a script, or you.

A **shared workspace** is the common area where the team's files live. Because several agents may act at once, structure prevents collisions. Give each agent its own output directory, or its own Git branch, so that two agents never write the same file. Keep inputs read-only. Make merging an explicit step that goes through review, instead of letting agents write into the main line directly. The Git practices of Chapter 5 provide exactly this.

**Conflict resolution** is deciding what to do when two agents produce incompatible results, such as two analysis agents reporting different ENOB values for the same record, or two planning agents recommending different architectures. Averaging is rarely right. A sound procedure follows. Establish whether the disagreement is about *facts* or about *judgment*. For facts, trace each result to its inputs and method, and find the first point of divergence, which is usually a different assumption, window function, or file version. For judgment, ask a reviewer agent for the evidence on each side, then decide yourself. Whatever the outcome, record the decision and the reason in the decision log of Chapter 6, so that the conflict is not silently reopened.

!!! mascot-tip "Make the First Divergence Visible"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When two agents disagree, do not ask which is right. Ask each to list its inputs, settings, and file versions in a table, then compare the tables line by line. The disagreement almost always sits on one row, and finding it takes minutes.

## Review, Approval, and Researcher Attention

A **review checkpoint** is a defined point in the workflow at which output is examined before the next step uses it. A **human approval gate** is a review checkpoint at which a person must say yes before work continues. Checkpoints can be automated, for example a test suite or a check script, or performed by a reviewer agent. A gate requires you. The difference matters, because gates consume the scarce resource.

**Researcher attention** is the time and concentration you can give to reviewing in a day, and it is the binding constraint on the size of a team. It can be treated quantitatively. If a planning agent produces \( k_p \) outputs a day and each takes \( r_p \) minutes to review, and an execution agent produces \( k_e \) outputs taking \( r_e \) minutes, then for \( n_p \) planning agents and \( n_e \) execution agents the daily review load, with \( c \) minutes for resolving conflicts, is

\[
L = n_p\, k_p\, r_p + n_e\, k_e\, r_e + c.
\]

A worked example with illustrative numbers: 20 planning agents each give one output a day at 6 minutes each, 10 execution agents each give one output a day at 15 minutes each, and conflicts take 30 minutes. The load is \( 120 + 150 + 30 = 300 \) minutes, which is 5 hours. If you have 4 hours of attention, the team is too large for the attention available. Three remedies exist. Reduce the team. Increase the share of review handled by scripts and reviewer agents. Or review a *sample* of the cheapest, most reversible outputs and not all of them. Reviewing half of the planning outputs brings the load to \( 60 + 150 + 30 = 240 \) minutes, which is exactly 4 hours.

**Span of control** is the number of agents one orchestrator can supervise effectively. It is the attention budget divided by the review cost per agent. It is not fixed. A team of agents with machine-checkable outputs has a much wider span than a team whose outputs need a careful read.

#### Diagram: Orchestrator Review Load Calculator

<details markdown="1">
<summary>Orchestrator Review Load Calculator</summary>
Type: microsim
**sim-id:** orchestrator-review-load-calculator<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the daily review load of an agent team from its size and per-output review times, and adjust the team or the review fraction to fit a stated attention budget, in three challenges.

**Prerequisites:** researcher attention, span of control, review checkpoint, and the load formula \( L = n_p k_p r_p + n_e k_e r_e + c \), all defined in the section "Review, Approval, and Researcher Attention" above.

**Evidence of Mastery:** For each of three challenges the learner types a value and submits. A value is correct when it equals the answer in Content. Mastery is 3 of 3 correct. Changing the quantities in exploration mode is not evidence.

**Misconceptions:** (1) Review load grows only with the number of execution agents. (2) More agents always means more done. (3) Sampling review is the same as skipping review.

**Instructional Rationale:** Apply-level work needs the learner to carry out the load calculation and then use it to make a design decision, so that the formula becomes a planning tool.

**Content:**

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Planning agents n_p | 0 | 40 | 1 | 20 | agents |
| Execution agents n_e | 0 | 20 | 1 | 10 | agents |
| Planning outputs per agent per day k_p | 1 | 4 | 1 | 1 | outputs |
| Execution outputs per agent per day k_e | 1 | 4 | 1 | 1 | outputs |
| Review time per planning output r_p | 2 | 15 | 1 | 6 | minutes |
| Review time per execution output r_e | 5 | 30 | 1 | 15 | minutes |
| Conflict resolution c | 0 | 120 | 10 | 30 | minutes per day |
| Attention available | 1 | 8 | 0.5 | 4 | hours per day |
| Fraction of planning outputs reviewed | 0.25 | 1.0 | 0.25 | 1.0 | fraction |

The review load is L = (planning fraction reviewed) x n_p x k_p x r_p + n_e x k_e x r_e + c, in minutes.

Challenges, in this order. All use the default values except where stated.

| # | Challenge | Answer | Why (shown as feedback) |
|---|---|---|---|
| 1 | What is the daily review load in hours for the default team? | 5.0 | 20 x 1 x 6 = 120, plus 10 x 1 x 15 = 150, plus 30 is 300 minutes, which is 5.0 hours. |
| 2 | With attention fixed at 4 hours, 10 execution agents, and every planning output reviewed, what is the largest number of planning agents that fits? | 10 | 240 minutes minus 150 minus 30 leaves 60 minutes, and 60 / 6 = 10 planning agents. |
| 3 | With 20 planning agents and attention fixed at 4 hours, what is the largest fraction of planning outputs, from 0.25, 0.5, 0.75, 1.0, that can be reviewed? | 0.5 | At 0.5 the load is 60 + 150 + 30 = 240 minutes, which equals 4 hours. At 0.75 it is 270 minutes, which exceeds it. |

**Provenance:** The formula and the default numbers are from the section "Review, Approval, and Researcher Attention" of this chapter. All values are illustrative and labeled "illustrative" in the sim.

**Rules:** Load in minutes = fraction x n_p x k_p x r_p + n_e x k_e x r_e + c. The load fits when load <= attention x 60. All arithmetic is exact. Fractions of agents are not allowed.

**Learner Activity:**

1. The learner reads challenge 1 and enters the load in hours.
2. After each submission the sim shows the worked calculation and a bar comparing the load with the attention available.
3. After the three challenges, exploration opens: the learner changes any of the nine quantities and watches the bar. The learner should notice that halving review time on execution outputs has more effect than halving it on planning outputs.

**Feedback:** Three challenges, two attempts each, in a fixed order. Correct: "Correct." plus the worked calculation. Incorrect on the first attempt: "Check that each term is agents x outputs x minutes." Incorrect on the second attempt: the worked calculation is shown and the challenge counts as missed. A running count "n of 3 correct" is shown.

**Starting State:** The default team and attention of 4 hours are shown with the bar, and challenge 1 is posed. The question on screen is "How many hours of review does this team need each day?"

**Chapter Anchors:** The chapter states 20 planning agents and 10 execution agents, 6 and 15 minutes of review, 30 minutes of conflict resolution, a load of 300 minutes (5 hours) against 4 hours of attention, and a load of 240 minutes when half of the planning outputs are reviewed.
</details>

<iframe src="../../sims/orchestrator-review-load-calculator/main.html" height="752px" width="100%" scrolling="no"></iframe>

*MicroSim: Orchestrator Review Load Calculator. [Open it fullscreen](../../sims/orchestrator-review-load-calculator/main.html).*

## Specifying, Prioritizing, and Reporting

An **agent specification** is the written definition of one agent: its role, purpose, inputs, outputs, tools and permissions, autonomy level, stopping conditions, and the handoff format. It is the file that makes an agent reproducible, and it is where the roles of Chapter 9 become concrete. A compact specification for a planning agent, with illustrative content:

```markdown
# Agent: literature-planner
Role: planning agent
Purpose: propose a search strategy and a candidate reading list for a stated question.
Inputs: question statement (docs/question.md), glossary (docs/glossary.md).
Outputs: docs/plans/search-strategy.md, docs/plans/reading-list.md (status: needs-review).
Tools: web search, read files. No file writes outside docs/plans/.
Autonomy: level 2. Stops and asks when the question is ambiguous.
Handoff: acceptance criteria listed at the top of each output file.
```

**Plan review** is the examination of a plan before any execution begins. It is the highest-leverage review in the workflow, because a defect found in a plan costs minutes, while the same defect found after execution costs a rerun. Check a plan against the question: does it address the stated metric, are the tasks checkable, are the dependencies right, and is anything out of scope? **Plan revision** is the controlled change of a plan when new findings arrive. Revise by editing the plan file, noting what changed and why in the decision log, and re-queuing only the tasks whose inputs changed, which the dependency structure identifies.

**Task prioritization** is the choice of what goes first in the queue. Three considerations dominate: tasks on the critical path come first, tasks that unblock many others come early, and tasks that reduce uncertainty about the plan, such as a quick feasibility check, come before expensive ones that depend on it.

**Progress tracking** is the recording of each task's status in the queue, and **status reporting** is the periodic summary of that record for the researcher. A useful report is short and answers four questions: what finished, what is blocked and why, what needs your decision, and what has been spent. Ask an orchestrating agent to produce it from the queue and the logs each morning, and read it before you read anything else.

**Delegation** is handing a task to an agent along with the authority to carry it out. Delegate tasks that are well specified and checkable. Keep the framing of the question, the choice among approaches, and the final judgment of what is true. These are the parts of research that the agents' outputs only inform.

## Cost, Benefit, and the Limits of Scaling

**Cost and benefit** analysis for an agent team compares what the team saves with what it costs. The benefit is the work you would otherwise do by hand, expressed in hours. The costs are the review time, which is the dominant one and is paid in your attention, the compute and subscription cost of the agents, the setup effort to write specifications, and the cost of errors that escape review. A team is worth running when the saving, net of review, is large and the escape rate is low and known.

**Scaling agent teams** is adding agents to do more at once, and it pays off only while three limits are not binding. The first is attention: past the span of control, the added output is not reviewed, so it adds risk and not value. The second is dependencies: past the width of the dependency graph, added agents sit idle, as the critical-path example showed, where 21 hours of work still took 18. The third is coordination: more agents mean more handoffs, more potential conflicts, and more shared state to keep consistent. A reasonable discipline is to grow a team one role at a time, measure the review load and the escape rate at each size, and stop when an additional agent adds more review than it removes work.

!!! mascot-warning "More Agents Is Not More Done"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is launching a large team because launching is cheap. It happens because the cost shows up later, as a pile of unreviewed output. Size the team to your review budget first, and add an agent only when the queue shows idle capacity that review can absorb.

## Summary and Key Takeaways

Orchestration is the design of how work, checks, and decisions flow through a team of agents so that your attention goes where it prevents the most damage. The number of agents is the least important parameter. Dependencies, review cost, and the quality of handoffs set what the team can actually deliver.

The main points to carry forward:

- **An agent team** has planning and execution groups, and the 20-to-10 **agent ratio** reflects that plans are cheap to discard and executions are expensive to check.
- **Work breakdown** produces tasks with owners, outputs, and checks. **Task dependencies** set the critical path, which parallelism cannot shorten.
- **Handoff protocols, shared workspaces, and conflict resolution** use files, separate outputs, and a trace to the first divergence.
- **Review checkpoints** can be automated. **Human approval gates** consume your attention and belong where actions are irreversible or outward-bound.
- **Researcher attention** is quantifiable. Review load grows with team size and sets the **span of control**.
- **Agent specifications, plan review, and plan revision** make agents reproducible and catch defects when they are cheapest.
- **Prioritization, progress tracking, and status reporting** keep the queue and the researcher in step.
- **Scaling** is limited by attention, by dependencies, and by coordination, and you should stop adding agents when they add more review than they remove work.

!!! mascot-celebration "You Can Size a Team"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now compute a critical path and the slack on a task, estimate the daily review load of a team and fit it to your attention, and say why 20 planning agents and 10 execution agents is a design target and not a law. That is the arithmetic of orchestration.

The following chapters apply this machinery to the everyday tasks of research, starting with the literature. Round up the question you would give a planning team, and bring it.
