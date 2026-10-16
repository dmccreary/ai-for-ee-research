# Quiz: Choosing Models and Writing Clear Prompts

Test your understanding of model access, selection, retrieval, and the building blocks of a reliable prompt.

---

#### 1. What is API access in the context of using a language model?

<div class="upper-alpha" markdown>
1. A chat window in a web browser
2. A built-in model feature for reasoning through problems
3. Running a model only on your laptop
4. The ability to send prompts to a model from a program over the network and receive completions as data
</div>

??? question "Show Answer"
    The correct answer is **D**. API access lets you call a model from a script, pass parameters such as temperature and max tokens, and receive structured responses. A chat window is a graphical front end that itself uses an API, while local models run on your own hardware. Reasoning is a model capability, not an access method.

    **Concept Tested:** API Access

    **See:** [Reaching a Model Through an API](./index.md#reaching-a-model-through-an-api)





---

#### 2. What is an open-weight model?

<div class="upper-alpha" markdown>
1. A model that is always smaller than hosted models
2. A model that is free to use through any chat interface
3. A model whose training data and code are fully public
4. A model whose trained parameters are published so it can be downloaded and run yourself
</div>

??? question "Show Answer"
    The correct answer is **D**. An open-weight model publishes its trained parameters, making local execution possible. It is not the same as fully open source, because the training data and code may not be released, and it is not necessarily free or small. Open weights are what enable local models.

    **Concept Tested:** Open Weight Model

    **See:** [Selecting a Model](./index.md#selecting-a-model)





---

#### 3. Which access path is the best fit for classifying 5,000 abstracts overnight and saving the labels to a file?

<div class="upper-alpha" markdown>
1. Chat interface
2. Local open-weight model on a laptop with no GPU
3. Hosted API
4. Emailing the abstracts to a colleague
</div>

??? question "Show Answer"
    The correct answer is **C**. A hosted API is scriptable and designed for batch work over many inputs. A chat interface is impractical at that scale, a weak local machine may be too slow or lack memory for thousands of classifications, and email is not a model access path.

    **Concept Tested:** Model Selection

    **See:** [Selecting a Model](./index.md#selecting-a-model)





---

#### 4. Why is a local open-weight model especially attractive when results must be reproducible years later?

<div class="upper-alpha" markdown>
1. It always produces the same completion because it is smaller.
2. It avoids the model version drift that affects hosted models.
3. It requires no hardware and no setup.
4. It is always the most capable model available.
</div>

??? question "Show Answer"
    The correct answer is **B**. Hosted models can be updated or retired, so the same prompt may produce different results later. A local open-weight model's weights can be archived with the project and rerun unchanged. It does require hardware, and the strongest hosted models are usually more capable.

    **Concept Tested:** Model Version Drift

    **See:** [Selecting a Model](./index.md#selecting-a-model)





---

#### 5. What does retrieval-augmented generation (RAG) do?

<div class="upper-alpha" markdown>
1. It retrieves the most relevant passages from your documents and inserts them into the prompt.
2. It retrains the model on your private documents.
3. It generates embeddings without using vector search.
4. It removes the need for any system prompt.
</div>

??? question "Show Answer"
    The correct answer is **A**. RAG embeds your documents, finds the passages most similar to the query by vector search, and places those passages into the prompt so the model answers from grounded text. It does not retrain the model and does not eliminate the system prompt.

    **Concept Tested:** Retrieval Augmented Generation

    **See:** [Adding Your Own Documents](./index.md#adding-your-own-documents)





---

#### 6. What is an important limitation of vector search?

<div class="upper-alpha" markdown>
1. It cannot compare vectors mathematically.
2. It always returns the same number of results, even when the matches are weak.
3. It only works for text written in English.
4. It requires retraining the embedding model for every query.
</div>

??? question "Show Answer"
    The correct answer is **B**. Vector search returns the top-k closest vectors regardless of absolute quality, so a weak match still comes back with the same formatting as a strong one. That is why a similarity threshold and human spot-checking are important. Cosine similarity is the comparison method, and the embedding model is not retrained per query.

    **Concept Tested:** Vector Search

    **See:** [Adding Your Own Documents](./index.md#adding-your-own-documents)





---

#### 7. In the prompt "Use only information that appears in the attached text," which prompt component is being used?

<div class="upper-alpha" markdown>
1. Role prompting
2. Output format
3. Constraint
4. Few-shot example
</div>

??? question "Show Answer"
    The correct answer is **C**. This sentence limits the sources the model may use, which is a source constraint. It does not assign a role, specify the shape of the output, or provide an example of the desired response.

    **Concept Tested:** Constraints

    **See:** [Prompt Engineering](./index.md#prompt-engineering)





---

#### 8. What is an output format in prompt engineering?

<div class="upper-alpha" markdown>
1. The set of constraints on what the model may not do
2. The role assigned to the model
3. An explicit statement of the shape of the response, such as a table or JSON object
4. The conversation history included in the prompt
</div>

??? question "Show Answer"
    The correct answer is **C**. An output format tells the model exactly how to structure its answer, making the result parseable and checkable. Constraints limit behavior, role sets the viewpoint, and conversation history is part of the prompt context, not the format.

    **Concept Tested:** Output Format

    **See:** [Output Format](./index.md#output-format)





---

#### 9. Which prompt technique is usually most effective when you want the model to learn a format or judgment that is hard to describe in words?

<div class="upper-alpha" markdown>
1. Adding a stronger system prompt
2. Providing a few worked input-output examples
3. Raising the temperature
4. Asking the model to explain its reasoning first
</div>

??? question "Show Answer"
    The correct answer is **B**. Few-shot examples show the model what you want through concrete cases, which is especially useful for subtle formats or classification boundaries. They cost context tokens and may be imitated too closely, but they are the strongest single way to communicate such tasks. Temperature and reasoning prompts do not directly teach format.

    **Concept Tested:** Few-Shot Examples

    **See:** [Few-Shot Examples](./index.md#few-shot-examples)





---

#### 10. You are asking a model to classify abstracts and report numeric ENOB values. Which addition best guards against invented values?

<div class="upper-alpha" markdown>
1. "If the value is not stated in the abstract, write 'not stated'."
2. "Act as an expert in analog circuit design."
3. "Return the answer as a JSON object."
4. "Provide three examples of classified abstracts."
</div>

??? question "Show Answer"
    The correct answer is **A**. Giving the model a sanctioned way to say "not stated" is an escape constraint and the cheapest defense against hallucinating a number. A role, JSON format, and examples help with other aspects but do not directly prevent invention when the source lacks the value.

    **Concept Tested:** Constraints

    **See:** [Constraints](./index.md#constraints)
