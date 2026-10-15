---
title: "Choosing Models and Writing Clear Prompts"
description: "How access method, cost, latency, and openness shape the choice of a model for a research project, how retrieval adds your own documents, and how clear instructions, constraints, output formats, roles, and examples make prompts reliable."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 09:21:42"
version: 1.11
---

# Choosing Models and Writing Clear Prompts

## Summary

This chapter turns model knowledge into practical choices: how model size, cost, latency, and access method affect a project, when a local or open-weight model makes sense, and how retrieval adds your own documents. It then introduces the first prompting techniques: clear instructions, constraints, roles, and examples. After this chapter you can pick a model for a task and write a prompt that states its output format.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| API Access | 34 |
| Token Cost | 11 |
| Model Selection | 3 |
| Open Weight Model | 2 |
| Local Model | 1 |
| Rate Limit | 1 |
| Latency | 1 |
| Embedding | 6 |
| Vector Search | 5 |
| Retrieval Augmented Generation | 2 |
| Model Version Drift | 1 |
| Prompt Engineering | 579 |
| Clear Instructions | 440 |
| Output Format | 62 |
| Constraints | 226 |
| Role Prompting | 2 |
| Few-Shot Examples | 7 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 2: How Language Models Work](../02-how-language-models-work/index.md)

!!! mascot-welcome "From Using a Model to Choosing One"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This chapter is where you stop asking "what can the model do?" and start asking "which model, reached how, at what price, and told what?" By the end you will be able to choose a model for a task and write a prompt precise enough that you can check the answer. Trust, but verify!

## Reaching a Model Through an API

In Chapter 2 you met two ways of using a model: a chat interface and a command line. Both sit on top of a third thing that you need to understand to choose well. **API access** is the ability to send a prompt to a model from a program, over the network, and receive the completion as data. API is short for application programming interface. A chat product is, in effect, a graphical program that makes these calls for you.

The distinction matters because an API call is repeatable and scriptable. You send a request that names the model, supplies the messages, and sets parameters such as the temperature and the maximum number of output tokens. You receive a response that includes the completion and a count of the tokens used. You authenticate with a secret **API key** that identifies your account and is tied to your billing. Treat the key like a password: store it in an environment variable or a secrets manager, never inside a prompt, a notebook that you share, or a repository. A key committed to a public repository is typically scraped within minutes.

An API gives you three things a chat window does not. You can run the same prompt over a hundred inputs in a loop. You can pin the exact model version and settings and write them in your lab notebook. And you can wire the model into a pipeline, so that its output is checked by a script before a human sees it. Each of these is a prerequisite for the verification practices in later chapters.

An API also brings three practical constraints, each of which can break a pipeline that worked on five inputs and fails on five thousand.

- **Token cost** is the price of a request, computed from the number of tokens in and out.
- **Latency** is the time between sending a request and receiving the response.
- A **rate limit** is the maximum number of requests, or tokens, a provider will accept from you in a time window.

Token cost is the product of usage and price. Providers quote prices per million tokens, with different prices for input tokens and output tokens. If \( t_{\text{in}} \) and \( t_{\text{out}} \) are the input and output token counts and \( p_{\text{in}} \) and \( p_{\text{out}} \) are the prices per million tokens, then

\[
C = \frac{t_{\text{in}}\, p_{\text{in}} + t_{\text{out}}\, p_{\text{out}}}{10^{6}}.
\]

Consider a worked example with illustrative prices: 3 dollars per million input tokens and 15 dollars per million output tokens. You want to classify 200 abstracts. Each request carries about 500 input tokens, a 400-token abstract plus a 100-token instruction, and returns about 150 output tokens. The totals are 100,000 input tokens and 30,000 output tokens. The cost is \( (100{,}000 \times 3 + 30{,}000 \times 15) / 10^{6} = 0.75 \) dollars. A model priced at five times those rates costs 3.75 dollars for the same job. Neither figure is a concern for a single run, but a development loop of 20 prompt revisions over the same 200 abstracts multiplies the cost by 20, and a pipeline that feeds a long document into every call multiplies the input tokens by the document length.

