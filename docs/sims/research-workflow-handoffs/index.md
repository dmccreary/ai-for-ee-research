---
title: "Research Workflow Handoffs"
description: "Interactive Mermaid flowchart of the five research workflow stages, with the handoff artifact on each arrow, a hover info panel, and a confetti cannon that fires when you have clicked every box."
quality_score: 0
status: instrumented
social:
   cards: false
---

# Research Workflow Handoffs

<iframe src="main.html" height="640px" width="100%" scrolling="no"></iframe>

[Run the Research Workflow Handoffs MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Embed This Diagram

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/research-workflow-handoffs/main.html"
        height="640px"
        width="100%"
        scrolling="no"></iframe>
```

## Overview

This diagram turns Table 1 of [Chapter 1](../../chapters/01-research-workflows-orchestrator/index.md) into a flowchart. The running example follows a doctoral student designing a low-power SAR ADC through five stages. Each box is a stage, and each arrow carries the artifact that the stage hands to the next one. The example is illustrative and not drawn from a published study.

## Workflow Steps

1. **Find what is known** takes a topic and a gap and produces a reading list with citations.
2. **Frame the question** turns the reading list and a design goal into one falsifiable question statement.
3. **Build and measure** uses the question and a design to produce netlists, scripts, and raw data files.
4. **Analyze** turns the raw data files into result tables and plots with uncertainty.
5. **Communicate** turns the result tables and plots into manuscript source and figures.

## How to Use

1. **Hover** over any box to see its input, output, and handoff artifact in the right panel.
2. **Hover** over an arrow label to read what that artifact is and which stages it connects.
3. **Click** each box. A clicked box gets a green outline, and the counter above the panel shows how many of the seven boxes you have clicked. With the keyboard, press **Tab** to reach a box and **Enter** or **Space** to click it.
4. **Click all seven boxes** to fire the confetti cannon once. It does not fire before then, and it does not fire again. Confetti is skipped if your system requests reduced motion.

## Lesson Plan

### Learning Objective

The learner will describe the input, output, and handoff artifact of each of the five research workflow stages (Bloom: Understand, verb: describe).

### Activity

Cover the right panel and name the handoff artifact on each arrow from memory. Then hover to check. For one arrow, say what would go wrong downstream if that artifact contained an unnoticed error.

### Assessment

- Can the learner name the artifact passed between each pair of adjacent stages?
- Can the learner explain why a handoff is where quality is either confirmed or silently lost?
