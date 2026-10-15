# Quiz: How Language Models Work

Test your understanding of tokens, context windows, prompts, completions, hallucination, and choosing a model interface.

---

#### 1. What is the term for all of the text a language model receives before generating its next response?

<div class="upper-alpha" markdown>
1. Completion
2. Prompt
3. Context window
4. System prompt
</div>

??? question "Show Answer"
    The correct answer is **B**. The prompt is everything the model receives for a given response: system instructions, conversation history, attachments, tool output, and your latest message. The completion is what the model generates, the context window is the capacity limit, and the system prompt is only one part of the prompt.

    **Concept Tested:** Prompt

    **See:** [What You Send and What Comes Back](../index.md#what-you-send-and-what-comes-back)

---

#### 2. What is the text that a language model generates in response to a prompt called?

<div class="upper-alpha" markdown>
1. Token
2. System prompt
3. Attachment
4. Completion
</div>

??? question "Show Answer"
    The correct answer is **D**. The completion is the generated text produced one token at a time until the model stops or hits a length limit. A token is a unit of text, a system prompt is standing instruction, and attachments are input documents, not the output.

    **Concept Tested:** Completion

    **See:** [What You Send and What Comes Back](../index.md#what-you-send-and-what-comes-back)

---

#### 3. Which of the following is included in the prompt assembled for a single model response?

<div class="upper-alpha" markdown>
1. System instructions, conversation history, attachments, and the latest user message
2. Only the latest user message
3. The model's internal weights
4. The next token probability distribution
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter stresses that the prompt is the assembled input, not just what you typed. It includes system instructions, earlier conversation turns, any pasted or uploaded documents, tool outputs, and your current message. The model has no memory beyond this assembled text.

    **Concept Tested:** Prompt

    **See:** [What You Send and What Comes Back](../index.md#what-you-send-and-what-comes-back)

---

#### 4. What does the context window limit?

<div class="upper-alpha" markdown>
1. Only the number of tokens in the completion
2. Only the number of tokens in the latest user message
3. The total number of tokens the model can consider at once, counting both prompt and completion
4. The number of different conversations the model can remember
</div>

??? question "Show Answer"
    The correct answer is **C**. The context window is a shared budget for the prompt and the completion. If the prompt consumes most of the window, little room remains for the answer, and exceeding the limit can cause silent dropping of older content or a truncated completion.

    **Concept Tested:** Context Window

    **See:** [The Context Window](../index.md#the-context-window)

---

#### 5. What is the basic unit that language models process, bill by, and measure capacity in?

<div class="upper-alpha" markdown>
1. Token
2. Word
3. Character
4. Sentence
</div>

??? question "Show Answer"
    The correct answer is **A**. Models read tokens, not words or characters. A token can be a whole word, a fragment, a punctuation mark, or a run of whitespace. Tokens are the unit of billing and the unit in which the context window is measured.

    **Concept Tested:** Token

    **See:** [Tokens and Tokenization](../index.md#tokens-and-tokenization)

---

#### 6. What effect does lowering the temperature have on the model's next-token distribution?

<div class="upper-alpha" markdown>
1. It changes which token ranks highest.
2. It sharpens the distribution toward the highest-scoring token without changing the ranking.
3. It makes every token equally likely.
4. It guarantees a more correct answer.
</div>

??? question "Show Answer"
    The correct answer is **B**. Lower temperature makes the softmax distribution more peaked, so the top token is chosen more often, but the rank order of tokens stays the same. High temperature flattens the distribution; it does not change which token is ranked first. Low temperature also does not make output more correct, only more repeatable.

    **Concept Tested:** Temperature

    **See:** [Temperature and Sampling](../index.md#temperature-and-sampling)

---

#### 7. A model has a 32,000-token context window. The system prompt uses 600 tokens, conversation history uses 4,000 tokens, an attachment uses 11,000 tokens, and the latest message uses 400 tokens. Can a 6,000-token completion fit?

<div class="upper-alpha" markdown>
1. Yes, about 16,000 tokens remain.
2. Yes, exactly 6,000 tokens remain.
3. No, only 5,000 tokens remain.
4. No, the prompt alone exceeds the window.
</div>

??? question "Show Answer"
    The correct answer is **A**. The used tokens are 600 + 4,000 + 11,000 + 400 = 16,000, leaving 32,000 − 16,000 = 16,000 tokens for the completion, which is more than enough for 6,000. If a second paper of the same size were added, only 5,000 tokens would remain and the completion would not fit.

    **Concept Tested:** Context Window

    **See:** [The Context Window](../index.md#the-context-window)

---

#### 8. Which request is most likely to cause a hallucination?

<div class="upper-alpha" markdown>
1. "Rewrite this paragraph in active voice."
2. "Explain the Nyquist sampling theorem."
3. "Give the exact page in a 2024 paper where the authors report the measured ENOB."
4. "Convert this BibTeX list to IEEE format."
</div>

??? question "Show Answer"
    The correct answer is **C**. Hallucination is more likely when the model is asked for specifics it cannot have, such as exact page numbers from a recent paper, or when the topic is after the knowledge cutoff. Rewriting, explaining well-covered topics, and reformatting are lower-risk tasks because they do not require facts the model may not possess.

    **Concept Tested:** Hallucination

    **See:** [Hallucination and Fabricated Citations](../index.md#hallucination-and-fabricated-citations)

---

#### 9. A model-generated citation has a well-formed DOI and a real journal name, but the exact title is not found in any bibliographic database. How should you classify it?

<div class="upper-alpha" markdown>
1. Verified
2. Wrong details
3. Unsupported claim
4. Fabricated
</div>

??? question "Show Answer"
    The correct answer is **D**. A fabricated citation looks plausible but the paper does not exist. Real venues and correctly formatted DOIs are not enough to establish existence; the chapter's verification procedure treats a missing title or a DOI that resolves to a different paper as evidence of fabrication.

    **Concept Tested:** Fabricated Citation

    **See:** [Hallucination and Fabricated Citations](../index.md#hallucination-and-fabricated-citations)

---

#### 10. Which interface is generally better for repeatable, file-touching, version-controllable research tasks?

<div class="upper-alpha" markdown>
1. Chat interface
2. Command line interface
3. Web search interface
4. Spreadsheet interface
</div>

??? question "Show Answer"
    The correct answer is **B**. A command line interface can read and write project files, run scripts, be recorded in shell history, and be repeated or version-controlled. Chat interfaces are better for exploration and drafting. Web search and spreadsheets are tools, not the primary interfaces for running models.

    **Concept Tested:** Command Line Interface

    **See:** [Chat Interfaces and the Command Line](../index.md#chat-interfaces-and-the-command-line)
