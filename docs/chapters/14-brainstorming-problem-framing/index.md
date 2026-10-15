---
title: "Brainstorming and Problem Framing"
description: "Using AI as a thinking partner without surrendering judgment: framing a problem, generating ideas, analogical thinking, devil's advocate prompts, hypothesis development, experiment design, feasibility, ranking, and novelty checks, leading to a research roadmap."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 11:10:03"
version: 1.11
---

# Brainstorming and Problem Framing

## Summary

This chapter shows how to use AI as a thinking partner without surrendering judgment: framing a problem, generating and ranking ideas, developing hypotheses, designing experiments, and checking novelty. It includes techniques such as devil's advocate prompts and analogical thinking. After this chapter you can move from a vague topic to a feasible research roadmap.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Problem Framing | 7 |
| Idea Generation | 11 |
| Hypothesis Development | 6 |
| Devils Advocate Prompt | 1 |
| Analogical Thinking | 1 |
| Experiment Design | 3 |
| Feasibility Assessment | 2 |
| Research Roadmap | 1 |
| Idea Ranking | 1 |
| Novelty Check | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 3: Choosing Models and Writing Clear Prompts](../03-models-and-prompt-basics/index.md)
- [Chapter 4: Context Engineering and Advanced Prompting](../04-context-engineering-prompting/index.md)
- [Chapter 10: Orchestrating Teams of Planning and Execution Agents](../10-orchestrating-agent-teams/index.md)
- [Chapter 11: AI-Assisted Literature Search and Synthesis](../11-literature-search-synthesis/index.md)

!!! mascot-welcome "A Partner That Never Tires of Your Bad Ideas"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A model will produce forty ideas in a minute and never get bored of your thirty-ninth revision. What it cannot do is decide which idea is worth two years of your life. This chapter is about using its volume and keeping the choice. Trust, but verify!

## Framing the Problem

**Problem framing** is the work of turning a topic into a question that can be investigated: deciding what the problem is, which quantity matters, under what constraints, and what would count as progress. It happens before any solution is sought, and it is where most of a project's leverage lies. A well-framed problem makes an average method look good, and a badly framed one defeats an excellent method.

A vague topic such as "low-power ADCs for sensor nodes" can be framed in many ways, and each framing implies different work. An assistant is useful here because it can produce framings quickly. Ask it for five distinct framings, and for each, the quantity to optimize, the constraint that binds, and what would have to be true for it to be worth doing. Then apply the question tests of Chapter 1: is each specific, measurable, bounded, and falsifiable?

| Framing | Quantity | Binding constraint | What it would take |
|---|---|---|---|
| Minimize energy per conversion | fJ per conversion step | Fixed ENOB of 9.5 bits | A new comparator or DAC scheme |
| Maximize ENOB at fixed power | bits | 50 µW budget | Better calibration |
| Minimize area | mm² | Fixed ENOB and energy | Denser capacitor array |
| Tolerate process variation | yield, percent | Fixed spec across corners | Robust or self-calibrating design |
| Operate from a harvested supply | functioning voltage range | Supply from 0.6 V to 1.0 V | Wide-range design |

*Table 1. Five framings of one topic. Each implies a different project. Values are illustrative.*

!!! mascot-tip "Reframe by Changing One Thing"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    To get past a stuck framing, ask the model to restate your problem four times, changing exactly one element each time: the metric, the constraint, the scale, or the stakeholder. A change of one thing at a time shows you which element the problem is really about.

## Generating and Challenging Ideas

**Idea generation** is the production of candidate approaches to a framed problem. It has two phases that are best kept apart. The divergent phase aims at quantity and range, with no judgment. The convergent phase evaluates and selects. Mixing them kills both: judging ideas while generating them stops the supply, and generating while judging blurs the criteria.

A language model is well suited to the divergent phase. It has absorbed a very wide literature, and it produces variations without social cost. Two prompting habits raise the quality of what it produces. Ask for ideas that differ along named axes, so that the list spans the space and does not cluster. And ask for the ideas in a table with a column for the key assumption, so that you can see what each one depends on. An example prompt, in the structure of Chapter 3:

