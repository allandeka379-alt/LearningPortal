// W1b: ahist.risings.spirit-mediums-defeat (ZIMSEC topic 7).
import { concept, P, source, levels } from "../lib.mjs";

concept("ahist.risings.spirit-mediums-defeat", { file: "risings/spirit-mediums-defeat", keyPrefix: "risings.spirit-mediums-defeat" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which spirit medium of the Mazowe region is remembered as Mbuya Nehanda?",
    options: [
      ["Nehanda (Nyakasikana)", "Correct: she was executed in April 1898."],
      ["Mkwati, the priest of the Mwari cult in the Matopos", "Mkwati was a Mwari priest, not the Mazowe medium."],
      ["Makoni, the chief of the eastern districts of Mashonaland", "Makoni was a chief."],
      ["Mashayamombe", "Mashayamombe was a chief in the Hartley area."],
    ],
    answer: "A",
    explanation: "Nehanda was the medium of the Mazowe region; she was captured in 1897 and executed in April 1898.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main contribution of spirit mediums to the risings?",
    options: [
      ["They gave spiritual authority and called chiefs and people to resist", "Correct: religion gave unity and confidence."],
      ["They commanded the regiments in the field and planned every battle in detail from a central headquarters", "Military leadership came from chiefs and indunas."],
      ["They bought modern rifles from traders for the fighters", "They did not supply the rifles."],
      ["They negotiated the peace terms with the Company", "They did not do so."],
    ],
    answer: "A",
    explanation: "Mediums spoke for the ancestors, explained the disasters and urged resistance, which united chiefs who might otherwise have acted separately.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which priest of the Mwari cult is said to have helped to spread the rising from Matabeleland to Mashonaland?",
    options: [
      ["Mkwati", "Correct: he moved into Mashonaland during the rising."],
      ["Kaguvi", "Kaguvi was a Shona medium."],
      ["Somabulana", "Somabulana was an Ndebele induna."],
      ["Mashayamombe", "Mashayamombe was a Shona chief."],
    ],
    answer: "A",
    explanation: "Mkwati took part in the Ndebele rising and then travelled to Mashonaland, helping to link the regions.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which reason for the African defeat concerned the way the fighting was organised?",
    options: [
      ["There was no single command for the Ndebele and Shona fighters", "Correct: the groups fought separately and were beaten in turn."],
      ["The fighters had far more guns than the Company's soldiers, but they did not know how to load them", "The Company had superior arms."],
      ["The Company refused to fight until the harvest of 1897 was complete", "The Company fought through 1896 and 1897."],
      ["Rhodes had arranged for the Ndebele and Shona to rise at different times so that the risings would fail", "Rhodes did not organise the risings."],
    ],
    answer: "A",
    hints: ["Think about who gave orders to all the fighters."],
    explanation: "Because the Ndebele and Shona, and the Shona chiefs among themselves, fought separately, the Company could defeat them one at a time.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did famine and disease help to bring about African defeat?",
    options: [
      ["They weakened the people and made it hard to keep fighting", "Correct: rinderpest, drought and lost crops reduced strength."],
      ["They destroyed the Company's army before it could reach the Matopos", "The Company's forces survived."],
      ["They convinced the Company to withdraw from Mashonaland for a year", "The Company stayed."],
      ["They made the Shona leaders agree to join the Ndebele under one commander", "No such unity was achieved."],
    ],
    answer: "A",
    hints: ["Think about food and the farming season."],
    explanation: "Hunger from lost harvests and cattle disease weakened communities, and forced many to accept terms.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What is meant by divide and rule in the defeat of the risings?",
    options: [
      ["Using African guides and separate talks with the Ndebele while fighting the Shona", "Correct: African unity was broken."],
      ["Dividing the country into two colonies, one for the Ndebele and one for the Shona", "The country remained one territory."],
      ["Giving each chief a share of the Company's profits to join the Company's side permanently", "The Company did not pay such shares."],
      ["Splitting the Company's army into small parts to cover the whole country at once", "This was a military tactic, not a political one."],
    ],
    answer: "A",
    hints: ["Think of the Matopos indabas and chiefs who did not join."],
    explanation: "The Company made peace with the Ndebele leaders before it turned to the Shona, and used African guides and the neutrality of some chiefs.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best assesses the role of spirit mediums in the risings?",
    options: [
      ["They gave unity and spirit but could not match modern weapons", "Correct: essential to morale, insufficient for victory."],
      ["They were the only reason the risings took place, since no other grievances existed in either region", "Grievances over land and cattle also mattered."],
      ["They had no influence at all on the chiefs or the people", "They were highly influential."],
      ["They were responsible for the use of Maxim guns by the Africans", "Africans did not use Maxim guns."],
    ],
    answer: "A",
    hints: ["Weigh morale and unity against weapons."],
    explanation: "Mediums supplied religious authority and unity, but the Company's weapons, hunger and lack of command decided the war.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which claim about the legacy of the risings do historians treat with caution?",
    options: [
      ["That nationalism of the twentieth century grew directly out of the risings of 1896", "Correct: some stress continuity, others warn against reading it back."],
      ["That Nehanda and Kaguvi were captured, tried and executed in 1898", "This is well documented."],
      ["That the Ndebele and Shona rose against the Company in 1896 and 1897", "This is not in doubt."],
      ["That the risings did not restore independence to either the Ndebele or the Shona people", "This is not in doubt."],
    ],
    answer: "A",
    hints: ["Which claim involves interpretation?"],
    explanation: "Ranger stressed continuity between 1896 and the Second Chimurenga; others point out that later nationalism had its own causes and ideas.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Kaguvi was a medium linked with the spirit of Chaminuka.",
    answer: true,
    explanation: "True. He was a Shona medium in central Mashonaland.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Ndebele and Shona fought the Company under one central command.",
    answer: false,
    explanation: "False. They fought separately, and the Shona chiefs acted in their own districts.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Women had no part in the risings of 1896-97.",
    answer: false,
    hints: ["Think of Nehanda and of those who fed and hid the fighters."],
    explanation: "False. Nehanda was a leading figure, and women also supplied food, carried messages and suffered in the hunger and the destruction that followed.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each leader with his or her region or role.",
    pairs: [
      ["Nehanda", "Medium of the Mazowe region in Mashonaland"],
      ["Mkwati", "Priest of the Mwari cult who spread the rising"],
      ["Mashayamombe", "Chief who led resistance in the Hartley area"],
      ["Somabulana", "Ndebele leader who took part in the Matopos indabas"],
    ],
    explanation: "These four names recur in answers on the leaders of the risings.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each reason for defeat with its explanation.",
    pairs: [
      ["Weapons", "Maxim guns, rifles and dynamite against spears and old muzzle-loaders"],
      ["Lack of unity", "No central command; the fighters were defeated in turn"],
      ["Famine and disease", "Rinderpest, drought and lost crops weakened the people"],
      ["Divide and rule", "Separate talks with the Ndebele and use of African guides"],
    ],
    hints: ["Each reason had its own effect."],
    explanation: "These four reasons are the usual points in an answer on the defeat.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each statement with the person it best describes.",
    pairs: [
      ["Spread the rising from Matabeleland into Mashonaland", "Mkwati"],
      ["Was executed in April 1898 together with Kaguvi", "Nehanda"],
      ["Held out in a cave stronghold until 1897 in the Hartley area", "Mashayamombe"],
      ["Led resistance in the eastern districts and was captured and executed in 1897", "Makoni"],
    ],
    hints: ["Think of the regions."],
    explanation: "Mkwati, Nehanda, Mashayamombe and Makoni are the leaders usually named.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The mediums {{blank:a}} and Nehanda were executed at Salisbury in the month of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Kaguvi"], choices: ["Kaguvi", "Mkwati", "Makoni", "Lobengula"] },
      { id: "b", accepted: ["April"], choices: ["January", "April", "July", "October"] },
    ],
    explanation: "Kaguvi and Nehanda were executed at Salisbury in April 1898.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name did Shona nationalists of the twentieth century give to the liberation war, linking it with 1896?",
    accepted: ["Second Chimurenga", "the Second Chimurenga", "second chimurenga"],
    wrong: ["First Chimurenga"],
    explanation: "The **Second Chimurenga**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the part played by Nehanda and Kaguvi in the Shona rising.",
    points: ["Nehanda was the medium of the Mazowe region and encouraged chiefs to resist", "Kaguvi was a medium linked with Chaminuka in central Mashonaland", "They provided religious authority and called people to join", "They were captured in 1897 and executed in April 1898"],
    modelAnswer: "Nehanda was the medium of the Mazowe region and encouraged chiefs to resist, and Kaguvi was a medium linked with Chaminuka in central Mashonaland. They provided religious authority and called people to join the rising. Both were captured in 1897 and executed in April 1898.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Company's weapons gave it an advantage in 1896-97.",
    points: [["Maxim guns, modern rifles and artillery could break up attacks and keep fighters at a distance", 2], ["Dynamite could destroy cave strongholds, which the fighters had thought safe", 2]],
    hints: ["Think of attacks in the open and the use of caves."],
    modelAnswer: "Maxim guns, modern rifles and artillery could break up attacks and keep fighters at a distance. Dynamite could destroy the cave strongholds that the fighters had thought safe, so the Company could take them one by one.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the lack of unity weakened the risings.",
    points: [["There was no single leader or plan for all the fighters, so each group acted in its own district", 2], ["The Company made peace with the Ndebele first and then used its whole force against the Shona", 2]],
    hints: ["Think of the Matopos indabas."],
    modelAnswer: "There was no single leader or plan, so each group acted in its own district and could be defeated in turn. The Company made peace with the Ndebele at the indabas and then used its whole force against the Shona.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional Company officer on operations in Mashonaland, 1897",
        "The chiefs hold out in the caves of the hills, and I have found it necessary to destroy the stores and crops around them. Without food they cannot hold. Their mediums tell them that the spirits will protect them, but in the end hunger is stronger than prophecy."),
      "",
      source("Source B", "a tradition told by a fictional Shona grandmother in the 1960s",
        "Our mother Nehanda told the chiefs to stand. They stood as long as they could. When the food was gone and the caves were broken, the chiefs were taken. But we remembered, and what was taken from us will be asked for again."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about how the Company defeated the Shona strongholds?", points: ["By destroying stores and crops around the caves", "By using hunger to force the chiefs out"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the role of the mediums?", points: [["Agree: both say the mediums encouraged the chiefs to resist", 2], ["Differ: A treats prophecy as ineffective against hunger, B treats Nehanda's leadership as a source of memory and pride", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are these sources as evidence of why the risings were defeated?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is contemporary and from an officer who took part, but he writes to justify his methods and underplays African skill", 2], ["B reflects Shona memory but was told in the 1960s, during nationalist struggle, and may reflect later beliefs", 2], ["Own knowledge: hunger, weapons and lack of unity are confirmed by other evidence, so A is partly right and B explains memory rather than defeat", 2]], modelAnswer: "Source A was written at the time by an officer who took part, so it is reliable on the methods of siege and starvation, but he wished to justify his methods and says nothing about the lack of African unity. Source B shows how Nehanda was remembered, but it was told in the 1960s during the nationalist struggle and may reflect later beliefs. My own knowledge confirms that hunger, weapons and lack of unity caused the defeat, so A is partly right, while B is more reliable on memory than on why the risings failed." }),
    ],
    hints: ["For (c), consider who wrote each source, when, and what each aimed to show."],
    explanation: "Both sources are invented: an officer's report and a grandmother's tradition.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of lack of unity as a reason for the defeat of the Ndebele and Shona in 1896-97.",
    levels: levels(8),
    points: [
      ["Lack of unity: separate risings, no central command, the Ndebele peace of 1896 freeing the Company, chiefs acting alone", 2],
      ["Weapons: Maxim guns, rifles and dynamite", 2],
      ["Famine and disease, reinforcements and divide and rule", 2],
      ["Judgement on the relative importance", 2],
    ],
    hints: ["Compare lack of unity with weapons, hunger and reinforcements."],
    modelAnswer: "Lack of unity was important because the Ndebele and Shona fought separately and the Shona chiefs acted district by district, so the Company beat them in turn. The peace with the Ndebele in 1896 freed its forces for Mashonaland. But superior weapons, including Maxim guns, rifles and dynamite, were probably more important, since even united fighters could not have held caves and open ground against them. Famine and disease weakened the people, and reinforcements allowed the Company to replace its losses, while divide and rule widened the gaps. I conclude that weapons and resources gave the Company its advantage, and disunity made that advantage decisive.",
    explanation: "Credit explained reasons and a supported judgement.",
  });

  b.card("DEFINITION", "What is a spirit medium?", "A person believed to be possessed by the spirit of an ancestor or guardian of the land, who speaks with that spirit's voice and guides chiefs and people.");
  b.card("DEFINITION", "What is divide and rule?", "Using differences among rivals, such as chiefs who did not join a rising, to defeat them one at a time.");
  b.card("FACT", "Which two Shona mediums were executed in April 1898?", "Kaguvi and Nehanda.");
  b.card("FACT", "Which Mwari priest spread the rising to Mashonaland?", "Mkwati.");
  b.card("FACT", "Name three Shona chiefs who led resistance in 1896-97.", "Mashayamombe, Makoni and Mangwende.");
  b.card("CONCEPT", "What did spirit mediums contribute to the risings?", "Religious authority, unity among chiefs, an explanation of the disasters and the call to resist.");
  b.card("CONCEPT", "Give five reasons for African defeat in 1896-97.", "Weapons, lack of unity and central command, famine and disease, colonial reinforcements and divide and rule.");
  b.card("CONCEPT", "Why were the risings remembered?", "The executed mediums became martyrs, and later nationalists called their war the Second Chimurenga.");
  b.card("CONCEPT", "How did women contribute to the risings?", "As mediums such as Nehanda, and by supplying food, carrying messages and bearing the hardships of hunger and displacement.");
});
