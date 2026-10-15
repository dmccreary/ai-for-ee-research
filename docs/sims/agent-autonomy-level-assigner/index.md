---
title: "Agent Autonomy Level Assigner"
description: "Recommend an autonomy level from 0 (Suggest only) to 3 (Act and report) for eight illustrative research tasks from their reversibility, reach, and verifiability, with the rule that applied shown after each answer."
image: /sims/agent-autonomy-level-assigner/agent-autonomy-level-assigner.png
og:image: /sims/agent-autonomy-level-assigner/agent-autonomy-level-assigner.png
social:
   cards: false
quality_score: 0
status: built
---

# Agent Autonomy Level Assigner

<iframe src="main.html" height="832px" width="100%" scrolling="no"></iframe>

[Run the Agent Autonomy Level Assigner MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Agent autonomy is a dial, not a switch, and the right setting depends on the task and not on how capable the model is. This MicroSim asks you to **recommend** an autonomy level for each of eight illustrative research tasks from three attributes of the task:

- **Reversible?** Can the effect be undone?
- **Leaves your control?** Does the result leave your control, by being sent, published, or written to a shared system? (reach)
- **Verifiable quickly?** Can you or a script check the result quickly and objectively?

| Level | Name | The agent may |
|---|---|---|
| 0 | Suggest only | Propose; you perform the action |
| 1 | Approve each step | Act after you approve each action |
| 2 | Act within a boundary | Act freely inside a defined scope, and stop at gates for your approval |
| 3 | Act and report | Act unattended and report afterwards |

The answer for every task follows from the assignment rule in Chapter 9, applied in this order: if the result leaves your control and cannot be verified, the level is 0; if it leaves your control and can be verified, the level is 1; if it stays local but cannot be undone, the level is 1; if it is local and reversible but cannot be checked quickly, the level is 2; if it is local, reversible, and verifiable, the level is 3. The tasks are invented for illustration.

## How to Use

1. Read the task card. The question on screen is *How much should the agent do on its own?* The card shows the three attributes of the task, and the four levels are listed below it with what the agent may do at each one. No level is chosen at the start.
2. Press **Level 0**, **Level 1**, **Level 2**, or **Level 3** to choose a level. You can change your choice until you submit.
3. Press **Submit**. Each task gets one attempt. The sim shows *Correct: level n.* or *The rule gives level n.*, the reason for the answer, and the rule that applied. The rule's level is outlined and marked with a check mark; a wrong choice is marked with an X.
4. Press **Next Task** to continue. The eight tasks always come in the same order.
5. After task 8, press **See Score**. The summary shows *n of 8 correct*, whether the mastery threshold of 7 was met, and how many tasks fell at each level. **Start Over** returns to task 1.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/agent-autonomy-level-assigner/main.html"
        height="832px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will recommend an autonomy level from 0 to 3 for each of eight research tasks from its reversibility, reach, and verifiability, with at least 7 of 8 correct.

- **Bloom level:** Evaluate
- **Bloom verb:** recommend

### Prerequisites

Agent autonomy, reversibility, reach, verifiability, and the four autonomy levels, all defined in the section "Autonomy and Supervision" of Chapter 9.

### Evidence of Mastery

For each of the eight tasks the learner commits one of the four levels. A level is correct when it equals the level given by the assignment rule. Mastery is at least 7 of 8 correct on the first attempt. Reading the task attributes is exploration and is not evidence.

### Common Misconceptions

- A capable model deserves more autonomy on every task.
- Anything local is safe to run unattended.
- If a result is outward-bound, a quick look at it is enough.

## References

1. [Chapter 9: Supervising Agents and Defining Agent Roles](../../chapters/09-supervising-agents-roles/index.md) - the section "Autonomy and Supervision" defines the three task properties, the four autonomy levels, and the assignment rule used for the answer key.
