// Slice W3b: trench warfare, new weapons, Verdun and the Somme (Cambridge Depth study A, KQ1).
import { concept, P, source, levels, timeline } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];
const order = timeline([
  ["April 1915", "Large-scale use of poison gas at Ypres"],
  ["February 1916", "The German attack at Verdun begins"],
  ["July 1916", "The first day of the Battle of the Somme"],
  ["November 1917", "Massed tanks are used at Cambrai"],
]);

concept("hist.ww1.trench-warfare", { file: "ww1/trench-warfare", keyPrefix: "ww1.trench-warfare" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date did the Battle of the Somme begin?",
    options: [
      ["1 July 1916", "Correct: the British army suffered about 57,000 casualties that day."],
      ["21 February 1916", "21 February 1916 is when the Germans attacked Verdun."],
      ["15 September 1916", "15 September 1916 is when tanks were first used, during the Somme."],
      ["31 July 1917", "31 July 1917 is when the Third Battle of Ypres (Passchendaele) began."],
    ],
    answer: "A",
    explanation: "The Somme began on **1 July 1916** and lasted until November.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was 'no man's land'?",
    options: [
      ["The ground between the opposing front-line trenches", "Correct: it was covered in barbed wire and shell craters."],
      ["The area behind the lines where soldiers rested", "Rest areas were behind the reserve lines, not between the armies."],
      ["Neutral countries such as Switzerland", "The term referred to ground on the battlefield."],
      ["Land in Belgium that the Belgians had flooded on purpose to stop the Germans", "Flooding was used near the coast, but this is not the meaning of the term."],
    ],
    answer: "A",
    explanation: "**No man's land** lay between the two front lines; attackers had to cross it under fire.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why were trenches dug in a zig-zag pattern?",
    options: [
      ["To stop an enemy in the trench firing along its whole length", "Correct: it also limited the effect of a shell burst."],
      ["To make them easier to drain in wet weather", "Zig-zags did not help drainage; duckboards and pumps were used for that."],
      ["To confuse enemy aircraft taking photographs", "Aerial photographs showed trench patterns clearly."],
      ["To shorten the distance to the enemy front line", "The pattern ran along the line, not towards the enemy."],
    ],
    answer: "A",
    explanation: "The zig-zag (traverses) meant a raider or a shell burst affected only one section of trench.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which weapon caused the largest number of casualties on the Western Front?",
    options: [
      ["Artillery", "Correct: shell-fire caused more casualties than any other weapon."],
      ["Poison gas", "Gas caused fear and injury but only a small share of deaths."],
      ["Tanks", "Tanks were few in number and appeared only from 1916."],
      ["Aircraft", "Aircraft mainly observed and directed artillery; bombing caused relatively few casualties."],
    ],
    answer: "A",
    explanation: "**Artillery** was the great killer of the war, followed by machine guns and rifles.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the week-long bombardment before the Somme fail to destroy the German defences?",
    options: [
      ["Germans sheltered in deep dugouts and many shells failed", "Correct: the wire was often left uncut and machine-gunners survived."],
      ["The British had no artillery on the Somme front", "The British fired over a million shells."],
      ["Heavy rain stopped all firing for the whole week", "The bombardment went ahead, though weather delayed the attack by two days."],
      ["The Germans had withdrawn from the whole area before the attack began", "The Germans held strong positions there on 1 July."],
    ],
    answer: "A",
    explanation: "Deep German **dugouts**, faulty shells and shrapnel that could not cut thick wire meant that machine-gunners were ready when the barrage lifted.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Somme offensive continue for months after the disastrous first day?",
    options: [
      ["To relieve pressure on the French at Verdun and wear down Germany", "Correct: Haig also still hoped for a breakthrough."],
      ["Because the British had already captured all their objectives", "Most first-day objectives were not taken."],
      ["Because Germany had asked for an armistice", "Germany did not ask for an armistice until October 1918."],
      ["To protect the Channel ports from a German attack", "The Channel ports were not threatened on the Somme in 1916."],
    ],
    answer: "A",
    hints: ["What was happening to France at the same time?"],
    explanation: "Haig continued to relieve **Verdun**, to wear down the German army by attrition and in hope of a breakthrough. Critics argue he continued too long.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did poison gas fail to break the stalemate?",
    options: [
      ["Gas masks reduced its effect and it relied on the wind", "Correct: both sides soon protected their soldiers and used gas."],
      ["It was banned by the League of Nations in 1916", "The League of Nations did not exist until 1920."],
      ["Only the British ever used it", "Germany first used gas on a large scale, and both sides used it."],
      ["It could be fired only at night", "Gas was used by day and night."],
    ],
    answer: "A",
    hints: ["Think about protection and about the weather."],
    explanation: "Gas depended on wind direction and was quickly countered by **gas masks**; as both sides used it, it gave no lasting advantage.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence do Haig's defenders use most often?",
    options: [
      ["The British army's victories under his command in 1918", "Correct: they argue his army learned and improved."],
      ["The heavy casualty figures for the first day of the Somme in 1916", "Critics use these figures against him."],
      ["The mud and slow progress at Passchendaele in 1917", "Critics use Passchendaele against him."],
      ["The failure of the bombardment before the Somme", "This is evidence used by his critics."],
    ],
    answer: "A",
    hints: ["Defenders point to the end of the war."],
    explanation: "Defenders stress the 'learning curve' that led to the Allied victories of the **Hundred Days** (1918). The debate over Haig remains open.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Tanks were first used in battle by the British on the Somme in September 1916.",
    answer: true,
    explanation: "True. They were first used on 15 September 1916. They frightened defenders but often broke down.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Battle of Verdun was a British attack on German positions.",
    answer: false,
    explanation: "False. Verdun was a German attack on the French, from February 1916. The Somme was the British-led attack.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each weapon with its main effect on the Western Front.",
    pairs: [
      ["Machine gun", "Made it very costly to attack across open ground"],
      ["Poison gas", "Caused fear and injuries until masks were issued"],
      ["Tank", "Could cross wire and trenches, but early models broke down"],
      ["Reconnaissance aircraft", "Spotted enemy positions and directed artillery"],
    ],
    explanation: "Machine guns strengthened defence; gas caused fear but was countered; tanks became effective only later; aircraft were the eyes of the artillery.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [order.events[1][1], order.events[3][1], order.events[0][1], order.events[2][1]],
    right: POS,
    rightIndex: [1, 3, 0, 2],
    hints: ["The Somme began after Verdun had been going on for over four months."],
    explanation: "Gas at Ypres April 1915; Verdun February 1916; the Somme July 1916; Cambrai November 1917.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The French general who organised the defence of Verdun was {{blank:a}}. The British commander-in-chief on the Western Front from December 1915 was {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Pétain"], choices: ["Pétain", "Foch", "Joffre", "Nivelle"] },
      { id: "b", accepted: ["Haig"], choices: ["Haig", "French", "Kitchener", "Allenby"] },
    ],
    explanation: "**Pétain** organised Verdun's defence; **Haig** replaced Sir John French as British commander in December 1915.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the condition caused by standing for long periods in cold, wet trenches, which could lead to amputation.",
    accepted: ["trench foot", "trenchfoot", "trench-foot"],
    wrong: ["shell shock"],
    explanation: "**Trench foot** was a fungal and circulation problem; dry socks, foot inspections and whale oil reduced it.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Describe what living in the trenches was like for soldiers on the Western Front.",
    points: [
      "Rats and lice / poor hygiene.",
      "Cold, wet and mud / trench foot.",
      "Danger from snipers and shell-fire even on quiet days.",
      "Boredom and routine (sentry duty, repairs, night work) / units rotated between front and rear.",
    ],
    modelAnswer: "Trenches were infested with rats, and soldiers were covered in lice. They were often cold and wet, standing in mud or water, which caused trench foot. Even on quiet days snipers and shells killed men. Much of the time was boring routine such as sentry duty and repairing the trench at night, and units moved between the front and rear lines every few days.",
    explanation: "One mark per accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Battle of Verdun was significant.",
    points: [
      "Identifies the enormous losses on both sides.",
      "Explains that roughly 700,000 casualties weakened both armies and showed the cost of attrition.",
      "Identifies its importance to French morale / national pride.",
      "Explains that France held Verdun under Pétain, so it became a symbol of French resistance.",
      "Identifies its effect on Allied strategy.",
      "Explains that pressure on the French meant the Somme offensive had to go ahead to relieve them, with a larger British role.",
    ],
    hints: ["Think about losses, morale and the link with the Somme."],
    modelAnswer: "Verdun caused enormous losses: historians estimate roughly 700,000 casualties on both sides combined, so it weakened both armies and showed the terrible cost of attrition. It became a symbol of French national resistance because, under Pétain, the French held the city despite repeated attacks. It also changed Allied plans: because the French army was so heavily committed at Verdun, the Somme offensive became mainly a British operation, partly meant to relieve the pressure on France.",
    explanation: "Two marks for each developed point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why tanks did not end the stalemate in 1916.",
    points: [
      "Identifies that early tanks were unreliable / slow.",
      "Explains that many broke down or got stuck in mud and craters, so they could not lead a breakthrough.",
      "Identifies that too few were used.",
      "Explains that small numbers spread along the front could not achieve surprise or support infantry everywhere.",
    ],
    hints: ["Think about how many there were and how well they worked."],
    modelAnswer: "The first tanks were slow and mechanically unreliable, and many broke down or became stuck in shell craters, so they could not lead a breakthrough. They were also used in small numbers spread along the front, so their surprise was wasted and they could not support the infantry everywhere. They became effective only when used in large numbers with infantry and artillery at Cambrai and Amiens.",
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${source("Source A", "a letter written by a fictional British officer to his sister, 3 July 1916, which passed the army censor", "The men behaved splendidly. We went forward as if on parade and some of the battalions on our left took the German line. Our losses are heavy, I won't pretend otherwise, but the enemy has suffered far worse. Tell Mother I am well and that we shall push on.")}\n\n${source("Source B", "a memoir by a fictional British private, published in 1930", "The wire was not cut. We knew it before we reached it. The machine guns started the moment we stood up. I lay in a shell hole all day with the dead and the dying, and crawled back after dark. Of my platoon of about thirty, six answered the roll call.")}`,
    hints: ["In (c), think about when each source was written, for whom, and what you know of 1 July 1916."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What impression of the first days of the Somme does Source A give?", points: [
        "A positive / confident impression: the men advanced well and some objectives were taken.",
        "Losses admitted as heavy but claimed to be worse for the enemy.",
      ], explanation: "Two points from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the first day of the Somme?", points: [
        "Agree: both say British losses were heavy.",
        "Agree: both describe an advance across no man's land.",
        "Disagree: A suggests success; B describes complete failure (wire uncut, machine guns).",
        "Disagree: A claims the enemy suffered worse; B shows the attackers cut down.",
      ], explanation: "Specific agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Which source is more reliable as evidence about the first day of the Somme? Use the sources and your own knowledge.", points: [
        "A: written two days later by an officer; immediate, but passed by the censor and written to reassure his family.",
        "A: some truth (a few objectives, mainly in the south, were taken), but the claim that the enemy suffered worse is not supported for 1 July.",
        "B: written fourteen years later; memory may fade; written for publication and possibly shaped by the disillusioned mood of 1930.",
        "B: content matches own knowledge: uncut wire, machine guns, about 57,000 British casualties.",
        "Compares purpose and audience of both sources.",
        "Considers that each is one person's experience of a long front.",
        "Uses specific own knowledge to test both.",
        "Supported judgement.",
      ], levels: levels(8), modelAnswer: "Source A was written only two days after the attack, but it passed the army censor and was meant to reassure the officer's family, so it stresses success and plays down the losses. Some of it is accurate, since a few objectives were taken, mainly in the south, but its claim that the Germans suffered far worse is not supported by what we know of 1 July, when the British suffered about 57,000 casualties. Source B was written fourteen years later for publication, so the writer's memory may have faded and he may have been influenced by the disillusioned mood about the war around 1930. However, its details of uncut wire, machine guns opening fire immediately and terrible losses match my own knowledge of the first day. Both describe one man's experience of a long front. Source B is more reliable about what happened to most attacking units on 1 July, while Source A is more useful as evidence of what soldiers told their families.", explanation: "Provenance and content tested against own knowledge are needed for the top level." }),
    ],
    explanation: "Practice source-based question (14 marks). Both sources are invented for the question.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer both parts.",
    hints: ["In (b), give the critics' case and the defenders' case before judging."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the use of new weapons on the Western Front.", points: [
        "Machine guns used mainly in defence, firing hundreds of rounds a minute.",
        "Gas first used on a large scale by Germany at Ypres in April 1915; masks developed.",
        "Tanks first used by Britain on the Somme in September 1916; massed at Cambrai (1917).",
        "Aircraft for reconnaissance, artillery spotting, fighters and bombing.",
      ], explanation: "One mark per point." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "\"Haig deserves to be remembered as a poor commander.\" How far do you agree?", points: [
        ["Critics: huge losses on 1 July 1916 for little ground.", 2],
        ["Critics: continued the Somme and Passchendaele long after breakthrough was unlikely; slow to adapt.", 2],
        ["Defenders: had to support France (Verdun) and wear Germany down; no commander had a solution in 1916.", 2],
        ["Defenders: the Somme badly damaged the German army.", 2],
        ["Defenders: British army learned (tactics, tanks, creeping barrage) and won in 1918 under Haig.", 2],
        ["Supported judgement recognising the debate.", 2],
      ], levels: levels(12), modelAnswer: "Haig's critics have a strong case. On the first day of the Somme the British army suffered about 57,000 casualties for very little ground, after a bombardment that failed to cut the wire. Haig continued the Somme offensive until November and in 1917 fought on at Passchendaele in deep mud long after a breakthrough was unlikely. For many people in the 1960s and since, he symbolised generals who wasted their soldiers' lives.\n\nHowever, his defenders point out that Haig had to fight to support France, whose army was under huge pressure at Verdun, and that no commander in 1916 had a way to break a trench line without heavy losses. The Somme also badly damaged the German army. Above all, the British army learned from its mistakes, using creeping barrages, tanks, aircraft and better infantry tactics, and under Haig it won a series of victories in the Hundred Days of 1918.\n\nI only partly agree. Haig made costly mistakes and was slow to change his methods, but calling him simply a poor commander ignores the impossible conditions of 1916 and the victories of 1918. Historians still disagree, and a fair judgement must weigh both.", explanation: "Both sides and a supported judgement reach the top level." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("DEFINITION", "No man's land", "The ground between the opposing front-line trenches.");
  b.card("DEFINITION", "Creeping barrage", "Artillery fire that moves forward just ahead of advancing infantry.");
  b.card("DEFINITION", "Shell shock", "The contemporary term for mental breakdown caused by prolonged combat and shell-fire.");
  b.card("FACT", "When and where was poison gas first used on a large scale?", "April 1915, by Germany, at Ypres (chlorine).");
  b.card("FACT", "When did the Battle of Verdun begin?", "21 February 1916, with a German attack on the French.");
  b.card("FACT", "How many British casualties were there on the first day of the Somme?", "About 57,000, nearly 20,000 of them killed (1 July 1916).");
  b.card("FACT", "When and where were tanks first used?", "15 September 1916, by the British, on the Somme.");
  b.card("CONCEPT", "Give the two sides of the debate about Haig.", "Critics: he wasted lives at the Somme and Passchendaele. Defenders: he supported France, wore Germany down and won in 1918.");
  b.card("CONCEPT", "Why did attacks so often fail on the Western Front?", "Bombardments warned the enemy and failed to cut wire; machine guns and artillery cut down infantry; reserves arrived by rail to plug gaps.");
});
