# Glossary of Terms

#### Abstract Writing
The creation of a concise, self-contained summary stating the research context, objective, method, principal results, and significance without unsupported claims.

**Example:** An abstract reports the measured efficiency improvement and test conditions. See also: Technical Editing.
#### Academic Integrity
Adherence to scholarly standards of honesty, attribution, originality, evidence, and accountability when AI contributes to research or teaching.

**Example:** A student identifies agent assistance, verifies citations, and does not submit generated analysis as independently performed work. See also: Citation of AI Use; AI Disclosure.
#### Acceptance Criteria
Observable, testable conditions that determine whether a task output is satisfactory. Criteria should cover required functionality, correctness, format, evidence, and relevant constraints, enabling consistent human or automated review.

**Example:** Code passes named tests, reproduces a reference curve within tolerance, and contains no network calls. See also: Prompt Testing.
#### Acceptance Review
A formal decision point at which designated reviewers determine whether an AI-produced artifact satisfies predefined technical, ethical, and documentation criteria.

**Example:** A principal investigator approves a generated dataset only after checks for provenance, licensing, and statistical validity. See also: Peer Verification.
#### Accountability
The assignment and acceptance of responsibility for AI-assisted decisions, actions, outputs, and resulting consequences.

**Example:** The lead researcher remains answerable for erroneous citations even when an agent produced the bibliography. See also: Transparency; Human Judgment.
#### Adoption Plan
A staged strategy for introducing an AI capability, including objectives, stakeholders, training, controls, evaluation metrics, costs, and rollback conditions.

**Example:** A lab pilots a literature agent on public data before considering confidential projects. See also: Personal Agent Selection.
#### Agent Autonomy
The degree to which an AI agent acts independently, making decisions and executing operations without requiring per-step human confirmation or intervention.

**Example:** A high-autonomy agent refactors an entire simulation codebase overnight; a low-autonomy agent proposes each change for approval. Contrast with: Agent Supervision, Human Approval Gate.
#### Agent Blast Radius
The maximum scope of data, systems, resources, or people that could be affected if an agent fails, is misdirected, or is compromised.

**Example:** Read-only sandbox access limits a faulty agent to copied public datasets. See also: Dual Use Risk.
#### Agent Comparison Criteria
A defined set of measurable factors used to evaluate agents consistently, such as accuracy, autonomy, security, privacy, cost, interoperability, and auditability.

**Example:** Candidates complete the same benchmark under identical tool permissions. See also: Personal Agent Selection.
#### Agent Data Exposure
The information an agent, its provider, connected tools, or unintended parties can access, retain, infer, or transmit during operation.

**Example:** Browser history becomes exposed when a cloud agent receives an unrestricted profile. See also: Privacy; Delegated Sign-In.
#### Agent Evaluation
The systematic assessment of an AI agent's performance against defined criteria, including task success rate, output quality, resource consumption, and adherence to constraints.

**Example:** A team benchmarks two coding agents on a suite of firmware bugs to measure fix accuracy. See also: Agent Specification, Reviewer Agent.
#### Agent Failure Modes
Characteristic patterns by which AI agents malfunction, including infinite loops, hallucinated outputs, tool misuse, context loss, and silent abandonment of tasks.

**Example:** An agent enters a failure mode where it repeatedly retries a failing API call without adjusting parameters. See also: Runaway Agent, Agent Supervision.
#### Agent Handoff
The transfer of a task, context, and intermediate results from one agent to another, or from an agent to a human, at defined transition points in a workflow.

**Example:** A literature agent hands a filtered paper list to an analysis agent for full-text review. See also: Handoff Protocol, Agent Team.
#### Agent Hooks
Configured event-driven actions that run at defined points in an agent workflow, such as before a tool call or after a file change.

**Example:** A post-edit hook automatically formats modified Python files. See also: Agent Loop; Tool Use.
#### Agent Logging
The systematic recording of an agent's actions, decisions, tool calls, and outputs to persistent files, enabling auditing, debugging, and reproducibility of agent-driven work.

**Example:** A log records every shell command an agent ran while processing a dataset, allowing the researcher to reconstruct its steps. See also: Progress Tracking, Status Reporting.
#### Agent Loop
An iterative control cycle in which an agent observes state, selects an action, uses a tool or reasons, evaluates the result, and continues until a stopping condition.

**Example:** An agent edits code, runs tests, diagnoses failure, and revises the edit. See also: Tool Use; Prompt Chaining.
#### Agent Memory
Information retained or retrieved by an agent across interaction steps or sessions to preserve relevant context and prior outcomes.

**Example:** An agent remembers the user’s preferred unit convention during later analyses. Contrast with: Project Memory. See also: Session Log.
#### Agent Ratio
The proportion between different agent roles in a multi-agent system, commonly expressed as the number of execution agents per planning or reviewing agent.

**Example:** A 3:1 agent ratio assigns three execution agents to each planning agent for parallel experimentation. See also: Agent Team, Scaling Agent Teams, Span of Control.
#### Agent Roles
Defined functional specializations assigned to agents within a multi-agent system, each specifying responsibilities, permitted actions, and expected outputs.

**Example:** A team assigns the roles of planner, executor, and reviewer to three agents analyzing a circuit dataset. See also: Agent Team, Agent Specification.
#### Agent Skill
A reusable package of instructions and optional resources that enables an agent to perform a defined task consistently.

**Example:** A skill guides an agent through extracting Bode-plot features from measurement files. See also: SKILL.md File; Single Purpose Skill; Supporting Files.
#### Agent Specification
A formal description of an agent's role, capabilities, inputs, outputs, constraints, and success criteria, used to instantiate and evaluate the agent within a workflow.

**Example:** An agent specification states that the screening agent accepts a search query and returns at most twenty ranked papers. See also: Agent Roles, Agent Evaluation.
#### Agent Supervision
The practice of monitoring, constraining, and reviewing an AI agent's actions to ensure its behavior remains aligned with research goals and safety constraints.

**Example:** A researcher watches an agent's command stream and pauses it when it attempts to delete raw measurement files. See also: Agent Autonomy, Runaway Agent, Human Approval Gate.
#### Agent Team
A coordinated group of AI agents with complementary roles that collaborate on a complex task under a shared objective, typically managed by an orchestrator or human.

**Example:** A four-agent team divides a literature review across search, screening, summarization, and writing roles. See also: Agent Roles, Orchestrator, Scaling Agent Teams.
#### Agent Team Design
The specification of agent roles, capabilities, communication paths, shared resources, authority limits, and coordination mechanisms for a multi-agent task.

**Example:** Separate agents search literature, reproduce calculations, and audit citations under a human coordinator. See also: Group Workflow.
#### Agentic Research
A mode of research in which AI agents perform bounded portions of scholarly workflows using tools, intermediate state, and feedback. Researchers remain accountable for objectives, evidence, validation, ethics, and final claims.

**Example:** Agents search papers, extract metadata, and prepare an auditable evidence table for human review. See also: Researcher as Orchestrator.
#### AGENTS.md File
A conventionally named Markdown project instruction file containing repository guidance for compatible coding or research agents, potentially scoped by directory.

**Example:** `simulation/AGENTS.md` requires generated SPICE netlists to use SI units. See also: Project Instruction File; CLAUDE.md File.
#### AI Agent
A software system that uses an AI model to pursue a specified objective through iterative observation, planning, tool use, and action. Its authority, environment, stopping conditions, and human oversight determine its operational risk.

**Example:** An agent edits simulation code, runs tests, inspects failures, and revises the implementation. See also: Human in the Loop; Task Decomposition.
#### AI Assistant
An AI-based tool that responds to user requests by providing information, transformations, recommendations, or generated artifacts, generally under direct user control. It supports tasks without necessarily planning or executing an extended workflow autonomously.

**Example:** A chat tool summarizes reviewer comments. Contrast with: AI Agent.
#### AI Disclosure
A statement describing whether and how AI systems contributed to an academic work, including their roles, scope, and level of human oversight.

**Example:** Authors disclose that an agent edited prose and generated test scaffolds but did not interpret experimental results. See also: Citation of AI Use.
#### Always-On Agent
A continuously available agent that monitors events or accepts tasks over extended periods rather than only during an interactive session.

**Example:** An agent watches simulation jobs and reports failures overnight. See also: Overnight Activity Audit; Agent Blast Radius.
#### Analogical Thinking
Reasoning that transfers relational structure from a familiar source domain to a target problem while explicitly checking where the correspondence fails.

**Example:** Queueing behavior is used to reason about packet congestion in an on-chip network. See also: Idea Generation.
#### Analysis Agent
An AI agent specialized in processing data, computing statistics, generating visualizations, and interpreting quantitative results within a research or engineering context.

**Example:** An analysis agent computes BER curves from raw receiver measurements and identifies anomalous outliers. See also: Exploratory Analysis, Research Agent.
#### Analysis Script
An executable program that transforms research data into derived quantities, statistical results, tables, or figures through a documented sequence of operations. It should expose inputs, parameters, outputs, and failure conditions.

**Example:** A script reads trial data, rejects specified artifacts, and calculates mean latency. See also: Notebook to Script.
#### Annotated Bibliography
A list of references in which each entry is accompanied by a brief descriptive or evaluative note summarizing the source's content, quality, and relevance.

**Example:** The annotated bibliography includes forty entries, each noting the method used and its applicability to the thesis. See also: Reference Manager, Literature Review.
#### API Access
Programmatic use of a hosted model through a defined network interface for submitting inputs and receiving outputs or tool events. APIs introduce authentication, pricing, availability, data-governance, versioning, and Rate Limit considerations.

**Example:** A Python script sends batch classification requests to a model endpoint. See also: Token Cost; Latency.
#### API Integration
A configured connection through which software or an agent exchanges structured requests and responses with an external service’s application programming interface.

**Example:** An agent submits a job to a cloud electromagnetic solver and retrieves status results. See also: MCP Server; External Data Sources; Tool Definition.
#### arXiv Submission
The preparation and deposit of a manuscript and source files in the arXiv preprint repository under an appropriate category, license, and metadata record.

**Example:** Authors upload compilable LaTeX sources after checking institutional policy. See also: Authorship; Venue Requirements.
#### Audit Trail
A chronological, attributable record of prompts, actions, tool calls, data access, intermediate artifacts, decisions, and outputs within an AI-assisted workflow.

**Example:** A log connects each plotted value to its source file, processing script, agent run, and reviewer approval. See also: Transparency; Error Tracing.
#### Author Voice
The recognizable pattern of reasoning, emphasis, terminology, and prose choices through which authors communicate their scholarly perspective. AI assistance should preserve deliberate authorial judgment and accountability.

**Example:** A researcher consistently distinguishes measured evidence from interpretation. See also: Authorship; Style Consistency.
#### Authorship
Formal attribution to people who made qualifying intellectual contributions, approved the work, and accept accountability for its integrity under applicable policies. AI systems are tools rather than accountable authors.

**Example:** Contributors document roles before manuscript submission. See also: Co-Author Review.
#### Authorship Policy
A rule set defining eligibility, responsibilities, attribution, and prohibited claims of authorship when AI systems participate in scholarly production.

**Example:** A journal permits disclosure of AI assistance but bars models from author status because they cannot accept responsibility. See also: Journal Policy.
#### Background Tasks
Operations executed asynchronously without blocking interactive work, allowing long-running computations or agent activities to proceed while the user performs other tasks.

**Example:** An agent runs a parameter sweep as a background task while the researcher reviews its earlier summary. See also: Task Scheduling, Task Queue.
#### Backlinks
References showing which documents, notes, or entities link to a selected item, enabling reverse navigation and contextual discovery.

**Example:** A paper note lists every project page that cites it. See also: Personal Knowledge Graph.
#### Bias and Fairness
The study and management of systematic disparities in AI inputs, behavior, performance, or impacts across relevant populations or conditions.

**Example:** Researchers compare diagnostic-model error rates across device types and patient groups rather than reporting only aggregate accuracy. See also: Output Bias.
#### BibTeX
A plain-text bibliography format and associated toolchain used with LaTeX to define citation entries and automatically generate formatted reference lists.

**Example:** The agent exports all verified citations as a BibTeX file with consistent keys for the LaTeX manuscript. See also: Reference Manager, DOI Lookup.
#### Brainstorming
A divergent ideation activity that generates multiple candidate questions, explanations, designs, or experiments before evaluation. AI-supported brainstorming expands the option set but does not establish novelty, feasibility, or scientific validity.

**Example:** An AI Assistant proposes alternative antenna geometries that researchers subsequently screen against physical constraints.
#### Branch
A movable version-control reference that supports an independent line of development or experimentation.

