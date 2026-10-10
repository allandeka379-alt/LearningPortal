// W1a: starch, glycogen and cellulose.
import { concept, P, t, chk } from "../lib.mjs";

concept("abio.molecules.polysaccharides", { file: "molecules/polysaccharides", keyPrefix: "molecules.polysaccharides" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which polysaccharide is made of β-glucose?",
    options: [
      ["Cellulose", "Correct: cellulose is a polymer of β-glucose joined by β-1,4 bonds."],
      ["Amylose", "Amylose is a polymer of α-glucose."],
      ["Amylopectin", "Amylopectin is a branched polymer of α-glucose."],
      ["Glycogen", "Glycogen is a highly branched polymer of α-glucose."],
    ],
    answer: "A",
    explanation: "Starch (amylose and amylopectin) and glycogen use α-glucose; only cellulose uses β-glucose.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which bonds are present in amylopectin?",
    options: [
      ["α-1,4 and α-1,6 glycosidic bonds", "Correct: α-1,4 in the chains and α-1,6 at the branch points."],
      ["α-1,4 glycosidic bonds only", "This describes amylose, which is unbranched."],
      ["β-1,4 glycosidic bonds only", "This describes cellulose."],
      ["β-1,4 and β-1,6 glycosidic bonds", "Amylopectin is made of α-glucose, so all its glycosidic bonds are α."],
    ],
    answer: "A",
    explanation: "Amylopectin and glycogen are branched: α-1,4 bonds along each chain and α-1,6 bonds where branches attach.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is glycogen better suited than amylopectin to meeting the energy needs of an animal?",
    options: [
      ["It is more highly branched, so it has more ends where glucose can be removed quickly", "Correct: enzymes act at chain ends, so more branches allow faster release."],
      ["It is made of β-glucose, which releases more energy in respiration than α-glucose", "Glycogen is made of α-glucose; both isomers release the same energy."],
      ["It is soluble, so it moves rapidly in the blood to the muscles", "Glycogen is insoluble and stays inside liver and muscle cells."],
      ["It is unbranched, so it can coil into a tighter helix than amylopectin", "Glycogen is highly branched, not unbranched."],
    ],
    answer: "A",
    explanation: "Glycogen has a branch about every 8–12 units; more ends mean many enzyme molecules can hydrolyse it at once, releasing glucose rapidly for the high and variable energy demands of animals.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What holds neighbouring cellulose molecules together in a microfibril?",
    options: [
      ["Hydrogen bonds between –OH groups of parallel chains", "Correct: many hydrogen bonds between straight chains give high tensile strength."],
      ["β-1,4 glycosidic bonds between the parallel chains", "Glycosidic bonds join glucose units within a chain, not chains to each other."],
      ["Disulfide bonds between neighbouring chains", "Disulfide bonds form between cysteine R groups in proteins."],
      ["Ester bonds between the chains", "Ester bonds join fatty acids to glycerol in lipids."],
    ],
    answer: "A",
    explanation: "Within each chain: β-1,4 glycosidic bonds. Between chains: very many hydrogen bonds, which together make microfibrils very strong.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does amylose form a helix whereas cellulose forms straight chains?",
    options: [
      ["The α-1,4 bond angle makes the chain coil; in β-1,4 chains alternate units are inverted", "Correct: the type of glucose determines the geometry of the bond and the chain."],
      ["Amylose has α-1,6 branches that twist it, whereas cellulose has none", "Amylose is unbranched; its coiling comes from the α-1,4 bond angle."],
      ["Amylose chains are short, whereas cellulose chains are very long", "Both can be long; length does not decide coiling."],
      ["Amylose contains fructose units that bend the chain", "Amylose is made only of α-glucose."],
    ],
    answer: "A",
    explanation: "α-1,4 linkages put successive units at an angle that winds the chain into a helix. β-1,4 linkage needs each unit rotated 180°, giving a straight chain with –OH groups on both sides for hydrogen bonding.",
    hints: ["What is different about the glucose units used?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does storing glucose as starch rather than as free glucose prevent a plant cell from taking up excess water?",
    options: [
      ["Starch is insoluble, so it does not lower the water potential of the cell", "Correct: insoluble starch is osmotically inactive."],
      ["Starch is soluble but too large to pass through the cell surface membrane", "Starch is insoluble; the key point is its effect on water potential."],
      ["Starch actively pumps water out of the cell through the tonoplast", "Starch is a storage molecule; it does not transport water."],
      ["Starch raises the solute concentration, so water leaves the cell", "Raising solute concentration would draw water in, not out."],
    ],
    answer: "A",
    explanation: "Many dissolved glucose molecules would lower the water potential and water would enter by osmosis. Insoluble starch has almost no osmotic effect.",
    hints: ["Think about water potential."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A polysaccharide is hydrolysed completely and gives only glucose. It does not give a blue-black colour with iodine, and it is digested rapidly by enzymes in the liver. Which polysaccharide is it most likely to be?",
    options: [
      ["Glycogen", "Correct: highly branched α-glucose polymer of the liver; its short chains give little or no blue-black colour."],
      ["Amylose", "Amylose gives an intense blue-black colour with iodine."],
      ["Cellulose", "Cellulose is not digested by mammalian liver enzymes."],
      ["Sucrose", "Sucrose is a disaccharide and gives glucose and fructose."],
    ],
    answer: "A",
    explanation: "Only glucose on hydrolysis rules out sucrose; no blue-black rules out amylose (glycogen's short branches do not hold iodine in long helices); rapid digestion in the liver rules out cellulose.",
    hints: ["Use each clue to eliminate one option."],
  });
  const units = (81018 + 162 * 120 - 18) / 162;
  const mrA = 620 * 162 + 18;
  chk(mrA, 100458);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Each glucose unit adds 162 to the relative molecular mass of a polysaccharide chain, plus 18 for one water molecule at the ends of the whole chain. Calculate the Mr of an amylose molecule of 620 glucose units.",
    value: mrA,
    wrong: ["100440", "111600"],
    explanation: "620 × 162 + 18 = 100 458. Leaving out the 18 gives 100 440; using 180 per unit (forgetting the water lost in each bond) gives about 111 600.",
    hints: ["Multiply the number of units by 162, then add 18."],
  });
  chk(units, 620);
  const branches = 2400 / 12;
  chk(branches, 200);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "A glycogen molecule contains 2400 glucose units with, on average, one α-1,6 branch point every 12 units. An amylopectin molecule of the same size has one branch point every 30 units. Using the model that the number of chain ends = number of branch points + 1, calculate how many times more chain ends the glycogen molecule has. Give your answer to two significant figures.",
    value: (2400 / 12 + 1) / (2400 / 30 + 1), sf: 2,
    wrong: ["0.40"],
    explanation: t`1. Glycogen branch points: $2400 \div 12 = 200$, so 201 ends.
2. Amylopectin branch points: $2400 \div 30 = 80$, so 81 ends.
3. Ratio $= 201 \div 81 = 2.48$, which is 2.5 to two significant figures (dividing the other way round gives 0.40).
4. More ends allow more enzyme molecules to remove glucose at the same time, so glycogen is mobilised faster.`,
    hints: ["Find the number of branch points of each molecule first."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Glycogen is the main storage polysaccharide in animal liver and muscle cells.",
    answer: true,
    explanation: "True. Glycogen granules are stored in liver and muscle cells (and in fungi).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Humans can digest cellulose because the enzyme amylase hydrolyses β-1,4 glycosidic bonds.",
    answer: false,
    explanation: "False. Amylase hydrolyses α-1,4 bonds in starch. Humans have no enzyme for the β-1,4 bonds of cellulose, which passes through the gut as dietary fibre.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each polysaccharide with its description.",
    pairs: [
      ["Amylose", "Unbranched α-glucose helix"],
      ["Amylopectin", "α-glucose chains branched about every 24–30 units"],
      ["Glycogen", "α-glucose chains branched about every 8–12 units"],
      ["Cellulose", "Straight β-glucose chains bonded into microfibrils"],
    ],
    explanation: "Amylose and amylopectin together make starch; glycogen is the more highly branched animal store; cellulose is structural.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of cellulose.",
    template: "Cellulose is a polymer of {{blank:a}} joined by 1,4 glycosidic bonds, in which every other unit is rotated through {{blank:b}} degrees. Parallel chains are held together by {{blank:c}} bonds to form microfibrils.",
    blanks: [
      { id: "a", accepted: ["β-glucose"], choices: ["β-glucose", "α-glucose", "fructose", "galactose"] },
      { id: "b", accepted: ["180"], choices: ["90", "180", "270", "360"] },
      { id: "c", accepted: ["hydrogen"], choices: ["hydrogen", "glycosidic", "ionic", "disulfide"] },
    ],
    explanation: "β-glucose units must be inverted (180°) to form β-1,4 bonds, giving straight chains held side by side by hydrogen bonds.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of glycosidic bond found at the branch points of glycogen.",
    accepted: ["alpha-1,6", "α-1,6", "alpha 1,6", "1,6", "α(1→6)", "alpha-1,6 glycosidic", "α-1,6 glycosidic bond", "alpha-1,6 glycosidic bond"],
    normalise: ["trim", "lowercase", "remove_whitespace"],
    wrong: ["alpha-1,4", "beta-1,4"],
    explanation: "Branches join by **α-1,6** glycosidic bonds; the chains themselves are α-1,4.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain how the structure of starch makes it suitable as an energy store in plant cells.",
    points: [
      "Insoluble so it does not affect water potential / no osmotic uptake of water (osmotically inactive)",
      "Large / insoluble so it cannot diffuse out of the cell",
      "Compact: amylose coiled into a helix (and amylopectin branched), so much glucose stored in a small space",
      "α-glycosidic bonds easily hydrolysed by enzymes (amylase) to release glucose; branches of amylopectin give many ends for rapid hydrolysis",
    ],
    modelAnswer: "Starch is insoluble, so it does not lower the water potential of the cell and water is not drawn in by osmosis; being large and insoluble it also cannot diffuse out. Amylose coils into a compact helix and amylopectin is branched, so a lot of glucose is packed into a small space. The α-glycosidic bonds are easily hydrolysed by amylase, and the branches of amylopectin give many ends where glucose can be released quickly when needed.",
    explanation: "Each point needs the structural feature linked to the advantage.",
    hints: ["Consider solubility, shape and how glucose is released."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 5,
    stem: "Explain how the molecular structure of cellulose gives plant cell walls their high tensile strength.",
    points: [
      "β-glucose units joined by β-1,4 glycosidic bonds with alternate units rotated 180°",
      "So the chains are straight / unbranched / do not coil",
      "–OH groups project on both sides, so many hydrogen bonds form between parallel chains",
      "Chains are grouped into microfibrils, and microfibrils into fibres",
      "Fibres laid in layers at different angles / so many hydrogen bonds together are very strong and resist stretching (turgor pressure)",
    ],
    modelAnswer: "Cellulose is made of β-glucose joined by β-1,4 glycosidic bonds, each unit rotated 180° relative to its neighbour, so the chains are long and straight. –OH groups stick out on both sides, so many hydrogen bonds form between neighbouring parallel chains. Groups of chains form microfibrils, which are bundled into fibres laid down in layers running in different directions. Although each hydrogen bond is weak, the very large number makes the wall resist stretching when the cell becomes turgid.",
    explanation: "Build up from monomer to bond to chain to hydrogen bonding to microfibrils and fibres.",
    hints: ["Start from the monomer and work up in levels of organisation."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Give **three** structural differences between amylose and glycogen.",
    points: [
      "Amylose unbranched; glycogen highly branched",
      "Amylose has α-1,4 bonds only; glycogen has α-1,4 and α-1,6 bonds",
      "Amylose coils into a helix; glycogen forms a compact granule with short chains (or amylose has fewer ends)",
    ],
    modelAnswer: "Amylose is unbranched whereas glycogen is highly branched. Amylose has only α-1,4 bonds, but glycogen has α-1,4 bonds in its chains and α-1,6 bonds at the branch points. Amylose coils into a long helix, while glycogen forms a dense granule of short chains with many ends.",
    explanation: "Each difference must state both molecules.",
    hints: ["Think: branching, bonds, shape."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A biochemist extracts three polysaccharides, J, K and L, and investigates them.\n\n| Property | J | K | L |\n|---|---|---|---|\n| Monomer released by complete hydrolysis | α-glucose | β-glucose | α-glucose |\n| Colour with iodine | Blue-black | Orange-brown (no change) | Red-brown |\n| Branch points per 100 glucose units | 0 | 0 | 9 |\n| Source | Cassava root | Cotton fibre | Cattle liver |",
    parts: [
      P.match({ label: "(a)", marks: 3, stem: "Identify J, K and L.", pairs: [["J", "Amylose"], ["K", "Cellulose"], ["L", "Glycogen"]], extraRight: ["Sucrose"], explanation: "J: unbranched α-glucose with blue-black iodine = amylose. K: β-glucose from cotton = cellulose. L: branched α-glucose from liver = glycogen." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why J gives a blue-black colour with iodine but L does not.", points: ["J / amylose forms a long helix", "Iodine ions fit inside the long helix (L has short branched chains, so only short helices; little colour)"], modelAnswer: "Amylose coils into long helices that iodine ions fit inside, giving blue-black. Glycogen's chains are short because of frequent branching, so only short helices form and the colour is red-brown." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest why L is suited to the energy needs of a cow's liver.", points: ["Highly branched / 9 branch points per 100 units, so many ends", "Enzymes hydrolyse glucose from ends, so rapid release of glucose", "Glucose released to blood for respiration in the body / compact and insoluble so does not affect water potential"], modelAnswer: "Glycogen is highly branched, so it has many chain ends. Enzymes remove glucose from the ends, so glucose can be released quickly into the blood when the animal needs energy; being compact and insoluble it stores a lot without affecting water potential." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain why K is suited to its role in the cotton plant and why cattle need microorganisms in the rumen to digest it.", points: ["Straight chains hydrogen-bonded into microfibrils / fibres give high tensile strength", "Cell walls resist turgor pressure / prevent bursting / support", "Mammals have no enzyme that hydrolyses β-1,4 glycosidic bonds", "Rumen microorganisms produce cellulase / enzymes that hydrolyse cellulose to glucose"], modelAnswer: "Cellulose chains are straight and held together by many hydrogen bonds in microfibrils and fibres, giving cell walls high tensile strength to resist turgor pressure. Cattle, like other mammals, have no enzyme to hydrolyse β-1,4 bonds; microorganisms in the rumen produce cellulase, which breaks cellulose down." }),
    ],
    explanation: "Monomer, branching and iodine together identify the polysaccharide; structure explains function.",
    hints: ["Which polysaccharide contains β-glucose?"],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A muscle cell of a sprinting cheetah breaks down glycogen rapidly. A glycogen molecule in the cell has 1800 glucose units with, on average, one branch point every 9 units.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the number of branch points in the molecule.", value: 1800 / 9, wrong: ["9"], explanation: "1800 ÷ 9 = 200 branch points." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which bond is found at each branch point?", options: [["α-1,6 glycosidic bond", "Correct: branches join carbon 6 of the chain."], ["α-1,4 glycosidic bond", "α-1,4 bonds link units along each chain."], ["β-1,4 glycosidic bond", "β-1,4 bonds are found in cellulose."], ["Hydrogen bond", "Branches are joined covalently by glycosidic bonds."]], answer: "A", explanation: "Branch points are α-1,6 glycosidic bonds." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how the branching of glycogen suits the energy demands of the cheetah's muscle.", points: ["Many branches give many chain ends", "Enzymes remove glucose from the ends, so many glucose molecules are released quickly for respiration"], modelAnswer: "Frequent branching gives many chain ends, and enzymes release glucose from the ends, so glucose can be supplied very quickly for respiration during a sprint." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why storing glucose as glycogen rather than as free glucose is an advantage to the muscle cell.", points: ["Glycogen is insoluble, so it does not lower the water potential / cause osmotic uptake of water", "Compact, so much glucose stored in a small space / cannot diffuse out of the cell"], modelAnswer: "Glycogen is insoluble, so it has no effect on the water potential of the cell and does not leak out, and its compact granules store a lot of glucose in a small space." }),
    ],
    explanation: "Branch points (α-1,6) give glycogen many ends for rapid hydrolysis; insolubility and compactness suit storage.",
    hints: ["Divide the number of units by the branching interval."],
  });

  b.card("FACT", "Bonds in amylose?", "α-1,4 glycosidic only; unbranched, coils into a helix.");
  b.card("FACT", "Bonds in amylopectin and glycogen?", "α-1,4 in chains and α-1,6 at branch points.");
  b.card("CONCEPT", "Why is glycogen more branched than amylopectin useful?", "More chain ends, so glucose is released faster for the high energy demands of animals.");
  b.card("CONCEPT", "Why is an insoluble store useful?", "It does not lower water potential (no osmotic water uptake) and cannot diffuse out of the cell.");
  b.card("FACT", "Monomer and bond in cellulose?", "β-glucose, β-1,4 glycosidic bonds; alternate units rotated 180°.");
  b.card("CONCEPT", "What gives cellulose its tensile strength?", "Straight chains held by many hydrogen bonds into microfibrils, bundled into fibres in layers.");
  b.card("FACT", "Branch frequency: amylopectin v glycogen?", "Amylopectin about every 24–30 units; glycogen about every 8–12 units.");
  b.card("FACT", "Why can humans not digest cellulose?", "No enzyme to hydrolyse β-1,4 glycosidic bonds.");
  b.card("CONCEPT", "Where are starch and glycogen stored?", "Starch: grains in plant cells (seeds, tubers). Glycogen: granules in liver and muscle cells.");
});
