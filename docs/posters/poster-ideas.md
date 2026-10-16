---
title: Infographic Poster Ideas
description: Twenty full-width infographic poster concepts for AI for EE Research, most built as side-by-side comparisons, each with a detailed image description for an illustrator or image generator.
---

# Infographic Poster Ideas

This page proposes **20 infographic posters** for *AI for EE Research*. Each is a large, full-screen
picture that a student can open, explore with hover and click, and then use to quiz themselves. They
follow the poster family in *The Science of the Built Environment*, with two changes of emphasis
requested for this book:

- **Side-by-side comparison first.** Twelve of the twenty posters are a split screen that sets two ways of
  working next to each other (the same task, done carelessly and done well). Another five are a
  full-width left-to-right bar, pipeline, or timeline. The remaining three are a dial, a ring diagram,
  and an exploded diagram.
- **Full screen width.** Every poster is designed for a wide 16:9 canvas so it fills a laptop or
  classroom projector with no wasted margins. Stories run left to right.

Where the built-environment posters taught physics, these posters teach *judgment*. Almost every
comparison here has the same shape: one side shows an AI-assisted workflow that **looks fine**, and the
other shows the same work with the **check that makes it trustworthy**. That is the book's thesis, and
it is Volt's catchphrase: *Trust, but verify!*

## How This List Was Built

I read the course description, the chapter outlines and summaries for all twenty chapters, the worked
examples (the ENOB measurement, the lab AI policy, the MicroSims paper), and the mascot guide. I also
studied the 20 posters and the poster-ideas page in
`science-of-the-built-environment/docs/posters` to match their structure: a text-free illustration, a
`data.json` of regions or markers, an Explore mode, and a Quiz mode.

Three honest caveats:

- **These are original designs.** Every poster is drawn fresh. Where a poster uses a framework from a
  chapter, the footer should credit that chapter.
- **No number appears here that is not already in a chapter.** Numbers such as the 20 planning agents,
  10 execution agents, and the 2.8-bit ENOB drop come from the book. Do not add a figure to a poster that
  the chapter does not support.
- **Product names age quickly.** Poster 19 touches always-on agents. Keep product logos and prices out of
  the picture, and follow Chapter 19's rule of teaching criteria, not rankings.

## Common Design Standards

Use these for every poster so the set reads as one family.

| Element | Standard |
|---|---|
| Canvas | Landscape **16:9** (generate at 1920 × 1080 or the widest ratio the image model supports; print at 36 × 20.25 in). Crop to 16:9 rather than letterboxing. |
| Image style | High-quality, polished illustration with soft lighting and rich detail: real-looking oscilloscope benches, probe stations, server racks, lab notebooks, and laptops. Semi-realistic is welcome. No stock-photo clichés and no glowing brain or robot hands. |
| Text in the image | **None.** No title, no labels, no numerals, no code that can be read. All words come from the interactive overlay in `data.json`. Screens, notebooks, and terminals show unreadable abstract marks only. |
| Palette | Maroon `#7A0019` for the researcher and human judgment, gold `#FFCC33` for focal points, deep teal `#1F7A8C` for agents and automation, signal green `#3C8D5A` for verified or passed, brick red `#C0392B` for failures and risks, charcoal for structure, warm off-white `#FAF7F2` for backgrounds |
| Comparison rule | In every split poster, **left is the risky or naive version, right is the controlled version**. Use the same camera angle, same scale, and same objects on both sides so students can compare at a glance. |
| Never color alone | Pair every color with an icon, a pattern, or a label so the meaning survives grayscale printing |
| Mascot | Volt the Border Collie appears **once** per student-facing poster, in the pose that matches the job (thinking, warning, tip, celebration). Instructor-facing versions omit Volt. Volt has no gender: use *they/them*. |
| Footer | The chapter links, the source credit, and the line "AI for EE Research" |
| Overlay type | Use the **grid** overlay (rectangular regions) for split-screen and pipeline posters. Use the **callout** overlay (numbered markers) for exploded and radial diagrams. |

## The Top 20 at a Glance

