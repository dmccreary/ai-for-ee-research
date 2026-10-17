---
title: "Markdown Syntax Matcher"
description: "Choose which of three Markdown sources produces each of eight rendered results, from headings and lists to tables, code, links, and bold text, and see the rendered preview of your choice next to the correct one."
image: /sims/markdown-syntax-matcher/markdown-syntax-matcher.png
og:image: /sims/markdown-syntax-matcher/markdown-syntax-matcher.png
social:
   cards: false
quality_score: 0
status: instrumented
---

# Markdown Syntax Matcher

<iframe src="main.html" height="762px" width="100%" scrolling="no"></iframe>

[Run the Markdown Syntax Matcher MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Reading Markdown is easy; writing it so that it renders the way you meant takes practice. This MicroSim gives you eight rendered results, such as a level-2 heading, a bulleted list, a fenced Python code block, a link, or a two-column table, and three candidate sources for each. Your job is to **use** Markdown syntax: pick the source that produces the result.

The wrong options are the near-miss errors people actually make: a missing space after `##` or `-`, quotation marks used where backticks are needed, link brackets in the wrong order, or a table without its separator row. After each answer the sim draws the rendered preview of the source you chose next to the preview of the correct source, following the CommonMark rules with the GitHub Flavored Markdown table extension. Most wrong options differ from the right one by a single space or character, and the previews show what that difference costs.

The option order is shuffled for each item when the page loads, so the letter of the correct option tells you nothing.

## How to Use

1. Read the **Rendered result** box. The question on screen is *Which source produces this result?*
2. Read the three sources, shown as literal text and labeled A, B, and C.
3. Press **Option A**, **Option B**, or **Option C** to select a source. The selected option gets a pointer and a black outline, and you can change the selection until you submit.
4. Press **Submit**. Each item has one attempt. The correct option is outlined in blue with a check mark; a wrong choice is outlined in orange with an X.
5. Read the feedback. A correct answer shows **Correct.** and the reason. A wrong answer shows the reason and two rendered previews: your choice and the correct option.
6. Press **Next Item**, and after item 8 press **See Score**. The final screen shows *n of 8 correct*, whether you met the mastery threshold of 7, and the misconception behind each item you missed.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/markdown-syntax-matcher/main.html"
        height="762px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will use Markdown syntax for headings, lists, tables, code, links, and emphasis by choosing, for each of eight described rendered results, the source text that produces it, with at least 7 of 8 correct.

- **Bloom level:** Apply
- **Bloom verb:** use

### Prerequisites

- Headings, lists and tables, code blocks, links, emphasis, and the blank line before a list, all defined in the section "Markdown" of Chapter 5.

### Evidence of Mastery

- For each of the eight rendered results, the learner commits one of three source options; a choice is correct when it matches the answer key.
- **Mastery:** at least 7 of 8 correct on the first attempt.
- Viewing the rendered preview of an option after the answer is revealed is exploration and is not evidence of mastery.

### Misconceptions Addressed

1. A heading needs no space after the hash characters.
2. A list item needs no space after the marker.
3. A table works without a separator row.
4. Quotation marks or single quotes make code.

## References

1. [Chapter 5: Markdown and Version Control](../../chapters/05-markdown-and-version-control/index.md) - the section "Markdown" defines the syntax rules this MicroSim practices.
2. [CommonMark Specification](https://spec.commonmark.org/) - the rules the rendered previews follow.
3. [GitHub Flavored Markdown Specification](https://github.github.com/gfm/) - the table extension used for item 7.
