// Slice W2a: SADCC and SADC (ZIMSEC topic 13.2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.cooperation.sadc", { file: "cooperation/sadc", keyPrefix: "cooperation.sadc" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where and when was SADCC founded?",
    options: [
      ["Lusaka, 1980", "Correct: on 1 April 1980."],
      ["Windhoek, 1992", "That is where and when SADC replaced SADCC."],
      ["Addis Ababa, 1963", "That is the founding of the OAU."],
      ["Gaborone, 1994", "Gaborone is SADC's headquarters; 1994 is when South Africa joined."],
    ],
    answer: "A",
    explanation: "SADCC was founded at **Lusaka on 1 April 1980** by nine states.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Where is the headquarters of SADC?",
    options: [
      ["Gaborone", "Correct: the Secretariat is in Gaborone, Botswana."],
      ["Harare", "Harare is Zimbabwe's capital; it is not SADC's headquarters."],
      ["Pretoria", "South Africa joined only in 1994; the headquarters is elsewhere."],
      ["Addis Ababa", "Addis Ababa is the headquarters of the African Union."],
    ],
    answer: "A",
    explanation: "SADC's Secretariat is in **Gaborone**, Botswana.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the main aim of SADCC when it was founded?",
    options: [
      ["To reduce dependence on South Africa", "Correct: especially on apartheid South Africa's ports and railways."],
      ["To create a single African army", "SADCC was about economic co-ordination."],
      ["To admit apartheid South Africa as a member", "SADCC was formed partly to reduce dependence on it."],
      ["To replace the Commonwealth in Africa", "SADCC had no such aim."],
    ],
    answer: "A",
    explanation: "SADCC's Lusaka Declaration called for economic liberation: **reducing dependence**, especially on apartheid South Africa.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which country was NOT a founding member of SADCC in 1980?",
    options: [
      ["South Africa", "Correct: it joined SADC only in 1994."],
      ["Malawi", "Malawi was a founder."],
      ["Lesotho", "Lesotho was a founder."],
      ["Zimbabwe", "Zimbabwe was a founder."],
    ],
    answer: "A",
    explanation: "The nine founders were Angola, Botswana, Lesotho, Malawi, Mozambique, Swaziland, Tanzania, Zambia and Zimbabwe. **South Africa** joined in 1994.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which SADC organ is the supreme policy-making body?",
    options: [
      ["The Summit of Heads of State and Government", "Correct: it meets every year."],
      ["The Secretariat in Gaborone, led by the Executive Secretary", "The Secretariat is the administrative body."],
      ["The SADC Tribunal for disputes under the Treaty", "The Tribunal was a court for disputes under the Treaty."],
      ["The National Committees", "These link SADC with each member country."],
    ],
    answer: "A",
    hints: ["Which body brings the leaders together?"],
    explanation: "The **Summit** of Heads of State and Government is SADC's supreme policy-making body.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did SADCC become SADC in 1992?",
    options: [
      ["Members wanted a stronger body with a binding treaty", "Correct: to move from co-ordination to integration."],
      ["Apartheid South Africa had become stronger than ever", "Apartheid was ending in the early 1990s."],
      ["The OAU had ordered all regional bodies to close", "The OAU did not order this."],
      ["Zimbabwe had left and the others wanted a fresh start", "Zimbabwe remained a member."],
    ],
    answer: "A",
    hints: ["Think about how the region changed around 1990."],
    explanation: "With Namibia independent, apartheid ending and the Cold War over, members wanted a **legally binding** community aiming at integration.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the best evidence of a SADC weakness?",
    options: [
      ["Overlapping membership of other trade blocs", "Correct: it complicates trade rules and slows integration."],
      ["The opening of the Southern African Power Pool", "This is a success, not a weakness."],
      ["The rebuilding of the Beira corridor", "This is a success of SADCC."],
      ["Regular annual summits of leaders", "Regular summits show a working institution."],
    ],
    answer: "A",
    hints: ["Three options describe achievements."],
    explanation: "Overlapping membership of bodies such as COMESA and SACU complicates trade rules; the other options are successes.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "South Africa joined SADC in 1994, after the end of apartheid.",
    answer: true,
    explanation: "True. South Africa joined in 1994.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "SADCC was a tightly organised body with a binding treaty from the start.",
    answer: false,
    explanation: "False. SADCC was a loose co-ordination conference; members each co-ordinated a sector. The binding treaty came with SADC in 1992.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each SADC body or project with its function.",
    pairs: [
      ["Secretariat", "Runs the organisation day to day from Gaborone"],
      ["Organ on Politics, Defence and Security", "Handles peace and conflict prevention"],
      ["Southern African Power Pool", "Lets members share and trade electricity"],
      ["Beira corridor", "Gives landlocked states a route to the sea"],
    ],
    explanation: "The Secretariat administers; the Organ handles security; the Power Pool links grids; corridors link inland states to ports.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "SADC Free Trade Area launched",
      "SADCC founded in Lusaka",
      "South Africa joins SADC",
      "SADC Treaty signed at Windhoek",
    ],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["SADCC came before SADC."],
    explanation: "SADCC 1980; SADC Treaty 1992; South Africa joins 1994; Free Trade Area 2008.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The SADC Treaty was signed at {{blank:a}} on 17 August 1992. In SADCC, Zimbabwe co-ordinated the sector of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Windhoek"], choices: ["Windhoek", "Lusaka", "Arusha", "Maputo"] },
      { id: "b", accepted: ["food security"], choices: ["food security", "transport", "energy", "mining"] },
    ],
    explanation: "SADC was created at **Windhoek**; Zimbabwe co-ordinated **food security** (Mozambique co-ordinated transport).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What do the letters SADC stand for?",
    accepted: ["Southern African Development Community", "Southern Africa Development Community"],
    keywords: undefined,
    wrong: ["Southern African Development Co-ordination Conference"],
    explanation: "**Southern African Development Community** (1992). SADCC was the Southern African Development Co-ordination Conference.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "List **five** founding members of SADCC.",
    points: [
      "First correct member.",
      "Second correct member.",
      "Third correct member.",
      "Fourth correct member.",
      "Fifth correct member (from Angola, Botswana, Lesotho, Malawi, Mozambique, Swaziland/Eswatini, Tanzania, Zambia, Zimbabwe).",
    ],
    modelAnswer: "Zimbabwe, Zambia, Botswana, Mozambique and Tanzania.",
    explanation: "One mark per correct founding member; South Africa and Namibia do not score.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the role of SADC in the socio-economic development of southern Africa.",
    points: [
      "Transport corridors (Beira, Maputo, Nacala).",
      "Southern African Power Pool shares electricity.",
      "Free Trade Area (2008) reduces tariffs.",
      "Food security / drought early warning.",
      "Health programmes (HIV and AIDS, malaria).",
      "Peace, mediation and election observation support development.",
    ],
    hints: ["Think of transport, energy, trade, food, health and peace."],
    modelAnswer: "SADC develops transport corridors such as Beira and Maputo so landlocked states can reach the sea. The Power Pool lets members share electricity. The Free Trade Area of 2008 cut tariffs on trade between members. SADC runs drought early-warning and food security programmes and joint health programmes against HIV and AIDS and malaria. Its mediation and election observation help keep the peace needed for development.",
    explanation: "One mark per described role.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** failures or weaknesses of SADC.",
    points: [
      "Identifies a weakness (e.g. donor dependence / slow implementation).",
      "Explains its effect.",
      "Identifies a second weakness (e.g. South African dominance / overlapping memberships / divisions).",
      "Explains its effect.",
    ],
    hints: ["Consider money, trade and politics."],
    modelAnswer: "SADC has depended heavily on foreign donors, so many projects were shaped by donors' priorities and stalled when money ran out. South Africa's economy is far larger than the others, so it gains most from free trade while smaller members struggle to compete.",
    explanation: "Two marks per developed weakness.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "a speech by a fictional delegate at a regional business forum in Gaborone, 2012", "Thirty years ago a truck from Lusaka to the sea had to pass through apartheid South Africa. Today we have the corridors, the Power Pool and a free trade area. Yet a trader in Bulawayo still waits days at a border post, our factories still buy more from outside the region than from each other, and many projects still wait for money from abroad.")}`,
    hints: ["Find both achievements and problems in the source."],
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify **three** achievements of regional co-operation mentioned in Source A.", points: [
        "Transport corridors.",
        "The Power Pool.",
        "A free trade area.",
      ], explanation: "Three achievements from the source." }),
      P.manual({ label: "(b)", marks: 3, stem: "What problems of SADC does the delegate identify?", points: [
        "Delays at border posts.",
        "Members trade more with outsiders than with each other.",
        "Dependence on foreign funding for projects.",
      ], explanation: "Three problems from the source." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How far does Source A give a balanced view of SADC's record? Use the source and your own knowledge.", points: [
        "Balanced: gives both achievements and problems.",
        "Own knowledge confirms achievements (Beira corridor, Power Pool 1995, FTA 2008).",
        "Own knowledge confirms problems (donor dependence, low intra-regional trade).",
        "Omits: peace and mediation work (Zimbabwe 2008, Lesotho, Madagascar).",
        "Omits: political criticisms (Tribunal suspension, divisions over the DRC).",
        "Supported judgement; provenance: a business forum focuses on trade.",
      ], levels: levels(6), modelAnswer: "The source is fairly balanced, since it lists achievements, the corridors, the Power Pool and the free trade area, and also problems such as border delays, low trade between members and dependence on foreign funding. My own knowledge confirms these: the Beira corridor and the Power Pool of 1995 are real achievements, and donor dependence has long weakened SADC.\n\nHowever, the delegate was speaking at a business forum, so he concentrates on trade and infrastructure. He leaves out SADC's peace work, such as mediation in Zimbabwe in 2008, and political criticisms, such as the suspension of the Tribunal in 2010 and divisions over the DRC.\n\nSo the source is balanced on economic matters but gives an incomplete view of SADC's whole record.", explanation: "Weigh balance, provenance and omissions." }),
    ],
    explanation: "Source-based practice question on SADC's record (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), judge SADCC against its own original aims."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Outline the aims of SADC.", points: [
        "Economic growth and poverty reduction.",
        "Regional integration and free trade.",
        "Peace, security and democracy.",
        "Shared resources and the environment / links between peoples / fighting disease.",
      ], explanation: "Four aims." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "To what extent did SADCC achieve its aim of reducing dependence on South Africa before it was replaced by SADC?", points: [
        ["Achieved: corridors (Beira, Maputo, Nacala) rebuilt; Beira protected by Zimbabwean troops.", 2],
        ["Achieved: international aid attracted; sectoral co-ordination built co-operation.", 2],
        ["Not achieved: South African destabilisation (support for RENAMO) damaged corridors.", 2],
        ["Not achieved: Lesotho, Swaziland, Botswana remained in a customs union with South Africa; migrant labour and trade continued.", 2],
        ["Not achieved: donor dependence replaced one dependence with another.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "SADCC had some success. It made transport its first priority, and the Beira, Maputo and Nacala corridors were rebuilt with international funding, giving landlocked states routes to the sea that avoided South Africa. Zimbabwean troops protected the Beira corridor. SADCC attracted a great deal of foreign aid, and the sectoral system, with each member leading one area, built habits of co-operation.\n\nBut dependence was far from ended. South Africa backed RENAMO and other rebels, whose attacks damaged railways and pipelines and kept the corridors unreliable. Lesotho, Swaziland and Botswana remained in a customs union with South Africa, and most members still traded heavily with it and sent migrant workers to its mines. SADCC itself depended on foreign donors, so one dependence was partly replaced by another.\n\nOverall SADCC achieved a limited reduction in dependence, mainly in transport, but South Africa's economic power and its destabilisation meant that real economic liberation came only after apartheid ended.", explanation: "Both sides with a judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When and where was SADCC founded?", "1 April 1980, Lusaka, by nine states.");
  b.card("FACT", "When and where was SADC created?", "17 August 1992, at Windhoek, Namibia.");
  b.card("FACT", "Where is SADC's headquarters?", "Gaborone, Botswana.");
  b.card("FACT", "Name the nine founders of SADCC.", "Angola, Botswana, Lesotho, Malawi, Mozambique, Swaziland (Eswatini), Tanzania, Zambia, Zimbabwe.");
  b.card("CONCEPT", "What was SADCC's main aim?", "To reduce economic dependence, especially on apartheid South Africa, and co-ordinate regional development.");
  b.card("FACT", "When did South Africa join SADC?", "1994, after the end of apartheid.");
  b.card("CONCEPT", "Name four organs of SADC.", "Summit of Heads of State and Government; Organ on Politics, Defence and Security; Council of Ministers; Secretariat (also the Tribunal and National Committees).");
  b.card("CONCEPT", "Give three successes and three weaknesses of SADC.", "Successes: corridors, Power Pool, mediation (e.g. Zimbabwe 2008). Weaknesses: donor dependence, slow integration, South African dominance.");
  b.card("DEFINITION", "Free trade area", "A group of countries that remove most tariffs on goods traded between them; SADC's was launched in 2008.");
});
