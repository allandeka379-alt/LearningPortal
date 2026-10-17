// W3a: ahist.europe.restored-bourbons (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.europe.restored-bourbons", { file: "europe/restored-bourbons", keyPrefix: "europe.restored-bourbons" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which king issued the Charter of 1814?",
    ok: ["Louis XVIII, the restored Bourbon king", "Correct: he was the restored Bourbon king."],
    no: [
      ["Charles X, the younger brother of Louis XVI", "Charles X came to the throne in 1824."],
      ["Louis-Philippe, the Duke of Orléans, in later years", "Louis-Philippe became king in 1830."],
      ["Napoleon III, the nephew of the first Napoleon", "Napoleon III ruled much later."],
    ],
    explanation: "Louis XVIII granted the Charter on his restoration in 1814.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these did the Charter of 1814 keep from the Revolution and Napoleon?",
    ok: ["Equality before the law and the Napoleonic Code", "Correct: these gains were kept."],
    no: [
      ["The republic and the right of all men to vote for the king", "The Charter set up a monarchy and a tiny electorate."],
      ["The tricolour flag and the revolutionary calendar of the year II", "The white flag replaced the tricolour."],
      ["The Committee of Public Safety and the Revolutionary Tribunal", "These emergency bodies were not kept."],
    ],
    explanation: "The Charter kept equality before the law, the Code, religious toleration and the property rights of the buyers of national lands, while giving the king most of the power.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Who were the ultra-royalists?",
    ok: ["Royalists who wished to restore much of the Ancien Régime", "Correct: they wanted the old privileges back."],
    no: [
      ["Republicans who wished to remove the king and set up a council", "Republicans were opponents of the monarchy."],
      ["Supporters of Napoleon who wished to bring back his family to power", "These were Bonapartists, not ultras."],
      ["Moderate ministers who wanted to keep the Charter in all its terms", "Moderates supported the Charter."],
    ],
    explanation: "The ultras wanted the power of the king, the lands and privileges of the nobles and the influence of the Church restored, and they thought the Charter went too far.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Louis XVIII dissolve the Chambre introuvable in 1816?",
    ok: ["He feared that its ultra policies would provoke another revolution", "Correct: he wanted a moderate course."],
    no: [
      ["He wished to hand all power to the ultras and abolish the Charter", "He disliked the ultra extremes."],
      ["He had been forced to do so by an army of Napoleon's supporters", "Napoleon had been defeated and exiled."],
      ["He wished to give the vote to every man in the country at once", "He did not widen the vote."],
    ],
    hints: ["Think of his caution as a king."],
    explanation: "The ultra majority pressed for severe measures against former revolutionaries. The king, who understood that France could not return to the old order, dissolved it in September 1816.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the effect of the murder of the Duke of Berry in 1820?",
    ok: ["It strengthened the ultras and led to tighter censorship and a double vote", "Correct: the regime moved to the right."],
    no: [
      ["It led to the recall of Napoleon's family from exile in Britain", "The Bonapartes were not recalled."],
      ["It caused the king to widen the vote and relax the press laws", "The reverse happened: controls were tightened."],
      ["It led to the abolition of the Charter and the end of the monarchy", "The Charter and the monarchy remained."],
    ],
    hints: ["Think of who gained from the shock."],
    explanation: "After the murder the ultras blamed liberal ideas; the government tightened censorship, gave the wealthiest voters a double vote and, from 1821, passed to Villèle.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What did Charles X's July Ordinances of 1830 do?",
    ok: ["Suspended the press, dissolved the Chamber and cut the electorate", "Correct: they attacked the opposition's basis."],
    no: [
      ["Widened the vote to all men and gave the press complete freedom", "They narrowed the vote and restricted the press."],
      ["Gave up the king's powers and handed the government to the Chamber", "They increased the king's power."],
      ["Declared war on Algiers and ordered the army to occupy the south", "The capture of Algiers took place earlier that month."],
    ],
    hints: ["Think of the press and of the electoral law."],
    explanation: "The ordinances of 25 July 1830 suspended freedom of the press, dissolved the Chamber just elected, reduced the electorate and called new elections. They provoked the barricades.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement best supports the view that Charles X caused his own downfall?",
    ok: ["He appointed Polignac and issued the ordinances against the Chamber's majority", "Correct: these were his own decisions."],
    no: [
      ["A poor harvest in 1827 had raised the price of bread", "This was an economic factor beyond his control."],
      ["The Bonapartists in the army still dreamed of Napoleon's return", "This describes his opponents, not his decisions."],
      ["The liberals had a majority in several elections since 1827", "This describes opposition, not the king's mistakes."],
    ],
    hints: ["Which fact shows the king's own decisions?"],
    explanation: "A historian who stresses Charles X's responsibility points to his choice of an ultra minister against the elected majority and to the ordinances.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which comment about the new regime of 1830 is best supported by the evidence?",
    ok: ["It chose another monarch and gave the vote to few men", "Correct: the liberal politicians feared a republic."],
    no: [
      ["It set up a republic with the vote for every adult man in France", "A new king was chosen and the vote remained limited."],
      ["It restored Charles X with new powers over the elected Chamber", "He abdicated and left for Britain."],
      ["It brought back the Napoleonic family to rule the country again", "The Bonapartes were not recalled."],
    ],
    hints: ["Think of Louis-Philippe."],
    explanation: "The liberals offered the throne to Louis-Philippe, widened the electorate only slightly and kept the tricolour, so the change was more limited than the barricades suggested.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Charles X abdicated and went into exile in Britain after the July Revolution.",
    answer: true,
    explanation: "True. He abdicated on 2 August 1830 and left for Britain.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Charter of 1814 gave the vote to every adult man in France.",
    answer: false,
    explanation: "False. The vote was limited to men who paid at least 300 francs in direct tax, about 90,000 men by common estimates.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The ultra-royalists believed that the Charter of 1814 had gone too far in keeping the changes of the Revolution.",
    answer: true,
    hints: ["Think of what the ultras wanted to restore."],
    explanation: "True. The ultras wanted the power of the king, the nobles and the Church restored, and they disliked the Code, equality before the law and the sale of national lands.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role.",
    pairs: [
      ["Villèle", "Ultra minister who led the government from 1821 to 1828"],
      ["Polignac", "Ultra minister appointed by Charles X in 1829"],
      ["Marmont", "Marshal in command of the troops in Paris in July 1830"],
      ["Louis-Philippe", "Duke of Orléans, offered the throne in 1830"],
    ],
    explanation: "These four figures matter for 1820-30.",
  });
  {
    const events = [
      "Louis XVIII issues the Charter",
      "The Duke of Berry is murdered",
      "Polignac is appointed",
      "Charles X abdicates",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from 1814 to 1830."],
      explanation: "1814; February 1820; August 1829; August 1830.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The royalist violence in the south in 1815 is called the {{blank:a}} Terror, and the king overthrown in 1830 was {{blank:b}} X.",
    blanks: [
      { id: "a", accepted: ["White"], choices: ["White", "Red", "Great", "Green"] },
      { id: "b", accepted: ["Charles"], choices: ["Charles", "Louis", "Henry", "Philip"] },
    ],
    explanation: "The White Terror of 1815; Charles X was overthrown in 1830.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the French marshal, once a follower of Napoleon, who was executed in December 1815.",
    accepted: ["Ney", "Marshal Ney", "Michel Ney"],
    wrong: ["Marmont"],
    explanation: "**Ney**, who had gone over to Napoleon during the Hundred Days.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main terms of the Charter of 1814.",
    points: ["It kept equality before the law and the Napoleonic Code", "It guaranteed religious toleration, with Catholicism as the state religion", "It confirmed the property of the buyers of national lands", "It gave the king the power to propose laws and set up two chambers with a small electorate"],
    modelAnswer: "The Charter kept equality before the law and the Napoleonic Code. It guaranteed religious toleration, with Catholicism as the state religion, and confirmed the property of those who had bought national lands. The king proposed the laws and there were two chambers, with a small electorate for the lower one.",
    explanation: "One mark for each term described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Bourbon restoration faced opposition from liberals.",
    points: [["The Charter left real power with the king and gave the vote only to a few wealthy men, so liberals had little influence", 2], ["The ultras and the White Terror, and later the favour shown to the Church and nobles, made liberals fear a return to the old order", 2]],
    hints: ["Think of the electorate and of the ultras."],
    modelAnswer: "The Charter left real power with the king and gave the vote only to a few wealthy men, so liberals had little influence. The ultras, the White Terror, and the favour later shown to the Church and nobles made liberals fear a return to the old order.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the July Ordinances led to revolution in Paris.",
    points: [["They attacked the freedom of the press and cut the electorate, so they threatened the liberal and propertied classes who had supported the Charter", 2], ["Journalists called for resistance, workers and students built barricades, and the troops were unwilling or unable to hold the city", 2]],
    hints: ["Think of who was threatened and of what happened in the streets."],
    modelAnswer: "The ordinances ended the freedom of the press and cut the electorate, so they threatened the liberal and property-owning classes who had supported the Charter. Journalists called for resistance, workers and students built barricades, and the troops were unwilling or unable to hold the city.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a speech by a fictional liberal deputy to the Chamber, spring of 1830",
        "The king chooses ministers who have lost the confidence of the nation. The Charter promises a king who rules with his Chamber, not against it. We ask that the ministers be changed and the laws of the Charter respected."),
      "",
      source("Source B", "a letter from a fictional ultra-royalist nobleman to his son, summer of 1830",
        "The king must not give way. The liberals have no respect for the throne, and the press pours out poison each day. A firm measure against the newspapers will teach them that France has a king. Without strength the Revolution will return."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A ask the king to do?", points: ["Change his ministers", "Respect the Charter / rule with the Chamber"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about attitudes to royal power.", points: [["Agree: both talk of the king's relation to the nation or the Chamber and both refer to the Charter or to the throne", 2], ["Differ: A wants the king to accept the Chamber's majority; B wants him to act firmly against the press and not give way", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources for explaining why the July Revolution happened?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A shows the liberal claim that the king ignored the Chamber's verdict, which matches the address of the 221, but it is a political speech meant to persuade", 2], ["B shows the ultra view that firmness was needed, which fits Charles X's own policy, but it is a private opinion and not a record of royal decisions", 2], ["Own knowledge: Polignac's appointment, the elections and the ordinances show the two views colliding; together they help explain the crisis", 2]], modelAnswer: "Source A is useful because it shows the liberal case that the king was ignoring the Chamber, which fits the address of the 221 deputies and the election result; but a speech in the Chamber is meant to persuade. Source B shows the ultra thinking that firmness was needed against the press, which fits the July Ordinances; but it is a private letter and not proof of what the king himself thought. Together they show two opposing views that came into conflict in July 1830, so they are useful for explaining the crisis." }),
    ],
    hints: ["For (c), consider who wrote each source and why."],
    explanation: "Both sources are invented: a deputy's speech and a nobleman's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far were Charles X's own policies responsible for the July Revolution of 1830?",
    levels: levels(8),
    points: [
      ["Charles X's policies: favour to the Church and nobles, the Sacrilege law, compensation for the émigrés, Polignac and the ordinances", 2],
      ["Other causes: the economic downturn of 1827-30, liberal opposition and the press, the memory of the Revolution and Napoleon", 2],
      ["The origin of the regime: restored by foreign armies, narrow electorate, ultras against the Charter's compromises", 2],
      ["A supported judgement on how far the king was responsible", 2],
    ],
    hints: ["Weigh the king's decisions against the longer-term weaknesses of the regime."],
    modelAnswer: "Charles X was largely responsible for the revolution, because his policies united the opposition against him. His coronation in the old style, the Sacrilege law, the compensation for the émigrés and above all the appointment of Polignac and the July Ordinances showed that he would not govern with the Chamber. But he inherited a regime with weak foundations: it had been restored by foreign armies, relied on a tiny electorate and was disliked by those who remembered the Revolution and Napoleon, and an economic downturn raised the price of bread in 1827-30. I conclude that the regime was vulnerable, but the king's choices turned that weakness into a revolution.",
    explanation: "Credit a balanced argument and a supported judgement.",
  });

  b.card("DEFINITION", "Who were the ultras?", "Ultra-royalists who wished to restore much of the Ancien Régime: the king's power, noble privileges and Church influence.");
  b.card("DEFINITION", "What was the Charter of 1814?", "The constitution granted by Louis XVIII: it kept equality before the law and the Code but gave the vote to few men.");
  b.card("FACT", "What was the White Terror of 1815?", "Royalist violence against Bonapartists, republicans and Protestants, especially in the south, after the Hundred Days.");
  b.card("FACT", "What happened to the Chambre introuvable?", "The ultra majority elected in August 1815 was dissolved by Louis XVIII in September 1816.");
  b.card("FACT", "What were the July Ordinances (25 July 1830)?", "Charles X suspended press freedom, dissolved the Chamber and cut the electorate.");
  b.card("FACT", "What were the Three Glorious Days?", "27-29 July 1830, the Paris revolution that overthrew Charles X.");
  b.card("CONCEPT", "Why did Charles X fall?", "His ultra policies, Polignac's appointment, an economic downturn and the ordinances united the opposition and provoked the Paris barricades.");
  b.card("CONCEPT", "Who replaced Charles X?", "Louis-Philippe, Duke of Orléans, became King of the French in August 1830 under a revised Charter.");
  b.card("CONCEPT", "How was Louis XVIII different from Charles X?", "Louis XVIII was a cautious moderate who accepted the Charter; Charles X was an ultra who tried to restore the Church and nobles.");
});