```text
Problem: reduce the energy per conversion of a 10-bit SAR ADC at fixed ENOB of 9.5 bits in 65 nm CMOS.
Task: propose 10 distinct approaches. Each must differ from the others in at least one of:
architecture, calibration method, circuit technique, or algorithm.
Output: a table with columns: idea (one line), mechanism (one sentence),
key assumption, what would make it fail.
Constraint: do not repeat the same mechanism in different words.
```

**Analogical thinking** is borrowing structure from another field. The question is: what other field has solved a problem with the same shape? Sparse sampling from compressive sensing, error-correcting codes from communications, and adaptive filtering from control are examples of ideas that moved into circuit design that way. An assistant can list candidate analogies from fields you do not know, and that is a real advantage, since it has read in more areas than you have. The mapping must then be checked: an analogy carries over a structure only if the constraints correspond, and a plausible-sounding analogy with a broken mapping is a common source of ideas that fail on contact with physics.

A **devil's advocate prompt** is a request that the model argue against an idea: list the strongest reasons it will fail, the assumptions it depends on, and the result that would show it to be wrong. Models tend to agree with the person they are talking to, so a neutral request such as "what do you think of this idea?" returns encouragement. An explicit request for specific objections returns something useful. Ask for objections ranked by severity, and for the cheapest experiment that would test the most serious one.

!!! mascot-warning "The Model Likes Your Idea"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is reading the model's enthusiasm as evidence that an idea is good. It happens because the model is inclined to agree with you and to elaborate. Always run the idea past an explicit devil's advocate prompt, and treat a response with no specific objections as a sign that the prompt, and not the idea, was weak.

## From Idea to Hypothesis and Experiment

**Hypothesis development** turns an idea into a statement that an experiment could show to be wrong. A research hypothesis has a form that makes this explicit: under stated conditions, a stated change produces a stated effect of at least a stated size. "Foreground calibration of the comparator offset raises the ENOB of the 10-bit SAR ADC from 8.6 to at least 9.5 bits at 1 MS/s and 1.0 V, in 65 nm CMOS" is a hypothesis. "Calibration makes the ADC better" is not, because no result could contradict it.

#### Diagram: Falsifiable Hypothesis Sorter

<details markdown="1">
<summary>Falsifiable Hypothesis Sorter</summary>
Type: microsim
**sim-id:** falsifiable-hypothesis-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** distinguish<br/>
**Learning Objective:** The learner will distinguish falsifiable hypotheses from statements that no experiment could contradict, among eight statements, with at least 7 of 8 classified correctly.

**Prerequisites:** hypothesis, falsifiable, metric, and condition, all defined in the section "From Idea to Hypothesis and Experiment" above and in Chapter 1.

**Evidence of Mastery:** For each of eight statements the learner commits "falsifiable" or "not falsifiable". A classification is correct when it equals the answer in Content. Mastery is at least 7 of 8 correct on the first attempt. Reading the checklist of properties is exploration and is not evidence.

**Misconceptions:** (1) A statement with a number in it is falsifiable. (2) A confident, technical-sounding statement is a hypothesis. (3) A statement that cannot fail is the strongest claim.

**Instructional Rationale:** Analyze-level work needs the learner to decompose a statement into its parts, metric, condition, and threshold, and to see which part is missing. Non-falsifiable items fail in different ways so that no single cue is enough.

**Content:**

All statements are invented for illustration and labeled "illustrative".

