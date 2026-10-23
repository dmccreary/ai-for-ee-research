"""Generate figures/chapter-budgets.png.

Data source: figures/chapter-budgets.csv, transcribed from
logs/chapter-content-generator-2026-10-15.md in the ai-for-ee-research repository
(word budgets and approximate prose-word counts recorded by the chapter generator).
"""
import csv
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

HERE = Path(__file__).parent
OUT = Path(__file__).with_suffix(".png")
BLUE, ORANGE, VERMILLION, GREY = "#0072B2", "#E69F00", "#D55E00", "#555555"

plt.rcParams.update({"font.family": "serif", "font.size": 9,
                     "axes.spines.top": False, "axes.spines.right": False})

with open(HERE / "chapter-budgets.csv") as f:
    rows = list(csv.DictReader(line for line in f if not line.startswith("#")))
ch = [int(r["chapter"]) for r in rows]
lo = [int(r["budget_low"]) for r in rows]
hi = [int(r["budget_high"]) for r in rows]
pw = [int(r["prose_words"]) for r in rows]

fig, ax = plt.subplots(figsize=(6.2, 3.3))
ax.vlines(ch, lo, hi, color=BLUE, linewidth=6, alpha=0.35, label="Word budget (low to high)")
below = [p < l for p, l in zip(pw, lo)]
ax.scatter([c for c, b in zip(ch, below) if b], [p for p, b in zip(pw, below) if b],
           marker="v", s=28, color=VERMILLION, zorder=3, label="Prose words, below budget")
ax.scatter([c for c, b in zip(ch, below) if not b], [p for p, b in zip(pw, below) if not b],
           marker="o", s=24, color=BLUE, zorder=3, label="Prose words, within budget")
ax.set_xticks(ch)
ax.set_xlabel("Chapter")
ax.set_ylabel("Words")
ax.set_ylim(0, 12500)
ax.yaxis.set_major_formatter(matplotlib.ticker.FuncFormatter(lambda v, _: f"{int(v):,}"))
ax.grid(axis="y", color="#dddddd", linewidth=0.5)
ax.set_axisbelow(True)
ax.legend(frameon=False, loc="upper right", fontsize=8)
fig.tight_layout()
fig.savefig(OUT, dpi=300)
print(f"wrote {OUT}")
