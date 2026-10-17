// W3b: ahist.germany.revolutions-1848-49 (Both boards; Cambridge key question 2.2, first part).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.germany.revolutions-1848-49", { file: "germany/revolutions-1848-49", keyPrefix: "germany.revolutions-1848-49" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Austrian statesman resigned and fled from Vienna on 13 March 1848?",
    options: [
      ["Prince Metternich, the Austrian chancellor", "Correct: he had become the symbol of repression."],
      ["Prince Schwarzenberg, later head of the government", "Schwarzenberg came to power after the revolution had begun."],
      ["Otto von Bismarck, then a Prussian landowner and politician", "Bismarck was not an Austrian and held no office in Vienna."],
      ["Emperor Franz Joseph, who had just come to the throne", "Franz Joseph became emperor only in December 1848."],
    ],
    answer: "A",
    explanation: "Metternich resigned on 13 March 1848 after fighting in Vienna and went into exile in England.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Where did the Frankfurt Parliament meet when it opened on 18 May 1848?",
    options: [
      ["St Paul's Church in Frankfurt, the Diet's city", "Correct: the church became the home of the Parliament."],
      ["The royal palace in Berlin", "The Parliament was not held in a royal palace."],
      ["The Hofburg in Vienna", "Vienna was the scene of revolution but not the seat of the Parliament."],
      ["The town hall in Hambach, site of the 1832 festival", "Hambach was the site of an earlier festival."],
    ],
    answer: "A",
    explanation: "The National Assembly met in St Paul's Church in Frankfurt, the seat of the old Federal Diet.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the March revolutions in Berlin make Friedrich Wilhelm IV give way?",
    options: [
      ["He feared more bloodshed after the fighting at the barricades in Berlin", "Correct: he withdrew the troops and promised reforms."],
      ["He believed his army in Berlin had been defeated", "The army left the city but was not defeated, and later regained control."],
      ["He wished to become the leader of a republic with a wide franchise", "He never sought a republic."],
      ["He had been ordered by Austria to grant a constitution", "Austria was itself in the midst of revolution."],
    ],
    answer: "A",
    explanation: "After street fighting, the king withdrew his troops, paid respect to the dead, appointed liberal ministers and called an assembly, but kept the loyalty of the army.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Who were most of the members of the Frankfurt Parliament?",
    options: [
      ["Educated men such as lawyers, professors and civil servants", "Correct: workers and peasants were scarcely represented."],
      ["Peasants and farm workers chosen by their village councils", "Few peasants were deputies."],
      ["Princes and great nobles named by the Diet of the Confederation", "The deputies were elected, not named by the Diet."],
      ["Army officers chosen by the Prussian and Austrian generals themselves", "Officers were few; the Parliament had no army."],
    ],
    answer: "A",
    explanation: "The deputies were overwhelmingly middle-class and educated, which is why the Parliament was sometimes called a Professors' Parliament.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the difference between the Grossdeutsch and Kleindeutsch plans?",
    options: [
      ["The first would include Austria in the new state; the second would exclude it", "Correct: the choice was Austria's inclusion or exclusion."],
      ["The first would be a republic, and the second a monarchy ruled by an emperor", "Both plans were about territory, not the form of government."],
      ["The first would include Prussia in the state, and the second would exclude Prussia", "Neither plan excluded Prussia."],
      ["The first was supported by the princes, and the second by the working class", "The division was over Austria, not between classes."],
    ],
    answer: "A",
    hints: ["Which great power was the problem?"],
    explanation: "Grossdeutsch meant including Austria's German lands; Kleindeutsch meant a state without Austria under Prussian leadership.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened on 3 April 1849?",
    options: [
      ["Friedrich Wilhelm IV refused the imperial crown offered to him", "Correct: the refusal ended hopes for the Frankfurt constitution."],
      ["Friedrich Wilhelm IV accepted the crown as emperor", "He did not accept; he declined the crown."],
      ["The Parliament dissolved itself and gave power to the Diet", "The Parliament was dispersed later, in June."],
      ["Austrian troops entered Frankfurt and arrested the deputies", "The Parliament was dispersed by Württemberg soldiers at Stuttgart in June."],
    ],
    answer: "A",
    hints: ["Think of the offer made in late March."],
    explanation: "The Parliament had offered the crown on 28 March; Friedrich Wilhelm IV declined it on 3 April 1849, which deprived the constitution of any ruler to enforce it.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement is the best explanation of why the conservatives regained control?",
    options: [
      ["The armies stayed loyal and the revolutionaries were divided among themselves", "Correct: the two factors reinforced each other."],
      ["The princes never conceded anything, so there was no revolution", "The princes did concede in March 1848."],
      ["Britain sent troops to restore the rulers of Austria and Prussia", "Britain did not intervene militarily."],
      ["The peasants all joined the workers in a united republican army", "Peasants largely withdrew once dues were abolished."],
    ],
    answer: "A",
    hints: ["Think of who held the weapons, and who agreed with whom."],
    explanation: "The rulers' armies stayed loyal and could be used once the first panic had passed, while liberals, democrats, workers and peasants did not unite behind common aims.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best supports the view that the Frankfurt Parliament was weak because it lacked power?",
    options: [
      ["It depended on the princes' armies to carry out its decisions", "Correct: without its own forces it could not enforce its will."],
      ["It spent much of its time debating a long list of basic rights", "This shows a lack of urgency but not a lack of power."],
      ["Its deputies came mainly from the educated middle class and professions", "This shows narrow support but not a lack of power."],
      ["It elected an Austrian archduke to act as the imperial regent", "This was an arrangement, not evidence of weakness in itself."],
    ],
    answer: "A",
    hints: ["Which evidence shows what the Parliament could not do?"],
    explanation: "The Parliament had no army, no revenue and no administration, so in Schleswig-Holstein and in 1849 it depended on the force of rulers who did not support it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Heinrich von Gagern was the first president of the Frankfurt Parliament.",
    answer: true,
    explanation: "True. He presided over the early work of the Parliament.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Frankfurt Parliament commanded its own army, which it used to defend the constitution.",
    answer: false,
    explanation: "False. It had no army and relied on forces controlled by the princes, which is one reason for its failure.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The peasants played a large part in the revolutions of 1849 because they wanted a united republic.",
    answer: false,
    hints: ["What had the peasants gained in spring 1848?"],
    explanation: "False. Most peasants were satisfied by the end of feudal dues in 1848 and took little part in the political struggles of 1849.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in 1848-49.",
    pairs: [
      ["Friedrich Wilhelm IV", "King of Prussia who refused the imperial crown"],
      ["Archduke John", "Imperial regent chosen by the Parliament"],
      ["Windischgrätz", "General who crushed risings in Prague and Vienna"],
      ["Robert Blum", "Radical deputy shot in Vienna in November 1848"],
    ],
    explanation: "These four people appear in most answers on 1848-49.",
  });
  {
    const events = [
      "Metternich resigns in Vienna",
      "The Frankfurt Parliament opens",
      "Friedrich Wilhelm IV refuses the crown",
      "The rump Parliament is dispersed at Stuttgart",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 13 March 1848, 18 May 1848, 3 April 1849 and 18 June 1849."],
      explanation: "13 March 1848; 18 May 1848; 3 April 1849; 18 June 1849.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Frankfurt Parliament opened in {{blank:a}} and offered the imperial crown to {{blank:b}} of Prussia in 1849.",
    blanks: [
      { id: "a", accepted: ["May 1848"], choices: ["March 1848", "May 1848", "October 1848", "June 1849"] },
      { id: "b", accepted: ["Friedrich Wilhelm IV"], choices: ["Friedrich Wilhelm IV", "Wilhelm I", "Franz Joseph", "Ferdinand"] },
    ],
    explanation: "The Parliament opened on 18 May 1848; the crown was offered to Friedrich Wilhelm IV on 28 March 1849.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Austrian field marshal's victories in northern Italy in 1848-49 helped the Habsburgs recover? Give his surname.",
    accepted: ["Radetzky", "Josef Radetzky", "Joseph Radetzky", "Count Radetzky"],
    wrong: ["Windischgrätz"],
    explanation: "**Radetzky**, who defeated Piedmont at Custoza (1848) and Novara (1849).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how revolution spread in the German states in March 1848.",
    points: ["News of revolution in Paris reached the German states in late February", "Mass meetings demanded a free press, a militia and a German parliament", "Rulers appointed liberal March ministries", "Metternich resigned in Vienna and fighting in Berlin forced the king to withdraw his troops"],
    modelAnswer: "News of the revolution in Paris reached the German states in late February. Mass meetings demanded a free press, a militia and a German parliament. Rulers gave way and appointed liberal ministers. In Vienna Metternich resigned on 13 March, and in Berlin fighting forced the king to withdraw his troops.",
    explanation: "One mark for each stage described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Friedrich Wilhelm IV refused the crown offered by the Frankfurt Parliament in April 1849.",
    points: [["He believed a crown should come from the princes and not from an elected assembly, which in his view had no right to give it", 2], ["He feared that accepting would cause war with Austria and perhaps with Russia, and that it would bind him to a liberal constitution", 2]],
    hints: ["Think of the source of the offer and the risks."],
    modelAnswer: "He believed that a crown should come from the princes, not from an elected assembly that had no right to give it. He also feared that accepting would cause war with Austria and perhaps Russia, and that it would bind him to a liberal constitution.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how divisions among the revolutionaries helped the conservatives.",
    points: [["Liberals feared the democrats and workers, so they relied on the princes and armies to restore order", 2], ["Nationalists disagreed over Grossdeutsch and Kleindeutsch and the peasants, satisfied by reforms, withdrew, so there was no united force", 2]],
    hints: ["Think of liberals against democrats, and of nationalist disputes."],
    modelAnswer: "Liberals feared the democrats and workers, so they relied on the princes and armies to restore order. Nationalists disagreed about whether Austria should be included, and the peasants, satisfied by reforms, withdrew, so there was no united force to resist the princes.",
    explanation: "One mark for each division and one for explaining its effect.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter by a fictional member of the Frankfurt Parliament to his wife, June 1848",
        "We debate for hours on the rights of citizens and on the frontiers of the Fatherland. Today there was argument about whether Austria belongs to us. Meanwhile no one asks how we shall make the princes obey. We have speeches in abundance, but we have not a single regiment."),
      "",
      source("Source B", "a diary entry by a fictional officer in the Prussian army, December 1848",
        "The king has dissolved the assembly and the troops are back in the capital. The citizens did not resist. The talk of freedom in the spring was louder than the will to defend it, and the soldiers of the army were never in doubt where their duty lay."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the weakness of the Parliament?", points: ["It spent time in debate on rights and frontiers", "It had no army to make the princes obey"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare Sources A and B as evidence of why the revolutions failed.", points: [["Agree: both suggest that revolutionary talk was not supported by force, and that the princes held the real power", 2], ["Differ: A concerns the Parliament's lack of an army and its divisions; B concerns the loyalty of the Prussian army and the reaction of the citizens", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the failure of the 1848 revolutions?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a private letter from a participant who knew the Parliament and had no reason to deceive his wife, but it expresses one deputy's frustration and may exaggerate", 2], ["B comes from a Prussian officer whose loyalty to the king may shape his judgement of the citizens' will; it shows the army's reliability, which other evidence supports", 2], ["Own knowledge: the lack of an army, divisions over Austria and the loyalty of the armies are all confirmed, but neither source mentions the king's refusal of the crown or the peasants' withdrawal", 2]], modelAnswer: "Source A is useful because it is a private letter from a participant, so the writer had little reason to deceive, and its complaint that the Parliament had no regiment is borne out by what happened. It is one deputy's view and may exaggerate his frustration. Source B is useful because it shows that the army was reliable and that the citizens did not resist after the spring. As an officer loyal to the king, the writer may have underestimated the will to resist. My own knowledge supports both on the lack of an army and the armies' loyalty, but neither mentions the king's refusal of the crown in 1849 or the withdrawal of the peasants, so the sources give a partial picture." }),
    ],
    hints: ["For (c), consider who wrote each source and what they leave out."],
    explanation: "Both sources are invented: a letter and a diary entry.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "To what extent did the revolutions of 1848-49 fail because of the weaknesses of the Frankfurt Parliament?",
    levels: levels(8),
    points: [
      ["Weaknesses of the Parliament: no army or revenue, slow debates, a narrow social base, disputes over Austria and Schleswig-Holstein", 2],
      ["Strength of the conservatives: loyal armies, Windischgrätz and Radetzky, the recovery of Austria, the king's refusal", 2],
      ["Divisions among the revolutionaries: liberals against democrats, workers and peasants", 2],
      ["Judgement on which was more important, with a reason", 2],
    ],
    hints: ["Weigh the Parliament's weaknesses against the strength of its opponents."],
    modelAnswer: "The weaknesses of the Frankfurt Parliament were an important reason for the failure, but the strength of the conservatives was more fundamental. The Parliament had no army or revenue, debated for months while the rulers recovered, was divided over Grossdeutsch and Kleindeutsch plans and depended on Prussia in Schleswig-Holstein. Its members were also mostly from the educated middle class, with little support among peasants and workers. But the conservatives were strong: the armies were loyal, Windischgrätz retook Vienna and Radetzky won in Italy, Austria recovered, and the king refused the crown. Revolutionary divisions were also serious, since liberals feared democrats. I conclude that the Parliament's weaknesses made failure likely, but the loyalty of the armies and the recovery of Austria and Prussia made it certain.",
    explanation: "Credit developed factors, links between them and a supported judgement.",
  });

  b.card("DEFINITION", "What was the Frankfurt Parliament?", "The National Assembly that met in St Paul's Church from 18 May 1848 to draw up a constitution for a united Germany.");
  b.card("DEFINITION", "What is the difference between Grossdeutsch and Kleindeutsch?", "Grossdeutsch included Austria's German lands in the new state; Kleindeutsch excluded Austria and was led by Prussia.");
  b.card("FACT", "When did Metternich resign?", "13 March 1848, in Vienna; he fled to England.");
  b.card("FACT", "What happened in Berlin on 18-19 March 1848?", "Street fighting at the barricades led Friedrich Wilhelm IV to withdraw his troops and promise reforms.");
  b.card("FACT", "What happened on 3 April 1849?", "Friedrich Wilhelm IV refused the imperial crown offered by the Frankfurt Parliament.");
  b.card("FACT", "How did the Frankfurt Parliament end?", "Its rump moved to Stuttgart and was dispersed by Württemberg troops on 18 June 1849.");
  b.card("CONCEPT", "Why did the Frankfurt Parliament fail?", "It had no army or revenue, was divided over Austria and over Schleswig-Holstein, and the Prussian king refused the crown.");
  b.card("CONCEPT", "Why did the conservatives regain control?", "The armies stayed loyal, Austria recovered, and the revolutionaries (liberals, democrats, workers, peasants) were divided.");
  b.card("CONCEPT", "What was the lasting impact of the 1848 revolutions?", "A Prussian constitution, the abolition of feudal dues, the lesson that unity needed power, and exile for many liberals.");
});
