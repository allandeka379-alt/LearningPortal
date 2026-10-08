// W2b: econ.labour.wage-differentials — why wages differ (skill, sector, sex, private/public, risk, prestige, etc.).
import { concept, P, table, money, pctChange, check, fmt, ZIM, CAM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.labour.wage-differentials", { file: "labour/wage-differentials", keyPrefix: "labour.wage-differentials" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **wage differential**?",
    options: [
      ["A difference in pay between groups of workers or occupations", "Correct: for example between skilled and unskilled workers."],
      ["The difference between a worker's gross and net pay", "That difference is deductions such as tax."],
      ["The rise in a worker's wage from one year to the next", "That is a pay rise, not a differential between workers."],
      ["The gap between the minimum wage and the average wage", "This is one particular gap, not the meaning of the term."],
    ],
    answer: "A",
    explanation: "A wage differential is a difference in wages between occupations, industries, regions, sectors or groups of workers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are underground mine workers often paid more than shop assistants with similar schooling?",
    options: [
      ["The work is dangerous, so higher pay is needed to attract workers", "Correct: a compensating differential for risk."],
      ["Mining needs a university degree for every worker", "Many mine jobs need training, but not a degree."],
      ["Shop assistants belong to more powerful trade unions", "This would raise shop assistants' pay, not lower it."],
      ["Mineral prices are always higher than the prices of shop goods", "Prices of goods do not directly compare workers' pay."],
    ],
    answer: "A",
    explanation: "Risk and unpleasant conditions reduce the supply of labour to mining, so employers must pay more to attract workers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which reason best explains why specialist surgeons earn very high wages?",
    options: [
      ["Long training keeps supply low while demand for their skills is high", "Correct: low supply and high demand give a high equilibrium wage."],
      ["Surgeons work longer hours than any other worker", "Hours alone do not explain the wage rate."],
      ["The government sets surgeons' wages above those of all other workers", "Wages of private surgeons are set by the market."],
      ["Surgery has low prestige, so surgeons must be paid more", "Surgery has high prestige."],
    ],
    answer: "A",
    explanation: "Years of training mean few people can become surgeons (low, inelastic supply) and their skills are highly valued (high demand).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Which basis of a wage differential is an example of **discrimination**?",
    options: [
      ["A woman paid less than a man for doing the same job equally well", "Correct: unequal pay for the same work and ability."],
      ["A qualified engineer paid more than an apprentice", "This reflects training and skill."],
      ["A night-shift worker paid more than a day-shift worker", "This compensates for unsocial hours."],
      ["A union member paid more after collective bargaining", "This reflects bargaining strength."],
    ],
    answer: "A",
    explanation: "Discrimination is paying or treating workers differently for reasons unrelated to their ability, such as sex.",
  });
  // Earnings data (different from the lesson).
  const occ = [["Cleaner", 180], ["Bus driver", 360], ["Teacher", 540], ["Mining engineer", 1620]];
  const tE = table(["Occupation", "Average monthly earnings (US\\$)"], occ);
  const times = 1620 / 180;
  check("times", times, 9);
  b.num({
    d: 2, skill: "APPLICATION", kind: "times", value: times, dp: 0, daily: true,
    stem: `The table shows average earnings in a fictional town.\n\n${tE}\n\nHow many times as much as a cleaner does a mining engineer earn?`,
    wrong: [1620 - 180],
    explanation: `1,620 ÷ 180 = **9** times. Subtracting (1,620 − 180 = 1,440) gives the gap in dollars, not how many times as much.`,
  });
  const pTeach = pctChange(420, 651);
  check("pTeach", pTeach, 55);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: pTeach,
    stem: "In a fictional city, nurses earn an average of US\\$420 a month and pharmacists US\\$651 a month. By what percentage are a pharmacist's average earnings higher than a nurse's? Give your answer to one decimal place.",
    wrong: [((651 - 420) / 651) * 100, 231],
    hints: ["Percentage difference = difference ÷ the nurse's (base) earnings × 100."],
    explanation: `(651 − 420) ÷ 420 × 100 = **${fmt(pTeach, 1)}%**. Dividing by the pharmacist's 651 gives ${fmt(((651 - 420) / 651) * 100, 1)}%, which uses the wrong base; 231 is the gap in dollars.`,
  });
  const gap = ((620 - 527) / 620) * 100;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: gap, calculator: true,
    stem: "In a fictional company, men's average monthly pay is US\\$620 and women's is US\\$527. Calculate the gender pay gap as a percentage of men's average pay, to one decimal place.",
    wrong: [((620 - 527) / 527) * 100, 93],
    hints: ["Gap ÷ men's pay × 100."],
    explanation: `1. Gap in dollars: 620 − 527 = US\\$93.\n2. As a percentage of men's pay: 93 ÷ 620 × 100 = **${fmt(gap, 1)}%**.\n3. Dividing by women's pay (527) gives ${fmt(((620 - 527) / 527) * 100, 1)}%, which answers a different question (how much more men earn than women).`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Jobs that need long training tend to pay higher wages because the supply of qualified workers is low.",
    answer: true,
    explanation: "True. Training limits the number who can do the job, so supply is low and the wage is higher.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A job with high prestige always pays more than a job with low prestige.",
    answer: false,
    explanation: "False. Prestige attracts many applicants, which raises supply and can keep wages lower than the skill needed would suggest.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the reason for the wage differential.",
    pairs: [
      ["Divers who repair underwater pipes earn more than builders", "Risk"],
      ["Unionised railway workers earn more than non-union drivers", "Bargaining strength"],
      ["Accountants earn more than clerks", "Skills and training"],
      ["A law sets a higher minimum wage in one industry", "Government policy"],
    ],
    explanation: "Dangerous work earns a compensating differential; unions raise bargaining power; training limits supply; government can set wage floors.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Many unskilled people can do farm work, so the {{blank:a}} of farm labour is large and the wage is {{blank:b}}. Few people can do brain surgery, so the supply is {{blank:c}} and the wage is high.",
    blanks: [
      { id: "a", accepted: ["supply"], choices: ["supply", "demand"] },
      { id: "b", accepted: ["low"], choices: ["low", "high"] },
      { id: "c", accepted: ["small"], choices: ["small", "large"] },
    ],
    wrong: [["demand", "high", "large"]],
    explanation: "A large supply of labour keeps wages low; a small supply of highly skilled labour keeps them high.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "Experienced accountants in a fictional country earn more in private firms than in government departments. Which is the most likely reason?",
    options: [
      ["Private firms compete for scarce skills and can link pay to profits", "Correct: competition for skilled staff raises private pay."],
      ["Government departments have no budget limits on what they pay staff", "Governments are constrained by their budgets."],
      ["Private firms offer more job security and pensions", "Security and pensions are usually stronger in the public sector."],
      ["Public-sector accountants need more qualifications", "The qualifications are the same."],
    ],
    answer: "A",
    hints: ["Who decides public-sector pay, and what limits it?"],
    explanation: "Private firms bid for scarce skills and can pay from profits; the public sector uses fixed pay scales limited by the budget, though it may offer more security.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "In many developing economies, average wages in the primary sector are lower than in the secondary and tertiary sectors. Which is the best explanation?",
    options: [
      ["Many unskilled workers compete for farm jobs, and output per worker is low", "Correct: large supply and low productivity keep wages low."],
      ["Farming needs more qualifications than manufacturing", "Most farm jobs need few formal qualifications."],
      ["Primary-sector workers are all members of strong unions", "Farm workers are often poorly organised."],
      ["The prices of farm products are fixed by law at a high level", "High fixed prices would tend to raise farm wages."],
    ],
    answer: "A",
    hints: ["Think about both supply of labour and productivity."],
    explanation: "A large supply of unskilled labour and low productivity (little capital, weather risk) keep primary-sector wages low.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A fictional government passes a law requiring equal pay for women and men doing the same work. Why might the average gender pay gap remain?",
    options: [
      ["Women may still be concentrated in lower-paid occupations", "Correct: equal pay for the same work does not change the mix of jobs."],
      ["The law makes discrimination in pay legal", "The law forbids discrimination in pay for the same work."],
      ["Equal pay laws reduce the wages that women are paid in every job", "They aim to raise underpaid women's wages."],
      ["Men's wages will rise to match the law", "The law does not require men's pay to rise."],
    ],
    answer: "A",
    hints: ["What causes the gap besides unequal pay for the same job?"],
    explanation: "Much of the average gap comes from differences in occupations, hours and career breaks; equal pay laws only tackle unequal pay for the same work.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a qualified electrician earns more than a general labourer.",
    points: [
      "Identifies training/qualifications.",
      "Explains: few people complete the training, so the supply of electricians is low, raising the wage.",
      "Identifies productivity / demand for skills.",
      "Explains: electricians' work is worth more to firms, so demand for them is higher / the labourer's job can be done by many.",
    ],
    modelAnswer: "First, electricians need years of training and a qualification, so few people can do the job; the supply of electricians is low, which raises their wage. Second, electricians are more productive and their work is essential to builders and factories, so demand for them is high, whereas almost anyone can be a labourer, so supply is large and the wage low.",
    hints: ["Link each reason to demand or supply."],
    explanation: "One mark for each reason and one for linking it to demand, supply and the wage.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4, applies: ZIM,
    stem: "Explain how culture and government policy can each cause wage differentials.",
    points: [
      "Culture: traditional ideas of 'men's work' and 'women's work' channel groups into particular jobs.",
      "So some groups crowd into low-paid occupations, raising supply there and lowering wages.",
      "Government policy: minimum wages, public pay scales or equal pay laws.",
      "Explains the effect: a minimum wage raises pay in low-paid jobs; public scales set pay differently from the private sector.",
    ],
    modelAnswer: "Culture can lead girls and boys to train for different jobs. If many women are guided into a few occupations, such as clerical or care work, supply there is large and wages are lower. Government policy also matters: a minimum wage raises pay in the lowest-paid jobs, and the government sets pay scales for civil servants, which may be higher or lower than private pay for similar work.",
    hints: ["Culture: who does which job? Policy: what laws or pay scales does the state set?"],
    explanation: "One mark for each cause and one for explaining its effect on wages.",
  });
  // Structured: earnings by sector and sex (fictional).
  const rows = [["Agriculture", "Primary", 190, 160], ["Manufacturing", "Secondary", 380, 330], ["Banking", "Tertiary", 760, 640], ["Retail", "Tertiary", 300, 270]];
  const tS = table(["Industry", "Sector", "Men (US\\$ a month)", "Women (US\\$ a month)"], rows, { align: ["l", "l", "r", "r"] });
  const gBank = ((760 - 640) / 760) * 100;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 14, calculator: true,
    stem: `The table shows average monthly earnings of full-time workers in a fictional country.\n\n${tS}`,
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "In which industry do women earn the most?",
        options: [["Banking", "Correct: US\\$640."], ["Manufacturing", "US\\$330."], ["Retail", "US\\$270."], ["Agriculture", "US\\$160."]],
        answer: "A",
        explanation: "Women in banking earn US\\$640 a month, the highest figure for women.",
      }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: gBank, stem: "Calculate the pay gap in banking as a percentage of men's earnings, to one decimal place.", wrong: [((760 - 640) / 640) * 100], explanation: `(760 − 640) ÷ 760 × 100 = ${fmt(gBank, 1)}%.` }),
      P.num({ label: "(c)", marks: 1, kind: "times", value: 760 / 190, dp: 0, stem: "How many times as much as a man in agriculture does a man in banking earn?", wrong: [760 - 190], explanation: "760 ÷ 190 = 4 times." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain **two** reasons why earnings in banking are higher than in agriculture.", points: ["Banking jobs need more skills/qualifications.", "So supply of qualified bank staff is lower, raising wages.", "Output per worker / value of output is higher in banking (more capital, higher productivity).", "So demand for bank workers is higher / farms cannot afford high wages; many unskilled workers compete for farm jobs."], modelAnswer: "Banking jobs need qualifications, so fewer people can do them and supply is lower, which raises wages. Bank workers also produce services of high value with modern equipment, so each worker is worth more to the employer, while many unskilled workers compete for farm jobs, where output per worker is low." }),
      P.manual({
        label: "(e)", marks: 6, levels: LV(6),
        stem: "Discuss whether the differences between men's and women's earnings in the table show that women face discrimination.",
        points: [
          "Women earn less than men in every industry, which is consistent with discrimination.",
          "If women do the same jobs with the same skills for less pay, that is discrimination.",
          "But averages may hide differences in occupations / grades within each industry (for example fewer women in senior posts).",
          "Differences in experience, hours or career breaks for childcare may explain part of the gap.",
          "Barriers to promotion or training may themselves be a form of discrimination.",
          "Justified conclusion (for example the data suggest but do not prove discrimination; more information on jobs and hours is needed).",
        ],
        hints: ["What else, apart from discrimination, could cause a gap in averages?"],
        modelAnswer: "Women earn less than men in all four industries, which is what we would expect if employers discriminate. However, these are averages: women may be employed in more junior grades, have fewer years of experience because of career breaks, or work in lower-paid jobs within each industry, so the gap may partly reflect differences in jobs rather than unequal pay for the same work. On the other hand, if women are kept out of senior posts or training, that is itself a form of discrimination. The data suggest discrimination may exist, but to be sure we would need to compare men and women doing the same jobs with the same experience.",
      }),
    ],
    explanation: "(a) Banking. (b) Gap ÷ men's pay. (c) 4 times. (d) Skills and productivity. (e) Averages suggest but do not prove discrimination.",
    hints: ["Read the right column for each question."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: "In a fictional city, a nurse in a public hospital earns US\\$480 a month with a pension and housing allowance. A nurse in a private clinic earns US\\$600 a month with no pension.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: pctChange(480, 600), stem: "By what percentage is the private clinic's wage higher than the public hospital's? Give your answer to one decimal place.", wrong: [((600 - 480) / 600) * 100], explanation: `(600 − 480) ÷ 480 × 100 = ${fmt(pctChange(480, 600), 1)}%.` }),
      P.manual({ label: "(b)", marks: 6, stem: "Analyse why the private and public sectors may pay nurses differently.", points: ["Private clinics compete for scarce nurses and can pay from fees/profit.", "So they offer higher wages to attract and keep staff.", "Public pay is set by national scales and limited by the government budget.", "So public wages rise more slowly / cannot respond to shortages quickly.", "The public sector offers non-wage benefits (pension, housing, security) instead.", "So some nurses accept a lower wage for these benefits; the total packages may be closer than the wages suggest."], modelAnswer: "Private clinics compete with each other for scarce nurses and can pay from patients' fees, so they offer higher wages to attract and keep staff. Public hospitals pay on national scales that depend on the government budget, so wages rise slowly and cannot respond quickly to shortages. However, the public sector offers a pension, a housing allowance and greater job security, so some nurses accept a lower wage; the full packages are closer than the US\\$120 difference in wages suggests." }),
    ],
    explanation: `(a) ${fmt(pctChange(480, 600), 1)}%. (b) Competition and ability to pay in the private sector; budget-limited scales but better benefits in the public sector.`,
    hints: ["Base for the percentage: the public hospital wage."],
  });

  b.card("DEFINITION", "Wage differential", "A difference in wages between occupations, industries, regions, sectors or groups of workers.");
  b.card("DEFINITION", "Compensating differential", "Extra pay needed to attract workers into jobs with unattractive features such as danger or unsocial hours.");
  b.card("DEFINITION", "Discrimination in the labour market", "Treating workers differently in pay or promotion because of a characteristic, such as sex, that is unrelated to their ability.");
  b.card("CONCEPT", "Bases of wage differentials", "Demand and supply; skills and training; risk; prestige; bargaining strength; discrimination; government policy; culture.");
  b.card("CONCEPT", "Why do skilled workers earn more?", "Training limits supply and raises productivity (and so demand), giving a higher equilibrium wage.");
  b.card("CONCEPT", "Why may private-sector pay differ from public-sector pay?", "Private firms compete for scarce skills and pay from profit; public pay follows budget-limited scales but offers more security and pensions.", null, { applies: CAM });
  b.card("FACT", "Why can a high-prestige job pay modestly?", "Prestige attracts many applicants, increasing supply and holding the wage down.");
  b.card("FORMULA", "Gender pay gap (%)", "(men's average pay − women's average pay) ÷ men's average pay × 100.");
  b.card("CONCEPT", "Why may a gender pay gap remain after equal pay laws?", "Women may be concentrated in lower-paid jobs or grades, work fewer hours, or take career breaks; the law covers only unequal pay for the same work.");
});
