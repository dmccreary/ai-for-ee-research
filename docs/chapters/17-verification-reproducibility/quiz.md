# Quiz: Verification and Reproducibility

Test your understanding of verification, validation, independent checks, replication, model behaviors, audit trails, and reproducibility packages with these 10 review questions.

---


#### 1. What is the difference between verification and validation?

<div class="upper-alpha" markdown>
1. Verification asks whether the work was done right; validation asks whether the right thing was done
2. Verification checks the literature; validation checks the code
3. Verification is done by humans; validation is done by agents
4. Verification is faster than validation
</div>

??? question "Show Answer"
    The correct answer is **A**. Verification checks that the implementation matches the specification, while validation checks that the specification and result match reality. Both can fail independently, and neither is inherently faster or tied to a particular actor.

    **Concept Tested:** Verification

    **See:** ./index.md#verification-and-validation





---


#### 2. What is the term for going to the original document or source to confirm a claim?

<div class="upper-alpha" markdown>
1. Cross-model check
2. Replication
3. Known-answer test
4. Primary source check
</div>

??? question "Show Answer"
    The correct answer is **D**. A primary source check reads the paper, datasheet, or standard itself rather than a summary or recollection. Cross-model checks compare models, replication reruns the work, and known-answer tests validate code against predetermined inputs.

    **Concept Tested:** Primary Source Check

    **See:** ./index.md#kinds-of-checks





---


#### 3. Why is agreement between two models in a cross-model check considered weak evidence?

<div class="upper-alpha" markdown>
1. Because models are always wrong
2. Because models share training data and blind spots
3. Because different models cannot answer the same question
4. Because agreement is accidental
</div>

??? question "Show Answer"
    The correct answer is **B**. Models often share data and biases, so agreement does not guarantee correctness. However, disagreement is a useful flag that something deserves closer inspection. Cross-model checks are best used to decide what to examine, not what is true.

    **Concept Tested:** Cross Model Check

    **See:** ./index.md#kinds-of-checks





---


#### 4. What is the main purpose of writing acceptance criteria before running an experiment?

<div class="upper-alpha" markdown>
1. To make the experiment run faster
2. To allow the agent to choose the method
3. To prevent adjusting the interpretation after seeing the result
4. To eliminate the need for replication
</div>

??? question "Show Answer"
    The correct answer is **C**. A criterion written before the result is visible cannot be tuned to fit the outcome. It does not affect runtime, transfer method choice to the agent, or remove the value of replication.

    **Concept Tested:** Test Driven Research

    **See:** ./index.md#working-test-first-and-replicating





---


#### 5. Why is asking the same agent in the same session to confirm its own output a poor verification practice?

<div class="upper-alpha" markdown>
1. The agent shares the original error and context, so the confirmation carries little information
2. Agents cannot review their own output
3. The agent will always refuse
4. The output is too long to re-read
</div>

??? question "Show Answer"
    The correct answer is **A**. The same session shares the context that produced the original output, including any mistakes. An independent check requires changing something that matters: the method, model, session, or person.

    **Concept Tested:** Independent Check

    **See:** ./index.md#kinds-of-checks





---


#### 6. A model's summary says Paper P reports a specific ENOB value. Which verification method is most appropriate?

<div class="upper-alpha" markdown>
1. Known-answer test
2. Primary source check
3. Replication
4. Independent method
</div>

??? question "Show Answer"
    The correct answer is **B**. Since the claim is about what a paper says, only the paper itself can settle it. Known-answer tests check code, replication reruns work, and independent methods compute the same quantity differently.

    **Concept Tested:** Primary Source Check

    **See:** ./index.md#kinds-of-checks





---


#### 7. A script reports an ENOB using an FFT-based method, and the researcher wants another estimate that does not share the FFT's assumptions. Which check is best?

<div class="upper-alpha" markdown>
1. Cross-model check
2. Primary source check
3. Independent method
4. Audit trail review
</div>

??? question "Show Answer"
    The correct answer is **C**. An independent method, such as a sine fit, computes the same quantity by a different route and can catch method-specific errors. A cross-model check would use another model, and a primary source check verifies literature claims.

    **Concept Tested:** Independent Check

    **See:** ./index.md#kinds-of-checks





---


#### 8. A colleague wants to reuse your figure and confirm it regenerates from raw data on a clean machine. Which term describes this activity?

<div class="upper-alpha" markdown>
1. Primary source check
2. Cross-model check
3. Acceptance review
4. Replication
</div>

??? question "Show Answer"
    The correct answer is **D**. Regenerating a result from the raw data and code on a new machine is computational replication. Primary source and cross-model checks verify different things, and acceptance review is a formal decision that criteria are met.

    **Concept Tested:** Result Replication

    **See:** ./index.md#working-test-first-and-replicating





---


#### 9. A model first gives an evidenced answer and then reverses it after the researcher expresses a different opinion, with no new evidence provided. What behavior is this?

<div class="upper-alpha" markdown>
1. Sycophancy
2. Overconfidence
3. Output bias
4. Uncertainty awareness
</div>

??? question "Show Answer"
    The correct answer is **A**. Sycophancy is agreeing with or reversing to match the user's view without new evidence. Overconfidence states conclusions too strongly, output bias is a systematic tilt in what is produced, and uncertainty awareness would acknowledge limits.

    **Concept Tested:** Sycophancy

    **See:** ./index.md#behaviors-of-models-that-undermine-checks





---


#### 10. A wrong value is found in a published result. The researcher traces it upstream through run manifests to find the first step that produced it and then recomputes every affected downstream result. What is this process called?

<div class="upper-alpha" markdown>
1. Validation
2. Peer verification
3. Cross-model check
4. Error tracing
</div>

??? question "Show Answer"
    The correct answer is **D**. Error tracing follows a value upstream to its source and then downstream to all results that depended on it so they can be recomputed. Validation asks whether the right question was asked, peer verification has a colleague rerun the work, and cross-model checks compare model outputs.

    **Concept Tested:** Error Tracing

    **See:** ./index.md#records-that-let-others-check


