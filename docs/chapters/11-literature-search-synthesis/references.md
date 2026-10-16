# References: AI-Assisted Literature Search and Synthesis

1. [Literature review](https://en.wikipedia.org/wiki/Literature_review) - Wikipedia - Defines the literature review and distinguishes narrative from systematic reviews. Relevant to building a written, repeatable search strategy and to the review-as-process versus review-as-product distinction used in this chapter.

2. [Precision and recall](https://en.wikipedia.org/wiki/Precision_and_recall) - Wikipedia - Explains precision, recall, the confusion matrix, and the F-measure. Directly supports the chapter's treatment of query performance and the recall-versus-precision trade-off, with worked formulas and imbalanced-data discussion.

3. [BibTeX](https://en.wikipedia.org/wiki/BibTeX) - Wikipedia - Describes the BibTeX plain-text bibliography format, its entry types and fields, history, and tools. Useful background for storing, version-controlling, and verifying reference entries that agents edit.

4. The Craft of Research (4th Edition) - Wayne C. Booth, Gregory G. Colomb, Joseph M. Williams - University of Chicago Press - Frames research writing as a problem, claim, reasons, evidence, and warrant argument. This claim-and-evidence structure clarifies claim extraction and how related work should position a contribution against a gap.

5. Introduction to Information Retrieval (1st Edition) - Christopher D. Manning, Prabhakar Raghavan, Hinrich Schutze - Cambridge University Press - No single originator of a distinctive innovation; chosen as the most widely praised, clear treatment of Boolean queries, precision, recall, and evaluating search, with exercises. Ideal for understanding why search strategies behave as they do.

6. [Survey of Hallucination in Natural Language Generation](https://arxiv.org/abs/2202.03629) - arXiv - Ji et al. survey how language models produce fabricated text, with metrics and mitigations, including summarization. Explains why model-written summaries and invented citations occur and why verification is essential.

7. [Crossref REST API Documentation](https://www.crossref.org/documentation/retrieve-metadata/rest-api/) - Crossref - Official guide to retrieving scholarly metadata as JSON by DOI or query. Basis for the chapter's DOI lookup and citation verification scripts, with endpoint descriptions and example requests.

8. [Semantic Scholar Academic Graph API](https://www.semanticscholar.org/product/api) - Semantic Scholar - Overview of a free API for papers, authors, citations, and venues. Supports programmatic citation chaining, forward and backward, and agent-driven search across scholarly records.

9. [arXiv API User's Manual](https://info.arxiv.org/help/api/user-manual.html) - arXiv - Documents how to build queries and parse Atom XML responses from the arXiv preprint server, with code examples in several languages. Lets an agent search preprints and log queries reproducibly.

10. [Zotero Documentation](https://www.zotero.org/support/) - Zotero - Official guides to collecting, organizing, annotating, and citing references and syncing a library. Relevant to the reference manager concept, building an annotated bibliography, and exporting BibTeX for verification.
