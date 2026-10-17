---
title: "Review Checkpoint Judge"
description: "Judge whether each of eight agent steps in an analysis workflow needs your review before its output is used, and name the main reason - reversibility, outward effect, or reported result."
image: /sims/review-checkpoint-judge/review-checkpoint-judge.png
og:image: /sims/review-checkpoint-judge/review-checkpoint-judge.png
twitter:image: /sims/review-checkpoint-judge/review-checkpoint-judge.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Review Checkpoint Judge

<iframe src="main.html" height="742px" width="100%" scrolling="no"></iframe>

[Run the Review Checkpoint Judge MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

An agent that can act on your files, send messages, and compute results will take many steps you did not individually approve. Asking for approval on every step teaches you to click through requests; asking for none lets an irreversible or public mistake through. This MicroSim asks you to **judge** where a human review checkpoint belongs, using three criteria from Chapter 1 that stay on screen the whole time:

| Criterion | Question |
|---|---|
| Reversibility | Is the action irreversible? |
| Outward effect | Does the output leave your control by being sent, published, or used to commit resources? |
| Reported result | Does the output become a result you will report? |

A step requires review when at least one criterion applies.

You see eight agent steps from an analysis workflow, one at a time and in a new shuffled order on every run. For each step you commit two things together: a judgment, **Review required** or **No review needed**, and the main reason, which is one of the three criteria or *No criterion applies*. Choosing the reason separates a correct decision from a correct guess. Four of the eight steps require review and four do not.

**Learning objective:** judge, for each of eight agent steps in an analysis workflow, whether a human review checkpoint is required before its output is used, agreeing with the answer key on at least 7 of 8 steps.

## How to Use

1. Read the three criteria at the top and the agent step in the dark-blue box. The question on screen is *Does this output need your review before it is used?*
2. Choose the main reason in the drop-down list below the drawing: **Reversibility**, **Outward effect**, **Reported result**, or **No criterion applies**. If you press a judgment button without choosing a reason, the sim asks you to choose one first and nothing is recorded.
3. Press **Review required** or **No review needed**. The judgment and the reason are committed together and cannot be changed.
4. Read the feedback. **Correct** means both the judgment and the reason match the answer key. **Right decision, different reason** means the judgment matches but the reason does not; the correct reason is shown. **Not quite** means the judgment does not match; the correct judgment is shown. The "Why" sentence appears after every commit, and the criterion that is the main reason is marked *Main reason* with a check mark.
5. Press **Next Step** to continue. After the eighth step, press **See Score**. The summary shows the score as *n of 8* (it counts judgments only), whether you reached mastery (7 of 8), and every step judged incorrectly with its "Why" sentence. If the list is long, press **More Missed Steps** to page through it.
6. Press **Run Again** to judge the eight steps again in a reshuffled order. The score of every run stays on screen.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/review-checkpoint-judge/main.html"
        height="742px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10-15 minutes

### Prerequisites
- Human in the loop: the three positions of a person relative to an automated process (in the loop, on the loop, out of the loop), from the section "Human in the Loop" in Chapter 1
- Reversible and irreversible actions
- Output that leaves your control by being sent, published, or used to commit resources
- Output that becomes a reported result
- The idea of an agent as an assistant with tools and a loop, which can take actions you did not individually approve

### Activities

1. **Exploration** (5 min): Read the three criteria and restate each one as a yes/no test you could apply in under ten seconds. Then judge the first step without hurrying, and read the "Why" sentence and the marked main reason before pressing **Next Step**. Reading the criteria is exploration, not evidence of mastery.
2. **Guided Practice** (5 min): Finish the run. On the summary screen, for each step judged incorrectly, name the criterion you applied (or failed to apply) and explain the miss using the "Why" sentence. Compare two pairs that look alike but are judged differently: the agent *sends* an email versus *drafts* the same email and leaves it unsent, and the agent *overwrites the raw measurement files* versus *renames a column header in a copy* of the data file. Write one sentence for each pair saying which criterion separates them.
3. **Assessment** (5 min): Press **Run Again** and judge the reshuffled steps. Record the first-run and second-run scores and how many steps showed **Right decision, different reason**. Then describe one agent step from your own research workflow, judge it, and name its main reason in the style of the "Why" feedback.

### Assessment
- **Mastery:** at least 7 of 8 judgments match the answer key on the first run. The score counts judgments only.
- The learner names the correct main reason for each step that requires review (Reversibility, Outward effect, or Reported result) and gives "No criterion applies" for the four steps that do not. A "Right decision, different reason" result shows a judgment that is not yet backed by the right criterion.
- The learner explains, for any missed step, why the answer-key judgment is correct using the three criteria.
- The learner's own example step is judged with a defensible reason.
- Common misconceptions to listen for: every agent action needs review, so review is never a choice; a step that looks harmless needs no review even when it is irreversible; a step that only drafts something is safe to send without review.

## References

1. [Chapter 1: Research Workflows and the Researcher as Orchestrator](../../chapters/01-research-workflows-orchestrator/index.md) - the section "Human in the Loop" states the three review criteria (reversibility, outward effect, reported result) and is the source of the eight agent steps and their answer key.
