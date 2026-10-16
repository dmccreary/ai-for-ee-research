# Quiz: Brainstorming and Problem Framing

Test your understanding of problem framing, idea generation, hypotheses, experiment design, feasibility, ranking, novelty, and research roadmaps with these 10 review questions.

---

#### 1. What is the term for borrowing structure from another field to solve a problem in your own field?

<div class="upper-alpha" markdown>
1. Analogical thinking
2. Devil's advocate prompt
3. Problem framing
4. Feasibility assessment
</div>

??? question "Show Answer"
    The correct answer is **A**. Analogical thinking looks for problems in other fields that have the same shape and asks whether their solution can be mapped over. The mapping must still be checked, because the constraints may differ.

    **Concept Tested:** Analogical Thinking

    **See:** ./index.md#generating-and-challenging-ideas





---

#### 2. What is the term for the plan that connects a framed problem to a sequence of hypotheses, experiments, and decision points?

<div class="upper-alpha" markdown>
1. Search strategy
2. Comparison table
3. Handoff protocol
4. Research roadmap
</div>

??? question "Show Answer"
    The correct answer is **D**. A research roadmap lays out the stages, the questions they answer, their outputs, and the go/no-go criteria at each decision point. A search strategy finds literature, and a handoff protocol passes work between agents.

    **Concept Tested:** Research Roadmap

    **See:** ./index.md#the-research-roadmap





---

#### 3. Why should idea generation and idea evaluation be kept as separate phases?

<div class="upper-alpha" markdown>
1. Because agents cannot evaluate ideas
2. Because judging while generating stops the supply of ideas and generating while judging blurs the criteria
3. Because evaluation requires more compute than generation
4. Because only humans can generate ideas
</div>

??? question "Show Answer"
    The correct answer is **B**. Mixing divergent and convergent thinking harms both: judgment cuts off quantity during generation, and generation during evaluation distorts the selection. Agents can do both, but the phases should be separated.

    **Concept Tested:** Idea Generation

    **See:** ./index.md#generating-and-challenging-ideas





---

#### 4. What is the purpose of a devil's advocate prompt?

<div class="upper-alpha" markdown>
1. To praise an idea and list its strengths
2. To generate more ideas similar to the current one
3. To force the model to list the strongest objections and assumptions
4. To rewrite the problem framing
</div>

??? question "Show Answer"
    The correct answer is **C**. A devil's advocate prompt counters the model's tendency to agree and asks for specific reasons an idea could fail, the assumptions it depends on, and the cheapest experiment to test the most serious objection.

    **Concept Tested:** Devils Advocate Prompt

    **See:** ./index.md#generating-and-challenging-ideas





---

#### 5. Why is it important to write the support or refutation criterion before seeing the data in an experiment?

<div class="upper-alpha" markdown>
1. It protects against fitting the interpretation to the result
2. It guarantees the experiment will succeed
3. It reduces the number of variables to control
4. It eliminates the need for a baseline
</div>

??? question "Show Answer"
    The correct answer is **A**. Deciding the criterion in advance prevents post-hoc reasoning that makes any result look like support. It does not guarantee success, reduce controlled variables, or remove the need for a baseline.

    **Concept Tested:** Experiment Design

    **See:** ./index.md#from-idea-to-hypothesis-and-experiment





---

#### 6. A hypothesis states that a new calibration raises ENOB from 8.6 to at least 9.5 bits at 1 MS/s in 65 nm CMOS. What makes this hypothesis falsifiable?

<div class="upper-alpha" markdown>
1. It mentions a new technique
2. It names a metric, an effect size, and conditions
3. It predicts improvement
4. It is about a specific ADC architecture
</div>

??? question "Show Answer"
    The correct answer is **B**. A falsifiable hypothesis specifies a measurable quantity, the size of the expected effect, and the conditions under which it is tested. Mentioning a technique, predicting improvement, or naming an architecture alone does not make a statement testable.

    **Concept Tested:** Hypothesis Development

    **See:** ./index.md#from-idea-to-hypothesis-and-experiment





---

#### 7. A researcher ranks four ideas by impact, feasibility, novelty, and risk. Under an "exploratory thesis" profile novelty gets the highest weight, while under a "deadline in three months" profile feasibility gets the highest weight. What does this illustrate?

<div class="upper-alpha" markdown>
1. The best idea is always the most novel
2. The ranking of ideas depends on the weighting of criteria
3. Impact is the least important criterion
4. Risk should always be weighted equally with novelty
</div>

??? question "Show Answer"
    The correct answer is **B**. The weighted score of an idea depends on the weights, so different priorities produce different rankings. There is no universal ranking; the weights encode the researcher's situation.

    **Concept Tested:** Idea Ranking

    **See:** ./index.md#judging-feasibility-ranking-and-novelty





---

#### 8. A model claims an idea is novel. What is the most reliable next step?

<div class="upper-alpha" markdown>
1. Accept the claim because the model has read widely
2. Ask the model to restate the claim more confidently
3. Run the search pipeline from Chapter 11 and record the closest prior works
4. Proceed with the idea without further checking
</div>

??? question "Show Answer"
    The correct answer is **C**. A model's claim of novelty reflects what it does not remember, not what the literature contains. A defensible novelty claim rests on a search that records the closest prior works and states what would be done differently.

    **Concept Tested:** Novelty Check

    **See:** ./index.md#judging-feasibility-ranking-and-novelty





---

#### 9. A proposed analogical solution from compressive sensing is applied to ADC design. What must be checked before trusting the analogy?

<div class="upper-alpha" markdown>
1. Whether the constraints of the two problems correspond
2. Whether the two fields use the same citation style
3. Whether the analogy was generated by a strong model
4. Whether the source field is older than the target field
</div>

??? question "Show Answer"
    The correct answer is **A**. An analogy transfers a structure only if the constraints correspond; otherwise it may sound plausible but fail on contact with physics. Citation style, model strength, and field age are irrelevant to whether the mapping holds.

    **Concept Tested:** Analogical Thinking

    **See:** ./index.md#generating-and-challenging-ideas





---

#### 10. A roadmap states that if a prototype does not raise ENOB to at least 9.0 bits on 5 of 5 devices, the team will revisit the calibration algorithm. What function does this rule serve?

<div class="upper-alpha" markdown>
1. It guarantees the algorithm will work
2. It prevents the team from running more experiments
3. It removes the need for literature search
4. It provides a go/no-go criterion to avoid continuing due to sunk effort
</div>

??? question "Show Answer"
    The correct answer is **D**. Go/no-go criteria make the decision to continue, pivot, or stop explicit before the data arrive, protecting the team from persisting because of effort already invested. They do not guarantee success or replace literature search.

    **Concept Tested:** Research Roadmap

    **See:** ./index.md#the-research-roadmap
