# Quality Report: From Researcher to Orchestrator: Attention-Bounded Supervision of AI Agent Teams in Engineering Research

**Version:** 0.01 · **Date:** 2026-10-22 · **Score:** 95/100 (Excellent)
**Submission-ready:** Yes, after the author's proofread. All six hard gates pass; the
AI-use disclosure states that the author reviewed and verified everything, which becomes
true only once he has done so.

Scored with arxiv-paper-generator v0.01: `score_paper.py --verify-dois` for the
[auto] criteria (30/30), and the rubric descriptors for the [judge] criteria. One
revision pass followed the first score (overfull figures, a scorer false positive on the
listing label, undefined acronyms, one overclaim, the abstract's word count, and the
attribution of defect D12).

## Score breakdown

| # | Criterion | Points | Max | Notes |
|---|-----------|-------:|----:|-------|
| 1 | Title | 5 | 5 | 13 words; names the contribution (attention-bounded supervision), the object (AI agent teams) and the domain |
| 2 | Authors | 3 | 3 | Full name, Independent Researcher, profile URL, ORCID |
| 3 | Abstract | 7 | 7 | 244 words, 1,628 characters; context, gap, contribution, evidence (13 defects), implication; no citations; keywords line |
| 4 | Introduction | 8 | 8 | Cited stakes (Wiley 2025 survey, fabricated-citation rates, multi-agent failure taxonomy), precise three-part gap, 4 enumerated contributions, roadmap |
| 5 | Related work | 7 | 7 | 5 strands, 53 distinct works cited, a positioning paragraph per strand, comparison table |
| 6 | Core contribution | 9 | 10 | Definitions, roles table, autonomy rule as a function with a monotonicity proof, protocol invariants, five equations, listing, five rejected alternatives. Detection probabilities in Eq. (5) have no estimation procedure yet |
| 7 | Evidence | 6 | 8 | Three cases: one illustrative EE task and two real projects with sourced counts, logs and a coded defect table. No controlled measurement; review-time parameters unmeasured; the real cases are publication pipelines built by the author |
| 8 | Discussion and limitations | 4 | 4 | Implications for researchers, groups, tool builders, venues; 7 named limitations |
| 9 | Conclusion | 3 | 3 | Fresh restatement; 5 future directions, each with a method |
| 10 | References | 10 | 10 | [auto] 63 cited; 98% DOI/URL; 71% from 2021+; 0 undefined; 0 uncited |
| 11 | Figures | 8 | 8 | [auto 6] 6 figures, all referenced, captions 48-71 words; [judge 2] 4 vector TikZ + 2 PNG at 337 DPI, Okabe-Ito palette, markers and line styles as well as color |
| 12 | Tables and formal elements | 4 | 4 | [auto 2] 7 booktabs tables; [judge 2] 8 equations, 1 proposition, 1 listing, each used |
| 13 | Claim support | 2.5 | 3 | Numbers are cited or traced to repository files; a few design-rationale statements (Section 3.7) are argued rather than cited |
| 14 | Clean build | 4 | 4 | [auto] 0 errors, 0 undefined, no overfull box above 10pt (one of 2.4pt), 0 missing characters |
| 15 | arXiv package | 4 | 4 | [auto] 0.25 MB, 16 files, complete, clean-folder test compile passes, ASCII-only source |
| 16 | Submission metadata and disclosure | 4 | 4 | [auto] cs.HC, comments with page count, CC BY 4.0, AI disclosure in the paper |
| 17 | Writing quality | 7 | 8 | Academic register, consistent terms, acronyms defined, transitions between sections. Dense in places; 26 pages is long for the content |
| | **Total** | **95.5 (reported as 95)** | **100** | |

## Hard gates

- [x] Compiles without errors
- [x] No undefined citations or references
- [x] Every reference verified real: 52 DOIs resolved through Crossref or doi.org (DataCite
      metadata checked for all 18 arXiv DOIs); the 11 entries without a DOI were checked by
      fetching the page (Anthropic x2, agentskills.io, agents.md, arXiv policy, Wiley press
      release, EC guidelines, the book's site) or a catalogue record (Sheridan and Verplank
      via NTRL ADA057655; Brooks and Yin via library and publisher records)