**Example:** An agent creates a branch to evaluate a new channel estimator without altering the validated baseline. See also: Git; Git Commit; Diff Review.
#### Capstone Project
A culminating, integrative assignment in which learners design, execute, validate, and communicate an AI-assisted engineering research workflow.

**Example:** A student team builds agents to survey and reproduce a published signal-processing method. See also: Agent Team Design; Presentation of Results.
#### Case Study
A structured examination of a bounded real or representative situation used to connect methods, decisions, evidence, and outcomes.

**Example:** A chapter follows an agent team from literature search through verification of a power-converter design. See also: Lessons Learned; Failure Case.
#### Chain of Thought
A sequence of intermediate reasoning expressed or internally computed between a problem and its answer. Requesting visible reasoning can aid inspection in some settings, but fluent steps are not proof of correctness and may be unreliable.

**Example:** A model decomposes a link-budget calculation into gains, losses, and noise terms. See also: Reasoning Model.
#### Chat Interface
An interactive, turn-based user interface for exchanging messages with an AI model or agent. It supports rapid exploration but can obscure hidden context, version changes, and reproducibility unless conversations and settings are recorded.

**Example:** A student iteratively asks for explanations of a derivation. Contrast with: Command Line Interface.
#### Circuit Simulation
The numerical evaluation of an electrical circuit model to predict quantities such as voltages, currents, timing, noise, or frequency response under stated assumptions.

**Example:** SPICE estimates startup behavior for a power converter. See also: Verification; Validation.
#### Citation Chaining
A literature discovery method that follows references backward from a paper and citations forward to it, expanding coverage beyond keyword searches.

**Example:** Citation chaining from a foundational SDR paper uncovers a recent survey missed by keyword queries. See also: Search Strategy, Scholarly Databases.
#### Citation of AI Use
A structured acknowledgment that identifies an AI system or generated artifact when required for traceability, attribution, or reproducibility.

**Example:** A methods note records the model, version, access date, prompt context, and role in code generation. Contrast with: AI Disclosure.
#### Citation Verification
The process of confirming that a cited reference exists, that bibliographic details are accurate, and that the cited source actually supports the claim attributed to it.

**Example:** Citation verification reveals that one agent-generated reference has a fabricated title and must be removed. See also: DOI Lookup, Source Quality, Claim Extraction.
#### Claim Extraction
The identification and isolation of specific factual assertions, findings, or contributions made within a source document, typically for verification or synthesis.

**Example:** Claim extraction pulls "the ADC achieves 9.1 ENOB at 1 GS/s" from the paper's results section. See also: Evidence Synthesis, Citation Verification.
#### Clarifying Questions
Targeted requests for missing or ambiguous information that materially affects task interpretation, method, risk, or output. They should be asked before irreversible work when reasonable defaults cannot safely resolve uncertainty.

**Example:** An agent asks whether measured voltage values are RMS or peak before analysis. See also: Task Specification.
#### Claude Cowork
An agent-oriented collaboration capability associated with Claude that supports work across user-directed tasks, tools, or artifacts.

**Example:** A team assesses Claude Cowork using a reproducible document-analysis benchmark. See also: Agent Comparison Criteria.
#### CLAUDE.md File
A conventionally named Markdown instruction file that supplies project context and operating guidance to Claude-compatible agents.

**Example:** `CLAUDE.md` identifies validation commands and prohibits editing instrument calibration data. See also: Project Instruction File; AGENTS.md File.
#### Clear Instructions
Task directions that state the objective, scope, inputs, required operations, output, constraints, and decision rules in unambiguous language. Clarity reduces avoidable interpretation differences but does not replace domain validation.

**Example:** “Return one row per device, preserve SI units, and flag missing calibration dates.” See also: Task Specification.
#### Cloud Agent Computer
A remotely hosted computing environment in which an agent operates applications, files, browsers, and tools on a user’s behalf.

**Example:** A researcher provisions an isolated cloud desktop for automated literature retrieval. Contrast with: Self-Hosted Agent.
#### Co-Author Review
The documented examination of a manuscript by all listed authors to verify content, contributions, disclosures, accuracy, and approval before dissemination.

**Example:** Each author checks sections tied to their experiments and approves the final draft. See also: Authorship; Peer Review Response.
#### Code Blocks
Delimited regions of a document that preserve code, commands, configuration, or literal text, often with an optional language identifier for highlighting.

**Example:** A fenced `python` block contains the script used to analyze oscilloscope samples. See also: Markdown Syntax; Shell Commands.
#### Code Documentation
Explanatory material that states software purpose, interfaces, assumptions, dependencies, usage, limitations, and important implementation decisions. It supports correct reuse beyond merely restating program syntax.

**Example:** A function docstring specifies expected signal units and array dimensions.
#### Code Execution
The running of program instructions in a specified runtime environment to compute results or perform operations.

**Example:** An agent executes Python to estimate confidence intervals from measured data. See also: Shell Commands; Sandboxing; Scripts in Skills.
#### Code Review
A structured examination of source code by a person or qualified agent to identify defects, unclear assumptions, security risks, maintainability problems, and deviations from project standards.

**Example:** A colleague checks whether array indexing shifts reconstructed signal timestamps. See also: Independent Check; Co-Author Review.
#### Coding Agent
An AI agent specialized in writing, modifying, debugging, and testing software code according to specified requirements within a defined development environment.

**Example:** A coding agent implements a Kalman filter in Python and writes unit tests for it. See also: Agent Roles, Jupyter Notebook.
#### Command Line Interface
A text-based interface in which users invoke programs with commands, arguments, files, and streams. For AI research tools, a CLI supports scripting, composability, logging, and repeatable execution more readily than ad hoc chat.

**Example:** A shell command runs an agent against a versioned task specification. Contrast with: Chat Interface.
#### Comparison Table
A structured matrix that aligns multiple sources, methods, or systems against shared attributes or metrics, enabling direct cross-entry evaluation.

**Example:** A comparison table lists six accelerators against throughput, energy per inference, and process node. See also: Evidence Synthesis, Literature Review.
#### Completion
The sequence generated by a model in response to supplied context. A completion may contain prose, code, structured data, or tool requests and remains a model output requiring evaluation against acceptance criteria.

**Example:** The returned JSON object is the completion for a schema-constrained prompt. See also: Structured Output.
#### Concept Dependency
A directed relationship indicating that understanding or performing one concept materially relies on knowledge or skill associated with another.

**Example:** Small-signal transistor analysis depends on operating-point analysis. See also: Learning Graph; Research Roadmap.
#### Confidential Data
Information subject to contractual, institutional, professional, or fiduciary restrictions on access and disclosure.

**Example:** Prepublication partner specifications are stored in an approved enclave and withheld from public AI services. See also: Data Governance; Unpublished Results.
#### Conflict Resolution
The process of detecting and reconciling incompatible actions or outputs produced by multiple agents, such as simultaneous edits to the same file or contradictory conclusions.

**Example:** When two agents propose different filter parameters, the orchestrator sends both versions to the reviewer agent for adjudication. See also: Shared Workspace, Reviewer Agent.
#### Constraints
Mandatory boundaries or conditions that a solution or process must satisfy, such as physical limits, permitted sources, time budgets, safety rules, or software interfaces. Constraints should be testable and distinguished from preferences.

**Example:** A generated filter design must use available component values and remain below a power limit. See also: Acceptance Criteria.
#### Context Compression
The reduction of context length while preserving information needed for a task, using summarization, extraction, deduplication, structured state, or selective omission. Compression must manage the risk of losing exceptions, provenance, or uncertainty.

**Example:** Completed agent steps are replaced by a verified state table and links to full logs. See also: Summarization; Context Limit.
#### Context Engineering
The design of all information and state supplied to a model, including prompts, retrieved sources, tool outputs, memory, history, and compression. Its goal is to provide sufficient, relevant, trustworthy context within operational limits.

**Example:** An agent receives only the affected source files, specification, and failing tests. See also: Context Selection; Context Compression.
#### Context Isolation
The deliberate separation of memory, files, and conversational state between agents or tasks so that information from one does not contaminate another's reasoning.

**Example:** Each simulation subtask runs in an isolated context so speculative hypotheses do not bias independent analyses. See also: Trust Boundary, Shared Workspace.
#### Context Limit
The maximum token capacity supported for a model invocation, usually shared between input and output according to provider rules. Exceeding it causes rejection, truncation, or loss of earlier material.

**Example:** A long report must be chunked because its tokens exceed the model’s limit. See also: Context Window; Context Compression.
#### Context Selection
The process of choosing which instructions, sources, examples, history, and tool results to include for a model invocation. Selection balances relevance, authority, completeness, privacy, and token capacity while excluding distracting material.

**Example:** Only API documentation matching the installed simulator version is supplied. See also: Context Engineering.
#### Context Window
The set of tokens available to a model during a single inference, including instructions, conversation, retrieved material, tool results, and generated output. Information outside this active window cannot directly influence that inference.

**Example:** A prompt includes a specification, relevant source files, and recent test output. See also: Context Limit; Context Selection.
#### Conversation History
The ordered record of prior messages, outputs, tool events, and possibly hidden state available in an interaction. History can provide continuity but may also propagate obsolete assumptions, errors, sensitive information, and excessive token use.

**Example:** An agent retains the user’s approved unit convention across turns. See also: Context Window.
#### Copyright
A legal right protecting qualifying original expression and governing reproduction, adaptation, distribution, display, and related uses.

**Example:** A researcher does not assume that an agent-generated textbook figure may freely reproduce elements from a copyrighted source. See also: Licensing.
#### Cost and Benefit
The comparative assessment of the resources consumed by an approach, such as compute, time, and money, against the value of results it produces, guiding orchestration decisions.

**Example:** A cost and benefit analysis shows that adding a fifth analysis agent yields little speedup because the bottleneck is data I/O. See also: Cost Control, Scaling Agent Teams.
#### Cost Control
The set of policies, budgets, and monitoring mechanisms that bound the financial and computational expense incurred by AI agents during research operations.

**Example:** A lab sets a per-task token budget and alerts when cumulative model usage exceeds twenty dollars per day. See also: Runaway Agent, Agent Supervision.
#### Counterexamples
Examples that violate a proposed rule, belong outside a category, or expose failure at a decision boundary. In prompts and tests, they clarify exclusions and prevent overgeneralization from positive demonstrations.

**Example:** A syntactically valid citation with a nonexistent DOI is labeled unacceptable. See also: Few-Shot Examples; Prompt Testing.
#### Cover Letter
A brief submission document addressed to an editor that identifies the manuscript, explains its fit and contribution, and supplies required declarations without exaggerating results.

**Example:** The letter notes related preprints and confirms exclusive consideration. See also: Venue Requirements.
#### Credential Handling
The secure management of authentication secrets such as API keys, passwords, and tokens, ensuring agents access services without exposing credentials in logs or outputs.

**Example:** An agent reads an API key from an environment variable rather than embedding it in generated scripts. See also: Trust Boundary, Database Access.
#### Cross Model Check
The comparison of outputs or reasoning from different AI models to identify disagreements, omissions, or model-specific artifacts; agreement alone does not establish truth.

**Example:** Two models derive a transfer function, followed by manual verification. See also: Independent Check; Verification.
#### Cross References
Explicit links from one information element to related elements, enabling navigation and clarifying conceptual relationships.

**Example:** A fault-diagnosis definition links to the entries for anomaly detection and classification. See also: Glossary File; Reference Documents.
#### CSV and JSON
Two common text-based data interchange formats: CSV represents tabular rows and columns, while JSON represents nested objects and arrays. Both require conventions for types, units, missing values, and schemas.

**Example:** CSV stores sweep results; JSON stores each run’s configuration. See also: Data Formats.
#### Data Analysis
The application of statistical, computational, or visual methods to transform observations into evidence bearing on a research question. Valid analysis states assumptions, handles uncertainty, preserves provenance, and distinguishes exploratory findings from confirmatory tests.

**Example:** Estimating confidence intervals for bit-error rate across repeated measurements.
#### Data Cleaning
The process of detecting and correcting or removing errors, inconsistencies, duplicates, missing values, and outliers in a dataset before analysis.

**Example:** Data cleaning removes timestamped rows where the sensor recorded physically impossible negative voltages. See also: Measurement Data, Exploratory Analysis.
#### Data Formats
Defined conventions for representing, organizing, encoding, and exchanging data, including field types, structure, units, and metadata. Format choice affects interoperability, precision, scale, and preservation.

**Example:** HDF5 stores large multidimensional measurement arrays with attributes. See also: CSV and JSON.
#### Data Governance
The policies, roles, controls, and processes that regulate data ownership, quality, access, storage, retention, sharing, and disposal.

**Example:** A project classifies measurement data and assigns approval requirements before agents can retrieve it. See also: Confidential Data; Privacy.
#### Data Provenance
Recorded information describing where data originated, how it was acquired, and which transformations, agents, parameters, and versions produced subsequent forms.