Latency and rate limits determine wall-clock time. If each request takes 4 seconds and you send them one after another, 200 requests take 800 seconds, about 13 minutes. Sending ten at a time cuts that to around 80 seconds, unless the provider caps you at 50 requests per minute (an illustrative limit), in which case the job takes 4 minutes whatever you do. When a limit is exceeded the API returns an error, and a script that does not wait and retry will fail partway through, leaving a half-processed set of results. Always write batch scripts so that they log which inputs completed and can resume.

!!! mascot-tip "Price the Whole Loop, Not One Call"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you run a batch, run five items and read the usage counts the API returns. Multiply by the number of items and by the number of revisions you expect to make. If the total surprises you, shorten the input or switch to a cheaper model for the development loop and use the better model only for the final run.

## Selecting a Model

**Model selection** is the choice of which model, through which access method, to use for a given task. It is a trade-off among capability, cost, latency, privacy, and reproducibility. There is no best model; there is a best model for a task under constraints. Two further distinctions shape the decision.

An **open-weight model** is a model whose trained parameters are published, so that you can download and run them yourself, usually under a license that states what you may do with them. This is different from "open source" in the strict sense, because the training data and code may not be released. A **local model** is any model that runs on hardware you control, such as your laptop, a lab workstation, or a departmental cluster. Open-weight models are what make local models possible. Their appeal for research is concrete: your data never leaves your machine, the model works with no network connection, the exact weights can be archived with your results, and there is no per-token charge once the hardware exists. Their costs are equally concrete: capable models need substantial memory, usually a GPU, and the strongest hosted models are generally ahead of what you can run locally.

A related hazard is **model version drift**. Hosted models are updated, and a name such as a model family can point to different weights over time. The same prompt run six months apart can return different results, which silently invalidates a comparison. The defense is to record the exact model identifier, the date, and the settings with every result, to pin a dated version when the provider offers one, and to rerun a small fixed test set whenever the model changes. A local open-weight model has no drift unless you change the file, which is the reason it is attractive for work that must be reproduced years later.

| Situation | Chat interface | Hosted API | Local open-weight model |
|---|---|---|---|
| One-off exploration | Best fit | Overkill | Overkill |
| Batch over many inputs | Impractical | Best fit | Fit if hardware allows |
| Data that must not leave the site | Not allowed | Check policy and terms | Best fit |
| Needs the strongest model | Fit | Best fit | Often behind |
| Must be reproducible in years | Poor | Fair if a version is pinned | Best fit |
| No network or air-gapped | Not possible | Not possible | Only option |

*Table 1. Matching an access path to a situation. "Best fit" is a tendency, not a rule.*

#### Diagram: Model Choice Scenario Sorter

<details markdown="1">
<summary>Model Choice Scenario Sorter</summary>
Type: microsim
**sim-id:** model-choice-scenario-sorter<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** recommend<br/>
**Learning Objective:** The learner will recommend one of three access paths, chat interface, hosted API, or local open-weight model, for each of eight research scenarios, with at least 6 of 8 recommendations matching the reasoning in Content.

**Prerequisites:** chat interface, API access, token cost, latency, rate limit, open-weight model, local model, and model version drift, all defined in the sections "Reaching a Model Through an API" and "Selecting a Model" above.

**Evidence of Mastery:** For each of eight scenarios the learner commits one of the three access paths and then names the single deciding factor from a list of four. A scenario is correct when the access path equals the answer in Content. The factor choice is feedback only and is not scored. Mastery is at least 6 of 8 correct on the first attempt. Reading the scenario details is exploration and is not evidence.

**Misconceptions:** (1) A local model is always the safest or cheapest choice. (2) The strongest hosted model is the right choice for every task. (3) A chat interface is adequate for any task because the model is the same.

