// W3b: Ownership of and access to natural resources (her.heritage.resource-ownership).
// Reviewer notes: CAMPFIRE 1989; Indigenisation and Economic Empowerment Act 2007 (51% rule, later narrowed by
// amendments from 2018: described in outline only); Water Act 1998. Effectiveness is contested: no MCQ hinges on it.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.heritage.resource-ownership", { file: "heritage/resource-ownership", keyPrefix: "heritage.resource-ownership" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did the CAMPFIRE programme begin?",
    options: [
      ["1989", "Correct: CAMPFIRE began in 1989."],
      ["1930", "1930 is the year of the Land Apportionment Act."],
      ["2007", "2007 is the year of the Indigenisation and Economic Empowerment Act."],
      ["1998", "1998 is the year of the Water Act."],
    ],
    answer: "A",
    explanation: "CAMPFIRE (Communal Areas Management Programme for Indigenous Resources) began in 1989.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Under CAMPFIRE, which body manages wildlife in communal areas and shares the income with communities?",
    options: [
      ["the rural district council", "Correct: councils were given authority over wildlife in communal areas."],
      ["the Zimbabwe Electoral Commission", "ZEC runs elections."],
      ["the Grain Marketing Board", "The GMB buys and stores grain."],
      ["the Registrar General's office", "The Registrar General issues birth certificates and IDs."],
    ],
    answer: "A",
    explanation: "Rural district councils manage the wildlife and pass a share of the income to wards and villages.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What did the Indigenisation and Economic Empowerment Act of 2007 mainly aim to do?",
    options: [
      ["increase indigenous Zimbabweans' ownership of businesses, including mines", "Correct: it required majority indigenous ownership of larger businesses."],
      ["divide land between races as the colonial laws had done", "This describes the colonial land laws."],
      ["ban all foreign tourists from national parks", "The Act did not deal with tourists."],
      ["return mineral rights to the British South Africa Company, as in colonial times", "The BSAC lost its mineral rights in the colonial era."],
    ],
    answer: "A",
    explanation: "The Act required most larger businesses to be at least 51 per cent owned by indigenous Zimbabweans; the rule was later narrowed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What change did the Water Act of 1998 make?",
    options: [
      ["Water could no longer be privately owned; users obtain permits from the state", "Correct: the Act ended private ownership of water."],
      ["All rivers were sold to the owners of the largest farms", "This was closer to the colonial situation the Act ended."],
      ["Water was made free of all rules, so anyone could dam or divert any river they liked", "Users still need permits."],
      ["Only towns were allowed to use river water", "Rural users also have access."],
    ],
    answer: "A",
    explanation: "Under the Water Act (1998), water is held by the state and allocated by permit, ending the link between land ownership and water rights.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Under colonial game laws, what was the position of most Africans regarding hunting?",
    options: [
      ["Hunting was made illegal for them in most cases", "Correct: game laws excluded Africans from hunting."],
      ["They were paid by the state to hunt on settler farms", "This was not the position."],
      ["They owned all the national parks", "Parks were run by the colonial state."],
      ["They could hunt anywhere without restriction", "Game laws restricted African hunting."],
    ],
    answer: "A",
    explanation: "Colonial game laws made hunting by Africans illegal in most cases, cutting them off from a traditional resource.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Residents of a CAMPFIRE ward begin reporting poachers to the authorities. Which **best** explains the change in their behaviour?",
    options: [
      ["Wildlife now earns income for the ward, so residents protect it", "Correct: sharing benefits gives people a reason to conserve."],
      ["The council has banned cattle from the ward", "Nothing suggests such a ban, and it would not explain reporting poachers."],
      ["Poaching has become legal for everyone in the district", "Poaching remains illegal."],
      ["The wildlife has all left the area", "Then there would be nothing to protect."],
    ],
    answer: "A",
    hints: ["What do residents gain if the animals survive?"],
    explanation: "When communities share in the income from wildlife, they gain a reason to protect it.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is meant by **elite capture** of the benefits of resource policies?",
    options: [
      ["A small, well-connected group takes most of the benefits meant for many", "Correct: benefits are captured by a few."],
      ["Wild animals are captured and moved to another park", "This is about wildlife translocation, not policy benefits."],
      ["Ordinary villagers receive all of the income", "That is the opposite of elite capture."],
      ["Foreign companies are forced to leave the country and sell their mines", "That is not the meaning."],
    ],
    answer: "A",
    hints: ["'Elite' means a small powerful group."],
    explanation: "Elite capture means a small group with power or connections takes most of the benefits intended for communities.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which piece of evidence would **best** show that a community share ownership trust is benefiting ordinary residents?",
    options: [
      ["Published accounts of spending on a clinic and boreholes chosen by residents", "Correct: transparent spending on projects residents chose is good evidence."],
      ["A speech by a company manager saying the trust is a success", "A claim is weaker evidence than records of what was done."],
      ["A large signboard announcing the trust at the mine gate", "A signboard shows the trust exists, not that it benefits people."],
      ["A newspaper photograph of officials at the launch ceremony", "A launch does not show later benefits."],
    ],
    answer: "A",
    hints: ["Which evidence shows what actually happened to the money?"],
    explanation: "Records of actual spending on projects chosen by residents show benefit more reliably than announcements or speeches.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under the Land Apportionment Act of 1930, most of the best land was reserved for white settlers.",
    answer: true,
    explanation: "True. The Act divided land by race, reserving most of the best-watered, fertile land for settlers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Access to a resource always means owning it.",
    answer: false,
    explanation: "False. People can have access to a resource or its benefits (for example CAMPFIRE income) without owning it.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each measure with the resource it mainly concerns.",
    pairs: [
      ["CAMPFIRE", "wildlife"],
      ["the Water Act of 1998", "rivers and underground water"],
      ["community share ownership trusts", "minerals and mining"],
      ["community woodlots", "forests and firewood"],
    ],
    hints: ["Look for a key word in each measure's name or purpose."],
    explanation: "CAMPFIRE: wildlife; Water Act: water; share ownership trusts: mining; woodlots: forests.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The Indigenisation and Economic Empowerment Act was passed in {{blank:a}}. It required larger businesses to be at least {{blank:b}} per cent owned by indigenous Zimbabweans.",
    blanks: [
      { id: "a", accepted: ["2007"], choices: ["2007", "1989", "1998", "2013"] },
      { id: "b", accepted: ["51"], choices: ["51", "25", "75", "100"] },
    ],
    explanation: "The 2007 Act set a 51 per cent indigenous ownership requirement, later narrowed by amendments.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Write out the full name of CAMPFIRE.",
    accepted: [
      "Communal Areas Management Programme for Indigenous Resources",
      "Communal Area Management Programme for Indigenous Resources",
      "Communal Areas Management Program for Indigenous Resources",
    ],
    wrong: ["Community Animal Protection Fund"],
    explanation: "CAMPFIRE stands for the Communal Areas Management Programme for Indigenous Resources.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how ownership of natural resources was organised during the colonial era, referring to **two** resources.",
    points: [
      ["Land: divided by race under the Land Apportionment Act (1930) and Land Tenure Act (1969); best land for settlers, Africans in reserves", 2],
      ["Another resource described, e.g. minerals (BSAC and later the colonial state held mineral rights; mines owned by foreign/settler companies) or wildlife (game laws barred African hunting) or water (rights tied to land ownership)", 2],
    ],
    modelAnswer: "Land was divided by race under the Land Apportionment Act of 1930 and the Land Tenure Act of 1969; most of the best land went to white settlers and Africans were crowded into reserves. Mineral rights were claimed by the British South Africa Company and later held by the colonial state, and large mines were owned by foreign and settler companies, with Africans employed as labourers.",
    hints: ["Say who owned the resource and how Africans were excluded."],
    explanation: "Two marks per resource: who owned it and how Africans were excluded.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which CAMPFIRE was meant to benefit both communities and wildlife.",
    points: [
      "Identifies income for communities from hunting and tourism",
      "Develops: wards use it for boreholes, classrooms, clinics or school fees, improving local living standards",
      "Identifies conservation: communities gain a reason to protect wildlife",
      "Develops: residents who benefit report poachers and tolerate animals, so wildlife numbers can be maintained",
    ],
    modelAnswer: "CAMPFIRE lets rural district councils earn income from safari hunting and tourism and pass much of it to wards, which spend it on boreholes, classrooms, clinics or school fees, improving local living standards. Because wildlife now earns money for them, residents have a reason to protect it, for example by reporting poachers, so animal numbers can be maintained.",
    hints: ["One benefit for people, one for animals."],
    explanation: "One mark for each way and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Residents near a fictional mine in Zvishavane district say they see little benefit from the mine. Suggest **two** measures that could help them benefit more, and explain each.",
    points: [
      "Suggests a properly funded community trust or development fund with published accounts",
      "Explains that transparency lets residents see and influence how money is spent, reducing elite capture",
      "Suggests employing and training local people / buying local goods / building roads and clinics",
      "Explains that jobs, skills and infrastructure spread the benefits to ordinary households",
    ],
    modelAnswer: "The mine and council could set up a properly funded community development fund that publishes its accounts, so residents can see and influence how the money is spent and a few people cannot take it. The mine could also employ and train local people and buy goods from local suppliers, so that jobs and income reach ordinary households.",
    hints: ["Think of transparency and of local jobs."],
    explanation: "One mark for each measure and one for its explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "two comments recorded at a fictional ward meeting in the Zambezi valley, 2026",
      "Resident 1: \"Since our ward joined the wildlife programme, the money has paid for a borehole and school fees for orphans. We now see elephants as our wealth.\"\nResident 2: \"That is true, but last season elephants ate half my maize, and the compensation was very small. Some years the hunting money hardly comes at all.\"") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which programme are the residents most probably discussing?",
        options: [
          ["CAMPFIRE", "Correct: income from wildlife shared with a ward."],
          ["the Water Act", "The comments are about wildlife income, not water permits."],
          ["the Land Tenure Act", "That was a colonial land law of 1969."],
          ["the Unity Accord", "The Unity Accord was a political agreement of 1987."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **one** benefit and **one** problem of the programme mentioned in the source.",
        points: ["Benefit: income paid for a borehole / school fees for orphans / changed attitudes to elephants", "Problem: crop damage by elephants with little compensation / income varies from year to year"],
        modelAnswer: "Benefit: the income paid for a borehole and school fees. Problem: elephants destroyed crops and compensation was small.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Using the source and your own knowledge, assess how far the programme has improved local people's access to the benefits of wildlife.",
        points: [
          "Improved access: the community shares income it never had under colonial game laws (source: borehole, fees)",
          "Changed attitudes: wildlife seen as wealth, which supports conservation",
          "Limits: human-wildlife conflict and small compensation (source)",
          "Limits: income depends on tourism and hunting markets / councils may keep a large share",
          "Supported judgement, e.g. access improved but benefits are uneven",
        ],
        modelAnswer: "The programme has improved access: under colonial game laws Africans could not hunt or benefit from wildlife, but now the ward earns income that paid for a borehole and school fees, and residents see elephants as wealth. However, the benefits are limited. Elephants destroy crops and compensation is small, and income rises and falls with tourism and hunting; councils may also keep a large share. Overall, the programme has widened access to a fair extent, but the benefits are uneven and some households bear heavy costs.",
      }),
    ],
    hints: ["In (c), compare with the colonial position, then weigh the two residents' views."],
    explanation: "A source-based practice item on CAMPFIRE and access to wildlife benefits.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about access to natural resources since 1980.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Outline **two** government measures since 1980 to improve indigenous people's access to natural resources.",
        points: [
          ["One measure outlined, e.g. CAMPFIRE (1989): councils manage wildlife and share income with communities", 2],
          ["A second measure outlined, e.g. the Indigenisation and Economic Empowerment Act (2007, 51% indigenous ownership), community share ownership trusts, the Water Act (1998), support for small-scale miners", 2],
        ],
        modelAnswer: "CAMPFIRE, from 1989, gave rural district councils authority over wildlife in communal areas, and they share income from hunting and tourism with communities. The Indigenisation and Economic Empowerment Act of 2007 required larger businesses, including mines, to be at least 51 per cent owned by indigenous Zimbabweans.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Ordinary Zimbabweans have benefited from efforts to widen access to natural resources.\" How far do you agree?",
        points: [
          ["For: wider indigenous ownership; small-scale miners; CAMPFIRE income for projects; water reform", 2],
          ["Against: elite capture and corruption; trusts received little; residents near some mines complain of little benefit", 2],
          ["Against: reduced investment; illegal mining damage; human-wildlife conflict", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some ordinary Zimbabweans have benefited. Many more indigenous people own mines and businesses than in 1980, and many small-scale miners earn a living from gold. In some districts CAMPFIRE income has built boreholes, clinics and classrooms, and the Water Act ended the link between land ownership and water rights.\n\nHowever, the benefits have been uneven. Often a small, well-connected group has gained most, and there have been cases of corruption. Some community share ownership trusts received far less than promised, and people living near some mines say they have seen little benefit. Critics argue that the 51 per cent rule discouraged investment that could have created jobs. Illegal mining has damaged land and rivers, and villagers in wildlife areas suffer crop losses.\n\nI agree only partly. The efforts widened access in law and helped some communities, but many ordinary people have gained little because of elite capture, weak management and economic problems.",
      }),
    ],
    hints: ["In (b), separate who was meant to benefit from who actually benefited."],
    explanation: "A practice evaluative item on access to natural resources since 1980.",
  });

  b.card("DEFINITION", "Ownership (of a resource)", "The legal right to possess, use and control a resource and decide who else may use it.");
  b.card("DEFINITION", "Access (to a resource)", "The ability to use a resource or benefit from it, whether or not one owns it.");
  b.card("DEFINITION", "Indigenisation", "Policies that increase the share of the economy owned and controlled by indigenous Zimbabweans.");
  b.card("FACT", "What does CAMPFIRE stand for and when did it begin?", "Communal Areas Management Programme for Indigenous Resources; 1989.");
  b.card("FACT", "What did the Indigenisation and Economic Empowerment Act (2007) require?", "Most larger businesses to be at least 51 per cent owned by indigenous Zimbabweans (later narrowed by amendments).");
  b.card("FACT", "What did the Water Act of 1998 change?", "It ended private ownership of water; water is held by the state and allocated by permit.");
  b.card("CONCEPT", "How was wildlife controlled in the colonial era?", "Game laws made hunting by Africans illegal in most cases; parks were run by the colonial state.");
  b.card("DEFINITION", "Elite capture", "When a small, well-connected group takes most of the benefits meant for many people.");
  b.card("CONCEPT", "Give two benefits and two problems of efforts to widen access since 1980.", "Benefits: wider indigenous ownership; community income (CAMPFIRE). Problems: elite capture and corruption; human-wildlife conflict or reduced investment.");
});
