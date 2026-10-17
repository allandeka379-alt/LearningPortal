// W1b: ahist.slavery.abolition (ZIMSEC topic 4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.slavery.abolition", { file: "slavery/abolition", keyPrefix: "slavery.abolition" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did Britain abolish the slave trade?",
    options: [
      ["1807", "Correct: the Slave Trade Act."],
      ["1833, when the Slavery Abolition Act was passed", "This Act ended slavery in the colonies."],
      ["1865", "This is when the 13th Amendment ended US slavery."],
      ["1888, the year in which Brazil ended slavery", "This is the year Brazil ended slavery."],
    ],
    answer: "A",
    explanation: "The British Slave Trade Act of 1807 ended the trade. Slavery in the colonies ended in 1833-34.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the task of the Royal Navy's West Africa Squadron?",
    options: [
      ["To patrol the coast and capture slave ships", "Correct: it began in 1808."],
      ["To carry settlers to the colonies of southern Africa", "This was not its task."],
      ["To escort British merchant ships carrying palm oil to Liverpool and prevent attacks by pirates in the Atlantic", "It targeted slave ships."],
      ["To invade Dahomey and Asante and seize their capitals", "It did not do this."],
    ],
    answer: "A",
    explanation: "The squadron was based at Freetown and captured slave ships; historians estimate it freed about 150,000 people.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which settlement was founded in 1822 for freed African Americans?",
    options: [
      ["Liberia", "Correct: it became independent in 1847."],
      ["Freetown", "Freetown was in Sierra Leone and was founded earlier."],
      ["Zanzibar", "Zanzibar was a Sultanate in East Africa."],
      ["Opobo", "Opobo was founded by Jaja in 1869."],
    ],
    answer: "A",
    explanation: "The American Colonization Society founded Liberia in 1822 as a home for freed African Americans.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which argument was made by Eric Williams in Capitalism and Slavery (1944)?",
    options: [
      ["Abolition came largely because slavery had become less profitable and capitalists wanted free labour", "Correct: an economic explanation."],
      ["Abolition came only because of the moral campaign of Christians", "This is the traditional view that Williams challenged."],
      ["Abolition was caused by the Haitian Revolution and by nothing else at all in Britain or in the wider Atlantic world", "He did not argue this."],
      ["Abolition had no effect on British industry", "He argued the opposite."],
    ],
    answer: "A",
    hints: ["Think of an economic explanation."],
    explanation: "Williams stressed economic change. Seymour Drescher later challenged him in Econocide (1977).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about the Slavery Abolition Act of 1833 is correct?",
    options: [
      ["It paid about £20 million to the slave owners", "Correct: compensation went to the owners."],
      ["It paid compensation to the freed slaves for each year they had been enslaved", "The owners were paid, not the enslaved."],
      ["It freed all slaves immediately without any apprenticeship", "An apprenticeship system lasted until 1838."],
      ["It abolished the slave trade in Brazil and Cuba as well as in the British colonies", "It applied to British colonies only."],
    ],
    answer: "A",
    hints: ["Who received the money?"],
    explanation: "The Act freed slaves in the British colonies from 1 August 1834 with an apprenticeship to 1838; owners received about £20 million.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was a political reason that helped to bring about abolition?",
    options: [
      ["The success of the Haitian Revolution and slave revolts in the Caribbean", "Correct: they showed slavery could be overthrown."],
      ["The decision of African rulers to stop all trade with Europe", "African rulers did not do this."],
      ["The invention of the Maxim gun", "This came later and was not related."],
      ["The founding of the League of Nations", "This was in 1920."],
    ],
    answer: "A",
    hints: ["Think of slave resistance."],
    explanation: "Revolution in Haiti and revolts such as the Baptist War made slavery seem dangerous as well as unjust.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why some West African states suffered after abolition?",
    options: [
      ["Their wealth and power rested on selling captives, and they had to find new sources of income", "Correct: economic dislocation followed."],
      ["Britain made them pay compensation for each slave they had sold, as a fine for every year before 1807", "Britain did not do this."],
      ["The Royal Navy took control of their capitals at once", "The navy patrolled the coast but did not take their capitals at once."],
      ["Their farmers refused to grow any crops for export", "Many grew palm oil and groundnuts."],
    ],
    answer: "A",
    hints: ["Think of Dahomey and Oyo."],
    explanation: "States such as Dahomey that depended on selling captives lost revenue and had to adjust, which caused instability.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about abolition is best supported by the evidence?",
    options: [
      ["It ended the Atlantic trade in stages but did not end slavery within Africa", "Correct: domestic slavery persisted and grew in places."],
      ["It ended all slavery everywhere in 1807", "Slavery continued in many countries."],
      ["It had no effect on any African society", "It had large effects."],
      ["It was supported by every European government from the beginning, and all ended slavery in the same year", "Support was uneven and slow."],
    ],
    answer: "A",
    hints: ["Think about what happened to slavery inside Africa."],
    explanation: "Abolition was gradual. Slavery inside Africa continued, and the Indian Ocean trade lasted into the 1870s.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "William Wilberforce led the campaign against the slave trade in the British Parliament.",
    answer: true,
    explanation: "True. Thomas Clarkson gathered evidence and Wilberforce led in Parliament.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Sultan of Zanzibar closed the slave market in 1873 under British pressure.",
    answer: true,
    explanation: "True. Slavery itself was legally ended in Zanzibar in 1897.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Historians agree that economic change was the only cause of abolition.",
    answer: false,
    hints: ["Think of Williams and Drescher."],
    explanation: "False. Historians disagree; many accept a combination of humanitarian, economic and political causes.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role.",
    pairs: [
      ["William Wilberforce", "Led the abolition campaign in Parliament"],
      ["Thomas Clarkson", "Gathered evidence against the slave trade"],
      ["Olaudah Equiano", "Former slave whose autobiography of 1789 made the suffering known"],
      ["Granville Sharp", "Used the law courts to challenge slavery"],
    ],
    explanation: "These four campaigners are often named in answers on the reasons for abolition.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each date with the event.",
    pairs: [
      ["1807", "Britain abolishes the slave trade"],
      ["1822", "Liberia is founded"],
      ["1833-34", "Britain abolishes slavery in its colonies"],
      ["1873", "Zanzibar slave market closed"],
    ],
    hints: ["The dates run from 1807 to 1873."],
    explanation: "1807; 1822; 1833-34; 1873.",
  });
  {
    const events = [
      "Britain abolishes the slave trade",
      "Liberia is founded",
      "Britain abolishes slavery in its colonies",
      "The slave market at Zanzibar is closed",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1807, 1822, 1833-34 and 1873."],
      explanation: "1807; 1822; 1833-34; 1873.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Freed people were settled at {{blank:a}} in Sierra Leone, and the West Africa Squadron began its work in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Freetown"], choices: ["Freetown", "Lagos", "Monrovia", "Bonny"] },
      { id: "b", accepted: ["1808"], choices: ["1787", "1808", "1833", "1873"] },
    ],
    explanation: "Freetown became a colony in 1808, and the squadron began in the same year.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which historian argued in Econocide (1977) that the British sugar colonies were still profitable when the trade was abolished? Give his surname.",
    accepted: ["Drescher", "Seymour Drescher"],
    wrong: ["Williams"],
    explanation: "**Seymour Drescher**, who challenged Eric Williams.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the British ended the Atlantic slave trade after 1807.",
    points: ["The Slave Trade Act of 1807 made it illegal for British ships", "The West Africa Squadron patrolled the coast from 1808 and captured slave ships", "Treaties were made with other states and with African rulers", "Freed people were landed at Freetown"],
    modelAnswer: "The Slave Trade Act of 1807 made the trade illegal for British ships. The West Africa Squadron patrolled the coast from 1808 and captured slave ships. Britain also made treaties with other states and with African rulers, and freed people were landed at Freetown.",
    explanation: "One mark for each method described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why humanitarian campaigns were important in ending the slave trade.",
    points: [["Campaigners such as Clarkson, Wilberforce and Equiano gathered evidence and made the suffering known", 2], ["Petitions, boycotts and public meetings built mass support and put pressure on Parliament", 2]],
    hints: ["Think of evidence and public opinion."],
    modelAnswer: "Campaigners such as Clarkson, Wilberforce and Equiano gathered evidence and made the suffering known to the public. Petitions, boycotts and public meetings built mass support and put pressure on Parliament to act.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how abolition caused difficulties for some African states.",
    points: [["States such as Dahomey that earned wealth by selling captives lost income and the means to buy guns and goods", 2], ["They had to find new exports, and the change brought instability, wars and in some places the decline of the state", 2]],
    hints: ["Think of the revenue of slave-trading states."],
    modelAnswer: "States such as Dahomey that earned wealth by selling captives lost income and the means to buy guns and goods. They had to find new exports, and the change brought instability and wars and, in some places, the decline of the state.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a speech by a fictional British Member of Parliament, 1806",
        "This traffic is a crime against humanity. Our ships carry thousands from their homes and bury hundreds in the sea. The honour of the nation requires that we end it, and our commerce will not suffer, for Africa has other goods to sell."),
      "",
      source("Source B", "a letter from a fictional West Indian planter to a friend in London, 1806",
        "The ruin of the colonies is certain if the supply of labour is cut. These humanitarians do not know what they ask. Our sugar feeds the revenue of the nation, and the workers are kept in better order than the labourers of England."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the reasons for ending the trade?", points: ["It was a crime against humanity / moral reason", "National honour and the belief that commerce would not suffer"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B disagree about the economic effects of abolition?", points: [["Disagree: A says commerce will not suffer, B says the colonies will be ruined", 2], ["Both link the issue to the nation's wealth; A stresses morality and B stresses sugar revenue", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are these sources as evidence of the reasons for and against abolition?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a parliamentary speech by a supporter, so it shows arguments used in Parliament but is persuasive", 2], ["B is a planter's private letter, so it shows the views of those with an interest in slavery and claims that slaves were well treated, which is doubtful", 2], ["Own knowledge: both humanitarian and economic arguments were made; the view of B was challenged by evidence of cruelty", 2]], modelAnswer: "Source A is a speech by a supporter of abolition, so it is useful for the arguments used in Parliament, but it is designed to persuade. Source B is a private letter by a planter, so it shows the fears of those with an interest in slavery, though its claim that slaves were well treated is doubtful. My own knowledge shows that both humanitarian and economic arguments were made, and the evidence of cruelty undermines B. Neither is neutral, but together they show the two sides of the debate." }),
    ],
    hints: ["For (c), consider who wrote each source and what interest each had."],
    explanation: "Both sources are invented: a speech by an MP and a planter's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of humanitarian reasons in the abolition of the slave trade.",
    levels: levels(8),
    points: [
      ["Humanitarian: Clarkson, Wilberforce, Equiano, Quakers, evangelicals, petitions and boycotts", 2],
      ["Economic: the debate between Williams and Drescher; free-trade ideas", 2],
      ["Political: Haitian Revolution, slave resistance, national prestige", 2],
      ["Judgement on the relative importance", 2],
    ],
    hints: ["Compare humanitarian, economic and political reasons."],
    modelAnswer: "Humanitarian reasons were very important. Campaigners such as Clarkson, Wilberforce and Equiano gathered evidence and aroused public opinion, with petitions and boycotts that influenced Parliament. However, other reasons mattered. Economic change, which Eric Williams stressed, made planters less powerful, though Seymour Drescher argued that the trade was still profitable. The Haitian Revolution and slave resistance made slavery seem unsafe, and Britain wished to win prestige. I conclude that humanitarian pressure was the main driving force, but it succeeded because economic and political conditions allowed it to.",
    explanation: "Credit explained reasons and a supported judgement.",
  });

  b.card("DEFINITION", "What was the West Africa Squadron?", "A Royal Navy fleet based at Freetown from 1808 that captured slave ships and freed the people on board.");
  b.card("DEFINITION", "What is a recaptive?", "A person freed from a captured slave ship and often settled at Freetown.");
  b.card("FACT", "When did Britain abolish the slave trade and slavery?", "The trade in 1807; slavery in the colonies in 1833-34 (effective 1 August 1834).");
  b.card("FACT", "When and why was Liberia founded?", "1822, by the American Colonization Society, for freed African Americans; independent in 1847.");
  b.card("FACT", "When did the Sultan of Zanzibar close the slave market?", "1873, under British pressure.");
  b.card("CONCEPT", "Give three kinds of reason for abolition.", "Humanitarian, economic and political (for example the Haitian Revolution).");
  b.card("CONCEPT", "How did Williams and Drescher differ?", "Williams saw abolition as caused by economic decline of the sugar colonies; Drescher argued they were still profitable, so moral forces were decisive.");
  b.card("CONCEPT", "What was the impact of abolition on Africa?", "Loss of revenue for slave-trading states, political change, resettlement at Freetown and Liberia, and a shift to other trades.");
  b.card("CONCEPT", "Did abolition end slavery in Africa?", "No. Domestic slavery continued and in places grew, and the Indian Ocean trade lasted into the 1870s.");
});