**Instructional Rationale:** Evaluate-level work needs the learner to apply criteria to a case and defend a choice. Scenarios are written so that each path is correct for some cases, and so a single heuristic such as "always choose the best model" fails on at least two items.

**Content:**

Access paths: Chat interface (hosted model used through a web or desktop application), Hosted API (hosted model called from a script), Local open-weight model (a downloadable model run on hardware the researcher controls).

Deciding factors: Privacy or data policy, Scale and automation, Reproducibility over time, Capability and effort.

| # | Scenario | Correct path | Deciding factor | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | You spend 30 minutes exploring the vocabulary of an unfamiliar topic, with no files and no data. | Chat interface | Capability and effort | An interactive, one-off exploration needs no scripting, no pinned version, and no data handling. |
| 2 | You must classify 5,000 public abstracts into four categories overnight and save the labels to a file. | Hosted API | Scale and automation | A scripted loop over many inputs needs an API. The data are public, and the cost is a small multiple of the worked example in the chapter. |
| 3 | You must analyze measured data from an unpublished chip, and the sponsor's agreement forbids sending it off-site. | Local open-weight model | Privacy or data policy | The data cannot leave the site, so only a model running on controlled hardware is permitted. |
| 4 | You want a reworded version of one paragraph of your own draft paper. | Chat interface | Capability and effort | A single short text with no data issue is the simplest possible use. |
| 5 | A nightly job flags regressions in simulation logs, and the same job must be re-runnable with the identical model in three years. | Local open-weight model | Reproducibility over time | Hosted models drift and are retired. Weights you hold can be archived and rerun. |
| 6 | You want help checking a multi-step derivation of a transfer function, once, from a public textbook problem. | Chat interface | Capability and effort | A one-off, checkable task with no data policy issue is served by the interactive tool, using a capable model. |
| 7 | A lab pipeline must summarize 200 new papers each week and write each summary to a file with the citation. | Hosted API | Scale and automation | A recurring batch with file output needs a scriptable interface. The papers are public. |
| 8 | A measurement workstation in an RF shielded room has no network connection and you want to parse its logs. | Local open-weight model | Privacy or data policy | With no network, a hosted model is not reachable, so only a local model can run there. |

**Provenance:** The access paths and decision criteria are from the sections "Reaching a Model Through an API" and "Selecting a Model" of this chapter. All scenarios are invented for illustration, and the sim labels them "illustrative scenarios".

**Rules:** Each scenario has exactly one correct path, given in the table. The correct path is not influenced by the learner's earlier answers. The score counts only the path choice.

**Learner Activity:**

1. The learner reads scenario 1.
2. The learner chooses one of the three access paths and one of the four deciding factors and submits.
3. The sim shows whether the path was correct and the "Why" sentence, then moves to the next scenario.
4. After scenario 8 the sim shows the count correct, and for each missed scenario the misconception it exposes.

**Feedback:** Eight scenarios, one attempt each, in a fixed order. Correct: "Correct: <path>." plus the "Why" sentence. Incorrect: "The better fit is <path>." plus the "Why" sentence. The correct path is always revealed after the single attempt. A final score "n of 8 correct" is shown, with whether the mastery threshold of 6 was met.

**Starting State:** Scenario 1 is shown with no path chosen. The question on screen is "Which access path would you recommend, and why?"

**Chapter Anchors:** The chapter states that local open-weight models fit data that cannot leave the site, offline work, and reproducibility, that hosted APIs fit scripted batches, and that a chat interface fits one-off exploration. The chapter's worked cost example is 200 abstracts costing 0.75 dollars at the stated illustrative prices.
</details>

<iframe src="../../sims/model-choice-scenario-sorter/main.html" height="777px" width="100%" scrolling="no"></iframe>

*MicroSim: Model Choice Scenario Sorter. [Open it fullscreen](../../sims/model-choice-scenario-sorter/main.html).*

