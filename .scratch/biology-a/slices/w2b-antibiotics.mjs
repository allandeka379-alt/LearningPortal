// W2b: antibiotics and antibiotic resistance (Cambridge only).
import { concept, P, t, chk, table, dpStr, sfStr, rnd, CAM } from "../lib.mjs";

concept("abio.disease.antibiotics", { file: "disease/antibiotics", keyPrefix: "disease.antibiotics", applies: CAM }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of a bacterial cell is affected by penicillin?",
    options: [
      ["The peptidoglycan cell wall", "Correct: penicillin stops cross-links forming in peptidoglycan."],
      ["The 70S ribosomes that carry out protein synthesis", "Antibiotics such as tetracycline act on ribosomes; penicillin does not."],
      ["The plasmids", "Penicillin does not act on plasmids."],
      ["The cell surface membrane", "Penicillin acts on wall synthesis, not directly on the membrane."],
    ],
    answer: "A",
    explanation: "Penicillin inhibits the enzymes that build cross-links in the **peptidoglycan** wall.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do antibiotics have no effect on viruses?",
    options: [
      ["Viruses have no cell wall, ribosomes or metabolism of their own for antibiotics to act on", "Correct: viruses use the host cell's machinery."],
      ["Viruses are too small for antibiotic molecules to reach or to enter through their coats", "Size is not the reason; there is simply no target."],
      ["Viruses quickly become resistant to every antibiotic", "Resistance is a bacterial process; antibiotics never affected viruses."],
      ["Viruses are protected by the antibodies that surround them", "Antibodies bind viruses to help destroy them, not to protect them."],
    ],
    answer: "A",
    explanation: "Antibiotics target bacterial structures and enzymes. Viruses lack them and replicate using the host's ribosomes and enzymes.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Penicillin kills growing bacteria but has little effect on bacteria that are not growing. Why?",
    options: [
      ["It stops new cross-links forming, which matters only while new wall is added", "Correct: non-growing cells are not building new wall."],
      ["Non-growing bacteria have no peptidoglycan in their cell walls", "Their walls contain peptidoglycan; they are just not being remodelled."],
      ["Penicillin can only enter bacteria while they are dividing by mitosis in the nucleus", "Bacteria divide by binary fission, and entry is not the reason."],
      ["Non-growing bacteria produce antibodies against penicillin", "Bacteria do not produce antibodies."],
    ],
    answer: "A",
    explanation: "A growing cell breaks and remakes cross-links. Penicillin blocks the **making** step, so the wall weakens only during growth.",
    hints: ["When are new cross-links being formed?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does a bacterium with a weakened cell wall burst?",
    options: [
      ["Water enters by osmosis because the cytoplasm has a lower water potential than its surroundings", "Correct: the wall normally resists the pressure."],
      ["Water leaves by osmosis because the cytoplasm has a higher water potential than its surroundings", "Water enters the cell, not leaves."],
      ["Penicillin dissolves the cell surface membrane, releasing the contents", "Penicillin does not dissolve membranes."],
      ["Enzymes from the patient's stomach digest the bacterium", "Lysis is caused by osmosis, not digestion."],
    ],
    answer: "A",
    explanation: "Without a strong wall, water entering by **osmosis** makes the cell swell until it bursts (**osmotic lysis**).",
    hints: ["Compare the water potential inside and outside the bacterium."],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What does the enzyme penicillinase (β-lactamase) do?",
    options: [
      ["It breaks down penicillin, making the bacterium resistant", "Correct: it inactivates penicillin."],
      ["It forms cross-links in the peptidoglycan wall", "This is the role of transpeptidases, which penicillin inhibits."],
      ["It helps penicillin enter the bacterial cell", "It destroys penicillin; it does not help it."],
      ["It is the enzyme in human cells that penicillin targets", "Human cells have no cell walls and no such target."],
    ],
    answer: "A",
    explanation: "**Penicillinase** breaks down penicillin, so bacteria that make it are resistant. The gene is often on a plasmid.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A patient stopped taking an antibiotic after two days because she felt better. A week later the infection returned and did not respond to the same antibiotic. Which is the best explanation?",
    options: [
      ["The most resistant bacteria survived the short course and multiplied", "Correct: an incomplete course selects the most resistant survivors."],
      ["The antibiotic caused new mutations in the bacteria that made all of them resistant", "Mutations are random; the antibiotic selects, it does not cause them."],
      ["The patient became immune to the antibiotic", "People do not become immune to antibiotics; bacteria become resistant."],
      ["The bacteria turned into a virus, which antibiotics cannot affect", "Bacteria cannot turn into viruses."],
    ],
    answer: "A",
    explanation: "The first doses killed the most susceptible bacteria. The survivors were those with some resistance; with no further antibiotic they multiplied, so the new population was mostly resistant.",
    hints: ["Which bacteria were still alive after two days?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why can antibiotic resistance spread between different species of bacteria?",
    options: [
      ["Resistance genes on plasmids can be transferred between bacteria by conjugation", "Correct: horizontal gene transfer."],
      ["Resistant bacteria release antibodies that protect other species", "Bacteria do not make antibodies."],
      ["All bacterial species in a mixed population share a single circular chromosome between them", "Each bacterium has its own chromosome."],
      ["The antibiotic carries resistance genes from one species to another", "Antibiotics are not carriers of genes."],
    ],
    answer: "A",
    explanation: "Many resistance genes are on **plasmids**, which can be passed between bacteria, even of different species.",
    hints: ["Which small DNA molecules can move between bacteria?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which practice is most likely to increase antibiotic resistance?",
    options: [
      ["Prescribing antibiotics for colds and influenza", "Correct: unnecessary use selects resistant bacteria and does not treat the virus."],
      ["Testing which antibiotic works before prescribing", "Sensitivity testing reduces resistance."],
      ["Washing hands between patients in hospital", "Infection control reduces spread of resistant bacteria."],
      ["Vaccinating children against bacterial diseases", "Vaccination reduces the need for antibiotics."],
    ],
    answer: "A",
    explanation: "Antibiotics do nothing against cold and flu viruses, but they still exert selection on the bacteria in the body.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "MRSA is a strain of *Staphylococcus aureus* that is resistant to penicillin-type antibiotics.",
    answer: true,
    explanation: "True. MRSA is meticillin-resistant *S. aureus*; it causes infections that are hard to treat, especially in hospitals.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Tetracycline is selective for bacteria because it acts on bacterial ribosomes, which are smaller than the ribosomes in human cytoplasm.",
    answer: true,
    explanation: "True. Differences in ribosome structure let some antibiotics block bacterial protein synthesis without blocking ours.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each measure with how it reduces the impact of antibiotic resistance.",
    pairs: [
      ["Not prescribing antibiotics for viral infections", "Avoids selection pressure where there is no benefit"],
      ["Isolating hospital patients with MRSA", "Prevents resistant bacteria spreading to other patients"],
      ["Giving TB patients several drugs together", "A bacterium is unlikely to resist all of them at once"],
      ["Stopping routine antibiotic use in healthy livestock", "Reduces selection of resistant bacteria on farms"],
    ],
    explanation: "Each measure reduces selection for, or spread of, resistant bacteria.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Penicillin inhibits the enzymes that form {{blank:a}} in peptidoglycan. The wall weakens, water enters by {{blank:b}} and the bacterium bursts. Bacteria that produce {{blank:c}} are resistant to penicillin.",
    blanks: [
      { id: "a", accepted: ["cross-links"], choices: ["cross-links", "hydrogen bonds", "glycosidic bonds in cellulose"] },
      { id: "b", accepted: ["osmosis"], choices: ["osmosis", "active transport", "exocytosis"] },
      { id: "c", accepted: ["penicillinase"], choices: ["penicillinase", "lysozyme", "amylase"] },
    ],
    explanation: "Cross-links, osmosis, penicillinase (β-lactamase).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the polymer that forms the cell wall of bacteria and is the target of penicillin.",
    accepted: ["peptidoglycan", "murein"],
    wrong: ["cellulose", "chitin"],
    explanation: "Bacterial walls are made of **peptidoglycan** (murein); plant walls are cellulose and fungal walls chitin.",
  });

  // Numerical: area of clear zone (different from lesson)
  const dia = 22;
  const area = Math.PI * (dia / 2) ** 2;
  chk(rnd(area, 0), 380);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The clear zone around an antibiotic disc on a lawn of bacteria has a diameter of 22 mm. Calculate the area of the clear zone in mm², to three significant figures. (Area of a circle $= \pi r^2$.)`,
    value: area, sf: 3, unit: "mm²",
    wrong: [Math.round(Math.PI * dia * dia), Number((Math.PI * (dia / 2)).toFixed(1))],
    explanation: t`Radius $= 11$ mm. Area $= \pi \times 11^2 = ${sfStr(area, 3)}\ \text{mm}^2$. Using the diameter instead of the radius gives ${Math.round(Math.PI * dia * dia)} mm², four times too large.`,
    hints: ["Halve the diameter first."],
  });

  // Calculation: bacterial growth (resistant population)
  const gen = 25; // minutes per division
  const time = 5 * 60; // 5 hours
  const n = time / gen;
  const cells = 2 ** n;
  chk(cells, 4096);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A single penicillin-resistant bacterium survives a course of penicillin. In good conditions it divides by binary fission every 25 minutes. Assuming every cell divides and none die, how many resistant bacteria will there be after 5 hours?",
    value: cells,
    wrong: [2 * n, n],
    explanation: t`1. 5 hours $= 300$ minutes.
2. Number of divisions $= 300 \div 25 = ${n}$.
3. Number of cells $= 2^{${n}} = ${cells}$.
4. Multiplying $2 \times ${n} = ${2 * n}$ treats growth as linear rather than doubling. Rapid reproduction is why a resistant strain can replace a susceptible one so quickly.`,
    hints: ["Each division doubles the number of cells."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how penicillin causes the death of a growing bacterium.",
    points: [
      "Penicillin inhibits enzymes (transpeptidases) that form cross-links in peptidoglycan",
      "During growth, other enzymes keep breaking cross-links / new wall is added without cross-links, so the wall weakens",
      "Water enters the bacterium by osmosis (cytoplasm has a lower water potential)",
      "The weakened wall cannot resist the pressure, so the cell swells and bursts (osmotic lysis)",
    ],
    modelAnswer: "Penicillin inhibits the transpeptidase enzymes that form peptide cross-links between peptidoglycan chains. As the bacterium grows, other enzymes still break cross-links to insert new material, so the wall becomes weaker. Water enters the cell by osmosis because the cytoplasm has a lower water potential than the surroundings, and the weakened wall cannot withstand the pressure, so the cell bursts.",
    explanation: "Enzyme inhibited → no cross-links → weak wall → osmosis → lysis.",
    hints: ["Start with the enzyme penicillin inhibits."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Explain how the frequency of penicillin-resistant bacteria increases in a population exposed to penicillin.",
    points: [
      "A random mutation gives some bacteria a resistance allele (e.g. a gene for penicillinase), before exposure",
      "Penicillin kills susceptible bacteria; resistant ones survive (selection pressure)",
      "Survivors reproduce (binary fission), passing the allele to offspring",
      "So the allele frequency increases over generations; plasmids can also transfer it to other bacteria",
    ],
    modelAnswer: "By chance, a mutation gives a few bacteria an allele for resistance, such as a gene for penicillinase. When penicillin is used, susceptible bacteria die but resistant ones survive. The survivors divide by binary fission and pass the allele to their descendants, so over many generations the proportion of resistant bacteria rises. The gene may also be on a plasmid that is passed to other bacteria.",
    explanation: "Variation, selection, reproduction, allele frequency.",
    hints: ["Use the steps of natural selection."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss the consequences of antibiotic resistance for health care.",
    points: [
      "Infections become harder or impossible to treat; more illness and deaths",
      "Need for more expensive / more toxic / longer treatment (e.g. MDR-TB)",
      "Hospital infections such as MRSA spread to vulnerable patients; isolation and screening needed",
      "Operations / chemotherapy / caesarean sections that rely on antibiotics to prevent infection become riskier",
    ],
    modelAnswer: "Resistant infections may not respond to first-line drugs, so patients are ill for longer and more die. Treatment needs second-line drugs that are more expensive, more toxic and, for MDR-TB, taken for longer. In hospitals MRSA spreads to patients weakened by illness or surgery, so isolation and screening are needed. Routine procedures that depend on antibiotics, such as caesarean sections and cancer chemotherapy, become more dangerous.",
    explanation: "Consider patients, costs, hospitals and other medical procedures.",
    hints: ["Think beyond the single infected person."],
  });

  // Practice structured: disc diffusion
  const ab = [["P", 8], ["Q", 26], ["R", 15], ["S", 6]];
  const areas = ab.map(([, d]) => Math.PI * (d / 2) ** 2);
  chk(rnd(areas[1], 0), 531);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A sample of bacteria from a patient's infected wound was spread evenly on agar. Four paper discs, each 6 mm in diameter and soaked in the same concentration of a different antibiotic (P, Q, R, S), were placed on the plate. After incubation at 25 °C the diameters of the clear zones were measured.\n\n${table(["Antibiotic", "Diameter of clear zone / mm"], ab.map(([a, d]) => [a, String(d)]))}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: t`Calculate the area of the clear zone for antibiotic Q, in mm², to three significant figures. (Area $= \pi r^2$.)`,
        value: areas[1], sf: 3, unit: "mm²", wrong: [Math.round(Math.PI * 26 * 26)],
        explanation: t`$r = 13$ mm; area $= \pi \times 13^2 = ${sfStr(areas[1], 3)}\ \text{mm}^2$.`,
      }),
      P.manual({
        label: "(b)", marks: 1, stem: "Which antibiotic would you recommend for this patient? Explain your choice.",
        points: ["Q, because it gave the largest clear zone, so the bacteria are most susceptible to it"],
        modelAnswer: "Q, because it produced the largest clear zone (26 mm), showing the bacteria are most susceptible to it.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the result for antibiotic S.",
        points: ["No clear zone beyond the 6 mm disc, so no bacteria killed / growth not inhibited", "The bacteria are resistant to S, e.g. produce an enzyme that inactivates it / altered target"],
        modelAnswer: "The clear zone equals the disc diameter, so S did not inhibit growth at all: the bacteria are resistant, perhaps because they produce an enzyme that breaks it down.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two precautions that make the comparison of the antibiotics valid.",
        points: ["Same concentration / volume of antibiotic on each disc, same disc size", "Same bacteria spread evenly, same agar depth, same incubation time and temperature"],
        modelAnswer: "Each disc held the same volume and concentration of antibiotic and was the same size, and the same plate, agar depth and incubation conditions were used for all four.",
      }),
      P.tf({
        label: "(e)", stem: "True or false: the plates were incubated at 25 °C rather than 37 °C to reduce the risk of growing human pathogens.",
        answer: true,
        explanation: "True. In school and teaching labs, incubating below body temperature reduces the growth of bacteria adapted to the human body.",
      }),
    ],
    explanation: "The largest clear zone shows the most effective antibiotic; no clear zone shows resistance.",
    hints: ["Compare each zone with the 6 mm disc."],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Tendai has a sore throat, runny nose and cough. He asks a pharmacist for an antibiotic left over from his sister's treatment. The pharmacist explains that his symptoms are most likely caused by a cold virus.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why an antibiotic would not help Tendai.",
        points: ["Colds are caused by viruses", "Viruses have no cell wall / ribosomes / metabolism for antibiotics to act on"],
        modelAnswer: "His cold is caused by a virus, which has no cell wall, no ribosomes and no metabolism of its own, so there is nothing for an antibiotic to act on.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why taking leftover antibiotics is harmful to the wider community.",
        points: ["Exposes the bacteria in his body to the antibiotic, selecting resistant ones", "Resistant bacteria can multiply and spread to other people / an incomplete dose is too small to kill all bacteria"],
        modelAnswer: "The antibiotic acts on the bacteria naturally living in his body, so resistant bacteria survive and multiply and can spread to others. A leftover amount is also an incomplete course.",
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Name the type of infection for which a doctor might later prescribe an antibiotic to someone with a viral illness.",
        accepted: ["secondary bacterial infection", "secondary infection", "a secondary bacterial infection", "bacterial infection"],
        wrong: ["viral infection"],
        explanation: "A **secondary bacterial infection**, such as bacterial pneumonia, can follow a viral illness.",
      }),
      P.tf({
        label: "(d)", stem: "True or false: if Tendai took the antibiotic, he would become resistant to it.",
        answer: false,
        explanation: "False. People do not become resistant; bacteria do.",
      }),
    ],
    explanation: "Antibiotics do not act on viruses, and misuse selects resistant bacteria.",
    hints: ["What causes a cold?"],
  });

  b.card("DEFINITION", "What is an **antibiotic**?", "A substance that kills or inhibits bacteria without harming human cells.");
  b.card("CONCEPT", "How does penicillin kill bacteria?", "Inhibits transpeptidases that cross-link peptidoglycan; growing wall weakens; water enters by osmosis; cell bursts.");
  b.card("CONCEPT", "Why do antibiotics not affect viruses?", "Viruses have no cell wall, ribosomes or metabolism of their own.");
  b.card("FACT", "Why is penicillin selective?", "It targets bacterial cell walls; human cells have no wall.");
  b.card("DEFINITION", "What is **penicillinase** (β-lactamase)?", "A bacterial enzyme that breaks down penicillin, giving resistance.");
  b.card("CONCEPT", "How does resistance spread?", "Random mutation, selection by antibiotic, reproduction of survivors; plasmid transfer by conjugation.");
  b.card("FACT", "Two examples of resistant bacteria", "MRSA (meticillin-resistant *Staphylococcus aureus*) and MDR-TB.");
  b.card("FACT", "Ways to reduce antibiotic resistance", "Prescribe only for bacterial infections, complete courses, infection control, limit farm use, develop new drugs.");
  b.card("DEFINITION", "Bactericidal versus bacteriostatic", "Bactericidal kills bacteria (penicillin); bacteriostatic stops their growth (tetracycline).");
});
