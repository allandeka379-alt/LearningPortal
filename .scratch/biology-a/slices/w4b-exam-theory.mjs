// W4b: THEORY10 exam-format items (ZIMSEC Paper 2; Cambridge Paper 4, A Level concepts): ecology, conservation and
// genetic technology. All six use concepts covered by both syllabi.
import { concept, P, t, chk, table, dpStr, sfStr, pctChange, pcrCopies, mean, EXAM, checkExam } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const T = { examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, paper: "ZIMSEC P2 / Cambridge P4" };

concept(A("genetech.recombinant-dna"), { file: "exam/w4b-theory", keyPrefix: "exam.w4b-theory" }, (b) => {
  // ---------------------------------------------------------------- T1: restriction sites and a recombinant plasmid
  const seq = "CAGGATCCTTGCAATGGCCTAGGATCCAT";
  const sites = [];
  for (let i = seq.indexOf("GGATCC"); i >= 0; i = seq.indexOf("GGATCC", i + 1)) sites.push(i + 1);
  chk(sites.length, 2);
  const plasmid = 4600, insert = 1150;
  const recomb = plasmid + insert;
  b.struct({
    ...T, d: 4,
    concepts: [A("genetech.recombinant-dna"), A("genetech.insulin-recombinant-proteins")],
    stem: `A human gene is to be inserted into a plasmid of ${plasmid} base pairs that has one BamHI site inside a gene for green fluorescent protein (GFP). BamHI recognises 5'-GGATCC-3' and cuts between the two G bases. Part of the top strand of the human DNA, written 5'→3', is:\n\n5'-${seq}-3'`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 1, stem: "How many BamHI sites are in the sequence shown?",
        value: sites.length, wrong: [1],
        explanation: `GGATCC starts at bases ${sites.join(" and ")}: ${sites.length} sites.`,
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Give the base sequence, 5'→3', of the single-stranded sticky end left by BamHI.",
        accepted: ["GATC", "5'-GATC-3'"], wrong: ["CTAG"],
        explanation: "G^GATCC leaves 5'-GATC overhangs.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the plasmid must be cut with BamHI, the same enzyme used on the human DNA.",
        points: ["Produces complementary sticky ends on plasmid and gene", "So they base-pair (hydrogen bonds) and DNA ligase can seal them with phosphodiester bonds"],
        modelAnswer: "Cutting both with BamHI gives complementary sticky ends, so the ends of the gene base-pair with those of the opened plasmid, holding them in place for DNA ligase to form phosphodiester bonds.",
      }),
      P.num({
        label: "(d)", marks: 1, stem: `The fragment inserted is ${insert} base pairs long. State the length, in base pairs, of the recombinant plasmid.`,
        value: recomb, wrong: [plasmid - insert],
        explanation: `${plasmid} + ${insert} = ${recomb} bp.`,
      }),
      P.mcq({
        label: "(e)", stem: "Bacteria are transformed and grown. Which colonies contain the recombinant plasmid?",
        options: [
          ["Colonies with plasmids that do not glow under blue light", "Correct: the insert disrupts the GFP gene."],
          ["Colonies with plasmids that glow green under blue light", "GFP is intact: no insert."],
          ["Colonies that have no plasmid at all", "These lack the gene."],
          ["All colonies that grow, whatever their colour", "Some plasmids re-close without the gene."],
        ],
        answer: "A",
        explanation: "Insertion into the GFP gene stops GFP being made.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why a promoter recognised by bacteria is placed next to the human gene.",
        points: ["RNA polymerase must bind to a promoter to start transcription", "Bacterial RNA polymerase does not recognise human promoters, so without it the gene would not be expressed"],
        modelAnswer: "Transcription starts when RNA polymerase binds to a promoter. Bacterial RNA polymerase does not recognise human promoters, so a bacterial promoter is needed for the gene to be transcribed and expressed.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "The human gene was made from mRNA rather than cut from a chromosome. Explain why.",
        points: ["Genomic DNA contains introns", "Bacteria cannot splice out introns; cDNA from (spliced) mRNA made by reverse transcriptase has none"],
        modelAnswer: "The chromosomal gene contains introns, which bacteria cannot remove because they do not splice RNA. cDNA made from mature mRNA by reverse transcriptase contains only exons.",
      }),
    ]),
    explanation: "Restriction sites, sticky ends, ligation, markers, promoters and cDNA.",
    hints: ["Search the sequence for GGATCC.", "What happens to GFP when a gene is inserted into it?"],
  });

  // ---------------------------------------------------------------- T2: PCR and gel electrophoresis
  const n0 = 30, cyc = 18;
  const N = pcrCopies(n0, cyc);
  const lad = [[10, 1600], [22, 800], [34, 400], [46, 200]];
  const ud = 28;
  const uLen = 10 ** (Math.log10(800) + ((ud - 22) * (Math.log10(400) - Math.log10(800))) / 12);
  b.struct({
    ...T, d: 4,
    concepts: [A("genetech.pcr-electrophoresis-fingerprinting")],
    stem: `A short region of DNA was copied by PCR from a sample containing ${n0} copies, then the product was separated by gel electrophoresis next to a DNA ladder.\n\n${table(["Ladder band / bp", ...lad.map((x) => String(x[1]))], [["Distance from well / mm", ...lad.map((x) => String(x[0]))]])}\n\nThe PCR product formed a single band ${ud} mm from the well.`,
    parts: checkExam(EXAM.THEORY10, [
      P.manual({
        label: "(a)", marks: 3, stem: "Describe what happens at each of the three temperatures in one PCR cycle.",
        points: ["About 95 °C: hydrogen bonds break, strands separate (denaturation)", "About 55-65 °C: primers anneal to complementary sequences at the ends of the target", "About 72 °C: Taq polymerase adds nucleotides to the primers, making complementary strands"],
        modelAnswer: "At about 95 °C the hydrogen bonds break and the DNA strands separate. At about 55-65 °C primers bind to complementary sequences at each end of the target. At about 72 °C Taq polymerase extends the primers by adding nucleotides complementary to each template strand.",
      }),
      P.manual({
        label: "(b)", marks: 1, stem: "Explain why Taq polymerase is used.",
        points: ["It is thermostable / not denatured at 95 °C, so it works through every cycle without being replaced"],
        modelAnswer: "Taq polymerase, from a hot-spring bacterium, is not denatured at 95 °C, so it keeps working through every cycle.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: `Calculate the number of copies after ${cyc} cycles, assuming perfect doubling. Give your answer to three significant figures.`,
        value: N, sf: 3, wrong: [n0 * 2 * cyc],
        explanation: t`$${n0} \times 2^{${cyc}} = ${N}$, about $${sfStr(N / 1e6, 3)} \times 10^{6}$.`,
      }),
      P.mcq({
        label: "(d)", stem: "Towards which electrode does the DNA move, and why?",
        options: [
          ["The anode, because phosphate groups make DNA negative", "Correct."],
          ["The cathode, because phosphate groups make DNA positive", "Phosphate groups are negative."],
          ["The anode, because the bases are positively charged", "The charge comes from phosphates."],
          ["The cathode, because smaller fragments are pushed by larger ones", "Movement is due to charge in the field."],
        ],
        answer: "A",
        explanation: "Negatively charged DNA moves to the positive anode.",
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Distance is proportional to the logarithm of length (each 12 mm halves the length). Estimate the length of the PCR product in base pairs, to three significant figures.",
        value: uLen, sf: 3, wrong: [600],
        explanation: `28 mm is halfway between 22 mm (800 bp) and 34 mm (400 bp), so the length is $800 \\div \\sqrt{2} = ${sfStr(uLen, 3)}$ bp. A linear average (600 bp) ignores the logarithmic scale.`,
      }),
      P.manual({
        label: "(f)", marks: 1, stem: "Suggest why only one band was produced from the PCR.",
        points: ["Primers bind only at the two ends of one target sequence, so all copies are the same length"],
        modelAnswer: "The primers are complementary to the two ends of one specific target, so every copy made is the same length and forms one band.",
      }),
    ]),
    explanation: "PCR steps, Taq, copy number and fragment size from a ladder.",
    hints: ["Number of copies = starting copies × 2^cycles.", "Halfway in distance is halfway on a log scale."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T3: insulin production in a fermenter
  const hrs = [0, 5, 10, 15, 20, 25];
  const cells = [0.1, 0.4, 1.8, 4.6, 5.9, 6.0]; // relative
  const ins = [0, 3, 14, 38, 52, 57];
  const rate = (ins[3] - ins[1]) / 10;
  b.struct({
    ...T, d: 4,
    concepts: [A("genetech.insulin-recombinant-proteins"), A("genetech.recombinant-dna")],
    stem: `*E. coli* carrying a recombinant plasmid with the human proinsulin gene were grown in a fermenter at 37 °C. Samples were taken every 5 hours.\n\n${table(["Time / h", ...hrs.map(String)], [["Cell density / arbitrary units", ...cells.map((x) => x.toFixed(1))], ["Proinsulin / mg dm⁻³", ...ins.map(String)]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.short({
        label: "(a)", marks: 1, stem: "Name the enzyme used to make the proinsulin gene from mRNA.",
        accepted: ["reverse transcriptase"], wrong: ["DNA ligase"],
        explanation: "Reverse transcriptase makes cDNA from mRNA.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the mean rate of proinsulin production between 5 h and 15 h, in mg dm⁻³ per hour. Give your answer to one decimal place.",
        value: rate, dp: 1, wrong: [Math.round((ins[3] / 15) * 10) / 10],
        explanation: `(${ins[3]} − ${ins[1]}) ÷ 10 = ${dpStr(rate, 1)} mg dm⁻³ per hour.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why proinsulin production slows after 20 hours.",
        points: ["Cell density levels off (5.9 to 6.0): no more growth", "Nutrients run out / wastes accumulate / oxygen limiting, so fewer cells and less protein synthesis"],
        modelAnswer: "Cell density levels off at about 6.0 after 20 hours because nutrients are used up and wastes build up, so the population stops growing and protein synthesis slows.",
      }),
      P.mcq({
        label: "(d)", stem: "Why must the fermenter be cooled?",
        options: [
          ["Heat from respiration could denature enzymes", "Correct."],
          ["Proinsulin is made only below 20 °C", "The process runs at about 37 °C."],
          ["Cooling kills any contaminating microorganisms", "Sterilisation, not cooling, does that."],
          ["Cooling increases the oxygen used by the bacteria", "Not the reason."],
        ],
        answer: "A",
        explanation: "Metabolic heat would raise the temperature above the optimum.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Explain four advantages of recombinant human insulin over insulin from pigs or cattle for treating diabetes.",
        points: ["Identical amino acid sequence to human insulin, so fewer immune / allergic reactions", "Large, reliable supply not limited by animals slaughtered", "Pure and consistent; no risk of animal pathogens", "Acceptable to vegetarians and to religious groups that avoid pig products"],
        modelAnswer: "Recombinant human insulin has exactly the human amino acid sequence, so it causes fewer immune and allergic reactions than animal insulin. Its supply can be increased to meet demand rather than depending on slaughtered animals. It is pure and consistent, with no risk of animal pathogens, and it is acceptable to vegetarians and to people whose religion forbids pig products.",
      }),
    ]),
    explanation: "Insulin production: enzyme, fermentation kinetics, conditions and advantages.",
    hints: ["Divide the change in concentration by the time taken."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T4: biodiversity at two sites and conservation
  const spp = ["P", "Q", "R", "S", "T", "U"];
  const s1 = [24, 22, 17, 23, 20, 14];
  const s2 = [97, 9, 6, 4, 4, 0];
  chk(s1.reduce((a, x) => a + x, 0), 120);
  chk(s2.reduce((a, x) => a + x, 0), 120);
  b.struct({
    ...T, d: 3,
    concepts: [A("ecology.levels-organisation"), A("conservation.threats-strategies")],
    stem: `Tendai counted grass plants of six species in random quadrats in two areas of grassland. Area 1 is inside a protected reserve; Area 2 is outside it and heavily grazed by livestock.\n\n${table(["Species", ...spp], [["Area 1 (number)", ...s1.map(String)], ["Area 2 (number)", ...s2.map(String)]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 1, stem: "State the species richness of Area 2.",
        value: s2.filter((x) => x > 0).length, wrong: [6],
        explanation: "Species U was not found in Area 2, so richness = 5.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage of plants in Area 2 that belong to species P, to one decimal place.",
        value: (s2[0] / 120) * 100, dp: 1, unit: "%", wrong: [Math.round((s2[0] / 5) * 10) / 10],
        explanation: `${s2[0]} ÷ 120 × 100 = ${dpStr((s2[0] / 120) * 100, 1)}%.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Compare the species diversity of the two areas.",
        points: ["Area 1 has higher richness (6 species against 5)", "Area 1 has higher evenness (14-24 of each) while P dominates Area 2, so Area 1 is more diverse"],
        modelAnswer: "Area 1 has six species and Area 2 only five, and in Area 1 the plants are spread fairly evenly (14-24 of each species), whereas species P makes up most of Area 2. Area 1 therefore has the higher species diversity.",
      }),
      P.mcq({
        label: "(d)", stem: "Which term describes all the plants of species Q in Area 1?",
        options: [
          ["A population", "Correct: one species, one area."],
          ["A community", "A community includes all species."],
          ["An ecosystem", "An ecosystem includes abiotic factors."],
          ["A niche", "A niche is a role."],
        ],
        answer: "A",
        explanation: "One species in one area at one time.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why genetic diversity within the grass species is also important for conservation.",
        points: ["Variety of alleles allows some individuals to survive changes such as drought or disease", "Low diversity increases inbreeding / reduces ability to adapt, raising extinction risk"],
        modelAnswer: "A wide variety of alleles means some plants are likely to survive new conditions such as drought or disease, so the species can adapt. Low genetic diversity reduces adaptability and increases the risk of extinction.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Suggest two ways the grassland outside the reserve could be conserved or restored.",
        points: ["Reduce stocking rates / rotational grazing / fencing to allow recovery", "Reseed with native species / control soil erosion (reclamation) / community incentives or legal protection"],
        modelAnswer: "Grazing pressure could be reduced by lower stocking rates, rotational grazing or temporary fencing so that grasses recover, and bare areas could be reseeded with native species and erosion controlled.",
      }),
    ]),
    explanation: "Richness, evenness, genetic diversity and conservation measures.",
    hints: ["Count the species present in each area.", "Compare how evenly the plants are spread."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T5: cystic fibrosis screening and gene therapy
  const pBoth = (1 / 4) * (1 / 4);
  b.struct({
    ...T, d: 4,
    concepts: [A("genetech.genetic-screening"), A("genetech.gene-therapy")],
    stem: "Cystic fibrosis is caused by recessive alleles of the CFTR gene, which codes for a chloride ion channel in epithelial cell membranes. Chipo and her husband are both unaffected, but their first child has cystic fibrosis.",
    parts: checkExam(EXAM.THEORY10, [
      P.mcq({
        label: "(a)", stem: "Using F (normal) and f (cystic fibrosis), what are the genotypes of Chipo and her husband?",
        options: [
          ["Both heterozygous, Ff", "Correct: unaffected parents of an affected child are carriers."],
          ["Both homozygous dominant, FF", "They could not have an ff child."],
          ["One Ff and one FF", "The child received f from both parents."],
          ["Both homozygous recessive, ff", "They would have cystic fibrosis."],
        ],
        answer: "A",
        explanation: "The affected child is ff, so each parent passed on f; both are unaffected, so both are Ff.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the probability that their next two children will both have cystic fibrosis. Give your answer as a decimal to four decimal places.",
        value: pBoth, dp: 4, wrong: [0.25, 0.5],
        explanation: "1/4 × 1/4 = 1/16 = 0.0625.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Their second child is unaffected. Calculate the probability that this child is a carrier, as a decimal to two decimal places.",
        value: 2 / 3, dp: 2, wrong: [0.5],
        explanation: "Unaffected outcomes FF, Ff, Ff: 2 of 3 are carriers, 2/3 = 0.67.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe how pre-implantation genetic diagnosis could allow the couple to have a child without cystic fibrosis.",
        points: ["IVF produces embryos; one or a few cells removed from each and DNA tested (PCR) for f", "Only embryos that are not ff are implanted"],
        modelAnswer: "Embryos are produced by IVF and one or a few cells are removed from each; their DNA is amplified and tested for the f allele. Only embryos that are not ff are placed in the uterus.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Gene therapy for cystic fibrosis has used liposomes containing the normal CFTR allele, inhaled as a spray. Explain why the effects of this treatment are short-lived.",
        points: ["Liposomes deliver DNA without inserting it into chromosomes", "Airway epithelial cells are short-lived and replaced by untreated cells lacking the allele, so treatment must be repeated"],
        modelAnswer: "The liposomes deliver the allele into the cells but it is not inserted into the chromosomes. The epithelial cells lining the airways live only a short time and are replaced by new cells derived from untreated cells, which lack the allele, so the treatment has to be repeated.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the couple's children could still inherit the f allele even if Chipo had received successful somatic gene therapy.",
        points: ["Somatic therapy changes body cells only, not the gametes / germ line", "Her eggs still carry f, so she can pass it on"],
        modelAnswer: "Somatic gene therapy changes only body cells; her ovaries and eggs are unchanged, so half of her eggs still carry the f allele.",
      }),
    ]),
    explanation: "Genotypes, probability, PGD and the limits of somatic gene therapy.",
    hints: ["Healthy parents of an affected child must both be carriers.", "Multiply probabilities for independent children."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T6: Bt cotton field data
  const conv = { y: 1.42, sp: 8, dmg: 34 };
  const bt = { y: 1.81, sp: 2, dmg: 6 };
  const pcY = pctChange(conv.y, bt.y);
  b.struct({
    ...T, d: 3,
    concepts: [A("genetech.gmo-agriculture")],
    stem: `Illustrative results from neighbouring farms growing conventional and Bt cotton in the same season.\n\n${table(["Measurement", "Conventional cotton", "Bt cotton"], [["Yield of seed cotton / tonnes per hectare", conv.y.toFixed(2), bt.y.toFixed(2)], ["Insecticide sprays per season", String(conv.sp), String(bt.sp)], ["Bolls damaged by bollworms / %", String(conv.dmg), String(bt.dmg)]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage increase in yield of Bt cotton compared with conventional cotton, to one decimal place.",
        value: pcY, dp: 1, unit: "%", wrong: [Math.round(-pctChange(bt.y, conv.y) * 10) / 10],
        explanation: `(${bt.y} − ${conv.y}) ÷ ${conv.y} × 100 = ${dpStr(pcY, 1)}%.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain how Bt cotton produces these results.",
        points: ["Contains gene for Bt (Cry) toxin from *Bacillus thuringiensis*, expressed in plant tissues", "Bollworm larvae eating the plant are killed (toxin binds gut receptors), so fewer bolls damaged (34% to 6%), higher yield and fewer sprays"],
        modelAnswer: "Bt cotton contains a gene from *Bacillus thuringiensis* coding for a Cry toxin, which is made in the plant's tissues. Bollworm larvae that feed on it are killed, so the percentage of damaged bolls falls from 34% to 6% and yield rises. Farmers need far fewer insecticide sprays, 2 instead of 8.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the percentage reduction in the number of insecticide sprays.",
        value: -pctChange(conv.sp, bt.sp), unit: "%", wrong: [300],
        explanation: `(${conv.sp} − ${bt.sp}) ÷ ${conv.sp} × 100 = ${-pctChange(conv.sp, bt.sp)}%.`,
      }),
      P.mcq({
        label: "(d)", stem: "Why is the Bt toxin not harmful to farm workers?",
        options: [
          ["Humans lack its gut receptors", "Correct."],
          ["The toxin is removed from the cotton fibres", "It is the receptors that matter."],
          ["The toxin is only made at night", "Not true."],
          ["Humans make an antibody to it at birth", "Not the reason."],
        ],
        answer: "A",
        explanation: "Specific receptors in the alkaline insect gut are needed.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain how bollworms could become resistant to Bt cotton.",
        points: ["Some bollworms have (mutant) alleles giving resistance; only they survive on Bt cotton", "They reproduce, so the allele frequency rises over generations (natural selection)"],
        modelAnswer: "A few bollworms carry alleles that make them resistant. On Bt cotton only these survive and reproduce, so the frequency of the resistance allele increases each generation by natural selection.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Suggest two concerns, other than resistance, about growing Bt cotton.",
        points: ["Cost of patented seed / farmers must buy seed every season / dependence on seed companies", "Effects on non-target insects / gene flow to wild relatives / regulation and public acceptance"],
        modelAnswer: "Patented seed is expensive and must be bought every season, making farmers dependent on seed companies. There may also be effects on non-target insects, and regulators and consumers may not accept GM crops.",
      }),
    ]),
    explanation: "Benefits of Bt cotton from data, its mechanism and concerns.",
    hints: ["Use the conventional yield as the base."],
    calculator: true,
  });
});