## Adding Your Own Documents: Embeddings, Vector Search, and Retrieval

A model does not know your lab's notebook, your private papers, or last month's preprints. The usual remedy is not to retrain the model but to *retrieve* the relevant passages and place them in the prompt. Three concepts make this work, and they are best taken in order.

An **embedding** is a list of numbers, a vector, that represents the meaning of a piece of text, produced by a model trained so that texts with similar meaning receive vectors that point in similar directions. A real embedding has hundreds to thousands of numbers. Two sentences that share no words, such as "calibrating comparator offset" and "removing input-referred bias in a latch", can still land close together, because the vectors encode meaning and not spelling.

**Vector search** is the retrieval of the stored vectors most similar to the vector of a query. The common similarity measure is cosine similarity, the cosine of the angle between two vectors. For vectors \( \mathbf{a} \) and \( \mathbf{b} \),

\[
\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{\lVert \mathbf{a} \rVert \, \lVert \mathbf{b} \rVert}.
\]

A value near 1 means the vectors point in nearly the same direction, a value near 0 means they are unrelated, and a negative value means they point apart. Notice that the search always returns *something*: the top results are simply the least bad, and a weak match comes back with the same confident formatting as a strong one. A similarity threshold, below which results are discarded, is the guard against that.

**Retrieval-augmented generation (RAG)** combines these steps. Your documents are split into passages and embedded once. At question time the question is embedded, the most similar passages are retrieved by vector search, and they are inserted into the prompt with an instruction to answer from them. The model's answer is then grounded in text you can point to, and the passages give you something to cite.

A small worked example uses two-dimensional toy vectors so that the geometry can be seen. The vectors are invented for illustration. Take a query vector \( q = (0.90, 0.25) \) and two stored passages \( d_1 = (0.95, 0.20) \) and \( d_3 = (0.15, 0.95) \). The cosine of \( q \) with \( d_1 \) is \( (0.90 \times 0.95 + 0.25 \times 0.20) / (0.934 \times 0.971) = 0.998 \). The cosine with \( d_3 \) is \( (0.90 \times 0.15 + 0.25 \times 0.95) / (0.934 \times 0.962) = 0.415 \). The first passage is retrieved, and the second is not.

#### Diagram: Embedding Vector Search Explorer

<details markdown="1">
<summary>Embedding Vector Search Explorer</summary>
Type: microsim
**sim-id:** embedding-vector-search-explorer<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/Digital-Transformation-with-AI-Spring-2026/tree/main/docs/sims/vector-similarity<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** infer<br/>
**Learning Objective:** The learner will infer, from the angles between vectors in a two-dimensional toy embedding space, which two stored passages vector search returns for each of three queries and whether the second result clears a similarity threshold of 0.90.

**Prerequisites:** embedding, vector search, cosine similarity, and retrieval-augmented generation, all defined in the section "Adding Your Own Documents" above.

**Evidence of Mastery:** For each of three queries the learner commits the two passages they expect to be retrieved, in order, and then marks the second result as "clears threshold" or "below threshold". A query is correct when both retrieved passages and their order match Content and the threshold mark matches. Mastery is 3 of 3 correct. Moving the query vector in exploration is not evidence.

**Misconceptions:** (1) Vector search matches words, not meanings. (2) The top results are always good matches. (3) Retrieval returns the passage that is closest in distance, not in direction.

**Instructional Rationale:** Understand-level inference asks the learner to predict the outcome from the geometry before the computed ranking is shown. The threshold step targets the misconception that a returned result is a relevant result.

**Content:**

The two dimensions are an illustrative "analog–digital" axis and an illustrative "learning" axis. Real embeddings have hundreds to thousands of dimensions and no named axes.

Stored passages:

