// W2b: ahist.orgs.sadc (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.orgs.sadc", { file: "orgs/sadc", keyPrefix: "orgs.sadc" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was the Southern African Development Coordination Conference (SADCC) founded?",
    options: [
      ["1980", "Correct: at Lusaka on 1 April 1980."],
      ["1963", "This is the year of the founding of the OAU."],
      ["1992", "This is the year in which SADC replaced SADCC."],
      ["2002", "This is the year in which the African Union was launched."],
    ],
    answer: "A",
    explanation: "SADCC was founded at Lusaka on 1 April 1980.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main aim of SADCC when it was formed?",
    options: [
      ["To reduce dependence on apartheid South Africa", "Correct: it focused on transport, energy and food projects."],
      ["To create a single currency for the whole of southern Africa at once", "A currency union was not an early aim."],
      ["To form a military alliance that would invade South Africa", "SADCC was an economic body."],
      ["To join the countries of Europe in a customs union straight away", "It was a regional body of African states."],
    ],
    answer: "A",
    explanation: "SADCC aimed to reduce dependence on South Africa and to co-ordinate development projects.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where is the Secretariat of SADC located?",
    options: [
      ["Gaborone, in Botswana", "Correct: it has been there since 1982."],
      ["Harare, in Zimbabwe", "ARIPO is headquartered in Harare, not SADC."],
      ["Lusaka, in Zambia", "Lusaka hosted the founding summit of 1980."],
      ["Pretoria, in South Africa", "South Africa joined SADC only in 1994."],
    ],
    answer: "A",
    explanation: "The Secretariat is in Gaborone, Botswana.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Which change from SADCC to SADC does the Windhoek Treaty of 1992 represent?",
    options: [
      ["From a conference co-ordinating projects to a community aiming at integration", "Correct: it created a legal community."],
      ["From a community with a treaty to an informal meeting of foreign ministers", "SADC was the more formal body."],
      ["From a body based in Gaborone to a new body based in the city of Windhoek", "The Secretariat stayed in Gaborone."],
      ["From a body of nine states to a group of exactly the same nine states", "Membership grew."],
    ],
    answer: "A",
    hints: ["The new name used 'community' instead of 'conference'."],
    explanation: "SADC was a treaty-based community with the aim of deeper integration; SADCC had been a conference for co-ordinating projects.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the difference between a free trade area and a customs union?",
    options: [
      ["A customs union adds a common external tariff to the removal of tariffs inside", "Correct: members also share a tariff on outside goods."],
      ["A free trade area allows free movement of labour, but a customs union does not", "That describes a common market."],
      ["A customs union has no tariffs at all, but a free trade area has high tariffs", "Neither description is correct."],
      ["A free trade area is a political union with one government for all members", "That describes political union."],
    ],
    answer: "A",
    hints: ["Think about what members do about imports from outside the group."],
    explanation: "Both remove tariffs among members; a customs union also adopts a common tariff on imports from outside.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the end of apartheid change the purpose of regional co-operation in southern Africa?",
    options: [
      ["The aim of reducing dependence on South Africa lost its basis, so integration became the goal", "Correct: South Africa joined SADC in 1994."],
      ["South Africa declared war on all of its neighbours in the year 1994 and the region split", "South Africa joined SADC in 1994."],
      ["Every member left SADCC and the whole organisation was abolished outright in 1990", "SADCC became SADC."],
      ["Namibia became part of South Africa and left the region for good in the early 1990s", "Namibia became independent in 1990."],
    ],
    answer: "A",
    hints: ["Think of South Africa joining SADC."],
    explanation: "With apartheid ending, regional co-operation shifted from opposing South African dominance to integration including South Africa.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of these is a problem that has slowed SADC integration?",
    options: [
      ["Overlapping membership of groupings such as COMESA and the EAC", "Correct: it complicates tariffs and rules."],
      ["The fact that all members have economies of exactly the same size", "Economies differ widely in size."],
      ["The absence of any shared border between two members", "Many members share borders."],
      ["The refusal of every member to attend meetings of the Summit", "The Summit meets each year."],
    ],
    answer: "A",
    hints: ["Think about members who belong to several groups."],
    explanation: "Overlapping memberships, the dominance of South Africa's economy, poor infrastructure and political differences have slowed integration.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which point best supports the view that SADC has made progress towards integration?",
    options: [
      ["A Free Trade Area was launched in 2008, removing most tariffs among participants", "Correct: it shows a real stage achieved."],
      ["The customs union that was planned for 2010 has still not been completed by members", "This shows delay, not progress."],
      ["Members belong to several overlapping groups with different rules and tariffs", "This shows a problem."],
      ["South Africa's economy is much larger than those of most of the other members", "This shows a difficulty."],
    ],
    answer: "A",
    hints: ["Look for an achievement."],
    explanation: "The launch of the Free Trade Area in 2008 was a concrete step; the customs union and later stages have been delayed.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "SADCC had nine founding member states in 1980.", answer: true,
    explanation: "The nine were Angola, Botswana, Lesotho, Malawi, Mozambique, Swaziland, Tanzania, Zambia and Zimbabwe.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "South Africa was a founding member of SADCC in 1980.", answer: false,
    explanation: "SADCC was formed to reduce dependence on apartheid South Africa, which joined SADC only in 1994.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Under the SADCC system each member was given responsibility for a sector, and Zimbabwe co-ordinated food security.", answer: true,
    hints: ["Think of how SADCC shared the work."],
    explanation: "SADCC was decentralised: Zimbabwe co-ordinated food security, Mozambique transport and communications, and Angola energy.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Free trade area", "Members remove tariffs on trade among themselves"],
      ["Customs union", "A free trade area with a common external tariff"],
      ["Common market", "A customs union with free movement of labour and capital"],
      ["RISDP", "SADC's plan for the stages of integration"],
    ],
    explanation: "These are the terms used in regional integration.",
  });
  {
    const events = [
      "SADCC is founded at Lusaka",
      "The Windhoek Treaty creates SADC",
      "South Africa joins SADC",
      "The SADC Free Trade Area begins",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1980, 1992, 1994 and 2008."],
      explanation: "1980; 1992; 1994; 2008.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "SADC was created by the {{blank:a}} Treaty of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Windhoek"], choices: ["Windhoek", "Lusaka", "Versailles", "Lancaster House"] },
      { id: "b", accepted: ["1992"], choices: ["1980", "1992", "2002", "2008"] },
    ],
    explanation: "The Windhoek Declaration and Treaty of 17 August 1992.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which country joined SADC in 1994 after its first democratic elections?",
    accepted: ["South Africa", "south africa", "RSA"],
    wrong: ["Namibia"],
    explanation: "**South Africa** joined in 1994.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the aims of SADCC when it was founded in 1980.",
    points: ["To reduce economic dependence, especially on South Africa", "To build links for regional integration", "To mobilise resources for national and regional projects", "To secure international co-operation and aid for development"],
    modelAnswer: "SADCC aimed to reduce the dependence of its members, especially on South Africa, and to build links for regional co-operation. It aimed to mobilise resources for national and regional projects and to secure international co-operation and aid for development.",
    explanation: "One mark for each aim described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why SADCC was formed in 1980.",
    points: [["Most of the states depended on South African ports, railways and trade, and South Africa could use this dependence as a weapon", 2], ["The independence of Zimbabwe and the Frontline States' wish for economic as well as political liberation gave a chance for co-operation", 2]],
    hints: ["Give a reason from the economy and one from politics."],
    modelAnswer: "Most of the founding states depended on South African ports, railways and trade, and South Africa could use this dependence as a weapon. The independence of Zimbabwe and the wish of the Frontline States for economic as well as political liberation gave them the chance to co-operate.",
    explanation: "Credit developed reasons.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain two problems that have limited regional integration in SADC.",
    points: [["South Africa's economy is much larger than the others, so benefits and costs of integration are unequal", 2], ["Overlapping membership of other groups, poor transport and energy links and reluctance to give up sovereignty slow decisions and implementation", 2]],
    hints: ["Choose one economic problem and one political or organisational problem."],
    modelAnswer: "South Africa's economy is much larger than those of the others, so the benefits and costs of integration are unequal. Overlapping membership of other groups, poor transport and energy links and reluctance to give up sovereignty also slow decisions and implementation.",
    explanation: "Credit developed problems.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an extract from a speech by a fictional southern African leader at a summit in 1981",
        "Our railways run to the south because the old masters laid them so. We shall lay new lines to our own ports, share our electricity, and feed ourselves. Let no one say that we are poor; we are dependent, and dependence can be ended."),
      "",
      source("Source B", "a report by a fictional economist for a regional business association, 2012",
        "The tariffs among our members have fallen, but trade among us is still a small share of our total trade. A trader may be asked to follow three sets of rules for one consignment, and roads and border posts remain slow. Integration on paper is not yet integration in practice."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What plans does the leader in Source A describe?", points: ["New railway lines to their own ports", "Sharing electricity and feeding themselves / ending dependence"] }),
      P.manual({ label: "(b)", marks: 2, stem: "What problems of regional trade does Source B describe?", points: ["Trade among members is still a small share of total trade", "Traders face different sets of rules, and slow roads and border posts"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How far do the sources agree about regional co-operation?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Agree that co-operation aims to link the economies of the region and reduce external dependence", 1], ["Differ in tone: A is confident about ending dependence; B reports slow progress in practice", 1], ["Provenance: A is a political speech at the beginning of SADCC; B an economist's report thirty years later", 1], ["Own knowledge: SADCC improved transport corridors, and SADC launched a free trade area in 2008 but the customs union is delayed", 1]], modelAnswer: "The sources agree that regional co-operation is meant to link the economies of the region and reduce dependence. They differ in tone and time. Source A, a political speech at the beginning of SADCC, is confident that dependence can be ended, while Source B, an economist's report thirty years later, shows that trade among members is small and the rules and roads are still a problem. My own knowledge supports both: SADCC improved transport corridors, and SADC launched a free trade area in 2008, but the customs union has been delayed." }),
    ],
    hints: ["For (c), notice that the sources are written about thirty years apart."],
    explanation: "Both sources are invented: a leader's speech and an economist's report.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent has SADC been successful in promoting regional co-operation and integration since 1992?",
    levels: levels(12),
    points: [
      ["Aims and stages: Windhoek Treaty, RISDP, free trade area, customs union, common market, monetary union", 2],
      ["Achievements: Free Trade Area in 2008, protocols, power pool, infrastructure such as Kazungula, mediation, health and food programmes", 3],
      ["Problems: South Africa's dominance, overlapping memberships, infrastructure, political differences, dependence on donors, delays", 3],
      ["Comparison with SADCC or with other regional groupings", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Compare the targets for integration with what has been achieved."],
    modelAnswer: "SADC has been partly successful. Its Windhoek Treaty of 1992 set the aim of deeper integration, and the RISDP set stages leading from a free trade area to a customs union, a common market and monetary union. A free trade area was launched in 2008 and most tariffs among participating members were removed, and SADC has agreed protocols on trade, gender and shared resources, built regional infrastructure such as the Kazungula Bridge and the power pool, and played a role in mediation in places such as Madagascar and Lesotho. But the customs union has been delayed, the dominance of South Africa's economy, overlapping memberships, poor infrastructure and political differences have slowed progress, and trade among members is still a small part of their total trade. I conclude that SADC has achieved more than the loose co-operation of SADCC, especially in infrastructure and trade rules, but its deeper integration targets have not been met.",
    explanation: "Credit aims, achievements, problems, comparison and a supported judgement.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of Zimbabwe in the work of SADCC in the 1980s.",
    levels: levels(8),
    points: [
      ["Founding role and the sector for food security in Harare", 2],
      ["Defence of the transport links, such as the Beira Corridor, and the support of the Frontline States", 2],
      ["Limits: Zimbabwe's own dependence on South African routes, the cost of the war in Mozambique, and the small size of the region's economies", 2],
      ["Judgement on how important Zimbabwe's role was", 2],
    ],
    hints: ["Link Zimbabwe's role to the aims of SADCC."],
    modelAnswer: "Zimbabwe played an important role in SADCC in the 1980s. It was a founder member and co-ordinated the food security sector from Harare, and it helped to defend the Beira Corridor, which gave land-locked states a route to the sea outside South Africa. But Zimbabwe itself still depended on South African routes, the cost of the Mozambique operation was heavy, and the region's economies were small. I conclude that Zimbabwe was among the most important members, because of its relatively strong economy and its commitment to the transport links, but it could not by itself end the region's dependence.",
    explanation: "Credit explained role, limits and a judgement.",
  });

  b.card("DEFINITION", "What is regional integration?", "The process by which neighbouring countries link their economies and policies: free trade area, customs union, common market, economic and monetary union, political union.");
  b.card("DEFINITION", "What is the difference between a free trade area and a customs union?", "Both remove tariffs among members; a customs union also adopts a common external tariff.");
  b.card("FACT", "When and where was SADCC founded?", "1 April 1980 at Lusaka, by nine states, to reduce dependence on apartheid South Africa.");
  b.card("FACT", "Which states founded SADCC?", "Angola, Botswana, Lesotho, Malawi, Mozambique, Swaziland (Eswatini), Tanzania, Zambia and Zimbabwe.");
  b.card("FACT", "When was SADC created and when did South Africa join?", "SADC by the Windhoek Treaty of 17 August 1992; South Africa joined in 1994.");
  b.card("FACT", "What are the main institutions of SADC?", "Summit, Council of Ministers, Organ on Politics, Defence and Security, Tribunal and the Secretariat in Gaborone.");
  b.card("FACT", "What did Zimbabwe co-ordinate in SADCC?", "The food security sector, based in Harare.");
  b.card("CONCEPT", "Why did SADCC become SADC?", "Namibia's independence and the end of apartheid removed the original purpose; members wanted deeper integration and a bigger market.");
  b.card("CONCEPT", "What problems limit integration in SADC?", "South Africa's dominance, overlapping memberships, poor infrastructure, political differences and delays in implementing targets.");
});
