---
{
  "key": "distributions.normal-parameters",
  "title": "Finding the mean or standard deviation of a normal distribution",
  "summary": "Work backwards from given probabilities to an unknown mean μ, an unknown standard deviation σ, or both (by simultaneous equations), using the inverse normal tables, in context.",
  "concepts": ["amath.distributions.normal-parameters"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

So far the mean and standard deviation of a normal distribution have been given, and we have found probabilities. Real problems often run the other way. A cement factory in Gweru wants only 2.5% of its 50 kg bags to weigh less than 49 kg: what mean mass should the filling machine be set to? A teacher knows that 10% of candidates scored under 30 and 25% scored over 54: what were the mean and standard deviation of the marks?

These are **reverse** problems: a probability is known, and a parameter is unknown. The key tool is the same equation as before,

$$
z = \frac{x - \mu}{\sigma}
$$

but now $z$ comes from the tables (read backwards) and the equation is solved for $\mu$, for $\sigma$, or for both. ZIMSEC Paper 2 regularly includes one of these as the second half of a normal distribution question.

## Key definitions

:::definition{term="Inverse normal (reverse use of the tables)"}
Finding the value of $z$ for which $\Phi(z) = p$, by looking for $p$ inside the body of the standard normal table. Some common values: $\Phi(1.282) = 0.9$, $\Phi(1.645) = 0.95$, $\Phi(1.96) = 0.975$, $\Phi(2.326) = 0.99$.
:::

:::formula{name="The link between x, μ, σ and z"}
$$
x = \mu + z\sigma
$$
:::

This is just the standardising formula rearranged. Each piece of information "a probability for a value $x$" gives one equation of this form.

## The method

1. Sketch the bell curve, mark the value $x$ and shade the given probability.
2. Convert the probability to an area **to the left** of $x$ (use $1 - p$ if the given area is to the right).
3. Read $z$ from the tables. If the area to the left is below 0.5, $z$ is **negative**.
4. Write $\frac{x - \mu}{\sigma} = z$ and solve for the unknown.

## Finding an unknown mean

:::worked-solution[Example 1: X ~ N(μ, 25) and P(X > 40) = 0.0668. Find μ.]
1. $\sigma = 5$. The area to the left of 40 is $1 - 0.0668 = 0.9332$.
2. From the tables, $\Phi(1.5) = 0.9332$, so $z = 1.5$: 40 is 1.5 standard deviations above the mean.
3. $\frac{40 - \mu}{5} = 1.5$, so $40 - \mu = 7.5$.
4. $\mu = 32.5$.
:::

:::worked-solution[Example 2: bags of cement filled by a machine have masses that are normally distributed with standard deviation 0.4 kg. The factory wants only 2.5% of bags to weigh less than 49 kg. Find the mean mass the machine should be set to.]
1. $P(X < 49) = 0.025$. The area to the left is below 0.5, so $z$ is negative.
2. $\Phi(1.96) = 0.975$, so $\Phi(-1.96) = 0.025$ and $z = -1.96$.
3. $\frac{49 - \mu}{0.4} = -1.96$, so $49 - \mu = -0.784$.
4. $\mu = 49.784 \approx 49.8$ kg.
5. Check the sense: the mean must be above 49 kg for only a small fraction of bags to fall below 49 kg. ✓
:::

## Finding an unknown standard deviation

:::worked-solution[Example 3: X ~ N(60, σ²) and P(X < 52) = 0.15. Find σ.]
1. The area to the left of 52 is 0.15, below 0.5, so $z$ is negative.
2. $\Phi(1.036) = 0.85$, so $z = -1.036$.
3. $\frac{52 - 60}{\sigma} = -1.036$, so $\sigma = \frac{-8}{-1.036} = 7.72$ (3 s.f.).
:::

A standard deviation must be positive. If you get a negative $\sigma$, the sign of $z$ is wrong: check whether the value is above or below the mean.

## Finding both μ and σ

Two pieces of information give two equations. Each has the form $x = \mu + z\sigma$, so the pair are **simultaneous linear equations** in $\mu$ and $\sigma$.

:::worked-solution[Example 4: the marks in a district examination are normally distributed. 10% of candidates scored less than 30 marks and 25% scored more than 54 marks. Find the mean and standard deviation of the marks.]
1. $P(X < 30) = 0.1$: area to the left is 0.1, so $z = -1.282$. Equation: $30 = \mu - 1.282\sigma$.
2. $P(X > 54) = 0.25$: area to the left is 0.75, so $z = 0.674$. Equation: $54 = \mu + 0.674\sigma$.
3. Subtract the first equation from the second: $24 = 1.956\sigma$, so $\sigma = 12.27$.
4. Substitute: $\mu = 30 + 1.282 \times 12.27 = 45.73$.
5. Mean $\approx 45.7$ marks, standard deviation $\approx 12.3$ marks.
6. Check: $\frac{30 - 45.73}{12.27} = -1.28$ and $\frac{54 - 45.73}{12.27} = 0.674$. ✓
:::

The mean lies between 30 and 54, and closer to 54, because only 25% are above 54 while just 10% are below 30. A quick check like this catches most sign errors.

## Reading the table accurately

Four-figure tables rarely contain the exact probability. Either take the nearest entry (for example $\Phi(0.67) = 0.7486$ and $\Phi(0.68) = 0.7517$, so $z \approx 0.674$ for 0.75), or use the "critical values" table printed with most standard normal tables, which gives $z$ for common probabilities such as 0.75, 0.9, 0.95, 0.975 and 0.99. Small differences in the third decimal place of $z$ do not affect a 3 significant figure answer for $\mu$ or $\sigma$ very much, but use the most accurate value available.

:::keyfact{title="ZIMSEC and Cambridge"}
Finding the mean, the variance or both of a normal distribution is in ZIMSEC Paper 2 (Probability and Statistics). Cambridge 0606 does not examine statistics.
:::

## Common mistakes

:::mistake{title="Using the probability instead of z"}
$\frac{40 - \mu}{5} = 0.0668$ is wrong: the right-hand side must be a $z$-value from the tables, not a probability.
:::

:::mistake{title="Wrong sign of z"}
A value below the mean has a negative $z$. Check with a sketch: is $x$ to the left or right of the peak?
:::

:::mistake{title="Using the right-hand area in the table"}
The tables give the area to the left. For $P(X > 54) = 0.25$, look up 0.75, not 0.25.
:::

:::mistake{title="Answering with the variance"}
If the question asks for the standard deviation, give $\sigma$; if it asks for the variance, give $\sigma^2$.
:::

## Exam tips

:::exam-tip
Write each equation in the form $\frac{x - \mu}{\sigma} = z$ with the $z$-value to at least 3 decimal places; these lines carry most of the method marks.
:::

:::exam-tip
For two unknowns, rewrite both equations as $\mu + z\sigma = x$ and subtract to eliminate $\mu$.
:::

:::exam-tip
Finish with a check: substitute your $\mu$ and $\sigma$ back to see that the given probabilities come out.
:::

## Summary

:::summary
- Turn the given probability into an area to the left, then read $z$ from the tables (negative below the mean).
- Use $x = \mu + z\sigma$: one equation finds one unknown.
- Two probabilities give two simultaneous equations for $\mu$ and $\sigma$.
- A standard deviation is positive; a mean between the two given values should lean towards the smaller tail.
:::
