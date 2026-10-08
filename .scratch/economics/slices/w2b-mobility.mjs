// W2b: econ.labour.mobility — occupational and geographical mobility, barriers, changes and consequences.
import { concept, P, table, money, check, fmt, ZIM, CAM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.labour.mobility", { file: "labour/mobility", keyPrefix: "labour.mobility" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **occupational mobility** of labour?",
    options: [
      ["The ease with which workers can change from one type of job to another", "Correct: a change of occupation."],
      ["The ease with which workers can move from one area to another for work", "That is geographical mobility."],
      ["The number of workers who change employer each year", "This is labour turnover, not mobility as defined."],
      ["The movement of workers from rural areas into towns", "This describes urbanisation, a form of geographical movement."],
    ],
    answer: "A",
    explanation: "Occupational mobility is about changing the type of job; geographical mobility is about changing the place of work.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an example of **geographical** mobility of labour?",
    options: [
      ["A nurse moves from Masvingo to Bulawayo to work in a hospital", "Correct: same job, different place."],
      ["A miner retrains and becomes a bricklayer", "Change of job: occupational mobility."],
      ["A clerk is promoted to office manager in the same firm", "A promotion, not a move between areas."],
      ["A teacher leaves teaching to become a bank teller", "Change of job: occupational mobility."],
    ],
    answer: "A",
    explanation: "Geographical mobility means moving to another area to work; the nurse keeps the same occupation but changes place.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which factor is most likely to reduce the **geographical** mobility of a worker?",
    options: [
      ["Children settled in a local school", "Correct: family ties make moving costly and disruptive."],
      ["A lack of transferable skills", "This limits occupational mobility."],
      ["A long and expensive training course", "Training cost limits occupational mobility."],
      ["A professional licence needed for the new job", "Licensing limits occupational mobility."],
    ],
    answer: "A",
    explanation: "Family and social ties, housing costs and moving costs reduce geographical mobility; skills, training and licensing affect occupational mobility.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which government policy would most directly increase **occupational** mobility?",
    options: [
      ["Grants for retrenched workers to retrain in new trades", "Correct: lowers the cost of gaining new skills."],
      ["Building cheaper housing in cities with many vacancies", "This helps geographical mobility."],
      ["Lowering bus fares between towns", "This helps geographical mobility."],
      ["Raising the age at which workers can draw a pension", "This keeps older workers in the labour force but does not help them change jobs."],
    ],
    answer: "A",
    explanation: "Occupational mobility depends on gaining new skills; grants for retraining reduce the cost barrier.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A region has high unemployment among former textile workers while hospitals in the same region have many unfilled nursing posts. What does this mainly show?",
    options: [
      ["Low occupational mobility of labour", "Correct: workers are in the right place but lack the skills for the vacancies."],
      ["Low geographical mobility of labour", "Jobs and workers are in the same region, so distance is not the barrier."],
      ["A surplus of nurses in the region", "There are unfilled nursing posts: a shortage."],
      ["High wages for textile workers", "Unemployed textile workers are not earning textile wages."],
    ],
    answer: "A",
    hints: ["Are the vacancies far away, or do they need different skills?"],
    explanation: "Vacancies and unemployed workers exist in the same place, so the barrier is skills: occupational immobility. It causes structural unemployment.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "Rents in a fast-growing city rise sharply. What is the most likely effect on the labour market there?",
    options: [
      ["Fewer workers move in, so firms find it harder to fill vacancies", "Correct: higher housing costs reduce geographical mobility."],
      ["More workers move in because city wages rise with rents", "Higher rents eat into wages and discourage moving."],
      ["Occupational mobility in the city falls sharply", "Housing costs affect moving between places, not between jobs."],
      ["Unemployment in the city rises because workers flood in", "Higher rents would discourage, not encourage, moves."],
    ],
    answer: "A",
    hints: ["Higher rent reduces what a worker has left from the wage."],
    explanation: "Higher housing costs reduce geographical mobility, so firms in the city face labour shortages and may have to raise wages.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Many skilled engineers leave a fictional developing country for better-paid jobs abroad. Which is a **benefit** of this to the home country?",
    options: [
      ["Money sent home by the engineers adds to household incomes and foreign currency", "Correct: remittances are a recognised benefit."],
      ["The country keeps the skills it paid to train", "It loses those skills: a brain drain."],
      ["Domestic firms find skilled engineers easier to hire", "Fewer engineers remain, so hiring is harder."],
      ["The cost of training new engineers in the home country falls to zero", "The country still pays to train replacements."],
    ],
    answer: "A",
    hints: ["Who receives the money the engineers send home?"],
    explanation: "Remittances support families and bring in foreign currency, though the country loses skills (brain drain).",
  });
  // Moving decision with different figures from the lesson.
  const stay = { wage: 380, rent: 70, fares: 20 }, go = { wage: 470, rent: 130, fares: 30 };
  const left = (x) => x.wage - x.rent - x.fares;
  check("stay", left(stay), 290);
  check("go", left(go), 310);
  const tM = table(["Monthly item (US\\$)", "Stay in Gweru", "Move to Harare"], [["Wage", stay.wage, go.wage], ["Rent", stay.rent, go.rent], ["Transport to work", stay.fares, go.fares]]);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: left(go) - left(stay), daily: true,
    stem: `Tatenda is offered a job in Harare.\n\n${tM}\n\nAfter paying rent and transport, by how much a month would Tatenda be better off if he moved?`,
    wrong: [go.wage - stay.wage],
    explanation: `Gweru: 380 − 70 − 20 = US\\$${left(stay)}. Harare: 470 − 130 − 30 = US\\$${left(go)}. Gain = **${money(left(go) - left(stay))}** a month. The wage gap alone (US\\$${go.wage - stay.wage}) ignores the higher costs.`,
  });
  const R = { wageRise: 72, extraRent: 34, extraFares: 6, moveCost: 288 };
  const gainR = R.wageRise - R.extraRent - R.extraFares;
  const months = R.moveCost / gainR;
  check("months", months, 9);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: months,
    stem: `Rudo is offered a job in Bulawayo. Her wage would rise by US\\$${R.wageRise} a month, but her rent would rise by US\\$${R.extraRent} and her transport costs by US\\$${R.extraFares} a month. Moving would cost her US\\$${R.moveCost}. How many months of work in Bulawayo would it take to recover the moving cost from her monthly gain?`,
    wrong: [R.moveCost / R.wageRise],
    hints: ["First find the monthly gain after the extra rent and transport.", "Divide the moving cost by that gain."],
    explanation: `1. Monthly gain: ${R.wageRise} − ${R.extraRent} − ${R.extraFares} = US\\$${gainR}.\n2. Months to recover: ${R.moveCost} ÷ ${gainR} = **${months}** months.\n3. Using the wage rise alone gives ${R.moveCost} ÷ ${R.wageRise} = ${fmt(R.moveCost / R.wageRise, 1)} months, which ignores the higher rent and fares.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A teacher who moves from Mutare to Gweru to continue teaching is an example of occupational mobility.",
    answer: false,
    explanation: "False. The occupation is unchanged; only the place changes, so this is geographical mobility.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "High occupational mobility helps to reduce structural unemployment.",
    answer: true,
    explanation: "True. Workers from declining industries can retrain and take jobs in growing ones.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each barrier with the type of mobility it mainly reduces, or the policy with what it improves.",
    pairs: [
      ["High rents in towns with vacancies", "Geographical mobility is reduced"],
      ["Skills that are specific to one industry", "Occupational mobility is reduced"],
      ["An online national job vacancy service", "Information about jobs improves"],
      ["Free evening courses in bookkeeping", "Occupational mobility is increased"],
    ],
    explanation: "Housing costs are a geographical barrier; specific skills an occupational one; vacancy services improve information; training raises occupational mobility.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "If labour is immobile, unemployment in declining regions and {{blank:a}} of labour in growing regions exist side by side. Firms facing a shortage may have to {{blank:b}} wages. Greater mobility tends to {{blank:c}} total output.",
    blanks: [
      { id: "a", accepted: ["shortages"], choices: ["shortages", "surpluses"] },
      { id: "b", accepted: ["raise"], choices: ["raise", "cut"] },
      { id: "c", accepted: ["increase"], choices: ["increase", "reduce"] },
    ],
    wrong: [["surpluses", "cut", "reduce"]],
    explanation: "Immobility leaves shortages next to unemployment; firms bid up wages; mobility lets resources move to where they are most productive, raising output.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why an unemployed former mine worker may find it hard to become a computer technician.",
    points: [
      "Identifies lack of the required skills / qualifications.",
      "Explains: the new job needs training that takes time and the worker's mining skills do not transfer.",
      "Identifies the cost of training / loss of income while training (or age, or lack of information).",
      "Explains: the worker may not be able to afford fees or live without income, so does not retrain.",
    ],
    modelAnswer: "First, the worker lacks the skills and qualifications: mining skills do not transfer to computer repair, so a course lasting months would be needed. Second, the training costs money and the worker has no income, so he may be unable to pay the fees and support his family while studying. Both reduce occupational mobility.",
    hints: ["Think about skills, cost, time and age."],
    explanation: "One mark for each barrier and one for explaining why it stops the change of occupation.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, applies: CAM,
    stem: "Analyse **two** consequences for firms of a fall in the geographical mobility of labour.",
    points: [
      "Firms in growing areas find it harder to fill vacancies / face labour shortages.",
      "So they must raise wages or offer relocation allowances, raising costs.",
      "Output may be lost or expansion delayed because posts stay unfilled.",
      "So firms may move to where workers are / use more capital instead of labour.",
    ],
    modelAnswer: "Firms in growing areas will find fewer workers willing to move to them, so vacancies stay unfilled. To attract staff they must raise wages or pay relocation and housing allowances, which raises their costs and may raise prices. Unfilled posts also mean lost output and delayed expansion, so some firms may decide to open new branches where workers already live, or to replace scarce workers with machinery.",
    hints: ["Link the shortage of workers to costs and to output."],
    explanation: "Each consequence needs a chain: fewer workers → effect on wages/costs or output → firm's response.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: "A fictional government plans to close an old coal-fired power station in a small town. About 600 workers will lose their jobs. A new solar-panel factory will open 300 km away and needs 400 workers, most with electrical skills.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "If none of the 600 workers takes a job at the new factory, which kind of unemployment will they mainly face?",
        options: [["Structural unemployment", "Correct: a decline in one industry with a mismatch of skills and location."], ["Seasonal unemployment", "Not linked to the seasons."], ["Frictional unemployment", "Frictional is short-term, between jobs."], ["Voluntary unemployment", "They lose their jobs involuntarily."]],
        answer: "A",
        explanation: "Their jobs disappear because an industry closes and their skills and location do not match the new jobs: structural unemployment.",
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **one** occupational and **one** geographical barrier the workers face in taking the new jobs.", points: ["Occupational: many lack the electrical skills required.", "Explains: they would need training, which takes time and money.", "Geographical: the factory is 300 km away.", "Explains: moving costs, housing and family ties make relocation hard."], modelAnswer: "Occupationally, many power-station workers lack the electrical skills the factory needs, so they would need months of training that costs money. Geographically, the factory is 300 km away, so they would have to find housing, pay moving costs and leave family and community ties behind." }),
      P.manual({
        label: "(c)", marks: 7, levels: LV(7),
        stem: "Discuss whether the government should pay for retraining and relocation of the workers.",
        points: [
          "For: retraining and relocation reduce structural unemployment and lost output.",
          "For: the workers' skills and the new factory's needs are brought together, filling vacancies.",
          "For: saves on unemployment-related spending / reduces poverty in the town.",
          "Against: the cost to the government budget and the opportunity cost of the money.",
          "Against: not all workers can or want to move (age, family); some will not complete the training.",
          "Against: the factory itself could train workers / pay relocation since it benefits.",
          "Justified conclusion (for example support targeted at those likely to move, shared with the firm).",
        ],
        hints: ["Who gains, what does it cost, and will the workers actually move?"],
        modelAnswer: "Paying for retraining and relocation would let many of the 600 workers fill the factory's 400 vacancies, reducing structural unemployment, poverty in the town and lost output, and helping the new industry grow. However, it costs the government money that could be used elsewhere, and not every worker will benefit: older workers or those with families may refuse to move, and some may not finish the training. The factory, which gains from skilled staff, could share the cost. On balance, targeted support, shared with the employer and offered to workers likely to move, is justified because the cost of long-term unemployment is high.",
      }),
    ],
    explanation: "(a) Structural. (b) Skills mismatch and distance. (c) Benefits (less unemployment, more output) against cost and limited take-up.",
    hints: ["Separate the two kinds of mobility."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, applies: ZIM,
    stem: "Explain how mobility of labour affects the size and distribution of a country's labour force.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Explain how geographical mobility from rural areas to towns affects the distribution of the labour force.", points: ["Workers move from rural areas to towns in search of jobs and higher incomes.", "The urban labour force grows / the rural labour force shrinks.", "Towns may face more unemployment, informal work and pressure on housing.", "Rural areas may lose younger, more educated workers, reducing farm output."], modelAnswer: "Workers, especially the young, move from rural areas to towns looking for jobs and higher incomes. The urban labour force grows and the rural one shrinks. Towns may then have more unemployment and informal trading and pressure on housing, while rural areas lose younger, educated workers, which can reduce farm output." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain how emigration of skilled workers affects the country's labour force.", points: ["Reduces the number of skilled workers in the labour force.", "Causes skill shortages in sectors such as health and engineering.", "The country loses the return on the cost of training them (brain drain).", "But remittances raise incomes at home / some return with new skills."], modelAnswer: "Emigration of skilled workers reduces the size and quality of the labour force, causing shortages of doctors, nurses and engineers. The country loses the money spent training them, which is called a brain drain. On the other hand, emigrants send remittances that support families, and some may return later with new skills and savings." }),
    ],
    explanation: "Rural-urban migration redistributes the labour force; emigration of skilled workers shrinks it and causes shortages, partly offset by remittances.",
    hints: ["Think about where workers end up and which skills are lost."],
  });

  b.card("DEFINITION", "Mobility of labour", "The ease with which workers can move between occupations (occupational) or between places (geographical) to work.");
  b.card("DEFINITION", "Occupational mobility", "The ease with which workers can change from one type of job to another.");
  b.card("DEFINITION", "Geographical mobility", "The ease with which workers can move from one area to another to take up work.");
  b.card("CONCEPT", "Barriers to occupational mobility", "Specific skills, cost and length of training, qualifications and licensing, lack of education, age, discrimination.");
  b.card("CONCEPT", "Barriers to geographical mobility", "Housing costs, family and social ties, moving costs, lack of information, culture or language, immigration rules.");
  b.card("CONCEPT", "How can government raise mobility?", "Retraining grants and apprenticeships (occupational); housing, transport, job information and relocation help (geographical).");
  b.card("FACT", "What does labour immobility cause?", "Unemployment in declining areas or industries alongside labour shortages in growing ones (structural unemployment).");
  b.card("CONCEPT", "Brain drain", "The emigration of skilled workers: the home country loses skills it paid to train, though it may gain remittances.");
  b.card("CONCEPT", "Consequences of changes in mobility for firms", "Higher mobility makes vacancies easier and cheaper to fill; lower mobility causes skill shortages and higher wage costs.", null, { applies: CAM });
});
