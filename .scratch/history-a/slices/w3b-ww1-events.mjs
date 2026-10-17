// W3b: ahist.ww1.events (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.ww1.events", { file: "ww1/events", keyPrefix: "ww1.events" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which battle in September 1914 stopped the German advance on Paris?",
    options: [
      ["The Battle of the Marne", "Correct: it ended the hope of a quick German victory."],
      ["The Battle of the Somme", "The Somme was fought in 1916."],
      ["The Battle of Tannenberg", "Tannenberg was fought on the Eastern Front against Russia."],
      ["The Battle of Jutland", "Jutland was a naval battle fought in 1916."],
    ],
    answer: "A",
    explanation: "At the Marne (5-12 September 1914) the French and British halted the Germans, and the Schlieffen Plan failed.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which German policy led the United States towards war in 1917?",
    options: [
      ["Unrestricted submarine warfare against merchant ships", "Correct: American ships were sunk."],
      ["The invasion of Mexico and the seizure of the Panama Canal", "Germany did not invade Mexico."],
      ["The bombing of American cities by long-range aircraft", "No such bombing took place."],
      ["The occupation of Canada in the spring of 1917", "Germany did not attack Canada."],
    ],
    answer: "A",
    explanation: "Germany resumed unrestricted submarine warfare on 1 February 1917, and with the Zimmermann Telegram this led the United States to declare war on 6 April 1917.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did trench warfare produce a stalemate on the Western Front?",
    options: [
      ["Machine guns and barbed wire made defence stronger than attack", "Correct: attackers suffered heavy losses and gained little ground."],
      ["Both sides had agreed that no battles would be fought in winter", "There was no such agreement."],
      ["The armies had no artillery with which to attack the trenches", "Artillery was used on a massive scale."],
      ["The generals refused to order any attack after the Battle of the Marne", "They ordered many large attacks."],
    ],
    answer: "A",
    hints: ["Think of what stopped infantry attacks."],
    explanation: "Machine guns, barbed wire and artillery gave the defence a great advantage, so attacks cost many lives for small gains.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened to Russia's participation in the war in 1917-18?",
    options: [
      ["The Bolsheviks made peace at Brest-Litovsk in March 1918", "Correct: Russia lost large territories."],
      ["The Tsar signed a peace treaty with Germany in 1916", "The Tsar was still fighting in 1916."],
      ["Russia changed sides and joined the Central Powers in 1917", "Russia did not join Germany."],
      ["Russia won the war on the Eastern Front and occupied Berlin", "Russia was defeated."],
    ],
    answer: "A",
    hints: ["Think of the Bolsheviks' promise of peace."],
    explanation: "After the Bolshevik revolution of November 1917 the new government made peace by the Treaty of Brest-Litovsk on 3 March 1918.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened in German East Africa during the war?",
    options: [
      ["Lettow-Vorbeck fought a guerrilla war until after the armistice", "Correct: he surrendered on 25 November 1918."],
      ["The German colony surrendered within the first month of the war", "Togoland surrendered early, but East Africa resisted to the end."],
      ["The colony was conquered by Portuguese troops from Mozambique", "Portuguese forces took part, but did not conquer it alone."],
      ["The Germans abandoned the colony and left for Europe in 1915", "The Germans fought on."],
    ],
    answer: "A",
    hints: ["Think of the one German commander who never surrendered in 1918."],
    explanation: "Paul von Lettow-Vorbeck, with African askari, fought British, Belgian, Portuguese and South African forces and surrendered in Northern Rhodesia on 25 November 1918.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the purpose of the German attack on Verdun in 1916?",
    options: [
      ["To bleed the French army by making it defend a fortress", "Correct: Falkenhayn hoped to exhaust France."],
      ["To capture Paris before the arrival of American troops", "American troops arrived later and Paris was not the target."],
      ["To cut the British supply line across the English Channel", "Verdun is far from the Channel."],
      ["To draw the Russian army into a battle in the west", "Verdun was against France."],
    ],
    answer: "A",
    hints: ["Think of the aim of exhausting an enemy."],
    explanation: "The German commander Falkenhayn attacked a place France would defend at any cost so as to wear its army down; both sides suffered enormous losses.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the Battle of Jutland (1916) is supported by the evidence?",
    options: [
      ["It was indecisive, and the fleet of Germany mostly stayed in port", "Correct: the British blockade went on."],
      ["It destroyed the British fleet and thereby ended the blockade of Germany", "The British fleet remained in control of the seas."],
      ["It was a land battle in which tanks were first used by Britain", "Jutland was a naval battle."],
      ["It led directly to the entry of the United States into the war", "Jutland was not a cause of the American decision."],
    ],
    answer: "A",
    hints: ["Think of who controlled the sea after the battle."],
    explanation: "Neither fleet was destroyed. Britain kept command of the sea and continued the blockade, and Germany turned to U-boats.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best supports the view that Germany lost the war in 1918 because of the strength of the Allies?",
    options: [
      ["The Allied advance from Amiens in August 1918 with tanks", "Correct: the Allies pushed the Germans back in the Hundred Days."],
      ["The naval mutiny at Kiel at the start of November 1918", "This shows internal collapse, not Allied strength."],
      ["The shortage of food in Germany caused by the long blockade", "This shows pressure on the home front, not battlefield strength."],
      ["The abdication of the Kaiser Wilhelm II on 9 November 1918", "This was a result of defeat."],
    ],
    answer: "A",
    hints: ["Which evidence concerns the Allied armies?"],
    explanation: "The Allied victories from 8 August 1918 show the military strength of the Allies; the other items show Germany's internal collapse or consequences.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The armistice that ended the fighting came into effect on 11 November 1918.",
    answer: true,
    explanation: "True. The armistice signed at Compiègne took effect at 11 am on 11 November 1918.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Tanks were first used by the British on the Western Front in 1916.",
    answer: true,
    explanation: "True. They were first used in September 1916 on the Somme.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Battle of Verdun and the Battle of the Somme in 1916 both produced decisive breakthroughs for the attackers.",
    answer: false,
    hints: ["Think of the ground gained and lost."],
    explanation: "False. Both were battles of attrition with huge losses and little change in the front lines.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each battle or campaign with its front or setting.",
    pairs: [
      ["Tannenberg", "Eastern Front, 1914"],
      ["Gallipoli", "Attempt to force the Dardanelles, 1915-16"],
      ["Jutland", "Naval battle in the North Sea, 1916"],
      ["Passchendaele", "Western Front, July-November 1917"],
    ],
    explanation: "These four events cover the different theatres of the war.",
  });
  {
    const events = [
      "The Battle of the Marne",
      "The sinking of the Lusitania",
      "The United States declares war",
      "The armistice is signed",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are September 1914, May 1915, April 1917 and November 1918."],
      explanation: "Marne, September 1914; Lusitania, 7 May 1915; United States enters, 6 April 1917; armistice, 11 November 1918.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Russia left the war by the Treaty of {{blank:a}} in March 1918, and the {{blank:b}} Telegram helped to bring the United States in.",
    blanks: [
      { id: "a", accepted: ["Brest-Litovsk"], choices: ["Brest-Litovsk", "Versailles", "Trianon", "Sevres"] },
      { id: "b", accepted: ["Zimmermann"], choices: ["Zimmermann", "Ems", "Moltke", "Haig"] },
    ],
    explanation: "Brest-Litovsk (3 March 1918) took Russia out; the Zimmermann Telegram proposed a German alliance with Mexico.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which German commander led a guerrilla campaign in East Africa and surrendered only after the armistice? Give his surname.",
    accepted: ["Lettow-Vorbeck", "von Lettow-Vorbeck", "Lettow Vorbeck", "Paul von Lettow-Vorbeck", "Lettow"],
    wrong: ["Ludendorff"],
    explanation: "**Lettow-Vorbeck**, who surrendered on 25 November 1918 in Northern Rhodesia.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the new weapons and methods used on the Western Front.",
    points: ["Machine guns and barbed wire for defence", "Heavy artillery bombardments before attacks", "Poison gas, first used on a large scale at Ypres in 1915", "Tanks (1916) and aircraft"],
    modelAnswer: "Machine guns and barbed wire made defence strong. Heavy artillery bombardments preceded attacks. Poison gas was first used on a large scale at Ypres in 1915, and tanks and aircraft were introduced from 1916 to break the deadlock.",
    explanation: "One mark for each weapon or method described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the entry of the United States in 1917 helped the Allies to win.",
    points: [["It brought money, food and war materials, so Britain and France could keep fighting despite the U-boat campaign", 2], ["It brought fresh troops in 1918, when Germany's army was exhausted by its spring offensives and could not replace its losses", 2]],
    hints: ["Think of resources and of manpower."],
    modelAnswer: "The United States brought money, food and war materials, so that Britain and France could keep fighting despite the U-boat campaign. It also brought fresh troops in 1918, when Germany's army was exhausted by its spring offensives and could not replace its losses.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the war affected Africa.",
    points: [["German colonies (Togoland, Cameroon, South-West Africa) were conquered, and East Africa saw a long guerrilla war", 2], ["Africans were used as soldiers and, in much larger numbers, as carriers, and many died of disease and hardship; Africans had no choice in a war of European powers", 2]],
    hints: ["Think of the colonies and of the people who served."],
    modelAnswer: "German colonies such as Togoland, Cameroon and South-West Africa were conquered, and German East Africa saw a long guerrilla war. Africans were used as soldiers and, in much larger numbers, as carriers, and many died of disease and hardship, although they had no choice in a war of European powers.",
    explanation: "One mark for each point and one for development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a letter from a fictional British soldier to his mother, July 1916",
        "We went over the top at dawn. The guns had been firing for a week, and we were told that the wire was cut. It was not. Many of the men who were with me are gone. I cannot tell you more, but please do not believe the newspapers when they say it was a great success."),
      "",
      source("Source B", "a recollection told in the 1950s by a fictional African man who had served as a carrier in East Africa",
        "We carried the loads for the soldiers over many weeks. We were not soldiers, but we were fed little, and many of my companions died of sickness. The white officers took us because the government said so. No one asked whether we wished to go."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the Battle of the Somme?", points: ["The bombardment had not cut the wire and the attack failed / heavy losses", "Newspaper reports exaggerated the success"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare Sources A and B as evidence of the experience of war.", points: [["Agree: both show heavy loss of life and criticism of those in authority", 2], ["Differ: A describes a European soldier in battle on the Western Front; B describes an African carrier who suffered from disease and compulsion in East Africa", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources to a historian studying the First World War?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a private letter by a participant, so the writer had no reason to deceive his mother, though he may have been shocked and wrote soon after the battle", 2], ["B was recalled decades later and may be affected by memory and by later views of colonial rule, but it records a part of the war which is poorly documented", 2], ["Own knowledge: the first day of the Somme (1 July 1916) and the use of African carriers are confirmed by other evidence, but the sources show only two individuals' experience", 2]], modelAnswer: "Source A is useful because it is a private letter by a participant, written close to the event, and its account of uncut wire and heavy losses fits what is known about the first day of the Somme. He wrote soon after the battle and may have been shocked, and he describes one place only. Source B is useful because it records the experience of an African carrier, which is a part of the war that official records cover poorly. It was told decades later, so memory and later attitudes to colonial rule may have shaped it. My own knowledge confirms both: the Somme cost the British heavy casualties on the first day, and hundreds of thousands of Africans served as carriers. However, the sources give only two individuals' views, so they must be used with other evidence." }),
    ],
    hints: ["For (c), consider when each source was written and who wrote it."],
    explanation: "Both sources are invented: a soldier's letter and a recollection.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "How far was the entry of the United States the main reason why the Allies won the First World War?",
    levels: levels(8),
    points: [
      ["The United States: money, supplies, troops in 1918, effect on morale; the Zimmermann Telegram and U-boats as causes of entry", 2],
      ["Other factors: the British blockade, the failure of the German spring offensive, tanks and aircraft and better coordination in the Hundred Days", 2],
      ["Germany's weaknesses: collapse of allies, revolution at home, exhaustion", 2],
      ["Judgement on which factor was most important, with a reason", 2],
    ],
    hints: ["Weigh the United States against the blockade and the 1918 campaign."],
    modelAnswer: "The entry of the United States was an important reason, but not the only one. The Americans brought money, food, supplies and, in 1918, fresh troops, while Germany's army was worn down after the spring offensives. But the British blockade had long weakened Germany, the offensives of 1918 failed, and the Allies, with tanks, aircraft and better coordination, advanced from August 1918. Germany's allies also collapsed and revolution broke out at home. I conclude that American entry was a major factor because it ensured that the Allies would outlast Germany, but the combination of the blockade, the German defeat in 1918 and the collapse of Germany's allies was equally important.",
    explanation: "Credit developed factors, links between them and a supported judgement.",
  });

  b.card("DEFINITION", "What was unrestricted submarine warfare?", "The German policy of sinking merchant ships without warning in a war zone; resumed on 1 February 1917.");
  b.card("DEFINITION", "What was total war?", "War in which a state uses all its resources, including industry, workers and propaganda.");
  b.card("FACT", "What was the result of the Battle of the Marne (September 1914)?", "The Germans were halted near Paris and the Schlieffen Plan failed.");
  b.card("FACT", "When did the United States declare war on Germany?", "6 April 1917.");
  b.card("FACT", "When was the Treaty of Brest-Litovsk signed?", "3 March 1918, between the Bolshevik government and the Central Powers.");
  b.card("FACT", "When did the war end?", "The armistice took effect at 11 am on 11 November 1918.");
  b.card("CONCEPT", "Why was there a stalemate on the Western Front?", "Machine guns, barbed wire and artillery made defence stronger than attack, so offensives cost heavy casualties for small gains.");
  b.card("CONCEPT", "How did the war affect Africa?", "German colonies were conquered, East Africa saw a guerrilla war, and Africans served as soldiers and carriers, many dying of disease.");
  b.card("CONCEPT", "Why did Germany lose in 1918?", "American resources, the blockade, the failure of the spring offensive, Allied advances from August, the collapse of allies and revolution at home.");
});
