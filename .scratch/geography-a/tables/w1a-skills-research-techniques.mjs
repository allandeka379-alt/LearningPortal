import { t, table, mean, discharge, dpStr, chk } from "../lib.mjs";
import { writeLesson } from "./w1a-_write.mjs";

// Systematic sampling
const N = 480, n = 40, k = N / n;
chk(k, 12);
const start = 7;
const picks = [start, start + k, start + 2 * k, start + 3 * k];
// Stratified sampling: three wards
const wards = [["Ward A", 150], ["Ward B", 200], ["Ward C", 250]];
const totalH = 600, sample = 60;
const strat = wards.map(([w, h]) => [w, h, dpStr((h / totalH) * sample, 0)]);
chk((150 / 600) * 60, 15); chk((200 / 600) * 60, 20); chk((250 / 600) * 60, 25);
// Float method
const times = [18.2, 17.6, 18.8];
const mt = mean(times);
const v = 10 / mt;
const Q = discharge(3.2, 0.45, v);
console.log({ mt, v, Q });

const body = t`
## Introduction

Every geographical enquiry, from a Form 5 research project to a Cambridge fieldwork question, rests on the same plan: ask a question that can be answered with data, collect the data fairly, present and analyse it, and judge how far the conclusions can be trusted. ZIMSEC continuous assessment (the research and community projects) expects you to carry out this plan on a local problem; Paper 3 asks you to design or evaluate an enquiry in an examination setting.

You should already know how to read graphs and maps and how to calculate simple averages. This lesson gathers the techniques of data collection and the language used to evaluate them.

## Key definitions

:::definition{term="Primary data"}
Information collected directly by the investigator in the field, for example measurements, counts, questionnaires and interviews.
:::

:::definition{term="Secondary data"}
Information collected earlier by someone else, such as census returns, weather station records, maps and published reports.
:::

:::definition{term="Sampling"}
Selecting a part of a population to represent the whole, because it is usually impossible to measure every item or person.
:::

:::definition{term="Reliability and validity"}
Data are reliable if repeating the method gives similar results. They are valid if they measure what the investigation set out to measure.
:::

:::definition{term="Bias"}
A systematic distortion in the data caused by the way they were collected, for example only interviewing people who are easy to reach.
:::

## The stages of an enquiry

1. **Problem and aim:** a question that can be answered, such as "How does water quality change along the Mukuvisi River?".
2. **Hypothesis:** a testable statement naming two variables ("Nitrate level increases downstream").
3. **Methods:** what, where, when and how much to collect; equipment; risk assessment.
4. **Data collection:** primary and secondary data on recording sheets.
5. **Presentation:** tables, graphs, maps and photographs.
6. **Analysis:** description, statistics and explanation.
7. **Conclusion:** accept, reject or partly accept the hypothesis, with evidence.
8. **Evaluation:** problems with the method, reliability, improvements, further study.

## Sampling

| Method | How it works | Advantages | Disadvantages |
|---|---|---|---|
| Random | Every item has an equal chance, chosen with random numbers | Fair, no bias | May miss small groups; needs a complete list |
| Systematic | Every $k$th item, $k = N \div n$, with a random start | Quick, even coverage | Can match a hidden pattern |
| Stratified | The sample is divided in proportion to groups (strata) | Represents every group | Needs known group sizes |

A larger sample reduces the effect of chance but costs time. For statistical tests aim for at least 30 items where possible, and not fewer than the minimum for the test (for example, 5-10 pairs for Spearman's rank).

## Collecting data

- **Questionnaires and interviews:** use short, clear, non-leading questions, closed (tick boxes) for counting and open for opinions. Pilot the questionnaire first.
- **Transects:** a line across an area along which measurements are taken at regular intervals (a profile of a beach or of land use from a town centre).
- **Quadrats:** a square frame used to sample vegetation cover or species at points.
- **Stream measurements:** width with a tape, depth with a metre rule, velocity with a float over a measured distance, gradient with a clinometer, pH with a meter or test paper.
- **Counts:** pedestrian or traffic counts at a set time of day, repeated on more than one day.
- **Recording sheets:** columns for date, time, site, weather, measurement and unit prepared before going out.

## Reliability, validity, bias and ethics

Improve **reliability** by repeating measurements and averaging, using the same equipment and times, and increasing the sample. Improve **validity** by choosing a method that really tests the hypothesis, for example measuring discharge, not only width, to compare river size. Reduce **bias** by random selection and by avoiding leading questions. **Ethics**: ask permission, explain the purpose, keep personal information confidential, avoid harm, and respect local customs and the privacy of households; collect in groups and follow the risk assessment.

## Worked examples

:::worked-solution[Systematic and stratified sampling]
Illustrative data: a student plans to survey ${n} of the ${N} households in a ward.

1. Sampling interval $k = N \div n = ${N} \div ${n} = ${k}$.
2. Choose a random start between 1 and ${k}, say ${start}. The households chosen are ${picks.join(", ")}, and so on.

Now the student wants a stratified sample of ${sample} from three wards with ${totalH} households in all:

${table(["Ward", "Households", "Sample size = households ÷ 600 × 60"], strat)}

3. The sample sizes ${strat.map((r) => r[2]).join(", ")} add to ${sample}, and each ward is represented in proportion to its size.
:::

:::worked-solution[Float method for stream velocity and discharge]
Illustrative data: a float travels 10 m along a straight stretch in ${times.join(", ")} seconds in three trials. The channel is 3.2 m wide with a mean depth of 0.45 m.

1. Mean time $= (${times.join(" + ")}) \div 3 = ${dpStr(mt, 1)}$ s.
2. Velocity $= 10 \div ${dpStr(mt, 1)} = ${dpStr(v, 2)}$ m/s (a surface value; the mean velocity in the channel is lower, so this is an overestimate).
3. Cross-sectional area $= 3.2 \times 0.45 = ${dpStr(3.2 * 0.45, 2)}$ m².
4. Discharge $Q = ${dpStr(3.2 * 0.45, 2)} \times ${dpStr(v, 2)} = ${dpStr(Q, 2)}$ m³/s.
5. Evaluation: repeating the float three times improves reliability; using one cross-section and a surface float limits accuracy, so more sites and a flow meter would improve the data.
:::

:::example{title="Evaluating a questionnaire survey"}
A student asks 25 people outside a supermarket in Gweru on a Saturday morning how far they travelled to shop. Possible problems: the sample is small; people at the supermarket are not representative of all residents; Saturday morning is not typical; people may estimate the distance wrongly. Improvements: survey households chosen at random across the town on different days and at different times, and ask for an address to measure the distance from a map.
:::

## Writing up an enquiry

Present your hypothesis, methods and data first, then the analysis, and finally the conclusion and evaluation. Include maps of the site, photographs described in text, and a table of results. Always link the findings back to the original question.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect you to understand the whole enquiry process and to evaluate methods. ZIMSEC includes continuous assessment projects and Paper 3 research techniques (physical, human, mitigation and adaptation); Cambridge tests enquiry skills through the Skills section within Papers 1-4.
:::

## Common mistakes

:::mistake{title="Vague hypotheses"}
"The river is interesting" cannot be tested. Name two variables and a direction: "velocity increases with distance downstream".
:::

:::mistake{title="Confusing reliability and validity"}
Reliability is about repeating and getting the same result; validity is about measuring the right thing. A method can be reliable but invalid.
:::

:::mistake{title="Evaluating with only 'more time'"}
Say what to change (larger random sample, repeat on a different day, use a flow meter) and why it improves the data.
:::

## Exam tips

:::exam-tip
*Describe how* you would collect data: name the equipment, the sampling method, the number of sites or people, the time and the recording method. *Justify* the sampling method by comparing it with another. *Evaluate* with a limitation, its effect on the conclusion and an improvement.
:::

## Summary

:::summary
- An enquiry runs from question and hypothesis to methods, data, presentation, analysis, conclusion and evaluation.
- Primary data are collected first-hand; secondary data come from existing sources.
- Random, systematic and stratified sampling suit different situations; sample size matters.
- Reliability means repeatable, validity means measuring the right thing, and bias must be minimised.
- Always consider ethics and safety, and evaluate with limitations and specific improvements.
:::
`;

writeLesson("skills", "research-techniques", { title: "Research techniques and geographical enquiry", summary: "Plan, carry out and evaluate a geographical enquiry: hypotheses, primary and secondary data, sampling, questionnaires and field measurements, reliability, validity, bias and ethics.", minutes: 35 }, body);
