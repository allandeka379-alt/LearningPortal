// W1b: ahist.colonisation.occupation (ZIMSEC topic 6).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.colonisation.occupation", { file: "colonisation/occupation", keyPrefix: "colonisation.occupation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the Rudd Concession signed at Bulawayo?",
    options: [
      ["30 October 1888", "Correct: Lobengula made his mark on this date."],
      ["29 October 1889, the date on which the Charter was granted to the Company", "This is the date of the Royal Charter."],
      ["12 September 1890, the day the flag was raised at Fort Salisbury", "This is the date of the occupation."],
      ["11 February 1888", "This is the approximate date of the Moffat Treaty."],
    ],
    answer: "A",
    explanation: "The Concession was signed on 30 October 1888; the Charter followed a year later and the flag was raised in 1890.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Rudd Concession give to Rhodes's agents?",
    options: [
      ["Exclusive rights over metals and minerals in Lobengula's kingdom", "Correct: it was a mining concession."],
      ["The ownership of all the land from the Limpopo to the Zambezi", "It gave mineral rights, not ownership of the land."],
      ["The right to govern the Ndebele and the Shona on behalf of the Crown", "Governing powers came with the Charter."],
      ["The right to build a railway to Bulawayo", "A railway was not part of the Concession."],
    ],
    answer: "A",
    explanation: "The Concession gave mineral rights. The right to administer came from the Royal Charter of 1889.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did Lobengula receive under the Rudd Concession?",
    options: [
      ["£100 a month, 1,000 rifles with ammunition and a gunboat or £500", "Correct: payments in money and arms."],
      ["A promise of British soldiers to defend Bulawayo", "No such promise was made."],
      ["The title of King of Mashonaland, recognised by the Crown", "He received no such title."],
      ["A farm of 3,000 acres in the Cape Colony for his family", "No farm was promised."],
    ],
    answer: "A",
    hints: ["Think of money and weapons."],
    explanation: "He was promised £100 monthly, 1,000 Martini-Henry rifles with 100,000 rounds and a steam gunboat (or £500 instead).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Lobengula send Babayane and Mshete to London in 1889?",
    options: [
      ["To ask Queen Victoria about the Concession and the white men in his country", "Correct: he wanted the Queen's help to clarify the Concession."],
      ["To sign a treaty making Matabeleland a British colony and accept the Queen as his ruler", "He did not want to give up his independence."],
      ["To buy guns for the war against the Shona", "The purpose was diplomatic, not buying weapons."],
      ["To invite the Pioneer Column to enter Mashonaland on his behalf", "He did not invite the column."],
    ],
    answer: "A",
    hints: ["Think about how he tried to check what the Concession meant."],
    explanation: "Lobengula wished to find out how far the Queen supported Rhodes's men and to protect his position. The mission did not stop the Charter.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the effect of the Royal Charter of 29 October 1889?",
    options: [
      ["It gave the BSA Company authority to administer and develop the territory north of the Limpopo", "Correct: the Company became a ruling body."],
      ["It ended Lobengula's rule over the Ndebele", "The Ndebele state continued until 1893-94."],
      ["It gave Rhodes the title of governor of the Cape Colony", "He became prime minister of the Cape in 1890, a separate matter."],
      ["It cancelled the Rudd Concession and returned all mineral rights to Lobengula as the king of the Ndebele people", "The Concession was used as the basis of the Charter."],
    ],
    answer: "A",
    hints: ["Think of what a chartered company could do."],
    explanation: "The Charter allowed the Company to make treaties, raise police, hold land and mineral rights and administer, subject to some British control.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the Pioneer Column enter Mashonaland rather than Matabeleland?",
    options: [
      ["To avoid a fight with the Ndebele", "Correct: the Company wished to occupy without war."],
      ["Because the Shona had asked the column to protect them from the Ndebele and invited it to come", "No such invitation existed."],
      ["Because there was no gold in Matabeleland", "The Company still hoped for gold there."],
      ["Because the Ndebele had given Mashonaland to the Company by treaty in 1889", "No such treaty was made."],
    ],
    answer: "A",
    hints: ["Think of the strength of the Ndebele army."],
    explanation: "The Company wished to avoid war with the Ndebele, who had a large army, and Mashonaland was less strongly defended. The Concession was used to claim Mashonaland.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why the Rudd Concession is still a matter of debate?",
    options: [
      ["The king and the Company understood the transaction differently, and the written text favoured the Company", "Correct: the dispute is about meaning and interpretation."],
      ["No copy of the document has ever been found", "A text survives."],
      ["Lobengula never denied signing it", "He did claim he had been misled."],
      ["It was signed by Rhodes himself, who was known to be present at the signing in Bulawayo in October 1888 and to have read it aloud", "Rudd, Maguire and Thompson signed for the party."],
    ],
    answer: "A",
    hints: ["Think of the interpreter, the king's complaint and the written text."],
    explanation: "The key points are how the terms were explained to Lobengula and what he believed he granted, set against the written words.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which of the following is the best evidence that rivalry with other states influenced the speed of British occupation?",
    options: [
      ["Rhodes sent agents to Shona chiefs to make treaties before the Portuguese could claim the east", "Correct: treaty-making was a race against rivals."],
      ["The Pioneer Column was made up of volunteers who had been recruited directly in Britain and brought out by sea to Beira", "The column was recruited from southern Africa."],
      ["The Charter was granted to a company and not to a government department", "That shows a method, not a rivalry."],
      ["Lobengula protested against the column's entry into Mashonaland", "This shows his reaction, not the influence of rivals."],
    ],
    answer: "A",
    hints: ["Which event suggests a race?"],
    explanation: "Treaty-making with Shona chiefs and the ultimatum to Portugal in January 1890 show that Britain and the Company were acting against competitors.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Pioneer Column raised the flag at Fort Salisbury on 12 September 1890.",
    answer: true,
    explanation: "True. The date is celebrated in settler tradition as Pioneer Day.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Rudd Concession gave the Company ownership of all the land in Lobengula's kingdom.",
    answer: false,
    explanation: "False. It granted exclusive mineral rights and the right to do what was needed to win them. The Company later claimed more.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Pioneer Column marched through the centre of Matabeleland and fought a battle against the Ndebele army.",
    answer: false,
    hints: ["Think of the route chosen to avoid conflict."],
    explanation: "False. The column went round the main Ndebele area to Mashonaland, and there was no battle in 1890.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role in the occupation.",
    pairs: [
      ["Cecil John Rhodes", "Businessman who sent the party for the Concession and led the Company"],
      ["Charles Rudd", "Led the party that obtained the Concession at Bulawayo"],
      ["Frederick Selous", "Hunter who guided the Pioneer Column"],
      ["Charles Helm", "Missionary who interpreted at the signing"],
    ],
    explanation: "These four recur in answers on the occupation.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each document or event with what it added to the occupation.",
    pairs: [
      ["Moffat Treaty (1888)", "Lobengula promised not to deal with other powers without British approval"],
      ["Rudd Concession (1888)", "Exclusive mineral rights in Lobengula's kingdom"],
      ["Royal Charter (1889)", "Authority for the Company to administer the territory"],
      ["Pioneer Column (1890)", "Put settlers and police in Mashonaland and founded Fort Salisbury"],
    ],
    hints: ["Each step added something to the one before."],
    explanation: "The steps led from a treaty to a concession, from a concession to a charter and from a charter to occupation.",
  });
  {
    const events = [
      "The Moffat Treaty",
      "The Rudd Concession",
      "The Royal Charter is granted",
      "The flag is hoisted at Fort Salisbury",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are February 1888, October 1888, October 1889 and September 1890."],
      explanation: "Moffat Treaty (February 1888); Concession (30 October 1888); Charter (29 October 1889); Fort Salisbury (12 September 1890).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Royal Charter was granted to the {{blank:a}} Company in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["British South Africa"], choices: ["British South Africa", "East India", "Hudson's Bay", "Royal Niger"] },
      { id: "b", accepted: ["1889"], choices: ["1885", "1888", "1889", "1890"] },
    ],
    explanation: "The British South Africa Company received its Charter on 29 October 1889.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Zezuru spirit medium is remembered in Shona oral tradition as having foretold the arrival of the whites?",
    accepted: ["Chaminuka", "Mhondoro Chaminuka"],
    wrong: ["Nehanda"],
    explanation: "**Chaminuka**, according to tradition.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Pioneer Column of 1890.",
    points: ["About 180 settlers escorted by about 500 BSA Company police", "Led by Frank Johnson with Frederick Selous as guide", "Left Bechuanaland in June 1890 and built forts along the way", "Reached the site of Harare and raised the flag at Fort Salisbury on 12 September 1890"],
    modelAnswer: "The column had about 180 settlers and about 500 BSA Company police. It was led by Frank Johnson, with Frederick Selous as guide, and left Bechuanaland in June 1890, building forts as it went. It reached the site of Harare and raised the flag at Fort Salisbury on 12 September 1890.",
    explanation: "One mark for each feature described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Lobengula disputed the Rudd Concession.",
    points: [["He said that he had been told only a few white men would dig and that they would obey his laws", 2], ["He claimed that he had been tricked and did not understand that the written text gave exclusive rights to the Company", 2]],
    hints: ["Think about what he believed he had agreed to."],
    modelAnswer: "Lobengula said that he had been told only a few white men would dig and that they would obey his laws. He claimed he had been tricked, because the written text gave wide, exclusive mineral rights to the Company which he had not understood.",
    explanation: "One mark for each point and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the British government granted a Royal Charter to the British South Africa Company.",
    points: [["It allowed the north to be occupied at little cost to British taxpayers, with the Company paying for administration", 2], ["It helped Britain to forestall the Portuguese, the Boers and Germany without a direct government commitment", 2]],
    hints: ["Think of cost and of rivals."],
    modelAnswer: "A chartered company could occupy and administer the north at little cost to British taxpayers, because the Company paid for it. It also let Britain forestall the Portuguese, the Boers and Germany without committing the government directly.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional Company agent to a director in London, 1889",
        "The king has set his mark to the paper, and the paper is clear. He may say now that he did not know what he signed, but he signed in the presence of witnesses, and he has taken the rifles and the money. The country is open to us, and we must lose no time before the Portuguese or the Boers are there first."),
      "",
      source("Source B", "a letter from a fictional Ndebele councillor to a missionary, 1889",
        "The king was told one thing and the paper says another. He asked for a few men to dig, not for a company to rule. If the Queen is a friend of the king, she will say that the paper is wrong."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the attitude of the Company towards the Concession?", points: ["That the paper was clear and legally binding / the king had accepted payment", "That they were in a hurry because of rivals"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about how the Concession was understood.", points: [["Disagree: A says it was clear and accepted, B says the king was told something different from the text", 2], ["Agree that the king signed and that the question was about what it meant; B suggests the king wanted only a few diggers while A shows the Company wanted open access", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are these sources as evidence of what the Concession meant?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a private report written at the time but by an interested party who wished to defend the Company's legal position", 2], ["B reflects the African view but is a letter from a councillor who wished to persuade the missionary and the Queen", 2], ["Own knowledge: the Concession text gave wide rights, the interpreter was a missionary and the king complained afterwards; both are partly true", 2]], modelAnswer: "Source A is a private report written at the time, so it is useful for the Company's attitude, but its author wished to defend the Company's rights and may have stressed the clarity of the paper. Source B reflects the African view, but the councillor wished to persuade the missionary and, through him, the Queen. My own knowledge supports both: the text gave wide exclusive rights, but the king said he had been told something different, and the interpreter was a missionary with British links. Neither is a neutral account, so I must weigh them together." }),
    ],
    hints: ["For (c), consider who wrote each source and what each wanted."],
    explanation: "Both sources are invented: a Company agent's report and an Ndebele councillor's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of the Rudd Concession in the occupation of Zimbabwe.",
    levels: levels(8),
    points: [
      ["It gave the Company a legal claim to the minerals and was used to obtain the Charter", 2],
      ["Other factors: Rhodes's ambition and money, rivalry with Portugal and the Boers, the Moffat Treaty, and the Pioneer Column", 2],
      ["Limits: the Concession was disputed and the Company needed the Charter and force", 2],
      ["Judgement on its importance", 2],
    ],
    hints: ["Say what the Concession made possible, then what else was needed."],
    modelAnswer: "The Rudd Concession was important because it gave Rhodes a legal claim to the minerals of Lobengula's kingdom and the basis for the Charter of 1889. But it was not enough on its own. The Moffat Treaty had shut out rivals, Rhodes's money and ambition drove the plan, the fear of Portugal and the Boers made it urgent, and the Pioneer Column put men in the country. The Concession was also disputed, and in the end the Company relied on the Charter and force. I conclude that it was a necessary step and the legal basis of the occupation, but not the only cause.",
    explanation: "Credit explained causes and a supported judgement.",
  });

  b.card("DEFINITION", "What was the Royal Charter of 1889?", "The grant from the British Crown that gave the British South Africa Company the right to administer and develop the territory north of the Limpopo.");
  b.card("FACT", "When was the Rudd Concession signed?", "30 October 1888, at Bulawayo.");
  b.card("FACT", "What was Lobengula promised under the Rudd Concession?", "£100 a month, 1,000 rifles with 100,000 rounds and a gunboat on the Zambezi (or £500 instead).");
  b.card("FACT", "When was the Royal Charter granted?", "29 October 1889.");
  b.card("FACT", "When was the flag hoisted at Fort Salisbury?", "12 September 1890.");
  b.card("FACT", "Who guided the Pioneer Column?", "Frederick Selous.");
  b.card("CONCEPT", "Why was Zimbabwe colonised?", "Hopes of gold, Rhodes's ambitions, rivalry with Portugal, the Transvaal and Germany, and the wish for land.");
  b.card("CONCEPT", "Why was the Rudd Concession disputed?", "Lobengula said that he had been told only a few men would dig and that the written text gave more than he understood.");
  b.card("CONCEPT", "Who was Chaminuka, in Shona tradition?", "A Zezuru spirit medium remembered as foretelling the coming of the whites.");
});
