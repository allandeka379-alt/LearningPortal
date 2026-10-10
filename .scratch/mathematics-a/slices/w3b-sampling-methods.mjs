// W3b: amaths.sampling.methods (ZIMSEC Statistics F5 6.7.1; Cambridge P6 6.4)
// Named sampling techniques are ZIMSEC only (applies: ZS); randomness, random numbers and bias are shared.
import { concept, P, t, chk, same, ZS } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: 0, wrong, ...(marks ? { marks } : {}) });

/** Proportional allocation with largest-remainder rounding (checked to sum to n). */
function allocate(sizes, n) {
  const total = sizes.reduce((s, x) => s + x, 0);
  const raw = sizes.map((x) => (x * n) / total);
  const base = raw.map(Math.floor);
  let left = n - base.reduce((s, x) => s + x, 0);
  const order = raw.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0]);
  for (const [, i] of order) if (left-- > 0) base[i]++;
  chk(base.reduce((s, x) => s + x, 0), n);
  return { raw, alloc: base };
}

/** Select from 3-digit random numbers: keep 001..max, skip repeats. */
function pick(nums, max, k) {
  const out = [];
  for (const s of nums) {
    const v = Number(s);
    if (v >= 1 && v <= max && !out.includes(v)) out.push(v);
    if (out.length === k) break;
  }
  return out;
}

