// W3a: ahist.france.republic-1792 (ZIMSEC revolution events; Cambridge France 1.2).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.france.republic-1792", { file: "france/republic-1792", keyPrefix: "france.republic-1792" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What name was given to the paper bonds secured on Church lands that later served as money?",
    ok: ["Assignats", "Correct: they were issued from December 1789."],
    no: [
      ["Livres tournois", "This was the old unit of account, not the new paper."],
      ["Cahiers", "Cahiers were lists of grievances."],
      ["Tithes", "A tithe was a Church tax in kind or money."],
    ],
    explanation: "The assignats were issued from December 1789, secured on confiscated Church lands, and soon lost value as more were printed.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the Civil Constitution of the Clergy divide French Catholics?",
    ok: ["It made priests elected state employees and demanded an oath many refused", "Correct: about half the priests would not swear the oath."],
    no: [
      ["It abolished all religious worship across France and closed every church and chapel", "It reorganised the Church; it did not ban worship in 1790."],
      ["It gave the Pope the right to appoint every bishop in France again", "It reduced the Pope's role."],
      ["It ordered all priests to leave the country and give up their parishes", "Priests were not forced to leave; the oath was the issue."],
    ],
    explanation: "The Civil Constitution (July 1790) made clergy elected and paid by the state. Priests who refused the oath of November 1790 were called refractory and became a focus for counter-revolution.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What happened to the royal family at Varennes in June 1791?",
    ok: ["They were recognised, stopped and brought back to Paris", "Correct: the flight failed."],
    no: [
      ["They reached the frontier and joined the army of the émigrés abroad", "They did not reach the frontier."],
      ["They were executed by a crowd outside the town on the road to the east", "They were returned alive to Paris."],
      ["They were welcomed by loyal troops and escorted safely to the Austrian border", "The attempt failed."],
    ],
    explanation: "The flight of 20-21 June 1791 ended when the king was recognised at Varennes. He was returned to Paris, and trust in him collapsed.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the political effect of the shooting at the Champ de Mars?",
    ok: ["It split the Jacobins and created the moderate Feuillants", "Correct: moderates left the Jacobin club."],
    no: [
      ["It ended the war with Austria on terms favourable to France", "The war began in April 1792."],
      ["It united all revolutionaries behind Lafayette and the National Guard", "It made Lafayette unpopular with the left."],
      ["It restored the powers of the parlements and the old provinces", "These were not restored."],
    ],
    hints: ["Think of what happened to the club that had backed the petition."],
    explanation: "After the National Guard fired on the crowd on 17 July 1791, moderates such as Barnave left the Jacobins to form the Feuillants, while the Paris left grew more hostile to the moderates.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the Girondins want war with Austria in 1792?",
    ok: ["They believed war would spread the Revolution and expose the king's loyalty", "Correct: war would also unite the nation."],
    no: [
      ["They hoped for a French defeat that would bring back the monarchy", "That was the hope of the king and some of his circle."],
      ["They wished to protect the lands of the Church from the Pope's armies", "Church lands were not the reason for the war."],
      ["They had been ordered by the Constitution of 1791 to declare war on Austria and Prussia", "The Constitution did not order war."],
    ],
    hints: ["Think of what Brissot and his friends hoped war would achieve."],
    explanation: "The Girondins believed a war would spread revolutionary ideas and test whether the king was loyal. The king hoped that defeat would restore his authority, which is why war endangered him.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which event led directly to the suspension of Louis XVI in August 1792?",
    ok: ["The attack on the Tuileries by Paris sections and the fédérés", "Correct: the Assembly suspended the king after the attack."],
    no: [
      ["The signing of the Declaration of Pillnitz by Austria and Prussia", "The Declaration of 1791 was a threat but not the cause of the suspension."],
      ["The victory of the French army at Valmy over the Prussian invaders", "Valmy came after the suspension, in September."],
      ["The shooting of petitioners at the Champ de Mars in Paris", "This was in July 1791, a year earlier."],
    ],
    hints: ["The date of the event is 10 August."],
    explanation: "On 10 August 1792 the Paris sections and the fédérés attacked the Tuileries, and the Legislative Assembly suspended the king and called a Convention.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which evidence best supports the view that the Revolution of 1792 owed more to war than to republican ideas?",
    ok: ["The Brunswick Manifesto and early defeats turned Parisian opinion against the king", "Correct: war created suspicion of treason."],
    no: [
      ["The cahiers of 1789 had asked for the abolition of the monarchy", "The cahiers did not ask for this."],
      ["Most deputies of the Legislative Assembly had been elected on a republican programme in 1791", "The Assembly was elected under a monarchy."],
      ["Montesquieu had already described the ideal republic for France in 1748", "This was general political theory and not the cause of 1792."],
    ],
    hints: ["Which evidence shows the immediate cause of the king's fall?"],
    explanation: "The king was suspected of treason because of the war, the defeats and the Brunswick Manifesto. A historian arguing that war was the cause points to this chain, though others stress the Revolution's earlier divisions.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the counter-revolutionaries by 1792 is best supported by the evidence?",
    ok: ["They had causes and support abroad but were too divided to defeat the Revolution", "Correct: the émigrés and refractory priests lacked unity."],
    no: [
      ["They had defeated the Revolution in Paris and now controlled the Legislative Assembly and army", "They did not control the Assembly."],
      ["They had no supporters at all inside France or abroad", "They had supporters among the refractory clergy and émigrés."],
      ["They were united under the leadership of Robespierre and Danton", "Robespierre and Danton were revolutionaries."],
    ],
    hints: ["Think of the émigrés, the refractory priests and the Declaration of Pillnitz."],
    explanation: "The émigrés looked for help from Austria and Prussia and the refractory clergy had local support, but they were divided and unable to defeat the Revolution before 1792; their activity made the revolutionaries more suspicious of the king.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "France declared war on Austria in April 1792.",
    answer: true,
    explanation: "True. The Legislative Assembly declared war on 20 April 1792.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the Constitution of 1791 every adult man and woman could vote.",
    answer: false,
    explanation: "False. Only male active citizens who paid a minimum tax could take part in the elections; women and passive citizens could not.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Almost all revolutionaries in 1789 wanted France to become a republic.",
    answer: false,
    hints: ["Think of the Constitution of 1791."],
    explanation: "False. The Revolution began as an attempt to limit the king's powers, and the Constitution of 1791 kept him. The republic came only after Varennes, war and the events of August 1792.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each group with its description.",
    pairs: [
      ["Feuillants", "Moderates who left the Jacobins in 1791 and wished to keep the constitutional monarchy"],
      ["Girondins", "Deputies led by Brissot who pressed for war with Austria"],
      ["Refractory priests", "Clergy who refused to swear the oath to the Civil Constitution"],
      ["Émigrés", "Nobles and others who left France to oppose the Revolution"],
    ],
    explanation: "These four groups are needed for answers on the politics of 1791-92.",
  });
  {
    const events = [
      "The Civil Constitution of the Clergy",
      "The flight to Varennes",
      "France declares war on Austria",
      "The monarchy is abolished by the Convention",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from July 1790 to September 1792."],
      explanation: "July 1790; June 1791; April 1792; September 1792.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The royal family tried to flee in June but was stopped at {{blank:a}}, and the monarchy was attacked at the {{blank:b}} palace on 10 August.",
    blanks: [
      { id: "a", accepted: ["Varennes"], choices: ["Varennes", "Valmy", "Versailles", "Verdun"] },
      { id: "b", accepted: ["Tuileries"], choices: ["Tuileries", "Louvre", "Luxembourg", "Bastille"] },
    ],
    explanation: "Varennes in June 1791 and the Tuileries on 10 August 1792.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the battle of 20 September 1792 at which the French army stopped the Prussian invasion.",
    accepted: ["Valmy", "the battle of Valmy", "battle of Valmy"],
    wrong: ["Waterloo"],
    explanation: "**Valmy**: a French artillery duel, not a large battle, but it saved the Revolution and raised morale.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the reforms of the Church made by the Constituent Assembly.",
    points: ["Church lands were taken over by the state to pay debts", "The assignats were issued, secured on Church land", "The Civil Constitution of the Clergy made priests and bishops elected and paid by the state", "Priests had to swear an oath; those who refused were refractory"],
    modelAnswer: "The Assembly took over Church lands to pay the state's debts and issued assignats secured on them. The Civil Constitution of the Clergy of 1790 made priests and bishops elected and paid by the state, and priests were ordered to swear an oath to it. About half refused and were called refractory.",
    explanation: "One mark for each reform described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the flight to Varennes damaged the monarchy.",
    points: [["It showed that the king did not accept the Revolution and was trying to leave the country, so he could not be trusted as a constitutional monarch", 2], ["It encouraged calls for a republic and made the Assembly's claim that he had been abducted hard to believe", 2]],
    hints: ["Think of what the flight said about the king's loyalty."],
    modelAnswer: "The flight showed that the king did not accept the Revolution and wished to leave the country, so he could not be trusted as a constitutional monarch. It also encouraged calls for a republic, and it made the Assembly's story that he had been abducted hard to believe.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Constitution of 1791 failed to bring stability.",
    points: [["The king did not accept it and used his veto, and he tried to flee; so he could not work with the Assembly", 2], ["It divided the nation by excluding passive citizens, by the dispute over the Church and by the war, which made it unworkable", 2]],
    hints: ["Think of the king, the Church and the war."],
    modelAnswer: "The king did not accept the Constitution and used his veto and tried to flee, so he could not work with the Assembly. It also left many men outside the vote as passive citizens, was undermined by the dispute over the Church and then by the war, so it could not hold.",
    explanation: "Credit explained reasons, not description of the Constitution.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a newspaper report by a fictional moderate journalist in Paris, June 1791",
        "The king has left his capital in secret. Let us not rush to judgement; he may have been misled by evil counsellors. The Assembly has acted wisely in saying that he was carried off. The Constitution is nearly finished and the nation needs its king."),
      "",
      source("Source B", "a speech made by a fictional member of a Paris section, in August after four months of war",
        "The king has deceived us. He fled, he vetoed our laws, he waits for the foreign armies that threaten our city. A king who plots with the enemy cannot be our king. The people of Paris have the right to act when the Assembly will not."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the attitude of its author to the king?", points: ["He is willing to excuse the king / blames evil counsellors", "He wants the monarchy to survive within the Constitution"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about attitudes to the king.", points: [["Agree: both say that the king has left or acted against the nation and both refer to the Assembly or the people as the authority", 2], ["Differ: A excuses the king and supports the monarchy; B accuses him of treason and rejects him", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources as evidence of why the monarchy fell?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A shows moderate opinion in 1791 and the attempt to protect the king; but a moderate journalist may have written to calm opinion, so it shows only one view", 2], ["B shows the anger and suspicion of the Paris sections after the war began; it is a speech meant to persuade, so it may exaggerate", 2], ["Own knowledge: Varennes, the veto, the war and the Brunswick Manifesto support B's view, and the change from A to B shows the fall of trust", 2]], modelAnswer: "Source A is useful because it shows the moderate wish in June 1791 to protect the king after Varennes, which fits the Assembly's claim that he had been abducted; but a journalist writing for moderates may have been trying to calm opinion. Source B shows the anger of the Paris sections in August 1792 and the belief that the king plotted with the enemy, which fits the war, the veto and the Brunswick Manifesto, but it is a speech meant to persuade and may exaggerate. Together they show how trust fell between 1791 and 1792, which helps to explain why the monarchy fell, though neither says why the Assembly had stopped defending him." }),
    ],
    hints: ["For (c), consider who wrote each source and why."],
    explanation: "Both sources are invented: a moderate newspaper report and a section speech.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far was the war the main reason for the fall of the monarchy in 1792?",
    levels: levels(8),
    points: [
      ["War: the declaration of April 1792, early defeats, the Brunswick Manifesto and the suspicion of treason", 2],
      ["The king's own conduct: the veto, the flight to Varennes and the failure to accept the Constitution", 2],
      ["The divisions of the Revolution: the Church reform, the Champ de Mars, the rise of the sans-culottes", 2],
      ["Judgement: war made the crisis fatal but the king's conduct and earlier divisions had already weakened the monarchy", 2],
    ],
    hints: ["Weigh war against the king's own actions and the divisions of 1790-91."],
    modelAnswer: "The war was the main reason for the fall of the monarchy, because it turned a political quarrel into an emergency. Early defeats and the Brunswick Manifesto led Parisians to believe that the king was in league with the invaders, and the attack on the Tuileries followed. But the war did not act alone. The king had already lost trust by vetoing laws and by the flight to Varennes in 1791, and the Church reform and the Champ de Mars shooting had left the revolutionaries divided. I conclude that the war was the immediate cause, but the king's conduct and these earlier divisions made it so damaging.",
    explanation: "Credit explained causes and a supported judgement.",
  });

  b.card("DEFINITION", "What were assignats?", "Paper bonds issued from December 1789, secured on confiscated Church lands, which soon served as money and lost value.");
  b.card("DEFINITION", "What was a refractory priest?", "A priest who refused to swear the oath to the Civil Constitution of the Clergy (1790).");
  b.card("FACT", "What happened at Varennes?", "In June 1791 the royal family tried to flee but was stopped and brought back to Paris.");
  b.card("FACT", "What happened at the Champ de Mars on 17 July 1791?", "The National Guard fired on a crowd petitioning for the king's removal; the Jacobins split and the Feuillants formed.");
  b.card("FACT", "When did France declare war on Austria?", "20 April 1792.");
  b.card("FACT", "What happened on 10 August 1792?", "The Tuileries was attacked by Paris sections and fédérés, and the Assembly suspended the king.");
  b.card("FACT", "When did the Convention abolish the monarchy and proclaim the Republic?", "21 September 1792 and 22 September 1792, after Valmy on 20 September.");
  b.card("CONCEPT", "Why did the Civil Constitution of the Clergy weaken the Revolution?", "It divided Catholics, because about half the priests refused the oath, and it gave counter-revolutionaries a popular cause.");
  b.card("CONCEPT", "Why did the king lose trust between 1791 and 1792?", "He fled to Varennes, used his veto, hoped for foreign help in the war, and the Brunswick Manifesto made him seem a traitor.");
});
