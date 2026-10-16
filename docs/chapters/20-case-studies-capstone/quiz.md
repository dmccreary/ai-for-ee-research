# Quiz: Case Studies and Capstone Project

Test your understanding of case studies, skill pipelines, workflow documentation, agent team design, the capstone, and adoption planning with these 10 review questions.

---

#### 1. What is the term for a detailed account of a real project that is analyzed for what it teaches?

<div class="upper-alpha" markdown>
1. Case study
2. Skill pipeline
3. Workflow documentation
4. Adoption plan
</div>

??? question "Show Answer"
    The correct answer is **A**. A case study examines a real project under real conditions, including incomplete specifications, tool failures, and decisions made with partial information. The other terms describe processes or plans, not the analysis of a completed project.

    **Concept Tested:** Case Study

    **See:** ./index.md#learning-from-cases





---

#### 2. What is the term for a chain of skills in which each skill reads the files that the previous one wrote?

<div class="upper-alpha" markdown>
1. Agent team
2. Learning graph
3. Reproducibility package
4. Skill pipeline
</div>

??? question "Show Answer"
    The correct answer is **D**. A skill pipeline passes files from one single-purpose skill to the next, with each stage producing an inspectable output. An agent team performs coordinated work, a learning graph orders concepts, and a reproducibility package lets others rerun results.

    **Concept Tested:** Skill Pipeline

    **See:** ./index.md#case-study-the-intelligent-textbook-project





---

#### 3. Why should a case study include failure cases?

<div class="upper-alpha" markdown>
1. To discourage readers from trying similar projects
2. Because failures show where controls are needed
3. Because journals require negative results
4. Because successes are not informative
</div>

??? question "Show Answer"
    The correct answer is **B**. Failure cases reveal the root causes of problems and the controls that would have caught them. A record with only successes hides where the workflow needs checks and invites the same mistakes.

    **Concept Tested:** Failure Case

    **See:** ./index.md#lessons-learned-and-failure-cases





---

#### 4. What is the purpose of the `status` field on each simulation's page in the intelligent textbook workflow?

<div class="upper-alpha" markdown>
1. To track how many students used the sim
2. To control the color of the mascot
3. To encode the autonomy boundary and who may advance it
4. To measure the sim's loading speed
</div>

??? question "Show Answer"
    The correct answer is **C**. The status field marks whether a sim is scaffolded, built, instrumented, or approved. Agents may set the first three; only the human author sets approved, making the status an autonomy boundary.

    **Concept Tested:** Textbook Workflow

    **See:** ./index.md#case-study-the-intelligent-textbook-project





---

#### 5. Why is workflow documentation important for a research group?

<div class="upper-alpha" markdown>
1. It turns a personal practice into one the group can run and review
2. It replaces the need for agent teams
3. It ensures the model is always correct
4. It eliminates the need for version control
</div>

??? question "Show Answer"
    The correct answer is **A**. A written workflow with stages, inputs, outputs, checks, and tool versions lets others reproduce and review the work. It does not replace teams, guarantee correctness, or remove the need for version control.

    **Concept Tested:** Workflow Documentation

    **See:** ./index.md#documenting-designing-and-sharing





---

#### 6. A capstone project requires an honest account of where human judgment changed the outcome. What should this account include?

<div class="upper-alpha" markdown>
1. Only the final accepted outputs
2. At least one agent output that was rejected and why
3. A list of all agents used
4. The exact prompts given to every agent
</div>

??? question "Show Answer"
    The correct answer is **B**. The capstone explicitly asks for an honest account, including at least one rejected agent output and the reason for rejection. Listing agents or prompts is not the same as documenting judgment.

    **Concept Tested:** Capstone Project

    **See:** ./index.md#the-capstone-project





---

#### 7. An adoption plan says the group will pilot one skill before scaling to a team. Why must verification checks be added before scaling to a team?

<div class="upper-alpha" markdown>
1. Because teams cannot use skills
2. Because skills do not need checks when used alone
3. Because a team multiplies output, so checks must already exist
4. Because checks are only needed for teams
</div>

??? question "Show Answer"
    The correct answer is **C**. A team of agents produces more output faster, so unreviewed errors would multiply. Checks are developed on the pilot and must be in place before scaling. Skills always need checks, and teams are not the only place for them.

    **Concept Tested:** Adoption Plan

    **See:** ./index.md#adopting-these-practices





---

#### 8. A researcher records a failure case after an agent's edit changed a measured value while claiming only to fix wording. What control would have caught this?

<div class="upper-alpha" markdown>
1. A stronger model
2. More frequent agent runs
3. A larger team
4. Diff review and a number check
</div>

??? question "Show Answer"
    The correct answer is **D**. The change was visible in the diff and in the numbers if they had been compared. Stronger models, more frequent runs, and larger teams do not automatically catch silent changes to values.

    **Concept Tested:** Lessons Learned

    **See:** ./index.md#lessons-learned-and-failure-cases





---

#### 9. The MicroSims paper abstract states that simulations can improve understanding by 30 to 40 percent, while the effectiveness figure is described as showing expected benefits. What should the author do?

<div class="upper-alpha" markdown>
1. Trace every number to a source and label it as measured, cited, or expected
2. Remove all numbers from the abstract
3. Treat the cited and expected figures as equivalent
4. Assume reviewers will not notice the distinction
</div>

??? question "Show Answer"
    The correct answer is **A**. A reader needs to know the provenance of each number. Measured, cited, and expected are not interchangeable, and removing numbers is not required if their sources are clear.

    **Concept Tested:** MicroSims Paper

    **See:** ./index.md#case-study-the-microsims-paper





---

#### 10. An adoption plan prioritizes writing the lab AI policy before piloting a skill. What is the main justification?

<div class="upper-alpha" markdown>
1. The policy is needed to choose the skill's user interface
2. The policy makes the skill run faster
3. The policy is required by all publishers
4. A pilot touches real data, so data classes and permitted tools must be decided first
</div>

??? question "Show Answer"
    The correct answer is **D**. The policy defines data classes, disclosure rules, and permitted tools before any real data are handed to an agent. Interface design, speed, and publisher requirements are not the reason policy comes first.

    **Concept Tested:** Adoption Plan

    **See:** ./index.md#adopting-these-practices
