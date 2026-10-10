// W3a: achem.transition.platinum-group-metals (ZIMSEC only, Form 6; tagged to ZIMSEC automatically).
import { concept, P, t, chk, Mr, VM_RTP, sfStr, dpStr, sciStr } from "../lib.mjs";

const M_cis = chk(Mr("Pt(NH3)2Cl2"), 300.1);
const M_hex = chk(Mr("(NH4)2PtCl6"), 444.1);

concept("achem.transition.platinum-group-metals", { file: "transition/platinum-group-metals", keyPrefix: "transition.platinum-group-metals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these metals is a platinum group metal?",
    options: [
      ["rhodium", "Correct: Pt, Pd, Rh, Ru, Ir and Os are the PGMs."],
      ["nickel", "Nickel occurs with the PGMs but is a base metal, not a PGM."],
      ["chromium", "Chromium occurs in the same layered rocks but is not a PGM."],
      ["cobalt", "Cobalt is a by-product of PGM ores, not a PGM."],
    ],
    answer: "A",
    explanation: "The six PGMs are platinum, palladium, rhodium, ruthenium, iridium and osmium.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which type of rock body do the platinum group metals of the Great Dyke occur?",
    options: [
      ["a layered igneous intrusion", "Correct: slowly cooled magma separated into mineral layers."],
      ["a sedimentary limestone bed", "PGMs are not concentrated in limestone."],
      ["a river gravel deposit", "Most PGMs are mined from hard rock, not river gravels."],
      ["a coal seam", "Coal (as at Hwange) is sedimentary and carries no PGMs."],
    ],
    answer: "A",
    explanation: "The Great Dyke is a layered igneous intrusion; one sulfide-rich layer carries the PGMs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is platinum used for the electrode of the standard hydrogen electrode?",
    options: [
      ["It is inert and catalyses the H⁺/H₂ equilibrium.", "Correct: it conducts, does not react and speeds up equilibrium."],
      ["It reacts with hydrogen to form platinum hydride.", "Platinum must not react, or the potential would change."],
      ["It is a strong reducing agent.", "Platinum is very unreactive; it is not a reducing agent."],
      ["It has the most negative E⦵ of any metal.", "Platinum is one of the least reactive metals."],
    ],
    answer: "A",
    explanation: "Platinised platinum is inert, conducts electrons and catalyses 2H⁺ + 2e⁻ ⇌ H₂.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which stage of PGM extraction produces a molten mixture of nickel, copper and iron sulfides that collects the PGMs?",
    options: [
      ["smelting in electric furnaces", "Correct: the PGMs dissolve in the dense sulfide matte."],
      ["froth flotation", "Flotation concentrates the minerals; nothing is molten."],
      ["base-metal refining", "This dissolves out nickel and copper after smelting."],
      ["milling the ore", "Milling grinds the rock; it does not melt it."],
    ],
    answer: "A",
    hints: ["Which stage is carried out at the highest temperature?"],
    explanation: "Smelting separates a silicate slag from a sulfide matte that carries the PGMs.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements explain why extracting PGMs uses a great deal of energy?\n\n1. The ore contains only a few grams of PGMs per tonne.\n2. Hard rock must be crushed and finely milled.\n3. Smelting and refining need high temperatures and many steps.",
    options: [
      ["1, 2 and 3", "Correct: low grade, milling and high-temperature processing all use energy."],
      ["1 and 2 only", "Statement 3 is also true: electric smelting furnaces use much power."],
      ["2 and 3 only", "Statement 1 is also true and is the root cause."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Think about the mass of rock handled per kilogram of metal."],
    explanation: "Low-grade ore means huge masses of rock to mine and mill; smelting and refining are energy-hungry.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which reaction removes nitrogen monoxide in a catalytic converter?",
    options: [
      [t`$\ce{2CO + 2NO -> 2CO2 + N2}$`, "Correct: NO is reduced and CO oxidised on the catalyst."],
      [t`$\ce{2NO + O2 -> 2NO2}$`, "This forms another pollutant, NO₂."],
      [t`$\ce{N2 + O2 -> 2NO}$`, "This forms NO in the engine; it does not remove it."],
      [t`$\ce{2CO + O2 -> 2CO2}$`, "This removes CO but not NO."],
    ],
    answer: "A",
    hints: ["NO must be reduced to a harmless gas."],
    explanation: "Rhodium especially catalyses the reduction of NO by CO to N₂ and CO₂.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statements about catalytic converters are correct?\n\n1. The metals act as heterogeneous catalysts.\n2. A thin coating on a honeycomb gives a large surface area.\n3. They remove carbon dioxide from exhaust gases.",
    options: [
      ["1 and 2 only", "Correct: CO₂ is a product, not removed."],
      ["1, 2 and 3", "Statement 3 is false: CO₂ is formed from CO and hydrocarbons."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: it saves expensive metal."],
    ],
    answer: "A",
    hints: ["What are the products of the catalysed reactions?"],
    explanation: "Gases adsorb on the solid metal surface (heterogeneous); CO₂, N₂ and H₂O are released.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is a valid argument for refining PGMs in the producing country rather than exporting matte?",
    options: [
      ["More of the final value and skilled jobs stay in the country.", "Correct: this is the main argument for beneficiation."],
      ["Local refining needs no electricity at all.", "Refining needs a large, reliable power supply."],
      ["Refining removes the need to mine any ore.", "Ore must still be mined; refining is a later stage."],
      ["Refining is cheaper to set up than a crushing plant.", "Refineries are very expensive to build."],
    ],
    answer: "A",
    hints: ["Beneficiation is about where the value is added."],
    explanation: "Value addition keeps revenue, skills and jobs local, but needs capital, power and skills.",
  });
  {
    const t1 = 1000 / (2.5 * 0.9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "In an exercise, an ore contains 2.50 g of PGMs per tonne and the process recovers 90.0% of them. Calculate the mass of ore, in tonnes, needed to produce 1.00 kg of PGMs, to three significant figures.",
      value: t1, sf: 3, unit: "tonnes",
      wrong: [sfStr(1000 / 2.5, 3), sfStr((1000 / 2.5) * 0.9, 3)],
      hints: ["Find the mass actually recovered from one tonne."],
      explanation: `1. Recovered per tonne = 2.50 × 0.900 = 2.25 g.\n2. Ore = 1000 g ÷ 2.25 g per tonne = ${sfStr(t1, 3)} tonnes. Ignoring the recovery gives ${sfStr(1000 / 2.5, 3)} t; multiplying by the recovery instead of dividing gives ${sfStr((1000 / 2.5) * 0.9, 3)} t.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "Calculate the percentage by mass of platinum in cisplatin, Pt(NH₃)₂Cl₂, to three significant figures. (Ar: H 1.0, N 14.0, Cl 35.5, Pt 195.1)",
    value: (195.1 / M_cis) * 100, sf: 3, unit: "%",
    wrong: [sfStr((195.1 / (195.1 + 17 + 35.5)) * 100, 3)],
    explanation: `1. Mr = 195.1 + 2(17.0) + 2(35.5) = ${dpStr(M_cis, 1)}.\n2. % Pt = 195.1 ÷ ${dpStr(M_cis, 1)} × 100 = ${sfStr((195.1 / M_cis) * 100, 3)}%. Using one NH₃ and one Cl gives ${sfStr((195.1 / (195.1 + 17 + 35.5)) * 100, 3)}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "3.50 g of ammonium hexachloroplatinate(IV), (NH₄)₂PtCl₆, is heated to constant mass, leaving pure platinum. Calculate the mass of platinum, in g, to three significant figures. (Ar: H 1.0, N 14.0, Cl 35.5, Pt 195.1)",
    value: (3.5 * 195.1) / M_hex, sf: 3, unit: "g",
    wrong: [sfStr((3.5 * 195.1) / (M_hex - 36), 3)],
    hints: ["One Pt atom per formula unit."],
    explanation: `1. Mr = 2(18.0) + 195.1 + 6(35.5) = ${dpStr(M_hex, 1)}.\n2. Mass of Pt = 3.50 × 195.1 ÷ ${dpStr(M_hex, 1)} = ${sfStr((3.5 * 195.1) / M_hex, 3)} g. Leaving out the ammonium ions in Mr gives ${sfStr((3.5 * 195.1) / (M_hex - 36), 3)} g.`,
  });
  {
    const nNO = 1.2 / VM_RTP;
    const mCO = nNO * 28;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "2CO + 2NO → 2CO₂ + N₂. Calculate the mass of carbon monoxide, in g, that reacts with 1.20 dm³ of nitrogen monoxide (at room temperature and pressure) in a catalytic converter, to three significant figures. (Molar gas volume 24.0 dm³ mol⁻¹; Ar: C 12.0, O 16.0)",
      value: mCO, sf: 3, unit: "g",
      wrong: [sfStr(mCO / 2, 3), sfStr(nNO * 44, 3)],
      hints: ["CO and NO react 1 : 1."],
      explanation: `1. n(NO) = 1.20 ÷ 24.0 = ${sfStr(nNO, 3)} mol.\n2. n(CO) = ${sfStr(nNO, 3)} mol (2 : 2).\n3. Mass = ${sfStr(nNO, 3)} × 28.0 = ${sfStr(mCO, 3)} g. Halving gives ${sfStr(mCO / 2, 3)} g; using CO₂ (44.0) gives ${sfStr(nNO * 44, 3)} g.`,
    });
  }
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Nickel, copper and cobalt are recovered as valuable by-products when PGM ores are processed.",
    answer: true,
    explanation: "True. The PGMs occur in nickel-copper sulfide minerals, so these base metals are recovered too.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each use with the property of platinum or a PGM that it depends on.",
    pairs: [
      ["jewellery", "lustrous and does not tarnish"],
      ["catalytic converters", "adsorbs gases on its surface, weakening bonds"],
      ["standard hydrogen electrode", "inert conductor of electrons"],
      ["cisplatin", "forms a square planar complex that binds to DNA"],
    ],
    extraRight: ["low density and soft"],
    explanation: "PGMs are dense and hard, not low density and soft.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the outline of PGM extraction.",
    template: "The ore is crushed and milled, then concentrated by {{blank:a}}. The concentrate is smelted to a {{blank:b}}, which collects the PGMs. Air blown through it removes iron as {{blank:c}}. Nickel and copper are then leached out, and the PGMs are separated in a {{blank:d}} refinery.",
    blanks: [
      { id: "a", accepted: ["froth flotation"], choices: ["froth flotation", "distillation", "electrolysis", "chromatography"] },
      { id: "b", accepted: ["matte"], choices: ["matte", "slag", "slurry", "leachate"] },
      { id: "c", accepted: ["slag"], choices: ["matte", "slag", "anode slime", "carbonate"] },
      { id: "d", accepted: ["precious-metal"], choices: ["precious-metal", "base-metal", "oil", "water-treatment"] },
    ],
    hints: ["Matte is molten sulfide; slag is molten silicate."],
    explanation: "Mill → flotation → smelt to matte → convert (iron to slag) → base-metal refining → precious-metal refining.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the square planar platinum(II) complex used as an anticancer drug.",
    accepted: ["cisplatin", "cis-platin", "cis-diamminedichloroplatinum(II)", "cis-[Pt(NH3)2Cl2]"],
    wrong: ["transplatin"],
    explanation: "Cisplatin, cis-[Pt(NH₃)₂Cl₂].",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how the platinum group metals in a catalytic converter speed up the removal of pollutants.",
    points: [
      "Reactant gases (CO, NO, hydrocarbons) are adsorbed onto the metal surface (active sites)",
      "Bonds in the adsorbed molecules are weakened, lowering the activation energy (molecules held close together in a suitable orientation)",
      "Products (CO₂, N₂, H₂O) are desorbed, freeing the sites for more reactants",
    ],
    modelAnswer: "The gases are adsorbed onto active sites on the platinum, palladium and rhodium surface. Adsorption weakens bonds in the molecules and holds them close together, so the activation energy is lower and the reactions (for example 2CO + 2NO → 2CO₂ + N₂) go faster. The products then desorb, leaving the sites free.",
    hints: ["Adsorption, reaction, desorption."],
    explanation: "Heterogeneous catalysis.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss the advantages and disadvantages for a producing country of refining its own PGMs instead of exporting matte.",
    points: [
      "Advantage: more of the final value (and tax revenue) is earned in the country",
      "Advantage: skilled jobs, training and related industries (or by-products such as nickel, copper and sulfuric acid recovered locally)",
      "Disadvantage: high capital cost and need for a large, reliable electricity supply",
      "Disadvantage: specialist skills and technology are needed, and strict control of SO₂, acids and waste is required",
    ],
    modelAnswer: "Refining locally means that more of the value of the metals is earned in the country, raising revenue, and it creates skilled jobs, training and related industries, as well as recovering by-products such as nickel and copper locally. However, refineries cost a great deal to build, need a large and reliable electricity supply, depend on specialist skills and technology, and must control sulfur dioxide, acid and waste emissions strictly. Whether it is worthwhile depends on how these factors balance.",
    hints: ["Give at least two points on each side."],
    explanation: "Beneficiation: a balanced economic discussion.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how cisplatin acts as an anticancer drug.",
    points: [
      "Cisplatin is a square planar platinum(II) complex with two chloride ligands cis to each other",
      "In the cell the chloride ligands are replaced (ligand exchange) and platinum bonds to nitrogen atoms of two neighbouring guanine bases on DNA",
      "This distorts the DNA so it cannot be copied (replicated), so cancer cells cannot divide",
    ],
    modelAnswer: "Cisplatin, cis-[Pt(NH₃)₂Cl₂], is square planar with the two chloride ligands next to each other. Inside the cell the chlorides are replaced and the platinum forms dative bonds to nitrogen atoms on two adjacent guanine bases of DNA. This kinks the DNA so that it cannot be replicated, and the cancer cell cannot divide.",
    hints: ["Think of ligand exchange with DNA as the new ligand."],
    explanation: "Cisplatin binds DNA by ligand exchange.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "A PGM producer on the Great Dyke processes its ore in the following stages.\n\n| stage | process |\n|---|---|\n| 1 | ore crushed and milled to a fine powder |\n| 2 | froth flotation |\n| 3 | smelting in an electric furnace at high temperature |\n| 4 | air blown through the molten product of stage 3 |\n| 5 | leaching of nickel, copper and cobalt |\n| 6 | separation and refining of the individual PGMs |",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why stages 1 and 2 are needed before smelting.", points: ["The PGM minerals are tiny grains spread through hard rock; milling frees them", "Flotation separates the sulfide minerals from waste rock, so far less material has to be smelted (saving energy)"], modelAnswer: "Milling releases the very small mineral grains from the rock. Froth flotation then concentrates the sulfide minerals that carry the PGMs, so a much smaller mass needs to be heated in the furnace." }),
      P.short({ label: "(b)", stem: "Name the molten sulfide product of stage 3 that collects the PGMs.", accepted: ["matte", "nickel-copper matte", "a matte", "sulfide matte", "sulphide matte"], wrong: ["slag"], explanation: "The matte." }),
      P.mcq({ label: "(c)", stem: "Which gas is formed in stage 4 and must be captured?", options: [
        ["sulfur dioxide", "Correct: sulfide sulfur is oxidised to SO₂, which can be made into sulfuric acid."],
        ["carbon monoxide", "No carbon fuel is burned in the converter."],
        ["chlorine", "Chlorine is used later in refining, not formed here."],
        ["hydrogen sulfide", "Blowing air oxidises sulfide; it does not form H₂S."],
      ], answer: "A", explanation: "Sulfur in the matte is oxidised to SO₂." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest one environmental problem and one way it is reduced.", points: ["Problem: SO₂ emissions (acid rain) or CO₂ from coal-fired electricity or large volumes of tailings / dust", "Reduction: capture SO₂ to make sulfuric acid (or scrubbing), or energy efficiency / renewable power, or lined tailings dams and rehabilitation"], modelAnswer: "Sulfur dioxide from smelting and converting causes acid rain; it is captured and converted into sulfuric acid. (Alternatively: the large amounts of electricity come mainly from coal, adding CO₂; this is reduced by efficient equipment.)" }),
      P.tf({ label: "(e)", stem: "Chromium is also present in the layered rocks of the Great Dyke.", answer: true, explanation: "True: chromite seams occur in the same layered intrusion." }),
      P.num({ label: "(f)", stem: "In stage 6 platinum can be precipitated as ammonium hexachloroplatinate(IV), (NH₄)₂PtCl₆. Give the oxidation state of platinum in this compound.", value: 4, wrong: [6], explanation: "[PtCl₆]²⁻: x − 6 = −2, x = +4." }),
    ],
    hints: ["Each stage either concentrates, melts, purifies or separates."],
    explanation: "Milling and flotation concentrate; smelting forms matte; converting removes Fe and S (as SO₂); leaching removes base metals; refining separates PGMs.",
  });
  {
    const n = 0.06 / M_cis;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Cisplatin, cis-[Pt(NH₃)₂Cl₂], is given to some cancer patients by injection. A single dose in an exercise contains 60.0 mg of cisplatin. (Ar: H 1.0, N 14.0, Cl 35.5, Pt 195.1; L = 6.02 × 10²³ mol⁻¹)",
      parts: [
        P.num({ label: "(a)", stem: "Give the oxidation state of platinum in cisplatin.", value: 2, wrong: [4], explanation: "NH₃ neutral, Cl⁻ −1: x − 2 = 0, x = +2." }),
        P.mcq({ label: "(b)", stem: "What is the shape of cisplatin?", options: [
          ["square planar", "Correct: four-coordinate Pt(II) (d⁸) is square planar."],
          ["tetrahedral", "Pt(II) complexes are square planar, which allows cis and trans isomers."],
          ["octahedral", "Only four ligands are present."],
          ["linear", "Linear complexes have two ligands."],
        ], answer: "A", explanation: "Square planar." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the amount of cisplatin in one dose, in mol.", value: n, unit: "mol", wrong: [sciStr(60 / M_cis, 3)], explanation: `n = 0.0600 g ÷ ${dpStr(M_cis, 1)} g mol⁻¹ = ${sciStr(n, 3)} mol. Forgetting to convert mg to g gives ${sciStr(60 / M_cis, 3)}.` }),
        P.num({ label: "(d)", stem: "Calculate the mass of platinum in one dose, in mg.", value: n * 195.1 * 1000, sf: 3, unit: "mg", explanation: `${sciStr(n, 3)} × 195.1 = ${sfStr(n * 195.1 * 1000, 3)} mg.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the trans isomer cannot act in the same way, and why cisplatin has side effects.", points: ["In the trans isomer the two leaving chloride positions are opposite each other, so platinum cannot bond to two neighbouring guanine bases on the same DNA strand", "Cisplatin also binds to the DNA of healthy dividing cells (it is not selective), causing side effects"], modelAnswer: "In transplatin the two chloride ligands are on opposite sides, so the two positions freed by ligand exchange cannot reach adjacent guanine bases and the DNA is not kinked in the same way. Cisplatin is not selective: it also binds to the DNA of healthy cells that divide quickly, causing side effects." }),
        P.tf({ label: "(f)", stem: "Cisplatin is a neutral complex with no overall charge.", answer: true, explanation: "True: Pt²⁺ + 2NH₃ + 2Cl⁻ gives an overall charge of 0." }),
      ],
      hints: ["Convert mg to g before dividing by Mr."],
      explanation: `Pt(II), square planar; ${sciStr(n, 3)} mol and ${sfStr(n * 195.1 * 1000, 3)} mg of Pt per dose.`,
    });
  }
  b.card("FACT", "The six platinum group metals", "Platinum, palladium, rhodium, ruthenium, iridium, osmium (Pt, Pd, Rh, Ru, Ir, Os).");
  b.card("FACT", "Metals found with PGMs", "Nickel, copper, cobalt (sulfides) and chromium (chromite) in the same layered igneous rocks.");
  b.card("FACT", "Occurrence of PGMs in Zimbabwe", "In a sulfide-rich layer of the Great Dyke, a layered igneous intrusion; very low grade (a few g per tonne).");
  b.card("FACT", "PGM extraction outline", "Mine → crush and mill → froth flotation → smelt to matte → convert → base-metal refining → precious-metal refining.");
  b.card("CONCEPT", "Why PGM extraction is energy-intensive", "Low-grade ore: huge masses milled; electric smelting at high temperature; many refining steps.");
  b.card("FORMULA", "Catalytic converter reactions", "2CO + 2NO → 2CO₂ + N₂; 2CO + O₂ → 2CO₂; hydrocarbons → CO₂ + H₂O.");
  b.card("FACT", "Uses of PGMs", "Catalytic converters, jewellery, electronics, platinum electrodes (SHE), cisplatin.");
  b.card("DEFINITION", "Beneficiation", "Processing minerals further in the producing country so that more of the final value is earned locally.");
  b.card("FACT", "Cisplatin", "cis-[Pt(NH₃)₂Cl₂], square planar Pt(II); binds guanine N atoms in DNA, stopping replication.");
});
