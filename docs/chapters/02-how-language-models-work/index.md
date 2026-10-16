---
title: "How Language Models Work"
description: "The mechanics a researcher needs: tokens, context windows, prompts and completions, training data and knowledge cutoffs, the causes of hallucination and fabricated citations, and how to choose between a chat interface and a command line."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 09:19:26"
version: 1.11
---

# How Language Models Work

## Summary

This chapter explains the mechanics a researcher needs to know about large language models: how text becomes tokens, how context windows limit long tasks, and how prompts and completions work. It covers training data, knowledge cutoffs, and the causes of hallucination and fabricated citations. After this chapter you can explain why a fluent answer may still be wrong and choose an interface for your work.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Token | 164 |
| Tokenization | 1 |
| Context Window | 145 |
| Context Limit | 5 |
| Prompt | 1718 |
| Completion | 663 |
| System Prompt | 24 |
| Temperature | 1 |
| Training Data | 77 |
| Knowledge Cutoff | 1 |
| Hallucination | 72 |
| Fabricated Citation | 3 |
| Model Size | 8 |
| Reasoning Model | 3 |
| Multimodal Model | 1 |
| Model Benchmark | 1 |
| Chat Interface | 22 |
| Command Line Interface | 172 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)

!!! mascot-welcome "A Model You Can Reason About"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A tool you cannot predict is a tool you cannot supervise. By the end of this chapter you will be able to look at a wrong answer and say which mechanism produced it, and to budget a long task before it silently fails. Trust, but verify!

## What You Send and What Comes Back

Every interaction with a language model reduces to the same exchange: text goes in, and text comes out. The text that goes in is the **prompt**. The text that comes out is the **completion**. These two words carry more weight than they appear to, because every technique in the remaining chapters of this book is a way of controlling one or the other.

The most common mistake about the prompt is to equate it with what you typed. The prompt is *everything the model receives for this one response*: any instructions the application inserted before your message, the earlier turns of the conversation, any files or pasted documents, the output of tools the model called, and finally your latest message. The model has no memory of previous conversations beyond what is present in this assembled text. When a chat application appears to remember what you said ten minutes ago, it is because it sent the earlier turns again as part of the new prompt.

The **completion** is the text the model generates in response. It is produced one piece at a time, each piece chosen on the basis of the prompt and the pieces already produced, until the model emits a special stop signal or reaches a configured length limit. To see what "generated, not retrieved" means in practice, imagine sending the prompt "A SAR ADC resolves one bit per" twice. One run might continue "comparison cycle" and another "clock period", both reasonable and both different. Neither is looked up; each is the continuation the model judged likely at that moment. Two consequences follow, and both matter for research use. First, the completion is *generated*, not retrieved: nothing is looked up in a store of facts, and the same prompt can yield different completions on different runs. Second, the model has no separate channel for "what I am sure of". Confident and uncertain statements are produced by the same mechanism, which is why a completion cannot be trusted by its tone.

It helps to see the whole exchange once as structured data. Most programmatic interfaces represent a prompt as a list of messages. In the example below, `role` says who is speaking (`system` for standing instructions from the application or developer, `user` for you, `assistant` for earlier model replies), `content` is the text itself, and `max_tokens` caps the length of the completion. The field names follow a common convention; they differ slightly between providers.

```json
{
  "messages": [
    {"role": "system",
     "content": "You are a careful assistant for analog circuit research. Say 'unknown' rather than guess."},
    {"role": "user",
     "content": "Define ENOB in one sentence."},
    {"role": "assistant",
     "content": "ENOB is the resolution of an ideal converter that would add the same noise and distortion as the real one."},
    {"role": "user",
     "content": "Now give the formula that relates it to SINAD."}
  ],
  "max_tokens": 200
}
```

Everything in that list, together, is the prompt for the next completion. The model's answer to the last message is conditioned on the first three, and the model sees them again from the beginning on every turn.

!!! mascot-thinking "The Model Only Has What Is Sent"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of each response as a new reader who has been handed a folder and told to continue it. If a fact is not in the folder, it is not in the room. When an answer ignores something you said earlier, ask first whether it was still in the folder.

## Tokens and Tokenization

Models do not read characters or words. They read **tokens**, the units into which text is divided before the model sees it. A token is often a whole common word, but it may be a fragment of a word, a single character, a run of whitespace, or a piece of punctuation. **Tokenization** is the procedure that converts a string into its sequence of tokens, and it is fixed for a given model family: the same string tokenizes the same way each time, but different models may split it differently.

Tokens matter to a researcher for three practical reasons. They are the unit in which providers *bill* (usage is priced per token, and output tokens are commonly priced higher than input tokens). They are the unit in which the model's *capacity* is measured, because the context window described below is a count of tokens. And they explain *odd failures*: a model that handles a word as three fragments has no direct view of its letters, which is why character-level tasks such as counting the letters in a word are more error-prone than they look.

The following illustrative split shows the idea. The string is 39 characters long. The tokenization is invented for this chapter to show typical behavior, and a real tokenizer would divide it differently; each `|` marks a token boundary.

