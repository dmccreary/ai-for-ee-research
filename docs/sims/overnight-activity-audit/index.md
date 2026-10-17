---
title: "Overnight Activity Audit"
description: "Examine ten lines of an illustrative overnight log from an always-on agent against its task and permission lists, flag each as in scope or out of scope, and finish with a morning report of the out-of-scope actions."
image: /sims/overnight-activity-audit/overnight-activity-audit.png
og:image: /sims/overnight-activity-audit/overnight-activity-audit.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Overnight Activity Audit

<iframe src="main.html" height="702px" width="100%" scrolling="no"></iframe>

[Run the Overnight Activity Audit MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

An always-on agent works while you are away, so each morning you review what it did. This MicroSim practises that audit. The agent was given one task with explicit permissions:

> Each night, search arXiv for new papers on SAR ADC calibration and append their titles to docs/reading-queue.md. Allowed: web search, fetching public web pages, and writing to docs/reading-queue.md. Not allowed: reading or writing any other file, signing in to any service, sending messages, installing software, or purchases.

You read ten lines of the agent's log, one at a time, and decide whether each action stayed inside the task. An action is **in scope** when it is covered by the Allowed list and **out of scope** otherwise. Some out-of-scope actions look harmless, such as reading a file, which is the point: scope, not apparent harm, is the test. For every out-of-scope line, the sim names the control that would have prevented it: a permission rule, a sandbox, or an approval gate.

The task and the log are invented for illustration and are labeled "illustrative log". They do not describe any real product.

## How to Use

1. Read the task and its Allowed and Not allowed lists in the white panel, then the log line in the dark-blue box. The question on screen is *Did the agent stay inside the task?*
2. Press **In scope** or **Out of scope**. Your choice is marked with a filled circle and a dark background. You can change it until you submit.
3. Press **Submit**. Each line gets one attempt. The feedback reads **Correct.** (with a check mark) or **This line is *in scope* / *out of scope*.** (with an X), followed by the "Why" sentence. For an out-of-scope line it also names the control that would have prevented the action. The correct button is marked with a check mark and a solid border; a wrong pick is marked with an X and a dashed border.
4. Press **Next Line** to continue. The lines come in a fixed order.
5. After line 10, press **See Morning Report**. The end screen shows *n of 10 correct*, whether you met the mastery threshold of 9, and a morning report listing the five out-of-scope actions with the control that would have prevented each one.

All controls are buttons that can be reached with the Tab key and pressed with Enter or Space. To try again, reload the page.

## Lesson Plan

**Learning objective:** The learner will examine ten lines of an agent's overnight activity log against a stated task and permission list, and flag each as in scope or out of scope, with at least 9 of 10 correct.

**Bloom level and verb:** Analyze (L4), *examine*.

**Evidence of mastery:** For each of ten log lines the learner commits "in scope" or "out of scope". A classification is correct when it equals the answer key. Mastery is at least 9 of 10 correct on the first attempt. Reading the task statement is exploration and is not evidence.

**Misconceptions to watch for:**

- An action that looks helpful is in scope.
- Reading a file is harmless.
- An action that is allowed by the platform is allowed by the task.

**Duration:** 10 minutes.

**Prerequisites:** overnight activity audit, agent blast radius, and least privilege, as defined in the section "Risks That Define the Criteria" of Chapter 19 and in Chapter 9.

**Follow-up:** For each action in the morning report, write the one permission rule, sandbox setting, or approval gate you would configure before letting the agent run another night, and say which of the audit questions it answers: what did it do, was each action within the task, what did it spend, and did anything leave your control?

## References

1. [Chapter 19: Always-On Personal Agents for Research](../../chapters/19-always-on-personal-agents/index.md) - the sections "Risks That Define the Criteria" and "Auditing Overnight Activity" describe the audit procedure used here.
2. [Chapter 8: Agents, Tool Use, and Subagents](../../chapters/08-agents-tool-use-subagents/index.md) - defines sandboxing and permissions.
3. [Chapter 10: Orchestrating Teams of Planning and Execution Agents](../../chapters/10-orchestrating-agent-teams/index.md) - defines the human approval gate.
