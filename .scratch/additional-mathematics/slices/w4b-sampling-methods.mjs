// W4b: amath.sampling.methods (ZIMSEC only)
import { concept, P, t, chk, same } from "../lib.mjs";

concept("amath.sampling.methods", { file: "sampling/methods", keyPrefix: "sampling.methods" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "What is a sampling frame?",
    options: [
      ["A list of all the members of the population from which a sample is chosen", "Correct: e.g. a register or a list of households."],
      ["The members of the population who are actually chosen", "That is the sample itself."],
      ["The rule used to decide the size of the sample", "The sample size is chosen separately; the frame is the list."],
      ["A group of the population with a shared feature, such as a form", "That is a stratum."],
    ],
    answer: "A",
    explanation: "A sampling frame lists the population (usually numbered) so that a sample can be chosen from it.",
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "What is a census?",
    options: [
      ["A survey that collects data from every member of the population", "Correct: a census includes everyone."],
      ["A survey of a randomly chosen part of the population", "That is a sample survey."],
      ["A list of the members of the population", "That is a sampling frame."],
      ["A survey that collects data only from adults", "A census can be of any population, not only adults."],
    ],
    answer: "A",
    explanation: "A census studies the whole population; a sample survey studies part of it.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A clerk chooses a number from 1 to 15 at random, then takes every 15th name on the list of customers, starting from that number. Which sampling method is this?",
    options: [
      ["Systematic sampling", "Correct: every kth member after a random start."],
      ["Simple random sampling", "In simple random sampling every member is chosen separately by chance."],
      ["Stratified sampling", "There are no groups (strata) here."],
      ["Quota sampling", "Quota sampling fills target numbers for groups without random choice."],
    ],
    answer: "A",
    explanation: "Systematic sampling: a random start, then every kth member of the sampling frame (k = 15 here).",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A market researcher in Mutare is told to interview 30 men and 30 women. She stops people in the street until she has 30 of each. Which sampling method is this?",
    options: [
      ["Quota sampling", "Correct: fixed numbers per group, chosen by the interviewer."],
      ["Stratified sampling", "Stratified sampling chooses randomly within each group; here the interviewer chooses."],
      ["Cluster sampling", "No whole groups (clusters) are chosen."],
      ["Systematic sampling", "There is no list and no 'every kth' rule."],
    ],
    answer: "A",
    explanation: "Quota sampling sets the number to be taken from each group but leaves the choice of individuals to the interviewer, so it is not random.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "To study household water use in a district, three villages are chosen at random and every household in those villages is surveyed. Which sampling method is this?",
    options: [
      ["Cluster sampling", "Correct: whole natural groups (villages) are chosen at random."],
      ["Stratified sampling", "Stratified sampling takes some members from every group, not all members of a few groups."],
      ["Quota sampling", "There are no quotas and the villages were chosen at random."],
      ["Convenience sampling", "The villages were chosen at random, not because they were easy to reach."],
    ],
    answer: "A",
    explanation: "In cluster sampling, some clusters are chosen at random and everyone in them is studied.",
  });

  {
    const k = 840 / 35;
    chk(k, 24);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: "A systematic sample of 35 is to be chosen from a list of 840 learners. Every kth learner is chosen after a random start. Find k.",
      value: k, wrong: [35, 805],
      explanation: t`$k = \frac{840}{35} = 24$: choose a random start from 1 to 24, then every 24th learner.`,
    });
  }

  {
    const strata = [90, 45, 15], n = 20;
    const alloc = strata.map((s) => (s / 150) * n);
    same(alloc, [12, 6, 2]);
    b.fib({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: "A farm near Mvurwi employs 150 workers: 90 field workers, 45 packing-shed workers and 15 office workers. A stratified sample of 20 workers is chosen in proportion to the group sizes.",
      template: "Field workers: {{blank:a}}; packing-shed workers: {{blank:b}}; office workers: {{blank:c}}",
      blanks: [
        { id: "a", input: "number", accepted: [12], wrong: "7" },
        { id: "b", input: "number", accepted: [6], wrong: "7" },
        { id: "c", input: "number", accepted: [2], wrong: "6" },
      ],
      explanation: t`Field: $\frac{90}{150} \times 20 = 12$; packing: $\frac{45}{150} \times 20 = 6$; office: $\frac{15}{150} \times 20 = 2$. Total 20.`,
    });
  }

  {
    const v = (432 / 960) * 60;
    chk(v, 27);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A school has 960 learners, of whom 432 are girls. A sample of 60 learners is stratified by gender. How many girls should be in the sample?",
      value: v, wrong: [30, 33],
      explanation: t`$\frac{432}{960} \times 60 = 27$ girls (and 33 boys). Choosing 30 of each ignores the proportions.`,
      hints: ["The girls' share of the sample equals their share of the school."],
    });
  }

  {
    const stream = ["93", "17", "45", "80", "17", "06", "88", "52"];
    const picks = [];
    for (const s of stream) { const n = Number(s); if (n >= 1 && n <= 80 && !picks.includes(n)) picks.push(n); if (picks.length === 4) break; }
    same(picks, [17, 45, 80, 6]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "The 80 learners in a Form 3 group are numbered 01 to 80. Rudo uses these random two-digit numbers, in order, to choose a simple random sample of 4 learners, ignoring numbers that are out of range or repeated:\n\n93 17 45 80 17 06 88 52",
      template: "The learners chosen are {{blank:a}}, {{blank:b}}, {{blank:c}} and {{blank:d}} (in the order chosen).",
      blanks: [
        { id: "a", input: "number", accepted: [17], wrong: "93" },
        { id: "b", input: "number", accepted: [45], wrong: "17" },
        { id: "c", input: "number", accepted: [80], wrong: "17" },
        { id: "d", input: "number", accepted: [6], wrong: "17" },
      ],
      explanation: "93 is out of range; 17, 45 and 80 are chosen; the second 17 is a repeat and is ignored; 06 (learner 6) is the fourth.",
      hints: ["Skip numbers above 80 and numbers already chosen."],
    });
  }

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "If a convenience sample is made large enough, it stops being biased.",
    answer: false,
    explanation: "False. Bias comes from how the sample is chosen, not its size. A larger convenience sample repeats the same bias; a random method is needed to remove it.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: "In systematic sampling with a random start, every member of the sampling frame has the same chance of being chosen.",
    answer: true,
    explanation: "True. With k = N/n and a random start from 1 to k, each member is chosen with probability 1/k. (Not every possible sample is equally likely, which is why it is not simple random sampling.)",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each sampling method with its description.",
    pairs: [
      ["Simple random", "Every possible sample of the required size is equally likely, e.g. by drawing lots."],
      ["Systematic", "Every kth member of a list after a random start."],
      ["Stratified", "Random samples from each group in proportion to the group sizes."],
      ["Cluster", "Some whole natural groups are chosen at random and studied."],
      ["Quota", "Set numbers from each group, chosen by the interviewer."],
      ["Convenience", "Whoever is easiest to reach."],
    ],
    explanation: "The first four are random methods; quota and convenience sampling are non-random.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "A factory in Kwekwe tests the breaking strength of its steel bolts by loading them until they snap. Give two reasons why the factory uses a sample rather than a census.",
    points: [
      "Testing destroys the bolt, so testing every bolt (a census) would leave none to sell.",
      "A sample is quicker and cheaper to test than the whole production.",
    ],
    modelAnswer: "The test is destructive, so a census would destroy the whole output. A sample is also much quicker and cheaper and still gives a reliable estimate of the strength.",
    explanation: "Destructive testing is the classic case where a census is impossible.",
    hints: ["What happens to a bolt that has been tested?"],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "To find how much residents of Bulawayo spend on groceries each week, Sipho asks the first 50 people leaving a large supermarket on a Saturday morning. Explain why this sample is likely to be biased.",
    points: [
      "It is a convenience sample: only people shopping at that supermarket at that time can be chosen, so most residents have no chance of selection.",
      "Those people are not typical: e.g. Saturday shoppers at a large supermarket probably spend more (or are better off) than residents who shop at markets or small shops, so spending would be overestimated.",
    ],
    modelAnswer: "Only people at that supermarket on Saturday morning can be chosen, so the sample is not random. Such shoppers are likely to do a large weekly shop there and may be better off than residents who buy from markets, so the average spending will be too high.",
    explanation: "Bias arises when the method systematically favours some groups.",
    hints: ["Who has no chance of being chosen?"],
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", calculator: false, marks: 3,
    stem: "Describe how to use random numbers to choose a simple random sample of 40 learners from a school of 500 learners.",
    points: [
      "Obtain a list (sampling frame) of all 500 learners and number them 001 to 500.",
      "Generate three-digit random numbers (from a table or calculator) and select the learner with each number.",
      "Ignore numbers outside 001–500 and any repeats, and continue until 40 different learners are chosen.",
    ],
    modelAnswer: "Number the learners on the school register from 001 to 500. Read three-digit random numbers from a random number table (or a calculator). Each number from 001 to 500 selects that learner; numbers above 500, 000 and repeats are ignored. Stop when 40 different learners have been chosen.",
    explanation: "Frame, numbering, random selection, rules for invalid numbers and repeats.",
    hints: ["Start with a numbered list."],
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "A council wants to know what percentage of households in a town have internet access. Which method is most likely to give a biased result?",
    options: [
      ["Posting the questionnaire on the council's website and using all replies", "Correct: only people with internet access can reply, so access will be greatly overestimated."],
      ["Choosing households at random from the council's rates list and visiting them", "A random sample from a full list is not biased in this way."],
      ["Choosing every 20th house on the rates list after a random start", "Systematic sampling from a full list is close to random."],
      ["Choosing households at random from each ward in proportion to ward size", "A stratified random sample represents every ward fairly."],
    ],
    answer: "A",
    explanation: "A web survey of internet access can only reach households that have access: the method itself creates the bias.",
    hints: ["Who is able to answer each survey?"],
  });

  {
    const v = 0.45 * 120;
    chk(v, 54);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: "In a town, 45% of adults are under 25. A researcher plans a quota sample of 120 adults that matches the town's age structure. How many adults under 25 should the quota include?",
      value: v, wrong: [45, 66],
      explanation: t`$0.45 \times 120 = 54$. (66 would be the quota for adults aged 25 and over.)`,
    });
  }

  {
    const sizes = [520, 390, 260, 130];
    const alloc = sizes.map((s) => (s / 1300) * 50);
    same(alloc, [20, 15, 10, 5]);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: false, examStyle: true,
      stem: "A district education officer wants a sample of 50 learners from four secondary schools, with 520, 390, 260 and 130 learners respectively. She uses a stratified sample with the schools as strata.",
      parts: [
        P.fib({ label: "(a)", marks: 4, stem: "Find how many learners should be chosen from each school.", template: "School 1: {{blank:a}}; school 2: {{blank:b}}; school 3: {{blank:c}}; school 4: {{blank:d}}",
          blanks: [
            { id: "a", input: "number", accepted: [20], wrong: "13" },
            { id: "b", input: "number", accepted: [15], wrong: "13" },
            { id: "c", input: "number", accepted: [10], wrong: "12" },
            { id: "d", input: "number", accepted: [5], wrong: "12" },
          ],
          explanation: t`Total $= 1300$. $\frac{520}{1300} \times 50 = 20$, $\frac{390}{1300} \times 50 = 15$, $\frac{260}{1300} \times 50 = 10$, $\frac{130}{1300} \times 50 = 5$.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Give one advantage of stratified sampling over a simple random sample of 50 from all 1300 learners, and one thing she needs before she can carry it out.",
          points: ["Advantage: every school is represented in proportion to its size (a simple random sample might, by chance, include few or no learners from the small school).", "Needs: the number of learners in each school and a list (sampling frame) of the learners in each school, to sample randomly within it."],
          modelAnswer: "Stratified sampling guarantees that each school is represented in proportion to its size, whereas a simple random sample might by chance contain very few learners from the smallest school. She needs the size of each school and a register of each school's learners so that she can choose randomly within each one.",
          explanation: "Stratification controls the make-up of the sample." }),
      ],
      explanation: "Proportional allocation: (stratum size ÷ population) × sample size.",
      hints: ["Add the four school sizes first."],
    });
  }

  {
    const k = 300 / 25;
    chk(k, 12);
    b.struct({
      d: 4, skill: "EVALUATION", calculator: false, examStyle: true,
      stem: "Nyasha wants to estimate the average weekly pocket money of the 300 learners at her school. She first asks her 12 closest friends.",
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "What is the population in this study?",
          options: [
            ["All 300 learners at the school", "Correct: the conclusion is about every learner at the school."],
            ["Nyasha's 12 friends", "They form the sample she first used."],
            ["All learners in Zimbabwe", "The question is about one school only."],
            ["The amounts of pocket money her friends receive", "These are the data from the sample."],
          ],
          answer: "A", explanation: "The population is the whole group the conclusion is about." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which kind of sample did Nyasha first use?",
          options: [
            ["A convenience sample", "Correct: she chose the people easiest for her to ask."],
            ["A simple random sample", "Her friends were not chosen by chance."],
            ["A systematic sample", "There was no list and no 'every kth' rule."],
            ["A stratified sample", "She did not sample from groups in proportion."],
          ],
          answer: "A", explanation: "Asking friends is convenience sampling." }),
        P.num({ label: "(c)", marks: 1, stem: "She decides instead to take a systematic sample of 25 learners from the school register. Every kth learner is chosen. Find k.", value: k, wrong: [25],
          explanation: t`$k = \frac{300}{25} = 12$.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Describe how she should choose the systematic sample, and give one reason why it is better than asking her friends.",
          points: ["Choose a random number from 1 to 12 as the starting learner on the register.", "Then take every 12th learner after it (e.g. 5, 17, 29, …) until 25 learners are chosen.", "Better because her friends are probably similar to her (same class, similar families), so they may not represent the school; the systematic sample covers the whole register without personal choice."],
          modelAnswer: "Choose a random start from 1 to 12, say 5, then take learners 5, 17, 29, … on the register until 25 are chosen. This spreads the sample across the whole school and removes Nyasha's personal choice; her friends are likely to be similar to her and not representative.",
          explanation: "Random start, fixed interval, then compare with the biased first sample." }),
      ],
      explanation: "Identify the population and method, then design a better (systematic) sample.",
      hints: ["k = population size ÷ sample size."],
    });
  }

  // flashcards
  b.card("DEFINITION", "Population and sample", "The population is the whole group of interest; a sample is the part of it that is actually studied.");
  b.card("DEFINITION", "Sampling frame", "A numbered list of the members of the population from which the sample is chosen.");
  b.card("CONCEPT", "Census or sample?", "A census is complete but slow and costly; a sample is quicker and cheaper and is essential when testing destroys items.");
  b.card("DEFINITION", "Simple random sampling", "Every possible sample of the required size is equally likely; use lots or random numbers on a numbered frame.");
  b.card("FORMULA", "Systematic sampling interval", t`$k = \dfrac{\text{population size}}{\text{sample size}}$; random start from 1 to $k$, then every $k$th member.`);
  b.card("FORMULA", "Stratified sample size per stratum", t`$\dfrac{\text{stratum size}}{\text{population size}} \times \text{sample size}$`);
  b.card("DEFINITION", "Cluster sampling", "Whole natural groups (villages, schools) are chosen at random and studied.");
  b.card("DEFINITION", "Quota and convenience sampling", "Non-random: quota fills set numbers per group by the interviewer's choice; convenience takes whoever is easiest to reach.");
  b.card("CONCEPT", "Bias", "A method is biased if it systematically over- or under-represents some groups; a bigger biased sample is still biased.");
});
