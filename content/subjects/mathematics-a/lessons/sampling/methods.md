---
{
  "key": "sampling.methods",
  "title": "Populations, samples and sampling methods",
  "summary": "Distinguish a population from a sample, choose random samples with random numbers, explain why a sampling method may be biased, and (ZIMSEC) use simple random, systematic, stratified, cluster, quota, convenience and judgement sampling.",
  "concepts": ["amaths.sampling.methods"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A ministry official who wants the mean distance learners walk to school cannot measure every learner in Zimbabwe. A seed company cannot germinate every seed it sells, because testing destroys the seed. In both cases we study a **sample** and use it to draw conclusions about the whole **population**. The conclusions are only as good as the sample, so the way it is chosen matters as much as the arithmetic that follows.

ZIMSEC examines sampling in Statistics Form 5 (topic 6.7.1), including the names and uses of the main sampling techniques. Cambridge examines it in Paper 6 (topic 6.4): you must understand populations, samples, the need for randomness and the use of random numbers, and be able to explain why a given method is unsatisfactory, but you do not need to name particular techniques.

## Key definitions

:::definition{term="Population"}
The complete set of items about which information is wanted, e.g. all maize plots in a district, all bags filled by a machine in a week.
:::

:::definition{term="Sample"}
A subset of the population that is actually observed. A **census** observes every member of the population.
:::

:::definition{term="Sampling frame"}
A list or map of every member of the population, from which a sample can be chosen (a school register, a list of account numbers, a map of numbered plots).
:::

:::definition{term="Random sample"}
A sample chosen by a chance mechanism so that every member of the population has a known chance of selection; in a **simple random sample** every possible sample of the chosen size is equally likely.
:::

:::definition{term="Bias"}
A sampling method is biased if it tends to over- or under-represent part of the population, so that its results are systematically wrong in one direction.
:::

## Why sample at all?

A census gives exact population values but is often too slow, too expensive or impossible. Testing the breaking strength of every rope a factory makes would leave nothing to sell. Samples are cheaper, quicker and, when chosen well, accurate enough. The price is **sampling variation**: different samples give different results. Random selection makes this variation predictable, which is what allows the later topics (confidence intervals and hypothesis tests) to put a probability on our conclusions.

Randomness does **not** guarantee that a particular sample is typical; it guarantees that the *method* has no built-in preference for any part of the population.

## Using random numbers

To choose a simple random sample, number every member of the sampling frame, then read random numbers (from a table, a calculator or a computer) with the same number of digits as the largest label. Ignore numbers outside the range and any repeats.

:::worked-solution[Example 1: A clinic has 1,200 patient cards numbered 0001 to 1200. Use the four-digit random numbers 0917, 1342, 0588, 0917, 1105, 0021 to choose four cards.]
1. 0917 is in range: choose card 917.
2. 1342 is greater than 1200: ignore it.
3. 0588 is in range: choose card 588.
4. 0917 is a repeat: ignore it.
5. 1105 is in range: choose card 1105.
6. 0021 is in range: choose card 21.
7. The sample is cards 917, 588, 1105 and 21.
:::

## Explaining why a method is unsatisfactory

Exam questions often describe a sampling plan and ask what is wrong with it. A good answer names **who is left out or over-represented** and **why that matters for the variable being studied**. Typical faults:

- Choosing members who are easy to reach (a roadside, the first customers of the day, one class).
- Letting people volunteer, which favours those with strong opinions.
- Using an incomplete or out-of-date sampling frame.
- Sampling at one time or place when the variable changes with time or place.

For example, asking shoppers at a new-car showroom about kombi fares over-represents car owners, who rarely use kombis, so the results will not reflect the views of regular passengers.

## Sampling techniques (ZIMSEC)

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC asks you to describe, use and compare the named techniques below. Cambridge Paper 6 does not require particular methods, only the ideas of randomness and bias.
:::

**Probability methods** (each member has a known chance of selection):

- **Simple random sampling**: number the frame and use random numbers.
- **Systematic sampling**: choose a random start among the first $k$ members, then every $k$th member, where $k = \frac{N}{n}$. Quick, but biased if the list has a pattern that repeats every $k$ items.
- **Stratified sampling**: divide the population into groups (strata) that differ in the variable of interest, and take a simple random sample from each stratum in proportion to its size.
- **Cluster sampling**: divide the population into natural groups (villages, schools), choose some groups at random and survey everyone in them. Cheap when the population is spread out, but less precise if clusters differ.

**Non-probability methods** (bias cannot be measured):

- **Quota sampling**: set numbers for each group, but let the interviewer choose whom to ask until each quota is filled.
- **Convenience sampling**: use whoever is easiest to reach.
- **Judgement sampling**: an expert picks members thought to be typical.

:::formula{name="Proportional stratified sample"}
$$
\text{number from a stratum} = \frac{\text{stratum size}}{\text{population size}} \times n
$$
:::

:::worked-solution[Example 2: A company has 620 field workers, 380 factory workers and 200 office staff. Find the numbers in a stratified sample of 60 and the interval for a systematic sample of 60.]
1. The population size is $620 + 380 + 200 = 1200$; the sampling fraction is $\frac{60}{1200} = \frac{1}{20}$.
2. Field workers: $\frac{620}{20} = 31$. Factory workers: $\frac{380}{20} = 19$. Office staff: $\frac{200}{20} = 10$.
3. Check: $31 + 19 + 10 = 60$.
4. Systematic sample: $k = \frac{1200}{60} = 20$. Choose a random start from 1 to 20 (say 13), then take 13, 33, 53, …, 1193.
:::

When the shares are not whole numbers, round them so that the total is still $n$, giving the extra place to the stratum with the largest remainder.

:::worked-solution[Example 3: A survey of working conditions at a mine plans to interview the first 20 underground workers, 20 surface workers and 20 office staff who arrive at the canteen. Name the method and give two criticisms.]
1. Fixed numbers per group, filled by whoever arrives: this is **quota sampling**.
2. Criticism 1: the quotas are not in proportion to the group sizes, so a small group (office staff) is over-represented.
3. Criticism 2: selection is not random; early arrivals may work particular shifts with different conditions, so the results may be biased.
4. Improvement: a stratified random sample from the payroll lists, in proportion to group size.
:::

## Common mistakes

:::mistake{title="Confusing quota and stratified sampling"}
Both set numbers for each group. Only stratified sampling chooses *at random* within each group.
:::

:::mistake{title="Vague criticisms"}
"It is biased" earns little. Say who is missed and how that group differs in the variable being measured.
:::

:::mistake{title="Keeping out-of-range or repeated random numbers"}
Ignore numbers larger than the population size, and never choose the same member twice.
:::

:::mistake{title="Forgetting the random start"}
A systematic sample needs a randomly chosen starting point; otherwise it is not a probability sample.
:::

## Exam tips

:::exam-tip
In "explain why this method is unsatisfactory" questions, always refer to the context (the people or items and the variable studied).
:::

:::exam-tip
For proportional allocation, show the sampling fraction and check that your rounded numbers add to the sample size.
:::

:::exam-tip
When describing how to take a random sample, mention the sampling frame, numbering, the source of random numbers, and ignoring repeats.
:::

## Summary

:::summary
- A sample is part of a population; a census is the whole population.
- Random selection from a sampling frame removes bias from the method, not chance variation.
- Use random numbers of the right length; ignore out-of-range values and repeats.
- ZIMSEC techniques: simple random, systematic ($k = \frac{N}{n}$), stratified (proportional), cluster; non-probability quota, convenience, judgement.
- Criticise a method by naming who is left out and why it matters.
:::
