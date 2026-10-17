// W2b: ahist.independence.foreign-policy (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.independence.foreign-policy", { file: "independence/foreign-policy", keyPrefix: "independence.foreign-policy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a policy of non-alignment mean?",
    options: [
      ["Not joining either side in the Cold War blocs", "Correct: non-aligned states judged issues on their merits."],
      ["Refusing to trade with any foreign country at all", "Non-alignment is about military and political blocs, not trade."],
      ["Joining the Western bloc in return for economic aid", "That would be alignment with one bloc."],
      ["Staying out of every international organisation", "Non-aligned states joined the UN and their own movement."],
    ],
    answer: "A",
    explanation: "Non-alignment meant staying outside the two Cold War blocs led by the United States and the Soviet Union.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which city did Zimbabwe host the Non-Aligned Movement summit of September 1986?",
    options: [
      ["Harare", "Correct: Robert Mugabe became chairman of the movement."],
      ["Bulawayo", "The summit was held in the capital, not Bulawayo."],
      ["Lusaka", "SADCC was founded at Lusaka in 1980, but the 1986 summit was in Harare."],
      ["Maputo", "Maputo is the capital of Mozambique."],
    ],
    answer: "A",
    explanation: "The eighth NAM summit met in Harare in September 1986, and Zimbabwe's leader chaired the movement until 1989.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Zimbabwe send troops to protect the Beira Corridor in Mozambique?",
    options: [
      ["The route carried Zimbabwe's trade and was attacked by RENAMO", "Correct: security and trade were both at stake."],
      ["Zimbabwe wished to annex the Mozambican port of Beira and rule it as its own", "Zimbabwe wanted use of the route, not control of territory."],
      ["Britain ordered Zimbabwe to take over the Mozambican army as a Commonwealth duty", "No such order was given."],
      ["The United Nations asked for a peacekeeping force in 1975 and Zimbabwe obeyed", "The troops were sent from 1982, at Mozambique's request."],
    ],
    answer: "A",
    explanation: "Landlocked Zimbabwe needed the road, rail and pipeline to Beira, and RENAMO, backed by South Africa, attacked them.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Which group of states were the Frontline States in the 1980s?",
    options: [
      ["Independent southern African states opposed to apartheid and supporting liberation", "Correct: Zimbabwe joined in 1980."],
      ["Western powers that sent their own troops to fight against liberation in southern Africa", "The Frontline States were African states."],
      ["The members of NATO whose borders lay close to the Soviet Union in Europe", "This is a different alliance in a different region."],
      ["Colonial territories that were still governed from Lisbon throughout the 1980s", "They were independent states."],
    ],
    answer: "A",
    hints: ["They stood on the front line against white-minority rule."],
    explanation: "The Frontline States, including Zambia, Mozambique, Tanzania, Angola and Botswana, and Zimbabwe from 1980, supported liberation and bore the cost of attacks.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Zimbabwe condemn apartheid but not break all economic links with South Africa?",
    options: [
      ["Its trade routes and railways depended on South Africa and it feared retaliation", "Correct: dependence limited its options."],
      ["South Africa had agreed to end apartheid in exchange for continued trade and rail links", "Apartheid continued until the 1990s."],
      ["The United Nations had ordered Zimbabwe to keep its trade with South Africa open", "The UN had no such order."],
      ["Zimbabwe wished to join the apartheid government's alliance against its neighbours", "Zimbabwe opposed apartheid."],
    ],
    answer: "A",
    hints: ["Think of geography and of South African power."],
    explanation: "Zimbabwe was landlocked and its rail links ran through South Africa; the government was also wary of South African raids and border closures.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "Which agreement of October 1992 ended the war in Mozambique, allowing Zimbabwean troops to withdraw?",
    options: [
      ["The Rome General Peace Agreement, signed in Italy", "Correct: it was signed in Rome in October 1992."],
      ["The Lancaster House Agreement on Zimbabwe's independence", "That settled Zimbabwe's own independence in 1979."],
      ["The Lusaka Ceasefire Agreement on the Congo", "That concerned the DRC in 1999."],
      ["The Commonwealth's Harare Declaration", "That was a Commonwealth declaration of 1991."],
    ],
    answer: "A",
    hints: ["Think of an Italian city."],
    explanation: "The Rome General Peace Agreement of October 1992 ended the war between FRELIMO and RENAMO.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the 1998 intervention in the Democratic Republic of Congo is best supported?",
    options: [
      ["Zimbabwe said it acted to defend a SADC member, while critics questioned its cost and SADC's approval", "Correct: it records both views."],
      ["All SADC members agreed that SADC had formally authorised the intervention, without dispute", "South Africa and others questioned this."],
      ["Zimbabwe fought alone, without help from any other African state at all", "Angola and Namibia also sent troops."],
      ["Historians agree on the motives and results of the intervention in every respect", "Views differ on motives and results."],
    ],
    answer: "A",
    hints: ["Choose the statement that does not take one side."],
    explanation: "The intervention was defended as a duty to a fellow member and criticised for its cost and its legal basis; Angola and Namibia also sent troops.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point best supports the view that Zimbabwe's non-alignment was practical rather than strict?",
    options: [
      ["It took aid and trade from Western states while also keeping friendly ties with socialist states", "Correct: it dealt with both blocs."],
      ["It hosted the 1986 summit of the Non-Aligned Movement in Harare and chaired the group", "Hosting shows membership, not flexibility."],
      ["It opposed apartheid in the United Nations, the OAU and the Commonwealth", "This shows a position on South Africa."],
      ["It joined the OAU, which had been founded in 1963 in Addis Ababa", "Joining the OAU says nothing about the blocs."],
    ],
    answer: "A",
    hints: ["Look for evidence of dealing with both sides."],
    explanation: "Zimbabwe received much aid and trade from Western states and the international financial bodies, while keeping ties with China, the USSR and others.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "Zimbabwe became a member of the United Nations in 1980.", answer: true,
    explanation: "Zimbabwe joined the UN, the OAU and the Commonwealth in 1980.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "SADCC was formed in 1980 to increase the dependence of its members on South Africa.", answer: false,
    explanation: "SADCC aimed to reduce dependence on South Africa for transport and trade.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Zimbabwe allowed the ANC to keep armed bases on its soil in the 1980s.", answer: false,
    hints: ["Remember the risk from South African attacks."],
    explanation: "Zimbabwe gave political support to the ANC but did not allow armed bases, partly out of fear of South African retaliation.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term or place to its meaning.",
    pairs: [
      ["RENAMO", "A rebel movement in Mozambique backed by apartheid South Africa after 1980"],
      ["Beira Corridor", "The road, rail and pipeline route from Zimbabwe to the Mozambican port"],
      ["Harare Declaration", "The Commonwealth statement of 1991 on democracy and human rights"],
      ["Destabilisation", "South Africa's policy of weakening neighbouring states"],
    ],
    explanation: "These are the key terms of Zimbabwe's foreign policy.",
  });
  {
    const events = [
      "SADCC is founded at Lusaka",
      "The Non-Aligned Summit meets in Harare",
      "The Rome peace agreement ends the war in Mozambique",
      "Zimbabwe sends troops to the DRC",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1980, 1986, 1992 and 1998."],
      explanation: "April 1980; September 1986; October 1992; August 1998.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Zimbabwean troops protected the {{blank:a}} Corridor in {{blank:b}} from 1982.",
    blanks: [
      { id: "a", accepted: ["Beira"], choices: ["Beira", "Limpopo", "Walvis Bay", "Tazara"] },
      { id: "b", accepted: ["Mozambique"], choices: ["Mozambique", "Botswana", "Zambia", "Angola"] },
    ],
    explanation: "The Beira Corridor in Mozambique.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which rebel movement attacked the Beira Corridor during the war in Mozambique? Give its name.",
    accepted: ["RENAMO", "Renamo", "Mozambique National Resistance", "MNR"],
    wrong: ["FRELIMO"],
    explanation: "**RENAMO**, backed first by Rhodesia and then by South Africa.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the aims of Zimbabwe's foreign policy after 1980.",
    points: ["To defend independence and territorial integrity", "To support the end of apartheid and colonialism in southern Africa", "To promote economic development through trade, aid and regional co-operation", "To follow a policy of non-alignment and work through the UN, OAU and Commonwealth"],
    modelAnswer: "The government wished to defend the country's independence and borders. It aimed to support the end of apartheid and colonialism in southern Africa, to promote development through trade, aid and regional co-operation, and to remain non-aligned while working through the UN, the OAU and the Commonwealth.",
    explanation: "One mark for each aim described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Frontline States and SADCC were important to Zimbabwe in the 1980s.",
    points: [["They gave a way to support the liberation of Namibia and South Africa and to share defence and diplomacy against South African pressure", 2], ["SADCC aimed to reduce dependence on South African transport and trade, which was vital for a landlocked state, and Zimbabwe could lead in the food sector", 2]],
    hints: ["Think of both politics and trade."],
    modelAnswer: "The Frontline States let Zimbabwe support the liberation of Namibia and South Africa and share diplomacy and defence against South African pressure. SADCC aimed to reduce the dependence of landlocked members on South African transport and trade, and Zimbabwe could play a leading role in food security.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Zimbabwe's intervention in the Democratic Republic of Congo in 1998 was controversial.",
    points: [["Supporters said it defended a SADC member against invasion, but other SADC members, such as South Africa, doubted that SADC had authorised it", 2], ["Critics argued that it was costly for a country with a weak budget and raised questions about business interests, while supporters said it served regional security", 2]],
    hints: ["Give a legal question and a cost question."],
    modelAnswer: "The government said that it was defending a fellow SADC member, but South Africa and others doubted that SADC had authorised the action. Critics also said the intervention cost a great deal for a country with a weak budget and raised questions about business interests, while supporters said it served regional security.",
    explanation: "Credit developed reasons from both sides.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a briefing note by a fictional Zimbabwean transport official, 1985",
        "Every tonne of cargo that goes by Maputo or Beira instead of Durban reduces our need to ask Pretoria for favours. But the line is cut each month by armed bands. Unless we guard it, the only open road for our goods runs south."),
      "",
      source("Source B", "a letter to a newspaper from a fictional Harare teacher, 1986",
        "We are told our soldiers in Mozambique are defending our independence. I do not doubt it. But the money for helicopters and boots could have bought books for my pupils. A government must choose, and I would like to know how it chooses."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What reason does Source A give for guarding the line to the coast?", points: ["To reduce dependence on South Africa / the route to Beira and Maputo carries goods", "Armed bands cut the line every month, so otherwise the only open route runs south"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What criticism is made in Source B?", points: ["The cost of soldiers and equipment in Mozambique", "The money could have been spent on schools and books"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do the sources agree about Zimbabwe's military role in Mozambique?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Agree that the troops serve the country's interests, with B accepting that they defend independence", 1], ["Disagree on cost: A sees guarding the line as necessary; B asks whether the money is better spent on schools", 1], ["Provenance: A is an official, likely to justify policy; B is a teacher asking about priorities", 1], ["Own knowledge: the corridor was Zimbabwe's shortest route to the sea, and the war was costly", 1]], modelAnswer: "The sources partly agree. Source A, a transport official, treats guarding the line as necessary to reduce dependence on South Africa, and Source B, a teacher, accepts that the soldiers may be defending independence. They differ over cost, since B asks whether the money would be better spent on books. Because A is an official it is likely to justify policy, while B is one citizen asking about priorities. My own knowledge supports both: the Beira route was the shortest route to the sea, but the operation was costly." }),
    ],
    hints: ["For (c), look for a point of agreement as well as a point of disagreement."],
    explanation: "Both sources are invented: a transport official's note and a teacher's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was security the main aim of Zimbabwe's foreign policy between 1980 and 2000?",
    levels: levels(12),
    points: [
      ["Security: the Beira Corridor, defence against South African destabilisation, the Frontline States", 3],
      ["Economic aims: SADCC, reducing dependence on South Africa, trade and aid, the Commonwealth and IMF links", 3],
      ["Solidarity and principle: opposition to apartheid, support for Namibia and the ANC, NAM leadership, the UN and OAU", 3],
      ["Interaction of the aims; the DRC as a mixture of motives", 1],
      ["Supported judgement", 2],
    ],
    hints: ["Separate security, economic and solidarity aims, then say which was strongest."],
    modelAnswer: "Security was a very important aim of Zimbabwe's foreign policy, but not the only one. Troops guarded the Beira Corridor and the Frontline States shared defence and diplomacy in the face of South African destabilisation. But economic aims were closely linked: SADCC sought to reduce dependence on South Africa, and trade, aid and Commonwealth and IMF ties supported development. Solidarity and principle also mattered, as in the condemnation of apartheid, support for the liberation of Namibia and South Africa, leadership of the Non-Aligned Movement, and active membership of the UN and the OAU. The DRC intervention mixed regional duty with economic interests. I conclude that security was the most urgent aim in the 1980s, but that the other aims were closely connected, since a landlocked country's security and economy depended on one another.",
    explanation: "Credit three kinds of aim with examples and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the Frontline States and SADCC in Zimbabwe's relations with South Africa in the 1980s.",
    levels: levels(8),
    points: [
      ["Frontline States: shared diplomacy, support for liberation and mutual defence", 2],
      ["SADCC: a plan to cut dependence on South African transport and trade; Zimbabwe's food sector and the Beira route", 2],
      ["Limits: South African destabilisation continued, and dependence on its railways and trade remained", 2],
      ["Judgement on how far they changed relations", 2],
    ],
    hints: ["Separate what the groupings aimed at from what they achieved."],
    modelAnswer: "The Frontline States and SADCC gave Zimbabwe a collective voice and a plan for reducing dependence on South Africa. The Frontline States shared diplomacy and supported liberation, while SADCC worked to develop alternative transport routes such as Beira and gave Zimbabwe a leading role in food security. But their power was limited. South Africa continued to destabilise its neighbours, and Zimbabwe remained dependent on South African railways and trade. I conclude that the groupings were important in giving support and direction, but they could not by themselves end dependence or South African pressure.",
    explanation: "Credit explained roles, limits and a judgement.",
  });

  b.card("DEFINITION", "What is non-alignment?", "A policy of not joining either Cold War bloc and judging issues on their merits; the Non-Aligned Movement brought such states together.");
  b.card("DEFINITION", "Who were the Frontline States?", "Independent southern African states that opposed white-minority rule and supported liberation: first Angola, Botswana, Mozambique, Tanzania and Zambia, joined by Zimbabwe in 1980 and Namibia in 1990.");
  b.card("DEFINITION", "What was destabilisation?", "Apartheid South Africa's policy of weakening neighbouring states by raids, support for rebel groups such as RENAMO and attacks on transport routes.");
  b.card("FACT", "What happened in Harare in September 1986?", "The Non-Aligned Movement summit; Zimbabwe's leader became chairman of the movement until 1989.");
  b.card("FACT", "What was the Beira Corridor?", "The road, rail and pipeline route from Zimbabwe to Beira in Mozambique, guarded by Zimbabwean troops from 1982 until the Rome agreement of 1992.");
  b.card("FACT", "What was the Harare Declaration (1991)?", "A Commonwealth statement of principles on democracy and human rights, adopted at the Harare meeting in October 1991.");
  b.card("FACT", "When did Zimbabwe send troops to the DRC?", "August 1998, with Angola and Namibia, to support the government against rebels.");
  b.card("CONCEPT", "Why was Zimbabwe interested in the Beira Corridor?", "As a landlocked country it needed a short route to the sea that did not rely on South Africa.");
  b.card("CONCEPT", "Why was Zimbabwe's foreign policy cautious towards South Africa?", "It depended on South African railways and trade and risked raids and border closures if it allowed armed bases.");
});
