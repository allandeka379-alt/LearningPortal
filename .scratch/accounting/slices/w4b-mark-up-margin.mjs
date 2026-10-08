// W4b: mark-up and margin — converting and finding missing figures.
import { concept, P, money } from "../lib.mjs";
import { ratios, table, fmt, r2, check, d1 } from "../tables/w4b-lib.mjs";

concept("acc.analysis.mark-up-margin", { file: "analysis/mark-up-margin", keyPrefix: "analysis.mark-up-margin" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Mark-up is gross profit expressed as a percentage of …",
    options: [
      ["cost price", "Correct: mark-up is calculated on cost."],
      ["selling price", "Gross profit as a percentage of selling price is the margin."],
      ["profit for the year", "Mark-up uses gross profit and cost only."],
      ["capital employed", "This is the base for ROCE."],
    ],
    answer: "A",
    explanation: "Mark-up = gross profit ÷ cost × 100; margin = gross profit ÷ selling price × 100.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A trader uses a mark-up of 25%. What is her gross profit margin?",
    options: [
      ["20%", "Correct: 25 ÷ 125 × 100."],
      ["25%", "Margin and mark-up are not equal; they have different bases."],
      ["33⅓%", "This converts the wrong way (25 ÷ 75)."],
      ["75%", "This is 100 minus the mark-up, which has no meaning here."],
    ],
    answer: "A",
    explanation: "Cost 100, gross profit 25, selling price 125: margin = 25/125 = 20%.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A shop's gross profit margin is 40%. What is its mark-up (to one decimal place)?",
    options: [
      ["66.7%", "Correct: 40 ÷ 60 × 100."],
      ["28.6%", "This converts the wrong way (40 ÷ 140)."],
      ["40.0%", "Mark-up is always larger than margin."],
      ["60.0%", "This is cost as a percentage of selling price."],
    ],
    answer: "A",
    explanation: "Selling price 100, gross profit 40, cost 60: mark-up = 40/60 = 66.7%.",
  });
  {
    const cos = 27600, mu = 30;
    const rev = r2((cos * (100 + mu)) / 100);
    check("mm mcq1", rev, 35880);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `Cost of sales was ${money(cos)} and goods are sold at a mark-up of ${mu}%. What was the revenue?`,
      options: [
        [money(rev), "Correct: 27,600 × 130/100."],
        [money(r2(cos / 0.7)), "This treats 30% as a margin."],
        [money(r2(cos * 0.3)), "This is the gross profit, not the revenue."],
        [money(r2(cos * 0.7)), "Revenue must be larger than cost of sales."],
      ],
      answer: "A",
      explanation: `Revenue = ${fmt(cos)} + 30% of ${fmt(cos)} = ${fmt(rev)}.`,
    });
  }
  {
    const rev = 63000, g = 20;
    const cos = r2((rev * (100 - g)) / 100);
    check("mm mcq2", cos, 50400);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Revenue was ${money(rev)} and the gross profit margin was ${g}%. What was the cost of sales?`,
      options: [
        [money(cos), "Correct: 63,000 × 80/100."],
        [money(r2((rev * 100) / 120)), "This treats 20% as a mark-up on cost."],
        [money(r2((rev * g) / 100)), "This is the gross profit."],
        [money(r2(rev * 1.2)), "Cost of sales cannot exceed revenue when there is a gross profit."],
      ],
      answer: "A",
      hints: ["Margin is a percentage of revenue."],
      explanation: `Gross profit = 20% × ${fmt(rev)} = ${fmt(r2(rev * 0.2))}; cost of sales = ${fmt(cos)}.`,
    });
  }
  {
    const rev = 52500, mu = 50, oi = 6100, pu = 36400;
    const cos = r2((rev * 100) / (100 + mu));
    const ci = r2(oi + pu - cos);
    check("mm mcq3", ci, 7500);
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `Revenue ${money(rev)}; mark-up 50%; opening inventory ${money(oi)}; purchases ${money(pu)}. What was the closing inventory?`,
      options: [
        [money(ci), "Correct: cost of sales 35,000; 6,100 + 36,400 − 35,000."],
        [money(r2(oi + pu - rev * 0.5)), "This treats 50% as a margin (cost of sales 26,250)."],
        [money(r2(pu - cos)), "Opening inventory has been left out."],
        [money(cos), "This is the cost of sales, not closing inventory."],
      ],
      answer: "A",
      hints: ["Cost structure: cost 100, gross profit 50, selling price 150."],
      explanation: `Cost of sales = ${fmt(rev)} × 100/150 = ${fmt(cos)}. Closing inventory = ${fmt(oi)} + ${fmt(pu)} − ${fmt(cos)} = ${fmt(ci)}.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about mark-up and margin is **true** for a business that makes a gross profit?",
    options: [
      ["The mark-up is always greater than the margin", "Correct: the same gross profit is divided by a smaller base."],
      ["The margin is always greater than the mark-up", "Revenue is the larger base, so the margin is smaller."],
      ["They are equal when sales are high", "They are never equal while there is a gross profit."],
      ["The margin can be more than 100%", "Gross profit cannot exceed revenue."],
    ],
    answer: "A",
    hints: ["Which is bigger: cost or selling price?"],
    explanation: "Cost of sales is less than revenue, so gross profit ÷ cost is larger than gross profit ÷ revenue.",
  });
  {
    const sp = 84, mu = 40;
    const cost = r2((sp * 100) / (100 + mu));
    check("mm mcq4", cost, 60);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: `A hardware shop sells a wheelbarrow for ${money(sp)} at a mark-up of ${mu}%. What did the wheelbarrow cost the shop?`,
      options: [
        [money(cost), "Correct: 84 × 100/140."],
        [money(r2(sp * 0.6)), "This deducts 40% of the selling price, treating 40% as a margin."],
        [money(r2(sp * 1.4)), "Cost cannot exceed the selling price when there is a profit."],
        [money(r2(sp * 0.4)), "This is 40% of the selling price."],
      ],
      answer: "A",
      hints: ["Selling price = 140% of cost."],
      explanation: `Cost = ${fmt(sp)} ÷ 1.4 = ${fmt(cost)}. Check: ${fmt(cost)} + 40% = ${fmt(sp)}.`,
    });
  }

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A mark-up of 100% is the same as a gross profit margin of 50%.",
    answer: true,
    explanation: "True. Cost 100, gross profit 100, selling price 200: 100/200 = 50%.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If cost of sales is US\\$40,000 and the margin is 20%, the gross profit is US\\$8,000.",
    answer: false,
    explanation: "False. A margin is a percentage of selling price. Revenue = 40,000 × 100/80 = 50,000, so gross profit = 10,000. US\\$8,000 is 20% of cost.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each mark-up with the equivalent gross profit margin.",
    pairs: [["Mark-up 25%", "Margin 20%"], ["Mark-up 50%", "Margin 33⅓%"], ["Mark-up 100%", "Margin 50%"], ["Mark-up 20%", "Margin 16⅔%"]],
    extraRight: ["Margin 40%"],
    hints: ["Margin = mark-up ÷ (100 + mark-up)."],
    explanation: "A mark-up of 1/n is a margin of 1/(n + 1): 1/4 → 1/5, 1/2 → 1/3, 1/1 → 1/2, 1/5 → 1/6.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "A trader's margin is 30%. Complete the cost structure with the selling price as the base.",
    template: "Selling price 100; gross profit {{blank:a}}; cost {{blank:b}}. The mark-up is therefore {{blank:c}} % (to one decimal place).",
    blanks: [
      { id: "a", accepted: ["30"] },
      { id: "b", accepted: ["70"] },
      { id: "c", accepted: ["42.9"] },
    ],
    hints: ["Mark-up = gross profit ÷ cost."],
    explanation: "Gross profit 30, cost 70: mark-up = 30 ÷ 70 × 100 = 42.9%.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const m = 35;
    const v = ratios.marginFromMarkUp(m);
    b.num({
      d: 2, kind: "pct", value: v, wrong: [d1(ratios.markUpFromMargin(m))],
      stem: `Convert a mark-up of ${m}% into a gross profit margin, to one decimal place.`,
      explanation: `${m} ÷ ${100 + m} × 100 = ${d1(v)}%. Converting the wrong way gives ${d1(ratios.markUpFromMargin(m))}%.`,
    });
  }
  {
    const rev = 91200, mu = 20;
    const gp = r2((rev * mu) / (100 + mu));
    check("mm num2", gp, 15200);
    b.calc({
      d: 3, kind: "money", value: gp, calculator: true, wrong: [r2(rev * 0.2)],
      stem: `Nyasha's revenue was ${money(rev)}. She sells at a mark-up of ${mu}%. Calculate her gross profit.`,
      hints: ["Convert the mark-up into a fraction of selling price first."],
      explanation: `Cost structure: cost 100, gross profit 20, selling price 120. Gross profit = ${fmt(rev)} × 20/120 = ${fmt(gp)}. Taking 20% of revenue gives ${fmt(r2(rev * 0.2))}, the margin/mark-up swap.`,
    });
  }
  {
    const oi = 7240, pu = 58960, ci = 8200, g = 25;
    const cos = r2(oi + pu - ci);
    const rev = r2((cos * 100) / (100 - g));
    check("mm num3", rev, 77333.33);
    b.calc({
      d: 4, kind: "money", value: rev, calculator: true, wrong: [r2(cos * 1.25)],
      stem: `Tatenda's opening inventory was ${money(oi)}, purchases ${money(pu)} and closing inventory ${money(ci)}. His gross profit margin is ${g}%. Calculate his revenue, to the nearest cent.`,
      hints: ["Find cost of sales first.", "With a 25% margin, cost of sales is 75% of revenue."],
      explanation: `Cost of sales = ${fmt(oi)} + ${fmt(pu)} − ${fmt(ci)} = ${fmt(cos)}. Revenue = ${fmt(cos)} × 100/75 = ${fmt(rev)}. Adding 25% to cost gives ${fmt(r2(cos * 1.25))}, which uses the margin as a mark-up.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a mark-up of 25% does not give a gross profit margin of 25%.",
    points: ["Mark-up is measured on cost; margin on selling price", "Selling price is larger than cost (125 v 100), so the same gross profit is a smaller percentage of it (20%)"],
    modelAnswer: "The mark-up compares the gross profit with cost, but the margin compares it with the selling price. With cost 100 and gross profit 25, selling price is 125, so the margin is 25/125 = 20%.",
    explanation: "Different bases give different percentages.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Rudo wants a gross profit margin of 40% on a dress that costs her US\\$45. She plans to sell it for US\\$63. Advise her whether this price meets her target, showing your working.",
    points: ["Required price = 45 × 100/60 = US\\$75", "Price of US\\$63 gives a margin of 18/63 = 28.6% (she has added 40% to cost)", "Advice: raise the price to US\\$75, or accept a lower margin"],
    modelAnswer: "For a 40% margin, cost must be 60% of price: 45 ÷ 0.6 = US\\$75. At US\\$63 her gross profit is US\\$18, a margin of only 28.6%, because she has added 40% to cost instead. She should charge US\\$75 to meet her target.",
    hints: ["With a 40% margin, cost is 60% of the selling price."],
    explanation: "She has confused a 40% mark-up with a 40% margin.",
  });

  // ---------------------------------------------------------------- Practice structured 1
  {
    const oi = 5860, pu = 47250, mu = 25, rev = 61500;
    const cos = r2((rev * 100) / (100 + mu));
    const gp = r2(rev - cos);
    const ci = r2(oi + pu - cos);
    const counted = 2450;
    const lost = r2(ci - counted);
    check("mm s1", ci, 3910);
    const work = table(["Trading figures", "US\\$"], [["Opening inventory", oi], ["Add: Purchases", pu], ["Goods available for sale", oi + pu], ["Less: Closing inventory (should be held)", `(${fmt(ci)})`], ["Cost of sales", cos], ["Gross profit", gp], ["Revenue", rev]]);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `A fire at Farai Gumbo's hardware shop in Kadoma on 31 December 2025 destroyed part of his inventory. He sells all goods at a mark-up of ${mu}%. For 2025: revenue ${money(rev)}; inventory at 1 January 2025 ${money(oi)}; purchases ${money(pu)}. Inventory that survived the fire cost ${money(counted)}.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: ratios.marginFromMarkUp(mu), stem: "State Farai's gross profit margin, to one decimal place.", explanation: "25 ÷ 125 × 100 = 20.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: gp, wrong: [r2(rev * 0.25)], stem: "Calculate the gross profit for 2025.", explanation: `${fmt(rev)} × 25/125 = ${fmt(gp)}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: cos, stem: "Calculate the cost of sales for 2025.", explanation: `${fmt(rev)} − ${fmt(gp)} = ${fmt(cos)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: ci, wrong: [r2(oi + pu - rev * 0.75)], stem: "Calculate the inventory that Farai should have held at 31 December 2025.", explanation: `${fmt(oi)} + ${fmt(pu)} − ${fmt(cos)} = ${fmt(ci)}.` }),
        P.num({ label: "(e)", marks: 1, kind: "money", value: lost, stem: "Calculate the cost of the inventory destroyed by the fire.", explanation: `${fmt(ci)} − ${fmt(counted)} = ${fmt(lost)}.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the mark-up method gives only an estimate of the inventory destroyed.", points: ["It assumes every item was sold at exactly the same mark-up", "Discounts, price changes, damaged goods or theft during the year would change the real cost of sales"], modelAnswer: "The calculation assumes all goods were sold at a 25% mark-up. If some were sold at a discount, or goods were stolen or damaged earlier in the year, the true cost of sales and so the true loss would be different.", explanation: "The figure is only as good as the assumption of a constant mark-up." }),
      ],
      hints: ["Cost structure: cost 100, gross profit 25, selling price 125."],
      explanation: `Workings:\n\n${work}\n\nInventory destroyed: ${fmt(ci)} − ${fmt(counted)} = ${fmt(lost)}.`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2 (margin → revenue → purchases)
  {
    const g = 35, gp = 22540, oi = 4980, ci = 6350;
    const rev = r2((gp * 100) / g);
    const cos = r2(rev - gp);
    const pu = r2(cos + ci - oi);
    const mu = ratios.markUpFromMargin(g);
    check("mm s2", rev, 64400);
    b.struct({
      d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Thandeka runs a tuck shop in Bulawayo with a gross profit margin of ${g}%. Her gross profit for 2025 was ${money(gp)}. Inventory was ${money(oi)} at 1 January 2025 and ${money(ci)} at 31 December 2025.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: rev, wrong: [r2((gp * 100) / mu)], stem: "Calculate Thandeka's revenue for 2025.", explanation: `${fmt(gp)} ÷ 35% = ${fmt(rev)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: cos, stem: "Calculate her cost of sales.", explanation: `${fmt(rev)} − ${fmt(gp)} = ${fmt(cos)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: pu, wrong: [r2(cos - ci + oi)], stem: "Calculate her purchases for 2025.", explanation: `${fmt(cos)} + ${fmt(ci)} − ${fmt(oi)} = ${fmt(pu)}.` }),
        P.num({ label: "(d)", marks: 1, kind: "pct", value: mu, stem: "Calculate her mark-up, to one decimal place.", explanation: `35 ÷ 65 × 100 = ${d1(mu)}%.` }),
      ],
      hints: ["Margin = gross profit ÷ revenue, so revenue = gross profit ÷ margin."],
      explanation: `Revenue ${fmt(rev)}; cost of sales ${fmt(cos)}; purchases ${fmt(pu)}; mark-up ${d1(mu)}%.`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("DEFINITION", "Mark-up", "Gross profit as a percentage of cost: gross profit ÷ cost of sales × 100.");
  b.card("DEFINITION", "Margin", "Gross profit as a percentage of selling price: gross profit ÷ revenue × 100.");
  b.card("FORMULA", "Margin from mark-up", "Margin = mark-up ÷ (100 + mark-up) × 100.");
  b.card("FORMULA", "Mark-up from margin", "Mark-up = margin ÷ (100 − margin) × 100.");
  b.card("FACT", "Fraction shortcut", "A mark-up of 1/n is a margin of 1/(n + 1); e.g. mark-up 1/4 = margin 1/5.");
  b.card("FACT", "Mark-up 25%", "Cost 100 : gross profit 25 : selling price 125 → margin 20%.");
  b.card("FACT", "Margin 25%", "Cost 75 : gross profit 25 : selling price 100 → mark-up 33⅓%.");
  b.card("CONCEPT", "Finding closing inventory with a mark-up", "Cost of sales = revenue × 100/(100 + m); closing inventory = opening inventory + purchases − cost of sales.");
  b.card("CONCEPT", "Which is bigger?", "Mark-up is always bigger than margin, because cost is smaller than selling price.");
});
