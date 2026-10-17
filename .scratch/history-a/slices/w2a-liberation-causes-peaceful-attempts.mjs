// W2a: ahist.liberation.causes-peaceful-attempts (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.liberation.causes-peaceful-attempts", { file: "liberation/causes-peaceful-attempts", keyPrefix: "liberation.causes-peaceful-attempts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date did the Rhodesian Front government declare UDI?",
    options: [
      ["11 November 1965", "Correct: Ian Smith announced independence that day."],
      ["28 April 1966", "This is the date of the Battle of Chinhoyi."],
      ["21 December 1972", "This is the date of the Altena Farm attack."],
      ["18 April 1980", "This is the date of independence."],
    ],
    answer: "A",
    explanation: "UDI was announced on 11 November 1965 by Prime Minister Ian Smith.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which law of 1930 divided land between the races and gave the best land to whites?",
    options: [
      ["The Land Apportionment Act", "Correct: it reserved the best land for white ownership."],
      ["The Land Husbandry Act", "This Act of 1951 dealt with African farming methods."],
      ["The Unlawful Organisations Act", "This was a security law."],
      ["The Industrial Conciliation Act", "This was a labour law of 1934."],
    ],
    answer: "A",
    explanation: "The Land Apportionment Act of 1930 divided the land by race and was a central grievance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Pearce Commission of 1972 find?",
    options: [
      ["That Africans of Rhodesia as a whole rejected the Smith-Home proposals", "Correct: the proposals were not acceptable."],
      ["That Africans of Rhodesia as a whole accepted the Smith-Home proposals", "The opposite was found."],
      ["That Britain should impose a settlement without asking the people", "The Commission did not recommend this."],
      ["That the United Nations should take over the government of Rhodesia", "The Commission did not recommend this."],
    ],
    answer: "A",
    explanation: "The commission tested opinion in early 1972 and reported that Africans rejected the proposals, so they were dropped.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who met Ian Smith aboard HMS Tiger in December 1966?",
    options: [
      ["Harold Wilson, the British Prime Minister", "Correct: Wilson tried to negotiate a settlement."],
      ["Joshua Nkomo, the leader of ZAPU", "Nkomo was in detention."],
      ["Edward Heath, the leader of the British opposition", "Heath was not at the talks."],
      ["Kenneth Kaunda, the president of Zambia", "Kaunda was not at the talks."],
    ],
    answer: "A",
    explanation: "Wilson met Smith on HMS Tiger off Gibraltar; Smith's cabinet rejected the proposals.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "What was the internal settlement of March 1978?",
    options: [
      ["An agreement between Smith and three African leaders that left whites powerful", "Correct: the Patriotic Front was excluded."],
      ["A peace treaty signed by the Patriotic Front and the Rhodesian army commanders", "The Patriotic Front did not sign it."],
      ["A British plan to rule Rhodesia directly through a governor sent from London", "This describes events of 1979-80."],
      ["A United Nations plan to hold elections in Rhodesia under UN military control", "The UN did not run these elections."],
    ],
    answer: "A",
    hints: ["Think of who was left out."],
    explanation: "Smith, Muzorewa, Sithole and Chirau agreed a constitution that gave Africans a majority of seats but left key institutions in white hands. The Patriotic Front rejected it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Victoria Falls Conference of August 1975 fail?",
    options: [
      ["Smith and the nationalists could not agree on how to proceed to a conference", "Correct: they disagreed about procedure."],
      ["The nationalists refused to attend, so the meeting never took place at all", "The meeting did take place."],
      ["Smith agreed to majority rule at once but Britain rejected the agreement", "Smith had not agreed to majority rule then."],
      ["South Africa withdrew its support and ordered the conference to be closed", "Vorster supported the talks."],
    ],
    answer: "A",
    hints: ["The disagreement was over the basis for the conference."],
    explanation: "The meeting was held on the railway bridge at Victoria Falls but ended after disputes over procedure and the basis for talks.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why did the Geneva Conference of 1976 fail?",
    options: [
      ["The parties could not agree on who would control the transitional government", "Correct: this was the central dispute."],
      ["The Patriotic Front refused to attend any of the sessions in Geneva", "The Patriotic Front attended."],
      ["The delegates agreed on a plan but the British Parliament in London vetoed it", "No plan had been agreed."],
      ["Smith had already handed power to an African government before it began", "Smith still held power."],
    ],
    answer: "A",
    hints: ["Think of the transition."],
    explanation: "Disputes over the transitional government and over the control of the security forces prevented agreement.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point best shows why the internal settlement did not end the war?",
    options: [
      ["The Patriotic Front was excluded and whites kept control of key institutions", "Correct: the guerrillas continued to fight."],
      ["Most Africans in the countryside voted in large numbers for the Rhodesian Front", "They did not."],
      ["The settlement was signed by all the nationalist leaders including Mugabe", "Mugabe did not sign."],
      ["Britain and the United States immediately recognised the new state", "No state recognised it."],
    ],
    answer: "A",
    hints: ["Who was not part of the agreement?"],
    explanation: "ZANLA and ZIPRA were not parties, whites kept the police, army and judiciary and no government recognised the new state, so the war continued.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The Pearce Commission reported in 1972.", answer: true,
    explanation: "The commission tested opinion in early 1972 and reported in May.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "The HMS Tiger talks (1966) and the HMS Fearless talks (1968) ended with agreement between Wilson and Smith that was accepted in Salisbury.", answer: false,
    explanation: "Both sets of talks failed because Smith's government would not accept the terms.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "The Patriotic Front took part in the elections that produced Zimbabwe-Rhodesia in April 1979.", answer: false,
    hints: ["It rejected the internal settlement."],
    explanation: "The Patriotic Front rejected the internal settlement and did not take part; the war continued.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event to the description.",
    pairs: [
      ["HMS Tiger (1966)", "First meeting between Wilson and Smith at sea"],
      ["Pearce Commission (1972)", "Test of African opinion on the Smith-Home proposals"],
      ["Geneva Conference (1976)", "Talks chaired by Ivor Richard that failed on the transition"],
      ["Internal settlement (1978)", "Agreement between Smith, Muzorewa, Sithole and Chirau"],
    ],
    explanation: "These are the main attempts at a peaceful settlement before Lancaster House.",
  });
  {
    const events = [
      "UDI is declared",
      "The Pearce Commission tests African opinion",
      "The Victoria Falls Conference",
      "The internal settlement is signed",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1965, 1972, 1975 and 1978."],
      explanation: "November 1965; 1972; August 1975; March 1978.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "{{blank:a}} Smith declared UDI in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Ian"], choices: ["Ian", "Harold", "Garfield", "Winston"] },
      { id: "b", accepted: ["1965"], choices: ["1965", "1963", "1972", "1979"] },
    ],
    explanation: "Ian Smith declared UDI on 11 November 1965.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the British principle announced after UDI that there should be no independence before majority African rule? Give the initials.",
    accepted: ["NIBMAR", "N.I.B.M.A.R.", "no independence before majority african rule", "no independence before majority rule"],
    wrong: ["UDI"],
    explanation: "**NIBMAR**: no independence before majority African rule.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the land grievances of Africans in Southern Rhodesia.",
    points: ["The Land Apportionment Act (1930) gave the best land to whites", "African reserves were crowded and poor", "The Land Husbandry Act (1951) and forced removals added to pressure", "The Land Tenure Act (1969) kept the division of land by race"],
    modelAnswer: "The Land Apportionment Act of 1930 gave the best land to whites, while African reserves became crowded and poor. The Land Husbandry Act of 1951 and forced removals added to the pressure, and the Land Tenure Act of 1969 kept the division of land by race.",
    explanation: "One mark for each grievance described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Pearce Commission was set up and what it found.",
    points: [["Smith and the British foreign secretary agreed proposals in 1971 and Britain agreed to test whether the people found them acceptable", 2], ["The commission found that Africans rejected them, led by Muzorewa's African National Council, so the proposals fell", 2]],
    hints: ["Give the purpose and the result."],
    modelAnswer: "Smith and Sir Alec Douglas-Home agreed settlement proposals in 1971 and Britain promised to test whether the people of Rhodesia found them acceptable. The Pearce Commission found that Africans rejected them, led by Muzorewa's African National Council, so the proposals fell.",
    explanation: "Credit purpose and result.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the failure of peaceful attempts helped to cause armed struggle.",
    points: [["Constitutional methods, talks and commissions did not win majority rule, so nationalists saw no peaceful way forward", 2], ["Bans and detention closed legal politics and UDI showed that the white government would not yield power peacefully", 2]],
    hints: ["Think of what peaceful methods had achieved."],
    modelAnswer: "Talks, constitutional proposals and commissions did not win majority rule, so nationalists saw no peaceful way forward. Bans and detention closed legal politics, and UDI showed that the white government would not give up power without force.",
    explanation: "Credit developed reasoning.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a statement by a fictional Rhodesian government minister, 1972",
        "The proposals give the African a path to the vote, in time, as he qualifies. They are fair and reasonable. Only agitators and misled people oppose them."),
      "",
      source("Source B", "a letter from a fictional African teacher to his local newspaper, 1972",
        "We were asked what we think. We think that a path that takes generations is no path. We were not asked in 1965 when our future was decided for us. We say No."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say about the proposals?", points: ["They give Africans a path to the vote in time, as they qualify", "They are fair and reasonable; opponents are agitators"] }),
      P.manual({ label: "(b)", marks: 2, stem: "How does Source B's view differ from Source A's?", points: ["B rejects the proposals because a path that takes generations is no path", "B says Africans were not consulted in 1965 / A treats opponents as misled"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How useful are these sources for studying African opinion on the Smith-Home proposals?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A is a government statement that defends the proposals, so it shows the government's view rather than African opinion", 1], ["B is an African view that matches the Pearce Commission's finding, but it is one person's opinion and the sort of letter a newspaper would print", 1], ["Own knowledge: the commission found that Africans rejected the proposals and the ANC led opposition", 1], ["Judgement: B is more useful for African opinion and A for the government's attitude", 1]], modelAnswer: "Source A is a government statement defending the proposals, so it shows the government's view and not African opinion. Source B is an African teacher's letter that rejects the proposals, which matches the finding of the Pearce Commission, although it is one person's opinion. My own knowledge confirms that the commission found that Africans rejected the proposals, with the African National Council leading opposition. B is therefore more useful about African opinion, and A about the government's attitude." }),
    ],
    hints: ["For (c), think about who wrote each source and for whom."],
    explanation: "Both sources are invented: a minister's statement and a teacher's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the refusal of the Rhodesian government to accept majority rule the main reason why the peaceful attempts failed?",
    levels: levels(12),
    points: [
      ["Government refusal: Tiger and Fearless failed, Pearce proposals kept power with whites for a long time, and the internal settlement kept white control", 3],
      ["Nationalist divisions and refusal to accept less than majority rule; ZAPU and ZANU rivalry and disputes at Geneva", 3],
      ["External factors: Britain's inability to use force, sanctions slow to work, South African support to Rhodesia until the mid-1970s", 2],
      ["The war and economy: Rhodesia could hold out until pressure grew in 1976-78", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Weigh the white government's position against divisions among nationalists and the role of Britain."],
    modelAnswer: "The refusal of the Rhodesian government to accept majority rule was the main reason for the failure of the peaceful attempts, but other factors played a part. At HMS Tiger and Fearless, Smith's cabinet rejected a return to legality, the Smith-Home proposals of 1971 delayed majority rule for generations, and the internal settlement of 1978 left key institutions in white hands. However, the nationalists were divided, and at Geneva the parties could not agree on the transition, while the Patriotic Front would accept nothing short of real power. Britain could not use force and sanctions were slow to work, and South Africa helped Rhodesia to hold out until the mid-1970s. I conclude that the white government's refusal was the main cause, with nationalist division and British weakness making a settlement harder.",
    explanation: "Credit explained factors and a judgement that weighs the government's refusal against others.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of land among the causes of the Second Chimurenga.",
    levels: levels(8),
    points: [
      ["Land Apportionment Act, overcrowded reserves, forced removals: the grievance of most Africans", 2],
      ["Links to the First Chimurenga of 1896-97 and nationalist demands", 2],
      ["Other causes: lack of the vote, discrimination, repression, UDI and failed constitutional methods", 2],
      ["Judgement on the relative importance of land", 2],
    ],
    hints: ["Compare land with the loss of political rights and repression."],
    modelAnswer: "Land was among the most important causes of the Second Chimurenga. The Land Apportionment Act, crowded reserves and forced removals affected most Africans and linked the struggle to the risings of 1896-97. But land alone does not explain why armed struggle began in the 1960s, since the grievance was older. The lack of the vote, discrimination, repression, UDI and the failure of constitutional methods were the immediate reasons. I conclude that land was the deepest cause, but repression and the closing of peaceful politics decided the timing.",
    explanation: "Credit explained importance and a judgement.",
  });

  b.card("DEFINITION", "What was UDI?", "The Unilateral Declaration of Independence by Ian Smith's government on 11 November 1965.");
  b.card("DEFINITION", "What was NIBMAR?", "No independence before majority African rule: Britain's principle after UDI.");
  b.card("FACT", "Where and when did Wilson and Smith meet in 1966 and 1968?", "On HMS Tiger (December 1966) and HMS Fearless (October 1968); both failed.");
  b.card("FACT", "What did the Pearce Commission find?", "That Africans rejected the Smith-Home proposals (1972).");
  b.card("FACT", "Which conferences failed in 1975 and 1976?", "Victoria Falls (August 1975) and Geneva (October-December 1976).");
  b.card("FACT", "What was the internal settlement?", "The agreement of 3 March 1978 between Smith, Muzorewa, Sithole and Chirau that left whites with great power.");
  b.card("CONCEPT", "Name five causes of the Second Chimurenga.", "Land, discrimination, loss of the vote, repression and bans, UDI and failed constitutional methods; also decolonisation elsewhere.");
  b.card("CONCEPT", "Why did the peaceful attempts fail?", "The white government would not accept majority rule, the nationalists would accept nothing less, and Britain could not use force.");
  b.card("CONCEPT", "Why did the internal settlement fail to end the war?", "It excluded the Patriotic Front, left whites in control of key institutions and was not recognised abroad.");
});
