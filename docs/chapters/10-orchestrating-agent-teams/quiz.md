# Quiz: Orchestrating Teams of Planning and Execution Agents

Test your understanding of agent teams, work breakdown, task dependencies, handoffs, review checkpoints, attention budgets, and scaling limits with these 10 review questions.

---


#### 1. In the book's working model, what is the approximate ratio of planning agents to execution agents?

<div class="upper-alpha" markdown>
1. 20 planning agents to 10 execution agents
2. 10 planning agents to 20 execution agents
3. 1 planning agent to 1 execution agent
4. 5 planning agents to 1 execution agent
</div>

??? question "Show Answer"
    The correct answer is **A**. The book uses roughly 20 planning agents to 10 execution agents as a design target, because planning outputs are cheap to review or discard while execution outputs change files and need more careful checking.

    **Concept Tested:** Agent Ratio

    **See:** ./index.md#the-team-and-the-orchestrator





---


#### 2. What is the term for the longest chain of dependent tasks in a project schedule?

<div class="upper-alpha" markdown>
1. Shared workspace
2. Handoff protocol
3. Review checkpoint
4. Critical path
</div>

??? question "Show Answer"
    The correct answer is **D**. The critical path is the longest sequence of dependent tasks and sets the minimum project duration. Adding agents cannot shorten it; only shortening a task on it can, and even then another path may become critical.

    **Concept Tested:** Task Dependencies

    **See:** ./index.md#breaking-work-down





---


#### 3. Why does the book recommend more planning agents than execution agents on a team?

<div class="upper-alpha" markdown>
1. Because planning agents are always more accurate
2. Because planning outputs are cheap to discard while execution outputs are expensive to check
3. Because execution agents cannot run in parallel
4. Because planning agents require more compute resources
</div>

??? question "Show Answer"
    The correct answer is **B**. Plans are documents that can be revised or discarded at low cost, so producing many candidates in parallel is efficient. Execution changes files and consumes attention to verify, so the execution side is kept smaller.

    **Concept Tested:** Agent Team

    **See:** ./index.md#the-team-and-the-orchestrator





---


#### 4. What is the main purpose of a handoff protocol?

<div class="upper-alpha" markdown>
1. To let agents share the same context window
2. To eliminate the need for review checkpoints
3. To define a uniform way work passes from one agent to another
4. To increase the number of agents in the team
</div>

??? question "Show Answer"
    The correct answer is **C**. A handoff protocol specifies the format, location, and status values used when one agent passes work to another, reducing information loss. It does not remove the need for review, and it is not about team size or shared context windows.

    **Concept Tested:** Handoff Protocol

    **See:** ./index.md#handoffs-shared-workspaces-and-conflicts





---


#### 5. Why is plan review considered the highest-leverage review in the workflow?

<div class="upper-alpha" markdown>
1. A defect found in a plan costs minutes, while the same defect found after execution costs a rerun
2. Plans are the only output that can be reviewed by a human
3. Plans do not need acceptance criteria
4. Execution outputs cannot be reviewed at all
</div>

??? question "Show Answer"
    The correct answer is **A**. Catching a problem in the plan avoids the much larger cost of executing a flawed plan and then redoing the work. Plans should have acceptance criteria, and execution outputs can and should be reviewed.

    **Concept Tested:** Plan Review

    **See:** ./index.md#specifying-prioritizing-and-reporting





---


#### 6. A task queue contains tasks T1, T2, T3, and T4. T2 needs T1, T3 needs T1, and T4 needs both T2 and T3. Which task must start first?

<div class="upper-alpha" markdown>
1. T2
2. T1
3. T4
4. T3
</div>

??? question "Show Answer"
    The correct answer is **B**. T1 has no prerequisites, while T2, T3, and T4 all depend directly or indirectly on T1. Nothing else can start until T1 finishes.

    **Concept Tested:** Task Queue

    **See:** ./index.md#breaking-work-down





---


#### 7. A planning agent finishes a draft plan that it wants the researcher to examine. Which handoff status should the agent assign to the output?

<div class="upper-alpha" markdown>
1. accepted
2. running
3. needs-review
4. rejected
</div>

??? question "Show Answer"
    The correct answer is **C**. An agent never marks its own work as accepted; `accepted` belongs to a reviewer agent, a script, or the researcher. `needs-review` correctly signals that the output is ready for the next checkpoint.

    **Concept Tested:** Review Checkpoint

    **See:** ./index.md#handoffs-shared-workspaces-and-conflicts





---


#### 8. A team produces 20 planning outputs at 6 minutes each and 10 execution outputs at 15 minutes each, with 30 minutes for conflict resolution. How many hours of daily review does it need?

<div class="upper-alpha" markdown>
1. 3 hours
2. 4 hours
3. 4.5 hours
4. 5 hours
</div>

??? question "Show Answer"
    The correct answer is **D**. The load is 20 × 6 + 10 × 15 + 30 = 120 + 150 + 30 = 300 minutes, which is 5 hours. If the researcher has only 4 hours of attention, the team is too large.

    **Concept Tested:** Researcher Attention

    **See:** ./index.md#review-approval-and-researcher-attention





---


#### 9. Two execution agents report different ENOB values for the same data record. What should the conflict resolution procedure do first?

<div class="upper-alpha" markdown>
1. Establish whether the disagreement is about facts or judgment, then trace each result to its inputs and method
2. Average the two values and report the mean
3. Ask a third agent to pick the more confident report
4. Reject both reports and rerun the analysis blindly
</div>

??? question "Show Answer"
    The correct answer is **A**. Sound conflict resolution separates factual disagreements from judgment calls, traces each result to its inputs and method, and finds the first divergence. Averaging unrelated values or rerunning without understanding the cause can hide the real problem.

    **Concept Tested:** Conflict Resolution

    **See:** ./index.md#handoffs-shared-workspaces-and-conflicts





---


#### 10. A researcher doubles the number of execution agents on a project, but the project duration does not decrease. What is the most likely reason?

<div class="upper-alpha" markdown>
1. The planning agents are not producing enough plans
2. The agents are not sharing a workspace
3. The new agents are slower than the old ones
4. The agents are blocked by dependencies on the critical path
</div>

??? question "Show Answer"
    The correct answer is **D**. Parallelism cannot shorten the critical path; added agents will sit idle waiting for prerequisite tasks. A shared workspace and plan production affect coordination but do not explain why more agents fail to speed up a dependency-bound schedule.

    **Concept Tested:** Scaling Agent Teams

    **See:** ./index.md#cost-benefit-and-the-limits-of-scaling


