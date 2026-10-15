---
title: "Personal Agent Comparison Criteria Matcher"
description: 'Classify eight questions about a personal, always-on AI agent under the comparison criterion each one tests, with one attempt per question, a "Why" sentence after each answer, and a one-line test per criterion at the end.'
social:
   cards: false
quality_score: 0
status: built
---

# Personal Agent Comparison Criteria Matcher

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Personal Agent Comparison Criteria Matcher MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Personal agents change from month to month, but the questions a researcher should ask of them do not. This MicroSim practises turning a worry about an agent into the comparison criterion that addresses it. Each of eight questions belongs under exactly one of eight criteria:

| Criterion | What it covers |
|---|---|
| Where it runs | Where the computation and the data are located: your laptop, the vendor's cloud, or a server you manage |
| Blast radius | How far a failure, compromise, or injected instruction can spread |
| Approval model | The policy that decides which actions need a human |
| Usage metering | How consumption is counted, capped, and billed |
| Data exposure | What happens to the data given to the agent: training, retention, access |
| Memory | Whether you can inspect and control what the agent keeps between sessions |
| Claim verification | Independent evidence behind what the vendor advertises |
| Activity audit | The record of the agent's actions that is available for review |

The criteria come from the section "Risks That Define the Criteria" in [Chapter 19](../../chapters/19-always-on-personal-agents/index.md). The questions are invented for illustration and do not describe any one product. The order of the criterion buttons is shuffled for each learner, so the position of a button tells you nothing about the answer.

## How to Use

1. Read the question in the dark-blue box. The question on screen is *Which criterion does this question test?*
2. Press one of the eight criterion buttons below the drawing area. Your choice is marked with a filled circle and a dark background. You can change it until you submit.
3. Press **Submit**. Each question gets one attempt. The feedback reads **Correct: *criterion*.** (with a check mark) or **This asks about *criterion*.** (with an X), followed by the "Why" sentence. The correct criterion's button is marked with a check mark and a solid border; a wrong pick is marked with an X and a dashed border.
4. Press **Next Question** to continue. The questions come in a fixed order.
5. After question 8, press **See Score**. The end screen shows *n of 8 correct*, whether you met the mastery threshold of 7, and a one-line test for each criterion that you could run on a real product. On narrow screens, press **More Tests** to page through the tests.

All controls are buttons that can be reached with the Tab key and pressed with Enter or Space. To try again with a new criteria order, reload the page.

## Lesson Plan

**Learning objective:** The learner will classify each of eight questions about a personal agent under the comparison criterion it addresses, with at least 7 of 8 correct.

**Bloom level and verb:** Understand (L2), *classify*.

**Evidence of mastery:** For each of eight questions the learner commits one of eight criteria. A classification is correct when it equals the answer key. Mastery is at least 7 of 8 correct on the first attempt. Reading the list of criteria is exploration and is not evidence.

**Misconceptions to watch for:**

- A comparison is about features and price only.
- A vendor's statement about safety is itself the verification.
- Where an agent runs is the same as what it can reach.

**Duration:** 10 minutes.

**Prerequisites:** agent blast radius, usage metering, agent data exposure, vendor claim verification, overnight activity audit, cloud agent computer, self-hosted agent, and the approval model, as defined in the sections "What Makes an Agent Personal and Always-On" and "Risks That Define the Criteria" of Chapter 19.

**Follow-up:** Pick one agent you might use and run two of the one-line tests from the end screen with a throwaway account and synthetic data. Record what you found for each criterion.

## References

1. [Chapter 19: Always-On Personal Agents for Research](../../chapters/19-always-on-personal-agents/index.md) - the section "Risks That Define the Criteria" defines the eight criteria used in this MicroSim.
