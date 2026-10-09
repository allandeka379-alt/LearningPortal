// W3b: demand forecasting (Business Enterprise and Skills only).
import { concept, P, table, round, check } from "../lib.mjs";

// q: average change (eggs, trays).
const eggs = [340, 352, 370, 386];
const eggInc = eggs.slice(1).map((x, i) => x - eggs[i]); // 12, 18, 16
const eggAvg = eggInc.reduce((a, c) => a + c, 0) / eggInc.length; // 15.333
const eggF = eggs[3] + eggAvg; // 401.33
// q: percentage growth.
const g0 = 5000, gPct = 8;
const gF = g0 * (1 + gPct / 100); // 5400
// q: moving average.
const mv = [96, 120, 102, 114, 126];
const mv3 = (mv[2] + mv[3] + mv[4]) / 3; // 114
check("mv3", mv3, 114);
// Structured: bricks.
const bricks = [[ "January", 18000 ], [ "February", 19500 ], [ "March", 21000 ], [ "April", 22500 ]];
const bInc = bricks.slice(1).map(([, x], i) => x - bricks[i][1]);
const bAvg = bInc.reduce((a, c) => a + c, 0) / bInc.length; // 1500
const bMay = bricks[3][1] + bAvg; // 24000
const bJune = bMay + bAvg; // 25500
const bTbl = table(["Month", "Bricks sold"], bricks);
// Structured 2: decline.
const dec = [[ "Year 1", 1500 ], [ "Year 2", 1200 ], [ "Year 3", 960 ]];
const decPct = ((dec[0][1] - dec[1][1]) / dec[0][1]) * 100; // 20
check("dec", ((dec[1][1] - dec[2][1]) / dec[1][1]) * 100, 20);
const decF = dec[2][1] * (1 - decPct / 100); // 768
const decTbl = table(["Year", "Radios repaired"], dec);

