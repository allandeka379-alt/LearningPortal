// W2a: Cambridge 0455 Paper 2 exam-format items: Section A x1 (a market with a maximum price, STRUCTURED 20, ANALYSIS)
// and Section B x2 (STRUCTURED 20 = 2/4/6/8, EVALUATION). Fictional data, computed and checked here.
import { concept, P, CAM, schedule, pctChange, unemploymentRate, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const nested = (label, marks, stem, subs) => ({ part: { label, type: "STRUCTURED", marks, stem, parts: subs.map((x) => x.part) }, model: null, wrong: [] });

concept("econ.markets.price-controls", { file: "exam/w2a-cambridge", keyPrefix: "exam.w2a-cambridge", applies: CAM }, (b) => {
  // ---------------- Section A: a maximum price on maize meal in Country Y.
  {
    const p = [5, 6, 7, 8, 9];
    const qd = [425, 395, 365, 335, 305], qs = [275, 320, 365, 410, 455];
    const S = schedule({ prices: p, qd, qs, requireEquilibrium: true, priceHeader: "Price per 10 kg bag (K)", qdHeader: "Quantity demanded (thousand bags per month)", qsHeader: "Quantity supplied (thousand bags per month)" });
    const pe = S.equilibrium.price, qe = S.equilibrium.quantity, pmax = 5, iMax = p.indexOf(pmax);
    const shortage = S.excess[iMax];
    const qsPc = pctChange(qe, qs[iMax]);
    const rev0 = pe * qe, rev1 = pmax * qs[iMax];
    check("pe", pe, 7); check("qe", qe, 365); check("shortage", shortage, 150); check("rev0", rev0, 2555); check("rev1", rev1, 1375);
    const passage = [
      "Country Y is a fictional, lower-middle-income country in southern Africa. Maize meal is the staple food of most households, and poorer families spend a large share of their income on it. Maize is grown by both large commercial farms and small-scale farmers, and the grain is milled into meal by a small number of private milling companies. The currency of Country Y is the kora (K).",
      "After two poor harvests the price of maize meal rose to K7 per 10 kg bag, and there were protests about the cost of living. In response, the government set a maximum price of K5 per bag and announced that shops charging more would be fined. Table 1 shows estimates of monthly demand and supply in the national market.",
      "Within weeks, maize meal became hard to find in many supermarkets. Long queues formed when deliveries arrived, and some shops limited each customer to one bag. Millers complained that, at K5, they could not cover the cost of buying grain from farmers, and several reduced production. Reports appeared of bags being sold informally at K8 or more in townships and at border towns, and some meal was smuggled into neighbouring countries where prices were higher.",
      "Some economists argue that the maximum price should be removed and replaced by cash transfers to the poorest households, financed by the government. Others argue that the government should keep the maximum price but buy grain itself and sell it to millers at a subsidised price, so that they can produce more at K5.",
    ].join("\n\n");
    const words = passage.split(/\s+/).length;
    if (words < 250 || words > 400) throw new Error(`Section A passage has ${words} words`);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section A",
      concepts: ["econ.markets.price-controls", "econ.markets.taxes-subsidies"],
      stem: `${passage}\n\n**Table 1: The market for maize meal in Country Y (estimates)**\n\n${S.md}`,
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Using Table 1, complete the sentence.",
          template: "Before the maximum price, the equilibrium price was K{{blank:a}} per bag and the equilibrium quantity was {{blank:b}} thousand bags per month.",
          blanks: [
            { id: "a", accepted: [String(pe)], choices: p.map(String) },
            { id: "b", accepted: [String(qe)], choices: [...new Set([...qd, ...qs])].sort((x, y) => x - y).map(String) },
          ],
          wrong: [[String(pmax), String(qd[iMax])]],
          explanation: `Quantity demanded equals quantity supplied (${qe} thousand bags) at K${pe}.`,
        }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: shortage, stem: "Calculate the shortage of maize meal at the maximum price of K5, in thousand bags per month.", wrong: [qd[iMax] - qe, qe - qs[iMax]], explanation: `At K5: quantity demanded ${qd[iMax]} − quantity supplied ${qs[iMax]} = ${shortage} thousand bags.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: qsPc, stem: "Calculate the percentage change in the quantity of maize meal supplied when the maximum price replaces the equilibrium price. Give a fall as a negative number, to one decimal place.", wrong: [pctChange(qs[iMax], qe), -qsPc], explanation: `(${qs[iMax]} − ${qe}) ÷ ${qe} × 100 = ${fmt(qsPc, 1)}%.` }),
        P.num({ label: "(d)", marks: 2, kind: "plain", value: (rev1 - rev0) / 1000, dp: 2, stem: "Calculate the change in the total monthly amount spent on maize meal at the official price, comparing the equilibrium with the maximum price. Give your answer in K million, as a negative number if it falls, to two decimal places.", wrong: [(pmax * qd[iMax] - rev0) / 1000, rev1 / 1000], explanation: `Before: ${pe} × ${qe} thousand = K${fmt(rev0 / 1000, 2)} million. After: ${pmax} × ${qs[iMax]} thousand (only what is supplied can be bought) = K${fmt(rev1 / 1000, 2)} million. Change = ${fmt((rev1 - rev0) / 1000, 2)} million.` }),
        P.manual({
          label: "(e)", marks: 6,
          stem: "Analyse why the maximum price led to queues and to maize meal being sold informally at K8 or more. You may refer to a demand and supply diagram in your answer.",
          points: [
            "The maximum price (K5) is set below the equilibrium price (K7).",
            "At the lower price quantity demanded extends (to 425 thousand bags) …",
            "… and quantity supplied contracts (to 275 thousand bags) because millers cannot cover costs.",
            "This creates a shortage of 150 thousand bags, so shops cannot meet demand: queues and rationing.",
            "Consumers who cannot buy at K5 are willing to pay more for the limited supply.",
            "Sellers can make a profit by selling illegally above K5 (black market at K8 or more), or smuggling to neighbouring countries.",
          ],
          modelAnswer: "The maximum price of K5 is below the equilibrium price of K7. On a diagram with price on the vertical axis and quantity on the horizontal axis, the maximum price is a horizontal line below the point where demand and supply cross. At K5 consumers want to buy more, 425 thousand bags, while millers, who cannot cover their costs, supply only 275 thousand bags. The shortage of 150 thousand bags means that shops run out, queues form when deliveries arrive and shops ration customers. With so little available, some consumers are willing to pay far more than K5: even at K9, Table 1 shows that 305 thousand bags would be demanded, more than the 275 thousand supplied at K5. Sellers can therefore make extra profit by selling informally at K8 or more, or by smuggling meal to neighbouring countries where the price is higher.",
          explanation: "Ceiling below equilibrium → shortage → queues/rationing → willingness to pay above the ceiling → black market.",
        }),
        P.manual({
          label: "(f)", marks: 6, levels: LV(6),
          stem: "Discuss whether the government should replace the maximum price with cash transfers to the poorest households.",
          points: [
            "For removal: the price returns to K7, the shortage disappears; queues and the black market end.",
            "For: millers produce more (supply extends to 365 thousand bags), so more meal is available.",
            "For: cash transfers target the poor, who can afford meal at K7; better-off households no longer benefit from a low price.",
            "Against: transfers cost the government money (opportunity cost; higher taxes or borrowing); hard to identify the poorest; delays.",
            "Against: households above the threshold pay more (K7 instead of K5); political protest; the subsidised-grain alternative could keep the price at K5 with more supply.",
            "Justified conclusion.",
          ],
          modelAnswer: "Removing the maximum price would let the price return to K7, where quantity demanded equals quantity supplied, so the shortage, the queues and the black market would disappear, and millers would produce more, about 365 thousand bags a month instead of 275 thousand. Cash transfers would help the poorest families afford meal at K7, and would target help where it is needed, whereas the maximum price helped anyone lucky enough to find a bag, including richer households. However, the transfers would cost the government money, which means higher taxes, more borrowing or cuts elsewhere, and it may be hard to identify the poorest households quickly. Households just above the threshold would pay K2 more per bag and might protest. The alternative of selling subsidised grain to millers could keep the price at K5 with more supply, but it would also be costly. On balance cash transfers are better, because they end the shortage while protecting the poor, provided the government can fund them and reach the right households.",
          explanation: "Weigh the end of the shortage and better targeting against cost and the effect on households just above the poverty line; conclude.",
        }),
      ],
      explanation: `Equilibrium K${pe}, ${qe} thousand bags. At the maximum price of K${pmax}: demand ${qd[iMax]}, supply ${qs[iMax]}, shortage ${shortage} thousand bags; supply falls by ${fmt(-qsPc, 1)}%, and official spending falls by K${fmt((rev0 - rev1) / 1000, 2)} million a month.`,
      hints: ["Equilibrium is where quantity demanded equals quantity supplied.", "At a maximum price, only the quantity supplied can actually be bought.", "Use the equilibrium values as the base for percentage changes."],
    });
  }

  // ---------------- Section B, question 1: unemployment in a recession.
  {
    const lf = 12, u0 = 0.84, u1 = 1.2;
    const r0 = unemploymentRate({ unemployed: u0, labourForce: lf }), r1 = unemploymentRate({ unemployed: u1, labourForce: lf });
    check("r0", r0, 7); check("r1", r1, 10);
    const sub1 = P.num({
      label: "(i)", marks: 2, kind: "plain", value: r1 - r0, dp: 1,
      stem: `The labour force stayed at ${lf} million while the number unemployed rose from ${fmt(u0, 2)} million to ${fmt(u1, 1)} million. Calculate the rise in the unemployment rate, in percentage points, to one decimal place.`,
      wrong: [((u1 - u0) / u0) * 100],
      explanation: `${fmt(u0, 2)} ÷ ${lf} × 100 = ${pct(r0, 1)}; ${fmt(u1, 1)} ÷ ${lf} × 100 = ${pct(r1, 1)}; rise = ${fmt(r1 - r0, 1)} percentage points. (${pct(((u1 - u0) / u0) * 100, 1)} is the percentage increase in the number unemployed.)`,
    });
    const sub2 = P.manual({
      label: "(ii)", marks: 4,
      stem: "Analyse how a fall in exports and consumer spending causes unemployment.",
      points: [
        "Lower exports and consumer spending reduce aggregate demand.",
        "Firms sell less and cut output.",
        "Labour is a derived demand, so firms need fewer workers and lay off staff or stop hiring.",
        "Unemployed workers spend less, reducing demand further (multiplier): cyclical unemployment.",
      ],
      modelAnswer: "When exports and consumer spending fall, aggregate demand falls. Firms sell less, so they cut production, and because the demand for labour is derived from the demand for the goods it produces, they need fewer workers and lay some off or stop hiring. The newly unemployed spend less, which reduces other firms' sales, so unemployment spreads through the economy. This is cyclical unemployment.",
    });
    const q = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.unemployment.measurement", "econ.unemployment.types", "econ.unemployment.effects-policies"],
      stem: "A fictional country entered a recession after a fall in the world price of its main export and a fall in consumer confidence. Unemployment rose sharply, especially in manufacturing and construction. The government is considering cutting income tax to reduce unemployment, but it already has a large budget deficit.",
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "An unemployed person is of working age, without work, {{blank:a}} for work and {{blank:b}} looking for work.",
          blanks: [
            { id: "a", accepted: ["available"], choices: ["available", "unsuitable", "paid"] },
            { id: "b", accepted: ["actively"], choices: ["actively", "not", "rarely"] },
          ],
          wrong: [["paid", "not"]],
          explanation: "Unemployed: without work, available and actively seeking work (labour force survey definition).",
        }),
        P.fib({
          label: "(b)", marks: 4,
          stem: "Explain the consequences of the rise in unemployment for the government. Complete the explanation.",
          template: "As unemployment rises, income tax revenue {{blank:a}} and VAT revenue {{blank:b}} because spending falls. Government spending on welfare {{blank:c}}, so the budget deficit becomes {{blank:d}}.",
          blanks: [
            { id: "a", accepted: ["falls"], choices: ["rises", "falls"] },
            { id: "b", accepted: ["falls"], choices: ["rises", "falls"] },
            { id: "c", accepted: ["rises"], choices: ["rises", "falls"] },
            { id: "d", accepted: ["larger"], choices: ["larger", "smaller"] },
          ],
          wrong: [["rises", "rises", "falls", "smaller"]],
          explanation: "Fewer earners and less spending mean less tax; more support for the unemployed means more spending; the deficit widens.",
        }),
        nested("(c)", 6, "Use the information above.", [sub1, sub2]),
        P.manual({
          label: "(d)", marks: 8, levels: LV(8),
          stem: "Discuss whether cutting income tax will reduce unemployment in this country.",
          points: [
            "For: higher disposable income raises consumer spending and aggregate demand.",
            "For: firms increase output and hire workers; the unemployment is cyclical, which demand-side policy targets.",
            "For: may raise incentives to work and multiplier effects spread the gain.",
            "Against: low confidence: households may save the extra income.",
            "Against: extra spending may go on imports, creating jobs abroad.",
            "Against: the deficit widens further; the government may have to borrow or cut spending, offsetting the effect.",
            "Against: does not help structural unemployment if the export industry has declined for good; time lags.",
            "Justified conclusion (e.g. helps cyclical unemployment if confidence recovers; better targeted spending may be more effective given the deficit).",
          ],
          modelAnswer: "Cutting income tax raises households' disposable income, so consumer spending and aggregate demand should rise. Firms would then sell more, raise output and hire workers, and because the unemployment was caused by a recession it is mainly cyclical, which is the kind demand-side policy can reduce; the multiplier would spread the effect. However, consumer confidence is low, so many households may save the extra income or repay debts rather than spend it, and some of the extra spending will go on imported goods, creating jobs abroad. The government already has a large deficit; a tax cut widens it, which may force it to cut spending on other things, offsetting the effect. If the export industry has declined for good because of the low world price, some unemployment is structural and needs retraining rather than higher demand. A tax cut is likely to reduce unemployment somewhat once confidence starts to recover, but given the deficit, targeted spending such as infrastructure projects that use local workers may create more jobs for each dollar.",
          explanation: "Demand-side channel versus confidence, imports, the deficit and structural causes; conclude.",
        }),
      ],
      explanation: `The unemployment rate rose from ${pct(r0, 1)} to ${pct(r1, 1)}. The unemployment is mainly cyclical; a tax cut raises demand but is limited by low confidence, imports and the deficit.`,
      hints: ["Unemployment rate = unemployed ÷ labour force × 100.", "Which type of unemployment does a recession cause?", "Who might save rather than spend a tax cut?"],
    });
    q.modelResponse.parts["(c)(i)"] = sub1.model;
    q.wrongResponses[0].parts["(c)(i)"] = sub1.wrong[0];
  }

  // ---------------- Section B, question 2: a merit good and a subsidy.
  {
    const sub = 6, v0 = 400, v1 = 520;
    const cost = sub * v1 / 1000; // K million
    const vPc = pctChange(v0, v1);
    check("cost", cost, 3.12); check("vPc", vPc, 30);
    const sub1 = P.num({
      label: "(i)", marks: 2, kind: "plain", value: cost, dp: 2,
      stem: `After the subsidy of K${sub} per vaccination was introduced, the number of vaccinations rose from ${v0} thousand to ${v1} thousand a year. Calculate the cost of the subsidy to the government per year, in K million, to two decimal places.`,
      wrong: [(sub * v0) / 1000, (sub * (v1 - v0)) / 1000],
      explanation: `Subsidy cost = K${sub} × ${v1} thousand = K${fmt(cost, 2)} million. The subsidy is paid on every vaccination given, not only the extra ${v1 - v0} thousand.`,
    });
    const sub2 = P.manual({
      label: "(ii)", marks: 4,
      stem: "Analyse why a subsidy increases the number of vaccinations.",
      points: [
        "The subsidy is paid to providers per vaccination, lowering their costs.",
        "Supply increases, so the price charged to families falls.",
        "A lower price makes vaccinations affordable to more households: quantity demanded extends.",
        `The number of vaccinations rises (here by ${pct(vPc, 0)}).`,
      ],
      modelAnswer: `The subsidy is paid to clinics for each vaccination, which lowers their cost of providing it, so they are willing to offer more vaccinations at every price and the price charged to families falls. At the lower price more households can afford to have their children vaccinated, so the quantity demanded extends, and the number of vaccinations rises, here by ${pct(vPc, 0)}.`,
    });
    const q = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.market-failure.goods", "econ.market-failure.externalities", "econ.markets.taxes-subsidies", "econ.markets.other-interventions"],
      stem: "In a fictional country, many families do not vaccinate their children against a common disease because private clinics charge for the vaccine and some parents underestimate the benefits. The disease spreads easily between children. The government introduced a subsidy of K6 per vaccination paid to clinics, and is now considering providing vaccinations free of charge at government clinics instead.",
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "A merit good is a good that is {{blank:a}} when left to the market, because consumers do not fully appreciate its {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["under-consumed"], choices: ["under-consumed", "over-consumed"] },
            { id: "b", accepted: ["benefits"], choices: ["benefits", "costs"] },
          ],
          wrong: [["over-consumed", "costs"]],
          explanation: "Merit goods are under-consumed in a free market: people underestimate their private benefits and they often have external benefits.",
        }),
        P.fib({
          label: "(b)", marks: 4,
          stem: "Explain why the free market under-provides vaccinations. Complete the explanation.",
          template: "When one child is vaccinated, other children are less likely to catch the disease. This is an external {{blank:a}}, so the social benefit is {{blank:b}} than the private benefit. Families consider only the {{blank:c}} benefit, so the quantity consumed is {{blank:d}} than the socially optimum quantity.",
          blanks: [
            { id: "a", accepted: ["benefit"], choices: ["benefit", "cost"] },
            { id: "b", accepted: ["greater"], choices: ["greater", "smaller"] },
            { id: "c", accepted: ["private"], choices: ["private", "social"] },
            { id: "d", accepted: ["less"], choices: ["less", "more"] },
          ],
          wrong: [["cost", "smaller", "social", "more"]],
          explanation: "Social benefit = private benefit + external benefit; ignoring the external benefit leads to under-consumption.",
        }),
        nested("(c)", 6, "Use the information above.", [sub1, sub2]),
        P.manual({
          label: "(d)", marks: 8, levels: LV(8),
          stem: "Discuss whether the government should provide vaccinations free of charge rather than continue the subsidy.",
          points: [
            "For free provision: removes the price barrier completely; the poorest families can vaccinate.",
            "For: greater coverage protects all children (external benefits), reducing the spread of disease and health costs later.",
            "For: government can control quality and reach rural areas.",
            "Against: higher cost to the government (pays the full cost, not K6 per dose): opportunity cost, taxes or borrowing.",
            "Against: price is not the only barrier: some parents underestimate benefits, so information campaigns are still needed.",
            "Against: possible queues, waste or lower efficiency in government clinics; the subsidy keeps private clinics involved.",
            "Considers evidence: the subsidy has already raised vaccinations by 30%.",
            "Justified conclusion.",
          ],
          modelAnswer: "Free vaccinations would remove the price barrier altogether, so even the poorest families could vaccinate their children; because vaccination has large external benefits, higher coverage would protect all children, reduce the spread of the disease and save health spending later. The government could also make sure that rural areas are reached. However, providing vaccinations free costs the government far more than a K6 subsidy, which means less money for other services, higher taxes or more borrowing. The subsidy has already raised vaccinations by 30%, and price is not the only barrier: some parents underestimate the benefits, so information campaigns would be needed either way. Government clinics may also face queues and shortages. Because the external benefits are large and the poorest families are the least likely to vaccinate, free provision combined with an information campaign is justified if the government can fund it; otherwise a larger, targeted subsidy is the next best choice.",
          explanation: "Weigh coverage and external benefits against cost and other barriers; conclude.",
        }),
      ],
      explanation: `Subsidy cost K${fmt(cost, 2)} million a year; vaccinations rose by ${pct(vPc, 0)}. Vaccination is a merit good with external benefits, so the market under-provides it.`,
      hints: ["The subsidy is paid on every vaccination given.", "Think of the external benefit to other children."],
    });
    q.modelResponse.parts["(c)(i)"] = sub1.model;
    q.wrongResponses[0].parts["(c)(i)"] = sub1.wrong[0];
  }
});
