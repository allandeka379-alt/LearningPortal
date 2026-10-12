// W3b: ratios.investment
import { concept, P, ZIM, table, chk, r2, ratios } from "../lib.mjs";
import { mc, F, usd } from "../tables/w3b-lib.mjs";

const p1 = (v) => (Math.round(v * 10) / 10).toFixed(1);
const p2 = (v) => (Math.round(v * 100) / 100).toFixed(2);
const eps = (profit, shares) => (profit / shares) * 100;
const dps = (div, shares) => (div / shares) * 100;
const pe = (priceUsd, e) => (priceUsd * 100) / e;
const yld = (d, priceUsd) => (d / (priceUsd * 100)) * 100;

concept("aacc.ratios.investment", { file: "ratios/investment", keyPrefix: "ratios.investment" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is earnings per share calculated?",
    ok: ["Profit for the year divided by the number of ordinary shares in issue", "Correct: it is usually quoted in cents."],
    bad: [["Ordinary dividends for the year divided by the number of ordinary shares", "That is the dividend per share."], ["Market price per share divided by the profit for the year", "That is not a standard ratio."], ["Profit for the year divided by the market price of one share", "That is a form of earnings yield, not EPS."]],
    explanation: "Earnings per share = profit for the year ÷ number of ordinary shares in issue.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A share has a price/earnings ratio of 12. What does this mean?",
    ok: ["The share price is twelve times the earnings per share", "Correct: investors pay twelve times the year's earnings."],
    bad: [["The earnings per share are twelve times the share price", "The ratio is the other way round."], ["The company pays twelve times its profit as dividends", "That would not be a price/earnings ratio."], ["The share will double in price in twelve months", "The ratio makes no prediction of this kind."]],
    explanation: "P/E = market price ÷ EPS, so a P/E of 12 means the price is twelve times the earnings per share.",
  });
  mc(b, {
    d: 2, skill: "RECALL",
    stem: "Dividend yield compares the dividend per share with:",
    ok: ["the market price of the share", "Correct: it is the cash return on the price paid."],
    bad: [["the nominal value of the share", "The nominal value is not what the investor paid."], ["the earnings per share", "That gives the dividend payout, not the yield."], ["the profit for the year of the company", "That is dividend cover (inverse)."]],
    explanation: "Dividend yield = dividend per share ÷ market price per share × 100.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A company reports earnings per share of 24 cents. Its shares are quoted at US\\$3.60. What is the price/earnings ratio?",
    ok: ["15", "Correct: 360 cents ÷ 24 cents."],
    bad: [["0.15", "The price was divided by the EPS in different units: dollars by cents."], ["150", "The EPS was converted from cents twice."], ["86.4", "The price in dollars was multiplied by the EPS in cents."]],
    hints: ["Convert the price to cents first."],
    explanation: "US\\$3.60 is 360 cents, and 360 ÷ 24 = 15 times. The other answers mix dollars and cents.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A company has a dividend cover of 0.8 times. What does this mean?",
    ok: ["The dividend is larger than the profit for the year, so part comes from past profits", "Correct: the dividend is not covered by current profit."],
    bad: [["The dividend is 80% of the market price of the share on the exchange", "That would be a yield, not a cover."], ["The company keeps 20% of its profit for the year", "Cover below 1 means more than all the profit is paid."], ["The dividend is safe because the cover is a positive number", "A cover below 1 is a warning sign."]],
    hints: ["Cover = profit ÷ dividend."],
    explanation: "A cover below 1 means the dividend exceeds the profit for the year, so the company is using retained profits and may not keep it up.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A company makes a bonus issue of one new share for every four held, with profit for the year unchanged. What is the immediate effect on earnings per share?",
    ok: ["It falls to four-fifths of its previous figure", "Correct: the same profit is shared over five-fourths as many shares."],
    bad: [["It rises by one quarter", "More shares mean less profit per share."], ["It does not change, because profit is unchanged", "The number of shares has increased."], ["It falls to three-quarters of its previous figure", "The new total is 5 for every 4, so EPS is 4/5, not 3/4."]],
    hints: ["Start with 4 shares and see how many there are after."],
    explanation: "Four shares become five. The same profit is spread over 25% more shares, so EPS is 4/5 of the old figure.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A company's price/earnings ratio is 25 and the average for its industry is 12. What is the most reasonable interpretation?",
    ok: ["Investors expect higher growth or lower risk than for a typical company in the industry", "Correct: they will pay more for each dollar of current earnings."],
    bad: [["The company is certain to earn a much higher profit in the next year", "A P/E does not guarantee future profit."], ["The shares must be a bargain compared with others in the industry", "A high P/E means the shares are dearer, not cheaper."], ["The company pays out more than its earnings in its dividends", "That is shown by the dividend cover, not the P/E."]],
    hints: ["A high P/E means a high price relative to current earnings."],
    explanation: "A high P/E reflects market confidence: investors accept a higher price per dollar of earnings because they expect growth or see lower risk.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A high dividend yield is always a sign of a successful company.", answer: false, explanation: "False. The yield can be high because the share price has fallen, or because the dividend is larger than the company can afford." });
  b.tf({ d: 3, skill: "UNDERSTANDING", daily: true, stem: "A company with a low dividend yield may still be a good investment for a shareholder seeking growth.", answer: true, hints: ["Where does the rest of the profit go?"], explanation: "True. The company may keep profit to expand, which can raise the share price and future earnings." });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each ratio to its formula.",
    pairs: ["Earnings per share", "Price/earnings ratio", "Dividend yield", "Dividend cover"],
    right: ["Profit for the year ÷ ordinary shares", "Market price ÷ earnings per share", "Dividend per share ÷ market price × 100", "Profit for the year ÷ ordinary dividend"],
    rightIndex: [0, 1, 2, 3],
    explanation: "EPS is per share; P/E relates price to earnings; yield relates dividend to price; cover relates profit to the dividend.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A share's price divided by its earnings per share gives the {{blank:a}} ratio. Profit for the year divided by the ordinary dividend gives dividend {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["price/earnings"], choices: ["price/earnings", "dividend yield", "gearing"] }, { id: "b", accepted: ["cover"], choices: ["cover", "yield", "per share"] }],
    explanation: "Price ÷ EPS is the price/earnings ratio; profit ÷ dividend is the dividend cover.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "In what unit is earnings per share normally quoted?", accepted: ["cents", "cent"], explanation: "EPS is normally quoted in cents per share." });

  // numerical items, each on its own figures
  const e1 = eps(84600, 600000);
  chk(e1, 14.1);
  b.num({
    d: 2, skill: "APPLICATION", kind: "cents", value: e1, dp: 1, calculator: true, daily: true, wrong: [84600 / 600000, 84600 / 60000],
    stem: `A company has ${F(600000)} ordinary shares in issue and made a profit for the year of ${usd(84600)}. Calculate earnings per share in cents to one decimal place.`,
    explanation: `${F(84600)} ÷ ${F(600000)} = US\\$0.141 = ${p1(e1)} cents. Leaving the answer as 0.141 gives the dollar figure, not cents.`,
  });
  const pe1 = pe(2.3, 18.4);
  chk(pe1, 12.5, 1e-9);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "times", value: pe1, dp: 1, calculator: true, wrong: [2.3 / 18.4, (18.4 / 230) * 100],
    stem: `A company's earnings per share were 18.4 cents and the market price of its shares was ${usd(2.3)}. Calculate the price/earnings ratio in times to one decimal place.`,
    hints: ["Put the price and the EPS in the same unit."],
    explanation: `Price = 230 cents. P/E = 230 ÷ 18.4 = ${p1(pe1)} times. Dividing 2.30 by 18.4 gives 0.125, which mixes dollars and cents.`,
  });
  const y1 = yld(9, 1.2);
  chk(y1, 7.5, 1e-9);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: y1, calculator: true, wrong: [9 / 120, 9 * 1.2],
    stem: `A company paid an ordinary dividend of 9.0 cents per share. The market price of the share at the year end was ${usd(1.2)}. Calculate the dividend yield as a percentage to one decimal place.`,
    hints: ["Convert the price to cents first."],
    explanation: `Price = 120 cents. Yield = 9.0 ÷ 120 × 100 = ${p1(y1)}%. Dividing 9 by 1.20 without converting gives 7.5 times the correct figure.`,
  });
  const cv = ratios.dividendCover(51600, 21500);
  chk(cv, 2.4, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "times", value: cv, dp: 1, calculator: true, wrong: [21500 / 51600, 51600 / (51600 - 21500)],
    stem: `A company made a profit for the year of ${usd(51600)} and paid ordinary dividends of ${usd(21500)}. Calculate dividend cover in times to one decimal place.`,
    hints: ["Cover shows how many times the dividend could be paid out of profit."],
    explanation: `${F(51600)} ÷ ${F(21500)} = ${p1(cv)} times. The inverse (${p2(21500 / 51600)}) is the proportion of profit paid out.`,
  });
  const ey = ratios.earningsYield(15, 250);
  chk(ey, 6, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: ey, calculator: true, applies: ZIM, wrong: [250 / 15, (15 / 250)],
    stem: `ZIMSEC style. Earnings yield = earnings per share ÷ market price × 100. A company has earnings per share of 15.0 cents and a market price of ${usd(2.5)}. Calculate the earnings yield as a percentage to one decimal place.`,
    hints: ["Use cents for both the EPS and the price."],
    explanation: `Price = 250 cents. Earnings yield = 15.0 ÷ 250 × 100 = ${p1(ey)}%. This is the inverse of the price/earnings ratio of ${p1(250 / 15)} times.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a company may pay a low dividend although its profit is high.",
    points: ["It may keep the profit to finance expansion or to repay loans", "The shareholders may benefit through a rising share price instead of through dividends"],
    modelAnswer: "The directors may retain profit to buy assets or repay loans, which can raise future profit and the share price, so the shareholders gain through growth.",
    explanation: "One mark for the retention of profit and one for the benefit to shareholders.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "A company's earnings per share rose from 18 cents to 24 cents, but its share price fell. Suggest two reasons why the price might fall and one limit of using EPS.",
    points: ["Reason 1: the market expects lower profit in future, or sees higher risk (for example high gearing)", "Reason 2: the whole market or industry has fallen, or investors prefer another investment", "Reason 2 or the profit may include a one-off gain that is not expected to continue", "Limit: EPS depends on the accounting policies and on the number of shares, and says nothing about the price paid"],
    modelAnswer: "The market may expect lower profit or more risk, or the profit may include a one-off gain. Prices also follow the whole market. EPS is a limited measure because it ignores the price paid and depends on accounting policies.",
    hints: ["The price depends on expectations, not on last year's profit alone."],
    explanation: "Two marks for reasons, one for a development, and one for the limit.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A retired teacher wants a regular income from her savings. A company has a dividend yield of 9.0% and a dividend cover of 0.9 times. Advise her whether the shares are suitable.",
    points: ["The yield of 9.0% is attractive for income", "The dividend cover is below 1, so the dividend is larger than the profit for the year", "The dividend is being paid partly from past profits and may be cut", "A cut would reduce her income and the share price", "Judgement: the shares are risky for a person who depends on the income; she should look for a lower yield with higher cover, or spread her money"],
    modelAnswer: "The 9.0% yield looks attractive, but the cover of 0.9 times shows the company is paying out more than it earns, so the dividend may be cut. As she depends on the income, the shares are too risky; a lower yield with higher cover would be safer.",
    hints: ["Look at both the yield and the cover."],
    explanation: "One mark each for the yield, the cover, the risk of a cut, the effect on her and the judgement.",
  });

  // Structured 1: 12 marks
  const A = { n: 350000, p24: 52000, p25: 66800, d24: 20000, d25: 26000, pr24: 1.3, pr25: 1.74 };
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Plumtree Packaging Ltd has ${F(A.n)} ordinary shares in issue. Give per-share figures in cents and ratios to one decimal place.\n\n${table(["Item", "2024", "2025"], [["Profit for the year (US$)", A.p24, A.p25], ["Ordinary dividends for the year (US$)", A.d24, A.d25], ["Market price at the year end (US$)", "1.30", "1.74"]]).replace(/US\$/g, "US\\$")}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate earnings per share for:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "cents", dp: 1, value: eps(A.p24, A.n), wrong: [A.p24 / A.n], stem: "2024", explanation: `${F(A.p24)} ÷ ${F(A.n)} = ${p1(eps(A.p24, A.n))} cents.` }),
        P.num({ label: "(ii)", marks: 1, kind: "cents", dp: 1, value: eps(A.p25, A.n), wrong: [A.p25 / A.n], stem: "2025", explanation: `${F(A.p25)} ÷ ${F(A.n)} = ${p1(eps(A.p25, A.n))} cents.` }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate dividend per share for:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "cents", dp: 1, value: dps(A.d24, A.n), wrong: [A.d24 / A.p24], stem: "2024", explanation: `${F(A.d24)} ÷ ${F(A.n)} = ${p1(dps(A.d24, A.n))} cents.` }),
        P.num({ label: "(ii)", marks: 1, kind: "cents", dp: 1, value: dps(A.d25, A.n), wrong: [A.d25 / A.p25], stem: "2025", explanation: `${F(A.d25)} ÷ ${F(A.n)} = ${p1(dps(A.d25, A.n))} cents.` }),
      ] }),
      P.num({ label: "(c)", marks: 2, kind: "times", dp: 1, value: pe(A.pr25, eps(A.p25, A.n)), wrong: [A.pr25 / eps(A.p25, A.n)], stem: "Calculate the price/earnings ratio for 2025.", explanation: `174 ÷ ${p1(eps(A.p25, A.n))} = ${p1(pe(A.pr25, eps(A.p25, A.n)))} times.` }),
      P.num({ label: "(d)", marks: 2, kind: "times", dp: 1, value: A.p25 / A.d25, wrong: [A.d25 / A.p25], stem: "Calculate dividend cover for 2025.", explanation: `${F(A.p25)} ÷ ${F(A.d25)} = ${p1(A.p25 / A.d25)} times.` }),
      P.manual({ label: "(e)", marks: 4, stem: "Comment on the performance of the company for its shareholders between 2024 and 2025.", points: [`Earnings per share rose from ${p1(eps(A.p24, A.n))} to ${p1(eps(A.p25, A.n))} cents`, `Dividend per share rose from ${p1(dps(A.d24, A.n))} to ${p1(dps(A.d25, A.n))} cents`, `The share price rose from US\\$1.30 to US\\$1.74, more than the earnings`, "Shareholders gained in income and in the value of their shares; the dividend is covered well, so it looks safe"], modelAnswer: "Earnings and dividend per share both rose, the share price rose even faster, and the dividend is covered comfortably, so shareholders have gained in income and in the value of their shares.", explanation: "One mark each for earnings, dividend, price and a conclusion." }),
    ],
    hints: ["Convert the price to cents for the P/E ratio."],
    explanation: "This item tests EPS, dividend per share, P/E and dividend cover with a comment.",
  });

  // Structured 2: 16 marks
  const M = { n: 300000, profit: 90000, div: 36000, price: 2.5 };
  const N = { n: 600000, profit: 114000, div: 96000, price: 1.6 };
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `A retired teacher in Masvingo has US\\$10,000 to invest for income and is choosing between the ordinary shares of two companies. Give per-share figures in cents and ratios to one decimal place.\n\n${table(["Item", "Company M", "Company N"], [["Ordinary shares in issue", M.n, N.n], ["Profit for the year (US\\$)", M.profit, N.profit], ["Ordinary dividends for the year (US\\$)", M.div, N.div], ["Market price per share (US\\$)", "2.50", "1.60"]])}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate earnings per share for:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "cents", dp: 1, value: eps(M.profit, M.n), wrong: [M.profit / M.n], stem: "Company M", explanation: `${F(M.profit)} ÷ ${F(M.n)} = ${p1(eps(M.profit, M.n))} cents.` }),
        P.num({ label: "(ii)", marks: 1, kind: "cents", dp: 1, value: eps(N.profit, N.n), wrong: [N.profit / N.n], stem: "Company N", explanation: `${F(N.profit)} ÷ ${F(N.n)} = ${p1(eps(N.profit, N.n))} cents.` }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate the dividend yield for:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "pct", value: yld(dps(M.div, M.n), M.price), wrong: [dps(M.div, M.n) / M.price], stem: "Company M", explanation: `DPS = ${p1(dps(M.div, M.n))} cents; ${p1(dps(M.div, M.n))} ÷ 250 × 100 = ${p1(yld(dps(M.div, M.n), M.price))}%.` }),
        P.num({ label: "(ii)", marks: 2, kind: "pct", value: yld(dps(N.div, N.n), N.price), wrong: [dps(N.div, N.n) / N.price], stem: "Company N", explanation: `DPS = ${p1(dps(N.div, N.n))} cents; ${p1(dps(N.div, N.n))} ÷ 160 × 100 = ${p1(yld(dps(N.div, N.n), N.price))}%.` }),
      ] }),
      P.group({ label: "(c)", stem: "Calculate dividend cover for:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "times", dp: 1, value: M.profit / M.div, wrong: [M.div / M.profit], stem: "Company M", explanation: `${F(M.profit)} ÷ ${F(M.div)} = ${p1(M.profit / M.div)} times.` }),
        P.num({ label: "(ii)", marks: 1, kind: "times", dp: 1, value: N.profit / N.div, wrong: [N.div / N.profit], stem: "Company N", explanation: `${F(N.profit)} ÷ ${F(N.div)} = ${p1(N.profit / N.div)} times.` }),
      ] }),
      P.manual({ label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Advise the teacher which company to choose. Use your calculations and explain what each ratio shows.", points: [`Company N has the higher dividend yield (${p1(yld(dps(N.div, N.n), N.price))}% against ${p1(yld(dps(M.div, M.n), M.price))}%): more income per dollar invested`, `Company N's dividend cover is only ${p1(N.profit / N.div)} times: the dividend takes most of the profit`, `Company M's cover of ${p1(M.profit / M.div)} times makes its dividend safer and leaves profit to grow the business`, "A cut in N's dividend would reduce her income and probably the share price", "M has the higher EPS, showing stronger earnings per share held", "She wants income, so N's yield is attractive, but the risk is higher", "Recommendation: N for maximum income if she accepts the risk, M for a safer and growing dividend; a mixture is also possible", "A limit: one year only; the share price may change; other risks such as the economy or the company's debt"], modelAnswer: `Company N pays a yield of ${p1(yld(dps(N.div, N.n), N.price))}% against ${p1(yld(dps(M.div, M.n), M.price))}% for M, which suits income. However, its cover of ${p1(N.profit / N.div)} times leaves little margin, so a fall in profit could cut the dividend. M pays less but is much safer and retains profit for growth. Because the teacher depends on a regular income, a mixture, or M for safety, is the sound choice; one year of figures is a limit.`, explanation: "One point per creditworthy statement, up to 8; allow follow-through." }),
    ],
    hints: ["Convert the prices to cents before the yield.", "Compare yield with cover."],
    explanation: "This item compares two companies using EPS, dividend yield and cover and asks for advice to an income investor.",
  });

  b.card("FORMULA", "Earnings per share", "Profit for the year ÷ number of ordinary shares in issue; quoted in cents.");
  b.card("FORMULA", "Price/earnings ratio", "Market price per share ÷ earnings per share, in the same units.");
  b.card("FORMULA", "Dividend per share", "Annual ordinary dividend ÷ number of ordinary shares in issue.");
  b.card("FORMULA", "Dividend yield", "Dividend per share ÷ market price per share × 100.");
  b.card("FORMULA", "Dividend cover", "Profit for the year ÷ annual ordinary dividend, in times.");
  b.card("FORMULA", "Earnings yield (ZIMSEC)", "Earnings per share ÷ market price × 100; the inverse of the P/E expressed as a percentage.", undefined, { applies: ZIM });
  b.card("CONCEPT", "What does a high P/E show?", "Investors expect growth or low risk and pay a high price for each dollar of current earnings; the shares are also dearer.");
  b.card("CONCEPT", "Dividend cover below 1", "The dividend exceeds the profit for the year, so it is partly paid from past profits and may be cut.");
  b.card("FACT", "Bonus issue and EPS", "A bonus issue increases the number of shares, so EPS falls, but shareholders' wealth does not change; earlier EPS is restated.");
});
void r2;
