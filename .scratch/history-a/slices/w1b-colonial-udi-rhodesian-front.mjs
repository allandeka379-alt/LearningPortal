// W1b: ahist.colonial.udi-rhodesian-front (ZIMSEC topic 8).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.colonial.udi-rhodesian-front", { file: "colonial/udi-rhodesian-front", keyPrefix: "colonial.udi-rhodesian-front" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date did the Rhodesian government declare UDI?",
    options: [
      ["11 November 1965", "Correct: the Unilateral Declaration of Independence."],
      ["2 March 1970, when the republic was proclaimed", "This is the date of the republic."],
      ["31 December 1963, when the Federation was dissolved", "This is the date the Federation ended."],
      ["18 April 1980", "This is the date of Zimbabwe's independence."],
    ],
    answer: "A",
    explanation: "UDI was declared on 11 November 1965 by the government of Ian Smith.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the policy of NIBMAR announced by Britain after UDI?",
    options: [
      ["No independence before majority rule", "Correct: independence was to follow majority rule."],
      ["No international body to be involved in Rhodesia", "NIBMAR did not mean that."],
      ["No imports of British manufactured goods into Rhodesia", "This was not the meaning."],
      ["No intervention by the British military in Rhodesia", "The letters stand for a political principle."],
    ],
    answer: "A",
    explanation: "NIBMAR meant that Britain would not grant independence until the African majority could govern.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which party won the Southern Rhodesian general election of December 1962?",
    options: [
      ["The Rhodesian Front", "Correct: Winston Field became prime minister."],
      ["The African National Congress of Nyasaland", "This party worked in Nyasaland."],
      ["The United Federal Party, which had governed before 1962", "It lost the election."],
      ["ZANU, led by Ndabaningi Sithole", "ZANU was formed in 1963 and had no seats."],
    ],
    answer: "A",
    explanation: "The Rhodesian Front, formed in 1962, won the election in December of that year.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the result of the Pearce Commission of 1972?",
    options: [
      ["It found that the Smith-Home proposals were not acceptable to most Africans", "Correct: the proposals were rejected."],
      ["It found that most Africans supported the proposals and that Britain should accept them", "The opposite was found."],
      ["It recommended that Britain should recognise UDI without conditions", "It recommended no such thing."],
      ["It ended UN sanctions against Rhodesia in 1972", "Sanctions continued."],
    ],
    answer: "A",
    hints: ["The African National Council campaigned against the proposals."],
    explanation: "The Commission under Lord Pearce tested opinion and reported that the majority of Africans rejected the proposals.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the Land Tenure Act of 1969 do?",
    options: [
      ["It replaced the Land Apportionment Act and divided land in roughly equal parts for the two races", "Correct: equal areas for a very unequal population."],
      ["It gave all land in the country back to Africans and abolished the European farming areas at once", "It did not."],
      ["It abolished the reserves", "The African areas remained."],
      ["It allowed Africans to buy land anywhere in the country, including the European farming areas", "It kept the racial division."],
    ],
    answer: "A",
    hints: ["Europeans were a small minority."],
    explanation: "The Act confirmed racial division of land, with about equal areas for Europeans and Africans.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which method helped Rhodesia to survive sanctions in the late 1960s?",
    options: [
      ["Trade with South Africa and Portuguese-ruled Mozambique and Angola", "Correct: its neighbours provided oil and markets."],
      ["Full recognition of UDI by the United Nations", "The UN did not recognise UDI."],
      ["A large loan from the British government", "Britain imposed sanctions."],
      ["The end of tobacco farming and mining in Rhodesia within a few years", "Farming and mining continued."],
    ],
    answer: "A",
    hints: ["Think about the borders that stayed open."],
    explanation: "South Africa and Portugal traded with Rhodesia and supplied oil, so sanctions did not cut off the country at first.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why the settlement attempts of 1966-72 failed?",
    options: [
      ["The RF would not accept a clear path to majority rule, and Africans rejected terms that delayed it", "Correct: the sides could not agree on majority rule."],
      ["Britain refused to meet Smith at any stage, and no talks of any kind were held before 1971", "Talks took place on HMS Tiger and HMS Fearless."],
      ["The African leaders signed every proposal in 1971 but the British government rejected them afterwards", "Africans rejected the 1971 proposals."],
      ["The UN banned all negotiations with Rhodesia", "There was no such ban."],
    ],
    answer: "A",
    hints: ["Think about the issue at the centre of all the talks."],
    explanation: "The talks failed on the central question of how soon and by what guarantee the African majority would govern.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about the internal settlement of 1978-79 is best supported?",
    options: [
      ["It gave African leaders office but left white control of key institutions and failed to win recognition", "Correct: it did not end the war."],
      ["It won recognition from Britain and the UN, which ended sanctions at once and brought the war to a close", "Neither recognised it."],
      ["It ended the liberation war in 1979", "The war continued."],
      ["It gave ZANU and ZAPU a majority in the new parliament", "They rejected it as the Patriotic Front."],
    ],
    answer: "A",
    hints: ["Who held the army, police and civil service?"],
    explanation: "White control of the army, police, civil service and judiciary continued, the Patriotic Front rejected it, and the war went on.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Ian Smith became prime minister in April 1964.",
    answer: true,
    explanation: "True. He succeeded Winston Field.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The UN imposed comprehensive mandatory sanctions on Rhodesia in 1968.",
    answer: true,
    explanation: "True. Selective sanctions came in December 1966 and comprehensive ones in May 1968.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Sanctions alone brought the Rhodesian government to the negotiating table in 1966.",
    answer: false,
    hints: ["Think of what helped the economy to survive."],
    explanation: "False. The economy survived the early years with help from neighbours, and sanctions worked together with the war and the loss of Mozambique later.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["UDI", "Declaration of independence without British consent"],
      ["Sanctions", "Trade and financial measures to pressure a government"],
      ["NIBMAR", "No independence before majority rule"],
      ["Land Tenure Act", "The 1969 law that divided land equally by race"],
    ],
    explanation: "These terms are needed throughout the topic.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each person with his role.",
    pairs: [
      ["Ian Smith", "Rhodesian prime minister who declared UDI"],
      ["Harold Wilson", "British prime minister during UDI and the Tiger and Fearless talks"],
      ["Bishop Abel Muzorewa", "Led the African National Council against the 1971 proposals and became prime minister in 1979"],
      ["Lord Pearce", "Led the commission that tested African opinion in 1972"],
    ],
    hints: ["Think of who negotiated, who campaigned and who tested opinion."],
    explanation: "These four people recur in answers on the period.",
  });
  {
    const events = [
      "UDI is declared",
      "UN comprehensive sanctions",
      "The republic is proclaimed",
      "The internal settlement agreement is signed",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1965, 1968, 1970 and 1978."],
      explanation: "11 November 1965; May 1968; 2 March 1970; 3 March 1978.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The talks between Harold Wilson and Ian Smith in 1966 took place aboard HMS {{blank:a}}, and the talks of 1968 aboard HMS {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Tiger"], choices: ["Tiger", "Fearless", "Victory", "Ark Royal"] },
      { id: "b", accepted: ["Fearless"], choices: ["Tiger", "Fearless", "Hood", "Warspite"] },
    ],
    explanation: "HMS Tiger in December 1966 and HMS Fearless in October 1968.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Who was the Rhodesian prime minister when UDI was declared?",
    accepted: ["Ian Smith", "Smith", "Ian Douglas Smith"],
    wrong: ["Winston Field"],
    explanation: "**Ian Smith**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how Rhodesia coped with sanctions.",
    points: ["South Africa and Portuguese Mozambique traded and supplied oil", "Factories were built to make goods once imported (import substitution)", "Farmers switched to crops such as maize and cotton, and mining continued", "Exports were rerouted through third countries"],
    modelAnswer: "South Africa and Portuguese Mozambique traded with Rhodesia and supplied oil. New factories made goods that had once been imported. Farmers switched to crops such as maize and cotton, mining continued, and exports were sold through third countries.",
    explanation: "One mark for each method described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Pearce Commission rejected the Smith-Home proposals.",
    points: [["Most Africans rejected the proposals because they delayed majority rule and gave no firm guarantee", 2], ["The African National Council under Muzorewa campaigned against them, and the Commission found them unacceptable to the majority", 2]],
    hints: ["Think about the African response."],
    modelAnswer: "Most Africans rejected the proposals because they delayed majority rule and gave no firm guarantee that it would come. The African National Council under Bishop Muzorewa campaigned against them, and the Commission found that they were unacceptable to the majority.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the internal settlement of 1978 did not end the war.",
    points: [["The leaders of ZANU and ZAPU, who commanded the guerrilla forces, rejected it", 2], ["White control of the army, police and civil service remained and no major state recognised it, so sanctions continued", 2]],
    hints: ["Who was left out, and who still held power?"],
    modelAnswer: "The leaders of ZANU and ZAPU, who commanded the guerrilla forces, rejected the settlement. White control of the army, police and civil service remained, and no major state recognised it, so sanctions continued and the war went on.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a radio broadcast by a fictional Rhodesian government spokesman, 1966",
        "Sanctions have failed. Our factories are busy, our farms are producing and our friends are standing by us. The country will not be bullied into handing power to those who are not ready for it."),
      "",
      source("Source B", "a report by a fictional British diplomat to his government, 1967",
        "The Rhodesian economy is under strain. Foreign exchange is short and the tobacco farmers are feeling the loss of their markets. But leaks through South Africa and Mozambique mean that sanctions will not bring the regime down quickly."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A claim about the effect of sanctions?", points: ["That sanctions have failed", "That factories and farms are productive and friends support Rhodesia"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the effect of sanctions?", points: [["Disagree: A says sanctions have failed, B says the economy is under strain", 2], ["Agree: both say that help from outside prevents quick collapse / sanctions have not brought the regime down", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are these sources as evidence of the effect of sanctions?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a government broadcast, so it is propaganda aimed at reassuring the public", 2], ["B is a private report to a government by an observer, likely to be frank, though he may be influenced by British aims", 2], ["Own knowledge: the economy grew through import substitution and neighbouring help yet faced strain, so B is more balanced", 2]], modelAnswer: "Source A is a government broadcast, so it is propaganda aimed at reassuring the public and cannot be fully trusted. Source B is a private report to a government by an observer, so it is likely to be frank, although the writer may be influenced by British aims. My own knowledge shows that the economy grew through import substitution and the help of neighbours but also faced foreign exchange shortages. Source B is therefore more balanced and more reliable." }),
    ],
    hints: ["For (c), consider the purpose and audience of each source."],
    explanation: "Both sources are invented: a government broadcast and a diplomat's private report.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "To what extent did sanctions weaken the Rhodesian government between 1965 and 1979?",
    levels: levels(8),
    points: [
      ["Strain: loss of markets, foreign exchange shortage, isolation, cost of war", 2],
      ["Survival: South African and Portuguese help, import substitution, growth to the early 1970s", 2],
      ["Other factors: the liberation war, the closing of the Mozambique border in 1976 and the loss of South African support", 2],
      ["Judgement on the extent", 2],
    ],
    hints: ["Weigh sanctions against the war and the loss of allies."],
    modelAnswer: "Sanctions weakened the Rhodesian government to some extent but were not the main cause of its decline. They caused a shortage of foreign exchange, loss of markets and isolation, and added to the strain of war costs. However, help from South Africa and Portugal, and import substitution, allowed the economy to grow until the early 1970s. The liberation war and the closing of the Mozambique border in 1976, which removed a friendly neighbour, were more decisive. I conclude that sanctions helped to weaken the regime, but only in combination with the war and the loss of allies.",
    explanation: "Credit explained effects and a supported judgement.",
  });

  b.card("DEFINITION", "What was UDI?", "The Unilateral Declaration of Independence of 11 November 1965, made by the Rhodesian government without British consent.");
  b.card("DEFINITION", "What did NIBMAR mean?", "No independence before majority rule: Britain's policy after UDI.");
  b.card("FACT", "When did the UN impose comprehensive mandatory sanctions on Rhodesia?", "May 1968 (selective sanctions in December 1966).");
  b.card("FACT", "What were the HMS Tiger and HMS Fearless talks?", "Failed meetings between Harold Wilson and Ian Smith in December 1966 and October 1968.");
  b.card("FACT", "What did the Pearce Commission find in 1972?", "That the Smith-Home proposals were not acceptable to the majority of Africans.");
  b.card("FACT", "What did the Land Tenure Act of 1969 do?", "It replaced the Land Apportionment Act and divided land in roughly equal parts between Europeans and Africans.");
  b.card("CONCEPT", "How did Rhodesia cope with sanctions?", "Help from South Africa and Portugal, import substitution, switching crops and rerouting exports.");
  b.card("CONCEPT", "Why did the internal settlement of 1978-79 fail?", "ZANU and ZAPU rejected it, whites kept key powers and it won no international recognition.");
  b.card("CONCEPT", "Why did the Rhodesian Front demand independence?", "To keep white control and avoid majority rule after the end of the Federation and independence in the north.");
});
