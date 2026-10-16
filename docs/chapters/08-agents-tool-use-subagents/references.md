# References: Agents, Tool Use, and Subagents

1. [Intelligent agent](https://en.wikipedia.org/wiki/Intelligent_agent) - Wikipedia - Defines agents that perceive an environment and act toward goals, with agent functions and classifications. Gives the vocabulary behind the chapter's agent loop and explains why a tool-using model counts as an agent.

2. [Sandbox (computer security)](https://en.wikipedia.org/wiki/Sandbox_(computer_security)) - Wikipedia - Explains isolating untrusted programs so faults cannot harm the host, and surveys containers, virtual machines, and operating-system sandboxes. Supports the chapter's distinction between technical enforcement and permission policy.

3. [Model Context Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol) - Wikipedia - Overview of the open standard for connecting AI models to external tools and data, covering architecture, industry adoption, and security concerns. Useful background for MCP servers and the least-privilege advice in this chapter.

4. Artificial Intelligence: A Modern Approach (4th Edition) - Stuart Russell and Peter Norvig - Pearson - Organizes the whole field around the rational agent and introduces the PEAS description (performance measure, environment, actuators, sensors). That framing lets students specify exactly what an agent can perceive and do, which is this chapter's boundary-setting task.

5. Reinforcement Learning: An Introduction (2nd Edition) - Richard S. Sutton and Andrew G. Barto - MIT Press - Presents the agent-environment interaction diagram, in which the agent acts, the environment returns a new state and reward, and the cycle repeats. This is the clearest textbook picture of the loop that tool-using agents run.

6. [Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents) - Anthropic Engineering - Argues for simple, composable patterns and distinguishes workflows from autonomous agents, with a flow diagram for each pattern including orchestrator-workers and parallelization. Practical guidance on when agents are worth their cost and risk.

7. [Tool use with Claude](https://platform.claude.com/docs/en/docs/build-with-claude/tool-use) - Anthropic Documentation - Shows tool definitions with input schemas, the tool_use and tool_result round trip, and the split between client tools and server tools. Code examples make the chapter's definition-versus-call distinction concrete.

8. [What is the Model Context Protocol (MCP)?](https://modelcontextprotocol.io/docs/getting-started/intro) - Model Context Protocol Project - Official introduction to MCP, using a USB-C port analogy and an architecture diagram to show clients, servers, tools, and data sources. Links to security best practices relevant to connecting research systems.

9. [Create custom subagents](https://code.claude.com/docs/en/sub-agents) - Claude Code Documentation - Describes subagents with their own context windows, restricted tool sets, and permission modes that return only summaries. Includes configuration examples and built-in read-only explorer and planner agents that illustrate isolation and delegation.

10. [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) - arXiv (Yao et al.) - The foundational paper on interleaving reasoning steps with actions such as search, where each observation informs the next step. It underlies the decide-act-observe agent loop and shows reduced hallucination on question answering.
