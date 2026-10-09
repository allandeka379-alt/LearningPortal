// W3a: Zimbabwe in regional and continental organisations (her.governance.regional-organisations).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.governance.regional-organisations", { file: "governance/regional-organisations", keyPrefix: "governance.regional-organisations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where are the headquarters of **SADC**?",
    options: [
      ["Gaborone", "Correct: in Botswana."],
      ["Lusaka", "Lusaka hosts COMESA's headquarters."],
      ["Addis Ababa", "Addis Ababa hosts the African Union."],
      ["Harare", "Harare is not SADC's headquarters."],
    ],
    answer: "A",
    explanation: "SADC: Gaborone. COMESA: Lusaka. AU: Addis Ababa.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On what date was the **OAU** founded?",
    options: [
      ["25 May 1963", "Correct: now Africa Day."],
      ["24 October 1945", "This is when the UN was founded."],
      ["18 April 1980", "This is Zimbabwe's Independence Day."],
      ["22 December 1987", "This is the date of the Unity Accord."],
    ],
    answer: "A",
    explanation: "The OAU was founded on 25 May 1963 in Addis Ababa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the **main** aim of SADCC when it was formed in 1980?",
    options: [
      ["To reduce dependence on apartheid South Africa", "Correct."],
      ["To replace the Organisation of African Unity", "The AU replaced the OAU in 2002."],
      ["To create a single currency for the region", "This was not SADCC's aim."],
      ["To organise the Lancaster House conference", "That was hosted by Britain in 1979."],
    ],
    answer: "A",
    explanation: "SADCC coordinated development to reduce the region's economic dependence on apartheid South Africa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which year was the **African Union** launched to replace the OAU?",
    options: [
      ["2002", "Correct."],
      ["1992", "This is the year of the SADC Treaty."],
      ["1994", "This is when the COMESA treaty came into force."],
      ["1980", "This is when SADCC was formed."],
    ],
    answer: "A",
    explanation: "The AU replaced the OAU in 2002.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main aim of **COMESA**?",
    options: [
      ["To build a common market by reducing trade barriers", "Correct."],
      ["To coordinate liberation movements against colonial rule", "This was the role of the OAU Liberation Committee."],
      ["To run elections in all its member states", "Elections are run by national bodies."],
      ["To protect world heritage sites in Africa", "This is the work of UNESCO."],
    ],
    answer: "A",
    explanation: "COMESA aims at a large common market for eastern and southern Africa.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Two SADC member states disagree after a disputed election, and violence breaks out. Which SADC body is **most likely** to lead mediation?",
    options: [
      ["The Organ on Politics, Defence and Security Cooperation", "Correct."],
      ["The finance department of the SADC Secretariat in Gaborone", "Finance is not responsible for mediation."],
      ["The COMESA Court of Justice", "COMESA is a separate organisation."],
      ["The Pan-African Parliament of the African Union", "This is an AU body that gives peoples a voice."],
    ],
    hints: ["Which body deals with peace and security?"],
    answer: "A",
    explanation: "The Organ promotes peace and security and mediates conflicts.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can **overlapping membership** of SADC and COMESA be a problem?",
    options: [
      ["Countries face different rules and commitments in each body", "Correct."],
      ["It is forbidden by the African Union's founding Act", "It is not forbidden."],
      ["It means a country loses its seat at the United Nations", "UN membership is unaffected."],
      ["It forces countries to use the same national currency", "Membership does not require a single currency."],
    ],
    hints: ["Think about following two sets of trade rules."],
    answer: "A",
    explanation: "Different tariffs and commitments make implementation complicated and costly.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the **strongest** evidence that regional organisations benefit Zimbabwe?",
    options: [
      ["Lower duties widen markets for Zimbabwean goods", "Correct: a direct economic benefit."],
      ["Zimbabwe must pay annual membership fees", "This is an obligation, not a benefit."],
      ["Meetings are sometimes held in other capitals", "This is not evidence of benefit."],
      ["Some protocols are slow to be implemented", "This is a challenge."],
    ],
    hints: ["Separate benefits from obligations and challenges."],
    answer: "A",
    explanation: "Reduced duties give Zimbabwean producers access to larger markets.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe was a founder member of SADCC in 1980.",
    answer: true,
    explanation: "True.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The OAU's Liberation Committee supported liberation movements, including those of Zimbabwe.",
    answer: true,
    explanation: "True. It provided money, supplies and recognition.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organisation with its headquarters.",
    pairs: [
      ["SADC", "Gaborone"],
      ["COMESA", "Lusaka"],
      ["African Union", "Addis Ababa"],
    ],
    extraRight: ["Harare"],
    explanation: "SADC Gaborone; COMESA Lusaka; AU Addis Ababa.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each AU body with its role.",
    pairs: [
      ["Assembly of Heads of State and Government", "Supreme decision-making organ"],
      ["AU Commission", "Runs the day-to-day work"],
      ["Peace and Security Council", "Prevents and resolves conflicts"],
      ["Pan-African Parliament", "Gives African peoples a voice"],
    ],
    explanation: "Main organs of the African Union.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "SADCC became SADC in {{blank:a}}. Africa Day is celebrated on 25 {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1992"], choices: ["1992", "1980", "2002", "1963"] },
      { id: "b", accepted: ["May"], choices: ["May", "April", "October", "December"] },
    ],
    explanation: "SADC Treaty 1992; Africa Day 25 May.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** aims of SADC.",
    points: ["Economic growth and development", "Poverty reduction", "Regional integration and trade", "Peace, security and democracy / shared use of resources"],
    modelAnswer: "To promote economic development, reduce poverty, increase regional integration and trade, and maintain peace and security.",
    explanation: "One mark per aim.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** obligations Zimbabwe has as a member of SADC.",
    points: [
      "Pay membership contributions",
      "Developed: funds the Secretariat and programmes",
      "Implement treaties and protocols / respect agreed principles",
      "Developed: e.g. reduce duties under the trade protocol; uphold democracy and human rights",
    ],
    modelAnswer: "Zimbabwe must pay its annual contributions, which fund the Secretariat and regional programmes. It must also implement the treaties and protocols it has signed, for example reducing duties under the trade protocol, and respect principles such as democracy and human rights.",
    hints: ["Money and commitments."],
    explanation: "Two marks per developed obligation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Suggest **three** ways in which SADC could increase trade among its members, explaining how each would help.",
    points: [
      "Improve roads, railways and border posts", "Developed: lowers transport costs and delays",
      "Remove remaining duties and non-tariff barriers", "Developed: goods become cheaper across borders",
      "One-stop border posts / simpler customs documents", "Developed: traders cross faster and spend less",
    ],
    modelAnswer: "SADC could improve roads, railways and border posts, lowering transport costs and delays. It could remove remaining duties and other barriers, so goods become cheaper across borders. It could also create one-stop border posts and simpler customs documents, so traders cross faster and spend less.",
    hints: ["What slows trade between neighbours?"],
    explanation: "Two marks per developed suggestion.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "a report in a fictional business newsletter, 2026", `A cooking-oil maker in Bulawayo says sales to Zambia and Malawi have grown since duties were cut under regional trade rules. "We have hired twenty new workers and buy more sunflower from farmers in Lupane," the manager said. But she warned that queues at the border can still take two days, and that cheaper imports compete with local brands.`),
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what **caused** sales to Zambia and Malawi to grow?",
        options: [
          ["Duties were cut under regional trade rules", "Correct."],
          ["Border queues became longer", "Longer queues would reduce trade."],
          ["The company stopped buying sunflower", "It is buying more."],
          ["Imports from other countries were banned", "No ban is mentioned."],
        ],
        answer: "A",
        explanation: "Lower duties made the oil cheaper in neighbouring markets.",
      }),
      P.tf({
        label: "(b)",
        stem: "Source A shows that regional trade benefits farmers as well as factories.",
        answer: true,
        explanation: "True: the company buys more sunflower from farmers in Lupane.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Using the source, explain **two** challenges of regional trade for Zimbabwean businesses.",
        points: [
          "Slow border crossings",
          "Developed: queues of two days raise costs and delay deliveries",
          "Competition from cheaper imports",
          "Developed: local brands may lose sales and jobs",
        ],
        modelAnswer: "Border queues can take two days, which raises transport costs and delays deliveries. Cheaper imports from other member states also compete with local brands, so some Zimbabwean firms may lose sales and jobs.",
      }),
    ],
    hints: ["Find the benefits and the warnings."],
    explanation: "Reading a source on regional trade.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the OAU and the African Union.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the aims of the OAU.",
        points: ["End colonialism", "End apartheid / racial discrimination", "Defend the independence and sovereignty of African states", "Promote unity and cooperation among African states"],
        modelAnswer: "The OAU aimed to end colonialism and apartheid, defend the independence and sovereignty of African states, and promote unity and cooperation among them.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The OAU was more successful than the African Union.\" How far do you agree?",
        points: [
          ["For OAU: achieved its main aim, the end of colonialism and apartheid, helped through the Liberation Committee", 2],
          ["For AU: wider aims (development, governance, rights); new organs such as the Peace and Security Council and Pan-African Parliament; peacekeeping", 2],
          ["Limits of both: funding problems, conflicts continue, slow implementation; the AU's aims are harder to measure", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "The OAU achieved its main aim. Through its Liberation Committee it supported movements fighting colonialism and apartheid, and by 1994 Namibia was independent and apartheid in South Africa had ended.\n\nThe African Union has wider and harder aims: economic development, good governance, human rights and peace. It has created new organs such as the Peace and Security Council and the Pan-African Parliament and has sent peacekeepers to conflict areas. However, conflicts continue, funding depends partly on donors and agreements are slow to be implemented.\n\nI partly agree: the OAU succeeded in its main aim, but the AU's aims are broader and more difficult, so its record should be judged over a longer period.",
      }),
    ],
    hints: ["Compare each body against its own aims."],
    explanation: "Describing the OAU's aims and evaluating the OAU and AU.",
  });

  b.card("FACT", "SADCC to SADC?", "SADCC formed 1980; became SADC in 1992.");
  b.card("FACT", "Headquarters of SADC, COMESA and the AU?", "Gaborone; Lusaka; Addis Ababa.");
  b.card("FACT", "When was the OAU founded?", "25 May 1963 (Africa Day).");
  b.card("FACT", "When did the AU replace the OAU?", "2002.");
  b.card("FACT", "COMESA treaty dates?", "Signed 1993; in force 1994.");
  b.card("DEFINITION", "Regional integration", "Neighbouring countries joining their economies and policies more closely, e.g. by cutting trade barriers.");
  b.card("DEFINITION", "Protocol", "A formal agreement among member states on one area of cooperation.");
  b.card("CONCEPT", "Main aim of SADCC in 1980?", "To reduce the region's dependence on apartheid South Africa.");
  b.card("CONCEPT", "Three challenges facing SADC?", "Shortage of funds, overlapping membership, slow implementation of protocols.");
});
