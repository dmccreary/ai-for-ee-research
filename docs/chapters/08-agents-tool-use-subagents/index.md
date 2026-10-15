---
title: "Agents, Tool Use, and Subagents"
description: "What makes an agent more than a chatbot: the agent loop, tool definitions and tool calls, file access, shell commands, code execution, the Model Context Protocol, sandboxing and permissions, hooks, and subagents with isolated context."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 11:01:12"
version: 1.11
---

# Agents, Tool Use, and Subagents

## Summary

This chapter explains what makes an agent more than a chatbot: the agent loop, tool calls and definitions, file access, shell commands, code execution, and the Model Context Protocol. It covers sandboxing, permissions, and subagents that work in parallel with isolated context. After this chapter you can describe what an agent can reach and set limits on it.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Tool Use | 430 |
| Agent Loop | 79 |
| Tool Call | 3 |
| Tool Definition | 2 |
| File Access | 98 |
| Shell Commands | 170 |
| Web Search | 8 |
| Web Fetch | 6 |
| Code Execution | 121 |
| Sandboxing | 116 |
| Permissions | 89 |
| Permission Modes | 64 |
| Model Context Protocol | 10 |
| MCP Server | 9 |
| External Data Sources | 2 |
| API Integration | 1 |
| Database Access | 1 |
| Scripts in Skills | 1 |
| Subagent | 34 |
| Parallel Agents | 1 |
| Agent Memory | 2 |
| Agent Hooks | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 2: How Language Models Work](../02-how-language-models-work/index.md)
- [Chapter 3: Choosing Models and Writing Clear Prompts](../03-models-and-prompt-basics/index.md)
- [Chapter 4: Context Engineering and Advanced Prompting](../04-context-engineering-prompting/index.md)
- [Chapter 6: Knowledge Bases, Personal Knowledge Graphs, and the Anatomy of an Agent Skill](../06-knowledge-bases-skill-anatomy/index.md)

!!! mascot-welcome "Where Words Become Actions"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Until now the model has only produced text. In this chapter it starts to read your files, run your scripts, and call other programs, and every one of those abilities is a boundary you set. You will leave able to say exactly what an agent can reach, and to narrow it. Trust, but verify!

## Tool Use and the Agent Loop

A language model by itself can only emit text. **Tool use** is the mechanism by which a model's text is turned into actions in the world: the model emits a structured request to use a named capability, a surrounding program carries it out, and the result is returned to the model as more text. Reading a file, running a script, searching the web, and querying a database are all tools. Tool use is what separates an agent from an assistant, in the sense defined in Chapter 1.

Two terms describe the two sides of the mechanism. A **tool definition** is the description of a tool given to the model: its name, a plain-language statement of what it does, and a schema of the arguments it accepts. A **tool call** is the model's structured request to use a tool, with specific argument values. It is essential to see who does what. The model never executes anything. It writes a tool call, a program called the *harness* runs the tool, and the harness puts the result into the context.

A tool definition and a tool call, in a common JSON form, make this concrete. In the definition, `name` identifies the tool, `description` is what the model reads to decide when to use it, and `input_schema` states the arguments and their types. In the call, `input` supplies the values for one use.

```json
{
  "name": "read_file",
  "description": "Read a text file from the project and return its contents.",
  "input_schema": {
    "type": "object",
    "properties": { "path": { "type": "string", "description": "Path relative to the project root" } },
    "required": ["path"]
  }
}
```

```json
{ "tool": "read_file", "input": { "path": "results/enob-sweep-2026-10-15.csv" } }
```

The **agent loop** is the cycle that these pieces form. The model receives the task and the tool definitions, decides on the next action, and emits a tool call. The harness runs it and returns the result. The model reads the result and decides again, and the loop repeats until the model judges the task complete, an error stops it, or a limit is reached. Each pass through the loop adds the call and its result to the context, so a long loop uses the window faster than a long conversation would.

