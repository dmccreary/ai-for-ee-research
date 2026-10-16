# References: How Language Models Work

1. [Large language model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia - Overview of how LLMs are built and used, including tokenization, context windows, training data, and model scale. Gives the vocabulary for this chapter and a map of the topics each section develops.

2. [Hallucination (artificial intelligence)](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)) - Wikipedia - Explains why generative models produce confident but ungrounded output, with documented cases of fabricated references and nonexistent DOIs. Directly supports the sections on hallucination and fabricated citations.

3. [Prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering) - Wikipedia - Describes how the input text shapes a model's output, covering techniques and prompt injection risks. Useful background for the prompt, completion, and system prompt concepts and their limits as a security boundary.

4. Build a Large Language Model (From Scratch) (1st Edition) - Sebastian Raschka - Manning - Raschka's teaching approach is to implement a GPT-style model step by step in code, including a hand-built tokenizer and the context-length data pipeline. Seeing tokens and context windows as concrete code removes the mystery.

5. Speech and Language Processing (3rd Edition draft) - Daniel Jurafsky and James H. Martin - Pearson / Stanford online draft - The standard textbook for language modeling, chosen for clarity rather than a single originator. It builds from n-gram models to transformer language models, with worked subword tokenization and sampling examples.

6. [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) - Anthropic Documentation - Official explanation of how the context window is a shared budget for prompt and output, with diagrams of turn accumulation, overflow behavior, and a token counting API. Maps directly onto the budget calculation in this chapter.

7. [Tokenization algorithms](https://huggingface.co/docs/transformers/tokenizer_summary) - Hugging Face Documentation - Worked step-by-step examples of byte pair encoding, Unigram, SentencePiece, and WordPiece on a tiny vocabulary. Shows concretely why rare words and acronyms split into fragments and cost more tokens.

8. [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172) - arXiv (Liu et al.) - Experimental study showing models use information near the start or end of a long input better than information in the middle. Evidence behind the caution that fitting in the window is not the same as being read.

9. [Survey of Hallucination in Natural Language Generation](https://arxiv.org/abs/2202.03629) - arXiv (Ji et al.) - Comprehensive review of why text generators produce unfaithful content, with taxonomy, evaluation metrics, and mitigation methods. Gives the research grounding for hallucination causes and the need for external verification.

10. [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) - Jay Alammar - Step-by-step visual walkthrough of the transformer architecture behind language models, from attention to output generation. Its diagrams give a mental picture of how a prompt is processed one token at a time.