| # | Poster | Format | Core idea | Chapters |
|---|---|---|---|---|
| 1 | From Doing Everything to Directing Everything | Side-by-side | The researcher's job changes from doing tasks to orchestrating a team | [1](../chapters/01-research-workflows-orchestrator/index.md), [10](../chapters/10-orchestrating-agent-teams/index.md) |
| 2 | The Window That Fills Up | Full-width bar | A context window is a budget you must subtract from before you paste | [2](../chapters/02-how-language-models-work/index.md), [4](../chapters/04-context-engineering-prompting/index.md) |
| 3 | The Real Citation and the Fluent Fake | Side-by-side | A model writes a plausible reference as easily as a real one | [2](../chapters/02-how-language-models-work/index.md), [11](../chapters/11-literature-search-synthesis/index.md) |
| 4 | Vague Prompt, Engineered Context | Side-by-side | The same task with a loose prompt and with a full specification | [3](../chapters/03-models-and-prompt-basics/index.md), [4](../chapters/04-context-engineering-prompting/index.md) |
| 5 | The Chat That Forgets, the Project That Remembers | Side-by-side | Project files and version control give an agent a durable memory | [5](../chapters/05-markdown-and-version-control/index.md) |
| 6 | A Folder of Files, a Graph of Knowledge | Side-by-side | The same notes as a pile and as linked entities an agent can query | [6](../chapters/06-knowledge-bases-skill-anatomy/index.md), [19](../chapters/19-always-on-personal-agents/index.md) |
| 7 | Inside an Agent Skill | Exploded callout | Metadata, instructions, and supporting files load in layers | [6](../chapters/06-knowledge-bases-skill-anatomy/index.md), [7](../chapters/07-designing-testing-skills/index.md) |
| 8 | The Agent Loop Inside Its Sandbox | Loop plus rings | An agent acts in a loop, and permissions decide how far it can reach | [8](../chapters/08-agents-tool-use-subagents/index.md) |
| 9 | The Autonomy Dial | Four columns | How much autonomy a task earns depends on reversibility, reach, and verifiability | [9](../chapters/09-supervising-agents-roles/index.md) |
| 10 | Twenty Planners, Ten Doers, One Researcher | Full-width org | The orchestra, its handoffs, its gates, and the one scarce resource | [10](../chapters/10-orchestrating-agent-teams/index.md) |
| 11 | The Literature Funnel | Full-width pipeline | Search, triage, claims, citations, verification, synthesis | [11](../chapters/11-literature-search-synthesis/index.md) |
| 12 | Cleaning Without Hiding | Side-by-side | Silent cleanup versus a cleanup that logs every change | [12](../chapters/12-data-analysis-scripting/index.md) |
| 13 | Code That Runs, Code That Is Right | Side-by-side | A script can run clean and still be wrong; a sanity check catches it | [13](../chapters/13-simulation-testing-code/index.md), [17](../chapters/17-verification-reproducibility/index.md) |
| 14 | From Hunch to Falsifiable Hypothesis | Side-by-side ladder | An idea earns a place in the roadmap by becoming testable | [14](../chapters/14-brainstorming-problem-framing/index.md) |
| 15 | The Manuscript Line: Where the Human Stays | Full-width pipeline | Which steps of paper preparation an agent can draft and which stay yours | [15](../chapters/15-manuscript-preparation/index.md) |
| 16 | A Figure You Read, a Simulation You Explore | Side-by-side | A static plot beside the MicroSim built from the same result | [16](../chapters/16-microsims-communication/index.md), [20](../chapters/20-case-studies-capstone/index.md) |
| 17 | Verified Is Not Validated | Side-by-side | Built right versus built the right thing | [17](../chapters/17-verification-reproducibility/index.md) |
| 18 | Where Does Your Data Go? | Side-by-side | Hosted model versus a model you run, and what each one sees | [18](../chapters/18-responsible-ethical-use/index.md), [19](../chapters/19-always-on-personal-agents/index.md) |
| 19 | Day Shift, Night Shift | Side-by-side | An always-on agent works while you sleep, so you audit it in the morning | [19](../chapters/19-always-on-personal-agents/index.md) |
| 20 | The Paper Behind the Book | Full-width timeline | The MicroSims paper as a worked case: where each chapter's control fired | [20](../chapters/20-case-studies-capstone/index.md) |

If only a few are produced, start with **1, 10, 13, 17, and 19**. Together they state the book's whole
argument: direct a team, keep your attention scarce, check the work, check the question, and audit what
ran while you were away.

---

## Poster 1: From Doing Everything to Directing Everything

**Format:** Side-by-side, equal halves, with a bold vertical divider. Grid overlay.

**Influence:** The central idea of the course description and Chapter 1: the researcher's role moves from doing every task personally to orchestrating a team of agents while staying accountable for the science.

**Core message:** The work does not disappear. The role changes from *doing* to *directing and deciding what is true*.

**Chapters:** 1, 10

**Image description:**