| ID | Passage title | Vector (x, y) |
|---|---|---|
| D1 | SAR ADC offset calibration | (0.95, 0.20) |
| D2 | Delta-sigma noise shaping | (0.85, 0.35) |
| D3 | Transformer accelerator dataflow | (0.15, 0.95) |
| D4 | Edge-inference quantization | (0.30, 0.90) |
| D5 | LDO stability compensation | (0.70, -0.45) |
| D6 | Analog and digital mixed-signal learning | (0.60, 0.60) |

Queries, in this order, with the cosine similarity of each stored passage to the query:

| Query | Vector (x, y) | D1 | D2 | D3 | D4 | D5 | D6 | Top 2 in order | Second result clears 0.90? | Why (shown as feedback) |
|---|---|---|---|---|---|---|---|---|---|---|
| Q1: comparator offset in successive approximation converters | (0.90, 0.25) | 0.998 | 0.993 | 0.415 | 0.559 | 0.666 | 0.871 | D1, D2 | Yes | Both retrieved passages point in almost the same direction as the query. |
| Q2: reducing memory traffic in neural network hardware | (0.20, 0.90) | 0.413 | 0.572 | 0.998 | 0.995 | -0.345 | 0.844 | D3, D4 | Yes | Both neural-hardware passages point nearly along the query. |
| Q3: keeping a regulator stable under load | (0.75, -0.40) | 0.766 | 0.637 | -0.327 | -0.167 | 0.997 | 0.291 | D5, D1 | No | Only D5 is a close match. D1 is returned because top 2 always returns two results, and 0.766 is below the threshold. |

**Provenance:** The cosine formula is from the section "Adding Your Own Documents" of this chapter. All vectors, titles, and queries are invented for illustration, and the sim labels them "illustrative, not output of a real embedding model". Similarities are computed from the vectors and rounded to 0.001.

**Rules:** Cosine similarity = (a . b) / (|a| |b|). Results are ranked by descending cosine similarity. The number of results returned is always 2 (top-k with k = 2). A result clears the threshold when its cosine similarity >= 0.90. Ties are broken by the lower passage number. The vectors are fixed, and in exploration the learner may move the query vector anywhere in the plane.

**Learner Activity:**

1. The learner sees the six passage vectors as arrows from the origin and the first query vector, and reads the query text.
2. The learner commits the two passages they expect to be retrieved, in order, and marks whether the second clears the threshold. The learner submits.
3. The sim shows the cosine similarities for all six passages, the ranking, and the "Why" sentence, and advances to the next query.
4. After Q3, exploration opens: the learner drags the query vector and watches the ranking and the threshold marks update. The learner should notice that a vector far from every passage still returns two results.

**Feedback:** Three queries, one attempt each, in a fixed order. Correct: "Correct: <D?> then <D?>." plus the "Why" sentence. Incorrect: the correct ranking with the cosine values and the "Why" sentence. The correct answer is always revealed after the single attempt. A final count "n of 3 correct" is shown.

**Starting State:** Query 1 is shown with the six passage vectors and no ranking. The question on screen is "Which two passages will vector search return?"

**Chapter Anchors:** The chapter's worked example gives a query vector (0.90, 0.25), passage d1 (0.95, 0.20) with cosine 0.998, and passage d3 (0.15, 0.95) with cosine 0.415. It states that search always returns results and that a threshold guards against weak matches.
</details>

<iframe src="../../sims/embedding-vector-search-explorer/main.html" height="917px" width="100%" scrolling="no"></iframe>

*MicroSim: Embedding Vector Search Explorer. [Open it fullscreen](../../sims/embedding-vector-search-explorer/main.html).*

!!! mascot-warning "Retrieved Does Not Mean Relevant"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is to treat the passages a retrieval step returns as evidence that your documents contain the answer. The search ranks; it does not judge. Set a similarity threshold, instruct the model to answer "not found in the provided documents" when the passages do not contain the answer, and read the retrieved passages yourself on a sample.

## Prompt Engineering

Everything so far has concerned the model and how to reach it. **Prompt engineering** is the practice of designing the prompt so that a model reliably produces the output you need. The word "engineering" is deliberate. A prompt is a specification, the model is a component with variable behavior, and the work is to write a specification precise enough that you can tell whether the component met it. It is not a bag of magic phrases, and phrases that work on one model version often fail on another.

