---
title: "Research Idea Ranking Matrix"
description: "Calculate weighted scores for four illustrative SAR ADC research ideas under two weighting profiles, find the idea that ranks first under each, then set your own weights and watch the ranking change."
image: /sims/research-idea-ranking-matrix/research-idea-ranking-matrix.png
og:image: /sims/research-idea-ranking-matrix/research-idea-ranking-matrix.png
social:
   cards: false
quality_score: 0
status: built
---

# Research Idea Ranking Matrix

<iframe src="main.html" height="852px" width="100%" scrolling="no"></iframe>

[Run the Research Idea Ranking Matrix MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Idea ranking orders candidate ideas by weighted criteria. The weighted score of an idea is

\[ S = \sum_i w_i s_i \]

where \( s_i \) is its score on criterion \( i \) from 1 to 5 and \( w_i \) is the weight, with the weights summing to 1. This MicroSim asks you to **calculate** weighted scores for four research ideas on a 10-bit SAR ADC and to see that the ranking depends on the weights.

The four ideas are scored on impact, feasibility, novelty, and low risk, where 5 is best and a higher "Low risk" score means lower risk. Two weighting profiles apply different priorities to the same scores: **P1: Exploratory thesis** (0.3, 0.1, 0.4, 0.2) and **P2: Deadline in three months** (0.2, 0.5, 0.1, 0.2). The ideas, scores, and weights are invented for illustration.

Five questions come in a fixed order: two weighted-score calculations and three questions about which idea ranks first. After each question the sim shows the worked calculation and the full ranking under both profiles. After the fifth question, exploration opens and you can set your own weights.

**Learning objective:** calculate the weighted score of research ideas under two weighting profiles and state which idea ranks first under each, with all five answers correct.

## How to Use

1. Read the score matrix and the two weighting profiles. The profile a question uses is outlined and marked with an arrow.
2. For a number question, type your answer in the **Answer** box and press **Submit** (or Enter). A number is correct when it is within 0.05 of the answer. You have two attempts. After a first wrong attempt the hint is *Multiply each score by its weight and add the four products.*
3. For a choice question, pick an answer from the drop-down list and press **Submit**. You have one attempt.
4. Read the feedback: **Correct.** with the worked calculation, or the correct answer with the worked calculation. The ranking under both profiles appears below it. The running count *n of 5 correct* is at the top.
5. Press **Next Question**. After question 5, press **Explore Weights**.
6. In exploration, move the four sliders (steps of 0.05, from 0.00 to 1.00). The ranking is shown only while the weights sum to 1.00; when they do not, the sim shows the current sum and how much to lower or raise the weights in total. Ties are reported as tied. Try moving a small amount of weight from one criterion to another and watch whether the leader changes.

Feedback uses a check mark or X and words as well as color. Scores are shown to one decimal place.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/research-idea-ranking-matrix/main.html"
        height="852px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective
The learner will calculate the weighted score of research ideas under two weighting profiles and state which idea ranks first under each, with all five answers correct.

### Bloom Level
Apply (verb: **calculate**)

### Duration
10-15 minutes

### Prerequisites
- Idea ranking, weighted score, impact, feasibility, novelty, and risk, from the section "Judging Feasibility, Ranking, and Novelty" in Chapter 14

### Activities
1. Answer the five questions in order, writing out each weighted-sum calculation before you submit.
2. In exploration, start from P1 and find the smallest change of weight that changes which idea ranks first.
3. Choose weights that match your own situation and note which idea ranks first and how stable that choice is.

### Evidence of Mastery
- For each of five questions the learner enters a number or chooses an answer. A number is correct when it is within 0.05 of the answer key, and a choice is correct when it equals the answer key.
- Mastery is 5 of 5 correct.
- Changing the weights in exploration mode is not evidence.

## References

1. [Chapter 14: Brainstorming and Problem Framing](../../chapters/14-brainstorming-problem-framing/index.md) - the section "Judging Feasibility, Ranking, and Novelty" gives the weighted-sum formula and explains why the weights are the real decision.
