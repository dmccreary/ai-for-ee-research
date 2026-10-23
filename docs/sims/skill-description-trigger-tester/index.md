---
title: "Skill Description Trigger Tester"
description: "Decide, for eight user requests, whether an illustrative SPICE netlist-checking skill description should trigger, and learn to separate the task a request asks for from the keywords it shares."
image: /sims/skill-description-trigger-tester/skill-description-trigger-tester.png
og:image: /sims/skill-description-trigger-tester/skill-description-trigger-tester.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Skill Description Trigger Tester

<iframe src="main.html" height="617px" width="100%" scrolling="no"></iframe>

[Run the Skill Description Trigger Tester MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

An agent decides whether to load a skill by comparing the user's request with the skill's description. A good trigger test checks both directions: the skill should fire on requests it covers and stay quiet on requests it does not. The most useful tests are near misses, requests that share a keyword with the description but ask for a different task.

This MicroSim shows one illustrative skill description:

> "Check a SPICE netlist for floating nodes, a missing .end card, and unit suffix errors. Use when the user asks to lint, check, or validate a .sp or .cir netlist file."

You then judge eight user requests, one at a time and in a fixed order. The rule is that a request should trigger the skill when it asks for a task and an input type that the description names. Shared vocabulary alone does not make a request trigger. Each request has exactly one correct answer. The description and the requests are invented for illustration.

**Learning objective:** distinguish, for each of eight user requests, whether a stated skill description should trigger the skill or not, with at least 7 of 8 correct.

## How to Use

1. Read the skill description at the top and request 1 in the dark-blue box. The question on screen is *Would an agent load this skill for this request?*
2. Press **Should trigger** or **Should not trigger**. Your choice gets a thick border and is named on screen. You can switch to the other answer until you submit.
3. Press **Submit**. Each request gets one attempt, and the answer cannot be changed after you submit it.
4. Read the feedback. **Correct.** (with a check mark) or the correct answer (with an X) is followed by the "Why" sentence. The correct answer is always shown.
5. Press **Next Request** to continue. After request 8, press **See Score**.
6. The summary shows *n of 8 correct*, whether you met the mastery threshold of 7, and the requests that share a keyword with the description but should not trigger, each with the shared keyword. Reload the page to start over.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/skill-description-trigger-tester/main.html"
        height="617px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective
The learner will distinguish, for each of eight user requests, whether a stated skill description should trigger the skill or not, with at least 7 of 8 correct.

- **Bloom level:** Analyze
- **Bloom verb:** distinguish

### Grade Level
Graduate students (MS and PhD) in electrical and computer engineering, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10 minutes

### Prerequisites
- Skill description, skill triggering, single-purpose skill, and trigger tests, from the sections "Scoping a Skill" and "Testing and Evaluating a Skill" in Chapter 7 and from Chapter 6
- Basic familiarity with SPICE netlists (.sp and .cir files)

### Activities

1. **Exploration** (3 min): Read the skill description and underline the task it names (check, lint, validate) and the input types it names (.sp and .cir netlist files). Reading the description is exploration, not evidence of mastery.
2. **Practice** (5 min): Judge the eight requests. For each, ask two questions: does it ask for the checking task, and is the input a SPICE netlist file?
3. **Reflection** (2 min): On the summary screen, read the near-miss requests. For each, name the keyword it shares with the description and the task it actually asks for.

### Evidence of Mastery
For each of eight requests the learner commits "should trigger" or "should not trigger". A choice is correct when it equals the answer key. Mastery is at least 7 of 8 correct on the first attempt. Reading the skill description is exploration and is not evidence.

## References

1. [Chapter 7: Designing, Testing, and Sharing Agent Skills](../../chapters/07-designing-testing-skills/index.md) - the section "Testing and Evaluating a Skill" defines trigger tests and recommends near-miss requests that share a keyword with the skill.
