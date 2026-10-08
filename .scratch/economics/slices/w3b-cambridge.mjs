// W3b: Cambridge 0455 Paper 2 exam-format items: Section A x2 (a government budget and taxation case; inflation data
// with a policy choice — STRUCTURED 20, ANALYSIS) and Section B x2 (STRUCTURED 20 = 2/4/6/8, EVALUATION).
// Fictional data, computed and checked here.
import { concept, P, CAM, table, budgetBalance, tax, prices, pctChange, productivity, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};
const nested = (label, marks, stem, subs) => ({ part: { label, type: "STRUCTURED", marks, stem, parts: subs.map((x) => x.part) }, model: null, wrong: [] });
const words = (s) => s.split(/\s+/).filter(Boolean).length;

concept("econ.fiscal.budget-fiscal-policy", { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  // ---------------- Section A (1): a government budget and taxation.
  {
    const rev = [["Personal income tax", 2150], ["Corporate tax", 980], ["Value added tax (VAT)", 2350], ["Excise duties (fuel, alcohol, tobacco)", 670], ["Customs duties", 450]];
    const R = rev.reduce((s, x) => s + x[1], 0), E = 7260, gdp = 30000, bal = budgetBalance(R, E), share = (-bal / gdp) * 100;
    check("R", R, 6600); check("bal", bal, -660); check("share", share, 2.2);
    const bands = [[450, 0], [1600, 20], [Infinity, 35]], y = 2500, t = tax.banded(y, bands), avg = tax.averageRate(t, y);
    check("t", t, 545); check("avg", avg, 21.8);
    const T = table(["Source of revenue", "US\\$ million"], [...rev, ["**Total revenue**", `**${fmt(R)}**`]]);
    const passage = [
      "Country M is a fictional lower-middle-income country in southern Africa. Its economy depends on mining, commercial farming and a fast-growing services sector, but about half of its workers earn their living in the informal sector, where few people pay income tax.",
      "The government's budget for 2026 plans total spending of US$7,260 million, mainly on education, health, roads and electricity, wages of public servants and interest on its debts. Table 1 shows planned revenue. GDP is expected to be US$30,000 million. The national debt has grown quickly over the past five years, and interest payments now take more than a tenth of all revenue.",
      "Personal income tax is charged on monthly income in bands: the first US$450 is tax-free, income between US$450 and US$1,600 is taxed at 20%, and income above US$1,600 is taxed at 35%. Corporate tax is charged at 25% of profits. VAT is charged at 14% on most goods and services, including basic foods.",
      "The finance minister wants to reduce the budget deficit. She has proposed raising the rate of VAT from 14% to 16%, arguing that VAT is hard to avoid and is paid by everyone who buys goods, including people who work in the informal sector. Trade unions and church groups have criticised the plan, saying that it will hurt poor families most, since they spend almost all their income on food, transport and other necessities. Some business leaders support the proposal but warn that sales may fall.",
      "An opposition party argues that the deficit should instead be reduced by cutting spending on public-sector wages and by collecting more corporate tax from mining companies. The minister replies that cutting spending would slow the economy and that many public services are already short of staff.",
    ].join("\n\n");
    const n = words(passage);
    if (n < 250 || n > 400) throw new Error(`Section A (1) passage has ${n} words`);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section A",
      concepts: ["econ.fiscal.budget-fiscal-policy", "econ.fiscal.taxation", "econ.macro.aims-conflicts"],
      stem: `${passage.replace(/US\$/g, "US\\$")}\n\n**Table 1: Planned government revenue of Country M, 2026**\n\n${T}`,
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the sentence.",
          template: "Personal income tax is a {{blank:a}} tax and VAT is an {{blank:b}} tax.",
          blanks: [
            { id: "a", accepted: ["direct"], choices: ["direct", "indirect"] },
            { id: "b", accepted: ["indirect"], choices: ["direct", "indirect"] },
          ],
          wrong: [["indirect", "direct"]],
          explanation: "Income tax falls on income (direct); VAT falls on spending (indirect).",
        }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: bal, stem: "Calculate the planned budget balance for 2026, in US\\$ million. Give a deficit as a negative number.", wrong: [-bal, R], explanation: `Revenue = ${rev.map((r) => fmt(r[1])).join(" + ")} = ${fmt(R)}; balance = ${fmt(R)} − ${fmt(E)} = −${-bal} (a deficit).` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: share, stem: "Calculate the planned deficit as a percentage of GDP. Give your answer to one decimal place.", wrong: [(-bal / R) * 100], explanation: `${-bal} ÷ ${fmt(gdp)} × 100 = ${pct(share, 1)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "pct", value: avg, stem: `Calculate the average rate of income tax paid by a worker earning US\\$${fmt(y)} a month. Give your answer to one decimal place.`, wrong: [35, (0.35 * y / y) * 100 - 1, ((t + 80) / y) * 100], explanation: `Tax = 0 + 20% × 1,150 + 35% × 900 = 230 + 315 = US\\$${t}; average rate = ${t} ÷ ${fmt(y)} × 100 = ${pct(avg, 1)}.` }),
        P.manual({
          label: "(e)", marks: 6,
          stem: "Analyse why the proposed rise in VAT may increase inequality in Country M.",
          points: [
            "VAT is an indirect tax charged on spending, including basic foods.",
            "Poor households spend almost all their income (save little), much of it on necessities.",
            "Rich households save a larger share of income, so they pay VAT on a smaller share of it.",
            "So the extra VAT takes a larger percentage of a poor household's income: the tax is regressive.",
            "Higher prices of food and transport reduce the real income of the poor proportionately more.",
            "Income tax, by contrast, is progressive (0% to 35%), so shifting the burden to VAT makes the tax system less progressive overall.",
          ],
          modelAnswer: "VAT is charged on spending, including basic foods, so a rise from 14% to 16% raises the prices of the goods every household buys. Poor families spend almost all their income, mostly on food, transport and other necessities, while richer households save part of their income and so pay VAT on a smaller share of it. The extra VAT therefore takes a larger percentage of a poor household's income than of a rich one's: it is a regressive tax. The real incomes of the poor fall proportionately more. By contrast, income tax in Country M is progressive, rising from 0% to 35%, so raising more revenue from VAT rather than from income tax makes the tax system as a whole less progressive and widens inequality.",
          explanation: "Spending shares → regressive → wider inequality; contrast with progressive income tax.",
        }),
        P.manual({
          label: "(f)", marks: 6, levels: LV(6),
          stem: "Discuss whether the government should reduce the deficit by raising VAT rather than by cutting spending on public-sector wages.",
          points: [
            "For VAT: raises a lot of revenue (VAT is the largest source); hard to avoid; collects from the informal sector; avoids cutting services already short of staff.",
            "Against VAT: regressive; raises prices (possible inflation); sales may fall; reduces demand anyway.",
            "Cutting wages: reduces spending directly; may be fairer if public pay is high; but lower demand and growth (minister's argument), staff shortages harm education and health.",
            "Other options: more corporate tax from mining; exempt basic foods from VAT.",
            "Uses the data: deficit only 2.2% of GDP, but debt rising and interest above a tenth of revenue.",
            "Justified conclusion.",
          ],
          modelAnswer: "Raising VAT would bring in a lot of revenue, since VAT is already the largest source (US$2,350 million), and it is hard to avoid, so people in the informal sector would contribute. It would also avoid cutting services that are already short of staff. However, it is regressive, hurting poor families most, it raises prices and may add to inflation, and businesses expect sales to fall. Cutting public-sector wages would reduce spending directly, but it would reduce demand and could slow growth, and staff shortages in schools and clinics would harm long-run growth and living standards. The deficit is only 2.2% of GDP, but debt interest already takes more than a tenth of revenue, so some action is justified. On balance a VAT rise is the better option if basic foods are exempted, so that the poor are protected, and if it is combined with better collection of corporate tax from mining companies.".replace(/US\$/g, "US\\$"),
          explanation: "Weigh revenue and coverage against equity and effects on demand and services; conclude.",
        }),
      ],
      explanation: `Revenue US\\$${fmt(R)} million; deficit US\\$${-bal} million (${pct(share, 1)} of GDP); average income tax rate at US\\$${fmt(y)} = ${pct(avg, 1)}.`,
      hints: ["Budget balance = revenue − spending.", "Apply each tax rate only to its own band.", "Who spends the largest share of income on goods that carry VAT?"],
    });
  }

  // ---------------- Section A (2): inflation data with a policy choice.
  {
    const yrs = ["2023", "2024", "2025", "2026"], cpi = [100, 104.0, 109.2, 120.1], gdpG = [3.5, 3.8, 4.2, 1.1], un = [7.9, 7.8, 7.5, 8.6], rate = [6, 6, 6, 6.5], fuel = [100, 102, 104, 135];
    const inf26 = pctChange(cpi[2], cpi[3]), inf25 = pctChange(cpi[1], cpi[2]), realR = rate[3] - inf26, du = un[3] - un[2];
    check("inf25", inf25, 5); check("inf26", inf26, 9.98, 0.01);
    const T = table(["", ...yrs], [["Consumer Prices Index (2023 = 100)", ...cpi.map((x) => fmt(x, 1))], ["Real GDP growth (%)", ...gdpG.map((x) => fmt(x, 1))], ["Unemployment rate (%)", ...un.map((x) => fmt(x, 1))], ["Central bank interest rate (%)", ...rate.map((x) => fmt(x, 1))], ["Index of fuel prices (2023 = 100)", ...fuel]]);
    const passage = [
      "Country N is a fictional middle-income country that imports all of its oil. For several years its economy grew steadily, inflation stayed between 4% and 5%, and the central bank kept its interest rate at 6%. The government's target is inflation of 3% to 6% a year.",
      "In 2026 the world price of oil rose sharply, and so did the price of fuel in Country N (Table 2). Transport companies raised fares, and food prices rose because farmers and food processors use diesel for tractors, irrigation pumps and delivery trucks. Electricity tariffs also rose, because some of the country's power is generated from imported oil. Trade unions in the transport and mining industries demanded pay rises of 15% to protect their members from rising prices.",
      "At the same time, consumer spending grew only slowly, several factories cut production and unemployment rose for the first time in four years. Business confidence fell, and banks reported that firms were borrowing less to invest. Retailers in the main cities said that customers were switching to cheaper brands and buying smaller quantities of meat and cooking oil.",
      "The central bank raised its interest rate slightly, to 6.5%, but inflation rose well above the target. Some economists now argue that the bank must raise its rate sharply, to perhaps 10%, to stop people expecting high inflation to continue and to strengthen the currency, which would make imported oil cheaper. Others argue that higher interest rates would push the economy into recession, and that the government should instead help firms use energy more efficiently and invest in solar power.",
    ].join("\n\n");
    const n = words(passage);
    if (n < 250 || n > 400) throw new Error(`Section A (2) passage has ${n} words`);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section A",
      concepts: ["econ.inflation.meaning-causes", "econ.inflation.measurement", "econ.inflation.effects-policies", "econ.monetary.monetary-policy", "econ.macro.aims-conflicts", "econ.macro.supply-side-policy"],
      stem: `${passage}\n\n**Table 2: Economic data for Country N**\n\n${T}`,
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "Inflation is a sustained rise in the {{blank:a}} level of {{blank:b}} in an economy.",
          blanks: [
            { id: "a", accepted: ["general"], choices: ["general", "lowest", "import"] },
            { id: "b", accepted: ["prices"], choices: ["prices", "output", "wages"] },
          ],
          wrong: [["import", "output"]],
          explanation: "Inflation: a sustained rise in the general price level.",
        }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: inf26, stem: "Using Table 2, calculate the rate of inflation in 2026. Give your answer to one decimal place.", wrong: [cpi[3] - cpi[2], cpi[3] - 100], explanation: `(${fmt(cpi[3], 1)} − ${fmt(cpi[2], 1)}) ÷ ${fmt(cpi[2], 1)} × 100 = ${pct(inf26, 1)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: realR, dp: 1, stem: "Using your answer to (b) and the central bank interest rate, calculate the approximate real interest rate in 2026, in per cent. Give a negative rate as a negative number, to one decimal place.", wrong: [-realR, rate[3] + inf26], explanation: `Real rate ≈ ${fmt(rate[3], 1)} − ${fmt(inf26, 1)} = ${fmt(realR, 1)}%.` }),
        P.num({ label: "(d)", marks: 2, kind: "plain", value: du, dp: 1, stem: "Calculate the change in the unemployment rate between 2025 and 2026, in percentage points. Give a rise as a positive number, to one decimal place.", wrong: [pctChange(un[2], un[3])], explanation: `${fmt(un[3], 1)} − ${fmt(un[2], 1)} = +${fmt(du, 1)} percentage points. (${pct(pctChange(un[2], un[3]), 1)} is the percentage change in the rate, not the change in points.)` }),
        P.manual({
          label: "(e)", marks: 6,
          stem: "Using the information, analyse whether the inflation in 2026 was demand-pull or cost-push.",
          points: [
            "Cost-push: fuel prices rose about 30% in 2026 (index 104 → 135).",
            "Fuel is an input for transport, farming, food processing and electricity, so firms' costs rose and were passed on in prices.",
            "Wage demands of 15% add to costs (risk of a wage-price spiral).",
            "Evidence against demand-pull: consumer spending grew slowly; investment and borrowing fell.",
            "Output growth fell (4.2% → 1.1%) and unemployment rose (7.5% → 8.6%), typical of cost-push inflation.",
            "Conclusion: mainly cost-push (imported) inflation.",
          ],
          modelAnswer: "The evidence points to cost-push inflation. The index of fuel prices rose from 104 to 135, about 30%, in 2026, and fuel is an input for transport, farming, food processing and electricity, so firms' costs rose and they passed them on in higher fares, food prices and tariffs. Unions' demands for 15% pay rises would add further to costs and could start a wage-price spiral. In contrast, there is little sign of excess demand: consumer spending grew only slowly and firms borrowed less to invest. Real GDP growth fell from 4.2% to 1.1% and unemployment rose from 7.5% to 8.6%, which is what happens when rising costs push up prices and reduce output, whereas demand-pull inflation usually comes with rising output and falling unemployment. The inflation was therefore mainly cost-push, caused by imported oil.",
          explanation: "Use the fuel, output, unemployment and spending evidence; conclude.",
        }),
        P.manual({
          label: "(f)", marks: 6, levels: LV(6),
          stem: "Discuss whether the central bank should raise its interest rate sharply to reduce inflation.",
          points: [
            `For: inflation (${pct(inf26, 1)}) is well above the 3-6% target; real interest rate is negative, which encourages spending and penalises saving.`,
            "For: may stop expectations and a wage-price spiral; a stronger currency makes imported oil cheaper.",
            "Against: the inflation is cost-push, so lower demand reduces output and jobs without tackling the cause; growth already 1.1%, unemployment rising (conflict between aims).",
            "Against: investment already falling; recession risk; time lags; the oil price rise may be temporary.",
            "Alternatives: supply-side measures (energy efficiency, solar power); modest rate rise; targeted help.",
            "Justified conclusion.",
          ],
          modelAnswer: `Inflation of ${pct(inf26, 1)} is well above the target of 3-6%, and with an interest rate of 6.5% the real interest rate is negative, which penalises savers. A sharp rise in interest rates could stop people expecting high inflation to continue, discourage unions from demanding 15% pay rises, and strengthen the currency, making imported oil cheaper. However, the inflation is mainly cost-push, caused by the oil price. Cutting demand would reduce inflation only by reducing output and jobs, and the economy is already weak: growth has fallen to 1.1% and unemployment has risen to 8.6%, so a sharp rise could cause a recession, a clear conflict between price stability and growth and employment. The effects would also take a year or more, by which time the oil price may have fallen. A moderate rise to stop inflation expectations rising, combined with supply-side measures such as energy efficiency and solar power, is better than a sharp rise to 10%.`,
          explanation: "Weigh inflation above target and expectations against the cost-push cause and weak economy; conclude.",
        }),
      ],
      explanation: `Inflation rose from ${pct(inf25, 1)} (2025) to ${pct(inf26, 1)} (2026) as fuel prices rose about 30%; growth fell to 1.1% and unemployment rose ${fmt(du, 1)} points: cost-push inflation. Real interest rate about ${fmt(realR, 1)}%.`,
      hints: ["Rate of inflation = change in CPI ÷ previous CPI × 100.", "Real interest rate ≈ nominal rate − inflation.", "What happened to output and unemployment?"],
    });
  }

  // ---------------- Section B (1): monetary policy.
  {
    const loan = 40000, r0 = 7, r1 = 11, extra = (loan * (r1 - r0)) / 100;
    check("extra", extra, 1600);
    const sub1 = P.num({
      label: "(i)", marks: 2, kind: "money", value: extra,
      stem: `A small manufacturing firm has a variable-rate loan of US\\$${fmt(loan)}. Its bank raises the yearly interest rate from ${r0}% to ${r1}%. Calculate the increase in the firm's yearly interest payment, in US\\$.`,
      wrong: [(loan * r1) / 100, (loan * pctChange(r0, r1)) / 100],
      explanation: `Interest rises from ${fmt((loan * r0) / 100)} to ${fmt((loan * r1) / 100)}: an increase of US\\$${fmt(extra)}. (${fmt((loan * r1) / 100)} is the new total interest.)`,
    });
    const sub2 = P.manual({
      label: "(ii)", marks: 4,
      stem: "Analyse how a rise in interest rates could affect the country's exports.",
      points: [
        "Higher interest rates attract foreign savings (hot money) into the country.",
        "Demand for the currency rises, so the exchange rate appreciates.",
        "Exports become dearer in foreign currencies, so foreign demand falls.",
        "Exporters also face higher borrowing costs, so they invest less; export volumes and jobs fall.",
      ],
      modelAnswer: "Higher interest rates make it more attractive for foreigners to save in the country, so they buy its currency and the exchange rate appreciates. The country's exports then cost more in foreign currencies, so foreign buyers purchase fewer of them. Exporting firms also face higher interest costs on their loans, so they invest less in expanding capacity. Export volumes, and jobs in export industries, are likely to fall.",
    });
    const q = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.monetary.monetary-policy", "econ.inflation.effects-policies", "econ.macro.aims-conflicts"],
      stem: "In a fictional country, rapid growth in bank lending and strong consumer spending have pushed inflation up from 4% to 9%. The central bank is considering a large rise in its interest rate. Exporters and small businesses, many of which have variable-rate loans, have warned that higher rates would harm them.",
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "Monetary policy is the use of changes in {{blank:a}}, the money supply and the {{blank:b}} to influence economic activity.",
          blanks: [
            { id: "a", accepted: ["interest rates"], choices: ["interest rates", "income tax", "government spending"] },
            { id: "b", accepted: ["exchange rate"], choices: ["exchange rate", "budget deficit", "minimum wage"] },
          ],
          wrong: [["income tax", "budget deficit"]],
          explanation: "Monetary policy: interest rates, the money supply and the exchange rate.",
        }),
        P.fib({
          label: "(b)", marks: 4,
          stem: "Explain how a rise in interest rates would reduce this inflation. Complete the explanation.",
          template: "Higher interest rates make borrowing {{blank:a}} and saving more {{blank:b}}. Households and firms {{blank:c}} their spending, so aggregate demand {{blank:d}} and demand-pull inflation slows.",
          blanks: [
            { id: "a", accepted: ["more expensive"], choices: ["more expensive", "cheaper"] },
            { id: "b", accepted: ["attractive"], choices: ["attractive", "risky"] },
            { id: "c", accepted: ["reduce"], choices: ["reduce", "increase"] },
            { id: "d", accepted: ["falls"], choices: ["falls", "rises"] },
          ],
          wrong: [["cheaper", "risky", "increase", "rises"]],
          explanation: "Dearer credit and better rewards for saving reduce spending and aggregate demand.",
        }),
        nested("(c)", 6, "Use the information above.", [sub1, sub2]),
        P.manual({
          label: "(d)", marks: 8, levels: LV(8),
          stem: "Discuss whether raising interest rates is the best way for this country to reduce inflation.",
          points: [
            ["For: the inflation is demand-pull (bank lending, consumer spending), which higher rates target directly by making credit dearer and saving more attractive.", 2],
            "For: the central bank can act quickly and independently; a stronger currency lowers import prices; signals commitment, reducing expectations.",
            "Against: time lags; variable-rate borrowers and small businesses face higher costs (e.g. US\\$1,600 a year more on a US\\$40,000 loan).",
            ["Against: appreciation harms exporters; lower investment slows growth and may raise unemployment (conflict of aims).", 2],
            "Alternatives: contractionary fiscal policy (higher taxes, lower spending) shares the burden; credit controls; supply-side policy for the long run.",
            "Justified conclusion.",
          ],
          modelAnswer: "The inflation is caused by rapid growth in bank lending and consumer spending, so it is demand-pull, and higher interest rates tackle that cause directly by making credit dearer and saving more attractive. The central bank can act quickly, and a stronger currency would make imports cheaper, further reducing inflation, while a firm response would stop people expecting more inflation. However, interest rates take a year or more to have their full effect. Small businesses with variable-rate loans would face much higher costs: on a US$40,000 loan, a rise from 7% to 11% adds US$1,600 a year. The currency would appreciate, making exports dearer, and lower investment could slow growth and raise unemployment. Tighter fiscal policy could share the burden, and supply-side policies would raise capacity in the long run. Because the inflation is clearly demand-driven, higher interest rates are the most suitable main tool, but a moderate rise combined with some fiscal tightening would reduce the damage to exporters and small firms.".replace(/US\$/g, "US\\$"),
          explanation: "Weigh effectiveness against demand-pull inflation against costs to borrowers, exporters and growth; conclude.",
        }),
      ],
      explanation: `Higher rates reduce demand-pull inflation; a 4-point rise adds US\\$${fmt(extra)} a year to interest on a US\\$${fmt(loan)} loan; appreciation hurts exports.`,
      hints: ["Monetary policy is run by the central bank.", "Think about who borrows at variable rates and who sells abroad."],
    });
    q.modelResponse.parts["(c)(i)"] = sub1.model;
    q.wrongResponses[0].parts["(c)(i)"] = sub1.wrong[0];
  }

  // ---------------- Section B (2): supply-side policy and the macroeconomic aims.
  {
    const w = 120, o0 = 4320, o1 = 4968;
    const p0 = productivity.perWorker(o0, w), p1 = productivity.perWorker(o1, w), ch = pctChange(p0, p1);
    check("p0", p0, 36); check("ch", ch, 15);
    const sub1 = P.num({
      label: "(i)", marks: 2, kind: "pct", value: ch,
      stem: `In a pilot scheme, ${w} workers at a fictional engineering firm received government-funded training. Their monthly output rose from ${fmt(o0)} to ${fmt(o1)} units. Calculate the percentage increase in output per worker. Give your answer to one decimal place.`,
      wrong: [((p1 - p0) / p1) * 100, p1 - p0],
      explanation: `Output per worker: ${fmt(o0)} ÷ ${w} = ${p0}; ${fmt(o1)} ÷ ${w} = ${fmt(p1, 1)}. Increase = (${fmt(p1, 1)} − ${p0}) ÷ ${p0} × 100 = ${pct(ch, 1)}.`,
    });
    const sub2 = P.manual({
      label: "(ii)", marks: 4,
      stem: "Analyse how education and training can reduce unemployment.",
      points: [
        "Training gives workers the skills that employers need (e.g. engineering, digital skills).",
        "This reduces the mismatch between workers' skills and vacancies: structural unemployment falls.",
        "Workers become more occupationally mobile, so they can move into growing industries.",
        "Higher productivity lowers unit costs, firms become more competitive, expand output and hire more workers.",
      ],
      modelAnswer: "Training gives unemployed and low-skilled workers the skills that employers in growing industries need, which reduces the mismatch between skills and vacancies that causes structural unemployment. Workers become more occupationally mobile, able to move from declining to expanding industries. Trained workers are also more productive, which lowers firms' costs per unit, so firms become more competitive, sell more, expand output and hire more workers.",
    });
    const q = b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 1260, calculator: true, paper: "Paper 2 Section B",
      concepts: ["econ.macro.supply-side-policy", "econ.macro.aims-conflicts", "econ.fiscal.budget-fiscal-policy"],
      stem: "A fictional country has slow economic growth, high structural unemployment and a current account deficit. Its government is choosing between two plans: a large cut in income tax to boost spending, or a programme of supply-side measures, including technical training, better roads and power supplies, and faster business registration.",
      parts: [
        P.fib({
          label: "(a)", marks: 2,
          stem: "Complete the definition.",
          template: "Supply-side policy aims to increase the {{blank:a}} capacity of the economy by improving the quantity, quality and {{blank:b}} of the factors of production.",
          blanks: [
            { id: "a", accepted: ["productive"], choices: ["productive", "spending", "borrowing"] },
            { id: "b", accepted: ["efficiency"], choices: ["efficiency", "price", "ownership"] },
          ],
          wrong: [["spending", "price"]],
          explanation: "Supply-side policy raises productive capacity.",
        }),
        P.fib({
          label: "(b)", marks: 4,
          stem: "Explain why the income tax cut might conflict with the aim of balance of payments stability. Complete the explanation.",
          template: "A cut in income tax {{blank:a}} households' disposable income. Consumer spending rises, including spending on {{blank:b}}. Imports {{blank:c}}, so the current account deficit becomes {{blank:d}}.",
          blanks: [
            { id: "a", accepted: ["raises"], choices: ["raises", "reduces"] },
            { id: "b", accepted: ["imported goods"], choices: ["imported goods", "exports", "savings"] },
            { id: "c", accepted: ["rise"], choices: ["rise", "fall"] },
            { id: "d", accepted: ["larger"], choices: ["larger", "smaller"] },
          ],
          wrong: [["reduces", "exports", "fall", "smaller"]],
          explanation: "More disposable income raises spending, part of it on imports, worsening the current account: growth conflicts with balance of payments stability.",
        }),
        nested("(c)", 6, "Use the information above.", [sub1, sub2]),
        P.manual({
          label: "(d)", marks: 8, levels: LV(8),
          stem: "Discuss whether the supply-side programme is a better choice for this country than the income tax cut.",
          points: [
            ["Supply-side for: tackles structural unemployment directly; raises productivity (pilot: +15%) and capacity, so growth without inflation.", 2],
            "Supply-side for: lower costs make exports more competitive, helping the current account rather than worsening it.",
            "Supply-side against: long time lags; costly; uncertain results; benefits depend on firms' demand for the extra output.",
            "Tax cut for: quick boost to demand; may raise incentives to work.",
            ["Tax cut against: does not cure structural unemployment; spending leaks into imports, worsening the deficit; may cause inflation; budget deficit widens.", 2],
            "Justified conclusion.",
          ],
          modelAnswer: "The supply-side programme tackles the country's main problems at their cause. Training reduces structural unemployment by giving workers the skills firms need, and the pilot scheme raised output per worker by 15%. Better roads and power and faster business registration lower costs and encourage investment, raising productive capacity, so growth can occur without inflation, and more competitive firms can export more, helping the current account. However, the programme is costly and takes years to show results, and its success depends on firms having enough demand to sell the extra output. The income tax cut would raise spending quickly and might improve incentives to work, but it would not give the unemployed the skills they lack, much of the extra spending would go on imports, worsening the current account deficit, and it would widen the budget deficit and could cause inflation. Because the unemployment is structural and the current account is in deficit, the supply-side programme is the better choice, although a small, temporary boost to demand could help while it takes effect.",
          explanation: "Compare targeting, time lags and effects on the current account and inflation; conclude.",
        }),
      ],
      explanation: `Training raised output per worker by ${pct(ch, 1)}; supply-side policy targets structural unemployment and competitiveness, while a tax cut boosts demand and imports.`,
      hints: ["Which plan tackles a skills mismatch?", "Where does part of any extra spending go?"],
    });
    q.modelResponse.parts["(c)(i)"] = sub1.model;
    q.wrongResponses[0].parts["(c)(i)"] = sub1.wrong[0];
  }
});
