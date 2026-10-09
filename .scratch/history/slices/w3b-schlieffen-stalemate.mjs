// Slice W3b: the Schlieffen Plan and the coming of stalemate, 1914 (Cambridge Depth study A, KQ1).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["23 August 1914", "Battle of Mons"],
  ["26-30 August 1914", "Battle of Tannenberg"],
  ["6-12 September 1914", "First Battle of the Marne"],
  ["October-November 1914", "First Battle of Ypres"],
]);

concept("hist.ww1.schlieffen-stalemate", { file: "ww1/schlieffen-stalemate", keyPrefix: "ww1.schlieffen-stalemate" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Through which neutral country did the Schlieffen Plan send the main German attack on France?",
    options: [
      ["Belgium", "Correct: the right wing swept through Belgium to avoid France's frontier forts."],
      ["Switzerland", "Switzerland's mountains made it unsuitable, and it was not invaded."],
      ["Luxembourg", "German troops did occupy Luxembourg, but the great sweep went through Belgium."],
      ["Denmark", "Denmark lies to the north of Germany, far from France."],
    ],
    answer: "A",
    explanation: "The plan's powerful right wing marched through **Belgium**, which brought Britain into the war.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which battle in September 1914 stopped the German advance towards Paris?",
    options: [
      ["The First Battle of the Marne", "Correct: the French and British counter-attack forced the Germans back to the Aisne."],
      ["The Battle of Mons", "Mons (23 August) delayed the Germans but was followed by an Allied retreat."],
      ["The Battle of Tannenberg", "Tannenberg was a German victory over Russia in East Prussia."],
      ["The First Battle of Ypres in Belgium", "First Ypres (October-November) came after the race to the sea."],
    ],
    answer: "A",
    explanation: "The **Marne** (6-12 September 1914) ended the Schlieffen Plan's hope of a quick victory.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Schlieffen Plan assume about Russia?",
    options: [
      ["It would take about six weeks to mobilise", "Correct: this was meant to give Germany time to defeat France first."],
      ["It would stay neutral in a war with France", "The plan existed because Germany expected Russia to fight alongside France."],
      ["It would attack Austria-Hungary, not Germany", "The plan assumed Russia would threaten Germany's eastern border."],
      ["It would mobilise faster than France", "The plan assumed the opposite: France first, Russia much later."],
    ],
    answer: "A",
    explanation: "The plan relied on Russia being **slow**: its poor railways and vast distances were expected to delay mobilisation for weeks.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the British Expeditionary Force in 1914?",
    options: [
      ["A small, professional army sent to France and Belgium", "Correct: it was tiny compared with the conscript armies of the continent."],
      ["A large conscript army of several million men", "Britain did not introduce conscription until 1916."],
      ["The British fleet sent to blockade Germany", "The blockade was carried out by the Royal Navy, not the BEF."],
      ["The huge army of volunteers raised by Lord Kitchener in 1915", "Kitchener's volunteer armies arrived later; the BEF went to France in August 1914."],
    ],
    answer: "A",
    explanation: "The **BEF** was small but highly trained. At Mons it delayed the German First Army.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the 'race to the sea'?",
    options: [
      ["Each side trying to outflank the other to the north", "Correct: the race ended when the lines reached the Channel coast."],
      ["The German navy's dash to attack British ports", "The race to the sea was fought by armies on land."],
      ["The BEF's retreat from Mons to the Channel ports", "The BEF retreated south towards Paris after Mons."],
      ["The evacuation of Belgian refugees to Britain", "Refugees did flee, but that is not what the term means."],
    ],
    answer: "A",
    explanation: "After the Marne both armies kept trying to get round each other's open northern flank until they reached the North Sea.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How did Russia contribute to the failure of the Schlieffen Plan?",
    options: [
      ["Its early invasion of East Prussia drew German troops east", "Correct: Moltke moved troops from the west, weakening the right wing."],
      ["Its troops fought alongside the French at the Marne", "No Russian army fought at the Marne."],
      ["It defeated Germany at Tannenberg", "Germany won the Battle of Tannenberg."],
      ["It blocked the German advance through Belgium", "Russian troops were not in Belgium."],
    ],
    answer: "A",
    hints: ["Think about what Moltke did when Russia attacked earlier than expected."],
    explanation: "Russia invaded East Prussia in mid-August. Troops sent east arrived too late for Tannenberg but were missing from the decisive battle in France.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did railways help the defender more than the attacker in 1914?",
    options: [
      ["Reserves came by train faster than attackers could advance on foot", "Correct: a gap could be plugged before it was exploited."],
      ["Attacking armies were forbidden to use enemy railways", "No such rule existed; retreating armies destroyed lines, which is different."],
      ["Only France and Britain had railways near the front", "Germany had an excellent railway network."],
      ["Trains could carry tanks straight into the front line to break through", "Tanks were not used until 1916."],
    ],
    answer: "A",
    hints: ["Compare how fast an army can march with how fast a train moves."],
    explanation: "Defenders moved reserves by rail behind their own lines; attackers had to march and drag supplies across damaged ground, beyond their railheads.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which change made by Moltke is often said to have weakened the Schlieffen Plan?",
    options: [
      ["Keeping more troops in the south and away from the right wing", "Correct: the sweep through Belgium had fewer men than Schlieffen intended."],
      ["Ordering the army to march through the Netherlands as well", "Moltke decided NOT to go through the Netherlands."],
      ["Deciding to attack Russia first and France second", "The plan still attacked France first."],
      ["Refusing to send any troops at all to East Prussia", "Moltke did send troops east in late August."],
    ],
    answer: "A",
    hints: ["Which part of the army was meant to win the war in the west?"],
    explanation: "Moltke strengthened the left wing in Alsace-Lorraine and kept out of the Netherlands, so the right wing was weaker and squeezed through Belgium. Historians debate how much this mattered compared with the plan's impossible timetable.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "By the end of 1914 trench lines ran from the North Sea coast to the Swiss border.",
    answer: true,
    explanation: "True. The race to the sea and the First Battle of Ypres left no open flank to attack.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Battle of Mons was a decisive British victory that ended the Schlieffen Plan.",
    answer: false,
    explanation: "False. The BEF delayed the Germans at Mons for a day and then retreated. The plan failed at the Marne in September.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in 1914.",
    pairs: [
      ["Alfred von Schlieffen", "Drew up the German plan for a two-front war"],
      ["Helmuth von Moltke", "Commanded the German army in 1914 and changed the plan"],
      ["Joseph Joffre", "French commander who counter-attacked at the Marne"],
      ["Paul von Hindenburg", "German commander at Tannenberg"],
    ],
    explanation: "Schlieffen designed the plan, Moltke carried it out, Joffre stopped it at the Marne, and Hindenburg (with Ludendorff) defeated Russia at Tannenberg.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these battles of 1914 in chronological order.",
    pairs: [order.events[3][1], order.events[0][1], order.events[2][1], order.events[1][1]],
    right: POS,
    rightIndex: [3, 0, 2, 1],
    hints: ["The battle in the east came between Mons and the Marne."],
    explanation: "Mons 23 August; Tannenberg 26-30 August; the Marne 6-12 September; First Ypres October-November.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The ring of Belgian forts that held up the German advance in August 1914 was at {{blank:a}}. The battle of October-November 1914 in which much of Britain's regular army was lost was the First Battle of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Liège"], choices: ["Liège", "Verdun", "Antwerp", "Sedan"] },
      { id: "b", accepted: ["Ypres"], choices: ["Ypres", "the Somme", "Arras", "Cambrai"] },
    ],
    explanation: "The **Liège** forts held out for about twelve days. At the First Battle of **Ypres** the Germans failed to reach the Channel ports.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the Schlieffen Plan.",
    points: [
      "Designed to avoid a long war on two fronts.",
      "Most of the German army would attack France first, through Belgium, sweeping round Paris.",
      "France would be defeated in about six weeks.",
      "Troops would then be moved by rail to fight Russia, which was expected to mobilise slowly.",
    ],
    modelAnswer: "The Schlieffen Plan was designed to stop Germany having to fight France and Russia at the same time. Most of the army would march through Belgium and sweep round Paris to defeat France in about six weeks. Germany would then send its troops east by rail to fight Russia, which was expected to take about six weeks to mobilise.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Schlieffen Plan failed.",
    points: [
      "Identifies Belgian resistance / the BEF.",
      "Explains that Liège and Mons delayed a plan with no time to spare.",
      "Identifies faster Russian mobilisation.",
      "Explains that troops were moved east, weakening the right wing.",
      "Identifies the Battle of the Marne / German exhaustion.",
      "Explains that tired, poorly supplied troops turned east of Paris, exposing their flank to the French and British counter-attack.",
    ],
    hints: ["Think about Belgium, Russia and the Marne."],
    modelAnswer: "The plan depended on a tight timetable, but Belgian resistance at Liège held the Germans up for about twelve days and the BEF delayed them again at Mons. Russia mobilised faster than expected and invaded East Prussia, so Moltke moved troops east, weakening the right wing that was meant to win in France. Finally, the German soldiers were exhausted and short of supplies; their right wing turned to pass east of Paris, exposing its flank, and the French and British counter-attack at the Marne forced them to retreat.",
    explanation: "Two marks for each developed explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why both sides dug trenches by the end of 1914.",
    points: [
      "Identifies defensive firepower (machine guns, rifles, artillery).",
      "Explains that soldiers in the open were cut down, so digging in was the way to survive and hold ground.",
      "Identifies the end of open flanks after the race to the sea.",
      "Explains that with no way round the enemy, armies could only attack head-on, which was extremely costly, so both held their lines.",
    ],
    hints: ["Why could neither side go round the other any more?"],
    modelAnswer: "Machine guns, rifles and artillery made it deadly to stand or advance in the open, so after the Marne the Germans dug in on high ground and the Allies did the same. The race to the sea then took the lines to the Channel coast, so there was no open flank left to get round. Any attack had to be made head-on against prepared positions, which was very costly, so both sides held their trenches.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter home from a fictional German infantryman, early September 1914", "We have marched for nearly three weeks, often forty kilometres a day. My boots are worn through. The field kitchens cannot keep up and we eat what we find in the villages. Every day the officers say Paris is close. Last night we heard that our army is turning east. Nobody knows why.")}\n\n${source("Source B", "a report by a fictional French staff officer to his headquarters, 5 September 1914", "Our airmen report that the enemy columns have changed direction and are passing east of the capital. Their flank is open. The garrison of Paris and the reserves from the railway stations can strike it tomorrow. The men are tired from the retreat, but they know this is the moment.")}`,
    hints: ["In (c), think about each writer's position and purpose."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the condition of the German army in early September 1914?", points: [
        "Soldiers were exhausted from long marches.",
        "Supplies (food, boots) were not keeping up.",
      ], explanation: "Two inferences from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "Using Source B and your own knowledge, explain why the French were able to counter-attack at the Marne.", points: [
        "The German turn east of Paris exposed their flank (Source B).",
        "Air reconnaissance gave the French warning.",
        "Reserves could be moved quickly by rail / from Paris (taxis).",
        "The BEF and French armies were still intact after the retreat; Joffre organised the counter-attack.",
      ], explanation: "Source and own knowledge." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far do Sources A and B together explain why the Schlieffen Plan failed? Use the sources and your own knowledge.", points: [
        "A explains German exhaustion and supply problems; a private letter, honest but limited to one soldier's view.",
        "B explains the French opportunity; an official report written for commanders, likely accurate but focused on one moment.",
        "Together they show the immediate cause: the turn east of Paris and the counter-attack at the Marne.",
        "Missing: Belgian resistance at Liège and the BEF at Mons.",
        "Missing: faster Russian mobilisation and troops moved east; Moltke's changes to the plan.",
        "Missing: the plan's unrealistic timetable and assumptions about Britain and Belgium.",
        "Evaluates the reliability or typicality of the sources.",
        "Supported judgement.",
      ], levels: levels(8), modelAnswer: "Together the sources explain the immediate reasons for failure. Source A, a private letter written at the time, shows that German soldiers were exhausted and their supplies could not keep up; as a letter home it has little reason to exaggerate, though it describes only one soldier's experience. Source B, an official French report written for commanders, shows how the German turn east of Paris exposed their flank and allowed the French to strike with reserves from Paris; an officer reporting to headquarters needed to be accurate, but it covers only one moment. However, the sources leave out other important reasons. Belgian resistance at Liège and the BEF at Mons had already delayed the Germans, and Russia's fast mobilisation led Moltke to move troops east, weakening the right wing. The plan itself was based on an unrealistic timetable and on the hope that Britain would stay out. The sources explain why the plan failed at the Marne, but only partly why it failed overall.", explanation: "Use both sources critically and add own knowledge for the top level." }),
    ],
    explanation: "Practice source-based question (14 marks). Both sources are invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider the Marne, the race to the sea, Ypres and defensive technology."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the race to the sea and the First Battle of Ypres.", points: [
        "After the Marne each side tried to outflank the other to the north.",
        "The lines extended until they reached the Channel coast (October 1914).",
        "At First Ypres (October-November 1914) the Germans tried to break through to the Channel ports.",
        "The Allies held on but the British regular army suffered very heavy losses.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The Battle of the Marne was the main reason why a defensive war had emerged by the end of 1914.\" How far do you agree?", points: [
        ["Marne: ended the war of movement; the Germans dug in on the Aisne.", 2],
        ["Marne: ended hopes of a quick victory, forcing a long war on two fronts.", 2],
        ["Other: race to the sea and Ypres removed the open flanks.", 2],
        ["Other: defensive firepower (machine guns, artillery) made attacks too costly.", 2],
        ["Other: railways, exhaustion and losses of both sides.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The Battle of the Marne was a turning point. By stopping the Germans and forcing them back to the Aisne, it ended the war of movement, and the Germans dug in on high ground. It also ended Germany's hope of a quick victory, so a long war on two fronts became likely.\n\nHowever, the Marne alone did not create the trench lines. After it both sides still had open flanks, and the race to the sea and the First Battle of Ypres were needed before the lines ran unbroken from the sea to Switzerland. Underneath all of this was technology: machine guns, magazine rifles and quick-firing artillery made attacks across open ground so costly that digging in was the natural response. Railways let defenders plug gaps faster than attackers could exploit them, and by late 1914 both sides were exhausted after huge losses.\n\nI partly agree. The Marne was the event that ended the war of movement, but the stalemate was caused mainly by the defensive power of 1914 weapons, which explains why neither side could break the trench lines once they formed.", explanation: "Both sides and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Attrition", "Wearing the enemy down by inflicting more losses of men and resources than he can replace.");
  b.card("DEFINITION", "Stalemate", "A situation in which neither side can defeat the other or break through.");
  b.card("FACT", "What was the aim of the Schlieffen Plan?", "To defeat France in about six weeks through Belgium, then turn east against slowly mobilising Russia.");
  b.card("FACT", "When was the Battle of Mons?", "23 August 1914: the BEF delayed the Germans, then retreated.");
  b.card("FACT", "When was the First Battle of the Marne?", "6-12 September 1914: the German advance on Paris was stopped.");
  b.card("FACT", "What happened at Tannenberg?", "26-30 August 1914: Hindenburg and Ludendorff defeated a Russian army in East Prussia.");
  b.card("FACT", "What was the race to the sea?", "Autumn 1914: each side tried to outflank the other to the north until the lines reached the Channel coast.");
  b.card("CONCEPT", "Give three reasons why the Schlieffen Plan failed.", "Belgian resistance and the BEF caused delays; Russia mobilised faster, so troops went east; exhausted German troops turned east of Paris and were hit at the Marne.");
  b.card("CONCEPT", "Why did the technology of 1914 favour defence?", "Machine guns, rifles and artillery cut down attackers in the open, and railways brought defending reserves faster than attackers could advance.");
});
