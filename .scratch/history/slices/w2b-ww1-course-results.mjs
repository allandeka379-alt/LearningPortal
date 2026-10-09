// Slice W2b: the First World War, course and results, overview (ZIMSEC 12.1).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.ww1.course-results", { file: "ww1/course-results", keyPrefix: "ww1.course-results" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "At what time and date did the armistice that ended the fighting of the First World War take effect?",
    options: [
      ["11 a.m. on 11 November 1918", "Correct: the armistice was signed earlier that morning at Compiègne."],
      ["Noon on 28 June 1919", "28 June 1919 is when the Treaty of Versailles was signed."],
      ["Midnight on 3 March 1918", "3 March 1918 is the date of the Treaty of Brest-Litovsk with Russia."],
      ["11 a.m. on 25 November 1918", "25 November 1918 is when Lettow-Vorbeck surrendered in Africa."],
    ],
    answer: "A",
    explanation: "The **armistice** took effect at 11 a.m. on 11 November 1918.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which battle in September 1914 halted the German advance on Paris?",
    options: [
      ["The Marne", "Correct: the Schlieffen Plan failed here."],
      ["The Somme", "The Somme was a British-led offensive in 1916."],
      ["Tannenberg", "Tannenberg was a German victory over Russia in August 1914."],
      ["Jutland", "Jutland was a naval battle in 1916."],
    ],
    answer: "A",
    explanation: "The Battle of the **Marne** stopped the Germans, after which both sides dug trenches.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did a stalemate develop on the Western Front?",
    options: [
      ["Machine guns and wire favoured the defenders", "Correct: attackers crossing open ground were cut down."],
      ["Both sides agreed to stop fighting until 1918", "There was no such agreement; fighting continued."],
      ["The armies ran out of soldiers by the end of 1914", "Both sides raised millions more soldiers."],
      ["The USA blocked any advance by either side", "The USA was neutral until 1917."],
    ],
    answer: "A",
    explanation: "Machine guns, barbed wire and artillery made attacks very costly, so neither side could break through.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the aim of the Allied landings at Gallipoli in 1915?",
    options: [
      ["To knock the Ottoman Empire out of the war", "Correct: and open a sea route to Russia."],
      ["To invade Germany from the south", "Gallipoli is in Turkey, far from Germany."],
      ["To capture the German colonies in East Africa", "Gallipoli is in Turkey and had nothing to do with East Africa."],
      ["To rescue the Russian royal family", "This was never an aim of the campaign."],
    ],
    answer: "A",
    explanation: "The Allies hoped to take Constantinople, defeat the **Ottoman Empire** and open a supply route to Russia.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who led the German forces in East Africa during the First World War?",
    options: [
      ["Paul von Lettow-Vorbeck", "Correct: he surrendered only on 25 November 1918."],
      ["Erich Ludendorff", "Ludendorff was a German commander in Europe."],
      ["Field Marshal Paul von Hindenburg", "Hindenburg commanded in the east and later the whole German army."],
      ["Alfred von Schlieffen", "Schlieffen drew up the plan for the war in the west and died in 1913."],
    ],
    answer: "A",
    explanation: "**Lettow-Vorbeck** led a long guerrilla campaign with African askari and surrendered in Northern Rhodesia after the armistice.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the USA declare war on Germany in April 1917?",
    options: [
      ["German U-boats sank American ships without warning", "Correct: together with the Zimmermann Telegram."],
      ["Germany had invaded the United States through Canada", "Germany never invaded North America."],
      ["The Russian Tsar asked the USA to replace Russia", "The USA did not enter at the Tsar's request."],
      ["The League of Nations ordered the USA to fight", "The League did not exist until 1920."],
    ],
    answer: "A",
    hints: ["Think about what Germany resumed in February 1917."],
    explanation: "Germany's return to **unrestricted submarine warfare** and the Zimmermann Telegram, which proposed a German alliance with Mexico, brought the USA in.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why were African carriers so important in the East African campaign?",
    options: [
      ["Few roads or railways existed for supplies", "Correct: almost everything was carried on foot."],
      ["Europeans were forbidden to carry weapons in Africa", "No such rule existed."],
      ["Carriers did most of the fighting in the trenches", "Carriers transported supplies; they were not the main fighting troops."],
      ["Horses and mules were banned by the armistice", "The campaign was fought mostly before the armistice; disease killed many animals."],
    ],
    hints: ["Think about the landscape and transport in East Africa."],
    answer: "A",
    explanation: "With few roads and railways, and with disease killing pack animals, armies depended on African carriers, very many of whom died.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of these was a long-term political RESULT of the war rather than an event during it?",
    options: [
      ["Four empires collapsed and new states formed", "Correct: it redrew the map of Europe and the Middle East."],
      ["The Lusitania was sunk by a U-boat in May 1915", "This was an event during the war, not a result of it."],
      ["Tanks were used for the first time on the Somme", "This was a military development during the war."],
      ["German South West Africa surrendered in 1915", "This was a campaign event of 1915, not a long-term result."],
    ],
    answer: "A",
    hints: ["Choose a result, not an event of the war."],
    explanation: "The fall of the German, Austro-Hungarian, Russian and Ottoman empires created new states and new tensions that shaped the next twenty years.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Italy fought on the side of the Allies from 1915.",
    answer: true,
    explanation: "True. Italy joined the Allies in May 1915.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Battle of Jutland destroyed the British navy and ended the blockade of Germany.",
    answer: false,
    explanation: "False. Jutland (1916) was indecisive; the British blockade continued and the German surface fleet stayed mostly in port.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event with its front or theatre of war.",
    pairs: [
      ["Battle of Tannenberg", "Eastern Front"],
      ["Battle of Verdun", "Western Front"],
      ["Surrender at Abercorn, Northern Rhodesia", "East Africa"],
      ["ANZAC landings", "Gallipoli"],
    ],
    explanation: "Tannenberg (east), Verdun (west), Lettow-Vorbeck's surrender (East Africa), ANZAC landings (Gallipoli).",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The USA declares war on Germany",
      "The Battle of the Somme begins",
      "German South West Africa surrenders",
      "The Treaty of Brest-Litovsk",
    ],
    right: POS,
    rightIndex: [2, 1, 0, 3],
    hints: ["South West Africa fell in 1915."],
    explanation: "South West Africa July 1915; Somme July 1916; USA April 1917; Brest-Litovsk March 1918.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The German plan to defeat France quickly by going through Belgium was the {{blank:a}} Plan. Russia left the war after signing the Treaty of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Schlieffen"], choices: ["Schlieffen", "Dawes", "Young", "Marshall"] },
      { id: "b", accepted: ["Brest-Litovsk"], choices: ["Brest-Litovsk", "Versailles", "Trianon", "Locarno"] },
    ],
    explanation: "The **Schlieffen** Plan failed in 1914; Russia made peace at **Brest-Litovsk** in March 1918.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the British passenger liner sunk by a German U-boat in May 1915.",
    accepted: ["Lusitania", "the Lusitania", "RMS Lusitania"],
    wrong: ["Titanic"],
    explanation: "The sinking of the **Lusitania** killed over a thousand people, including Americans, and angered the USA.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the war in Africa during the First World War.",
    points: [
      "Togoland and Kamerun were captured by British and French forces (1914-1916).",
      "German South West Africa surrendered to South African forces (1915).",
      "In East Africa Lettow-Vorbeck fought a long guerrilla campaign, surrendering after the armistice (November 1918).",
      "Africans served as soldiers (askari, Rhodesia Native Regiment) and very many as carriers, of whom very many died.",
    ],
    modelAnswer: "British and French forces took Togoland in 1914 and Kamerun by early 1916, and South African forces conquered German South West Africa in 1915. In East Africa Lettow-Vorbeck led a guerrilla campaign that lasted until he surrendered in Northern Rhodesia on 25 November 1918. Africans fought as soldiers, such as the askari and the Rhodesia Native Regiment, and huge numbers served as carriers, many of whom died of disease and exhaustion.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why Germany was defeated in 1918.",
    points: [
      "Identifies the failure of the Spring Offensive.",
      "Explains that Germany lost many of its best troops and ran short of supplies, leaving it exhausted.",
      "Identifies the entry of the USA.",
      "Explains that fresh American troops and resources gave the Allies superiority.",
      "Identifies the British naval blockade / collapse of allies / unrest at home.",
      "Explains that shortages of food caused unrest, mutinies, and the collapse of Germany's allies left it alone.",
    ],
    hints: ["Consider the German army, the USA and the home front."],
    modelAnswer: "Germany's Spring Offensive of 1918 advanced a long way but cost many of its best soldiers and outran its supplies, so the army was exhausted when the Allies counter-attacked in August. The entry of the USA brought fresh troops and vast resources, giving the Allies a clear advantage. Meanwhile the British blockade caused severe food shortages, leading to strikes and naval mutinies, and Germany's allies, Bulgaria, the Ottoman Empire and Austria-Hungary, collapsed, leaving Germany alone.",
    explanation: "Two marks per developed reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** economic results of the First World War.",
    points: [
      "Identifies war debts.",
      "Explains that Britain and France owed huge sums, especially to the USA, which became the leading creditor.",
      "Identifies destruction / inflation.",
      "Explains that northern France and Belgium were devastated and many countries suffered inflation and unemployment.",
    ],
    hints: ["Who borrowed, who lent, and what was destroyed?"],
    modelAnswer: "First, the war left Britain and France with huge debts, especially to the USA, which became the world's leading creditor and economic power. Second, large areas of northern France and Belgium were devastated, and many countries suffered inflation and unemployment as they returned to peace.",
    explanation: "Two marks per explained result.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the source and answer the questions.\n\n${source("Source A", "the recollections of a fictional man from the Fort Jameson district who served as a carrier in East Africa, recorded by a missionary in the 1930s", "The officers called it a short journey, but we walked for many months. Each man carried a load on his head from sunrise until the rains came. When the food ran out we ate roots. Many of my age-mates fell sick with fever and were left by the path. When I came home my mother did not know me. Nobody told us why the white men were fighting each other.")}`,
    hints: ["Think about who recorded the source and when."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A tell you about the experience of carriers?", points: [
        "Long marches carrying heavy loads.",
        "Hunger and disease; many died or were left behind.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "Why were so many Africans used as carriers in East Africa? Use the source and your own knowledge.", points: [
        "Few roads and railways in East Africa.",
        "Disease (tsetse) killed horses and oxen.",
        "Lettow-Vorbeck's campaign was long and mobile, so armies moved over huge distances.",
        "Colonial authorities could recruit or force Africans to serve.",
      ], explanation: "Reasons with knowledge." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "How useful is Source A to a historian studying Africa's part in the First World War?", points: [
        "Useful: first-hand experience of an ordinary African, rarely recorded.",
        "Useful: content (long marches, hunger, disease, death) matches own knowledge of high carrier deaths.",
        "Useful: shows Africans were not told why the war was fought.",
        "Limit: recalled years later; memory may change; recorded and possibly shaped by a missionary.",
        "Limit: one person's experience; says nothing about soldiers, other campaigns, or political effects.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A is useful because it gives the experience of an ordinary African carrier, a voice rarely found in official records. Its content matches what historians know: carriers walked huge distances with heavy loads, and very many died of disease, hunger and exhaustion. It also shows that Africans were drawn into a European war they did not understand. However, it was recalled years later and recorded by a missionary, who may have chosen or reworded parts of the account. It describes only one man's experience and says nothing about African soldiers, other campaigns or the war's political effects. It is therefore very useful for the human cost of the war in Africa, but must be used with other evidence.", explanation: "Content, provenance and own knowledge." }),
    ],
    explanation: "Source-based practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the USA's role with Germany's own problems."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the war on the Western Front between 1914 and 1916.", points: [
        "Schlieffen Plan: German attack through Belgium (August 1914).",
        "Battle of the Marne halted the Germans (September 1914); trenches from the Channel to Switzerland.",
        "Verdun 1916: German attempt to wear down France.",
        "Somme 1916: huge British losses (about 57,000 casualties on 1 July); first tanks.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"The entry of the USA was the main reason why the Allies won the First World War.\" How far do you agree?", points: [
        ["USA: fresh troops (over a million by late 1918), supplies and loans; morale boost.", 2],
        ["USA: its entry pushed Germany into the risky Spring Offensive before Americans arrived in strength.", 2],
        ["Other: the British naval blockade caused shortages and unrest in Germany.", 2],
        ["Other: failure of the Spring Offensive; Allied tactics and tanks in the Hundred Days; Foch's unified command.", 2],
        ["Other: collapse of Germany's allies; revolution at home.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The entry of the USA in April 1917 was very important. It gave the Allies fresh troops, food, weapons and loans at a time when France and Britain were exhausted and Russia was leaving the war. By late 1918 well over a million American soldiers were in France. The prospect of their arrival also pushed Germany into the Spring Offensive of 1918, a gamble to win before the Americans arrived in strength.\n\nHowever, other factors were also important. The British naval blockade had caused severe shortages in Germany, leading to strikes and mutinies. The Spring Offensive failed and cost Germany its best troops. In the Hundred Days the Allies, under the unified command of Foch, used tanks, aircraft and artillery more effectively. Bulgaria, the Ottoman Empire and Austria-Hungary collapsed, and revolution broke out in Germany.\n\nOverall the USA's entry was decisive in ensuring that Germany could not win, but Germany's defeat in 1918 owed as much to the blockade, the failure of its own offensive and the collapse of its allies. I partly agree with the statement.", explanation: "Both sides and a supported judgement." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "When did the First World War begin and end?", "28 July 1914 to the armistice of 11 November 1918.");
  b.card("DEFINITION", "Stalemate", "Neither side can win: on the Western Front trench warfare caused stalemate from late 1914 to 1918.");
  b.card("FACT", "What happened at the Marne in September 1914?", "The German advance was stopped and the Schlieffen Plan failed.");
  b.card("FACT", "When did the USA enter the war, and why?", "6 April 1917, after unrestricted submarine warfare and the Zimmermann Telegram.");
  b.card("FACT", "What happened at Gallipoli?", "Allied landings (April 1915) to defeat the Ottoman Empire failed; withdrawal January 1916.");
  b.card("FACT", "When and where did Lettow-Vorbeck surrender?", "25 November 1918, in Northern Rhodesia, after the armistice.");
  b.card("FACT", "What was the Rhodesia Native Regiment?", "An African regiment formed in Southern Rhodesia in 1916 that fought in East Africa.");
  b.card("CONCEPT", "Give four political results of the war.", "Fall of four empires, new states, the Bolshevik revolution, the League of Nations and mandates.");
  b.card("FACT", "About how many soldiers died in the war?", "Historians estimate about 9-10 million, with over 20 million wounded.");
});