- **Left half, "The Soloist":** One researcher at a cluttered bench at night: oscilloscope, a stack of printed papers, three half-written scripts on a laptop, a coffee gone cold, a calendar with everything crossed out. Five thin arrows leave the person toward five task icons (literature, data, brainstorming, code, manuscript), each drawn as a small task on the desk that the person must reach in turn. The overall mood is warm but overloaded.
- **Right half, "The Orchestrator":** The same bench, tidier, but now a wide wall display behind the researcher shows a fan of small agent workstations. Roughly twenty small teal figures on the upper tier are drawn as planners with maps and checklists. Ten sturdier teal figures on the lower tier are drawn as builders at benches. The researcher stands in front holding a single clipboard and a pen, reviewing one item.
- **Role strip:** Along the bottom of the right half, four gold icons: set direction, supply domain judgment, resolve conflicts, decide what is true.
- **Constant:** A single maroon thread of accountability runs from the researcher on the left, continues unbroken across the divider, and ends at a signature line on the right. It signals that the person remains responsible on both sides.
- **Volt:** Thinking pose at the divider, one paw on the maroon thread.

---

## Poster 2: The Window That Fills Up

**Format:** One very wide horizontal bar spanning the full canvas, with three stacked rows. Callout overlay.

**Influence:** Chapter 2's context window arithmetic and Chapter 4's context management. A window is a budget in tokens, and the dangerous failure is silent: old content falls off the front.

**Core message:** Subtract before you paste. A document that fits is not a document that was read with equal care.

**Chapters:** 2, 4

**Image description:**

- **Layout:** Three horizontal "window" bars, one above another, each a long glass tube filled with colored blocks from left to right. The tube's right end is open for the answer.
- **Top row, "Comfortable":** Blocks in order: a thin system-prompt block, a medium conversation-history block, one large paper block, a small question block. Plenty of empty tube remains for the completion. Use the book's 32,000-token worked example for proportions.
- **Middle row, "The second paste":** A second paper block of the same size is added. The tube is nearly full, and only a short empty gap remains for the answer. A drawn answer bubble is cut off partway.
- **Bottom row, "Silent overflow":** The oldest blocks, the system prompt and the first instructions, are drawn as ghosted blocks that have slid off the left end of the tube and are falling into a drain. The model figure at the right is working happily without them.
- **Middle-of-the-document effect:** On the paper block, a faint heat-map gradient is brightest at the start and end and dim in the middle.
- **Cost sidebar:** A small token-meter icon shows that equation-heavy and code-heavy text uses more tokens per word than prose.
- **Volt:** Tip pose with a ruler laid across the tube.

---

## Poster 3: The Real Citation and the Fluent Fake

**Format:** Side-by-side, two identical reference cards in two matching library scenes. Grid overlay.

**Influence:** Chapter 2's hallucination and fabricated citations, Chapter 11's reference verification, and Chapter 17's primary-source check.

**Core message:** A model produces a plausible reference as fluently as a real one. Fluency is not evidence.

**Chapters:** 2, 11, 17

**Image description:**

- **Left half, "Looks right":** A reference card on a clean desk, with a model-generated bibliography entry. A friendly checkmark hovers over it, drawn in gray because nobody has checked. Behind the card, the library shelf is painted as a flat, unreadable backdrop of spines with nothing behind it.
- **Right half, "Looks right, and is":** The same card with the same typography, but a gold thread leads from it to a real paper in a real stack, then to a DOI-style resolver lookup on a laptop, then to a green verified stamp. A magnifier hovers over the title, author list, and year.
- **Difference marks:** Three small tag-shaped icons appear only on the right: a link, a date, and a person. They represent the three things you verify (the paper exists, the claim is in the paper, the authors match).
- **Failure strip:** A narrow band across the bottom shows the four ways a reference fails: does not exist, exists but says something different, exists but wrong details, exists but retracted. Each is a tiny card with its own broken icon.
- **Volt:** Warning pose beside the left card.

---

## Poster 4: Vague Prompt, Engineered Context

**Format:** Side-by-side. Same task, same model, same input file. Grid overlay.

**Influence:** Chapter 3's prompt engineering and Chapter 4's task specification and acceptance criteria. The idea is the same one the case study in Chapter 20 repeats: a prompt is a specification with a test.

**Core message:** The model did not get smarter on the right. The *context* did.

**Chapters:** 3, 4

**Image description:**

- **Layout:** A researcher's laptop in the center of each half, with a single measurement-data file icon feeding in.
- **Left half:** A short, unreadable one-line prompt. Out of the laptop comes a wobbly, sprawling answer cloud with a vague gray chart, a sloppy paragraph, and a speech bubble full of question marks.
- **Right half:** The prompt is built as stacked, labeled-by-icon blocks: a role (a badge), the task (a target), the input (the file), the constraints (a fence), the acceptance criteria (a checklist with ticks), and the output format (a tidy template). Out of the laptop comes a clean chart, a short result table, and a "limits and assumptions" note.
- **Test plate:** On the right only, a small test fixture is attached: three input samples go through the prompt, and each returns a green tick.
- **Shared object:** The same coffee cup, same desk lamp, and same laptop sit on both sides.
- **Volt:** Tip pose, holding the checklist.

