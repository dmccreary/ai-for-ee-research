# References: Designing, Testing, and Sharing Agent Skills

1. [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) - Wikipedia - Explains the design culture of small, single-purpose tools that cooperate through shared interfaces. Directly supports this chapter's single-purpose skills and composition by files, with quoted maxims from McIlroy, Raymond, and Gancarz.

2. [Software testing](https://en.wikipedia.org/wiki/Software_testing) - Wikipedia - Broad survey of test levels, black-box and white-box methods, regression testing, and test oracles. Gives vocabulary for the chapter's trigger tests, behavior tests with known answers, and rerunning tests after a change.

3. [Software versioning](https://en.wikipedia.org/wiki/Software_versioning) - Wikipedia - Describes how released software states receive identifiers, including major.minor.patch schemes and semantic versioning. Background for the chapter's skill versioning guidance on when to increment which number and why.

4. A Philosophy of Software Design (2nd Edition) - John Ousterhout - Yaknyam Press - Ousterhout introduces the contrast between "deep" modules, with a simple interface hiding substantial functionality, and "shallow" ones. This clarifies why a skill should expose a short, precise description over a large, well-scoped body.

5. The Art of UNIX Programming (1st Edition) - Eric S. Raymond - Addison-Wesley - Raymond gathers the Unix tradition into named design rules such as Modularity, Composition, Clarity, and Silence, each illustrated with real programs. Its rule of composition explains why small skills joined by files are easier to debug.

6. [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) - Anthropic Documentation - Official description of how skills are packaged and loaded in three levels: metadata, instructions, and resources. Includes a loading-cost table and a worked PDF example that ground progressive disclosure and installation locations.

7. [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) - Anthropic Documentation - Practical guidance on writing descriptions, keeping SKILL.md concise, using reference files and scripts, and building evaluations before documentation. Ends with a pre-sharing checklist that mirrors this chapter's testing and failure-mode advice.

8. [Agent Skills specification](https://agentskills.io/specification) - Agent Skills (open standard) - Formal definition of the SKILL.md format: required name and description, optional license, compatibility, and metadata map, and the scripts, references, and assets directories. Supports the chapter's metadata and portability points.

9. [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) - Anthropic Engineering - Explains how to build automated evaluations for agents, covering grader types, handling run-to-run non-determinism, and a roadmap for maintaining eval suites. Directly relevant to the chapter's repeated-run skill evaluation.

10. [Semantic Versioning 2.0.0](https://semver.org/) - Semantic Versioning Specification - Concise specification of MAJOR.MINOR.PATCH numbering and the rules for when each part changes. Provides the exact convention behind the chapter's advice to bump the major number when a skill's output format could break a pipeline.
