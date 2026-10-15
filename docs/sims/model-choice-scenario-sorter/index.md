---
title: "Model Choice Scenario Sorter"
description: "Recommend a chat interface, a hosted API, or a local open-weight model for eight illustrative research scenarios, name the deciding factor, and get feedback on each recommendation."
social:
   cards: false
quality_score: 0
status: built
---

# Model Choice Scenario Sorter

<iframe src="main.html" height="777px" width="100%" scrolling="no"></iframe>

[Run the Model Choice Scenario Sorter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

There is no best model, only a best model for a task under constraints. This MicroSim asks you to **recommend** one of three access paths for each of eight illustrative research scenarios:

| Access path | Meaning |
|---|---|
| Chat interface | Hosted model used through a web or desktop application |
| Hosted API | Hosted model called from a script |
| Local open-weight model | A downloadable model run on hardware the researcher controls |

For each scenario you also name the single deciding factor: Privacy or data policy, Scale and automation, Reproducibility over time, or Capability and effort. Only the access path is scored; the factor is feedback that helps you check your reasoning.

The scenarios are written so that each path is correct for some of them. A single rule such as "always use the strongest model" or "local is always safest" fails on at least two items. All scenarios are invented for illustration.

## How to Use

1. Read the scenario in the dark-blue box. The question on screen is *Which access path would you recommend, and why?*
2. Choose an access path from the first list and the deciding factor from the second list, then press **Submit**. Each scenario gets one attempt, and your choice cannot be changed after you submit.
3. Read the feedback. A correct answer shows **Correct:** followed by the path; a miss shows **The better fit is** followed by the path. Both are followed by the reason. The better-fit path is outlined in blue and marked with a check; a wrong pick is outlined in orange and marked with an X. A gray line compares your deciding factor with the one the reasoning turns on.
4. Press **Next Scenario** to continue. After scenario 8, press **See Score**.
5. The summary shows *n of 8 correct*, whether you met the mastery threshold of 6, and, for each missed scenario, the misconception it exposes. If the list is long, press **More Missed Scenarios** to page through it.

A missed scenario is linked to the misconception that matches the path you over-applied: choosing a local model where it was not the better fit exposes "a local model is always the safest or cheapest choice"; choosing a hosted API exposes "the strongest hosted model is the right choice for every task"; and choosing a chat interface exposes "a chat interface is adequate for any task because the model is the same".

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/model-choice-scenario-sorter/main.html"
        height="777px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will recommend one of three access paths, chat interface, hosted API, or local open-weight model, for each of eight research scenarios, with at least 6 of 8 recommendations matching the reasoning in the chapter.

- **Bloom level:** Evaluate
- **Bloom verb:** recommend

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research

### Duration
10-15 minutes

### Prerequisites
- Chat interface, API access, token cost, latency, rate limit, open-weight model, local model, and model version drift, from the sections "Reaching a Model Through an API" and "Selecting a Model" in Chapter 3

### Activities

1. **Exploration** (3 min): Before starting, reread Table 1 in Chapter 3 and write one question you would ask about any research task to decide its access path (for example, "Can this data leave the site?").
2. **Practice** (7 min): Work through the eight scenarios. For each, commit an access path and a deciding factor before reading the feedback.
3. **Reflection** (5 min): For each missed scenario, read the misconception it exposes and write one sentence explaining which constraint in the scenario should have decided the choice.

### Assessment
- **Evidence of mastery:** for each of eight scenarios the learner commits one of the three access paths and names the single deciding factor. A scenario is correct when the access path equals the answer key. The factor choice is feedback only and is not scored. Mastery is at least 6 of 8 correct on the first attempt.
- Reading the scenario details is exploration and is not evidence of mastery.

## References

1. [Chapter 3: Choosing Models and Writing Clear Prompts](../../chapters/03-models-and-prompt-basics/index.md) - the sections "Reaching a Model Through an API" and "Selecting a Model" define the access paths and the decision criteria used in every scenario.