| Step | Who acts | What happens |
|---|---|---|
| 1. Decide | Model | Reads the task, the context, and the tool definitions, then chooses an action |
| 2. Call | Model | Emits a tool call with arguments, or a final answer |
| 3. Run | Harness | Executes the tool, subject to permissions |
| 4. Observe | Harness to model | The result is added to the context |
| 5. Repeat or stop | Model | Loops to step 1, or stops when done or when a limit is reached |

*Table 1. One pass through the agent loop and who performs each step.*

The loop is why an agent can solve problems that a single prompt cannot. It can try something, see an error, and correct itself. It is also why errors compound: a wrong early observation shapes every later decision. The first MicroSim steps through a short loop so that you can predict the decision at each turn.

#### Diagram: Agent Loop Stepper

<details markdown="1">
<summary>Agent Loop Stepper</summary>
Type: microsim
**sim-id:** agent-loop-stepper<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** infer<br/>
**Learning Objective:** The learner will infer the agent's next tool call at each of five steps of a loop that diagnoses a low ENOB result, given the task and the results observed so far, with at least 4 of 5 correct.

**Prerequisites:** tool use, tool definition, tool call, agent loop, and the roles of the model and the harness, all defined in the section "Tool Use and the Agent Loop" above.

**Evidence of Mastery:** At each of five steps the learner commits one of three candidate next actions before the agent's actual choice is shown. A prediction is correct when it equals the action marked correct in Content. Mastery is at least 4 of 5 correct. Stepping forward after the reveal is exploration and is not evidence.

**Misconceptions:** (1) The model runs the tools itself. (2) The agent decides everything in one planning step and then executes. (3) An error result ends the loop.

**Instructional Rationale:** Understand-level inference needs the learner to predict from the observed results, so that the dependence of each action on the previous observation becomes visible. Committing before the reveal makes the learner's mental model testable.

**Content:**

Task shown at the start: "The ENOB of capture-07.csv is 6.1 bits but the converter should give about 9. Find out why." Tools available: read_file, run_python, list_files. The data are invented and labeled "illustrative".

| Step | Result observed so far | Candidate A | Candidate B | Candidate C | Correct | Why (shown as feedback) |
|---|---|---|---|---|---|---|
| 1 | Nothing yet. | list_files on the project root | run_python to recompute ENOB with a different formula | read_file on the paper draft | A | The agent knows nothing about the project, so it looks at what exists before acting. |
| 2 | Files: data/raw/capture-07.csv, scripts/enob.py, docs/spec.md. | read_file scripts/enob.py | read_file data/raw/capture-07.csv | list_files on data/raw | A | The result is computed by the script, so the method is the first thing to inspect. |
| 3 | enob.py computes SNDR over all FFT bins, including bin 0 (DC). | run_python to print the DC bin magnitude of capture-07.csv | rewrite enob.py without being asked | read_file docs/spec.md | A | A hypothesis has appeared (DC counted as noise), and a cheap measurement tests it before anything is changed. |
| 4 | DC bin magnitude is 40 times larger than the next-largest non-signal bin. | run_python to compute ENOB with the DC bin excluded, without editing the file | edit enob.py and overwrite the old result | report success | A | The agent tests the fix on a copy and compares, so the original file and result stay intact. |
| 5 | ENOB with DC excluded is 9.1 bits. | report the cause and the evidence, and propose the change for approval | silently apply the change to enob.py | rerun the capture | A | The task was to find why, and a change to the project file is the researcher's decision. |

**Provenance:** The loop structure is from the section "Tool Use and the Agent Loop" of this chapter. The files, results, and numbers are invented for illustration.

**Rules:** At each step exactly one candidate is correct, as marked. The correct candidate is the one that follows from the results observed so far and does not exceed the scope of the task.

**Learner Activity:**

1. The learner reads the task, the tools, and the results observed so far.
2. The learner chooses one of the three candidate next actions and submits.
3. The sim reveals the agent's actual action, then shows the harness executing it and the result being added to the context.
4. After step 5 the sim shows the count correct and the full loop as a list of calls and results.

**Feedback:** Five steps, one attempt each, in a fixed order. Correct: "Correct." plus the "Why" sentence. Incorrect: the correct action and the "Why" sentence. The correct action is always revealed after the single attempt. A final score "n of 5 correct" is shown.

