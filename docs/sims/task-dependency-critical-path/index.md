---
title: "Task Dependency Critical Path Scheduler"
description: "Interactive vis-network MicroSim in which learners calculate earliest finish times, the critical path, slack, and the project duration for a nine-task dependency graph, then see how shortening one task moves the critical path."
social:
   cards: false
quality_score: 0
status: built
---

# Task Dependency Critical Path Scheduler

<iframe src="main.html" height="762px" width="100%" scrolling="no"></iframe>

[Run the Task Dependency Critical Path Scheduler MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Nine tasks from the running ADC project are drawn as a dependency graph, from the literature survey (T1) at the top to final assembly (T9) at the bottom. Each task shows its duration in hours. The durations are illustrative. An arrow from A to B means that B needs A's output. The question on screen at the start is *When can T5 finish?*

The sim asks five questions in a fixed order:

1. What is the earliest finish time of T5, in hours?
2. Which tasks form the critical path?
3. What is the slack of T4, in hours?
4. What is the project duration, in hours?
5. If T3 is reduced from 3 hours to 1 hour, what is the new project duration, in hours?

Each question has one attempt. After you submit, the sim says whether you were correct, gives the correct answer and the reason, and adds the forward pass to the graph: the earliest **start** and **finish** of each task. The tasks that the answer depends on are marked with a ▶ and a dashed blue border. From question 2 on, critical tasks carry a **★ critical** tag, an orange fill, and a thick border, and the arrows between them are drawn thick and solid. From question 3 on, every task shows its slack.

The rules are those of the chapter. A task's earliest start is the latest earliest finish of its prerequisites, or 0 if it has none. Its earliest finish is its earliest start plus its duration. The project duration is the largest earliest finish. Slack is the latest finish that does not delay the project minus the earliest finish, and a task is on the critical path when its slack is 0.

After question 5 the graph switches to T3 = 1 hour, and a **T3 duration** slider lets you try other values and watch the critical path move. Cutting 2 hours from T3 saves only 1 hour, because the path through the test suite T4 then becomes critical.

## How to Use

1. Read the graph. Each node shows the task, its name, and its duration in hours.
2. Type your answer in hours in the box and press **Submit** (or Enter). For question 2, press the **T1** to **T9** buttons to select the tasks on the critical path, then press **Submit**. If the box does not contain a number, the sim asks for one and does not count the attempt.
3. Read the feedback and the new start and finish times on the graph, then press **Next question**.
4. After question 5, read your score, *n of 5 correct*, and whether you met the mastery threshold of 4. Move the **T3 duration** slider to see how the project duration and the critical path change.
5. At any time, click a task in the graph or choose it in **Read a task** to read its details. You can also drag tasks around the graph. Reading details and dragging tasks are exploration and are not scored.
6. Press **Restart** to begin again with no times shown.

The zoom and arrow buttons in the graph corners zoom and pan the graph. Below 720 pixels of width, the graph and the question panel are stacked and scroll together inside the frame.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/task-dependency-critical-path/main.html"
        height="762px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

The learner will calculate the earliest finish time, the critical path, and the slack of tasks in a nine-task dependency graph, and recalculate the project duration after one duration changes, with at least 4 of 5 answers correct.

- **Bloom level:** Apply
- **Bloom verb:** calculate

### Grade Level

Graduate students (MS and PhD) in electrical engineering, computer engineering, and computer design, plus postdocs and faculty who want practical AI skills for everyday research (AI for EE Research)

### Duration

10-15 minutes

### Prerequisites

Task dependencies, task queue, critical path, earliest finish, and slack, all from the section "Breaking Work Down" of [Chapter 10](../../chapters/10-orchestrating-agent-teams/index.md).

### Activities

1. **Predict** (2 min): Before answering, add up all nine durations (21 hours) and write down whether you expect the project to take that long.
2. **Calculate** (8 min): Answer the five questions in order. For each number question, write the forward pass on paper first: the start and finish of every task the answer depends on.
3. **Explore** (5 min): After question 5, move the T3 slider from 1 to 6 hours. Note the value of T3 at which the critical path switches between the T3 branch and the T4 branch, and explain why cutting 2 hours from T3 saved only 1 hour.

### Assessment

- **Evidence of mastery:** for each of the five questions the learner enters a value or selects a path, and an answer is correct when it equals the answer key (12; T1, T2, T3, T5, T6, T8, T9; 1; 18; 17). Mastery is at least 4 of 5 correct on the first attempt.
- Dragging nodes or reading a task's details is exploration and is not evidence.
- Watch for three misconceptions: that the project duration is the sum of all task durations, that adding agents shortens any schedule, and that shortening a critical task always shortens the project by the same amount.

## References

1. [Chapter 10: Orchestrating Agent Teams](../../chapters/10-orchestrating-agent-teams/index.md) - the section "Breaking Work Down" gives the task table, the 18-hour critical path, and the 17-hour duration after T3 is shortened.
2. [Critical path method](https://en.wikipedia.org/wiki/Critical_path_method) - Wikipedia article on the forward and backward pass, slack (float), and the critical path.
3. [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) - the JavaScript network library used to draw the dependency graph.
