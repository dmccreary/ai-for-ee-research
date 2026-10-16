# References: Choosing Models and Writing Clear Prompts

1. [Prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering) - Wikipedia - Surveys how prompts are designed and refined for generative models, including few-shot examples, role and instruction techniques, and prompt injection risks. Supports this chapter's five prompt techniques and their limits with named examples.

2. [Retrieval-augmented generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) - Wikipedia - Explains how a language model consults retrieved documents before answering, covering indexing, retrieval, and augmentation steps. Relevant to adding your own documents, with a pipeline overview and discussion of grounding and failure modes.

3. [Word embedding](https://en.wikipedia.org/wiki/Word_embedding) - Wikipedia - Describes how words and text are mapped to numerical vectors so that similar meanings lie close together. Underpins the chapter's embedding and vector search sections, with clear coverage of vector-space geometry and similarity.

4. Introduction to Information Retrieval (1st Edition) - Christopher D. Manning, Prabhakar Raghavan, and Hinrich Schutze - Cambridge University Press - Teaches the vector space model with a worked example comparing term-frequency vectors of three novels by length-normalized cosine similarity. It makes the chapter's cosine formula and ranking concrete.

5. AI Engineering: Building Applications with Foundation Models (1st Edition) - Chip Huyen - O'Reilly Media - No single teaching innovation is claimed; chosen as a widely praised, clear treatment of practical model selection, evaluation, prompt engineering, and RAG in application workflows, matching this chapter's decision-oriented framing.

6. [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) - Anthropic documentation - Official guidance on when prompt engineering is the right fix, defining success criteria first, and techniques from clarity and examples to role prompting, with links to an interactive tutorial for practice.

7. [Rate limits](https://developers.openai.com/api/docs/guides/rate-limits) - OpenAI API documentation - Explains request and token limits per time window, usage tiers, error handling, and retrying with backoff. Directly supports the chapter's rate limit and batch-script advice, including practical guidance on batching requests.

8. [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) - arXiv, Brown et al. - The GPT-3 paper that demonstrated task performance from instructions and a few in-prompt examples without fine-tuning. It is the source for zero-shot versus few-shot terminology, with results across many tasks.

9. [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) - arXiv, Lewis et al. - The original RAG paper, pairing a pretrained generator with a searchable index of Wikipedia passages. It grounds the chapter's retrieval pipeline, with experiments showing more factual answers than a generator alone.

10. [Semantic Search](https://www.sbert.net/examples/applications/semantic-search/README.html) - Sentence Transformers documentation - Shows how queries and documents are embedded into one vector space and ranked by similarity, covering symmetric versus asymmetric search. Offers runnable Python code for building the chapter's vector search step.