```text
The| SAR| ADC| reached| 9|.|6| EN|OB| at| 1| MS|/s|.
```

That is 14 tokens for roughly eight words. Notice that common words such as "The" and "reached" are single tokens, while a number is split into digits and a decimal point, and an acronym that is rare in everyday text is split into fragments. This is the general pattern for technical writing: equations, code, part numbers, units, and acronyms cost more tokens per word than ordinary prose.

A commonly used rule of thumb for English prose is about four characters per token, or about three-quarters of a word per token. For planning, divide a word count by 0.75 to estimate tokens: a paper of 8,250 words is about 11,000 tokens. Treat this as an estimate to within perhaps twenty percent for prose and as an under-estimate for equation-heavy or code-heavy text. When the number matters, count with the provider's own tokenizer or the usage figures the API returns.

!!! mascot-tip "Estimate Before You Paste"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Words divided by 0.75 gives a usable token estimate for prose. Multiply by 1.3 if the document is mostly equations or code. If the estimate lands within a quarter of your limit, count it properly before you rely on it.

## The Context Window

The **context window** is the maximum number of tokens the model can take into account at once, counting both the prompt and the completion. It is the single most important structural limit on what a model can do in one pass. A **context limit** is the specific numeric value of that maximum for a particular model, and exceeding it has one of three outcomes depending on the application: the request is rejected with an error, the oldest content is dropped, or the completion is cut off partway through a sentence. The second outcome is the dangerous one, because nothing looks wrong. The model simply continues without the instructions or documents that fell off the front.

The window is a shared budget, and the completion draws from the same pool as the prompt. The arithmetic is simple:

\[
\text{tokens available for completion} = \text{window} - \left( t_{\text{system}} + t_{\text{history}} + t_{\text{attachments}} + t_{\text{message}} \right)
\]

Here \( t_{\text{system}} \) is the tokens of standing instructions, \( t_{\text{history}} \) is the earlier turns, \( t_{\text{attachments}} \) is any pasted or attached documents, and \( t_{\text{message}} \) is your latest message. If the right-hand side is negative, the prompt alone does not fit.

A worked example, with illustrative numbers, shows how quickly a window fills. Suppose a model has a 32,000-token window. A standing instruction of 600 tokens, a conversation history of 4,000 tokens, a pasted paper of 8,250 words (about 11,000 tokens), and a question of 400 tokens add up to 16,000 tokens, leaving 16,000 for the completion. That is comfortable. Now you paste a second paper of the same length. The prompt becomes 27,000 tokens, only 5,000 remain, and a request for a 6,000-token literature summary cannot be completed in full. The step that went wrong was not the second paste but not doing the subtraction first.

Window sizes differ enormously between models, from tens of thousands to well over a million tokens, and they change with each model release, so look up the current figure in the provider's documentation rather than relying on a number in a book. Two caveats hold regardless of size. A larger window costs more to fill, because you pay for every input token. And a model does not use all positions in a long context equally well: material in the middle of a very long prompt is more often overlooked than material at the start or end, so a document that fits is not a document that was read with equal care.

The first MicroSim lets you practice the subtraction. Before you use it, make sure the term *attachment* is clear: an attachment here means any document whose text is placed into the prompt, whether pasted or uploaded.

#### Diagram: Context Window Budget Calculator

<details markdown="1">
<summary>Context Window Budget Calculator</summary>
Type: microsim
**sim-id:** context-window-budget-calculator<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Template:** https://github.com/dmccreary/token-efficiency/tree/main/docs/sims/context-budget-long-session<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the number of tokens left for a completion from a context window size and the sizes of the prompt components, and state whether a requested completion fits.

**Prerequisites:** token, context window, prompt, completion, and the estimate of tokens as words divided by 0.75, all defined in the sections "Tokens and Tokenization" and "The Context Window" above.

**Evidence of Mastery:** For each of three challenges the learner types the number of tokens remaining and chooses "fits" or "does not fit" for a stated completion request. A challenge is correct when the remaining-token figure is exactly equal to the answer in Content and the fits decision matches. Mastery is 3 of 3 challenges correct. Changing the component sliders in exploration mode is not evidence.

**Misconceptions:** (1) The context window limits only the prompt, so the completion is free. (2) Words and tokens are the same unit. (3) Content that does not fit is rejected with a visible error, when it may instead be dropped silently.

**Instructional Rationale:** Apply-level work needs the learner to carry out the subtraction on concrete numbers and have it checked. Committing a number before the check makes the shared-budget idea something the learner performs, not something the learner reads.

**Content:**

The window sizes used here are illustrative and are not the limits of any specific model.

Challenge bank, shown in this order:

