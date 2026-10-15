---
title: "Responsible and Ethical Use of AI"
description: "The responsibilities that come with AI assistance in research: academic integrity, disclosure and citation of AI use, privacy and confidential data, unpublished results, intellectual property and licensing, bias, environmental cost, over-reliance, and drafting a lab AI policy."
generated_by: claude skill chapter-content-generator
date: "2026-10-15 11:15:46"
version: 1.11
---

# Responsible and Ethical Use of AI

## Summary

This chapter covers the responsibilities that come with AI assistance: academic integrity, citing and disclosing AI use, privacy and confidential data, unpublished results, intellectual property, licensing, and bias. It also covers institutional and journal policy and the risks of over-reliance. After this chapter you can draft a responsible-use policy for your research group.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Responsible AI Use | 36 |
| Academic Integrity | 9 |
| Citation of AI Use | 5 |
| AI Disclosure | 4 |
| Authorship Policy | 1 |
| Privacy | 12 |
| Confidential Data | 7 |
| Unpublished Results | 3 |
| Intellectual Property | 4 |
| Copyright | 3 |
| Licensing | 2 |
| Data Governance | 1 |
| Bias and Fairness | 2 |
| Environmental Cost | 1 |
| Dual Use Risk | 1 |
| Institutional Policy | 3 |
| Journal Policy | 1 |
| Lab AI Policy | 2 |
| Accountability | 5 |
| Transparency | 1 |
| Human Judgment | 3 |
| Over-Reliance | 2 |
| Skill Atrophy | 1 |
| Ethical Use | 1 |
| Open Educational Resources | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Research Workflows and the Researcher as Orchestrator](../01-research-workflows-orchestrator/index.md)
- [Chapter 2: How Language Models Work](../02-how-language-models-work/index.md)
- [Chapter 9: Supervising Agents and Defining Agent Roles](../09-supervising-agents-roles/index.md)
- [Chapter 13: Simulation, Testing, and Reproducible Code](../13-simulation-testing-code/index.md)
- [Chapter 15: AI-Assisted Manuscript Preparation](../15-manuscript-preparation/index.md)
- [Chapter 16: MicroSims and Research Communication](../16-microsims-communication/index.md)
- [Chapter 17: Verification and Reproducibility](../17-verification-reproducibility/index.md)

