// Slice W3b: the war at sea, Gallipoli, the Eastern Front and civilians (Cambridge Depth study A, KQ3).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["April 1915", "Allied landings at Gallipoli"],
  ["May 1916", "Battle of Jutland begins"],
  ["February 1917", "Germany resumes unrestricted submarine warfare"],
  ["March 1918", "Treaty of Brest-Litovsk"],
]);

concept("hist.ww1.other-fronts", { file: "ww1/other-fronts", keyPrefix: "ww1.other-fronts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was the Battle of Jutland fought?",
    options: [
      ["1916", "Correct: 31 May-1 June 1916, off the coast of Denmark."],
      ["1914", "In 1914 the main naval events were smaller battles and the start of the blockade."],
      ["1915", "1915 saw the Lusitania sinking and the Dardanelles attack."],
      ["1918", "In 1918 the German fleet mutinied rather than fight."],
    ],
    answer: "A",
    explanation: "**Jutland** (1916) was the only major clash of the British and German battle fleets.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Ottoman commander became famous for his defence of the Gallipoli peninsula?",
    options: [
      ["Mustafa Kemal", "Correct: he later founded the Turkish Republic."],
      ["Enver Pasha", "Enver was the Ottoman war minister, best known for the defeat at Sarikamish."],
      ["Sharif Hussein", "Hussein led the Arab Revolt against the Ottomans."],
      ["Ian Hamilton", "Hamilton commanded the Allied forces at Gallipoli."],
    ],
    answer: "A",
    explanation: "**Mustafa Kemal** commanded Ottoman troops holding the heights above the landing beaches.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main aim of the Gallipoli campaign?",
    options: [
      ["To knock the Ottomans out and open a sea route to Russia", "Correct: the Allies hoped to capture Constantinople."],
      ["To capture Germany's colonies in the Pacific and in East Asia", "Japan and the dominions took those; Gallipoli is in Turkey."],
      ["To relieve the French army at Verdun", "Verdun did not begin until February 1916."],
      ["To break the British blockade of Germany", "Britain was the blockading power."],
    ],
    answer: "A",
    explanation: "Taking **Constantinople** would have opened the straits to supply Russia and might have brought Balkan states into the war on the Allied side.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did convoys reduce British shipping losses from 1917?",
    options: [
      ["Escorted groups were harder to find and dangerous to attack", "Correct: U-boats risked depth charges from the escorts."],
      ["Ships in convoys sailed underwater", "Merchant ships could not submerge."],
      ["Germany had agreed in 1917 not to attack ships sailing in convoys", "There was no such agreement."],
      ["Convoys sailed only through neutral waters", "Convoys crossed the Atlantic war zone."],
    ],
    answer: "A",
    explanation: "Grouping ships made the ocean look emptier to U-boats, and destroyer **escorts** could counter-attack with depth charges.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did Germany resume unrestricted submarine warfare in February 1917?",
    options: [
      ["It hoped to starve Britain out before the USA could act", "Correct: it was a calculated gamble."],
      ["The USA had already declared war on Germany", "The USA declared war in April 1917, partly because of this decision."],
      ["Britain had ended its blockade of Germany", "The blockade continued until after the war."],
      ["Its surface fleet had won the Battle of Jutland decisively", "Jutland was indecisive and the German fleet stayed in port."],
    ],
    answer: "A",
    explanation: "German leaders calculated that sinking enough ships would force Britain to make peace before American troops could arrive in large numbers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do most historians argue that Britain won the war at sea despite its losses at Jutland?",
    options: [
      ["It kept control of the seas and the blockade went on", "Correct: the German fleet never again seriously challenged it."],
      ["It sank the whole German fleet at Jutland", "Germany lost fewer ships than Britain at Jutland."],
      ["Germany surrendered its navy in 1916", "The German fleet was interned only after the armistice of 1918."],
      ["German U-boats never managed to sink any British merchant ships", "U-boats sank very many British ships."],
    ],
    answer: "A",
    hints: ["Think about what happened after the battle rather than during it."],
    explanation: "Control of the sea let Britain move troops and supplies, while the **blockade** gradually weakened Germany.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How did the Eastern Front help the Allies in September 1914?",
    options: [
      ["Germany moved troops east before the Marne", "Correct: Russia's early attack weakened the German right wing in France."],
      ["Russian troops landed in France to fight at the Marne", "No Russian army fought at the Marne."],
      ["Russia defeated Germany decisively at Tannenberg", "Germany won at Tannenberg."],
      ["Russia's collapse freed Allied troops for the west", "Russia's collapse came in 1917-18 and helped Germany."],
    ],
    answer: "A",
    hints: ["Link the Eastern Front to the Schlieffen Plan."],
    explanation: "Russia's invasion of East Prussia led Moltke to send troops east, weakening the German attack in France just before the **Marne**.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which consequence of the Eastern Front most HELPED Germany?",
    options: [
      ["Russia's withdrawal freed German divisions for the 1918 offensive", "Correct: this let Germany attack in the west in spring 1918."],
      ["The Brusilov Offensive of 1916 badly weakened Germany's ally Austria-Hungary", "This weakened Germany's ally."],
      ["Russia's attack in 1914 drew troops away from France", "This helped the Allies at the Marne."],
      ["The war in the east lasted from 1914 to 1917", "A long two-front war strained Germany."],
    ],
    answer: "A",
    hints: ["Which result changed the balance on the Western Front in Germany's favour?"],
    explanation: "After **Brest-Litovsk** Germany could move many divisions west for the Spring Offensive, though the occupation of the east still tied down large forces.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The liner Lusitania was sunk by a German U-boat in May 1915.",
    answer: true,
    explanation: "True. About 1,200 people died, including over 120 Americans, which angered the USA.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Russia left the war by signing the Treaty of Brest-Litovsk with Germany in March 1918.",
    answer: true,
    explanation: "True. The Bolshevik government signed it on 3 March 1918, giving up Poland, the Baltic lands and Ukraine.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Blockade", "Using sea power to stop goods reaching an enemy"],
      ["Convoy", "Merchant ships sailing together under escort"],
      ["Unrestricted submarine warfare", "Sinking ships in a war zone without warning"],
      ["Total war", "Mobilising a whole population and economy for war"],
    ],
    explanation: "These four terms explain how the war at sea and on the home front was fought.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [order.events[3][1], order.events[1][1], order.events[0][1], order.events[2][1]],
    right: POS,
    rightIndex: [3, 1, 0, 2],
    hints: ["Gallipoli came before the great naval battle."],
    explanation: "Gallipoli April 1915; Jutland May 1916; unrestricted submarine warfare February 1917; Brest-Litovsk March 1918.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The British commander of the Grand Fleet at Jutland was Admiral {{blank:a}}. The 1914 British law giving the government wide wartime powers was the Defence of the {{blank:b}} Act.",
    blanks: [
      { id: "a", accepted: ["Jellicoe"], choices: ["Jellicoe", "Scheer", "Tirpitz", "Haig"] },
      { id: "b", accepted: ["Realm"], choices: ["Realm", "Empire", "Nation", "Kingdom"] },
    ],
    explanation: "**Jellicoe** led the Grand Fleet; Scheer commanded the German fleet. **DORA**, the Defence of the Realm Act, allowed censorship, control of industry and later rationing.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe the impact of the war on civilians in Britain.",
    points: [
      "DORA gave the government power to censor and control industry and land.",
      "Conscription from 1916.",
      "Rationing of food such as sugar, meat and butter (1918).",
      "Women took on new jobs (munitions) / air raids by Zeppelins and aircraft killed civilians.",
    ],
    modelAnswer: "The Defence of the Realm Act allowed the government to censor newspapers and take over factories and land. Conscription was introduced in 1916. Food shortages led to rationing of sugar, meat and butter in 1918. Many women worked in munitions factories and other jobs, and civilians were killed by Zeppelin and aeroplane raids.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Gallipoli campaign failed.",
    points: [
      "Identifies the loss of surprise.",
      "Explains that the failed naval attack of March 1915 warned the Ottomans, who strengthened their defences before the landings.",
      "Identifies poor planning / intelligence.",
      "Explains that inaccurate maps and landings in the wrong places left troops facing cliffs and strong positions.",
      "Identifies strong Ottoman defence / difficult conditions.",
      "Explains that well-led defenders held the high ground, while heat, disease and lack of water weakened the attackers.",
    ],
    hints: ["Think about what happened before the landings, and about the ground."],
    modelAnswer: "The naval attack on the Dardanelles in March 1915 failed and warned the Ottomans, who had five weeks to strengthen their defences before the landings. Planning was poor: maps were inaccurate and some troops were landed in the wrong place, facing steep cliffs. The Ottoman troops, well led by commanders such as Mustafa Kemal, held the high ground, while the attackers suffered from heat, flies, lack of water and dysentery. Commanders also failed to use chances such as the Suvla Bay landing in August.",
    explanation: "Two marks for each developed explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the British blockade affected Germany.",
    points: [
      "Identifies food shortages.",
      "Explains that hunger (the turnip winter of 1916-17) and ersatz foods caused suffering and disease.",
      "Identifies the effect on morale / industry.",
      "Explains that shortages caused strikes and unrest, and lack of raw materials hurt war production.",
    ],
    hints: ["Think about food and about morale."],
    modelAnswer: "The blockade cut Germany off from imported food and fertiliser, so by the turnip winter of 1916-17 many Germans were hungry and relied on substitute foods, and estimates suggest hundreds of thousands of extra civilian deaths. Shortages also lowered morale, leading to strikes and unrest, and the lack of raw materials made it harder to produce weapons.",
    explanation: "Two marks per developed explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a statement issued by a fictional German naval press office, June 1916", "Our High Seas Fleet met the main force of the English fleet and inflicted on it far greater losses than it suffered. The myth of English rule of the sea has been broken. The German people may be proud of their sailors.")}\n\n${source("Source B", "a comment by a fictional American journalist in a New York newspaper, June 1916", "The German fleet struck hard and sailed home. But it sailed home. The prisoner has assaulted his jailer and is back in his cell.")}`,
    hints: ["In (c), think about the purpose of each source and what happened after Jutland."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A claim about the Battle of Jutland?", points: [
        "Germany inflicted greater losses.",
        "British naval supremacy had been broken / Germany won.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain the message of Source B.", points: [
        "Germany caused damage but returned to port.",
        "Britain still controlled the sea (the 'jailer').",
        "The German fleet remained trapped / blockaded (the 'cell').",
        "Own knowledge: the High Seas Fleet did not seriously challenge the Grand Fleet again.",
      ], explanation: "Interprets the metaphor and supports it." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Which source gives the more accurate view of the result of Jutland? Use the sources and your own knowledge.", points: [
        "A: official German propaganda for home morale; one-sided.",
        "A: partly accurate: Britain lost more ships and about twice as many men.",
        "B: neutral American journalist (USA not yet at war); less reason to favour either side.",
        "B: matches own knowledge: the German fleet stayed in port and the blockade continued.",
        "A's claim that British rule of the sea was broken is contradicted by later events.",
        "Supported judgement.",
      ], levels: levels(6), modelAnswer: "Source A was issued by a German naval press office to raise morale at home, so it stresses success. It is partly accurate, because Britain did lose more ships and about twice as many men. However, its claim that British control of the sea had been broken is wrong: the German fleet returned to port and never again seriously challenged the Grand Fleet, and the blockade continued. Source B was written by an American journalist in June 1916, when the USA was still neutral, so he had less reason to favour either side. Its point, that the German fleet hit hard but went back to its cell, matches what happened. Source B gives the more accurate view of the battle's result.", explanation: "Provenance and content checked against own knowledge." }),
    ],
    explanation: "Practice source-based question (12 marks). Both sources are invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), compare the Eastern Front with the Western Front and the war at sea."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the main events on the Eastern Front between 1914 and 1918.", points: [
        "Russian invasion of East Prussia defeated at Tannenberg (August 1914).",
        "German and Austrian breakthrough at Gorlice-Tarnów and the Russian retreat (1915).",
        "Brusilov Offensive (1916): heavy losses for Austria-Hungary and Russia.",
        "Revolution (1917) and the Treaty of Brest-Litovsk (March 1918).",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "How important was the Eastern Front to the outcome of the First World War? Explain your answer.", points: [
        ["Important: Russia's 1914 attack drew German troops away before the Marne.", 2],
        ["Important: two-front war tied down German and most Austro-Hungarian forces until 1917.", 2],
        ["Important: Brusilov weakened Austria-Hungary badly.", 2],
        ["Less important / helped Germany: Russia's collapse freed divisions for the 1918 offensive.", 2],
        ["Other fronts decisive: the Western Front, the blockade and US entry ended the war.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The Eastern Front was very important for the first three years. Russia's early invasion of East Prussia in 1914 led Germany to move troops east, which helped the Allies win the Marne. For three years Germany had to fight on two fronts, and most of Austria-Hungary's army was tied down in the east, where the Brusilov Offensive of 1916 inflicted huge losses on it.\n\nHowever, the Eastern Front did not decide the war. Russia's collapse in 1917 and the Treaty of Brest-Litovsk in March 1918 actually helped Germany, allowing it to move many divisions west for the Spring Offensive. The war was decided on the Western Front in 1918, together with the effects of the British blockade and the arrival of American troops.\n\nOverall, the Eastern Front was important in preventing a quick German victory and in wearing down the Central Powers, but it was not decisive in the final outcome, which was settled in the west.", explanation: "Both sides and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "Blockade", "Using naval power to stop goods reaching an enemy, as Britain did to Germany from 1914.");
  b.card("DEFINITION", "Convoy", "Merchant ships sailing together under warship escort; introduced by Britain in 1917.");
  b.card("DEFINITION", "Unrestricted submarine warfare", "Sinking any ship in a war zone without warning; resumed by Germany in February 1917.");
  b.card("FACT", "When was the Battle of Jutland, and who commanded?", "31 May-1 June 1916; Jellicoe (British) and Scheer (German).");
  b.card("FACT", "When did the landings at Gallipoli take place, and when did the Allies leave?", "Landings 25 April 1915; evacuation completed January 1916.");
  b.card("FACT", "When was the Lusitania sunk?", "7 May 1915.");
  b.card("FACT", "When was the Treaty of Brest-Litovsk signed?", "3 March 1918: Russia left the war.");
  b.card("CONCEPT", "Why did Gallipoli fail?", "Lost surprise after the March naval attack, poor planning and maps, strong Ottoman defence of the heights, disease and heat.");
  b.card("CONCEPT", "Who won the war at sea?", "Britain: despite Jutland losses it kept control of the seas, maintained the blockade and defeated the U-boats with convoys.");
});
