// Slice W4b: motives for European and US imperialism (0470 Option A key question 5).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.imperialism.motives", { file: "imperialism/motives", keyPrefix: "imperialism.motives" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which canal, opened in 1869, made Egypt strategically vital to Britain?",
    options: [
      ["The Suez Canal", "Correct: it shortened the sea route from Britain to India."],
      ["The Panama Canal", "The Panama Canal opened in 1914 and links the Atlantic and Pacific."],
      ["The Kiel Canal", "The Kiel Canal is in northern Germany and opened in 1895."],
      ["The Corinth Canal", "The Corinth Canal is a short canal in Greece, opened in 1893."],
    ],
    answer: "A",
    explanation: "The **Suez Canal** became the quickest route to India, so Britain occupied Egypt in 1882.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which two African states remained independent of European rule in 1914?",
    options: [
      ["Ethiopia and Liberia", "Correct: Ethiopia defeated Italy at Adwa in 1896; Liberia had been independent since 1847."],
      ["Egypt and Morocco", "Egypt was under British occupation and Morocco became a French protectorate in 1912."],
      ["Nigeria and Senegal", "These were British and French colonies."],
      ["Zimbabwe and Zambia", "These were ruled by the British South Africa Company as Southern and Northern Rhodesia."],
    ],
    answer: "A",
    explanation: "**Ethiopia and Liberia** were the only independent African states in 1914.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is an example of an economic motive for imperialism?",
    options: [
      ["Obtaining raw materials such as rubber and palm oil for factories", "Correct: industry needed tropical raw materials."],
      ["Spreading Christianity to people who followed other religions", "This is a religious motive."],
      ["Restoring French national pride after defeat by Prussia in 1871", "This is a political motive (prestige)."],
      ["Protecting the sea route to India by controlling Egypt", "This is a strategic motive."],
    ],
    answer: "A",
    explanation: "**Raw materials**, markets and investment were the main economic motives.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did quinine help European imperialism in Africa?",
    options: [
      ["It reduced deaths from malaria among Europeans", "Correct: it allowed Europeans to survive in tropical regions."],
      ["It was a valuable crop that Europeans wanted to buy cheaply from Africa", "Quinine came from cinchona bark, mainly grown in South America and later Asia."],
      ["It was a new weapon used against African armies", "Quinine is a medicine, not a weapon."],
      ["It made it possible to send messages by telegraph across the oceans", "That was the undersea telegraph cable."],
    ],
    answer: "A",
    explanation: "**Quinine** protected against malaria, which had killed many Europeans in the tropics.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What was the Maxim gun?",
    options: [
      ["An early machine gun used in colonial wars from the 1880s", "Correct: it gave small European forces a huge advantage in firepower."],
      ["A cannon fired from steamships to bombard ports", "That was naval artillery, not the Maxim gun."],
      ["A type of rifle used by Zulu and Ndebele armies", "African armies had few or no machine guns."],
      ["The name of a fort built by the British on the Suez Canal", "It was a weapon, not a fort."],
    ],
    answer: "A",
    explanation: "The **Maxim gun** was a machine gun that helped European forces defeat much larger armies.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did newly united Germany and Italy seek colonies in the late nineteenth century?",
    options: [
      ["To show they were great powers equal to Britain and France", "Correct: colonies were a sign of national prestige."],
      ["Because the Berlin Conference ordered every European state to take colonies", "The conference set rules for claims; it did not order states to take colonies."],
      ["Because their populations were falling and they needed more workers at home", "Their populations were growing, and many people emigrated."],
      ["To spread their Catholic religion, which was the faith of all their people", "Germany was religiously mixed, and prestige was the main motive."],
    ],
    hints: ["Think about how new nations wanted to be seen by others."],
    answer: "A",
    explanation: "For new nations, colonies were a matter of **prestige** and great-power status.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was Social Darwinism?",
    options: [
      ["A misuse of evolution claiming some races had a right to rule others", "Correct: it was used to justify imperialism and is rejected by modern science."],
      ["Darwin's own scientific theory of how plants and animals evolve", "Darwin's theory was about natural selection in biology, not about races ruling others."],
      ["A missionary movement to build schools and hospitals in Africa", "Missionary work was a religious motive, not Social Darwinism."],
      ["A British law of 1807 that ended the slave trade throughout the British Empire", "The slave trade was abolished in the British Empire in 1807."],
    ],
    hints: ["It borrowed Darwin's name but not his science."],
    answer: "A",
    explanation: "**Social Darwinism** misused evolution to justify racial domination; it has no scientific basis.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which fact most weakens the argument that economic profit was the only motive for imperialism?",
    options: [
      ["Many colonies cost more to govern than they produced in profit", "Correct: this suggests strategic, political or cultural motives too."],
      ["Factories in Europe needed rubber and palm oil", "This supports the economic argument."],
      ["Investors lent money for railways and mines in the colonies", "This supports the economic argument."],
      ["Manufacturers wanted new markets during the depression of the 1870s", "This supports the economic argument."],
    ],
    hints: ["Three options support the economic argument."],
    answer: "A",
    explanation: "If many colonies were **unprofitable**, other motives such as strategy and prestige must also have mattered.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Britain occupied Egypt in 1882.",
    answer: true,
    explanation: "True. Britain defeated Colonel Urabi's army and occupied Egypt, mainly to protect the Suez route.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The 'civilising mission' was an accurate description of what imperial rule did for colonised peoples.",
    answer: false,
    explanation: "False. It was a claim used to justify conquest; it ignored the achievements of the societies conquered and hid exploitation.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each example with the type of motive it shows.",
    pairs: [
      ["Occupation of Egypt to protect the route to India", "Strategic"],
      ["Demand for rubber for tyres and cables", "Economic"],
      ["Missionaries spreading Christianity", "Religious"],
      ["France seeking glory after its defeat in 1871", "Political (prestige)"],
    ],
    explanation: "Strategic, economic, religious and political motives often worked together.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The Berlin Conference opens",
      "The Suez Canal opens",
      "The USA annexes Hawaii",
      "Britain occupies Egypt",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The canal opened before the occupation of Egypt."],
    explanation: "Suez Canal (1869); Egypt (1882); Berlin Conference (1884); Hawaii (1898).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The French called their claim to bring civilisation to the peoples they ruled the mission {{blank:a}}. The American naval officer {{blank:b}} argued that a great nation needed sea power and overseas bases.",
    blanks: [
      { id: "a", accepted: ["civilisatrice"], choices: ["civilisatrice", "intérieure", "militaire", "nationale"] },
      { id: "b", accepted: ["Alfred Thayer Mahan"], choices: ["Alfred Thayer Mahan", "Theodore Roosevelt", "William McKinley", "Andrew Carnegie"] },
    ],
    explanation: "The **mission civilisatrice**; **Mahan**'s book on sea power appeared in 1890.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the British writer who argued in 1902 that imperialism mainly served the interests of investors.",
    accepted: ["Hobson", "J. A. Hobson", "John Hobson", "John Atkinson Hobson", "J.A. Hobson", "JA Hobson"],
    wrong: ["Kipling"],
    explanation: "**J. A. Hobson** made the economic criticism of imperialism; Lenin later developed a similar argument.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the technology that made European expansion in Africa possible in the late nineteenth century.",
    points: [
      "Quinine reduced deaths from malaria.",
      "Steamships and railways moved troops and goods quickly.",
      "The telegraph linked colonies with Europe.",
      "Breech-loading rifles and the Maxim machine gun gave overwhelming firepower.",
    ],
    modelAnswer: "Quinine, taken regularly, reduced deaths from malaria among Europeans in the tropics. Steamships carried troops along rivers and across oceans, and railways moved soldiers and goods inland. The telegraph let colonial officials communicate quickly with their capitals. Breech-loading rifles and, from the 1880s, the Maxim machine gun gave small European forces a huge advantage over African armies.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why rivalry between the European powers sped up the Scramble for Africa.",
    points: [
      "Identifies fear that rivals would take territory first.",
      "Explains that powers claimed land to block rivals, even if it had little value to them.",
      "Identifies prestige / national pride (France after 1871, new Germany and Italy).",
      "Explains that governments gained popularity with voters by acquiring colonies, so more claims followed.",
    ],
    hints: ["Think about what a power feared if it did not act."],
    modelAnswer: "Each power feared that if it did not claim territory, a rival would take it first, so land was claimed to block others even when it seemed to have little value. Colonies were also a matter of prestige: France wanted to restore its pride after defeat in 1871, and newly united Germany and Italy wanted to show they were great powers. Because empire was popular with voters and newspapers, governments competed to gain more, which sped up the division of Africa.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain the motives behind US imperialism at the end of the nineteenth century.",
    points: [
      "Identifies economic motives (markets for industry, especially in Asia).",
      "Explains that industrial output had grown and businesses wanted new customers / trade with China.",
      "Identifies strategic motives (naval bases).",
      "Explains Mahan's argument that sea power needed coaling stations and bases (Hawaii, Philippines).",
      "Identifies ideological motives (manifest destiny / racial ideas / 'civilising').",
      "Explains that many believed the USA was destined to spread its institutions and had a duty to rule others, ideas now rejected.",
    ],
    hints: ["Economic, strategic and ideological motives."],
    modelAnswer: "The United States had become a great industrial power, and businessmen wanted new markets for its goods, especially in Asia, where trade with China seemed to offer huge opportunities. Strategic thinking pointed the same way: Alfred Thayer Mahan argued in 1890 that a great nation needed a strong navy, which required coaling stations and bases such as Hawaii and, later, the Philippines. Many Americans also believed their country was destined to spread its institutions, and some shared European ideas of racial superiority, claiming a duty to 'civilise' others; these ideas were used to justify taking colonies.",
    explanation: "Two marks per developed motive.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a speech by a fictional British chamber of commerce president to a meeting of businessmen in Manchester, 1885", "Our mills stand idle for want of orders. France and Germany shut their doors to our goods with tariffs. Yet in Africa there are millions of people who would buy our cloth if the trade routes were open and safe. If we do not secure these markets, our rivals will. Every new protectorate is a new customer.")}\n\n${source("Source B", "a letter from a fictional British missionary in East Africa to his society in London, 1888", "The slave caravans still pass within a day's march of our station. We have built a school and a dispensary, but we cannot stop the trade alone. Only the protection of a Christian government can end this evil. I beg the Society to urge Her Majesty's ministers to act.")}`,
    hints: ["Each writer has a different reason for wanting British control."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you infer from Source A about the reasons for British interest in Africa?", points: [
        "Need for new markets because of falling trade / idle mills.",
        "Competition from rival powers (tariffs; 'our rivals will').",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about why Britain should extend its control in Africa?", points: [
        "Agree: both want the British government to extend its control / protection.",
        "Disagree: A's motive is economic (markets for cloth).",
        "Disagree: B's motive is religious and humanitarian (end the slave trade, Christian government).",
        "Judgement: they agree on the outcome but disagree on the reason.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "How useful is Source B as evidence about the motives for imperialism? Use the source and your own knowledge.", points: [
        "Useful: shows the religious / humanitarian motive and missionary pressure on governments.",
        "Own knowledge confirms: missionaries such as Livingstone campaigned against the East African slave trade; missionaries lobbied for protectorates.",
        "Provenance: written to the missionary society to persuade it to lobby ministers, so it stresses urgency.",
        "Limitation: shows one group's motive; governments acted mainly for strategic and economic reasons.",
        "Limitation: does not show African views; presents Africa only through a missionary's eyes.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source B is useful because it shows the religious and humanitarian motive for imperialism and how missionaries pressed governments to take control. My knowledge supports this: missionaries such as Livingstone campaigned against the East African slave trade and argued that Christianity and trade would end it, and missionary societies did lobby for British protectorates in places such as Nyasaland. However, the letter was written to persuade the society to lobby ministers, so it stresses the urgency of the slave trade and the need for British rule. It shows only one group's motive; governments usually acted for strategic or economic reasons, as Source A suggests. It also gives no African point of view. It is useful evidence of missionary motives but not of imperialism as a whole.", explanation: "Usefulness judged from content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare economic motives with strategic, political and cultural ones, using examples."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the religious and cultural motives for imperialism.", points: [
        "Missionaries wanted to spread Christianity.",
        "Missionaries campaigned against the slave trade and built schools and hospitals.",
        "The 'civilising mission': the claim to bring European culture and institutions.",
        "Ideas of racial superiority / Social Darwinism, used to justify rule (now rejected).",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 10, type: X, stem: "\"Economic motives were the most important reason for European imperialism.\" How far do you agree? Explain your answer.", points: [
        ["Agree: raw materials (rubber, palm oil, minerals) for industry; Congo rubber; Rhodes and gold.", 2],
        ["Agree: markets and investment, especially during the depression from the 1870s.", 2],
        ["Disagree: strategic motives (Suez, Egypt 1882; coaling stations); rivalry and prestige (France after 1871).", 2],
        ["Disagree: religious and cultural motives; many colonies unprofitable.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(10), modelAnswer: "Economic motives were very important. Europe's industries needed raw materials from the tropics, such as palm oil, rubber and minerals; Leopold II's exploitation of Congo rubber and Rhodes's search for gold in Zimbabwe show how profit drove expansion. When an economic depression began in the 1870s and rivals raised tariffs, manufacturers looked for new markets, and investors sought profits from railways and mines.\n\nHowever, other motives were just as important in many cases. Britain occupied Egypt in 1882 mainly to protect the Suez Canal and the route to India, a strategic aim. France sought colonies to restore its pride after 1871, and Germany and Italy wanted them as signs of great-power status; rivalry led powers to claim land simply to keep others out. Missionaries and ideas of racial superiority made conquest seem acceptable to voters. Many colonies cost more to rule than they earned.\n\nOverall economic motives were important, especially for the businessmen who pushed for expansion, but governments often acted for strategic and political reasons, so economic motives were not always the most important. The balance varied from one territory to another.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("DEFINITION", "Imperialism", "A state extending its power over other territories and peoples by conquest, settlement or economic and political control.");
  b.card("DEFINITION", "Protectorate", "A territory whose local rulers keep some power while an outside power controls its defence and foreign affairs.");
  b.card("DEFINITION", "Social Darwinism", "A misuse of evolutionary theory claiming some races had a right to rule others; rejected by modern science.");
  b.card("DEFINITION", "Civilising mission (mission civilisatrice)", "The imperialist claim to bring 'civilisation' to conquered peoples, used to justify conquest.");
  b.card("FACT", "When did the Suez Canal open, and when did Britain occupy Egypt?", "The canal opened in 1869; Britain occupied Egypt in 1882.");
  b.card("FACT", "Which African states were independent in 1914?", "Ethiopia and Liberia.");
  b.card("FACT", "What four inventions made rapid conquest possible?", "Quinine, steamships and railways, the telegraph, and breech-loading rifles and the Maxim gun.");
  b.card("CONCEPT", "What were the economic motives for imperialism?", "Raw materials (rubber, palm oil, minerals), markets for manufactured goods, and opportunities for investment.");
  b.card("CONCEPT", "Why did rivalry speed up the Scramble for Africa?", "Powers claimed land to block rivals and gain prestige, so each claim led others to claim more.");
});
