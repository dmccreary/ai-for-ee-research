---
title: "Research Task Sorter"
description: 'Sort ten everyday EE research tasks into "AI drafts, you verify", "You decide, AI assists", or "You do directly" and get immediate feedback on each placement.'
image: /sims/research-task-sorter/research-task-sorter.png
og:image: /sims/research-task-sorter/research-task-sorter.png
twitter:image: /sims/research-task-sorter/research-task-sorter.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Research Task Sorter

<iframe src="main.html" height="672px" width="100%" scrolling="no"></iframe>

[Run the Research Task Sorter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Not every research task should be handed to a model, and not every task should be kept away from one. This MicroSim asks you to **differentiate** ten research tasks by the kind of check or judgment they need, not by how technical they sound. Each task belongs in exactly one of three groups:

| Group | Meaning |
|---|---|
| AI drafts, you verify | A model can produce a first version, and you can check the result cheaply |
| You decide, AI assists | A model can supply options or analysis; the choice depends on your knowledge and judgment |
| You do directly | Responsibility, commitment, or certification that cannot be handed off |

The ten task cards come from the five everyday research tasks in Chapter 1: literature search, data analysis, brainstorming, scientific coding, and manuscript preparation. After each placement the sim tells you whether it matched the answer key, gives a one-sentence reason, and, when you missed, names the correct group. The goal is to match the answer key on at least 8 of 10 cards.

**Learning objective:** differentiate ten research tasks into "AI drafts, you verify", "You decide, AI assists", and "You do directly", matching the answer key in at least 8 of 10 tasks.

## How to Use

1. Read the task card in the dark-blue box and the three group definitions below it. The question on screen is *Who should do this task: the model, you assisted, or only you?*
2. Press the button with the name of the group you choose. The placement is committed at once and cannot be changed.
3. Read the feedback. **Correct** (with a check mark) or **Not quite** (with an X) is followed by the "Why" sentence, and a miss also shows the correct group. The correct group is outlined and marked with a check mark; a wrong pick is marked with an X.
4. Press **Next Card** to continue. The *Placed* count on each group shows how many cards you have put there in this run.
5. After the tenth card, press **See Score**. The summary shows *n of 10 correct*, whether you reached mastery (8 of 10), and every card you placed incorrectly with its correct group and "Why" sentence. If the list is long, press **More Missed Cards** to page through it.
6. Press **Run Again** to play a new run with the cards reshuffled. The score of every run stays on screen so you can see whether you improved.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/research-task-sorter/main.html"
        height="672px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10-15 minutes

### Prerequisites
- The five everyday research tasks (literature search, data analysis, brainstorming, scientific coding, manuscript preparation) from the section "The Five Everyday Research Tasks" in Chapter 1
- The definitions of the three groups "AI drafts, you verify", "You decide, AI assists", and "You do directly"
- Basic familiarity with lab measurement, simulation, and paper-writing workflows in electrical engineering

### Activities

1. **Exploration** (5 min): Before placing any card, read the three group definitions and write down, in one phrase each, the test you will use to tell them apart (for example: "Can I check the output cheaply?", "Does the choice depend on what only I know?", "Does it carry my signature or commitment?"). Then play one run without stopping to think too long, and note which cards surprised you.
2. **Guided Practice** (5 min): Review the list of missed cards on the summary screen. For each miss, read the "Why" sentence and decide which of your three tests you applied incorrectly. Compare two cards that sound similar but fall in different groups, such as "Draft an abstract from a table of measured results" (AI drafts, you verify) and "Certify before submission that the reported measurements were taken and not generated" (You do directly), and explain in a sentence what separates them.
3. **Assessment** (5 min): Press **Run Again** and sort the reshuffled cards. Record both run scores. Then write one new task from your own research that would belong in each group, and justify each placement with a sentence in the style of the "Why" feedback.

### Assessment
- **Mastery:** at least 8 of 10 placements match the answer key on the first run. The score of the second (reshuffled) run shows whether the criteria transferred.
- The learner can state, for any missed card, why the answer-key group is correct, using the distinction between cheap verification, judgment that depends on the researcher's knowledge, and responsibility that cannot be delegated.
- The learner's three self-written tasks are each placed in a defensible group with a one-sentence justification.
- Reading the feedback and reviewing the missed-card list are exploration, not evidence of mastery.

## References

1. [Chapter 1: Research Workflows and the Researcher as Orchestrator](../../chapters/01-research-workflows-orchestrator/index.md) - the section "The Five Everyday Research Tasks" defines the three groups and is the source of all ten task cards and their answer key.