| # | Window (tokens) | System prompt (tokens) | History (tokens) | Attachment | Latest message (tokens) | Completion requested (tokens) | Remaining (tokens) | Fits? | Why (shown as feedback) |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 32,000 | 600 | 4,000 | 8,250 words | 400 | 6,000 | 16,000 | Fits | 8,250 words / 0.75 = 11,000 tokens. 600 + 4,000 + 11,000 + 400 = 16,000 used. 32,000 - 16,000 = 16,000 remain, which is at least 6,000. |
| 2 | 32,000 | 600 | 4,000 | two papers of 8,250 words each | 400 | 6,000 | 5,000 | Does not fit | Two papers are 22,000 tokens. 600 + 4,000 + 22,000 + 400 = 27,000 used. 32,000 - 27,000 = 5,000 remain, which is less than 6,000. |
| 3 | 8,000 | 500 | 1,500 | 8,250 words | 300 | 1,000 | -5,300 | Does not fit | 11,000 + 500 + 1,500 + 300 = 13,300 used, which exceeds 8,000 by 5,300. The prompt alone does not fit: at least 5,300 tokens must be dropped before the prompt fits, and 6,300 before a 1,000-token completion also fits. |

Exploration mode lets the learner set four quantities and shows a stacked bar of the window with the remaining space:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Window | 8,000 | 128,000 | 8,000 | 32,000 | tokens |
| System prompt | 0 | 2,000 | 100 | 600 | tokens |
| History | 0 | 20,000 | 500 | 4,000 | tokens |
| Attachment | 0 | 40,000 | 500 | 11,000 | tokens |

**Provenance:** The formula and the words-to-tokens estimate are from the section "The Context Window" and the section "Tokens and Tokenization" of this chapter. All numbers in the challenge bank and the ranges are illustrative, and the sim labels them "illustrative".

**Rules:** Remaining = window - (system + history + attachment + latest message). Attachment tokens = words / 0.75 when the attachment is given in words. A completion request fits when remaining >= requested completion tokens. When remaining < 0 the sim shows the overflow amount, as a negative remaining figure, and the decision is "does not fit". The model value is exact integer arithmetic.

**Learner Activity:**

1. The learner reads challenge 1 and types the tokens remaining.
2. The learner chooses "fits" or "does not fit" for the requested completion and submits both answers together.
3. The sim shows the worked subtraction from the "Why" column and the stacked bar for that challenge.
4. After all three challenges, exploration mode opens. The learner changes the four quantities and watches the remaining space and the fits decision for a 6,000-token completion update at once. The learner should notice that adding a second attachment can turn "fits" into "does not fit" without any single component looking large.

**Feedback:** Three challenges in a fixed order, two attempts each. Correct: "Correct: <remaining> tokens remain." plus the worked subtraction. Incorrect on the first attempt: "Check that the completion shares the window with the prompt. Add all four components, then subtract from the window." Incorrect on the second attempt: the worked subtraction is revealed and the challenge counts as missed. A running count "Challenges correct: n of 3" is shown.

**Starting State:** Challenge 1 is shown with an empty answer box. The question on screen is "How many tokens are left for the answer?"

**Chapter Anchors:** The chapter's worked example uses a 32,000-token window, a 600-token system prompt, a 4,000-token history, a paper of 8,250 words (about 11,000 tokens), and a 400-token question, leaving 16,000 tokens. A second paper leaves 5,000 tokens, which cannot hold a 6,000-token completion. The chapter states that tokens are about words divided by 0.75.
</details>

<iframe src="../../sims/context-window-budget-calculator/main.html" height="762px" width="100%" scrolling="no"></iframe>

*MicroSim: Context Window Budget Calculator. [Open it fullscreen](../../sims/context-window-budget-calculator/main.html).*

!!! mascot-warning "Truncation Rarely Announces Itself"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is a long session in which the first instructions quietly fall off the window and the model drifts from your constraints. It happens because many chat tools drop the oldest content instead of failing. Restate the constraints near the end of the prompt, or start a fresh session with a short summary of the decisions so far.

## System Prompts

A **system prompt** is a block of standing instructions placed at the start of every prompt, before the conversation. In a chat product it is written by the application's developer and is normally hidden from the user. In your own scripts and agents you write it yourself. It sets the model's role, tone, constraints, and format, and it persists across turns because the application resends it each time.

Two properties make it useful and one makes it risky. It is cheap leverage: a single paragraph stating the discipline you want ("cite only documents provided; answer 'unknown' if the documents do not contain the answer") changes every later response. It is also *not a security boundary*: the model treats system text and user text as input to the same process, and sufficiently insistent or adversarial text elsewhere in the prompt can override it. Chapter 4 returns to this under prompt injection. Finally, a system prompt consumes context on every turn, so a 3,000-token standing prompt on a 32,000-token window costs about a tenth of your budget before you have said anything.

## Temperature and Sampling

At each step the model computes a score for every token in its vocabulary and converts the scores into probabilities. **Temperature** is a setting that reshapes those probabilities before one token is chosen. Low temperature sharpens the distribution toward the highest-scoring token, so output is more repeatable. High temperature flattens it, so lower-scoring tokens are chosen more often and output varies more. If \( z_i \) is the score of token \( i \) and \( T \) is the temperature, then

\[
p_i = \frac{e^{z_i / T}}{\sum_j e^{z_j / T}}.
\]