A useful discipline is to treat a prompt as having four parts that can be named and inspected separately: the *task* (what to do), the *constraints* (the limits on how), the *output format* (the shape of the result), and the *context* (the material to work on). The techniques in this chapter correspond to these parts, plus two refinements, a role and examples.

### Clear Instructions

**Clear instructions** state one task, in terms of an observable outcome, using the vocabulary of the field. Three habits produce most of the gain. Use a verb that names the action ("list", "classify", "extract", "compare", "derive") instead of an open one ("look at", "think about", "help with"). State the goal and the audience, because the same material is summarized differently for a reading group and for a funding panel. And give one task per prompt where you can, because a prompt asking for five things gets five uneven answers.

The most reliable test of an instruction is to hand it to a competent colleague who has not seen the project and ask what they would produce. If two colleagues would produce visibly different outputs, the instruction underdetermines the task, and a model will resolve that ambiguity in whatever way its training data makes likely, not the way you intended.

A worked example shows the effect. The weak prompt is "Summarize this paper." The gaps are the length, the audience, the content to prioritize, and what to do when the paper does not state something. A model must guess all four. The revised prompt below says them explicitly. Read it first as plain text, then notice which sentence carries which of the four parts.

```text
You are reviewing a paper for a graduate reading group in analog circuit design.

Summarize the attached paper's contribution in at most 120 words.
Use only information that appears in the attached text. If a value is not stated,
write "not stated" instead of estimating it.

After the summary, output a table with these columns:
Architecture | Process node | Supply voltage | Sampling rate | ENOB | Power
One row for the paper's main design. Example row (illustrative):
SAR | 65 nm | 1.0 V | 1 MS/s | 9.2 | 45 µW
```

### Constraints

**Constraints** are explicit limits on what the model may do or use: its length, its sources, its scope, and what it must not do. They matter more than they appear to, because without them the model fills every unspecified dimension with its defaults, and the defaults are tuned for a generic reader. The constraints that most often matter in research work fall into four families.

- *Source constraints* limit what may be used: "use only the attached text", "cite only papers from the provided list".
- *Scope constraints* limit the territory: "consider only successive-approximation converters, not pipeline architectures".
- *Length and style constraints* limit the shape: "at most 120 words", "no marketing language".
- *Escape constraints* give the model a sanctioned way out: "if the text does not state it, write 'not stated'".

The last family is the one most often missed, and it is the cheapest defense against hallucination. A model that is required to answer and is given no permitted way to say "unknown" will produce a plausible answer. Make "unknown" a legal output, and then look for how often it occurs.

### Output Format

An **output format** is an explicit statement of the shape of the response: a table with named columns, a JSON object with named fields, a numbered list, a fixed number of sentences. Its value is practical. A response in a known shape can be parsed by a script, compared across runs, and checked at a glance. For work that feeds a pipeline, ask for a machine-readable format, give the field names, and say what to do with missing values. For work that a human will read, a table with named columns serves nearly as well and is easier to scan.

A sample specification for a parseable result, with the purpose of each key explained first. The `claim` key holds one sentence from the paper, `supported` holds true or false, and `evidence` holds the supporting quotation or the string "not stated".

```json
{
  "claim": "string, one sentence from the paper",
  "supported": "true or false",
  "evidence": "string, a quotation from the paper, or \"not stated\""
}
```

!!! mascot-thinking "A Prompt Is a Specification You Can Test"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice what the format buys you beyond tidiness. Once the answer has a named structure, "is this output valid?" becomes a question a script can answer, and verification stops depending on your attention.

### Role Prompting

