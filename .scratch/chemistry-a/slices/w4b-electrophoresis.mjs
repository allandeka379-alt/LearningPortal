// W4b: achem.analysis.electrophoresis (ZIMSEC only, Form 6, 6.4.2.4)
import { concept, P, t, ce, ZIM } from "../lib.mjs";

concept("achem.analysis.electrophoresis", { file: "analysis/electrophoresis", keyPrefix: "analysis.electrophoresis", applies: ZIM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In electrophoresis, towards which electrode do negatively charged particles move?",
    options: [
      ["the anode, the positive electrode", "Correct: opposite charges attract."],
      ["the cathode, the negative electrode", "Positive ions move to the cathode."],
      ["neither electrode, because the buffer neutralises them", "The buffer fixes pH; charged particles still move."],
      ["whichever electrode is nearer to the start", "Direction depends on charge, not distance."],
    ],
    answer: "A",
    explanation: "Anions (and DNA fragments) move to the positive anode; cations move to the negative cathode.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Glycine is placed on a gel buffered at pH 1. In which form is it mainly present, and how does it move?",
    options: [
      [t`$\ce{H3N+CH2COOH}$, towards the cathode`, "Correct: in strong acid the amine group is protonated and the acid group is not ionised."],
      [t`$\ce{H2NCH2COO-}$, towards the anode`, "This anion forms at high pH, not at pH 1."],
      [t`the zwitterion, which does not move`, "The zwitterion dominates at the isoelectric point, about pH 6."],
      [t`$\ce{H3N+CH2COO-}$, towards the cathode`, "The zwitterion has no overall charge, so it would not move."],
    ],
    answer: "A",
    explanation: "Low pH: ⁺H₃NCH₂COOH, overall charge +1, moves to the cathode.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In gel electrophoresis of DNA fragments, which fragments travel furthest from the well?",
    options: [
      ["the shortest fragments", "Correct: small fragments pass through the gel most easily."],
      ["the longest fragments", "Long fragments are held back by the gel and move least."],
      ["the fragments with the most guanine", "Base composition does not decide distance at this level; length does."],
      ["all fragments travel the same distance", "DNA fragments separate by length."],
    ],
    answer: "A",
    explanation: "All DNA fragments carry a negative charge per phosphate; in a gel, shorter ones move further towards the anode.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which reagent is used to locate amino acids after electrophoresis?",
    options: [
      ["ninhydrin", "Correct: it gives purple spots with amino acids on warming."],
      ["a restriction enzyme", "Restriction enzymes cut DNA; they do not reveal spots."],
      ["iodine solution", "Iodine solution tests for starch."],
      ["silver nitrate solution", "Silver nitrate tests for halide ions."],
    ],
    answer: "A",
    explanation: "Ninhydrin is the locating agent for amino acids.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the rate of movement of a particle in gel electrophoresis are correct?\n\n1. A larger charge on the particle increases the rate.\n2. A larger particle moves more slowly through the gel.\n3. Increasing the voltage increases the rate.",
    options: [
      ["1, 2 and 3", "Correct: all three affect the speed."],
      ["1 and 2 only", "Statement 3 is also true: a larger voltage gives a larger force."],
      ["2 and 3 only", "Statement 1 is also true."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Think about force and resistance to movement."],
    explanation: "Charge and voltage increase the driving force; size increases the resistance of the gel.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A mixture of alanine (isoelectric point about 6.0), glutamic acid (about 3.2) and arginine (about 10.8) is placed in the middle of a gel buffered at pH 8.0. Which statements are correct?\n\n1. Alanine moves towards the anode.\n2. Glutamic acid moves towards the cathode.\n3. Arginine moves towards the cathode.",
    options: [
      ["1 and 3 only", "Correct: above their isoelectric points alanine and glutamic acid are negative; below its isoelectric point arginine is positive."],
      ["1, 2 and 3", "Statement 2 is false: at pH 8 glutamic acid is negative and moves to the anode."],
      ["2 and 3 only", "Statement 2 is false and statement 1 is true."],
      ["3 only", "Statement 1 is also true: at pH 8, above its isoelectric point, alanine is negative."],
    ],
    answer: "A",
    hints: ["Below the isoelectric point an amino acid is positive."],
    explanation: "pH 8: alanine and glutamic acid are anions (to the anode, glutamic acid faster with charge −2); arginine is a cation (to the cathode).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the role of the restriction enzymes in genetic fingerprinting?",
    options: [
      ["They cut DNA at specific base sequences.", "Correct: fragment lengths differ between individuals."],
      ["They make the DNA fragments visible on the gel.", "Labelled probes and stains do that."],
      ["They copy small amounts of DNA many times.", "That is the polymerase chain reaction."],
      ["They give the DNA fragments a positive charge.", "DNA is negatively charged; enzymes do not change that."],
    ],
    answer: "A",
    hints: ["What must happen before DNA can be separated by size?"],
    explanation: "Restriction enzymes cut at specific sequences, producing fragments whose lengths vary between people.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a paternity test, which observation proves that a man is NOT the biological father of a child?",
    options: [
      ["The child has a band matching neither the mother nor the man.", "Correct: every band must come from one parent."],
      ["The man shares only some of his bands with the child, not all of them.", "Each parent passes on only half their DNA, so some bands are expected not to match."],
      ["The child and the mother share several bands.", "This is expected and says nothing about the father."],
      ["The man's profile has more bands than the child's.", "The number of bands is not the test; the origin of each child band is."],
    ],
    answer: "A",
    hints: ["Where must each of the child's bands come from?"],
    explanation: "A child band absent from both mother and man must come from another father.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Lysine, H₂N(CH₂)₄CH(NH₂)COOH, is placed in a buffer at pH 1. What is its overall charge (enter a whole number, e.g. +2 as 2)?",
    value: 2,
    wrong: [1],
    explanation: "At pH 1 both –NH₂ groups are protonated (–NH₃⁺) and –COOH is un-ionised: overall charge +2.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Aspartic acid, HOOCCH₂CH(NH₂)COOH, is placed in a buffer at pH 12. What is its overall charge (enter a whole number, e.g. −2 as -2)?",
    value: -2,
    wrong: [-1],
    hints: ["Count the acidic groups."],
    explanation: "At pH 12 both –COOH groups are ionised (–COO⁻) and –NH₂ is not protonated: overall charge −2.",
  });
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "A linear piece of DNA is cut by a restriction enzyme at 4 sites. How many fragments are produced?",
    value: 5,
    wrong: [4],
    hints: ["Each cut adds one more piece."],
    explanation: "Each cut in a linear molecule increases the number of pieces by one: 4 cuts → 5 fragments.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "At its isoelectric point an amino acid exists mainly as a zwitterion and does not move in electrophoresis.",
    answer: true,
    explanation: "True. The zwitterion has no overall charge, so there is no net force on it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Proteins are hydrolysed into amino acids by heating them with water alone for a few minutes.",
    answer: false,
    explanation: "False. Peptide links are hydrolysed by heating under reflux with concentrated (about 6 mol dm⁻³) hydrochloric acid for many hours (or by enzymes).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each step of genetic fingerprinting with its purpose.",
    pairs: [
      ["restriction enzymes", "cut DNA into fragments at specific sequences"],
      ["gel electrophoresis", "separate fragments by length"],
      ["labelled probes", "bind to particular sequences so the bands can be seen"],
      ["polymerase chain reaction", "make many copies of DNA from a tiny sample"],
    ],
    explanation: "Cut, separate, label and (if needed) amplify.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about the electrophoresis of DNA.",
    template: "DNA fragments carry a {{blank:a}} charge because of their phosphate groups, so they move towards the {{blank:b}}. The {{blank:c}} fragments move furthest.",
    blanks: [
      { id: "a", accepted: ["negative"], choices: ["negative", "positive"] },
      { id: "b", accepted: ["anode"], choices: ["anode", "cathode"] },
      { id: "c", accepted: ["shortest"], choices: ["shortest", "longest"] },
    ],
    explanation: "Phosphate groups give DNA a negative charge; fragments move to the anode, shortest furthest.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the pH at which an amino acid has no overall charge?",
    accepted: ["isoelectric point", "the isoelectric point", "pI", "isoelectric pH"],
    wrong: ["neutral point"],
    explanation: "The isoelectric point: the amino acid is mainly a zwitterion.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why an amino acid can move towards the cathode in one buffer but towards the anode in another.",
    points: ["In acidic buffer (below the isoelectric point) the amine group is protonated (–NH₃⁺): overall positive, moves to the cathode", "In alkaline buffer (above the isoelectric point) the –COOH group loses H⁺ (–COO⁻): overall negative, moves to the anode", "The charge, and so the direction of movement, therefore depends on the pH of the buffer"],
    modelAnswer: "An amino acid has a basic –NH₂ group and an acidic –COOH group. In an acidic buffer the amine is protonated to –NH₃⁺ and the acid is un-ionised, so the ion is positive and moves to the cathode. In an alkaline buffer the –COOH loses H⁺ to give –COO⁻ while –NH₂ stays neutral, so the ion is negative and moves to the anode. The pH of the buffer controls the charge.",
    hints: ["Which group gains or loses H⁺ at low and at high pH?"],
    explanation: "Charge depends on pH relative to the isoelectric point.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how a sample of a protein can be broken down and its amino acids separated and detected using electrophoresis.",
    points: ["Hydrolyse the protein by heating under reflux with concentrated (about 6 mol dm⁻³) HCl for several hours (peptide links broken)", "Place the hydrolysate on a gel or paper soaked in a buffer of known pH and apply a voltage", "Amino acids move different distances/directions according to their charge at that pH and their size", "Spray with ninhydrin and warm to reveal purple spots; compare with known amino acids run under the same conditions"],
    modelAnswer: "The protein is heated under reflux with about 6 mol dm⁻³ hydrochloric acid for many hours to hydrolyse its peptide links. The mixture of amino acids is placed on a gel (or paper) soaked in a buffer and a voltage is applied; each amino acid moves according to its charge at that pH and its size. The gel is then sprayed with ninhydrin and warmed, giving purple spots whose positions are compared with known amino acids run at the same time.",
    hints: ["Four stages: break down, separate, see, identify."],
    explanation: "Hydrolysis, separation, detection, identification.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A DNA profile from a sample left at a crime scene in Bulawayo matches the profile of a suspect. Discuss what this does and does not show.",
    points: ["A match shows that the suspect could be the source of the sample; the probability of a random match is usually very small", "It does not prove the suspect committed the crime (the sample could have been left innocently / at another time) and contamination or errors in handling are possible", "Collection and storage of DNA profiles raise ethical issues of consent and privacy, so results must be handled carefully"],
    modelAnswer: "A matching profile shows that the suspect could have left the sample, and the chance that an unrelated person matches by coincidence is usually very small. It does not prove guilt: the sample may have been left at another time or for an innocent reason, and contamination or laboratory errors are possible. DNA databases also raise questions of consent and privacy, so the evidence must be weighed with other evidence.",
    hints: ["Separate 'was there' from 'did it'."],
    explanation: "Balanced evaluation of DNA evidence.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A short peptide from a plant protein is hydrolysed and the products analysed by electrophoresis on paper buffered at pH 6.0. Data (isoelectric points): alanine 6.0, valine 6.0, arginine 10.8, glutamic acid 3.2.\n\n| Spot | Distance from start / cm | Direction |\n|---|---|---|\n| 1 | 0 | – |\n| 2 | 3.5 | towards cathode |\n| 3 | 4.0 | towards anode |",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State the reagent and conditions for hydrolysing the peptide.", points: ["Concentrated hydrochloric acid (about 6 mol dm⁻³)", "Heat under reflux for several hours"], modelAnswer: "Heat under reflux with about 6 mol dm⁻³ hydrochloric acid for several hours." }),
      P.short({ label: "(b)", marks: 1, stem: "Which amino acid is spot 2?", accepted: ["arginine"], wrong: ["glutamic acid"], explanation: "Positive at pH 6 (below its isoelectric point of 10.8): moves to the cathode." }),
      P.short({ label: "(c)", marks: 1, stem: "Which amino acid is spot 3?", accepted: ["glutamic acid", "glutamate"], wrong: ["arginine"], explanation: "Negative at pH 6 (above its isoelectric point of 3.2): moves to the anode." }),
      P.manual({ label: "(d)", marks: 2, stem: "Spot 1 could be alanine, valine or both. Explain why, and suggest how to find out.", points: ["Both have isoelectric points of about 6.0, so at pH 6.0 both are zwitterions with no overall charge and stay at the start", "Run the mixture again at a different pH or by chromatography (or compare with standards) so that they separate"], modelAnswer: "Alanine and valine both have isoelectric points close to 6.0, so at this pH both are uncharged zwitterions and neither moves. Repeating the separation by paper chromatography, or by electrophoresis at another pH where their charges or sizes make them move differently, and comparing with standards would show which is present." }),
      P.manual({ label: "(e)", marks: 1, stem: "Glutamic acid is HOOCCH₂CH₂CH(NH₂)COOH. Give the structure of the form present at pH 6.0.", points: ["⁻OOCCH₂CH₂CH(NH₃⁺)COO⁻ (overall charge −1)"], modelAnswer: "⁻OOCCH₂CH₂CH(NH₃⁺)COO⁻: both carboxyl groups ionised, the amine protonated, overall charge −1." }),
      P.manual({ label: "(f)", marks: 1, stem: "Explain why ninhydrin must be sprayed on the paper before the spots can be seen.", points: ["Amino acids are colourless; ninhydrin reacts with them to give purple spots"], modelAnswer: "Amino acids are colourless, so ninhydrin is used: on warming it reacts with them to give purple spots." }),
    ],
    hints: ["Below its isoelectric point an amino acid is positive."],
    explanation: "Spot 2 arginine (cation), spot 3 glutamic acid (anion), spot 1 a neutral zwitterion (alanine and/or valine).",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "DNA profiles are obtained in a paternity case. Each person's profile is a set of bands at different distances from the well.\n\n| Person | Bands (distance from well / mm) |\n|---|---|\n| mother | 12, 20, 31, 45 |\n| child | 12, 18, 31, 40 |\n| man X | 18, 25, 40, 52 |\n| man Y | 15, 18, 36, 47 |",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many of the child's bands match the mother's?", value: 2, wrong: [4], explanation: "12 and 31 mm." }),
      P.manual({ label: "(b)", marks: 2, stem: "Which man could be the father? Explain.", points: ["The child's bands not from the mother are 18 and 40 mm; both must come from the father", "Man X has both 18 and 40; man Y lacks 40, so man Y is excluded and man X could be the father"], modelAnswer: "The bands at 18 and 40 mm did not come from the mother, so they came from the father. Man X has both; man Y has 18 but not 40, so man Y cannot be the father and man X could be." }),
      P.mcq({ label: "(c)", marks: 1, stem: "The band at 52 mm in man X's profile is further from the well than the band at 25 mm. What does this show about the fragment?", options: [
        ["It is a shorter fragment of DNA.", "Correct: shorter fragments move further through the gel."],
        ["It is a longer fragment of DNA.", "Longer fragments move less far."],
        ["It carries a positive charge.", "All DNA fragments are negative and move the same way."],
        ["It has not been cut by the enzyme.", "Uncut DNA would be very long and stay near the well."],
      ], answer: "A", explanation: "Distance travelled increases as fragment length decreases." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why all the DNA fragments move in the same direction, and name the electrode they move towards.", points: ["Every fragment carries negative charges on its phosphate groups", "So all fragments move towards the anode (positive electrode)"], modelAnswer: "The phosphate groups in the DNA backbone are negatively charged, so every fragment is an anion and moves towards the positive electrode, the anode." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest two precautions the laboratory must take for the result to be reliable.", points: ["Avoid contamination of samples with other DNA (gloves, clean equipment, separate handling)", "Run all samples on the same gel under the same conditions, with labelled lanes / repeat the analysis / use enough probes (bands)"], modelAnswer: "Samples must be collected and handled without contamination by other people's DNA, and all four profiles should be run together on the same gel under identical conditions, with clear labelling, and the test repeated with several probes." }),
    ],
    hints: ["Every band in the child comes from a parent."],
    explanation: "Child bands 18 and 40 come from the father: man X fits, man Y is excluded.",
  });
  b.card("DEFINITION", "Electrophoresis", "Separation of charged particles by their movement in an electric field through a buffered gel or paper.");
  b.card("CONCEPT", "Rate in electrophoresis", "Faster for larger charge and higher voltage; slower for larger particles (gel acts as a sieve).");
  b.card("DEFINITION", "Isoelectric point", "pH at which an amino acid is mainly a zwitterion with no overall charge; it does not move.");
  b.card("CONCEPT", "Amino acids and pH", "Low pH: cation (to cathode). High pH: anion (to anode).");
  b.card("FACT", "Hydrolysing proteins", "Heat under reflux with about 6 mol dm⁻³ HCl for several hours; detect amino acids with ninhydrin (purple).");
  b.card("DEFINITION", "Restriction enzyme", "An enzyme that cuts DNA at a specific base sequence.");
  b.card("CONCEPT", "DNA in electrophoresis", "Negatively charged phosphate groups: all fragments move to the anode; shorter fragments move further.");
  b.card("CONCEPT", "Genetic fingerprinting steps", "Extract DNA (PCR if needed), cut with restriction enzymes, electrophoresis, labelled probes, visualise bands, compare.");
  b.card("FACT", "Uses of DNA profiling", "Forensic matching, paternity tests, identifying disaster victims; results are probabilities and raise privacy issues.");
});
