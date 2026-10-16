# Quiz: Designing, Testing, and Sharing Agent Skills

Test your understanding of skill scope, progressive disclosure, testing, failure modes, versioning, sharing, and composition.

---

#### 1. What is a single-purpose skill?

<div class="upper-alpha" markdown>
1. A skill that never needs supporting files
2. A skill that can only be used by one researcher
3. A skill that contains exactly one line of instructions
4. A skill whose scope is one task with one kind of output
</div>

??? question "Show Answer"
    The correct answer is **D**. A single-purpose skill covers one task with one input-to-output mapping and one set of acceptance criteria. This makes its description precise, its instructions short, and its failures easy to localize. It can still be used by many people and can include supporting files.

    **Concept Tested:** Single Purpose Skill

    **See:** [Scoping a Skill](./index.md#scoping-a-skill)





---

#### 2. What is the main purpose of progressive disclosure in a skill?

<div class="upper-alpha" markdown>
1. To load only the layers of content the current task needs
2. To hide the skill's purpose from the user
3. To prevent the skill from ever being triggered
4. To make every supporting file load on every invocation
</div>

??? question "Show Answer"
    The correct answer is **A**. Progressive disclosure keeps the description in context always, loads SKILL.md instructions only when the skill triggers, and opens supporting files only when an instruction points to them. This saves tokens and keeps the agent focused.

    **Concept Tested:** Progressive Disclosure

    **See:** [Writing the Skill](./index.md#writing-the-skill-progressive-disclosure-and-reference-documents)





---

#### 3. A skill description says: "Check a SPICE netlist for floating nodes, a missing .end card, and unit suffix errors. Use when the user asks to lint, check, or validate a .sp or .cir netlist file." Which request should NOT trigger the skill?

<div class="upper-alpha" markdown>
1. "Lint circuits/ldo.sp for floating nodes."
2. "Validate that every .sp file under circuits/ ends with a .end card."
3. "My 1M resistor behaves like one milliohm. Check the units in ldo.sp."
4. "Run the transient simulation of ldo.sp and plot Vout."
</div>

??? question "Show Answer"
    The correct answer is **D**. The request asks for simulation and plotting, not for linting or validating a netlist. The other three requests explicitly ask for checking or validation of netlist properties the description names.

    **Concept Tested:** Skill Triggering

    **See:** [Testing and Evaluating a Skill](./index.md#testing-and-evaluating-a-skill)





---

#### 4. A skill needs tests for two distinct ways it can fail. What are the two kinds of tests?

<div class="upper-alpha" markdown>
1. Trigger tests and behavior tests
2. Black-box tests and white-box tests
3. Unit tests and integration tests
4. Load tests and stress tests
</div>

??? question "Show Answer"
    The correct answer is **A**. Trigger tests check whether the description causes the skill to load on the right requests and stay quiet on the wrong ones. Behavior tests check the quality of the output against acceptance criteria. Unit, integration, and load tests are software-testing concepts, not the skill-testing pair the chapter emphasizes.

    **Concept Tested:** Skill Testing

    **See:** [Testing and Evaluating a Skill](./index.md#testing-and-evaluating-a-skill)





---

#### 5. What does skill evaluation measure that a single test run cannot?

<div class="upper-alpha" markdown>
1. The pass rate over repeated runs, compared across versions or against no skill
2. The number of tokens the skill consumes
3. Whether the skill installs correctly on your own machine
4. The exact model weights used by the agent
</div>

??? question "Show Answer"
    The correct answer is **A**. Skill evaluation runs each test multiple times and records pass rates, because model output varies. A single success is weak evidence; a reliable improvement from 40% to 90% pass rate is strong evidence. Token count, local installation, and weights are not what evaluation measures.

    **Concept Tested:** Skill Evaluation

    **See:** [Testing and Evaluating a Skill](./index.md#testing-and-evaluating-a-skill)





---

#### 6. A skill loads, but the agent skips step 4 and reports success. Which failure mode is most likely?

<div class="upper-alpha" markdown>
1. Undertriggering
2. Overtriggering
3. Instruction drift
4. Missing dependency
</div>

??? question "Show Answer"
    The correct answer is **C**. Instruction drift means the skill loaded but the agent skipped or reordered steps, usually because SKILL.md is too long or a step is not checkable. Undertriggering is not loading when it should, overtriggering is loading when it should not, and a missing dependency would cause a tool error.

    **Concept Tested:** Skill Failure Modes

    **See:** [Failure Modes and Maintenance](./index.md#failure-modes-and-maintenance)





---

#### 7. What is the simplest reliable way to share a skill with a colleague?

<div class="upper-alpha" markdown>
1. Paste the SKILL.md contents into an email
2. Put the skill directory in a Git repository the colleague can clone
3. Take a screenshot of the skill directory and send it
4. Memorize the skill and recite it in a meeting
</div>

??? question "Show Answer"
    The correct answer is **B**. Because a skill is a directory of text files, it fits naturally in version control. A Git repository carries the files, history, and dependencies. Email and screenshots lose structure and version information, and oral transfer is unreliable.

    **Concept Tested:** Skill Sharing

    **See:** [Versioning, Sharing, and Installing](./index.md#versioning-sharing-and-installing)





---

#### 8. What is a slash command?

<div class="upper-alpha" markdown>
1. A command to delete a skill from the agent
2. A Git command for branching a skill repository
3. An explicit way to invoke a skill by typing `/skill-name`
4. A way to combine two skills automatically
</div>

??? question "Show Answer"
    The correct answer is **C**. A slash command lets the user invoke a skill directly instead of relying on the agent's description-based trigger decision. It is useful for action skills, manual timing, and while tuning a description. It does not delete, branch, or compose skills.

    **Concept Tested:** Slash Command

    **See:** [Versioning, Sharing, and Installing](./index.md#versioning-sharing-and-installing)





---

#### 9. Why is a pipeline of single-purpose skills easier to debug than one large skill that does the same work?

<div class="upper-alpha" markdown>
1. It always uses fewer tokens.
2. A failure is localized to the step whose acceptance check fails.
3. It does not need acceptance criteria.
4. It prevents the agent from ever making mistakes.
</div>

??? question "Show Answer"
    The correct answer is **B**. Composition creates checkpoints between skills, each with its own acceptance check, so the first failing step identifies the problem. Token savings may occur but are not guaranteed, criteria are still required, and mistakes are not eliminated.

    **Concept Tested:** Skill Composition

    **See:** [Composing Skills and Studying Examples](./index.md#composing-skills-and-studying-examples)





---

#### 10. Some packaging tools reject unknown top-level keys in SKILL.md frontmatter. Where should custom fields such as `last_verified` and `tested_with` go?

<div class="upper-alpha" markdown>
1. In the body of SKILL.md as plain text
2. Under a `metadata` map in the YAML frontmatter
3. In a separate JSON file outside the skill directory
4. As comments inside the supporting files
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter recommends placing version, author, license, last verified date, and test environment under a `metadata` map inside the YAML frontmatter. This keeps the metadata machine-readable without adding unknown top-level keys that strict validators reject.

    **Concept Tested:** Skill Metadata

    **See:** [Versioning, Sharing, and Installing](./index.md#versioning-sharing-and-installing)
