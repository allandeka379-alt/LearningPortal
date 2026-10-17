// W2b: ahist.empowerment.land-third-chimurenga (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.empowerment.land-third-chimurenga", { file: "empowerment/land-third-chimurenga", keyPrefix: "empowerment.land-third-chimurenga" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What name did the government give to the land reform programme that began in 2000?",
    options: [
      ["The Third Chimurenga, linking it to the earlier wars for freedom", "Correct: the name linked land to the earlier struggles."],
      ["The Lancaster House Programme, named after the 1979 talks", "Lancaster House was the 1979 settlement, not the 2000 programme."],
      ["The Structural Adjustment Programme, named after the IMF plan", "That was ESAP of 1991."],
      ["The Unity Programme, named after the agreement of 1987", "The Unity Accord was a different matter."],
    ],
    answer: "A",
    explanation: "The government called the fast-track programme the Third Chimurenga, after the First Chimurenga (1896-97) and the Second (the liberation war).",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What was the result of the constitutional referendum of 12-13 February 2000?",
    options: [
      ["The draft constitution was rejected by voters", "Correct: the \"No\" vote won."],
      ["The draft constitution was approved by a large majority", "The draft was rejected."],
      ["The vote was cancelled before any ballots were counted", "The vote was held and counted."],
      ["The vote produced a tie that was decided by a coin toss", "The \"No\" vote won clearly."],
    ],
    answer: "A",
    explanation: "Voters rejected the draft constitution, by about 55 per cent to 45 per cent; farm occupations began soon afterwards.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the difference between the A1 and A2 models under fast-track land reform?",
    options: [
      ["A1 gave smaller plots for household farming; A2 gave larger commercial farms", "Correct: small-scale versus commercial."],
      ["A1 gave land only to white farmers, while A2 gave land only to black farmers", "Neither model was defined by race in this way."],
      ["A1 was for collective farms run by cooperatives; A2 was for ranching in dry areas", "Those were Models B and D in the 1980s."],
      ["A1 was for farms in the towns and A2 was for farms on the northern border", "The models did not depend on location in this way."],
    ],
    answer: "A",
    explanation: "A1 plots were for household farming, A2 farms for commercial operations.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "What did Constitution Amendment No. 16 of 2000 say about compensation?",
    options: [
      ["Britain should pay for land taken, and Zimbabwe would pay for improvements", "Correct: the former colonial power was to pay for the land."],
      ["No compensation of any kind would ever be paid, even for buildings and equipment", "The government said it would pay for improvements."],
      ["Every farmer would receive the full market price in foreign currency", "That was the Lancaster House position."],
      ["The courts alone would decide the price of every farm in dispute", "That was the 1992 approach, not Amendment 16."],
    ],
    answer: "A",
    hints: ["The government held that the colonial power was responsible for the land."],
    explanation: "The amendment said that the former colonial power should pay for land, and that the government would pay only for improvements on it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was an effect of the fast-track programme on agricultural production in the early 2000s?",
    options: [
      ["Output of maize, wheat and tobacco fell sharply as large farms changed hands", "Correct: production dropped, with later recovery in some crops."],
      ["Output of every crop rose immediately as small farmers took over all of the land", "Output of major crops fell."],
      ["Output remained unchanged because the farms all kept their previous owners", "Ownership changed, as did output."],
      ["All export crops disappeared at once and were never grown in Zimbabwe again afterwards", "Some crops, notably tobacco, later recovered."],
    ],
    answer: "A",
    hints: ["Think about the early years after the change of ownership."],
    explanation: "Production of major crops fell sharply in the early 2000s; tobacco later recovered, largely through small-scale contract growers.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "What was the purpose of the Abuja Agreement of September 2001?",
    options: [
      ["To link an end to unlawful occupations and respect for law with British funding for land reform", "Correct: but it was not implemented."],
      ["To end the Second World War in Africa and to divide the German colonies among the victors", "That is unrelated to Zimbabwe in 2001."],
      ["To give Britain control of all the farms that had been taken under the programme", "No such control was agreed."],
      ["To create SADC out of the older SADCC organisation, as agreed at Windhoek", "That was the Windhoek Treaty of 1992."],
    ],
    answer: "A",
    hints: ["It was an agreement with Britain and Commonwealth states."],
    explanation: "The Abuja Agreement tied an end to unlawful occupations and the rule of law to British support for a land programme; it was not carried out.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the causes of the fast-track programme is best supported?",
    options: [
      ["Slow progress, the referendum defeat and pressure from war veterans all contributed", "Correct: historians combine several causes."],
      ["The programme had one cause only, which was a direct decision of the IMF in Washington", "The IMF played no such role."],
      ["The referendum result had no connection with the occupations that followed it in 2000", "The timing links them, whatever the debate on planning."],
      ["There was no pressure for land reform in Zimbabwe at any time before the year 2000", "Pressure had existed since 1980."],
    ],
    answer: "A",
    hints: ["Choose the answer that combines several causes."],
    explanation: "Most historians combine slow progress, Lancaster House constraints, the dispute with Britain, the referendum and pressure from war veterans.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point is the strongest evidence for the view that fast-track reform benefited many families?",
    options: [
      ["Over 140,000 families received A1 plots by 2003 according to government figures", "Correct: it shows the scale of those who gained land, although it is a government figure."],
      ["Tobacco output fell sharply in the early years of the programme, as farms changed hands", "This shows a cost, not a benefit to families."],
      ["Many farm workers lost their homes and jobs when farms changed hands", "This shows a cost to others."],
      ["The programme was criticised by governments in the United Kingdom and the United States", "This shows foreign opinion, not benefit."],
    ],
    answer: "A",
    hints: ["Which point is about who gained land?"],
    explanation: "The number of families who received land shows a major benefit for them, though independent studies give different totals and show differences in how well the new farmers did.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The Fast Track Land Reform Programme was launched in July 2000.", answer: true,
    explanation: "The programme was launched in July 2000, after the occupations that began in February-March.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "Historians agree that the farm occupations were entirely planned by the government.", answer: false,
    explanation: "Historians differ on how far the occupations were organised by the state and how far they came from below.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Farm workers were generally offered land under the fast-track programme.", answer: false,
    hints: ["Think about who lost homes and jobs."],
    explanation: "Most farm workers were not allocated land, and many lost their jobs and homes.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["A1", "A smaller plot for household farming"],
      ["A2", "A larger farm for commercial production"],
      ["Land tenure", "The terms on which land is held"],
      ["Utete Committee", "The 2003 committee that reviewed the programme"],
    ],
    explanation: "These are the key terms of the fast-track programme.",
  });
  {
    const events = [
      "The referendum rejects the draft constitution",
      "The Fast Track Land Reform Programme is launched",
      "The Abuja Agreement is signed",
      "Constitution Amendment No. 17 vests acquired land in the state",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are February 2000, July 2000, September 2001 and 2005."],
      explanation: "February 2000; July 2000; September 2001; 2005.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A referendum in {{blank:a}} 2000 rejected a draft constitution, and the fast-track programme began in {{blank:b}} of that year.",
    blanks: [
      { id: "a", accepted: ["February"], choices: ["February", "June", "October", "December"] },
      { id: "b", accepted: ["July"], choices: ["January", "July", "November", "March"] },
    ],
    explanation: "The referendum was in February 2000; the programme was launched in July 2000.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the 2003 committee, named after its chairman, that reported on the fast-track programme? Give the chairman's surname.",
    accepted: ["Utete", "the Utete Committee", "Utete Committee"],
    wrong: ["Rukuni"],
    explanation: "The **Utete** Committee (the Presidential Land Review Committee).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the course of the fast-track programme between February 2000 and 2005.",
    points: ["A referendum on 12-13 February 2000 rejected a draft constitution, and farm occupations began soon afterwards", "In April 2000 the Constitution and the Land Acquisition Act were amended", "The Fast Track Land Reform Programme was launched in July 2000 and farms were designated and allocated as A1 and A2", "The Abuja Agreement of 2001 was not implemented; Amendment No. 17 in 2005 vested acquired land in the state"],
    modelAnswer: "A referendum on 12-13 February 2000 rejected a draft constitution, and farm occupations began soon afterwards. In April 2000 the Constitution and the Land Acquisition Act were amended, and in July the Fast Track Land Reform Programme began, with farms designated and allocated as A1 and A2. The Abuja Agreement of 2001 was not implemented, and in 2005 Amendment No. 17 vested acquired land in the state.",
    explanation: "One mark for each stage described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why many resettled farmers faced difficulties after 2000.",
    points: [["Many had permits or offer letters rather than title, so they could not easily borrow from banks to invest", 2], ["There was a shortage of inputs, equipment, credit and services, and the loss of the skills and infrastructure of the former large farms", 2]],
    hints: ["Think about finance and about inputs."],
    modelAnswer: "Many farmers held only permits or offer letters rather than title, so banks would not lend to them and they could not easily invest. There was also a shortage of inputs, equipment, credit and services, and the infrastructure of the former large farms was often not maintained.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the government and Britain disagreed about responsibility for land reform.",
    points: [["The government said Britain had promised at Lancaster House to help pay for land and had abandoned this, citing the letter of November 1997", 2], ["Britain said that it had funded purchases in the 1980s and wanted a transparent programme aimed at reducing poverty, and that the new government was not bound by the earlier understanding", 2]],
    hints: ["Give the position of each side."],
    modelAnswer: "The Zimbabwean government said Britain had promised at Lancaster House to help pay for land and had abandoned that responsibility, citing the letter of November 1997. Britain said that it had paid for purchases in the 1980s, wanted a transparent programme that reduced poverty, and did not accept that the new government was bound by the earlier understanding.",
    explanation: "Credit both sides explained.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an interview with a fictional farmer in a resettlement area, recorded in 2006",
        "My father worked on a farm for forty years and never owned a hectare. Now I have six hectares and a permit. The first seasons were hard, for I had no tractor and little seed, but this year I sold maize and paid school fees. The permit is not a title, and I worry what will happen if I wish to borrow."),
      "",
      source("Source B", "a statement by a fictional agricultural economist at a conference, 2008",
        "Production of maize, wheat and tobacco is far below that of 1999. Large farms that employed many people are now idle or farmed in part. Redistribution of land was needed, but done in this way it has cost the country its export earnings and many farm workers their homes."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What benefits does the farmer in Source A describe?", points: ["He has six hectares of his own where his father never owned land", "He sold maize and paid school fees"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What costs of the programme does Source B describe?", points: ["Production far below that of 1999 / lost export earnings", "Idle farms, lost jobs and homes for farm workers"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do the sources agree about the results of land reform?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Agree that land was needed and that results are mixed: A has hard early seasons and B says redistribution was needed", 1], ["Disagree in emphasis: A describes a personal gain, B describes national losses", 1], ["Provenance: A is one farmer's account; B is an economist's national assessment", 1], ["Own knowledge: many families gained land, but output fell and farm workers were displaced", 1]], modelAnswer: "The sources agree that the results were mixed. Source A reports a gain for one family, though with hard early seasons and insecure tenure, and Source B accepts that redistribution was needed but reports lower production and the loss of jobs and homes. They differ in emphasis, since A gives a personal view of benefit and B a national view of cost. Each is limited: A is one farmer's story and B is one economist's view. My own knowledge supports both, since many families gained land while output fell and farm workers were displaced." }),
    ],
    hints: ["For (c), consider what each source says about gain and cost."],
    explanation: "Both sources are invented: a farmer's interview and an economist's statement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the pressure of war veterans and landless people the main reason for the fast-track land reform programme?",
    levels: levels(12),
    points: [
      ["Pressure from below: landless families, war veterans' demands, occupations from 2000", 3],
      ["Slow progress since 1980 and the Lancaster House constraints", 2],
      ["Dispute with Britain over responsibility for the cost of land", 2],
      ["Political competition: the referendum defeat and the new opposition party; debate on how far occupations were planned", 3],
      ["Supported judgement", 2],
    ],
    hints: ["Weigh pressure from below against government decisions and political competition."],
    modelAnswer: "The pressure of war veterans and landless people was an important reason for the fast-track programme, but it was not the only one. Many people in Communal Areas still lacked land, war veterans made demands after 1997, and occupations began in 2000. But this pressure existed because of slow progress since 1980 and the Lancaster House constraints, and the government also pointed to Britain's refusal to pay as it understood the promise. The timing also followed the defeat in the referendum in February 2000 and the arrival of a new opposition party, and historians differ on how far the occupations were organised from above. I conclude that pressure from below gave the programme its force and legitimacy, but the decisions of the government and its political position were needed to turn it into national policy.",
    explanation: "Credit weighing of causes and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the impact of the fast-track land reform programme on the Zimbabwean economy up to 2008.",
    levels: levels(8),
    points: [
      ["Agriculture: output of maize, wheat and tobacco fell, with fewer export earnings", 2],
      ["Employment and incomes: farm workers displaced, new farmers gained land but faced shortages", 2],
      ["Other factors: drought, economic policy, falling investment and sanctions debate; hyperinflation by 2008", 2],
      ["Judgement on how far land reform explains the decline", 2],
    ],
    hints: ["Separate the effect of land reform from other causes of decline."],
    modelAnswer: "Land reform had a major impact on the economy, but it is not the only explanation for the decline. Output of maize, wheat and tobacco fell sharply as large farms changed hands, which reduced export earnings and food supplies, and many farm workers lost jobs and homes. However, drought, economic policy, falling investment, the dispute over sanctions and the pressure of hyperinflation by 2008 also contributed. I conclude that land reform was an important cause of the early decline in agriculture, but the wider crisis resulted from a combination of causes.",
    explanation: "Credit explained effects, other factors and a judgement.",
  });

  b.card("DEFINITION", "What was the Fast Track Land Reform Programme?", "The accelerated programme of compulsory acquisition and redistribution of commercial farmland that began in July 2000, called the Third Chimurenga by the government.");
  b.card("DEFINITION", "What are the A1 and A2 models?", "A1: smaller plots for household farming; A2: larger farms for commercial production.");
  b.card("DEFINITION", "What is land tenure?", "The terms on which land is held, such as title, lease, permit or customary right; secure tenure helps farmers borrow and invest.");
  b.card("FACT", "What happened in the referendum of 12-13 February 2000?", "Voters rejected a draft constitution, by about 55 per cent to 45 per cent; farm occupations followed.");
  b.card("FACT", "What did Constitution Amendment No. 16 (2000) say about compensation?", "That Britain should pay for the land, and Zimbabwe would pay for improvements.");
  b.card("FACT", "What was the Abuja Agreement (September 2001)?", "An agreement with Britain and Commonwealth states linking an end to unlawful occupations and respect for law to British funding for land reform; it was not implemented.");
  b.card("FACT", "What did the Utete Committee report in 2003?", "Government figures of about 11 million hectares acquired, over 140,000 A1 households and about 16,000 A2 farmers.");
  b.card("CONCEPT", "Why did the fast-track programme begin in 2000?", "Slow progress since 1980, Lancaster House constraints, the dispute with Britain, the referendum defeat and pressure from war veterans and landless people.");
  b.card("CONCEPT", "What were the main effects of the programme?", "Land for many families but lower output, displaced farm workers, insecure tenure and strained relations with Britain.");
});
