// W3a: the circular flow of income (both boards; ZIMSEC Form 5, Cambridge AS Level).
import { concept, P, chk, table, fmt } from "../lib.mjs";
import { mc, LV5, LV8 } from "../tables/w3a-kit.mjs";

concept("aecon.macro.circular-flow", { file: "macro/circular-flow", keyPrefix: "macro.circular-flow" }, (b) => {
  mc(b, [1, "RECALL"], "Which of the following is an injection into the circular flow of income?",
    ["Exports", "Correct: foreigners' spending on the country's goods adds to the flow."],
    [["Imports", "Imports are a leakage."], ["Saving", "Saving is a leakage."], ["Taxation", "Taxes are a leakage."]],
    "The injections are investment, government spending and exports.", { daily: true });

  mc(b, [1, "RECALL"], "Which of the following is a leakage (withdrawal) from the circular flow?",
    ["Spending on imports", "Correct: money paid to foreign producers leaves the domestic flow."],
    [["Government spending on schools", "Government spending is an injection."], ["Investment by firms in machinery", "Investment is an injection."], ["Spending by tourists on hotels", "That is export income, an injection."]],
    "The leakages are saving, taxes and imports.");

  mc(b, [2, "UNDERSTANDING"], "In a three-sector closed economy (households, firms and government) with a financial sector, equilibrium national income occurs where",
    ["S + T = I + G", "Correct: leakages equal injections."],
    [["S = G", "Saving need not equal government spending; the whole of leakages and injections must balance."], ["I = T", "Investment need not equal taxes."], ["C = I + G", "Equilibrium compares injections and leakages, not consumption."]],
    "Leakages (S + T) equal injections (I + G) at equilibrium.");

  mc(b, [2, "UNDERSTANDING"], "If planned injections are greater than planned leakages, national income will",
    ["rise until leakages equal injections", "Correct: expenditure exceeds the leakages, so firms expand output."],
    [["fall until leakages equal injections", "That would happen if leakages exceeded injections."], ["stay the same, since the flow is in equilibrium", "Equilibrium requires J = W."], ["become zero because injections are too large", "Income does not fall to zero because of larger injections."]],
    "When J > W, spending exceeds the output being withdrawn, so income expands towards a new equilibrium.");

  mc(b, [3, "APPLICATION"], "In an economy, saving is US\\$650 million, taxes US\\$1,100 million and imports US\\$450 million. Investment is US\\$800 million, government spending US\\$1,000 million and exports US\\$520 million. National income will",
    ["rise, as injections of US\\$2,320 million exceed leakages of US\\$2,200 million", "Correct: J > W."],
    [["fall, because leakages exceed injections by US\\$120 million in total", "Injections are the larger total."], ["stay the same, because the two totals are quite close to each other", "Equilibrium requires equality, not closeness."], ["fall, because taxes are the largest single leakage in the economy", "The comparison of totals decides, not the largest item."]],
    "W = 650 + 1,100 + 450 = 2,200; J = 800 + 1,000 + 520 = 2,320. J > W so income rises.", { hints: ["Add the leakages and the injections separately."], calculator: true });

  mc(b, [3, "ANALYSIS"], "A fall in exports, with other flows unchanged, is likely to cause national income to",
    ["fall, because injections are reduced", "Correct: lower exports reduce injections below leakages."],
    [["rise, because imports increase", "A fall in exports does not raise imports."], ["stay unchanged, because exports are paid by foreigners", "Exports are an injection; a fall reduces the flow."], ["rise, because leakages fall", "Leakages do not fall when exports fall."]],
    "Exports are an injection, so when they fall J < W and national income contracts.", { hints: ["Is J now larger or smaller than W?"] });

  mc(b, [3, "UNDERSTANDING"], "Why is saving described as a leakage from the circular flow?",
    ["It is income not spent on domestic output", "Correct: it reduces the flow of spending."],
    [["It is lost forever and cannot be used again", "Banks lend savings to firms for investment."], ["It increases the demand for imports from abroad", "Saving reduces consumption, not imports directly."], ["It is paid by firms to the government as tax", "That describes taxation."]],
    "Saving is income not spent on domestically produced goods, so it withdraws from the flow, although banks may lend it for investment.", { hints: ["Think about what happens to income that is not spent."] });

  mc(b, [4, "EVALUATION"], "Which is a limitation of the simple circular flow model?",
    ["It does not explain why injections and leakages change", "Correct: it describes flows but not the causes of changes."],
    [["It shows that income, output and expenditure are all different amounts", "In the model these are equal."], ["It allows only households to take any economic decisions", "Firms, the government and foreign sector also act."], ["It requires an economy to have no trade with other countries", "The open-economy version includes trade."]],
    "The model is descriptive; it does not give the causes of changes in spending, saving or investment, nor prices.", { hints: ["Which option states something the model leaves out?"] });

  {
    const w = { s: 1350, t: 2100, m: 1050 }, j = { i: 1250, g: 1900, x: 1000 };
    const W = w.s + w.t + w.m, J = j.i + j.g + j.x;
    chk(W, 4500); chk(J, 4150);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: W, unit: "US$ million", calculator: true, daily: true,
      stem: "In an open economy (US\\$ million) saving is 1,350, taxes are 2,100 and imports are 1,050. Calculate total leakages, in US\\$ million.",
      wrong: [3450, 3150, 2400], explanation: "W = S + T + M = 1,350 + 2,100 + 1,050 = 4,500." });
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: J, unit: "US$ million", calculator: true,
      stem: "In the same economy investment is 1,250, government spending is 1,900 and exports are 1,000 (US\\$ million). Calculate total injections, in US\\$ million.",
      wrong: [4500, 3150, 2250], explanation: "J = I + G + X = 1,250 + 1,900 + 1,000 = 4,150." });
    b.calc({ d: 3, skill: "ANALYSIS", kind: "plain", value: J - W, unit: "US$ million", calculator: true, hints: ["Compare J with W; a negative number means injections are smaller."],
      stem: "Using the same figures, calculate injections minus leakages (J − W), in US\\$ million. Give a negative number if leakages are larger.",
      wrong: [350, 4150, 8650], explanation: "1. J = 4,150 and W = 4,500.\n2. J − W = 4,150 − 4,500 = −350.\n3. Leakages exceed injections, so national income will fall towards a lower equilibrium." });
  }
  b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: 9200 - 7900, unit: "US$ million", calculator: true, hints: ["In a closed two-sector economy, income is either consumed or saved."],
    stem: "In a closed economy with only households and firms, national income is US\\$9,200 million and consumption is US\\$7,900 million. Calculate saving, in US\\$ million.",
    wrong: [17100, 7900, 9200], explanation: "S = Y − C = 9,200 − 7,900 = 1,300. At equilibrium planned investment is also 1,300." });
  b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: 1450 - 1300, unit: "US$ million", calculator: true, hints: ["In the two-sector model equilibrium needs S = I."],
    stem: "In the same two-sector economy firms plan to invest US\\$1,450 million while planned saving is US\\$1,300 million. By how much do planned injections exceed planned leakages, in US\\$ million?",
    wrong: [1300, 2750, 1450], explanation: "J − W = I − S = 1,450 − 1,300 = 150. Income will rise." });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Government spending is a leakage from the circular flow of income.", answer: false,
    explanation: "False. Government spending is an injection; taxation is the leakage." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["What happens to unsold goods?"], stem: "If planned saving exceeds planned investment in a two-sector economy, national income tends to fall.", answer: true,
    explanation: "True. Leakages exceed injections, so spending is less than output, stocks build up and firms cut output and income." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each flow with its type.",
    pairs: [["Investment", "Injection"], ["Taxes", "Leakage"], ["Government spending", "Injection"], ["Imports", "Leakage"]],
    explanation: "Injections are I, G, X; leakages are S, T, M." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "National income is in equilibrium when {{blank:a}} equal {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["injections"], choices: ["injections", "leakages", "profits"] }, { id: "b", accepted: ["leakages"], choices: ["leakages", "injections", "wages"] }],
    explanation: "Equilibrium requires J = W." });

  b.short({ d: 2, skill: "RECALL", stem: "State the three leakages (withdrawals) from the circular flow of income in an open economy with a government.",
    accepted: ["saving, taxes and imports", "saving taxation and imports", "savings, taxes, imports", "saving, taxation, imports", "taxes, saving and imports", "imports, saving and taxes"],
    keywords: { all: ["saving", "import"], any: ["tax"], minAny: 1 }, model: "saving, taxes and imports", wrong: ["investment, government spending and exports"],
    explanation: "Saving, taxes and imports." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between an injection and a leakage.",
    points: ["An injection is an addition to the circular flow of income from outside the household–firm spending loop (investment, government spending, exports).", "A leakage is income taken out of the flow that is not spent on domestically produced goods (saving, taxes, imports)."],
    modelAnswer: "An injection is an addition to the circular flow, such as investment, government spending and exports. A leakage is income withdrawn from the flow and not spent on domestic output, such as saving, taxes and imports.",
    explanation: "One mark for each." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Compare injections with leakages, then trace what firms do."],
    stem: "Explain what happens to national income if planned leakages exceed planned injections.",
    points: ["Spending on domestic output is less than the value of output produced.", "Firms find that some output is unsold and stocks build up.", "Firms cut output and employment.", "National income falls until leakages equal injections at a new, lower equilibrium."],
    modelAnswer: "If planned leakages exceed injections, spending on domestic output is less than the value of the output produced. Firms find that some goods are unsold and stocks build up, so they cut output and employment. National income falls until leakages equal injections at a new, lower equilibrium.",
    explanation: "Spending below output, unsold stock, output cut, new equilibrium." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Trace the effect of a rise in government spending around the flow."],
    stem: "Analyse how an increase in government spending on roads, financed by borrowing, would affect national income in the circular flow.",
    points: ["Government spending is an injection, so injections rise above leakages.", "Construction firms receive more revenue and hire more workers (higher factor incomes).", "Households spend part of the extra income, creating further rounds of spending.", "Part of the extra income leaks into saving, taxes and imports, so the effect gradually dies away.", "National income rises until leakages again equal the higher injections."],
    modelAnswer: "Government spending is an injection, so injections rise above leakages. Construction firms receive more revenue and hire more workers, so factor incomes rise. Households spend part of the extra income, creating further rounds of spending. Part of the extra income leaks into saving, taxes and imports, so each round is smaller. National income rises until leakages again equal the higher level of injections.",
    explanation: "Injection up, incomes up, further spending, leakages, new equilibrium." });

  {
    const t1 = table(["Flow", "US\\$ million"], [["Saving (S)", 1600], ["Taxes (T)", 2400], ["Imports (M)", 1300], ["Investment (I)", 1900], ["Government spending (G)", 2500], ["Exports (X)", 1500]]);
    const W = 1600 + 2400 + 1300, J = 1900 + 2500 + 1500;
    chk(W, 5300); chk(J, 5900);
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Add the leakages and the injections separately.", "J − W shows the direction of change in income."],
      stem: `**Planned flows in a fictional open economy (illustrative data)**\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: W, unit: "US$ million", stem: "Calculate total leakages, in US\\$ million.", wrong: [5900, 4000, 2600], explanation: "S + T + M = 1,600 + 2,400 + 1,300 = 5,300." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: J, unit: "US$ million", stem: "Calculate total injections, in US\\$ million.", wrong: [5300, 4400, 4600], explanation: "I + G + X = 1,900 + 2,500 + 1,500 = 5,900." }),
        P.num({ label: "(c)", marks: 1, kind: "plain", value: J - W, unit: "US$ million", stem: "By how much do injections exceed leakages, in US\\$ million?", wrong: [5300, 600 * 2, 100], explanation: "5,900 − 5,300 = 600." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain what will happen to national income in this economy and why.",
          points: ["Injections (5,900) exceed leakages (5,300), so the economy is not in equilibrium.", "Spending on domestic output exceeds the leakages, so firms expand output and incomes.", "National income will rise until leakages have risen enough to equal injections."],
          modelAnswer: "Injections of US\\$5,900 million exceed leakages of US\\$5,300 million, so the economy is not in equilibrium. Spending on domestic output is greater than the leakages, so firms expand output and incomes, and national income will rise until leakages have risen enough to equal injections." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain one reason why leakages rise as national income rises.",
          points: ["As income rises households save more and pay more tax (as income taxes rise with income).", "Higher incomes also increase spending on imports."],
          modelAnswer: "As national income rises households save more and pay more tax, and they also spend more on imports, so all the leakages increase." }),
      ],
      explanation: "W 5,300; J 5,900; J − W 600; income rises until W = J." });
  }
  {
    const t2 = table(["Flow", "Before (US\\$ million)", "After (US\\$ million)"], [["Saving (S)", 1150, 1150], ["Taxes (T)", 1250, 1250], ["Imports (M)", 850, 850], ["Investment (I)", 950, 950], ["Government spending (G)", 1550, 1550], ["Exports (X)", 750, 525]]);
    const Wb = 1150 + 1250 + 850, Jb = 950 + 1550 + 750, Ja = 950 + 1550 + 525;
    chk(Wb, 3250); chk(Jb, 3250); chk(Ja, 3025); chk(Jb - Ja, 225); chk((525 - 750) / 750 * 100, -30, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Check that J = W before the change.", "Then see what the fall in exports does to J."],
      stem: `**A fall in exports (illustrative data)**\n\nA fictional economy relies on mineral exports. A fall in world demand reduces its exports.\n\n${t2}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: Jb, unit: "US$ million", stem: "Show that the economy was in equilibrium before the change by calculating total injections, in US\\$ million.", wrong: [3100, 3025, 4000], explanation: "J = 950 + 1,550 + 750 = 3,250, which equals leakages 1,150 + 1,250 + 850 = 3,250." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: Jb - Ja, unit: "US$ million", stem: "Calculate the fall in injections after the change, in US\\$ million.", wrong: [750, 525, 3025], explanation: "Exports fall from 750 to 525, a fall of 225; so J falls from 3,250 to 3,025." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: (525 - 750) / 750 * 100, dp: 1, stem: "Calculate the percentage change in exports (a negative number for a fall), to one decimal place.", wrong: [30, -42.9, -225], explanation: "(525 − 750) ÷ 750 × 100 = −30.0%." }),
        P.manual({ label: "(d)", marks: 4, stem: "Analyse the likely effect of the fall in exports on national income and employment.",
          points: ["Exports are an injection, so J (3,025) is now below leakages W (3,250).", "Spending on domestic output falls; firms (especially in the export sector) cut output.", "Employment falls and incomes fall, which reduces spending in other sectors.", "National income falls until leakages (saving, taxes, imports) have fallen enough to equal the new injections."],
          modelAnswer: "Exports are an injection, so injections of 3,025 are now below leakages of 3,250. Spending on domestic output falls and firms, especially in the export sector, cut output. Employment and incomes fall, which reduces spending in other sectors. National income falls until leakages have fallen enough to equal the new, lower level of injections." }),
      ],
      explanation: "J before 3,250; fall 225; exports −30.0%; income and employment fall until W = J." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider how trade changes the injections and leakages.", "Reach a judgement."],
    stem: "Assess the importance of the international sector for the level of national income in a small open economy.",
    points: ["Exports are an injection, so changes in foreign demand change income.", "Imports are a leakage, so a high import share reduces the effect of any injection on domestic income.", "A small economy with a large trade share is exposed to external shocks (world prices, demand).", "Export earnings can also fund imports of capital goods that raise future income.", "Trade lets the economy specialise, which increases output and income.", "Other factors (government spending, investment, saving) also affect income.", "The importance depends on the share of trade in national income and the diversity of exports.", "A justified conclusion."],
    levels: LV8,
    modelAnswer: "In a small open economy exports are a large injection, so changes in foreign demand and world prices can change national income substantially, and a high share of imports is a large leakage which reduces the effect of any injection on domestic income. The economy is therefore exposed to external shocks, especially if it depends on one or two exports. However, trade also lets the economy specialise, and export earnings pay for imports of machinery and fuel that raise future income. Domestic investment, government spending and saving also matter. Overall the international sector is very important in a small economy with a large trade share, though its effect depends on how diversified its exports are and on domestic policy.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh the exposure to external shocks against the gains from trade." });

  b.card("DEFINITION", "What is the **circular flow of income**?", "A model showing how money, goods, services and factors move between households, firms, the government, the financial sector and the rest of the world.");
  b.card("CONCEPT", "Name the three injections.", "Investment (I), government spending (G) and exports (X).");
  b.card("CONCEPT", "Name the three leakages (withdrawals).", "Saving (S), taxes (T) and imports (M).");
  b.card("FORMULA", "What is the condition for equilibrium national income?", "Injections equal leakages: I + G + X = S + T + M.");
  b.card("CONCEPT", "What happens if injections exceed leakages?", "Spending exceeds output, firms expand and national income rises until leakages equal injections.");
  b.card("CONCEPT", "What happens if leakages exceed injections?", "Spending falls short of output, stocks build up, firms cut output and national income falls.");
  b.card("CONCEPT", "Why is saving a leakage?", "It is income not spent on domestic output, although banks lend it for investment.");
  b.card("CONCEPT", "Closed versus open economy?", "A closed economy has no foreign trade; an open one has exports (injection) and imports (leakage).");
  b.card("CONCEPT", "Give two limitations of the circular flow model.", "It does not explain why injections and leakages change, and it ignores prices and time lags.");
});