---

## Poster 5: The Chat That Forgets, the Project That Remembers

**Format:** Side-by-side, with a calendar running across both halves to show time passing. Grid overlay.

**Influence:** Chapter 5's project instruction files (AGENTS.md style), plain-text Markdown conventions, and version control.

**Core message:** An agent starts every session with no memory. A project file is what it reads first.

**Chapters:** 5

**Image description:**

- **Left half, "Session 1, Session 2, Session 3":** Three speech-bubble conversations in a row, each ending in a puff of smoke. Between them the same question is asked again and the same wrong assumption is made again (a sticky note says nothing readable but is crossed out each time).
- **Right half, "The project folder":** A tidy repository tree drawn as a physical filing cabinet. One gold-edged document at the top of the cabinet is the instruction file, with four tabs for goal, conventions, constraints, and next steps. Each session opens the cabinet, reads the top document first, and works.
- **Time ribbon:** Along the bottom, a branching git history in gold nodes, with one commit marked as a rollback point and one branch where an agent experiment was merged after review.
- **Plain-text cue:** A Markdown file icon, a notebook icon, and a script icon sit in the cabinet, all as plain documents that both a person and an agent can read.
- **Volt:** Welcome pose pointing at the top document.

---

## Poster 6: A Folder of Files, a Graph of Knowledge

**Format:** Side-by-side. Left is a messy directory, right is a linked network of the same items. Grid overlay.

**Influence:** The personal knowledge graph material in Chapter 6, and Chapter 19's discussion of memory, grounding, and what an agent may see.

**Core message:** Files are for reading. A graph is for asking. And whoever can query it can see it.

**Chapters:** 6, 19

**Image description:**

- **Left half, "The folder":** A cluttered desktop: PDFs, notebook pages, simulation results, meeting notes, and a half-built bibliography, all stacked with no visible relationships. A search box finds only keyword matches.
- **Right half, "The graph":** The same objects now appear as five kinds of node shapes: paper, experiment, person, project, and idea. They are joined by labeled-by-icon edges: cites, produced by, wrote, supports, contradicts. One question mark bubble asks something that spans three hops, and a highlighted path answers it.
- **Grounding strip:** At the bottom of the right half, an agent figure holds a small card with a trail back to the node it used, to show that an answer cites its source.
- **Privacy ring:** A dashed boundary around part of the graph marks nodes the agent may not read, with a lock icon.
- **Volt:** Thinking pose near the highlighted path.

---

## Poster 7: Inside an Agent Skill

**Format:** One large exploded diagram across the center of the screen. Callout overlay with eight markers.

**Influence:** The anatomy of a skill from Chapter 6 and the progressive-disclosure and testing guidance of Chapter 7.

**Core message:** A skill is a folder with a front door. Only the front door is always in the agent's context.

**Chapters:** 6, 7

**Image description:**

- **Layout:** A folder in the middle, lifted open like a hangar door. Three nested layers rise out of it from left to right.
- **Layer 1, always loaded:** A small badge with the skill's name and a one-line description. A tiny scale shows its cost in context as small.
- **Layer 2, loaded on trigger:** A single-sheet instruction document unfolds when a task arrow matches the badge.
- **Layer 3, loaded on demand:** A shelf of supporting files: a reference table, a template, and a tested script. Only the file the current step needs slides off the shelf.
- **Test bench:** A small bench on the right with two inboxes: requests that should trigger the skill (green) and near-miss requests that should not (red outline). Each is a stack of tiny request cards.
- **Contrast corner:** A bloated "does everything" skill drawn as an overstuffed binder with an unclear label.
- **Volt:** Tip pose beside the near-miss inbox.

---

## Poster 8: The Agent Loop Inside Its Sandbox

**Format:** A loop on the left two-thirds and nested permission rings on the right third. Callout overlay.

**Influence:** Chapter 8's tool use and the agent loop, file, shell, and code access, sandboxing, permissions, MCP, subagents, and hooks.

**Core message:** An agent is a loop, and its permissions decide how far one wrong turn can reach.

**Chapters:** 8, 9

**Image description:**

- **Left, the loop:** A circular track of five stations with an agent figure walking it: read the goal, plan, call a tool, observe the result, decide whether to continue. A small gate on the track labeled by icon only is a hook that can pause or veto.
- **Tools around the loop:** A file cabinet, a terminal, a web browser, a code runner, and an external data port with a plug for outside connectors.
- **Right, the rings:** Concentric rings viewed from above, like a target: the innermost is a scratch folder, then the project directory, then the whole machine, then the network and other people's accounts. Each ring has a padlock; the inner rings are open and the outer rings are locked unless approved.
- **Subagent:** A small second figure branches off the loop to work in its own small ring and returns a summary card.
- **Runaway cue:** A tiny meter that shows steps and cost climbing, with a stop button.
- **Volt:** Warning pose at the outer ring.

