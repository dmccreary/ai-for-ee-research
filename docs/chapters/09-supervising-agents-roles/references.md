# References: Supervising Agents and Defining Agent Roles

1. [Intelligent agent](https://en.wikipedia.org/wiki/Intelligent_agent) - Wikipedia - Defines agents by how they perceive an environment and act toward goals, with a classification of agent types and degrees of autonomy. Useful background for the chapter's autonomy dial and agent roles.

2. [Multi-agent system](https://en.wikipedia.org/wiki/Multi-agent_system) - Wikipedia - Covers systems of interacting agents, including coordination, communication, and organization. Gives the vocabulary behind planner, executor, and reviewer roles, handoffs, and why supervising several agents differs from supervising one.

3. [Principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) - Wikipedia - Explains giving each process only the access it needs, limiting damage from errors or attacks. Grounds the chapter's rules for narrow scope, trust boundaries, and scoped credentials for agents.

4. Artificial Intelligence: A Modern Approach (4th Edition) - Stuart Russell and Peter Norvig - Pearson - Organizes the whole field around the intelligent agent and describes each task with the PEAS framework (performance measure, environment, actuators, sensors). That template helps you write an agent role's purpose, tools, and success criteria precisely.

5. Release It! Design and Deploy Production-Ready Software (2nd Edition) - Michael T. Nygard - Pragmatic Bookshelf - Catalogs production stability patterns such as timeouts, circuit breakers, and bulkheads, with failure case studies. These map directly onto step limits, spending caps, and stop-on-repeat rules that contain a runaway agent.

6. [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) - Anthropic - Distinguishes fixed workflows from autonomous agents and describes patterns such as orchestrator-workers and evaluator-optimizer. It recommends checkpoints for human feedback, stopping conditions, and sandboxed testing, which parallel this chapter's supervision practices.

7. [Create custom subagents](https://code.claude.com/docs/en/sub-agents) - Anthropic (Claude Code documentation) - Shows how to define a role as a Markdown file with a restricted tool allowlist, model, and permission mode. Includes examples of context isolation and read-only reviewer or research subagents.

8. [Configure permissions](https://code.claude.com/docs/en/permissions) - Anthropic (Claude Code documentation) - Describes tiered permission modes and allow, ask, and deny rules for tools, files, and commands. A concrete implementation of setting autonomy per action and bounding what an agent may touch.

9. [Why Do Multi-Agent LLM Systems Fail?](https://arxiv.org/abs/2503.13657) - arXiv (Cemri et al., 2025) - Analyzes over 1,600 annotated traces and proposes MAST, a taxonomy of 14 failure modes in three categories, including task verification failures. Supports the chapter's failure-mode table and the case for logging and review.

10. [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/) - OWASP - Lists the leading risks for LLM applications, including prompt injection, excessive agency, sensitive information disclosure, and unbounded consumption. Provides a security checklist for trust boundaries, credential handling, and cost control.