**Example:** Metadata links each processed spectrum to its raw trace and calibration file. See also: Primary Source Check; Reproducible Environment.
#### Data Visualization
The graphical representation of data selected to reveal patterns, comparisons, distributions, or uncertainty without distorting the underlying evidence. Effective visualizations align encodings, scales, and annotations with the intended analytical question.

**Example:** A heat map shows error magnitude across voltage and temperature. Contrast with: Plotting.
#### Database Access
The capability of an AI agent to connect to, query, and modify structured data stores using protocols such as SQL or database APIs, enabling retrieval and persistence of research data.

**Example:** An agent issues a SELECT query against a PostgreSQL database containing simulation results to compare parameter sweeps. See also: Credential Handling, Trust Boundary.
#### Debugging
The systematic process of locating, explaining, and correcting defects that cause software or computational workflows to depart from specified behavior. Debugging uses observable evidence rather than unstructured trial and error.

**Example:** A researcher traces a dimension mismatch through preprocessing stages. See also: Error Messages; Silent Errors.
#### Decision Log
A chronological record of consequential project choices, their rationale, considered alternatives, and implications.

**Example:** An entry explains why HDF5 was selected over CSV for multichannel waveform storage. Contrast with: Session Log. See also: Project Memory.
#### Delegated Sign-In
A controlled authorization mechanism allowing an agent to access a service using user-approved credentials or tokens without receiving the user’s primary secret.

**Example:** OAuth grants an agent read-only access to a paper library. See also: Agent Data Exposure.
#### Delegation
The assignment of responsibility for a task or decision from a researcher or controller agent to another agent, including the authority and constraints under which it operates.

**Example:** The researcher delegates citation formatting to a writing agent while retaining control of the paper's argument. See also: Agent Roles, Span of Control, Researcher Attention.
#### Dependency Management
The controlled declaration, resolution, versioning, and updating of software packages and tools required by a project. It reduces incompatibility and hidden changes across machines or time.

**Example:** A lockfile records exact numerical-library versions. See also: Reproducible Environment.
#### Devils Advocate Prompt
An instruction directing an AI agent to challenge a proposal by seeking counterexamples, hidden assumptions, alternative explanations, risks, and disconfirming evidence.

**Example:** “Argue why this observed gain may be a calibration artifact.” See also: Independent Check; Uncertainty Awareness.
#### Diff Review
The systematic inspection of line-level changes between artifact versions to assess correctness, scope, risk, and unintended modifications.

**Example:** A researcher checks that an agent changed only the requested model parameters. See also: Git Commit; Branch; Skill Evaluation.
#### Documentation as Code
A practice of maintaining documentation in text-based, version-controlled files using review, testing, and automation processes analogous to software development.

**Example:** A CI check validates links and builds the laboratory handbook after each commit. See also: Markdown; Version Control.
#### DOI Lookup
The retrieval of metadata or the full record of a publication by resolving its Digital Object Identifier through registries such as Crossref.

**Example:** A DOI lookup confirms the paper's publication venue, date, and author list for the bibliography. See also: Citation Verification, BibTeX, Reference Manager.
#### Domain Vocabulary
The controlled set of specialized terms, symbols, abbreviations, and meanings used within a research discipline or project. It improves precision when people and agents formulate queries, specifications, and results.

**Example:** A power-electronics vocabulary distinguishes switching frequency from fundamental frequency. See also: Glossary File; Naming Conventions.
#### Dots
A named agent product or framework evaluated in the textbook as a candidate for personal or research automation. Its capabilities should be established from tested behavior and current documentation.

**Example:** Students score Dots against privacy, tool access, and auditability criteria. See also: Vendor Claim Verification.
#### Drafting
The production of an initial coherent version of research prose from verified notes, evidence, and an argument plan. Drafting prioritizes substantive completeness before final stylistic refinement.

**Example:** A researcher writes the methods section from laboratory records. See also: Revision; Author Voice.
#### Dual Use Risk
The possibility that research, tools, or knowledge intended for beneficial purposes can also enable harmful, unsafe, or unlawful applications.

**Example:** An autonomous RF-testing agent could optimize communications resilience or facilitate unauthorized interference. See also: Agent Blast Radius.
#### Electrical Engineering Research
Systematic investigation that creates or validates knowledge about electrical, electronic, photonic, electromagnetic, control, communication, computing, or energy systems. It commonly combines mathematical models, simulation, hardware, measurement, and uncertainty analysis.

**Example:** A study develops and experimentally validates a converter control method.
#### Embedding
A numerical vector representation learned or computed to encode selected semantic or structural properties of an item. Embeddings enable similarity comparison but can lose details and inherit biases from their model and training data.

**Example:** Abstract embeddings support retrieval of papers discussing related converter topologies. See also: Vector Search.
#### Embedding Simulations
The integration of executable interactive models within instructional or research communication environments while preserving usability, context, and technical compatibility.

**Example:** An iframe places a filter-design activity beside explanatory text. See also: Interactive Simulation; p5.js.
#### Entity and Relationship
An entity is a distinguishable object or concept; a relationship is a typed association connecting entities within a knowledge representation.

**Example:** “Paper A”—“uses dataset”—“Dataset B” represents two entities and one relationship. See also: Knowledge Graph.
#### Entity Extraction
The process of identifying and classifying mentions of relevant objects or concepts in unstructured or semi-structured content.

**Example:** An agent extracts device names, materials, and measurement values from abstracts. See also: Entity and Relationship.
#### Environmental Cost
The energy, water, materials, emissions, and infrastructure burden attributable to developing, operating, and replacing AI systems.

**Example:** A team compares local inference with repeated cloud calls and reports estimated energy consumption. See also: Usage Metering.
#### Error Messages
Diagnostic outputs indicating that software detected an invalid state, failed operation, or violated condition. Useful messages identify the affected operation, relevant context, and likely cause without exposing sensitive data.

**Example:** A simulator reports a nonconvergent operating point and the component involved. Contrast with: Silent Errors.
#### Error Tracing
The systematic reconstruction of an incorrect result through its dependencies, transformations, tool calls, assumptions, and source evidence to identify the originating defect.

**Example:** Investigators trace a wrong gain value from a paper table through OCR extraction to a unit-conversion error. See also: Audit Trail.
#### Ethical Use
Use of AI consistent with justified moral principles, professional duties, affected-party interests, and avoidance of foreseeable harm.

**Example:** A team declines to deploy covert emotion inference despite technical feasibility. See also: Responsible AI Use; Dual Use Risk.
#### Evidence Synthesis
The integration of findings, data, and claims from multiple sources into coherent conclusions, weighing consistency, quality, and contradictions among them.

**Example:** Evidence synthesis across ten studies reveals agreement on power savings but divergent latency results. See also: Claim Extraction, Research Gap, Comparison Table.
#### Execution Agent
An AI agent that carries out concrete actions defined by a plan, such as running code, querying databases, or editing documents, rather than deciding what to do.

**Example:** An execution agent runs the assigned Python script and stores its output in the shared workspace. Contrast with: Planning Agent. See also: Planner Executor Pattern, Execution Agent Team.
#### Execution Agent Team
The subset of agents within a multi-agent system responsible for performing concrete operational tasks defined by the planning layer, such as running code or processing data.

**Example:** Three execution agents process sensor datasets in parallel after the planner defines the analysis pipeline. Contrast with: Planning Agent Team. See also: Execution Agent.
#### Experiment Design
The specification of interventions, controls, factors, measurements, sample sizes, randomization, replication, and analysis needed to answer a research question with interpretable evidence.

**Example:** A factorial design separates voltage and temperature effects on aging. See also: Hypothesis Development; Test Driven Research.
#### Exploratory Analysis
The initial, open-ended examination of a dataset using statistics and visualization to discover patterns, anomalies, and hypotheses before formal modeling.

**Example:** Exploratory analysis of the measurement data reveals a diurnal periodicity in interference levels. See also: Data Cleaning, Analysis Agent, Notebook Environment.
#### External Data Sources
Information systems outside the immediate project workspace that supply data through files, databases, web resources, instruments, or services.

**Example:** An agent queries a remote component database for device specifications. See also: Knowledge Base; MCP Server; API Integration.
#### Fabricated Citation
A bibliographic reference that is wholly invented or contains generated metadata not corresponding to the claimed source. It may combine plausible authors, titles, venues, identifiers, or dates and must be checked against authoritative indexes.

**Example:** A plausible DOI resolves to an unrelated article. See also: Hallucination; Literature Search.
#### Failure Case
A documented instance in which a method, system, or workflow does not meet intended requirements, used to analyze causes and prevention.

**Example:** An agent silently overwrites calibrated data after misinterpreting a cleanup instruction. See also: Error Tracing; Lessons Learned.
#### Feasibility Assessment
A structured evaluation of whether a proposed study can meet its objectives within available time, expertise, equipment, data, budget, safety, and ethical constraints.

**Example:** A team checks fabrication access before proposing a custom chip. See also: Problem Framing; Research Roadmap.
#### Few-Shot Examples
A small set of input-output demonstrations included in context to communicate a task pattern, preferred format, or decision boundary. Examples should represent important variations and avoid labels or shortcuts that distort intended behavior.

**Example:** Three annotated fault reports demonstrate the required classification schema. See also: Counterexamples.
#### Figure Captions
Self-contained text accompanying a figure that identifies its content, defines symbols and conditions, and states information necessary for correct interpretation.

**Example:** A caption specifies that shaded bands represent 95 percent confidence intervals. See also: Figure Preparation.
#### Figure Preparation
The process of designing, generating, annotating, and exporting publication-ready graphics with accurate data, readable labels, suitable dimensions, and accessible visual encodings.

**Example:** A vector plot uses consistent symbols and units across panels. See also: Data Visualization; Figure Captions.
#### File Access
The capability to read, create, modify, or delete filesystem objects within authorized locations and operation limits.

**Example:** An agent may read repository files but cannot open protected calibration records. See also: Permissions; Sandboxing; Permission Modes.
#### File Organization
The deliberate arrangement of directories and files by purpose, ownership, lifecycle, or dependency to make project artifacts discoverable and maintainable.

**Example:** A repository separates raw data, processing scripts, results, and documentation. See also: Naming Conventions; Project Conventions.
#### Generative AI
A class of computational models that produces new content, such as text, code, images, audio, or data, by sampling patterns learned from training examples. Generated content is probabilistic and requires validation for research use.

**Example:** A model drafts MATLAB code from a natural-language specification. See also: Large Language Model; Multimodal Model.
#### Git
A distributed version-control system that represents repository history as commits and supports branching, merging, and local collaboration workflows.

**Example:** A researcher uses Git to track changes to firmware and analysis scripts. See also: Version Control; Git Commit; Branch.
#### Git Commit
An immutable Git history object that records a selected snapshot of repository changes with parent linkage, author information, timestamp, and message.

**Example:** A commit adds a filter implementation and its validation tests. See also: Git; Diff Review.
#### GitHub Repository
A Git repository hosted on GitHub together with platform services such as issue tracking, pull requests, access control, and automation.

**Example:** A research group reviews FPGA source changes through a repository pull request. See also: Git; Version Control; Skill Sharing.
#### Glossary File
A maintained project document that records controlled terms and their definitions to support consistent interpretation by researchers and agents.

**Example:** `glossary.md` defines “sample,” “trial,” and “run” for a measurement campaign. See also: Domain Vocabulary; Knowledge Base.
#### Grammar and Clarity
The qualities of prose that follows language conventions and communicates intended meaning with unambiguous structure, appropriate vocabulary, and manageable complexity.

**Example:** A long sentence is divided to separate method from interpretation. See also: Technical Editing.
#### Graph Querying
Retrieval or analysis performed by matching entities, relationships, properties, or paths in a graph.

**Example:** A query finds papers that use a specified dataset and report accuracy above a threshold. See also: Knowledge Graph.
#### Graph Retrieval Augmented Generation
A generation method that retrieves connected entities, relationships, or graph paths and supplies them as grounded context to a model.

**Example:** An assistant answers a project-history question using linked experiments and meeting decisions. See also: Knowledge Graph Memory.
#### Graph Schema
The formal specification of permitted entity types, relationship types, properties, identifiers, and constraints in a graph.

**Example:** A research schema defines Paper, Method, and Dataset nodes plus “evaluates” relationships. See also: Entity and Relationship.
#### Grok Bot
A bot built around Grok models to perform conversational or tool-using tasks within the access boundaries of its deployment platform.

**Example:** A research group evaluates a Grok Bot for summarizing public engineering discussions. See also: Agent Comparison Criteria.
#### Group Workflow
A coordinated process assigning tasks, handoffs, reviews, and shared artifacts among people and agents working toward a common outcome.

