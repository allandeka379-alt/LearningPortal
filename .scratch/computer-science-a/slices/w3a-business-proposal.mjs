// Slice w3a: acs.enterprise.business-proposal (ZIMSEC only, Form 5). Money in US dollars; calculators are allowed.
import { concept, P, chk, round, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";

const D = "US\\$";
// A printing and photocopying shop
const startup = [["Photocopier", 1350], ["Computer and printer", 520], ["Furniture", 280], ["Licence and registration", 140], ["Launch advertising", 130]];
const startTotal = startup.reduce((a, [, c]) => a + c, 0);
chk(startTotal, 2420);
const startMd = mdTable(["Start-up cost", "Amount (US\\$)"], startup);
const pages = 2600;
const perPage = 0.1;
const jobs = 40;
const perJob = 4;
const revenue = round(pages * perPage + jobs * perJob, 2);
chk(revenue, 420);
const costs = 90 + 45 + 120;
chk(costs, 255);
const profit = revenue - costs;
chk(profit, 165);
const payback = round(startTotal / profit, 1);
chk(payback, 14.7, 1e-6);
const annual = profit * 12;
chk(annual, 1980);
const roi = round((annual / startTotal) * 100, 0);
chk(roi, 82);
// A training centre
const trainStart = 1800;
const trainProfit = 150;
chk(trainStart / trainProfit, 12);
chk((trainProfit * 12 / trainStart) * 100, 100);
// Another shop: start-up 3000, profit 125 -> 24 months, ROI 50%
chk(3000 / 125, 24);
chk(((125 * 12) / 3000) * 100, 50);

concept("acs.enterprise.business-proposal", { file: "enterprise/business-proposal", keyPrefix: "enterprise.business-proposal" }, (b) => {
  mc(b, 1, "RECALL", "Which part of a business proposal sums up the whole plan on one page?",
    ["The executive summary", "Correct."],
    [["The risk analysis", "The risk analysis lists what could go wrong."], ["The staffing plan", "The staffing plan says who does what."], ["The start-up cost table", "The table is only part of the finance section."]],
    "The executive summary is a short version of the whole proposal.");
  mc(b, 2, "UNDERSTANDING", "What is the purpose of the market section of a business proposal?",
    ["To show who the customers are, how many there are and who competes for them", "Correct."],
    [["To list the staff and their pay", "That is the staffing section."], ["To give the monthly profit", "That is part of the finance section."], ["To describe how the equipment is repaired and how the spare parts are ordered", "That belongs to operations."]],
    "The market section shows that customers exist.", { daily: true });
  mc(b, 2, "RECALL", "What does the payback period measure?",
    ["The time it takes for profits to repay the money invested to start the business", "Correct."],
    [["The time that a customer takes to pay an invoice after receiving all of the goods ordered", "That is credit period."], ["The total revenue in a year", "Payback uses profit, not revenue."], ["The time to repair a device", "That is not a financial measure."]],
    "Payback period = start-up cost ÷ profit per period.", { daily: true });
  mc(b, 2, "APPLICATION", "Which of these is a start-up cost for a computer repair shop?",
    ["Buying test equipment before opening", "Correct: it is a one-off cost before opening."],
    [["Paying monthly rent", "Rent recurs every month."], ["Paying an assistant each month for their work", "Wages recur every month."], ["Buying electricity each month", "Electricity recurs every month."]],
    "Start-up costs are spent once, at the beginning.", { daily: true });
  mc(b, 3, "ANALYSIS", "A proposal states the expected monthly revenue but no costs. Why is this a weakness?",
    ["Revenue alone does not show whether the business makes a profit", "Correct."],
    [["Revenue is never important", "Revenue matters but is not the whole story."], ["Costs are decided by the bank", "The owner must estimate costs."], ["Customers do not pay for services, so costs are not important to a business", "They do pay."]],
    "Profit = revenue − costs.", { hints: ["What is left after costs are paid?"] });
  mc(b, 3, "APPLICATION", "A repair shop plans for 70 jobs a month but a cautious owner also calculates the profit for 50 jobs. What is she doing?",
    ["Testing the plan by changing an assumption", "Correct: this shows how sensitive the plan is."],
    [["Writing the executive summary of the plan later", "The summary is a short description of the whole plan."], ["Choosing a brand name", "Naming is a marketing step."], ["Registering the business", "Registration is a legal step."]],
    "Changing an assumption tests viability.", { hints: ["What happens to profit if the customers are fewer?"] });
  mc(b, 3, "UNDERSTANDING", "How is the return on investment (ROI) calculated?",
    ["Annual profit ÷ amount invested × 100", "Correct."],
    [["Annual revenue ÷ amount invested × 100", "ROI uses profit."], ["Amount invested ÷ annual profit", "That gives years, similar to payback."], ["Monthly costs × 12", "That is the annual cost, not ROI."]],
    "ROI is a percentage of the investment.", { hints: ["Is it revenue or profit?"] });
  mc(b, 4, "EVALUATION", "A bank is asked to lend money for two shops. Shop A pays back in 8 months but depends on one customer. Shop B pays back in 14 months with many customers. Which statement is the best judgement?",
    ["Shop B may be less risky even though it repays more slowly, because it does not depend on one customer", "Correct."],
    [["Shop A is always better because 8 is less than 14", "Speed of payback ignores the risk."], ["Neither can be judged, because banks do not use payback to decide whether to lend money", "Payback is one of the measures used."], ["Shop B is worse because many customers cause problems", "Many customers spread the risk."]],
    "Viability depends on risk as well as payback.", { hints: ["What happens if the one customer leaves?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The executive summary is usually written last, so that it matches the finished proposal.", answer: true, explanation: "True. It summarises the other sections, so it is written after them." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each section of a business proposal to its content.",
    pairs: [["Problem or opportunity", "The need that exists for the product or service"], ["Operations", "Where and how the work is done"], ["Staffing", "Who does what and what skills are needed"], ["Finance", "Start-up costs, budget, profit and payback"], ["Risks", "What could go wrong and how it will be reduced"]],
    explanation: "Each section has a distinct purpose." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.", hints: ["Think about money spent once and the money kept each month."],
    template: "Money spent once before opening is a {{blank:a}} cost. Revenue minus costs is {{blank:b}}. The time for profit to repay the start-up cost is the {{blank:c}} period.",
    blanks: [
      { id: "a", accepted: ["start-up"], choices: ["start-up", "monthly", "variable", "tax"] },
      { id: "b", accepted: ["profit"], choices: ["profit", "revenue", "stock", "interest"] },
      { id: "c", accepted: ["payback"], choices: ["payback", "delivery", "opening", "market"] },
    ], explanation: "Start-up, profit, payback." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the figure calculated as annual profit divided by the amount invested, multiplied by 100.",
    accepted: ["return on investment", "roi", "the return on investment"], normalise: ["trim", "lowercase", "collapse_whitespace", "strip_punctuation"], wrong: ["payback period"], explanation: "Return on investment (ROI)." });
  b.num({ d: 3, skill: "APPLICATION", unit: "US$", hints: ["Add the five start-up costs."],
    stem: `A web design business buys a computer for ${D}640, software licences for ${D}210, a desk for ${D}180, registration for ${D}120 and launch advertising for ${D}90. Calculate the total start-up cost, in US dollars.`,
    value: 1240, wrong: [640 + 210, 1150], workedSolution: `1. 640 + 210 + 180 + 120 + 90 = ${D}1240.`, explanation: "The total is 1240." });
  b.num({ d: 3, skill: "APPLICATION", unit: "US$", hints: ["Revenue from copies plus revenue from printing jobs, minus the monthly costs."],
    stem: `The shop expects to copy ${pages} pages a month at ${D}${perPage.toFixed(2)} a page and to do ${jobs} printing jobs at ${D}${perJob} each. Its monthly costs are rent ${D}90, electricity ${D}45 and paper and toner ${D}120. Calculate the monthly profit, in US dollars.`,
    value: profit, wrong: [revenue, costs], workedSolution: `1. Copies: ${pages} × ${perPage} = ${D}${pages * perPage}.\n2. Printing jobs: ${jobs} × ${perJob} = ${D}${jobs * perJob}.\n3. Revenue = ${D}${revenue}; costs = 90 + 45 + 120 = ${D}${costs}.\n4. Profit = ${revenue} − ${costs} = ${D}${profit}.`, explanation: `${revenue} − ${costs} = ${profit}.` });
  b.num({ d: 4, skill: "APPLICATION", hints: ["Payback = start-up cost ÷ monthly profit; give the answer to one decimal place."],
    stem: `The start-up cost is ${D}${startTotal} and the monthly profit is ${D}${profit}. Calculate the payback period in months, to 1 decimal place.`,
    value: payback, tol: 0.05, wrong: [profit / startTotal, startTotal - profit], workedSolution: `1. ${startTotal} ÷ ${profit} = ${payback} months to 1 decimal place.`, explanation: `${startTotal} ÷ ${profit} = ${payback}.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 4, hints: ["Name four sections and say what each contains."],
    stem: "State four sections of a business proposal and say what each contains. [4]",
    points: ["Executive summary: a one-page summary of the proposal", "Problem and solution: the need and how the business meets it", "Market: who the customers and competitors are", "Finance: start-up costs, budget, profit and payback (or risks, or staffing)"],
    modelAnswer: "The executive summary is a one-page summary. The problem and solution describe the need and how the business meets it. The market shows who the customers and competitors are. The finance section gives start-up costs, budget, profit and payback.",
    explanation: "Any four sections described." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 4, hints: ["Think about the problem, solution, customers and staff."],
    stem: "Describe an ICT business that could be started in a rural town in Zimbabwe, stating the problem it solves and its customers. [4]",
    points: ["A named ICT business, for example a phone charging and repair shop or a computer training centre", "A real problem it solves, for example few places to charge or repair phones", "The customers: for example families, learners and small traders", "How it earns money, for example a fee for each charge, repair or course"],
    modelAnswer: "A phone charging and repair shop in a rural town. It solves the problem that there are few places to charge or repair phones. Its customers are families, learners and small traders, and it earns a fee for each charge or repair.",
    explanation: "Business, problem, customers and income." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3, hints: ["Think about threats to income and to stock."],
    stem: "State three risks to a new computer repair shop and one way to reduce each. [3]",
    points: ["Fewer customers than expected: advertise at schools and offer a guarantee", "Theft or damage of stock: lock the stock, insure it or keep a stock record", "Power cuts: use a surge protector or small uninterruptible power supply"],
    modelAnswer: "Fewer customers than expected: advertise at schools and offer a guarantee. Theft of stock: keep it locked and insured. Power cuts: use a surge protector or small uninterruptible power supply.",
    explanation: "Any three risks with a way to reduce each." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Compare the payback period and ROI with risk."],
    stem: `A bank is considering lending ${D}3000 to start a shop that would make a profit of ${D}125 a month. Evaluate whether the shop looks viable. [4]`,
    points: [`The payback period is 3000 ÷ 125 = 24 months, which is two years`, `The annual profit is 125 × 12 = ${D}1500, so the return on investment is 1500 ÷ 3000 × 100 = 50%`, "A long payback is risky if customers or prices change, so the plan should be tested with fewer customers", "A judgement, for example that it is viable if the forecast is realistic and the risks are controlled, or that the bank should ask for more evidence"],
    modelAnswer: "The payback period is 3000 ÷ 125 = 24 months and the ROI is 1500 ÷ 3000 × 100 = 50%. A two-year payback is risky if customers or prices change, so the plan should be tested with fewer customers. It looks viable only if the forecast is realistic and the risks are controlled.",
    explanation: "Calculate, comment on risk, judge." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Total costs = rent + electricity + paper and toner.", "Annual profit = monthly profit × 12."],
    explanation: `Start-up ${D}${startTotal}; monthly profit ${D}${profit}; payback ${payback} months; ROI ${roi}%.`,
    stem: `A graduate in Masvingo plans a printing and photocopying shop.\n\nStart-up costs:\n\n${startMd}\n\nEach month she expects revenue of ${D}${revenue} and costs of rent ${D}90, electricity ${D}45 and paper and toner ${D}120.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total start-up cost, in US dollars.", unit: "US$", value: startTotal, wrong: [1870, 2290], workedSolution: `1. 1350 + 520 + 280 + 140 + 130 = ${D}${startTotal}.`, explanation: `${startTotal}.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the monthly profit, in US dollars.", unit: "US$", value: profit, wrong: [revenue, costs], workedSolution: `1. Costs = 90 + 45 + 120 = ${D}${costs}.\n2. Profit = ${revenue} − ${costs} = ${D}${profit}.`, explanation: `${profit}.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the return on investment, as a percentage to the nearest whole number.", unit: "%", value: roi, wrong: [annual, 14.7], workedSolution: `1. Annual profit = ${profit} × 12 = ${D}${annual}.\n2. ROI = ${annual} ÷ ${startTotal} × 100 = ${roi}%.`, explanation: `${annual} ÷ ${startTotal} × 100 = ${roi}%.` }),
      P.manual({ label: "(d)", marks: 2, stem: "State two pieces of advice the graduate should be given before she starts the business.", points: ["Test the plan with fewer customers than expected to see if it is still profitable", "Do market research to confirm that enough customers will use the shop, or write a plan for risks such as theft and power cuts"], modelAnswer: "Test the plan with fewer customers than expected, and do market research to confirm that enough customers will use the shop.", explanation: "Sensitivity and research." }),
    ] });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Payback = start-up cost ÷ monthly profit; ROI = annual profit ÷ investment × 100."],
    explanation: "The training centre repays in 12 months with an ROI of 100%.",
    stem: `A computer training centre in Bulawayo needs ${D}1800 to start and expects a profit of ${D}150 a month.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the payback period in months.", value: 12, wrong: [150, 0.083], workedSolution: "1. 1800 ÷ 150 = 12 months.", explanation: "1800 ÷ 150 = 12." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the return on investment as a percentage.", unit: "%", value: 100, wrong: [12, 8.3], workedSolution: "1. Annual profit = 150 × 12 = US\\$1800.\n2. ROI = 1800 ÷ 1800 × 100 = 100%.", explanation: "100%." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give two risks to the training centre and a way to reduce each.", points: ["Few learners enrol: advertise at schools and offer a trial class", "Power cuts stop lessons: use a surge protector or small uninterruptible power supply, or a generator or solar power"], modelAnswer: "Few learners enrol: advertise at schools and offer a trial class. Power cuts stop lessons: use a surge protector or small uninterruptible power supply, or solar power.", explanation: "Two risks with controls." }),
    ] });
  b.struct({ d: 3, skill: "CREATION", examStyle: true, hints: ["Each section should be linked to the school software business."],
    explanation: "Each section is applied to a school software supplier.",
    stem: "Chipo wants to start a business that supplies attendance and fees software to primary schools in Masvingo.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State the problem that her business solves and the solution she offers.", points: ["Problem: schools record attendance and fees on paper, which is slow and has errors", "Solution: simple software that records and reports them on one computer"], modelAnswer: "Schools record attendance and fees on paper, which is slow and has errors. Her software records and reports them on one computer.", explanation: "Problem and solution." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe her market.", points: ["Primary schools with at least one computer, and head teachers or bursars who decide to buy", "Competitors: other software suppliers or schools that keep using paper; reached through the district office and demonstrations"], modelAnswer: "Primary schools with at least one computer, where head teachers or bursars decide to buy. Competitors are other suppliers or schools that keep using paper, and she can reach schools through the district office and demonstrations.", explanation: "Customers and competitors." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two items of start-up cost for her business.", points: ["A computer and equipment for development and demonstrations", "Registration and licences, or launch advertising, or travel to schools"], modelAnswer: "A computer and equipment for development and demonstrations, and registration, licences and launch advertising.", explanation: "Start-up items." }),
    ] });
  b.card("DEFINITION", "Business proposal", "A written plan describing an idea, its market, operation and finances, to show it is viable and to ask for support.");
  b.card("CONCEPT", "Parts of a proposal", "Executive summary, problem, solution, market, operations, staffing, finance and risks.");
  b.card("DEFINITION", "Start-up costs", "One-off costs before or when a business opens: equipment, stock, registration and launch advertising.");
  b.card("FORMULA", "Monthly profit", "Profit = revenue − total costs for the month.");
  b.card("FORMULA", "Payback period", "Payback period = start-up cost ÷ profit per month.");
  b.card("FORMULA", "Return on investment", "ROI = annual profit ÷ amount invested × 100.");
  b.card("CONCEPT", "Testing a plan", "Change an assumption, such as fewer customers, and recalculate profit and payback; list risks with ways to reduce them.");
  b.card("CONCEPT", "Presenting a proposal", "Problem, solution, market, numbers, risks, then what you are asking for; be ready to defend each assumption.");
});
