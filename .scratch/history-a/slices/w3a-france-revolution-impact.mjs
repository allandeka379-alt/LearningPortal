// W3a: ahist.france.revolution-impact (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";
import { POS, mc } from "../tables/w3a-util.mjs";

concept("ahist.france.revolution-impact", { file: "france/revolution-impact", keyPrefix: "france.revolution-impact" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which colony was the scene of the revolt of enslaved people that led to the independence of Haiti?",
    ok: ["Saint-Domingue", "Correct: the revolt began there in 1791."],
    no: [
      ["Louisiana, which Napoleon sold to the United States", "Louisiana was sold, not the site of this revolt."],
      ["Martinique in the eastern Caribbean sea", "This was a different French island colony."],
      ["Cuba, then ruled by Spain in the Caribbean", "Cuba was Spanish."],
    ],
    explanation: "Saint-Domingue, the richest French colony, was the site of the revolt of 1791 that led to independent Haiti in 1804.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which change in French society did the August Decrees and later laws confirm?",
    ok: ["The end of feudal dues and of the legal privileges of the estates", "Correct: privilege in law was abolished."],
    no: [
      ["The right of every woman to vote and to hold public office", "Women did not gain political rights."],
      ["The return of Church lands to the clergy of the old Church", "Church lands were sold and not returned."],
      ["The restoration of the parlements as courts of the provinces", "The parlements were abolished."],
    ],
    explanation: "The Revolution abolished feudal dues, tithes and the privileges of the estates, which gave all male citizens equality before the law.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Convention decide about slavery in the French colonies in 1794?",
    ok: ["It abolished slavery in all the colonies", "Correct: abolition was declared on 4 February 1794."],
    no: [
      ["It confirmed slavery but reduced the number of enslaved people", "It abolished slavery."],
      ["It sold the colonies to Britain to pay the debts of France", "The colonies were not sold."],
      ["It abolished the slave trade but not slavery itself", "It abolished slavery itself."],
    ],
    explanation: "The Convention abolished slavery in the colonies on 4 February 1794, partly in response to the rising in Saint-Domingue; Napoleon restored it in 1802.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did other European monarchies fear the French Revolution?",
    ok: ["Its ideas of popular sovereignty and equality threatened their own authority", "Correct: the example might spread."],
    no: [
      ["It had made France too weak to defend its trade with the colonies", "The monarchies feared the example, not a weak France."],
      ["It had abolished the use of armies in the defence of the nation", "France created huge armies."],
      ["It had given the Pope control of all the kings of Europe", "The Revolution reduced the Pope's role."],
    ],
    hints: ["Think of what popular sovereignty meant for kings."],
    explanation: "Monarchs feared that revolutionary ideas of rights and the people's sovereignty might spread to their own subjects.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which developments show that the Revolution gave little to women?",
    ok: ["Women had no vote and their political clubs were banned in 1793", "Correct: they were excluded from political rights."],
    no: [
      ["Women were given the vote under the Constitution of 1791", "They were not given the vote."],
      ["Women were allowed to sit as deputies in the Convention", "No women sat in the Convention."],
      ["The Napoleonic Code gave wives full equality with husbands", "The Code strengthened the authority of husbands."],
    ],
    hints: ["Think of the vote and of the clubs."],
    explanation: "Women gained inheritance rights and civil marriage and divorce, but not the vote; the Convention banned their clubs in October 1793, and the Code limited them again.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "How did Napoleon's actions in Spain affect Spanish America?",
    ok: ["They weakened Spanish control and encouraged independence movements", "Correct: colonies acted when the king was removed."],
    no: [
      ["They strengthened the Spanish empire by uniting it against France", "They weakened the empire."],
      ["They led the colonies to ask the French emperor to rule them", "The colonies mostly moved towards independence."],
      ["They made no difference to the government of the colonies", "They had a large effect."],
    ],
    hints: ["Think of what happened when the Spanish king was removed in 1808."],
    explanation: "When Napoleon removed the Spanish king in 1808, authority in the colonies was questioned, and independence movements led by Bolívar and San Martín grew.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement best supports the view that the Revolution brought more continuity than change?",
    ok: ["The centralised state grew under Napoleon, much as it had under the monarchy", "Correct: it continues the centralising trend of the old state."],
    no: [
      ["The estates and their tax exemptions were abolished in 1789", "This is a major change."],
      ["The metric system replaced the many local weights and measures", "This is a change."],
      ["The republic was proclaimed and the king was executed in 1793", "This is a major change."],
    ],
    hints: ["Which fact shows something carrying on from before 1789?"],
    explanation: "Historians such as Tocqueville stressed that the centralised state of the Revolution and Napoleon built on the work of the monarchy, which supports the continuity view.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which comment about the spread of revolutionary ideas by French armies is best supported by the evidence?",
    ok: ["Reforms were welcomed by some, but occupation encouraged national resistance", "Correct: both reactions occurred."],
    no: [
      ["Every conquered people welcomed French rule and asked it to stay", "Resistance occurred in Spain and Germany."],
      ["Nobody outside France was influenced by the French reforms", "The Code and the end of feudalism spread."],
      ["The reforms were forgotten as soon as the French army left", "Some reforms lasted."],
    ],
    hints: ["Think of both the reforms and the burdens."],
    explanation: "The Code and the end of feudal dues were attractive to some, but conscription, taxes and foreign troops provoked resistance, which fed nationalism.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Haiti declared its independence from France on 1 January 1804.",
    answer: true,
    explanation: "True. After defeating Napoleon's expedition, the leaders of Saint-Domingue declared independence as Haiti.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Napoleon confirmed the abolition of slavery in the French colonies in 1802.",
    answer: false,
    explanation: "False. He restored slavery in 1802 in colonies such as Guadeloupe and sent an army to Saint-Domingue, where it was defeated.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "All of the Revolution's social changes were reversed after 1815.",
    answer: false,
    hints: ["Think of land, the Code and feudal dues."],
    explanation: "False. The monarchy returned, but feudal dues were not restored, the new owners kept their land and the Code remained.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with his or her connection to the Revolution's impact.",
    pairs: [
      ["Olympe de Gouges", "Wrote a Declaration of the Rights of Woman in 1791"],
      ["Toussaint Louverture", "Leader of the rising of the enslaved in Saint-Domingue"],
      ["Edmund Burke", "British writer who warned against the Revolution in 1790"],
      ["Simón Bolívar", "Leader of independence movements in Spanish America"],
    ],
    explanation: "These figures show the reach of the Revolution's ideas and the reactions to them.",
  });
  {
    const events = [
      "The Declaration of the Rights of Man",
      "The revolt in Saint-Domingue begins",
      "The Convention abolishes slavery in the colonies",
      "Haiti declares independence",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["They run from 1789 to 1804."],
      explanation: "August 1789; August 1791; February 1794; January 1804.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The idea that political authority comes from the people is called {{blank:a}} sovereignty, and the Convention abolished slavery in the colonies in the year {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["popular"], choices: ["popular", "divine", "royal", "imperial"] },
      { id: "b", accepted: ["1794"], choices: ["1789", "1794", "1802", "1815"] },
    ],
    explanation: "Popular sovereignty; slavery was abolished in 1794.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the leader of the rising in Saint-Domingue who was a formerly enslaved man.",
    accepted: ["Toussaint Louverture", "Toussaint L'Ouverture", "Toussaint", "Louverture"],
    wrong: ["Dessalines"],
    explanation: "**Toussaint Louverture**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the changes made by the Revolution to French society.",
    points: ["Feudal dues, the tithe and the legal privileges of the estates were abolished", "All male citizens became equal before the law, and careers were open to talent", "Church lands were sold and the state took over civil records", "Peasants were free of dues and many bought land"],
    modelAnswer: "The Revolution abolished feudal dues, the tithe and the legal privileges of the estates. All male citizens became equal before the law and careers were open to talent. Church lands were sold and the state took over civil records, and peasants were freed from dues and many bought land.",
    explanation: "One mark for each change described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Revolution encouraged nationalism in Europe.",
    points: [["The idea that the nation, not the king, was sovereign, taught people to see themselves as citizens with rights", 2], ["French invasion and occupation, with conscription and taxes, provoked resistance and a sense of national identity, as in Spain and Germany", 2]],
    hints: ["Think of the idea of the nation and of the effect of occupation."],
    modelAnswer: "The Revolution taught that the nation, not the king, was sovereign, so people began to see themselves as citizens with rights. French invasion and occupation, with conscription and taxes, provoked resistance and a sense of national identity, as in Spain and Germany.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Revolution had only limited effects for women and the enslaved.",
    points: [["Equality in 1789 meant legal equality for male citizens, and women were refused the vote and their clubs were banned in 1793", 2], ["Slavery was abolished in 1794 but Napoleon restored it in 1802, so the change was reversed, apart from in Haiti", 2]],
    hints: ["Think of the vote, the clubs and the date 1802."],
    modelAnswer: "Equality in 1789 meant legal equality for male citizens, and women were refused the vote and their clubs were banned in 1793. Slavery was abolished in 1794, but Napoleon restored it in 1802, so the change was reversed, except in Haiti where the enslaved won their freedom.",
    explanation: "Credit explained reasons.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a memoir by a fictional French farmer, written in the 1830s",
        "My father paid dues to the lord and the tithe to the priest, and he never owned the field he worked. After the Revolution we bought a piece of land that had belonged to the Church. The dues ended. Yet bread was dear in the bad years, and the priest and the village were divided for a long time."),
      "",
      source("Source B", "a letter from a fictional English landowner to his brother, 1793",
        "The doctrines of the French threaten every country that has a king and a gentry. Our government is right to watch the societies that meet to talk of the rights of man. If their ideas reach our labourers, we shall have no peace."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What changes does Source A describe?", points: ["Dues and the tithe ended", "The family bought land that had belonged to the Church"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what Sources A and B show about the impact of the Revolution.", points: [["Agree: both show that the Revolution affected ordinary people and the social order", 2], ["Differ: A describes lasting benefits (land, the end of dues) for a peasant family while B fears the spread of dangerous ideas to other countries", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources for a historian studying the impact of the Revolution?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A shows the long-term gains for a peasant family and the continuing divisions over religion, but it was written decades later and one family's experience may not be typical", 2], ["B shows the fear of the Revolution's ideas abroad and government repression of societies, but it is a private opinion from a landowner who has an interest in preserving the old order", 2], ["Own knowledge: peasant land purchases and the Church division, and the British repression of the 1790s, are well recorded, so the two sources show different effects", 2]], modelAnswer: "Source A is useful because it shows a lasting benefit of the Revolution for a peasant family, with the end of dues and the purchase of Church land, which agrees with what we know; it also shows the lasting religious divisions. But it was written in the 1830s and reflects one family, so it may not be typical. Source B shows fear of revolutionary ideas in Britain in 1793 and supports what we know about government watching radical societies, but it comes from a landowner who wished to protect his own position and expresses opinion rather than evidence of what happened. Together they show internal and external effects, though each is limited." }),
    ],
    hints: ["For (c), consider who wrote each source, when and why."],
    explanation: "Both sources are invented: a farmer's memoir and a landowner's letter.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "To what extent did the French Revolution change France?",
    levels: levels(8),
    points: [
      ["Changes: end of feudal dues and estates, legal equality, secularisation of civil life, new administration and measures, land to peasants", 2],
      ["Limits: women and the poor gained little, slavery was restored in 1802, the centralised state continued", 2],
      ["Reversals: Napoleon ended political freedom and the monarchy returned in 1814, though many social changes remained", 2],
      ["A supported judgement on change and continuity", 2],
    ],
    hints: ["Weigh social and legal change against political change."],
    modelAnswer: "The Revolution changed France a great deal in law and society, but less in politics. It ended feudal dues and the privileges of the estates, introduced equality before the law and a uniform administration, secularised civil life and gave many peasants land, and these changes mostly survived the return of the monarchy. But the limits were serious: women gained little, slavery was restored in 1802, and the centralised state continued the work of the monarchy. Napoleon ended political freedom, and the Bourbons returned in 1814. I conclude that the Revolution changed the legal and social order permanently but did not secure lasting political liberty.",
    explanation: "Credit a balanced argument and a supported judgement.",
  });

  b.card("DEFINITION", "What is popular sovereignty?", "The principle that political authority comes from the people, not from a king or a church.");
  b.card("DEFINITION", "What is secularisation?", "The process by which law, records and education become independent of the Church.");
  b.card("FACT", "When did the Convention abolish slavery, and when did Napoleon restore it?", "Abolished 4 February 1794; restored 1802.");
  b.card("FACT", "When did Haiti declare independence?", "1 January 1804, after the defeat of Napoleon's expedition to Saint-Domingue.");
  b.card("FACT", "Who was Toussaint Louverture?", "A formerly enslaved man who became the leading commander in Saint-Domingue after the revolt of 1791.");
  b.card("CONCEPT", "Name three lasting changes the Revolution made in France.", "Legal equality, the end of feudal dues and privileges, and a uniform administration and law.");
  b.card("CONCEPT", "Why did the Revolution give little to women?", "Equality meant male citizens only; women had no vote, and their clubs were banned in 1793.");
  b.card("CONCEPT", "How did the Revolution encourage nationalism?", "It taught that the nation was sovereign, and occupation by France provoked resistance and national feeling.");
  b.card("CONCEPT", "How did other powers respond to the Revolution?", "They feared its example, formed coalitions against France from 1793 and, as in Britain, repressed radical societies.");
});