concept("amaths.sampling.methods", { file: "sampling/methods", keyPrefix: "sampling.methods" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A researcher wants to know the mean maize yield per hectare of all small-scale farms in Mashonaland Central. She measures the yield on 60 of these farms. In this study, what is the population?",
    options: [
      ["all small-scale farms in Mashonaland Central", "Correct: the population is the whole group the researcher wants to draw conclusions about."],
      ["the 60 farms whose yields are measured", "These 60 farms form the sample, the part of the population actually studied."],
      ["the mean maize yield of the 60 farms", "This is a sample statistic, a number calculated from the sample."],
      ["all maize farms in Zimbabwe", "The study is about Mashonaland Central only; farms elsewhere are outside its population."],
    ],
    answer: "A",
    explanation: "The population is the complete set of items of interest; a sample is a subset of it used to estimate population values such as the mean yield.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZS,
    stem: "A bank in Bulawayo has a list of 2,400 account holders. A clerk chooses a random starting number between 1 and 40 and then selects every 40th account holder on the list. Which sampling technique is this?",
    options: [
      ["systematic sampling", "Correct: items are taken at a regular interval (every 40th) after a random start."],
      ["simple random sampling", "In simple random sampling every possible sample of the required size is equally likely; here, two neighbouring names can never both be chosen."],
      ["stratified sampling", "Stratified sampling divides the population into groups (strata) and samples each group in proportion."],
      ["quota sampling", "Quota sampling fills target numbers in each group without random selection."],
    ],
    answer: "A",
    explanation: t`Systematic sampling chooses every $k$th member of an ordered list after a random start, with $k = \frac{\text{population size}}{\text{sample size}} = \frac{2400}{60} = 40$ here.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZS,
    stem: "Which description is of stratified random sampling?",
    options: [
      ["The population is split into groups such as age bands, and a simple random sample is taken from each group in proportion to its size.", "Correct: each stratum is sampled at random, in proportion to its share of the population."],
      ["The population is split into groups, and an interviewer chooses anyone convenient until a set number from each group has been interviewed.", "This is quota sampling: the target numbers are set but the people are not chosen at random."],
      ["The population is split into groups such as villages, some villages are chosen at random, and everyone in those villages is surveyed.", "This is cluster sampling: whole groups are chosen, not a share of every group."],
      ["Every member of the population is given a number, and random numbers choose the sample from the whole list.", "This is simple random sampling, with no division into groups."],
    ],
    answer: "A",
    explanation: "Stratified sampling guarantees that each stratum is represented in proportion, while keeping random selection inside each stratum.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZS,
    stem: "Match each sampling technique with its description.",
    pairs: [
      ["simple random sampling", "every possible sample of the chosen size is equally likely to be selected"],
      ["cluster sampling", "some natural groups are chosen at random and every member of each chosen group is included"],
      ["convenience sampling", "the members that are easiest to reach are used"],
      ["judgement sampling", "the researcher uses expert knowledge to choose members thought to be typical"],
    ],
    explanation: "Simple random and cluster sampling are probability methods; convenience and judgement sampling are non-probability methods, so their bias cannot be measured.",
  });

  const st5 = allocate([150, 270, 180], 40);
  same(st5.alloc.join(","), "10,18,12");
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false, applies: ZS,
    stem: "A tobacco company employs 150 workers on Farm A, 270 on Farm B and 180 on Farm C. A stratified sample of 40 workers is taken, in proportion to the number on each farm. How many workers are chosen from each farm?",
    template: "Farm A: {{blank:a}}, Farm B: {{blank:b}}, Farm C: {{blank:c}}",
    blanks: [N("a", 10, "13"), N("b", 18, "13"), N("c", 12, "14")],
    explanation: t`The total is $600$. Farm A: $\frac{150}{600} \times 40 = 10$; Farm B: $\frac{270}{600} \times 40 = 18$; Farm C: $\frac{180}{600} \times 40 = 12$. Check: $10 + 18 + 12 = 40$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, applies: ZS, daily: true,
    stem: "A systematic sample of 60 is to be taken from a numbered list of 1,500 learners. What sampling interval k should be used?",
    value: 1500 / 60, wrong: [60, 1500 / 61],
    explanation: t`$k = \frac{N}{n} = \frac{1500}{60} = 25$: choose a random start from 1 to 25 and then every 25th learner.`,
  });

  chk(7 + 3 * 15, 52);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, applies: ZS, daily: true,
    stem: "A systematic sample is taken from a numbered list using an interval of 15. The random start is 7, so the first member chosen is number 7. What is the number of the fourth member chosen?",
    value: 52, wrong: [67, 60],
    explanation: t`The members chosen are $7, 22, 37, 52, \dots$; the fourth is $7 + 3 \times 15 = 52$. (67 adds four intervals instead of three.)`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A simple random sample of 50 households is chosen from 2,000 households in a ward. What is the probability that a particular household is in the sample?",
    value: 50 / 2000, wrong: [1 / 2000, 1 / 50],
    explanation: t`In a simple random sample each member has the same chance of selection, $\frac{n}{N} = \frac{50}{2000} = 0.025$.`,
  });

  b.num({
    d: 3, skill: "ANALYSIS", calculator: false, applies: ZS,
    stem: "A school takes a stratified sample of 75 learners, in proportion to the size of each form. The school has 1,500 learners, and 32 of the sample are from Form 6. How many Form 6 learners are there in the school?",
    value: (32 / 75) * 1500, wrong: [32 * 75, 1500 - 32 * 20],
    explanation: t`The sampling fraction is $\frac{75}{1500} = \frac{1}{20}$, so the number of Form 6 learners is $32 \times 20 = 640$.`,
    hints: ["What fraction of the school is in the sample?"],
  });

  const st15 = allocate([523, 311, 166], 60);
  same(st15.alloc.join(","), "31,19,10");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZS,
    stem: "A council survey in Gweru uses a stratified sample of 60 residents from three suburbs with 523, 311 and 166 adult residents. The numbers from each suburb are in proportion to its size, rounded to whole numbers so that the total is still 60. How many residents are chosen from each suburb?",
    template: "first suburb: {{blank:a}}, second suburb: {{blank:b}}, third suburb: {{blank:c}}",
    blanks: [N("a", 31, "32"), N("b", 19, "18"), N("c", 10, "9")],
    explanation: t`The total is $1000$. Exact shares: $\frac{523}{1000} \times 60 = 31.38$, $\frac{311}{1000} \times 60 = 18.66$, $\frac{166}{1000} \times 60 = 9.96$. Rounding gives $31, 19, 10$, which add to 60.`,
    hints: ["Find each suburb's share of 60 before rounding.", "Check that the rounded numbers add to 60."],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A census collects information from every member of the population.",
    answer: true,
    explanation: "A census surveys the whole population; a sample surveys only part of it, which is cheaper and quicker but introduces sampling variation.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A sample chosen at random is guaranteed to be representative of the population.",
    answer: false,
    explanation: "Random selection avoids bias in the method, but any one random sample can, by chance, be unusual. Larger samples (and stratification) make an unrepresentative sample less likely.",
  });

  const rn = ["582", "047", "913", "047", "366", "128", "754"];
  const sel = pick(rn, 500, 3);
  same(sel.join(","), "47,366,128");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "The 500 stalls at Mbare Musika are numbered 001 to 500. Three stalls are to be chosen by using three-digit random numbers, ignoring numbers that are out of range or repeated. The random numbers are 582, 047, 913, 047, 366, 128, 754. Which stalls are chosen?",
    options: [
      ["047, 366 and 128", "Correct: 582 and 913 are out of range and the second 047 is a repeat, so they are ignored."],
      ["582, 047 and 913", "582 and 913 are greater than 500, so they do not correspond to any stall."],
      ["047, 047 and 366", "A stall cannot be chosen twice; repeated numbers are ignored."],
      ["366, 128 and 754", "Stall 047 is valid and comes first; 754 is out of range."],
    ],
    answer: "A",
    explanation: "Read the random numbers in order, keep those in the range 001-500, and skip any repeat until the required number of distinct stalls is reached.",
    hints: ["Which numbers do not match a stall?"],
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: "What is a sampling frame?",
    options: [
      ["a list or map of every member of the population", "Correct: a sampling frame identifies every sampling unit so that each can be given a number."],
      ["the number of members needed in the sample", "That is the sample size."],
      ["the interval between members in a systematic sample", "That is the sampling interval k."],
      ["the time period over which the survey data are collected", "The frame lists the population, not the timing of the survey."],
    ],
    answer: "A",
    explanation: "Random sampling needs a sampling frame: without a list of the population, members cannot be numbered and chosen with random numbers.",
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false, applies: ZS,
    stem: "What is the main difference between quota sampling and stratified sampling?",
    options: [
      ["In quota sampling the members of each group are not chosen at random.", "Correct: an interviewer fills each quota with whoever is available, so selection bias can enter."],
      ["Quota sampling divides the population into groups, but stratified sampling does not.", "Both methods divide the population into groups (strata or quota groups)."],
      ["Stratified sampling needs no list of the population.", "Stratified random sampling needs a sampling frame for each stratum; quota sampling does not."],
      ["Quota sampling always gives a larger sample.", "Sample size is chosen by the researcher in either method."],
    ],
    answer: "A",
    explanation: "Both methods set numbers for each group. Stratified sampling then selects at random within each stratum; quota sampling does not, which makes it cheaper but open to bias.",
    hints: ["Think about how individuals inside each group are picked."],
  });

  b.mcq({
    d: 4, skill: "EVALUATION", calculator: false,
    stem: "An agricultural officer wants a random sample of 40 of the 800 plots in an irrigation scheme near Chiredzi. Which method gives a random sample?",
    options: [
      ["Number the plots 1 to 800 and use a random number generator to choose 40 different numbers.", "Correct: every plot has an equal chance and selections are independent of the officer's choices."],
      ["Choose the 40 plots closest to the main road, since they are easiest to reach.", "This is convenience sampling; roadside plots may differ (for example in water supply) from others."],
      ["Ask farmers to volunteer their plots until 40 have agreed.", "Volunteers choose themselves, so the sample may favour well-run plots."],
      ["Choose the first 40 plots in the scheme's register.", "The register order may be linked to age or location of plots, so this is not random."],
    ],
    answer: "A",
    explanation: "A random sample needs a sampling frame and a chance mechanism such as random numbers, so that personal choice cannot bias the selection.",
    hints: ["Which method leaves the choice entirely to chance?"],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "To find out what residents of Harare think about kombi fares, Tatenda interviews 100 people at a new-car showroom on a weekday morning. Explain why this sampling method is unsatisfactory.",
    points: [
      "The sample is biased: people at a car showroom are likely to own or buy cars and so use kombis less (and are wealthier) than typical residents.",
      "Only people free on a weekday morning can be included, so workers and learners who use kombis most are left out; the sample is not random.",
    ],
    modelAnswer: "The people at a new-car showroom are not typical of Harare residents: they are likely to be car owners who rarely use kombis, and only people free on a weekday morning can be interviewed. The sample is not random and is biased against regular kombi users.",
    explanation: "When asked why a method is unsatisfactory, name the group that is over- or under-represented and link it to the question being investigated.",
    hints: ["Who is likely to be at a car showroom, and who is missing?"],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2, applies: ZS,
    stem: "A university has students from four faculties of very different sizes. Give one advantage of a stratified sample by faculty over a simple random sample of the same size, and one disadvantage.",
    points: [
      "Advantage: every faculty is represented in proportion to its size, so the sample is more representative (results are more precise when faculties differ).",
      "Disadvantage: it needs a sampling frame for each faculty and the size of each stratum, so it takes more time and organisation.",
    ],
    modelAnswer: "Advantage: each faculty appears in the sample in proportion, so small faculties cannot be missed by chance and the estimates are more precise. Disadvantage: the university needs separate lists for each faculty and the faculty sizes, which takes more work.",
    explanation: "Stratification removes the chance of an unbalanced sample across groups that matter for the variable being studied.",
    hints: ["Could a simple random sample miss a small faculty?"],
  });

  // ---------------------------------------------------------------- structured (5 marks)
  const sel2 = pick(["4721", "0938", "2650", "0938", "1187", "3304"], 3000, 3);
  same(sel2.join(","), "938,2650,1187");
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: "A water authority wants to estimate the mean daily water use of the 3,000 households in a town. The households are listed and numbered 0001 to 3000.",
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "Give one reason why the authority uses a sample rather than a census.",
        points: ["A sample is quicker and cheaper than surveying all 3,000 households (or: measuring every household is impractical)."],
        modelAnswer: "Surveying all 3,000 households would take too long and cost too much; a sample gives a good estimate more cheaply.",
        explanation: "Typical reasons: cost, time, practicality, or the measurement destroys the item." }),
      P.mcq({ label: "(b)", marks: 2, stem: "Four-digit random numbers are read in order: 4721, 0938, 2650, 0938, 1187, 3304. Using these, which three households are chosen?",
        options: [
          ["0938, 2650 and 1187", "Correct: 4721 and 3304 are above 3000 and the repeat of 0938 is skipped."],
          ["4721, 0938 and 2650", "4721 is out of range (above 3000)."],
          ["0938, 2650 and 0938", "A household cannot be chosen twice."],
          ["2650, 1187 and 3304", "0938 comes first and is valid; 3304 is out of range."],
        ], answer: "A",
        explanation: "Ignore numbers greater than 3000 and repeats." }),
      P.manual({ label: "(c)", marks: 2, stem: "An official suggests instead measuring the 50 households nearest the pumping station. Explain why this is unsatisfactory.",
        points: ["Not random: only households in one area can be chosen, so most households have no chance of selection.", "Biased in context: households near the station may have better water pressure (or be a particular type of housing) and so use more (or less) water than typical households."],
        modelAnswer: "The 50 nearest households all come from one area, so the sample is not random and other parts of the town are excluded. They may get higher water pressure or be a different kind of housing, so their water use is likely to differ from the town's mean.",
        explanation: "Link the bias to the variable being measured (water use)." }),
    ],
    explanation: "Use random numbers within the range of the sampling frame, ignore repeats, and judge a method by whether every household has a chance of selection.",
    hints: ["Numbers above 3000 do not correspond to a household.", "Who is left out by the official's method?"],
  });

  // ---------------------------------------------------------------- structured (12 marks, ZIMSEC techniques)
  const st18 = allocate([840, 630, 330], 60);
  same(st18.alloc.join(","), "28,21,11");
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, applies: ZS,
    stem: "A mining company near Hwange has 1,800 employees: 840 underground workers, 630 surface workers and 330 office staff. The company wants a sample of 60 employees for a survey on working conditions.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "A stratified sample in proportion to the size of each group is used. Find the number of employees chosen from each group.",
        template: "underground: {{blank:u}}, surface: {{blank:s}}, office: {{blank:o}}",
        blanks: [N("u", 28, "20"), N("s", 21, "20"), N("o", 11, "20")],
        explanation: t`Sampling fraction $\frac{60}{1800} = \frac{1}{30}$: $\frac{840}{30} = 28$, $\frac{630}{30} = 21$, $\frac{330}{30} = 11$; total 60.` }),
      P.num({ label: "(b)", marks: 1, stem: "Instead, a systematic sample of 60 is taken from the full list of employees. Find the sampling interval.", value: 30, wrong: [60],
        explanation: t`$k = \frac{1800}{60} = 30$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe how the systematic sample would be chosen.",
        points: ["Number the employees 1 to 1800 on a list (the sampling frame) and choose a random start from 1 to 30.", "Then select every 30th employee after the start (e.g. start 17 gives 17, 47, 77, …)."],
        modelAnswer: "List and number all 1,800 employees. Use a random number to choose a starting point between 1 and 30, then take every 30th employee from there, e.g. 17, 47, 77, …, 1787.",
        explanation: "Both the random start and the fixed interval are needed." }),
      P.mcq({ label: "(d)", marks: 1, stem: "A supervisor proposes interviewing the first 20 underground workers, the first 20 surface workers and the first 20 office staff who arrive at the canteen. Which technique is this?",
        options: [
          ["quota sampling", "Correct: fixed numbers per group, filled non-randomly."],
          ["stratified sampling", "Stratified sampling chooses at random within groups, in proportion to size."],
          ["cluster sampling", "Cluster sampling chooses whole groups at random."],
          ["systematic sampling", "There is no fixed interval along a list."],
        ], answer: "A", explanation: "Target numbers per group, chosen by convenience, is quota sampling." }),
      P.manual({ label: "(e)", marks: 2, stem: "Give two reasons why the supervisor's sample in (d) may give misleading results.",
        points: ["The groups are not in proportion: office staff (330) are as heavily represented as underground workers (840).", "Selection is not random: early arrivals at the canteen may differ (e.g. shift patterns or job satisfaction) from other employees."],
        modelAnswer: "Each group gets 20 regardless of size, so office staff are over-represented and underground workers under-represented. And the first arrivals at the canteen are not a random choice; they may work particular shifts with different conditions.",
        explanation: "Disproportion and non-random selection are both sources of bias here." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why the stratified sample is preferable for this survey, and state one practical difficulty in carrying it out.",
        points: ["Working conditions are likely to differ between underground, surface and office staff.", "Stratifying guarantees each group is represented in proportion, so the results represent the whole workforce more precisely.", "Difficulty: needs an up-to-date list of employees in each group (or random selection within each group may be time-consuming)."],
        modelAnswer: "Underground, surface and office staff work in very different conditions, so the survey answers will differ by group. A proportional stratified sample guarantees each group appears in the right proportion, giving more representative and precise results. However, the company needs accurate, separate lists of each group to choose randomly within them.",
        explanation: "Stratify when the variable of interest differs between identifiable groups." }),
    ],
    explanation: "Proportional allocation uses the sampling fraction; systematic sampling needs a random start and a fixed interval; quota sampling is non-random.",
    hints: ["Sampling fraction = 60/1800.", "Compare how each method gives every employee a chance."],
  });

  // ---------------------------------------------------------------- flashcards
  b.card("DEFINITION", "Population and sample", "Population: the whole set of items of interest. Sample: a subset of the population used to draw conclusions about it.");
  b.card("DEFINITION", "Sampling frame", "A list or map of every member of the population, from which a sample can be chosen.");
  b.card("DEFINITION", "Random sample", "A sample in which every member of the population has a known (usually equal) chance of selection, chosen by a chance mechanism such as random numbers.");
  b.card("CONCEPT", "Bias in sampling", "A method is biased if it systematically over- or under-represents part of the population; name who is missed and why it matters for the variable studied.");
  b.card("CONCEPT", "Using random numbers", "Number the population, read random numbers of the right length, ignore out-of-range values and repeats until the sample is complete.");
  b.card("FORMULA", "Systematic sampling interval", t`$k = \frac{N}{n}$; choose a random start from 1 to $k$, then every $k$th member.`, undefined, { applies: ZS });
  b.card("FORMULA", "Proportional stratified sample", t`Number from stratum $= \frac{\text{stratum size}}{\text{population size}} \times n$, rounded so the total is $n$.`, undefined, { applies: ZS });
  b.card("FACT", "Probability vs non-probability sampling", "Probability: simple random, systematic, stratified, cluster. Non-probability: quota, convenience, judgement (bias cannot be measured).", undefined, { applies: ZS });
  b.card("CONCEPT", "Census vs sample", "A census surveys everyone (no sampling error but costly, slow, sometimes impossible); a sample is cheaper and quicker.");
});
