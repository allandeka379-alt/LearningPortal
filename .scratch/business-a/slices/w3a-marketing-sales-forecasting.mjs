// W3a: marketing.sales-forecasting (W3a owns the moving-average conventions: additive model, centred four-quarter
// moving average, seasonal variation = actual - centred average, averages NOT adjusted unless the stem says so,
// forecast = last centred average + stated quarterly trend change x quarters ahead + average seasonal variation)
import { concept, P, table, r2, movingAverage4, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

const B = [30, 46, 58, 36, 34, 50, 64, 40, 38, 54, 70, 44];
const LAB = ["Y1 Q1", "Y1 Q2", "Y1 Q3", "Y1 Q4", "Y2 Q1", "Y2 Q2", "Y2 Q3", "Y2 Q4", "Y3 Q1", "Y3 Q2", "Y3 Q3", "Y3 Q4"];
const m = movingAverage4(B, { adjust: false });
const row = (i) => m.rows[i - 1];
const salesTable = table(["Period", "Room-nights sold (hundreds)"], B.map((v, i) => [LAB[i], v]));
// checked values
const c3 = row(3).centred, s3 = row(3).seasonal;
chk(c3, 43, 1e-9);
chk(s3, 15, 1e-9);
const avgQ1 = (row(5).seasonal + row(9).seasonal) / 2;
chk(avgQ1, -11.5, 1e-9);
const avgQ3 = (row(3).seasonal + row(7).seasonal) / 2;
chk(avgQ3, 15.75, 1e-9);
const lastCentred = row(10).centred;
chk(lastCentred, 51, 1e-9);
const fcQ1 = lastCentred + 1.2 * 3 + avgQ1; // Y4 Q1 is three quarters after Y3 Q2
chk(fcQ1, 43.1, 1e-9);
const fcQ3 = lastCentred + 1.2 * 5 + avgQ3; // Y4 Q3 is five quarters after Y3 Q2
chk(fcQ3, 72.75, 1e-9);
// second data set (practice structured item)
const D2 = [99, 109, 117, 107, 107, 117, 127, 115, 115, 125, 133, 123];
const mD = movingAverage4(D2, { adjust: false });
const dAvgQ3 = (mD.rows[2].seasonal + mD.rows[6].seasonal) / 2;
chk(dAvgQ3, 8.75, 1e-9);
chk(mD.rows[9].centred, 123, 1e-9);
const dFc = mD.rows[9].centred + 2 * 5 + dAvgQ3;
chk(dFc, 141.75, 1e-9);
chk((mD.rows[4].seasonal + mD.rows[8].seasonal) / 2, -6.25, 1e-9);

concept("abus.marketing.sales-forecasting", { file: "marketing/sales-forecasting", keyPrefix: "marketing.sales-forecasting" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of a **sales forecast**?",
    ok: ["To plan production, stock, staff and cash in advance", "Correct: forecasts guide decisions made before sales happen."],
    bad: [["To record the exact sales that were made last year", "That is a record of past sales, not a forecast."], ["To guarantee that future sales will reach the target", "Forecasts are estimates and guarantee nothing."], ["To calculate the profit shown in the final accounts", "Profit is found from the accounts, not from a forecast."]],
    explanation: "Forecasts help managers to plan resources before the sales take place.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **qualitative** forecasting method?",
    ok: ["The Delphi method with a panel of experts", "Correct: it uses expert opinion rather than numbers."],
    bad: [["A four-quarter centred moving average", "This uses past numerical data."], ["Calculating seasonal variations from sales data", "This is a quantitative method."], ["Extending the trend line by a fixed amount each quarter", "Extrapolation of a trend is quantitative."]],
    explanation: "The Delphi method uses the opinions of experts; moving averages and trends are quantitative.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A fictional ice-cream seller's sales in the summer quarter are 12 above the trend. What is the seasonal variation for that quarter?",
    ok: ["+12", "Correct: actual sales minus the trend is positive."],
    bad: [["−12", "This has the subtraction the wrong way round."], ["0", "A variation of zero means actual sales equal the trend."], ["+1.2", "This divides the difference by 10."]],
    explanation: "Seasonal variation (additive) = actual − trend = +12.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a four-quarter moving average used to find the trend in quarterly data?",
    ok: ["Four quarters make a year, so the seasonal effects cancel out", "Correct: each average contains one of each season."],
    bad: [["It always gives a value that equals the actual sales figure each time", "It smooths the data and so differs from actual sales."], ["It shows the highest sales in each year of the whole data", "It is an average, not a maximum."], ["It forecasts next year's sales without needing any further steps", "A forecast needs the trend and seasonal variations."]],
    explanation: "Averaging four quarters includes each season once, so the seasonal pattern is removed and the trend remains.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional lodge's weekly bookings in four consecutive quarters are 18, 26, 32 and 20 (hundreds). What is the moving average of these four quarters?",
    ok: ["24.0", "Correct: (18 + 26 + 32 + 20) ÷ 4 = 24."],
    bad: [["96.0", "This is the moving total before dividing by 4."], ["26.0", "This is one of the quarters, not the average."], ["20.0", "This is the last value, not the average."]],
    hints: ["Add the four values, then divide by 4."],
    explanation: "Total = 96; 96 ÷ 4 = 24.",
  });
  chk((18 + 26 + 32 + 20) / 4, 24, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional new brewery in Bulawayo plans to launch a drink that no other firm sells. It has no sales history. Which method is MOST suitable for forecasting its first-year sales?",
    ok: ["A qualitative method such as expert opinion or a panel", "Correct: there is no past data for a time series."],
    bad: [["A four-quarter moving average of its own past sales", "There are no past sales to average."], ["The seasonal variations of its three previous years", "It has no previous years."], ["Extending a sales trend that has not been recorded", "No trend exists without data."]],
    hints: ["Does the brewery have any past figures?"],
    explanation: "Without historical data a qualitative method is the practical choice.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A manager uses a trend rising by 2 units a quarter to forecast sales for the next 8 quarters. A new rival then opens in the second quarter. Which is the BEST analysis of the risk?",
    ok: ["It assumes past conditions continue, so it may be too high", "Correct: a new rival breaks the assumption behind the trend."],
    bad: [["The forecast is certain because it was built using real figures", "Past figures do not guarantee the future."], ["The forecast is too low because rivals increase demand", "A rival normally takes sales away."], ["The rival does not matter as seasonal variations are fixed", "Seasonal variations do not remove the effect of a rival."]],
    hints: ["What does extrapolating a trend assume?"],
    explanation: "Time-series forecasts assume past patterns continue; a new rival or shock can make them inaccurate.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the BEST judgement of the value of a sales forecast produced using a moving average?",
    ok: ["Useful for planning, but reliable only if the pattern holds", "Correct: it is a guide that depends on its assumptions."],
    bad: [["Always accurate, since it is made by using exact calculations", "Exact arithmetic on past data does not make the forecast exact."], ["Useless, since no forecast can ever be right", "Forecasts help planning even if imperfect."], ["Reliable for any period, however far into the future", "Reliability falls the further ahead the forecast goes."]],
    hints: ["Look for a balanced statement."],
    explanation: "A forecast is a guide; its accuracy depends on the stability of the pattern and the length of the forecast.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the additive model, seasonal variation = actual sales − trend.",
    answer: true,
    explanation: "True. A positive value means that the quarter was above the trend.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each forecasting method to its description.",
    pairs: [["Expert opinion", "Specialists give their judgement of future sales"], ["Delphi method", "Anonymous rounds of questions to a panel with feedback"], ["Sales force opinion", "Estimates from staff who deal with customers"], ["Moving average", "Smooths past data to show the trend"]],
    explanation: "The first three are qualitative; the moving average is a quantitative technique.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "To find the trend in quarterly data, the moving average is {{blank:a}} so that it lines up with a quarter, and the seasonal variation is actual sales minus the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["centred"], choices: ["centred", "doubled", "rounded"] },
      { id: "b", accepted: ["trend"], choices: ["trend", "forecast", "profit"] },
    ],
    explanation: "A four-period average lies between two quarters, so it is centred; the seasonal variation is measured from the trend.",
  });

  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: c3, calculator: true, daily: true, wrong: [42.5, 44],
    stem: "A fictional hotel in Victoria Falls records room-nights sold (in hundreds) each quarter.\n\n" + salesTable + "\n\nThe moving total of Y1 Q1 to Y1 Q4 is 170 and of Y1 Q2 to Y2 Q1 is 174. Calculate the centred moving average for Y1 Q3 (in hundreds of room-nights).",
    hints: ["Divide each moving total by 4, then find the mean of the two averages."],
    explanation: "170 ÷ 4 = 42.5 and 174 ÷ 4 = 43.5. The centred average = (42.5 + 43.5) ÷ 2 = 43.0. The first moving average (42.5) is not yet centred.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: s3, calculator: true, wrong: [-15, 43],
    stem: "A fictional hotel in Victoria Falls sold 58 hundred room-nights in the third quarter of its first year. The centred moving average for that quarter is 43. Calculate the seasonal variation (additive model, in hundreds of room-nights).",
    hints: ["Actual − trend."],
    explanation: "Actual sales in Y1 Q3 were 58. Seasonal variation = 58 − 43 = +15.",
  });
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", value: avgQ3, dp: 2, calculator: true, wrong: [16.5, 15],
    stem: "The hotel's seasonal variations for the third quarter are +15 (Y1 Q3) and +16.5 (Y2 Q3). Calculate the average seasonal variation for the third quarter, to two decimal places (do not adjust).",
    hints: ["Add the two values and divide by 2."],
    explanation: "(15 + 16.5) ÷ 2 = 15.75.",
  });
  b.calc({
    d: 5, skill: "ANALYSIS", kind: "plain", value: fcQ1, dp: 1, calculator: true, wrong: [lastCentred + 3.6, fcQ1 - 3.6],
    stem: "For the hotel, the last centred moving average is 51 (Y3 Q2). The trend is expected to rise by 1.2 (hundred room-nights) each quarter. The average seasonal variation for the first quarter is −11.5. Forecast room-nights (in hundreds) for Y4 Q1, which is three quarters after Y3 Q2, to one decimal place.",
    hints: ["Extend the trend first, then add the seasonal variation."],
    explanation: "Trend for Y4 Q1 = 51 + 3 × 1.2 = 54.6. Forecast = 54.6 + (−11.5) = 43.1. Forgetting to extend the trend gives 39.5; ignoring the seasonal variation gives 54.6.",
    workedSolution: "1. Trend in Y4 Q1 = 51 + 3 × 1.2 = 54.6.\n2. Forecast = 54.6 + (−11.5) = 43.1 hundred room-nights.",
  });
  chk(51 - 11.5, 39.5, 1e-9);

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the forecasting method in which a panel of experts answers questions anonymously over several rounds.",
    accepted: ["delphi", "delphi method", "the delphi method", "delphi technique"],
    explanation: "The Delphi method.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** reason why a business forecasts its sales.",
    points: ["It needs to plan production and inventory", "Without a forecast it may produce too little or too much", "Too little loses sales; too much ties up cash in unsold inventory"],
    modelAnswer: "A business needs a forecast to plan production and inventory. Without it, it might produce too little and lose sales, or too much and tie up cash in unsold inventory.",
    hints: ["Think of the cost of a wrong plan."],
    explanation: "A reason developed to its effect.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional farm shop in Masvingo sells twice as much in December as in March. Explain **two** ways in which knowing this seasonal pattern helps the owner.",
    points: ["Order more stock before December", "Application: so shelves are full and sales are not lost", "Hire extra staff or hours in December", "Application: to serve the extra customers without long queues"],
    modelAnswer: "The owner can order more stock before December so that shelves are full and sales are not lost. The owner can also employ extra staff for December to serve the extra customers without long queues.",
    hints: ["Think of stock and staff."],
    explanation: "Two planning uses of a seasonal pattern.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a forecast made with a moving average might be inaccurate for a fictional bus company in Gweru.",
    points: ["It assumes the past trend continues", "Fares, fuel costs or a new rival can change demand", "Seasonal patterns may change", "So actual passenger numbers may differ from the forecast, causing too many or too few buses"],
    modelAnswer: "A moving average assumes that the past trend continues. A fare change, higher fuel costs or a new rival can change demand, and the seasonal pattern may also change. Actual passenger numbers may then differ from the forecast, leaving too many or too few buses.",
    hints: ["Think of what the method assumes."],
    explanation: "A chain from assumption to the consequence.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional furniture retailer wants to forecast sales for a new range. Evaluate the use of the Delphi method compared with a consumer panel.",
    points: ["Delphi uses experts, who can judge technical and market trends", "Anonymity reduces the influence of dominant people", "Delphi is slow and costly", "A consumer panel gives direct customer evidence", "Intentions may differ from actual purchases and the panel may be too small", "Judgement with reason, e.g. use both and compare"],
    modelAnswer: "The Delphi method uses experts who can judge trends, and anonymity stops dominant people controlling the result, but it is slow and costly. A consumer panel gives direct customer evidence, but what people say they will buy may differ from what they buy, and a small panel may not represent the market. The retailer should use both, compare the results and be cautious where they differ.",
    hints: ["Weigh the strengths and weaknesses of each."],
    explanation: "Two qualitative methods compared, with a judgement.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
    stem: "A fictional safari lodge near Hwange records its bed-nights sold each quarter (hundreds).\n\n" + table(["Period", "Sales", "Centred moving average", "Seasonal variation"], D2.map((v, i) => [LAB[i], v, mD.rows[i].centred ?? "", mD.rows[i].seasonal ?? ""])) + "\n\nThe trend is expected to rise by 2.0 per quarter. Use the average seasonal variation without adjustment.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", value: dAvgQ3, dp: 2, stem: "Calculate the average seasonal variation for the third quarter, to two decimal places.", wrong: [9.5, 8], explanation: "Seasonal variations for the third quarter: +8 (Y1) and +9.5 (Y2). Average = (8 + 9.5) ÷ 2 = +8.75." }),
      P.num({ label: "(b)", marks: 3, kind: "plain", value: dFc, dp: 2, stem: "Forecast bed-nights (hundreds) for Y4 Q3, which is five quarters after Y3 Q2 (last centred average 123), to two decimal places.", wrong: [123 + 2 * 5, 123 + 8.75], explanation: "Trend = 123 + 5 × 2.0 = 133. Forecast = 133 + 8.75 = 141.75." }),
      P.manual({ label: "(c)", marks: 4, stem: "Assess the reliability of this forecast.", points: ["The seasonal pattern is fairly stable: the first quarter's variations (−6.25 in both years) agree closely", "The trend has been steady (+2.0 per quarter)", "Only three years of data, so the pattern may not hold", "A new lodge, a currency or tourism shock could change demand"], modelAnswer: "The seasonal pattern looks stable because the variations for the same quarter in different years are close, and the trend has risen steadily by 2.0 per quarter, so the forecast is a reasonable guide. However, there are only three years of data, and a new lodge or a shock to tourism could change demand. The forecast should be reviewed each quarter.", explanation: "Reliability depends on stability and the assumptions." }),
    ],
    hints: ["Extend the trend before adding the seasonal variation."],
    explanation: "Average seasonal variation for Q3 +8.75; Y4 Q3 forecast 141.75; the forecast is a guide, not a guarantee.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true,
    stem: "Read the extract. Chipo's Crafts is a fictional business in Harare selling gifts to tourists and locals. Sales are highest in the school holidays and in December. The owner is trying to decide how much stock to order for the next year. She has three years of quarterly sales records, but she also plans to add a new range of carvings that she has never sold before.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain how time-series analysis could help Chipo with her existing products.", points: ["It uses past quarterly sales to find the trend", "It shows the seasonal highs and lows", "So she can order more stock for the busy quarters"], modelAnswer: "Time-series analysis uses her past quarterly sales to find the trend and the seasonal highs and lows. She can then order more stock for the busy quarters and less for the quiet ones.", explanation: "Trend and seasonal pattern applied to stock." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate the methods Chipo could use to forecast sales of the new carvings.", points: ["There is no past data, so time-series analysis cannot be used", "Expert opinion (for example a craft trader) gives informed judgement", "A consumer panel or sample of customers shows interest", "But opinions and intentions may be wrong", "She could start with a small order and learn from real sales", "Judgement with reason, e.g. combine opinion with a small trial order"], modelAnswer: "Chipo has no past sales of carvings, so she cannot use time-series analysis. A craft trader's opinion would give an informed judgement and a panel of customers would show interest, but opinions and intentions can be wrong. She should combine them with a small trial order, which gives real sales data at low risk.", explanation: "Qualitative methods suit a new product." }),
    ],
    hints: ["Does she have data for the carvings?"],
    explanation: "Time series for existing products; qualitative methods and a trial for the new range.",
  });

  b.card("DEFINITION", "Sales forecast", "An estimate of the sales a business will make in a future period.");
  b.card("DEFINITION", "Trend", "The underlying long-term direction of sales once seasonal and random variations are removed.");
  b.card("FORMULA", "Seasonal variation (additive)", "Actual sales − centred moving average (the trend).");
  b.card("FORMULA", "Centred four-quarter moving average", "Moving total of 4 quarters ÷ 4, then the mean of two consecutive moving averages.");
  b.card("FORMULA", "Forecast with a trend and seasonal variation", "Last centred average + trend change × quarters ahead + average seasonal variation for that quarter.");
  b.card("DEFINITION", "Delphi method", "Experts answer questions anonymously over several rounds, seeing a summary of the group's views each time.");
  b.card("FACT", "Qualitative forecasting methods", "Expert opinion, the Delphi method, sales force opinion and consumer panels.");
  b.card("FACT", "Limitations of forecasts", "Future may differ from the past, outside shocks, short or inaccurate data, changing seasons, bias in opinions.");
  b.card("CONCEPT", "Using forecasts", "Plan production, inventory, staffing and cash; review against actual sales and combine methods.");
});
