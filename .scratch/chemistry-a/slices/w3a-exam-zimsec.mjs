// W3a: ZIMSEC-only exam-format items: three Paper 3 Section D (Applied Chemistry) free-response questions (15 marks:
// air pollution and power; waste and water pollution; platinum group metals and nanomaterials) and one Paper 4
// quantitative analysis question (20 marks: copper in brass by iodine-thiosulfate titration).
import { concept, P, t, EXAM, checkExam, ZIM, Mr, VM_RTP, pH, titre, meanTitre, molesFromSolution, pctErrorDifference, chk, sfStr, dpStr, sciStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, examStyle: true, paper: "Paper 3 Section D" };
const P4 = { skill: EXAM.ZIM_P4_QUANTITATIVE.skill, secs: EXAM.ZIM_P4_QUANTITATIVE.secs, applies: EXAM.ZIM_P4_QUANTITATIVE.applies, examStyle: true, paper: "Paper 4" };

concept(A("environment.air-pollution-energy"), { file: "exam/w3a-zimsec", keyPrefix: "exam.w3a-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- D1: sulfur dioxide control and power generation
  {
    const n = (5e6 * 0.014) / 32.1;
    const kgSO2 = (n * chk(Mr("SO2"), 64.1)) / 1000;
    const kgCaCO3 = (n * chk(Mr("CaCO3"), 100.1)) / 1000;
    const m3CO2 = (n * VM_RTP) / 1000;
    b.struct({
      ...P3, d: 4, calculator: true,
      concepts: [A("environment.air-pollution-energy")],
      stem: "A coal-fired power station burns 5.00 tonnes (5.00 × 10⁶ g) of coal every hour. The coal contains 1.40% sulfur by mass. The flue gases pass through a wet limestone scrubber before leaving the chimney. (Ar: C 12.0, O 16.0, S 32.1, Ca 40.1; molar gas volume 24.0 dm³ mol⁻¹ at room conditions)",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.group({ label: "(a)", stem: "For one hour of operation, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the mass of sulfur dioxide formed, in kg, to three significant figures;", value: kgSO2, sf: 3, unit: "kg", wrong: [sfStr(5e3 * 0.014, 3)], explanation: `Mass of S = 0.0140 × 5.00 × 10⁶ = 7.00 × 10⁴ g; n = 7.00 × 10⁴ ÷ 32.1 = ${sfStr(n, 4)} mol = n(SO₂); mass = ${sfStr(n, 4)} × 64.1 = ${sfStr(kgSO2, 3)} kg. The mass of sulfur alone is 70.0 kg.` }),
          P.num({ label: "(ii)", stem: "the minimum mass of limestone (CaCO₃) needed, in kg;", value: kgCaCO3, sf: 3, unit: "kg", explanation: `1 : 1 ratio: ${sfStr(n, 4)} × 100.1 = ${sfStr(kgCaCO3, 3)} kg.` }),
          P.num({ label: "(iii)", stem: "the volume of carbon dioxide released by the scrubbing reaction, in m³ at room conditions (1 m³ = 1000 dm³).", value: m3CO2, sf: 3, unit: "m³", explanation: `CaCO₃ + SO₂ → CaSO₃ + CO₂: ${sfStr(n, 4)} mol CO₂ × 24.0 = ${sfStr(n * 24, 3)} dm³ = ${sfStr(m3CO2, 3)} m³.` }),
        ] }),
        P.mcq({ label: "(b)", stem: "Why does fluidised-bed combustion produce less nitrogen monoxide than a conventional coal furnace?", options: [
          ["It burns the coal at a lower temperature.", "Correct: N₂ + O₂ → 2NO is favoured by very high temperatures."],
          ["Limestone absorbs nitrogen from the air.", "Limestone traps SO₂, not N₂."],
          ["It uses pure oxygen instead of air.", "Fluidised beds use air."],
          ["Coal contains no nitrogen in a fluidised bed.", "The fuel is the same coal."],
        ], answer: "A", explanation: "Lower combustion temperature (below about 900 °C) reduces NO formation." }),
        P.fib({ label: "(c)", stem: "Complete the sentences about catalytic converters.", template: "The catalysts are platinum, palladium and {{blank:a}}. Nitrogen monoxide reacts with carbon monoxide to form carbon dioxide and {{blank:b}}.", blanks: [
          { id: "a", accepted: ["rhodium"], choices: ["rhodium", "iron", "nickel", "vanadium"] },
          { id: "b", accepted: ["nitrogen"], choices: ["nitrogen", "nitrogen dioxide", "ammonia", "oxygen"] },
        ], explanation: "2CO + 2NO → 2CO₂ + N₂ over Pt/Pd/Rh." }),
        P.short({ label: "(d)", stem: "Name the useful solid by-product of wet limestone scrubbing.", accepted: ["gypsum", "calcium sulfate", "calcium sulphate", "hydrated calcium sulfate", "CaSO4.2H2O"], wrong: ["calcium carbonate"], explanation: "Gypsum, CaSO₄·2H₂O." }),
        P.manual({
          label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
          stem: "Discuss the environmental advantages and disadvantages of generating Zimbabwe's electricity from coal compared with hydroelectric and solar power.",
          points: [
            "Coal: reliable supply on demand from local coal, but emits CO₂ (greenhouse gas, climate change)",
            "Coal: also SO₂ and NOₓ (acid rain), particulates (lung disease), ash and land damage from mining; controls such as FGD add cost and CO₂",
            "Hydroelectric: renewable, no emissions in operation, but flooding of land and displacement of people when dams are built",
            "Hydroelectric output falls in droughts when lake levels drop",
            "Solar: renewable, plentiful sunshine, no emissions in use, suits remote areas; but intermittent (night, cloud), needs storage or backup, and panels/batteries need materials and disposal",
            "A reasoned conclusion (for example, a mix of sources balances reliability against emissions)",
          ],
          modelAnswer: "Coal-fired stations use local coal and give a reliable supply on demand, but burning coal releases carbon dioxide, which contributes to climate change, as well as sulfur dioxide and nitrogen oxides that cause acid rain, and particulates that harm health; ash and mining damage land, and pollution controls such as FGD add cost and some CO₂. Hydroelectric power is renewable and produces no emissions while generating, but building a dam floods large areas and moves communities, and output falls in droughts when lake levels are low. Solar power is renewable, Zimbabwe has abundant sunshine, and panels emit nothing in use and suit remote clinics and homes, but output stops at night and drops in cloudy weather, so batteries or backup supply are needed, and these have their own material and disposal costs. A mix of sources reduces the weaknesses of each.",
        }),
        P.tf({ label: "(f)", stem: "Removing sulfur dioxide with limestone also reduces the station's carbon dioxide emissions.", answer: false, explanation: "False: the scrubbing reaction releases CO₂." }),
      ]),
      hints: ["S + O₂ → SO₂, then CaCO₃ + SO₂ → CaSO₃ + CO₂ (all 1 : 1).", "Balance each power source with advantages and disadvantages."],
      explanation: `${sfStr(kgSO2, 3)} kg SO₂ per hour; ${sfStr(kgCaCO3, 3)} kg limestone; ${sfStr(m3CO2, 3)} m³ CO₂ from scrubbing.`,
    });
  }

  // ---------------------------------------------------------------- D2: acid mine drainage, eutrophication and waste disposal
  {
    const c = 4.5e-4;
    const p = pH(2 * c);
    const kgLime = (2.0e5 * c * chk(Mr("Ca(OH)2"), 74.1)) / 1000;
    b.struct({
      ...P3, d: 4, calculator: true,
      concepts: [A("environment.waste-management")],
      stem: t`Water draining from an old mine dump contains sulfuric acid formed by the oxidation of pyrite: $\ce{2FeS2 + 7O2 + 2H2O -> 2FeSO4 + 2H2SO4}$. A sample contained 4.50 × 10⁻⁴ mol dm⁻³ of sulfuric acid (assume complete dissociation). Downstream, the river also receives treated sewage from a town. (Mr Ca(OH)₂ = 74.1)`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the pH of the drainage water, to two decimal places.", value: p, dp: 2, wrong: [dpStr(pH(c), 2)], explanation: `[H⁺] = 2 × 4.50 × 10⁻⁴ = 9.00 × 10⁻⁴; pH = ${dpStr(p, 2)}. Using [H⁺] = [H₂SO₄] gives ${dpStr(pH(c), 2)}.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the mass of calcium hydroxide, in kg, needed to neutralise 2.00 × 10⁵ dm³ of this water (Ca(OH)₂ + H₂SO₄ → CaSO₄ + 2H₂O), to three significant figures.", value: kgLime, sf: 3, unit: "kg", wrong: [sfStr(kgLime * 2, 3)], explanation: `n(H₂SO₄) = 2.00 × 10⁵ × 4.50 × 10⁻⁴ = 90.0 mol = n(Ca(OH)₂); mass = 90.0 × 74.1 = ${sfStr(kgLime * 1000, 3)} g = ${sfStr(kgLime, 3)} kg.` }),
        P.mcq({ label: "(c)", stem: "Which ions in treated sewage are mainly responsible for eutrophication?", options: [
          ["nitrate and phosphate", "Correct: plant nutrients."],
          ["sulfate and chloride", "These do not limit algal growth."],
          ["sodium and potassium", "Not the main cause of algal blooms."],
          ["hydrogencarbonate and carbonate", "These are natural in water."],
        ], answer: "A", explanation: "Nitrates and phosphates." }),
        P.short({ label: "(d)", stem: "Name the gas formed by anaerobic decomposition in a landfill that is both a greenhouse gas and an explosion risk.", accepted: ["methane", "CH4"], wrong: ["carbon dioxide"], explanation: "Methane." }),
        P.manual({ label: "(e)", marks: 4, stem: "Explain how nitrates and phosphates from sewage can lead to the death of fish.", points: ["Nutrients cause rapid growth of algae (algal bloom) / water plants", "Light is blocked and plants below die; algae die", "Aerobic bacteria decompose the dead material, using dissolved oxygen (BOD rises)", "Oxygen concentration falls, so fish suffocate"], modelAnswer: "Nitrates and phosphates are plant nutrients, so algae and water plants grow rapidly, forming a bloom that blocks light; plants below die and the short-lived algae soon die too. Aerobic bacteria decompose the dead material and use up the dissolved oxygen, raising the BOD, so the oxygen concentration falls and fish die." }),
        P.manual({
          label: "(f)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
          stem: "Discuss the problems caused by heavy metals such as mercury and lead in the environment and how their release can be reduced.",
          points: [
            "Heavy metals are not biodegradable; they persist in soil, water and sediments",
            "They bioaccumulate and are magnified along food chains (e.g. methylmercury in fish)",
            "Effects: mercury and lead damage the nervous system (lead especially in children); mercury vapour is toxic when inhaled",
            "Sources: mercury from amalgamation in small-scale gold processing, lead from batteries and old paint",
            "Reduction: retorts to recover mercury, recycling batteries safely, precipitation as hydroxides or sulfides, ion exchange of effluents, regulation",
          ],
          modelAnswer: "Heavy metals cannot be broken down, so once released they persist in soil, water and sediments. They are taken up by organisms faster than they are excreted and build up along food chains: mercury is converted by bacteria to methylmercury, which accumulates in fish eaten by people. Both mercury and lead damage the nervous system, lead especially in children, and mercury vapour from heating gold amalgam is dangerous to breathe. Releases can be reduced by using retorts that capture and recycle mercury in small-scale gold processing, collecting and recycling lead-acid batteries under controlled conditions, treating industrial effluent by precipitating metals as hydroxides or sulfides or by ion exchange, and enforcing regulations on discharges.",
        }),
      ]),
      hints: ["H₂SO₄ gives two H⁺ per molecule.", "Eutrophication: oxygen is used by decomposers, not by living algae."],
      explanation: `pH ${dpStr(p, 2)}; ${sfStr(kgLime, 3)} kg Ca(OH)₂; eutrophication by nutrient enrichment; heavy metals persist and bioaccumulate.`,
    });
  }

  // ---------------------------------------------------------------- D3: platinum group metals and nanocatalysts
  {
    const tonnes = 1000 / (4.0 * 0.85);
    const f = 50 / 5;
    b.struct({
      ...P3, d: 5, calculator: true,
      concepts: [A("transition.platinum-group-metals"), A("nano.nanomaterials")],
      stem: "Platinum group metals (PGMs) are mined from a layered igneous intrusion. In an exercise, the ore contains 4.00 g of PGMs per tonne and the whole process recovers 85.0% of them. Much of the platinum is used in catalytic converters, where it is dispersed as nanoparticles on a ceramic support.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.short({ label: "(a)", stem: "Name one platinum group metal other than platinum.", accepted: ["palladium", "rhodium", "ruthenium", "iridium", "osmium", "Pd", "Rh", "Ru", "Ir", "Os"], wrong: ["nickel"], explanation: "Pd, Rh, Ru, Ir or Os." }),
        P.mcq({ label: "(b)", stem: "Which base metals are recovered as by-products of PGM ores?", options: [
          ["nickel, copper and cobalt", "Correct: they occur as sulfides with the PGMs."],
          ["sodium, potassium and calcium", "These are s-block metals, not found as by-products here."],
          ["aluminium, tin and lead", "These are not the main PGM by-products."],
          ["gold, silver and mercury", "These are not the base metals recovered from PGM ores."],
        ], answer: "A", explanation: "Ni, Cu and Co (and chromite from nearby seams)." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the mass of ore, in tonnes, that must be processed to obtain 1.00 kg of PGMs, to three significant figures.", value: tonnes, sf: 3, unit: "tonnes", wrong: [sfStr(1000 / 4, 3)], explanation: `Recovered per tonne = 4.00 × 0.850 = 3.40 g; 1000 ÷ 3.40 = ${sfStr(tonnes, 3)} t. Ignoring the recovery gives 250 t.` }),
        P.num({ label: "(d)", marks: 2, stem: "Platinum particles of edge 50 nm are replaced by particles of edge 5 nm, using the same mass of platinum. By what factor does the total surface area increase? (Treat the particles as cubes.)", value: f, wrong: [100, 1000], explanation: "SA : V = 6/l; for the same volume, total area ∝ 1/l: 50 ÷ 5 = 10. (100 is the ratio of face areas; 1000 is the number of small cubes per large cube.)" }),
        P.manual({
          label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
          stem: "Outline the extraction of PGMs from the ore and explain why the process is so energy-intensive.",
          points: [
            "Ore mined, crushed and finely milled",
            "Concentrated by froth flotation (sulfide minerals carrying PGMs separated from waste rock)",
            "Smelted in electric furnaces to a nickel-copper sulfide matte that collects the PGMs; converting with air removes iron (slag) and sulfur (SO₂)",
            "Base metals leached out; PGMs separated and refined in a precious-metal refinery (dissolution, selective precipitation, solvent extraction)",
            "Energy-intensive because the ore is very low grade (a few g per tonne), so huge masses are milled, and smelting/refining need high temperatures and many steps",
          ],
          modelAnswer: "The ore is mined, crushed and milled to a fine powder, then concentrated by froth flotation so that the sulfide minerals carrying the PGMs are separated from waste rock. The concentrate is smelted in electric furnaces, forming a molten matte of nickel, copper and iron sulfides that collects the PGMs, while silicates form a slag. Air blown through the matte removes iron as slag and sulfur as SO₂. Nickel, copper and cobalt are leached out, and the PGM concentrate is dissolved and the individual metals separated by selective precipitation and solvent extraction. Because the ore contains only a few grams of PGMs per tonne, hundreds of tonnes of hard rock must be mined and milled for each kilogram, and smelting and refining require high temperatures and many steps, so the energy use is very high.",
        }),
        P.manual({ label: "(f)", marks: 4, stem: "Suggest the advantages of using platinum nanoparticles in catalytic converters, and one possible concern about nanoparticles in general.", points: ["Much larger surface area to volume ratio, so more active sites for adsorption", "Higher activity per gram, so less of a very expensive and scarce metal is needed", "Faster conversion of CO, NOₓ and hydrocarbons (efficient even at small loadings)", "Concern: nanoparticles released (e.g. worn from converters) may enter lungs or cells; long-term health and environmental effects are not fully known"], modelAnswer: "Nanoparticles expose a far larger surface area per gram, giving many more active sites where gases adsorb, so the converter works efficiently with much less platinum, an expensive and scarce metal. A concern is that nanoparticles released into the environment could be inhaled or enter cells, and their long-term effects are not fully known." }),
      ]),
      hints: ["Recovered mass per tonne = grade × recovery.", "For a fixed volume, total surface area is proportional to 1/l."],
      explanation: `${sfStr(tonnes, 3)} tonnes of ore per kg of PGMs; nanoparticles 10 times more surface for 5 nm vs 50 nm.`,
    });
  }

  // ---------------------------------------------------------------- Z4: Paper 4 quantitative: copper in brass by iodometry
  {
    const readings = [[0.0, 25.6], [0.85, 26.0], [0.4, 25.65], [1.65, 26.85]];
    const titres = readings.map(([a, c]) => titre(a, c));
    const { mean: mt } = meanTitre(titres.slice(1));
    chk(mt, 25.2, 1e-9, "mean titre");
    const nS = molesFromSolution(mt, 0.05);
    const gCu = nS * 10 * 63.5;
    const pct = (gCu / 1.25) * 100;
    const unc = pctErrorDifference(0.05, mt);
    b.struct({
      ...P4, d: 5, calculator: true,
      concepts: [A("skills.quantitative-practical"), A("transition.copper"), A("electrochem.redox-titrations")],
      stem: "You are to determine the percentage of copper in a sample of brass.\n\nMethod (carried out in a fume cupboard, with eye protection and gloves):\n\n1. 1.25 g of brass turnings was dissolved in concentrated nitric acid, and the solution was boiled to remove oxides of nitrogen.\n2. Sodium carbonate solution was added until a faint permanent precipitate appeared, then ethanoic acid was added until it just dissolved.\n3. The solution was made up to 250.0 cm³ in a volumetric flask with distilled water.\n4. 25.0 cm³ portions were pipetted into a conical flask and 10 cm³ of 10% potassium iodide solution (an excess) was added: 2Cu²⁺ + 4I⁻ → 2CuI + I₂.\n5. The liberated iodine was titrated with 0.0500 mol dm⁻³ sodium thiosulfate, adding starch when the solution was pale yellow: I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻.\n\n| titration | rough | 1 | 2 | 3 |\n|---|---|---|---|---|\n| final burette reading / cm³ | 25.60 | 26.00 | 25.65 | 26.85 |\n| initial burette reading / cm³ | 0.00 | 0.85 | 0.40 | 1.65 |\n\n(Ar Cu = 63.5)",
      parts: checkExam(EXAM.ZIM_P4_QUANTITATIVE, [
        P.manual({ label: "(a)", marks: 3, stem: "Describe how the results table should be completed and presented.", points: ["A row for the titre (volume used) for each titration, calculated as final − initial", "Headings with units (e.g. final burette reading / cm³), with the rough titration labelled", "All readings and titres to two decimal places ending in 0 or 5 (nearest 0.05 cm³), and the titres used for the mean indicated (ticked)"], modelAnswer: "Add a row 'titre / cm³' giving final − initial for each run: 25.60 (rough), 25.15, 25.25 and 25.20. Every heading carries its unit, the rough titration is labelled, all values are recorded to 0.05 cm³ (two decimal places), and the concordant titres used for the mean are ticked." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the mean of the concordant titres, in cm³, to two decimal places.", value: mt, dp: 2, unit: "cm³", wrong: [dpStr((titres[0] + titres[1] + titres[2] + titres[3]) / 4, 2)], explanation: `Titres: rough ${dpStr(titres[0], 2)}, then ${titres.slice(1).map((x) => dpStr(x, 2)).join(", ")}. The three accurate titres agree within 0.10 cm³: mean = ${dpStr(mt, 2)} cm³. Including the rough titre gives ${dpStr((titres[0] + titres[1] + titres[2] + titres[3]) / 4, 2)} cm³.` }),
        P.num({ label: "(c)", stem: "Calculate the amount of thiosulfate in the mean titre, in mol.", value: nS, unit: "mol", explanation: `${dpStr(mt, 2)} ÷ 1000 × 0.0500 = ${sciStr(nS, 3)} mol.` }),
        P.num({ label: "(d)", marks: 2, stem: "Deduce the amount of Cu²⁺ in 25.0 cm³ of the solution, in mol.", value: nS, unit: "mol", wrong: [sciStr(nS / 2, 3)], explanation: `2Cu²⁺ → I₂ → 2S₂O₃²⁻, so Cu²⁺ : S₂O₃²⁻ = 1 : 1: ${sciStr(nS, 3)} mol. Halving (taking the I₂ : S₂O₃²⁻ ratio alone) gives ${sciStr(nS / 2, 3)}.` }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the mass of copper in the 1.25 g sample, in g, to three significant figures.", value: gCu, sf: 3, unit: "g", wrong: [sfStr(gCu / 10, 3)], explanation: `In 250.0 cm³: ${sciStr(nS * 10, 3)} mol; mass = × 63.5 = ${sfStr(gCu, 3)} g. Forgetting the ×10 scale-up gives ${sfStr(gCu / 10, 3)} g.` }),
        P.num({ label: "(f)", stem: "Calculate the percentage by mass of copper in the brass, to three significant figures.", value: pct, sf: 3, unit: "%", explanation: `${sfStr(gCu, 3)} ÷ 1.25 × 100 = ${sfStr(pct, 3)}%.` }),
        P.num({ label: "(g)", stem: "Each burette reading has an uncertainty of ±0.05 cm³. Calculate the percentage uncertainty in the mean titre, to three significant figures.", value: unc, sf: 3, unit: "%", wrong: [sfStr((0.05 / mt) * 100, 3)], explanation: `Two readings: ±0.10 cm³; 0.10 ÷ ${dpStr(mt, 2)} × 100 = ${sfStr(unc, 3)}%. Using one reading gives ${sfStr((0.05 / mt) * 100, 3)}%.` }),
        P.manual({ label: "(h)", marks: 2, stem: "Explain why the solution was boiled in step 1 and why sodium carbonate and then ethanoic acid were added in step 2.", points: ["Boiling removes oxides of nitrogen (NO₂), which would otherwise oxidise iodide to iodine and give a high titre", "Sodium carbonate neutralises the excess nitric acid (which would oxidise I⁻); ethanoic acid gives a weakly acidic solution in which Cu²⁺ stays in solution and the reaction with iodide works"], modelAnswer: "Boiling drives off nitrogen oxides, which would oxidise iodide ions to iodine and make the titre too high. Sodium carbonate neutralises the strong nitric acid, which would also oxidise iodide; the first permanent precipitate shows the acid is neutralised. Ethanoic acid then redissolves the precipitate and gives a weakly acidic solution suitable for the Cu²⁺/I⁻ reaction." }),
        P.manual({ label: "(i)", marks: 4, stem: "Identify two sources of error in this determination and suggest an improvement for each.", points: ["The end-point is hard to see because of the off-white CuI precipitate (or iodine adsorbed on CuI is released slowly, giving a fading end-point)", "Improvement: add potassium thiocyanate near the end-point to release adsorbed iodine, or titrate slowly with swirling, or use a white tile", "Iodine is volatile and iodide is oxidised by air (or Fe³⁺ impurities from the brass also liberate iodine)", "Improvement: titrate promptly after adding KI and keep the flask covered (or add fluoride/phosphate to mask Fe³⁺); repeat until titres agree to within 0.10 cm³"], modelAnswer: "The off-white precipitate of copper(I) iodide makes the blue-black to white end-point hard to judge, and some iodine is adsorbed on the precipitate and released slowly; adding potassium thiocyanate near the end-point releases it and gives a sharp end-point. Iodine can also be lost by evaporation, and air slowly oxidises iodide to extra iodine; titrating promptly after adding KI in a covered flask reduces this. Any iron(III) from the brass would also liberate iodine; it can be masked with fluoride ions." }),
        P.manual({ label: "(j)", marks: 2, stem: "State two safety precautions specific to step 1 and give the reason for each.", points: ["Work in a fume cupboard because the nitrogen dioxide given off is toxic", "Wear gloves and eye protection because concentrated nitric acid is corrosive (and a strong oxidising agent)"], modelAnswer: "Carry out the dissolving in a fume cupboard because brown nitrogen dioxide is toxic; wear gloves and eye protection because concentrated nitric acid is corrosive." }),
      ]),
      hints: ["Cu²⁺ : S₂O₃²⁻ = 1 : 1.", "Scale up from 25.0 cm³ to 250.0 cm³.", "Exclude the rough titre from the mean."],
      explanation: `Mean titre ${dpStr(mt, 2)} cm³; ${sciStr(nS, 3)} mol Cu²⁺ per 25.0 cm³; ${sfStr(gCu, 3)} g Cu; ${sfStr(pct, 3)}% copper.`,
    });
  }
});
