---
title: "From Generative AI to Agent"
description: "Interactive vis-network MicroSim in which learners explain what each of the three links from generative AI to large language model, AI assistant, and AI agent adds, choosing one capability per link."
image: /sims/generative-ai-to-agent/generative-ai-to-agent.png
og:image: /sims/generative-ai-to-agent/generative-ai-to-agent.png
twitter:image: /sims/generative-ai-to-agent/generative-ai-to-agent.png
social:
   cards: false
quality_score: 0
status: built
---

# From Generative AI to Agent

<iframe src="main.html" height="762px" width="100%" scrolling="no"></iframe>

[Run the From Generative AI to Agent MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Four terms appear in a row as a chain: **Generative AI**, **Large Language Model**, **AI Assistant**, and **AI Agent**, joined by three links. The question on screen is *What changes at each step from generative AI to an AI agent?*

Each link asks what the second term adds to the first. You choose one of four options and commit. Three of the options are common misconceptions, such as the idea that a larger model or a friendlier tone is what turns an assistant into an agent. After each commit the sim reveals the correct capability, and if you chose a distractor it explains why that choice belongs somewhere else in the chain.

The chain ends with the point the chapter makes: an AI agent is an AI assistant plus **tools and a loop**. It acts, observes the result, and chooses the next step.

You can open any node at any time to read its definition. Opening a node is exploration and is not scored.

## How to Use

1. Click any node in the diagram, or use the **Open a node** buttons below it, to read that term's definition. This step is optional and is not scored.
2. Look at the exercise panel. It shows **Link 1 of 3: Generative AI → Large Language Model** and asks *What does the second term add to the first?*
3. Select one of the four options, then press **Commit answer**. You can also use the arrow keys to move between options and press Enter to commit.
4. Read the feedback. A correct choice shows "Correct" and the correct option. An incorrect choice shows why that option does not fit this link, followed by the correct option. You cannot change an answer after you commit it.
5. Press **Next link** to move on. A link cannot be answered until the previous link has been answered. Each answered link is marked in the diagram with a check mark (correct) or an X (incorrect).
6. After the third link the panel shows your final score as *n of 3 correct*. Mastery is 3 of 3.
7. Press **Restart** at any time to begin a new run. The order of the options is reshuffled on every run.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/generative-ai-to-agent/main.html"
        height="762px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will explain what capability each of the three links in the chain from generative AI to AI agent adds, by selecting the correct capability for all three links (Bloom: Understand, verb: explain).

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10-15 minutes

### Prerequisites

The six terms defined in the section "The Vocabulary of Generative AI" of [Chapter 1](../../chapters/01-research-workflows-orchestrator/index.md):

- generative AI
- large language model
- AI assistant
- AI agent
- tool
- loop

### Activities

1. **Exploration** (5 min): Open each of the four nodes and read its definition. For each pair of neighboring terms, say out loud what the second term has that the first does not. This step is not scored.
2. **Guided Practice** (5 min): Work through the three links in order. Before you commit each answer, predict the capability in your own words, then compare your prediction with the options. After each commit, read the feedback, including the explanation for any distractor you chose.
3. **Assessment** (5 min): Restart so the options are reshuffled, and answer all three links without opening the nodes. Then, without the sim, write one sentence that explains the difference between an AI assistant and an AI agent.

### Assessment

- **Mastery:** 3 of 3 links correct, counting the first commit on each link.
- Opening nodes to read definitions is exploration and does not count as evidence.
- A learner who has mastered the objective can state, in one sentence, that an agent adds tools and a loop to an assistant: it acts, observes the result, and chooses the next step.
- Watch for the three misconceptions the distractors target: that an assistant and an agent differ only in branding, that a larger model is what makes an agent, and that an agent is a chatbot with a friendlier tone or a longer memory.

## References

1. [Chapter 1: Research Workflows and the Researcher as Orchestrator](../../chapters/01-research-workflows-orchestrator/index.md) - the section "The Vocabulary of Generative AI" defines the four terms in this chain and states that an agent adds tools and a loop to an assistant.
2. [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) - the JavaScript network library used to draw the chain.
