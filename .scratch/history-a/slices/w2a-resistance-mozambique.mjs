// W2a: ahist.resistance.mozambique (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.resistance.mozambique", { file: "resistance/mozambique", keyPrefix: "resistance.mozambique" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was the first president of FRELIMO?",
    options: [
      ["Eduardo Mondlane", "Correct: he led FRELIMO from its formation in 1962."],
      ["Samora Moises Machel", "Machel became president after Mondlane's death."],
      ["Julius Kambarage Nyerere", "Nyerere led Tanzania, which supported FRELIMO."],
      ["Kenneth David Kaunda", "Kaunda led Zambia, which also gave support."],
    ],
    answer: "A",
    explanation: "Eduardo Mondlane, a sociologist who had worked at the United Nations, led FRELIMO until he was killed in 1969.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did the armed struggle in Mozambique begin?",
    options: [
      ["1964", "Correct: it began on 25 September 1964."],
      ["1962", "This is when FRELIMO was formed."],
      ["1969", "This is when Mondlane was killed."],
      ["1975", "This is when Mozambique became independent."],
    ],
    answer: "A",
    explanation: "FRELIMO was formed in June 1962 but the armed struggle began in September 1964.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the system of chibalo?",
    options: [
      ["Forced labour imposed on Africans by the Portuguese state and companies", "Correct: Africans were compelled to work for little or no pay."],
      ["A voting system that gave limited political rights to educated Africans", "This describes the assimilado system."],
      ["A yearly tax on cattle and crops paid in cash to the Portuguese authorities", "Chibalo was not a cattle tax."],
      ["A scheme of schools run by Portuguese missionaries for village children", "Chibalo was not a school system."],
    ],
    answer: "A",
    explanation: "Chibalo was the forced-labour system used on roads, plantations and farms and for contract work.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which group of leaders and states helped FRELIMO most directly with bases and training?",
    options: [
      ["Tanzania under Julius Nyerere", "Correct: Tanzania hosted FRELIMO and its camps."],
      ["Rhodesia under Ian Smith", "Rhodesia supported Portugal."],
      ["South Africa under its white government", "South Africa supported Portugal."],
      ["Portugal's NATO partners in western Europe", "Portugal belonged to NATO and received arms from its partners, not from FRELIMO's friends."],
    ],
    answer: "A",
    explanation: "Tanzania hosted FRELIMO's headquarters and camps and gave political backing. Rhodesia and South Africa supported Portugal.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Why did FRELIMO decide on armed struggle?",
    options: [
      ["Portugal refused to discuss independence and used force against peaceful demands", "Correct: peaceful methods had been tried and failed."],
      ["FRELIMO received a formal call from the United Nations Security Council to fight Portugal", "No such call was made."],
      ["Portugal had already agreed to leave Mozambique but kept delaying the date of departure", "Portugal refused to leave."],
      ["Tanzania insisted on a military solution as the condition of all its aid to FRELIMO", "Tanzania did not make this demand."],
    ],
    answer: "A",
    hints: ["Think of Mueda and Portugal's war in Angola."],
    explanation: "Portugal refused to negotiate, repressed peaceful protest, and fought to keep its colonies, so FRELIMO concluded that only force could succeed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What was the effect of the coup in Lisbon on 25 April 1974?",
    options: [
      ["It overthrew the dictatorship and opened the way to colonial independence", "Correct: officers tired of colonial wars took power."],
      ["It gave FRELIMO full control of the Portuguese army units stationed in Africa", "FRELIMO did not control the army."],
      ["It brought Portugal into an alliance with Rhodesia against Mozambique", "The coup ended that policy."],
      ["It ended FRELIMO's support from Tanzania, Zambia and the Soviet Union", "Support continued."],
    ],
    answer: "A",
    hints: ["The coup was by Portuguese officers."],
    explanation: "Junior officers weary of the colonial wars overthrew the regime; the new government accepted self-determination, leading to the Lusaka Accord (September 1974) and independence in June 1975.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which pair of facts best shows how the Portuguese tried to cut guerrillas off from the people?",
    options: [
      ["Strategic villages (aldeamentos) and the use of informers by the secret police", "Correct: both aimed to control the population."],
      ["Land reform for peasants and the abolition of the secret police by 1968", "These did not happen."],
      ["The withdrawal of troops and open talks with Mondlane in Dar es Salaam", "These did not happen before 1974."],
      ["The creation of liberated zones, schools and clinics in the northern provinces", "These were FRELIMO measures."],
    ],
    answer: "A",
    hints: ["Think of policies by Portugal, not by FRELIMO."],
    explanation: "Portugal resettled people in strategic villages and used PIDE informers; FRELIMO set up liberated zones and schools.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is best supported about the causes of Portugal's withdrawal?",
    options: [
      ["FRELIMO's pressure and the cost of three wars helped bring about the Lisbon coup", "Correct: external and internal causes were linked."],
      ["FRELIMO defeated the whole Portuguese army in a final battle at Lourenço Marques", "There was no such battle."],
      ["Portugal left because the United Nations sent peacekeeping troops to Mozambique in 1973", "No UN troops were sent."],
      ["Portugal left because its settlers voted in a referendum to end the colonial system", "Settlers did not vote for this."],
    ],
    answer: "A",
    hints: ["The coup was made by Portuguese officers, but the war affected them."],
    explanation: "The coup was an event in Portugal, but years of costly colonial wars, including FRELIMO's guerrilla war, helped to produce it.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "Mozambique became independent in 1975.", answer: true,
    explanation: "Independence was on 25 June 1975, with Samora Machel as president.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "FRELIMO was formed in Dar es Salaam by uniting several exile groups.", answer: true,
    explanation: "UDENAMO, MANU and UNAMI united in June 1962 to form FRELIMO.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Portugal was fighting only in Mozambique in the 1960s.", answer: false,
    hints: ["Think of Angola and Guinea-Bissau."],
    explanation: "Portugal also fought in Angola (from 1961) and Guinea-Bissau, so its resources were stretched.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term or name to its meaning.",
    pairs: [
      ["Samora Machel", "FRELIMO commander who became president in 1970 and of independent Mozambique"],
      ["PIDE", "The Portuguese secret police"],
      ["Aldeamento", "A strategic village used to control the rural population"],
      ["Assimilado", "An African given limited rights as 'civilised' under Portuguese law"],
    ],
    explanation: "These terms describe leaders and policies on both sides.",
  });
  {
    const events = [
      "FRELIMO is formed in Dar es Salaam",
      "The armed struggle begins",
      "Mondlane is killed",
      "The coup in Lisbon",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1962, 1964, 1969 and 1974."],
      explanation: "June 1962; September 1964; February 1969; April 1974.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "FRELIMO was formed in {{blank:a}} under {{blank:b}}, and Mozambique became independent in 1975.",
    blanks: [
      { id: "a", accepted: ["1962"], choices: ["1962", "1957", "1969", "1974"] },
      { id: "b", accepted: ["Eduardo Mondlane"], choices: ["Eduardo Mondlane", "Samora Machel", "Joshua Nkomo", "Robert Mugabe"] },
    ],
    explanation: "FRELIMO was formed in 1962 under Eduardo Mondlane.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Who became president of FRELIMO in 1970 and of independent Mozambique in 1975?",
    accepted: ["Samora Machel", "Machel", "Samora Moises Machel"],
    wrong: ["Mondlane"],
    explanation: "**Samora Machel**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe Portuguese colonial rule in Mozambique before 1964.",
    points: ["Forced labour (chibalo) on roads, farms and plantations", "Forced growing of cash crops such as cotton at low prices", "Political repression: no African parties or unions and a secret police (PIDE)", "Very little education, with few Africans admitted as assimilados"],
    modelAnswer: "Africans were forced to work under the chibalo system and to grow cotton for Portuguese companies at low prices. African political parties and unions were banned and the secret police, PIDE, hunted critics. Very little education was provided and only a tiny number of Africans became assimilados.",
    explanation: "One mark for each feature described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how FRELIMO won support from the people of northern Mozambique.",
    points: [["In its liberated zones it ended forced labour and cash-crop demands from the Portuguese", 2], ["It provided schools, clinics and farming cooperatives, which gave people practical benefits", 2]],
    hints: ["Think of what people had suffered and what FRELIMO offered."],
    modelAnswer: "In liberated zones FRELIMO ended the forced labour and compulsory cash cropping that the Portuguese had imposed. It also provided schools, clinics and farming cooperatives, which gave people practical benefits and made them supporters.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how foreign states helped the armed struggle in Mozambique.",
    points: [["Tanzania gave bases, training grounds and political backing, and Zambia later helped too", 2], ["The OAU Liberation Committee, the Soviet Union and China supplied weapons, money and training", 2]],
    hints: ["Name at least two states or bodies."],
    modelAnswer: "Tanzania under Nyerere gave FRELIMO bases, training grounds and political backing, and Zambia helped later. The OAU Liberation Committee, the Soviet Union and China sent weapons, money and training.",
    explanation: "Credit developed support, not a bare list.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional Portuguese district administrator to his superiors, 1968",
        "The people of the north are quiet only where the army is present. Wherever the soldiers leave, the guerrillas return, and the people give them food. The resettlement villages are crowded and resented. We cannot hold this land by force alone."),
      "",
      source("Source B", "a recollection by a fictional Mozambican farmer in a liberated zone, told in 1975",
        "Before, we were taken to work on the cotton and the roads and paid nothing. When the movement came, they built a school and a clinic. They asked us for food, and we gave it, for they asked us as people."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What problems for Portugal does Source A show?", points: ["The guerrillas return when soldiers leave and the people feed them", "Resettlement villages are resented / force alone cannot hold the land"] }),
      P.manual({ label: "(b)", marks: 2, stem: "How does Source B explain the people's support for the guerrillas?", points: ["The Portuguese forced them to work unpaid on cotton and roads", "The movement provided a school and clinic and treated them with respect"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How reliable are these sources as evidence of why Portugal could not defeat FRELIMO?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A is a private official report, written to inform superiors, so the writer had reason to be honest about difficulties", 1], ["B is a supporter's account told at independence, so it may exaggerate the benefits of the movement", 1], ["Own knowledge: resettlement, loss of support, FRELIMO's schools and clinics and the cost of the wars are confirmed elsewhere", 1], ["Judgement: the two sources agree on the key point, that the people's support was with FRELIMO", 1]], modelAnswer: "Source A is a private report to superiors, so the writer had reason to be honest about the army's difficulties, though he saw the north only from the Portuguese side. Source B comes from a supporter of FRELIMO in the year of independence and may exaggerate the benefits. My own knowledge confirms that resettlement was resented and that FRELIMO provided schools and clinics, and that Portugal's three wars were costly. The two sources, from opposite sides, agree that the people's support was with FRELIMO, which makes the point reliable." }),
    ],
    hints: ["For (c), consider both authors' reasons for writing."],
    explanation: "Both sources are invented: an administrator's report and a farmer's recollection.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was foreign support the main reason for FRELIMO's success?",
    levels: levels(12),
    points: [
      ["Foreign support: bases and training in Tanzania, Zambia; OAU Liberation Committee; weapons from the USSR and China", 3],
      ["Internal factors: Mondlane and Machel's leadership, liberated zones with schools and clinics, peasant support", 3],
      ["Portuguese weaknesses: three colonial wars, cost, resettlement alienating people, and the Lisbon coup", 3],
      ["Supported judgement weighing the three", 3],
    ],
    hints: ["Weigh foreign aid against FRELIMO's own organisation and Portugal's problems."],
    modelAnswer: "Foreign support was important to FRELIMO's success but was not the main reason. Tanzania gave bases and training, Zambia helped later, and the OAU, the Soviet Union and China sent weapons. But aid would have achieved little without FRELIMO's own organisation: Mondlane and later Machel provided leadership, and in liberated zones FRELIMO won the peasants by ending forced labour and providing schools and clinics. Portugal's weaknesses also mattered, since it fought three colonial wars at once, its resettlement alienated people, and the cost led officers to overthrow the regime in April 1974. I conclude that FRELIMO's own organisation and Portugal's overstretch were the main reasons, with foreign support making the war possible.",
    explanation: "Credit explained factors and a judgement that weighs foreign support against the others.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the effectiveness of Portuguese counter-measures against FRELIMO.",
    levels: levels(8),
    points: [
      ["Measures: troops, bombing, Operation Gordian Knot, strategic villages and PIDE informers", 2],
      ["Effects: some success in slowing FRELIMO and controlling villagers", 2],
      ["Failures: resettlement and atrocities such as Wiriyamu alienated people; the war spread to Tete", 2],
      ["Judgement on effectiveness", 2],
    ],
    hints: ["Give the measures, their results, and why they failed."],
    modelAnswer: "Portuguese counter-measures were effective only in slowing FRELIMO. The army used bombing, large operations such as Gordian Knot in 1970 and strategic villages, and the PIDE used informers, so FRELIMO did not capture the cities. But the measures failed to defeat it. Resettlement and atrocities such as Wiriyamu alienated the people, and the war spread to Tete. I conclude that the counter-measures delayed but could not defeat FRELIMO, and in 1974 the Portuguese army itself ended the war.",
    explanation: "Credit measures and results, with a judgement.",
  });

  b.card("DEFINITION", "What was chibalo?", "Forced labour imposed on Africans in Portuguese Mozambique.");
  b.card("DEFINITION", "What was an aldeamento?", "A strategic village in which the Portuguese resettled rural people to control them and cut off guerrillas.");
  b.card("FACT", "When was FRELIMO formed and by whom was it led?", "25 June 1962 in Dar es Salaam, led by Eduardo Mondlane.");
  b.card("FACT", "When did the armed struggle in Mozambique begin?", "25 September 1964, in Cabo Delgado.");
  b.card("FACT", "Who became FRELIMO president after Mondlane's death?", "Samora Machel (from 1970); he became Mozambique's first president in 1975.");
  b.card("FACT", "What was the Carnation Revolution?", "The coup in Lisbon on 25 April 1974 that overthrew the Portuguese dictatorship.");
  b.card("CONCEPT", "How did FRELIMO win peasant support?", "By ending forced labour in liberated zones and providing schools, clinics and cooperatives.");
  b.card("CONCEPT", "Which states helped FRELIMO?", "Tanzania, Zambia, the OAU Liberation Committee, the Soviet Union and China.");
  b.card("CONCEPT", "What was the link between Mozambique and Zimbabwe's struggle?", "From 1972 ZANLA used Mozambique's liberated areas; Mozambique closed its border with Rhodesia in 1976.");
});
