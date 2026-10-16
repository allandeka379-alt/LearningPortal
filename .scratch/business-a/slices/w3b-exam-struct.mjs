// W3b exam-format items: ZIM_STRUCT10 x3 (ZIMSEC Business Studies Paper 1 section A / Business Enterprise Skills Paper 1 section A)
import { concept, P, EXAM, checkExam, ZIM, ZBS, chk, r2, money, costing, operations, table } from "../lib.mjs";

const C = (k) => `abus.${k}`;

concept(C("operations.productivity"), { file: "exam/w3b-struct", keyPrefix: "exam.w3b-struct" }, (b) => {
  // 1. Productivity and capacity utilisation
  {
    const emp = 40, max = 12000, out = 9000, lab = 27000;
    const util = operations.capacityUtilisation(out, max), spare = operations.spareCapacity(out, max);
    const lp = operations.labourProductivity(out, emp), ulc = operations.unitLabourCost(lab, out);
    chk(util, 75); chk(spare, 3000); chk(lp, 225); chk(ulc, 3);
    b.struct({
      d: 3, examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs, applies: ZBS, calculator: true,
      paper: "ZIMSEC Business Studies Paper 1",
      concepts: [C("operations.productivity"), C("operations.capacity-outsourcing")],
      stem: `Rufaro Garments is a fictional clothing factory in Bulawayo with ${emp} machinists. Its maximum capacity is ${max.toLocaleString("en-GB")} shirts a month. Last month it made ${out.toLocaleString("en-GB")} shirts and its labour cost was ${money(lab)}. The owner wants to raise productivity and make better use of the factory.`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({ label: "(a)", stem: "Calculate the factory's:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "pct", value: util, wrong: [r2((max / out) * 100), r2((spare / max) * 100)], stem: "capacity utilisation, to one decimal place;", explanation: "9,000 ÷ 12,000 × 100 = 75.0%." }),
          P.num({ label: "(ii)", marks: 1, kind: "units", value: spare, wrong: [out], stem: "spare capacity, in shirts a month.", explanation: "12,000 − 9,000 = 3,000 shirts." }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "plain", unit: "shirts per machinist", value: lp, wrong: [r2(out / max), r2(max / emp)], stem: "labour productivity, in shirts per machinist;", explanation: "9,000 ÷ 40 = 225 shirts per machinist." }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: ulc, wrong: [lab / emp], stem: "the labour cost of each shirt.", explanation: "27,000 ÷ 9,000 = US\\$3.00." }),
        ] }),
        P.manual({ label: "(c)", marks: 4, stem: "Outline two ways in which Rufaro Garments could increase labour productivity.", points: ["Train the machinists in faster and more accurate methods", "Application: skilled machinists sew more shirts in the same time with fewer faults", "Buy better sewing machines or improve the layout of the work", "Application: new machines or a better layout reduce the time each shirt takes"], modelAnswer: "The factory could train the machinists in faster and more accurate methods, so each sews more shirts in the same time with fewer faults. It could also buy better sewing machines or improve the layout of the work, which reduces the time each shirt takes.", explanation: "Two ways, each outlined with a result." }),
      ]),
      hints: ["Capacity utilisation = actual ÷ maximum × 100.", "Labour productivity = output ÷ number of employees."],
      explanation: "Utilisation 75.0%, spare capacity 3,000 shirts, productivity 225 shirts per machinist and labour cost US\\$3.00 a shirt.",
    });
  }

  // 2. Pricing: cost-plus and competition
  {
    const units = 5000, direct = 1.8, oh = 3000, mk = 40, rival = 3;
    const full = costing.fullCostPerUnit(direct, oh, units), price = costing.priceFromMarkUp(full, mk);
    chk(full, 2.4); chk(price, 3.36);
    chk((price - full) * units, 4800); chk((rival - full) * units, 3000);
    b.struct({
      d: 3, examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs, applies: ZIM, calculator: true,
      paper: "ZIMSEC BES Paper 1",
      concepts: [C("mix.pricing")],
      stem: `Tafara Bakery is a fictional business in Mutare that makes ${units.toLocaleString("en-GB")} cakes a month. Direct costs are ${money(direct)} a cake and monthly overheads are ${money(oh)}, shared equally between the cakes. The owner sets the price by adding a mark-up of ${mk}% to the full cost of a cake. A rival bakery has just started selling similar cakes at ${money(rival)}.`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({ label: "(a)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: full, wrong: [direct, direct + oh], stem: "the full cost of a cake;", explanation: "Overheads per cake = 3,000 ÷ 5,000 = 0.60. Full cost = 1.80 + 0.60 = US\\$2.40." }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: price, wrong: [r2(full + 0.4), r2(direct * 1.4)], stem: "the selling price of a cake.", explanation: "2.40 × 1.40 = US\\$3.36." }),
        ] }),
        P.match({ label: "(b)", marks: 2, stem: "Match each pricing strategy to its description.", pairs: [["Penetration pricing", "A low price at launch to win market share"], ["Price skimming", "A high price at launch to earn a large profit on each unit"]], explanation: "Penetration is low-price entry; skimming is high-price entry." }),
        P.manual({ label: "(c)", marks: 4, stem: "Discuss whether Tafara Bakery should reduce its price to match the rival's price of US\\$3.00.", points: ["At US\\$3.36 the profit is US\\$0.96 a cake, or US\\$4,800 a month on 5,000 cakes", "At US\\$3.00 the profit falls to US\\$0.60 a cake, or US\\$3,000 a month, if sales stay the same", "A lower price may keep customers who would otherwise buy from the rival", "Judgement with a condition, for example: match the price only if sales would otherwise fall by more than a third"], modelAnswer: "At US\\$3.36 each cake earns US\\$0.96, or US\\$4,800 a month, but at US\\$3.00 the profit falls to US\\$0.60 a cake, or US\\$3,000 a month, if sales stay the same. A lower price may keep customers who would otherwise buy from the rival. The bakery should match the price only if it would otherwise lose more than about a third of its sales.", hints: ["Compare the monthly profit at each price."], explanation: "Profit comparison and a conditional judgement." }),
      ]),
      hints: ["Share the overheads over the cakes to find the full cost."],
      explanation: "Full cost US\\$2.40 and price US\\$3.36; matching US\\$3.00 cuts profit per cake from US\\$0.96 to US\\$0.60.",
    });
  }

  // 3. EOQ and ordering costs
  {
    const D = 7200, S = 50, H = 2;
    const e = operations.eoq(D, S, H), orders = D / e, tc = operations.annualInventoryCost(D, S, H, e);
    chk(e, 600, 1e-9); chk(orders, 12, 1e-9); chk(tc, 1200, 1e-9);
    b.struct({
      d: 4, examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs, applies: ZIM, calculator: true,
      paper: "ZIMSEC Business Studies Paper 1",
      concepts: [C("operations.inventory-eoq-jit"), C("operations.inventory-control")],
      stem: `Zuva Hardware is a fictional shop in Gweru that sells ${D.toLocaleString("en-GB")} bags of cement a year. It costs ${money(S)} to place an order and ${money(H)} to hold one bag in stock for a year. The manager uses the economic order quantity (EOQ = √(2DS ÷ H), where D is yearly demand, S the cost of placing an order and H the yearly holding cost of one bag).`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.num({ label: "(a)", marks: 3, type: "CALCULATION", kind: "units", value: e, wrong: [(2 * D * S) / H, Math.sqrt((2 * D * H) / S)], stem: "Calculate the economic order quantity.", explanation: "EOQ = √(2 × 7,200 × 50 ÷ 2) = √360,000 = 600 bags.", workedSolution: "1. 2 × 7,200 × 50 = 720,000.\n2. 720,000 ÷ 2 = 360,000.\n3. √360,000 = 600 bags." }),
        P.group({ label: "(b)", stem: "At the economic order quantity, calculate:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "plain", unit: "orders", value: orders, wrong: [D / 100], stem: "the number of orders placed in a year;", explanation: "7,200 ÷ 600 = 12 orders." }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: tc, wrong: [orders * S, tc * 2], stem: "the total yearly cost of ordering and holding stock.", explanation: "Ordering cost = 12 × 50 = 600. Holding cost = (600 ÷ 2) × 2 = 600. Total = US\\$1,200." }),
        ] }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain two limitations of using the economic order quantity.", points: ["It assumes that demand is constant, but cement sales vary with the season", "Application: in the building season demand could be much higher than 7,200 a year divided evenly", "It ignores discounts for bulk orders and delays in delivery", "Application: a supplier may offer a lower price for larger orders, or deliver late, so a buffer may be needed"], modelAnswer: "The model assumes that demand is constant, but cement sales vary with the building season, so the best order size changes through the year. It also ignores discounts for bulk orders and delays in delivery, so a supplier's discount or a late lorry may make a different order size or a buffer stock better.", hints: ["Think about the assumptions of the model."], explanation: "Two limitations, each applied to cement." }),
      ]),
      hints: ["At the EOQ the ordering cost equals the holding cost."],
      explanation: "EOQ 600 bags, 12 orders a year and total cost US\\$1,200 (ordering US\\$600 plus holding US\\$600).",
    });
  }
});