---

## Poster 9: The Autonomy Dial

**Format:** Four equal vertical columns, each a rung on the dial, with a large dial across the top. Grid overlay.

**Influence:** The four autonomy levels from 0 to 3 in Chapter 9, set by a task's reversibility, reach, and verifiability.

**Core message:** Autonomy is earned task by task. It is not a setting for the whole project.

**Chapters:** 9

**Image description:**

- **Top strip:** A big semicircular dial with four notches from 0 on the left to 3 on the right, with the needle drawn in a neutral position so that the overlay can highlight each level.
- **Column per level:** Each column shows the same agent working on a different research task in a scene appropriate to the level. Level 0, the agent only suggests while the researcher types. Level 1, the agent proposes an action and waits behind an approval gate. Level 2, the agent acts inside a boundary and reports afterward. Level 3, the agent runs on a schedule with a log and a budget limit.
- **Three gauges:** Under each column, three small gauges for reversibility, reach, and verifiability, set differently in each column.
- **Task examples:** One illustrative task icon per column: rename a variable, run a parameter sweep, edit the shared project file, send an email to a collaborator.
- **Log cue:** In the right-hand column, a long scroll of log entries trailing off the page.
- **Volt:** Neutral pose beside the dial.

---

## Poster 10: Twenty Planners, Ten Doers, One Researcher

**Format:** Full-width organization view, like a theater stage seen from the audience. Callout overlay with twelve markers.

**Influence:** The 20-planning-agent, 10-execution-agent model of the course description and Chapter 10's task queue, dependencies, handoffs, review checkpoints, human approval gates, and span of control.

**Core message:** The most scarce resource on the stage is the researcher's attention, and the design should spend it only where it counts.

**Chapters:** 10

**Image description:**

- **Layout:** Three horizontal tiers. At the top, a wide bank of about twenty small teal planning agents at desks with maps, outlines, and specs. In the middle, a flowing conveyor belt of task cards, with a task queue on the left and dependency arrows between some cards. At the bottom, a row of ten sturdier execution agents at benches: code, analysis, simulation, figures, manuscript.
- **Orchestrator:** At the center of the lower edge, a maroon figure with a baton, in front of a podium with a small status board.
- **Gates:** Gold review-checkpoint gates cross the conveyor. Two taller gates are labeled by icon as human approval gates, with a person-and-pen symbol.
- **Shared workspace:** A single table in the middle where agents place files, with a conflict flag on one file that two agents both touched.
- **Attention meter:** A tall gauge on the far right shows researcher attention draining as the number of review items rises, with a warning band.
- **Volt:** Thinking pose near the attention meter.

---

## Poster 11: The Literature Funnel

**Format:** Full-width left-to-right pipeline, drawn as a funnel that narrows into a clean synthesis. Grid overlay with six regions.

**Influence:** Chapter 11's search strategy, triage, claim extraction, citation chaining, verification, and synthesis, with the claim-to-source table.

**Core message:** Breadth is cheap with agents. Verification is where the pipeline earns its keep.

**Chapters:** 11

**Image description:**

- **Layout:** A wide funnel runs from the left edge to the right edge. Each region is a stage with its own small workshop scene.
- **Stages, left to right:** Search (keyword and source strategy, a map of databases), Triage (a pile of papers sorted into three bins), Claim extraction (each paper reduced to small claim cards), Citation chasing (a web of references forward and backward), Verification (a checklist and magnifier), Synthesis (a woven summary with a source thread behind each claim).
- **Leak points:** Between stages, small drips fall off the funnel: missed papers, misread claims, fabricated references. Each drip has a small matching catch-basin icon on the verification stage.
- **Table at the end:** A claim-to-source table drawn as a grid with three columns: claim, source, and a status tag of measured, cited, or expected.
- **Volt:** Tip pose at the verification stage.

---

## Poster 12: Cleaning Without Hiding

**Format:** Side-by-side, two identical raw datasets going through two different cleaning paths. Grid overlay.

**Influence:** Chapter 12's cleaning, data formats, and exploration, with the principle that a cleaning step should never hide what it removed.

**Core message:** A clean-looking dataset is not the same as a trustworthy one. Show what you removed and why.

**Chapters:** 12

**Image description:**