With three candidate tokens scoring 2.0, 1.0, and 0.0, temperature 1.0 gives probabilities of 66.5%, 24.5%, and 9.0%. Lowering the temperature to 0.5 gives 86.7%, 11.7%, and 1.6%, and raising it to 2.0 gives 50.6%, 30.7%, and 18.6%. The ranking never changes, only the odds. For extraction, reformatting, and code, prefer low temperature. For brainstorming alternatives, a higher setting is a feature. Low temperature does not make a model more *correct*; it makes a wrong answer more repeatable.

#### Diagram: Temperature Next-Token Explorer

<details markdown="1">
<summary>Temperature Next-Token Explorer</summary>
Type: microsim
**sim-id:** temperature-next-token-explorer<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** infer<br/>
**Learning Objective:** The learner will infer, before it is revealed, whether the probability of the top-ranked and of the lowest-ranked candidate token rises or falls when the temperature is raised or lowered.

**Prerequisites:** token, probability distribution, and temperature with the formula \( p_i = e^{z_i/T} / \sum_j e^{z_j/T} \), all defined in the section "Temperature and Sampling" above.

**Evidence of Mastery:** For each of three predictions the learner commits one of "rises", "falls", or "stays the same" before the new distribution is shown. A prediction is correct when it matches the change computed from the Rules. Mastery is 3 of 3 correct. Dragging the temperature control freely is exploration and is not evidence.

**Misconceptions:** (1) Low temperature makes the model more accurate. (2) Temperature changes which token ranks first. (3) At high temperature every token becomes equally likely.

**Instructional Rationale:** Understand-level inference requires a prediction the learner has to commit to. The reveal then compares the learner's mental model with the computed distribution, which exposes the three misconceptions directly.

**Content:**

The prompt shown is the illustrative text "The measured ENOB of the converter is" and the five candidate next tokens and their scores are:

| Rank | Candidate token | Score z |
|---|---|---|
| 1 | " 9" | 2.0 |
| 2 | " 10" | 1.0 |
| 3 | " 8" | 0.0 |
| 4 | " about" | -1.0 |
| 5 | " lower" | -2.0 |

Reference distribution in percent, rounded to 0.1, which the sim must reproduce:

| Temperature | " 9" | " 10" | " 8" | " about" | " lower" |
|---|---|---|---|---|---|
| 0.2 | 99.3 | 0.7 | 0.0 | 0.0 | 0.0 |
| 0.5 | 86.5 | 11.7 | 1.6 | 0.2 | 0.0 |
| 1.0 | 63.6 | 23.4 | 8.6 | 3.2 | 1.2 |
| 1.5 | 50.5 | 25.9 | 13.3 | 6.8 | 3.5 |
| 2.0 | 42.9 | 26.0 | 15.8 | 9.6 | 5.8 |

Temperature control:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Temperature | 0.1 | 2.0 | 0.1 | 1.0 | none |

Prediction items, in this order:

| # | Starting temperature | New temperature | Token asked about | Correct answer | Why (shown as feedback) |
|---|---|---|---|---|---|
| 1 | 1.0 | 0.5 | " 9" (rank 1) | Rises | Lower temperature sharpens the distribution toward the highest score: 63.6% becomes 86.5%. |
| 2 | 1.0 | 2.0 | " 9" (rank 1) | Falls | Higher temperature flattens the distribution: 63.6% becomes 42.9%, yet " 9" is still ranked first. |
| 3 | 1.0 | 2.0 | " lower" (rank 5) | Rises | Flattening moves probability toward low-scoring tokens: 1.2% becomes 5.8%, yet it is still the least likely. |

**Provenance:** The formula is from the section "Temperature and Sampling" of this chapter. The prompt text, candidate tokens and scores are invented for illustration, and the sim labels them "illustrative, not output of a real model". Percentages are computed from the formula.

**Rules:** p_i = exp(z_i / T) / sum over j of exp(z_j / T), computed over the five candidates only. Percentages are rounded to 0.1 for display. The rank order of the candidates is the same at every temperature. The minimum temperature is 0.1, which avoids division by zero. Sampling uses a fixed seed of 42 so the "draw 10 samples" result is reproducible, and the sim labels these draws "synthetic".

**Learner Activity:**

1. The learner sees the distribution at temperature 1.0 and reads prediction 1.
2. The learner commits "rises", "falls", or "stays the same" and presses Reveal. The distribution changes to the new temperature, and the answer is checked.
3. Predictions 2 and 3 follow the same way, each starting again from temperature 1.0.
4. After the three predictions, the learner drags the temperature across the full range and presses "draw 10 samples" to see how many of the 10 draws are the top token at the current temperature. The learner should notice that the same sampled set gets more varied as temperature rises.

**Feedback:** Three predictions in a fixed order, one attempt each. Correct: "Correct: <token> goes from <old>% to <new>%." Incorrect: the "Why" column for that item, followed by the revealed numbers. The correct answer is always revealed after the single attempt. A running count "Predictions correct: n of 3" is shown.

