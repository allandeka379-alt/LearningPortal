// W2b: mining.legislation-policy (ZIMSEC only; items are tagged to ZIMSEC automatically).
// Names of laws are given in outline and flagged "to be verified against current law" in the lesson. All money values are illustrative.
// Computed: sales 500 x 65 = 32 500; royalty 5% = 1 625; net 30 875; claim 150 x 300 = 45 000 m2 = 4.5 ha, 10 claims 45 ha;
// export table total 4 000, gold share 27.5%, lithium processed +25%: 640 -> 800 (+160).
import { concept, P, geographyLevels, chk, rnd, sum } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const sales = chk(500 * 65, 32500);
const roy = chk(sales * 0.05, 1625);
const net = chk(sales - roy, 30875);
const areaM2 = chk(150 * 300, 45000);
const areaHa = chk(areaM2 / 10000, 4.5);
const block = chk(10 * areaHa, 45);

const EXP = [["Gold", 1100], ["Platinum group metals", 1520], ["Lithium", 640], ["Chrome", 340], ["Other minerals", 400]];
const expTotal = chk(sum(EXP.map((e) => e[1])), 4000);
const goldShare = chk((1100 / 4000) * 100, 27.5);
const pgmShare = chk((1520 / 4000) * 100, 38);
const lithNew = chk(640 * 1.25, 800);
const lithGain = chk(lithNew - 640, 160);
const ETAB = tbl(["Mineral", "Export earnings (US\\$ million)"], EXP);