**Role prompting** assigns the model a role, such as "a reviewer for a circuits conference" or "a careful numerical analyst", at the start of the prompt. It works by shifting the style, vocabulary, and the set of considerations the model brings, and it is most useful for tone and perspective. It is weaker than it sounds as a way to *add knowledge or accuracy*: telling a model it is a world expert does not give it expertise it lacks. Use a role to set the viewpoint, and use constraints and examples to enforce the behavior.

### Few-Shot Examples

**Few-shot examples** are one or more worked input-and-output pairs placed in the prompt to show the model what you want. A prompt with no examples is called zero-shot. Examples are the strongest single way to communicate a format or a judgment that is hard to describe, such as how to label a borderline abstract. They have two costs: they consume context, and the model will imitate them closely, including their quirks. Choose examples that cover the range of cases, include a boundary case, and vary them so that a surface feature, such as always the same length, is not mistaken for the rule. Mark any invented example as illustrative so a reader does not take it for data.

| Technique | What it controls | Typical failure if omitted | Cost |
|---|---|---|---|
| Clear instructions | The task and audience | Plausible answer to a different question | Low |
| Constraints | Sources, scope, length, "unknown" | Invented details; scope creep | Low |
| Output format | Shape of the result | Unparseable or inconsistent results | Low |
| Role prompting | Tone and perspective | Generic voice | Very low |
| Few-shot examples | Format and judgment | Inconsistent labels | Context tokens |

*Table 2. The five prompt techniques of this chapter and what each controls.*

The last MicroSim practices recognizing which technique a sentence of a prompt is carrying. This is a real skill: when a prompt misbehaves, the way to fix it is to find which component is missing or doing the wrong job.

#### Diagram: Prompt Component Sorter

<details markdown="1">
<summary>Prompt Component Sorter</summary>
Type: microsim
**sim-id:** prompt-component-sorter<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/ai-persona-testing/tree/main/docs/sims/prompt-architecture-builder<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish which prompt component, clear instruction, constraint, output format, role, or few-shot example, each of ten prompt sentences carries, with at least 8 of 10 classified correctly.

**Prerequisites:** clear instructions, constraints, output format, role prompting, and few-shot examples, all defined in the section "Prompt Engineering" above.

**Evidence of Mastery:** For each of ten sentences from one prompt the learner commits one of five component labels. A label is correct when it equals the answer in Content. Mastery is at least 8 of 10 correct on the first attempt. Reading the full assembled prompt is exploration and is not evidence.

**Misconceptions:** (1) A sentence that sets a length is part of the output format, when it is a constraint. (2) A role sentence also adds domain knowledge. (3) An example is only decoration and does not specify behavior.

**Instructional Rationale:** Analyze-level work needs the learner to decompose a whole into parts and attribute each part to its function. Sorting sentences from a single working prompt shows the components interacting in one place.

**Content:**

The ten sentences, in the order they appear in the assembled prompt:

| # | Sentence | Correct component | Why (shown as feedback) |
|---|---|---|---|
| 1 | You are reviewing a paper for a graduate reading group in analog circuit design. | Role | It sets a viewpoint and audience and gives the model no new knowledge. |
| 2 | Summarize the attached paper's contribution. | Clear instruction | It names one task with a verb that describes an observable action. |
| 3 | Use at most 120 words. | Constraint | It limits the length of the answer and does not describe its shape. |
| 4 | Use only information that appears in the attached text. | Constraint | It limits the sources the model may use. |
| 5 | If a value is not stated, write "not stated" instead of estimating it. | Constraint | It gives a sanctioned way out, so that the model need not invent a value. |
| 6 | After the summary, output a table with these columns: Architecture, Process node, Supply voltage, Sampling rate, ENOB, Power. | Output format | It names the structure and the fields of the result. |
| 7 | Give one row for the paper's main design. | Output format | It states how many rows the structure has. |
| 8 | Example row: SAR, 65 nm, 1.0 V, 1 MS/s, 9.2, 45 µW. | Few-shot example | It shows a worked instance of the format with illustrative values. |
| 9 | Consider only successive-approximation converters. | Constraint | It limits the scope of the territory the model should consider. |
| 10 | Classify the paper as "analog-dominant" or "digital-assisted". | Clear instruction | It names a second task with an observable result in a fixed set. The chapter advises one task per prompt where possible, so in practice this sentence belongs in a separate prompt. |