**Starting State:** The distribution at temperature 1.0 is shown with prediction 1 posed: "If temperature drops to 0.5, what happens to the probability of the top token?"

**Chapter Anchors:** The chapter's worked example for scores 2.0, 1.0, and 0.0 states 66.5%, 24.5%, and 9.0% at temperature 1.0; 86.7%, 11.7%, and 1.6% at 0.5; and 50.6%, 30.7%, and 18.6% at 2.0. The chapter states that the ranking never changes and that low temperature does not make a model more correct.
</details>

<iframe src="../../sims/temperature-next-token-explorer/main.html" height="722px" width="100%" scrolling="no"></iframe>

*MicroSim: Temperature Next-Token Explorer. [Open it fullscreen](../../sims/temperature-next-token-explorer/main.html).*

## Training Data and the Knowledge Cutoff

A model's behavior comes from its **training data**, the large body of text, code, and other material it was fitted to. During training, the model's parameters are adjusted so that it predicts the continuation of its training text better. This stage is followed by additional tuning on curated instruction-and-response examples and on human preference judgments, which is what makes a raw text predictor behave like an assistant. You do not need the optimization details for this course. You need to know what the process implies for what the model can and cannot reliably do.

First, a model's knowledge is a compressed statistical summary of text, not a database. Frequent, widely repeated, well-documented material is represented well. Rare, recent, proprietary, or highly specialized material is represented poorly or not at all. In electrical engineering this gradient is easy to see: a model will explain a two-stage Miller-compensated op-amp or the Nyquist criterion fluently, because that material is saturated in textbooks and lecture notes. It will be far shakier about the exact performance table of a 2024 conference paper, the quirks of a vendor's undocumented model-card parameter, or your group's internal test fixture, which it has never seen.

Second, the training data bounds *what kinds of mistakes are natural*. A model reproduces patterns in its data, including errors, outdated practice, and the biases of who wrote what is online. A SPICE netlist idiom that was common in older forum posts may be reproduced even where a newer syntax is recommended.

Third, the data has an end date. The **knowledge cutoff** is the date after which the model has seen essentially no training data. Anything published or changed after that date is unknown to the model unless you supply it in the prompt or let a tool fetch it. The cutoff is earlier than the model's release date, often by many months, and it is not a sharp line: coverage of the last months before the cutoff is thin. For a researcher the consequence is practical. Ask a model for "the state of the art" in a fast-moving topic such as a new memory technology or a new standard, and it will describe the field as of its cutoff with no indication that time has passed.

| Question type | Training data helps? | What to do |
|---|---|---|
| Textbook concept (Nyquist sampling, KCL) | Yes, strongly | Use directly, then spot-check a formula |
| Established method with many tutorials | Yes | Use as a draft; verify the exact equation |
| Result from a specific recent paper | Poorly | Supply the paper's text or look it up |
| Your own data, code, or measurements | No | Put it in the prompt |
| Events or releases after the cutoff | No | Supply the information or use a search tool |

*Table 1. When training data can and cannot be relied on.*

## Hallucination and Fabricated Citations

A **hallucination** is output that is fluent and confident but not grounded in the prompt or in fact. The word is imperfect, since it suggests a malfunction, whereas the behavior is the model working as designed. Its objective is to produce a plausible continuation. When the true answer is well represented in its training data, the plausible continuation and the true one coincide. When it is not, the model still produces the most plausible-looking text, and plausibility without truth is exactly what a hallucination is.

Hallucination tends to occur under identifiable conditions, and the list below is worth keeping in view when you decide how much to trust a completion:

- The request asks for specifics the model cannot have: exact numbers, page numbers, part numbers, dates.
- The topic is rare, recent, or after the knowledge cutoff.
- The prompt presupposes something false ("Explain why the Foo-Smith theorem implies...").
- The task requires exact multi-step computation done in the model's head rather than with a tool.
- The prompt has pushed the model to always produce an answer and gave it no sanctioned way to say "unknown".

A **fabricated citation** is the signature hallucination of research use: a reference with plausible authors, a plausible title, a real-sounding venue and year, and often a correctly formatted DOI, for a paper that does not exist or that says something different from what is attributed to it. It arises for the same reason as any hallucination. A citation has a highly regular structure, and the model can generate a well-formed instance of that structure about a topic without any lookup. Fabricated citations are dangerous precisely because they are well formed: they pass a glance.

Citations fail in four distinct ways, and the distinction is what a verification procedure must detect:

1. **Fabricated:** no such paper exists.
2. **Wrong details:** the paper exists, but year, venue, volume, pages, or an author is wrong.
3. **Unsupported claim:** the paper exists and the details are right, but it does not say what the model claimed.
4. **Verified:** the paper exists, the details match, and the paper supports the claim.

Checking requires leaving the model. Resolve the DOI, search the exact title in a bibliographic database, compare authors, venue, and year with what the database shows, and open the paper to confirm the sentence it is cited for. The same discipline applies when the model is correct; it is simply cheap to do once and expensive to skip once.

