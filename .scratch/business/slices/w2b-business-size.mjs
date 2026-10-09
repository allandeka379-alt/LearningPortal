// W2b: measuring business size; small and large businesses.
import { concept, P, money, f, table, round } from "../lib.mjs";

const msSales = 46800, msMkt = 312000;
const ms = f.marketShare(msSales, msMkt); // 15
const firms = [["Sizwe Logistics", 64, 2400000, 1850000], ["Mbare Textiles", 210, 1300000, 2700000], ["Tariro Software", 38, 450000, 3100000]];
const tab = table(["Business", "Employees", "Capital employed (US\\$)", "Sales revenue (US\\$)"], firms);
const ownCap = 136000, ltLoans = 58500;
const capEmp = ownCap + ltLoans; // 194500
// struct 2
const sA = 285000, sB = 171000, sMkt = 1900000;
const shareA = f.marketShare(sA, sMkt), shareB = f.marketShare(sB, sMkt);

concept("bus.enterprise.business-size", { file: "enterprise/business-size", keyPrefix: "enterprise.business-size" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is **not** a suitable measure of the size of a business?",
    options: [
      ["Profit", "Correct: profit measures performance, not size."],
      ["Number of employees", "This is a common measure of size."],
      ["Capital employed", "This is a common measure of size."],
      ["Value of sales", "This is a common measure of size."],
    ],
    answer: "A",
    explanation: "**Profit** depends on efficiency, prices and the economy. A small firm can earn more profit than a large one, so profit is not a measure of size.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why can the number of employees be a misleading measure of size for a bottling plant that uses automated machinery?",
    options: [
      ["It employs few people but has large output and capital", "Correct: capital-intensive firms look small by employees."],
      ["Its workers are all part-time, so cannot be counted", "Part-time work is a separate problem and is not stated here."],
      ["Bottling plants are never counted as businesses", "They are businesses like any other."],
      ["Its profit is always lower than other firms' profit", "Profit is not linked to the number of workers in this way."],
    ],
    answer: "A",
    explanation: "A **capital-intensive** business uses machines instead of people, so counting employees understates its size.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is capital employed?",
    options: [
      ["The total long-term finance invested in a business", "Correct: owners' capital plus long-term loans."],
      ["The money received from sales in a year", "That is sales revenue."],
      ["The wages paid to all employees in a year", "Wages are a cost, not capital employed."],
      ["The cash held in the business's bank account", "Cash is one asset; capital employed is the total long-term finance."],
    ],
    answer: "A",
    explanation: "**Capital employed** is the long-term finance (owners' capital and long-term loans) used to buy assets and run the business.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage of being a small business?",
    options: [
      ["Quick decisions and flexibility", "Correct: the owner can respond quickly to change."],
      ["Lower average costs from bulk buying", "Bulk buying is an advantage of large firms."],
      ["Easy access to finance from share issues", "Small firms usually find finance harder to raise."],
      ["Power to influence market prices", "Market power belongs to large firms."],
    ],
    answer: "A",
    explanation: "Small businesses are **flexible**: the owner makes decisions quickly and gives personal service.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of being a large business?",
    options: [
      ["Slow communication through many levels of management", "Correct: this is a diseconomy of scale."],
      ["Higher average costs because of no bulk discounts", "Large firms usually gain bulk-buying discounts."],
      ["Difficulty in borrowing from banks", "Large firms usually borrow more easily."],
      ["Too few customers to cover its costs", "Large firms usually have many customers."],
    ],
    answer: "A",
    explanation: "Large firms can suffer **diseconomies of scale**: slow communication, long chains of command and poor coordination.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `Use the table.\n\n${tab}\n\nWhich business is the largest when measured by capital employed?`,
    options: [
      ["Sizwe Logistics", "Correct: it has the largest capital employed (US\\$2,400,000)."],
      ["Mbare Textiles", "Mbare Textiles is largest by employees, not by capital employed."],
      ["Tariro Software", "Tariro Software is largest by sales revenue, not capital employed."],
      ["They are all the same size", "Their capital employed differs widely."],
    ],
    answer: "A",
    hints: ["Look only at the capital employed column."],
    explanation: "By capital employed Sizwe Logistics is largest; by employees Mbare Textiles; by sales Tariro Software. Different measures give different answers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Market share is a poor measure for comparing the size of a bakery with the size of a bus company. Why?",
    options: [
      ["The two businesses sell in different markets", "Correct: market share only compares firms in the same market."],
      ["Market share cannot be calculated for a bakery", "It can be calculated for any business with known market sales."],
      ["Market share is the same as profit", "Market share is based on sales, not profit."],
      ["Bus companies have no competitors", "Bus companies usually do have competitors."],
    ],
    answer: "A",
    hints: ["What is the total that market share is calculated from?"],
    explanation: "Market share is calculated against the total sales of one market, so it can only compare firms in the **same** market.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Thandeka runs a dressmaking business in Bulawayo and has refused offers to open a second shop. Which reason best explains why she stays small?",
    options: [
      ["She wants to keep control and give personal service", "Correct: many owners choose to stay small."],
      ["Small businesses gain more economies of scale", "Economies of scale come with growth, not with staying small."],
      ["Small businesses always earn more profit", "Profit depends on many factors, not just size."],
      ["The law does not allow dressmakers to grow", "No such law exists."],
    ],
    answer: "A",
    explanation: "Owners often stay small to keep **control and independence**, avoid extra stress and keep the personal service their customers value.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A business with a larger profit is always larger than a business with a smaller profit.",
    answer: false,
    explanation: "False. Profit measures performance; a small, efficient business can earn more than a large one.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "It is better to use more than one method when comparing the size of businesses.",
    answer: true,
    explanation: "True. Each method has weaknesses, so comparing several gives a fairer picture.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method of measuring size with its main problem.",
    pairs: [
      ["Number of employees", "Misleading for capital-intensive firms"],
      ["Capital employed", "Misleading for labour-intensive service firms"],
      ["Sales revenue", "Firms selling costly items look large with few sales"],
      ["Market share", "Only compares firms in the same market"],
    ],
    explanation: "Each measure has a weakness, which is why several are used together.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Lower average costs enjoyed by large firms are called economies of {{blank:a}}. Problems such as slow communication in very large firms are called {{blank:b}} of scale.",
    blanks: [
      { id: "a", accepted: ["scale"], choices: ["scale", "size", "growth", "profit"] },
      { id: "b", accepted: ["diseconomies"], choices: ["diseconomies", "economies", "advantages", "costs"] },
    ],
    explanation: "Large firms gain **economies of scale** but can suffer **diseconomies of scale**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `A furniture shop in Masvingo had sales of ${money(msSales)} last year. Total furniture sales in the town were ${money(msMkt)}. Calculate the shop's market share as a percentage to one decimal place.`,
    kind: "pct", value: ms, wrong: [round((msSales / (msMkt - msSales)) * 100, 1)],
    explanation: `Market share = ${msSales.toLocaleString("en-GB")} ÷ ${msMkt.toLocaleString("en-GB")} × 100 = ${ms.toFixed(1)}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A haulage business in Mutare is financed by ${money(ownCap)} of owners' capital and ${money(ltLoans)} of long-term bank loans. It also owes ${money(9400)} to suppliers, due next month. Calculate its capital employed.`,
    kind: "money", value: capEmp, wrong: [capEmp + 9400, ownCap],
    hints: ["Capital employed is long-term finance only."],
    explanation: `Capital employed = owners' capital + long-term loans = ${money(ownCap)} + ${money(ltLoans)} = ${money(capEmp)}. The amount owed to suppliers is short-term, so it is left out.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** reasons why some businesses remain small.",
    points: [
      "Owner's choice / wants control and independence.",
      "Explains: growth means more staff, more stress and sharing decisions.",
      "Small market / lack of finance / personal service.",
      "Explains: e.g. a rural tuck shop has limited customers, so growth would not be profitable.",
    ],
    hints: ["Think about the owner, the market and finance."],
    modelAnswer: "Some owners choose to stay small because they want to keep control and avoid the stress of managing many workers. Others serve a small market, such as a tuck shop in a village, where there are not enough customers to make growth profitable.",
    explanation: "Reasons: owners' choice, small or niche market, personal service, lack of finance, type of industry.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain why profit is not a suitable measure of business size. Use an example.",
    points: [
      "Profit depends on efficiency / prices / costs, not on how big the business is.",
      "A small efficient business may earn more profit than a large inefficient one.",
      "A large business may make a loss in a bad year but remains large.",
      "Relevant example with two businesses.",
    ],
    hints: ["Can a large business make a loss?"],
    modelAnswer: "Profit shows how well a business is performing, not how large it is: it depends on efficiency, prices and costs. A small, well-run hair salon may make more profit than a large clothing factory that is badly managed, and a large mining company may make a loss when prices fall but is still large.",
    explanation: "Profit measures performance; size is measured by employees, output, sales, capital employed or market share.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 900,
    stem: `Two firms make school uniforms for the regional market, which had total sales of ${money(sMkt)} last year.\n\n${table(["", "Uniform House", "Kuda Garments"], [["Employees", 26, 58], ["Capital employed (US\\$)", 520000, 260000], ["Sales revenue (US\\$)", sA, sB]])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate Uniform House's market share as a percentage to one decimal place.", kind: "pct", value: shareA, wrong: [round((sA / (sA + sB)) * 100, 1)] }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate Kuda Garments' market share as a percentage to one decimal place.", kind: "pct", value: shareB, wrong: [round((sB / (sA + sB)) * 100, 1)] }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Using the table, explain why it is difficult to say which business is larger.",
        points: [
          "Kuda Garments is larger by number of employees (58 against 26).",
          "Uniform House is larger by capital employed and by sales / market share.",
          "Different measures give different answers.",
          "Explains a reason, e.g. Uniform House uses more machinery (capital-intensive), Kuda more labour.",
        ],
        modelAnswer: `Kuda Garments employs more people (58 against 26), but Uniform House has twice the capital employed and higher sales, with a ${round(shareA, 1)}% market share against ${round(shareB, 1)}%. Uniform House probably uses more machinery while Kuda relies on labour, so the measures disagree.`,
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Which **one** measure would you use to compare these two businesses? Justify your choice.",
        points: [
          "Chooses a measure, e.g. sales revenue / market share.",
          "Both firms sell in the same market, so market share / sales compare them fairly.",
          "Explains the weakness of an alternative (employees distorted by different use of machines).",
          "Justified conclusion.",
        ],
        modelAnswer: "Market share is the best measure here, because both firms sell the same product in the same regional market, so it compares them on equal terms. Employees would be misleading because Uniform House uses more machinery. On market share Uniform House is the larger business.",
      }),
    ],
    hints: ["(a)(b) Market share = sales of the business ÷ total market sales × 100.", "(c) Compare each row of the table."],
    explanation: `(a) ${sA.toLocaleString("en-GB")} ÷ ${sMkt.toLocaleString("en-GB")} × 100 = ${shareA.toFixed(1)}%. (b) ${sB.toLocaleString("en-GB")} ÷ ${sMkt.toLocaleString("en-GB")} × 100 = ${shareB.toFixed(1)}%. (c) Measures disagree. (d) Justified choice of measure.`,
    workedSolution: `1. Uniform House: ${sA.toLocaleString("en-GB")} ÷ ${sMkt.toLocaleString("en-GB")} × 100 = ${shareA.toFixed(1)}%.\n2. Kuda Garments: ${sB.toLocaleString("en-GB")} ÷ ${sMkt.toLocaleString("en-GB")} × 100 = ${shareB.toFixed(1)}%.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Sipho runs a small engineering workshop in Kwekwe with six workers. He repairs mining equipment for local mines and is known for fast, personal service. A large company with branches in several towns has offered to buy his business.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** advantages Sipho's business has because it is small.",
        points: [
          "Personal service / close contact with customers.",
          "Mines trust him and return for fast repairs.",
          "Flexibility / quick decisions.",
          "Can respond immediately to an urgent breakdown.",
        ],
        modelAnswer: "Sipho gives personal service, so the mines know and trust him and keep coming back. Because he makes all the decisions himself, he can respond immediately when a mine has an urgent breakdown.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain **one** advantage to the business of becoming part of the large company.",
        points: [
          "Access to finance / economies of scale / wider market.",
          "Explains, e.g. buy spare parts in bulk at lower cost / invest in new equipment.",
          "Applies to Sipho's workshop (mining customers in other towns).",
        ],
        modelAnswer: "As part of a large company the workshop could buy spare parts in bulk at lower prices and afford new equipment, so it could take on bigger repair contracts for mines in other towns.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Should Sipho sell his business to the large company? Justify your answer.",
        points: [
          "For: payment for the business; less risk; finance and resources.",
          "Against: loss of control and independence.",
          "Against: personal service, the main reason customers use him, may be lost.",
          "Workers' jobs and conditions may change.",
          "Considers what Sipho wants (objectives) and the future of the market.",
          "Justified decision.",
        ],
        modelAnswer: "Selling would give Sipho a payment for the business and remove his personal risk, and the workshop would gain finance and bulk buying. However, he would lose control, and the fast, personal service that keeps the mines loyal may disappear inside a large company with slower decisions. If Sipho values independence and his business is profitable, he should not sell; he can keep his advantage of personal service. He should sell only if he wants to retire or if he cannot afford the equipment needed to keep up with the mines' needs.",
      }),
    ],
    hints: ["(c) Weigh what Sipho gains against what he and his customers lose."],
    explanation: "Small: personal service and flexibility. Large: finance and economies of scale. The decision depends on Sipho's objectives.",
  });
  b.card("FACT", "Five methods of measuring business size?", "Number of employees, value or volume of output, sales revenue, capital employed, market share.");
  b.card("CONCEPT", "Why is profit not a measure of size?", "Profit depends on efficiency, prices and costs; a small efficient firm may earn more than a large one.");
  b.card("DEFINITION", "What is **capital employed**?", "The total long-term finance invested in a business (owners' capital plus long-term loans).");
  b.card("CONCEPT", "Problem with measuring size by employees?", "Capital-intensive firms employ few people but may be large; part-time staff complicate counts.");
  b.card("CONCEPT", "Advantages of being small?", "Personal service, flexibility, quick decisions, easy communication, low start-up costs, niche markets.");
  b.card("CONCEPT", "Advantages of being large?", "Economies of scale, easier finance, market power, spreading risk.");
  b.card("CONCEPT", "Disadvantages of being large?", "Diseconomies of scale: slow communication, long chains of command, impersonal, slow decisions.");
  b.card("FACT", "Why do some businesses remain small?", "Owner's choice, small or niche market, personal service, lack of finance, type of industry.");
  b.card("FORMULA", "Capital employed", "Owners' capital + long-term loans (non-current liabilities)");
});
