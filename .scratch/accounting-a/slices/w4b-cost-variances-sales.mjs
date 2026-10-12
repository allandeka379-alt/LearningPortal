// W4b: cost.variances-sales
import { concept, P, chk, r2, variances } from "../lib.mjs";
import { mc, F, usd, p2 } from "../tables/w4b-lib.mjs";

concept("aacc.cost.variances-sales", { file: "cost/variances-sales", keyPrefix: "cost.variances-sales" }, (b) => {
  // Thandeka Crafts, Bulawayo: clay pots
  const sp = 8, vc = 5.2, fo = 1.0, bu = 4000, au = 3600, ap = 8.5;
  const contr = r2(sp - vc), prof = r2(sp - vc - fo);
  chk(contr, 2.8); chk(prof, 1.8);
  const price = variances.salesPrice({ stdPrice: sp, actualPrice: ap, actualUnits: au });
  const volC = variances.salesVolume({ budgetUnits: bu, actualUnits: au, stdProfitPerUnit: contr });
  const volP = variances.salesVolume({ budgetUnits: bu, actualUnits: au, stdProfitPerUnit: prof });
  chk(price.value, 1800); chk(volC.value, -1120); chk(volP.value, -720);
  const totC = price.value + volC.value;
  chk(totC, 680); chk(r2(au * (ap - vc) - bu * contr), totC);
  chk(r2(au * (ap - vc - fo) - bu * prof), price.value + volP.value);
  const data = `Thandeka Crafts in Bulawayo makes clay pots. The standard selling price is US\\\$${p2(sp)} a pot, the standard variable cost is US\\\$${p2(vc)} and the standard fixed overhead absorbed is US\\\$${p2(fo)} a pot. The budget was ${F(bu)} pots. The business sold ${F(au)} pots at US\\\$${p2(ap)} each.`;

  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which formula gives the sales price variance?",
    ok: ["(Actual price - standard price) × actual units sold", "Correct: price difference on the units actually sold."],
    bad: [["(Actual units - budgeted units) × standard profit per unit", "That is the sales volume variance."], ["(Standard price - actual price) × budgeted units", "The units should be the actual units and the order of the prices is reversed."], ["Actual sales - budgeted sales", "That is a total difference in revenue and mixes price and volume."]],
    explanation: "The price variance values the price difference on the units actually sold.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A business sells 5,000 units at US\\$12.60 when the standard price is US\\$12.00. What is the sales price variance?",
    ok: ["US\\$3,000 favourable", "Correct: 0.60 × 5,000."],
    bad: [["US\\$3,000 adverse", "A higher price than standard increases profit, so it is favourable."], ["US\\$63,000 favourable", "That is total actual sales, not the variance."], ["US\\$0.60 favourable", "The unit difference must be multiplied by the units sold."]],
    hints: ["Actual price less standard price, times units sold."],
    explanation: "(12.60 - 12.00) × 5,000 = US\\$3,000, favourable.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "At what value is each unit of the sales volume variance measured?",
    ok: ["The standard profit or contribution per unit", "Correct: only the margin is extra profit."],
    bad: [["The standard selling price per unit of output sold", "Extra sales also add costs; only the margin is extra profit."], ["The actual selling price per unit", "Price effects belong to the price variance."], ["The standard variable cost per unit", "Cost alone is not the profit effect."]],
    explanation: "The volume variance is valued at the standard margin per unit, stated in the question.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A shop budgeted to sell 800 units with a standard contribution of US\\$6 a unit. It sold 700 units. What is the sales volume variance at standard contribution?",
    ok: ["US\\$600 adverse", "Correct: 100 fewer × 6."],
    bad: [["US\\$600 favourable", "Selling fewer units than budgeted lowers profit."], ["US\\$4,200 adverse", "That is the contribution of the 700 units sold."], ["US\\$100 adverse", "The unit difference must be multiplied by the margin."]],
    hints: ["(Actual - budget) units × margin."],
    explanation: "(700 - 800) × 6 = -US\\$600, adverse.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A bakery raises the price of bread and finds a favourable sales price variance but an adverse sales volume variance. What does this suggest?",
    ok: ["Customers bought fewer loaves at the higher price", "Correct: the price rise reduced demand."],
    bad: [["Customers bought more loaves because of the higher price", "A lower volume than budget is adverse, so demand fell."], ["The bakery gave a discount to attract customers", "A discount would give an adverse price variance."], ["The bakery's costs fell", "Costs are not part of sales variances."]],
    hints: ["Think about how price changes affect demand."],
    explanation: "A favourable price variance with an adverse volume variance suggests a price increase that lost sales.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A question gives a standard profit of US\\$3 a unit after fixed overhead and a standard contribution of US\\$5. It asks for the sales volume variance 'at standard contribution'. Which margin is used?",
    ok: ["US\\$5, the contribution", "Correct: the stem names the basis."],
    bad: [["US\\$3, the profit", "That is the absorption basis, which the question did not ask for."], ["US\\$2, the difference between them", "The difference is the fixed overhead per unit, not a margin."], ["US\\$8, the sum of them", "Adding them has no meaning."]],
    hints: ["Use the basis the stem names."],
    explanation: "Volume variances are valued at the margin the question states: here the contribution.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A firm gives a 10% discount and sells 25% more units than budgeted. Which statement is correct about the net effect on contribution?",
    ok: ["It depends on whether the extra volume gain exceeds the adverse price effect", "Correct: compare the two variances in dollars."],
    bad: [["Contribution must rise, because more units are sold", "The discount reduces margin on every unit sold and may outweigh the extra units."], ["Contribution must fall, because a discount was given", "The extra units may more than offset the discount."], ["Contribution is unchanged, because the two variances always cancel each other out", "They cancel only in special cases."]],
    hints: ["Compare the two variances."],
    explanation: "Net effect = favourable volume variance less adverse price variance; it can be positive, nil or negative.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A sales price variance is adverse when the actual selling price is below the standard price.", answer: true, explanation: "True. A lower price reduces profit on every unit sold." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "The sales price variance is different under marginal and absorption costing.", answer: false, hints: ["Does fixed overhead appear in the price formula?"], explanation: "False. The price variance does not use costs, so it is the same on either basis; only the volume variance changes." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each event to the sales variance it mainly affects.",
    pairs: ["A competitor forces a price cut", "A new customer buys a large order at the standard price", "A shortage lets the firm charge a higher price", "A poor sales team wins fewer orders than budgeted"],
    right: ["Adverse sales price variance", "Favourable sales volume variance", "Favourable sales price variance", "Adverse sales volume variance"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Prices charged affect the price variance; the number of units sold affects the volume variance.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Selling more units than budgeted gives a {{blank:a}} sales volume variance, valued at the standard {{blank:b}} per unit.",
    blanks: [{ id: "a", accepted: ["favourable"], choices: ["favourable", "adverse"] }, { id: "b", accepted: ["margin"], choices: ["margin", "selling price", "variable cost"] }],
    explanation: "Extra units add the standard margin to profit.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "State the name of the variance caused by selling a different number of units from the budget.", accepted: ["sales volume variance", "sales volume", "volume variance"], explanation: "It is the sales volume variance." });

  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: price.amount, calculator: true, wrong: [r2((ap - sp) * bu), 0.5, volC.amount],
    stem: `${data}\n\nCalculate the sales price variance (the amount only).`,
    hints: ["Use the units actually sold."],
    explanation: `(${p2(ap)} - ${p2(sp)}) × ${F(au)} = ${usd(price.amount)}, favourable. Using the budgeted ${F(bu)} pots would give ${usd((ap - sp) * bu)}.`,
  });
  {
    const sp2 = 2.2, vc2 = 1.35, bu2 = 6500, au2 = 7300;
    const c2 = r2(sp2 - vc2);
    const v = variances.salesVolume({ budgetUnits: bu2, actualUnits: au2, stdProfitPerUnit: c2 });
    chk(v.value, 680);
    b.num({
      d: 3, skill: "APPLICATION", kind: "money", value: v.amount, calculator: true, wrong: [r2((au2 - bu2) * sp2), r2((au2 - bu2) * vc2)],
      stem: `A Gweru dairy budgeted to sell ${F(bu2)} litres of milk. The standard selling price is US\\$2.20 a litre and the standard variable cost is US\\$1.35 a litre. It sold ${F(au2)} litres. Calculate the sales volume variance at standard contribution (the amount only).`,
      hints: ["Standard contribution = selling price less variable cost."],
      explanation: `Contribution = 2.20 - 1.35 = US\\$0.85. (${F(au2)} - ${F(bu2)}) × 0.85 = ${usd(v.amount)} favourable. Using the selling price of US\\$2.20 would overstate it at ${usd((au2 - bu2) * sp2)}.`,
    });
  }
  {
    const bu2 = 1800, au2 = 1450, p2u = 2.4;
    const v = variances.salesVolume({ budgetUnits: bu2, actualUnits: au2, stdProfitPerUnit: p2u });
    chk(v.value, -840);
    b.num({
      d: 3, skill: "APPLICATION", kind: "money", value: v.amount, calculator: true, wrong: [r2(au2 * p2u), r2(bu2 * p2u)],
      stem: `A Harare hardware shop budgeted to sell ${F(bu2)} gate hinges. The standard profit is US\\$2.40 a hinge after absorbing fixed overhead. It sold ${F(au2)} hinges. Calculate the sales volume variance at standard profit (the amount only).`,
      hints: ["The unit shortfall times the standard profit."],
      explanation: `(${F(au2)} - ${F(bu2)}) × 2.40 = -${F(v.amount)}, so the variance is ${usd(v.amount)} adverse. The profit on the ${F(au2)} hinges sold (${usd(au2 * p2u)}) is not the variance.`,
    });
  }
  {
    const sp2 = 40, vc2 = 27, bu2 = 500, au2 = 560, ap2 = 38.5;
    const c2 = r2(sp2 - vc2);
    const pr = variances.salesPrice({ stdPrice: sp2, actualPrice: ap2, actualUnits: au2 });
    const vo = variances.salesVolume({ budgetUnits: bu2, actualUnits: au2, stdProfitPerUnit: c2 });
    chk(pr.value, -840); chk(vo.value, 780);
    const tot = r2(pr.value + vo.value);
    chk(tot, -60); chk(r2(au2 * (ap2 - vc2) - bu2 * c2), tot);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: Math.abs(tot), calculator: true, wrong: [r2(pr.amount + vo.amount), vo.amount],
      stem: `A Bulawayo gas supplier has a standard selling price of US\\$40 for a cylinder and a standard variable cost of US\\$27. It budgeted to sell ${F(bu2)} cylinders and sold ${F(au2)} at an average price of US\\$38.50. Calculate the total sales margin variance on a contribution basis (the amount only).`,
      hints: ["Price variance on actual units; volume variance at contribution."],
      explanation: `Price: (38.50 - 40.00) × ${F(au2)} = ${usd(pr.amount)} adverse. Volume: 60 × 13 = ${usd(vo.amount)} favourable. Total = ${usd(Math.abs(tot))} adverse. Check: actual contribution ${F(au2 * (ap2 - vc2))} less budgeted ${F(bu2 * c2)}.`,
    });
  }
  {
    const stdP = 12, au2 = 2100, pv = -840, ap2 = r2(stdP + pv / au2);
    chk(ap2, 11.6);
    b.num({
      d: 4, skill: "ANALYSIS", kind: "money", value: ap2, calculator: true, wrong: [12.4, 840 / au2],
      stem: `The standard selling price of a product is US\\\$${stdP} a unit. In April ${F(au2)} units were sold and the sales price variance was US\\$840 adverse. Calculate the actual average selling price per unit.`,
      hints: ["Variance ÷ units = price difference."],
      explanation: `Price difference = 840 ÷ ${F(au2)} = US\\$0.40 below standard. Actual price = 12.00 - 0.40 = ${usd(ap2)}. Adding the difference (US\\$12.40) is the wrong direction for an adverse variance.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State three possible causes of an adverse sales price variance.",
    points: ["Discounts given to attract or keep customers", "Competitors cutting their prices", "Weak demand or an economic downturn forcing lower prices"],
    modelAnswer: "The business may have given discounts, competitors may have reduced prices, or demand may be weak so prices had to be lowered.",
    explanation: "One mark for each cause.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the sales volume variance is valued at the standard margin per unit instead of at the selling price.",
    points: ["Each extra unit sold also costs money to produce", "Only the margin (selling price less the costs saved or incurred) is extra profit", "Valuing at the price would overstate the effect on profit", "The variance measures the change in profit, not in revenue"],
    modelAnswer: "A unit sold earns the selling price but also uses costs. Only the margin is extra profit, so valuing at the selling price would overstate the effect on profit.",
    hints: ["Think about the cost of making the extra units."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A manager says: 'A favourable sales volume variance is always good news.' Evaluate this statement.",
    points: ["It increases profit by the standard margin on the extra units", "But the extra units may have been sold by cutting the price, giving an adverse price variance", "More production may cause overtime, shortages or lower quality (adverse production variances)", "A judgement: it is good only if the total effect on profit, after all linked variances, is favourable"],
    modelAnswer: "More sales add margin, but they may have been won by price cuts and may need overtime or extra material at higher cost. The statement is true only if total profit rises after all the linked variances are considered.",
    hints: ["Consider the linked price and production variances."],
    explanation: "One mark for each point.",
  });

  // Struct 1, 12 marks
  {
    const sp1 = 1.8, vc1 = 1.05, fo1 = 0.25, bu1 = 12000, au1 = 13500, ap1 = 1.7;
    const c1 = r2(sp1 - vc1), p1 = r2(sp1 - vc1 - fo1);
    chk(c1, 0.75); chk(p1, 0.5);
    const pr = variances.salesPrice({ stdPrice: sp1, actualPrice: ap1, actualUnits: au1 });
    const vc = variances.salesVolume({ budgetUnits: bu1, actualUnits: au1, stdProfitPerUnit: c1 });
    const vp = variances.salesVolume({ budgetUnits: bu1, actualUnits: au1, stdProfitPerUnit: p1 });
    chk(pr.value, -1350); chk(vc.value, 1125); chk(vp.value, 750);
    const tot = r2(pr.value + vc.value);
    chk(tot, -225); chk(r2(au1 * (ap1 - vc1) - bu1 * c1), tot);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `Tatenda Juices in Mutare makes fruit juice sold in litres. The standard selling price is US\\$1.80 a litre, the standard variable cost is US\\$1.05 and the standard fixed overhead absorbed is US\\$0.25. The budget was ${F(bu1)} litres. In June, ${F(au1)} litres were sold at US\\$1.70 a litre.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: pr.amount, wrong: [r2(0.1 * bu1), vc.amount], stem: "Calculate the sales price variance (amount only).", explanation: `(1.70 - 1.80) × ${F(au1)} = ${usd(pr.amount)} adverse.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: vc.amount, wrong: [vp.amount, r2(1500 * sp1)], stem: "Calculate the sales volume variance at standard contribution (amount only).", explanation: `Contribution = 1.80 - 1.05 = US\\$0.75. (${F(au1)} - ${F(bu1)}) × 0.75 = ${usd(vc.amount)} favourable.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: vp.amount, wrong: [vc.amount, r2(1500 * fo1)], stem: "Calculate the sales volume variance at standard profit (amount only).", explanation: `Profit = 1.80 - 1.05 - 0.25 = US\\$0.50. 1,500 × 0.50 = ${usd(vp.amount)} favourable.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: Math.abs(tot), wrong: [r2(pr.amount + vc.amount), pr.amount], stem: "Calculate the total sales margin variance on the contribution basis (amount only).", explanation: `${usd(vc.amount)} F - ${usd(pr.amount)} A = ${usd(Math.abs(tot))} adverse.` }),
        P.manual({ label: "(e)", marks: 4, stem: "Advise whether the price cut was a good decision.", points: ["The price cut produced more volume (favourable US\\$1,125)", "But the adverse price variance (US\\$1,350) is larger, so contribution fell by US\\$225", "More production also needs more materials and labour, which may cause further adverse variances", "Recommendation: not a good decision on these figures; return to the standard price unless the extra volume has other benefits (market share)"], modelAnswer: "The cut raised volume (US\\$1,125 favourable) but cost US\\$1,350 in price, so contribution fell by US\\$225. With extra production costs likely, the cut was not worthwhile unless it wins lasting market share.", hints: ["Compare the two variances."], explanation: "One mark for each point." }),
      ],
      hints: ["Contribution per litre = selling price less variable cost.", "Price variance uses the actual litres sold."],
      explanation: "This item calculates sales variances on two bases and evaluates a discount.",
    });
  }

  // Struct 2, 8 marks
  {
    const stdP = 15, vcc = 9.5, bu2 = 2400, au2 = 2100, ap2 = 15.4;
    const c2 = r2(stdP - vcc);
    chk(c2, 5.5);
    const pr = variances.salesPrice({ stdPrice: stdP, actualPrice: ap2, actualUnits: au2 });
    const vo = variances.salesVolume({ budgetUnits: bu2, actualUnits: au2, stdProfitPerUnit: c2 });
    chk(pr.value, 840); chk(vo.value, -1650);
    const tot = r2(pr.value + vo.value);
    chk(tot, -810); chk(r2(au2 * (ap2 - vcc) - bu2 * c2), tot);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Chipo Hardware in Chinhoyi sells a 20-litre drum of paint. The standard price is US\\\$${stdP} and the standard variable cost US\\\$${vcc}. The budget was ${F(bu2)} drums. In September ${F(au2)} drums were sold at US\\\$${p2(ap2)} each.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: pr.amount, wrong: [r2(0.4 * bu2), vo.amount], stem: "Calculate the sales price variance (amount only).", explanation: `(15.40 - 15.00) × ${F(au2)} = ${usd(pr.amount)} favourable.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: vo.amount, wrong: [r2(300 * stdP), r2(300 * vcc)], stem: "Calculate the sales volume variance at standard contribution (amount only).", explanation: `Contribution = 15.00 - 9.50 = US\\$5.50. 300 fewer × 5.50 = ${usd(vo.amount)} adverse.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: Math.abs(tot), wrong: [r2(pr.amount + vo.amount), pr.amount], stem: "Calculate the total sales margin variance (amount only).", explanation: `${usd(vo.amount)} A - ${usd(pr.amount)} F = ${usd(Math.abs(tot))} adverse.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest one reason for the pattern of the two variances.", points: ["The price was raised above the standard, giving the favourable price variance", "Some customers bought elsewhere, so fewer drums were sold than budgeted"], modelAnswer: "The shop raised its price above standard, which gave a favourable price variance, but some customers went to competitors, so volume fell.", explanation: "One mark for each point." }),
      ],
      hints: ["Contribution = price less variable cost."],
      explanation: "This item calculates both sales variances and interprets them.",
    });
  }

  b.card("FORMULA", "Sales price variance", "(Actual price - standard price) × actual units sold. Positive = favourable.");
  b.card("FORMULA", "Sales volume variance", "(Actual units - budgeted units) × standard profit (or contribution) per unit. Positive = favourable.");
  b.card("FACT", "Total sales margin variance", "Sales price variance + sales volume variance = actual margin at standard cost - budgeted margin.");
  b.card("CONCEPT", "Why use the standard margin?", "Extra units also incur costs, so only the margin is extra profit. Revenue would overstate the effect.");
  b.card("CONCEPT", "Absorption v marginal basis", "Absorption: standard profit per unit after fixed overhead. Marginal: standard contribution per unit. The question states which.");
  b.card("CONCEPT", "Price and volume interact", "A price cut may raise volume (adverse price, favourable volume); a price rise may lose volume. Judge the net effect.");
  b.card("CONCEPT", "Causes of sales price variances", "Discounts, competition, demand, promotions, quality, price rises.");
  b.card("CONCEPT", "Causes of sales volume variances", "Marketing, price changes, new customers, supply shortages, seasons, competitors.");
  b.card("FACT", "Sales sign rule", "For sales, more price or more units than standard is favourable; the reverse of cost variances.");
});
