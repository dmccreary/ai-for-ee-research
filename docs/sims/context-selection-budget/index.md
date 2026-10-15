---
title: "Context Selection Budget"
description: "Give each of nine candidate context items the verdict include, compress, or omit so that the total fits a 6,500-token context budget, then compare your choices with the answer key."
social:
   cards: false
quality_score: 0
status: built
---

# Context Selection Budget

<iframe src="main.html" height="922px" width="100%" scrolling="no"></iframe>

[Run the Context Selection Budget MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Including everything in the context window is the wrong default. It costs tokens, it risks truncation, and irrelevant material gives the model more to be distracted by. This MicroSim asks you to **prioritize** nine candidate context items for one task:

> "Check whether the ENOB reported in Section 4 of my draft is consistent with the measurement procedure in Section 3."

The window is 8,000 tokens. A completion reserve of 1,500 tokens is held back, so the context budget is 6,500 tokens. Each item lists its size as is and, for three of the items, its size if compressed. You give each item one verdict:

| Verdict | Tokens it adds to the running total |
|---|---|
| Include | The size as is |
| Compress | The size if compressed (only for items that list one) |
| Omit | 0 |

Including every item as is totals 33,000 tokens, so you must choose. The test for each item is the question on screen: *Would the answer change if this item were missing?* The task, items, sizes, and budget are invented for illustration, and the sim labels them illustrative.

**Learning objective:** prioritize nine candidate context items for a stated task by assigning each one the verdict include, compress, or omit, so that the total fits a stated token budget and at least 8 of 9 verdicts match the answer key.

## How to Use

1. Read the task in the box at the top and the budget statement below it. The meter shows the running total against the 6,500-token budget; the hatched part to the right is the 1,500-token completion reserve.
2. Choose an item in the **Item** drop-down list (the selected row is outlined and marked with ▶), then press **Include**, **Compress**, or **Omit**. **Compress** is available only for items that list a compressed size. The selection moves to the next item, and the running total updates after every choice. You can change any verdict before you submit.
3. When all nine items have a verdict, press **Submit**. If the total is over 6,500, the submission is refused with the message *Over budget by n tokens. Compress or omit something.* Change a verdict and submit again.
4. After the one accepted submission, the sim shows *n of 9 correct*, your final total, the correct total of 4,350 tokens, and whether you met mastery. Each item then shows **Correct** or **Incorrect** with the correct verdict and the reason. For a wrong verdict it also says whether you dropped a needed item, or how many tokens the choice adds and whether that alone would push an otherwise correct selection over the budget. Press **Next Page** to see the rest of the items.

Try including the related-work section along with an otherwise correct selection. The total becomes 6,850 tokens, which is 350 over the budget.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/context-selection-budget/main.html"
        height="922px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10-15 minutes

### Prerequisites
- Context window, context selection, summarization, context compression, and conversation history, from the section "Managing the Context Window" in Chapter 4
- The shared budget of prompt and completion, from Chapter 2

### Learning Objective
Prioritize nine candidate context items for a stated task by assigning each one the verdict include, compress, or omit, so that the total fits a stated token budget and at least 8 of 9 verdicts match the answer key.

- **Bloom level:** Evaluate
- **Bloom verb:** prioritize

### Activities

1. **Exploration** (3 min): Read the task and the nine items. For each item, ask whether the answer would change if the item were missing, and note which items list a compressed size.
2. **Guided Practice** (5 min): Assign the verdicts and watch the running total. If Submit is refused, decide which item costs the most for the least benefit to this task.
3. **Reflection** (5 min): Read the reason for each item. Explain why a 200-token summary of the raw measurement file is enough for this check, and what that summary must keep.

### Evidence of Mastery
- For nine items you commit one verdict each and submit when the running total is within the budget. A verdict is correct when it equals the verdict in the answer key.
- **Mastery:** at least 8 of 9 verdicts correct, with a total within the 6,500-token budget.
- Reading an item's description is exploration and is not evidence.

## References

1. [Chapter 4: Context Engineering and Advanced Prompting](../../chapters/04-context-engineering-prompting/index.md) - the section "Managing the Context Window" defines context selection, summarization, context compression, and conversation history management.