**Starting State:** The task and the three tools are shown with no results yet. The question on screen is "What should the agent do first?"

**Chapter Anchors:** The chapter states that the model emits a tool call and the harness executes it, that results are returned to the context, and that the loop repeats until the task is complete or a limit is reached.
</details>

## Reaching Files, Shells, and Code

Most useful tools for research fall into a few families, and each one carries its own risk. It is worth taking each in turn, because the risk of an agent is the sum of what its tools can do.

**File access** is the ability to read, create, edit, and delete files. Reading is the most common and usually the safest. Writing changes the project and should be covered by version control, which turns an unwanted edit into a one-command undo. The scope matters: an agent confined to the project directory can do far less damage than one that can write anywhere your user account can.

**Shell commands** are commands run in your command line environment: `ls`, `grep`, `python`, `git`, and anything else installed. A shell tool is the most general and therefore the most dangerous tool, because it is an open door to everything the account can do. The same shell that runs `grep` runs `rm -rf`, `git push --force`, and a command that downloads and executes a script from the internet.

**Code execution** is the running of code that the agent itself wrote, such as a Python script that analyzes a dataset. It is the capability that makes an agent useful for data work, and it multiplies the risk of the shell, because the code is new and unreviewed when it runs. An agent-written script might delete a directory it was meant to clean, send data to a service, or run for hours.

A worked example of how to read a shell command before approving it: ask what it changes, whether the change can be undone, and who else is affected. Five commands that an agent might propose in the ADC project illustrate the range.

| Command | What it changes | Undoable? | Reasonable response |
|---|---|---|---|
| `ls results/` | Nothing, it only lists | Not applicable | Allow by pattern |
| `python scripts/enob.py data/processed/run07.csv` | Writes an output file | Yes, if results are in version control | Allow for scripts in the project |
| `rm -r results/old/` | Deletes a directory | Only from version control or backup | Ask, and check the path |
| `git push --force origin main` | Rewrites the shared history | Hard, and affects collaborators | Deny, or ask with a warning |
| `curl https://example.com/setup.sh \| sh` | Executes downloaded code | No | Deny |

*Table 2. Reading shell commands by their effect, reversibility, and reach.*

Code execution deserves a worked example of its own, because the code in question did not exist a minute ago. Suppose an agent proposes the following cleanup script. First, what it does: it visits every directory under `results/` and, if the directory name begins with `tmp`, deletes it and everything inside it.

```python
import shutil, pathlib

for d in pathlib.Path("results").iterdir():
    if d.is_dir() and d.name.startswith("tmp"):
        shutil.rmtree(d)
```

Reading it with the three questions above shows the problem. A directory named `tmp-final-figures`, which you kept deliberately, matches the pattern and is deleted without a trace, because `shutil.rmtree` does not use the trash. The fix is not to ban the script but to make it reviewable: print the list of directories it would delete first, require confirmation, and run it only on a clean working tree so that anything lost can be restored. A review of thirty seconds before the first run is the cheapest control in this chapter.

| Family | Typical use | Characteristic risk | Standard control |
|---|---|---|---|
| File reading | Load data, read notes | Exposing sensitive files to the context | Limit scope to the project |
| File writing | Edit scripts, save results | Overwriting good work | Version control, protect raw data |
| Shell commands | Run tools, inspect state | Destructive or irreversible commands | Permissions, command allow-lists |
| Code execution | Analysis, simulation | Unreviewed code with side effects | Sandbox, review before first run |
| Web search and fetch | Find and read pages | Prompt injection, unreliable sources | Treat results as untrusted |

*Table 3. Tool families, their risks, and the usual controls.*

**Web search** is a tool that submits a query and returns a ranked list of results, and **web fetch** is a tool that retrieves the content of a specific page. Together they extend an agent past its knowledge cutoff, which is their main value for research. They also bring in the untrusted text discussed under prompt injection in Chapter 4. A fetched page is data, and nothing in it is an instruction. Citations that come from a search should be verified against the source, as in Chapter 2.

## Sandboxing and Permissions

