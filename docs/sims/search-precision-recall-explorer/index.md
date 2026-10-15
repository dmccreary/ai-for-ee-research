---
title: "Search Query Precision and Recall Explorer"
description: "Calculate the precision and recall of three search queries on a synthetic corpus of twenty papers with eight relevant papers, then choose the query that suits a literature survey that cannot miss a relevant paper."
image: /sims/search-precision-recall-explorer/search-precision-recall-explorer.png
og:image: /sims/search-precision-recall-explorer/search-precision-recall-explorer.png
social:
   cards: false
quality_score: 0
status: built
---

# Search Query Precision and Recall Explorer

<iframe src="main.html" height="858px" width="100%" scrolling="no"></iframe>

[Run the Search Query Precision and Recall Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Two numbers describe how well a search query performs. **Precision** is the fraction of the results returned that are relevant, and **recall** is the fraction of all the relevant papers that were returned. With \( TP \) relevant results returned, \( FP \) irrelevant results returned, and \( FN \) relevant papers missed:

\[
\text{precision} = \frac{TP}{TP + FP}, \qquad \text{recall} = \frac{TP}{TP + FN}.
\]

This MicroSim uses a corpus of 20 papers, P1 to P20, that is **synthetic, invented for this exercise**. Eight of the papers are relevant to the search question. Three queries are run on the corpus:

| Query | Description |
|---|---|
| A | A narrow query using the exact phrase "foreground calibration" |
| B | A broad query using OR across many synonyms |
| C | A balanced query combining architecture and technique terms |

For each query you count the relevant papers in the result set and calculate precision and recall to two decimal places. The narrow query and the broad query sit at opposite ends of the trade-off: broadening a query raises recall and lowers precision, and narrowing does the opposite. At the end you use the numbers to choose the query that suits a stated purpose.

The question on screen is *What fraction of the results are relevant, and what fraction of the relevant papers were found?*

## How to Use

1. The corpus is drawn as a grid of 20 papers. Papers returned by the current query have a **solid blue box**; papers that were not returned have a **dashed box**. Query A is shown first.
2. Press **Reveal Relevant Set**. Each relevant paper now carries a star (★).
3. Use the checkboxes to mark the returned papers that are relevant. Each marked paper shows a check mark (✓) in the grid, and the panel counts how many you marked. Marking is a counting aid and is not scored.
4. Type precision and recall as decimals with two places, for example `0.25`, and press **Check Values** (or press Enter). A value counts as correct when it is within 0.01 of the reference value.
5. You have **two attempts** for each query. After a first attempt with a wrong value you see a hint, and a correct value is locked with a ✓ so you change only the other one. After a correct answer, or after the second attempt, the sim shows the worked counts (TP, FP, FN and both fractions) and labels every paper in the grid TP, FP, or FN.
6. Press **Next Query** to repeat the steps for queries B and C.
7. Press **Go to Purpose Question**, choose a query from the list, and press **Submit Choice**. You have one attempt. The sim shows whether your choice is correct, the correct answer with its reason, the worked values for all three queries, and your score.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/search-precision-recall-explorer/main.html"
        height="858px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will calculate the precision and recall of three search queries run on a corpus of twenty papers with eight known relevant papers, and choose the query that suits a stated purpose (Bloom: Apply, verb: calculate).

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10-15 minutes

### Prerequisites

Search strategy, precision, recall, true positive, false positive, and false negative, all defined in the section "Searching: Strategy, Keywords, and Sources" of [Chapter 11](../../chapters/11-literature-search-synthesis/index.md).

### Activities

1. **Exploration** (3 min): Before revealing the relevant set, look at the result sets of the three queries. Predict which query will have the highest recall and which the highest precision.
2. **Guided Practice** (7 min): Work through queries A, B, and C. For each one, mark the relevant returned papers, write down TP, FP, and FN, and only then compute the two fractions. Compare query A and query B: one has high recall and low precision, and the other the reverse.
3. **Assessment** (5 min): Answer the purpose question. Then, without the sim, state which query you would choose if you needed a short list of the best papers on a subtopic, and justify the choice with the numbers.

### Assessment

- **Evidence of mastery:** at least 5 of the 6 precision and recall values are correct (each within 0.01 of the reference value, on the first or second attempt for that query) and the purpose-question choice is correct.
- Browsing the corpus and marking papers is exploration and is not evidence.
- Watch for three misconceptions: that a query returning many results is a good query, that high precision means the search found everything relevant, and that precision and recall always move together.

## References

1. [Chapter 11: AI-Assisted Literature Search and Synthesis](../../chapters/11-literature-search-synthesis/index.md) - the section "Searching: Strategy, Keywords, and Sources" defines precision and recall and states that broadening a query raises recall and lowers precision. The corpus and queries in this MicroSim are synthetic and invented for this exercise.
