---
{
  "key": "sampling.methods",
  "title": "Populations, samples and sampling methods",
  "summary": "Distinguish a population from a sample and a census from a sample survey, use a sampling frame, choose samples by random methods (simple random, systematic, stratified, cluster) and non-random methods (quota, convenience), and judge bias and representativeness.",
  "concepts": ["amath.sampling.methods"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

The Zimbabwe National Statistics Agency counts every person in the country only once every ten years, in the census. Between censuses, decisions about schools, clinics and roads are made from **samples**: a few thousand households chosen to represent millions. A seed company tests a few hundred seeds from a batch of tonnes; a teacher checks a few learners' exercise books to judge a whole class. A good sample gives reliable information quickly and cheaply; a badly chosen one can be seriously misleading, however large it is.

This lesson covers the vocabulary of sampling, the main random and non-random methods, and how to judge whether a sample is likely to be **representative**. ZIMSEC Paper 2 asks you to describe methods, to carry them out (for example to work out how many to choose from each stratum) and to state advantages and disadvantages. The next lessons build on this: a random sample's mean is itself a random variable, and it is used to estimate the population mean.

## Key definitions

:::definition{term="Population"}
The whole set of people or items about which information is wanted, for example all Form 4 learners in Masvingo Province.
:::

:::definition{term="Sample"}
A part of the population that is actually studied, used to draw conclusions about the whole population.
:::

:::definition{term="Census and sample survey"}
A **census** collects data from every member of the population; a **sample survey** collects data from a sample only.
:::

:::definition{term="Sampling frame"}
A list (or map) of all the members of the population from which the sample is chosen, such as a class register or a list of households. Each member is usually given a number.
:::

:::definition{term="Bias and representative samples"}
A sample is **representative** when it reflects the important features of the population. A method is **biased** when it tends to over- or under-represent some groups, so its results are systematically wrong.
:::

## Why sample?

| Census | Sample survey |
|---|---|
| Accurate and complete (every member included) | Cheaper and quicker |
| Expensive and slow for a large population | Less data to process |
| Impossible when testing destroys the item | Necessary when testing is destructive (e.g. germination tests, the breaking strength of bolts) |
| Practical for a small population (a class) | Results vary from sample to sample (sampling error) |

## Random sampling methods

In **random** methods every member of the population has a known, non-zero chance of being chosen, and chance (not the person collecting the data) decides who is chosen. This avoids personal bias.

### Simple random sampling

Every possible sample of the required size is equally likely. Number the sampling frame, then choose numbers by **lots** (numbered slips drawn from a container) or with **random numbers** (from a table or a calculator), ignoring numbers outside the range and repeats.

:::worked-solution[Example 1: the 250 households in a village are numbered 001 to 250. Use the random digits 385 102 917 044 250 102 663 198 007, read in threes, to choose a simple random sample of 5 households.]
1. 385: too big, ignore.
2. 102: choose household 102.
3. 917: ignore. 044: choose 44. 250: choose 250.
4. 102: a repeat, ignore. 663: ignore. 198: choose 198. 007: choose 7.
5. The sample is households 7, 44, 102, 198 and 250.
:::

### Systematic sampling

Choose every $k$th member from the sampling frame, where $k = \frac{\text{population size}}{\text{sample size}}$, starting from a randomly chosen member among the first $k$.

:::worked-solution[Example 2: a sample of 30 is needed from 600 learners on a school register. Describe a systematic sample.]
1. $k = \frac{600}{30} = 20$: choose every 20th learner.
2. Choose a random start from 1 to 20, say 7.
3. The sample is learners 7, 27, 47, 67, 87, …, up to $7 + 20 \times 29 = 587$.
:::

Systematic sampling is quick and spreads the sample across the list, but it can be biased if the list has a repeating pattern with the same period (for example, if every 20th learner on the register happened to be a class monitor).

### Stratified sampling

When the population divides into groups (**strata**) that differ in an important way, such as forms, gender or districts, choose a random sample from each stratum in **proportion** to its size.

:::worked-solution[Example 3: a school has 1200 learners: 360 in Form 1, 330 in Form 2, 270 in Form 3 and 240 in Form 4. A stratified sample of 80 is needed. How many should be chosen from each form?]
1. Each form's share is $\frac{\text{form size}}{1200} \times 80$.
2. Form 1: $\frac{360}{1200} \times 80 = 24$. Form 2: $\frac{330}{1200} \times 80 = 22$.
3. Form 3: $\frac{270}{1200} \times 80 = 18$. Form 4: $\frac{240}{1200} \times 80 = 16$.
4. Check: $24 + 22 + 18 + 16 = 80$. Then choose each group by simple random sampling within the form.
:::

### Cluster sampling

The population is split into natural groups (**clusters**), such as villages, schools or classes. Some whole clusters are chosen at random, and every member (or a random sample) of the chosen clusters is studied. It is cheap when the population is spread out geographically, but the results can be less reliable if the clusters differ from one another.

## Non-random sampling methods

### Quota sampling

The interviewer is told how many people to interview from each group (for example 40 men and 60 women) and chooses them in any convenient way until each quota is filled. It is quick and needs no sampling frame, but the interviewer's choices can introduce bias (people who are easy to approach are over-represented).

### Convenience (opportunity) sampling

The sample is whoever is easiest to reach: the first 50 people leaving a supermarket in Bulawayo, or the learners in your own class. It is very quick and cheap but likely to be unrepresentative.

## Comparing the methods

| Method | Advantage | Disadvantage |
|---|---|---|
| Simple random | free from selection bias; easy to analyse | needs a full sampling frame; may miss small groups |
| Systematic | quick; spreads across the frame | biased if the list has a pattern |
| Stratified | each group fairly represented | needs strata sizes and a frame for each |
| Cluster | cheap for spread-out populations | clusters may not be typical |
| Quota | quick; no frame needed | interviewer bias; not random |
| Convenience | very quick and cheap | usually unrepresentative |

:::keyfact{title="ZIMSEC and Cambridge"}
Sampling methods are part of ZIMSEC Paper 2 (Probability and Statistics). Cambridge 0606 does not examine statistics.
:::

## Common mistakes

:::mistake{title="Thinking a big sample cures bias"}
A large convenience sample is still biased. A smaller random sample is usually better than a huge biased one.
:::

:::mistake{title="Stratified samples of equal size"}
Strata are sampled in proportion to their size, not equally, unless the question says otherwise.
:::

:::mistake{title="Calling systematic sampling 'simple random'"}
In systematic sampling only the start is random; after that the choices are fixed.
:::

:::mistake{title="Confusing quota and stratified sampling"}
Both use groups, but stratified sampling chooses randomly within each group; quota sampling does not.
:::

## Exam tips

:::exam-tip
When asked to *describe* a method, give the steps: the sampling frame, how members are numbered, how they are chosen (lots, random numbers, every $k$th) and how repeats are handled.
:::

:::exam-tip
For "give one disadvantage", be specific to the context: "the register may not include learners who joined this term" is better than "it may be biased".
:::

:::exam-tip
In stratified sampling, show the proportion calculation for each stratum and check that the numbers add up to the sample size.
:::

## Summary

:::summary
- A census studies the whole population; a sample survey studies part of it, using a sampling frame.
- Random methods: simple random (lots or random numbers), systematic (every $k$th), stratified (proportional random samples from each group), cluster (whole groups chosen at random).
- Non-random methods: quota and convenience; quick but prone to bias.
- A good sample is representative; bias cannot be removed by making a biased sample larger.
:::
