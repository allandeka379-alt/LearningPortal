// W3a exam-format items: ZIMSEC Paper 1 section A structured questions (10 marks), EXAM.ZIM_STRUCT10
import { concept, P, EXAM, checkExam, ZIM, ZBS, table, money, chk, elasticity, pctChange, stats } from "../lib.mjs";

const PAPER = "ZIMSEC Paper 1 section A";
const base = { examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs };

concept("abus.research.purposes-methods", { file: "exam/w3a-struct", keyPrefix: "exam.w3a-struct" }, (b) => {
  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: sampling for a customer survey (both ZIMSEC syllabi)
  {
    const strata = [["Under 30", 600], ["30 to 49", 540], ["50 and over", 360]];
    const total = strata.reduce((s, x) => s + x[1], 0);
    chk(total, 1500, 1e-9);
    const interval = total / 75;
    chk(interval, 20, 1e-9);
    const st = stats.stratified(strata, 75);
    chk(st[1].sample, 27, 1e-9);
    b.struct({
      ...base, d: 3, applies: ZIM, paper: PAPER, calculator: true,
      concepts: ["abus.research.purposes-methods"],
      stem: "Nyasha Fresh Foods is a fictional supermarket in Chinhoyi. Its loyalty list has 1,500 customers. The owner wants to ask 75 of them what they think of a proposed new bakery counter.\n\n" + table(["Age group", "Customers on the list"], [...strata, ["**Total**", total]]),
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Sampling",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "plain", value: interval, unit: "(every nth)", stem: "The owner chooses every nth customer from the list for a systematic sample of 75. Calculate n.", wrong: [75, 15], explanation: "n = 1,500 ÷ 75 = 20, so every 20th customer is chosen." }),
            P.num({ label: "(ii)", marks: 2, kind: "plain", value: st[1].sample, unit: "customers", stem: "The owner decides instead to use a stratified sample of 75 by age group. Calculate the number of customers aged 30 to 49 in the sample.", wrong: [36, 75], explanation: "540 ÷ 1,500 × 75 = 27 customers." }),
          ],
        }),
        P.manual({
          label: "(b)", marks: 3, stem: "Explain **one** reason why the owner uses a sample rather than asking all 1,500 customers.",
          points: ["Asking everyone would take a long time and cost much more", "A properly chosen sample can still represent all customers", "So the owner gets useful results quickly at a lower cost"],
          modelAnswer: "Asking all 1,500 customers would take a long time and cost much more. A properly chosen sample can still represent all customers, so the owner gets useful results quickly and at a lower cost.",
          explanation: "A reason for sampling developed.",
        }),
        P.manual({
          label: "(c)", marks: 3, stem: "Explain **one** limitation of using only the loyalty list to select the sample.",
          points: ["The list contains only existing loyal customers", "People who shop elsewhere or rarely are not included", "So the results may be biased and not show the whole market"],
          modelAnswer: "The list contains only existing loyal customers, so people who shop elsewhere or rarely are not included. The results may be biased and may not show the views of the whole market.",
          explanation: "A limitation linked to bias.",
        }),
      ]),
      hints: ["Interval = population ÷ sample; group size ÷ population × sample."],
      explanation: "Every 20th customer; 27 customers aged 30 to 49; sampling saves cost; the list is biased towards loyal customers.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: elasticity and revenue (Business Studies only: elasticity is Business Studies Form 5)
  {
    const p0 = 2.5, p1 = 2.75, q0 = 6000, q1 = 5700;
    const ped = elasticity.price(p0, p1, q0, q1);
    chk(ped, -0.5, 1e-9);
    const dRev = p1 * q1 - p0 * q0;
    chk(dRev, 675, 1e-6);
    b.struct({
      ...base, d: 3, applies: ZBS, paper: PAPER, calculator: true,
      concepts: ["abus.marketing.elasticity"],
      stem: `Kuda Dairy is a fictional business in Bulawayo. It raises the price of a 2-litre bottle of milk from ${money(p0)} to US\\$2.75. Monthly sales fall from ${q0.toLocaleString("en-GB")} to ${q1.toLocaleString("en-GB")} bottles.`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Calculations",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "index", dp: 1, value: ped, stem: "Calculate the price elasticity of demand, to one decimal place, including the sign.", wrong: [-2, 0.5], explanation: "Price: +0.25 ÷ 2.50 × 100 = +10%. Quantity: −300 ÷ 6,000 × 100 = −5%. PED = −5 ÷ 10 = −0.5." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: dRev, stem: "Calculate the change in monthly revenue.", wrong: [-300, 2.75 * 300], explanation: "Revenue before = 2.50 × 6,000 = US\\$15,000. After = 2.75 × 5,700 = US\\$15,675. Increase = US\\$675." }),
          ],
        }),
        P.manual({
          label: "(b)", marks: 3, stem: "Explain what the value of the price elasticity of demand tells Kuda Dairy about the effect of its price rise.",
          points: ["Demand is inelastic (the size is less than 1)", "Quantity fell by a smaller percentage (5%) than the price rose (10%)", "So revenue rose despite the lower quantity"],
          modelAnswer: "Demand is inelastic because the size of the elasticity, 0.5, is less than 1. Quantity fell by a smaller percentage (5%) than the price rose (10%), so revenue rose despite the lower sales.",
          explanation: "Inelastic demand: revenue rises when price rises.",
        }),
        P.manual({
          label: "(c)", marks: 3, stem: "State **one** factor that may explain why demand for milk is inelastic and explain how it affects the demand.",
          points: ["A factor, such as milk being a necessity or few close substitutes", "Customers still need to buy it when the price rises", "So the quantity demanded falls by little"],
          modelAnswer: "Milk is a necessity for many families, so they still need to buy it when the price rises. The quantity demanded therefore falls by little.",
          explanation: "A determinant of PED linked to the result.",
        }),
      ]),
      hints: ["Percentage changes are measured on the original value."],
      explanation: "PED −0.5 (inelastic); revenue up by US\\$675; milk is a necessity.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: branding and the extended mix (both ZIMSEC syllabi)
  {
    const plain = 3.0, brand = 3.6, extra = 0.3, units = 12000;
    const prem = pctChange(plain, brand);
    chk(prem, 20, 1e-9);
    const extraMonth = (brand - plain - extra) * units;
    chk(extraMonth, 3600, 1e-6);
    b.struct({
      ...base, d: 3, applies: ZIM, paper: PAPER, calculator: true,
      concepts: ["abus.mix.product"],
      stem: `Mhuri Bakery is a fictional business in Mutare. It sells a plain loaf at US\\$3.00. It now sells the same bread in a branded wrapper at US\\$3.60. The wrapper adds US\\$0.30 to the cost of each loaf. The bakery sells ${units.toLocaleString("en-GB")} branded loaves a month.`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Calculations",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: prem, stem: "Calculate the price premium of the branded loaf as a percentage of the plain price, to one decimal place.", wrong: [16.7, 0.6], explanation: "Extra price = 0.60. 0.60 ÷ 3.00 × 100 = 20.0%." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: extraMonth, stem: "Calculate the extra profit a month from selling the branded loaf instead of the plain loaf.", wrong: [0.6 * units, 0.3 * units], explanation: "Extra profit per loaf = 3.60 − 3.00 − 0.30 = US\\$0.30. For 12,000 loaves = US\\$3,600." }),
          ],
        }),
        P.manual({
          label: "(b)", marks: 3, stem: "Explain **one** benefit to Mhuri Bakery of branding its bread.",
          points: ["The brand makes the bread easy to recognise", "Customers who trust the brand buy again", "So the bakery can charge a higher price (a premium) and keep customers"],
          modelAnswer: "The brand makes the bread easy to recognise, so customers who trust it buy again. The bakery can then charge a higher price and keep its customers.",
          explanation: "A benefit of branding developed.",
        }),
        P.manual({
          label: "(c)", marks: 3, stem: "Explain why the bakery's service staff (people) are important if it also opens a cafe.",
          points: ["A cafe is a service, which is intangible", "Customers judge the service by how staff treat them", "So poor service can harm the brand and sales"],
          modelAnswer: "A cafe is a service, which is intangible, so customers judge it by how staff treat them. Poor service could harm the brand and reduce sales.",
          explanation: "People in the extended mix.",
        }),
      ]),
      hints: ["Extra profit per loaf = extra price − extra cost."],
      explanation: "Premium 20.0%; extra profit US\\$3,600 a month; branding builds loyalty; staff matter in services.",
    });
  }
});
