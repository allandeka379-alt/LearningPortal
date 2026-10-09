// Slice W3b: the war in the Asia-Pacific, 1941-1942 (Cambridge Depth study E, KQ2).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["September 1940", "Japan signs the Tripartite Pact"],
  ["July 1941", "The USA freezes Japanese assets"],
  ["February 1942", "Singapore surrenders"],
  ["June 1942", "The Battle of Midway"],
]);

concept("hist.ww2.asia-pacific", { file: "ww2/asia-pacific", keyPrefix: "ww2.asia-pacific" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date did Japan attack Pearl Harbor?",
    options: [
      ["7 December 1941", "Correct: the USA declared war on Japan the next day."],
      ["11 December 1941", "11 December is when Germany and Italy declared war on the USA."],
      ["15 February 1942", "15 February 1942 is when Singapore surrendered."],
      ["4 June 1942", "4 June 1942 is when the main fighting at Midway took place."],
    ],
    answer: "A",
    explanation: "Pearl Harbor was attacked on the morning of **7 December 1941** (Hawaii time).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which British commander surrendered Singapore in February 1942?",
    options: [
      ["General Percival", "Correct: he surrendered to General Yamashita on 15 February 1942."],
      ["General Yamashita", "Yamashita was the Japanese commander who captured Singapore."],
      ["Admiral Nimitz", "Nimitz commanded the US Pacific Fleet."],
      ["General MacArthur", "MacArthur commanded American forces in the Philippines."],
    ],
    answer: "A",
    explanation: "**Percival** surrendered after the Japanese captured much of the island and its water supply.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did the American oil embargo of 1941 push Japan towards war?",
    options: [
      ["Japan imported most of its oil and its reserves were limited", "Correct: it decided to seize oil in the Dutch East Indies."],
      ["Japan had large oilfields that the USA wanted to capture", "Japan had very little oil of its own."],
      ["The embargo cut off all of Japan's supplies of rice from the USA", "The embargo concerned oil and other strategic goods, not rice."],
      ["Germany ordered Japan to attack the USA", "Germany gave no such order; Japan decided for itself."],
    ],
    answer: "A",
    explanation: "Without imported **oil** Japan's navy and army would grind to a halt, so its leaders chose to seize the resources of Southeast Asia.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which important American targets escaped the attack on Pearl Harbor?",
    options: [
      ["The aircraft carriers, which were at sea", "Correct: they became the core of the US Pacific Fleet."],
      ["The battleships, which were all in dry dock", "Most battleships were moored in the harbour and were hit."],
      ["The aircraft on the airfields, which had been moved", "About 180 aircraft were destroyed."],
      ["The army in the Philippines, which was in Hawaii", "The Philippines were attacked separately."],
    ],
    answer: "A",
    explanation: "The **carriers** were away from Pearl Harbor. With the oil tanks, repair yards and submarine base, they let the USA recover quickly.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What happened to the British warships Prince of Wales and Repulse on 10 December 1941?",
    options: [
      ["They were sunk by Japanese aircraft off Malaya", "Correct: Britain lost control of the seas around Malaya."],
      ["They were sunk at Pearl Harbor", "They were British ships sent to defend Singapore."],
      ["They escaped to Australia", "They were sunk two days after the war in Malaya began."],
      ["They shelled the Japanese invasion fleet into retreat", "They were sunk before they could reach the landings."],
    ],
    answer: "A",
    explanation: "Their loss to **air attack** showed that battleships without air cover were vulnerable, and left Malaya's coast open.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Japan attack Pearl Harbor at the same time as it invaded Southeast Asia?",
    options: [
      ["To stop the US fleet interfering with its conquests", "Correct: Japan expected to seize the resources before the USA could react."],
      ["To capture Hawaii for its oil reserves", "Hawaii had no oil reserves; Japan wanted the Dutch East Indies."],
      ["Because the USA had attacked Japan first", "The USA had not attacked Japan."],
      ["To protect Germany's colonies in the Pacific", "Germany had lost its Pacific colonies in 1914."],
    ],
    answer: "A",
    hints: ["What could the US Pacific Fleet do to Japan's plans in Southeast Asia?"],
    explanation: "Japan aimed to cripple the **US Pacific Fleet** long enough to take and fortify its new empire.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was codebreaking so important at Midway?",
    options: [
      ["Nimitz knew the target and set an ambush with his carriers", "Correct: the Americans were waiting for the Japanese fleet."],
      ["It allowed the USA to sink Japanese ships by radio", "Codebreaking gave information; it could not sink ships."],
      ["It persuaded Japan to call off the attack", "The Japanese attack went ahead."],
      ["It had revealed the Japanese plan to attack Pearl Harbor in advance", "Midway was in June 1942, six months after Pearl Harbor."],
    ],
    answer: "A",
    hints: ["What did the Americans know before the battle?"],
    explanation: "Reading Japanese naval messages, the Americans identified **Midway** as the target, so their three carriers could lie in wait.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which consequence made Midway a long-term turning point rather than just one victory?",
    options: [
      ["Japan lost experienced pilots and four carriers it could not replace", "Correct: American industry could replace losses far faster."],
      ["The USA lost the carrier Yorktown to Japanese attacks during the battle", "This was an American loss, not a reason for the turning point."],
      ["Japan captured Midway island after the battle", "Japan failed to capture Midway."],
      ["Germany declared war on the USA after the battle", "Germany had declared war on 11 December 1941."],
    ],
    answer: "A",
    hints: ["Think about what each side could replace."],
    explanation: "Japan's loss of four **fleet carriers** and skilled aircrew ended its offensive power in the central Pacific; the USA's industrial strength widened the gap from then on.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Germany and Italy declared war on the USA a few days after Pearl Harbor.",
    answer: true,
    explanation: "True. They declared war on 11 December 1941, bringing the USA into the European war as well.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Japanese army that captured Malaya and Singapore greatly outnumbered the British, Indian and Australian defenders.",
    answer: false,
    explanation: "False. The Japanese were outnumbered. They won through control of the air and sea, experience, speed and tactics.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Isoroku Yamamoto", "Japanese admiral who planned Pearl Harbor and Midway"],
      ["Tomoyuki Yamashita", "Japanese general who conquered Malaya and Singapore"],
      ["Chester Nimitz", "US admiral who commanded at the time of Midway"],
      ["Hideki Tojo", "Japanese prime minister from October 1941"],
    ],
    explanation: "Yamamoto planned both naval operations; Yamashita took Singapore; Nimitz won at Midway; Tojo led the government that chose war.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [order.events[2][1], order.events[3][1], order.events[0][1], order.events[1][1]],
    right: POS,
    rightIndex: [2, 3, 0, 1],
    hints: ["The alliance with Germany and Italy came before the economic pressure."],
    explanation: "Tripartite Pact September 1940; assets frozen July 1941; Singapore February 1942; Midway June 1942.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Japan's main reason for invading Southeast Asia was to seize the oil of the {{blank:a}}. Singapore surrendered on {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Dutch East Indies"], choices: ["Dutch East Indies", "Philippines", "Hawaiian Islands", "Malay States"] },
      { id: "b", accepted: ["15 February 1942"], choices: ["15 February 1942", "7 December 1941", "4 June 1942", "25 December 1941"] },
    ],
    explanation: "The **Dutch East Indies** (now Indonesia) had the oil Japan needed. Singapore fell on **15 February 1942**; Hong Kong had fallen on 25 December 1941.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the Japanese attack on Pearl Harbor.",
    points: [
      "7 December 1941, a surprise attack on the US Pacific Fleet in Hawaii.",
      "Planned by Admiral Yamamoto; aircraft from six carriers in two waves.",
      "Eight battleships sunk or damaged; many aircraft destroyed.",
      "About 2,400 Americans killed / the US carriers were at sea and escaped.",
    ],
    modelAnswer: "On the morning of 7 December 1941 Japan launched a surprise attack on the US Pacific Fleet at Pearl Harbor in Hawaii. Planned by Admiral Yamamoto, it used aircraft from six carriers in two waves. Eight battleships were sunk or damaged and about 180 aircraft destroyed, and about 2,400 Americans were killed. The American aircraft carriers were at sea and escaped.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how relations between the USA and Japan deteriorated between 1937 and 1941.",
    points: [
      "Identifies Japan's war in China from 1937.",
      "Explains that the USA condemned Japanese aggression and aided China.",
      "Identifies the Tripartite Pact (1940) / expansion into Indochina.",
      "Explains that alliance with Germany and moves towards Malaya and the Dutch East Indies made the USA see Japan as a threat.",
      "Identifies economic sanctions: assets frozen and oil exports stopped (1941).",
      "Explains that Japan faced a choice between giving up China or seizing oil; talks failed when the USA demanded withdrawal.",
    ],
    hints: ["Think about China, alliances and oil."],
    modelAnswer: "From 1937 Japan's war in China was condemned in the USA, which sent aid to China. In 1940 Japan joined Germany and Italy in the Tripartite Pact and moved into northern Indochina, and in July 1941 into southern Indochina, close to Malaya and the Dutch East Indies, so the USA saw it as part of a hostile, expanding bloc. The USA responded by freezing Japanese assets and stopping oil exports. Japan, which imported most of its oil, now had to choose between giving up its conquests in China or seizing oil elsewhere. When the USA demanded in November 1941 that Japan leave China and Indochina, Japan's leaders chose war.",
    explanation: "Two marks for each developed explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two reasons why the Japanese captured Malaya so quickly.",
    points: [
      "Identifies control of the air and sea.",
      "Explains that the RAF in Malaya was crippled and the capital ships sunk, so the British could not stop landings or attack the advance.",
      "Identifies Japanese tactics and experience.",
      "Explains that experienced troops moved fast (bicycles, jungle, outflanking landings) and repeatedly got behind British positions.",
    ],
    hints: ["Think about the air and sea, and about how the Japanese moved."],
    modelAnswer: "First, Japan quickly gained control of the air and sea: it destroyed much of the RAF in Malaya and sank the Prince of Wales and Repulse, so the British could not stop new landings or attack the Japanese columns. Second, the Japanese troops were experienced and moved fast, using bicycles on the roads, going through jungle and plantations and making small landings along the coast to get behind British positions, forcing repeated retreats.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a radio commentary by a fictional Japanese broadcaster, December 1941", "In a single morning the pride of the American fleet has been sunk at its moorings. The arrogant nation that tried to starve Japan of oil has learned the price of its insults. The road to the southern resources lies open, and the peoples of Asia will soon be free of their Western masters.")}\n\n${source("Source B", "an entry in the diary of a fictional American naval officer at Pearl Harbor, 10 December 1941", "Arizona is gone, Oklahoma is capsized, and the harbour is thick with oil. But the carriers were at sea, and the tank farms and the machine shops were hardly touched. The yards are already working day and night. Every man here wants to hit back.")}`,
    hints: ["In (c), use what you know about what Pearl Harbor did and did not achieve."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "According to Source A, what had the attack on Pearl Harbor achieved?", points: [
        "Destroyed the American battle fleet.",
        "Opened the way for Japan to take the southern resources / free Asia from Western rule.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far does Source B agree with Source A about the effects of the attack?", points: [
        "Agrees: battleships were sunk (Arizona, Oklahoma).",
        "Disagrees: the carriers escaped.",
        "Disagrees: fuel tanks and repair yards survived, so recovery was quick.",
        "Disagrees: the attack made Americans determined to fight back, not humbled.",
      ], explanation: "Specific agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "How far do these two sources show that the attack on Pearl Harbor was a success for Japan? Use the sources and your own knowledge.", points: [
        "A: Japanese propaganda for a home audience; exaggerates; purpose to celebrate and justify war.",
        "A: partly accurate: eight battleships sunk or damaged; Southeast Asia campaign went ahead unhindered.",
        "B: private diary of an eyewitness; no need to persuade; specific details.",
        "B: matches own knowledge: carriers absent, tank farms and yards undamaged, six battleships repaired.",
        "Own knowledge: the attack united the USA and brought it into the war (and Germany's declaration).",
        "Own knowledge: short-term success allowed conquests of Malaya, Singapore and the Dutch East Indies.",
        "Considers the reliability of each source.",
        "Supported judgement.",
      ], levels: levels(8), modelAnswer: "Source A suggests a complete success, but it is Japanese propaganda broadcast to celebrate the attack and justify the war, so it exaggerates. It is partly accurate: eight battleships were sunk or damaged, and the US fleet could not interfere as Japan conquered Malaya, Singapore and the Dutch East Indies in the following months. Source B is a private diary written by an eyewitness three days later, with no need to persuade anyone, and its details match my knowledge: the carriers were at sea, the oil storage tanks and repair yards survived, and six of the eight battleships were later repaired. It also shows the anger that united Americans behind the war; the USA declared war the next day and Germany declared war on the USA on 11 December. Together the sources show that Pearl Harbor was a short-term tactical success but, as Source B suggests, a strategic failure that brought into the war an enemy Japan could not defeat.", explanation: "Both sources evaluated and own knowledge for the top level." }),
    ],
    explanation: "Practice source-based question (14 marks). Both sources are invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), consider Coral Sea and Guadalcanal as well as Midway."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Battle of Midway.", points: [
        "Fought 4-7 June 1942 near Midway island in the central Pacific.",
        "American codebreakers identified the target; Nimitz set an ambush with three carriers.",
        "US dive-bombers hit the Japanese carriers while they were rearming.",
        "Japan lost four fleet carriers; the USA lost the Yorktown.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"Midway was the turning point of the war in the Pacific.\" How far do you agree?", points: [
        ["Midway: four fleet carriers and experienced crews lost; Japan's offensive power broken.", 2],
        ["Midway: Japan on the defensive afterwards; initiative passed to the USA.", 2],
        ["Other: Coral Sea (May 1942) had already stopped the move on Port Moresby.", 2],
        ["Other: Guadalcanal (1942-43) was the first land defeat and a long battle of attrition.", 2],
        ["Other: US industrial power meant Japan was likely to lose eventually; Pearl Harbor's failure to hit carriers.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "Midway has a strong claim to be the turning point. In one day Japan lost four of its fleet carriers, together with experienced pilots and mechanics it could not replace. Its expansion in the central Pacific stopped, and from then on it was mainly on the defensive, while the USA took the initiative.\n\nHowever, other events also mattered. A month earlier the Battle of the Coral Sea had stopped the Japanese advance towards Port Moresby, showing that Japan could be checked. After Midway the long struggle for Guadalcanal, from August 1942 to February 1943, was the first Japanese defeat on land and wore down its aircraft, ships and pilots. More fundamentally, American industry could out-build Japan many times over, so once Pearl Harbor failed to destroy the carriers, Japan was always likely to lose a long war.\n\nI largely agree. Midway was the battle that ended Japan's ability to attack, but it was part of a wider turn in the war that included Coral Sea and Guadalcanal and rested on American industrial power.", explanation: "Both sides and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Embargo", "An official ban on trade in certain goods with a country, such as the US oil embargo on Japan in 1941.");
  b.card("DEFINITION", "Greater East Asia Co-Prosperity Sphere", "Japan's planned empire in Asia, presented as liberation from Western rule but run in Japan's interests.");
  b.card("FACT", "When did Japan attack Pearl Harbor?", "7 December 1941.");
  b.card("FACT", "When did Singapore surrender, and to whom?", "15 February 1942; Percival surrendered to Yamashita.");
  b.card("FACT", "When was the Battle of Midway?", "4-7 June 1942.");
  b.card("FACT", "What was the Tripartite Pact?", "September 1940 alliance of Germany, Italy and Japan.");
  b.card("CONCEPT", "Why was Pearl Harbor a strategic failure for Japan?", "The US carriers, fuel tanks and yards survived, most battleships were repaired, and the attack united the USA for war.");
  b.card("CONCEPT", "Why did Japan capture Malaya and Singapore so quickly?", "Control of the air and sea, experienced and fast-moving troops, and poorly trained and equipped British forces.");
  b.card("CONCEPT", "Why was Midway a turning point?", "Japan lost four fleet carriers and skilled aircrew, ending its offensive power; US industry could replace losses far faster.");
});