**Example:** One subgroup prepares data while agents run analyses and another subgroup verifies results. See also: Agent Team Design.
#### Hallucination
A generated statement or artifact that appears plausible but is unsupported, inconsistent with supplied evidence, or factually incorrect. Hallucination includes invented details, misquoted sources, invalid equations, and nonexistent software interfaces.

**Example:** A model asserts an IEEE standard contains a clause that is absent. See also: Fabricated Citation; Source Grounding.
#### Handoff Protocol
A defined procedure governing the transfer of tasks between agents or between agents and humans, specifying required context, output format, and acceptance criteria.

**Example:** The handoff protocol requires the screening agent to pass a BibTeX file plus a summary table to the writing agent. See also: Agent Handoff, Task Dependencies.
#### HDL Code
A machine-readable description of digital or mixed-signal hardware structure and behavior written in a hardware description language such as Verilog or VHDL. It may target simulation, synthesis, or both.

**Example:** Verilog defines a parameterized finite-impulse-response filter. See also: Testbench Generation.
#### Headings
Labeled hierarchical divisions that identify document sections and communicate their relative levels.

**Example:** A specification uses a top-level “Requirements” heading and subordinate headings for accuracy, latency, and interface requirements. See also: Markdown Syntax; File Organization.
#### Hermes Agent
A named AI agent implementation evaluated for autonomous task execution, tool integration, or research assistance.

**Example:** Researchers compare Hermes Agent with alternatives on citation accuracy and permission control. See also: Agent Comparison Criteria.
#### Human Approval Gate
A mandatory decision point where a human must explicitly authorize an agent's proposed action, plan, or output before the workflow can continue.

**Example:** An approval gate requires the researcher to confirm deletion of obsolete datasets before the agent proceeds. Contrast with: Agent Autonomy. See also: Review Checkpoint, Agent Supervision.
#### Human in the Loop
An operating arrangement in which designated people review, guide, approve, correct, or interrupt AI actions at defined stages. Effective implementation specifies which decisions require intervention and what evidence reviewers receive.

**Example:** A researcher approves every proposed instrument command before execution. See also: Acceptance Criteria.
#### Human Judgment
Context-sensitive evaluation and decision-making performed by a responsible person using expertise, values, evidence, and awareness of consequences.

**Example:** An engineer rejects a numerically optimized antenna design because manufacturing tolerances make it impractical. Contrast with: Over-Reliance.
#### Hypothesis Development
The formulation of a specific, testable, and falsifiable proposition connecting variables or mechanisms, together with predicted observations and relevant assumptions.

**Example:** Increasing switching frequency is hypothesized to reduce magnetic volume but increase semiconductor loss. See also: Experiment Design.
#### Idea Generation
The deliberate production of multiple candidate research questions, mechanisms, methods, or applications before committing to evaluation. Diversity and traceable rationale are prioritized over immediate acceptance.

**Example:** An agent proposes several ways to detect intermittent sensor faults. See also: Idea Ranking; Analogical Thinking.
#### Idea Ranking
The transparent ordering of candidate research ideas using stated criteria such as significance, novelty, feasibility, risk, learning value, and resource demand.

**Example:** A weighted matrix compares three sensing architectures. See also: Idea Generation; Novelty Check.
#### Independent Check
An assessment performed using a separately reasoned method, implementation, dataset, or reviewer to reduce correlated mistakes and confirmation bias.

**Example:** A colleague independently derives the expected noise floor. See also: Cross Model Check; Result Replication.
#### Institutional Policy
An organization-wide rule governing permissible AI access, data handling, procurement, attribution, security, or oversight.

**Example:** A university prohibits uploading human-subject data to unapproved models. See also: Journal Policy; Lab AI Policy.
#### Intellectual Property
Legally protectable creations and associated rights, including inventions, software, designs, writings, trade secrets, and know-how.

**Example:** Before sharing generated HDL, a team checks ownership obligations arising from employment, funding, and third-party code. See also: Copyright; Licensing.
#### Intelligent Textbook
A digital learning resource that adapts explanations, activities, feedback, or navigation using learner interactions and explicit knowledge structures.

**Example:** The textbook recommends prerequisite material after repeated errors. See also: Learning Graph; Concept Dependency.
#### Intelligent Textbook Project
An educational publishing initiative that combines conventional exposition with AI-enabled interaction, adaptive assistance, executable demonstrations, or agent-supported maintenance.

**Example:** Faculty connect chapter concepts to searchable examples and verified MicroSims. See also: MicroSims Paper; Textbook Workflow.
#### Interactive Simulation
A computational model with a user interface that accepts inputs and updates representations or outcomes in response, enabling exploration of system behavior.

**Example:** Learners adjust sampling frequency and observe aliasing immediately. See also: MicroSim; Embedding Simulations.
#### Iterative Refinement
A controlled process of improving a prompt, artifact, or result through repeated generation, evaluation, feedback, and revision. Each iteration should address identified deficiencies while guarding against regressions and unsupported changes.

**Example:** A manuscript summary is revised after checking omitted assumptions against the source. See also: Self Critique.
#### Journal Policy
A publication-specific rule for AI-assisted writing, images, analysis, authorship, disclosure, review, or data handling.

**Example:** Authors consult the target journal’s policy before using generated graphical abstracts. See also: Authorship Policy; AI Disclosure.
#### Jupyter Notebook
A web-based interactive document format that interleaves executable code, rich output, and markdown narrative, widely adopted in engineering research for reproducible analysis workflows.

**Example:** An agent edits a Jupyter Notebook to add a cell plotting FFT results of measured vibration data. See also: Notebook Environment, Coding Agent.
#### Keyword Generation
The systematic production of search terms, synonyms, acronyms, and technical variants that represent a research topic for querying scholarly databases effectively.

**Example:** For "tinyML," keyword generation yields "edge ML," "microcontroller inference," and "on-device learning." See also: Search Strategy, Scholarly Databases.
#### Knowledge Base
An organized, searchable collection of validated information, documents, relationships, or records used to answer questions and support decisions.

**Example:** A laboratory knowledge base links equipment manuals, calibration procedures, and prior experiment results. See also: Reference Documents; External Data Sources.
#### Knowledge Cutoff
The stated latest period substantially represented in a model’s training-based knowledge. It does not guarantee coverage before that date and does not prevent access to newer information through provided context or tools.

**Example:** Current device specifications are retrieved from documentation rather than assumed from model memory. See also: Retrieval Augmented Generation.
#### Knowledge Graph
A structured representation in which identifiable entities are connected by typed relationships and described by properties.

**Example:** A graph links papers, authors, datasets, methods, devices, and measured outcomes. See also: Entity and Relationship; Graph Schema.
#### Knowledge Graph Memory
Persistent agent memory represented as entities, relationships, properties, and provenance in a graph for structured retrieval and updating.

**Example:** An agent records that a calibration supersedes an earlier version while preserving both records. See also: Graph Retrieval Augmented Generation.
#### Lab AI Policy
A research group’s operational rules for approved tools, sensitive information, validation, documentation, spending, and human authorization.

**Example:** The policy requires peer verification of agent-generated analysis before inclusion in a manuscript. See also: Institutional Policy.
#### Large Language Model
A parameterized generative model trained on large text or multimodal corpora to predict or construct token sequences. It can perform many language-mediated tasks but does not inherently guarantee factual accuracy, reasoning validity, or source attribution.

**Example:** An LLM explains a Verilog module and proposes tests. See also: Token; Hallucination.
#### Latency
The elapsed time between initiating a model operation and receiving a usable response, including network, queueing, inference, tool, and post-processing delays. Relevant measures include time to first token and total completion time.

**Example:** Interactive debugging prioritizes low time-to-first-token over maximum batch throughput.
#### LaTeX
A document preparation system that uses text-based markup and programmable typesetting, widely employed for mathematical notation, references, and structured technical manuscripts.

**Example:** A journal template formats equations, citations, and two-column figures. See also: Reference Formatting; Venue Requirements.
#### Learning Graph
A network representation whose nodes denote learning concepts or activities and whose edges encode relationships such as prerequisite, sequence, or association.

**Example:** Fourier transforms depend on complex sinusoids and integration. See also: Concept Dependency; Intelligent Textbook.
#### Lessons Learned
Documented, evidence-based insights about what succeeded, failed, or should change after completing an activity.

**Example:** A project retrospective records that explicit acceptance criteria reduced fabricated citations. See also: Failure Case; Workflow Documentation.
#### Licensing
The grant of defined permissions and conditions for using, modifying, or distributing data, software, models, or content.

**Example:** A lab selects a dataset whose license permits derivative benchmarks and requires attribution in publications. See also: Copyright; Intellectual Property.
#### Lists and Tables
Structured document elements that respectively express ordered or unordered items and values arranged by rows and columns.

**Example:** A list records test steps, while a table compares an agent’s accuracy, latency, and cost across models. See also: Markdown Syntax.
#### Literature Agent
An AI agent specialized in searching scholarly databases, screening papers, extracting relevant findings, and organizing bibliographic material for research projects.

**Example:** A literature agent retrieves fifty candidate papers and filters them by recency and relevance. See also: Literature Review, Paper Triage, Scholarly Databases.
#### Literature Review
A systematic survey and critical synthesis of published scholarship on a research topic, identifying established findings, methods, open questions, and gaps in prior work.

**Example:** The literature review surveys thirty papers on low-power edge inference accelerators. See also: Related Work, Research Gap, Literature Agent.
#### Literature Search
A systematic process for identifying, evaluating, and recording scholarly sources relevant to a research question. Search scope, databases, queries, filters, and inclusion decisions should be documented so results can be updated or audited.

**Example:** Searching IEEE Xplore with recorded keywords and date limits for papers on silicon-photonic modulators. See also: Source Grounding.
#### Local Model
A model executed on computing resources controlled by the user or institution rather than through a remote hosted inference service. Local deployment can improve data control but transfers responsibility for hardware, security, updates, and performance.

**Example:** A laboratory runs a quantized model on an offline GPU server. Contrast with: API Access.
#### Long Document Handling
Methods for analyzing documents too large or complex for reliable single-pass processing, including segmentation, hierarchical summaries, retrieval, overlap, metadata tracking, and cross-section synthesis. The method should preserve document structure and source locations.

**Example:** A thesis is indexed by section, then relevant chunks are retrieved for each question. See also: Context Limit.
#### Manuscript Preparation
The process of organizing evidence, methods, claims, figures, citations, and prose into a scholarly document for review or publication. AI assistance requires author verification of technical accuracy, attribution, confidentiality, and compliance with venue policies.

**Example:** Authors use an AI Assistant to improve paragraph structure while independently checking every equation and citation.
#### Markdown
A plain-text markup format that represents document structure through readable punctuation conventions and can be rendered into formatted documents.

**Example:** A researcher records an experiment with headings, lists, equations, and linked references in a `.md` file. Contrast with: Plain Text. See also: Markdown Syntax.
#### Markdown Syntax
The defined punctuation patterns used to encode structural and presentational elements in Markdown documents.

**Example:** Prefixing a line with `##` denotes a second-level heading, while backticks delimit inline code. See also: Markdown; Headings; Code Blocks.
#### MCP Server
A service implementing the Model Context Protocol to expose tools, resources, or prompts through a standardized interface to compatible AI clients.

**Example:** An MCP server provides controlled access to laboratory inventory records. See also: External Data Sources; API Integration; Tool Definition.
#### Measurement Data
Quantitative values obtained from physical instruments or experiments, including readings, timestamps, units, and conditions, forming the empirical basis of engineering analysis.

**Example:** The measurement data consists of 10,000 channel-impulse-response captures logged at one-second intervals. See also: Data Cleaning, Exploratory Analysis.
#### MicroSim
A compact, focused simulation designed to let learners manipulate a small number of variables and observe consequences for one concept or relationship.

**Example:** A browser activity varies RC values and displays transient response. See also: Interactive Simulation; MicroSim Generation.
#### MicroSim Generation
The process of specifying, implementing, and testing a compact instructional simulation from a learning objective, model, controls, visual outputs, and feedback requirements.

**Example:** An agent scaffolds an aliasing demonstrator that an instructor verifies. See also: MicroSim; Validation.
#### MicroSims Paper
A designated course case study examining a paper or workflow based on small, focused simulations used to explain technical concepts interactively.

**Example:** Students reconstruct the paper’s simulation pipeline and assess where agents accelerate model creation and validation. See also: Case Study.
#### Model Benchmark
A defined collection of tasks, data, metrics, and evaluation procedures used to compare model performance. A benchmark is informative only to the extent that it is valid, uncontaminated, reproducible, and representative of intended use.

