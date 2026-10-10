---
{
  "key": "skills.evaluation-improvements",
  "title": "Uncertainty in readings, limitations and improvements",
  "summary": "Estimate the absolute and percentage uncertainty of a reading, test a suggested relationship by comparing two values of a constant with a stated uncertainty, and write specific limitations and matching improvements.",
  "concepts": ["aphys.skills.evaluation-improvements"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

The second question of a Cambridge Paper 3 examination usually gives you a short experiment with only **two sets of readings**. You are asked how precise one reading is, whether the readings support a suggested relationship, and what went wrong in the method and how to fix it. ZIMSEC practical work asks the same questions of your own experiments.

These marks reward specific, thoughtful physics, not slogans. "Human error" and "repeat the experiment" score nothing; "it was difficult to judge when the block started moving, so use a video camera with a timer in view" scores two marks.

You should know the meaning of absolute, fractional and percentage uncertainty from the measurement topic, and how to record results from the tables-and-graphs lesson.

## Key definitions

:::definition{term="Absolute uncertainty"}
The range within which the true value of a reading is expected to lie, written $\pm$ the uncertainty in the same unit as the reading, e.g. $l = 0.800 \pm 0.002\ \text{m}$.
:::

:::definition{term="Percentage uncertainty"}
The absolute uncertainty divided by the measured value, multiplied by 100 %.
:::

:::formula{name="Percentage uncertainty and percentage difference"}
$$
\%\ \text{uncertainty} = \frac{\Delta x}{x} \times 100\,\%
\qquad
\%\ \text{difference} = \frac{|k_1 - k_2|}{\tfrac{1}{2}(k_1 + k_2)} \times 100\,\%
$$

$\Delta x$ is the absolute uncertainty in the reading $x$; $k_1$ and $k_2$ are the two values of the constant calculated from the two sets of readings.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need uncertainty estimates and evaluation. The two-readings test of a relationship ("calculate $k$ for each set and compare") is the standard Cambridge Paper 3 question 2 format; ZIMSEC practical reports use the same reasoning.
:::

## Estimating the uncertainty of a reading

There are two sources, and you choose the larger.

- **The instrument.** A reading cannot be more precise than the smallest division: $\pm 1\ \text{mm}$ for a metre rule (often taken as $\pm 0.5\ \text{mm}$ for each end, but $\pm 1$ or $2\ \text{mm}$ overall when positioning is awkward), $\pm 0.01\ \text{mm}$ for a micrometer, $\pm 0.01\ \text{s}$ displayed by a stop-watch.
- **The method.** When readings are repeated, the uncertainty is **half the range** of the repeats. For a hand-timed event this is usually far larger than the stop-watch resolution because of reaction time; a sensible estimate when only one reading is taken is $\pm 0.2\ \text{s}$ to $\pm 0.5\ \text{s}$.

:::worked-solution[Uncertainty in a timed slide]
Rudo times a wooden block sliding from rest down $0.800\ \text{m}$ of a sloping plank. Her three times are $1.43\ \text{s}$, $1.51\ \text{s}$ and $1.47\ \text{s}$.

1. Mean: $t = \dfrac{1.43 + 1.51 + 1.47}{3} = 1.47\ \text{s}$.
2. Half the range: $\Delta t = \dfrac{1.51 - 1.43}{2} = 0.04\ \text{s}$, so $t = 1.47 \pm 0.04\ \text{s}$.
3. Percentage uncertainty in $t$: $\dfrac{0.04}{1.47} \times 100 = 2.7\,\%$.
4. The distance was measured to $\pm 0.002\ \text{m}$: $\dfrac{0.002}{0.800} \times 100 = 0.25\,\%$, so the timing dominates.
:::

The percentage uncertainty of $t^2$ is **twice** that of $t$ (5.4 % here), because powers multiply percentage uncertainties. A suggested constant $k = d/t^2$ is then uncertain by about $0.25 + 5.4 \approx 5.7\,\%$.

## Testing a suggested relationship with two readings

The method is always the same.

1. Rearrange the suggested relationship so a constant stands alone: if $d = k t^2$, then $k = d/t^2$.
2. Calculate $k$ for each set of readings, to the right number of significant figures.
3. Calculate the percentage difference between the two values of $k$.
4. Compare it with a **criterion** you state: your own estimate of the percentage uncertainty in the experiment (often taken as about 10 % for a simple hand-timed method). If the difference is smaller, the readings are consistent with the relationship; if larger, they are not.

:::worked-solution[Is $d$ proportional to $t^2$?]
Rudo repeats the experiment with $d = 0.400\ \text{m}$ and obtains a mean time of $1.07\ \text{s}$. She suggests $d = kt^2$ and estimates that her experiment is uncertain by about 10 %.

1. First set: $k_1 = \dfrac{0.800}{1.47^2} = 0.370\ \text{m s}^{-2}$.
2. Second set: $k_2 = \dfrac{0.400}{1.07^2} = 0.349\ \text{m s}^{-2}$.
3. Percentage difference $= \dfrac{0.370 - 0.349}{\tfrac{1}{2}(0.370 + 0.349)} \times 100 = 5.8\,\%$.
4. $5.8\,\% < 10\,\%$, so the two values of $k$ agree within the uncertainty of the experiment: the readings **support** $d = kt^2$.
:::

Two readings can only be **consistent with** a relationship; they cannot prove it. That is why "take more readings and plot a graph" is a valid improvement, provided you say what graph and what you would look for (a straight line through the origin for $d$ against $t^2$).

## Limitations and improvements

A good limitation names the **quantity** affected and the **reason**; a good improvement is a **specific change** that deals with that reason. Write them as matching pairs.

| Limitation (quantity + reason) | Improvement (specific) |
| --- | --- |
| Only two values of $d$ were used, so the relationship cannot be tested reliably. | Take readings at six or more distances and plot $d$ against $t^2$, checking for a straight line through the origin. |
| $t$ was hard to measure because starting and stopping the watch by hand involves reaction time. | Use two light gates connected to a timer (or a data logger), or film the block with a timer in view and play the video frame by frame. |
| The block was sometimes given a small push on release, so it did not start from rest. | Hold the block with a card or a pin and release it by removing the card, or use an electromagnet and a steel plate on the block. |
| $d$ was uncertain because it was unclear which part of the block to measure from. | Mark a line on the side of the block and measure from that mark at the start and finish, with the rule held along the plank. |

Answers that never score on their own: "human error", "parallax error" with no instrument named, "repeat readings" (without saying it reduces a specific random uncertainty and that you would take an average), "use a computer", "be more careful", "do it in a vacuum".

## Predictions

Some questions ask you to use the constant to predict a value. Take the mean of $k_1$ and $k_2$ and substitute; for example, with $k = 0.360\ \text{m s}^{-2}$ the block would take $\sqrt{0.600/0.360} = 1.29\ \text{s}$ to slide $0.600\ \text{m}$.

## Common mistakes

:::mistake{title="Comparing values without a criterion"}
Saying "the values of $k$ are close, so the relationship is true". You must calculate the percentage difference and compare it with a stated percentage uncertainty.
:::

:::mistake{title="Using the resolution when repeats disagree"}
A stop-watch reads to $0.01\ \text{s}$, but repeated hand timings scatter by tenths of a second. The uncertainty is half the range of the repeats, not $0.01\ \text{s}$.
:::

:::mistake{title="Vague limitations"}
"Errors in timing" is not enough. Say which time, why it was hard to measure (the block was moving fast, the start was unclear) and give a specific improvement that addresses that reason.
:::

## Exam tips

:::exam-tip{title="Absolute and percentage uncertainty"}
State the absolute uncertainty with a unit and one or two significant figures, then show the division for the percentage. Use half the range when you have repeats; otherwise justify an estimate (for hand timing, about 0.2 s to 0.5 s).
:::

:::exam-tip{title="Explain whether the results support the relationship"}
Three parts earn the marks: two values of $k$ calculated correctly, a percentage difference, and a comparison with a criterion you state ("my estimated uncertainty is 10 %; 5.8 % is less than this, so the results support the relationship").
:::

:::exam-tip{title="Four limitations, four improvements"}
Cambridge typically gives about four marks for limitations and four for improvements. Each improvement should match a limitation. Write them in pairs so the examiner can see the link.
:::

## Summary

:::summary
- Uncertainty in a reading: the larger of the instrument resolution and half the range of repeats.
- Percentage uncertainty $= \Delta x / x \times 100\,\%$; powers multiply it (for $t^2$, double it).
- To test $y = kx$ with two readings: calculate $k$ twice, find the percentage difference and compare with a stated criterion.
- A limitation names the quantity and the reason; an improvement is a specific matching change.
- Two readings can show consistency, never proof: more readings and a graph are the real test.
:::