- **Layout:** Both halves begin on the left with the same raw capture: a noisy scatter of points with a few obvious outliers and a block of missing values.
- **Left half, "Silent cleanup":** The data passes through a black box and emerges as a smooth, handsome plot. A trail of discarded points disappears down a drain. The final plot has a gold medal-style ribbon drawn on it that nobody earned.
- **Right half, "Logged cleanup":** The data passes through a glass pipe in which each step is visible: drop missing rows, flag outliers by a stated rule, convert units. Each step drops its removed points into a labeled-by-icon tray. A cleaning-log scroll hangs beside the pipe.
- **Comparison:** The final plot looks similar on both sides, but the right side's plot has a small gray ghost of the removed points and a count bubble.
- **Raw preserved:** On the right, a locked box labeled by a raw icon holds the untouched original file.
- **Volt:** Warning pose at the drain.

---

## Poster 13: Code That Runs, Code That Is Right

**Format:** Side-by-side, one script, one input, two outcomes. Grid overlay.

**Influence:** Chapter 13's tests and numerical sanity checks and Chapter 17's independent checks. It uses the book's own ENOB example: an acceptance criterion was wrong by a plausible-looking amount, and a hand calculation caught it.

**Core message:** No error message does not mean no error. Check the answer against something you can compute independently.

**Chapters:** 13, 17

**Image description:**

- **Layout:** A short script in the middle of each half, in an editor window with unreadable marks, and an ADC-style waveform going in from the left.
- **Left half:** A terminal window with a green "completed" glow and a neat number emerging. A plausible-looking result is displayed on a large meter. A small unseen crack runs under the meter.
- **Right half:** The same script, but with a bench beside it where a person with a calculator and a notebook works out the expected value by hand. A comparison balance shows the script's number and the hand number side by side, and they disagree. A red tag appears on the script, and a test case has been added.
- **Seeded bug cue:** A small inset shows a deliberately planted bug in a test file and a test that fails when it is present, which proves the test can catch it.
- **Example note:** In the worked example from the chapter, adding 2 LSB of noise to an ideal 10-bit record lowers the effective bits by about 2.8, to near 7.2. Keep this number out of the image and put it in the overlay.
- **Volt:** Tip pose holding the calculator.

---

## Poster 14: From Hunch to Falsifiable Hypothesis

**Format:** Two staircases side by side climbing toward the same summit. Grid overlay.

**Influence:** Chapter 14's framing, idea generation and challenge, hypothesis and experiment design, feasibility, ranking, novelty, and the research roadmap.

**Core message:** An idea only becomes research when it can be shown wrong.

**Chapters:** 14

**Image description:**

- **Left staircase, "Brainstorm":** A wide, loose, cloudy staircase with many sticky-note ideas floating around it. The steps are labeled by icon only: topic, general interest, "could be better", "might work". The top step ends at a cloud with no summit marker.
- **Right staircase, "Hypothesis":** A narrower, sharper staircase: problem framed, claim stated, prediction written down, measurement chosen, result that would refute it identified. The top step ends at a flag at the summit labeled by a magnifier icon.
- **Challenger:** On the right staircase, a devil's-advocate agent figure stands at the third step holding a "what would make this wrong" card.
- **Ranking mat:** Below, a simple matrix of three or four candidate ideas laid out on a table with columns for feasibility, novelty, and cost, with a gold marker on the top one.
- **Roadmap ribbon:** A final ribbon extends right from the summit as a short research roadmap with three milestones.
- **Volt:** Thinking pose on the right staircase.

---

## Poster 15: The Manuscript Line: Where the Human Stays

**Format:** Full-width assembly line with a clearly drawn handrail marking what stays human. Grid overlay with six regions.

**Influence:** Chapter 15's structure, outline, abstract, drafting, revising, figures, LaTeX, references, co-author consistency, submission, and response to reviewers, with the disclosure rules of Chapter 18.

**Core message:** An agent can draft and format. The claims, the interpretation, and the signature are yours.

**Chapters:** 15

**Image description:**

- **Layout:** A long left-to-right conveyor with a manuscript growing from a bare outline to a printed paper.
- **Stations:** Outline and structure, drafting from claims, figures and LaTeX, references and citation check, consistency across co-authors, submission and reviewer response. At each, an agent figure in teal works the belt.
- **Human line:** A gold handrail runs along the top. At four stations, a maroon person reaches down and stamps a decision: the claim, the interpretation, the limits, and the final read.
- **Hazards:** Small red tags on the belt show three typical agent errors: a changed number, an invented reference, and an overconfident sentence. Each is caught by a different station.
- **End:** A submission box with an unreadable cover letter and a disclosure note attached.
- **Volt:** Celebration pose at the end of the line.

---

## Poster 16: A Figure You Read, a Simulation You Explore

**Format:** Side-by-side. A printed page on the left and a screen on the right, built from the same result. Grid overlay.

**Influence:** Chapter 16's communication of research, MicroSims, agent generation of MicroSims, and embedding. Chapter 20's MicroSims paper is the worked example.

