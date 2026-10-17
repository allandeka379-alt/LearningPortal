// W2a: ahist.liberation.lancaster-house (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.liberation.lancaster-house", { file: "liberation/lancaster-house", keyPrefix: "liberation.lancaster-house" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who chaired the Lancaster House Conference of 1979?",
    options: [
      ["Lord Carrington, the British foreign secretary", "Correct: he led the British delegation as chairman."],
      ["Lord Soames, the British governor of Rhodesia", "Soames was the governor during the transition."],
      ["Kenneth Kaunda, the president of Zambia and host at Lusaka", "Kaunda helped to bring about the conference but did not chair it."],
      ["Samora Machel, the president of Mozambique and FRELIMO", "Machel pressed for a compromise but did not chair."],
    ],
    answer: "A",
    explanation: "The British foreign secretary, Lord Carrington, chaired the conference from September to December 1979.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date did Zimbabwe become independent?",
    options: [
      ["18 April 1980", "Correct: independence day."],
      ["21 December 1979", "This is the date of the Lancaster House agreement."],
      ["11 November 1965", "This is the date of UDI."],
      ["22 December 1987", "This is the date of the Unity Accord."],
    ],
    answer: "A",
    explanation: "Zimbabwe became independent on 18 April 1980.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How many of the 100 seats in the House of Assembly were reserved for whites at independence?",
    options: [
      ["Twenty, for at least seven years", "Correct: 20 white seats were elected from a separate roll."],
      ["Forty, for at least five years", "Forty is too many."],
      ["Ten, for at least fifteen years", "Ten is too few and the period was shorter."],
      ["Fifty, for at least ten years", "Fifty is far too many."],
    ],
    answer: "A",
    explanation: "Twenty seats were reserved for whites for seven years, with 80 seats on the common roll.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which meeting helped to change Britain's approach in 1979?",
    options: [
      ["The Commonwealth meeting at Lusaka in August", "Correct: leaders persuaded Britain to hold a conference."],
      ["The Victoria Falls Conference of August 1975", "This was an earlier failed conference."],
      ["The Geneva Conference of late 1976 in Switzerland", "Geneva failed in 1976."],
      ["The Pearce Commission test of opinion of 1972", "This was an earlier test of opinion."],
    ],
    answer: "A",
    explanation: "At Lusaka in August 1979 Commonwealth leaders persuaded the British prime minister to call a conference of all parties.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Why was the internal settlement of 1978-79 unable to end the war?",
    options: [
      ["The Patriotic Front was excluded, whites kept key institutions and nobody recognised it", "Correct: it did not win recognition or end the fighting."],
      ["The Patriotic Front had been given most of the cabinet posts but left the government", "The Patriotic Front was not in the government."],
      ["The United Nations sent troops to enforce the settlement throughout the countryside", "No UN troops were sent."],
      ["The elections of 1979 were won by the Rhodesian Front with an increased majority", "The 1979 elections brought Muzorewa to office."],
    ],
    answer: "A",
    hints: ["Who was not part of it?"],
    explanation: "The Patriotic Front did not take part, whites kept the army, police and courts, and the new state was not recognised abroad, so the war went on.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What did the independence constitution say about land?",
    options: [
      ["Land could be bought from willing sellers, with property protected for ten years", "Correct: compulsory acquisition was restricted."],
      ["All land held by whites was to be transferred to the state without any payment", "The constitution protected property."],
      ["Land could be taken at any time by a simple majority vote in the parliament of Zimbabwe", "Protection required a longer process."],
      ["Britain agreed to buy all white-owned farms and then give them to African families", "Britain made no such commitment."],
    ],
    answer: "A",
    hints: ["Think of the property clause."],
    explanation: "The constitution protected property and allowed purchase on a willing seller, willing buyer basis for ten years, which angered nationalists who wanted compulsory acquisition.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which pair of facts best shows the compromise nature of the Lancaster House settlement?",
    options: [
      ["White seats and the property clause were accepted in return for a fair election", "Correct: each side gave something."],
      ["The Patriotic Front won a military victory and Rhodesia surrendered unconditionally", "There was no unconditional surrender."],
      ["Britain gave up all claim to Rhodesia and a governor was never appointed there", "A British governor was appointed."],
      ["Muzorewa kept the post of prime minister for another ten years after the 1980 vote", "Muzorewa lost the 1980 election."],
    ],
    answer: "A",
    hints: ["Look for a statement in which both sides gave something."],
    explanation: "The nationalists accepted reserved white seats and protection of property, and the Rhodesian side accepted a supervised election and majority rule.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the 1980 settlement is best supported by historians?",
    options: [
      ["It ended the war but left the land question unresolved", "Correct: a necessary compromise with long-term costs."],
      ["It solved every grievance and ended every political conflict in 1980", "Later conflicts show it did not."],
      ["It was imposed on Zimbabwe by the United Nations against all parties", "The parties signed it."],
      ["It was rejected by every party at the conference and never took effect", "It took effect in December 1979."],
    ],
    answer: "A",
    hints: ["Think of the benefits and the costs."],
    explanation: "Historians generally see the settlement as a necessary compromise that ended the war but left the land question to a later period.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The agreement at Lancaster House was signed on 21 December 1979.", answer: true,
    explanation: "The agreement was signed on 21 December 1979 and the ceasefire began on 28 December.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "Lord Soames governed Rhodesia on behalf of Britain during the transition to independence.", answer: true,
    explanation: "Soames arrived in Salisbury in December 1979 and governed until independence in April 1980.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "ZANU (PF) won all 100 seats in the February 1980 elections.", answer: false,
    hints: ["Remember the white seats and PF-ZAPU."],
    explanation: "ZANU (PF) won 57 of the 80 common-roll seats; PF-ZAPU won 20, UANC 3, and the 20 white seats went to Smith's party.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person to his part in the settlement.",
    pairs: [
      ["Lord Carrington", "Chaired the Lancaster House Conference"],
      ["Lord Soames", "Governed during the transition"],
      ["Abel Muzorewa", "Led the delegation of Zimbabwe-Rhodesia"],
      ["Margaret Thatcher", "British prime minister who agreed to call the conference"],
    ],
    explanation: "These were the main British and Rhodesian figures of the conference and transition.",
  });
  {
    const events = [
      "The internal settlement is signed",
      "The Commonwealth meeting at Lusaka",
      "The Lancaster House agreement is signed",
      "Zimbabwe becomes independent",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are March 1978, August 1979, December 1979 and April 1980."],
      explanation: "March 1978; August 1979; 21 December 1979; 18 April 1980.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Lancaster House Conference met in {{blank:a}} in 1979, and Zimbabwe became independent in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["London"], choices: ["London", "Geneva", "Lusaka", "Salisbury"] },
      { id: "b", accepted: ["1980"], choices: ["1980", "1979", "1975", "1987"] },
    ],
    explanation: "The conference met in London; independence was in 1980.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which British politician became governor of Rhodesia during the transition of 1979-80?",
    accepted: ["Lord Soames", "Soames", "Christopher Soames", "Lord Christopher Soames"],
    wrong: ["Carrington"],
    explanation: "**Lord Soames**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main terms of the independence constitution agreed at Lancaster House.",
    points: ["A parliament of 100 members with 80 elected on a common roll and 20 white seats for at least seven years", "A declaration of rights", "Protection of property and compensation in a transferable currency if land was taken", "Land to be bought on a willing seller, willing buyer basis; guarantees for pensions and the civil service"],
    modelAnswer: "The constitution created a parliament of 100 members, with 80 elected on a common roll and 20 white seats reserved for at least seven years. It included a declaration of rights and protected property, with compensation in a transferable currency if land was taken, and land was to be bought on a willing seller, willing buyer basis. Pensions and the civil service were also guaranteed.",
    explanation: "One mark for each term described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Patriotic Front agreed to attend the Lancaster House Conference.",
    points: [["The Frontline States, especially Mozambique, urged compromise because the war was costing them heavily", 2], ["The conference offered a fair election, international recognition and the end of white rule, which the nationalists believed they could win", 2]],
    hints: ["Think of the neighbouring states and of the election."],
    modelAnswer: "The Frontline States, especially Mozambique, urged compromise because the war was costing them heavily. The conference offered a fair election, international recognition and an end to white rule, which the nationalists believed they could win.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Lancaster House settlement has been criticised.",
    points: [["It reserved 20 seats for whites for seven years and kept the civil service and courts largely unchanged", 2], ["It protected property and limited land redistribution to willing seller, willing buyer, leaving the land question unresolved", 2]],
    hints: ["Give one political and one land criticism."],
    modelAnswer: "It reserved 20 seats for whites for seven years and left the civil service and courts largely unchanged. It protected property and limited land redistribution to willing seller, willing buyer, so the land question remained unresolved.",
    explanation: "Credit developed criticisms.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a diary entry by a fictional member of the Patriotic Front delegation, October 1979",
        "We have come to London because our friends have urged us, and because the war cannot go on for ever. But I will not sign a paper that leaves the land with those who took it. The seats for whites are bad, and the land is worse."),
      "",
      source("Source B", "a letter from a fictional British official in London to a colleague in Salisbury, December 1979",
        "The conference will succeed only if all sides take something and give something. The Front wants land; the other side wants safeguards. We shall promise help for a land programme and ask the Front to accept the property clauses. It is not perfect, but the alternative is more war."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What objections does Source A have to the draft settlement?", points: ["The land would remain with those who took it", "The seats for whites"] }),
      P.manual({ label: "(b)", marks: 2, stem: "How does the attitude to the settlement in Source B differ from Source A?", points: ["B accepts compromise and sees the settlement as necessary to avoid more war", "A is reluctant to sign over land and seats for whites"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How useful are these sources as evidence of why the Lancaster House settlement was accepted?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A shows reluctance and the central objection of land, a private diary honest about doubts", 1], ["B shows the British approach of promises of help for land in return for acceptance of the property clauses, written to a colleague and so frank", 1], ["Own knowledge: pressure from the Frontline States, the cost of the war and promises on land helped to secure acceptance", 1], ["Judgement: together they show how a compromise was reached, but each is one person's view", 1]], modelAnswer: "Source A, a private diary, honestly shows the Front's reluctance and its central objection about land. Source B, a letter to a colleague, frankly shows the British approach of promising help with land in return for acceptance of the property clauses. My own knowledge adds the pressure from the Frontline States and the cost of the war. Together they show how a compromise was reached, although each is one person's view." }),
    ],
    hints: ["For (c), think about what each writer wanted and knew."],
    explanation: "Both sources are invented: a delegate's diary and an official's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was pressure from outside Zimbabwe the main reason for the Lancaster House Conference?",
    levels: levels(12),
    points: [
      ["External pressure: Commonwealth at Lusaka, Frontline States and Machel, Britain and the United States", 3],
      ["Internal pressure: the war, white morale, sanctions and the failure of the internal settlement", 3],
      ["The nationalists' position: pressure from allies but also belief that they could win an election", 2],
      ["Interaction: the war made outside pressure effective", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Weigh the outside pressure against the effect of the war inside the country."],
    modelAnswer: "Outside pressure was important for the Lancaster House Conference but it worked because of the war inside Rhodesia. At Lusaka in August 1979 Commonwealth leaders persuaded Britain to call a conference, and the Frontline States, especially Mozambique, pressed the Patriotic Front to compromise because the war was costing them heavily. But the war itself was the underlying reason: by 1979 it covered most of the country, sanctions had strained the economy and white morale was falling, while the internal settlement had failed to bring peace or recognition. The nationalists also went because they believed they would win an election. I conclude that the war and the failure of the internal settlement created the conditions, and outside pressure was the decisive push.",
    explanation: "Credit explained factors and a judgement that weighs outside pressure against internal ones.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the strengths and weaknesses of the Lancaster House settlement.",
    levels: levels(8),
    points: [
      ["Strengths: ended the war, fair election, recognition and end of sanctions, majority rule", 2],
      ["Weaknesses: reserved white seats, property clause and land, continuity of old institutions", 2],
      ["Views of historians: a necessary compromise versus a settlement that postponed the land question", 2],
      ["Judgement", 2],
    ],
    hints: ["Give both strengths and weaknesses."],
    modelAnswer: "The settlement's main strength was that it ended the war and brought a supervised election, international recognition, the end of sanctions and majority rule. Its weaknesses were that it reserved 20 seats for whites for seven years, protected property in a way that limited land redistribution, and left many old institutions in place. Some historians see it as a necessary compromise that avoided further bloodshed, while others stress that it postponed the land question. I conclude that it was a successful settlement for ending the war but one whose terms created lasting problems.",
    explanation: "Credit strengths, weaknesses and a judgement.",
  });

  b.card("DEFINITION", "What was the common roll?", "A voters' roll for all citizens; 80 of the 100 seats were elected from it in 1980, with 20 white seats on a separate roll.");
  b.card("DEFINITION", "What did 'willing seller, willing buyer' mean?", "Land could be acquired only if the owner agreed to sell, at an agreed price.");
  b.card("FACT", "When did the Lancaster House Conference run and who chaired it?", "10 September to 21 December 1979; Lord Carrington.");
  b.card("FACT", "What were the results of the February 1980 election?", "ZANU (PF) 57 of the 80 common-roll seats, PF-ZAPU 20, UANC 3; Smith's party took the 20 white seats.");
  b.card("FACT", "Who governed during the transition?", "Lord Soames, as British governor, from December 1979 to April 1980.");
  b.card("CONCEPT", "Why was Lancaster House held?", "The war, sanctions, the failure of the internal settlement and pressure from the Commonwealth and the Frontline States.");
  b.card("CONCEPT", "What were the main terms?", "A 100-seat assembly with 20 white seats for seven years, a bill of rights, protection of property and willing seller, willing buyer.");
  b.card("CONCEPT", "What is the balanced view of the settlement?", "A necessary compromise that ended the war but left the land question unresolved.");
});
