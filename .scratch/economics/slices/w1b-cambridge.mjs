// W1b: Cambridge 0455 Paper 2 exam-format items: Section A x1 (a commodity market with price and elasticity data,
// STRUCTURED 20, ANALYSIS) and Section B x2 (STRUCTURED 20 = 2/4/6/8, EVALUATION). Fictional data, computed here.
import { concept, P, CAM, elasticity, pctChange, table, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const nested = (label, marks, stem, subs) => ({ part: { label, type: "STRUCTURED", marks, stem, parts: subs.map((x) => x.part) }, model: null, wrong: [] });

concept("econ.elasticity.pes", { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  // ---------------- Section A: the world cotton market and Country X.
  {
    const yrs = [2023, 2024, 2025], price = [1600, 2000, 1800], out = [80, 84, 96], exp = [60, 63, 74];
    const pc = pctChange(price[0], price[1]);
    const pes = elasticity.pes({ p1: price[0], p2: price[1], q1: out[0], q2: out[1] });
    const rev = price.map((p, i) => (p * exp[i] * 1000) / 1e6); // US$ million
    check("pc", pc, 25); check("pes", pes, 0.2); check("rev0", rev[0], 96); check("rev1", rev[1], 126);
    const t = table(["Year", "World price of cotton lint (US\\$ per tonne)", "Country X output (thousand tonnes)", "Country X exports (thousand tonnes)"], yrs.map((y, i) => [String(y), price[i], out[i], exp[i]]));
    const passage = [
      "Country X is a fictional, low-income country in southern Africa. About a third of its workers are employed in agriculture, and cotton is one of its main exports. Most cotton is grown by small-scale farmers on plots of one to three hectares, using rainfall rather than irrigation. Farmers sell their seed cotton to private ginning companies, which separate the fibre (lint) from the seed and export it.",
      "Cotton is a commodity: lint from different countries is very similar, and its price is set in the world market by world demand and supply. Country X produces only a small share of world output, so its farmers must accept the world price.",
      "In 2024 the world price of cotton lint rose sharply. A severe drought cut the harvest in one of the world's largest producing countries, and at the same time textile factories in Asia increased their orders as clothing sales recovered. Economists estimate that world demand for cotton lint is price inelastic, with a PED of about −0.3, because spinning mills have few substitutes for cotton in the short run.",
      "Farmers in Country X could do little to take advantage of the higher price in 2024, because cotton is planted only once a year and most of the crop had already been planted when the price rose. For the 2025 season many farmers switched land from maize to cotton, and output rose strongly. By then, however, the harvest in the drought-hit country had recovered and the world price had fallen again (Table 1).",
      "The government of Country X is now considering a scheme to encourage farmers to grow more cotton, offering cheap seed and fertiliser to those who plant at least one hectare.",
    ].join("\n\n");
    const words = passage.split(/\s+/).length;
    if (words < 250 || words > 400) throw new Error(`Section A passage has ${words} words`);
    const q = b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section A",
      concepts: ["econ.elasticity.pes", "econ.markets.price-changes", "econ.elasticity.ped", "econ.supply.shifts", "econ.markets.equilibrium"],
      stem: `${passage}\n\n**Table 1: Cotton prices and Country X's cotton production and exports**\n\n${t}`,
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Using Table 1, complete the sentence.",
          template: "Between 2024 and 2025 the world price of cotton lint {{blank:a}}, while Country X's cotton output {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["fell"], choices: ["rose", "fell", "stayed the same"] },
            { id: "b", accepted: ["rose"], choices: ["rose", "fell", "stayed the same"] },
          ],
          wrong: [["rose", "fell"]],
          explanation: `Price: US\\$${fmt(price[1])} → US\\$${fmt(price[2])} (fell). Output: ${out[1]} → ${out[2]} thousand tonnes (rose).`,
        }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pc, stem: "Calculate the percentage increase in the world price of cotton lint between 2023 and 2024. Give your answer to one decimal place.", wrong: [-pctChange(price[1], price[0]), price[1] - price[0]], explanation: `(2,000 − 1,600) ÷ 1,600 × 100 = ${pc.toFixed(1)}%. Using 2,000 as the base gives ${(-pctChange(price[1], price[0])).toFixed(1)}%.` }),
        P.num({ label: "(c)", marks: 2, kind: "elasticity", value: pes, stem: "Calculate the price elasticity of supply of cotton in Country X between 2023 and 2024. Give your answer to two decimal places.", wrong: [1 / pes, 4 / 400], explanation: `% change in output = (84 − 80) ÷ 80 × 100 = 5%; % change in price = 25%; PES = 5 ÷ 25 = ${pes.toFixed(2)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "plain", value: rev[1] - rev[0], stem: "Calculate the change in the value of Country X's cotton exports between 2023 and 2024, in US\\$ million.", wrong: [rev[1], (price[1] - price[0]) * exp[0] / 1000], explanation: `2023: 1,600 × 60,000 tonnes = US\\$${rev[0]} million. 2024: 2,000 × 63,000 = US\\$${rev[1]} million. Change = +US\\$${rev[1] - rev[0]} million.` }),
        P.manual({
          label: "(e)", marks: 6,
          stem: "Analyse why the world price of cotton lint rose in 2024 and fell in 2025. You may refer to a demand and supply diagram in your answer.",
          points: [
            "The drought reduced world supply: the supply curve shifted to the left.",
            "Higher orders from textile factories increased demand: the demand curve shifted to the right.",
            "Both create a shortage at the old price, so the price rose (to US\\$2,000).",
            "Supply and demand are both price inelastic in the short run (PED about −0.3; cotton planted once a year), so the shifts caused a large price change.",
            "In 2025 the drought-hit harvest recovered and farmers elsewhere (e.g. Country X) planted more: supply shifted to the right.",
            "This created a surplus at US\\$2,000, so the price fell (to US\\$1,800).",
          ],
          modelAnswer: "In 2024 two changes pushed the price up. The drought in a major producing country cut the harvest, so world supply decreased and the supply curve shifted left; at the same time textile factories ordered more cotton, so demand increased and the demand curve shifted right. At the old price of US\\$1,600 there was a shortage, so the price rose. Because both demand (PED about −0.3) and short-run supply (cotton is planted once a year) are inelastic, the shifts caused a large rise in price rather than in quantity. In 2025 the drought-hit country's harvest recovered and farmers in Country X and elsewhere planted more cotton, so supply shifted back to the right. At US\\$2,000 there was now a surplus, so the price fell to US\\$1,800.",
          explanation: "Shifts in demand and supply, the role of elasticity, and the reversal in 2025.",
        }),
        P.manual({
          label: "(f)", marks: 6, levels: LV(6),
          stem: "Discuss whether the government of Country X should encourage farmers to grow more cotton.",
          points: [
            `For: higher cotton output raises export earnings (exports were worth US\\$${rev[1]} million in 2024).`,
            "For: cheap seed and fertiliser raise yields and farmers' incomes; may make supply more responsive.",
            "Against: the world price is volatile (it rose 25% then fell 10%); demand is inelastic, so if many countries expand output, prices can fall sharply.",
            "Against: land switched from maize to cotton may reduce food supply and raise food prices.",
            "Against: the scheme costs the government money; rain-fed farming is risky in droughts.",
            "Justified conclusion (e.g. support cotton with diversification and irrigation rather than heavy dependence on one crop).",
          ],
          modelAnswer: `Encouraging cotton could raise export earnings, which were US\\$${rev[1]} million in 2024, and cheap inputs would raise yields and farmers' incomes. However, the world price is volatile: it rose by 25% in 2024 and then fell in 2025 when supply recovered, and because world demand is inelastic, extra supply from many countries can push the price down sharply. Country X is a price taker, so it cannot protect its farmers from this. Switching land from maize to cotton could also reduce food supplies and raise food prices, and the scheme costs public money. On balance the government should support cotton farmers moderately, but encourage a mix of crops and invest in irrigation, so that the country does not depend too heavily on one volatile export.`,
          explanation: "Weigh export earnings and incomes against price volatility, food security and cost; conclude.",
        }),
      ],
      explanation: `World price +${pc.toFixed(1)}% in 2024; Country X's PES = ${pes.toFixed(2)} (very inelastic in the short run); export value up US\\$${rev[1] - rev[0]} million. Supply responded in 2025, when the price fell.`,
      hints: ["Use 2023 values as the base for 2023–2024 changes.", "Export value = price per tonne × tonnes exported.", "Think about time and elasticity when explaining the price changes."],
    });
  }

  // ---------------- Section B, question 1: PED and a pricing decision.
  {
    const p0 = 3, q0 = 200000, cutPct = -10, ped = -1.6;
    const qPct = ped * cutPct;
    const p1 = p0 * (1 + cutPct / 100), q1 = q0 * (1 + qPct / 100);
    const dTR = p1 * q1 - p0 * q0;
    check("q1", q1, 232000); check("dTR", dTR, 26400);
    const sub1 = P.num({
      label: "(i)", marks: 2, kind: "money", value: dTR,
      stem: `The network sells ${fmt(q0)} bundles a week at US\\$3.00. Using its estimate of PED (−1.6), calculate the change in its weekly revenue if it cuts the price by 10%.`,
      wrong: [p1 * q1, p0 * q0 * 0.16],
      explanation: `% change in quantity = −1.6 × −10 = +16%, so quantity = ${fmt(q0)} × 1.16 = ${fmt(q1)}. New price = US\\$2.70. Revenue: before 3.00 × ${fmt(q0)} = US\\$${fmt(p0 * q0)}; after 2.70 × ${fmt(q1)} = US\\$${fmt(p1 * q1)}. Change = +US\\$${fmt(dTR)}.`,
    });
    const sub2 = P.manual({
      label: "(ii)", marks: 4,
      stem: "Analyse why demand for one network's data bundles is more price elastic than demand for mobile data as a whole.",
      points: [
        "Other networks' bundles are close substitutes for one network's bundles.",
        "If one network raises its price, customers switch SIM cards / networks, so quantity demanded falls a lot.",
        "Mobile data as a whole has few close substitutes (needed for messaging, mobile money, work).",
        "So if all networks raise prices together, consumers keep buying: demand for data as a whole is inelastic (the narrower the market, the more elastic).",
      ],
      modelAnswer: "For one network, rival networks offer almost identical bundles, and many people carry more than one SIM card, so a price rise makes them switch and quantity demanded falls by a large percentage. Mobile data as a whole has few close substitutes, because people need it for messaging, mobile money and work. If all networks raised prices, consumers would keep buying, so demand for data in general is inelastic. The narrower the definition of the market, the more substitutes and the more elastic the demand.",
    });
    const q = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.elasticity.ped-revenue", "econ.elasticity.ped", "econ.elasticity.ped-determinants"],
      stem: "A fictional mobile network in a southern African country is considering cutting the price of its data bundles. Its research suggests that the price elasticity of demand (PED) for its own bundles is −1.6, while the PED for mobile data from all networks together is about −0.4. Two rival networks sell similar bundles.",
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "Price elasticity of demand measures the responsiveness of {{blank:a}} to a change in the good's own {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["quantity demanded"], choices: ["quantity demanded", "quantity supplied", "income"] },
            { id: "b", accepted: ["price"], choices: ["price", "cost", "income"] },
          ],
          wrong: [["quantity supplied", "income"]],
          explanation: "PED = % change in quantity demanded ÷ % change in price.",
        }),
        P.fib({
          label: "(b)", marks: 4,
          stem: "Explain how the network's revenue would respond to a price cut. Complete the explanation.",
          template: "Demand for the network's own bundles is price {{blank:a}}, so a price cut makes quantity demanded rise by a {{blank:b}} percentage than the fall in price, and total revenue {{blank:c}}. If all networks cut prices together, demand for data as a whole is price {{blank:d}}, so their combined revenue would fall.",
          blanks: [
            { id: "a", accepted: ["elastic"], choices: ["elastic", "inelastic"] },
            { id: "b", accepted: ["larger"], choices: ["larger", "smaller"] },
            { id: "c", accepted: ["rises"], choices: ["rises", "falls", "does not change"] },
            { id: "d", accepted: ["inelastic"], choices: ["elastic", "inelastic"] },
          ],
          wrong: [["inelastic", "smaller", "falls", "elastic"]],
          explanation: "|−1.6| > 1: elastic, so price and revenue move in opposite directions. |−0.4| < 1: inelastic for the market as a whole.",
        }),
        nested("(c)", 6, "The network's research gives the figures above.", [sub1, sub2]),
        P.manual({
          label: "(d)", marks: 8, levels: LV(8),
          stem: "Discuss whether the network should cut the price of its data bundles.",
          points: [
            "For: own-brand demand is elastic (−1.6), so a price cut raises revenue (about US\\$26,400 a week).",
            "For: it gains customers from rivals and may sell them other services (mobile money, calls).",
            "Against: rivals are likely to match the cut; then the relevant PED is the market's (−0.4) and all networks lose revenue.",
            "Against: extra data use raises costs (network capacity), so profit may not rise even if revenue does.",
            "Against: the PED estimate may be inaccurate or change over time.",
            "Considers alternatives: non-price competition (better coverage, bonus data, loyalty schemes).",
            "Uses the data in the context.",
            "Reaches a justified conclusion.",
          ],
          modelAnswer: "Because demand for the network's own bundles is elastic (PED −1.6), a 10% price cut would raise quantity by about 16% and weekly revenue by about US\\$26,400, and the network would win customers from its rivals, to whom it could also sell mobile money and other services. However, the two rivals sell similar bundles and are likely to cut their prices too. If they do, customers have no reason to switch, and the relevant elasticity becomes that of the whole market (−0.4): demand is then inelastic, so all three networks would lose revenue. Extra data use would also need more network capacity, raising costs, so profit may not rise even if revenue does, and the PED estimate may be wrong. The network might do better with non-price competition, such as better coverage or bonus data. On balance, the price cut is worthwhile only if the network is confident rivals will not follow; otherwise it risks a price war that reduces everyone's revenue.",
        }),
      ],
      explanation: "Own-brand PED is elastic (−1.6) but market PED is inelastic (−0.4): a price cut raises revenue only if rivals do not follow.",
      hints: ["(b) Elastic: price and revenue move in opposite directions.", "(c)(i) Find the new quantity with % change = PED × % change in price.", "(d) What will the rivals do?"],
    });
    q.modelResponse.parts["(c)(i)"] = sub1.model;
    q.wrongResponses[0].parts["(c)(i)"] = sub1.wrong[0];
  }

  // ---------------- Section B, question 2: rising demand, PES and farmers.
  {
    const pr0 = 8, pr1 = 10, qs0 = 50000, qs1 = 54000;
    const pes = elasticity.pes({ p1: pr0, p2: pr1, q1: qs0, q2: qs1 });
    check("pes2", pes, 0.32);
    const sub1 = P.num({
      label: "(i)", marks: 2, kind: "elasticity", value: pes,
      stem: `In the first year after the export markets opened, the price paid to farmers rose from US\\$${pr0} to US\\$${pr1} a crate and the quantity supplied rose from ${fmt(qs0)} to ${fmt(qs1)} crates. Calculate the price elasticity of supply, to two decimal places.`,
      wrong: [1 / pes, (qs1 - qs0) / (pr1 - pr0)],
      explanation: `% change in quantity supplied = 4,000 ÷ 50,000 × 100 = 8%; % change in price = 2 ÷ 8 × 100 = 25%; PES = 8 ÷ 25 = ${pes.toFixed(2)}.`,
    });
    const sub2 = P.manual({
      label: "(ii)", marks: 4,
      stem: "Analyse why the supply of avocados is price inelastic in the short run, and what this means for the effect of the rise in demand.",
      points: [
        "New trees take three to five years to bear fruit (long production period).",
        "Avocados are perishable, so stocks cannot be held back and released.",
        "The supply curve is steep: the rise in demand (shift right) creates a shortage that is removed mainly by a rise in price.",
        "So price rises a lot (25%) and quantity only a little (8%).",
      ],
      modelAnswer: "Avocado trees take three to five years to bear fruit, so farmers cannot plant and harvest more in the short run, and the fruit is perishable, so there are no stocks to release. Supply is therefore inelastic and the supply curve is steep. When demand increases and the demand curve shifts right, the shortage at the old price is removed mainly by a higher price: the price rose by 25% but quantity by only 8%.",
    });
    const q = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.elasticity.pes", "econ.markets.price-changes", "econ.markets.equilibrium", "econ.supply.law-of-supply"],
      stem: "A fictional country in southern Africa has recently gained access to new export markets for avocados, and demand for its avocados has risen sharply. Avocado trees take three to five years after planting to bear fruit, and the fruit spoils within a few weeks of picking. Many small-scale farmers are now planting avocado trees.",
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "Price elasticity of supply measures the responsiveness of {{blank:a}} to a change in {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["quantity supplied"], choices: ["quantity supplied", "quantity demanded", "costs of production"] },
            { id: "b", accepted: ["price"], choices: ["price", "income", "costs"] },
          ],
          wrong: [["quantity demanded", "income"]],
          explanation: "PES = % change in quantity supplied ÷ % change in price.",
        }),
        P.fib({
          label: "(b)", marks: 4,
          stem: "Explain how the rise in demand affects the avocado market. Complete the explanation.",
          template: "The demand curve shifts to the {{blank:a}}. At the original price there is a {{blank:b}}, so the price {{blank:c}}. As the price changes, quantity supplied {{blank:d}} along the supply curve until a new equilibrium is reached.",
          blanks: [
            { id: "a", accepted: ["right"], choices: ["right", "left"] },
            { id: "b", accepted: ["shortage"], choices: ["shortage", "surplus"] },
            { id: "c", accepted: ["rises"], choices: ["rises", "falls"] },
            { id: "d", accepted: ["extends"], choices: ["extends", "contracts", "increases", "decreases"] },
          ],
          wrong: [["left", "surplus", "falls", "increases"]],
          explanation: "Increase in demand → shortage at the old price → price rises → extension of supply (a movement along S) to a new equilibrium with higher price and quantity.",
        }),
        nested("(c)", 6, "Use the information about the first year after the export markets opened.", [sub1, sub2]),
        P.manual({
          label: "(d)", marks: 8, levels: LV(8),
          stem: "Discuss whether the rise in demand will benefit avocado farmers in the long run.",
          points: [
            "For: in the short run, inelastic supply means prices rise sharply, raising the incomes of farmers who already have trees.",
            "For: export demand may keep growing, and higher incomes allow investment.",
            "Against: many farmers are planting now; in 3–5 years supply will increase sharply (shift right), pushing the price down.",
            "Against: if world demand is inelastic, a large rise in supply can cause a large fall in price and revenue.",
            "Against: farmers who planted late may enter when prices have already fallen; perishable fruit cannot be stored to wait for better prices.",
            "Considers ways to reduce risk: cold storage, processing (avocado oil), contracts with exporters.",
            "Uses the context (PES 0.32, price rise 25%).",
            "Reaches a justified conclusion.",
          ],
          modelAnswer: "In the short run farmers who already have bearing trees gain: supply is inelastic (PES 0.32), so the rise in demand raised the price by 25% and their incomes rose. If export demand keeps growing, these gains could continue and allow farmers to invest. However, many farmers are now planting trees. In three to five years supply will shift strongly to the right, and the price is likely to fall, perhaps sharply if demand is inelastic. Because avocados are perishable, farmers cannot hold fruit back to wait for better prices, and late entrants may find that prices have fallen below what they expected when they planted. Farmers could reduce the risk by signing contracts with exporters, using cold storage, or processing fruit into oil. Overall, the rise in demand benefits early producers, but in the long run the gains are likely to shrink as supply catches up, so the benefit depends on how fast demand keeps growing compared with new planting.",
        }),
      ],
      explanation: "Rising demand with inelastic short-run supply raises prices sharply; in the long run supply becomes more elastic and the price gain is likely to shrink.",
      hints: ["(b) Shift, shortage, price, extension.", "(c)(i) Use the original values as bases.", "(d) What happens when the new trees start to bear fruit?"],
    });
    q.modelResponse.parts["(c)(i)"] = sub1.model;
    q.wrongResponses[0].parts["(c)(i)"] = sub1.wrong[0];
  }
});