Two complementary controls decide what an agent may actually do. They answer different questions, and a sound setup uses both.

**Sandboxing** is the technical restriction of what a running process can reach, enforced by the operating system or a container, so that even a misbehaving command cannot exceed it. A sandbox limits the filesystem the process can see or write, the network it can connect to, and the resources it can consume. Its strength is that it does not depend on the agent's cooperation: a command that tries to read outside the allowed directory simply fails. Typical sandboxes are containers, virtual machines, and operating-system sandboxes built into the agent tool.

**Permissions** are the rules that decide whether a given tool call is allowed, requires your approval, or is denied. They work at the level of the harness: before running a call, the harness checks it against the rules. A permission rule can match a tool, a command pattern, or a path. Permissions are policy and sandboxing is enforcement, so permissions without a sandbox rely on the harness being configured correctly, and a sandbox without permissions gives you no say over actions that are permitted but unwise.

A permission policy is usually a short list of rules that match a tool and a pattern. The generic form below is illustrative, and each tool has its own syntax. Read the rules first as plain statements: reading anything in the project is allowed, running scripts from `scripts/` is allowed, deleting and pushing ask, and credentials and raw data are denied.

```text
allow  read   ./**
allow  edit   ./scripts/** ./docs/**
allow  run    python scripts/*
ask    run    rm *   pip install *   git push *
deny   read   ~/.ssh/**   ./.env
deny   edit   ./data/raw/**
deny   run    curl * | sh   sudo *
```

The sandbox then enforces what the policy cannot guarantee. Suppose the agent writes a script that tries to open a file in your home directory. Permissions might have missed it, because the command was `python scripts/helper.py`, which the rules allow. A sandbox that limits the process to the project directory makes the open fail regardless of what the policy said. The two controls catch different mistakes, which is why you want both.

**Permission modes** are preset overall postures for how much the agent may do without asking. Names differ between tools, but the pattern is consistent:

- *Ask for everything*: every file edit and command waits for your approval. Safest, and slow enough that people stop reading what they approve.
- *Auto-accept edits*: file edits inside the project proceed, while commands still ask.
- *Plan or read-only*: the agent may read and think but may not change anything, which is a good mode for the first look at an unfamiliar project.
- *Bypass*: all checks are disabled. Appropriate only inside a sandbox that has nothing of value to lose, and never on a machine that holds credentials.

A good working pattern is to pair a tight mode with a permissive allow-list for the safe, frequent commands, so that the approvals you are asked for are rare and therefore read. Approval fatigue is a real hazard: an agent that asks fifty times an hour trains you to click yes without reading.

!!! mascot-warning "Bypass Is Not a Productivity Setting"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is turning off all permission checks because the prompts are tedious. It happens because approval fatigue is real, and the cost of one destructive command is invisible until it lands. Fix the tedium instead: allow the safe, repeated commands by pattern, run in a sandbox, and keep the project under version control.

#### Diagram: Agent Permission Boundary Judge

<details markdown="1">
<summary>Agent Permission Boundary Judge</summary>
Type: microsim
**sim-id:** agent-permission-boundary-judge<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/ai-persona-testing/tree/main/docs/sims/agent-autonomy-boundary<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge, for each of ten proposed agent actions, whether a stated permission policy allows it, requires approval, or denies it, with at least 8 of 10 correct.

**Prerequisites:** file access, shell commands, code execution, sandboxing, permissions, and permission modes, all defined in the sections "Reaching Files, Shells, and Code" and "Sandboxing and Permissions" above.

**Evidence of Mastery:** For each of ten actions the learner commits one of three outcomes. An outcome is correct when it equals the outcome in Content under the stated policy. Mastery is at least 8 of 10 correct on the first attempt. Reading the policy is exploration and is not evidence.

**Misconceptions:** (1) Any action inside the project directory is safe. (2) A command is safe if it is common. (3) Approval is needed for everything that changes a file.

**Instructional Rationale:** Evaluate-level work needs the learner to apply stated criteria to cases. The policy has three outcomes so that the learner must weigh reversibility and scope and not choose between allow and deny only.

**Content:**

