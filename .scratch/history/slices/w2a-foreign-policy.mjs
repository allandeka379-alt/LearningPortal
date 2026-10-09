// Slice W2a: Zimbabwe and the international community since 1980 (ZIMSEC topic 13.6).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.independence.foreign-policy", { file: "independence/foreign-policy", keyPrefix: "independence.foreign-policy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What did Zimbabwean troops protect in Mozambique from 1982?",
    options: [
      ["The Beira corridor", "Correct: the railway, road and pipeline to the port of Beira."],
      ["The Kariba Dam", "Kariba is on the Zambezi between Zimbabwe and Zambia."],
      ["The TAZARA railway", "TAZARA runs between Zambia and Tanzania."],
      ["The Benguela railway", "The Benguela railway runs through Angola."],
    ],
    answer: "A",
    explanation: "Troops guarded the **Beira corridor** against RENAMO attacks, giving Zimbabwe a route to the sea that avoided South Africa.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which year did Zimbabwe leave the Commonwealth?",
    options: [
      ["2003", "Correct: Zimbabwe withdrew in December 2003."],
      ["1980", "Zimbabwe joined the Commonwealth at independence in 1980."],
      ["1991", "In 1991 Harare hosted a Commonwealth summit."],
      ["2013", "2013 is the year of the new Constitution."],
    ],
    answer: "A",
    explanation: "Suspended in 2002, Zimbabwe left the Commonwealth in **December 2003**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which countries sent troops to support Laurent Kabila's government in the DRC in 1998?",
    options: [
      ["Zimbabwe, Angola and Namibia", "Correct: the three intervened in August 1998."],
      ["Rwanda, Uganda and Burundi", "Rwanda and Uganda backed the rebels."],
      ["South Africa, Botswana and Lesotho", "South Africa and Botswana intervened in Lesotho in 1998, not the DRC."],
      ["Tanzania, Kenya and Malawi", "These did not send combat troops to support Kabila."],
    ],
    answer: "A",
    explanation: "**Zimbabwe, Angola and Namibia** intervened; the rebels were backed by Rwanda and Uganda.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a principle of Zimbabwe's foreign policy?",
    options: [
      ["Non-alignment", "Correct: staying out of the Cold War blocs."],
      ["Membership of NATO", "NATO is a Western military alliance; Zimbabwe is not a member."],
      ["Support for apartheid", "Zimbabwe opposed apartheid."],
      ["Alliance with the Warsaw Pact", "Zimbabwe did not join the Eastern bloc alliance."],
    ],
    answer: "A",
    explanation: "Zimbabwe's principles include **non-alignment**, sovereignty, Pan-Africanism, support for liberation and peaceful co-existence.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which measure was part of the EU's restrictive measures of 2002?",
    options: [
      ["A travel ban on named individuals", "Correct: with an asset freeze and an arms embargo."],
      ["A ban on all humanitarian food aid", "Humanitarian aid continued."],
      ["A naval blockade of Beira", "There was no blockade."],
      ["Expulsion of Zimbabwe from the UN", "The EU cannot expel a state from the UN."],
    ],
    answer: "A",
    hints: ["The measures targeted people and arms."],
    explanation: "The EU imposed a **travel ban and asset freeze** on named people, an **arms embargo** and suspended most development co-operation with the government.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a reason for the Look East Policy?",
    options: [
      ["Loss of Western credit after 2000", "Correct: closer ties with Asia replaced lost Western support."],
      ["China's request to join SADC", "China is not an African state and cannot join SADC."],
      ["The end of the Cold War in 1945", "The Cold War began after 1945 and ended about 1989-1991."],
      ["Britain's offer of large new loans to Harare", "Britain was not offering new loans then."],
    ],
    answer: "A",
    hints: ["What had happened to relations with the West?"],
    explanation: "Sanctions and the loss of Western credit, China's growth and old friendship from the liberation struggle led to the **Look East Policy** from about 2003.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the 2002 EU measures is a fact rather than an opinion?",
    options: [
      ["They included an arms embargo", "Correct: this can be checked in the EU decision."],
      ["They were the main cause of the economic crisis", "This is a disputed judgement."],
      ["They were a fair punishment for land reform", "This is an opinion."],
      ["They had no effect on ordinary people", "This is a disputed judgement."],
    ],
    answer: "A",
    hints: ["A fact can be checked; an opinion is a judgement people disagree about."],
    explanation: "That the measures included an **arms embargo** is a checkable fact; their effects and fairness are debated.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Harare hosted the summit of the Non-Aligned Movement in 1986.",
    answer: true,
    explanation: "True. Harare hosted the eighth NAM summit in September 1986.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "China had supported ZANU and ZANLA during the liberation struggle.",
    answer: true,
    explanation: "True. China trained and armed ZANLA, which helps explain the close relationship after independence.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each country with an example of its relations with Zimbabwe.",
    pairs: [
      ["China", "Loans and projects such as power station expansions"],
      ["Mozambique", "Zimbabwean troops guarded the Beira corridor"],
      ["Democratic Republic of the Congo", "Zimbabwean troops supported Laurent Kabila"],
      ["United States", "The ZDERA law of 2001"],
    ],
    explanation: "China: trade and loans; Mozambique: the Beira corridor (1982-1992); DRC: intervention 1998-2002; United States: ZDERA (2001).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "Zimbabwe sends troops to the DRC",
      "Troops deployed to protect the Beira corridor",
      "Zimbabwe leaves the Commonwealth",
      "Harare hosts the Non-Aligned Movement summit",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["Mozambique came first; the Commonwealth exit was in 2003."],
    explanation: "Beira corridor 1982; NAM summit 1986; DRC 1998; Commonwealth exit 2003.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The rebels who attacked the Beira corridor were called {{blank:a}}. The policy of closer ties with China from about 2003 was called the {{blank:b}} Policy.",
    blanks: [
      { id: "a", accepted: ["RENAMO"], choices: ["RENAMO", "FRELIMO", "UNITA", "SWAPO"] },
      { id: "b", accepted: ["Look East"], choices: ["Look East", "Open Door", "Good Neighbour", "Forward"] },
    ],
    explanation: "RENAMO fought the FRELIMO government of Mozambique; the **Look East** Policy began about 2003.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Name the port in Mozambique linked to Zimbabwe by the corridor that Zimbabwean troops protected.",
    accepted: ["Beira"],
    wrong: ["Maputo"],
    hints: ["The corridor carried a railway, road and oil pipeline."],
    explanation: "**Beira**: the corridor gave Zimbabwe a route to the sea that avoided South Africa.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "State **five** principles of Zimbabwe's foreign policy.",
    points: [
      "Sovereignty and non-interference in internal affairs.",
      "Non-alignment.",
      "Pan-Africanism / African solidarity.",
      "Support for liberation movements (against apartheid, for Namibia).",
      "Peaceful co-existence / peaceful settlement of disputes / multilateralism / economic development.",
    ],
    modelAnswer: "Respect for sovereignty and non-interference; non-alignment; Pan-Africanism; support for liberation movements in southern Africa; and the peaceful settlement of disputes.",
    explanation: "One mark per principle.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the reasons for the Look East Policy.",
    points: [
      "Western sanctions/restrictive measures after 2000.",
      "Loss of Western credit, aid and investment.",
      "China's fast-growing economy and demand for raw materials.",
      "Old friendship: Chinese support for ZANU/ZANLA in the liberation struggle.",
      "China does not attach political conditions about domestic affairs to loans.",
      "Diplomatic support (e.g. China's veto at the UN Security Council in 2008).",
    ],
    hints: ["Think about what was happening with the West and what China offered."],
    modelAnswer: "After 2000 relations with the West broke down, and the EU's measures and the loss of Western credit and investment left the government looking for new partners. China's fast-growing economy wanted raw materials such as minerals and tobacco. China had supported ZANU and ZANLA in the liberation struggle, so there was an old friendship, and it did not attach political conditions about domestic affairs to its loans. China also gave diplomatic support, vetoing a proposed UN Security Council sanctions resolution in 2008.",
    explanation: "One mark per explained reason.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Explain **one** argument for and **one** argument against Zimbabwe's intervention in the DRC, then give your judgement.",
    points: [
      "Argument for identified (defended a recognised government / SADC member's sovereignty).",
      "Argument for developed (prevented overthrow; contributed to ceasefire 1999).",
      "Argument against identified (very costly during economic difficulty).",
      "Argument against developed (SADC divided / allegations of business interests in minerals).",
      ["Supported judgement.", 2],
    ],
    hints: ["Give both sides before judging."],
    modelAnswer: "In favour, the intervention defended the recognised government of a SADC member against rebels backed by Rwanda and Uganda, upholding sovereignty, and it contributed to the Lusaka ceasefire of 1999. Against it, the war was very expensive at a time of economic difficulty, SADC members were divided, and critics alleged that business interests in Congolese minerals influenced the decision. On balance the intervention achieved its immediate aim of keeping the government in power, but the cost to Zimbabwe's economy and reputation was high, so its value remains debated.",
    explanation: "Two marks per developed argument, two for a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an editorial in a fictional Harare newspaper that supported the government, 2004", "The so-called targeted measures are nothing of the kind. Banks abroad will no longer lend to us, investors stay away, and it is the farmer, the worker and the patient in hospital who suffer. These are sanctions on a whole nation, imposed because we took back our land.")}\n\n${source("Source B", "a statement by a fictional spokesperson for a European government, 2004", "Our measures are aimed at a small number of named individuals responsible for violence and for undermining elections. They do not stop trade, and we remain one of the largest providers of humanitarian aid to the people of Zimbabwe.")}`,
    hints: ["Compare who wrote each source and why."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "According to Source A, who suffered from the measures?", points: [
        "Farmers and workers.",
        "Patients in hospital / ordinary people / the whole nation.",
      ], explanation: "Two groups from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "In what ways do Sources A and B disagree? Use details from both sources.", points: [
        "A: measures hit the whole nation; B: aimed at a few named individuals.",
        "A: imposed because of land reform; B: imposed because of violence and elections.",
        "A: investment and lending stopped; B: trade not stopped.",
        "B: humanitarian aid continues; A implies ordinary people abandoned.",
      ], explanation: "One mark per point of disagreement with detail." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Why do Sources A and B give such different views? Use the provenance of the sources and your own knowledge.", points: [
        "A from a pro-government paper: presents measures as punishment for land reform.",
        "A's purpose: win support at home / blame outside forces for the crisis.",
        "B from a European government: defends its own policy.",
        "B's purpose: show the measures as fair and humane to the public.",
        "Own knowledge: measures were formally targeted (travel ban, asset freeze, arms embargo) but credit and investment fell.",
        "Judgement: each reflects its author's interest; both contain some truth.",
      ], levels: levels(6), modelAnswer: "Source A comes from a newspaper that supported the government, so it presents the measures as sanctions on the whole nation imposed to punish land reform, which helps the government blame outside forces for the economic crisis. Source B comes from a European government defending its own policy, so it stresses that the measures targeted only named individuals and that humanitarian aid continued. From my own knowledge, the EU's 2002 measures were formally targeted, a travel ban, asset freeze and arms embargo, but at the same time foreign lending and investment fell sharply. Each source therefore reflects its author's interest, and each contains part of the truth.", explanation: "Explain differences through provenance and purpose." }),
    ],
    explanation: "Source-based practice question on sanctions (12 marks).",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), give benefits and costs, then judge."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe Zimbabwe's role in Mozambique in the 1980s.", points: [
        "Troops deployed from 1982.",
        "Guarded the Beira corridor (railway, road, pipeline).",
        "Fought RENAMO rebels backed by South Africa.",
        "Withdrew after the Rome peace accords of 1992.",
      ], explanation: "Four points." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "How far has the Look East Policy benefited Zimbabwe?", points: [
        ["Benefit: trade (tobacco, minerals) and investment when Western credit was scarce.", 2],
        ["Benefit: infrastructure (power stations such as Kariba South and Hwange, Parliament building); diplomatic support (2008 veto).", 2],
        ["Limitation: debts from loans.", 2],
        ["Limitation: criticisms over working conditions, goods and environmental impact; did not replace Western markets.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "The Look East Policy brought clear benefits. When Western credit dried up after 2000, China became a major buyer of tobacco and minerals and provided loans and investment. Chinese firms expanded power stations such as Kariba South and Hwange and built a new Parliament building. China also gave diplomatic protection, vetoing a proposed UN sanctions resolution in 2008.\n\nHowever, there were costs. Loans created debts that must be repaid. Critics complained about working conditions in some firms, the quality of some imported goods and the environmental impact of some mining. Asian partners did not fully replace Western investment and markets.\n\nOverall the policy helped Zimbabwe to survive isolation and to build important infrastructure, but its benefits were limited by debt and other problems, so it was only a partial success.", explanation: "Both sides with judgement." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Non-alignment", "Refusing to join either Cold War bloc while trading with both.");
  b.card("DEFINITION", "Look East Policy", "From about 2003, Zimbabwe's policy of closer economic and political ties with China and other Asian countries.");
  b.card("FACT", "What did the EU's 2002 restrictive measures include?", "A travel ban and asset freeze on named individuals, an arms embargo and suspension of most development co-operation with the government.");
  b.card("FACT", "When did Zimbabwe leave the Commonwealth?", "December 2003 (after suspension in 2002).");
  b.card("FACT", "Why did Zimbabwean troops go to Mozambique in 1982?", "To protect the Beira corridor (railway, road and pipeline to the sea) against RENAMO.");
  b.card("FACT", "Which countries sent troops to support Kabila in the DRC in 1998?", "Zimbabwe, Angola and Namibia.");
  b.card("CONCEPT", "Give four reasons for the Look East Policy.", "Western sanctions and loss of credit; China's growing economy; old friendship from the liberation struggle; no political conditions on loans (and diplomatic support at the UN).");
  b.card("CONCEPT", "What are the two main views of the post-2000 measures?", "Government: illegal sanctions punishing land reform and hurting ordinary people. EU/US: targeted measures over human rights and elections, with humanitarian aid continuing.");
  b.card("FACT", "Name five principles of Zimbabwe's foreign policy.", "Sovereignty and non-interference; non-alignment; Pan-Africanism; support for liberation; peaceful co-existence.");
});
