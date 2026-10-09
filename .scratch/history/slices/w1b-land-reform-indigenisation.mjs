// Slice W1b: land reform and indigenisation (ZIMSEC topic 11.3).
import { concept, P, source, sources, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.independence.land-reform-indigenisation", { file: "independence/land-reform-indigenisation", keyPrefix: "independence.land-reform-indigenisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which principle governed land acquisition in Zimbabwe's first ten years of independence?",
    options: [
      ["Willing-seller, willing-buyer", "Correct: required by the Lancaster House constitution."],
      ["Compulsory acquisition without any compensation", "That was not allowed in the 1980s."],
      ["Land Apportionment by race", "Racial land laws ended at independence."],
      ["Fifty-one per cent indigenous ownership", "That is the indigenisation rule of 2007."],
    ],
    answer: "A",
    explanation: "For ten years land could be bought only from owners who chose to sell, with adequate compensation.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was the Fast Track Land Reform Programme launched?",
    options: [
      ["2000", "Correct: in July 2000."],
      ["1980", "1980 saw the start of willing-seller, willing-buyer resettlement."],
      ["1992", "1992 was the Land Acquisition Act."],
      ["2013", "2013 was the new Constitution."],
    ],
    answer: "A",
    explanation: "The fast-track programme began in **2000**, after the February referendum and farm occupations.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why was land redistribution slow in the 1980s?",
    options: [
      ["Land could only be bought from willing sellers", "Correct: offered land was often poor and costly."],
      ["Very few African families wanted to farm in the 1980s", "There was great demand for land."],
      ["The government had banned all resettlement", "Resettlement took place, though slowly."],
      ["All white farmers had already left", "Most commercial farmers stayed."],
    ],
    answer: "A",
    explanation: "Willing-seller, willing-buyer meant the government could buy only land that was offered, often expensive or poor, with limited funds.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the difference between the A1 and A2 resettlement models?",
    options: [
      ["A1 gave smallholder plots; A2 gave commercial farms", "Correct."],
      ["A1 was for foreign companies; A2 was for families", "Both models were for Zimbabweans."],
      ["A1 plots were in towns; A2 farms were in the rural areas", "Both were agricultural resettlement in rural areas."],
      ["A1 was before 1980; A2 after 1980", "Both were part of fast-track reform from 2000."],
    ],
    answer: "A",
    explanation: "A1 plots were for families with shared grazing; A2 farms were for those expected to farm commercially.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What did the Indigenisation and Economic Empowerment Act of 2007 require?",
    options: [
      ["51% indigenous ownership of larger firms", "Correct: later relaxed (2018)."],
      ["Equal land shares for every citizen", "It concerned business ownership."],
      ["The return of all communal and resettlement land to chiefs", "It did not deal with land allocation."],
      ["The closure of all foreign banks", "It did not order closures."],
    ],
    answer: "A",
    explanation: "Businesses above a set size had to be at least 51% owned by indigenous Zimbabweans; Community Share Ownership Trusts followed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How did the 2013 Constitution deal with compensation for land acquired for resettlement?",
    options: [
      ["Paid for improvements, not the land", "Correct: e.g. buildings and dams."],
      ["Full market value for land and improvements", "Compensation is for improvements, not the land itself."],
      ["No compensation of any kind", "Improvements are compensated."],
      ["Land returned to former owners", "Land reform was entrenched, not reversed."],
    ],
    answer: "A",
    hints: ["Distinguish between the land and what was built on it."],
    explanation: "The Constitution vests acquired land in the state and provides compensation for improvements rather than for the land itself.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which was a recognised problem of fast-track land reform?",
    options: [
      ["Many farm workers lost jobs and homes", "Correct: many were displaced."],
      ["No families received any land", "Large numbers of families received land."],
      ["Tobacco growing was banned throughout Zimbabwe", "Tobacco continued; smallholder output later grew."],
      ["All land was given to foreign firms", "Land went to Zimbabweans."],
    ],
    answer: "A",
    hints: ["Think about people who lived and worked on commercial farms."],
    explanation: "Many farm workers lost employment and housing; other problems included falling output, lack of title and credit, and disputes.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best describes the debate about the measures Western countries took after 2000?",
    options: [
      ["The West calls them targeted; Zimbabwe calls them illegal", "Correct: both views exist."],
      ["All sides agree the measures had no effect", "Their effects are debated."],
      ["The measures were imposed by the African Union and SADC jointly", "They were imposed by the EU and USA."],
      ["The measures were lifted in 2001", "They were imposed from 2001-2002."],
    ],
    answer: "A",
    hints: ["The question asks about the debate, not who is right."],
    explanation: "Western governments described their measures as targeted at individuals and concerns about governance; the Zimbabwean government called them illegal sanctions that harmed the whole economy.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In February 2000 Zimbabwean voters rejected a draft constitution in a referendum.",
    answer: true,
    explanation: "True. Farm occupations followed, and the fast-track programme was launched in July 2000.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Land reform in Zimbabwe began only in the year 2000.",
    answer: false,
    explanation: "False. Resettlement began in 1980 under willing-seller, willing-buyer; compulsory acquisition was allowed from 1992; fast track began in 2000.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each law or document with what it did.",
    pairs: [
      ["Lancaster House constitution", "Protected property; willing-seller, willing-buyer for ten years"],
      ["Land Acquisition Act (1992)", "Allowed compulsory acquisition with compensation"],
      ["Indigenisation and Economic Empowerment Act (2007)", "Required 51% indigenous ownership of larger businesses"],
      ["Constitution of 2013", "Vested acquired land in the state; created a Land Commission"],
    ],
    explanation: "Each step changed the legal basis of land and economic ownership.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Fast Track Land Reform Programme is launched",
      "The Land Acquisition Act is passed",
      "The Indigenisation and Economic Empowerment Act is passed",
      "The donors' conference on land meets in Harare",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The Land Acquisition Act came two years after the Lancaster House restriction ended."],
    explanation: "Land Acquisition Act 1992; donors' conference 1998; fast track 2000; indigenisation act 2007.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The European Union imposed measures on Zimbabwe from {{blank:a}}. Zimbabwe left the {{blank:b}} in 2003.",
    blanks: [
      { id: "a", accepted: ["2002"], choices: ["2002", "1980", "1992", "2013"] },
      { id: "b", accepted: ["Commonwealth"], choices: ["Commonwealth", "United Nations", "African Union", "SADC"] },
    ],
    explanation: "EU measures began in 2002; Zimbabwe was suspended from the Commonwealth in 2002 and left in 2003.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What percentage of ownership by indigenous Zimbabweans did the 2007 indigenisation law require of larger businesses? (Give a number.)",
    accepted: ["51", "51%", "51 %", "51 percent", "51 per cent", "fifty-one per cent", "fifty one percent"],
    wrong: ["49"],
    explanation: "At least **51%**; the rule was narrowed in 2018.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** reasons for land reform in Zimbabwe.",
    points: [
      "Colonial land alienation and racial land laws (1930, 1969).",
      "Unequal distribution at independence: best land held by a few thousand commercial farmers.",
      "Land was a central aim of the liberation struggle.",
      "Overcrowding and poor land in the communal areas.",
      "Slow progress under willing-seller, willing-buyer / political pressure from war veterans and the landless.",
    ],
    modelAnswer: "Land had been taken under colonial rule and divided by race; in 1980 a few thousand farmers held much of the best land; land was a central aim of the liberation struggle; communal areas were crowded and poor; and willing-seller, willing-buyer resettlement was slow, increasing pressure from the landless and war veterans.",
    explanation: "One mark per reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the benefits and problems of the Fast Track Land Reform Programme.",
    points: [
      "Benefit: large numbers of land-short families received land.",
      "Benefit: wider ownership of farmland; many new farmers producing and investing.",
      "Benefit: growth of smallholder tobacco production in the 2010s.",
      "Problem: fall in commercial output and exports in the early 2000s; food shortages.",
      "Problem: displacement of farm workers; violence on some farms.",
      "Problem: lack of title, credit and inputs; multiple farm ownership; legal disputes.",
    ],
    hints: ["Give three benefits and three problems, each explained."],
    modelAnswer: "Fast track gave land to large numbers of families who had been short of land, and farmland ownership spread from a small minority to many Zimbabweans; studies found many new farmers producing and investing, and smallholder tobacco grew strongly in the 2010s. However, commercial output and exports fell sharply in the early 2000s, contributing to food shortages. Many farm workers lost jobs and homes, and there was violence on some farms. New farmers often lacked title, credit and inputs, some prominent people received more than one farm, and legal disputes followed.",
    explanation: "One mark per developed benefit or problem.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the Constitution affected land reform.",
    points: [
      "Identifies the Lancaster House restriction.",
      "Explains: willing-seller, willing-buyer for ten years slowed redistribution in the 1980s.",
      "Identifies later amendments / the 2013 Constitution.",
      "Explains: allowed compulsory acquisition, compensation for improvements only, made reform hard to reverse.",
    ],
    hints: ["Think about the Constitution as both an obstacle and a tool."],
    modelAnswer: "The Lancaster House constitution required willing-seller, willing-buyer purchase for ten years, which slowed redistribution in the 1980s. Later amendments allowed compulsory acquisition and limited compensation to improvements, and the 2013 Constitution vested acquired land in the state, making land reform legally secure and hard to reverse.",
    explanation: "Two marks per way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${sources([
      source("Source A", "an interview with a fictional A1 farmer in Masvingo province, recorded by a researcher in 2012", "Before, we were eight families on two hectares in the communal lands, and the soil was finished. Now I have six hectares of my own. The first years were hard: no tractor, no seed, the rains failed twice. This season I sold tobacco and built a brick house. My children will not be squatters on their own land."),
      source("Source B", "a report by a fictional business association in Harare, 2003", "Commercial agricultural output has collapsed. Banks will not lend to farmers without title deeds, exports have fallen, and thousands of farm workers have lost their jobs and homes. Investor confidence will not return while property rights are uncertain."),
    ])}`,
    hints: ["Note the dates: the two sources look at different moments."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "According to Source A, how did land reform change the farmer's life?", points: [
        "More land (six hectares instead of a share of two).",
        "Eventually higher income (sold tobacco, built a brick house).",
      ], explanation: "Two points." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the effects of land reform?", points: [
        "Agree: early years were difficult (A's lack of tractor and seed; B's collapse of output).",
        "Agree: problems of finance/inputs (A: no seed; B: no lending without title).",
        "Disagree: A shows benefits to the new farmer; B shows only losses.",
        "B mentions farm workers and investors, A does not; conclusion.",
      ], explanation: "Specific agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 6, stem: "Which source is more useful for assessing the outcomes of land reform? Use both sources and your own knowledge.", points: [
        "A: beneficiary's experience; one farmer, may be typical of some A1 areas (studies of Masvingo).",
        "A: recorded in 2012, so shows longer-term recovery.",
        "B: business association with an interest in property rights and investment.",
        "B: 2003, during the worst period; accurate on falling output, workers displaced, lack of title.",
        "Own knowledge: both benefits and problems recognised; debate continues.",
        "Supported judgement: each useful for different aspects/times.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A is the account of a new A1 farmer recorded in 2012, so it shows the experience of a beneficiary over about ten years: more land, early hardship, and later success with tobacco. This matches studies that found many new farmers producing and investing, but it is one person's story. Source B comes from a business association in 2003, during the worst years, and reflects the interests of business and investors. Its points about falling output, displaced farm workers and the lack of title deeds for borrowing are supported by own knowledge. Each source is useful for a different aspect and moment: B for the early economic shock and its victims, A for the gains to new farmers in the longer term. Together they show why historians still debate the outcomes.", explanation: "Weigh provenance, date and content." }),
    ],
    explanation: "Two-source practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), consider the aims of land reform and judge against them."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the measures taken for indigenisation and gender equity in Zimbabwe.", points: [
        "Indigenisation and Economic Empowerment Act 2007: 51% indigenous ownership of larger firms.",
        "Community Share Ownership Trusts / empowerment funds.",
        "2013 Constitution: gender equality, 60 reserved National Assembly seats for women.",
        "Zimbabwe Gender Commission / equal access to land.",
      ], explanation: "Four measures." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far did land reform achieve its aims?", points: [
        ["Aim achieved: land redistributed to many families; colonial pattern of ownership changed.", 2],
        ["Aim achieved: reform entrenched in the Constitution; later recovery in smallholder output.", 2],
        ["Not achieved: fall in production and food security in the early 2000s.", 2],
        ["Not achieved: farm workers displaced; lack of title/credit; multiple ownership; Western reaction and loss of investment.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Land reform aimed to correct the colonial division of land and give land to the landless. In this it largely succeeded: large numbers of families received land, the ownership of farmland changed from a small minority to a much wider group, and the 2013 Constitution made the reform hard to reverse. In some areas new farmers became productive, and smallholder tobacco production grew in the 2010s.\n\nBut land reform also aimed to improve livelihoods and the economy, and here the results were mixed. Commercial output and exports fell sharply in the early 2000s, contributing to food shortages. Many farm workers lost their jobs and homes, new farmers often lacked title, credit and inputs, and some prominent people gained more than one farm. Western criticism and measures reduced aid and investment.\n\nOverall land reform achieved its central political aim of redistribution, but only partly achieved its economic aims; historians still debate how much of the decline was caused by the reform itself.", explanation: "Top level judges against the aims with both sides." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Willing-seller, willing-buyer", "Land acquired only from owners who chose to sell, at a fair price (Lancaster House, 1980-1990).");
  b.card("FACT", "When did the Fast Track Land Reform Programme begin?", "July 2000.");
  b.card("DEFINITION", "A1 and A2 models", "A1: smallholder family plots; A2: medium and large commercial farms (fast-track reform).");
  b.card("FACT", "What did the Land Acquisition Act (1992) allow?", "Compulsory acquisition of land with compensation.");
  b.card("FACT", "What does the 2013 Constitution say about compensation for acquired land?", "Compensation is paid for improvements (buildings, dams), not for the land itself.");
  b.card("DEFINITION", "Indigenisation", "Increasing indigenous Zimbabwean ownership of the economy; the 2007 Act required 51% indigenous ownership of larger businesses.");
  b.card("CONCEPT", "How did Western countries react to fast-track land reform?", "Criticism; EU measures from 2002; US act of 2001; Commonwealth suspension (2002). The government called them illegal sanctions.");
  b.card("CONCEPT", "Give two benefits and two problems of land reform.", "Benefits: land for many families, wider ownership. Problems: fall in output and exports, farm workers displaced (also lack of title and credit).");
  b.card("FACT", "Name two gender-equity measures in the 2013 Constitution.", "60 reserved National Assembly seats for women; the Zimbabwe Gender Commission (and equal access to land).");
});
