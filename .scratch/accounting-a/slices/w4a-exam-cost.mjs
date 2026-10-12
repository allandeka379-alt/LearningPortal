// W4a exam-format items: COST25 (25 marks, EVALUATION): ZIMSEC Paper 3 cost questions on (1) absorption, (2) marginal costing, (3) decisions;
// Cambridge Paper 4 question on (4) activity based costing against traditional absorption (A Level content).
import { concept, P, EXAM, checkExam, ZIM, CAM, chk, r2, table, statement, costing } from "../lib.mjs";
import { F, usd, p1, p2 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.overhead-absorption", { file: "exam/w4a-cost", keyPrefix: "exam.w4a-cost" }, (b) => {
  const Z = EXAM.COST25;

  // ===================================================================================================
  // Item 1 (ZIMSEC Paper 3): Masvingo Steel Fabricators, overhead allocation, absorption and a job price
  {
    const rent = 33000, dep = 21000;
    const rentSh = { M: (rent * 440) / 1000, W: (rent * 360) / 1000, S: (rent * 200) / 1000 };
    const depSh = { M: dep * 0.6, W: dep * 0.3, S: dep * 0.1 };
    const sup = { M: 5940, W: 3160 }, stores = 6200;
    const sTot = rentSh.S + depSh.S + stores;
    chk(sTot, 14900);
    const toM = sTot * 0.6, toW = sTot * 0.4;
    const mTot = rentSh.M + depSh.M + sup.M + toM, wTot = rentSh.W + depSh.W + sup.W + toW;
    chk(mTot, 42000); chk(wTot, 27300);
    const mh = 6000, dlh = 7800;
    const mr = mTot / mh, wr = wTot / dlh;
    chk(mr, 7); chk(wr, 3.5);
    const aMh = 6300, aDlh = 7400, aM = 43600, aW = 26780;
    const absM = aMh * mr, absW = aDlh * wr;
    chk(absM, 44100); chk(absW, 25900);
    const underW = aW - absW;
    chk(underW, 880);
    const job = 1150 + 34 * 6 + 24 * mr + 34 * wr;
    chk(job, 1641);
    const price = job / 0.8;
    chk(price, 2051.25);
    b.struct({
      d: 5, examStyle: true, skill: Z.skill, secs: Z.secs, applies: ZIM, calculator: true,
      paper: "ZIMSEC Paper 3", concepts: ["aacc.cost.overhead-allocation", "aacc.cost.overhead-absorption", "aacc.cost.over-under-absorption", "aacc.cost.job-batch"],
      stem: `Masvingo Steel Fabricators has two production departments, Machining and Welding, and a Stores department. Annual overheads for 2026:\n\n${table(["Overhead", "US\\$", "Basis of apportionment or allocation"], [["Factory rent", rent, "Floor area: Machining 440 m², Welding 360 m², Stores 200 m²"], ["Depreciation of machinery", dep, "Carrying amount: Machining 60%, Welding 30%, Stores 10%"], ["Supervisors' salaries", sup.M + sup.W, `Allocated: Machining ${usd(sup.M)}, Welding ${usd(sup.W)}`], ["Storekeepers' wages", stores, "Allocated to Stores"]], ["l", "r", "l"])}\n\nThe Stores department is used by Machining and Welding in the ratio 60 : 40. Overheads are absorbed in Machining on machine hours (budget ${F(mh)} hours) and in Welding on direct labour hours (budget ${F(dlh)} hours).\n\nActual results for 2026: Machining ${F(aMh)} machine hours and overhead ${usd(aM)}; Welding ${F(aDlh)} direct labour hours and overhead ${usd(aW)} (both after reapportionment of Stores).\n\nJob FAB22 used direct materials of ${usd(1150)}, 34 direct labour hours at ${usd(6)} an hour (all in Welding) and 24 machine hours in Machining.`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: rentSh.W, wrong: [rent / 3, rentSh.M], stem: "Calculate the rent apportioned to Welding.", explanation: `${F(rent)} × 360/1,000 = ${usd(rentSh.W)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: sTot, wrong: [stores, sTot - stores], stem: "Calculate the total overhead of the Stores department before reapportionment.", explanation: `Rent ${F(rentSh.S)} + depreciation ${F(depSh.S)} + wages ${F(stores)} = ${usd(sTot)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: toM, wrong: [toW, sTot / 2], stem: "Calculate the Stores overhead reapportioned to Machining.", explanation: `${F(sTot)} × 60% = ${usd(toM)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: mTot, wrong: [mTot - toM, mTot + toW], stem: "Calculate the total overhead of Machining after reapportionment.", explanation: `Rent ${F(rentSh.M)} + depreciation ${F(depSh.M)} + supervisors ${F(sup.M)} + Stores ${F(toM)} = ${usd(mTot)}.` }),
        P.group({ label: "(e)", stem: "Calculate the budgeted absorption rate for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "money", value: mr, wrong: [mTot / dlh, aM / aMh], stem: "Machining, per machine hour", explanation: `${F(mTot)} ÷ ${F(mh)} = ${usd(mr)}.` }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: wr, wrong: [wTot / mh, aW / aDlh], stem: "Welding, per direct labour hour", explanation: `${F(wTot)} ÷ ${F(dlh)} = ${usd(wr)}.` }),
        ] }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: absM, wrong: [aM, mh * mr], stem: "Calculate the overhead absorbed by Machining in 2026.", explanation: `${F(aMh)} × ${mr} = ${usd(absM)}.` }),
        P.num({ label: "(g)", marks: 3, kind: "money", value: underW, wrong: [aW, absW], stem: "Calculate the under-absorbed overhead in Welding (give the amount only).", explanation: `Absorbed ${F(aDlh)} × ${wr} = ${F(absW)}; actual ${F(aW)}; under-absorbed ${usd(underW)}.` }),
        P.num({ label: "(h)", marks: 3, kind: "money", value: job, wrong: [1150 + 204, 1150 + 204 + 24 * wr], stem: "Calculate the total production cost of Job FAB22.", explanation: `Prime cost ${F(1150 + 204)}; Machining 24 × ${mr} = ${F(24 * mr)}; Welding 34 × ${wr} = ${F(34 * wr)}; total ${usd(job)}.` }),
        P.num({ label: "(i)", marks: 2, kind: "money", value: price, dp: 2, wrong: [job * 1.2, job * 0.8], stem: "The firm wants a profit margin of 20% on the selling price. Calculate the price to quote for Job FAB22.", explanation: `${F(job)} ÷ 0.80 = ${usd(price)}.` }),
        P.manual({ label: "(j)", marks: 5, stem: "A customer offers US\\$1,900 for Job FAB22. Welding is short of work and overhead is largely fixed. Evaluate whether the firm should accept, referring to your calculations and to non-financial factors.".replace("US$", "US\\$"), points: [`The offer of 1,900 is above the full production cost of ${F(job)} and earns ${F(1900 - job)}`, "But it is below the target price and gives a margin below 20%", "Most overhead is fixed, so the relevant gain is higher than the profit shown by full costing if there is spare capacity", "Non-financial: spare capacity in Welding and the chance of repeat orders from the customer", "Recommendation: accept if there is spare capacity and no regular work is displaced; otherwise negotiate a higher price"], modelAnswer: `The offer covers the full production cost of ${F(job)} and earns ${F(1900 - job)}, though below the 20% margin target. With Welding short of work most of the overhead is incurred anyway, so accepting adds to profit. The firm should accept if no regular work is lost and the customer may order again.`, hints: ["Compare the offer with the full cost and the target price."], explanation: "One mark for each point, up to 5." }),
      ]),
      hints: ["Apportion shared costs on the stated bases.", "Reapportion Stores before calculating the rates."],
      explanation: "This ZIMSEC Paper 3 style cost question tests the overhead analysis, absorption rates, under-absorption, a job cost and a recommendation.",
    });
  }

  // ===================================================================================================
  // Item 2 (ZIMSEC Paper 3): Zvishavane Paints, marginal costing and a closure decision
  {
    const G = { units: 5500, price: 15, vc: 9 }, M = { units: 3000, price: 10, vc: 6 };
    const gC = G.price - G.vc, mC = M.price - M.vc;
    chk(gC, 6); chk(mC, 4);
    const totC = G.units * gC + M.units * mC;
    chk(totC, 45000);
    const common = 28000, mSpec = 6500;
    const fixed = common + mSpec;
    const profit = totC - fixed;
    chk(profit, 10500);
    const mLoss = M.units * mC - common / 2 - mSpec;
    chk(mLoss, -8500);
    const closeEffect = M.units * mC - mSpec;
    chk(closeEffect, 5500);
    const sales = G.units * G.price + M.units * M.price;
    chk(sales, 112500);
    const bepRev = fixed / (totC / sales);
    chk(bepRev, 86250);
    const mosPct = ((sales - bepRev) / sales) * 100;
    chk(mosPct, 23.3333, 1e-3);
    b.struct({
      d: 5, examStyle: true, skill: Z.skill, secs: Z.secs, applies: ZIM, calculator: true,
      paper: "ZIMSEC Paper 3", concepts: ["aacc.cost.marginal-costing", "aacc.cost.break-even", "aacc.cost.decisions"],
      stem: `Zvishavane Paints Ltd makes two products, gloss paint (G) and matt paint (M). Information for 2026:\n\n${table(["", "Gloss (G)", "Matt (M)"], [["Units sold", F(G.units), F(M.units)], ["Selling price per unit US\\$", G.price, M.price], ["Variable cost per unit (including selling) US\\$", G.vc, M.vc]], ["l", "r", "r"])}\n\nFixed costs common to both products were ${usd(common)}. In addition, fixed costs of ${usd(mSpec)} are incurred only because matt paint is made, and would be avoided if matt paint stopped being made. The directors have been given a profit statement in which the common fixed costs are shared equally between the products, and they are considering stopping the production of matt paint. Give percentages to one decimal place.`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: gC, wrong: [G.vc, G.price], stem: "Calculate the contribution per unit of gloss paint.", explanation: `${G.price} - ${G.vc} = ${usd(gC)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: mC, wrong: [M.vc, M.price], stem: "Calculate the contribution per unit of matt paint.", explanation: `${M.price} - ${M.vc} = ${usd(mC)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: totC, wrong: [G.units * gC, sales], stem: "Calculate the total contribution of the two products.", explanation: `Gloss ${F(G.units * gC)} + matt ${F(M.units * mC)} = ${usd(totC)}.` }),
        P.num({ label: "(d)", marks: 3, kind: "money", value: profit, wrong: [totC - common, totC], stem: "Calculate the profit for the year.", explanation: `${F(totC)} - ${F(common)} - ${F(mSpec)} = ${usd(profit)}.` }),
        P.num({ label: "(e)", marks: 3, kind: "money", value: Math.abs(mLoss), wrong: [M.units * mC, closeEffect], stem: "Calculate the loss shown for matt paint in the directors' statement (give the amount only), after charging half of the common fixed costs and its own fixed costs.", explanation: `Contribution ${F(M.units * mC)} - ${F(common / 2)} - ${F(mSpec)} = (${F(Math.abs(mLoss))}), a loss of ${usd(Math.abs(mLoss))}.` }),
        P.num({ label: "(f)", marks: 3, kind: "money", value: closeEffect, wrong: [Math.abs(mLoss), M.units * mC], stem: "Calculate the amount by which profit would fall if matt paint were stopped (assume the common fixed costs are unchanged).", explanation: `Contribution lost ${F(M.units * mC)} less avoidable fixed costs saved ${F(mSpec)} = ${usd(closeEffect)}.` }),
        P.num({ label: "(g)", marks: 3, kind: "money", value: bepRev, wrong: [fixed, fixed / (gC / G.price)], stem: "Calculate the break-even sales revenue for the business as a whole, assuming that the sales mix stays the same.", explanation: `Contribution to sales ratio = ${F(totC)} ÷ ${F(sales)} = 40%. Break-even revenue = ${F(fixed)} ÷ 0.40 = ${usd(bepRev)}.` }),
        P.num({ label: "(h)", marks: 2, kind: "pct", value: mosPct, dp: 1, wrong: [((sales - bepRev) / bepRev) * 100, (bepRev / sales) * 100], stem: "Calculate the margin of safety as a percentage of actual sales revenue.", explanation: `(${F(sales)} - ${F(bepRev)}) ÷ ${F(sales)} × 100 = ${p1(mosPct)}%.` }),
        P.manual({ label: "(i)", marks: 5, stem: "Advise the directors whether to stop making matt paint. Refer to your figures and to non-financial factors.", points: ["The statement shows a loss of 8,500 only because common fixed costs are shared; these costs do not stop if matt paint stops", "Matt paint earns a contribution of 12,000 against avoidable fixed costs of 6,500, so it adds 5,500 to profit", "Stopping it would reduce profit from 10,500 to 5,000", "Recommend continuing to make matt paint", "Non-financial: customers who buy both paints may go elsewhere; the jobs of the matt paint workers; or the capacity could be used for a more profitable product"], modelAnswer: "Matt paint should be kept. The loss in the statement arises from sharing common fixed costs which continue anyway. It earns a contribution of 12,000, more than the 6,500 of fixed costs avoided, so stopping it would cut profit by 5,500 to 5,000. Customers who buy both paints might also be lost; the position could change if the capacity could be used more profitably.", hints: ["Which costs would stop if matt paint stopped?"], explanation: "One mark for each point." }),
      ]),
      hints: ["Only avoidable fixed costs are relevant to the closure decision.", "The C/S ratio is total contribution ÷ total sales."],
      explanation: "This ZIMSEC Paper 3 style cost question tests marginal costing, a closure decision, break-even for a mix and advice.",
    });
  }

  // ===================================================================================================
  // Item 3 (ZIMSEC Paper 3): Sibanye Garments, special order, make-or-buy and limiting factor
  {
    const nP = 34, vc = 19, full = 25, qty = 640, offer = 23, deliv = 380;
    const gain = (offer - vc) * qty - deliv;
    chk(gain, 2180);
    const apparent = (offer - full) * qty;
    chk(apparent, -1280);
    const bUnits = 9000, bMake = 0.6, bFixed = 1950, bBuy = 0.95;
    const mk = bUnits * bMake + bFixed, by = bUnits * bBuy;
    chk(mk, 7350); chk(by, 8550);
    const LF = [
      { name: "S", contributionPerUnit: 7, resourcePerUnit: 0.5, demand: 900 },
      { name: "D", contributionPerUnit: 24, resourcePerUnit: 2, demand: 400 },
      { name: "T", contributionPerUnit: 9, resourcePerUnit: 1, demand: 360 },
    ];
    const rk = costing.rankByLimitingFactor(LF);
    chk(rk[0].perResource, 14); chk(rk[1].perResource, 12); chk(rk[2].perResource, 9);
    let left = 840;
    const plan = [];
    for (const r of rk) {
      const hrs = Math.min(left, r.demand * r.resourcePerUnit);
      plan.push({ name: r.name, u: hrs / r.resourcePerUnit, c: (hrs / r.resourcePerUnit) * r.contributionPerUnit });
      left -= hrs;
    }
    chk(plan[1].u, 195);
    const total = plan.reduce((s, p) => s + p.c, 0);
    chk(total, 10980);
    b.struct({
      d: 5, examStyle: true, skill: Z.skill, secs: Z.secs, applies: ZIM, calculator: true,
      paper: "ZIMSEC Paper 3", concepts: ["aacc.cost.decisions", "aacc.cost.absorption-statements"],
      stem: `Sibanye Garments in Bulawayo faces three decisions.\n\n**Decision 1: a special order.** The normal price of a school shirt is ${usd(nP)}, the variable cost ${usd(vc)} and the full production cost ${usd(full)}. A hospital offers ${usd(offer)} a shirt for ${F(qty)} shirts, which would need extra delivery costing ${usd(deliv)}. The factory has spare capacity.\n\n**Decision 2: make or buy.** The factory makes ${F(bUnits)} buttons a year at a variable cost of ${usd(bMake)} each. Making them needs a machine operator costing ${usd(bFixed)} a year that would be avoided if the buttons were bought. A supplier offers them at ${usd(bBuy)} each.\n\n**Decision 3: scarce machine time.** Only ${F(840)} sewing machine hours are available each month. Three garments are made:\n\n${table(["Garment", "Contribution per unit US\\$", "Machine hours per unit", "Maximum monthly demand (units)"], LF.map((x) => [x.name, x.contributionPerUnit, x.resourcePerUnit, F(x.demand)]), ["l", "r", "r", "r"])}`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 3, kind: "money", value: gain, wrong: [(offer - vc) * qty, apparent], stem: "Calculate the gain in profit from accepting the hospital's order.", explanation: `(${offer} - ${vc}) × ${F(qty)} = ${F((offer - vc) * qty)}; less delivery ${F(deliv)} = ${usd(gain)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: Math.abs(apparent), wrong: [gain, (offer - vc) * qty], stem: "Calculate the loss that would appear on the order if the full production cost were used (give the amount only).", explanation: `(${offer} - ${full}) × ${F(qty)} = (${F(Math.abs(apparent))}), a loss of ${usd(Math.abs(apparent))}; this ignores the fact that fixed overhead is incurred anyway.` }),
        P.num({ label: "(c)", marks: 3, kind: "money", value: mk, wrong: [bUnits * bMake, by], stem: "Calculate the relevant cost of making the buttons.", explanation: `${F(bUnits)} × ${bMake} = ${F(bUnits * bMake)}; plus the operator ${F(bFixed)} = ${usd(mk)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: by - mk, wrong: [bUnits * (bBuy - bMake), mk - by], stem: "Calculate the saving from making the buttons rather than buying them.", explanation: `Buying costs ${F(by)}; making costs ${F(mk)}; saving ${usd(by - mk)}.` }),
        P.mcq({ label: "(e)", marks: 2, stem: "Which garment should be made first when machine time is the limiting factor?", options: [["Shirts (S)", "Correct: US\\$14 of contribution per machine hour."], ["Dresses (D)", "They earn US\\$12 per hour."], ["Trousers (T)", "They earn US\\$9 per hour."], ["Dresses, because they have the highest contribution per unit", "The unit contribution is not the correct ranking when time is scarce."]].map(([c, r]) => [c, r.replace("US$", "US\\$")]), answer: "A", explanation: "Contribution per machine hour: S 7 ÷ 0.5 = 14; D 24 ÷ 2 = 12; T 9 ÷ 1 = 9." }),
        P.num({ label: "(f)", marks: 3, kind: "units", value: plan[1].u, wrong: [400, 255], stem: "Calculate the number of dresses that can be made after meeting the full demand for shirts.", explanation: "Shirts use 900 × 0.5 = 450 hours; 840 - 450 = 390 hours; 390 ÷ 2 = 195 dresses." }),
        P.num({ label: "(g)", marks: 3, kind: "money", value: total, wrong: [900 * 7 + 400 * 24, plan[1].u * 24], stem: "Calculate the maximum monthly contribution.", explanation: `Shirts 900 × 7 = 6,300; dresses 195 × 24 = 4,680; trousers nil; total ${usd(total)}.` }),
        P.manual({ label: "(h)", marks: 7, stem: "Advise the directors on each of the three decisions, referring to your calculations and to non-financial factors.", points: [`Order: accept, because it adds ${F(gain)} on relevant costs; the full-cost loss ignores fixed overhead`, "Order: risk that regular customers learn of the low price; spare capacity must be genuine", `Buttons: continue to make them; making saves ${F(by - mk)} a year`, "Buttons: buy if the supplier is reliable and the operator can be redeployed to earn more; quality of buttons matters", `Machine time: make shirts first, then dresses, for ${F(total)}; no trousers`, "Machine time: consider extra shifts or hiring time if demand for dresses and trousers can be met profitably", "Recommendation is supported by figures and refers to a non-financial factor for each decision"], modelAnswer: `Accept the order: it adds ${F(gain)}, though other customers might demand a low price. Keep making buttons: it saves ${F(by - mk)} a year unless a reliable supplier lets the operator be redeployed. With scarce machine time make shirts then dresses for ${F(total)} of contribution; extra hours could be considered if profitable.`, hints: ["Use relevant costs for the first two decisions and the ranking per hour for the third."], explanation: "One mark for each point, up to 7." }),
      ]),
      hints: ["Fixed overhead absorbed is not relevant to the special order.", "Rank by contribution per machine hour."],
      explanation: "This ZIMSEC Paper 3 style cost question tests three short-run decisions and ends with a recommendation.",
    });
  }

  // ===================================================================================================
  // Item 4 (Cambridge Paper 4): Chipinge Joinery, activity based costing against traditional absorption
  {
    const D = { units: 6400, mh: 3000, setups: 8, insp: 30, deliv: 60, direct: 28, price: 48 };
    const W = { units: 1250, mh: 1000, setups: 20, insp: 50, deliv: 20, direct: 30, price: 72 };
    const pools = { setup: 28000, insp: 16000, deliv: 16000, gen: 44000 };
    const tOH = pools.setup + pools.insp + pools.deliv + pools.gen;
    chk(tOH, 104000);
    const mhT = D.mh + W.mh;
    const trRate = tOH / mhT;
    chk(trRate, 26);
    const trWU = (trRate * W.mh) / W.units;
    chk(trWU, 20.8);
    const rs = pools.setup / (D.setups + W.setups), ri = pools.insp / (D.insp + W.insp), rd = pools.deliv / (D.deliv + W.deliv), rg = pools.gen / mhT;
    chk(rs, 1000); chk(ri, 200); chk(rd, 200); chk(rg, 11);
    const abcW = rs * W.setups + ri * W.insp + rd * W.deliv + rg * W.mh;
    chk(abcW, 45000);
    const abcWU = abcW / W.units;
    chk(abcWU, 36);
    const profWabc = W.price - W.direct - abcWU;
    chk(profWabc, 6);
    const profWtr = W.price - W.direct - trWU;
    chk(profWtr, 21.2);
    const priceW = (W.direct + abcWU) / 0.8;
    chk(priceW, 82.5);
    const abcD = rs * D.setups + ri * D.insp + rd * D.deliv + rg * D.mh;
    chk(abcD + abcW, tOH);
    b.struct({
      d: 5, examStyle: true, skill: Z.skill, secs: Z.secs, applies: CAM, calculator: true,
      paper: "Cambridge Paper 4", concepts: ["aacc.cost.activity-based", "aacc.cost.overhead-absorption"],
      stem: `Chipinge Joinery makes doors (D) and windows (W). Annual overheads are set-ups ${usd(pools.setup)} (driver: number of set-ups), quality inspection ${usd(pools.insp)} (inspections), delivery handling ${usd(pools.deliv)} (deliveries) and general factory costs ${usd(pools.gen)} (machine hours).\n\n${table(["", "Doors (D)", "Windows (W)"], [["Units made and sold", F(D.units), F(W.units)], ["Machine hours", F(D.mh), F(W.mh)], ["Set-ups", D.setups, W.setups], ["Inspections", D.insp, W.insp], ["Deliveries", D.deliv, W.deliv], ["Direct cost per unit US\\$", D.direct, W.direct], ["Selling price per unit US\\$", D.price, W.price]], ["l", "r", "r"])}\n\nThe present system absorbs all overhead on machine hours. Give answers to the nearest cent where necessary.`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: trRate, dp: 2, wrong: [tOH / D.units, pools.gen / mhT], stem: "Calculate the overhead absorption rate per machine hour under the present system.", explanation: `${F(tOH)} ÷ ${F(mhT)} = ${usd(trRate)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: trWU, dp: 2, wrong: [trRate, abcWU], stem: "Calculate the overhead per window under the present system.", explanation: `${F(trRate * W.mh)} ÷ ${F(W.units)} = ${usd(trWU)}.` }),
        P.group({ label: "(c)", stem: "Calculate the cost driver rate for:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "money", value: rs, wrong: [pools.setup / W.setups, 4000], stem: "set-ups", explanation: `${F(pools.setup)} ÷ ${D.setups + W.setups} = ${usd(rs)}.` }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: ri, wrong: [pools.insp / W.insp, 250], stem: "inspections", explanation: `${F(pools.insp)} ÷ ${D.insp + W.insp} = ${usd(ri)}.` }),
          P.num({ label: "(iii)", marks: 1, kind: "money", value: rd, wrong: [pools.deliv / W.deliv, 250], stem: "deliveries", explanation: `${F(pools.deliv)} ÷ ${D.deliv + W.deliv} = ${usd(rd)}.` }),
          P.num({ label: "(iv)", marks: 1, kind: "money", value: rg, wrong: [trRate, pools.gen / W.mh], stem: "general factory costs, per machine hour", explanation: `${F(pools.gen)} ÷ ${F(mhT)} = ${usd(rg)}.` }),
        ] }),
        P.num({ label: "(d)", marks: 3, kind: "money", value: abcW, wrong: [trRate * W.mh, rs * W.setups], stem: "Calculate the total overhead allocated to windows under activity based costing.", explanation: `Set-ups ${F(rs * W.setups)} + inspections ${F(ri * W.insp)} + deliveries ${F(rd * W.deliv)} + general ${F(rg * W.mh)} = ${usd(abcW)}.` }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: abcWU, dp: 2, wrong: [trWU, abcW / D.units], stem: "Calculate the overhead per window under activity based costing.", explanation: `${F(abcW)} ÷ ${F(W.units)} = ${usd(abcWU)}.` }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: profWabc, dp: 2, wrong: [profWtr, W.price - W.direct], stem: "Calculate the profit per window under activity based costing.", explanation: `${W.price} - ${W.direct} - ${abcWU} = ${usd(profWabc)}.` }),
        P.mcq({ label: "(g)", marks: 2, stem: "Why does the present system show windows as more profitable than activity based costing does?", options: [["Windows cause most set-ups but use few machine hours", "Correct: a machine hour rate under-charges windows for the activities they cause."], ["Windows use more machine hours than doors do", "Doors use three times as many machine hours as windows."], ["Activity based costing increases the total overhead of the firm", "The total overhead is the same under both methods."], ["Windows are sold at a lower price than doors are sold", "The selling price does not affect the sharing of overhead."]], answer: "A", explanation: "Windows account for 20 of 28 set-ups and 50 of 80 inspections, but only a quarter of the machine hours." }),
        P.manual({ label: "(h)", marks: 8, stem: "The managers believe that windows are very profitable and plan a promotion to sell more. Evaluate this plan using the activity based costing information, and advise on the price of windows. Refer to the effect on profit and to non-financial factors.", points: [`Under the present system the profit per window is ${p2(profWtr)}; under ABC it is only ${p2(profWabc)}`, `ABC charges windows ${p2(abcWU)} of overhead against ${p2(trWU)}, because they cause most set-ups and inspections`, "A promotion to sell more windows would add more set-ups and inspections, so the overhead would rise with sales", "Doors are probably over-costed under the present system, so their profit is understated", `To earn a 20% margin on the price the windows would need to sell for about ${p2(priceW)}`, "Recommendation: review the price of windows, reduce set-ups by making larger batches, then decide about the promotion", "Non-financial: customers may leave if the price rises, or window customers may also buy doors", "Limitation: ABC requires data and judgement about drivers; figures are historical"], modelAnswer: `The present system overstates the profit on windows (${p2(profWtr)} against ${p2(profWabc)} under ABC) because windows cause most set-ups and inspections but few machine hours. A promotion would add activity costs and little profit. The company should reprice windows (about ${p2(priceW)} for a 20% margin), try to cut set-ups with larger batches, and consider customer reaction before promoting. ABC data need care, since the drivers rely on judgement.`, hints: ["Compare the profit per window under the two methods and think about what drives the cost."], explanation: "One mark for each point, up to 8." }),
      ]),
      hints: ["Rate = cost of pool ÷ total driver quantity.", "Windows use most of the activities."],
      explanation: "This Cambridge Paper 4 style question compares traditional absorption costing with activity based costing and ends with an evaluation and advice.",
    });
  }
});
void r2; void statement;
