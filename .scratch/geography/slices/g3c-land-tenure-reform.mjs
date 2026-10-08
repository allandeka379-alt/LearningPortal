// Slice G3c: land tenure and land reform in Zimbabwe (ZIMSEC 7.9.4). Neutral, factual wording.
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.agriculture.land-tenure-reform", { file: "agriculture/land-tenure-reform", keyPrefix: "agriculture.land-tenure-reform" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Under which tenure system does the owner hold a **title deed** and may sell the land?",
    options: [
      ["Freehold", "Correct: freehold gives permanent ownership with a title deed."],
      ["Communal tenure", "Communal households have use rights but no title deed."],
      ["Leasehold", "A lease gives use for a fixed period; the land cannot be freely sold."],
      ["State land", "State land is owned and managed by the government."],
    ],
    answer: "A",
    explanation: "Freehold land can be sold, inherited and mortgaged.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who allocates land to households in Zimbabwe's **communal areas**?",
    options: [
      ["Traditional leaders and Rural District Councils", "Correct: land is state-owned and allocated locally for use."],
      ["Private banks", "Banks do not allocate communal land."],
      ["Commercial estate companies", "Estates do not control communal land."],
      ["Families buy plots on the open market", "Communal land cannot be bought or sold."],
    ],
    answer: "A",
    explanation: "Communal land belongs to the state and households receive the right to use it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is **land fragmentation**?",
    options: [
      ["Division of a holding into many small, scattered plots", "Correct: often caused by inheritance as land is shared among children."],
      ["Joining scattered plots into one compact farm", "That is consolidation."],
      ["Removal of topsoil by wind and water", "That is soil erosion."],
      ["Transfer of land from the state to private owners", "That is privatisation, not fragmentation."],
    ],
    answer: "A",
    explanation: "Fragmentation makes farming less efficient; consolidation is the remedy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **disadvantage** of communal tenure for a farmer who wants to buy a tractor?",
    options: [
      ["The land cannot be used as collateral for a bank loan", "Correct: without a title deed, the land cannot secure a loan."],
      ["The farmer must pay a high price to buy the land", "Communal land is allocated, not bought."],
      ["The lease will expire after 99 years", "Communal land is not leased."],
      ["The state may sell the land at any time", "Communal land is held by the state for community use; this is not the main problem."],
    ],
    answer: "A",
    explanation: "Lack of title limits access to credit, which slows investment in machinery.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Under the Fast Track Land Reform Programme, what were **A2** farms?",
    options: [
      ["Commercial farms for people with capital or skills", "Correct: A2 farms are small, medium and large-scale commercial units on leases."],
      ["Small plots for families from crowded communal areas", "That describes the A1 model."],
      ["National parks and state forests", "These are state land, not resettlement farms."],
      ["Urban plots for market gardening", "Urban agriculture is not part of the A1/A2 models."],
    ],
    answer: "A",
    explanation: "A1 = small-scale (villagised or self-contained); A2 = commercial.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the **willing-buyer, willing-seller** approach of the 1980s mean?",
    options: [
      ["The state could buy land only from owners who chose to sell", "Correct: purchases were voluntary, at market prices."],
      ["Most commercial farms were acquired compulsorily", "Large-scale compulsory acquisition describes the fast-track phase from 2000."],
      ["Communal farmers sold their land to the state", "Communal land cannot be sold."],
      ["Farmers had to sell land to foreign buyers", "The state was the buyer for resettlement."],
    ],
    answer: "A",
    explanation: "Voluntary purchase at market prices made phase 1 slow and costly.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did resettlement under the willing-buyer, willing-seller approach proceed **slowly**?",
    options: [
      ["Land was costly and much land offered was in drier regions", "Correct: limited funds, high prices and less suitable land slowed progress."],
      ["Few people wanted more land", "There was strong demand for land."],
      ["All land was already held under communal tenure", "Most high-potential land was in large commercial farms."],
      ["The law forced every owner to sell immediately", "The approach depended on owners choosing to sell."],
    ],
    answer: "A",
    hints: ["Think about who decided which land was sold, and at what price."],
    explanation: "The voluntary market approach depended on funds and on what owners offered.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A government wants to help new resettled farmers borrow money for inputs. Which measure would do most to help?",
    options: [
      ["Issuing secure, bankable leases or permits", "Correct: secure tenure documents that banks accept can be used as collateral."],
      ["Reducing extension services in resettled areas", "This removes support rather than helping access to credit."],
      ["Dividing each farm into many smaller plots", "This increases fragmentation and lowers viability."],
      ["Banning the use of fertiliser on resettled land", "This would lower yields and repayment ability."],
    ],
    answer: "A",
    hints: ["What do banks require before lending?"],
    explanation: "Tenure security and bankable documents are widely seen as key to credit for new farmers.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "National parks and state forests are examples of state land.",
    answer: true,
    explanation: "True. State land is owned and managed by the government for public purposes.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A1 farms are large commercial farms for people with significant capital.",
    answer: false,
    explanation: "False. A1 farms are small-scale plots for landless people and families from congested communal areas; A2 farms are the commercial model.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each tenure system with its description.",
    pairs: [
      ["Freehold", "Permanent ownership with a title deed"],
      ["Leasehold", "Use of land for a fixed period under a lease"],
      ["Communal tenure", "Use rights allocated by traditional leaders and councils"],
      ["State land", "Land owned and managed by government, e.g. national parks"],
    ],
    explanation: "Tenure systems differ in security, length of tenure and the right to sell.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Land reform in Zimbabwe began with the {{blank:a}} approach in 1980. From 2000 the {{blank:b}} Land Reform Programme allocated land under the A1 and {{blank:c}} models.",
    blanks: [
      { id: "a", accepted: ["willing-buyer, willing-seller"], choices: ["willing-buyer, willing-seller", "fast-track", "villagisation", "freehold"] },
      { id: "b", accepted: ["Fast Track"], choices: ["Fast Track", "Green Revolution", "Native Reserves", "Lancaster House"] },
      { id: "c", accepted: ["A2"], choices: ["A2", "B1", "C3", "Z1"] },
    ],
    explanation: "Phase 1 (from 1980): willing-buyer, willing-seller. Phase 2 (from 2000): fast-track, A1 and A2.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "ha",
    stem: "A household's 8 ha of land is divided equally among 4 children. Each child's share is later divided equally between 2 grandchildren (fictional figures). How many hectares does each grandchild receive?",
    value: 1,
    wrong: [2, 4, 0.5],
    explanation: "8 ÷ 4 = 2 ha; 2 ÷ 2 = 1 ha.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    stem: "In a fictional district, 120,000 ha of farmland was held by 60 large farms before resettlement. Afterwards the same land was held by 30 A2 farms of 1,500 ha each and the rest by A1 plots of 6 ha each. What percentage of the land is held by **A1** farmers?",
    value: 62.5, tol: 0.05,
    wrong: [37.5, 75000],
    hints: ["Find the land in A2 farms first.", "The remainder is A1; express it as a percentage of 120,000 ha."],
    workedSolution: "1. A2 land = 30 × 1,500 = 45,000 ha.\n2. A1 land = 120,000 − 45,000 = 75,000 ha.\n3. 75,000 ÷ 120,000 × 100 = 62.5%.",
    explanation: "A1 farmers hold 75,000 of the 120,000 ha, which is 62.5%.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Compare **freehold** and **communal** tenure, giving **two** differences.",
    points: [
      "Freehold: the owner holds a title deed and owns the land permanently (1).",
      "Communal: households have use rights only; the land belongs to the state and is allocated by traditional leaders/RDCs (1).",
      "Freehold land can be sold, inherited or mortgaged as collateral (1).",
      "Communal land cannot be sold or used as collateral; grazing is shared (1).",
    ],
    modelAnswer: "A freehold owner holds a title deed and owns the land permanently, while communal households only have the right to use land that belongs to the state and is allocated by traditional leaders. Freehold land can be sold or mortgaged to borrow money, but communal land cannot be sold or used as collateral.",
    explanation: "A comparison needs both sides of each difference.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think about history, crowding and production."],
    stem: "Explain **three** reasons for land reform in Zimbabwe.",
    points: [
      "Unequal distribution inherited from the colonial period: most high-potential land in Regions I and II was held by a few large farms (e.g. under the Land Apportionment Act of 1930).",
      "Overcrowding and land degradation in communal areas, often in drier regions with poorer soils.",
      "Land hunger / social justice and political demands / aim to raise production and incomes for more households.",
    ],
    modelAnswer: "Colonial laws had left much of the best-watered land in a small number of large farms, while most rural people lived in crowded communal areas on poorer land. Overcrowding caused overgrazing and erosion, and many families had little or no land, so reform aimed to share land more widely and raise production.",
    explanation: "Give reasons with a brief explanation each.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    hints: ["Use the table values in your answers."],
    stem: "Table 1 shows land use on a fictional former commercial farm before and after resettlement (fictional data).\n\n| | Before | After |\n|---|---|---|\n| Number of households farming | 1 owner (plus 40 worker families) | 120 A1 households |\n| Area cropped (ha) | 600 | 720 |\n| Area irrigated (ha) | 200 | 40 |\n| Main crops | Wheat, tobacco, soya | Maize, tobacco, groundnuts |",
    parts: [
      P.num({ label: "(a)", stem: "If the 720 ha is shared equally, how many hectares does each A1 household crop?", value: 6, wrong: [8640, 0.17], explanation: "720 ÷ 120 = 6 ha." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage fall in the irrigated area.", value: 80, tol: 0.05, wrong: [20, 160], explanation: "Fall = 200 − 40 = 160 ha; 160 ÷ 200 × 100 = 80%." }),
      P.mcq({
        label: "(c)", stem: "Which change does the table show?",
        options: [
          ["Many more households farm the land, but less is irrigated", "Correct: 120 households instead of one owner; irrigation fell from 200 ha to 40 ha."],
          ["Fewer households farm the land than before", "120 households now farm it."],
          ["The cropped area fell after resettlement", "It rose from 600 to 720 ha."],
          ["Wheat became the main crop after resettlement", "Wheat no longer appears in the main crops."],
        ],
        answer: "A", explanation: "Access to land widened, but irrigated (winter wheat) production fell.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** reasons why the irrigated area fell.",
        points: ["Irrigation equipment (pumps, pipes, pivots) was costly to run or repair, or deteriorated / was removed.", "New farmers lacked capital, electricity, skills or organisation to share one irrigation system."],
        modelAnswer: "The pumps and pipes needed money and electricity that small farmers lacked, and one large system was hard for 120 households to manage together.",
        explanation: "Capital, power and management of shared infrastructure are common challenges.",
      }),
    ],
    explanation: "Use data to describe outcomes of resettlement on one farm.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", secs: 480,
    hints: ["Think about time, efficiency and planning."],
    stem: "A communal-area household farms five plots: 0.4 ha near the homestead, 0.6 ha 2 km away, 0.3 ha by the river, 0.5 ha 3 km away and 0.2 ha on a hillside (fictional data).",
    parts: [
      P.num({ label: "(a)", unit: "ha", stem: "Calculate the total area of the household's plots.", value: 2, tol: 0.005, wrong: [0.4, 5], explanation: "0.4 + 0.6 + 0.3 + 0.5 + 0.2 = 2.0 ha." }),
      P.short({ label: "(b)", stem: "Name the process that has produced this pattern of small, scattered plots.", accepted: ["fragmentation", "land fragmentation"], wrong: ["consolidation"], explanation: "Division into small scattered plots is fragmentation." }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain **three** problems the household faces because its land is scattered.",
        points: ["Time and energy are wasted walking or moving oxen between plots.", "Small plots are hard to plough, mechanise or irrigate, so yields stay low.", "Distant plots are hard to guard against livestock, theft or wild animals / hard to plan rotations and conservation works."],
        modelAnswer: "Family members waste hours walking between plots 2 to 3 km apart. Tiny plots are hard to plough with oxen or irrigate, and distant fields are easily damaged by straying cattle.",
        explanation: "Fragmentation reduces efficiency; consolidation is one remedy.",
      }),
    ],
    explanation: "Calculate and explain the effects of fragmentation.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "Evaluate the outcomes of land reform in Zimbabwe since 2000.",
    hints: ["Give evidence for positive and negative outcomes.", "Reach a balanced, evidence-based conclusion; avoid one-sided or political language."],
    points: [
      "Many more households gained access to land, especially in Regions II and III, under A1 and A2 models.",
      "Pressure on some congested communal areas eased; land became more widely distributed.",
      "Smallholder production expanded, e.g. tobacco output recovered with small-scale growers producing much of the crop.",
      "Commercial output of some products fell, e.g. wheat, beef exports and horticultural exports in the early 2000s; some irrigation infrastructure deteriorated.",
      "Challenges: tenure security and access to credit, shortages of inputs, equipment and skills, boundary disputes.",
      "Loss of jobs for many former farm workers; compensation issues (2020 agreement on compensation for improvements).",
      "Judgement: outcomes are mixed and vary by area and farmer; support (inputs, credit, secure tenure) shapes success.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Land reform from 2000 greatly widened access to land. Thousands of households received A1 plots or A2 farms, many in the high-potential Regions II and III, and some pressure on congested communal areas eased. Smallholder farming expanded, and tobacco output, after falling, recovered with small-scale growers producing much of the crop. However, there were also losses. Commercial production of wheat and exports of beef and horticultural produce fell in the early 2000s, and some irrigation systems deteriorated. Many new farmers lacked inputs, machinery and credit, partly because permits and leases were not easily used as collateral, and there were boundary disputes. Many former farm workers lost their jobs, and compensation for former owners was addressed in an agreement in 2020. The outcomes are therefore mixed: land is more widely shared, but productivity depends on tenure security, finance and support for the new farmers.",
    explanation: "An evaluation weighs evidence on both sides and concludes; keep the language neutral.",
  });

  b.card("DEFINITION", "**Land tenure**", "The system by which land is owned, held or used, and on what terms.", undefined);
  b.card("VOCABULARY", "**Freehold**", "Permanent ownership with a title deed; land can be sold, inherited or mortgaged.", undefined);
  b.card("VOCABULARY", "**Leasehold**", "Use of land for a fixed period under a lease, e.g. a 99-year lease.", undefined);
  b.card("VOCABULARY", "**Communal tenure**", "State land allocated for household use by traditional leaders and councils; no title deed.", undefined);
  b.card("DEFINITION", "**Land fragmentation**", "Division of a holding into many small, scattered plots.", "Consolidation joins them.");
  b.card("CONCEPT", "Reasons for land reform", "Unequal colonial land distribution, overcrowding in communal areas, land hunger, raising production.", undefined);
  b.card("FACT", "Phase 1 of land reform", "From 1980: willing-buyer, willing-seller at market prices; slow and costly.", undefined);
  b.card("FACT", "Phase 2 of land reform", "From 2000: Fast Track Land Reform Programme with A1 (small-scale) and A2 (commercial) models.", undefined);
  b.card("CONCEPT", "Challenges after resettlement", "Tenure security and credit, inputs and equipment, infrastructure, skills, disputes, compensation.", undefined);
});
