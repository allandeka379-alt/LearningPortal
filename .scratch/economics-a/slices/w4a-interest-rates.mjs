// W4a: interest rate determination (both boards; ZIMSEC Form 6, Cambridge A Level). Non-economic factors are ZIMSEC detail.
import { concept, P, chk, table, fmt, roundTo, pctChange, realInterest } from "../lib.mjs";
import { mc, LV8 } from "../tables/w4a-kit.mjs";

const LV4 = [
  [3, 4, 4, "Two-sided, applied to the data, with a supported judgement."],
  [2, 2, 3, "Some development of one side or limited use of the data."],
  [1, 1, 1, "A simple statement."],
];

concept("aecon.money.interest-rates", { file: "money/interest-rates", keyPrefix: "money.interest-rates" }, (b) => {
  mc(b, [2, "RECALL"], "The real rate of interest is approximately",
    ["the nominal interest rate minus the rate of inflation", "Correct: it adjusts for the fall in the value of money."],
    [["the nominal interest rate plus the rate of inflation", "Adding inflation would overstate the real return."],
     ["the policy rate set by the central bank divided by GDP", "This has no meaning in economics."],
     ["the rate of inflation minus the growth of real output", "This is not a definition of the real rate."]],
    "Real rate ≈ nominal rate − inflation rate.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "In the liquidity preference theory, an increase in the money supply, other things equal, will",
    ["lower the equilibrium rate of interest", "Correct: there is an excess supply of money, so people buy bonds."],
    [["raise the equilibrium rate of interest", "A larger money supply lowers the rate."],
     ["leave the rate unchanged, because only saving matters", "Saving is the loanable funds theory's focus."],
     ["raise the demand for money to match the supply", "The demand curve does not shift when the rate falls."]],
    "A rise in the supply of money creates an excess supply at the old rate; bond prices rise and the rate falls.", { daily: true });

  mc(b, [3, "ANALYSIS"], "In the loanable funds theory, a rise in household saving at each interest rate will",
    ["shift the supply of funds to the right and lower the interest rate", "Correct: more funds are available at each rate."],
    [["shift the demand for funds to the right and raise the interest rate", "Saving is on the supply side."],
     ["shift the supply of funds to the left and raise the interest rate", "More saving shifts supply to the right."],
     ["leave the interest rate unchanged, because investment does not change", "A shift in supply changes the equilibrium."]],
    "More saving increases the supply of loanable funds, lowering the equilibrium rate.", { hints: ["Is saving part of supply or demand in this theory?"] });

  mc(b, [3, "UNDERSTANDING"], "When the market rate of interest rises, the price of an existing fixed-income bond",
    ["falls, because its fixed payment is a lower percentage return", "Correct: bond prices and interest rates move in opposite directions."],
    [["rises, because its fixed payment is a higher percentage return", "A higher market rate makes the old bond less attractive."],
     ["stays the same, because the payment stays the same", "Price adjusts so that the yield matches the market rate."],
     ["rises, because lenders are more willing to hold bonds", "Bond prices fall when rates rise."]],
    "Price = income ÷ interest rate, so a higher rate means a lower price.", { hints: ["Price = fixed income ÷ interest rate."] });

  mc(b, [3, "APPLICATION"], "In the loanable funds model a government increases its borrowing. Other things equal, this will",
    ["raise the interest rate and reduce private investment", "Correct: this is crowding out."],
    [["lower the interest rate and raise private investment", "More borrowing raises demand for funds and the rate."],
     ["lower the interest rate and reduce saving", "The rate rises."],
     ["leave interest rates unchanged and raise saving", "The extra demand changes the equilibrium rate."]],
    "More government borrowing raises demand for loanable funds, the rate rises and private investment falls.", { hints: ["Which curve shifts when the government borrows?"] });

  mc(b, [2, "UNDERSTANDING"], "Other things equal, a lender is likely to charge a higher interest rate on",
    ["a loan to a risky new business over a longer term", "Correct: more risk and a longer term both raise the rate."],
    [["a loan to a well-established firm over a shorter term", "Lower risk and a shorter term usually mean a lower rate."],
     ["a loan to the government over a very short term", "This is usually lower-risk."],
     ["a loan secured on valuable property over a short term", "Security and a short term lower the rate."]],
    "Risk and the term of the loan are two determinants of interest rates.");

  mc(b, [4, "EVALUATION"], "Keynes argued that a larger money supply may fail to reduce the interest rate if the interest rate is already very low, because",
    ["people will hold extra money instead of buying bonds (a liquidity trap)", "Correct: the demand for money becomes very elastic."],
    [["savers will immediately spend all the extra money on consumption", "The point is about holding money, not about spending it."],
     ["banks will refuse to accept any more deposits from customers", "This is not the argument."],
     ["the central bank is unable to create any more bank reserves", "The central bank can create reserves."]],
    "At very low rates bond prices are expected to fall, so people prefer to hold money: the demand for money is very elastic.", { hints: ["What do people prefer to hold when bond prices are expected to fall?"] });

  {
    const r = realInterest(14, 9).approx; chk(r, 5);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: r, dp: 1, unit: "%", hints: ["Real rate ≈ nominal rate − inflation."],
      stem: "A loan carries a nominal interest rate of 14% when inflation is 9%. Calculate the approximate real rate of interest, as a percentage.",
      wrong: [23, 1.56, 14], explanation: "Real rate ≈ 14% − 9% = 5%." });
    const bp = 60 / 0.04; chk(bp, 1500);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: bp, hints: ["Price = fixed annual payment ÷ interest rate."],
      stem: "A bond pays US\\$60 a year indefinitely. The market interest rate is 4%. Calculate the price of the bond, in US\\$.",
      wrong: [2.4, 240, 15], explanation: "Price = 60 ÷ 0.04 = US\\$1,500." });
    const ch = pctChange(1500, 60 / 0.06); chk(roundTo(ch, 1), -33.3);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "pct", value: ch, dp: 1, unit: "%", calculator: true, hints: ["Find the price at each interest rate, then the percentage change."],
      stem: "A bond pays US\\$60 a year indefinitely. The market interest rate rises from 4% to 6%. Calculate the percentage change in the price of the bond. Include the minus sign if the price falls.",
      wrong: [33.3, 50, -50], explanation: "1. Price at 4% = 60 ÷ 0.04 = US\\$1,500; price at 6% = 60 ÷ 0.06 = US\\$1,000.\n2. Change = (1,000 − 1,500) ÷ 1,500 × 100 = −33.3%." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: true,
    stem: "True or false: bond prices and interest rates move in opposite directions.",
    feedbackTrue: "A fixed payment is a higher percentage of a lower price, so the yield rises when the price falls.",
    explanation: "Price = fixed payment ÷ interest rate." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each change with its likely effect on the equilibrium interest rate (other things equal).",
    pairs: ["The central bank increases the money supply (liquidity preference)", "Households increase their saving (loanable funds)", "The government borrows more (loanable funds)", "Lenders expect higher inflation"],
    right: ["The rate falls", "The rate rises"], rightIndex: [0, 0, 1, 1],
    explanation: "More money supply or saving lowers the rate; more borrowing or higher expected inflation raises it." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "In the liquidity preference theory the interest rate is determined by the demand for and supply of {{blank:a}}. In the loanable funds theory the supply of funds comes from {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["money"], choices: ["money", "labour", "bonds only"] }, { id: "b", accepted: ["saving"], choices: ["saving", "investment", "taxation"] }],
    explanation: "Liquidity preference: money market; loanable funds: savings supply funds." });

  b.short({ d: 2, skill: "RECALL", stem: "Which economist developed the liquidity preference theory of the interest rate?",
    accepted: ["keynes", "j m keynes", "john maynard keynes", "j.m. keynes", "maynard keynes"], wrong: ["friedman"],
    explanation: "Keynes developed the liquidity preference theory." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Mention inflation in the real rate."],
    stem: "Distinguish between the nominal rate of interest and the real rate of interest.",
    points: ["The nominal rate is the rate actually charged or paid, not adjusted for inflation.", "The real rate is the nominal rate adjusted for inflation (nominal rate − inflation rate)."],
    modelAnswer: "The nominal rate is the rate actually charged or paid, not adjusted for inflation. The real rate is the nominal rate adjusted for inflation, approximately the nominal rate minus the rate of inflation.",
    explanation: "Nominal unadjusted; real adjusted for inflation." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Start from the excess supply of money at the old rate."],
    stem: "Explain, using liquidity preference theory, why a rise in the money supply lowers the interest rate.",
    points: ["At the old rate the supply of money is greater than the demand for it (excess supply).", "People use the extra money to buy bonds.", "The demand for bonds raises their price, which lowers the interest yield.", "The rate falls until the demand for money again equals the larger supply."],
    modelAnswer: "At the old rate the supply of money is greater than the demand for it, so people have excess money. They use it to buy bonds, which raises bond prices and lowers the interest yield. The rate falls until the demand for money again equals the larger supply.",
    explanation: "Excess supply, bond purchases, higher bond prices, lower rate." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Use the loanable funds model."],
    stem: "Explain why an increase in government borrowing may raise the interest rate.",
    points: ["Government borrowing is an extra demand for loanable funds.", "The demand curve for funds shifts to the right.", "At the old rate demand exceeds supply, so the rate rises until supply and demand are equal again."],
    modelAnswer: "Government borrowing is an extra demand for loanable funds, so the demand curve for funds shifts to the right. At the old rate demand exceeds supply, so the rate rises until supply and demand are equal again.",
    explanation: "Demand shifts right; excess demand; higher rate." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Think about how the real rate affects borrowers and savers."],
    stem: "Analyse why the real rate of interest is more important than the nominal rate for decisions to borrow and save.",
    points: ["Inflation reduces the value of money that is repaid.", "The real rate shows the true cost of borrowing and the true reward for saving.", "A high nominal rate with higher inflation gives a low or negative real rate, which encourages borrowing and discourages saving.", "Firms compare the real cost of borrowing with the real return on investment.", "So changes in inflation can change spending even if the nominal rate does not change."],
    modelAnswer: "Inflation reduces the value of money that is repaid, so the real rate shows the true cost of borrowing and the true reward for saving. A high nominal rate combined with higher inflation gives a low or negative real rate, which encourages borrowing and discourages saving. Firms compare the real cost of borrowing with the real return on an investment, so changes in inflation can change spending even if the nominal rate is unchanged.",
    explanation: "Inflation adjustment; true cost and reward; negative real rates; effect on decisions." });

  {
    const r = [3, 5, 7, 9, 11], d = [640, 560, 480, 420, 380];
    const s1 = r.map(() => 480), s2 = r.map(() => 560);
    const eq = (s) => r[d.findIndex((x, i) => x === s[i])];
    chk(eq(s1), 7); chk(eq(s2), 5);
    const t1 = table(["Interest rate (%)", "Demand for money (US\\$ million)", "Money supply before (US\\$ million)", "Money supply after (US\\$ million)"], r.map((x, i) => [String(x), d[i], s1[i], s2[i]]));
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["The equilibrium rate is where demand for money equals the money supply."],
      stem: `**The money market in Zandia (fictional, illustrative)**\n\nThe table shows the demand for money and the money supply at different interest rates. The central bank increases the money supply from US\\$480 million to US\\$560 million.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: 7, dp: 1, unit: "%", stem: "State the equilibrium interest rate before the increase in the money supply, as a percentage.", wrong: [5, 9, 3], explanation: "Demand equals the supply of 480 at an interest rate of 7%." }),
        P.num({ label: "(b)", marks: 1, kind: "pct", value: 5, dp: 1, unit: "%", stem: "State the equilibrium interest rate after the increase, as a percentage.", wrong: [7, 3, 9], explanation: "Demand equals the new supply of 560 at an interest rate of 5%." }),
        P.num({ label: "(c)", marks: 1, kind: "plain", value: 2, unit: "percentage points", dp: 0, tol: 0.001, stem: "By how many percentage points does the equilibrium interest rate fall?", wrong: [7, 5, 80], explanation: "7% − 5% = 2 percentage points." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain how the extra money supply leads to a fall in the interest rate.",
          points: ["At 7% the supply of money (560) exceeds the demand (480): there is an excess supply of money.", "People use the extra money to buy bonds, raising bond prices.", "A higher bond price means a lower interest yield, so the rate falls until demand equals supply."],
          modelAnswer: "At 7% the supply of money (560) exceeds the demand for it (480), so there is an excess supply of money. People use the extra money to buy bonds, which raises bond prices. A higher bond price means a lower interest yield, so the rate falls until the demand for money equals the supply." }),
        P.manual({ label: "(e)", marks: 2, stem: "State and explain one effect of the lower interest rate on the economy.",
          points: ["Borrowing is cheaper, so firms invest more and households spend more.", "Aggregate demand rises."],
          modelAnswer: "Borrowing is cheaper, so firms invest more and households spend more, and aggregate demand rises." }),
      ],
      explanation: "Equilibrium falls from 7% to 5% when the money supply rises; the rate falls as bond prices rise." });
  }
  {
    const r = [5, 7, 9, 11, 13], D = [610, 550, 490, 430, 370], S1 = [370, 430, 490, 550, 610], S2 = S1.map((x) => x + 120);
    const eq = (S) => r[D.findIndex((x, i) => x === S[i])];
    chk(eq(S1), 9); chk(eq(S2), 7);
    const g = pctChange(490, 550); chk(Math.round(g * 10) / 10, 12.2);
    const t1 = table(["Interest rate (%)", "Demand for loanable funds (US\\$ million)", "Supply of loanable funds (US\\$ million)"], r.map((x, i) => [String(x), D[i], S1[i]]));
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["The new supply is the old supply plus US\\$120 million at each rate.", "In (e) consider what else determines investment."],
      stem: `**Loanable funds in Zandia (a fictional economy, illustrative)**\n\nThe table shows the market for loanable funds. A new pension scheme and higher remittances from workers abroad increase the supply of loanable funds by US\\$120 million at every interest rate. Business owners say that they will invest more only if they expect strong sales, and that many banks refuse to lend to small firms.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: 9, dp: 1, unit: "%", stem: "State the equilibrium interest rate before the increase in supply, as a percentage.", wrong: [7, 11, 490], explanation: "Demand equals supply (490) at 9%." }),
        P.num({ label: "(b)", marks: 1, kind: "pct", value: 7, dp: 1, unit: "%", stem: "State the new equilibrium interest rate, as a percentage.", wrong: [9, 5, 550], explanation: "New supply = old supply + 120. At 7%, 430 + 120 = 550, equal to demand (550)." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: g, dp: 1, unit: "%", stem: "Calculate the percentage rise in the quantity of funds lent, to one decimal place.", wrong: [10.9, 60, 25], explanation: "Funds lent rise from 490 to 550: 60 ÷ 490 × 100 = 12.2%." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain how the fall in the interest rate could affect investment and aggregate demand.",
          points: ["A lower rate makes borrowing cheaper, so more investment projects have an expected return above the cost of borrowing.", "Firms increase investment spending.", "Investment is a component of aggregate demand, so AD shifts to the right.", "Output and employment rise through the multiplier."],
          modelAnswer: "A lower interest rate makes borrowing cheaper, so more investment projects have an expected return above the cost of borrowing and firms increase their investment. Investment is a component of aggregate demand, so AD shifts to the right and output and employment rise, magnified by the multiplier." }),
        P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 220 }, levels: LV4,
          stem: "Assess whether the lower interest rate will increase investment in Zandia.",
          points: ["Cheaper credit encourages investment in projects that were not profitable at 9%.", "Business owners say investment depends on expected sales, not just the interest rate.", "Banks refuse to lend to small firms, so the fall in the rate may not reach them.", "Judgement: some rise in investment, but limited by demand and credit rationing."],
          modelAnswer: "Cheaper credit encourages investment in projects that were not profitable at 9%, so some rise in investment is likely. However, business owners say that they will invest only if they expect strong sales, and banks refuse to lend to small firms, so the fall in the rate may not reach many of them. Investment is therefore likely to rise, but by less than the fall in the rate suggests, because of weak expected demand and rationing of credit." }),
      ],
      explanation: "Equilibrium falls from 9% to 7% and the funds lent rise 12.2%; the effect on investment depends on expectations and access to credit." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare the markets, the role of saving and the money supply, and the conditions for each."],
    stem: "Assess which of the liquidity preference theory and the loanable funds theory better explains the determination of interest rates.",
    points: ["Liquidity preference: the money supply and the demand for money explain short-run changes and central bank influence.", "It explains the link between bond prices and rates and the liquidity trap.", "Loanable funds: saving and investment determine the rate in the long run; explains the effect of government borrowing and crowding out.", "It ignores the role of the money supply and the effect of income on saving.", "Both are partial: banks create credit, and expectations of inflation matter.", "Other determinants (risk, term, central bank rate) matter in practice.", "The better theory depends on the time period and the market.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Liquidity preference theory explains how the supply of money and the demand for it determine the interest rate in the short run, and it shows why the central bank can influence the rate and how bond prices are linked to rates. It also explains the possibility of a liquidity trap. The loanable funds theory emphasises saving and investment, so it explains the longer-run influence of thrift and productivity and the effect of government borrowing on interest rates. However, liquidity preference ignores the role of saving and investment, while loanable funds ignores the money supply and the fact that banks create credit and that saving depends on income. In practice rates also depend on risk, the term of the loan, the central bank's policy rate and inflation expectations. Liquidity preference is better for explaining short-run changes and central bank influence, loanable funds for longer-term trends, so each is valuable for a different time period.",
    explanation: "Compare short-run and long-run explanatory power and the limits of each theory." });

  b.card("DEFINITION", "Define the **real interest rate**.", "The nominal interest rate adjusted for inflation: approximately nominal rate − inflation rate.");
  b.card("CONCEPT", "Liquidity preference theory in a sentence?", "The interest rate is determined by the demand for and supply of money in the money market.");
  b.card("CONCEPT", "Loanable funds theory in a sentence?", "The interest rate is determined by the supply of funds (saving) and the demand for funds (investment and borrowing).");
  b.card("CONCEPT", "What happens to the interest rate if the money supply rises (liquidity preference)?", "It falls: excess money buys bonds, raising bond prices and lowering yields.");
  b.card("FORMULA", "Price of a fixed-income bond?", "Fixed annual payment ÷ interest rate.");
  b.card("CONCEPT", "What is a liquidity trap?", "At very low interest rates people hold any extra money instead of buying bonds, so a larger money supply cannot lower the rate further.");
  b.card("CONCEPT", "List four other determinants of interest rates.", "The policy rate, risk, the term of the loan and expected inflation.");
  b.card("CONCEPT", "Effect of more government borrowing in the loanable funds model?", "The demand for funds rises, so the interest rate rises and private investment is crowded out.");
  b.card("CONCEPT", "Name some non-economic factors affecting interest rates.", "Political stability, confidence, the legal system, social attitudes to borrowing and saving, and government regulation.", null, { applies: ["zimsec"] });
});
