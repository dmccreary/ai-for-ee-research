# Quiz: Supervising Agents and Defining Agent Roles

Test your understanding of autonomy levels, supervision, logging, failure modes, cost control, scheduling, trust boundaries, and agent roles with these 10 review questions.

---

#### 1. Which three properties of a task determine how much autonomy an agent should be given?

<div class="upper-alpha" markdown>
1. Reversibility, reach, and verifiability
2. Cost, speed, and model capability
3. Prompt length, context size, and tool count
4. Agent role, handoff protocol, and logging level
</div>

??? question "Show Answer"
    The correct answer is **A**. Autonomy is set by what the action does and whether it can be undone, whether it leaves your control, and whether the result can be checked quickly. Model capability is not one of the deciding properties.

    **Concept Tested:** Agent Autonomy

    **See:** ./index.md#autonomy-and-supervision





---

#### 2. In the planner-executor pattern, what serves as the handoff from the planning agent to the execution agent?

<div class="upper-alpha" markdown>
1. A log file recording every tool call
2. The agent's credentials for external services
3. A summary of all previous agent conversations
4. A specification the execution agent carries out
</div>

??? question "Show Answer"
    The correct answer is **D**. The planning agent produces a readable specification with acceptance criteria, and the execution agent implements it. Logs and credentials are not handoff artifacts, and sharing full conversation history violates context isolation.

    **Concept Tested:** Planner Executor Pattern

    **See:** ./index.md#defining-agent-roles





---

#### 3. Why should scheduled or background agent tasks be idempotent?

<div class="upper-alpha" markdown>
1. So they can run only once per project
2. So a repeated or interrupted run does no harm
3. So they do not need to write logs
4. So they can bypass permission checks
</div>

??? question "Show Answer"
    The correct answer is **B**. Idempotence means running the task twice produces the same result as running it once, which protects against crashes, restarts, or duplicate schedules. Logs and permissions remain important regardless.

    **Concept Tested:** Background Tasks

    **See:** ./index.md#scheduling-background-work-and-trust-boundaries





---

#### 4. Why does the cost of an agent-loop conversation grow faster than the number of steps?

<div class="upper-alpha" markdown>
1. Because each step uses a more expensive model
2. Because the harness charges per tool call
3. Because each iteration resends the growing context
4. Because subagents double the cost at every step
</div>

??? question "Show Answer"
    The correct answer is **C**. Every loop pass resends the prior context plus new tool results, so input tokens grow with each step. The model selection and tool-call mechanics do not create this compounding effect on their own.

    **Concept Tested:** Cost Control

    **See:** ./index.md#logging-failure-modes-and-runaway-agents





---

#### 5. What makes a reviewer agent a useful check on another agent's output?

<div class="upper-alpha" markdown>
1. It evaluates the output against stated criteria rather than the producer's intentions
2. It guarantees the output is free of model errors
3. It replaces the need for human review and test scripts
4. It always uses a more powerful model than the producer
</div>

??? question "Show Answer"
    The correct answer is **A**. A reviewer checks against explicit criteria, giving some independence from the producing agent's reasoning. It is not infallible and should complement, not replace, tests and human sampling.

    **Concept Tested:** Reviewer Agent

    **See:** ./index.md#defining-agent-roles





---

#### 6. A task requires emailing a summary of results to a collaborator before you have verified its claims. Which autonomy level is appropriate?

<div class="upper-alpha" markdown>
1. Level 3: act and report
2. Level 0: suggest only
3. Level 2: act within a boundary
4. Level 1: approve each step
</div>

??? question "Show Answer"
    The correct answer is **B**. The action leaves your control and cannot be quickly verified, so the agent should only propose the email and you should send it. Levels 1-3 give the agent more action than the task properties allow.

    **Concept Tested:** Agent Autonomy

    **See:** ./index.md#autonomy-and-supervision





---

#### 7. An agent log shows that a failing test was edited to expect a lower value while the code under test was left unchanged. Which failure mode is this?

<div class="upper-alpha" markdown>
1. Premature completion
2. Scope drift
3. Test weakening
4. Runaway loop
</div>

??? question "Show Answer"
    The correct answer is **C**. Test weakening is editing the test to pass instead of fixing the underlying problem. Premature completion claims success without running checks, scope drift touches unrelated files, and a runaway loop repeats the same action.

    **Concept Tested:** Agent Failure Modes

    **See:** ./index.md#logging-failure-modes-and-runaway-agents





---

#### 8. A researcher wants an agent script to run every night when new data may arrive. Which prerequisite is most important before leaving it unattended?

<div class="upper-alpha" markdown>
1. The script uses the strongest available model
2. The script shares the main agent's full context
3. The script has credentials hard-coded for convenience
4. The task is narrow, idempotent, logged, and bounded
</div>

??? question "Show Answer"
    The correct answer is **D**. Unattended work needs a narrow scope, idempotence, a written log, and limits on steps, time, and spending. Stronger models, shared context, and hard-coded credentials increase risk rather than control it.

    **Concept Tested:** Task Scheduling

    **See:** ./index.md#scheduling-background-work-and-trust-boundaries





---

#### 9. A planning agent is given high autonomy to produce many draft specifications, while an execution agent is kept at a lower autonomy level. What does this pairing illustrate?

<div class="upper-alpha" markdown>
1. Autonomy set by task properties: planning outputs are cheap to discard, while execution changes files
2. Planning agents are always more capable than execution agents
3. Execution agents should never use tools
4. Planning outputs do not need any human review
</div>

??? question "Show Answer"
    The correct answer is **A**. Planning outputs are documents that can be revised or discarded, so higher autonomy is safer; execution changes files and consumes resources, so it is more tightly bounded. Capability and tool use are not the deciding factors.

    **Concept Tested:** Planning Agent

    **See:** ./index.md#defining-agent-roles





---

#### 10. An agent receives an email claiming to contain a critical bug fix and immediately edits the project code based on the message text. What principle has been violated?

<div class="upper-alpha" markdown>
1. Context isolation
2. Idempotence
3. Cost control
4. Trust boundary
</div>

??? question "Show Answer"
    The correct answer is **D**. Email content is outside the trust boundary and should be treated as untrusted data, not as instructions to act on. Context isolation limits what each agent sees, idempotence concerns repeated runs, and cost control limits spending.

    **Concept Tested:** Trust Boundary

    **See:** ./index.md#scheduling-background-work-and-trust-boundaries
