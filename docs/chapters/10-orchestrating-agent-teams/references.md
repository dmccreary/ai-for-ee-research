# References: Orchestrating Teams of Planning and Execution Agents

1. [Critical path method](https://en.wikipedia.org/wiki/Critical_path_method) - Wikipedia - Explains how the longest chain of dependent tasks sets the minimum project duration and how slack is computed. Directly supports the chapter's nine-task example, where adding agents cannot shorten the 18-hour critical path.

2. [Multi-agent system](https://en.wikipedia.org/wiki/Multi-agent_system) - Wikipedia - Surveys systems of interacting agents, covering coordination, decision-making, and application areas. Gives the background vocabulary for agent teams, handoffs, and conflict resolution, with sections on coordination methods and software frameworks.

3. [Span of control](https://en.wikipedia.org/wiki/Span_of_control) - Wikipedia - Describes how many direct reports one supervisor can manage effectively and the factors that widen or narrow that number. Supports the chapter's span-of-control argument and the link between review cost and team size.

4. The Mythical Man-Month: Essays on Software Engineering (Anniversary Edition) - Frederick P. Brooks, Jr. - Addison-Wesley - Brooks shows that communication paths grow as n(n-1)/2 and that adding people to a late project makes it later. This clarifies why more agents raise coordination cost and why scaling has limits.

5. High Output Management (1st Edition) - Andrew S. Grove - Random House - Grove frames a manager's output as the output of the organization under their influence, and treats review time as the manager's scarce resource. This anticipates the chapter's attention budget and review-load arithmetic.

6. [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) - Anthropic Engineering - Compares workflow patterns including prompt chaining, parallelization, and orchestrator-workers, and advises when added complexity is warranted. Its orchestrator-workers pattern matches this chapter's planning and execution team structure.

7. [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) - Anthropic Engineering - Describes a lead agent delegating to parallel subagents, with lessons on prompts, evaluation, and reliability. A concrete case study of delegation, handoffs, and the cost and benefit of scaling.

8. [Create custom subagents](https://code.claude.com/docs/en/sub-agents) - Claude Code Documentation - Shows how to define a subagent as a Markdown file with a role, tool restrictions, and permissions. A working example of the agent specification files this chapter asks you to write.

9. [AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation](https://arxiv.org/abs/2308.08155) - arXiv - Presents a framework in which customizable agents converse and can include human participation. Useful for seeing how roles, conversation patterns, and human-in-the-loop checkpoints are implemented in practice.

10. [MetaGPT: Meta Programming for a Multi-Agent Collaborative Framework](https://arxiv.org/abs/2308.00352) - arXiv - Encodes standard operating procedures and assigned roles into a multi-agent software team. Illustrates structured handoffs and role specialization, relevant to handoff protocols and work breakdown.
