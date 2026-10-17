// W2b: ahist.empowerment.land-1980-99 (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.empowerment.land-1980-99", { file: "empowerment/land-1980-99", keyPrefix: "empowerment.land-1980-99" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was resettlement, as used in the land policy of the 1980s?",
    options: [
      ["Moving families from crowded Communal Areas onto land the government acquired", "Correct: usually former commercial farms."],
      ["Moving white farmers from their farms into the Communal Areas", "White farmers were not moved into Communal Areas."],
      ["Moving workers from the mines into the towns to find new jobs", "That is migration, not resettlement."],
      ["Moving refugees across the border into neighbouring countries", "Resettlement was within Zimbabwe."],
    ],
    answer: "A",
    explanation: "Resettlement meant placing landless and crowded families on land acquired by the state, usually former commercial farms.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "For how many years did the Lancaster House constitution protect its property clauses from amendment?",
    options: [
      ["Ten years", "Correct: until April 1990."],
      ["Twenty years, until 2000", "The entrenchment lasted ten years."],
      ["Five years, until 1985", "The entrenchment lasted ten years."],
      ["Fifteen years, until 1995", "The entrenchment lasted ten years."],
    ],
    answer: "A",
    explanation: "The entrenched clauses could not be amended for ten years without all members of the House agreeing, which meant until 1990.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which resettlement model gave individual families their own plots of arable land with shared grazing?",
    options: [
      ["Model A", "Correct: it was by far the most common."],
      ["Model B", "This was the model for collective farms and cooperatives."],
      ["Model C", "This was the model for a state estate with outgrowers."],
      ["Model D", "This was the model for ranching schemes in dry areas."],
    ],
    answer: "A",
    explanation: "Model A settled individual families on plots of about five hectares with shared grazing.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Which was a main reason resettlement was slower than planned in the 1980s?",
    options: [
      ["Money was short and many farms offered for sale were poor land at high prices", "Correct: cost and the land on offer limited the pace."],
      ["White farmers were forbidden by law from selling any farm to the state or to a scheme", "The state could buy farms that were offered."],
      ["There were no landless families who wanted to be resettled", "Demand was greater than supply."],
      ["The government decided that resettlement was no longer a priority for the country", "Resettlement stayed a policy aim throughout."],
    ],
    answer: "A",
    hints: ["Think about money and about the land on offer."],
    explanation: "Funds were limited, the quality of land offered was often poor and prices were high, so the target of 162,000 families was not met.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Land Acquisition Act of 1992 allow the government to do?",
    options: [
      ["Acquire land compulsorily, with fair compensation decided by the courts", "Correct: compulsory acquisition within the law."],
      ["Take any farm without paying anything to the owner, whenever the state wished", "Compensation was still to be paid."],
      ["Return all farms to the families who had owned them before 1890, without exception", "No such return was provided."],
      ["Ban all white people from owning farms in any part of the country, whatever the circumstances", "The Act did not ban ownership by race."],
    ],
    answer: "A",
    hints: ["The ten-year protection of Lancaster House had just ended."],
    explanation: "After 1990 the 1992 Act allowed compulsory acquisition for resettlement with fair compensation, to be decided by the courts.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about progress with land reform by 1999 is best supported?",
    options: [
      ["About 70,000 families were settled, well short of the 162,000 target", "Correct: real progress but short of the aim."],
      ["The target of 162,000 families was fully met by 1990", "Only about 52,000 had been settled by 1990."],
      ["No families at all had been resettled in any part of the country before the year 2000", "About 70,000 families had been settled."],
      ["Most commercial farmland had already passed into African hands by the end of the 1980s", "Most large farms remained with white owners."],
    ],
    answer: "A",
    hints: ["Choose the statement with both an achievement and a shortfall."],
    explanation: "About 52,000 families had been settled by 1990 and about 70,000 by the late 1990s, below the 162,000 target.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which view is held by commercial farmers in the debate on land reform before 2000?",
    options: [
      ["Acquisitions should follow the law and fair compensation, since farms were productive", "Correct: this was their main argument."],
      ["All commercial farms should be given to the state without any payment to their owners", "Farmers did not hold this view."],
      ["The land question did not exist, and no resettlement was ever needed in the country", "Most farmers accepted that reform was needed."],
      ["The government should stop all buying of farms for resettlement from white owners", "Many accepted orderly purchase."],
    ],
    answer: "A",
    hints: ["Think about what owners would want."],
    explanation: "Commercial farmers argued that acquisitions should follow the law and pay fair compensation, and stressed the farms' contribution to exports and food.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where and when was the donors' conference on land held?",
    options: [
      ["In Harare in September 1998", "Correct: it agreed in principle on a land programme."],
      ["In London in 1979", "London hosted the Lancaster House talks."],
      ["In Lusaka in 1980", "Lusaka hosted the founding of SADCC."],
      ["In Geneva in 1991", "Geneva is not the site of this conference."],
    ],
    answer: "A",
    explanation: "The donors' conference met in Harare on 9-11 September 1998.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "At independence about 6,000 white farmers held roughly two-fifths of the farmland.", answer: true,
    explanation: "This figure is widely quoted as an approximation of the inequality in land holding.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "Model B resettlement gave each family its own individual plot.", answer: false,
    explanation: "Model B was for collective farms run as cooperatives; Model A gave individual plots.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "The British government's letter of November 1997 said that it accepted a special responsibility to meet the costs of land purchase.", answer: false,
    hints: ["The letter angered the Zimbabwean government."],
    explanation: "The letter, by the Secretary for International Development, said the new British government did not accept a special responsibility.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each resettlement model to its description.",
    pairs: [
      ["Model A", "Individual family plots in villages with shared grazing"],
      ["Model B", "Collective farms run as cooperatives"],
      ["Model C", "A state-run estate with smaller outgrowers"],
      ["Model D", "Ranching schemes for communal grazing in dry areas"],
    ],
    explanation: "Model A was by far the most common.",
  });
  {
    const events = [
      "The Lancaster House Agreement is signed",
      "The Land Acquisition Act gives the state first refusal on farms",
      "The Land Acquisition Act allows compulsory acquisition with fair compensation",
      "The donors' conference on land meets in Harare",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1979, 1985, 1992 and 1998."],
      explanation: "1979; 1985; 1992; September 1998.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "By 1990 about {{blank:a}} families had been resettled, against a target of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["52,000"], choices: ["12,000", "52,000", "102,000", "162,000"] },
      { id: "b", accepted: ["162,000"], choices: ["18,000", "52,000", "162,000", "500,000"] },
    ],
    explanation: "About 52,000 families by 1990, against a target of 162,000.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What was the name of the commission of 1993-94 that studied land tenure in Zimbabwe? Give the surname that identifies it.",
    accepted: ["Rukuni", "the Rukuni Commission", "Rukuni Commission"],
    wrong: ["Utete"],
    explanation: "The **Rukuni** Commission studied land tenure.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the land problem that Zimbabwe inherited at independence in 1980.",
    points: ["About 6,000 white farmers held a very large share of the farmland, roughly two-fifths", "Their farms were mainly in the regions with the best soil and rainfall", "Hundreds of thousands of African families lived in overcrowded Communal Areas", "The Communal Areas had poorer soil and were often eroded or in dry regions"],
    modelAnswer: "About 6,000 white commercial farmers held a very large share of the farmland, roughly two-fifths of the country, mainly in the regions with the best soil and rainfall. Hundreds of thousands of African families lived in overcrowded Communal Areas, where the soil was poorer and often eroded or dry.",
    explanation: "One mark for each point described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Lancaster House Agreement affected land reform in the 1980s.",
    points: [["It protected private property for ten years, and compensation had to be prompt and adequate, so the government in practice bought farms that owners offered", 2], ["The government had to find the money to pay, and aid from Britain was limited and unspecified, so resettlement was slower than the people expected", 2]],
    hints: ["Link the terms to the pace of change."],
    modelAnswer: "The agreement protected private property for ten years and required prompt, adequate compensation, so in practice the government bought only the farms that owners offered. It also had to find the money, and British help was limited and not fixed, so resettlement proceeded more slowly than people expected.",
    explanation: "Credit developed links between the terms and the pace of reform.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why landless people and war veterans criticised the pace of land reform before 2000.",
    points: [["Most commercial farms remained in the hands of a small number of white owners, even though the people had expected rapid redistribution after the liberation war", 2], ["Resettlement reached only about 70,000 families against a target of 162,000, and many remained in overcrowded Communal Areas", 2]],
    hints: ["Think of expectations and of the numbers."],
    modelAnswer: "The people had expected rapid redistribution after the liberation war, yet most commercial farms remained with a small number of white owners. Only about 70,000 families had been resettled against a target of 162,000, so many remained in overcrowded Communal Areas.",
    explanation: "Credit developed reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional official of the Ministry of Lands on a resettlement scheme, 1988",
        "On the scheme, 214 families now hold five hectares each with a share of grazing. Maize yields are above those of the nearby Communal Area, and a primary school and a clinic have been built. The need, however, is greater than the supply: for each family settled, many more await a plot."),
      "",
      source("Source B", "a letter from a fictional commercial farmer to a farmers' union newsletter, 1994",
        "We have always said that land reform is necessary and that we will sell where the price is fair. But offers are made to us on terms that no buyer would accept, and farms that produce food and exports are listed with no plan for what follows. Reform should be done in order, with the law and with payment."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What evidence of success does Source A give?", points: ["Maize yields above those of the nearby Communal Area", "A school and a clinic have been built / 214 families have five hectares each"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What objections does Source B make?", points: ["Offers are made on terms no buyer would accept (the price)", "Productive farms are listed with no plan; reform should follow the law and pay compensation"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do the sources agree about land reform?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Agree that reform is necessary: A shows demand outrunning supply and B says land reform is necessary", 1], ["Disagree on method and effect: A praises results, B criticises terms, planning and compensation", 1], ["Provenance: A is an official report on a scheme the ministry runs; B is a farmer's letter protecting his interests", 1], ["Own knowledge: resettled families gained income and services, but progress was slow and disputes over price and law were real", 1]], modelAnswer: "The sources agree that reform is necessary, since Source A shows many more families waiting than plots, and Source B says reform is necessary. They disagree about method and effects. Source A, from the ministry, praises the results of the scheme, while Source B, from a farmer defending his interests, criticises the terms offered, the lack of a plan and the lack of payment. My own knowledge supports both: resettled families gained income and services, but progress was slow and there were real disputes over price and the law." }),
    ],
    hints: ["For (c), note the point on which both authors agree."],
    explanation: "Both sources are invented: a ministry report and a farmer's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the land reform programme of 1980-1999 successful?",
    levels: levels(12),
    points: [
      ["Aims: reduce overcrowding, settle landless and war-displaced families, improve living standards without damaging commercial farming", 2],
      ["Successes: about 52,000 families by 1990 and about 70,000 by the late 1990s, higher incomes and services for many settlers", 3],
      ["Limits: target of 162,000 missed; high prices and poor land; money short; Lancaster House terms; slow administration", 3],
      ["Different views: landless people and war veterans, commercial farmers, donors and the government", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Compare what was achieved with the target and the aim, then explain why the gap existed."],
    modelAnswer: "The programme was partly successful. Its aims were to reduce overcrowding, settle landless and war-displaced families and raise living standards without damaging commercial farming. About 52,000 families had been settled by 1990 and about 70,000 by the late 1990s, and many settlers gained higher incomes, schools and clinics. But the target of 162,000 families was not met, because money was short, many farms offered were poor land at high prices, the Lancaster House terms limited early action and administration was slow. Landless people and war veterans judged progress too slow, commercial farmers stressed the need to follow the law and pay fairly, and donors and the government disagreed about who should pay. I conclude that the programme achieved real benefits for tens of thousands of families but fell far short of the expectations of independence, so it was only partly successful.",
    explanation: "Credit aims, successes, limits, different views and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the Lancaster House Agreement in explaining the slow pace of land reform in the 1980s.",
    levels: levels(8),
    points: [
      ["The agreement: protection of property, prompt and adequate compensation, ten years' entrenchment, in practice willing-seller purchases", 2],
      ["Effect: the government bought mainly farms offered to it and had to find the money, so the pace was limited", 2],
      ["Other factors: cost, poor land offered, limited British help, drought and administrative capacity", 2],
      ["Judgement on how far the agreement explains the slow pace", 2],
    ],
    hints: ["Weigh a legal constraint against financial and practical constraints."],
    modelAnswer: "The Lancaster House Agreement was an important reason for the slow pace of land reform, but not the only one. It protected property for ten years and required prompt and adequate compensation, so in practice the government bought mainly the farms that owners offered and had to find the money to pay. But cost, the poor quality of many farms offered, limited and unspecified British help, drought and the limited administrative capacity to survey and service new schemes also slowed progress. I conclude that the agreement set the framework within which the government worked, but the shortage of money and practical problems were equally important.",
    explanation: "Credit explained constraints, other factors and a judgement.",
  });

  b.card("DEFINITION", "What is resettlement?", "The movement of families from overcrowded Communal Areas onto land acquired by the government, usually former commercial farms.");
  b.card("DEFINITION", "What is willing-buyer willing-seller?", "The practice of buying land that owners offered for sale at agreed or fair prices; the government's main method in the 1980s.");
  b.card("FACT", "What were Resettlement Models A, B, C and D?", "A: individual family plots; B: collective cooperatives; C: state estate with outgrowers; D: ranching in dry areas.");
  b.card("FACT", "How many families were resettled by 1990 and by the late 1990s?", "About 52,000 by 1990; about 70,000 by the late 1990s; the target was 162,000.");
  b.card("FACT", "What did the Land Acquisition Act of 1985 do?", "It gave the government first refusal on commercial farms offered for sale.");
  b.card("FACT", "What did the Land Acquisition Act of 1992 do?", "It allowed compulsory acquisition of land for resettlement with fair compensation decided by the courts.");
  b.card("FACT", "What happened in Harare on 9-11 September 1998?", "The donors' conference, which agreed in principle on a land programme but did not settle funding.");
  b.card("CONCEPT", "Why was resettlement slower than planned in the 1980s?", "Money was short, offered land was often poor and dear, the Lancaster House terms limited the method, and administration was slow.");
  b.card("CONCEPT", "How did different groups judge land reform before 2000?", "Landless people and war veterans said it was too slow; commercial farmers urged law and fair payment; donors and government disagreed about who should pay.");
});
