// W4b: PCR, gel electrophoresis and genetic fingerprinting (both boards; fingerprinting, forensics and paternity are ZIMSEC detail).
import { concept, P, t, chk, table, pcrCopies, sfStr, ZIM } from "../lib.mjs";

const estLen = (d, [d1, s1], [d2, s2]) => 10 ** (Math.log10(s1) + ((d - d1) * (Math.log10(s2) - Math.log10(s1))) / (d2 - d1));

concept("abio.genetech.pcr-electrophoresis-fingerprinting", { file: "genetech/pcr-electrophoresis-fingerprinting", keyPrefix: "genetech.pcr-electrophoresis-fingerprinting" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "At about which temperature are DNA strands separated during PCR?",
    options: [
      ["95 °C", "Correct: denaturation."],
      ["72 °C", "72 °C is the extension temperature."],
      ["60 °C", "This is in the annealing range."],
      ["37 °C", "This is body temperature, too low to separate strands."],
    ],
    answer: "A",
    explanation: "Heating to about **95 °C** breaks the hydrogen bonds between bases.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is Taq polymerase used in PCR rather than human DNA polymerase?",
    options: [
      ["It is not denatured at the high temperature used to separate strands", "Correct: thermostable."],
      ["It joins Okazaki fragments together more quickly than other enzymes", "That is the role of ligase."],
      ["It can make copies without any primers being present", "Taq still needs primers."],
      ["It adds nucleotides to the 5' end of the new strand", "All DNA polymerases add to the 3' end."],
    ],
    answer: "A",
    explanation: "Taq comes from a hot-spring bacterium and survives repeated heating to 95 °C.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In gel electrophoresis, why do DNA fragments move towards the anode?",
    options: [
      ["Their phosphate groups give them a negative charge", "Correct."],
      ["Their bases are positively charged", "The charge comes from phosphate groups, which are negative."],
      ["The anode attracts the agarose gel", "The gel stays still."],
      ["The smaller fragments are pushed by larger ones", "Fragments move independently in the field."],
    ],
    answer: "A",
    explanation: "Negatively charged phosphate groups make DNA migrate towards the positive anode.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which fragments travel furthest through an agarose gel in a given time?",
    options: [
      ["The shortest fragments", "Correct: they pass through the mesh most easily."],
      ["The longest fragments", "Long fragments are held back by the gel."],
      ["The fragments with most adenine", "Base composition hardly affects migration."],
      ["The fragments loaded first", "All lanes start together."],
    ],
    answer: "A",
    explanation: "Charge per unit length is about constant, so separation is by length; shorter fragments move further.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the function of the primers in PCR?",
    options: [
      ["To bind to the template and provide a start for DNA polymerase", "Correct."],
      ["To break the hydrogen bonds between the two DNA strands", "Heat does this."],
      ["To cut the DNA at each end of the target sequence", "Primers do not cut DNA."],
      ["To join the new nucleotides by phosphodiester bonds", "DNA polymerase does this."],
    ],
    answer: "A",
    explanation: "Primers base-pair with the 3' end of the target on each strand; Taq polymerase extends them.",
    hints: ["DNA polymerase cannot start a strand from nothing."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After a PCR, the expected band is very faint. Which change would most likely produce more product?",
    options: [
      ["Increasing the number of cycles", "Correct: each cycle roughly doubles the product."],
      ["Lowering the denaturing temperature to 72 °C", "Strands would not separate fully."],
      ["Leaving out the primers", "No primers, no amplification."],
      ["Using a polymerase that is denatured at 95 °C", "It would stop working after the first cycle."],
    ],
    answer: "A",
    explanation: "More cycles give more doublings, until reagents run out.",
    hints: ["What happens in each cycle?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Why are variable number tandem repeats used for genetic fingerprinting?",
    options: [
      ["Repeat numbers at each locus vary between people", "Correct: lengths vary."],
      ["They are coding regions that are identical in everyone", "Identical DNA could not distinguish people."],
      ["They are found only in the mitochondria of cells", "They are in nuclear DNA."],
      ["They are inherited only from the father", "One allele comes from each parent."],
    ],
    answer: "A",
    explanation: "VNTRs vary in repeat number, so fragment lengths differ between individuals.",
    hints: ["What must vary for a test to tell people apart?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "At one locus, a mother has bands of 160 and 200 bp, and her child has bands of 160 and 250 bp. Which man could be the father?",
    options: [
      ["A man with bands of 230 and 250 bp", "Correct: he has the 250 bp band."],
      ["A man with bands of 160 and 200 bp", "Neither band is the child's paternal 250 bp band."],
      ["A man with bands of 160 and 230 bp", "The paternal band must be 250 bp."],
      ["A man with bands of 200 and 240 bp", "He lacks 250 bp."],
    ],
    answer: "A",
    explanation: "The child's 160 bp band came from the mother, so 250 bp must come from the father.",
    hints: ["Which of the child's bands matches the mother?"],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Taq polymerase was obtained from a bacterium that lives in hot springs.",
    answer: true,
    explanation: "True: *Thermus aquaticus*.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In ideal conditions, the number of copies of the target DNA doubles in each PCR cycle.",
    answer: true,
    explanation: "True: $N = N_0 \\times 2^n$.",
  });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each PCR step with its approximate temperature and event.",
    pairs: [
      ["Denaturation", "About 95 °C: hydrogen bonds break"],
      ["Annealing", "About 55-65 °C: primers bind"],
      ["Extension", "About 72 °C: Taq adds nucleotides"],
    ],
    extraRight: ["About 37 °C: restriction enzymes cut"],
    explanation: "Denature, anneal, extend.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "DNA samples are placed in wells at the {{blank:a}} end of the gel. Fragments of known length, called a {{blank:b}}, are run alongside so that the sizes of unknown fragments can be estimated. The gel is made of {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["cathode"], choices: ["cathode", "anode"] },
      { id: "b", accepted: ["ladder"], choices: ["ladder", "primer", "probe"] },
      { id: "c", accepted: ["agarose"], choices: ["agarose", "cellulose", "starch"] },
    ],
    explanation: "Wells at the negative (cathode) end; a DNA ladder of known sizes; agarose gel.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the enzyme that builds new DNA strands during PCR.",
    accepted: ["Taq polymerase", "Taq DNA polymerase", "Taq", "thermostable DNA polymerase"],
    wrong: ["ligase"],
    explanation: "**Taq polymerase**.",
  });

  // Numerical: PCR copies (new data)
  const n0 = 20, cyc = 15;
  const N = pcrCopies(n0, cyc);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A PCR starts with ${n0} copies of a DNA sequence. How many copies are present after ${cyc} cycles, assuming perfect doubling?`,
    value: N, wrong: [n0 * 2 * cyc, 2 ** cyc],
    explanation: `${n0} × 2^${cyc} = ${N}. Multiplying by 2 × ${cyc} or forgetting the starting ${n0} copies are common slips.`,
  });
  const target = 5e6, start = 40;
  const nCyc = Math.ceil(Math.log2(target / start));
  chk(pcrCopies(start, nCyc) >= target && pcrCopies(start, nCyc - 1) < target ? 1 : 0, 1);
  calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A forensic sample contains ${start} copies of a repeat region. At least $5 \times 10^{6}$ copies are needed for analysis. What is the minimum number of PCR cycles needed, assuming perfect doubling?`,
    value: nCyc, wrong: [nCyc - 1],
    explanation: t`1. Need $${start} \times 2^n \geq 5 \times 10^{6}$, so $2^n \geq ${target / start}$.
2. $2^{${nCyc - 1}} = ${2 ** (nCyc - 1)}$, too few; $2^{${nCyc}} = ${2 ** nCyc}$, enough.
3. Minimum: **${nCyc}** cycles (giving ${pcrCopies(start, nCyc)} copies). ${nCyc - 1} cycles gives only ${pcrCopies(start, nCyc - 1)} copies.`,
    hints: ["Divide the target by the starting number.", "Find the smallest power of 2 above that."],
  });
  const L = chk(estLen(27, [15, 2000], [39, 500]), 1000, 1e-6);
  calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "On a gel, ladder bands of 2000 bp and 500 bp are 15 mm and 39 mm from the wells. Distance moved is proportional to the logarithm of fragment length. An unknown band is at 27 mm. Estimate its length in base pairs, to three significant figures.",
    value: L, sf: 3, wrong: [1250],
    explanation: t`1. 27 mm is halfway between 15 mm and 39 mm.
2. On a log scale, halfway between 2000 and 500 is $\sqrt{2000 \times 500} = ${sfStr(L, 3)}$ bp.
3. A simple average of 2000 and 500 (1250 bp) ignores the logarithmic relationship.`,
    hints: ["Halfway on a log scale is the geometric mean."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe one cycle of the polymerase chain reaction.",
    points: [
      "Heat to about 95 °C: hydrogen bonds break and the strands separate (denaturation)",
      "Cool to about 55-65 °C: primers bind to complementary sequences at the 3' ends of the target (annealing)",
      "Heat to about 72 °C: Taq polymerase adds free nucleotides (extension)",
      "Complementary base pairing with each template strand; nucleotides added to the 3' end of the primer",
      "Number of copies of the target doubles",
    ],
    modelAnswer: "The mixture is heated to about 95 °C, breaking the hydrogen bonds so the DNA separates into single strands. It is cooled to about 55-65 °C so that primers bind to complementary sequences at the 3' ends of the target on each strand. It is then held at about 72 °C while Taq polymerase adds free nucleotides to the 3' end of each primer by complementary base pairing, building new strands. The number of target copies doubles.",
    explanation: "Three steps with temperatures, plus pairing and doubling.",
    hints: ["Denature, anneal, extend."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Outline how a genetic fingerprint is produced from a blood sample.",
    points: [
      "Extract DNA from white blood cells (red cells have no nucleus)",
      "Amplify VNTR / STR regions by PCR (or cut with restriction enzymes outside the repeats)",
      "Separate fragments by gel electrophoresis according to length",
      "Make bands visible with fluorescent labels or probes and compare patterns",
    ],
    modelAnswer: "DNA is extracted from the white blood cells, since red cells lack nuclei. Regions of variable tandem repeats are amplified by PCR using primers either side of them. The fragments are separated by length using gel electrophoresis, and the bands are made visible with fluorescent labels or probes, giving a pattern to compare with other samples.",
    explanation: "Extract, amplify, separate, visualise and compare.",
    hints: ["Which blood cells contain DNA?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4, applies: ZIM,
    stem: "DNA from a crime scene matches a suspect's DNA at all loci tested. Discuss whether this proves that the suspect committed the crime.",
    points: [
      "A match shows the DNA very probably came from the suspect (patterns are almost unique, except identical twins)",
      "It shows only that the suspect was at, or their DNA reached, the scene, not that they committed the crime",
      "DNA could have been transferred innocently / contamination or handling errors in the laboratory",
      "Strength depends on the number of loci tested and how common the alleles are; other evidence is needed",
    ],
    modelAnswer: "A match at many loci shows the DNA almost certainly came from the suspect, because patterns are nearly unique, except in identical twins. But it shows only that the suspect's DNA was at the scene, which could have an innocent explanation or be due to transfer or contamination. The weight of the evidence depends on how many loci were tested and how common the alleles are, so it must be considered with other evidence; it does not by itself prove guilt.",
    explanation: "Match ≠ guilt.",
    hints: ["What does a DNA match actually show?"],
  });

  // Practice structured: gel (both boards)
  const ladder = [[12, 3000], [21, 1500], [30, 750], [39, 375]];
  const u = 25.5;
  const uLen = estLen(u, [21, 1500], [30, 750]);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `A plasmid was cut with a restriction enzyme and the fragments separated by gel electrophoresis alongside a DNA ladder.\n\n${table(["Ladder band / bp", ...ladder.map((x) => String(x[1]))], [["Distance from well / mm", ...ladder.map((x) => String(x[0]))]])}\n\nThe plasmid gave two bands, at ${u} mm and at 39 mm.`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why the fragments separate according to their lengths.",
        points: ["DNA is negatively charged (phosphate groups) and moves towards the anode", "Gel mesh slows long fragments more, so shorter fragments move further in the same time"],
        modelAnswer: "All the fragments are negatively charged because of their phosphate groups, so they move towards the anode. The agarose mesh slows longer fragments more than shorter ones, so shorter fragments travel further in the same time.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Distance is proportional to the logarithm of length; each 9 mm corresponds to a halving of length. Estimate the length of the band at 25.5 mm, to three significant figures.",
        value: uLen, sf: 3, unit: undefined, wrong: [1125],
        explanation: `25.5 mm is halfway between 21 mm (1500 bp) and 30 mm (750 bp): $1500 \\div \\sqrt{2} = ${sfStr(uLen, 3)}$ bp.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Using your answer to (b) and the band at 39 mm, calculate the total length of the plasmid in base pairs, to three significant figures.",
        value: uLen + 375, sf: 3, wrong: [uLen],
        explanation: `${sfStr(uLen, 3)} + 375 = ${sfStr(uLen + 375, 3)} bp (a circular plasmid cut twice gives two fragments that add up to its length).`,
      }),
      P.mcq({
        label: "(d)", stem: "How many times did the enzyme cut this circular plasmid?",
        options: [
          ["Twice", "Correct: two fragments from a circle need two cuts."],
          ["Once", "One cut opens a circle into a single linear fragment."],
          ["Three times", "Three cuts in a circle give three fragments."],
          ["Four times", "This would give four fragments."],
        ],
        answer: "A",
        explanation: "Circular DNA: number of fragments = number of cuts.",
      }),
    ],
    explanation: "Separation by length; log-scale interpolation from the ladder; circular plasmid fragments.",
    hints: ["Halfway in distance is halfway on a log scale of length."],
    calculator: true,
  });
  b.struct({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: `DNA from blood at a crime scene in Bulawayo and from three suspects was analysed at three STR loci. Band lengths are in base pairs.\n\n${table(["Sample", "Locus A", "Locus B", "Locus C"], [["Crime scene", "112, 128", "205, 229", "164, 176"], ["Suspect 1", "112, 128", "205, 215", "164, 176"], ["Suspect 2", "112, 128", "205, 229", "164, 176"], ["Suspect 3", "120, 128", "205, 229", "152, 164"]])}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Which suspect's DNA matches the crime-scene sample at all three loci?",
        options: [
          ["Suspect 2", "Correct."],
          ["Suspect 1", "Locus B differs (215 instead of 229)."],
          ["Suspect 3", "Loci A and C differ."],
          ["None of them", "Suspect 2 matches every band."],
        ],
        answer: "A",
        explanation: "Suspect 2 has identical bands at A, B and C.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why each person has two bands at most loci.",
        points: ["Each person has two copies of each chromosome / two alleles at each locus, one from each parent", "The alleles may have different numbers of repeats, so different lengths (one band if homozygous)"],
        modelAnswer: "Each person has two alleles at each locus, one inherited from each parent. These usually have different numbers of repeats, so they give two bands of different length; a person with two alleles of the same length shows one band.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why forensic scientists test many more than three loci before presenting evidence.",
        points: ["With few loci, unrelated people (or relatives) could share the same pattern by chance", "More loci make the chance of a random match extremely small, so the evidence is stronger"],
        modelAnswer: "With only three loci, some unrelated people, and especially relatives, could share the same pattern by chance. Testing many loci makes the probability of a chance match extremely small, so the evidence is much stronger.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "State why PCR is usually needed before analysing crime-scene samples.",
        points: ["Only a tiny amount of DNA is present; PCR amplifies it to enough for analysis"],
        modelAnswer: "Crime-scene samples contain very little DNA, so PCR is used to make enough copies of the repeat regions for analysis.",
      }),
    ],
    explanation: "Compare all loci; two alleles per locus; many loci for reliability.",
    hints: ["Check every band at every locus."],
  });

  b.card("FACT", "The three steps of PCR", "Denaturation about 95 °C; annealing of primers about 55-65 °C; extension by Taq polymerase about 72 °C.");
  b.card("CONCEPT", "Why Taq polymerase?", "From *Thermus aquaticus* (hot springs): thermostable, not denatured at 95 °C, so it works through every cycle.");
  b.card("FORMULA", "Copies after n PCR cycles", "$N = N_0 \\times 2^n$ (ideal doubling).");
  b.card("DEFINITION", "Define **primer** (PCR).", "Short single-stranded DNA complementary to one end of the target; starting point for DNA polymerase.");
  b.card("CONCEPT", "Gel electrophoresis principle", "DNA is negative (phosphates) → moves to the anode; shorter fragments move further through agarose.");
  b.card("FACT", "What is a DNA ladder?", "A set of fragments of known lengths run beside samples to estimate their sizes.");
  b.card("DEFINITION", "Define **VNTR**.", "Variable number tandem repeat: non-coding repeated sequence whose repeat number varies between people.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Paternity test logic", "Each band in a child comes from the mother or father; a man lacking the child's paternal bands is excluded.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Steps in genetic fingerprinting", "Extract DNA → PCR of repeat regions → electrophoresis → visualise bands → compare.", undefined, { applies: ZIM });
});
