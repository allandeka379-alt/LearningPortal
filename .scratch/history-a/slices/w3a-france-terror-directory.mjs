// W3a: ahist.france.terror-directory (ZIMSEC events 1793-99; Cambridge France 1.3).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.france.terror-directory", { file: "france/terror-directory", keyPrefix: "france.terror-directory" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which body directed the war and government of the Republic during the Terror?",
    ok: ["The Committee of Public Safety", "Correct: it was set up in April 1793."],
    no: [
      ["The Council of Ancients, the upper house under the Directory", "The Council of Ancients belonged to the Directory of 1795."],
      ["The Assembly of Notables, which had met under Calonne", "The Notables met in 1787 under the monarchy."],
      ["The Legislative Assembly, which sat from the end of 1791", "The Legislative Assembly ended in 1792."],
    ],
    explanation: "The Committee of Public Safety, reorganised in July 1793, directed the war effort and the government until the fall of Robespierre.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Law of Suspects allow the authorities to do?",
    ok: ["Arrest anyone thought to be hostile to the Revolution", "Correct: it widened the powers of arrest."],
    no: [
      ["Release all prisoners who had been arrested by the sections", "It increased arrests, not releases."],
      ["Ban the sale of bread outside the markets of Paris", "That was a matter of the Maximum and the markets."],
      ["Give the vote to all men who had served in the army", "It was a law of arrest, not of the franchise."],
    ],
    explanation: "The Law of Suspects of 17 September 1793 permitted the arrest of those whose conduct, words or associations suggested opposition, and so filled the prisons.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "What was the General Maximum of September 1793?",
    ok: ["A law fixing the prices of essential goods", "Correct: it set price ceilings, later with wages."],
    no: [
      ["A decree limiting the number of deputies in the Convention", "It concerned prices, not deputies."],
      ["A rule restricting the size of the army to a fixed number", "It did not limit the army; the levée en masse enlarged it."],
      ["A treaty that fixed the borders of France with Austria", "It was a domestic economic law."],
    ],
    explanation: "The Maximum fixed ceilings on the price of bread, meat, fuel and other necessities (and on wages), to satisfy the sans-culottes and supply the army.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did the Girondin deputies fall from power in June 1793?",
    ok: ["The Paris sections surrounded the Convention and forced their expulsion", "Correct: the sections demanded their arrest."],
    no: [
      ["The king's supporters in the Vendée captured them in battle and held them prisoner", "The Vendée revolt did not remove them."],
      ["The Directory exiled them for plotting with the army", "The Directory came in 1795."],
      ["Napoleon dissolved the Convention that they had sat in", "Napoleon acted in 1799."],
    ],
    hints: ["Think of the insurrection of 31 May to 2 June."],
    explanation: "The sections and the National Guard surrounded the Convention between 31 May and 2 June 1793 and forced the expulsion of 29 Girondins, which gave the Montagnards power.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which fact is best used to argue that the Terror was not only a response to military emergency?",
    ok: ["The Great Terror followed the victory at Fleurus in 1794", "Correct: executions increased after the military danger had eased."],
    no: [
      ["The Vendée rising began in March 1793, before the Terror", "This supports the emergency view."],
      ["The Girondins were expelled when the army was losing battles", "This fits the emergency view."],
      ["Dumouriez deserted to the enemy while the frontier was threatened", "This too fits the emergency view."],
    ],
    hints: ["Which event shows the Terror growing when the danger had passed?"],
    explanation: "After Fleurus (June 1794) the military threat was easing, yet the Law of 22 Prairial brought the Great Terror. Historians who stress ideology and factional fear use this fact.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened in France on 9 Thermidor Year II?",
    ok: ["Robespierre was shouted down and arrested in the Convention", "Correct: he was executed the next day."],
    no: [
      ["Bonaparte seized power by closing the Council of Five Hundred", "That was 18 Brumaire in 1799."],
      ["The Paris sections drove the Girondins from the Convention", "That was June 1793."],
      ["The monarchy was abolished and the Republic was proclaimed", "That was September 1792."],
    ],
    hints: ["The date in the ordinary calendar is 27 July 1794."],
    explanation: "On 9 Thermidor (27 July 1794) deputies in the Convention turned on Robespierre; he was arrested and executed on 28 July with Saint-Just and Couthon.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which feature of the Constitution of the Year III was designed to prevent a dictatorship?",
    ok: ["Power was shared by five Directors and two legislative councils", "Correct: no single man controlled the executive."],
    no: [
      ["All power was given to one general chosen by the army", "This would create a dictatorship."],
      ["The king was restored to his throne with a suspensive veto over the councils", "The monarchy was not restored."],
      ["Every adult citizen, men and women, voted for the Directors", "The vote was restricted by property."],
    ],
    hints: ["Think of the number of Directors."],
    explanation: "The Constitution of 1795 divided the executive among five Directors and the legislature between two councils, because the framers feared both a new tyranny and mob rule.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which evidence best supports the view that the Directory depended on the army rather than on popular support?",
    ok: ["The coup of 18 Fructidor, carried out with troops against elected deputies", "Correct: troops were used to overturn election results."],
    no: [
      ["The Directory's victory over Austria in the Treaty of Campo Formio, signed in 1797", "This shows military success but not dependence on the army at home."],
      ["The Constitution of 1795 and its two legislative councils", "The Constitution shows a design for balance."],
      ["The currency reform and the end of the assignat in 1796", "This shows financial reform and not the use of force."],
    ],
    hints: ["Which event shows the Directors using soldiers against the voters?"],
    explanation: "In September 1797 the Directors, with General Augereau's troops, annulled the elections and removed royalist deputies. Such coups show a regime that relied on force.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Vendée rising of 1793 was a revolt in the west of France against the Republic.",
    answer: true,
    explanation: "True. It began in March 1793 over the call for recruits, and it grew from anger about the Church reforms and the demands of the towns.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Constitution of 1793, which promised universal male suffrage, was put into practice during the Terror.",
    answer: false,
    explanation: "False. It was approved but suspended in October 1793, on the argument that government must stay revolutionary until the peace.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Robespierre alone made the decisions of the Committee of Public Safety.",
    answer: false,
    hints: ["Think of the other members of the Committee."],
    explanation: "False. The Committee had twelve members, including Carnot, Saint-Just and Couthon, and the Convention approved the laws. Robespierre was influential but not a dictator.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his role.",
    pairs: [
      ["Carnot", "Member of the Committee of Public Safety who organised the army"],
      ["Danton", "Revolutionary leader executed in April 1794 after urging an end to the Terror"],
      ["Barras", "Director and politician who commanded the troops in Paris in October 1795"],
      ["Babeuf", "Leader of the Conspiracy of the Equals against the Directory"],
    ],
    explanation: "Carnot (army), Danton (executed 5 April 1794), Barras (Vendémiaire, later a Director) and Babeuf (conspiracy of 1796).",
  });
  {
    const events = [
      "Louis XVI is executed",
      "The Law of Suspects is passed",
      "Robespierre is arrested on 9 Thermidor",
      "The coup of 18 Brumaire",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from January 1793 to November 1799."],
      explanation: "January 1793; September 1793; July 1794; November 1799.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Robespierre fell on 9 {{blank:a}}, and the five-man executive that governed from 1795 was called the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Thermidor"], choices: ["Thermidor", "Brumaire", "Fructidor", "Germinal"] },
      { id: "b", accepted: ["Directory"], choices: ["Directory", "Consulate", "Convention", "Committee"] },
    ],
    explanation: "9 Thermidor is 27 July 1794; the Directory ruled from late 1795 to November 1799.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the general who defeated the royalist rising in Paris in October 1795 and later seized power.",
    accepted: ["Napoleon Bonaparte", "Napoleon", "Bonaparte", "Napoleon I"],
    wrong: ["Lafayette"],
    explanation: "**Napoleon Bonaparte**, who directed the guns for Barras on 13 Vendémiaire.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main institutions of the Terror.",
    points: ["The Committee of Public Safety directed the war and government", "The Revolutionary Tribunal tried political suspects", "The Law of Suspects allowed wide arrests", "Representatives on mission and the Committee of General Security carried out the policy in the provinces and in policing"],
    modelAnswer: "The Committee of Public Safety directed the war and government. The Revolutionary Tribunal tried political suspects, and the Law of Suspects allowed wide arrests. Representatives on mission and the Committee of General Security enforced the policy in the provinces and kept order.",
    explanation: "One mark for each institution or measure described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Terror was introduced in 1793.",
    points: [["The Republic faced foreign invasion, the Vendée revolt and federalist revolts, so a strong emergency government seemed necessary", 2], ["Hunger and the demands of the sans-culottes and the fear of traitors led the Convention to adopt arrests, tribunals and price controls", 2]],
    hints: ["Think of war, revolt and the demands of the people of Paris."],
    modelAnswer: "The Republic faced a coalition of foreign enemies, a revolt in the Vendée and risings in southern cities, so an emergency government seemed necessary. Hunger and the pressure of the sans-culottes, together with fear of traitors, led the Convention to adopt special tribunals, wide arrests and price controls.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Robespierre fell from power in July 1794.",
    points: [["The military crisis had eased after Fleurus, so many deputies no longer saw the need for the Terror", 2], ["Deputies feared that they would be the next victims after the Law of 22 Prairial, and joined against him on 9 Thermidor", 2]],
    hints: ["Think of the victories and of the fear among the deputies."],
    modelAnswer: "After the victory at Fleurus the military crisis had eased, so many deputies no longer saw the need for the Terror. The Law of 22 Prairial made them fear that they would be the next victims, and they joined together to overthrow him on 9 Thermidor.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a petition from a fictional section of Paris to the Convention, September 1793",
        "Citizens, bread costs more each week, while merchants hoard and sell at any price. Our children go hungry, yet the army must be fed. We ask for a fixed price on bread and meat and for the punishment of hoarders. We are loyal to the Republic and will defend it."),
      "",
      source("Source B", "a letter written by a fictional bread merchant in Bordeaux to his brother, in January a month after the Maximum was lifted",
        "Since the Maximum was lifted, prices have jumped and some of our neighbours cannot buy grain. We merchants can sell freely again, and the markets are fuller than they were, but I do not like to see the poor wait at our door. Those who made the laws of last year did not understand trade."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A ask the Convention to do?", points: ["Fix the price of bread and meat", "Punish hoarders / ensure the army and children are fed"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about attitudes to price controls.", points: [["Agree: both show that bread was dear and the poor suffered; both refer to hoarding or to the poor waiting for food", 2], ["Differ: A calls for fixed prices and punishment of hoarders; B welcomes freedom to sell and criticises the laws of the Maximum", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the economic problems of the Republic in these years?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A shows the demands of the sans-culottes for controls and the effect of hunger, but it is a petition meant to persuade, so it may exaggerate and omits the army's requisitions", 2], ["B shows the effect of ending the Maximum, with higher prices and fuller markets, but it is by a merchant who gains from free trade and is therefore partial", 2], ["Own knowledge: the Maximum of September 1793, its end in December 1794 and the hard winter fit both sources; together they give two sides of the economic debate", 2]], modelAnswer: "Source A is useful because it shows the demand of the sans-culottes for price controls in September 1793, the very month the Maximum was passed; but a petition is meant to persuade, so the hunger and hoarding may be exaggerated. Source B shows the effect of ending the Maximum in December 1794, with higher prices but fuller markets, which fits the hard winter of 1794-95; yet it is by a merchant who gains from free trade and so is partial. Together they show the two sides of the economic debate, so they are useful, though neither tells us how widespread the shortages were." }),
    ],
    hints: ["For (c), consider who wrote each source and why."],
    explanation: "Both sources are invented: a section petition and a merchant's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the success of the Directory in governing France.",
    levels: levels(8),
    points: [
      ["Successes: military victories and the Treaty of Campo Formio, conquered resources, the stabilising of the currency and some administrative work", 2],
      ["Failures: dependence on coups (18 Fructidor), the army and corrupt Directors; renewed defeats in 1798-99; the Conspiracy of the Equals and royalist plots", 2],
      ["Weak foundations: a restricted franchise, no loyal party and the memory of the Terror, which left people wanting stability", 2],
      ["Judgement on how far it governed well, linking the strength of the army to its own fall", 2],
    ],
    hints: ["Weigh the military and financial successes against its dependence on coups."],
    modelAnswer: "The Directory was only partly successful. It kept the Republic together after the Terror, won victories culminating in the Treaty of Campo Formio, and stabilised the currency after the collapse of the assignat. But it had narrow support. Royalists and Jacobins both plotted against it, and when elections went against it the Directors used the army to cancel them, as at 18 Fructidor. Corruption and defeats in 1799 made it unpopular, and its reliance on generals gave Bonaparte his opportunity. I conclude that it achieved military and some financial success but failed to build stable political support.",
    explanation: "Credit explained successes and failures and a supported judgement.",
  });

  b.card("DEFINITION", "What was the Terror?", "The emergency government of 1793-94 in which suspects were arrested, tried by special courts and often executed to defend the Republic.");
  b.card("DEFINITION", "Who were the sans-culottes?", "Working Parisians (artisans, shopkeepers, wage earners) active in the sections who demanded cheap bread, price controls and action against traitors.");
  b.card("FACT", "What did the Law of Suspects of 17 September 1793 allow?", "The arrest of anyone suspected of hostility to the Revolution.");
  b.card("FACT", "When did Robespierre fall?", "9 Thermidor Year II (27 July 1794); executed on 28 July.");
  b.card("FACT", "What happened on 18 Fructidor (4 September 1797)?", "The Directors, with the army, annulled the elections and removed royalist deputies.");
  b.card("FACT", "What was the Directory?", "The government of five Directors from late 1795 to November 1799, under the Constitution of the Year III.");
  b.card("CONCEPT", "Why did the Terror continue after the victories of 1794?", "Historians point to ideology and factional fear as well as emergency; the Great Terror followed the Law of 22 Prairial.");
  b.card("CONCEPT", "What was the White Terror?", "Killings of Jacobins and sympathisers by royalists and others in 1795, especially in the south-east.");
  b.card("CONCEPT", "Why did the Directory fall in 1799?", "It had little popular support, relied on coups and the army, suffered defeats in 1799 and was overthrown by Bonaparte on 18 Brumaire.");
});
