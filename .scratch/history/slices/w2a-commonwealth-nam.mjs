// Slice W2a: the Commonwealth and the Non-Aligned Movement (ZIMSEC topic 13.4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.cooperation.commonwealth-nam", { file: "cooperation/commonwealth-nam", keyPrefix: "cooperation.commonwealth-nam" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where was the first summit of the Non-Aligned Movement held in 1961?",
    options: [
      ["Belgrade", "Correct: in Yugoslavia, in September 1961."],
      ["Bandung", "Bandung (1955) was the Asian-African conference that came before."],
      ["Harare", "Harare hosted the NAM summit in 1986."],
      ["Lusaka", "Lusaka hosted a NAM summit in 1970 and the 1979 CHOGM."],
    ],
    answer: "A",
    explanation: "The first NAM summit met at **Belgrade** in September 1961 with 25 members.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which Commonwealth summit agreed that Britain should call the conference that led to Zimbabwe's independence?",
    options: [
      ["Lusaka, 1979", "Correct: it led to the Lancaster House Conference."],
      ["Harare, 1991", "Harare 1991 produced the Harare Declaration."],
      ["Abuja, 2003", "Abuja 2003 kept Zimbabwe's suspension in place."],
      ["Singapore, 1971", "Singapore 1971 produced a declaration of principles."],
    ],
    answer: "A",
    explanation: "The **Lusaka CHOGM of August 1979** agreed that Britain should hold an all-party conference.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the London Declaration of 1949 allow?",
    options: [
      ["Republics to remain Commonwealth members", "Correct: India stayed in as a republic."],
      ["Britain to rule the dominions directly", "The dominions were already independent."],
      ["South Africa to leave the Commonwealth of Nations", "South Africa left in 1961."],
      ["The creation of the Secretariat", "The Secretariat was set up in 1965."],
    ],
    answer: "A",
    explanation: "The **London Declaration** let republics such as India remain members, with the monarch as Head of the Commonwealth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the main aim of the Non-Aligned Movement during the Cold War?",
    options: [
      ["To avoid joining either Cold War bloc", "Correct: neither the US-led nor the Soviet-led bloc."],
      ["To join NATO as a group", "NATO was a Western bloc alliance."],
      ["To restore colonial empires", "NAM opposed colonialism."],
      ["To support the Warsaw Pact against the West", "The Warsaw Pact was the Eastern bloc alliance."],
    ],
    answer: "A",
    explanation: "NAM members refused to join **either bloc** and opposed colonialism and apartheid.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was set up at the NAM summit in Harare in 1986?",
    options: [
      ["The AFRICA Fund", "Correct: to help the Frontline States resist South African destabilisation."],
      ["The Harare Declaration", "That came from the Commonwealth summit in Harare in 1991."],
      ["The OAU Liberation Committee", "That was set up in 1963 in Dar es Salaam."],
      ["The Southern African Power Pool", "That is a SADC project (1995)."],
    ],
    answer: "A",
    hints: ["Two meetings in Harare are easily confused."],
    explanation: "The 1986 NAM summit set up the **AFRICA Fund**; Robert Mugabe became NAM chairman.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Zimbabwe leave the Commonwealth in December 2003?",
    options: [
      ["Its suspension was kept in place at Abuja", "Correct: the government then withdrew."],
      ["It was expelled at the Lusaka meeting", "Lusaka (1979) helped bring about independence."],
      ["It joined the Non-Aligned Movement instead", "Membership of NAM and the Commonwealth was compatible."],
      ["Britain closed the Commonwealth Secretariat", "The Secretariat continued."],
    ],
    answer: "A",
    hints: ["Zimbabwe had been suspended in 2002."],
    explanation: "Suspended in March 2002, Zimbabwe withdrew when the **Abuja CHOGM** of December 2003 kept the suspension.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the strongest criticism of the Non-Aligned Movement?",
    options: [
      ["It could not enforce its decisions", "Correct: it had no power beyond persuasion."],
      ["It supported apartheid in South Africa", "NAM opposed apartheid."],
      ["It held no summits after 1961", "NAM held regular summits."],
      ["It had only European members", "Most members were in Asia, Africa and Latin America."],
    ],
    answer: "A",
    hints: ["Three options are factually wrong."],
    explanation: "NAM gave developing countries a voice but **had no means of enforcing** its decisions; some members were also close to one bloc.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Commonwealth Secretariat was set up in London in 1965.",
    answer: true,
    explanation: "True. It is based at Marlborough House and led by the Secretary-General.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Harare Declaration of 1991 was made by the Non-Aligned Movement.",
    answer: false,
    explanation: "False. It was made at the Commonwealth summit in Harare in 1991; the NAM summit in Harare was in 1986.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each founding leader of the Non-Aligned Movement with his country.",
    pairs: [
      ["Josip Broz Tito", "Yugoslavia"],
      ["Jawaharlal Nehru", "India"],
      ["Gamal Abdel Nasser", "Egypt"],
      ["Sukarno", "Indonesia"],
    ],
    extraRight: ["Ghana"],
    explanation: "Tito, Nehru, Nasser and Sukarno, with Nkrumah of Ghana, were the leading founders.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Belgrade summit of non-aligned states",
      "Statute of Westminster",
      "Harare Declaration",
      "Bandung Conference",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["Bandung came before Belgrade."],
    explanation: "Statute of Westminster 1931; Bandung 1955; Belgrade 1961; Harare Declaration 1991.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Commonwealth summit of leaders is called {{blank:a}}. The 1977 {{blank:b}} Agreement discouraged sporting contacts with apartheid South Africa.",
    blanks: [
      { id: "a", accepted: ["CHOGM"], choices: ["CHOGM", "CMAG", "NAM", "SADC"] },
      { id: "b", accepted: ["Gleneagles"], choices: ["Gleneagles", "Lusaka", "Bandung", "Windhoek"] },
    ],
    explanation: "**CHOGM** is the Commonwealth Heads of Government Meeting; the **Gleneagles** Agreement was made in 1977.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "In which city did Asian and African countries meet in April 1955, a forerunner of the Non-Aligned Movement?",
    accepted: ["Bandung"],
    wrong: ["Belgrade"],
    hints: ["The city is in Indonesia."],
    explanation: "**Bandung**, Indonesia (April 1955).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** aims of the Non-Aligned Movement.",
    points: [
      "Independence from the Cold War blocs.",
      "End colonialism.",
      "End racism and apartheid.",
      "World peace and disarmament.",
      "Economic development / fairer world economy / sovereignty and self-determination.",
    ],
    modelAnswer: "To stay out of the Cold War blocs; to end colonialism; to end racism and apartheid; to promote peace and disarmament; to promote economic development and a fairer world economy.",
    explanation: "One mark per aim.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the role of the Commonwealth in the events that led to Zimbabwe's independence.",
    points: [
      "Commonwealth members condemned UDI / supported sanctions.",
      "Lusaka CHOGM, August 1979.",
      "African leaders (Kaunda, Nyerere) argued the Patriotic Front must be included.",
      "Agreed Britain should hold an all-party conference and supervised elections.",
      "This led to the Lancaster House Conference (September-December 1979).",
      "Commonwealth monitoring force and observers at the 1980 ceasefire and elections.",
    ],
    hints: ["Start with Lusaka 1979 and follow it through to 1980."],
    modelAnswer: "Commonwealth members condemned UDI and supported sanctions against Rhodesia. At the Lusaka CHOGM in August 1979, African leaders such as Kaunda and Nyerere argued that any settlement had to include the Patriotic Front, and the meeting agreed that Britain should call an all-party conference with supervised elections. This led to the Lancaster House Conference. A Commonwealth force then monitored the ceasefire, and Commonwealth observers watched the 1980 elections.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** functions of organs of the Commonwealth.",
    points: [
      "Names an organ (e.g. CHOGM).",
      "Explains its function (leaders set policy every two years).",
      "Names a second organ (e.g. Secretariat / CMAG).",
      "Explains its function (organises programmes / deals with violations, can recommend suspension).",
    ],
    hints: ["CHOGM, the Secretariat and CMAG are the main organs."],
    modelAnswer: "CHOGM brings Commonwealth leaders together, normally every two years, to agree policy, as at Lusaka in 1979. The Commonwealth Ministerial Action Group deals with serious violations of Commonwealth values such as the Harare Declaration and can recommend suspending a member.",
    explanation: "Two marks per organ and function.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a statement by a fictional Zimbabwean government spokesperson, December 2003", "The Commonwealth has become a club in which Britain and its friends punish those who take back their land. We will not beg to be readmitted. Zimbabwe's friends are in Africa and in the South.")}\n\n${source("Source B", "a comment by a fictional Commonwealth human rights campaigner, December 2003", "The members agreed in Harare in 1991 to uphold democracy and human rights. Keeping the suspension simply holds a member to the promises it once hosted. The door remains open.")}`,
    hints: ["Each source was written by someone with a clear point of view."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "According to Source A, why was Zimbabwe being punished?", points: [
        "For taking back its land (land reform).",
        "By Britain and its friends using the Commonwealth.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How do Sources A and B differ in their explanation of Zimbabwe's suspension? Use details from both.", points: [
        "A: punishment for land reform.",
        "B: enforcing democracy and human rights commitments.",
        "A: Commonwealth controlled by Britain and friends.",
        "B: commitments agreed by all members at Harare in 1991; door open.",
      ], explanation: "Two contrasts with detail." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Use your own knowledge to explain why the two sources give different views.", points: [
        "A: government spokesperson defending its policy and dignity.",
        "A: context of land reform and Western criticism; presenting a South/Africa alignment.",
        "B: campaigner committed to the Harare Declaration.",
        "B: context of the disputed 2002 election and suspension in March 2002.",
        "Both selective: A omits election and rights concerns; B omits land and colonial history.",
        "Judgement on why they differ (purpose and position).",
      ], levels: levels(6), modelAnswer: "Source A is from a government spokesperson, whose job was to defend government policy. After the suspension in March 2002, which followed the disputed presidential election, the government presented the Commonwealth's action as Britain's punishment for land reform, and pointed to friends in Africa and the developing world.\n\nSource B is from a human rights campaigner, who supports the Harare Declaration of 1991, so he presents the suspension as holding Zimbabwe to democratic commitments it had hosted.\n\nEach is selective: Source A does not mention concerns about the election and rights, while Source B says nothing about the land question and colonial history. They differ because of their authors' positions and purposes.", explanation: "Explain differences through provenance and context." }),
    ],
    explanation: "Source-based practice question on Zimbabwe and the Commonwealth (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), set achievements against limits."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the origins of the Non-Aligned Movement.", points: [
        "Cold War divided the world into two blocs after 1945.",
        "Newly independent states did not want to be drawn in.",
        "Bandung Conference, April 1955 (29 Asian and African states).",
        "Belgrade summit, September 1961 (Tito, Nehru, Nasser, Sukarno, Nkrumah).",
      ], explanation: "Four points." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far was the Non-Aligned Movement successful in achieving its aims?", points: [
        ["Success: collective voice for developing countries at the UN.", 2],
        ["Success: kept colonialism and apartheid on the agenda; support for liberation; AFRICA Fund (Harare 1986).", 2],
        ["Limit: no power to enforce; could not stop Cold War conflicts.", 2],
        ["Limit: some members close to one bloc; economic aims (fairer world economy) largely unmet.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "NAM had real successes. It gave newly independent countries a collective voice, especially at the UN, where they formed a majority. It kept colonialism and apartheid on the world agenda and supported liberation movements; at Harare in 1986 it set up the AFRICA Fund to help the Frontline States.\n\nBut its limits were serious. It had no means of enforcing decisions and could not stop Cold War conflicts that affected its members. Some members, such as Cuba, were in practice close to one bloc, which weakened its claim to independence. Its call in the 1970s for a fairer world economy achieved little.\n\nOverall NAM succeeded as a voice for anti-colonialism and developing countries, but it was only partly successful because it lacked the power to change the policies of the superpowers or the world economy.", explanation: "Both sides plus judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Commonwealth", "A voluntary association of independent states, mostly former British colonies, sharing values such as democracy and development.");
  b.card("DEFINITION", "CHOGM", "Commonwealth Heads of Government Meeting, normally every two years.");
  b.card("FACT", "What did the London Declaration (1949) allow?", "Republics, such as India, to remain Commonwealth members, with the monarch as Head of the Commonwealth.");
  b.card("FACT", "What was decided at the Lusaka CHOGM (1979)?", "That Britain should call an all-party conference on Rhodesia, which became the Lancaster House Conference.");
  b.card("FACT", "What was the Harare Declaration (1991)?", "A Commonwealth commitment to democracy, human rights and good governance, made at the CHOGM in Harare.");
  b.card("FACT", "When did Zimbabwe leave the Commonwealth?", "December 2003, after suspension in March 2002.");
  b.card("FACT", "What were Bandung and Belgrade?", "Bandung (1955): Asian-African conference; Belgrade (1961): first summit of the Non-Aligned Movement.");
  b.card("FACT", "What happened at the NAM summit in Harare (1986)?", "Mugabe became NAM chairman and the AFRICA Fund was set up to help the Frontline States.");
  b.card("CONCEPT", "Name the five leading founders of NAM.", "Tito (Yugoslavia), Nehru (India), Nasser (Egypt), Sukarno (Indonesia), Nkrumah (Ghana).");
});
