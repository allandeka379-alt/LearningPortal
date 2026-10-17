// W3b: ahist.germany.bismarck-to-1866 (Both boards; Cambridge key question 2.3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.germany.bismarck-to-1866", { file: "germany/bismarck-to-1866", keyPrefix: "germany.bismarck-to-1866" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was Bismarck appointed Minister-President of Prussia?",
    options: [
      ["23 September 1862", "Correct: he was appointed at the height of the crisis."],
      ["18 January 1871", "That is the date on which the German Empire was proclaimed."],
      ["3 July 1866", "That is the date of the battle of Königgrätz."],
      ["21 March 1848", "That is the date on which the king rode through Berlin in the revolution."],
    ],
    answer: "A",
    explanation: "Bismarck became Minister-President and foreign minister on 23 September 1862.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the cause of the constitutional crisis in Prussia in 1860-62?",
    options: [
      ["A dispute between king and Landtag over army reform", "Correct: the Landtag would not vote the money."],
      ["A rebellion by Prussian peasants against the ending of feudal dues", "Feudal dues had been abolished long before."],
      ["A quarrel between Prussia and Denmark over the duchies", "That came in 1863-64."],
      ["A struggle between the army and the Catholic Church", "That was not the issue of the crisis."],
    ],
    answer: "A",
    explanation: "Wilhelm I and Roon wanted a larger army and a reduced Landwehr; liberals refused to vote the money and demanded control of the budget.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was Bismarck's gap theory?",
    options: [
      ["The constitution was silent on budget disputes, so taxes could still be collected", "Correct: this justified government without a budget."],
      ["The gap between rich and poor in Prussia justified the army reform", "It had nothing to do with social inequality."],
      ["The gap between Prussia and Austria would close if the Zollverein grew", "The theory was about the constitution, not trade."],
      ["The gap in the Danish constitution let Prussia claim Schleswig at once", "It concerned Prussian politics, not Denmark."],
    ],
    answer: "A",
    explanation: "Bismarck argued that the constitution left a gap, so the government could continue to collect taxes and spend without a budget agreed by parliament.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Bismarck persuade King Wilhelm not to attend the Congress of Princes in 1863?",
    options: [
      ["He did not want Austria to lead a reform without Prussia", "Correct: Prussian absence made the congress fail."],
      ["He wanted the Congress to be held in Berlin and not in Frankfurt", "The location was not the issue."],
      ["He had already signed an alliance with Italy against the other princes", "That alliance came in 1866."],
      ["He wished to ask the Danish king to take over the leadership of Germany", "Denmark played no such part."],
    ],
    answer: "A",
    hints: ["Think of who called the Congress and who would gain from it."],
    explanation: "The Congress was Franz Joseph's plan to strengthen Austrian leadership in the Confederation; without Prussia it failed.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of these was a reason for Bismarck's involvement in the Schleswig-Holstein crisis?",
    options: [
      ["He wanted to stop a new state under Prince Frederick of Augustenburg", "Correct: he preferred Prussian control to a new small state."],
      ["He wanted to give the duchies to the Danish king as a gift to Austria", "He wished to take the duchies from Denmark."],
      ["He wanted to put the duchies under the control of the Prussian Landtag", "He had no wish to strengthen the Landtag."],
      ["He wanted to end the Zollverein by giving Kiel to the king of Hanover", "The Zollverein was not in question."],
    ],
    answer: "A",
    hints: ["Think of the nationalists' candidate for duke."],
    explanation: "Bismarck wanted the duchies for Prussia, or at least to keep them from becoming a separate state under Augustenburg, and also to win nationalist support and to entangle Austria.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was agreed in the Convention of Gastein of August 1865?",
    options: [
      ["Prussia would administer Schleswig, and Austria would administer Holstein", "Correct: this was a temporary division of the duchies."],
      ["Denmark would regain Schleswig-Holstein if she paid a large sum", "Denmark had given the duchies up in 1864."],
      ["Austria would hand Holstein to Prince Frederick of Augustenburg at once", "Austria favoured Augustenburg but did not hand over the duchy at Gastein."],
      ["Prussia and Austria would form a new North German Confederation", "That body was created only in 1867."],
    ],
    answer: "A",
    hints: ["Think of who held which duchy."],
    explanation: "Gastein divided the administration of the duchies between the two powers, with Lauenburg sold to Prussia; the arrangement left Holstein surrounded by Prussian territory.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why did Bismarck insist on a lenient Treaty of Prague with Austria in 1866?",
    options: [
      ["He wanted a future ally and feared French or Russian intervention", "Correct: he looked ahead to relations with Austria and to the risk of other powers."],
      ["He wished to restore the Confederation under Austrian presidency", "The Confederation was dissolved."],
      ["He had been ordered by the Landtag to give back all conquered land", "The Landtag did not decide the terms."],
      ["He thought Austria had won at Königgrätz and needed generous terms", "Prussia won the battle."],
    ],
    answer: "A",
    hints: ["Think of what Bismarck wanted for the future."],
    explanation: "Bismarck opposed marching on Vienna or annexing Austrian land because he wanted to keep Austria as a potential friend and to avoid giving France or Russia an excuse to intervene.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best supports the view that military strength, rather than diplomacy, decided the war of 1866?",
    options: [
      ["Prussia's swift victory at Königgrätz, helped by the needle gun", "Correct: the army won the war in a few weeks."],
      ["The meeting between Bismarck and Napoleon III at Biarritz in 1865", "This was a diplomatic move, not military."],
      ["The alliance with Italy, which committed her to attack Austria", "This was diplomacy, which also mattered."],
      ["Russia's friendly attitude to Prussia after the Polish revolt of 1863", "This is a diplomatic factor."],
    ],
    answer: "A",
    hints: ["Which evidence concerns fighting and not negotiation?"],
    explanation: "The quick Prussian victory at Königgrätz, helped by railways, the telegraph and the needle gun, supports the military view; the others are diplomatic factors.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Treaty of Prague of 1866 took Venetia from Italy and gave it to Prussia.",
    answer: false,
    explanation: "False. Italy received Venetia from Austria; Prussia took no Austrian land.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Austro-Prussian war of 1866 was won by Prussia at the battle of Königgrätz (Sadowa) on 3 July 1866.",
    answer: true,
    explanation: "True. The Prussian victory decided the war within seven weeks.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Indemnity Bill showed that the Prussian liberals remained united in their opposition to Bismarck.",
    answer: false,
    hints: ["Think of the National Liberal Party."],
    explanation: "False. The liberals split; a majority voted for the Bill, and many formed the National Liberal Party that supported Bismarck.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in 1862-66.",
    pairs: [
      ["Albrecht von Roon", "Prussian War Minister who planned the army reform"],
      ["Helmuth von Moltke", "Chief of the Prussian General Staff"],
      ["Prince Frederick of Augustenburg", "Nationalist candidate for duke of the duchies"],
      ["Napoleon III", "French emperor who met Bismarck at Biarritz"],
    ],
    explanation: "These four people appear in most answers on 1862-66.",
  });
  {
    const events = [
      "Bismarck becomes Minister-President",
      "The Convention of Gastein",
      "The alliance between Prussia and Italy",
      "The battle of Königgrätz",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1862, 1865, April 1866 and July 1866."],
      explanation: "23 September 1862; 14 August 1865; 8 April 1866; 3 July 1866.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Treaty of {{blank:a}} (1866) ended the war with Austria, and Bismarck's liberal critics were won over by the {{blank:b}} Bill.",
    blanks: [
      { id: "a", accepted: ["Prague"], choices: ["Prague", "Vienna", "Frankfurt", "Gastein"] },
      { id: "b", accepted: ["Indemnity"], choices: ["Indemnity", "Reform", "Customs", "Enabling"] },
    ],
    explanation: "The Treaty of Prague was signed on 23 August 1866; the Indemnity Bill followed in September.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Prussian chief of the general staff whose use of railways and the telegraph helped to win the war of 1866. Give his surname.",
    accepted: ["Moltke", "von Moltke", "Helmuth von Moltke", "Helmuth Moltke"],
    wrong: ["Roon"],
    explanation: "**Moltke**, chief of the Prussian general staff from 1857.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the war between Austria and Prussia in 1866.",
    points: ["It began in June 1866 after disagreement over Holstein and the Federal Diet", "Most middle-sized states supported Austria, while Italy attacked Austria", "Prussia used railways, the telegraph and the needle gun, and won at Königgrätz on 3 July", "The war ended with the Treaty of Prague in August"],
    modelAnswer: "The war began in June 1866 after a quarrel over Holstein and the Federal Diet. Most middle-sized states supported Austria, while Italy attacked Austria in the south. Prussia used railways, the telegraph and the needle gun and won at Königgrätz on 3 July. The war ended with the Treaty of Prague in August.",
    explanation: "One mark for each point described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Bismarck was appointed Minister-President in September 1862.",
    points: [["The king faced a Landtag that refused to pay for the army reform and was near to abdication", 2], ["Roon recommended Bismarck as a man who would govern without a budget and defend the monarchy against the liberals", 2]],
    hints: ["Think of the crisis and who recommended him."],
    modelAnswer: "The king faced a Landtag that refused to pay for the army reform, and he was close to abdicating. Roon recommended Bismarck as a man who would govern without a budget and defend the monarchy against the liberals.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the liberals voted for the Indemnity Bill in 1866.",
    points: [["Königgrätz and the creation of the North German Confederation seemed to fulfil their hope of German unity", 2], ["Many believed that national success mattered more than a legal point and wished to work with the government; some formed the National Liberal Party", 2]],
    hints: ["Think of what Bismarck had achieved by September 1866."],
    modelAnswer: "Königgrätz and the creation of the North German Confederation seemed to fulfil the liberals' hope of German unity. Many believed that national success mattered more than a legal point and wished to work with the government, and some formed the National Liberal Party.",
    explanation: "One mark for each reason and one for development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an editorial in a fictional liberal newspaper published in Cologne, October 1862",
        "The new minister tells us that the great questions will be decided by force and not by votes. But the money for the army belongs to the people, and a government that spends without a vote is no better than a robber. We call on the nation to stand firm."),
      "",
      source("Source B", "a private report by a fictional Austrian diplomat in Berlin to his government, September 1865",
        "Count Bismarck is cheerful after Gastein. He believes that the arrangement gives Prussia a free hand, and he has told our friends that he does not fear a quarrel. I advise that we watch the Prussian railways and the Italian ministers more closely than we have done."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the attitude of Prussian liberals to Bismarck?", points: ["They opposed him and said government without a vote was illegitimate", "They called on the nation to resist and defended the right of the people over the army money"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare Sources A and B as evidence of Bismarck's methods in the 1860s.", points: [["Agree: both show distrust of Bismarck's methods, A of his use of force and B of his readiness for a quarrel", 2], ["Differ: A concerns domestic policy and the budget; B concerns foreign policy and Gastein, and A is public and hostile while B is a private diplomatic report", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying Bismarck's rise to power?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a newspaper editorial written to persuade, so it is one-sided and exaggerates, but it shows the strength of liberal opposition", 2], ["B is a private report, so the writer had no reason to deceive his government, but it gives an Austrian view and only one impression of Bismarck's mood", 2], ["Own knowledge: the gap theory, the budget dispute, Gastein and preparations for war with Italy support the sources, but neither explains the Indemnity Bill and the liberals' later change of attitude", 2]], modelAnswer: "Source A is useful because it shows how strongly the liberals opposed Bismarck's government without a budget, though as an editorial written to persuade it is one-sided and likely to exaggerate. Source B is useful because it was a private report to the writer's own government, so there was little reason to deceive, and it shows that Austrians were beginning to suspect Bismarck. It reflects only an Austrian view. My own knowledge supports both: Bismarck governed using the gap theory and used Gastein to prepare for a quarrel with Austria. But neither source shows how most liberals later accepted him, so they are useful for opposition and suspicion but not for his success." }),
    ],
    hints: ["For (c), consider the purpose of each source and what it leaves out."],
    explanation: "Both sources are invented: an editorial and a diplomatic report.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far was Bismarck's diplomacy more important than the strength of the Prussian army in the defeat of Austria in 1866?",
    levels: levels(8),
    points: [
      ["Diplomacy: the Danish war and Gastein, Biarritz, Russia's friendship and the Italian alliance", 2],
      ["Army: Roon's reforms, Moltke's use of railways and the telegraph, the needle gun and the victory at Königgrätz", 2],
      ["Links: reform of the army was paid for by governing without a budget, and diplomacy kept other powers out of the war", 2],
      ["Judgement on which was more important, with a reason", 2],
    ],
    hints: ["Ask which made the other possible."],
    modelAnswer: "Both were needed, but the army was the more important in 1866. Bismarck's diplomacy isolated Austria: Russia was friendly after 1863, Napoleon III was kept neutral at Biarritz, and Italy attacked Austria from the south. But the war was won in seven weeks by the Prussian army reformed by Roon and directed by Moltke, which used railways, the telegraph and the needle gun to defeat Austria at Königgrätz. Without the army, diplomacy could not have defeated Austria; without diplomacy, the army might have faced a longer war with France or Russia. I conclude that the army was the more important, because it won the war, though diplomacy created conditions in which it could win quickly.",
    explanation: "Credit developed factors, links between them and a supported judgement.",
  });

  b.card("DEFINITION", "What was Bismarck's gap theory?", "The argument that the constitution did not say what happens if king and parliament cannot agree on a budget, so the government could keep collecting taxes.");
  b.card("DEFINITION", "What was the Indemnity Bill (September 1866)?", "A law in which the Prussian parliament approved, afterwards, the government's spending without a budget since 1862.");
  b.card("FACT", "When was Bismarck appointed Minister-President?", "23 September 1862.");
  b.card("FACT", "What was the Convention of Gastein (August 1865)?", "An agreement dividing the duchies: Prussia administered Schleswig, Austria administered Holstein.");
  b.card("FACT", "When and where did Prussia defeat the main Austrian army?", "At Königgrätz (Sadowa) in Bohemia on 3 July 1866.");
  b.card("FACT", "What did the Treaty of Prague (23 August 1866) do?", "Dissolved the Confederation, excluded Austria from German affairs and let Prussia lead north of the Main; Austria lost no land to Prussia.");
  b.card("CONCEPT", "Why did Bismarck want a lenient peace with Austria?", "He wanted Austria as a future friend and feared French or Russian intervention.");
  b.card("CONCEPT", "Why was Prussia's army so effective in 1866?", "Reforms by Roon, Moltke's use of railways and telegraph, and the breech-loading needle gun.");
  b.card("CONCEPT", "How did Bismarck isolate Austria before 1866?", "Russia was friendly, Napoleon III was kept hopeful at Biarritz, and Italy was promised Venetia.");
});