!!! mascot-warning "Asking the Model to Double-Check Is Not Checking"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A tempting shortcut is to ask the same model, "Are these citations real?" The model will answer fluently, and the answer is generated by the same mechanism that produced the citations. Use the model to format a reference list, not to certify it. Certify with a database lookup you ran yourself.

A worked example. A model, asked for prior work on calibration of SAR ADCs, returns "Lindqvist and Okafor (2019), *Charge-Redistribution SAR ADC Calibration Using Sparse Foreground Estimation*, IEEE JSSC, 54(7)." The record is invented here for illustration. You search the exact title in two bibliographic databases and find nothing. You search the authors and find no joint work. The venue and volume exist, which is why the citation looked right. The verdict is fabricated, and the useful move is to discard it and ask for search *terms* instead, then run those terms in the database.

The second MicroSim lets you practice the four-way classification on records that are invented for the exercise.

#### Diagram: Citation Verification Judge

<details markdown="1">
<summary>Citation Verification Judge</summary>
Type: microsim
**sim-id:** citation-verification-judge<br/>
**Library:** p5.js<br/>
**Status:** Built<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge each of eight model-generated citations as verified, wrong details, unsupported claim, or fabricated, using the results of a simulated database lookup, with at least 7 of 8 judged correctly.

**Prerequisites:** hallucination, fabricated citation, and the four ways a citation can fail, all defined in the section "Hallucination and Fabricated Citations" above.

**Evidence of Mastery:** For each of eight citation records the learner views the simulated lookup results and commits one of four verdicts. A verdict is correct when it equals the verdict in Content. Mastery is at least 7 of 8 correct on the first attempt. Viewing the lookup results is exploration and is not evidence.

**Misconceptions:** (1) A citation with a well-formed DOI and a real journal name is real. (2) If the paper exists, the claim is supported. (3) A wrong year or volume means the paper is fabricated.

**Instructional Rationale:** Evaluate-level work requires the learner to apply criteria to evidence and commit to a judgment. Items are built so that each surface feature (a well-formed DOI, a real venue, a real title) is present in some items that fail and some that pass, which forces the learner to rely on the lookup evidence.

**Content:**

All eight records are invented for this exercise. Authors, titles, and DOIs are not real, the DOI prefix 10.9999 is not assigned, and any resemblance to a real paper is accidental. Each record shows the model's citation, the sentence the model attached it to, and the lookup results.

| # | Model's citation | Claim the model attached | DOI resolves? | Exact title found in database? | Authors, venue and year match database? | Paper's text supports the claim? | Verdict | Why (shown as feedback) |
|---|---|---|---|---|---|---|---|---|
| 1 | Brandt, K. and Osei, M. (2020). "Bootstrapped Sampling Switches for Low-Voltage ADCs." IEEE TCAS-I, 67(4). DOI 10.9999/tcasi.2020.0411 | Bootstrapped switches reduce signal-dependent sampling distortion. | Yes | Yes | Yes | Yes | Verified | All four checks pass. |
| 2 | Vasquez, L. (2018). "Dynamic Comparator Offset Calibration with Charge Pumps." IEEE JSSC, 53(2). DOI 10.9999/jssc.2018.0208 | A charge-pump calibration removes comparator offset to below 1 mV. | Yes | Yes | Yes | Yes | Verified | All four checks pass. |
| 3 | Nakamura, H. and Reyes, P. (2017). "Split-Capacitor DAC Linearity Analysis." IEEE JSSC, 52(9). DOI 10.9999/jssc.2017.0912 | Split-capacitor arrays reduce DAC area. | Yes | Yes | No: the database lists the year as 2016 and the venue as ISSCC | Yes | Wrong details | The paper exists and supports the claim, but year and venue must be corrected before it is cited. |
| 4 | Oyelaran, T. (2021). "Noise Shaping in Hybrid SAR-Delta-Sigma Converters." IEEE TCAS-II, 68(1). DOI 10.9999/tcasii.2021.0105 | Hybrid converters trade conversion speed for resolution. | Yes | Yes | No: the database lists a different second author and volume 68(2) | Yes | Wrong details | The paper exists and supports the claim, but an author and the issue number are wrong. |
| 5 | Lindqvist, A. and Okafor, N. (2019). "Charge-Redistribution SAR ADC Calibration Using Sparse Foreground Estimation." IEEE JSSC, 54(7). DOI 10.9999/jssc.2019.0714 | Foreground calibration achieves 10-bit ENOB at 1 MS/s. | Yes | Yes | Yes | No: the paper reports 8.2 ENOB and does not discuss 1 MS/s | Unsupported claim | The paper exists with correct details, but it does not say what the model claims. |
| 6 | Hartmann, E. (2022). "Ring Oscillator Jitter in 65 nm CMOS." IEEE TCAS-I, 69(6). DOI 10.9999/tcasi.2022.0620 | Ring oscillator jitter grows with supply noise. | Yes | Yes | Yes | No: the paper studies thermal noise only and states supply noise is out of scope | Unsupported claim | The record is genuine, but the sentence it supports is not in it. |
| 7 | Dubois, C. and Lin, W. (2021). "Time-Interleaved ADC Mismatch Estimation Without Calibration Signals." IEEE JSSC, 56(11). DOI 10.9999/jssc.2021.1109 | Mismatch can be estimated blind with under 20 ms of data. | No | No | Not applicable: no record found | Not applicable | Fabricated | The venue and volume exist, but the title and DOI do not. Well-formed structure is not evidence of existence. |
| 8 | Fofanah, S. (2020). "Process Variation Models for Sub-10 nm FinFETs." IEEE TED, 67(3). DOI 10.9999/ted.2020.0305 | Corner models understate FinFET threshold spread. | Yes, but it resolves to a paper titled "Antenna Gain Measurement in Anechoic Chambers" | No | Not applicable: the DOI belongs to another paper | Not applicable | Fabricated | A DOI that resolves to a different paper does not make this record real. The title appears nowhere in the database. |

