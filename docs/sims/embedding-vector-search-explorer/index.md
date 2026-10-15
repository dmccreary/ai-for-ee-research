---
title: "Embedding Vector Search Explorer"
description: "Predict which two passages vector search returns for three queries in an illustrative two-dimensional embedding space, check the second result against a 0.90 cosine threshold, then drag the query and watch the ranking change."
social:
   cards: false
quality_score: 0
status: built
---

# Embedding Vector Search Explorer

<iframe src="main.html" height="917px" width="100%" scrolling="no"></iframe>

[Run the Embedding Vector Search Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Vector search ranks stored passages by the cosine of the angle between each passage vector and the query vector:

\[
\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{\lVert \mathbf{a} \rVert \, \lVert \mathbf{b} \rVert}.
\]

This MicroSim draws six stored passages and three queries as arrows in a two-dimensional toy embedding space, so the geometry can be seen. The two axes are an illustrative "analog–digital" axis and an illustrative "learning" axis. Real embeddings have hundreds to thousands of dimensions and no named axes. All vectors, titles, and queries are invented for illustration and are not the output of a real embedding model.

| ID | Passage title | Vector (x, y) |
|---|---|---|
| D1 | SAR ADC offset calibration | (0.95, 0.20) |
| D2 | Delta-sigma noise shaping | (0.85, 0.35) |
| D3 | Transformer accelerator dataflow | (0.15, 0.95) |
| D4 | Edge-inference quantization | (0.30, 0.90) |
| D5 | LDO stability compensation | (0.70, -0.45) |
| D6 | Analog and digital mixed-signal learning | (0.60, 0.60) |

The search always returns two results (top-k with k = 2), ranked by descending cosine similarity, with ties broken by the lower passage number. A result clears the threshold when its cosine similarity is at least 0.90. Similarities are rounded to 0.001. The key lesson is that the search always returns *something*: a weak second result comes back looking just like a strong one.

## How to Use

1. Read the query text and look at the angles between the orange dashed query arrow and the six blue passage arrows. The question on screen is *Which two passages will vector search return?*
2. Choose the **First result** and the **Second result**, in order, and a **Threshold mark** (clears threshold or below threshold) for the second result. Press **Submit**. Each query gets one attempt; Submit stays disabled until you pick two different passages and a mark.
3. Read the feedback. The table now lists all six passages in rank order with their cosine similarities and a check or X for the 0.90 threshold; the two returned passages are highlighted, drawn in dark blue, and labeled #1 and #2. A shaded wedge around the query shows the region where cosine similarity is at least 0.90. A correct answer shows **Correct:** with the two passages; a miss shows the correct ranking with the cosine values. Both are followed by the reason.
4. Press **Next Query**. After Q3, press **Open Exploration**. The final count *n of 3 correct* stays on screen.
5. In exploration, drag inside the plot (or use the arrow keys) to move the query vector and watch the ranking and threshold marks update. Move the query far from every passage and notice that two results still come back.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/embedding-vector-search-explorer/main.html"
        height="917px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will infer, from the angles between vectors in a two-dimensional toy embedding space, which two stored passages vector search returns for each of three queries and whether the second result clears a similarity threshold of 0.90.

- **Bloom level:** Understand
- **Bloom verb:** infer

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research

### Duration
10 minutes

### Prerequisites
- Embedding, vector search, cosine similarity, and retrieval-augmented generation, from the section "Adding Your Own Documents" in Chapter 3

### Activities

1. **Prediction** (5 min): For each of the three queries, predict the two returned passages and the threshold mark from the angles alone, before any cosine value is shown.
2. **Exploration** (3 min): Drag the query vector between the passage clusters and into the empty lower-left quadrant. Record a query position where the second result falls below the threshold and one where even the first result does.
3. **Reflection** (2 min): Write one sentence explaining why a retrieval pipeline needs a similarity threshold, using Q3 as the example.

### Assessment
- **Evidence of mastery:** for each of three queries the learner commits the two passages they expect to be retrieved, in order, and marks the second result as "clears threshold" or "below threshold". A query is correct when both retrieved passages and their order match the answer key and the threshold mark matches. Mastery is 3 of 3 correct.
- Moving the query vector in exploration is not evidence of mastery.

## References

1. [Chapter 3: Choosing Models and Writing Clear Prompts](../../chapters/03-models-and-prompt-basics/index.md) - the section "Adding Your Own Documents: Embeddings, Vector Search, and Retrieval" defines embeddings, vector search, and cosine similarity, and gives the worked example with q = (0.90, 0.25).
