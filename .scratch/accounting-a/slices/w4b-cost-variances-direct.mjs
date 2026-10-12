// W4b: cost.variances-direct
import { concept, P, table, chk, r2, variances } from "../lib.mjs";
import { mc, F, usd, p2, V } from "../tables/w4b-lib.mjs";

concept("aacc.cost.variances-direct", { file: "cost/variances-direct", keyPrefix: "cost.variances-direct" }, (b) => {
  // Sipho Furniture, Masvingo: chairs
  const sT = 3, sTP = 2.5, sH = 1.5, sHR = 4;
  const bud = 400, out = 460;
  const aT = 1500, aTC = 3975, aH = 650, aHC = 2704;
  const aTP = aTC / aT, aHR = aHC / aH;
  chk(aTP, 2.65, 1e-9); chk(aHR, 4.16, 1e-9);
  const sq = sT * out, sh = sH * out;
  const mp = variances.materialPrice({ stdPrice: sTP, actualPrice: aTP, actualQty: aT });
  const mu = variances.materialUsage({ stdQtyForActualOutput: sq, actualQty: aT, stdPrice: sTP });
  const lr = variances.labourRate({ stdRate: sHR, actualRate: aHR, actualHours: aH });
  const le = variances.labourEfficiency({ stdHoursForActualOutput: sh, actualHours: aH, stdRate: sHR });
  chk(mp.value, -225); chk(mu.value, -300); chk(lr.value, -104); chk(le.value, 160);
  const stdDirect = r2(out * (sT * sTP + sH * sHR));
  const actDirect = aTC + aHC;
  const totV = r2(stdDirect - actDirect);
  chk(totV, -469); chk(mp.value + mu.value + lr.value + le.value, totV);
  const data = `Sipho Furniture in Masvingo makes chairs. The standard for one chair is 3 metres of timber at US\\$2.50 a metre and 1.5 labour hours at US\\$4.00 an hour. The budget was ${bud} chairs; ${out} chairs were made using ${F(aT)} metres of timber costing ${usd(aTC)} and ${F(aH)} labour hours paid at a total of ${usd(aHC)}.`;

  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which formula gives the direct material usage variance?",
    ok: ["(Standard quantity for actual output - actual quantity used) × standard price", "Correct: quantity difference valued at the standard price."],
    bad: [["(Standard price - actual price) × actual quantity", "That is the price variance."], ["(Actual quantity - budgeted quantity) × actual price per unit of material used", "The budget is not the yardstick, and the standard price is used."], ["Actual cost - budgeted cost", "That is an unflexed comparison, not a usage variance."]],
    explanation: "Usage variance = (standard quantity for the actual output - actual quantity) × standard price.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "Cloth has a standard price of US\\$5.00 a metre. A tailor bought 200 metres at US\\$5.40. What is the material price variance?",
    ok: ["US\\$80 adverse", "Correct: (5.00 - 5.40) × 200."],
    bad: [["US\\$80 favourable", "Paying more than standard is adverse."], ["US\\$40 adverse", "The price difference has been multiplied by 100 metres, not 200."], ["US\\$1,080 adverse", "That is the actual cost, not the variance."]],
    hints: ["(Standard - actual) × actual quantity."],
    explanation: "(US\\$5.00 - US\\$5.40) × 200 = -US\\$80, which is adverse.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a likely cause of a favourable labour rate variance?",
    ok: ["Using a lower grade of worker than the standard allows", "Correct: lower grades cost less per hour."],
    bad: [["Paying overtime to meet an order", "Overtime raises the average rate (adverse)."], ["A wage increase agreed after the standard was set for the year", "A wage increase gives an adverse rate variance."], ["Workers taking longer than the standard time", "That affects efficiency, not the rate."]],
    explanation: "Employing cheaper grades lowers the average hourly rate below standard.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "At which rate is the labour efficiency variance valued?",
    ok: ["The standard rate per hour", "Correct: the hours difference is valued at standard rate."],
    bad: [["The actual rate per hour", "Using the actual rate would overlap with the rate variance."], ["The budgeted selling price per hour", "Selling price is not used."], ["The average of standard and actual rates", "No averaging is used in variance analysis."]],
    hints: ["The efficiency variance isolates hours."],
    explanation: "Efficiency variance = (standard hours for actual output - actual hours) × standard rate.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A bakery buys cheaper flour of lower quality. Which pair of variances is most likely?",
    ok: ["Favourable material price and adverse material usage", "Correct: cheaper but more wastage."],
    bad: [["Adverse material price and favourable material usage", "Cheaper flour would not give an adverse price."], ["Favourable material price and favourable labour rate", "The flour does not affect the wage rate."], ["Adverse material price and adverse labour rate", "Neither follows from cheaper flour."]],
    hints: ["Poor material usually causes waste."],
    explanation: "The lower price gives a favourable price variance, but poor quality can increase waste and spoil batches.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A standard of 2 labour hours a unit applies. A workshop made 350 units and the workers were paid for 760 hours. How many standard hours are allowed for the output?",
    ok: ["700 hours", "Correct: 350 × 2."],
    bad: [["760 hours", "That is the actual hours paid."], ["350 hours", "That is the number of units, not hours."], ["1,520 hours", "The actual hours have been doubled by mistake."]],
    hints: ["Standard hours are for the actual output."],
    explanation: "Standard hours allowed = 350 units × 2 hours = 700 hours.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Standard hours for the output were 1,200 at a standard rate of US\\$4. Workers were paid for 1,300 hours at US\\$4.20. Which statement is correct?",
    ok: ["Efficiency US\\$400 adverse and rate US\\$260 adverse", "Correct: (1,200 - 1,300) × 4 and (4.00 - 4.20) × 1,300."],
    bad: [["Efficiency US\\$420 adverse and rate US\\$200 adverse", "The efficiency variance has used the actual rate and the rate variance the standard hours."], ["Efficiency US\\$400 favourable and rate US\\$260 adverse", "More hours than standard is adverse."], ["Efficiency US\\$260 adverse and rate US\\$400 adverse", "The two variances have been swapped."]],
    hints: ["Efficiency at the standard rate; rate on actual hours."],
    explanation: "Efficiency: (1,200 - 1,300) × 4.00 = 400 A. Rate: (4.00 - 4.20) × 1,300 = 260 A.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The material usage variance is valued at the actual price paid for the material.", answer: false, explanation: "False. It is valued at the standard price so that it measures quantity only; the price effect is in the price variance." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "The sum of the four direct cost variances equals the standard direct cost of the actual output less the actual direct cost.", answer: true, hints: ["Price and quantity effects do not overlap."], explanation: "True. The price and quantity parts together make up the whole difference." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each variance to the most likely cause of an ADVERSE result.",
    pairs: ["Material price", "Material usage", "Labour rate", "Labour efficiency"],
    right: ["Supplier raised the price of timber", "Faulty cutting wasted timber", "Overtime was paid at a higher rate", "Untrained workers took longer than standard"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Price and rate variances come from what is paid; usage and efficiency variances come from how much is used.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "When actual cost is {{blank:a}} the standard cost allowed, the variance is {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["above"], choices: ["above", "below", "equal to"] }, { id: "b", accepted: ["adverse"], choices: ["adverse", "favourable", "nil"] }],
    explanation: "Actual cost above standard reduces profit, which is an adverse variance.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the variance that arises when workers take more hours than the standard allows for the output.", accepted: ["labour efficiency variance", "labour efficiency", "efficiency variance", "efficiency"], explanation: "It is the (adverse) labour efficiency variance." });

  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: mp.amount, calculator: true, wrong: [mu.amount, 0.15, 2.65 * aT - 2.5 * sq],
    stem: `${data}\n\nCalculate the material price variance (the amount only).`,
    hints: ["(Standard price - actual price) × actual quantity."],
    explanation: `Actual price = ${F(aTC)} ÷ ${F(aT)} = US\\$2.65. (2.50 - 2.65) × ${F(aT)} = ${usd(mp.amount)}, which is adverse. Using the standard quantity of ${F(sq)} metres would give a different, wrong, figure.`,
  });
  {
    const stdQ = 4.2, stdP = 6.4, u = 350, used = 1540;
    const v = variances.materialUsage({ stdQtyForActualOutput: stdQ * u, actualQty: used, stdPrice: stdP });
    chk(v.value, -448);
    b.num({
      d: 3, skill: "APPLICATION", kind: "money", value: v.amount, calculator: true, wrong: [r2((used - stdQ * u) * 6.9), 70],
      stem: `A Chinhoyi carpenter makes doors. The standard is 4.2 m² of board at US\\$6.40 a square metre for each door. In May 350 doors were made and 1,540 m² of board were used. Calculate the material usage variance (the amount only).`,
      hints: ["Find the standard quantity for 350 doors first."],
      explanation: `Standard quantity = 350 × 4.2 = ${F(stdQ * u)} m². Used ${F(used)} m², which is 70 m² too much. 70 × US\\$6.40 = ${usd(v.amount)} adverse. The 70 m² difference alone is not the variance until it is valued at the standard price.`,
    });
  }
  {
    const sR = 3.8, hrs = 1050, paid = 4410;
    const aR = paid / hrs;
    chk(aR, 4.2, 1e-9);
    const v = variances.labourRate({ stdRate: sR, actualRate: aR, actualHours: hrs });
    chk(v.value, -420);
    b.num({
      d: 3, skill: "APPLICATION", kind: "money", value: v.amount, calculator: true, wrong: [0.4, r2((sR * hrs) - 4000)],
      stem: `A Masvingo building team has a standard wage rate of US\\$3.80 an hour. In June the team was paid ${usd(paid)} for ${F(hrs)} hours. Calculate the labour rate variance (the amount only).`,
      hints: ["Actual rate = wages ÷ hours."],
      explanation: `Actual rate = ${F(paid)} ÷ ${F(hrs)} = US\\$4.20. (3.80 - 4.20) × ${F(hrs)} = ${usd(v.amount)} adverse. The rate difference of US\\$0.40 must be multiplied by the hours paid.`,
    });
  }
  {
    const sH = 3.5, sR = 4.6, u = 280, worked = 1010;
    const v = variances.labourEfficiency({ stdHoursForActualOutput: sH * u, actualHours: worked, stdRate: sR });
    chk(v.value, -138);
    b.calc({
      d: 4, skill: "APPLICATION", kind: "money", value: v.amount, calculator: true, wrong: [r2((worked - sH * u) * 5), 30],
      stem: `A Harare tailor has a standard of 3.5 hours at US\\$4.60 an hour for each jacket. In October 280 jackets were made and the tailors worked ${F(worked)} hours. Calculate the labour efficiency variance (the amount only).`,
      hints: ["Standard hours for 280 jackets first."],
      explanation: `Standard hours = 280 × 3.5 = ${F(sH * u)}. Worked ${F(worked)}, which is 30 hours more. 30 × US\\$4.60 = ${usd(v.amount)} adverse. The hours difference (30) is not the variance until valued at the standard rate.`,
    });
  }
  {
    const o = 900;
    const wq = 1860, wc = 3627, lh = 470, lc = 1833;
    const wp = wc / wq, lrt = lc / lh;
    chk(wp, 1.95, 1e-9); chk(lrt, 3.9, 1e-9);
    const v1 = variances.materialPrice({ stdPrice: 1.9, actualPrice: wp, actualQty: wq });
    const v2 = variances.materialUsage({ stdQtyForActualOutput: 2 * o, actualQty: wq, stdPrice: 1.9 });
    const v3 = variances.labourRate({ stdRate: 4, actualRate: lrt, actualHours: lh });
    const v4 = variances.labourEfficiency({ stdHoursForActualOutput: 0.5 * o, actualHours: lh, stdRate: 4 });
    chk(v1.value, -93); chk(v2.value, -114); chk(v3.value, 47); chk(v4.value, -80);
    const stdD = r2(o * (2 * 1.9 + 0.5 * 4));
    const tot = r2(stdD - (wc + lc));
    chk(tot, -240); chk(v1.value + v2.value + v3.value + v4.value, tot);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: Math.abs(tot), calculator: true, wrong: [v1.amount + v2.amount + v3.amount + v4.amount, v1.amount + v2.amount],
      stem: `A Gweru candle maker has standards for a box of candles of 2 kg of wax at US\\$1.90 a kilogram and 0.5 hours of labour at US\\$4.00 an hour. In March ${o} boxes were made. The business used ${F(wq)} kg of wax costing ${usd(wc)} and paid ${usd(lc)} for ${F(lh)} labour hours. Calculate the total direct cost variance (the amount only).`,
      hints: ["Standard direct cost of 900 boxes less the actual direct cost."],
      explanation: `Standard direct cost = ${o} × (3.80 + 2.00) = ${usd(stdD)}. Actual = ${usd(wc)} + ${usd(lc)} = ${usd(wc + lc)}. Variance = ${usd(Math.abs(tot))} adverse. Check: 93 A + 114 A + 47 F + 80 A = 240 A. Adding every variance as adverse gives ${usd(v1.amount + v2.amount + v3.amount + v4.amount)}.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State three possible causes of an adverse material usage variance.",
    points: ["Waste or spoilage during production", "Poor-quality material that causes more rejects", "Untrained or careless workers, faulty machines or theft"],
    modelAnswer: "Material may be wasted or spoiled, the material may be of poor quality so more is rejected, and workers may be untrained or machines faulty.",
    explanation: "One mark for each cause.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "A manager buys cheaper cloth and reports a favourable price variance of US\\$600 but an adverse usage variance of US\\$900. Explain whether the decision was wise.",
    points: ["The price saving is US\\$600 favourable", "The usage variance of US\\$900 more than cancels it, so there is a net loss of US\\$300", "Poor quality is the likely cause of waste", "The decision was not wise unless the quality can be improved or the price falls further"],
    modelAnswer: "The cheaper cloth saved US\\$600 but caused US\\$900 of extra waste, so the net effect is US\\$300 adverse. The poorer quality probably caused the waste, so the decision was not wise.",
    hints: ["Compare the two variances together."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The production manager receives a report with a large adverse labour efficiency variance. Evaluate whether it is fair to hold her fully responsible.",
    points: ["She controls how workers use their time, so some responsibility is fair", "The cause may be outside her control, such as poor material or late supply of materials", "A machine breakdown or maintenance failure may be responsible", "A judgement is needed after investigating the cause, rather than blaming at once"],
    modelAnswer: "She controls the use of labour time, so she is partly responsible. However, poor material, late deliveries or machine breakdowns may have caused the extra hours. The cause should be investigated before blaming her.",
    hints: ["Controllable and uncontrollable causes."],
    explanation: "One mark for each point.",
  });

  // Struct 1: Sipho-type data, 12 marks, with a different business (Nyasha Uniforms)
  {
    const sM = 1.2, sMP = 6.5, sL = 0.8, sLR = 5;
    const o = 600;
    const aM = 750, aMC = 4950, aL = 505, aLC = 2424;
    const aMP = aMC / aM, aLR = aLC / aL;
    chk(aMP, 6.6, 1e-9); chk(aLR, 4.8, 1e-9);
    const mpv = variances.materialPrice({ stdPrice: sMP, actualPrice: aMP, actualQty: aM });
    const muv = variances.materialUsage({ stdQtyForActualOutput: sM * o, actualQty: aM, stdPrice: sMP });
    const lrv = variances.labourRate({ stdRate: sLR, actualRate: aLR, actualHours: aL });
    const lev = variances.labourEfficiency({ stdHoursForActualOutput: sL * o, actualHours: aL, stdRate: sLR });
    chk(mpv.value, -75); chk(muv.value, -195); chk(lrv.value, 101); chk(lev.value, -125);
    const stdD = r2(o * (sM * sMP + sL * sLR));
    const actD = aMC + aLC;
    const tv = r2(stdD - actD);
    chk(mpv.value + muv.value + lrv.value + lev.value, tv);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `Nyasha Uniforms in Bulawayo makes school shirts. The standard for each shirt is 1.2 metres of cloth at US\\$6.50 a metre and 0.8 hours of labour at US\\$5.00 an hour. In May the business made ${o} shirts. It used ${F(aM)} metres of cloth costing ${usd(aMC)} and the machinists worked ${F(aL)} hours and were paid ${usd(aLC)}.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: mpv.amount, wrong: [muv.amount, 0.1], stem: "Calculate the material price variance (amount only).", explanation: `Actual price = ${F(aMC)} ÷ ${F(aM)} = US\\$6.60. (6.50 - 6.60) × ${F(aM)} = ${usd(mpv.amount)} adverse.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: muv.amount, wrong: [r2((aM - o * sM) * aMP), mpv.amount], stem: "Calculate the material usage variance (amount only).", explanation: `Standard quantity = ${o} × 1.2 = ${F(sM * o)} metres. Used ${F(aM)}; 30 metres more. 30 × US\\$6.50 = ${usd(muv.amount)} adverse.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: lrv.amount, wrong: [lev.amount, 0.2], stem: "Calculate the labour rate variance (amount only).", explanation: `Actual rate = ${F(aLC)} ÷ ${F(aL)} = US\\$4.80. (5.00 - 4.80) × ${F(aL)} = ${usd(lrv.amount)}, favourable.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: lev.amount, wrong: [r2((o * sL - aL) * aLR), lrv.amount], stem: "Calculate the labour efficiency variance (amount only).", explanation: `Standard hours = ${o} × 0.8 = ${F(sL * o)}. Worked ${F(aL)}, which is 25 hours more. 25 × US\\$5.00 = ${usd(lev.amount)} adverse.` }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: Math.abs(tv), wrong: [r2(mpv.amount + muv.amount + lrv.amount + lev.amount), r2(mpv.amount + muv.amount + lev.amount)], stem: "Calculate the total direct cost variance (amount only).", explanation: `75 A + 195 A + 101 F + 125 A = ${usd(Math.abs(tv))} adverse. Check: standard ${usd(stdD)} less actual ${usd(actD)}.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest one reason why the labour rate variance is favourable but the labour efficiency variance is adverse.", points: ["Less experienced (lower paid) machinists may have been used, which lowers the average rate", "They would work more slowly than the standard time, giving an adverse efficiency variance"], modelAnswer: "Cheaper, less experienced machinists may have been used, so the rate was lower than standard, but they took more hours than the standard time.", explanation: "One mark for each point." }),
      ],
      hints: ["Standard quantity and hours are for 600 shirts.", "Price on the quantity bought and used; the two quantities are the same here."],
      explanation: "This item calculates the four direct variances and links the rate and efficiency variances.",
    });
  }

  // Struct 2: 10 marks, purchases differ from usage
  {
    const sQ = 2.5, sP = 1.2, u = 800;
    const bought = 2300, aP = 1.15, used = 2100;
    const cost = r2(bought * aP);
    chk(cost, 2645);
    const pv = variances.materialPrice({ stdPrice: sP, actualPrice: aP, actualQty: bought });
    const uv = variances.materialUsage({ stdQtyForActualOutput: sQ * u, actualQty: used, stdPrice: sP });
    chk(pv.value, 115); chk(uv.value, -120);
    const inv = r2((bought - used) * sP);
    chk(r2(used * sP + inv - pv.value), cost);
    b.struct({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: `Rudo's Bakery in Chinhoyi has a standard of 2.5 kg of flour at US\\$1.20 a kilogram for each batch of rolls. In August it baked ${u} batches. It bought ${F(bought)} kg of flour at US\\$1.15 a kilogram and used ${F(used)} kg. The price variance is calculated on the quantity purchased.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: pv.amount, wrong: [r2((sP - aP) * used), 0.05], stem: "Calculate the flour price variance (amount only).", explanation: `(1.20 - 1.15) × ${F(bought)} = ${usd(pv.amount)} favourable (on purchases).` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: uv.amount, wrong: [r2((sQ * u - used) * aP), pv.amount], stem: "Calculate the flour usage variance (amount only).", explanation: `Standard quantity = ${u} × 2.5 = ${F(sQ * u)} kg. Used ${F(used)} kg, 100 kg more. 100 × US\\$1.20 = ${usd(uv.amount)} adverse.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: inv, wrong: [r2((bought - used) * aP), r2(bought * sP)], stem: "Calculate the value, at standard cost, of the increase in flour inventory.", explanation: `(${F(bought)} - ${F(used)}) = 200 kg × US\\$1.20 = ${usd(inv)}.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "If the price variance were calculated on the quantity used instead, the variance would be:", options: [["smaller (US\\$105 favourable)", "Correct: 0.05 × 2,100."], ["larger (US\\$115 favourable)", "That is the figure on purchases."], ["US\\$105 adverse", "Paying less than standard is favourable."], ["the same, because usage does not matter", "The quantity changes, so the variance changes."]], answer: "A", explanation: "0.05 × 2,100 = US\\$105 favourable." }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain why the baker may prefer to calculate the price variance on purchases.", points: ["The price effect is reported in the period when the buyer made the decision", "Inventory can be valued at standard price, which simplifies records", "The purchasing manager is held responsible for the price paid when it is paid"], modelAnswer: "The variance is reported when the purchase is made, so the buyer is held to account promptly, and inventory can be recorded at the standard price, which simplifies the accounts.", explanation: "One mark for each point." }),
      ],
      hints: ["Price variance: actual quantity bought. Usage variance: quantity used.", "Inventory increase = bought less used."],
      explanation: "This item separates the quantity bought from the quantity used.",
    });
  }

  b.card("FORMULA", "Material price variance", "(Standard price - actual price) × actual quantity (bought or used as stated). Positive = favourable.");
  b.card("FORMULA", "Material usage variance", "(Standard quantity for actual output - actual quantity used) × standard price.");
  b.card("FORMULA", "Labour rate variance", "(Standard rate - actual rate) × actual hours paid.");
  b.card("FORMULA", "Labour efficiency variance", "(Standard hours for actual output - actual hours worked) × standard rate.");
  b.card("FACT", "Total direct cost variance", "Standard direct cost of actual output - actual direct cost = material price + usage + labour rate + efficiency variances.");
  b.card("CONCEPT", "Standard quantity for actual output", "Actual units produced × standard quantity per unit. The yardstick for usage and efficiency variances.");
  b.card("CONCEPT", "Why price variances use the actual quantity", "The price difference applies to everything bought or used at the actual price; the quantity effect is left to the usage variance at standard price.");
  b.card("CONCEPT", "Interdependent variances", "Cheap, poor material may give a favourable price variance but adverse usage and efficiency variances.");
  b.card("FACT", "Sign convention", "Positive variance = favourable (profit up). Negative = adverse (profit down). Always label F or A.");
});
void p2; void V; void table;