!!! mascot-welcome "Power Comes With a Paper Trail"
    ![Volt waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Everything you have built in this book makes you faster. It also makes you responsible for more output than you could write by hand. This chapter is about the promises you make when you use it: to your readers, your collaborators, your sponsors, and the people whose data you hold. Trust, but verify!

!!! info "Not legal advice"
    This chapter describes professional norms and common policies. It is not legal advice. Policies on AI use, data protection, export control, and ownership of outputs differ between institutions, funders, journals, and countries, and they change. Check your own institution's and venue's current rules, and ask your research office or counsel where the stakes are high.

## Responsibility, Accountability, and Judgment

**Responsible AI use** is the practice of using AI tools so that the work remains honest, safe to share, lawful, and fair to the people it touches. It is not a separate activity from research practice. It is what research ethics already requires, applied to a new set of tools.

The central principle is **accountability**: the researcher who uses a tool answers for what is published or acted on under their name. A tool cannot bear that responsibility, and no policy can make it. This is why the book has kept the researcher in the role of orchestrator throughout: the review gates, the acceptance criteria, and the verification of Chapters 9 to 17 are the mechanisms by which accountability is exercised. A related principle is **transparency**: others who rely on your work should be able to learn how it was made, including what was machine-assisted.

**Human judgment** is what the researcher contributes that cannot be delegated: deciding what is worth investigating, deciding which evidence is sufficient, deciding what is true, and weighing consequences. Several decisions in this chapter are of that kind, and the practical test is whether you could explain and defend the decision without referring to what the tool said.

**Ethical use** is the broader commitment that includes these: using AI in ways that you could openly describe to your field, your institution, and those affected, and that respect the interests of people who are not in the room.

!!! mascot-thinking "The Tool Cannot Take the Blame"
    ![Volt thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice what accountability does to the cost of review. When you know that your name is on the result and that "the model said so" will not be accepted, the time spent verifying stops being overhead and becomes the cost of the authorship you are claiming.

## Integrity, Disclosure, and Authorship

**Academic integrity** is the commitment to honest representation of your own work and of the sources you rely on. For AI-assisted research it raises specific questions: what counts as your contribution, when machine-generated text is presented as your own writing, and whether work submitted for assessment has been done as the assessment intends. The answers depend on context: a thesis, a journal paper, and a homework assignment carry different expectations, and the rules of each should be read and followed.

**AI disclosure** is the statement of where and how AI tools were used in a piece of work. **Citation of AI use** is the manner of recording it, usually by naming the tool, its version or model identifier, the date of use, and the purpose. Disclosure is increasingly required by journals and institutions. A sound practice is to keep a log of AI use as you work, in the audit trail of Chapter 17, so that a disclosure statement can be written accurately at the end and not reconstructed from memory.

An example of a disclosure statement, with illustrative content:

```text
Use of AI tools. An AI coding assistant (Tool X, model version Y, accessed October 2026)
was used to draft the analysis scripts for Table II and the Python code for Figures 3 to 5.
All scripts were reviewed and tested by the authors against a synthetic known-answer record.
An AI language model was used to improve the wording of Sections 2 and 6.
The authors verified all references and numerical results and take responsibility for the content.
```

**Authorship policy** is the rule about who may be credited as an author. The common position of major publishers is that authorship requires accountability and the ability to approve the final work, which AI systems cannot provide, so they are not listed as authors, and substantive use is disclosed instead. **Journal policy** is the venue's own statement of what it requires, and **institutional policy** is what your university or employer requires. These differ and are revised often. Read the author guidelines of each venue at submission time and not from memory.

A more specific rule is easier to practise than a general one. The following MicroSim applies an illustrative lab policy to scenarios. Real policies differ, and the exercise is about the reasoning.

#### Diagram: AI Use Disclosure Decision Helper

<details markdown="1">
<summary>AI Use Disclosure Decision Helper</summary>
Type: microsim
**sim-id:** ai-use-disclosure-decision-helper<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Template:** https://github.com/dmccreary/theory-of-knowledge/tree/main/docs/sims/ai-ethics-dimensions<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** apply<br/>
**Learning Objective:** The learner will apply a five-rule illustrative lab disclosure policy to eight scenarios of AI use and give the required action for each, with at least 7 of 8 correct.

**Prerequisites:** AI disclosure, citation of AI use, authorship policy, and audit trail, all defined in the section "Integrity, Disclosure, and Authorship" above and in Chapter 17.

**Evidence of Mastery:** For each of eight scenarios the learner commits one of four actions. An action is correct when it equals the action in Content under the stated policy. Mastery is at least 7 of 8 correct on the first attempt. Reading the policy is exploration and is not evidence.

**Misconceptions:** (1) Only AI-written text needs disclosure. (2) If AI was used heavily, it can be listed as an author. (3) Any use at all must be disclosed in the paper.

**Instructional Rationale:** Apply-level work needs the learner to use a stated rule on cases. The policy has gradations, so that the learner distinguishes disclosure in the paper from a project log entry and from no record.

**Content:**

The policy shown is illustrative and is labeled "illustrative lab policy, not a real venue's policy".

| Rule | Statement |
|---|---|
| 1 | Text drafted or substantially rewritten by an AI tool that appears in a submitted manuscript is disclosed in the paper. |
| 2 | AI use to generate or analyze data, code, or figures that contribute to reported results is disclosed in the paper, with the tool and version. |
| 3 | Grammar, spelling, and formatting assistance does not need to be disclosed. |
| 4 | AI use for brainstorming or literature search that does not appear in the paper is recorded in the project log only. |
| 5 | An AI system is never listed as an author. |

Action options: Disclose in the paper, Record in the project log only, No disclosure needed, Not permitted.

| # | Scenario | Correct action | Why (shown as feedback) |
|---|---|---|---|
| 1 | An agent rewrote two paragraphs of the Discussion. | Disclose in the paper | Rule 1: substantially rewritten text in the manuscript. |
| 2 | An AI tool fixed spelling and grammar in the abstract. | No disclosure needed | Rule 3: grammar and spelling assistance. |
| 3 | An agent wrote the analysis script that produced Table II. | Disclose in the paper | Rule 2: code that contributes to reported results. |
| 4 | An assistant suggested synonyms for search keywords, and you then ran the search yourself. | Record in the project log only | Rule 4: it does not appear in the paper. |
| 5 | A student wants to list the AI assistant as a co-author because it wrote the related-work section. | Not permitted | Rule 5: an AI system is never an author, and the drafted text is disclosed under rule 1. |
| 6 | An AI tool generated a figure of ENOB trends from the CSV file. | Disclose in the paper | Rule 2: a figure that contributes to reported results. |
| 7 | An assistant proposed three research ideas, you chose one and developed it yourself, and no AI text appears in the paper. | Record in the project log only | Rule 4: brainstorming that does not appear in the paper. |
| 8 | An AI tool converted the reference list to the venue's required format. | No disclosure needed | Rule 3: formatting assistance. |

**Provenance:** The practices are from the section "Integrity, Disclosure, and Authorship" of this chapter. The policy and scenarios are invented for illustration.

**Rules:** Each scenario matches exactly one rule and has exactly one correct action. Where a scenario touches two rules, the rule given in the "Why" column decides, and Rule 5 states the action as Not permitted.

**Learner Activity:**

1. The learner reads the policy and scenario 1.
2. The learner chooses one of the four actions and submits.
3. The sim shows whether it was correct, the matching rule, and the "Why" sentence.
4. After scenario 8, the sim shows the count correct and assembles a draft disclosure statement from the scenarios that required disclosure.

**Feedback:** Eight scenarios, one attempt each, in a fixed order. Correct: "Correct." plus the rule number and the "Why" sentence. Incorrect: "The policy gives <action>." plus the rule number and the "Why" sentence. The correct action is always revealed after the single attempt. A final score "n of 8 correct" is shown with whether the mastery threshold of 7 was met.

**Starting State:** The five-rule policy and scenario 1 are shown. The question on screen is "What does the policy require here?"

**Chapter Anchors:** The chapter states that AI systems are not listed as authors and that substantive use is disclosed, that a log of AI use makes disclosure accurate, and that venue and institutional policies differ and must be read at submission.
</details>

## Privacy, Confidentiality, and Governance

**Privacy** is the protection of information about people, and **confidential data** is information that you are obliged to protect, by agreement, law, or policy. Research holds both: personal data of human participants, the logs of a user study, measurement data under a sponsor's agreement, and the models and design files that a foundry or tool vendor supplies under a non-disclosure agreement. In electrical engineering the last is common. Process design kits and device models are usually restricted.

**Unpublished results** are a special case, and an easily forgotten one. They are not secret in a legal sense, but they are valuable, and placing them in a hosted AI tool is a disclosure to a third party under that provider's terms. Questions to ask of any hosted tool are whether inputs may be used to train models, how long inputs are retained and who can see them, where they are processed, and whether the contract that covers your institution differs from the consumer terms. Where the answers are not satisfactory, a local open-weight model, as in Chapter 3, keeps the data on your machine.

**Data governance** is the set of rules and responsibilities that decide how data are classified, who may access them, and how they may be shared and kept. A research group does not need an elaborate scheme. It needs a small classification that people can apply without looking it up, with a rule for what each class may be given to. The following MicroSim applies an illustrative classification.

| Class | Examples | May be given to |
|---|---|---|
| 0 Public | Published papers, public datasets, open-source code | Any tool |
| 1 Internal | Lab notes on setup, scripts, draft text without new results | An approved hosted tool, or a local model |
| 2 Unpublished | Unpublished measurements and designs of the group | A local model, or a hosted tool with the advisor's written approval |
| 3 Obligated | Data under NDA, export-controlled technical data, personal data of participants, vendor files under license | A local model only, and only if the agreement allows; otherwise no AI tool |

*Table 1. An illustrative data classification and the tools each class may be given to.*

#### Diagram: Data Sensitivity Sorter for AI Tools

<details markdown="1">
<summary>Data Sensitivity Sorter for AI Tools</summary>
Type: microsim
**sim-id:** data-sensitivity-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge which class of AI tool an item of research data may be given to under a four-class illustrative policy, for eight items, with at least 7 of 8 correct.

**Prerequisites:** privacy, confidential data, unpublished results, data governance, and the four data classes, all defined in the section "Privacy, Confidentiality, and Governance" above.

**Evidence of Mastery:** For each of eight items the learner commits one of four tool classes. A choice is correct when it equals the answer in Content. Mastery is at least 7 of 8 correct on the first attempt. Reading the classification table is exploration and is not evidence.

**Misconceptions:** (1) Only secret data are sensitive. (2) Unpublished results are fine to share if they are not under an NDA. (3) If a file is on a shared drive it may be given to any tool.

**Instructional Rationale:** Evaluate-level work needs the learner to apply a classification to concrete material. Items are chosen so that each class is tested twice, including edge cases such as an open-source script and a draft with no new results.

**Content:**

The classification is Table 1 above and is labeled "illustrative policy" in the sim. Tool classes: Any tool; Approved hosted tool or local; Local model, or hosted with the advisor's approval; Local model only, if the agreement allows.

| # | Item | Correct tool class | Why (shown as feedback) |
|---|---|---|---|
| 1 | A published IEEE paper in PDF form | Any tool | Class 0: it is public. |
| 2 | An open-source simulation script from a public repository | Any tool | Class 0: it is public. |
| 3 | Your lab-notebook entries about the test bench setup | Approved hosted tool or local | Class 1: internal, with no new results. |
| 4 | Your draft Methods section, which has no new results | Approved hosted tool or local | Class 1: internal draft text. |
| 5 | Unpublished measured ENOB data for your group's chip | Local model, or hosted with the advisor's approval | Class 2: unpublished results of the group. |
| 6 | A new circuit netlist that has not been published or filed | Local model, or hosted with the advisor's approval | Class 2: unpublished design, and disclosure may affect later protection. |
| 7 | Foundry process design kit model files under NDA | Local model only, if the agreement allows | Class 3: vendor files under license and NDA. |
| 8 | Interview transcripts with identifiable participants from a user study | Local model only, if the agreement allows | Class 3: personal data of participants, governed by the consent and ethics approval. |

**Provenance:** The classification is from the section "Privacy, Confidentiality, and Governance" of this chapter. The items are invented for illustration.

**Rules:** Each item belongs to exactly one class, and the class decides the tool class as in Table 1. An item that falls in two classes takes the more restrictive one.

**Learner Activity:**

1. The learner reads item 1 and the classification.
2. The learner chooses one of the four tool classes and submits.
3. The sim shows whether it was correct, the item's class, and the "Why" sentence.
4. After item 8, the sim shows the count correct and groups the items by class.

**Feedback:** Eight items, one attempt each, in a fixed order. Correct: "Correct." plus the class and the "Why" sentence. Incorrect: "This item is <class>, so <tool class>." plus the "Why" sentence. The correct answer is always revealed after the single attempt. A final score "n of 8 correct" is shown with whether the mastery threshold of 7 was met.

**Starting State:** The classification and item 1 are shown with four tool classes. The question on screen is "Which tools may receive this?"

**Chapter Anchors:** The chapter states that hosted tools are a disclosure to a third party, that a local model keeps data on your machine, and that vendor files under NDA, export-controlled data, and participants' personal data are the most restricted.
</details>

!!! mascot-warning "The Paste Is Not Undoable"
    ![Volt warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is pasting unpublished measurements or vendor files into a hosted assistant to save time. It happens because the tool is open in the next window and the paste feels like a draft. A disclosure cannot be undone. Classify before you paste, and if you are unsure, use the local model or ask first.

## Ownership, Licensing, and Open Resources

**Intellectual property** is the set of rights over creations: inventions, writings, designs, and code. **Copyright** is the right over original expression, and it bears on AI use in two ways: whether material you give a model may be used, and what the status of the material it returns is. Rules on whether AI-generated output can be owned, and by whom, differ between jurisdictions and are still developing, and the terms of the tool's provider add their own conditions. This is a place to follow the policy of your institution and not to rely on a book.

**Licensing** is the grant of permissions by an owner. Practical points apply to research. Code that an agent produces can resemble code that it was trained on, so check the license of anything substantial that you adopt, and record where it came from. Libraries and data you use carry licenses that constrain redistribution. And when you share your own work, choose a license deliberately: permissive licenses such as MIT for code, and Creative Commons licenses for text and figures.

**Open educational resources** are teaching and learning materials released under open licenses so that others may use, adapt, and share them. The MicroSims and textbooks of the author's projects are released this way, and a MicroSim that illustrates a result can be shared the same way, with the license stated on its lesson page, so that other instructors can use it. Check the license of any sim you reuse before you build on it, as the reuse step of Chapter 16 requires.

## Fairness, Environment, and Dual Use

**Bias and fairness** concern whether AI output and the processes built on it treat people and topics even-handedly. For research the relevant forms are the output bias of Chapter 17, such as a literature survey that draws on a narrow slice of venues, regions, or languages, and, when AI is used on data about people, whether the system performs worse for some groups. Checks are the same ones as for correctness: examine what is missing, vary the inputs, and compare across groups.

**Environmental cost** is the energy and resources used by AI computation. It is real, varies greatly between models and tasks, and is rarely visible to the user. Without specific numbers, which change quickly, the practical measures are the cost-control measures of Chapter 9: use the smallest model that does the job, avoid loops and sweeps that nobody will read, and cache or reuse results.

**Dual use risk** is the possibility that a capability built for a beneficial purpose can be used for harm. In electrical engineering this can arise in areas such as radio-frequency systems, power infrastructure, security of embedded devices, and sensing. The practical duties are to know your institution's export-control and research-security rules, to consider foreseeable misuse when sharing detailed methods, and to decline requests that you would not make openly.

## Dependence and Skill

**Over-reliance** is accepting AI output without the checks it requires, because it is usually right. It is the behavioral counterpart of overconfidence, and the better the tool, the stronger the temptation. **Skill atrophy** is the loss of your own ability through disuse, and it is a particular concern for students and early-career researchers, for whom the work that agents now do quickly is also the work by which expertise was built. The risk is not that the tool makes errors. It is that you stop being able to detect them.

Practices that counter both are small and deliberate:

- Do the first derivation, the first debugging pass, or the first draft of a core argument yourself, and use the tool to critique it.
- Ask the agent to explain, and then explain it back in your own words before you accept it. If you cannot, you do not yet understand it.
- Keep a short list of skills that you intend to retain, and practise them without the tool at intervals.
- For supervisors, design assignments so that students show their reasoning, not only the result.

!!! mascot-encourage "Writing a Policy Feels Bureaucratic"
    ![Volt encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If drafting a lab policy feels like paperwork that nobody wants, that reaction is common. Think of it as the acceptance criteria for your group's use of AI: a page that settles in advance the questions that would otherwise be argued under deadline pressure.

## A Lab AI Policy

A **lab AI policy** is a short written statement of how a research group uses AI tools. It converts the principles of this chapter into rules that a new student can follow on the first day. One page is enough. A skeleton:

```markdown
# Lab AI Use Policy (version, date, owner)

## 1. Purpose and scope
Who this applies to and which tools it covers.

## 2. Accountability
Authors are accountable for all content. AI is never an author.

## 3. Data classes and permitted tools
Table of the four data classes and the tools each may be given to.

## 4. Disclosure
What is disclosed, where, and how it is recorded (project log, then paper).

## 5. Verification standard
Minimum checks by stakes (known-answer tests, primary-source checks,
reproducibility package for submitted work).

## 6. Approved tools and accounts
The list of tools, the plan or contract that applies, and who may approve exceptions.

## 7. Skills and training
Tasks to be done without AI at set stages; expectations for explaining AI-assisted work.

## 8. Review
Reviewed every six months and whenever a venue or institution changes its rules.
```

!!! mascot-tip "Policy Is a File in the Repository"
    ![Volt offering a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Keep the lab policy as a Markdown file in the group's repository, and link it from each project's AGENTS.md. Then agents read it at the start of every session, the history shows when it changed and why, and a new student gets it with the code.

## Summary and Key Takeaways

Responsible use is the same research integrity as before, applied to a tool that produces output at a pace that makes lapses easy. The practices are simple to state: be accountable, disclose, protect what is entrusted to you, respect ownership, check for bias, and keep your own skill.

The main points to carry forward:

- **Accountability and human judgment** cannot be delegated. **Transparency** lets others see how the work was made.
- **Disclosure and citation of AI use** follow venue and institutional policy, and a log kept as you work makes the statement accurate. AI is not an author.
- **Privacy and confidential data** include participants' data and vendor files under NDA. **Unpublished results** pasted into a hosted tool are disclosed to a third party.
- **Data governance** is a small classification that maps each class to permitted tools.
- **Intellectual property, copyright, and licensing** vary by jurisdiction and provider. Check licenses and record provenance. **Open educational resources** are shared deliberately under stated licenses.
- **Bias, environmental cost, and dual use** are handled with checks, with proportionate model use, and with attention to misuse.
- **Over-reliance and skill atrophy** are countered by doing core work yourself and explaining what you accept.
- **A lab AI policy** is a one-page file in the repository, reviewed regularly.

!!! mascot-celebration "A Policy You Could Hand a New Student"
    ![Volt celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now apply a disclosure rule to a scenario, classify data before it meets a tool, name the risks of ownership, bias, and dependence, and write a one-page policy for your group. That is how accountability becomes a habit of a lab.

The next chapter examines a class of tools that make these questions pressing, because they work while you are away. Round up the permissions you would be willing to grant, and bring them.
