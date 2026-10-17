// W3a: ahist.france.ancien-regime-1789 (ZIMSEC topic 14 causes; Cambridge France 1.1).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.france.ancien-regime-1789", { file: "france/ancien-regime-1789", keyPrefix: "france.ancien-regime-1789" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "On what date did the Estates-General open at Versailles?",
    ok: ["5 May 1789", "Correct: the Estates-General met on 5 May 1789."],
    no: [
      ["20 June 1789", "This is the date of the Tennis Court Oath."],
      ["14 July 1789", "This is the date of the storming of the Bastille."],
      ["26 August 1789", "This is the date of the Declaration of the Rights of Man."],
    ],
    explanation: "The Estates-General, last held in 1614, opened at Versailles on 5 May 1789.",
  });
  mc(b, {
    d: 2, skill: "RECALL",
    stem: "Which group made up the Third Estate in the Ancien Régime?",
    ok: ["Everyone outside the clergy and the nobility, the great majority", "Correct: peasants, workers and the bourgeoisie were all Third Estate."],
    no: [
      ["The nobles who held the high offices at the royal court at Versailles", "These belonged to the Second Estate."],
      ["The bishops and priests of the Church who collected the tithe", "These belonged to the First Estate."],
      ["The intendants who governed the provinces on the king's behalf", "Intendants were royal officials, not an estate."],
    ],
    explanation: "The Third Estate was well over 95 per cent of the population and included wealthy lawyers and merchants as well as peasants and townspeople.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the Assembly of Notables of 1787 refuse Calonne's proposed land tax?",
    ok: ["Its members were privileged men who would have had to pay it", "Correct: the Notables were themselves among those to be taxed."],
    no: [
      ["Its members wanted a larger debt in order to pay for new wars", "They opposed the tax, not because they wanted more war."],
      ["Its members wanted the king to rule without any assembly at all", "They said only an Estates-General could agree new taxes."],
      ["Its members said that the peasants should pay a good deal more", "Their objection was to being taxed themselves."],
    ],
    explanation: "Calonne's land tax would have ended exemptions. The Notables, who were nobles, clergy and officials, refused and said that only an Estates-General could approve it.",
  });
  mc(b, {
    d: 2, skill: "RECALL",
    stem: "Which Enlightenment thinker argued in The Spirit of the Laws for a separation of powers?",
    ok: ["Montesquieu", "Correct: he published the work in 1748."],
    no: [
      ["Jean-Jacques Rousseau", "Rousseau wrote The Social Contract on the general will."],
      ["Abbé Sieyès", "Sieyès wrote a pamphlet in 1789 on the Third Estate."],
      ["Jacques Necker", "Necker was a finance minister, not a philosophe."],
    ],
    explanation: "Montesquieu argued that dividing power prevents tyranny; Rousseau stressed the general will; Sieyès wrote What is the Third Estate? in 1789.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the question of voting by order or by head matter so much in May 1789?",
    ok: ["Voting by order let the two privileged estates outvote the Third Estate", "Correct: each estate had one vote, so privilege would win."],
    no: [
      ["Voting by head would have given the king power to veto every decision", "The veto was not the issue in the dispute over voting."],
      ["Voting by order was a new rule that Necker had just invented", "Voting by order was the custom from 1614."],
      ["Voting by head would have excluded the clergy from the debates", "Clergy were not excluded; they would have had fewer votes."],
    ],
    hints: ["The Third Estate had as many deputies as the other two together."],
    explanation: "With one vote for each estate, the two privileged estates could always defeat the Third. Voting by head would count its large number of deputies.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the deputies promise in the Tennis Court Oath of 20 June 1789?",
    ok: ["Not to separate until France had a constitution", "Correct: they would stay together until a constitution was written."],
    no: [
      ["To march on Paris and seize the Bastille", "The Bastille was attacked by a Paris crowd on 14 July."],
      ["To abolish the monarchy and declare a republic", "They intended a constitution, and the monarchy remained until 1792."],
      ["To refuse every tax until Necker returned to office", "The oath concerned a constitution, not Necker's return."],
    ],
    hints: ["The oath was sworn when the hall was closed."],
    explanation: "The deputies swore not to disperse until a constitution was established, which defied the king's authority but did not yet challenge the monarchy itself.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "What was the main effect of the August Decrees of 1789?",
    ok: ["They ended feudal dues, the tithe and noble privileges in law", "Correct: they broke up the legal basis of the old order."],
    no: [
      ["They gave the vote to every adult man and woman in all of France", "They did not give votes to women or all men."],
      ["They abolished slavery in all of the French colonies overseas", "Slavery was not abolished in 1789."],
      ["They created the Committee of Public Safety to run the war with Austria", "The Committee dates from 1793."],
    ],
    hints: ["Think of the Great Fear in the countryside."],
    explanation: "The Assembly passed the decrees of 4-11 August to calm the countryside; they abolished feudal dues, tithes, venal offices and privileges, although some payments were to be bought out.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the Declaration of the Rights of Man and of the Citizen is supported by its content?",
    ok: ["It declared equality before the law but gave no rights to women", "Correct: its promises were limited in practice."],
    no: [
      ["It made the king an absolute ruler with power over all laws and taxes", "It said that law was the expression of the general will."],
      ["It gave every adult woman the right to vote and sit in the Assembly", "Women were not given political rights in 1789."],
      ["It restored the privileges of the estates for a period of ten years or so", "The Declaration opposed privilege and spoke of equal rights."],
    ],
    hints: ["Think of who was left out of the Declaration."],
    explanation: "The Declaration proclaimed liberty, equality before the law and sovereignty of the nation, but it did not give political rights to women and did not abolish colonial slavery.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A historian argues that the privileged orders helped to bring on the Revolution. Which event best supports that view?",
    ok: ["The refusal of the Notables and parlements to accept tax reform", "Correct: they blocked reform and forced the king to summon the Estates-General."],
    no: [
      ["The march of the women of Paris to Versailles in the autumn of 1789", "This was an action of Paris crowds, not of the privileged."],
      ["The storming of the Bastille by the people of Paris in July", "This was an action of the people of Paris."],
      ["The writing of the cahiers by all three estates in the spring of 1789", "The cahiers were complaints from the Third Estate, as well as the other estates."],
    ],
    hints: ["Which event shows the privileged blocking the king's reforms?"],
    explanation: "The refusal of the Assembly of Notables (1787) and the resistance of the parlements show the privileged blocking reform, which led to the crisis that forced the calling of the Estates-General.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Estates-General had met regularly through the eighteenth century before 1789.",
    answer: false,
    explanation: "False. The Estates-General had not met since 1614, which is why no one knew exactly how it should work in 1789.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When the Bastille was stormed it held only a handful of prisoners; it mattered mainly as a symbol and for its stores of gunpowder.",
    answer: true,
    explanation: "True. The fortress held very few prisoners, but it symbolised royal power, and the crowd wanted arms and gunpowder. Its fall showed that the king no longer controlled Paris.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The cahiers of 1789 show that most French people wanted to abolish the monarchy.",
    answer: false,
    hints: ["Think of what the cahiers asked for."],
    explanation: "False. The cahiers mostly asked for a constitution, fairer taxation and the end of abuses, and they expressed loyalty to the king. A republic was not a general demand in 1789.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with the role he played in the events before and during 1789.",
    pairs: [
      ["Calonne", "Finance minister who proposed a land tax and called the Assembly of Notables"],
      ["Necker", "Finance minister recalled in 1788 and dismissed on 11 July 1789"],
      ["Sieyès", "Priest who wrote a pamphlet saying the Third Estate was the nation"],
      ["Lafayette", "Commander of the National Guard formed in Paris in July 1789"],
    ],
    explanation: "Calonne (1783-87), Necker (recalled 1788; dismissal triggered the Paris crisis), Sieyès (What is the Third Estate?) and Lafayette (National Guard).",
  });
  {
    const events = [
      "The Assembly of Notables meets",
      "The Third Estate declares itself the National Assembly",
      "The Bastille is stormed",
      "The women march from Paris to Versailles",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from February 1787 to October 1789."],
      explanation: "February 1787; 17 June 1789; 14 July 1789; 5-6 October 1789.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Tennis Court Oath was sworn on {{blank:a}} 1789, and the Great Fear in the countryside was followed by the {{blank:b}} Decrees.",
    blanks: [
      { id: "a", accepted: ["20 June"], choices: ["20 June", "5 May", "14 July", "5 October"] },
      { id: "b", accepted: ["August"], choices: ["August", "March", "October", "December"] },
    ],
    explanation: "The oath was sworn on 20 June 1789; the August Decrees (4-11 August) abolished feudal privileges.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the finance minister who proposed a land tax on all owners in 1786 and called the Assembly of Notables.",
    accepted: ["Calonne", "Charles Alexandre de Calonne", "de Calonne", "Charles de Calonne"],
    wrong: ["Necker"],
    explanation: "**Calonne** (Controller-General 1783-87).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the three estates of the Ancien Régime.",
    points: ["The First Estate was the clergy, which held land and collected the tithe", "The Second Estate was the nobility, which held high office and was largely exempt from the taille", "The Third Estate was everyone else, over 95 per cent of the people", "The Third Estate included peasants, workers and the wealthy bourgeoisie, and it paid most of the taxes"],
    modelAnswer: "The First Estate was the clergy, who owned land and collected the tithe. The Second Estate was the nobility, who held the high offices and paid little direct tax. The Third Estate was everyone else, over 95 per cent of the people, and included peasants, townspeople and wealthy bourgeois, and it paid most of the taxes.",
    explanation: "One mark for each estate described and one for the unequal burden of tax.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the American War of Independence contributed to the outbreak of the French Revolution.",
    points: [["It cost France very large sums, paid for mainly by loans, which increased the debt and the financial crisis", 2], ["It showed a republic based on rights and inspired French officers and the educated, strengthening the demand for reform", 2]],
    hints: ["Think of money and of ideas."],
    modelAnswer: "The war cost France more than a billion livres, which was borrowed, so the debt grew and the crown could not pay for it without new taxes. The American example also showed a republic founded on rights, and French officers such as Lafayette brought back ideas of liberty, which strengthened the demand for reform.",
    explanation: "Two marks for the financial effect and two for the effect of ideas.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the storming of the Bastille was important.",
    points: [["It showed that the king had lost control of Paris and could not use troops against the Assembly", 2], ["It led to a new city government and National Guard and encouraged revolt in the countryside, so the Revolution spread", 2]],
    hints: ["Think of what the king could no longer do afterwards."],
    modelAnswer: "The fall of the Bastille showed that the king had lost control of Paris and could not use the army against the National Assembly. It led to a new city government and the National Guard, and it encouraged risings in the provinces and the Great Fear, so the Revolution spread beyond Versailles.",
    explanation: "Credit explained consequences, not a description of the attack.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Estates-General, called to solve a financial problem, turned into a revolution.",
    levels: levels(6),
    points: [["The privileged blocked tax reform and forced the king to call the Estates-General, which made the crisis political", 2], ["The dispute about voting by order or head showed that the Third Estate had been given more deputies but no real power; Sieyès and others argued that it was the nation, so it declared itself the National Assembly", 2], ["The king's attempt to close the hall and bring troops failed because of the Tennis Court Oath and the Paris crowd of July, so the king lost control", 2]],
    hints: ["Link the money problem, the voting dispute and the king's response."],
    modelAnswer: "The Estates-General was called because the privileged had blocked tax reform in 1787-88, so the problem of money had already become a political one. In May the voting dispute showed that the Third Estate, with as many deputies as the others together, could be outvoted by order. Encouraged by Sieyès's argument that it was the nation, it declared itself the National Assembly in June and swore the Tennis Court Oath. The king's response of closing the hall and moving troops failed when the Paris crowd stormed the Bastille, so the king lost control and the meeting became a revolution.",
    explanation: "Credit linked explanation: the financial roots, the voting dispute and the king's failure to control events.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a list of complaints from the peasants of a fictional village in Burgundy, spring 1789",
        "We pray that the king will lift the burden of the salt tax and the tithe. The lord's dues take a large part of our harvest, and the lord and the priest pay nothing like our share to the king. We love our king and ask that his ministers hear the voice of the people."),
      "",
      source("Source B", "a letter written by a fictional lawyer in Rennes to a friend, July 1789",
        "The deputies in Versailles have shown the nation what it can do. Yet I fear for the harvest and the price of bread. In the towns the people are hungry and angry, and some say the nobles will bring soldiers against us. If the king sides with the nobles we will have no choice but to defend what the Assembly has won."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What complaints does Source A make?", points: ["Burdens on the peasants such as the salt tax, the tithe and the lord's dues", "The privileged pay far less than the peasants in proportion"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the attitude of the people towards the king.", points: [["Agree: both show people who expect the king and the Assembly to deliver change", 2], ["Differ: A expresses loyalty and love for the king; B fears that the king may side with the nobles and talks of defending the Assembly", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the causes of the Revolution?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a petition of the kind that formed the cahiers and shows grievances against privilege and taxes; but peasant petitions were written for the king and might exaggerate loyalty or be guided by local lawyers", 2], ["B is a private letter by an educated man at a later moment and shows the effect of hunger and fear after the Bastille; but one man's opinion", 2], ["Own knowledge: the cahiers, the bad harvest of 1788 and the fear of a plot match both sources, so the pair is useful for different stages", 2]], modelAnswer: "Source A is useful because it is a petition of the kind that formed the cahiers of 1789, and it shows peasant grievances over the tithe, the salt tax and feudal dues, in line with what we know about the unequal burden of taxes. Yet such petitions were written for the king, often with the help of local lawyers, so the loyalty may be formal. Source B is a private letter by an educated man in July 1789 and shows hunger and fear of a noble plot, which fits the Great Fear and the rise in bread prices, but it is one man's view and is concerned with the bourgeoisie. Together they show how the mood moved from hope in the king in the spring to distrust by July, which is useful for the stages of the Revolution." }),
    ],
    hints: ["For (c), consider who wrote each source, for whom and when."],
    explanation: "Both sources are invented: a village petition and a lawyer's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "To what extent was the financial crisis the main cause of the outbreak of the French Revolution?",
    levels: levels(8),
    points: [
      ["The financial crisis: debt from wars including the American war, an unfair tax system, the failure of Turgot, Necker and Calonne, and the Notables of 1787", 2],
      ["Other long-term causes: unequal estates, privilege, the ambitions of the bourgeoisie and Enlightenment ideas", 2],
      ["Immediate triggers: the bad harvest of 1788, the voting dispute, the king's use of troops and the dismissal of Necker", 2],
      ["Judgement: the crisis forced the king to call the Estates-General, but privilege and the political dispute turned it into a revolution", 2],
    ],
    hints: ["Weigh the financial crisis against privilege, ideas and the triggers."],
    modelAnswer: "The financial crisis was the most important cause, because it forced the monarchy to call the Estates-General. The debt, swollen by the American war, could not be paid without taxing the privileged, and the failures of Turgot, Necker and Calonne and the refusal of the Notables showed that the system could not reform itself. However, the crisis alone does not explain why a revolution followed. The unequal estates and the ambitions of the bourgeoisie, helped by Enlightenment ideas, gave the Third Estate a language and a leadership, and the bad harvest of 1788 and the king's use of troops in July supplied the triggers. I conclude that the crisis was the immediate cause, but privilege and the political dispute made it a revolution.",
    explanation: "Credit explained causes and a supported judgement.",
  });

  b.card("DEFINITION", "What was the Ancien Régime?", "The old order in France before 1789: absolute monarchy, three unequal estates and a system of privileges.");
  b.card("DEFINITION", "What were the cahiers de doléances?", "Lists of grievances drawn up in the spring of 1789 and sent to Versailles with the deputies.");
  b.card("FACT", "When did the Estates-General open, and when had it last met?", "5 May 1789 at Versailles; it had last met in 1614.");
  b.card("FACT", "What happened on 17 June and 20 June 1789?", "The Third Estate declared itself the National Assembly (17 June) and swore the Tennis Court Oath (20 June).");
  b.card("FACT", "When was the Bastille stormed, and why did it matter?", "14 July 1789; the king lost control of Paris and the Assembly was saved.");
  b.card("FACT", "What did the August Decrees (4-11 August 1789) do?", "Abolished feudal dues, the tithe, privileges and the sale of offices in law.");
  b.card("FACT", "What happened on 5-6 October 1789?", "Women of Paris marched to Versailles over bread, and the royal family was brought to Paris.");
  b.card("CONCEPT", "Why did Calonne's reform plan fail in 1787?", "The Assembly of Notables, who would have paid the land tax, refused it and said only an Estates-General could agree.");
  b.card("CONCEPT", "Why did voting by order or by head matter in 1789?", "By order the clergy and nobles could outvote the Third Estate; by head its larger number of deputies would count.");
});
