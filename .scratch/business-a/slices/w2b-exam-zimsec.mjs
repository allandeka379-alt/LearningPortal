// W2b exam-format items: ZIMSEC data response (25), case study (30) and essays (25)
import { concept, P, EXAM, checkExam, ZIM, ZBS, ZBE, table, money, chk, r2, hr } from "../lib.mjs";

const LV10 = [[1, 1, 3, "Limited, mostly generic description with little accurate detail"], [2, 4, 7, "Several accurate features described, some with development or an example"], [3, 8, 10, "Wide, accurate and well-developed description of the topic with relevant examples"]];
const LV15 = [[1, 1, 5, "Mostly description or assertion; one side only; no judgement"], [2, 6, 10, "Both sides developed, some application to the situation; judgement stated but weakly supported"], [3, 11, 15, "Balanced, well-developed arguments applied to the situation and a justified judgement that depends on stated conditions"]];
const LV8 = [[1, 1, 3, "Limited analysis; points stated with little application"], [2, 4, 6, "Points developed and applied to the case; judgement stated but weakly supported"], [3, 7, 8, "Balanced, applied analysis and a justified recommendation that considers a condition or limitation"]];

concept("abus.hrm.performance-mbo", { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec" }, (b) => {
  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: ZIM_DATA25 (Business Studies): staff turnover, absence and management style at a packaging firm
  {
    const emp = 80, days = 220;
    const y = [
      { leavers: 12, lost: 880, units: 960000, faulty: 19200 },
      { leavers: 24, lost: 1408, units: 912000, faulty: 27360 },
    ];
    const lt1 = hr.labourTurnover(y[0].leavers, emp);
    const lt2 = hr.labourTurnover(y[1].leavers, emp);
    const abs2 = (y[1].lost / (emp * days)) * 100;
    const perEmp2 = y[1].units / emp;
    chk(lt1, 15); chk(lt2, 30); chk(abs2, 8); chk(perEmp2, 11400);
    chk((y[0].faulty / y[0].units) * 100, 2); chk((y[1].faulty / y[1].units) * 100, 3);
    const survey = [["No recognition for good work", 14], ["No say in decisions", 12], ["Low pay", 6], ["Working hours", 5], ["Other reasons", 3]];
    const nLeavers = survey.reduce((s, r) => s + r[1], 0);
    chk(nLeavers, 40);
    const recog = (14 / nLeavers) * 100;
    chk(recog, 35);
    b.struct({
      examStyle: true, d: 4, skill: EXAM.ZIM_DATA25.skill, secs: EXAM.ZIM_DATA25.secs, calculator: true, applies: ZBS, paper: "ZIMSEC BS Paper 2 section A",
      concepts: ["abus.hrm.performance-mbo", "abus.motivation.needs-maslow-herzberg", "abus.management.styles-mcgregor"],
      stem: `Mbira Packaging (Pvt) Ltd is a fictional firm in Gweru that packs goods for supermarkets. It employs ${emp} people and the working year has ${days} days. At the start of Year 2 a new production manager replaced a manager who used to ask workers for ideas. The new manager gives orders without discussion, checks every worker closely and does not give feedback on their work. Pay and hours did not change.\n\n` +
        table(["Item", "Year 1", "Year 2"], [["Average number of employees", emp, emp], ["Employees who left", y[0].leavers, y[1].leavers], ["Days lost through absence", y[0].lost, y[1].lost], ["Units packed", y[0].units, y[1].units], ["Faulty units", y[0].faulty, y[1].faulty]]) +
        `\n\nIn Year 2 the company asked the ${nLeavers} employees who left for their main reason for leaving.\n\n` +
        table(["Main reason for leaving", "Number of leavers"], survey.map(([r, n]) => [r, n]), ["l", "r"]),
      parts: checkExam(EXAM.ZIM_DATA25, [
        P.group({
          label: "(a)", stem: "Performance measures",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: lt1, stem: "Calculate labour turnover for Year 1 (employees who left ÷ average number of employees × 100), to one decimal place.", wrong: [y[0].leavers, r2((emp / y[0].leavers) * 100)], explanation: `${y[0].leavers} ÷ ${emp} × 100 = ${lt1.toFixed(1)}%.` }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: lt2, stem: "Calculate labour turnover for Year 2, to one decimal place.", wrong: [y[1].leavers, r2((y[1].leavers / y[0].leavers) * 100)], explanation: `${y[1].leavers} ÷ ${emp} × 100 = ${lt2.toFixed(1)}%.` }),
            P.num({ label: "(iii)", marks: 2, kind: "pct", value: abs2, stem: `Calculate the absenteeism rate for Year 2: days lost ÷ (employees × ${days} days) × 100, to one decimal place.`, wrong: [r2((y[1].lost / days) * 100), r2((y[1].lost / emp) * 100)], explanation: `Days available = ${emp} × ${days} = ${emp * days}. ${y[1].lost} ÷ ${emp * days} × 100 = ${abs2.toFixed(1)}%.` }),
            P.num({ label: "(iv)", marks: 2, kind: "plain", unit: "units", value: perEmp2, stem: "Calculate the number of units packed per employee in Year 2.", wrong: [y[0].units / emp, r2(y[1].units / days)], explanation: `${y[1].units.toLocaleString("en-GB")} ÷ ${emp} = ${perEmp2.toLocaleString("en-GB")} units per employee.` }),
          ],
        }),
        P.group({
          label: "(b)", stem: "Reasons for leaving",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: recog, stem: "Calculate the percentage of leavers whose main reason was no recognition for good work, to one decimal place.", wrong: [14, r2((14 / 60) * 100)], explanation: `14 ÷ ${nLeavers} × 100 = ${recog.toFixed(1)}%.` }),
            P.mcq({ label: "(ii)", marks: 1, stem: "In Herzberg's theory, recognition for good work is a", options: [["Motivator", "Correct: recognition is a motivator."], ["Hygiene factor", "Hygiene factors include pay, conditions and policy."], ["Physiological need", "This is a Maslow level, not part of Herzberg's theory."], ["Piece rate", "Piece rate is a method of payment."]], answer: "A", explanation: "Recognition, achievement and responsibility are motivators." }),
            P.mcq({ label: "(iii)", marks: 1, stem: "The new manager's way of managing is best described as", options: [["Autocratic", "Correct: orders without discussion."], ["Laissez-faire", "Workers are closely checked, not left alone."], ["Participative", "Workers take no part in decisions."], ["Paternalistic", "There is no sign of care for the workers' welfare."]], answer: "A", explanation: "Orders without discussion and close checking are autocratic." }),
          ],
        }),
        P.manual({
          label: "(c)", marks: 6, stem: "Analyse how the new manager's approach may have affected the performance of Mbira Packaging.",
          points: ["Workers receive no feedback or recognition, so their motivation falls", "Application: recognition was the most common reason for leaving (35.0%)", "Close checking and no say suggest Theory X, so workers feel distrusted", "Labour turnover doubled from 15.0% to 30.0%, so recruitment and training costs rise", "Absence rose and output per employee fell, so costs per unit rise", "Faulty units rose from 2.0% to 3.0% of output, so waste increases and customers may be lost"],
          modelAnswer: "Workers receive no feedback or recognition, so their motivation falls; no recognition was the most common reason for leaving (35.0% of leavers). Close checking and no say in decisions suggest the manager holds Theory X views, so workers feel distrusted. Labour turnover doubled from 15.0% to 30.0%, so the cost of recruiting and training replacements rises. Absence rose and output fell, which raises costs per unit, and faulty units rose from 2.0% to 3.0% of output, so waste increases and customers may be lost.",
          explanation: "One mark for each point, applied to the data.",
        }),
        P.manual({
          label: "(d)", marks: 7, stem: "Advise the directors whether they should replace the production manager or introduce management by objectives (MBO) under the same manager. Justify your answer.",
          points: ["Replace: the problems began when the manager changed, so style is a likely cause", "Replace: a manager who consults and gives recognition could restore morale", "Replace: costs of recruiting a manager and the risk of a second poor choice", "MBO: agreed targets for attendance and quality give clear aims and feedback", "MBO: it may not work if the manager still gives orders without discussion", "Training the existing manager in leadership could be a cheaper alternative", "Judgement with a reason, e.g. introduce MBO with training and review after six months before deciding to replace"],
          modelAnswer: "The problems began when the manager changed, so style is a likely cause, and a manager who consults and gives recognition could restore morale. But replacing the manager costs money and the new choice might also be poor. MBO would give agreed targets for attendance and quality and regular feedback, but it would not work if the manager still gives orders without discussion. A cheaper alternative is to train the existing manager. On balance the directors should introduce MBO with leadership training for the manager and review results after six months, replacing the manager only if turnover and faults do not improve.",
          explanation: "One mark for each point; the judgement needs a reason.",
        }),
      ]),
      hints: ["Use the formulas given in each part.", "Link the changes between Year 1 and Year 2 to the new manager's style."],
      explanation: "Labour turnover 15.0% to 30.0%; absenteeism 8.0%; 11,400 units per employee; recognition 35.0% of leavers; autocratic style.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: ZIM_CASE30: Nyathi Hardware: structure, calculations, motivation, communication
  {
    const shops = [["Gweru", 126000, 11, 2], ["Kwekwe", 99000, 11, 3], ["Shurugwi", 66000, 11, 4]];
    const totalSales = shops.reduce((s, r) => s + r[1], 0);
    const totalStaff = shops.reduce((s, r) => s + r[2], 0);
    const totalLeavers = shops.reduce((s, r) => s + r[3], 0);
    chk(totalSales, 291000); chk(totalStaff, 33); chk(totalLeavers, 9);
    const lt = hr.labourTurnover(totalLeavers, totalStaff);
    const kwekweSpe = shops[1][1] / shops[1][2];
    const shurLt = hr.labourTurnover(shops[2][3], shops[2][2]);
    const gweruShare = (shops[0][1] / totalSales) * 100;
    chk(lt, 27.2727, 0.001); chk(kwekweSpe, 9000); chk(shurLt, 36.3636, 0.001); chk(gweruShare, 43.299, 0.001);
    b.struct({
      examStyle: true, d: 4, skill: EXAM.ZIM_CASE30.skill, secs: EXAM.ZIM_CASE30.secs, calculator: true, applies: ZIM, paper: "ZIMSEC Paper 1 section B",
      concepts: ["abus.organisation.structure-features", "abus.organisation.centralisation-line-staff", "abus.motivation.needs-maslow-herzberg", "abus.communication.purposes-methods"],
      stem: `Nyathi Hardware (Pvt) Ltd is a fictional business with a head office in Gweru and three shops (Gweru, Kwekwe and Shurugwi). Head office has the managing director (MD), a finance manager and a purchasing manager. Each shop has one shop manager, two counter supervisors and eight sales assistants, and every sales assistant reports to a supervisor.\n\nThe MD approves every purchase order and every change of price. She sends instructions to the shop managers as written memos, which are often delivered two or three days after they were written. Shop managers say that they receive no information on how their shop is doing compared with the others. Sales assistants say that their wages are the highest in the town but that the work is repetitive and nobody tells them how well they are doing.\n\nLast year a customer in Kwekwe was lost because the shop manager could not agree a discount on a bulk order without telephoning head office, and the answer took three days. During the year some employees left. The figures for the three shops are below (each shop's staff are the shop manager, two supervisors and eight assistants).\n\n` +
        table(["Shop", "Sales (US\\$)", "Shop staff", "Employees who left"], shops.map(([n, s, e, l]) => [n, s, e, l])) +
        `\n\nIn this question use the number of shop staff as the average number of employees.`,
      parts: checkExam(EXAM.ZIM_CASE30, [
        P.group({
          label: "(a)", stem: "Organisation",
          parts: [
            P.mcq({ label: "(i)", marks: 1, stem: "The MD approving every purchase order and price change is an example of", options: [["Centralisation", "Correct: decisions are taken at the top."], ["Decentralisation", "Decisions would be passed down in that case."], ["Informal organisation", "The arrangement is formal."], ["Delegation to supervisors", "No authority is passed down."]], answer: "A", explanation: "Keeping all decisions at the top is centralisation." }),
            P.num({ label: "(ii)", marks: 1, kind: "plain", unit: "supervisors", value: 2, wrong: [8, 3], stem: "State the span of control of each shop manager.", explanation: "Two counter supervisors report directly to each shop manager." }),
            P.num({ label: "(iii)", marks: 1, kind: "plain", unit: "levels", value: 4, wrong: [3, 5], stem: "State the number of levels of hierarchy from the MD to a sales assistant.", explanation: "MD, shop manager, counter supervisor, sales assistant: four levels." }),
          ],
        }),
        P.group({
          label: "(b)", stem: "Calculations",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: lt, stem: "Calculate labour turnover for the three shops together (employees who left ÷ average number of employees × 100), to one decimal place.", wrong: [totalLeavers, r2((totalStaff / totalLeavers) * 100)], explanation: `${totalLeavers} ÷ ${totalStaff} × 100 = ${lt.toFixed(1)}%.` }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: kwekweSpe, stem: "Calculate sales per employee at the Kwekwe shop.", wrong: [shops[1][1], r2(shops[1][1] / totalStaff)], explanation: `99,000 ÷ 11 = US\\$9,000.` }),
            P.num({ label: "(iii)", marks: 2, kind: "pct", value: shurLt, stem: "Calculate labour turnover at the Shurugwi shop, to one decimal place.", wrong: [4, r2((4 / totalStaff) * 100)], explanation: `4 ÷ 11 × 100 = ${shurLt.toFixed(1)}%.` }),
            P.num({ label: "(iv)", marks: 2, kind: "pct", value: gweruShare, stem: "Calculate the Gweru shop's share of the total sales of the three shops, to one decimal place.", wrong: [r2((shops[0][1] / shops[1][1]) * 100), 126], explanation: `126,000 ÷ 291,000 × 100 = ${gweruShare.toFixed(1)}%.` }),
            P.mcq({ label: "(v)", marks: 1, stem: "Which shop has the highest labour turnover?", options: [["Shurugwi", "Correct: 4 of 11 employees left."], ["Gweru", "Gweru lost only 2 of 11 employees."], ["Kwekwe", "Kwekwe lost 3 of 11 employees."], ["All three are equal", "The leavers were 2, 3 and 4."]], answer: "A", explanation: "Shurugwi lost 4 of 11 employees, more than the other shops." }),
          ],
        }),
        P.manual({
          label: "(c)", marks: 4, stem: "Explain **two** problems that centralisation causes for Nyathi Hardware.",
          points: ["Decisions are slow", "Development: the Kwekwe discount took three days, so a customer was lost", "Shop managers have little authority, so they are demotivated", "Development: managers who cannot decide may leave or stop using their own ideas"],
          modelAnswer: "Decisions are slow: the Kwekwe discount took three days, so a customer was lost. Shop managers also have little authority, so they are demotivated and may leave or stop using their own ideas.",
          explanation: "One mark for each problem and one for its development.",
        }),
        P.group({
          label: "(d)", stem: "Motivation",
          parts: [
            P.mcq({ label: "(i)", marks: 1, stem: "The complaint that the work is repetitive shows a lack of which type of factor in Herzberg's theory?", options: [["Motivators", "Correct: interesting work is a motivator."], ["Hygiene factors", "Wages, which are high, are a hygiene factor."], ["Safety needs", "Safety is a Maslow level, not part of this question."], ["Piece rates", "Piece rates are a payment method."]], answer: "A", explanation: "Interesting work and recognition are motivators." }),
            P.manual({ label: "(ii)", marks: 3, stem: "Explain why the highest wages in the town have not stopped employees from leaving.", points: ["Pay is a hygiene factor, which only prevents dissatisfaction", "Application: assistants find the work repetitive and receive no recognition, which are motivators", "Without motivators workers are not satisfied, so some leave despite high pay"], modelAnswer: "Pay is a hygiene factor, which only prevents dissatisfaction. The assistants find the work repetitive and are never told how they are doing, and interesting work and recognition are motivators. Without motivators workers are not satisfied, so some leave despite high pay.", explanation: "Hygiene factor, application, consequence." }),
          ],
        }),
        P.manual({
          label: "(e)", marks: 2, stem: "State **two** ways in which Nyathi Hardware could improve its communication with the shops.",
          points: ["Use telephone calls or electronic messages for urgent matters, instead of memos by post", "Send a weekly report comparing the results of the three shops to each shop manager"],
          modelAnswer: "The business could use telephone calls or electronic messages for urgent matters instead of memos delivered days later, and send each shop manager a weekly report comparing the three shops.",
          explanation: "One mark for each way.",
        }),
        P.manual({
          label: "(f)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8,
          stem: "Advise the MD whether she should decentralise decision making to the shop managers. Justify your answer.",
          points: ["Decentralising would give faster decisions at shop level", "Application: a manager could have agreed the Kwekwe discount at once", "Shop managers would be more motivated by responsibility", "Application: this could reduce turnover, which is highest at Shurugwi (36.4%)", "The MD would have time to plan and to monitor results", "Risk: shop managers may make poor decisions or give discounts that are too big", "Risk: prices and standards may differ between shops", "Judgement with a reason, e.g. decentralise within limits, with weekly reports"],
          modelAnswer: "Decentralising would give faster decisions at shop level: the Kwekwe manager could have agreed the discount at once and kept the customer. Shop managers would be more motivated by responsibility, which could help to reduce labour turnover, which was 36.4% at Shurugwi. The MD would also have time to plan and to monitor results. The risks are that managers make poor decisions or give discounts that are too large, and that prices and standards differ between shops. The MD should decentralise within limits, for example allowing discounts up to a set percentage and requiring a weekly report, because the present delays are costing customers.",
          explanation: "One mark for each point; the judgement needs a reason.",
        }),
      ]),
      hints: ["Count carefully from the description of each shop.", "Use the table for each calculation."],
      explanation: "Centralised; span 2; four levels; labour turnover 27.3%; Kwekwe US\\$9,000 per employee; Shurugwi 36.4%; Gweru 43.3%; decentralise within limits.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: ZIM_ESSAY25 (Business Studies): Taylor and Mayo
  b.struct({
    examStyle: true, d: 4, skill: EXAM.ZIM_ESSAY25.skill, secs: EXAM.ZIM_ESSAY25.secs, applies: ZBS, paper: "ZIMSEC BS Paper 2 section B",
    concepts: ["abus.motivation.scientific-human-relations"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.ZIM_ESSAY25, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV10,
        stem: "Describe the main ideas of Taylor's scientific management and of Mayo's human relations school.",
        points: ["Taylor believed there is one best way of doing each job", "It is found by time and motion study, which times each movement", "Jobs are broken into small specialised tasks", "Workers are paid by output, for example piece rate, because money is assumed to be the main motivator", "Managers plan the work and workers carry it out", "Mayo led the Hawthorne studies of workers' output", "These showed that attention from managers raised output even when conditions were made worse", "Workers have social needs and are influenced by informal groups", "Communication and consultation make workers feel valued", "Practical applications include teamwork, meetings and supportive supervision"],
        modelAnswer: "Taylor believed that there is one best way of doing each job, which can be found by time and motion study that times each movement. Jobs are broken into small specialised tasks, and managers plan the work while workers carry it out. Workers are paid by output, for example by piece rate, because Taylor assumed that money is the main motivator.\n\nMayo led the Hawthorne studies, which showed that output rose when managers paid attention to workers, even when conditions were made worse. He concluded that workers have social needs and are influenced by informal groups, and that communication and consultation make them feel valued. Practical applications include teamwork, regular meetings and supportive supervision.",
        explanation: "One mark for each accurate idea, developed.",
      }),
      P.manual({
        label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 650 }, levels: LV15,
        stem: "Discuss whether a manager of a modern business should use scientific management or the human relations approach.",
        points: ["Scientific management raises output in repetitive work through standard methods", "Piece rate gives a clear incentive to produce more", "Clear standards make supervision and costing easier", "Against: boring work lowers morale and quality and raises staff turnover", "Against: it assumes money is the only motivator and ignores social needs", "Human relations improves morale through teamwork and consultation", "Staff who feel valued are more committed and less likely to leave", "Workers' ideas improve methods and quality", "Against: it is slower and costly to consult and hold meetings", "Against: happy workers are not always productive; the Hawthorne studies had weaknesses", "Suitability depends on the work: repetitive production against service or creative work", "Suitability depends on workers: some prefer clear instructions and pay", "Most modern businesses combine the two", "Judgement: which approach, and under what conditions", "Reason for the judgement, e.g. cost, type of work and staff"],
        modelAnswer: "Scientific management can raise output in repetitive work, because standard methods and piece rates give a clear incentive, and clear standards make supervision and costing easy. But work becomes boring, which lowers morale and quality and raises staff turnover, and it assumes that money is the only motivator.\n\nThe human relations approach improves morale through teamwork and consultation. Staff who feel valued are more committed and less likely to leave, and workers' ideas can improve methods and quality. Against this, consultation is slow and costly, and happy workers are not always more productive.\n\nThe best approach depends on the work and the workers. In a repetitive production line such as packing, standards and incentives are useful; in a restaurant or a call centre, where service depends on attitude, human relations matters more. Most modern businesses combine the two. On balance a manager should use standard methods and an output bonus for repetitive tasks, but supplement them with teamwork and consultation to protect quality and morale, because purely scientific management risks high turnover.",
        explanation: "Level descriptors apply: both sides, application to types of business and a justified judgement.",
      }),
    ]),
    hints: ["Describe each school in (a); in (b) weigh them for different kinds of work."],
    explanation: "(a) Taylor and Mayo described; (b) a justified choice or combination depending on the type of work.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 4: ZIM_ESSAY25 (Business Enterprise Skills): organisation structure and decentralisation
  b.struct({
    examStyle: true, d: 4, skill: EXAM.ZIM_ESSAY25.skill, secs: EXAM.ZIM_ESSAY25.secs, applies: ZBE, paper: "ZIMSEC BES Paper 2",
    concepts: ["abus.organisation.structure-features", "abus.organisation.centralisation-line-staff"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.ZIM_ESSAY25, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV10,
        stem: "Describe the main features of a formal organisational structure.",
        points: ["A formal structure shows jobs, authority and reporting lines", "It is shown on an organisational chart", "Levels of hierarchy are the layers from the top to the bottom", "The chain of command is the line along which orders pass down and reports pass up", "Span of control is the number of subordinates reporting to a manager", "Wide spans mean fewer levels (flat) and narrow spans mean more levels (tall)", "Authority is the right to give orders and make decisions", "Responsibility is the duty to complete tasks and answer for results", "Authority should match responsibility", "Each employee should have one direct boss (unity of command)"],
        modelAnswer: "A formal structure shows the jobs in a business, who has authority and who reports to whom, and it is usually drawn as an organisational chart. The levels of hierarchy are the layers from top to bottom. The chain of command is the line along which orders pass down and reports pass up.\n\nThe span of control is the number of subordinates who report directly to a manager. Wide spans mean fewer levels and a flat structure, while narrow spans mean more levels and a tall structure. Authority is the right to give orders and make decisions, and responsibility is the duty to complete tasks and answer for results. Authority should match responsibility, and each employee should have one direct boss so that instructions do not conflict.",
        explanation: "One mark for each accurate feature, developed.",
      }),
      P.manual({
        label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 650 }, levels: LV15,
        stem: "Discuss whether a growing business with several branches should decentralise decision making.",
        points: ["Decisions are made faster at branch level", "Managers close to customers use local knowledge, e.g. local prices and stock", "Branch managers are motivated by responsibility and are more likely to stay", "Senior managers are freed from detail and have time for planning", "Decentralisation develops future managers", "Against: branch managers may make poor decisions or lack skills", "Against: prices, quality and standards may differ between branches", "Against: head office finds it harder to control costs and detect problems", "Against: training and reporting add cost", "Centralise finance, branding and standards; decentralise local matters", "Control through budgets, limits and regular reports", "Depends on size, spread, skills of managers and risk of the decision", "A small business with one site may not need to decentralise", "Judgement: decentralise or not, and how far", "Reason for the judgement, e.g. condition of training and reporting"],
        modelAnswer: "Decentralisation means decisions are made faster at branch level, and managers close to customers use local knowledge, for example in setting local prices or deciding stock. Branch managers are motivated by responsibility and more likely to stay, senior managers are freed from detail to plan, and future managers are developed.\n\nAgainst this, branch managers may make poor decisions or lack skills, prices and standards may differ between branches, and head office finds it harder to control costs and detect problems. Training and reporting add cost.\n\nMost businesses centralise finance, branding and standards, and decentralise local matters, controlling them with budgets, limits and regular reports. The balance depends on the size and spread of the business, the skills of the managers and the risk of the decision. A small business with one site may not need to decentralise. On balance a growing business with several branches should decentralise day-to-day decisions within limits, because delays and low motivation cost more than the risk of errors, provided that managers are trained and results are reported.",
        explanation: "Level descriptors apply: both sides, application to a growing business and a justified judgement.",
      }),
    ]),
    hints: ["Describe each feature in (a); in (b) give both sides and a conditional judgement."],
    explanation: "(a) features of a formal structure; (b) decentralisation weighed with control and a conditional judgement.",
  });
});
