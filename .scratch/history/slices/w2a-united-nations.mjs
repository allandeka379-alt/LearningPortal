// Slice W2a: the United Nations (ZIMSEC topic 13.5).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.cooperation.united-nations", { file: "cooperation/united-nations", keyPrefix: "cooperation.united-nations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date did the United Nations come into existence?",
    options: [
      ["24 October 1945", "Correct: when the Charter came into force."],
      ["26 June 1945", "That is when the Charter was signed at San Francisco."],
      ["10 December 1948", "That is the date of the UDHR."],
      ["8 May 1945", "That is the date of Germany's surrender."],
    ],
    answer: "A",
    explanation: "The Charter came into force on **24 October 1945**, now United Nations Day.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which country is NOT a permanent member of the Security Council?",
    options: [
      ["India", "Correct: India has served only as an elected member."],
      ["China", "China is a permanent member."],
      ["France", "France is a permanent member."],
      ["Russia", "Russia took over the Soviet Union's permanent seat."],
    ],
    answer: "A",
    explanation: "The permanent five are the USA, Britain, France, Russia and China. **India** is not one of them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which UN organ settles legal disputes between states?",
    options: [
      ["The International Court of Justice", "Correct: it sits at The Hague."],
      ["The General Assembly", "The Assembly debates and recommends."],
      ["The Trusteeship Council", "It supervised trust territories."],
      ["The Economic and Social Council of 54 members", "ECOSOC co-ordinates economic and social work."],
    ],
    answer: "A",
    explanation: "The **International Court of Justice** at The Hague settles legal disputes between states.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which agency leads the UN's work on world health?",
    options: [
      ["WHO", "Correct: the World Health Organization."],
      ["FAO", "The FAO deals with food and agriculture."],
      ["ILO", "The ILO deals with labour and workers' rights."],
      ["UNESCO", "UNESCO deals with education, science and culture."],
    ],
    answer: "A",
    explanation: "The **World Health Organization** led the campaign that eradicated smallpox (declared 1980).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why was the UN able to send forces to Korea in 1950?",
    options: [
      ["The USSR was boycotting the Security Council", "Correct: so no Soviet veto was cast."],
      ["China voted in favour of the action", "China's seat was then held by the Nationalist government; the key point is the Soviet absence."],
      ["The General Assembly could order military action", "The Security Council authorised the action."],
      ["North Korea asked the UN for help", "North Korea was the invader."],
    ],
    answer: "A",
    hints: ["Who would normally have used the veto?"],
    explanation: "The Soviet Union was **boycotting** the Council, so it could not veto the resolution.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the founders give the five permanent members a veto?",
    options: [
      ["To keep the great powers inside the UN", "Correct: the League had suffered from great powers leaving or never joining."],
      ["To let small states block the great powers", "The veto belongs only to the permanent five."],
      ["To make the General Assembly more powerful", "The veto is a Security Council power."],
      ["To allow the UN to ignore human rights", "The veto has nothing to do with this."],
    ],
    answer: "A",
    hints: ["Think about the League of Nations' weaknesses."],
    explanation: "The founders believed the UN would only work if the **great powers stayed in and agreed**.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which example best shows a FAILURE of UN peacekeeping?",
    options: [
      ["Rwanda, 1994", "Correct: the UN did not stop the genocide."],
      ["Namibia, 1989-1990", "The UN mission helped bring independence: a success."],
      ["Suez, 1956", "UNEF supervised the withdrawal of forces: a success."],
      ["Smallpox, 1980", "This is a WHO success, not peacekeeping."],
    ],
    answer: "A",
    hints: ["Which event is remembered as a failure to protect civilians?"],
    explanation: "In **Rwanda (1994)** UN peacekeepers were too few and lacked a mandate to stop the genocide.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Universal Declaration of Human Rights was adopted on 10 December 1948.",
    answer: true,
    explanation: "True. It was adopted by the General Assembly.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Universal Declaration of Human Rights is a legally binding treaty that every member must obey.",
    answer: false,
    explanation: "False. It is a declaration, not a binding treaty, though later treaties such as the two Covenants of 1966 are binding on states that ratify them.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each UN organ with its function.",
    pairs: [
      ["General Assembly", "Debates world issues; every member has one vote"],
      ["Security Council", "Can order sanctions and authorise force"],
      ["Secretariat", "Runs the UN day to day under the Secretary-General"],
      ["Economic and Social Council", "Co-ordinates the specialised agencies"],
    ],
    explanation: "The Assembly debates; the Council acts on security; the Secretariat administers; ECOSOC co-ordinates economic and social work.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "UN sanctions imposed on Rhodesia",
      "Atlantic Charter",
      "Universal Declaration of Human Rights",
      "San Francisco Conference",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["The Atlantic Charter was agreed during the war."],
    explanation: "Atlantic Charter 1941; San Francisco 1945; UDHR 1948; sanctions on Rhodesia 1966.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Security Council has {{blank:a}} members. The UN Charter was signed at {{blank:b}} in June 1945.",
    blanks: [
      { id: "a", accepted: ["15"], choices: ["15", "5", "10", "54"] },
      { id: "b", accepted: ["San Francisco"], choices: ["San Francisco", "Geneva", "New York", "Yalta"] },
    ],
    explanation: "The Council has **15** members (5 permanent, 10 elected). The Charter was signed at **San Francisco** on 26 June 1945.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the power that lets one permanent member block a Security Council decision?",
    accepted: ["veto", "the veto", "right of veto", "veto power"],
    wrong: ["sanction"],
    explanation: "The **veto**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "Name **five** principal organs of the United Nations.",
    points: [
      "General Assembly.",
      "Security Council.",
      "Secretariat.",
      "International Court of Justice.",
      "Economic and Social Council / Trusteeship Council.",
    ],
    modelAnswer: "General Assembly; Security Council; Secretariat; International Court of Justice; Economic and Social Council.",
    explanation: "One mark per organ (specialised agencies are not principal organs).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the role of the United Nations in promoting and protecting human rights.",
    points: [
      "The Charter commits members to promote human rights.",
      "UDHR adopted 10 December 1948 (civil, political, economic, social rights).",
      "Binding treaties: Covenants (1966), Convention on the Rights of the Child (1989).",
      "Human Rights Council (2006) reviews members' records.",
      "High Commissioner for Human Rights reports on abuses.",
      "Agencies (UNICEF, ILO, UNHCR) protect children, workers and refugees / sanctions against apartheid.",
    ],
    hints: ["Think about declarations, treaties, bodies and agencies."],
    modelAnswer: "The Charter commits members to promote human rights. In 1948 the General Assembly adopted the Universal Declaration of Human Rights, listing civil, political, economic and social rights. Binding treaties followed, such as the two Covenants of 1966 and the Convention on the Rights of the Child of 1989. The Human Rights Council reviews every member's record, and the High Commissioner reports on abuses. Agencies such as UNICEF and UNHCR protect children and refugees, and the UN imposed sanctions against apartheid South Africa.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why the UN has often been unable to stop wars.",
    points: [
      "Identifies the veto.",
      "Explains: permanent members block action against themselves or allies (Cold War paralysis).",
      "Identifies dependence on members for troops and money.",
      "Explains: missions too small or without a strong mandate (e.g. Rwanda 1994).",
    ],
    hints: ["The UN has no army of its own."],
    modelAnswer: "The veto lets any permanent member block action, so during the Cold War the USA and USSR protected themselves and their allies and the Council could not act. The UN also has no army and depends on members for troops and money, so missions were often too small or lacked a strong mandate, as in Rwanda in 1994.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a radio talk by a fictional retired nurse from Masvingo, broadcast in 2005 on United Nations Day", "People ask what the UN has ever done for us. When I trained, we still feared smallpox; my grandchildren have never seen it. In the war years I saw UN tents and food in the camps across the border. The UN did not stop every war, and the big countries argue in New York. But I judge it by the children I vaccinated.")}`,
    hints: ["Notice what the speaker chooses to judge the UN by."],
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify **three** kinds of UN work mentioned in Source A.", points: [
        "Ending smallpox / health (WHO).",
        "Tents and food in refugee camps (UNHCR / food aid).",
        "Vaccination of children (UNICEF / WHO).",
      ], explanation: "Three kinds of work." }),
      P.manual({ label: "(b)", marks: 3, stem: "What does the speaker admit about the weaknesses of the UN?", points: [
        "It did not stop every war.",
        "The big countries argue (Security Council divisions / veto).",
        "She judges it by health work rather than peace.",
      ], explanation: "Three points from the source." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful is Source A to a historian studying the effectiveness of the UN? Use the source and your own knowledge.", points: [
        "Useful: personal experience of health and refugee work.",
        "Own knowledge confirms smallpox eradication (1980) and UNHCR camps in Mozambique/Zambia.",
        "Useful: admits weaknesses, so not wholly one-sided.",
        "Limitation: a nurse focuses on health; little on peace and security.",
        "Limitation: broadcast on UN Day, likely to praise; one person's memory years later.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The source is useful for the UN's humanitarian work. The speaker, a nurse, saw health and refugee work herself, and my own knowledge confirms her points: smallpox was declared eradicated in 1980, and UNHCR supported camps for Zimbabwean refugees in Mozambique and Zambia during the war. She also admits that the UN did not stop every war and that the big powers argue, so she is not completely one-sided.\n\nHowever, she judges the UN by health, the field she knew, and says little about peace and security, where its record is weaker, for example in Rwanda in 1994. The talk was broadcast on United Nations Day, when praise is expected, and is based on memories from years before.\n\nSo it is useful evidence of the UN's humanitarian success but gives only a partial view of its overall effectiveness.", explanation: "Weigh provenance and content." }),
    ],
    explanation: "Source-based practice question on the UN (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), use named examples on both sides."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the formation of the United Nations.", points: [
        "Atlantic Charter 1941.",
        "Dumbarton Oaks talks 1944 planned the organisation.",
        "San Francisco Conference April-June 1945; Charter signed 26 June by 50 states.",
        "Came into force 24 October 1945.",
      ], explanation: "Four points." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The United Nations has been more successful in its humanitarian work than in keeping the peace.\" How far do you agree?", points: [
        ["Humanitarian success: WHO smallpox eradication; UNICEF vaccination; WFP food aid.", 2],
        ["Humanitarian success: UNHCR refugees (including Zimbabweans); human rights standards (UDHR).", 2],
        ["Peace success: Korea, Suez (UNEF), Congo, Namibia; no third world war.", 2],
        ["Peace failure: veto paralysis; Rwanda 1994; Srebrenica 1995.", 2],
        ["Qualification: humanitarian work also limited by funding / access.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The UN's humanitarian record is impressive. The WHO led the campaign that eradicated smallpox, declared in 1980, and UNICEF has vaccinated millions of children. The World Food Programme feeds people in famines, and UNHCR has helped millions of refugees, including Zimbabweans in camps in Mozambique and Zambia. The UDHR set standards for human rights worldwide.\n\nIts peace record is more mixed. It resisted aggression in Korea, its first armed peacekeepers supervised withdrawal from Suez in 1956, it helped end the Katanga secession in the Congo, and it oversaw Namibia's independence. There has been no third world war. But the veto paralysed the Security Council during the Cold War, and UN forces failed to prevent the genocide in Rwanda in 1994 and the massacre at Srebrenica in 1995.\n\nHumanitarian work is not perfect either, since it depends on funding and access. Overall I largely agree: the UN's humanitarian work has achieved more consistent success, while its peace-keeping has worked only when the great powers allowed it.", explanation: "Both sides with a judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When did the UN come into existence?", "24 October 1945, when the Charter (signed 26 June 1945 at San Francisco) came into force.");
  b.card("FACT", "Name the five permanent members of the Security Council.", "USA, Britain, France, Russia (formerly the USSR) and China.");
  b.card("DEFINITION", "Veto", "The power of each permanent member to block a Security Council decision.");
  b.card("CONCEPT", "Name the six principal organs of the UN.", "General Assembly, Security Council, Secretariat, International Court of Justice, Economic and Social Council, Trusteeship Council.");
  b.card("FACT", "When was the Universal Declaration of Human Rights adopted?", "10 December 1948, by the General Assembly.");
  b.card("FACT", "When did Zimbabwe join the UN?", "25 August 1980.");
  b.card("CONCEPT", "Give three UN peace successes and two failures.", "Successes: Korea (1950-53), Suez (1956), Namibia (1989-90). Failures: Rwanda (1994), Srebrenica (1995).");
  b.card("FACT", "What were the UN's first mandatory economic sanctions?", "Sanctions against Rhodesia after UDI, imposed in 1966 and widened in 1968.");
  b.card("DEFINITION", "Specialised agency", "An organisation linked to the UN working in one field, e.g. WHO (health), FAO (food), ILO (labour), UNESCO (education and culture).");
});
