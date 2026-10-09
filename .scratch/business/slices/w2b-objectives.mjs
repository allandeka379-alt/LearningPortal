// W2b: business objectives.
import { concept, P, money, f, check, round } from "../lib.mjs";

// q: sales revenue growth objective
const revA = 220000, revB = 246400;
const growthPct = ((revB - revA) / revA) * 100; // 12
check("growth", growthPct, 12);
// q: market share
const shopSales = 63000, mkt = 350000;
const share = f.marketShare(shopSales, mkt); // 18
// struct: tuck shop
const tRev = 38400, tCosts = 41100;
const tProfit = f.profit(tRev, tCosts); // -2700
check("tuck loss", tProfit, -2700);
// struct 2: market share target
const kSales = 117000, kMkt = 650000, kTarget = 20;
const kShare = f.marketShare(kSales, kMkt); // 18
const kNeeded = (kTarget / 100) * kMkt; // 130000

concept("bus.enterprise.objectives", { file: "enterprise/objectives", keyPrefix: "enterprise.objectives" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a business objective?",
    options: [
      ["A target the business aims to achieve", "Correct: an objective is a goal that guides decisions."],
      ["A list of the business's assets", "A list of assets is part of a statement of financial position."],
      ["The legal document that forms a company", "That describes formation documents, not objectives."],
      ["The money the owner invests at the start", "That is capital, not an objective."],
    ],
    answer: "A",
    explanation: "A **business objective** is a target or goal that guides the decisions of owners and managers, such as survival, profit or growth.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Nyasha opened a hair salon in Kwekwe two months ago with a bank loan. Which objective is most likely to be her main aim now?",
    options: [
      ["Survival", "Correct: a new business with a loan to repay must first cover its costs and stay open."],
      ["Increasing market share to become the market leader", "A two-month-old salon is not yet in a position to lead the market."],
      ["Growth by opening branches in other towns", "Growth usually comes after the business is established."],
      ["Taking over a rival salon", "A takeover needs large finance and comes much later."],
    ],
    answer: "A",
    explanation: "New businesses usually aim to **survive**: to attract enough customers to pay their costs and repay loans. Growth and market share come later.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which objective is written in a SMART form?",
    options: [
      ["Increase sales revenue by 8% within the next twelve months", "Correct: it is specific, measurable and time-bound."],
      ["Become a much better and more popular business than before", "This cannot be measured and has no time limit."],
      ["Try to keep customers happy most of the time", "This is vague and not measurable."],
      ["Grow as quickly as possible at some point", "This has no measurable target and no deadline."],
    ],
    answer: "A",
    explanation: "SMART objectives are Specific, Measurable, Achievable, Realistic and Time-bound. Only the 8% target within twelve months can be checked.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do managers find objectives useful when making decisions?",
    options: [
      ["A choice can be judged by whether it helps meet the target", "Correct: objectives give a yardstick for decisions."],
      ["Objectives remove all risk from business decisions", "Objectives guide decisions; they cannot remove risk."],
      ["Objectives mean the business no longer needs managers", "Managers are needed to plan and work towards objectives."],
      ["Objectives guarantee that the business makes a profit", "Setting a target does not guarantee reaching it."],
    ],
    answer: "A",
    explanation: "Objectives give direction: a decision is a good one if it helps the business reach its objective. They also allow performance to be measured.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A supermarket cuts its prices to win customers from rivals. Which pair of objectives is most likely to conflict as a result?",
    options: [
      ["Market share and short-term profit", "Correct: lower prices may win share but reduce the profit on each sale."],
      ["Survival and staying in business", "These are the same objective, so they cannot conflict."],
      ["Sales volume and market share", "Both are likely to rise together when prices fall."],
      ["Growth and a larger number of customers", "These move in the same direction."],
    ],
    answer: "A",
    hints: ["What happens to the profit on each item when the price falls?"],
    explanation: "Price cuts may raise **market share**, but each sale earns less, so **profit** may fall in the short run. Managers must decide which objective comes first.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A dairy co-operative near Marondera aims to pay its farmer-members a fair price for their milk. What type of objective is this?",
    options: [
      ["A social objective", "Correct: it is about benefiting members rather than maximising profit."],
      ["A market share objective", "Market share concerns the share of total market sales."],
      ["A survival objective", "Survival means covering costs to stay in business."],
      ["A sales revenue objective", "Paying members fairly is not a target for the value of sales."],
    ],
    answer: "A",
    explanation: "Co-operatives exist to serve their members, so fair prices for members are a **social** objective.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A small engineering firm has been growing for five years. The economy now enters a recession and orders fall sharply. How is its main objective most likely to change?",
    options: [
      ["From growth to survival", "Correct: with falling orders, staying in business becomes the priority."],
      ["From survival to growth", "A recession makes growth harder, not easier."],
      ["From profit to market leadership", "Falling orders make market leadership unrealistic."],
      ["It will not change at all", "Objectives respond to the economic situation."],
    ],
    answer: "A",
    hints: ["What is the biggest danger to a business when orders fall?"],
    explanation: "In a recession demand falls and cash becomes tight, so many businesses switch from growth to **survival**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main objective of a state-owned water utility?",
    options: [
      ["To provide a reliable service to the public", "Correct: public sector organisations aim mainly to serve the public."],
      ["To maximise dividends paid to shareholders", "State-owned bodies do not have private shareholders seeking dividends."],
      ["To take over private water companies", "This is not the purpose of a public utility."],
      ["To win market share from rival utilities", "A utility usually has no direct rivals in its area."],
    ],
    answer: "A",
    explanation: "Public sector organisations aim to provide essential **services** at an affordable price, though they are also expected to control costs.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sales revenue and profit mean the same thing.",
    answer: false,
    explanation: "False. Sales revenue is the value of sales; profit is revenue minus total costs. A business can have high revenue and still make a loss.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business's objectives may change when it changes from a sole trader to a private limited company.",
    answer: true,
    explanation: "True. New shareholders may expect profit and dividends, and the larger business may aim for growth.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each business with its most likely main objective.",
    pairs: [
      ["A vegetable stall that opened last week at Sakubva market", "Survival"],
      ["A bus company that wants to add new routes and buses", "Growth"],
      ["A soap maker that wants a bigger percentage of total soap sales", "Market share"],
      ["A social enterprise that trains young people in sewing", "Social objective"],
    ],
    explanation: "New businesses aim to survive; expanding firms aim for growth; a larger percentage of total sales is market share; a social enterprise has social aims.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Market share = sales of the business ÷ {{blank:a}} × 100. An objective with a deadline is said to be {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["total market sales"], choices: ["total market sales", "total costs", "profit", "sales of the largest rival"] },
      { id: "b", accepted: ["time-bound"], choices: ["time-bound", "achievable", "specific", "realistic"] },
    ],
    explanation: "Market share uses **total market sales**; the T in SMART is **time-bound**.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the objective of a business that simply aims to cover its costs and stay open.",
    accepted: ["survival", "to survive", "survive", "staying in business", "stay in business"],
    wrong: ["profit", "growth"],
    explanation: "**Survival**: covering costs and avoiding running out of cash, typical of new businesses and of firms in a recession.",
  });
  b.calc({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `Farai's hardware shop set an objective of increasing sales revenue by 10% this year. Sales revenue rose from ${money(revA)} to ${money(revB)}. Calculate the percentage increase in sales revenue. Give your answer as a percentage to one decimal place.`,
    kind: "pct", value: growthPct, wrong: [round((revB - revA) / revB * 100, 1), 10],
    explanation: `Increase = ${money(revB - revA)}; ${(revB - revA).toLocaleString("en-GB")} ÷ ${revA.toLocaleString("en-GB")} × 100 = ${growthPct.toFixed(1)}%. The objective of 10% has been met.`,
    workedSolution: `1. Increase = ${revB.toLocaleString("en-GB")} − ${revA.toLocaleString("en-GB")} = ${(revB - revA).toLocaleString("en-GB")}.\n2. Percentage increase = ${(revB - revA).toLocaleString("en-GB")} ÷ ${revA.toLocaleString("en-GB")} × 100 = ${growthPct.toFixed(1)}%.\n3. ${growthPct.toFixed(1)}% is more than 10%, so the objective is met.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `A stationery shop in Gweru had sales of ${money(shopSales)} last year. Total sales of stationery in the town were ${money(mkt)}. Calculate the shop's market share as a percentage to one decimal place.`,
    kind: "pct", value: share, wrong: [round((shopSales / (mkt - shopSales)) * 100, 1)],
    explanation: `Market share = ${shopSales.toLocaleString("en-GB")} ÷ ${mkt.toLocaleString("en-GB")} × 100 = ${share.toFixed(1)}%.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** reasons why it is important for a business to set objectives.",
    points: [
      "Gives direction / a clear target for everyone in the business.",
      "Explains: staff and managers work towards the same goal, so effort is not wasted.",
      "Allows performance to be measured / helps decision-making / motivates staff / persuades lenders.",
      "Explains the second reason, e.g. actual results are compared with the target so problems are found early.",
    ],
    hints: ["Think about direction, decisions, measurement and motivation."],
    modelAnswer: "Objectives give the business a clear direction, so all employees and managers work towards the same goal rather than pulling in different ways. They also allow performance to be measured: managers can compare actual results with the target and act early if the business is falling behind.",
    explanation: "One mark for each reason and one for explaining it.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** reasons why a business's objectives may change over time.",
    points: [
      "Business becomes established / older.",
      "So it moves from survival to profit or growth.",
      "Change in economic conditions / new competition / change of ownership / public pressure.",
      "Explains the effect, e.g. a recession makes survival the priority again.",
    ],
    hints: ["Think about the age of the business and events outside it."],
    modelAnswer: "As a business becomes established and gains loyal customers, it no longer needs to focus on survival and can aim for profit and growth. If the economy enters a recession, sales may fall so sharply that survival becomes the main objective again.",
    explanation: "Objectives change with the age of the business, the economy, competition, ownership and public opinion.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 840,
    stem: `Chipo opened a tuck shop near a school in Mutare eight months ago, using her savings and a loan from her uncle. In her first eight months her sales revenue was ${money(tRev)} and her total costs were ${money(tCosts)}. A supermarket is due to open on the same street next month.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate Chipo's profit or loss for the eight months. Enter a loss as a negative number.", kind: "money", value: tProfit, answer: String(tProfit), wrong: [-tProfit, tRev] }),
      P.mcq({
        label: "(b)", stem: "Which objective should Chipo give priority to now?",
        options: [["Survival", "Correct: she is making a loss and a strong rival is arriving."], ["Growth", "Growth is unrealistic while the business makes a loss."], ["Market leadership", "A new tuck shop cannot lead the market against a supermarket."], ["Maximising dividends", "A sole trader does not pay dividends."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** reasons for your answer to (b), using the information about Chipo's business.",
        points: [
          `Making a loss of ${money(-tProfit)}: revenue does not cover costs.`,
          "So she must cut costs or increase sales before her savings run out.",
          "A supermarket will open nearby: strong competition with lower prices and wider choice.",
          "So she may lose customers and must protect the sales she has.",
        ],
        modelAnswer: `Chipo made a loss of ${money(-tProfit)} because her costs were higher than her revenue, so she must first cover her costs before her savings run out. A supermarket is opening on the same street and may offer lower prices, so she must work to keep her customers simply to stay in business.`,
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Recommend **one** SMART objective for Chipo for the next six months. Justify your recommendation.",
        points: [
          "States an objective that is specific and measurable, e.g. cover all costs / break even.",
          "Includes a time limit (within six months).",
          "Justifies: realistic given the current loss and new competition.",
          "Justifies: links to an action, e.g. focusing on school pupils' needs or cutting costs.",
        ],
        modelAnswer: "Chipo should aim to cover all her costs (break even) every month within the next six months. This is specific and measurable, because she can compare monthly revenue with monthly costs, and it is time-bound. It is realistic because her loss is small, and she can meet it by stocking the snacks pupils buy most and opening at break times, when the supermarket is less convenient for them.",
      }),
    ],
    hints: ["(a) Profit = revenue − total costs.", "(c) Use the loss and the new supermarket."],
    explanation: `(a) ${money(tRev)} − ${money(tCosts)} = a loss of ${money(-tProfit)}. (b) Survival. (c) Loss-making and new competition. (d) A SMART survival objective such as breaking even within six months.`,
    workedSolution: `1. Profit = revenue − total costs = ${tRev.toLocaleString("en-GB")} − ${tCosts.toLocaleString("en-GB")} = (${(-tProfit).toLocaleString("en-GB")}).\n2. The result is negative, so Chipo made a loss of ${money(-tProfit)}.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, calculator: true, secs: 1000,
    stem: `Kuda Paints is a private limited company in Bulawayo. Its directors set the objective: "Achieve a ${kTarget}% share of the regional paint market by the end of this year." This year its sales were ${money(kSales)} and total paint sales in the region were ${money(kMkt)}. The directors are also under pressure from the local community to stop washing paint waste into a nearby stream.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate Kuda Paints' market share this year as a percentage to one decimal place.", kind: "pct", value: kShare, wrong: [round((kSales / kNeeded) * 100, 1)] }),
      P.num({ label: "(b)", marks: 2, stem: `Calculate the sales Kuda Paints would have needed to reach a ${kTarget}% market share.`, kind: "money", value: kNeeded, wrong: [kNeeded - kSales] }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why a market share objective may conflict with an objective of protecting the environment.",
        points: [
          "Gaining market share may need lower prices / more output.",
          "Safe disposal of waste raises costs.",
          "Higher costs make it harder to cut prices or reduce profit, so the two objectives pull in different directions.",
        ],
        modelAnswer: "To win market share, Kuda Paints may need to cut prices or produce more. Disposing of paint waste safely costs money, which makes price cuts harder and reduces profit, so the two objectives pull against each other.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Should Kuda Paints add an environmental objective, even if this makes its market share target harder to reach? Justify your answer.",
        points: [
          "For: avoids fines and legal action for polluting the stream.",
          "For: protects reputation; community and customers may boycott a polluter.",
          "Against: extra costs reduce profit / make price cuts harder.",
          `Uses the data: share of ${kShare}% is close to the ${kTarget}% target, so the target is still within reach.`,
          "Weighs short-term costs against long-term benefits.",
          "Justified conclusion.",
        ],
        modelAnswer: `Kuda Paints should add an environmental objective. Washing waste into the stream could lead to fines and legal action, and community pressure could turn into a boycott that would cut sales far more than the cost of safe disposal. Treating waste properly will raise costs and may delay the market share target, but the business already has ${kShare}% of the market, close to its ${kTarget}% target, so a short delay is a small price. In the long run a good reputation helps it win and keep customers, so the two objectives can support each other.`,
      }),
    ],
    hints: ["(a) Market share = sales of the business ÷ total market sales × 100.", "(b) Find 20% of total market sales.", "(d) Consider fines, reputation and costs, then decide."],
    explanation: `(a) ${kSales.toLocaleString("en-GB")} ÷ ${kMkt.toLocaleString("en-GB")} × 100 = ${kShare.toFixed(1)}%. (b) ${kTarget}% × ${money(kMkt)} = ${money(kNeeded)}. (c) Market share needs low prices; environmental care raises costs. (d) A justified judgement.`,
    workedSolution: `1. Market share = ${kSales.toLocaleString("en-GB")} ÷ ${kMkt.toLocaleString("en-GB")} × 100 = ${kShare.toFixed(1)}%.\n2. Sales needed = ${kTarget} ÷ 100 × ${kMkt.toLocaleString("en-GB")} = ${kNeeded.toLocaleString("en-GB")}.`,
  });
  b.card("DEFINITION", "What is a **business objective**?", "A target or goal that a business aims to achieve, which guides the decisions of owners and managers.");
  b.card("FACT", "Six common business objectives?", "Survival, profit, growth, sales revenue, market share, social and ethical aims.");
  b.card("FORMULA", "Market share (%)", "Sales of the business ÷ total market sales × 100");
  b.card("CONCEPT", "What does **SMART** stand for?", "Specific, Measurable, Achievable, Realistic, Time-bound.");
  b.card("CONCEPT", "Why set objectives? (four reasons)", "Direction; guide decisions; motivate staff; measure performance; reassure lenders and investors.");
  b.card("CONCEPT", "Why do objectives change?", "Age of the business, economic conditions, competition, change of ownership, public opinion and laws.");
  b.card("FACT", "Usual main objective of a new business?", "Survival: covering costs and not running out of cash.");
  b.card("CONCEPT", "Give an example of conflicting objectives.", "Cutting prices to gain market share reduces profit per item; paying fair wages or protecting the environment raises costs.");
  b.card("DEFINITION", "What is a **social enterprise**?", "A business with social objectives as well as profit objectives, which uses its profit to help a community.");
});
