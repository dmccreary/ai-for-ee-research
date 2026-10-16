# References: Always-On Personal Agents for Research

1. [Intelligent agent](https://en.wikipedia.org/wiki/Intelligent_agent) - Wikipedia - Defines agents as systems that perceive an environment and act toward goals, with taxonomies and architectures. Grounds the chapter's definition of personal and always-on agents, with diagrams of agent structure and levels of autonomy.

2. [Principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) - Wikipedia - Explains limiting each user or process to the access it needs. Underpins the chapter's blast-radius remedies and the advice to give each agent only the sign-ins its job requires, with history and implementation notes.

3. [Knowledge graph](https://en.wikipedia.org/wiki/Knowledge_graph) - Wikipedia - Describes graph-structured stores of entities and relationships and their use in search and generative AI. Supports the chapter's knowledge graph memory and subgraph-partitioning ideas, with definitions, examples, and implementation approaches.

4. Artificial Intelligence: A Modern Approach (4th Edition) - Stuart Russell and Peter Norvig - Pearson - Organizes the whole field around rational agents and specifies a task environment by performance measure, environment, actuators, and sensors. That framing helps readers define what a personal agent may sense and do.

5. Security Engineering: A Guide to Building Dependable Distributed Systems (3rd Edition) - Ross Anderson - Wiley - Treats security as a systems problem of threat models, policy, and failure analysis, using many real-world case studies. No single originator is claimed; chosen for clarity on access, assurance, and trust, which supports blast-radius and audit reasoning.

6. [Building effective agents](https://www.anthropic.com/research/building-effective-agents) - Anthropic - Practical engineering guidance on simple, composable agent patterns and when added autonomy is worthwhile. Useful for judging vendor agent designs, with workflow diagrams and advice on tools, oversight, and testing.

7. [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) - OWASP Gen AI Security Project - Catalogs the leading risks of LLM applications, including prompt injection, excessive agency, and unbounded consumption. Directly maps to the chapter's blast radius, usage metering, and data exposure criteria, with entries giving mitigations.

8. [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442) - arXiv - Park et al. extend language models with memory, reflection, and planning for long-lived agents. Illustrates why persistent agent memory matters and what it enables, with a 25-agent sandbox evaluation and ablation experiments.

9. [MemGPT: Towards LLMs as Operating Systems](https://arxiv.org/abs/2310.08560) - arXiv - Introduces tiered memory management that lets a model operate beyond its context window. Relevant to how always-on agents keep durable memory across weeks, with document-analysis and long-chat experiments.

10. [Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection](https://arxiv.org/abs/2302.12173) - arXiv - Shows how hidden instructions in retrieved content can hijack LLM-integrated applications. Explains why delegated sign-in and shared logins enlarge blast radius, with concrete attack demonstrations against real applications.
