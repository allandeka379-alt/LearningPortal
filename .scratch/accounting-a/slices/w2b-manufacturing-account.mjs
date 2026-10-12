// W2b: manufacturing.account
import { concept, P, money, fmt, chk, r2, sum, table } from "../lib.mjs";
import { mc, U, mfg } from "../tables/w2b-lib.mjs";

concept("aacc.manufacturing.account", { file: "manufacturing/account", keyPrefix: "manufacturing.account" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is prime cost?",
    right: ["Direct materials, direct labour and direct expenses", "Correct: the total of the direct costs of production."],
    wrong: [["Direct materials and factory overheads only", "Direct labour is also part of prime cost, and overheads are not."], ["The cost of production less the change in work in progress", "That is how the cost of production is built up from factory cost."], ["All the costs of the business in the year", "Prime cost includes only direct manufacturing costs."]],
    explanation: "Prime cost = raw materials consumed + direct labour + direct expenses.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which one of the following is a factory overhead?",
    right: ["Depreciation of factory machinery", "Correct: it is an indirect cost of running the factory."],
    wrong: [["Wages of workers who assemble the product", "These are direct labour and form part of prime cost."], ["Advertising of the finished goods", "Selling costs are not manufacturing costs."], ["Timber used in making furniture", "This is a direct material."]],
    explanation: "Indirect factory costs such as machine depreciation, power and indirect wages are factory overheads.",
  });
  const q3 = { o: 6400, p: 38900, c: 1500, r: 900, cl: 7300 };
  const q3a = chk(q3.o + q3.p + q3.c - q3.r - q3.cl, 38600);
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `Opening inventory of raw materials ${money(q3.o)}, purchases ${money(q3.p)}, carriage inwards ${money(q3.c)}, returns outwards ${money(q3.r)} and closing inventory ${money(q3.cl)}. What is the cost of raw materials consumed?`,
    right: [money(q3a), "Correct: 6,400 + 38,900 + 1,500 − 900 − 7,300."],
    wrong: [[money(q3.o + q3.p - q3.r - q3.cl), "Carriage inwards has been left out."], [money(q3.o + q3.p + q3.c + q3.r - q3.cl), "Returns outwards must be deducted."], [money(q3.o + q3.p + q3.c - q3.r + q3.cl), "Closing inventory must be deducted."]],
    hints: ["Add what came in, take away what went out or remains."],
    explanation: "Opening + purchases + carriage inwards − returns outwards − closing inventory = 38,600.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "How is carriage inwards treated in a manufacturing account?",
    right: ["It is added to the cost of purchases of raw materials", "Correct: it is part of the cost of bringing the materials to the factory."],
    wrong: [["It is a factory overhead", "It is part of the cost of materials, before prime cost."], ["It is deducted from purchases", "It increases the cost of materials."], ["It is charged in the statement of profit or loss as a selling cost", "It is a cost of getting materials, not of selling goods."]],
    hints: ["Does it relate to materials coming in or goods going out?"],
    explanation: "Carriage inwards increases the cost of the raw materials and is included before prime cost.",
  });
  const q5 = { fc: 84200, o: 5300, c: 6900 };
  const q5a = chk(q5.fc + q5.o - q5.c, 82600);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Factory cost is ${money(q5.fc)}. Opening work in progress is ${money(q5.o)} and closing work in progress is ${money(q5.c)}. What is the cost of production?`,
    right: [money(q5a), "Correct: add the opening and deduct the closing work in progress."],
    wrong: [[money(q5.fc - q5.o + q5.c), "The opening and closing work in progress have been reversed."], [money(q5.fc + q5.o + q5.c), "The closing work in progress must be deducted."], [money(q5.fc), "Ignoring work in progress overstates or understates the cost of the goods completed."]],
    hints: ["Opening work in progress was started last year."],
    explanation: "84,200 + 5,300 − 6,900 = 82,600.",
  });
  const q6 = { cop: 93600, units: 2400 };
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A factory completes ${fmt(q6.units)} units at a cost of production of ${money(q6.cop)}. What is the production cost per unit?`,
    right: [money(q6.cop / q6.units), "Correct: 93,600 ÷ 2,400."],
    wrong: [[money(q6.cop / 2000), "The number of units is the units completed."], [money(q6.cop * q6.units), "The cost must be divided by the units, not multiplied."], [money(q6.units / q6.cop * 100), "The division is the wrong way round."]],
    hints: ["Divide the cost by the number of units."],
    explanation: "Cost per unit = 93,600 ÷ 2,400 = 39.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which item is NOT included in the manufacturing account?",
    right: ["Salaries of the office staff", "Correct: administration costs belong in the statement of profit or loss."],
    wrong: [["Depreciation of factory machinery", "This is a factory overhead."], ["Wages of the factory supervisor", "Indirect factory wages are a factory overhead."], ["Royalties for each unit manufactured", "A per-unit royalty is a direct expense."]],
    hints: ["Is the cost incurred in making the goods?"],
    explanation: "Only the costs of making the goods are in the manufacturing account.",
  });
  const q8 = { fc: 110400, o: 8200, c: 12600 };
  const q8c = chk(q8.fc + q8.o - q8.c, 106000);
  mc(b, {
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `The factory cost is ${money(q8.fc)}. At the start of the year work in progress was ${money(q8.o)}. More goods were still unfinished at the end of the year, with a value of ${money(q8.c)}. What effect does the increase in work in progress have on the cost of production?`,
    right: [`It reduces the cost of production by ${money(q8.c - q8.o)} to ${money(q8c)}`, "Correct: a higher closing figure removes more cost, carrying it into next year."],
    wrong: [[`It increases the cost of production by ${money(q8.c - q8.o)}`, "A larger closing figure is deducted."], ["It has no effect, because work in progress is an asset", "The change in work in progress adjusts the cost of production."], [`It increases the factory cost by ${money(q8.c)}`, "Factory cost is not changed; the adjustment follows it."]],
    hints: ["Closing work in progress is deducted."],
    explanation: "Cost of production = 110,400 + 8,200 − 12,600 = 106,000, which is 4,400 less than the factory cost.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The cost of production from the manufacturing account is transferred to the trading account in place of purchases.",
    answer: true,
    explanation: "True. The goods are made by the business, so the cost of production replaces purchases of finished goods.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Factory power is part of prime cost.",
    answer: false,
    hints: ["Is it a direct cost or an overhead?"],
    explanation: "False. Factory power is an overhead added after prime cost to give the factory cost.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each cost of a furniture factory with its classification.",
    pairs: [["Timber used in chairs", "Direct material"], ["Wages of the carpenters who make the chairs", "Direct labour"], ["Salary of the factory supervisor", "Factory overhead"], ["Advertising in a newspaper", "Selling cost (not in the manufacturing account)"]],
    explanation: "Direct costs form prime cost; indirect factory costs are overheads; selling costs stay out.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about the manufacturing account.",
    template: "Prime cost plus factory overheads gives {{blank:a}} cost. After adjusting for work in progress the result is the cost of {{blank:b}}, which is transferred to the {{blank:c}} account.",
    blanks: [
      { id: "a", accepted: ["factory"], choices: ["factory", "selling", "net"] },
      { id: "b", accepted: ["production"], choices: ["production", "sales", "purchases"] },
      { id: "c", accepted: ["trading"], choices: ["trading", "appropriation", "capital"] },
    ],
    explanation: "Factory cost, then cost of production, which goes to the trading account.",
  });

  // --- Numerical / calculations
  const n1 = { o: 9200, p: 52800, c: 1100, cl: 11300, lab: 31400, dir: 2500 };
  const n1rm = chk(n1.o + n1.p + n1.c - n1.cl, 51800);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n1rm + n1.lab + n1.dir, 85700), wrong: [n1rm + n1.lab, n1.o + n1.p + n1.lab + n1.dir],
    stem: `Opening raw materials ${money(n1.o)}, purchases ${money(n1.p)}, carriage inwards ${money(n1.c)}, closing raw materials ${money(n1.cl)}, manufacturing wages ${money(n1.lab)} and royalties on units produced ${money(n1.dir)}. Calculate the prime cost.`,
    hints: ["Find the raw materials consumed first."],
    explanation: "Raw materials consumed 9,200 + 52,800 + 1,100 − 11,300 = 51,800. Prime cost 51,800 + 31,400 + 2,500 = 85,700.",
  });
  const n2 = { rent: 21000, fr: 0.65 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", daily: true, calculator: true,
    value: chk(n2.rent * n2.fr, 13650), wrong: [n2.rent * (1 - n2.fr), n2.rent],
    stem: `Rent of ${money(n2.rent)} is shared between factory and office on a floor area basis. The factory occupies 65% of the floor area. How much rent is a factory overhead?`,
    explanation: "21,000 × 65% = 13,650. The remaining 7,350 is an administration expense.",
  });
  const n3 = { prime: 128400, foh: 35900, wo: 6100, wc: 4800 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n3.prime + n3.foh + n3.wo - n3.wc, 165600), wrong: [n3.prime + n3.foh, n3.prime + n3.foh - n3.wo + n3.wc],
    stem: `Prime cost is ${money(n3.prime)}, factory overheads ${money(n3.foh)}, opening work in progress ${money(n3.wo)} and closing work in progress ${money(n3.wc)}. Calculate the cost of production.`,
    hints: ["Add opening work in progress and deduct the closing."],
    explanation: "128,400 + 35,900 = 164,300; add 6,100 and deduct 4,800 = 165,600.",
  });
  b.num({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(165600 / 3000, 55.2), dp: 2, wrong: [165600 / 2800, 165600 / 3200, 55],
    stem: "The cost of production is US\\$165,600 and 3,000 units were completed. Calculate the cost per unit, to the nearest cent.",
    hints: ["Divide the cost by the units."],
    explanation: "165,600 ÷ 3,000 = 55.20.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the account that is prepared to find the cost of the goods a business makes.",
    accepted: ["manufacturing account", "manufacturing"],
    explanation: "The manufacturing account finds the cost of production.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a manufacturer prepares a manufacturing account before the trading account.",
    points: ["The goods are made by the business, so there is no purchase price for them", "The account calculates the cost of production, which replaces purchases in the trading account", "It shows the cost of materials, labour and overheads, which helps control costs"],
    modelAnswer: "A manufacturer makes its goods, so it has no purchase price for them. The manufacturing account finds the cost of production, which replaces purchases in the trading account, and shows the costs that can be controlled.",
    hints: ["Where do the goods come from?"],
    explanation: "One mark each for the reason, the link to the trading account and cost control.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between prime cost and factory overheads, giving one example of each from a bakery.",
    points: ["Prime cost consists of direct costs (materials, labour and direct expenses)", "Factory overheads are indirect costs of running the factory", "Examples: flour (prime cost) and depreciation of the oven or factory power (overhead)"],
    modelAnswer: "Prime cost is the total of direct materials, direct labour and direct expenses, for example flour. Factory overheads are indirect costs of running the factory, such as depreciation of the oven.",
    hints: ["Can the cost be traced to a unit?"],
    explanation: "One mark for each definition and one for suitable examples.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The owner of a small manufacturer says: \"Cost of production per unit rose this year, so we must be less efficient.\" Evaluate this statement.",
    points: ["Cost per unit may have risen because material prices or wages rose, not because of inefficiency", "A change in the number of units produced affects the cost per unit when overheads are fixed", "Look at each element (materials, labour, overheads) to find the cause", "Conclusion: the statement may be true but needs analysis of the elements before action"],
    modelAnswer: "Rising cost per unit might be due to higher prices of materials or wages or to fewer units being made over fixed overheads. The owner should compare each element of cost with the previous year before deciding whether efficiency has fallen.",
    hints: ["What else could raise the unit cost?"],
    explanation: "A balanced answer separates price changes and volume changes from efficiency.",
  });

  // --- Practice structured 1 (12 marks)
  const s1 = { o: 8400, p: 41600, c: 1200, cl: 9800, lab: 27500, power: 6300, ind: 7900, dep: 4200, rent: 9600, fr: 0.6, wo: 3100, wc: 2600, units: 3600 };
  const s1m = mfg({
    rmOpen: s1.o, rmPurch: s1.p, carriageIn: s1.c, rmClose: s1.cl, labour: s1.lab,
    overheads: [["Factory power", s1.power], ["Indirect factory wages", s1.ind], ["Depreciation of kilns", s1.dep], ["Factory share of rent (60%)", s1.rent * s1.fr]],
    wipOpen: s1.wo, wipClose: s1.wc,
  }, { title: "Chinhoyi Brick Works: manufacturing account for the year ended 31 December 2025" });
  chk(s1m.rmUsed, 41400); chk(s1m.prime, 68900); chk(s1m.cop, 93560);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Chinhoyi Brick Works makes bricks. For the year ended 31 December 2025: raw materials opening inventory ${money(s1.o)}, purchases ${money(s1.p)}, carriage inwards ${money(s1.c)}, closing inventory ${money(s1.cl)}; manufacturing wages ${money(s1.lab)}; factory power ${money(s1.power)}; indirect factory wages ${money(s1.ind)}; depreciation of kilns ${money(s1.dep)}; rent ${money(s1.rent)} (60% factory); work in progress opening ${money(s1.wo)}, closing ${money(s1.wc)}. The factory completed ${fmt(s1.units)} bricks.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1m.rmUsed, wrong: [s1.o + s1.p - s1.cl], stem: "Calculate the cost of raw materials consumed.", explanation: "8,400 + 41,600 + 1,200 − 9,800 = 41,400." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s1m.prime, wrong: [s1m.factoryCost], stem: "Calculate the prime cost.", explanation: "41,400 + 27,500 = 68,900." }),
      P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the manufacturing account for the year.", points: ["Cost of raw materials consumed 41,400 with carriage inwards included", "Prime cost 68,900 (own figure)", "Factory overheads listed with the factory share of rent 5,760 and total 24,160", "Opening and closing work in progress added and deducted", "Cost of production with heading and brackets for deductions"], modelAnswer: s1m.md, explanation: "Cost of production = 68,900 + 24,160 + 3,100 − 2,600 = 93,560." }),
      P.num({ label: "(d)", marks: 2, kind: "money", dp: 2, value: s1m.cop / s1.units, wrong: [s1m.factoryCost / s1.units], stem: "Calculate the cost of production per brick, to the nearest cent.", explanation: "93,560 ÷ 3,600 = 25.99." }),
      P.mcq({ label: "(e)", marks: 1, stem: "Where is the remaining 40% of the rent shown?", options: [["In administration expenses in the statement of profit or loss", "Correct: it relates to the office."], ["In the manufacturing account as a direct expense", "It is not a factory cost."], ["As a deduction from the cost of production", "It is an expense, not a deduction."], ["In the statement of financial position as a prepayment", "It is an expense of the year."]], answer: "A", explanation: "The office share of a shared expense is an administration expense." }),
    ],
    hints: ["Apportion the rent first: 60% is a factory overhead.", "Add opening work in progress and deduct the closing."],
    explanation: "This item practises a full manufacturing account with apportionment and cost per unit.",
  });

  // --- Practice structured 2 (16 marks)
  const s2 = { o: 12300, p: 78000, cl: 10500, lab: 46000, ind: 11000, wo: 6200, wc: 7400, units: 2500, quote: 62 };
  const shared = [["Rent", 15000, 0.6], ["Electricity", 9000, 0.75], ["Insurance", 4800, 0.5], ["Depreciation: machinery (12% of 70,000)", 8400, 1], ["Depreciation: office equipment (10% of 20,000)", 2000, 0]];
  chk(70000 * 0.12, 8400); chk(20000 * 0.1, 2000);
  const app = shared.map(([l, t, f]) => [l, t, r2(t * f), r2(t * (1 - f))]);
  const fTot = sum(app.map((x) => x[2]));
  const oTot = sum(app.map((x) => x[3]));
  const s2m = mfg({ rmOpen: s2.o, rmPurch: s2.p, rmClose: s2.cl, labour: s2.lab, overheads: [["Indirect factory wages", s2.ind], ["Factory share of shared expenses", fTot]], wipOpen: s2.wo, wipClose: s2.wc });
  const unit2 = s2m.cop / s2.units;
  const price2 = unit2 * 1.5;
  const appMd = table(["Expense", `Total ${U}`, `Factory ${U}`, `Office ${U}`], [...app, ["**Total**", `**${fmt(sum(shared.map((x) => x[1])))}**`, `**${fmt(fTot)}**`, `**${fmt(oTot)}**`]], ["l", "r", "r", "r"]);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Rudo Metalworks in Bulawayo made ${fmt(s2.units)} units in the year ended 31 December 2025. Raw materials: opening inventory ${money(s2.o)}, purchases ${money(s2.p)}, closing inventory ${money(s2.cl)}. Direct labour ${money(s2.lab)}; indirect factory wages ${money(s2.ind)}. Work in progress: opening ${money(s2.wo)}, closing ${money(s2.wc)}. Shared expenses: rent ${money(15000)} (60% factory), electricity ${money(9000)} (75% factory), insurance ${money(4800)} (50% factory); machinery depreciation 12% on cost of ${money(70000)} (factory); office equipment depreciation 10% on cost of ${money(20000)}. A supplier offers to supply the same units for US\\$62 each.`,
    parts: [
      P.manual({ label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare a statement apportioning the shared expenses between the factory and the office.", points: ["Rent 9,000 factory and 6,000 office", "Electricity 6,750 and 2,250; insurance 2,400 and 2,400", "Machinery depreciation 8,400 all factory; office equipment 2,000 all office", "Totals: 26,550 factory, 12,650 office (own figures if consistent)"], modelAnswer: appMd, explanation: "Each total is split using the stated proportions." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: s2m.cop, wrong: [s2m.factoryCost, s2m.prime], stem: "Calculate the cost of production.", explanation: `Raw materials consumed ${fmt(s2m.rmUsed)}; prime cost ${fmt(s2m.prime)}; factory overheads 11,000 + ${fmt(fTot)} = ${fmt(s2m.foh)}; factory cost ${fmt(s2m.factoryCost)}; add 6,200 and deduct 7,400 = ${fmt(s2m.cop)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", dp: 2, value: unit2, wrong: [s2m.factoryCost / s2.units], stem: "Calculate the cost of production per unit, to the nearest cent.", explanation: `${fmt(s2m.cop)} ÷ 2,500 = ${fmt(unit2)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", dp: 2, value: price2, wrong: [unit2 * 1.25, unit2 / 0.5], stem: "The business adds a mark-up of 50% on the cost of production to find the selling price. Calculate the selling price per unit, to the nearest cent.", explanation: `${fmt(unit2)} × 1.50 = ${fmt(price2)}.` }),
      P.manual({ label: "(e)", marks: 5, stem: "Evaluate whether Rudo Metalworks should buy from the supplier instead of making the units, and advise the owner.", points: [`The supplier's price of US\\$62 is below the production cost of US\\$${fmt(unit2)}, a saving of US\\$${fmt(unit2 - 62)} per unit`, "The saving is not certain because some factory overheads (rent, depreciation) continue even if production stops", "Only the avoidable costs should be compared, not the full cost", "Non-financial factors: quality, reliability of supply, loss of skilled staff, control", "Advice: do not stop production solely on the full-cost comparison; compare avoidable costs and check quality"], modelAnswer: "The offer of US\\$62 is below the production cost of US\\$" + fmt(unit2) + ", but some overheads such as rent and depreciation continue if production stops, so the real saving is smaller. Quality, reliability and the loss of skilled staff matter too. The owner should compare avoidable costs and check the supplier's quality before deciding.", explanation: "One mark each for the comparison, fixed costs, avoidable costs, non-financial factors and the advice." }),
    ],
    hints: ["Apportion each shared expense first.", "Raw materials consumed = opening + purchases − closing."],
    explanation: "This item practises apportionment, the cost of production, unit cost and a make-or-buy evaluation.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Prime cost", "Direct materials + direct labour + direct expenses.");
  b.card("FORMULA", "Raw materials consumed", "Opening inventory + purchases + carriage inwards − returns outwards − closing inventory.");
  b.card("DEFINITION", "Factory overheads", "Indirect costs of running the factory: indirect wages, power, machine depreciation, a share of rent.");
  b.card("FORMULA", "Cost of production", "Prime cost + factory overheads + opening work in progress − closing work in progress.");
  b.card("FORMULA", "Cost per unit", "Cost of production ÷ units produced.");
  b.card("CONCEPT", "Work in progress", "Goods started but not finished at the year end; add opening, deduct closing.");
  b.card("CONCEPT", "Shared expenses", "Apportion rent, power and insurance between factory and office on a stated basis; the office share is an administration expense.");
  b.card("FACT", "Where the cost of production goes", "To the trading account, in place of purchases.");
  b.card("FACT", "Not in the manufacturing account", "Selling and administration costs.");
});