Verdict options: Verified, Wrong details, Unsupported claim, Fabricated.

**Provenance:** The four failure types and the lookup procedure are from the section "Hallucination and Fabricated Citations" of this chapter. All records, claims, and lookup outcomes are invented for the exercise, and the sim labels them "invented for this exercise".

**Rules:** The verdict follows this order of checks. If the exact title is not found, or the DOI resolves to a different paper, the verdict is Fabricated. Otherwise, if authors, venue, or year do not match the database, the verdict is Wrong details. Otherwise, if the paper's text does not support the claim, the verdict is Unsupported claim. Otherwise the verdict is Verified. Items are shown in a fixed order, so the order above is the order shown.

**Learner Activity:**

1. The learner reads record 1: the model's citation and the claim it was attached to.
2. The learner opens each of the four lookup checks in any order. Each check reveals its result for that record.
3. The learner commits one of the four verdicts and presses Submit.
4. The sim shows the correct verdict and the "Why" sentence, then advances to the next record. After record 8 the sim shows the count correct and the verdicts that were missed, grouped by the misconception each exposes.

**Feedback:** Eight records, one attempt each, fixed order. Correct: "Correct: <verdict>." plus the "Why" sentence. Incorrect: "Not quite. <Why sentence>" plus the misconception for that record. The correct verdict is always revealed after the single attempt. A final score "n of 8 correct" is shown, and the sim states whether the mastery threshold of 7 was met.

**Starting State:** Record 1 is shown with all four lookup checks closed. The question on screen is "Is this citation safe to use as written?"

**Chapter Anchors:** The chapter lists four citation outcomes: fabricated, wrong details, unsupported claim, and verified. It states that a well-formed DOI and a real venue do not establish that a paper exists, and that checking requires a database lookup the learner runs, not the model.
</details>

<iframe src="../../sims/citation-verification-judge/main.html" height="802px" width="100%" scrolling="no"></iframe>

*MicroSim: Citation Verification Judge. [Open it fullscreen](../../sims/citation-verification-judge/main.html).*

## Choosing the Model: Size, Reasoning, Modality, and Benchmarks

**Model size** is the number of trainable parameters in a model, the adjustable numbers fitted during training, usually stated in billions. Within a model family, larger models are generally more capable on difficult tasks, and also slower and more expensive to run. Size is a rough guide, not a ranking. Training data quality, tuning, and design differ between families, so a well-tuned smaller model can outperform a larger one on a given task, and many hosted models do not disclose their size at all. For a researcher the practical rule is to match the model to the task: a small, fast model is adequate for reformatting a bibliography or classifying abstracts, and a larger model is worth its cost for ambiguous derivations.

A **reasoning model** is a model trained or configured to generate an extended sequence of intermediate steps, sometimes hidden from the user, before it gives a final answer. This tends to improve results on multi-step problems such as derivations, debugging, and planning. The trade-off is that the intermediate steps are tokens too: they count against the context window, they add latency, and they are usually billed. Use a reasoning model where the task is hard and the answer is checkable, and do not pay for it on a task that a short, direct answer already handles.

A **multimodal model** accepts, and sometimes produces, more than text: images, audio, or documents with layout. For electrical engineering the useful case is giving the model a schematic screenshot, an oscilloscope capture, a waveform plot, or a datasheet page. Reading qualitative structure from an image (what topology is this, which trace is the clock) is often good. Reading numeric values off a plot or tracing a dense schematic is unreliable, and these are exactly the readings that feed conclusions, so extract values from the source data when you have them.

A **model benchmark** is a standardized set of tasks with a scoring rule, used to compare models. Published benchmark scores are useful for a first screening and poor predictors for your task, because the benchmark may not resemble your work, models may have seen the test items during training, and a single aggregate score hides the failure types you care about. The reliable response is to build a small benchmark of your own: ten to twenty tasks from your own research with answers you have already verified, run against each candidate model. Chapter 7 develops this idea into skill testing, and Chapter 17 into verification.