**Core message:** A reader can look at one case in a figure, or ask "what if" in a simulation.

**Chapters:** 16, 20

**Image description:**

- **Left half, "The paper":** A journal page with a single clean plot of a result, with two curves. A reader at a desk traces one curve with a finger and wonders what happens at a different parameter value. A marginal note says nothing readable.
- **Right half, "The MicroSim":** The same plot appears on a wide screen with real slider handles beneath it. The reader's hand pulls a slider and the curves move. A second slider changes a parameter, and a small readout shows a number shifting.
- **Shared source:** A gold thread runs from both outputs back to one data file and one script in the center bottom, to show they are the same result.
- **Embedding strip:** A small browser-frame icon shows the simulation embedded on a lab website and in a paper's supplementary material.
- **Agent hand:** A teal agent figure at the back of the right half builds the simulation from a specification card.
- **Volt:** Welcome pose beside the sliders.

---

## Poster 17: Verified Is Not Validated

**Format:** Side-by-side, two inspectors at two checkpoints. Grid overlay.

**Influence:** Chapter 17's distinction between verification (was it done right) and validation (was the right thing done).

**Core message:** A design can be fully verified against a specification that was wrong, and it will be wrong in exactly the way the specification was.

**Chapters:** 17

**Image description:**

- **Left half, "Verification: built right?":** An inspector compares a finished circuit board and its code against a blueprint (the specification). Every item on a checklist is ticked green. The scene is clean and calm.
- **Right half, "Validation: right thing?":** The same board is placed on a real bench with a probe, a measured waveform, and the real problem the research question asks about (a drawn sensor in the field). The measured waveform and the simulated waveform disagree, and a red question mark appears over the blueprint itself.
- **The trap:** A narrow band across the center shows a green-ticked blueprint that has a small flaw printed on it, with an arrow carrying that flaw all the way through the verified build.
- **Methods:** Small icons at the bottom list three kinds of check: independent, primary source, and cross-model.
- **Volt:** Thinking pose at the question mark.

---

## Poster 18: Where Does Your Data Go?

**Format:** Side-by-side. A hosted model on the left and a model you run on the right. Grid overlay.

**Influence:** Chapter 18's privacy, confidentiality, governance, ownership, and open resources, and Chapter 19's data exposure and self-hosted agents. The lab AI use policy is the take-home.

**Core message:** Before you paste, decide what may leave the lab and where it goes.

**Chapters:** 18, 19

**Image description:**

- **Left half, "Hosted":** A researcher's laptop with a line running out of the lab through a window, up to a distant cloud data center. Along the line, small document icons travel in a pipe: a public paper, a draft manuscript, unpublished measurements, a collaborator's confidential spec. A retention clock and a log icon sit at the cloud end.
- **Right half, "Self-hosted":** A server rack in the corner of the same lab, with the line running only to the rack. The documents stay in a lab boundary drawn as a dashed rectangle. A fan, a power meter, and a small "you maintain this" wrench icon sit beside the rack.
- **Traffic light sorter:** A three-lane sorter across the bottom shows document types going to green (public), yellow (needs a decision), or red (never leaves).
- **Policy sheet:** A page icon at the center bottom with six numbered checkbox rows stands for the lab policy.
- **Volt:** Warning pose at the open window.

---

## Poster 19: Day Shift, Night Shift

**Format:** Side-by-side, one lab in daylight and the same lab at night. Grid overlay.

**Influence:** Chapter 19's always-on personal agents, blast radius, usage metering, and the overnight activity audit. It teaches durable criteria and avoids ranking products.

**Core message:** An agent that works while you are away needs a morning review as much as a night shift needs a supervisor.

**Chapters:** 19

**Image description:**

- **Left half, "Day shift":** A bright lab with the researcher at a desk, three agents on screen, and every action visible as it happens. A small hand-and-clipboard icon shows approval requests coming in.
- **Right half, "Night shift":** The same lab at night with the lights off. The researcher's chair is empty. A single cloud computer glows teal in the corner, and small agent figures move through it: reading email, running a sweep, filing a ticket, drafting a summary. A moon and a clock sit in the corner.
- **Morning audit:** A strip across the bottom of the right half shows the next morning: the researcher with coffee, scanning a long activity log, with some entries marked as approved, some as unexpected, and one circled in red.
- **Criteria ring:** Eight small dots around the right half stand for the eight comparison criteria: where it runs, blast radius, approval model, usage metering, data exposure, memory, claim verification, and activity audit.
- **Volt:** Warning pose beside the audit log, holding the whistle.

---

## Poster 20: The Paper Behind the Book

**Format:** Full-width timeline with a lower strip of failure cases. Callout overlay with twelve markers.

