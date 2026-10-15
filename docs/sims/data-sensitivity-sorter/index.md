---
title: "Data Sensitivity Sorter for AI Tools"
description: "Judge which class of AI tool each of eight items of research data may be given to under a four-class illustrative data classification, with immediate feedback and the items grouped by class at the end."
social:
   cards: false
quality_score: 0
status: built
---

# Data Sensitivity Sorter for AI Tools

<iframe src="main.html" height="812px" width="100%" scrolling="no"></iframe>

[Run the Data Sensitivity Sorter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

Placing data in a hosted AI tool is a disclosure to a third party under that provider's terms, and a disclosure cannot be undone. A research group needs a small data classification that people can apply without looking it up, with a rule for what each class may be given to. This MicroSim uses the illustrative classification from Chapter 18 and asks you to **judge** which tools may receive eight items of research data.

| Class | Examples | May be given to |
|---|---|---|
| 0 Public | Published papers, public datasets, open-source code | Any tool |
| 1 Internal | Lab notes on setup, scripts, draft text without new results | An approved hosted tool, or a local model |
| 2 Unpublished | Unpublished measurements and designs of the group | A local model, or a hosted tool with the advisor's written approval |
| 3 Obligated | Data under NDA, export-controlled technical data, personal data of participants, vendor files under license | A local model only, and only if the agreement allows; otherwise no AI tool |

An item that falls in two classes takes the more restrictive one. Each class is tested by two items, including edge cases such as an open-source script and a draft with no new results. The classification is an illustrative policy; your institution, sponsor, and agreements decide the real rules.

**Learning objective:** judge which class of AI tool an item of research data may be given to under a four-class illustrative policy, for eight items, with at least 7 of 8 correct.

## How to Use

1. Read the classification at the top and item 1 in the dark-blue box. The question on screen is *Which tools may receive this?*
2. Choose one of the four tool classes from the drop-down list below the drawing area (**Any tool**; **Approved hosted tool or local**; **Local model, or hosted with the advisor's approval**; **Local model only, if the agreement allows**) and press **Submit**. Each item has one attempt.
3. Read the feedback. A correct answer shows **Correct.** and the item's class, with a check mark; an incorrect answer shows **This item is** the class and the tool class it allows, with an X. Both show the reason, and the item's class is outlined and marked with an arrow in the classification.
4. Press **Next Item** to continue. The items come in a fixed order.
5. After item 8, press **See Score**. The summary shows *n of 8 correct*, whether you met the mastery threshold of 7, and the eight items grouped by class, each marked with a check mark or an X for your answer. Reload the page to start again.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/data-sensitivity-sorter/main.html"
        height="812px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective
The learner will judge which class of AI tool an item of research data may be given to under a four-class illustrative policy, for eight items, with at least 7 of 8 correct.

### Bloom Level
Evaluate (Bloom verb: **judge**)

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research

### Duration
10 minutes

### Prerequisites
- Privacy, confidential data, unpublished results, and data governance, from the section "Privacy, Confidentiality, and Governance" of Chapter 18
- The four data classes of the illustrative classification (Table 1 of Chapter 18)

### Common Misconceptions Addressed
- Only secret data are sensitive.
- Unpublished results are fine to share if they are not under an NDA.
- If a file is on a shared drive it may be given to any tool.

### Evidence of Mastery
- For each of the eight items the learner commits one of the four tool classes. A choice is correct when it equals the answer key.
- Mastery is at least 7 of 8 correct on the first attempt.
- Reading the classification table is exploration and is not evidence of mastery.

## References

1. [Chapter 18: Responsible and Ethical Use of AI](../../chapters/18-responsible-ethical-use/index.md) - the section "Privacy, Confidentiality, and Governance" defines the data classes and is the source of the classification. The items in this MicroSim are invented for illustration.
