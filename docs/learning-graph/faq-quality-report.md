# FAQ Quality Report

Generated: 2026-10-23

## Overall Statistics

- **Total Questions:** 96
- **Overall Quality Score:** 78/100
- **Content Completeness Score:** 97/100
- **Concept Coverage:** 61% (231/379 concepts)

Coverage counts a concept as covered when its label appears in a question or answer, or when it is listed
for a question in the chatbot JSON. A 379-concept book cannot be fully covered by an FAQ of this size, so the
gaps report ranks the uncovered concepts by how many other concepts depend on them.

## Category Breakdown

### Getting Started
- Questions: 12
- Bloom's levels: Remember 9, Understand 3
- Avg Word Count: 92

### Core Concept
- Questions: 23
- Bloom's levels: Understand 16, Remember 3, Apply 3, Analyze 1
- Avg Word Count: 96

### Technical Detail
- Questions: 19
- Bloom's levels: Understand 14, Remember 3, Apply 2
- Avg Word Count: 96

### Common Challenge
- Questions: 16
- Bloom's levels: Apply 8, Analyze 5, Evaluate 2, Understand 1
- Avg Word Count: 95

### Best Practice
- Questions: 15
- Bloom's levels: Apply 14, Evaluate 1
- Avg Word Count: 85

### Advanced Topic
- Questions: 11
- Bloom's levels: Evaluate 4, Create 4, Analyze 3
- Avg Word Count: 96

## Bloom's Taxonomy Distribution

Actual versus the book-wide target (total absolute deviation 20 points):

| Level | Actual | Target | Deviation |
|-------|--------|--------|-----------|
| Remember | 16% | 20% | -4% ✓ |
| Understand | 35% | 30% | +5% ✓ |
| Apply | 28% | 25% | +3% ✓ |
| Analyze | 9% | 15% | -6% ✓ |
| Evaluate | 7% | 7% | +0% ✓ |
| Create | 4% | 3% | +1% ✓ |

Bloom's Score: 15/25

## Answer Quality Analysis

- **Examples:** 55/96 (57%) - Target: 40%+ ✓
- **Links:** 96/96 (100%) - Target: 60%+ ✓
- **Avg Length:** 94 words - Target: 100-300 ⚠
- **Anchor links:** 0 (hard requirement) ✓
- **Broken links:** 0 ✓

Answer Quality Score: 23/25

## Organization Quality

- Logical categorization: ✓
- Progressive difficulty: ✓ (categories run from easy to hard)
- No duplicates: ✓
- Clear questions: ✓

Organization Score: 20/20

## Overall Quality Score: 78/100

- Coverage: 20/30
- Bloom's Distribution: 15/25
- Answer Quality: 23/25
- Organization: 20/20

## Recommendations

### High Priority
1. Add questions for the top uncovered high-centrality concepts listed in [FAQ Coverage Gaps](faq-coverage-gaps.md).
2. Re-run the generator after the next round of chapter edits so the JSON stays in step with the text.

### Medium Priority
1. Review the answers for the claims that quote specific numbers (for example the 10 versus 20 log10 case) against the chapter text.
2. Add FAQ entries for the six personal agent products if readers ask about them; the book deliberately keeps these to criteria.

### Low Priority
1. Add a short "Capstone" category if the instructor wants one.
2. Check question phrasing for searchability with the site search.