Component labels: Clear instruction, Constraint, Output format, Role, Few-shot example.

**Provenance:** The component definitions are from the section "Prompt Engineering" of this chapter. The sentences are adapted from the chapter's worked prompt, with sentences 9 and 10 added. All example values are invented for illustration, and the sim labels them "illustrative".

**Rules:** Each sentence has exactly one correct label. Labels are chosen from the five in Content. The score counts the labels that match on the single attempt.

**Learner Activity:**

1. The learner sees the assembled prompt with sentence 1 highlighted.
2. The learner chooses one of the five labels for the highlighted sentence and submits.
3. The sim shows whether it was correct and the "Why" sentence, then highlights the next sentence.
4. After sentence 10, the sim shows the count correct, and a tally of how many sentences carry each component. The learner should notice that constraints are the most numerous.

**Feedback:** Ten sentences, one attempt each, in a fixed order. Correct: "Correct: <label>." plus the "Why" sentence. Incorrect: "This sentence is a <label>." plus the "Why" sentence. The correct label is always revealed after the single attempt. A final score "n of 10 correct" is shown with whether the mastery threshold of 8 was met.

**Starting State:** The assembled prompt is shown with sentence 1 highlighted. The question on screen is "Which component of the prompt does this sentence carry?"

**Chapter Anchors:** The chapter's worked prompt contains a role, a length constraint of at most 120 words, a source constraint, an escape constraint, a table output format with six named columns, and one illustrative example row. The chapter states that role prompting sets viewpoint and does not add knowledge.
</details>

<iframe src="../../sims/prompt-component-sorter/main.html" height="767px" width="100%" scrolling="no"></iframe>

*MicroSim: Prompt Component Sorter. [Open it fullscreen](../../sims/prompt-component-sorter/main.html).*

!!! mascot-encourage "Your First Prompts Will Be Vague"
    ![Volt encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If your early prompts get plausible but unusable answers, that is normal, because you know the context so well that it feels obvious. You have written methods sections for readers who lack your context. Write the prompt the same way, then change one thing at a time and keep the version that passes your check.

A final point connects this chapter to the next. Prompt engineering at this level is a way of writing a good single message. Real research tasks depend on more than one message: which documents to include, how to carry earlier results forward, how to test a prompt, and how to defend against hostile text. That wider view is context engineering, the subject of Chapter 4.

## Summary and Key Takeaways

Choosing a model is a constrained trade-off, and writing a prompt is writing a specification. Both are decisions you can make deliberately, record, and revisit, which is what turns casual use into research practice.

The main points to carry forward:

- **API access** makes model use repeatable and scriptable, and API keys are secrets.
- **Token cost, latency, and rate limits** decide whether a batch is practical. Price the whole loop, not one call.
- **Model selection** weighs capability, cost, privacy, and reproducibility. A local open-weight model is the answer when data must stay on site, work is offline, or results must be rerun years later.
- **Model version drift** silently changes hosted-model results, so record the model identifier, date, and settings.
- **Embeddings, vector search, and RAG** bring your own documents into the prompt, and retrieval returns results whether or not they are relevant.
- **Clear instructions** name one observable task for a stated audience.
- **Constraints** bound sources, scope, and length, and an "unknown" escape is the cheapest guard against invention.
- **Output formats** make results parseable and checkable.
- **Roles** set viewpoint, and **few-shot examples** communicate format and judgment, at the cost of context.

!!! mascot-celebration "You Can Pick and Specify"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now choose among a chat interface, a hosted API, and a local open-weight model for a stated scenario, estimate what a batch will cost, and write a prompt with a clear task, explicit constraints, and a defined output format.
