# From Researcher to Orchestrator: Attention-Bounded Supervision of AI Agent Teams in Engineering Research

A research paper drawn from the textbook *AI for EE Research: From Researcher to
Orchestrator* (https://dmccreary.github.io/ai-for-ee-research/). It presents an
orchestration framework for researchers who direct teams of AI agents: autonomy is set
per task from reversibility, reach and verifiability by a rule shown to be complete and
monotone; work passes between agents as version-controlled files that no agent may accept
for itself, with a provenance rule for reported numbers; and a review-load model bounds
team size by the researcher's daily attention, deriving the planning-to-execution ratio
from review costs. The framework is examined against an illustrative ADC
characterization task and two real AI-assisted publication projects (the 20-chapter
textbook and the MicroSims arXiv paper), whose records contain 13 coded defects.

- **Authors:** Dan McCreary (Independent Researcher; ORCID 0009-0009-3542-8828)
- **Version:** 0.01 · **Status:** draft, packaged for arXiv, not yet proofread by the author
- **Quality score:** 95/100 (Excellent). See [quality-report.md](quality-report.md).
- **Target:** arXiv cs.HC, cross-lists cs.MA and cs.CY (CC BY 4.0). See [arxiv-metadata.md](arxiv-metadata.md).

## Directory structure

```
researcher-as-orchestrator/
├── main.tex             # preamble, title block, section \input list
├── sections/            # one .tex file per section + references.bib
│   ├── 01-abstract.tex
│   ├── 02-introduction.tex
│   ├── 03-related-work.tex
│   ├── 04-framework.tex
│   ├── 05-case-studies.tex
│   ├── 06-discussion.tex
│   ├── 07-conclusion.tex
│   └── references.bib   # 63 entries, all verified
├── figures/             # TikZ sources, PNG charts and the scripts and data that make them
├── build.sh             # build, package and release script
├── brief.md             # content brief, assumptions and readiness score
├── arxiv-metadata.md    # arXiv submission form fields
├── quality-report.md    # rubric score and open issues
├── arxiv-upload.zip     # self-contained arXiv package (sources, figures, main.bbl)
└── main.pdf             # latest build (26 pages)
```

## Building

Requires [Tectonic](https://tectonic-typesetting.github.io/) (`brew install tectonic`).
Falls back to `latexmk` + pdfLaTeX if Tectonic isn't installed.

```bash
./build.sh            # build main.pdf
./build.sh arxiv      # build + arxiv-upload.zip, test-compiled in a clean folder
./build.sh release    # build + save researcher-as-orchestrator-v<version>.pdf
./build.sh clean      # remove build artifacts
```

To bump the version, edit `\newcommand{\paperversion}{...}` in `main.tex`.

## Regenerating figures

The four diagrams are TikZ sources compiled with the paper:
`figures/framework-overview.tikz`, `figures/autonomy-rule.tikz`,
`figures/adc-task-graph.tikz` and `figures/textbook-pipeline.tikz`.

The two charts are matplotlib scripts (matplotlib is not part of the base Python here, so
use a virtual environment):

```bash
python3 -m venv .venv && .venv/bin/pip install matplotlib
.venv/bin/python figures/review-load.py       # Figure 3, illustrative model parameters
.venv/bin/python figures/chapter-budgets.py   # Figure 6, data in figures/chapter-budgets.csv
```

`figures/chapter-budgets.csv` is transcribed from
`logs/chapter-content-generator-2026-10-15.md` in the ai-for-ee-research repository.

## Submitting

See [arxiv-metadata.md](arxiv-metadata.md) for the form fields and the checklist.
Upload `arxiv-upload.zip` at https://arxiv.org/submit.
