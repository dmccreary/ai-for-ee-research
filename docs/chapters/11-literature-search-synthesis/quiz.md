# Quiz: AI-Assisted Literature Search and Synthesis

Test your understanding of search strategy, precision and recall, triage, claim extraction, citation chaining, reference verification, and evidence synthesis with these 10 review questions.

---


#### 1. What are the two directions of citation chaining?

<div class="upper-alpha" markdown>
1. Backward and forward
2. Internal and external
3. Primary and secondary
4. Vertical and horizontal
</div>

??? question "Show Answer"
    The correct answer is **A**. Backward chaining follows a paper's references to earlier work, while forward chaining follows later papers that cite it. The other pairs are not the terms used in the chapter.

    **Concept Tested:** Citation Chaining

    **See:** ./index.md#following-citations





---


#### 2. Which plain-text bibliographic format is most commonly used with LaTeX and fits well in version-controlled projects?

<div class="upper-alpha" markdown>
1. RIS
2. EndNote XML
3. CSV
4. BibTeX
</div>

??? question "Show Answer"
    The correct answer is **D**. BibTeX is the standard LaTeX reference format and is plain text, so agents and researchers can edit it and track it under version control. RIS and EndNote XML are common in other tools, and CSV is not designed for bibliographic records.

    **Concept Tested:** BibTeX

    **See:** ./index.md#references-verification-and-quality





---


#### 3. Why should a scoping literature search generally favor recall over precision?

<div class="upper-alpha" markdown>
1. Because recall measures the fraction of relevant papers returned
2. Because missing a key paper at the start is costly
3. Because high precision always means high recall
4. Because broad queries are faster to run
</div>

??? question "Show Answer"
    The correct answer is **B**. A scoping search aims to find as much relevant work as possible; extra irrelevant results can be removed during triage. Precision and recall trade off, so favoring recall accepts more false positives to reduce false negatives.

    **Concept Tested:** Search Strategy

    **See:** ./index.md#searching-strategy-keywords-and-sources





---


#### 4. Why is claim extraction preferred over a free-form summary when verifying a paper?

<div class="upper-alpha" markdown>
1. Because claim extraction requires less context
2. Because summaries cannot contain quantitative values
3. Because each claim is tied to a value, conditions, and a location in the paper
4. Because summaries are always generated from the full text
</div>

??? question "Show Answer"
    The correct answer is **C**. Extracted claims include the value, units, conditions, and the exact section or table where each claim appears, so you can confirm it in seconds. Summaries may be built from the abstract and the model's expectations, not the paper's body.

    **Concept Tested:** Claim Extraction

    **See:** ./index.md#triage-summarization-and-claim-extraction





---


#### 5. What is the main source-quality consideration when using papers from a preprint server?

<div class="upper-alpha" markdown>
1. The papers have not been through peer review
2. The papers do not contain engineering results
3. Preprints cannot be cited in manuscripts
4. Preprints are never indexed by scholarly databases
</div>

??? question "Show Answer"
    The correct answer is **A**. Preprints can be excellent, but they lack the peer-review filter of journal or conference papers, so the reader must assess quality directly. They can contain results, can be cited, and are often indexed.

    **Concept Tested:** Preprint Server

    **See:** ./index.md#searching-strategy-keywords-and-sources





---


#### 6. A query returns 10 papers, 6 of which are relevant and 4 of which are not. It missed 2 additional relevant papers. What is the recall of this query?

<div class="upper-alpha" markdown>
1. 0.50
2. 0.75
3. 0.60
4. 0.80
</div>

??? question "Show Answer"
    The correct answer is **B**. Recall is true positives divided by all relevant papers: 6 / (6 + 2) = 0.75. Precision would be 6 / 10 = 0.60, and 0.80 would require missing only one relevant paper.

    **Concept Tested:** Search Strategy

    **See:** ./index.md#searching-strategy-keywords-and-sources





---


#### 7. An agent extracts a claim that a paper reports an ENOB of 9.2 bits in Section IV, Table II. What is the best first step to verify the claim?

<div class="upper-alpha" markdown>
1. Trust the summary because it sounds correct
2. Search for another paper with the same ENOB value
3. Open the paper at Section IV, Table II, and read the supporting sentence
4. Add the claim to the comparison table without checking
</div>

??? question "Show Answer"
    The correct answer is **C**. Claim extraction gives an exact location, so verification means reading the source at that location. Trusting a summary or adding an unchecked claim are exactly the habits that produce fabricated citations.

    **Concept Tested:** Citation Verification

    **See:** ./index.md#references-verification-and-quality





---


#### 8. A researcher compares two SAR ADC papers by ENOB. Paper A reports 9.2 bits at 1 MS/s and Paper B reports 10.1 bits at 100 MS/s. What is the most important consideration?

<div class="upper-alpha" markdown>
1. Average the two ENOB values
2. Treat Paper B as better because the number is higher
3. Record them only if both are from peer-reviewed journals
4. Note that the conditions differ and the values are not directly comparable
</div>

??? question "Show Answer"
    The correct answer is **D**. ENOB depends on sampling rate, input frequency, supply, and process, so comparing headline numbers across different conditions produces a misleading synthesis. A comparison table keeps the conditions visible.

    **Concept Tested:** Comparison Table

    **See:** ./index.md#synthesis





---


#### 9. An agent generates several perfectly formatted BibTeX entries. Why must the researcher still verify them?

<div class="upper-alpha" markdown>
1. A model can fabricate well-formatted references for papers that do not exist
2. BibTeX format is too old to be reliable
3. DOI lookup is not available for conference papers
4. Correct formatting guarantees the entry is real
</div>

??? question "Show Answer"
    The correct answer is **A**. Language models can produce plausible-looking but fictitious bibliographic entries. Verification uses DOI lookup and title searches to confirm that authors, title, venue, and year match a real publication.

    **Concept Tested:** Citation Verification

    **See:** ./index.md#references-verification-and-quality





---


#### 10. A comparison table has rows for five papers and a column showing whether each result is measured or simulated. Four papers are simulated and one is measured. What does this pattern most clearly reveal?

<div class="upper-alpha" markdown>
1. The papers use different citation styles
2. The measured paper is always the most reliable
3. The search query was poorly chosen
4. A gap in measured experimental validation for this set of claims
</div>

??? question "Show Answer"
    The correct answer is **D**. When most comparable results are simulated, the field may lack measured experimental validation under the conditions of interest, which is a research gap. Citation style, reliability of one paper, and query quality are not what the table directly shows.

    **Concept Tested:** Research Gap

    **See:** ./index.md#synthesis


