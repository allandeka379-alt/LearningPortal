// W2b: the Anglo-Ndebele War, 1893-94 (her.colonisation.anglo-ndebele-war).
import { concept, P, source, table, timeline, levels } from "../lib.mjs";

concept("her.colonisation.anglo-ndebele-war", { file: "colonisation/anglo-ndebele-war", keyPrefix: "colonisation.anglo-ndebele-war" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which years was the **Anglo-Ndebele War** fought?",
    options: [
      ["1893-94", "Correct."],
      ["1896-97", "These are the years of the First Chimurenga/Umvukela."],
      ["1884-85", "These are the years of the Berlin Conference."],
      ["1888-89", "These are the years of the Rudd Concession and the Royal Charter."],
    ],
    answer: "A",
    explanation: "The Anglo-Ndebele War was fought in 1893-94.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which weapon gave the Company forces the greatest advantage at Shangani and Bembesi?",
    options: [
      ["The Maxim gun", "Correct: the machine gun broke the massed Ndebele attacks."],
      ["The assegai", "The assegai (stabbing spear) was a main Ndebele weapon."],
      ["The bow and arrow", "Bows were not the decisive weapon in this war."],
      ["The knobkerrie", "A knobkerrie is a wooden club."],
    ],
    answer: "A",
    explanation: "Maxim guns inflicted very heavy losses on the Ndebele regiments.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the **Victoria Agreement** promise the Company's volunteers?",
    options: [
      ["Land, gold claims and a share of captured cattle", "Correct: it gave volunteers a personal interest in war."],
      ["A place in the British Parliament", "No such promise was made."],
      ["Free passage home to Britain after one year of service", "The promise concerned land, gold and cattle."],
      ["Protection of Ndebele land rights", "The agreement promised Ndebele land to the volunteers."],
    ],
    answer: "A",
    explanation: "Volunteers were promised land and gold claims in Matabeleland and a share of loot cattle.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why was the **Victoria incident** important in the outbreak of war?",
    options: [
      ["The Company used it as an excuse to attack the Ndebele", "Correct: it was the trigger, not the deeper cause."],
      ["It was the battle in which Lobengula was captured and killed", "Lobengula died in early 1894, after fleeing north."],
      ["It ended the war with a peace treaty", "No peace treaty followed the incident."],
      ["It was the signing of the Rudd Concession", "The Rudd Concession was signed in 1888."],
    ],
    answer: "A",
    explanation: "The clash near Fort Victoria in July 1893 gave Jameson the excuse he wanted.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which reserves were created for the Ndebele after the war?",
    options: [
      ["Gwaai and Shangani", "Correct: dry areas far from markets."],
      ["Mana Pools and Chewore", "These are wildlife areas in the Zambezi valley."],
      ["Gokomere and Ziwa", "These are Early Iron Age traditions."],
      ["Inyati and Hope Fountain", "These are mission stations."],
    ],
    answer: "A",
    explanation: "The 1894 Land Commission created the Gwaai and Shangani reserves.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Company look towards **Matabeleland** by 1893?",
    options: [
      ["Mashonaland had less gold than it had hoped for", "Correct: the hoped-for 'second Rand' was not found."],
      ["The Berlin Conference ordered it to take Matabeleland", "The conference gave no such order."],
      ["Lobengula invited the Company to rule his kingdom", "Lobengula resisted Company rule."],
      ["The Portuguese had already occupied Mashonaland", "The Company controlled Mashonaland."],
    ],
    hints: ["What had the Company expected to find in Mashonaland?"],
    answer: "A",
    explanation: "Disappointment over gold made Matabeleland's land, cattle and possible minerals attractive.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Settler writers made the **Shangani Patrol** a heroic legend. How would an Ndebele account of the same event **most likely** describe it?",
    options: [
      ["As a victory in defence of the king", "Correct: the Ndebele soldiers protected Lobengula."],
      ["As the final defeat of the Ndebele state", "The patrol itself was destroyed by the Ndebele."],
      ["As a peaceful meeting between leaders", "It was a battle, not a meeting."],
      ["As an attack ordered by the Portuguese", "The Portuguese were not involved."],
    ],
    hints: ["Who won the fight at the Shangani River?"],
    answer: "A",
    explanation: "Different sides remember the same event differently; to the Ndebele it was a successful defence.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** explains the defeat of the Ndebele in 1893?",
    options: [
      ["Superior Company weapons and tactics broke brave Ndebele attacks", "Correct: Maxim guns and laagers decided the battles."],
      ["The Ndebele refused to fight and surrendered at once", "The Ndebele fought bravely at Shangani and Bembesi."],
      ["The Portuguese joined the Company with a large army", "The Portuguese did not fight in this war."],
      ["The war was decided by the Berlin Conference", "The conference was nine years earlier and decided nothing about this war."],
    ],
    hints: ["Compare weapons and tactics."],
    answer: "A",
    explanation: "Machine guns in defensive laagers inflicted heavy losses on massed attacks across open ground.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Lobengula ordered Bulawayo to be burnt before Company forces arrived in November 1893.",
    answer: true,
    explanation: "True. He burnt his capital and moved north.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Anglo-Ndebele War ended with Lobengula signing a peace treaty in Bulawayo.",
    answer: false,
    explanation: "False. Lobengula fled north and died in early 1894; there was no treaty signed by him.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each event with its date.",
    pairs: [
      ["Victoria incident", "July 1893"],
      ["Battle of Bembesi", "1 November 1893"],
      ["Shangani Patrol destroyed", "December 1893"],
      ["Death of Lobengula", "Early 1894"],
    ],
    explanation: "July 1893; 1 November 1893; December 1893; early 1894.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The patrol that followed Lobengula across the Shangani River was led by Major {{blank:a}}. The Company administrator who used the Victoria incident as an excuse for war was Leander Starr {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Allan Wilson"], choices: ["Allan Wilson", "Frederick Selous", "Charles Rudd", "John Moffat"] },
      { id: "b", accepted: ["Jameson"], choices: ["Jameson", "Rhodes", "Grobler", "Helm"] },
    ],
    explanation: "Wilson led the Shangani Patrol; Jameson was the Company administrator.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to a circle of wagons used by the Company forces as a defensive position?",
    accepted: ["laager", "a laager", "laagers"],
    wrong: ["kraal"],
    explanation: "A **laager**: wagons drawn into a circle, defended with machine guns and rifles.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** factors that led to the Anglo-Ndebele War.",
    points: ["Disappointment over gold in Mashonaland", "Desire for Ndebele land and cattle", "Border / tribute disputes over Shona communities", "The Victoria incident / Victoria Agreement / the Company's wish to remove the Ndebele state"],
    modelAnswer: "Gold disappointment in Mashonaland, desire for Ndebele land and cattle, border disputes, and the Victoria incident.",
    explanation: "One mark per factor.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** effects of the Anglo-Ndebele War on the Ndebele.",
    points: [
      "Loss of land", "Developed: best land given to settlers; people moved to the dry Gwaai and Shangani reserves",
      "Loss of cattle", "Developed: cattle, the main form of wealth, seized by the Company and volunteers",
      "Loss of the state / forced labour / tax", "Developed: king dead, izinduna lost power; people forced to work for settlers",
    ],
    modelAnswer: "The Ndebele lost their best land, which was given to settlers, and many were moved to the dry Gwaai and Shangani reserves. They lost much of their cattle, their main form of wealth, to the Company and volunteers. Their state was destroyed, the izinduna lost authority, and people were forced to work for settlers and pay tax.",
    hints: ["Land, cattle and power."],
    explanation: "Two marks per developed effect.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the effects of the Anglo-Ndebele War helped to cause the rising of 1896.",
    points: [
      "Loss of land and cattle",
      "Developed: created poverty and anger, so people wanted to recover what was taken",
      "Harsh rule: forced labour, tax and brutal police",
      "Developed: resentment grew against Company rule, leading to the Umvukela of March 1896",
    ],
    modelAnswer: "The loss of land and cattle after the war left many Ndebele poor and angry, and they wanted to recover what had been taken. Forced labour, taxes and the harsh behaviour of the Company's police created deep resentment against Company rule, which exploded in the Umvukela of March 1896.",
    hints: ["Link each effect to a grievance."],
    explanation: "Two marks per developed link.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Study the timeline.\n\n" + timeline([
      ["July 1893", "Victoria incident near Fort Victoria"],
      ["August 1893", "Victoria Agreement with volunteers"],
      ["October 1893", "Company columns advance; battle of Shangani"],
      ["1 November 1893", "Battle of Bembesi"],
      ["November 1893", "Company forces enter the burnt Bulawayo"],
      ["December 1893", "Shangani Patrol destroyed"],
    ]).md,
    parts: [
      P.mcq({
        label: "(a)", stem: "Which event in the timeline shows that the Company was **preparing for war** soon after the Victoria incident?",
        options: [
          ["The Victoria Agreement with volunteers", "Correct: volunteers were recruited with promises of land and cattle."],
          ["The battle of Bembesi on 1 November 1893", "Bembesi was part of the war itself."],
          ["The death of Lobengula", "This came at the end."],
          ["The Shangani Patrol", "This was late in the war."],
        ],
        answer: "A",
        explanation: "Recruiting volunteers with promises of loot shows planning for war.",
      }),
      P.tf({
        label: "(b)",
        stem: "According to the timeline, the battle of Bembesi took place after Company forces entered Bulawayo.",
        answer: false,
        explanation: "False. Bembesi (1 November) came before the entry into Bulawayo.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Using the timeline and your own knowledge, describe the course of the war from the Company's advance to the death of Lobengula.",
        points: [
          "Company columns advanced from Fort Victoria and Fort Salisbury",
          "Ndebele attacked at Shangani but were broken by Maxim guns",
          "A second attack at Bembesi (1 November) also failed",
          "Lobengula burnt Bulawayo and moved north; Company entered the town",
          "Wilson's patrol followed him and was destroyed at the Shangani River (December)",
          "Lobengula died in early 1894 and Ndebele leaders came to terms",
        ],
        modelAnswer: "In October 1893 Company columns advanced from Fort Victoria and Fort Salisbury. The Ndebele attacked their laager near the Shangani River but were cut down by Maxim guns, and a second attack at Bembesi on 1 November also failed. Lobengula burnt Bulawayo and moved north, and Company forces entered the town. Major Wilson's patrol followed the king and was destroyed at the Shangani River in December. Lobengula died in early 1894, and Ndebele leaders came to terms with the Company.",
      }),
    ],
    hints: ["Follow the timeline in order and add detail."],
    explanation: "Using a timeline to describe the course of the war.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the causes of the Anglo-Ndebele War.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the Victoria incident of July 1893.",
        points: ["An Ndebele force was sent to punish Shona communities near Fort Victoria", "The Company claimed to protect these communities", "Company forces fired on the Ndebele", "Jameson used the clash as an excuse to prepare for war"],
        modelAnswer: "In July 1893 an Ndebele force was sent to punish Shona communities near Fort Victoria, which the Company claimed to protect. Company forces fired on the Ndebele, and Jameson used the clash as an excuse to prepare for war.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The Victoria incident was the main cause of the Anglo-Ndebele War.\" How far do you agree?",
        points: [
          ["For: it was the immediate trigger that Jameson used to justify war", 2],
          ["Against: gold disappointment and the desire for Ndebele land and cattle were deeper causes", 2],
          ["Against: the Company saw the Ndebele state as an obstacle; the Victoria Agreement shows planning", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "The Victoria incident was important because it was the immediate trigger. Jameson used the clash near Fort Victoria in July 1893 to argue that the Ndebele threatened the Company and its settlers.\n\nHowever, there were deeper causes. The Company had found less gold in Mashonaland than it hoped, so settlers and shareholders looked to the land, cattle and possible minerals of Matabeleland. The Company also saw an independent, armed Ndebele state as an obstacle to its control. The speed with which volunteers were recruited under the Victoria Agreement, with promises of land and cattle, suggests that war was planned.\n\nI therefore agree only to a small extent: the Victoria incident was the trigger, but the main causes were the Company's economic ambitions and its wish to remove the Ndebele state.",
      }),
    ],
    hints: ["Separate the trigger from the deeper causes."],
    explanation: "Describe (a) and evaluate (b) the causes of the war.",
  });

  b.card("FACT", "Years of the Anglo-Ndebele War?", "1893-94.");
  b.card("DEFINITION", "Victoria incident", "July 1893 clash near Fort Victoria between an Ndebele force and Company forces, used as an excuse for war.");
  b.card("DEFINITION", "Victoria Agreement", "1893 promise to volunteers of land, gold claims and loot cattle in Matabeleland.");
  b.card("FACT", "Two main battles of the war?", "Shangani (late October 1893) and Bembesi (1 November 1893).");
  b.card("FACT", "What was the Shangani Patrol?", "Major Allan Wilson's patrol, destroyed by Ndebele soldiers at the Shangani River in December 1893.");
  b.card("FACT", "Reserves created for the Ndebele in 1894?", "Gwaai and Shangani.");
  b.card("CONCEPT", "Why did the Ndebele lose the war?", "Maxim guns and defensive laagers broke massed attacks; Company had unified command.");
  b.card("CONCEPT", "Trigger or cause? The Victoria incident.", "Trigger: deeper causes were gold disappointment, desire for land and cattle, and wish to remove the Ndebele state.");
  b.card("CONCEPT", "Effects of the war on the Company?", "Gained Matabeleland for settlers and investment; but harsh rule led to the 1896 rising.");
});
