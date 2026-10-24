# Posting Guide: Zenodo and TechRxiv

Step-by-step process for posting *From Researcher to Orchestrator* so that Google Scholar
and other indexes pick it up, without using arXiv. The arXiv package
([arxiv-metadata.md](arxiv-metadata.md), `arxiv-upload.zip`) is kept in case you change
your mind, but nothing here depends on it.

The two sites' forms change from time to time. Where this guide and the live form
disagree, follow the form and update this file.

## Recommended order

1. **Zenodo** first. It is the canonical version. It has no moderation queue, so it cannot
   sit unanswered or be declined, and it mints a DOI the moment you publish.
2. **TechRxiv** second, and only if you want the IEEE and EE audience. It is optional.
   TechRxiv *does* screen submissions before posting, so it can decline a paper. The
   paper is already public on Zenodo by then, so a decline costs you nothing.

Why this order: a Zenodo or TechRxiv DOI is permanent the moment you publish. Neither site
lets you swap the file under the same DOI or cleanly remove the record. Post only after
the PDF is final.

## Step 0: Pre-flight (do once, before any site)

- [ ] Proofread `main.pdf`, including every number taken from the project logs. This is the
      open checkbox in `arxiv-metadata.md`.
- [ ] Decide the version label. The paper prints `\paperversion` (currently `0.01`).
      Consider bumping it to `1.0` for the posted version in `main.tex`.
- [ ] Build the release PDF so the posted file is named and versioned:

```bash
./build.sh release
```

- [ ] Confirm the PDF is under 10 MB (TechRxiv's per-file limit). It is about 0.4 MB.
- [ ] Have your ORCID ready: `0009-0009-3542-8828`.
- [ ] Decide the license. This guide assumes **CC BY 4.0**, matching the arXiv metadata.
      Use the same license on every site.

### Metadata to paste (same on every site)

| Field | Value |
|---|---|
| Title | From Researcher to Orchestrator: Attention-Bounded Supervision of AI Agent Teams in Engineering Research |
| Author | Dan McCreary (Independent Researcher), ORCID 0009-0009-3542-8828 |
| Abstract | Copy from `arxiv-metadata.md` (plain text, 1,628 characters) |
| Keywords | AI agents, human supervisory control, levels of autonomy, multi-agent systems, research workflows, verification, reproducibility, electrical engineering |
| License | CC BY 4.0 |
| Source code | https://github.com/dmccreary/ai-for-ee-research |
| Companion textbook | https://dmccreary.github.io/ai-for-ee-research/ |

## Part A: Zenodo

Zenodo is CERN's open repository. It has no moderation, no endorsement and no subject
screening. It mints a DOI at publish time and Google Scholar indexes it.

### A1. Practice run (optional but recommended)

1. Go to https://sandbox.zenodo.org and sign up. The sandbox is separate from the real
   site, and its DOIs are not real.
2. Walk through steps A3 to A6 there once. Nothing you do in the sandbox is permanent.

### A2. Create the real account

1. Go to https://zenodo.org and choose **Sign up**. Logging in with **ORCID** is the
   easiest option, and it links your ORCID to every record you publish.
2. Confirm your email address.

### A3. Start a new upload

1. Choose **New upload**.
2. Upload the PDF (`researcher-as-orchestrator-v<version>.pdf` from `./build.sh release`).
3. Optionally upload `arxiv-upload.zip` as a second file, labelled as the LaTeX source.
   Zenodo files cannot be changed after publishing, so only add files you are sure about.

### A4. Fill in the metadata

| Zenodo field | Value |
|---|---|
| Resource type | **Publication / Preprint** |
| Title | As in the table above |
| Publication date | The day you publish |
| Creators | Dan McCreary, affiliation "Independent Researcher", ORCID as above |
| Description | The abstract |
| Keywords / subjects | The keyword list above |
| Languages | English |
| License | Creative Commons Attribution 4.0 International |
| Version | Same label as the PDF (for example `1.0`) |
| Publisher | Leave as Zenodo, or leave blank |

### A5. Link the other versions and the code (this matters for Scholar)

Under **Related works**, add each of these:

| Relation | Identifier | Why |
|---|---|---|
| **Is supplemented by** | https://github.com/dmccreary/ai-for-ee-research | Points to the repo with the logs behind the paper's numbers |
| **Is part of** (optional) | https://dmccreary.github.io/ai-for-ee-research/ | The companion textbook |

Choose a community only if one fits (for example OpenAIRE). It is optional.

### A6. Publish

1. Use **Preview** and read every field. The files and the DOI cannot be edited after
   publishing. Only the metadata can be.
2. Choose **Publish** and confirm. The record is public immediately and has two DOIs:
   a **version DOI** for this exact file and a **concept DOI** for all versions.
3. Copy the **version DOI** (`10.5281/zenodo.<number>`). Zenodo advises citing the version
   DOI.

### A7. After publishing

- To fix a typo in the PDF later, use **New version** on the record. It creates a new
  version DOI under the same concept DOI.
- To fix metadata only, use **Edit**.
- Add the Zenodo DOI to `README.md` in this folder under a "Where it is posted" line.
- When you post to TechRxiv (Part B), go back to **Edit** on the Zenodo record and add the
  TechRxiv DOI under Related works as **Is identical to**, so Scholar groups the two.

### A8. Optional: archive the whole repo as well

If you want the *repo* (textbook, logs and paper sources) to have its own citable DOI:

1. At https://zenodo.org/account/settings/github/ , switch on the repo
   `dmccreary/ai-for-ee-research`.
2. Create a GitHub release. Zenodo archives it and mints a DOI automatically.
3. Add a `CITATION.cff` to the repo root so GitHub shows a "Cite this repository" button.

This is separate from the paper record. Keep the two DOIs distinct.

## Part B: TechRxiv

TechRxiv is IEEE's preprint server for engineering and computer science. It runs on the
Figshare platform. Submissions are screened but not peer-reviewed. Posts get a DOI and
are indexed by Google Scholar.

### B1. Check fit first

- The paper must be unpublished, in English, and in scope (technical content). A research
  paper on human supervision of AI agents in engineering research should fit. Standalone
  datasets or code are declined.
- You must be able to tell any co-authors about the submission. You are the sole author.
- Posted preprints generally cannot be deleted, only withdrawn or revised. Treat publish as
  final.

### B2. Account

1. Go to https://www.techrxiv.org and choose **Submit** (it sends you to the Figshare-hosted
   submission site).
