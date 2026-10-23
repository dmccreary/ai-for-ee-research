---
title: "Skill Anatomy Labeler"
description: "Interactive p5.js MicroSim in which learners identify eight lines and files of the enob-report agent skill as the skill name, the skill description, skill instructions, or a supporting file."
image: /sims/skill-anatomy-labeler/skill-anatomy-labeler.png
og:image: /sims/skill-anatomy-labeler/skill-anatomy-labeler.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Skill Anatomy Labeler

<iframe src="main.html" height="792px" width="100%" scrolling="no"></iframe>

[Run the Skill Anatomy Labeler MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

An agent skill is a directory. Its central file, `SKILL.md`, starts with YAML frontmatter that holds the **skill name** and the **skill description**, and its body holds the **skill instructions**. Scripts, reference documents, and templates sit beside it as **supporting files**, opened only when the instructions point to them.

This MicroSim shows the complete `enob-report` skill from the chapter: its directory tree and its `SKILL.md` file. The question on screen is *Which part of the skill is this?* One of eight items is highlighted at a time, in a fixed order, and you label it as one of four parts: Skill name, Skill description, Skill instructions, or Supporting file.

Each item has exactly one correct label. Two rules settle the harder cases: a line inside `SKILL.md` below the frontmatter is Skill instructions, and a path to a file other than `SKILL.md` is a Supporting file.

## How to Use

1. Find the highlighted item. It has a yellow box around it and a ▶ marker beside it, in either the directory tree or `SKILL.md`.
2. Choose a label from the menu below the drawing: **Skill name**, **Skill description**, **Skill instructions**, or **Supporting file**.
3. Press **Submit**. Each item gets one attempt, and the label cannot be changed after you submit it.
4. Read the feedback. A correct label shows ✓ *Correct: label.* An incorrect one shows ✗ *This is a label.* naming the correct label. Both are followed by the reason.
5. Press **Next item** to highlight the next item.
6. After item 8 the sim shows your score as *n of 8 correct* and whether you met the mastery threshold of 7. Press **Start over** to label the eight items again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/skill-anatomy-labeler/main.html"
        height="792px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will identify, for each of eight lines or files of a skill, whether it is the skill name, the skill description, skill instructions, or a supporting file, with at least 7 of 8 correct (Bloom: Remember, verb: identify).

### Grade Level
Graduate students (MS and PhD) in electrical and computer engineering, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
5-10 minutes

### Prerequisites

Skill name, skill description, skill instructions, supporting files, and SKILL.md, all defined in the section "The Anatomy of an Agent Skill" of [Chapter 6](../../chapters/06-knowledge-bases-skill-anatomy/index.md).

### Activities

1. **Exploration** (2 min): Read the whole directory tree and `SKILL.md` before labeling anything. Find where the frontmatter begins and ends.
2. **Guided Practice** (5 min): Label the eight items in order. For each one, first decide whether it is inside `SKILL.md` or a separate file, then whether it is in the frontmatter or the body. Read the reason after each submission.
3. **Assessment** (3 min): Without the sim, write the description line for a skill of your own, and check that it says both what the skill does and when to use it.

### Assessment

- **Evidence of mastery:** for each of eight items the learner commits one of four labels. A label is correct when it equals the label in the answer key. Mastery is at least 7 of 8 correct on the first attempt.
- Viewing the whole `SKILL.md` and directory tree is exploration and is not evidence.
- Watch for three misconceptions: that the description only says what the skill does and not when to use it, that scripts and templates are part of `SKILL.md`, and that the name and the description are the same thing.

## References

1. [Chapter 6: Knowledge Bases, Personal Knowledge Graphs, and the Anatomy of an Agent Skill](../../chapters/06-knowledge-bases-skill-anatomy/index.md) - the section "The Anatomy of an Agent Skill" defines each part of a skill and is the source of the `enob-report` skill shown here.
