---
title: "Prompt Injection Spotter"
description: "Classify eight text snippets that an agent has been asked to read as an injected instruction aimed at the model or as ordinary content, with feedback on the capability each injection tries to borrow and the defense that limits it."
social:
   cards: false
quality_score: 0
status: built
---

# Prompt Injection Spotter

<iframe src="main.html" height="662px" width="100%" scrolling="no"></iframe>

[Run the Prompt Injection Spotter MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

A **prompt injection** is text inside the material a model processes that is written to be taken as an instruction. Telling it apart from ordinary content is harder than it sounds, because ordinary documents are full of imperative sentences. A methods section tells a human reader what to do, and that is not an injection. An injection is aimed at the *model*, or at whatever reads the text automatically, and tries to change what it does.

This MicroSim asks you to **differentiate** eight snippets that an agent has been asked to read. Each one comes with a source label, such as a paper's methods section, a README, or a message in a mailbox. Surface features appear in both classes: imperative voice and words like "ignore" or "disregard" show up in ordinary content as well as in injections, so you have to decide who the text is addressed to.

| Classification | Meaning |
|---|---|
| Injected instruction | Directed at an AI model or automated reader, asking it to change its behavior, disclose information, or take an action |
| Ordinary content | Anything else, including imperative text addressed to a human reader |

For each injected instruction, the feedback names the capability the text tries to borrow (the report, a secret, a mailbox, or a shell) and the structural defense from the chapter that would limit it: least privilege, separated channels, human approval for consequential actions, or treating output as untrusted. All snippets are invented for this exercise, and the domains example.org and example.com are reserved for documentation use.

**Learning objective:** differentiate, among eight text snippets that an agent has been asked to read, those that contain an injected instruction aimed at the model from those that are ordinary content, with at least 7 of 8 classified correctly.

## How to Use

1. Read the source label and the snippet. The question on screen is *Is this text trying to steer the model?*
2. Press **Injected instruction** or **Ordinary content**. Each snippet gets one attempt, and the answer is committed at once.
3. Read the feedback. A correct answer shows *Correct:* with the classification; a wrong one shows *This is* with the correct classification. Both show the reason. For an injected instruction, a box names the capability it tries to borrow and the defense that would limit it.
4. Press **Next Snippet** to continue. The eight snippets come in a fixed order.
5. After snippet 8, press **See Score**. The summary shows *n of 8 correct*, whether you met the mastery threshold of 7, and, for each missed snippet, the misconception that the miss suggests. If the list is long, press **More Missed Snippets** to page through it.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/prompt-injection-spotter/main.html"
        height="662px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10 minutes

### Prerequisites
- Prompt injection, untrusted content, least privilege, and human approval, from the section "Prompt Injection" in Chapter 4

### Learning Objective
Differentiate, among eight text snippets that an agent has been asked to read, those that contain an injected instruction aimed at the model from those that are ordinary content, with at least 7 of 8 classified correctly.

- **Bloom level:** Analyze
- **Bloom verb:** differentiate

### Activities

1. **Exploration** (5 min): Classify the eight snippets. Before each answer, say in a phrase who the text is addressed to: a human reader or the model.
2. **Discussion** (5 min): Compare snippet 6, a peer-review comment that says "disregard the previous version", with snippet 2, which says "ignore your previous instructions". Explain why one is an injection and the other is not, and which structural defense would limit the damage from each injection you found.

### Evidence of Mastery
- For each of eight snippets you commit one classification, "injected instruction" or "ordinary content". A classification is correct when it equals the answer key.
- **Mastery:** at least 7 of 8 correct on the first attempt.
- Reading a snippet's source label is exploration and is not evidence.

## References

1. [Chapter 4: Context Engineering and Advanced Prompting](../../chapters/04-context-engineering-prompting/index.md) - the section "Prompt Injection" defines injection and the four structural defenses used in the feedback.
