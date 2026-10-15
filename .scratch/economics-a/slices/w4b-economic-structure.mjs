// W4b: economic structure and characteristics of developing and developed countries (both boards; ZIMSEC Form 5, Cambridge A Level only).
import { concept, P, chk, table, concentrationRatio, pieAngles, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w4b-kit.mjs";

concept("aecon.dev.economic-structure", { file: "dev/economic-structure", keyPrefix: "dev.economic-structure" }, (b) => {
  mc(b, [2, "RECALL"], "Gold mining and maize farming both belong to the",
    ["primary sector", "Correct: they extract or grow natural resources."],
    [["secondary sector", "That covers manufacturing and construction."],
     ["tertiary sector", "That covers services."],
     ["informal sector", "That refers to unregistered activity, not a type of output."]],
    "The primary sector includes agriculture and mining.", { daily: true });

  mc(b, [2, "RECALL"], "Which activity belongs to the tertiary sector?",
    ["Providing banking services", "Correct: services."],
    [["Growing cotton", "That is primary."],
     ["Making clothing from cotton", "That is secondary."],
     ["Mining chrome", "That is primary."]],
    "Banking, transport, retail and tourism are services.");

  mc(b, [3, "UNDERSTANDING"], "As an economy develops, the share of the primary sector in output usually",
    ["falls, as manufacturing and services grow", "Correct: structural change."],
    [["rises, while the share of services falls", "The opposite occurs."],
     ["stays constant, while the population grows", "It tends to fall."],
     ["rises towards 100% of national output", "That is not the trend."]],
    "Development typically shifts output from the primary to the secondary and tertiary sectors.", { hints: ["Which sector tends to grow fastest at high incomes?"] });

  mc(b, [3, "ANALYSIS"], "Which is a disadvantage of depending on exports of one primary commodity?",
    ["Export earnings fluctuate with world prices", "Correct: prices of primary goods are volatile."],
    [["The country cannot benefit from specialisation", "Specialisation does bring some benefits."],
     ["Imports are always cheaper", "Import prices are unrelated."],
     ["Tax revenue is always stable", "It is exposed to price swings."]],
    "Dependence leaves earnings and tax revenue exposed to price changes.", { hints: ["Think about how stable the prices of raw materials are."], daily: true });

  mc(b, [2, "UNDERSTANDING"], "The informal sector is best described as",
    ["activity by small, unregistered firms and workers outside the tax system", "Correct: unregulated activity."],
    [["all firms and workers that are owned by the government", "That is the public sector."],
     ["activity by large multinational firms that are registered abroad and sell only abroad", "That is not what informal means."],
     ["illegal activity such as drug trading only", "Most informal activity is legal."]],
    "Informal activity covers street trading, small workshops and the like.");

  mc(b, [3, "ANALYSIS"], "Processing raw materials at home before export, for example turning cotton into cloth, is likely to",
    ["increase the value added and the income kept in the country", "Correct: more of the final price is earned at home."],
    [["reduce the value of exports", "Processed goods usually earn more."],
     ["make the country more dependent on a single raw material", "Processing reduces dependence on the raw material price."],
     ["raise the share of agriculture in output", "It raises manufacturing's share."]],
    "Processing adds value and diversifies output.", { hints: ["Who captures the profit from processing?"] });

  {
    const rel = 25 / 12;
    mc(b, [4, "APPLICATION"], "In an economy the secondary sector employs 12% of workers and produces 25% of output. Compared with the national average, output per worker in the secondary sector is",
      ["about 2.1 times higher", "Correct: 25 ÷ 12 ≈ 2.08."],
      [["about 2.1 times lower", "It is higher than average."],
       ["about 13 times higher", "That subtracts the shares instead of dividing."],
       ["about 48% of the average", "That inverts the ratio."]],
      "Relative productivity = output share ÷ employment share = 25 ÷ 12 = 2.08.", { hints: ["Divide the output share by the employment share."] });
    chk(roundTo(rel, 2), 2.08);
  }

  mc(b, [3, "ANALYSIS"], "Which of the following is most likely to be a characteristic of a typical developing economy?",
    ["A large share of the labour force working in low-productivity farming", "Correct: the primary sector employs many workers with low output per head."],
    [["A small informal sector and a large manufacturing sector", "That is more typical of a developed economy."],
     ["Exports dominated by high-technology manufactures", "That is more typical of a developed economy."],
     ["High levels of saving and investment per head", "Low incomes limit saving."]],
    "Developing economies often have large primary sectors with low productivity.", { hints: ["Which sector usually employs most workers at low income levels?"] });

  {
    const rp = 18 / 55; chk(roundTo(rp, 2), 0.33);
    b.num({ d: 3, skill: "APPLICATION", kind: "elasticity", value: rp, dp: 2, hints: ["Relative productivity = output share ÷ employment share."],
      stem: "In a country the primary sector employs 55% of workers and produces 18% of output. Calculate relative productivity in the primary sector (output share ÷ employment share), to two decimal places.",
      wrong: [3.06, 37, 0.55], explanation: "18 ÷ 55 = 0.33. Primary workers produce about a third of the national average per worker." });
    const cr = concentrationRatio([38, 27, 9, 26], 2); chk(cr, 65);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: cr, unit: "%", daily: true,
      stem: "A country's exports are: tobacco 38%, gold 27%, cotton 9% and all other goods and services 26% of the total. Calculate the share of total exports taken by the two largest products, to one decimal place.",
      wrong: [74, 38, 35], explanation: "38 + 27 = 65%." });
    const fall = 0.25 * 40; chk(fall, 10);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: fall, unit: "%", hints: ["Change in total earnings = change in the product's earnings × its share."],
      stem: "A single commodity provides 40% of a country's export earnings. Its export earnings fall by 25% because of a price fall. Calculate the percentage fall in total export earnings, to one decimal place (assume other exports are unchanged).",
      wrong: [25, 15, 65], explanation: "0.25 × 40 = 10.0% of total export earnings." });
    const ang = pieAngles([35, 15, 50]); chk(ang[0], 126);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: ang[0], unit: "units", dp: 0, tol: 0.5,
      stem: "The primary sector employs 35% of workers in a country. In a pie chart of employment, calculate the angle in degrees for the primary sector.",
      wrong: [35, 63, 100], explanation: "0.35 × 360° = 126°." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false, stem: "In most developing countries the primary sector produces a larger share of output than it employs of the labour force.",
    explanation: "Typically the primary sector employs a larger share of workers than its share of output, because productivity is low." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each activity with its sector.",
    pairs: [["Growing tobacco", "Primary"], ["Building houses", "Secondary"], ["Running a taxi service", "Tertiary"], ["Selling vegetables at an unregistered market stall", "Informal sector"]],
    extraRight: ["Public sector"],
    explanation: "Sectors are defined by the type of activity; informal refers to registration and regulation." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Turning raw cotton into cloth before export increases the {{blank:a}} kept in the country. Relying on one or two exports exposes a country to {{blank:b}} in world prices.",
    blanks: [{ id: "a", accepted: ["value added"], choices: ["value added", "unemployment", "imports"] }, { id: "b", accepted: ["fluctuations"], choices: ["fluctuations", "stability", "certainty"] }],
    explanation: "Processing adds value; dependence brings exposure to price swings." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the sector of the economy that produces services such as transport, banking and education.",
    accepted: ["tertiary sector", "tertiary", "the tertiary sector", "services sector"], wrong: ["primary"],
    explanation: "The tertiary sector." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between the primary sector and the secondary sector.",
    points: ["The primary sector extracts or grows natural resources (agriculture, mining)", "The secondary sector manufactures, processes and constructs"],
    modelAnswer: "The primary sector extracts or grows natural resources, such as agriculture and mining. The secondary sector manufactures, processes and constructs.",
    explanation: "Extraction against processing and building." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think of price changes and tax revenue."],
    stem: "Explain two problems for a country that depends on exports of one or two primary commodities.",
    points: ["World prices of primary commodities fluctuate widely.", "So export earnings, tax revenue and incomes are unstable.", "Demand for primary products grows slowly as incomes rise (low income elasticity), and processing is done elsewhere.", "So the country gains little value added and growth is limited."],
    modelAnswer: "World prices of primary commodities fluctuate widely, so export earnings, tax revenue and incomes are unstable. Demand for primary products also grows slowly as world incomes rise, and if processing is done elsewhere the country gains little value added, which limits its growth.",
    explanation: "Instability and limited growth." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Compare the productivity of sectors."],
    stem: "Analyse why a shift of workers from farming to manufacturing and services is likely to raise national output per head.",
    points: ["Output per worker is lower in subsistence farming than in industry and services.", "Moving workers to higher-productivity sectors raises total output.", "Manufacturing and services use more capital and technology per worker.", "Economies of scale and specialisation raise productivity further.", "Provided jobs and skills exist, the workers' incomes rise."],
    modelAnswer: "Output per worker is lower in subsistence farming than in industry and services, so moving workers to higher-productivity sectors raises total output. Manufacturing and services use more capital and technology per worker and benefit from economies of scale and specialisation, so, provided jobs and skills exist, incomes rise and national output per head increases.",
    explanation: "Relative productivity and structural change." });

  {
    const t1 = table(["Sector", "Employment (%)", "Output (%)"], [["Primary", 55, 18], ["Secondary", 15, 27], ["Tertiary", 30, 55]]);
    const r1 = 18 / 55, r3 = 55 / 30; chk(roundTo(r1, 2), 0.33); chk(roundTo(r3, 2), 1.83);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Relative productivity = output share ÷ employment share."],
      stem: "**The structure of Mbira's economy (fictional, illustrative)**\n\n" + t1 + "\n\nMost workers in the primary sector are small-scale farmers. Many people in the tertiary sector work in informal trading.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "elasticity", value: r1, dp: 2, stem: "Calculate relative productivity in the primary sector, to two decimal places.", wrong: [3.06, 0.55, 37], explanation: "18 ÷ 55 = 0.33." }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: r3, dp: 2, stem: "Calculate relative productivity in the tertiary sector, to two decimal places.", wrong: [0.55, 25, 85], explanation: "55 ÷ 30 = 1.83." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain two reasons why output per worker in the primary sector is so low.",
          points: ["Small-scale farming uses little capital and technology per worker.", "So each worker produces little output.", "Many workers are underemployed because farming is seasonal and there are few other jobs.", "Poor infrastructure and limited access to markets and inputs restrict output."],
          modelAnswer: "Small-scale farming uses little capital and technology, so each worker produces little. Many workers are also underemployed because farming is seasonal and alternative jobs are scarce, and poor roads and limited access to inputs and markets restrict output." }),
      ],
      explanation: "Primary relative productivity 0.33; tertiary 1.83; low capital, underemployment and weak infrastructure explain low primary productivity." });
  }
  {
    const cr = 52 + 18; chk(cr, 70);
    const fall = 0.15 * 52; chk(roundTo(fall, 6), 7.8);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Concentration ratio = combined share of the largest products.", "Fall in total earnings = fall in copper earnings × copper's share."],
      stem: "**Exports of Kavala (fictional, illustrative)**\n\nCopper provides 52% of Kavala's export earnings, tobacco 18%, other metals 10% and all other exports 20%. A fall in the world price of copper of 15% cuts copper export earnings by 15% (volume unchanged). Kavala has little processing industry, its railways are old and its power supply is unreliable. The government wants to diversify the economy.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: cr, unit: "%", stem: "Calculate the share of Kavala's exports taken by its two largest products, to one decimal place.", wrong: [52, 80, 35], explanation: "52 + 18 = 70%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: roundTo(fall, 6), unit: "%", stem: "Calculate the percentage fall in total export earnings caused by the fall in the copper price, to one decimal place.", wrong: [15, 52, 6.0], explanation: "0.15 × 52 = 7.8%." }),
        P.manual({ label: "(c)", marks: 2, stem: "State two benefits to Kavala of processing some of its copper at home.",
          points: ["It adds value and raises export earnings per tonne of copper.", "It creates jobs in manufacturing and reduces dependence on the price of raw copper."],
          modelAnswer: "Processing adds value, so Kavala earns more from each tonne of copper, and it creates jobs in manufacturing and reduces dependence on the price of raw copper." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess the obstacles to Kavala diversifying its economy.",
          points: ["Poor railways and power raise costs and discourage manufacturing.", "Copper earns most of the country's foreign exchange, which is needed to import machinery.", "Lack of skills and capital; small domestic market.", "Competition from established producers abroad.", "Government policy (infrastructure, training, credit) can help but takes time and money.", "Judgement."],
          modelAnswer: "Diversification is hindered by old railways and unreliable power, which raise costs and discourage manufacturing, and by a lack of skills and capital. The domestic market is small and new producers face competition from established firms abroad. Copper earns most of the country's foreign exchange, which is needed to import machinery, so a fall in its price also reduces the funds available. The government can help by investing in infrastructure and training and providing credit, but this takes time and money. Overall diversification is difficult in the short run, but the exposure to the copper price makes it worth pursuing." }),
      ],
      explanation: "Two-product share 70%; total earnings fall 7.8%; processing adds value; obstacles include infrastructure, skills and capital." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider specialisation against risk, and what other policies are needed."],
    stem: "Assess whether a developing country should concentrate on exporting the primary products in which it has a comparative advantage.",
    points: ["Specialisation uses the country's resources efficiently and earns foreign exchange.", "Existing industries and skills make it quickest to expand.", "Prices of primary commodities are volatile, making incomes unstable.", "Demand grows slowly as incomes rise, and value added is low.", "Processing and manufacturing raise value added and employment.", "Diversification takes time, capital and skills.", "A mix: use primary exports to finance diversification.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Concentrating on primary products uses the country's resources efficiently and earns foreign exchange, and existing skills and industries make it the quickest source of growth. However, primary commodity prices are volatile, making export earnings and tax revenue unstable, demand grows slowly as world incomes rise, and little value is added at home. Processing and manufacturing would raise value added and employment, but diversification takes time, capital and skills. A sensible approach is to continue to export the primary products that earn foreign exchange while using the proceeds to build processing and other industries, rather than to rely on them permanently.",
    explanation: "Weigh comparative advantage and speed against volatility, slow demand growth and low value added." });

  b.card("DEFINITION", "Define the **primary sector**.", "The sector that grows or extracts natural resources: agriculture, forestry, fishing and mining.");
  b.card("DEFINITION", "Define the **informal sector**.", "Small, unregistered or unregulated activity, mostly outside the tax system.");
  b.card("FORMULA", "Relative productivity of a sector?", "Output share ÷ employment share.");
  b.card("CONCEPT", "Typical change in structure as an economy develops?", "The primary sector's share falls; manufacturing and then services grow.");
  b.card("CONCEPT", "Why is dependence on a few primary exports a risk?", "Volatile prices make export earnings and tax revenue unstable, and demand grows slowly.");
  b.card("CONCEPT", "Why does processing raw materials at home help?", "It adds value, creates jobs and reduces exposure to raw commodity prices.");
  b.card("CONCEPT", "Name three typical characteristics of a developing economy.", "Large primary sector, gaps in infrastructure, large informal sector (also low saving and investment).");
  b.card("CONCEPT", "Why should 'developing country' be used carefully?", "Countries differ widely in income, structure and growth, so claims should be backed by specific characteristics.");
  b.card("CONCEPT", "Concentration ratio for exports?", "The combined share of total exports taken by the largest products.");
});
