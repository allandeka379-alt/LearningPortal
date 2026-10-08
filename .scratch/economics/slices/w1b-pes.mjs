// W1b: econ.elasticity.pes — definition, calculation, values and curves, determinants, farming.
import { concept, P, elasticity, schedule, table, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const f2 = (v) => v.toFixed(2);

concept("econ.elasticity.pes", { file: "elasticity/pes", keyPrefix: "elasticity.pes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which formula gives **price elasticity of supply**?",
    options: [
      ["% change in quantity supplied ÷ % change in price", "Correct."],
      ["% change in price ÷ % change in quantity supplied", "This is upside down."],
      ["% change in quantity demanded ÷ % change in price", "This is PED."],
      ["Change in quantity supplied ÷ change in price", "PES uses percentage changes, not absolute changes."],
    ],
    answer: "A",
    explanation: "PES = % change in quantity supplied ÷ % change in price.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A supply curve is a vertical straight line. Supply is",
    options: [
      ["perfectly inelastic.", "Correct: quantity supplied does not change whatever the price; PES = 0."],
      ["perfectly elastic.", "Perfectly elastic supply is a horizontal line."],
      ["unitary elastic.", "Unitary elastic supply is a straight line through the origin."],
      ["elastic.", "Elastic supply is a gently sloping line cutting the price axis."],
    ],
    answer: "A",
    explanation: "A vertical supply curve means a fixed quantity: PES = 0.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The PES for a good is 0.4. Supply is",
    options: [
      ["price inelastic.", "Correct: 0.4 is between 0 and 1."],
      ["price elastic.", "Elastic supply has PES greater than 1."],
      ["unitary elastic.", "Unitary elasticity is exactly 1."],
      ["perfectly elastic.", "Perfectly elastic supply has an infinite PES."],
    ],
    answer: "A",
    explanation: "PES between 0 and 1: quantity supplied changes by a smaller percentage than price.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which straight-line supply curve shows **unitary** price elasticity of supply?",
    options: [
      ["A line that passes through the origin", "Correct: every straight line through the origin has PES = 1."],
      ["A line that cuts the price axis", "A straight line cutting the price axis is elastic."],
      ["A line that cuts the quantity axis", "A straight line cutting the quantity axis is inelastic."],
      ["A horizontal line", "A horizontal supply curve is perfectly elastic."],
    ],
    answer: "A",
    explanation: "For straight-line supply curves: through the origin = unitary; cutting the price axis = elastic; cutting the quantity axis = inelastic.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which factor makes the supply of a good more **elastic**?",
    options: [
      ["The firm has spare capacity and large stocks", "Correct: it can increase output or release stock quickly."],
      ["The good is perishable and cannot be stored", "Perishable goods cannot be stockpiled, making supply inelastic."],
      ["Production takes several years", "A long production period makes supply inelastic."],
      ["Workers and machines are highly specialised", "Specialised factors are hard to switch, making supply inelastic."],
    ],
    answer: "A",
    explanation: "Spare capacity and stocks allow a quick response to a price rise.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is the supply of fresh flowers grown for export likely to be price inelastic in the short run?",
    options: [
      ["They take time to grow and cannot be stored for long", "Correct: a long production period and perishability limit the response."],
      ["Demand for flowers is price elastic", "PED does not decide PES; supply depends on producers' ability to respond."],
      ["Flower growers have large stocks in warehouses", "Large stocks would make supply more elastic, and flowers cannot be stored for long."],
      ["Any farmer can switch to flowers immediately", "If switching were easy, supply would be elastic."],
    ],
    answer: "A",
    hints: ["Think about the production period and storage."],
    explanation: "Growing time and perishability mean growers cannot quickly increase the quantity supplied.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Demand for cement increases sharply. In which situation will the price of cement rise **least**?",
    options: [
      ["Cement factories have spare capacity and large stocks", "Correct: supply is elastic, so most of the extra demand is met by extra output."],
      ["Cement factories are already working at full capacity", "Supply is inelastic, so the price rises a lot."],
      ["A new factory will take three years to build", "In the meantime supply is inelastic."],
      ["Imports of cement are banned", "Removing imports reduces the ability of supply to respond."],
    ],
    answer: "A",
    hints: ["The more elastic the supply, the more an increase in demand raises quantity rather than price."],
    explanation: "With elastic supply, an increase in demand raises quantity a lot and price a little.",
  });

  // Calculations.
  const c1 = { p1: 15, p2: 18, q1: 600, q2: 690 };
  const e1 = elasticity.pes(c1);
  check("e1", e1, 0.75);
  b.calc({
    d: 2, skill: "APPLICATION", kind: "elasticity", value: e1, daily: false,
    stem: "The price of a bag of cement rises from US\\$15 to US\\$18. A fictional cement works raises its weekly supply from 600 to 690 bags. Calculate the PES to two decimal places.",
    wrong: [1 / e1, 90 / 3],
    explanation: `1. % change in quantity supplied = 90 ÷ 600 × 100 = +15%.\n2. % change in price = 3 ÷ 15 × 100 = +20%.\n3. PES = 15 ÷ 20 = **${f2(e1)}**: inelastic. Dividing 20 by 15 gives ${f2(1 / e1)}.`,
  });
  const e2 = elasticity.fromPct(18, 6);
  b.num({
    d: 2, skill: "APPLICATION", kind: "elasticity", value: e2, daily: true,
    stem: "A 6% rise in the price of school exercise books leads to an 18% rise in the quantity supplied. Calculate the PES to two decimal places.",
    wrong: [6 / 18, 12],
    explanation: `PES = 18 ÷ 6 = **${f2(e2)}**: elastic.`,
  });
  const qch = 0.3 * 40;
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: qch,
    stem: "The PES for beef in the short run is 0.3. The price of beef rises by 40%. Calculate the expected percentage increase in the quantity of beef supplied, to one decimal place.",
    wrong: [40 / 0.3, 40.3],
    hints: ["% change in quantity supplied = PES × % change in price."],
    explanation: `% change in quantity supplied = 0.3 × 40 = **${qch.toFixed(1)}%**.`,
  });
  const sp = [2, 3, 4], sq = [100, 150, 200];
  schedule({ prices: sp, qs: sq });
  const e3 = elasticity.pes({ p1: 2, p2: 3, q1: 100, q2: 150 });
  b.num({
    d: 3, skill: "ANALYSIS", kind: "elasticity", value: e3,
    stem: `A supply schedule is shown below.\n\n${schedule({ prices: sp, qs: sq, priceHeader: "Price (US\\$)", qsHeader: "Quantity supplied (units)" }).md}\n\nCalculate the PES when the price rises from US\\$2 to US\\$3, to two decimal places.`,
    wrong: [50 / 1, 0.5],
    hints: ["Use percentage changes with the original values as bases.", "What kind of line joins these points?"],
    explanation: `% change in quantity = 50 ÷ 100 × 100 = 50%; % change in price = 1 ÷ 2 × 100 = 50%; PES = **${f2(e3)}**. The points lie on a straight line through the origin (quantity = 50 × price), which always has PES = 1.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Supply is usually more price elastic in the long run than in the short run.",
    answer: true,
    explanation: "True. Over time firms can build capacity and new firms can enter.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Price elasticity of supply is normally negative.",
    answer: false,
    explanation: "False. Price and quantity supplied move in the same direction, so PES is normally positive.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each PES value with the supply curve that shows it.",
    pairs: [
      ["PES = 0", "Vertical line"],
      ["PES = 1", "Straight line through the origin"],
      ["PES = infinity", "Horizontal line"],
      ["PES = 0.5", "Straight line cutting the quantity axis"],
    ],
    explanation: "Vertical: 0; through the origin: 1; horizontal: infinity; cutting the quantity axis: inelastic.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Goods that can be stored easily tend to have {{blank:a}} supply. Supply of crops is usually {{blank:b}} in the short run because of the long {{blank:c}} period.",
    blanks: [
      { id: "a", accepted: ["elastic"], choices: ["elastic", "inelastic"] },
      { id: "b", accepted: ["inelastic"], choices: ["elastic", "inelastic"] },
      { id: "c", accepted: ["production"], choices: ["production", "payment", "consumption"] },
    ],
    wrong: [["inelastic", "elastic", "payment"]],
    explanation: "Stocks make supply responsive; crops take a season to grow, so short-run supply is inelastic.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the price of maize often rises sharply after a drought.",
    points: [
      "The drought reduces the harvest: supply decreases (shift left).",
      "Supply of maize is price inelastic in the short run (long growing season).",
      "Farmers cannot respond to the higher price until the next season, so quantity hardly rises.",
      "With inelastic demand for maize as a staple, the shortage is cleared mainly by a large price rise.",
    ],
    modelAnswer: "A drought cuts the harvest, so the supply of maize decreases and the supply curve shifts left. Maize takes a whole season to grow, so supply is very inelastic in the short run: farmers cannot grow more just because the price has risen. Demand is also inelastic, because maize meal is the staple food. The shortage at the old price is therefore removed mainly by a sharp rise in price rather than by extra supply.",
    hints: ["Think about both how far supply shifts and how responsive it is afterwards."],
    explanation: "Drought shifts supply left; inelastic supply (and demand) means a large price rise.",
  });

  // Structured 1: two producers.
  const rows = [["Furniture workshop", 50, 60, 60, 90], ["Avocado farm", 50, 60, 2500, 2750]];
  const peses = [elasticity.pes({ p1: 50, p2: 60, q1: 60, q2: 90 }), elasticity.pes({ p1: 50, p2: 60, q1: 2500, q2: 2750 })];
  const t = table(["Producer", "Old price (US\\$ per unit)", "New price (US\\$ per unit)", "Old monthly output", "New monthly output"], rows);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows how two fictional producers in Mutare responded to a 20% rise in the price of their products. Output for the furniture workshop is in tables; for the avocado farm in crates.\n\n${t}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "elasticity", value: peses[0], stem: "Calculate the PES for the furniture workshop, to two decimal places.", wrong: [1 / peses[0], 30 / 10], explanation: `% change in quantity = 30 ÷ 60 × 100 = 50%; % change in price = 20%; PES = ${f2(peses[0])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "elasticity", value: peses[1], stem: "Calculate the PES for the avocado farm, to two decimal places.", wrong: [1 / peses[1], 250 / 10], explanation: `% change in quantity = 250 ÷ 2,500 × 100 = 10%; PES = 10 ÷ 20 = ${f2(peses[1])}.` }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** reasons why the workshop's supply is more elastic than the farm's.",
        points: [
          "The workshop can add a shift / use spare capacity or hire carpenters quickly.",
          "Timber can be stored, so materials are ready to make more tables.",
          "Avocado trees take years to mature: long production period.",
          "Avocados are perishable and the harvest depends on the season, so output cannot be increased quickly.",
        ],
        modelAnswer: "The workshop can respond quickly: it can work overtime or hire more carpenters, and timber can be kept in stock, so output rises by 50%. The farm cannot plant and harvest new avocado trees for several years, and the fruit is perishable and seasonal, so it can only add a little by picking more carefully; output rises by just 10%.",
        explanation: "Two reasons contrasting the producers.",
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Describe the supply curves you would draw to compare the two producers.",
        points: [
          "Price on the vertical axis, quantity on the horizontal axis (separate diagrams or same proportional scale).",
          "Workshop: a gently sloping (elastic) supply curve; as a straight line it would cut the price axis.",
          "Farm: a steep (inelastic) supply curve; as a straight line it would cut the quantity axis.",
          "The same 20% price rise shown causing a large rise in quantity for the workshop and a small one for the farm.",
        ],
        modelAnswer: "Price on the vertical axis and quantity on the horizontal axis. The workshop's supply curve is relatively flat (a straight line that would meet the price axis), so a 20% price rise moves output along it from 60 to 90 tables. The farm's supply curve is steep (a straight line that would meet the quantity axis), so the same rise moves output only from 2,500 to 2,750 crates.",
        explanation: "Shapes and the axis test, with the data.",
      }),
    ],
    hints: ["PES = % change in quantity supplied ÷ % change in price (20%).", "Think about time, stocks and spare capacity."],
    explanation: "Manufacturing with spare capacity has elastic supply; tree crops have inelastic supply.",
  });

  // Structured 2: discuss making farm supply more elastic.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional country the supply of vegetables to the cities is very price inelastic, so vegetable prices rise steeply in the dry season and fall sharply after the rains. The government is considering paying for cold-storage warehouses near the main markets.",
    parts: [
      P.tf({ label: "(a)", stem: "Cold storage would make the supply of vegetables more price elastic.", answer: true, explanation: "True: stored vegetables can be released when prices rise." }),
      P.tf({ label: "(b)", stem: "If supply becomes more elastic, a rise in demand will cause a larger rise in price.", answer: false, explanation: "False: more elastic supply means more of the rise in demand is met by extra quantity, so the price rises less." }),
      P.manual({
        label: "(c)", marks: 6, levels: LV(6),
        stem: "Discuss whether building cold-storage warehouses is the best way to make vegetable supply more responsive to price.",
        points: [
          "For: storage lets traders hold vegetables after the rains and release them in the dry season, raising PES.",
          "For: prices become more stable, helping consumers and farmers' incomes; less waste.",
          "Against: high cost; depends on reliable electricity; many vegetables still perish.",
          "Alternative: irrigation lets farmers grow in the dry season (raises output when prices are high).",
          "Alternative: better roads / market information so farmers respond faster.",
          "Justified conclusion.",
        ],
        modelAnswer: "Cold storage would let traders keep part of the post-rains glut and sell it in the dry season, so supply would respond more to the higher prices and prices would be steadier, with less waste. However, warehouses are expensive, need reliable electricity, and leafy vegetables still spoil within weeks. Irrigation might do more, because it lets farmers actually grow vegetables in the dry season, and better roads and market information would help farmers react faster to price signals. On balance storage is useful for longer-lasting vegetables such as potatoes and onions, but combining it with irrigation is likely to make supply more responsive than storage alone.",
        explanation: "Weigh storage against its costs and against alternatives (irrigation, roads) and conclude.",
      }),
    ],
    hints: ["Stocks are a determinant of PES.", "What else limits how fast farmers can respond?"],
    explanation: "Stocks and the ability to produce out of season make supply more elastic and prices more stable.",
  });

  b.card("DEFINITION", "Define **price elasticity of supply**.", "A measure of how responsive quantity supplied is to a change in price.");
  b.card("FORMULA", "Formula for **PES**?", "% change in quantity supplied ÷ % change in price.");
  b.card("FACT", "Is PES normally positive or negative?", "Positive: price and quantity supplied move in the same direction.");
  b.card("CONCEPT", "Supply curve when PES = 0?", "A vertical line (perfectly inelastic).");
  b.card("CONCEPT", "Which straight-line supply curves have PES = 1?", "Any straight line through the origin.");
  b.card("CONCEPT", "Supply curve when PES is infinite?", "A horizontal line (perfectly elastic).");
  b.card("CONCEPT", "List four determinants of PES.", "Time; spare capacity; stocks; ease of switching factors (and length of the production period, perishability).");
  b.card("FACT", "Why is farm supply inelastic in the short run?", "Crops and livestock take a long time to produce, and many farm goods are perishable.");
  b.card("CONCEPT", "Why does inelastic supply cause large price swings?", "Quantity cannot respond much to a change in demand or weather, so the price changes a lot instead.");
});