concept("bus.marketing.demand-forecasting", { file: "marketing/demand-forecasting", keyPrefix: "marketing.demand-forecasting" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is demand forecasting?",
    options: [
      ["Estimating the future sales of a product", "Correct: a forecast predicts future demand."],
      ["Recording the sales made last month", "That records past sales; it does not forecast."],
      ["Setting the price of a new product", "That is a pricing decision."],
      ["Advertising a product before its launch", "That is promotion."],
    ],
    answer: "A",
    explanation: "Demand forecasting estimates how much customers will buy in a future period.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which method of forecasting is most suitable for a completely new product with no sales history?",
    options: [
      ["A consumer survey of buying intentions", "Correct: it does not need past sales data."],
      ["Calculating the average monthly change in sales", "There are no past sales to use."],
      ["A three-month moving average", "This needs past sales figures."],
      ["Extending a line graph of past sales", "There is no line to extend."],
    ],
    answer: "A",
    explanation: "Qualitative methods (surveys, sales staff, expert opinion) are used when there is no sales history.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why might a business's sales staff give a forecast that is too low?",
    options: [
      ["So that their sales targets are easy to beat", "Correct: low forecasts make targets easier to reach."],
      ["Because they never meet customers", "Sales staff are close to customers."],
      ["Because qualitative methods use calculations", "Qualitative methods use judgement, not calculations."],
      ["Because forecasts are only made for new products", "Forecasts are made for all products."],
    ],
    answer: "A",
    explanation: "Sales staff know their customers well, but may under-estimate if targets are based on the forecast.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A uniform shop in Harare sells far more blazers every January than in any other month. What is this pattern called?",
    options: [
      ["Seasonal demand", "Correct: demand rises at the same time each year."],
      ["A falling trend", "Sales are not falling over time."],
      ["Market research", "Research collects information; this is a sales pattern."],
      ["Expert opinion", "That is a forecasting method."],
    ],
    answer: "A",
    explanation: "**Seasonal demand** rises and falls at the same times each year; forecasts must allow for it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A firm forecast sales of cold drinks from the trend in past sales, but actual sales were much lower. Which is the most likely reason?",
    options: [
      ["An unusually cool, wet summer", "Correct: weather can make actual sales differ from the trend."],
      ["The firm had used last year's sales records", "Using past records is the normal basis of a trend."],
      ["The trend had been rising steadily", "A rising trend would not explain lower sales on its own."],
      ["The forecast was written in a cash budget", "Where it is written does not change demand."],
    ],
    answer: "A",
    hints: ["What outside event would reduce demand for cold drinks?"],
    explanation: "Forecasts assume the past pattern continues; weather, competition, incomes and tastes can change it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does an accurate demand forecast most directly help a business prepare its cash budget?",
    options: [
      ["It gives the expected sales revenue, the main cash inflow", "Correct: forecast sales feed the receipts section."],
      ["It shows the exact profit the business will make in each month", "A forecast estimates sales; it does not give exact profit."],
      ["It removes the need to borrow money", "It may show a need to borrow."],
      ["It sets the wage rate for workers", "Wage rates are not set by a forecast."],
    ],
    answer: "A",
    hints: ["Which part of a cash budget depends on sales?"],
    explanation: "Expected sales revenue is the main receipt in a cash budget; a poor forecast makes the whole budget unreliable.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a quantitative method of demand forecasting?",
    options: [
      ["Calculating the trend from past sales figures", "Correct: it uses numbers from past sales."],
      ["Asking experienced traders for their opinion", "That is expert opinion, a qualitative method."],
      ["Asking sales staff what customers say", "That is a qualitative method."],
      ["Holding a discussion with a group of customers", "That gives opinions: qualitative."],
    ],
    answer: "A",
    explanation: "Quantitative methods use numerical data, such as past sales trends.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A demand forecast is an estimate and may turn out to be wrong.",
    answer: true,
    explanation: "True. Forecasts are based on judgement or past trends, which can change.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A forecast for three years ahead is usually more reliable than a forecast for next month.",
    answer: false,
    explanation: "False. The further ahead the forecast, the more things can change, so it is less reliable.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each plan with the way a demand forecast helps it.",
    pairs: [
      ["Production planning", "Deciding how many units to make each month"],
      ["Purchasing", "Ordering the right quantity of raw materials"],
      ["Staffing", "Deciding whether to hire seasonal workers"],
      ["Cash budgeting", "Estimating cash inflows from sales"],
    ],
    explanation: "The sales forecast is the starting point for production, purchasing, staffing and cash plans.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Methods based on opinions and judgement are {{blank:a}} methods; methods based on past sales figures are {{blank:b}} methods.",
    blanks: [
      { id: "a", accepted: ["qualitative"], choices: ["qualitative", "quantitative"] },
      { id: "b", accepted: ["quantitative"], choices: ["qualitative", "quantitative"] },
    ],
    explanation: "Qualitative = judgement; quantitative = numbers and trends.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the term for the general direction in which sales figures are moving over time.",
    accepted: ["trend", "the trend", "sales trend"],
    wrong: ["seasonal"],
    explanation: "The **trend** shows whether sales are rising, falling or steady over time.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A poultry farmer near Chinhoyi sold ${eggs.join(", ")} trays of eggs in four consecutive weeks. Using the average weekly change, forecast sales for the fifth week, to the nearest tray.`,
    kind: "units", value: eggF, wrong: [eggs[3] + (eggs[3] - eggs[0]), eggs[3] + (eggs[3] - eggs[2])],
    hints: ["Find the three weekly changes, then their average."],
    explanation: `Changes: ${eggInc.join(", ")}; average = ${eggInc.reduce((a, c) => a + c, 0)} ÷ 3 = ${round(eggAvg, 2)}. Forecast = ${eggs[3]} + ${round(eggAvg, 2)} = ${round(eggF, 2)}, about ${Math.round(eggF)} trays.`,
    workedSolution: `1. Weekly changes: ${eggs[1]} − ${eggs[0]} = ${eggInc[0]}; ${eggs[2]} − ${eggs[1]} = ${eggInc[1]}; ${eggs[3]} − ${eggs[2]} = ${eggInc[2]}.\n2. Average change = ${eggInc.reduce((a, c) => a + c, 0)} ÷ 3 = ${round(eggAvg, 2)}.\n3. Forecast = ${eggs[3]} + ${round(eggAvg, 2)} = ${round(eggF, 2)} ≈ ${Math.round(eggF)} trays.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: `A hardware shop sold ${g0.toLocaleString("en-GB")} bags of cement last year. The owner expects sales to grow by ${gPct}% this year. Calculate the forecast sales this year.`,
    kind: "units", value: gF, wrong: [g0 + gPct, g0 * gPct / 100],
    explanation: `${g0.toLocaleString("en-GB")} × 1.${String(gPct).padStart(2, "0")} = ${gF.toLocaleString("en-GB")} bags.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A tailor's sales over five months were ${mv.join(", ")} garments. Calculate the three-month moving average for months 3 to 5.`,
    kind: "plain", value: mv3, wrong: [(mv[0] + mv[1] + mv[2]) / 3, (mv[2] + mv[3] + mv[4])],
    hints: ["Add the last three months and divide by 3."],
    explanation: `(${mv[2]} + ${mv[3]} + ${mv[4]}) ÷ 3 = ${mv3}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** problems an enterprise may face if its demand forecast is too high.",
    points: [
      "Problem 1: too much stock produced or bought / unsold goods.",
      "Explained: cash tied up in stock / storage costs / goods spoil or go out of date / must be sold cheaply.",
      "Problem 2: too many workers or too much capacity / borrowing for unneeded expansion.",
      "Explained: costs higher than needed, so profit falls / difficulty repaying loans.",
    ],
    hints: ["Think about stock, cash and costs."],
    modelAnswer: "If the forecast is too high, the enterprise makes or buys more stock than it can sell, so cash is tied up and perishable goods may spoil or be sold at a loss. It may also employ extra workers or borrow to expand, which raises costs that the lower sales cannot cover.",
    explanation: "Over-forecasting causes surplus stock, cash-flow problems and unnecessary costs.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 720, calculator: true,
    stem: `Rudo runs a brick-moulding enterprise near Masvingo. Her sales for the first four months of the year are shown below. She wants to know whether to hire two more workers from June.\n\n${bTbl}`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe the trend in Rudo's sales.", points: ["Sales are rising.", "By the same amount (1,500 bricks) each month / steady rise."] }),
      P.num({
        label: "(b)", marks: 3, stem: "Using the average monthly change, forecast Rudo's sales for June.",
        kind: "units", value: bJune, wrong: [bMay, bricks[3][1] + (bricks[3][1] - bricks[0][1])],
        explanation: `Average change = ${bAvg.toLocaleString("en-GB")}. May = ${bricks[3][1].toLocaleString("en-GB")} + ${bAvg.toLocaleString("en-GB")} = ${bMay.toLocaleString("en-GB")}; June = ${bMay.toLocaleString("en-GB")} + ${bAvg.toLocaleString("en-GB")} = ${bJune.toLocaleString("en-GB")}.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain **one** reason why actual sales in June may be lower than the forecast.",
        points: ["Reason relevant to bricks, e.g. rainy season stops building / new competitor / customers' incomes fall.", "Explains how it reduces demand for bricks.", "Applies: so hiring may leave Rudo with idle workers / unsold bricks."],
        modelAnswer: "If building slows down, for example because of rain or because people have less money to spend on houses, fewer bricks will be bought. Rudo could then be paying two extra workers while bricks pile up unsold.",
      }),
      P.manual({
        label: "(d)", marks: 5, stem: "Recommend whether Rudo should hire two more workers from June. Justify your answer.",
        points: ["Uses the forecast: demand rising steadily.", "Benefit: meets demand, avoids lost sales to rivals.", "Risk: forecast may be wrong; wages are a fixed commitment.", "Alternative, e.g. temporary / casual workers or overtime first, then review.", "Justified recommendation."],
        modelAnswer: `The trend is rising by ${bAvg.toLocaleString("en-GB")} bricks a month, and the June forecast is ${bJune.toLocaleString("en-GB")}, so extra workers would help Rudo meet orders instead of losing them to rivals. However, the forecast assumes the trend continues, and building may slow down. Rudo should hire two casual workers on short contracts from June and compare actual sales with the forecast each month before making the jobs permanent.`,
      }),
    ],
    hints: ["(b) Add the average change twice: once for May, once for June.", "(d) Balance lost sales against the risk of extra wages."],
    explanation: `(a) Rising by ${bAvg.toLocaleString("en-GB")} a month. (b) ${bJune.toLocaleString("en-GB")} bricks. (c) Seasonal or economic factors. (d) A justified decision, e.g. casual workers first.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 720, calculator: true,
    stem: `Farai repairs radios in Bulawayo. The number of radios repaired each year is shown below. Farai wants to borrow money to buy equipment for repairing radios.\n\n${decTbl}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage fall in repairs from Year 1 to Year 2.",
        kind: "pct", dp: 0, value: decPct, wrong: [round(((dec[0][1] - dec[1][1]) / dec[1][1]) * 100, 0)],
        explanation: `(${dec[0][1].toLocaleString("en-GB")} − ${dec[1][1].toLocaleString("en-GB")}) ÷ ${dec[0][1].toLocaleString("en-GB")} × 100 = ${decPct}%.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Repairs fell by the same percentage in Year 3. Assuming the trend continues, forecast the number of repairs in Year 4.",
        kind: "units", value: decF, wrong: [dec[2][1] - (dec[0][1] - dec[1][1]), dec[2][1]],
        explanation: `${dec[2][1]} × (1 − 0.${decPct}) = ${decF}.`,
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether Farai should borrow to buy the equipment.",
        points: ["Forecast shows a falling trend (fewer radios repaired each year).", "Likely reason: people use phones / cheap new radios; demand will keep falling.", "Loan repayments are fixed but revenue is falling: risk of not repaying.", "Counter-argument: equipment may cut costs or attract rivals' customers; forecast may be wrong.", "Alternative: use the money to repair phones or other products with growing demand.", "Justified conclusion."],
        modelAnswer: `Repairs are falling by ${decPct}% a year, and the Year 4 forecast is only ${decF}. This is probably because people now listen on phones or buy cheap new radios, so the fall is likely to continue. Borrowing for radio equipment would add fixed repayments while revenue falls, risking default. The equipment might win customers from rivals, but in a shrinking market that gain is limited. Farai should not borrow for radio repairs; he should consider training to repair mobile phones, where demand is likely to be growing.`,
      }),
    ],
    hints: ["(a) Divide the fall by the Year 1 figure.", "(c) What does the trend suggest about future demand?"],
    explanation: `(a) ${decPct}%. (b) ${decF}. (c) A falling trend makes a loan for radio equipment risky.`,
  });
  b.card("DEFINITION", "What is **demand forecasting**?", "Estimating future demand (sales) for a product over a given period, using judgement, research or past sales.");
  b.card("CONCEPT", "Why forecast demand?", "To plan production, purchasing and stock, staffing, cash budgets, finance and marketing.");
  b.card("CONCEPT", "Qualitative forecasting methods?", "Opinion of sales staff, expert opinion, consumer surveys of buying intentions (useful for new products).");
  b.card("CONCEPT", "Quantitative forecasting methods?", "Trends from past sales: average change, percentage growth, moving averages, extending a line graph.");
  b.card("FORMULA", "Forecast using the average change?", "Latest figure + average change per period (average change = total change ÷ number of changes).");
  b.card("DEFINITION", "Seasonal demand?", "Demand that rises and falls at the same times each year (uniforms in January, cold drinks in hot months).");
  b.card("CONCEPT", "Why forecasts may be wrong?", "Changes in tastes, new competitors, economic changes, weather, government policy, trends not continuing.");
  b.card("FACT", "Which forecasts are least reliable?", "Long-range forecasts: the further ahead, the more can change.");
});