2. Sign in or create an account. Link your ORCID if the form offers it. The guidelines
   have been inconsistent about whether an ORCID is required, so expect to need it.

### B3. Upload

1. Start a new submission and drag in the PDF.
2. Add the LaTeX source or supplementary files only if you want them public. Each file
   is limited to 10 MB.

### B4. Metadata

| TechRxiv field | Value |
|---|---|
| Title | As in the table above |
| Authors | Dan McCreary, Independent Researcher, ORCID as above |
| Abstract | The abstract |
| Category | Pick the closest available. Likely candidates are human-computer interaction or artificial intelligence under computing and processing, and a general engineering education or research-methods heading if one exists. Pick the one the dropdown actually offers. |
| Keywords | The keyword list above |
| License | CC BY 4.0 |
| References / related | Add the Zenodo DOI, so the two records point at each other |
| Funding | None |

### B5. Declarations and publish

1. Tick the declarations the form shows (originality, co-author consent, permission to
   reuse any third-party figures). All figures in this paper are the author's own, so
   no third-party permission is needed.
2. **Submit** for moderation. Screening usually takes a few working days. It checks
   scope and plagiarism, not technical merit.
3. When it is approved, the preprint goes live and the DOI (`10.36227/techrxiv.<number>`)
   is registered.

### B6. Afterwards

- Add the TechRxiv DOI to `README.md` here.
- To fix an error, post a **new version**. Do not expect the old version to disappear.
- If you later submit to an IEEE journal, say in the cover letter that a TechRxiv preprint
  exists. IEEE accepts TechRxiv preprints.

## Part C: Make Scholar find it

1. **Wait.** Scholar can take days to several weeks to index a Zenodo or TechRxiv record,
   and it is less predictable than for arXiv. You cannot force it. If nothing appears
   after a month, check that the PDF text is selectable (step 5) and that the record is
   public.
2. **Create your Scholar profile** at https://scholar.google.com/citations . Add the paper
   when it shows up, and merge duplicate entries (Zenodo, TechRxiv) into one. If Scholar
   has not found it yet, you can add the article by hand from the profile.
3. **Claim your Semantic Scholar author page** at https://www.semanticscholar.org/me/research
   and confirm the paper is attributed to you.
4. **Add the DOIs to your ORCID record** (ORCID, Works, Add works) so the identifiers
   connect.
5. **Check the PDF text.** Open `main.pdf`, select the title and abstract with the mouse,
   and confirm they copy as real text. Scholar needs a text-based PDF with the title,
   authors and abstract on page 1.
6. **Keep the author name the same everywhere**: `Dan McCreary`.

## Checklist

- [ ] Step 0 pre-flight complete, PDF final
- [ ] Zenodo published, version DOI recorded: `__________`
- [ ] TechRxiv approved, DOI recorded: `__________` (optional)
- [ ] DOIs added to `README.md`
- [ ] Scholar profile created, duplicate records merged
- [ ] Semantic Scholar author page claimed
- [ ] DOIs added to ORCID