**Influence:** Chapter 20's case study of the MicroSims paper and the intelligent-textbook skill pipeline, including the book's own failure cases and the capstone project.

**Core message:** The pipeline is the documentation. Every stage leaves a file, and every file has a check.

**Chapters:** 20

**Image description:**

- **Layout:** A long road across the canvas, from a pile of source documents on the left to an arXiv-style submission box on the right.
- **Milestones:** Source material first, structure before prose (abstract, introduction, related work, conclusion), sections filled from existing documentation, build script producing a PDF, figures with a stated policy, and a submission package.
- **Skill pipeline strip:** Above the road, six small stations drawn as workshops: course description, learning graph, chapter structure, chapter content, MicroSims, and supporting pages. Arrows carry a file from each to the next.
- **Failure-case strip:** Below the road, four small scenes: a wrong number in a criterion caught by a hand calculation, stray markup caught by a tag-counting script, short chapters accepted rather than padded, and unbuilt simulations left honestly marked as specifications.
- **Claim table:** Over the abstract milestone, a small table with three tags (measured, cited, expected) beside a number.
- **Volt:** Celebration pose at the finish.

---

## Bench of Extra Ideas

These did not make the top 20, but each would work as a poster if a chapter needs more visual weight.

| Idea | Format | Core idea | Chapter |
|---|---|---|---|
| **Chatbot vs. Agent** | Side-by-side | A chatbot answers once. An agent plans, acts with tools, observes, and repeats. (Pairs with the *Generative AI to Agent* MicroSim.) | [1](../chapters/01-research-workflows-orchestrator/index.md), [8](../chapters/08-agents-tool-use-subagents/index.md) |
| **The Poisoned PDF** | Side-by-side | The same paper with and without an injected instruction, and the trust boundary that stops it | [4](../chapters/04-context-engineering-prompting/index.md), [9](../chapters/09-supervising-agents-roles/index.md) |
| **One Prompt, Three Temperatures** | Three columns | The same prompt at low, medium, and high temperature, showing the spread of next-token choices | [2](../chapters/02-how-language-models-work/index.md) |
| **Tokens Are Not Words** | Full-width strip | A sentence cut into tokens, with acronyms, numbers, and equations costing more | [2](../chapters/02-how-language-models-work/index.md) |
| **The Sycophancy Mirror** | Side-by-side | A model that agrees with a wrong claim versus one asked to argue against it | [17](../chapters/17-verification-reproducibility/index.md) |
| **Planner or Doer?** | Side-by-side | How a planning agent and an execution agent differ in tools, outputs, and reviewers | [9](../chapters/09-supervising-agents-roles/index.md), [10](../chapters/10-orchestrating-agent-teams/index.md) |
| **Eight Questions Before You Pick an Agent** | Full-width matrix | The durable comparison criteria for personal agents, drawn as eight dials and no product names | [19](../chapters/19-always-on-personal-agents/index.md) |
| **Search Casts a Wide Net, Triage Casts a Fine One** | Side-by-side | The precision and recall trade-off of an AI-assisted literature search | [11](../chapters/11-literature-search-synthesis/index.md) |

## Suggested Production Order

1. **Posters 1, 10, 13, 17, 19:** the five that carry the argument of the whole book.
2. **Posters 2, 3, 4, 5:** the foundation cluster for Chapters 2 to 5, where students form their first habits.
3. **Posters 7, 8, 9, 11, 12:** the skills, agents, and research-task cluster.
4. **Posters 6, 14, 15, 16, 18, 20:** the knowledge, communication, ethics, and case-study cluster.

## How Each Poster Becomes an Interactive Page

Each poster follows the same recipe used in the built-environment book, so the production work is
repeatable.

1. Create `docs/posters/<poster-id>/` with a kebab-case id.
2. Write `image-prompt.md` from the image description above. Repeat the **no text of any kind** rule at the top.
3. Generate the 16:9 image and save it as `<poster-id>.png`.
4. Fill in `data.json` with regions (grid) or markers (callout). Each region carries a label, a student-friendly description, and a hint for Quiz mode.
5. Add `main.html` and an `index.md` with `status: scaffold` in the frontmatter. Move to `built` when the image and overlay work. **Only the author sets `approved`.**
6. Open `main.html?edit=true`, drag each region onto its place in the image, and copy the coordinates back into `data.json`.
7. Generate a thumbnail and add the poster to a `docs/posters/index.md` gallery.
8. Add the page to the `nav:` block of `mkdocs.yml` and run `mkdocs build --strict`.

!!! mascot-tip "Let the pictures argue"
    ![Volt giving a tip](../img/mascot/tip.png){ class="mascot-admonition-img" }
    A poster that says "check the output" is a slogan. A poster that shows the same script with and
    without the check, side by side, is an argument. Draw the argument.
