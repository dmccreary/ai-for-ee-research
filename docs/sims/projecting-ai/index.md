---
title: Projecting AI Task Completion to 2030
description: Interactive chart of METR's measured AI task-completion time horizons from 2019 to April 2026, with an exponential trend projected to 2030.
image: /sims/projecting-ai/projecting-ai.png
og:image: /sims/projecting-ai/projecting-ai.png
twitter:image: /sims/projecting-ai/projecting-ai.png
social:
   cards: false
quality_score: 0
status: built
---

# Projecting AI Task Completion to 2030

<iframe src="main.html" height="762px" width="100%" scrolling="no"></iframe>

[Run the Projecting AI Task Completion MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

To use this chart on any website, copy this line of HTML into your web page:

```html
<iframe src="https://dmccreary.github.io/ai-for-ee-research/sims/projecting-ai/main.html" width="100%" height="762"></iframe>
```

## About This MicroSim

METR measures how long a task an AI model can complete, where "long" means the time a human expert needs for the same task. The **50% time horizon** is the task length a model completes successfully half the time, and the **80% time horizon** is the task length it completes 80% of the time. This MicroSim puts release date on the horizontal axis and the time horizon on the vertical axis, and extends the exponential trend to 2030.

For an AI-assisted research group, the time horizon is a rough guide to how much work you can hand an agent in one go. A model with a 20-minute horizon suits a single function or a literature lookup. A model with a 12-hour horizon can plausibly take a larger piece of a project, though it still fails half of the tasks of that length, which is why the review habits in this book still apply.

## Data (METR Time Horizon 1.1)

The chart data is METR's published `METR-Horizon-v1.1` results, retrieved on 2026-10-19 from [benchmark_results_1_1.yaml](https://metr.org/assets/benchmark_results_1_1.yaml). The file holds 26 models from GPT-2 (February 2019) to Claude Mythos Preview, an early version (April 2026).

- **Frontier (green):** the best model METR had measured at the time of its release (METR's `is_sota` flag), 18 models.
- **Non-frontier (gray):** other models measured on the same suite, 8 models.
- **Recent frontier models:** Claude Opus 4.6 at about 12 hours (719 min) at 50% and 70 minutes at 80%, and Claude Mythos Preview (early) at about 17 hours (1,045 min) at 50% and 3.1 hours at 80%.

**Reliability limit.** METR notes that measurements above 16 hours are unreliable with its current task suite, so the Mythos Preview point is best read as "at least this long", and the tooltip says so. The trend line is anchored on Claude Opus 4.6, the newest model below that limit.

## Interactive Features

- **Scale:** Log shows the exponential pattern as a roughly straight line. Linear shows how far the latest models are above the rest.
- **Success Probability:** 50% or 80%. The 80% horizons are several times shorter, and the gap shows how much reliability costs.
- **Doubling Time:** switches the trend line between METR's two fitted doubling times, described below.
- **Trend Line:** show or hide the projection.
- **Hover:** shows the model name, the horizon in seconds, minutes, hours, or days, and the release date.

## The Doubling Time

METR's data file gives two doubling times, both fitted without points above 16 hours:

| Fit | Doubling time | Notes |
|---|---|---|
| All-time (2019 onward) | 187.8 days (about 6.2 months) | The default. Close to the 7 months in METR's March 2025 paper. |
| Since 2023 | 128.7 days (about 4.2 months) | Interval 104 to 158 days. Recent models have been improving faster. |

The trend line is `horizon = reference × 2^(days since reference ÷ doubling time)`, starting from Claude Opus 4.6 (February 2026) at 12.0 hours for the 50% horizon:

| Date | 6.2-month doubling | 4.2-month doubling |
|---|---|---|
| January 2027 | about 41 hours (1.7 days) | about 71 hours (3 days) |
| January 2028 | about 156 hours (6.5 days) | about 505 hours (21 days) |
| January 2030 | about 96 days | about 3 years |

The last cell is a warning sign, not a forecast. Nobody expects tasks of that length to be measured or even to exist in a form that fits the benchmark.

## Limitations

1. **A projection, not a prediction.** Exponential trends end. Compute, cost, or a lack of very long tasks to measure could all bend the curve.
2. **Long tasks are poorly measured.** There are far fewer very long tasks than short ones, and the longest ones often have estimated rather than timed human completion.
3. **Software tasks.** The suite is mostly software engineering and research-engineering work. Other kinds of work may differ.
4. **Model set.** The chart shows only what METR has published. Models it has not measured, for example many open-weight models, are missing. Earlier versions of this chart used the older Time Horizon 1.0 suite and included models such as Grok-4, Claude Sonnet 4.5, and several DeepSeek and Qwen models; those are not in the current v1.1 file.
5. **Not comparable across suites.** Time Horizon 1.1 re-estimated older models, so numbers from older charts and papers (for example GPT-5 at about 2 hours 17 minutes) will not match the 203 minutes shown here.

## How to Update the Data

Edit the `modelData` object in `script.js`. All horizons are in **minutes**:

```javascript
{ name: 'Model Name', horizon50: 100.0, horizon80: 20.0, date: 'YYYY-MM-DD' }
```

The METR file reports `p50_horizon_length` and `p80_horizon_length` in minutes, with `release_date` for the date. If the doubling times change, edit `doublingOptions` and the two button labels in `main.html`. If a newer model passes 16 hours, consider changing `TREND_REFERENCE` to the newest model below the limit, or noting the new reliability limit.

## Technical Details

- **Library:** Chart.js 4.4.0 with the date-fns adapter for time series
- **Chart type:** scatter plot with an optional trend line
- **Time range:** 2019 to 2030
- **Data source:** [METR time horizons](https://metr.org/time-horizons)

## References

- [METR: Task-Completion Time Horizons of Frontier AI Models](https://metr.org/time-horizons)
- [METR: Measuring AI Ability to Complete Long Tasks (March 2025)](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)
- [Measuring AI Ability to Complete Long Software Tasks (arXiv 2503.14499)](https://arxiv.org/abs/2503.14499)
- [Chart.js time series axes](https://www.chartjs.org/docs/latest/axes/cartesian/time.html)
