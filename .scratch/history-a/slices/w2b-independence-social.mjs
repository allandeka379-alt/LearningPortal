// W2b: ahist.independence.social (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.independence.social", { file: "independence/social", keyPrefix: "independence.social" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What change to primary schooling did the government make in 1980?",
    options: [
      ["It abolished fees for primary schooling", "Correct: fee-free primary education opened school places to many more children."],
      ["It made secondary schooling compulsory for all children", "Secondary schooling expanded but was not made compulsory."],
      ["It handed all primary schools to the churches to run", "Missions kept schools but the state expanded its role."],
      ["It closed rural schools and moved pupils into towns", "The opposite happened: many new rural schools opened."],
    ],
    answer: "A",
    explanation: "Primary fees were abolished in 1980 and primary enrolment rose very quickly.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main idea of the \"primary health care\" policy after 1980?",
    options: [
      ["To bring basic services such as clinics and immunisation close to rural people", "Correct: it targeted the rural majority."],
      ["To spend most health money on large central hospitals in the main towns and cities", "That would have favoured towns, as before 1980."],
      ["To require everyone to pay the full cost of treatment at government clinics", "Fees were limited in the 1980s and increased under ESAP."],
      ["To train doctors abroad and bring in foreign hospitals to run services", "The policy relied on local nurses and village health workers."],
    ],
    answer: "A",
    explanation: "Primary health care meant low-cost services close to people, especially in rural areas.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which law of 1982 gave women adult legal status at the age of 18?",
    options: [
      ["The Legal Age of Majority Act", "Correct: it changed the legal position of women and young adults."],
      ["The Matrimonial Causes Act, on divorce and property", "This 1985 Act dealt with property and divorce."],
      ["The Land Acquisition Act", "This concerned land, not the age of adulthood."],
      ["The Education Act of 1987", "This concerned schools."],
    ],
    answer: "A",
    explanation: "The Legal Age of Majority Act (1982) gave adult legal status at 18, including to women.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Why did the quality of education suffer in some schools during the rapid expansion of the 1980s?",
    options: [
      ["There were too few trained teachers, books and laboratories for so many pupils", "Correct: numbers grew faster than resources."],
      ["The government stopped paying all teachers after the first year of independence", "Teachers continued to be paid by the state."],
      ["Most children left school at the age of ten because of rising fees at primary level", "Fees were abolished at primary level."],
      ["Examinations were abolished and pupils moved on without assessment", "National examinations continued."],
    ],
    answer: "A",
    hints: ["Think about what increased faster: pupils or teachers and equipment."],
    explanation: "Enrolment rose more quickly than the supply of qualified teachers, textbooks and equipment, especially in new rural secondary schools.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which effect of ESAP on social services is most accurately described?",
    options: [
      ["Fees for clinics and schools and cuts in real spending reduced access for poor families", "Correct: cost recovery shifted costs to households."],
      ["A rapid increase in free hospital places in every district, paid for by foreign donors", "ESAP reduced, not increased, free provision."],
      ["The abolition of all private schools and clinics so that the state ran every service", "Private provision was not abolished."],
      ["A rise in the number of nurses as pay improved and more were trained locally", "Many experienced nurses left the public service for better pay."],
    ],
    answer: "A",
    hints: ["Cost recovery means charging fees."],
    explanation: "Under ESAP's cost-recovery policy, user fees and real cuts in spending made schools and clinics harder for poor families to use.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which epidemic became the greatest social challenge in Zimbabwe in the 1990s?",
    options: [
      ["HIV/AIDS, which cut life expectancy and left many orphans", "Correct: infection rates peaked in the second half of the decade."],
      ["Smallpox, which returned after the end of immunisation", "Immunisation expanded; smallpox had been eradicated worldwide."],
      ["Bubonic plague, which spread from the towns to the reserves", "There was no such epidemic."],
      ["Polio, which caused most deaths among adults in the towns", "Polio vaccination coverage rose in the 1980s."],
    ],
    answer: "A",
    explanation: "HIV/AIDS was the greatest social challenge of the 1990s; the first cases had been identified in 1985.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best weighs the social record of the 1980s?",
    options: [
      ["Large gains in schooling and child health were real, but quality, jobs and later funding remained problems", "Correct: a balanced judgement with both sides."],
      ["Every social aim of the government was achieved in full before the end of 1985, leaving nothing to do", "Many aims were only partly met."],
      ["No improvement took place in schooling or health until after the adoption of ESAP in 1991", "The greatest gains in schooling came in the 1980s."],
      ["The reforms helped urban residents only, while rural people saw no change at all in their lives", "Rural areas gained new schools and clinics."],
    ],
    answer: "A",
    hints: ["Choose the answer that gives achievements and limits."],
    explanation: "The 1980s saw large gains in school enrolment and child health, but there were problems of quality, unemployment, and later funding.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of the following is the best evidence that Zimbabwe made progress in education in the 1980s?",
    options: [
      ["Secondary enrolment grew many times over and adult literacy became among the highest in Africa", "Correct: it shows scale and result."],
      ["The ZINTEC programme was introduced in the same year as the University of Zimbabwe was founded", "The dates do not match and prove nothing about progress."],
      ["The government published a development plan with targets for the next five years", "A plan shows intention, not achievement."],
      ["Many school leavers could not find formal jobs and remained unemployed after leaving school", "This shows a problem, not progress."],
    ],
    answer: "A",
    hints: ["Evidence of progress shows results, not just plans or problems."],
    explanation: "Enrolment growth and literacy results are direct evidence of achievement; plans and unemployment are not.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "Before 1980, schooling for white children and African children was organised on the same basis.", answer: false,
    explanation: "Education was divided by race, with more funding and compulsory schooling for white children.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "Village health workers were part of the primary health care approach after 1980.", answer: true,
    explanation: "Trained village health workers and rural clinics brought basic care closer to rural families.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "The Unity Accord of 22 December 1987 is a social policy on education and health.", answer: false,
    hints: ["Remember its political purpose."],
    explanation: "The Unity Accord was a political agreement that ended the disturbances in Matabeleland and the Midlands; it is not a social service policy.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Immunisation", "Giving vaccines to protect children from diseases such as measles and polio"],
      ["User fees", "Charges paid by people who use a clinic or a school"],
      ["Education with production", "Combining academic study with practical, income-earning work"],
      ["ZINTEC", "A programme that trained teachers while they taught in schools"],
    ],
    explanation: "These are the key terms of the social developments.",
  });
  {
    const events = [
      "Primary school fees are abolished",
      "The Legal Age of Majority Act is passed",
      "The first AIDS cases are identified",
      "ESAP introduces user fees for health and education",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1980, 1982, 1985 and 1991."],
      explanation: "1980; 1982; 1985; 1991.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The {{blank:a}} Act of 1982 gave women adult legal status, and the {{blank:b}} policy took basic services to rural people.",
    blanks: [
      { id: "a", accepted: ["Legal Age of Majority"], choices: ["Legal Age of Majority", "Land Acquisition", "Education", "Maintenance"] },
      { id: "b", accepted: ["primary health care"], choices: ["primary health care", "structural adjustment", "indigenisation", "land reform"] },
    ],
    explanation: "The Legal Age of Majority Act (1982) and the primary health care policy.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name was given to the teacher-training programme that trained teachers while they taught? Give its initials.",
    accepted: ["ZINTEC", "Zintec"],
    wrong: ["UNICEF"],
    explanation: "**ZINTEC**, the Zimbabwe Integrated National Teacher Education Course.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the expansion of education in Zimbabwe in the 1980s.",
    points: ["Primary fees were abolished and enrolment rose very quickly", "Many new secondary schools were built, often in rural areas", "New teacher-training programmes such as ZINTEC were started", "University and college places increased, with new institutions founded later"],
    modelAnswer: "Fees for primary schooling were abolished and enrolment rose very quickly. Many new secondary schools were built, often in rural areas with community help. Teacher training expanded through programmes such as ZINTEC, and university and college places increased.",
    explanation: "One mark for each development described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the government gave priority to education and health after independence.",
    points: [["Education and health had been racially unequal before 1980 and the majority expected change, so the new government wanted to reward and win the support of the people", 2], ["Skilled, healthy workers were needed for development, and the government's policy of growth with equity depended on spreading services", 2]],
    hints: ["Think of the colonial past and of future development."],
    modelAnswer: "Services had been unequal by race, and the majority expected change after the war, so the new government wanted to deliver and keep support. A more educated and healthier population was also needed for economic development and for the policy of growth with equity.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how HIV/AIDS affected social and economic life in Zimbabwe in the 1990s.",
    points: [["High infection rates reduced life expectancy and left many orphans, so families and communities carried a heavy burden", 2], ["Workers such as teachers, nurses and farm workers died or fell ill, which weakened services and production and put pressure on hospitals", 2]],
    hints: ["Give one effect on families and one on services or the economy."],
    modelAnswer: "High rates of infection lowered life expectancy and left many orphans, so families and communities had to care for many more children. Teachers, nurses, farm workers and others died or fell ill, which weakened schools, hospitals and production and put pressure on health services.",
    explanation: "Credit developed effects.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a page from the log book of a fictional rural primary school, written by its headmaster in 1984",
        "The school has opened with three hundred and ten pupils where last year we had ninety. There are two teachers for seven classes, no desks in Grade 4, and only one reader for every five children. The parents have moulded bricks for two more classrooms. No child was turned away."),
      "",
      source("Source B", "a report by a fictional district nurse to her regional office, 1994",
        "Since fees were introduced at the clinic, attendance has fallen. Women say they cannot pay for their children's treatment. Drugs run out before the end of the month and two of our experienced nurses have left for better pay. The number of patients with AIDS-related illness grows each quarter."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What problems of the school does Source A describe?", points: ["Too few teachers for so many pupils (two teachers for seven classes)", "Shortage of equipment such as desks and readers"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What does Source B suggest about the health services in 1994?", points: ["Fees reduced attendance by those who could not pay / drug shortages", "Loss of nurses and growing numbers of AIDS-related patients"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do these sources show that social services improved after independence?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A shows expansion: pupils tripled and no child was turned away, with community effort", 1], ["B shows decline in the 1990s: fees, shortages and AIDS", 1], ["Provenance: each is a single, local report from a different decade and a different service", 1], ["Own knowledge: schooling and health improved in the 1980s, but quality and funding problems grew and ESAP reduced access", 1]], modelAnswer: "Source A shows expansion in the 1980s, since the school has more than three times the pupils and turns none away, with the parents building classrooms, although it is short of teachers and books. Source B, from ten years later, shows decline in the clinic, with fewer patients because of fees, shortages of drugs and the loss of nurses. Each is a single local report on one service, so I cannot generalise. My own knowledge confirms that access improved greatly in the 1980s and that cost recovery and AIDS strained services in the 1990s. The sources therefore show improvement followed by difficulty." }),
    ],
    hints: ["For (c), notice that the sources come from different decades."],
    explanation: "Both sources are invented: a school log book and a nurse's report.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent did the lives of ordinary Zimbabweans improve through social developments between 1980 and 2000?",
    levels: levels(12),
    points: [
      ["Education: free primary schooling, new schools, higher literacy and college places", 3],
      ["Health: primary health care, clinics, immunisation and falling child mortality in the 1980s", 3],
      ["Limits: quality problems, school leavers without jobs, user fees under ESAP, HIV/AIDS, housing shortage", 3],
      ["Comparison with the colonial period and change over time", 1],
      ["Supported judgement", 2],
    ],
    hints: ["Compare the 1980s with the 1990s as well as with the colonial period."],
    modelAnswer: "The lives of ordinary Zimbabweans improved considerably, mainly in the 1980s, but the gains were uneven and in the 1990s were partly reversed. Compared with the colonial period, when services were divided by race, the abolition of primary fees, the building of schools and clinics and the national immunisation programme brought real benefits and made literacy among the highest in Africa. Women gained adult legal status. However, expansion strained teachers and equipment, graduates struggled to find jobs, and housing shortages continued. In the 1990s user fees under ESAP, falling real spending and the HIV/AIDS epidemic weakened health and schooling. I conclude that improvement was real and large, especially for the rural majority, but the benefits were not secure.",
    explanation: "Credit specific developments, limits and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the effects of ESAP on social services in Zimbabwe in the 1990s.",
    levels: levels(8),
    points: [
      ["Cost recovery: fees for clinics and for schools made access harder for poor households", 2],
      ["Cuts in real spending and loss of staff: shortages of drugs and books, nurses and teachers leaving", 2],
      ["Other pressures: HIV/AIDS, drought, rising unemployment and prices", 2],
      ["Judgement on how much of the decline was caused by ESAP", 2],
    ],
    hints: ["Separate what ESAP changed from what else was happening."],
    modelAnswer: "ESAP had a significant effect on social services, although it was not the only cause of their problems. Cost recovery brought fees for clinics and schools, which made it harder for poor families to use them, and cuts in real spending led to shortages of drugs and books and the loss of nurses and teachers. But HIV/AIDS, drought and rising unemployment also placed heavy burdens on the services. I conclude that ESAP was an important cause of the decline in access, but it worked together with the epidemic and the economic crisis.",
    explanation: "Credit explained effects, other factors and a judgement.",
  });

  b.card("DEFINITION", "What is primary health care?", "A policy that brings basic, low-cost services such as clinics and immunisation close to people, especially in rural areas.");
  b.card("DEFINITION", "What are user fees?", "Charges paid by people who use a public service such as a clinic or school; increased under ESAP's cost recovery.");
  b.card("FACT", "What happened to primary school fees in 1980?", "They were abolished, and primary enrolment rose very quickly.");
  b.card("FACT", "What did the Legal Age of Majority Act (1982) do?", "It gave adult legal status at 18, including to women.");
  b.card("FACT", "What was ZINTEC?", "The Zimbabwe Integrated National Teacher Education Course, which trained teachers while they taught.");
  b.card("FACT", "When were the first AIDS cases identified in Zimbabwe?", "1985.");
  b.card("CONCEPT", "How did health care change for rural people after 1980?", "Rural clinics were built, village health workers trained and national immunisation started, so child health improved.");
  b.card("CONCEPT", "Why were the gains in social services not secure?", "Quality problems, unemployment, ESAP fees and cuts, and HIV/AIDS strained the services in the 1990s.");
});
