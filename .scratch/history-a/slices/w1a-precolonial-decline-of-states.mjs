// W1a: ahist.precolonial.decline-of-states (ZIMSEC topics 2 and 12-ish comparative essay skill).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.precolonial.decline-of-states", { file: "precolonial/decline-of-states", keyPrefix: "precolonial.decline-of-states" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an **internal** factor in the decline of a state?",
    options: [
      ["A dispute over who should succeed the ruler", "Correct: succession disputes arise inside the state."],
      ["An invasion by Nguni groups from the south", "An invasion comes from outside the state."],
      ["A shift of trade routes to the Zambezi valley", "A trade shift is an external change."],
      ["A campaign by a European army with machine guns", "A European campaign is external."],
    ],
    answer: "A",
    explanation: "Succession disputes, rebellions and divisions in the army arise inside a state; invasions, trade shifts and European campaigns come from outside.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which state did the tributary peoples (Tsonga, Chopi and Ndau) help to weaken resistance to a European invasion?",
    options: [
      ["The Gaza state", "Correct: discontented tributaries did not support Ngungunyana."],
      ["The Zulu state", "The Zulu kingdom had other peoples in its core."],
      ["The Torwa state", "The Torwa state fell to the Rozvi, not to a European army."],
      ["The Mutapa state", "The Mutapa tributaries rebelled in the seventeenth century."],
    ],
    answer: "A",
    explanation: "The Tsonga, Chopi and Ndau were tributaries of Gaza; their discontent was one of the weaknesses that the Portuguese used.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which states were ended by the Nguni invasions and the arrival of the Ndebele in the 1830s?",
    options: [
      ["The Rozvi state", "Correct: Nguni groups and the Ndebele broke Rozvi power."],
      ["The Mutapa state", "The Mutapa state was reduced earlier by the Rozvi and Portuguese interference."],
      ["The Gaza state", "Gaza was founded in the 1820s and fell in 1895."],
      ["The Mandinka state", "The Mandinka state was in West Africa."],
    ],
    answer: "A",
    explanation: "The Rozvi state, weakened by internal divisions, was overrun in the 1830s.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What is the difference between a **long-term condition** and a **trigger**?",
    options: [
      ["A condition builds up slowly; a trigger starts collapse", "Correct: the condition makes collapse possible, and the trigger sets it off."],
      ["A condition is an external cause; a trigger is an internal one", "Both can be internal or external."],
      ["A condition follows the collapse; a trigger comes before it", "Both come before the collapse."],
      ["A condition applies to Europeans; a trigger applies to Africans", "The distinction applies to any case."],
    ],
    answer: "A",
    hints: ["Think of a pile of dry wood and a spark."],
    explanation: "Succession disputes were conditions; invasions or campaigns were triggers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which pair of events is a condition followed by a trigger?",
    options: [
      ["Disputed succession in the Rozvi state, then invasion", "Correct: internal weakness followed by an external attack."],
      ["The Rudd Concession, then the founding of the Ndebele", "The Ndebele state was founded long before the concession."],
      ["Sundiata's rule in Mali, then the rule of Samori", "These are different periods and not a cause-and-effect pair."],
      ["Samori's capture in 1898, then the Rudd Concession", "The Rudd Concession (1888) came ten years before Samori's capture and had no link with it."],
    ],
    answer: "A",
    hints: ["Which pair is about weakness followed by attack?"],
    explanation: "Weak succession and independent provinces were the condition; the Nguni attacks in the 1830s were the trigger.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which evidence best challenges the claim that European weapons alone explain the fall of African states?",
    options: [
      ["Samori resisted the French for sixteen years with rifles", "Correct: he held out because his state had resources and organisation."],
      ["The Portuguese used machine guns at Coolela in 1895", "This supports the weapons claim."],
      ["The BSAC used the Maxim gun in the war of 1893-94", "This also supports the weapons claim."],
      ["Lobengula had fewer rifles than the Company police had", "This supports the claim."],
    ],
    answer: "A",
    hints: ["Choose the example that shows an African state doing well against Europeans."],
    explanation: "If weapons alone had decided, Samori would not have lasted so long. The final defeat came when he lost his arms supply and support.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is best supported by comparing the earlier states (Great Zimbabwe, Mutapa, Rozvi) with the later ones (Ndebele, Gaza, Mandinka)?",
    options: [
      ["Earlier states ended within Africa; later ones by European armies", "Correct: the type of outside force changed."],
      ["All seven states fell for exactly the same set of reasons", "The causes differed between states and periods."],
      ["No internal weakness mattered in the later states at all", "Internal weaknesses mattered in all cases."],
      ["Europeans ended every state studied, even Great Zimbabwe", "Great Zimbabwe declined centuries before."],
    ],
    answer: "A",
    hints: ["Consider who the outside force was in each period."],
    explanation: "Earlier states were reduced by other African powers or by gradual decline; the later ones were ended by European armies with modern weapons.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Every state studied had both internal and external causes of decline.",
    answer: true,
    explanation: "True. In every case internal weakness and outside pressure interacted.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A strong comparative essay narrates the decline of each state separately in turn.",
    answer: false,
    explanation: "False. A comparative essay groups the states by theme (internal and external factors) and makes comparisons.",
  });
  b.tf({
    d: 3, skill: "EVALUATION",
    stem: "The fact that Samori Toure resisted for sixteen years is evidence that European weapons were not the only factor.",
    answer: true,
    hints: ["What would we expect if weapons alone decided?"],
    explanation: "True. Samori held out until he lost his arms supply and faced revolts, which shows that other factors mattered.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each state with the power that brought about its end or decline.",
    pairs: [
      ["The Rozvi state", "Nguni invaders and the Ndebele"],
      ["The Gaza state", "Portugal"],
      ["The Mandinka state of Samori", "France"],
      ["The Ndebele state", "The British South Africa Company"],
    ],
    explanation: "Each state met a different outside force.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Sort each cause as an internal factor or an external factor.",
    pairs: ["Succession dispute in the Mutapa state", "Portuguese support for rival claimants", "Divided army in the Ndebele state", "Loss of the Sierra Leone arms market by Samori", "Discontent among the Tsonga and Chopi"],
    right: ["Internal", "External"],
    rightIndex: [0, 1, 0, 1, 0],
    hints: ["Ask whether the cause arose inside the state or outside it."],
    explanation: "Succession disputes, army divisions and tributary discontent are internal; Portuguese support and the closing of the arms market are external.",
  });
  {
    const events = [
      "Changamire Dombo expels the Portuguese from the plateau",
      "Nguni groups invade the Rozvi state",
      "The Boers defeat the Zulu army at Blood River",
      "The Gaza army is defeated at Coolela",
    ];
    const order = [0, 1, 2, 3];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["The Rozvi expelled the Portuguese in the late 1600s."],
      explanation: "Late 1600s, 1830s, 1838 and 1895.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A weakness that builds up over years is a {{blank:a}}, and the event that starts the collapse is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["condition"], choices: ["condition", "trigger", "treaty", "tribute"] },
      { id: "b", accepted: ["trigger"], choices: ["condition", "trigger", "tribute", "treaty"] },
    ],
    explanation: "Long-term conditions and triggers are the second framework of the lesson.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which type of factor, internal or external, is a dispute over succession? (One word.)",
    accepted: ["internal"],
    wrong: ["external"],
    explanation: "A dispute over succession is **internal**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between internal and external factors in the decline of a state, giving an example of each.",
    points: [["Internal factors arise inside the state, for example succession disputes in the Rozvi state", 2], ["External factors come from outside, for example the Portuguese campaign against Gaza in 1895", 2]],
    modelAnswer: "Internal factors arise inside the state, such as the succession disputes that weakened the Rozvi state. External factors come from outside, such as the Portuguese campaign that ended the Gaza state in 1895.",
    explanation: "One mark for each definition and one for each example.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Rozvi state fell in the 1830s, separating the condition from the trigger.",
    points: [["Condition: succession disputes and independent provincial governors meant the Mambo could not call on the whole state", 2], ["Trigger: the Nguni invasions struck a state that could not unite to resist", 2]],
    hints: ["Which factor was long-term and which was the immediate cause?"],
    modelAnswer: "The long-term condition was weakness within the state: succession disputes and independent governors meant the Mambo could not call on the whole state. The trigger was the Nguni invasions of the 1830s, which struck a state that could not unite to resist.",
    explanation: "One mark for the condition and one for the trigger, each explained.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why modern rifles and machine guns did not by themselves guarantee European victory over African states.",
    points: [["African states such as the Zulu at Isandlwana and Samori's army for sixteen years held off or delayed Europeans", 2], ["European success also depended on African disunity, loss of arms supply and revolts by subject peoples", 2]],
    hints: ["Think of the examples where Europeans were checked, and of the weaknesses that helped them."],
    modelAnswer: "African forces sometimes defeated or delayed European armies, as the Zulu did at Isandlwana and Samori did for sixteen years, so weapons did not decide every contest. European success also depended on African disunity, the loss of arms supplies and the revolts of subject peoples.",
    explanation: "One mark for each reason and one for support.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far do you agree that internal weakness was more important than external force in the decline of the Rozvi and the Mutapa states?",
    levels: levels(6),
    points: [["Internal: succession disputes, civil wars and rebellion of provinces weakened both", 2], ["External: Portuguese interference and the Rozvi (Mutapa); Nguni invasions and the Ndebele (Rozvi) delivered the final blow", 2], ["Judgement: internal weakness made them vulnerable, external force finished them", 2]],
    hints: ["Use both states and sort the causes."],
    modelAnswer: "I partly agree. In both states internal weakness was serious: the Mutapa suffered succession disputes, civil wars and the break-away of provinces, and the Rozvi suffered succession disputes and independent governors. However, external force finished them: Portuguese interference and the rise of the Rozvi reduced the Mutapa, and the Nguni invasions and the Ndebele destroyed the Rozvi. Internal weakness made both states vulnerable, so I conclude that it was the deeper cause, while external force was the immediate cause.",
    explanation: "Credit both sets of factors for both states and a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a statement by a fictional modern historian",
        "The African kingdoms that fell to Europeans in the 1890s did not fall because their people were weak. They fell because the Europeans had new weapons and the money to keep fighting until they won."),
      "",
      source("Source B", "a statement by another fictional modern historian",
        "No kingdom fell to European guns alone. Each was divided within, with disputed successions, discontented tributaries and armies that disagreed about war. The Europeans found allies among these divisions and used them."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What reason does Source A give for the fall of the kingdoms?", points: ["Europeans had new weapons", "They had the money to keep fighting"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How do Sources A and B differ in their explanation?", points: [["A stresses external force: weapons and resources", 2], ["B stresses internal divisions (successions, tributaries, army) which Europeans used", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "Which source gives the more convincing explanation of the fall of the Ndebele, Gaza and Mandinka states? Use the sources and your own knowledge.", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A: supported by Maxim guns and rifles at Coolela and in 1893-94, and Company and French resources", 2], ["B: supported by divided Ndebele army, discontented Tsonga, Chopi and Ndau, revolts against Samori", 2], ["Judgement: the best explanation combines both; B is more complete because it explains why weapons were effective", 2]], modelAnswer: "Source A is supported by the evidence that rifles and machine guns defeated the regiments at Coolela and in the Ndebele war, and that the Company, France and Portugal could keep fighting. Source B is supported by the divisions within the Ndebele army, the discontented Tsonga, Chopi and Ndau in Gaza, and the revolts against Samori. B is more convincing because it explains why weapons were so effective: the Europeans found allies and the African states could not unite. However, A is right that without modern weapons the Europeans could not have won, so the best explanation combines both." }),
    ],
    hints: ["For (c), match each source to evidence from the three states."],
    explanation: "Both sources are invented statements by historians taking opposing emphases.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Compare the decline of the Rozvi state with that of the Ndebele state.",
    levels: levels(8),
    points: [
      ["Similarities: both had internal weakness (disputes or divisions) and both were ended by outside force", 2],
      ["Differences: the Rozvi were broken by African Nguni invaders in the 1830s; the Ndebele were conquered by a European company in 1893-94 with modern weapons", 2],
      ["Differences in how internal weakness operated: Rozvi succession and provinces; Ndebele divided army and resentful Shona tributaries; the role of Europeans' diplomacy and concessions", 2],
      ["Judgement on which was the more internal in cause", 2],
    ],
    hints: ["Compare causes, then compare the outside force, then judge."],
    modelAnswer: "The decline of the Rozvi and Ndebele states had important similarities. In both, internal weakness played a part: the Rozvi were divided by succession disputes and independent provinces, and the Ndebele had a divided army and resentful Shona tributaries. In both, outside force delivered the final blow. They differed in the nature of that force. The Rozvi were broken by African Nguni groups in the 1830s, who were themselves refugees from the Mfecane, while the Ndebele were conquered in 1893-94 by a European company with modern weapons, after years of diplomatic pressure and concessions. As a result, the Rozvi decline owed more to internal weakness, since a stronger state had expelled the Portuguese earlier, while the Ndebele decline owed more to external force, since the state was relatively strong until the Company arrived.",
    explanation: "Credit specific similarities and differences and a supported judgement.",
  });

  b.card("DEFINITION", "What is an internal factor in the decline of a state?", "A cause arising inside the state, such as succession disputes, rebellion of subjects, army divisions or economic strain.");
  b.card("DEFINITION", "What is an external factor in the decline of a state?", "A cause from outside the state, such as invasion, migration, shifting trade or European intervention.");
  b.card("DEFINITION", "What is the difference between a condition and a trigger?", "A condition is a weakness that builds up over years; a trigger is the event that starts the collapse.");
  b.card("FACT", "What ended the Rozvi state?", "Nguni invasions in the 1830s and the arrival of the Ndebele, after years of internal weakness.");
  b.card("FACT", "What ended the Gaza state?", "The Portuguese campaign of 1895 (Coolela, 7 November; Ngungunyana captured at Chaimite, 28 December).");
  b.card("CONCEPT", "Why were European weapons not the only reason for African defeat?", "Africans sometimes defeated or delayed Europeans; success also depended on African disunity, loss of arms supply and revolts of subject peoples.");
  b.card("CONCEPT", "How do earlier and later states differ in how they fell?", "Earlier states ended through gradual decline or other African powers; nineteenth-century states were ended by European armies with modern weapons.");
  b.card("CONCEPT", "How should a comparative essay on decline be organised?", "By themes (internal factors, external factors, how they interacted), with named evidence from several states and a supported judgement.");
});