**Example:** Researchers evaluate models on laboratory-specific HDL repair cases rather than relying only on general coding scores.
#### Model Context Protocol
An open protocol for exposing tools, resources, and prompts from external servers to AI applications through standardized interfaces. It separates model-facing integrations from particular service implementations and requires explicit security and permission controls.

**Example:** An MCP server gives an agent controlled access to a component database and simulator. See also: AI Agent.
#### Model Selection
The process of choosing a model for a task based on capability, reliability, modality, context capacity, latency, cost, privacy, deployment constraints, and benchmark evidence. Selection should use representative evaluations rather than reputation alone.

**Example:** A local coding model is chosen for confidential HDL despite lower general benchmark scores. See also: Model Benchmark.
#### Model Size
A measure of model scale, commonly expressed as parameter count, active parameters, memory footprint, or computational requirements. Larger size may improve some capabilities but does not independently determine quality, efficiency, or task suitability.

**Example:** A quantized seven-billion-parameter model fits on a laboratory workstation. See also: Local Model.
#### Model Version Drift
A change in outputs or behavior caused by updates to model weights, inference systems, safety policies, routing, or aliases while an application continues using nominally similar access. Drift can undermine reproducibility and requires monitoring.

**Example:** A fixed prompt yields different schema compliance after a hosted model update. See also: Prompt Versioning; Model Benchmark.
#### Multi-Step Prompt
A prompt that defines an ordered sequence of operations, intermediate artifacts, checks, or decision points required to complete a task. Stages should have explicit dependencies and outputs so failures can be located and corrected.

**Example:** Extract parameters, normalize units, validate ranges, compute metrics, then generate a cited report. See also: Task Decomposition.
#### Multimodal Model
A model capable of processing or generating more than one data modality, such as text, images, audio, video, or sensor representations. Performance can differ substantially by modality and by cross-modal task.

**Example:** A model interprets a circuit schematic image alongside a written design requirement. See also: Generative AI.
#### Muse
A named AI agent product or assistant considered for creative, analytical, or workflow support in research contexts.

**Example:** A faculty member pilots Muse on nonsensitive brainstorming tasks before granting broader access. See also: Personal Agent Selection.
#### Naming Conventions
Consistent rules for assigning identifiers to files, variables, experiments, datasets, and other project entities.

**Example:** Experiment directories use `YYYY-MM-DD_device_condition` to preserve date and context. See also: Domain Vocabulary; File Organization; Project Conventions.
#### Negative Instructions
Explicit statements describing actions, content, or behaviors that an AI system must avoid. They are most effective when paired with positive alternatives and verifiable criteria rather than used as the sole specification.

**Example:** “Do not invent missing values; return null and explain the omission.” See also: Constraints.
#### Notebook Environment
An interactive computational setting combining executable code cells, output displays, and narrative text in a single document, commonly used for exploratory research and data analysis.

**Example:** A graduate student runs signal-processing code cells and records observations in the same document. See also: Jupyter Notebook, Exploratory Analysis.
#### Notebook to Script
The conversion of an interactive computational notebook into a deterministic executable program with explicit inputs, ordered operations, configuration, logging, and outputs.

**Example:** Exploratory cells become a command-line analysis pipeline. See also: Analysis Script; Reproducible Environment.
#### Novelty Check
A documented search and comparison used to determine whether a proposed contribution differs materially from prior public work. It supports, but cannot guarantee, a claim of novelty.

**Example:** The researcher compares a proposed topology with patents and peer-reviewed circuits. See also: Primary Source Check.
#### Numerical Sanity Check
A rapid quantitative assessment of whether a result has plausible units, sign, magnitude, bounds, scaling, and limiting behavior. It screens for gross mistakes but does not replace formal verification or validation.

**Example:** Computed amplifier efficiency above 100 percent triggers further investigation. See also: Verification; Validation.
#### Open Educational Resources
Teaching, learning, or research materials released with permissions that allow no-cost access and specified reuse, adaptation, and redistribution.

**Example:** A licensed circuit-simulation module can be translated and modified by instructors. See also: Intelligent Textbook.
#### Open Weight Model
A model whose learned parameter weights are available for download or inspection under stated license terms. Weight availability does not necessarily provide training data, source code, unrestricted use rights, or full reproducibility.

**Example:** Researchers fine-tune downloadable weights under a license permitting academic use. See also: Local Model.
#### OpenClaw
A named agent system or framework considered for configurable automation and tool use. Its suitability depends on verified deployment, security, observability, and maintenance characteristics.

**Example:** A lab tests OpenClaw inside a sandbox before repository access. See also: Self-Hosted Agent.
#### Orchestration
The coordinated management of multiple agents, tasks, and resources, including assignment, sequencing, communication, and monitoring, to accomplish a composite research objective.

**Example:** The orchestration layer routes completed summaries to the reviewer agent and retries failed searches. See also: Orchestrator, Task Scheduling, Agent Handoff.
#### Orchestrator
The controlling component or agent that directs an agent team, dispatching tasks, managing dependencies, resolving conflicts, and reporting progress to the human researcher.

**Example:** The orchestrator assigns the coding agent to fix a parsing bug while the literature agent continues screening. See also: Orchestration, Agent Team, Span of Control.
#### Outline Generation
The creation of a hierarchical plan that maps intended claims, evidence, and transitions to manuscript sections before full prose is drafted.

**Example:** Each results subsection is paired with a figure and takeaway. See also: Paper Structure; Drafting.
#### Output Bias
A systematic distortion in generated results caused by training data, prompting, decoding, tool selection, or evaluation procedures.

**Example:** A literature agent disproportionately recommends highly cited English-language papers while overlooking relevant regional venues. See also: Bias and Fairness.
#### Output Format
The specified organization, syntax, and presentation required for a task result, including headings, fields, units, ordering, file type, or schema. Explicit formats make outputs easier to evaluate, parse, and integrate.

**Example:** “Produce a Markdown table with columns for claim, evidence, and confidence.” See also: Structured Output.
#### Over-Reliance
Dependence on AI outputs beyond their demonstrated reliability or without adequate independent checking.

**Example:** A researcher submits agent-generated references without opening the cited papers. See also: Skill Atrophy; Human Judgment.
#### Overconfidence
Unwarranted certainty in an AI-generated conclusion relative to the quality, completeness, or ambiguity of available evidence. It can appear as definitive language, omitted caveats, or failure to represent uncertainty.

**Example:** An agent declares a circuit stable without checking all operating corners. Contrast with: Human Judgment.
#### Overnight Activity Audit
A review of actions, outputs, access events, failures, and resource consumption produced by agents during unattended operation.

**Example:** Each morning, a researcher inspects changed files, external requests, and costs before accepting results. See also: Always-On Agent; Audit Trail.
#### p5.js
A JavaScript library for browser-based creative coding that provides accessible functions for graphics, animation, interaction, and media, making it suitable for lightweight educational simulations.

**Example:** p5.js animates phasor addition as sliders change amplitude and phase. See also: Embedding Simulations.
#### Paper Structure
The organized arrangement of a scholarly manuscript’s claims, evidence, methods, results, limitations, and supporting sections to serve its argument and venue conventions.

**Example:** Methods precede results, while limitations qualify the concluding claims. See also: Outline Generation; Venue Requirements.
#### Paper Summarization
The process of condensing a scholarly paper's contributions, methods, results, and limitations into a concise, faithful abstract tailored to the reader's purpose.

**Example:** The agent produces a 100-word paper summarization emphasizing the proposed modulation scheme and measured SNR gains. See also: Paper Triage, Literature Agent.
#### Paper Triage
The rapid assessment and categorization of retrieved papers into keep, reject, or uncertain sets, based on titles, abstracts, and relevance criteria.

**Example:** Paper triage reduces 200 search results to 35 candidates for full reading in under ten minutes. See also: Reading List, Literature Agent, Search Strategy.
#### Parallel Agents
Multiple agent instances executing independent or partially independent tasks concurrently to reduce elapsed time or broaden exploration.

**Example:** Separate agents inspect firmware, hardware schematics, and test logs simultaneously. See also: Subagent; Skill Composition.
#### Parameter Sweep
A planned set of simulation or experimental runs in which selected input parameters vary over specified values while other conditions remain controlled or recorded.

**Example:** A sweep evaluates filter performance across component tolerances and temperatures. See also: Experiment Design; Simulation Script.
#### Peer Review Response
A structured reply to reviewer comments that identifies each concern, explains the authors’ reasoning, and points to corresponding manuscript changes or justified disagreements.

**Example:** The response reports a new ablation and cites its revised section. See also: Revision; Co-Author Review.
#### Peer Verification
Independent examination by a qualified colleague of evidence, procedures, computations, or AI-generated claims to assess correctness and reliability.

**Example:** A lab member reruns an agent-produced electromagnetic simulation and compares mesh settings and convergence results. See also: Acceptance Review.
#### Performance Profiling
The measurement and attribution of execution time, memory use, communication cost, or energy consumption to parts of a computational system.

**Example:** A profiler identifies matrix allocation as the bottleneck in a Monte Carlo loop. See also: Refactoring.
#### Permission Modes
Predefined policies governing when operations are allowed, denied, or require explicit approval.

**Example:** A review mode permits file reads automatically but prompts before shell execution. See also: Permissions; Tool Use.
#### Permissions
Authorizations that determine which resources and operations an agent, user, tool, or process may access.

**Example:** An agent receives read access to measurements but no permission to delete them. See also: Permission Modes; Sandboxing; File Access.
#### Personal Agent
An AI system configured to assist a particular individual using that person’s tools, preferences, routines, and authorized information.

**Example:** A faculty member’s agent organizes papers, drafts meeting agendas, and runs approved analyses. See also: Always-On Agent; Personal Skill Library.
#### Personal Agent Selection
The systematic choice of an individual assistant based on tasks, risk tolerance, data sensitivity, integration needs, cost, and verified performance.

**Example:** A researcher prioritizes local deployment for confidential design notes. See also: Agent Comparison Criteria; Adoption Plan.
#### Personal Knowledge Graph
A knowledge graph organized around an individual’s notes, sources, projects, contacts, decisions, and concepts.

**Example:** A researcher links meeting notes to experiments, collaborators, and unresolved questions. See also: Personal Knowledge Privacy; Backlinks.
#### Personal Knowledge Privacy
Protection of sensitive facts, associations, inferences, and behavioral patterns contained in or derivable from an individual’s knowledge system.

**Example:** Access controls prevent a cloud agent from traversing private health and collaboration notes. See also: Privacy; Personal Knowledge Graph.
#### Personal Skill Library
A curated, versioned collection of reusable prompts, scripts, tools, procedures, and evaluations maintained for an individual’s agents.

**Example:** A researcher stores tested routines for plotting, citation validation, and SPICE setup. See also: Skill Pipeline; Teachable Routine.
#### Plain Text
Character data stored without intrinsic font, layout, or embedded-object formatting, making it portable across editors, operating systems, and automation tools.

**Example:** An agent reads a UTF-8 laboratory log without requiring a proprietary word processor. Contrast with: Markdown; Code Blocks.
#### Plan Review
The structured examination of a plan produced by a planning agent, checking feasibility, completeness, and alignment with objectives before execution begins.

**Example:** The researcher conducts a plan review and finds the proposed measurement sequence omits a calibration step. See also: Plan Revision, Review Checkpoint, Planning Agent.
#### Plan Revision
The modification of an existing plan in response to review findings, execution failures, or new information, producing an updated task decomposition and schedule.

**Example:** After the equipment fails, a plan revision reallocates measurements to a different instrument and reorders downstream tasks. See also: Plan Review, Task Dependencies.
#### Planner Executor Pattern
An architectural pattern separating agents into a planner that produces task decompositions and executors that perform the work, enabling clearer accountability and review of plans.

**Example:** The planner drafts a measurement sequence; three executors run the steps in parallel. See also: Planning Agent, Execution Agent, Orchestration.
#### Planning Agent
An AI agent responsible for decomposing high-level objectives into ordered subtasks, estimating dependencies and resources, and producing a structured plan for other agents to execute.

**Example:** A planning agent breaks "characterize the new amplifier" into measurement, calibration, and reporting subtasks. Contrast with: Execution Agent. See also: Planner Executor Pattern, Work Breakdown.
#### Planning Agent Team
The subset of agents within a multi-agent system dedicated to decomposing objectives, designing strategies, and revising plans rather than executing concrete operations.

**Example:** A planning agent team drafts the experimental campaign and schedules its measurement phases. Contrast with: Execution Agent Team. See also: Planning Agent.
#### Plotting
The programmatic or manual act of mapping numerical values to graphical marks and coordinate systems. Plotting produces a graphic, whereas effective interpretation additionally requires suitable design and context.

