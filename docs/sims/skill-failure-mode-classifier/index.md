---
title: "Skill Failure Mode Classifier"
description: "Attribute eight illustrative observations of a misbehaving agent skill to one of six failure modes, then see the recommended fix for each mode you missed."
image: /sims/skill-failure-mode-classifier/skill-failure-mode-classifier.png
og:image: /sims/skill-failure-mode-classifier/skill-failure-mode-classifier.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Skill Failure Mode Classifier

<iframe src="main.html" height="822px" width="100%" scrolling="no"></iframe>

[Run the Skill Failure Mode Classifier MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Skills fail in a small number of recurring ways, and each failure mode points to a different fix. This MicroSim asks you to trace a symptom to its cause. The eight observations share surface features, such as "it gave the wrong result", so you have to reason from what did not happen: the skill was not loaded, it loaded wrongly, a step was skipped, it cannot run, its content is outdated, or it has too many jobs.

The six failure modes, from the section "Failure Modes and Maintenance" in Chapter 7, are listed on screen with their definitions:

| Failure mode | Symptom |
|---|---|
| Undertriggering | The skill is not used when it should be |
| Overtriggering | The skill loads on requests it cannot handle |
| Instruction drift | The skill loads, but the agent skips or reorders steps |
| Missing dependency | A script needs a library, tool, or file that is not present |
| Stale reference | A reference document or hard-coded path is out of date |
| Scope creep | The skill has accumulated extra jobs and does none reliably |

The observations are invented for illustration, and each has exactly one correct mode.

**Learning objective:** attribute each of eight observed skill problems to one of six failure modes, with at least 7 of 8 correct.

## How to Use

1. Read observation 1 in the dark-blue box and the six failure modes below it. The question on screen is *Which failure mode explains this?*
2. Choose a mode in the drop-down list. The chosen mode is outlined and marked with an arrow in the list on screen.
3. Press **Submit**. Each observation gets one attempt, and the choice cannot be changed after you submit it.
4. Read the feedback. **Correct: &lt;mode&gt;.** (with a check mark) or **This is &lt;mode&gt;.** (with an X) is followed by the "Why" sentence. The correct mode is outlined and marked with a check mark, and a wrong pick is marked with an X.
5. Press **Next Observation** to continue. After observation 8, press **See Score**.
6. The summary shows *n of 8 correct*, whether you met the mastery threshold of 7, and the recommended fix for each mode you missed, with the observations you missed. Reload the page to start over.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/skill-failure-mode-classifier/main.html"
        height="822px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective
The learner will attribute each of eight observed skill problems to one of six failure modes, with at least 7 of 8 correct.

- **Bloom level:** Analyze
- **Bloom verb:** attribute

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10-15 minutes

### Prerequisites
- The six skill failure modes (undertriggering, overtriggering, instruction drift, missing dependency, stale reference, scope creep), from the section "Failure Modes and Maintenance" in Chapter 7

### Activities

1. **Exploration** (3 min): Read the six definitions and, for each, write the one thing that did not happen (not loaded, loaded wrongly, step skipped, cannot run, outdated content, too many jobs). Reading the definitions is exploration, not evidence of mastery.
2. **Practice** (6 min): Attribute the eight observations. Before choosing, ask whether the skill loaded at all, and if it did, what changed or what was skipped.
3. **Reflection** (3 min): On the summary screen, read the recommended fix for each mode you missed and explain how it addresses the cause, not just the symptom.

### Evidence of Mastery
For each of eight observations the learner commits one of six failure modes. A choice is correct when it equals the answer key. Mastery is at least 7 of 8 correct on the first attempt. Reading the definitions list is exploration and is not evidence.

## References

1. [Chapter 7: Designing, Testing, and Sharing Agent Skills](../../chapters/07-designing-testing-skills/index.md) - the section "Failure Modes and Maintenance" defines the six failure modes and the routine of skill maintenance.
