# Quiz: Knowledge Bases, Personal Knowledge Graphs, and the Anatomy of an Agent Skill

Test your understanding of project knowledge files, personal knowledge graphs, and the parts of an agent skill.

---


#### 1. What is a knowledge base in the context of a research project?

<div class="upper-alpha" markdown>
1. A web search engine specialized for academic papers
2. A large language model trained on the project's documents
3. An organized collection of written project material kept in plain text so people and agents can read it
4. The set of all files in the repository, regardless of purpose
</div>

??? question "Show Answer"
    The correct answer is **C**. A knowledge base is the curated set of notes, specifications, glossaries, decision logs, and session logs that capture what the project knows. It is not a trained model, not every file indiscriminately, and not an external search engine.

    **Concept Tested:** Knowledge Base

    **See:** [From Project Files to a Knowledge Base](./index.md#from-project-files-to-a-knowledge-base)





---


#### 2. Which knowledge-base file type states the current agreed requirements and is read before writing code or text?

<div class="upper-alpha" markdown>
1. Research notes
2. Session log
3. Specification file
4. Decision log
</div>

??? question "Show Answer"
    The correct answer is **C**. A specification file states inputs, outputs, constraints, and acceptance criteria and is edited in place as the agreement changes. Research notes are informal and appended, session logs bridge sittings, and decision logs record choices and reasons.

    **Concept Tested:** Specification File

    **See:** [From Project Files to a Knowledge Base](./index.md#from-project-files-to-a-knowledge-base)





---


#### 3. What is the main purpose of a glossary file?

<div class="upper-alpha" markdown>
1. To define the project's terms so everyone uses them the same way
2. To store all session logs in one place
3. To list every reference cited by the project
4. To record the final results of experiments
</div>

??? question "Show Answer"
    The correct answer is **A**. A glossary fixes the meaning of load-bearing terms, with units and related terms, so agents and collaborators do not silently choose different senses. It is not a session archive, bibliography, or results ledger.

    **Concept Tested:** Glossary File

    **See:** [From Project Files to a Knowledge Base](./index.md#from-project-files-to-a-knowledge-base)





---


#### 4. Why does the chapter recommend keeping a decision log?

<div class="upper-alpha" markdown>
1. It replaces the need for a specification file.
2. It stores API keys and passwords.
3. It makes the project searchable by web search engines.
4. Reasoning decays faster than results, so the reasons for choices are easily forgotten.
</div>

??? question "Show Answer"
    The correct answer is **D**. A decision log captures the choice, the alternatives rejected, and the evidence, so that nobody reopens the question later without new information. It complements, rather than replaces, the specification, and it must not contain secrets.

    **Concept Tested:** Decision Log

    **See:** [From Project Files to a Knowledge Base](./index.md#from-project-files-to-a-knowledge-base)





---


#### 5. At the start of a new working session, which file should an agent read to continue work without re-explaining the project?

<div class="upper-alpha" markdown>
1. The glossary file only
2. The most recent session log
3. The oldest research note
4. The project's README, ignoring earlier sessions
</div>

??? question "Show Answer"
    The correct answer is **B**. The session log records what was asked, produced, accepted, and left open in the last sitting, making it the bridge between sessions. The glossary and README provide context, but they do not carry the current state of the work.

    **Concept Tested:** Session Log

    **See:** [From Project Files to a Knowledge Base](./index.md#from-project-files-to-a-knowledge-base)





---


#### 6. In a knowledge graph, why are typed relationships more useful than undifferentiated wiki links?

<div class="upper-alpha" markdown>
1. They let a program traverse and compute with the meaning of the connection.
2. They make the graph look nicer when rendered.
3. They guarantee that every link is factually correct.
4. They reduce the number of entities the graph must store.
</div>

??? question "Show Answer"
    The correct answer is **A**. A typed relationship such as `USED` or `REPORTS` tells a query engine what the link means, enabling multi-hop questions such as "which papers report an experiment that used this dataset?". A plain link only says "related to". Typing does not guarantee correctness or reduce entities.

    **Concept Tested:** Entity and Relationship

    **See:** [From Files to a Knowledge Graph](./index.md#from-files-to-a-knowledge-graph)





---


#### 7. In the chapter's graph example, if Dataset A is discovered to be corrupted, which papers must be rechecked?

<div class="upper-alpha" markdown>
1. Only Paper Beta
2. Only Paper Alpha
3. The paper authored by Dr. Rivera
4. Both Paper Alpha and Paper Beta
</div>

??? question "Show Answer"
    The correct answer is **D**. Dataset A is used by both Run 07 and Run 08; Paper Alpha reports Run 07 and Paper Beta reports Run 08, so both papers depend on Dataset A. This is a multi-hop question that a graph can answer but a simple text search might miss.

    **Concept Tested:** Graph Querying

    **See:** [From Files to a Knowledge Graph](./index.md#from-files-to-a-knowledge-graph)





---


#### 8. What is the main job of a skill description in SKILL.md?

<div class="upper-alpha" markdown>
1. To list every script the skill can run
2. To tell the agent what the skill does and when to use it
3. To provide the full step-by-step procedure
4. To store the skill's version history
</div>

??? question "Show Answer"
    The correct answer is **B**. The description is the only part of the skill the agent keeps in context when deciding whether to load the skill, so it must state both the task and the triggering cues. The full procedure is in the instructions, and version history lives in Git, not the description.

    **Concept Tested:** Skill Description

    **See:** [The Anatomy of an Agent Skill](./index.md#the-anatomy-of-an-agent-skill)





---


#### 9. Given the skill description "Compute ENOB from a coherently sampled ADC record and write a one-page report. Use when the user asks for ENOB, SNDR, or an ADC characterization summary," which request should trigger the skill?

<div class="upper-alpha" markdown>
1. "What is the ENOB of capture-07.csv?"
2. "Plot the spectrum of capture-07.csv."
3. "Draft the related-work paragraph."
4. "Install a new Python package for me."
</div>

??? question "Show Answer"
    The correct answer is **A**. The request asks for ENOB, one of the explicit cues in the description. Plotting a spectrum is a different task, drafting related work is unrelated, and installing a package is outside the skill's scope.

    **Concept Tested:** Skill Triggering

    **See:** [The Anatomy of an Agent Skill](./index.md#the-anatomy-of-an-agent-skill)





---


#### 10. Why are scripts, references, and templates kept as supporting files outside SKILL.md?

<div class="upper-alpha" markdown>
1. They are not needed when the skill runs.
2. They are loaded only when the instructions point to them, keeping the always-loaded context small.
3. The agent cannot read files with those extensions.
4. They are hidden from the user for security reasons.

</div>

??? question "Show Answer"
    The correct answer is **B**. Supporting files are opened on demand, so the agent only pays their token cost when the instructions require them. They are still used, readable, and not hidden; the design simply avoids loading everything into every session.

    **Concept Tested:** Supporting Files

    **See:** [The Anatomy of an Agent Skill](./index.md#the-anatomy-of-an-agent-skill)


