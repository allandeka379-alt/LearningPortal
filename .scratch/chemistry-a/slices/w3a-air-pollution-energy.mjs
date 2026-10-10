// W3a: achem.environment.air-pollution-energy (ZIMSEC only, Form 6; tagged to ZIMSEC automatically).
import { concept, P, t, chk, Mr, VM_RTP, sfStr, dpStr, sciStr } from "../lib.mjs";

const M = { SO2: chk(Mr("SO2"), 64.1), CaCO3: chk(Mr("CaCO3"), 100.1), CaSO4: chk(Mr("CaSO4"), 136.2), gyp: chk(Mr("CaSO4.2H2O"), 172.2), CaO: chk(Mr("CaO"), 56.1) };

concept("achem.environment.air-pollution-energy", { file: "environment/air-pollution-energy", keyPrefix: "environment.air-pollution-energy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pollutant is formed mainly when fuels containing sulfur are burned?",
    options: [
      ["sulfur dioxide", "Correct: S + O₂ → SO₂."],
      ["carbon monoxide", "CO comes from incomplete combustion of carbon."],
      ["nitrogen monoxide", "NO forms from N₂ and O₂ in hot combustion."],
      ["methane", "Methane comes from anaerobic decay, not combustion."],
    ],
    answer: "A",
    explanation: "Sulfur in coal and heavy fuel oil burns to SO₂.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which useful by-product is made in wet limestone flue-gas desulfurisation?",
    options: [
      ["gypsum, CaSO₄·2H₂O", "Correct: calcium sulfite is oxidised to calcium sulfate."],
      ["quicklime, CaO", "Quicklime is a reactant in some processes, not the product."],
      ["sulfuric acid, H₂SO₄", "Sulfuric acid is made from SO₂ by the Contact process, not by limestone scrubbing."],
      ["sodium sulfite, Na₂SO₃", "This forms in alkaline scrubbing with sodium hydroxide."],
    ],
    answer: "A",
    explanation: "CaCO₃ + SO₂ → CaSO₃ + CO₂; 2CaSO₃ + O₂ → 2CaSO₄; gypsum is used in plasterboard.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are oxides of nitrogen formed in car engines and power-station furnaces?",
    options: [
      ["N₂ and O₂ from the air combine at very high temperatures.", "Correct: N₂ + O₂ → 2NO needs high temperature."],
      ["Petrol and coal contain large amounts of nitrate ions.", "The nitrogen comes mainly from air, not from the fuel."],
      ["Catalytic converters oxidise nitrogen gas to nitrogen monoxide.", "Converters reduce NO to N₂."],
      ["Nitrogen burns readily in air like carbon.", "N≡N is very strong; nitrogen reacts only at high temperature."],
    ],
    answer: "A",
    explanation: "The very strong N≡N bond breaks only at the high temperatures of combustion.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In fluidised-bed combustion, powdered limestone is burned with the coal. Which statements are correct?\n\n1. Calcium oxide formed in the bed reacts with sulfur dioxide.\n2. The relatively low burning temperature reduces the formation of NOₓ.\n3. The limestone removes the carbon dioxide formed from the coal.",
    options: [
      ["1 and 2 only", "Correct: CaO traps SO₂; lower temperature means less NO; CO₂ is not removed."],
      ["1, 2 and 3", "Statement 3 is false: the limestone actually releases CO₂ when it decomposes."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["What does limestone give off when heated?"],
    explanation: "CaCO₃ → CaO + CO₂; 2CaO + 2SO₂ + O₂ → 2CaSO₄. CO₂ is a product, not removed.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does limestone remove sulfur dioxide from flue gases?",
    options: [
      ["SO₂ is an acidic oxide and calcium carbonate is a base.", "Correct: an acid-base reaction forms calcium sulfite."],
      ["Limestone is an oxidising agent that destroys SO₂.", "The first step is acid-base; air does the later oxidation."],
      ["Limestone catalyses the decomposition of SO₂ into sulfur and oxygen.", "SO₂ is not decomposed to its elements."],
      ["SO₂ dissolves in the limestone as a physical solution.", "A chemical reaction forms CaSO₃."],
    ],
    answer: "A",
    hints: ["Classify SO₂ as acidic, basic or amphoteric."],
    explanation: "CaCO₃ + SO₂ → CaSO₃ + CO₂ is the neutralisation of an acidic oxide.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of a lean-burn petrol engine?",
    options: [
      ["Excess O₂ hinders NOₓ reduction in the converter.", "Correct: reduction of NO is hindered when O₂ is in excess."],
      ["It produces far more carbon monoxide than a normal engine.", "More air gives more complete combustion and less CO."],
      ["It uses more fuel for the same distance.", "Lean-burn engines are usually more economical."],
      ["It releases more unburnt hydrocarbons.", "Excess air burns the fuel more completely."],
    ],
    answer: "A",
    hints: ["What does reducing NO need, and what is in excess?"],
    explanation: "Lean burn lowers CO and hydrocarbons, but a three-way converter cannot reduce NOₓ well in excess oxygen.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statements about hydroelectric power at a scheme such as Kariba are correct?\n\n1. It produces no carbon dioxide while generating.\n2. Its output can fall during droughts.\n3. It releases radioactive waste.",
    options: [
      ["1 and 2 only", "Correct: low lake levels reduce output; no radioactive waste is produced."],
      ["1, 2 and 3", "Statement 3 is false: radioactive waste comes from nuclear fission."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: generation depends on water level."],
    ],
    answer: "A",
    hints: ["Which power source produces radioactive waste?"],
    explanation: "Hydroelectric generation is renewable and emission-free in operation but depends on rainfall.",
  });
  b.mcq({
    d: 4, skill: "UNDERSTANDING",
    stem: "Why is radon a health hazard in poorly ventilated buildings and underground mines?",
    options: [
      ["It is an alpha-emitting gas that can be breathed in.", "Correct: alpha particles irradiate lung tissue from inside."],
      ["It is a toxic gas that binds to haemoglobin.", "That describes carbon monoxide."],
      ["It reacts with moisture in the lungs to form a strong acid.", "Radon is a noble gas and very unreactive."],
      ["It is flammable and explodes in air.", "Radon is not flammable; methane is the explosion risk in mines."],
    ],
    answer: "A",
    hints: ["Radon is a noble gas produced by the decay of uranium."],
    explanation: "Radon from uranium-bearing rocks collects indoors; inhaled radon and its decay products raise lung-cancer risk.",
  });
  {
    const n = 36000 / 32.1;
    const kg = (n * M.SO2) / 1000;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Coal containing 2.40% sulfur by mass is burned. Calculate the mass of sulfur dioxide, in kg, formed from 1.50 tonnes (1.50 × 10⁶ g) of the coal, to three significant figures. (Ar: O 16.0, S 32.1)",
      value: kg, sf: 3, unit: "kg",
      wrong: [sfStr(36, 3)],
      hints: ["S + O₂ → SO₂: one mole of S gives one mole of SO₂."],
      explanation: `1. Mass of S = 0.0240 × 1.50 × 10⁶ = 3.60 × 10⁴ g; n = 3.60 × 10⁴ ÷ 32.1 = ${sfStr(n, 4)} mol.\n2. n(SO₂) = ${sfStr(n, 4)} mol; mass = ${sfStr(n, 4)} × 64.1 = ${sfStr(kg * 1000, 3)} g = ${sfStr(kg, 3)} kg. Giving the mass of sulfur (36.0 kg) forgets the oxygen.`,
    });
  }
  {
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "610 mol of sulfur dioxide must be removed by CaCO₃ + SO₂ → CaSO₃ + CO₂. Calculate the minimum mass of calcium carbonate, in kg, to three significant figures. (Mr CaCO₃ = 100.1)",
      value: 610 * M.CaCO3 / 1000, sf: 3, unit: "kg",
      wrong: [sfStr((610 * 56.1) / 1000, 3)],
      explanation: `1. Ratio CaCO₃ : SO₂ = 1 : 1, so 610 mol of CaCO₃.\n2. Mass = 610 × 100.1 = ${sfStr(610 * M.CaCO3, 3)} g = ${sfStr((610 * M.CaCO3) / 1000, 3)} kg. Using Mr of CaO (56.1) gives ${sfStr((610 * 56.1) / 1000, 3)} kg.`,
    });
  }
  {
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "In wet limestone scrubbing, all the SO₂ removed ends up as gypsum, CaSO₄·2H₂O. Calculate the mass of gypsum, in kg, formed when 128 kg of sulfur dioxide is removed, to three significant figures. (Ar: H 1.0, O 16.0, S 32.1, Ca 40.1)",
      value: (128 / M.SO2) * M.gyp, sf: 3, unit: "kg",
      wrong: [sfStr((128 / M.SO2) * M.CaSO4, 3), sfStr((128 / M.SO2) * Mr("CaSO3"), 3)],
      hints: ["One mole of SO₂ gives one mole of gypsum; remember the water of crystallisation."],
      explanation: `1. n(SO₂) = 128 kg ÷ 64.1 kg kmol⁻¹ = ${sfStr(128 / M.SO2, 3)} kmol.\n2. n(gypsum) = ${sfStr(128 / M.SO2, 3)} kmol; Mr = ${dpStr(M.gyp, 1)}.\n3. Mass = ${sfStr(128 / M.SO2, 4)} × ${dpStr(M.gyp, 1)} = ${sfStr((128 / M.SO2) * M.gyp, 3)} kg. Forgetting the water gives ${sfStr((128 / M.SO2) * M.CaSO4, 3)} kg; stopping at CaSO₃ gives ${sfStr((128 / M.SO2) * Mr("CaSO3"), 3)} kg.`,
    });
  }
  b.calc({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "Coal contains 72.0% carbon by mass. Calculate the mass of carbon dioxide, in tonnes, produced when 2.50 tonnes of the coal burn completely, to three significant figures. (Ar: C 12.0, O 16.0)",
    value: (2.5 * 0.72 * 44) / 12, sf: 3, unit: "tonnes",
    wrong: [sfStr((2.5 * 44) / 12, 3), sfStr(2.5 * 0.72, 3)],
    explanation: `1. Mass of C = 0.720 × 2.50 = 1.80 t.\n2. C + O₂ → CO₂: 12.0 t C gives 44.0 t CO₂.\n3. Mass of CO₂ = 1.80 × 44.0 ÷ 12.0 = ${sfStr((2.5 * 0.72 * 44) / 12, 3)} t. Ignoring the 72.0% gives ${sfStr((2.5 * 44) / 12, 3)} t; giving the mass of carbon gives ${sfStr(2.5 * 0.72, 3)} t.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A catalytic converter reduces the amount of carbon dioxide in car exhaust.",
    answer: false,
    explanation: "False. It converts CO, NOₓ and hydrocarbons into CO₂, N₂ and H₂O, so CO₂ is a product.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each pollutant with its main harmful effect.",
    pairs: [
      ["sulfur dioxide", "acid rain and lung irritation"],
      ["carbon monoxide", "binds to haemoglobin, reducing oxygen transport"],
      ["particulates", "lodge in the lungs, causing breathing and heart disease"],
      ["carbon dioxide", "greenhouse gas contributing to climate change"],
    ],
    extraRight: ["destroys ozone in the stratosphere"],
    explanation: "Ozone depletion is caused by CFCs, not by these pollutants.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the description of fluidised-bed combustion.",
    template: "Powdered coal is mixed with powdered {{blank:a}}, which decomposes to calcium oxide. The calcium oxide reacts with {{blank:b}} to form calcium sulfate. Because the bed burns at a relatively {{blank:c}} temperature, less {{blank:d}} is formed.",
    blanks: [
      { id: "a", accepted: ["limestone"], choices: ["limestone", "sand", "charcoal", "iron ore"] },
      { id: "b", accepted: ["sulfur dioxide"], choices: ["sulfur dioxide", "carbon dioxide", "nitrogen", "water vapour"] },
      { id: "c", accepted: ["low"], choices: ["low", "high"] },
      { id: "d", accepted: ["nitrogen monoxide"], choices: ["nitrogen monoxide", "carbon dioxide", "sulfur trioxide", "oxygen"] },
    ],
    hints: ["NOₓ formation depends strongly on temperature."],
    explanation: "CaCO₃ → CaO + CO₂; 2CaO + 2SO₂ + O₂ → 2CaSO₄; lower temperature reduces NO formation.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the gas produced by the anaerobic digestion of animal manure that can be used as a fuel.",
    accepted: ["methane", "biogas", "CH4", "methane gas"],
    wrong: ["carbon monoxide"],
    explanation: "Biogas is mainly methane (with carbon dioxide).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe, with equations, how wet limestone scrubbing removes sulfur dioxide from power-station flue gases.",
    points: [
      "Flue gas passed through (sprayed with) a slurry of powdered limestone in water",
      t`$\ce{CaCO3 + SO2 -> CaSO3 + CO2}$ (acidic oxide reacts with a base)`,
      "Air is blown in to oxidise the calcium sulfite",
      t`$\ce{2CaSO3 + O2 -> 2CaSO4}$, crystallising as gypsum (CaSO₄·2H₂O), used for plasterboard`,
    ],
    modelAnswer: "The flue gases are sprayed with a slurry of powdered limestone in water. Sulfur dioxide, an acidic oxide, reacts with the calcium carbonate: CaCO₃ + SO₂ → CaSO₃ + CO₂. Air blown through the slurry oxidises the calcium sulfite: 2CaSO₃ + O₂ → 2CaSO₄, which crystallises as gypsum, CaSO₄·2H₂O, a by-product sold for plasterboard.",
    hints: ["Two equations, one acid-base and one oxidation."],
    explanation: "Flue-gas desulfurisation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Compare generating electricity from coal and from solar panels in Zimbabwe, giving two advantages and two disadvantages in total for each.",
    points: [
      "Coal advantage: reliable, available day and night on demand (or local coal reserves, established technology)",
      "Coal disadvantage: CO₂ (climate change) and SO₂/NOₓ/particulates (acid rain, health), or ash and mining damage",
      "Solar advantage: renewable, abundant sunshine, no emissions in use, suits remote homes and clinics",
      "Solar disadvantage: no output at night and less when cloudy, so batteries or backup are needed (or high initial cost of panels and batteries)",
    ],
    modelAnswer: "Coal-fired stations give a steady supply on demand using local coal, but they emit carbon dioxide, which contributes to climate change, and sulfur dioxide, nitrogen oxides and particulates, which cause acid rain and lung disease. Solar panels use abundant sunshine, are renewable, produce no emissions in use and suit remote homes and clinics, but they generate nothing at night and less on cloudy days, so expensive batteries or backup are needed.",
    hints: ["Give both sides for each source."],
    explanation: "Balanced comparison of power sources.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State two arguments for and one argument against generating electricity from nuclear fuel.",
    points: [
      "For: no CO₂ (or SO₂) emitted while generating",
      "For: a very small mass of fuel gives a large amount of energy, and output is reliable",
      "Against: radioactive waste that remains hazardous for very long times, or risk of serious accidents (e.g. Chernobyl, Fukushima), or high cost",
    ],
    modelAnswer: "Nuclear power stations emit no carbon dioxide or sulfur dioxide while operating, and a small mass of uranium releases a very large amount of energy reliably. However, they produce radioactive waste that stays dangerous for a very long time, and accidents such as Chernobyl (1986) and Fukushima (2011) have contaminated wide areas.",
    hints: ["Balance emissions against waste and safety."],
    explanation: "Nuclear power: balanced view.",
  });
  {
    const n = 2e6 * 0.012 / 32.1;
    const vSO2 = (n * VM_RTP) / 1000;
    const kgCaCO3 = (n * M.CaCO3) / 1000;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "A coal-fired boiler burns 2.00 tonnes (2.00 × 10⁶ g) of coal per hour. The coal contains 1.20% sulfur by mass. The flue gas passes through a wet limestone scrubber. (Ar: C 12.0, O 16.0, S 32.1, Ca 40.1; molar gas volume 24.0 dm³ mol⁻¹)",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the amount of SO₂, in mol, formed per hour.", value: n, sf: 3, unit: "mol", wrong: [sfStr(2e6 * 0.012 / 64.1, 3)], explanation: `Mass of S = 0.0120 × 2.00 × 10⁶ = 2.40 × 10⁴ g; n = 2.40 × 10⁴ ÷ 32.1 = ${sfStr(n, 3)} mol = n(SO₂).` }),
        P.num({ label: "(b)", stem: "Calculate the volume of this SO₂, in m³, at room temperature and pressure (1 m³ = 1000 dm³).", value: vSO2, sf: 3, unit: "m³", explanation: `${sfStr(n, 3)} × 24.0 = ${sfStr(n * 24, 3)} dm³ = ${sfStr(vSO2, 3)} m³.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the minimum mass of limestone, in kg, needed per hour.", value: kgCaCO3, sf: 3, unit: "kg", wrong: [sfStr((n * 56.1) / 1000, 3)], explanation: `1 : 1 ratio: ${sfStr(n, 3)} × 100.1 = ${sfStr(kgCaCO3, 3)} kg.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Write the two equations for the reactions in the scrubber.", points: [t`$\ce{CaCO3 + SO2 -> CaSO3 + CO2}$`, t`$\ce{2CaSO3 + O2 -> 2CaSO4}$`], modelAnswer: "CaCO₃ + SO₂ → CaSO₃ + CO₂; 2CaSO₃ + O₂ → 2CaSO₄." }),
        P.mcq({ label: "(e)", stem: "Which pollutant is not reduced by the scrubber?", options: [
          ["carbon dioxide", "Correct: the scrubber releases a little more CO₂."],
          ["sulfur dioxide", "This is what the scrubber removes."],
          ["sulfur trioxide", "SO₃ is acidic and is also absorbed by the base."],
          ["hydrogen chloride", "HCl is acidic and is also neutralised by limestone."],
        ], answer: "A", explanation: "Limestone scrubbing traps acidic gases but releases CO₂." }),
        P.manual({ label: "(f)", marks: 3, stem: "Suggest three other ways the environmental impact of the boiler could be reduced.", points: ["Use low-sulfur coal (or wash the coal to remove pyrite)", "Electrostatic precipitators or bag filters to remove particulates (fly ash)", "Lower combustion temperature / fluidised bed / low-NOₓ burners to cut NOₓ, or improved efficiency so less coal is burned, or switch to renewable sources"], modelAnswer: "Burn low-sulfur coal; fit electrostatic precipitators or fabric filters to remove fly ash; use a fluidised bed or low-NOₓ burners to lower NOₓ formation; improve efficiency so less coal is burned per unit of energy." }),
        P.tf({ label: "(g)", stem: "The calcium sulfate produced can be sold as gypsum for making plasterboard.", answer: true, explanation: "True: FGD gypsum is a useful by-product." }),
      ],
      hints: ["S + O₂ → SO₂; CaCO₃ + SO₂ → CaSO₃ + CO₂."],
      explanation: `${sfStr(n, 3)} mol SO₂ per hour (${sfStr(vSO2, 3)} m³), needing ${sfStr(kgCaCO3, 3)} kg of limestone.`,
    });
  }
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Exhaust gases from a petrol car were analysed before and after the catalytic converter (results of a student investigation, in arbitrary units).\n\n| gas | before converter | after converter |\n|---|---|---|\n| carbon monoxide | high | very low |\n| nitrogen monoxide | high | low |\n| unburnt hydrocarbons | moderate | very low |\n| carbon dioxide | high | slightly higher |\n| nitrogen | very high | very high |",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Write equations for the removal of carbon monoxide and of nitrogen monoxide in the converter.", points: [t`$\ce{2CO + 2NO -> 2CO2 + N2}$`, t`$\ce{2CO + O2 -> 2CO2}$`], modelAnswer: "2CO + 2NO → 2CO₂ + N₂; 2CO + O₂ → 2CO₂." }),
      P.short({ label: "(b)", stem: "Name one metal used as the catalyst.", accepted: ["platinum", "palladium", "rhodium", "Pt", "Pd", "Rh"], wrong: ["iron"], explanation: "Platinum, palladium or rhodium." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the carbon dioxide reading increases slightly.", points: ["CO and hydrocarbons are oxidised to CO₂ in the converter", "So CO₂ is produced, not removed (it is the product of complete combustion)"], modelAnswer: "The converter oxidises carbon monoxide and unburnt hydrocarbons into carbon dioxide, so the amount of CO₂ rises slightly; converters do not remove CO₂." }),
      P.mcq({ label: "(d)", stem: "Why must cars with catalytic converters use unleaded petrol?", options: [
        ["Lead compounds poison the catalyst surface.", "Correct: lead adsorbs strongly on the active sites."],
        ["Lead makes the engine run too cold.", "Lead does not change the engine temperature like this."],
        ["Leaded fuel produces more nitrogen.", "Nitrogen comes from the air."],
        ["Lead reacts with the ceramic honeycomb and melts it.", "The problem is poisoning of the metal surface."],
      ], answer: "A", explanation: "Lead blocks the active sites (catalyst poisoning)." }),
      P.tf({ label: "(e)", stem: "The converter works best once it has warmed up.", answer: true, explanation: "True: the catalysed reactions are slow when the converter is cold." }),
      P.num({ label: "(f)", stem: "How many moles of nitrogen gas are formed when 2.00 mol of nitrogen monoxide is removed by reaction with carbon monoxide?", value: 1, wrong: [2], explanation: "2CO + 2NO → 2CO₂ + N₂: 2 mol NO give 1 mol N₂." }),
    ],
    hints: ["Which gases are oxidised and which reduced?"],
    explanation: "CO and hydrocarbons are oxidised to CO₂ (and H₂O); NO is reduced to N₂.",
  });
  b.card("FACT", "Sources of SO₂ and NOₓ", "SO₂: burning sulfur-containing coal/oil and smelting sulfides. NOₓ: N₂ + O₂ → 2NO in hot combustion.");
  b.card("FORMULA", "Wet limestone FGD", "CaCO₃ + SO₂ → CaSO₃ + CO₂; 2CaSO₃ + O₂ → 2CaSO₄ (gypsum, CaSO₄·2H₂O).");
  b.card("FORMULA", "Alkaline scrubbing", "2NaOH + SO₂ → Na₂SO₃ + H₂O; Ca(OH)₂ + SO₂ → CaSO₃ + H₂O.");
  b.card("FACT", "Fluidised-bed combustion", "Coal burned with limestone: CaO traps SO₂ as CaSO₄; lower temperature (below about 900 °C) gives less NOₓ.");
  b.card("CONCEPT", "Lean-burn engine", "Excess air: more complete combustion, less CO and hydrocarbons; NOₓ harder to reduce in a normal converter.");
  b.card("FORMULA", "Catalytic converter", "Pt/Pd/Rh: 2CO + 2NO → 2CO₂ + N₂; 2CO + O₂ → 2CO₂; hydrocarbons → CO₂ + H₂O. Poisoned by lead.");
  b.card("CONCEPT", "Coal versus hydro power", "Coal: reliable but CO₂, SO₂, NOₓ, ash. Hydro: renewable, no emissions, but flooding and drought-dependent.");
  b.card("CONCEPT", "Nuclear power", "No CO₂ in operation and little fuel; but long-lived radioactive waste, accident risk (Chernobyl 1986, Fukushima 2011), cost.");
  b.card("FACT", "Radon", "Alpha-emitting gas from uranium decay in rocks; collects in unventilated buildings and mines; raises lung-cancer risk.");
});
