// W1a: ZIMSEC-only exam-format items: three Paper 3 essays (8 + 12) and one Paper 4 investigation (semi-quantitative
// Benedict's test).
import { concept, P, t, chk, table, dpStr, EXAM, checkExam, ZIM, mean } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const ESSAY = { skill: EXAM.ZIM_P3_ESSAY.skill, secs: EXAM.ZIM_P3_ESSAY.secs, applies: EXAM.ZIM_P3_ESSAY.applies, examStyle: true, paper: "Paper 3" };

concept(A("molecules.polysaccharides"), { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- Essay 1: polysaccharides and water
  b.struct({
    ...ESSAY, d: 4,
    concepts: [A("molecules.polysaccharides"), A("molecules.water")],
    stem: "Answer both parts.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe the molecular structure of starch, glycogen and cellulose.",
        points: [
          "Starch is a mixture of amylose and amylopectin, both polymers of α-glucose",
          "Amylose: unbranched chains joined by α-1,4 glycosidic bonds",
          "Amylose chain coils into a helix (held by hydrogen bonds)",
          "Amylopectin: α-1,4 chains with branches joined by α-1,6 glycosidic bonds (about every 24–30 units)",
          "Glycogen: α-glucose with α-1,4 and α-1,6 bonds, more highly branched (about every 8–12 units) / compact granules",
          "Cellulose: β-glucose joined by β-1,4 glycosidic bonds",
          "Alternate glucose units rotated 180°, giving straight unbranched chains",
          "Parallel chains held by many hydrogen bonds into microfibrils, bundled into fibres",
        ],
        modelAnswer: "Starch consists of two polymers of α-glucose. Amylose is an unbranched chain of α-glucose units joined by α-1,4 glycosidic bonds; the bond angle makes the chain coil into a helix held by hydrogen bonds. Amylopectin also has α-1,4-linked chains, but every 24–30 units or so a branch is attached by an α-1,6 glycosidic bond.\n\nGlycogen is built in the same way as amylopectin, from α-glucose with α-1,4 and α-1,6 bonds, but it is much more highly branched, with a branch every 8–12 units, forming dense, compact granules.\n\nCellulose is a polymer of β-glucose joined by β-1,4 glycosidic bonds. To form these bonds each glucose unit is rotated through 180° relative to its neighbour, so the chains are straight and unbranched. Many parallel chains are held together by hydrogen bonds between their –OH groups to form microfibrils, which are bundled into fibres.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 },
        stem: "Explain how the properties of water make it important to living organisms.",
        points: [
          "Water molecules are polar: δ− oxygen and δ+ hydrogens",
          "Hydrogen bonds form between neighbouring water molecules",
          "Solvent for polar / charged substances (ions, glucose), as water molecules surround them",
          "So reactions in cells take place in solution",
          "Transport medium: blood plasma, xylem and phloem carry dissolved substances; urea excreted in solution",
          "High specific heat capacity: much energy needed to break hydrogen bonds before temperature rises",
          "So body temperature and water bodies stay stable; enzymes work near their optimum / stable aquatic habitats",
          "High latent heat of vaporisation: evaporation of sweat / transpiration removes much heat, cooling the organism",
          "Cohesion (and adhesion) allows water to be pulled up xylem in a continuous column; surface tension supports small organisms",
          "Ice is less dense than water / maximum density at about 4 °C, so ice floats and insulates water below; organisms survive beneath",
          "Water is a reactant in hydrolysis and in photosynthesis (photolysis)",
          "Water provides a habitat / supports aquatic organisms / stable environment with dissolved gases (e.g. Lake Kariba)",
        ],
        modelAnswer: "Water molecules are polar: the oxygen atom is slightly negative and the hydrogen atoms slightly positive. As a result, hydrogen bonds form between neighbouring molecules, and these explain most of water's properties.\n\nBecause it is polar, water is an excellent solvent for ions and polar molecules such as glucose and amino acids; water molecules cluster around them. Metabolic reactions therefore take place in solution in the cytoplasm, and water acts as a transport medium: blood plasma carries glucose, hormones and urea, xylem carries mineral ions and phloem carries sucrose. Urea is excreted dissolved in urine.\n\nWater has a high specific heat capacity, because much energy is used to break hydrogen bonds before the molecules move faster. The temperature of organisms and of lakes and rivers therefore changes slowly, so enzymes work close to their optimum and aquatic organisms have a stable environment.\n\nWater also has a high latent heat of vaporisation: a lot of energy is needed to change it into vapour. Evaporation of sweat from the skin of mammals and of water from leaves during transpiration therefore removes much heat, cooling the organism while losing relatively little water.\n\nHydrogen bonding makes water molecules cohesive, so water is pulled up the xylem in continuous columns, and gives a surface tension that supports small animals such as pond skaters. Water is most dense at about 4 °C, and ice is less dense than liquid water, so ice floats and insulates the water beneath, allowing organisms to survive under it in cold climates.\n\nFinally, water is a reactant in hydrolysis reactions such as digestion and in photosynthesis, where it is split to provide electrons and hydrogen ions, and it provides a habitat with dissolved oxygen and carbon dioxide for aquatic organisms, such as the kapenta of Lake Kariba.",
      }),
    ]),
    explanation: "Part (a) describes monomers, bonds, branching and shape; part (b) links hydrogen bonding to solvent, thermal, cohesive, density and reactant properties and their biological importance.",
    hints: ["(a): for each polysaccharide give monomer, bonds and shape.", "(b): start from polarity and hydrogen bonds, then property → importance."],
  });

  // ---------------------------------------------------------------- Essay 2: protein structure, haemoglobin and collagen
  b.struct({
    ...ESSAY, d: 5,
    concepts: [A("molecules.protein-structure"), A("molecules.haemoglobin-collagen")],
    stem: "Answer both parts.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe the primary, secondary, tertiary and quaternary structure of proteins.",
        points: [
          "Primary: the sequence of amino acids in a polypeptide",
          "Held by peptide bonds formed by condensation",
          "Secondary: regular folding into an α-helix or β-pleated sheet",
          "Held by hydrogen bonds between C=O and N–H groups of the backbone",
          "Tertiary: further folding of the whole chain into a specific 3D shape",
          "Held by interactions between R groups: hydrogen bonds, ionic bonds, disulfide bonds, hydrophobic interactions (any three named)",
          "Quaternary: two or more polypeptide chains associated (e.g. haemoglobin, insulin)",
          "Held by the same types of bond; may include a prosthetic group (e.g. haem)",
        ],
        modelAnswer: "The primary structure of a protein is the sequence of amino acids in its polypeptide chain, held together by peptide bonds formed in condensation reactions. It is coded for by a gene and determines all higher levels of structure.\n\nSecondary structure is the regular folding of parts of the chain into α-helices or β-pleated sheets. It is held by hydrogen bonds between the –C=O group of one peptide bond and the –N–H group of another.\n\nTertiary structure is the further folding of the whole chain into a precise three-dimensional shape. It is held by interactions between R groups: hydrogen bonds between polar R groups, ionic bonds between charged R groups, disulfide bonds between cysteines and hydrophobic interactions between non-polar R groups.\n\nQuaternary structure is found in proteins with two or more polypeptide chains, such as haemoglobin and insulin. The chains are held together by the same kinds of bonds, and the protein may include a prosthetic group such as haem.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 },
        stem: "Discuss how the structures of haemoglobin and collagen are related to their functions.",
        points: [
          "Haemoglobin is a globular protein of four chains: two α and two β (quaternary structure)",
          "Each chain has a haem prosthetic group containing an iron(II) ion",
          "Each Fe²⁺ binds one O₂ reversibly, so one molecule carries up to four oxygen molecules",
          "Hydrophilic R groups on the outside make haemoglobin soluble, so a high concentration is held in red blood cells",
          "Interaction between chains: binding of one O₂ changes shape and makes further binding easier (cooperative binding), so loading in the lungs is efficient",
          "Reversible binding allows release of oxygen in respiring tissues",
          "Sickle cell: replacing glutamic acid with valine shows how a change in primary structure affects function",
          "Collagen is a fibrous protein of three chains in a triple helix",
          "Glycine (smallest R group) at every third position allows the chains to pack tightly",
          "Chains held by many hydrogen bonds; covalent cross-links join neighbouring molecules",
          "Staggered molecules form fibrils, bundled into fibres, with no lines of weakness",
          "Giving high tensile strength and insolubility, suited to tendons, skin, bone and artery walls",
        ],
        modelAnswer: "Haemoglobin is a globular protein made of four polypeptide chains, two α-globin and two β-globin, so it has quaternary structure. Each chain carries a haem prosthetic group with an iron(II) ion at its centre, and each iron ion binds one oxygen molecule reversibly, so one haemoglobin molecule carries up to four oxygen molecules. The chains fold so that hydrophilic R groups face outwards, making haemoglobin soluble; red blood cells can therefore hold a very high concentration of it. The chains interact: when one oxygen molecule binds, the shape of the molecule changes slightly so that the next ones bind more easily, so haemoglobin loads oxygen efficiently in the lungs; because binding is reversible, oxygen is released in respiring tissues. The importance of structure is shown by sickle-cell haemoglobin, in which a single substitution of valine for glutamic acid in the β chain creates a hydrophobic patch, so molecules stick together at low oxygen concentration and distort red cells.\n\nCollagen is a fibrous protein made of three polypeptide chains wound into a triple helix. Glycine, with the smallest R group, occurs at every third position, allowing the chains to pack closely, and they are held together by many hydrogen bonds. Neighbouring collagen molecules are joined by covalent cross-links and lie staggered so that their ends do not coincide, forming fibrils that are bundled into fibres. This gives collagen very high tensile strength with no lines of weakness, and makes it insoluble and stable, which suits its role in tendons, which transmit the pull of muscles to bones, and in skin, bone and the walls of arteries, which must withstand high pressure.\n\nIn summary, haemoglobin's compact, soluble, haem-containing structure suits a transport role, while collagen's long, cross-linked, insoluble fibres suit a structural role.",
      }),
    ]),
    explanation: "Part (a) names each level and its bonds; part (b) links structural features of haemoglobin and collagen to oxygen transport and tensile strength.",
    hints: ["(a): one paragraph per level, naming the bonds.", "(b): feature → consequence for each protein."],
  });

  // ---------------------------------------------------------------- Essay 3: enzymes
  b.struct({
    ...ESSAY, d: 4,
    concepts: [A("enzymes.mode-of-action"), A("enzymes.factors"), A("enzymes.inhibition-kinetics")],
    stem: "Answer both parts.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Outline how enzymes catalyse reactions.",
        points: [
          "Enzymes are globular proteins with a specific tertiary structure",
          "Active site has a shape complementary to the substrate, making enzymes specific",
          "Substrate collides with and binds to the active site, forming an enzyme-substrate complex",
          "Lock-and-key: rigid active site exactly complementary to substrate",
          "Induced fit: active site changes shape slightly as substrate binds, moulding around it",
          "Bonds in the substrate are strained / reacting groups held close together",
          "Activation energy is lowered, so reaction is faster at body temperature",
          "Products released; enzyme unchanged and reused",
        ],
        modelAnswer: "Enzymes are globular proteins folded into a precise tertiary structure that includes an active site, a small region whose shape and charges are complementary to the substrate. Only a substrate of the right shape can bind, so enzymes are specific.\n\nThe substrate collides with the active site and binds, forming an enzyme-substrate complex. In the lock-and-key model the active site is rigid and exactly complementary. In the more widely accepted induced-fit model the active site changes shape slightly as the substrate binds, moulding itself around it. This puts strain on bonds in the substrate, or holds reacting molecules close together in the right orientation, lowering the activation energy so the reaction proceeds rapidly at body temperature. The products are then released, and the unchanged enzyme can catalyse the reaction again.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 },
        stem: "Explain how temperature, pH and inhibitors affect the rate of enzyme-catalysed reactions.",
        points: [
          "Rising temperature (below optimum) increases kinetic energy of enzyme and substrate molecules",
          "More frequent / energetic collisions, more enzyme-substrate complexes per second, faster rate",
          "Above the optimum, vibration breaks hydrogen and ionic bonds holding the tertiary structure",
          "Active site changes shape, substrate no longer fits, enzyme denatured (irreversible), rate falls",
          "Low temperatures inactivate but do not denature (reversible)",
          "Each enzyme has an optimum pH (e.g. pepsin about 2, trypsin about 8)",
          "Changes in H⁺ concentration alter charges on R groups, breaking ionic and hydrogen bonds; active site shape and binding altered; extreme pH denatures",
          "Competitive inhibitors have a shape similar to the substrate and bind the active site",
          "Effect reduced by increasing substrate concentration (substrate outcompetes inhibitor)",
          "Non-competitive inhibitors bind elsewhere, changing the shape of the active site",
          "Effect not overcome by increasing substrate concentration (maximum rate reduced)",
          "Irreversible inhibitors (heavy metals, cyanide, organophosphates) bind permanently and inactivate the enzyme",
        ],
        modelAnswer: "As temperature rises towards the optimum, enzyme and substrate molecules gain kinetic energy and move faster, so they collide more often and with more energy; more enzyme-substrate complexes form each second and the rate increases. Above the optimum the enzyme vibrates so much that hydrogen and ionic bonds holding its tertiary structure break; the active site changes shape so the substrate no longer fits, and the enzyme is denatured. This is irreversible, so the rate falls sharply. At low temperatures enzymes are merely inactive and recover on warming.\n\nEach enzyme has an optimum pH: pepsin works best at about pH 2 and trypsin at about pH 8. A change in hydrogen ion concentration alters the charges on R groups, especially in the active site. Ionic and hydrogen bonds are disrupted, the active site changes shape and charged groups that bind the substrate are altered, so fewer complexes form; extremes of pH denature the enzyme.\n\nInhibitors reduce the rate. A competitive inhibitor has a shape similar to the substrate and binds reversibly to the active site, so substrate cannot enter while it is bound. Because substrate and inhibitor compete, raising the substrate concentration reduces the inhibition. A non-competitive inhibitor binds at another site and changes the shape of the active site, so the enzyme cannot catalyse the reaction; adding substrate does not overcome this, so the maximum rate is lowered. Irreversible inhibitors such as mercury and other heavy metal ions, cyanide and organophosphate insecticides bind permanently, inactivating the enzyme for good.",
      }),
    ]),
    explanation: "Part (a) outlines the active site, enzyme-substrate complex, the two models and activation energy; part (b) explains temperature, pH and inhibitor effects in terms of collisions, bonds and active site shape.",
    hints: ["(a): active site → complex → activation energy.", "(b): one paragraph each for temperature, pH and inhibitors."],
  });

  // ---------------------------------------------------------------- ZIMSEC Paper 4: semi-quantitative Benedict's test
  const conc = [0.12, 0.24, 0.36, 0.48, 0.6, 0.72];
  const reps = [[168, 175, 163], [109, 114, 106], [78, 81, 76], [62, 58, 79], [48, 52, 51], [42, 40, 43]];
  const unk = [71, 68, 74];
  const mean06 = mean([62, 58]);
  chk(mean06, 60);
  const m45 = mean(reps[2]);
  const rate04 = 1000 / m45;
  const rU = 1000 / mean(unk);
  const est = 0.36 + ((rU - rate04) / (1000 / mean06 - rate04)) * 0.12;
  const estT = 0.36 + ((m45 - mean(unk)) / (m45 - mean06)) * 0.12;
  if (Math.abs(est - estT) > 0.03) throw new Error("estimates differ too much");
  const estMid = (est + estT) / 2;
  b.struct({
    skill: EXAM.ZIM_P4_INVESTIGATION.skill, secs: EXAM.ZIM_P4_INVESTIGATION.secs, applies: EXAM.ZIM_P4_INVESTIGATION.applies, examStyle: true, paper: "Paper 4", d: 4, calculator: true,
    concepts: [A("molecules.tests"), A("skills.practical-investigation")],
    stem: `Nyasha estimated the concentration of reducing sugar in a sample of diluted orange juice.\n\n1. She prepared glucose solutions of 0.12, 0.24, 0.36, 0.48, 0.60 and 0.72% (w/v).\n2. She put 2 cm³ of a glucose solution and 2 cm³ of Benedict's solution into a test tube, placed it in a water bath at 90 °C and started a stop-clock.\n3. She recorded the time for the first colour change (blue to green).\n4. She repeated step 2 and step 3 three times for each concentration and for the diluted juice.\n\nHer raw results are given below (times in seconds):\n\n${table(["Glucose / % (w/v)", "Trial 1", "Trial 2", "Trial 3"], conc.map((c, i) => [dpStr(c, 2), ...reps[i]]))}\n\nDiluted orange juice: 71, 68, 74.`,
    parts: checkExam(EXAM.ZIM_P4_INVESTIGATION, [
      P.manual({
        label: "(a)", marks: 3, stem: "State the independent variable, the dependent variable and **two** variables that Nyasha kept constant.",
        points: ["Independent: concentration of glucose", "Dependent: time to first colour change (blue to green)", "Two standardised variables: volume of glucose solution, volume of Benedict's, water-bath temperature, size of tube (both needed)"],
        modelAnswer: "Independent variable: glucose concentration. Dependent variable: time for the first colour change. Kept constant: the volumes of glucose solution and Benedict's solution (2 cm³ each) and the temperature of the water bath (90 °C).",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe how Nyasha should set out a results table that also includes processed results.",
        points: ["Columns for glucose concentration / % (w/v), Trials 1–3, mean time and rate", "Units in the column headings only (s; % (w/v); s⁻¹), not in the body of the table", "Independent variable in the first column in ascending order; raw times as whole numbers, means and rates to a consistent number of decimal places"],
        modelAnswer: "A table with columns headed 'Glucose concentration / % (w/v)', 'Time to first colour change / s' subdivided into Trial 1, Trial 2, Trial 3 and Mean, and 'Rate (1000/t) / s⁻¹'. Units appear only in the headings; concentrations are in ascending order in the first column; raw times are whole numbers and means and rates are given to one decimal place.",
      }),
      P.group({
        label: "(c)", stem: "Process the results.",
        parts: [
          P.short({ label: "(i)", marks: 1, stem: "Identify the anomalous result (give the time in seconds).", accepted: ["79", "79 s", "79s"], explanation: "79 s at 0.48% is far from 62 s and 58 s and does not fit the trend (it is longer than the times at 0.36%)." }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the mean time for 0.48% glucose, excluding the anomalous result.", value: mean06, unit: "s", wrong: ["66.3"], explanation: "(62 + 58) ÷ 2 = 60 s. Including 79 gives 66.3 s." }),
          P.num({ label: "(iii)", marks: 1, stem: "Calculate the rate (1000/mean time) for 0.36% glucose, in s⁻¹, to one decimal place.", value: rate04, dp: 1, unit: "s⁻¹", wrong: ["0.013"], explanation: "Mean = (78 + 81 + 76) ÷ 3 = 78.3 s; 1000 ÷ 78.3 = 12.8 s⁻¹." }),
        ],
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Nyasha plotted rate (1000/mean time) against glucose concentration. Describe the graph she would obtain.",
        points: ["Rate on the y-axis, concentration on the x-axis, both labelled with units; points plotted accurately", "Rate increases as glucose concentration increases (from about 5.9 s⁻¹ at 0.12% to 24.0 s⁻¹ at 0.72%)", "Almost a straight line / line of best fit, slightly less steep at the higher concentrations"],
        modelAnswer: "Concentration / % (w/v) on the x-axis and rate / s⁻¹ on the y-axis. The rate rises steadily from about 5.9 s⁻¹ at 0.12% to 24.0 s⁻¹ at 0.72%; the points lie close to a straight line, becoming slightly less steep at the highest concentrations.",
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Use the results to estimate the concentration of reducing sugar in the diluted juice, in % (w/v), to two decimal places.",
        value: estMid, tol: 0.03, unit: "%", answer: dpStr(estMid, 2), wrong: ["0.71"],
        explanation: `Mean time for the juice = 71 s, between 78.3 s (0.36%) and 60 s (0.48%). Its rate, 1000 ÷ 71 = 14.1 s⁻¹, lies between 12.8 and 16.7 s⁻¹; interpolating on the rate gives ${dpStr(est, 2)}% and on the times ${dpStr(estT, 2)}%, so about ${dpStr(estMid, 2)}% (w/v). Any value from about 0.38 to 0.43% read from a graph is acceptable.`,
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Identify **three** sources of error in Nyasha's method.",
        points: ["Judging the first colour change by eye is subjective / end point difficult to see", "Tubes may not reach 90 °C at the same time / temperature of water bath fluctuates / Benedict's not pre-warmed", "Reaction time of starting / stopping the stop-clock, or volumes measured inaccurately, or juice contains other reducing sugars (fructose) so result is glucose equivalent"],
        modelAnswer: "The first colour change is judged by eye, which is subjective. The solutions start cold and warm up at different rates, and the water-bath temperature may vary. Starting and stopping the clock depends on reaction time, and the juice contains fructose as well as glucose, so the result is only a reducing-sugar 'glucose equivalent'.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Suggest **three** improvements to the method.",
        points: ["Use a colour standard / white background / colorimeter to judge the end point", "Pre-warm solutions in the water bath before mixing, or use a thermostatically controlled bath", "Use more standards between 0.36 and 0.48% (narrower range) or repeat the anomalous trial / more replicates"],
        modelAnswer: "Compare each tube with a green colour standard against a white tile, or use a colorimeter, and pre-warm both solutions in the water bath before mixing them. Adding standards at 0.40 and 0.44% would narrow the estimate, and the anomalous 0.48% trial should be repeated.",
      }),
    ]),
    explanation: "Rates (1000/mean time) increase with concentration; the juice's mean time (71 s) lies between the 0.36% and 0.48% standards, giving about 0.40% (w/v).",
    hints: ["Exclude the anomaly before calculating the mean.", "Shorter time = higher concentration."],
  });
});
