// W3a: ahist.europe.vienna-congress-system (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.europe.vienna-congress-system", { file: "europe/vienna-congress-system", keyPrefix: "europe.vienna-congress-system" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which Austrian statesman was the leading figure at the Congress of Vienna?",
    ok: ["Metternich", "Correct: he was Austria's foreign minister."],
    no: [
      ["Talleyrand", "Talleyrand represented France."],
      ["Castlereagh", "Castlereagh represented Britain."],
      ["Hardenberg", "Hardenberg represented Prussia."],
    ],
    explanation: "Prince Metternich, the Austrian foreign minister, chaired the Congress and shaped the settlement.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the principle of legitimacy mean at Vienna?",
    ok: ["Restoring the rightful rulers who had lost their thrones in the wars", "Correct: rightful monarchs were restored."],
    no: [
      ["Giving every nation the right to choose its own government by vote", "That was the principle of national self-determination."],
      ["Dividing the territory of France among the victorious powers of Europe", "France was kept intact."],
      ["Allowing the strongest army in Europe to decide who ruled each state", "Legitimacy was based on lawful succession, not force."],
    ],
    explanation: "Legitimacy meant restoring legitimate dynasties, such as the Bourbons in France, Spain and Naples. Talleyrand used the principle to protect France's position.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "How did the Congress of Vienna try to contain France?",
    ok: ["By placing strong states on its borders, such as the Netherlands and Prussia", "Correct: barrier states were created."],
    no: [
      ["By dividing France into three weaker kingdoms, each ruled by a foreign prince", "France was kept united."],
      ["By banning the French army and navy from taking part in any war for twenty years", "There was no such total ban."],
      ["By making the French king pay tribute to the Tsar every single year", "France paid an indemnity, not tribute to the Tsar."],
    ],
    explanation: "Belgium was joined to the Netherlands, Prussia received the Rhineland and Piedmont was strengthened, forming a barrier around France.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the main purpose of the Quadruple Alliance of 1815?",
    ok: ["To hold regular meetings of the great powers to defend the peace", "Correct: it was the basis of the Congress System."],
    no: [
      ["To create a European army under the command of the Tsar of Russia", "No such army was created."],
      ["To restore the Holy Roman Empire under the emperor of Austria", "The Holy Roman Empire was not restored."],
      ["To divide the colonies of France among the four allied powers", "The aim was to keep the peace."],
    ],
    hints: ["Think of the congresses that followed."],
    explanation: "Britain, Austria, Prussia and Russia agreed in November 1815 to meet from time to time to deal with threats to the settlement, which produced the Congress System.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was decided at the Congress of Troppau in 1820?",
    ok: ["The three eastern powers claimed a right to intervene against revolutions", "Correct: this was the Troppau Protocol; Britain refused."],
    no: [
      ["The powers agreed to give independence to both Greece and Belgium at once", "These issues came later."],
      ["The powers agreed to end the occupation of France completely", "That was at Aix-la-Chapelle in 1818."],
      ["The powers agreed to restore Napoleon's family to the French throne", "The Bonapartes were excluded."],
    ],
    hints: ["Think of the revolts in Spain and Naples."],
    explanation: "After revolts in Spain and Naples, the three eastern powers issued the Troppau Protocol. Britain refused to accept it, which showed a split.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why did Britain refuse to support intervention in Spain in 1822?",
    ok: ["It opposed interfering in the internal affairs of other states", "Correct: Canning favoured non-intervention."],
    no: [
      ["It wished to restore the Bonaparte family to power in France at once", "Britain had no such aim."],
      ["It had been defeated by France and needed to rebuild its navy", "Britain was the leading naval power."],
      ["It had joined a union of the three eastern monarchs in Verona", "Britain withdrew from Verona."],
    ],
    hints: ["Think of Canning's policy."],
    explanation: "British ministers feared that intervention would help the continental monarchs and harm British trade, and preferred non-intervention; Canning also supported the independence of Spain's colonies.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which fact best supports the view that the Vienna settlement was a success?",
    ok: ["There was no general war among the great powers until the Crimean War", "Correct: peace among the great powers lasted decades."],
    no: [
      ["Belgium broke away from the Netherlands in 1830, after a revolt in Brussels", "This shows a weakness of the settlement."],
      ["Revolts against the restored kings took place in Naples and Spain in 1820", "These show unrest the powers had to suppress."],
      ["Many Poles, Italians and Germans still lacked a state of their own after 1815", "This is a criticism of the settlement."],
    ],
    hints: ["Which fact shows the settlement doing what it was designed to do?"],
    explanation: "The settlement aimed at security and a balance of power, and the great powers avoided a general war for decades, which supporters of the settlement stress.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which comment about the Congress System is best supported by the evidence?",
    ok: ["It worked when the powers agreed but failed once Britain disagreed", "Correct: Britain's withdrawal ended united action."],
    no: [
      ["It had a standing army that could crush any rising in all of Europe", "It had no standing army."],
      ["It was ended by an alliance of France and Prussia against Russia", "No such alliance ended it."],
      ["It was never used because the powers never met after 1815", "The powers met at four congresses."],
    ],
    hints: ["Think of the meetings from 1818 to 1822."],
    explanation: "United action at Laibach and Verona depended on the powers agreeing; when Britain withdrew and Russia and Austria quarrelled over Greece, the system lost its basis.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Britain refused to accept the Troppau Protocol.",
    answer: true,
    explanation: "True. Britain refused to agree to a general right of intervention in the internal affairs of other states.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Congress of Vienna divided France among the victorious powers.",
    answer: false,
    explanation: "False. France was kept united and the Bourbon monarchy was restored, though France lost lands gained in the wars and had to pay an indemnity after the Hundred Days.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Vienna settlement gave nationalism a central place in the new map of Europe.",
    answer: false,
    hints: ["Think of Poland, Belgium, Italy and Germany."],
    explanation: "False. The powers largely ignored nationalism, handing Belgium to the Dutch king, dividing Italy and keeping Germany in a loose confederation.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each statesman with the state he represented.",
    pairs: [
      ["Metternich", "Austria"],
      ["Castlereagh", "Britain"],
      ["Talleyrand", "France"],
      ["Alexander I", "Russia"],
    ],
    explanation: "Metternich (Austria), Castlereagh (Britain), Talleyrand (France) and Alexander I (Russia) were the leading figures.",
  });
  {
    const events = [
      "The Congress of Vienna opens",
      "The Congress of Aix-la-Chapelle",
      "The Congress of Laibach",
      "The Congress of Verona",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these meetings in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from 1814 to 1822."],
      explanation: "1814-15; 1818; 1821; 1822.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The German Confederation set up at Vienna was chaired by {{blank:a}}, and the king restored to the throne of France was {{blank:b}} XVIII.",
    blanks: [
      { id: "a", accepted: ["Austria"], choices: ["Austria", "Prussia", "Russia", "Bavaria"] },
      { id: "b", accepted: ["Louis"], choices: ["Louis", "Charles", "Napoleon", "Henry"] },
    ],
    explanation: "Austria presided over the Confederation; Louis XVIII was the restored king.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the French representative at Vienna who used the principle of legitimacy to protect France's position.",
    accepted: ["Talleyrand", "Charles Maurice de Talleyrand", "Talleyrand-Perigord", "Talleyrand-Périgord"],
    wrong: ["Metternich"],
    explanation: "**Talleyrand**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the aims of the powers at the Congress of Vienna.",
    points: ["To restore legitimate rulers who had lost their thrones", "To create a balance of power so that no state dominated Europe", "To contain France with strong neighbouring states", "To compensate the victors with territory and to prevent revolution"],
    modelAnswer: "The powers wished to restore legitimate rulers who had lost their thrones and to create a balance of power so that no state could dominate Europe. They wanted to contain France by building strong states around it, and they compensated the victors with territory and tried to prevent further revolutions.",
    explanation: "One mark for each aim described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Prussia and Austria gained territory at Vienna.",
    points: [["Prussia was given the Rhineland and part of Saxony to guard against France and to balance Russia", 2], ["Austria received Lombardy and Venetia and chaired the German Confederation as compensation for giving up Belgium, which strengthened it against France and Italy", 2]],
    hints: ["Think of containing France and of compensation."],
    modelAnswer: "Prussia was given the Rhineland and part of Saxony, both to guard against France and to balance Russia. Austria received Lombardy and Venetia and the chair of the German Confederation as compensation for giving up Belgium, which also strengthened it in Italy and Germany.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Congress System collapsed.",
    points: [["Britain refused to support intervention in other states' internal affairs and withdrew by 1822", 2], ["The powers disagreed over matters such as Greece, and the ideas of liberalism and nationalism could not be suppressed by congresses", 2]],
    hints: ["Think of Britain and of Greece."],
    modelAnswer: "Britain refused to support intervention in the internal affairs of other states and withdrew by 1822. The powers also disagreed over matters such as Greece, and liberalism and nationalism could not be suppressed by congresses.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an article by a fictional liberal journalist in a Rhineland newspaper, 1815",
        "The kings have met at Vienna and divided us like cattle. We are given to Prussia or to Bavaria as though we had no voice. They speak of peace, but there can be no peace when peoples are bought and sold."),
      "",
      source("Source B", "a private memorandum by a fictional Austrian official after the revolts in Naples and Piedmont",
        "The revolts in Naples and Piedmont show that the spirit of revolution is not dead. Without the agreement of the great powers, small states would fall into disorder, and war would follow. It is our duty to act together to defend the order that has kept peace."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What criticism of the Congress does Source A make?", points: ["Peoples were divided and handed to rulers without any say", "The peace was unjust / peoples were treated like property"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about attitudes to the settlement.", points: [["Agree: both refer to peace and to the way the settlement affects peoples or states", 2], ["Differ: A condemns the settlement for ignoring the wishes of the people; B defends it as necessary to keep order and stop revolution", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources for a historian assessing the Vienna settlement?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a liberal opinion in a newspaper, useful for how the settlement was received in the Rhineland, but written to persuade and subject to censorship risks, so it shows only one view", 2], ["B is a private official memorandum and so likely to show the real thinking of the supporters of the settlement, but written by someone with a stake in Austria's order", 2], ["Own knowledge: the Rhineland went to Prussia in 1815 and the Austrians put down Naples and Piedmont in 1821, which fit both sources; together they show the two sides of the debate", 2]], modelAnswer: "Source A is useful because it shows how the settlement was received by liberals in the Rhineland, which was given to Prussia in 1815, and it supports the criticism that the powers ignored popular wishes; but it is a newspaper article written to persuade, so it shows only one view. Source B is a private memorandum by an Austrian official and shows the thinking behind the Congress System and the reasons for intervention in Naples and Piedmont in 1821, but its writer had a stake in the order he defends. Together they show the two sides of the debate, so they are useful for that purpose." }),
    ],
    hints: ["For (c), consider who wrote each source and for what audience."],
    explanation: "Both sources are invented: a liberal journalist's article and an official's memorandum.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far was the Vienna settlement a success?",
    levels: levels(8),
    points: [
      ["Successes: peace among the great powers until 1854, a balance of power, a moderate settlement with France, barriers around France", 2],
      ["Failures: ignored nationalism and liberalism (Belgium, Poland, Italy, Germany), imposed legitimate rulers, the Congress System collapsed", 2],
      ["Judgement of aims: the settlement did what its makers wanted (security) but not what later peoples wanted (self-rule)", 2],
      ["A supported conclusion about the extent of success", 2],
    ],
    hints: ["Judge the settlement against its makers' aims, then against later criticism."],
    modelAnswer: "The Vienna settlement was largely a success if judged by the aims of its makers. It confined France without destroying it, created a balance of power with barrier states, and kept the great powers from a general war until the Crimean War of 1854. But it was a failure if judged against nationalism and liberalism, since Belgians, Poles, Italians and Germans were handed to rulers they had not chosen, and the Congress System collapsed in the 1820s. Revolutions in 1830 and 1848 and the unifications later showed the limits. I conclude that it was successful in keeping peace between the great powers but unsuccessful in dealing with the forces of nationalism and liberalism.",
    explanation: "Credit a balanced argument and a supported judgement.",
  });

  b.card("DEFINITION", "What was legitimacy at Vienna?", "The principle of restoring the rightful ruling families who had been removed by the Revolution and Napoleon.");
  b.card("DEFINITION", "What was the balance of power?", "The idea that peace is secure when no single state is strong enough to dominate the others.");
  b.card("FACT", "Who were the leading statesmen at Vienna?", "Metternich (Austria), Castlereagh (Britain), Alexander I (Russia), Hardenberg (Prussia) and Talleyrand (France).");
  b.card("FACT", "What did Prussia and Austria gain at Vienna?", "Prussia: the Rhineland, Westphalia and part of Saxony. Austria: Lombardy and Venetia and the chair of the German Confederation.");
  b.card("FACT", "What was the Quadruple Alliance?", "The agreement of November 1815 of Britain, Austria, Prussia and Russia to meet to defend the settlement.");
  b.card("FACT", "What was decided at Laibach in 1821?", "Austria was authorised to put down the revolt in Naples, and Austrian troops restored the king.");
  b.card("CONCEPT", "Why did Britain leave the Congress System?", "It opposed intervention in the internal affairs of other states, as shown by Castlereagh and Canning, and it had its own trade interests.");
  b.card("CONCEPT", "What were the successes of the Vienna settlement?", "Peace among the great powers for decades, a balance of power and a moderate peace with France.");
  b.card("CONCEPT", "What were the weaknesses of the Vienna settlement?", "It ignored nationalism and liberalism; Belgium, Poland, Italy and Germany were arranged without regard to the wishes of peoples.");
});
