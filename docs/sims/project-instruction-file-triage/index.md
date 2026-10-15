---
title: "Project Instruction File Triage"
description: "Judge each of eleven lines of an illustrative draft AGENTS.md or CLAUDE.md file as a goal, a convention, a constraint, or a line that does not belong, with immediate feedback on each judgment."
image: /sims/project-instruction-file-triage/project-instruction-file-triage.png
og:image: /sims/project-instruction-file-triage/project-instruction-file-triage.png
social:
   cards: false
quality_score: 0
status: built
---

# Project Instruction File Triage

<iframe src="main.html" height="782px" width="100%" scrolling="no"></iframe>

[Run the Project Instruction File Triage MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A project instruction file such as `AGENTS.md` or `CLAUDE.md` is read by an agent at the start of every session, so every line costs context on every turn. A useful file holds three kinds of content: **project goals** (what the project is for and what success means), **project conventions** (how routine work is done here), and **project constraints** (what the agent may not do, or may do only with approval). Everything else should be left out: transient notes go stale, vague exhortations cannot be checked, and secrets leak.

This MicroSim shows an illustrative draft instruction file for a SAR ADC project and asks you to **judge** each of its eleven lines against those criteria. Three of the eleven lines should be removed, so "keep it" is not a safe default.

## How to Use

1. Read the draft file. The highlighted line, marked with a pointer, is the one to judge. The question on screen is *Is this line a goal, a convention, a constraint, or not worth putting in the file?*
2. Press **Goal**, **Convention**, **Constraint**, or **Does not belong** to select a label. You can change the selection until you submit.
3. Press **Submit**. Each line has one attempt. The feedback box shows **Correct:** and the label (for example, *Correct: Goal.*) or **This line is** and the correct label (for example, *This line is Constraint.*), followed by the reason, and the next line is highlighted. Judged lines are marked in the file with a check mark or an X.
4. After line 11, press **See Score**. The final screen shows *n of 11 correct*, whether you met the mastery threshold of 9, and where the content of each line that does not belong should live instead.

At narrow widths the lines you are not judging are shortened to one line each so that the whole file still fits; the highlighted line is always shown in full.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/project-instruction-file-triage/main.html"
        height="782px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will judge each of eleven lines of a draft instruction file as a goal, a convention, a constraint, or not belonging in the file, with at least 9 of 11 judged correctly.

- **Bloom level:** Evaluate
- **Bloom verb:** judge

### Prerequisites

- Project instruction file, project goals, project conventions, and project constraints, all defined in the section "Project Instruction Files" of Chapter 5.

### Evidence of Mastery

- For each of the eleven lines, the learner commits one of four labels; a label is correct when it matches the answer key.
- **Mastery:** at least 9 of 11 correct on the first attempt.
- Reading the draft file as a whole is exploration and is not evidence of mastery.

### Misconceptions Addressed

1. Anything useful to say to an agent belongs in the instruction file.
2. A vague exhortation such as "be careful" is a constraint.
3. A credential in a private repository is safe to include.

## References

1. [Chapter 5: Markdown and Version Control](../../chapters/05-markdown-and-version-control/index.md) - the section "Project Instruction Files" defines goals, conventions, constraints, and what to leave out.
