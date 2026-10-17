// W2a: ahist.imperialism.berlin-partition (ZIMSEC only, topic 5).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.imperialism.berlin-partition", { file: "imperialism/berlin-partition", keyPrefix: "imperialism.berlin-partition" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who chaired the Berlin Conference of 1884-85?",
    options: [
      ["Otto von Bismarck of Germany", "Correct: Bismarck was host and chairman."],
      ["Queen Victoria of Britain", "Queen Victoria did not attend or chair."],
      ["King Leopold II of the Belgians", "Leopold gained from the conference but did not chair it."],
      ["Cecil Rhodes of the Cape", "Rhodes was not present at the conference."],
    ],
    answer: "A",
    explanation: "Bismarck chaired the conference in Berlin, which met from 15 November 1884 to 26 February 1885.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Africans were represented at the Berlin Conference?",
    options: [
      ["None; no African ruler attended", "Correct: Africans were absent from the decisions about their land."],
      ["The kings of the Zulu, Ndebele and Asante", "None of these rulers attended."],
      ["Only the rulers of Egypt and Ethiopia", "Neither state sent a delegate."],
      ["The chiefs of the Congo basin, as guests", "No Congo chiefs were present."],
    ],
    answer: "A",
    explanation: "Fourteen states attended, but no African ruler or representative took part.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the principle of effective occupation require?",
    options: [
      ["Real control of a coastal area, not just a claim on paper", "Correct: a power had to have an administration and some force."],
      ["A treaty signed by an African ruler and nothing more than that", "A treaty alone was not enough in theory."],
      ["Approval from the League of Nations for each new claim", "No such body existed in 1885."],
      ["A vote by the African inhabitants of each area claimed", "Africans were never consulted."],
    ],
    answer: "A",
    explanation: "A power had to show real control, with an administration and some force, to hold coastal territory; in practice treaties and small posts were often used to satisfy the rule.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which claim did the Berlin Conference recognise?",
    options: [
      ["King Leopold II's claim to the Congo basin", "Correct: it became the Congo Free State."],
      ["Portugal's claim to the belt from Angola", "Britain forced Portugal to give this up in 1890."],
      ["Germany's claim to the whole East African coast", "Germany's claims were settled by later agreements."],
      ["Britain's claim to the whole Nile valley", "This was not decided at Berlin."],
    ],
    answer: "A",
    explanation: "The conference recognised the International Association of the Congo as the ruler of the Congo basin, a personal possession of Leopold.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement about the Berlin Conference is correct?",
    options: [
      ["It set the rules for claiming territory but did not draw the map", "Correct: borders came from later agreements and conquest."],
      ["It drew the borders of every colony in Africa", "Borders were fixed by later agreements."],
      ["It ended the slave trade in every part of Africa at once", "The slave trade continued in places for years."],
      ["It gave each African state the right to send a delegate to later meetings", "Africans were not given any seat."],
    ],
    answer: "A",
    explanation: "The General Act set rules (free trade, navigation, effective occupation and notification), while the borders were made by later treaties between the powers.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "How did the Anglo-Portuguese dispute of 1890 affect the future Southern Rhodesia?",
    options: [
      ["Britain's ultimatum blocked Portugal's claim to a belt of land", "Correct: this opened the way for Company rule north of the Limpopo."],
      ["Portugal gained control of Matabeleland and Mashonaland as a result", "Portugal did not gain Matabeleland."],
      ["Germany took over the lands north of the Limpopo River", "Germany did not do this."],
      ["Britain gave the plateau to the Congo Free State of Leopold", "No such transfer took place."],
    ],
    answer: "A",
    hints: ["Think of the Rose-coloured Map."],
    explanation: "Portugal's claim to the belt between Angola and Mozambique clashed with Rhodes's plans; the ultimatum of January 1890 and the treaty of 1891 settled the boundary with Mozambique.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which effect of partition on Africans was most directly caused by the way borders were drawn?",
    options: [
      ["Peoples such as the Somali, Kongo and Ewe were divided among colonies", "Correct: borders ignored peoples and routes."],
      ["The end of all African political leadership across the continent", "African leadership continued in many forms."],
      ["The immediate introduction of democracy in the new colonies", "Colonies were not democratic."],
      ["A rapid growth of trade between neighbouring African states", "Borders usually hindered local trade."],
    ],
    answer: "A",
    hints: ["Think of what a line drawn on a map does to a community."],
    explanation: "Borders were drawn by Europeans on maps, often without knowledge of the peoples, so groups were split between colonies and others were joined with rivals.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the best evidence that the Berlin Conference was not the starting point of the Scramble?",
    options: [
      ["Britain occupied Egypt in 1882 and De Brazza made treaties in 1880", "Correct: the rush had begun before the conference."],
      ["The General Act was signed by fourteen states in February 1885", "This describes the conference itself."],
      ["Germany claimed South West Africa after the opening of the conference", "Germany's claims mostly came before and during."],
      ["Belgium took over the Congo Free State from Leopold II in 1908", "This is a much later event."],
    ],
    answer: "A",
    hints: ["Look for events before November 1884."],
    explanation: "Claims and treaties of 1880-82 show the Scramble was already under way, so Berlin was a stage in it rather than its beginning.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The Berlin Conference met from November 1884 to February 1885.", answer: true,
    explanation: "It opened on 15 November 1884 and the General Act was signed on 26 February 1885.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "The Berlin Conference drew the borders of every colony in Africa.", answer: false,
    explanation: "It set rules; borders were fixed later by treaties between the powers, agreements with African rulers and conquest.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "After the Fashoda crisis of 1898, Britain and France moved towards better relations.", answer: true,
    hints: ["Think of the Entente Cordiale of 1904."],
    explanation: "France withdrew and accepted a settlement; the two powers settled many colonial disputes and signed the Entente Cordiale in 1904.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Effective occupation", "Real control of a claimed area, not a paper claim only"],
      ["Spheres of influence", "Areas where one power's right to act was recognised by the others"],
      ["Partition", "The division of Africa among European powers"],
      ["Congo Free State", "Leopold II's personal colony, recognised in 1885"],
    ],
    explanation: "These terms are the core vocabulary of the conference and the partition.",
  });
  {
    const events = [
      "De Brazza's treaty north of the Congo",
      "The Berlin Conference opens",
      "The British ultimatum to Portugal",
      "The Fashoda crisis",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from 1880 to 1898."],
      explanation: "1880; November 1884; January 1890; 1898.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Berlin Conference was chaired by {{blank:a}}, and it recognised the claim of King {{blank:b}} to the Congo.",
    blanks: [
      { id: "a", accepted: ["Bismarck"], choices: ["Bismarck", "Rhodes", "Livingstone", "Napoleon"] },
      { id: "b", accepted: ["Leopold II"], choices: ["Leopold II", "Menelik II", "Lobengula", "Victor Emmanuel"] },
    ],
    explanation: "Bismarck chaired; Leopold II of the Belgians received recognition of the Congo claim.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Belgian king gained control of the Congo Free State?",
    accepted: ["Leopold II", "Leopold", "King Leopold", "King Leopold II", "Leopold the Second"],
    wrong: ["Albert"],
    explanation: "**Leopold II**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main decisions of the Berlin Conference (1884-85).",
    points: ["Free trade in the Congo basin and free navigation on the Congo and Niger", "Effective occupation was required to claim coastal territory", "Powers had to notify each other of new coastal claims", "Leopold II's claim to the Congo was recognised as the Congo Free State"],
    modelAnswer: "The conference agreed on free trade in the Congo basin and free navigation on the Congo and Niger. A power could claim coastal land only if it had effective occupation, and it had to tell the other powers about new claims. The claim of Leopold II to the Congo was recognised, creating the Congo Free State.",
    explanation: "One mark for each decision described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Berlin Conference was called in 1884.",
    points: [["Rival claims in the Congo and Niger regions (Leopold, France, Portugal and Britain) threatened a clash", 2], ["Bismarck wanted to prevent a quarrel among the powers, protect German trade and set agreed rules", 2]],
    hints: ["Begin with the rivalry at the mouth of the Congo."],
    modelAnswer: "Several powers, Leopold II, France, Portugal and Britain, had rival claims in the Congo and Niger regions, and a treaty between Britain and Portugal in 1884 alarmed the others. Bismarck wanted to avoid a quarrel that might lead to war, to protect German trade, and to set agreed rules for claiming land.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the partition affected Africans.",
    points: [["Loss of sovereignty to foreign rulers, treaties treated as transfers of power", 2], ["Artificial borders divided peoples, and colonies were run for exploitation such as forced labour and taxes", 2]],
    hints: ["Think of independence and of the borders."],
    modelAnswer: "African states lost their sovereignty and treaties with their rulers were treated as handing over power. Borders drawn by Europeans divided peoples such as the Somali and the Kongo, and colonies were run for the benefit of the rulers through taxes, cash crops and forced labour.",
    explanation: "Credit effects explained with detail.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a newspaper editorial in a British city, 1885",
        "The gentlemen at Berlin have agreed that trade shall be free on the great rivers and that no power may hold a coast without governing it. This is a wise rule. It will prevent quarrels, and bring order and commerce to a continent which has known neither."),
      "",
      source("Source B", "a recollection by a fictional African trader in West Africa, told in the 1930s",
        "We heard that white men had met far away and had spoken of our rivers and our towns. No one asked our chiefs. Soon men came with papers and flags, and the roads we had always used were no longer ours to use."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say the Berlin rules would achieve?", points: ["They would prevent quarrels", "They would bring order and commerce to Africa"] }),
      P.manual({ label: "(b)", marks: 2, stem: "How does Source B's view of Berlin differ from Source A's?", points: ["A welcomes the rules as wise and orderly", "B stresses that Africans were not consulted and lost their use of roads and towns"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How reliable are these sources as evidence of the effects of the Berlin Conference?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["A is contemporary but is a European editorial, supporting the rules and ignoring Africans, so its optimism may be misleading", 1], ["B gives an African experience, though told in the 1930s and possibly shaped by later events", 1], ["Own knowledge: Africans were absent at Berlin and lost sovereignty, which supports B", 1], ["Own knowledge: the rules did reduce open quarrels between the powers, which supports part of A", 1]], modelAnswer: "Source A is a contemporary European editorial that welcomes the rules and ignores the fact that no African took part, so it is one-sided about the effects. Source B is an African recollection told much later, so memory and later events may have shaped it, but it agrees with what we know: Africans were not consulted and lost control of their land and routes. A is partly supported by the fact that Berlin reduced open quarrels among the powers. Both are useful, but B is more reliable about the effects on Africans and A about European opinion." }),
    ],
    hints: ["For (c), look at who wrote each source and when."],
    explanation: "Both sources are invented: a British editorial of 1885 and an African trader's recollection.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the Berlin Conference responsible for the partition of Africa?",
    levels: levels(12),
    points: [
      ["Berlin's role: rules of effective occupation and notification encouraged a race; recognition of Leopold's claim", 3],
      ["Limits: the General Act did not divide Africa and dealt mainly with coastal claims", 2],
      ["Earlier causes already at work: strategic, economic and political motives, claims of 1880-82, Egypt", 3],
      ["Later agreements and conquest drew the borders: Anglo-German 1890, Portugal 1890-91, Fashoda 1898", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Compare what Berlin did with what came before and after."],
    modelAnswer: "The Berlin Conference was partly responsible for the partition but was not its main cause. Its rules, effective occupation and notification of claims, encouraged powers to place posts and sign treaties quickly, and it recognised Leopold's claim to the Congo. However, the General Act did not divide Africa and dealt mainly with the coast. The Scramble had begun before the conference with De Brazza's treaties in 1880 and the British occupation of Egypt in 1882, driven by strategic, economic and political motives. The map itself was drawn later by agreements such as the Anglo-German agreement of 1890, the settlement with Portugal and the Fashoda settlement, and by conquest. I conclude that Berlin accelerated and regulated a process whose causes lay elsewhere.",
    explanation: "Credit explained roles and a judgement that weighs the conference against other factors.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the effects of the partition of Africa on Europe.",
    levels: levels(8),
    points: [
      ["Rivalry continued: Fashoda 1898 and the Morocco crises of 1905 and 1911", 2],
      ["Settlements reduced some quarrels, such as the Entente Cordiale of 1904", 2],
      ["Empires brought wealth, pride and ideas of racial superiority", 2],
      ["Judgement on whether the partition brought stability or tension", 2],
    ],
    hints: ["Give both the tension and the agreements."],
    modelAnswer: "The partition brought both tension and settlement in Europe. Rivalry continued: Britain and France came close to war at Fashoda in 1898, and the Moroccan crises of 1905 and 1911 set Germany against France and Britain. At the same time agreements, such as the Entente Cordiale of 1904, settled many colonial disputes. The empires brought wealth and national pride and encouraged ideas of racial superiority. I conclude that partition reduced quarrels in the short term but fed the rivalry that helped to bring the powers to war in 1914.",
    explanation: "Credit both effects and a judgement.",
  });

  b.card("DEFINITION", "What did effective occupation mean at Berlin?", "A power could claim coastal territory only if it had real control there, not only a paper claim.");
  b.card("DEFINITION", "What is a sphere of influence?", "An area where one power's right to make treaties and later to rule was recognised by the other powers.");
  b.card("FACT", "When did the Berlin Conference meet and who chaired it?", "15 November 1884 to 26 February 1885; Otto von Bismarck.");
  b.card("FACT", "Who was recognised as ruler of the Congo at Berlin?", "King Leopold II, as the Congo Free State, his personal possession.");
  b.card("FACT", "Which Africans were represented at Berlin?", "None.");
  b.card("FACT", "What did Britain's ultimatum of January 1890 do?", "It forced Portugal to give up its claim to a belt from Angola to Mozambique.");
  b.card("CONCEPT", "Did Berlin divide Africa?", "No. It set rules; borders came from later treaties between the powers and from conquest.");
  b.card("CONCEPT", "What were the effects of partition on Africa?", "Loss of sovereignty, artificial borders, exploitation and resistance.");
  b.card("CONCEPT", "How did the partition affect Europe?", "It gave empires and pride but kept up rivalry at Fashoda and in Morocco, feeding the tension before 1914.");
});
