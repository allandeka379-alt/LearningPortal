// W4a: econ.population.labour-force (ZIMSEC only) — the economically active population, how population composition
// relates to the labour force, factors affecting its size and composition, ways of controlling population growth.
// Figures differ from the lesson's worked examples.
import { concept, P, table, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.population.labour-force", { file: "population/labour-force", keyPrefix: "population.labour-force" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The labour force (economically active population) consists of",
    options: [
      ["people of working age who are employed or are unemployed and seeking work.", "Correct: employed + unemployed."],
      ["everyone in the country who is of working age, active or not.", "The working-age population includes the inactive."],
      ["only people who have formal jobs with a written contract.", "Informal workers and the unemployed are also included."],
      ["the whole population of the country, including children.", "Children are below working age."],
    ],
    answer: "A",
    explanation: "Labour force = employed + unemployed (people seeking work).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which person is **economically inactive**?",
    options: [
      ["A full-time student not looking for work", "Correct: not working and not seeking work."],
      ["A vendor who sells vegetables at a market", "Informal work counts as employment."],
      ["A retrenched miner who is applying for jobs", "He is unemployed and in the labour force."],
      ["A part-time assistant in a clothing shop", "Part-time workers are employed."],
    ],
    answer: "A",
    explanation: "Students, homemakers, the retired and discouraged workers are inactive.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which change would **increase** the size of a country's labour force?",
    options: [
      ["Raising the retirement age so older people keep working", "Correct: people stay economically active longer."],
      ["Raising the school-leaving age by two years", "More young people stay in school, out of the labour force."],
      ["Emigration of many young adults to other countries", "This reduces the labour force."],
      ["A rise in the number of discouraged workers", "Discouraged workers leave the labour force."],
    ],
    answer: "A",
    explanation: "A later retirement age keeps older people in the labour force.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which policy mainly changes the **composition** (skills) of the labour force rather than its size?",
    options: [
      ["Expanding vocational colleges that train artisans and technicians", "Correct: raises the share of skilled workers."],
      ["Allowing more immigrants of all skill levels to settle", "This mainly increases the size."],
      ["Lowering the retirement age by five years", "This mainly reduces the size."],
      ["Building more housing in the capital city", "Housing does not directly change skills."],
    ],
    answer: "A",
    explanation: "Training changes the mix of skills in the labour force.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might the labour force of a country with a very young population be small compared with its total population?",
    options: [
      ["A large share of the population is below working age", "Correct: children are not part of the labour force."],
      ["Young populations have high death rates among the elderly", "This does not explain a small labour force."],
      ["Young people cannot be counted as unemployed", "Young people of working age who seek work are counted."],
      ["Young populations always have high participation rates", "That would make the labour force larger, not smaller."],
    ],
    answer: "A",
    hints: ["Which age groups are outside the labour force?"],
    explanation: "With many children, a small share of the population is of working age, so the labour force is small relative to the population.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does educating girls tend to slow population growth?",
    options: [
      ["Educated women tend to marry later and choose to have fewer children", "Correct: more schooling and job options reduce family size."],
      ["Schools are not allowed to admit girls who are married", "This is not the economic reason."],
      ["Education raises infant mortality, so fewer children survive", "Education lowers infant mortality."],
      ["Educated girls are all required by law to emigrate", "There is no such requirement."],
    ],
    answer: "A",
    hints: ["Think about the age at marriage and the cost of leaving paid work."],
    explanation: "Education delays marriage, raises the opportunity cost of large families and improves knowledge of health and family planning.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A government wants to slow population growth while respecting people's freedom to choose. Which measure is **most** appropriate?",
    options: [
      ["Free family planning and more schooling for girls", "Correct: voluntary measures that reduce births over time."],
      ["A law limiting every family to one child, with fines", "Compulsory limits restrict freedom of choice."],
      ["Cutting healthcare spending so that death rates rise", "This is harmful and unacceptable."],
      ["Banning marriage for everyone under the age of 30", "This is extreme and restricts freedom."],
    ],
    answer: "A",
    hints: ["Which option relies on choices rather than compulsion?"],
    explanation: "Family planning, education and healthcare reduce births voluntarily; compulsory limits have serious social costs.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Many skilled engineers and nurses emigrate from a country. What is the most likely effect on its labour force?",
    options: [
      ["It falls in size and its share of skilled workers falls", "Correct: both size and composition change (brain drain)."],
      ["It rises in size because others replace the emigrants", "Replacements are not automatic; skills take years to train."],
      ["Its size is unchanged but its share of skilled workers rises", "Losing skilled workers lowers the skilled share."],
      ["It is unaffected because emigrants keep their jobs at home", "Emigrants leave their jobs."],
    ],
    answer: "A",
    hints: ["Emigration changes both the number and the mix of workers."],
    explanation: "Emigration reduces the labour force and, when skilled people leave, its quality (the brain drain).",
  });

  // Numericals.
  const emp = 4130, unemp = 620, lf = emp + unemp;
  check("lf", lf, 4750);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: lf, daily: true,
    stem: `In a fictional country, ${fmt(emp)} thousand people are employed and ${unemp} thousand are unemployed and seeking work. What is the size of the labour force, in thousands?`,
    wrong: [emp, emp - unemp],
    explanation: `Labour force = employed + unemployed = ${fmt(emp)} + ${unemp} = **${fmt(lf)} thousand**.`,
  });
  const wap2 = 7400, lf2 = 4810, part2 = (lf2 / wap2) * 100;
  check("part2", part2, 65);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: part2, calculator: true,
    stem: `A fictional country has a working-age population of ${fmt(wap2)} thousand and a labour force of ${fmt(lf2)} thousand. Calculate the labour force participation rate. Give your answer to one decimal place.`,
    wrong: [(wap2 / lf2) * 100],
    explanation: `Participation rate = ${fmt(lf2)} ÷ ${fmt(wap2)} × 100 = **${pct(part2, 1)}**.`,
  });
  const wap3 = 11200, rate3 = 62.5, lf3 = (wap3 * rate3) / 100, emp3 = 6020, un3 = lf3 - emp3;
  check("lf3", lf3, 7000); check("un3", un3, 980);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: un3,
    stem: `A fictional country has a working-age population of ${fmt(wap3)} thousand and a participation rate of ${fmt(rate3, 1)}%. ${fmt(emp3)} thousand people are employed. How many people are unemployed, in thousands?`,
    wrong: [wap3 - emp3, lf3],
    hints: ["Find the labour force from the participation rate first."],
    explanation: `1. Labour force = ${fmt(rate3, 1)}% × ${fmt(wap3)} = ${fmt(lf3)} thousand.\n2. Unemployed = labour force − employed = ${fmt(lf3)} − ${fmt(emp3)} = **${fmt(un3)} thousand**.\n3. ${fmt(wap3 - emp3)} wrongly includes the economically inactive.`,
  });
  const lfA = 5300, school = 85, retire = 32, women = 140, emig = 64;
  const lfB = lfA - school + retire + women - emig;
  check("lfB", lfB, 5323);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", value: lfB,
    stem: `A fictional country's labour force is ${fmt(lfA)} thousand. Over five years: ${school} thousand young people stay in education instead of seeking work; ${retire} thousand older people keep working because the retirement age rises; ${women} thousand women join the labour force; and ${emig} thousand workers emigrate. Assuming nothing else changes, what is the new labour force, in thousands?`,
    wrong: [lfA - school + retire + women + emig, lfA + school + retire + women - emig],
    hints: ["Decide whether each change adds to or subtracts from the labour force."],
    explanation: `1. Staying in education: −${school}. Later retirement: +${retire}. Women joining: +${women}. Emigration: −${emig}.\n2. New labour force = ${fmt(lfA)} − ${school} + ${retire} + ${women} − ${emig} = **${fmt(lfB)} thousand**.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Unemployed people who are actively seeking work are part of the labour force.",
    answer: true,
    explanation: "True. Labour force = employed + unemployed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Raising the school-leaving age increases the size of the labour force in the short run.",
    answer: false,
    explanation: "False. Young people stay in school longer, so the labour force is smaller in the short run, though more skilled later.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change with its effect on the labour force.",
    pairs: [
      ["Better childcare allows more mothers to take paid work", "Size rises; share of women rises"],
      ["A new apprenticeship scheme for school leavers", "Share of skilled workers rises"],
      ["Large-scale emigration of young adults", "Size falls; average age rises"],
      ["Raising the retirement age", "Size rises; more older workers"],
    ],
    explanation: "Policies and migration change both how many people are in the labour force and its make-up.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "Labour force = employed + {{blank:a}}. The participation rate is the labour force divided by the {{blank:b}} population, multiplied by 100. If many discouraged workers stop looking for work, the participation rate will {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["unemployed"], choices: ["unemployed", "inactive", "retired"] },
      { id: "b", accepted: ["working-age"], choices: ["working-age", "total", "employed"] },
      { id: "c", accepted: ["fall"], choices: ["fall", "rise"] },
    ],
    wrong: [["inactive", "total", "rise"]],
    hints: ["Discouraged workers leave the labour force."],
    explanation: "Discouraged workers become inactive, so the labour force and the participation rate fall.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** factors that affect the size of a country's labour force.",
    points: [
      "Identifies a factor, e.g. the age structure of the population.",
      "Explains it, e.g. a population with many children has fewer people of working age.",
      "Identifies a second factor, e.g. school-leaving or retirement age / women's participation / migration / health.",
      "Explains it, e.g. emigration of working-age adults reduces the number available to work.",
    ],
    modelAnswer: "First, the age structure: a country with many children and elderly people has a smaller share of its population of working age, so its labour force is smaller. Second, migration: when many working-age adults emigrate to find work abroad, the number of people available to work at home falls.",
    hints: ["Think about age, education, retirement, women and migration."],
    explanation: "Each factor: identify (1) + explain (1).",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **one** advantage and **one** disadvantage of raising the school-leaving age for the labour force.",
    points: [
      "Advantage identified: a more educated and skilled future labour force.",
      "Advantage explained: higher productivity and wages; fewer unskilled school leavers seeking scarce jobs.",
      "Disadvantage identified: a smaller labour force in the short run / cost to government and families.",
      "Disadvantage explained: fewer workers now and lost family income; government must pay for more teachers and classrooms.",
    ],
    modelAnswer: "An advantage is that young people gain more education and skills, so the future labour force is more productive and can earn higher wages. A disadvantage is that the labour force is smaller in the short run, and families lose the income teenagers would have earned, while the government must pay for more teachers and classrooms.",
    hints: ["Think about the short run and the long run."],
    explanation: "Advantage: identify (1) + explain (1). Disadvantage: identify (1) + explain (1).",
  });

  // Structured 1: population and labour force data.
  const C = { pop: 13800, under: 5520, over: 690, emp: 4660, unemp: 1170 };
  const wapC = C.pop - C.under - C.over, lfC = C.emp + C.unemp, partC = (lfC / wapC) * 100, inC = wapC - lfC, urC = (C.unemp / lfC) * 100;
  check("wapC", wapC, 7590); check("lfC", lfC, 5830); check("inC", inC, 1760);
  const T1 = table(["Group", "People (thousands)"], [["Total population", C.pop], ["Below working age", C.under], ["Above working age", C.over], ["Employed", C.emp], ["Unemployed and seeking work", C.unemp]]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows population data for a fictional country, Country P.\n\n${T1}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "plain", value: wapC, stem: "Calculate the working-age population, in thousands.", wrong: [C.pop - C.under], explanation: `${fmt(C.pop)} − ${fmt(C.under)} − ${C.over} = ${fmt(wapC)} thousand.` }),
      P.num({ label: "(b)", marks: 1, kind: "plain", value: lfC, stem: "Calculate the labour force, in thousands.", wrong: [C.emp], explanation: `${fmt(C.emp)} + ${fmt(C.unemp)} = ${fmt(lfC)} thousand.` }),
      P.num({ label: "(c)", marks: 2, kind: "pct", value: partC, stem: "Calculate the labour force participation rate. Give your answer to one decimal place.", wrong: [(lfC / C.pop) * 100], explanation: `${fmt(lfC)} ÷ ${fmt(wapC)} × 100 = ${pct(partC, 1)}.` }),
      P.manual({
        label: "(d)", marks: 3,
        stem: `Explain why ${fmt(inC)} thousand people of working age in Country P are not in the labour force.`,
        points: [
          "Many are in full-time education (students).",
          "Others are homemakers, retired early, or long-term sick or disabled.",
          "Some are discouraged workers who have stopped looking because of few vacancies (unemployment is high).",
        ],
        modelAnswer: `The ${fmt(inC)} thousand inactive people include young adults in full-time education, homemakers caring for families, people who are sick or disabled, and discouraged workers who have stopped looking for work because jobs are scarce, which is likely in Country P, where ${pct(urC, 1)} of the labour force is unemployed.`,
        explanation: "One mark per reason.",
      }),
      P.manual({
        label: "(e)", marks: 5, levels: LV(5),
        stem: "Discuss whether Country P should try to increase the size of its labour force.",
        points: [
          "For: more workers can raise output and tax revenue; more women in work raises household incomes; reduces dependency.",
          `Against: unemployment is already high (${pct(urC, 1)}), so extra entrants may simply become unemployed.`,
          "Against: drawing young people out of education reduces future skills.",
          "Better: create jobs and improve skills (composition) so that the existing labour force is used productively.",
          "Justified conclusion.",
        ],
        modelAnswer: `A larger labour force could raise output and tax revenue, and bringing more women into paid work would raise household incomes. However, ${pct(urC, 1)} of Country P's labour force is already unemployed, so adding more people would mainly increase unemployment unless jobs are created. Pulling young people out of education would also reduce the skills of the future labour force. Country P should not aim mainly to make its labour force bigger; it should create jobs and improve skills, so that the people already in the labour force are employed productively, and then encourage participation as demand for labour grows.`,
        explanation: "Weigh more workers against high unemployment and skills; conclude.",
      }),
    ],
    hints: ["Working-age population = total − below working age − above working age.", "Labour force = employed + unemployed."],
    explanation: `Working-age population ${fmt(wapC)}; labour force ${fmt(lfC)}; participation ${pct(partC, 1)}; inactive ${fmt(inC)}; unemployment rate ${pct(urC, 1)} (all thousands).`,
  });

  // Structured 2: controlling population growth.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional country's population is growing quickly, and each year many more young people leave school than there are new jobs. The government is considering two ways of slowing population growth: a law limiting families to two children, with fines for breaking it; or a programme of free family-planning services and bursaries for girls to complete secondary school.",
    parts: [
      P.tf({
        label: "(a)", marks: 1,
        stem: "Rapid population growth with few new jobs is likely to increase unemployment among school leavers.",
        answer: true,
        explanation: "True. The labour force grows faster than the demand for labour.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain how bursaries for girls could slow population growth.",
        points: ["Girls stay in school longer and marry later.", "Educated women have more job opportunities and knowledge of family planning, so they choose smaller families."],
        modelAnswer: "Bursaries keep girls in school for longer, so they marry and start families later; educated women also have better job opportunities and know more about family planning, so they tend to choose to have fewer children.",
        explanation: "Two linked points.",
      }),
      P.manual({
        label: "(c)", marks: 5, levels: LV(5),
        stem: "Discuss which of the two policies the government should choose.",
        points: [
          "Law: might reduce births quickly if enforced.",
          "Law: restricts freedom of choice; hard and costly to enforce; fines hurt poor families; may lead to hidden births or social harm.",
          "Programme: voluntary and respects rights; also raises the skills of the future labour force and women's incomes.",
          "Programme: slower to work; costs money (bursaries, clinics); depends on take-up and cultural attitudes.",
          "Justified conclusion: the voluntary programme is better, possibly with job-creation measures for current school leavers.",
        ],
        modelAnswer: "A two-child law might reduce births quickly if it were enforced, but it would restrict people's freedom to choose, be hard and costly to enforce, and fines would fall hardest on poor families; it could also cause serious social harm. Free family planning and bursaries for girls are voluntary and respect rights, and they bring extra benefits: more educated women, a more skilled future labour force and higher household incomes. They take longer to work and cost money, and their success depends on take-up and attitudes. The government should choose the voluntary programme, because it slows population growth while improving the labour force, and combine it with job creation for the young people already leaving school.",
        explanation: "Weigh speed and enforceability against rights, costs and wider benefits; conclude.",
      }),
    ],
    hints: ["Compare a compulsory measure with a voluntary one."],
    explanation: "Voluntary measures (education, family planning) slow growth and improve the labour force; compulsory limits are controversial and hard to enforce.",
  });

  b.card("DEFINITION", "Define the **labour force**.", "People of working age who are employed or unemployed and actively seeking work (the economically active population).");
  b.card("FORMULA", "Labour force participation rate = ?", "Labour force ÷ working-age population × 100.");
  b.card("DEFINITION", "Who is **economically inactive**?", "People of working age not working and not seeking work: students, homemakers, the retired, the long-term sick, discouraged workers.");
  b.card("CONCEPT", "Give five factors affecting the size of the labour force.", "Population size and age structure; school-leaving age; retirement age; women's participation; migration; health; job opportunities; government policy.");
  b.card("CONCEPT", "Give three factors affecting the composition of the labour force.", "Education and training; government policy; the structure of the economy; migration (brain drain).");
  b.card("CONCEPT", "Give four ways of controlling population growth.", "Family planning; education of girls; better healthcare to cut infant mortality; raising the marriage age; incentives; awareness campaigns.");
  b.card("FACT", "What is the usual textbook definition of working age?", "About 15 to 64 years; statistics offices may use other limits, so check the official definition.");
  b.card("CONCEPT", "How does raising the school-leaving age affect the labour force?", "It reduces its size in the short run but raises its skills and productivity in the long run.");
});
