// W2b: ahist.orgs.united-nations (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.orgs.united-nations", { file: "orgs/united-nations", keyPrefix: "orgs.united-nations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did the United Nations come into existence?",
    options: [
      ["1945", "Correct: the Charter came into force on 24 October 1945."],
      ["1919", "This is the year of the Paris Peace Conference and the League."],
      ["1939", "This is the year in which the Second World War began."],
      ["1960", "This is the year of the declaration on decolonisation."],
    ],
    answer: "A",
    explanation: "The UN Charter was signed on 26 June 1945 and came into force on 24 October 1945.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which UN organ has primary responsibility for maintaining international peace and security?",
    options: [
      ["The Security Council", "Correct: its decisions are binding on members."],
      ["The General Assembly", "The Assembly debates and recommends."],
      ["The Economic and Social Council", "ECOSOC co-ordinates economic and social work."],
      ["The International Court of Justice", "The Court settles legal disputes between states."],
    ],
    answer: "A",
    explanation: "The Security Council has primary responsibility for peace and security, and its decisions bind members.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these states is a permanent member of the Security Council with the power of veto?",
    options: [
      ["France", "Correct: the permanent members are the USA, Russia, China, France and the UK."],
      ["Germany", "Germany is not a permanent member."],
      ["Zimbabwe", "Zimbabwe has served as an elected member."],
      ["Brazil", "Brazil has served as an elected member only."],
    ],
    answer: "A",
    explanation: "The five permanent members are the United States, Russia (successor to the USSR), China, France and the United Kingdom.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "What is the veto in the Security Council?",
    options: [
      ["The power of a permanent member to block a decision by voting against it", "Correct: one negative vote from a permanent member stops it."],
      ["The power of the General Assembly to dismiss any member of the Council", "The Assembly has no such power."],
      ["The right of the Secretary-General to cancel any resolution after it is passed", "The Secretary-General has no such right."],
      ["The duty of every member to provide troops whenever the Council asks", "The veto is a power to block, not a duty."],
    ],
    answer: "A",
    hints: ["Veto means 'I forbid'."],
    explanation: "A negative vote by any of the five permanent members blocks a substantive decision of the Council.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "What did Security Council Resolution 232 of December 1966 do?",
    options: [
      ["Imposed sanctions on Rhodesia after UDI", "Correct: the first mandatory sanctions in UN history."],
      ["Admitted Zimbabwe to the United Nations as a new member", "Zimbabwe joined in 1980."],
      ["Sent peacekeepers to supervise the independence of Namibia", "That happened in 1989-90."],
      ["Created the World Health Organization as a specialised agency", "WHO was created in 1948."],
    ],
    answer: "A",
    hints: ["It was a response to UDI of 1965."],
    explanation: "Resolution 232 imposed mandatory selective sanctions on Rhodesia; Resolution 253 in 1968 extended them.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the founders of the UN include the United States and the Soviet Union and give the Security Council power to act?",
    options: [
      ["To correct League weaknesses, such as missing great powers and no enforcement", "Correct: the founders learned from the League."],
      ["To make sure the General Assembly would have no part in any decisions at all", "The Assembly remained a major organ."],
      ["To prevent smaller states from ever joining the organisation in later years", "Membership was open to peace-loving states."],
      ["To give the United Nations its own standing army from the very first day", "The UN has no standing army."],
    ],
    answer: "A",
    hints: ["Think of the League's weaknesses."],
    explanation: "The League lacked the United States and had no real power to enforce decisions; the UN was designed to include the great powers and give the Council the ability to act.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which criticism of the UN is best supported by the work of the Security Council?",
    options: [
      ["The veto can prevent action when permanent members disagree", "Correct: this limited the Council in the Cold War."],
      ["The Council has no power to make any decision that binds a state", "Its decisions are binding."],
      ["All members of the UN have a veto in the Security Council", "Only five have it."],
      ["The Council has never discussed any issue concerning Africa", "It has discussed many African issues."],
    ],
    answer: "A",
    hints: ["Choose the criticism that relies on the structure of the Council."],
    explanation: "The veto of the five permanent members can paralyse the Council.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which example best supports the view that the UN has contributed to African decolonisation?",
    options: [
      ["The 1960 declaration on colonial independence and UN supervision of Namibia", "Correct: it shows both principle and action."],
      ["The signing of the Treaty of Versailles in the Hall of Mirrors in 1919", "That predates the UN."],
      ["The foundation of the Organisation of African Unity in 1963 in Addis Ababa", "That was an African organisation, not the UN."],
      ["The failure of the UN mission to prevent the genocide in Rwanda in 1994", "That is a failure, not an example of help with decolonisation."],
    ],
    answer: "A",
    hints: ["Choose the UN action on independence."],
    explanation: "The 1960 declaration set a principle for decolonisation, and UNTAG supervised the election that led to Namibian independence in 1990.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "Zimbabwe joined the United Nations in 1980.", answer: true,
    explanation: "Zimbabwe became a UN member in 1980, after independence.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "The United Nations has a permanent army of its own that can be sent anywhere without the consent of member states.", answer: false,
    explanation: "Peacekeepers are supplied by member states; the UN has no standing army.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "The UN Secretary-General Dag Hammarskjöld died in an air crash near Ndola in 1961 while working on the Congo crisis.", answer: true,
    hints: ["Ndola was then in Northern Rhodesia."],
    explanation: "Hammarskjöld died in September 1961 near Ndola on his way to talks about the Congo; the cause of the crash has been investigated and debated.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organ or agency of the UN to its work.",
    pairs: [
      ["General Assembly", "All members debate and recommend, one vote each"],
      ["International Court of Justice", "Settles legal disputes between states at The Hague"],
      ["UNHCR", "Protects refugees"],
      ["WHO", "Leads international work on health"],
    ],
    explanation: "These are major organs and agencies of the UN system.",
  });
  {
    const events = [
      "The UN Charter comes into force",
      "Security Council Resolution 253 extends sanctions on Rhodesia",
      "Zimbabwe joins the United Nations",
      "The UN supervises Namibia's independence",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1945, 1968, 1980 and 1989-90."],
      explanation: "1945; 1968; 1980; 1989-90.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Security Council has {{blank:a}} members, of whom {{blank:b}} are permanent members with a veto.",
    blanks: [
      { id: "a", accepted: ["15"], choices: ["5", "10", "15", "51"] },
      { id: "b", accepted: ["5"], choices: ["3", "5", "10", "15"] },
    ],
    explanation: "Fifteen members: five permanent and ten elected for two years.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which city in the Netherlands is the seat of the International Court of Justice?",
    accepted: ["The Hague", "Hague", "the hague", "Den Haag"],
    wrong: ["Geneva"],
    explanation: "The ICJ sits at **The Hague**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the aims of the United Nations set out in its Charter.",
    points: ["To maintain international peace and security", "To develop friendly relations among nations based on equal rights and self-determination", "To achieve international co-operation on economic, social, cultural and humanitarian problems", "To promote respect for human rights and fundamental freedoms"],
    modelAnswer: "The UN aims to maintain international peace and security and to develop friendly relations among nations based on equal rights and self-determination. It aims to achieve international co-operation on economic, social, cultural and humanitarian problems and to promote respect for human rights and fundamental freedoms.",
    explanation: "One mark for each aim described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the United Nations was formed in 1945.",
    points: [["The League of Nations had failed to prevent the Second World War, and the founders wanted a stronger body that included the great powers and could act", 2], ["The suffering of two world wars led the Allies to want collective security and co-operation on economic and social problems, which they believed caused war", 2]],
    hints: ["Think of the League and of the war."],
    modelAnswer: "The League of Nations had failed to prevent the Second World War, and the Allies wanted a stronger body that included the great powers and could act. After two world wars they also wanted collective security and international co-operation on economic and social problems, which they believed were causes of war.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the UN helped the cause of independence in southern Africa.",
    points: [["It imposed sanctions on Rhodesia from 1966 and an arms embargo on South Africa in 1977, which increased the pressure for majority rule", 2], ["It declared the right of colonial peoples to independence in 1960, and supervised the independence of Namibia in 1989-90", 2]],
    hints: ["Give an example of pressure and an example of action."],
    modelAnswer: "The UN imposed sanctions on Rhodesia from 1966 and an arms embargo on South Africa in 1977, which increased the pressure for majority rule. It also declared the right of colonial peoples to independence in 1960 and supervised the transition to independence in Namibia in 1989-90.",
    explanation: "Credit developed examples.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an editorial in a fictional newspaper in a small African state, 1966",
        "The Security Council has at last declared that the illegal declaration of independence in Salisbury threatens the peace. Our people watch to see whether the great powers will match their words with action, for sanctions that are not enforced are only paper."),
      "",
      source("Source B", "a report by a fictional trade official in a neighbouring country, 1971",
        "Rhodesian exports continue to leave by our railways and ports. Firms in several countries supply goods through third parties, and the cost of the sanctions is borne mainly by those who obey them. Rhodesia's economy has been hurt, but it has not been broken."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What doubts does Source A express about the sanctions?", points: ["Whether the great powers will match their words with action", "Sanctions that are not enforced are only paper"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What does Source B say about the effects of the sanctions?", points: ["Trade continues through third parties and neighbouring ports and railways", "Rhodesia's economy has been hurt but not broken"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do the sources agree about the effectiveness of UN sanctions on Rhodesia?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Agree that enforcement was weak: A fears sanctions will be paper, B reports trade continuing", 1], ["Difference: B adds that the economy was hurt although not broken, which is more detailed than A's early doubts", 1], ["Provenance: A is an editorial written at the start (1966) and B a trade report five years later with detail from experience", 1], ["Own knowledge: sanctions were evaded through South Africa and Portugal but raised costs and isolated Rhodesia", 1]], modelAnswer: "The sources agree that enforcement was weak. Source A fears that sanctions will be only paper, and Source B reports that trade continued through third parties. Source B adds that the economy was hurt but not broken, which is more detailed. This is partly because A is a hopeful or anxious editorial written at the start in 1966, while B is a trade report five years later, based on experience. My own knowledge supports both, since sanctions were evaded through South Africa and Portugal but raised costs and isolated Rhodesia." }),
    ],
    hints: ["For (c), notice that A is written at the start and B several years later."],
    explanation: "Both sources are invented: an editorial and a trade official's report.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent has the United Nations been successful in maintaining international peace?",
    levels: levels(12),
    points: [
      ["Aims and powers: Charter, Security Council, collective security, peacekeeping", 2],
      ["Successes: no third world war, mediation, peacekeeping (Namibia, Mozambique), sanctions, decolonisation, humanitarian agencies", 3],
      ["Failures and limits: veto and Cold War paralysis, no army, Rwanda 1994, dependence on great powers", 3],
      ["Comparison with the League; change over time", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Compare the UN's successes with its failures, and compare it with the League."],
    modelAnswer: "The United Nations has been partly successful in maintaining peace. It was designed to be stronger than the League of Nations, with the great powers as members, a Security Council with the power to act and a Charter that bans the use of force. It has not prevented all wars, but it has avoided a third world war, mediated in many disputes, and organised peacekeeping missions in places such as Namibia and Mozambique, while its agencies have helped refugees and children. It also helped decolonisation and imposed sanctions on Rhodesia. But the veto has paralysed the Security Council when permanent members disagreed, especially in the Cold War, the UN has no army of its own, and it failed to prevent the genocide in Rwanda in 1994. I conclude that the UN has been more successful than the League because it has endured and helped to manage conflicts, but it depends on the will of the great powers and has failed in some of the gravest crises.",
    explanation: "Credit aims, successes, failures, comparison with the League and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the veto in limiting the effectiveness of the Security Council.",
    levels: levels(8),
    points: [
      ["The veto: each permanent member can block any substantive decision", 2],
      ["Effect: paralysis when permanent members disagree, especially in the Cold War; protection of allies", 2],
      ["Other limits: no army, dependence on members' troops and funds, slow decisions, politics of the elected members", 2],
      ["Judgement on how important the veto is", 2],
    ],
    hints: ["Compare the veto with other limits on the Council."],
    modelAnswer: "The veto is one of the most important limits on the Security Council, but not the only one. Any permanent member can block a substantive decision, and in the Cold War the United States and the Soviet Union often did so, which paralysed the Council and allowed them to protect their allies. But the Council is also limited by its lack of an army, by its dependence on members for troops and money, and by slow decisions. I conclude that the veto is the most serious structural limit, because it prevents action even when the other members agree, but the lack of resources and political will also limits what the Council can do.",
    explanation: "Credit explained veto, other limits and a judgement.",
  });

  b.card("DEFINITION", "What is collective security?", "The principle that peace is kept when states act together against an aggressor; the UN Charter makes the Security Council responsible.");
  b.card("DEFINITION", "What is the veto in the Security Council?", "The power of each of the five permanent members to block any substantive decision by voting against it.");
  b.card("DEFINITION", "What is peacekeeping?", "The deployment of international military, police and civilian personnel, usually with consent, to monitor a ceasefire and help a peace process.");
  b.card("FACT", "When did the UN Charter come into force?", "24 October 1945 (signed at San Francisco on 26 June 1945).");
  b.card("FACT", "Which states are the five permanent members of the Security Council?", "The United States, Russia (successor to the USSR), China, France and the United Kingdom.");
  b.card("FACT", "What were Security Council Resolutions 232 and 253?", "The 1966 and 1968 resolutions that imposed mandatory sanctions on Rhodesia after UDI; lifted in December 1979.");
  b.card("FACT", "How did Dag Hammarskjöld die?", "In an air crash near Ndola, Northern Rhodesia, in September 1961, while working on the Congo crisis.");
  b.card("CONCEPT", "How was the UN designed to avoid the weaknesses of the League?", "It included the great powers, gave the Security Council power to act, and added an economic and social mission.");
  b.card("CONCEPT", "What are the main criticisms of the UN?", "The veto, lack of an army, failures such as Rwanda 1994, unequal treatment of states and the cost of bureaucracy.");
});
