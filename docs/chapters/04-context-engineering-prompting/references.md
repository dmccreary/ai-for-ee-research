# References: Context Engineering and Advanced Prompting

1. [Prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering) - Wikipedia - Surveys chain-of-thought, in-context learning, and multi-shot prompting, and treats context engineering as a related field. Relevant for the chapter's output-shaping and reasoning techniques, with a section on sensitivity to prompt wording.

2. [Prompt injection](https://en.wikipedia.org/wiki/Prompt_injection) - Wikipedia - Explains how crafted text makes language models act against developer intent, with history, attack types, known incidents, and mitigations. Supports the chapter's section on injected instructions and structural defenses.

3. [Retrieval-augmented generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) - Wikipedia - Describes how models consult external documents before answering to use current information and reduce errors. Relevant to context selection, long document handling, and source grounding, including its retrieval pipeline stages.

4. Prompt Engineering for LLMs (1st Edition) - John Berryman and Albert Ziegler - O'Reilly Media - Frames prompt construction as assembling a document the model will continue, and proposes the "Little Red Riding Hood principle" of staying on well-trodden paths. Clarifies why deliberate context assembly beats clever wording.

5. AI Engineering: Building Applications with Foundation Models (1st Edition) - Chip Huyen - O'Reilly Media - No single originator of the concepts here; chosen as the most widely praised practitioner treatment of prompting, context construction, evaluation, and defensive prompt engineering, with systematic evaluation examples that parallel prompt testing and acceptance criteria.

6. [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) - Anthropic Engineering - Defines context engineering as curating the limited tokens a model sees, and covers just-in-time retrieval, compaction, note-taking, and sub-agents. Directly parallels the chapter's selection and compression practices.

7. [Building effective agents](https://www.anthropic.com/research/building-effective-agents) - Anthropic Research - Presents composable workflow patterns, including prompt chaining, where each model call processes the previous output. Useful for designing the chapter's chained workflows with checks between steps, illustrated with pattern diagrams.

8. [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903) - arXiv (Wei et al.) - The original paper showing that few-shot examples with intermediate reasoning steps improve arithmetic, commonsense, and symbolic reasoning. Primary source for the chapter's chain-of-thought technique, including benchmark results.

9. [Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection](https://arxiv.org/abs/2302.12173) - arXiv (Greshake et al.) - Shows attackers hiding instructions in retrieved content to steer applications, risking data theft. Foundational for understanding why web pages, PDFs, and READMEs are attack channels, with demonstrated real-world attacks.

10. [LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) - OWASP Gen AI Security Project - Lists prevention measures such as least privilege, labeling untrusted content, validating outputs, and human approval for high-risk actions. Matches the chapter's four structural defenses, with concrete attack scenarios.
