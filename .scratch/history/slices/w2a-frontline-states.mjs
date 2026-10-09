// Slice W2a: the Frontline States and external support for the liberation struggle (ZIMSEC topic 13.1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.cooperation.frontline-states", { file: "cooperation/frontline-states", keyPrefix: "cooperation.frontline-states" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which leader was chairman of the Frontline States?",
    options: [
      ["Julius Nyerere of Tanzania", "Correct: Nyerere chaired the group."],
      ["Hastings Banda of Malawi", "Malawi was not a member; Banda kept ties with South Africa."],
      ["John Vorster of South Africa", "Vorster led the minority government the group opposed."],
      ["Ian Smith of Rhodesia", "Smith led the Rhodesian government."],
    ],
    answer: "A",
    explanation: "**Julius Nyerere** of Tanzania chaired the Frontline States.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which country was NOT one of the original Frontline States?",
    options: [
      ["Malawi", "Correct: Malawi kept close ties with South Africa."],
      ["Botswana", "Botswana was a member."],
      ["Angola", "Angola was a member from 1976."],
      ["Zambia", "Zambia was a founding member."],
    ],
    answer: "A",
    explanation: "The members were Tanzania, Zambia, Botswana, Mozambique and Angola; **Malawi** was not a member.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Mozambique's independence in 1975 change the liberation war?",
    options: [
      ["ZANLA could use bases along the long eastern border", "Correct: infiltration spread the war across the country."],
      ["Mozambique sent its army to occupy Salisbury", "Mozambique did not invade Rhodesia."],
      ["It ended all fighting in Rhodesia at once", "The war intensified after 1975."],
      ["ZIPRA moved its headquarters from Lusaka to Maputo at once", "ZAPU and ZIPRA remained based in Zambia."],
    ],
    answer: "A",
    explanation: "FRELIMO let **ZANLA** set up rear bases along a border over 1,000 km long, so guerrillas could enter at many points.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which country hosted ZAPU's headquarters during the armed struggle?",
    options: [
      ["Zambia", "Correct: ZAPU and ZIPRA were based in and around Lusaka."],
      ["Mozambique", "Mozambique hosted ZANLA's rear bases after 1975."],
      ["Botswana", "Botswana was mainly a transit country for refugees and recruits."],
      ["Angola", "Angola hosted some ZIPRA training, not ZAPU's headquarters."],
    ],
    answer: "A",
    explanation: "**Zambia** hosted ZAPU's headquarters in Lusaka.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the Frontline States encourage the formation of the Patriotic Front in 1976?",
    options: [
      ["To present a united nationalist side in negotiations", "Correct: they wanted ZANU and ZAPU to speak with one voice."],
      ["To replace the OAU with a new organisation", "The Patriotic Front was an alliance of ZANU and ZAPU, not a replacement for the OAU."],
      ["To support the internal settlement of 1978", "The Frontline States rejected the internal settlement."],
      ["To form a single army under Rhodesian government command", "The Patriotic Front fought the Rhodesian forces."],
    ],
    answer: "A",
    hints: ["Think about the Geneva Conference later in 1976."],
    explanation: "The **Patriotic Front** (October 1976) united ZANU and ZAPU for negotiations such as Geneva and later Lancaster House.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Zambia build the TAZARA railway to Dar es Salaam?",
    options: [
      ["To reduce its dependence on routes through Rhodesia", "Correct: the border was closed and routes south were risky."],
      ["To carry ZANLA guerrillas into Mozambique", "TAZARA runs from Zambia to Tanzania's coast."],
      ["To export Rhodesian tobacco around international sanctions", "Zambia supported sanctions."],
      ["To link the Copperbelt with Beira", "Beira is in Mozambique; TAZARA goes to Dar es Salaam."],
    ],
    answer: "A",
    hints: ["Think about where Zambia's copper had to go."],
    explanation: "Landlocked Zambia needed a route to the sea that avoided Rhodesia; **TAZARA** was completed in 1975 with Chinese help.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that the Frontline States sometimes pressed the liberation movements to compromise?",
    options: [
      ["Machel urged acceptance of the Lancaster House terms", "Correct: Mozambique's costs made it want a settlement."],
      ["Tanzania hosted the OAU Liberation Committee", "This shows support, not pressure to compromise."],
      ["Mozambique closed its border with Rhodesia in 1976", "This put pressure on Smith, not the nationalists."],
      ["Botswana took in refugees and recruits from Rhodesia", "This shows support, not pressure."],
    ],
    answer: "A",
    hints: ["Look for pressure on the nationalists rather than on Smith."],
    explanation: "During Lancaster House, **Machel** and Kaunda urged the Patriotic Front to accept the agreement because the war was costing their countries dearly.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mozambique closed its border with Rhodesia in March 1976.",
    answer: true,
    explanation: "True. It also applied sanctions, cutting Rhodesia's rail links to Beira and Maputo.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "China mainly supported ZIPRA, and the Soviet Union mainly supported ZANLA.",
    answer: false,
    explanation: "False. It was the other way round: China mainly supported ZANLA and the Soviet Union mainly supported ZIPRA.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each Frontline State with its leader during the liberation war.",
    pairs: [
      ["Tanzania", "Julius Nyerere"],
      ["Zambia", "Kenneth Kaunda"],
      ["Botswana", "Seretse Khama"],
      ["Mozambique", "Samora Machel"],
    ],
    explanation: "Nyerere (Tanzania), Kaunda (Zambia), Khama (Botswana), Machel (Mozambique); Angola was led by Agostinho Neto.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Lancaster House agreement signed",
      "OAU Liberation Committee set up",
      "Patriotic Front formed",
      "Victoria Falls bridge conference",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["The OAU was founded in 1963."],
    explanation: "Liberation Committee 1963; Victoria Falls conference August 1975; Patriotic Front October 1976; Lancaster House December 1979.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The OAU Liberation Committee had its headquarters in {{blank:a}}. In 1979 a Commonwealth meeting in {{blank:b}} agreed that Britain should call a new conference.",
    blanks: [
      { id: "a", accepted: ["Dar es Salaam"], choices: ["Dar es Salaam", "Addis Ababa", "Gaborone", "Maputo"] },
      { id: "b", accepted: ["Lusaka"], choices: ["Lusaka", "Geneva", "Harare", "Nairobi"] },
    ],
    explanation: "The Liberation Committee sat in **Dar es Salaam**; the Commonwealth meeting of August 1979 was in **Lusaka**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the camp in Mozambique attacked by Rhodesian forces on 9 August 1976.",
    accepted: ["Nyadzonia", "Nyadzonya", "Nyadzonia camp"],
    wrong: ["Chimoio"],
    explanation: "**Nyadzonia** was attacked on 9 August 1976; many refugees were killed. Chimoio was attacked in November 1977.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "List **five** aims of the Frontline States.",
    points: [
      "End colonial/minority rule in southern Africa.",
      "Co-ordinate support (bases, training, supplies) for liberation movements.",
      "Press for negotiations leading to majority rule.",
      "Encourage unity among liberation movements.",
      "Reduce economic dependence on Rhodesia and South Africa / lobby international opinion.",
    ],
    modelAnswer: "To end minority rule; to co-ordinate support for liberation movements; to press for negotiated majority rule; to encourage unity among the movements; to reduce economic dependence on Rhodesia and South Africa.",
    explanation: "One mark per aim.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the costs borne by the Frontline States for supporting Zimbabwe's liberation.",
    points: [
      "Rhodesian raids on camps (Nyadzonia 1976, Chimoio 1977, Freedom Camp 1978).",
      "Many refugees and recruits killed.",
      "Bombing of bridges, roads and railways.",
      "Zambia lost cheap trade routes; costly alternatives (TAZARA).",
      "Mozambique lost transit revenue and migrant earnings.",
      "Cost of caring for refugees / destabilisation such as RENAMO.",
    ],
    hints: ["Think about military, economic and social costs."],
    modelAnswer: "Rhodesian forces raided camps at Nyadzonia (1976) and Chimoio (1977) in Mozambique and Freedom Camp (1978) in Zambia, killing many refugees and recruits, and they bombed bridges and railways. Zambia lost its cheapest trade routes and had to rely on the costly TAZARA railway, while Mozambique lost transit revenue and migrant workers' earnings. The states also had to house and feed tens of thousands of refugees, and Rhodesia backed the RENAMO rebels in Mozambique.",
    explanation: "One mark per cost.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the Frontline States helped to bring about the Lancaster House Conference.",
    points: [
      "Identifies diplomatic pressure (Lusaka Commonwealth meeting 1979).",
      "Explains: helped persuade Britain to call an all-party conference.",
      "Identifies the military pressure made possible by bases.",
      "Explains: the war stretched Rhodesia so Smith/Muzorewa had to negotiate.",
    ],
    hints: ["Think about diplomacy and about the war itself."],
    modelAnswer: "At the Commonwealth meeting in Lusaka in August 1979, Kaunda, Nyerere and others helped persuade Britain to call an all-party conference rather than recognise the Muzorewa government. Their bases also allowed ZANLA and ZIPRA to expand the war, which stretched Rhodesia's forces and economy and forced its leaders to negotiate.",
    explanation: "Two marks per developed way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a letter from a fictional Zambian schoolteacher to a newspaper in Lusaka, 1978", "Our railway south is closed, our maize and fertiliser cost twice what they did, and last month the planes came again. Some say we should stop helping our brothers across the Zambezi. I say no. Until Zimbabwe is free, Zambia cannot be safe or prosperous. We must carry this burden a little longer.")}`,
    hints: ["Separate the costs from the reasons for continuing."],
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify **three** costs to Zambia mentioned in Source A.", points: [
        "The railway south was closed.",
        "Higher prices of maize and fertiliser.",
        "Air raids (\"the planes came again\").",
      ], explanation: "One mark per cost from the source." }),
      P.manual({ label: "(b)", marks: 3, stem: "Why, according to the writer, should Zambia continue its support?", points: [
        "Zambia cannot be safe while Zimbabwe is not free.",
        "Zambia cannot be prosperous while the war continues.",
        "Solidarity with \"our brothers\" across the Zambezi.",
      ], explanation: "Three reasons from the source." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How typical of the experience of the Frontline States is Source A? Use the source and your own knowledge.", points: [
        "Typical: Zambia lost trade routes after the border closure; costly alternatives.",
        "Typical: Rhodesian raids hit Zambia (Freedom Camp 1978) and Mozambique (Nyadzonia, Chimoio).",
        "Typical: Mozambique also lost revenue after closing its border in 1976.",
        "Less typical: Botswana and Tanzania suffered fewer raids; Mozambique also faced RENAMO.",
        "Provenance: one person's view; some Zambians wanted to stop.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The source is typical in many ways. Zambia's trade routes through Rhodesia were closed and it had to use costly alternatives such as TAZARA, which raised prices. Rhodesian aircraft attacked targets in Zambia, including Freedom Camp in October 1978. Mozambique suffered similar costs after closing its border in 1976, losing revenue, and its camps at Nyadzonia and Chimoio were raided.\n\nHowever, the burden was not the same everywhere: Tanzania was further from the fighting, Botswana suffered fewer raids, and Mozambique also faced the RENAMO rebels. The writer is one teacher, and he admits that some Zambians wanted to stop helping.\n\nOverall the source is typical of the heavy costs borne by Zambia and Mozambique, though less so of the other Frontline States.", explanation: "Use own knowledge to test the source." }),
    ],
    explanation: "Source-based practice question on the costs of support (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), compare external help with the struggle inside Zimbabwe."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the support given to the liberation movements by countries and organisations outside the Frontline States.", points: [
        "OAU Liberation Committee: money and supplies.",
        "Soviet Union: weapons and training for ZIPRA.",
        "China: weapons and training for ZANLA.",
        "UN sanctions and non-recognition / Cuba's training / churches and solidarity groups.",
      ], explanation: "Four points." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far was the support of the Frontline States the main reason for Zimbabwe's independence in 1980?", points: [
        ["Frontline support: bases, training, transit; Mozambique 1975 transformed the war.", 2],
        ["Frontline support: diplomacy, Patriotic Front, Lusaka 1979, pressure at Lancaster House.", 2],
        ["Other: guerrillas' commitment and support of rural people inside Zimbabwe.", 2],
        ["Other: sanctions, international pressure, South Africa's changing stance, Rhodesia's economic strain.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "The Frontline States were very important. Their territory gave the guerrillas bases, training camps and transit routes. When Mozambique became independent in 1975, ZANLA could cross Rhodesia's long eastern border, and the war spread across the country. Frontline leaders encouraged the Patriotic Front, rejected the internal settlement, helped persuade Britain at Lusaka in 1979 to call a conference and pushed both sides at Lancaster House.\n\nHowever, the main force was the struggle inside Zimbabwe. Thousands of young people joined ZANLA and ZIPRA, and rural people fed and hid the guerrillas at great risk. Other pressures also mattered: UN sanctions, the costs of the war to Rhodesia's economy, emigration of settlers and South Africa's growing reluctance to back Smith.\n\nOverall the Frontline States were an essential partner without which the war could not have reached its scale, but independence came mainly from the armed struggle inside the country, supported from outside.", explanation: "Both sides plus judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Frontline States", "Independent southern African states (Tanzania, Zambia, Botswana, Mozambique, Angola; Zimbabwe from 1980) that co-ordinated support for liberation from the mid-1970s.");
  b.card("FACT", "Who chaired the Frontline States?", "Julius Nyerere of Tanzania.");
  b.card("FACT", "Which country hosted ZAPU's headquarters?", "Zambia (Lusaka).");
  b.card("FACT", "Which country hosted ZANLA's rear bases after 1975?", "Mozambique.");
  b.card("FACT", "When did Mozambique close its border with Rhodesia?", "March 1976.");
  b.card("FACT", "Name three camps raided by Rhodesian forces.", "Nyadzonia (August 1976) and Chimoio (November 1977) in Mozambique; Freedom Camp (October 1978) in Zambia.");
  b.card("FACT", "Where was the OAU Liberation Committee based?", "Dar es Salaam, Tanzania (set up in 1963).");
  b.card("CONCEPT", "How did the Frontline States help the liberation struggle?", "Bases and training, transit for recruits and refugees, diplomacy (Patriotic Front, Lusaka 1979), pressure in negotiations, sanctions and border closures.");
  b.card("CONCEPT", "Which outside powers backed which army?", "The Soviet Union mainly backed ZIPRA; China mainly backed ZANLA.");
});
