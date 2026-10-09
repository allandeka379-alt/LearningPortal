// Slice W2a: the OAU and the African Union (ZIMSEC topic 13.3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.cooperation.oau-au", { file: "cooperation/oau-au", keyPrefix: "cooperation.oau-au" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the OAU founded?",
    options: [
      ["25 May 1963", "Correct: at Addis Ababa; now celebrated as Africa Day."],
      ["24 October 1945", "That is the date the UN Charter came into force."],
      ["1 April 1980", "That is the founding of SADCC."],
      ["9 July 2002", "That is the launch of the African Union."],
    ],
    answer: "A",
    explanation: "The OAU was founded at Addis Ababa on **25 May 1963** by 32 states.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Where was the OAU Liberation Committee based?",
    options: [
      ["Dar es Salaam", "Correct: in Tanzania."],
      ["Addis Ababa", "Addis Ababa was the OAU's headquarters, not the committee's base."],
      ["Lusaka", "Lusaka hosted ZAPU, not the Liberation Committee."],
      ["Accra", "Accra did not host the Liberation Committee."],
    ],
    answer: "A",
    explanation: "The Liberation Committee sat in **Dar es Salaam**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the Casablanca group want in the early 1960s?",
    options: [
      ["Rapid political union of Africa", "Correct: Nkrumah even proposed a continental government."],
      ["Loose co-operation respecting sovereignty", "That was the Monrovia group's view."],
      ["Continued rule by colonial powers", "Both groups opposed colonial rule."],
      ["A union with apartheid South Africa", "No African group sought this."],
    ],
    answer: "A",
    explanation: "The **Casablanca group** (including Nkrumah's Ghana) wanted rapid political union; the Monrovia group wanted looser co-operation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which organ was the supreme body of the OAU?",
    options: [
      ["The Assembly of Heads of State and Government", "Correct: it met yearly to set policy."],
      ["The Council of Ministers of foreign affairs", "The ministers prepared and carried out the Assembly's work."],
      ["The General Secretariat", "The Secretariat handled administration."],
      ["The Commission of Mediation, Conciliation and Arbitration", "This was intended to settle disputes."],
    ],
    answer: "A",
    explanation: "The **Assembly of Heads of State and Government** was the supreme organ.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the OAU do little to stop abuses inside member states such as Uganda under Idi Amin?",
    options: [
      ["Its Charter stressed non-interference", "Correct: internal affairs were off-limits."],
      ["It had a large standing army stationed in the Congo", "The OAU had no standing army."],
      ["Uganda was not an OAU member", "Uganda was a member; Amin even chaired the OAU in 1975-1976."],
      ["The UN had banned it from acting", "The UN did not ban the OAU from acting."],
    ],
    answer: "A",
    hints: ["Think about the OAU's key principle."],
    explanation: "The principle of **non-interference** in internal affairs, together with a lack of forces and money, meant the OAU rarely acted inside states.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the main difference between the OAU and the AU?",
    options: [
      ["The AU may intervene in grave cases", "Correct: war crimes, genocide and crimes against humanity."],
      ["The AU includes European states", "The AU's members are African states."],
      ["The AU has no Assembly of heads of state and government", "The AU's Assembly is its supreme organ."],
      ["The AU is based in Lagos", "Both are based in Addis Ababa."],
    ],
    answer: "A",
    hints: ["Non-interference versus non-indifference."],
    explanation: "The AU moved from non-interference to **non-indifference**: it may intervene in grave circumstances.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which was a major success of the OAU?",
    options: [
      ["Support for liberation in southern Africa", "Correct: through the Liberation Committee and diplomacy."],
      ["Preventing the genocide in Rwanda in 1994", "The OAU (and the UN) failed to prevent it."],
      ["Ending all coups on the continent", "Coups remained common."],
      ["Building a powerful continental army", "The OAU never had an army."],
    ],
    answer: "A",
    hints: ["Three options describe things the OAU did not achieve."],
    explanation: "The OAU's clearest success was helping to end colonial and minority rule, including in Zimbabwe (1980), Namibia (1990) and South Africa (1994).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The African Union was launched at Durban in 2002.",
    answer: true,
    explanation: "True. It replaced the OAU in July 2002.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "At the Cairo summit of 1964 the OAU decided to redraw Africa's colonial borders.",
    answer: false,
    explanation: "False. The OAU accepted the borders inherited at independence, to avoid border wars.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each AU organ with its function.",
    pairs: [
      ["AU Commission", "The secretariat, led by a Chairperson"],
      ["Pan-African Parliament", "Consultative body representing African peoples"],
      ["Peace and Security Council", "Decides on conflicts and peace-support missions"],
      ["African Court on Human and Peoples' Rights", "Rules on human rights cases"],
    ],
    explanation: "The Commission administers; the Parliament represents peoples; the Peace and Security Council handles conflicts; the Court rules on rights.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The African Union is launched",
      "The OAU is founded at Addis Ababa",
      "The Sirte Declaration",
      "The African Charter on Human and Peoples' Rights is adopted",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["The Sirte Declaration called for the new union."],
    explanation: "OAU 1963; African Charter 1981; Sirte Declaration 1999; AU 2002.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The 1963 conference was hosted by Emperor {{blank:a}} of Ethiopia. Leaders of the Casablanca group included {{blank:b}} of Ghana.",
    blanks: [
      { id: "a", accepted: ["Haile Selassie"], choices: ["Haile Selassie", "Menelik II", "Mengistu", "Tewodros II"] },
      { id: "b", accepted: ["Kwame Nkrumah"], choices: ["Kwame Nkrumah", "Julius Nyerere", "Kenneth Kaunda", "Jomo Kenyatta"] },
    ],
    explanation: "**Haile Selassie** hosted the conference; **Nkrumah** led the call for rapid union.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Name the capital city where both the OAU and the AU have their headquarters.",
    accepted: ["Addis Ababa"],
    wrong: ["Nairobi"],
    hints: ["It is the capital of Ethiopia."],
    explanation: "**Addis Ababa**, Ethiopia.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** aims of the OAU.",
    points: [
      "Promote unity and solidarity of African states.",
      "Co-ordinate co-operation for a better life for Africans.",
      "Defend sovereignty, territorial integrity and independence.",
      "Eradicate colonialism from Africa.",
      "Promote international co-operation (UN Charter, UDHR).",
    ],
    modelAnswer: "To promote unity and solidarity; to co-ordinate co-operation for a better life; to defend sovereignty and territorial integrity; to eradicate colonialism; to promote international co-operation.",
    explanation: "One mark per aim.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** failures of the OAU.",
    points: [
      "Identifies non-interference.",
      "Explains: could not act over civil wars and abuses (Biafra, Amin, Rwanda).",
      "Identifies lack of power/army.",
      "Explains: could not enforce decisions or keep the peace.",
      "Identifies lack of money / divisions.",
      "Explains: members did not pay; disputes such as Western Sahara (Morocco left 1984).",
    ],
    hints: ["Think about principles, power, money and unity."],
    modelAnswer: "The principle of non-interference meant the OAU did little during the Nigerian civil war, Amin's rule in Uganda or the Rwandan genocide. It had no army, so it could not enforce its decisions. It was short of money because many members did not pay, and it was divided over issues such as Western Sahara, which led Morocco to leave in 1984.",
    explanation: "Two marks per developed failure.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which the OAU helped the liberation of Zimbabwe.",
    points: [
      "Identifies the Liberation Committee.",
      "Explains: channelled funds, supplies and training to ZANU and ZAPU.",
      "Identifies diplomatic action.",
      "Explains: refused to recognise UDI; pressed Britain/UN for sanctions.",
    ],
    hints: ["Think about money and diplomacy."],
    modelAnswer: "Through its Liberation Committee in Dar es Salaam the OAU channelled funds and supplies to ZANU and ZAPU. Diplomatically, its members refused to recognise UDI and pressed Britain and the UN for sanctions against Rhodesia.",
    explanation: "Two marks per developed way.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a cartoon of the kind published in an African news magazine in the 1990s, described in words", "A large round table is labelled \"OAU Summit\". Around it, well-dressed leaders smile and shake hands over a feast. Outside the window, unnoticed, smoke rises from burning villages and a line of refugees walks past carrying bundles. A sign on the door reads \"Internal affairs: do not disturb\".", { described: true })}`,
    hints: ["Connect the sign on the door with an OAU principle."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** details in Source A that show suffering outside the summit.", points: [
        "Smoke from burning villages.",
        "A line of refugees carrying bundles.",
      ], explanation: "Two details." }),
      P.manual({ label: "(b)", marks: 4, stem: "What is the message of the cartoonist? Use details from the source.", points: [
        "Message: the OAU ignored conflicts and suffering inside states.",
        "Detail: leaders feast while villages burn unnoticed.",
        "Message: non-interference was used as an excuse.",
        "Detail: the sign \"Internal affairs: do not disturb\".",
      ], explanation: "Message plus supporting detail." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How fair is the cartoonist's view of the OAU? Use the source and your own knowledge.", points: [
        "Fair: non-interference meant inaction (Biafra, Amin, Rwanda 1994).",
        "Fair: summits criticised as a heads-of-state club; no army.",
        "Unfair: success in liberation (Liberation Committee; Zimbabwe 1980, Namibia 1990).",
        "Unfair: mediated some disputes; African Charter on Human and Peoples' Rights.",
        "Context: the cartoon dates from the 1990s, when Rwanda made the failures clear.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "The cartoon is fair in many ways. The OAU's principle of non-interference meant it did little during the Nigerian civil war, Amin's rule in Uganda and the Rwandan genocide of 1994, and critics did call it a club of heads of state. It had no army to protect civilians.\n\nBut it is unfair as a judgement on the whole OAU. Its Liberation Committee helped to free Zimbabwe, Namibia and South Africa, it mediated some disputes, and it created the African Charter on Human and Peoples' Rights. The cartoon dates from the 1990s, when the failures were most obvious.\n\nSo it is a fair criticism of the OAU's record on conflicts inside states, but it ignores its achievements in liberation.", explanation: "Both sides and a judgement." }),
    ],
    explanation: "Source-based practice question on the OAU (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), compare powers on paper with action in practice."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the functions of **two** organs of the African Union.", points: [
        "Names an organ (e.g. Assembly / Commission / Peace and Security Council / Pan-African Parliament / Court).",
        "Describes its function.",
        "Names a second organ.",
        "Describes its function.",
      ], explanation: "Two marks per organ." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far has the African Union been more successful than the OAU?", points: [
        ["More successful: right to intervene; Peace and Security Council; missions in Darfur and Somalia.", 2],
        ["More successful: suspends coup governments; Agenda 2063; AfCFTA trading from 2021.", 2],
        ["Not more successful: dependence on outside funding; slow implementation.", 2],
        ["Not more successful: reluctance to act against powerful members; continuing conflicts and coups.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "In some ways the AU has done better than the OAU. Its Constitutive Act allows it to intervene in cases of war crimes, genocide and crimes against humanity, and its Peace and Security Council has sent missions to Darfur and Somalia, which the OAU never did. It suspends governments that seize power by coups, and it has launched Agenda 2063 and the African Continental Free Trade Area, under which trading began in 2021.\n\nHowever, many of the OAU's weaknesses remain. The AU depends heavily on outside funding for its budget and missions, its decisions are often implemented slowly, and it has been reluctant to act against powerful members. Conflicts and unconstitutional changes of government continue.\n\nOverall the AU is stronger on paper and has acted more often, so it has been somewhat more successful, but its record is limited by the same lack of money and political will.", explanation: "Both sides with judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When and where was the OAU founded?", "25 May 1963, Addis Ababa, by 32 states.");
  b.card("FACT", "When was the African Union launched?", "July 2002, at Durban, South Africa.");
  b.card("FACT", "Where was the OAU Liberation Committee based?", "Dar es Salaam, Tanzania.");
  b.card("DEFINITION", "Non-interference", "The OAU principle that states should not intervene in the internal affairs of other members.");
  b.card("DEFINITION", "Non-indifference", "The AU principle allowing intervention in a member state in cases of war crimes, genocide and crimes against humanity.");
  b.card("CONCEPT", "What were the Casablanca and Monrovia groups?", "Casablanca (e.g. Nkrumah's Ghana) wanted rapid political union; Monrovia wanted loose co-operation respecting sovereignty. The OAU was the compromise.");
  b.card("CONCEPT", "Name four organs of the OAU.", "Assembly of Heads of State and Government; Council of Ministers; General Secretariat; Commission of Mediation, Conciliation and Arbitration.");
  b.card("CONCEPT", "Give three failures of the OAU.", "Inaction over internal conflicts (Biafra, Amin, Rwanda); no army; shortage of money and divisions (Morocco left in 1984).");
  b.card("CONCEPT", "Give three achievements of the AU.", "Peace missions (Darfur, Somalia); suspension of coup governments; Agenda 2063 and the African Continental Free Trade Area.");
});
