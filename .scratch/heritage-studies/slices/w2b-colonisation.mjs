// W2b: colonisation: the Berlin Conference, treaties and occupation (her.colonisation.colonisation).
import { concept, P, source, table, timeline, levels } from "../lib.mjs";

concept("her.colonisation.colonisation", { file: "colonisation/colonisation", keyPrefix: "colonisation.colonisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the **Rudd Concession** signed?",
    options: [
      ["30 October 1888", "Correct."],
      ["29 October 1889", "This is the date of the Royal Charter."],
      ["12 September 1890", "This is when the Pioneer Column reached Fort Salisbury."],
      ["11 November 1965", "This is the date of UDI."],
    ],
    answer: "A",
    explanation: "Rudd Concession: 30 October 1888. Royal Charter: 29 October 1889. Fort Salisbury: 12 September 1890.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who called the **Berlin Conference** on the partition of Africa?",
    options: [
      ["Otto von Bismarck", "Correct: the German Chancellor called it."],
      ["Cecil Rhodes", "Rhodes was a businessman and politician in the Cape."],
      ["Queen Victoria", "Britain attended, but Germany called the conference."],
      ["Lobengula", "No African ruler was invited."],
    ],
    answer: "A",
    explanation: "Bismarck called the conference to manage European competition in Africa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did Lobengula agree to in the **Moffat Treaty** (February 1888)?",
    options: [
      ["Not to make treaties with other foreign powers without British approval", "Correct: it placed Matabeleland in the British sphere."],
      ["To give all minerals in his kingdom to Rhodes's agents", "That was the Rudd Concession."],
      ["To allow the Pioneer Column to pass through and occupy Mashonaland", "No treaty said this; the column came under the Charter."],
      ["To sign a treaty of friendship with the Transvaal", "That was the Grobler Treaty of 1887."],
    ],
    answer: "A",
    explanation: "The Moffat Treaty kept rival powers such as the Transvaal, Portugal and Germany out.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the principle of **effective occupation** require?",
    options: [
      ["Actual control of a territory before claiming it", "Correct: officials, police or settlers had to be present."],
      ["Permission from the African ruler for every claim", "African rulers were not consulted at Berlin."],
      ["A vote of all European powers on each colony", "There was no vote on each colony."],
      ["Payment of compensation to African peoples", "The conference made no such rule."],
    ],
    answer: "A",
    explanation: "Powers had to show real control, which sped up treaty-making and occupation.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which company received the **Royal Charter** in 1889?",
    options: [
      ["The British South Africa Company", "Correct: the BSAC, led by Cecil Rhodes."],
      ["The London Missionary Society at Inyati", "The LMS was a missionary society."],
      ["The Dutch East India Company", "That company was at the Cape much earlier."],
      ["The Grain Marketing Board", "The GMB is a modern Zimbabwean body."],
    ],
    answer: "A",
    explanation: "The Charter of 29 October 1889 gave the BSAC power to govern and develop the territory.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Lobengula **repudiate** the Rudd Concession?",
    options: [
      ["The written terms did not match the verbal promises made", "Correct: he said he had been deceived."],
      ["He had been paid too much money each month", "Payment was not the reason."],
      ["The Berlin Conference ordered him to reject it", "The Berlin Conference gave no orders to Lobengula."],
      ["The concession gave the minerals to the Portuguese", "The rights went to Rhodes's agents."],
    ],
    hints: ["Compare what was said with what was written."],
    answer: "A",
    explanation: "Promises that only a few men would come and obey his laws were not in the document.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why did the Pioneer Column take a route **east of Bulawayo** through Mashonaland?",
    options: [
      ["To avoid direct conflict with the Ndebele army", "Correct: it avoided the centre of Ndebele power."],
      ["Because Bulawayo had already been destroyed", "Bulawayo was destroyed in 1893, not 1890."],
      ["To visit the Mutapa capital on the Zambezi", "The Mutapa state had long declined."],
      ["Because the Berlin Conference had fixed the route north", "The conference fixed no routes in Zimbabwe."],
    ],
    hints: ["Where were the Ndebele regiments?"],
    answer: "A",
    explanation: "Passing through Mashonaland avoided a clash with the Ndebele regiments.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which was the **most important** document in allowing the BSAC to occupy Zimbabwe?",
    options: [
      ["The Royal Charter, built on the Rudd Concession", "Correct: the Charter gave the Company power to govern and occupy."],
      ["The Grobler Treaty between Lobengula and the Transvaal", "This treaty favoured the Transvaal, not the BSAC."],
      ["The Lancaster House Agreement", "That agreement was signed in 1979."],
      ["The Unity Accord", "The Unity Accord was signed in 1987."],
    ],
    hints: ["Which document gave the Company the right to govern?"],
    answer: "A",
    explanation: "The Rudd Concession was used to obtain the Royal Charter, which gave the BSAC power to occupy and govern.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "African rulers were invited to the Berlin Conference to discuss their territories.",
    answer: false,
    explanation: "False. No African ruler was invited.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Pioneer Column built forts such as Fort Tuli, Fort Victoria and Fort Charter on its way north.",
    answer: true,
    explanation: "True. It reached Fort Salisbury on 12 September 1890.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each document with its date.",
    pairs: [
      ["Grobler Treaty", "1887"],
      ["Moffat Treaty", "February 1888"],
      ["Rudd Concession", "30 October 1888"],
      ["Royal Charter", "29 October 1889"],
    ],
    explanation: "Grobler 1887; Moffat February 1888; Rudd 30 October 1888; Charter 29 October 1889.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The Pioneer Column was guided by the hunter {{blank:a}}. It reached Fort Salisbury, now {{blank:b}}, on 12 September 1890.",
    blanks: [
      { id: "a", accepted: ["Frederick Selous"], choices: ["Frederick Selous", "Charles Rudd", "Pieter Grobler", "Robert Moffat"] },
      { id: "b", accepted: ["Harare"], choices: ["Harare", "Bulawayo", "Masvingo", "Gweru"] },
    ],
    explanation: "Selous guided the column; Fort Salisbury is now Harare.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the rush by European powers to claim African territory in the late nineteenth century? (three words, beginning \"Scramble…\")",
    accepted: ["Scramble for Africa", "the Scramble for Africa"],
    wrong: ["Berlin Conference"],
    explanation: "The **Scramble for Africa**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Outline **four** resolutions of the Berlin Conference.",
    points: ["Notify other powers of claims", "Effective occupation", "Free navigation on the Congo and Niger / free trade in the Congo basin", "End the slave trade"],
    modelAnswer: "Powers had to notify each other of claims; claims needed effective occupation; there was free navigation on the Congo and Niger; and powers agreed to end the slave trade.",
    explanation: "One mark per resolution.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** causes of the colonisation of Africa.",
    points: [
      "Economic", "Developed: Europe's industries needed raw materials, markets and investment, e.g. hopes of gold north of the Limpopo",
      "Political", "Developed: rivalry and prestige; Britain wanted to stop the Boers, Germans and Portuguese",
      "Strategic / social", "Developed: protect routes; Cape-to-Cairo; surplus population and settlers seeking land",
    ],
    modelAnswer: "Economically, Europe's factories needed raw materials and markets, and investors hoped to find gold north of the Limpopo. Politically, European powers competed for prestige, and Britain wanted to keep the Boers, Germans and Portuguese out of the interior. Socially, Europe had surplus population and settlers wanted land, and Europeans justified this with 'civilising' ideas.",
    hints: ["Economic, political, strategic and social."],
    explanation: "Two marks per developed cause.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which Lobengula responded to the threat of colonisation.",
    points: [
      "Diplomacy / repudiation",
      "Developed: he rejected the Rudd Concession and sent izinduna to London to protest",
      "Restraint",
      "Developed: he held back his regiments in 1890 to deny the Company an excuse for war",
    ],
    modelAnswer: "Lobengula used diplomacy: he repudiated the Rudd Concession, saying he had been deceived, and sent two izinduna to London to protest to Queen Victoria. He also showed restraint, holding back his regiments when the Pioneer Column passed in 1890, so the Company would have no excuse for war.",
    hints: ["Diplomacy and military restraint."],
    explanation: "Two marks per developed response.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Study the list of events, given in the order in which they happened.\n\n" + table(["Order", "Event"], [
      ["First", "Berlin Conference"],
      ["Second", "Grobler Treaty"],
      ["Third", "Moffat Treaty"],
      ["Fourth", "Rudd Concession"],
      ["Fifth", "Royal Charter granted to the BSAC"],
      ["Sixth", "Pioneer Column reaches Fort Salisbury"],
    ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which event in the list **alarmed** the British into making their own treaty with Lobengula?",
        options: [
          ["The Grobler Treaty", "Correct: the Transvaal treaty prompted the Moffat Treaty."],
          ["The Royal Charter", "The Charter came after the British treaty."],
          ["The Pioneer Column", "The column came after the treaties."],
          ["The Rudd Concession", "The Rudd Concession was itself British-backed."],
        ],
        answer: "A",
        explanation: "The Grobler Treaty (1887) made Britain fear Boer expansion; the Moffat Treaty followed in 1888.",
      }),
      P.tf({
        label: "(b)",
        stem: "The Royal Charter was granted before the Rudd Concession was signed.",
        answer: false,
        explanation: "False. The Rudd Concession (30 October 1888) came first; Rhodes used it to obtain the Royal Charter (29 October 1889).",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Using the list, explain how **three** of these events led step by step to the occupation of Zimbabwe.",
        points: [
          "Berlin Conference", "Developed: effective occupation rule pushed Britain to secure and occupy territory",
          "Moffat Treaty / Rudd Concession", "Developed: kept rivals out and gave mineral rights to Rhodes's agents",
          "Royal Charter", "Developed: gave the BSAC power to govern and send the Pioneer Column",
        ],
        modelAnswer: "The Berlin Conference required effective occupation, so Britain needed to secure and occupy territory. The Moffat Treaty kept rival powers out, and the Rudd Concession gave Rhodes's agents the mineral rights. Rhodes used the concession to obtain the Royal Charter, which gave the BSAC power to govern and to send the Pioneer Column to Fort Salisbury.",
      }),
    ],
    hints: ["Each step made the next possible."],
    explanation: "Using a chronological list to explain the steps to occupation.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the Rudd Concession.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Outline the terms of the Rudd Concession.",
        points: ["Exclusive rights to all metals and minerals in the kingdom", "Power to do whatever was necessary to win them", "Lobengula promised £100 a month", "and 1,000 rifles, 100,000 rounds of ammunition and a steamboat (or £500)"],
        modelAnswer: "Rudd, Maguire and Thompson received exclusive rights to all metals and minerals and the power to do whatever was necessary to win them. In return Lobengula was promised £100 a month, 1,000 rifles, 100,000 rounds of ammunition and a steamboat on the Zambezi or £500.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Lobengula was deceived into signing the Rudd Concession.\" How far do you agree?",
        points: [
          ["For: verbal promises (few men, obey his laws) were left out of the written document; interpreter and missionaries reassured him", 2],
          ["For: he repudiated it and protested in London, showing he felt deceived", 2],
          ["Against / qualification: he was under great pressure and may have hoped the concession would protect him from rivals; he received payment and rifles", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "There is strong evidence that Lobengula was deceived. He was told that only a few men would come to dig and that they would obey his laws, but these promises were not written into the document. The missionary interpreter and others reassured him about its meaning. When he learned what it said, he repudiated it and sent izinduna to London to protest.\n\nHowever, Lobengula was a skilled diplomat under heavy pressure from many concession seekers. Some historians suggest he hoped that granting rights to one powerful group would keep others away and protect his kingdom, and he accepted payment and rifles.\n\nOverall, I largely agree: he made a calculated choice under pressure, but the gap between the spoken promises and the written terms means he did not agree to what the Company later did.",
      }),
    ],
    hints: ["In (b), consider what he was told and what he may have hoped."],
    explanation: "Outline (a) and evaluate (b) the Rudd Concession.",
  });

  b.card("FACT", "Date of the Rudd Concession?", "30 October 1888.");
  b.card("FACT", "Date of the Royal Charter?", "29 October 1889 (to the British South Africa Company).");
  b.card("FACT", "When did the Pioneer Column reach Fort Salisbury?", "12 September 1890.");
  b.card("FACT", "What did the Moffat Treaty (1888) do?", "Lobengula agreed not to deal with other foreign powers without British approval.");
  b.card("DEFINITION", "Effective occupation", "Berlin Conference rule: a power must actually control a territory to claim it.");
  b.card("DEFINITION", "Royal Charter", "A Crown document giving a company power to govern, make laws, keep police and develop a territory.");
  b.card("CONCEPT", "Why did Lobengula repudiate the Rudd Concession?", "The written terms did not include the verbal promises (few men, obey his laws); he said he had been deceived.");
  b.card("CONCEPT", "Four types of causes of colonisation?", "Economic, political, strategic and social.");
  b.card("FACT", "Who were the three Rudd Concession agents?", "Charles Rudd, Rochfort Maguire and Francis Thompson, acting for Cecil Rhodes.");
});