- [x] No fabricated data, results, quotes or statistics: every number in Section 4 traces to
      a file in the ai-for-ee-research or microsims repository, their git history, the arXiv
      record, or a cited source; Case A and all model parameters are labelled illustrative
- [x] Abstract at most 1,920 characters (1,628)
- [x] No TODO, FIXME, placeholder or lorem-ipsum text in the visible paper

## Automated facts

- Pages: 26 (body about 21, references about 4.5); body about 7,800 words
- References: 63 entries, all cited; 83% with DOI, 98% with DOI or URL; 71% from 2021 or
  later; years 1959-2026
- Figures: 6 (framework overview, autonomy decision tree, review-load chart, ADC task graph,
  textbook pipeline, chapter-budget chart); PNGs at 337 effective DPI
- Tables: 7, all booktabs; equations: 8; listings: 1
- Overfull boxes: one of 2.4pt (Table 7), none above 10pt; missing characters: 0
- arXiv package: arxiv-upload.zip, 0.25 MB, 16 files, Tectonic test compile PASS

## Gaps and recommended revisions

Ordered by points recoverable.

1. **Evidence (2 points).** The thesis that review attention is the binding constraint is
   supported only indirectly (the 50 unapproved simulations, the unreviewed quiz output).
   Measured review times for even one week of real agent use (per-artifact review minutes,
   artifacts per day, defects found after acceptance) would let Section 3.6 use measured
   rather than illustrative parameters and would raise this criterion to 8.
2. **Writing (1 point).** At 26 pages the paper is long for its argument. Candidates to
   cut: the pipeline-reliability paragraph (Eq. 6) or the critical-path discussion could
   move to an appendix, and Table 1 overlaps the per-strand positioning text.
3. **Core contribution (1 point).** Give a procedure for estimating the detection
   probabilities $a_j$ and $h_j$ in Eq. (5), for example from seeded defects.
4. **Claim support (0.5 point).** Cite a source for the two design-rationale assertions in
   Section 3.7 (capability-based levels changing with model releases; conversations being
   hard to diff), or mark them as the author's judgment.

## Needs the author

- **Proofread every number taken from the logs** (Section 4.3, Tables 6 and 7, Figure 6)
  against the files in ai-for-ee-research: the chapter budgets, the 379/670/17 learning-graph
  counts, the 47/3/0 simulation statuses, the 34 commits, the session timings.
- **Confirm the use of the quiz-stage self-audit log** (`logs/devin-slow-quiz-generation.md`)
  as evidence, including the statement that the 82/100 score in the published quiz report
  was hard-coded. The paper does not name the agent product. Consider whether the published
  report should also be corrected on the book site.
- **Confirm the MicroSims case details** (Section 4.4): the retitling of Section 9 on
  18 October 2025, the 23 commits, and the acknowledgment of co-authors Valerie Lockhart
  and Troy A. Peterson.
- **Confirm the assumptions in brief.md:** which argument the paper makes, the cs.HC primary
  category (cs.CY is the safer fallback for the CS position-paper rule; TechRxiv is the
  fallback venue), the title, and the formal extensions presented as this paper's additions.
- **Affiliation line:** "Independent Researcher, Minnesota, USA". Remove the location if
  not wanted. No e-mail address is printed; the LinkedIn URL is the contact.
- **Acknowledgments:** no funding or employer statement was added. Add one if required.
- **AI disclosure:** it states that the author reviewed and verified all content. Make that
  true before submitting.
- **Unverified references:** none. Every entry was verified; no source was dropped for
  failing verification.
- **pdfLaTeX:** the local test compile uses Tectonic (XeTeX); arXiv will compile with
  pdfLaTeX. The source is ASCII-only and uses only the template's packages plus the
  `hyphens` option on `url`, so no problems are expected, but arXiv's preview is the final
  check.
- **Data snapshot:** Case B was analyzed at ai-for-ee-research commit `8732aa0`
  (34 commits). During this run a new commit (`Add KaTeX auto-rendering and sample skill
  prompt for paper generation`, 23:03) and uncommitted edits to `mkdocs.yml` and
  `docs/learning-graph/instructors-guide/` appeared in that repository; they did not come
  from this run, and the counts the paper cites (simulation statuses, learning graph,
  glossary, quizzes) were rechecked afterwards and are unchanged.
