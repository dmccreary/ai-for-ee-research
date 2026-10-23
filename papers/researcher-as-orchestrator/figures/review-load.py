"""Generate figures/review-load.png.

Plots Equation (2) of the paper, L = n_p k_p r_p s_p + n_e k_e r_e s_e + c, for a team with
two planning agents per execution agent. All parameters are the illustrative values of the
worked example in Chapter 10 of "AI for EE Research" (k = 1 artifact/agent/day, r_p = 6 min,
r_e = 15 min, c = 30 min, budget B = 240 min). They are not measurements.
"""
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

OUT = Path(__file__).with_suffix(".png")
BLUE, ORANGE, GREEN, BLACK = "#0072B2", "#E69F00", "#009E73", "#000000"
plt.rcParams.update({"font.family": "serif", "font.size": 9,
                     "axes.spines.top": False, "axes.spines.right": False})

K, R_P, R_E, C, B = 1, 6, 15, 30, 240
N = list(range(0, 61, 3))                    # total team size, 2:1 planning:execution


def load(n, s_p=1.0, s_e=1.0, r_e=R_E):
    n_p, n_e = 2 * n / 3, n / 3
    return n_p * K * R_P * s_p + n_e * K * r_e * s_e + C


regimes = [
    ("Read every artifact", dict(), BLUE, "o", "-"),
    ("Sample half of planning artifacts", dict(s_p=0.5), ORANGE, "s", "--"),
    ("Sample half of planning; scripts halve execution review", dict(s_p=0.5, r_e=R_E / 2), GREEN, "^", "-."),
]
fig, ax = plt.subplots(figsize=(6.2, 3.2))
for label, kw, color, marker, ls in regimes:
    ax.plot(N, [load(n, **kw) / 60 for n in N], color=color, marker=marker, markersize=3.5,
            linestyle=ls, linewidth=1.4, label=label)
ax.axhline(B / 60, color=BLACK, linewidth=1.0, linestyle=":")
ax.text(1, B / 60 + 0.12, "Attention budget B = 4 h/day", fontsize=8)
ax.axvline(30, color="#999999", linewidth=0.6)
ax.text(30.6, 0.35, "20 planning +\n10 execution", fontsize=7.5, color="#555555", va="bottom")
ax.set_xlabel("Team size (agents, two planning per execution agent)")
ax.set_ylabel("Daily review load L (hours)")
ax.set_xlim(0, 60)
ax.set_ylim(0, 9)
ax.grid(axis="y", color="#dddddd", linewidth=0.5)
ax.set_axisbelow(True)
leg = ax.legend(frameon=True, loc="upper left", fontsize=7.5, framealpha=1.0)
leg.get_frame().set_edgecolor("none")
fig.tight_layout()
fig.savefig(OUT, dpi=300)
print(f"wrote {OUT}")