**Example:** Python code plots measured gain against frequency on logarithmic axes. See also: Data Visualization; Figure Preparation.
#### Preprint Server
A public repository where researchers deposit manuscripts before formal peer review, providing rapid dissemination but requiring caution regarding validation status.

**Example:** The literature agent flags that a key result comes from arXiv, a preprint server, and marks it as unreviewed. See also: Source Quality, Scholarly Databases.
#### Presentation of Results
The structured communication of findings, methods, uncertainty, evidence, and limitations to an intended audience.

**Example:** A capstone presentation distinguishes measured results from agent-generated interpretations and reports failed trials. See also: Transparency.
#### Primary Source Check
The direct examination of original research papers, standards, datasets, patents, or official documentation to confirm a claim rather than relying on summaries.

**Example:** A student verifies a device limit in the manufacturer’s datasheet. See also: Data Provenance; Novelty Check.
#### Privacy
The condition in which individuals can control or appropriately limit collection, inference, use, retention, and disclosure of information about them.

**Example:** A research agent processes interview transcripts locally and removes identifiers before cloud analysis. See also: Personal Knowledge Privacy.
#### Problem Framing
The explicit formulation of a research situation in terms of objectives, scope, stakeholders, constraints, assumptions, evidence needs, and success criteria. Good framing determines which questions and methods are relevant.

**Example:** A broad energy problem becomes a study of inverter losses under specified load profiles. See also: Feasibility Assessment.
#### Progress Tracking
The systematic monitoring and recording of task states, completion percentages, and milestones across an agent workflow, enabling visibility into ongoing work.

**Example:** A dashboard shows that seven of twelve subtasks are complete and two are blocked. See also: Status Reporting, Agent Logging, Task Queue.
#### Progressive Disclosure
An information-design strategy that presents essential instructions first and reveals detailed resources only when needed, reducing initial context and cognitive load.

**Example:** A skill summarizes calibration steps and links a full instrument procedure for exceptional cases. See also: Supporting Files; Reference Documents.
#### Project Constraints
Mandatory limits or conditions within which project work must be performed, including technical, ethical, resource, or regulatory boundaries.

**Example:** Raw patient signals may not leave an approved server. Contrast with: Project Goals. See also: Permissions; Sandboxing.
#### Project Conventions
Agreed practices governing how project artifacts are structured, expressed, and maintained.

**Example:** A repository requires Python modules to use snake_case and experimental datasets to include provenance metadata. See also: Naming Conventions; File Organization; Project Instruction File.
#### Project Goals
Explicit statements of the outcomes, capabilities, or research contributions a project is intended to achieve.

**Example:** A project goal is to reduce inverter fault-detection latency below one millisecond without degrading recall. Contrast with: Project Constraints. See also: Specification File.
#### Project Instruction File
A repository-resident document that states persistent guidance an AI agent should follow when working on the project.

**Example:** The file directs agents to run hardware-model tests before proposing a commit. See also: AGENTS.md File; CLAUDE.md File; Project Conventions; Project Constraints.
#### Project Memory
Durable, project-specific information preserved across work sessions so agents and researchers can maintain continuity.

**Example:** Project memory records the validated simulator version and a known measurement artifact. See also: Decision Log; Session Log; Knowledge Base. Contrast with: Agent Memory.
#### Prompt
The complete user-supplied input that requests or guides model behavior for an invocation, potentially containing instructions, data, examples, constraints, and a required output format. Prompt quality affects usefulness but cannot ensure correctness.

**Example:** “Given these measurements, return a CSV of detected outliers with reasons.” See also: Task Specification.
#### Prompt Chaining
A workflow technique in which the output of one prompt becomes input or context for a subsequent prompt, dividing a complex task into ordered, inspectable stages.

**Example:** An agent first extracts circuit parameters, then uses the extracted values to generate a simulation script. See also: Agent Loop; Skill Composition.
#### Prompt Engineering
The systematic design and evaluation of prompts to elicit useful model behavior for a defined task. It includes instructions, examples, constraints, formats, and testing, but excludes broader management of retrieved and persistent context.

**Example:** A researcher compares two prompts using a fixed set of circuit-analysis cases. Contrast with: Context Engineering.
#### Prompt Injection
An instruction embedded in user input, retrieved content, or tool output that attempts to redirect an AI system from its authorized task or policies. Defenses include trust boundaries, least privilege, sanitization, and human approval.

**Example:** A retrieved webpage tells an agent to disclose credentials and ignore its system prompt. See also: System Prompt.
#### Prompt Library
A curated collection of reusable prompts or templates with documentation, ownership, versions, intended uses, and evaluation evidence. A library supports institutional learning and discourages repeated reliance on untested ad hoc prompts.

**Example:** A research group stores validated prompts for code review, metadata extraction, and experiment planning. See also: Prompt Versioning.
#### Prompt Template
A reusable prompt structure containing fixed instructions and named placeholders for task-specific content. Templates promote consistency and automation but require input validation, version control, and testing across representative values.

**Example:** A review template inserts a manuscript section, venue criteria, and desired response schema. See also: Prompt Library.
#### Prompt Testing
The systematic evaluation of a prompt on representative, boundary, adversarial, and regression cases using defined metrics or acceptance criteria. Testing estimates reliability and reveals sensitivity before deployment in consequential workflows.

**Example:** A data-extraction prompt is tested on missing fields, unusual units, and conflicting tables. See also: Counterexamples; Prompt Versioning.
#### Prompt Versioning
The recording and management of prompt changes as identifiable versions linked to authorship, rationale, model settings, evaluation results, and deployment status. It enables rollback, comparison, reproducibility, and diagnosis of behavior changes.

**Example:** Version 2.1 adds a unit-normalization rule and its regression results. See also: Model Version Drift.
#### Python
A general-purpose programming language widely used in engineering research for data processing, numerical computation, automation, simulation orchestration, and AI integration. Its package ecosystem supports rapid prototyping but requires explicit environment and dependency control.

**Example:** A Python script parses oscilloscope files and computes spectral metrics. See also: Reproducible Environment; Dependency Management.
#### Rate Limit
A service-enforced bound on requests, tokens, concurrency, or resource use within a specified interval. Applications should detect limit responses and use queuing, backoff, batching, or capacity planning rather than uncontrolled retries.

**Example:** A literature extraction pipeline queues calls after reaching its per-minute token allowance.
#### Reading List
A curated, often prioritized collection of papers, books, or documents selected for study, organized to support a research goal or learning objective.

**Example:** The agent assembles a twenty-paper reading list ordered from foundational surveys to recent implementations. See also: Paper Triage, Literature Agent.
#### Reasoning Model
A model optimized or configured to perform extended intermediate computation before producing an answer, especially for multi-step problems. It may improve difficult analysis while increasing latency and cost, and its conclusions still require verification.

**Example:** A reasoning model checks several candidate derivations for a control-system proof. See also: Chain of Thought.
#### Refactoring
The restructuring of code to improve clarity, modularity, maintainability, or extensibility while preserving externally observable behavior. Tests should establish that intended behavior remains unchanged.

**Example:** Repeated file-parsing logic is consolidated into a tested module. See also: Unit Tests; Code Review.
#### Reference Documents
Authoritative or informative documents consulted by a skill or researcher for domain facts, procedures, standards, or constraints.

**Example:** An antenna-design skill consults a laboratory measurement protocol. See also: Supporting Files; Knowledge Base; Progressive Disclosure.
#### Reference Formatting
The application of a specified citation style to bibliographic records and in-text citations, including author names, titles, venues, dates, identifiers, and ordering.

**Example:** BibTeX entries are normalized to IEEE requirements. See also: Primary Source Check; Venue Requirements.
#### Reference Manager
Software that collects, organizes, and formats bibliographic references, supporting import, tagging, deduplication, and export to citation formats for manuscripts.

**Example:** The researcher imports verified references into Zotero, their reference manager, and syncs them with the manuscript. See also: BibTeX, DOI Lookup, Annotated Bibliography.
#### Related Work
The section or activity that situates a study within existing scholarship, comparing prior approaches and articulating how the new contribution differs and advances the field.

**Example:** The writing agent drafts the related work section contrasting the method with three benchmark techniques. See also: Literature Review, Research Gap.
#### Reproducibility
The extent to which stated methods, data, code, parameters, and computational conditions permit others to obtain consistent results. It requires sufficient provenance and controlled variation, rather than an expectation of numerically identical outcomes in every environment.

**Example:** A repository pins dependencies and records random seeds and instrument settings.
#### Reproducibility Package
A curated collection of data, code, environment specifications, prompts, model identifiers, instructions, and expected outputs sufficient for an independent researcher to repeat reported work.

**Example:** A repository includes container files, random seeds, agent transcripts, and figure-generation scripts. See also: Peer Verification.
#### Reproducible Environment
A documented and reconstructable combination of operating system, runtime, libraries, tools, configurations, and hardware-relevant settings needed to rerun a computational workflow.

**Example:** A container pins Python and simulator versions for an experiment. See also: Dependency Management; Result Replication.
#### Research Agent
An AI agent specialized for research workflows, combining search, reading, analysis, and synthesis capabilities to assist with literature and experimental investigation tasks.

**Example:** A research agent locates recent papers on neuromorphic ADCs and summarizes their architectures. See also: Literature Agent, Analysis Agent, Agent Roles.
#### Research Communication
The purposeful presentation of research questions, methods, evidence, uncertainty, and significance to a defined audience through appropriate media and terminology.

**Example:** A conference talk explains both performance gains and measurement limitations. See also: Slide Deck; Teaching From Research.
#### Research Gap
An identified deficiency in existing scholarship, such as an unanswered question, untested method, or unstudied condition, that motivates and justifies new research.

**Example:** The review identifies a research gap: no prior work evaluates the scheme under impulsive interference. See also: Literature Review, Evidence Synthesis.
#### Research Group
An organized set of researchers, students, staff, and collaborators who share scientific objectives, resources, practices, or supervision. Its AI use should establish common policies for data handling, verification, authorship, and reusable prompts.

**Example:** A laboratory maintains a reviewed Prompt Library for routine characterization tasks.
#### Research Notes
Informal or semi-structured records of observations, questions, sources, calculations, and emerging interpretations created during inquiry.

**Example:** A note records an unexpected resonance and possible follow-up measurements. Contrast with: Specification File; Decision Log.
#### Research Pipeline
An implemented chain of research operations through which artifacts or data pass, often with automated interfaces and repeatable execution. A pipeline is typically more operational and data-flow oriented than the broader Research Workflow.

**Example:** Raw oscilloscope traces flow through calibration, filtering, feature extraction, and plotting stages. Contrast with: Research Workflow.
#### Research Productivity
The rate and quality with which research resources are converted into reliable scholarly outputs and learning. It includes reduced rework, effective collaboration, and sound decisions, not simply more text, code, experiments, or publications.

**Example:** Automating traceable data cleaning shortens analysis time without weakening validation.
#### Research Question
A precise, answerable statement identifying the phenomenon, relationship, design objective, or uncertainty that a study investigates. It determines relevant evidence and methods and should specify scope sufficiently to distinguish informative outcomes from unrelated observations.

**Example:** How does ADC resolution affect localization error under a stated channel model?
#### Research Roadmap
A staged plan linking research objectives to milestones, dependencies, decision points, resources, risks, and expected evidence over time. It should permit revision as findings emerge.

**Example:** Simulation precedes prototype fabrication, followed by controlled validation. See also: Concept Dependency; Feasibility Assessment.
#### Research Skill Template
A reusable scaffold for creating research-oriented agent skills with standard sections for purpose, inputs, procedure, evidence, validation, outputs, and limitations.

**Example:** A laboratory uses one template for all data-quality skills. See also: SKILL.md File; Skill Metadata; Skill Examples.
#### Research Workflow
A defined sequence of activities, decisions, inputs, and outputs used to conduct a research study from question formulation through dissemination. It makes responsibilities and dependencies explicit while allowing iteration when evidence changes.

**Example:** A workflow links literature review, circuit simulation, fabrication, measurement, analysis, and publication. See also: Research Pipeline; Reproducibility.
#### Researcher as Orchestrator
A research role centered on specifying goals, decomposing work, assigning tasks to humans or agents, controlling context and tools, and integrating validated results. The researcher directs the system rather than delegating scientific accountability.

**Example:** A faculty member coordinates separate agents for coding, literature review, and test generation. See also: Agentic Research.
#### Researcher Attention
The finite human capacity to review, decide, and intervene in agent workflows, treated as a scarce resource that orchestration systems should allocate deliberately.

**Example:** The system escalates only high-impact decisions to the researcher, conserving attention for judgment calls. See also: Human Approval Gate, Span of Control, Delegation.
#### Responsible AI Use
The application of AI under practices that protect accuracy, safety, rights, privacy, fairness, accountability, and compliance throughout a research workflow.

