---
title: "Research Task Decomposition Builder"
description: 'Select six well-formed subtasks from eight candidates for the goal "Compare the measured and simulated ENOB of two ADC designs" and put them in an order where every prerequisite comes first, with two submissions and feedback on every problem.'
image: /sims/research-task-decomposition-builder/research-task-decomposition-builder.png
og:image: /sims/research-task-decomposition-builder/research-task-decomposition-builder.png
twitter:image: /sims/research-task-decomposition-builder/research-task-decomposition-builder.png
social:
   cards: false
quality_score: 0
status: built
---

# Research Task Decomposition Builder

<iframe src="main.html" height="862px" width="100%" scrolling="no"></iframe>

[Run the Research Task Decomposition Builder MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Task decomposition breaks a research goal into subtasks that each have a checkable output and explicit prerequisites. This MicroSim asks you to **apply** two criteria to one concrete goal from Chapter 1:

> **Goal:** Compare the measured and simulated ENOB of two ADC designs.

You see eight candidate subtask cards, labeled A to H in a shuffled order. Six of them are the subtasks S1 to S6 that decompose the goal. The other two are distractors: one is not a subtask at all, and one is outside the scope of the goal. Your job is to build one ordered list that contains exactly the six subtasks, in an order where every subtask comes after all of its prerequisites.

A submission is valid when:

- all six subtasks S1 to S6 are present and neither distractor is present, and
- for every subtask, each of its prerequisites appears at an earlier position. S2 and S3 may appear in either order. S4 must appear after S2, and S5 after S3. S6 must appear after both S4 and S5.

When you press **Check Order**, the sim reports every problem it finds: a card that does not belong (with its "Why" sentence), a required subtask that is missing, or a card placed before its prerequisite (naming both cards and giving the "Why" sentence). You have two submissions. After a correct submission, or after the second submission, the answer and the reason for every card are shown, together with the result: *Correct within n submission(s)* or *Not yet correct*.

**Learning objective:** apply the criteria of a checkable output and a valid order to select six well-formed subtasks from eight candidates and sequence them so every prerequisite precedes its dependent.

## How to Use

1. Read the goal and the eight cards. The question on screen is *Which of these are well-formed subtasks for this goal, and in what order?*
2. Pick a card in the drop-down list below the drawing. The picked card is outlined in dark blue.
3. Press **Add Card** to put it at the end of your sequence. A card in the sequence is shaded and shows its position, for example **#3**, and the drop-down list shows the same number.
4. To reorder, pick a card that is already in the sequence and press **Move Earlier** to move it up one position. When a card in the sequence is picked, the add button reads **Remove Card**; press it to take the card out, then add it again at the end. Any order can be built with these two moves.
5. Press **Check Order** to submit. An empty sequence is rejected and does not use a submission. A sequence with fewer than six cards is reported as incomplete.
6. Read the feedback. Every problem is listed with its reason. On a narrow screen, the feedback opens on its own page; press **Next Page** to read more, and pick or edit a card to return to the cards.
7. Revise the sequence and press **Check Order** a second time if needed. After a correct submission or the second submission, the answer is shown: the six subtasks in a valid order and the two distractors, each with its reason. Use **Next Page** if the answer does not fit on one page.
8. **Start Over** empties the sequence. Before the answer is shown, it keeps the submissions you have used. After the answer is shown, it starts a new attempt with the cards reshuffled and two new submissions; earlier results stay on the status line.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/research-task-decomposition-builder/main.html"
        height="862px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10-15 minutes

### Prerequisites
- Task decomposition and subtask, as defined in the section "Task Decomposition" in Chapter 1
- Prerequisite and checkable output: a subtask has a stated input, produces an artifact that can be inspected, and names what must be finished before it
- Effective number of bits (ENOB) as a figure of merit for an analog-to-digital converter, from the section "The Setting: Electrical Engineering Research" in Chapter 1

### Activities

1. **Exploration** (5 min): Before adding any card, read the eight cards and apply the checklist from the chapter to each one: Does it have a stated input? Does it produce an artifact you could inspect? Is its scope small enough that a failure is easy to localize? Mark the two cards that fail. Then work backward from the deliverable: ask what the last subtask must receive, then what produces that, and sketch the order on paper.
2. **Guided Practice** (5 min): Build the sequence with **Add Card**, **Move Earlier**, and **Remove Card**, and submit it with **Check Order**. If the feedback lists problems, read each "Why" sentence and decide whether it is a membership error (a distractor or a missing subtask) or an ordering error (a card before its prerequisite). Fix only what the feedback names and submit a second time. Notice that S2 and S3 can be swapped without breaking the order, because both depend only on S1.
3. **Assessment** (5 min): Record the result shown after the answer is revealed. Then, without the sim, write a decomposition of a goal from your own research into four to six subtasks, give each a checkable output, list its prerequisites, and mark which subtasks are independent of each other and could run in parallel.

### Assessment
- **Mastery:** a correct submission within two submissions, shown as *Correct within 1 submission* or *Correct within 2 submissions*. *Not yet correct* after the second submission means mastery is not yet shown.
- The learner can explain why each distractor is excluded: "Do the research on the ADC" has no checkable output and no defined scope, and "Improve the ADC until its ENOB reaches 9.5 bits" changes the design instead of comparing ENOB.
- The learner can state the prerequisite of each subtask and explain why S2 and S3 may appear in either order.
- Moving cards before submitting, and reading the revealed answer, are exploration, not evidence of mastery.

## References

1. [Chapter 1: Research Workflows and the Researcher as Orchestrator](../../chapters/01-research-workflows-orchestrator/index.md) - the section "Task Decomposition" defines a well-formed subtask and is the source of the goal, the six subtasks S1 to S6 (Table 10), and their prerequisites.
