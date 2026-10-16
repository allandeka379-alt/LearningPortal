// W1a: size.measuring
import { concept, P, table, r2, rd, market, pctChange, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.size.measuring", { file: "size/measuring", keyPrefix: "size.measuring" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is **market share** calculated?",
    ok: ["Firm's sales ÷ total market sales × 100", "Correct: it shows the firm's proportion of the market."],
    bad: [["Firm's profit ÷ firm's sales × 100", "That is a profit margin, not market share."], ["Total market sales ÷ firm's sales × 100", "This inverts the fraction."], ["Firm's sales ÷ number of employees", "That is sales per employee."]],
    explanation: "Market share is a firm's sales as a percentage of total market sales.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is a measure of the **size** of a business?",
    ok: ["The number of people it employs", "Correct: employees are a common measure of size."],
    bad: [["The colour of its logo", "Appearance says nothing about size."], ["The age of its owner", "Owner's age is unrelated to size."], ["The language used in its adverts", "Language says nothing about size."]],
    explanation: "Employees, revenue, capital employed, market share and outlets are measures of size.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why can **number of employees** be a misleading measure of size?",
    ok: ["A firm using machines may employ few people", "Correct: machines can replace workers in a large business."],
    bad: [["Employees are always paid exactly the same wage", "Wages differ, and that is not the issue."], ["Workers never leave a business once hired", "Staff turnover is not the issue."], ["Large firms never employ more than ten people", "Large firms may employ thousands."]],
    explanation: "A highly automated plant can be large with few workers.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is **profit** not normally accepted as a measure of the size of a business?",
    ok: ["It shows performance, not scale", "Correct: a small firm can be very profitable and a large firm can make a loss."],
    bad: [["It cannot be expressed in money", "Profit is measured in money."], ["It is always the same for large and small firms", "Profits differ widely."], ["It can only be calculated for sole traders", "All businesses can calculate profit."]],
    explanation: "Profit depends on efficiency, prices and costs, not just on size.",
  });
  const share = market.share(180000, 1200000);
  chk(share, 15, 0.0001);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional supermarket in Mutare has annual sales of US\\$180,000 in a town market worth US\\$1,200,000 a year. What is its market share?",
    ok: ["15%", "Correct: 180,000 ÷ 1,200,000 × 100 = 15%."],
    bad: [["6.7%", "This inverts the calculation (1,200,000 ÷ 180,000 is 6.7)."], ["85%", "This is the share of all other firms combined."], ["150%", "A market share cannot be over 100%; this divides incorrectly."]],
    hints: ["Divide the firm's sales by total market sales."],
    explanation: "180,000 ÷ 1,200,000 × 100 = 15%.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional quarry employs 9 workers but owns machines worth US\\$800,000. A fictional call centre employs 60 workers and owns equipment worth US\\$50,000. Which statement is correct?",
    ok: ["The quarry leads on capital, the call centre on staff", "Correct: each measure gives a different answer."],
    bad: [["The quarry is larger by both measures used", "The call centre has more employees."], ["The call centre is larger by both measures used", "The quarry has more capital."], ["The two are exactly the same size by every measure", "The figures are clearly different."]],
    hints: ["Compare the firms on each measure in turn."],
    explanation: "The quarry is capital intensive, the call centre is labour intensive, so the measures disagree.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A firm's sales rise by 5% in a year, but the market in which it sells grows by 9%. What happens to the firm's market share?",
    ok: ["It falls, even though sales have risen", "Correct: the market grew faster than the firm's sales."],
    bad: [["It rises, because sales rose", "Share depends on growth relative to the market."], ["It stays the same, as sales rose", "Share would be unchanged only if both grew at the same rate."], ["It cannot be calculated without profit", "Market share uses sales, not profit."]],
    hints: ["Compare the growth rates."],
    explanation: "When the market grows faster than the firm, its share falls.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A government wants to give help to \"small businesses\" only. Which statement is the best judgement on how to define small?",
    ok: ["Combine employees and revenue, as one may mislead", "Correct: combining measures reduces the risk of misclassification."],
    bad: [["Use only profit, as it shows size most clearly", "Profit shows performance, not size."], ["Use only the number of outlets, as it is always exact", "Outlets differ greatly in size."], ["Use no measure, since size cannot be measured", "Size can be measured with care."]],
    hints: ["Look for the answer that combines measures."],
    explanation: "Combining measures lessens the problems of any one measure.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A firm's market share can fall even if its sales rise.",
    answer: true,
    explanation: "True. If the market grows faster than the firm's sales, its share of the market falls.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business with more outlets is always larger than a business with fewer outlets.",
    answer: false,
    explanation: "False. Outlets can differ greatly in size; one large store may be bigger than five kiosks.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each measure of size to a weakness.",
    pairs: [["Number of employees", "Understates capital-intensive firms"], ["Revenue", "May be inflated by high-priced products"], ["Capital employed", "Asset values are hard to compare"], ["Market share", "Depends on how the market is defined"]],
    explanation: "Each measure has its own weakness.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Market share is a firm's {{blank:a}} divided by {{blank:b}} market sales, multiplied by 100.",
    blanks: [
      { id: "a", accepted: ["sales"], choices: ["sales", "profit", "costs"] },
      { id: "b", accepted: ["total"], choices: ["total", "average", "smallest"] },
    ],
    explanation: "Market share = firm's sales ÷ total market sales × 100.",
  });

  const sh = market.share(345000, 1500000);
  chk(sh, 23, 0.0001);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: sh, calculator: true, daily: true, wrong: [r2(1500000 / 345000), r2((1500000 - 345000) / 1500000 * 100)],
    stem: "A fictional furniture maker in Gweru has annual sales of US\\$345,000 in a market worth US\\$1,500,000. Calculate its market share, to one decimal place.",
    hints: ["Sales ÷ total market × 100."],
    explanation: "345,000 ÷ 1,500,000 × 100 = 23.0%. Inverting the fraction gives 4.35, and 77.0% is the share of everyone else.",
  });
  const spe = 540000 / 18;
  chk(spe, 30000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: spe, calculator: true, wrong: [540000 * 18, 18 / 540000],
    stem: "A fictional printing firm in Harare has annual revenue of US\\$540,000 and 18 employees. Calculate its revenue per employee.",
    hints: ["Divide revenue by employees."],
    explanation: "540,000 ÷ 18 = US\\$30,000 per employee.",
  });
  const newShare = market.share(372600, 1620000);
  chk(newShare, 23, 0.0001);
  const needed = 0.23 * 1620000;
  chk(needed, 372600, 0.01);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "money", value: needed, calculator: true, wrong: [345000, 345000 * 1.08 + 1000],
    stem: "The furniture maker above (market share 23.0%) finds that the whole market grows by 8% to US\\$1,620,000. Calculate the sales the firm needs to keep its market share at 23.0%.",
    hints: ["Share × new market size."],
    explanation: "Required sales = 23% × 1,620,000 = US\\$372,600, which is an 8% rise on US\\$345,000. If its sales stay at US\\$345,000, its share falls to 21.3%.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** way of measuring the size of a business.",
    accepted: ["revenue", "turnover", "sales", "number of employees", "employees", "capital employed", "market share", "number of outlets", "outlets", "sales revenue"],
    explanation: "Accept revenue (turnover), employees, capital employed, market share or number of outlets.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** limitation of using revenue to measure the size of a business.",
    points: ["Revenue depends on prices as well as the amount sold", "A firm selling high-priced goods may seem larger than one selling many low-priced goods", "Revenue ignores the number of workers and the capital invested"],
    modelAnswer: "Revenue depends on prices as well as quantity, so a firm selling a few high-priced goods may seem larger than one selling many cheap ones. It also ignores how many people work in the firm and how much capital is invested.",
    hints: ["Think of price and of what revenue leaves out."],
    explanation: "A limitation, developed.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional gold-mining firm in Kadoma has 22 employees and capital employed of US\\$2,500,000. Explain **two** reasons why measuring its size by number of employees would be misleading.",
    points: ["A mine is capital intensive: machines do most of the work", "Application: 22 employees would make it look small despite US\\$2,500,000 of investment", "Employees do not show the value of output", "Application: the mine could produce high revenue with few workers"],
    modelAnswer: "A mine is capital intensive, so machines do much of the work and 22 employees make it look small even though US\\$2,500,000 is invested. The number of employees also says nothing about the value of output, so the mine could have high revenue with few workers.",
    hints: ["What does the employee count leave out?"],
    explanation: "Two reasons, applied to the mine.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a firm's market share might fall even though its sales have increased.",
    points: ["Market share compares the firm's sales with total market sales", "The market may have grown faster than the firm's sales", "Competitors may have gained more sales", "So the firm's proportion of the market falls, even though its own sales increase"],
    modelAnswer: "Market share compares a firm's sales with the sales of the whole market. If the market grows faster than the firm, for example because rivals win new customers, the firm's proportion of the market falls even though its own sales increase.",
    hints: ["Compare growth in the firm's sales with growth in the market."],
    explanation: "A chain of reasoning about relative growth.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional bank must decide whether a bakery is a \"large\" business for the purposes of a loan scheme. Evaluate which measure(s) of size the bank should use.",
    points: ["Capital employed shows the investment at risk and the assets available as security", "Revenue shows the scale of trading and the ability to repay", "Employees show the jobs affected but may mislead for capital-intensive firms", "Market share is less relevant to repayment", "Using more than one measure reduces the risk of being misled", "Judgement and reason, e.g. revenue and capital employed together"],
    modelAnswer: "The bank is concerned with repayment, so revenue and capital employed are most relevant: revenue shows the scale of trading and capital employed shows the investment and available security. Employees show the jobs affected but can mislead for a capital-intensive firm, and market share says little about repayment. The bank should use revenue and capital employed together, so that one measure does not mislead.",
    hints: ["Link each measure to the bank's purpose."],
    explanation: "Measures judged against a purpose.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "The table shows the annual sales of three fictional bakeries in Masvingo, which together are the whole market.\n\n" + table(["Bakery", "Annual sales (US\\$)", "Employees"], [["Tafara Bakery", 270000, 24], ["Mhofu Breads", 450000, 60], ["Dube Pastries", 180000, 9]]),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: (450000 / 900000) * 100, stem: "Calculate Mhofu Breads' market share.", wrong: [r2(450000 / 270000 * 100), 50.5], explanation: "Total market = 270,000 + 450,000 + 180,000 = 900,000. 450,000 ÷ 900,000 × 100 = 50.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 180000 / 9, stem: "Calculate Dube Pastries' sales per employee.", wrong: [270000 / 24, 180000 * 9], explanation: "180,000 ÷ 9 = US\\$20,000." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why Dube Pastries looks small on one measure but not on another.", points: ["Dube has only 9 employees, the smallest number", "But its sales per employee (US\\$20,000) are higher than Mhofu's (US\\$7,500)", "So employees alone understate how much it sells relative to its workforce"], modelAnswer: "Dube has the fewest employees, 9, so it looks small by workforce. But each employee generates US\\$20,000 of sales, more than Mhofu's US\\$7,500, so it is productive for its size and is not as small as the employee count suggests.", explanation: "Mhofu: 450,000 ÷ 60 = 7,500." }),
    ],
    hints: ["Find total market sales first."],
    explanation: "Mhofu 50.0%; Dube US\\$20,000 per employee.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "A fictional government scheme offers cheap loans to small businesses, defined as those with fewer than 50 employees. Fictional Rudo's Cold Storage in Bulawayo has 12 employees but owns refrigerated warehouses worth US\\$1,800,000 and has annual revenue of US\\$3,000,000. Fictional Sipho's Knitwear has 70 employees, equipment worth US\\$40,000 and annual revenue of US\\$280,000.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why the scheme's definition of small may be unfair.", points: ["It uses only the number of employees", "Rudo's has few employees but large assets and revenue, so it counts as small", "Sipho's has many employees but small assets and revenue, so it does not qualify"], modelAnswer: "The definition uses employees only. Rudo's has 12 employees, so it counts as small even though its assets and revenue are large, while Sipho's has 70 employees but low revenue and assets, so it is excluded.", explanation: "Uses the case data." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate a better way to define a small business for the scheme.", points: ["Use more than one measure, for example employees and revenue", "Revenue would show Rudo's is not small", "Capital employed could show the investment, but valuation can be difficult", "A combined test is harder to administer", "Different industries may need different limits", "Judgement and reason"], modelAnswer: "A combined test using employees and revenue would classify Rudo's as large because its revenue is US\\$3,000,000 and Sipho's as small because its revenue is only US\\$280,000. Capital employed could also be used, but asset values are harder to compare. A combined test is harder to administer, and different industries may need different limits. On balance, employees plus revenue is the better definition because it avoids the unfair outcomes in the case.", hints: ["Test your definition on both firms."], explanation: "A proposal tested on the case." }),
    ],
    hints: ["Compare the firms on several measures."],
    explanation: "Employees alone misclassify both firms; combined measures do better.",
  });

  b.card("DEFINITION", "Market share", "A firm's sales as a percentage of total market sales: firm's sales ÷ total market sales × 100.");
  b.card("FORMULA", "Market share (%)", "Firm's sales ÷ total sales in the market × 100.");
  b.card("FACT", "Measures of business size", "Revenue (turnover), number of employees, capital employed, profit, market share and number of outlets.");
  b.card("DEFINITION", "Capital employed", "Long-term finance invested in a business: owners' capital plus long-term loans.");
  b.card("CONCEPT", "Why profit is not a measure of size", "It shows performance, not scale: a small firm may be very profitable and a large one may make a loss.");
  b.card("CONCEPT", "Problem with counting employees", "Misleading for capital-intensive firms, which have few workers but large investment.");
  b.card("CONCEPT", "Market share and market growth", "Share falls if the market grows faster than the firm's sales, even when the firm's sales rise.");
  b.card("CONCEPT", "Choosing a measure", "Use more than one measure and match it to the purpose: lenders look at capital and revenue, unions at employees, advertisers at market share.");
  b.card("FORMULA", "Revenue per employee", "Revenue ÷ number of employees.");
});
