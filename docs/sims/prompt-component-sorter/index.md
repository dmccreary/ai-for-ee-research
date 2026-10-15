---
title: "Prompt Component Sorter"
description: "Label each of the ten sentences of a working research prompt as a clear instruction, constraint, output format, role, or few-shot example, with feedback after each label and a tally of the components at the end."
image: /sims/prompt-component-sorter/prompt-component-sorter.png
og:image: /sims/prompt-component-sorter/prompt-component-sorter.png
social:
   cards: false
quality_score: 0
status: built
---

# Prompt Component Sorter

<iframe src="main.html" height="767px" width="100%" scrolling="no"></iframe>

[Run the Prompt Component Sorter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

When a prompt misbehaves, the way to fix it is to find which component is missing or doing the wrong job. This MicroSim shows one assembled prompt, adapted from the worked prompt in Chapter 3, and asks you to **distinguish** which component each of its ten sentences carries:

| Component | What it controls |
|---|---|
| Clear instruction | The task and audience |
| Constraint | Sources, scope, length, and a sanctioned way to say "unknown" |
| Output format | The shape of the result |
| Role | Tone and perspective |
| Few-shot example | Format and judgment, shown by a worked instance |

Sentences 9 and 10 are added to the chapter's prompt. All example values in the prompt are illustrative.

## How to Use

1. Read the assembled prompt. The highlighted sentence has a yellow background, a gold outline, bold text, and an arrow next to its number. The question on screen is *Which component of the prompt does this sentence carry?*
2. Choose a component from the list below the drawing and press **Submit**. Each sentence gets one attempt.
3. Read the feedback. A correct label shows **Correct:** with the label; a miss shows **This sentence is** with the correct label. Both are followed by the reason. The answered sentence is tagged in the prompt with its correct component, with a check if you chose it and an X if you did not.
4. Press **Next Sentence** to highlight the next sentence. After sentence 10, press **See Score**.
5. The summary shows *n of 10 correct*, whether you met the mastery threshold of 8, and a bar chart of how many sentences carry each component. Notice which component is the most numerous.

On narrow screens the prompt box shows a window of sentences around the highlighted one, with notes for the sentences above and below.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/prompt-component-sorter/main.html"
        height="767px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will distinguish which prompt component, clear instruction, constraint, output format, role, or few-shot example, each of ten prompt sentences carries, with at least 8 of 10 classified correctly.

- **Bloom level:** Analyze
- **Bloom verb:** distinguish

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research

### Duration
10 minutes

### Prerequisites
- Clear instructions, constraints, output format, role prompting, and few-shot examples, from the section "Prompt Engineering" in Chapter 3

### Activities

1. **Practice** (5 min): Label all ten sentences, committing each label before reading the feedback.
2. **Analysis** (3 min): Compare sentence 3 ("Use at most 120 words.") with sentence 6 (the table columns). Write one sentence explaining why a length limit is a constraint and not an output format.
3. **Transfer** (2 min): Take a prompt you used recently and mark which of the five components it contains. Name the missing component most likely to change its output.

### Assessment
- **Evidence of mastery:** for each of ten sentences from one prompt the learner commits one of five component labels. A label is correct when it equals the answer key. Mastery is at least 8 of 10 correct on the first attempt.
- Reading the full assembled prompt is exploration and is not evidence of mastery.

## References

1. [Chapter 3: Choosing Models and Writing Clear Prompts](../../chapters/03-models-and-prompt-basics/index.md) - the section "Prompt Engineering" defines the five components and gives the worked prompt from which these sentences are adapted.