| Property | What it buys | What it costs | Use it when |
|---|---|---|---|
| Larger model size | Better on hard, ambiguous tasks | Latency, price | The task is difficult and quality matters more than speed |
| Reasoning model | Better multi-step accuracy | Extra tokens, latency, price | The answer is checkable and the steps are many |
| Multimodal input | Works on figures and pages | Reading of values is unreliable | You need structure, not exact numbers |
| Public benchmark score | Fast first screening | May not predict your task | Narrowing a long list of candidates |

*Table 2. The properties of Section "Choosing the Model" and when to reach for each.*

## Chat Interfaces and the Command Line

There are two ways you will mostly reach a model, and the difference between them determines what kind of work each supports.

A **chat interface** is a conversational application, in a browser or a desktop or phone app, in which you type messages and read replies. It is the lowest-friction way to start, and it is well suited to exploring an idea, drafting, asking for an explanation, or examining a single document. Its limits follow from its design. The conversation lives in the application, so it is hard to reproduce exactly. Files must be uploaded by hand. Actions are limited to what the application permits. And the settings that affect output, such as the model version, are often not visible in the transcript.

A **command line interface** (CLI) is a text interface in a terminal where you type commands and run programs, and a CLI-based AI tool runs the model from that environment. The difference is not stylistic. A tool in the terminal can read and write files in your project, run your scripts, call other command-line programs, and be invoked from a shell script, a makefile, or a scheduled job. Tools such as Claude Code and Codex CLI work this way. Because the whole interaction is text in files and shell history, it can be version-controlled, repeated, and inspected, which is the property reproducible research requires.

A minimal non-interactive use illustrates the point. The command below is a *generic form*: `ai-cli` is a placeholder for whichever tool you use, `--prompt` supplies the instruction, `cat` sends a file into the tool's input, and `>` writes the reply to a file. Flag names differ between tools.

```bash
# Generic form: send a results file and an instruction, save the reply for review
cat results/enob_sweep.csv | ai-cli --prompt "List any row where ENOB falls by more than 0.5 bit relative to the previous row. Output one line per row: row number, old ENOB, new ENOB." > review/enob_flags.md
```

Three things are worth noticing. The input file, the prompt, and the output file are all named, so the step can be rerun and compared. The prompt states an output format, which makes the result easy to check. And nothing in the command gives the tool permission to modify your data, which is the right default. Chapter 8 develops what happens when a CLI agent is given permission to write files and run code.

| Dimension | Chat interface | Command line interface |
|---|---|---|
| Typical use | Exploration, drafting, explanation | Repeatable tasks, file and code work |
| Access to your files | Manual upload | Direct, subject to permission |
| Reproducibility | Low: the transcript lives in the app | High: commands and files are in your repository |
| Automation | Not possible | Scriptable and schedulable |
| Setup cost | Almost none | Install, authenticate, learn the commands |
| Risk surface | Limited to what you paste | Includes file changes and shell commands |

*Table 3. Chat interface versus command line interface.*

A reasonable path for most researchers is to begin in a chat interface to build intuition, move to the command line when a task recurs or touches files, and keep every command-line invocation in the project's version history.

!!! mascot-encourage "The Terminal Is a Skill, Not a Gate"
    ![Volt encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If the command line feels slower than the chat window at first, that is normal; typing a command costs more than clicking. You already run simulators and scripts from a shell. Start with one recurring task, such as the flagging command above, and let the saved command do the work the second time.

## Summary and Key Takeaways

A language model turns a prompt into a completion one token at a time, and everything it uses must be present in that prompt. Its reliability is a property of its training data, which is broad but not authoritative and ends at a cutoff date. Plausibility, not truth, is what it optimizes, so fluent output of any kind has to be verified against something outside the model.

The main points to carry forward:

- **The prompt is everything sent**, including system instructions, history, files, and tool output, and the completion is generated, not retrieved.
- **Tokens** are the unit of billing and capacity, and technical text costs more tokens per word than prose.
- **The context window** is a shared budget for prompt and completion, and overflow may be silent.
- **A system prompt** sets standing behavior, uses budget on every turn, and is not a security boundary.
- **Temperature** reshapes the odds without changing the ranking, and low temperature does not make output more correct.
- **Training data and a knowledge cutoff** bound what the model can know, so supply recent, rare, and private material yourself.
- **Hallucinations**, including fabricated citations, are the model working as designed. Verify with a lookup you run.
- **Size, reasoning, modality, and benchmarks** are trade-offs to match to a task, and your own small benchmark beats a public score.
- **Chat interfaces** suit exploration and **command lines** suit repeatable, file-touching, reproducible work.

!!! mascot-celebration "You Can Read the Mechanism"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now budget a context window, say what temperature does and does not change, and sort a citation into verified, wrong-detail, unsupported, or fabricated. Those are the checks that stand between a fluent answer and a true one.

The next chapter turns this knowledge into decisions: which model, through which access path, at what cost, and how to write a prompt that states its output format. Round up the evidence, and bring one task you would like to hand to a model.

[See Annotated References](./references.md)