The policy shown is illustrative. Rules apply in this order, and the first match decides.

| Rule | Condition | Outcome |
|---|---|---|
| 1 | Reads or writes any path outside the project directory, or reads credentials or key files | Deny |
| 2 | Any command that downloads and executes code, or uses elevated privileges | Deny |
| 3 | Writes to data/raw/ | Deny |
| 4 | Deletes files, installs packages, pushes to a remote, or sends data over the network | Ask |
| 5 | Reads files in the project, or edits files in scripts/ or docs/, or runs a Python script from scripts/ | Allow |

| # | Proposed action | Correct outcome | Why (shown as feedback) |
|---|---|---|---|
| 1 | Read docs/spec.md | Allow | Rule 5: a read inside the project. |
| 2 | Edit scripts/enob.py to fix a bug | Allow | Rule 5: an edit in scripts/. |
| 3 | Run python scripts/enob.py data/processed/run07.csv | Allow | Rule 5: a script from scripts/. |
| 4 | Overwrite data/raw/capture-07.csv with a cleaned version | Deny | Rule 3: raw data is never written. |
| 5 | Run rm -r results/old/ | Ask | Rule 4: deletion is irreversible without version control, so it needs approval. |
| 6 | Run pip install scipy | Ask | Rule 4: installing a package changes the environment. |
| 7 | Run curl https://example.com/setup.sh \| sh | Deny | Rule 2: it downloads and executes unreviewed code. |
| 8 | Read ~/.ssh/id_ed25519 | Deny | Rule 1: it reads a credential file outside the project. |
| 9 | Run git push origin main | Ask | Rule 4: it sends project contents to a remote. |
| 10 | Edit ../other-project/notes.md | Deny | Rule 1: it writes outside the project directory. |

**Provenance:** The permission concepts are from the sections "Reaching Files, Shells, and Code" and "Sandboxing and Permissions" of this chapter. The policy and actions are invented for illustration, and the sim labels them "illustrative policy". The domain example.com is reserved for documentation.

**Rules:** Rules are evaluated in numeric order and the first matching rule decides the outcome. Each action matches exactly one rule as given.

**Learner Activity:**

1. The learner reads the policy and action 1.
2. The learner chooses Allow, Ask, or Deny and submits.
3. The sim shows whether it was correct, the matching rule number, and the "Why" sentence, then shows the next action.
4. After action 10, the sim shows the count correct and the actions that were Ask, and states that these are the approvals the researcher would see.

**Feedback:** Ten actions, one attempt each, in a fixed order. Correct: "Correct: <outcome>." plus the rule number and the "Why" sentence. Incorrect: "The policy gives <outcome>." plus the rule number and the "Why" sentence. The correct outcome is always revealed after the single attempt. A final score "n of 10 correct" is shown with whether the mastery threshold of 8 was met.

**Starting State:** The policy and action 1 are shown with no choice made. The question on screen is "What does the policy say about this action?"

**Chapter Anchors:** The chapter states that permissions are policy and sandboxing is enforcement, that actions outside the project, credentials, and downloaded code should be denied, that irreversible or outward-bound actions should need approval, and that raw data should be protected.
</details>

## Reaching Outside: MCP, Data Sources, and Skills With Scripts

An agent's built-in tools cover files, a shell, and the web. Research needs more: a lab database, a reference manager, a ticket tracker, a simulator's job queue. The **Model Context Protocol** (MCP) is an open standard that defines how an agent connects to external tools and data in a uniform way, so that a capability written once can be used by any agent that speaks the protocol. An **MCP server** is a program that exposes a set of tools, and sometimes data, over this protocol. The agent, as the client, discovers the server's tools and their definitions and then calls them like any other tool.

The benefit is reuse. Rather than building a custom integration for each agent, you run or install an MCP server for the service, and the tool definitions arrive in the standard form. The cost is a larger attack surface: every connected server is code that runs with some access, and its tool descriptions and results flow into the model's context. Treat a server like any dependency. Prefer ones you can read, give each the narrowest credentials that work, and know what it can reach.