| # | Statement | Correct classification | Why (shown as feedback) |
|---|---|---|---|
| 1 | A 10-bit SAR ADC with foreground offset calibration reaches an ENOB of at least 9.5 bits at 1 MS/s in 65 nm CMOS while drawing under 50 µW. | Falsifiable | It names a metric, a threshold, and the conditions, and a measurement could contradict it. |
| 2 | Calibration makes the ADC better. | Not falsifiable | It has no metric and no threshold, so no result can contradict it. |
| 3 | The ADC will perform well under suitable conditions. | Not falsifiable | The conditions are unspecified, so any failure can be blamed on unsuitable conditions. |
| 4 | Either the offset improves or it does not. | Not falsifiable | It is true whatever happens, so it says nothing about the circuit. |
| 5 | Adding a 4-bit redundant capacitor array reduces the standard deviation of DNL by at least 30 percent relative to the baseline layout in a 200-run Monte Carlo simulation. | Falsifiable | It names the change, the size of the effect, the baseline, and the test. |
| 6 | Machine learning will eventually make analog design obsolete. | Not falsifiable | It has no time bound and no measurable criterion, so no observation could contradict it. |
| 7 | A surrogate model trained on 5,000 simulated samples predicts the op-amp gain within 1 dB on held-out designs. | Falsifiable | It names the training size, the tolerance, and a held-out test. |
| 8 | Any result that disagrees with the theory was caused by measurement error. | Not falsifiable | It explains away every disagreement in advance, so no result can count against the theory. |

**Provenance:** The form of a hypothesis is from the section "From Idea to Hypothesis and Experiment" of this chapter. The statements are invented for illustration.

**Rules:** A statement is falsifiable when it names a measurable quantity, a threshold or direction and size of effect, and conditions under which it is tested, so that some possible observation would contradict it. A statement missing any of these, or that is true under every outcome, is not falsifiable.

**Learner Activity:**

1. The learner reads statement 1.
2. The learner chooses "falsifiable" or "not falsifiable" and submits.
3. The sim shows whether it was correct and the "Why" sentence, with the missing element named for a not-falsifiable statement.
4. After statement 8, the sim shows the count correct.

**Feedback:** Eight statements, one attempt each, in a fixed order. Correct: "Correct." plus the "Why" sentence. Incorrect: "This statement is <classification>." plus the "Why" sentence. The correct classification is always revealed after the single attempt. A final score "n of 8 correct" is shown with whether the mastery threshold of 7 was met.

**Starting State:** Statement 1 is shown with two choices. The question on screen is "Could any measurement show this to be wrong?"

**Chapter Anchors:** The chapter states that a hypothesis names a stated change, a stated effect size, and stated conditions, and gives "calibration makes the ADC better" as an example of a statement that is not falsifiable.
</details>

**Experiment design** is the planning of the measurements or simulations that will test a hypothesis, and it is where a hypothesis becomes work. An experiment needs a defined *independent variable* that you change, a *dependent variable* that you measure, the *controlled* variables that you hold fixed, a *baseline* against which the effect is compared, enough repetitions to separate the effect from noise, and, decided before the data are seen, the *criterion* that will count as support or refutation. Writing the criterion in advance is the protection against fitting the interpretation to the result. An agent can draft a protocol quickly. Your contribution is the domain knowledge it lacks: confounds such as temperature drift, the corner cases that matter, and the limits of the instrument.

## Judging Feasibility, Ranking, and Novelty

**Feasibility assessment** estimates whether an idea can be carried through with the time, tools, skills, and data you have. A quick feasibility estimate uses a back-of-envelope calculation and a short list of requirements: is the process available, does the needed tool license exist, how long does fabrication or a measurement take, and does the result need data you do not have? Ask an agent to enumerate what the idea requires and to mark each requirement as in hand, obtainable, or missing, then check the list yourself for what only you know about your lab.

**Idea ranking** is ordering candidate ideas by weighted criteria. The usual criteria are impact, feasibility, novelty, and risk. The rank depends on the weights, and so the weights are the real decision. A student whose thesis rests on a novel contribution and a researcher with a deadline in three months should weight the same four scores differently and will pick different projects from the same list. Make the scoring explicit in a table, let an agent propose scores, correct them, and then vary the weights to see whether the ranking is stable.

The second MicroSim practices this on a small set of ideas. The weighted score of an idea is \( S = \sum_i w_i s_i \), where \( s_i \) is its score on criterion \( i \) from 1 to 5 and \( w_i \) is the weight, with the weights summing to 1.

