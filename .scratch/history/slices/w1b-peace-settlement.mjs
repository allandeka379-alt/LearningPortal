// Slice W1b: attempts at a settlement and the Lancaster House agreement (ZIMSEC topic 10.4).
import { concept, P, source, sources, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.liberation.peace-settlement", { file: "liberation/peace-settlement", keyPrefix: "liberation.peace-settlement" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who chaired the Lancaster House Conference of 1979?",
    options: [
      ["Lord Carrington", "Correct: the British Foreign Secretary."],
      ["Lord Soames", "Soames was the Governor during the transition."],
      ["Henry Kissinger", "Kissinger was involved in 1976."],
      ["Lord Pearce", "Pearce led the 1972 commission."],
    ],
    answer: "A",
    explanation: "**Lord Carrington** chaired the conference from 10 September to 15 December 1979.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When was the Lancaster House Agreement signed?",
    options: [
      ["21 December 1979", "Correct."],
      ["3 March 1978", "That is the Internal Settlement."],
      ["1 June 1979", "That is the start of Zimbabwe-Rhodesia."],
      ["18 April 1980", "That is independence."],
    ],
    answer: "A",
    explanation: "The conference ended on 15 December and the agreement was signed on **21 December 1979**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the Geneva conference of 1976 fail?",
    options: [
      ["Sides disagreed over control of the forces during transition", "Correct: the army and police were the sticking point."],
      ["Ian Smith refused to attend the conference at all", "Smith attended."],
      ["The Patriotic Front had not yet been formed", "The Patriotic Front was formed in October 1976 and attended."],
      ["Britain had already granted independence to Smith", "Britain never granted independence to Smith's government."],
    ],
    answer: "A",
    explanation: "The parties could not agree on the length of the transition or on who would control the army and police during it.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who led Zimbabwe-Rhodesia as Prime Minister in 1979?",
    options: [
      ["Bishop Abel Muzorewa", "Correct: his UANC won most African seats in April 1979."],
      ["Robert Mugabe", "Mugabe led ZANU, part of the Patriotic Front, which was excluded."],
      ["Joshua Nkomo", "Nkomo led ZAPU, part of the Patriotic Front."],
      ["Chief Jeremiah Chirau", "Chirau signed the Internal Settlement but did not become Prime Minister."],
    ],
    answer: "A",
    explanation: "**Muzorewa** became Prime Minister on 1 June 1979.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which two leaders pushed for détente in 1974-75?",
    options: [
      ["John Vorster and Kenneth Kaunda", "Correct: South Africa's PM and Zambia's President."],
      ["Harold Wilson and Ian Smith", "Wilson and Smith met in 1966 and 1968."],
      ["Margaret Thatcher and Julius Nyerere", "Thatcher became British PM in 1979."],
      ["Henry Kissinger and Samora Machel", "Kissinger's initiative came in 1976."],
    ],
    answer: "A",
    explanation: "Vorster feared the war would spread after the Portuguese coup; Kaunda wanted peace and an open border.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Internal Settlement fail to end the war?",
    options: [
      ["It left out the Patriotic Front, whose armies fought on", "Correct: the fighting forces had no part in it."],
      ["It gave the Patriotic Front all the seats in parliament", "The Patriotic Front was excluded."],
      ["It handed control of the army to ZANLA", "The army stayed under white control."],
      ["It was recognised by every country in the world", "No country recognised it."],
    ],
    answer: "A",
    hints: ["Who was doing the fighting?"],
    explanation: "With ZANU and ZAPU excluded and whites keeping control of the security forces, the war intensified and no country recognised the government.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which land provision was in the Lancaster House constitution?",
    options: [
      ["Willing-seller, willing-buyer purchase for ten years", "Correct: with adequate compensation."],
      ["Immediate seizure of all white farms without payment", "Property was protected."],
      ["A ban on Africans owning land for ten years", "The racial land laws were ended."],
      ["Return of all land to the British government", "No such provision existed."],
    ],
    answer: "A",
    hints: ["The constitution protected property for a fixed period."],
    explanation: "For ten years land could be acquired for resettlement only on a willing-seller, willing-buyer basis with adequate compensation, which slowed land reform.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which factor best explains why Lancaster House succeeded where Geneva had failed?",
    options: [
      ["Britain took direct charge of the transition", "Correct: this solved the problem of who controlled the transition."],
      ["Smith had become leader of the Patriotic Front", "Smith was part of the Zimbabwe-Rhodesia delegation."],
      ["The Frontline States had stopped caring about the war", "They pressed hard for a settlement."],
      ["All fighting had ended before the talks began", "Fighting continued during the conference."],
    ],
    answer: "A",
    hints: ["Recall what broke up the Geneva talks."],
    explanation: "Geneva broke down over control of the transition; at Lancaster House Britain itself took over through a Governor, with a Commonwealth-monitored ceasefire, removing that obstacle.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Victoria Falls conference of 1975 was held in a railway carriage on the bridge between Rhodesia and Zambia.",
    answer: true,
    explanation: "True. It met on 25-26 August 1975 and failed.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the Lancaster House constitution, 20 seats in the House of Assembly were reserved for whites for seven years.",
    answer: true,
    explanation: "True. Twenty of the 100 seats were reserved for whites for seven years; they were abolished in 1987.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each attempt with the reason it failed.",
    pairs: [
      ["Victoria Falls conference (1975)", "Smith refused majority rule; disputes over conditions for talks"],
      ["Geneva conference (1976)", "Disagreement over control of the army and police in transition"],
      ["Internal Settlement (1978)", "Excluded the Patriotic Front; whites kept real power"],
      ["Smith-Home proposals (1971)", "Rejected by Africans in the Pearce test of opinion"],
    ],
    explanation: "Each attempt failed for a different reason; Lancaster House overcame them with British control of the transition.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Internal Settlement is signed",
      "The Geneva conference meets",
      "The Lancaster House Agreement is signed",
      "The Victoria Falls conference meets",
    ],
    right: POS,
    rightIndex: [2, 1, 3, 0],
    hints: ["Each step came a year or so after the one before."],
    explanation: "Victoria Falls 1975; Geneva 1976; Internal Settlement March 1978; Lancaster House December 1979.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "During the transition Rhodesia was governed by the British Governor {{blank:a}}, and guerrillas gathered at {{blank:b}} points.",
    blanks: [
      { id: "a", accepted: ["Lord Soames"], choices: ["Lord Soames", "Lord Carrington", "Lord Pearce", "Ian Smith"] },
      { id: "b", accepted: ["assembly"], choices: ["assembly", "protected", "border", "training"] },
    ],
    explanation: "Lord Soames governed during the transition; a Commonwealth Monitoring Force supervised the assembly points.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name was given to the country under Muzorewa's government in 1979?",
    accepted: ["Zimbabwe-Rhodesia", "Zimbabwe Rhodesia"],
    wrong: ["Zimbabwe"],
    explanation: "**Zimbabwe-Rhodesia** (from 1 June 1979) was not recognised internationally.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** terms of the Lancaster House Agreement.",
    points: [
      "A new constitution with 100 seats, 20 reserved for whites for seven years.",
      "Bill of Rights / property protected: willing-seller, willing-buyer for ten years.",
      "A British Governor (Lord Soames) to run the transition.",
      "A ceasefire with guerrillas at assembly points and a Commonwealth Monitoring Force.",
      "Elections in February 1980 / sanctions lifted.",
    ],
    modelAnswer: "A new constitution with 20 of 100 seats reserved for whites for seven years; property protected by willing-seller, willing-buyer land purchase for ten years; a British Governor for the transition; a ceasefire with assembly points monitored by the Commonwealth; and elections in February 1980.",
    explanation: "One mark per term.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain why the Lancaster House Conference succeeded.",
    points: [
      "The war: Rhodesia could not win; martial law, emigration, failing economy.",
      "Frontline States (Mozambique, Zambia) pressed the Patriotic Front to settle.",
      "Britain took direct responsibility for the transition.",
      "Commonwealth/international pressure: Zimbabwe-Rhodesia not recognised.",
      "Compromises, e.g. land clauses accepted after informal funding assurances.",
      "A monitored ceasefire and elections gave both sides confidence.",
    ],
    hints: ["Think about pressures on each side and what was new at Lancaster House."],
    modelAnswer: "By 1979 the Rhodesian forces could not win: martial law covered most of the country, whites were leaving and the economy was failing. Mozambique and Zambia, suffering raids, pressed the Patriotic Front to accept a deal. Britain took direct charge of the transition through a Governor, solving the problem that had broken up Geneva. The Commonwealth and other states refused to recognise Zimbabwe-Rhodesia. The Patriotic Front accepted the land clauses after informal assurances of funding, and a Commonwealth-monitored ceasefire with elections gave both sides confidence.",
    explanation: "One mark per developed reason.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why the Victoria Falls conference of 1975 failed.",
    points: [
      "Identifies Smith's refusal to accept majority rule.",
      "Explains: without this there was nothing the nationalists could accept.",
      "Identifies disputes over conditions for further talks / divisions among nationalist leaders.",
      "Explains: e.g. no agreement on immunity for exiled leaders, so talks could not continue inside Rhodesia.",
    ],
    hints: ["Think about Smith's position and the nationalists' position."],
    modelAnswer: "Smith still would not accept majority rule, so there was no basis for agreement. The two sides also argued about conditions for further talks inside Rhodesia, such as immunity from arrest for exiled leaders, and the nationalist leaders, though nominally united under Muzorewa, were divided among themselves.",
    explanation: "Two marks per reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${sources([
      source("Source A", "a broadcast by a fictional Zimbabwe-Rhodesia government spokesman, April 1979", "For the first time in our history every adult has voted, and an African Prime Minister will lead the nation. The terrorists who refused to take part have shown that they want power by the gun, not by the ballot. The world must now recognise our new government."),
      source("Source B", "an editorial in a fictional newspaper in Lusaka, Zambia, May 1979", "An African face in the Prime Minister's office changes nothing while the generals, the judges and the police chiefs remain the same, and while a quarter of parliament can block any change. The men fighting in the bush were not invited. This is not majority rule; it is minority rule in disguise."),
    ])}`,
    hints: ["Compare the claims of each source with the facts of the 1979 constitution."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A claim had been achieved in April 1979?", points: [
        "Every adult had voted for the first time.",
        "An African Prime Minister would lead the country.",
      ], explanation: "Two claims." }),
      P.manual({ label: "(b)", marks: 4, stem: "How does Source B challenge the claims of Source A? Use details from both sources.", points: [
        "A says majority rule had come; B says it is minority rule in disguise.",
        "B: security forces and judges unchanged (whites kept control).",
        "B: a quarter of parliament can block change (28 white seats).",
        "B: the fighters were excluded; A calls them terrorists who refused to take part.",
      ], explanation: "Specific challenges." }),
      P.manual({ label: "(c)", marks: 6, stem: "Which source gives the more accurate view of the Internal Settlement? Use both sources and your own knowledge.", points: [
        "A: government propaganda seeking recognition; one-sided.",
        "A accurate that all adults voted and Muzorewa became PM.",
        "B: from Zambia, a Frontline State hostile to the settlement; one-sided too.",
        "B supported by own knowledge: 28 of 100 white seats, white control of army, police, judiciary.",
        "Own knowledge: no recognition, war intensified, Patriotic Front excluded.",
        "Supported judgement.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A was broadcast by the Zimbabwe-Rhodesia government to win recognition, so it stresses the achievements: all adults voted in April 1979 and Muzorewa became Prime Minister, which is true. Source B comes from a newspaper in Zambia, a Frontline State that supported the Patriotic Front, so it is also one-sided. But its claims are supported by own knowledge: whites held 28 of the 100 seats, enough to block constitutional change, and they kept control of the army, police, judiciary and civil service. The Patriotic Front was excluded, the war intensified and no country recognised the government. Source B gives the more accurate view of where real power lay, although Source A is right that the election was a change in form.", explanation: "Weigh both sources against own knowledge." }),
    ],
    explanation: "Two-source practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), consider what each side gained and gave up."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the arrangements for the transition to independence agreed at Lancaster House.", points: [
        "Return to British rule under a Governor, Lord Soames.",
        "Ceasefire: guerrillas to assembly points.",
        "Commonwealth Monitoring Force supervised the ceasefire.",
        "Elections in February 1980; sanctions lifted.",
      ], explanation: "Four arrangements." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "\"The Lancaster House Agreement was a victory for the Patriotic Front.\" How far do you agree?", points: [
        ["Agree: majority rule through one person, one vote elections.", 2],
        ["Agree: Zimbabwe-Rhodesia and the Internal Settlement set aside; PF took part fully.", 2],
        ["Disagree: 20 reserved white seats for seven years; Bill of Rights protected property.", 2],
        ["Disagree: willing-seller, willing-buyer land clause for ten years delayed land reform; PF under Frontline pressure to compromise.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "In important ways Lancaster House was a victory for the Patriotic Front. It brought elections on the basis of one person, one vote, which ZANU and ZAPU had demanded since 1957, and it set aside Muzorewa's government and the Internal Settlement, from which the Patriotic Front had been excluded.\n\nHowever, the Patriotic Front also made major concessions. Twenty seats were reserved for whites for seven years. The Bill of Rights protected property, and for ten years land could be bought only from willing sellers, which slowed the redistribution of land that had been a central aim of the struggle. The Patriotic Front accepted these terms partly because Mozambique and Zambia pressed it to settle.\n\nOverall it was a victory on the main issue, majority rule, but a compromise on land, which left problems for independent Zimbabwe.", explanation: "Top level weighs gains and concessions." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When and where was the Victoria Falls conference?", "25-26 August 1975, in a railway carriage on the Victoria Falls bridge; it failed.");
  b.card("FACT", "Why did the Geneva conference (1976) fail?", "Disagreement over the transition, especially control of the army and police.");
  b.card("DEFINITION", "Internal Settlement", "The agreement of 3 March 1978 between Smith and Muzorewa, Sithole and Chirau, excluding the Patriotic Front.");
  b.card("FACT", "When did Zimbabwe-Rhodesia begin?", "1 June 1979, with Bishop Muzorewa as Prime Minister.");
  b.card("FACT", "When did the Lancaster House Conference meet, and when was it signed?", "10 September-15 December 1979; signed 21 December 1979.");
  b.card("FACT", "Name three constitutional terms of Lancaster House.", "20 of 100 seats reserved for whites for 7 years; Bill of Rights; willing-seller, willing-buyer land acquisition for 10 years.");
  b.card("CONCEPT", "Why did Lancaster House succeed?", "The war, Frontline and Commonwealth pressure, Britain's direct control of the transition, and compromise on land.");
  b.card("DEFINITION", "Détente (1974-75)", "Vorster and Kaunda's joint effort to ease tension and push Smith and the nationalists into talks.");
  b.card("FACT", "Who was the British Governor during the 1979-80 transition?", "Lord Soames.");
});