concept("ageo.mining.legislation-policy", { file: "mining/legislation-policy", keyPrefix: "mining.legislation-policy" }, (b) => {
  mc(b, 1, "RECALL", "In Zimbabwe, who owns the minerals in the ground?", [
    ["The state, which grants mining rights", "Correct: mining rights are granted under the mining law."],
    ["The farmer or landholder whose land is above them", "Landholders must be consulted but do not own the minerals."],
    ["The first person to find the mineral", "A find alone gives no right without registration."],
    ["The local chief, who sells the rights", "Rights are granted under the law, not by sale."],
  ], "Minerals belong to the **state**; rights are granted under the mining law.");
  mc(b, 2, "UNDERSTANDING", "What is the role of the Minerals Marketing Corporation of Zimbabwe (MMCZ)?", [
    ["It markets and sells most minerals on behalf of producers", "Correct: it handles sales and export documents."],
    ["It grants prospecting licences to individuals and companies", "Licences are issued under the mining law by the mining authority."],
    ["It pegs claims on behalf of small-scale miners", "Pegging is done by the claim holder."],
    ["It monitors the safety of shaft supports", "Safety is supervised under the mining and safety rules."],
  ], "**MMCZ** markets minerals and handles export documentation.");
  mc(b, 2, "UNDERSTANDING", "What is the purpose of the Kimberley Process?", [
    ["To stop trade in conflict diamonds through certification", "Correct: participating countries must certify rough diamonds."],
    ["To set the price of gold on all world commodity markets", "It deals with diamonds, not gold prices."],
    ["To train all miners in safe underground mining methods", "It is a certification scheme, not a training programme."],
    ["To grant pegging rights to foreign mining companies only", "It does not grant mining rights."],
  ], "The **Kimberley Process** certifies rough diamonds to exclude conflict diamonds.");
  mc(b, 2, "UNDERSTANDING", "Why might a ban on the export of unprocessed minerals be introduced?", [
    ["To encourage processing in the country and keep more value", "Correct: processing adds value and jobs."],
    ["To make it easier to smuggle raw minerals across the border", "A ban is meant to control exports."],
    ["To reduce the number of mines that need an EIA", "It has no such effect."],
    ["To lower the world price of the mineral", "The aim is local value, not lowering prices."],
  ], "Export bans aim to add **local value** through processing.");
  mc(b, 3, "APPLICATION", "A farmer finds a gold-bearing reef on her land. What should she do first if she wants to mine it legally?", [
    ["Apply for prospecting rights, then peg and register the claim", "Correct: she must follow the licensing and registration steps."],
    ["Start digging at once, as the minerals belong to the landholder", "Minerals belong to the state."],
    ["Sell the ore directly to any buyer without records", "Sales are controlled and must be documented."],
    ["Export the ore on her own to get the best price", "Exports go through approved channels and need documents."],
  ], "She must **apply for rights, peg and register** the claim.", { hints: ["Think about who owns the minerals and what the law requires."] });
  mc(b, 3, "ANALYSIS", "Which is the strongest argument that a policy of tighter control of gold buying may lower output?", [
    ["If official prices or terms are poor, miners may sell illegally", "Correct: the effect depends on how attractive the official route is."],
    ["Tighter control always increases the total amount of gold produced", "That is not always true."],
    ["Miners are not affected by the price they are paid", "Miners respond to prices and payment terms."],
    ["Control reduces the number of buyers to zero", "Some official buyers remain."],
  ], "Control works only if the **official route is attractive** to miners.", { hints: ["Think about miners' incentives."] });
  b.tf({ d: 1, skill: "RECALL", stem: "An Environmental Impact Assessment is usually required before a large mine can start operating.", answer: true,
    feedbackTrue: "Correct: an EMA certificate is needed.",
    feedbackFalse: "Not so: large mines need approval.",
    explanation: "EIAs are required for mining under the Environmental Management Act." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Once a claim is registered, the holder never has to pay fees or work the claim.", answer: false,
    feedbackFalse: "Correct: fees and work requirements must be kept up or the claim may be lost.",
    feedbackTrue: "Not so: claims can be forfeited if the rules are not met.",
    explanation: "Annual fees and work requirements apply to registered claims." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "To mark the boundaries of a claim with beacons is called {{blank:a}}. The state body that markets most minerals is the {{blank:b}}. Zimbabwe's main law for protecting the environment is the Environmental {{blank:c}} Act.",
    blanks: [
      { id: "a", accepted: ["pegging"], choices: ["pegging", "smelting", "panning"] },
      { id: "b", accepted: ["MMCZ"], choices: ["MMCZ", "EMA", "ZMDC"] },
      { id: "c", accepted: ["Management"], choices: ["Management", "Trade", "Impact"] },
    ], explanation: "Pegging, MMCZ and the Environmental Management Act." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each body or law to its role.",
    pairs: [
      ["Mines and Minerals Act", "Governs prospecting, claims and mining rights"],
      ["Environmental Management Agency", "Regulates EIAs and pollution"],
      ["Fidelity Printers and Refiners", "Buys and refines gold from small-scale miners"],
      ["Zimbabwe Mining Development Corporation", "State-owned company with mining interests"],
    ], explanation: "Each has a distinct role in the sector." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "US$",
    stem: "A miner sells 500 g of gold at US\\$65 per gram. Calculate the value of the sales, in US\\$.",
    hints: ["Multiply the mass by the price per gram."],
    value: sales, wrong: [565, 7.7],
    explanation: "500 × 65 = **US\\$32 500**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "US$",
    stem: "In this exercise a royalty of 5% (an illustrative rate) is paid on sales worth US\\$32 500. Calculate the miner's income after paying the royalty, in US\\$.",
    hints: ["Find 5% of 32 500, then subtract."],
    value: net, wrong: [1625, 34125],
    explanation: "Royalty = 0.05 × 32 500 = 1 625. Income = 32 500 − 1 625 = **US\\$30 875**. The value 1 625 is only the royalty." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "ha", dp: 1,
    stem: "In this exercise a claim is 150 m wide and 300 m long. Calculate its area, in hectares (1 ha = 10 000 m²).",
    hints: ["Find the area in m² first.", "Divide by 10 000."],
    value: areaHa, wrong: [45000, 0.45],
    explanation: "Area = 150 × 300 = 45 000 m². 45 000 ÷ 10 000 = **4.5 ha**." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "US$ million",
    stem: "Lithium export earnings are US\\$640 million a year. After a policy of processing the ore in Zimbabwe, each tonne earns 25% more. Assuming the same quantity is exported, calculate the new annual earnings, in US\\$ million.",
    hints: ["Find 25% of 640, then add it.", "Or multiply by 1.25."],
    value: lithNew, wrong: [160, 512],
    explanation: "1. 25% of 640 = 160.\n2. New earnings = 640 + 160 = **US\\$800 million**.\n3. The value 512 results from taking away 20% instead of adding 25%." });
  b.short({ d: 1, skill: "RECALL", stem: "What is the name for marking the corners of a claim with beacons?",
    accepted: ["pegging", "pegging the claim", "to peg", "peg"], wrong: ["panning"],
    explanation: "**Pegging**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Give the acronym of the state body in Zimbabwe that markets most minerals on behalf of producers.",
    accepted: ["MMCZ", "Minerals Marketing Corporation of Zimbabwe"], wrong: ["ZMDC"],
    explanation: "**MMCZ**." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Outline three steps a person must take to gain mining rights over a claim.",
    hints: ["Think of licence, pegging, registration and environmental approval."],
    points: [
      "Obtain a prospecting licence or permission and consult the landholder.",
      "Peg the claim with beacons and notices, then lodge an application with the Mining Commissioner.",
      "Receive a certificate of registration, pay annual fees and obtain an EIA certificate before mining.",
    ],
    modelAnswer: "First obtain a prospecting licence and consult the landholder. Then peg the claim with beacons and notices and lodge an application with the Mining Commissioner. After registration the holder pays annual fees and obtains an environmental certificate from EMA before mining.",
    explanation: "Outline the sequence in order." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why the government controls the trade in gold and diamonds.",
    hints: ["Think about revenue, smuggling and international rules."],
    points: [
      "To collect royalties and taxes from the sale of valuable minerals.",
      "To reduce smuggling, which causes loss of revenue and foreign currency.",
      "To keep records and statistics so that production and exports can be planned.",
      "To meet international rules, such as the Kimberley Process, so that diamonds can be sold legally.",
    ],
    modelAnswer: "The government controls trade to collect royalties and taxes, and to reduce smuggling, which loses revenue and foreign currency. Records and statistics help planning, and international rules such as the Kimberley Process must be followed so that diamonds can be sold legally.",
    explanation: "Revenue, smuggling, planning and international rules." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative mineral export earnings (data invented for this exercise):\n\n${ETAB}\n\nDescribe the pattern shown.`,
    hints: ["Quote the largest and smallest values and the total."],
    points: [
      "Platinum group metals earn the most (US\\$1 520 million), 38% of the total.",
      "Gold is second (US\\$1 100 million), 27.5%.",
      "Lithium (US\\$640 million) and chrome (US\\$340 million) earn less, and other minerals US\\$400 million.",
      "The total is US\\$4 000 million, and PGMs and gold together earn about two-thirds (65.5%).",
    ],
    modelAnswer: "Platinum group metals earn the most (US\\$1 520 million, 38% of the total), followed by gold (US\\$1 100 million, 27.5%). Lithium (US\\$640 million), other minerals (US\\$400 million) and chrome (US\\$340 million) earn less. The total is US\\$4 000 million, and PGMs and gold together earn about two-thirds.",
    explanation: "Describe with figures and shares." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "A small-scale gold miner sells 500 g of gold at US\\$65 per gram to an approved buyer. In this exercise a royalty of 5% of the sales value is payable (illustrative figures, not the current legal rate).",
    hints: ["Value = mass × price.", "Think about how the miner's incentives are affected."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the value of the sales, in US\\$.", value: sales, unit: "US$", wrong: [565, 7.7],
        explanation: "500 × 65 = US\\$32 500." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the royalty payable, in US\\$.", value: roy, unit: "US$", wrong: [3250, 162.5],
        explanation: "5% × 32 500 = US\\$1 625." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Who receives the royalty?", options: [
        ["The state", "Correct: royalties are paid to the government."],
        ["The landholder only", "The landholder is not the royalty recipient."],
        ["The gold buyer", "The buyer pays for the gold; it does not receive the royalty."],
        ["The Kimberley Process", "It does not collect royalties."],
      ], answer: "A", explanation: "Royalties are a payment to the state for the right to mine." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why some small-scale miners may sell gold illegally instead of to the approved buyer.",
        points: [
          "They may be offered a higher price or immediate payment by informal buyers.",
          "They may wish to avoid paying royalties and taxes.",
          "The approved buyer may be far away, delay payment or pay in a form they do not want, and they may lack registered claims.",
        ],
        modelAnswer: "Informal buyers may offer a higher price or immediate payment, and selling illegally avoids royalties and taxes. The approved buyer may be far away, delay payment or pay in a form the miner does not want, and some miners work without registered claims.",
        explanation: "Price, tax avoidance and practical problems." }),
    ], explanation: "Calculate sales and royalty and explain illegal sales." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: `Illustrative mineral export earnings in a year (data invented for this exercise):\n\n${ETAB}`,
    hints: ["Share = part ÷ total × 100.", "25% more means multiply by 1.25."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of the total earned by gold, to 1 decimal place.", value: goldShare, dp: 1, unit: "%", wrong: [37.5, 1100],
        explanation: "1 100 ÷ 4 000 × 100 = 27.5%." }),
      P.num({ label: "(b)", marks: 2, stem: "If processing lithium in Zimbabwe makes each tonne earn 25% more, calculate the increase in lithium earnings, in US\\$ million.", value: lithGain, unit: "US$ million", wrong: [800, 25],
        explanation: "25% of 640 = 160, so earnings rise by US\\$160 million." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two conditions needed for a processing policy to succeed.",
        points: [
          "Reliable electricity and water supply for processing plants.",
          "Investment, skilled workers and access to markets for the processed product.",
        ],
        modelAnswer: "Reliable electricity and water for the plants, and investment, skilled workers and buyers for the processed product.",
        explanation: "Power, finance, skills and markets." }),
    ], explanation: "Use export data to calculate shares and the effect of processing." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the effects of mining legislation and policies on the development of mining in Zimbabwe.",
    hints: ["Give benefits and costs for the state, large companies, small-scale miners and the environment.", "Reach a judgement."],
    points: [
      "Licensing and registration give security of tenure to miners and let the state keep records of claims.",
      "Royalties and taxes provide revenue for the government and local development.",
      "The Environmental Management Act requires EIAs and rehabilitation, which reduces damage to land and water.",
      "Controlled marketing of gold and diamonds, with the Kimberley Process, reduces smuggling and allows legal sales.",
      "Local participation and processing policies aim to keep more value in the country, although supporters and critics disagree about their effect on investment.",
      "Costs and delays of licences, EIAs and fees may discourage small-scale miners, who then work illegally.",
      "Policy changes and uncertainty can deter investors, while poor enforcement allows illegal mining.",
      "Judgement: legislation and policies are essential for orderly, accountable mining, but their success depends on clarity, stability and enforcement.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Licensing and registration give miners security of tenure and let the state keep records, and royalties and taxes provide revenue. The Environmental Management Act requires EIAs and rehabilitation, which reduces damage to land and water. Controlled marketing of gold and diamonds and the Kimberley Process reduce smuggling. Policies on local participation and processing aim to keep more value in the country, although supporters and critics disagree about their effect on investment. The costs and delays of licences, EIAs and fees can push small-scale miners into illegal work, and policy changes can deter investors. I conclude that legislation and policy are essential for orderly mining, but success depends on clarity, stability and enforcement.",
    wordLimit: { max: 300 }, explanation: "Weigh benefits and costs for different groups and judge." });

  b.card("FACT", "Who owns minerals", "Minerals belong to the state; mining rights are granted under the mining law, with the landholder consulted.");
  b.card("CONCEPT", "Steps to gain mining rights", "Prospecting licence, consult landholder, peg the claim, lodge the application, registration certificate, EIA certificate, mine and report.");
  b.card("FACT", "Mines and Minerals Act", "The main Act governing prospecting, claims and mining rights in Zimbabwe (check current provisions).");
  b.card("FACT", "MMCZ", "Minerals Marketing Corporation of Zimbabwe: markets most minerals for producers and handles export documentation.");
  b.card("FACT", "ZMDC", "Zimbabwe Mining Development Corporation: state-owned company with mining interests.");
  b.card("FACT", "Fidelity Printers and Refiners", "Buys gold from small-scale miners and refines it.");
  b.card("FACT", "Kimberley Process", "An international scheme (from 2003) that certifies rough diamonds to prevent trade in conflict diamonds.");
  b.card("CONCEPT", "Effects of export controls", "Encourage local processing and value, but need power, skills and capital; may cut sales if processing is not ready.");
  b.card("FACT", "Raw lithium export ban", "In December 2022 Zimbabwe banned exports of raw lithium ore to encourage local processing (check current rules).");
});
