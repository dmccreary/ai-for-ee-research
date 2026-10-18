---
title: "Desktop Setup"
description: "Interactive vis-network diagram of the four Week 1 tools — Desktop, GitHub, VS Code, and the Unix shell — and the labeled relationships that connect them."
image: /sims/desktop-setup/desktop-setup.png
og:image: /sims/desktop-setup/desktop-setup.png
twitter:image: /sims/desktop-setup/desktop-setup.png
social:
   cards: false
quality_score: 0
status: built
---

# Desktop Setup

<iframe src="main.html" height="642px" width="100%" scrolling="no"></iframe>

[Run the Desktop Setup MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This diagram maps the four tools every student wires together in the setup that comes before any work with an agent, which builds on [Chapter 5: Markdown and Version Control](../../chapters/05-markdown-and-version-control/index.md): **Desktop**, **GitHub**, **VS Code**, and the **Unix shell**. Each circle is a tool; each labeled arrow is a real, specific way one tool controls or talks to another — like Desktop "Controls using gh" to reach GitHub.

GitHub gets special billing here for a reason: it's a **required** node, not an optional one. Desktop is naturally reluctant to take actions it can't undo, and a per-project GitHub repository is what gives it that undo button. Click the GitHub circle to see why that one habit matters more than any other in Week 1.

## How to Use

- **Hover** over any circle or arrow for a one-sentence reminder of what it does.
- **Click** a circle to open a full explanation of that tool in the panel below the diagram.
- **Click** an arrow to open a full explanation of that specific relationship — for example, what "Runs git & gh against" actually means when VS Code's terminal talks to GitHub.
- Work your way around all four tools and all six relationships to see the complete Week 1 setup.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/desktop-setup/main.html"
        height="642px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Adult / professional learners — researchers setting up their first AI agent workflow.

### Duration
10-15 minutes

### Prerequisites
None — this diagram is designed to be a student's first exposure to how the Week 1 toolchain fits together, before any hands-on installation begins.

### Activities

1. **Exploration** (5 min): Click through all four tools first, then all six relationships, reading each infobox.
2. **Guided Practice** (5 min): Ask students to trace the path a single code change takes — from Desktop, through the shell, to GitHub, and back into VS Code — using only the arrows in the diagram.
3. **Assessment** (3-5 min): Ask students to explain, in their own words, why GitHub is a *required* stop in that path rather than a nice-to-have.

### Assessment
Students should be able to name all four tools, describe at least one relationship between each pair, and explain why a per-project GitHub repository gives Desktop the ability to undo its own mistakes.

## References

1. [Chapter 5: Markdown and Version Control](../../chapters/05-markdown-and-version-control/index.md) — the chapter on the version control that gives an agent an undo button.
2. [GitHub CLI (`gh`) Manual](https://cli.github.com/manual/) — the command-line tool Desktop uses to control GitHub.
3. [Visual Studio Code Docs: Using Git source control](https://code.visualstudio.com/docs/sourcecontrol/overview) — how VS Code's Source Control panel commits and syncs with GitHub.