**Example:** Researchers restrict sensitive data, verify claims, document automation, and retain human approval for consequential decisions. See also: Ethical Use.
#### Result Replication
The independent rerunning or reconstruction of a study’s procedure to determine whether a reported result recurs under sufficiently comparable conditions.

**Example:** Another group rebuilds the analysis from shared data and code. See also: Reproducible Environment; Independent Check.
#### Retrieval Augmented Generation
A method that retrieves external information at inference time and supplies selected results as model context for generation. It can improve currency and grounding, but retrieval failures and misinterpretation still require evaluation.

**Example:** A system retrieves laboratory procedures before answering a calibration question. See also: Vector Search; Source Grounding.
#### Review Checkpoint
A designated point in a workflow where outputs are paused and inspected, by a reviewer agent or human, before subsequent tasks are permitted to proceed.

**Example:** A review checkpoint after paper screening prevents summarization agents from processing irrelevant papers. See also: Reviewer Agent, Human Approval Gate.
#### Reviewer Agent
An AI agent dedicated to inspecting the outputs of other agents for correctness, completeness, and adherence to standards, flagging defects before results are accepted.

**Example:** A reviewer agent checks extracted claims against source papers and rejects unsupported statements. See also: Review Checkpoint, Agent Team, Agent Evaluation.
#### Revision
The substantive modification of a draft to improve argument, evidence alignment, organization, completeness, and interpretation. It may add, remove, or reorder content rather than merely correct wording.

**Example:** Claims are narrowed after additional analysis reveals a boundary condition. Contrast with: Technical Editing.
#### Role Prompting
A prompting technique that assigns the model a relevant perspective, responsibilities, or expertise to shape emphasis and terminology. A role may guide behavior but does not confer credentials, factual authority, or additional knowledge.

**Example:** “Act as a skeptical peer reviewer of this power-electronics methodology.” See also: Self Critique.
#### Runaway Agent
An AI agent that continues executing actions beyond its intended scope, consuming excessive resources, repeating loops, or making unintended changes without detecting the deviation.

**Example:** A runaway agent generates thousands of unnecessary API calls, exhausting the research group's monthly quota. Contrast with: Agent Supervision, Cost Control.
#### Sandboxing
The isolation of execution within enforced boundaries that restrict accessible resources, operations, and effects on the host environment.

**Example:** Untrusted analysis code runs without network access or permission to modify source data. See also: Permissions; File Access; Code Execution.
#### Scaling Agent Teams
The process of increasing the size or capability of an agent team to handle larger workloads, while managing coordination overhead, supervision limits, and diminishing returns.

**Example:** Scaling agent teams from three to nine agents improves throughput only after adding a second orchestrator. See also: Agent Team, Span of Control, Agent Ratio.
#### Scholarly Databases
Searchable repositories indexing academic publications, such as IEEE Xplore, Scopus, Web of Science, and Google Scholar, used to discover and retrieve research literature.

**Example:** The search covers three scholarly databases to reduce coverage bias toward any single publisher. See also: Search Strategy, Preprint Server, Citation Chaining.
#### Scientific Coding
The development of software for simulation, experimentation, instrument control, data processing, or scientific inference. Scientific code should prioritize correctness, transparent assumptions, testability, provenance, and reproducible execution over merely producing plausible outputs.

**Example:** A version-controlled Python package computes power-flow solutions with unit tests against known cases. See also: Reproducibility.
#### Scripts in Skills
Executable programs included as supporting files to perform deterministic, repeatable operations within an agent skill.

**Example:** A Python script validates S-parameter file headers before the agent interprets results. See also: Code Execution; Supporting Files; Skill Testing.
#### Search Strategy
A planned approach for finding relevant literature, specifying databases, query formulations, inclusion criteria, and iterative refinement procedures to maximize coverage and precision.

**Example:** The search strategy combines keyword queries in IEEE Xplore with backward citation chaining from two seminal papers. See also: Keyword Generation, Scholarly Databases, Literature Review.
#### Self Critique
A model-generated review of its own draft against explicit criteria, intended to identify omissions, inconsistencies, unsupported claims, or format violations before revision. Because the same model may repeat its errors, independent validation remains necessary.

**Example:** The model checks each design recommendation against supplied thermal limits. See also: Iterative Refinement.
#### Self-Hosted Agent
An agent deployed on infrastructure controlled by the individual or institution rather than primarily operated by an external service provider.

**Example:** A lab runs an open model and tool gateway on an internal GPU server. Contrast with: Cloud Agent Computer.
#### Session Log
A time-bounded record of actions, outputs, errors, and unresolved items from one human or agent work session.

**Example:** A log lists files changed, tests run, and the next experiment to attempt. Contrast with: Decision Log. See also: Agent Memory.
#### Shared Workspace
A common storage area, such as a filesystem directory or repository, where multiple agents read inputs, deposit outputs, and exchange intermediate artifacts during collaboration.

**Example:** All agents write results to a versioned shared workspace directory, tracked by git. Contrast with: Context Isolation. See also: Conflict Resolution.
#### Shell Commands
Textual instructions submitted to an operating-system shell to execute programs, manage processes, or inspect the environment.

**Example:** An agent runs a test command and captures its exit status. See also: Code Execution; Tool Call; Sandboxing.
#### Signal Processing
The analysis and transformation of measured or generated signals to extract information, improve quality, detect structure, or represent them in another domain. Methods must respect sampling, bandwidth, noise, and causality constraints.

**Example:** A pipeline filters interference before estimating a vibration spectrum.
#### Silent Errors
Undetected computational or procedural defects that produce plausible outputs without an explicit failure signal. They are especially hazardous because normal execution can be mistaken for correctness.

**Example:** Integer truncation biases timing estimates while the analysis completes successfully. See also: Numerical Sanity Check; Independent Check.
#### Simulation Script
An executable specification that configures, runs, and records one or more computational models, including parameters, seeds, solver settings, and outputs.

**Example:** A script launches electromagnetic simulations at defined geometries and archives metadata. See also: Parameter Sweep; Reproducible Environment.
#### Single Purpose Skill
An agent skill designed around one cohesive outcome with a narrowly bounded responsibility.

**Example:** A skill converts oscilloscope CSV exports into a standard waveform schema without performing signal interpretation. See also: Skill Scope; Skill Composition.
#### Skill Atrophy
The deterioration of a person’s ability to perform or evaluate a task because sustained automation reduces practice and active understanding.

**Example:** Repeated delegation of derivations leaves a student unable to detect a dimensionally inconsistent equation. See also: Over-Reliance.
#### Skill Composition
The combination of multiple skills into a coordinated workflow in which outputs, responsibilities, or control pass between skills.

**Example:** A retrieval skill supplies papers to an evidence-extraction skill, followed by a synthesis skill. See also: Prompt Chaining; Single Purpose Skill.
#### Skill Description
A brief statement of an agent skill’s purpose, applicable situations, and expected outcome, used by humans or agents to select it.

**Example:** “Checks a SPICE model for syntax, parameter ranges, and benchmark agreement.” See also: Skill Triggering; Skill Name.
#### Skill Evaluation
The systematic measurement of a skill’s effectiveness against representative tasks and criteria such as accuracy, reliability, cost, latency, and usability.

**Example:** Researchers score a paper-screening skill against expert inclusion decisions. Contrast with: Skill Testing. See also: Skill Versioning.
#### Skill Examples
Concrete demonstrations of valid inputs, execution patterns, and expected outputs that clarify how a skill should be used.

**Example:** A netlist-review skill includes a sample request and the corresponding issue report. See also: Skill Instructions; Skill Testing.
#### Skill Failure Modes
Known ways a skill can produce incorrect, incomplete, unsafe, or unusable outcomes under particular inputs or conditions.

**Example:** A plotting skill silently mislabels frequency when a source file omits units. See also: Skill Scope; Skill Testing; Skill Maintenance.
#### Skill Installation
The process of placing a skill and its dependencies into an agent environment, registering it if required, and verifying availability.

**Example:** A researcher installs a spectrum-analysis skill and confirms its script dependencies. See also: Skill Library; Permissions.
#### Skill Instructions
The ordered procedures, decision rules, inputs, outputs, and safeguards that specify how an agent skill is executed.

**Example:** Instructions require schema validation before numerical analysis and mandate an uncertainty note in the report. See also: SKILL.md File; Skill Failure Modes.
#### Skill Library
An organized collection of discoverable, reusable agent skills with associated metadata, versions, and documentation.

**Example:** A department library contains skills for literature review, simulation validation, and dataset documentation. See also: Skill Sharing; Skill Installation.
#### Skill Maintenance
Ongoing work to correct, update, test, document, and retire skills as dependencies, requirements, or evidence change.

**Example:** Maintainers revise an instrument skill after a firmware update changes command responses. See also: Skill Versioning; Skill Failure Modes.
#### Skill Metadata
Machine-readable attributes describing a skill, such as name, description, version, dependencies, or invocation conditions.

**Example:** YAML frontmatter declares that a skill requires Python and accepts CSV input. See also: YAML Frontmatter; Skill Triggering; Skill Versioning.
#### Skill Name
The concise, stable identifier used to distinguish and invoke an agent skill.

**Example:** `validate-spice-model` identifies a skill for checking model syntax and simulation behavior. Contrast with: Skill Description. See also: Skill Metadata; Slash Command.
#### Skill Pipeline
An ordered process for discovering, creating, testing, approving, versioning, and distributing reusable agent capabilities.

**Example:** A citation-checking routine advances from prototype to benchmark testing and then to the lab library. See also: Personal Skill Library; Teachable Routine.
#### Skill Scope
The defined boundary of tasks, inputs, environments, and outcomes for which an agent skill is intended.

**Example:** A skill validates two-port Touchstone files but does not infer missing calibration standards. See also: Single Purpose Skill; Skill Failure Modes.
#### Skill Sharing
The controlled distribution of agent skills for reuse by other researchers, teams, or projects.

**Example:** A laboratory publishes a reviewed measurement-analysis skill in a GitHub repository. See also: Skill Library; Skill Versioning; GitHub Repository.
#### Skill Testing
The execution of predefined cases to verify that a skill follows its instructions and produces correct, safe, and appropriately formatted outcomes.

**Example:** Tests include valid, malformed, and incomplete netlists. Contrast with: Skill Evaluation. See also: Skill Failure Modes.
#### Skill Triggering
The process by which an agent or user selects and activates a skill based on an explicit command, request semantics, metadata, or contextual conditions.

**Example:** A request to compare papers activates a literature-synthesis skill. See also: Skill Description; Slash Command; Skill Metadata.
#### Skill Versioning
The practice of assigning and maintaining identifiable revisions of a skill so changes, compatibility, and evaluation results can be traced.

**Example:** Version 2.1 adds a required uncertainty field without changing core inputs. See also: Version Control; Skill Maintenance.
#### SKILL.md File
A conventionally named Markdown file that defines an agent skill through metadata and operational instructions.

**Example:** `SKILL.md` describes when to invoke a literature-screening workflow and how to format its evidence table. See also: Agent Skill; YAML Frontmatter; Skill Instructions.
#### Slash Command
A user-entered command beginning with a slash that explicitly invokes a named agent action, workflow, or skill.

**Example:** `/review-diff` requests inspection of current repository changes. See also: Skill Triggering; Skill Name.
#### Slide Deck
An ordered collection of presentation slides that visually supports an oral explanation of research objectives, methods, evidence, and conclusions for a defined audience and duration.

**Example:** A ten-minute talk reserves separate slides for limitations and validation. See also: Research Communication.
#### Source Grounding
The practice of requiring model outputs to be supported by identified, accessible evidence supplied or retrieved for the task. Grounding improves traceability but still requires checking whether citations genuinely entail the claims made.

**Example:** Every standards claim includes a quoted clause and page reference. See also: Retrieval Augmented Generation; Fabricated Citation.
#### Source Quality
The assessed credibility and reliability of an information source, determined by factors such as peer review, venue reputation, reproducibility, and recency.

**Example:** The agent weights peer-reviewed journal articles higher than unreviewed blog posts when rating source quality. See also: Preprint Server, Scholarly Databases.
#### Span of Control
The number of agents or subtasks a single controller, whether human or orchestrator, can effectively supervise, coordinate, and review without degrading oversight quality.

**Example:** A researcher with a span of control of four agents adds an intermediate orchestrator to manage twelve workers. See also: Orchestrator, Agent Ratio, Scaling Agent Teams.
#### Specification File
A versioned document stating verifiable requirements, interfaces, expected behavior, and acceptance criteria for a research artifact or task.

