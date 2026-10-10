// W4a: classification, species concepts, hierarchy, binomial names, three domains, viruses, keys
// (both boards; domains, Archaea and virus classification are Cambridge detail).
import { concept, P, t, table, CAM } from "../lib.mjs";

concept("abio.biodiversity.classification-hierarchy", { file: "biodiversity/classification-hierarchy", keyPrefix: "biodiversity.classification-hierarchy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The African buffalo is named *Syncerus caffer*. Which statement about this name is correct?",
    options: [
      ["*Syncerus* is the name of the genus", "Correct: the first word is the genus."],
      ["*caffer* is the name of the family", "The second word is the specific name, not a family."],
      ["*caffer* used alone is the name of the species", "A species name always has both words."],
      ["*Syncerus caffer* is the name of an order", "It is a species name."],
    ],
    answer: "A",
    explanation: "The first word is the genus; the species is named by both words together.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which list shows taxonomic ranks in order from the largest group to the smallest?",
    options: [
      ["Phylum, class, order, family", "Correct."],
      ["Class, phylum, order, family", "Phylum contains classes, so it comes first."],
      ["Phylum, order, class, family", "Class comes before order."],
      ["Phylum, class, family, order", "Order comes before family."],
    ],
    answer: "A",
    explanation: "Kingdom, phylum, class, order, family, genus, species.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can the biological species concept not be used to classify most bacteria?",
    options: [
      ["Bacteria reproduce asexually, so interbreeding cannot be tested", "Correct."],
      ["Bacteria are too small to be seen even with a light microscope at high power", "Bacteria can be seen with a light microscope."],
      ["Bacteria all look exactly alike", "Bacteria differ in shape and other features."],
      ["Bacteria do not contain any DNA", "Bacteria contain DNA."],
    ],
    answer: "A",
    explanation: "The biological concept depends on interbreeding to give fertile offspring, which does not apply to asexual organisms.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "Which feature is found in Bacteria but never in Archaea?",
    options: [
      ["Peptidoglycan in the cell wall", "Correct."],
      ["70S ribosomes", "Archaea also have 70S ribosomes."],
      ["A circular chromosome without a nuclear envelope", "Archaea are also prokaryotes."],
      ["A cell surface membrane", "All cells have one."],
    ],
    answer: "A",
    explanation: "Bacterial walls contain peptidoglycan (murein); archaeal walls never do.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "How do the membrane lipids of Archaea differ from those of Bacteria?",
    options: [
      ["They have branched chains joined to glycerol by ether bonds", "Correct."],
      ["They have unbranched fatty acids joined to glycerol by ester bonds", "This describes Bacteria (and Eukarya)."],
      ["They contain cholesterol to give the membrane stability", "Cholesterol is typical of animal cell membranes."],
      ["They are made of protein rather than of lipid", "Archaeal membranes are lipid bilayers or monolayers."],
    ],
    answer: "A",
    explanation: "Archaeal lipids are ether-linked and branched, which makes them stable at high temperatures.",
    hints: ["Think about the bond between the hydrocarbon chain and glycerol."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "Rotavirus contains double-stranded RNA. Which other virus belongs to a different group because it has single-stranded RNA?",
    options: [
      ["Influenza virus", "Correct: single-stranded RNA."],
      ["Smallpox virus", "Smallpox has double-stranded DNA, not single-stranded RNA."],
      ["A parvovirus", "Parvoviruses have single-stranded DNA."],
      ["A DNA bacteriophage", "These have DNA, not RNA."],
    ],
    answer: "A",
    explanation: "Viruses are grouped by nucleic acid type and strandedness; influenza has single-stranded RNA.",
    hints: ["Two features: DNA or RNA, and single or double strand."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "The leopard (*Panthera pardus*) and the lion (*Panthera leo*) are in the same genus. Which statement must be true?",
    options: [
      ["They are also in the same family, order, class and phylum", "Correct: a genus lies within one family, and so on upwards."],
      ["They can interbreed to produce fertile offspring", "Being in one genus does not mean they form one species."],
      ["They belong to two different families within the same order, Carnivora", "One genus cannot span two families."],
      ["They have identical DNA base sequences", "Different species have different DNA sequences."],
    ],
    answer: "A",
    explanation: "Groups do not overlap: every member of a genus belongs to the same family, order, class, phylum and kingdom.",
    hints: ["Can a genus belong to two families?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A student writes a key to grasshoppers using the couplet 'Body large → species X; body small → species Y'. Why is this a poor couplet?",
    options: [
      ["Size varies with age and conditions, so a young X could be keyed out as Y", "Correct: keys need fixed, unambiguous features."],
      ["Couplets in a dichotomous key must always offer three choices, never only two", "Dichotomous keys use two choices."],
      ["Keys may not use any feature of the body", "Body features are the usual basis of keys."],
      ["Size is a feature of the genus, not of a species", "Size is not a fixed feature of any rank."],
    ],
    answer: "A",
    explanation: "Size depends on age and environment; use features such as wing length relative to the abdomen or the number of spines.",
    hints: ["Would a juvenile of the larger species be large?"],
  });

  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A dichotomous key is written to identify 9 different species, each ending at its own name. How many couplets (pairs of statements) does it contain?",
    value: 8, wrong: [9, 18],
    explanation: "Each couplet splits one group into two, so separating 9 species needs 9 − 1 = **8** couplets.",
    hints: ["Each couplet adds one more branch end."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Organisms in the same class always belong to the same phylum.",
    answer: true,
    explanation: "True. Each class lies wholly within one phylum.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Archaea are found only in extreme environments such as hot springs.",
    answer: false,
    explanation: "False. They were first found there but live in many habitats, including soil, oceans and the guts of animals (e.g. methanogens in cattle).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of the classification of maize with its rank.",
    pairs: [
      ["Eukarya", "Domain"],
      ["Plantae", "Kingdom"],
      ["Poaceae (the grass family)", "Family"],
      ["*Zea*", "Genus"],
      ["*mays*", "Specific name"],
    ],
    explanation: "Maize: domain Eukarya, kingdom Plantae, family Poaceae, genus *Zea*, species *Zea mays*.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the rules for binomial names.",
    template: "The first word is the {{blank:a}} name and starts with a capital letter. When handwritten, both words are {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["genus"], choices: ["genus", "species", "family"] },
      { id: "b", accepted: ["underlined"], choices: ["underlined", "capitalised", "in brackets"] },
    ],
    explanation: "Genus first, capitalised; italicised in print, underlined by hand.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the taxonomic rank that comes between class and family.",
    accepted: ["order"],
    wrong: ["phylum"],
    explanation: "Order.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the limitations of the morphological species concept.",
    points: [
      "Males and females (sexual dimorphism) or juveniles and adults (e.g. larvae) of one species may look very different",
      "Different species may look almost identical (cryptic species)",
      "Individuals of one species vary in appearance with environment / between populations, so it is subjective where to draw the line",
    ],
    modelAnswer: "Members of one species can look very different, such as males and females, or larvae and adults. Separate species can look almost identical. Appearance also varies with the environment and between populations, so deciding where one species ends and another begins is subjective.",
    explanation: "Appearance can mislead both ways.",
    hints: ["Think of a caterpillar and a butterfly."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3, applies: CAM,
    stem: "Explain why Archaea are placed in a separate domain from Bacteria, although both are prokaryotes.",
    points: [
      "Ribosomal RNA sequences (and ribosomal proteins) of Archaea differ from those of Bacteria and are more like those of Eukarya",
      "Archaeal cell walls never contain peptidoglycan",
      "Archaeal membrane lipids are branched and ether-linked, not ester-linked",
    ],
    modelAnswer: "Comparisons of ribosomal RNA show that Archaea differ from Bacteria as much as either does from eukaryotes, and some of their ribosomal proteins resemble those of Eukarya. Their cell walls never contain peptidoglycan, and their membrane lipids have branched chains attached by ether bonds rather than ester bonds.",
    explanation: "rRNA, cell wall, membrane lipids.",
    hints: ["Three matched differences."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Two populations of a frog look identical but have different mating calls and do not interbreed where they meet. Discuss whether they should be classified as one species or two.",
    points: [
      "By the morphological concept they would be one species (they look identical)",
      "By the biological concept they are two species: they do not interbreed (behavioural isolation by calls)",
      "DNA sequence comparison could decide; most biologists would treat them as two (cryptic) species",
    ],
    modelAnswer: "On appearance alone, the morphological concept would treat them as one species. However, their different calls keep them from interbreeding where they meet, so under the biological species concept they are two species. Comparing DNA sequences would show how far they have diverged, and most biologists would treat them as two cryptic species.",
    explanation: "Different concepts can give different answers.",
    hints: ["Apply two species concepts."],
  });

  // Practice structured 1: writing and using a key
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Rudo collected five animals from a garden in Gweru:\n\n" + table(["Animal", "Description"], [
      ["A", "Six jointed legs; two pairs of wings; hard front wings covering the back wings"],
      ["B", "Eight jointed legs; body in two parts; no wings or antennae"],
      ["C", "Many jointed legs, two pairs on most segments; long cylindrical body"],
      ["D", "No legs; soft, unsegmented body; a coiled shell"],
      ["E", "Six jointed legs; one pair of wings; large compound eyes"],
    ]),
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe a dichotomous key that would separate the five animals. Give each couplet as a pair of statements.", points: [
        "Couplet 1: jointed legs present → 2; no jointed legs (shell) → D",
        "Couplet 2: six legs → 3; more than six legs → 4",
        "Couplet 3: two pairs of wings (hard front wings) → A; one pair of wings → E",
        "Couplet 4: eight legs (two body parts) → B; many legs, two pairs per segment → C",
      ], modelAnswer: "1. Jointed legs present → go to 2; no jointed legs, coiled shell → D.\n2. Six legs → go to 3; more than six legs → go to 4.\n3. Two pairs of wings, front pair hard → A; one pair of wings → E.\n4. Eight legs, body in two parts → B; many legs, two pairs on most segments → C." }),
      P.num({ label: "(b)", marks: 1, stem: "How many couplets does your key contain?", value: 4, wrong: [5], explanation: "Five animals need 5 − 1 = 4 couplets." }),
      P.mcq({ label: "(c)", stem: "To which group does animal B belong?", options: [["Arachnids (spiders and mites)", "Correct: eight legs, two body parts."], ["Insects", "Insects have six legs."], ["Myriapods (millipedes and centipedes)", "These have many legs."], ["Molluscs", "Molluscs have no jointed legs."]], answer: "A", explanation: "Eight jointed legs and two body parts: an arachnid." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why features such as colour should be avoided in keys.", points: ["Colour varies within a species (age, sex, environment)", "So the same species could be keyed to different places / identification becomes unreliable"], modelAnswer: "Colour varies with age, sex and environment within one species, so individuals of the same species could be sent down different branches and misidentified." }),
    ],
    explanation: "Each couplet splits a group using a fixed feature.",
    hints: ["Start with the feature that separates one animal from all the rest."],
  });

  // Practice structured 2: three domains (Cambridge)
  b.struct({
    d: 4, skill: "ANALYSIS", applies: CAM,
    stem: "Three microorganisms were studied. Organism X has a cell wall containing peptidoglycan and ester-linked membrane lipids. Organism Y has no peptidoglycan, ether-linked branched membrane lipids and lives in a hot spring. Organism Z has a nucleus, mitochondria and 80S ribosomes in its cytoplasm.",
    parts: [
      P.group({ label: "(a)", stem: "Name the domain to which each organism belongs.", parts: [
        P.short({ label: "(i)", stem: "Organism X.", accepted: ["Bacteria", "bacteria", "domain Bacteria"], wrong: ["Archaea"], explanation: "Peptidoglycan: Bacteria." }),
        P.short({ label: "(ii)", stem: "Organism Y.", accepted: ["Archaea", "archaea", "domain Archaea"], wrong: ["Bacteria"], explanation: "No peptidoglycan, ether lipids: Archaea." }),
        P.short({ label: "(iii)", stem: "Organism Z.", accepted: ["Eukarya", "eukarya", "Eukaryota", "eukaryotes", "domain Eukarya"], wrong: ["Bacteria"], explanation: "Nucleus and mitochondria: Eukarya." }),
      ] }),
      P.manual({ label: "(b)", marks: 2, stem: "Suggest why ether-linked membrane lipids help Y to survive in a hot spring.", points: ["Ether bonds are more stable / resistant to breaking (hydrolysis) at high temperatures than ester bonds", "So the membrane stays intact and keeps its fluidity/permeability control at high temperature"], modelAnswer: "Ether bonds are chemically more stable than ester bonds and resist hydrolysis at high temperature, so the membrane stays intact and continues to control what enters and leaves the cell." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two features shared by X and Y.", points: ["No nucleus / DNA free in cytoplasm (circular chromosome)", "70S ribosomes / no membrane-bound organelles"], modelAnswer: "Both lack a nucleus, with circular DNA free in the cytoplasm, and both have 70S ribosomes and no membrane-bound organelles." }),
      P.manual({ label: "(d)", marks: 1, stem: "State the type of molecule whose sequences were compared to establish the three domains.", points: ["Ribosomal RNA (rRNA)"], modelAnswer: "Ribosomal RNA." }),
    ],
    explanation: "Peptidoglycan and lipid linkages separate Bacteria and Archaea; a nucleus marks Eukarya.",
    hints: ["Use the cell wall and lipid features."],
  });

  b.card("DEFINITION", "Biological species concept", "A group that can interbreed to produce fertile offspring and is reproductively isolated from other groups.");
  b.card("FACT", "Taxonomic ranks in order", "Domain, kingdom, phylum, class, order, family, genus, species.");
  b.card("CONCEPT", "Rules of binomial nomenclature", "Genus (capital) then specific name (lower case); both italicised in print or underlined by hand.");
  b.card("FACT", "The three domains", "Archaea, Bacteria and Eukarya.");
  b.card("CONCEPT", "Archaea versus Bacteria", "Archaea: no peptidoglycan, branched ether-linked lipids, rRNA more like Eukarya. Bacteria: peptidoglycan walls, ester-linked lipids.", undefined, { applies: CAM });
  b.card("CONCEPT", "How viruses are classified", "By nucleic acid: DNA or RNA, single- or double-stranded.", undefined, { applies: CAM });
  b.card("CONCEPT", "Good features for a dichotomous key", "Fixed, easily seen features (legs, wings, leaf type), not size or colour.");
  b.card("FORMULA", "Couplets in a dichotomous key", "n organisms need n − 1 couplets.");
});
