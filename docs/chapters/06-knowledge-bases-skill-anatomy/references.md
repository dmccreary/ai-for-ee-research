# References: Knowledge Bases, Personal Knowledge Graphs, and the Anatomy of an Agent Skill

1. [Knowledge graph](https://en.wikipedia.org/wiki/Knowledge_graph) - Wikipedia - Defines knowledge graphs as entities and typed relationships, with history, implementations, and reasoning over data. Directly supports the chapter's move from linked files to a queryable personal knowledge graph and graph schema.

2. [Knowledge base](https://en.wikipedia.org/wiki/Knowledge_base) - Wikipedia - Explains what a knowledge base is, how it differs from an ordinary database, and common types and examples. Frames the chapter's notes, specifications, glossaries, and logs as project memory that people and agents share.

3. [Named-entity recognition](https://en.wikipedia.org/wiki/Named-entity_recognition) - Wikipedia - Covers identifying entities in free text, with evaluation metrics, difficulties, and approaches. Background for the chapter's entity extraction step, including why extracted entities and relationships need human review.

4. Designing Data-Intensive Applications (1st Edition) - Martin Kleppmann - O'Reilly Media - Chapter 2 introduces the property graph model of vertices and edges and shows the same graph in Cypher and in relational tables. This side-by-side comparison clarifies why typed relationships make multi-hop questions easy.

5. How to Take Smart Notes (2nd Edition) - Sonke Ahrens - Sonke Ahrens (self-published) - Presents Niklas Luhmann's Zettelkasten method, with literature notes, permanent notes, and explicit links between them. Ahrens is not the originator of the method, but this book is widely praised for explaining linked notes as a thinking system, which clarifies the chapter's cross references and backlinks.

6. [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) - Anthropic Engineering - Explains the skill as a folder built around SKILL.md with name and description frontmatter. Describes progressive disclosure, where metadata loads first and bundled files load only on demand, matching the chapter's triggering discussion.

7. [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) - Anthropic Documentation - Official reference for skill structure, required name and description fields and their limits, and the three loading levels, with a worked pdf-processing example. Use it to check the chapter's SKILL.md anatomy.

8. [Knowledge Graphs (Hogan et al.)](https://arxiv.org/abs/2003.02320) - arXiv - A comprehensive survey of knowledge graph data models, query languages, construction, quality, and enterprise and open examples. Gives rigorous definitions behind the chapter's entities, relationships, schema, and graph querying.

9. [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](https://arxiv.org/abs/2404.16130) - arXiv (Microsoft Research) - Introduces GraphRAG, in which a language model builds an entity graph and community summaries to answer corpus-wide questions. A research-grade example of the chapter's graph retrieval-augmented generation.

10. [Cypher Manual: Introduction](https://neo4j.com/docs/cypher-manual/current/introduction/) - Neo4j Documentation - Official manual for Cypher, the property graph query language used in the chapter's MATCH example. Shows how node and relationship patterns express multi-hop traversals, with beginner resources and syntax references.
