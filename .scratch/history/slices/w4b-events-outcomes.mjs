// Slice W4b: the 1848 revolutions in France and the Austrian Empire, failure and results (0470 Option A key question 1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const X = "EXTENDED_RESPONSE";

concept("hist.revolutions-1848.events-outcomes", { file: "revolutions-1848/events-outcomes", keyPrefix: "revolutions-1848.events-outcomes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who was elected President of the French Second Republic in December 1848?",
    options: [
      ["Louis Napoleon Bonaparte", "Correct: he won about three-quarters of the votes on 10 December 1848."],
      ["General Cavaignac", "Cavaignac stood in the election but lost heavily; he had crushed the June Days."],
      ["Louis Philippe", "Louis Philippe was the king overthrown in February 1848."],
      ["Alphonse de Lamartine", "Lamartine led the provisional government but won very few votes in December."],
    ],
    answer: "A",
    explanation: "**Louis Napoleon**, nephew of Napoleon I, was elected president and later became Emperor Napoleon III.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who led the Hungarian national movement in 1848-49?",
    options: [
      ["Lajos Kossuth", "Correct: he led Hungary's fight for self-government and then independence."],
      ["Josip Jelačić", "Jelačić was the governor of Croatia who invaded Hungary for the emperor."],
      ["František Palacký", "Palacký was the Czech historian who led Czech nationalists in Prague."],
      ["Felix Schwarzenberg", "Schwarzenberg was the Austrian chief minister who restored imperial power."],
    ],
    answer: "A",
    explanation: "**Kossuth** led the Hungarian revolution and fled into exile after the surrender of 1849.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What caused the June Days in Paris in 1848?",
    options: [
      ["The closure of the National Workshops", "Correct: the workers who lost their jobs rose in eastern Paris."],
      ["The election of Louis Napoleon as President of the Republic", "The presidential election came later, in December 1848."],
      ["The abdication of King Louis Philippe in February", "The abdication was the February Revolution, months earlier."],
      ["A Prussian invasion of north-eastern France", "There was no foreign invasion of France in 1848."],
    ],
    answer: "A",
    explanation: "Closing the **National Workshops** in June 1848 led to the rising crushed by General Cavaignac.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which country sent an army to help Austria defeat the Hungarians in 1849?",
    options: [
      ["Russia", "Correct: Tsar Nicholas I sent a large army, and the Hungarians surrendered in August 1849."],
      ["France", "French troops intervened in Rome in 1849, not in Hungary."],
      ["Prussia", "Prussia did not intervene in Hungary."],
      ["Britain", "Britain sympathised with the Hungarians but did not send troops."],
    ],
    answer: "A",
    explanation: "**Russian** intervention decided the war; Nicholas I feared revolution spreading to Russian Poland.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which lasting change resulted from the revolution in the Austrian Empire?",
    options: [
      ["The robot (peasant labour service) was abolished", "Correct: it was never restored after 1848."],
      ["A permanent elected parliament for the whole empire", "The assembly was dissolved in 1849 and constitutional rule ended by 1851."],
      ["Full independence for Hungary from 1849 onwards", "Hungary was defeated in August 1849."],
      ["A united Czech state with its capital in Prague", "Windischgrätz crushed the Prague rising in June 1848."],
    ],
    answer: "A",
    explanation: "The abolition of the **robot** in September 1848 freed peasants from labour services permanently.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did many peasants in the Austrian Empire lose interest in the revolution after September 1848?",
    options: [
      ["Their main demand, the end of labour services, had been met", "Correct: once the robot was abolished they had what they wanted."],
      ["They had been given the vote in elections for the Frankfurt Parliament", "This does not explain the loss of interest; their main grievance was labour services."],
      ["The revolutionaries in Vienna had ordered them to return to work", "There was no such order; the change was in what the peasants had gained."],
      ["The Russian army had already occupied their villages in 1848", "Russia did not intervene until 1849, and only in Hungary."],
    ],
    hints: ["What did peasants want most from 1848?"],
    answer: "A",
    explanation: "With the **robot** abolished, peasants had no reason to fight on, which left the city revolutionaries isolated.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How did Hungary's minorities contribute to the defeat of the Hungarian revolution?",
    options: [
      ["Croats and others feared Magyar rule and fought for the emperor", "Correct: Jelačić of Croatia invaded Hungary in September 1848."],
      ["They persuaded the Tsar of Russia to stay neutral in the war", "Russia intervened against Hungary in 1849."],
      ["They voted in a plebiscite to join the Kingdom of Piedmont", "There was no such plebiscite."],
      ["They provided Kossuth with an army larger than the whole Austrian army", "The minorities mostly fought against Kossuth's government."],
    ],
    hints: ["National rivalries could be used by the emperor."],
    answer: "A",
    explanation: "**National rivalries** let Austria use Croats, Serbs and Romanians against the Hungarian government.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why the armies were decisive in the failure of 1848?",
    options: [
      ["Rulers lost their nerve in March, but their armies stayed loyal and later struck back", "Correct: Windischgrätz and Radetzky remained loyal to the emperor."],
      ["The revolutionaries had defeated the regular armies in battle in March 1848", "The March victories came because rulers gave way, not because armies were beaten."],
      ["Most soldiers joined the revolutionaries and fought against the emperor", "Most regular soldiers stayed loyal to the dynasty."],
      ["The armies were disbanded by the new liberal governments set up in the spring of 1848", "The armies were never disbanded."],
    ],
    hints: ["Ask why the revolutions succeeded in March, and whether the armies had been beaten then."],
    answer: "A",
    explanation: "Because the **armies were intact and loyal**, the rulers could recover once divisions weakened the revolutionaries.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "France introduced universal male suffrage in 1848.",
    answer: true,
    explanation: "True. The provisional government gave the vote to all adult men in March 1848.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Franz Joseph became Emperor of Austria when Emperor Ferdinand died in battle in 1848.",
    answer: false,
    explanation: "False. Ferdinand abdicated in December 1848, and his nephew Franz Joseph, aged 18, succeeded him.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in 1848-49.",
    pairs: [
      ["General Cavaignac", "Crushed the June Days in Paris"],
      ["Windischgrätz", "Bombarded Prague and retook Vienna"],
      ["Jelačić", "Governor of Croatia who invaded Hungary"],
      ["Nicholas I", "Russian tsar who sent an army into Hungary"],
    ],
    explanation: "These men helped the forces of order defeat the revolutions.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The June Days in Paris",
      "The Hungarian army surrenders at Világos",
      "Metternich resigns",
      "Louis Napoleon is elected President of France",
    ],
    right: POS,
    rightIndex: [1, 3, 0, 2],
    hints: ["Two events are in 1848 spring and summer; one is December 1848; one is 1849."],
    explanation: "Metternich resigns (March 1848); June Days (June 1848); Louis Napoleon elected (December 1848); Világos (August 1849).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In 1848 the Hungarian Diet passed the {{blank:a}} Laws. The main Hungarian army surrendered at Világos in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["April"], choices: ["April", "Carlsbad", "Corn", "Stadion"] },
      { id: "b", accepted: ["August 1849"], choices: ["June 1848", "December 1848", "August 1849", "March 1850"] },
    ],
    explanation: "The **April Laws** of 1848 gave Hungary its own government; the army surrendered in **August 1849**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the young emperor who succeeded Ferdinand on the Austrian throne in December 1848.",
    accepted: ["Franz Joseph", "Francis Joseph", "Franz Josef", "Franz Joseph I", "Francis Joseph I", "Franz Josef I"],
    wrong: ["Ferdinand"],
    explanation: "**Franz Joseph** reigned from 1848 until 1916.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the events of the revolution in France between February and December 1848.",
    points: [
      "Provisional government (Lamartine, Louis Blanc) proclaimed a republic in February.",
      "Universal male suffrage / National Workshops set up.",
      "April elections returned a moderate majority; the workshops were closed and the June Days were crushed by Cavaignac.",
      "Louis Napoleon elected president on 10 December 1848.",
    ],
    modelAnswer: "After Louis Philippe abdicated in February, a provisional government including Lamartine and Louis Blanc proclaimed a republic. It introduced universal male suffrage and set up National Workshops for the unemployed. The elections of April produced a moderate and conservative assembly, which closed the workshops in June; the workers rose in the June Days and were crushed by General Cavaignac. In December Louis Napoleon Bonaparte was elected president with about three-quarters of the votes.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why Louis Napoleon won the presidential election of December 1848.",
    points: [
      "Identifies the appeal of the Bonaparte name.",
      "Explains that peasants, now voters, remembered Napoleon I's glory and knew little of the other candidates.",
      "Identifies the desire for order after the June Days.",
      "Explains that property owners saw him as a guarantee against socialism and disorder, while Cavaignac was blamed by workers.",
    ],
    hints: ["Think about the new voters and about the fear caused by the June Days."],
    modelAnswer: "Louis Napoleon had the most famous name in France. Universal male suffrage had made millions of peasants voters, and they remembered the glory of Napoleon I and knew little of the other candidates. After the June Days, property owners also wanted order, and they saw Louis Napoleon as a guarantee against socialism, while workers would not vote for Cavaignac, who had crushed them.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why most of the revolutions of 1848-49 failed.",
    points: [
      "Identifies divisions between liberals and workers.",
      "Explains with an example (June Days: the middle class backed the army against the workers).",
      "Identifies national rivalries.",
      "Explains with an example (Croats under Jelačić fought Hungary for the emperor).",
      "Identifies the loyalty of the armies / foreign intervention.",
      "Explains with an example (Windischgrätz retook Prague and Vienna; Russia crushed Hungary).",
    ],
    hints: ["Divisions among the revolutionaries and the strength of their enemies."],
    modelAnswer: "The revolutionaries were divided by class. In France the middle class supported the army when the workers rose in the June Days, because they feared socialism more than they wanted reform. They were also divided by nationality: in Hungary, Croats led by Jelačić fought for the emperor because they feared Magyar rule. Above all, the armies remained loyal. Windischgrätz bombarded Prague and retook Vienna in 1848, and where the army was not strong enough, foreign help arrived: a Russian army forced the Hungarians to surrender in August 1849.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a diary entry by a fictional Paris shopkeeper, 27 June 1848", "Thank God the barricades are down. For three days we heard the cannon from the Faubourg Saint-Antoine. These workers were paid by the Republic to dig holes and fill them again, and they repaid us with rebellion. General Cavaignac has saved property and order. I voted for a republic in February; I did not vote for this.")}\n\n${source("Source B", "a leaflet of the kind printed by radical workers' clubs in Paris, written in July 1848 (author anonymous)", "In February we fought side by side with the shopkeepers. We were promised the right to work. In June they took away our bread and sent the cannon against our homes. The Republic of the rich has shown its face. Thousands of our brothers are dead or in prison.")}`,
    hints: ["Both writers took part in February. What changed their attitude?"],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the attitude of the Paris middle class to the June Days?", points: [
        "Relief that the rising was crushed / support for Cavaignac.",
        "Hostility to the workers and the workshops / fear for property.",
      ], explanation: "Two inferences supported from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the June Days?", points: [
        "Agree: both say workers and the middle class had supported the February revolution.",
        "Agree: both describe the use of cannon / force against the workers.",
        "Disagree: A blames the workers (rebellion, idle work); B blames the government (bread taken away).",
        "Disagree: A sees Cavaignac as a saviour of order; B sees a 'Republic of the rich'.",
      ], explanation: "Points of agreement and disagreement, each supported." }),
      P.manual({ label: "(c)", marks: 6, type: X, stem: "How far do these sources help to explain why the revolution in France did not achieve what the workers wanted? Use the sources and your own knowledge.", points: [
        "Sources show the split between the middle class and workers after February (both sources).",
        "Source B shows the end of the 'right to work' / workshops closed (own knowledge: June 1848).",
        "Source A shows that property owners backed the army and order (own knowledge: conservative assembly elected in April).",
        "Limitations: both one-sided (shopkeeper's fear; radical leaflet's anger); they do not mention peasant voters.",
        "Own knowledge: universal male suffrage gave peasants, who distrusted Paris radicals, a majority; Louis Napoleon elected.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Both sources help to explain the failure because they show the split between the middle class and the workers who had made the February revolution together. Source B shows that the workers wanted the 'right to work', which was ended when the National Workshops closed in June 1848, and Source A shows that shopkeepers and property owners backed Cavaignac and the army to protect order. However, both are one-sided: A is the private view of a frightened shopkeeper and B is a radical leaflet written in anger. Neither mentions the peasants, who were now the majority of voters under universal male suffrage, distrusted the Paris radicals and elected a conservative assembly in April and Louis Napoleon in December. The sources explain the class divisions in Paris well, but my own knowledge is needed to show why the whole country turned against the workers.", explanation: "Uses both sources, evaluates them and adds own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), list what was reversed and what lasted, then decide which matters more."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the revolution in Hungary in 1848-49.", points: [
        "April Laws (1848): Hungary's own government, end of serfdom, free press.",
        "Led by Kossuth; minorities such as the Croats opposed Magyar rule.",
        "Jelačić invaded (September 1848); war with Austria; independence declared April 1849.",
        "Russian intervention; surrender at Világos (August 1849); executions and Kossuth's exile.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: X, stem: "\"The revolutions of 1848 changed nothing.\" How far do you agree with this statement? Explain your answer.", points: [
        ["Agree: absolute rule restored in Austria by 1851; Franz Joseph; Hungary crushed.", 3],
        ["Agree: Louis Napoleon's coup (1851) ended the Second Republic; Italy and Germany still divided.", 2],
        ["Disagree: robot abolished permanently; universal male suffrage restored in France; constitutions in Piedmont and Prussia.", 3],
        ["Disagree: lessons for nationalists (need for armies, diplomacy and a strong state), leading to the unifications.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "In many ways the statement is true. By 1849 the Austrian army had crushed Prague, Vienna, northern Italy and, with Russian help, Hungary, and by the end of 1851 Franz Joseph had abolished the constitution. In France the republic lasted only until Louis Napoleon's coup in December 1851. Italy and Germany were still divided.\n\nHowever, some changes lasted. The robot was never restored, so millions of peasants in the Austrian Empire were freed from labour services. Universal male suffrage, restricted in 1850, was restored by Louis Napoleon and became permanent in France. Piedmont kept its Statuto and Prussia kept a (limited) constitution. Nationalists also learned that speeches and parliaments were not enough; unification in the 1860s came through Piedmontese and Prussian armies and diplomacy.\n\nOverall the revolutions failed in their main aims of liberal constitutions and national unity, so the statement is partly true, but it goes too far: 1848 ended feudal obligations in central Europe and changed the way nationalists worked.", explanation: "Both sides and a supported judgement for the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "National Workshops", "Public works set up in Paris in 1848 to employ the jobless; their closure in June caused the June Days.");
  b.card("FACT", "When were the June Days?", "23-26 June 1848, crushed in Paris by General Cavaignac.");
  b.card("FACT", "When was Louis Napoleon elected President of France?", "10 December 1848, with about three-quarters of the votes.");
  b.card("DEFINITION", "Robot", "Unpaid labour service owed by peasants to landlords in the Austrian Empire; abolished in 1848.");
  b.card("FACT", "Who succeeded Emperor Ferdinand in December 1848?", "His nephew Franz Joseph, aged 18.");
  b.card("FACT", "How did the Hungarian revolution end?", "A Russian army intervened, and the Hungarian army surrendered at Világos in August 1849.");
  b.card("FACT", "Who crushed the Prague rising of June 1848?", "General Windischgrätz, who bombarded the city.");
  b.card("CONCEPT", "Why did most of the 1848 revolutions fail?", "Class and national divisions, loyal armies, peasants satisfied by the end of labour services, foreign intervention and the withdrawal of concessions.");
  b.card("CONCEPT", "What did the 1848 revolutions change?", "End of the robot in Austria, universal male suffrage in France, constitutions in Piedmont and Prussia, and new methods for nationalists.");
});
