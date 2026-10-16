// W4a: operations.work-study (ZIMSEC only: Business Studies Form 6 and Business Enterprise Skills Form 6; auto-tagged)
// Conventions: basic time = average observed time x rating / 100; standard time = basic time x (1 + allowance), allowance a % of basic time.
import { concept, P, table, money, chk, r2, rd, stats } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

const obsTable = (obs) => table(["Observation", "Time (minutes)"], obs.map((o, i) => [String(i + 1), o.toFixed(1)]), ["l", "r"]);
const std = (obs, rating, allowance) => {
  const mean = stats.mean(obs);
  const basic = (mean * rating) / 100;
  return { mean, basic, standard: basic * (1 + allowance / 100) };
};

concept("abus.operations.work-study", { file: "operations/work-study", keyPrefix: "operations.work-study" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "**Method study** is concerned with",
    ok: ["how a job is done and improved", "Correct: the present method is recorded, examined and improved."],
    bad: [["how long a job should take", "That is work measurement."], ["how much workers should be paid", "Pay is not the purpose of method study."], ["how many customers a business has", "Customer numbers are a marketing matter."]],
    explanation: "Method study records and examines the way a job is done in order to find a better way. Work measurement finds how long it should take.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is a technique of **work measurement**?",
    ok: ["Time study", "Correct: a job is timed to find the standard time for it."],
    bad: [["Quality circle", "A quality circle is a group that solves quality problems."], ["Market segmentation", "That is a marketing technique."], ["Break-even analysis", "That is a costing technique."]],
    explanation: "Time study (timing a job with a stopwatch) is the main technique of work measurement.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a time study, a worker is given a **rating of 120**. This means that the worker was",
    ok: ["working faster than a normal pace", "Correct: a rating above 100 shows a pace above normal."],
    bad: [["working slower than a normal pace", "A slower pace would have a rating below 100."], ["working for 120 minutes", "The rating is not a length of time."], ["paid 20% more than other workers", "The rating is about pace, not pay."]],
    hints: ["A normal pace has a rating of 100."],
    explanation: "A rating of 120 means the pace was 20% above normal, so the basic time is longer than the observed time.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the **allowance** that is added when calculating the standard time for?",
    ok: ["Rest, personal needs and delays", "Correct: workers cannot work at a steady pace all day."],
    bad: [["The cost of materials used", "Materials are not part of a time allowance."], ["The profit the business aims to make", "Profit is not a time allowance."], ["Overtime payments", "Overtime pay is not an allowance within standard time."]],
    explanation: "The allowance covers rest, personal needs and unavoidable delays, so that the standard time can be achieved over a full shift.",
  });
  const s1 = std([4.0, 4.2, 3.8, 4.1, 3.9], 90, 20);
  chk(s1.mean, 4); chk(s1.basic, 3.6); chk(s1.standard, 4.32);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fictional sewing group in Gweru times the stitching of one collar five times: ${[4.0, 4.2, 3.8, 4.1, 3.9].join(", ")} minutes. The worker is rated at 90 and an allowance of 20% of the basic time is used. What is the standard time?`,
    ok: ["4.32 minutes", "Correct: 4.0 × 90 ÷ 100 = 3.6; 3.6 × 1.20 = 4.32."],
    bad: [["4.80 minutes", "That adds the allowance to the average observed time and ignores the rating."], ["4.00 minutes", "That is only the average observed time; the rating and allowance have not been used."], ["3.60 minutes", "That is the basic time; the allowance has not been added."]],
    hints: ["Average, then rating, then allowance."],
    explanation: "Average = 20.0 ÷ 5 = 4.0. Basic time = 4.0 × 0.90 = 3.6. Standard time = 3.6 × 1.20 = 4.32 minutes.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional bakery observer times a worker who knows she is being watched and works unusually fast. What is the most likely effect on the standard time?",
    ok: ["It will be too short for normal pace", "Correct: a target based on unusually fast work will be too hard to achieve."],
    bad: [["It will be too long for normal working", "Fast work gives short times, so the standard will be too short."], ["It will be exactly right", "Unusual speed does not give a typical time."], ["It will not be affected", "The observed times depend on the worker's pace."]],
    hints: ["What is the standard time based on?"],
    explanation: "If workers speed up when watched, the observed times are shorter than normal and the targets are set too high, causing resentment.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional factory in Bulawayo uses a work study to set a daily target for each machinist. Which is the **most important** condition for the target to be fair?",
    ok: ["Rating and allowance are sensible and checked", "Correct: the standard time depends on both, so errors in either make the target unfair."],
    bad: [["Only the fastest worker is ever timed on the job", "A target based on the fastest worker is likely to be too high."], ["The workers are not told about the study", "Workers should be told to avoid distrust and resistance."], ["The study is done once, at the busiest time", "One timing at an unusual time may not give a typical result."]],
    hints: ["What parts of the calculation are matters of judgement?"],
    explanation: "Rating and allowance are judgements. A fair target needs sensible values, several timings and workers who understand the study.",
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "The allowance is added to the average observed time before the rating is applied.",
    answer: false,
    hints: ["Which comes first: the rating or the allowance?"],
    explanation: "False. The rating is applied to the average observed time to give the basic time; the allowance is then added to the basic time.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Method study", "Recording and improving how a job is done"], ["Work measurement", "Finding how long a job should take"], ["Basic time", "Average observed time adjusted by the rating"], ["Standard time", "Basic time plus an allowance"]],
    explanation: "Method study is about how; work measurement is about how long; basic time and standard time are stages in a time study calculation.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "The three steps of method study are to {{blank:a}} the present method, {{blank:b}} each step critically and then develop an improvement.",
    blanks: [
      { id: "a", accepted: ["record"], choices: ["record", "ignore", "advertise"] },
      { id: "b", accepted: ["examine"], choices: ["examine", "copy", "price"] },
    ],
    explanation: "Method study records, examines and improves.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** limitation of work study.",
    accepted: ["workers may resist", "workers may feel watched", "rating is subjective", "rating is a matter of judgement", "takes time", "costly to carry out", "workers may work faster when timed", "workers may slow down when timed", "not suitable for creative work", "only suitable for repetitive jobs", "results may not be used", "requires skilled observers"],
    explanation: "Accept: worker resistance or change of pace when watched, subjective rating, time and cost of the study, unsuitability for creative work, or management failing to use the results.",
  });

  const s2 = std([6.0, 6.4, 5.8, 6.2, 6.1, 6.3, 5.9, 6.3], 100, 12);
  chk(s2.mean, 6.125);
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", unit: "minutes", value: s2.mean, dp: 3, calculator: true, wrong: [49, 6.2],
    stem: `A fictional tuck-shop supplier in Masvingo times the packing of a box of snacks eight times.\n\n${obsTable([6.0, 6.4, 5.8, 6.2, 6.1, 6.3, 5.9, 6.3])}\n\nCalculate the average observed time, in minutes, to three decimal places.`,
    hints: ["Add the eight times and divide by eight."],
    explanation: "The times total 49.0 minutes. 49.0 ÷ 8 = 6.125 minutes. 49.0 is the total, not the average.",
  });
  const s3 = std([4.0, 4.2, 3.8, 4.1, 3.9], 90, 20);
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", unit: "minutes", value: s3.basic, dp: 2, calculator: true, wrong: [4.0, 4.8],
    stem: "A time study of stitching a collar gives an average observed time of 4.0 minutes. The worker is rated at 90. Calculate the basic time, in minutes.",
    hints: ["Basic time = average time × rating ÷ 100."],
    explanation: "4.0 × 90 ÷ 100 = 3.6 minutes. A rating below 100 makes the basic time shorter than the observed time.",
  });
  const need = Math.ceil((600 * s3.standard) / 420);
  chk(need, 7);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", unit: "workers", value: need, dp: 0, calculator: true, wrong: [6, 8],
    stem: "A fictional shirt factory in Gweru has a standard time of 4.32 minutes for stitching one collar. It must stitch 600 collars a day and each worker is available for 420 minutes a day. How many workers are needed? (Round up to a whole number of workers.)",
    hints: ["Total minutes needed ÷ minutes available per worker, then round up."],
    explanation: "Minutes needed = 600 × 4.32 = 2,592. Workers = 2,592 ÷ 420 = 6.17, so 7 workers are needed. Rounding down to 6 would leave work undone.",
    workedSolution: "1. Total minutes needed = 600 × 4.32 = 2,592.\n2. Workers = 2,592 ÷ 420 = 6.17.\n3. Round up: 7 workers.",
  });
  const perDay = Math.floor(480 / 3.2);
  chk(perDay, 150);
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", value: perDay, wrong: [160, 153], calculator: true,
    stem: "A standard time for finishing a mat is 3.2 minutes. A worker is available for 480 minutes a day. How many whole mats should the worker finish in a day?",
    hints: ["Available minutes ÷ standard time per mat."],
    explanation: "480 ÷ 3.2 = 150 mats. Using 3 minutes would give 160.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Outline the three steps of method study.",
    points: ["Record the present method of doing the job", "Examine each step critically, asking why it is done", "Develop and install an improved method"],
    modelAnswer: "First record the present method, for example as a chart of each step. Next examine each step critically, asking why it is done and whether it can be removed or combined. Finally develop and put into practice an improved method.",
    hints: ["Record, examine, improve."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional hardware shop in Chinhoyi carries paint cans from a store at the back to the counter at the front, past several shelves. Explain two ways in which a method study might improve the shop's efficiency.",
    points: ["It could record the present movement of stock and find wasted steps", "Application: the store could be moved or cans kept near the counter", "It could remove or combine unnecessary tasks", "Application: staff spend less time walking, so customers are served faster"],
    modelAnswer: "A method study could record how paint cans are moved and find wasted steps, so the cans could be kept near the counter instead of at the back. Staff would then spend less time walking and customers would be served faster.",
    hints: ["Link each way to the paint cans or the layout."],
    explanation: "Two ways, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why workers might resist a time study.",
    points: ["They may fear the results will be used to raise targets", "They may feel they are being watched and distrusted", "Application: higher targets could mean more work for the same pay or job losses", "They may slow down or speed up when timed, which gives wrong results"],
    modelAnswer: "Workers may fear that the results will be used to raise targets, so they have more work for the same pay or even lose jobs. They may also feel watched and distrusted. If they change their pace when timed, the standard time is wrong.",
    hints: ["Think about how the results may be used against workers."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional bakery in Mutare is deciding whether to carry out a work study. Assess whether it would be worthwhile.",
    points: ["Method study could cut wasted movement and delay at little cost", "Time study gives standard times for targets, staffing and costing", "The study takes time and skilled observers, and workers may resist", "Rating is a judgement, so the standard may be unfair", "Counter-argument: method study alone can bring gains without the problems of timing", "Judgement with a reason, for example worthwhile if workers are consulted and the changes are put into practice"],
    modelAnswer: "A method study could cut wasted movement and delay at little cost, and a time study would give standard times for targets and staffing. However, the study takes time and skilled observers, workers may resist, and the rating is a judgement so the standard may be unfair. Method study alone can bring gains without these problems. The study is worthwhile if the workers are consulted and the changes are really put into practice.",
    hints: ["Separate method study from time study."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const obs = [4.0, 4.2, 3.8, 4.1, 3.9];
  const w = std([5.2, 5.0, 5.4, 5.1, 5.3, 5.0], 110, 10);
  chk(w.mean, 5.166666666666667, 0.0001);
  const q = std([2.8, 3.1, 2.9, 3.0, 3.2], 100, 20);
  chk(q.mean, 3); chk(q.basic, 3); chk(q.standard, 3.6);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fictional tuck shop in Harare times how long it takes to make a sandwich. Five timings are 2.8, 3.1, 2.9, 3.0 and 3.2 minutes. The worker was working at a normal pace (rating 100) and the shop allows 20% of the basic time for rest and delay.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", unit: "minutes", value: q.mean, dp: 2, wrong: [15, 3.2], stem: "Calculate the average observed time.", explanation: "(2.8 + 3.1 + 2.9 + 3.0 + 3.2) ÷ 5 = 15.0 ÷ 5 = 3.0 minutes." }),
      P.num({ label: "(b)", marks: 2, kind: "plain", unit: "minutes", value: q.standard, dp: 2, wrong: [3, 3.2], stem: "Calculate the standard time per sandwich.", explanation: "Basic time = 3.0 × 100 ÷ 100 = 3.0. Standard time = 3.0 × 1.20 = 3.60 minutes." }),
      P.manual({ label: "(c)", marks: 5, stem: "Explain two ways in which the shop could use the standard time.", points: ["To set a target number of sandwiches for each worker", "Application: 420 minutes ÷ 3.24 gives 129 whole sandwiches for each worker in a shift", "To plan how many workers are needed on busy days", "Application: more workers can be rostered at lunch time", "To cost each sandwich so that prices cover labour"], modelAnswer: "The shop can set a target for each worker: in a 420-minute shift 420 ÷ 3.60 gives 116 whole sandwiches. It can also plan how many workers are needed on busy days, such as rostering more at lunch time.", explanation: "Two uses, each applied." }),
    ],
    hints: ["Average, then rating, then allowance.", "Use the standard time for targets and staffing."],
    explanation: "Average 3.0 minutes; standard time 3.60 minutes; used for targets and planning.",
  });

  // Practice structured 2 (14 marks): method study with a flow table
  const before = [["Carry boxes of mushrooms from the picking room to the weighing table", "Transport", 36], ["Weigh boxes", "Operation", 0], ["Carry boxes to the packing table", "Transport", 14], ["Pack into punnets", "Operation", 0], ["Wait for the van", "Delay", 0], ["Carry punnets to the van", "Transport", 22]];
  const after = [["Weigh mushrooms at the picking room door", "Operation", 0], ["Carry boxes to the packing table beside the door", "Transport", 6], ["Pack into punnets", "Operation", 0], ["Wait for the van", "Delay", 0], ["Carry punnets to the van", "Transport", 22]];
  const dist = (l) => l.reduce((s, x) => s + x[2], 0);
  chk(dist(before), 72); chk(dist(after), 28);
  const cut = r2(((dist(before) - dist(after)) / dist(before)) * 100);
  chk(cut, 61.11);
  const chart = (rows) => table(["Step", "Activity", "Type", "Distance (m)"], rows.map((x, i) => [String(i + 1), x[0], x[1], String(x[2])]), ["l", "l", "l", "r"]);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional mushroom project near Mutare packs its mushrooms as shown. A method study produced the "before" chart and a proposed "after" chart.\n\n**Before**\n\n${chart(before)}\n\n**After**\n\n${chart(after)}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", unit: "metres", value: dist(before) - dist(after), wrong: [dist(before), dist(after)], stem: "Calculate how many metres of carrying the new method saves for each batch.", explanation: "Before: 36 + 14 + 22 = 72 m. After: 6 + 22 = 28 m. Saving = 44 m." }),
      P.num({ label: "(b)", marks: 3, kind: "pct", type: "CALCULATION", value: cut, wrong: [44, 157.1], stem: "Calculate the percentage fall in the distance carried, to one decimal place.", explanation: "Saving 44 m ÷ original 72 m × 100 = 61.1%.", workedSolution: "1. Distance before = 72 m; after = 28 m.\n2. Saving = 44 m.\n3. Percentage fall = 44 ÷ 72 × 100 = 61.1%." }),
      P.manual({ label: "(c)", marks: 3, stem: "State the three steps of method study and say which has been carried out by the two charts.", points: ["Record, examine, improve", "The 'before' chart records the present method", "The 'after' chart shows the improved method developed after examining each step"], modelAnswer: "The three steps are record, examine and improve. The 'before' chart records the present method and the 'after' chart shows the improved method developed after examining each step.", explanation: "Steps named and linked to the charts." }),
      P.manual({ label: "(d)", marks: 6, stem: "Discuss whether the project should adopt the new method.", points: ["Distance carried falls by 61.1% so less time and effort is used", "No new equipment is required, so the cost is low", "One weighing at the door may reduce accuracy or cause a queue at the door", "Staff may need to be told and trained in the new arrangement", "The waiting time for the van is not changed, so the overall saving may be smaller", "Judgement with a reason, for example adopt it, and test it for a week first"], modelAnswer: "The new method cuts the distance carried by 61.1%, which saves time and effort, and needs no new equipment. Possible problems are queues at the door when weighing, the need to tell and train staff, and the fact that waiting for the van is unchanged, so the overall saving may be smaller. The project should adopt the method but test it for a week first.", hints: ["Use the figures from the charts and one possible problem."], explanation: "Weighs the saving against possible problems." }),
    ],
    hints: ["Add the transport distances in each chart.", "Percentage fall uses the old distance as the base."],
    explanation: "Saving 44 m a batch (61.1%); the new method looks worthwhile if tested first.",
  });

  // Practice structured 3 (15 marks)
  const t3 = std([3.4, 3.6, 3.5, 3.3, 3.7, 3.5], 105, 15);
  chk(t3.mean, 3.5); chk(t3.basic, 3.675); chk(t3.standard, 4.22625);
  const workers = Math.ceil((900 * t3.standard) / 450);
  chk(workers, 9);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `A fictional school production unit near Harare packs exercise books in bundles. A time study of six repetitions gives times of 3.4, 3.6, 3.5, 3.3, 3.7 and 3.5 minutes per bundle. The pupil was rated at 105 and the unit allows 15% of the basic time for rest and delay. The unit must pack 900 bundles a day and each pupil can work for 450 minutes a day. Pupils change every term.`,
    parts: [
      P.num({ label: "(a)", marks: 4, kind: "plain", unit: "minutes", type: "CALCULATION", value: t3.standard, dp: 2, wrong: [t3.basic, 3.5], stem: "Calculate the standard time per bundle, to two decimal places.", explanation: "Average = 21.0 ÷ 6 = 3.5. Basic time = 3.5 × 105 ÷ 100 = 3.675. Standard time = 3.675 × 1.15 = 4.23 minutes.", workedSolution: "1. Average observed time = 21.0 ÷ 6 = 3.50 minutes.\n2. Basic time = 3.50 × 105 ÷ 100 = 3.675 minutes.\n3. Standard time = 3.675 × 1.15 = 4.226 = 4.23 minutes." }),
      P.num({ label: "(b)", marks: 3, kind: "plain", unit: "pupils", type: "CALCULATION", value: workers, dp: 0, wrong: [8, 10], stem: "Using the standard time of 4.22625 minutes, calculate the number of pupils needed to pack 900 bundles a day. (Round up to a whole number.)", explanation: "Minutes needed = 900 × 4.22625 = 3,803.6. Pupils = 3,803.6 ÷ 450 = 8.45, so 9 pupils.", workedSolution: "1. Total minutes = 900 × 4.22625 = 3,803.6.\n2. Pupils = 3,803.6 ÷ 450 = 8.45.\n3. Round up: 9 pupils." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate how useful work study is to the unit.", points: [["The standard time lets the unit plan staffing: 9 pupils are needed", 1], ["Method study could improve the layout at little cost", 1], ["Because pupils change every term, a standard based on one pupil's rating may not apply to the next group", 2], ["The rating of 105 is a judgement, and a small change in it changes the number of pupils needed", 2], ["The study takes staff time that a school unit may find hard to give", 1], ["Judgement with a reason: use the method study permanently, and repeat the time study with each new group", 1]], levels: [[3, 6, 8, "Uses the case facts (changing pupils, rating, staffing figure); benefits and limits weighed; a justified judgement"], [2, 3, 5, "Benefits and limits with some application; judgement weakly supported"], [1, 1, 2, "General statements about work study"]], modelAnswer: "The standard time shows that nine pupils are needed to pack 900 bundles a day, which helps the unit to plan, and a method study could improve the layout at little cost. But pupils change every term, so a standard based on one pupil's rating may not suit the next group, and the rating of 105 is only a judgement: a small change in it changes the number of pupils needed. The study also takes staff time that a school unit may find hard to give. The unit should use the method study permanently and repeat the time study with each new group.", hints: ["Use the facts about changing pupils and the rating.", "Separate the two kinds of study."], explanation: "Weighs the planning value against the unreliable rating and the changing workforce." }),
    ],
    hints: ["Average, rating, allowance.", "Total minutes ÷ minutes per pupil, rounded up."],
    explanation: "Standard time 4.23 minutes; 9 pupils; the value of the study depends on repeating it for each group.",
  });

  b.card("DEFINITION", "Work study", "The systematic examination of how work is done and how long it should take, to improve efficiency and productivity.");
  b.card("DEFINITION", "Method study", "Recording and critically examining how a job is done now to develop a simpler, quicker or cheaper method.");
  b.card("DEFINITION", "Work measurement", "Finding the time a qualified worker should take to do a job at a defined level of performance, for example by time study.");
  b.card("CONCEPT", "Steps of method study", "Record the present method, examine each step critically, then develop and install an improvement.");
  b.card("FORMULA", "Basic time", "Basic time = average observed time × rating ÷ 100.");
  b.card("FORMULA", "Standard time", "Standard time = basic time × (1 + allowance). The allowance is a percentage of the basic time.");
  b.card("FACT", "Rating", "Compares the worker's pace with a normal pace of 100. Above 100 is faster than normal; below 100 is slower.");
  b.card("FACT", "Uses of standard time", "Setting targets, planning how many workers are needed, costing jobs and comparing workers fairly.");
  b.card("FACT", "Limitations of work study", "Worker resistance, workers changing pace when timed, subjective rating, cost and skill needed, and unsuitability for creative work.");
});
