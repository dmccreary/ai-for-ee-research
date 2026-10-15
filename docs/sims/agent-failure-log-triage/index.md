---
title: "Agent Failure Log Triage"
description: "Read six illustrative excerpts of an agent log and attribute each to one of six failure modes, with the reason and the mechanical defense for that mode shown after each answer."
image: /sims/agent-failure-log-triage/agent-failure-log-triage.png
og:image: /sims/agent-failure-log-triage/agent-failure-log-triage.png
social:
   cards: false
quality_score: 0
status: built
---

# Agent Failure Log Triage

<iframe src="main.html" height="802px" width="100%" scrolling="no"></iframe>

[Run the Agent Failure Log Triage MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Agents fail in recognizable ways, and naming the pattern is the first step to catching it. This MicroSim shows six short excerpts of an agent log, written as raw log lines the way you would meet them after an overnight run, and asks you to **differentiate** which failure mode each one shows:

| Failure mode | What it means |
|---|---|
| Premature completion | The agent reports success without having run the check that defines success. |
| Hallucinated result | The agent reports a number or file that no tool produced. |
| Scope drift | The agent fixes something nobody asked it to touch. |
| Test weakening | Faced with a failing test, the agent edits the test and not the code. |
| Wrong arguments | The agent calls the right tool with the wrong path, parameter, or units. |
| Runaway loop | The agent repeats an action without progress. |

Each excerpt shows exactly one of the six modes. After each answer the sim gives the reason and the mechanical defense for that mode from Table 2 of Chapter 9. The log lines are invented for illustration.

## How to Use

1. Read the log excerpt in the white box. The question on screen is *What went wrong here?* Lines that start with a time stamp are log entries; lines in gray italics are notes about the log. The six failure modes are listed below the excerpt with their definitions.
2. Choose a failure mode in the drop-down below the drawing. You can change the choice until you submit.
3. Press **Submit**. Each excerpt gets one attempt. The sim shows *Correct: mode.* or *This is mode.*, the reason, and the mechanical defense for that mode. The correct mode is outlined and marked with a check mark; a wrong choice is marked with an X. On a narrow screen the list shows the mode names only after you submit, so that the feedback fits.
4. Press **Next Excerpt** to continue. The six excerpts always come in the same order.
5. After excerpt 6, press **See Score**. The summary shows *n of 6 correct* and whether the mastery threshold of 5 was met. **Start Over** returns to excerpt 1.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/agent-failure-log-triage/main.html"
        height="802px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will differentiate six agent failure modes from six excerpts of an agent log, with at least 5 of 6 attributed correctly.

- **Bloom level:** Analyze
- **Bloom verb:** differentiate

### Prerequisites

The six agent failure modes defined in the section "Logging, Failure Modes, and Runaway Agents" of Chapter 9.

### Evidence of Mastery

For each of the six log excerpts the learner commits one of the six failure modes. A choice is correct when it equals the mode in the answer key. Mastery is at least 5 of 6 correct on the first attempt. Reading the definitions is exploration and is not evidence.

### Common Misconceptions

- A passing test run means the work is correct.
- An agent that touched extra files was being thorough.
- Repeated tool calls mean the agent is working hard.

## References

1. [Chapter 9: Supervising Agents and Defining Agent Roles](../../chapters/09-supervising-agents-roles/index.md) - the section "Logging, Failure Modes, and Runaway Agents" defines the six failure modes, and its Table 2 gives the mechanical defense for each.