#### Diagram: Research Idea Ranking Matrix

<details markdown="1">
<summary>Research Idea Ranking Matrix</summary>
Type: microsim
**sim-id:** research-idea-ranking-matrix<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the weighted score of research ideas under two weighting profiles and state which idea ranks first under each, with all five answers correct.

**Prerequisites:** idea ranking, weighted score, impact, feasibility, novelty, and risk, all defined in the section "Judging Feasibility, Ranking, and Novelty" above.

**Evidence of Mastery:** For each of five questions the learner enters a number or chooses an answer. A number is correct when it is within 0.05 of the value in Content, and a choice is correct when it equals the answer in Content. Mastery is 5 of 5 correct. Changing the weights in exploration mode is not evidence.

**Misconceptions:** (1) The best idea is the best under every weighting. (2) A high score on one criterion makes an idea rank first. (3) The weights are a technicality and not part of the decision.

**Instructional Rationale:** Apply-level work needs the learner to carry out the weighted-sum calculation and then see the ranking change with the weights, which makes the weighting the visible decision.

**Content:**

Scores from 1 to 5, where 5 is best. "Low risk" is scored so that a higher number means lower risk. The ideas and scores are invented for illustration and labeled "illustrative".

| Idea | Impact | Feasibility | Novelty | Low risk |
|---|---|---|---|---|
| I1: Foreground calibration of comparator offset | 3 | 5 | 2 | 5 |
| I2: Learned redundancy to reduce mismatch | 4 | 2 | 5 | 2 |
| I3: New capacitor array layout | 3 | 4 | 3 | 4 |
| I4: Time-interleaved SAR with background calibration | 5 | 2 | 4 | 2 |

Weighting profiles, each summing to 1.0:

| Profile | Impact | Feasibility | Novelty | Low risk |
|---|---|---|---|---|
| P1: Exploratory thesis | 0.3 | 0.1 | 0.4 | 0.2 |
| P2: Deadline in three months | 0.2 | 0.5 | 0.1 | 0.2 |

Reference scores:

| Idea | P1 score | P2 score |
|---|---|---|
| I1 | 3.2 | 4.3 |
| I2 | 3.8 | 2.7 |
| I3 | 3.3 | 3.7 |
| I4 | 3.7 | 2.8 |

Questions, in this order:

| # | Question | Answer | Why (shown as feedback) |
|---|---|---|---|
| 1 | What is the weighted score of I4 under P1? | 3.7 | 5 x 0.3 + 2 x 0.1 + 4 x 0.4 + 2 x 0.2 = 1.5 + 0.2 + 1.6 + 0.4 = 3.7. |
| 2 | What is the weighted score of I1 under P2? | 4.3 | 3 x 0.2 + 5 x 0.5 + 2 x 0.1 + 5 x 0.2 = 0.6 + 2.5 + 0.2 + 1.0 = 4.3. |
| 3 | Which idea ranks first under P1? | I2 | Its score of 3.8 is the highest under P1. |
| 4 | Which idea ranks first under P2? | I1 | Its score of 4.3 is the highest under P2. |
| 5 | Is there an idea that ranks first under both profiles? | No | I2 leads under P1 and I1 leads under P2, so the weights decide the choice. |

**Provenance:** The weighted-sum formula is from the section "Judging Feasibility, Ranking, and Novelty" of this chapter. All scores and weights are invented for illustration.

**Rules:** Score S = sum over criteria of weight x score. Scores are displayed to one decimal place. Weights in exploration mode must sum to 1.0 in steps of 0.05, with a minimum of 0.0 and a maximum of 1.0. Ties are reported as tied.

**Learner Activity:**

1. The learner sees the score matrix and the two weighting profiles, and question 1.
2. The learner enters the number or chooses the answer and submits.
3. The sim shows the worked calculation and the full ranking under both profiles.
4. After question 5, exploration opens: the learner sets their own weights and watches the ranking change. The learner should notice that the ranking can be reversed by moving a small amount of weight.

