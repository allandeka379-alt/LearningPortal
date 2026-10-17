// W2a: ahist.imperialism.scramble-causes (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.imperialism.scramble-causes", { file: "imperialism/scramble-causes", keyPrefix: "imperialism.scramble-causes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Roughly how much of Africa did historians usually say was under European control in about 1880?",
    options: [
      ["About a tenth, mostly in coastal areas", "Correct: the usual estimate is about 10 per cent, held mainly on the coasts."],
      ["About half, including most of the interior", "Half is far too high; the interior was still African-ruled."],
      ["Almost all of the continent, apart from Ethiopia", "This describes the position by 1900, after the Scramble."],
      ["None at all, since Europeans were only traders", "Europeans already held places such as Algeria and the Cape."],
    ],
    answer: "A",
    explanation: "Before the Scramble Europeans held perhaps a tenth of Africa, chiefly around the coasts. By 1900 only Ethiopia and Liberia were independent.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which two African states remained independent after the Scramble?",
    options: [
      ["Ethiopia and Liberia", "Correct: these were the two that avoided European rule in 1900."],
      ["Egypt and the Sudan", "Egypt was occupied by Britain and the Sudan was later reconquered by Britain."],
      ["Zululand and Natal", "Zululand was conquered in 1879 and Natal was a British colony."],
      ["Ashanti and Dahomey", "Both were conquered by Europeans in the 1890s."],
    ],
    answer: "A",
    explanation: "Ethiopia defeated Italy at Adwa in 1896, and Liberia was a state founded by freed Americans; both stayed independent.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did Britain occupy Egypt in 1882?",
    options: [
      ["To protect the Suez Canal and the route to India", "Correct: strategic concern for the route to India was the main reason."],
      ["To end the slave trade along the Upper Nile valley", "This was a later argument, not the reason in 1882."],
      ["To win the gold fields of the Witwatersrand", "Gold was in southern Africa, not Egypt."],
      ["To open a new market for German manufactured goods", "Britain acted for its own interests, not Germany's."],
    ],
    answer: "A",
    explanation: "The nationalist revolt of 1881-82 threatened the Canal and Britain's investments, so Britain sent troops in 1882. The occupation alarmed France and other powers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did Livingstone mean by Christianity, Commerce and Civilisation?",
    options: [
      ["That legitimate trade and Christian teaching together would end the slave trade", "Correct: he believed trade and religion would replace slaving."],
      ["That Europeans should conquer Africa by force of arms to end slave raiding", "He did not call for conquest."],
      ["That African religions should be banned by law and replaced by Christianity", "This was never his proposal."],
      ["That African kings should be educated in Europe to lead their peoples", "This was not what the phrase meant."],
    ],
    answer: "A",
    explanation: "Livingstone argued in 1857 that lawful trade and Christianity would undermine the slave trade. Later imperialists used the phrase to defend colonial rule.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did quinine help the Scramble?",
    options: [
      ["It reduced deaths from malaria among Europeans in the interior", "Correct: it removed one of the main barriers to travel."],
      ["It allowed Europeans to farm the Sahara and the Kalahari", "Quinine has nothing to do with farming in deserts."],
      ["It gave soldiers a stronger weapon than the old musket", "Quinine is a medicine, not a weapon."],
      ["It gave African healers a good reason to work with colonial doctors", "It did not do this."],
    ],
    answer: "A",
    explanation: "Taken regularly as a preventive, quinine sharply cut deaths from malaria, so Europeans could survive far from the coast.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which view is associated with J. A. Hobson's writing on imperialism (1902)?",
    options: [
      ["Wealthy investors needed new places to invest their money", "Correct: this is the economic explanation Hobson advanced."],
      ["Humanitarian concern was the only real motive behind conquest", "Hobson rejected this."],
      ["Imperialism was the result of African political weakness alone", "Hobson did not argue this."],
      ["The Maxim gun alone explained why conquest happened", "Hobson wrote about investment, not weapons."],
    ],
    answer: "A",
    hints: ["Think of his stress on capital and investment."],
    explanation: "Hobson saw imperialism as driven by the search for investment outlets by financial interests; Lenin later built on this.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What was the main argument of Robinson and Gallagher about the Scramble?",
    options: [
      ["Strategic fear, especially for the route to India, drove policy", "Correct: this was their central claim in Africa and the Victorians."],
      ["Britain wanted Africa mainly for its diamonds, gold and other minerals", "Their argument went against a purely economic view."],
      ["African rulers themselves asked Europeans to come and govern them", "This is not their argument."],
      ["The Scramble was planned in detail beforehand at the Berlin Conference", "They saw it as a response to events, not a plan."],
    ],
    answer: "A",
    hints: ["They are known for the importance given to Egypt."],
    explanation: "Robinson and Gallagher stressed the strategic importance of Egypt and the Cape for India, so the Scramble was in part defensive.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point most weakens the claim that the Scramble was caused mainly by the need for investment outlets?",
    options: [
      ["Most European investment in the 1880s went to the Americas and Russia", "Correct: the money was not flowing to Africa."],
      ["Rubber from the Congo was sold to European factories at high prices", "This supports the economic view."],
      ["Gold discovered in the Transvaal in 1886 attracted many investors", "This also supports the economic view."],
      ["Several European firms asked governments for protected markets", "This again supports an economic motive."],
    ],
    answer: "A",
    hints: ["Look for evidence that investors were looking elsewhere."],
    explanation: "If investors were not putting money into Africa, investment hunger cannot be the whole explanation. This is why historians add strategic and political causes.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "The Maxim machine gun was invented in the 1880s.", answer: true,
    explanation: "The Maxim gun was invented in 1884 and soon used by European forces in Africa.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "Africans offered no resistance to the European conquest of their lands in the Scramble.", answer: false,
    explanation: "Many African states resisted: Ethiopia defeated Italy at Adwa in 1896, Samori Touré fought the French for years, and the Ndebele and Shona resisted the Company.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "A long period of weak growth from 1873 made European governments more willing to protect markets by tariffs and colonies.", answer: true,
    hints: ["Think of the Long Depression."],
    explanation: "The Long Depression increased fears that markets would be closed and made merchants press for protected territories.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person to his part in the background to the Scramble.",
    pairs: [
      ["David Livingstone", "Called for Christianity, Commerce and Civilisation to end the slave trade"],
      ["Leopold II", "Founded the International African Association and sought the Congo"],
      ["De Brazza", "Made a treaty north of the Congo for France in 1880"],
      ["W. B. Baikie", "Led the 1854 Niger expedition in which quinine prevented deaths from fever"],
    ],
    explanation: "Each man illustrates a different strand: humanitarian and religious ideas, personal ambition, national rivalry, and medical advance.",
  });
  {
    const events = [
      "The Suez Canal opens",
      "Britain occupies Egypt",
      "The Berlin Conference meets",
      "The Fashoda crisis between Britain and France",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates run from 1869 to 1898."],
      explanation: "1869; 1882; November 1884 to February 1885; 1898.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The {{blank:a}} Canal opened in 1869 and Britain occupied {{blank:b}} in 1882 to defend the route to India.",
    blanks: [
      { id: "a", accepted: ["Suez"], choices: ["Suez", "Panama", "Corinth", "Kiel"] },
      { id: "b", accepted: ["Egypt"], choices: ["Egypt", "Nigeria", "Morocco", "Kenya"] },
    ],
    explanation: "The Suez Canal shortened the route to India, which is why Britain occupied Egypt in 1882.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which rapid-firing weapon, invented in 1884, allowed small European forces to defeat large African armies?",
    accepted: ["Maxim gun", "the Maxim gun", "Maxim", "maxim machine gun", "machine gun"],
    wrong: ["cannon"],
    explanation: "The **Maxim gun**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the economic motives for the European Scramble for Africa.",
    points: ["Need for raw materials such as rubber, palm oil, cotton and minerals", "Search for markets for manufactured goods", "Protected markets after the Long Depression and the rise of tariffs", "Hope of finding gold and diamonds after the discoveries at Kimberley and on the Rand"],
    modelAnswer: "Europe's factories needed raw materials such as rubber, palm oil and cotton, and they needed markets for their goods. After the Long Depression of the 1870s governments raised tariffs, so merchants wanted territories with protected markets. The discovery of diamonds and gold in southern Africa also raised hopes of mineral wealth.",
    explanation: "One mark for each motive described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how technology and medicine made the European conquest of Africa easier.",
    points: [["Steamships, telegraph and railways let Europeans travel, communicate and move armies inland", 2], ["Quinine reduced deaths from malaria and rapid-firing weapons such as the Maxim gun gave a decisive advantage in battle", 2]],
    hints: ["Think of both movement and fighting."],
    modelAnswer: "Steamships carried men and goods up the great rivers and the telegraph and railways improved communication and the movement of armies. Quinine cut deaths from malaria so Europeans could survive inland, and weapons like the Maxim gun allowed small forces to defeat much larger armies.",
    explanation: "Credit developed reasons, not a list of inventions.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why strategic concerns were important to Britain in the Scramble.",
    points: [["The Suez Canal was the short route to India, so Egypt had to be secure", 2], ["To protect Egypt Britain claimed the upper Nile, and the Cape route needed protection too, so claims followed in other areas", 2]],
    hints: ["Begin with India."],
    modelAnswer: "The Suez Canal was the short route to India, so Britain occupied Egypt in 1882 to keep it safe. To protect Egypt it then claimed the upper Nile, and it also wanted to secure the Cape route, so strategic fear led to further claims.",
    explanation: "One mark for each point and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how conditions inside Africa helped the European powers to take control.",
    points: [["Many African societies were small and divided, and rulers sometimes signed treaties without understanding they gave up sovereignty", 2], ["Some regions were weakened by drought, disease, the slave trade and wars such as those of the Mfecane", 2]],
    hints: ["Remember that this is not the same as saying Africans were passive."],
    modelAnswer: "Many African societies were small and divided, so Europeans could deal with them one by one, and rulers sometimes signed treaties without understanding that these gave up their sovereignty. Others were weakened by drought, disease, the slave trade and the wars of the Mfecane.",
    explanation: "Credit reasons with development; do not accept the claim that Africans did not resist.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a petition from a fictional chamber of commerce in a British port city to the government, 1883",
        "Our factories produce more cloth and iron than the home market can buy, and foreign governments close their ports with duties. We ask that the Government secure for British traders the rivers and coasts of Africa, so that our goods may enter freely."),
      "",
      source("Source B", "a letter written by a fictional missionary in East Africa to his church committee, 1884",
        "The slave caravans still pass this station. Until the trade is ended and honest commerce established, the Gospel cannot take root. We pray that the powers of Europe will not leave this country to the slave-dealers."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What reason does Source A give for asking for African territory?", points: ["Factories produce more than the home market can buy", "Foreign governments close their ports, so traders want free entry"] }),
      P.manual({ label: "(b)", marks: 2, stem: "How do the motives in Sources A and B differ?", points: ["A is economic: markets and trade", "B is humanitarian and religious: ending the slave trade and spreading the Gospel"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do these sources, and your own knowledge, explain why Europeans scrambled for Africa?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["The sources show economic and humanitarian arguments, both widely used at the time", 1], ["Provenance: both are interested pleaders, a trade group and a church writer, so they may exaggerate or hide other motives", 1], ["Own knowledge: strategic fears (Egypt and India) and rivalry among powers are missing from both sources", 1], ["Judgement: the sources show only part of the picture, though they explain the public arguments", 1]], modelAnswer: "Source A shows the economic motive of finding markets and Source B the humanitarian and religious one, and both were widely argued in the 1880s. But the writers are interested parties who wanted government action, so they may present their own cause as the main one. Neither mentions strategic concerns such as Britain's fear for the route to India or rivalry among the powers, which other evidence shows were important. The sources therefore explain part of the Scramble, mainly the arguments made in public." }),
    ],
    hints: ["For (c), think about who is writing and what is missing."],
    explanation: "Both sources are invented: a petition by a chamber of commerce and a missionary's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent was the search for markets and raw materials the main cause of the Scramble for Africa?",
    levels: levels(12),
    points: [
      ["Economic motives: raw materials, markets, protected trade after the Long Depression, minerals on the Rand and at Kimberley", 3],
      ["Limits of economic explanations: most investment went elsewhere; many colonies were poor at first", 2],
      ["Strategic and political causes: Egypt and the route to India, prestige and rivalry, Franco-German tension", 3],
      ["Humanitarian and religious motives, and technology and African conditions as means and opportunity", 2],
      ["Supported judgement comparing the causes", 2],
    ],
    hints: ["Weigh economic motives against strategic fears, and add means and opportunity."],
    modelAnswer: "The search for markets and raw materials was an important cause of the Scramble, but it was not the only or the main one. Industrial Europe needed rubber, palm oil and cotton, and after the Long Depression began in 1873 merchants wanted protected markets, while gold and diamonds attracted men such as Rhodes. However, most European investment in the 1880s went to the Americas and Russia, and many African colonies were poor for years. Strategic fear was a stronger driver in key cases: Britain occupied Egypt in 1882 to protect the route to India, which led to claims on the Nile. Rivalry and prestige, especially after 1871, made each claim set off others. Humanitarian and religious arguments won public support, while quinine and the Maxim gun gave the means and African divisions the opportunity. I conclude that economic hopes were one motive among several, and the best explanation is the combination of strategic fear, rivalry and economic ambition.",
    explanation: "Credit explained causes and a supported judgement that compares them.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of African political conditions in making the European conquest possible.",
    levels: levels(8),
    points: [
      ["Divisions among African states and rulers allowed Europeans to deal with them separately", 2],
      ["Treaties signed without understanding, and weakness from drought, disease and the Mfecane", 2],
      ["Counter-evidence: resistance such as Adwa and Samori, and the fact that campaigns often needed heavy fighting", 2],
      ["Judgement: African conditions were an opportunity but European means and motives were the main cause", 2],
    ],
    hints: ["Give both the help African conditions gave and the limits of this argument."],
    modelAnswer: "African political conditions made conquest easier but were not its cause. Many societies were small and divided, so Europeans could make treaties with one ruler and fight another, and some rulers signed documents without understanding that they surrendered sovereignty. Drought, disease and the wars of the Mfecane had weakened some regions. Yet Ethiopia defeated Italy at Adwa and Samori resisted the French for years, so conquest often needed hard campaigns, which shows that Africans were not passive. I conclude that African conditions provided an opportunity, but European motives and weapons were the main reason the Scramble happened when it did.",
    explanation: "Credit both the help to Europeans and the evidence of resistance, with a judgement.",
  });

  b.card("DEFINITION", "What was the Scramble for Africa?", "The rapid European occupation and division of Africa between about 1880 and 1900.");
  b.card("DEFINITION", "What is the civilising mission?", "The European belief that they had a duty to bring Christianity, commerce and civilisation to Africans; used to justify colonial rule.");
  b.card("FACT", "How much of Africa did Europeans control in about 1880, and which states stayed independent in 1900?", "About a tenth, mostly coastal; Ethiopia and Liberia stayed independent.");
  b.card("FACT", "Why did Britain occupy Egypt in 1882?", "To protect the Suez Canal and the route to India after a nationalist revolt.");
  b.card("FACT", "Which weapon invented in 1884 gave Europeans a decisive advantage?", "The Maxim gun.");
  b.card("FACT", "What did quinine do for Europeans in Africa?", "It cut deaths from malaria and let them live and travel inland.");
  b.card("CONCEPT", "Name the main groups of motives for the Scramble.", "Economic, political and strategic, humanitarian and religious, with technology as the means and African conditions as the opportunity.");
  b.card("CONCEPT", "What did Hobson and Lenin argue about imperialism?", "That it was driven by capitalist need for investment outlets and markets.");
  b.card("CONCEPT", "What did Robinson and Gallagher stress?", "The strategic concern for the route to India, especially in Egypt, as a major cause of the Scramble.");
});
