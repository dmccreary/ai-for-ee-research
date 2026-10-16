# Quiz: AI-Assisted Manuscript Preparation

Test your understanding of paper structure, outlining, drafting, revision, figures, LaTeX, references, authorship, and peer review responses with these 10 review questions.

---

#### 1. What is the purpose of inserting a `[NO EVIDENCE]` marker when an agent drafts from claims?

<div class="upper-alpha" markdown>
1. It flags where the agent would have to assert something not supplied
2. It indicates the section needs more figures
3. It marks claims that should be removed from the paper
4. It shows where LaTeX compilation failed
</div>

??? question "Show Answer"
    The correct answer is **A**. The marker keeps a fluent draft from smuggling in unsupported claims. It tells the researcher exactly where evidence must be supplied before the prose can stand.

    **Concept Tested:** Drafting

    **See:** ./index.md#drafting-and-revising





---

#### 2. According to major publishers such as IEEE and ACM, can a language model be listed as an author on a research paper?

<div class="upper-alpha" markdown>
1. Yes, if it contributed to the writing
2. Yes, if the human authors approve
3. Only if its use is disclosed in the acknowledgments
4. No, because authorship requires accountability a model cannot take
</div>

??? question "Show Answer"
    The correct answer is **D**. Authorship criteria require substantial contribution, approval of the final version, and accountability for the work. A model cannot take accountability, so it is not listed as an author, and substantive AI use must be disclosed.

    **Concept Tested:** Authorship

    **See:** ./index.md#editing-consistency-and-co-authors





---

#### 3. Why should the abstract typically be written last?

<div class="upper-alpha" markdown>
1. Because it is the least important section
2. Because it must accurately reflect the finished results and numbers
3. Because agents cannot draft abstracts first
4. Because it must be submitted separately from the paper
</div>

??? question "Show Answer"
    The correct answer is **B**. The abstract compresses the whole paper, so it should be written once the results, methods, and numbers are final. Every number in the abstract must also appear in the body.

    **Concept Tested:** Abstract Writing

    **See:** ./index.md#structure-outline-and-abstract





---

#### 4. What is the main danger of asking an agent to "improve this" on an early draft?

<div class="upper-alpha" markdown>
1. The agent will change the paper structure
2. The agent will add too many references
3. The agent works on surface wording and may leave structural problems in place
4. The agent will refuse to make changes
</div>

??? question "Show Answer"
    The correct answer is **C**. Without specific instructions, an agent tends to polish sentences rather than fix the order of sections or the argument within paragraphs. Revision should move from structure to argument to sentences to surface.

    **Concept Tested:** Revision

    **See:** ./index.md#drafting-and-revising





---

#### 5. Why is it important to generate figures from scripts rather than drawing them by hand?

<div class="upper-alpha" markdown>
1. So they can be regenerated when the data change
2. Because hand-drawn figures are always less accurate
3. Because agents cannot draw figures
4. Because journals require script-generated figures
</div>

??? question "Show Answer"
    The correct answer is **A**. Script-generated figures are reproducible: when the processed data or analysis change, the figure updates automatically. Hand-drawn figures tend to go stale and cannot be reproduced.

    **Concept Tested:** Figure Preparation

    **See:** ./index.md#figures-latex-and-references





---

#### 6. A caption reads: "Figure 4. Measured ENOB versus input frequency for 12 devices at 1 MS/s, 1.0 V, and 25 °C. Markers show the mean and error bars show one standard deviation." How should this caption be judged?

<div class="upper-alpha" markdown>
1. Vague
2. No defect
3. Missing conditions
4. Overclaims
</div>

??? question "Show Answer"
    The correct answer is **B**. The caption states what is plotted, the conditions, and how to read the markers and error bars, so a reader can understand the figure without the body text. It does not overclaim.

    **Concept Tested:** Figure Captions

    **See:** ./index.md#figures-latex-and-references





---

#### 7. A reviewer asks why a method was not tested at 125 °C, but the researcher could not do so with the available setup. Which response is best?

<div class="upper-alpha" markdown>
1. Add a fabricated measurement at 125 °C
2. Ignore the comment because it is inconvenient
3. State the limitation and explain why the test could not be performed
4. Promise to test at 125 °C in a future paper without evidence
</div>

??? question "Show Answer"
    The correct answer is **C**. An honest, evidenced response that acknowledges a limitation is acceptable. Fabricating data, ignoring the comment, or making unsupported promises all damage trust in the response.

    **Concept Tested:** Peer Review Response

    **See:** ./index.md#submission-and-response





---

#### 8. Before drafting a paper, what should the researcher do first regarding venue requirements?

<div class="upper-alpha" markdown>
1. Write the paper and then adapt it to whatever venue is chosen
2. Let the agent choose the venue automatically
3. Read the requirements only after drafting is complete
4. Read the venue requirements before drafting
</div>

??? question "Show Answer"
    The correct answer is **D**. Venue rules on length, template, reference style, and required statements shape the draft. Reading them first avoids wasted rewriting. The researcher, not the agent, chooses the venue.

    **Concept Tested:** Venue Requirements

    **See:** ./index.md#figures-latex-and-references





---

#### 9. A researcher runs a number-extraction script before and after an agent's revision and finds that an ENOB value changed. What should the researcher conclude?

<div class="upper-alpha" markdown>
1. The revision silently altered a result and must not be accepted without checking
2. The revision improved the accuracy of the result
3. The number check is wrong because the prose reads better
4. Such changes are normal and should be ignored
</div>

??? question "Show Answer"
    The correct answer is **A**. A number check catches silent changes to values, units, and qualifiers during editing. A revision that changes a reported result without explicit instruction is a defect, not an improvement, until verified.

    **Concept Tested:** Technical Editing

    **See:** ./index.md#drafting-and-revising





---

#### 10. A peer review response drafted by an agent agrees with every comment and claims changes throughout the paper. What is the main risk?

<div class="upper-alpha" markdown>
1. The response will be too long
2. The reviewers will be offended by the tone
3. The agent has misunderstood the paper's contribution
4. The response may claim changes that were not actually made
</div>

??? question "Show Answer"
    The correct answer is **D**. Models tend to accommodate, so an agent may agree with comments and claim changes that do not exist. The researcher must decide the position on each comment first and ensure every claimed change is actually in the paper.

    **Concept Tested:** Peer Review Response

    **See:** ./index.md#submission-and-response
