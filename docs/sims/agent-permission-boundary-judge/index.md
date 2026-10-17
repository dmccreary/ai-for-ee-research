---
title: "Agent Permission Boundary Judge"
description: "Judge whether an illustrative five-rule permission policy allows, asks about, or denies each of ten proposed agent actions, where the first matching rule decides."
image: /sims/agent-permission-boundary-judge/agent-permission-boundary-judge.png
og:image: /sims/agent-permission-boundary-judge/agent-permission-boundary-judge.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Agent Permission Boundary Judge

<iframe src="main.html" height="764px" width="100%" scrolling="no"></iframe>

[Run the Agent Permission Boundary Judge MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

**Permissions** are the rules a harness checks before it runs a tool call: a call is allowed, needs your approval, or is denied. This MicroSim asks you to **judge** ten actions that an agent might propose in an ADC project against a short, illustrative policy. The policy has three outcomes, so you must weigh reversibility and scope, not only choose between allow and deny.

The rules apply in this order, and the first match decides:

| Rule | Condition | Outcome |
|---|---|---|
| 1 | Reads or writes any path outside the project directory, or reads credentials or key files | Deny |
| 2 | Any command that downloads and executes code, or uses elevated privileges | Deny |
| 3 | Writes to data/raw/ | Deny |
| 4 | Deletes files, installs packages, pushes to a remote, or sends data over the network | Ask |
| 5 | Reads files in the project, or edits files in scripts/ or docs/, or runs a Python script from scripts/ | Allow |

The policy and the actions are invented for illustration, and the sim labels the policy "Illustrative policy". The domain example.com used in one action is reserved for documentation.

## How to Use

1. Read the policy and action 1. The question on screen is *What does the policy say about this action?*
2. Press **Allow**, **Ask**, or **Deny**. The press commits your judgment, and each action allows one attempt.
3. Read the feedback. A correct judgment shows *Correct: <outcome>.*; an incorrect one shows *The policy gives <outcome>.* Both are followed by the matching rule number and the reason. In the policy, the rules checked before the match are marked *no match*, the deciding rule is outlined and marked *first match*, and later rules are marked *not checked*.
4. Press **Next Action** to continue. After action 10, press **See Score**.
5. The summary shows *n of 10 correct*, whether the mastery threshold of 8 was met, and the actions the policy sends to Ask. These are the approvals the researcher would see.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/agent-permission-boundary-judge/main.html"
        height="764px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10-15 minutes

### Prerequisites
- File access, shell commands, and code execution, from the section "Reaching Files, Shells, and Code" in Chapter 8
- Sandboxing, permissions, and permission modes, from the section "Sandboxing and Permissions" in Chapter 8

### Learning Objective
The learner will judge, for each of ten proposed agent actions, whether a stated permission policy allows it, requires approval, or denies it, with at least 8 of 10 correct.

- **Bloom level:** Evaluate
- **Bloom verb:** judge

### Activities

1. **Judgment** (5 min): Judge all ten actions. For each one, find the first rule that matches before you press a button.
2. **Discussion** (5-10 min): Look at the three Ask actions in the summary. For each, say what makes it irreversible or outward-bound. Then compare action 2 (edit a script, Allow) with action 4 (overwrite raw data, Deny): both change a file inside the project, so what separates them?

### Assessment
- **Evidence of mastery:** for each of ten actions the learner commits one of three outcomes. An outcome is correct when it equals the outcome given by the policy. Mastery is at least 8 of 10 correct on the first attempt.
- Reading the policy is exploration and is not evidence of mastery.

### Common Misconceptions Addressed
- Any action inside the project directory is safe. (Overwriting raw data is inside the project and is denied.)
- A command is safe if it is common. (`pip install` and `git push` are common and still need approval.)
- Approval is needed for everything that changes a file. (Edits in scripts/ and docs/ are allowed, because version control can undo them.)

## References

1. [Chapter 8: Agents, Tool Use, and Subagents](../../chapters/08-agents-tool-use-subagents/index.md) - the sections "Reaching Files, Shells, and Code" and "Sandboxing and Permissions" define the tool families, permissions, and the policy pattern used in this sim.