Three kinds of connection are common in research. **External data sources** are read-only collections of information: a paper index, a standards database, a lab wiki. **API integration** is a connection to a service with an interface: a reference manager, a repository host, a job scheduler. **Database access** is the ability to query a database directly. For all three, the rule is least privilege. Give the agent a read-only credential unless the task requires writing, and scope it to the one schema or one project it needs.

**Scripts in skills** are the same idea inside the skill package of Chapters 6 and 7: a skill can include a script that the agent runs instead of doing a computation in its head. An exact calculation such as ENOB belongs in a tested script. The script is reviewed once, and the agent's job is to call it with the right arguments, which is a much smaller thing to get wrong.

## Subagents, Parallel Work, Memory, and Hooks

A **subagent** is a separate agent instance that a main agent starts to carry out one part of a task, with its own context window, and often with its own restricted set of tools. When it finishes, it returns a result, normally a summary, to the main agent. Two properties make subagents valuable. They isolate context: the five papers a subagent reads do not fill the main agent's window, and only the findings return. And they can run at the same time.

**Parallel agents** are subagents run concurrently on independent parts of a job. A worked example: you ask for a comparison of five SAR ADC papers. The main agent starts five subagents, each reading one paper and returning its design parameters and the sentences that support them. The main agent then merges the five results into a table. The wall-clock time is about that of one paper rather than five, and the main context holds five short results instead of five papers.

The costs are real. Each subagent consumes its own tokens, so total cost goes up even as time goes down. The summary a subagent returns is lossy, and an error inside a subagent is invisible unless the result is checked. Parallel agents that *write* to the same file can overwrite each other, so assign each its own output file, or keep parallel work read-only. These are the problems of orchestration, which Chapters 9 and 10 develop.

**Agent memory** is whatever persists across the agent's sessions. A model has none of its own, so memory is implemented as files: the project instruction file of Chapter 5, the knowledge base and session logs of Chapter 6, and files the agent writes to remember what it has learned. Memory in files is good for a researcher, because it is inspectable and editable. You can read what the agent remembers, correct it, and put it under version control.

**Agent hooks** are scripts that the harness runs automatically at defined moments, such as before a tool is used, after a file is edited, or when the agent stops. A hook is deterministic: unlike an instruction in a prompt, which the model may or may not follow, a hook always runs. This makes hooks the right tool for rules that must never be skipped, such as running the test suite after an edit, blocking any command that matches a dangerous pattern, or committing the work to version control when a session ends.

!!! mascot-thinking "Instructions Are Suggestions, Hooks Are Rules"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice the difference in kind. A line in an instruction file asks the model to behave. A hook makes the harness behave, whatever the model decides. When a rule matters enough that you would be unhappy to see it skipped once, move it from the prompt to a hook or a permission.

## Summary and Key Takeaways

An agent is a model plus tools plus a loop, and its power and its risk are the same quantity: what its tools can reach. Setting limits is not a barrier to using agents; it is what lets you use them with confidence.

The main points to carry forward:

- **Tool use** turns the model's text into actions. The model writes a **tool call** against a **tool definition**, and the harness executes it.
- **The agent loop** decides, calls, observes, and repeats, so early errors compound.
- **File access, shell commands, and code execution** are increasingly powerful and increasingly risky, and version control is the safety net for them.
- **Web search and fetch** extend knowledge, and their results are untrusted data.
- **Sandboxing** enforces limits technically, **permissions** set policy, and **permission modes** are presets, and none of them should be bypassed for convenience.
- **MCP servers, data sources, APIs, and databases** connect agents to research systems, with least-privilege credentials.
- **Subagents and parallel agents** isolate context and save time at a token cost, and their results must be checked.
- **Agent memory** lives in files you can inspect, and **hooks** enforce rules deterministically.

!!! mascot-celebration "You Can Draw the Boundary"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now describe the loop an agent runs, name what its tools can reach, and set permissions so that irreversible and outward-bound actions need your approval. That is the control surface for everything an agent does in the chapters ahead.

The next chapter moves from what a single agent can reach to how you supervise it and divide work among agents with defined roles. Round up the limits you would set, and bring them.
