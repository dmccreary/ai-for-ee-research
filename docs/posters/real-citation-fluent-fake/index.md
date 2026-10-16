---
title: The Real Citation and the Fluent Fake
description: A model writes a fabricated reference as fluently as a real one, so every citation needs three checks the model cannot perform on itself.
image: posters/real-citation-fluent-fake/real-citation-fluent-fake.png
status: built
hide:
  - toc
---

<iframe src="./main.html" height="1000px" width="100%" scrolling="no"></iframe>

[Open the interactive poster full screen](./main.html){ .md-button .md-button--primary }

Use **Explore** mode to hover over or click a panel and read what it shows about unchecked and checked references. Use **Quiz** mode to read a clue and click the panel it describes.

The left half shows the careless version and the right half shows the same reference after it has been checked. The strip along the bottom shows the three ways a reference fails.

The nine regions are:

1. **Fluent Reference** — A well-formed card that looks right and has not been looked up.
2. **Asking the Model Again** — The trap of letting the model certify its own citations.
3. **Same Card, Checked** — The identical reference after a lookup you ran yourself.
4. **Does It Exist** — The DOI resolves and the exact title is in a database.
5. **Do Details Match** — Authors, venue, and year agree with the record.
6. **Does It Support the Claim** — The paper says what the citation says it says.
7. **Fabricated** — No such paper exists.
8. **Wrong Details** — The paper exists, but year, venue, volume, or an author is wrong.
9. **Unsupported Claim** — The paper exists and the details are right, but it does not say that.

## Static Poster

![The Real Citation and the Fluent Fake poster](./real-citation-fluent-fake.png){ loading=lazy }

The full-size poster above is a static copy of the interactive version, handy for printing, sharing, or viewing without JavaScript. Until the final artwork is generated, this image is placeholder art.

## Why This Matters

A citation has a regular structure, and a model can write a well-formed one about any topic without looking anything up. Chapter 2 names four outcomes for a model-written reference: fabricated, wrong details, unsupported claim, or verified. Chapter 11 adds the tools: a DOI lookup, a script that resolves every DOI in a BibTeX file, and a rule to ask the agent for the location of every claim. Chapter 17 adds the principle behind the left half of the poster: a check must be independent of what it checks, so asking the same model to confirm its own output tells you almost nothing.

The poster does not say that models are usually wrong about references, and it does not give an error rate, because the chapters do not either. The three cards in the failure strip use the chapters' own invented examples. A script can resolve identifiers and compare fields, but only a person who opens the paper can confirm that it supports the sentence it is cited for.

## Connects to

- [Chapter 2: How Language Models Work](../../chapters/02-how-language-models-work/index.md)
- [Chapter 11: AI-Assisted Literature Search and Synthesis](../../chapters/11-literature-search-synthesis/index.md)
- [Chapter 17: Verification and Reproducibility](../../chapters/17-verification-reproducibility/index.md)

## Source

The linked chapters of this book, which supply the four citation outcomes, the lookup procedure, the DOI and Crossref lookup, and the independent and primary source checks. The reference records quoted in the facts are invented for the chapters' exercises and are not real papers.

Teachers and editors can open [calibration mode](./main.html?edit=true) to adjust zone positions after the artwork is generated. Copy only the `x1`, `y1`, `x2`, and `y2` numbers back into `data.json`, because the calibration export omits `showLabels` and `palette`.
