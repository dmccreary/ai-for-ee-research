# Papers

This directory holds academic papers in arXiv format that come out of this project.
Each paper lives in its own folder, with LaTeX source, figures and a `build.sh`.

| Paper | Folder | Version | Status | Score |
|-------|--------|---------|--------|------:|
| From Researcher to Orchestrator: Attention-Bounded Supervision of AI Agent Teams in Engineering Research | [researcher-as-orchestrator](researcher-as-orchestrator/) | 0.01 | Packaged for arXiv (cs.HC); awaiting author proofread | 95 |

## Building a paper

```bash
cd papers/<paper-folder>
./build.sh            # build main.pdf (requires: brew install tectonic)
./build.sh arxiv      # also create and test arxiv-upload.zip
./build.sh release    # also save a versioned copy of the PDF
./build.sh clean      # remove build artifacts
```

These papers were generated and scored with the `arxiv-paper-generator` skill.
