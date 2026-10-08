// W2b: econ.labour.occupation-choice — types of workers, employees' interests, wage and non-wage factors.
import { concept, P, table, sum, money, check, ZIM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.labour.occupation-choice", { file: "labour/occupation-choice", keyPrefix: "labour.occupation-choice" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", applies: ZIM,
    stem: "Which worker is best described as **skilled**?",
    options: [
      ["An accountant with a professional qualification", "Correct: long formal training and a recognised qualification."],
      ["A general hand who loads lorries at a depot", "Loading needs no formal training: unskilled."],
      ["A shop assistant who learned the till in a week", "Some training on the job: semi-skilled."],
      ["A cleaner at an office block in Harare", "Cleaning needs little training: unskilled."],
    ],
    answer: "A",
    explanation: "Skilled workers have long training and recognised qualifications (accountants, engineers, doctors). Semi-skilled workers have some training; unskilled workers need almost none.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **non-wage** factor in choosing an occupation?",
    options: [
      ["Job security", "Correct: security is not a money payment for work done."],
      ["Overtime pay", "Overtime is a money reward: a wage factor."],
      ["A sales commission", "Commission is part of pay: a wage factor."],
      ["An annual bonus", "A bonus is a money payment: a wage factor."],
    ],
    answer: "A",
    explanation: "Wage factors are money payments (basic pay, overtime, bonuses, commission). Non-wage factors include security, conditions, hours, holidays, status and promotion prospects.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Chipo leaves a job paying US\\$600 a month for one paying US\\$520 a month. Which reason best explains her choice?",
    options: [
      ["The new job has a pension, medical aid and regular hours", "Correct: non-wage factors can outweigh a lower wage."],
      ["The new job pays a higher basic wage than the old one", "It pays US\\$80 less a month."],
      ["Workers always choose the job with the higher wage", "Many workers accept lower pay for better conditions."],
      ["The old job had shorter hours and longer holidays", "These would be reasons to stay, not to leave."],
    ],
    answer: "A",
    explanation: "People compare whole packages: benefits such as a pension and medical aid, and better hours, can make a lower-paid job more attractive.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", applies: ZIM,
    stem: "A mine supplies helmets, boots and safety training to all its workers. Which employees' interest does this meet?",
    options: [
      ["Health and safety at work", "Correct: protective equipment and training reduce the risk of injury."],
      ["Fair wages that keep up with prices", "Safety equipment is not a wage."],
      ["Job security and protection from dismissal", "Security is about keeping the job, not protection from injury."],
      ["Promotion to more senior posts", "Safety training is not a promotion."],
    ],
    answer: "A",
    explanation: "Employees' interests include wages, job security, health and safety, and fringe benefits. Protective clothing and training serve health and safety.",
  });
  // Package comparison (different figures from the lesson).
  const J1 = { basic: 480, housing: 0, transport: 40, medical: 35 };
  const J2 = { basic: 430, housing: 110, transport: 0, medical: 0 };
  const t1 = sum(Object.values(J1)), t2 = sum(Object.values(J2));
  check("t1", t1, 555);
  check("t2", t2, 540);
  const pkg = table(["Item (per month)", "Job X (US\\$)", "Job Y (US\\$)"], [["Basic wage", J1.basic, J2.basic], ["Free accommodation (value)", J1.housing, J2.housing], ["Transport allowance", J1.transport, J2.transport], ["Medical aid paid by employer", J1.medical, J2.medical]]);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: t2, daily: true,
    stem: `Thandeka compares two job offers.\n\n${pkg}\n\nWhat is the total monthly value of the package for **Job Y**?`,
    wrong: [J2.basic, t1],
    explanation: `Job Y: basic wage US\\$${J2.basic} + accommodation worth US\\$${J2.housing} = **${money(t2)}**. Taking only the basic wage (US\\$${J2.basic}) ignores the fringe benefit.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: (585 - 550) * 12,
    stem: "Chipo compares two job offers. Job P pays a basic wage of US\\$510 a month, a transport allowance of US\\$45 a month and medical aid worth US\\$30 a month. Job Q pays a basic wage of US\\$455 a month and provides free accommodation worth US\\$95 a month. Calculate by how much the **yearly** value of Job P's package exceeds Job Q's.",
    wrong: [(510 - 455) * 12, 585 - 550],
    hints: ["Total each package first.", "Then multiply the monthly difference by 12."],
    explanation: `1. Job P: 510 + 45 + 30 = US\\$585 a month.\n2. Job Q: 455 + 95 = US\\$550 a month.\n3. Monthly difference: 585 − 550 = US\\$35.\n4. Yearly difference: 35 × 12 = **${money(420)}**.\n5. Comparing only basic wages gives ${money(660)}, which ignores the benefits; US\\$35 is the monthly, not the yearly, gap.`,
  });
  const ot = 40 * 3.5 + 8 * 3.5 * 2;
  check("ot", ot, 196);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: ot,
    stem: "Sipho is paid US\\$3.50 an hour for a 40-hour week, and double time for overtime. Last week he worked 8 hours of overtime. Calculate his pay for the week.",
    wrong: [48 * 3.5, 40 * 3.5 + 8 * 3.5 * 1.5],
    hints: ["Double time means twice the basic hourly rate."],
    explanation: `1. Basic pay: 40 × 3.50 = US\\$140.\n2. Overtime rate: 3.50 × 2 = US\\$7 an hour.\n3. Overtime pay: 8 × 7 = US\\$56.\n4. Total: 140 + 56 = **${money(ot)}**.\n5. ${money(48 * 3.5)} pays the overtime at the basic rate; ${money(40 * 3.5 + 8 * 5.25)} uses time and a half instead of double time.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Free housing provided by an employer is an example of a fringe benefit.",
    answer: true,
    explanation: "True. Fringe benefits are rewards in addition to the wage, such as housing, transport, medical aid and pension contributions.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A dangerous occupation usually has to pay a lower wage than a safe one to attract the same number of workers.",
    answer: false,
    explanation: "False. Danger is an unattractive non-wage factor, so fewer people offer to do the work; employers must pay a **higher** wage to attract workers.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Match each worker with the type of worker.",
    pairs: [["A civil engineer", "Skilled"], ["A forklift operator trained for two weeks", "Semi-skilled"], ["A general hand sweeping a market", "Unskilled"]],
    explanation: "Long formal training and qualifications: skilled. Some training to operate equipment: semi-skilled. Little or no training: unskilled.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature of a job with the type of factor.",
    right: ["Wage factor", "Non-wage factor"],
    pairs: ["Commission on each sale", "Thirty days of paid leave a year", "Overtime at time and a half", "Chances of promotion", "Pleasant, safe working conditions"],
    rightIndex: [0, 1, 0, 1, 1],
    explanation: "Money payments for work (commission, overtime) are wage factors; leave, promotion chances and conditions are non-wage factors.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Jobs that need long training are done by {{blank:a}} workers. Because few people can do them, the supply of labour is {{blank:b}} and the wage tends to be {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["skilled"], choices: ["skilled", "unskilled"] },
      { id: "b", accepted: ["low"], choices: ["low", "high"] },
      { id: "c", accepted: ["high"], choices: ["high", "low"] },
    ],
    wrong: [["unskilled", "high", "low"]],
    explanation: "Long training limits entry, so the supply of skilled workers is low and their wages are high.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Many young people in a fictional country choose to train as accountants even though trainees earn very little for three years. Which reason best explains this?",
    options: [
      ["Expected future earnings after qualifying are high", "Correct: people weigh future income, not only today's pay."],
      ["Trainee accountants receive large overtime payments", "Trainees are poorly paid; overtime is not the reason."],
      ["Accountancy has no entry qualifications", "It needs long training and examinations."],
      ["Low trainee pay increases the supply of accountants", "Low pay discourages people; it is not a reason to choose the job."],
    ],
    answer: "A",
    hints: ["Think about earnings over a whole career."],
    explanation: "Future earnings are a wage factor: qualified accountants earn much more, so the low pay during training is an investment.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A hospital in Hwange struggles to recruit doctors although it pays the same salary as hospitals in Harare. Which change is most likely to attract more doctors?",
    options: [
      ["Providing free housing and paying for doctors' children's schooling", "Correct: fringe benefits offset the drawbacks of a remote location."],
      ["Reducing the number of doctors' posts at the hospital", "Fewer posts do not attract more applicants."],
      ["Paying doctors the same salary but in smaller weekly amounts", "The total pay does not change."],
      ["Asking doctors to work more night shifts in the hospital", "Unsocial hours make the job less attractive."],
    ],
    answer: "A",
    hints: ["The salary is the same: what else can make the job more attractive?"],
    explanation: "Location is a non-wage factor that puts some doctors off; fringe benefits such as housing and school fees make the package more attractive without changing the basic salary.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** non-wage factors that might lead a person to choose to become a teacher rather than a better-paid sales representative.",
    points: [
      "Identifies a non-wage factor (for example long holidays / job security / pension).",
      "Explains why it attracts the person (time with family, security for the future).",
      "Identifies a second non-wage factor (for example job satisfaction / status / regular hours).",
      "Explains it (rewarding work helping children; no pressure of sales targets).",
    ],
    modelAnswer: "First, teaching has long school holidays and regular hours, so a teacher has more time for family than a sales representative who travels and works late to meet targets. Second, teaching is secure, with a permanent post and a pension, while a sales representative's income depends on commission and can fall. Many people also find teaching satisfying and respected.",
    hints: ["Identify each factor, then say why it makes teaching attractive."],
    explanation: "One mark for each non-wage factor and one for explaining why it makes teaching more attractive than the higher pay of sales.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4, applies: ZIM,
    stem: "List **four** interests of employees in employment.",
    points: ["Fair wages / regular pay rises.", "Job security.", "Health and safety at work.", "Fringe benefits (housing, transport, medical aid, pension) / training and promotion."],
    modelAnswer: "Fair wages that rise with the cost of living; job security; safe and healthy working conditions; fringe benefits such as medical aid and a pension.",
    explanation: "Any four of: wages, security, health and safety, fringe benefits, training and promotion, reasonable hours.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 12,
    stem: "Tatenda, aged 19, has two offers. A mining company near Zvishavane offers US\\$650 a month for underground work, with free meals. A bank in Mutare offers a trainee post at US\\$420 a month, with medical aid worth US\\$40 a month, study leave and training for a banking qualification. His parents live in Mutare.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 650 - (420 + 40), stem: "Ignoring the free meals, calculate how much more per month the mine's package is worth than the bank's.", wrong: [650 - 420], explanation: `Mine US\\$650; bank 420 + 40 = US\\$460; difference ${money(650 - 420 - 40)}.` }),
      P.short({
        label: "(b)", marks: 1,
        stem: "State **one** non-wage factor that makes the mining job less attractive.",
        keywords: { any: ["danger", "dangerous", "risk", "unsafe", "safety", "injury", "accident", "underground", "conditions", "health", "far from family", "away from"], minAny: 1 },
        model: "It is dangerous underground work.",
        wrong: ["The wage is US\\$650."],
        explanation: "Credit: danger or risk of injury, unpleasant underground conditions, living away from family.",
      }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the bank can attract trainees while paying a lower wage.", points: ["Training leads to a qualification and higher future earnings.", "Banking is safer / has better conditions and status than underground work.", "Medical aid and study leave are fringe benefits that add to the package / living with family saves costs."], modelAnswer: "The bank offers training towards a banking qualification, so trainees expect much higher earnings later. The work is safe and respected compared with underground mining, and medical aid and study leave add value. Living at home in Mutare also saves on rent." }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Discuss which job Tatenda should choose.",
        points: [
          "Mine: higher pay now (US\\$190 more a month) plus free meals; can help his family and save.",
          "Mine: risks: dangerous work, health effects, living away from family, mining jobs may depend on mineral prices.",
          "Bank: lower pay now but training, a qualification and promotion lead to higher future earnings.",
          "Bank: safer conditions, status, near family (saves rent), medical aid.",
          "Considers his circumstances (whether his family needs income now, his abilities and attitude to risk).",
          "Justified conclusion.",
        ],
        hints: ["Compare now with the future, and money with conditions."],
        modelAnswer: "The mine pays US\\$190 a month more than the bank package and gives free meals, so if Tatenda's family needs income now it is attractive. However, underground work is dangerous and may damage his health, he would live away from his family and pay for accommodation, and mining jobs can be lost when mineral prices fall. The bank pays less now, but it offers training and a qualification, so his earnings should rise well above the mine's in a few years; the work is safe and respected, he can live with his parents, and he has medical aid. Unless his family needs the extra money urgently, the bank is the better choice because of its long-run earnings, security and safety.",
      }),
    ],
    explanation: "(a) US\\$190. (b) Danger. (c) Future earnings and better non-wage factors. (d) Weigh present pay against safety, training and future earnings.",
    hints: ["Add the value of fringe benefits to the bank's wage."],
  });

  // Structured 2: three posts for a qualified nurse (fictional).
  const N = [
    { name: "Private clinic, Harare", basic: 610, housing: 0, other: 50 },
    { name: "Mission hospital, rural district", basic: 470, housing: 130, other: 40 },
    { name: "Government hospital, Masvingo", basic: 520, housing: 60, other: 30 },
  ].map((x) => ({ ...x, total: x.basic + x.housing + x.other }));
  const best = N.reduce((a, x) => (x.total > a.total ? x : a));
  check("best", best.total, 660);
  const tN = table(["Post", "Basic wage (US\\$ a month)", "Housing provided (value, US\\$)", "Other allowances (US\\$)"], N.map((x) => [x.name, x.basic, x.housing, x.other]));
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: `A newly qualified nurse is offered three posts.\n\n${tN}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: N[1].total, stem: "Calculate the total monthly value of the package at the mission hospital.", wrong: [N[1].basic], explanation: `${N[1].basic} + ${N[1].housing} + ${N[1].other} = ${money(N[1].total)}.` }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Which post offers the highest total package?",
        options: [
          ["Private clinic, Harare", `Total ${money(N[0].total)}.`],
          ["Mission hospital, rural district", `Total ${money(N[1].total)}.`],
          ["Government hospital, Masvingo", `Total ${money(N[2].total)}.`],
          ["All three packages are equal in value", "The totals differ."],
        ],
        answer: ["A", "B", "C"][N.indexOf(best)],
        explanation: `Totals: ${N.map((x) => `${x.name} ${money(x.total)}`).join("; ")}.`,
      }),
      P.short({
        label: "(c)", marks: 1,
        stem: "The private clinic pays the highest basic wage. Name the type of reward that makes the mission hospital's package close to the clinic's.",
        accepted: ["fringe benefits", "fringe benefit", "housing", "free housing", "benefits in kind"],
        model: "fringe benefits",
        wrong: ["overtime"],
        explanation: "Free housing and allowances are fringe benefits.",
      }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain **two** non-wage factors, other than housing, that the nurse might consider before choosing a post.", points: ["Identifies a factor (for example job security / pension in a government post).", "Explains how it affects the choice.", "Identifies a second factor (for example location near family / training and promotion / workload and hours).", "Explains how it affects the choice."], modelAnswer: "Job security: a government post is permanent and carries a pension, which gives security for the future, while a private clinic may close or cut staff. Training and promotion: a large hospital may offer specialist training that leads to higher pay later. The nurse may also prefer a post near her family." }),
    ],
    explanation: "Add all parts of each package before comparing; then weigh non-wage factors such as security, training and location.",
    hints: ["Total = basic wage + value of housing + other allowances."],
  });

  b.card("DEFINITION", "Labour", "Human effort, physical and mental, used to produce goods and services; its reward is a wage or salary.");
  b.card("DEFINITION", "Fringe benefits", "Rewards in addition to the wage, such as housing, transport, medical aid, a pension or a company car.");
  b.card("DEFINITION", "Wage factors", "Money rewards of a job: basic pay, overtime, bonuses, commission and expected future earnings.");
  b.card("DEFINITION", "Non-wage factors", "Features of a job other than pay: conditions, hours, holidays, security, fringe benefits, training, promotion, status, location, job satisfaction.");
  b.card("CONCEPT", "Skilled, semi-skilled and unskilled workers", "Skilled: long training and qualifications (engineer). Semi-skilled: some training (machine operator, driver). Unskilled: little or no training (general hand).", null, { applies: ZIM });
  b.card("CONCEPT", "Four employees' interests in employment", "Fair wages; job security; health and safety; fringe benefits (also training and promotion).", null, { applies: ZIM });
  b.card("CONCEPT", "Why might someone accept a lower-paid job?", "Better non-wage factors: security, pension, safety, regular hours, training, status or being near family.");
  b.card("FACT", "What happens to the wage in a job with dangerous conditions?", "It tends to be higher: fewer people offer to do the work, so employers must pay more to attract workers.");
  b.card("FORMULA", "Overtime pay", "Overtime pay = overtime hours × basic hourly rate × the overtime multiple (1.5 for time and a half, 2 for double time).");
});