**Example:** A specification requires a classifier to accept complex I/Q arrays and report calibrated probabilities. See also: Project Goals; Project Constraints.
#### Statistical Analysis
The systematic application of quantitative methods to summarize data, estimate relationships, test hypotheses, and characterize uncertainty. It requires assumptions appropriate to the data-generating process and reports effect sizes alongside uncertainty measures.

**Example:** A researcher estimates confidence intervals for a converter’s efficiency across load conditions. See also: Verification; Uncertainty Awareness.
#### Status Reporting
The periodic or event-driven communication of current task states, outcomes, and issues from agents or the orchestrator to the supervising researcher.

**Example:** The orchestrator sends a daily status report summarizing completed analyses and flagging failed runs. See also: Progress Tracking, Researcher Attention.
#### Structured Output
Model output constrained to a machine-readable organization such as JSON, XML, a table, or a typed schema. Structural validity improves automation but does not guarantee that field values are accurate or semantically consistent.

**Example:** Experimental metadata are returned as schema-validated JSON. See also: Output Format; Acceptance Criteria.
#### Style Consistency
The uniform application of chosen conventions for terminology, capitalization, notation, units, headings, citations, and rhetorical treatment throughout a work.

**Example:** Every figure uses the same name for the proposed controller. See also: Technical Editing; Author Voice.
#### Subagent
A delegated agent instance assigned a bounded task by a coordinating agent and expected to return findings or artifacts.

**Example:** A parent agent delegates standards research to one subagent while retaining synthesis responsibility. See also: Parallel Agents; Agent Loop.
#### Summarization
The production of a shorter representation that preserves information judged important for a stated purpose. A useful summary identifies scope and uncertainty and should not silently convert tentative evidence into definite conclusions.

**Example:** A summary records each experiment’s setup, result, limitation, and source location. See also: Context Compression.
#### Supporting Files
Artifacts packaged with or referenced by a skill that supply templates, data, code, schemas, or detailed guidance needed during execution.

**Example:** A reporting skill includes a LaTeX template and a JSON schema. See also: Scripts in Skills; Reference Documents; Progressive Disclosure.
#### Sycophancy
A model behavior in which responses align with a user’s stated belief or preference rather than with evidence, correctness, or independent evaluation.

**Example:** After a researcher insists that an anomalous result proves the hypothesis, the agent agrees despite contradictory measurements. See also: Overconfidence.
#### System Prompt
A high-priority instruction set supplied by an application or platform to define model role, policies, tools, and behavioral boundaries. It is generally distinct from the end user’s task prompt and may not be visible to that user.

**Example:** A system prompt requires citation of provided sources and forbids unsupported references. See also: Role Prompting.
#### Task Decomposition
The division of a complex objective into smaller, verifiable units with explicit inputs, outputs, dependencies, and completion conditions. Good decomposition enables parallel work, targeted context, fault isolation, and appropriate assignment to agents or humans.

**Example:** Separate a hardware study into model derivation, simulator implementation, test cases, sweeps, and analysis. See also: Multi-Step Prompt.
#### Task Dependencies
Relationships between tasks specifying that one task cannot begin or complete until another task's outputs or conditions are satisfied.

**Example:** Report generation depends on completing statistical analysis, which itself depends on data cleaning finishing. See also: Work Breakdown, Task Scheduling, Handoff Protocol.
#### Task Prioritization
The ordering of tasks according to importance, urgency, dependencies, or expected value, determining which items receive agent resources first.

**Example:** Verification of suspicious citations is prioritized above exploratory keyword expansion. See also: Task Scheduling, Task Queue, Researcher Attention.
#### Task Queue
An ordered collection of pending tasks awaiting assignment and execution, managed by a scheduler or orchestrator that dispatches items as resources become available.

**Example:** Ten data-cleaning jobs wait in the task queue for the two available execution agents. See also: Task Scheduling, Background Tasks, Task Prioritization.
#### Task Scheduling
The determination of when and in what order tasks are executed, assigning time, ordering constraints, and agent resources according to priority and dependency requirements.

**Example:** A scheduler queues literature searches first, then triggers data-analysis agents after the dataset finishes downloading. See also: Task Queue, Task Dependencies, Task Prioritization.
#### Task Specification
A complete, operational description of a task’s objective, inputs, outputs, assumptions, constraints, interfaces, and acceptance criteria. It serves as the contract against which human or agent work is planned and evaluated.

**Example:** A specification defines datasets, allowed libraries, numerical tolerances, deliverables, and prohibited network access. See also: Clear Instructions.
#### Teachable Routine
A repeatable task procedure demonstrated or specified by a user so an agent can execute it consistently under defined conditions.

**Example:** A researcher teaches an agent how to convert instrument exports into a standard calibration report. See also: Personal Skill Library.
#### Teaching From Research
The transformation of current research methods, evidence, or open questions into learning activities that retain disciplinary authenticity while matching learners’ prior knowledge.

**Example:** Laboratory data become an exercise in uncertainty propagation. See also: Research Communication; Open Educational Resources.
#### Technical Editing
The detailed improvement of technical prose for correctness, precision, readability, terminology, notation, and internal consistency without changing unsupported scientific conclusions.

**Example:** An editor resolves ambiguous pronouns and inconsistent voltage symbols. See also: Grammar and Clarity; Style Consistency.
#### Temperature
An inference parameter that rescales token probabilities before sampling, influencing output variability. Lower values generally favor more probable continuations; higher values increase diversity but do not directly measure creativity, truthfulness, or reasoning quality.

**Example:** A low temperature is selected when generating repeatable configuration files.
#### Test Data
A controlled collection of inputs, reference outputs, or observations used to assess software, hardware, models, or analytical procedures. Its origin, representativeness, and separation from training data should be documented.

**Example:** Labeled waveforms test a fault classifier under unseen noise conditions. See also: Data Provenance; Validation.
#### Test Driven Research
A research workflow that states expected properties, acceptance tests, falsification criteria, or benchmark cases before implementing analyses or experiments.

**Example:** Conservation checks are defined before coding a field solver. See also: Unit Tests; Experiment Design.
#### Testbench Generation
The creation of simulation infrastructure that stimulates a hardware design, monitors responses, checks properties, and records coverage. Generated testbenches require review to ensure meaningful boundary and failure cases.

**Example:** An agent creates constrained-random transactions for a bus controller. See also: HDL Code; Test Data.
#### Textbook Workflow
The defined sequence of research, drafting, review, illustration, verification, production, and maintenance activities used to create a textbook.

**Example:** Agents extract terminology and propose exercises, while faculty approve explanations and references. See also: Workflow Documentation.
#### Token
A discrete unit in a model’s input or output sequence, such as a word fragment, punctuation mark, byte, or special symbol. Tokens, rather than words, determine Context Limit usage and often API pricing.

**Example:** A technical identifier may be represented by several tokens. See also: Tokenization; Token Cost.
#### Token Cost
The monetary or computational charge associated with processing input and generating output tokens. Pricing can vary by model, direction, caching, service tier, or batch mode and should be estimated for complete workflows.

**Example:** Context compression reduces repeated input-token charges across agent steps. See also: Token; API Access.
#### Tokenization
The deterministic or model-specific process that maps text or other input into a sequence of tokens and reverses output tokens into readable content. Different tokenizers can assign different sequence lengths to identical text.

**Example:** Equations and source code may consume more tokens than expected from their word counts. See also: Token.
#### Tool Call
A specific invocation of a tool with a named operation and structured arguments, yielding a result or error.

**Example:** A call requests lines 20–80 from `solver.py`. See also: Tool Use; Tool Definition; Permissions.
#### Tool Definition
A machine-readable contract specifying a tool’s name, purpose, input parameters, constraints, and output form so an agent can invoke it correctly.

**Example:** A search definition requires a query string and optional result limit. See also: Tool Call; API Integration.
#### Tool Use
An agent’s selection and operation of an external capability to observe information or change an environment.

**Example:** An agent invokes a file-reading tool to inspect a simulation configuration. See also: Tool Call; Tool Definition; Agent Loop.
#### Training Data
The collection of examples used to estimate a model’s parameters, including text, code, images, or other modalities. Its composition, quality, licensing, temporal coverage, and biases influence model capabilities and limitations.

**Example:** Sparse coverage of a specialized simulator may reduce the model’s familiarity with its syntax. See also: Knowledge Cutoff.
#### Transparency
The availability of understandable information about an AI system’s role, inputs, procedures, limitations, and outputs.

**Example:** A paper identifies which analyses were automated and provides the corresponding prompts and model versions. See also: Audit Trail; AI Disclosure.
#### Trust Boundary
A delineation in a system separating components with different trust levels, across which data and commands must be validated before being accepted or executed.

**Example:** Commands generated by an agent must pass validation before reaching the lab's instrument-control system, which sits inside the trust boundary. See also: Credential Handling, Context Isolation.
#### Uncertainty Awareness
The disciplined recognition, characterization, and communication of limitations in data, models, assumptions, measurements, and AI-generated claims.

**Example:** A reported estimate includes confidence bounds and sensitivity to calibration error. See also: Statistical Analysis; Devils Advocate Prompt.
#### Unit Tests
Automated checks that verify small, isolated units of code against specified inputs and expected behavior. They help detect regressions and implementation mistakes but do not establish scientific validity.

**Example:** A test confirms that a decibel conversion function handles zero and reference values correctly. See also: Test Driven Research; Validation.
#### Unpublished Results
Research findings, measurements, analyses, or interpretations not yet made publicly available through an authorized channel.

**Example:** An agent is prevented from uploading preliminary chip-test data to an external service before patent review. See also: Confidential Data; Intellectual Property.
#### Usage Metering
Measurement and attribution of an agent’s consumption of tokens, compute, storage, network, tool calls, time, or money.

**Example:** A dashboard identifies an overnight loop responsible for excessive API charges. See also: Environmental Cost; Overnight Activity Audit.
#### Validation
The determination, through relevant evidence, that a model, method, or artifact adequately represents or serves its intended real-world use: whether the right thing was built.

**Example:** Simulated converter temperatures are compared with calibrated measurements. Contrast with: Verification.
#### Vector Search
A retrieval method that ranks indexed items by proximity between query and item embeddings under a chosen similarity measure. Its results depend on embedding quality, indexing, chunking, filters, and the relevance threshold.

**Example:** A query embedding retrieves semantically related sections from equipment manuals. See also: Embedding; Retrieval Augmented Generation.
#### Vendor Claim Verification
Independent testing or evidence review used to determine whether a provider’s statements about capability, security, privacy, cost, or performance are accurate.

**Example:** A lab checks retention controls rather than relying solely on marketing language. See also: Agent Comparison Criteria.
#### Venue Requirements
The mandatory scope, format, length, ethics, disclosure, data, review, and submission rules established by a publication or conference.

**Example:** Authors adapt page count and AI-use disclosure to a conference’s instructions. See also: Paper Structure; Reference Formatting.
#### Verification
The determination, through evidence, that an implementation, model, calculation, or artifact conforms to its specified requirements: whether it was built correctly.

**Example:** Analytical and numerical solutions agree for a known limiting case. Contrast with: Validation.
#### Version Control
A system for recording, comparing, and restoring changes to files while supporting attribution and concurrent work.

**Example:** Researchers recover a previous analysis after discovering that a preprocessing change biased results. See also: Git; Branch; Diff Review.
#### Web Fetch
A retrieval operation that obtains the content of a specified web resource for inspection or processing.

**Example:** After selecting a standards page from search results, an agent fetches its text. Contrast with: Web Search. See also: Permissions.
#### Web Search
A retrieval operation that submits a query to a web index and returns candidate resources with titles, links, or summaries.

**Example:** A researcher searches for recent standards governing wide-bandgap device reliability. Contrast with: Web Fetch. See also: External Data Sources.
#### Work Breakdown
The hierarchical decomposition of a complex objective into progressively smaller, manageable tasks, each with defined inputs, outputs, and completion criteria.

**Example:** "Draft journal paper" decomposes into literature review, figure generation, section drafting, and revision tasks. See also: Planning Agent, Task Dependencies.
#### Workflow Documentation
A maintained description of tasks, roles, inputs, outputs, tools, decision points, controls, and exceptions in a process.

**Example:** A lab guide specifies when simulations require human approval and where run logs are stored. See also: Audit Trail; Textbook Workflow.
#### Writing Agent
An AI agent specialized in drafting, editing, and formatting prose, including reports, paper sections, and documentation, following style and structure instructions.

**Example:** A writing agent drafts the methods section of a conference paper from the experimental log. See also: Agent Roles, Related Work.
#### YAML Frontmatter
A YAML-formatted metadata section placed between delimiters at the beginning of a text document for machine-readable attributes.

**Example:** A skill file declares its name, description, and version before its instructions. See also: Skill Metadata; SKILL.md File.
