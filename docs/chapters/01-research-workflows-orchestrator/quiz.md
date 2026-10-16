# Quiz: Research Workflows and the Researcher as Orchestrator

Test your understanding of research workflows, the generative-AI vocabulary, and the researcher-as-orchestrator mindset with these 10 review questions.

---

#### 1. What is the term for the sequence of repeatable activities that turns a research question into a validated, communicated result?

<div class="upper-alpha" markdown>
1. Task decomposition
2. Research pipeline
3. Agentic research
4. Research workflow
</div>

??? question "Show Answer"
    The correct answer is **D**. A research workflow is defined as the sequence of repeatable activities—literature search, analysis, coding, and manuscript preparation—through which a question becomes a validated result. A research pipeline is the chaining of those tasks end-to-end, agentic research is the use of agents within that work, and task decomposition is the breaking of goals into subtasks.

    **Concept Tested:** Research Workflow

    **See:** [Research as a Workflow](./index.md#research-as-a-workflow)





---

#### 2. Which property of a strong research question is most clearly demonstrated by stating a metric, a threshold, and operating conditions?

<div class="upper-alpha" markdown>
1. Specific
2. Falsifiable
3. Bounded
4. Measurable
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter lists four properties of a good research question, and a stated metric with a threshold makes the question measurable—you can compare the result to a number. The example is also specific, bounded, and falsifiable, but the metric-and-threshold pair most directly establishes measurability.

    **Concept Tested:** Research Question

    **See:** [Framing the Research Question](./index.md#framing-the-research-question)





---

#### 3. In the vocabulary chain from generative AI to AI agent, what does an AI assistant add to a large language model?

<div class="upper-alpha" markdown>
1. Tools and an action loop
2. A conversational interface with history and turns
3. The ability to predict the next token
4. Deterministic output guarantees
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter builds the chain: generative AI is the broad class, an LLM specializes in next-token prediction, an assistant wraps the LLM in a conversational interface with history and turns, and an agent adds tools plus a loop. Tools and loops belong to agents, not assistants, and LLMs are not deterministic by default.

    **Concept Tested:** AI Assistant

    **See:** [AI Assistants](./index.md#ai-assistants)





---

#### 4. What is the key practical difference between an AI assistant and an AI agent?

<div class="upper-alpha" markdown>
1. Assistants always use smaller models than agents.
2. Agents take actions in the world through tools without per-step human prompting.
3. Assistants never make errors, while agents frequently do.
4. Agents require no supervision because they run autonomously.
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter emphasizes that an assistant returns replies and waits for you to act, whereas an agent decides and takes actions through tools in a loop. Model size is irrelevant, both can err, and agents require limits and review rather than no supervision.

    **Concept Tested:** AI Agent

    **See:** [AI Agents](./index.md#ai-agents)





---

#### 5. What term describes a researcher who directs teams of planning and execution agents while retaining final accountability for the science?

<div class="upper-alpha" markdown>
1. Human in the loop
2. AI orchestrator
3. Researcher as orchestrator
4. Agent supervisor
</div>

??? question "Show Answer"
    The correct answer is **C**. The researcher as orchestrator is the book's central idea: the researcher sets direction, resolves conflicts, and verifies agent outputs rather than doing every task personally. Human in the loop is a design pattern for review points, not the overall role, and the accountability remains with the researcher.

    **Concept Tested:** Researcher as Orchestrator

    **See:** [The Researcher as Orchestrator](./index.md#the-researcher-as-orchestrator)





---

#### 6. If each of five independent workflow stages has a 90% chance of being free of consequential error, why is the chance of a clean pipeline only about 59%?

<div class="upper-alpha" markdown>
1. Because independent probabilities multiply: 0.9 raised to the fifth power.
2. Because errors tend to concentrate in the first stage.
3. Because later stages amplify errors made earlier.
4. Because 90% is below the threshold needed for any single stage.
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter uses 0.9⁵ ≈ 0.59 to show that even high per-stage reliability compounds into a significant overall failure rate. Errors are not assumed to cluster in one stage, nor do they necessarily amplify; the lesson is that pipeline trustworthiness requires verification at handoffs.

    **Concept Tested:** Research Pipeline

    **See:** [The Research Pipeline, Productivity, and Reproducibility](./index.md#the-research-pipeline-productivity-and-reproducibility)





---

#### 7. In the ADC comparison example, which two subtasks can proceed in either order after the measurement procedure is defined?

<div class="upper-alpha" markdown>
1. Compare ENOB values and explain differences; define the procedure
2. Compute ENOB from simulated records; compute ENOB from measured records
3. Simulate both designs; measure both fabricated chips
4. Define the procedure; compute ENOB from simulated records
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter decomposes the comparison into six subtasks and notes that S2 (simulate both designs) and S3 (measure both fabricated chips) both depend only on S1 (define the procedure), so they are independent and can run in either order or in parallel. The other options violate dependencies.

    **Concept Tested:** Task Decomposition

    **See:** [Task Decomposition](./index.md#task-decomposition)





---

#### 8. To make an AI-assisted step reproducible, what should be recorded alongside the prompt and input files?

<div class="upper-alpha" markdown>
1. The model name, version, and settings such as temperature
2. The agent's internal reasoning trace
3. The final output only
4. The researcher's initials only
</div>

??? question "Show Answer"
    The correct answer is **A**. Reproducibility now requires recording the model identity, version, and settings because model outputs depend on them and models can change. The output should also be kept, but the prompt and model metadata are the minimum inputs needed to understand how a result was produced.

    **Concept Tested:** Reproducibility

    **See:** [The Research Pipeline, Productivity, and Reproducibility](./index.md#the-research-pipeline-productivity-and-reproducibility)





---

#### 9. Which agent action most clearly requires human review because it is irreversible?

<div class="upper-alpha" markdown>
1. Overwriting raw measurement files with cleaned versions
2. Renaming a column in a copied data file
3. Listing candidate keywords for a literature search
4. Drafting an unsent email
</div>

??? question "Show Answer"
    The correct answer is **A**. Overwriting raw measurement files destroys the original data and cannot be undone, so the chapter says this should trigger review and preferably be forbidden by instructing the agent to write to a new file. The other actions are reversible, internal, or cheap to check.

    **Concept Tested:** Human in the Loop

    **See:** [Human in the Loop](./index.md#human-in-the-loop)





---

#### 10. Which everyday research task is described as especially prone to silent errors because a script usually runs and produces a number?

<div class="upper-alpha" markdown>
1. Literature search
2. Data analysis
3. Brainstorming
4. Manuscript preparation
</div>

??? question "Show Answer"
    The correct answer is **B**. Data analysis is highlighted as the place where agents most often produce silent errors: a script can run successfully while using the wrong window, units, or formula and still yield a plausible-looking value. Literature search errors are more visible, brainstorming is low-stakes, and manuscript errors are usually in claims that can be audited.

    **Concept Tested:** Data Analysis

    **See:** [Data Analysis](./index.md#data-analysis)
