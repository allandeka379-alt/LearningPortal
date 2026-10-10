// W4b: recombinant DNA and genetic engineering (both boards; ZIMSEC Form 6, Cambridge A Level only).
import { concept, P, t, chk, table, complement, CAM } from "../lib.mjs";

const findSites = (s, site) => {
  const r = [];
  let i = s.indexOf(site);
  while (i >= 0) {
    r.push(i + 1);
    i = s.indexOf(site, i + 1);
  }
  return r;
};
const fragments = (len, cuts, circular = false) => {
  const c = [...cuts].sort((a, b) => a - b);
  if (circular) return c.map((x, i) => (i + 1 < c.length ? c[i + 1] - x : len - x + c[0]));
  const out = [];
  let prev = 0;
  for (const x of c) {
    out.push(x - prev);
    prev = x;
  }
  out.push(len - prev);
  return out;
};

concept("abio.genetech.recombinant-dna", { file: "genetech/recombinant-dna", keyPrefix: "genetech.recombinant-dna" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which enzyme joins the sugar-phosphate backbones of a gene and a plasmid?",
    options: [
      ["DNA ligase", "Correct: forms phosphodiester bonds."],
      ["Restriction endonuclease", "This cuts DNA rather than joining it."],
      ["Reverse transcriptase", "This makes DNA from an mRNA template."],
      ["RNA polymerase", "This transcribes DNA into RNA."],
    ],
    answer: "A",
    explanation: "**DNA ligase** forms phosphodiester bonds, sealing the gene into the plasmid.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are the gene and the plasmid cut with the same restriction enzyme?",
    options: [
      ["To produce complementary sticky ends that can base-pair", "Correct."],
      ["To make sure the gene is transcribed in the host cell", "Transcription needs a promoter, not matching ends."],
      ["To remove the introns from the eukaryotic gene", "Restriction enzymes do not remove introns."],
      ["To make the plasmid resistant to antibiotics", "Resistance comes from a marker gene."],
    ],
    answer: "A",
    explanation: "The same enzyme leaves complementary sticky ends on both, so they pair and can be sealed by ligase.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the role of reverse transcriptase in producing a gene for transfer?",
    options: [
      ["It makes single-stranded cDNA using mRNA as a template", "Correct."],
      ["It cuts the gene out of the chromosome at specific sites", "That is a restriction enzyme."],
      ["It joins the cDNA into the opened plasmid", "That is DNA ligase."],
      ["It copies the plasmid inside the bacterial host", "Plasmid replication uses DNA polymerase."],
    ],
    answer: "A",
    explanation: "Reverse transcriptase (from retroviruses) synthesises cDNA complementary to mRNA.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is a human gene usually inserted into bacteria as cDNA rather than as DNA cut from a chromosome?",
    options: [
      ["cDNA lacks introns, which bacteria cannot remove", "Correct: bacteria do not splice RNA."],
      ["cDNA contains its own promoter sequence", "cDNA made from mRNA lacks the promoter."],
      ["Bacteria cannot read DNA from chromosomes", "The genetic code is universal."],
      ["cDNA is double-stranded but genomic DNA is not", "Genomic DNA is double-stranded too."],
    ],
    answer: "A",
    explanation: "mRNA has been spliced, so cDNA has only exons and can be expressed by bacteria.",
    hints: ["What happens to introns in eukaryotic cells?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why may a promoter be transferred together with a gene?",
    options: [
      ["So that RNA polymerase in the host binds and transcribes the gene", "Correct."],
      ["So that ribosomes can attach to the gene and translate it", "Ribosomes attach to mRNA, not to the promoter."],
      ["So that the gene can be cut out by a restriction enzyme", "Promoters are not cutting sites."],
      ["So that the host cell will take up the plasmid", "Uptake depends on transformation methods."],
    ],
    answer: "A",
    explanation: "Without a promoter recognised by the host's RNA polymerase, the gene will not be transcribed; promoters can also control where or when it is expressed.",
    hints: ["What starts transcription?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which of the following base sequences (top strand, 5'→3') is palindromic and could be a restriction site?",
    options: [
      ["GGATCC", "Correct: its complement read 5'→3' is also GGATCC."],
      ["GGATTC", "Its complement read 5'→3' is GAATCC, which differs."],
      ["GAATCC", "Its complement read 5'→3' is GGATTC, which differs."],
      ["GCATCC", "Its complement read 5'→3' is GGATGC, which differs."],
    ],
    answer: "A",
    explanation: "A palindromic site reads the same 5'→3' on both strands. GGATCC (BamHI) does; the others do not.",
    hints: ["Write the complementary strand and read it in the 5'→3' direction."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: CAM,
    stem: "Bacteria are transformed with a plasmid in which the gene of interest has been inserted into the GFP gene, and grown on agar containing the antibiotic for which the plasmid carries a resistance gene. Which colonies contain the recombinant plasmid?",
    options: [
      ["Colonies that grow but do not glow under blue light", "Correct: GFP is disrupted by the insert."],
      ["Colonies that grow and glow green under blue light", "These have plasmids whose GFP gene is intact, without the insert."],
      ["Colonies that fail to grow on the antibiotic agar", "Cells without a plasmid die on the antibiotic and form no colonies."],
      ["All the colonies, because all took up the human gene", "Some plasmids re-close without the gene."],
    ],
    answer: "A",
    explanation: "Growth shows a plasmid is present; loss of fluorescence shows the GFP gene has been interrupted by the inserted gene.",
    hints: ["What happens to GFP when a gene is inserted into it?"],
  });
  b.mcq({
    d: 4, skill: "UNDERSTANDING", applies: CAM,
    stem: "In CRISPR-Cas9 gene editing, what determines the site in the genome where DNA is cut?",
    options: [
      ["The base sequence of the guide RNA", "Correct: it pairs with the complementary target DNA."],
      ["The position of the nearest promoter", "Promoters are not used to target Cas9."],
      ["The restriction site recognised by Cas9", "Cas9 is guided by RNA, not by a fixed recognition site."],
      ["The location of the gene for GFP", "GFP is a marker, not a targeting system."],
    ],
    answer: "A",
    explanation: "The guide RNA is designed to be complementary to the target sequence and directs Cas9 to cut there.",
    hints: ["Which component can be redesigned for each target?"],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Plasmids are small circles of double-stranded DNA found in many bacteria.",
    answer: true,
    explanation: "True. They replicate independently of the bacterial chromosome.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "DNA ligase forms the hydrogen bonds between complementary sticky ends.",
    answer: false,
    explanation: "False. Sticky ends pair by hydrogen bonds without an enzyme; ligase forms phosphodiester bonds in the backbone.",
  });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each tool with its role in genetic engineering.",
    pairs: [
      ["Restriction endonuclease", "Cuts DNA at a specific base sequence"],
      ["DNA ligase", "Seals phosphodiester bonds between fragments"],
      ["Reverse transcriptase", "Makes cDNA from an mRNA template"],
      ["Plasmid", "Vector that carries the gene into a bacterium"],
      ["Promoter", "Allows RNA polymerase to bind and start transcription"],
    ],
    explanation: "Cut, seal, copy from mRNA, carry, switch on.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "A restriction enzyme that makes a {{blank:a}} cut leaves single-stranded overhangs called {{blank:b}} ends. Cells that have taken up a plasmid are said to be {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["staggered"], choices: ["staggered", "straight", "random"] },
      { id: "b", accepted: ["sticky"], choices: ["sticky", "blunt", "promoter"] },
      { id: "c", accepted: ["transformed"], choices: ["transformed", "transcribed", "translated"] },
    ],
    explanation: "Staggered cuts → sticky ends; uptake of DNA = transformation.",
  });

  // Short: complementary strand of a sticky end
  const end = "AGCT";
  const endComp = complement(end).split("").reverse().join("");
  b.short({
    d: 3, skill: "APPLICATION",
    stem: `A restriction enzyme leaves the single-stranded sticky end 5'-${end}-3'. Give the base sequence, written 5'→3', of a sticky end that will pair with it.`,
    accepted: [endComp, `5'-${endComp}-3'`, `5' ${endComp} 3'`],
    wrong: [complement(end)],
    explanation: `Pair each base (A-T, G-C) and read the partner strand 5'→3': ${endComp}. Writing the complement without reversing it (${complement(end)}) gives it 3'→5'.`,
    hints: ["Complementary strands are antiparallel."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the protein, coded by a jellyfish gene, that is used as a fluorescent marker in genetic engineering.",
    accepted: ["green fluorescent protein", "GFP"],
    wrong: ["chlorophyll"],
    explanation: "**Green fluorescent protein (GFP)**.",
  });

  // Numerical: fragments
  const L = 4200;
  const cuts = [900, 2350, 3100];
  const fr = fragments(L, cuts);
  chk(fr.reduce((a, x) => a + x, 0), L);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A linear DNA molecule of ${L} base pairs is cut by a restriction enzyme at three sites. How many fragments are produced?`,
    value: fr.length, wrong: [3],
    explanation: `A linear molecule cut ${cuts.length} times gives ${cuts.length} + 1 = ${fr.length} fragments. (A circular plasmid cut three times would give three.)`,
  });
  const longest = Math.max(...fr);
  calc({
    d: 3, skill: "APPLICATION",
    stem: `A linear DNA molecule of ${L} base pairs is cut after base pairs ${cuts.join(", ")}. Calculate the length, in base pairs, of the longest fragment.`,
    value: longest, wrong: [cuts[1]],
    explanation: t`1. Fragments: ${cuts[0]}; ${cuts[1]} − ${cuts[0]} = ${fr[1]}; ${cuts[2]} − ${cuts[1]} = ${fr[2]}; ${L} − ${cuts[2]} = ${fr[3]}.
2. Check: the total is ${L} bp.
3. The longest is ${longest} bp. Quoting a cut position (${cuts[1]}) instead of a length is a common slip.`,
    hints: ["Subtract consecutive cut positions, then the last from the total."],
  });
  const P5 = 5600;
  const pc = [1200, 4100];
  const frC = fragments(P5, pc, true);
  chk(frC.reduce((a, x) => a + x, 0), P5);
  calc({
    d: 4, skill: "APPLICATION",
    stem: `A circular plasmid of ${P5} base pairs has EcoRI sites at positions ${pc[0]} and ${pc[1]}. Calculate the length, in base pairs, of the smaller fragment produced when it is cut with EcoRI.`,
    value: Math.min(...frC), wrong: [pc[0]],
    explanation: t`1. A circular molecule cut twice gives two fragments.
2. One fragment runs from ${pc[0]} to ${pc[1]}: ${pc[1]} − ${pc[0]} = ${frC[0]} bp.
3. The other runs from ${pc[1]} round to ${pc[0]}: ${P5} − ${pc[1]} + ${pc[0]} = ${frC[1]} bp.
4. The smaller fragment is ${Math.min(...frC)} bp. Treating the plasmid as linear would wrongly give three fragments, including one of ${pc[0]} bp.`,
    hints: ["A circle cut twice gives two pieces."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a human gene can be inserted into a plasmid.",
    points: [
      "The gene (cDNA) and the plasmid are cut with the same restriction enzyme",
      "This produces complementary sticky ends",
      "The gene and the opened plasmid are mixed so the sticky ends base-pair (hydrogen bonds)",
      "DNA ligase forms phosphodiester bonds, producing a recombinant plasmid",
    ],
    modelAnswer: "The gene and the plasmid are cut with the same restriction enzyme, which makes staggered cuts and leaves complementary sticky ends. When they are mixed, the sticky ends of the gene pair with those of the opened plasmid by hydrogen bonding. DNA ligase then seals the sugar-phosphate backbones by forming phosphodiester bonds, giving a recombinant plasmid.",
    explanation: "Cut with the same enzyme, pair, seal.",
    hints: ["Same enzyme, then ligase."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why marker genes are needed when bacteria are transformed with recombinant plasmids.",
    points: [
      "Only a small proportion of bacteria take up a plasmid",
      "Some plasmids re-close without the gene of interest",
      "Markers (GFP fluorescence or antibiotic resistance) identify the cells that have taken up the recombinant plasmid, so only these are cultured",
    ],
    modelAnswer: "Transformation is inefficient, so most bacteria take up no plasmid, and some plasmids close up again without the gene. A marker gene, such as one for GFP or antibiotic resistance, lets scientists identify the cells that contain the recombinant plasmid so that only these are grown.",
    explanation: "Identifying the few transformed cells.",
    hints: ["Do all cells take up the recombinant plasmid?"],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4, applies: CAM,
    stem: "Outline how CRISPR-Cas9 can be used to delete part of a gene in a cell.",
    points: [
      "A guide RNA is made with a base sequence complementary to the target site",
      "Guide RNA binds to (pairs with) the target DNA and directs Cas9 there",
      "Cas9 nuclease cuts both strands of the DNA at that site",
      "The cell's repair of the break adds or deletes bases, disrupting / knocking out the gene",
    ],
    modelAnswer: "A guide RNA is designed with a sequence complementary to the target region of the gene. It forms a complex with the Cas9 nuclease and base-pairs with the target DNA, so Cas9 cuts both strands at exactly that site. When the cell repairs the break, bases are often deleted or inserted, which disrupts the gene so that it no longer codes for a functional protein.",
    explanation: "Guide, cut, repair.",
    hints: ["What guides Cas9 to the right place?"],
  });

  // Practice structured: restriction map
  const seq = "TTGAATTCAGGCTAGGATCCTTAGCGAATTCAC";
  const eco = findSites(seq, "GAATTC");
  const bam = findSites(seq, "GGATCC");
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: `Part of the top strand of a DNA molecule is shown, 5'→3':\n\n5'-${seq}-3'\n\nEcoRI cuts G^AATTC and BamHI cuts G^GATCC (^ marks the cut on this strand).`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many EcoRI sites are in this sequence?", value: eco.length, wrong: [1], explanation: `GAATTC occurs ${eco.length} times (starting at bases ${eco.join(" and ")}).` }),
      P.num({ label: "(b)", marks: 1, stem: "At which base number (counting from the 5' end, the first T = 1) does the BamHI site begin?", value: bam[0], wrong: [bam[0] + 1], explanation: `GGATCC starts at base ${bam[0]}.` }),
      P.short({
        label: "(c)", marks: 1, stem: "Give the sequence, 5'→3', of the single-stranded overhang left by EcoRI.",
        accepted: ["AATT", "5'-AATT-3'"], wrong: ["TTAA"],
        explanation: "EcoRI cuts G^AATTC on both strands, leaving 5'-AATT overhangs.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why a fragment cut out with BamHI could not be joined directly into a plasmid opened with EcoRI.",
        points: ["BamHI leaves GATC overhangs; EcoRI leaves AATT overhangs", "The sticky ends are not complementary, so they cannot base-pair", "Ligase cannot join them efficiently / the same enzyme (or compatible ends) must be used"],
        modelAnswer: "BamHI leaves 5'-GATC sticky ends, while EcoRI leaves 5'-AATT sticky ends. These are not complementary, so the ends cannot base-pair to hold the fragment in place, and ligase cannot seal them. The fragment and plasmid must be cut with the same enzyme or enzymes with compatible ends.",
      }),
    ],
    explanation: "Find palindromic sites; sticky ends must be complementary.",
    hints: ["Search the sequence for each recognition site."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "Rudo transformed bacteria with plasmids carrying an ampicillin-resistance gene and a tetracycline-resistance gene. A human gene was inserted into the middle of the tetracycline-resistance gene. Colonies that grew on ampicillin agar were transferred (replica plated) onto tetracycline agar in the same positions.\n\n" +
      table(["Colony", "Grows on ampicillin", "Grows on tetracycline"], [["1", "yes", "yes"], ["2", "yes", "no"], ["3", "yes", "yes"], ["4", "yes", "no"]]),
    parts: [
      P.manual({
        label: "(a)", marks: 1, stem: "Explain why all colonies on the ampicillin agar must contain a plasmid.",
        points: ["Only cells with the plasmid have the ampicillin-resistance gene; cells without a plasmid are killed"],
        modelAnswer: "Bacteria without a plasmid lack the ampicillin-resistance gene and are killed, so every colony that grew contains a plasmid.",
      }),
      P.mcq({
        label: "(b)", stem: "Which colonies contain the recombinant plasmid?",
        options: [
          ["2 and 4", "Correct: the insert disrupts the tetracycline gene."],
          ["1 and 3", "These still resist tetracycline, so the gene is intact (no insert)."],
          ["All four", "Colonies 1 and 3 have plasmids without the insert."],
          ["None of them", "Colonies 2 and 4 show the expected pattern."],
        ],
        answer: "A",
        explanation: "Recombinant plasmids give ampicillin resistance but no tetracycline resistance.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain your answer to (b).",
        points: ["The human gene was inserted into the tetracycline-resistance gene, disrupting it", "So bacteria with the recombinant plasmid resist ampicillin but are killed by tetracycline"],
        modelAnswer: "Inserting the human gene into the tetracycline-resistance gene disrupts that gene, so it no longer codes for a working protein. Bacteria with the recombinant plasmid therefore grow on ampicillin but not on tetracycline.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two reasons why scientists now prefer fluorescent markers such as GFP to antibiotic-resistance markers.",
        points: ["Avoids spreading antibiotic-resistance genes to other (pathogenic) bacteria", "Results seen directly / quickly under light without replica plating; cells not killed"],
        modelAnswer: "Fluorescent markers avoid releasing antibiotic-resistance genes that could spread to pathogenic bacteria. Transformed cells can be seen directly and quickly under blue light, without replica plating or killing cells.",
      }),
    ],
    explanation: "Insertional inactivation of a marker identifies recombinant colonies.",
    hints: ["What happens to a gene when another gene is inserted into it?"],
  });

  b.card("DEFINITION", "Define **recombinant DNA**.", "DNA made by joining DNA from two or more different sources, often different species.");
  b.card("DEFINITION", "Define **restriction endonuclease**.", "Enzyme that cuts both DNA strands at a specific (often palindromic) recognition sequence.");
  b.card("CONCEPT", "Sticky ends", "Single-stranded overhangs from staggered cuts; same enzyme → complementary ends that base-pair.");
  b.card("FACT", "Role of DNA ligase", "Forms phosphodiester bonds between sugar-phosphate backbones, sealing DNA fragments.");
  b.card("FACT", "Role of reverse transcriptase", "Makes cDNA from an mRNA template; cDNA has no introns.");
  b.card("CONCEPT", "Three ways to obtain a gene", "Cut from donor DNA; make cDNA from mRNA (reverse transcriptase); synthesise chemically from the sequence.");
  b.card("CONCEPT", "Why transfer a promoter with the gene?", "So the host's RNA polymerase binds and transcribes it; can also control where/when it is expressed.");
  b.card("FACT", "GFP as a marker", "Green fluorescent protein glows under blue/UV light, showing which cells were transformed and express the gene.");
  b.card("CONCEPT", "CRISPR-Cas9 in outline", "Guide RNA pairs with target DNA; Cas9 cuts both strands; repair inserts, deletes or replaces bases.", undefined, { applies: CAM });
  b.card("FACT", "Fragments from cuts", "Linear DNA: n cuts → n + 1 fragments. Circular plasmid: n cuts → n fragments.");
});
