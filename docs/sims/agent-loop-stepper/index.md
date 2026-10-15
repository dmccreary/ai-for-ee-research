---
title: "Agent Loop Stepper"
description: 'Predict the next tool call at each of five steps of an agent loop that diagnoses a low ENOB result, then watch the model emit the call, the harness run it, and the result return to the context.'
social:
   cards: false
quality_score: 0
status: built
---

# Agent Loop Stepper

<iframe src="main.html" height="847px" width="100%" scrolling="no"></iframe>

[Run the Agent Loop Stepper MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

An agent does not plan everything in one step and then execute. It works in a loop: the **model** decides on an action and emits a tool call, the **harness** runs the tool, and the result is added to the context, where the model reads it before deciding again. This MicroSim steps through one short loop so that you can **infer** each next action from what the agent has observed so far.

The task, shown at the start, is: *"The ENOB of capture-07.csv is 6.1 bits but the converter should give about 9. Find out why."* The agent has three tools: `read_file`, `run_python`, and `list_files`. The files, results, and numbers are invented for illustration, and the sim labels them "Illustrative data".

At each of five steps you see three candidate next actions. Exactly one is correct: the one that follows from the results observed so far and does not exceed the scope of the task. You predict before the agent's actual choice is shown, so your mental model of the loop is tested at every step.

The strip of five boxes across the top shows the stages of one pass through the loop from the chapter: **Decide** (model), **Call** (model), **Run** (harness), **Observe** (harness to model), and **Repeat or stop** (model). The active stage has a thick border and a triangle marker.

## How to Use

1. Read the task, the tools, and the **Context** panel, which lists the calls and results the agent has seen so far. At the start it says *Nothing yet.* and the question on screen is *What should the agent do first?*
2. Read candidates A, B, and C, then press **Choose A**, **Choose B**, or **Choose C**. The press commits your prediction, and each step allows one attempt.
3. Read the feedback. A correct prediction shows **Correct.** with the reason. An incorrect one shows the agent's action and the reason. The agent's action is outlined and marked *The agent's action* with a check mark; a different prediction is marked *Your prediction* with an X.
4. Watch the stage strip: the model emits the call, the harness runs it, and the result appears in the Context panel marked *[new]*. On wide screens the full sequence stays listed under the feedback.
5. Press **Next Step** to continue. At step 5 the agent gives a final answer instead of a tool call, so the Run and Observe stages are marked *skipped* and the loop stops.
6. After step 5, press **See Full Loop**. The summary shows *n of 5 correct*, whether you reached mastery (4 of 5), and the whole loop as a list of calls and results with your prediction at each step.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/agent-loop-stepper/main.html"
        height="847px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration
10 minutes

### Prerequisites
- Tool use, tool definition, tool call, and the agent loop, from the section "Tool Use and the Agent Loop" in Chapter 8
- The roles of the model and the harness: the model emits a tool call, and the harness executes it and returns the result to the context

### Learning Objective
The learner will infer the agent's next tool call at each of five steps of a loop that diagnoses a low ENOB result, given the task and the results observed so far, with at least 4 of 5 correct.

- **Bloom level:** Understand
- **Bloom verb:** infer

### Activities

1. **Prediction** (5 min): Step through the loop once. Before each choice, say in one sentence what the latest result tells the agent.
2. **Discussion** (5 min): Using the summary list, trace how each result shaped the next call. Identify where the loop would have gone wrong if the agent had acted before measuring (step 3) or had edited the project file instead of testing on a copy (step 4).

### Assessment
- **Evidence of mastery:** at each of five steps the learner commits one of three candidate next actions before the agent's actual choice is shown. A prediction is correct when it equals the action marked correct in the specification. Mastery is at least 4 of 5 correct.
- Stepping forward after the reveal is exploration and is not evidence of mastery.

### Common Misconceptions Addressed
- The model runs the tools itself. (The stage strip shows that the harness runs every call.)
- The agent decides everything in one planning step and then executes. (Each action depends on the previous result.)
- An error result ends the loop. (Every result goes back to the model, and the loop stops only when the model judges the task complete or a limit is reached.)

## References

1. [Chapter 8: Agents, Tool Use, and Subagents](../../chapters/08-agents-tool-use-subagents/index.md) - the section "Tool Use and the Agent Loop" defines tool use, tool calls, the harness, and the five stages of the loop used in this sim.
