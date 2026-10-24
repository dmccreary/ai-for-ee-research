---
title: References
description: Primary and supporting references for AI for EE Research, starting with the foundational semantic web architecture paper on advocate agents and the IET chapter on integrating personal knowledge graphs.
---

# References

This page collects some of the general references for this interactive intelligent textbook.
Each chapter also includes a detailed list of annotated references you can use to explore more about that chapter's topic.

## Primary Reference

### A Semantic Web Architecture for Advocate Agents to Determine Preferences and Facilitate Decision Making

1. Ketter, W., Batchu, A., Berosik, G., and McCreary, D. (2008).
   [A semantic web architecture for advocate agents to determine preferences
   and facilitate decision making](https://dl.acm.org/doi/10.1145/1409540.1409554).
   In *Proceedings of the 10th International Conference on Electronic Commerce
   (ICEC '08)*, Innsbruck, Austria. ACM, New York, NY, USA, pp. 1-10.
   DOI: [10.1145/1409540.1409554](https://doi.org/10.1145/1409540.1409554).

??? note "BibTeX"
    ```bibtex
    @inproceedings{ketter2008advocate,
      author    = {Ketter, Wolfgang and Batchu, Arun and Berosik, Gary and McCreary, Dan},
      title     = {A semantic web architecture for advocate agents to determine preferences and facilitate decision making},
      booktitle = {Proceedings of the 10th International Conference on Electronic Commerce (ICEC '08)},
      year      = {2008},
      month     = aug,
      address   = {Innsbruck, Austria},
      publisher = {ACM},
      pages     = {1--10},
      doi       = {10.1145/1409540.1409554}
    }
    ```

**Where it is used in this book:** the
[Personal Knowledge Graphs appendix](appendices/pkg/index.md) cites it as the primary
reference for the author's research on semantic web architectures for software
agents that act on a person's behalf.




### Integrating Personal Knowledge Graphs Into The Enterprise
McCreary, D. (2023).
   [Integrating personal knowledge graphs into the enterprise](https://digital-library.theiet.org/doi/abs/10.1049/PBPC063E_ch14).
   Chapter 14 in *Personal Knowledge Graphs (PKGs): Methodology, Tools and
   Applications*. Institution of Engineering and Technology (IET),
   pp. 307-325. DOI: [10.1049/PBPC063E_ch14](https://doi.org/10.1049/pbpc063e_ch14).

??? note "BibTeX"
    ```bibtex
    @incollection{mccreary2023ipkg,
      author    = {McCreary, Dan},
      title     = {Integrating personal knowledge graphs into the enterprise},
      booktitle = {Personal Knowledge Graphs (PKGs): Methodology, Tools and Applications},
      chapter   = {14},
      publisher = {Institution of Engineering and Technology},
      year      = {2023},
      pages     = {307--325},
      doi       = {10.1049/PBPC063E_ch14}
    }
    ```

**Where it is used in this book:** the
[Personal Knowledge Graphs appendix](appendices/pkg/index.md) summarizes this
chapter, which consolidates and reformats the author's four 2022 blog posts on
personal knowledge graphs.

### Multi-Agent Research System
Hadfield, J., Zhang, B., Lien, K., Scholz, F., Fox, J., and Ford, D. (2025).
   [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system).
   Anthropic Engineering, June 13, 2025.

**Where it is used in this book:** a case study of a lead agent delegating to parallel
subagents. It is also cited in the
[Orchestrating Teams of Planning and Execution Agents](chapters/10-orchestrating-agent-teams/references.md)
chapter references.

### Agent Skills
[Agent Skills](https://agentskills.io/home). Open standard, originally developed by
   Anthropic, for packaging instructions, scripts, and reference materials into a
   portable folder with a `SKILL.md` file that agents load on demand.

**Where it is used in this book:** the specification behind the skill anatomy and
skill design chapters (see
[Knowledge Bases and Skill Anatomy](chapters/06-knowledge-bases-skill-anatomy/references.md)).

### MicroSims
[MicroSims: A Framework for AI-Generated, Scalable Educational Simulations with Universal Embedding and Adaptive Learning Support](https://arxiv.org/abs/2511.19864) 25 Nov 2025

### Five Levels of Intelligent Textbooks
[A Five-Level Classification Framework for Intelligent Textbooks:Lessons from Autonomous Vehicle Standards](https://www.researchgate.net/publication/398830915_A_Five-Level_Classification_Framework_for_Intelligent_Textbooks_Lessons_from_Autonomous_Vehicle_Standards) - Dec 18, 2025

### From Researcher to Orchestrator
McCreary, D. (2026).
   [From Researcher to Orchestrator: Attention-Bounded Supervision of AI Agent Teams
   in Engineering Research](https://zenodo.org/records/23607348).
   Preprint, Zenodo, v1. DOI: [10.5281/zenodo.23607348](https://doi.org/10.5281/zenodo.23607348).
   Licensed CC BY 4.0.

??? note "BibTeX"
    ```bibtex
    @misc{mccreary2026orchestrator,
      author    = {McCreary, Dan},
      title     = {From Researcher to Orchestrator: Attention-Bounded Supervision of AI Agent Teams in Engineering Research},
      year      = {2026},
      publisher = {Zenodo},
      version   = {v1},
      doi       = {10.5281/zenodo.23607348},
      url       = {https://zenodo.org/records/23607348}
    }
    ```

**Where it is used in this book:** the research paper drawn from this book. It presents
the autonomy-assignment rule, the separation-of-acceptance protocol, and the review-load
model behind the
[Orchestrating Teams of Planning and Execution Agents](chapters/10-orchestrating-agent-teams/references.md)
chapter.
