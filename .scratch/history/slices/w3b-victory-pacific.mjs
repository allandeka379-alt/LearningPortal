// Slice W3b: the defeat of Japan and the consolidation of victory (Cambridge Depth study E, KQ4).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["August 1942", "US Marines land on Guadalcanal"],
  ["October 1944", "The Battle of Leyte Gulf"],
  ["April 1945", "The invasion of Okinawa"],
  ["August 1945", "The atomic bomb is dropped on Hiroshima"],
]);

concept("hist.ww2.victory-pacific", { file: "ww2/victory-pacific", keyPrefix: "ww2.victory-pacific" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On which city was the first atomic bomb dropped, on 6 August 1945?",
    options: [
      ["Hiroshima", "Correct: Nagasaki was bombed three days later."],
      ["Nagasaki", "Nagasaki was bombed second, on 9 August 1945."],
      ["Tokyo", "Tokyo was devastated by firebombing in March 1945, not by an atomic bomb."],
      ["Okinawa", "Okinawa was invaded by American forces from April 1945."],
    ],
    answer: "A",
    explanation: "**Hiroshima** was bombed on 6 August 1945, Nagasaki on 9 August.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where were leading Nazis tried by an international military tribunal in 1945-46?",
    options: [
      ["Nuremberg", "Correct: the city of the Nazi party rallies was chosen for the trial."],
      ["Tokyo", "Japanese leaders were tried in Tokyo in 1946-48."],
      ["Potsdam", "Potsdam was the conference of Allied leaders in July-August 1945."],
      ["Reims", "Reims is where Germany signed its surrender on 7 May 1945."],
    ],
    answer: "A",
    explanation: "The **Nuremberg** tribunal sat from November 1945 to October 1946.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the American strategy of island-hopping?",
    options: [
      ["Capturing key islands for bases while bypassing strong garrisons", "Correct: bypassed garrisons were cut off from supplies."],
      ["Capturing every Japanese-held island one by one", "Island-hopping deliberately avoided this."],
      ["Landing troops directly on Japan's main home islands as early as 1942", "No landing on Japan's main islands took place."],
      ["Using islands only as hospitals for wounded soldiers", "Islands were captured mainly for airfields and naval bases."],
    ],
    answer: "A",
    explanation: "**Island-hopping** let the Americans move quickly towards Japan, leaving strong points such as Rabaul isolated.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why was the capture of the Marianas in 1944 important?",
    options: [
      ["It put Japan's cities in range of B-29 bombers", "Correct: bases on Saipan, Guam and Tinian were used for raids on Japan."],
      ["It forced the immediate surrender of Japan", "Japan surrendered over a year later."],
      ["It gave the USA the oil of the Dutch East Indies", "The Marianas are in the central Pacific and have no oilfields."],
      ["It ended the war in Burma", "The Burma campaign continued into 1945."],
    ],
    answer: "A",
    explanation: "From the **Marianas**, B-29s could reach Japan's main cities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which event happened between the two atomic bombings?",
    options: [
      ["The Soviet Union declared war on Japan", "Correct: on 8 August 1945, invading Manchuria the next day."],
      ["Germany surrendered to the Allies", "Germany had surrendered in May 1945."],
      ["The Battle of Okinawa began", "Okinawa was invaded on 1 April 1945."],
      ["Japan signed its formal surrender in Tokyo Bay", "The formal surrender was on 2 September 1945."],
    ],
    answer: "A",
    explanation: "**Soviet entry** on 8 August came between Hiroshima (6 August) and Nagasaki (9 August).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Battle of Okinawa influence American thinking about how to end the war?",
    options: [
      ["Its heavy losses suggested an invasion of Japan would be very costly", "Correct: planners feared far greater casualties on the main islands."],
      ["It showed that Japan's government had already decided to surrender", "Japan was still fighting fiercely."],
      ["It proved that the atomic bomb was unnecessary", "Okinawa ended before the bombs were used."],
      ["It was won without any American casualties", "More than 12,000 Americans were killed."],
    ],
    answer: "A",
    hints: ["Think about what Okinawa suggested about fighting on Japanese soil."],
    explanation: "The ferocity of **Okinawa**, including kamikaze attacks and huge civilian deaths, shaped estimates of the cost of invading Japan.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement accurately describes a criticism made of the Nuremberg and Tokyo trials?",
    options: [
      ["They were 'victors' justice', since Allied actions were not judged", "Correct: only the defeated were put on trial."],
      ["They found every defendant innocent", "Most defendants were convicted."],
      ["They were held in neutral Switzerland", "They were held in Germany and Japan."],
      ["They tried ordinary soldiers but none of the political or military leaders", "They tried leading political and military figures."],
    ],
    answer: "A",
    hints: ["Who sat in judgement, and who was judged?"],
    explanation: "Critics argued that the trials judged only the defeated. Supporters saw them as establishing that leaders are personally responsible for atrocities.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which argument is used by historians who question whether the atomic bombs were needed to end the war?",
    options: [
      ["Soviet entry may have been as important in forcing surrender", "Correct: this is one argument in a continuing debate."],
      ["Japan had already signed its formal surrender before Hiroshima", "Japan had not surrendered before Hiroshima."],
      ["The bombs caused very few deaths", "They killed very large numbers of people."],
      ["Japan had no army left by 1945", "Japan still had millions of soldiers in 1945."],
    ],
    answer: "A",
    hints: ["The question asks what one side of the debate argues, not which side is right."],
    explanation: "Critics point to the **Soviet declaration of war**, the blockade and bombing; supporters reply that Japan's army leaders wanted to fight on even after both bombs.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Japan's formal surrender was signed on 2 September 1945 aboard USS Missouri in Tokyo Bay.",
    answer: true,
    explanation: "True. Emperor Hirohito had announced the surrender by radio on 15 August.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "After 1945 Germany was occupied in four zones, while Japan was occupied mainly by American forces.",
    answer: true,
    explanation: "True. Germany was divided among the USA, Britain, France and the USSR; Japan was occupied mainly by the USA under MacArthur.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Harry Truman", "US President who decided to use the atomic bomb"],
      ["Douglas MacArthur", "Commanded the occupation of Japan from 1945"],
      ["Hideki Tojo", "Wartime prime minister sentenced to death at the Tokyo trial"],
      ["Chester Nimitz", "Led the central Pacific advance"],
    ],
    explanation: "Truman made the decision; MacArthur ran occupied Japan; Tojo was tried in Tokyo; Nimitz commanded in the central Pacific.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [order.events[3][1], order.events[1][1], order.events[0][1], order.events[2][1]],
    right: POS,
    rightIndex: [3, 1, 0, 2],
    hints: ["The great naval battle came before the invasion of the island nearest Japan."],
    explanation: "Guadalcanal August 1942; Leyte Gulf October 1944; Okinawa April 1945; Hiroshima August 1945.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The secret Allied programme that built the atomic bomb was the {{blank:a}} Project. Japanese pilots who deliberately crashed their aircraft into Allied ships were called {{blank:b}} pilots.",
    blanks: [
      { id: "a", accepted: ["Manhattan"], choices: ["Manhattan", "Marshall", "Potsdam", "Overlord"] },
      { id: "b", accepted: ["kamikaze"], choices: ["kamikaze", "samurai", "Kempeitai", "shogun"] },
    ],
    explanation: "The **Manhattan** Project developed the bomb; **kamikaze** attacks began in October 1944.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the island in the Solomon Islands where US Marines landed in August 1942, beginning the first major Allied land offensive against Japan.",
    accepted: ["Guadalcanal"],
    wrong: ["Okinawa"],
    explanation: "**Guadalcanal** was fought over from August 1942 until the Japanese withdrew in February 1943.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe how the Allies consolidated their victory in Germany after 1945.",
    points: [
      "Germany divided into four zones (USA, Britain, France, USSR).",
      "Berlin also divided into four sectors.",
      "Aims: demilitarisation, denazification, democratisation; reparations.",
      "Leading Nazis tried at Nuremberg (1945-46): twelve death sentences, three acquittals.",
    ],
    modelAnswer: "Germany was divided into four zones run by the USA, Britain, France and the USSR, and Berlin was also split into four sectors. The Allies aimed to demilitarise, denazify and democratise Germany and to collect reparations. Leading Nazis were tried at Nuremberg in 1945-46; twelve were sentenced to death and three were acquitted.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Allies achieved victory over Japan.",
    points: [
      "Identifies American industrial power.",
      "Explains that the USA built ships, carriers and aircraft far faster than Japan could replace its losses.",
      "Identifies island-hopping and naval victories (Midway, Leyte Gulf).",
      "Explains that bases moved closer to Japan and the Japanese navy was destroyed as a fighting force.",
      "Identifies blockade, bombing, the atomic bombs and Soviet entry.",
      "Explains that Japan was cut off from oil and food, its cities burned, and the shock of August 1945 led the Emperor to accept surrender.",
    ],
    hints: ["Think about production, strategy and the final blows of 1945."],
    modelAnswer: "The USA's industrial power was decisive: it built ships, carriers and aircraft far faster than Japan, which could not replace its losses at Midway and later. Island-hopping let the Americans move quickly towards Japan, and after Leyte Gulf in 1944 the Japanese navy was no longer an effective fighting force. A submarine blockade cut Japan off from oil and food, and firebombing from the Marianas burned its cities. Finally, the atomic bombs on Hiroshima and Nagasaki and the Soviet declaration of war in August 1945 convinced the Emperor to accept surrender.",
    explanation: "Two marks for each developed explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the Allies changed Japan during the occupation.",
    points: [
      "Identifies demilitarisation.",
      "Explains that the army and navy were abolished and the new constitution renounced war.",
      "Identifies political change.",
      "Explains that the Emperor became a symbol without political power, war leaders were purged or tried, and land reform broke up large estates.",
    ],
    hints: ["Think about the armed forces and about the system of government."],
    modelAnswer: "Under MacArthur the Allies demilitarised Japan: the army and navy were abolished and the new constitution of 1947 renounced war. They also changed its politics: the Emperor became a symbol with no political power, war leaders were purged or tried in Tokyo, and land reform broke up large estates, giving land to farmers who worked it.",
    explanation: "Two marks per developed explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "an article by a fictional American veteran of Okinawa, published in a magazine in 1985", "We were training for the invasion of Japan when the news came about the bomb. I won't apologise for the relief we felt. On Okinawa I saw what the Japanese army would do rather than surrender. Every man in my company believed that the bomb saved his life, and I still believe it.")}\n\n${source("Source B", "an essay by a fictional Japanese historian, published in 1995", "By the summer of 1945 Japan's navy was gone, its cities were burning and its people were going hungry. Some of its leaders were already seeking a way to end the war through Moscow. When the Soviet Union declared war, that hope vanished. The bombs were terrible, but Soviet entry may have weighed just as heavily in Tokyo.")}`,
    hints: ["In (c), think about each writer's experience, purpose and date."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Why does the writer of Source A believe the atomic bomb was justified?", points: [
        "It made an invasion of Japan unnecessary.",
        "Okinawa showed that invasion would cost many lives, so it saved soldiers' lives.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B challenge the view in Source A?", points: [
        "Challenges: Japan was already close to defeat (navy gone, cities burning, hunger).",
        "Challenges: some leaders were seeking peace.",
        "Challenges: Soviet entry may have been as important as the bombs.",
        "Does not deny the bombs' role; calls them terrible but part of the explanation.",
      ], explanation: "Specific challenge and limits." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How useful are these sources to a historian studying why Japan surrendered in August 1945? Use the sources and your own knowledge.", points: [
        "A: written forty years later by a veteran; personal experience of Okinawa; shows soldiers' views.",
        "A: limited: did not know Japanese decision-making; strong personal feelings; memory.",
        "B: a historian writing fifty years later with access to evidence; considers several factors.",
        "B: an interpretation; may reflect a particular view; cannot be checked from the extract alone.",
        "Own knowledge: blockade, firebombing, Soviet entry on 8 August, Hiroshima and Nagasaki, the Emperor's intervention.",
        "Own knowledge: Japanese leaders divided; army leaders wanted to fight on even after the bombs.",
        "Compares the usefulness of the two for the question.",
        "Supported judgement.",
      ], levels: levels(8), modelAnswer: "Source A, written forty years later by a veteran of Okinawa, is useful for showing why American soldiers and planners believed an invasion would be very costly, which my knowledge of Okinawa supports. However, the writer could not know how Japanese leaders made their decisions, his feelings are strong and personal, and his memory may have been shaped by later debates. Source B is a historian's interpretation written fifty years later, probably with access to more evidence; it reminds us that Japan was already close to defeat because of the blockade and bombing, that some leaders were seeking peace through Moscow, and that the Soviet declaration of war on 8 August ended that hope. My own knowledge supports this, but also shows that Japan's army leaders wanted to fight on even after both bombs, until the Emperor intervened. Together the sources are useful because they present two sides of the debate, but neither alone explains the surrender. Source B is more useful for explaining the surrender itself, while Source A is more useful for explaining why the USA used the bomb.", explanation: "Both sources evaluated with own knowledge for the top level." }),
    ],
    explanation: "Practice source-based question (14 marks). Both sources are invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), present the debate fairly before reaching your own judgement."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Battle of Okinawa.", points: [
        "American invasion began on 1 April 1945; fighting lasted almost three months.",
        "Okinawa was close to Japan's main islands (about 550 km).",
        "Kamikaze attacks sank or damaged many US ships.",
        "Very heavy casualties: more than 12,000 Americans, tens of thousands of Japanese soldiers and Okinawan civilians.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The atomic bombs were the main reason why Japan surrendered in August 1945.\" How far do you agree?", points: [
        ["Bombs: unprecedented destruction; the Emperor cited a new and cruel bomb when accepting surrender.", 2],
        ["Bombs: gave the peace faction a reason to overrule the army.", 2],
        ["Other: Soviet declaration of war (8 August) ended hopes of Soviet mediation and threatened invasion from the north.", 2],
        ["Other: blockade, firebombing and the destruction of the navy had already crippled Japan.", 2],
        ["Debate: historians disagree on the weight of the bombs versus Soviet entry.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The atomic bombs were very important. They caused destruction on a scale never seen before, killing tens of thousands of people instantly at Hiroshima and Nagasaki. When Emperor Hirohito announced the surrender he referred to the enemy's new and cruel bomb, and the bombs gave those Japanese leaders who wanted peace a reason to overrule the army.\n\nHowever, other factors mattered. The Soviet declaration of war on 8 August, and its invasion of Manchuria, ended Japan's hope that the USSR would help negotiate peace and raised the threat of invasion from the north; some historians argue this weighed as heavily as the bombs. Before August, the American submarine blockade had cut Japan off from oil and food, firebombing had burned most of its cities, and its navy had been destroyed, so Japan could not win. Even so, the army leaders still wanted to fight on.\n\nI partly agree. Japan was already defeated in military terms, and Soviet entry was a crucial shock, but the atomic bombs were the most important immediate reason for the timing of the surrender, because they gave the Emperor the justification to end the war. Historians continue to debate the balance between them.", explanation: "Both sides, the debate and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Island-hopping", "The US strategy of capturing key islands for bases while bypassing and isolating strong Japanese garrisons.");
  b.card("DEFINITION", "Kamikaze", "Japanese pilots who deliberately crashed explosive-laden aircraft into Allied ships, from October 1944.");
  b.card("FACT", "When was Guadalcanal fought?", "August 1942-February 1943: Japan's first major defeat on land.");
  b.card("FACT", "When was the Battle of Okinawa?", "1 April-June 1945.");
  b.card("FACT", "When were the atomic bombs dropped?", "Hiroshima 6 August 1945; Nagasaki 9 August 1945.");
  b.card("FACT", "When did the USSR declare war on Japan?", "8 August 1945, invading Manchuria the next day.");
  b.card("FACT", "When and where did Japan formally surrender?", "2 September 1945, aboard USS Missouri in Tokyo Bay.");
  b.card("CONCEPT", "Give the main views on the decision to use the atomic bomb.", "To end the war quickly and avoid a costly invasion; also, some argue, to impress the USSR; critics say Japan was near defeat and Soviet entry mattered as much.");
  b.card("CONCEPT", "What were the Nuremberg and Tokyo trials?", "International tribunals that tried German (1945-46) and Japanese (1946-48) leaders; supporters saw justice, critics 'victors' justice'.");
});