**Feedback:** Five questions, two attempts each for the numeric answers and one for the choices, in a fixed order. Correct: "Correct." plus the worked calculation. Incorrect on the first numeric attempt: "Multiply each score by its weight and add the four products." Incorrect on the second attempt, or on a choice: the worked calculation and the correct answer. A running count "n of 5 correct" is shown.

**Starting State:** The score matrix and profile P1 are shown with question 1. The question on screen is "Which idea wins when novelty matters most?"

**Chapter Anchors:** The chapter states that ranking depends on the weights, that a thesis with a novelty emphasis and a deadline-driven project weight the same scores differently, and that the weighted score is the sum of weight times score.
</details>

**Novelty check** is the verification that an idea has not already been done. It is a point where a model is unreliable in a particular way: a model's statement that an idea is novel is not evidence, because it reflects what the model does not remember, not what the literature contains. Run the search pipeline of Chapter 11 on the core of your idea, with several phrasings, and in more than one database. Record the five closest prior works, and for each write in one sentence what you would do differently. A novelty claim that rests on that table is a claim you can defend to a reviewer.

## The Research Roadmap

A **research roadmap** is the plan that connects the framed problem to a sequence of work: the hypotheses to be tested, the experiments that test them, the order, the dependencies, and, importantly, the decision points. At each decision point the roadmap states what result would lead to continuing, to changing direction, or to stopping. A roadmap with explicit go and no-go criteria is the research version of the acceptance criteria of Chapter 4, and it protects against the common failure of continuing a line of work because of the effort already spent.

| Stage | Question | Output | Go criterion | If not |
|---|---|---|---|---|
| 1. Feasibility | Can the offset be measured to 0.1 mV? | Measurement note | Repeatability within 0.1 mV on 10 devices | Change the instrument or the method |
| 2. Prototype | Does calibration raise ENOB on one device? | Simulated and measured ENOB | At least 9.0 bits on 5 of 5 devices | Revisit the calibration algorithm |
| 3. Characterization | Does it hold across corners and 40 devices? | Result table with spread | At least 9.5 bits at typical and no worse than 9.0 at corners | Narrow the claim to what holds |
| 4. Write up | What is the contribution relative to prior work? | Draft paper | Novelty table complete and verified | Reframe the contribution |

*Table 2. A roadmap fragment with go criteria. The numbers are illustrative.*

An agent can draft a roadmap from the hypothesis and the feasibility list. Treat the draft as a plan to review (Chapter 10), and add the thing agents cannot supply: your knowledge of how long measurements and fabrication really take in your lab.

## Summary and Key Takeaways

An agent's strength in this phase of research is volume and range, and its weakness is agreement. The techniques of the chapter use the first and guard against the second, while leaving the choices that matter with you.

The main points to carry forward:

- **Problem framing** precedes solutions, and a framing is a choice of quantity, constraint, and scale. Ask for several and test each against the question criteria.
- **Idea generation** separates divergent and convergent phases, and a table with assumptions and failure conditions makes ideas comparable.
- **Analogical thinking** extends your reach, and the mapping must be checked. A **devil's advocate prompt** counters the model's tendency to agree.
- **A hypothesis** states a change, an effect size, and conditions, and so it can be wrong.
- **Experiment design** fixes the variables, the baseline, and the support criterion before the data are seen.
- **Feasibility assessment, idea ranking, and novelty checks** make the selection explicit. The weights are the decision, and a novelty claim rests on a search.
- **A research roadmap** has decision points with go criteria.

!!! mascot-celebration "From Topic to Roadmap"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now frame a topic as several testable questions, tell a falsifiable hypothesis from one no result could contradict, compute how the ranking of ideas changes with your priorities, and lay out a roadmap with go criteria. The choices stay yours, and the volume is the agent's.

The next chapter takes a result that has survived this process and follows it into a manuscript. Round up your strongest hypothesis, and bring it.
